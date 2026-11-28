import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as x}from"./color.DuEPkvq5.js";import{D as b}from"./DemoStage.vW1CgYCd.js";const f=`
.cd-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px 16px; }
/* 卡片:1px 边框 = antd variant outlined;阴影默认轻阴影档 boxShadowTertiary */
.cd-card {
  width: min(380px, 100%);
  background: #fff; border: 1px solid #d9d9d9; border-radius: 8px; /* 圆角 LG = seed 6 +2 */
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 6px -1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.03);
  animation: cd-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
/* hoverable:升到浮层阴影档 boxShadow(06-antdesign.md §2.3 ⑥)+ 2px 上浮 */
.cd-card[data-hoverable="on"] {
  cursor: pointer;
  transition: box-shadow 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), translate 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.cd-card[data-hoverable="on"]:hover {
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  translate: 0 -2px;
}
/* 封面:纯装饰渐变色带(cover 插槽的演示形态) */
.cd-cover {
  height: 92px; border-radius: 8px 8px 0 0;
  background:
    radial-gradient(90% 140% at 12% 8%, oklch(0.78 0.13 220 / 0.9), transparent 62%),
    radial-gradient(80% 130% at 88% 16%, oklch(0.75 0.14 285 / 0.85), transparent 60%),
    oklch(0.55 0.12 250);
}
/* 头部:标题 + extra */
.cd-head {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  border-bottom: 1px solid #f0f0f0; /* colorBorderSecondary */
}
.cd-card[data-size="md"] .cd-head { padding: 16px 24px; }
.cd-card[data-size="sm"] .cd-head { padding: 10px 12px; }
.cd-title { margin: 0; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.cd-card[data-size="md"] .cd-title { font-size: 16px; }
.cd-card[data-size="sm"] .cd-title { font-size: 14px; }
.cd-extra { font-size: 12px; color: #1677ff; white-space: nowrap; } /* antd colorPrimary */
/* 正文 */
.cd-body { color: rgba(0, 0, 0, 0.65); line-height: 1.6; }
.cd-card[data-size="md"] .cd-body { padding: 16px 24px; font-size: 14px; }
.cd-card[data-size="sm"] .cd-body { padding: 10px 12px; font-size: 13px; }
.cd-body p { margin: 0; }
/* 操作区:顶部细分隔线,均分三个动作(antd actions 形态) */
.cd-actions {
  display: flex; border-top: 1px solid #f0f0f0;
}
.cd-actions button {
  flex: 1; border: 0; background: none; cursor: pointer;
  color: rgba(0, 0, 0, 0.65); font-size: 13px; padding: 9px 0;
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
}
.cd-card[data-size="md"] .cd-actions button { padding: 12px 0; }
.cd-actions button + button { border-left: 1px solid #f0f0f0; }
.cd-actions button:hover { color: #1677ff; }
.cd-actions button:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.cd-note { margin-top: 10px; font-size: 11px; color: rgba(0, 0, 0, 0.45); text-align: center; }
@keyframes cd-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) {
  .cd-card { animation: none; }
  .cd-card[data-hoverable="on"] { transition: none; }
}
`;function v({entryId:o,schema:d}){const t=x(o,d),[r,s]=a.useState(()=>t.get("size")),[c,i]=a.useState(()=>t.get("hoverable")),[n,p]=a.useState(()=>t.get("cover"));return a.useEffect(()=>t.subscribe(()=>{s(t.get("size")),i(t.get("hoverable")),p(t.get("cover"))}),[t]),e.jsxs(b,{entryId:o,schema:d,children:[e.jsx("div",{className:"cd-scene",children:e.jsxs("figure",{style:{margin:0},children:[e.jsxs("article",{className:"cd-card","data-size":r,"data-hoverable":c,children:[n==="on"&&e.jsx("div",{className:"cd-cover","aria-hidden":"true"}),e.jsxs("header",{className:"cd-head",children:[e.jsx("h3",{className:"cd-title",children:"设计周报 Design Weekly"}),e.jsx("a",{className:"cd-extra",href:"#more",onClick:l=>l.preventDefault(),children:"更多 More"})]}),e.jsx("div",{className:"cd-body",children:e.jsx("p",{children:"本周聚焦卡片容器的层级表达:outlined 形态靠 1px 边框划界,浮起形态靠阴影升档——两者是同一层级的两种说法。"})}),e.jsxs("footer",{className:"cd-actions",children:[e.jsx("button",{type:"button",children:"赞 128"}),e.jsx("button",{type:"button",children:"评论 32"}),e.jsx("button",{type:"button",children:"分享"})]})]}),e.jsxs("figcaption",{className:"cd-note",children:[c==="on"?"hoverable:整卡浮起(阴影升档 + 2px 上移)":"静态卡:hoverable=off(antd 默认)"," ·",n==="on"?" 封面色带开启":" 无封面"," · ",r==="sm"?"紧凑 sm":"标准 md"]})]})}),e.jsx("style",{children:f})]})}export{v as default};
