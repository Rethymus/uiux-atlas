import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage { --kn-ring-width: 3px; }
.kn-field { position: absolute; inset: 0; }
.kn-skip {
  position: absolute;
  left: 50%;
  top: 8px;
  translate: -50% -200%;
  z-index: 5;
  border: 0;
  border-radius: 9px;
  padding: 7px 16px;
  background: oklch(0.3 0.05 250);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: translate 0.15s ease;
}
.kn-skip:focus-visible { translate: -50% 0; }
.kn-scene {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 210px));
  padding: 16px 18px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.85);
  font-size: 13px;
}
.kn-scene h3 { margin: 0 0 10px; font-size: 14px; }
.kn-toolbar { display: flex; gap: 6px; }
.kn-tb-btn {
  border: 1px solid oklch(0.55 0 0 / 0.45);
  border-radius: 9px;
  padding: 6px 10px;
  background: oklch(0.96 0.005 250);
  font-size: 12.5px;
  cursor: pointer;
}
.kn-tb-btn[tabindex="-1"] { opacity: 0.72; }
.kn-tabbar { display: flex; gap: 4px; margin-bottom: 8px; }
.kn-tab {
  border: 1px solid oklch(0.55 0 0 / 0.45);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  padding: 5px 12px;
  background: oklch(0.94 0.005 250);
  font-size: 12.5px;
  cursor: pointer;
}
.kn-tab[aria-selected="true"] { background: oklch(0.55 0.13 250); color: #fff; font-weight: 650; }
.kn-panelbox { border: 1px solid oklch(0.55 0 0 / 0.45); border-radius: 0 8px 8px 8px; padding: 10px; min-height: 56px; font-size: 12px; }
/* strong 焦点环(仅 ring=strong 时) */
.kn-field[data-ring="strong"] .kn-tb-btn:focus-visible,
.kn-field[data-ring="strong"] .kn-tab:focus-visible,
.kn-field[data-ring="strong"] .kn-open:focus-visible,
.kn-field[data-ring="strong"] .kn-skip:focus-visible,
.kn-field[data-ring="strong"] .kn-dialog-btn:focus-visible,
.kn-field[data-ring="strong"] .kn-x:focus-visible {
  outline: var(--kn-ring-width) solid oklch(0.45 0.16 260);
  outline-offset: 2px;
}
.kn-open {
  margin-top: 12px;
  border: 0;
  border-radius: 9px;
  padding: 7px 14px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 12.5px;
  cursor: pointer;
}
/* dialog */
.kn-backdrop {
  position: absolute;
  inset: 0;
  background: oklch(0.2 0.02 260 / 0.45);
  display: grid;
  place-items: center;
  z-index: 4;
}
.kn-dialog {
  width: min(260px, 80%);
  padding: 16px;
  border-radius: 12px;
  background: oklch(0.99 0 0);
  font-size: 12.5px;
  box-shadow: 0 12px 40px oklch(0.2 0.02 260 / 0.4);
}
.kn-dialog h4 { margin: 0 0 8px; font-size: 13px; }
.kn-dialog-row { display: flex; gap: 6px; margin-top: 10px; }
.kn-dialog-btn,
.kn-x {
  border: 1px solid oklch(0.55 0 0 / 0.5);
  border-radius: 8px;
  padding: 5px 12px;
  background: oklch(0.97 0 0);
  font-size: 12px;
  cursor: pointer;
}
.kn-x { margin-left: auto; }
.kn-log {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 176px;
  max-height: calc(100% - 60px);
  overflow: auto;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 11px;
  line-height: 1.7;
}
.kn-log b { font-size: 12px; }
.kn-log ul { margin: 4px 0 0; padding: 0; list-style: none; font-variant-numeric: tabular-nums; }
.kn-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.kn-live {
  position: absolute;
  left: -9999px;
  width: 1px; height: 1px; overflow: hidden;
}
@media (max-width: 480px) {
  .kn-log { display: none; }
  .kn-scene { width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .kn-skip { transition: none; }
}
`;

interface LogEntry {
  key: string;
  effect: string;
}

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [scene, setScene] = useState(() => store.get("scene") as string);
  const [ring, setRing] = useState(() => store.get("ring") as string);
  const [roving, setRoving] = useState(0);
  const [tabSel, setTabSel] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const rovingRef = useRef(0);

  rovingRef.current = roving;

  useEffect(
    () =>
      store.subscribe(() => {
        setScene(store.get("scene") as string);
        setRing(store.get("ring") as string);
      }),
    [store],
  );

  const say = (key: string, effect: string) => {
    setLog((l) => [{ key, effect }, ...l].slice(0, 6));
    if (liveRef.current) liveRef.current.textContent = `${key}: ${effect}`;
  };

  // toolbar roving focus:方向键在 3 个按钮间移动
  const TOOLBAR = ["加粗 Bold", "斜体 Italic", "链接 Link"];
  const rove = (dir: 1 | -1) => {
    const next = (rovingRef.current + dir + TOOLBAR.length) % TOOLBAR.length;
    setRoving(next);
    say(dir > 0 ? "→" : "←", `焦点移动 focus → ${TOOLBAR[next]}`);
    requestAnimationFrame(() => {
      const el = document.getElementById(`kn-tb-${next}`);
      el?.focus();
    });
  };

  const onToolbarKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); rove(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); rove(-1); }
  };

  // tabs:方向键选择(面板预载 → 选中随焦点,07§35 的适用条件)
  const TABS = ["概览 Overview", "数据 Data", "设置 Settings"];
  const onTabsKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (tabSel + dir + TABS.length) % TABS.length;
      setTabSel(next);
      say(e.key, `选中并移动 focus → ${TABS[next]}`);
      requestAnimationFrame(() => document.getElementById(`kn-tab-${next}`)?.focus());
    }
  };

  // dialog:Tab 困焦(两个可聚焦元素循环)+ Esc 归还焦点
  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeDialog();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault(); // 双元素困焦:Tab/Shift+Tab 均停在对话框内
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusables || focusables.length < 2) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) (active === first ? last : first).focus();
      else (active === last ? first : last).focus();
    }
  };

  const openDialog = () => {
    setDialogOpen(true);
    say("Enter", "打开对话框 open · Tab 已困焦 trapped");
    requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    });
  };

  const closeDialog = () => {
    setDialogOpen(false);
    say("Esc", "关闭并归还焦点 focus returned → 触发按钮 opener");
    openerRef.current?.focus();
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="kn-field" data-ring={ring}>
        <button type="button" className="kn-skip" onClick={() => document.getElementById("kn-scene-main")?.focus()}>
          跳到主内容 Skip to main content
        </button>

        <div id="kn-scene-main" className="kn-scene" tabIndex={-1} onKeyDown={scene === "toolbar" ? onToolbarKey : scene === "tabs" ? onTabsKey : undefined}>
          {scene === "toolbar" && (
            <>
              <h3>工具栏 Toolbar(roving focus)</h3>
              <div className="kn-toolbar" role="toolbar" aria-label="格式工具栏 Format toolbar">
                {TOOLBAR.map((t, i) => (
                  <button
                    key={t}
                    id={`kn-tb-${i}`}
                    type="button"
                    className="kn-tb-btn"
                    tabIndex={i === roving ? 0 : -1}
                    onClick={() => { setRoving(i); say("Enter", `激活 activate → ${t}`); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, opacity: 0.65, margin: "8px 0 0" }}>Tab 只进一次,方向键在内部移动(07§35)。</p>
            </>
          )}

          {scene === "tabs" && (
            <>
              <h3>标签页 Tabs(选中随焦点)</h3>
              <div className="kn-tabbar" role="tablist" aria-label="示例标签 Sample tabs">
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    id={`kn-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={i === tabSel}
                    tabIndex={i === tabSel ? 0 : -1}
                    className="kn-tab"
                    onClick={() => { setTabSel(i); say("Enter", `激活 activate → ${t}`); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="kn-panelbox" role="tabpanel">
                面板已预载 → 方向键切换时选中随焦点;焦点环与选中填充是两种视觉(focus ≠ selection,07§35)。
              </div>
            </>
          )}

          {scene === "dialog" && (
            <>
              <h3>对话框 Dialog(困焦与归还)</h3>
              <p style={{ fontSize: 12, margin: "0 0 0" }}>
                打开对话框后:Tab 循环困焦、Esc 关闭、焦点自动回到「打开」按钮(07§36 键位表)。
              </p>
              <button ref={openerRef} type="button" className="kn-open" onClick={openDialog}>
                打开对话框 Open
              </button>
            </>
          )}
        </div>

        {dialogOpen && (
          <div className="kn-backdrop" onKeyDown={onDialogKey}>
            <div className="kn-dialog" role="dialog" aria-modal="true" aria-label="确认操作 Confirm" ref={dialogRef}>
              <h4>确认删除该项?</h4>
              <p style={{ margin: 0, opacity: 0.75 }}>此操作可撤销(演示)。</p>
              <div className="kn-dialog-row">
                <button type="button" className="kn-dialog-btn" onClick={closeDialog}>
                  确认 Confirm
                </button>
                <button type="button" className="kn-x" onClick={closeDialog}>
                  取消 Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <aside className="kn-log" aria-hidden="false">
          <b>按键日志 Key log</b>
          <ul>
            {log.length === 0 && <li style={{ opacity: 0.6 }}>用键盘试试… try the keyboard…</li>}
            {log.map((l, i) => (
              <li key={i}>
                <b>[{l.key}]</b> {l.effect}
              </li>
            ))}
          </ul>
        </aside>

        <span ref={liveRef} className="kn-live" aria-live="polite" />

        <p className="kn-hint">
          全程别碰鼠标:Tab、方向键、Enter、Esc 走完每个场景;切 ring=strong 看自定义焦点环。
          Ditch the mouse: Tab, arrows, Enter, Esc complete every scene; try ring=strong for the custom ring.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
