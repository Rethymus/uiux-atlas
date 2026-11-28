import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as j}from"./color.DuEPkvq5.js";import{D as v}from"./DemoStage.vW1CgYCd.js";const z=`
.demo-stage { --drawer-thickness: 378px; }
.drw-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
}
.drw-trigger {
  border: 1px solid #d9d9d9; border-radius: 6px; padding: 8px 18px;
  font-size: 13px; cursor: pointer; background: #fff; color: rgba(0, 0, 0, 0.88);
}
.drw-trigger:hover { color: #1677ff; border-color: #1677ff; }
.drw-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
.drw-mask {
  position: absolute; inset: 0; z-index: 30;
  background: rgba(0, 0, 0, 0.45); /* antd colorBgMask */
  opacity: 0; pointer-events: none;
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.drw-mask.is-open { opacity: 1; pointer-events: auto; }
.drw-panel {
  position: absolute; z-index: 31;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05);
  display: flex; flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  outline: none;
}
.drw-panel[data-placement="right"] { top: 0; right: 0; bottom: 0; width: var(--drawer-thickness); transform: translateX(100%); }
.drw-panel[data-placement="left"] { top: 0; left: 0; bottom: 0; width: var(--drawer-thickness); transform: translateX(-100%); }
.drw-panel[data-placement="top"] { left: 0; right: 0; top: 0; height: var(--drawer-thickness); transform: translateY(-100%); }
.drw-panel[data-placement="bottom"] { left: 0; right: 0; bottom: 0; height: var(--drawer-thickness); transform: translateY(100%); }
.drw-panel[data-placement="right"].is-open,
.drw-panel[data-placement="left"].is-open,
.drw-panel[data-placement="top"].is-open,
.drw-panel[data-placement="bottom"].is-open { transform: translate(0, 0); }
.drw-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #f0f0f0; }
.drw-head h3 { margin: 0; font-size: 15px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.drw-x { border: 0; background: transparent; padding: 2px 6px; cursor: pointer; font-size: 17px; line-height: 1; color: rgba(0, 0, 0, 0.45); }
.drw-x:hover { color: rgba(0, 0, 0, 0.88); }
.drw-body { flex: 1; overflow: auto; padding: 16px 20px; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); }
.drw-body strong { color: rgba(0, 0, 0, 0.88); }
@media (prefers-reduced-motion: reduce) {
  .drw-panel { transition: none; }
  .drw-mask { transition: none; }
}
`;function R({entryId:p,schema:f}){const n=j(p,f),[u,b]=a.useState(()=>n.get("placement")),[r,w]=a.useState(()=>n.get("mask")==="on"),[s,m]=a.useState(!1),g=a.useRef(null),i=a.useRef(null);a.useEffect(()=>n.subscribe(()=>{b(n.get("placement")),w(n.get("mask")==="on")}),[n]),a.useEffect(()=>{s&&i.current?.focus()},[s]);const l=()=>{m(!1),g.current?.focus()},k=t=>{if(t.key==="Escape"){t.stopPropagation(),l();return}if(t.key!=="Tab"||!r)return;const d=i.current;if(!d)return;const o=Array.from(d.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(y=>!y.hasAttribute("disabled"));if(o.length===0){t.preventDefault();return}const h=o[0],x=o[o.length-1],c=document.activeElement;t.shiftKey&&(c===h||c===d)?(t.preventDefault(),x.focus()):!t.shiftKey&&c===x&&(t.preventDefault(),h.focus())};return e.jsxs(v,{entryId:p,schema:f,children:[e.jsxs("div",{className:"drw-page",children:[e.jsx("button",{ref:g,type:"button",className:"drw-trigger",onClick:()=>m(!0),children:"打开抽屉 Open drawer"}),e.jsxs("p",{className:"drw-hint",children:["Esc 关闭 · ",r?"带遮罩(模态)":"无遮罩(页面仍可交互)"," ·"," ",r?"masked (modal)":"no mask (page stays interactive)"]})]}),r&&e.jsx("div",{className:s?"drw-mask is-open":"drw-mask",onClick:l,"aria-hidden":"true"}),e.jsxs("div",{ref:i,className:s?"drw-panel is-open":"drw-panel","data-placement":u,role:"dialog","aria-modal":r?"true":"false","aria-labelledby":"drw-title",tabIndex:-1,onKeyDown:k,children:[e.jsxs("div",{className:"drw-head",children:[e.jsx("h3",{id:"drw-title",children:"编辑详情 Edit details"}),e.jsx("button",{type:"button",className:"drw-x","aria-label":"关闭 Close",onClick:l,children:"×"})]}),e.jsxs("div",{className:"drw-body",children:[e.jsxs("p",{children:["抽屉在不离开当前页的前提下承载子任务:",e.jsx("strong",{children:"placement"})," 决定滑入边缘,",e.jsx("strong",{children:"thickness"})," 在左右抽屉上是宽度、上下抽屉上是高度。 The drawer hosts subtasks in place: ",e.jsx("strong",{children:"placement"})," picks the edge, while",e.jsx("strong",{children:" thickness"})," is width for left/right and height for top/bottom."]}),e.jsxs("p",{children:[r?"遮罩开启时为模态:Tab 困焦在面板内。":"遮罩关闭时为非模态:可以边看抽屉边操作页面。"," ",r?"Modal: focus is trapped inside.":"Non-modal: interact with the page freely."]})]})]}),e.jsx("style",{children:z})]})}export{R as default};
