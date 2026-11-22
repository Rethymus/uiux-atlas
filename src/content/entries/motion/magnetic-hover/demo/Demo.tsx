import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface MagnetParams {
  radius: number;
  lerp: number;
  mode: string;
}

const css = `
.mg-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 18px 20px; overflow: hidden; }
.mg-field {
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--border);
  border-radius: 14px;
  background: color-mix(in srgb, var(--surface) 55%, transparent);
  overflow: hidden;
}
.mg-btn {
  width: 132px;
  height: 132px;
  border: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, oklch(0.78 0.12 250), oklch(0.56 0.17 262) 62%, oklch(0.46 0.16 268));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  will-change: translate;
}
.mg-btn:hover { box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32); }
.mg-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.mg-btn:active { filter: brightness(0.92); }
.mg-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; font-size: 12px; color: var(--text-dim); }
.mg-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.mg-chip-accent { border-color: var(--accent); color: var(--accent); }
.mg-chip-warn { border-color: oklch(0.65 0.16 60); color: oklch(0.55 0.14 60); }
.mg-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
/* 降级双保险(补研 12§5 CSS 片段) */
@media (prefers-reduced-motion: reduce), (hover: none) {
  .mg-btn { translate: none !important; }
}
`;

/**
 * 磁吸演示(补研 12§5 实现片段的零依赖版):
 * - 距离判定:reach = max(宽,高)/2 ÷ (1 − radius);半径内 target = 指针偏移 × radius,半径外归零;
 * - 逐帧插值:current += (target − current) × lerp,rAF 循环,直写 el.style.translate(不经 CSS 变量,避免逐帧子树失效);
 * - 只响应 mouse 指针(磁吸是 hover 语义,触屏经 (hover: none) 判定直出降级);
 * - prefers-reduced-motion: reduce 下整体关闭磁吸循环(前庭安全),CSS 媒体查询再兜一层;
 * - mode=plain 预览降级形态(普通 hover)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): MagnetParams => ({
    radius: store.get("radius") as number,
    lerp: store.get("lerp") as number,
    mode: store.get("mode") as string,
  });
  const [params, setParams] = useState<MagnetParams>(readParams);
  const [reduced, setReduced] = useState(false);
  const [touchOnly, setTouchOnly] = useState(false);

  const fieldRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const offsetRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const loopRef = useRef<() => void>(() => {});

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store],
  );

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqTouch = window.matchMedia("(hover: none)");
    const apply = () => {
      setReduced(mqReduce.matches);
      setTouchOnly(mqTouch.matches);
    };
    apply();
    mqReduce.addEventListener("change", apply);
    mqTouch.addEventListener("change", apply);
    return () => {
      mqReduce.removeEventListener("change", apply);
      mqTouch.removeEventListener("change", apply);
    };
  }, []);

  const magnetOn = params.mode === "magnet" && !reduced && !touchOnly;

  // lerp 循环:current += (target − current) × lerp,归位后自动停循环
  loopRef.current = () => {
    const l = paramsRef.current.lerp;
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * l;
    c.y += (t.y - c.y) * l;
    const btn = btnRef.current;
    if (btn) btn.style.translate = `${c.x.toFixed(2)}px ${c.y.toFixed(2)}px`;
    if (offsetRef.current) offsetRef.current.textContent = `${Math.round(c.x)}, ${Math.round(c.y)} px`;
    const settled = Math.abs(t.x) < 0.2 && Math.abs(t.y) < 0.2 && Math.abs(c.x - t.x) < 0.2 && Math.abs(c.y - t.y) < 0.2;
    if (stateRef.current) stateRef.current.textContent = settled ? "回位 released" : "吸住 attracted";
    if (settled && t.x === 0 && t.y === 0) {
      c.x = 0;
      c.y = 0;
      if (btn) btn.style.translate = "0px 0px";
      if (offsetRef.current) offsetRef.current.textContent = "0, 0 px";
      runningRef.current = false;
      return;
    }
    rafRef.current = requestAnimationFrame(() => loopRef.current());
  };

  const startLoop = () => {
    if (!runningRef.current) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(() => loopRef.current());
    }
  };

  // 磁吸关闭(参数/媒体查询变化)时立即停循环并复位
  useEffect(() => {
    if (magnetOn) return;
    cancelAnimationFrame(rafRef.current);
    runningRef.current = false;
    target.current = { x: 0, y: 0 };
    current.current = { x: 0, y: 0 };
    const btn = btnRef.current;
    if (btn) btn.style.translate = "0px 0px";
    if (offsetRef.current) offsetRef.current.textContent = "0, 0 px";
    if (stateRef.current) stateRef.current.textContent = "关闭 off";
  }, [magnetOn]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!magnetOn || e.pointerType === "touch") return;
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(mx, my);
    const reach = Math.max(r.width, r.height) / 2 / (1 - paramsRef.current.radius);
    if (dist < reach) {
      target.current = { x: mx * paramsRef.current.radius, y: my * paramsRef.current.radius };
    } else {
      target.current = { x: 0, y: 0 };
    }
    startLoop();
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0 };
    if (magnetOn) startLoop();
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="mg-stage">
        <div
          className="mg-field"
          ref={fieldRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          data-plain={!magnetOn || undefined}
        >
          <button type="button" className="mg-btn" ref={btnRef}>
            磁吸 Magnetic
          </button>
        </div>
        <div className="mg-readout">
          <span className="mg-chip">
            偏移 offset <span ref={offsetRef}>0, 0 px</span>
          </span>
          <span className="mg-chip">
            状态 state <span ref={stateRef}>{magnetOn ? "待命 idle" : "关闭 off"}</span>
          </span>
          <span className="mg-chip">
            radius {params.radius} · lerp {params.lerp}
          </span>
          {reduced && <span className="mg-chip mg-chip-warn">prefers-reduced-motion: 磁吸关闭 / magnetism off</span>}
          {touchOnly && <span className="mg-chip mg-chip-warn">(hover: none) 触屏直出普通 hover / touch degrades</span>}
          {!magnetOn && !reduced && !touchOnly && <span className="mg-chip mg-chip-accent">mode=plain:降级形态预览 / degraded preview</span>}
        </div>
        <p className="mg-hint">
          用鼠标在虚线框内移动:按钮在吸引半径内按 radius 比例被吸向指针,离开即 lerp 回位。触屏与 reduced-motion
          用户看到的就是 plain 形态——炫技不伤人 / move the mouse inside the dashed field: inside the attraction radius the
          button leans toward the pointer by the radius factor, then lerps back on exit; touch and reduced-motion users
          simply get the plain hover — flourish without harm.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
