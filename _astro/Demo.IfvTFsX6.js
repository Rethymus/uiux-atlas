import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as v}from"./index.DLkBFFtG.js";import{g as L}from"./color.DuEPkvq5.js";import{D as N}from"./DemoStage.vW1CgYCd.js";const d=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function w(e){const a=e.replace("#",""),t=parseInt(a.length===3?a.replace(/./g,n=>n+n):a.slice(0,6),16);return[t>>16&255,t>>8&255,t&255]}const j=e=>.2126*d(e[0]/255)+.7152*d(e[1]/255)+.0722*d(e[2]/255),C=(e,a)=>(Math.max(e,a)+.05)/(Math.min(e,a)+.05),E=[{fg:"#767676",bg:"#ffffff",zh:"临界灰 4.54:1",en:"critical gray 4.54:1"},{fg:"#6b6b6b",bg:"#ffffff",zh:"过线灰 ≈5.3:1",en:"passing gray ≈5.3:1"},{fg:"#8a8a8a",bg:"#ffffff",zh:"不及格灰 ≈3.5:1",en:"failing gray ≈3.5:1"}],M=`
.cr-stage { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(120px, 1fr) minmax(0, 1.4fr); gap: 10px; padding: 30px 14px 10px; overflow: hidden; }
.cr-card {
  border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column;
  color: var(--cr-fg); background: var(--cr-bg);
}
.cr-preview { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 44px; font-weight: 650; line-height: 1.1; }
.cr-preview small { font-size: 15px; font-weight: 400; margin-left: 8px; }
.cr-ratio {
  padding: 6px 10px; font-size: 13px; font-weight: 650; font-variant-numeric: tabular-nums;
  border-top: 1px solid color-mix(in srgb, var(--cr-fg) 22%, transparent);
}
.cr-steps { margin: 0; padding: 6px 10px; list-style: none; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
.cr-steps li {
  font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cr-verdicts { display: flex; flex-wrap: wrap; gap: 4px; padding: 6px 10px 8px; }
.cr-v { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); font-size: 11px; font-variant-numeric: tabular-nums; color: var(--text-dim); }
.cr-v[data-pass="1"] { border-color: oklch(0.62 0.14 165); color: oklch(0.45 0.12 165); }
.cr-v[data-pass="0"] { border-color: oklch(0.62 0.19 25); color: oklch(0.55 0.19 25); }
.cr-foot { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); }
.cr-chips { display: flex; gap: 4px; }
.cr-chips button { border: 1px solid var(--border); border-radius: 999px; background: transparent; padding: 2px 10px; font-size: 11px; cursor: pointer; color: var(--text-dim); }
.cr-stage { animation: cr-in 0.4s ease-out both; }
@keyframes cr-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .cr-stage { animation: none; } }
`,o=(e,a=4)=>String(+e.toFixed(a));function B({entryId:e,schema:a}){const t=L(e,a),n=()=>({fg:t.get("fg").toUpperCase(),bg:t.get("bg").toUpperCase()}),[{fg:x,bg:g},y]=v.useState(n);v.useEffect(()=>t.subscribe(()=>{y(n())}),[t]);const m=w(x),b=w(g),i=j(m),c=j(b),l=C(i,c),f=i>c,h=Math.max(i,c),u=Math.min(i,c),p=f?m:b,A=d(p[0]/255),z=[{label:"AA 正文 4.5",need:4.5},{label:"AA 大字 3",need:3},{label:"AAA 正文 7",need:7},{label:"AAA 大字 4.5",need:4.5}],$=[`sRGB → [0,1]: ${p[0]}/255 = ${o(p[0]/255)}`,`γ 解码: ${o(p[0]/255)} → ${o(A)}`,`L(较亮侧 ${f?"fg":"bg"}) = 0.2126R+0.7152G+0.0722B = ${o(h)}`,`L(较暗侧 ${f?"bg":"fg"}) = ${o(u)}`,`(${o(h+.05)}) / (${o(u+.05)}) = ${o(l,4)}:1`];return r.jsx(N,{entryId:e,schema:a,children:r.jsxs("div",{className:"cr-stage",children:[r.jsxs("div",{className:"cr-card",children:[r.jsxs("span",{className:"cr-preview",children:["Aa",r.jsx("small",{children:"正文样 body"})]}),r.jsxs("span",{className:"cr-ratio",children:[o(l,4)," : 1"]})]}),r.jsxs("div",{children:[r.jsx("ol",{className:"cr-steps",children:$.map((s,k)=>r.jsx("li",{children:s},k))}),r.jsx("div",{className:"cr-verdicts",children:z.map(s=>r.jsxs("span",{className:"cr-v","data-pass":l>=s.need?"1":"0",title:`${s.label}:1`,children:[s.label," ",l>=s.need?"✓":"✗"]},s.label))})]}),r.jsxs("div",{className:"cr-foot",children:[r.jsx("span",{className:"cr-chips",role:"group","aria-label":"快捷组合 Quick pairs",children:E.map(s=>r.jsx("button",{type:"button","aria-pressed":x===s.fg&&g===s.bg,title:s.en,onClick:()=>{t.set("fg",s.fg),t.set("bg",s.bg)},children:s.zh},s.zh))}),r.jsx("span",{children:"深底浅字场景建议以 APCA Lc 复核 / re-check light-on-dark with APCA Lc"})]}),r.jsx("style",{children:M})]})})}export{B as default};
