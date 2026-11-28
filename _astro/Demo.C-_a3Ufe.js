import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const y=`
.cq-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.cq-playground { width: 100%; overflow-x: auto; padding: 2px 10px 2px 2px; }
.cq-slot { position: relative; width: var(--cq-width); max-width: 100%; }
.cq-box {
  width: 100%;
  container-type: inline-size;
  container-name: cq-card;
}
.cq-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, currentColor 6%, transparent);
}
.cq-banner {
  height: 64px;            /* 固定值回退在前 */
  height: 18cqw;           /* 容器单位覆盖在后:cqw = 容器宽度的 1% */
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(120deg, oklch(0.68 0.16 250 / 0.85), oklch(0.72 0.18 160 / 0.8));
  flex: none;
}
.cq-title {
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
  font-size: clamp(15px, 5.5cqi, 30px);  /* cqi = 1% 容器内联尺寸,clamp 保下限 */
}
.cq-body { margin: 0; font-size: 13px; line-height: 1.55; opacity: 0.78; }
.cq-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.cq-actions button {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
}
.cq-grip {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -12px;
  width: 14px;
  border: 0;
  padding: 0;
  cursor: ew-resize;
  touch-action: none;
  border-radius: 7px;
  background: linear-gradient(color-mix(in srgb, currentColor 14%, transparent), color-mix(in srgb, currentColor 28%, transparent));
}
.cq-grip::after {
  content: "";
  position: absolute;
  inset: 8px 5px;
  border-left: 1px dotted color-mix(in srgb, currentColor 55%, transparent);
  border-right: 1px dotted color-mix(in srgb, currentColor 55%, transparent);
}
.cq-grip:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.cq-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.cq-code {
  margin: 0;
  padding: 8px 12px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.6 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.cq-state-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.cq-state-compact { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.cq-state-wide { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.cq-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .cq-state-chip { transition: none; }
}
`;function N({entryId:d,schema:l}){const t=w(d,l),[c,u]=a.useState(()=>t.get("width")),[n,m]=a.useState(()=>t.get("breakpoint"));a.useEffect(()=>t.subscribe(()=>{u(t.get("width")),m(t.get("breakpoint"))}),[t]);const s=a.useRef(null),o=t.param("width"),p=r=>{t.set("width",Math.min(o.max,Math.max(o.min,Math.round(r))))},g=r=>{s.current={startX:r.clientX,startW:t.get("width")},r.currentTarget.setPointerCapture(r.pointerId)},b=r=>{const i=s.current;i&&p(i.startW+(r.clientX-i.startX))},x=r=>{s.current=null,r.currentTarget.hasPointerCapture(r.pointerId)&&r.currentTarget.releasePointerCapture(r.pointerId)},q=r=>{const i=r.shiftKey?50:10;if(r.key==="ArrowLeft")p(t.get("width")-i);else if(r.key==="ArrowRight")p(t.get("width")+i);else return;r.preventDefault()},h=c>=n;return e.jsx(f,{entryId:d,schema:l,children:e.jsxs("div",{className:"cq-wrap",children:[e.jsx("div",{className:"cq-playground",children:e.jsxs("div",{className:"cq-slot",children:[e.jsx("div",{className:"cq-box",children:e.jsxs("div",{className:"cq-card",children:[e.jsx("div",{className:"cq-banner",role:"img","aria-label":"banner,高度 18cqw 随容器伸缩"}),e.jsxs("div",{className:"cq-col",children:[e.jsx("p",{className:"cq-title",children:"自适应卡片 Adaptive Card"}),e.jsx("p",{className:"cq-body",children:"拖右缘手柄改变容器宽度:跨过断点时纵排翻转为横排,banner 与标题随 cqw/cqi 伸缩。 Drag the right grip: past the breakpoint the card flips to a row, and the banner and headline scale with cqw/cqi."}),e.jsxs("div",{className:"cq-actions",children:[e.jsx("button",{type:"button",children:"主操作 Action"}),e.jsx("button",{type:"button",children:"取消 Cancel"})]})]})]})}),e.jsx("button",{type:"button",className:"cq-grip",role:"separator","aria-orientation":"vertical","aria-label":"拖拽调整容器宽度 Resize container width","aria-valuemin":o.min,"aria-valuemax":o.max,"aria-valuenow":c,onPointerDown:g,onPointerMove:b,onPointerUp:x,onPointerCancel:x,onKeyDown:q})]})}),e.jsxs("div",{className:"cq-readout","aria-live":"polite",children:[e.jsxs("span",{children:["width = ",c,"px"]}),e.jsxs("span",{children:["breakpoint = ",n,"px"]}),e.jsx("span",{className:`cq-state-chip ${h?"cq-state-wide":"cq-state-compact"}`,children:h?"≥ 断点 → 横排 row":"小于断点 → 纵排 stacked"})]}),e.jsx("pre",{className:"cq-code","aria-label":"生成的容器查询规则 generated container rule",children:`@container cq-card (min-width: ${n}px) { … }`}),e.jsx("p",{className:"cq-hint",children:"查询条件必须是字面量(不能用自定义属性),因此断点由 demo 订阅后重生成规则;容器宽度走 --cq-width 变量,与面板滑杆双向同步。 Query conditions must be literals (no custom properties), so the breakpoint is regenerated by the demo; the width rides the --cq-width variable and syncs both ways with the panel slider."}),e.jsx("style",{children:y}),e.jsx("style",{children:`
@container cq-card (min-width: ${n}px) {
  .cq-card { flex-direction: row; align-items: stretch; }
  .cq-banner { width: 42cqi; height: auto; min-height: 110px; }
  .cq-col { flex: 1; min-width: 0; }
  .cq-title { font-size: clamp(17px, 7cqi, 30px); }
}
`})]})})}export{N as default};
