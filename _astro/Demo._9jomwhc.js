import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DLkBFFtG.js";import{g as x}from"./color.DuEPkvq5.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const g=`
.ls-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px;
}
.ls-main {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 14px 22px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 16px;
  background: #f8fafc;
}
.ls-preview { display: inline-flex; color: rgba(15, 23, 42, 0.88); }
.ls-meta { display: flex; flex-direction: column; gap: 4px; min-width: 210px; }
.ls-setname { font-size: 15px; font-weight: 650; color: rgba(0, 0, 0, 0.85); }
.ls-spec {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
}
.ls-note { font-size: 12px; line-height: 1.6; color: rgba(0, 0, 0, 0.5); }
.ls-license {
  align-self: flex-start;
  font-size: 11px;
  padding: 1px 9px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
}
.ls-strip { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.ls-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px 10px 6px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  color: rgba(15, 23, 42, 0.8);
}
.ls-mini:hover { border-color: rgba(37, 99, 235, 0.5); }
.ls-mini:focus-visible { outline: 2px solid #2563eb; outline-offset: 1px; }
.ls-mini[aria-pressed="true"] {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.06);
}
.ls-mini em {
  font-style: normal;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.55);
}
.ls-mini i {
  font-style: normal;
  font-size: 10px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  color: rgba(0, 0, 0, 0.5);
}
.ls-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
`,j={bell:{lineA:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z"}),e.jsx("path",{d:"M10.4 19.8a1.9 1.9 0 0 0 3.2 0"})]}),lineB:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18.6 9.6a6.6 6.6 0 0 0-13.2 0c0 5.4-2.1 6.8-2.1 6.8h17.4c0 0-2.1-1.4-2.1-6.8z"}),e.jsx("path",{d:"M10.5 19.7a1.8 1.8 0 0 0 3 0"})]}),lineC:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M17.3 9.3a5.3 5.3 0 0 0-10.6 0c0 4.8-2.4 6.7-2.4 6.7h15.4c0 0-2.4-1.9-2.4-6.7z"}),e.jsx("path",{d:"M10.3 19.6h3.4"})]}),solidA:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z"}),e.jsx("circle",{cx:"12",cy:"19.4",r:"1.5"})]}),solidB:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M17 9.4a5 5 0 0 0-10 0c0 4.6-2.4 6.6-2.4 6.6h14.8c0 0-2.4-2-2.4-6.6z"}),e.jsx("ellipse",{cx:"12",cy:"19.4",rx:"2.9",ry:"1.5"})]})},home:{lineA:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M3.8 11.4 12 4.2l8.2 7.2"}),e.jsx("path",{d:"M5.4 10.1v9.3h13.2v-9.3"}),e.jsx("path",{d:"M10 19.4v-4.8h4v4.8"})]}),lineB:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4.4 11 12 4.6 19.6 11"}),e.jsx("path",{d:"M5.6 9.9v9.5h12.8V9.9"}),e.jsx("path",{d:"M9.4 19.4v-4.4h5.2v4.4"})]}),lineC:e.jsx("path",{d:"M5.2 19.4v-7.6L12 5.4l6.8 6.4v7.6h-4.6v-4.6h-4.4v4.6z"}),solidA:e.jsx("path",{d:"M12 3.3 3.3 10.9h2.2v8.5h5.2v-5h2.6v5h5.2v-8.5h2.2z"}),solidB:e.jsx("path",{d:"M4.6 10.8 12 4l7.4 6.8V20h-5.5v-5h-3.8v5H4.6z"})},heart:{lineA:e.jsx("path",{d:"M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z"}),lineB:e.jsx("path",{d:"M12 19.2C8.9 16.6 5.4 13.5 5.4 10.3c0-2.4 1.7-4.3 3.9-4.3 1.2 0 2.2.5 2.7 1.4.5-.9 1.5-1.4 2.7-1.4 2.2 0 3.9 1.9 3.9 4.3 0 3.2-3.5 6.3-6.6 8.9z"}),lineC:e.jsx("path",{d:"M12 19.5l-6.2-5.8C4.6 12.5 4 11.3 4 10c0-2.3 1.7-4 3.9-4 1.6 0 3.2 1 4.1 2.4C12.9 7 14.5 6 16.1 6 18.3 6 20 7.7 20 10c0 1.3-.6 2.5-1.8 3.7z"}),solidA:e.jsx("path",{d:"M12 19.6C8.5 17 4.6 13.7 4.6 10.2c0-2.6 1.9-4.7 4.3-4.7 1.3 0 2.5.6 3.1 1.6.6-1 1.8-1.6 3.1-1.6 2.4 0 4.3 2.1 4.3 4.7 0 3.5-3.9 6.8-7.4 9.4z"}),solidB:e.jsx("path",{d:"M12 19.5l-6.2-5.8C4.6 12.5 4 11.3 4 10c0-2.3 1.7-4 3.9-4 1.6 0 3.2 1 4.1 2.4C12.9 7 14.5 6 16.1 6 18.3 6 20 7.7 20 10c0 1.3-.6 2.5-1.8 3.7z"})},star:{lineA:e.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8"}),lineB:e.jsx("polygon",{points:"12,4.2 14.3,8.9 19.5,9.5 15.7,13.1 16.7,18.3 12,15.7 7.3,18.3 8.3,13.1 4.5,9.5 9.7,8.9"}),lineC:e.jsx("polygon",{points:"12,4 14.6,8.9 20,9.7 16,13.6 17,19 12,16.4 7,19 8,13.6 4,9.7 9.4,8.9"}),solidA:e.jsx("polygon",{points:"12,3.6 14.5,8.8 20.3,9.5 16.1,13.5 17.2,19.3 12,16.5 6.8,19.3 7.9,13.5 3.7,9.5 9.5,8.8"}),solidB:e.jsx("polygon",{points:"12,4 14.6,8.9 20,9.7 16,13.6 17,19 12,16.4 7,19 8,13.6 4,9.7 9.4,8.9"})}},r=[{id:"lucide",zh:"Lucide",art:"lineA",mode:"line",sw:2,license:"ISC",spec:"24×24 · 2px · round(源码定值)",note:"Feather 社区续作;全家桶 9 框架包;规范文档最完整"},{id:"feather",zh:"Feather",art:"lineA",mode:"line",sw:2,license:"MIT",spec:"24×24 · 2px · round",note:"极简主义原点;官方雪碧图 feather-sprite.svg 开箱即用;久未发版"},{id:"heroicons",zh:"Heroicons",art:"lineB",mode:"line",sw:1.5,license:"MIT",spec:"24/20/16 · outline 实测 1.5px",note:"Tailwind 官方出品;三档独立重绘;不接受新图标 PR"},{id:"phosphor",zh:"Phosphor",art:"solidA",mode:"solid",sw:0,license:"MIT",spec:"256×256(实测)· fill 路径",note:"六权重含 Fill/Duotone(底 0.2);权重像素值未证实"},{id:"material-symbols",zh:"Material Symbols",art:"lineC",mode:"line",sw:2,license:"Apache-2.0",spec:"24 基准 · wght 100–700 变轴",note:"变量字体四轴(opsz/wght/GRAD/FILL);opsz 默认 24"},{id:"material-icons",zh:"Material Icons 经典",art:"solidB",mode:"solid",sw:0,license:"Apache-2.0",spec:"24 · 五样式填充",note:"五样式 2022 年起停止更新;新项目需评估迁移"}];function p({setId:a,glyph:d,size:s}){const l=r.find(o=>o.id===a)??r[0],n=j[d]?.[l.art];return n?l.mode==="line"?e.jsx("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:l.sw,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:n}):e.jsx("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none","aria-hidden":"true",children:n}):null}function z({entryId:a,schema:d}){const s=x(a,d),[l,n]=c.useState(()=>s.get("set")),[o,h]=c.useState(()=>s.get("glyph"));c.useEffect(()=>s.subscribe(()=>{n(s.get("set")),h(s.get("glyph"))}),[s]);const t=r.find(i=>i.id===l)??r[0];return e.jsxs(m,{entryId:a,schema:d,children:[e.jsxs("div",{className:"ls-scene",children:[e.jsxs("div",{className:"ls-main",children:[e.jsx("span",{className:"ls-preview",children:e.jsx(p,{setId:l,glyph:o,size:88})}),e.jsxs("div",{className:"ls-meta",children:[e.jsx("span",{className:"ls-setname",children:t.zh}),e.jsx("span",{className:"ls-spec",children:t.spec}),e.jsx("span",{className:"ls-license",children:t.license}),e.jsx("span",{className:"ls-note",children:t.note})]})]}),e.jsx("div",{className:"ls-strip",children:r.map(i=>e.jsxs("button",{type:"button",className:"ls-mini","aria-pressed":i.id===l,onClick:()=>s.set("set",i.id),title:i.zh,children:[e.jsx(p,{setId:i.id,glyph:o,size:34}),e.jsx("em",{children:i.zh}),e.jsx("i",{children:i.license})]},i.id))}),e.jsxs("div",{className:"ls-readout","aria-live":"polite",children:["set=",l," · glyph=",o," · license=",t.license]})]}),e.jsx("style",{children:g})]})}export{z as default};
