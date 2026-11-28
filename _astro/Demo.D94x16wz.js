import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as y}from"./DemoStage.vW1CgYCd.js";function E({entryId:o,schema:d}){const r=w(o,d),f=()=>({stdDeviation:r.get("stdDeviation"),alphaSlope:r.get("alphaSlope"),alphaIntercept:r.get("alphaIntercept"),composite:r.get("composite"),duration:r.get("duration")}),[t,m]=i.useState(f),[b,v]=i.useState("dark"),[c,p]=i.useState("left"),[n,k]=i.useState(!1),l=i.useRef(t);l.current=t;const u=i.useRef("dark"),s=i.useRef(null),h=a=>{u.current=a,v(a),p(a==="dark"?"left":"right")},j=()=>{s.current!==null&&(window.clearTimeout(s.current),s.current=null);const a=u.current==="dark"?"light":"dark";if(p(a==="dark"?"left":"right"),n||l.current.duration<=0){h(a);return}s.current=window.setTimeout(()=>{s.current=null,h(a)},Math.max(0,l.current.duration))};i.useEffect(()=>r.subscribe(()=>{m(f())}),[r]),i.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),g=()=>k(a.matches);return g(),a.addEventListener("change",g),()=>a.removeEventListener("change",g)},[]),i.useEffect(()=>()=>{s.current!==null&&window.clearTimeout(s.current)},[]);const x=`goo-${o.replace(/[^a-z0-9]+/gi,"-")}`;return e.jsx(y,{entryId:o,schema:d,children:e.jsxs("div",{className:"gf-stage","data-fx-stage":"","data-fx-theme":b,"data-fx-duration":n?"0":String(Math.max(0,Math.round(t.duration))),"data-reduced":n?"true":"false",style:{"--gf-dur":`${t.duration}ms`},children:[e.jsx("svg",{width:"0",height:"0","aria-hidden":"true",focusable:"false",style:{position:"absolute"},children:e.jsxs("filter",{id:x,x:"-30%",y:"-40%",width:"160%",height:"180%",children:[e.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:t.stdDeviation,result:"blur"}),e.jsx("feColorMatrix",{in:"blur",type:"matrix",values:`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${t.alphaSlope} ${t.alphaIntercept}`,result:"goo"}),t.composite==="atop"?e.jsx("feComposite",{in:"SourceGraphic",in2:"goo",operator:"atop"}):e.jsx("feBlend",{in:"SourceGraphic",in2:"goo"})]})}),e.jsxs("div",{className:"gf-page",children:[e.jsx("p",{className:"gf-title",children:"Gooey 液态切换钮 Gooey Toggle"}),e.jsxs("div",{className:"gf-chips","aria-hidden":"true",children:[e.jsxs("span",{className:"gf-chip",children:["stdDeviation ",t.stdDeviation,"px"]}),e.jsxs("span",{className:"gf-chip",children:["alpha ×",t.alphaSlope," ",t.alphaIntercept]}),e.jsx("span",{className:"gf-chip",children:t.composite==="atop"?"feComposite atop":"feBlend"}),e.jsx("span",{className:"gf-chip",children:n?"duration 0 (reduce)":`${t.duration}ms`}),e.jsx("span",{className:"gf-chip",children:c==="left"?"端:左 left":"端:右 right"})]}),e.jsx("p",{className:"gf-note",children:"滑块滑向另一端时膜颈拉伸、到位与锚球融合;融合临界间隙 ≈ 1σ~1.3σ / The knob stretches a goo neck toward the far anchor and fuses on arrival; the critical fusion gap is ≈ 1σ–1.3σ. Click again mid-slide — the slide retargets instantly."})]}),e.jsx("div",{className:"gf-liquid-wrap",children:e.jsx("div",{className:"gf-track","aria-hidden":"true",children:e.jsxs("div",{className:"gf-liquid","data-side":c,style:{filter:`url(#${x})`},children:[e.jsx("span",{className:"gf-anchor gf-anchor-left"}),e.jsx("span",{className:"gf-anchor gf-anchor-right"}),e.jsx("span",{className:"gf-sat gf-sat-a"}),e.jsx("span",{className:"gf-sat gf-sat-b"}),e.jsx("span",{className:"gf-knob"})]})})}),e.jsx("button",{type:"button",className:"gf-toggle","data-fx-toggle":!0,onClick:j,children:"切换主题 Toggle"}),e.jsx("style",{children:N})]})})}const N=`
/* 舞台主题令牌只作用于本舞台(不动站点主题);data-fx-theme 切换令牌组 */
.gf-stage {
  position: absolute; inset: 0; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; padding: var(--plate-h, 40px) 8px 8px;
  --gf-bg-dark: #12161f;
  --gf-bg-light: #eef1f6;
  --gf-fg-dark: #e8ecf4;
  --gf-fg-light: #1b2230;
  --gf-line-dark: rgba(255, 255, 255, 0.16);
  --gf-line-light: rgba(15, 23, 42, 0.16);
  --gf-panel-dark: rgba(255, 255, 255, 0.06);
  --gf-panel-light: rgba(15, 23, 42, 0.05);
  /* 液体色 = demo 设计值:两主题下都对轨道底色高对比 */
  --gf-liquid-dark: #d8e4f6;
  --gf-liquid-light: #26324a;
  background: var(--gf-bg-dark);
  color: var(--gf-fg-dark);
}
.gf-stage[data-fx-theme="light"] { background: var(--gf-bg-light); color: var(--gf-fg-light); }
.gf-stage[data-fx-theme="dark"] { --gf-liquid: var(--gf-liquid-dark); --gf-line: var(--gf-line-dark); --gf-panel: var(--gf-panel-dark); }
.gf-stage[data-fx-theme="light"] { --gf-liquid: var(--gf-liquid-light); --gf-line: var(--gf-line-light); --gf-panel: var(--gf-panel-light); }
.gf-page {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; gap: 7px; align-items: center;
  pointer-events: none;
}
.gf-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.gf-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; font-size: 12px; font-variant-numeric: tabular-nums; }
.gf-chip { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--gf-line); background: var(--gf-panel); }
.gf-note { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.75; text-align: center; }
/* 轨道(不进滤镜);.gf-liquid 是唯一套 goo 的容器(原方三诫:滤镜加容器、留出血区)
   —— inset:-24px 让容器比内容大一圈,blur 光晕不触容器边 */
.gf-liquid-wrap { flex: 0 0 auto; }
.gf-track {
  position: relative; width: 236px; height: 68px;
  border: 1px solid var(--gf-line); border-radius: 999px;
}
.gf-liquid { position: absolute; inset: -24px; }
.gf-liquid span { position: absolute; background: var(--gf-liquid); border-radius: 50%; will-change: translate; }
/* 以下坐标均相对出血容器(轨道坐标 + 24);两端锚球与滑块同径:到位即完全重合 = 融合 */
.gf-anchor { width: 52px; height: 52px; top: 31px; }
.gf-anchor-left { left: 31px; }
.gf-anchor-right { left: 200px; }
/* 滑块:translate 过渡(§6.4 逐字曲线);data-side 挂在 .gf-liquid 容器上统一驱动;
   行程 169px 到位恰与右锚球重合 */
.gf-knob { width: 52px; height: 52px; left: 31px; top: 31px;
  transition-property: translate; transition-duration: var(--gf-dur, 300ms);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.gf-liquid[data-side="right"] .gf-knob { translate: 169px 0; }
/* 跟随液滴:延迟过渡制造「拖尾膜颈」,到位后与锚球贴合(间隙 ≤ 融合阈值 ≈ 1σ) */
.gf-sat-a { width: 20px; height: 20px; left: 58px; top: 47px;
  transition-property: translate; transition-duration: var(--gf-dur, 300ms); transition-delay: 55ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.gf-liquid[data-side="right"] .gf-sat-a { translate: 118px 0; }
.gf-sat-b { width: 12px; height: 12px; left: 88px; top: 51px;
  transition-property: translate; transition-duration: var(--gf-dur, 300ms); transition-delay: 110ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.gf-liquid[data-side="right"] .gf-sat-b { translate: 106px 0; }
.gf-stage[data-reduced="true"] .gf-knob,
.gf-stage[data-reduced="true"] .gf-sat-a,
.gf-stage[data-reduced="true"] .gf-sat-b { transition-duration: 0s; transition-delay: 0s; }
.gf-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--gf-line); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--gf-panel); color: inherit;
}
.gf-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`;export{E as default};
