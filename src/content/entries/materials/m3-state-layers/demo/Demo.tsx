import { useState } from "react";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --m3-hover-opacity: 8%;
  --m3-focus-opacity: 10%;
  --m3-press-opacity: 10%;
  --m3-drag-opacity: 16%;
  --m3-state-color: #ffffff; /* on-primary,M3 基线亮色(调研 06§7) */
}
.m3-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fffbfe; /* M3 基线亮色 surface(调研 06§7) */
  padding: 16px;
}
.m3-btn {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 30px;
  border: 0;
  border-radius: 999px;
  background: #6750a4; /* M3 基线亮色 primary(调研 06§7) */
  color: #ffffff;
  font-size: 15px;
  font-weight: 550;
  cursor: pointer;
}
.m3-layer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--m3-state-color);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s linear;
}
.m3-layer[data-state="press"] { z-index: 2; }
.m3-layer[data-state="drag"] { z-index: 3; }
.m3-label { position: relative; z-index: 1; }
.m3-btn[data-hover="on"] .m3-layer[data-state="hover"] { opacity: var(--m3-hover-opacity); }
.m3-btn[data-focus="on"] .m3-layer[data-state="focus"] { opacity: var(--m3-focus-opacity); }
.m3-btn[data-press="on"] .m3-layer[data-state="press"] { opacity: var(--m3-press-opacity); }
.m3-btn[data-drag="on"] .m3-layer[data-state="drag"] { opacity: var(--m3-drag-opacity); }
.m3-btn:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
.m3-controls {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: 260px;
}
.m3-chip {
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: #ffffff;
  color: #1c1b1f;
}
.m3-chip[aria-pressed="true"] {
  background: #6750a4;
  border-color: #6750a4;
  color: #ffffff;
}
.m3-caption { position: absolute; left: 12px; bottom: 12px; font-size: 12px; color: #49454f; max-width: 60%; }
@media (prefers-reduced-motion: reduce) {
  .m3-layer { transition: none; }
}
`;

type Flag = "hover" | "focus" | "press" | "drag";
const FLAGS: { id: Flag; zh: string; en: string }[] = [
  { id: "hover", zh: "Hover 8%", en: "Hover 8%" },
  { id: "focus", zh: "Focus 10%", en: "Focus 10%" },
  { id: "press", zh: "Press 10%", en: "Press 10%" },
  { id: "drag", zh: "Drag 16%", en: "Drag 16%" },
];

/**
 * M3 状态层演示:一枚 filled button,四层内容色状态层(hover/focus/press/drag)。
 * 四个百分比为 CSS 变量型参数(经 DemoStage 注入);
 * 状态开关为 demo 内部交互,指针事件 + focus-visible + 手动开关可把四层同时点亮。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  void schema;
  const [flags, setFlags] = useState<Record<Flag, boolean>>({
    hover: false,
    focus: false,
    press: false,
    drag: false,
  });

  const toggle = (f: Flag) => setFlags((s) => ({ ...s, [f]: !s[f] }));
  const all = Object.values(flags).every(Boolean);
  const lit = Object.entries(flags).filter(([, v]) => v).length;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="m3-scene">
        <button
          type="button"
          className="m3-btn"
          data-hover={flags.hover ? "on" : "off"}
          data-focus={flags.focus ? "on" : "off"}
          data-press={flags.press ? "on" : "off"}
          data-drag={flags.drag ? "on" : "off"}
          onPointerEnter={() => !flags.hover && toggle("hover")}
          onPointerLeave={() => flags.hover && toggle("hover")}
          onPointerDown={() => !flags.press && toggle("press")}
          onPointerUp={() => flags.press && toggle("press")}
          onFocus={() => !flags.focus && toggle("focus")}
          onBlur={() => flags.focus && toggle("focus")}
        >
          <span className="m3-layer" data-state="hover" />
          <span className="m3-layer" data-state="focus" />
          <span className="m3-layer" data-state="press" />
          <span className="m3-layer" data-state="drag" />
          <span className="m3-label">状态层 State Layers</span>
        </button>
        <div className="m3-controls" role="group" aria-label="状态开关 State toggles">
          {FLAGS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="m3-chip"
              aria-pressed={flags[f.id]}
              onClick={() => toggle(f.id)}
            >
              {f.zh} / {f.en}
            </button>
          ))}
        </div>
        <p className="m3-caption">
          已点亮 {lit}/4 层——悬停/按下按钮也会真实触发;四层同亮 = 8+10+10+16% 叠加。
          {all ? " All four layers stacked." : ""}
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
