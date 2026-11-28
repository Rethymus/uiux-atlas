import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as n}from"./color.DuEPkvq5.js";import{D as o}from"./DemoStage.vW1CgYCd.js";const l=4,c=`
.pt-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #c9c2b4;               /* 桌面底(工程值 [R]) */
}
/* riso 海报卡:实底纸色承载全部信息;噪点/网格/错印三层纯装饰 */
.pt-poster {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(340px, calc(100% - 48px));
  padding: 24px 26px 22px;
  border-radius: 12px;
  background: #f5f1e8;
  color: #26221c;
  overflow: hidden;
  box-shadow: 0 14px 36px rgb(38 34 28 / 0.3);
  animation: pt-in 0.45s ease-out both;
}
/* 网格线:双向 1px 细线 24px 间距,alpha = --pt-grid(工程值 [R]) */
.pt-poster::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(0deg, rgb(38 34 28 / calc(var(--pt-grid) / 100)) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(90deg, rgb(38 34 28 / calc(var(--pt-grid) / 100)) 0 1px, transparent 1px 24px);
}
/* 噪点层:feTurbulence data-URI 平铺(配方 0.65/3 为调研 06 已核验的 CSS-Tricks 值) */
.pt-poster::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: var(--pt-grain);
}
.pt-poster > * { position: relative; }
/* 双色版标题:本体深墨全对比;彩色油墨副本 multiply 叠印(纯装饰) */
.pt-plate {
  margin: 0 0 10px;
  position: relative;
  font-size: clamp(30px, 8vw, 44px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #26221c;
}
.pt-plate::before,
.pt-plate::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  mix-blend-mode: multiply;
  opacity: 0.8;
  pointer-events: none;
  transition: transform 0.25s ease;
}
.pt-plate::before { color: rgb(232 62 118); }
.pt-plate::after { color: rgb(38 92 255); }
/* 重印方向(离散开关):换状态一次到位,不做参数过渡 */
.pt-scene[data-press="0"] .pt-plate::before { transform: translate(var(--pt-misalign), calc(var(--pt-misalign) * -0.5)); }
.pt-scene[data-press="0"] .pt-plate::after { transform: translate(calc(var(--pt-misalign) * -1), calc(var(--pt-misalign) * 0.5)); }
.pt-scene[data-press="1"] .pt-plate::before { transform: translate(calc(var(--pt-misalign) * -1), calc(var(--pt-misalign) * 0.5)); }
.pt-scene[data-press="1"] .pt-plate::after { transform: translate(var(--pt-misalign), calc(var(--pt-misalign) * -0.5)); }
.pt-scene[data-press="2"] .pt-plate::before { transform: translate(0, var(--pt-misalign)); }
.pt-scene[data-press="2"] .pt-plate::after { transform: translate(0, calc(var(--pt-misalign) * -1)); }
.pt-scene[data-press="3"] .pt-plate::before,
.pt-scene[data-press="3"] .pt-plate::after { transform: translate(0, 0); }
.pt-body { margin: 0 0 16px; font-size: 12px; line-height: 1.6; opacity: 0.92; }
/* 几何油墨形:multiply 双圆叠印区自然压暗(riso 经典构图,装饰层) */
.pt-shapes {
  position: relative;
  height: 84px;
  margin: 0 0 16px;
}
.pt-shape {
  position: absolute;
  top: 4px;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  mix-blend-mode: multiply;
  pointer-events: none;
  transition: transform 0.25s ease;
}
.pt-shape-pink { left: 6px; background: rgb(232 62 118 / 0.8); transform: translate(var(--pt-misalign), 0); }
.pt-shape-blue { left: 52px; background: rgb(38 92 255 / 0.8); transform: translate(calc(var(--pt-misalign) * -1), 0); }
.pt-bar {
  position: absolute;
  left: 6px;
  bottom: 0;
  width: 62%;
  height: 12px;
  border-radius: 6px;
  background: rgb(38 34 28 / 0.8);
  mix-blend-mode: multiply;
  pointer-events: none;
}
.pt-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgb(38 34 28 / 0.55);
}
.pt-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: rgb(255 255 255 / 0.85);
  background: transparent;
}
.pt-toolbar button:hover { color: #fff; }
.pt-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgb(38 34 28 / 0.72);
}
@media (max-width: 480px) {
  .pt-note { display: none; }
  .pt-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes pt-in {
  from { opacity: 0; translate: -50% calc(-50% + 6px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .pt-poster { animation: none; }
  .pt-plate::before, .pt-plate::after, .pt-shape { transition: none; }
}
`;function b({entryId:e,schema:a}){n(e,a);const[r,p]=i.useState(0);return t.jsx(o,{entryId:e,schema:a,children:t.jsxs("div",{className:"pt-scene","data-press":r,children:[t.jsxs("div",{className:"pt-poster",children:[t.jsx("p",{className:"pt-plate","data-text":"纸纹 PAPER",children:"纸纹 PAPER"}),t.jsx("p",{className:"pt-body",children:"哑光纸面:噪点、网格、套色错位 / A matte paper surface: grain, grid, misregistered plates."}),t.jsxs("div",{className:"pt-shapes","aria-hidden":"true",children:[t.jsx("span",{className:"pt-shape pt-shape-pink"}),t.jsx("span",{className:"pt-shape pt-shape-blue"}),t.jsx("span",{className:"pt-bar"})]}),t.jsx("p",{className:"pt-body",children:"重印按钮循环套准偏差方向;拖动面板滑杆改噪点/错位/网格。 / The reprint button cycles registration error; drag the panel sliders for grain/misalign/grid."})]}),t.jsx("div",{className:"pt-toolbar",role:"group","aria-label":"重印方向 Reprint direction",children:t.jsx("button",{type:"button",title:"Reprint: cycle registration / misregistration direction",onClick:()=>p(s=>(s+1)%l),children:"重印 Reprint"})}),t.jsx("p",{className:"pt-note",children:"错位 2px/网格 15% 为社区常见值未证实;噪点配方(0.65/3)为调研 06 已核验值。 / misalign 2px & grid 15% are community-common values, unverified; the grain recipe (0.65/3) is verified via research 06."}),t.jsx("style",{children:c})]})})}export{b as default};
