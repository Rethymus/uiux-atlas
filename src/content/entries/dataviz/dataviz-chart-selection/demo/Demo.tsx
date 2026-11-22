import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Relation = "compare" | "trend" | "distribution" | "composition";

// Okabe-Ito 前 4 色(R grDevices 固化值,调研 08§1.1;排序循 CUD 建议,亮色在前)
const SEG_COLORS = ["#E69F00", "#56B4E9", "#009E73", "#F0E442"];
const SEG_NAMES = [
  { zh: "直营", en: "Direct" },
  { zh: "渠道", en: "Channel" },
  { zh: "线上", en: "Online" },
  { zh: "其他", en: "Other" },
];

// 四档关系的确定性演示数据
const COMPARE = [64, 49, 78, 57];
const COMPARE_LABELS = ["甲 A", "乙 B", "丙 C", "丁 D"];
const TREND = [38, 42, 40, 47, 52, 49, 58, 63, 60, 68, 72, 70];
const DIST = [2, 4, 6, 9, 7, 5, 4, 3]; // 8 箱直方,合计 40 样本
const COMP = [
  [38, 26, 21, 15],
  [35, 28, 22, 15],
  [33, 27, 24, 16],
  [30, 29, 25, 16],
]; // 4 季度 × 4 段,每季合计 100

// y 轴域:zero=0 起;truncated=抬到数据附近(柱系将触发 FT 红线徽标)
const DOMAIN: Record<Relation, { zero: [number, number]; trunc: [number, number] }> = {
  compare: { zero: [0, 90], trunc: [40, 85] },
  trend: { zero: [0, 80], trunc: [30, 80] },
  distribution: { zero: [0, 10], trunc: [2, 10] },
  composition: { zero: [0, 100], trunc: [80, 105] },
};

const RELATIONS: { id: Relation; zh: string; en: string; chart: string; chartEn: string }[] = [
  { id: "compare", zh: "比较", en: "Compare", chart: "柱状图", chartEn: "bar" },
  { id: "trend", zh: "趋势", en: "Trend", chart: "折线图", chartEn: "line" },
  { id: "distribution", zh: "分布", en: "Dist.", chart: "直方图", chartEn: "histogram" },
  { id: "composition", zh: "构成", en: "Comp.", chart: "堆叠柱", chartEn: "stacked" },
];

// 柱系(柱状/直方/堆叠)零基线是 FT 红线;折线可例外(引 ONS)
const BAR_FAMILY: Relation[] = ["compare", "distribution", "composition"];

const W = 640;
const H = 340;
const M = { top: 24, right: 12, bottom: 34, left: 40 };

/** 按 sRGB 亮度近似挑段内文字色:#009E73 上用白字,其余 Okabe-Ito 色用深字 */
function ink(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150 ? "#1b2437" : "#ffffff";
}

const css = `
.cs-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 14px 18px 10px; }
.cs-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.cs-chart svg { max-width: 100%; max-height: 100%; }
.cs-bar { stroke: var(--border-strong); stroke-width: 1; }
.cs-map { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; }
.cs-map span {
  padding: 2px 9px; border: 1px solid var(--border); border-radius: 999px;
  font-size: 11px; color: var(--text-dim); background: var(--surface);
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.cs-map span[data-active="true"] { color: var(--text); font-weight: 600; border-color: var(--border-strong); }
.cs-readout { display: flex; flex-wrap: wrap; gap: 4px 6px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.cs-chip {
  padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px;
  background: var(--surface); font-variant-numeric: tabular-nums;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.cs-chip b { color: var(--text); font-weight: 600; }
.cs-chip[data-warn="true"] { color: #da1e28; border-color: #da1e28; }
.cs-chip[data-warn="true"] b { color: #da1e28; }
@media (prefers-reduced-motion: reduce) {
  .cs-map span, .cs-chip { transition: none; }
}
`;

/**
 * 图表选型演示:一个 SVG 承载四种数据关系的基线图表。
 * relation / baseline / labels 均为 JS 型参数——订阅 store 后重绘;
 * baseline=truncated 时柱系按 FT 红线给出 Carbon danger 警示徽标。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    relation: store.get("relation") as Relation,
    baseline: store.get("baseline") as string,
    labels: store.get("labels") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const { relation, baseline, labels } = params;
  const truncated = baseline === "truncated";
  const [yMin, yMax] = truncated ? DOMAIN[relation].trunc : DOMAIN[relation].zero;
  const legend = labels === "legend";
  const PLOT_W = W - M.left - M.right - (legend ? 118 : 0);
  const PLOT_H = H - M.top - M.bottom;
  const y = (v: number) => M.top + PLOT_H * (1 - (v - yMin) / (yMax - yMin));
  const ticks = [0, 1, 2, 3, 4].map((i) => Math.round(yMin + ((yMax - yMin) * i) / 4));

  const warnBar = BAR_FAMILY.includes(relation) && truncated;
  const trendNote = relation === "trend" && truncated;

  // 各关系的主色(全部取自 Okabe-Ito 官方色)
  const soloColor = relation === "trend" ? SEG_COLORS[0] : SEG_COLORS[1];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cs-stage">
        <div className="cs-chart">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="图表选型演示:按数据关系切换比较/趋势/分布/构成四种基线图表 Chart selection demo: four baseline charts switched by data relationship"
          >
            {/* y 轴网格与刻度 */}
            {ticks.map((v) => (
              <g key={v}>
                <line x1={M.left} x2={M.left + PLOT_W} y1={y(v)} y2={y(v)} stroke="currentColor" opacity="0.14" />
                <text x={M.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--text-dim)">
                  {v}
                </text>
              </g>
            ))}
            {/* x 轴基线 */}
            <line x1={M.left} x2={M.left + PLOT_W} y1={y(yMin)} y2={y(yMin)} stroke="var(--text-dim)" strokeWidth="1" />

            {relation === "compare" &&
              COMPARE.map((v, i) => {
                const slot = PLOT_W / COMPARE.length;
                const barW = Math.min(56, slot * 0.6);
                const x = M.left + slot * i + (slot - barW) / 2;
                return (
                  <g key={i}>
                    <rect className="cs-bar" x={x} y={y(v)} width={barW} height={Math.max(0, y(yMin) - y(v))} fill={soloColor}>
                      <title>{`${COMPARE_LABELS[i]} · ${v}`}</title>
                    </rect>
                    <text x={M.left + slot * i + slot / 2} y={y(yMin) + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">
                      {COMPARE_LABELS[i]}
                    </text>
                    {labels === "direct" && (
                      <text x={M.left + slot * i + slot / 2} y={y(v) - 6} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text)">
                        {v}
                      </text>
                    )}
                  </g>
                );
              })}

            {relation === "trend" &&
              (() => {
                const pts = TREND.map((v, i) => [M.left + (PLOT_W * i) / (TREND.length - 1), y(v)] as const);
                const path = pts.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
                const last = pts[pts.length - 1];
                return (
                  <g>
                    <path d={path} fill="none" stroke={soloColor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                    {pts.map(([px, py], i) => (
                      <circle key={i} cx={px} cy={py} r="2.5" fill={soloColor}>
                        <title>{`第 ${i + 1} 月 · ${TREND[i]}`}</title>
                      </circle>
                    ))}
                    {[1, 4, 7, 12].map((m) => (
                      <text key={m} x={pts[m - 1][0]} y={y(yMin) + 18} textAnchor="middle" fontSize="11" fill="var(--text-dim)">
                        {m}
                      </text>
                    ))}
                    {labels === "direct" ? (
                      <text x={last[0] - 6} y={last[1] - 9} textAnchor="end" fontSize="12" fontWeight="600" fill="var(--text)">
                        {TREND[TREND.length - 1]}
                      </text>
                    ) : (
                      <g transform={`translate(${W - 112}, ${M.top + 6})`}>
                        <line x1="0" x2="16" y1="7" y2="7" stroke={soloColor} strokeWidth="3" />
                        <text x="22" y="11" fontSize="11.5" fill="var(--text)">
                          月度营收 Revenue
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

            {relation === "distribution" &&
              DIST.map((v, i) => {
                const slot = PLOT_W / DIST.length;
                const barW = slot * 0.72;
                const x = M.left + slot * i + (slot - barW) / 2;
                return (
                  <g key={i}>
                    <rect className="cs-bar" x={x} y={y(v)} width={barW} height={Math.max(0, y(yMin) - y(v))} fill={SEG_COLORS[2]}>
                      <title>{`第 ${i + 1} 箱 · ${v} 个样本`}</title>
                    </rect>
                    {labels === "direct" && (
                      <text x={M.left + slot * i + slot / 2} y={y(v) - 6} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text)">
                        {v}
                      </text>
                    )}
                  </g>
                );
              })}

            {relation === "composition" &&
              COMP.map((segs, qi) => {
                const slot = PLOT_W / COMP.length;
                const barW = Math.min(64, slot * 0.6);
                const x = M.left + slot * qi + (slot - barW) / 2;
                let below = 0;
                return (
                  <g key={qi}>
                    {segs.map((sv, si) => {
                      const bottom = yMin + below;
                      const top = bottom + sv;
                      below += sv;
                      const px = y(top);
                      const pxH = Math.max(0, y(bottom) - y(top));
                      return (
                        <g key={si}>
                          <rect className="cs-bar" x={x} y={px} width={barW} height={pxH} fill={SEG_COLORS[si]}>
                            <title>{`${SEG_NAMES[si].en} · Q${qi + 1} · ${sv}`}</title>
                          </rect>
                          {labels === "direct" && pxH >= 14 && (
                            <text x={x + barW / 2} y={px + pxH / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={ink(SEG_COLORS[si])}>
                              {sv}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    <text x={M.left + slot * qi + slot / 2} y={y(yMin) + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">
                      {`Q${qi + 1}`}
                    </text>
                  </g>
                );
              })}

            {/* 外置图例(构成档为四系列对色;其余档单系列) */}
            {legend && relation === "composition" && (
              <g>
                {SEG_NAMES.map((n, si) => (
                  <g key={n.en} transform={`translate(${W - 112}, ${M.top + 6 + si * 26})`}>
                    <rect width="14" height="10" rx="2" y="2" fill={SEG_COLORS[si]} stroke="var(--border-strong)" />
                    <text x="22" y="11" fontSize="11.5" fill="var(--text)">
                      {n.zh} {n.en}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>

        <div className="cs-map" aria-hidden="true">
          {RELATIONS.map((r) => (
            <span key={r.id} data-active={r.id === relation}>
              {r.zh} {r.en} → {r.chart} {r.chartEn}
            </span>
          ))}
        </div>
        <div className="cs-readout" role="status">
          <span className="cs-chip">
            {RELATIONS.find((r) => r.id === relation)?.chart} · {labels === "direct" ? "直标优先 Direct" : "外置图例 Legend"}
          </span>
          {warnBar ? (
            <span className="cs-chip" data-warn="true">
              <b>FT 红线</b> 柱系必须零基线 / columns must start at 0
            </span>
          ) : trendNote ? (
            <span className="cs-chip">
              折线可不从零 <b>(FT 引 ONS)</b>
            </span>
          ) : (
            <span className="cs-chip">
              零基线 <b>Zero baseline</b>
            </span>
          )}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
