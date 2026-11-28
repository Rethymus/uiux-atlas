import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as v}from"./DemoStage.vW1CgYCd.js";const m=`
.fav-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
/* —— 模拟浏览器标签条:随 scheme 一起翻暗,还原真实观感 —— */
.fav-chrome {
  width: min(520px, 100%);
  border-radius: 12px 12px 0 0;
  padding: 8px 10px 0;
  background: #d7dde5;
  transition: background 0.25s ease;
}
.fav-chrome[data-dark="true"] { background: #2a2d33; }
.fav-tabs { display: flex; gap: 6px; }
.fav-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 150px;
  padding: 5px 10px;
  border-radius: 8px 8px 0 0;
  font-size: 11px;
  background: #f4f6f9;
  color: rgba(15, 23, 42, 0.72);
  white-space: nowrap;
  overflow: hidden;
}
.fav-tab[data-active="true"] { background: #ffffff; color: rgba(15, 23, 42, 0.9); }
.fav-chrome[data-dark="true"] .fav-tab { background: #3a3e46; color: rgba(255, 255, 255, 0.6); }
.fav-chrome[data-dark="true"] .fav-tab[data-active="true"] { background: #4a4f59; color: #fff; }
.fav-tab svg, .fav-tab .fav-ico {
  flex: none;
  width: 16px;
  height: 16px;
  display: block;
}
.fav-chrome-body {
  height: 46px;
  border-radius: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-inline: 14px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}
.fav-chrome[data-dark="true"] .fav-chrome-body { background: #1d2026; color: rgba(255, 255, 255, 0.55); }
/* —— 三档图标面板 —— */
.fav-panels {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  width: min(520px, 100%);
}
.fav-card {
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #fff;
  padding: 10px 12px 12px;
  width: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.fav-card h4 { margin: 0; font-size: 11px; font-weight: 650; color: rgba(15, 23, 42, 0.7); text-align: center; }
.fav-card p { margin: 0; font-size: 10.5px; line-height: 1.55; color: rgba(15, 23, 42, 0.5); text-align: center; }
/* apple-touch:180 画布,显示 96px(×0.533);内边距随 --fav-padding 同比缩放 */
.fav-touch {
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 18px;
  background: var(--fav-accent, #0f0f0f);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fav-touch-pad {
  position: absolute;
  inset: calc(var(--fav-padding, 20px) * 96 / 180);
  border: 1px dashed rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav-touch svg { width: 44%; height: 44%; }
/* maskable:512 画布,显示 96px;安全圆 409/512 ≈ 0.8 */
.fav-mask-wrap { position: relative; width: 96px; height: 96px; }
.fav-mask {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: color-mix(in srgb, var(--fav-accent, #0f0f0f) 14%, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav-mask svg { width: 62%; height: 62%; }
.fav-safe {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: calc(96px * 409 / 512);
  height: calc(96px * 409 / 512);
  border: 1.5px dashed rgba(37, 99, 235, 0.7);
  border-radius: 50%;
  pointer-events: none;
}
.fav-safe[data-off="true"] { display: none; }
.fav-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--fav-accent, #0f0f0f) 14%, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fav-circle svg { width: 62%; height: 62%; }
.fav-warn {
  width: min(520px, 100%);
  margin: 0;
  font-size: 11px;
  line-height: 1.65;
  color: #c2410c;
  min-height: 0;
}
.fav-warn[data-empty="true"] { visibility: hidden; }
/* —— <head> 接线清单 —— */
.fav-code {
  width: min(520px, 100%);
  margin: 0;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  line-height: 1.7;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  padding: 10px 12px;
  white-space: pre-wrap;
  color: rgba(15, 23, 42, 0.8);
}
.fav-notes { margin: 0; padding-inline: 18px; font-size: 11px; line-height: 1.7; color: rgba(15, 23, 42, 0.6); width: min(520px, 100%); }
@media (prefers-reduced-motion: reduce) {
  .fav-chrome { transition: none; }
}
`;function s({fill:r}){return a.jsx("svg",{viewBox:"0 0 64 64","aria-hidden":"true",focusable:"false",children:a.jsx("path",{d:"M36 8 L14 36 L30 36 L26 56 L50 26 L33 26 Z",fill:r})})}const b=`<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">

<!-- icon.svg:内嵌 <style>,系统深色模式自动反色 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>@media (prefers-color-scheme: dark){
    .g{fill:#f0f0f0}
  }</style>
  <path class="g" fill="#0f0f0f" d="…"/>
</svg>`;function y({entryId:r,schema:l}){const e=g(r,l),[o,p]=d.useState(()=>e.get("scheme")),[x,h]=d.useState(()=>e.get("maskable"));d.useEffect(()=>e.subscribe(()=>{p(e.get("scheme")),h(e.get("maskable"))}),[e]);const i=o==="dark",t=i?"#f0f0f0":e.get("accent"),f=e.get("padding"),c=f<12,n=x==="show";return a.jsx(v,{entryId:r,schema:l,children:a.jsxs("div",{className:"fav-scene",children:[a.jsxs("div",{className:"fav-chrome","data-dark":i,children:[a.jsxs("div",{className:"fav-tabs",children:[a.jsxs("div",{className:"fav-tab","data-active":"true",children:[a.jsx(s,{fill:t}),"本站 icon.svg(16px)"]}),a.jsxs("div",{className:"fav-tab",children:[a.jsx("span",{className:"fav-ico",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",background:"#64748b",borderRadius:3},children:a.jsx(s,{fill:"#ffffff"})}),"RSS 回落 favicon.ico"]}),a.jsxs("div",{className:"fav-tab",children:[a.jsx("span",{className:"fav-ico",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",background:i?"#0f0f0f":"#f4f4f5",borderRadius:3},children:a.jsx(s,{fill:i?"#f0f0f0":"#0f0f0f"})}),"staging(反色)"]})]}),a.jsx("div",{className:"fav-chrome-body",children:"favicon 随系统深色模式自动换色 — 演示以 scheme 开关模拟 OS 偏好"})]}),a.jsxs("div",{className:"fav-panels",children:[a.jsxs("div",{className:"fav-card",children:[a.jsx("h4",{children:"apple-touch-icon · 180×180"}),a.jsxs("div",{className:"fav-touch",children:[a.jsx(s,{fill:i?"#f0f0f0":"#ffffff"}),a.jsx("div",{className:"fav-touch-pad"})]}),a.jsxs("p",{children:["内边距 ",f,"px(建议 20px)+ 品牌背景色;虚线框内是遮罩安全范围"]})]}),a.jsxs("div",{className:"fav-card",children:[a.jsx("h4",{children:"icon-mask.png · 512×512"}),a.jsxs("div",{className:"fav-mask-wrap",children:[a.jsx("div",{className:"fav-mask",children:a.jsx(s,{fill:i?"#f0f0f0":t})}),a.jsx("div",{className:"fav-safe","data-off":!n})]}),a.jsx("p",{children:"安全区 409×409 中央圆(比值 ≈0.8);glyph 必须整体落在圆内"})]}),a.jsxs("div",{className:"fav-card",children:[a.jsx("h4",{children:"启动器圆形裁切预览"}),a.jsx("div",{className:"fav-circle",children:a.jsx(s,{fill:i?"#f0f0f0":t})}),a.jsx("p",{children:n?'已标 purpose:"maskable":按安全区设计,裁切不破相':"未标 maskable:各启动器遮罩盲裁,四角内容随时被切"})]})]}),a.jsxs("p",{className:"fav-warn","data-empty":!c&&n,children:[c?`内边距 ${f}px < 12px:系统遮罩一旦更激进的圆角就会裁进 glyph(Evil Martians 建议 ≈20px)`:"",!c&&!n?'未显示安全区 = 「没标 purpose:"maskable"」的裸图状态':""]}),a.jsx("pre",{className:"fav-code",children:b}),a.jsxs("ul",{className:"fav-notes",children:[a.jsx("li",{children:'favicon.ico 固定 32×32、放根目录:RSS 阅读器只认 /favicon.ico 路径;sizes="32x32" 顺带修 Chrome 忽略 SVG 的 bug;'}),a.jsx("li",{children:'manifest.webmanifest 仅 PWA 需要;icon-192.png 给常规场景,512×512 那张声明 purpose:"maskable";'}),a.jsx("li",{children:'rel="shortcut icon" 从来不是有效写法,现代浏览器只认 rel="icon"。'})]}),a.jsx("style",{children:m})]})})}export{y as default};
