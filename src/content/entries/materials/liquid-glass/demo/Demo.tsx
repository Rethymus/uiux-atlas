import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import { withBase } from "@/lib/urls";
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

/** morph 两态的固定尺寸(px→px 过渡才可动画);pod 宽度同时是折射比例的基准 */
const POD_SIZE = { w: 148, h: 56 };
const PANEL_SIZE = { w: 232, h: 176 };

/** 折射位移场随指针偏移的最大幅度(SVG 用户单位)——演示值,官方未公布折射数值(调研 09 §8) */
const POINTER_FIELD = 60;

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
/* 玻璃舱:官方默认形状 Capsule + 1px 内侧高光;
   morph 过渡 token 320ms cubic-bezier(0.4,0,0.6,1) = apple.com 生产 CSS 实抓(调研 09 §1.4a) */
.lg-pod {
  position: absolute; left: 50%; top: 58%; translate: -50% -50%;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.08);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55), 0 10px 30px rgb(0 0 0 / 0.28);
  -webkit-backdrop-filter: blur(var(--lg-blur));
  backdrop-filter: blur(var(--lg-blur));
  color: #10131c;
  animation: lg-in 0.5s ease-out both;
  transition:
    width 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    height 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    border-radius 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    box-shadow 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
/* 折射:SVG feDisplacementMap,仅 Chromium 启用(demo 以 UA 探测控制该规则生效) */
.lg-scene[data-refraction="on"] .lg-pod {
  -webkit-backdrop-filter: url(#lg-refraction-filter) blur(var(--lg-blur));
  backdrop-filter: url(#lg-refraction-filter) blur(var(--lg-blur));
}
/* morph 放大态:更深的阴影(官方定性『玻璃变大时投下更深更浓的阴影』,调研 09 §8.4) */
.lg-scene[data-morph="panel"] .lg-pod {
  border-radius: 24px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55), 0 26px 60px rgb(0 0 0 / 0.42);
}
/* 子层通用抬升(须先于下面各绝对定位层声明,避免 position: relative 覆盖它们) */
.lg-pod > * { position: relative; z-index: 1; }
/* 状态层:dimming 不透明度由 --lg-dimming 驱动(默认 35%,HIG 对 clear 的建议) */
.lg-veil {
  position: absolute; inset: 0; border-radius: inherit;
  opacity: var(--lg-dimming); transition: opacity 0.25s ease;
}
.lg-scene[data-variant="regular"] .lg-veil { background: rgb(255 255 255 / 0.92); }
.lg-scene[data-variant="clear"] .lg-veil { background: rgb(8 10 18 / 0.92); }
.lg-tintlayer { position: absolute; inset: 0; border-radius: inherit; background: rgb(64 96 255 / 0.85); opacity: var(--lg-tint); transition: opacity 0.2s ease; }
/* 触碰辉光:位置与显隐由 demo 直接写 style(不经 CSS 变量,避免逐帧子树样式失效);
   辉光配方为演示近似,官方未公布数值(调研 09 §1.4d/§8.8) */
.lg-glow { position: absolute; inset: 0; border-radius: inherit; z-index: 1; opacity: 0; pointer-events: none; }
/* 胶囊态控件层 ↔ 面板态菜单层:就地交叉淡变(pop 开露出内容,调研 09 §8.3) */
.lg-controls {
  position: absolute; inset: 0; z-index: 1;
  display: flex; align-items: center; justify-content: center; gap: 4px;
  transition: opacity 0.25s ease;
}
.lg-scene[data-morph="panel"] .lg-controls { opacity: 0; pointer-events: none; }
.lg-menu {
  position: absolute; inset: 0; z-index: 1;
  display: flex; flex-direction: column; justify-content: center; gap: 2px;
  padding: 12px 14px;
  opacity: 0; transition: opacity 0.25s ease; pointer-events: none;
}
.lg-scene[data-morph="panel"] .lg-menu { opacity: 1; pointer-events: auto; }
.lg-menu-row {
  display: flex; align-items: center; gap: 10px;
  border: 0; border-radius: 12px; padding: 8px 10px;
  font-size: 12.5px; cursor: pointer; color: inherit; background: transparent; text-align: left;
}
.lg-menu-row:hover { background: rgb(255 255 255 / 0.25); }
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
  .lg-pod { animation: none; transition: none; }
  .lg-controls, .lg-menu { transition: none; }
  .lg-scene[data-playing="true"] .lg-blob-a, .lg-scene[data-playing="true"] .lg-blob-b { animation: none; }
  .lg-veil, .lg-tintlayer { transition: none; }
}
`;

/**
 * Liquid Glass 演示:胶囊玻璃舱浮在『活体内容』(照片 + 漂移色斑 + 彩色大字)之上。
 * CSS 变量型参数:dimming / blur / tint(经 DemoStage 注入),variant 为 JS 型(订阅 store 切 data-variant):
 * regular 叠白色亮度薄层(官方未公布数值,demo 以同值近似)、clear 叠加深色 dimming 层(HIG 建议 35%)。
 * 动态表现(调研 09 §8):
 * - refraction(JS 型)→ feDisplacementMap scale;位移场经 feOffset 随指针偏移(lensing 近似,数值为演示值);
 * - 折射强度是尺寸的函数(219 [422–445s]):morph 放大态按宽度比例同步放大位移并加深阴影;
 * - morph(JS 型 enum)→ 胶囊↔展开面板,过渡 320ms cubic-bezier(0.4,0,0.6,1)(apple.com 生产 CSS 实抓);
 * - 触碰辉光:radial-gradient 直接写 style 跟随指针(演示近似)。
 * 折射仅 Chromium 生效,其余环境回退纯模糊并在角标注明。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [variant, setVariant] = useState(() => store.get("variant") as string);
  const [refraction, setRefraction] = useState(() => store.get("refraction") as number);
  const [morph, setMorph] = useState(() => store.get("morph") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("nebula");
  const [playing, setPlaying] = useState(true);
  const [refractionOn, setRefractionOn] = useState(false);

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const podRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef<SVGFEOffsetElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const rafPending = useRef(false);
  const fieldPending = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setRefractionOn(detectChromium());
  }, []);

  useEffect(
    () =>
      store.subscribe(() => {
        setVariant(store.get("variant") as string);
        setRefraction(store.get("refraction") as number);
        setMorph(store.get("morph") as string);
      }),
    [store],
  );

  // 折射强度 = refraction ×(当前宽度/胶囊基准宽度)——「折射强度是尺寸的函数」(WWDC25 219 [422–445s])
  useEffect(() => {
    const disp = dispRef.current;
    if (!disp) return;
    const base = typeof refraction === "number" ? refraction : 0;
    const ratio = morph === "panel" ? PANEL_SIZE.w / POD_SIZE.w : 1;
    disp.setAttribute("scale", String(Math.round(base * ratio)));
  }, [refraction, morph]);

  // 折射位移场随指针移动:rAF 合帧后写 feOffset dx/dy(平移噪声场,lensing 近似;幅度为演示值)
  const onScenePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const scene = sceneRef.current;
    const pod = podRef.current;
    if (!scene || !pod) return;
    const s = scene.getBoundingClientRect();
    const p = pod.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    fieldPending.current = {
      x: clamp(((e.clientX - (p.left + p.width / 2)) / s.width) * 2),
      y: clamp(((e.clientY - (p.top + p.height / 2)) / s.height) * 2),
    };
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const off = offsetRef.current;
      if (!off) return;
      off.setAttribute("dx", String(Math.round(fieldPending.current.x * POINTER_FIELD)));
      off.setAttribute("dy", String(Math.round(fieldPending.current.y * POINTER_FIELD)));
    });
  };

  // 触碰辉光:radial-gradient 跟随指针,直接写元素 style(调研 10 §7.4:逐帧直写样式优于 CSS 变量)
  const onPodPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    const pod = podRef.current;
    if (!glow || !pod) return;
    const r = pod.getBoundingClientRect();
    glow.style.background = `radial-gradient(120px circle at ${Math.round(e.clientX - r.left)}px ${Math.round(
      e.clientY - r.top,
    )}px, rgb(255 255 255 / 0.35), transparent 72%)`;
    glow.style.opacity = "1";
  };
  const onPodPointerLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  const size = morph === "panel" ? PANEL_SIZE : POD_SIZE;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div
        className="lg-scene"
        data-variant={variant}
        data-refraction={refractionOn ? "on" : "off"}
        data-playing={playing}
        data-morph={morph}
        ref={sceneRef}
        onPointerMove={onScenePointerMove}
      >
        <div className="lg-bg">
          <img src={withBase(`photos/glass-${backdrop}.jpg`)} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
          <div className="lg-blob lg-blob-a" />
          <div className="lg-blob lg-blob-b" />
        </div>
        <p className="lg-word" aria-hidden="true">
          <small>LIQUID GLASS</small>
          Functional Layer
        </p>
        <div
          className="lg-pod"
          role="toolbar"
          aria-label="媒体控制示例 Media controls sample"
          ref={podRef}
          style={{ width: size.w, height: size.h }}
          onPointerMove={onPodPointerMove}
          onPointerLeave={onPodPointerLeave}
        >
          <div className="lg-tintlayer" aria-hidden="true" />
          <div className="lg-veil" aria-hidden="true" />
          <div className="lg-glow" ref={glowRef} aria-hidden="true" />
          <div className="lg-controls">
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
          <div className="lg-menu">
            <button
              type="button"
              className="lg-menu-row"
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "⏸ 暂停漂移 Pause drift" : "▶ 播放漂移 Play drift"}
            </button>
            <button type="button" className="lg-menu-row" aria-label="上一曲 Previous">⏮ 上一曲 Previous</button>
            <button type="button" className="lg-menu-row" aria-label="下一曲 Next">⏭ 下一曲 Next</button>
          </div>
        </div>
        <div className="lg-caption" aria-live="polite">
          <span>{variant === "regular" ? "regular · 亮度调整近似(官方未公布数值)" : "clear · 深色 dimming 层(HIG 建议 35%)"}</span>
          <span>
            {refractionOn
              ? "折射随指针 · feDisplacementMap(仅 Chromium;放大态按尺寸比例增强)"
              : "回退:纯模糊(无 SVG 背景折射支持)"}
          </span>
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
            {/* feOffset 平移噪声场 → 折射位移随指针移动(lensing 近似,幅度为演示值) */}
            <feOffset in="noise" dx="0" dy="0" result="noise-offset" ref={offsetRef} />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise-offset"
              scale="34"
              xChannelSelector="R"
              yChannelSelector="G"
              ref={dispRef}
            />
          </filter>
        </svg>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
