import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as p}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const d={dominant:"#FFFFFF",secondary:"#E9EBEE",accent:"#1B62E4"},b=`
.r60-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
}
.r60-strip {
  display: flex;
  height: 34px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 11.5px;
  font-weight: 600;
}
.r60-seg {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
  transition: flex-grow 0.3s ease;
  font-variant-numeric: tabular-nums;
}
.r60-total {
  font-size: 11.5px;
  color: #5b6472;
  font-variant-numeric: tabular-nums;
}
.r60-frame {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 6px;
  border-radius: 14px;
  border: 1px solid #d7dbe2;
  padding: 8px;
  background: #F6F7F9;
}
.r60-band {
  border-radius: 10px;
  transition: flex-grow 0.3s ease;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  overflow: hidden;
}
.r60-band-label {
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.r60-line { height: 9px; border-radius: 5px; background: rgba(0, 0, 0, 0.1); }
.r60-line.w60 { width: 60%; }
.r60-line.w40 { width: 40%; }
.r60-card { height: 34px; border-radius: 8px; background: #FFFFFF; border: 1px solid rgba(0, 0, 0, 0.08); }
.r60-cta {
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 999px;
  border: 0;
  background: #FFFFFF;
  color: #1B62E4;
  font-size: 12px;
  font-weight: 700;
}
.r60-dot { width: 22px; height: 22px; border-radius: 50%; background: rgba(255, 255, 255, 0.4); }
@media (prefers-reduced-motion: reduce) {
  .r60-seg, .r60-band { transition: none; }
}
`,h=[{key:"dominant",zh:"主导 Dominant"},{key:"secondary",zh:"辅助 Secondary"},{key:"accent",zh:"强调 Accent"}];function w({entryId:c,schema:l}){const a=g(c,l),[,m]=p.useState(0);p.useEffect(()=>a.subscribe(()=>{m(s=>s+1)}),[a]);const n=a.get("dominant"),t=a.get("secondary"),o=a.get("accent"),r=n+t+o,i=s=>r===0?0:s/r*100;return e.jsxs(f,{entryId:c,schema:l,children:[e.jsxs("div",{className:"r60-stage",children:[e.jsx("div",{className:"r60-strip",children:h.map(s=>{const x=a.get(s.key);return e.jsxs("div",{className:"r60-seg",style:{flexGrow:Math.max(r,0)===0?0:x,background:d[s.key],color:s.key==="dominant"?"#374151":"#FFFFFF"},children:[s.zh," ",i(x).toFixed(1),"%"]},s.key)})}),e.jsxs("div",{className:"r60-total",children:[n," + ",t," + ",o," = ",r,r!==100?" → 已归一化 / normalized":""]}),e.jsxs("div",{className:"r60-frame",children:[e.jsxs("section",{className:"r60-band",style:{flexGrow:n,background:d.dominant},children:[e.jsxs("span",{className:"r60-band-label",style:{color:"#374151"},children:["主导画布 Canvas · ",i(n).toFixed(1),"%"]}),e.jsx("span",{className:"r60-line w60"}),e.jsx("span",{className:"r60-line w40"}),e.jsx("span",{className:"r60-line w60"})]}),e.jsxs("section",{className:"r60-band",style:{flexGrow:t,background:d.secondary},children:[e.jsxs("span",{className:"r60-band-label",style:{color:"#374151"},children:["辅助面板 Panel · ",i(t).toFixed(1),"%"]}),e.jsx("span",{className:"r60-card"}),e.jsx("span",{className:"r60-card"})]}),e.jsxs("section",{className:"r60-band",style:{flexGrow:o,background:d.accent},children:[e.jsxs("span",{className:"r60-band-label",style:{color:"#FFFFFF"},children:["强调 Accent · ",i(o).toFixed(1),"%"]}),e.jsx("span",{className:"r60-cta",children:"CTA"}),e.jsx("span",{className:"r60-dot"})]})]})]}),e.jsx("style",{children:b})]})}export{w as default};
