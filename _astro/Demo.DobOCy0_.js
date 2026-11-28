import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as b}from"./color.DuEPkvq5.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const i={success:{title:"已保存 Saved",body:"更改已写入服务器 Changes written to the server."},info:{title:"提示 Note",body:"警告提示驻留文档流,不自动消失。Alerts stay in the flow and never auto-dismiss."},warning:{title:"注意 Attention",body:"存储空间将于 7 天后耗尽 Storage runs out in 7 days."},error:{title:"失败 Failed",body:"同步失败,请检查网络后重试 Sync failed; check the network."}};function j({kind:a}){const n={width:15,height:15,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0};let t;return a==="success"?t=e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"8",cy:"8",r:"6.5"}),e.jsx("path",{d:"M5 8.2l2 2 4-4.4"})]}):a==="info"?t=e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"8",cy:"8",r:"6.5"}),e.jsx("path",{d:"M8 7.4v3.6"}),e.jsx("path",{d:"M8 5v.05",strokeWidth:2})]}):a==="warning"?t=e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M8 1.8L15 14H1z"}),e.jsx("path",{d:"M8 6v3.2"}),e.jsx("path",{d:"M8 11.4v.05",strokeWidth:2})]}):t=e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"8",cy:"8",r:"6.5"}),e.jsx("path",{d:"M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8"})]}),e.jsx("svg",{...n,children:t})}const y=`
.alc-page { position: absolute; inset: 0; }
.alc-top {
  position: absolute; top: 0; left: 0; right: 0; z-index: 5;
  display: flex; justify-content: center;
}
.alc-top .alc-alert { width: 100%; }
.alc-top .alc-reshow { margin: 8px 16px; }
.alc-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; gap: 10px; justify-content: center;
  padding: 24px 28px;
}
.alc-page[data-banner="on"] .alc-content {
  justify-content: flex-start;
  padding-top: 76px; /* 通栏让位 */
}
.alc-alert {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 10px 14px; border-radius: 8px; border: 1px solid;
  background: color-mix(in srgb, var(--alc-c) 10%, #fff);
  border-color: color-mix(in srgb, var(--alc-c) 40%, #fff);
  font-size: 13px; line-height: 1.6; color: rgba(0, 0, 0, 0.88);
  animation: alc-in 0.15s ease-out both;
}
.alc-alert.is-banner { border-radius: 0; border-top: 0; border-left: 0; border-right: 0; padding: 9px 16px; }
.alc-alert[data-type="success"] { --alc-c: #52c41a; }
.alc-alert[data-type="info"] { --alc-c: #1677ff; }
.alc-alert[data-type="warning"] { --alc-c: #faad14; }
.alc-alert[data-type="error"] { --alc-c: #ff4d4f; }
.alc-icon { color: var(--alc-c); flex: none; margin-top: 2px; display: inline-flex; }
.alc-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.alc-text strong { font-weight: 600; }
.alc-text span { color: rgba(0, 0, 0, 0.65); }
.alc-x {
  border: 0; background: transparent; cursor: pointer;
  font-size: 16px; line-height: 1; color: rgba(0, 0, 0, 0.45); padding: 2px 4px;
}
.alc-x:hover { color: rgba(0, 0, 0, 0.88); }
.alc-reshow {
  align-self: flex-start;
  border: 1px dashed #d9d9d9; border-radius: 6px; padding: 5px 12px;
  font-size: 12px; cursor: pointer; background: transparent; color: rgba(0, 0, 0, 0.65);
}
.alc-reshow:hover { color: #1677ff; border-color: #1677ff; }
.alc-h { margin: 0; font-size: 15px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.alc-p { margin: 0; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); max-width: 420px; }
@keyframes alc-in { from { opacity: 0; translate: 0 -4px; } to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) {
  .alc-alert { animation: none; }
}
`;function S({entryId:a,schema:n}){const t=b(a,n),[s,d]=o.useState(()=>t.get("type")),[p,x]=o.useState(()=>t.get("closable")==="on"),[f,h]=o.useState(()=>t.get("showIcon")==="on"),[r,g]=o.useState(()=>t.get("banner")==="on"),[u,l]=o.useState(!1);o.useEffect(()=>t.subscribe(()=>{d(t.get("type")),x(t.get("closable")==="on"),h(t.get("showIcon")==="on"),g(t.get("banner")==="on")}),[t]);const c=u?e.jsx("button",{type:"button",className:"alc-reshow",onClick:()=>l(!1),children:"重新显示 Show again"}):e.jsxs("div",{className:r?"alc-alert is-banner":"alc-alert",role:"alert","data-type":s,children:[f&&e.jsx("span",{className:"alc-icon",children:e.jsx(j,{kind:s})}),e.jsxs("div",{className:"alc-text",children:[e.jsx("strong",{children:i[s].title}),e.jsx("span",{children:i[s].body})]}),p&&e.jsx("button",{type:"button",className:"alc-x","aria-label":"关闭 Close",onClick:()=>l(!0),children:"×"})]});return e.jsxs(m,{entryId:a,schema:n,children:[e.jsxs("div",{className:"alc-page","data-banner":r?"on":"off",children:[e.jsx("div",{className:"alc-top",children:r&&c}),e.jsxs("div",{className:"alc-content",children:[!r&&c,e.jsx("h3",{className:"alc-h",children:"页面内容 Page content"}),e.jsxs("p",{className:"alc-p",children:["警告提示是文档流内的驻留警示块:role=alert 播报、不夺焦点、默认不消失。 An alert is a persistent in-flow block: role=alert announced, focus untouched, never auto-dismissed.",r?" banner 模式为通栏无圆角(antd 下 type/showIcon 默认翻转为 warning/true)。":""]})]})]}),e.jsx("style",{children:y})]})}export{S as default};
