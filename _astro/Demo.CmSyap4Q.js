import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as R}from"./color.DuEPkvq5.js";import{D as T}from"./DemoStage.vW1CgYCd.js";const $=[{key:"home",zh:"首页",en:"Home"},{key:"product",zh:"产品",en:"Products",children:[{zh:"产品矩阵",en:"Product suite"},{zh:"解决方案",en:"Solutions"},{zh:"定价",en:"Pricing"}]},{key:"docs",zh:"文档",en:"Docs",children:[{zh:"快速开始",en:"Quick start"},{zh:"组件文档",en:"Components"},{zh:"API 参考",en:"API reference"}]},{key:"community",zh:"社区",en:"Community"}],w=[{zh:"个人中心",en:"Profile"},{zh:"我的草稿",en:"My drafts"},{zh:"消息通知",en:"Notifications",dividerAfter:!0},{zh:"退出登录",en:"Sign out"}],M=100,L=`
.nv-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.nv-frame {
  position: relative;
  width: min(700px, 100%);
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0;  /* colorBorderSecondary */
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05); /* boxShadow token */
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "logo list avatar" "main main main";
  grid-template-rows: 52px auto;
  overflow: visible;
  animation: nv-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.nv-scene[data-theme="dark"] .nv-frame {
  background: #1d1d1d; /* antd dark 算法 colorBgElevated(§2.4) */
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.88);
}
.nv-scene[data-mode="vertical"] .nv-frame {
  grid-template-areas: "logo . avatar" "list main main";
  grid-template-rows: 52px minmax(200px, auto);
}
.nv-logo { grid-area: logo; display: flex; align-items: center; gap: 8px; padding: 0 16px; font-weight: 650; font-size: 14px; }
.nv-logo-dot { width: 18px; height: 18px; border-radius: 6px; background: #1677ff; } /* colorPrimary + borderRadius seed */
.nv-list { grid-area: list; list-style: none; margin: 0; padding: 0 8px; display: flex; align-items: center; gap: 4px; min-width: 0; }
.nv-scene[data-mode="vertical"] .nv-list {
  flex-direction: column; align-items: stretch; gap: 2px;
  padding: 12px 8px; border-right: 1px solid #f0f0f0;
}
.nv-scene[data-theme="dark"] .nv-scene-list-border,
.nv-scene[data-theme="dark"][data-mode="vertical"] .nv-list { border-right-color: rgba(255, 255, 255, 0.1); }
.nv-item { position: relative; }
.nv-link {
  display: flex; align-items: center; gap: 5px; width: 100%;
  height: 36px; padding: 0 14px; border: 0; border-radius: 6px;
  font-size: 14px; font-family: inherit; color: inherit; text-decoration: none;
  cursor: pointer; background: transparent; white-space: nowrap;
}
.nv-link:hover { background: rgba(0, 0, 0, 0.04); } /* 4% 中性填充(§2.3-⑤) */
.nv-scene[data-theme="dark"] .nv-link:hover { background: rgba(255, 255, 255, 0.08); }
.nv-link[data-active="true"] { color: #1677ff; background: #e6f4ff; } /* blue-1(§1.2) */
.nv-scene[data-theme="dark"] .nv-link[data-active="true"] { color: #fff; background: #1677ff; }
.nv-caret {
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-top: 5px solid currentColor; opacity: 0.55;
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.nv-link[aria-expanded="true"] .nv-caret { transform: rotate(180deg); }
.nv-right { grid-area: avatar; position: relative; display: flex; align-items: center; padding: 0 16px; }
.nv-avatar {
  width: 28px; height: 28px; border-radius: 999px; border: 0; cursor: pointer;
  background: #1677ff; color: #fff; font-size: 13px; font-family: inherit;
  display: flex; align-items: center; justify-content: center; padding: 0;
}
.nv-avatar:focus-visible, .nv-link:focus-visible, .nv-menu-item:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.nv-menu {
  position: absolute; top: calc(100% + 6px); left: 0; min-width: 168px;
  margin: 0; padding: 4px; list-style: none;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 8px; /* borderRadiusLG */
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  z-index: 1000; /* zIndexPopupBase(§2.2) */
  visibility: hidden; opacity: 0; transform: translateY(-4px);
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), visibility 0s linear 0.2s;
}
.nv-menu[data-open] {
  visibility: visible; opacity: 1; transform: none;
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.nv-scene[data-mode="vertical"] .nv-item .nv-menu:not(.nv-menu-user) { top: -4px; left: calc(100% + 6px); transform: translateX(-4px); }
.nv-scene[data-mode="vertical"] .nv-item .nv-menu:not(.nv-menu-user)[data-open] { transform: none; }
.nv-menu-user { left: auto; right: 0; top: calc(100% + 10px); }
.nv-menu-item {
  display: block; width: 100%; text-align: left; padding: 7px 12px;
  font-size: 14px; font-family: inherit; color: inherit;
  background: transparent; border: 0; border-radius: 6px; cursor: pointer;
}
.nv-menu-item:hover { background: rgba(0, 0, 0, 0.04); }
.nv-scene[data-theme="dark"] .nv-menu { background: #262626; border-color: rgba(255, 255, 255, 0.12); }
.nv-scene[data-theme="dark"] .nv-menu-item:hover { background: rgba(255, 255, 255, 0.08); }
.nv-divider { height: 1px; margin: 4px 8px; background: #f0f0f0; }
.nv-scene[data-theme="dark"] .nv-divider { background: rgba(255, 255, 255, 0.12); }
.nv-body { grid-area: main; padding: 16px 20px 14px; }
.nv-body h4 { margin: 0 0 10px; font-size: 15px; font-weight: 650; }
.nv-skel { height: 10px; border-radius: 5px; background: #f0f0f0; margin-bottom: 8px; }
.nv-scene[data-theme="dark"] .nv-skel { background: rgba(255, 255, 255, 0.08); }
.nv-skel:last-of-type { width: 62%; }
.nv-status {
  margin-top: 12px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(0, 0, 0, 0.65);
  background: #e6f4ff; border-radius: 999px; padding: 3px 12px;
}
.nv-scene[data-theme="dark"] .nv-status { color: rgba(255, 255, 255, 0.75); background: rgba(255, 255, 255, 0.08); }
.nv-status strong { color: #1677ff; font-weight: 600; }
@keyframes nv-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .nv-frame { animation: none; }
  .nv-menu, .nv-caret { transition: none; }
}
@media (max-width: 520px) {
  .nv-logo { padding: 0 10px; }
  .nv-logo-text { display: none; }
  .nv-link { padding: 0 10px; }
  .nv-right { padding: 0 10px; }
}
`;function F({entryId:h,schema:b}){const a=R(h,b),[k,N]=t.useState(()=>a.get("mode")),[E,S]=t.useState(()=>a.get("theme")),[v,D]=t.useState(()=>a.get("trigger")),[i,s]=t.useState(null),[y,A]=t.useState(""),d=t.useRef(null),x=t.useRef({}),l=t.useRef(null);t.useEffect(()=>a.subscribe(()=>{N(a.get("mode")),S(a.get("theme")),D(a.get("trigger"))}),[a]);const c=()=>{d.current!==null&&(window.clearTimeout(d.current),d.current=null)},g=e=>{c(),s(e)},P=e=>{c(),d.current=window.setTimeout(()=>{s(r=>r===e?null:r)},M)},p=(e=!1)=>{c(),s(r=>(e&&r&&x.current[r]?.focus(),null))};t.useEffect(()=>{c(),s(null)},[v]),t.useEffect(()=>{if(!i)return;const e=r=>{l.current&&!l.current.contains(r.target)&&p()};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[i]);const f=e=>{A(e),p()},z=e=>v==="click"&&i===e?p():g(e),u=e=>v==="hover"?{onMouseEnter:()=>g(e),onMouseLeave:()=>P(e)}:{},j=(e,r)=>{const m=r.indexOf(document.activeElement?.getAttribute("data-mi-key")??"");let o=-1;e.key==="ArrowDown"?o=(m+1)%r.length:e.key==="ArrowUp"?o=(m-1+r.length)%r.length:e.key==="Home"?o=0:e.key==="End"&&(o=r.length-1),o>=0&&(e.preventDefault(),(l.current?.querySelector(`[data-mi-key="${r[o]}"]`)??null)?.focus())},C=e=>e.children&&n.jsx("ul",{role:"menu",id:`nv-menu-${e.key}`,"aria-label":e.zh,className:"nv-menu","data-open":i===e.key?"":void 0,...u(e.key),onKeyDown:r=>j(r,e.children.map(m=>`${e.key}:${m.zh}`)),children:e.children.map(r=>n.jsx("li",{role:"none",children:n.jsx("button",{type:"button",role:"menuitem",tabIndex:-1,className:"nv-menu-item","data-mi-key":`${e.key}:${r.zh}`,title:r.en,onClick:()=>f(r.zh),children:r.zh})},r.zh))});return n.jsxs(T,{entryId:h,schema:b,children:[n.jsx("div",{className:"nv-scene","data-mode":k,ref:l,children:n.jsxs("div",{className:"nv-frame","data-theme":E,onKeyDown:e=>{e.key==="Escape"&&p(!0)},children:[n.jsxs("div",{className:"nv-logo",children:[n.jsx("span",{className:"nv-logo-dot","aria-hidden":"true"}),n.jsx("span",{className:"nv-logo-text",children:"站点"})]}),n.jsx("ul",{className:"nv-list",role:"menubar","aria-label":"站点导航","aria-orientation":k==="vertical"?"vertical":void 0,children:$.map(e=>e.children?n.jsxs("li",{className:"nv-item",...u(e.key),children:[n.jsxs("button",{type:"button",ref:r=>{x.current[e.key]=r},className:"nv-link",role:"menuitem","aria-haspopup":"menu","aria-expanded":i===e.key,"aria-controls":`nv-menu-${e.key}`,onClick:()=>z(e.key),children:[e.zh,n.jsx("span",{className:"nv-caret","aria-hidden":"true"})]}),C(e)]},e.key):n.jsx("li",{className:"nv-item",children:n.jsx("a",{className:"nv-link",role:"menuitem","data-active":e.key==="home"?"true":void 0,href:"#",title:e.en,onClick:r=>{r.preventDefault(),f(e.zh)},children:e.zh})},e.key))}),n.jsxs("div",{className:"nv-right",...u("user"),children:[n.jsx("button",{type:"button",ref:e=>{x.current.user=e},className:"nv-avatar","aria-haspopup":"menu","aria-expanded":i==="user","aria-controls":"nv-menu-user","aria-label":"个人中心",title:"个人中心 Personal center",onClick:()=>z("user"),children:n.jsx("span",{"aria-hidden":"true",children:"友"})}),n.jsx("ul",{role:"menu",id:"nv-menu-user","aria-label":"个人中心",className:"nv-menu nv-menu-user","data-open":i==="user"?"":void 0,...u("user"),onKeyDown:e=>j(e,w.filter(r=>!r.dividerAfter).map(r=>`user:${r.zh}`)),children:w.map(e=>n.jsxs(t.Fragment,{children:[n.jsx("li",{role:"none",children:n.jsx("button",{type:"button",role:"menuitem",tabIndex:-1,className:"nv-menu-item","data-mi-key":`user:${e.zh}`,title:e.en,onClick:()=>f(e.zh),children:e.zh})}),e.dividerAfter&&n.jsx("li",{role:"separator","aria-orientation":"horizontal",className:"nv-divider"})]},e.zh))})]}),n.jsxs("div",{className:"nv-body",children:[n.jsx("h4",{children:"页面标题 Page title"}),n.jsx("div",{className:"nv-skel"}),n.jsx("div",{className:"nv-skel"}),n.jsx("div",{className:"nv-skel"}),n.jsx("span",{className:"nv-status",children:y?n.jsxs(n.Fragment,{children:["最近操作 Last action:",n.jsx("strong",{children:y})]}):n.jsx(n.Fragment,{children:"悬停「产品 / 文档」或右侧头像查看二级聚合 Hover “Products / Docs” or the avatar"})})]})]})}),n.jsx("style",{children:L})]})}export{F as default};
