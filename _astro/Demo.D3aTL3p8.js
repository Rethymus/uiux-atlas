import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as C}from"./color.DuEPkvq5.js";import{D as z}from"./DemoStage.vW1CgYCd.js";const N=`
.demo-stage { --modal-width: 480px; }
.mdl-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.mdl-trigger {
  border: 1px solid transparent; border-radius: 6px; padding: 8px 18px;
  font-size: 13px; cursor: pointer; background: #1677ff; color: #fff;
}
.mdl-trigger:hover { background: #4096ff; }
.mdl-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
.mdl-overlay {
  position: absolute; inset: 0; z-index: 30;
  background: rgba(0, 0, 0, 0.45); /* antd colorBgMask */
  display: flex; justify-content: center; align-items: flex-start;
  padding: 56px 16px 24px;
  animation: mdl-fade 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.mdl-overlay[data-centered="on"] { align-items: center; }
.mdl-dialog {
  width: var(--modal-width); max-width: 100%;
  background: #fff; border-radius: 8px; /* antd borderRadiusLG */
  box-shadow: 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05);
  padding: 20px 24px;
  animation: mdl-zoom 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  outline: none;
}
.mdl-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.mdl-head h3 { margin: 0; font-size: 16px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.mdl-x {
  border: 0; background: transparent; padding: 2px 6px; cursor: pointer;
  font-size: 18px; line-height: 1; color: rgba(0, 0, 0, 0.45);
}
.mdl-x:hover { color: rgba(0, 0, 0, 0.88); }
.mdl-body { margin: 12px 0 20px; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); }
.mdl-foot { display: flex; justify-content: flex-end; gap: 10px; }
.mdl-btn { border: 1px solid transparent; border-radius: 6px; padding: 6px 16px; font-size: 13px; cursor: pointer; }
.mdl-btn-ghost { background: #fff; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
.mdl-btn-ghost:hover { color: #1677ff; border-color: #1677ff; }
.mdl-btn-primary { background: #1677ff; color: #fff; }
.mdl-btn-primary:hover { background: #4096ff; }
@keyframes mdl-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes mdl-zoom {
  from { opacity: 0; transform: scale(0.96) translateY(-6px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .mdl-overlay, .mdl-dialog { animation: none; }
}
`;function S({entryId:f,schema:m}){const r=C(f,m),[l,g]=o.useState(()=>r.get("maskClosable")==="on"),[h,y]=o.useState(()=>r.get("centered")==="on"),[s,p]=o.useState(!1),b=o.useRef(null),i=o.useRef(null);o.useEffect(()=>r.subscribe(()=>{g(r.get("maskClosable")==="on"),y(r.get("centered")==="on")}),[r]),o.useEffect(()=>{s&&i.current?.focus()},[s]);const a=()=>{p(!1),b.current?.focus()},k=t=>{if(t.key==="Escape"){t.stopPropagation(),a();return}if(t.key!=="Tab")return;const d=i.current;if(!d)return;const n=Array.from(d.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(j=>!j.hasAttribute("disabled"));if(n.length===0){t.preventDefault();return}const u=n[0],x=n[n.length-1],c=document.activeElement;t.shiftKey&&(c===u||c===d)?(t.preventDefault(),x.focus()):!t.shiftKey&&c===x&&(t.preventDefault(),u.focus())},v=t=>{t.target===t.currentTarget&&l&&a()};return e.jsxs(z,{entryId:f,schema:m,children:[e.jsxs("div",{className:"mdl-page",children:[e.jsx("button",{ref:b,type:"button",className:"mdl-trigger",onClick:()=>p(!0),children:"打开对话框 Open dialog"}),e.jsxs("p",{className:"mdl-hint",children:["Esc 关闭 · ",l?"点遮罩可关闭":"点遮罩不关闭"," · Mask click"," ",l?"closes":"ignored"]})]}),s&&e.jsx("div",{className:"mdl-overlay","data-centered":h?"on":"off",onClick:v,onKeyDown:k,children:e.jsxs("div",{ref:i,className:"mdl-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"mdl-title",tabIndex:-1,children:[e.jsxs("div",{className:"mdl-head",children:[e.jsx("h3",{id:"mdl-title",children:"删除草稿 Delete draft"}),e.jsx("button",{type:"button",className:"mdl-x","aria-label":"关闭 Close",onClick:a,children:"×"})]}),e.jsx("p",{className:"mdl-body",children:"删除后不可恢复。模态打开期间外部内容被遮罩隔离,Tab 循环困在框内。 This action cannot be undone; focus is trapped inside while open."}),e.jsxs("div",{className:"mdl-foot",children:[e.jsx("button",{type:"button",className:"mdl-btn mdl-btn-ghost",onClick:a,children:"取消 Cancel"}),e.jsx("button",{type:"button",className:"mdl-btn mdl-btn-primary",onClick:a,children:"删除 Delete"})]})]})}),e.jsx("style",{children:N})]})}export{S as default};
