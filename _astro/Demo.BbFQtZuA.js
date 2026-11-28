import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as n}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const l=`
.demo-stage {
  --aurora-blur: 42px;
  --aurora-saturate: 115%;
  --aurora-drift: 18s;
  --aurora-spot-a: 20%;
  --aurora-spot-b: 70%;
}
.aur-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: oklch(0.25 0.04 265);
}
/* 光斑层:CodeFronts 配方结构(4 光斑 + conic 底,inset:-25%,整层 filter) */
.aur-layer {
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(38% 42% at var(--aurora-spot-a) 25%, oklch(0.6 0.24 300 / .85), transparent 68%),
    radial-gradient(42% 46% at var(--aurora-spot-b) 30%, oklch(0.72 0.17 195 / .8), transparent 68%),
    radial-gradient(50% 55% at 78% 72%, oklch(0.68 0.18 340 / .8), transparent 68%),
    conic-gradient(from 220deg at 60% 45%, oklch(0.35 0.06 265), oklch(0.3 0.05 210), oklch(0.35 0.06 265));
  filter: blur(var(--aurora-blur)) saturate(calc(var(--aurora-saturate) / 100));
  animation: aur-drift var(--aurora-drift) ease-in-out alternate infinite;
}
/* 第 4 光斑为独立子层:3 光斑档时整体隐藏(仍在整层滤镜内) */
.aur-blob-d {
  position: absolute;
  inset: 0;
  background: radial-gradient(45% 50% at 32% 88%, oklch(0.75 0.15 85 / .75), transparent 68%);
}
.aur-stage[data-spots="3"] .aur-blob-d { display: none; }
@keyframes aur-drift {
  from { transform: translate(-2%, -1%) rotate(0.001deg) scale(1); }
  to   { transform: translate(2%, 1%) rotate(2deg) scale(1.06); }
}
.aur-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 36px));
  padding: 18px 22px;
  border-radius: 14px;
  background: oklch(0.22 0.03 265 / 0.55);
  border: 1px solid oklch(1 0 0 / 0.18);
  color: oklch(0.97 0.01 265);
}
.aur-card h3 { margin: 0 0 6px; font-size: 16px; font-weight: 620; }
.aur-card p { margin: 0; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.aur-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}
.aur-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.aur-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.aur-note {
  position: absolute;
  left: 12px;
  bottom: 10px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.66);
  max-width: 62%;
}
@media (prefers-reduced-motion: reduce) {
  /* reduced-motion 降级:整层静止,直出终态 */
  .aur-layer { animation: none; }
}
`;function x({entryId:o,schema:e}){const a=n(o,e),[t,i]=s.useState(()=>a.get("spots"));return s.useEffect(()=>a.subscribe(()=>{i(a.get("spots"))}),[a]),r.jsx(d,{entryId:o,schema:e,children:r.jsxs("div",{className:"aur-stage","data-spots":t,children:[r.jsx("div",{className:"aur-layer","aria-hidden":"true",children:r.jsx("div",{className:"aur-blob-d"})}),r.jsxs("div",{className:"aur-card",children:[r.jsx("h3",{children:"极光之上 Aurora Above"}),r.jsx("p",{children:"文字卡独立于滤镜层:光斑 L 钉在 0.6–0.75,4.5:1 仍守得住 / The card sits outside the filter layer; blob L stays 0.6–0.75 so 4.5:1 holds."})]}),r.jsxs("div",{className:"aur-toolbar",role:"group","aria-label":"光斑数量 Blob count",children:[r.jsx("button",{type:"button","aria-pressed":t==="3",onClick:()=>a.set("spots","3"),children:"3 光斑"}),r.jsx("button",{type:"button","aria-pressed":t==="4",onClick:()=>a.set("spots","4"),children:"4 光斑"})]}),r.jsxs("p",{className:"aur-note",children:["CodeFronts 配方:blur(42px) saturate(1.15)、inset:-25%、只动 transform;漂移 60s 级更接近氛围光,18s 为演示档。",t==="3"?" 第 4 光斑已隐藏 / Blob D hidden.":""]}),r.jsx("style",{children:l})]})})}export{x as default};
