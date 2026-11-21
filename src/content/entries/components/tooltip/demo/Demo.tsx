import { useCallback, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Placement = "top" | "right" | "bottom" | "left";

interface TriggerDef {
  id: string;
  label: string;
  tip: string;
}

const TRIGGERS: TriggerDef[] = [
  { id: "save", label: "保存 Save", tip: "保存到草稿箱 Saves to drafts · ⌘S" },
  { id: "share", label: "分享 Share", tip: "生成只读链接 Creates a read-only link" },
  { id: "del", label: "删除 Delete", tip: "移入回收站 Moves to trash · 不可恢复 Irreversible" },
];

const css = `
.ttp-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
}
.ttp-row { display: flex; gap: 14px; }
.ttp-wrap { position: relative; display: inline-flex; }
.ttp-btn {
  border: 1px solid #d9d9d9; border-radius: 6px; padding: 7px 14px;
  font-size: 13px; cursor: pointer; background: #fff; color: rgba(0, 0, 0, 0.88);
}
.ttp-btn:hover, .ttp-btn:focus-visible { color: #1677ff; border-color: #1677ff; }
.ttp-pop {
  position: absolute; z-index: 40;
  padding: 6px 10px; border-radius: 4px;
  font-size: 12px; line-height: 1.5; white-space: nowrap;
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: opacity 0.1s cubic-bezier(0.215, 0.61, 0.355, 1), visibility 0s linear 0.1s;
}
.ttp-pop.is-shown {
  opacity: 1; visibility: visible;
  transition: opacity 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.ttp-pop[data-theme="dark"] { background: rgba(0, 0, 0, 0.85); color: #fff; }
.ttp-pop[data-theme="light"] {
  background: #fff; color: rgba(0, 0, 0, 0.88); border: 1px solid #d9d9d9;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05), 0 1px 6px -1px rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03);
}
.ttp-pop[data-placement="top"] { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.ttp-pop[data-placement="bottom"] { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.ttp-pop[data-placement="left"] { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.ttp-pop[data-placement="right"] { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
/* 箭头:45° 旋转小方块,background:inherit 随主题;浅色主题隐藏埋入侧描边防斜线 */
.ttp-pop[data-arrow="on"]::after {
  content: ""; position: absolute; width: 8px; height: 8px;
  transform: rotate(45deg); background: inherit;
}
.ttp-pop[data-arrow="on"][data-theme="light"]::after { border: 1px solid #d9d9d9; }
.ttp-pop[data-placement="top"][data-arrow="on"]::after { bottom: -4px; left: calc(50% - 4px); }
.ttp-pop[data-placement="top"][data-arrow="on"][data-theme="light"]::after { border-top: 0; border-left: 0; }
.ttp-pop[data-placement="bottom"][data-arrow="on"]::after { top: -4px; left: calc(50% - 4px); }
.ttp-pop[data-placement="bottom"][data-arrow="on"][data-theme="light"]::after { border-bottom: 0; border-right: 0; }
.ttp-pop[data-placement="left"][data-arrow="on"]::after { right: -4px; top: calc(50% - 4px); }
.ttp-pop[data-placement="left"][data-arrow="on"][data-theme="light"]::after { border-bottom: 0; border-left: 0; }
.ttp-pop[data-placement="right"][data-arrow="on"]::after { left: -4px; top: calc(50% - 4px); }
.ttp-pop[data-placement="right"][data-arrow="on"][data-theme="light"]::after { border-top: 0; border-right: 0; }
.ttp-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .ttp-pop { transition: none; }
}
`;

/**
 * 文字提示演示(浮层实现于 DemoStage 内:触发元素 wrapper 相对定位,
 * 气泡绝对定位纯 CSS 摆位,z-index 高于舞台内容)。
 * placement / theme / arrow 均为 JS 型参数——订阅 store 后驱动
 * data-placement / data-theme / data-arrow,改动即时生效。
 * 交互遵循 APG Tooltip:hover 与 focus 双触发、出现延迟 100ms(antd
 * mouseEnterDelay 默认 0.1s)、Esc 隐藏、气泡不进 Tab 序列。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [placement, setPlacement] = useState(() => store.get("placement") as Placement);
  const [theme, setTheme] = useState(() => store.get("theme") as string);
  const [arrow, setArrow] = useState(() => store.get("arrow") === "on");
  const [shown, setShown] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setPlacement(store.get("placement") as Placement);
        setTheme(store.get("theme") as string);
        setArrow(store.get("arrow") === "on");
      }),
    [store],
  );

  const show = useCallback((id: string) => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    // 100ms 出现延迟 = antd mouseEnterDelay 默认 0.1s,避免扫过闪烁
    timerRef.current = window.setTimeout(() => setShown(id), 100);
  }, []);

  const hide = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShown(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [hide]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ttp-page">
        <div className="ttp-row">
          {TRIGGERS.map((t) => (
            <span key={t.id} className="ttp-wrap">
              <button
                type="button"
                className="ttp-btn"
                aria-describedby={shown === t.id ? `ttp-${t.id}` : undefined}
                onMouseEnter={() => show(t.id)}
                onMouseLeave={hide}
                onFocus={() => show(t.id)}
                onBlur={hide}
              >
                {t.label}
              </button>
              <span
                id={`ttp-${t.id}`}
                role="tooltip"
                className={shown === t.id ? "ttp-pop is-shown" : "ttp-pop"}
                data-placement={placement}
                data-theme={theme}
                data-arrow={arrow ? "on" : "off"}
              >
                {t.tip}
              </span>
            </span>
          ))}
        </div>
        <p className="ttp-hint">
          hover 或 Tab 聚焦出提示,Esc 隐藏 · Hover or Tab to reveal, Esc hides
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
