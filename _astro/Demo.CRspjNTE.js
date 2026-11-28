import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as z}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const r=[{zh:"流式吞吐 tokens/s",en:"Stream throughput tokens/s",q3:"38",q4:"52"},{zh:"首块延迟 TTFT",en:"First-token latency TTFT",q3:"410ms",q4:"360ms"},{zh:"块级 memo 命中",en:"Block-memo hit rate",q3:"87%",q4:"91%"},{zh:"锁底打断次数",en:"Sticky-bottom interrupts",q3:"0.4/轮",q4:"0.2/轮"},{zh:"表格行重渲次数",en:"Table row re-renders",q3:"1.2/行",q4:"1.0/行"},{zh:"骨架换载位移",en:"Skeleton swap shift",q3:"0px",q4:"0px"},{zh:"表内滚动触发",en:"In-table scroll engaged",q3:"18%",q4:"26%"},{zh:"reduced-motion 回退",en:"Reduced-motion fallback",q3:"正常",q4:"正常"}],L=`
.stm-wrap { width: min(560px, calc(100% - 24px)); position: relative; }
.stm-scroll {
  max-height: var(--stm-max-h, 260px);
  overflow: auto;
  scrollbar-width: thin;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
}
.stm-tbl {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  color: var(--text-1);
}
.stm-tbl caption {
  text-align: left;
  font-size: 12px;
  color: var(--text-faint);
  padding: 8px 12px 4px;
}
.stm-tbl th, .stm-tbl td {
  border-bottom: 1px solid var(--border);
  padding: 7px 12px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stm-tbl thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--bg-elev);
  font-weight: 600;
  font-size: 12px;
  color: var(--text-dim, var(--text-1));
}
.stm-tbl th:first-child { width: 40%; }
.stm-tbl td.num { text-align: right; font-variant-numeric: tabular-nums; }
.stm-tbl tbody tr { animation: stm-row var(--stm-row-ms, 250ms) ease both; }
@keyframes stm-row { from { opacity: 0; } to { opacity: 1; } }
/* 骨架格:与真实行同高的 shimmer 占位(完成换载零位移) */
.stm-skel td {
  background-image: linear-gradient(90deg, transparent 30%, color-mix(in srgb, var(--text-1) 9%, transparent) 50%, transparent 70%);
  background-size: 200% 100%;
  animation: stm-sweep 1.4s linear infinite;
  color: transparent;
}
.stm-skel td[data-ph="dash"]::after {
  content: "—";
  color: var(--text-faint);
  background: none;
  animation: none;
}
@keyframes stm-sweep { from { background-position: 100% 0; } to { background-position: -100% 0; } }
.stm-status { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
.stm-tools { position: absolute; right: -4px; top: -38px; display: flex; gap: 6px; }
.stm-tools button {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
}
.stm-tools button:hover { border-color: var(--accent); color: var(--accent); }
.stm-tools button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.stm-hint { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .stm-tbl tbody tr, .stm-skel td { animation: none; }
  .stm-skel td { color: var(--text-faint); }
}
`;function A({entryId:d,schema:c}){const e=z(d,c),[x,u]=o.useState(()=>e.get("tableLayout")),[b,g]=o.useState(()=>e.get("skeletonRows")),[m,f]=o.useState(()=>e.get("autoLayoutOnComplete")),[i,v]=o.useState(()=>e.get("emptyCellPlaceholder")),[w,y]=o.useState(0),[a,p]=o.useState(0);o.useEffect(()=>e.subscribe(()=>{u(e.get("tableLayout")),g(e.get("skeletonRows")),f(e.get("autoLayoutOnComplete")),v(e.get("emptyCellPlaceholder"))}),[e]);const k=()=>{y(s=>s+1),p(0)};o.useEffect(()=>{if(a>=r.length)return;const s=window.setTimeout(()=>p(l=>l+1),a===0?400:450);return()=>window.clearTimeout(s)},[w,a]);const n=a>=r.length?"done":"streaming",h=x==="fixed-skeleton"||(n==="streaming"?!0:m!=="on"),j=n==="streaming"?b:0,q=o.useMemo(()=>r.slice(0,a),[a]);return t.jsxs(S,{entryId:d,schema:c,children:[t.jsxs("div",{className:"stm-wrap",children:[t.jsx("div",{className:"stm-tools",role:"group","aria-label":"演示控制 Demo controls",children:t.jsx("button",{type:"button",onClick:k,children:"重播 Replay"})}),t.jsx("div",{className:"stm-scroll",tabIndex:0,role:"region","aria-label":"流式表格 Streaming table","aria-busy":n==="streaming"?"true":"false",children:t.jsxs("table",{className:"stm-tbl",style:h?{tableLayout:"fixed"}:{tableLayout:"auto"},children:[t.jsx("caption",{children:"季度流式指标 Quarterly streaming metrics(AI 回答中流式生成的表格 A table streamed inside an answer)"}),t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{scope:"col",children:"指标 Metric"}),t.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Q3"}),t.jsx("th",{scope:"col",style:{textAlign:"right"},children:"Q4"})]})}),t.jsxs("tbody",{children:[q.map(s=>t.jsxs("tr",{children:[t.jsxs("td",{children:[s.zh," ",s.en]}),t.jsx("td",{className:"num",children:s.q3}),t.jsx("td",{className:"num",children:s.q4})]},s.en)),Array.from({length:j},(s,l)=>t.jsxs("tr",{className:"stm-skel","aria-hidden":"true",children:[t.jsx("td",{"data-ph":i==="dash"?"dash":void 0,children:"▒▒▒▒▒"}),t.jsx("td",{"data-ph":i==="dash"?"dash":void 0,children:"▒▒▒"}),t.jsx("td",{"data-ph":i==="dash"?"dash":void 0,children:"▒▒"})]},`skel-${l}`))]})]})}),t.jsx("p",{className:"stm-status","aria-live":"polite",children:n==="streaming"?`生长中 Growing… 已到 ${a}/${r.length} 行 rows · 布局 layout: ${h?"fixed(列宽锁定 widths locked)":"auto(收尾精修 closing pass)"}`:`已完成 Done · ${r.length} 行 rows · ${m==="on"?"已切 auto 精修 switched to auto-fit":"保持 fixed kept fixed"}`}),t.jsx("p",{className:"stm-hint",children:"行超出高度切表内滚动(sticky 表头),骨架行与真实行同高零位移 · Rows past the height scroll inside (sticky header); skeleton rows match real heights for zero-shift swaps"})]}),t.jsx("style",{children:L})]})}export{A as default};
