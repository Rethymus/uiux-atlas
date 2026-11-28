import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DLkBFFtG.js";import{g as f}from"./color.DuEPkvq5.js";import{D as h}from"./DemoStage.vW1CgYCd.js";const b=`
.demo-stage {
  --gp-gap: 36px;
  --gp-inner: 10px;
}
.gp-field { position: absolute; inset: 0; }
.gp-board {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: flex;
  gap: var(--gp-gap);
  transition: gap 0.2s ease;
}
.gp-group {
  display: flex;
  gap: var(--gp-inner);
  padding: 0;
  border: 0;
  background: transparent;
  transition: gap 0.2s ease;
}
.gp-cell {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: oklch(0.62 0.1 250);
  color: #fff;
  font-size: 12px;
  font-weight: 650;
}
.gp-readout {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.gp-verdict[data-strong="true"] { color: oklch(0.45 0.13 150); }
.gp-verdict[data-strong="false"] { color: oklch(0.55 0.19 25); }
.gp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .gp-readout { display: none; }
  .gp-board { flex-direction: column; align-items: center; }
  .gp-group { flex-wrap: wrap; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .gp-board, .gp-group { transition: none; }
}
`;function w({entryId:o,schema:i}){const t=f(o,i),[c,x]=d.useState(()=>t.get("layout"));d.useEffect(()=>t.subscribe(()=>{x(t.get("layout"))}),[t]);const a=c==="uniform",u=a?{gap:"var(--gp-inner)"}:{gap:"var(--gp-gap)"},m=a?{gap:"var(--gp-inner)"}:void 0,n=t.get("gap"),r=t.get("inner"),p=r>0?n/r:1/0,g=a?!1:n>=r*2;return e.jsx(h,{entryId:o,schema:i,children:e.jsxs("div",{className:"gp-field",children:[e.jsx("div",{className:"gp-board",style:u,children:[0,1,2].map(s=>e.jsx("div",{className:"gp-group",style:m,"aria-label":`组 ${s+1},4 个元素`,children:[0,1,2,3].map(l=>e.jsx("span",{className:"gp-cell",children:s*4+l+1},l))},s))}),e.jsxs("aside",{className:"gp-readout",children:[e.jsx("b",{children:"间距读数 Spacing"}),e.jsx("p",{style:{margin:0},children:a?e.jsxs(e.Fragment,{children:["均匀网格 uniform:全部等距",e.jsx("br",{}),"分组感知 ",e.jsx("span",{className:"gp-verdict","data-strong":"false",children:"无 none"})]}):e.jsxs(e.Fragment,{children:["组间 gap: ",n,"px",e.jsx("br",{}),"组内 inner: ",r,"px",e.jsx("br",{}),"比值 ratio: ",p===1/0?"∞":`${p.toFixed(1)} : 1`,e.jsx("br",{}),"分组感知"," ",e.jsx("span",{className:"gp-verdict","data-strong":g,children:g?"成立 strong":"崩解 weak"})]})})]}),e.jsx("p",{className:"gp-hint",children:"把 gap 拖小到等于 inner,三组退化成 12 个散点;切到 uniform 看阴性对照。 Drag gap down to equal inner and the groups dissolve; uniform is the negative control."}),e.jsx("style",{children:b})]})})}export{w as default};
