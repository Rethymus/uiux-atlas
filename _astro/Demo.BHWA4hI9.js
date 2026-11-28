import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as n}from"./color.DuEPkvq5.js";import{D as p}from"./DemoStage.vW1CgYCd.js";const l=`
.demo-stage {
  --sp-blur: 20px;
  --sp-sat: 1.4;
  --sp-fill: oklch(1 0 0 / 0.55);
  --sp-radius: 24px;
  --sp-shadow: 0px 12px 40px 0px rgba(0, 0, 0, 0.18);
}
.sp-scene { position: absolute; inset: 0; overflow: hidden; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
/* 环境层:抽象室内光斑(深度由模糊光斑营造,暗色端承载玻璃) */
.sp-env { position: absolute; inset: 0; }
.sp-env::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(55% 75% at 20% 20%, oklch(0.78 0.12 250 / 0.9), transparent 70%),
    radial-gradient(45% 60% at 84% 14%, oklch(0.72 0.14 320 / 0.85), transparent 68%),
    radial-gradient(60% 80% at 75% 90%, oklch(0.55 0.12 200 / 0.9), transparent 72%),
    radial-gradient(50% 65% at 12% 85%, oklch(0.68 0.1 60 / 0.8), transparent 70%),
    oklch(0.34 0.06 260);
}
/* Full Space:环境压暗(沉浸垫层),0.4s 渐变 */
.sp-scrim {
  position: absolute;
  inset: 0;
  background: oklch(0.18 0.03 260 / 0.62);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.sp-scene[data-immersion="full"] .sp-scrim { opacity: 1; }
/* 玻璃窗口:补研 11§5 可复用片段的参数化实现 */
.sp-win {
  position: absolute;
  background-color: var(--sp-fill);
  -webkit-backdrop-filter: blur(var(--sp-blur)) saturate(var(--sp-sat));
  backdrop-filter: blur(var(--sp-blur)) saturate(var(--sp-sat));
  border-radius: var(--sp-radius);
  box-shadow: var(--sp-shadow);
  outline: 1px solid rgb(255 255 255 / 0.25);
  outline-offset: -1px;
  color: #141a26;
  transition: translate 0.4s ease, scale 0.4s ease;
}
.sp-main {
  left: 50%;
  top: 50%;
  translate: -72% -50%;
  width: min(360px, calc(100% - 48px));
  padding: 22px 24px;
  animation: sp-in 0.5s ease-out both;
}
.sp-side {
  left: 50%;
  top: 50%;
  translate: 24% -58%;
  width: min(250px, calc(100% - 64px));
  padding: 16px 18px;
  animation: sp-in 0.5s ease-out 0.08s both;
}
/* Full Space:主窗居中放大,侧窗淡出空间 */
.sp-scene[data-immersion="full"] .sp-main { translate: -50% -50%; scale: 1.08; }
.sp-scene[data-immersion="full"] .sp-side { translate: 40% -62%; opacity: 0.35; }
.sp-win h3 { margin: 0 0 8px; font-size: 17px; font-weight: 650; }
.sp-win p { margin: 0 0 14px; font-size: 13px; line-height: 1.6; opacity: 0.85; }
.sp-actions { display: flex; gap: 10px; flex-wrap: wrap; }
/* 注视即悬停:大热区按钮 + hover 光圈 + 明确焦点环 */
.sp-btn {
  position: relative;
  border: 0;
  border-radius: 999px;
  padding: 9px 18px;
  font-size: 13px;
  cursor: pointer;
  color: #141a26;
  background: rgb(255 255 255 / 0.42);
}
.sp-btn-primary { background: rgb(30 90 220 / 0.85); color: #fff; }
.sp-btn:hover::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  background: rgb(255 255 255 / 0.28);
}
.sp-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.sp-plate { font-size: 11px; letter-spacing: 0.06em; opacity: 0.72; margin: 0 0 10px; }
/* 沉浸切换手柄(数字表冠隐喻,风格内自洽玻璃条) */
.sp-crown {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 4px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.18);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.sp-crown button {
  border: 0;
  border-radius: 999px;
  padding: 5px 13px;
  font-size: 12px;
  cursor: pointer;
  color: rgb(255 255 255 / 0.78);
  background: transparent;
}
.sp-crown button[aria-pressed="true"] { background: rgb(255 255 255 / 0.28); color: #fff; }
/* 窄屏(≤480px):双窗改上下堆叠,手柄钉左下 */
@media (max-width: 480px) {
  .sp-main { left: 12px; right: 12px; top: 12px; translate: none; width: auto; }
  .sp-side { left: 12px; right: 12px; top: auto; bottom: 56px; translate: none; width: auto; }
  .sp-scene[data-immersion="full"] .sp-main { translate: none; }
  .sp-scene[data-immersion="full"] .sp-side { translate: none; }
  .sp-crown { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .sp-win { background-color: color-mix(in srgb, var(--sp-fill) 100%, #dfe6f2 78%); }
}
@keyframes sp-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .sp-scrim, .sp-win { transition: none; }
  .sp-main, .sp-side { animation: none; }
}
`;function b({entryId:a,schema:i}){const e=n(a,i),[t,o]=r.useState(()=>e.get("immersion"));return r.useEffect(()=>e.subscribe(()=>{o(e.get("immersion"))}),[e]),s.jsxs(p,{entryId:a,schema:i,children:[s.jsxs("div",{className:"sp-scene","data-immersion":t,children:[s.jsx("div",{className:"sp-env","aria-hidden":"true"}),s.jsx("div",{className:"sp-scrim","aria-hidden":"true"}),s.jsxs("section",{className:"sp-win sp-main","aria-label":"主窗口 Main window",children:[s.jsx("p",{className:"sp-plate",children:"SHARED SPACE · WINDOW"}),s.jsx("h3",{children:"空间窗口 Spatial Window"}),s.jsx("p",{children:"深度即层级:少量大阴影表达 z 轴;玻璃之下环境透出——找到每个时刻的最小沉浸级别。"}),s.jsxs("div",{className:"sp-actions",children:[s.jsx("button",{type:"button",className:"sp-btn sp-btn-primary",children:"主操作 Action"}),s.jsx("button",{type:"button",className:"sp-btn",children:"取消 Cancel"})]})]}),s.jsxs("aside",{className:"sp-win sp-side","aria-label":"侧窗口 Side window",children:[s.jsx("p",{className:"sp-plate",children:"PASSTHROUGH"}),s.jsx("h3",{children:"透视 Passthrough"}),s.jsx("p",{children:"环境实时可见;数字表冠在系统中连续调节沉浸多寡。"})]}),s.jsxs("div",{className:"sp-crown",role:"group","aria-label":"沉浸切换 Immersion switch",children:[s.jsx("button",{type:"button","aria-pressed":t==="shared",onClick:()=>e.set("immersion","shared"),title:"Shared Space",children:"并排"}),s.jsx("button",{type:"button","aria-pressed":t==="full",onClick:()=>e.set("immersion","full"),title:"Full Space",children:"独占"})]})]}),s.jsx("style",{children:l})]})}export{b as default};
