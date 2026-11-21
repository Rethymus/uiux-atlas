import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

// 确定性迷你数据
const SPARK = [22, 30, 26, 38, 34, 46, 42, 55];
const MINI_BARS = [58, 74, 49, 66];

const css = `
.dd-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 14px 16px 8px; }
.dd-toolbar { display: flex; gap: 6px; justify-content: center; }
.dd-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: var(--surface);
}
.dd-toolbar button[aria-pressed="true"] { background: var(--accent-dim); border-color: var(--accent); color: var(--text); }
.dd-dash {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(24, minmax(0, 1fr));
  grid-auto-rows: var(--dvz-row, 30px);
  gap: var(--dvz-gap, 8px);
  align-content: start;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
  padding: calc(var(--dvz-gap, 8px) + 2px);
}
.dd-stage[data-density="compact"] .dd-dash {
  grid-auto-rows: calc(var(--dvz-row, 30px) * 0.8);
  gap: calc(var(--dvz-gap, 8px) / 2);
}
.dd-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dd-stage[data-density="compact"] .dd-panel { padding: 5px 8px; }
.dd-title { font-size: 12px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dd-stage[data-density="compact"] .dd-title { font-size: 11px; }
.dd-callout {
  font-size: 45px;
  line-height: 1.05;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  letter-spacing: -0.01em;
}
.dd-stage[data-density="compact"] .dd-callout { font-size: 32px; }
.dd-delta { font-size: 10px; font-weight: 600; }
.dd-delta.up { color: #7bb662; }
.dd-delta.down { color: #e06c5b; }
.dd-stage[data-density="compact"] .dd-delta { font-size: 9px; }
.dd-label { font-size: 10px; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dd-stage[data-density="compact"] .dd-label { font-size: 9px; }
.dd-body { flex: 1; min-height: 0; display: flex; }
.dd-body svg { width: 100%; height: 100%; }
.dd-table { width: 100%; border-collapse: collapse; font-size: 10px; }
.dd-stage[data-density="compact"] .dd-table { font-size: 9px; }
.dd-table th { font-size: 12px; font-weight: 600; color: var(--text); text-align: left; padding: 3px 6px; background: var(--surface-2); }
.dd-stage[data-density="compact"] .dd-table th { font-size: 11px; padding: 2px 5px; }
.dd-table td { color: var(--text-dim); padding: 3px 6px; border-top: 1px solid var(--border); font-variant-numeric: tabular-nums; }
.dd-stage[data-density="compact"] .dd-table td { padding: 2px 5px; }
.dd-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.dd-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.dd-chip b { color: var(--text); font-weight: 600; }
`;

/**
 * 仪表盘密度演示:24 列 CSS Grid(Grafana 常量)× density 档位联动间距/字号。
 * density 为 JS 型参数(data-density);gap/rowHeight 为 CSS 变量型(--dvz-gap/--dvz-row)。
 * comfortable=调研值(8px/30px/45-12-12-10);compact=demo 演示档(已标注未证实)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    density: store.get("density") as string,
    gap: store.get("gap") as number,
    row: store.get("rowHeight") as number,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const compact = params.density === "compact";
  const effGap = compact ? params.gap / 2 : params.gap;
  const effRow = compact ? params.row * 0.8 : params.row;

  // 迷你折线
  const sx = (i: number) => 4 + (92 * i) / (SPARK.length - 1);
  const sy = (v: number) => 40 - (v / 60) * 32;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dd-stage" data-density={params.density}>
        <div className="dd-toolbar" role="group" aria-label="密度档位 Density preset">
          <button
            type="button"
            aria-pressed={!compact}
            onClick={() => store.set("density", "comfortable")}
          >
            舒适 Comfortable
          </button>
          <button
            type="button"
            aria-pressed={compact}
            onClick={() => store.set("density", "compact")}
          >
            紧凑 Compact
          </button>
        </div>

        <div className="dd-dash">
          {/* KPI:3 行(Grafana MIN_PANEL_HEIGHT=90px)= 6 列 */}
          <div className="dd-panel" style={{ gridColumn: "span 6", gridRow: "span 3" }}>
            <span className="dd-label">营收 Revenue</span>
            <span className="dd-callout">¥1.28M</span>
            <span className="dd-delta up">▲ 12.4% WoW</span>
          </div>

          {/* 迷你折线:12 列 × 3 行 */}
          <div className="dd-panel" style={{ gridColumn: "span 12", gridRow: "span 3" }}>
            <span className="dd-title">活跃用户 Active users</span>
            <div className="dd-body">
              <svg viewBox="0 0 100 44" preserveAspectRatio="none" role="img" aria-label="迷你折线图 Mini line chart">
                <polyline
                  points={SPARK.map((v, i) => `${sx(i)},${sy(v)}`).join(" ")}
                  fill="none"
                  stroke="#0072B2"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* KPI 2:6 列 × 3 行 */}
          <div className="dd-panel" style={{ gridColumn: "span 6", gridRow: "span 3" }}>
            <span className="dd-label">转化率 Conversion</span>
            <span className="dd-callout">3.42%</span>
            <span className="dd-delta down">▼ 0.8pt WoW</span>
          </div>

          {/* 迷你柱图:12 列 × 3 行 */}
          <div className="dd-panel" style={{ gridColumn: "span 12", gridRow: "span 3" }}>
            <span className="dd-title">渠道转化 Channel conversion</span>
            <div className="dd-body">
              <svg viewBox="0 0 100 44" preserveAspectRatio="none" role="img" aria-label="迷你柱状图 Mini bar chart">
                {MINI_BARS.map((v, i) => (
                  <rect
                    key={i}
                    x={8 + i * 24}
                    y={44 - (v / 100) * 40}
                    width="14"
                    height={(v / 100) * 40}
                    rx="1.5"
                    fill="#E69F00"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* 表格:24 列 × 3 行 */}
          <div className="dd-panel" style={{ gridColumn: "span 24", gridRow: "span 3" }}>
            <table className="dd-table">
              <thead>
                <tr>
                  <th>地区 Region</th>
                  <th>营收 Revenue</th>
                  <th>环比 MoM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>华东 East China</td>
                  <td>¥486K</td>
                  <td>+8.2%</td>
                </tr>
                <tr>
                  <td>华南 South China</td>
                  <td>¥402K</td>
                  <td>-1.6%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="dd-readout">
          <span className="dd-chip">
            档 <b>{compact ? "compact" : "comfortable"}</b>
          </span>
          <span className="dd-chip">
            间距 <b>{effGap}px</b>{compact && " (8÷2)"}
          </span>
          <span className="dd-chip">
            行高 <b>{Math.round(effRow)}px</b>{compact && " (30×0.8)"}
          </span>
          <span className="dd-chip">
            callout <b>{compact ? "32" : "45"}px</b>
          </span>
          <span className="dd-chip">24 列 × 3 行格(90px)面板</span>
          {compact && <span className="dd-chip">compact 数值为演示档,未证实</span>}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
