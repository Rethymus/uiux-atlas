import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as B}from"./color.DuEPkvq5.js";import{D}from"./DemoStage.vW1CgYCd.js";const I=6,O=["linear-gradient(135deg, oklch(0.68 0.13 250), oklch(0.5 0.15 262))","linear-gradient(135deg, oklch(0.72 0.13 165), oklch(0.52 0.14 172))","linear-gradient(135deg, oklch(0.74 0.13 60), oklch(0.56 0.15 48))","linear-gradient(135deg, oklch(0.66 0.14 305), oklch(0.5 0.15 318))","linear-gradient(135deg, oklch(0.7 0.13 12), oklch(0.52 0.15 22))","linear-gradient(135deg, oklch(0.68 0.12 200), oklch(0.5 0.13 212))"],T={idle:"待命 idle",first:"① First 记录初态",last:"② Last 到达终态",invert:"③ Invert 反向抵消",play:"④ Play 播放归零",done:"完成 done"},G=`
.demo-stage {
  --flip-duration: 350ms;
  --flip-ease: cubic-bezier(0.2, 0.7, 0.3, 1);
}
.ft-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px 20px; overflow: hidden; }
.ft-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;
}
.ft-tile {
  position: relative;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}
.ft-tile[data-hero="true"] { grid-column: span 2; }
.ft-tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ft-readout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  font-size: 12px;
  color: var(--text-dim);
}
.ft-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ft-chip-accent { border-color: var(--accent); color: var(--accent); }
.ft-actions { display: flex; align-items: center; gap: 10px; }
.ft-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.ft-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.ft-btn:not(:disabled):hover { border-color: var(--accent); color: var(--accent); }
.ft-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;function Q({entryId:R,schema:j}){const d=B(R,j),[p,z]=s.useState(()=>d.get("mode")),[f,h]=s.useState(()=>Array.from({length:I},(e,t)=>t)),[N,E]=s.useState(null),[o,a]=s.useState("idle"),[u,x]=s.useState(null),[m,A]=s.useState(!1),c=s.useRef(new Map),g=s.useRef(new Map),b=s.useRef(new Map),y=s.useRef(p);y.current=p;const v=s.useRef(m);v.current=m;const k=s.useRef(f);k.current=f;const i=s.useRef(N);i.current=N,s.useEffect(()=>d.subscribe(()=>{z(d.get("mode"))}),[d]),s.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>A(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);const L=e=>{e.current.clear();for(const[t,r]of c.current)e.current.set(t,r.getBoundingClientRect())},P=()=>{for(const[e,t]of c.current){const r=g.current.get(e),l=b.current.get(e);if(!r||!l)continue;const S=r.left-l.left,F=r.top-l.top,M=l.width===0?1:r.width/l.width;t.style.transition="none",t.style.transformOrigin="top left",t.style.transform=S===0&&F===0&&M===1?"":`translate(${S}px, ${F}px) scale(${M})`}},w=s.useRef(()=>{});w.current=()=>{for(const[,r]of c.current)r.style.transition=v.current?"none":"transform var(--flip-duration, 350ms) var(--flip-ease, cubic-bezier(0.2, 0.7, 0.3, 1))",r.style.transform="";a("play");const e=c.current.get(k.current[0]);if(!e||v.current){a("done");return}const t=r=>{r.propertyName==="transform"&&(e.removeEventListener("transitionend",t),e.style.transition="",a("done"))};e.addEventListener("transitionend",t)},s.useLayoutEffect(()=>{if(o!=="last"||!i.current)return;L(b);const e=i.current[0],t=g.current.get(e),r=b.current.get(e);t&&r&&x({dx:Math.round((t.left-r.left)*10)/10,dy:Math.round((t.top-r.top)*10)/10,scale:r.width===0?1:Math.round(t.width/r.width*1e3)/1e3}),y.current==="auto"&&(P(),a("invert"),requestAnimationFrame(()=>requestAnimationFrame(()=>w.current())))},[o]);const $=e=>{if(o!=="idle"&&o!=="done")return;const t=k.current;if(t[0]===e)return;L(g);const r=[e,...t.filter(l=>l!==e)];x(null),E(r),i.current=r,y.current==="step"?a("first"):(h(r),a("last"))},C=()=>{if(o==="first"&&i.current){h(i.current),a("last");return}if(o==="last"){P(),a("invert");return}o==="invert"&&w.current()},_=()=>{for(const[,e]of c.current)e.style.transition="none",e.style.transform="";h(Array.from({length:I},(e,t)=>t)),E(null),i.current=null,x(null),a("idle")},q=f[0];return n.jsxs(D,{entryId:R,schema:j,children:[n.jsxs("div",{className:"ft-stage",children:[n.jsx("div",{className:"ft-grid",children:f.map(e=>n.jsx("button",{type:"button",ref:t=>{t?c.current.set(e,t):c.current.delete(e)},className:"ft-tile","data-hero":e===q?"true":void 0,style:{background:O[e]},onClick:()=>$(e),"aria-label":`卡片 ${e+1}:移到首位并放大 / tile ${e+1}: move to front and enlarge`,children:`#${e+1}`},e))}),n.jsxs("div",{className:"ft-readout",children:[n.jsx("span",{className:"ft-chip ft-chip-accent",children:T[o]}),u&&n.jsxs(n.Fragment,{children:[n.jsxs("span",{className:"ft-chip",children:["dx ",u.dx," px"]}),n.jsxs("span",{className:"ft-chip",children:["dy ",u.dy," px"]}),n.jsxs("span",{className:"ft-chip",children:["scale ",u.scale]})]}),m&&n.jsx("span",{className:"ft-chip",children:"reduced-motion: 跳过 Play 直出终态 / Play skipped"})]}),n.jsxs("div",{className:"ft-actions",children:[p==="step"?n.jsx("button",{type:"button",className:"ft-btn",onClick:C,disabled:o==="idle"||o==="done"||o==="play",children:"下一步 Step"}):null,n.jsx("button",{type:"button",className:"ft-btn",onClick:_,disabled:o==="first"||o==="last"||o==="invert",children:"重置 Reset"})]}),n.jsx("p",{className:"ft-hint",children:"点击任意卡片 = FLIP 重排(它移到首位并放大,其余让位);step 模式用「下一步」逐阶段走 First→Last→Invert→Play,读数是主卡的反算值 dx = 初态.left − 终态.left、scale = 初态宽 ÷ 终态宽 / click any tile to FLIP-reorder (it moves to the front and enlarges); in step mode walk First→Last→Invert→Play one phase per click — the readout shows the hero's dx, dy and scale."})]}),n.jsx("style",{children:G})]})}export{Q as default};
