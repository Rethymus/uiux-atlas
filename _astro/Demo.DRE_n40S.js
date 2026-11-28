import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as n}from"./color.DuEPkvq5.js";import{w as d}from"./urls.C_nDjrQ8.js";import{D as p}from"./DemoStage.vW1CgYCd.js";const l=[{id:"alps",zh:"雪山(亮)",en:"Alps (bright)"},{id:"nebula",zh:"星空(暗)",en:"Nebula (dark)"},{id:"gradient",zh:"渐变",en:"Gradient"}],c=`
.sm-scene { position: absolute; inset: 0; overflow: hidden; }
.sm-bg, .sm-bg img, .sm-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sm-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* 烟熏玻璃卡:密度轴公式(§3.3)的暗色应用 [R];填充=实色 tint + opacity 双层 */
.sm-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 20px;
  background: transparent;
  -webkit-backdrop-filter:
    blur(calc(2px + 38px * var(--sm-density)))
    saturate(calc(1.9 - var(--sm-density)))
    contrast(calc(1 - 0.15 * var(--sm-density)));
  backdrop-filter:
    blur(calc(2px + 38px * var(--sm-density)))
    saturate(calc(1.9 - var(--sm-density)))
    contrast(calc(1 - 0.15 * var(--sm-density)));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / calc(var(--sm-highlight) / 100)),
    0 12px 40px rgb(0 0 0 / 0.25);
  color: #f5f7fa;
  animation: sm-in 0.45s ease-out both;
}
/* 深色填充层:实色 tint,opacity = .05 + .35d(§3.3 fill 公式,基线能力不依赖 color-mix) */
.sm-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--sm-tint);
  opacity: calc(0.05 + 0.35 * var(--sm-density));
  pointer-events: none;
}
/* 顶部拉丝高光:顶缘亮线(§1.3 ①,alpha 参数化)+ 渐变受光 + 1px 细线纹理 [R] */
.sm-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    repeating-linear-gradient(100deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 4px),
    linear-gradient(180deg, rgb(255 255 255 / calc(var(--sm-highlight) / 100)), transparent 48%);
}
/* 回退:§3.4 mist 思路,填充层提到 .96 不透明——烟熏本体深色,回退几乎无损 */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .sm-card::before { opacity: 0.96; }
}
.sm-card > * { position: relative; }
.sm-card .sm-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; line-height: 1.3; }
.sm-card p.sm-body { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.9; }
.sm-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.sm-btn {
  border: 1px solid rgb(255 255 255 / 0.4);
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
  background: rgb(15 23 42 / 0.35);
}
.sm-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; }
.sm-toolbar {
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
.sm-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.sm-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.sm-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .sm-note { display: none; }
  .sm-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes sm-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .sm-card { animation: none; }
}
`;function h({entryId:s,schema:e}){n(s,e);const[a,i]=o.useState("alps");return t.jsx(p,{entryId:s,schema:e,children:t.jsxs("div",{className:"sm-scene",children:[t.jsx("div",{className:"sm-bg","aria-hidden":"true",children:a==="gradient"?t.jsx("div",{className:"sm-gradient"}):t.jsx("img",{src:d(`photos/glass-${a}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),t.jsxs("div",{className:"sm-card",children:[t.jsx("p",{className:"sm-title",children:"烟熏玻璃 Smoked Glass"}),t.jsx("p",{className:"sm-body",children:"背景只剩色温,不剩信息——文字对比天然稳固 / Only color temperature passes through — text contrast holds on its own."}),t.jsxs("div",{className:"sm-actions",children:[t.jsx("button",{type:"button",className:"sm-btn sm-btn-primary",children:"主操作 Action"}),t.jsx("button",{type:"button",className:"sm-btn",children:"取消 Cancel"})]})]}),t.jsx("div",{className:"sm-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:l.map(r=>t.jsx("button",{type:"button","aria-pressed":a===r.id,title:r.en,onClick:()=>i(r.id),children:r.zh},r.id))}),t.jsx("p",{className:"sm-note",children:"density=0.8 即 §3.3 mist 档;亮背景上烟熏无需 35% dimming 层(clear-frost 的 HIG 规则)。 / density 0.8 equals §3.3's mist stop; over bright backdrops smoked needs no 35% dimming layer (clear-frost's HIG rule)."}),t.jsx("style",{children:c})]})})}export{h as default};
