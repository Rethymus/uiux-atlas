import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as b}from"./DemoStage.vW1CgYCd.js";const f=16,j=[{name:"3xs",mult:.25},{name:"2xs",mult:.5},{name:"xs",mult:.75},{name:"s",mult:1},{name:"m",mult:1.5},{name:"l",mult:2},{name:"xl",mult:3},{name:"2xl",mult:4},{name:"3xl",mult:6}],d=s=>Number(s.toFixed(4));function v(s){const p=s.minViewport/f,t=s.maxViewport/f-p;return j.map(n=>{const o=s.minSpace*n.mult,r=s.maxSpace*n.mult,m=t>0?(r-o)/t:0,c=o-m*p;return{name:n.name,min:o,max:r,slope:m,inter:c}})}function g(s){return`clamp(${d(s.min)}rem, ${d(s.inter)}rem + ${d(s.slope*100)}vw, ${d(s.max)}rem)`}function x(s,p){return Math.max(s.min,Math.min(s.inter+s.slope*(p/f),s.max))*f}const N=`
.fsp-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.fsp-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 12px;
  align-items: stretch;
}
.fsp-code {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 11px/1.8 ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
  white-space: pre;
  overflow-x: auto;
}
.fsp-bars {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 12px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  justify-content: space-between;
}
.fsp-bar-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
.fsp-token {
  flex: none;
  width: 52px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.75;
}
.fsp-bar {
  height: 12px;
  border-radius: 3px;
  background: linear-gradient(90deg, color-mix(in srgb, currentColor 55%, transparent), color-mix(in srgb, currentColor 30%, transparent));
  flex: none;
}
.fsp-val {
  font: 10px/1.3 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fsp-sample {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 12px;
  padding: var(--space-l);
  display: flex;
  gap: var(--space-m);
  flex-wrap: wrap;
  align-items: center;
}
.fsp-chip {
  border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 999px;
  padding: var(--space-2xs) var(--space-s);
  font-size: 13px;
  background: color-mix(in srgb, currentColor 8%, transparent);
}
.fsp-chip strong { font-size: 15px; }
.fsp-sim { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.fsp-sim input { flex: 1; min-width: 0; }
.fsp-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (max-width: 760px) { .fsp-grid { grid-template-columns: 1fr; } }
`;function k({entryId:s,schema:p}){const i=w(s,p),t=()=>v({minViewport:i.get("minViewport"),maxViewport:i.get("maxViewport"),minSpace:i.get("minSpace"),maxSpace:i.get("maxSpace")}),[n,o]=l.useState(t),[r,m]=l.useState(768),c=l.useRef(null);l.useEffect(()=>i.subscribe(()=>o(t())),[i]),l.useEffect(()=>{const a=c.current;if(a)for(const u of n)a.style.setProperty(`--space-${u.name}`,g(u))},[n]);const h=Math.max(...n.map(a=>x(a,r)));return e.jsxs(b,{entryId:s,schema:p,children:[e.jsxs("div",{className:"fsp-wrap",children:[e.jsxs("div",{className:"fsp-grid",children:[e.jsx("pre",{className:"fsp-code","aria-label":"生成的 clamp 代码 generated clamp code",children:n.map(a=>`--space-${a.name}: ${g(a)};`).join(`
`)}),e.jsx("div",{className:"fsp-bars","aria-label":"各间距令牌在模拟视口下的实际宽度 token widths at simulated viewport",children:n.map(a=>e.jsxs("div",{className:"fsp-bar-row",children:[e.jsxs("span",{className:"fsp-token",children:["--space-",a.name]}),e.jsx("span",{className:"fsp-bar",style:{width:`${x(a,r)/h*100}%`,minWidth:2},role:"img","aria-label":`--space-${a.name} = ${x(a,r).toFixed(1)}px`}),e.jsxs("span",{className:"fsp-val",children:[x(a,r).toFixed(1),"px @",r,"px"]})]},a.name))})]}),e.jsxs("div",{className:"fsp-sample",ref:c,children:[e.jsxs("span",{className:"fsp-chip",children:[e.jsx("strong",{children:"padding --space-l"})," 卡片内边距 card padding"]}),e.jsx("span",{className:"fsp-chip",children:"gap --space-m"}),e.jsx("span",{className:"fsp-chip",children:"chip --space-2xs / --space-s"})]}),e.jsxs("label",{className:"fsp-sim",children:[e.jsxs("span",{children:["模拟视口宽度 Simulated viewport ",e.jsxs("strong",{children:[r,"px"]})]}),e.jsx("input",{type:"range",min:320,max:1920,step:1,value:r,"aria-label":"模拟视口宽度 Simulated viewport width",onChange:a=>m(Number(a.target.value))})]}),e.jsx("p",{className:"fsp-hint",children:"条形图与数值按同一 clamp 公式在模拟视口宽度下换算;样例卡片的 padding/gap 用真实 clamp() 变量驱动,缩放浏览器窗口即可看到留白呼吸。 Bars and values are computed with the same clamp formula at the simulated width; the sample card's padding/gap ride the real clamp() variables — resize the browser and watch the whitespace breathe."})]}),e.jsx("style",{children:N})]})}export{k as default};
