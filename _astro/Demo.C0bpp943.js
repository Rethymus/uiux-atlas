import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as x}from"./color.DuEPkvq5.js";import{D as h}from"./DemoStage.vW1CgYCd.js";const f=`
.sf-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  padding: 12px;
}
.sf-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(64px, 1fr));
  gap: 6px 4px;
  width: min(460px, 100%);
}
.sf-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 2px 8px;
  border-radius: 10px;
  min-width: 0;
}
.sf-tile:hover { background: rgba(0, 0, 0, 0.04); }
.sf-tile-label { font-size: 12px; color: rgba(0, 0, 0, 0.45); white-space: nowrap; }
/* strokeWidth 为 CSS 变量型参数(--sf-stroke);stroke-width 是继承属性,设在 svg 根即可 */
.sf-ic {
  width: 44px;
  height: 44px;
  fill: none;
  stroke: currentColor;
  stroke-width: var(--sf-stroke, 2);
  stroke-linecap: round;
  stroke-linejoin: round;
  color: rgba(0, 0, 0, 0.88);
  overflow: visible;
  flex: none;
}
/* fill 开关(JS 型参数)只填闭合路径;镂空子形状带内联 fill:none,优先级高于样式表 */
.sf-scene[data-fill="on"] .sf-art path { fill: currentColor; }
/* capJoin 切换(JS 型参数) */
.sf-scene[data-cap="square"] .sf-ic { stroke-linecap: square; stroke-linejoin: miter; }
.sf-note {
  max-width: 460px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.sf-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
`,m=[{name:"sun",label:"太阳 Sun",art:e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"4.25"}),e.jsx("path",{d:"M12 2.75v2.75"}),e.jsx("path",{d:"M12 18.5v2.75"}),e.jsx("path",{d:"M2.75 12h2.75"}),e.jsx("path",{d:"M18.5 12h2.75"}),e.jsx("path",{d:"M5.5 5.5l1.95 1.95"}),e.jsx("path",{d:"M16.55 16.55l1.95 1.95"}),e.jsx("path",{d:"M16.55 7.45l1.95-1.95"}),e.jsx("path",{d:"M5.5 18.5l1.95-1.95"})]})},{name:"moon",label:"月亮 Moon",art:e.jsx("path",{d:"M20 14.3A8.3 8.3 0 1 1 9.7 4a7.5 7.5 0 0 0 10.3 10.3z"})},{name:"camera",label:"相机 Camera",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M8.6 6.5 9.8 4.9a1 1 0 0 1 .8-.4h2.8a1 1 0 0 1 .8.4l1.2 1.6H19a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 6.5z"}),e.jsx("circle",{className:"sf-void",cx:"12",cy:"12.25",r:"3.3",style:{fill:"none"}})]})},{name:"bolt",label:"闪电 Bolt",art:e.jsx("path",{d:"M13.5 2.75 6 13.5h4.9L10.5 21.25 18 10.5h-4.9z"})},{name:"flag",label:"旗帜 Flag",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M5.5 3.25v17.5"}),e.jsx("path",{d:"M5.5 4.25h12.25l-2.6 4 2.6 4H5.5z"})]})},{name:"chat",label:"对话 Chat",art:e.jsx("path",{d:"M4.25 6.5A2.25 2.25 0 0 1 6.5 4.25h11a2.25 2.25 0 0 1 2.25 2.25v7a2.25 2.25 0 0 1-2.25 2.25H9.9L5.6 19.2a.45.45 0 0 1-.73-.35z"})},{name:"pin",label:"定位 Pin",art:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M12 21.4C11.6 21 5.5 15.2 5.5 10.7a6.5 6.5 0 0 1 13 0c0 4.5-6.1 10.3-6.5 10.7z"}),e.jsx("circle",{className:"sf-void",cx:"12",cy:"10.7",r:"2.4",style:{fill:"none"}})]})},{name:"bookmark",label:"书签 Bookmark",art:e.jsx("path",{d:"M6.75 4.5a1 1 0 0 1 1-1h8.5a1 1 0 0 1 1 1v16.1l-5.25-3.4-5.25 3.4z"})}];function b({entryId:l,schema:i}){const a=x(l,i),[r,n]=s.useState(()=>a.get("fill")),[o,c]=s.useState(()=>a.get("capJoin")),[d,p]=s.useState(()=>a.get("strokeWidth"));return s.useEffect(()=>a.subscribe(()=>{n(a.get("fill")),c(a.get("capJoin")),p(a.get("strokeWidth"))}),[a]),e.jsxs(h,{entryId:l,schema:i,children:[e.jsxs("div",{className:"sf-scene","data-fill":r,"data-cap":o,children:[e.jsx("div",{className:"sf-grid",children:m.map(t=>e.jsxs("div",{className:"sf-tile",children:[e.jsx("svg",{className:"sf-ic sf-art",viewBox:"0 0 24 24","aria-hidden":"true",children:t.art}),e.jsx("span",{className:"sf-tile-label",children:t.label})]},t.name))}),e.jsxs("div",{className:"sf-readout","aria-live":"polite",children:["strokeWidth=",d," · fill=",r," · capJoin=",o]}),e.jsx("p",{className:"sf-note",children:'太阳射线、旗杆是开放路径——填充开也无形可填,只留描边;相机镜头与定位圆点是写死 fill="none" 的镂空形状,永远保持中空。Open paths keep only their stroke; knockouts stay hollow.'})]}),e.jsx("style",{children:f})]})}export{b as default};
