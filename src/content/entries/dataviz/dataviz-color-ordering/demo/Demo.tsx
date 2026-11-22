import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Order = "official" | "shuffled";
type Emphasis = "full-color" | "gray-context";

// Okabe-Ito 前 5 色(R grDevices 固化值,调研 08§1.1;排序循 CUD 建议,亮色排前三)
const PALETTE = [
  { hex: "#E69F00", zh: "橙", en: "orange" },
  { hex: "#56B4E9", zh: "天蓝", en: "sky blue" },
  { hex: "#009E73", zh: "蓝绿", en: "bluish green" },
  { hex: "#F0E442", zh: "黄", en: "yellow" },
  { hex: "#0072B2", zh: "蓝", en: "blue" },
];
const SHUFFLED = [4, 2, 0, 3, 1]; // 固定乱序映射(演示用,把弱区分对推到前两位)

// 5 系列 × 12 月的确定性演示数据
const SERIES_DATA = [
  [38, 42, 40, 47, 52, 49, 58, 63, 60, 68, 72, 70],
  [55, 51, 58, 54, 61, 65, 59, 66, 70, 64, 69, 73],
  [30, 34, 37, 33, 39, 42, 45, 41, 47, 50, 46, 52],
  [62, 60, 66, 70, 67, 72, 69, 74, 78, 75, 80, 84],
  [25, 28, 31, 29, 33, 30, 36, 40, 38, 44, 47, 45],
];
const Y_MIN = 20; // 折线图可不从零(FT 引 ONS,调研 08§5.4)
const Y_MAX = 90;

const W = 640;
const H = 340;
const M = { top: 24, right: 12, bottom: 34, left: 40 };
const LEGEND_W = 118;
const PLOT_W = W - M.left - M.right - LEGEND_W;
const PLOT_H = H - M.top - M.bottom;
const TICKS = [20, 35, 50, 65, 80];

const css = `
.co-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 14px 18px 10px; }
.co-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.co-chart svg { max-width: 100%; max-height: 100%; }
.co-readout { display: flex; flex-wrap: wrap; gap: 4px 6px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.co-chip {
  padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px;
  background: var(--surface); font-variant-numeric: tabular-nums;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.co-chip b { color: var(--text); font-weight: 600; }
.co-chip[data-warn="true"] { color: #da1e28; border-color: #da1e28; }
.co-chip[data-warn="true"] b { color: #da1e28; }
@media (prefers-reduced-motion: reduce) {
  .co-chip { transition: none; }
}
`;

/**
 * 数据色序与强调演示:5 系列折线图。
 * order / accentSeries / emphasis 为 JS 型参数(订阅 store 重绘);
 * contextGray 为 CSS 变量型参数(--co-gray),语境系列 stroke 经 var() 消费。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    order: store.get("order") as Order,
    accentSeries: store.get("accentSeries") as number,
    emphasis: store.get("emphasis") as Emphasis,
    contextGray: store.get("contextGray") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const { order, accentSeries, emphasis, contextGray } = params;
  const accent = Math.max(1, Math.min(5, Math.round(accentSeries))) - 1;
  const grayMode = emphasis === "gray-context";

  const colorOf = (i: number) => PALETTE[order === "official" ? i : SHUFFLED[i]];
  const strokeOf = (i: number) => (grayMode && i !== accent ? "var(--co-gray, #B0B0B0)" : colorOf(i).hex);
  const widthOf = (i: number) => (grayMode ? (i === accent ? 3 : 1.5) : 2);

  const y = (v: number) => M.top + PLOT_H * (1 - (v - Y_MIN) / (Y_MAX - Y_MIN));
  const xOf = (i: number) => M.left + (PLOT_W * i) / 11;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="co-stage">
        <div className="co-chart">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="数据色序与强调演示:5 系列折线图,官方色序取色,焦点系列灰底彩突出 Data color ordering demo: 5-series line chart in official palette order with gray-context emphasis"
          >
            {/* y 轴网格与刻度 */}
            {TICKS.map((v) => (
              <g key={v}>
                <line x1={M.left} x2={M.left + PLOT_W} y1={y(v)} y2={y(v)} stroke="currentColor" opacity="0.14" />
                <text x={M.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--text-dim)">
                  {v}
                </text>
              </g>
            ))}
            {/* x 轴基线与月份 */}
            <line x1={M.left} x2={M.left + PLOT_W} y1={y(Y_MIN)} y2={y(Y_MIN)} stroke="var(--text-dim)" strokeWidth="1" />
            {[1, 4, 7, 12].map((m) => (
              <text key={m} x={xOf(m - 1)} y={y(Y_MIN) + 18} textAnchor="middle" fontSize="11" fill="var(--text-dim)">
                {m}
              </text>
            ))}

            {/* 五条折线 */}
            {SERIES_DATA.map((data, si) => {
              const path = data
                .map((v, i) => `${i === 0 ? "M" : "L"}${xOf(i).toFixed(1)},${y(v).toFixed(1)}`)
                .join(" ");
              const isAccent = grayMode && si === accent;
              return (
                <g key={si}>
                  <path
                    d={path}
                    fill="none"
                    stroke={strokeOf(si)}
                    strokeWidth={widthOf(si)}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <circle cx={xOf(11)} cy={y(data[11])} r={isAccent ? 3.5 : 2.5} fill={strokeOf(si)}>
                    <title>{`S${si + 1} · ${colorOf(si).en} · 12 月 ${data[11]}`}</title>
                  </circle>
                </g>
              );
            })}

            {/* 灰底彩突出:焦点系列线端直标(全彩多系列直标易压线,回退图例) */}
            {grayMode &&
              (() => {
                const v = SERIES_DATA[accent][11];
                const c = colorOf(accent);
                return (
                  <text x={xOf(11) - 6} y={y(v) - 9} textAnchor="end" fontSize="12" fontWeight="600" fill={c.hex}>
                    {`S${accent + 1} · ${c.en}`}
                  </text>
                );
              })()}

            {/* 右侧图例:swatch 颜色随色序与强调策略联动 */}
            <g>
              {SERIES_DATA.map((_, si) => {
                const isAccent = grayMode && si === accent;
                return (
                  <g key={si} transform={`translate(${W - LEGEND_W + 6}, ${M.top + 6 + si * 26})`}>
                    <line x1="0" x2="16" y1="7" y2="7" stroke={strokeOf(si)} strokeWidth={isAccent ? 3.5 : 2} />
                    <text
                      x="22"
                      y="11"
                      fontSize="11"
                      fill="var(--text)"
                      fontWeight={isAccent ? 600 : 400}
                    >
                      {`S${si + 1} ${colorOf(si).en}${isAccent ? " ★" : ""}`}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="co-readout" role="status">
          <span className="co-chip">
            色序 <b>{order === "official" ? "官方顺序 Official" : "乱序 Shuffled"}</b>
          </span>
          {order === "shuffled" && (
            <span className="co-chip" data-warn="true">
              <b>Carbon</b> 按序取用以最大化相邻对比
            </span>
          )}
          <span className="co-chip">
            焦点 <b>S{accent + 1}</b>
          </span>
          <span className="co-chip">{grayMode ? "灰底彩突出 Gray context" : "全彩序列 Full color"}</span>
          {grayMode && (
            <span className="co-chip">
              语境灰 <b>{contextGray}</b>(社区常见值,未证实)
            </span>
          )}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
