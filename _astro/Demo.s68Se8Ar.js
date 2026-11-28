import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{w as c}from"./urls.C_nDjrQ8.js";import{D as g}from"./DemoStage.vW1CgYCd.js";const b=[{id:"alps",zh:"雪山",en:"Alps photo"},{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"gradient",zh:"渐变",en:"Gradient"}],m=`
.demo-stage {
  --glass-blur: 20px;
  --glass-fill: oklch(1 0 0 / 0.15);
  --glass-border: oklch(1 0 0 / 0.3);
  --glass-radius: 20px;
}
.gm-scene { position: absolute; inset: 0; overflow: hidden; }
.gm-bg { position: absolute; inset: 0; }
.gm-bg img,
.gm-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.gm-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
.gm-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(340px, calc(100% - 32px));
  padding: 24px 26px;
  background-color: var(--glass-fill);
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  -webkit-backdrop-filter: blur(var(--glass-blur));
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  /* dd-08(视觉评审·深色桌面):正文实测对比 3.73:1(<4.5 AA)——0.82 透明度把
     深色文字向亮背景洗淡。文字加深到 #131b2e(对实测最亮背景 (155,136,139)
     ≈5.2:1,AA 达标)且正文不再降透明度;深色变体在下方整卡反白,不受影响 */
  color: #131b2e;
  animation: gm-in 0.5s ease-out both;
}
.gm-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(17, 25, 40, 0.55);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.gm-scene[data-variant="dark"] .gm-card { color: #f5f7fa; }
.gm-scene[data-variant="dark"] .gm-card::before { opacity: 1; }
.gm-card > * { position: relative; }
/* 标题降为 p 后,显式钉住原 h3 视觉(含对 .gm-card p 规则的 opacity/line-height 反制) */
.gm-card .gm-card-title { margin: 0 0 8px; font-size: 18px; font-weight: 650; line-height: 1.3; opacity: 1; }
/* dd-08:正文 opacity 1(原 0.82 是 3.73:1 不达标主因),颜色随 .gm-card 加深 */
.gm-card p { margin: 0 0 16px; font-size: 13px; line-height: 1.6; opacity: 1; }
/* VR-10(视觉评审·浅色与移动端):360px 下双语按钮文案「主操作/Action」被拆两行
   ——nowrap 保单行文案,wrap 允许整体换行兜底(窄卡不溢出) */
.gm-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.gm-btn {
  border: 1px solid var(--glass-border);
  border-radius: calc(var(--glass-radius) / 2);
  padding: 7px 16px;
  font-size: 13px;
  cursor: pointer;
  color: inherit;
  white-space: nowrap;
}
.gm-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.gm-btn-ghost { background: transparent; }
.gm-toolbar {
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
/* 窄屏(≤480px)钉到场景左下角:徽标在左上、卡片居中,左下是唯一空闲区 */
@media (max-width: 480px) {
  .gm-toolbar {
    top: auto;
    bottom: 12px;
    left: 12px;
    right: auto;
  }
}
.gm-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
  position: relative;
}
/* VR-09(视觉评审·浅色与移动端):背景切换钮命中区仅 ~26px(移动端该演示唯一
   可交互控件,误触率最高)——::after 扩热区至 ≈42px(全站 ::after 处方,
   spec §7);视觉药丸保持 26px 不变 */
.gm-toolbar button::after {
  content: "";
  position: absolute;
  inset: -8px;
}
.gm-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .gm-card { background-color: color-mix(in srgb, var(--glass-fill) 100%, #c7cfdb 65%); }
}
@keyframes gm-in {
  from { opacity: 0; translate: -50% calc(-50% + 10px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .gm-card { animation: none; }
  .gm-card::before { transition: none; }
}
`;function v({entryId:i,schema:s}){const t=p(i,s),[n,d]=e.useState(()=>t.get("variant")),[o,l]=e.useState("alps");return e.useEffect(()=>t.subscribe(()=>{d(t.get("variant"))}),[t]),a.jsxs(g,{entryId:i,schema:s,children:[a.jsxs("div",{className:"gm-scene","data-variant":n,children:[a.jsx("div",{className:"gm-bg",children:o==="gradient"?a.jsx("div",{className:"gm-gradient"}):a.jsx("img",{src:c(`photos/glass-${o}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"eager",fetchPriority:"high",decoding:"async"})}),a.jsxs("div",{className:"gm-card",children:[a.jsx("p",{className:"gm-card-title",children:"毛玻璃卡片 Glass Card"}),a.jsx("p",{children:"背景越丰富,玻璃越立体 / Glass only reads as glass over a rich backdrop."}),a.jsxs("div",{className:"gm-actions",children:[a.jsx("button",{type:"button",className:"gm-btn gm-btn-primary",children:"主操作 Action"}),a.jsx("button",{type:"button",className:"gm-btn gm-btn-ghost",children:"取消 Cancel"})]})]}),a.jsx("div",{className:"gm-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:b.map(r=>a.jsx("button",{type:"button","aria-pressed":o===r.id,title:r.en,onClick:()=>l(r.id),children:r.zh},r.id))})]}),a.jsx("style",{children:m})]})}export{v as default};
