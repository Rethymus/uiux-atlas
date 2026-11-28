import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{w as p}from"./urls.C_nDjrQ8.js";const n=[{id:"alps",zh:"照片",en:"Photo"},{id:"gradient",zh:"渐变",en:"Gradient"}],l=`
.rp-scene { position: absolute; inset: 0; overflow: hidden; }
.rp-bg { position: absolute; inset: 0; }
.rp-bg img,
.rp-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.rp-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* ── 层 1 · 玻璃拟态材质(styles/glassmorphism 官方默认配方)── */
.rp-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(340px, calc(100% - 32px));
  padding: 24px 26px;
  background-color: oklch(1 0 0 / 0.15);
  border: 1px solid oklch(1 0 0 / 0.3);
  border-radius: 20px;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  color: #131b2e;
  /* 层 3 · 主题投影:静止档(轻),hover 换档到第一层悬浮阴影(Ant @shadow-1) */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  animation: rp-in 0.5s ease-out both;
}
.rp-card:hover {
  /* Ant @shadow-1(16 号调研 §2.3 精确值):第 1 层 = 操作触发的临时悬浮 */
  box-shadow:
    0 1px 2px -2px rgba(0, 0, 0, 0.16),
    0 3px 6px 0 rgba(0, 0, 0, 0.12),
    0 5px 12px 4px rgba(0, 0, 0, 0.09),
    0 8px 32px rgba(0, 0, 0, 0.25);
}
.rp-card > * { position: relative; }
.rp-card-title { margin: 0 0 8px; font-size: 18px; font-weight: 650; line-height: 1.3; opacity: 1; }
.rp-card p { margin: 0 0 16px; font-size: 13px; line-height: 1.6; opacity: 1; }
/* ── 层 4 · 按压反馈对(motion/press-feedback):scale 0.96 + alpha 状态层成对 ──
   ── 层 2 · M3 内容色状态层(materials/m3-state-layers):hover +8% / press +10%,
      颜色取内容色(on color)#131b2e 而非容器色,一次只叠一层 ── */
.rp-btn {
  position: relative;
  border: 1px solid oklch(1 0 0 / 0.3);
  border-radius: 10px;
  padding: 7px 16px;
  font-size: 13px;
  cursor: pointer;
  color: inherit;
  white-space: nowrap;
  transition:
    transform 0.12s cubic-bezier(0.2, 0, 0, 1),
    background-color 0.1s ease;
}
.rp-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgba(19, 27, 46, 0);
  pointer-events: none;
}
.rp-btn:hover::after { background: rgba(19, 27, 46, 0.08); }   /* M3 hover +8% */
.rp-btn:active { transform: scale(0.96); }                       /* 按压对 scale */
.rp-btn:active::after { background: rgba(19, 27, 46, 0.10); }   /* M3 press +10% */
.rp-btn:focus-visible {
  outline: 2px solid var(--accent, #6db2ff);
  outline-offset: 1px;
}
.rp-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.rp-btn-primary::after { background: rgba(255, 255, 255, 0); }
.rp-btn-primary:hover::after { background: rgba(255, 255, 255, 0.08); }
.rp-btn-primary:active::after { background: rgba(255, 255, 255, 0.10); }
.rp-btn-ghost { background: transparent; }
/* ── 四层分工铭牌(mono 元数据纪律;默认值与导出参数快照同源)── */
.rp-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
}
.rp-layers b { font-weight: 600; color: #fff; }
.rp-toolbar {
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
.rp-toolbar button {
  position: relative;
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.rp-toolbar button::after { content: ""; position: absolute; inset: -8px; } /* 热区 ≥42px(spec §7) */
.rp-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .rp-card { background-color: color-mix(in srgb, oklch(1 0 0 / 0.15) 100%, #c7cfdb 65%); }
}
@keyframes rp-in {
  from { opacity: 0; translate: -50% calc(-50% + 10px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (max-width: 480px) {
  .rp-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
  .rp-layers { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .rp-card { animation: none; }
  .rp-card, .rp-btn { transition: none; }
  .rp-btn:active { transform: none; }
}
`;function x({locale:o}){const[t,s]=i.useState("alps"),a=o==="zh";return r.jsxs("div",{className:"demo-stage",children:[r.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[r.jsx("span",{className:"stage-plate-dot"}),"Glass Card Pro"]}),r.jsxs("div",{className:"rp-scene",children:[r.jsx("div",{className:"rp-bg",children:t==="gradient"?r.jsx("div",{className:"rp-gradient"}):r.jsx("img",{src:p("photos/glass-alps.jpg"),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),r.jsxs("div",{className:"rp-card",children:[r.jsx("p",{className:"rp-card-title",children:a?"玻璃卡片·完整版":"Glass Card Pro"}),r.jsx("p",{children:a?"材质管氛围 · 状态层管反馈 · 投影管海拔 · 按压对管触感。":"Material = ambience · state layer = feedback · shadow = elevation · press pair = touch."}),r.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[r.jsx("button",{type:"button",className:"rp-btn rp-btn-primary",children:a?"主操作 Action":"Primary action"}),r.jsx("button",{type:"button",className:"rp-btn rp-btn-ghost",children:a?"取消 Cancel":"Cancel"})]})]}),r.jsxs("p",{className:"rp-layers","aria-hidden":"true",children:[r.jsxs("span",{children:[r.jsx("b",{children:"1"})," glass: blur(20px) · fill 15% · border 30% · r20"]}),r.jsxs("span",{children:[r.jsx("b",{children:"2"})," state: hover +8% · press +10% (on color)"]}),r.jsxs("span",{children:[r.jsx("b",{children:"3"})," shadow: hover → @shadow-1 (Ant L1)"]}),r.jsxs("span",{children:[r.jsx("b",{children:"4"})," press: scale 0.96 + alpha pair"]})]}),r.jsx("div",{className:"rp-toolbar",role:"group","aria-label":a?"背景切换 Backdrop switcher":"Backdrop switcher",children:n.map(e=>r.jsx("button",{type:"button","aria-pressed":t===e.id,title:e.en,onClick:()=>s(e.id),children:e.zh},e.id))})]}),r.jsx("style",{children:l})]})}export{x as default};
