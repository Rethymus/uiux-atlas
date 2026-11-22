import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.af-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.af-playground { width: 100%; overflow-x: auto; padding: 2px; }
.af-slot { width: var(--af-width); max-width: 100%; }
.af-grid,
.af-ruler {
  display: grid;
  gap: var(--af-gap);
}
.af-grid[data-mode="auto-fill"] { grid-template-columns: repeat(auto-fill, minmax(var(--af-min), 1fr)); }
.af-grid[data-mode="auto-fit"] { grid-template-columns: repeat(auto-fit, minmax(var(--af-min), 1fr)); }
.af-card {
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  padding: 10px 12px;
  min-height: 74px;
  animation: af-in 0.35s ease-out both;
}
.af-card b { display: block; font-size: 13px; margin: 0 0 4px; }
.af-card span { font-size: 12px; line-height: 1.5; opacity: 0.72; }
.af-ruler { margin-top: 2px; }
.af-cell {
  border-radius: 6px;
  padding: 4px 6px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  text-align: center;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 22%, transparent);
  border: 1px dashed color-mix(in srgb, oklch(0.66 0.13 250) 55%, transparent);
  white-space: nowrap;
}
.af-cell[data-collapsed="true"] {
  background: transparent;
  border-style: dotted;
  opacity: 0.55;
}
.af-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.af-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.af-chip-fit { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.af-chip-fill { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.af-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@keyframes af-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .af-card { animation: none; }
  .af-chip { transition: none; }
}
`;

/**
 * auto-fit 流式网格演示:minTrack / gap / width 为 CSS 型参数(--af-min / --af-gap /
 * --af-width);mode 为 JS 型参数——repeat() 关键字经 data-mode 切换字面量声明;
 * itemCount 为 JS 型参数控制渲染条目数。轨道标尺按 (width+gap)/(min+gap) 解析轨道数,
 * auto-fit 模式下标记被回收为 0px 的空轨道。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [count, setCount] = useState(() => store.get("itemCount") as number);
  const [width, setWidth] = useState(() => store.get("width") as number);
  const [min, setMin] = useState(() => store.get("minTrack") as number);
  const [gap, setGap] = useState(() => store.get("gap") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
        setCount(store.get("itemCount") as number);
        setWidth(store.get("width") as number);
        setMin(store.get("minTrack") as number);
        setGap(store.get("gap") as number);
      }),
    [store],
  );

  // 解析轨道数:能塞下几条 minmax(min, 1fr) 轨道(忽略亚像素取整差异)
  const tracks = Math.max(1, Math.floor((width + gap) / (min + gap)));
  const used = Math.min(tracks, count);
  const collapsed = mode === "auto-fit" ? Math.max(0, tracks - used) : 0;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="af-wrap">
        <div className="af-playground">
          <div className="af-slot">
            <div className="af-grid" data-mode={mode}>
              {Array.from({ length: count }, (_, i) => (
                <div className="af-card" key={i}>
                  <b>卡片 {String(i + 1).padStart(2, "0")}</b>
                  <span>minmax(var(--af-min), 1fr) 轨道 · fluid track</span>
                </div>
              ))}
            </div>
            <div
              className="af-ruler"
              style={{ gridTemplateColumns: `repeat(${tracks}, minmax(0, 1fr))` }}
              aria-hidden="true"
            >
              {Array.from({ length: tracks }, (_, i) => {
                const gone = i >= used;
                return (
                  <div
                    className="af-cell"
                    key={i}
                    data-collapsed={gone && mode === "auto-fit" ? "true" : "false"}
                  >
                    {gone && mode === "auto-fit" ? "回收 0px" : `1fr`}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="af-readout" aria-live="polite">
          <span>width = {width}px</span>
          <span>min = {min}px</span>
          <span>gap = {gap}px</span>
          <span>轨道数 = {tracks}(计算值)</span>
          <span>条目 = {count}</span>
          <span className={`af-chip ${mode === "auto-fit" ? "af-chip-fit" : "af-chip-fill"}`}>
            {mode === "auto-fit"
              ? `auto-fit · 回收 ${collapsed} 条空轨道`
              : "auto-fill · 保留空轨道"}
          </span>
        </div>
        <p className="af-hint">
          {mode === "auto-fit" && collapsed > 0
            ? "auto-fit 把没有条目的轨道回收为 0px,剩余轨道拉伸填满——这正是它和 auto-fill 的全部区别。"
            : mode === "auto-fill" && used < tracks
              ? "auto-fill 保留空轨道(空置但占位)——需要轨道位置稳定时选它。"
              : "条目数 ≥ 轨道数时两个关键字渲染结果相同;把条目数调到小于轨道数即可看到差异。"}
          {mode === "auto-fit" && collapsed > 0
            ? " auto-fit collapses item-less tracks to 0px and stretches the rest — the entire difference from auto-fill."
            : mode === "auto-fill" && used < tracks
              ? " auto-fill keeps empty tracks (vacant but in place) — pick it when track positions must stay stable."
              : " With items ≥ tracks both keywords render identically; drop the item count below the track count to see the split."}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
