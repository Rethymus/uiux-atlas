import{j as i}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as c}from"./color.DuEPkvq5.js";import{w as p}from"./urls.C_nDjrQ8.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const g=[{id:"alps",zh:"亮图",en:"Bright photo"},{id:"nebula",zh:"暗图",en:"Dark photo"}],x=`
.demo-stage {
  --dim-alpha: 0.35;
  --dim-color: #000000;
}
.dim-scene { position: absolute; inset: 0; overflow: hidden; }
.dim-bg, .dim-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* 压暗层两式:纯色(solid)与梯度(gradient),opacity 交叉过渡 */
.dim-scrim-solid,
.dim-scrim-grad {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.dim-scrim-solid {
  background: color-mix(in srgb, var(--dim-color) calc(var(--dim-alpha) * 100%), transparent);
}
.dim-scrim-grad {
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--dim-color) calc(var(--dim-alpha) * 100%), transparent),
    transparent 60%
  );
}
.dim-scene[data-mode="solid"] .dim-scrim-grad { opacity: 0; }
.dim-scene[data-mode="gradient"] .dim-scrim-solid { opacity: 0; }

/* solid 形态:弹窗(dialog::backdrop 的 mock,真身应为伪元素) */
.dim-dialog {
  position: absolute;
  left: 50%;
  top: 44%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 56px));
  padding: 20px 22px;
  border-radius: 14px;
  background: #ffffff;
  color: #22304a;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}
.dim-dialog h3 { margin: 0 0 6px; font-size: 16px; font-weight: 650; }
.dim-dialog p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.8; }
.dim-dialog-actions { display: flex; gap: 8px; justify-content: flex-end; }
.dim-btn {
  border: 0;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  background: #1e5adc;
  color: #fff;
}
.dim-btn-ghost { background: rgba(30, 90, 220, 0.12); color: #1e5adc; }
.dim-scene[data-mode="gradient"] .dim-dialog { opacity: 0; pointer-events: none; }
.dim-dialog { transition: opacity 0.25s ease; }

/* gradient 形态:图注文字压图(落点即梯度峰值处) */
.dim-caption {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 40px;
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.dim-caption small { display: block; margin-top: 4px; font-size: 11px; opacity: 0.85; }
.dim-scene[data-mode="solid"] .dim-caption { opacity: 0; }
.dim-caption { transition: opacity 0.25s ease; }

.dim-toolbar {
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
.dim-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.dim-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.dim-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 58%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
}
.dim-scene[data-mode="solid"] .dim-note { color: rgba(255, 255, 255, 0.75); }
@media (max-width: 480px) {
  .dim-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .dim-scrim-solid, .dim-scrim-grad, .dim-dialog, .dim-caption { transition: none; }
}
`;function y({entryId:d,schema:e}){const a=c(d,e),[s,n]=t.useState(()=>a.get("mode")),[r,l]=t.useState("alps");return t.useEffect(()=>a.subscribe(()=>{n(a.get("mode"))}),[a]),i.jsx(m,{entryId:d,schema:e,children:i.jsxs("div",{className:"dim-scene","data-mode":s,children:[i.jsx("div",{className:"dim-bg","aria-hidden":"true",children:i.jsx("img",{src:p(`photos/glass-${r}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async"})}),i.jsx("div",{className:"dim-scrim-solid","aria-hidden":"true"}),i.jsx("div",{className:"dim-scrim-grad","aria-hidden":"true"}),i.jsxs("div",{className:"dim-dialog",role:"dialog","aria-label":"压暗层演示弹窗 Dimming demo dialog",children:[i.jsx("h3",{children:"模态弹窗 Modal dialog"}),i.jsx("p",{children:"真身应为 dialog::backdrop——不继承任何属性,颜色须完整声明。 Natively this lives on dialog::backdrop, which inherits nothing."}),i.jsxs("div",{className:"dim-dialog-actions",children:[i.jsx("button",{type:"button",className:"dim-btn dim-btn-ghost",children:"取消 Cancel"}),i.jsx("button",{type:"button",className:"dim-btn",children:"确定 OK"})]})]}),i.jsxs("p",{className:"dim-caption",children:["文字压图 Caption over photo",i.jsx("small",{children:"梯度式只在底部峰值处达到 α 档位——图心保留 / The gradient peaks at the caption; the subject stays clear."})]}),i.jsx("div",{className:"dim-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:g.map(o=>i.jsx("button",{type:"button","aria-pressed":r===o.id,title:o.en,onClick:()=>l(o.id),children:o.zh},o.id))}),i.jsx("p",{className:"dim-note",children:"α 默认 35%(HIG 官方建议);下层偏亮时压暗、偏暗时减档——切「暗图」对照。"}),i.jsx("style",{children:x})]})})}export{y as default};
