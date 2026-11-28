import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as m}from"./index.DLkBFFtG.js";import{g as E}from"./color.DuEPkvq5.js";import{D as R}from"./DemoStage.vW1CgYCd.js";const f=[["搜索","Search"],["浏览","Browse"],["收藏","Save"],["分享","Share"],["导出","Export"],["通知","Notify"],["主题","Themes"],["多语言","Locale"],["离线","Offline"],["协作","Collab"]],_=380,D=210,l=34,c=31,y=22,a=170,L=118,w=140,M=`
.pp-field { position: absolute; inset: 0; }
.pp-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 24%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
.pp-chart {
  position: absolute;
  left: 44%;
  top: 47%;
  translate: -50% -50%;
  width: min(380px, calc(100% - 210px));
}
.pp-chart svg { width: 100%; height: auto; display: block; }
.pp-bar { fill: oklch(0.6 0.04 250 / 0.55); transition: y 0.3s ease, height 0.3s ease; }
.pp-bar-hi { fill: oklch(0.55 0.13 250); }
.pp-cum {
  fill: none;
  stroke: oklch(0.62 0.15 145);
  stroke-width: 2;
  transition: d 0.3s ease;
}
.pp-ref { stroke: oklch(0.5 0 0 / 0.45); stroke-dasharray: 4 4; }
.pp-base { stroke: oklch(0.5 0 0 / 0.3); }
.pp-label { font-size: 9px; fill: oklch(0.35 0.02 250); }
.pp-axis { font-size: 9px; fill: oklch(0.45 0.05 145); }
.pp-inline {
  margin: 4px 0 0;
  font-size: 11px;
  line-height: 1.6;
  opacity: 0.8;
  font-variant-numeric: tabular-nums;
}
.pp-panel {
  position: absolute;
  right: 12px;
  top: 36px;
  width: 176px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.pp-panel h4 { margin: 0 0 6px; font-size: 12px; }
.pp-panel .pp-big { font-size: 15px; font-weight: 700; }
.pp-panel ol { margin: 6px 0 0; padding: 0; list-style: none; }
.pp-panel li {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  font-size: 11px;
  line-height: 1.7;
}
.pp-tag {
  font-size: 9px;
  padding: 0 4px;
  border-radius: 4px;
  border: 1px solid oklch(0.55 0.13 250);
  color: oklch(0.45 0.12 250);
}
.pp-cap { margin: 8px 0 0; font-size: 10px; line-height: 1.5; opacity: 0.6; }
@media (max-width: 720px) {
  .pp-note { display: none; }
  .pp-panel { display: none; }
  .pp-chart { left: 50%; width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .pp-bar, .pp-cum { transition: none; }
}
`;function U({entryId:u,schema:g}){const o=E(u,g),[N,F]=m.useState(()=>o.get("skew")),[i,S]=m.useState(()=>o.get("budget"));m.useEffect(()=>o.subscribe(()=>{F(o.get("skew")),S(o.get("budget"))}),[o]);const b=f.map((s,t)=>Math.pow(t+1,-N)),v=b.reduce((s,t)=>s+t,0),r=b.map(s=>s/v*100),p=[];let j=0;for(const s of r)j+=s,p.push(j);const x=p[1],k=p.findIndex(s=>s>=80)+1,d=p[i-1],$=100-d,z=r[0],A=p.map((s,t)=>`${t===0?"M":"L"}${(l+t*c+c/2).toFixed(1)},${(a-s/100*w).toFixed(1)}`).join(" "),h=a-.8*w;return e.jsx(R,{entryId:u,schema:g,children:e.jsxs("div",{className:"pp-field",children:[e.jsx("p",{className:"pp-note",children:"「约 80% 的效果来自约 20% 的原因」——roughly 是法则原文的一部分。share ∝ 1/rank^skew 为 demo 教学模型。 'Roughly 80% of effects come from 20% of causes' — roughly included. share ∝ 1/rank^skew is a teaching model."}),e.jsxs("div",{className:"pp-chart",children:[e.jsxs("svg",{viewBox:`0 0 ${_} ${D}`,role:"img","aria-label":`10 项功能使用占比:前 2 项承载 ${x.toFixed(1)}%,预算 ${i} 项覆盖 ${d.toFixed(1)}%,达到 80% 需前 ${k} 项`,children:[e.jsx("line",{className:"pp-base",x1:l,y1:a,x2:350,y2:a}),e.jsx("line",{className:"pp-ref",x1:l,y1:h,x2:350,y2:h}),e.jsx("text",{className:"pp-axis",x:354,y:h+3,children:"80%"}),e.jsx("text",{className:"pp-axis",x:354,y:33,children:"100%"}),r.map((s,t)=>{const n=s/z*L,B=l+t*c+(c-y)/2;return e.jsx("rect",{className:`pp-bar${t<i?" pp-bar-hi":""}`,x:B,y:a-n,width:y,height:n,rx:3},t)}),e.jsx("path",{className:"pp-cum",d:A}),f.map(([s],t)=>e.jsx("text",{className:"pp-label",x:l+t*c+c/2,y:a+12,textAnchor:"middle",children:t+1},s)),e.jsx("text",{className:"pp-label",x:l-4,y:a+24,textAnchor:"start",children:"排名(按收益)rank by payoff"})]}),e.jsxs("p",{className:"pp-inline","aria-live":"polite",children:["前 2 项承载 ",e.jsxs("b",{children:[x.toFixed(1),"%"]})," · 80% 线:前 ",e.jsx("b",{children:k})," 项达到 · 预算 ",i," 项覆盖"," ",e.jsxs("b",{children:[d.toFixed(1),"%"]}),"(剩余 ",10-i," 项合计 ",$.toFixed(1),"%)"]})]}),e.jsxs("div",{className:"pp-panel",children:[e.jsx("h4",{children:"前 20% = 2 项承载"}),e.jsxs("p",{className:"pp-big",children:[x.toFixed(1),"%"]}),e.jsx("ol",{children:f.slice(0,5).map(([s,t],n)=>e.jsxs("li",{children:[e.jsxs("span",{children:[n+1,". ",s," ",t,n<i?e.jsx("span",{className:"pp-tag",children:" 预算内"}):null]}),e.jsxs("b",{children:[r[n].toFixed(1),"%"]})]},s))}),e.jsxs("p",{className:"pp-cap",children:["预算 2→4 项:覆盖 ",p[1].toFixed(1),"%→",p[3].toFixed(1),"%,增益骤减——收益递减即「集中投资少数」的量化理由。 Budget 2→4: ",p[1].toFixed(1),"%→",p[3].toFixed(1),"% — the flattening gain argues for concentration."]})]}),e.jsx("style",{children:M})]})})}export{U as default};
