import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as s}from"./color.DuEPkvq5.js";import{w as d}from"./urls.C_nDjrQ8.js";import{D as p}from"./DemoStage.vW1CgYCd.js";const g=[{id:"gradient",zh:"渐变",en:"Gradient"},{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"alps",zh:"雪山",en:"Alps photo"}],l=`
/* @property 注册角度:未注册的自定义属性不可插值——旋转的前提(Baseline 2024-07) */
@property --hg-spin {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.hg-scene { position: absolute; inset: 0; overflow: hidden; }
.hg-bg, .hg-bg img, .hg-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hg-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.55 0.16 300 / 0.85), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.5 0.14 30 / 0.8), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.45 0.15 165 / 0.85), transparent 72%),
    oklch(0.22 0.05 265);
}
/* 光晕描边卡:环=双 mask 挖空;光=同源渐变的模糊孪生层(调研 17 §5.3) */
.hg-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 18px;
  background: rgb(255 255 255 / 0.06);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  color: #f5f7fa;
  animation: hg-in 0.45s ease-out both;
}
.hg-card::before,
.hg-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from calc(var(--hg-angle) + var(--hg-spin)),
    rgb(255 176 32 / 0.9),
    rgb(255 86 168 / 0.9),
    rgb(86 128 255 / 0.9),
    rgb(255 176 32 / 0.9)
  );
  /* 挖空成细环:双 mask + exclude/xor(双写覆盖 Chromium/Safari/Firefox) */
  padding: var(--hg-ring);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: hg-spin 6s linear infinite;
}
/* 锐利层:1px 级环 + 轻微 drop-shadow(线) */
.hg-card::before { filter: drop-shadow(0 0 6px rgb(255 150 80 / 0.45)); z-index: 1; }
/* 模糊孪生层:外溢 3px、blur、降透明度,垫在卡后(光) */
.hg-card::after {
  inset: -3px;
  padding: calc(var(--hg-ring) + 2px);
  filter: blur(var(--hg-blur));
  opacity: calc(var(--hg-op) / 100%);
  z-index: -1;
}
.hg-card > * { position: relative; }
.hg-card .hg-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; line-height: 1.3; }
.hg-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.85; }
.hg-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.hg-btn {
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: #f5f7fa;
  background: transparent;
}
.hg-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.hg-toolbar {
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
.hg-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.hg-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.hg-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .hg-note { display: none; }
  .hg-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes hg-spin {
  to { --hg-spin: 360deg; }
}
@keyframes hg-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
/* reduce:环静止在 90° 相位(保留静态光,不黑掉) */
@media (prefers-reduced-motion: reduce) {
  .hg-card { animation: none; }
  .hg-card::before,
  .hg-card::after {
    animation: none;
    --hg-spin: 90deg;
  }
}
`;function f({entryId:t,schema:i}){s(t,i);const[e,o]=n.useState("gradient");return r.jsx(p,{entryId:t,schema:i,children:r.jsxs("div",{className:"hg-scene",children:[r.jsx("div",{className:"hg-bg","aria-hidden":"true",children:e==="gradient"?r.jsx("div",{className:"hg-gradient"}):r.jsx("img",{src:d(`photos/glass-${e}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),r.jsxs("div",{className:"hg-card",children:[r.jsx("p",{className:"hg-title",children:"光晕描边 Halo Border"}),r.jsx("p",{children:"锐利层做线,模糊层做光 / The sharp layer is the line; the blurred layer is the light."}),r.jsxs("div",{className:"hg-actions",children:[r.jsx("button",{type:"button",className:"hg-btn hg-btn-primary",children:"主操作 Action"}),r.jsx("button",{type:"button",className:"hg-btn",children:"取消 Cancel"})]})]}),r.jsx("div",{className:"hg-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:g.map(a=>r.jsx("button",{type:"button","aria-pressed":e===a.id,title:a.en,onClick:()=>o(a.id),children:a.zh},a.id))}),r.jsx("p",{className:"hg-note",children:"调 angle 换起始相位、glowBlur 换光的弥散;光晕层不拦截指针。/ Turn angle for a new phase, glowBlur for the light's spread; the halo never catches the pointer."}),r.jsx("style",{children:l})]})})}export{f as default};
