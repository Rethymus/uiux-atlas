import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage { --modal-width: 480px; }
.mdl-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.mdl-trigger {
  border: 1px solid transparent; border-radius: 6px; padding: 8px 18px;
  font-size: 13px; cursor: pointer; background: #1677ff; color: #fff;
}
.mdl-trigger:hover { background: #4096ff; }
.mdl-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
.mdl-overlay {
  position: absolute; inset: 0; z-index: 30;
  background: rgba(0, 0, 0, 0.45); /* antd colorBgMask */
  display: flex; justify-content: center; align-items: flex-start;
  padding: 56px 16px 24px;
  animation: mdl-fade 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.mdl-overlay[data-centered="on"] { align-items: center; }
.mdl-dialog {
  width: var(--modal-width); max-width: 100%;
  background: #fff; border-radius: 8px; /* antd borderRadiusLG */
  box-shadow: 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05);
  padding: 20px 24px;
  animation: mdl-zoom 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  outline: none;
}
.mdl-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.mdl-head h3 { margin: 0; font-size: 16px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.mdl-x {
  border: 0; background: transparent; padding: 2px 6px; cursor: pointer;
  font-size: 18px; line-height: 1; color: rgba(0, 0, 0, 0.45);
}
.mdl-x:hover { color: rgba(0, 0, 0, 0.88); }
.mdl-body { margin: 12px 0 20px; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); }
.mdl-foot { display: flex; justify-content: flex-end; gap: 10px; }
.mdl-btn { border: 1px solid transparent; border-radius: 6px; padding: 6px 16px; font-size: 13px; cursor: pointer; }
.mdl-btn-ghost { background: #fff; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
.mdl-btn-ghost:hover { color: #1677ff; border-color: #1677ff; }
.mdl-btn-primary { background: #1677ff; color: #fff; }
.mdl-btn-primary:hover { background: #4096ff; }
@keyframes mdl-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes mdl-zoom {
  from { opacity: 0; transform: scale(0.96) translateY(-6px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .mdl-overlay, .mdl-dialog { animation: none; }
}
`;

/**
 * 对话框演示(浮层实现于 DemoStage 内,相对定位 + z-index)。
 * width 为 CSS 变量型参数(经 DemoStage 注入);maskClosable / centered 为 JS 型
 * 参数——订阅 store 后驱动 data-centered 与遮罩点击行为。
 * 焦点管理遵循 APG Dialog:打开落焦点到对话框、Tab 困焦循环、Esc 关闭、
 * 关闭后焦点归还触发按钮(初始加载不抢焦点)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [maskClosable, setMaskClosable] = useState(() => store.get("maskClosable") === "on");
  const [centered, setCentered] = useState(() => store.get("centered") === "on");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setMaskClosable(store.get("maskClosable") === "on");
        setCentered(store.get("centered") === "on");
      }),
    [store],
  );

  // 打开时焦点落在对话框容器(APG:初始焦点进对话框)
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    // 关闭后焦点回触发元素(APG;仅经由关闭动作触发,初始加载不抢焦点)
    triggerRef.current?.focus();
  };

  const onOverlayKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    // 困焦循环:Tab/Shift+Tab 在对话框内首尾相接
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(
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
    if (e.shiftKey && (active === first || active === dialog)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onOverlayClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    // 仅当点击落在遮罩本身(而非对话框)且参数开启时关闭
    if (e.target === e.currentTarget && maskClosable) closeModal();
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="mdl-page">
        <button ref={triggerRef} type="button" className="mdl-trigger" onClick={() => setOpen(true)}>
          打开对话框 Open dialog
        </button>
        <p className="mdl-hint">
          Esc 关闭 · {maskClosable ? "点遮罩可关闭" : "点遮罩不关闭"} · Mask click{" "}
          {maskClosable ? "closes" : "ignored"}
        </p>
      </div>
      {open && (
        <div
          className="mdl-overlay"
          data-centered={centered ? "on" : "off"}
          onClick={onOverlayClick}
          onKeyDown={onOverlayKeyDown}
        >
          <div
            ref={dialogRef}
            className="mdl-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mdl-title"
            tabIndex={-1}
          >
            <div className="mdl-head">
              <h3 id="mdl-title">删除草稿 Delete draft</h3>
              <button type="button" className="mdl-x" aria-label="关闭 Close" onClick={closeModal}>
                ×
              </button>
            </div>
            <p className="mdl-body">
              删除后不可恢复。模态打开期间外部内容被遮罩隔离,Tab 循环困在框内。
              This action cannot be undone; focus is trapped inside while open.
            </p>
            <div className="mdl-foot">
              <button type="button" className="mdl-btn mdl-btn-ghost" onClick={closeModal}>
                取消 Cancel
              </button>
              <button type="button" className="mdl-btn mdl-btn-primary" onClick={closeModal}>
                删除 Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{css}</style>
    </DemoStage>
  );
}
