import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{w as p}from"./urls.C_nDjrQ8.js";import{D as b}from"./DemoStage.vW1CgYCd.js";const u=`
.demo-stage {
  --liquid-tint: 0%;
  --liquid-spacing: 8;
}
.lg-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.lg-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.lg-container {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  display: flex;
  align-items: center;
  /* 两块胶囊固定间距 24px;spacing 参数逼近 24 时融合桥渐显 */
}
.lg-glass {
  position: relative;
  border: 1px solid oklch(1 0 0 / 0.45);
  border-radius: 999px; /* 官方默认形状 Capsule */
  padding: 12px 26px;
  font-size: 14px;
  font-weight: 600;
  color: #17202e;
  cursor: pointer;
  background: oklch(1 0 0 / 0.22);
  -webkit-backdrop-filter: blur(14px) saturate(1.6);
  backdrop-filter: blur(14px) saturate(1.6);
  transition: filter 0.15s ease, transform 0.15s ease, background-color 0.2s ease;
  overflow: hidden;
}
.lg-glass:focus-visible { outline: 3px solid #0a84ff; outline-offset: 2px; }
/* tint(_:):固定强调色 × 强度(Web 强度映射,官方接受任意 Color) */
.lg-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: oklch(0.62 0.17 250);
  opacity: var(--liquid-tint);
}
.lg-glass > span { position: relative; }
/* clear 变体:高透;亮背景(雪山)按 HIG 叠 35% 暗层 */
.lg-scene[data-variant="clear"] .lg-glass {
  background: oklch(1 0 0 / 0.06);
  -webkit-backdrop-filter: blur(3px) saturate(1.2);
  backdrop-filter: blur(3px) saturate(1.2);
  color: #f5f7fa;
}
.lg-scene[data-variant="clear"] .lg-glass::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgb(0 0 0 / 0.35);
}
/* interactive(_:):hover 提亮 + 按压缩放 */
.lg-scene[data-interactive="on"] .lg-glass:hover { filter: brightness(1.12); }
.lg-scene[data-interactive="on"] .lg-glass:active { transform: scale(0.96); }
.lg-bridge {
  width: 24px;
  height: 46px;
  border-radius: 4px;
  background: oklch(1 0 0 / 0.18);
  -webkit-backdrop-filter: blur(14px) saturate(1.6);
  backdrop-filter: blur(14px) saturate(1.6);
  border-inline: 1px solid oklch(1 0 0 / 0.35);
  opacity: clamp(0, calc((var(--liquid-spacing) - 8) / 16), 1);
  transition: opacity 0.15s ease;
}
.lg-scene[data-variant="clear"] .lg-bridge {
  background: oklch(1 0 0 / 0.06);
  -webkit-backdrop-filter: blur(3px) saturate(1.2);
  backdrop-filter: blur(3px) saturate(1.2);
}
.lg-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}
.lg-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.78);
  background: transparent;
}
.lg-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.lg-note {
  position: absolute;
  left: 14px;
  bottom: 10px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  max-width: 68%;
}
@media (prefers-reduced-motion: reduce) {
  .lg-glass, .lg-bridge { transition: none; }
  .lg-scene[data-interactive="on"] .lg-glass:active { transform: none; }
}
`;function m({entryId:s,schema:i}){const t=g(s,i),[l,n]=a.useState(()=>t.get("variant")),[c,d]=a.useState(()=>t.get("interactive")),[r,o]=a.useState("alps");return a.useEffect(()=>t.subscribe(()=>{n(t.get("variant")),d(t.get("interactive"))}),[t]),e.jsx(b,{entryId:s,schema:i,children:e.jsxs("div",{className:"lg-scene","data-variant":l,"data-interactive":c,children:[e.jsx("div",{className:"lg-bg",children:e.jsx("img",{src:p(`photos/glass-${r}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async"})}),e.jsxs("div",{className:"lg-container",children:[e.jsx("button",{type:"button",className:"lg-glass",children:e.jsx("span",{children:"按钮 A / Btn A"})}),e.jsx("div",{className:"lg-bridge","aria-hidden":"true"}),e.jsx("button",{type:"button",className:"lg-glass",children:e.jsx("span",{children:"按钮 B / Btn B"})})]}),e.jsxs("div",{className:"lg-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:[e.jsx("button",{type:"button","aria-pressed":r==="alps",onClick:()=>o("alps"),children:"雪山"}),e.jsx("button",{type:"button","aria-pressed":r==="nebula",onClick:()=>o("nebula"),children:"星空"})]}),e.jsx("p",{className:"lg-note",children:"CSS 近似呈现 glassEffect/GlassEffectContainer 语义(regular 默认、clear + 35% 暗层、spacing 融合桥); 无折射与 scroll edge effect,非 Liquid Glass 本体。"}),e.jsx("style",{children:u})]})})}export{m as default};
