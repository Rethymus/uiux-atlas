import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type IconMode = "outline" | "filled";

/** 内联简洁字形图标:同一几何两种模式(outline 描边 / filled 填充) */
function FlatIcon({ name, mode }: { name: string; mode: IconMode }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: mode === "filled" ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: mode === "filled" ? 0 : 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "wifi":
      return (
        <svg {...common}>
          <path d="M4 9.5a12 12 0 0 1 16 0" />
          <path d="M7 13a8 8 0 0 1 10 0" />
          <path d="M10 16.5a4 4 0 0 1 4 0" />
          {mode === "filled" && <circle cx="12" cy="19" r="1.6" stroke="none" />}
          {mode === "outline" && <circle cx="12" cy="19" r="1" />}
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" />
          <path d="M10 19a2.2 2.2 0 0 0 4 0" />
        </svg>
      );
    case "battery":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="16" height="8" rx="1.5" />
          <path d="M21.5 10.5v3" strokeWidth={3.2} />
          {mode === "filled" && <rect x="5" y="10" width="9" height="4" rx="0.8" stroke="none" />}
          {mode === "outline" && <rect x="5.5" y="10.5" width="8" height="3" rx="0.6" />}
        </svg>
      );
    default:
      return null;
  }
}

const css = `
.demo-stage {
  --fd-accent: #007aff;
  --fd-radius: 4px;
}
.fd-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: oklch(0.96 0.005 250);
  color: oklch(0.2 0.01 250);
}
.fd-panel {
  width: min(330px, calc(100% - 32px));
  padding: 18px 18px 20px;
  background: oklch(1 0 0);
  border-radius: var(--fd-radius);
  border: 1px solid oklch(0.88 0.01 250);
  animation: fd-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* ornament 档位:严格扁平纪律 vs flat 2.0 微渐变/柔和投影 */
.fd-scene[data-ornament="gradient"] .fd-tile-accent { background-image: linear-gradient(to bottom, oklch(1 0 0 / 0.14), transparent 55%); }
.fd-scene[data-ornament="gradient"] .fd-switch .fd-knob,
.fd-scene[data-ornament="gradient"] .fd-btn-primary { background-image: linear-gradient(to bottom, oklch(1 0 0 / 0.12), transparent 60%); }
.fd-scene[data-ornament="shadow"] .fd-panel { box-shadow: 0 4px 14px oklch(0 0 / 0.12); border-color: transparent; }
.fd-scene[data-ornament="shadow"] .fd-btn-primary,
.fd-scene[data-ornament="shadow"] .fd-tile-accent { box-shadow: 0 2px 6px oklch(0 0 / 0.18); }
.fd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 14px;
}
.fd-head h2 { margin: 0; font-size: 16px; font-weight: 700; }
.fd-tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}
.fd-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 10px;
  border: 0;
  border-radius: var(--fd-radius);
  background: oklch(0.93 0.02 250);
  color: oklch(0.35 0.02 250);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.fd-tile:hover { background: oklch(0.88 0.03 250); }
.fd-tile[aria-pressed="true"] { background: var(--fd-accent); color: oklch(1 0 0); }
.fd-tile:focus-visible { outline: 2px solid var(--fd-accent); outline-offset: 2px; }
.fd-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 0;
  border-top: 1px solid oklch(0.92 0.01 250);
  font-size: 13.5px;
}
.fd-row .fd-icon { display: inline-flex; margin-right: 9px; vertical-align: -4px; color: oklch(0.45 0.02 250); }
.fd-btn-primary {
  width: 100%;
  margin-top: 14px;
  padding: 10px 0;
  border: 0;
  border-radius: var(--fd-radius);
  background: var(--fd-accent);
  color: oklch(1 0 0);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
}
.fd-btn-primary:hover { filter: brightness(0.94); }
.fd-btn-primary:focus-visible { outline: 2px solid oklch(0.2 0.01 250); outline-offset: 2px; }
/* 扁平开关:几何形状承担全部可供性 */
.fd-switch {
  position: relative;
  width: 44px;
  height: 26px;
  border-radius: 999px;
  border: 0;
  background: oklch(0.85 0.02 250);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.fd-switch[aria-checked="true"] { background: var(--fd-accent); }
.fd-switch .fd-knob {
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: oklch(1 0 0);
  transition: translate 0.15s ease;
}
.fd-switch[aria-checked="true"] .fd-knob { translate: 18px 0; }
.fd-switch:focus-visible { outline: 2px solid var(--fd-accent); outline-offset: 2px; }
.fd-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: var(--fd-radius);
  background: oklch(0.9 0.01 250);
}
@media (max-width: 480px) {
  .fd-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.fd-toggle button {
  border: 0;
  border-radius: var(--fd-radius);
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: oklch(0.35 0.02 250);
  background: transparent;
}
.fd-toggle button[aria-pressed="true"] { background: oklch(1 0 0); color: oklch(0.2 0.01 250); }
.fd-toggle button:focus-visible { outline: 2px solid var(--fd-accent); outline-offset: 1px; }
@keyframes fd-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .fd-panel { animation: none; }
  .fd-tile, .fd-switch, .fd-switch .fd-knob, .fd-btn-primary { transition: none; }
}
`;

/**
 * 扁平化演示:严格扁平设置面板(平色磁贴 + 字形图标 + 几何开关)。
 * accent / radius 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * ornament / iconStyle 为 JS 型参数——订阅 store 切换 data-ornament / 图标模式。
 * 磁贴与开关可点,选中态用颜色 + aria-pressed 表达;prefers-reduced-motion 全部过渡取消。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [ornament, setOrnament] = useState(() => store.get("ornament") as string);
  const [iconMode, setIconMode] = useState(() => store.get("iconStyle") as IconMode);
  const [tile, setTile] = useState("wifi");
  const [wifi, setWifi] = useState(true);

  useEffect(
    () =>
      store.subscribe(() => {
        setOrnament(store.get("ornament") as string);
        setIconMode(store.get("iconStyle") as IconMode);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="fd-scene" data-ornament={ornament}>
        <div className="fd-panel">
          <div className="fd-head">
            <h2>Settings</h2>
          </div>
          <div className="fd-tiles" role="group" aria-label="模块磁贴 Module tiles">
            {(["wifi", "bell", "battery"] as const).map((n) => (
              <button
                key={n}
                type="button"
                className="fd-tile"
                aria-pressed={tile === n}
                onClick={() => setTile(n)}
              >
                <FlatIcon name={n} mode={iconMode} />
                <span>{n === "wifi" ? "Network" : n === "bell" ? "Alerts" : "Battery"}</span>
              </button>
            ))}
          </div>
          <div className="fd-row">
            <span>
              <span className="fd-icon">
                <FlatIcon name="wifi" mode={iconMode} />
              </span>
              Wi-Fi
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={wifi}
              className="fd-switch"
              aria-label="Wi-Fi 开关 Wi-Fi switch"
              onClick={() => setWifi((v) => !v)}
            >
              <span className="fd-knob" />
            </button>
          </div>
          <div className="fd-row">
            <span>
              <span className="fd-icon">
                <FlatIcon name="bell" mode={iconMode} />
              </span>
              Notifications
            </span>
            <span style={{ fontSize: 12, opacity: 0.6 }}>On</span>
          </div>
          <button type="button" className="fd-btn-primary">Done</button>
        </div>
        <div className="fd-toggle" role="group" aria-label="图标模式 Icon mode switcher">
          {(["outline", "filled"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={iconMode === m}
              onClick={() => store.set("iconStyle", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
