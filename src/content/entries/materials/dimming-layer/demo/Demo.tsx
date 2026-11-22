import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "alps" | "nebula";

const BACKDROPS: { id: Backdrop; zh: string; en: string }[] = [
  { id: "alps", zh: "亮图", en: "Bright photo" },
  { id: "nebula", zh: "暗图", en: "Dark photo" },
];

const css = `
.demo-stage {
  --dim-alpha: 0.35;
  --dim-color: #000000;
}
.dim-scene { position: absolute; inset: 0; overflow: hidden; }
.dim-bg, .dim-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* 压暗层两式:纯色(solid)与梯度(gradient),opacity 交叉过渡 */
.dim-scrim-solid,
.dim-scrim-grad {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.dim-scrim-solid {
  background: color-mix(in srgb, var(--dim-color) calc(var(--dim-alpha) * 100%), transparent);
}
.dim-scrim-grad {
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--dim-color) calc(var(--dim-alpha) * 100%), transparent),
    transparent 60%
  );
}
.dim-scene[data-mode="solid"] .dim-scrim-grad { opacity: 0; }
.dim-scene[data-mode="gradient"] .dim-scrim-solid { opacity: 0; }

/* solid 形态:弹窗(dialog::backdrop 的 mock,真身应为伪元素) */
.dim-dialog {
  position: absolute;
  left: 50%;
  top: 44%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 56px));
  padding: 20px 22px;
  border-radius: 14px;
  background: #ffffff;
  color: #22304a;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}
.dim-dialog h3 { margin: 0 0 6px; font-size: 16px; font-weight: 650; }
.dim-dialog p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.8; }
.dim-dialog-actions { display: flex; gap: 8px; justify-content: flex-end; }
.dim-btn {
  border: 0;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  background: #1e5adc;
  color: #fff;
}
.dim-btn-ghost { background: rgba(30, 90, 220, 0.12); color: #1e5adc; }
.dim-scene[data-mode="gradient"] .dim-dialog { opacity: 0; pointer-events: none; }
.dim-dialog { transition: opacity 0.25s ease; }

/* gradient 形态:图注文字压图(落点即梯度峰值处) */
.dim-caption {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 40px;
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.dim-caption small { display: block; margin-top: 4px; font-size: 11px; opacity: 0.85; }
.dim-scene[data-mode="solid"] .dim-caption { opacity: 0; }
.dim-caption { transition: opacity 0.25s ease; }

.dim-toolbar {
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
.dim-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.dim-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.dim-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 58%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
}
.dim-scene[data-mode="solid"] .dim-note { color: rgba(255, 255, 255, 0.75); }
@media (max-width: 480px) {
  .dim-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .dim-scrim-solid, .dim-scrim-grad, .dim-dialog, .dim-caption { transition: none; }
}
`;

/**
 * 压暗层演示:solid = 弹窗 + 全屏纯色遮罩(::backdrop 的 mock);gradient = 图注文字压图。
 * strength(enum → --dim-alpha)与 color 为 CSS 变量型参数(经 DemoStage 注入);
 * mode 为 JS 型参数——订阅 store 后切 data-mode。
 * 背景亮/暗切换用于验证「下层内容偏亮时加压暗」的官方建议场景。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("alps");

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dim-scene" data-mode={mode}>
        <div className="dim-bg" aria-hidden="true">
          <img src={`/photos/glass-${backdrop}.jpg`} alt="" />
        </div>
        <div className="dim-scrim-solid" aria-hidden="true" />
        <div className="dim-scrim-grad" aria-hidden="true" />
        <div className="dim-dialog" role="dialog" aria-label="压暗层演示弹窗 Dimming demo dialog">
          <h3>模态弹窗 Modal dialog</h3>
          <p>
            真身应为 dialog::backdrop——不继承任何属性,颜色须完整声明。
            Natively this lives on dialog::backdrop, which inherits nothing.
          </p>
          <div className="dim-dialog-actions">
            <button type="button" className="dim-btn dim-btn-ghost">取消 Cancel</button>
            <button type="button" className="dim-btn">确定 OK</button>
          </div>
        </div>
        <p className="dim-caption">
          文字压图 Caption over photo
          <small>梯度式只在底部峰值处达到 α 档位——图心保留 / The gradient peaks at the caption; the subject stays clear.</small>
        </p>
        <div className="dim-toolbar" role="group" aria-label="背景切换 Backdrop switcher">
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
        <p className="dim-note">
          α 默认 35%(HIG 官方建议);下层偏亮时压暗、偏暗时减档——切「暗图」对照。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
