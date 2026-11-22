import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Level = "A" | "AA" | "AAA";

interface Sc {
  sc: string;
  level: Level;
  principle: "P" | "O" | "U" | "R";
  zh: string;
  en: string;
}

/** WCAG 2.2 官方 SC 事实(编号/等级/阈值);文案为速查化简 */
const ITEMS: Sc[] = [
  { sc: "1.1.1", level: "A", principle: "P", zh: "非文本内容:所有图片有等价替代文本,装饰图 alt=\"\"", en: "Non-text content: every image has equivalent alt text; decorative images get alt=\"\"" },
  { sc: "1.3.1", level: "A", principle: "P", zh: "信息与关系:标题/列表/表格语义正确,label 关联输入", en: "Info and relationships: headings/lists/tables semantic, labels associated with inputs" },
  { sc: "1.4.1", level: "A", principle: "P", zh: "颜色的使用:不只用颜色传达信息(链接加下划线)", en: "Use of color: never color alone (links get underlines)" },
  { sc: "1.4.3", level: "AA", principle: "P", zh: "对比度(最低):文本 ≥ 4.5:1;大字号 ≥ 3:1", en: "Contrast (minimum): text ≥ 4.5:1; large text ≥ 3:1" },
  { sc: "1.4.10", level: "AA", principle: "P", zh: "重排:320px 宽无水平滚动(400% 缩放可用)", en: "Reflow: no horizontal scroll at 320px width (usable at 400% zoom)" },
  { sc: "1.4.11", level: "AA", principle: "P", zh: "非文本对比:控件边界/图形/焦点环 ≥ 3:1", en: "Non-text contrast: boundaries/graphics/focus indicators ≥ 3:1" },
  { sc: "1.4.12", level: "AA", principle: "P", zh: "文本间距:段落 2×/行高 1.5×/词距 0.16×/字距 0.12× 字号时无损失", en: "Text spacing: no loss at 2× paragraph / 1.5× line / 0.16× word / 0.12× letter spacing" },
  { sc: "1.4.6", level: "AAA", principle: "P", zh: "对比度(增强):文本 ≥ 7:1;大字号 ≥ 4.5:1", en: "Contrast (enhanced): text ≥ 7:1; large text ≥ 4.5:1" },
  { sc: "2.1.1", level: "A", principle: "O", zh: "键盘:全部功能可仅用键盘完成", en: "Keyboard: all functionality operable by keyboard alone" },
  { sc: "2.1.2", level: "A", principle: "O", zh: "无键盘陷阱:焦点可移入也必须可用键盘移出(Esc 释放模态)", en: "No keyboard trap: focus can always leave via keyboard (Esc releases modals)" },
  { sc: "2.2.1", level: "A", principle: "O", zh: "可调时限:时限可关闭/调整/延长", en: "Timing adjustable: time limits can be turned off/adjusted/extended" },
  { sc: "2.4.1", level: "A", principle: "O", zh: "跳过重复块:提供 skip link 等绕过机制", en: "Bypass blocks: provide skip links and equivalents" },
  { sc: "2.4.7", level: "AA", principle: "O", zh: "焦点可见:焦点指示始终可见(别移除 outline)", en: "Focus visible: the focus indicator always visible (don't strip outlines)" },
  { sc: "2.5.8", level: "AA", principle: "O", zh: "目标尺寸(最低):指针目标 ≥ 24×24 CSS px(WCAG 2.2 新增)", en: "Target size (minimum): pointer targets ≥ 24×24 CSS px (new in WCAG 2.2)" },
  { sc: "2.1.3", level: "AAA", principle: "O", zh: "键盘(无例外):全部功能可键盘完成,无任何例外", en: "Keyboard (no exception): all functionality by keyboard with no exceptions" },
  { sc: "3.1.1", level: "A", principle: "U", zh: "页面语言:html 声明 lang", en: "Language of page: html declares lang" },
  { sc: "3.2.1", level: "A", principle: "U", zh: "获得焦点:聚焦本身不触发上下文变化", en: "On focus: receiving focus never changes context" },
  { sc: "3.3.1", level: "A", principle: "U", zh: "错误识别:错误就近指出并以文本描述", en: "Error identification: errors described in text next to the item" },
  { sc: "3.3.2", level: "A", principle: "U", zh: "标签或说明:输入有标签或说明", en: "Labels or instructions: inputs carry labels or instructions" },
  { sc: "3.3.3", level: "AA", principle: "U", zh: "错误建议:给出修正建议", en: "Error suggestion: correction suggestions provided" },
  { sc: "4.1.2", level: "A", principle: "R", zh: "名称、角色、值:自定义控件暴露 role/state/value", en: "Name, role, value: custom widgets expose role/state/value" },
  { sc: "4.1.3", level: "AA", principle: "R", zh: "状态消息:异步状态可被读屏获取(role=status)", en: "Status messages: async states reachable by screen readers (role=status)" },
];

const PRINCIPLES: { key: Sc["principle"]; zh: string; en: string }[] = [
  { key: "P", zh: "可感知 Perceivable", en: "Perceivable" },
  { key: "O", zh: "可操作 Operable", en: "Operable" },
  { key: "U", zh: "可理解 Understandable", en: "Understandable" },
  { key: "R", zh: "健壮 Robust", en: "Robust" },
];

const css = `
.wc-field { position: absolute; inset: 0; }
.wc-scroll {
  position: absolute;
  left: 12px;
  top: 36px;
  width: min(340px, 52%);
  max-height: calc(100% - 60px);
  overflow: auto;
  display: grid;
  gap: 10px;
  padding-right: 4px;
}
.wc-group {
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 10px;
  padding: 6px 10px 8px;
  margin: 0;
}
.wc-group legend { font-size: 12px; font-weight: 700; padding: 0 4px; }
.wc-item { display: flex; gap: 7px; align-items: flex-start; font-size: 11.5px; line-height: 1.5; padding: 3px 0; }
.wc-item input { margin-top: 2px; }
.wc-sc { font-weight: 700; white-space: nowrap; }
.wc-level {
  display: inline-block;
  min-width: 22px;
  text-align: center;
  border-radius: 5px;
  font-size: 10px;
  padding: 0 3px;
  margin-right: 2px;
}
.wc-level[data-level="A"] { background: oklch(0.85 0.07 150); }
.wc-level[data-level="AA"] { background: oklch(0.85 0.08 90); }
.wc-level[data-level="AAA"] { background: oklch(0.85 0.09 30); }
.wc-side {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 180px;
  padding: 12px 14px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.8);
  font-size: 12px;
  line-height: 1.7;
}
.wc-side meter { width: 100%; height: 14px; }
@media (max-width: 480px) {
  .wc-side { display: none; }
  .wc-scroll { width: calc(100% - 24px); }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [level, setLevel] = useState(() => store.get("level") as Level);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(
    () =>
      store.subscribe(() => {
        setLevel(store.get("level") as Level);
      }),
    [store],
  );

  const order: Level[] = ["A", "AA", "AAA"];
  const visible = ITEMS.filter((it) => order.indexOf(it.level) <= order.indexOf(level));

  const done = visible.filter((it) => checked[it.sc]).length;
  const pct = visible.length ? Math.round((done / visible.length) * 100) : 0;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="wc-field">
        <div className="wc-scroll">
          {PRINCIPLES.map((p) => {
            const group = visible.filter((it) => it.principle === p.key);
            if (!group.length) return null;
            return (
              <fieldset key={p.key} className="wc-group">
                <legend>{p.zh} {p.en}</legend>
                {group.map((it) => (
                  <label key={it.sc} className="wc-item">
                    <input
                      type="checkbox"
                      checked={!!checked[it.sc]}
                      onChange={(e) => setChecked((c) => ({ ...c, [it.sc]: e.target.checked }))}
                    />
                    <span>
                      <span className="wc-sc">{it.sc}</span>{" "}
                      <span className="wc-level" data-level={it.level}>{it.level}</span>
                      {it.zh} / {it.en}
                    </span>
                  </label>
                ))}
              </fieldset>
            );
          })}
        </div>

        <aside className="wc-side">
          <b>核对进度 Audit progress</b>
          <p style={{ margin: "2px 0 8px" }}>
            当前等级 level: <b>{level}</b> · 显示 {visible.length}/{ITEMS.length} 条
          </p>
          <meter min={0} max={100} value={pct} aria-label={`已核对 ${pct}%`} />
          <p style={{ margin: "4px 0 10px", fontVariantNumeric: "tabular-nums" }}>
            已核对 {done}/{visible.length}({pct}%)
          </p>
          <button type="button" onClick={() => setChecked({})} style={{ border: "1px solid oklch(0.5 0 0 / 0.4)", borderRadius: 8, padding: "4px 10px", background: "transparent", cursor: "pointer", fontSize: 12 }}>
            清空 Clear
          </button>
          <p style={{ margin: "10px 0 0", fontSize: 11, opacity: 0.7 }}>
            一致性累进:达标 AA 意味着同时满足其下所有 A 条目。
            Conformance is cumulative: meeting AA implies all A items beneath it.
          </p>
        </aside>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
