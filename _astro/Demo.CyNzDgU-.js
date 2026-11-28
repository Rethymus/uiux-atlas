import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as T}from"./color.DuEPkvq5.js";import{D as $}from"./DemoStage.vW1CgYCd.js";const y=["1月","2月","3月","4月","5月","6月","7月","8月"],d=[42,58,51,67,74,69,83,78],A="#0072B2",C=i=>Math.ceil(i/10)*10,M=C(Math.max(...d)),x=[0,30,60,90],v=600,N=340,a={top:20,right:20,bottom:40,left:46},l=v-a.left-a.right,w=N-a.top-a.bottom,z=5,_=.09,L=`
.ca-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.ca-chart { flex: 1; min-height: 0; display: flex; justify-content: center; }
.ca-chart svg { max-width: 100%; max-height: 100%; color: var(--text); }
/* 动画只落在数据层(.ca-bars);轴/网格层静止 */
.ca-bars {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: ca-grow var(--ca-dur, 1000ms) var(--ca-ease, cubic-bezier(0.165, 0.84, 0.44, 1)) both;
}
.ca-stage[data-entrance="fade"] .ca-bars { animation-name: ca-fade; }
.ca-stage[data-entrance="sweep"] .ca-bars { animation-name: ca-sweep; }
/* 关键帧只写 from:基态 = 终态,不支持动画/减少动效时直出终态 */
@keyframes ca-grow { from { transform: scaleY(0); } }
@keyframes ca-fade { from { opacity: 0; } }
@keyframes ca-sweep {
  from { clip-path: inset(-8% 100% -8% 0); }
  to { clip-path: inset(-8% -2% -8% 0); }
}
@media (prefers-reduced-motion: reduce) {
  .ca-bars { animation: none; }
}
.ca-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.ca-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.ca-chip b { color: var(--text); font-weight: 600; }
.ca-toolbar { position: absolute; right: 12px; top: 12px; display: flex; }
.ca-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: var(--surface);
}
.ca-toolbar button:hover { border-color: var(--text-dim); }
.ca-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 480px) {
  .ca-toolbar { top: auto; bottom: 12px; }
}
`,R={grow:"生长 grow(scaleY 从零基线长出)",fade:"淡入 fade(整组 opacity)",sweep:"扫描 sweep(clip-path 左→右揭示)"};function D({entryId:i,schema:m}){const o=T(i,m),h=()=>({entrance:o.get("entrance"),duration:o.get("duration"),easing:o.get("easing")}),[s,E]=n.useState(h),[f,k]=n.useState(0),[u,p]=n.useState("图表已就绪");n.useEffect(()=>o.subscribe(()=>{E(h())}),[o]);const b=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;n.useEffect(()=>{if(b||s.duration<=0){p("已直出终态(reduce / 0ms)");return}p("入场动画播放中…");const e=setTimeout(()=>p("图表加载完成"),Math.min(s.duration,4e3));return()=>clearTimeout(e)},[f,s.duration,b]);const g=l/d.length*.62,j=e=>a.left+l*(e+.5)/d.length,r=e=>a.top+w*(1-e/M),S=`cubic-bezier(${s.easing.map(e=>Number(e.toFixed(3))).join(", ")})`;return t.jsxs($,{entryId:i,schema:m,children:[t.jsxs("div",{className:"ca-stage","data-entrance":s.entrance,children:[t.jsx("div",{className:"ca-chart",children:t.jsxs("svg",{viewBox:`0 0 ${v} ${N}`,role:"img","aria-label":`柱状图:1-8月数值,入场动效 ${s.entrance} ${s.duration}ms`,children:[x.map(e=>t.jsx("line",{x1:a.left,x2:a.left+l,y1:r(e),y2:r(e),stroke:"currentColor",style:{opacity:_}},e)),t.jsxs("g",{stroke:"#6E7079",strokeWidth:"1",children:[t.jsx("line",{x1:a.left,x2:a.left,y1:a.top,y2:a.top+w}),t.jsx("line",{x1:a.left,x2:a.left+l,y1:r(0),y2:r(0)})]}),x.map(e=>t.jsx("line",{x1:a.left-z,x2:a.left,y1:r(e),y2:r(e),stroke:"#6E7079",strokeWidth:"1"},`tk${e}`)),x.map(e=>t.jsx("text",{x:a.left-8,y:r(e)+4,textAnchor:"end",fontSize:"12",fill:"var(--text-dim)",children:e},`lb${e}`)),y.map((e,c)=>t.jsx("text",{x:j(c),y:r(0)+18,textAnchor:"middle",fontSize:"12",fill:"var(--text-dim)",children:e},e)),t.jsx("g",{className:"ca-bars",children:d.map((e,c)=>t.jsx("g",{children:t.jsx("rect",{x:j(c)-g/2,y:r(e),width:g,height:r(0)-r(e),fill:A,rx:"2",children:t.jsx("title",{children:`${y[c]} · ${e}`})})},c))})]},f)}),t.jsx("div",{className:"ca-toolbar",children:t.jsx("button",{type:"button",onClick:()=>k(e=>e+1),children:"重播 Replay"})}),t.jsxs("div",{className:"ca-readout",children:[t.jsxs("span",{className:"ca-chip",children:["入场 ",t.jsx("b",{children:R[s.entrance]??s.entrance})]}),t.jsxs("span",{className:"ca-chip",children:["时长 ",t.jsxs("b",{children:[s.duration,"ms"]}),"(Chart.js 默认 1000;0 = 直出终态)"]}),t.jsxs("span",{className:"ca-chip",children:["缓动 ",t.jsx("b",{children:S}),"(easeOutQuart 社区近似,未证实)"]}),t.jsx("span",{className:"ca-chip",children:"轴/网格层静止 · resize 不做过渡(Chart.js duration 0 纪律)"}),t.jsx("span",{className:"ca-chip",children:u})]}),t.jsx("span",{className:"ca-sr","aria-live":"polite",children:u})]}),t.jsx("style",{children:L})]})}export{D as default};
