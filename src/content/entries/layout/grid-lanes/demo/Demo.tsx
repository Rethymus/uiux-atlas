import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 条目高度档位:真实 DOM 文本驱动,高度不一才能看出泳道与行带的差别 */
const LANE_ITEMS = [
  { n: "01", len: 2 },
  { n: "02", len: 4 },
  { n: "03", len: 1 },
  { n: "04", len: 3 },
  { n: "05", len: 5 },
  { n: "06", len: 2 },
  { n: "07", len: 1 },
  { n: "08", len: 4 },
  { n: "09", len: 3 },
  { n: "10", len: 2 },
];

const FILLER = "不等高条目 Uneven item. "; // 重复 n 次近似不同高度

const css = `
.gl-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.gl-toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.gl-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.gl-chip-native { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.gl-chip-fallback { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.gl-chip-cols { background: color-mix(in srgb, oklch(0.66 0.13 250) 28%, transparent); }
.gl-wall {
  display: grid;         /* 回退:所有浏览器(规范推荐双写) */
  display: grid-lanes;   /* Safari 26.4+ / Firefox Nightly */
  grid-template-columns: repeat(auto-fill, minmax(var(--gl-min), 1fr));
  gap: var(--gl-gap);
}
.gl-wall[data-engine="columns"] {
  display: block;
  columns: auto var(--gl-min);
  column-gap: var(--gl-gap);
}
.gl-card {
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  padding: 10px 12px;
}
.gl-wall[data-engine="columns"] .gl-card {
  break-inside: avoid;   /* 多列兜底:防止卡片被拦腰截断 */
  margin-bottom: var(--gl-gap);
}
.gl-card b { display: block; font-size: 12.5px; margin: 0 0 4px; }
.gl-card span { font-size: 12px; line-height: 1.5; opacity: 0.72; }
.gl-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.gl-code {
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.6 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.gl-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .gl-chip { transition: none; }
}
`;

/**
 * Grid Lanes 瀑布流演示:minTrack / gap 为 CSS 型参数(--gl-min / --gl-gap);
 * engine 为 JS 型参数——grid-lanes 档使用规范推荐的双写声明
 * (display: grid; display: grid-lanes;),并用 CSS.supports() 实时检测当前
 * 浏览器是否原生支持:支持 → 泳道排布;不支持 → 普通网格回退(行带错位可见,
 * 这正是泳道要解决的问题)。columns 档切换到多列瀑布流兜底(全平台可用)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [engine, setEngine] = useState(() => store.get("engine") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setEngine(store.get("engine") as string);
      }),
    [store],
  );

  // 运行时如实检测:原生 grid-lanes 还是回退形态
  const nativeLanes =
    typeof CSS !== "undefined" && typeof CSS.supports === "function"
      ? CSS.supports("display", "grid-lanes")
      : false;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gl-wrap">
        <div className="gl-readout" aria-live="polite">
          <span>engine = {engine}</span>
          <span className={`gl-chip ${engine === "columns" ? "gl-chip-cols" : nativeLanes ? "gl-chip-native" : "gl-chip-fallback"}`}>
            {engine === "columns"
              ? "columns 多列兜底(全平台)"
              : nativeLanes
                ? "本浏览器原生支持 grid-lanes → 泳道排布"
                : "本浏览器未实现 grid-lanes → 回退普通网格"}
          </span>
        </div>
        <div className="gl-wall" data-engine={engine}>
          {LANE_ITEMS.map((it) => (
            <div className="gl-card" key={it.n}>
              <b>条目 {it.n}</b>
              <span>{FILLER.repeat(it.len)}</span>
            </div>
          ))}
        </div>
        <pre className="gl-code" aria-label="当前生效的声明 active declarations">
{engine === "columns"
  ? `.gl-wall { display: block; columns: auto var(--gl-min); column-gap: var(--gl-gap); }\n.gl-card { break-inside: avoid; margin-bottom: var(--gl-gap); }`
  : `.gl-wall {\n  display: grid;         /* 回退:所有浏览器 */\n  display: grid-lanes;   /* Safari 26.4+ / Firefox Nightly */\n  grid-template-columns: repeat(auto-fill, minmax(var(--gl-min), 1fr));\n  gap: var(--gl-gap);\n}`}
        </pre>
        <p className="gl-hint">
          {engine === "grid-lanes" && !nativeLanes
            ? "当前浏览器未实现 grid-lanes,双写声明回退普通网格:不等高条目按行带对齐,同一行被最高条目拖累——行带错位正是泳道布局要解决的问题。Safari 26.4+ / Firefox Nightly 将呈现「条目进入剩余空间最多的列」的泳道排布。"
            : engine === "grid-lanes" && nativeLanes
              ? "本浏览器原生支持 grid-lanes:条目逐个放入列轨道、自动进入剩余空间最多的列,另一轴依次堆叠——无行带错位。"
              : "columns 多列是全平台可用的兜底:内容沿列流动、卡片 break-inside: avoid 防截断;注意顺序按列排布(自上而下再换列),不适合按行序阅读的内容。"}
          {engine === "grid-lanes" && !nativeLanes
            ? " This browser lacks grid-lanes, so the dual write falls back to a plain grid: uneven items align in row bands dragged by the tallest sibling — the very problem lanes solve. Safari 26.4+ / Firefox Nightly will place each item into the column with the most remaining space."
            : engine === "grid-lanes" && nativeLanes
              ? " This browser natively supports grid-lanes: items drop into tracks one by one, entering the column with the most remaining space — no row-band misalignment."
              : " The columns multi-column fallback works everywhere: content flows down columns with break-inside: avoid; note the order runs down each column, unfit for row-order reading."}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
