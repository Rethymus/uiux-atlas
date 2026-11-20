import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Scheme = "system" | "light" | "dark";

const SCHEMES: { id: Scheme; zh: string; en: string }[] = [
  { id: "system", zh: "系统", en: "System" },
  { id: "light", zh: "浅色", en: "Light" },
  { id: "dark", zh: "深色", en: "Dark" },
];

const css = `
.ld-scene {
  /* 默认值兜底(挂载瞬间 store 尚未注入时保证可见),与 schema.json 默认一致 */
  --ld-light: #6750A4;
  --ld-dark: #D0BCFF;
  /* 兼容回退变量:仅当 light-dark() 不被支持时被消费(见底部 @supports not) */
  --ld-fallback-accent: var(--ld-light);
  --ld-fallback-on-accent: #FFFFFF;
  color-scheme: light dark; /* system 档:跟随 OS 偏好 */
}
.ld-scene[data-scheme="light"] { color-scheme: light; }
.ld-scene[data-scheme="dark"]  { color-scheme: dark; }

/* OS 偏好翻转:只有支持媒体查询但不支持 light-dark() 的浏览器才会走到下面的 @supports not,
   在支持的浏览器里这段会被后面的 @supports 块整体覆写 */
@media (prefers-color-scheme: dark) {
  .ld-scene {
    --ld-fallback-accent: var(--ld-dark);
    --ld-fallback-on-accent: #381E72;
  }
}
@supports (color: light-dark(#fff, #000)) {
  .ld-scene {
    --ld-fallback-accent: light-dark(var(--ld-light), var(--ld-dark));
    --ld-fallback-on-accent: light-dark(#FFFFFF, #381E72);
  }
}

.ld-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 20px;
  /* 系统色(CSS Color 4 §6.2):响应元素 color-scheme,天然双态、零发明值;
     color-scheme 属性本身比 light-dark() 支持更早,故老浏览器下 OS 跟随依然生效 */
  background-color: Canvas;
  color: CanvasText;
}
.ld-chip {
  width: min(300px, 62%);
  padding: 22px 26px;
  border-radius: 18px;
  background-color: var(--ld-fallback-accent);
  color: var(--ld-fallback-on-accent);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.ld-chip h3 { margin: 0 0 8px; font-size: 17px; font-weight: 650; }
.ld-chip p { margin: 0 0 14px; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.ld-chip button {
  border: 0;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
  background: rgba(255, 255, 255, 0.24);
}
.ld-panel {
  width: min(280px, 34%);
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: 12.5px;
}
.ld-code {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 12px;
  line-height: 1.5;
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, currentColor 8%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  overflow-wrap: anywhere;
}
.ld-swatch {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 3px;
  margin-right: 7px;
  vertical-align: -1px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
}
.ld-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 12%, transparent);
}
.ld-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: inherit;
  background: transparent;
}
.ld-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, currentColor 20%, transparent);
  font-weight: 600;
}
@media (prefers-reduced-motion: reduce) {
  .ld-chip { transition: none; }
}
`;

/**
 * light-dark() 演示:scheme 为 JS 型参数——订阅后改写舞台 color-scheme,
 * 所有取色点用 light-dark() 声明,由浏览器按 color-scheme 求值。
 * 中性底色用系统色 Canvas/CanvasText(响应 color-scheme,CSS Color 4 §6.2);
 * on-primary 取 M3 基线 #FFFFFF/#381E72(Android 开发者文档,调研 06§7)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [scheme, setScheme] = useState(() => store.get("scheme") as Scheme);

  useEffect(
    () =>
      store.subscribe(() => {
        setScheme(store.get("scheme") as Scheme);
      }),
    [store],
  );

  const light = store.get("lightValue") as string;
  const dark = store.get("darkValue") as string;
  const schemeCss = scheme === "system" ? "light dark" : scheme;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ld-scene" data-scheme={scheme}>
        <div className="ld-chip">
          <h3>双值取色 light-dark()</h3>
          <p>
            切换上方三态,改写的只是 color-scheme。
            Switching the three states rewrites only color-scheme.
          </p>
          <button type="button">主操作 Action</button>
        </div>
        <div className="ld-panel">
          <span className="ld-code">color-scheme: {schemeCss};</span>
          <span className="ld-code">
            <span className="ld-swatch" style={{ background: light }} />
            light-dark({light}, {dark})
          </span>
          <span className="ld-code">
            <span className="ld-swatch" style={{ background: "#FFFFFF" }} />
            <span className="ld-swatch" style={{ background: "#381E72" }} />
            on-primary 基线 / on-primary baseline
          </span>
          <span style={{ fontSize: 11.5, opacity: 0.72 }}>
            中性底为系统色 Canvas/CanvasText / Neutral surfaces use Canvas &amp; CanvasText
          </span>
        </div>
        <div className="ld-toolbar" role="group" aria-label="外观切换 Appearance switcher">
          {SCHEMES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scheme === s.id}
              title={s.en}
              onClick={() => setScheme(s.id)}
            >
              {s.zh}
            </button>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
