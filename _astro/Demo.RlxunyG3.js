import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as p}from"./index.DLkBFFtG.js";import{g as C}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const h=[[11,.006],[12,0],[13,-.006],[15,-.016],[17,-.026],[20,-.023],[22,-.012],[24,.003],[28,.014],[34,.012],[40,.01],[48,.008],[56,.006],[64,.004],[72,.002],[80,0],[96,0]];function z(n){const e=h;if(n<=e[0][0])return e[0][1];for(let s=1;s<e.length;s++)if(n<=e[s][0]){const[a,i]=e[s-1],[r,d]=e[s];return i+(n-a)/(r-a)*(d-i)}return e[e.length-1][1]}const F=[[12,1.3334],[17,1.2354],[19,1.2105],[28,1.1429],[40,1.1],[48,1.0835],[56,1.0714],[96,1.0714]];function T(n){const e=F;if(n<=e[0][0])return e[0][1];for(let s=1;s<e.length;s++)if(n<=e[s][0]){const[a,i]=e[s-1],[r,d]=e[s];return i+(n-a)/(r-a)*(d-i)}return e[e.length-1][1]}const l=260,o=84;function x(){return h.map(([n,e])=>[(n-8)/92*l,o/2-e*(o/.055)])}const D=x().map(([n,e])=>`${n.toFixed(1)},${e.toFixed(1)}`).join(" "),E=`
.dt-stage { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.dt-spec {
  border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  border-radius: 10px; padding: 16px 18px; overflow: hidden;
}
.dt-line {
  font-size: var(--dt-size); font-weight: var(--dt-weight);
  line-height: 1.12; letter-spacing: var(--dt-tracking);
  font-family: inherit; margin: 0; white-space: nowrap;
}
.dt-stage[data-mode="auto"] .dt-line { letter-spacing: var(--dt-auto, 0em); }
.dt-caption { margin: 8px 0 0; font-size: 12px; opacity: 0.62; }
.dt-panels { display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch; }
.dt-chart { border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  border-radius: 10px; padding: 10px 12px; }
.dt-chart svg { display: block; }
.dt-chart .dot { transition: cx 0.15s ease, cy 0.15s ease; }
.dt-read { display: flex; flex-direction: column; gap: 5px; flex: 1; min-width: 210px; }
.dt-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px; width: fit-content;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.dt-badge strong { font-weight: 650; }
.dt-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .dt-chart .dot { transition: none; }
}
`;function O({entryId:n,schema:e}){const s=C(n,e),[a,i]=p.useState(0),[r,d]=p.useState(()=>s.get("trackingMode"));p.useEffect(()=>s.subscribe(()=>{d(s.get("trackingMode")),i(g=>g+1)}),[s]);const c=s.get("size"),y=s.get("weight"),m=s.get("manualTracking"),u=p.useMemo(()=>z(c),[c]),f=r==="auto"?u:m,b=T(c).toFixed(4),j=x()[h.findIndex(([g])=>g>=c)]??x()[x().length-1],k=(c-8)/92*l,N=o/2-m*(o/.055),v=r==="auto"?j[0]:k,w=r==="auto"?j[1]:N;return t.jsxs(S,{entryId:n,schema:e,children:[t.jsxs("div",{className:"dt-stage","data-mode":r,style:{"--dt-auto":`${u.toFixed(4)}em`},children:[t.jsxs("div",{className:"dt-panels",children:[t.jsx("div",{className:"dt-chart","aria-hidden":"true",children:t.jsxs("svg",{width:l,height:o,role:"img",children:[t.jsx("line",{x1:"0",x2:l,y1:o/2,y2:o/2,stroke:"currentColor",strokeOpacity:"0.25",strokeDasharray:"3 3"}),t.jsx("polyline",{points:D,fill:"none",stroke:"currentColor",strokeOpacity:"0.8",strokeWidth:"1.5"}),t.jsx("circle",{className:"dot",cx:v,cy:w,r:"4",fill:"oklch(0.62 0.17 255)",stroke:"none"}),t.jsx("text",{x:"4",y:o-2,fontSize:"9",fill:"currentColor",opacity:"0.6",children:"8px"}),t.jsx("text",{x:l-26,y:o-2,fontSize:"9",fill:"currentColor",opacity:"0.6",children:"96px"}),t.jsx("text",{x:"4",y:"10",fontSize:"9",fill:"currentColor",opacity:"0.6",children:"+em"}),t.jsx("text",{x:"4",y:o/2-3,fontSize:"9",fill:"currentColor",opacity:"0.6",children:"0"})]})}),t.jsxs("div",{className:"dt-read",children:[t.jsxs("span",{className:"dt-badge",children:["trackingMode ",t.jsx("strong",{children:r})]}),t.jsxs("span",{className:"dt-badge",children:["应用字距 ",t.jsxs("strong",{children:[f>=0?"+":"",f.toFixed(4),"em"]}),r==="auto"?"(SF 曲线插值)":"(手动)"]}),t.jsxs("span",{className:"dt-badge",children:["字号 ",t.jsxs("strong",{children:[c,"px"]})," · 字重 ",t.jsx("strong",{children:y}),"(wght 轴)"]}),t.jsxs("span",{className:"dt-badge",children:["建议行高比 ",t.jsx("strong",{children:b}),"(apple.com 实测锚点插值)"]}),t.jsxs("span",{className:"dt-badge",children:["本站 hero 档 ",t.jsx("strong",{children:"48px / −0.02em / 1.12"})]}),t.jsxs("span",{className:"dt-badge",children:["apple.com 56px 档 ",t.jsx("strong",{children:"600 / −0.005em / 1.0714"})]})]})]}),t.jsxs("div",{className:"dt-spec",children:[t.jsx("p",{className:"dt-line",children:"Display 展示级排版 0123"}),t.jsx("p",{className:"dt-caption",children:"字号越大字距越紧、行高比越低——样张行高固定 1.12(本站 hero 同款); auto 模式下字距随上方游标在 SF 官方曲线上移动。 注意原生曲线与网页实践在 48–56px 段的分歧(+0.006 vs −0.005/−0.02em),两套数值并列如实展示。"})]}),t.jsx("p",{className:"dt-note",children:"曲线锚点:SF Pro tracking(HIG Typography §Tracking values,66 行实抓,调研 01§2.2; 17pt −26‱ 全曲线最紧、80pt+ 归零);行高比锚点:apple.com 网页实测(01§2.3); 本站手法:--step-5 clamp + lh 1.12 + ls −0.02em(src/styles/global.css:163、883-888)。 pt 档按 1x 折算近似,曲线用于教学感知而非像素复刻。"})]}),t.jsx("style",{children:E})]})}export{O as default};
