import { useEffect, useRef, useState } from "react";
import type {
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/* ---------- 日期与文案工具 ---------- */

const pad = (n: number) => String(n).padStart(2, "0");
const keyOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const sameDay = (a: Date | null, b: Date | null) => !!a && !!b && keyOf(a) === keyOf(b);

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** 星期表头(head)与完整读名(full):mon/sun 两种周起始 × zh/en 两语 */
const WEEKS = {
  "zh-mon": {
    head: ["一", "二", "三", "四", "五", "六", "日"],
    full: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
  },
  "zh-sun": {
    head: ["日", "一", "二", "三", "四", "五", "六"],
    full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  },
  "en-mon": {
    head: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    full: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
  "en-sun": {
    head: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
} as const;

const css = `
.dp-stage { --dp-cell-w: 30px; --dp-cell-h: 28px; position: relative; width: min(240px, calc(100% - 48px)); min-height: 296px; }
.dp-stage[data-size="sm"] { --dp-cell-w: 26px; --dp-cell-h: 24px; }
.dp-stage[data-size="lg"] { --dp-cell-w: 32px; --dp-cell-h: 30px; }
.dp-wrap { position: relative; }
.dp-trigger {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.dp-stage[data-size="sm"] .dp-trigger { height: 24px; font-size: 12px; padding: 0 8px; border-radius: 4px; }
.dp-stage[data-size="md"] .dp-trigger { height: 32px; font-size: 14px; padding: 0 12px; border-radius: 6px; }
.dp-stage[data-size="lg"] .dp-trigger { height: 40px; font-size: 16px; padding: 0 12px; border-radius: 6px; }
.dp-trigger:hover { border-color: #1677ff; }
.dp-trigger:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.dp-trigger[aria-expanded="true"] { border-color: #1677ff; box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent); }
.is-placeholder { color: rgba(0, 0, 0, 0.25); }
.dp-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  animation: dp-pop 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
@keyframes dp-pop {
  from { opacity: 0; translate: 0 -4px; }
  to { opacity: 1; translate: 0 0; }
}
.dp-head { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 6px; }
.dp-title { font-size: 13px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.dp-nav {
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
}
.dp-nav:hover { background: rgba(0, 0, 0, 0.04); color: rgba(0, 0, 0, 0.88); }
.dp-nav:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.dp-grid { border-collapse: collapse; }
.dp-grid th {
  width: var(--dp-cell-w);
  height: 24px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.dp-grid td { padding: 1px; text-align: center; }
.dp-cellbtn {
  width: var(--dp-cell-w);
  height: var(--dp-cell-h);
  border: 0;
  border-radius: 4px;
  padding: 0;
  background: transparent;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  font-size: 12px;
  display: grid;
  place-items: center;
}
.dp-stage[data-size="lg"] .dp-cellbtn { font-size: 13px; }
.dp-cellbtn:hover { background: rgba(0, 0, 0, 0.04); }
.dp-cellbtn:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.dp-cellbtn[aria-pressed="true"] { background: #1677ff; color: #fff; }
.dp-cellbtn[aria-pressed="true"]:hover { background: #4096ff; }
.dp-cellbtn.is-today { box-shadow: inset 0 0 0 1px #1677ff; }
.dp-cellbtn.is-today[aria-pressed="true"] { box-shadow: inset 0 0 0 1px #fff; }
.dp-foot { display: flex; justify-content: space-between; gap: 6px; margin-top: 6px; }
.dp-act {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  font-size: 12px;
  padding: 3px 10px;
  cursor: pointer;
}
.dp-act:hover { border-color: #1677ff; color: #1677ff; }
.dp-act:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.dp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .dp-trigger { transition: none; }
  .dp-panel { animation: none; }
}
`;

/**
 * 日期选择器演示(自绘简化实现,借 APG grid 模式的行列思想):
 * 触发器 + 月历浮层(role=grid/row/gridcell,日格为原生 button)。
 * firstDay / lang / size 为 JS 型参数——订阅 store 后重排网格或切文案;
 * 键盘:roving tabindex + 方向键 ±1/±7(仅月内,自绘简化)、Enter/Space 选中、
 * Esc 关闭并把焦点还给触发器;点击外部关闭;今天/清空(antd allowClear 默认 true)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [firstDay, setFirstDay] = useState(() => store.get("firstDay") as string);
  const [lang, setLang] = useState(() => store.get("lang") as string);
  const [size, setSize] = useState(() => store.get("size") as string);
  const [today] = useState(() => new Date());
  const [selected, setSelected] = useState<Date | null>(null);
  const [view, setView] = useState(() => ({ y: today.getFullYear(), m: today.getMonth() }));
  const [focused, setFocused] = useState<Date>(today);
  const [open, setOpen] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLTableElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setFirstDay(store.get("firstDay") as string);
        setLang(store.get("lang") as string);
        setSize(store.get("size") as string);
      }),
    [store],
  );

  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);

  const week = WEEKS[`${lang}-${firstDay}` as keyof typeof WEEKS];
  const offset = firstDay === "mon" ? (new Date(view.y, view.m, 1).getDay() + 6) % 7 : new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.y, view.m, i + 1)),
  ];

  const openPanel = () => {
    const base = selected ?? today;
    setView({ y: base.getFullYear(), m: base.getMonth() });
    setFocused(base);
    setOpen(true);
  };

  const closePanel = (refocus = false) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const pick = (d: Date) => {
    setSelected(d);
    setFocused(d);
    closePanel(true);
  };

  const pageMonth = (delta: number) => {
    const next = new Date(view.y, view.m + delta, 1);
    setView({ y: next.getFullYear(), m: next.getMonth() });
    setFocused(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const onWrapKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      closePanel(true);
    }
  };

  const onWrapBlur = (e: ReactFocusEvent<HTMLDivElement>) => {
    if (!open) return;
    const rel = e.relatedTarget as Node | null;
    if (!rel || !wrapRef.current?.contains(rel)) setOpen(false);
  };

  const onGridKeyDown = (e: ReactKeyboardEvent<HTMLTableElement>) => {
    const deltas: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    const delta = deltas[e.key];
    if (delta === undefined) return;
    e.preventDefault();
    const next = addDays(focused, delta);
    if (next.getFullYear() !== view.y || next.getMonth() !== view.m) return; // 自绘简化:方向键仅月内移动
    setFocused(next);
    gridRef.current?.querySelector<HTMLButtonElement>(`button[data-date="${keyOf(next)}"]`)?.focus();
  };

  const title = lang === "en" ? `${MONTHS_EN[view.m]} ${view.y}` : `${view.y}年${view.m + 1}月`;
  const formatDate = (d: Date) =>
    lang === "en" ? `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  // mon 起始表的 full 数组按显示序(周一…)排列,须由 getDay()(周日=0)换算列索引
  const dayIdx = (d: Date) => (firstDay === "mon" ? (d.getDay() + 6) % 7 : d.getDay());
  const fullLabel = (d: Date) =>
    lang === "en" ? `${week.full[dayIdx(d)]}, ${formatDate(d)}` : `${formatDate(d)} ${week.full[dayIdx(d)]}`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dp-stage" data-size={size} data-lang={lang} data-firstday={firstDay}>
        <div className="dp-wrap" ref={wrapRef} onKeyDown={onWrapKeyDown} onBlur={onWrapBlur}>
          <button
            type="button"
            ref={triggerRef}
            className="dp-trigger"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => (open ? closePanel() : openPanel())}
          >
            {selected ? (
              <span>{formatDate(selected)}</span>
            ) : (
              <span className="is-placeholder">请选择日期 Select date</span>
            )}
            <span aria-hidden="true">📅</span>
          </button>
          {open && (
            <div className="dp-panel" role="dialog" aria-label="选择日期 Choose a date">
              <div className="dp-head">
                <button type="button" className="dp-nav" aria-label="上一月 Previous month" onClick={() => pageMonth(-1)}>
                  ‹
                </button>
                <span className="dp-title">{title}</span>
                <button type="button" className="dp-nav" aria-label="下一月 Next month" onClick={() => pageMonth(1)}>
                  ›
                </button>
              </div>
              <table className="dp-grid" role="grid" aria-label={title} ref={gridRef} onKeyDown={onGridKeyDown}>
                <thead>
                  <tr>
                    {week.head.map((h, i) => (
                      <th key={h} role="columnheader" scope="col" aria-label={week.full[i]}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(cells.length / 7) }, (_, r) => (
                    <tr key={r} role="row">
                      {cells.slice(r * 7, r * 7 + 7).map((d, c) =>
                        d ? (
                          <td key={keyOf(d)} role="gridcell">
                            <button
                              type="button"
                              className={`dp-cellbtn${sameDay(d, today) ? " is-today" : ""}`}
                              data-date={keyOf(d)}
                              tabIndex={sameDay(d, focused) ? 0 : -1}
                              aria-pressed={sameDay(d, selected) ? true : undefined}
                              aria-current={sameDay(d, today) ? "date" : undefined}
                              aria-label={fullLabel(d)}
                              onClick={() => pick(d)}
                            >
                              {d.getDate()}
                            </button>
                          </td>
                        ) : (
                          <td key={`blank-${r}-${c}`} role="gridcell" />
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="dp-foot">
                <button
                  type="button"
                  className="dp-act"
                  onClick={() => {
                    setSelected(today);
                    setView({ y: today.getFullYear(), m: today.getMonth() });
                    setFocused(today);
                  }}
                >
                  {lang === "en" ? "Today" : "今天"}
                </button>
                <button
                  type="button"
                  className="dp-act"
                  onClick={() => setSelected(null)}
                >
                  {lang === "en" ? "Clear" : "清空"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{css}</style>
      <p className="dp-hint">键盘 Keyboard:←/→/↑/↓ 移动 · Enter 选中 · Esc 关闭 · 自绘简化实现</p>
    </DemoStage>
  );
}
