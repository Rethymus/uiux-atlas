import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as c}from"./DemoStage.vW1CgYCd.js";const p=[{n:"01",len:2},{n:"02",len:4},{n:"03",len:1},{n:"04",len:3},{n:"05",len:5},{n:"06",len:2},{n:"07",len:1},{n:"08",len:4},{n:"09",len:3},{n:"10",len:2}],d="不等高条目 Uneven item. ",m=`
.gl-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.gl-toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.gl-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.gl-chip-native { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.gl-chip-fallback { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.gl-chip-cols { background: color-mix(in srgb, oklch(0.66 0.13 250) 28%, transparent); }
.gl-wall {
  display: grid;         /* 回退:所有浏览器(规范推荐双写) */
  display: grid-lanes;   /* Safari 26.4+ / Firefox Nightly */
  grid-template-columns: repeat(auto-fill, minmax(var(--gl-min), 1fr));
  gap: var(--gl-gap);
}
.gl-wall[data-engine="columns"] {
  display: block;
  columns: auto var(--gl-min);
  column-gap: var(--gl-gap);
}
.gl-card {
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  padding: 10px 12px;
}
.gl-wall[data-engine="columns"] .gl-card {
  break-inside: avoid;   /* 多列兜底:防止卡片被拦腰截断 */
  margin-bottom: var(--gl-gap);
}
.gl-card b { display: block; font-size: 12.5px; margin: 0 0 4px; }
.gl-card span { font-size: 12px; line-height: 1.5; opacity: 0.72; }
.gl-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.gl-code {
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.6 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.gl-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .gl-chip { transition: none; }
}
`;function f({entryId:i,schema:o}){const l=g(i,o),[n,t]=s.useState(()=>l.get("engine"));s.useEffect(()=>l.subscribe(()=>{t(l.get("engine"))}),[l]);const a=typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports("display","grid-lanes"):!1;return e.jsx(c,{entryId:i,schema:o,children:e.jsxs("div",{className:"gl-wrap",children:[e.jsxs("div",{className:"gl-readout","aria-live":"polite",children:[e.jsxs("span",{children:["engine = ",n]}),e.jsx("span",{className:`gl-chip ${n==="columns"?"gl-chip-cols":a?"gl-chip-native":"gl-chip-fallback"}`,children:n==="columns"?"columns 多列兜底(全平台)":a?"本浏览器原生支持 grid-lanes → 泳道排布":"本浏览器未实现 grid-lanes → 回退普通网格"})]}),e.jsx("div",{className:"gl-wall","data-engine":n,children:p.map(r=>e.jsxs("div",{className:"gl-card",children:[e.jsxs("b",{children:["条目 ",r.n]}),e.jsx("span",{children:d.repeat(r.len)})]},r.n))}),e.jsx("pre",{className:"gl-code","aria-label":"当前生效的声明 active declarations",children:n==="columns"?`.gl-wall { display: block; columns: auto var(--gl-min); column-gap: var(--gl-gap); }
.gl-card { break-inside: avoid; margin-bottom: var(--gl-gap); }`:`.gl-wall {
  display: grid;         /* 回退:所有浏览器 */
  display: grid-lanes;   /* Safari 26.4+ / Firefox Nightly */
  grid-template-columns: repeat(auto-fill, minmax(var(--gl-min), 1fr));
  gap: var(--gl-gap);
}`}),e.jsxs("p",{className:"gl-hint",children:[n==="grid-lanes"&&!a?"当前浏览器未实现 grid-lanes,双写声明回退普通网格:不等高条目按行带对齐,同一行被最高条目拖累——行带错位正是泳道布局要解决的问题。Safari 26.4+ / Firefox Nightly 将呈现「条目进入剩余空间最多的列」的泳道排布。":n==="grid-lanes"&&a?"本浏览器原生支持 grid-lanes:条目逐个放入列轨道、自动进入剩余空间最多的列,另一轴依次堆叠——无行带错位。":"columns 多列是全平台可用的兜底:内容沿列流动、卡片 break-inside: avoid 防截断;注意顺序按列排布(自上而下再换列),不适合按行序阅读的内容。",n==="grid-lanes"&&!a?" This browser lacks grid-lanes, so the dual write falls back to a plain grid: uneven items align in row bands dragged by the tallest sibling — the very problem lanes solve. Safari 26.4+ / Firefox Nightly will place each item into the column with the most remaining space.":n==="grid-lanes"&&a?" This browser natively supports grid-lanes: items drop into tracks one by one, entering the column with the most remaining space — no row-band misalignment.":" The columns multi-column fallback works everywhere: content flows down columns with break-inside: avoid; note the order runs down each column, unfit for row-order reading."]}),e.jsx("style",{children:m})]})})}export{f as default};
