import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as m}from"./index.DLkBFFtG.js";import{g as h}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const d=16,g=[0,1,2,3,4,5],x=e=>Number(e.toFixed(4));function b(e){const n=e.minViewport/d,o=e.maxViewport/d-n;return g.map(i=>{const p=e.minSize*Math.pow(e.ratio,i),r=e.maxSize*Math.pow(e.ratio,i),l=o>0?(r-p)/o:0,c=p-l*n;return{n:i,min:p,max:r,slope:l,inter:c}})}function u(e){return`clamp(${x(e.min)}rem, ${x(e.inter)}rem + ${x(e.slope*100)}vw, ${x(e.max)}rem)`}function j(e,n){return Math.max(e.min,Math.min(e.inter+e.slope*(n/d),e.max))*d}const v=`
.fts-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.fts-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 12px;
  align-items: stretch;
}
.fts-code {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.75 ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
  white-space: pre;
  overflow-x: auto;
}
.fts-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  padding: 12px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.fts-row { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.fts-label {
  flex: none;
  width: 58px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.6;
}
.fts-sample { line-height: 1.15; overflow-wrap: anywhere; min-width: 0; }
.fts-px {
  flex: none;
  margin-left: auto;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.72;
  white-space: nowrap;
}
.fts-sim { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.fts-sim input { flex: 1; min-width: 0; }
.fts-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (max-width: 760px) { .fts-grid { grid-template-columns: 1fr; } }
`;function z({entryId:e,schema:n}){const a=h(e,n),o=()=>b({minViewport:a.get("minViewport"),maxViewport:a.get("maxViewport"),minSize:a.get("minSize"),maxSize:a.get("maxSize"),ratio:a.get("ratio")}),[i,p]=m.useState(o),[r,l]=m.useState(768),c=m.useRef(null);return m.useEffect(()=>a.subscribe(()=>p(o())),[a]),m.useEffect(()=>{const s=c.current;if(s)for(const f of i)s.style.setProperty(`--step-${f.n}`,u(f))},[i]),t.jsxs(w,{entryId:e,schema:n,children:[t.jsxs("div",{className:"fts-wrap",children:[t.jsxs("div",{className:"fts-grid",children:[t.jsx("pre",{className:"fts-code","aria-label":"生成的 clamp 代码 generated clamp code",children:i.map(s=>`--step-${s.n}: ${u(s)};`).join(`
`)}),t.jsx("div",{className:"fts-preview",ref:c,children:i.map(s=>t.jsxs("div",{className:"fts-row",children:[t.jsxs("span",{className:"fts-label",children:["--step-",s.n]}),t.jsx("span",{className:"fts-sample",style:{fontSize:`var(--step-${s.n})`},children:"排版 Fluid Type Aa 123"}),t.jsxs("span",{className:"fts-px",children:["@",r,"px ≈ ",j(s,r).toFixed(1),"px"]})]},s.n))})]}),t.jsxs("label",{className:"fts-sim",children:[t.jsxs("span",{children:["模拟视口宽度 Simulated viewport ",t.jsxs("strong",{children:[r,"px"]})]}),t.jsx("input",{type:"range",min:320,max:1920,step:1,value:r,"aria-label":"模拟视口宽度 Simulated viewport width",onChange:s=>l(Number(s.target.value))})]}),t.jsx("p",{className:"fts-hint",children:"预览字号由生成的 clamp() 变量驱动,直接缩放浏览器窗口即可看到插值;右侧数值为模拟视口宽度下按同一公式换算的实际 px。 The preview sizes are driven by the generated clamp() variables — resize the browser to see interpolation; the badges show px values computed by the same formula at the simulated width."})]}),t.jsx("style",{children:v})]})}export{z as default};
