import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as h}from"./color.DuEPkvq5.js";import{D as x}from"./DemoStage.vW1CgYCd.js";const u=`
.sp-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
/* 宿主 chip:唯一 color 声明,所有实例经 currentColor 换装 */
.sp-chip {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 22px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #ffffff;
  color: rgba(15, 23, 42, 0.9);
  transition: background 0.2s ease, color 0.2s ease;
}
.sp-scene[data-ink="inverse"] .sp-chip {
  background: rgba(15, 23, 42, 0.92);
  border-color: transparent;
  color: #ffffff;
}
.sp-scene[data-ink="duotone"] .sp-chip { background: #f8fafc; }
.sp-slot { display: inline-flex; }
.sp-inline {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
}
.sp-inline svg { flex: none; }
.sp-locked {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: inherit;
  opacity: 0.85;
}
.sp-note {
  max-width: 480px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.sp-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
@media (prefers-reduced-motion: reduce) {
  .sp-chip { transition: none; }
}
`,f={bell:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z"}),e.jsx("path",{d:"M10.4 19.8a1.9 1.9 0 0 0 3.2 0"})]}),heart:e.jsx("path",{d:"M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z"}),star:e.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8"}),bolt:e.jsx("path",{d:"M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z"})},g={bell:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z",fill:"currentColor",opacity:"0.2"}),e.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7zM10.4 19.8a1.9 1.9 0 0 0 3.2 0",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),heart:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z",fill:"currentColor",opacity:"0.2"}),e.jsx("path",{d:"M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),star:e.jsxs(e.Fragment,{children:[e.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8",fill:"currentColor",opacity:"0.2"}),e.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]}),bolt:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z",fill:"currentColor",opacity:"0.2"}),e.jsx("path",{d:"M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})};function j(){return e.jsx("svg",{width:0,height:0,style:{position:"absolute"},"aria-hidden":"true",focusable:"false",children:e.jsxs("defs",{children:[Object.entries(f).map(([o,s])=>e.jsx("symbol",{id:`sp-${o}`,viewBox:"0 0 24 24",children:s},o)),Object.entries(g).map(([o,s])=>e.jsx("symbol",{id:`spd-${o}`,viewBox:"0 0 24 24",children:s},o)),e.jsx("symbol",{id:"sp-locked",viewBox:"0 0 24 24",children:e.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8",fill:"gray",stroke:"none"})})]})})}function C({entryId:o,schema:s}){const n=h(o,s),[t,c]=l.useState(()=>n.get("symbol")),[r,d]=l.useState(()=>n.get("ink"));l.useEffect(()=>n.subscribe(()=>{c(n.get("symbol")),d(n.get("ink"))}),[n]);const a=r==="duotone"?`#spd-${t}`:`#sp-${t}`,p={current:"currentColor",inverse:"深底反白",duotone:"Duotone 双层"}[r]??r;return e.jsxs(x,{entryId:o,schema:s,children:[e.jsx(j,{}),e.jsxs("div",{className:"sp-scene","data-ink":r,children:[e.jsxs("div",{className:"sp-chip",children:[[16,24,32].map(i=>e.jsx("span",{className:"sp-slot",children:e.jsx("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("use",{href:a})})},i)),e.jsxs("span",{className:"sp-inline",children:["行内 16px",e.jsx("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("use",{href:a})}),"与文字同色"]}),e.jsxs("span",{className:"sp-locked",children:[e.jsx("svg",{width:24,height:24,viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("use",{href:"#sp-locked"})}),"写死 fill"]})]}),e.jsxs("div",{className:"sp-readout","aria-live":"polite",children:["symbol=",t," · ink=",p," · instances=16/24/32/inline(+locked)"]}),e.jsxs("p",{className:"sp-note",children:["宿主 chip 只有一处 color 声明:四个 ",e.jsx("code",{children:"<use>"})," 实例全部经 currentColor 同步换色;「写死 fill」的 path 始终 gray——引用时已定义属性被忽略(MDN use 规则)。 Duotone 靠换 symbol 引用(背景层 opacity 0.2 是 Phosphor 官方实测配方),而非对克隆树写 CSS。 One color declaration re-inks every use instance via currentColor; a hardcoded fill ignores the host color (MDN use shadowing); duotone swaps the symbol reference instead of styling the clone tree."]}),e.jsx("style",{children:u})]})]})}export{C as default};
