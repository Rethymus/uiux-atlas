import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const n=[{value:"email",label:"邮件通知 Email"},{value:"sms",label:"短信通知 SMS"},{value:"inapp",label:"站内信通知 In-app"}],j=`
.ck-stage { width: min(300px, calc(100% - 48px)); }
.ck-group { border: 1px solid #f0f0f0; border-radius: 8px; padding: 12px 16px 8px; background: #fff; margin: 0; }
.ck-group legend { font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); padding: 0 4px; }
.ck-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
}
.ck-row input {
  appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  flex: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.ck-row input:hover { border-color: #1677ff; }
.ck-row input:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.ck-row input:checked, .ck-row input:indeterminate { background: #1677ff; border-color: #1677ff; }
.ck-row input:checked::after {
  content: "";
  width: 8px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(0, -1px);
}
.ck-row input:indeterminate::after {
  content: "";
  width: 8px;
  height: 2px;
  background: #fff;
}
.ck-group[data-disabled="on"] { opacity: 0.45; }
.ck-group[data-disabled="on"] .ck-row { cursor: not-allowed; }
.ck-state { margin: 10px 0 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); font-variant-numeric: tabular-nums; }
.ck-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .ck-row input { transition: none; }
}
`;function C({entryId:p,schema:f}){const r=w(p,f),[u,g]=a.useState(()=>r.get("disabled")),[s,l]=a.useState(()=>new Set),d=a.useRef(null);a.useEffect(()=>r.subscribe(()=>{g(r.get("disabled"));const e=r.get("selectAll");l(o=>{const x=e==="on",m=o.size===n.length;return x===m?o:x?new Set(n.map(k=>k.value)):new Set})}),[r]);const i=s.size===n.length,c=s.size>0&&!i;a.useEffect(()=>{d.current&&(d.current.indeterminate=c)},[c]);const h=()=>{const e=new Set(i?[]:n.map(o=>o.value));l(e),r.set("selectAll",e.size===n.length?"on":"off")},b=e=>{const o=new Set(s);o.has(e)?o.delete(e):o.add(e),l(o),r.set("selectAll",o.size===n.length?"on":"off")};return t.jsxs(S,{entryId:p,schema:f,children:[t.jsx("div",{className:"ck-stage",children:t.jsxs("fieldset",{className:"ck-group","data-disabled":u,disabled:u==="on",children:[t.jsx("legend",{children:"通知方式 Notification channels"}),t.jsxs("label",{className:"ck-row",children:[t.jsx("input",{ref:d,type:"checkbox",checked:i,"aria-checked":c?"mixed":void 0,onChange:h}),t.jsx("span",{children:"全选 Select all"})]}),n.map(e=>t.jsxs("label",{className:"ck-row",children:[t.jsx("input",{type:"checkbox",checked:s.has(e.value),onChange:()=>b(e.value)}),t.jsx("span",{children:e.label})]},e.value)),t.jsxs("p",{className:"ck-state","aria-live":"polite",children:["aria-checked = ",c?'"mixed" (半选 indeterminate)':i?'"true" (on)':'"false" (off)'," · 已选 selected ",s.size,"/",n.length]})]})}),t.jsx("style",{children:j}),t.jsx("p",{className:"ck-hint",children:"键盘 Keyboard:Space 切换 Toggle · 半选时点全选 = 补齐 Select-all completes"})]})}export{C as default};
