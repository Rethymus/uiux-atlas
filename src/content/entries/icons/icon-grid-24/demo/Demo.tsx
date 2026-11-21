import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.ig-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.ig-canvas-wrap { position: relative; }
.ig-svg {
  display: block;
  width: min(256px, calc(100vw - 96px));
  height: auto;
  background: #f1f5f9;
  border-radius: 14px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08), 0 8px 24px rgba(15, 23, 42, 0.12);
}
.ig-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 14px;
  max-width: 440px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
}
.ig-legend span { display: inline-flex; align-items: center; gap: 6px; }
.ig-chip { width: 16px; height: 3px; border-radius: 2px; display: inline-block; }
.ig-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.55);
  text-align: center;
  max-width: 460px;
}
.ig-tag { display: inline-block; margin-left: 4px; padding: 1px 8px; border-radius: 999px; font-size: 11px; }
.ig-tag-official { background: rgba(22, 163, 74, 0.14); color: #15803d; }
.ig-tag-derived { background: rgba(234, 88, 12, 0.12); color: #c2410c; }
`;

/** 参考线统一 0.125 单位描边(8 倍整数缩放下渲染 1px) */
const S = 0.125;

/**
 * 24px 图标栅格演示:gridSize / padding 均为 JS 型参数(订阅 store 后重算 SVG 几何)。
 * 官方锚值(24 网格):展示区 24、活动区 20、padding 2、方 18×18、圆 Ø20、横 20×16、竖 16×20
 * (m2.material.io system-icons,07 §2)。非官方档位按 24 基准等比推导并明示标签。
 * 示例图形为自绘「图片」图标(24 网格原稿,随网格等比缩放示意)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [gridSize, setGridSize] = useState(() => Number(store.get("gridSize") as string));
  const [padding, setPadding] = useState(() => store.get("padding") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setGridSize(Number(store.get("gridSize") as string));
        setPadding(store.get("padding") as number);
      }),
    [store],
  );

  const g = gridSize;
  const pad = padding;
  const live = g - pad * 2;
  const sq = Math.max(live - 2, 0); // 方形键程 = 活动区 - 2(24 官方档:20-2=18)
  const land = Math.max(live - 4, 0); // 长方形短边(24 官方档:16)
  const isOfficial = g === 24 && pad === 2;
  const isDense = g === 20 && pad === 2;
  const k = g / 24;

  const gridLines: ReactNode[] = [];
  for (let i = 1; i < g; i++) {
    gridLines.push(<line key={`v${i}`} x1={i} y1={0} x2={i} y2={g} />);
    gridLines.push(<line key={`h${i}`} x1={0} y1={i} x2={g} y2={i} />);
  }

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ig-scene">
        <div className="ig-canvas-wrap">
          <svg
            className="ig-svg"
            width={g * 8}
            height={g * 8}
            viewBox={`0 0 ${g} ${g}`}
            role="img"
            aria-label={`图标栅格 ${g} 乘 ${g},活动区 ${live} 乘 ${live},方形键程 ${sq}`}
          >
            {/* 网格线 */}
            <g stroke="rgba(100, 116, 139, 0.35)" strokeWidth={S}>
              {gridLines}
            </g>
            {/* 活动区:白色区域,四周浅灰即 padding 走廊;外框即修剪区 */}
            <rect x={pad} y={pad} width={live} height={live} fill="#ffffff" />
            <rect
              x={pad}
              y={pad}
              width={live}
              height={live}
              fill="none"
              stroke="#2563eb"
              strokeDasharray={`${S * 3} ${S * 2}`}
              strokeWidth={S * 1.6}
            />
            {/* 键程参考线 */}
            <g fill="none" strokeWidth={S * 1.6}>
              <rect
                x={(g - sq) / 2}
                y={(g - sq) / 2}
                width={sq}
                height={sq}
                stroke="#ea580c"
              />
              <circle cx={g / 2} cy={g / 2} r={live / 2} stroke="#16a34a" />
              <rect
                x={(g - live) / 2}
                y={(g - land) / 2}
                width={live}
                height={land}
                stroke="rgba(100, 116, 139, 0.85)"
                strokeDasharray={`${S * 1.5} ${S * 1.5}`}
              />
              <rect
                x={(g - land) / 2}
                y={(g - live) / 2}
                width={land}
                height={live}
                stroke="rgba(100, 116, 139, 0.85)"
                strokeDasharray={`${S * 1.5} ${S * 1.5}`}
              />
            </g>
            {/* 示例图形:自绘「图片」图标,24 网格原稿等比缩放 */}
            <g
              transform={`scale(${k})`}
              fill="none"
              stroke="rgba(15, 23, 42, 0.75)"
              strokeWidth={0.28}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="2" />
              <circle cx="9.2" cy="9.6" r="1.7" />
              <path d="M4.9 17.1l4.4-4.4 3.1 3.1 3.5-3.5 3.6 3.6" />
            </g>
          </svg>
        </div>
        <div className="ig-legend" aria-hidden="true">
          <span>
            <i className="ig-chip" style={{ background: "#2563eb" }} /> 活动区 Live {live}×{live}
          </span>
          <span>
            <i className="ig-chip" style={{ background: "#ea580c" }} /> 方形键程 {sq}×{sq}
          </span>
          <span>
            <i className="ig-chip" style={{ background: "#16a34a" }} /> 圆形键程 Ø{live}
          </span>
          <span>
            <i className="ig-chip" style={{ background: "rgba(100,116,139,0.85)" }} /> 长方形 {live}×
            {land} / {land}×{live}
          </span>
          <span>外框 = 修剪区 {g}×{g} · padding {pad}</span>
        </div>
        <div className="ig-readout" aria-live="polite">
          gridSize={g} · padding={pad} → live {live}×{live} · square {sq}×{sq} · circle Ø{live} ·
          rect {live}×{land}/{land}×{live}
          {isOfficial ? (
            <span className="ig-tag ig-tag-official">Material 官方值(07 §2)</span>
          ) : isDense ? (
            <span className="ig-tag ig-tag-official">密集布局官方活动区 16×16;键程为推导</span>
          ) : (
            <span className="ig-tag ig-tag-derived">按 24 基准等比推导,官方未定义</span>
          )}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
