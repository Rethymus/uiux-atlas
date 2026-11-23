import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
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
  --glass-blur: 20px;
  --glass-fill: oklch(1 0 0 / 0.15);
  --glass-border: oklch(1 0 0 / 0.3);
  --glass-radius: 20px;
}
.gm-scene { position: absolute; inset: 0; overflow: hidden; }
.gm-bg { position: absolute; inset: 0; }
.gm-bg img,
.gm-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.gm-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
.gm-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(340px, calc(100% - 32px));
  padding: 24px 26px;
  background-color: var(--glass-fill);
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  -webkit-backdrop-filter: blur(var(--glass-blur));
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  color: #1b2437;
  animation: gm-in 0.5s ease-out both;
}
.gm-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(17, 25, 40, 0.55);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.gm-scene[data-variant="dark"] .gm-card { color: #f5f7fa; }
.gm-scene[data-variant="dark"] .gm-card::before { opacity: 1; }
.gm-card > * { position: relative; }
/* 标题降为 p 后,显式钉住原 h3 视觉(含对 .gm-card p 规则的 opacity/line-height 反制) */
.gm-card .gm-card-title { margin: 0 0 8px; font-size: 18px; font-weight: 650; line-height: 1.3; opacity: 1; }
.gm-card p { margin: 0 0 16px; font-size: 13px; line-height: 1.6; opacity: 0.82; }
.gm-actions { display: flex; gap: 10px; }
.gm-btn {
  border: 1px solid var(--glass-border);
  border-radius: calc(var(--glass-radius) / 2);
  padding: 7px 16px;
  font-size: 13px;
  cursor: pointer;
  color: inherit;
}
.gm-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.gm-btn-ghost { background: transparent; }
.gm-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
/* 窄屏(≤480px)钉到场景左下角:徽标在左上、卡片居中,左下是唯一空闲区 */
@media (max-width: 480px) {
  .gm-toolbar {
    top: auto;
    bottom: 12px;
    left: 12px;
    right: auto;
  }
}
.gm-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.gm-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .gm-card { background-color: color-mix(in srgb, var(--glass-fill) 100%, #c7cfdb 65%); }
}
@keyframes gm-in {
  from { opacity: 0; translate: -50% calc(-50% + 10px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .gm-card { animation: none; }
  .gm-card::before { transition: none; }
}
`;

/**
 * 毛玻璃演示:毛玻璃卡片悬浮于彩色照片/渐变背景之上。
 * blur / fill / border / radius 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * variant 为 JS 型参数——订阅 store 后切换 data-variant,由 demo 内 CSS 消费。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("alps");

  useEffect(
    () =>
      store.subscribe(() => {
        setVariant(store.get("variant") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gm-scene" data-variant={variant}>
        <div className="gm-bg">
          {/* 装饰性背景照(a11y-img-aria-hidden-005):alt="" 之外再补
              aria-hidden="true",不依赖任何祖先隐藏(首页 hero 复用本 demo) */}
          {backdrop === "gradient" ? (
            <div className="gm-gradient" />
          ) : (
            <img
              src={`/photos/glass-${backdrop}.jpg`}
              alt=""
              aria-hidden="true"
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="gm-card">
          {/* 卡片标题用 p + 类名而非 h3(a11y-h3-skip-001 同族):demo 道具卡的
              标签不是页面文档结构标题——首页 hero(本 demo 静态直出)会形成
              h1→h3 跳级(WCAG 1.3.1),条目页水合后同理 */}
          <p className="gm-card-title">毛玻璃卡片 Glass Card</p>
          <p>
            背景越丰富,玻璃越立体 / Glass only reads as glass over a rich backdrop.
          </p>
          <div className="gm-actions">
            <button type="button" className="gm-btn gm-btn-primary">主操作 Action</button>
            <button type="button" className="gm-btn gm-btn-ghost">取消 Cancel</button>
          </div>
        </div>
        <div className="gm-toolbar" role="group" aria-label="背景切换 Backdrop switcher">
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
