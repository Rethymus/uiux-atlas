import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as X}from"./color.DuEPkvq5.js";import{D as _}from"./DemoStage.vW1CgYCd.js";const l=[{zh:"对比两级节流的取舍",en:"Compare the two-level throttle trade-offs"},{zh:"给锁底滚动写验收要点",en:"Write acceptance criteria for sticky-bottom"},{zh:"未闭合语法自愈是怎么实现的",en:"How does unclosed-syntax healing work?"},{zh:"生成式 UI 的白名单边界在哪",en:"Where is generative UI's allowlist boundary?"}],q="回答已送达 Answer delivered(流式期间建议牌面静止,ready 后才换牌)。",F=`
.sgc-wrap { width: min(560px, calc(100% - 24px)); position: relative; }
.sgc-feed {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
  padding: 12px 16px;
  display: grid;
  gap: 8px;
}
.sgc-msg { margin: 0; font-size: 13px; line-height: 1.7; color: var(--text-1); }
.sgc-msg.ai { color: var(--text-dim, var(--text-1)); }
.sgc-msg.user {
  justify-self: end;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  border-radius: 10px;
  padding: 4px 10px;
  max-width: 80%;
}
.sgc-sent-mark { color: var(--accent); font-size: 11px; margin-left: 6px; }
/* chips 行:官方 Suggestions = 横向 ScrollArea(可拖动滚动条) */
.sgc-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: thin;
  padding: 2px 2px 6px;
  scroll-snap-type: x proximity;
}
.sgc-chip {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12.5px;
  padding: 5px 14px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 30ch;
  scroll-snap-align: start;
  flex: none;
}
.sgc-chip:hover:not([aria-disabled="true"]) { border-color: var(--accent); color: var(--accent); }
.sgc-chip:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* 已发送态:✓ 徽标 + 禁用(状态不只靠颜色承载) */
.sgc-chip[aria-disabled="true"] {
  border-style: dashed;
  color: var(--text-faint);
  cursor: default;
  pointer-events: none;
}
.sgc-chip[aria-disabled="true"]:not([data-sent="true"]) { opacity: 0.55; }
.sgc-chip[data-flicker="true"] { animation: sgc-flick 0.35s steps(2) infinite; }
@keyframes sgc-flick { 50% { opacity: 0.4; } }
/* fill-composer 档的输入框中间态(自改写,非官方) */
.sgc-composer {
  display: flex;
  gap: 8px;
  align-items: center;
}
.sgc-composer input {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg);
  color: var(--text-1);
  font: inherit;
  font-size: 12.5px;
  padding: 6px 10px;
}
.sgc-composer input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sgc-send {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 5px 14px;
  cursor: pointer;
}
.sgc-send:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.sgc-send:disabled { opacity: 0.45; cursor: default; }
.sgc-send:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sgc-status { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
.sgc-tools { position: absolute; right: -4px; top: -38px; display: flex; gap: 6px; }
.sgc-tools button {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
}
.sgc-tools button:hover { border-color: var(--accent); color: var(--accent); }
.sgc-tools button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sgc-hint { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .sgc-chip[data-flicker="true"] { animation: none; opacity: 0.6; }
}
`;function Z({entryId:b,schema:y}){const o=X(b,y),[u,D]=r.useState(()=>o.get("maxChips")),[k,M]=r.useState(()=>o.get("chipMaxLength")),[n,E]=r.useState(()=>o.get("updatePolicy")),[w,T]=r.useState(()=>o.get("onClickBehavior")),[p,P]=r.useState(()=>o.get("postClickState")),[R,I]=r.useState(()=>o.get("scrollDirection")),[x,L]=r.useState(0),[a,S]=r.useState("streaming"),[j,C]=r.useState(0),[m,h]=r.useState(null),[U,f]=r.useState(!1),[c,d]=r.useState(""),[B,v]=r.useState([]),W=r.useRef(null);r.useEffect(()=>o.subscribe(()=>{D(o.get("maxChips")),M(o.get("chipMaxLength")),E(o.get("updatePolicy")),T(o.get("onClickBehavior")),P(o.get("postClickState")),I(o.get("scrollDirection"))}),[o]);const A=()=>{L(e=>e+1),S("streaming"),C(0),h(null),f(!1),d(""),v([])};r.useEffect(()=>{if(a!=="streaming")return;const e=window.setInterval(()=>C(i=>i+1),180),t=window.setTimeout(()=>S("ready"),2200);return()=>{window.clearInterval(e),window.clearTimeout(t)}},[x,a]);const G=e=>{const t=`${e.zh} ${e.en}`;return t.length>k?`${t.slice(0,Math.max(4,k-1))}…`:t},N=r.useMemo(()=>{const e=n==="live-stream"&&a==="streaming"?j:x;return l.map((t,i)=>l[(i+e)%l.length])},[n,a,j,x]),g=N.slice(0,u),z=N.length-g.length,H=U||p!=="hide"&&m!==null&&p==="disable",K=e=>{if(w==="fill-composer"){d(e);return}v(t=>[...t,e]),h(e),f(!0)},$=()=>{c.trim()&&(v(e=>[...e,c]),h(c),d(""),f(!0))},O=e=>m===e?"sent":"idle";return s.jsxs(_,{entryId:b,schema:y,children:[s.jsxs("div",{className:"sgc-wrap",children:[s.jsx("div",{className:"sgc-tools",role:"group","aria-label":"演示控制 Demo controls",children:s.jsx("button",{type:"button",onClick:A,children:"重播 Replay"})}),s.jsxs("div",{className:"sgc-feed","aria-live":"polite",children:[s.jsx("p",{className:"sgc-msg ai",children:a==="streaming"?"回答流式生成中 Streaming…":q}),B.map((e,t)=>s.jsxs("p",{className:"sgc-msg user",children:[e,s.jsx("span",{className:"sgc-sent-mark",children:"已发送 sent ✓"})]},`${t}-${e.slice(0,6)}`))]}),s.jsxs("div",{ref:W,className:"sgc-row",role:"group","aria-label":"建议追问 Suggested follow-ups",style:R==="wrap"?{flexWrap:"wrap",overflowX:"visible"}:void 0,children:[a==="ready"||n==="live-stream"?g.map(e=>{const t=G(e),i=O(t);return s.jsxs("button",{type:"button",className:"sgc-chip","data-sent":i==="sent"?"true":void 0,"data-flicker":n==="live-stream"&&a==="streaming"?"true":void 0,"aria-disabled":H||i==="sent"?"true":void 0,title:t,"aria-label":t,onClick:()=>K(t),children:[t,i==="sent"?" ✓":""]},t)}):null,a==="ready"&&z>0&&s.jsxs("span",{className:"sgc-status",style:{alignSelf:"center",margin:0},children:["+",z," 条在滚动区 in scroll area"]})]}),s.jsxs("div",{className:"sgc-composer",children:[s.jsx("input",{type:"text",value:c,placeholder:w==="fill-composer"?"建议填入后可编辑 editable fill…":"输入消息 Type a message…","aria-label":"输入框 Composer",onChange:e=>d(e.target.value),onKeyDown:e=>{e.key==="Enter"&&$()}}),s.jsx("button",{type:"button",className:"sgc-send",onClick:$,disabled:!c.trim(),children:"发送 Send"})]}),s.jsx("p",{className:"sgc-status","aria-live":"polite",children:a==="streaming"?n==="ready-gated"?"流式中 · 牌面静止(ready-gated)Streaming — row frozen (ready-gated)":"流式中 · 牌面逐 tick 抖动(live-stream 反面教材)Streaming — row jitters per tick (live-stream anti-pattern)":m?`已按「${p}」处理点击后态 Post-click state: ${p}`:`就绪 ready · 展示 ${g.length}/${l.length} 条(上限 ${u})Ready · showing ${g.length}/${l.length} (cap ${u})`}),s.jsx("p",{className:"sgc-hint",children:"点一条建议 → 点击即发送(官方用法);fill-composer 档先填输入框 · Click a chip → it sends immediately (official usage); fill-composer fills the composer first"})]}),s.jsx("style",{children:F})]})}export{Z as default};
