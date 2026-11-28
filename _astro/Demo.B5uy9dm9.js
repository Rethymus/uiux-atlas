import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as d}from"./color.DuEPkvq5.js";import{D as x}from"./DemoStage.vW1CgYCd.js";const m=`
.ig-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 深色仪表盘底:内发光的主场(调研 17 §7.1) */
  background:
    radial-gradient(80% 70% at 70% 10%, oklch(0.28 0.05 250 / 0.9), transparent 70%),
    oklch(0.16 0.03 255);
}
/* 内发光面板:光被「关在」面板内部(调研 17 §7.3 配方) */
.ig-panel {
  position: relative;
  width: min(330px, calc(100% - 48px));
  padding: 20px 24px;
  border-radius: 16px;
  background: rgb(255 255 255 / 0.04);
  box-shadow:
    inset 0 0 var(--ig-size) 2px color-mix(in srgb, var(--ig-color) var(--ig-a), transparent), /* 泛内光(主光) */
    inset 0 1px 0 rgb(255 255 255 / 0.35),                      /* 上沿受光 */
    inset 0 -1px 0 rgb(0 0 0 / 0.30),                           /* 下沿环境暗(厚度) */
    0 0 0 1px rgb(255 255 255 / 0.08);                          /* 可选外描边 */
  color: #e8eef7;
  animation: ig-in 0.4s ease-out both;
}
/* 单侧顶光:改主光层的 y 偏移定向,负 spread 收紧(配方 inset 0 18px 24px -12px) */
.ig-scene[data-direction="top"] .ig-panel {
  box-shadow:
    inset 0 18px calc(var(--ig-size) - 6px) -12px color-mix(in srgb, var(--ig-color) calc(var(--ig-a) + 12%), transparent),
    inset 0 1px 0 rgb(255 255 255 / 0.35),
    inset 0 -1px 0 rgb(0 0 0 / 0.30),
    0 0 0 1px rgb(255 255 255 / 0.08);
}
.ig-panel .ig-title { margin: 0 0 10px; font-size: 15px; font-weight: 650; }
.ig-rows { display: grid; gap: 8px; margin: 0 0 4px; }
.ig-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  /* 选中态:内光 + 图形冗余(圆点),不只靠光(WCAG 1.4.1) */
  background: rgb(255 255 255 / 0.03);
  box-shadow: inset 0 0 10px 0 color-mix(in srgb, var(--ig-color) calc(var(--ig-a) * 0.5), transparent);
}
.ig-row[aria-selected="true"] {
  background: color-mix(in srgb, var(--ig-color) 12%, rgb(255 255 255 / 0.03));
  box-shadow:
    inset 0 0 14px 1px color-mix(in srgb, var(--ig-color) calc(var(--ig-a) + 10%), transparent),
    0 0 0 1px color-mix(in srgb, var(--ig-color) 45%, transparent);
  font-weight: 600;
}
.ig-row .ig-dot { width: 8px; height: 8px; border-radius: 999px; background: rgb(255 255 255 / 0.25); }
.ig-row[aria-selected="true"] .ig-dot { background: color-mix(in srgb, var(--ig-color) 80%, white); }
.ig-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgb(232 238 247 / 0.55);
}
@media (max-width: 480px) {
  .ig-note { display: none; }
}
@keyframes ig-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ig-panel { animation: none; }
}
`;function f({entryId:o,schema:n}){const i=d(o,n),[p,g]=a.useState(()=>i.get("direction")),[l,s]=a.useState(1);return a.useEffect(()=>i.subscribe(()=>{g(i.get("direction"))}),[i]),e.jsx(x,{entryId:o,schema:n,children:e.jsxs("div",{className:"ig-scene","data-direction":p,children:[e.jsxs("div",{className:"ig-panel",children:[e.jsx("p",{className:"ig-title",children:"内发光面板 Inner-Glow Panel"}),e.jsx("div",{className:"ig-rows",role:"listbox","aria-label":"分区选择 Sections",children:["概览 Overview","指标 Metrics","日志 Logs"].map((c,t)=>e.jsxs("div",{role:"option",tabIndex:0,"aria-selected":l===t,className:"ig-row",onClick:()=>s(t),onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),s(t))},children:[e.jsx("span",{children:c}),e.jsx("span",{className:"ig-dot","aria-hidden":"true"})]},c))})]}),e.jsx("p",{className:"ig-note",children:"direction 切整体泛光/单侧顶光;intensity 拉过 25% 看内光开始糊住内容。/ Switch direction between the omni wash and top light; push intensity past 25% to watch the wash smear the content."}),e.jsx("style",{children:m})]})})}export{f as default};
