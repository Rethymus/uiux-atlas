import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as c}from"./color.DuEPkvq5.js";import{w as p}from"./urls.C_nDjrQ8.js";import{D as l}from"./DemoStage.vW1CgYCd.js";const u=[{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"alps",zh:"雪山",en:"Alps photo"},{id:"gradient",zh:"渐变",en:"Gradient"}],b=`
.demo-stage {
  --dof-blur: 8px;
  --dof-sat: 0.9;
}
.dof-scene { position: absolute; inset: 0; overflow: hidden; }

/* 远景:全幅场景 */
.dof-far, .dof-far img, .dof-far-gradient { position: absolute; inset: 0; width: 100%; height: 100%; }
.dof-far { overflow: hidden; }
.dof-far img, .dof-far-gradient { object-fit: cover; }
.dof-far-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}

/* 失焦处理:blur + saturate + scale(1.02) 补边(调研配方);焦点切换不做 filter 过渡(性能告诫) */
.dof-scene[data-focus="near"] .dof-far,
.dof-scene[data-focus="mid"] .dof-far,
.dof-scene[data-focus="mid"] .dof-near,
.dof-scene[data-focus="far"] .dof-near {
  filter: blur(var(--dof-blur)) saturate(var(--dof-sat));
  transform: scale(1.02);
}

/* 失焦薄纱:25% 黑压暗(blur → dim → sharp 的 dim 段;25% 借 MDN ::backdrop 典型值,演示近似) */
.dof-far::after, .dof-near::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 25%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.dof-scene[data-focus="near"] .dof-far::after,
.dof-scene[data-focus="mid"] .dof-far::after,
.dof-scene[data-focus="mid"] .dof-near::after,
.dof-scene[data-focus="far"] .dof-near::after { opacity: 1; }

/* 中景:玻璃层(配方固定 backdrop-filter blur(6px) + scrim 底,不随 blur 参数联动) */
.dof-mid {
  position: absolute;
  left: 50%;
  top: 20%;
  translate: -50%;
  width: min(420px, calc(100% - 56px));
  padding: 12px 18px;
  border-radius: 12px;
  background: color-mix(in oklab, black 55%, transparent);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  text-align: center;
}
.dof-mid::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgb(0 0 0 / 25%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.dof-scene[data-focus="near"] .dof-mid::after,
.dof-scene[data-focus="far"] .dof-mid::after { opacity: 1; }

/* 前景:信息卡(默认对焦主体) */
.dof-near {
  position: absolute;
  left: 50%;
  top: 52%;
  translate: -50%;
  width: min(300px, calc(100% - 48px));
  padding: 18px 20px;
  border-radius: 14px;
  background: rgba(17, 25, 40, 0.82);
  color: #f5f7fa;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.dof-near h3 { margin: 0 0 6px; font-size: 15px; font-weight: 650; }
.dof-near p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.82; }
.dof-near::after { border-radius: 14px; }

.dof-toolbar {
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
.dof-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.dof-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }

.dof-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .dof-note { display: none; }
}
@keyframes dof-in {
  from { opacity: 0; translate: -50% 8px; }
  to { opacity: 1; translate: -50% 0; }
}
.dof-near { animation: dof-in 0.4s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .dof-far::after, .dof-mid::after, .dof-near::after { transition: none; }
  .dof-near { animation: none; }
}
`;function j({entryId:d,schema:i}){const e=c(d,i),[s,n]=t.useState(()=>e.get("focus")),[r,f]=t.useState("nebula");return t.useEffect(()=>e.subscribe(()=>{n(e.get("focus"))}),[e]),a.jsx(l,{entryId:d,schema:i,children:a.jsxs("div",{className:"dof-scene","data-focus":s,children:[a.jsx("div",{className:"dof-far","aria-hidden":"true",children:r==="gradient"?a.jsx("div",{className:"dof-far-gradient"}):a.jsx("img",{src:p(`photos/glass-${r}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async"})}),a.jsx("div",{className:"dof-mid",children:"玻璃中景 Glass mid · backdrop-filter blur(6px) + scrim(配方固定值)"}),a.jsxs("div",{className:"dof-near",children:[a.jsxs("h3",{children:["对焦平面 Focus plane: ",s]}),a.jsx("p",{children:"失焦平面 = blur + saturate(0.9) + scale(1.02) + 25% 薄纱——blur → dim → sharp 三段深度。 Defocused planes blur, desaturate and dim behind the sharp one."})]}),a.jsx("div",{className:"dof-toolbar",role:"group","aria-label":"远景切换 Far-plane switcher",children:u.map(o=>a.jsx("button",{type:"button","aria-pressed":r===o.id,title:o.en,onClick:()=>f(o.id),children:o.zh},o.id))}),a.jsx("p",{className:"dof-note",children:"对焦切换直接置换(不做 filter 动画);切「远景 far」看反转对照——前景全部失焦。"}),a.jsx("style",{children:b})]})})}export{j as default};
