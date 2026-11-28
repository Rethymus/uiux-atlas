import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{g as a}from"./color.DuEPkvq5.js";import{D as n}from"./DemoStage.vW1CgYCd.js";import"./index.DLkBFFtG.js";const i=`
.gm-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  /* 浅色糖感底:candy 材质在亮底上成立(调研 17 §10:玻璃用超薄档、雾度要低) */
  background:
    radial-gradient(90% 70% at 20% 12%, oklch(0.95 0.05 300 / 0.8), transparent 70%),
    radial-gradient(80% 70% at 85% 80%, oklch(0.93 0.06 200 / 0.75), transparent 70%),
    oklch(0.96 0.02 250);
}
/* 果冻凝胶胶囊:调研 17 §4.3 配方。三件套:高光内衬 + 底部加浓 + overshoot 回弹 */
.gm-jelly {
  position: relative;
  border: 0;
  cursor: pointer;
  font: inherit;
  color: #5b2338;
  font-weight: 700;
  font-size: 14px;
  padding: 14px 34px;
  border-radius: 999px;
  background:
    radial-gradient(120% 90% at 30% var(--gm-hy), rgb(255 255 255 / 0.85), transparent 42%),
    color-mix(in srgb, var(--gm-candy) 55%, transparent);
  -webkit-backdrop-filter: blur(6px) saturate(1.5);
  backdrop-filter: blur(6px) saturate(1.5);
  box-shadow:
    inset 0 2px 6px rgb(255 255 255 / 0.80),                 /* 高光内衬:顶部 */
    inset 0 -10px 18px color-mix(in srgb, var(--gm-candy) 55%, transparent), /* 底部糖色加浓=体积 */
    inset 0 0 0 1px rgb(255 255 255 / 0.25),                 /* 表面张力皮层 */
    0 10px 24px color-mix(in srgb, var(--gm-candy) 38%, transparent);        /* 糖色环境光 */
  transition: transform 0.18s var(--gm-bounce);              /* overshoot 回弹(y2>1) */
}
.gm-jelly:active {
  /* 1:0.9 档压缩(squish=1 → scale(.94,.88));过度压扁会从果冻滑向塑料 */
  transform: scale(calc(1 - 0.06 * var(--gm-squish)), calc(1 - 0.12 * var(--gm-squish))) translateY(1px);
}
.gm-jelly:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--gm-candy) 70%, #131b2e);
  outline-offset: 3px;
}
/* 大果冻卡:同一材质在容器级的表现 */
.gm-card {
  position: relative;
  width: min(300px, calc(100% - 48px));
  padding: 18px 22px;
  border-radius: 26px;
  color: #5b2338;
  background:
    radial-gradient(120% 90% at 30% var(--gm-hy), rgb(255 255 255 / 0.85), transparent 42%),
    color-mix(in srgb, var(--gm-candy) 55%, transparent);
  box-shadow:
    inset 0 2px 6px rgb(255 255 255 / 0.80),
    inset 0 -12px 20px color-mix(in srgb, var(--gm-candy) 55%, transparent),
    inset 0 0 0 1px rgb(255 255 255 / 0.25),
    0 12px 28px color-mix(in srgb, var(--gm-candy) 38%, transparent);
}
.gm-card .gm-title { margin: 0 0 6px; font-size: 16px; font-weight: 700; }
.gm-card p { margin: 0; font-size: 12px; line-height: 1.6; font-weight: 500; }
.gm-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgb(91 35 56 / 0.75);
  font-weight: 500;
}
@media (max-width: 480px) {
  .gm-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  /* 配方原样保留:reduce 时禁用按压形变(瞬时输入反馈) */
  .gm-jelly:active { transform: none; }
  .gm-jelly { transition: none; }
}
`;function p({entryId:t,schema:e}){return a(t,e),r.jsx(n,{entryId:t,schema:e,children:r.jsxs("div",{className:"gm-scene",children:[r.jsx("button",{type:"button",className:"gm-jelly",children:"按我一下 Press me"}),r.jsxs("div",{className:"gm-card",children:[r.jsx("p",{className:"gm-title",children:"果冻凝胶 Gel Material"}),r.jsx("p",{children:"高光内衬 + 底部加浓 + 回弹,三件套缺一不可 / Glossy lining + bottom density + bounce — all three or it is just a translucent button."})]}),r.jsx("p",{className:"gm-note",children:"按住胶囊体验 squash & 回弹;调 candy 换糖色、squish 拉满看「滑向塑料」。/ Hold the capsule for squash & bounce; switch candy for a new flavor, max squish to slide toward plastic."}),r.jsx("style",{children:i})]})})}export{p as default};
