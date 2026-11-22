import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const PAGE_ROWS = 14;
const LIST_ITEMS = 30;

const css = `
.so-stage { position: absolute; inset: 0; }
.so-outer {
  position: absolute; inset: 0; overflow-y: auto; overscroll-behavior: contain;
  padding: 34px 14px 54px;
  scrollbar-width: thin;
}
.so-outer[data-locked="true"] { overflow: hidden; }
.so-page { display: flex; flex-direction: column; gap: 6px; }
.so-row {
  padding: 9px 12px; border-radius: 9px; font-size: 12px; color: var(--text-dim);
  background: color-mix(in srgb, var(--border) 22%, transparent);
}
.so-modal {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  width: min(300px, calc(100% - 32px)); max-height: calc(100% - 90px);
  display: flex; flex-direction: column;
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.32);
  z-index: 5;
}
.so-modal-head {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px 8px; font-size: 13px; font-weight: 650;
}
.so-close {
  margin-left: auto; border: 1px solid var(--border); background: var(--surface);
  border-radius: 7px; padding: 3px 9px; font-size: 12px; cursor: pointer; color: var(--text);
}
.so-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.so-inner {
  overflow-y: auto; overscroll-behavior: var(--ob-inner, contain);
  padding: 0 8px 8px; scrollbar-width: thin; touch-action: pan-y;
  outline: none;
}
.so-inner:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.so-item { padding: 7px 8px; border-radius: 7px; font-size: 12px; color: var(--text); border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent); }
.so-bar {
  position: absolute; left: 10px; right: 10px; bottom: 10px; z-index: 6;
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  padding: 7px 10px; border-radius: 10px;
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  border: 1px solid var(--border);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  font-size: 12px; color: var(--text-dim); font-variant-numeric: tabular-nums;
}
.so-open {
  border: 1px solid transparent; border-radius: 999px; padding: 4px 14px;
  font-size: 12px; font-weight: 600; cursor: pointer; color: #fff;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.so-open:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.so-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.so-tag[data-hot="true"] { border-color: oklch(0.62 0.2 25); color: oklch(0.62 0.2 25); }
.so-hint { font-size: 11px; color: var(--text-faint); }
@media (max-width: 480px) {
  .so-outer { padding: 30px 10px 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .so-outer, .so-inner { scroll-behavior: auto; }
  .so-bar { -webkit-backdrop-filter: none; backdrop-filter: none; }
}
`;

/**
 * 滚动溢出行为演示:外层假页面 + 居中弹层(内层长列表)。
 * innerMode 为 CSS 变量型参数(--ob-inner 经 DemoStage 注入,直接被 .so-inner 消费);
 * lockPage 为 JS 型参数——订阅 store 切外层 data-locked(overflow:hidden 锁背景,MDN 官方做法)。
 * 穿透计数:弹层打开且指针悬于内层时,外层发生滚动即滚动链发生,计数 +1。
 * Esc 关闭弹层、焦点打开入弹层/关闭归还(WAI-APG Dialog 语义)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    innerMode: store.get("innerMode") as string,
    lockPage: store.get("lockPage") as string,
  });
  const [params, setParams] = useState(readParams);
  const [open, setOpen] = useState(true);
  const [chained, setChained] = useState(0);
  const openRef = useRef(open);
  openRef.current = open;

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const overInnerRef = useRef(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // 焦点管理:打开入弹层、关闭归还
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
    else openBtnRef.current?.focus();
  }, [open]);

  // 穿透检测:外层滚动 + 弹层开 + 指针在内层 → 滚动链发生
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const onScroll = () => {
      if (openRef.current && overInnerRef.current) setChained((c) => c + 1);
    };
    outer.addEventListener("scroll", onScroll, { passive: true });
    return () => outer.removeEventListener("scroll", onScroll);
  }, []);

  // Esc 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="so-stage">
        <div
          className="so-outer"
          ref={outerRef}
          data-locked={params.lockPage === "on" ? "true" : "false"}
        >
          <div className="so-page" aria-hidden="true">
            {Array.from({ length: PAGE_ROWS }, (_, i) => (
              <div key={i} className="so-row">
                背景页面第 {i + 1} 行 · background page row {i + 1}(滚动我试试)
              </div>
            ))}
          </div>
        </div>

        {open && (
          <div className="so-modal" role="dialog" aria-modal="true" aria-label="弹层内滚动区 overlay scroller">
            <div className="so-modal-head">
              <span>弹层 · 内层滚动区</span>
              <button
                type="button"
                className="so-close"
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
              >
                关闭 ✕
              </button>
            </div>
            <div
              className="so-inner"
              ref={innerRef}
              tabIndex={0}
              role="region"
              aria-label={`内层列表 overscroll-behavior: ${params.innerMode}`}
              onPointerEnter={() => {
                overInnerRef.current = true;
              }}
              onPointerLeave={() => {
                overInnerRef.current = false;
              }}
            >
              {Array.from({ length: LIST_ITEMS }, (_, i) => (
                <div key={i} className="so-item">
                  条目 {i + 1} · item {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="so-bar">
          <button
            type="button"
            className="so-open"
            ref={openBtnRef}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "关闭弹层 Close" : "打开弹层 Open"}
          </button>
          <span className="so-tag">inner: {params.innerMode}</span>
          <span className="so-tag">锁背景: {params.lockPage === "on" ? "on" : "off"}</span>
          <span className="so-tag" data-hot={chained > 0 ? "true" : "false"}>
            滚动链穿透 {chained} 次
          </span>
          <span className="so-hint">
            弹层开着时在内层滚到底:{params.innerMode === "auto" ? "会链出滚背景(auto)" : "被拦住(contain/none)"} /
            scroll the inner list to its end: chaining {params.innerMode === "auto" ? "happens (auto)" : "is blocked"}.
          </span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
