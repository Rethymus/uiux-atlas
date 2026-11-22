import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import type { AnimationPlaybackControls, Transition } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface CraftParams {
  animateProperty: string;
  layerHint: string;
  interruptMode: string;
}

const css = `
.sm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 8px 6px; }
.sm-lane-label { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); }
.sm-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.sm-tag b { color: var(--text); font-weight: 600; }
.sm-lane {
  position: relative; height: 34px; border-radius: 9px;
  background: color-mix(in srgb, var(--border) 28%, transparent);
}
.sm-box {
  position: absolute; top: 4px; bottom: 4px; left: 0; width: 46px; border-radius: 7px;
  background: linear-gradient(180deg, oklch(0.68 0.13 250), oklch(0.52 0.15 250));
  will-change: auto;
}
.sm-interrupt {
  position: absolute; top: 50%; left: 4px; width: 40px; height: 26px; margin-top: -13px;
  border-radius: 7px;
  background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30));
}
.sm-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.sm-btn {
  border: 1px solid transparent; border-radius: 999px; padding: 5px 16px;
  font-size: 12px; cursor: pointer; background: var(--accent); color: var(--bg);
}
.sm-btn-ghost { background: var(--surface); color: var(--text); border-color: var(--border); }
.sm-hint { max-width: 580px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
`;

/**
 * 丝滑工艺演示:三条工艺对照。
 * - 轨 A(属性对照):同一往返运动分别逐帧写 transform / left(web.dev:动 left 触发布局,transform 走合成器),
 *   帧率表实时统计 rAF 帧间隔均值与 >25ms 长帧数;
 * - 轨 B(中断接力):spring 模式(Motion 物理弹簧,继承当前速度)vs tween 模式(duration 动画,从静止重启);
 * - layerHint 演示 will-change / translateZ(0) 的提层提示(MDN:最后手段、用后即撤)。
 * 三个参数均为 JS 型枚举(订阅 store 切换 data/css 状态);reduced-motion 时静止直出。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): CraftParams => ({
    animateProperty: store.get("animateProperty") as string,
    layerHint: store.get("layerHint") as string,
    interruptMode: store.get("interruptMode") as string,
  });
  const [params, setParams] = useState<CraftParams>(readParams);
  const [stats, setStats] = useState({ avg: 16.7, long: 0 });
  const reduced = useReducedMotion() === true;

  const laneARef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const laneBRef = useRef<HTMLDivElement>(null);
  const xInt = useMotionValue(0);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
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

  // 轨 A:rAF 循环逐帧直写样式(正弦往返)+ 帧率统计(同一循环测量)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let sum = 0;
    let n = 0;
    let long = 0;
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (dt > 25) long += 1;
      sum += dt;
      n += 1;
      if (n >= 60) {
        setStats({ avg: sum / n, long });
        sum = 0;
        n = 0;
        long = 0;
      }
      const lane = laneARef.current;
      const box = boxRef.current;
      if (lane && box && !reducedRef.current) {
        const max = Math.max(10, lane.clientWidth - 46);
        const t = (now / 2000) % 1; // 2s 一个来回
        const x = (max / 2) * (1 - Math.cos(t * 2 * Math.PI));
        const prop = paramsRef.current.animateProperty;
        const zLift = paramsRef.current.layerHint === "translateZ" ? " translateZ(0)" : "";
        if (prop === "left") {
          box.style.left = `${x}px`;
        } else {
          box.style.left = "0px";
          box.style.transform = `translateX(${x}px)${zLift}`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // layerHint:事件级设置提层提示(MDN:动画前置、结束后移除;demo 按参数切换)
  // transform 的 translateZ(0) 提层在 rAF 循环内与位移一并写入,避免两条写者打架
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    box.style.willChange = params.layerHint === "will-change" ? "transform" : "auto";
  }, [params.layerHint]);

  useEffect(
    () => () => {
      controlsRef.current?.stop();
    },
    [],
  );

  /** 轨 B:切换目标;spring 从当前值速度续接,tween 从静止重启 */
  const reTarget = () => {
    const lane = laneBRef.current;
    if (!lane) return;
    const max = Math.max(20, lane.clientWidth - 4 - 40);
    const cur = xInt.get();
    const next = cur > max / 2 ? 0 : max;
    controlsRef.current?.stop();
    if (reducedRef.current) {
      xInt.jump(next);
      return;
    }
    if (paramsRef.current.interruptMode === "tween") {
      controlsRef.current = animate(xInt, next, { duration: 0.7, ease: "easeOut" });
    } else {
      const transition: Transition = { type: "spring", stiffness: 300, damping: 25, mass: 1 };
      controlsRef.current = animate(xInt, next, transition);
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sm-stage">
        <div className="sm-lane-label">
          <span>
            轨 A · 属性对照:动画 <b>{params.animateProperty === "left" ? "left(触发布局)" : "transform(合成器)"}</b>
          </span>
          <span className="sm-tag">帧间隔均值 {stats.avg.toFixed(1)}ms</span>
          <span className="sm-tag">&gt;25ms 长帧 {stats.long}/60</span>
          <span className="sm-tag">提层 {params.layerHint === "none" ? "无" : params.layerHint}</span>
        </div>
        <div className="sm-lane" ref={laneARef} aria-hidden="true">
          <div className="sm-box" ref={boxRef} />
        </div>

        <div className="sm-lane-label">
          <span>
            轨 B · 中断接力:<b>{params.interruptMode === "tween" ? "tween(从静止重启)" : "spring(速度接力)"}</b>
          </span>
          <button type="button" className="sm-btn sm-btn-ghost" onClick={reTarget}>
            中途切换目标 Re-target mid-flight
          </button>
        </div>
        <div className="sm-lane" ref={laneBRef} aria-hidden="true">
          <motion.div className="sm-interrupt" style={{ x: xInt }} />
        </div>

        <div className="sm-actions">
          <span className="sm-tag">web.dev 实测:动 top/left 丢帧约 50%,transform 约 1%(Chrome FPS 面板)</span>
        </div>
        <p className="sm-hint">
          逐帧直写 el.style.transform(不经 CSS 变量);will-change 是最后手段——demo 仅作演示切换,生产上应动画前置、
          animationend 后即撤 / Per-frame writes go straight to el.style.transform; will-change is a last resort — set before animating, remove on animationend.
          {reduced ? " · reduced-motion: 静止直出" : ""}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
