import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as Y}from"./color.DuEPkvq5.js";import{D}from"./DemoStage.vW1CgYCd.js";const b=[{zh:"Surface 表面",varName:"--tf-card"},{zh:"On-Surface 表面文字",varName:"--tf-fg"},{zh:"Primary 主色",varName:"--tf-accent"},{zh:"Primary Container 主色容器",varName:"--tf-accent-c"},{zh:"Surface Variant 表面变体",varName:"--tf-variant"},{zh:"Outline 描边",varName:"--tf-line"}],f=b.length,M=`
.tf-scene {
  position: absolute; inset: 0; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  padding: 8px;
  background: var(--fx-bg); color: var(--fx-fg);
}
/* 主题变量只作用于舞台内部(data-fx-theme 开关),不动站点主题 */
.tf-scene[data-fx-theme="light"] {
  --fx-bg: #f2efe8; --fx-card: #ffffff; --fx-fg: #1f2430;
  --fx-muted: #626b7a; --fx-accent: #6d4fe0; --fx-line: #dcd7cd;
}
.tf-scene[data-fx-theme="dark"] {
  --fx-bg: #14161b; --fx-card: #21252d; --fx-fg: #eceff5;
  --fx-muted: #9aa2b1; --fx-accent: #b3a1ff; --fx-line: #3c434e;
}
.tf-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;
  width: min(520px, calc(100% - 24px));
  perspective: 900px; /* 六张卡共享一个灭点 */
}
.tf-card {
  display: flex; flex-direction: column; gap: 8px; padding: 12px;
  border: 1px solid var(--tf-line); border-radius: 14px;
  background: var(--tf-card); color: var(--tf-fg);
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
/* 单面元素:两套配色变量表由 data-face 驱动(演示配色,文字对比按两套面分别核对) */
.tf-card[data-face="light"] {
  --tf-card: #ffffff; --tf-fg: #1f2430; --tf-line: #dcd7cd; --tf-muted: #626b7a;
  --tf-accent: #6d4fe0; --tf-accent-c: #e6ddff; --tf-variant: #ece8f0;
}
.tf-card[data-face="dark"] {
  --tf-card: #21252d; --tf-fg: #eceff5; --tf-line: #3c434e; --tf-muted: #9aa2b1;
  --tf-accent: #b3a1ff; --tf-accent-c: #3d3163; --tf-variant: #2b303a;
}
/* 两段翻转(曲线/不对称时序出处:调研 20§6.5,加速出 / 减速进 = M3 §5 原则):
   --tf-half-out 默认 200ms(40%)、--tf-half-in 默认 300ms(60%),随 duration 等比缩放 */
.tf-card[data-phase="out"] { animation: tf-out var(--tf-half-out) cubic-bezier(0.4, 0, 1, 1) forwards; }
.tf-card[data-phase="in"] { animation: tf-in var(--tf-half-in) cubic-bezier(0, 0, 0.2, 1) forwards; }
@keyframes tf-out { to { transform: rotateY(calc(var(--tf-sign) * 90deg)); } }
@keyframes tf-in {
  from { transform: rotateY(calc(var(--tf-sign) * 90deg)); }
  to { transform: rotateY(0deg); }
}
.tf-swatch { height: 34px; border-radius: 8px; border: 1px solid var(--tf-line); }
.tf-role { font-size: 12.5px; font-weight: 650; }
.tf-var { font-family: var(--font-mono); font-size: 10.5px; color: var(--tf-muted); }
.tf-meta { margin: 0; font-family: var(--font-mono); font-size: 11px; color: var(--fx-muted); text-align: center; padding: 0 12px; }
.tf-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 2;
  padding: 6px 14px; border: 1px solid var(--fx-line); border-radius: 999px;
  background: var(--fx-card); color: var(--fx-fg);
  font-size: 12px; cursor: pointer;
}
.tf-toggle:focus-visible { outline: 2px solid var(--fx-accent); outline-offset: 2px; }
@media (max-width: 900px) {
  .tf-scene { position: relative; min-height: 320px; padding: var(--plate-h, 40px) 8px 10px; }
}
@media (max-width: 640px) {
  .tf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
/* reduced-motion 双保险:JS 已瞬时换面;万一有相位残留也绝不动画 */
@media (prefers-reduced-motion: reduce) {
  .tf-card { animation: none !important; }
}
`;function J({entryId:y,schema:N}){const l=Y(y,N),w=()=>({stagger:l.get("stagger"),duration:l.get("duration"),direction:l.get("direction")}),[a,A]=r.useState(w),[E,z]=r.useState("light"),[S,i]=r.useState(()=>Array(f).fill("idle")),[R,m]=r.useState(()=>Array(f).fill("light")),[g,O]=r.useState(!1),h=r.useRef([]),o=r.useRef("light");r.useEffect(()=>l.subscribe(()=>A(w())),[l]),r.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),e=()=>O(t.matches);return e(),t.addEventListener("change",e),()=>t.removeEventListener("change",e)},[]);const p=()=>{h.current.forEach(t=>window.clearTimeout(t)),h.current=[]};r.useEffect(()=>()=>p(),[]);const v=Math.round(a.duration*.4),j=a.duration-v,k=a.duration+(f-1)*a.stagger,P=t=>a.direction==="left"?-1:a.direction==="right"||t%2===0?1:-1;r.useEffect(()=>{p(),i(Array(f).fill("idle")),m(Array(f).fill(o.current))},[a.stagger,a.duration,a.direction]),r.useEffect(()=>{g&&(p(),i(Array(f).fill("idle")),m(Array(f).fill(o.current)),z(o.current))},[g]);const T=()=>{const t=o.current,e=t==="light"?"dark":"light";if(o.current=e,p(),z(e),g){i(Array(f).fill("idle")),m(Array(f).fill(e));return}i(Array(f).fill("idle")),m(Array(f).fill(t)),b.forEach((x,d)=>{h.current.push(window.setTimeout(()=>{i(s=>s.map((c,u)=>u===d?"out":c))},d*a.stagger))})},L=t=>{const e=t.target;if(!e.classList.contains("tf-card"))return;const x=Number(e.dataset.index);if(e.dataset.phase==="out"){const d=o.current;i(s=>s.map((c,u)=>u===x?"in":c)),m(s=>s.map((c,u)=>u===x?d:c))}else e.dataset.phase==="in"&&i(d=>d.map((s,c)=>c===x?"idle":s))};return n.jsx(D,{entryId:y,schema:N,children:n.jsxs("div",{className:"tf-scene","data-fx-stage":"","data-fx-theme":E,"data-fx-duration":g?0:k,style:{"--tf-half-out":`${v}ms`,"--tf-half-in":`${j}ms`},children:[n.jsx("div",{className:"tf-grid",onAnimationEnd:L,children:b.map((t,e)=>n.jsxs("div",{className:"tf-card","data-index":e,"data-face":R[e],"data-phase":S[e],style:{"--tf-sign":P(e)},children:[n.jsx("i",{className:"tf-swatch",style:{background:`var(${t.varName})`}}),n.jsx("span",{className:"tf-role",children:t.zh}),n.jsx("span",{className:"tf-var",children:t.varName})]},t.varName))}),n.jsxs("p",{className:"tf-meta",children:["n=",f," · 单卡 ",a.duration,"ms(转出 ",v," + 转回 ",j,")· 错峰"," ",a.stagger,"ms · 总时长 ",k,"ms = duration + (n−1)×stagger"]}),n.jsx("button",{type:"button",className:"tf-toggle","data-fx-toggle":!0,"aria-pressed":E==="dark",onClick:T,children:"切换主题 Toggle theme"}),n.jsx("style",{children:M})]})})}export{J as default};
