import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as h}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";const y=[{x:8,y:14,r:-18,s:1.1},{x:84,y:10,r:24,s:.9},{x:92,y:38,r:-8,s:1.2},{x:16,y:44,r:12,s:.8},{x:62,y:30,r:-30,s:1},{x:34,y:8,r:6,s:.7},{x:6,y:72,r:20,s:1.15},{x:88,y:66,r:-14,s:.85},{x:46,y:84,r:8,s:1.05},{x:26,y:64,r:-26,s:.75},{x:70,y:52,r:16,s:.95},{x:12,y:92,r:-4,s:.9},{x:78,y:88,r:30,s:1.1},{x:52,y:6,r:-12,s:.8}];function x(a){const m=Math.sin(a*127.1+311.7)*43758.5453;return m-Math.floor(m)}function w({motif:a,slot:m,seed:e}){const s=x(e),l=s<.4?"var(--mm-a)":s<.7?"var(--mm-b)":s<.9?"var(--mm-c)":"var(--mm-ink)",o={fill:a==="dot"?l:"none",stroke:l,strokeWidth:"var(--mm-stroke)",transform:`translate(${m.x}px, ${m.y}px) rotate(${m.r}deg) scale(${m.s})`,strokeLinecap:"round",strokeLinejoin:"round"};return a==="dot"?t.jsx("circle",{cx:0,cy:0,r:9,style:o}):a==="zigzag"?t.jsx("polyline",{points:"0,0 8,-10 16,0 24,-10 32,0 40,-10 48,0",style:o}):t.jsx("path",{d:"M0 0 q6 -12 12 0 t12 0 t12 0 t12 0",style:o})}const j=`
.demo-stage {
  --mm-stroke: 3px;
  --mm-turquoise: #3eb8b0;
  --mm-coral: #ff6f61;
  --mm-yellow: #ffd449;
  --mm-ink: #141414;
  --mm-cream: #f6f1e7;
}
.mm-scene {
  --mm-a: var(--mm-turquoise);
  --mm-b: var(--mm-coral);
  --mm-c: var(--mm-yellow);
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--mm-cream);
  color: var(--mm-ink);
}
/* 角色互换:同一四色重排角色,不加第五色 */
.mm-scene[data-palette="shuffle"] {
  --mm-a: var(--mm-coral);
  --mm-b: var(--mm-yellow);
  --mm-c: var(--mm-turquoise);
  background: var(--mm-turquoise);
}
.mm-pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.mm-pattern circle,
.mm-pattern polyline,
.mm-pattern path { stroke-width: var(--mm-stroke); }
.mm-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 48px));
  padding: 22px 24px;
  background: var(--mm-cream);
  border: var(--mm-stroke) solid var(--mm-ink);
  box-shadow: calc(var(--mm-stroke) * 2) calc(var(--mm-stroke) * 2) 0 var(--mm-ink);
  animation: mm-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.mm-scene[data-palette="shuffle"] .mm-card { background: var(--mm-yellow); }
.mm-card h2 {
  margin: 0 0 6px;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  -webkit-text-stroke: calc(var(--mm-stroke) / 3) var(--mm-ink);
}
.mm-card p { margin: 0 0 16px; font-size: 13px; line-height: 1.55; }
.mm-btn {
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--mm-ink);
  background: var(--mm-b);
  border: var(--mm-stroke) solid var(--mm-ink);
  box-shadow: calc(var(--mm-stroke) * 1.5) calc(var(--mm-stroke) * 1.5) 0 var(--mm-ink);
  cursor: pointer;
  transition: translate 0.12s ease, box-shadow 0.12s ease;
}
.mm-btn:hover { translate: -1px -1px; box-shadow: calc(var(--mm-stroke) * 2.5) calc(var(--mm-stroke) * 2.5) 0 var(--mm-ink); }
.mm-btn:active { translate: 2px 2px; box-shadow: 0 0 0 var(--mm-ink); }
.mm-btn:focus-visible { outline: 3px solid var(--mm-a); outline-offset: 3px; }
.mm-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border: 2px solid var(--mm-ink);
  border-radius: 0;
  background: var(--mm-cream);
}
@media (max-width: 480px) {
  .mm-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.mm-toggle button {
  border: 0;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: var(--mm-ink);
  background: transparent;
}
.mm-toggle button[aria-pressed="true"] { background: var(--mm-a); }
.mm-toggle button:focus-visible { outline: 3px solid var(--mm-b); outline-offset: 2px; }
@keyframes mm-in {
  from { opacity: 0; translate: -50% calc(-50% + 14px) rotate(-2deg); }
  to { opacity: 1; translate: -50% -50% rotate(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .mm-card { animation: none; }
  .mm-btn { transition: none; }
}
`;function $({entryId:a,schema:m}){const e=h(a,m),[s,l]=n.useState(()=>e.get("density")),[o,u]=n.useState(()=>e.get("motif")),[g,f]=n.useState(()=>e.get("palette")),[p,b]=n.useState(1);n.useEffect(()=>e.subscribe(()=>{l(e.get("density")),u(e.get("motif")),f(e.get("palette"))}),[e]);const v=n.useMemo(()=>{const r=Math.max(3,Math.min(14,Math.round(s)));return y.map((i,c)=>({slot:i,k:x(c*7+p*13)})).sort((i,c)=>i.k-c.k).slice(0,r).map((i,c)=>({...i.slot,seed:c*17+p*5}))},[s,p]);return t.jsxs(k,{entryId:a,schema:m,children:[t.jsxs("div",{className:"mm-scene","data-palette":g,children:[t.jsx("svg",{className:"mm-pattern","aria-hidden":"true",role:"presentation",children:v.map((r,d)=>t.jsx(w,{motif:o,slot:r,seed:r.seed},`${o}-${p}-${d}`))}),t.jsxs("div",{className:"mm-card",children:[t.jsx("h2",{children:"MEMPHIS"}),t.jsx("p",{children:"之字纹、波点与蚯蚓线拒绝和谐 / Zigzags, dots & squiggles refuse to harmonize."}),t.jsx("button",{type:"button",className:"mm-btn",onClick:()=>b(r=>r+1),children:"Shuffle ↻"})]}),t.jsx("div",{className:"mm-toggle",role:"group","aria-label":"母题切换 Motif switcher",children:["squiggle","zigzag","dot"].map(r=>t.jsx("button",{type:"button","aria-pressed":o===r,onClick:()=>e.set("motif",r),children:r},r))})]}),t.jsx("style",{children:j})]})}export{$ as default};
