import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖公式实现(调研 14§1.2/§1.4,Node v22 实跑核验) —— */

/** 几何级数:size(n) = base × ratioⁿ(n 可为负) */
const typeScale = (base: number, ratio: number, n: number): number => base * Math.pow(ratio, n);

/** Utopia 流体 clamp(生产实现形态):min/max 折 rem、斜率折 vw,两端钳制 */
function fluidClamp(
  minPx: number,
  maxPx: number,
  minVw: number,
  maxVw: number,
  remBase = 16,
  digits = 4,
): string {
  if (maxVw <= minVw) return "minVw 必须小于 maxVw / minVw must be below maxVw";
  const minRem = minPx / remBase;
  const maxRem = maxPx / remBase;
  const slope = (maxRem - minRem) / ((maxVw - minVw) / remBase); // rem per vw
  const intercept = minRem - (minVw / remBase) * slope; // rem
  const f = (x: number): string => String(+x.toFixed(digits));
  return `clamp(${f(minRem)}rem, ${f(intercept)}rem + ${f(100 * slope)}vw, ${f(maxRem)}rem)`;
}

interface ScaleParams {
  base: number;
  ratio: number;
  steps: number;
  minVw: number;
  maxVw: number;
}

const css = `
.ms-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 2px; padding: 30px 14px 10px; overflow: hidden; }
.ms-row {
  display: grid; grid-template-columns: 62px minmax(52px, auto) 1fr; align-items: baseline;
  gap: 10px; padding: 3px 6px; border-radius: 8px;
}
.ms-row:nth-child(odd) { background: color-mix(in srgb, var(--border) 16%, transparent); }
.ms-label { font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; white-space: nowrap; }
.ms-sample { font-weight: 650; line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 34%; color: var(--text); }
.ms-math { font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; min-width: 0; }
.ms-math code {
  display: block; font-size: 11px; color: var(--text-dim);
  font-variant-numeric: tabular-nums; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ms-foot {
  margin-top: auto; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
  font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums;
}
.ms-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.ms-stage { animation: ms-in 0.4s ease-out both; }
@keyframes ms-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .ms-stage { animation: none; } }
`;

/**
 * 模数倍率公式演示:实时生成字阶梯(step−1..step+steps)。
 * base / ratio / steps / minViewport / maxViewport 均为 JS 型参数(订阅 store),
 * 页面内零依赖实跑 size(n)=base×ratioⁿ 与 Utopia fluidClamp;无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): ScaleParams => ({
    base: store.get("base") as number,
    ratio: Number(store.get("ratio") as string),
    steps: store.get("steps") as number,
    minVw: store.get("minViewport") as number,
    maxVw: store.get("maxViewport") as number,
  });
  const [p, setP] = useState<ScaleParams>(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  // 阶梯:n = −1 … steps;每级 max 取上一级(min × ratio),与 Utopia「base 18→20」同构
  const rungs: { n: number; size: number }[] = [];
  for (let n = -1; n <= p.steps; n++) {
    rungs.push({ n, size: typeScale(p.base, p.ratio, n) });
  }

  const goldenNote =
    Math.round(p.base) === 18 && Math.abs(p.ratio - 1.25) < 1e-9
      ? "Utopia 黄金样本用独立函数 fluidClamp(18, 20, 360, 1240) 复现(18→20 是 base 增长对)"
      : undefined;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ms-stage">
        {rungs.map(({ n, size }) => {
          const px = Math.round(size * 100) / 100;
          const clampStr = fluidClamp(px, px * p.ratio, p.minVw, p.maxVw);
          return (
            <div className="ms-row" key={n}>
              <span className="ms-label">step {n >= 0 ? `+${n}` : n}</span>
              <span className="ms-sample" style={{ fontSize: `${Math.min(px, 64)}px` }}>
                Aa 字
              </span>
              <span className="ms-math">
                <code>
                  {px}px = {p.base} × {p.ratio}
                  <sup>{n}</sup>
                </code>
                <code>{clampStr}</code>
              </span>
            </div>
          );
        })}
        <div className="ms-foot">
          <span className="ms-tag">size(n) = base × ratioⁿ</span>
          <span className="ms-tag">slope = (max−min)/(maxVw−minVw)</span>
          <span className="ms-tag">
            {p.minVw}–{p.maxVw}px 视口
          </span>
          {goldenNote && <span className="ms-tag">{goldenNote}</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
