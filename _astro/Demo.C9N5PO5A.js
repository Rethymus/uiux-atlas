import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const v=[{id:"save",label:"保存 Save",tip:"保存到草稿箱 Saves to drafts · ⌘S"},{id:"share",label:"分享 Share",tip:"生成只读链接 Creates a read-only link"},{id:"del",label:"删除 Delete",tip:"移入回收站 Moves to trash · 不可恢复 Irreversible"}],y=`
.ttp-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
}
.ttp-row { display: flex; gap: 14px; }
.ttp-wrap { position: relative; display: inline-flex; }
.ttp-btn {
  border: 1px solid #d9d9d9; border-radius: 6px; padding: 7px 14px;
  font-size: 13px; cursor: pointer; background: #fff; color: rgba(0, 0, 0, 0.88);
}
.ttp-btn:hover, .ttp-btn:focus-visible { color: #1677ff; border-color: #1677ff; }
.ttp-pop {
  position: absolute; z-index: 40;
  padding: 6px 10px; border-radius: 4px;
  font-size: 12px; line-height: 1.5; white-space: nowrap;
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: opacity 0.1s cubic-bezier(0.215, 0.61, 0.355, 1), visibility 0s linear 0.1s;
}
.ttp-pop.is-shown {
  opacity: 1; visibility: visible;
  transition: opacity 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.ttp-pop[data-theme="dark"] { background: rgba(0, 0, 0, 0.85); color: #fff; }
.ttp-pop[data-theme="light"] {
  background: #fff; color: rgba(0, 0, 0, 0.88); border: 1px solid #d9d9d9;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05), 0 1px 6px -1px rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03);
}
.ttp-pop[data-placement="top"] { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.ttp-pop[data-placement="bottom"] { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.ttp-pop[data-placement="left"] { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.ttp-pop[data-placement="right"] { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
/* 箭头:45° 旋转小方块,background:inherit 随主题;浅色主题隐藏埋入侧描边防斜线 */
.ttp-pop[data-arrow="on"]::after {
  content: ""; position: absolute; width: 8px; height: 8px;
  transform: rotate(45deg); background: inherit;
}
.ttp-pop[data-arrow="on"][data-theme="light"]::after { border: 1px solid #d9d9d9; }
.ttp-pop[data-placement="top"][data-arrow="on"]::after { bottom: -4px; left: calc(50% - 4px); }
.ttp-pop[data-placement="top"][data-arrow="on"][data-theme="light"]::after { border-top: 0; border-left: 0; }
.ttp-pop[data-placement="bottom"][data-arrow="on"]::after { top: -4px; left: calc(50% - 4px); }
.ttp-pop[data-placement="bottom"][data-arrow="on"][data-theme="light"]::after { border-bottom: 0; border-right: 0; }
.ttp-pop[data-placement="left"][data-arrow="on"]::after { right: -4px; top: calc(50% - 4px); }
.ttp-pop[data-placement="left"][data-arrow="on"][data-theme="light"]::after { border-bottom: 0; border-left: 0; }
.ttp-pop[data-placement="right"][data-arrow="on"]::after { left: -4px; top: calc(50% - 4px); }
.ttp-pop[data-placement="right"][data-arrow="on"][data-theme="light"]::after { border-top: 0; border-right: 0; }
.ttp-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .ttp-pop { transition: none; }
}
`;function T({entryId:n,schema:i}){const a=g(n,i),[c,f]=e.useState(()=>a.get("placement")),[m,b]=e.useState(()=>a.get("theme")),[u,h]=e.useState(()=>a.get("arrow")==="on"),[s,l]=e.useState(null),o=e.useRef(null);e.useEffect(()=>a.subscribe(()=>{f(a.get("placement")),b(a.get("theme")),h(a.get("arrow")==="on")}),[a]);const d=e.useCallback(t=>{o.current!==null&&window.clearTimeout(o.current),o.current=window.setTimeout(()=>l(t),100)},[]),p=e.useCallback(()=>{o.current!==null&&(window.clearTimeout(o.current),o.current=null),l(null)},[]);return e.useEffect(()=>{const t=x=>{x.key==="Escape"&&p()};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t),o.current!==null&&window.clearTimeout(o.current)}},[p]),r.jsxs(w,{entryId:n,schema:i,children:[r.jsxs("div",{className:"ttp-page",children:[r.jsx("div",{className:"ttp-row",children:v.map(t=>r.jsxs("span",{className:"ttp-wrap",children:[r.jsx("button",{type:"button",className:"ttp-btn","aria-describedby":s===t.id?`ttp-${t.id}`:void 0,onMouseEnter:()=>d(t.id),onMouseLeave:p,onFocus:()=>d(t.id),onBlur:p,children:t.label}),r.jsx("span",{id:`ttp-${t.id}`,role:"tooltip",className:s===t.id?"ttp-pop is-shown":"ttp-pop","data-placement":c,"data-theme":m,"data-arrow":u?"on":"off",children:t.tip})]},t.id))}),r.jsx("p",{className:"ttp-hint",children:"hover 或 Tab 聚焦出提示,Esc 隐藏 · Hover or Tab to reveal, Esc hides"})]}),r.jsx("style",{children:y})]})}export{T as default};
