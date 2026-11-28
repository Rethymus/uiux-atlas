import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as d}from"./color.DuEPkvq5.js";import{w as n}from"./urls.C_nDjrQ8.js";import{D as l}from"./DemoStage.vW1CgYCd.js";const g=[{id:"gradient",zh:"渐变",en:"Gradient"},{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"alps",zh:"雪山",en:"Alps photo"}],c=`
.mg-scene { position: absolute; inset: 0; overflow: hidden; }
.mg-bg, .mg-bg img, .mg-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.mg-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* 雾面玻璃:调研 17 §3.3 统一 frost-density 参数化——density 一根轴联动 blur/fill/saturate */
.mg-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(330px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 24px;
  --mg-blur: calc(2px + 38px * var(--mg-d));    /* 2 → 40px */
  --mg-fill: calc(0.05 + 0.35 * var(--mg-d));   /* .05 → .40 */
  --mg-sat: calc(1.9 - 1.0 * var(--mg-d));      /* 1.9 → 0.9(雾要降饱和) */
  background: color-mix(in srgb, var(--mg-base) calc(var(--mg-fill) * 100%), transparent);
  -webkit-backdrop-filter: blur(var(--mg-blur)) saturate(var(--mg-sat)) contrast(var(--mg-ct));
  backdrop-filter: blur(var(--mg-blur)) saturate(var(--mg-sat)) contrast(var(--mg-ct));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.3),
    0 10px 32px rgb(15 23 42 / 0.18);
  color: #131b2e;
  animation: mg-in 0.45s ease-out both;
}
.mg-card .mg-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; line-height: 1.3; }
.mg-card p { margin: 0 0 12px; font-size: 12px; line-height: 1.6; }
.mg-scale {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 14px;
}
.mg-scale div {
  border-radius: 8px;
  padding: 6px 0;
  font-size: 11px;
  text-align: center;
  font-weight: 600;
  /* 同一密度轴的四个档位:d=0.1 / 0.4 / 0.8 / 1(配方公式同源) */
  background: color-mix(in srgb, var(--mg-base) calc((0.05 + 0.35 * var(--mg-d)) * 100%), transparent);
  -webkit-backdrop-filter: blur(calc(2px + 38px * var(--mg-d))) saturate(calc(1.9 - 1.0 * var(--mg-d)));
  backdrop-filter: blur(calc(2px + 38px * var(--mg-d))) saturate(calc(1.9 - 1.0 * var(--mg-d)));
  border: 1px solid rgb(0 0 0 / 0.06);
}
.mg-toolbar {
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
.mg-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.mg-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.mg-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .mg-note { display: none; }
  .mg-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes mg-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .mg-card { animation: none; }
}
`;function h({entryId:e,schema:i}){d(e,i);const[t,o]=s.useState("gradient");return a.jsx(l,{entryId:e,schema:i,children:a.jsxs("div",{className:"mg-scene",children:[a.jsx("div",{className:"mg-bg","aria-hidden":"true",children:t==="gradient"?a.jsx("div",{className:"mg-gradient"}):a.jsx("img",{src:n(`photos/glass-${t}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),a.jsxs("div",{className:"mg-card",children:[a.jsx("p",{className:"mg-title",children:"雾面玻璃 Mist Glass"}),a.jsx("p",{children:"只剩色温,没有信息 / Color temperature remains; information does not."}),a.jsxs("div",{className:"mg-scale","aria-hidden":"true",children:[a.jsx("div",{style:{"--mg-d":.1},children:"d≈0.1"}),a.jsx("div",{style:{"--mg-d":.4},children:"d≈0.4"}),a.jsx("div",{style:{"--mg-d":.8},children:"d≈0.8"}),a.jsx("div",{style:{"--mg-d":1},children:"d=1"})]})]}),a.jsx("div",{className:"mg-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:g.map(r=>a.jsx("button",{type:"button","aria-pressed":t===r.id,title:r.en,onClick:()=>o(r.id),children:r.zh},r.id))}),a.jsx("p",{className:"mg-note",children:"拖动 density 看一根轴联动 blur/fill/saturate;对比衰减交由 contrast 参数。/ Drag density to see one axis couple blur, fill and saturate; contrast attenuation is the contrast param."}),a.jsx("style",{children:c})]})})}export{h as default};
