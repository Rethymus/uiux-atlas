import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import type { AnimationPlaybackControls } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface InertiaParams {
  power: number;
  timeConstant: number;
}

const BALL = 40;
const WALL = 10;
const GAP = 6;
/** 按钮/键盘等效甩动的固定速度(px/s):演示用值,非官方数值 */
const FLICK_VELOCITY = 1500;

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

const css = `
.ig-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; padding: 20px; }
.ig-lane {
  position: relative;
  height: 72px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.ig-lane:active { cursor: grabbing; }
.ig-lane:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ig-wall {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: ${WALL}px;
  border-radius: 5px;
  background: linear-gradient(180deg, oklch(0.55 0.14 250), oklch(0.45 0.14 250));
}
.ig-wall-l { left: 0; }
.ig-wall-r { right: 0; }
.ig-marker {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 50%;
  width: 0;
  border-left: 2px dashed var(--accent);
  opacity: 0.85;
  pointer-events: none;
}
.ig-marker::after {
  content: "落点 landing";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  white-space: nowrap;
  color: var(--accent);
}
.ig-ball {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${BALL}px;
  height: ${BALL}px;
  margin: -${BALL / 2}px 0 0 -${BALL / 2}px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
.ig-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.ig-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ig-chip-warn { border-color: var(--accent); color: var(--accent); }
.ig-actions { display: flex; align-items: center; gap: 10px; }
.ig-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.ig-btn:hover { border-color: var(--accent); color: var(--accent); }
.ig-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;

/**
 * 惯性演示:拖拽跟手 → 释放交给 type:"inertia"。
 * - 拖拽:pointermove 直写 MotionValue(x.set),1:1 跟手,不经过任何缓动;
 * - 释放:与 framer-motion 拖拽组件同路径 animate(x, 0, { type: "inertia", ... })
 *   (VisualElementDragControls.startAnimation 同样以 type:"inertia" + 无有效目标调用);
 *   velocity 缺省由 animateMotionValue 注入 value.getVelocity()(motion-dom@12.43.0
 *   interfaces/motion-value.mjs:29);
 * - 预测落点 = 起点 + power × 释放速度(motion-dom inertia.mjs:ideal = origin + power*velocity),
 *   demo 用同一公式画标线;越界由 min/max + 文档标注默认 bounceStiffness 500/bounceDamping 10 兜住;
 * - reduced-motion:跟手保留,释放直出落点(钳制在墙内),不播滑行。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): InertiaParams => ({
    power: store.get("power") as number,
    timeConstant: store.get("timeConstant") as number,
  });

  const [params, setParams] = useState<InertiaParams>(readParams);
  const [predicted, setPredicted] = useState<{ x: number; oob: boolean } | null>(null);
  const reduced = useReducedMotion() === true;

  const laneRef = useRef<HTMLDivElement>(null);
  const velRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startVal: number } | null>(null);
  const flickDirRef = useRef(1);
  const limitRef = useRef(0);
  const bootedRef = useRef(false);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  const measure = (): number => {
    const el = laneRef.current;
    if (!el) return 0;
    return Math.max(20, el.clientWidth / 2 - WALL - GAP - BALL / 2);
  };

  /** Motion inertia 生成器的落点公式:motion-dom@12.43.0 inertia.mjs — ideal = origin + power * velocity */
  const predict = (origin: number, velocity: number): { x: number; oob: boolean } => {
    const limit = limitRef.current || measure();
    const raw = origin + paramsRef.current.power * velocity;
    return { x: clamp(raw, -limit, limit), oob: Math.abs(raw) > limit };
  };

  /** 释放:交给 inertia(velocity 缺省 → MotionValue 当前速度);reduced-motion 直出落点 */
  const release = () => {
    const limit = limitRef.current || measure();
    const origin = x.get();
    const velocity = x.getVelocity();
    setPredicted(predict(origin, velocity));
    controlsRef.current?.stop();
    if (reducedRef.current) {
      x.jump(predict(origin, velocity).x);
      return;
    }
    controlsRef.current = animate(x, 0, {
      type: "inertia",
      power: paramsRef.current.power,
      timeConstant: paramsRef.current.timeConstant,
      min: -limit,
      max: limit,
      // 文档标注默认值(motion.dev,调研 04§1.3);省略时运行时同为 500/10
      bounceStiffness: 500,
      bounceDamping: 10,
    });
  };

  /** 按钮/键盘等效路径:固定速度甩动(方向交替),显式传 velocity 覆盖缺省注入 */
  const flick = () => {
    const limit = limitRef.current || measure();
    const dir = flickDirRef.current;
    flickDirRef.current = -dir;
    const origin = x.get();
    const velocity = FLICK_VELOCITY * dir;
    setPredicted(predict(origin, velocity));
    controlsRef.current?.stop();
    if (reducedRef.current) {
      x.jump(clamp(origin + paramsRef.current.power * velocity, -limit, limit));
      return;
    }
    controlsRef.current = animate(x, 0, {
      type: "inertia",
      velocity,
      power: paramsRef.current.power,
      timeConstant: paramsRef.current.timeConstant,
      min: -limit,
      max: limit,
      bounceStiffness: 500,
      bounceDamping: 10,
    });
  };

  // 挂载:球停在左墙;参数变化:从当前值+当前速度重发一次惯性(即改即生效)
  useEffect(() => {
    limitRef.current = measure();
    if (!bootedRef.current) {
      bootedRef.current = true;
      x.jump(-limitRef.current);
      return;
    }
    if (!dragRef.current && !reducedRef.current) release();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useMotionValueEvent(x, "change", () => {
    if (velRef.current) {
      velRef.current.textContent = `${Math.round(Math.abs(x.getVelocity()))} px/s`;
    }
  });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    controlsRef.current?.stop();
    setPredicted(null);
    dragRef.current = { pointerId: e.pointerId, startX: e.clientX, startVal: x.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const limit = limitRef.current || measure();
    x.set(clamp(d.startVal + (e.clientX - d.startX), -limit, limit));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    release();
  };

  const onPointerCancel = () => {
    dragRef.current = null;
    release();
  };

  const onLaneKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    flick();
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ig-stage">
        <div
          className="ig-lane"
          ref={laneRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onKeyDown={onLaneKeyDown}
          role="button"
          tabIndex={0}
          aria-label="惯性轨道:按住拖拽跟手,松手惯性滑行;回车触发固定速度甩动 / inertia lane: drag to track the pointer, release to glide; Enter flicks with fixed velocity"
        >
          <div className="ig-wall ig-wall-l" />
          <div className="ig-wall ig-wall-r" />
          {predicted && (
            <div className="ig-marker" style={{ transform: `translateX(${predicted.x}px)` }} />
          )}
          <motion.div className="ig-ball" style={{ x }} />
        </div>
        <div className="ig-readout">
          <span className="ig-chip">
            |velocity| <span ref={velRef}>0 px/s</span>
          </span>
          {predicted && (
            <span className={`ig-chip${predicted.oob ? " ig-chip-warn" : ""}`}>
              {predicted.oob
                ? "越界 → 边界弹簧拉回 / out of bounds → boundary spring"
                : "落点在界内 / lands in bounds"}
            </span>
          )}
          {reduced && <span className="ig-chip">reduced-motion: 释放直出落点 / release lands directly</span>}
        </div>
        <div className="ig-actions">
          <button type="button" className="ig-btn" onClick={flick}>
            甩一下 Flick
          </button>
        </div>
        <p className="ig-hint">
          按住球拖拽跟手,快速松手看惯性滑行;虚线是按「起点 + power × 释放速度」预测的落点,出界会被墙上的边界弹簧拉回 /
          drag the ball, release fast to glide; the dashed line is the predicted landing (origin + power × release velocity), out-of-bounds glides are caught by the wall's boundary spring.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
