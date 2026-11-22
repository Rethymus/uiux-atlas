import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.ov-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 8px 8px 14px; gap: 10px; }
.ov-anchor { margin-bottom: 8px; }
.ov-trigger {
  border: 1px solid transparent; border-radius: 999px; padding: 9px 20px;
  font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.ov-trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ov-panel {
  position: absolute; left: 50%; bottom: 96px; translate: -50% 0;
  width: min(320px, calc(100% - 28px));
  padding: 12px 14px; border-radius: 12px;
  background: var(--surface); border: 1px solid var(--border);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
  z-index: 5;
  /* 锚点方向 origin:触发钮在下方 → origin 取 bottom(仿 Radix 语义) */
  transform-origin: var(--tf-origin, bottom);
  opacity: 0;
  transform: translateY(var(--overlay-shift, 8px)) scale(var(--overlay-scale, 0.95));
}
.ov-panel[data-open="true"] {
  animation: ov-in var(--overlay-in-ms, 200ms) var(--overlay-ease, cubic-bezier(0.4, 0, 0.2, 1)) both;
}
.ov-panel[data-open="false"] {
  animation: ov-out var(--overlay-out-ms, 150ms) cubic-bezier(0.4, 0, 1, 1) both;
  pointer-events: none;
}
.ov-panel:focus { outline: none; }
.ov-panel h4 { margin: 2px 0 6px; font-size: 14px; }
.ov-panel p { margin: 0 0 8px; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.ov-item {
  display: block; width: 100%; text-align: left; border: 0; border-radius: 8px;
  padding: 7px 10px; font-size: 13px; color: var(--text); background: transparent; cursor: pointer;
}
.ov-item:hover, .ov-item:focus-visible { background: color-mix(in srgb, var(--border) 45%, transparent); outline: none; }
.ov-state { font-size: 12px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
@keyframes ov-in {
  from { opacity: 0; transform: translateY(var(--overlay-shift, 8px)) scale(var(--overlay-scale, 0.95)); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ov-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(0) scale(var(--overlay-scale, 0.95)); }
}
@media (prefers-reduced-motion: reduce) {
  .ov-panel, .ov-panel[data-open="true"], .ov-panel[data-open="false"] {
    animation: ov-fade 80ms linear both;
  }
}
@keyframes ov-fade { from { opacity: 0; } to { opacity: 1; } }
`;

/**
 * 浮层入场演示:面板从触发钮方向弹入(zoom-95 + fade + 8px 方向位移)。
 * 全部五个参数都是 CSS 变量型(initialScale/shiftY/inDuration/outDuration/curve),
 * 经 DemoStage 注入 .demo-stage 后被 keyframes 与 transform-origin 直接消费,demo 无需订阅。
 * 交互完整:点击外部关闭、Esc 关闭、打开焦点入面板、关闭归还触发钮(WAI-APG Dialog 语义)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  void store;
  const [open, setOpen] = useState(false);
  const [toggles, setToggles] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 打开:焦点移入面板;关闭:归还触发钮
  useEffect(() => {
    if (open) panelRef.current?.focus();
    else triggerRef.current?.focus();
  }, [open]);

  // 点击外部关闭(document 级 pointerdown;触发钮与面板内部不触发)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ov-stage">
        <div
          className="ov-panel"
          ref={panelRef}
          data-open={open ? "true" : "false"}
          role="dialog"
          aria-label="从触发钮弹入的浮层 overlay entering from its trigger"
          aria-hidden={!open}
          tabIndex={-1}
        >
          <h4>浮层 Overlay</h4>
          <p>
            初态 scale {`var(--overlay-scale)`} + 位移 {`var(--overlay-shift)`} + fade,
            origin 取触发钮方向;Esc / 点击外部关闭。
          </p>
          <button type="button" className="ov-item" onClick={() => setOpen(false)}>
            条目一(点我关闭)Item one
          </button>
          <button type="button" className="ov-item" onClick={() => setOpen(false)}>
            条目二 Item two
          </button>
        </div>
        <div className="ov-anchor">
          <button
            type="button"
            className="ov-trigger"
            ref={triggerRef}
            aria-expanded={open}
            onClick={() => {
              setOpen((v) => !v);
              setToggles((n) => n + 1);
            }}
          >
            {open ? "关闭 Close" : "打开浮层 Open overlay"}
          </button>
        </div>
        <div className="ov-state" aria-live="off">
          {toggles > 0
            ? `打开 ${Math.ceil(toggles / 2)} 次 · 入 ${`--overlay-in-ms`} / 出 ${`--overlay-out-ms`}`
            : "点按钮,看浮层从锚点方向弹入 / Click to pop the overlay from its anchor"}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
