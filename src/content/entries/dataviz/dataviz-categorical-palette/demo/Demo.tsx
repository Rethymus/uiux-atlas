import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type PaletteId = "okabe-ito" | "carbon" | "tableau10";

interface Swatch {
  zh: string;
  en: string;
  hex: string;
}

// Okabe-Ito:R grDevices 内置固化值(源码核验);官方页只发色样图+PPT,不含文字 hex。
// demo 排序遵循 CUD 实践建议:亮色排前三(橙→天蓝→蓝绿),官方黑殿后。
// Carbon:官网数据可视化色板页已核验的官方顺序,禁止跳色。
// Tableau 10:hex 经 R grDevices 源码注释佐证;官方博客原文 403 未核实。
const PALETTES: Record<PaletteId, { label: string; colors: Swatch[] }> = {
  "okabe-ito": {
    label: "Okabe-Ito (CUD)",
    colors: [
      { zh: "橙", en: "orange", hex: "#E69F00" },
      { zh: "天蓝", en: "sky blue", hex: "#56B4E9" },
      { zh: "蓝绿", en: "bluish green", hex: "#009E73" },
      { zh: "黄", en: "yellow", hex: "#F0E442" },
      { zh: "蓝", en: "blue", hex: "#0072B2" },
      { zh: "朱红", en: "vermillion", hex: "#D55E00" },
      { zh: "紫红", en: "reddish purple", hex: "#CC79A7" },
      { zh: "黑", en: "black", hex: "#000000" },
    ],
  },
  carbon: {
    label: "Carbon categorical",
    colors: [
      { zh: "紫 70", en: "Purple 70", hex: "#6929c4" },
      { zh: "青 50", en: "Cyan 50", hex: "#1192e8" },
      { zh: "蓝绿 70", en: "Teal 70", hex: "#005d5d" },
      { zh: "品红 70", en: "Magenta 70", hex: "#9f1853" },
      { zh: "红 50", en: "Red 50", hex: "#fa4d56" },
      { zh: "暗红 90", en: "Red 90", hex: "#570408" },
      { zh: "绿 60", en: "Green 60", hex: "#198038" },
      { zh: "蓝 80", en: "Blue 80", hex: "#002d9c" },
    ],
  },
  tableau10: {
    label: "Tableau 10",
    colors: [
      { zh: "蓝", en: "blue", hex: "#4E79A7" },
      { zh: "橙", en: "orange", hex: "#F28E2B" },
      { zh: "红", en: "red", hex: "#E15759" },
      { zh: "浅青", en: "light teal", hex: "#76B7B2" },
      { zh: "绿", en: "green", hex: "#59A14F" },
      { zh: "黄", en: "yellow", hex: "#EDC948" },
      { zh: "紫", en: "purple", hex: "#B07AA1" },
      { zh: "粉", en: "pink", hex: "#FF9DA7" },
    ],
  },
};

// 8 系列 × 4 季度的确定性演示数据(0-90)
const DATA: number[][] = [
  [62, 48, 71, 58],
  [45, 66, 52, 74],
  [58, 39, 64, 47],
  [70, 82, 59, 66],
  [38, 55, 47, 61],
  [52, 71, 83, 57],
  [44, 36, 58, 49],
  [66, 59, 42, 76],
];
const QUARTERS = [
  { zh: "Q1", en: "Q1" },
  { zh: "Q2", en: "Q2" },
  { zh: "Q3", en: "Q3" },
  { zh: "Q4", en: "Q4" },
];
const SERIES_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];

const W = 640;
const H = 340;
const M = { top: 24, right: 12, bottom: 34, left: 40 };
const PLOT_W = W - M.left - M.right - 128; // 右侧留给图例
const PLOT_H = H - M.top - M.bottom;
const Y_MAX = 100;

const css = `
.cp-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.cp-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.cp-chart svg { max-width: 100%; max-height: 100%; }
.cp-bar { stroke: var(--border-strong); stroke-width: 1; }
.cp-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.cp-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.cp-chip b { color: var(--text); font-weight: 600; }
`;

/**
 * 分类色板演示:三套调研内色板 × 2-8 系列,手绘 SVG 分组/堆叠条形图。
 * palette / series / layout 均为 JS 型参数——订阅 store 后重绘。
 * 黑色 swatch 用 1px --border-strong 描边兜底暗色主题(官方值不动)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    palette: store.get("palette") as PaletteId,
    series: store.get("series") as number,
    layout: store.get("layout") as string,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const pal = PALETTES[params.palette];
  const n = Math.max(2, Math.min(8, Math.round(params.series)));
  const colors = pal.colors.slice(0, n);

  const groupW = PLOT_W / QUARTERS.length;
  const barSlot = groupW / n;
  const barW = Math.min(34, barSlot * 0.72);

  const y = (v: number) => M.top + PLOT_H * (1 - v / Y_MAX);

  // 堆叠:每季度的累计和
  const stackedTops = QUARTERS.map((_, qi) => {
    let acc = 0;
    return colors.map((_, si) => {
      acc += DATA[si][qi];
      return acc;
    });
  });

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cp-stage">
        <div className="cp-chart">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="多系列条形图,演示分类色板 Multi-series bar chart demonstrating categorical palettes">
            {/* 值轴网格 + 刻度 */}
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={v}>
                <line x1={M.left} x2={M.left + PLOT_W} y1={y(v)} y2={y(v)} stroke="currentColor" opacity="0.14" />
                <text x={M.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--text-dim)">
                  {v}
                </text>
              </g>
            ))}
            {/* 类目轴 */}
            <line x1={M.left} x2={M.left + PLOT_W} y1={y(0)} y2={y(0)} stroke="var(--text-dim)" strokeWidth="1" />
            {QUARTERS.map((q, qi) => (
              <text
                key={q.en}
                x={M.left + groupW * qi + groupW / 2}
                y={y(0) + 18}
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-dim)"
              >
                {q.zh} / {q.en}
              </text>
            ))}
            {/* 柱 */}
            {QUARTERS.map((_, qi) => {
              const gx = M.left + groupW * qi + (groupW - barSlot * n) / 2 + (barSlot - barW) / 2;
              return (
                <g key={qi}>
                  {colors.map((c, si) => {
                    if (params.layout === "stacked") {
                      const top = stackedTops[qi][si];
                      const bottom = si === 0 ? 0 : stackedTops[qi][si - 1];
                      return (
                        <rect
                          key={c.hex}
                          className="cp-bar"
                          x={gx + si * barSlot}
                          y={y(top)}
                          width={barW}
                          height={Math.max(0, y(bottom) - y(top))}
                          fill={c.hex}
                        >
                          <title>{`${SERIES_NAMES[si]} · ${QUARTERS[qi].en} · ${DATA[si][qi]}`}</title>
                        </rect>
                      );
                    }
                    const v = DATA[si][qi];
                    return (
                      <rect
                        key={c.hex}
                        className="cp-bar"
                        x={gx + si * barSlot}
                        y={y(v)}
                        width={barW}
                        height={y(0) - y(v)}
                        fill={c.hex}
                      >
                        <title>{`${SERIES_NAMES[si]} · ${QUARTERS[qi].en} · ${v}`}</title>
                      </rect>
                    );
                  })}
                </g>
              );
            })}
            {/* 图例(右侧;swatch 描边兜底黑色/暗色主题) */}
            <g>
              {colors.map((c, si) => (
                <g key={c.hex} transform={`translate(${W - 120}, ${M.top + 6 + si * 26})`}>
                  <rect width="14" height="14" rx="3" fill={c.hex} stroke="var(--border-strong)" />
                  <text x="22" y="12" fontSize="11.5" fill="var(--text)">
                    {c.zh} {c.en}
                  </text>
                  <text x="22" y="23" fontSize="9.5" fill="var(--text-dim)" fontFamily="var(--font-mono, monospace)">
                    {c.hex}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
        <div className="cp-readout">
          <span className="cp-chip">
            色板 <b>{pal.label}</b>
          </span>
          <span className="cp-chip">
            系列 <b>{n}</b> / 上限 8
          </span>
          <span className="cp-chip">{params.layout === "stacked" ? "堆叠 Stacked" : "分组 Grouped"}</span>
          {params.palette === "okabe-ito" && n >= 8 && (
            <span className="cp-chip">第 9 类请并「其他」/ merge class 9+ into “Other”</span>
          )}
          {params.palette === "tableau10" && <span className="cp-chip">官方许可未证实 / license unverified</span>}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
