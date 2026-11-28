import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const f=`
.demo-stage {
  --min-space: 8px;
  --min-accent: #2563eb;
}
.min-scene {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  background: #fafaf9;   /* --bg,调研 token */
  color: #1c1917;        /* --ink,调研 token */
  animation: min-in 0.4s ease-out both;
}
.min-page {
  width: min(65ch, calc(100% - 48px));
  padding: calc(var(--min-space) * 5) 0;
}
.min-eyebrow {
  margin: 0 0 calc(var(--min-space) * 3);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #57534e;        /* --ink-muted,调研 token */
}
.min-h1 { margin: 0 0 calc(var(--min-space) * 4); font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
.min-body {
  margin: 0 0 calc(var(--min-space) * 5);
  font-size: 16px;
  line-height: 1.6;
  color: #57534e;
}
.min-cta {
  display: inline-block;
  border: 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: var(--min-accent);
  padding: calc(var(--min-space) * 1.5) calc(var(--min-space) * 3);
  border-radius: var(--min-space);
  transition: filter 0.12s ease;
}
.min-cta:hover { filter: brightness(0.94); }
.min-cta:focus-visible { outline: 2px solid var(--min-accent); outline-offset: 2px; }
.min-divider { border: 0; border-top: 1px solid #f0efec; margin: calc(var(--min-space) * 6) 0; }  /* --surface,调研 token */
.min-scale { display: grid; gap: calc(var(--min-space) * 2); }
.min-scale-row { display: flex; align-items: baseline; gap: calc(var(--min-space) * 2); }
.min-scale-label {
  flex: 0 0 108px;
  font-family: ui-monospace, "JetBrains Mono", "Courier New", monospace;
  font-size: 11px;
  color: #57534e;
}
.min-scale-sample { color: #1c1917; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
@keyframes min-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .min-scene { animation: none; }
  .min-cta { transition: none; }
}
`;function b({entryId:c,schema:o}){const a=p(c,o),[i,m]=l.useState(()=>a.get("ratio"));l.useEffect(()=>a.subscribe(()=>{m(a.get("ratio"))}),[a]);const s=16,r=[{key:"caption",zh:"辅助说明",en:"Caption",size:s/i},{key:"body",zh:"正文",en:"Body",size:s},{key:"h3",zh:"小标题",en:"H3",size:s*i},{key:"h2",zh:"节标题",en:"H2",size:s*i*i},{key:"h1",zh:"主标题",en:"H1",size:s*i*i*i}],t=n=>`${(Math.round(n*10)/10).toFixed(1)}px`;return e.jsxs(d,{entryId:c,schema:o,children:[e.jsx("div",{className:"min-scene",children:e.jsxs("div",{className:"min-page",children:[e.jsx("p",{className:"min-eyebrow",children:"Minimal · 基线 Baseline"}),e.jsx("h1",{className:"min-h1",style:{fontSize:t(r[4].size)},children:"一个想法一个屏幕 One idea, one screen"}),e.jsx("p",{className:"min-body",children:"留白即设计系统:层级靠字阶与间距刻度,不靠边框与卡片。 Whitespace is the design system — hierarchy comes from the type scale and spacing steps, not borders."}),e.jsx("button",{type:"button",className:"min-cta",children:"开始使用 Get started"}),e.jsx("hr",{className:"min-divider"}),e.jsx("div",{className:"min-scale","aria-label":"字阶标本 Type-scale specimen",children:r.map(n=>e.jsxs("div",{className:"min-scale-row",children:[e.jsxs("span",{className:"min-scale-label",children:[n.en," · ",t(n.size)]}),e.jsx("span",{className:"min-scale-sample",style:{fontSize:t(n.size)},children:n.zh})]},n.key))})]})}),e.jsx("style",{children:f})]})}export{b as default};
