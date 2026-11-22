import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 正文长短档位:循环切换,真实 DOM 文本驱动行高 */
const BODY_LENGTHS = [
  ["短文。", "一句话正文,只有一行,行轨道很浅。", "这是最长的正文:整整四行文本,把内部行轨道撑到最高,用来检验页脚是否仍然跨卡对齐——subgrid 下它们共享父网格轨道,必然齐平。"],
  ["中等长度的正文,恰好两行,可见行轨道已开始分出高下。", "很短。", "次长的正文占三行,与最短的一张形成落差,页脚位置差距一目了然。"],
  ["这张卡片的正文为空档占位,行轨道塌到最小。", "三行正文:第一行、第二行、第三行,稳定撑起中等轨道。", "两行正文,介于最长与最短之间。"],
];

const CARDS = [
  { title: "卡片 A · Card A", footer: "footer A" },
  { title: "卡片 B · Card B", footer: "footer B" },
  { title: "卡片 C · Card C", footer: "footer C" },
];

const ROW_META = [
  { label: "标签 Label", value: "值 A1 / B1 / C1", action: "操作 Act" },
  { label: "长标签 Label 2", value: "更长的值 A2", action: "更宽 Act 2" },
  { label: "第三", value: "C3", action: "OK" },
];

const css = `
.sg-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.sg-toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.sg-btn {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
}
.sg-btn:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.sg-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}
.sg-panel {
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  padding: 12px;
}
.sg-panel h5 { margin: 0 0 8px; font-size: 12px; font-weight: 650; opacity: 0.8; }
.sg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sg-gap);
}
/* rows 轴:每张卡片跨 3 条父行轨道,内部行 = 父网格行 */
.sg-demo[data-axis="rows"] .sg-grid { grid-auto-rows: min-content; }
.sg-demo[data-axis="rows"] .sg-card {
  grid-row: auto / span 3;
  display: grid;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  padding: 8px 10px;
  background: color-mix(in srgb, currentColor 5%, transparent);
}
.sg-demo[data-axis="rows"] .sg-card[data-mode="sub"] { grid-template-rows: subgrid; }
.sg-demo[data-axis="rows"] .sg-card[data-mode="ind"] { grid-template-rows: auto auto auto; }
.sg-demo[data-axis="rows"] .sg-card h6 { margin: 0; font-size: 12px; font-weight: 700; }
.sg-demo[data-axis="rows"] .sg-card p { margin: 6px 0; font-size: 11.5px; line-height: 1.5; opacity: 0.75; }
.sg-demo[data-axis="rows"] .sg-card footer {
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.85;
  border-top: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
  padding-top: 6px;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 14%, transparent);
}
/* columns 轴:每行卡片跨父网格全部列轨道,内部列 = 父网格列 */
.sg-demo[data-axis="columns"] .sg-grid { grid-auto-rows: min-content; }
.sg-demo[data-axis="columns"] .sg-card {
  grid-column: 1 / -1;
  display: grid;
  align-items: center;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  padding: 8px 10px;
  background: color-mix(in srgb, currentColor 5%, transparent);
}
.sg-demo[data-axis="columns"] .sg-card[data-mode="sub"] { grid-template-columns: subgrid; }
.sg-demo[data-axis="columns"] .sg-card[data-mode="ind"] { grid-template-columns: auto auto auto; gap: 8px; }
.sg-demo[data-axis="columns"] .sg-cell { font-size: 11.5px; padding: 2px 0; }
.sg-demo[data-axis="columns"] .sg-cell b { font-size: 12px; }
.sg-demo[data-axis="columns"] .sg-cell i { font-style: normal; opacity: 0.7; }
.sg-demo[data-axis="columns"] .sg-cell em {
  font-style: normal;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 6px;
  padding: 1px 8px;
  justify-self: start;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 14%, transparent);
}
.sg-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
.sg-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 25%, transparent);
}
.sg-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (max-width: 480px) {
  .sg-panels { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .sg-chip { transition: none; }
}
`;

/**
 * 子网格演示:axis 为 JS 型参数——rows 轴下三张卡片各跨 3 条父行轨道声明
 * grid-template-rows: subgrid,columns 轴下每行卡片跨全部父列轨道声明
 * grid-template-columns: subgrid;左右两个面板对照 subgrid 与 independent
 * (独立轨道回退形态)。「换长度」按钮循环正文档位,真实 DOM 文本驱动行高。
 * gap 为 CSS 型参数(--sg-gap)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [axis, setAxis] = useState(() => store.get("axis") as string);
  const [lenIdx, setLenIdx] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setAxis(store.get("axis") as string);
      }),
    [store],
  );

  const bodies = BODY_LENGTHS[lenIdx % BODY_LENGTHS.length];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sg-wrap">
        <div className="sg-toolbar">
          <button
            type="button"
            className="sg-btn"
            onClick={() => setLenIdx((n) => n + 1)}
          >
            换长度 Vary lengths
          </button>
          <span className="sg-chip" aria-live="polite">
            axis = {axis}
          </span>
        </div>
        <div className="sg-demo sg-panels" data-axis={axis}>
          <section className="sg-panel">
            <h5>subgrid:共享父网格轨道 Shared parent tracks</h5>
            <div className="sg-grid">
              {axis === "rows"
                ? CARDS.map((c, i) => (
                    <article className="sg-card" data-mode="sub" key={c.title}>
                      <h6>{c.title}</h6>
                      <p>{bodies[i]}</p>
                      <footer>{c.footer}</footer>
                    </article>
                  ))
                : ROW_META.map((r, i) => (
                    <article className="sg-card" data-mode="sub" key={i}>
                      <span className="sg-cell">
                        <b>{r.label}</b>
                      </span>
                      <span className="sg-cell">
                        <i>{r.value}</i>
                      </span>
                      <span className="sg-cell">
                        <em>{r.action}</em>
                      </span>
                    </article>
                  ))}
            </div>
          </section>
          <section className="sg-panel">
            <h5>independent:各自独立轨道(回退形态)Independent tracks (fallback)</h5>
            <div className="sg-grid">
              {axis === "rows"
                ? CARDS.map((c, i) => (
                    <article className="sg-card" data-mode="ind" key={c.title}>
                      <h6>{c.title}</h6>
                      <p>{bodies[i]}</p>
                      <footer>{c.footer}</footer>
                    </article>
                  ))
                : ROW_META.map((r, i) => (
                    <article className="sg-card" data-mode="ind" key={i}>
                      <span className="sg-cell">
                        <b>{r.label}</b>
                      </span>
                      <span className="sg-cell">
                        <i>{r.value}</i>
                      </span>
                      <span className="sg-cell">
                        <em>{r.action}</em>
                      </span>
                    </article>
                  ))}
            </div>
          </section>
        </div>
        <p className="sg-note">
          {axis === "rows"
            ? "左面板:三张卡片声明 grid-template-rows: subgrid 并各跨 3 条父行轨道——页脚行共享,永远齐平;右面板各自算行,页脚错位。点「换长度」改变正文长短验证。"
            : "左面板:每行卡片声明 grid-template-columns: subgrid 并跨父网格全部列轨道——三列全表对齐;右面板每行独立算列宽,标签/值/操作列错位。"}
          {axis === "rows"
            ? " Left: cards declare grid-template-rows: subgrid spanning 3 parent row tracks — footer rows are shared and always flush; right: each card sizes its own rows, footers drift."
            : " Left: each row-card declares grid-template-columns: subgrid spanning all parent columns — three aligned columns table-wide; right: every row sizes columns independently, so label/value/action drift."}
        </p>
        <p className="sg-hint">
          subgrid 继承父网格的轨道定义(尺寸与 gap 一并继承);它只共享几何,不改变 DOM 语义,读屏顺序仍按文档流。
          subgrid inherits the parent's track definitions (sizes and gap included); it shares geometry only — DOM semantics and screen-reader order stay untouched.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
