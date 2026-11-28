import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as h}from"./DemoStage.vW1CgYCd.js";const l=[["短文。","一句话正文,只有一行,行轨道很浅。","这是最长的正文:整整四行文本,把内部行轨道撑到最高,用来检验页脚是否仍然跨卡对齐——subgrid 下它们共享父网格轨道,必然齐平。"],["中等长度的正文,恰好两行,可见行轨道已开始分出高下。","很短。","次长的正文占三行,与最短的一张形成落差,页脚位置差距一目了然。"],["这张卡片的正文为空档占位,行轨道塌到最小。","三行正文:第一行、第二行、第三行,稳定撑起中等轨道。","两行正文,介于最长与最短之间。"]],c=[{title:"卡片 A · Card A",footer:"footer A"},{title:"卡片 B · Card B",footer:"footer B"},{title:"卡片 C · Card C",footer:"footer C"}],g=[{label:"标签 Label",value:"值 A1 / B1 / C1",action:"操作 Act"},{label:"长标签 Label 2",value:"更长的值 A2",action:"更宽 Act 2"},{label:"第三",value:"C3",action:"OK"}],b=`
.sg-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.sg-toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.sg-btn {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
}
.sg-btn:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.sg-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}
.sg-panel {
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  padding: 12px;
}
.sg-panel h5 { margin: 0 0 8px; font-size: 12px; font-weight: 650; opacity: 0.8; }
.sg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sg-gap);
}
/* rows 轴:每张卡片跨 3 条父行轨道,内部行 = 父网格行 */
.sg-demo[data-axis="rows"] .sg-grid { grid-auto-rows: min-content; }
.sg-demo[data-axis="rows"] .sg-card {
  grid-row: auto / span 3;
  display: grid;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  padding: 8px 10px;
  background: color-mix(in srgb, currentColor 5%, transparent);
}
.sg-demo[data-axis="rows"] .sg-card[data-mode="sub"] { grid-template-rows: subgrid; }
.sg-demo[data-axis="rows"] .sg-card[data-mode="ind"] { grid-template-rows: auto auto auto; }
.sg-demo[data-axis="rows"] .sg-card h6 { margin: 0; font-size: 12px; font-weight: 700; }
.sg-demo[data-axis="rows"] .sg-card p { margin: 6px 0; font-size: 11.5px; line-height: 1.5; opacity: 0.75; }
.sg-demo[data-axis="rows"] .sg-card footer {
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.85;
  border-top: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
  padding-top: 6px;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 14%, transparent);
}
/* columns 轴:每行卡片跨父网格全部列轨道,内部列 = 父网格列 */
.sg-demo[data-axis="columns"] .sg-grid { grid-auto-rows: min-content; }
.sg-demo[data-axis="columns"] .sg-card {
  grid-column: 1 / -1;
  display: grid;
  align-items: center;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  padding: 8px 10px;
  background: color-mix(in srgb, currentColor 5%, transparent);
}
.sg-demo[data-axis="columns"] .sg-card[data-mode="sub"] { grid-template-columns: subgrid; }
.sg-demo[data-axis="columns"] .sg-card[data-mode="ind"] { grid-template-columns: auto auto auto; gap: 8px; }
.sg-demo[data-axis="columns"] .sg-cell { font-size: 11.5px; padding: 2px 0; }
.sg-demo[data-axis="columns"] .sg-cell b { font-size: 12px; }
.sg-demo[data-axis="columns"] .sg-cell i { font-style: normal; opacity: 0.7; }
.sg-demo[data-axis="columns"] .sg-cell em {
  font-style: normal;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 6px;
  padding: 1px 8px;
  justify-self: start;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 14%, transparent);
}
.sg-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
.sg-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 25%, transparent);
}
.sg-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (max-width: 480px) {
  .sg-panels { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .sg-chip { transition: none; }
}
`;function C({entryId:t,schema:n}){const o=u(t,n),[r,p]=i.useState(()=>o.get("axis")),[m,x]=i.useState(0);i.useEffect(()=>o.subscribe(()=>{p(o.get("axis"))}),[o]);const d=l[m%l.length];return s.jsx(h,{entryId:t,schema:n,children:s.jsxs("div",{className:"sg-wrap",children:[s.jsxs("div",{className:"sg-toolbar",children:[s.jsx("button",{type:"button",className:"sg-btn",onClick:()=>x(e=>e+1),children:"换长度 Vary lengths"}),s.jsxs("span",{className:"sg-chip","aria-live":"polite",children:["axis = ",r]})]}),s.jsxs("div",{className:"sg-demo sg-panels","data-axis":r,children:[s.jsxs("section",{className:"sg-panel",children:[s.jsx("h5",{children:"subgrid:共享父网格轨道 Shared parent tracks"}),s.jsx("div",{className:"sg-grid",children:r==="rows"?c.map((e,a)=>s.jsxs("article",{className:"sg-card","data-mode":"sub",children:[s.jsx("h6",{children:e.title}),s.jsx("p",{children:d[a]}),s.jsx("footer",{children:e.footer})]},e.title)):g.map((e,a)=>s.jsxs("article",{className:"sg-card","data-mode":"sub",children:[s.jsx("span",{className:"sg-cell",children:s.jsx("b",{children:e.label})}),s.jsx("span",{className:"sg-cell",children:s.jsx("i",{children:e.value})}),s.jsx("span",{className:"sg-cell",children:s.jsx("em",{children:e.action})})]},a))})]}),s.jsxs("section",{className:"sg-panel",children:[s.jsx("h5",{children:"independent:各自独立轨道(回退形态)Independent tracks (fallback)"}),s.jsx("div",{className:"sg-grid",children:r==="rows"?c.map((e,a)=>s.jsxs("article",{className:"sg-card","data-mode":"ind",children:[s.jsx("h6",{children:e.title}),s.jsx("p",{children:d[a]}),s.jsx("footer",{children:e.footer})]},e.title)):g.map((e,a)=>s.jsxs("article",{className:"sg-card","data-mode":"ind",children:[s.jsx("span",{className:"sg-cell",children:s.jsx("b",{children:e.label})}),s.jsx("span",{className:"sg-cell",children:s.jsx("i",{children:e.value})}),s.jsx("span",{className:"sg-cell",children:s.jsx("em",{children:e.action})})]},a))})]})]}),s.jsxs("p",{className:"sg-note",children:[r==="rows"?"左面板:三张卡片声明 grid-template-rows: subgrid 并各跨 3 条父行轨道——页脚行共享,永远齐平;右面板各自算行,页脚错位。点「换长度」改变正文长短验证。":"左面板:每行卡片声明 grid-template-columns: subgrid 并跨父网格全部列轨道——三列全表对齐;右面板每行独立算列宽,标签/值/操作列错位。",r==="rows"?" Left: cards declare grid-template-rows: subgrid spanning 3 parent row tracks — footer rows are shared and always flush; right: each card sizes its own rows, footers drift.":" Left: each row-card declares grid-template-columns: subgrid spanning all parent columns — three aligned columns table-wide; right: every row sizes columns independently, so label/value/action drift."]}),s.jsx("p",{className:"sg-hint",children:"subgrid 继承父网格的轨道定义(尺寸与 gap 一并继承);它只共享几何,不改变 DOM 语义,读屏顺序仍按文档流。 subgrid inherits the parent's track definitions (sizes and gap included); it shares geometry only — DOM semantics and screen-reader order stay untouched."}),s.jsx("style",{children:b})]})})}export{C as default};
