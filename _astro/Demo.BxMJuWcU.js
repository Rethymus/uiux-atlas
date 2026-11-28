import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as b}from"./index.DLkBFFtG.js";import{g as C,o as p,c as h}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const c=a=>{const n=a.replace("#","");return[0,2,4].map(t=>parseInt(n.slice(t,t+2),16)/255)},g=a=>"#"+a.map(n=>Math.round(n*255).toString(16).padStart(2,"0")).join("").toUpperCase(),f=.97,y=.04,k=.13,j=.6,w=.17,x=(a,n,t)=>`oklch(${a} ${n} ${t})`,D=`
.st-scene { position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; }
.st-main { flex: 1.25; min-width: 0; display: flex; flex-direction: column; gap: 9px; }
.st-alert {
  --st-bg: oklch(0.97 0.04 140);
  --st-border: oklch(0.6 0.17 140);
  --st-fg: oklch(0.45 0.13 140);
  background: var(--st-bg);
  border: 1px solid var(--st-border);
  border-radius: 11px;
  padding: 10px 13px;
  color: var(--st-fg);
  display: flex; align-items: flex-start; gap: 9px;
  animation: st-in 0.4s ease-out both;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.st-icon {
  width: 17px; height: 17px; flex: none; margin-top: 1px;
  border-radius: 50%; border: 2px solid currentColor; position: relative;
}
.st-icon::after {
  content: ""; position: absolute; inset: 3px; border-radius: 50%;
  background: currentColor; opacity: 0.35;
}
.st-body { min-width: 0; }
.st-body b { display: block; font-size: 12.5px; }
.st-body span { display: block; font-size: 11.5px; line-height: 1.5; opacity: 0.85; }
.st-hexes { font-size: 10px; font-variant-numeric: tabular-nums; opacity: 0.7; margin-top: 2px; display: block; }
.st-panel { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.st-grid {
  background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px;
  padding: 4px 0; overflow: hidden;
  animation: st-in 0.4s ease-out 100ms both;
}
.st-gridRow {
  display: grid; grid-template-columns: 74px 1fr 1fr; align-items: center; gap: 6px;
  padding: 7px 12px; font-variant-numeric: tabular-nums; font-size: 11.5px;
}
.st-gridRow + .st-gridRow { border-top: 1px solid rgba(0, 0, 0, 0.07); }
.st-gridRow b { font-size: 11.5px; }
.st-cell { display: flex; align-items: center; gap: 5px; }
.st-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 7px; }
.st-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.st-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
.st-sliders { display: flex; flex-direction: column; gap: 5px; background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; padding: 10px 12px; animation: st-in 0.4s ease-out 160ms both; }
.st-sliderRow { display: grid; grid-template-columns: 92px 1fr 44px; align-items: center; gap: 8px; font-size: 11.5px; }
.st-sliderRow input[type="range"] { width: 100%; accent-color: #334155; }
.st-sliderRow output { text-align: right; font-variant-numeric: tabular-nums; color: #5b6472; }
.st-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
@keyframes st-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .st-scene { flex-direction: column; overflow: auto; }
  .st-panel { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .st-alert, .st-grid, .st-sliders { animation: none; }
  .st-alert { transition: none; }
}
`,R={success:"成功 Success",info:"信息 Info",warning:"警告 Warning",danger:"危险 Danger"},L={success:"部署完成,全部检查通过。Deploy finished, all checks green.",info:"新版本已发布,详情见更新日志。A new version shipped, see the changelog.",warning:"配额将于 3 天后耗尽。Quota runs out in 3 days.",danger:"部署失败,已自动回滚。Deploy failed and was rolled back."};function A({entryId:a,schema:n}){const t=C(a,n),u=()=>({hueSuccess:t.get("hueSuccess"),hueInfo:t.get("hueInfo"),hueWarning:t.get("hueWarning"),hueDanger:t.get("hueDanger"),textLightness:t.get("textLightness")}),[o,v]=b.useState(u);b.useEffect(()=>t.subscribe(()=>{v(u())}),[t]);const r={success:o.hueSuccess,info:o.hueInfo,warning:o.hueWarning,danger:o.hueDanger},N=s=>{const i=g(p(f,y,s).rgb),l=g(p(o.textLightness,k,s).rgb),d=g(p(j,w,s).rgb);return{bg:i,fg:l,border:d,bgCss:x(f,y,s),fgCss:x(o.textLightness,k,s),borderCss:x(j,w,s),textRatio:h(c(l),c(i)),borderRatio:h(c(d),c(i))}},m=Object.keys(r).map(s=>({key:s,...N(r[s])}));return e.jsxs(S,{entryId:a,schema:n,children:[e.jsxs("div",{className:"st-scene",children:[e.jsx("div",{className:"st-main",children:m.map((s,i)=>e.jsxs("div",{className:"st-alert",role:"status",style:{"--st-bg":s.bgCss,"--st-border":s.borderCss,"--st-fg":s.fgCss,animationDelay:`${i*70}ms`},children:[e.jsx("span",{className:"st-icon","aria-hidden":"true"}),e.jsxs("span",{className:"st-body",children:[e.jsx("b",{children:R[s.key]}),e.jsx("span",{children:L[s.key]}),e.jsxs("span",{className:"st-hexes",children:["底 ",s.bg," · 边 ",s.border," · 字 ",s.fg]})]})]},s.key))}),e.jsxs("div",{className:"st-panel",children:[e.jsx("div",{className:"st-grid",children:m.map(s=>e.jsxs("div",{className:"st-gridRow",children:[e.jsx("b",{children:R[s.key].split(" ")[0]}),e.jsxs("span",{className:"st-cell",children:["字/底 ",s.textRatio.toFixed(2),":1",e.jsxs("span",{className:"st-badge","data-ok":s.textRatio>=4.5,children:["AA ",s.textRatio>=4.5?"✓":"✗"]})]}),e.jsxs("span",{className:"st-cell",children:["边/底 ",s.borderRatio.toFixed(2),":1",e.jsxs("span",{className:"st-badge","data-ok":s.borderRatio>=3,children:["3:1 ",s.borderRatio>=3?"✓":"✗"]})]})]},s.key))}),e.jsxs("div",{className:"st-sliders",children:[[{param:"hueSuccess",stateKey:"success",label:"success 色相"},{param:"hueInfo",stateKey:"info",label:"info 色相"},{param:"hueWarning",stateKey:"warning",label:"warning 色相"},{param:"hueDanger",stateKey:"danger",label:"danger 色相"}].map(({param:s,stateKey:i,label:l})=>e.jsxs("label",{className:"st-sliderRow",children:[e.jsx("span",{children:l}),e.jsx("input",{type:"range",min:0,max:360,step:1,value:r[i],onChange:d=>t.set(s,Number(d.target.value))}),e.jsxs("output",{children:[r[i],"°"]})]},s)),e.jsxs("label",{className:"st-sliderRow",children:[e.jsx("span",{children:"文字明度 L"}),e.jsx("input",{type:"range",min:.3,max:.6,step:.01,value:o.textLightness,onChange:s=>t.set("textLightness",Number(s.target.value))}),e.jsx("output",{children:o.textLightness.toFixed(2)})]})]}),e.jsx("p",{className:"st-note",children:"三件套常量为本会话标定值(底 L=0.97/C=0.04、边 L=0.6/C=0.17、字 C=0.13),默认四态全过: 文字 6.17–6.97:1、边框 3.20–3.76:1。判定不四舍五入(WCAG,调研 06§17);红绿语义另需色盲复核 (调研 06§19)——注意图标与文字承担语义冗余。"})]})]}),e.jsx("style",{children:D})]})}export{A as default};
