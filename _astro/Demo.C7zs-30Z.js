import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as j}from"./DemoStage.vW1CgYCd.js";const b=`
.cs-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
/* 宿主一行:唯一 color 声明,图标 + 文字全部 currentColor 跟随 */
.cs-line {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  transition: color 0.2s ease;
}
.cs-scene[data-state="default"] .cs-line { color: #1192e8; }
.cs-scene[data-state="hover"] .cs-line { color: #002d9c; }
.cs-scene[data-state="danger"] .cs-line { color: #da1e28; }
.cs-line svg {
  opacity: calc(var(--cs-opacity, 100) / 100);
  transition: opacity 0.15s ease;
}
.cs-label { font-size: 14px; }
.cs-swatchrow { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.cs-swatch {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
}
.cs-swatch i {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1px solid rgba(15, 23, 42, 0.15);
}
.cs-panel {
  min-width: 250px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #f8fafc;
  padding: 10px 16px;
  text-align: center;
}
.cs-ratio {
  font-family: var(--font-mono, monospace);
  font-size: 20px;
  font-weight: 650;
}
.cs-ratio.cs-pass { color: #15803d; }
.cs-ratio.cs-fail { color: #da1e28; }
.cs-verdict { font-size: 12px; color: rgba(0, 0, 0, 0.55); }
.cs-note {
  max-width: 470px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  .cs-line, .cs-line svg { transition: none; }
}
`,g={default:"#1192e8",hover:"#002d9c",danger:"#da1e28"};function p(e){const t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}function m(e,t,a){return .2126*p(e)+.7152*p(t)+.0722*p(a)}function v(e,t){const a=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),l=parseInt(e.slice(5,7),16),c=i=>Math.round(i*t+255*(1-t)),o=m(c(a),c(n),c(l)),r=m(255,255,255);return(Math.max(o,r)+.05)/(Math.min(o,r)+.05)}const x={star:s.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8"}),bell:s.jsxs(s.Fragment,{children:[s.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z"}),s.jsx("path",{d:"M10.4 19.8a1.9 1.9 0 0 0 3.2 0"})]}),bolt:s.jsx("path",{d:"M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z"})};function h({art:e}){return s.jsx("svg",{viewBox:"0 0 24 24",width:22,height:22,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e})}function S({entryId:e,schema:t}){const a=u(e,t),[n,l]=d.useState(()=>a.get("state")),[c,o]=d.useState(()=>a.get("opacity"));d.useEffect(()=>a.subscribe(()=>{l(a.get("state")),o(a.get("opacity"))}),[a]);const r=g[n]??g.default,i=v(r,c/100),f=i>=3;return s.jsx(j,{entryId:e,schema:t,children:s.jsxs("div",{className:"cs-scene","data-state":n,children:[s.jsxs("div",{className:"cs-line",children:[s.jsx(h,{art:x.star}),s.jsx(h,{art:x.bell}),s.jsx(h,{art:x.bolt}),s.jsx("span",{className:"cs-label",children:"收藏 · 通知 · 快速操作"})]}),s.jsxs("div",{className:"cs-swatchrow",children:[s.jsxs("span",{className:"cs-swatch",children:[s.jsx("i",{style:{background:"#1192e8"}})," default #1192e8"]}),s.jsxs("span",{className:"cs-swatch",children:[s.jsx("i",{style:{background:"#002d9c"}})," hover #002d9c"]}),s.jsxs("span",{className:"cs-swatch",children:[s.jsx("i",{style:{background:"#da1e28"}})," danger #da1e28"]})]}),s.jsxs("div",{className:"cs-panel",children:[s.jsxs("div",{className:`cs-ratio ${f?"cs-pass":"cs-fail"}`,"aria-live":"polite",children:[i.toFixed(2),":1 ",f?"≥ 3:1 通过":"< 3:1 失败"]}),s.jsxs("div",{className:"cs-verdict",children:["(图标色 × ",c,"%) 混白后 vs 白底 · WCAG 1.4.11"]})]}),s.jsx("p",{className:"cs-note",children:"宿主一处 color,图标与文字全部 currentColor 跟随(CSS Color 4 §6.4);拖低透明度,对比度实时跌破 3:1 即标红。Carbon 官方未定义 hover 色,#002d9c 取同板已核实深档作演示语义(已标注)。 One host color re-inks icons and text via currentColor; drag opacity down and the live 3:1 check turns red the moment it fails."}),s.jsx("style",{children:b})]})})}export{S as default};
