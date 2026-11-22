import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 三档布局 → grid-template-areas 字符串与列定义(重排零 DOM 改动) */
const AREA_PRESETS: Record<string, { areas: string; cols: string; rows: string; label: string }> = {
  "desktop-left": {
    areas: `"header header"
"side   main"
"footer footer"`,
    cols: "var(--hg-side) 1fr",
    rows: "auto 1fr auto",
    label: "侧栏在左 sidebar left",
  },
  "desktop-right": {
    areas: `"header header"
"main   side"
"footer footer"`,
    cols: "1fr var(--hg-side)",
    rows: "auto 1fr auto",
    label: "侧栏在右 sidebar right",
  },
  stacked: {
    areas: `"header"
"main"
"side"
"footer"`,
    cols: "1fr",
    rows: "auto 1fr auto auto",
    label: "单列堆叠 stacked",
  },
};

const css = `
.hg-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.hg-page {
  display: grid;
  gap: var(--hg-gap);
  min-height: 340px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  padding: 12px;
  background: color-mix(in srgb, currentColor 4%, transparent);
}
.hg-cell {
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  padding: 8px 12px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-size: 12px;
}
.hg-cell b { display: block; font-size: 12.5px; margin-bottom: 2px; }
.hg-cell span { opacity: 0.7; font-size: 11.5px; line-height: 1.5; }
.hg-header { background: color-mix(in srgb, oklch(0.66 0.13 250) 24%, transparent); }
.hg-footer { background: color-mix(in srgb, oklch(0.66 0.13 250) 16%, transparent); }
.hg-side { background: color-mix(in srgb, oklch(0.68 0.15 160) 18%, transparent); }
.hg-main { background: color-mix(in srgb, oklch(0.68 0.14 75) 14%, transparent); }
.hg-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.hg-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 26%, transparent);
}
.hg-code {
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.6 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.hg-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .hg-chip { transition: none; }
}
`;

/**
 * 圣杯布局演示:layout 为 JS 型参数——grid-template-areas 字符串值不保证可走
 * CSS 变量,demo 按 container-queries 同款惯例订阅后重写 areas/列定义(零 DOM
 * 改动,纯字符串重排);gap / sideWidth 为 CSS 型参数(--hg-gap / --hg-side)。
 * 读数区实时显示当前 areas 字符串,「改字符串就重排」一眼可见。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [layout, setLayout] = useState(() => store.get("layout") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setLayout(store.get("layout") as string);
      }),
    [store],
  );

  const preset = AREA_PRESETS[layout] ?? AREA_PRESETS["desktop-left"];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="hg-wrap">
        <div
          className="hg-page"
          style={{
            gridTemplateAreas: preset.areas,
            gridTemplateColumns: preset.cols,
            gridTemplateRows: preset.rows,
          }}
        >
          <div className="hg-cell hg-header" style={{ gridArea: "header" }}>
            <b>header 页头</b>
            <span>grid-area: header</span>
          </div>
          <div className="hg-cell hg-side" style={{ gridArea: "side" }}>
            <b>side 侧栏</b>
            <span>grid-area: side · var(--hg-side)</span>
          </div>
          <div className="hg-cell hg-main" style={{ gridArea: "main" }}>
            <b>main 主栏</b>
            <span>grid-area: main · 1fr 吃下剩余空间 The main column takes the rest.</span>
          </div>
          <div className="hg-cell hg-footer" style={{ gridArea: "footer" }}>
            <b>footer 页脚</b>
            <span>grid-area: footer</span>
          </div>
        </div>
        <div className="hg-readout" aria-live="polite">
          <span>layout = {layout}</span>
          <span className="hg-chip">{preset.label}</span>
        </div>
        <pre className="hg-code" aria-label="当前 grid-template-areas 声明 the active grid-template-areas declaration">
{`grid-template-areas:
  ${preset.areas.split("\n").join("\n  ")};
grid-template-columns: ${preset.cols};
grid-template-rows: ${preset.rows};`}
        </pre>
        <p className="hg-hint">
          切换三档:DOM 一个字都没动,只有 areas 字符串在变——同名 token(header/side/main/footer)合并为命名区域,成员用 grid-area 入座。
          Switch the modes: the DOM never changes, only the areas string does — same-name tokens (header/side/main/footer) merge into named areas and members sit via grid-area.
          注意 DOM 顺序恒为 header → side → main → footer,读屏顺序不随视觉重排(WCAG 1.3.2)。
          The DOM order stays header → side → main → footer; screen-reader order never follows the visual re-order (WCAG 1.3.2).
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
