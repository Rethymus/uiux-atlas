import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
// 双系列确定性数据(0-100 区间)
const SERIES = [
  { zh: "本年", en: "This year", hex: "#0072B2", values: [64, 58, 71, 66, 78, 84, 79, 86, 74, 69, 81, 90] },
  { zh: "上年", en: "Last year", hex: "#D55E00", values: [42, 47, 39, 52, 48, 56, 51, 44, 58, 62, 55, 60] },
];
const DATA_MAX = Math.max(...SERIES.flatMap((s) => s.values));

// nice-ticks:档距取整到 1/2/2.5/5×10ⁿ(与主流图表库一致,实际档数可能少 1-2 档)
function niceTicks(max: number, count: number): number[] {
  const n = Math.max(2, Math.round(count));
  const rawStep = max / (n - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / mag;
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  const step = nice * mag;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

const W = 600;
const H = 340;
const M = { top: 20, right: 20, bottom: 40, left: 46 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const TICK_LEN = 5; // ECharts axisTick.length 默认 5
const LABEL_MARGIN = 8; // ECharts axisLabel.margin 默认 8

const css = `
.ax-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.ax-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.ax-chart svg { max-width: 100%; max-height: 100%; color: var(--text); }
.ax-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.ax-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.ax-chip b { color: var(--text); font-weight: 600; }
.ax-legend { display: flex; gap: 14px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.ax-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; vertical-align: -1px; }
`;

/**
 * 坐标轴与网格演示:手绘 SVG 折线图。
 * gridOpacity 为 CSS 变量型(--dvz-grid-op 注入 .demo-stage,网格线 opacity 消费);
 * axisLine / tickCount 为 JS 型——订阅 store 后重绘。
 * 默认值:0.09(Grafana 公式)/ on(#6E7079,ECharts)/ 5(ECharts splitNumber)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    axisLine: store.get("axisLine") as string,
    tickCount: store.get("tickCount") as number,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const ticks = niceTicks(DATA_MAX, params.tickCount);
  const yMax = ticks[ticks.length - 1];
  const y = (v: number) => M.top + PLOT_H * (1 - v / yMax);
  const x = (i: number) => M.left + (PLOT_W * i) / (MONTHS.length - 1);
  const showAxis = params.axisLine === "on";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ax-stage">
        <div className="ax-legend">
          {SERIES.map((s) => (
            <span key={s.en}>
              <span className="ax-dot" style={{ background: s.hex }} aria-hidden="true" />
              {s.zh} {s.en}
            </span>
          ))}
        </div>
        <div className="ax-chart">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="折线图:网格透明度/轴线/刻度数演示 Line chart demonstrating grid opacity, axis lines and tick count">
            {/* 横向网格线(值轴 splitLine;类目轴不画网格——ECharts 强制) */}
            {ticks.map((t) => (
              <line
                key={t}
                className="ax-grid"
                x1={M.left}
                x2={M.left + PLOT_W}
                y1={y(t)}
                y2={y(t)}
                stroke="currentColor"
                style={{ opacity: "var(--dvz-grid-op, 0.09)" }}
              />
            ))}
            {/* 轴线(#6E7079 宽 1 = ECharts 默认)+ 刻度(长 5) */}
            {showAxis && (
              <g stroke="#6E7079" strokeWidth="1">
                <line x1={M.left} x2={M.left} y1={M.top} y2={M.top + PLOT_H} />
                <line x1={M.left} x2={M.left + PLOT_W} y1={y(0)} y2={y(0)} />
              </g>
            )}
            {showAxis &&
              ticks.map((t) => (
                <line key={t} x1={M.left - TICK_LEN} x2={M.left} y1={y(t)} y2={y(t)} stroke="#6E7079" strokeWidth="1" />
              ))}
            {/* 值轴标签:fontSize 12 / margin 8(ECharts 默认) */}
            {ticks.map((t) => (
              <text key={t} x={M.left - LABEL_MARGIN} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--text-dim)">
                {t}
              </text>
            ))}
            {/* 类目轴标签 */}
            {MONTHS.map((mo, i) => (
              <text key={mo} x={x(i)} y={y(0) + 18} textAnchor="middle" fontSize="12" fill="var(--text-dim)">
                {mo}
              </text>
            ))}
            {/* 数据线 */}
            {SERIES.map((s) => (
              <g key={s.en}>
                <polyline
                  points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
                  fill="none"
                  stroke={s.hex}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {s.values.map((v, i) => (
                  <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={s.hex}>
                    <title>{`${s.zh} · ${MONTHS[i]} · ${v}`}</title>
                  </circle>
                ))}
              </g>
            ))}
          </svg>
        </div>
        <div className="ax-readout">
          <span className="ax-chip">
            gridOpacity <b>var(--dvz-grid-op)</b>(默认 0.09 = Grafana 9%)
          </span>
          <span className="ax-chip">
            轴线 <b>{showAxis ? "#6E7079 on" : "off(ggplot2 路线)"}</b>
          </span>
          <span className="ax-chip">
            刻度 <b>{ticks.length}</b> 档: {ticks.join(" / ")}
          </span>
          <span className="ax-chip">网格随主题翻转(currentColor = 文字色)</span>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
