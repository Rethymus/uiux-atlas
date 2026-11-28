import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as u}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";const y=`
.gm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 30px 14px 10px; overflow: hidden; }
.gm-model {
  border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
  padding: 8px; min-height: 0;
}
.gm-model svg { width: 100%; height: auto; display: block; }
.gm-formulas { display: flex; flex-direction: column; gap: 3px; }
.gm-formulas code {
  font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.gm-formulas code b { color: var(--text); font-weight: 600; }
.gm-warn { color: oklch(0.55 0.19 25); }
.gm-foot { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.gm-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.gm-stage { animation: gm-in 0.4s ease-out both; }
@keyframes gm-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .gm-stage { animation: none; } }
`,m=110;function D({entryId:x,schema:g}){const t=w(x,g),p=()=>({container:t.get("container"),columns:t.get("columns"),gap:t.get("gap"),minCol:t.get("minCol")}),[f,j]=u.useState(p);u.useEffect(()=>t.subscribe(()=>{j(p())}),[t]);const{container:s,columns:a,gap:o,minCol:i}=f,r=(s-(a-1)*o)/a,h=r<=0,n=Math.max(1,Math.floor((s+o)/(i+o))),b=(s-(n-1)*o)/n,c=Math.max(0,r),v=Array.from({length:a},(l,d)=>d*(c+o));return e.jsx(k,{entryId:x,schema:g,children:e.jsxs("div",{className:"gm-stage",children:[e.jsx("div",{className:"gm-model","aria-hidden":"true",children:e.jsx("svg",{viewBox:`0 0 ${s} ${m}`,preserveAspectRatio:"xMidYMid meet",children:v.map((l,d)=>e.jsxs("g",{children:[e.jsx("rect",{x:l,y:14,width:c,height:m-28,rx:6,fill:"oklch(0.62 0.16 250 / 0.28)",stroke:"oklch(0.55 0.14 250)",strokeWidth:Math.max(1,s/900)}),a<=16&&e.jsx("text",{x:l+c/2,y:m/2+4,textAnchor:"middle",fontSize:Math.max(10,s/90),fill:"oklch(0.45 0.1 250)",children:Math.round(r*100)/100})]},d))})}),e.jsxs("div",{className:"gm-formulas",children:[e.jsxs("code",{children:["colW = (",s," − (",a,"−1)×",o,") / ",a," = ",e.jsx("b",{children:h?"塌陷 ≤ 0":(Math.round(r*100)/100).toFixed(2)+"px"}),h&&e.jsx("span",{className:"gm-warn",children:"(槽过宽:/ gutter too wide)"})]}),e.jsxs("code",{children:["auto-fit ⌊(",s,"+",o,")/(",i,"+",o,")⌋ = ",e.jsxs("b",{children:[n," 列 / columns"]})," → 实宽 realized"," ",e.jsxs("b",{children:[(Math.round(b*100)/100).toFixed(2),"px"]})]})]}),e.jsxs("div",{className:"gm-foot",children:[e.jsxs("span",{className:"gm-tag",children:["C = ",s,"px(TDesign/Ant 画板默认 1440)"]}),e.jsxs("span",{className:"gm-tag",children:["gap = ",o,"px(TDesign 官方固定槽)"]}),e.jsxs("span",{className:"gm-tag",children:["minmax(",i,"px, 1fr)"]}),e.jsx("span",{className:"gm-tag",children:"subgrid:卡片行 = 父网格行"})]}),e.jsx("style",{children:y})]})})}export{D as default};
