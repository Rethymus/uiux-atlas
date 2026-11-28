import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DLkBFFtG.js";import{g as y}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";const v=`
.ig-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.ig-canvas-wrap { position: relative; }
.ig-svg {
  display: block;
  width: min(256px, calc(100vw - 96px));
  height: auto;
  background: #f1f5f9;
  border-radius: 14px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08), 0 8px 24px rgba(15, 23, 42, 0.12);
}
.ig-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 14px;
  max-width: 440px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
}
.ig-legend span { display: inline-flex; align-items: center; gap: 6px; }
.ig-chip { width: 16px; height: 3px; border-radius: 2px; display: inline-block; }
.ig-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.55);
  text-align: center;
  max-width: 460px;
}
.ig-tag { display: inline-block; margin-left: 4px; padding: 1px 8px; border-radius: 999px; font-size: 11px; }
.ig-tag-official { background: rgba(22, 163, 74, 0.14); color: #15803d; }
.ig-tag-derived { background: rgba(234, 88, 12, 0.12); color: #c2410c; }
`,t=.125;function z({entryId:l,schema:x}){const g=y(l,x),[p,h]=d.useState(()=>Number(g.get("gridSize"))),[f,m]=d.useState(()=>g.get("padding"));d.useEffect(()=>g.subscribe(()=>{h(Number(g.get("gridSize"))),m(g.get("padding"))}),[g]);const e=p,a=f,s=e-a*2,r=Math.max(s-2,0),n=Math.max(s-4,0),j=e===24&&a===2,b=e===20&&a===2,u=e/24,o=[];for(let c=1;c<e;c++)o.push(i.jsx("line",{x1:c,y1:0,x2:c,y2:e},`v${c}`)),o.push(i.jsx("line",{x1:0,y1:c,x2:e,y2:c},`h${c}`));return i.jsxs(k,{entryId:l,schema:x,children:[i.jsxs("div",{className:"ig-scene",children:[i.jsx("div",{className:"ig-canvas-wrap",children:i.jsxs("svg",{className:"ig-svg",width:e*8,height:e*8,viewBox:`0 0 ${e} ${e}`,role:"img","aria-label":`图标栅格 ${e} 乘 ${e},活动区 ${s} 乘 ${s},方形键程 ${r}`,children:[i.jsx("g",{stroke:"rgba(100, 116, 139, 0.35)",strokeWidth:t,children:o}),i.jsx("rect",{x:a,y:a,width:s,height:s,fill:"#ffffff"}),i.jsx("rect",{x:a,y:a,width:s,height:s,fill:"none",stroke:"#2563eb",strokeDasharray:`${t*3} ${t*2}`,strokeWidth:t*1.6}),i.jsxs("g",{fill:"none",strokeWidth:t*1.6,children:[i.jsx("rect",{x:(e-r)/2,y:(e-r)/2,width:r,height:r,stroke:"#ea580c"}),i.jsx("circle",{cx:e/2,cy:e/2,r:s/2,stroke:"#16a34a"}),i.jsx("rect",{x:(e-s)/2,y:(e-n)/2,width:s,height:n,stroke:"rgba(100, 116, 139, 0.85)",strokeDasharray:`${t*1.5} ${t*1.5}`}),i.jsx("rect",{x:(e-n)/2,y:(e-s)/2,width:n,height:s,stroke:"rgba(100, 116, 139, 0.85)",strokeDasharray:`${t*1.5} ${t*1.5}`})]}),i.jsxs("g",{transform:`scale(${u})`,fill:"none",stroke:"rgba(15, 23, 42, 0.75)",strokeWidth:.28,strokeLinecap:"round",strokeLinejoin:"round",children:[i.jsx("rect",{x:"4.25",y:"4.25",width:"15.5",height:"15.5",rx:"2"}),i.jsx("circle",{cx:"9.2",cy:"9.6",r:"1.7"}),i.jsx("path",{d:"M4.9 17.1l4.4-4.4 3.1 3.1 3.5-3.5 3.6 3.6"})]})]})}),i.jsxs("div",{className:"ig-legend","aria-hidden":"true",children:[i.jsxs("span",{children:[i.jsx("i",{className:"ig-chip",style:{background:"#2563eb"}})," 活动区 Live ",s,"×",s]}),i.jsxs("span",{children:[i.jsx("i",{className:"ig-chip",style:{background:"#ea580c"}})," 方形键程 ",r,"×",r]}),i.jsxs("span",{children:[i.jsx("i",{className:"ig-chip",style:{background:"#16a34a"}})," 圆形键程 Ø",s]}),i.jsxs("span",{children:[i.jsx("i",{className:"ig-chip",style:{background:"rgba(100,116,139,0.85)"}})," 长方形 ",s,"×",n," / ",n,"×",s]}),i.jsxs("span",{children:["外框 = 修剪区 ",e,"×",e," · padding ",a]})]}),i.jsxs("div",{className:"ig-readout","aria-live":"polite",children:["gridSize=",e," · padding=",a," → live ",s,"×",s," · square ",r,"×",r," · circle Ø",s," · rect ",s,"×",n,"/",n,"×",s,j?i.jsx("span",{className:"ig-tag ig-tag-official",children:"Material 官方值(07 §2)"}):b?i.jsx("span",{className:"ig-tag ig-tag-official",children:"密集布局官方活动区 16×16;键程为推导"}):i.jsx("span",{className:"ig-tag ig-tag-derived",children:"按 24 基准等比推导,官方未定义"})]})]}),i.jsx("style",{children:v})]})}export{z as default};
