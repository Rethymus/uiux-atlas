import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Placement = "top" | "right" | "bottom" | "left";

const css = `
.demo-stage { --drawer-thickness: 378px; }
.drw-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.drw-trigger {
  border: 1px solid #d9d9d9; border-radius: 6px; padding: 8px 18px;
  font-size: 13px; cursor: pointer; background: #fff; color: rgba(0, 0, 0, 0.88);
}
.drw-trigger:hover { color: #1677ff; border-color: #1677ff; }
.drw-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
.drw-mask {
  position: absolute; inset: 0; z-index: 30;
  background: rgba(0, 0, 0, 0.45); /* antd colorBgMask */
  opacity: 0; pointer-events: none;
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.drw-mask.is-open { opacity: 1; pointer-events: auto; }
.drw-panel {
  position: absolute; z-index: 31;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05);
  display: flex; flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  outline: none;
}
.drw-panel[data-placement="right"] { top: 0; right: 0; bottom: 0; width: var(--drawer-thickness); transform: translateX(100%); }
.drw-panel[data-placement="left"] { top: 0; left: 0; bottom: 0; width: var(--drawer-thickness); transform: translateX(-100%); }
.drw-panel[data-placement="top"] { left: 0; right: 0; top: 0; height: var(--drawer-thickness); transform: translateY(-100%); }
.drw-panel[data-placement="bottom"] { left: 0; right: 0; bottom: 0; height: var(--drawer-thickness); transform: translateY(100%); }
.drw-panel[data-placement="right"].is-open,
.drw-panel[data-placement="left"].is-open,
.drw-panel[data-placement="top"].is-open,
.drw-panel[data-placement="bottom"].is-open { transform: translate(0, 0); }
.drw-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #f0f0f0; }
.drw-head h3 { margin: 0; font-size: 15px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.drw-x { border: 0; background: transparent; padding: 2px 6px; cursor: pointer; font-size: 17px; line-height: 1; color: rgba(0, 0, 0, 0.45); }
.drw-x:hover { color: rgba(0, 0, 0, 0.88); }
.drw-body { flex: 1; overflow: auto; padding: 16px 20px; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); }
.drw-body strong { color: rgba(0, 0, 0, 0.88); }
@media (prefers-reduced-motion: reduce) {
  .drw-panel { transition: none; }
  .drw-mask { transition: none; }
}
`;

/**
 * 抽屉演示(浮层实现于 DemoStage 内,相对定位 + z-index)。
 * thickness 为 CSS 变量型参数(左右抽屉=宽度、上下抽屉=高度);
 * placement / mask 为 JS 型参数——订阅 store 后驱动 data-placement、
 * 遮罩渲染与 aria-modal。transform 过渡滑入,reduced-motion 直达;
 * Esc 关闭,关闭后焦点归还触发按钮;mask=off 时非模态、不困焦。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [placement, setPlacement] = useState(() => store.get("placement") as Placement);
  const [mask, setMask] = useState(() => store.get("mask") === "on");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setPlacement(store.get("placement") as Placement);
        setMask(store.get("mask") === "on");
      }),
    [store],
  );

  // 打开时焦点进面板;页面初始加载不抢焦点
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== "Tab" || !mask) return; // mask=off:非模态,不困焦
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled"));
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0] as HTMLElement;
    const last = focusables[focusables.length - 1] as HTMLElement;
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panel)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="drw-page">
        <button ref={triggerRef} type="button" className="drw-trigger" onClick={() => setOpen(true)}>
          打开抽屉 Open drawer
        </button>
        <p className="drw-hint">
          Esc 关闭 · {mask ? "带遮罩(模态)" : "无遮罩(页面仍可交互)"} ·{" "}
          {mask ? "masked (modal)" : "no mask (page stays interactive)"}
        </p>
      </div>
      {mask && (
        <div
          className={open ? "drw-mask is-open" : "drw-mask"}
          onClick={close}
          aria-hidden="true"
        />
      )}
      <div
        ref={panelRef}
        className={open ? "drw-panel is-open" : "drw-panel"}
        data-placement={placement}
        role="dialog"
        aria-modal={mask ? "true" : "false"}
        aria-labelledby="drw-title"
        tabIndex={-1}
        onKeyDown={onPanelKeyDown}
      >
        <div className="drw-head">
          <h3 id="drw-title">编辑详情 Edit details</h3>
          <button type="button" className="drw-x" aria-label="关闭 Close" onClick={close}>
            ×
          </button>
        </div>
        <div className="drw-body">
          <p>
            抽屉在不离开当前页的前提下承载子任务:<strong>placement</strong> 决定滑入边缘,
            <strong>thickness</strong> 在左右抽屉上是宽度、上下抽屉上是高度。
            The drawer hosts subtasks in place: <strong>placement</strong> picks the edge, while
            <strong> thickness</strong> is width for left/right and height for top/bottom.
          </p>
          <p>
            {mask
              ? "遮罩开启时为模态:Tab 困焦在面板内。"
              : "遮罩关闭时为非模态:可以边看抽屉边操作页面。"}{" "}
            {mask ? "Modal: focus is trapped inside." : "Non-modal: interact with the page freely."}
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
