import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.wm-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 16px;
  overflow: auto;
}
.wm-paper {
  writing-mode: var(--wm-mode, vertical-rl);
  text-orientation: var(--wm-orientation, mixed);
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: auto;
  padding: 18px 20px;
  background: color-mix(in srgb, currentColor 5%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  animation: wm-in 0.45s ease-out both;
}
.wm-paper h3 { font-size: 16px; margin: 0 0 12px; letter-spacing: 0.12em; }
.wm-paper p { margin: 0 0 10px; font-size: 15px; line-height: 2; letter-spacing: 0.18em; }
.wm-year { text-combine-upright: var(--wm-combine, none); }
.wm-side { flex: none; width: 190px; display: flex; flex-direction: column; gap: 10px; }
/* 书脊标签:调研 12§2 片段原样 aside h2 { writing-mode: vertical-rl } */
.wm-spine {
  writing-mode: vertical-rl;
  align-self: end;
  padding: 12px 6px;
  font-size: 12px;
  letter-spacing: 0.3em;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 6px;
  background: color-mix(in srgb, oklch(0.62 0.15 250) 14%, transparent);
  white-space: nowrap;
}
/* 西文侧放标签:调研 12§2 片段 sideways-lr + @supports 回退 rotate(-90deg) 的运行时等价 */
.wm-latin-tag {
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
  color: inherit;
  background: transparent;
  cursor: pointer;
  align-self: center;
  margin-block: 12px;
}
.wm-latin-tag[data-sideways="true"] { writing-mode: sideways-lr; }
.wm-latin-tag[data-fallback="true"] { transform: rotate(-90deg); }
.wm-readout {
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
}
.wm-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.wm-hint { font-size: 11px; opacity: 0.55; margin: 0; line-height: 1.6; }
@keyframes wm-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (max-width: 560px) {
  .wm-scene { flex-direction: column; }
  .wm-paper { height: auto; min-height: 220px; }
  .wm-side { width: auto; flex-direction: row; flex-wrap: wrap; align-items: center; }
  .wm-spine { writing-mode: horizontal-tb; align-self: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .wm-paper { animation: none; }
}
`;

const LINES = ["床前明月光", "疑是地上霜", "举头望明月", "低头思故乡"];

/**
 * 书写模式演示:信纸整体 writing-mode/text-orientation 走 CSS 变量,
 * 年份「2026」挂 text-combine-upright;书脊标签恒为 vertical-rl(12§2 片段);
 * 西文标签按 CSS.supports('writing-mode','sideways-lr') 如实选择原生或 rotate 回退。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [orientation, setOrientation] = useState(() => store.get("orientation") as string);
  const [combine, setCombine] = useState(() => store.get("combine") as string);
  const [sidewaysOk, setSidewaysOk] = useState<boolean | null>(null);
  const [latinFallback, setLatinFallback] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
        setOrientation(store.get("orientation") as string);
        setCombine(store.get("combine") as string);
      }),
    [store],
  );

  // 运行时特性检测(@supports 思路):sideways-lr 是否可用
  useEffect(() => {
    const ok = typeof CSS !== "undefined" && CSS.supports?.("writing-mode", "sideways-lr");
    setSidewaysOk(Boolean(ok));
  }, []);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="wm-scene">
        <div className="wm-paper">
          <h3>静夜思 · Li Bai</h3>
          {LINES.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p>
            <span className="wm-year">2026</span> 年书
          </p>
        </div>
        <div className="wm-side">
          <span className="wm-spine" aria-hidden="true">书脊 · 书写模式</span>
          <button
            type="button"
            className="wm-latin-tag"
            data-sideways={sidewaysOk === true}
            data-fallback={sidewaysOk === false && latinFallback}
            onClick={() => sidewaysOk === false && setLatinFallback((v) => !v)}
            title={
              sidewaysOk === false
                ? "当前引擎不支持 sideways-lr,点击切换 rotate(-90deg) 回退"
                : "sideways-lr 西文自下而上侧放"
            }
          >
            sideways latin · 自下而上
          </button>
          <div className="wm-readout">
            <div>当前 mode = <strong>{mode}</strong></div>
            <div>text-orientation = <strong>{orientation}</strong>(仅竖排生效)</div>
            <div>text-combine-upright = <strong>{combine}</strong>(看信纸落款年份)</div>
            <div>
              CSS.supports(sideways-lr) = <strong>{sidewaysOk === null ? "检测中…" : sidewaysOk ? "true(原生侧放)" : "false(需回退)"}</strong>
            </div>
          </div>
          <p className="wm-hint">
            竖排档:标题里「Li Bai」是 orientation 三档的探针(mixed 旋转/upright 直立堆叠/sideways 全侧放)。
            mode=sideways-lr 且引擎不支持时,信纸自动回落横排——experimental 值无效即回落(调研 12§2)。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
