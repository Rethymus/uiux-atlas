import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";function g(n){const o=[];for(let t=0;t<=7;t++){const l=Math.round(t/7*n),a=.72+.1*Math.sin(t/7*Math.PI);o.push(`oklch(${a.toFixed(2)} 0.16 ${l})`)}return`conic-gradient(from 210deg at 50% 40%, ${o.join(", ")})`}const v="linear-gradient(180deg, #fafbfd 0%, #cfd6e0 42%, #8a93a3 49%, #454b57 50%, #98a1b0 55%, #e8ecf2 78%, #f6f8fb 100%)",w=`
.demo-stage {
  --hc-sheen: 1;
}
.hc-scene {
  --mx: 50%;
  --my: 35%;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(80% 60% at 70% 20%, oklch(0.3 0.08 290 / 0.7), transparent 60%),
    oklch(0.13 0.02 280);
  color: oklch(0.95 0.01 270);
}
.hc-card {
  position: relative;
  width: min(360px, calc(100% - 32px));
  padding: 30px 28px 26px;
  border-radius: 20px;
  border: 1px solid oklch(1 0 0 / 0.14);
  background: oklch(0.2 0.03 280 / 0.72);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  overflow: hidden;
  animation: hc-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* 指针驱动的镜面高光(装饰) */
.hc-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    46% 60% at var(--mx) var(--my),
    oklch(1 0 0 / calc(0.28 * var(--hc-sheen))),
    oklch(1 0 0 / 0) 70%
  );
}
/* 衍射微条纹(装饰,aria-hidden 层) */
.hc-diffraction {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: none;
  opacity: 0.16;
  mix-blend-mode: screen;
  background: repeating-linear-gradient(
    115deg,
    oklch(0.8 0.18 30) 0 1px,
    oklch(0.8 0.18 90) 1px 2px,
    oklch(0.8 0.18 200) 2px 3px,
    oklch(0.8 0.18 320) 3px 4px,
    transparent 4px 7px
  );
  -webkit-mask-image: linear-gradient(to bottom, oklch(0 0 / 1), oklch(0 0 / 0.2) 70%, transparent);
  mask-image: linear-gradient(to bottom, oklch(0 0 / 1), oklch(0 0 / 0.2) 70%, transparent);
}
.hc-scene[data-diffraction="on"] .hc-diffraction { display: block; }
.hc-kicker {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: oklch(0.75 0.05 280);
}
.hc-title {
  margin: 0 0 6px;
  font-size: clamp(40px, 10vw, 56px);
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1;
  background: conic-gradient(from 210deg at 50% 40%, oklch(0.78 0.16 30), oklch(0.82 0.16 90), oklch(0.8 0.16 160), oklch(0.78 0.16 240), oklch(0.78 0.16 300), oklch(0.78 0.16 30));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 calc(16px * var(--hc-sheen)) oklch(0.8 0.16 300 / calc(0.45 * var(--hc-sheen))));
}
/* 光谱游彩:background-position 对不可重复的 conic 无效,holo 模式用 hue-rotate 让色相漂移 */
.hc-scene[data-mode="holo"] .hc-title { animation: hc-hue 9s ease-in-out infinite alternate; }
@keyframes hc-hue {
  from { filter: hue-rotate(0deg) drop-shadow(0 0 calc(16px * var(--hc-sheen)) oklch(0.8 0.16 300 / calc(0.45 * var(--hc-sheen)))); }
  to { filter: hue-rotate(40deg) drop-shadow(0 0 calc(16px * var(--hc-sheen)) oklch(0.8 0.16 300 / calc(0.45 * var(--hc-sheen)))); }
}
.hc-scene[data-mode="chrome"] .hc-title {
  background: linear-gradient(180deg, #fafbfd 0%, #cfd6e0 42%, #8a93a3 49%, #454b57 50%, #98a1b0 55%, #e8ecf2 78%, #f6f8fb 100%);
  background-clip: text;
  -webkit-background-clip: text;
  animation: none;
  filter: drop-shadow(0 0 calc(10px * var(--hc-sheen)) oklch(0.9 0.01 260 / calc(0.4 * var(--hc-sheen))));
}
@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .hc-title { color: oklch(0.85 0.02 280); background: none; }
}
.hc-sub {
  margin: 0 0 18px;
  font-size: 12.5px;
  line-height: 1.55;
  color: oklch(0.8 0.03 270 / 0.85);
}
.hc-row { display: flex; gap: 10px; }
.hc-btn {
  flex: 1;
  padding: 11px 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: oklch(0.2 0.03 280);
  background: linear-gradient(180deg, #f4f6fa, #c9d1dc 52%, #eef1f6);
  border: 1px solid oklch(1 0 0 / 0.7);
  box-shadow: 0 6px 16px oklch(0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.9);
  cursor: pointer;
  transition: transform 0.15s ease;
}
.hc-btn:hover { transform: translateY(-1px); }
.hc-btn:active { transform: translateY(1px); }
.hc-btn-ghost {
  color: oklch(0.9 0.03 280);
  background: oklch(1 0 0 / 0.08);
  border-color: oklch(1 0 0 / 0.25);
  box-shadow: none;
}
.hc-btn:focus-visible { outline: 2px solid oklch(0.85 0.16 320); outline-offset: 3px; }
.hc-orb {
  position: absolute;
  right: -34px;
  top: -34px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  pointer-events: none;
  background: conic-gradient(from 130deg, oklch(0.85 0.16 30), oklch(0.88 0.14 90), oklch(0.85 0.15 170), oklch(0.82 0.16 260), oklch(0.85 0.16 330), oklch(0.85 0.16 30));
  -webkit-mask-image: radial-gradient(circle, transparent 52%, oklch(0 0 / 1) 56%);
  mask-image: radial-gradient(circle, transparent 52%, oklch(0 0 / 1) 56%);
  animation: hc-spin 14s linear infinite;
}
.hc-mode {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: oklch(0 0 / 0.45);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
@media (max-width: 480px) {
  .hc-mode { top: auto; bottom: 12px; left: 12px; right: auto; }
  .hc-orb { right: auto; left: -40px; }
}
.hc-mode button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: oklch(0.95 0.01 270 / 0.75);
  background: transparent;
}
.hc-mode button[aria-pressed="true"] { background: oklch(0.85 0.16 320 / 0.45); color: oklch(0.99 0 0); }
.hc-mode button:focus-visible { outline: 2px solid oklch(0.85 0.16 320); outline-offset: 2px; }
@keyframes hc-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hc-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hc-card { animation: none; }
  .hc-title { animation: none; }
  .hc-orb { animation: none; }
  .hc-btn { transition: none; }
}
`;function S({entryId:n,schema:s}){const o=m(n,s),[t,l]=r.useState(()=>o.get("mode")),[a,p]=r.useState(()=>o.get("hueSpan")),[f,x]=r.useState(()=>o.get("diffraction")),h=r.useRef(null);r.useEffect(()=>o.subscribe(()=>{l(o.get("mode")),p(o.get("hueSpan")),x(o.get("diffraction"))}),[o]);const u=r.useMemo(()=>t==="holo"?g(a):v,[t,a]),b=d=>{const c=h.current;if(!c)return;const i=c.getBoundingClientRect();c.style.setProperty("--mx",`${((d.clientX-i.left)/i.width*100).toFixed(1)}%`),c.style.setProperty("--my",`${((d.clientY-i.top)/i.height*100).toFixed(1)}%`)};return e.jsxs(k,{entryId:n,schema:s,children:[e.jsxs("div",{className:"hc-scene","data-mode":t,"data-diffraction":f,onPointerMove:b,children:[e.jsxs("div",{className:"hc-card",ref:h,children:[e.jsx("div",{className:"hc-orb","aria-hidden":"true"}),e.jsx("p",{className:"hc-kicker",children:"Refraction Series · 014/015"}),e.jsx("h1",{className:"hc-title",style:t==="holo"?{backgroundImage:u}:void 0,children:"HOLO"}),e.jsx("p",{className:"hc-sub",children:t==="holo"?`全息虹彩:跨 ${Math.round(a)}° 光谱带 / spectral band across ${Math.round(a)}° of hue.`:"液态铬:银白硬反射线 / liquid metal with a hard horizon reflection."}),e.jsxs("div",{className:"hc-row",children:[e.jsx("button",{type:"button",className:"hc-btn",children:"Collect"}),e.jsx("button",{type:"button",className:"hc-btn hc-btn-ghost",children:"Details"})]}),e.jsx("div",{className:"hc-sheen","aria-hidden":"true"}),e.jsx("div",{className:"hc-diffraction","aria-hidden":"true"})]}),e.jsxs("div",{className:"hc-mode",role:"group","aria-label":"材质模式 Material mode switcher",children:[e.jsx("button",{type:"button","aria-pressed":t==="holo",onClick:()=>o.set("mode","holo"),children:"虹彩 Holo"}),e.jsx("button",{type:"button","aria-pressed":t==="chrome",onClick:()=>o.set("mode","chrome"),children:"铬 Chrome"})]})]}),e.jsx("style",{children:w})]})}export{S as default};
