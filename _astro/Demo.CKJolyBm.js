import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as k}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const y=[{title:"确认订单 Confirm",desc:"商品与地址"},{title:"支付费用 Pay",desc:"在线支付"},{title:"平台审核 Review",desc:"风控审核"},{title:"开始使用 Start",desc:"开通服务"}],j=`
.st-stage { width: min(560px, calc(100% - 48px)); }
.st-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0;
  padding: 0;
  list-style: none;
}
.st-stage[data-orientation="vertical"] .st-steps {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto);
}
.st-item { position: relative; text-align: center; }
.st-stage[data-orientation="vertical"] .st-item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 12px;
  text-align: left;
  padding-block: 6px;
}
/* 连接线:每步右侧横线(末步无) */
.st-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 16px;                               /* 32px 圆心 */
  left: calc(50% + 22px);
  right: calc(-50% + 22px);
  height: 2px;
  background: #f0f0f0;                     /* colorBorderSecondary */
  transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.st-item.is-done:not(:last-child)::after { background: #1677ff; }
.st-stage[data-orientation="vertical"] .st-item:not(:last-child)::after {
  top: 34px;
  bottom: -12px;
  left: 15px;
  right: auto;
  width: 2px;
  height: auto;
}
.st-head {
  position: relative;
  z-index: 1;
  display: inline-grid;
  place-items: center;
  width: 32px;                             /* antd 控件高度 32 档 */
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: rgba(0, 0, 0, 0.25);              /* TextQuaternary */
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px #d9d9d9;     /* colorBorder */
  transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.st-head:hover { box-shadow: inset 0 0 0 1px #1677ff; color: #1677ff; }
.st-head:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.st-item.is-done .st-head { background: #1677ff; color: #fff; box-shadow: none; }
.st-item.is-process .st-head { background: #1677ff; color: #fff; box-shadow: none; }
.st-item.is-error .st-head { background: #fff; color: #ff4d4f; box-shadow: inset 0 0 0 1px #ff4d4f; }
.st-glyph { font-size: 13px; line-height: 1; }
.st-glyph.is-pop { animation: st-pop 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) both; } /* EaseOutBack */
@keyframes st-pop {
  from { scale: 0.4; opacity: 0; }
  to { scale: 1; opacity: 1; }
}
/* process 步进度环(conic-gradient) */
.st-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  padding: 2px;
  background: conic-gradient(#1677ff var(--st-percent, 50%), #f0f0f0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
  pointer-events: none;
}
.st-label { margin-top: 8px; font-size: 14px; color: rgba(0, 0, 0, 0.88); }
.st-item.is-wait .st-label { color: rgba(0, 0, 0, 0.45); }
.st-item.is-error .st-label { color: #ff4d4f; }
.st-desc { margin-top: 2px; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.st-state { margin-top: 2px; font-size: 12px; }
.st-item.is-done .st-state { color: #1677ff; }
.st-item.is-process .st-state { color: #1677ff; }
.st-item.is-error .st-state { color: #ff4d4f; }
.st-note { margin: 14px 0 0; font-size: 13px; color: rgba(0, 0, 0, 0.65); }
.st-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (max-width: 532px) {
  .st-steps { grid-template-columns: 1fr; grid-template-rows: repeat(4, auto); }
  .st-item { display: grid; grid-template-columns: auto 1fr; column-gap: 12px; text-align: left; padding-block: 6px; }
  .st-item .st-label { margin-top: 0; }
  .st-item:not(:last-child)::after {
    top: 34px; bottom: -12px; left: 15px; right: auto; width: 2px; height: auto;
  }
}
@media (prefers-reduced-motion: reduce) {
  .st-head, .st-item:not(:last-child)::after { transition: none; }
  .st-glyph.is-pop { animation: none; }
}
`;function E({entryId:c,schema:l}){const e=k(c,l),[n,p]=i.useState(()=>e.get("current")),[f,m]=i.useState(()=>e.get("errorAt")),[a,g]=i.useState(()=>e.get("percent")),[x,u]=i.useState(()=>e.get("orientation"));i.useEffect(()=>e.subscribe(()=>{p(e.get("current")),m(e.get("errorAt")),g(e.get("percent")),u(e.get("orientation"))}),[e]);const h=r=>f===String(r)?"error":r<n?"done":r===n?"process":"wait",d={done:"已完成 Done",process:`进行中 ${a>0?`${a}%`:""}`,wait:"未开始 Waiting",error:"出错 Error"};return t.jsxs(w,{entryId:c,schema:l,children:[t.jsxs("div",{className:"st-stage","data-orientation":x,children:[t.jsx("ol",{className:"st-steps","aria-label":"开通流程 Onboarding steps",children:y.map((r,o)=>{const s=h(o),b=s==="done"?"is-done":s==="process"?"is-process":s==="error"?"is-error":"is-wait";return t.jsxs("li",{className:`st-item ${b}`,"aria-current":s==="process"?"step":void 0,children:[t.jsxs("button",{type:"button",className:"st-head","aria-label":`第 ${o+1} 步 ${r.title}:${d[s]}`,title:r.title,onClick:()=>e.set("current",o),children:[s==="process"&&a>0&&t.jsx("span",{className:"st-ring",style:{"--st-percent":`${a}%`},"aria-hidden":"true"}),t.jsx("span",{className:"st-glyph is-pop","aria-hidden":"true",children:s==="done"?"✓":s==="error"?"✕":o+1},`${s}-${o}`)]}),t.jsxs("div",{className:"st-meta",children:[t.jsx("div",{className:"st-label",children:r.title}),t.jsx("div",{className:"st-desc",children:r.desc}),t.jsx("div",{className:"st-state","aria-hidden":"true",children:d[s]})]})]},r.title)})}),t.jsxs("p",{className:"st-note",children:["点击步骤头切换当前步 Click a step header to jump · 当前第 ",n+1," 步 / 4"]})]}),t.jsx("style",{children:j}),t.jsx("p",{className:"st-hint",children:"状态推导 Status:i<current 已完成 · =current 进行中 · >current 等待 · errorAt 显式覆盖"})]})}export{E as default};
