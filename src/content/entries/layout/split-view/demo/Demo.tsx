import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const KEYBOARD_STEP = 2; // 方向键步长(%),演示基准值

const css = `
.sv-scene { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 16px; gap: 10px; }
.sv-split {
  flex: 1;
  min-height: 0;
  display: flex;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 12px;
  overflow: hidden;
  background: color-mix(in srgb, currentColor 4%, transparent);
}
.sv-pane-left {
  width: var(--sv-start, 40%);
  min-width: var(--sv-min, 20%);
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  overflow: hidden;
  transition: width 0.15s ease;
}
.sv-divider {
  flex: none;
  width: 10px;
  cursor: ew-resize;
  touch-action: none;
  border: 0;
  padding: 0;
  position: relative;
  background: color-mix(in srgb, currentColor 8%, transparent);
}
.sv-divider::after {
  content: "";
  position: absolute;
  inset: 0 3px;
  border-left: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
  border-right: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
}
.sv-divider:hover, .sv-divider[data-dragging="true"] { background: color-mix(in srgb, currentColor 16%, transparent); }
.sv-divider:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: -2px; }
.sv-pane-right {
  flex: 1;
  min-width: 0;
  container-type: inline-size;
  container-name: sv-card;
  padding: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}
.sv-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
}
.sv-card-media {
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: linear-gradient(135deg, oklch(0.68 0.16 250 / 0.9), oklch(0.72 0.18 160 / 0.85));
}
.sv-card h4 { margin: 0 0 4px; font-size: 14px; line-height: 1.3; }
.sv-card p { margin: 0; font-size: 12px; line-height: 1.5; opacity: 0.75; }
/* 容器查询联动:右栏过窄(≤ 280px)时卡片翻纵排——查询条件必须是字面量 */
@container sv-card (max-width: 280px) {
  .sv-card { flex-direction: column; }
  .sv-card-media { width: 100%; height: 44px; }
}
.sv-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 7px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  color: inherit;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: start;
}
.sv-file[aria-current="true"] { background: color-mix(in srgb, currentColor 12%, transparent); font-weight: 600; }
.sv-file:hover { background: color-mix(in srgb, currentColor 9%, transparent); }
.sv-file-dot { flex: none; width: 8px; height: 8px; border-radius: 3px; }
.sv-readout {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 12px;
  opacity: 0.8;
  font-variant-numeric: tabular-nums;
}
.sv-readout strong { font-weight: 650; }
.sv-hint { font-size: 11px; opacity: 0.55; margin: 0; }
@media (max-width: 480px) {
  .sv-split { flex-direction: column; }
  .sv-pane-left { width: 100% !important; min-height: 0; }
  .sv-divider { width: auto; height: 10px; cursor: ns-resize; }
  .sv-divider::after {
    inset: 3px 0;
    border-left: 0;
    border-right: 0;
    border-top: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
    border-bottom: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
  }
  .sv-pane-right { container-type: inline-size; }
}
@media (prefers-reduced-motion: reduce) {
  .sv-pane-left { transition: none; }
}
`;

const FILES = [
  { id: "api.ts", color: "oklch(0.68 0.16 250)", note: "24 KB" },
  { id: "store.ts", color: "oklch(0.68 0.18 160)", note: "4 KB" },
  { id: "panel.tsx", color: "oklch(0.74 0.14 85)", note: "12 KB" },
  { id: "styles.css", color: "oklch(0.66 0.17 300)", note: "9 KB" },
  { id: "README.md", color: "oklch(0.6 0.05 260)", note: "2 KB" },
];

/**
 * 分栏视图演示:原生 Pointer Events + role="separator" 的可拖双栏。
 * startSize 为 CSS 型参数(--sv-start),拖拽经 store.set 回写实现滑杆与拖拽双向同步;
 * minSize 为 JS 型夹紧下限,订阅后写进拖拽夹紧与 aria-valuemin。
 * 右栏 container-type: inline-size + 字面量断点,栏宽变窄时卡片自动翻纵排(容器查询联动)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [startSize, setStartSize] = useState(() => store.get("startSize") as number);
  const [minSize, setMinSize] = useState(() => store.get("minSize") as number);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState("api.ts");
  const [rightWidth, setRightWidth] = useState(0);
  const splitRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setStartSize(store.get("startSize") as number);
        setMinSize(store.get("minSize") as number);
      }),
    [store],
  );

  // 右栏实测宽度(ResizeObserver 读真实布局值,不伪造)
  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setRightWidth(Math.round(e.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clamp = (pct: number) => Math.min(100 - minSize, Math.max(minSize, pct));

  const applyFromPointer = (clientX: number) => {
    const rect = splitRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    store.set("startSize", clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onDividerPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    applyFromPointer(e.clientX);
  };

  const onDividerPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    applyFromPointer(e.clientX);
  };

  const endDrag = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onDividerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? KEYBOARD_STEP * 3 : KEYBOARD_STEP;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      store.set("startSize", clamp(startSize - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      store.set("startSize", clamp(startSize + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      store.set("startSize", minSize);
    } else if (e.key === "End") {
      e.preventDefault();
      store.set("startSize", 100 - minSize);
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sv-scene">
        <div className="sv-split" ref={splitRef}>
          <div className="sv-pane-left" role="group" aria-label="文件树 File tree">
            {FILES.map((f) => (
              <button
                key={f.id}
                type="button"
                className="sv-file"
                aria-current={active === f.id}
                onClick={() => setActive(f.id)}
              >
                <span className="sv-file-dot" style={{ background: f.color }} aria-hidden="true" />
                <span>{f.id}</span>
                <span style={{ marginLeft: "auto", opacity: 0.55, fontSize: 11 }}>{f.note}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="sv-divider"
            role="separator"
            aria-orientation="vertical"
            aria-label="调整左右栏宽度 Resize panes"
            aria-valuemin={minSize}
            aria-valuemax={100 - minSize}
            aria-valuenow={Math.round(startSize)}
            data-dragging={dragging}
            title="拖拽调整 / 方向键微调 / 双击复位"
            onPointerDown={onDividerPointerDown}
            onPointerMove={onDividerPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={onDividerKeyDown}
            onDoubleClick={() => store.reset()}
          />
          <div className="sv-pane-right" ref={rightRef}>
            <div className="sv-card">
              <div className="sv-card-media" aria-hidden="true" />
              <div>
                <h4>{active}</h4>
                <p>拖动分隔条:栏宽过了 280px 容器断点,这张卡会在横排/纵排之间翻转——分栏与容器查询联动。</p>
              </div>
            </div>
          </div>
        </div>
        <p className="sv-readout">
          <span>左栏 <strong>{Math.round(startSize)}%</strong></span>
          <span>下限 <strong>{minSize}%</strong></span>
          <span>右栏实测 <strong>{rightWidth}px</strong></span>
          <span aria-hidden="true">·</span>
          <span>方向键 ±{KEYBOARD_STEP}%(Shift ×3)/ Home·End 到夹紧极限 / 双击复位</span>
        </p>
        <p className="sv-hint">ARIA separator 语义取自 react-resizable-panels README(调研 05§8);卡内 280px 断点为演示基准值,未证实。</p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
