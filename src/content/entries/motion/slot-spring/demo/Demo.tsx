import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { AnimationPlaybackControls, Transition } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface SlotParams {
  stiffness: number;
  damping: number;
  segments: number;
}

const LABELS3 = ["日", "周", "月"];
const LABELS4 = ["日", "周", "月", "年"];
const LABELS5 = ["日", "周", "月", "年", "全部"];

const css = `
.sl-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 8px; }
.sl-rail {
  position: relative; width: min(420px, calc(100% - 24px)); height: 46px;
  border-radius: 12px; background: color-mix(in srgb, var(--border) 30%, transparent);
  display: flex; touch-action: manipulation; user-select: none;
}
.sl-rail:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sl-seg {
  position: relative; z-index: 2; flex: 1 1 0; border: 0; background: transparent;
  font-size: 14px; color: var(--text-dim); cursor: pointer; border-radius: 9px;
}
.sl-seg:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.sl-seg[aria-checked="true"] { color: var(--text); font-weight: 650; }
.sl-pill {
  position: absolute; z-index: 1; top: 4px; bottom: 4px; left: 0; width: 0;
  border-radius: 9px; background: var(--surface);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
  pointer-events: none;
}
.sl-readout {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
  font-size: 12px; color: var(--text-dim); font-variant-numeric: tabular-nums;
}
.sl-tag { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.sl-hint { max-width: 560px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
`;

/**
 * 竹简槽分段控件:一只常驻滑签沿槽位弹簧滑动(Motion 物理弹簧,stiffness/damping 可调)。
 * stiffness / damping / segments 为 JS 型参数——订阅 store 后驱动:
 * - 弹簧用 animate(motionValue, 目标槽位x, { type:"spring", stiffness, damping, mass:1 }),
 *   Motion 物理弹簧默认继承当前速度 → 中断接力;
 * - 阅读数值 ζ/过冲/包络→5% 由二阶阻尼谐振子公式本地实算(mass=1):
 *   ω₀=√k、ζ=c/(2√k)、过冲=e^(−πζ/√(1−ζ²))、包络→5% = ln20/(ζω₀)(调研 10§2.3)。
 * ARIA:role=radiogroup + 方向键(单一选择器语义,对照 iOS 分段控件)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): SlotParams => ({
    stiffness: store.get("stiffness") as number,
    damping: store.get("damping") as number,
    segments: Number(store.get("segments")),
  });
  const [params, setParams] = useState<SlotParams>(readParams);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion() === true;

  const railRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const slotWRef = useRef(0);
  const x = useMotionValue(0);

  // 参数面板 → demo:stiffness/damping/segments 改动即时生效
  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );
  const aliveRef = useRef(true);

  const labels = params.segments === 3 ? LABELS3 : params.segments === 5 ? LABELS5 : LABELS4;

  /** ζ/过冲/包络→5%:二阶阻尼谐振子(mass=1)本地实算,公式见调研 10§2.3 */
  const physics = useMemo(() => {
    const w0 = Math.sqrt(params.stiffness);
    const zeta = params.damping / (2 * w0);
    const overshoot =
      zeta < 1 ? Math.exp((-Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)) * 100 : 0;
    const envelope5 = zeta > 0 ? Math.log(20) / (zeta * w0) * 1000 : Infinity;
    const tPeak = zeta < 1 ? Math.PI / (w0 * Math.sqrt(1 - zeta * zeta)) * 1000 : Infinity;
    return { zeta, overshoot, envelope5, tPeak };
  }, [params.stiffness, params.damping]);

  const transition = (): Transition => ({
    type: "spring",
    stiffness: params.stiffness,
    damping: params.damping,
    mass: 1,
  });
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      controlsRef.current?.stop();
    };
  }, []);

  /** 布局滑签到第 i 槽;reduced-motion 时直落 */
  const movePill = (i: number) => {
    const rail = railRef.current;
    const pill = pillRef.current;
    if (!rail || !pill) return;
    const w = rail.clientWidth / Math.max(1, labels.length);
    slotWRef.current = w;
    pill.style.width = `${w}px`;
    const target = i * w;
    if (reduced) {
      controlsRef.current?.stop();
      x.jump(target);
      return;
    }
    controlsRef.current?.stop();
    controlsRef.current = animate(x, target, transitionRef.current());
  };

  // 参数/段数/reduced 变化 → 按当前选中槽重跑(弹簧从中断处速度接力)
  useEffect(() => {
    movePill(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- movePill 依赖 params/reduced,以本 effect 为准
  }, [params, reduced, active]);

  const select = (i: number) => {
    setActive(Math.min(labels.length - 1, Math.max(0, i)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(active - 1);
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sl-stage">
        <div
          className="sl-rail"
          ref={railRef}
          role="radiogroup"
          aria-label="竹简槽分段控件 segmented control"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <motion.div className="sl-pill" ref={pillRef} style={{ x }} aria-hidden="true" />
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={active === i}
              tabIndex={-1}
              className="sl-seg"
              onClick={() => select(i)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="sl-readout">
          <span className="sl-tag">stiffness {params.stiffness}</span>
          <span className="sl-tag">damping {params.damping}</span>
          <span className="sl-tag">ζ {physics.zeta.toFixed(3)}</span>
          <span className="sl-tag">过冲 {physics.overshoot.toFixed(1)}%</span>
          <span className="sl-tag">包络→5% {physics.envelope5.toFixed(0)}ms</span>
          <span className="sl-tag">t_peak {physics.tPeak.toFixed(0)}ms</span>
        </div>
        <p className="sl-hint">
          单只滑签跨槽位弹簧滑动;连续点击不同槽位,弹簧从当前位置+当前速度续接(Motion 物理弹簧默认行为);
          ζ≥1 时过冲为 0(过阻尼)。HIG:iPhone ≤5 段、段等宽、单一选择器 /
          One persistent bubble springs slot-to-slot; rapid re-targets continue from the current position + velocity.
          ζ≥1 means zero overshoot (overdamped). HIG: ≤5 segments on iPhone, equal widths, single selector.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
