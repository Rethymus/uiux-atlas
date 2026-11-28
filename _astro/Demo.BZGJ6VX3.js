import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as A}from"./color.DuEPkvq5.js";import{D as F}from"./DemoStage.vW1CgYCd.js";const x=[{key:"rename",zh:"重命名",en:"Rename"},{key:"move",zh:"移动到…",en:"Move to…"},{key:"copy",zh:"复制链接",en:"Copy link"},{key:"delete",zh:"删除",en:"Delete",danger:!0,dividerBefore:!0}],O=100,B=`
.dd-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.dd-frame {
  width: min(560px, 100%);
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  padding: 18px 20px 16px;
  animation: dd-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.dd-row { display: flex; align-items: center; gap: 12px; }
.dd-file-icon {
  width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
  background: #e6f4ff; color: #1677ff;
  display: flex; align-items: center; justify-content: center; font-size: 15px;
}
.dd-file-meta { min-width: 0; flex: 1; }
.dd-file-name { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dd-file-sub { font-size: 12px; color: rgba(0, 0, 0, 0.45); margin-top: 2px; }
.dd-anchor { position: relative; display: inline-block; flex-shrink: 0; }
.dd-btn {
  display: inline-flex; align-items: center; gap: 6px;
  height: 32px; padding: 0 14px; /* antd controlHeight 32(§2.2) */
  border: 1px solid #d9d9d9; border-radius: 6px; background: #fff;
  font-size: 14px; font-family: inherit; color: inherit; cursor: pointer;
}
.dd-btn:hover { color: #1677ff; border-color: #1677ff; }
.dd-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.dd-btn[aria-expanded="true"] { color: #1677ff; border-color: #1677ff; background: #e6f4ff; }
.dd-caret {
  width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent;
  border-top: 5px solid currentColor; opacity: 0.55;
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.dd-btn[aria-expanded="true"] .dd-caret { transform: rotate(180deg); }
.dd-menu {
  position: absolute; z-index: 1000; /* antd zIndexPopupBase(§2.2) */
  min-width: 168px; margin: 0; padding: 4px; list-style: none;
  background: #fff; border-radius: 8px; /* colorBgElevated + borderRadiusLG */
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  visibility: hidden; opacity: 0;
}
.dd-anchor[data-placement="bottomLeft"] .dd-menu { top: calc(100% + 8px); left: 0; }
.dd-anchor[data-placement="bottomRight"] .dd-menu { top: calc(100% + 8px); right: 0; }
.dd-anchor[data-placement="topLeft"] .dd-menu { bottom: calc(100% + 8px); left: 0; }
.dd-anchor[data-placement="topRight"] .dd-menu { bottom: calc(100% + 8px); right: 0; }
.dd-anchor[data-placement^="bottom"] .dd-menu { transform: translateY(-4px); }
.dd-anchor[data-placement^="top"] .dd-menu { transform: translateY(4px); }
.dd-menu[data-open] { visibility: visible; opacity: 1; transform: none; }
.dd-menu[data-open] {
  transition: opacity 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.dd-item {
  display: block; width: 100%; text-align: left; padding: 7px 12px;
  font-size: 14px; font-family: inherit; color: inherit;
  background: transparent; border: 0; border-radius: 6px; cursor: pointer;
}
.dd-item:hover { background: rgba(0, 0, 0, 0.04); } /* 4% 中性填充(FillTertiary 分档) */
.dd-item:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; background: rgba(0, 0, 0, 0.04); }
.dd-item[data-danger="true"] { color: #ff4d4f; } /* antd colorError(§2.2) */
.dd-sep { height: 1px; margin: 4px 8px; background: #f0f0f0; }
.dd-arrow {
  position: absolute; width: 10px; height: 10px; background: #fff;
  box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.04);
}
.dd-anchor[data-placement^="bottom"] .dd-arrow { top: -5px; transform: rotate(45deg); }
.dd-anchor[data-placement="bottomLeft"] .dd-arrow { left: 20px; }
.dd-anchor[data-placement="bottomRight"] .dd-arrow { right: 20px; }
.dd-anchor[data-placement^="top"] .dd-arrow { bottom: -5px; transform: rotate(225deg); }
.dd-anchor[data-placement="topLeft"] .dd-arrow { left: 20px; }
.dd-anchor[data-placement="topRight"] .dd-arrow { right: 20px; }
.dd-menu[data-arrow="off"] .dd-arrow { display: none; }
.dd-status {
  margin-top: 14px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(0, 0, 0, 0.65);
  background: #e6f4ff; border-radius: 999px; padding: 3px 12px;
}
.dd-status strong { color: #1677ff; font-weight: 600; }
@keyframes dd-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .dd-frame { animation: none; }
  .dd-menu, .dd-caret { transition: none; }
}
`;function I({entryId:g,schema:h}){const o=A(g,h),[p,E]=r.useState(()=>o.get("trigger")),[z,N]=r.useState(()=>o.get("placement")),[b,R]=r.useState(()=>o.get("arrow")),[d,s]=r.useState(!1),[w,y]=r.useState(!1),[k,D]=r.useState(""),c=r.useRef(null),f=r.useRef(null),v=r.useRef(null),m=r.useRef({});r.useEffect(()=>o.subscribe(()=>{E(o.get("trigger")),N(o.get("placement")),R(o.get("arrow"))}),[o]);const l=()=>{c.current!==null&&(window.clearTimeout(c.current),c.current=null)},u=(e=!1)=>{l(),y(e),s(!0)},L=()=>{l(),c.current=window.setTimeout(()=>s(!1),O)},i=(e=!1)=>{l(),s(!1),e&&v.current?.focus()};r.useEffect(()=>{l(),s(!1)},[p]),r.useEffect(()=>{d&&w&&(y(!1),m.current[x[0].key]?.focus())},[d,w]),r.useEffect(()=>{if(!d)return;const e=n=>{f.current&&!f.current.contains(n.target)&&i()};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[d]);const S=e=>{D(e.zh),i(!0)},T=e=>{p==="click"&&d?i():u(e.detail===0)},C=e=>{const n=x.map(M=>M.key),j=n.indexOf(document.activeElement?.getAttribute("data-dd-key")??"");let a=-1;e.key==="ArrowDown"?a=(j+1)%n.length:e.key==="ArrowUp"?a=(j-1+n.length)%n.length:e.key==="Home"?a=0:e.key==="End"&&(a=n.length-1),a>=0&&(e.preventDefault(),m.current[n[a]]?.focus())};return t.jsxs(F,{entryId:g,schema:h,children:[t.jsx("div",{className:"dd-scene",children:t.jsxs("div",{className:"dd-frame",children:[t.jsxs("div",{className:"dd-row",children:[t.jsx("span",{className:"dd-file-icon","aria-hidden":"true",children:"PDF"}),t.jsxs("div",{className:"dd-file-meta",children:[t.jsx("div",{className:"dd-file-name",children:"Q4 季度报告.pdf"}),t.jsx("div",{className:"dd-file-sub",children:"2.4 MB · 2026-11-18 更新 Updated"})]}),t.jsxs("div",{ref:f,className:"dd-anchor","data-placement":z,onKeyDown:e=>{e.key==="Escape"?i(!0):e.key==="Tab"&&d&&i(!1)},...p==="hover"?{onMouseEnter:()=>u(),onMouseLeave:L}:{},children:[t.jsxs("button",{ref:v,type:"button",className:"dd-btn","aria-haspopup":"menu","aria-expanded":d,"aria-controls":"dd-menu",onClick:T,children:["更多操作 More",t.jsx("span",{className:"dd-caret","aria-hidden":"true"})]}),t.jsxs("ul",{role:"menu",id:"dd-menu","aria-label":"更多操作 More actions",className:"dd-menu","data-open":d?"":void 0,"data-arrow":b,onKeyDown:C,children:[b==="on"&&t.jsx("li",{role:"presentation","aria-hidden":"true",children:t.jsx("span",{className:"dd-arrow"})}),x.map(e=>t.jsxs(r.Fragment,{children:[e.dividerBefore&&t.jsx("li",{role:"separator",className:"dd-sep"}),t.jsx("li",{role:"none",children:t.jsx("button",{ref:n=>{m.current[e.key]=n},type:"button",role:"menuitem",tabIndex:-1,className:"dd-item","data-dd-key":e.key,"data-danger":e.danger?"true":void 0,title:e.en,onClick:()=>S(e),children:e.zh})})]},e.key))]})]})]}),t.jsx("span",{className:"dd-status",children:k?t.jsxs(t.Fragment,{children:["最近操作 Last action:",t.jsx("strong",{children:k})]}):t.jsx(t.Fragment,{children:"悬停或点按「更多操作」展开命令列表(↑↓ 漫游,Esc 关闭)Hover/press “More”, ↑↓ rove, Esc closes"})})]})}),t.jsx("style",{children:B})]})}export{I as default};
