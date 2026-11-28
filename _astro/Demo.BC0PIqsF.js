import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as N}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";const S=[{key:"basic",label:"基本信息 Basic info",body:`张小明 · 138****6688 · zhang@example.com
注册于 2024-03 · 实名已认证`},{key:"address",label:"收货地址 Shipping address",body:`广东省 深圳市 南山区 科技园南区 8 栋 1201
(默认地址,下单页可直接带出)`},{key:"invoice",label:"发票开具 Invoice",body:`电子普通发票 · 抬头:某某科技有限公司 · 税号 91440300XXXXXXXXXX
(可选区块,默认收起不干扰主流程)`}],X=`
.cp-stage { width: min(460px, calc(100% - 48px)); }
.cp-group { margin: 0; padding: 0; border-block: 1px solid #f0f0f0; border-radius: 6px; list-style: none; }
.cp-item + .cp-item { border-top: 1px solid #f0f0f0; }   /* colorBorderSecondary */
.cp-head { margin: 0; font-size: 14px; }
.cp-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 0;
  background: transparent;
  color: rgba(0, 0, 0, 0.88);
  font: inherit;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
}
.cp-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.cp-stage[data-placement="end"] .cp-btn { flex-direction: row-reverse; justify-content: flex-start; }
.cp-stage[data-placement="end"] .cp-btn .cp-label { flex: 1; }
.cp-arrow {
  flex: none;
  width: 12px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.45);
  transition: rotate 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.cp-btn[aria-expanded="true"] .cp-arrow { rotate: 90deg; }
.cp-stage[data-collapsible="icon"] .cp-btn { cursor: default; }
.cp-stage[data-collapsible="icon"] .cp-arrow { cursor: pointer; }
.cp-stage[data-collapsible="icon"] .cp-btn .cp-label:hover { color: rgba(0, 0, 0, 0.65); }
.cp-stage[data-collapsible="disabled"] .cp-btn {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
}
.cp-body-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); /* motionDurationMid + EaseInOut */
}
.cp-item.is-open .cp-body-wrap { grid-template-rows: 1fr; }
.cp-body-inner { overflow: hidden; }
.cp-body {
  margin: 0;
  padding: 0 16px 12px;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.65);
  white-space: pre-line;
}
.cp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .cp-arrow, .cp-body-wrap { transition: none; }
}
`;function I({entryId:p,schema:d}){const a=N(p,d),[g,x]=n.useState(()=>a.get("accordion")),[m,f]=n.useState(()=>a.get("expandIconPlacement")),[i,u]=n.useState(()=>a.get("collapsible")),[y,h]=n.useState(["basic"]);n.useEffect(()=>a.subscribe(()=>{x(a.get("accordion")),f(a.get("expandIconPlacement")),u(a.get("collapsible"))}),[a]);const b=i==="disabled",s=e=>{b||h(o=>o.includes(e)?o.filter(c=>c!==e):g==="on"?[e]:[...o,e])},w=(e,o)=>{if(i!=="icon"){s(o);return}e.target.closest(".cp-arrow")&&s(o)},j=(e,o)=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),s(o))};return t.jsxs(k,{entryId:p,schema:d,children:[t.jsx("div",{className:"cp-stage","data-placement":m,"data-collapsible":i,children:t.jsx("ul",{className:"cp-group",children:S.map(e=>{const o=y.includes(e.key),r=`cp-region-${e.key}`,c=`cp-btn-${e.key}`;return t.jsxs("li",{className:`cp-item${o?" is-open":""}`,children:[t.jsx("h3",{className:"cp-head",children:t.jsxs("button",{type:"button",id:c,className:"cp-btn","aria-expanded":o,"aria-controls":r,"aria-disabled":b||void 0,onClick:l=>w(l,e.key),onKeyDown:l=>j(l,e.key),children:[t.jsx("span",{className:"cp-arrow","aria-hidden":"true",children:"▶"}),t.jsx("span",{className:"cp-label",children:e.label})]})}),t.jsx("div",{id:r,className:"cp-body-wrap",role:"region","aria-labelledby":c,children:t.jsx("div",{className:"cp-body-inner",children:t.jsx("p",{className:"cp-body",children:e.body})})})]},e.key)})})}),t.jsx("style",{children:X}),t.jsx("p",{className:"cp-hint",children:"键盘 Keyboard:Tab 移动 · Enter/Space 切换 · 面板 role=region 回指标题"})]})}export{I as default};
