import { useState } from "react";
import type { EntrySchema } from "@/lib/types";
import { withBase } from "@/lib/urls";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "alps" | "nebula" | "gradient";

const BACKDROPS: { id: Backdrop; zh: string; en: string }[] = [
  { id: "alps", zh: "雪山", en: "Alps photo" },
  { id: "nebula", zh: "星空", en: "Nebula photo" },
  { id: "gradient", zh: "渐变", en: "Gradient" },
];

const css = `
.demo-stage {
  --bf-blur: 20px;
  --bf-saturate: 180%;
  --bf-brightness: 100%;
}
.bf-scene { position: absolute; inset: 0; overflow: hidden; }
.bf-bg img, .bf-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.bf-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* 彩色大字:磨砂面板身后的主要采样源之一 */
.bf-display {
  position: absolute;
  left: 8%;
  top: 14%;
  margin: 0;
  font-size: clamp(44px, 9cqw, 92px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.02em;
  background: linear-gradient(92deg, oklch(0.85 0.16 300), oklch(0.82 0.17 195) 55%, oklch(0.88 0.15 85));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 24px oklch(0.5 0.2 300 / 0.35);
}
.bf-display small { display: block; font-size: 0.34em; letter-spacing: 0.3em; color: rgb(255 255 255 / 0.85); -webkit-text-fill-color: rgb(255 255 255 / 0.85); }
/* 磨砂面板:blur + saturate + brightness 链式采样身后内容 */
.bf-panel {
  position: absolute;
  left: 50%;
  top: 56%;
  translate: -50% -50%;
  width: min(360px, calc(100% - 40px));
  padding: 20px 24px;
  background-color: rgb(255 255 255 / 0.12);
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 20px;
  -webkit-backdrop-filter: blur(var(--bf-blur)) saturate(var(--bf-saturate)) brightness(var(--bf-brightness));
  backdrop-filter: blur(var(--bf-blur)) saturate(var(--bf-saturate)) brightness(var(--bf-brightness));
  box-shadow: 0 8px 32px rgb(0 0 0 / 0.25);
  color: #17203a;
  animation: bf-in 0.5s ease-out both;
}
.bf-panel > * { position: relative; }
.bf-panel h3 { margin: 0 0 6px; font-size: 17px; font-weight: 650; }
.bf-panel p { margin: 0 0 14px; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.bf-actions { display: flex; gap: 10px; }
.bf-btn { border: 1px solid rgb(255 255 255 / 0.35); border-radius: 10px; padding: 6px 14px; font-size: 12.5px; cursor: pointer; color: inherit; background: rgb(255 255 255 / 0.14); }
.bf-btn-primary { background: rgb(30 90 220 / 0.85); border-color: transparent; color: #fff; }
.bf-toolbar {
  position: absolute; right: 12px; top: 12px; display: flex; gap: 2px; padding: 3px;
  border-radius: 999px; background: rgb(0 0 0 / 0.35);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.bf-toolbar button { border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.bf-toolbar button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .bf-panel { background-color: #dfe5ef; }
}
@keyframes bf-in {
  from { opacity: 0; translate: -50% calc(-50% + 10px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .bf-panel { animation: none; }
}
`;

/**
 * backdrop-filter 演示:彩色大字 + 照片背景上的一块磨砂面板。
 * blur / saturate / brightness 均为 CSS 变量型参数(经 DemoStage 注入 .demo-stage),
 * 改动即时反映在透出层的模糊/鲜艳度/明暗上。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const [backdrop, setBackdrop] = useState<Backdrop>("alps");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="bf-scene">
        {backdrop === "gradient" ? (
          <div className="bf-gradient" />
        ) : (
          <img src={withBase(`photos/glass-${backdrop}.jpg`)} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
        )}
        <p className="bf-display" aria-hidden="true">
          <small>MATERIALS</small>
          Aurora Frost
        </p>
        <section className="bf-panel" aria-label="磨砂面板示例 Frosted panel sample">
          <h3>磨砂面板 Frosted Panel</h3>
          <p>
            链式采样:blur 压细节、saturate 补色彩、brightness 控明暗 /
            Chained sampling: blur crushes detail, saturate restores color, brightness sets the tone.
          </p>
          <div className="bf-actions">
            <button type="button" className="bf-btn bf-btn-primary">确认 Confirm</button>
            <button type="button" className="bf-btn">取消 Cancel</button>
          </div>
        </section>
        <div className="bf-toolbar" role="group" aria-label="背景切换 Backdrop switcher">
          {BACKDROPS.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={backdrop === b.id}
              title={b.en}
              onClick={() => setBackdrop(b.id)}
            >
              {b.zh}
            </button>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
