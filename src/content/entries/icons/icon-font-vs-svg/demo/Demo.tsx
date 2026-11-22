import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Delivery = "svg" | "font";
type Failure = "none" | "font-missing" | "emoji-crash";

const css = `
.icf-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
.icf-lanes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: min(560px, 100%);
}
@media (max-width: 520px) {
  .icf-lanes { grid-template-columns: 1fr; }
}
.icf-lane {
  position: relative;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  background: #fff;
  padding: 10px 12px 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.icf-lane[data-adopted="true"] {
  border-color: rgba(37, 99, 235, 0.55);
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.25) inset;
}
.icf-lane-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}
.icf-lane-title { margin: 0; font-size: 12px; font-weight: 650; color: rgba(15, 23, 42, 0.78); }
.icf-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.icf-lane[data-adopted="true"] .icf-badge { opacity: 1; }
.icf-glyphs {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 18px;
  min-height: 64px;
  color: var(--icf-color, #0f172a);
}
/* 字体字形槽:机制同源(码位→字形→color,line-height 定位),用系统符号字形真实渲染 */
.icf-glyph {
  font-size: var(--icf-size, 24px);
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icf-glyph svg {
  width: var(--icf-size, 24px);
  height: var(--icf-size, 24px);
  display: block;
}
.icf-tofu {
  font-size: var(--icf-size, 24px);
  line-height: 1;
  width: calc(var(--icf-size, 24px) * 0.82);
  height: calc(var(--icf-size, 24px) * 0.92);
  border: 1.5px solid currentColor;
  border-radius: 2px;
  display: inline-block;
  position: relative;
  opacity: 0.75;
}
.icf-tofu::before {
  content: "";
  position: absolute;
  inset: 18% 30%;
  border: 1px solid currentColor;
}
.icf-ligature {
  font-size: 12px;
  line-height: 1.4;
  font-family: var(--font-mono, monospace);
  color: rgba(15, 23, 42, 0.5);
}
.icf-lane-foot { margin: 10px 0 0; font-size: 11px; line-height: 1.6; color: rgba(15, 23, 42, 0.45); }
.icf-snippet {
  width: min(560px, 100%);
  margin: 0;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  line-height: 1.7;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 10px 12px;
  white-space: pre-wrap;
  word-break: break-all;
  color: rgba(15, 23, 42, 0.8);
}
.icf-verdict {
  width: min(560px, 100%);
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.7);
  background: #f8fafc;
  border: 1px dashed rgba(15, 23, 42, 0.18);
  border-radius: 10px;
  padding: 8px 12px;
}
.icf-verdict b { color: rgba(15, 23, 42, 0.9); }
.icf-failnote {
  margin: 8px 0 0;
  font-size: 11px;
  line-height: 1.6;
  color: #c2410c;
  min-height: 0;
}
.icf-failnote[data-empty="true"] { visibility: hidden; }
@media (prefers-reduced-motion: reduce) {
  .icf-lane, .icf-badge { transition: none; }
}
`;

/** SVG 侧:真实内联矢量,stroke=currentColor,24 网格、2px 圆头(Lucide defaultAttributes 同构) */
function HouseSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v10h12V10" />
    </svg>
  );
}
function GearSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
function StarSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4l2.4 5 5.6.7-4.1 3.8 1.1 5.5-5-2.7-5 2.7 1.1-5.5L4 9.7l5.6-.7z" />
    </svg>
  );
}

const SVG_SNIPPET = `<svg viewBox="0 0 24 24" width="24" height="24"
  fill="none" stroke="currentColor" stroke-width="2">
  <path d="…"/>
</svg>
<!-- 尺寸=width/height,染色=currentColor;内嵌文档,无外部失败态 -->`;

const FONT_SNIPPET = `<i class="icon icon-home" aria-hidden="true"></i>
/* 字形 = 字体里的一个码位;尺寸 = font-size,
   垂直定位要跟 line-height / vertical-align 搏斗;
   依赖 @font-face:加载失败 / CORS / 广告拦截 → 整批失效 */`;

/**
 * 图标字体与 SVG 对照演示:
 * - SVG 侧为真实内联矢量;字体侧为机制演示——用系统符号字形(⌂ ⚙ ★)真实渲染,
 *   机制与图标字体同源(码位→字形→color 染色、文本反锯齿、line-height 定位),
 *   并如实标注「非真实图标字体文件」。
 * - failure 为 JS 型故障模拟器,仅作用于字体侧(tofu/连字为仿真;emoji 撞车为真实浏览器行为)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [delivery, setDelivery] = useState(() => store.get("delivery") as Delivery);
  const [failure, setFailure] = useState(() => store.get("failure") as Failure);

  useEffect(
    () =>
      store.subscribe(() => {
        setDelivery(store.get("delivery") as Delivery);
        setFailure(store.get("failure") as Failure);
      }),
    [store],
  );

  const fontGlyphs = (() => {
    if (failure === "font-missing") {
      return (
        <>
          <span className="icf-glyph"><span className="icf-tofu" /></span>
          <span className="icf-glyph"><span className="icf-tofu" /></span>
          <span className="icf-glyph"><span className="icf-tofu" /></span>
        </>
      );
    }
    if (failure === "emoji-crash") {
      // 真实浏览器行为:U+2699 + U+FE0F → 彩色 emoji 字形接管(平台相关)
      return (
        <>
          <span className="icf-glyph">⌂</span>
          <span className="icf-glyph">⚙️</span>
          <span className="icf-glyph">★</span>
        </>
      );
    }
    // 系统符号字形:机制同源的真实渲染(码位→字形→color)
    return (
      <>
        <span className="icf-glyph">⌂</span>
        <span className="icf-glyph">⚙</span>
        <span className="icf-glyph">★</span>
      </>
    );
  })();

  const failNote =
    failure === "font-missing"
      ? "仿真呈现:字体未加载 → tofu 方框 + 裸连字文本 home gear star(加载失败/CORS/广告拦截/Opera Mini 无 @font-face)"
      : failure === "emoji-crash"
        ? "真实行为:⚙ + U+FE0F → 彩色系统 emoji 字形接管(私有区/码位撞 emoji,平台相关)"
        : "";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="icf-scene">
        <div className="icf-lanes">
          <div className="icf-lane" data-adopted={delivery === "font"}>
            <div className="icf-lane-head">
              <h3 className="icf-lane-title">Icon Font(机制演示)</h3>
              <span className="icf-badge">采用中</span>
            </div>
            <div className="icf-glyphs">
              {fontGlyphs}
              {failure === "font-missing" && (
                <span className="icf-ligature">home gear star</span>
              )}
            </div>
            <p className="icf-lane-foot">
              系统符号字形真实渲染(非图标字体文件);机制同源:码位→字形→color,受文本反锯齿与 line-height 定位影响。
            </p>
            <p className="icf-failnote" data-empty={failNote === ""}>{failNote}</p>
          </div>
          <div className="icf-lane" data-adopted={delivery === "svg"}>
            <div className="icf-lane-head">
              <h3 className="icf-lane-title">Inline SVG</h3>
              <span className="icf-badge">采用中</span>
            </div>
            <div className="icf-glyphs">
              <span className="icf-glyph"><HouseSvg /></span>
              <span className="icf-glyph"><GearSvg /></span>
              <span className="icf-glyph"><StarSvg /></span>
            </div>
            <p className="icf-lane-foot">
              真实矢量:24 网格、2px 圆头、stroke=currentColor;尺寸即 width/height,内嵌文档无字体失败态。
            </p>
          </div>
        </div>
        <pre className="icf-snippet">{delivery === "svg" ? SVG_SNIPPET : FONT_SNIPPET}</pre>
        <p className="icf-verdict">
          <b>CSS-Tricks CAGEMATCH(2014)结论:</b>
          能到 IE9+/Android 3+,inline SVG 几乎全面胜出;IE8 是 icon font 仍占优的场景。评论区的另一半:SVG 在缓存与 DOM 体积上也有代价。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
