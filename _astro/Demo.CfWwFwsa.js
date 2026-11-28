import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as c}from"./color.DuEPkvq5.js";import{w as s}from"./urls.C_nDjrQ8.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const p=[{id:"alps",zh:"雪山(亮)",en:"Alps (bright)"},{id:"nebula",zh:"星空(暗)",en:"Nebula (dark)"},{id:"gradient",zh:"渐变",en:"Gradient"}],l=`
.cf-scene { position: absolute; inset: 0; overflow: hidden; }
.cf-bg, .cf-bg img, .cf-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cf-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* 清透磨砂卡:超薄档配方(调研 17 §2.3)——blur 由厚度轴映射,fill/sat 独立 */
.cf-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 48px));
  padding: 20px 22px;
  border-radius: 20px;
  background: rgb(255 255 255 / var(--cf-fill));                 /* 默认 8%:只糊细节不糊色彩 */
  -webkit-backdrop-filter: blur(calc(2px + 8px * var(--cf-t))) saturate(var(--cf-sat));
  backdrop-filter: blur(calc(2px + 8px * var(--cf-t))) saturate(var(--cf-sat));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.10);           /* 0 0 0 1px white/.10:超薄档内描边 */
  color: #ffffff;
  font-weight: 600;                                              /* 超薄档配对规则:加粗/纯白文字 */
  animation: cf-in 0.45s ease-out both;
}
/* Apple 官方规则:clear 叠亮背景之上时加深色 dimming 层(默认 35%)。
   demo 用「场景标记」模拟:HIG 语境是「clear 上底层内容偏亮」,雪山=亮场景启用 */
.cf-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgb(0 0 0 / var(--cf-dim));
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.cf-scene[data-dim="on"] .cf-card::before { opacity: 1; }
.cf-card > * { position: relative; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .cf-card { background: rgb(255 255 255 / 0.72); color: #131b2e; font-weight: 500; }
}
.cf-card .cf-title { margin: 0 0 8px; font-size: 17px; font-weight: 700; line-height: 1.3; }
.cf-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; font-weight: 500; }
.cf-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.cf-btn {
  border: 1px solid rgb(255 255 255 / 0.35);
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  background: transparent;
}
.cf-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; }
.cf-toolbar {
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
.cf-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.cf-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.cf-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .cf-note { display: none; }
  .cf-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes cf-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .cf-card { animation: none; }
  .cf-card::before { transition: none; }
}
`;function u({entryId:e,schema:o}){c(e,o);const[r,i]=n.useState("alps");return t.jsx(d,{entryId:e,schema:o,children:t.jsxs("div",{className:"cf-scene","data-dim":r==="alps"?"on":"off",children:[t.jsx("div",{className:"cf-bg","aria-hidden":"true",children:r==="gradient"?t.jsx("div",{className:"cf-gradient"}):t.jsx("img",{src:s(`photos/glass-${r}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),t.jsxs("div",{className:"cf-card",children:[t.jsx("p",{className:"cf-title",children:"清透磨砂 Clear Frost"}),t.jsx("p",{children:"超薄档:背景色彩原样透过 / Ultra-thin: color passes through almost intact."}),t.jsxs("div",{className:"cf-actions",children:[t.jsx("button",{type:"button",className:"cf-btn cf-btn-primary",children:"播放 Play"}),t.jsx("button",{type:"button",className:"cf-btn",children:"更多 More"})]})]}),t.jsx("div",{className:"cf-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:p.map(a=>t.jsx("button",{type:"button","aria-pressed":r===a.id,title:a.en,onClick:()=>i(a.id),children:a.zh},a.id))}),t.jsx("p",{className:"cf-note",children:"雪山为亮场景,自动叠加官方 35% 深色 dimming 层;把 dimming 调 0 看文字顶穿对比度。/ The bright Alps scene auto-stacks the official 35% dimming layer; set dimming to 0 to watch text contrast fail."}),t.jsx("style",{children:l})]})})}export{u as default};
