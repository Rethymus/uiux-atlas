import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as y}from"./index.DLkBFFtG.js";import{g as S,o as g,c as u}from"./color.DuEPkvq5.js";import{D as T}from"./DemoStage.vW1CgYCd.js";const d=t=>{const a=t.replace("#","");return[0,2,4].map(e=>parseInt(a.slice(e,e+2),16)/255)},v=t=>"#"+t.map(a=>Math.round(a*255).toString(16).padStart(2,"0")).join("").toUpperCase(),j={blue:{l:.62,c:.19,h:250,oklch:"oklch(0.62 0.19 250)"},crimson:{l:.58,c:.2,h:20,oklch:"oklch(0.58 0.2 20)"},forest:{l:.6,c:.15,h:150,oklch:"oklch(0.6 0.15 150)"}};function N(t,a,e){const i=k=>k*Math.PI/180,n=t.c*Math.cos(i(t.h)),m=t.c*Math.sin(i(t.h)),s=a.c*Math.cos(i(a.h)),l=a.c*Math.sin(i(a.h)),o=e/100,x=t.l*o+a.l*(1-o),c=n*o+s*(1-o),p=m*o+l*(1-o);return{l:x,c:Math.hypot(c,p),h:(Math.atan2(p,c)*180/Math.PI+360)%360}}const w={l:1,c:0,h:0},A=`
.tk-scene {
  position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; background: #ffffff;
  /* ── 第 1 层 primitive(主题相关,data-theme 只换这一行)── */
  --tk-brand: #6b7280; /* 中性灰兜底,@supports 内按主题覆写 */
  /* ── 第 2 层 semantic(主题无关;color-mix 不支持时兜底保持中性灰,不冒认派生)── */
  --tk-primary: var(--tk-brand);
  --tk-primary-hover: #4b5563;
  --tk-primary-soft: #f3f4f6;
  --tk-border: rgba(107, 114, 128, 0.4);
  --tk-on-primary: #e5e7eb;
}
@supports (color: color-mix(in oklab, red, blue)) {
  .tk-scene[data-theme="blue"]    { --tk-brand: oklch(0.62 0.19 250); }
  .tk-scene[data-theme="crimson"] { --tk-brand: oklch(0.58 0.2 20); }
  .tk-scene[data-theme="forest"]  { --tk-brand: oklch(0.6 0.15 150); }
  .tk-scene {
    --tk-primary: var(--tk-brand);
    --tk-primary-hover: color-mix(in oklab, var(--tk-brand), black calc(var(--tk-hover-mix)));
    --tk-primary-soft: color-mix(in oklab, var(--tk-brand) calc(var(--tk-soft-bg)), transparent);
    --tk-border: color-mix(in oklab, var(--tk-brand) calc(var(--tk-border-mix)), transparent);
    --tk-on-primary: color-mix(in oklab, var(--tk-brand), white 85%);
  }
}
/* ── 第 3 层 component:零 hex,只消费语义变量 ── */
.tk-card {
  flex: 1.15; min-width: 0; border: 1px solid var(--tk-border); border-radius: 13px;
  padding: 14px 16px; display: flex; flex-direction: column; gap: 9px; background: #ffffff;
  animation: tk-in 0.4s ease-out both;
  transition: border-color 0.25s ease;
}
.tk-head { display: flex; align-items: center; gap: 9px; }
.tk-dot { width: 18px; height: 18px; border-radius: 50%; background: var(--tk-primary); transition: background-color 0.25s ease; }
.tk-head b { font-size: 14px; }
.tk-card p { margin: 0; font-size: 12px; line-height: 1.6; color: #5b6472; }
.tk-chipRow { display: flex; gap: 6px; flex-wrap: wrap; }
.tk-chip {
  padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
  background: var(--tk-primary-soft); color: #1c1b1f;
  border: 1px solid var(--tk-border);
  transition: background-color 0.25s ease, border-color 0.25s ease;
}
.tk-btn {
  width: fit-content; border: 0; border-radius: 999px; padding: 8px 18px;
  font-size: 12.5px; font-weight: 650; cursor: pointer;
  background: var(--tk-primary); color: var(--tk-on-primary);
  transition: background-color 0.25s ease;
}
.tk-btn:hover { background: var(--tk-primary-hover); }
.tk-panel { flex: 1; min-width: 265px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.tk-layer {
  background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; padding: 8px 11px;
  display: flex; flex-direction: column; gap: 3px;
  animation: tk-in 0.4s ease-out both;
}
.tk-layerTag { font-size: 10.5px; font-weight: 700; letter-spacing: 0.02em; color: #5b6472; }
.tk-layerTag[data-active="true"] { color: #0b1220; }
.tk-layerTag em { font-style: normal; color: #9aa3b2; font-weight: 500; }
.tk-code {
  font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; color: #1c1b1f;
  white-space: pre-wrap; word-break: break-all; line-height: 1.5;
}
.tk-metric {
  display: flex; align-items: center; gap: 8px; background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; padding: 8px 11px;
  animation: tk-in 0.4s ease-out both;
}
.tk-metric b { font-size: 15px; font-variant-numeric: tabular-nums; }
.tk-metric span { flex: 1; color: #5b6472; font-size: 10.5px; line-height: 1.4; }
.tk-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 7px; }
.tk-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.tk-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
.tk-chips { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: #e6e9ee; align-self: flex-start; }
.tk-chips button {
  border: 0; border-radius: 999px; padding: 4px 12px; font-size: 11.5px; cursor: pointer;
  color: #374151; background: transparent;
}
.tk-chips button[aria-pressed="true"] { background: #fff; font-weight: 650; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14); }
.tk-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
.tk-off { display: none; padding: 8px 11px; border-radius: 10px; background: #fff4e5; color: #7a4b00; font-size: 11px; }
@supports not (color: color-mix(in oklab, red, blue)) {
  .tk-off { display: block; }
}
@keyframes tk-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .tk-scene { flex-direction: column; overflow: auto; }
  .tk-panel { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .tk-card, .tk-layer, .tk-metric { animation: none; }
  .tk-btn, .tk-dot, .tk-chip, .tk-card { transition: none; }
}
`;function E({entryId:t,schema:a}){const e=S(t,a),i=()=>({theme:e.get("theme"),softBg:e.get("softBg")}),[n,m]=y.useState(i);y.useEffect(()=>e.subscribe(()=>{m(i())}),[e]);const s=j[n.theme],l=v(g(s.l,s.c,s.h).rgb),o=N(s,w,15),x=v(g(o.l,o.c,o.h).rgb),c=N(s,w,n.softBg),p=v(g(c.l,c.c,c.h).rgb),k=u(d("#FFFFFF"),d(l)),b=u(d(x),d(l)),f=u(d("#1C1B1F"),d(p)),z=["--tk-primary:        var(--tk-brand);","--tk-primary-hover:  color-mix(in oklab, var(--tk-brand),","                     black calc(var(--tk-hover-mix)));","--tk-primary-soft:   color-mix(in oklab, var(--tk-brand)","                     calc(var(--tk-soft-bg)), transparent);","--tk-border:         color-mix(in oklab, var(--tk-brand)","                     calc(var(--tk-border-mix)), transparent);","--tk-on-primary:     color-mix(in oklab, var(--tk-brand), white 85%);"].join(`
`);return r.jsxs(T,{entryId:t,schema:a,children:[r.jsxs("div",{className:"tk-scene","data-theme":n.theme,children:[r.jsxs("div",{className:"tk-card",children:[r.jsxs("div",{className:"tk-head",children:[r.jsx("span",{className:"tk-dot","aria-hidden":"true"}),r.jsxs("b",{children:["多品牌换肤 Multi-brand theme · ",n.theme]})]}),r.jsx("p",{children:"卡片/按钮/徽章的 CSS 一个字都没改——上面只重挂了 primitive 层的 --tk-brand。 Not a byte of this card's CSS changed — only the primitive --tk-brand remounted above."}),r.jsxs("div",{className:"tk-chipRow",children:[r.jsx("span",{className:"tk-chip",children:"soft bg 语义底"}),r.jsx("span",{className:"tk-chip",children:"border 语义边"}),r.jsx("span",{className:"tk-chip",children:"on-primary 语义字"})]}),r.jsx("button",{type:"button",className:"tk-btn",children:"主操作(hover 试加深)Action"})]}),r.jsxs("div",{className:"tk-panel",children:[r.jsx("div",{className:"tk-chips",role:"group","aria-label":"主题 Theme(primitive 层)",children:Object.keys(j).map(h=>r.jsx("button",{type:"button","aria-pressed":n.theme===h,onClick:()=>e.set("theme",h),children:h},h))}),r.jsxs("div",{className:"tk-layer",children:[r.jsxs("span",{className:"tk-layerTag","data-active":"true",children:["① primitive ",r.jsxs("em",{children:["每主题一行 · brand ",l,n.theme==="blue"?"(越域裁剪)":""]})]}),r.jsx("span",{className:"tk-code",children:`--tk-brand: ${s.oklch};`})]}),r.jsxs("div",{className:"tk-layer",children:[r.jsxs("span",{className:"tk-layerTag",children:["② semantic ",r.jsx("em",{children:"主题无关 · color-mix 现场派生"})]}),r.jsx("span",{className:"tk-code",children:z})]}),r.jsxs("div",{className:"tk-layer",children:[r.jsxs("span",{className:"tk-layerTag",children:["③ component ",r.jsx("em",{children:"零 hex · 只消费语义变量"})]}),r.jsx("span",{className:"tk-code",children:`.tk-btn { background: var(--tk-primary);
  color: var(--tk-on-primary); }
.tk-btn:hover { background: var(--tk-primary-hover); }`})]}),r.jsxs("div",{className:"tk-metric",children:[r.jsxs("b",{children:[k.toFixed(2),":1"]}),r.jsx("span",{children:"白字 on 品牌底(三主题同配方实测 3.62 / 4.74 / 3.70——结论不跨主题搬运)"}),r.jsxs("span",{className:"tk-badge","data-ok":k>=4.5,children:["AA ",k>=4.5?"✓":"✗"]})]}),r.jsxs("div",{className:"tk-metric",children:[r.jsxs("b",{children:[b.toFixed(2),":1"]}),r.jsxs("span",{children:["on-brand(",x,")on 品牌底:过 UI/大字档、不过正文 AA(3.06–3.90,补研 12§11 配方)"]}),r.jsxs("span",{className:"tk-badge","data-ok":b>=4.5,children:["AA ",b>=4.5?"✓":"✗"]})]}),r.jsxs("div",{className:"tk-metric",children:[r.jsxs("b",{children:[f.toFixed(2),":1"]}),r.jsxs("span",{children:["深字(#1C1B1F)on soft 语义底(",p,"):淡底配深字是安全侧"]}),r.jsxs("span",{className:"tk-badge","data-ok":f>=4.5,children:["AA ",f>=4.5?"✓":"✗"]})]}),r.jsx("p",{className:"tk-off",children:"当前浏览器不支持 color-mix(),语义层退化为中性灰兜底 token(@supports 回退),不冒认任何主题派生色。"}),r.jsx("p",{className:"tk-note",children:"三套 primitive 值逐字取自补研 12§11 片段;三层架构为 Primer 实测分层 + Android「语义化分配 color role」同构(调研 06§10)。判定不四舍五入(调研 06§17);换主题 = 整组对比度重跑。"})]})]}),r.jsx("style",{children:A})]})}export{E as default};
