import{j as o}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as k}from"./color.DuEPkvq5.js";import{D as T}from"./DemoStage.vW1CgYCd.js";const _=`
.tag-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 8px 12px;
}
.tag-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 460px;
}
/* 标签基座:fontSizeSM 12 / borderRadiusSM 4 / colorBorder #d9d9d9;
   高度与内边距为 demo 取值(22px / 0 7px,antd 源码档位未逐一核对) */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tag-scene[data-bordered="off"] .tag { border-color: transparent; }
.tag-closing { opacity: 0; transform: scale(0.85); }
/* 五色:Bg=阶1 / Border=阶3 / Text=阶9(@ant-design/colors 8.0.1 presets 官方阶值) */
.tag-red    { background: #fff1f0; border-color: #ffccc7; color: #820014; }
.tag-orange { background: #fff7e6; border-color: #ffd591; color: #873800; }
.tag-green  { background: #f6ffed; border-color: #b7eb8f; color: #135200; }
.tag-blue   { background: #e6f4ff; border-color: #91caff; color: #002c8c; }
/* 灰 = 无 color 默认形态:白底叠 2% 中性填充 / colorBorder / colorText 88% */
.tag-gray   { background: #fafafa; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
/* 关闭按钮:必须带可访问名;颜色随标签文字(inherit) */
.tag-x {
  border: 0;
  background: none;
  padding: 0 0 0 2px;
  margin: 0 -1px 0 0;
  font-size: 13px;
  line-height: 1;
  color: inherit;
  opacity: 0.65;
  cursor: pointer;
  border-radius: 2px;
}
.tag-x:hover { opacity: 1; }
.tag-x:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; opacity: 1; }
/* 五色对照(静态小样) */
.tag-legend { gap: 8px; opacity: 0.92; }
.tag-legend-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-right: 2px;
}
/* 恢复入口:常驻渲染(禁用态),避免删除后焦点掉到 body */
.tag-reset {
  border: 1px solid #d9d9d9;
  background: #fff;
  border-radius: 4px;
  height: 24px;
  padding: 0 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}
.tag-reset:hover:not(:disabled) { border-color: #1677ff; color: #1677ff; }
.tag-reset:disabled { color: rgba(0, 0, 0, 0.25); border-color: #d9d9d9; cursor: not-allowed; }
.tag-reset:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.tag-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  overflow-wrap: anywhere;
}
@media (prefers-reduced-motion: reduce) {
  .tag { transition: none; }
}
`,a=[{id:"todo",zh:"待办",en:"Todo"},{id:"doing",zh:"进行中",en:"Doing"},{id:"review",zh:"评审中",en:"Review"},{id:"done",zh:"已完成",en:"Done"}],C=[{color:"red",zh:"红",en:"Red"},{color:"orange",zh:"橙",en:"Orange"},{color:"green",zh:"绿",en:"Green"},{color:"blue",zh:"蓝",en:"Blue"},{color:"gray",zh:"灰",en:"Gray"}];function G({entryId:i,schema:d}){const t=k(i,d),[g,y]=r.useState(()=>t.get("color")),[f,z]=r.useState(()=>t.get("closable")),[p,v]=r.useState(()=>t.get("bordered")),[n,u]=r.useState(()=>a.map(e=>e.id)),[b,x]=r.useState(null),m=r.useRef(void 0),s=r.useRef(null),h=r.useRef(new Map),w=r.useRef(null);r.useEffect(()=>{const e=t.subscribe(()=>{y(t.get("color")),z(t.get("closable")),v(t.get("bordered"))});return()=>{e(),window.clearTimeout(m.current)}},[t]),r.useEffect(()=>{if(!s.current)return;const e=s.current;s.current=null,e==="__reset__"?w.current?.focus():h.current.get(e)?.focus()},[n]);const j=e=>{if(b)return;const l=n.indexOf(e),c=n.filter(N=>N!==e),S=c[Math.min(l,c.length-1)];s.current=S??"__reset__",x(e),m.current=window.setTimeout(()=>{x(null),u(c)},180)},R=()=>u(a.map(e=>e.id));return o.jsxs(T,{entryId:i,schema:d,children:[o.jsxs("div",{className:"tag-scene","data-bordered":p,children:[o.jsxs("div",{className:"tag-row",role:"list","aria-label":"可关闭标签组 Closable tag group",children:[a.map(e=>n.includes(e.id)?o.jsxs("span",{className:`tag tag-${g} ${b===e.id?"tag-closing":""}`,role:"listitem",children:[e.zh," ",e.en,f==="on"?o.jsx("button",{type:"button",className:"tag-x","aria-label":`移除标签 ${e.zh} ${e.en} — Remove tag`,ref:l=>{h.current.set(e.id,l)},onClick:()=>j(e.id),children:"✕"}):null]},e.id):null),o.jsx("button",{type:"button",className:"tag-reset",disabled:n.length===a.length,ref:w,onClick:R,children:"恢复全部 Restore"})]}),o.jsxs("div",{className:"tag-row tag-legend",children:[o.jsx("span",{className:"tag-legend-label",children:"五色对照 Palette:"}),C.map(e=>o.jsxs("span",{className:`tag tag-${e.color}`,children:[e.zh," ",e.en]},e.color))]}),o.jsxs("div",{className:"tag-readout","aria-live":"polite",children:["color=",g," · closable=",f," · bordered=",p," · remaining=",n.length,"/",a.length]})]}),o.jsx("style",{children:_})]})}export{G as default};
