import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as b}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as M}from"./DemoStage.vW1CgYCd.js";const v=`
.isd-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
.isd-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: min(560px, 100%);
}
.isd-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.isd-tile {
  box-sizing: border-box;
  width: 84px;
  height: 84px;
  padding: 5px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  background: #fff;
  color: rgba(15, 23, 42, 0.8);
  transition: border-color 0.2s ease;
}
.isd-tile[data-defect="true"] {
  border: 2px solid rgba(220, 38, 38, 0.65);
}
.isd-name {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  line-height: 1.2;
  color: rgba(15, 23, 42, 0.55);
}
.isd-name[data-bad="true"] { color: #dc2626; font-weight: 600; }
.isd-mini {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 10px;
  background: #fff;
  color: rgba(15, 23, 42, 0.8);
}
.isd-mini span { font-size: 11px; color: rgba(15, 23, 42, 0.5); }
.isd-table { border-collapse: collapse; width: min(560px, 100%); font-size: 12px; }
.isd-table th, .isd-table td {
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 6px 9px;
  text-align: left;
  vertical-align: top;
  line-height: 1.6;
}
.isd-table th { background: rgba(15, 23, 42, 0.04); font-weight: 600; }
.isd-ok { color: #15803d; }
.isd-bad { color: #c2410c; font-weight: 600; }
.isd-note {
  width: min(560px, 100%);
  margin: 0;
  font-size: 11px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.55);
  background: #f8fafc;
  border: 1px dashed rgba(15, 23, 42, 0.18);
  border-radius: 10px;
  padding: 8px 12px;
}
.isd-note b { color: rgba(15, 23, 42, 0.75); }
@media (prefers-reduced-motion: reduce) {
  .isd-tile { transition: none; }
}
`,L=[{id:"home",kebab:"home",paths:["M4 11L12 4L20 11","M6 10V20H18V10","M10 20V16H14V20"]},{id:"search",kebab:"search",paths:["M16 16L19 19"],circles:[{cx:11,cy:11,r:6}]},{id:"plus",kebab:"plus",paths:["M12 5V19","M5 12H19"]},{id:"arrow-right",kebab:"arrow-right",paths:["M4 12H19","M13 6L19 12L13 18"]},{id:"bell",kebab:"bell",paths:["M6 17V11A6 6 0 0 1 18 11V17Z","M10 20H14"]},{id:"dot-circle",kebab:"dot-circle",paths:[],circles:[{cx:12,cy:12,r:8}],dots:[{cx:12,cy:12,r:2}]}],H=[{id:"home",kebab:"home",paths:["M4 11L12 1L20 11","M6 10V20H18V10","M10 20V16H14V20"],defect:{kind:"trim",pathIndex:0}},{id:"search",kebab:"search",paths:["M16 16L19.5 19.5"],circles:[{cx:11,cy:11,r:6}],defect:{kind:"grid",pathIndex:0}},{id:"plus",kebab:"plus",paths:["M12 5V19","M5 12H19"]},{id:"arrow-right",kebab:"arrow-right",paths:["M4 12H19","M13 6L19 12L13 18"],defect:{kind:"stroke"}},{id:"bell",kebab:"bell",paths:["M6 17V11A6 6 0 0 1 18 11V17Z","M10 20H14"]},{id:"dot-circle",kebab:"dot-circle",paths:[],circles:[{cx:12,cy:12,r:8}],dots:[{cx:12,cy:12,r:2}]}];function V({kind:a}){if(a==="none")return null;const c="1.6 1.4";if(a==="grid"){const s=[];for(let t=0;t<=24;t+=2){const d=t===12;s.push(e.jsx("line",{x1:t,y1:0,x2:t,y2:24,stroke:d?"rgba(37,99,235,0.4)":"rgba(37,99,235,0.16)",strokeWidth:d?.4:.2},`v${t}`),e.jsx("line",{x1:0,y1:t,x2:24,y2:t,stroke:d?"rgba(37,99,235,0.4)":"rgba(37,99,235,0.16)",strokeWidth:d?.4:.2},`h${t}`))}return e.jsx("g",{children:s})}return a==="keylines"?e.jsxs("g",{fill:"none",stroke:"rgba(37,99,235,0.45)",strokeWidth:.45,strokeDasharray:c,children:[e.jsx("rect",{x:3,y:3,width:18,height:18,rx:1}),e.jsx("circle",{cx:12,cy:12,r:10}),e.jsx("rect",{x:2,y:4,width:20,height:16,rx:1}),e.jsx("rect",{x:4,y:2,width:16,height:20,rx:1})]}):e.jsxs("g",{fill:"none",strokeWidth:.5,strokeDasharray:c,children:[e.jsx("rect",{x:2,y:2,width:20,height:20,stroke:"rgba(22,163,74,0.55)"}),e.jsx("rect",{x:1,y:1,width:22,height:22,stroke:"rgba(217,119,6,0.55)"})]})}function u({icon:a,overlay:c,strokeVar:s,size:t=72}){const d=a.defect?.kind==="stroke";return e.jsxs("svg",{viewBox:"0 0 24 24",width:t,height:t,fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",style:{strokeWidth:d?1.5:s},"aria-hidden":"true",children:[e.jsx(V,{kind:c}),a.circles?.map((i,o)=>e.jsx("circle",{cx:i.cx,cy:i.cy,r:i.r},o)),a.paths.map((i,o)=>e.jsx("path",{d:i,stroke:a.defect?.pathIndex===o?"#dc2626":void 0},o)),a.dots?.map((i,o)=>e.jsx("circle",{cx:i.cx,cy:i.cy,r:i.r,fill:"currentColor",stroke:"none"},o))]})}function B({entryId:a,schema:c}){const s=w(a,c),[t,d]=b.useState(()=>s.get("overlay")),[i,o]=b.useState(()=>s.get("audit")),[g,j]=b.useState(()=>s.get("naming"));b.useEffect(()=>s.subscribe(()=>{d(s.get("overlay")),o(s.get("audit")),j(s.get("naming"))}),[s]);const n=s.get("stroke"),l=i==="violations",m=l?H:L,f="var(--isd-stroke, 2px)",k={home:"Home",search:"search_icon","arrow-right":"arrowRIGHT"},y=(()=>{const r=g==="mixed",h=l,x=l&&n!==1.5,p=l;return[{check:"命名一致性",standard:"kebab-case、全小写、连字符分隔、无重复(社区通行惯例)",ok:!r,detail:r?"3 个违例:Home(Pascal)、search_icon(snake)、arrowRIGHT(大小写混写)— 按名检索与 tree-shaking 都会漏":"6/6 kebab-case,无重复"},{check:"像素栅格",standard:"X/Y 坐标必须整数,禁止小数(Material 官方规则,07 §2)",ok:!h,detail:h?"search:手柄端点 (19.5, 19.5) 非整数 — 小数坐标在低分屏上落不到整像素,线条发虚":"6/6 坐标全为整数"},{check:"线宽一致性",standard:`系统标准 = ${n}px(Lucide/Feather 源码 2px;Heroicons 1.5 是独立体系,07 §1)`,ok:!x,detail:x?`arrow-right 硬编码 1.5px ≠ 系统标准 ${n}px — 例外体系不可混入;更粗细应走 wght 轴而非硬改`:n===1.5?"arrow-right 的 1.5px 恰与标准一致(巧合对齐,硬编码仍是坏味道)":`6/6 = ${n}px`},{check:"修剪区/安全区",standard:"live area 20×20(2dp padding),内容绝不可越出修剪区 = 完整 24dp(07 §2)",ok:!p,detail:p?"home:屋顶画到 y=1,描边(radius cap)越出画布 — 修剪区红线":"6/6 内容在修剪区内(live area 之外仅留作加重量)"}]})();return e.jsx(M,{entryId:a,schema:c,children:e.jsxs("div",{className:"isd-scene",children:[e.jsx("div",{className:"isd-row",children:m.map(r=>{const h=l&&r.defect!=null,x=g==="mixed"&&k[r.kebab]?k[r.kebab]:r.kebab,p=g==="mixed"&&k[r.kebab]!=null;return e.jsxs("div",{className:"isd-cell",children:[e.jsx("div",{className:"isd-tile","data-defect":h,children:e.jsx(u,{icon:r,overlay:t,strokeVar:f})}),e.jsx("span",{className:"isd-name","data-bad":p,children:x})]},r.kebab)})}),e.jsxs("div",{className:"isd-mini",children:[m.map(r=>e.jsx(u,{icon:r,overlay:"none",strokeVar:f,size:24},`mini-${r.kebab}`)),e.jsx("span",{children:"同图标 24px 原生档:线宽是 24 网格用户单位,显示放大到 72px 比例不变——改粗细换权重,不缩放"})]}),e.jsxs("table",{className:"isd-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"审计项"}),e.jsx("th",{scope:"col",children:"标准(出处)"}),e.jsx("th",{scope:"col",children:"判定"})]})}),e.jsx("tbody",{children:y.map(r=>e.jsxs("tr",{children:[e.jsx("td",{children:r.check}),e.jsx("td",{children:r.standard}),e.jsxs("td",{className:r.ok?"isd-ok":"isd-bad",children:[r.ok?"✓ 通过 — ":"✗ 违规 — ",r.detail]})]},r.check))})]}),e.jsxs("p",{className:"isd-note",children:[e.jsx("b",{children:"叠加层图例:"}),"键程 shapes = 方 18×18 / 圆 Ø20 / 竖 16×20 / 横 20×16(Material 官方栅格); 安全区档绿框 = live area 20×20(2dp padding),橙框 = 1px 安全区边界(Lucide:描边距边 ≥1px)。",e.jsx("b",{children:"验收巧思:"}),"与 circle/square 并排整体模糊比灰度(视觉重量),镂空里塞得进一个 2px 圆(元素间距)——把「感觉不齐」变成可复核流程(Lucide 贡献规范)。"]}),e.jsx("style",{children:v})]})})}export{B as default};
