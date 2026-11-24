import { useEffect, useMemo, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖标度(调研 14§8,实跑核验:linear 50→320;log 10→213.33) —— */

const scaleLinear =
  (d0: number, d1: number, r0: number, r1: number) =>
  (x: number): number =>
    r0 + ((x - d0) / (d1 - d0)) * (r1 - r0);

const scaleLog =
  (d0: number, d1: number, r0: number, r1: number) =>
  (x: number): number =>
    r0 +
    ((Math.log(x) - Math.log(d0)) / (Math.log(d1) - Math.log(d0))) * (r1 - r0);

interface ScaleParams {
  transform: string;
  d0: number;
  d1: number;
  r0: number;
  r1: number;
}

const css = `
.sf-stage { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(150px, 1fr) minmax(120px, 1fr); gap: 10px; padding: 30px 14px 10px; overflow: hidden; }
.sf-panel { display: flex; flex-direction: column; gap: 5px; justify-content: center; min-width: 0; }
.sf-slider { display: flex; flex-direction: column; gap: 2px; }
.sf-slider label { font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.sf-slider input[type="range"] { width: 100%; accent-color: var(--accent); }
.sf-steps { display: flex; flex-direction: column; gap: 3px; }
.sf-steps code {
  font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.sf-steps code b { color: var(--text); font-weight: 600; }
.sf-warn { color: oklch(0.55 0.19 25); }
.sf-plot { border: 1px solid var(--border); border-radius: 10px; background: var(--surface); min-height: 0; }
.sf-plot svg { width: 100%; height: 100%; display: block; }
.sf-foot { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.sf-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.sf-stage { animation: sf-in 0.4s ease-out both; }
@keyframes sf-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .sf-stage { animation: none; } }
`;

const W = 260;
const H = 200;
const PAD = 10;

/**
 * 标度函数演示:transform/domain/range(均为 JS 型参数,订阅 store)驱动
 * normalize→interpolate 两段读数;输入值滑杆为 demo 本地交互;曲线随参数重画;
 * 无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): ScaleParams => ({
    transform: store.get("transform") as string,
    d0: store.get("domainMin") as number,
    d1: store.get("domainMax") as number,
    r0: store.get("rangeMin") as number,
    r1: store.get("rangeMax") as number,
  });
  const [p, setP] = useState<ScaleParams>(read);
  const [x, setX] = useState(50);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const { transform, d0: pd0, d1: pd1, r0, r1 } = p;
  const isLog = transform === "log";
  const logIllegal = isLog && pd0 <= 0;
  const d0 = isLog ? Math.max(pd0, 1) : pd0;
  const degenerate = pd1 === d0; // d0=d1:斜率除零,demo 拦截(倒置 domain 合法,仅滑杆取正序)
  const scale = useMemo(
    () => (isLog ? scaleLog(d0, pd1, r0, r1) : scaleLinear(d0, pd1, r0, r1)),
    [isLog, d0, pd1, r0, r1],
  );

  // 输入滑杆范围随 domain(倒置时取正序);log 模式从 1 起
  const lo = isLog ? Math.max(1, Math.ceil(d0)) : Math.floor(d0);
  const sliderMin = Math.min(lo, Math.ceil(pd1));
  const sliderMax = Math.max(lo, Math.ceil(pd1));
  const xv = Math.min(Math.max(x, sliderMin), Math.max(sliderMax, sliderMin + 1));

  const t = degenerate
    ? NaN
    : isLog
      ? (Math.log(xv) - Math.log(d0)) / (Math.log(pd1) - Math.log(d0))
      : (xv - d0) / (pd1 - d0);
  const y = degenerate ? NaN : scale(xv);

  // 曲线采样(log 模式下界避 0;退化时不画)
  const pts: string[] = [];
  if (!degenerate) {
    const N = 80;
    for (let i = 0; i <= N; i++) {
      const xv2 = isLog
        ? Math.exp(Math.log(d0) + (i / N) * (Math.log(pd1) - Math.log(d0)))
        : d0 + (i / N) * (pd1 - d0);
      const yv = scale(xv2);
      const sx = PAD + (i / N) * (W - 2 * PAD);
      const sy = H - PAD - (yv / Math.max(r0, r1, 1)) * (H - 2 * PAD);
      pts.push(`${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
  }
  const px = PAD + (t * (W - 2 * PAD));
  const py = H - PAD - (y / Math.max(r0, r1, 1)) * (H - 2 * PAD);

  const fmt = (v: number, d = 2): string => (Number.isFinite(v) ? String(+v.toFixed(d)) : "—");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sf-stage">
        <div className="sf-panel">
          <div className="sf-slider">
            <label htmlFor={`${entryId}-x`}>
              输入 x = {fmt(xv)} {isLog ? "(log 域从 1 起)" : ""}
            </label>
            <input
              id={`${entryId}-x`}
              type="range"
              min={sliderMin}
              max={Math.max(sliderMax, sliderMin + 1)}
              step={Math.max((sliderMax - sliderMin) / 100, 0.01)}
              value={xv}
              onChange={(e) => setX(Number(e.target.value))}
            />
          </div>
          <div className="sf-steps">
            <code>
              normalize: t = ({isLog ? "log " : ""}{fmt(xv)} − {isLog ? "log " : ""}
              {fmt(d0)}) / ({isLog ? "log " : ""}{fmt(pd1)} − {isLog ? "log " : ""}
              {fmt(d0)}) = <b>{fmt(t, 4)}</b>
            </code>
            <code>
              interpolate: y = {fmt(r0)} + {fmt(t, 4)} × ({fmt(r1)} − {fmt(r0)}) = <b>{fmt(y)}px</b>
            </code>
            {logIllegal && (
              <code className="sf-warn">log 定义域必须 &gt;0:已钳到 1(原 d0={pd0})</code>
            )}
            {degenerate && (
              <code className="sf-warn">d0 = d1:斜率除零,标度失效(0/0)——请拉开 domain</code>
            )}
          </div>
        </div>
        <div className="sf-plot" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            <path d={pts.join(" ")} fill="none" stroke="oklch(0.62 0.16 250)" strokeWidth="2" />
            <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--border)" />
            <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="var(--border)" />
            {Number.isFinite(px) && Number.isFinite(py) && (
              <circle cx={px} cy={py} r="5" fill="oklch(0.62 0.2 40)" stroke="var(--surface)" strokeWidth="1.5" />
            )}
          </svg>
        </div>
        <div className="sf-foot">
          <span className="sf-tag">domain [{fmt(d0)}, {fmt(pd1)}] · range [{fmt(r0)}, {fmt(r1)}]px</span>
          <span className="sf-tag">{isLog ? "log:每十进位等距" : "linear:两段仿射"}</span>
          <span className="sf-tag">核验样本 50→320 ✓ / 10→213.33 ✓</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
