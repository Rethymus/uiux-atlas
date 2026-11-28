import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{w as p}from"./urls.C_nDjrQ8.js";import{D as c}from"./DemoStage.vW1CgYCd.js";const b=[{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"alps",zh:"雪山",en:"Alps photo"},{id:"gradient",zh:"渐变",en:"Gradient"}],x=`
/* @property 注册角度:未注册的自定义属性不可插值——旋转的前提(Baseline 2024-07,调研 17 §5.3) */
@property --ig-spin {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.ig-scene { position: absolute; inset: 0; overflow: hidden; }
.ig-bg, .ig-bg img, .ig-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ig-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.5 0.16 300 / 0.85), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.55 0.14 220 / 0.8), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.45 0.15 165 / 0.85), transparent 72%),
    oklch(0.18 0.05 265);
}
/* 极光玻璃卡:本体 = §5.3 halo(blur 12/sat 1.4 低填充)+ §1.3 渗光箱影 */
.ig-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 20px;
  background: rgb(255 255 255 / 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  backdrop-filter: blur(12px) saturate(1.4);
  box-shadow:
    inset 0 0 18px 2px hsl(var(--ig-hue) 90% 78% / calc(var(--ig-bleed) / 100)),
    0 12px 40px rgb(0 0 0 / 0.25);
  color: #f5f7fa;
  animation: ig-in 0.45s ease-out both;
}
/* 虹彩双实例:锐利层做线(::before)、模糊孪生层做光(::after)——§5.3 同源配方 */
.ig-card::before,
.ig-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: conic-gradient(
    from calc(90deg + var(--ig-spin)),
    hsl(var(--ig-hue) 90% 62%),
    hsl(calc(var(--ig-hue) + 90) 85% 62%),
    hsl(calc(var(--ig-hue) + 200) 85% 62%),
    hsl(var(--ig-hue) 90% 62%)
  );
  padding: 1.5px;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: ig-spin var(--ig-period) linear infinite;
}
.ig-card::before { filter: drop-shadow(0 0 6px hsl(var(--ig-hue) 90% 70% / 0.45)); z-index: 1; }
.ig-card::after {
  inset: -3px;
  padding: 3.5px;
  filter: blur(10px);
  opacity: 0.55;
  z-index: -1;
}
/* drift=0:摘除动画,静止在 90deg 相位(与 reduce 同相,避免 0 周期抖动) */
.ig-scene[data-live="off"] .ig-card::before,
.ig-scene[data-live="off"] .ig-card::after { animation: none; --ig-spin: 90deg; }
.ig-card > * { position: relative; }
.ig-card .ig-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; line-height: 1.3; }
.ig-card p.ig-body { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.9; }
.ig-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.ig-btn {
  border: 1px solid rgb(255 255 255 / 0.4);
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
  background: rgb(15 23 42 / 0.35);
}
.ig-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; }
.ig-toolbar {
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
.ig-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.ig-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.ig-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .ig-note { display: none; }
  .ig-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes ig-spin { to { --ig-spin: 360deg; } }
@keyframes ig-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
/* reduce:静止 90deg 保留静态结构色(§5.3 reduce 分支原样沿用) */
@media (prefers-reduced-motion: reduce) {
  .ig-card { animation: none; }
  .ig-card::before, .ig-card::after { animation: none; --ig-spin: 90deg; }
}
`;function v({entryId:o,schema:n}){const a=l(o,n),[r,s]=t.useState("nebula"),[d,g]=t.useState(()=>a.get("drift")>0);return t.useEffect(()=>a.subscribe(()=>{g(a.get("drift")>0)}),[a]),i.jsx(c,{entryId:o,schema:n,children:i.jsxs("div",{className:"ig-scene","data-live":d?"on":"off",children:[i.jsx("div",{className:"ig-bg","aria-hidden":"true",children:r==="gradient"?i.jsx("div",{className:"ig-gradient"}):i.jsx("img",{src:p(`photos/glass-${r}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),i.jsxs("div",{className:"ig-card",children:[i.jsx("p",{className:"ig-title",children:"极光玻璃 Iridescent"}),i.jsx("p",{className:"ig-body",children:"色相沿薄膜环缓慢流转,像油膜上的结构色 / Hue drifts along the film ring — structural color like an oil slick."}),i.jsxs("div",{className:"ig-actions",children:[i.jsx("button",{type:"button",className:"ig-btn ig-btn-primary",children:"主操作 Action"}),i.jsx("button",{type:"button",className:"ig-btn",children:"取消 Cancel"})]})]}),i.jsx("div",{className:"ig-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:b.map(e=>i.jsx("button",{type:"button","aria-pressed":r===e.id,title:e.en,onClick:()=>s(e.id),children:e.zh},e.id))}),i.jsx("p",{className:"ig-note",children:"drift 调到 0 = 停止漂移(静止 90deg);bleed 超过 40% 会洗白面板。配方为工程推演 [R],未见权威综述核验(§12.2)。 / drift = 0 stops the drift (frozen at 90deg); bleed past 40% washes the panel out. The recipe is engineering extrapolation [R] — no authoritative review verified (§12.2)."}),i.jsx("style",{children:x})]})})}export{v as default};
