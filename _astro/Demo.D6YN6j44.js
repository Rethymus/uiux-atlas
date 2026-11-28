import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as C}from"./color.DuEPkvq5.js";import{D}from"./DemoStage.vW1CgYCd.js";const H=`
.gg-field { position: absolute; inset: 0; }
.gg-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 24%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
.gg-card {
  position: absolute;
  left: 44%;
  top: 50%;
  translate: -50% -50%;
  width: 336px;
  padding: 16px 18px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.85);
}
.gg-card h3 { margin: 0 0 10px; font-size: 14px; font-weight: 650; }
.gg-stamps { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
.gg-stamp {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: 1.5px dashed oklch(0.5 0 0 / 0.4);
  border-radius: 50%;
  font-size: 11px;
  color: oklch(0.4 0 0 / 0.55);
  background: transparent;
}
.gg-stamp[data-pre="true"] {
  border-style: solid;
  border-color: oklch(0.62 0.12 85 / 0.65);
  background: oklch(0.62 0.12 85 / 0.16);
  color: oklch(0.45 0.1 85);
  animation: gg-pop 0.25s ease-out both;
}
.gg-stamp[data-hit="true"] {
  border-style: solid;
  border-color: oklch(0.55 0.13 250);
  background: oklch(0.55 0.13 250 / 0.16);
  color: oklch(0.45 0.12 250);
  font-weight: 700;
  animation: gg-pop 0.25s ease-out both;
}
.gg-progress {
  height: 10px;
  border-radius: 5px;
  background: oklch(0.9 0.01 250);
  overflow: hidden;
  margin-bottom: 4px;
}
.gg-progress > i {
  display: block;
  height: 100%;
  border-radius: 5px;
  background: oklch(0.55 0.13 250);
  transition: width 0.3s ease;
}
.gg-readout { margin: 0 0 10px; font-size: 12px; }
.gg-readout b { font-variant-numeric: tabular-nums; }
.gg-punch {
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 9px 0;
  font-size: 13px;
  font-weight: 650;
  color: #fff;
  background: oklch(0.55 0.13 250);
  cursor: pointer;
}
.gg-punch[data-done="true"] { background: oklch(0.62 0.14 145); }
.gg-done {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 650;
  color: oklch(0.45 0.13 145);
  animation: gg-pop 0.3s ease-out both;
}
.gg-panel {
  position: absolute;
  right: 12px;
  top: 36px;
  width: 196px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.gg-panel h4 { margin: 0 0 8px; font-size: 12px; }
.gg-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 64px;
  padding-bottom: 2px;
  border-bottom: 1px solid oklch(0.5 0 0 / 0.3);
  margin-bottom: 8px;
}
.gg-bars i {
  flex: 1;
  min-width: 6px;
  max-width: 14px;
  border-radius: 2px 2px 0 0;
  background: oklch(0.55 0.13 250 / 0.8);
  transition: height 0.3s ease;
}
.gg-stats { margin: 0; font-size: 11px; line-height: 1.6; opacity: 0.8; font-variant-numeric: tabular-nums; }
.gg-cap { margin: 8px 0 0; font-size: 10px; line-height: 1.5; opacity: 0.6; }
@keyframes gg-pop {
  from { transform: scale(0.5); opacity: 0.3; }
  to { transform: scale(1); opacity: 1; }
}
@media (max-width: 720px) {
  .gg-note { display: none; }
  .gg-card { left: 50%; }
  .gg-panel { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .gg-stamp, .gg-done { animation: none; }
  .gg-progress > i, .gg-bars i { transition: none; }
}
`;function I({entryId:m,schema:u}){const i=C(m,u),[t,v]=o.useState(()=>i.get("steps")),[p,y]=o.useState(()=>i.get("headStart")),[b,f]=o.useState(()=>performance.now()),[k,c]=o.useState(0),[a,h]=o.useState([]),[S,x]=o.useState(!1);o.useEffect(()=>i.subscribe(()=>{v(i.get("steps")),y(i.get("headStart"))}),[i]),o.useEffect(()=>{f(performance.now()),c(0),h([]),x(!1)},[t,p]);const n=p+k,g=n>=t,N=Math.max(0,t-n),j=Math.round(Math.min(n,t)/t*100),z=()=>{if(g){f(performance.now()),c(0),h([]),x(!1);return}const d=performance.now(),r=k===0?b:b+a.reduce((s,l)=>s+l,0);h(s=>[...s,Math.round(d-r)]),c(s=>s+1)};o.useEffect(()=>{g&&x(!0)},[g]);const M=a.length>0?a[a.length-1]:null,$=a.length>0?Math.min(...a):null,w=a.length>0?Math.max(...a):null,E=w??1;return e.jsx(D,{entryId:m,schema:u,children:e.jsxs("div",{className:"gg-field",children:[e.jsx("p",{className:"gg-note",children:"Hull 1932/1934 大鼠奔食;Kivetz/Urminsky/Zheng 购买加速与虚幻进度。连续打卡——看你的间隔在收尾是否变短。 Hull 1932/1934; Kivetz et al. Keep punching — watch your intervals shrink near the goal."}),e.jsxs("div",{className:"gg-card",children:[e.jsx("h3",{children:"咖啡集章卡 Punch Card"}),e.jsx("div",{className:"gg-stamps",children:Array.from({length:t},(d,r)=>{const s=r<p,l=!s&&r<n;return e.jsx("span",{className:"gg-stamp","data-pre":s?"true":void 0,"data-hit":l?"true":void 0,title:s?"预盖(人为进度,已如实标注)":l?"已集 ✓":"空格","aria-label":s?`第 ${r+1} 格:预盖(人为进度)`:l?`第 ${r+1} 格:已集`:`第 ${r+1} 格:空`,children:s?"预":l?"✓":""},r)})}),e.jsx("div",{className:"gg-progress",role:"progressbar","aria-valuemin":0,"aria-valuemax":t,"aria-valuenow":Math.min(n,t),"aria-label":`集章进度 ${Math.min(n,t)}/${t}`,children:e.jsx("i",{style:{width:`${j}%`}})}),e.jsxs("p",{className:"gg-readout","aria-live":"polite",children:["已集 ",e.jsxs("b",{children:[Math.min(n,t),"/",t]})," · ",e.jsxs("b",{children:[j,"%"]})," · 还差 ",e.jsx("b",{children:N})," 章",g&&S?e.jsx("span",{className:"gg-done",children:" 达标!奖励到手 ✓"}):null]}),e.jsx("button",{type:"button",className:"gg-punch","data-done":g?"true":void 0,onClick:z,children:g?"再来一轮 Again":"打卡集章 Punch"})]}),e.jsxs("div",{className:"gg-panel",children:[e.jsx("h4",{children:"打卡间隔 Interval(ms)"}),e.jsxs("div",{className:"gg-bars","aria-hidden":"true",children:[a.map((d,r)=>e.jsx("i",{title:`${d} ms`,style:{height:`${Math.max(8,Math.round(d/E*100))}%`}},r)),a.length===0&&e.jsx("i",{style:{height:"8%",background:"transparent"}})]}),e.jsx("p",{className:"gg-stats",children:a.length===0?e.jsx(e.Fragment,{children:"尚无打卡 · 每次打卡记录距上一章的真实毫秒数(第 1 章相对本轮起点)。"}):e.jsxs(e.Fragment,{children:["第 ",a.length," 章间隔 ",e.jsx("b",{children:M})," ms",e.jsx("br",{}),"最短 ",e.jsx("b",{children:$})," · 最长 ",e.jsx("b",{children:w})]})}),e.jsx("p",{className:"gg-cap",children:"柱子随接近目标变短 = 你的目标梯度。间隔为 demo 实测值,非模拟数据。 Bars shrinking toward the goal = your own goal-gradient; real measurements, not simulated."})]}),e.jsx("style",{children:H})]})})}export{I as default};
