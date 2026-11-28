import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as V}from"./color.DuEPkvq5.js";import{D as $}from"./DemoStage.vW1CgYCd.js";const o=[{zh:"解析问题与约束",en:"Parsing the question and constraints",ms:1400},{zh:"检索相关规范条目",en:"Retrieving relevant spec entries",ms:2200},{zh:"比对三套官方数值",en:"Comparing three official value sets",ms:3400},{zh:"整理结论与出处",en:"Organizing conclusions and sources",ms:2600},{zh:"撰写最终回答",en:"Drafting the final answer",ms:1500}],F=`
.sti-wrap { width: min(560px, calc(100% - 24px)); position: relative; }
.sti-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
  padding: 14px 18px;
  min-height: 200px;
}
.sti-q { margin: 0 0 10px; font-size: 13px; color: var(--text-dim, var(--text-1)); }
.sti-q strong { color: var(--text-1); }
.sti-head {
  display: flex; align-items: center; gap: 10px;
  width: 100%; border: 0; background: none; padding: 0;
  font: inherit; font-size: 13px; color: var(--text-1);
  cursor: pointer; text-align: left;
}
.sti-head:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 6px; }
.sti-chev { transition: rotate 0.2s ease; color: var(--text-faint); }
.sti-head[aria-expanded="true"] .sti-chev { rotate: 90deg; }
/* shimmer 思考标签:text-transparent + background-clip:text 渐变扫光(vercel/chatbot 同型) */
.sti-shimmer {
  background-image: linear-gradient(90deg, var(--text-faint) 42%, var(--text-1) 50%, var(--text-faint) 58%);
  background-size: calc(200% * var(--sti-spread, 2)) 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: sti-sweep var(--sti-shimmer-ms, 2000ms) linear infinite;
}
@keyframes sti-sweep { from { background-position: 100% 0; } to { background-position: -100% 0; } }
/* 三点脉冲:submitted 空档(AI SDK 官方形态家族) */
.sti-dots { display: inline-flex; gap: 5px; align-items: center; }
.sti-dots i {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  animation: sti-pulse 1.2s ease-in-out infinite;
}
.sti-dots i:nth-child(2) { animation-delay: 0.15s; }
.sti-dots i:nth-child(3) { animation-delay: 0.3s; }
@keyframes sti-pulse { 0%, 70%, 100% { opacity: 0.25; } 35% { opacity: 1; } }
/* spinner:submitted 档另一形态 */
.sti-spin {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-top-color: var(--accent);
  animation: sti-rotate 0.9s linear infinite;
}
@keyframes sti-rotate { to { rotate: 360deg; } }
/* 步骤卡:complete | active | pending(AI Elements ChainOfThought 状态机) */
.sti-steps { margin: 10px 0 0; padding: 0; list-style: none; font-size: 12.5px; color: var(--text-1); }
.sti-steps li { display: flex; gap: 8px; padding: 4px 0; align-items: baseline; }
.sti-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; translate: 0 1px; }
.sti-steps li[data-state="done"] .sti-dot { background: var(--accent); }
.sti-steps li[data-state="active"] .sti-dot {
  background: color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: inset 0 0 0 2px var(--accent);
}
.sti-steps li[data-state="pending"] { color: var(--text-faint); }
.sti-steps li[data-state="pending"] .sti-dot { background: var(--border); }
.sti-steps li[data-state="done"] { color: var(--text-dim, var(--text-1)); }
.sti-count { margin-left: auto; font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: var(--text-faint); }
.sti-elapsed { font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: var(--text-faint); }
.sti-foot { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
.sti-status { margin: 0; font-size: 12px; color: var(--text-faint); }
.sti-stop {
  margin-left: auto;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit; font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
}
.sti-stop:hover { border-color: var(--accent); color: var(--accent); }
.sti-stop:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sti-tools { position: absolute; right: -4px; top: -38px; display: flex; gap: 6px; }
.sti-tools button {
  border: 1px solid var(--border); border-radius: 999px;
  background: var(--bg-elev); color: var(--text-1);
  font: inherit; font-size: 12px; padding: 4px 12px; cursor: pointer;
}
.sti-tools button:hover { border-color: var(--accent); color: var(--accent); }
.sti-tools button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sti-hint { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .sti-shimmer {
    animation: none;
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
    color: var(--text-dim, var(--text-1));
  }
  .sti-dots i, .sti-spin { animation: none; }
}
`;function J({entryId:h,schema:g}){const i=V(h,g),[f,z]=s.useState(()=>i.get("pendingIndicator")),[M,T]=s.useState(()=>i.get("shimmerSpread")),[u,E]=s.useState(()=>i.get("stepAutoCollapseMs")),[b,O]=s.useState(()=>i.get("autoOpenOnStream")),[C,D]=s.useState(()=>i.get("stopVisible")),[A,I]=s.useState(0),[a,d]=s.useState("submitted"),[c,v]=s.useState(-1),[l,x]=s.useState(0),[j,p]=s.useState(!1),[k,w]=s.useState(!1),m=s.useRef(0);s.useEffect(()=>i.subscribe(()=>{z(i.get("pendingIndicator")),T(i.get("shimmerSpread")),E(i.get("stepAutoCollapseMs")),O(i.get("autoOpenOnStream")),D(i.get("stopVisible"))}),[i]);const R=()=>{I(e=>e+1),d("submitted"),v(-1),x(0),w(!1),p(!1)};s.useEffect(()=>{m.current=Date.now();const e=[];e.push(window.setTimeout(()=>d("thinking"),600));let n=600;return o.forEach((r,N)=>{n+=r.ms,e.push(window.setTimeout(()=>{v(N+1<o.length?N+1:o.length),x(Math.ceil((Date.now()-m.current)/1e3))},n))}),e.push(window.setTimeout(()=>{d("done"),x(Math.ceil((Date.now()-m.current)/1e3))},n+300)),()=>e.forEach(r=>window.clearTimeout(r))},[A]),s.useEffect(()=>{if(a==="thinking"&&b==="on"&&p(!0),a==="done"&&u>0&&!k){const e=window.setTimeout(()=>{p(!1),w(!0)},u);return()=>window.clearTimeout(e)}},[a,b,u,k]);const S=o.reduce((e,n)=>e+n.ms,0),y=a==="submitted"||a==="thinking",q=y?"true":"false",P=a==="submitted"?"已发出、等流开始 submitted — loading dots / spinner":a==="thinking"?`思考中 Thinking… 步骤 ${Math.max(c,0)}/${o.length} · ${l}s`:`已完成 Done · Thought for ${Math.max(l,1)} seconds`;return t.jsxs($,{entryId:h,schema:g,children:[t.jsxs("div",{className:"sti-wrap",children:[t.jsx("div",{className:"sti-tools",role:"group","aria-label":"演示控制 Demo controls",children:t.jsx("button",{type:"button",onClick:R,children:"重播 Replay"})}),t.jsxs("div",{className:"sti-card","aria-busy":q,children:[t.jsxs("p",{className:"sti-q",children:[t.jsx("strong",{children:"问:"})," 三大设计体系的响应时间规范有什么差异?"]}),t.jsxs("button",{type:"button",className:"sti-head","aria-expanded":j,"aria-controls":"sti-steps",onClick:()=>p(e=>!e),children:[t.jsx("span",{className:"sti-chev","aria-hidden":"true",children:"▸"}),a==="submitted"?t.jsxs(t.Fragment,{children:[f==="dots"&&t.jsxs("span",{className:"sti-dots","aria-hidden":"true",children:[t.jsx("i",{}),t.jsx("i",{}),t.jsx("i",{})]}),f==="spinner"&&t.jsx("span",{className:"sti-spin","aria-hidden":"true"}),t.jsx("span",{children:"正在连接…"})]}):a==="thinking"?t.jsxs(t.Fragment,{children:[t.jsx("span",{className:"sti-shimmer",style:{"--sti-spread":String(M)},children:"Thinking…"}),t.jsxs("span",{className:"sti-elapsed",children:[l,"s"]})]}):t.jsxs(t.Fragment,{children:[t.jsxs("span",{children:["Thought for ",Math.max(l,1)," seconds"]}),t.jsx("span",{className:"sti-elapsed",children:"已收起 collapsed once"})]})]}),t.jsx("ul",{id:"sti-steps",className:"sti-steps",hidden:!j,children:o.map((e,n)=>{const r=a==="done"||n<c?"done":n===c?"active":"pending";return t.jsxs("li",{"data-state":r,children:[t.jsx("span",{className:"sti-dot","aria-hidden":"true"}),t.jsxs("span",{children:[e.zh," ",e.en]}),(a==="done"||n<c)&&t.jsx("span",{className:"sti-count","aria-hidden":"true",children:"done"})]},e.en)})}),t.jsxs("div",{className:"sti-foot",children:[t.jsx("p",{className:"sti-status","aria-live":"polite",children:P}),C==="on"&&y&&t.jsx("button",{type:"button",className:"sti-stop",onClick:()=>d("done"),children:"停止 Stop"})]})]}),t.jsxs("p",{className:"sti-hint",children:["全程约 ",Math.round(S/1e3),"s(>10s 档):注意 1s 后才出现 shimmer/三点、结束时 1s 自动收起并留下用时读数 · Steps span ~",Math.round(S/1e3),"s (>10s tier): shimmer/dots appear past 1s, auto-collapse 1s after done"]})]}),t.jsx("style",{children:F})]})}export{J as default};
