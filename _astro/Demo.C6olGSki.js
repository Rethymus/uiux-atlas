import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{D as p}from"./DemoStage.vW1CgYCd.js";const n=`
.demo-stage { --pc-ring: 2px; }
.pc-field { position: absolute; inset: 0; }
.pc-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(330px, calc(100% - 200px));
  padding: 18px 20px;
  border: 1px solid oklch(0.6 0 0 / 0.35);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.85);
  font-size: 13px;
  transition: border-color 0.2s ease;
}
.pc-card h3 { margin: 0 0 6px; font-size: 15px; }
.pc-sub { margin: 0 0 12px; font-size: 12px; color: oklch(0.45 0.01 250); }
.pc-divider { border: 0; border-top: 1px solid oklch(0.6 0 0 / 0.3); margin: 10px 0; }
.pc-label { display: block; font-size: 12px; margin: 8px 0 4px; }
.pc-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px dashed oklch(0.55 0 0 / 0.5);
  border-radius: 9px;
  font-size: 14px;
  background: oklch(0.98 0 0);
}
.pc-input:focus-visible {
  outline: var(--pc-ring) dashed oklch(0.5 0.12 250);
  outline-offset: 2px;
}
.pc-btn {
  margin-top: 12px;
  border: 1px solid oklch(0.45 0.12 250);
  border-radius: 9px;
  padding: 7px 16px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.pc-btn:focus-visible {
  outline: var(--pc-ring) dashed oklch(0.5 0.12 250);
  outline-offset: 2px;
}
.pc-disabled { margin: 10px 0 0; font-size: 12px; color: oklch(0.6 0 0 / 0.8); }
.pc-mode-tag {
  position: absolute;
  left: 12px;
  top: 36px;
  font-size: 12px;
  font-weight: 700;
}
.pc-mode-tag small { display: block; font-weight: 400; opacity: 0.7; margin-top: 2px; }
.pc-readout {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 170px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
}
/* —— more:实线高对比焦点环 + 加深 + 硬分隔(MDN 示例场景) —— */
.pc-field[data-mode="more"] .pc-card { border-color: oklch(0.25 0 0); }
.pc-field[data-mode="more"] .pc-sub,
.pc-field[data-mode="more"] .pc-disabled { color: oklch(0.25 0.01 250); }
.pc-field[data-mode="more"] .pc-divider { border-top: 2px solid oklch(0.25 0 0); }
.pc-field[data-mode="more"] .pc-input,
.pc-field[data-mode="more"] .pc-btn { border-style: solid; border-color: oklch(0.25 0 0); }
.pc-field[data-mode="more"] .pc-input:focus-visible,
.pc-field[data-mode="more"] .pc-btn:focus-visible {
  outline: calc(var(--pc-ring) + 1px) solid oklch(0.2 0 0);
}
/* —— less:整体再柔和一档 —— */
.pc-field[data-mode="less"] .pc-card { border-color: oklch(0.7 0 0 / 0.3); }
.pc-field[data-mode="less"] .pc-sub,
.pc-field[data-mode="less"] .pc-disabled { color: oklch(0.55 0 0 / 0.6); }
.pc-field[data-mode="less"] .pc-divider { border-top: 1px solid oklch(0.7 0 0 / 0.25); }
/* —— custom:forced-colors 联动形态(用户调色板主导) —— */
.pc-field[data-mode="custom"] .pc-card {
  border: 2px solid CanvasText;
  background: Canvas;
  color: CanvasText;
}
.pc-field[data-mode="custom"] .pc-input { background: Field; color: FieldText; border: 1px solid FieldText; }
.pc-field[data-mode="custom"] .pc-btn { background: ButtonFace; color: ButtonText; border: 1px solid ButtonText; }
/* auto 档:真实媒体查询(仅 data-mode="auto" 时声明) */
.pc-field[data-mode="auto"] .pc-input:focus-visible,
.pc-field[data-mode="auto"] .pc-btn:focus-visible {
  outline: var(--pc-ring) dashed oklch(0.5 0.12 250);
}
@media (prefers-contrast: more) {
  .pc-field[data-mode="auto"] .pc-card { border-color: oklch(0.25 0 0); }
  .pc-field[data-mode="auto"] .pc-sub,
  .pc-field[data-mode="auto"] .pc-disabled { color: oklch(0.25 0.01 250); }
  .pc-field[data-mode="auto"] .pc-divider { border-top: 2px solid oklch(0.25 0 0); }
  .pc-field[data-mode="auto"] .pc-input,
  .pc-field[data-mode="auto"] .pc-btn { border-style: solid; border-color: oklch(0.25 0 0); }
  .pc-field[data-mode="auto"] .pc-input:focus-visible,
  .pc-field[data-mode="auto"] .pc-btn:focus-visible {
    outline: calc(var(--pc-ring) + 1px) solid oklch(0.2 0 0);
  }
}
@media (prefers-contrast: less) {
  .pc-field[data-mode="auto"] .pc-card { border-color: oklch(0.7 0 0 / 0.3); }
  .pc-field[data-mode="auto"] .pc-sub,
  .pc-field[data-mode="auto"] .pc-disabled { color: oklch(0.55 0 0 / 0.6); }
}
@media (prefers-contrast: custom) {
  .pc-field[data-mode="auto"] .pc-card { border: 2px solid CanvasText; }
}
@media (max-width: 480px) {
  .pc-readout { display: none; }
  .pc-card { width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .pc-card { transition: none; }
}
`,r={auto:{zh:"真实 @media (prefers-contrast: …) 已挂载,改动系统设置即可见形态切换",en:"Real @media (prefers-contrast: …) mounted — change the OS setting to see forms switch"},more:{zh:"模拟 more:虚线焦点环 → 实线加粗,文本与分隔线增强(MDN 示例场景)",en:"Simulated more: dashed focus ring → solid & thicker; text and dividers enhanced (MDN's example)"},less:{zh:"模拟 less:边框与次要文本进一步柔和",en:"Simulated less: borders and secondary text softened further"},custom:{zh:"模拟 custom:对应 forced-colors: active 的用户调色板(Canvas/Field/ButtonFace 系统色)",en:"Simulated custom: the forced-colors: active user palette (Canvas/Field/ButtonFace system colors)"}};function f({entryId:c,schema:a}){const o=l(c,a),[d,i]=s.useState(()=>o.get("mode"));s.useEffect(()=>o.subscribe(()=>{i(o.get("mode"))}),[o]);const t=r[d]??r.auto;return e.jsx(p,{entryId:c,schema:a,children:e.jsxs("div",{className:"pc-field","data-mode":d,children:[e.jsxs("p",{className:"pc-mode-tag",children:["当前模式 mode: ",d,e.jsxs("small",{children:[t.zh," / ",t.en]})]}),e.jsxs("div",{className:"pc-card",children:[e.jsx("h3",{children:"账户安全设置 Security"}),e.jsx("p",{className:"pc-sub",children:"两步验证显著提升账户安全性。"}),e.jsx("hr",{className:"pc-divider"}),e.jsx("label",{className:"pc-label",htmlFor:"pc-mail",children:"备用邮箱 Backup email"}),e.jsx("input",{id:"pc-mail",className:"pc-input",type:"email",placeholder:"you@example.com"}),e.jsx("button",{type:"button",className:"pc-btn",children:"开启两步验证 Enable 2FA"}),e.jsx("p",{className:"pc-disabled",children:"(禁用态示例 disabled sample:某些字段在验证后不可改)"})]}),e.jsxs("aside",{className:"pc-readout",children:[e.jsx("b",{children:"四值语义 The four values"}),e.jsxs("p",{style:{margin:"4px 0 0",fontSize:11.5},children:["no-preference:默认形态",e.jsx("br",{}),"more:焦点环/分隔线/文本增强",e.jsx("br",{}),"less:可进一步柔和",e.jsx("br",{}),"custom:联动 forced-colors 用户调色板",e.jsx("br",{}),e.jsx("span",{style:{opacity:.7},children:"Baseline 2022-05 全浏览器(07§38)"})]})]}),e.jsx("style",{children:n})]})})}export{f as default};
