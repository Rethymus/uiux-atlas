import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as C}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const u=[{zh:"首页",en:"Home"},{zh:"资源",en:"Resources"},{zh:"组件",en:"Components"},{zh:"导航",en:"Navigation"},{zh:"面包屑",en:"Breadcrumb"}],E=`
.bc-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.bc-frame {
  width: min(640px, 100%);
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  overflow: hidden;
  animation: bc-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.bc-trail { padding: 14px 18px; border-bottom: 1px solid #f0f0f0; }
.bc-trail ol { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 4px; margin: 0; padding: 0; list-style: none; }
.bc-crumb {
  border: 0; background: none; cursor: pointer; font-family: inherit;
  font-size: 14px; padding: 2px 8px; border-radius: 6px; text-decoration: none;
  color: rgba(0, 0, 0, 0.65); /* colorTextSecondary 65%(§2.3-⑤) */
  transition: color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), background-color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.bc-crumb:hover { color: #1677ff; background: rgba(0, 0, 0, 0.04); } /* 主色 + 4% 中性填充 */
.bc-crumb:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.bc-current { font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.88); padding: 2px 8px; }
.bc-sep { color: rgba(0, 0, 0, 0.45); font-size: 13px; user-select: none; }
.bc-expander {
  border: 1px solid #d9d9d9; background: #fff; border-radius: 6px;
  font-family: inherit; font-size: 14px; letter-spacing: 2px;
  padding: 1px 10px; cursor: pointer; color: rgba(0, 0, 0, 0.65); line-height: 1.5;
}
.bc-expander:hover { color: #1677ff; border-color: #1677ff; }
.bc-expander:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.bc-collapse {
  border: 0; background: #e6f4ff; color: #1677ff; border-radius: 999px;
  font-family: inherit; font-size: 12px; padding: 2px 10px; cursor: pointer;
}
.bc-collapse:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.bc-body { padding: 16px 18px 14px; }
.bc-body h4 { margin: 0 0 10px; font-size: 15px; font-weight: 650; }
.bc-skel { height: 10px; border-radius: 5px; background: #f0f0f0; margin-bottom: 8px; }
.bc-skel:last-of-type { width: 58%; }
.bc-hint {
  margin-top: 12px; display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(0, 0, 0, 0.65);
  background: #e6f4ff; border-radius: 999px; padding: 3px 12px;
}
@keyframes bc-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .bc-frame { animation: none; }
  .bc-crumb { transition: none; }
}
`;function R({entryId:l,schema:d}){const t=C(l,d),[a,h]=s.useState(()=>t.get("separator")),[p,g]=s.useState(()=>t.get("maxItems")),[j,y]=s.useState(u.length),[x,o]=s.useState(!1),k=s.useRef(null);s.useEffect(()=>t.subscribe(()=>{h(t.get("separator")),g(t.get("maxItems"))}),[t]);const r=u.slice(0,j),z=!x&&r.length>p,i=r.length-2,b=n=>{y(n+1),o(!1)},N=()=>z?e.jsxs(e.Fragment,{children:[e.jsx("li",{children:e.jsx("button",{type:"button",className:"bc-crumb",title:r[0].en,onClick:()=>b(0),children:r[0].zh})}),e.jsx("li",{className:"bc-sep","aria-hidden":"true",children:a}),e.jsx("li",{children:e.jsx("button",{type:"button",className:"bc-expander","aria-expanded":"false","aria-label":`展开被折叠的 ${i} 个层级 Expand ${i} collapsed levels`,title:`展开被折叠的 ${i} 个层级`,onClick:()=>o(!0),children:"…"})}),e.jsx("li",{className:"bc-sep","aria-hidden":"true",children:a}),e.jsx("li",{className:"bc-current","aria-current":"page",title:r[r.length-1].en,children:r[r.length-1].zh})]}):e.jsxs(e.Fragment,{children:[r.map((n,c)=>{const m=c===r.length-1,v=m?e.jsx("span",{className:"bc-current","aria-current":"page",title:n.en,children:n.zh}):e.jsx("button",{type:"button",className:"bc-crumb",title:n.en,onClick:()=>b(c),children:n.zh}),w=e.jsx("li",{className:"bc-sep","aria-hidden":"true",children:a});return e.jsxs(s.Fragment,{children:[e.jsx("li",{children:v}),!m&&w]},`${n.zh}-${c}`)}),x&&r.length>p&&e.jsx("li",{children:e.jsx("button",{type:"button",className:"bc-collapse","aria-expanded":"true","aria-label":"收起展开的层级 Collapse expanded levels",onClick:()=>o(!1),children:"收起 ↑"})})]}),f=r[r.length-1];return e.jsxs(S,{entryId:l,schema:d,children:[e.jsx("div",{className:"bc-scene",ref:k,children:e.jsxs("div",{className:"bc-frame",children:[e.jsx("nav",{className:"bc-trail","aria-label":"面包屑 Breadcrumb",children:e.jsx("ol",{children:N()})}),e.jsxs("div",{className:"bc-body",children:[e.jsxs("h4",{children:[f.zh," · ",f.en]}),e.jsx("div",{className:"bc-skel"}),e.jsx("div",{className:"bc-skel"}),e.jsx("div",{className:"bc-skel"}),e.jsx("span",{className:"bc-hint",children:"点击上层任意节点回退 · 调面板 maxItems 看折叠 Click any ancestor to backtrack · try maxItems"})]})]})}),e.jsx("style",{children:E})]})}export{R as default};
