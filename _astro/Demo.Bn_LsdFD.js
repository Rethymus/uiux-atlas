import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as R}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";const l=2,N=`
.sv-scene { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 16px; gap: 10px; }
.sv-split {
  flex: 1;
  min-height: 0;
  display: flex;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 12px;
  overflow: hidden;
  background: color-mix(in srgb, currentColor 4%, transparent);
}
.sv-pane-left {
  width: var(--sv-start, 40%);
  min-width: var(--sv-min, 20%);
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  overflow: hidden;
  transition: width 0.15s ease;
}
.sv-divider {
  flex: none;
  width: 10px;
  cursor: ew-resize;
  touch-action: none;
  border: 0;
  padding: 0;
  position: relative;
  background: color-mix(in srgb, currentColor 8%, transparent);
}
.sv-divider::after {
  content: "";
  position: absolute;
  inset: 0 3px;
  border-left: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
  border-right: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
}
.sv-divider:hover, .sv-divider[data-dragging="true"] { background: color-mix(in srgb, currentColor 16%, transparent); }
.sv-divider:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: -2px; }
.sv-pane-right {
  flex: 1;
  min-width: 0;
  container-type: inline-size;
  container-name: sv-card;
  padding: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}
.sv-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
}
.sv-card-media {
  flex: none;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: linear-gradient(135deg, oklch(0.68 0.16 250 / 0.9), oklch(0.72 0.18 160 / 0.85));
}
.sv-card h4 { margin: 0 0 4px; font-size: 14px; line-height: 1.3; }
.sv-card p { margin: 0; font-size: 12px; line-height: 1.5; opacity: 0.75; }
/* 容器查询联动:右栏过窄(≤ 280px)时卡片翻纵排——查询条件必须是字面量 */
@container sv-card (max-width: 280px) {
  .sv-card { flex-direction: column; }
  .sv-card-media { width: 100%; height: 44px; }
}
.sv-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 7px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  color: inherit;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: start;
}
.sv-file[aria-current="true"] { background: color-mix(in srgb, currentColor 12%, transparent); font-weight: 600; }
.sv-file:hover { background: color-mix(in srgb, currentColor 9%, transparent); }
.sv-file-dot { flex: none; width: 8px; height: 8px; border-radius: 3px; }
.sv-readout {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 12px;
  opacity: 0.8;
  font-variant-numeric: tabular-nums;
}
.sv-readout strong { font-weight: 650; }
.sv-hint { font-size: 11px; opacity: 0.55; margin: 0; }
@media (max-width: 480px) {
  .sv-split { flex-direction: column; }
  .sv-pane-left { width: 100% !important; min-height: 0; }
  .sv-divider { width: auto; height: 10px; cursor: ns-resize; }
  .sv-divider::after {
    inset: 3px 0;
    border-left: 0;
    border-right: 0;
    border-top: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
    border-bottom: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
  }
  .sv-pane-right { container-type: inline-size; }
}
@media (prefers-reduced-motion: reduce) {
  .sv-pane-left { transition: none; }
}
`,M=[{id:"api.ts",color:"oklch(0.68 0.16 250)",note:"24 KB"},{id:"store.ts",color:"oklch(0.68 0.18 160)",note:"4 KB"},{id:"panel.tsx",color:"oklch(0.74 0.14 85)",note:"12 KB"},{id:"styles.css",color:"oklch(0.66 0.17 300)",note:"9 KB"},{id:"README.md",color:"oklch(0.6 0.05 260)",note:"2 KB"}];function F({entryId:c,schema:p}){const t=R(c,p),[o,m]=n.useState(()=>t.get("startSize")),[s,b]=n.useState(()=>t.get("minSize")),[a,x]=n.useState(!1),[u,w]=n.useState("api.ts"),[j,y]=n.useState(0),h=n.useRef(null),g=n.useRef(null);n.useEffect(()=>t.subscribe(()=>{m(t.get("startSize")),b(t.get("minSize"))}),[t]),n.useEffect(()=>{const e=g.current;if(!e)return;const i=new ResizeObserver(D=>{for(const C of D)y(Math.round(C.contentRect.width))});return i.observe(e),()=>i.disconnect()},[]);const d=e=>Math.min(100-s,Math.max(s,e)),v=e=>{const i=h.current?.getBoundingClientRect();!i||i.width===0||t.set("startSize",d((e-i.left)/i.width*100))},z=e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),x(!0),v(e.clientX)},S=e=>{a&&v(e.clientX)},f=e=>{a&&(x(!1),e.currentTarget.releasePointerCapture(e.pointerId))},k=e=>{const i=e.shiftKey?l*3:l;e.key==="ArrowLeft"?(e.preventDefault(),t.set("startSize",d(o-i))):e.key==="ArrowRight"?(e.preventDefault(),t.set("startSize",d(o+i))):e.key==="Home"?(e.preventDefault(),t.set("startSize",s)):e.key==="End"&&(e.preventDefault(),t.set("startSize",100-s))};return r.jsxs(E,{entryId:c,schema:p,children:[r.jsxs("div",{className:"sv-scene",children:[r.jsxs("div",{className:"sv-split",ref:h,children:[r.jsx("div",{className:"sv-pane-left",role:"group","aria-label":"文件树 File tree",children:M.map(e=>r.jsxs("button",{type:"button",className:"sv-file","aria-current":u===e.id,onClick:()=>w(e.id),children:[r.jsx("span",{className:"sv-file-dot",style:{background:e.color},"aria-hidden":"true"}),r.jsx("span",{children:e.id}),r.jsx("span",{style:{marginLeft:"auto",opacity:.55,fontSize:11},children:e.note})]},e.id))}),r.jsx("button",{type:"button",className:"sv-divider",role:"separator","aria-orientation":"vertical","aria-label":"调整左右栏宽度 Resize panes","aria-valuemin":s,"aria-valuemax":100-s,"aria-valuenow":Math.round(o),"data-dragging":a,title:"拖拽调整 / 方向键微调 / 双击复位",onPointerDown:z,onPointerMove:S,onPointerUp:f,onPointerCancel:f,onKeyDown:k,onDoubleClick:()=>t.reset()}),r.jsx("div",{className:"sv-pane-right",ref:g,children:r.jsxs("div",{className:"sv-card",children:[r.jsx("div",{className:"sv-card-media","aria-hidden":"true"}),r.jsxs("div",{children:[r.jsx("h4",{children:u}),r.jsx("p",{children:"拖动分隔条:栏宽过了 280px 容器断点,这张卡会在横排/纵排之间翻转——分栏与容器查询联动。"})]})]})})]}),r.jsxs("p",{className:"sv-readout",children:[r.jsxs("span",{children:["左栏 ",r.jsxs("strong",{children:[Math.round(o),"%"]})]}),r.jsxs("span",{children:["下限 ",r.jsxs("strong",{children:[s,"%"]})]}),r.jsxs("span",{children:["右栏实测 ",r.jsxs("strong",{children:[j,"px"]})]}),r.jsx("span",{"aria-hidden":"true",children:"·"}),r.jsxs("span",{children:["方向键 ±",l,"%(Shift ×3)/ Home·End 到夹紧极限 / 双击复位"]})]}),r.jsx("p",{className:"sv-hint",children:"ARIA separator 语义取自 react-resizable-panels README(调研 05§8);卡内 280px 断点为演示基准值,未证实。"})]}),r.jsx("style",{children:N})]})}export{F as default};
