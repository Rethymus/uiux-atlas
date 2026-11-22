import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface CardMeta {
  label: string;
  bg: string;
}

const CARDS: CardMeta[] = [
  { label: "山脉 Ridge", bg: "linear-gradient(160deg, oklch(0.62 0.1 250), oklch(0.42 0.09 262))" },
  { label: "森林 Forest", bg: "linear-gradient(160deg, oklch(0.66 0.12 165), oklch(0.44 0.1 172))" },
  { label: "沙漠 Desert", bg: "linear-gradient(160deg, oklch(0.72 0.12 70), oklch(0.52 0.12 55))" },
  { label: "极光 Aurora", bg: "linear-gradient(160deg, oklch(0.6 0.13 305), oklch(0.44 0.12 200))" },
  { label: "熔岩 Lava", bg: "linear-gradient(160deg, oklch(0.64 0.14 30), oklch(0.46 0.13 15))" },
  { label: "海洋 Ocean", bg: "linear-gradient(160deg, oklch(0.64 0.11 220), oklch(0.44 0.1 235))" },
  { label: "花田 Meadow", bg: "linear-gradient(160deg, oklch(0.7 0.12 120), oklch(0.5 0.11 140))" },
  { label: "夜空 Night", bg: "linear-gradient(160deg, oklch(0.5 0.09 275), oklch(0.34 0.07 285))" },
];

const css = `
.demo-stage {
  --snap-strict: mandatory;
  --snap-align: start;
  --snap-stop: always;
  --snap-padding: 16px;
}
.ss-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px 20px; overflow: hidden; }
.ss-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.ss-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.ss-btn:hover { border-color: var(--accent); color: var(--accent); }
.ss-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ss-rail {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 16px;                       /* 补研 12§4 片段同款 16px 槽距 */
  overflow-x: auto;
  overscroll-behavior-x: contain;  /* 防横滑链出页面(调研 10§8.1) */
  scroll-snap-type: x var(--snap-strict, mandatory);
  scroll-padding-inline: var(--snap-padding, 16px);
  padding-block: 4px;
  scrollbar-width: thin;
  border-radius: 12px;
}
.ss-rail:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ss-card {
  flex: 0 0 auto;
  width: min(230px, 68%);
  border: 0;
  border-radius: 14px;
  padding: 14px 16px;
  color: #fff;
  text-align: left;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  scroll-snap-align: var(--snap-align, start);
  scroll-snap-stop: var(--snap-stop, always);
  cursor: pointer;
}
.ss-card strong { font-size: 15px; }
.ss-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;

/**
 * 滚动吸附演示:横向卡片轨道,吸附参数全部为 CSS 型(参数面板直写 .demo-stage 变量)。
 * - strictness → scroll-snap-type: x var(--snap-strict);align → scroll-snap-align;stop → scroll-snap-stop;padding → scroll-padding-inline;
 * - 读数走双路径:支持 Level 2 scrollsnapchange 事件时直接监听(能力检测),否则 scroll+rAF 按步距近似计算当前吸附卡片(补研 12§4 的降级建议);
 * - prev/next 按一张卡的步距滚动;reduced-motion 时 behavior: auto 直达;
 * - 轨道 tabindex=0,键盘聚焦后方向键原生滚动可达。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [strictness, setStrictness] = useState(() => store.get("strictness") as string);
  const [align, setAlign] = useState(() => store.get("align") as string);
  const [stop, setStop] = useState(() => store.get("stop") as string);
  const [padding, setPadding] = useState(() => store.get("padding") as number);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);
  const [snapEventSupported, setSnapEventSupported] = useState<boolean | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setStrictness(store.get("strictness") as string);
        setAlign(store.get("align") as string);
        setStop(store.get("stop") as string);
        setPadding(store.get("padding") as number);
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    // Level 2 scrollsnapchange 事件能力检测(补研 12§4:较新,需降级处理)
    setSnapEventSupported("onsnapchange" in document.createElement("div"));
  }, []);

  // 当前吸附卡片:事件可用则用事件,否则 scroll + rAF 近似(步距 = 卡宽 + gap)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const compute = () => {
      const first = rail.firstElementChild as HTMLElement | null;
      if (!first) return;
      const styles = getComputedStyle(rail);
      const gap = parseFloat(styles.columnGap || "0") || 0;
      const padL = parseFloat(styles.scrollPaddingLeft || "0") || 0;
      const step = first.offsetWidth + gap;
      if (step <= 0) return;
      setIndex(Math.min(CARDS.length - 1, Math.max(0, Math.round((rail.scrollLeft + padL) / step))));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    const onSnapChange = () => compute();
    rail.addEventListener("scrollsnapchange", onSnapChange);
    return () => {
      rail.removeEventListener("scroll", onScroll);
      rail.removeEventListener("scrollsnapchange", onSnapChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const first = rail.firstElementChild as HTMLElement | null;
    if (!first) return;
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || "0") || 0;
    const step = first.offsetWidth + gap;
    rail.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ss-stage">
        <div className="ss-toolbar">
          <button type="button" className="ss-btn" onClick={() => go(-1)} aria-label="上一张 / previous card">
            ← 上一张 Prev
          </button>
          <button type="button" className="ss-btn" onClick={() => go(1)} aria-label="下一张 / next card">
            下一张 Next →
          </button>
          <span className="ss-chip" aria-live="polite">
            吸附卡片 {index + 1} / {CARDS.length}
          </span>
          <span className="ss-chip">
            {strictness} · {align} · stop: {stop} · padding {padding}px
          </span>
          {snapEventSupported !== null && (
            <span className="ss-chip">
              scrollsnapchange {snapEventSupported ? "可用 supported" : "不可用 → 滚动位置兜底 fallback"}
            </span>
          )}
          {reduced && <span className="ss-chip">reduced-motion: 滚动直达不平滑 / scrolls jump</span>}
        </div>
        <div
          className="ss-rail"
          ref={railRef}
          tabIndex={0}
          role="group"
          aria-label="吸附卡片轨道:左右滚动或使用按钮 / snapped card rail: scroll or use the buttons"
        >
          {CARDS.map((c, i) => (
            <div key={c.label} className="ss-card" style={{ background: c.bg }}>
              <strong>{`#${i + 1} ${c.label}`}</strong>
              <span>snap target / 吸附点</span>
            </div>
          ))}
        </div>
        <p className="ss-hint">
          拖动轨道或用按钮翻卡:mandatory 一卡一停(快甩也不越过),proximity 只在接近吸附点时拉一下;align 改变卡片停靠的对齐边,
          padding 内缩 snapport(吸顶头部留位)。demo 内容量已知才敢用 mandatory——MDN 警告内容超高时 mandatory 可能让人永远看不到某段内容 /
          drag the rail or step with the buttons: mandatory stops one card per swipe, proximity only pulls near snap points;
          align picks the docking edge, padding insets the snapport. mandatory is safe here only because the content amount is known.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
