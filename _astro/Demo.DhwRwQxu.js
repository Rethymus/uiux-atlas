import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{D as d}from"./DemoStage.vW1CgYCd.js";import"./color.DuEPkvq5.js";const f=`
.demo-stage {
  --m3-hover-opacity: 8%;
  --m3-focus-opacity: 10%;
  --m3-press-opacity: 10%;
  --m3-drag-opacity: 16%;
  --m3-state-color: #ffffff; /* on-primary,M3 基线亮色(调研 06§7) */
}
.m3-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fffbfe; /* M3 基线亮色 surface(调研 06§7) */
  padding: 16px;
}
.m3-btn {
  position: relative;
  overflow: hidden;
  min-width: 220px;
  padding: 14px 30px;
  border: 0;
  border-radius: 999px;
  background: #6750a4; /* M3 基线亮色 primary(调研 06§7) */
  color: #ffffff;
  font-size: 15px;
  font-weight: 550;
  cursor: pointer;
}
.m3-layer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--m3-state-color);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s linear;
}
.m3-layer[data-state="press"] { z-index: 2; }
.m3-layer[data-state="drag"] { z-index: 3; }
.m3-label { position: relative; z-index: 1; }
.m3-btn[data-hover="on"] .m3-layer[data-state="hover"] { opacity: var(--m3-hover-opacity); }
.m3-btn[data-focus="on"] .m3-layer[data-state="focus"] { opacity: var(--m3-focus-opacity); }
.m3-btn[data-press="on"] .m3-layer[data-state="press"] { opacity: var(--m3-press-opacity); }
.m3-btn[data-drag="on"] .m3-layer[data-state="drag"] { opacity: var(--m3-drag-opacity); }
.m3-btn:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
.m3-controls {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: 260px;
}
.m3-chip {
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: #ffffff;
  color: #1c1b1f;
}
.m3-chip[aria-pressed="true"] {
  background: #6750a4;
  border-color: #6750a4;
  color: #ffffff;
}
.m3-caption { position: absolute; left: 12px; bottom: 12px; font-size: 12px; color: #49454f; max-width: 60%; }
@media (prefers-reduced-motion: reduce) {
  .m3-layer { transition: none; }
}
`,m=[{id:"hover",zh:"Hover 8%",en:"Hover 8%"},{id:"focus",zh:"Focus 10%",en:"Focus 10%"},{id:"press",zh:"Press 10%",en:"Press 10%"},{id:"drag",zh:"Drag 16%",en:"Drag 16%"}];function b({entryId:r,schema:n}){const[e,i]=l.useState({hover:!1,focus:!1,press:!1,drag:!1}),s=o=>i(t=>({...t,[o]:!t[o]})),p=Object.values(e).every(Boolean),c=Object.entries(e).filter(([,o])=>o).length;return a.jsxs(d,{entryId:r,schema:n,children:[a.jsxs("div",{className:"m3-scene",children:[a.jsxs("button",{type:"button",className:"m3-btn","data-hover":e.hover?"on":"off","data-focus":e.focus?"on":"off","data-press":e.press?"on":"off","data-drag":e.drag?"on":"off",onPointerEnter:()=>!e.hover&&s("hover"),onPointerLeave:()=>e.hover&&s("hover"),onPointerDown:()=>!e.press&&s("press"),onPointerUp:()=>e.press&&s("press"),onFocus:()=>!e.focus&&s("focus"),onBlur:()=>e.focus&&s("focus"),children:[a.jsx("span",{className:"m3-layer","data-state":"hover"}),a.jsx("span",{className:"m3-layer","data-state":"focus"}),a.jsx("span",{className:"m3-layer","data-state":"press"}),a.jsx("span",{className:"m3-layer","data-state":"drag"}),a.jsx("span",{className:"m3-label",children:"状态层 State Layers"})]}),a.jsx("div",{className:"m3-controls",role:"group","aria-label":"状态开关 State toggles",children:m.map(o=>a.jsxs("button",{type:"button",className:"m3-chip","aria-pressed":e[o.id],onClick:()=>s(o.id),children:[o.zh," / ",o.en]},o.id))}),a.jsxs("p",{className:"m3-caption",children:["已点亮 ",c,"/4 层——悬停/按下按钮也会真实触发;四层同亮 = 8+10+10+16% 叠加。",p?" All four layers stacked.":""]})]}),a.jsx("style",{children:f})]})}export{b as default};
