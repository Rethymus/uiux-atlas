import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as $}from"./color.DuEPkvq5.js";import{D as T}from"./DemoStage.vW1CgYCd.js";const m=1e3,k=2e3,X=`
.demo-stage { --prog-pulse: 1200ms; }
.pm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px 20px; overflow: hidden; }
.pm-card {
  flex: 1;
  min-height: 0;
  width: min(400px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
}
.pm-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 12px; color: var(--text-dim); }
.pm-reload {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
  white-space: nowrap;
}
.pm-reload:hover { border-color: var(--accent); color: var(--accent); }
.pm-body { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; gap: 12px; }

/* —— 骨架段 —— */
.pm-sk { display: flex; flex-direction: column; gap: 10px; }
.pm-sk-row { display: flex; align-items: center; gap: 12px; }
.pm-sk-avatar { width: 44px; height: 44px; border-radius: 50%; flex: 0 0 auto; }
.pm-sk-line { height: 14px; border-radius: 7px; flex: 1; }
.pm-sk-line.w60 { flex-basis: 60%; }
.pm-sk-block {
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, var(--text-dim) 18%, transparent);
}
.pm-sk-block::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--surface) 70%, transparent), transparent);
  animation: pm-sweep var(--prog-pulse, 1200ms) linear infinite;
}

/* —— 循环扫光段(不确定) —— */
.pm-track { position: relative; height: 8px; border-radius: 999px; background: color-mix(in srgb, var(--text-dim) 18%, transparent); overflow: hidden; }
.pm-loop {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  transform: translateX(-100%);
  animation: pm-loop var(--prog-pulse, 1200ms) cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.pm-track[data-determinate="true"] { overflow: visible; }
.pm-fill { position: absolute; top: 0; bottom: 0; left: 0; border-radius: 999px; background: var(--accent); }

/* —— 完成段 —— */
.pm-done { display: flex; flex-direction: column; gap: 10px; }
.pm-done-row { display: flex; align-items: center; gap: 12px; }
.pm-done-avatar { width: 44px; height: 44px; border-radius: 50%; flex: 0 0 auto; background: linear-gradient(135deg, oklch(0.7 0.13 165), oklch(0.52 0.13 172)); }
.pm-done-text { flex: 1; display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--text); }
.pm-done-text small { color: var(--text-dim); font-size: 12px; }
.pm-done-block { height: 14px; border-radius: 7px; flex: 1; }
.pm-ready { animation: pm-in 200ms cubic-bezier(0.2, 0, 0, 1) both; }

.pm-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; font-size: 12px; color: var(--text-dim); }
.pm-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.pm-chip-accent { border-color: var(--accent); color: var(--accent); }
.pm-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }

@keyframes pm-sweep { to { transform: translateX(100%); } }
@keyframes pm-loop { to { transform: translateX(350%); } }
@keyframes pm-in { from { opacity: 0; } }

/* reduced-motion:脉动/扫光/淡入全停;数值(百分比/文字)由 rAF 推进,不受影响 */
@media (prefers-reduced-motion: reduce) {
  .pm-sk-block::after, .pm-loop, .pm-ready { animation: none; }
  .pm-sk-block::after { display: none; }
}
`;function _({entryId:y,schema:j}){const o=$(y,j),[l,M]=t.useState(()=>o.get("total")),[i,S]=t.useState(()=>o.get("phase")),[x,E]=t.useState(!1),[r,A]=t.useState("skeleton"),[z,w]=t.useState(0),p=t.useRef(null),f=t.useRef(null),h=t.useRef(null),v=t.useRef(null),b=t.useRef(0),L=t.useRef(x);L.current=x,t.useEffect(()=>o.subscribe(()=>{M(o.get("total")),S(o.get("phase")),w(s=>s+1)}),[o]),t.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)"),c=()=>E(s.matches);return c(),s.addEventListener("change",c),()=>s.removeEventListener("change",c)},[]),t.useEffect(()=>{const s=performance.now();let c=null;const N=P=>{const n=P-s;let a,d=-1,g=0;if(i==="skeleton")a="skeleton";else if(i==="indeterminate")a="indeterminate";else if(i==="percent")d=Math.min(100,n/l*100),g=l-n,a=d>=100?"done":"percent";else if(n<m)a="skeleton";else if(n<m+k)a="indeterminate";else{const u=Math.max(1,l-m-k);d=Math.min(100,(n-m-k)/u*100),g=l-n,a=d>=100?"done":"percent"}if(d>=0){const u=Math.max(0,Math.min(100,d));if(f.current&&(f.current.style.width=`${u}%`),h.current&&h.current.setAttribute("aria-valuenow",String(Math.round(u))),v.current){const R=Math.max(0,Math.round(g/1e3));v.current.textContent=`${Math.round(u)}% · 预计还需 ~${R}s / ~${R}s left`}}a!==c&&(c=a,A(a),p.current&&(a==="done"?p.current.setAttribute("aria-busy","false"):p.current.setAttribute("aria-busy","true"))),a!=="done"&&!(i==="skeleton"&&n>m*3)&&!(i==="indeterminate"&&n>m*3)&&(b.current=requestAnimationFrame(N))};return b.current=requestAnimationFrame(N),()=>{cancelAnimationFrame(b.current),p.current&&p.current.setAttribute("aria-busy","true")}},[z,i,l]);const D={skeleton:"骨架 skeleton · 不确定(什么都不知道)",indeterminate:"循环扫光 looped bar · 在加载,但不知要多久",percent:"百分比 percent · 知道还剩多少",done:"完成 done · 内容快速淡入"},F=i==="auto"?"0–1s 骨架 → 1–3s 循环(2–10s 区间语义)→ 之后百分比(≥10s 语义)":"强制形态对照 / pinned form for comparison";return e.jsxs(T,{entryId:y,schema:j,children:[e.jsxs("div",{className:"pm-stage",children:[e.jsxs("div",{className:"pm-card",ref:p,"aria-busy":"true",children:[e.jsxs("div",{className:"pm-head",children:[e.jsx("span",{"aria-live":"polite",children:r==="done"?"加载完成 Done / 加载完成 Done":r==="percent"?e.jsxs(e.Fragment,{children:["正在加载 Loading… ",e.jsx("span",{ref:v,children:"0%"})]}):"正在加载 Loading…"}),e.jsx("button",{type:"button",className:"pm-reload",onClick:()=>w(s=>s+1),children:"重播 Replay"})]}),e.jsxs("div",{className:"pm-body",children:[r==="skeleton"&&e.jsxs("div",{className:"pm-sk","aria-hidden":"true",children:[e.jsxs("div",{className:"pm-sk-row",children:[e.jsx("div",{className:"pm-sk-avatar pm-sk-block"}),e.jsx("div",{className:"pm-sk-line pm-sk-block",style:{flexBasis:"42%"}})]}),e.jsx("div",{className:"pm-sk-line pm-sk-block",style:{flexBasis:"88%"}}),e.jsx("div",{className:"pm-sk-line pm-sk-block w60"})]}),(r==="indeterminate"||r==="percent")&&e.jsx("div",{children:e.jsx("div",{className:"pm-track","data-determinate":r==="percent"?"true":void 0,role:r==="percent"?"progressbar":void 0,"aria-valuemin":r==="percent"?0:void 0,"aria-valuemax":r==="percent"?100:void 0,"aria-valuenow":r==="percent"?0:void 0,ref:h,children:r==="indeterminate"?e.jsx("div",{className:"pm-loop"}):e.jsx("div",{className:"pm-fill",ref:f,style:{width:"0%"}})})}),r==="done"&&e.jsx("div",{className:`pm-done${x?"":" pm-ready"}`,children:e.jsxs("div",{className:"pm-done-row",children:[e.jsx("div",{className:"pm-done-avatar","aria-hidden":"true"}),e.jsxs("div",{className:"pm-done-text",children:[e.jsx("strong",{children:"内容已就绪 Content ready"}),e.jsx("small",{children:"骨架 → 循环 → 百分比 → 快速淡入,形态随确定性演进 / forms evolve as certainty grows"}),e.jsx("div",{className:"pm-done-block",style:{background:"color-mix(in srgb, var(--text-dim) 14%, transparent)"}})]})]})})]})]}),e.jsxs("div",{className:"pm-readout",children:[e.jsx("span",{className:"pm-chip pm-chip-accent",children:D[r]}),e.jsxs("span",{className:"pm-chip",children:["total ",l/1e3,"s · pulse 1200ms"]}),e.jsx("span",{className:"pm-chip",children:F}),x&&e.jsx("span",{className:"pm-chip",children:"reduced-motion: 动画停、数值照走 / motion off, values on"})]}),e.jsx("p",{className:"pm-hint",children:"NN/g 阈值编排:<1s 即时状态即可、1s+ 必须给指示、循环动画适合 2–10s、≥10s 用百分比 + 文字 + 完成时间估计;不确定段不编造 aria-valuenow,确定段才同步数值。目标梯度效应:越接近终点,收尾的确定感越重要 / NN/g orchestration: instant under 1s, an indicator past 1s, loops for 2–10s, percent + text + ETA at 10s+; the indeterminate phase invents no aria-valuenow, the determinate one syncs it. Goal-gradient: near the end, certainty is the motivator."})]}),e.jsx("style",{children:X})]})}export{_ as default};
