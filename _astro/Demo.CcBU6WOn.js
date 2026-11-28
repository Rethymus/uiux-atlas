import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as x}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const h=(n,r,a)=>n*Math.pow(r,a);function g(n,r,a,m,e=16,l=4){if(m<=a)return"minVw 必须小于 maxVw / minVw must be below maxVw";const i=n/e,p=r/e,t=(p-i)/((m-a)/e),c=i-a/e*t,o=d=>String(+d.toFixed(l));return`clamp(${o(i)}rem, ${o(c)}rem + ${o(100*t)}vw, ${o(p)}rem)`}const w=`
/* dd-05/RG-12 舞台定高(min(560px, 100vh−200px),global.css .workbench .demo-stage)配套:
   行区 space-evenly 随台高分布行距,steps 小时不再「上贴顶、脚注沉底、中段空洞」
   (VR-05);ms-foot 的 margin-top:auto 与 space-evenly 互斥,一并移除 */
.ms-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-evenly; gap: 2px; padding: 30px 14px 10px; overflow: hidden; }
/* dd-03/dd-09(视觉评审·深色桌面):样张列 minmax(52px,auto) 随字号增宽,
   把公式列(1fr)逐级推右(≈340→372px),五行阶梯不成直线;且与样张列旧的
   径向百分比上限相互制约,「Aa 字」的 CJK「字」被截掉且无省略号。
   样张列定宽 220px(容纳 64px 上限字号的双语字样)、上限移除(max-width none),
   公式列左缘跨行对齐 */
.ms-row {
  display: grid; grid-template-columns: 62px 220px 1fr; align-items: baseline;
  gap: 10px; padding: 3px 6px; border-radius: 8px;
}
.ms-row:nth-child(odd) { background: color-mix(in srgb, var(--border) 16%, transparent); }
.ms-label { font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; white-space: nowrap; }
.ms-sample { font-weight: 650; line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: none; color: var(--text); }
.ms-math { font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; min-width: 0; }
.ms-math code {
  display: block; font-size: 11px; color: var(--text-dim);
  font-variant-numeric: tabular-nums; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ms-foot {
  display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
  font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums;
}
.ms-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.ms-stage { animation: ms-in 0.4s ease-out both; }
@keyframes ms-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .ms-stage { animation: none; } }
`;function N({entryId:n,schema:r}){const a=u(n,r),m=()=>({base:a.get("base"),ratio:Number(a.get("ratio")),steps:a.get("steps"),minVw:a.get("minViewport"),maxVw:a.get("maxViewport")}),[e,l]=x.useState(m);x.useEffect(()=>a.subscribe(()=>{l(m())}),[a]);const i=[];for(let t=-1;t<=e.steps;t++)i.push({n:t,size:h(e.base,e.ratio,t)});const p=Math.round(e.base)===18&&Math.abs(e.ratio-1.25)<1e-9?"Utopia 黄金样本用独立函数 fluidClamp(18, 20, 360, 1240) 复现(18→20 是 base 增长对)":void 0;return s.jsx(f,{entryId:n,schema:r,children:s.jsxs("div",{className:"ms-stage",children:[i.map(({n:t,size:c})=>{const o=Math.round(c*100)/100,d=g(o,o*e.ratio,e.minVw,e.maxVw);return s.jsxs("div",{className:"ms-row",children:[s.jsxs("span",{className:"ms-label",children:["step ",t>=0?`+${t}`:t]}),s.jsx("span",{className:"ms-sample",style:{fontSize:`${Math.min(o,64)}px`},children:"Aa 字"}),s.jsxs("span",{className:"ms-math",children:[s.jsxs("code",{children:[o,"px = ",e.base," × ",e.ratio,s.jsx("sup",{children:t})]}),s.jsx("code",{children:d})]})]},t)}),s.jsxs("div",{className:"ms-foot",children:[s.jsx("span",{className:"ms-tag",children:"size(n) = base × ratioⁿ"}),s.jsx("span",{className:"ms-tag",children:"slope = (max−min)/(maxVw−minVw)"}),s.jsxs("span",{className:"ms-tag",children:[e.minVw,"–",e.maxVw,"px 视口"]}),p&&s.jsx("span",{className:"ms-tag",children:p})]}),s.jsx("style",{children:w})]})})}export{N as default};
