import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as y}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const v=`
.af-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.af-playground { width: 100%; overflow-x: auto; padding: 2px; }
.af-slot { width: var(--af-width); max-width: 100%; }
.af-grid,
.af-ruler {
  display: grid;
  gap: var(--af-gap);
}
.af-grid[data-mode="auto-fill"] { grid-template-columns: repeat(auto-fill, minmax(var(--af-min), 1fr)); }
.af-grid[data-mode="auto-fit"] { grid-template-columns: repeat(auto-fit, minmax(var(--af-min), 1fr)); }
.af-card {
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  padding: 10px 12px;
  min-height: 74px;
  animation: af-in 0.35s ease-out both;
}
.af-card b { display: block; font-size: 13px; margin: 0 0 4px; }
.af-card span { font-size: 12px; line-height: 1.5; opacity: 0.72; }
.af-ruler { margin-top: 2px; }
.af-cell {
  border-radius: 6px;
  padding: 4px 6px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  text-align: center;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 22%, transparent);
  border: 1px dashed color-mix(in srgb, oklch(0.66 0.13 250) 55%, transparent);
  white-space: nowrap;
}
.af-cell[data-collapsed="true"] {
  background: transparent;
  border-style: dotted;
  opacity: 0.55;
}
.af-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.af-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.af-chip-fit { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.af-chip-fill { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.af-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@keyframes af-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .af-card { animation: none; }
  .af-chip { transition: none; }
}
`;function E({entryId:d,schema:p}){const t=y(d,p),[e,x]=i.useState(()=>t.get("mode")),[n,h]=i.useState(()=>t.get("itemCount")),[f,g]=i.useState(()=>t.get("width")),[m,b]=i.useState(()=>t.get("minTrack")),[l,k]=i.useState(()=>t.get("gap"));i.useEffect(()=>t.subscribe(()=>{x(t.get("mode")),h(t.get("itemCount")),g(t.get("width")),b(t.get("minTrack")),k(t.get("gap"))}),[t]);const r=Math.max(1,Math.floor((f+l)/(m+l))),s=Math.min(r,n),c=e==="auto-fit"?Math.max(0,r-s):0;return a.jsx(w,{entryId:d,schema:p,children:a.jsxs("div",{className:"af-wrap",children:[a.jsx("div",{className:"af-playground",children:a.jsxs("div",{className:"af-slot",children:[a.jsx("div",{className:"af-grid","data-mode":e,children:Array.from({length:n},(j,o)=>a.jsxs("div",{className:"af-card",children:[a.jsxs("b",{children:["卡片 ",String(o+1).padStart(2,"0")]}),a.jsx("span",{children:"minmax(var(--af-min), 1fr) 轨道 · fluid track"})]},o))}),a.jsx("div",{className:"af-ruler",style:{gridTemplateColumns:`repeat(${r}, minmax(0, 1fr))`},"aria-hidden":"true",children:Array.from({length:r},(j,o)=>{const u=o>=s;return a.jsx("div",{className:"af-cell","data-collapsed":u&&e==="auto-fit"?"true":"false",children:u&&e==="auto-fit"?"回收 0px":"1fr"},o)})})]})}),a.jsxs("div",{className:"af-readout","aria-live":"polite",children:[a.jsxs("span",{children:["width = ",f,"px"]}),a.jsxs("span",{children:["min = ",m,"px"]}),a.jsxs("span",{children:["gap = ",l,"px"]}),a.jsxs("span",{children:["轨道数 = ",r,"(计算值)"]}),a.jsxs("span",{children:["条目 = ",n]}),a.jsx("span",{className:`af-chip ${e==="auto-fit"?"af-chip-fit":"af-chip-fill"}`,children:e==="auto-fit"?`auto-fit · 回收 ${c} 条空轨道`:"auto-fill · 保留空轨道"})]}),a.jsxs("p",{className:"af-hint",children:[e==="auto-fit"&&c>0?"auto-fit 把没有条目的轨道回收为 0px,剩余轨道拉伸填满——这正是它和 auto-fill 的全部区别。":e==="auto-fill"&&s<r?"auto-fill 保留空轨道(空置但占位)——需要轨道位置稳定时选它。":"条目数 ≥ 轨道数时两个关键字渲染结果相同;把条目数调到小于轨道数即可看到差异。",e==="auto-fit"&&c>0?" auto-fit collapses item-less tracks to 0px and stretches the rest — the entire difference from auto-fill.":e==="auto-fill"&&s<r?" auto-fill keeps empty tracks (vacant but in place) — pick it when track positions must stay stable.":" With items ≥ tracks both keywords render identically; drop the item count below the track count to see the split."]}),a.jsx("style",{children:v})]})})}export{E as default};
