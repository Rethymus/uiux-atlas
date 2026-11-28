import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as s}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const c=`
.gcd-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* 浅色糖感底 */
  background:
    /* SJ-04:var 携带角度单位(schema unit deg)——calc 内做色相加减必须同域
       (angle±number 非法,曾令整个 background 在计算值期失效),回退值也用 deg */
    radial-gradient(90% 70% at 18% 10%, oklch(0.96 0.06 calc(var(--gcd-hue, 340deg) + 40deg) / 0.7), transparent 70%),
    radial-gradient(80% 70% at 88% 88%, oklch(0.95 0.07 calc(var(--gcd-hue, 340deg) - 60deg) / 0.65), transparent 70%),
    oklch(0.97 0.02 var(--gcd-hue, 340));
}
/* 糖果果冻卡:胶囊几何 + 凝胶材质 + 弹性(调研 17 §10 实现基调) */
.gcd-card {
  position: relative;
  width: min(300px, calc(100% - 48px));
  padding: 18px 24px;
  border-radius: var(--gcd-radius, 999px);
  color: #5b2338;
  background:
    radial-gradient(120% 90% at 30% 18%, rgb(255 255 255 / 0.85), transparent 42%),
    hsl(var(--gcd-hue, 340) 85% 68% / 0.75);
  -webkit-backdrop-filter: blur(6px) saturate(1.4);
  backdrop-filter: blur(6px) saturate(1.4);
  box-shadow:
    inset 0 2px 6px rgb(255 255 255 / 0.8),
    inset 0 -10px 18px hsl(var(--gcd-hue, 340) 85% 55% / 0.6),
    inset 0 0 0 1px rgb(255 255 255 / 0.25),
    0 12px 26px hsl(var(--gcd-hue, 340) 85% 60% / 0.4);
}
.gcd-card .gcd-title { margin: 0 0 6px; font-size: 16px; font-weight: 700; }
.gcd-card p { margin: 0; font-size: 12px; line-height: 1.6; font-weight: 600; }
/* 糖果按钮排 */
.gcd-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.gcd-btn {
  border: 0;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  padding: 13px 30px;
  border-radius: var(--gcd-radius, 999px);
  color: #5b2338;
  background:
    radial-gradient(120% 90% at 30% 18%, rgb(255 255 255 / 0.85), transparent 42%),
    hsl(var(--gcd-hue, 340) 85% 68% / 0.8);
  box-shadow:
    inset 0 2px 6px rgb(255 255 255 / 0.8),
    inset 0 -8px 14px hsl(var(--gcd-hue, 340) 85% 55% / 0.6),
    inset 0 0 0 1px rgb(255 255 255 / 0.25),
    0 10px 22px hsl(var(--gcd-hue, 340) 85% 60% / 0.4);
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.gcd-btn:active {
  transform: scale(calc(1 - 0.06 * var(--gcd-squish, 1)), calc(1 - 0.12 * var(--gcd-squish, 1))) translateY(1px);
}
.gcd-btn:focus-visible { outline: 3px solid hsl(var(--gcd-hue, 340) 90% 30%); outline-offset: 3px; }
/* 对照模式:同一组件的 neo-brutalism 版(硬黑描边 + 硬投影,无内衬无弹性)——
   两者共享「饱和色」,分歧在阴影的硬度与边界的有无(调研 17 §10) */
.gcd-scene[data-flavor="brutal"] .gcd-card,
.gcd-scene[data-flavor="brutal"] .gcd-btn {
  background: hsl(var(--gcd-hue, 340) 85% 68%);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: 4px 4px 0 #111;
  border: 2px solid #111;
}
.gcd-scene[data-flavor="brutal"] .gcd-btn { transition: none; }
.gcd-scene[data-flavor="brutal"] .gcd-btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #111; }
.gcd-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgb(17 17 17 / 0.75);
}
.gcd-toggle button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  color: rgb(255 255 255 / 0.75);
  background: transparent;
}
.gcd-toggle button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
.gcd-note {
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
  .gcd-note { display: none; }
  .gcd-toggle { top: auto; bottom: 44px; left: 12px; right: auto; }
}
@media (prefers-reduced-motion: reduce) {
  /* 配方原样保留:reduce 时禁用按压形变 */
  .gcd-btn:active { transform: none; }
  .gcd-btn { transition: none; }
}
`;function x({entryId:a,schema:r}){s(a,r);const[t,o]=n.useState("gel");return e.jsx(d,{entryId:a,schema:r,children:e.jsxs("div",{className:"gcd-scene","data-flavor":t,children:[e.jsxs("div",{className:"gcd-card",children:[e.jsx("p",{className:"gcd-title",children:"糖果果冻风 Gel-Candy"}),e.jsx("p",{children:"胶囊几何 + 凝胶材质 + 弹性反馈 / Capsules + gel material + elastic feedback."})]}),e.jsxs("div",{className:"gcd-actions",children:[e.jsx("button",{type:"button",className:"gcd-btn",children:"点赞 Like"}),e.jsx("button",{type:"button",className:"gcd-btn",children:"收藏 Save"})]}),e.jsxs("div",{className:"gcd-toggle",role:"group","aria-label":"风味切换 Flavor switcher",children:[e.jsx("button",{type:"button","aria-pressed":t==="gel",title:"Gel-candy: soft glow, no borders, elastic",onClick:()=>o("gel"),children:"果冻 Gel"}),e.jsx("button",{type:"button","aria-pressed":t==="brutal",title:"Neo-brutalism: hard black strokes and shadows",onClick:()=>o("brutal"),children:"粗野 Brutal"})]}),e.jsx("p",{className:"gcd-note",children:"切「粗野」对照 neo-brutalism:同样的饱和色,硬边界换掉甜感。/ Switch to Brutal for the neo-brutalism contrast: same saturation, hard edges trade away the sweetness."}),e.jsx("style",{children:c})]})})}export{x as default};
