import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import type { AnimationPlaybackControls, Transition } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface SpringParams {
  mode: string;
  stiffness: number;
  damping: number;
  mass: number;
  bounce: number;
}

const BALL = 34;
const WALL = 10;
const GAP = 6;
/** durationBased 模式的固定时长:Motion 文档标注的 duration 默认值 0.3s(调研 04§1.3) */
const DURATION_BASED_DURATION = 0.3;

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

const css = `
.ms-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; padding: 20px; }
.ms-track {
  position: relative;
  height: 64px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
}
.ms-wall {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: ${WALL}px;
  border-radius: 5px;
  background: linear-gradient(180deg, oklch(0.55 0.14 250), oklch(0.45 0.14 250));
}
.ms-wall-l { left: 0; }
.ms-wall-r { right: 0; }
.ms-ball {
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
.ms-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; font-size: 12px; color: var(--text-dim); }
.ms-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ms-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
.ms-track:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
`;

/**
 * 真弹簧演示:球在两堵墙之间 ping-pong,点击轨道改目标。
 * 核心是「可打断且从当前速度继续」——对同一个 MotionValue 重复调用 animate(),
 * physics 模式下 velocity 默认取当前值速度(motion.dev 文档;
 * motion-dom@12.43.0 animateMotionValue 传 value.getVelocity())。
 * durationBased 模式由 bounce+duration 驱动,打断后速度被刻意归零——两种模式的对照正是演示点。
 * prefers-reduced-motion 时直出终态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): SpringParams => ({
    mode: store.get("mode") as string,
    stiffness: store.get("stiffness") as number,
    damping: store.get("damping") as number,
    mass: store.get("mass") as number,
    bounce: store.get("bounce") as number,
  });

  const [params, setParams] = useState<SpringParams>(readParams);
  const reduced = useReducedMotion() === true;

  const trackRef = useRef<HTMLDivElement>(null);
  const velRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const targetRef = useRef(0);
  const limitRef = useRef(0);
  const aliveRef = useRef(true);
  const bootedRef = useRef(false);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const transition = useMemo<Transition>(() => {
    if (params.mode === "durationBased") {
      // 时长弹簧:显式传文档标注默认 duration 0.3s(省略时运行时回退为 800ms,见正文说明)
      return { type: "spring", bounce: params.bounce, duration: DURATION_BASED_DURATION };
    }
    // 物理弹簧:stiffness/damping/mass 出现即覆盖 bounce/duration(文档明示)
    return {
      type: "spring",
      stiffness: params.stiffness,
      damping: params.damping,
      mass: params.mass,
    };
  }, [params]);
  const transitionRef = useRef(transition);
  transitionRef.current = transition;

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
    const el = trackRef.current;
    if (!el) return 0;
    return Math.max(10, el.clientWidth / 2 - WALL - GAP - BALL / 2);
  };

  /** 开一条腿:从当前值+当前速度奔向 to;到位后自动折返对侧墙(ping-pong) */
  const startLeg = (to: number) => {
    if (!aliveRef.current) return;
    const limit = limitRef.current || measure();
    limitRef.current = limit;
    const target = clamp(to, -limit, limit);
    targetRef.current = target;
    controlsRef.current?.stop();
    const controls = animate(x, target, transitionRef.current);
    controlsRef.current = controls;
    void controls.then(() => {
      if (!aliveRef.current || reducedRef.current) return;
      if (controlsRef.current !== controls) return; // 已被改目标/改参数打断
      startLeg(target >= 0 ? -limit : limit);
    });
  };

  // 挂载 + 参数变化:都用「重新发起 animate」表达——参数变化本身也是一次可打断的续接
  useEffect(() => {
    limitRef.current = measure();
    if (reduced) {
      controlsRef.current?.stop();
      x.jump(clamp(targetRef.current, -limitRef.current, limitRef.current));
      return;
    }
    if (!bootedRef.current) {
      bootedRef.current = true;
      x.jump(-limitRef.current); // 球停在左墙起步
      startLeg(limitRef.current);
      return;
    }
    startLeg(targetRef.current);
  }, [params, reduced]);

  useMotionValueEvent(x, "change", () => {
    if (velRef.current) {
      velRef.current.textContent = `${Math.round(Math.abs(x.getVelocity()))} px/s`;
    }
  });

  const onTrackClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = e.clientX - rect.left - rect.width / 2;
    retarget(raw);
  };

  /** 指针/键盘共用的改目标入口:打断当前腿,从当前位置与速度继续(reduced-motion 时直出终态) */
  const retarget = (raw: number) => {
    const limit = limitRef.current || measure();
    const target = clamp(raw, -limit, limit);
    targetRef.current = target;
    if (reduced) {
      controlsRef.current?.stop();
      x.jump(target); // 直出终态
      return;
    }
    startLeg(target);
  };

  /** 键盘等价路径:Enter/Space 把目标弹向对侧墙(与 ping-pong 同语义) */
  const onTrackKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    retarget(targetRef.current >= 0 ? -(limitRef.current || measure()) : limitRef.current || measure());
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ms-stage">
        <div
          className="ms-track"
          ref={trackRef}
          onClick={onTrackClick}
          onKeyDown={onTrackKeyDown}
          role="button"
          tabIndex={0}
          aria-label="弹簧目标:点击轨道改目标,回车弹向对侧墙 / spring target: click the lane to retarget, Enter bounces to the opposite wall"
        >
          <div className="ms-wall ms-wall-l" />
          <div className="ms-wall ms-wall-r" />
          <motion.div className="ms-ball" style={{ x }} />
        </div>
        <div className="ms-readout">
          <span className="ms-chip">
            |velocity| <span ref={velRef}>0 px/s</span>
          </span>
          <span className="ms-chip">
            {params.mode === "physics"
              ? "打断后续接当前速度 / resumes from current velocity"
              : "打断后速度归零重启 / velocity resets on interrupt"}
          </span>
          {reduced && <span className="ms-chip">reduced-motion: 直出终态 / final state only</span>}
        </div>
        <p className="ms-hint">
          点击轨道任意位置改目标 / click anywhere on the lane to retarget。
          文档标注默认 stiffness=1 + damping=10 为强过阻尼、近乎冻结——把 stiffness 拖到约
          150 感受经典弹簧;The doc-annotated stiffness=1 is heavily overdamped — raise it to ~150.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
