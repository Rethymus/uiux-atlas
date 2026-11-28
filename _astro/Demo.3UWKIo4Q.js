import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as c}from"./color.DuEPkvq5.js";import{D as t}from"./DemoStage.vW1CgYCd.js";const p=[{n:"01",len:3},{n:"02",len:1},{n:"03",len:4},{n:"04",len:2},{n:"05",len:5},{n:"06",len:1},{n:"07",len:3},{n:"08",len:2},{n:"09",len:4}],m="沿列流动的卡片。Card flows down the column. ",d=`
.mc-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.mc-wall {
  /* 列宽下限 + 自动列数;内容沿列流动 */
  columns: auto var(--mc-width);
  column-gap: var(--mc-gap);
}
.mc-wall[data-rule="line"] { column-rule: 1px solid color-mix(in srgb, currentColor 25%, transparent); }
.mc-card {
  break-inside: avoid;   /* 防止卡片被拦腰截断 */
  margin-bottom: var(--mc-gap);
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  padding: 10px 12px;
}
.mc-card b {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
}
.mc-badge {
  display: inline-block;
  min-width: 24px;
  text-align: center;
  padding: 1px 6px;
  border-radius: 999px;
  font: 11px/1.6 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 30%, transparent);
}
.mc-card span { display: block; font-size: 12px; line-height: 1.5; opacity: 0.72; margin-top: 4px; }
.mc-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.mc-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
  background: color-mix(in srgb, oklch(0.68 0.14 75) 28%, transparent);
}
.mc-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .mc-chip { transition: none; }
}
`;function f({entryId:o,schema:a}){const r=c(o,a),[s,i]=l.useState(()=>r.get("rule"));return l.useEffect(()=>r.subscribe(()=>{i(r.get("rule"))}),[r]),e.jsx(t,{entryId:o,schema:a,children:e.jsxs("div",{className:"mc-wrap",children:[e.jsxs("div",{className:"mc-readout","aria-live":"polite",children:[e.jsx("span",{children:"columns = auto var(--mc-width)"}),e.jsx("span",{children:"column-gap = var(--mc-gap)"}),e.jsx("span",{className:"mc-chip",children:s==="line"?"column-rule: 1px solid(报章感)":"无分隔线 rule = none"})]}),e.jsx("div",{className:"mc-wall","data-rule":s,children:p.map(n=>e.jsxs("div",{className:"mc-card",children:[e.jsxs("b",{children:[e.jsx("span",{className:"mc-badge","aria-label":`顺序 ${n.n},按列排布 order ${n.n}, column-wise`,children:n.n}),"卡片 Card"]}),e.jsx("span",{children:m.repeat(n.len)})]},n.n))}),e.jsx("p",{className:"mc-hint",children:"看徽标:01 在第一栏顶部,02 排在它下方——columns 按列填充(自上而下再换列),不是按行。这正是 MDN 记载的局限:不适合按行序阅读的内容;拖宽容器列数增多、缩窄则减列;开 rule 分隔线得到报章式分栏观感。 Read the badges: 01 tops the first column and 02 sits below it — columns fill column-wise (top-to-bottom, then next column), not row-wise. That is MDN's recorded limitation: unfit for row-order reading; widen the container for more columns, narrow for fewer; the rule toggle gives the newspaper look."}),e.jsx("style",{children:d})]})})}export{f as default};
