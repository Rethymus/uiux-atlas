import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{w as n}from"./urls.C_nDjrQ8.js";import{D as p}from"./DemoStage.vW1CgYCd.js";const d=[{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"alps",zh:"雪山",en:"Alps photo"},{id:"gradient",zh:"渐变",en:"Gradient"}],l=`
.sgg-scene { position: absolute; inset: 0; overflow: hidden; }
.sgg-bg, .sgg-bg img, .sgg-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sgg-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* 柔光玻璃卡:调研 17 §1.3 配方,box-shadow 五层「最亮在最上」 */
.sgg-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(330px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 24px;
  background: rgb(255 255 255 / 0.08);            /* 低填充,让 backdrop 透上来 */
  -webkit-backdrop-filter: blur(var(--sgg-blur)) saturate(1.6) brightness(1.08);
  backdrop-filter: blur(var(--sgg-blur)) saturate(1.6) brightness(1.08);
  box-shadow:
    inset 0 1px 0 hsl(0 0% 100% / var(--sgg-edge)),                                /* ① 顶缘镜面高光 */
    inset 0 0 18px 2px color-mix(in srgb, hsl(var(--sgg-hue) 90% 78%) var(--sgg-bleed), transparent), /* ② 内渗光 */
    0 0 0 1px rgb(255 255 255 / 0.18),                                             /* ③ 1px 亮描边 */
    0 0 var(--sgg-bloom) 4px color-mix(in srgb, hsl(var(--sgg-hue) 90% 78%) 35%, transparent),        /* ④ 外泛光 bloom */
    0 12px 40px rgb(0 0 0 / 0.25);                                                 /* ⑤ 落影 */
  color: #f5f7fa;
  animation: sgg-in 0.5s ease-out both;
}
/* 顶角定向光源:模拟单一环境灯(配方可选层) */
.sgg-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(120% 70% at 50% -20%, rgb(255 255 255 / 0.22), transparent 55%);
}
.sgg-card > * { position: relative; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .sgg-card { background: rgb(28 34 48 / 0.78); } /* 回退:提高填充不透明度保可读 */
}
.sgg-card .sgg-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; line-height: 1.3; }
.sgg-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.85; }
.sgg-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.sgg-btn {
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: #f5f7fa;
  background: transparent;
}
.sgg-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.sgg-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.sgg-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.sgg-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.sgg-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .sgg-note { display: none; }
  .sgg-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes sgg-in {
  from { opacity: 0; translate: -50% calc(-50% + 10px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .sgg-card { animation: none; }
}
`;function m({entryId:e,schema:o}){g(e,o);const[a,s]=i.useState("nebula");return r.jsx(p,{entryId:e,schema:o,children:r.jsxs("div",{className:"sgg-scene",children:[r.jsx("div",{className:"sgg-bg","aria-hidden":"true",children:a==="gradient"?r.jsx("div",{className:"sgg-gradient"}):r.jsx("img",{src:n(`photos/glass-${a}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"eager",fetchPriority:"high",decoding:"async"})}),r.jsxs("div",{className:"sgg-card",children:[r.jsx("p",{className:"sgg-title",children:"柔光玻璃 Soft-Glow Glass"}),r.jsx("p",{children:"渗光 30% · 泛光 40px · 亮边 45%——面板自己发光 / The panel itself becomes a light source."}),r.jsxs("div",{className:"sgg-actions",children:[r.jsx("button",{type:"button",className:"sgg-btn sgg-btn-primary",children:"主操作 Action"}),r.jsx("button",{type:"button",className:"sgg-btn",children:"取消 Cancel"})]})]}),r.jsx("div",{className:"sgg-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:d.map(t=>r.jsx("button",{type:"button","aria-pressed":a===t.id,title:t.en,onClick:()=>s(t.id),children:t.zh},t.id))}),r.jsx("p",{className:"sgg-note",children:"试试调大 bloom/bleed 看光感,切「雪山」亮底看泛光被洗白的边界 / Raise bloom or bleed for glow; switch to the bright backdrop to see bloom wash out."}),r.jsx("style",{children:l})]})})}export{m as default};
