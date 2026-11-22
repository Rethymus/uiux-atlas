import { useEffect, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** antd Rate tooltips[] 语义:每档星级的文字标签(demo 文案) */
const LABELS = ["很差", "较差", "还行", "推荐", "超赞"];

const labelOf = (v: number) => {
  const i = Math.ceil(v) - 1;
  return i >= 0 && i < LABELS.length ? LABELS[i] : `${v} 星`;
};

const css = `
.rate-stage { width: min(420px, calc(100% - 48px)); display: grid; justify-items: center; gap: 10px; }
.rate-group { display: flex; gap: 4px; padding: 4px; }
.rate-star {
  position: relative;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 1;
  transition: scale 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.rate-star:hover { scale: 1.12; }
.rate-star > .rate-glyph {
  position: absolute;
  inset: 0;
  color: #d9d9d9;                            /* colorBorder 描边档 */
  pointer-events: none;
}
.rate-star > .rate-fill {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: var(--rate-active, #faad14);        /* gold #FAAD14 */
  pointer-events: none;
}
.rate-zone {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  cursor: pointer;
}
.rate-zone[data-half="left"] { right: 50%; }
.rate-zone[data-half="right"] { left: 50%; }
.rate-zone:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.rate-out { margin: 0; font-size: 13px; color: rgba(0, 0, 0, 0.65); min-height: 1.6em; text-align: center; }
.rate-out strong { color: rgba(0, 0, 0, 0.88); font-weight: 500; }
.rate-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .rate-star { transition: none; }
  .rate-star:hover { scale: 1; }
}
`;

/**
 * 评分演示:APG Rating Radio Group Example 骨架——
 * role=radiogroup + 每星(半星档每半区)role=radio[aria-checked],
 * 方向键漫游(roving tabindex)、Space/Enter 选中;
 * allowHalf 拆 0.5 档、allowClear 再点当前值清空(tooltip 文案用 title + 下方文字回显)。
 * count / allowHalf / allowClear 为 JS 型参数;activeColor 经 --rate-active 注入。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [count, setCount] = useState(() => store.get("count") as number);
  const [allowHalf, setAllowHalf] = useState(() => store.get("allowHalf") as string);
  const [allowClear, setAllowClear] = useState(() => store.get("allowClear") as string);

  const half = allowHalf === "on";
  /** radio 序列:半星档 0.5,1,1.5…;整星档 1,2,3… */
  const steps = half ? Array.from({ length: count * 2 }, (_, i) => (i + 1) / 2) : Array.from({ length: count }, (_, i) => i + 1);

  const [value, setValue] = useState(4);
  const [hoverVal, setHoverVal] = useState<number | null>(null);
  const [focusIdx, setFocusIdx] = useState(3);

  // count / 半星档变化时,把漫游焦点索引收拢回有效范围
  useEffect(() => {
    setFocusIdx((i) => Math.min(i, steps.length - 1));
  }, [steps.length]);

  useEffect(
    () =>
      store.subscribe(() => {
        const c = store.get("count") as number;
        setCount(c);
        setAllowHalf(store.get("allowHalf") as string);
        setAllowClear(store.get("allowClear") as string);
        setValue((v) => Math.min(v, c));
      }),
    [store],
  );

  const fillVal = hoverVal ?? value;

  const commit = (v: number) => {
    if (allowClear === "on" && value === v) setValue(0);
    else setValue(v);
  };

  const onGroupKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((i) => Math.min(i + 1, steps.length - 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      commit(steps[focusIdx]);
    }
  };

  const onZoneClick = (v: number, idx: number) => {
    setFocusIdx(idx);
    commit(v);
  };

  const shown = hoverVal ?? value;
  const caption =
    shown > 0
      ? hoverVal != null
        ? `预览 Preview:${shown} 星 · ${labelOf(shown)}`
        : `当前 Current:${shown} 星 · ${labelOf(shown)}${allowClear === "on" && value > 0 ? "(再点当前值可清空 Click again to clear)" : ""}`
      : "未评分 No rating";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="rate-stage">
        <div
          className="rate-group"
          role="radiogroup"
          aria-label="评分 Rate this"
          onKeyDown={onGroupKeyDown}
          onMouseLeave={() => setHoverVal(null)}
        >
          {Array.from({ length: count }, (_, s) => {
            const starVal = s + 1;
            const fill = fillVal >= starVal ? "full" : fillVal >= starVal - 0.5 ? "half" : "empty";
            return (
              <span key={s} className="rate-star">
                <span className="rate-glyph" aria-hidden="true">★</span>
                <span className="rate-fill" aria-hidden="true">
                  <span style={{ display: "block", width: fill === "full" ? "100%" : fill === "half" ? "50%" : "0" }}>★</span>
                </span>
                {half ? (
                  <>
                    <span
                      className="rate-zone"
                      data-half="left"
                      role="radio"
                      aria-checked={value === starVal - 0.5}
                      aria-label={`${starVal - 0.5} 星:${labelOf(starVal - 0.5)}`}
                      tabIndex={focusIdx === s * 2 ? 0 : -1}
                      title={`${starVal - 0.5} 星 ${labelOf(starVal - 0.5)}`}
                      onMouseEnter={() => setHoverVal(starVal - 0.5)}
                      onClick={() => onZoneClick(starVal - 0.5, s * 2)}
                    />
                    <span
                      className="rate-zone"
                      data-half="right"
                      role="radio"
                      aria-checked={value === starVal}
                      aria-label={`${starVal} 星:${labelOf(starVal)}`}
                      tabIndex={focusIdx === s * 2 + 1 ? 0 : -1}
                      title={`${starVal} 星 ${labelOf(starVal)}`}
                      onMouseEnter={() => setHoverVal(starVal)}
                      onClick={() => onZoneClick(starVal, s * 2 + 1)}
                    />
                  </>
                ) : (
                  <span
                    className="rate-zone"
                    role="radio"
                    aria-checked={value === starVal}
                    aria-label={`${starVal} 星:${labelOf(starVal)}`}
                    tabIndex={focusIdx === s ? 0 : -1}
                    title={`${starVal} 星 ${labelOf(starVal)}`}
                    onMouseEnter={() => setHoverVal(starVal)}
                    onClick={() => onZoneClick(starVal, s)}
                  />
                )}
              </span>
            );
          })}
        </div>
        <p className="rate-out" aria-live="polite">{caption}</p>
      </div>
      <style>{css}</style>
      <p className="rate-hint">键盘 Keyboard:←/→ 漫游 · Space/Enter 选中 · 悬停预览 · 再点当前值清空</p>
    </DemoStage>
  );
}
