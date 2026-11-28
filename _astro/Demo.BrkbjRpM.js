import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as v}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const p="Weight you can feel",y=(c,l)=>{const t=c.split(" ");let s=0;return l==="words"?t.map(n=>[{text:n,index:s++}]):t.map(n=>[...n].map(i=>({text:i,index:s++})))},j=`
.demo-stage {
  --kinetic-rise: 600ms;
  --k-wght: 400;
  transition: --k-wght 0.5s;  /* 注册轴的过渡时长取补研 12§6 片段(transition --wght .5s) */
}
@property --k-wght {
  syntax: "<number>";
  inherits: true;
  initial-value: 400;
}
.kt-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 18px 20px; overflow: hidden; }
.kt-headline {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  gap: 0 0.3em;
  font-family: "Inter Variable", system-ui, sans-serif;
  font-size: clamp(30px, 6vw, 52px);
  line-height: 1.25;
  color: var(--text);
  font-variation-settings: "wght" var(--k-wght);
}
.kt-unit-mask { display: inline-block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.kt-unit {
  display: inline-block;
  animation: kt-rise var(--kinetic-rise, 600ms) cubic-bezier(0.2, 0.7, 0.3, 1) both;
}
@keyframes kt-rise {
  from { transform: translateY(110%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
.kt-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.kt-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 16px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.kt-btn:hover { border-color: var(--accent); color: var(--accent); }
.kt-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.kt-chip-accent { border-color: var(--accent); color: var(--accent); }
.kt-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
@media (prefers-reduced-motion: reduce) {
  .kt-unit { animation: none; }
  .demo-stage { transition: none; }
}
`;function I({entryId:c,schema:l}){const t=v(c,l),[s,n]=a.useState(()=>t.get("stagger")),[i,m]=a.useState(()=>t.get("reveal")),[h,g]=a.useState(()=>t.get("wght")),[x,u]=a.useState(0),[f,k]=a.useState(!1);a.useEffect(()=>t.subscribe(()=>{n(t.get("stagger")),m(t.get("reveal")),g(t.get("wght"))}),[t]),a.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>k(r.matches);return o(),r.addEventListener("change",o),()=>r.removeEventListener("change",o)},[]);const b=a.useMemo(()=>y(p,i),[i]);return e.jsxs(w,{entryId:c,schema:l,children:[e.jsxs("div",{className:"kt-stage",children:[e.jsx("h2",{className:"kt-headline","aria-label":p,children:b.map((r,o)=>e.jsx("span",{"aria-hidden":"true",className:"kt-word",style:{whiteSpace:"nowrap",display:"inline-flex"},children:r.map(d=>e.jsx("span",{className:"kt-unit-mask",children:e.jsx("span",{className:"kt-unit",style:{animationDelay:`${d.index*s}ms`},children:d.text})},d.index))},o))},x),e.jsxs("div",{className:"kt-toolbar",children:[e.jsx("button",{type:"button",className:"kt-btn",onClick:()=>u(r=>r+1),children:"重播 Replay"}),e.jsxs("span",{className:"kt-chip",children:["wght → ",h]}),e.jsxs("span",{className:"kt-chip",children:["stagger ",s,"ms · rise 600ms · ",i]}),e.jsx("span",{className:"kt-chip kt-chip-accent",children:"Inter Variable wght 轴 / wght axis"}),f&&e.jsx("span",{className:"kt-chip",children:"reduced-motion: 揭示与轴过渡关闭 / rise & axis transition off"})]}),e.jsx("p",{className:"kt-hint",children:"拖动 wght 参数:标题字重经注册轴变量以 0.5s 平滑过渡(字体为打包的 Inter Variable);「重播」重跑逐字上升——每个字符在 overflow hidden 的 mask 里从下方升起,间隔按 stagger 交错 / drag the wght param and the headline weight glides over 0.5s on the registered axis (bundled Inter Variable); Replay re-runs the per-character rise — each char climbs out of an overflow-hidden mask, staggered by the interval."})]}),e.jsx("style",{children:j})]})}export{I as default};
