import { Fragment, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface Action {
  key: string;
  zh: string;
  en: string;
  danger?: boolean;
  dividerBefore?: boolean;
}

/** 操作列表:危险项「删除」用分隔线隔开并标红(antd colorError #ff4d4f) */
const ACTIONS: Action[] = [
  { key: "rename", zh: "重命名", en: "Rename" },
  { key: "move", zh: "移动到…", en: "Move to…" },
  { key: "copy", zh: "复制链接", en: "Copy link" },
  { key: "delete", zh: "删除", en: "Delete", danger: true, dividerBefore: true },
];

/** antd Menu subMenuCloseDelay 官方默认 0.1s(hover 收起延时,06-antdesign.md §4.19) */
const CLOSE_DELAY_MS = 100;

const css = `
.dd-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.dd-frame {
  width: min(560px, 100%);
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  padding: 18px 20px 16px;
  animation: dd-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.dd-row { display: flex; align-items: center; gap: 12px; }
.dd-file-icon {
  width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
  background: #e6f4ff; color: #1677ff;
  display: flex; align-items: center; justify-content: center; font-size: 15px;
}
.dd-file-meta { min-width: 0; flex: 1; }
.dd-file-name { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dd-file-sub { font-size: 12px; color: rgba(0, 0, 0, 0.45); margin-top: 2px; }
.dd-anchor { position: relative; display: inline-block; flex-shrink: 0; }
.dd-btn {
  display: inline-flex; align-items: center; gap: 6px;
  height: 32px; padding: 0 14px; /* antd controlHeight 32(§2.2) */
  border: 1px solid #d9d9d9; border-radius: 6px; background: #fff;
  font-size: 14px; font-family: inherit; color: inherit; cursor: pointer;
}
.dd-btn:hover { color: #1677ff; border-color: #1677ff; }
.dd-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.dd-btn[aria-expanded="true"] { color: #1677ff; border-color: #1677ff; background: #e6f4ff; }
.dd-caret {
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-top: 5px solid currentColor; opacity: 0.55;
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.dd-btn[aria-expanded="true"] .dd-caret { transform: rotate(180deg); }
.dd-menu {
  position: absolute; z-index: 1000; /* antd zIndexPopupBase(§2.2) */
  min-width: 168px; margin: 0; padding: 4px; list-style: none;
  background: #fff; border-radius: 8px; /* colorBgElevated + borderRadiusLG */
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  visibility: hidden; opacity: 0;
}
.dd-anchor[data-placement="bottomLeft"] .dd-menu { top: calc(100% + 8px); left: 0; }
.dd-anchor[data-placement="bottomRight"] .dd-menu { top: calc(100% + 8px); right: 0; }
.dd-anchor[data-placement="topLeft"] .dd-menu { bottom: calc(100% + 8px); left: 0; }
.dd-anchor[data-placement="topRight"] .dd-menu { bottom: calc(100% + 8px); right: 0; }
.dd-anchor[data-placement^="bottom"] .dd-menu { transform: translateY(-4px); }
.dd-anchor[data-placement^="top"] .dd-menu { transform: translateY(4px); }
.dd-menu[data-open] { visibility: visible; opacity: 1; transform: none; }
.dd-menu[data-open] {
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.dd-item {
  display: block; width: 100%; text-align: left; padding: 7px 12px;
  font-size: 14px; font-family: inherit; color: inherit;
  background: transparent; border: 0; border-radius: 6px; cursor: pointer;
}
.dd-item:hover { background: rgba(0, 0, 0, 0.04); } /* 4% 中性填充(FillTertiary 分档) */
.dd-item:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; background: rgba(0, 0, 0, 0.04); }
.dd-item[data-danger="true"] { color: #ff4d4f; } /* antd colorError(§2.2) */
.dd-sep { height: 1px; margin: 4px 8px; background: #f0f0f0; }
.dd-arrow {
  position: absolute; width: 10px; height: 10px; background: #fff;
  box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.04);
}
.dd-anchor[data-placement^="bottom"] .dd-arrow { top: -5px; transform: rotate(45deg); }
.dd-anchor[data-placement="bottomLeft"] .dd-arrow { left: 20px; }
.dd-anchor[data-placement="bottomRight"] .dd-arrow { right: 20px; }
.dd-anchor[data-placement^="top"] .dd-arrow { bottom: -5px; transform: rotate(225deg); }
.dd-anchor[data-placement="topLeft"] .dd-arrow { left: 20px; }
.dd-anchor[data-placement="topRight"] .dd-arrow { right: 20px; }
.dd-menu[data-arrow="off"] .dd-arrow { display: none; }
.dd-status {
  margin-top: 14px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(0, 0, 0, 0.65);
  background: #e6f4ff; border-radius: 999px; padding: 3px 12px;
}
.dd-status strong { color: #1677ff; font-weight: 600; }
@keyframes dd-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .dd-frame { animation: none; }
  .dd-menu, .dd-caret { transition: none; }
}
`;

/**
 * 下拉菜单演示:按钮触发的操作列表(与 tooltip 的区别——承载可执行动作)。
 * trigger / placement / arrow 均为 JS 型参数(订阅 store),默认值与 antd Dropdown
 * 官方默认逐一对齐(hover / bottomLeft / arrow=false);浮层为相对定位实现于
 * DemoStage 内,APG menu-button 语义:aria-haspopup/aria-expanded、Enter/Space
 * 打开并聚焦首项、方向键漫游、Esc 关闭焦点回触发钮、点击外部关闭。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [triggerOpt, setTriggerOpt] = useState(() => store.get("trigger") as string);
  const [placement, setPlacement] = useState(() => store.get("placement") as string);
  const [arrow, setArrow] = useState(() => store.get("arrow") as string);
  const [open, setOpen] = useState(false);
  const [wantFocus, setWantFocus] = useState(false);
  const [action, setAction] = useState("");
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(
    () =>
      store.subscribe(() => {
        setTriggerOpt(store.get("trigger") as string);
        setPlacement(store.get("placement") as string);
        setArrow(store.get("arrow") as string);
      }),
    [store],
  );

  const clearTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = (viaKeyboard = false) => {
    clearTimer();
    setWantFocus(viaKeyboard);
    setOpen(true);
  };
  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const closeNow = (refocus = false) => {
    clearTimer();
    setOpen(false);
    if (refocus) btnRef.current?.focus();
  };

  // trigger 参数切换时收起,避免状态残留
  useEffect(() => {
    clearTimer();
    setOpen(false);
  }, [triggerOpt]);

  // 键盘打开(APG:Enter/Space 打开并把焦点放进首项)
  useEffect(() => {
    if (open && wantFocus) {
      setWantFocus(false);
      itemRefs.current[ACTIONS[0].key]?.focus();
    }
  }, [open, wantFocus]);

  // 点击浮层与触发钮之外关闭
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeNow();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (a: Action) => {
    setAction(a.zh);
    closeNow(true);
  };

  const onTriggerClick = (e: React.MouseEvent) => {
    // e.detail === 0 表示键盘激活(Enter/Space)
    if (triggerOpt === "click") {
      if (open) closeNow();
      else openNow(e.detail === 0);
    } else {
      // hover 模式保留点击/键盘等价路径(触屏与键盘用户)
      openNow(e.detail === 0);
    }
  };

  const menuKeyDown = (e: React.KeyboardEvent) => {
    const keys = ACTIONS.map((a) => a.key);
    const cur = keys.indexOf(document.activeElement?.getAttribute("data-dd-key") ?? "");
    let next = -1;
    if (e.key === "ArrowDown") next = (cur + 1) % keys.length;
    else if (e.key === "ArrowUp") next = (cur - 1 + keys.length) % keys.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = keys.length - 1;
    if (next >= 0) {
      e.preventDefault();
      itemRefs.current[keys[next]]?.focus();
    }
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dd-scene">
        <div className="dd-frame">
          <div className="dd-row">
            <span className="dd-file-icon" aria-hidden="true">
              PDF
            </span>
            <div className="dd-file-meta">
              <div className="dd-file-name">Q4 季度报告.pdf</div>
              <div className="dd-file-sub">2.4 MB · 2026-11-18 更新 Updated</div>
            </div>
            <div
              ref={wrapRef}
              className="dd-anchor"
              data-placement={placement}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeNow(true);
                else if (e.key === "Tab" && open) closeNow(false);
              }}
              {...(triggerOpt === "hover"
                ? { onMouseEnter: () => openNow(), onMouseLeave: scheduleClose }
                : {})}
            >
              <button
                ref={btnRef}
                type="button"
                className="dd-btn"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="dd-menu"
                onClick={onTriggerClick}
              >
                更多操作 More
                <span className="dd-caret" aria-hidden="true" />
              </button>
              <ul
                role="menu"
                id="dd-menu"
                aria-label="更多操作 More actions"
                className="dd-menu"
                data-open={open ? "" : undefined}
                data-arrow={arrow}
                onKeyDown={menuKeyDown}
              >
                {arrow === "on" && (
                  <li role="presentation" aria-hidden="true">
                    <span className="dd-arrow" />
                  </li>
                )}
                {ACTIONS.map((a) => (
                  <Fragment key={a.key}>
                    {a.dividerBefore && <li role="separator" className="dd-sep" />}
                    <li role="none">
                      <button
                        ref={(el) => {
                          itemRefs.current[a.key] = el;
                        }}
                        type="button"
                        role="menuitem"
                        tabIndex={-1}
                        className="dd-item"
                        data-dd-key={a.key}
                        data-danger={a.danger ? "true" : undefined}
                        title={a.en}
                        onClick={() => pick(a)}
                      >
                        {a.zh}
                      </button>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
          <span className="dd-status">
            {action ? (
              <>
                最近操作 Last action:<strong>{action}</strong>
              </>
            ) : (
              <>
                悬停或点按「更多操作」展开命令列表(↑↓ 漫游,Esc 关闭)Hover/press “More”, ↑↓ rove, Esc closes
              </>
            )}
          </span>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
