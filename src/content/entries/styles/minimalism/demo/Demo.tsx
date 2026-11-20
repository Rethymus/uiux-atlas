import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --min-space: 8px;
  --min-accent: #2563eb;
}
.min-scene {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  background: #fafaf9;   /* --bg,调研 token */
  color: #1c1917;        /* --ink,调研 token */
  animation: min-in 0.4s ease-out both;
}
.min-page {
  width: min(65ch, calc(100% - 48px));
  padding: calc(var(--min-space) * 5) 0;
}
.min-eyebrow {
  margin: 0 0 calc(var(--min-space) * 3);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #57534e;        /* --ink-muted,调研 token */
}
.min-h1 { margin: 0 0 calc(var(--min-space) * 4); font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
.min-body {
  margin: 0 0 calc(var(--min-space) * 5);
  font-size: 16px;
  line-height: 1.6;
  color: #57534e;
}
.min-cta {
  display: inline-block;
  border: 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: var(--min-accent);
  padding: calc(var(--min-space) * 1.5) calc(var(--min-space) * 3);
  border-radius: var(--min-space);
  transition: filter 0.12s ease;
}
.min-cta:hover { filter: brightness(0.94); }
.min-cta:focus-visible { outline: 2px solid var(--min-accent); outline-offset: 2px; }
.min-divider { border: 0; border-top: 1px solid #f0efec; margin: calc(var(--min-space) * 6) 0; }  /* --surface,调研 token */
.min-scale { display: grid; gap: calc(var(--min-space) * 2); }
.min-scale-row { display: flex; align-items: baseline; gap: calc(var(--min-space) * 2); }
.min-scale-label {
  flex: 0 0 108px;
  font-family: ui-monospace, "JetBrains Mono", "Courier New", monospace;
  font-size: 11px;
  color: #57534e;
}
.min-scale-sample { color: #1c1917; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@keyframes min-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .min-scene { animation: none; }
  .min-cta { transition: none; }
}
`;

/**
 * 极简主义演示:五枚调色 token + 模数字阶 + 间距刻度。
 * ratio 为 JS 型参数——订阅 store 后在 React 内逐级换算字阶并以内联字号渲染;
 * space / accent 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [ratio, setRatio] = useState(() => store.get("ratio") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setRatio(store.get("ratio") as number);
      }),
    [store],
  );

  const base = 16;
  const steps: { key: string; zh: string; en: string; size: number }[] = [
    { key: "caption", zh: "辅助说明", en: "Caption", size: base / ratio },
    { key: "body", zh: "正文", en: "Body", size: base },
    { key: "h3", zh: "小标题", en: "H3", size: base * ratio },
    { key: "h2", zh: "节标题", en: "H2", size: base * ratio * ratio },
    { key: "h1", zh: "主标题", en: "H1", size: base * ratio * ratio * ratio },
  ];
  const fmt = (n: number) => `${(Math.round(n * 10) / 10).toFixed(1)}px`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="min-scene">
        <div className="min-page">
          <p className="min-eyebrow">Minimal · 基线 Baseline</p>
          <h1 className="min-h1" style={{ fontSize: fmt(steps[4].size) }}>
            一个想法一个屏幕 One idea, one screen
          </h1>
          <p className="min-body">
            留白即设计系统:层级靠字阶与间距刻度,不靠边框与卡片。
            Whitespace is the design system — hierarchy comes from the type scale and spacing steps, not borders.
          </p>
          <button type="button" className="min-cta">开始使用 Get started</button>
          <hr className="min-divider" />
          <div className="min-scale" aria-label="字阶标本 Type-scale specimen">
            {steps.map((s) => (
              <div key={s.key} className="min-scale-row">
                <span className="min-scale-label">
                  {s.en} · {fmt(s.size)}
                </span>
                <span className="min-scale-sample" style={{ fontSize: fmt(s.size) }}>
                  {s.zh}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
