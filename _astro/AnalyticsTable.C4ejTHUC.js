import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as x}from"./index.DLkBFFtG.js";const D=[{id:"lg",zh:"大",en:"Large"},{id:"md",zh:"中",en:"Medium"},{id:"sm",zh:"小",en:"Small"}],G=.09,P="#6E7079",W=5,H=5,q=8,L=100,R=8,S=100,u=[{zh:"1月",en:"Jan"},{zh:"2月",en:"Feb"},{zh:"3月",en:"Mar"},{zh:"4月",en:"Apr"},{zh:"5月",en:"May"},{zh:"6月",en:"Jun"}],i=[{zh:"本年",en:"This year",hex:"#0072B2",values:[64,58,71,66,78,84]},{zh:"上年",en:"Last year",hex:"#E69F00",values:[42,47,39,52,48,56]}],V=[{zh:"华东",en:"East",values:[72,80,76,88,84,90],hex:"#0072B2"},{zh:"华南",en:"South",values:[58,64,60,72,68,75],hex:"#009E73"},{zh:"华北",en:"North",values:[46,52,58,54,62,66],hex:"#CC79A7"},{zh:"西部",en:"West",values:[30,34,40,38,46,52],hex:"#E69F00"}];function F(j,a){const m=Math.max(2,Math.round(a)),w=j/(m-1),c=Math.pow(10,Math.floor(Math.log10(w))),d=w/c,v=(d<=1?1:d<=2?2:d<=2.5?2.5:d<=5?5:10)*c,f=Math.ceil(j/v)*v,h=[];for(let b=0;b<=f+1e-9;b+=v)h.push(Math.round(b*100)/100);return h}const C=520,I=190,l={top:16,right:18,bottom:26,left:34},k=C-l.left-l.right,M=I-l.top-l.bottom,K=`
.at-scene { position: absolute; inset: 0; overflow: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.at-main { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr); gap: 10px; }
.at-card {
  position: relative;
  min-width: 0; min-height: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}
.at-card-label { margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; color: var(--text-faint); }
/* ── 图表区:网格 9% · 轴线 #6E7079 · 图例右置(ggplot2 默认)── */
.at-chart { position: relative; flex: 1; min-height: 0; display: flex; gap: 10px; }
.at-chart svg { flex: 1; min-width: 0; max-height: 100%; color: var(--text); }
.at-legend { flex: none; display: flex; flex-direction: column; gap: 8px; justify-content: center; font-size: 12px; color: var(--text); }
.at-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 999px; margin-right: 6px; vertical-align: -1px; }
.at-band { fill: transparent; cursor: pointer; outline: none; }
.at-band:focus-visible { fill: color-mix(in srgb, var(--accent) 8%, transparent); stroke: var(--accent); stroke-width: 1; }
.at-axis-title { font-size: 11px; fill: var(--text-dim); }
/* tooltip:WCAG 1.4.13 三条全齐——Esc 可关(dismissible)/ pointer-events auto
   可移入(hoverable)/ 移出 100ms 宽限(ECharts hideDelay) */
.at-tip {
  position: absolute;
  z-index: 4;
  min-width: 118px;
  padding: 6px 9px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text);
  pointer-events: auto;
}
.at-tip b { font-variant-numeric: tabular-nums; }
/* ── 数据表:Ant Table 三档密度(16/12·8/8)+ sticky 表头 + 滚动列(scroll.y 口径);
      数字列 tabular-nums 右对齐(AntV);行 hover 恒开(Ant rowHoverBg 语义)── */
.at-table-wrap { flex: 1; min-height: 0; overflow: auto; border-radius: 6px; }
.at-table { width: 100%; border-collapse: collapse; font-size: 12.5px; color: var(--text); background: var(--surface); }
/* 三档密度:antd cellPadding large 16 / medium 12·8 / small 8(table/style/index.ts:457-462) */
.at-table[data-size="lg"] th, .at-table[data-size="lg"] td { padding: 16px; }
.at-table[data-size="md"] th, .at-table[data-size="md"] td { padding: 12px 8px; }
.at-table[data-size="sm"] th, .at-table[data-size="sm"] td { padding: 8px; }
.at-table th {
  position: sticky; top: 0; z-index: 1;
  text-align: left; font-weight: 600;
  background: var(--surface);
  border-bottom: 1px solid var(--border-strong);
  white-space: nowrap;
}
.at-table td { border-bottom: 1px solid var(--border); }
.at-table tbody tr { transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); }
.at-table tbody tr:hover { background: color-mix(in srgb, var(--text) 4%, transparent); }
.at-num { text-align: right; font-variant-numeric: tabular-nums; } /* AntV:数字等宽右对齐 */
.at-sort {
  position: relative;
  border: 0; background: none; padding: 0; font: inherit; cursor: pointer; color: inherit;
  display: inline-flex; align-items: center; gap: 4px;
}
.at-sort:hover { color: var(--accent); }
.at-sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 2px; }
.at-arrow { font-size: 10px; opacity: 0.55; letter-spacing: -1px; }
.at-sort[aria-sort] .at-arrow { opacity: 1; color: var(--accent); }
/* ── 小倍数点缀:4 面板共用 0–100 标度,gap 8px(Grafana GRID_CELL_VMARGIN)── */
.at-multiples {
  flex: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${R}px;
}
.at-panel {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--surface);
  min-width: 0;
}
.at-panel-label { display: flex; align-items: baseline; gap: 5px; font-size: 10.5px; color: var(--text-dim); white-space: nowrap; }
.at-panel-label b { color: var(--text); font-weight: 600; font-variant-numeric: tabular-nums; }
.at-panel svg { display: block; width: 100%; height: 22px; }
/* ── 工具栏 / 铭牌(mono 元数据纪律)── */
.at-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  border: 1px solid var(--border);
  z-index: 2;
}
.at-toolbar button {
  position: relative;
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: transparent;
}
.at-toolbar button::after { content: ""; position: absolute; inset: -8px; } /* 热区 ≥42px */
.at-toolbar button[aria-pressed="true"] { background: var(--surface-2); color: var(--text); }
.at-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
  pointer-events: none;
  z-index: 2;
}
.at-layers b { font-weight: 600; color: var(--text); }
@media (max-width: 900px) {
  .at-main { grid-template-columns: 1fr; }
  .at-layers { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .at-table tbody tr { transition: none; }
}
`;function J({locale:j}){const a=j==="zh",[m,w]=x.useState("lg"),[c,d]=x.useState(null),[p,v]=x.useState(null),f=x.useRef(null),h=x.useRef(0);x.useEffect(()=>{const e=n=>{n.key==="Escape"&&d(null)};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]),x.useEffect(()=>()=>window.clearTimeout(h.current),[]);const b=x.useMemo(()=>Math.max(...i.flatMap(e=>e.values)),[]),g=x.useMemo(()=>F(b,W),[b]),$=g[g.length-1],o=e=>l.top+M*(1-e/$),z=e=>l.left+k*e/(u.length-1),N=k/u.length,_=(e,n,s)=>{const r=f.current?.getBoundingClientRect();r&&d({qi:e,x:Math.min(n-r.left+14,r.width-132),y:Math.min(s-r.top+12,r.height-76)})},E=()=>{window.clearTimeout(h.current),h.current=window.setTimeout(()=>d(null),L)},A=()=>window.clearTimeout(h.current),B=x.useMemo(()=>{const e=u.slice(0,5).map((n,s)=>({mo:n,now:i[0].values[s],prev:i[1].values[s],delta:i[0].values[s]-i[1].values[s]}));return p===null?e:[...e].sort((n,s)=>p==="asc"?n.now-s.now:s.now-n.now)},[p]),O=p==="asc"?"ascending":p==="desc"?"descending":void 0,T=m==="lg"?"16":m==="md"?"12·8":"8";return t.jsxs("div",{className:"demo-stage",children:[t.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[t.jsx("span",{className:"stage-plate-dot"}),"Analytics Table"]}),t.jsxs("div",{className:"at-scene",children:[t.jsxs("div",{className:"at-main",children:[t.jsxs("div",{className:"at-card",children:[t.jsx("p",{className:"at-card-label",children:a?"月度活跃指数 · 图表轴 + 提示框":"Monthly activity index · axes + tooltip"}),t.jsxs("div",{className:"at-chart",ref:f,children:[t.jsxs("svg",{viewBox:`0 0 ${C} ${I}`,role:"img","aria-label":a?"折线图:本年与上月活跃指数,6 个月,纵轴 0 到 100":"Line chart: this year vs last year activity index over 6 months, y axis 0 to 100",children:[g.map(e=>t.jsx("line",{x1:l.left,x2:l.left+k,y1:o(e),y2:o(e),stroke:"currentColor",style:{opacity:G}},e)),t.jsxs("g",{stroke:P,strokeWidth:"1",children:[t.jsx("line",{x1:l.left,x2:l.left,y1:l.top,y2:l.top+M}),t.jsx("line",{x1:l.left,x2:l.left+k,y1:o(0),y2:o(0)}),g.map(e=>t.jsx("line",{x1:l.left-H,x2:l.left,y1:o(e),y2:o(e)},e))]}),t.jsx("text",{className:"at-axis-title",x:l.left,y:l.top-4,children:a?"活跃指数(分)":"Activity index (pts)"}),g.map(e=>t.jsx("text",{x:l.left-q,y:o(e)+4,textAnchor:"end",fontSize:"11",fill:"var(--text-dim)",children:e},e)),u.map((e,n)=>t.jsx("text",{x:z(n),y:o(0)+15,textAnchor:"middle",fontSize:"11",fill:"var(--text-dim)",children:a?e.zh:e.en},e.en)),u.map((e,n)=>t.jsx("rect",{className:"at-band",x:l.left+N*n,y:l.top,width:N,height:M,tabIndex:0,role:"img","aria-label":`${a?e.zh:e.en}: ${a?i[0].zh:i[0].en} ${i[0].values[n]} · ${a?i[1].zh:i[1].en} ${i[1].values[n]}`,onMouseMove:s=>{A(),_(n,s.clientX,s.clientY)},onMouseLeave:E,onFocus:s=>{const r=s.target.getBoundingClientRect(),y=f.current?.getBoundingClientRect();y&&d({qi:n,x:r.left-y.left+N*.35,y:r.top-y.top+8})},onBlur:()=>d(null)},e.en)),i.map(e=>t.jsxs("g",{children:[t.jsx("polyline",{points:e.values.map((n,s)=>`${z(s)},${o(n)}`).join(" "),fill:"none",stroke:e.hex,strokeWidth:"2",strokeLinejoin:"round"}),e.values.map((n,s)=>t.jsx("circle",{cx:z(s),cy:o(n),r:"2.5",fill:e.hex,pointerEvents:"none"},s)),t.jsx("text",{x:z(5)+4,y:o(e.values[5])+3,fontSize:"10",fill:e.hex,children:e.values[5]})]},e.en))]}),t.jsx("div",{className:"at-legend",children:i.map(e=>t.jsxs("span",{children:[t.jsx("i",{style:{background:e.hex},"aria-hidden":"true"}),a?e.zh:e.en]},e.en))}),c&&t.jsxs("div",{className:"at-tip",role:"status",style:{left:c.x,top:c.y},onMouseEnter:A,onMouseLeave:E,children:[t.jsx("div",{children:a?u[c.qi].zh:u[c.qi].en}),t.jsxs("div",{children:[t.jsx("b",{style:{color:i[0].hex},children:i[0].values[c.qi]})," ",a?i[0].zh:i[0].en]}),t.jsxs("div",{children:[t.jsx("b",{style:{color:i[1].hex},children:i[1].values[c.qi]})," ",a?i[1].zh:i[1].en]})]})]})]}),t.jsxs("div",{className:"at-card",children:[t.jsx("p",{className:"at-card-label",children:a?`月度明细 · 密度 cellPadding ${T}px(数字列右对齐)`:`Monthly detail · cellPadding ${T}px (numbers right-aligned)`}),t.jsx("div",{className:"at-table-wrap",tabIndex:0,role:"region","aria-label":a?"数据表(可滚动)":"Data table (scrollable)",children:t.jsxs("table",{className:"at-table","data-size":m,children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{scope:"col",children:a?"月份":"Month"}),t.jsx("th",{scope:"col",className:"at-num","aria-sort":O,children:t.jsxs("button",{type:"button",className:"at-sort",onClick:()=>v(p==="asc"?"desc":p==="desc"?null:"asc"),children:[a?"本年":"This year"," ",t.jsx("span",{className:"at-arrow","aria-hidden":"true",children:"↑↓"})]})}),t.jsx("th",{scope:"col",className:"at-num",children:a?"上年":"Last year"}),t.jsx("th",{scope:"col",className:"at-num",children:"Δ"})]})}),t.jsx("tbody",{children:B.map(e=>t.jsxs("tr",{children:[t.jsx("td",{children:a?e.mo.zh:e.mo.en}),t.jsx("td",{className:"at-num",children:e.now}),t.jsx("td",{className:"at-num",children:e.prev}),t.jsx("td",{className:"at-num",children:e.delta>0?`+${e.delta}`:e.delta})]},e.mo.en))})]})}),t.jsx("p",{className:"at-card-label",style:{fontWeight:400},children:a?"sticky 表头 + 滚动列(Ant scroll.y 口径);行 hover 恒开;数字 tabular-nums 右对齐(AntV)":"Sticky header + scrollable body (Ant scroll.y); row hover always on; tabular-nums right-aligned (AntV)"})]})]}),t.jsx("div",{className:"at-multiples",role:"group","aria-label":a?"区域小倍数面板(共用 0–100 标度)":"Region small multiples (shared 0–100 scale)",children:V.map(e=>{const n=r=>20-r/S*18,s=r=>r/(e.values.length-1)*100;return t.jsxs("div",{className:"at-panel",children:[t.jsxs("span",{className:"at-panel-label",children:[t.jsx("i",{"aria-hidden":"true",style:{width:8,height:8,borderRadius:999,background:e.hex,display:"inline-block",marginRight:4,verticalAlign:0}}),a?e.zh:e.en," ",t.jsx("b",{children:e.values[e.values.length-1]})]}),t.jsx("svg",{viewBox:"0 0 100 22",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false",children:t.jsx("polyline",{points:e.values.map((r,y)=>`${s(y)},${n(r)}`).join(" "),fill:"none",stroke:e.hex,strokeWidth:"1.6",vectorEffect:"non-scaling-stroke"})})]},e.en)})}),t.jsx("div",{className:"at-toolbar",role:"group","aria-label":a?"表格密度 Density":"Table density",children:D.map(e=>t.jsx("button",{type:"button","aria-pressed":m===e.id,title:e.en,onClick:()=>w(e.id),children:e.zh},e.id))}),t.jsxs("p",{className:"at-layers","aria-hidden":"true",children:[t.jsxs("span",{children:[t.jsx("b",{children:"1"})," table: lg 16 / md 12·8 / sm 8 · sticky + scroll · nums right"]}),t.jsxs("span",{children:[t.jsx("b",{children:"2"})," axes: grid 0.09 (Grafana) · line #6E7079 · ticks ",g.length," (nice)"]}),t.jsxs("span",{children:[t.jsx("b",{children:"3"})," info: legend right · tooltip follow + ",L,"ms grace · Esc"]}),t.jsxs("span",{children:[t.jsx("b",{children:"4"})," multiples: 4 panels · shared 0–",S," · gap ",R,"px"]})]})]}),t.jsx("style",{children:K})]})}export{J as default};
