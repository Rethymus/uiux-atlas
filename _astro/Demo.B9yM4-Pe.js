import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as f}from"./color.DuEPkvq5.js";import{D as y}from"./DemoStage.vW1CgYCd.js";const k=`
.vr-stage { position: relative; padding: 12px; }
.vr-toolbar { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 10px; }
.vr-toolbar button { border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: transparent; color: inherit; border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer; }
.vr-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, oklch(0.55 0.15 260) 60%, transparent); color: #fff;
  border-color: transparent; }
.vr-frame { position: relative; overflow: hidden; border-radius: 10px;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
/* 韵律线:每 --vr-unit 一条淡线;行盒叠加由各块自身的渐变背景完成 */
.vr-lines { position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(to bottom,
    oklch(0.62 0.14 260 / 0.16) 0 1px, transparent 1px var(--vr-unit)); }
.vr-col { position: relative; padding: var(--vr-unit) calc(var(--vr-unit) * 1.5); }
.vr-col > p { font-size: var(--vr-body); line-height: var(--vr-unit); margin: 0;
  background: repeating-linear-gradient(to bottom,
    oklch(0.72 0.15 150 / 0.14) 0 calc(var(--vr-unit) - 1px),
    transparent calc(var(--vr-unit) - 1px) var(--vr-unit)); }
.vr-h2 { font-size: var(--vr-head); margin: 0; }
.vr-quote { margin: 0; font-size: var(--vr-body); line-height: var(--vr-unit);
  padding-inline-start: calc(var(--vr-unit) * 0.5);
  border-inline-start: 3px solid color-mix(in srgb, currentColor 30%, transparent);
  background: repeating-linear-gradient(to bottom,
    oklch(0.78 0.13 85 / 0.16) 0 calc(var(--vr-unit) - 1px),
    transparent calc(var(--vr-unit) - 1px) var(--vr-unit)); }
.vr-cap { font-size: 12px; opacity: 0.6; margin: 0; }
/* rhythm 模式:间距取单元倍数;标题行高由 TSX 内联(单元 ÷ 字号) */
.vr-stage[data-mode="rhythm"] .vr-h2 { margin-block-end: var(--vr-unit); }
.vr-stage[data-mode="rhythm"] .vr-col > p { margin-block-end: calc(var(--vr-unit) * 1.5); }
.vr-stage[data-mode="rhythm"] .vr-quote { margin-block: var(--vr-unit); }
.vr-stage[data-mode="rhythm"] .vr-cap { margin-block-start: var(--vr-unit); }
/* free 对照:任意值——韵律破坏现场 */
.vr-stage[data-mode="free"] .vr-h2 { line-height: 1.1; margin: 0 0 13px; }
.vr-stage[data-mode="free"] .vr-col > p { line-height: 1.45; margin: 0 0 7px; }
.vr-stage[data-mode="free"] .vr-quote { line-height: 1.45; margin: 5px 0; }
.vr-stage[data-mode="free"] .vr-cap { margin-top: 11px; }
.vr-stage[data-mode="free"] .vr-col > p,
.vr-stage[data-mode="free"] .vr-quote { background: none; }
.vr-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-block-start: 10px; }
.vr-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.vr-badge[data-ok="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.vr-badge[data-ok="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 16%, transparent); }
.vr-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;function S({entryId:l,schema:d}){const e=f(l,d),[m,g]=n.useState(0),[t,u]=n.useState(()=>e.get("mode")),s=n.useRef(null),[c,x]=n.useState(""),a=e.get("baseUnit"),b=e.get("bodySize"),o=e.get("headingSize");n.useEffect(()=>e.subscribe(()=>{u(e.get("mode")),g(i=>i+1)}),[e]),n.useLayoutEffect(()=>{const i=(a/o).toFixed(4);x(i),t==="rhythm"?s.current?.style.setProperty("line-height",i):s.current?.style.removeProperty("line-height")},[a,o,t,m]);const p=a/b,v=p>=1.5,h=t==="rhythm";return r.jsxs(y,{entryId:l,schema:d,children:[r.jsxs("div",{className:"vr-stage","data-mode":t,children:[r.jsxs("div",{className:"vr-toolbar",role:"group","aria-label":"韵律模式 Rhythm mode",children:[r.jsx("button",{type:"button","aria-pressed":t==="rhythm",onClick:()=>e.set("mode","rhythm"),children:"套用韵律 Rhythm"}),r.jsx("button",{type:"button","aria-pressed":t==="free",onClick:()=>e.set("mode","free"),children:"自由排版对照 Free"})]}),r.jsxs("div",{className:"vr-meta",children:[r.jsxs("span",{className:"vr-badge","data-ok":v,children:["行高比 ",p.toFixed(2),"×",v?" ✓ ≥1.5(WCAG 1.4.12)":" ✗ 低于 1.5 阈值"]}),r.jsxs("span",{className:"vr-badge","data-ok":h,children:["标题行高 ",t==="rhythm"?`${c}(= ${a}÷${o},占 1 单元)`:"1.1(脱离单元)"]}),r.jsxs("span",{className:"vr-badge","data-ok":h,children:["段距 ",t==="rhythm"?`${a*1.5}px = 1.5×单元`:"7px(非倍数)"]})]}),r.jsxs("div",{className:"vr-frame",children:[r.jsx("div",{className:"vr-lines","aria-hidden":"true"}),r.jsxs("div",{className:"vr-col",children:[r.jsx("h2",{className:"vr-h2",ref:s,children:"韵律是可听的排版 / Rhythm you can hear"}),r.jsxs("p",{children:["把正文行高定为基本单元:行盒逐行叠加像乐谱,间距是单元的整数倍。 标题行高用单元反推——",a," ÷ ",o," = ",c,",标题行盒恰好落进一格。"]}),r.jsx("blockquote",{className:"vr-quote",children:"「空间如时间,比例化间隔远胜任意值。」—— Bringhurst,经 Rutter 24ways 2006 转述"}),r.jsx("p",{children:"切到 free 模式:13px/7px 的任意间距、1.1 的标题行高——绿色行盒条带不再咬合蓝色韵律线, 文本块开始「发闷」。韵律失效从不是报错,而是这种说不清的拥挤。"}),r.jsxs("p",{className:"vr-cap",children:["Rutter, Compose to a Vertical Rhythm · 单元 ",a,"px = 正文行高 · 行盒条带周期 = 单元(教学可视化)"]})]})]}),r.jsx("p",{className:"vr-note",children:"行盒条带为教学可视化(周期 = 单元的 repeating-linear-gradient),绿色=正文、黄色=引语; 蓝色韵律线每单元一条。行高全部为无单位比值,保证用户缩放不破坏节奏。 Line-box stripes are a teaching visualization (repeating-linear-gradient with a period of the unit), green = body, amber = quote; blue rhythm lines run every unit. All line-heights are unitless so user zoom never breaks the rhythm."})]}),r.jsx("style",{children:k})]})}export{S as default};
