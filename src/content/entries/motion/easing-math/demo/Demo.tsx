import { useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖缓动求解(调研 14§6.1,算法核对自 CSS Easing 2 规范) —— */

/** 参数化三次:B(t) = 3u²t·c1 + 3ut²·c2 + t³(P0=0、P3=1 固定) */
const bez = (t: number, c1: number, c2: number): number => {
  const u = 1 - t;
  return 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t;
};

/** 导数(牛顿法用) */
const bezD = (t: number, c1: number, c2: number): number =>
  3 * (1 - t) ** 2 * c1 + 6 * (1 - t) * t * (c2 - c1) + 3 * t * t * (1 - c2);

/** 牛顿迭代反解 t;失败二分兜底 */
function solveT(p: number, x1: number, x2: number): { t: number; iters: number } {
  let t = p;
  for (let i = 0; i < 8; i++) {
    const err = bez(t, x1, x2) - p;
    if (Math.abs(err) < 1e-6) return { t, iters: i };
    const d = bezD(t, x1, x2);
    if (Math.abs(d) < 1e-6) break;
    t = Math.min(1, Math.max(0, t - err / d));
  }
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, x1, x2) < p) lo = mid;
    else hi = mid;
  }
  return { t: (lo + hi) / 2, iters: 8 };
}

/** linear() 采样:(x(tᵢ), y(tᵢ)) 二元组 */
const sampleLinear = (
  n: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): [number, number][] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return [bez(t, x1, x2), bez(t, y1, y2)];
  });

/** linear() 求值:先钳制,再两点一线(CSS Easing 2 §2.1.4) */
function evalLinear(pts: [number, number][], p: number): number {
  const pc = Math.min(1, Math.max(0, p));
  let i = 0;
  while (i < pts.length - 2 && pts[i + 1][0] <= pc) i++;
  const [ax, ay] = pts[i];
  const [bx, by] = pts[i + 1];
  return bx === ax ? by : ay + ((pc - ax) / (bx - ax)) * (by - ay);
}

interface EaseParams {
  curve: [number, number, number, number];
  segments: number;
  mode: string;
}

const css = `
.em-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 30px 14px 10px; overflow: hidden; }
.em-plot { flex: 1; min-height: 0; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); position: relative; }
.em-plot svg { width: 100%; height: 100%; display: block; }
.em-slider { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.em-slider input[type="range"] { flex: 1; accent-color: var(--accent); }
.em-read { display: flex; flex-wrap: wrap; gap: 4px; font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.em-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); white-space: nowrap; }
.em-tag b { color: var(--text); font-weight: 600; }
.em-replay { border: 1px solid transparent; border-radius: 999px; padding: 2px 12px; font-size: 11px; cursor: pointer; background: var(--accent); color: var(--bg); }
.em-replay:disabled { opacity: 0.5; cursor: default; }
.em-foot { font-size: 11px; color: var(--text-faint); }
.em-stage { animation: em-in 0.4s ease-out both; }
@keyframes em-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .em-stage { animation: none; } }
`;

const W = 300;
const H = 220;
const PAD = 12;
// 绘图域 y ∈ [-0.25, 1.25],x ∈ [0,1]
const gx = (v: number): number => PAD + v * (W - 2 * PAD);
const gy = (v: number): number => H - PAD - ((v + 0.25) / 1.5) * (H - 2 * PAD);

/**
 * 缓动函数数学演示:curve/segments/mode(均为 JS/store 参数)驱动;
 * 细线 = 参数化 bezier 精确曲线,虚线 = linear() 采样折线;
 * 时间滑杆(demo 本地)+ 回放小点(reduced-motion 禁用);无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): EaseParams => ({
    curve: store.get("curve") as [number, number, number, number],
    segments: store.get("segments") as number,
    mode: store.get("mode") as string,
  });
  const [p, setP] = useState<EaseParams>(read);
  const [time, setTime] = useState(0.5);
  const [replaying, setReplaying] = useState(false);
  const rafRef = useRef(0);
  const reduced = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const on = (): void => {
      reduced.current = mq.matches;
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const [x1, y1, x2, y2] = p.curve;
  const pts = useMemo(() => sampleLinear(p.segments, x1, y1, x2, y2), [p.segments, x1, y1, x2, y2]);

  const { t: tSolved, iters } = useMemo(() => solveT(time, x1, x2), [time, x1, x2]);
  const yNewton = bez(tSolved, y1, y2);
  const yLin = evalLinear(pts, time);

  // 采样最大偏差(60 个时间点,牛顿反解后对比)
  const maxErr = useMemo(() => {
    let m = 0;
    for (let i = 1; i < 60; i++) {
      const px2 = i / 60;
      const st = solveT(px2, x1, x2);
      const exact = bez(st.t, y1, y2);
      const lin = evalLinear(pts, px2);
      m = Math.max(m, Math.abs(exact - lin));
    }
    return m;
  }, [pts, x1, y1, x2, y2]);

  // 精确曲线 path
  const exactPath = useMemo(() => {
    const seg: string[] = [];
    const N = 90;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      seg.push(`${i === 0 ? "M" : "L"}${gx(bez(t, x1, x2)).toFixed(1)},${gy(bez(t, y1, y2)).toFixed(1)}`);
    }
    return seg.join(" ");
  }, [x1, y1, x2, y2]);

  const linPath = useMemo(
    () => pts.map(([px2, py2], i) => `${i === 0 ? "M" : "L"}${gx(px2).toFixed(1)},${gy(py2).toFixed(1)}`).join(" "),
    [pts],
  );

  const replay = (): void => {
    cancelAnimationFrame(rafRef.current);
    if (reduced.current) return;
    setReplaying(true);
    const t0 = performance.now();
    const tick = (now: number): void => {
      const e = Math.min(1, (now - t0) / 1000);
      setTime(e);
      if (e < 1) rafRef.current = requestAnimationFrame(tick);
      else setReplaying(false);
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const fmt = (v: number, d = 3): string => String(+v.toFixed(d));
  const isBezierMode = p.mode === "bezier";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="em-stage">
        <div className="em-plot" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <rect x={gx(0)} y={gy(1)} width={gx(1) - gx(0)} height={gy(0) - gy(1)} fill="none" stroke="var(--border)" strokeWidth="1" />
            <path d={linPath} fill="none" stroke="oklch(0.62 0.16 250)" strokeWidth="1.6" strokeDasharray="5 4" />
            <path d={exactPath} fill="none" stroke="oklch(0.62 0.2 40)" strokeWidth="2" />
            {pts.map(([px2, py2], i) => (
              <circle key={i} cx={gx(px2)} cy={gy(py2)} r="2.4" fill="oklch(0.62 0.16 250)" />
            ))}
            <circle cx={gx(time)} cy={gy(yNewton)} r="5" fill="oklch(0.62 0.2 40)" stroke="var(--surface)" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="em-slider">
          <label htmlFor={`${entryId}-t`}>时间进度 t = {fmt(time, 2)}</label>
          <input
            id={`${entryId}-t`}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
          <button type="button" className="em-replay" onClick={replay} disabled={reduced.current || replaying}>
            {replaying ? "回放中…" : "回放 Replay"}
          </button>
        </div>
        <div className="em-read">
          <span className="em-tag">
            牛顿:{isBezierMode ? <b>主路径</b> : "对照"} t={fmt(tSolved, 4)},{iters} 轮收敛,y={fmt(yNewton, 4)}
          </span>
          <span className="em-tag">
            linear():{!isBezierMode ? <b>主路径</b> : "对照"} y={fmt(yLin, 4)}(段内两点一线)
          </span>
          <span className="em-tag">
            采样偏差 max|Δ| = <b>{fmt(maxErr, 4)}</b>({p.segments} 段)
          </span>
        </div>
        <p className="em-foot">
          细橙 = 精确参数化曲线(x(t),y(t)) · 蓝虚 = linear() 采样折线 · 求值必经「由 x 反解 t」
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
