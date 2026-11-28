import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as z}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";const T=`
.demo-stage { --dt-delay: 700ms; }
.dt-field { position: absolute; inset: 0; }
.dt-queue {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 210px));
  display: grid;
  gap: 8px;
}
.dt-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 10px;
  background: oklch(1 0 0 / 0.8);
  font-size: 12.5px;
}
.dt-item[data-state="done"] { border-color: oklch(0.6 0.12 150); background: oklch(0.95 0.04 150); }
.dt-item[data-state="working"] { opacity: 0.75; }
.dt-title { flex: 1; }
.dt-approve {
  border: 0;
  border-radius: 8px;
  padding: 5px 12px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  min-width: 74px;
}
.dt-approve[disabled] { opacity: 0.5; cursor: default; }
.dt-badge {
  font-size: 11px;
  color: oklch(0.45 0.1 150);
  white-space: nowrap;
}
.dt-skel {
  flex: 1;
  height: 14px;
  border-radius: 6px;
  background: linear-gradient(90deg, oklch(0.9 0.01 250) 25%, oklch(0.97 0.005 250) 50%, oklch(0.9 0.01 250) 75%);
  background-size: 200% 100%;
  animation: dt-shimmer 1.1s linear infinite;
}
.dt-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 172px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.dt-threshold { font-weight: 700; }
.dt-threshold[data-ok="true"] { color: oklch(0.45 0.13 150); }
.dt-threshold[data-ok="false"] { color: oklch(0.55 0.19 25); }
.dt-live {
  position: absolute;
  left: -9999px;
  width: 1px; height: 1px; overflow: hidden;
}
.dt-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@keyframes dt-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .dt-skel { animation: none; }
}
@media (max-width: 480px) {
  .dt-panel { display: none; }
  .dt-queue { width: calc(100% - 24px); }
}
`,w=[{id:1,title:"报销单 #A-1024",state:"pending"},{id:2,title:"合同会签 #C-208",state:"pending"},{id:3,title:"采购申请 #P-77",state:"pending"},{id:4,title:"休假审批 #L-51",state:"pending"},{id:5,title:"设备领用 #E-9",state:"pending"}];function A({entryId:f,schema:g}){const c=z(f,g),[p,y]=i.useState(()=>c.get("feedback")),[j,n]=i.useState(w),[v,u]=i.useState(0),[b,m]=i.useState(null),l=i.useRef([]),h=i.useRef(null);i.useEffect(()=>c.subscribe(()=>{y(c.get("feedback"))}),[c]),i.useEffect(()=>()=>l.current.forEach(t=>window.clearTimeout(t)),[]);const d=c.get("delay"),r=t=>{h.current&&(h.current.textContent=t)},N=t=>{if(d<=0){n(a=>a.map(o=>o.id===t?{...o,state:"done"}:o)),u(a=>a+1),m(0),r("已批准,零延迟");return}const x=performance.now();if(p==="optimistic"){n(o=>o.map(s=>s.id===t?{...s,state:"confirming"}:s)),r("已标记完成,后台确认中");const a=window.setTimeout(()=>{n(o=>o.map(s=>s.id===t?{...s,state:"done"}:s)),u(o=>o+1),m(performance.now()-x),r("后台确认完成")},d);l.current.push(a)}else if(p==="skeleton"){n(o=>o.map(s=>s.id===t?{...s,state:"working"}:s)),r("处理中");const a=window.setTimeout(()=>{n(o=>o.map(s=>s.id===t?{...s,state:"done"}:s)),u(o=>o+1),m(performance.now()-x),r("完成")},d);l.current.push(a)}else{n(o=>o.map(s=>s.id===t?{...s,state:"working"}:s)),r("处理中");const a=window.setTimeout(()=>{n(o=>o.map(s=>s.id===t?{...s,state:"done"}:s)),u(o=>o+1),m(performance.now()-x),r("完成")},d);l.current.push(a)}},S=()=>{l.current.forEach(t=>window.clearTimeout(t)),l.current=[],n(w),u(0),m(null)},k=d<=400;return e.jsx(E,{entryId:f,schema:g,children:e.jsxs("div",{className:"dt-field",children:[e.jsxs("div",{className:"dt-queue","aria-label":"审批队列 Approval queue",children:[j.map(t=>e.jsx("div",{className:"dt-item","data-state":t.state,children:t.state==="working"&&p==="skeleton"?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"dt-skel","aria-hidden":"true"}),e.jsx("span",{style:{fontSize:11,opacity:.7},children:"处理中…"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"dt-title",children:[t.title,t.state==="confirming"&&e.jsx("span",{style:{fontSize:11,opacity:.65},children:" ✔ 已记录(后台确认中)"}),t.state==="working"&&p!=="skeleton"&&e.jsx("span",{style:{fontSize:11,opacity:.65},children:" 处理中…"})]}),t.state==="done"?e.jsx("span",{className:"dt-badge",children:"✔ 已批准"}):e.jsx("button",{type:"button",className:"dt-approve",disabled:t.state!=="pending",onClick:()=>N(t.id),children:"批准"})]})},t.id)),e.jsx("button",{type:"button",className:"dt-approve",style:{justifySelf:"start",background:"oklch(0.5 0 0 / 0.35)"},onClick:S,children:"重置队列 Reset"})]}),e.jsx("span",{ref:h,className:"dt-live","aria-live":"polite"}),e.jsxs("aside",{className:"dt-panel",children:[e.jsx("b",{children:"本批统计 This batch"}),e.jsxs("p",{style:{margin:0},children:["完成数 done: ",v,"/5",e.jsx("br",{}),"上次延迟 last: ",b==null?"—":`${Math.round(b)}ms`,e.jsx("br",{}),e.jsx("span",{className:"dt-threshold","data-ok":k,children:k?`✔ ${d}ms ≤ 400ms · Doherty 达标`:`⚠ ${d}ms > 400ms · 越过阈值`}),e.jsx("br",{}),e.jsxs("span",{style:{fontSize:11,opacity:.7},children:["策略 strategy: ",p]})]})]}),e.jsx("p",{className:"dt-hint",children:"连点 5 张批准,分别体验三种反馈策略与不同延迟;≤400ms 时节奏明显「跟手」。 Approve all five under each strategy and latency; ≤400ms feels glued to your hand."}),e.jsx("style",{children:T})]})})}export{A as default};
