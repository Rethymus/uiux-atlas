import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as b}from"./DemoStage.vW1CgYCd.js";const h={"emphasized-500":{ms:500,bezier:"cubic-bezier(0.2, 0, 0, 1)",official:!1,type:{zh:"起止均在屏内(大面积)",en:"Both ends on-screen (large area)"},note:{zh:"Emphasized 本体 CSS 无等价贝塞尔(官方标注 N/A),此处按官方口径以 Standard 兜底",en:"Emphasized has no CSS bezier equivalent (officially N/A) — Standard fallback per official guidance"}},"emph-decel-400":{ms:400,bezier:"cubic-bezier(0.05, 0.7, 0.1, 1)",official:!0,type:{zh:"进入屏幕",en:"Entering the screen"},note:{zh:"峰值速度起、缓停收尾",en:"Peaks speed early, settles gently"}},"emph-accel-200":{ms:200,bezier:"cubic-bezier(0.3, 0, 0.8, 0.15)",official:!0,type:{zh:"永久退出屏幕",en:"Permanent exit"},note:{zh:"静止起、峰值速度止——暗示不可找回",en:"Rest to peak speed — signals irretrievability"}},"standard-300":{ms:300,bezier:"cubic-bezier(0.2, 0, 0, 1)",official:!0,type:{zh:"起止均在屏内(小面积)",en:"Both ends on-screen (small area)"},note:{zh:"小工具类通用配对",en:"The general pairing for small utility transitions"}},"std-decel-250":{ms:250,bezier:"cubic-bezier(0, 0, 0, 1)",official:!0,type:{zh:"进入屏幕",en:"Entering the screen"},note:{zh:"小件进入的官方档",en:"The official tier for small entering items"}},"std-accel-200":{ms:200,bezier:"cubic-bezier(0.3, 0, 1, 1)",official:!0,type:{zh:"退出屏幕",en:"Exiting the screen"},note:{zh:"退出比进入更快,注意力还给下一任务",en:"Exits are faster than enters, handing attention back"}}},g=`
.ep-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.ep-stage {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 12px;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 6%, transparent) 1px, transparent 1px) 0 0 / 40px 100%,
    var(--surface);
  display: flex; align-items: center;
}
.ep-slider {
  translate: var(--ep-travel, 120px) 0;
  width: 132px; padding: 12px 14px; border-radius: 12px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--accent) 14%, var(--surface));
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.12);
}
.ep-slider h3 { margin: 0 0 3px; font-size: 13px; font-weight: 650; }
.ep-slider p { margin: 0; font-size: 11px; line-height: 1.5; color: var(--text-dim); }
.ep-run { animation: ep-slide both; }
@keyframes ep-slide {
  from { translate: 0 0; opacity: 0.35; }
  to { translate: var(--ep-travel, 120px) 0; opacity: 1; }
}
.ep-scene[data-reduced="true"] .ep-run { animation: none; }
.ep-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.ep-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.ep-chip-type { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.ep-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
.ep-btn {
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
`;function N({entryId:o,schema:c}){const n=u(o,c),p=()=>n.get("pair"),[t,m]=a.useState(p),[f,d]=a.useState(0),[l,x]=a.useState(!1);a.useEffect(()=>n.subscribe(()=>{m(p()),d(i=>i+1)}),[n]),a.useEffect(()=>{const i=window.matchMedia("(prefers-reduced-motion: reduce)"),s=()=>x(i.matches);return s(),i.addEventListener("change",s),()=>i.removeEventListener("change",s)},[]);const r=h[t]??h["emphasized-500"];return e.jsx(b,{entryId:o,schema:c,children:e.jsxs("div",{className:"ep-scene","data-reduced":l,children:[e.jsx("div",{className:"ep-stage",children:e.jsxs("div",{className:"ep-slider ep-run",style:{animationDuration:`${r.ms}ms`,animationTimingFunction:r.bezier},children:[e.jsx("h3",{children:"采样滑块 Sample slider"}),e.jsx("p",{children:"时长与曲线来自所选官方配对 / Duration and curve follow the selected official pair."})]},`${t}-${f}`)}),e.jsxs("div",{className:"ep-readout",children:[e.jsx("button",{type:"button",className:"ep-btn",onClick:()=>d(i=>i+1),children:"重播 Replay"}),e.jsxs("span",{className:"ep-chip",children:[t," = ",r.ms,"ms"]}),e.jsx("span",{className:"ep-chip",children:r.bezier}),e.jsxs("span",{className:"ep-chip ep-chip-type",children:[r.type.zh," / ",r.type.en]}),!r.official&&e.jsxs("span",{className:"ep-chip ep-chip-note",children:["⚠ ",r.note.zh," / ",r.note.en]}),r.official&&e.jsxs("span",{className:"ep-chip ep-chip-note",children:[r.note.zh," / ",r.note.en]}),l&&e.jsx("span",{className:"ep-chip",children:"reduced-motion: 直出终态 / final state rendered directly"})]}),e.jsx("style",{children:g})]})})}export{N as default};
