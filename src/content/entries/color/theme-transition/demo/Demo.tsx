import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { flushSync } from "react-dom";
import { getEntryStore, serializeParamValue } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 最小 startViewTransition 结构:经 unknown 断言,避免依赖特定 TS lib.dom 版本 */
interface VTDocumentLike {
  startViewTransition?: (updateCallback?: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<unknown>;
  };
}

type Theme = "light" | "dark";

const css = `
.tt-scene {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  justify-content: center; gap: 10px; padding: 20px; color-scheme: light dark;
  /* 亮侧:M3 官方基线 surface #FFFBFE / on-surface #1C1B1F / primary #6750A4(调研 06§7) */
  --tt-bg: oklch(0.992 0.006 334);
  --tt-fg: oklch(0.225 0.008 297);
  --tt-accent: #6750A4;
  --tt-on-accent: #FFFFFF;
  background-color: var(--tt-bg);
  color: var(--tt-fg);
  transition: none; /* 换肤交给快照动画,不做 CSS 过渡双保险 */
}
.tt-scene[data-theme="dark"] {
  /* 暗侧 accent/on-accent 用 M3 官方基线 #D0BCFF / #381E72(调研 06§7);表面为演示值 */
  --tt-bg: oklch(0.17 0.012 297);
  --tt-fg: oklch(0.92 0.01 297);
  --tt-accent: #D0BCFF;
  --tt-on-accent: #381E72;
}
.tt-card {
  border: 1px solid color-mix(in srgb, var(--tt-fg) 16%, transparent);
  border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column; gap: 8px;
}
.tt-card h3 { margin: 0; font-size: 15px; font-weight: 650; }
.tt-card p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.78; }
.tt-toggle {
  width: fit-content; border: 0; border-radius: 999px; padding: 7px 18px;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: var(--tt-accent); color: var(--tt-on-accent);
}
.tt-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; }
.tt-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); background: color-mix(in srgb, currentColor 8%, transparent); font-variant-numeric: tabular-nums; }
.tt-chip-warn { color: oklch(0.55 0.18 30); }

/* ::view-transition 伪元素树挂在 <html> 下,不继承 .demo-stage 的变量 → duration/easing 由 demo 镜像到 :root */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--tt-duration, 500ms);
  animation-timing-function: var(--tt-easing, cubic-bezier(0.42, 0, 1, 1));
}
/* circle 档:阻断默认交叉淡化(Chrome 文档写法,调研 11§8)——旧快照置底、新快照被 clip-path 圆揭开 */
html[data-tt-reveal="circle"]::view-transition-old(root),
html[data-tt-reveal="circle"]::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
`;

/**
 * 主题切换过渡演示:Chrome 官方圆形扩散配方(调研 11§8)。
 * - duration/easing:CSS 变量型参数,因 ::view-transition 伪元素树挂在 <html> 下而镜像到 documentElement(卸载清理);
 * - reveal:JS 型参数(circle/crossfade/direct);
 * - 换肤 = data-theme 翻转,在 startViewTransition 快照回调内 flushSync 同步完成;
 * - 降级链:无 API 直切 / prefers-reduced-motion 直切(matchMedia 监听)/ ready 异常不影响换肤。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    reveal: store.get("reveal") as string,
    duration: store.get("duration") as number,
    easing: store.get("easing") as [number, number, number, number],
  });
  const [params, setParams] = useState(readParams);
  const [theme, setTheme] = useState<Theme>("light");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const rootEl = useRef(document.documentElement);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  useEffect(() => {
    const docLike = document as unknown as VTDocumentLike;
    setSupported(typeof docLike.startViewTransition === "function");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  // duration/easing 镜像到 :root(伪元素树从 html 继承变量);卸载时清理避免残留全页
  useEffect(() => {
    const apply = () => {
      rootEl.current.style.setProperty("--tt-duration", serializeParamValue(store.param("duration"), store.get("duration")));
      rootEl.current.style.setProperty("--tt-easing", serializeParamValue(store.param("easing"), store.get("easing")));
    };
    apply();
    const unsub = store.subscribe(apply);
    return () => {
      unsub();
      rootEl.current.style.removeProperty("--tt-duration");
      rootEl.current.style.removeProperty("--tt-easing");
      delete rootEl.current.dataset.ttReveal;
    };
  }, [store]);

  // reveal 档位同步到 html 属性(伪元素选择器按属性分档);circle 档常驻属性,动画结束后也保留(下次直接可用)
  useEffect(() => {
    rootEl.current.dataset.ttReveal = params.reveal;
    return () => {
      delete rootEl.current.dataset.ttReveal;
    };
  }, [params.reveal]);

  const docLike = () => document as unknown as VTDocumentLike;
  const hardCut = params.reveal === "direct" || supported === false || reduced;

  const toggle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const apply = () => flushSync(() => setTheme(next));
    if (hardCut) {
      apply();
      return;
    }
    if (params.reveal === "crossfade") {
      void docLike().startViewTransition!(apply).finished.catch(() => undefined);
      return;
    }
    // circle:官方配方(调研 11§8)——从点击坐标扩散到视口最远角
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transition = docLike().startViewTransition!(apply);
    transition.ready
      .then(() => {
        rootEl.current.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: store.get("duration") as number,
            easing: serializeParamValue(store.param("easing"), store.get("easing")),
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => undefined);
  };

  const { reveal, duration } = params;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tt-scene" data-theme={theme}>
        <div className="tt-card">
          <h3>换肤舞台 Theme stage · {theme}</h3>
          <p>
            点下方按钮:换肤在快照回调内同步完成,圆形扩散只是快照表演。
            Hit the button: the swap commits inside the snapshot callback; the circle is a snapshot performance.
          </p>
          <button type="button" className="tt-toggle" onClick={toggle}>
            切到{theme === "light" ? "深色" : "浅色"} Switch to {theme === "light" ? "dark" : "light"}
          </button>
        </div>
        <div className="tt-meta">
          <span className="tt-chip">reveal: {reveal}</span>
          <span className="tt-chip">duration: {duration}ms</span>
          {supported === false && <span className="tt-chip tt-chip-warn">无 startViewTransition → 直切 / unsupported → hard cut</span>}
          {reduced && <span className="tt-chip">reduced-motion → 直切 / hard cut</span>}
          {reveal === "direct" && <span className="tt-chip">降级对照 / fallback control</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
