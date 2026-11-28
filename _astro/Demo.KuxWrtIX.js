import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as h}from"./color.DuEPkvq5.js";import{D as v}from"./DemoStage.vW1CgYCd.js";const j=`
.bd-scene { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 26px; }
.bd-hosts { display: flex; align-items: center; gap: 34px; animation: bd-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
.bd-host { position: relative; } /* 徽标定位锚 */
/* 宿主 1:主按钮(antd colorPrimary #1677ff) */
.bd-btn {
  border: 0; border-radius: 6px; padding: 8px 20px; font-size: 14px;
  background: #1677ff; color: #fff; cursor: pointer;
}
.bd-btn:hover { background: #4096ff; } /* antd blue-5 hover 档 */
.bd-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
/* 宿主 2:头像(同 avatar 条目 32px 基准) */
.bd-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: oklch(0.85 0.09 265);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 500; color: rgba(0, 0, 0, 0.88);
}
/* 徽标本体:红色 = antd colorError seed #ff4d4f;offset 经 --bd-offset 注入 translate */
.bd-badge {
  position: absolute; top: 0; right: 0; z-index: 2;
  transform: translate(50%, -50%) translate(var(--bd-offset, 0px), var(--bd-offset, 0px));
  min-width: 20px; height: 20px; padding: 0 5px;
  border-radius: 10px; background: #ff4d4f; color: #fff;
  font-size: 12px; font-weight: 600; line-height: 20px; text-align: center;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 0 0 2px #fff; /* 与宿主分离的白环 */
}
.bd-scene[data-dot="on"] .bd-badge {
  min-width: 0; width: 8px; height: 8px; padding: 0;
  border-radius: 50%; font-size: 0;
}
.bd-badge.bd-pop { animation: bd-pop 0.25s cubic-bezier(0.645, 0.045, 0.355, 1); }
/* 工具条:+1 / 清零(store.set 双向同步参数面板) */
.bd-toolbar {
  position: absolute; left: 12px; bottom: 12px;
  display: flex; gap: 2px; padding: 3px; border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
}
.bd-toolbar button {
  border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px;
  cursor: pointer; color: rgba(255, 255, 255, 0.75); background: transparent;
}
.bd-toolbar button:hover { color: #fff; }
.bd-note { font-size: 11px; color: rgba(0, 0, 0, 0.45); text-align: center; }
@keyframes bd-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } }
@keyframes bd-pop { from { scale: 0.6; } to { scale: 1; } }
@media (max-width: 480px) { .bd-hosts { gap: 22px; } }
@media (prefers-reduced-motion: reduce) {
  .bd-hosts { animation: none; }
  .bd-badge.bd-pop { animation: none; }
}
`;function $({entryId:i,schema:b}){const e=h(i,b),[o,p]=a.useState(()=>e.get("count")),[s,f]=a.useState(()=>e.get("max")),[n,x]=a.useState(()=>e.get("dot")),[c,l]=a.useState(!1);a.useEffect(()=>e.subscribe(()=>{p(e.get("count")),f(e.get("max")),x(e.get("dot"))}),[e]);const r=o>0,d=o>s?`${s}+`:`${o}`,u=`收件箱,${r?`${d} 条未读`:"无未读"}`,m=()=>{const g=Math.min(99,o+1);e.set("count",g),l(!0),window.setTimeout(()=>l(!1),250)};return t.jsxs(v,{entryId:i,schema:b,children:[t.jsxs("div",{className:"bd-scene","data-dot":n,children:[t.jsxs("div",{className:"bd-hosts",children:[t.jsxs("div",{className:"bd-host",children:[t.jsx("button",{type:"button",className:"bd-btn","aria-label":u,children:"收件箱 Inbox"}),r&&t.jsx("span",{className:`bd-badge${c?" bd-pop":""}`,"aria-hidden":"true",children:n==="on"?"":d})]}),t.jsxs("div",{className:"bd-host",children:[t.jsx("div",{className:"bd-avatar",role:"img","aria-label":"用户头像,林晚",children:"林"}),r&&t.jsx("span",{className:`bd-badge${c?" bd-pop":""}`,"aria-hidden":"true",children:n==="on"?"":d})]})]}),t.jsx("div",{className:"bd-note",children:r?n==="on"?`dot 模式:数字隐藏,count = ${o}`:`显示 ${d}${o>s?`(封顶 max = ${s})`:""}`:"count = 0:徽标隐藏(antd showZero 默认 false)"}),t.jsxs("div",{className:"bd-toolbar",role:"group","aria-label":"徽标计数操作 Count actions",children:[t.jsx("button",{type:"button",onClick:m,children:"+1 新消息"}),t.jsx("button",{type:"button",onClick:()=>e.set("count",0),children:"清零 Clear"})]})]}),t.jsx("style",{children:j})]})}export{$ as default};
