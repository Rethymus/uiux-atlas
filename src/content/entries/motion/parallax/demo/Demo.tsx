import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.px-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.px-scroller {
  position: relative; flex: 1; min-height: 0; overflow-y: auto;
  border: 1px solid var(--border); border-radius: 12px;
  background: var(--surface); scrollbar-width: thin; overscroll-behavior: contain;
}
.px-scroller:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.px-world { position: relative; height: 1500px; overflow: hidden; }

/* 三个装饰层:aria-hidden,不承载内容;乘数 1/2/3 对应远/中/近 */
.px-layer { position: absolute; left: 0; right: 0; pointer-events: none; }
.px-far {
  top: -40px; height: 560px;
  background:
    radial-gradient(38% 42% at 68% 30%, oklch(0.83 0.13 75 / 0.9), transparent 70%),
    radial-gradient(2px 2px at 20% 18%, oklch(0.85 0.05 250) 45%, transparent 55%),
    radial-gradient(2px 2px at 34% 34%, oklch(0.8 0.05 250) 45%, transparent 55%),
    radial-gradient(1.6px 1.6px at 52% 12%, oklch(0.85 0.05 260) 45%, transparent 55%),
    radial-gradient(2px 2px at 76% 52%, oklch(0.82 0.05 250) 45%, transparent 55%),
    radial-gradient(1.6px 1.6px at 88% 24%, oklch(0.8 0.05 260) 45%, transparent 55%),
    linear-gradient(180deg, oklch(0.28 0.06 265), oklch(0.36 0.07 280) 62%, transparent);
  --px-m: 1;
}
.px-mid {
  top: 420px; height: 620px;
  background:
    conic-gradient(from 240deg at 28% 100%, transparent 294deg, oklch(0.42 0.06 250) 294deg 300deg, transparent 300deg),
    conic-gradient(from 250deg at 58% 100%, transparent 285deg, oklch(0.45 0.05 240) 285deg 292deg, transparent 292deg),
    conic-gradient(from 245deg at 84% 100%, transparent 288deg, oklch(0.43 0.06 255) 288deg 296deg, transparent 296deg),
    linear-gradient(180deg, transparent, oklch(0.4 0.05 250 / 0.55) 30%, oklch(0.34 0.05 250));
  --px-m: 2;
}
.px-near {
  top: 900px; height: 620px;
  background:
    conic-gradient(from 250deg at 22% 100%, transparent 280deg, oklch(0.3 0.05 240) 280deg 290deg, transparent 290deg),
    conic-gradient(from 255deg at 66% 100%, transparent 284deg, oklch(0.32 0.05 235) 284deg 293deg, transparent 293deg),
    linear-gradient(180deg, transparent, oklch(0.27 0.04 240) 26%, oklch(0.23 0.03 240));
  --px-m: 3;
}
@supports (animation-timeline: scroll()) {
  .px-scene[data-mode="css"] .px-layer {
    animation: px-drift linear both;
    animation-timeline: scroll(nearest block); /* 必须写在 animation 简写之后 */
    animation-duration: auto;
  }
}
/* 位移 = (1 − min(rate×m, 1)) × 可滚动距离;层越远(p 越小)反向补偿越多 → 视口内移动越慢 */
@keyframes px-drift {
  from { transform: translateY(0); }
  to { transform: translateY(calc((1 - min(var(--par-rate, 0.3) * var(--px-m, 1), 1)) * var(--par-s, 900px))); }
}
.px-scene[data-reduced="true"] .px-layer { animation: none !important; transform: none !important; }

/* 内容层:1:1 随滚动,承载全部文字 */
.px-copy { position: relative; z-index: 1; padding: 480px 26px 0; display: flex; flex-direction: column; gap: 220px; }
.px-card {
  padding: 14px 16px; border-radius: 12px; max-width: 420px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.px-card h3 { margin: 0 0 5px; font-size: 14px; font-weight: 650; }
.px-card p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.px-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.px-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.px-chip-warn { color: oklch(0.65 0.15 70); }
.px-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
`;

const fmt = (n: number) => `${Math.round(n * 100)}%`;

/**
 * 视差滚动演示:
 * - rate 为 CSS 变量型(--par-rate);mode 为 JS 型(css / js 实现对照);
 * - css 模式:@supports + animation-timeline: scroll(nearest block),keyframes 按
 *   (1 − min(rate×m,1)) × --par-s 计算每层位移(--par-s 由 JS 量测可滚动距离后写入);
 * - js 模式:主线程 scroll 事件 + rAF 直写 transform(官方对照路径);css 不支持时自动落到 js;
 * - reduced-motion:直出静态分层(css/js 两条路径都停)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({ rate: store.get("rate") as number, mode: store.get("mode") as string });
  const [params, setParams] = useState(readParams);
  const [reduced, setReduced] = useState(false);
  const [cssSupported, setCssSupported] = useState<boolean | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setCssSupported(typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("animation-timeline", "scroll()"));
  }, []);

  // 量测可滚动距离 → --par-s(keyframes 的位移基数);resize 时重测
  useEffect(() => {
    const measure = () => {
      const s = scrollerRef.current;
      if (!s) return;
      const scrollable = Math.max(s.scrollHeight - s.clientHeight, 1);
      s.style.setProperty("--par-s", `${scrollable}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // js 模式(或 css 不支持):主线程 scroll 事件 + rAF 直写 transform
  const jsActive = params.mode === "js" || cssSupported === false;
  useEffect(() => {
    const s = scrollerRef.current;
    if (!s || !jsActive) {
      // 切回 css 模式时清掉 js 直写的内联 transform,避免残留
      layerRefs.current.forEach((el) => {
        if (el) el.style.transform = "";
      });
      return;
    }
    const layers = layerRefs.current;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const top = s.scrollTop;
        const scrollable = Math.max(s.scrollHeight - s.clientHeight, 1);
        const mults = [1, 2, 3];
        layers.forEach((el, i) => {
          if (!el) return;
          const p = Math.min(params.rate * mults[i], 1);
          el.style.transform = `translateY(${(1 - p) * top}px)`;
        });
      });
    };
    if (reduced) {
      layers.forEach((el) => el && (el.style.transform = ""));
      return;
    }
    onScroll();
    s.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      s.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [jsActive, params.rate, reduced]);

  const effectiveMode = jsActive ? "js" : "css";
  const pFar = params.rate;
  const pMid = Math.min(params.rate * 2, 1);
  const pNear = Math.min(params.rate * 3, 1);
  const noParallax = params.rate >= 1;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="px-scene" data-reduced={reduced} data-mode={effectiveMode}>
        <div className="px-scroller" ref={scrollerRef} tabIndex={0} role="region" aria-label="视差滚动演示容器 Parallax demo container">
          <div className="px-world">
            <div className="px-layer px-far" aria-hidden="true" ref={(el) => { layerRefs.current[0] = el; }} />
            <div className="px-layer px-mid" aria-hidden="true" ref={(el) => { layerRefs.current[1] = el; }} />
            <div className="px-layer px-near" aria-hidden="true" ref={(el) => { layerRefs.current[2] = el; }} />
            <div className="px-copy">
              <div className="px-card">
                <h3>远层 Far layer · {fmt(pFar)}</h3>
                <p>跟随比例 p = {params.rate}:滚动 100px 它只移动 {fmt(pFar)}——背景慢于前景,深度由此而来。0 时钉在视口 / The background trails the foreground; at 0 it is pinned to the viewport.</p>
              </div>
              <div className="px-card">
                <h3>中层 Mid layer · {fmt(pMid)}</h3>
                <p>速率按 p×2 推导封顶 1(演示分层)。滚动经过时注意它比远层「先走」/ Derived as p×2 capped at 1 (demo layering) — it outruns the far layer.</p>
              </div>
              <div className="px-card">
                <h3>内容层 Content · 100%</h3>
                <p>内容永远 1:1 随滚动、不参加视差——文字可读性优先 / Content always scrolls 1:1 and never joins the parallax — readability first. 滚到底部再回看顶部的星星 / Scroll to the bottom and look back at the stars.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-readout">
          <span className="px-chip">rate p = {params.rate}</span>
          <span className="px-chip">far {fmt(pFar)} · mid {fmt(pMid)} · near {fmt(pNear)}</span>
          <span className="px-chip">mode: {params.mode}{params.mode !== effectiveMode ? ` → ${effectiveMode}(兜底 fallback)` : ""}</span>
          {effectiveMode === "js" && cssSupported === true && params.mode === "js" && (
            <span className="px-chip px-chip-warn">JS 路径在主线程运行,与合成器滚动异步,快速滚动易掉帧 / JS path runs on the main thread and may jank</span>
          )}
          {cssSupported === false && (
            <span className="px-chip px-chip-warn">本浏览器不支持 scroll(),已自动落到 JS 兜底 / scroll() unsupported, JS fallback active</span>
          )}
          {noParallax && <span className="px-chip px-chip-warn">p = 1:全部层与内容同步,无视差 / all layers synced, no parallax</span>}
          {reduced && <span className="px-chip">reduced-motion: 静态分层直出 / static layers rendered</span>}
          <span className="px-chip px-chip-note">实现:animation-timeline: scroll()(声明式,可离主线程)vs scroll 事件 + rAF(主线程)/ declarative timeline vs main-thread scroll handler</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
