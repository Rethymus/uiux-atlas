import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as E}from"./color.DuEPkvq5.js";import{D as T}from"./DemoStage.vW1CgYCd.js";const N=2500,C=`
.vr-field { position: absolute; inset: 0; }
.vr-grid {
  position: absolute;
  left: 50%;
  top: 44%;
  translate: -50% -50%;
  display: grid;
  grid-template-columns: repeat(4, 56px);
  gap: 10px;
}
.vr-tile {
  width: 56px;
  height: 56px;
  border: 0;
  border-radius: 10px;
  background: oklch(0.6 0 0 / 0.45);
  cursor: pointer;
  padding: 0;
}
.vr-tile[data-masked="true"] { background: oklch(0.75 0 0 / 0.4); cursor: default; }
.vr-tile[data-odd="true"][data-cue="color"] { background: oklch(0.58 0.17 300); }
.vr-tile[data-odd="true"][data-cue="shape"] { border-radius: 50%; background: oklch(0.6 0 0 / 0.55); }
.vr-tile[data-odd="true"][data-cue="motion"] { animation: vr-pulse 1.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .vr-tile[data-odd="true"][data-cue="motion"] {
    animation: none;
    outline: 3px solid oklch(0.58 0.17 300);
    outline-offset: 2px;
  }
}
@keyframes vr-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}
.vr-status {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 34%;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.6;
}
.vr-score {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.8;
  font-variant-numeric: tabular-nums;
}
.vr-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .vr-score { display: none; }
  .vr-grid { grid-template-columns: repeat(4, 48px); }
  .vr-tile { width: 48px; height: 48px; }
}
`;function O({entryId:p,schema:m}){const a=E(p,m),[c,k]=r.useState(()=>a.get("tiles")),[l,b]=r.useState(()=>a.get("cue")),[s,h]=r.useState("idle"),[x,v]=r.useState(-1),[i,f]=r.useState(null),[w,j]=r.useState({color:{ok:0,total:0},shape:{ok:0,total:0},motion:{ok:0,total:0}}),n=r.useRef([]),d=r.useRef(l);d.current=l,r.useEffect(()=>a.subscribe(()=>{k(a.get("tiles")),b(a.get("cue"))}),[a]),r.useEffect(()=>()=>n.current.forEach(o=>window.clearTimeout(o)),[]);const g=()=>{n.current.forEach(t=>window.clearTimeout(t)),n.current=[],f(null),v(Math.floor(Math.random()*c)),h("show");const o=window.setTimeout(()=>h("mask"),N);n.current.push(o)},y=o=>{if(s!=="mask"||i)return;const t=o===x;f({ok:t,at:o}),j(u=>({...u,[d.current]:{ok:u[d.current].ok+(t?1:0),total:u[d.current].total+1}}));const S=window.setTimeout(g,1200);n.current.push(S)};return e.jsx(T,{entryId:p,schema:m,children:e.jsxs("div",{className:"vr-field",children:[e.jsxs("p",{className:"vr-status",children:[s==="idle"&&e.jsxs(e.Fragment,{children:["记住那个「不一样」的块",e.jsx("br",{}),e.jsx("button",{type:"button",onClick:g,style:{marginTop:8,border:0,borderRadius:9,padding:"7px 16px",background:"oklch(0.55 0.13 250)",color:"#fff",cursor:"pointer",fontSize:13},children:"开始一轮 Start"})]}),s==="show"&&"仔细看… Watch closely…",s==="mask"&&!i&&"哪个位置不一样? Which position was different?",i&&e.jsxs("span",{style:{color:i.ok?"oklch(0.45 0.13 150)":"oklch(0.55 0.19 25)"},children:[i.ok?"✔ 正确 Correct":"✕ 错了 Wrong"," — 下一轮…"]})]}),e.jsx("div",{className:"vr-grid",style:{gridTemplateColumns:`repeat(${Math.max(2,Math.ceil(c/4))}, 56px)`},role:"group","aria-label":"异类记忆网格 Oddball memory grid",children:Array.from({length:c},(o,t)=>e.jsx("button",{type:"button",className:"vr-tile","data-cue":l,"data-odd":s==="show"&&t===x,"data-masked":s==="mask","aria-label":s==="mask"?`位置 ${t+1}`:void 0,onClick:()=>y(t)},t))}),e.jsxs("aside",{className:"vr-score",children:[e.jsx("b",{children:"按线索统计 By cue"}),Object.entries(w).map(([o,t])=>e.jsxs("p",{style:{margin:0},children:[o===l?"▶ ":"",o,": ",t.ok,"/",t.total]},o))]}),e.jsx("p",{className:"vr-hint",children:"展示 2.5 秒后全部遮罩;分别用三种线索各打几轮,对比记忆命中率——与众不同者最容易被记住。 Watch 2.5s, then all mask. Play a few rounds per cue and compare — the different one is remembered."}),e.jsx("style",{children:C})]})})}export{O as default};
