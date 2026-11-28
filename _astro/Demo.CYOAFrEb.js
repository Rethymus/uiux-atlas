import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as R}from"./DemoStage.vW1CgYCd.js";const S=`
.bl-stage { position: relative; padding: 12px; }
.bl-frame { position: relative; overflow: hidden; border-radius: 10px;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
.bl-overlay { position: absolute; inset: 0; pointer-events: none; }
.bl-grid, .bl-base { position: absolute; inset: 0; opacity: 0; transition: opacity 0.2s ease; }
.bl-grid {
  background: repeating-linear-gradient(to bottom,
    oklch(0.62 0.14 260 / 0.28) 0 1px, transparent 1px var(--bl-unit));
}
/* 基线近似画在行盒 ~80% 处:基线精确位置因字体度量而异,属教学近似 */
.bl-base {
  background: repeating-linear-gradient(to bottom,
    transparent 0,
    transparent calc((var(--bl-size) * var(--bl-lh)) * 0.8 - 0.5px),
    oklch(0.68 0.19 30 / 0.4) calc((var(--bl-size) * var(--bl-lh)) * 0.8 - 0.5px)
      calc((var(--bl-size) * var(--bl-lh)) * 0.8 + 0.5px),
    transparent calc((var(--bl-size) * var(--bl-lh)) * 0.8 + 0.5px),
    transparent calc(var(--bl-size) * var(--bl-lh)));
}
.bl-stage[data-overlay~="grid"] .bl-grid { opacity: 1; }
.bl-stage[data-overlay~="baselines"] .bl-base { opacity: 1; }
.bl-col {
  position: relative; padding: calc(var(--bl-unit) * 2);
  font-size: var(--bl-size); line-height: var(--bl-lh);
}
.bl-col > * { margin: 0; }
.bl-kicker { font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; opacity: 0.66;
  line-height: var(--bl-unit); margin-block-end: var(--bl-unit); }
.bl-h2 { font-size: calc(var(--bl-size) * 1.3); line-height: calc(var(--bl-unit) * 3);
  font-weight: 650; margin-block-end: var(--bl-unit); }
.bl-p { max-width: 42ch; margin-block-end: calc(var(--bl-unit) * 2); }
.bl-card {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 6px; padding: var(--bl-unit); /* 1px 边框 + 8px 内边距 = 9px,经典偏移点 */
  margin-block-end: calc(var(--bl-unit) * 2);
}
.bl-card p { line-height: inherit; }
.bl-list { padding-inline-start: calc(var(--bl-unit) * 2.5);
  margin-block-end: calc(var(--bl-unit) * 2); }
.bl-list li { margin-block: calc(var(--bl-unit) * 0.5); }
.bl-meta { font-size: 12px; opacity: 0.6; line-height: var(--bl-unit); }
.bl-audit { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 0;
  list-style: none; font-size: 12px; }
.bl-audit li { display: flex; gap: 8px; align-items: baseline;
  font-variant-numeric: tabular-nums; }
.bl-audit [data-ok="true"] { color: oklch(0.62 0.13 155); }
.bl-audit [data-ok="false"] { color: oklch(0.6 0.19 30); }
.bl-audit .bl-val { opacity: 0.72; margin-inline-start: auto; white-space: nowrap; }
.bl-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
.bl-toolbar { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 8px; }
.bl-toolbar button { border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: transparent; color: inherit; border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer; }
.bl-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, oklch(0.55 0.15 260) 60%, transparent); color: #fff;
  border-color: transparent; }
@media (prefers-reduced-motion: reduce) {
  .bl-grid, .bl-base { transition: none; }
}
`,B=[{id:"none",zh:"关",en:"Off"},{id:"grid",zh:"网格",en:"Grid"},{id:"baselines",zh:"基线",en:"Baselines"},{id:"both",zh:"网格+基线",en:"Both"}];function F({entryId:b,schema:p}){const t=w(b,p),[m,f]=r.useState(0),[x,v]=r.useState(()=>t.get("overlay")),[k,j]=r.useState([]),u=r.useRef(null),l=r.useRef({}),i=t.get("unit"),c=t.get("fontSize"),d=t.get("lineHeight");r.useEffect(()=>t.subscribe(()=>{v(t.get("overlay")),f(e=>e+1)}),[t]),r.useLayoutEffect(()=>{const e=u.current;if(!e)return;const z=e.getBoundingClientRect().top,s=[],N=i/2,h=n=>Math.abs(n%i)<.01||Math.abs(n%N)<.01;for(const[n,o]of Object.entries(l.current)){if(!o)continue;const g=o.getBoundingClientRect().top-z;s.push({name:n,px:g,ok:h(g)})}s.push({name:"正文行盒 line box",px:c*d,ok:h(c*d)}),s.sort((n,o)=>n.px-o.px),j(s)},[m,i,c,d]);const y=e=>`${e%1===0?e:e.toFixed(1)}px`+(Math.abs(e%i)<.01?` = ${(e/i).toFixed(e%i?1:0)}×${i}`:"");return a.jsxs(R,{entryId:b,schema:p,children:[a.jsxs("div",{className:"bl-stage","data-overlay":x,children:[a.jsx("div",{className:"bl-toolbar",role:"group","aria-label":"叠加层开关 Overlay switch",children:B.map(e=>a.jsx("button",{type:"button","aria-pressed":x===e.id,title:e.en,onClick:()=>t.set("overlay",e.id),children:e.zh},e.id))}),a.jsxs("div",{className:"bl-frame",children:[a.jsxs("div",{className:"bl-overlay","aria-hidden":"true",children:[a.jsx("div",{className:"bl-grid"}),a.jsx("div",{className:"bl-base"})]}),a.jsxs("div",{className:"bl-col",ref:u,children:[a.jsx("p",{className:"bl-kicker",ref:e=>{l.current["眉标 kicker"]=e},children:"Baseline Grid · 基线网格"}),a.jsx("h2",{className:"bl-h2",ref:e=>{l.current["标题 heading"]=e},children:"垂直空间落在同一步长上"}),a.jsx("p",{className:"bl-p",ref:e=>{l.current["正文 paragraph"]=e},children:"标题、正文、列表与卡片共享同一个步长:每个 margin、padding 和行盒都是 8px 的整数倍(或 4px 半步)。Bringhurst 说「空间如时间,比例化间隔远胜任意值」。"}),a.jsx("div",{className:"bl-card",children:a.jsx("p",{ref:e=>{l.current["卡片内文 card text"]=e},children:"1px 描边 + 8px 内边距 = 9px:经典偏移点。8px 体系判为违规; 把 unit 调到 18px,9px 恰为半步,审计自动转绿(调研 12§10)。"})}),a.jsxs("ul",{className:"bl-list",children:[a.jsx("li",{children:"行盒 16 × 1.5 = 24px = 3 步"}),a.jsx("li",{children:"段距 = 2 步,列表项距 = 半步"}),a.jsx("li",{children:"描边计入间距预算"})]}),a.jsx("p",{className:"bl-meta",ref:e=>{l.current["脚注 meta"]=e},children:"Rutter, Compose to a Vertical Rhythm, 24ways 2006 · 本站 4/8 网格 · TDesign +8 常数"})]})]}),a.jsxs("div",{className:"bl-panel",style:{marginBlockStart:"8px"},children:[a.jsx("ul",{className:"bl-audit","aria-live":"polite",children:k.map(e=>a.jsxs("li",{children:[a.jsx("span",{"data-ok":e.ok,children:e.ok?"✓":"✗"}),a.jsx("span",{children:e.name}),a.jsxs("span",{className:"bl-val",children:[y(e.px)," · 偏移 ",e.px.toFixed(1),"px"]})]},e.name))}),a.jsx("p",{className:"bl-note",children:"判据:偏移为步长整数倍或半步(unit/2,即 4/8 规则)。基线线画在行盒 ~80% 处,是教学近似——基线在行盒内的精确位置由字体度量决定。 Criterion: offsets are integer multiples of the step or half-steps (unit/2, the 4/8 rule). Baseline lines sit at ~80% of the line box — a teaching approximation, since the exact baseline position depends on font metrics."})]})]}),a.jsx("style",{children:S})]})}export{F as default};
