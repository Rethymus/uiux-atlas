import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as g}from"./DemoStage.vW1CgYCd.js";const j=`
.icon-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 8px 12px;
}
.icon-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(60px, 1fr));
  gap: 10px 8px;
  width: min(440px, 100%);
}
.icon-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 4px 8px;
  border-radius: 8px;
  min-width: 0;
}
.icon-tile:hover { background: rgba(0, 0, 0, 0.04); }
/* 尺寸与线宽经 CSS 变量注入(--icon-size/--icon-stroke-width);
   stroke-width 是 SVG 继承属性,设在 <svg> 上即可传导到全部子形状 */
.ic {
  width: var(--icon-size, 14px);
  height: var(--icon-size, 14px);
  stroke-width: var(--icon-stroke-width, 2);
  color: rgba(0, 0, 0, 0.88);
  flex: none;
  overflow: visible;
}
.icon-scene[data-icon-color="accent"] .ic { color: #1677ff; }
.icon-scene[data-icon-color="danger"] .ic { color: #ff4d4f; }
.icon-tile-label {
  font-size: 12px;
  line-height: 1.6667;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}
/* 行内用法:antd 图标注入 width/height=1em,与文字天然等高对齐 */
.icon-inline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
}
.icon-inline .ic { width: 1em; height: 1em; }
.icon-inline small { color: rgba(0, 0, 0, 0.45); font-size: 12px; }
.icon-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  overflow-wrap: anywhere;
}
`,o=[{name:"home",label:"首页 Home",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M3 11.5 12 4l9 7.5"}),e.jsx("path",{d:"M5 10v10h14V10"}),e.jsx("path",{d:"M10 20v-5h4v5"})]})},{name:"search",label:"搜索 Search",art:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"11",cy:"11",r:"7"}),e.jsx("path",{d:"m16.5 16.5 4.5 4.5"})]})},{name:"heart",label:"收藏 Heart",art:e.jsx("path",{d:"M12 20C8 17 4 13.6 4 9.8 4 7.2 6 5 8.6 5c1.4 0 2.7.6 3.4 1.7C12.7 5.6 14 5 15.4 5 18 5 20 7.2 20 9.8c0 3.8-4 7.2-8 10.2z"})},{name:"star",label:"星标 Star",art:e.jsx("polygon",{points:"12,3.5 14.6,8.9 20.5,9.6 16.2,13.7 17.3,19.5 12,16.6 6.7,19.5 7.8,13.7 3.5,9.6 9.4,8.9"})},{name:"bell",label:"通知 Bell",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18 9a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 15 18 9z"}),e.jsx("path",{d:"M10.3 20a2 2 0 0 0 3.4 0"})]})},{name:"trash",label:"删除 Trash",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 7h16"}),e.jsx("path",{d:"M9 7V5h6v2"}),e.jsx("path",{d:"m6.5 7 1 13h9l1-13"}),e.jsx("path",{d:"M10 11v6"}),e.jsx("path",{d:"M14 11v6"})]})},{name:"download",label:"下载 Download",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}),e.jsx("path",{d:"m7 10 5 5 5-5"}),e.jsx("path",{d:"M12 15V3"})]})},{name:"user",label:"用户 User",art:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"8",r:"4"}),e.jsx("path",{d:"M4.5 20.5c0-3.8 3.4-6 7.5-6s7.5 2.2 7.5 6"})]})},{name:"plus",label:"新建 Plus",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M12 5v14"}),e.jsx("path",{d:"M5 12h14"})]})},{name:"arrow-right",label:"前进 Arrow",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 12h15"}),e.jsx("path",{d:"m13 6 6 6-6 6"})]})}];function l({art:t}){return e.jsx("svg",{className:"ic",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:t})}function w({entryId:t,schema:s}){const a=m(t,s),[n,c]=i.useState(()=>a.get("color")),[d,h]=i.useState(()=>a.get("size")),[x,p]=i.useState(()=>a.get("strokeWidth"));return i.useEffect(()=>a.subscribe(()=>{c(a.get("color")),h(a.get("size")),p(a.get("strokeWidth"))}),[a]),e.jsxs(g,{entryId:t,schema:s,children:[e.jsxs("div",{className:"icon-scene","data-icon-color":n,children:[e.jsx("div",{className:"icon-grid",children:o.map(r=>e.jsxs("div",{className:"icon-tile",children:[e.jsx(l,{art:r.art}),e.jsx("span",{className:"icon-tile-label",children:r.label})]},r.name))}),e.jsxs("div",{className:"icon-inline",children:[e.jsx(l,{art:o[0].art}),"行内用法:1em 与文字等高",e.jsx("small",{children:"inline 1em"})]}),e.jsxs("div",{className:"icon-readout","aria-live":"polite",children:["size=",d,"px · strokeWidth=",x," · color=",n]})]}),e.jsx("style",{children:j})]})}export{w as default};
