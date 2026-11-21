import { useEffect, useMemo, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type ModeId = "monochrome" | "multihue";

// ColorBrewer 官方 JSON 核验值:Blues 5 与 YlGnBu 5(官方 5 档整档,作锚点色)
const SCHEMES: Record<ModeId, { zh: string; en: string; stops: string[] }> = {
  monochrome: {
    zh: "Blues 单色线性",
    en: "Blues · monochrome linear",
    stops: ["#EFF3FF", "#BDD7E7", "#6BAED6", "#3182BD", "#08519C"],
  },
  multihue: {
    zh: "YlGnBu 多色渐进",
    en: "YlGnBu · multi-hue",
    stops: ["#FFFFCC", "#A1DAB4", "#41B6C4", "#2C7FB8", "#253494"],
  },
};

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// 在官方 5 锚点色之间做 sRGB 线性插值(仅为演示任意档数;
// 生产应取官方整档 JSON 或 d3-scale-chromatic 的均匀 B-spline 插值)
function sampleScale(stops: string[], t: number): string {
  const c = stops.map(hexToRgb);
  const x = Math.min(1, Math.max(0, t)) * (c.length - 1);
  const i = Math.min(c.length - 2, Math.floor(x));
  const f = x - i;
  const mix = c[i].map((v, k) => Math.round(v + (c[i + 1][k] - v) * f));
  return `rgb(${mix[0]} ${mix[1]} ${mix[2]})`;
}

const COLS = 9;
const ROWS = 7;
const CELL = 46;
const GAP = 3;
const PAD = 42;

// 确定性演示数据:sin/cos 场,值域 [0,1]
function cellValue(x: number, y: number): number {
  const v = (Math.sin((x + 1) * 0.62) + Math.cos((y + 1) * 0.81) + 2) / 4;
  return Math.min(1, Math.max(0, v));
}

const W = PAD * 2 + COLS * (CELL + GAP) - GAP + 8;
const H = PAD * 2 + ROWS * (CELL + GAP) - GAP + 64;

const css = `
.or-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.or-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.or-chart svg { max-width: 100%; max-height: 100%; }
.or-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.or-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.or-chip b { color: var(--text); font-weight: 600; }
.or-chip code { font-family: var(--font-mono, monospace); font-size: 11px; color: var(--text); }
`;

/**
 * 序数色阶演示:9×7 热力格 × 阶数 3-9 × 单色线性/多色渐进,手绘 SVG。
 * steps / mode 均为 JS 型参数——订阅 store 后重算色阶并重绘。
 * demo 在官方 5 锚点色间线性插值仅为演示;MDX 写明生产应取官方整档或 d3 B-spline。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    steps: store.get("steps") as number,
    mode: store.get("mode") as ModeId,
  });
  const [params, setParams] = useState(readParams);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  const scheme = SCHEMES[params.mode];
  const steps = Math.max(3, Math.min(9, Math.round(params.steps)));

  // 离散分箱:值域 [0,1] 均分 steps 档,档中心取色阶样本
  const scale = useMemo(
    () => Array.from({ length: steps }, (_, i) => sampleScale(scheme.stops, i / (steps - 1))),
    [scheme, steps],
  );
  const binOf = (v: number) => Math.min(steps - 1, Math.floor(v * steps));

  const legendY = PAD + ROWS * (CELL + GAP) + 14;
  const legendCellW = 34;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="or-stage">
        <div className="or-chart">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="热力图演示序数色阶 Heatmap demonstrating an ordinal scale">
            {Array.from({ length: ROWS }, (_, ry) =>
              Array.from({ length: COLS }, (_, cx) => {
                const v = cellValue(cx, ry);
                return (
                  <rect
                    key={`${cx}-${ry}`}
                    x={PAD + cx * (CELL + GAP)}
                    y={PAD + ry * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx="4"
                    fill={scale[binOf(v)]}
                    stroke="var(--border)"
                    strokeWidth="1"
                  >
                    <title>{`v = ${v.toFixed(2)} · 档 bin ${binOf(v) + 1}/${steps}`}</title>
                  </rect>
                );
              }),
            )}
            {/* 图例条:与热力格共用同一色阶数组 */}
            <text x={PAD} y={legendY + 24} fontSize="11" fill="var(--text-dim)">
              低 Low
            </text>
            {scale.map((c, i) => (
              <rect
                key={i}
                x={PAD + 34 + i * (legendCellW + 2)}
                y={legendY + 10}
                width={legendCellW}
                height={14}
                rx="2"
                fill={c}
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            <text x={W - PAD} y={legendY + 24} fontSize="11" fill="var(--text-dim)" textAnchor="end">
              高 High
            </text>
            <text x={W - PAD} y={PAD - 12} fontSize="11" fill="var(--text-dim)" textAnchor="end" fontFamily="var(--font-mono, monospace)">
              {scheme.en}
            </text>
          </svg>
        </div>
        <div className="or-readout">
          <span className="cp-chip or-chip">
            阶数 <b>{steps}</b> 档
          </span>
          <span className="or-chip">
            <b>{scheme.zh}</b>
          </span>
          <span className="or-chip">
            官方锚点 <code>{scheme.stops[0]}</code> → <code>{scheme.stops[scheme.stops.length - 1]}</code>
          </span>
          <span className="or-chip">demo 线性插值仅为演示 / linear interp is demo-only</span>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
