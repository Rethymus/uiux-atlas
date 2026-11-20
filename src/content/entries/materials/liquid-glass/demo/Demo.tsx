import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "alps" | "nebula";

const BACKDROPS: { id: Backdrop; zh: string; en: string }[] = [
  { id: "alps", zh: "雪山", en: "Alps photo" },
  { id: "nebula", zh: "星空", en: "Nebula photo" },
];

/** 折射(SVG feDisplacementMap)仅 Chromium 生效;演示用简单 UA 探测,其余环境回退纯模糊 */
function detectChromium(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Chrom(e|ium)|Edg\//.test(navigator.userAgent) && !/Firefox|FxiOS/.test(navigator.userAgent);
}

const css = `
.demo-stage {
  --lg-dimming: 35%;
  --lg-blur: 20px;
  --lg-tint: 0%;
}
.lg-scene { position: absolute; inset: 0; overflow: hidden; }
.lg-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
/* 『活体内容』:漂移色斑 + 彩色大字,只动 transform,供玻璃舱每帧采样 */
.lg-blob { position: absolute; width: 46%; aspect-ratio: 1; border-radius: 50%; filter: blur(46px); }
.lg-blob-a { left: -6%; top: 8%; background: radial-gradient(circle at 40% 40%, oklch(0.75 0.18 320 / 0.95), transparent 70%); }
.lg-blob-b { right: -8%; bottom: 4%; background: radial-gradient(circle at 60% 60%, oklch(0.72 0.16 190 / 0.9), transparent 70%); }
.lg-scene[data-playing="true"] .lg-blob-a { animation: lg-drift-a 14s ease-in-out infinite alternate; }
.lg-scene[data-playing="true"] .lg-blob-b { animation: lg-drift-b 17s ease-in-out infinite alternate; }
.lg-word {
  position: absolute; left: 10%; top: 18%; margin: 0;
  font-size: clamp(40px, 8cqw, 84px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.05;
  background: linear-gradient(94deg, oklch(0.86 0.15 300), oklch(0.83 0.17 200) 60%, oklch(0.9 0.14 90));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.lg-word small { display: block; font-size: 0.3em; letter-spacing: 0.32em; color: rgb(255 255 255 / 0.8); -webkit-text-fill-color: rgb(255 255 255 / 0.8); }
/* 玻璃舱:官方默认形状 Capsule + 1px 内侧高光 */
.lg-pod {
  position: absolute; left: 50%; top: 58%; translate: -50% -50%;
  display: flex; gap: 4px; align-items: center; padding: 8px 10px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.08);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55), 0 10px 30px rgb(0 0 0 / 0.28);
  -webkit-backdrop-filter: blur(var(--lg-blur));
  backdrop-filter: blur(var(--lg-blur));
  color: #10131c;
  animation: lg-in 0.5s ease-out both;
}
/* 折射:SVG feDisplacementMap,仅 Chromium 启用(demo 以 UA 探测控制该规则生效) */
.lg-scene[data-refraction="on"] .lg-pod {
  -webkit-backdrop-filter: url(#lg-refraction-filter) blur(var(--lg-blur));
  backdrop-filter: url(#lg-refraction-filter) blur(var(--lg-blur));
}
/* 状态层:dimming 不透明度由 --lg-dimming 驱动(默认 35%,HIG 对 clear 的建议) */
.lg-veil {
  position: absolute; inset: 0; border-radius: inherit;
  opacity: var(--lg-dimming); transition: opacity 0.25s ease;
}
.lg-scene[data-variant="regular"] .lg-veil { background: rgb(255 255 255 / 0.92); }
.lg-scene[data-variant="clear"] .lg-veil { background: rgb(8 10 18 / 0.92); }
.lg-tintlayer { position: absolute; inset: 0; border-radius: inherit; background: rgb(64 96 255 / 0.85); opacity: var(--lg-tint); transition: opacity 0.2s ease; }
.lg-pod > * { position: relative; z-index: 1; }
.lg-btn {
  width: 40px; height: 40px; border: 0; border-radius: 50%; cursor: pointer;
  font-size: 14px; color: inherit; background: transparent;
}
.lg-btn:hover { background: rgb(255 255 255 / 0.25); }
.lg-btn-main { background: rgb(20 30 60 / 0.55); color: #fff; }
.lg-caption {
  position: absolute; left: 12px; right: 12px; bottom: 10px;
  display: flex; gap: 8px; flex-wrap: wrap; align-items: center; font-size: 11px;
}
.lg-caption > span {
  padding: 3px 10px; border-radius: 999px; color: #fff;
  background: rgb(0 0 0 / 0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
}
.lg-switcher { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: rgb(0 0 0 / 0.45); }
.lg-switcher button { border: 0; border-radius: 999px; padding: 3px 10px; font-size: 11px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.lg-switcher button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
@keyframes lg-drift-a { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(14vw, 8vh) rotate(40deg); } }
@keyframes lg-drift-b { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(-12vw, -9vh) rotate(-35deg); } }
@keyframes lg-in { from { opacity: 0; translate: -50% calc(-50% + 10px); } to { opacity: 1; translate: -50% -50%; } }
@media (prefers-reduced-motion: reduce) {
  .lg-pod { animation: none; }
  .lg-scene[data-playing="true"] .lg-blob-a, .lg-scene[data-playing="true"] .lg-blob-b { animation: none; }
  .lg-veil, .lg-tintlayer { transition: none; }
}
`;

/**
 * Liquid Glass 演示:胶囊玻璃舱浮在『活体内容』(照片 + 漂移色斑 + 彩色大字)之上。
 * dimming / blur / tint 为 CSS 变量型参数(经 DemoStage 注入);
 * variant 为 JS 型参数——订阅 store 切 data-variant:
 * regular 叠白色亮度薄层(官方未公布数值,demo 以同值近似)、clear 叠加深色 dimming 层(HIG 建议 35%)。
 * 折射用 SVG feTurbulence+feDisplacementMap,仅 Chromium 启用,其余环境回退纯模糊并在角标注明。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("nebula");
  const [playing, setPlaying] = useState(true);
  const [refraction, setRefraction] = useState(false);

  useEffect(() => {
    setRefraction(detectChromium());
  }, []);

  useEffect(
    () =>
      store.subscribe(() => {
        setVariant(store.get("variant") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="lg-scene" data-variant={variant} data-refraction={refraction ? "on" : "off"} data-playing={playing}>
        <div className="lg-bg">
          <img src={`/photos/glass-${backdrop}.jpg`} alt="" />
          <div className="lg-blob lg-blob-a" />
          <div className="lg-blob lg-blob-b" />
        </div>
        <p className="lg-word" aria-hidden="true">
          <small>LIQUID GLASS</small>
          Functional Layer
        </p>
        <div className="lg-pod" role="toolbar" aria-label="媒体控制示例 Media controls sample">
          <div className="lg-tintlayer" aria-hidden="true" />
          <div className="lg-veil" aria-hidden="true" />
          <button type="button" className="lg-btn" aria-label="上一曲 Previous">⏮</button>
          <button
            type="button"
            className="lg-btn lg-btn-main"
            aria-pressed={playing}
            aria-label={playing ? "暂停背景漂移 Pause backdrop drift" : "播放背景漂移 Play backdrop drift"}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button type="button" className="lg-btn" aria-label="下一曲 Next">⏭</button>
        </div>
        <div className="lg-caption" aria-live="polite">
          <span>{variant === "regular" ? "regular · 亮度调整近似(官方未公布数值)" : "clear · 深色 dimming 层(HIG 建议 35%)"}</span>
          <span>{refraction ? "折射 feDisplacementMap 激活(仅 Chromium)" : "回退:纯模糊(无 SVG 背景折射支持)"}</span>
          <div className="lg-switcher" role="group" aria-label="背景切换 Backdrop switcher">
            {BACKDROPS.map((b) => (
              <button
                key={b.id}
                type="button"
                aria-pressed={backdrop === b.id}
                title={b.en}
                onClick={() => setBackdrop(b.id)}
              >
                {b.zh}
              </button>
            ))}
          </div>
        </div>
        <svg className="lg-defs" width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
          <filter id="lg-refraction-filter" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.011" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
