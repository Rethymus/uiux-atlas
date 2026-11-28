import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const x={gray:["#fcfcfc","#f9f9f9","#f0f0f0","#e8e8e8","#e0e0e0","#d9d9d9","#cecece","#bbbbbb","#8d8d8d","#838383","#646464","#202020"],blue:["#fbfdff","#f4faff","#e6f4fe","#d5efff","#c2e5ff","#acd8fc","#8ec8f6","#5eb1ef","#0090ff","#0588f0","#0d74ce","#113264"],green:["#fbfefc","#f4fbf6","#e6f6eb","#d6f1df","#c4e8d1","#adddc0","#8eceaa","#5bb98b","#30a46c","#2b9a66","#218358","#193b2d"],amber:["#fefdfb","#fefbe9","#fff7c2","#ffee9c","#fbe577","#f3d673","#e9c162","#e2a336","#ffc53d","#ffba18","#ab6400","#4f3422"],red:["#fffcfc","#fff7f7","#feebec","#ffdbdc","#ffcdce","#fdbdbe","#f4a9aa","#eb8e90","#e5484d","#dc3e42","#ce2c31","#641723"],violet:["#fdfcfe","#faf8ff","#f4f0fe","#ebe4ff","#e1d9ff","#d4cafe","#c2b5f5","#aa99ec","#6e56cf","#654dc4","#6550b9","#2f265f"],cyan:["#fafdfe","#f2fafb","#def7f9","#caf1f6","#b5e9f0","#9ddde7","#7dcedc","#3db9cf","#00a2c7","#0797b9","#107d98","#0d3c48"],pink:["#fffcfe","#fef7fb","#fee9f5","#fbdcef","#f6cee7","#efbfdd","#e7acd0","#dd93c2","#d6409f","#cf3897","#c2298a","#651249"]},w=[{zh:"app 背景",en:"app background"},{zh:"次级/微妙背景",en:"subtle background"},{zh:"组件表面",en:"component surface"},{zh:"hover 背景",en:"hover background"},{zh:"pressed/selected 背景",en:"pressed/selected background"},{zh:"非交互微妙边框",en:"subtle non-interactive border"},{zh:"交互边框/焦点环",en:"interactive border & focus ring"},{zh:"hover 边框/强边框",en:"hover border / strong border"},{zh:"solid(CTA 实色)",en:"solid (CTA)"},{zh:"solid hover",en:"solid hover"},{zh:"低对比文本 · Lc 60",en:"low-contrast text · Lc 60"},{zh:"高对比文本 · Lc 90",en:"high-contrast text · Lc 90"}],b=new Set(["sky","mint","lime","yellow","amber"]);function p(t){const c=parseInt(t.slice(1,3),16)/255,s=parseInt(t.slice(3,5),16)/255,f=parseInt(t.slice(5,7),16)/255,o=a=>a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4);return .2126*o(c)+.7152*o(s)+.0722*o(f)>=.3?"#20242b":"#f5f7fa"}const y=`
.rx-stage { position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; align-items: stretch; }
.rx-ladder { flex: 1.2; min-width: 0; display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
.rx-row {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  padding: 0 10px;
  transition: background-color 0.18s ease;
}
.rx-row > .rx-num {
  width: 26px; flex: none;
  font-size: 11px; font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rx-row > .rx-hex {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 11px; flex: none;
}
.rx-row > .rx-label { font-size: 11px; margin-left: auto; font-weight: 600; opacity: 0.85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rx-row[data-dark="true"] { color: rgb(255 255 255 / 0.92); }
.rx-row[data-light="true"] { color: rgb(0 0 0 / 0.8); }
.rx-row[data-selected="true"] { outline: 2px solid var(--text); outline-offset: 1px; }
.rx-side { flex: 1; min-width: 225px; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
.rx-card {
  border-radius: 14px;
  padding: 18px 18px 16px;
  border: 1px solid transparent;
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.rx-card h4 { margin: 0 0 6px; font-size: 15px; font-weight: 650; transition: color 0.18s ease; }
.rx-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.55; transition: color 0.18s ease; }
.rx-btn {
  border: 0; border-radius: 8px;
  padding: 8px 16px;
  font-size: 12.5px; font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
}
.rx-btn:hover { filter: brightness(0.96); }
.rx-note { font-size: 11px; line-height: 1.6; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .rx-row, .rx-card, .rx-card h4, .rx-card p, .rx-btn { transition: none; }
  .rx-btn:hover { filter: none; }
}
`;function C({entryId:t,schema:c}){const s=g(t,c),[,f]=l.useState(0);l.useEffect(()=>s.subscribe(()=>{f(e=>e+1)}),[s]);const o=s.get("hue"),i=s.get("step"),a=x[o]??x.blue,n=e=>a[e-1],h=b.has(o)?"#2b2118":"#f5f7fa",u=a.map((e,d)=>({n:d+1,hex:e,label:w[d],selected:d+1===i,dark:p(e)==="#f5f7fa",light:p(e)==="#20242b"}));return r.jsxs(m,{entryId:t,schema:c,children:[r.jsxs("div",{className:"rx-stage",children:[r.jsx("div",{className:"rx-ladder",role:"list","aria-label":"12 步语义色阶 12-step semantic scale",children:u.map(e=>r.jsxs("div",{role:"listitem",className:"rx-row","data-selected":e.selected,"data-dark":e.dark,"data-light":e.light,style:{backgroundColor:e.hex},children:[r.jsx("span",{className:"rx-num",children:e.n}),r.jsx("span",{className:"rx-hex",children:e.hex}),r.jsxs("span",{className:"rx-label",children:[e.label.zh," / ",e.label.en]})]},e.n))}),r.jsxs("div",{className:"rx-side",children:[r.jsxs("div",{className:"rx-card",style:{backgroundColor:n(2),borderColor:n(6),color:n(11)},children:[r.jsx("h4",{style:{color:n(12)},children:"步位即语义 / Steps are semantics"}),r.jsx("p",{style:{color:n(11)},children:"背景 = 步 2,边框 = 步 6,按钮 = 步 9,正文 = 步 11,标题 = 步 12。Background = step 2, border = 6, button = 9, body = 11, heading = 12."}),r.jsx("button",{type:"button",className:"rx-btn",style:{backgroundColor:n(9),color:h},children:"操作 Action(9)"})]}),r.jsxs("p",{className:"rx-note",children:["步 11/12 在同类步 2 背景上官方保证 APCA Lc 60 / Lc 90;步 9 全阶 chroma 最高,官方分档配字:",o," 属",b.has(o)?"「深字」例外档":"「白字」多数档","。步 11/12 guarantee APCA Lc 60/90 on step-2 backgrounds; step 9 carries the highest chroma of the scale with the official text split."]})]})]}),r.jsx("style",{children:y})]})}export{C as default};
