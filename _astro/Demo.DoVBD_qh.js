import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as h}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as u}from"./DemoStage.vW1CgYCd.js";const g=(a,t)=>Math.round(a/t)*t,b=(a,t,s)=>g(a*t,s),j=`
.rh-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 4px; padding: 30px 14px 10px; overflow: hidden; }
.rh-block {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
  padding: 12px 14px;
}
.rh-rule { position: absolute; left: 0; right: 0; height: 1px; background: oklch(0.62 0.16 250 / 0.35); pointer-events: none; }
.rh-block p { margin: 0; font-variant-numeric: tabular-nums; color: var(--text); }
.rh-read { display: flex; flex-wrap: wrap; gap: 4px; font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.rh-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); white-space: nowrap; }
.rh-tag b { color: var(--text); font-weight: 600; }
.rh-tag[data-warn="1"] { border-color: oklch(0.62 0.19 25); color: oklch(0.55 0.19 25); }
.rh-foot { font-size: 11px; color: var(--text-faint); }
.rh-stage { animation: rh-in 0.4s ease-out both; }
@keyframes rh-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .rh-stage { animation: none; } }
`,v="字号乘倍率出密度,吸附到基线半格出秩序。Density from fs × m; order from the snap。宁可上行距,不破网格。";function M({entryId:a,schema:t}){const s=m(a,t),n=()=>({fontSize:s.get("fontSize"),multiplier:s.get("multiplier"),unit:Number(s.get("unit"))}),[r,x]=h.useState(n);h.useEffect(()=>s.subscribe(()=>{x(n())}),[s]);const i=r.fontSize*r.multiplier,o=b(r.fontSize,r.multiplier,r.unit),l=Math.round((o-i)*10)/10,f=Math.round(o/r.fontSize*1e3)/1e3,c=Math.max(1.5*r.fontSize,r.fontSize+8),p=o>=c-1e-9;return e.jsx(u,{entryId:a,schema:t,children:e.jsxs("div",{className:"rh-stage",children:[e.jsxs("div",{className:"rh-block","aria-hidden":"true",children:[Array.from({length:14},(k,d)=>e.jsx("span",{className:"rh-rule",style:{top:`${12+d*o}px`}},d)),e.jsx("p",{style:{fontSize:`${r.fontSize}px`,lineHeight:`${o}px`},children:v})]}),e.jsxs("div",{className:"rh-read",children:[e.jsxs("span",{className:"rh-tag",children:["raw: ",r.fontSize," × ",r.multiplier," = ",e.jsxs("b",{children:[Math.round(i*100)/100,"px"]})]}),e.jsxs("span",{className:"rh-tag",children:["snap(",r.unit,") → ",e.jsxs("b",{children:[o,"px"]})]}),e.jsxs("span",{className:"rh-tag",children:["Δ = ",e.jsxs("b",{children:[l>=0?"+":"",l,"px"]}),"(宁上行距 / airier wins)"]}),e.jsxs("span",{className:"rh-tag",children:["实际倍率 = ",e.jsx("b",{children:f})]}),e.jsxs("span",{className:"rh-tag","data-warn":p?void 0:"1",children:["CJK 下限 ≥ ",Math.round(c*10)/10,"px:",p?"✓":"✗ 低于 CLREQ 下限"]})]}),e.jsx("p",{className:"rh-foot",children:"韵律线 = 吸附行高的等距投影;线与行盒重合即节奏成立。Rhythm rules = equidistant projection of the snapped leading."}),e.jsx("style",{children:j})]})})}export{M as default};
