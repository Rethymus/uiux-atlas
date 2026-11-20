import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema, NumberParam } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.cq-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.cq-playground { width: 100%; overflow-x: auto; padding: 2px 10px 2px 2px; }
.cq-slot { position: relative; width: var(--cq-width); max-width: 100%; }
.cq-box {
  width: 100%;
  container-type: inline-size;
  container-name: cq-card;
}
.cq-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, currentColor 6%, transparent);
}
.cq-banner {
  height: 64px;            /* 固定值回退在前 */
  height: 18cqw;           /* 容器单位覆盖在后:cqw = 容器宽度的 1% */
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(120deg, oklch(0.68 0.16 250 / 0.85), oklch(0.72 0.18 160 / 0.8));
  flex: none;
}
.cq-title {
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
  font-size: clamp(15px, 5.5cqi, 30px);  /* cqi = 1% 容器内联尺寸,clamp 保下限 */
}
.cq-body { margin: 0; font-size: 13px; line-height: 1.55; opacity: 0.78; }
.cq-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.cq-actions button {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
}
.cq-grip {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -12px;
  width: 14px;
  border: 0;
  padding: 0;
  cursor: ew-resize;
  touch-action: none;
  border-radius: 7px;
  background: linear-gradient(color-mix(in srgb, currentColor 14%, transparent), color-mix(in srgb, currentColor 28%, transparent));
}
.cq-grip::after {
  content: "";
  position: absolute;
  inset: 8px 5px;
  border-left: 1px dotted color-mix(in srgb, currentColor 55%, transparent);
  border-right: 1px dotted color-mix(in srgb, currentColor 55%, transparent);
}
.cq-grip:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.cq-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.cq-code {
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.6 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.cq-state-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.cq-state-compact { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.cq-state-wide { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.cq-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .cq-state-chip { transition: none; }
}
`;

/**
 * 容器查询演示:width 为 CSS 型参数(--cq-width → .cq-slot 宽度,手柄拖拽经
 * store.set 双向同步面板);breakpoint 为 JS 型参数——容器查询条件必须是字面量,
 * demo 订阅后重生成 @container (min-width: Npx) 规则。banner 与标题用 cqw/cqi,
 * 拖动手柄即可同时看到断点重排与容器单位伸缩。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [width, setWidth] = useState(() => store.get("width") as number);
  const [bp, setBp] = useState(() => store.get("breakpoint") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setWidth(store.get("width") as number);
        setBp(store.get("breakpoint") as number);
      }),
    [store],
  );

  const dragRef = useRef<{ startX: number; startW: number } | null>(null);
  // width 参数为 number 型,schema 联合类型需收窄后取 min/max
  const widthBounds = store.param("width") as NumberParam;

  const commitWidth = (n: number): void => {
    store.set("width", Math.min(widthBounds.max, Math.max(widthBounds.min, Math.round(n))));
  };

  const onGripPointerDown = (e: ReactPointerEvent<HTMLButtonElement>): void => {
    dragRef.current = { startX: e.clientX, startW: store.get("width") as number };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onGripPointerMove = (e: ReactPointerEvent<HTMLButtonElement>): void => {
    const d = dragRef.current;
    if (!d) return;
    commitWidth(d.startW + (e.clientX - d.startX));
  };
  const endDrag = (e: ReactPointerEvent<HTMLButtonElement>): void => {
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const onGripKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>): void => {
    const step = e.shiftKey ? 50 : 10;
    if (e.key === "ArrowLeft") commitWidth((store.get("width") as number) - step);
    else if (e.key === "ArrowRight") commitWidth((store.get("width") as number) + step);
    else return;
    e.preventDefault();
  };

  const isWide = width >= bp;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cq-wrap">
        <div className="cq-playground">
          <div className="cq-slot">
            <div className="cq-box">
              <div className="cq-card">
                <div className="cq-banner" role="img" aria-label="banner,高度 18cqw 随容器伸缩" />
                <div className="cq-col">
                  <p className="cq-title">自适应卡片 Adaptive Card</p>
                  <p className="cq-body">
                    拖右缘手柄改变容器宽度:跨过断点时纵排翻转为横排,banner 与标题随 cqw/cqi 伸缩。
                    Drag the right grip: past the breakpoint the card flips to a row, and the banner and headline scale with cqw/cqi.
                  </p>
                  <div className="cq-actions">
                    <button type="button">主操作 Action</button>
                    <button type="button">取消 Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="cq-grip"
              role="separator"
              aria-orientation="vertical"
              aria-label="拖拽调整容器宽度 Resize container width"
              aria-valuemin={widthBounds.min}
              aria-valuemax={widthBounds.max}
              aria-valuenow={width}
              onPointerDown={onGripPointerDown}
              onPointerMove={onGripPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onKeyDown={onGripKeyDown}
            />
          </div>
        </div>
        <div className="cq-readout" aria-live="polite">
          <span>width = {width}px</span>
          <span>breakpoint = {bp}px</span>
          <span className={`cq-state-chip ${isWide ? "cq-state-wide" : "cq-state-compact"}`}>
            {isWide ? "≥ 断点 → 横排 row" : "小于断点 → 纵排 stacked"}
          </span>
        </div>
        <pre className="cq-code" aria-label="生成的容器查询规则 generated container rule">
          {`@container cq-card (min-width: ${bp}px) { … }`}
        </pre>
        <p className="cq-hint">
          查询条件必须是字面量(不能用自定义属性),因此断点由 demo 订阅后重生成规则;容器宽度走 --cq-width 变量,与面板滑杆双向同步。
          Query conditions must be literals (no custom properties), so the breakpoint is regenerated by the demo; the width rides the --cq-width variable and syncs both ways with the panel slider.
        </p>
        <style>{css}</style>
        <style>{`
@container cq-card (min-width: ${bp}px) {
  .cq-card { flex-direction: row; align-items: stretch; }
  .cq-banner { width: 42cqi; height: auto; min-height: 110px; }
  .cq-col { flex: 1; min-width: 0; }
  .cq-title { font-size: clamp(17px, 7cqi, 30px); }
}
`}</style>
      </div>
    </DemoStage>
  );
}
