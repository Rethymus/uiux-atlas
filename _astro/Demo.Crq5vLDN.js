import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const h=`
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
`;function x(){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M4 11l8-7 8 7"}),e.jsx("path",{d:"M6 10v10h12V10"})]})}function g(){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8"}),e.jsx("circle",{cx:"12",cy:"12",r:"2.5"})]})}function m(){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("path",{d:"M12 4l2.4 5 5.6.7-4.1 3.8 1.1 5.5-5-2.7-5 2.7 1.1-5.5L4 9.7l5.6-.7z"})})}const u=`<svg viewBox="0 0 24 24" width="24" height="24"
  fill="none" stroke="currentColor" stroke-width="2">
  <path d="…"/>
</svg>
<!-- 尺寸=width/height,染色=currentColor;内嵌文档,无外部失败态 -->`,j=`<i class="icon icon-home" aria-hidden="true"></i>
/* 字形 = 字体里的一个码位;尺寸 = font-size,
   垂直定位要跟 line-height / vertical-align 搏斗;
   依赖 @font-face:加载失败 / CORS / 广告拦截 → 整批失效 */`;function k({entryId:r,schema:c}){const i=p(r,c),[a,o]=n.useState(()=>i.get("delivery")),[s,l]=n.useState(()=>i.get("failure"));n.useEffect(()=>i.subscribe(()=>{o(i.get("delivery")),l(i.get("failure"))}),[i]);const d=s==="font-missing"?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"icf-glyph",children:e.jsx("span",{className:"icf-tofu"})}),e.jsx("span",{className:"icf-glyph",children:e.jsx("span",{className:"icf-tofu"})}),e.jsx("span",{className:"icf-glyph",children:e.jsx("span",{className:"icf-tofu"})})]}):s==="emoji-crash"?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"icf-glyph",children:"⌂"}),e.jsx("span",{className:"icf-glyph",children:"⚙️"}),e.jsx("span",{className:"icf-glyph",children:"★"})]}):e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"icf-glyph",children:"⌂"}),e.jsx("span",{className:"icf-glyph",children:"⚙"}),e.jsx("span",{className:"icf-glyph",children:"★"})]}),t=s==="font-missing"?"仿真呈现:字体未加载 → tofu 方框 + 裸连字文本 home gear star(加载失败/CORS/广告拦截/Opera Mini 无 @font-face)":s==="emoji-crash"?"真实行为:⚙ + U+FE0F → 彩色系统 emoji 字形接管(私有区/码位撞 emoji,平台相关)":"";return e.jsx(f,{entryId:r,schema:c,children:e.jsxs("div",{className:"icf-scene",children:[e.jsxs("div",{className:"icf-lanes",children:[e.jsxs("div",{className:"icf-lane","data-adopted":a==="font",children:[e.jsxs("div",{className:"icf-lane-head",children:[e.jsx("h3",{className:"icf-lane-title",children:"Icon Font(机制演示)"}),e.jsx("span",{className:"icf-badge",children:"采用中"})]}),e.jsxs("div",{className:"icf-glyphs",children:[d,s==="font-missing"&&e.jsx("span",{className:"icf-ligature",children:"home gear star"})]}),e.jsx("p",{className:"icf-lane-foot",children:"系统符号字形真实渲染(非图标字体文件);机制同源:码位→字形→color,受文本反锯齿与 line-height 定位影响。"}),e.jsx("p",{className:"icf-failnote","data-empty":t==="",children:t})]}),e.jsxs("div",{className:"icf-lane","data-adopted":a==="svg",children:[e.jsxs("div",{className:"icf-lane-head",children:[e.jsx("h3",{className:"icf-lane-title",children:"Inline SVG"}),e.jsx("span",{className:"icf-badge",children:"采用中"})]}),e.jsxs("div",{className:"icf-glyphs",children:[e.jsx("span",{className:"icf-glyph",children:e.jsx(x,{})}),e.jsx("span",{className:"icf-glyph",children:e.jsx(g,{})}),e.jsx("span",{className:"icf-glyph",children:e.jsx(m,{})})]}),e.jsx("p",{className:"icf-lane-foot",children:"真实矢量:24 网格、2px 圆头、stroke=currentColor;尺寸即 width/height,内嵌文档无字体失败态。"})]})]}),e.jsx("pre",{className:"icf-snippet",children:a==="svg"?u:j}),e.jsxs("p",{className:"icf-verdict",children:[e.jsx("b",{children:"CSS-Tricks CAGEMATCH(2014)结论:"}),"能到 IE9+/Android 3+,inline SVG 几乎全面胜出;IE8 是 icon font 仍占优的场景。评论区的另一半:SVG 在缓存与 DOM 体积上也有代价。"]}),e.jsx("style",{children:h})]})})}export{k as default};
