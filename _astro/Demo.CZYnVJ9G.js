import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as d}from"./color.DuEPkvq5.js";import{D as c}from"./DemoStage.vW1CgYCd.js";const t={"desktop-left":{areas:`"header header"
"side   main"
"footer footer"`,cols:"var(--hg-side) 1fr",rows:"auto 1fr auto",label:"侧栏在左 sidebar left"},"desktop-right":{areas:`"header header"
"main   side"
"footer footer"`,cols:"1fr var(--hg-side)",rows:"auto 1fr auto",label:"侧栏在右 sidebar right"},stacked:{areas:`"header"
"main"
"side"
"footer"`,cols:"1fr",rows:"auto 1fr auto auto",label:"单列堆叠 stacked"}},p=`
.hg-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.hg-page {
  display: grid;
  gap: var(--hg-gap);
  min-height: 340px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  padding: 12px;
  background: color-mix(in srgb, currentColor 4%, transparent);
}
.hg-cell {
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  padding: 8px 12px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-size: 12px;
}
.hg-cell b { display: block; font-size: 12.5px; margin-bottom: 2px; }
.hg-cell span { opacity: 0.7; font-size: 11.5px; line-height: 1.5; }
.hg-header { background: color-mix(in srgb, oklch(0.66 0.13 250) 24%, transparent); }
.hg-footer { background: color-mix(in srgb, oklch(0.66 0.13 250) 16%, transparent); }
.hg-side { background: color-mix(in srgb, oklch(0.68 0.15 160) 18%, transparent); }
.hg-main { background: color-mix(in srgb, oklch(0.68 0.14 75) 14%, transparent); }
.hg-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.hg-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 26%, transparent);
}
.hg-code {
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.6 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.hg-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .hg-chip { transition: none; }
}
`;function u({entryId:s,schema:o}){const a=d(s,o),[i,l]=n.useState(()=>a.get("layout"));n.useEffect(()=>a.subscribe(()=>{l(a.get("layout"))}),[a]);const r=t[i]??t["desktop-left"];return e.jsx(c,{entryId:s,schema:o,children:e.jsxs("div",{className:"hg-wrap",children:[e.jsxs("div",{className:"hg-page",style:{gridTemplateAreas:r.areas,gridTemplateColumns:r.cols,gridTemplateRows:r.rows},children:[e.jsxs("div",{className:"hg-cell hg-header",style:{gridArea:"header"},children:[e.jsx("b",{children:"header 页头"}),e.jsx("span",{children:"grid-area: header"})]}),e.jsxs("div",{className:"hg-cell hg-side",style:{gridArea:"side"},children:[e.jsx("b",{children:"side 侧栏"}),e.jsx("span",{children:"grid-area: side · var(--hg-side)"})]}),e.jsxs("div",{className:"hg-cell hg-main",style:{gridArea:"main"},children:[e.jsx("b",{children:"main 主栏"}),e.jsx("span",{children:"grid-area: main · 1fr 吃下剩余空间 The main column takes the rest."})]}),e.jsxs("div",{className:"hg-cell hg-footer",style:{gridArea:"footer"},children:[e.jsx("b",{children:"footer 页脚"}),e.jsx("span",{children:"grid-area: footer"})]})]}),e.jsxs("div",{className:"hg-readout","aria-live":"polite",children:[e.jsxs("span",{children:["layout = ",i]}),e.jsx("span",{className:"hg-chip",children:r.label})]}),e.jsx("pre",{className:"hg-code","aria-label":"当前 grid-template-areas 声明 the active grid-template-areas declaration",children:`grid-template-areas:
  ${r.areas.split(`
`).join(`
  `)};
grid-template-columns: ${r.cols};
grid-template-rows: ${r.rows};`}),e.jsx("p",{className:"hg-hint",children:"切换三档:DOM 一个字都没动,只有 areas 字符串在变——同名 token(header/side/main/footer)合并为命名区域,成员用 grid-area 入座。 Switch the modes: the DOM never changes, only the areas string does — same-name tokens (header/side/main/footer) merge into named areas and members sit via grid-area. 注意 DOM 顺序恒为 header → side → main → footer,读屏顺序不随视觉重排(WCAG 1.3.2)。 The DOM order stays header → side → main → footer; screen-reader order never follows the visual re-order (WCAG 1.3.2)."}),e.jsx("style",{children:p})]})})}export{u as default};
