import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";const x=1800,p=`
.sk-stage { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.sk-card {
  width: min(360px, 100%);
  padding: 20px 22px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
}
.sk-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 12px;
  color: var(--text-dim);
}
.sk-reload {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.sk-reload:hover { border-color: var(--accent); color: var(--accent); }

.sk-block {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: color-mix(in srgb, var(--text-dim) 22%, transparent);
}
.sk-block::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 45%;
  background: linear-gradient(90deg, transparent, hsla(0, 0%, 100%, 0.4), transparent);
  animation: sk-sweep var(--skeleton-duration, 1200ms) ease-in-out infinite;
}
@keyframes sk-sweep {
  from { transform: translateX(-100%); }
  to { transform: translateX(400%); }
}

/* M3:微妙脉动的视觉走向为「左上 → 右下」(调研 04§2.2) */
.sk-scene[data-dir="diagonal"] .sk-block::after {
  top: -50%;
  bottom: -50%;
  left: -50%;
  width: 200%;
  background: linear-gradient(120deg, transparent 42%, hsla(0, 0%, 100%, 0.38) 50%, transparent 58%);
  animation-name: sk-sweep-diag;
}
@keyframes sk-sweep-diag {
  from { transform: translate(-25%, -25%); }
  to { transform: translate(25%, 25%); }
}

.sk-head { display: flex; align-items: center; gap: 12px; }
.sk-avatar { width: 44px; height: 44px; border-radius: 50%; flex: none; }
.sk-headlines { flex: 1; display: grid; gap: 8px; }
.sk-line { height: 12px; }
.sk-rows { display: grid; gap: 12px; margin-top: 16px; }
.sk-row { display: flex; align-items: center; gap: 12px; }
.sk-icon { width: 26px; height: 26px; border-radius: 7px; flex: none; }

/* 内容态:尺寸与占位块对齐;淡入 200ms + M3 Standard easing(short4 档,调研 04§1.4/§2.6) */
.sk-content { animation: sk-reveal 200ms cubic-bezier(0.2, 0, 0, 1) both; }
@keyframes sk-reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}
.sk-user { display: flex; align-items: center; gap: 12px; }
.sk-user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex: none;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.5 0.18 300));
}
.sk-user-name { font-size: 15px; font-weight: 650; }
.sk-user-sub { font-size: 12px; color: var(--text-faint); margin-top: 3px; }
.sk-data { display: grid; gap: 12px; margin-top: 16px; }
.sk-item { display: flex; align-items: center; gap: 12px; font-size: 13px; }
.sk-dot { width: 26px; height: 26px; border-radius: 7px; flex: none; display: grid; place-items: center; font-size: 13px; background: color-mix(in srgb, var(--accent) 18%, transparent); }
.sk-item-label { flex: 1; }
.sk-item-val { font-variant-numeric: tabular-nums; color: var(--text-dim); }

.sk-note { margin: 14px 0 0; font-size: 12px; line-height: 1.6; color: var(--text-faint); }

@media (prefers-reduced-motion: reduce) {
  .sk-block::after { animation: none; }
  .sk-content { animation: none; }
}
`;function v({entryId:r,schema:n}){const i=m(r,n),[d,o]=a.useState(()=>i.get("direction")),[e,l]=a.useState(!0),t=a.useRef(null);a.useEffect(()=>i.subscribe(()=>{o(i.get("direction"))}),[i]),a.useEffect(()=>{if(e)return t.current=window.setTimeout(()=>l(!1),x),()=>{t.current!==null&&window.clearTimeout(t.current)}},[e]);const c=()=>l(!0);return s.jsxs(k,{entryId:r,schema:n,children:[s.jsx("div",{className:"sk-stage",children:s.jsx("div",{className:"sk-scene","data-dir":d,"aria-busy":e,children:s.jsxs("div",{className:"sk-card",children:[s.jsxs("div",{className:"sk-status",children:[s.jsx("span",{role:"status",children:e?"加载中 Loading…":"已就绪 Ready"}),s.jsx("button",{type:"button",className:"sk-reload",onClick:c,children:"重新加载 Reload"})]}),e?s.jsxs("div",{"aria-hidden":"true",children:[s.jsxs("div",{className:"sk-head",children:[s.jsx("div",{className:"sk-avatar sk-block"}),s.jsxs("div",{className:"sk-headlines",children:[s.jsx("div",{className:"sk-line sk-block",style:{width:"62%"}}),s.jsx("div",{className:"sk-line sk-block",style:{width:"38%"}})]})]}),s.jsxs("div",{className:"sk-rows",children:[s.jsxs("div",{className:"sk-row",children:[s.jsx("div",{className:"sk-icon sk-block"}),s.jsx("div",{className:"sk-line sk-block",style:{width:"48%"}})]}),s.jsxs("div",{className:"sk-row",children:[s.jsx("div",{className:"sk-icon sk-block"}),s.jsx("div",{className:"sk-line sk-block",style:{width:"64%"}})]}),s.jsxs("div",{className:"sk-row",children:[s.jsx("div",{className:"sk-icon sk-block"}),s.jsx("div",{className:"sk-line sk-block",style:{width:"40%"}})]})]})]}):s.jsxs("div",{className:"sk-content",children:[s.jsxs("div",{className:"sk-user",children:[s.jsx("div",{className:"sk-user-avatar","aria-hidden":"true",children:"A"}),s.jsxs("div",{children:[s.jsx("div",{className:"sk-user-name",children:"Ada Lovelace"}),s.jsx("div",{className:"sk-user-sub",children:"分析引擎 Analytical Engine · 1843"})]})]}),s.jsxs("div",{className:"sk-data",children:[s.jsxs("div",{className:"sk-item",children:[s.jsx("span",{className:"sk-dot","aria-hidden":"true",children:"✎"}),s.jsx("span",{className:"sk-item-label",children:"笔记 Notes"}),s.jsx("span",{className:"sk-item-val",children:"36"})]}),s.jsxs("div",{className:"sk-item",children:[s.jsx("span",{className:"sk-dot","aria-hidden":"true",children:"⚙"}),s.jsx("span",{className:"sk-item-label",children:"程序 Programs"}),s.jsx("span",{className:"sk-item-val",children:"12"})]}),s.jsxs("div",{className:"sk-item",children:[s.jsx("span",{className:"sk-dot","aria-hidden":"true",children:"✉"}),s.jsx("span",{className:"sk-item-label",children:"书信 Letters"}),s.jsx("span",{className:"sk-item-val",children:"84"})]})]})]}),s.jsx("p",{className:"sk-note",children:"模拟加载 1.8s → 按 NN/g 阈值属于「≥1s 必须给进度指示」区间 / simulated 1.8s load → past NN/g's 1s threshold, an indicator is mandatory。"})]})})}),s.jsx("style",{children:p})]})}export{v as default};
