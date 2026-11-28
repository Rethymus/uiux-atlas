import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.DLkBFFtG.js";import{g as v}from"./color.DuEPkvq5.js";import{D as M}from"./DemoStage.vW1CgYCd.js";const N=`
.demo-stage {
  --ft-size: 48px;
  --ft-distance: 160px;
}
.ft-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 40%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.ft-field {
  position: absolute;
  inset: 0;
}
.ft-start {
  position: absolute;
  left: 20px;
  bottom: 48px;
  padding: 12px 18px;
  border: 1px solid currentColor;
  border-radius: 12px;
  background: oklch(0.55 0.12 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.ft-target {
  position: absolute;
  left: calc(20px + 150px + var(--ft-distance));
  bottom: 96px;
  width: var(--ft-size);
  height: var(--ft-size);
  border: 2px solid oklch(0.45 0.15 150);
  border-radius: 14px;
  background: oklch(0.75 0.15 150);
  color: oklch(0.25 0.05 150);
  font-size: 12px;
  cursor: pointer;
  transition: border-radius 0.15s ease;
}
.ft-target[data-running="true"] {
  animation: ft-pulse 1.2s ease-in-out infinite;
}
.ft-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 190px;
  display: grid;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.ft-panel dt { opacity: 0.6; }
.ft-panel dd { margin: 0 0 4px; font-weight: 650; font-variant-numeric: tabular-nums; }
.ft-log {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  font-size: 11px;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
}
.ft-miss {
  position: absolute;
  left: calc(20px + 150px + var(--ft-distance) + var(--ft-size) / 2);
  bottom: calc(96px + var(--ft-size) / 2);
  translate: -50% 0;
  font-size: 11px;
  color: oklch(0.55 0.2 25);
  opacity: 0;
  pointer-events: none;
}
.ft-field[data-phase="aiming"] .ft-miss[data-flash="true"] { animation: ft-flash 0.5s ease-out; }
@keyframes ft-pulse {
  0%, 100% { box-shadow: 0 0 0 0 oklch(0.75 0.15 150 / 0.55); }
  50% { box-shadow: 0 0 0 8px oklch(0.75 0.15 150 / 0); }
}
@keyframes ft-flash { from { opacity: 1; } to { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .ft-target[data-running="true"] { animation: none; }
  .ft-field[data-phase="aiming"] .ft-miss[data-flash="true"] { animation: none; opacity: 1; }
}
@media (max-width: 480px) {
  .ft-panel { top: auto; bottom: 10px; right: 10px; width: 150px; font-size: 11px; }
  .ft-hint { display: none; }
  .ft-target { bottom: 150px; }
}
`;function P({entryId:o,schema:n}){const r=v(o,n),[i,l]=e.useState("idle"),[c,h]=e.useState(null),[d,g]=e.useState([]),[b,j]=e.useState(0),[k,p]=e.useState(!1),f=e.useRef(0),x=e.useRef([]);e.useEffect(()=>()=>{x.current.forEach(s=>window.clearTimeout(s))},[]);const u=r.get("size"),m=r.get("distance"),z=Math.log2(2*m/u),y=()=>{f.current=performance.now(),l("aiming")},w=()=>{if(i!=="aiming")return;const s=performance.now()-f.current;h(s),g(a=>[{size:u,distance:m,ms:s},...a].slice(0,4)),l("idle")},S=()=>{if(i!=="aiming")return;j(a=>a+1),p(!0);const s=window.setTimeout(()=>p(!1),500);x.current.push(s)};return t.jsxs(M,{entryId:o,schema:n,children:[t.jsxs("div",{className:"ft-field","data-phase":i,onClick:S,children:[t.jsx("button",{type:"button",className:"ft-start",onClick:s=>{s.stopPropagation(),y()},children:i==="aiming"?"移动!Go!":"起点 Start"}),t.jsxs("button",{type:"button",className:"ft-target","data-running":i==="aiming",onClick:s=>{s.stopPropagation(),w()},children:["目标",t.jsx("br",{}),"Target"]}),t.jsx("span",{className:"ft-miss","data-flash":k,children:"MISS ✕"}),t.jsxs("dl",{className:"ft-panel",onClick:s=>s.stopPropagation(),children:[t.jsx("dt",{children:"上次耗时 Last"}),t.jsx("dd",{children:c==null?"—":`${Math.round(c)} ms`}),t.jsx("dt",{children:"难度指数 ID = log₂(2D/W)"}),t.jsxs("dd",{children:[z.toFixed(2)," bit"]}),t.jsx("dt",{children:"脱靶 Misses"}),t.jsx("dd",{children:b}),d.length>0&&t.jsxs(t.Fragment,{children:[t.jsx("dt",{children:"最近成绩 Recent"}),t.jsx("ul",{className:"ft-log",children:d.map((s,a)=>t.jsxs("li",{children:[s.size,"px @",s.distance,"px → ",Math.round(s.ms),"ms"]},a))})]})]}),t.jsx("p",{className:"ft-hint",children:"点击起点后尽快命中目标;把 size 调小、distance 调大,感受耗时与脱靶如何上升。 Click Start, then hit the target. Shrink size and stretch distance to feel time and misses climb."})]}),t.jsx("style",{children:N})]})}export{P as default};
