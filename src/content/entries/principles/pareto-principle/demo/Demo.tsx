import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 10 项通用功能(演示样本,按收益排序;排序本身即分析结论的输入) */
const FEATURES: [string, string][] = [
  ["搜索", "Search"],
  ["浏览", "Browse"],
  ["收藏", "Save"],
  ["分享", "Share"],
  ["导出", "Export"],
  ["通知", "Notify"],
  ["主题", "Themes"],
  ["多语言", "Locale"],
  ["离线", "Offline"],
  ["协作", "Collab"],
];

const W = 380;
const H = 210;
const X0 = 34;
const SLOT = 31;
const BAR_W = 22;
const BASE_Y = 170;
const BAR_SPAN = 118;
const CUM_SPAN = 140;

const css = `
.pp-field { position: absolute; inset: 0; }
.pp-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 24%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
.pp-chart {
  position: absolute;
  left: 44%;
  top: 47%;
  translate: -50% -50%;
  width: min(380px, calc(100% - 210px));
}
.pp-chart svg { width: 100%; height: auto; display: block; }
.pp-bar { fill: oklch(0.6 0.04 250 / 0.55); transition: y 0.3s ease, height 0.3s ease; }
.pp-bar-hi { fill: oklch(0.55 0.13 250); }
.pp-cum {
  fill: none;
  stroke: oklch(0.62 0.15 145);
  stroke-width: 2;
  transition: d 0.3s ease;
}
.pp-ref { stroke: oklch(0.5 0 0 / 0.45); stroke-dasharray: 4 4; }
.pp-base { stroke: oklch(0.5 0 0 / 0.3); }
.pp-label { font-size: 9px; fill: oklch(0.35 0.02 250); }
.pp-axis { font-size: 9px; fill: oklch(0.45 0.05 145); }
.pp-inline {
  margin: 4px 0 0;
  font-size: 11px;
  line-height: 1.6;
  opacity: 0.8;
  font-variant-numeric: tabular-nums;
}
.pp-panel {
  position: absolute;
  right: 12px;
  top: 36px;
  width: 176px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.pp-panel h4 { margin: 0 0 6px; font-size: 12px; }
.pp-panel .pp-big { font-size: 15px; font-weight: 700; }
.pp-panel ol { margin: 6px 0 0; padding: 0; list-style: none; }
.pp-panel li {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  font-size: 11px;
  line-height: 1.7;
}
.pp-tag {
  font-size: 9px;
  padding: 0 4px;
  border-radius: 4px;
  border: 1px solid oklch(0.55 0.13 250);
  color: oklch(0.45 0.12 250);
}
.pp-cap { margin: 8px 0 0; font-size: 10px; line-height: 1.5; opacity: 0.6; }
@media (max-width: 720px) {
  .pp-note { display: none; }
  .pp-panel { display: none; }
  .pp-chart { left: 50%; width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .pp-bar, .pp-cum { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [skew, setSkew] = useState(() => store.get("skew") as number);
  const [budget, setBudget] = useState(() => store.get("budget") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setSkew(store.get("skew") as number);
        setBudget(store.get("budget") as number);
      }),
    [store],
  );

  /** share ∝ 1/rank^skew,归一化为百分比(实时实算,不写死 80) */
  const raw = FEATURES.map((_, i) => Math.pow(i + 1, -skew));
  const total = raw.reduce((a, b) => a + b, 0);
  const shares = raw.map((r) => (r / total) * 100);
  const cum: number[] = [];
  let acc = 0;
  for (const s of shares) {
    acc += s;
    cum.push(acc);
  }
  const cum2 = cum[1];
  const k80 = cum.findIndex((c) => c >= 80) + 1;
  const cumBudget = cum[budget - 1];
  const remainder = 100 - cumBudget;
  const maxShare = shares[0];

  const path = cum
    .map((c, i) => `${i === 0 ? "M" : "L"}${(X0 + i * SLOT + SLOT / 2).toFixed(1)},${(BASE_Y - (c / 100) * CUM_SPAN).toFixed(1)}`)
    .join(" ");

  const y80 = BASE_Y - 0.8 * CUM_SPAN;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="pp-field">
        <p className="pp-note">
          「约 80% 的效果来自约 20% 的原因」——roughly 是法则原文的一部分。share ∝ 1/rank^skew 为 demo 教学模型。
          'Roughly 80% of effects come from 20% of causes' — roughly included. share ∝ 1/rank^skew is a teaching model.
        </p>

        <div className="pp-chart">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`10 项功能使用占比:前 2 项承载 ${cum2.toFixed(1)}%,预算 ${budget} 项覆盖 ${cumBudget.toFixed(1)}%,达到 80% 需前 ${k80} 项`}
          >
            <line className="pp-base" x1={X0} y1={BASE_Y} x2={350} y2={BASE_Y} />
            <line className="pp-ref" x1={X0} y1={y80} x2={350} y2={y80} />
            <text className="pp-axis" x={354} y={y80 + 3}>80%</text>
            <text className="pp-axis" x={354} y={33}>100%</text>
            {shares.map((s, i) => {
              const h = (s / maxShare) * BAR_SPAN;
              const x = X0 + i * SLOT + (SLOT - BAR_W) / 2;
              return (
                <rect
                  key={i}
                  className={`pp-bar${i < budget ? " pp-bar-hi" : ""}`}
                  x={x}
                  y={BASE_Y - h}
                  width={BAR_W}
                  height={h}
                  rx={3}
                />
              );
            })}
            <path className="pp-cum" d={path} />
            {FEATURES.map(([zh], i) => (
              <text key={zh} className="pp-label" x={X0 + i * SLOT + SLOT / 2} y={BASE_Y + 12} textAnchor="middle">
                {i + 1}
              </text>
            ))}
            <text className="pp-label" x={X0 - 4} y={BASE_Y + 24} textAnchor="start">
              排名(按收益)rank by payoff
            </text>
          </svg>
          <p className="pp-inline" aria-live="polite">
            前 2 项承载 <b>{cum2.toFixed(1)}%</b> · 80% 线:前 <b>{k80}</b> 项达到 · 预算 {budget} 项覆盖{" "}
            <b>{cumBudget.toFixed(1)}%</b>(剩余 {10 - budget} 项合计 {remainder.toFixed(1)}%)
          </p>
        </div>

        <div className="pp-panel">
          <h4>前 20% = 2 项承载</h4>
          <p className="pp-big">{cum2.toFixed(1)}%</p>
          <ol>
            {FEATURES.slice(0, 5).map(([zh, en], i) => (
              <li key={zh}>
                <span>
                  {i + 1}. {zh} {en}
                  {i < budget ? <span className="pp-tag"> 预算内</span> : null}
                </span>
                <b>{shares[i].toFixed(1)}%</b>
              </li>
            ))}
          </ol>
          <p className="pp-cap">
            预算 2→4 项:覆盖 {cum[1].toFixed(1)}%→{cum[3].toFixed(1)}%,增益骤减——收益递减即「集中投资少数」的量化理由。
            Budget 2→4: {cum[1].toFixed(1)}%→{cum[3].toFixed(1)}% — the flattening gain argues for concentration.
          </p>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
