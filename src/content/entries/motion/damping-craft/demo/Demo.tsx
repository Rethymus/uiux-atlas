import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { AnimationPlaybackControls, MotionValue, Transition } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 固定参考档(调研 10§4.3 ζ→过冲表与 §6.2 感知区间) */
const REFERENCE_ZETAS: { zeta: number; zh: string; en: string }[] = [
  { zeta: 0.3, zh: "强弹", en: "bouncy" },
  { zeta: 0.5, zh: "Motion 默认", en: "Motion default" },
  { zeta: 0.8, zh: "微弹克制", en: "restrained" },
  { zeta: 1.1, zh: "过阻尼粘滞", en: "overdamped" },
];

interface DampingParams {
  zeta: number;
  stiffness: number;
}

/** 过冲% = e^(−πζ/√(1−ζ²))×100;ζ≥1 为 0(调研 10§2.3 公式) */
function overshootPct(zeta: number): number {
  if (zeta >= 1) return 0;
  return Math.exp((-Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)) * 100;
}
/** 包络→5% = ln20/(ζω₀) ms(调研 10§2.3) */
function envelope5Ms(zeta: number, stiffness: number): number {
  const w0 = Math.sqrt(stiffness);
  return (Math.log(20) / (zeta * w0)) * 1000;
}

const css = `
.dc-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 4px; padding: 6px 4px; }
.dc-head { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.dc-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.dc-row { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 8px; }
.dc-meta { display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-dim); white-space: nowrap; }
.dc-meta b { font-size: 12px; color: var(--text); font-weight: 600; }
.dc-lane {
  position: relative; height: 26px; border-radius: 8px;
  background: color-mix(in srgb, var(--border) 28%, transparent);
}
.dc-goal { position: absolute; top: 4px; bottom: 4px; right: 0; width: 8px; border-radius: 4px; background: oklch(0.55 0.14 250); }
.dc-ball {
  position: absolute; top: 50%; left: 4px; width: 18px; height: 18px; margin-top: -9px;
  border-radius: 50%; box-shadow: 0 2px 7px rgba(0, 0, 0, 0.32); pointer-events: none;
}
.dc-ball-adjust { background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30)); }
.dc-ball-ref { background: radial-gradient(circle at 32% 28%, oklch(0.86 0.1 165), oklch(0.62 0.16 165) 60%, oklch(0.45 0.14 165)); }
.dc-ball[data-over="1"] { background: radial-gradient(circle at 32% 28%, oklch(0.86 0.1 250), oklch(0.62 0.16 250) 60%, oklch(0.45 0.14 250)); }
.dc-footer { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-size: 12px; color: var(--text-faint); margin-top: 2px; }
.dc-launch {
  border: 1px solid transparent; border-radius: 999px; padding: 5px 16px;
  font-size: 12px; cursor: pointer; background: var(--accent); color: var(--bg);
}
.dc-hint { max-width: 580px; font-size: 12px; color: var(--text-faint); line-height: 1.5; text-align: center; }
`;

/**
 * 阻尼感设计演示:同一目标位、同一刚度,五条弹簧轨并排跑。
 * 四条参考轨 ζ=0.3/0.5/0.8/1.1 固定;一条可调轨 ζ 连续可调(0.2~1.2)。
 * damping 由 c=2·ζ·√k(mass=1)逐轨换算;过冲/包络读数按维基公式本地实算(调研 10§2.3/§6.1)。
 * zeta / stiffness 为 JS 型参数(订阅 store);reduced-motion 时直落终态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): DampingParams => ({
    zeta: store.get("zeta") as number,
    stiffness: store.get("stiffness") as number,
  });
  const [params, setParams] = useState<DampingParams>(readParams);
  const reduced = useReducedMotion() === true;

  // 五条轨各一个 motion value(hooks 在顶层按固定顺序调用)
  const xs: MotionValue<number>[] = [
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
    useMotionValue(0),
  ];
  const lanesRef = useRef<Array<HTMLDivElement | null>>([]);
  const controlsRef = useRef<AnimationPlaybackControls[]>([]);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const lanes = useMemo(
    () => [
      { zeta: params.zeta, label: `可调 ζ=${params.zeta.toFixed(2)}`, adjustable: true },
      ...REFERENCE_ZETAS.map((r) => ({
        zeta: r.zeta,
        label: `${r.zh} ζ=${r.zeta.toFixed(2)}`,
        adjustable: false,
      })),
    ],
    [params.zeta],
  );

  /** 全部轨同一目标(轨宽 - 边距 - 球径) */
  const target = () => {
    const el = lanesRef.current[0];
    return el ? Math.max(20, el.clientWidth - 4 - 8 - 18) : 200;
  };

  const launch = () => {
    controlsRef.current.forEach((c) => c.stop());
    controlsRef.current = [];
    const to = target();
    lanes.forEach((lane, i) => {
      if (reducedRef.current) {
        xs[i].jump(to);
        return;
      }
      const transition: Transition = {
        type: "spring",
        stiffness: params.stiffness,
        damping: 2 * lane.zeta * Math.sqrt(params.stiffness), // c=2ζ√(mk), m=1
        mass: 1,
      };
      controlsRef.current.push(animate(xs[i], to, transition));
    });
  };

  const launchRef = useRef(launch);
  launchRef.current = launch;

  // 参数变化即重跑同目标;挂载首发一次
  useEffect(() => {
    launchRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- launch 依赖 params/reduced,以本 effect 为准
  }, [params, reduced]);

  useEffect(() => {
    return () => {
      controlsRef.current.forEach((c) => c.stop());
    };
  }, []);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dc-stage">
        <div className="dc-head">
          <span className="dc-tag">stiffness {params.stiffness}(全轨共享)</span>
          <span className="dc-tag">过冲 = e^(−πζ/√(1−ζ²))</span>
          <span className="dc-tag">包络→5% = ln20/(ζω₀)</span>
        </div>
        {lanes.map((lane, i) => (
          <div key={lane.label} className="dc-row">
            <div className="dc-meta">
              <b>{lane.label}</b>
              <span>
                过冲 {overshootPct(lane.zeta).toFixed(1)}%
                {lane.zeta >= 1 ? (lane.zeta === 1 ? " 临界" : " 过阻尼") : ""}
              </span>
              <span>包络→5% {envelope5Ms(lane.zeta, params.stiffness).toFixed(0)}ms</span>
            </div>
            <div
              className="dc-lane"
              ref={(el) => {
                lanesRef.current[i] = el;
              }}
              aria-hidden="true"
            >
              <div className="dc-goal" />
              <motion.div
                className={`dc-ball ${lane.adjustable ? "dc-ball-adjust" : "dc-ball-ref"}`}
                style={{ x: xs[i] }}
                data-over={lane.zeta >= 1 ? "1" : "0"}
              />
            </div>
          </div>
        ))}
        <div className="dc-footer">
          <button type="button" className="dc-launch" onClick={launch}>
            发射 Launch
          </button>
          <span>{reduced ? "reduced-motion: 直落终态 / final state only" : "同一目标位 · 同一刚度 · 只有 ζ 不同"}</span>
        </div>
        <p className="dc-hint">
          ζ 定「抖几下」(过冲比例),ω₀(√k)定「抖多快」——同一刚度下五档 ζ 即四种手感 /
          ζ decides how many wobbles (overshoot ratio), ω₀ how fast — five ζ tiers at one stiffness are four hand-feels.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
