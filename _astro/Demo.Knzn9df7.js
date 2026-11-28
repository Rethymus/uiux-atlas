import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as u}from"./DemoStage.vW1CgYCd.js";const x=`
.ov-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 8px 8px 14px; gap: 10px; }
.ov-anchor { margin-bottom: 8px; }
.ov-trigger {
  border: 1px solid transparent; border-radius: 999px; padding: 9px 20px;
  font-size: 13px; font-weight: 600; color: #fff; cursor: pointer;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.ov-trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ov-panel {
  position: absolute; left: 50%; bottom: 96px; translate: -50% 0;
  width: min(320px, calc(100% - 28px));
  padding: 12px 14px; border-radius: 12px;
  background: var(--surface); border: 1px solid var(--border);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
  z-index: 5;
  /* 锚点方向 origin:触发钮在下方 → origin 取 bottom(仿 Radix 语义) */
  transform-origin: var(--tf-origin, bottom);
  opacity: 0;
  transform: translateY(var(--overlay-shift, 8px)) scale(var(--overlay-scale, 0.95));
}
.ov-panel[data-open="true"] {
  animation: ov-in var(--overlay-in-ms, 200ms) var(--overlay-ease, cubic-bezier(0.4, 0, 0.2, 1)) both;
}
.ov-panel[data-open="false"] {
  animation: ov-out var(--overlay-out-ms, 150ms) cubic-bezier(0.4, 0, 1, 1) both;
  pointer-events: none;
}
.ov-panel:focus { outline: none; }
.ov-panel h4 { margin: 2px 0 6px; font-size: 14px; }
.ov-panel p { margin: 0 0 8px; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.ov-item {
  display: block; width: 100%; text-align: left; border: 0; border-radius: 8px;
  padding: 7px 10px; font-size: 13px; color: var(--text); background: transparent; cursor: pointer;
}
.ov-item:hover, .ov-item:focus-visible { background: color-mix(in srgb, var(--border) 45%, transparent); outline: none; }
.ov-state { font-size: 12px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
@keyframes ov-in {
  from { opacity: 0; transform: translateY(var(--overlay-shift, 8px)) scale(var(--overlay-scale, 0.95)); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ov-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(0) scale(var(--overlay-scale, 0.95)); }
}
@media (prefers-reduced-motion: reduce) {
  .ov-panel, .ov-panel[data-open="true"], .ov-panel[data-open="false"] {
    animation: ov-fade 80ms linear both;
  }
}
@keyframes ov-fade { from { opacity: 0; } to { opacity: 1; } }
`;function k({entryId:l,schema:c}){m(l,c);const[o,r]=a.useState(!1),[p,f]=a.useState(0),n=a.useRef(null),s=a.useRef(null);return a.useEffect(()=>{o?n.current?.focus():s.current?.focus()},[o]),a.useEffect(()=>{if(!o)return;const t=i=>{const v=i.target;n.current?.contains(v)||s.current?.contains(v)||r(!1)},d=i=>{i.key==="Escape"&&r(!1)};return document.addEventListener("pointerdown",t),document.addEventListener("keydown",d),()=>{document.removeEventListener("pointerdown",t),document.removeEventListener("keydown",d)}},[o]),e.jsx(u,{entryId:l,schema:c,children:e.jsxs("div",{className:"ov-stage",children:[e.jsxs("div",{className:"ov-panel",ref:n,"data-open":o?"true":"false",role:"dialog","aria-label":"从触发钮弹入的浮层 overlay entering from its trigger","aria-hidden":!o,tabIndex:-1,children:[e.jsx("h4",{children:"浮层 Overlay"}),e.jsxs("p",{children:["初态 scale ","var(--overlay-scale)"," + 位移 ","var(--overlay-shift)"," + fade, origin 取触发钮方向;Esc / 点击外部关闭。"]}),e.jsx("button",{type:"button",className:"ov-item",onClick:()=>r(!1),children:"条目一(点我关闭)Item one"}),e.jsx("button",{type:"button",className:"ov-item",onClick:()=>r(!1),children:"条目二 Item two"})]}),e.jsx("div",{className:"ov-anchor",children:e.jsx("button",{type:"button",className:"ov-trigger",ref:s,"aria-expanded":o,onClick:()=>{r(t=>!t),f(t=>t+1)},children:o?"关闭 Close":"打开浮层 Open overlay"})}),e.jsx("div",{className:"ov-state","aria-live":"off",children:p>0?`打开 ${Math.ceil(p/2)} 次 · 入 --overlay-in-ms / 出 --overlay-out-ms`:"点按钮,看浮层从锚点方向弹入 / Click to pop the overlay from its anchor"}),e.jsx("style",{children:x})]})})}export{k as default};
