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

interface SpringParams {
  response: number;
  dampingFraction: number;
  preset: string;
}

const BALL = 36;
const END = 10;
const GAP = 8;

/** Apple DocC 官方预设定义:duration 0.5s + 基础 bounce(调研 02§A13) */
const PRESET_BOUNCE: Record<string, number> = { bouncy: 0.3, snappy: 0.15, smooth: 0 };
const PRESET_DURATION = 0.5;

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

const css = `
.ss-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 6px 4px; }
.ss-lane-label { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.ss-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.ss-lane {
  position: relative; height: 56px; border-radius: 13px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer; user-select: none; touch-action: manipulation;
}
.ss-lane:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ss-end { position: absolute; top: 6px; bottom: 6px; width: ${END}px; border-radius: 5px; background: linear-gradient(180deg, oklch(0.55 0.14 250), oklch(0.45 0.14 250)); }
.ss-end-l { left: 0; } .ss-end-r { right: 0; }
.ss-ball {
  position: absolute; top: 50%; left: ${END + GAP}px; width: ${BALL}px; height: ${BALL}px; margin-top: -${BALL / 2}px;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
.ss-ball-preset { background: radial-gradient(circle at 32% 28%, oklch(0.86 0.1 165), oklch(0.62 0.16 165) 60%, oklch(0.45 0.14 165)); }
.ss-ball-custom { background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30)); }
.ss-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.ss-launch {
  border: 1px solid var(--border); border-radius: 999px; padding: 5px 16px;
  font-size: 12px; cursor: pointer; background: var(--accent); color: var(--bg); border-color: transparent;
}
.ss-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;

/**
 * SwiftUI 弹簧演示:双轨同跑对照。
 *
 * 上轨 = Apple 预设族,严格按 Apple DocC 官方定义驱动(Motion duration-based 弹簧):
 *   duration 0.5s + 基础 bounce —— bouncy 0.3 / snappy 0.15 / smooth 0(调研 02§A13)。
 *
 * 下轨 = response/dampingFraction,按二阶阻尼谐振子(mass=1)标准等价换算成 Motion 物理弹簧:
 *   stiffness = (2π / response)²
 *     —— Apple 定义:response 是「以近似时长(秒)表达的刚度」≈ 固有周期,故 ω₀ = 2π/response,k = ω₀²。
 *   damping = 4π × dampingFraction / response
 *     —— Apple 定义:dampingFraction 是「相对临界阻尼所需阻尼量的比例」,ζ = c / (2√(km)),mass=1 时 c = 2ζω₀。
 *   该换算为物理推导;Apple 与 Motion 均未发布官方互转公式,已在正文如实注明。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): SpringParams => ({
    response: store.get("response") as number,
    dampingFraction: store.get("dampingFraction") as number,
    preset: store.get("preset") as string,
  });

  const [params, setParams] = useState<SpringParams>(readParams);
  const reduced = useReducedMotion() === true;

  const laneRef = useRef<HTMLDivElement>(null);
  const xPreset = useMotionValue(0);
  const xCustom = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const targetRef = useRef(0);
  const limitRef = useRef(0);
  const aliveRef = useRef(true);
  const bootedRef = useRef(false);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  /** 换算后的 Motion 物理弹簧参数(mass 固定 1),读数条同步展示 */
  const converted = useMemo(() => {
    const stiffness = (2 * Math.PI / params.response) ** 2;
    const damping = (4 * Math.PI * params.dampingFraction) / params.response;
    return { stiffness, damping };
  }, [params.response, params.dampingFraction]);

  const buildTransition = (lane: "preset" | "custom"): Transition => {
    if (lane === "preset") {
      // 预设轨:Apple 官方定义 = duration 0.5s + 基础 bounce(bouncy 0.3 / snappy 0.15 / smooth 0)
      return { type: "spring", duration: PRESET_DURATION, bounce: PRESET_BOUNCE[params.preset] ?? 0.15 };
    }
    // 自定义轨:response/dampingFraction → stiffness/damping(换算公式见组件顶部注释)
    return { type: "spring", stiffness: converted.stiffness, damping: converted.damping, mass: 1 };
  };
  const transitionRef = useRef(buildTransition);
  transitionRef.current = buildTransition;

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      controlsRef.current?.stop();
    };
  }, []);

  const measure = () => {
    const el = laneRef.current;
    if (!el) return 0;
    return Math.max(20, el.clientWidth - END * 2 - GAP * 2 - BALL);
  };

  /** 两轨同时奔向同一目标;reduced-motion 时直出终态 */
  const launch = (to: number) => {
    if (!aliveRef.current) return;
    const limit = limitRef.current || measure();
    limitRef.current = limit;
    const target = clamp(to, 0, limit);
    targetRef.current = target;
    if (reducedRef.current) {
      controlsRef.current?.stop();
      xPreset.jump(target);
      xCustom.jump(target);
      return;
    }
    controlsRef.current?.stop();
    controlsRef.current = animate(xCustom, target, transitionRef.current("custom"));
    void animate(xPreset, target, transitionRef.current("preset"));
  };

  // 挂载首发一次;参数变化即重跑当前目标(改动即时可见)
  useEffect(() => {
    limitRef.current = measure();
    if (!bootedRef.current) {
      bootedRef.current = true;
      targetRef.current = limitRef.current;
    }
    launch(targetRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- launch 依赖 params/reduced,以本 effect 为准
  }, [params, reduced]);

  const toggle = () => launch(targetRef.current > 0 ? 0 : limitRef.current || measure());

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ss-stage">
        <div className="ss-lane-label">
          <span>预设 Preset</span>
          <span className="ss-tag">{params.preset} · bounce {PRESET_BOUNCE[params.preset]} · {PRESET_DURATION}s</span>
        </div>
        <div
          className="ss-lane"
          ref={laneRef}
          role="button"
          tabIndex={0}
          aria-label="发射弹簧 launch the springs"
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
        >
          <div className="ss-end ss-end-l" />
          <div className="ss-end ss-end-r" />
          <motion.div className="ss-ball ss-ball-preset" style={{ x: xPreset }} />
        </div>
        <div className="ss-lane-label">
          <span>自定义 Custom</span>
          <span className="ss-tag">
            stiffness ≈ {Math.round(converted.stiffness)} · damping ≈ {converted.damping.toFixed(1)} · mass 1
          </span>
        </div>
        <div className="ss-lane" aria-hidden="true">
          <div className="ss-end ss-end-l" />
          <div className="ss-end ss-end-r" />
          <motion.div className="ss-ball ss-ball-custom" style={{ x: xCustom }} />
        </div>
        <div className="ss-footer">
          <button type="button" className="ss-launch" onClick={toggle}>
            发射 Launch
          </button>
          {reduced && <span className="ss-tag">reduced-motion: 直出终态 / final state only</span>}
        </div>
        <p className="ss-hint">
          上轨按 Apple 官方预设定义(duration 0.5s + bounce 0.3/0.15/0),下轨由 response/dampingFraction 换算驱动;
          两轨同目标同发射,手感差异即两套参数体系的差异 /
          Top lane follows Apple's official preset definitions; bottom lane is driven by the response/dampingFraction conversion. Same target, same launch — the gap is the parameter systems'.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
