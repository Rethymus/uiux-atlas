import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type BezierTuple = [number, number, number, number];

/** 参数面板序列化 cubicBezier 时同款格式,读数条直接复用 */
const fmtCurve = (c: BezierTuple): string => `cubic-bezier(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;

const css = `
.cb-scene { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 4px 6px; }
.cb-row { display: flex; gap: 20px; align-items: center; }
.cb-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.cb-track {
  position: relative; height: 60px; border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer;
}
.cb-track:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.cb-ball {
  position: absolute; top: 50%; left: 10px; width: 40px; height: 40px; margin-top: -20px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  animation: cb-run 1.6s var(--cb-curve, cubic-bezier(0.25, 0.1, 0.25, 1)) infinite alternate;
}
@keyframes cb-run { from { transform: translateX(0); } to { transform: translateX(var(--cb-dist, 300px)); } }
.cb-preview {
  flex: 0 0 auto; border: 1px solid var(--border); border-radius: 10px;
  background: var(--surface); overflow: hidden;
}
.cb-preview svg { display: block; }
.cb-dot-x { animation: cb-dot-x 1.6s linear infinite alternate; }
.cb-dot-y { animation: cb-dot-y 1.6s var(--cb-curve, cubic-bezier(0.25, 0.1, 0.25, 1)) infinite alternate; }
@keyframes cb-dot-x { from { transform: translateX(0px); } to { transform: translateX(100px); } }
@keyframes cb-dot-y { from { transform: translateY(0px); } to { transform: translateY(-100px); } }
.cb-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.cb-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.cb-note { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
.cb-replay {
  margin-left: auto; border: 1px solid var(--border); border-radius: 999px;
  padding: 4px 14px; font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
.cb-scene[data-reduced="true"] .cb-ball { animation: none; transform: translateX(var(--cb-dist, 300px)); }
.cb-scene[data-reduced="true"] .cb-dot-x { animation: none; transform: translateX(100px); }
.cb-scene[data-reduced="true"] .cb-dot-y { animation: none; transform: translateY(-100px); }
`;

/**
 * cubic-bezier 演示:球沿 var(--cb-curve) 往返,SVG 示踪点用「外层线性 X + 内层贝塞尔 Y」
 * 的嵌套结构复现同一曲线(CSS 多动画写同一 transform 属性会互相覆盖,嵌套才能合成两个
 * 时间函数),预览与运动共享同一时长与起点,天然同步。
 * curve 为 CSS 型参数(cssVar --cb-curve);球位移距离由 ResizeObserver 测量注入 --cb-dist。
 * prefers-reduced-motion: reduce 时停用全部循环动画,静态呈现终态与曲线形状。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [curve, setCurve] = useState<BezierTuple>(() => [...(store.get("curve") as BezierTuple)]);
  const [runId, setRunId] = useState(0); // 重播:key 重挂载重启动画
  const [dist, setDist] = useState(300);
  const reduced = useReducedMotion() === true;
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setCurve([...(store.get("curve") as BezierTuple)]);
      }),
    [store],
  );

  // 轨道宽 - 球径 - 左边距 = 位移距离;避免动画 left(布局属性)
  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    if (!track || !scene) return;
    const measure = () => setDist(Math.max(40, track.clientWidth - 10 - 40));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (sceneRef.current) sceneRef.current.style.setProperty("--cb-dist", `${dist}px`);
  }, [dist]);

  const onTrackKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setRunId((n) => n + 1);
    }
  };

  const gridLines = useMemo(
    () => (
      <>
        <line x1={0} y1={100} x2={100} y2={0} stroke="var(--border-strong)" strokeWidth={1} strokeDasharray="3 3" />
        <line x1={0} y1={0} x2={100} y2={0} stroke="var(--border)" strokeWidth={1} />
        <line x1={0} y1={100} x2={100} y2={100} stroke="var(--border)" strokeWidth={1} />
      </>
    ),
    [],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cb-scene" ref={sceneRef} data-reduced={reduced}>
        <div className="cb-row">
          <div className="cb-main">
            <div
              className="cb-track"
              ref={trackRef}
              role="button"
              tabIndex={0}
              aria-label="重播缓动演示 replay the easing demo"
              onClick={() => setRunId((n) => n + 1)}
              onKeyDown={onTrackKey}
            >
              {/* key 变化即重挂载 → 循环动画从 t=0 重播 */}
              <div className="cb-ball" key={`ball-${runId}`} />
            </div>
            <div className="cb-meta">
              <span className="cb-chip">{fmtCurve(curve)}</span>
              {reduced && <span className="cb-chip">reduced-motion: 直出终态 / final state only</span>}
            </div>
            <p className="cb-note">
              球与右侧示踪点消费同一曲线,水平轴=时间、垂直轴=进度;越过顶线即过冲 /
              The ball and the tracer share one curve: x = time, y = progress; crossing the top line means overshoot.
            </p>
          </div>
          <div className="cb-preview">
            <svg width={96} height={173} viewBox="0 -40 100 180" role="img" aria-label="cubic-bezier 曲线预览 curve preview">
              <rect x={0} y={-40} width={100} height={40} fill="oklch(0.62 0.16 25 / 0.12)" />
              <rect x={0} y={100} width={100} height={40} fill="oklch(0.62 0.16 25 / 0.08)" />
              {gridLines}
              <line x1={0} y1={100} x2={curve[0] * 100} y2={(1 - curve[1]) * 100} stroke="var(--border-strong)" strokeWidth={1} />
              <line x1={100} y1={0} x2={curve[2] * 100} y2={(1 - curve[3]) * 100} stroke="var(--border-strong)" strokeWidth={1} />
              <path
                d={`M 0 100 C ${curve[0] * 100} ${(1 - curve[1]) * 100}, ${curve[2] * 100} ${(1 - curve[3]) * 100}, 100 0`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2.5}
              />
              <circle cx={curve[0] * 100} cy={(1 - curve[1]) * 100} r={3} fill="var(--accent)" />
              <circle cx={curve[2] * 100} cy={(1 - curve[3]) * 100} r={3} fill="var(--accent)" />
              <g className="cb-dot-x" key={`dot-${runId}`}>
                <circle
                  className="cb-dot-y"
                  cx={0}
                  cy={100}
                  r={4.5}
                  fill="oklch(0.62 0.2 40)"
                  stroke="var(--bg)"
                  strokeWidth={1.5}
                />
              </g>
            </svg>
          </div>
        </div>
        <button type="button" className="cb-replay" onClick={() => setRunId((n) => n + 1)}>
          重播 Replay
        </button>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
