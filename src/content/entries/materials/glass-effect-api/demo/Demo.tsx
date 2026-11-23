import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import { withBase } from "@/lib/urls";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "alps" | "nebula";

const css = `
.demo-stage {
  --liquid-tint: 0%;
  --liquid-spacing: 8;
}
.lg-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.lg-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.lg-container {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: flex;
  align-items: center;
  /* 两块胶囊固定间距 24px;spacing 参数逼近 24 时融合桥渐显 */
}
.lg-glass {
  position: relative;
  border: 1px solid oklch(1 0 0 / 0.45);
  border-radius: 999px; /* 官方默认形状 Capsule */
  padding: 12px 26px;
  font-size: 14px;
  font-weight: 600;
  color: #17202e;
  cursor: pointer;
  background: oklch(1 0 0 / 0.22);
  -webkit-backdrop-filter: blur(14px) saturate(1.6);
  backdrop-filter: blur(14px) saturate(1.6);
  transition: filter 0.15s ease, transform 0.15s ease, background-color 0.2s ease;
  overflow: hidden;
}
.lg-glass:focus-visible { outline: 3px solid #0a84ff; outline-offset: 2px; }
/* tint(_:):固定强调色 × 强度(Web 强度映射,官方接受任意 Color) */
.lg-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: oklch(0.62 0.17 250);
  opacity: var(--liquid-tint);
}
.lg-glass > span { position: relative; }
/* clear 变体:高透;亮背景(雪山)按 HIG 叠 35% 暗层 */
.lg-scene[data-variant="clear"] .lg-glass {
  background: oklch(1 0 0 / 0.06);
  -webkit-backdrop-filter: blur(3px) saturate(1.2);
  backdrop-filter: blur(3px) saturate(1.2);
  color: #f5f7fa;
}
.lg-scene[data-variant="clear"] .lg-glass::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgb(0 0 0 / 0.35);
}
/* interactive(_:):hover 提亮 + 按压缩放 */
.lg-scene[data-interactive="on"] .lg-glass:hover { filter: brightness(1.12); }
.lg-scene[data-interactive="on"] .lg-glass:active { transform: scale(0.96); }
.lg-bridge {
  width: 24px;
  height: 46px;
  border-radius: 4px;
  background: oklch(1 0 0 / 0.18);
  -webkit-backdrop-filter: blur(14px) saturate(1.6);
  backdrop-filter: blur(14px) saturate(1.6);
  border-inline: 1px solid oklch(1 0 0 / 0.35);
  opacity: clamp(0, calc((var(--liquid-spacing) - 8) / 16), 1);
  transition: opacity 0.15s ease;
}
.lg-scene[data-variant="clear"] .lg-bridge {
  background: oklch(1 0 0 / 0.06);
  -webkit-backdrop-filter: blur(3px) saturate(1.2);
  backdrop-filter: blur(3px) saturate(1.2);
}
.lg-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}
.lg-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.78);
  background: transparent;
}
.lg-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.lg-note {
  position: absolute;
  left: 14px;
  bottom: 10px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  max-width: 68%;
}
@media (prefers-reduced-motion: reduce) {
  .lg-glass, .lg-bridge { transition: none; }
  .lg-scene[data-interactive="on"] .lg-glass:active { transform: none; }
}
`;

/**
 * Liquid Glass API 近似演示:两枚胶囊玻璃 + spacing 融合桥,悬浮于照片背景。
 * variant / interactive 为 JS 型参数(订阅 store 切 data 属性);
 * tintIntensity / spacing 为 CSS 变量型参数(经 DemoStage 注入)。
 * 注明:CSS 近似,非 Liquid Glass 本体(无折射/scroll edge effect)。
 * reduced-motion 时去除过渡与按压缩放。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [interactive, setInteractive] = useState(() => store.get("interactive") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("alps");

  useEffect(
    () =>
      store.subscribe(() => {
        setVariant(store.get("variant") as string);
        setInteractive(store.get("interactive") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="lg-scene" data-variant={variant} data-interactive={interactive}>
        <div className="lg-bg">
          <img src={withBase(`photos/glass-${backdrop}.jpg`)} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
        </div>
        <div className="lg-container">
          <button type="button" className="lg-glass"><span>按钮 A / Btn A</span></button>
          <div className="lg-bridge" aria-hidden="true" />
          <button type="button" className="lg-glass"><span>按钮 B / Btn B</span></button>
        </div>
        <div className="lg-toolbar" role="group" aria-label="背景切换 Backdrop switcher">
          <button
            type="button"
            aria-pressed={backdrop === "alps"}
            onClick={() => setBackdrop("alps")}
          >
            雪山
          </button>
          <button
            type="button"
            aria-pressed={backdrop === "nebula"}
            onClick={() => setBackdrop("nebula")}
          >
            星空
          </button>
        </div>
        <p className="lg-note">
          CSS 近似呈现 glassEffect/GlassEffectContainer 语义(regular 默认、clear + 35% 暗层、spacing 融合桥);
          无折射与 scroll edge effect,非 Liquid Glass 本体。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
