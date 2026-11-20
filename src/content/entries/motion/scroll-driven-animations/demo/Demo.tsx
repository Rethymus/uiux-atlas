import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** entry/exit/contain 这些 named range 仅对 view progress timeline 有定义(MDN animation-range) */
const VIEW_ONLY_RANGE = /^(entry|exit|contain)/;

const css = `
.sd-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; }
.sd-scroller {
  position: relative; flex: 1; min-height: 0; overflow-y: auto;
  border: 1px solid var(--border); border-radius: 12px; background: var(--surface);
  scrollbar-width: thin; overscroll-behavior: contain;
}
.sd-scroller:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sd-progress {
  position: sticky; top: 0; z-index: 2; height: 6px; margin: 8px 10px 0;
  border-radius: 999px; background: color-mix(in srgb, var(--border) 45%, transparent);
  overflow: hidden;
}
.sd-bar {
  height: 100%; border-radius: inherit;
  background: linear-gradient(90deg, oklch(0.62 0.16 250), oklch(0.72 0.16 165));
  transform: scaleX(0); transform-origin: 0 50%;
}
@supports (animation-timeline: scroll()) {
  .sd-bar {
    animation: sd-grow linear both;
    animation-timeline: scroll();   /* 最近的滚动容器;必须写在 animation 简写之后 */
    animation-duration: auto;
  }
}
@keyframes sd-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.sd-section { padding: 26px 22px 10px; font-size: 12px; color: var(--text-faint); line-height: 1.6; }
.sd-tall1 { min-height: 150px; }
.sd-tall2 { min-height: 170px; padding-bottom: 30px; }
.sd-card {
  margin: 12px 18px; padding: 16px 18px; border-radius: 12px;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, var(--surface)), var(--surface));
}
@supports (animation-timeline: view()) {
  .sd-card { animation: sd-reveal linear both; animation-duration: auto; }
}
@keyframes sd-reveal {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: none; }
}
.sd-scene[data-reduced="true"] .sd-card { animation: none !important; opacity: 1 !important; transform: none !important; }
.sd-card h3 { margin: 0 0 6px; font-size: 15px; font-weight: 650; }
.sd-card p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.sd-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); }
.sd-btn { border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px; font-size: 12px; cursor: pointer; background: var(--surface); color: inherit; }
.sd-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
.sd-chip-warn { color: oklch(0.65 0.15 70); }
`;

/**
 * 滚动驱动动画演示:
 * - 进度条:纯 CSS,固定 animation-timeline: scroll()(官方示例配方,scaleX 走合成器);
 * - reveal 卡片:timeline/range 两个参数由 demo 订阅 store 计算「实际生效值」后以内联样式写入
 *   (scroll() 模式下 entry/exit/contain 档被显式替换为 cover 全程——MDN:这些 named range
 *   仅对 view progress timeline 有定义——替换事实在读数条注明);
 * - @supports 不通过或 reduced-motion 时卡片始终可见(内容不被动画藏起来);进度条保留
 *   (滚动位置的信息映射)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [supported, setSupported] = useState<boolean | null>(null);
  const reduced = useReducedMotion() === true;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 订阅参数 → 计算实际生效的 timeline/range(含 scroll() 模式的显式替换)
  const readRaw = () => ({
    timeline: store.get("timeline") as string,
    rangeStart: store.get("rangeStart") as string,
    rangeEnd: store.get("rangeEnd") as string,
  });
  const [raw, setRaw] = useState(readRaw);
  useEffect(
    () =>
      store.subscribe(() => {
        setRaw(readRaw());
      }),
    [store],
  );
  const substitute = raw.timeline === "scroll()" && (VIEW_ONLY_RANGE.test(raw.rangeStart) || VIEW_ONLY_RANGE.test(raw.rangeEnd));
  const effective = {
    timeline: raw.timeline,
    rangeStart: substitute ? "cover 0%" : raw.rangeStart,
    rangeEnd: substitute ? "cover 100%" : raw.rangeEnd,
  };

  useEffect(() => {
    setSupported(typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("animation-timeline", "view()"));
  }, []);

  // 把生效值落到卡片(内联样式优先级高于样式表,动画名/时长来自 @supports 块)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("animation-timeline", effective.timeline);
    card.style.setProperty("animation-range", `${effective.rangeStart} ${effective.rangeEnd}`);
  }, [effective.timeline, effective.rangeStart, effective.rangeEnd]);

  const scrollToCard = () => {
    const s = scrollerRef.current;
    const c = cardRef.current;
    if (!s || !c) return;
    s.scrollTo({ top: Math.max(0, c.offsetTop - 44), behavior: reduced ? "auto" : "smooth" });
  };
  const scrollToTop = () => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sd-scene" data-reduced={reduced}>
        <div
          className="sd-scroller"
          ref={scrollerRef}
          tabIndex={0}
          role="region"
          aria-label="滚动驱动动画演示容器 scroll-driven animations demo container"
        >
          <div className="sd-progress"><div className="sd-bar" /></div>
          <p className="sd-section sd-tall1">
            向下滚动 / Scroll down —— 顶部进度条固定消费 scroll()(整条容器的滚动进度);
            中间的卡片消费 timeline/range 参数。
          </p>
          <div className="sd-card" ref={cardRef}>
            <h3>Reveal 卡片 Reveal Card</h3>
            <p>
              我的动画进度来自 {effective.timeline === "scroll()" ? "容器的滚动比例" : "我自己在滚动口里的可见进度"},
              区间 {effective.rangeStart} → {effective.rangeEnd}。
            </p>
          </div>
          <p className="sd-section sd-tall2">
            继续滚动观察卡片退出 / keep scrolling to watch the card leave —— view() 模式下反向滚动会回放揭示过程。
          </p>
        </div>
        <div className="sd-controls">
          <button type="button" className="sd-btn" onClick={scrollToCard}>滚到卡片 To card</button>
          <button type="button" className="sd-btn" onClick={scrollToTop}>回顶部 Top</button>
          <span className="sd-chip">timeline: {effective.timeline}</span>
          <span className="sd-chip">range: {effective.rangeStart} → {effective.rangeEnd}</span>
          {substitute && (
            <span className="sd-chip sd-chip-warn">
              scroll() 下 entry/exit/contain 仅 view() 有定义,已按 cover 全程处理 / substituted with full cover
            </span>
          )}
          {supported === false && <span className="sd-chip sd-chip-warn">本浏览器不支持,卡片静态直出 / unsupported, card static</span>}
          {reduced && <span className="sd-chip">reduced-motion: 卡片始终可见 / card always visible</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
