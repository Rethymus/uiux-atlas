import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as s}from"./color.DuEPkvq5.js";import{w as c}from"./urls.C_nDjrQ8.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const l=[{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"gradient",zh:"渐变",en:"Gradient"},{id:"alps",zh:"雪山",en:"Alps photo"}],p=`
.ce-scene { position: absolute; inset: 0; overflow: hidden; }
.ce-bg, .ce-bg img, .ce-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ce-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.55 0.16 300 / 0.85), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.5 0.14 30 / 0.8), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.45 0.15 165 / 0.85), transparent 72%),
    oklch(0.22 0.05 265);
}
/* 色散边卡(路线 B,全浏览器):本体带饱和底,边缘由两层同底复制错位呈现 RGB 分离 */
.ce-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 18px;
  /* 本体需有色相:白/灰的色相错开不可见,饱和渐变底让色差读得出来 */
  background: linear-gradient(140deg, rgb(56 189 248 / 0.75), rgb(167 139 250 / 0.75));
  -webkit-backdrop-filter: blur(10px) saturate(1.5);
  backdrop-filter: blur(10px) saturate(1.5);
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.3);
  color: #f5f7fa;
  animation: ce-in 0.45s ease-out both;
}
/* 色散孪生层:同底 + 边缘蒙版挖空 + screen 混合(纯装饰,不拦截指针) */
.ce-card::before,
.ce-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;                        /* 与本体同底(调研 17 §6.3 路线 B) */
  mix-blend-mode: screen;
  opacity: calc(var(--ce-op) / 100%);
  padding: 1.5px;
  -webkit-mask: linear-gradient(#000, #000) padding-box, linear-gradient(#000, #000);
  -webkit-mask-composite: xor;
  mask-composite: exclude;                    /* 只留边缘 */
  pointer-events: none;
}
.ce-card::before {
  transform: translateX(var(--ce-shift));
  filter: hue-rotate(calc(var(--ce-hue) * -1)) saturate(3);
}
.ce-card::after {
  transform: translateX(calc(var(--ce-shift) * -1));
  filter: hue-rotate(var(--ce-hue)) saturate(3);
}
.ce-card > * { position: relative; }
.ce-card .ce-title { margin: 0 0 8px; font-size: 17px; font-weight: 650; line-height: 1.3; }
.ce-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.9; }
.ce-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.ce-btn {
  border: 1px solid rgb(255 255 255 / 0.4);
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
  background: rgb(15 23 42 / 0.35);
}
/* SJ-05(视觉评审·V7):主按钮统一站内演示亮蓝主色(与 halo .hg-btn-primary /
   soft-glow-glass .sgg-btn-primary 同值 rgba(30,90,220,.85))——原深藏青与
   幽灵钮在色散卡中调渐变底上读不出主次,同站演示组件语言也分裂 */
.ce-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; }
.ce-toolbar {
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
.ce-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.ce-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.ce-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .ce-note { display: none; }
  .ce-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes ce-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .ce-card { animation: none; }
}
`;function m({entryId:t,schema:i}){s(t,i);const[r,o]=n.useState("nebula");return e.jsx(d,{entryId:t,schema:i,children:e.jsxs("div",{className:"ce-scene",children:[e.jsx("div",{className:"ce-bg","aria-hidden":"true",children:r==="gradient"?e.jsx("div",{className:"ce-gradient"}):e.jsx("img",{src:c(`photos/glass-${r}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),e.jsxs("div",{className:"ce-card",children:[e.jsx("p",{className:"ce-title",children:"玻璃色散边 Chromatic Edge"}),e.jsx("p",{children:"边缘红蓝错位,像真实镜头 / Red and blue misalign at the rim, like a real lens."}),e.jsxs("div",{className:"ce-actions",children:[e.jsx("button",{type:"button",className:"ce-btn ce-btn-primary",children:"主操作 Action"}),e.jsx("button",{type:"button",className:"ce-btn",children:"取消 Cancel"})]})]}),e.jsx("div",{className:"ce-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:l.map(a=>e.jsx("button",{type:"button","aria-pressed":r===a.id,title:a.en,onClick:()=>o(a.id),children:a.zh},a.id))}),e.jsx("p",{className:"ce-note",children:"dispersion 拉到 0 即单关色散省一次渲染(hyalite 官方建议);本体必须带色相。/ Set dispersion to 0 to switch dispersion off alone (hyalite's advice); the base must carry hue."}),e.jsx("style",{children:p})]})})}export{m as default};
