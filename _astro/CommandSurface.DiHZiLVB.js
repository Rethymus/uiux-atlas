import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";const E=`
.cs-scene { position: absolute; inset: 0; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 16px; }
/* 触发器:全应用一个可发现的入口(Apple Searching) */
.cs-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 14px;
  color: var(--text-dim);
  background: var(--surface);
  cursor: pointer;
  min-width: min(260px, 100%);
}
.cs-trigger::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: transparent; pointer-events: none; }
.cs-trigger:hover::after { background: color-mix(in srgb, var(--text) 8%, transparent); }
.cs-trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.cs-trigger kbd {
  margin-left: auto;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2px 7px;
  background: var(--bg-elev);
}
.cs-status { margin: 0; font-size: 12.5px; color: var(--text-dim); min-height: 1.4em; }
.cs-status b { color: var(--text); font-weight: 550; }
/* ── 浮层(motion/overlay-entrance 官方默认;CSS 变量与条目 cssVar 同名)── */
.cs-overlay {
  --overlay-scale: 0.95;  /* initialScale = shadcn zoom-in-95 */
  --overlay-shift: 8px;   /* shiftY = slide-in-from-bottom-2 */
  --overlay-in-ms: 200ms; /* inDuration;Ant motionDurationMid 档 */
  --overlay-out-ms: 150ms;/* outDuration:退场必须短于入场 */
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px 16px;
}
.cs-backdrop { position: absolute; inset: 0; background: color-mix(in srgb, var(--bg) 55%, transparent); }
.cs-overlay[data-state="open"] .cs-backdrop { animation: cs-fade-in var(--overlay-in-ms) cubic-bezier(0.4, 0, 0.2, 1) both; }
.cs-overlay[data-state="closing"] .cs-backdrop { animation: cs-fade-out var(--overlay-out-ms) ease-in both; }
.cs-panel {
  position: relative;
  width: min(480px, 100%);
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03); /* Ant @shadow-3 对话框档 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.cs-overlay[data-state="open"] .cs-panel {
  animation: cs-panel-in var(--overlay-in-ms) cubic-bezier(0.4, 0, 0.2, 1) both; /* curve = standard */
}
.cs-overlay[data-state="closing"] .cs-panel {
  animation: cs-panel-out var(--overlay-out-ms) ease-in both; /* 出场更快且不排队 */
}
@keyframes cs-panel-in {
  from { opacity: 0; transform: translateY(var(--overlay-shift)) scale(var(--overlay-scale)); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes cs-panel-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(var(--overlay-shift)) scale(var(--overlay-scale)); }
}
@keyframes cs-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes cs-fade-out { from { opacity: 1; } to { opacity: 0; } }
/* reduced-motion:取消位移/缩放,保留纯 fade(条目 fallback 口径) */
.cs-overlay[data-reduced="true"] .cs-panel { animation-name: cs-fade-in !important; transform: none !important; }
.cs-overlay[data-reduced="true"][data-state="closing"] .cs-panel { animation-name: cs-fade-out !important; }
/* ── 面板内(command-palette 官方默认 maxResults=8/subsequence)── */
.cs-input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  padding: 13px 16px;
  font-size: 14.5px;
  color: var(--text);
  font-family: inherit;
}
.cs-input:focus-visible { outline: none; border-bottom-color: var(--accent); } /* 输入框永久聚焦;底边线代 outline */
.cs-list { margin: 0; padding: 6px; list-style: none; overflow-y: auto; max-height: 296px; scrollbar-width: thin; }
.cs-opt {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 9px;
  font-size: 13.5px;
  color: var(--text);
  cursor: pointer;
}
.cs-opt::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: transparent; pointer-events: none; }
/* M3 focus 状态层 +10%(内容色)叠在选中项上;方向键选中即叠层 */
.cs-opt[data-active="true"]::after { background: color-mix(in srgb, var(--text) 10%, transparent); }
.cs-opt:hover::after { background: color-mix(in srgb, var(--text) 8%, transparent); }
.cs-opt kbd {
  margin-left: auto;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  color: var(--text-faint);
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 1px 6px;
  white-space: nowrap;
}
.cs-empty { margin: 0; padding: 18px 16px; font-size: 13px; color: var(--text-dim); text-align: center; }
.cs-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  padding: 8px 14px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-faint);
  font-family: var(--font-mono, ui-monospace, monospace);
}
.cs-foot kbd { font-family: inherit; border: 1px solid var(--border); border-radius: 4px; padding: 0 5px; }
/* ── 四层铭牌(mono 元数据纪律)── */
.cs-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
  pointer-events: none;
  z-index: 4;
}
.cs-layers b { font-weight: 600; color: var(--text); }
@media (max-width: 720px) {
  .cs-layers { display: none; }
}
`,z=[{id:"dashboard",zh:"打开仪表盘",en:"Open dashboard",kw:"dashboard overview metrics 仪表盘",kbd:"G D"},{id:"new-project",zh:"新建项目",en:"New project",kw:"create new project 新建",kbd:"N"},{id:"search",zh:"搜索设计条目",en:"Search entries",kw:"search find 搜索",kbd:"/"},{id:"theme",zh:"切换深浅主题",en:"Toggle theme",kw:"theme dark light 主题",kbd:"T"},{id:"recipes",zh:"跳转设计配方",en:"Go to recipes",kw:"recipes composition 配方",kbd:"G R"},{id:"prompt",zh:"复制复刻 Prompt",en:"Copy replication prompt",kw:"copy prompt 复刻"},{id:"registry",zh:"查看参数注册表",en:"View parameter registry",kw:"registry params 注册表"},{id:"shortcuts",zh:"键盘快捷键",en:"Keyboard shortcuts",kw:"shortcuts keys 快捷键",kbd:"?"},{id:"export",zh:"导出当前页 PDF",en:"Export page as PDF",kw:"export pdf print 导出"},{id:"help",zh:"帮助文档",en:"Help docs",kw:"help docs guide 帮助"},{id:"share",zh:"分享当前页",en:"Share this page",kw:"share link 分享"},{id:"signout",zh:"退出登录",en:"Sign out",kw:"logout signout 退出"}];function M(f,o){if(!f)return 0;const a=f.toLowerCase(),d=o.toLowerCase();let c=0,u=0,l=-2,p=0,x=-1;for(let n=0;n<d.length&&c<a.length;n++)d[n]===a[c]&&(x<0&&(x=n),p=l===n-1?p+1:1,u+=p*2,l=n,c++);if(c<a.length)return null;x===0&&(u+=12);const h=d.length-(l+1);return u+=Math.max(12-h,0)*.5,u}const R=150,S=8;function A({locale:f}){const o=f==="zh",[a,d]=i.useState("closed"),[c,u]=i.useState(""),[l,p]=i.useState(0),[x,h]=i.useState(!1),[n,C]=i.useState(""),v=i.useRef(null),y=i.useRef(null);i.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),r=()=>h(e.matches);return r(),e.addEventListener("change",r),()=>e.removeEventListener("change",r)},[]);const m=i.useMemo(()=>{const e=c.trim(),r=z.map(s=>{const j=(o?[s.zh,s.en,s.kw]:[s.en,s.zh,s.kw]).map(g=>M(e,g)).filter(g=>g!==null);return{cmd:s,score:j.length?Math.max(...j):-1}}).filter(s=>s.score>=0);return r.sort((s,w)=>w.score-s.score),r.slice(0,S)},[c,o]);i.useEffect(()=>{const e=r=>{if((r.ctrlKey||r.metaKey)&&r.key.toLowerCase()==="k"){r.preventDefault(),d(s=>s==="closed"?"open":"closing");return}r.key==="Escape"&&a==="open"&&b()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[a]),i.useEffect(()=>{if(a==="open"){u(""),p(0);const e=window.setTimeout(()=>y.current?.focus(),0);return()=>window.clearTimeout(e)}if(a==="closing"){const e=window.setTimeout(()=>{d("closed"),v.current?.focus()},R);return()=>window.clearTimeout(e)}},[a]);const b=()=>{a==="open"&&d("closing")},k=e=>{const r=z.find(s=>s.id===e);r&&(C(o?r.zh:r.en),d("closing"))},D=e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();const r=e.key==="ArrowDown"?1:-1;p(s=>m.length?(s+r+m.length)%m.length:0);return}if(e.key==="Enter"){e.preventDefault();const r=m[l];r&&k(r.cmd.id);return}if(e.key==="Escape"){e.preventDefault(),b();return}e.key==="Tab"&&e.preventDefault()},N=a==="open";return t.jsxs("div",{className:"demo-stage",children:[t.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[t.jsx("span",{className:"stage-plate-dot"}),"Command Surface"]}),t.jsxs("div",{className:"cs-scene",children:[t.jsxs("button",{type:"button",className:"cs-trigger",ref:v,onClick:()=>d("open"),children:[o?"键入一条命令…":"Type a command…",t.jsx("kbd",{children:"Ctrl K"})]}),t.jsxs("p",{className:"cs-status",role:"status",children:[n?o?"已执行:":"Ran: ":"",n&&t.jsx("b",{children:n}),!n&&(o?"按 Ctrl K 或点击上方入口唤出面板":"Press Ctrl K or click the entry above")]}),a!=="closed"&&t.jsxs("div",{className:"cs-overlay","data-state":a,"data-reduced":x,children:[t.jsx("div",{className:"cs-backdrop",onClick:b,"aria-hidden":"true"}),t.jsxs("div",{className:"cs-panel",role:"dialog","aria-modal":"true","aria-label":o?"命令面板":"Command palette",onKeyDown:e=>{e.key==="Tab"&&e.preventDefault()},children:[t.jsx("input",{ref:y,className:"cs-input",role:"combobox","aria-expanded":"true","aria-controls":"cs-list","aria-activedescendant":N&&m[l]?`cs-opt-${m[l].cmd.id}`:void 0,"aria-label":o?"搜索命令":"Search commands",placeholder:o?"输入以筛选(支持子序列:试输入 gsm)":"Filter commands (subsequence: try gsm)",value:c,onChange:e=>{u(e.target.value),p(0)},onKeyDown:D}),m.length>0?t.jsx("ul",{className:"cs-list",id:"cs-list",role:"listbox","aria-label":o?"命令结果":"Commands",children:m.map((e,r)=>t.jsxs("li",{id:`cs-opt-${e.cmd.id}`,className:"cs-opt",role:"option","aria-selected":r===l,"data-active":r===l,onMouseDown:s=>{s.preventDefault(),k(e.cmd.id)},onMouseEnter:()=>p(r),children:[t.jsx("span",{children:o?e.cmd.zh:e.cmd.en}),e.cmd.kbd&&t.jsx("kbd",{children:e.cmd.kbd})]},e.cmd.id))}):t.jsx("p",{className:"cs-empty",children:o?`没有匹配「${c}」的命令`:`No command matches "${c}"`}),t.jsxs("p",{className:"cs-foot",children:[t.jsxs("span",{children:[t.jsx("kbd",{children:"↑"}),t.jsx("kbd",{children:"↓"})," ",o?"选择":"select"]}),t.jsxs("span",{children:[t.jsx("kbd",{children:"↵"})," ",o?"执行":"run"]}),t.jsxs("span",{children:[t.jsx("kbd",{children:"Esc"})," ",o?"关闭并归还焦点":"close & restore focus"]}),t.jsxs("span",{children:["in 200ms · out 150ms · scale 0.95 + y8 · max ",S," · subsequence"]})]})]})]}),t.jsxs("p",{className:"cs-layers","aria-hidden":"true",children:[t.jsxs("span",{children:[t.jsx("b",{children:"1"})," palette: subsequence · max 8 · Ctrl/Cmd K"]}),t.jsxs("span",{children:[t.jsx("b",{children:"2"})," overlay: in 200ms · out 150ms · scale .95 + y8"]}),t.jsxs("span",{children:[t.jsx("b",{children:"3"})," focus: trap · Esc→trigger · ↑↓ / ↵"]}),t.jsxs("span",{children:[t.jsx("b",{children:"4"})," exit: faster, never queued"]})]})]}),t.jsx("style",{children:E})]})}export{A as default};
