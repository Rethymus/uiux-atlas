import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 八枚基准撞色:本条目基准设定(调研未记载具体色值);顺序即色相裁剪次序 */
const PALETTE = ["#e63946", "#ff8c42", "#ffd60a", "#2a9d8f", "#1b9aaa", "#3557ff", "#7b2ff7", "#ff5da2"];
const INK = "#1a1423";
const PAPER = "#f6f2ea";

const css = `
.demo-stage {
  --mx-step: 1.333;
  --mx-gap: 12px;
  --mx-tilt: 2deg;
}
.mx-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: ${PAPER};
  color: ${INK};
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
/* 顶部彩带:l6 层,透明度交给内联渐变 */
.mx-band {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  border-bottom: 3px solid ${INK};
}
/* l1 波点底纹 */
.mx-l1 {
  position: absolute;
  inset: 44px 0 0 0;
  background-image: radial-gradient(circle, rgba(26, 20, 35, 0.14) 2.5px, transparent 3px);
  background-size: 26px 26px;
}
/* l2 斜纹场 */
.mx-l2 {
  position: absolute;
  inset: 44px 0 0 0;
  background: repeating-linear-gradient(-45deg, transparent 0 18px, rgba(26, 20, 35, 0.09) 18px 36px);
}
/* l3–l5 贴纸:墨描边 + 叠印旋转 */
.mx-sticker {
  position: absolute;
  padding: 7px 14px;
  border: 3px solid ${INK};
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  rotate: calc(-1 * var(--mx-tilt));
  transition: rotate 0.2s ease;
}
.mx-sticker:hover { rotate: calc(-2 * var(--mx-tilt)); }
.mx-s3 { right: 12%; top: 22%; }
.mx-s4 { left: 9%; bottom: 18%; rotate: var(--mx-tilt); }
.mx-s4:hover { rotate: calc(2 * var(--mx-tilt)); }
.mx-s5 { right: 20%; bottom: 12%; rotate: calc(0.5 * var(--mx-tilt)); }
.mx-s5:hover { rotate: calc(1.5 * var(--mx-tilt)); }
/* 主卡:双线描边 + 同参数旋转 + 缝隙收缩 */
.mx-card {
  position: absolute;
  left: 50%;
  top: 56%;
  translate: -50% -50%;
  rotate: var(--mx-tilt);
  width: min(400px, calc(100% - 72px));
  padding: calc(var(--mx-gap) + 6px);
  border: 3px double ${INK};
  background: ${PAPER};
  display: flex;
  flex-direction: column;
  gap: var(--mx-gap);
  animation: mx-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.mx-mono { font-family: ui-monospace, "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
.mx-eyebrow { margin: 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.85; }
.mx-h {
  margin: 0;
  font-size: clamp(1.6rem, calc(var(--mx-step) * var(--mx-step) * 1.25rem), 3.2rem);
  line-height: 1.08;
  font-weight: 900;
}
/* trio = 衬线展示标题(对比字族);duo = 无衬线两级(极简对照) */
.mx-scene[data-font="trio"] .mx-h { font-family: Georgia, "Times New Roman", serif; }
.mx-scene[data-font="duo"] .mx-h,
.mx-scene[data-font="duo"] .mx-mono {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
/* 荧光笔 marker:撞色落在划线上,文字恒为墨色,对比不受色相影响 */
.mx-mark { box-shadow: inset 0 -0.22em 0 var(--mk, ${PALETTE[2]}); }
.mx-body { margin: 0; font-size: 15px; line-height: 1.6; max-width: 45ch; }
.mx-badges { display: flex; flex-wrap: wrap; gap: calc(var(--mx-gap) / 2); }
.mx-badge {
  padding: 4px 10px;
  border: 2px solid var(--bd, ${PALETTE[0]});
  font-size: 11px;
  letter-spacing: 0.08em;
}
/* 换序工具条 */
.mx-toolbar {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 6px;
}
.mx-toolbar button {
  border: 2px solid ${INK};
  border-radius: 0;
  background: ${PAPER};
  color: ${INK};
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.mx-toolbar button:hover { background: ${INK}; color: ${PAPER}; }
/* 窄屏:卡片放宽,贴纸收缩 */
@media (max-width: 480px) {
  .mx-card { width: calc(100% - 24px); top: 58%; }
  .mx-sticker { font-size: 11px; padding: 5px 9px; }
  .mx-s3 { right: 4%; }
}
@keyframes mx-in {
  from { opacity: 0; scale: 0.94; }
  to { opacity: 1; scale: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .mx-card { animation: none; }
  .mx-sticker { transition: none; }
}
`;

/**
 * 极繁主义演示:撞色斑底 + 六层可叠印装饰 + 双线描边海报卡。
 * hues / fontMix / layers 为 JS 型参数(订阅 store 后驱动色板裁剪、字体档与层显隐);
 * typeScale / gap / tilt 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [hues, setHues] = useState(() => store.get("hues") as number);
  const [fontMix, setFontMix] = useState(() => store.get("fontMix") as string);
  const [layers, setLayers] = useState(() => store.get("layers") as number);
  const [spin, setSpin] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setHues(store.get("hues") as number);
        setFontMix(store.get("fontMix") as string);
        setLayers(store.get("layers") as number);
      }),
    [store],
  );

  const n = Math.max(2, Math.min(8, hues));
  const base = PALETTE.slice(0, n);
  const k = spin % n;
  const active = [...base.slice(k), ...base.slice(0, k)];
  const at = (i: number) => active[i % active.length];

  const blobVars = {
    backgroundImage: [
      `radial-gradient(42% 60% at 12% 16%, ${at(0)}cc, transparent 70%)`,
      `radial-gradient(38% 52% at 86% 12%, ${at(n - 1)}cc, transparent 68%)`,
      `radial-gradient(46% 60% at 78% 88%, ${at(2)}cc, transparent 72%)`,
    ].join(", "),
  } as CSSProperties;
  const bandVars = {
    background: `linear-gradient(90deg, ${active.map((c, i) => `${c} ${(i * 100) / n}% ${(i + 1) * 100 / n}%`).join(", ")})`,
  } as CSSProperties;
  const layer = (lvl: number) => ({ display: layers >= lvl ? undefined : "none" }) as CSSProperties;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="mx-scene" data-font={fontMix}>
        <div className="mx-scene-bg" style={{ ...blobVars, position: "absolute", inset: 0 }} aria-hidden="true" />
        {layers >= 6 && <div className="mx-band" style={bandVars} aria-hidden="true" />}
        <div className="mx-l1" style={layer(1)} aria-hidden="true" />
        <div className="mx-l2" style={layer(2)} aria-hidden="true" />
        <span className="mx-sticker mx-s3" style={{ ...layer(3), borderColor: INK }} aria-hidden="true">More ★</span>
        <span className="mx-sticker mx-s4" style={{ ...layer(4), borderColor: INK }} aria-hidden="true">Is!</span>
        <span className="mx-sticker mx-s5" style={{ ...layer(5), borderColor: INK }} aria-hidden="true">More ↻</span>
        <article className="mx-card">
          <p className="mx-eyebrow mx-mono">Horror Vacui · Est. 1980s Memphis</p>
          <h3 className="mx-h">
            <span className="mx-mark" style={{ "--mk": at(0) } as CSSProperties}>More</span>{" "}
            <span className="mx-mark" style={{ "--mk": at(2) } as CSSProperties}>is</span>{" "}
            <span className="mx-mark" style={{ "--mk": at(n - 1) } as CSSProperties}>more</span>
          </h3>
          <p className="mx-body">
            图案叠图案,色彩对色彩。密度全部压在装饰层——正文保持 45–75ch 行宽,放大一倍不出现滚动。
          </p>
          <div className="mx-badges" aria-hidden="true">
            <span className="mx-badge mx-mono" style={{ "--bd": at(1) } as CSSProperties}>≥{n} hues</span>
            <span className="mx-badge mx-mono" style={{ "--bd": at(2) } as CSSProperties}>×1.333</span>
            <span className="mx-badge mx-mono" style={{ "--bd": at(4) } as CSSProperties}>{layers} layers</span>
          </div>
        </article>
        <div className="mx-toolbar">
          <button type="button" onClick={() => setSpin((s) => s + 1)} title="Rotate palette order">
            换序 Shuffle ⤭
          </button>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
