import { useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖弹簧积分(调研 14§3.3,Node v22 实跑核验) —— */

/** 半隐式欧拉轨迹(先速度、后位置) */
function springTrace(
  k: number,
  c: number,
  m: number,
  dt: number,
  T = 2,
): { t: number[]; x: number[]; diverged: boolean } {
  const n = Math.max(1, Math.round(T / dt));
  const t: number[] = [0];
  const x: number[] = [0];
  let xi = 0;
  let v = 0;
  let diverged = false;
  for (let i = 1; i <= n; i++) {
    const a = (-k * (xi - 1) - c * v) / m;
    v += a * dt; // 先速度
    xi += v * dt; // 后位置(用新 v)
    t.push(i * dt);
    x.push(xi);
    if (!Number.isFinite(xi) || Math.abs(xi) > 4) {
      diverged = true;
      break;
    }
  }
  return { t, x, diverged };
}

/** 显式欧拉对照(位置用旧速度推进)——只作对照,不进生产 */
function explicitTrace(
  k: number,
  c: number,
  m: number,
  dt: number,
  T = 2,
): { t: number[]; x: number[]; diverged: boolean } {
  const n = Math.max(1, Math.round(T / dt));
  const t: number[] = [0];
  const x: number[] = [0];
  let xi = 0;
  let v = 0;
  let diverged = false;
  for (let i = 1; i <= n; i++) {
    const a = (-k * (xi - 1) - c * v) / m;
    xi += v * dt; // 旧速度
    v += a * dt;
    t.push(i * dt);
    x.push(xi);
    if (!Number.isFinite(xi) || Math.abs(xi) > 4) {
      diverged = true;
      break;
    }
  }
  return { t, x, diverged };
}

/** 解析读数:ω₀、ζ、c_crit、过冲比 OS、2% 整定 */
function springAnalytics(k: number, c: number, m: number) {
  const w0 = Math.sqrt(k / m);
  const z = c / (2 * Math.sqrt(k * m));
  return {
    w0,
    z,
    ccrit: 2 * Math.sqrt(k * m),
    OS: z < 1 ? Math.exp((-Math.PI * z) / Math.sqrt(1 - z * z)) : 0,
    ts2: z > 0 ? -Math.log(0.02) / (z * w0) : Infinity,
  };
}

interface SpringParams {
  k: number;
  c: number;
  m: number;
  dtMs: number;
}

const css = `
.sp-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 4px; padding: 30px 12px 8px; overflow: hidden; }
.sp-plot { flex: 1; min-height: 0; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); }
.sp-plot svg { width: 100%; height: 100%; display: block; }
.sp-read { display: flex; flex-wrap: wrap; gap: 4px; font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.sp-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); white-space: nowrap; }
.sp-tag b { color: var(--text); font-weight: 600; }
.sp-tag[data-warn="1"] { border-color: oklch(0.62 0.19 25); color: oklch(0.55 0.19 25); }
.sp-foot { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); }
.sp-replay { border: 1px solid transparent; border-radius: 999px; padding: 3px 14px; font-size: 11px; cursor: pointer; background: var(--accent); color: var(--bg); }
.sp-lane { position: relative; height: 20px; border-radius: 8px; background: color-mix(in srgb, var(--border) 24%, transparent); }
.sp-goal { position: absolute; top: 3px; bottom: 3px; right: 0; width: 7px; border-radius: 4px; background: oklch(0.55 0.14 250); }
.sp-ball { position: absolute; top: 50%; left: 2px; width: 14px; height: 14px; margin-top: -7px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30)); pointer-events: none; }
`;

const W = 600;
const H = 220;
const PAD = 8;
const YMAX = 2.2; // 绘图域 y ∈ [-0.3, YMAX]

const px = (t: number): number => PAD + (t / 2) * (W - 2 * PAD);
const py = (x: number): number => H - PAD - ((x + 0.3) / (YMAX + 0.3)) * (H - 2 * PAD);

function pathOf(t: number[], x: number[], cap = 3): string {
  const seg: string[] = [];
  for (let i = 0; i < t.length; i++) {
    const xi = Math.max(-cap, Math.min(cap, x[i]));
    seg.push(`${i === 0 ? "M" : "L"}${px(t[i]).toFixed(1)},${py(xi).toFixed(1)}`);
  }
  return seg.join(" ");
}

/**
 * 弹簧积分器演示:k/c/m/dt(均为 JS 型参数,订阅 store)驱动半隐式欧拉积分,
 * 与显式欧拉对照叠加;解析读数(ζ/OS/t_s/c_crit)与仿真实测并列;
 * 小球沿半隐式轨迹回放,reduced-motion 跳过回放。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): SpringParams => ({
    k: store.get("stiffness") as number,
    c: store.get("damping") as number,
    m: store.get("mass") as number,
    dtMs: store.get("dt") as number,
  });
  const [p, setP] = useState<SpringParams>(read);
  const [playing, setPlaying] = useState(false);
  const [ballX, setBallX] = useState(0);
  const ballRaf = useRef(0);
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

  const dt = p.dtMs / 1000;
  const { trace, ex, ana, simPeak, simDiv } = useMemo(() => {
    const tr = springTrace(p.k, p.c, p.m, dt);
    const exr = explicitTrace(p.k, p.c, p.m, dt);
    let peak = 0;
    for (const xi of tr.x) if (xi - 1 > peak) peak = xi - 1;
    return { trace: tr, ex: exr, ana: springAnalytics(p.k, p.c, p.m), simPeak: peak, simDiv: tr.diverged };
  }, [p.k, p.c, p.m, dt]);

  const replay = (): void => {
    cancelAnimationFrame(ballRaf.current);
    if (reduced.current || trace.diverged) {
      setBallX(trace.diverged ? 0 : 1);
      return;
    }
    setPlaying(true);
    const t0 = performance.now();
    const tick = (now: number): void => {
      const t = (now - t0) / 1000;
      if (t >= 2) {
        setBallX(1);
        setPlaying(false);
        return;
      }
      const idx = Math.min(trace.t.length - 1, Math.round(t / dt));
      setBallX(Math.max(-3, Math.min(3, trace.x[idx])));
      ballRaf.current = requestAnimationFrame(tick);
    };
    ballRaf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(ballRaf.current), []);

  const fmt = (v: number, d = 2): string => (Number.isFinite(v) ? String(+v.toFixed(d)) : "∞");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sp-stage">
        <div className="sp-plot" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <line x1={PAD} y1={py(1)} x2={W - PAD} y2={py(1)} stroke="oklch(0.55 0.14 250)" strokeWidth="1.5" strokeDasharray="6 5" />
            <path d={pathOf(ex.t, ex.x)} fill="none" stroke="oklch(0.65 0.18 25)" strokeWidth="1.6" opacity="0.75" />
            <path d={pathOf(trace.t, trace.x)} fill="none" stroke="oklch(0.62 0.16 165)" strokeWidth="2.2" />
            <line x1={PAD} y1={py(0)} x2={W - PAD} y2={py(0)} stroke="var(--border)" strokeWidth="1" />
          </svg>
        </div>
        <div className="sp-read">
          <span className="sp-tag">ζ = c/(2√(km)) = <b>{fmt(ana.z)}</b></span>
          <span className="sp-tag">ω₀ = √(k/m) = <b>{fmt(ana.w0, 1)}</b> rad/s</span>
          <span className="sp-tag">c_crit = 2√(km) = <b>{fmt(ana.ccrit, 1)}</b></span>
          <span className="sp-tag">OS(解析) = <b>{(ana.OS * 100).toFixed(1)}%</b></span>
          <span className="sp-tag" data-warn={simDiv ? "1" : undefined}>
            仿真峰值 = <b>{simDiv ? "发散" : `${((simPeak * 100) || 0).toFixed(1)}%`}</b>
          </span>
          <span className="sp-tag">t_s ≈ 4/(ζω₀) = <b>{fmt(ana.ts2)}s</b></span>
        </div>
        <div className="sp-lane" aria-hidden="true">
          <div className="sp-goal" />
          <div className="sp-ball" style={{ translate: `${ballX * 92}% 0` }} />
        </div>
        <div className="sp-foot">
          <button type="button" className="sp-replay" onClick={replay}>
            {playing ? "回放中…" : "回放 Replay"}
          </button>
          <span>绿 = 半隐式(先速度后位置) · 红 = 显式欧拉(对照) · 虚线 = 目标 1</span>
          {simDiv && <span>半隐式已发散:dt={p.dtMs}ms 过大 / diverged: dt too large</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
