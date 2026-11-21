import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.im-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.im-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.im-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 14px;
  background: #ffffff;
  padding: 14px 18px 10px;
  cursor: pointer;
  color: rgba(15, 23, 42, 0.85);
}
.im-card:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.im-card[data-armed="false"] { opacity: 0.45; }
.im-card em { font-style: normal; font-size: 12px; color: rgba(0, 0, 0, 0.55); }

/* dash:常驻全绘(dashoffset 0),hover/focus/点击重放 1→0 */
.im-dash path { stroke-dasharray: 1; stroke-dashoffset: 0; }
.im-card[data-armed="true"]:hover .im-dash path,
.im-card[data-armed="true"]:focus-visible .im-dash path,
.im-card[data-play="dash"] .im-dash path {
  animation: im-draw var(--im-duration, 200ms) var(--im-easing, cubic-bezier(0.2, 0, 1, 1));
}
@keyframes im-draw {
  from { stroke-dashoffset: 1; }
}

/* rotate:≤90°,hover 进、离开回 */
.im-rot { transition: transform var(--im-duration, 200ms) var(--im-easing, cubic-bezier(0.2, 0, 1, 1)); }
.im-card[data-armed="true"]:hover .im-rot,
.im-card[data-armed="true"]:focus-visible .im-rot,
.im-card[data-play="rotate"] .im-rot { transform: rotate(90deg); }

/* fill:stroke 常驻可见,hover 点亮 fill-opacity(FILL 轴的 SVG 等效) */
.im-fill {
  fill: currentColor;
  fill-opacity: 0;
  transition: fill-opacity var(--im-duration, 200ms) var(--im-easing, cubic-bezier(0.2, 0, 1, 1));
}
.im-card[data-armed="true"]:hover .im-fill,
.im-card[data-armed="true"]:focus-visible .im-fill,
.im-card[data-play="fill"] .im-fill { fill-opacity: 1; }

/* 模拟 reduced-motion:与系统偏好同一待遇——动画禁用,终态直达 */
.im-scene[data-reduced="on"] .im-dash path { animation: none !important; }
.im-scene[data-reduced="on"] .im-rot,
.im-scene[data-reduced="on"] .im-fill { transition: none !important; }
/* 真实的系统偏好降级(MDN) */
@media (prefers-reduced-motion: reduce) {
  .im-dash path { animation: none !important; }
  .im-rot,
  .im-fill { transition: none !important; }
}

.im-reduced {
  border: 1px solid rgba(15, 23, 42, 0.18);
  background: #ffffff;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
}
.im-reduced[aria-pressed="true"] { background: rgba(15, 23, 42, 0.88); color: #ffffff; border-color: transparent; }
.im-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
  text-align: center;
}
.im-warn { color: #c2410c; }
.im-note {
  max-width: 470px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
`;

/** 自绘图形(非官方库拷贝):加号(dash 专用,pathLength=1 归一)/ 环形箭头 / 心形 */
const ARTS = {
  plus: (
    <>
      <circle cx="12" cy="12" r="8.25" pathLength={1} />
      <path d="M12 8.5v7M8.5 12h7" pathLength={1} />
    </>
  ),
  rotate: (
    <>
      <path d="M20 12a8 8 0 1 1-8-8c2.2 0 4.3.9 5.7 2.3L20 8.5" />
      <path d="M20 3.5v5h-5" />
    </>
  ),
  heart: (
    <path d="M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z" />
  ),
} as const;

const CARDS = [
  { id: "dash", zh: "描边绘制", en: "draw-in", art: "plus" },
  { id: "rotate", zh: "旋转 90°", en: "rotate", art: "rotate" },
  { id: "fill", zh: "填充点亮", en: "fill", art: "heart" },
] as const;

/**
 * 图标动效演示:effect 为 JS 型参数(选中技法卡片武装、其余降为静态);
 * duration / easing 为 CSS 变量型(--im-duration / --im-easing),驱动三招动效。
 * M3 官方锚值:200ms = duration.short4,150ms = short3,缓动 = easing.standard
 * cubic-bezier(0.2, 0, 1, 1)(07 §6.2);reduced-motion 直切终态(MDN,07 §6.3),
 * demo 额外提供「模拟 reduced-motion」开关;点击可触发(触屏无 hover、键盘走 focus-visible)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [effect, setEffect] = useState(() => store.get("effect") as string);
  const [duration, setDuration] = useState(() => store.get("duration") as number);
  const [easing, setEasing] = useState(() => store.get("easing") as [number, number, number, number]);
  const [reduced, setReduced] = useState(false);
  const [play, setPlay] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setEffect(store.get("effect") as string);
        setDuration(store.get("duration") as number);
        setEasing(store.get("easing") as [number, number, number, number]);
      }),
    [store],
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const trigger = (id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setPlay(id);
    timer.current = setTimeout(() => setPlay(null), duration + 60);
  };

  const easeStr = `cubic-bezier(${easing[0]}, ${easing[1]}, ${easing[2]}, ${easing[3]})`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="im-scene" data-reduced={reduced ? "on" : "off"}>
        <div className="im-row">
          {CARDS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="im-card"
              data-armed={effect === c.id}
              data-play={play === c.id ? c.id : undefined}
              onClick={() => trigger(c.id)}
              aria-label={`触发${c.zh}动效`}
            >
              <svg
                className={c.id === "dash" ? "im-dash" : c.id === "rotate" ? "im-rot" : "im-fill"}
                viewBox="0 0 24 24"
                width={40}
                height={40}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ARTS[c.art]}
              </svg>
              <em>{c.zh}</em>
            </button>
          ))}
        </div>
        <div className="im-readout" aria-live="polite">
          effect={effect} · duration={duration}ms · easing={easeStr}
          {duration > 250 ? (
            <span className="im-warn"> · 已进入 medium 转场档,hover 显迟钝(M3 钦定 150–200ms)</span>
          ) : (
            " · M3 钦定 hover 区间 150–200ms"
          )}
        </div>
        <button
          type="button"
          className="im-reduced"
          aria-pressed={reduced}
          onClick={() => setReduced((v) => !v)}
        >
          模拟 prefers-reduced-motion
        </button>
        <p className="im-note">
          hover 或聚焦武装卡即触发;触屏点卡片触发同一动效。开启模拟开关后动画禁用、hover
          直切终态——状态反馈保留、运动取消(MDN 降级策略)。卡上图形均为自绘示意。
          Hover or focus the armed card to play; touch users click. With the simulate switch on,
          motion disables and hover snaps to the end state — feedback kept, motion dropped.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
