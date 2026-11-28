import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as z}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const v=`
.ip-stage {
  width: min(400px, calc(100% - 48px));
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ip-label { font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); }
.ip-wrap { position: relative; }
.ip-wrap input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.88);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ip-wrap input::placeholder { color: rgba(0, 0, 0, 0.25); }
.ip-wrap input:hover { border-color: #1677ff; }
/* 尺寸三档:antd controlHeight 派生 24/32/40 + 字阶 12/14/16 + 圆角 SM 4/6 */
.ip-stage[data-size="sm"] input { height: 24px; font-size: 12px; padding: 0 8px; border-radius: 4px; }
.ip-stage[data-size="md"] input { height: 32px; font-size: 14px; padding: 0 12px; border-radius: 6px; }
.ip-stage[data-size="lg"] input { height: 40px; font-size: 16px; padding: 0 12px; border-radius: 6px; }
.ip-stage[data-clearable="on"] input { padding-right: 30px; }
/* 状态边框:colorBorder / colorError / colorWarning */
.ip-stage[data-status="default"] input { border-color: #d9d9d9; }
.ip-stage[data-status="error"] input { border-color: #ff4d4f; }
.ip-stage[data-status="warning"] input { border-color: #faad14; }
.ip-wrap input:focus {
  outline: none;
  border-color: #1677ff;
  box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent);
}
.ip-wrap input:focus-visible {
  outline: 2px solid #1677ff;
  outline-offset: -2px;
}
.ip-clear {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  right: 6px;
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 50%;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  background: rgba(0, 0, 0, 0.06);
}
.ip-clear:hover { color: rgba(0, 0, 0, 0.88); background: rgba(0, 0, 0, 0.12); }
.ip-meta { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; min-height: 18px; }
.ip-help { margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.ip-stage[data-status="error"] .ip-help { color: #ff4d4f; }
.ip-stage[data-status="warning"] .ip-help { color: #faad14; }
.ip-count { margin: 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); font-variant-numeric: tabular-nums; }
.ip-count.is-over { color: #ff4d4f; font-weight: 600; }
.ip-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .ip-wrap input { transition: none; }
}
`,c={default:{zh:"支持字母、数字与下划线",en:"Letters, digits and underscores"},error:{zh:"该用户名已被占用",en:"This username is already taken"},warning:{zh:"用户名偏短,建议 6 个字符以上",en:"Short username — 6+ characters advised"}};function C({entryId:s,schema:n}){const t=z(s,n),[u,g]=a.useState(()=>t.get("size")),[i,x]=a.useState(()=>t.get("status")),[p,b]=a.useState(()=>t.get("clearable")),[r,h]=a.useState(()=>t.get("maxLength")),[o,l]=a.useState("");a.useEffect(()=>t.subscribe(()=>{g(t.get("size")),x(t.get("status")),b(t.get("clearable")),h(t.get("maxLength"))}),[t]);const d=r>0&&o.length>r,m=p==="on"&&o.length>0;return e.jsxs(w,{entryId:s,schema:n,children:[e.jsxs("div",{className:"ip-stage","data-size":u,"data-status":i,"data-clearable":p,children:[e.jsx("label",{className:"ip-label",htmlFor:"ip-demo-input",children:"用户名 Username"}),e.jsxs("div",{className:"ip-wrap",children:[e.jsx("input",{id:"ip-demo-input",type:"text",value:o,placeholder:"请输入用户名 / Enter a username","aria-invalid":i==="error","aria-describedby":"ip-demo-help ip-demo-count",onChange:f=>l(f.target.value)}),m&&e.jsx("button",{type:"button",className:"ip-clear","aria-label":"清空用户名 Clear username",onClick:()=>{l(""),document.getElementById("ip-demo-input")?.focus()},children:"×"})]}),e.jsxs("div",{className:"ip-meta",children:[e.jsxs("p",{id:"ip-demo-help",className:"ip-help",children:[c[i]?.zh," / ",c[i]?.en]}),r>0&&e.jsxs("p",{id:"ip-demo-count",className:`ip-count${d?" is-over":""}`,"aria-live":"polite",children:[o.length,"/",r,d?" 已超出 over":""]})]})]}),e.jsx("style",{children:v}),e.jsx("p",{className:"ip-hint",children:"键盘 Keyboard:Tab 聚焦 · Ctrl/Cmd+A + Delete 清空 Clear"})]})}export{C as default};
