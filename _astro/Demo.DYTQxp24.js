import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as $}from"./DemoStage.vW1CgYCd.js";const N=[3,4,6,5,4,5,4,3],F=`
.pe-field { position: absolute; inset: 0; }
.pe-chart {
  position: absolute;
  left: 50%;
  top: 46%;
  translate: -50% -50%;
  width: min(380px, calc(100% - 200px));
}
.pe-curve {
  fill: none;
  stroke: oklch(0.55 0.13 250);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: d 0.3s ease;
}
.pe-area { fill: oklch(0.55 0.13 250 / 0.12); }
.pe-dot { fill: oklch(0.55 0.13 250); }
.pe-dot-peak { fill: oklch(0.62 0.16 300); }
.pe-dot-end { fill: oklch(0.62 0.16 145); }
.pe-label { font-size: 11px; fill: oklch(0.35 0.02 250); }
.pe-bars {
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: min(320px, calc(100% - 220px));
  font-size: 12px;
}
.pe-bar-row { display: grid; grid-template-columns: 110px 1fr 34px; gap: 8px; align-items: center; margin-top: 6px; }
.pe-bar { height: 12px; border-radius: 6px; background: oklch(0.9 0.01 250); overflow: hidden; }
.pe-bar > i {
  display: block;
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}
.pe-bar-avg > i { background: oklch(0.65 0.08 250); }
.pe-bar-peakend > i { background: oklch(0.62 0.15 145); }
.pe-presets {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 158px;
  display: grid;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.pe-presets button {
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 8px;
  padding: 5px 8px;
  background: oklch(1 0 0 / 0.7);
  font-size: 12px;
  cursor: pointer;
  text-align: left;
}
.pe-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
@media (max-width: 480px) {
  .pe-presets { display: none; }
  .pe-chart { width: calc(100% - 24px); top: 34%; }
  .pe-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pe-curve, .pe-bar > i { transition: none; }
}
`;function D({entryId:b,schema:u}){const o=w(b,u),[r,k]=l.useState(()=>o.get("peak")),[p,f]=l.useState(()=>o.get("ending"));l.useEffect(()=>o.subscribe(()=>{k(o.get("peak")),f(o.get("ending"))}),[o]);const d=t=>{t==="smooth"&&(o.set("peak",5),o.set("ending",4)),t==="finale"&&(o.set("peak",6),o.set("ending",9)),t==="cliff"&&(o.set("peak",8),o.set("ending",2)),o.set("preset",t==="custom"?"custom":t)},c=l.useMemo(()=>N.map((t,s)=>s===2?r:s===7?p:t),[r,p]),x=380,n=190,a=26,i=c.map((t,s)=>{const y=a+s*(x-2*a)/7,v=n-a-(t-1)/9*(n-2*a);return{x:y,y:v,v:t}}),g=i.map((t,s)=>`${s===0?"M":"L"}${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(" "),j=`${g} L${i[7].x.toFixed(1)},${n-a} L${i[0].x.toFixed(1)},${n-a} Z`,h=c.reduce((t,s)=>t+s,0)/c.length,m=(r+p)/2;return e.jsx($,{entryId:b,schema:u,children:e.jsxs("div",{className:"pe-field",children:[e.jsx("p",{className:"pe-note",children:"一段 8 时刻的旅程:拖动右侧参数改「峰值」与「结尾」,看记忆预测与全程平均的分道扬镳。 An 8-moment journey: drag the params and watch memory diverge from the average."}),e.jsxs("svg",{className:"pe-chart",viewBox:`0 0 ${x} ${n}`,role:"img","aria-label":`体验曲线:峰值 ${r} 级,结尾 ${p} 级,全程平均 ${h.toFixed(1)},峰终预测 ${m.toFixed(1)}`,children:[e.jsx("line",{x1:a,y1:n-a,x2:x-a,y2:n-a,stroke:"oklch(0.5 0 0 / 0.3)"}),e.jsx("path",{className:"pe-area",d:j}),e.jsx("path",{className:"pe-curve",d:g}),i.map((t,s)=>e.jsx("circle",{className:s===2?"pe-dot pe-dot-peak":s===7?"pe-dot pe-dot-end":"pe-dot",cx:t.x,cy:t.y,r:s===2||s===7?6:3},s)),e.jsxs("text",{className:"pe-label",x:i[2].x,y:i[2].y-12,textAnchor:"middle",children:["峰 ",r]}),e.jsxs("text",{className:"pe-label",x:i[7].x-8,y:i[7].y-12,textAnchor:"end",children:["终 ",p]})]}),e.jsxs("div",{className:"pe-bars",children:[e.jsxs("div",{className:"pe-bar-row",children:[e.jsx("span",{children:"全程平均 Average"}),e.jsx("span",{className:"pe-bar pe-bar-avg",children:e.jsx("i",{style:{width:`${h*10}%`}})}),e.jsx("b",{children:h.toFixed(1)})]}),e.jsxs("div",{className:"pe-bar-row",children:[e.jsx("span",{children:"峰终预测 (峰+终)/2"}),e.jsx("span",{className:"pe-bar pe-bar-peakend",children:e.jsx("i",{style:{width:`${m*10}%`}})}),e.jsx("b",{children:m.toFixed(1)})]}),e.jsx("p",{style:{margin:"8px 0 0",fontSize:11,opacity:.65},children:"记忆由峰与终主导(Kahneman 1993);(峰+终)/2 为教科书化简。 Memory rides on peak & end (Kahneman 1993); (peak+end)/2 is a textbook simplification."})]}),e.jsxs("div",{className:"pe-presets",role:"group","aria-label":"旅程预设 Journey presets",children:[e.jsx("strong",{children:"预设 Presets"}),e.jsx("button",{type:"button",onClick:()=>d("cliff"),children:"烂尾 Botched (8/2)"}),e.jsx("button",{type:"button",onClick:()=>d("smooth"),children:"平顺 Smooth (5/4)"}),e.jsx("button",{type:"button",onClick:()=>d("finale"),children:"惊喜收尾 Finale (6/9)"})]}),e.jsx("style",{children:F})]})})}export{D as default};
