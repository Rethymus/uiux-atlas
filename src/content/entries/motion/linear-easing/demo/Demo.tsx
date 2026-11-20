import { useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface LinearParams {
  stiffness: number;
  damping: number;
}

interface SamplePoint {
  /** 采样时刻(秒) */
  t: number;
  /** 归一化进度(可越界,overshoot > 1) */
  p: number;
}

const BOX = 34;
/** 抽稀容差:linear-easing-generator README 链接参数可见的默认 simplify=0.0017(调研 04§8) */
const SIMPLIFY_EPS = 0.0017;

/**
 * 弹簧采样(mass=1,半隐式欧拉积分):x'' = −k(x−1) − c·x'。
 * 每 8ms 取一个进度点,|x−1| 与 |v| 同时低于阈值即视为静止,总时长上限 6s。
 */
function sampleSpring(k: number, c: number): SamplePoint[] {
  const dt = 1 / 240;
  const sampleEvery = 0.008;
  const pts: SamplePoint[] = [{ t: 0, p: 0 }];
  let x = 0;
  let v = 0;
  let t = 0;
  let nextSample = sampleEvery;
  let calm = 0;
  while (t < 6) {
    const a = -k * (x - 1) - c * v;
    v += a * dt;
    x += v * dt;
    t += dt;
    if (t >= nextSample) {
      pts.push({ t, p: x });
      nextSample += sampleEvery;
    }
    if (Math.abs(x - 1) < 0.002 && Math.abs(v) < 0.02) calm += dt;
    else calm = 0;
    if (calm >= 0.02) break;
  }
  pts.push({ t, p: 1 });
  return pts;
}

/**
 * Douglas-Peucker 抽稀(Jake Archibald 生成器的 simplify 思路):
 * 在「时间×进度」平面上保留对曲线形状偏差 > eps 的点。
 */
function simplifyPoints(points: SamplePoint[], eps: number): SamplePoint[] {
  if (points.length <= 2) return points;
  const keep = new Array<boolean>(points.length).fill(false);
  keep[0] = true;
  keep[points.length - 1] = true;
  const stack: Array<[number, number]> = [[0, points.length - 1]];
  while (stack.length > 0) {
    const seg = stack.pop();
    if (!seg) break;
    const [s, e] = seg;
    if (e - s < 2) continue;
    const a = points[s];
    const b = points[e];
    const dx = b.t - a.t;
    const dy = b.p - a.p;
    const len = Math.hypot(dx, dy) || 1e-9;
    let maxD = 0;
    let idx = -1;
    for (let i = s + 1; i < e; i++) {
      const pt = points[i];
      const d = Math.abs(dy * (pt.t - a.t) - dx * (pt.p - a.p)) / len;
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (maxD > eps && idx > 0) {
      keep[idx] = true;
      stack.push([s, idx], [idx, e]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/**
 * 编译为 linear() 文本:数值 round=3(生成器默认,调研 04§8);
 * 抽稀后时间位置偏离「均分位」的点补 % 停留点,保证分段线性形状不失真。
 */
function buildLinearEasing(kept: SamplePoint[], settle: number): string {
  const n = kept.length;
  const parts: string[] = [];
  for (let i = 0; i < n; i++) {
    const pt = kept[i];
    if (i === 0) {
      parts.push("0");
      continue;
    }
    if (i === n - 1) {
      parts.push("1");
      continue;
    }
    const value = String(Math.round(pt.p * 1000) / 1000);
    const timePct = settle > 0 ? (pt.t / settle) * 100 : 0;
    const evenPct = (i / (n - 1)) * 100;
    if (Math.abs(timePct - evenPct) > 0.05) {
      parts.push(`${value} ${timePct.toFixed(2)}%`);
    } else {
      parts.push(value);
    }
  }
  return `linear(${parts.join(", ")})`;
}

const css = `
.le-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 20px;
}
.le-tracks { display: grid; gap: 18px; }
.le-track {
  position: relative;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
}
.le-goal {
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: calc(100% - ${BOX}px);
  border-left: 2px dashed var(--accent);
}
.le-goal::after {
  content: "终点 target";
  position: absolute;
  top: -16px;
  left: -34px;
  font-size: 10px;
  white-space: nowrap;
  color: var(--accent);
}
.le-box {
  position: absolute;
  top: 50%;
  left: 0;
  width: ${BOX}px;
  height: 30px;
  margin-top: -15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  animation: le-slide var(--le-duration, 1s) var(--spring-easing, linear) both;
}
.le-box-spring { background: linear-gradient(135deg, oklch(0.66 0.16 250), oklch(0.5 0.18 300)); }
.le-box-ease {
  background: linear-gradient(135deg, oklch(0.74 0.1 85), oklch(0.6 0.12 60));
  animation-timing-function: ease;
}
.le-tag {
  position: absolute;
  top: -20px;
  left: 2px;
  font-size: 11px;
  color: var(--text-faint);
}
@keyframes le-slide {
  from { transform: translateX(0); }
  to { transform: translateX(var(--le-travel, 240px)); }
}
.le-code {
  margin: 0;
  max-height: 150px;
  overflow: auto;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  font-size: 11px;
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--text-dim);
}
.le-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.le-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.le-actions { display: flex; align-items: center; gap: 10px; }
.le-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.le-btn:hover { border-color: var(--accent); color: var(--accent); }
.le-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
@media (prefers-reduced-motion: reduce) {
  .le-box { animation: none; transform: translateX(var(--le-travel, 240px)); }
}
`;

/**
 * linear() 采样演示:JS 型参数 stiffness/damping 订阅 store,
 * 每次变化重新采样 → Douglas-Peucker 抽稀 → 编译 linear() 文本 →
 * 写入场景 CSS 变量(--spring-easing / --le-duration),动画本体是纯 CSS。
 * <pre> 显示的就是当前正在应用的产物。
 * 默认 170/26 为社区常见弹簧手感值(react-spring 传统默认),调研未证实为官方数值。
 * reduced-motion:不播动画直出终态(见下方 @media),生成文本照常更新。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): LinearParams => ({
    stiffness: store.get("stiffness") as number,
    damping: store.get("damping") as number,
  });

  const [params, setParams] = useState<LinearParams>(readParams);
  const [runId, setRunId] = useState(0);
  const [reduced, setReduced] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // prefers-reduced-motion:matchMedia + change 监听(web.dev 惯例,调研 04§6.2)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const compiled = useMemo(() => {
    const pts = sampleSpring(params.stiffness, params.damping);
    const kept = simplifyPoints(pts, SIMPLIFY_EPS);
    const settle = pts[pts.length - 1].t;
    const duration = Math.max(0.2, Math.round(settle * 100) / 100);
    return {
      easing: buildLinearEasing(kept, settle),
      points: kept.length,
      duration,
    };
  }, [params]);

  // 产物注入场景变量:<pre> 显示的与实际应用的一致
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty("--spring-easing", compiled.easing);
    scene.style.setProperty("--le-duration", `${compiled.duration}s`);
  }, [compiled]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const scene = sceneRef.current;
      if (!track || !scene) return;
      scene.style.setProperty("--le-travel", `${Math.max(20, track.clientWidth - BOX)}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const codeText =
    `/* spring(k=${params.stiffness}, c=${params.damping}, mass=1) → ${compiled.points} pts · ${compiled.duration}s */\n` +
    `--spring-easing: ${compiled.easing};\n\n` +
    `.box {\n  animation: slide ${compiled.duration}s var(--spring-easing) both;\n}`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="le-stage" ref={sceneRef}>
        <div
          className="le-tracks"
          key={`${runId}-${params.stiffness}-${params.damping}-${reduced ? "r" : "m"}`}
        >
          <div className="le-track" ref={trackRef}>
            <span className="le-tag">linear() 弹簧 spring via linear()</span>
            <span className="le-goal" aria-hidden="true" />
            <div className="le-box le-box-spring" aria-hidden="true" />
          </div>
          <div className="le-track">
            <span className="le-tag">ease 对照 comparison</span>
            <span className="le-goal" aria-hidden="true" />
            <div className="le-box le-box-ease" aria-hidden="true" />
          </div>
        </div>
        <pre className="le-code">{codeText}</pre>
        <div className="le-readout">
          <span className="le-chip">{compiled.points} pts · {compiled.duration}s</span>
          {reduced && (
            <span className="le-chip">reduced-motion: 直出终态 final state only</span>
          )}
        </div>
        <div className="le-actions">
          <button type="button" className="le-btn" onClick={() => setRunId((n) => n + 1)}>
            重播 Replay
          </button>
        </div>
        <p className="le-hint">
          上轨 = 生成的 linear()(纯 CSS 播放),下轨 = 同动画的 ease 对照;overshoot 会越过虚线 /
          top track = the generated linear() played by pure CSS, bottom = the same animation with ease; overshoot crosses the dashed line。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
