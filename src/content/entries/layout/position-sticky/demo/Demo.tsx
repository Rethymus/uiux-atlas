import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const SECTIONS = [
  { id: "s1", title: "§1 概览 Overview", paras: 3 },
  { id: "s2", title: "§2 参数 Parameters", paras: 4 },
  { id: "s3", title: "§3 交互 Interaction", paras: 3 },
  { id: "s4", title: "§4 敏感度 Sensitivity", paras: 4 },
];

const css = `
.st-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.st-scroll {
  height: 300px;
  overflow-y: auto;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 12px;
  padding: 12px;
  overscroll-behavior: contain;
}
.st-trap { overflow: hidden; border-radius: 12px; }
.st-section { padding-bottom: 18px; }
.st-head {
  position: sticky;
  top: var(--sticky-top);
  margin: 0 0 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 30%, color-mix(in srgb, Canvas 88%, transparent));
  border: 1px solid color-mix(in srgb, oklch(0.66 0.13 250) 45%, transparent);
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
}
.st-head[data-stuck="true"] {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  background: color-mix(in srgb, oklch(0.66 0.13 250) 45%, color-mix(in srgb, Canvas 92%, transparent));
}
.st-section p { margin: 0 0 8px; font-size: 12.5px; line-height: 1.6; opacity: 0.75; }
.st-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.st-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.st-chip-stuck { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.st-chip-free { background: color-mix(in srgb, currentColor 10%, transparent); }
.st-chip-warn { background: color-mix(in srgb, oklch(0.68 0.16 45) 30%, transparent); }
.st-btn {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
}
.st-btn:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.st-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .st-head { transition: none; }
  .st-chip { transition: none; }
}
`;

/**
 * 粘性布局演示:top 为 CSS 型参数(--sticky-top 注入吸顶阈值);trap 为 JS 型参数——
 * 开启时在滚动内容外包一层 overflow: hidden 祖先,sticky 因「最近滚动祖先」被劫持而
 * 失效。吸顶状态由真实滚动监听驱动(标题矩形与容器顶部距离 ≤ 阈值即 stuck)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [top, setTop] = useState(() => store.get("top") as number);
  const [trap, setTrap] = useState(() => store.get("trap") as string);
  const [scrollTop, setScrollTop] = useState(0);
  const [stuck, setStuck] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setTop(store.get("top") as number);
        setTrap(store.get("trap") as string);
      }),
    [store],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => {
      setScrollTop(Math.round(el.scrollTop));
      const head = headRef.current;
      if (!head) return;
      const contRect = el.getBoundingClientRect();
      const headRect = head.getBoundingClientRect();
      setStuck(headRect.top - contRect.top <= top + 1);
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    return () => el.removeEventListener("scroll", measure);
  }, [top, trap]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="st-wrap">
        <div ref={scrollRef} className="st-scroll">
          {/* 陷阱档:滚动内容与吸顶标题之间插入 overflow: hidden 祖先 */}
          <div className={trap === "on" ? "st-trap" : undefined}>
            {SECTIONS.map((s, i) => (
              <section className="st-section" key={s.id}>
                <h4 className="st-head" data-stuck={i === 0 && stuck && trap === "off" ? "true" : "false"} ref={i === 0 ? headRef : undefined}>
                  {s.title}
                </h4>
                {Array.from({ length: s.paras }, (_, k) => (
                  <p key={k}>
                    {trap === "on"
                      ? "陷阱档:祖先 overflow: hidden 劫持了 sticky,标题随内容滚走。Trap mode: an overflow: hidden ancestor hijacks sticky — headers scroll away."
                      : "随容器滚动的内容块;当前组的标题在阈值处停留。Scrolling content; the current group's header parks at the threshold."}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
        <div className="st-readout" aria-live="polite">
          <span>top = {top}px</span>
          <span>scrollTop = {scrollTop}px</span>
          <span className={`st-chip ${trap === "on" ? "st-chip-warn" : stuck ? "st-chip-stuck" : "st-chip-free"}`}>
            {trap === "on"
              ? "sticky 失效 · 最近滚动祖先被劫持"
              : stuck
                ? "已吸顶 stuck(§1 标题停在阈值处)"
                : "未吸顶 · 随流滚动"}
          </span>
          <button
            type="button"
            className="st-btn"
            onClick={() => scrollRef.current?.scrollTo({ top: 0 })}
          >
            回到顶部 Top
          </button>
        </div>
        <p className="st-hint">
          {trap === "on"
            ? "陷阱原理:sticky 只对『最近滚动祖先』生效——中间任何 overflow 非 visible 的祖先都会成为它认错的滚动容器,吸顶随之失效。这不是兼容性 bug,是结构问题;外层滚动容器仍在滚,标题却跟内容一起走。"
            : "拖动 top 滑杆改变吸顶阈值:0px 贴住容器顶(全局导航方向),20px 留出呼吸位,调大后标题停在更低处、露出更多上一组内容。"}
          {trap === "on"
            ? " Why: sticky answers only to its 'nearest scrolling ancestor' — any intermediate ancestor with non-visible overflow becomes a mistaken scroll container and kills sticking. Not a compatibility bug; a structure problem."
            : " Drag the top slider to retune the threshold: 0px hugs the container top (global-nav territory), 20px leaves breathing room, larger values park headers lower."}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
