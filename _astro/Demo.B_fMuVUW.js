import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as j}from"./color.DuEPkvq5.js";import{D as N}from"./DemoStage.vW1CgYCd.js";const u=["收件箱 Inbox","日程 Calendar","备忘 Notes","待办 Tasks","归档 Archive"],f={up:"translateY(14px)",down:"translateY(-14px)",left:"translateX(14px)",right:"translateX(-14px)",fade:"none"},k=`
.ch-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.ch-stage {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 5%, var(--surface));
  display: flex; align-items: center; justify-content: center;
}
.ch-list { display: flex; flex-direction: column; gap: 8px; width: min(320px, calc(100% - 32px)); }
.ch-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-radius: 10px;
  border: 1px solid var(--border); background: var(--surface);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
}
.ch-dot { width: 8px; height: 8px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 70%, transparent); }
.ch-item span { font-size: 13px; }
.ch-in { animation: ch-enter var(--ch-dur, 250ms) cubic-bezier(0, 0, 0, 1) both; }
.ch-out { animation: ch-exit var(--ch-dur, 200ms) cubic-bezier(0.3, 0, 1, 1) both; }
@keyframes ch-enter {
  from { opacity: 0; transform: var(--ch-from); }
  to { opacity: 1; transform: none; }
}
@keyframes ch-exit {
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: var(--ch-from); }
}
.ch-scene[data-reduced="true"] .ch-item { --ch-from: none; }
.ch-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.ch-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.ch-chip-official { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.ch-btn {
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
`;function M({entryId:i,schema:d}){const c=j(i,d),p=()=>({stagger:c.get("stagger"),direction:c.get("direction")}),[s,g]=t.useState(p),[n,l]=t.useState("in"),[b,h]=t.useState(0),[m,v]=t.useState(!1);t.useEffect(()=>c.subscribe(()=>{g(p()),l("in"),h(r=>r+1)}),[c]),t.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>v(r.matches);return a(),r.addEventListener("change",a),()=>r.removeEventListener("change",a)},[]);const o=u.length,y=s.stagger*(o-1),x=r=>{l(r),h(a=>a+1)};return e.jsx(N,{entryId:i,schema:d,children:e.jsxs("div",{className:"ch-scene","data-reduced":m,children:[e.jsx("div",{className:"ch-stage",children:e.jsx("ul",{className:"ch-list","aria-label":"编排演示列表 Choreography demo list",children:u.map((r,a)=>e.jsxs("li",{className:`ch-item ${n==="in"?"ch-in":"ch-out"}`,style:{"--ch-from":f[s.direction]??f.up,"--ch-dur":n==="in"?"250ms":"200ms",animationDelay:`${(n==="in"?a:o-1-a)*s.stagger}ms`},children:[e.jsx("span",{className:"ch-dot","aria-hidden":"true"}),e.jsx("span",{children:r})]},`${n}-${b}-${a}`))})}),e.jsxs("div",{className:"ch-readout",children:[e.jsx("button",{type:"button",className:"ch-btn",onClick:()=>x("in"),children:"播放入场 Enter"}),e.jsx("button",{type:"button",className:"ch-btn",onClick:()=>x("out"),children:"播放退场 Exit"}),e.jsxs("span",{className:"ch-chip",children:["delay = i × ",s.stagger,"ms"]}),e.jsxs("span",{className:"ch-chip",children:["spread = ",s.stagger," × ",o-1," = ",y,"ms"]}),e.jsx("span",{className:"ch-chip ch-chip-official",children:"入 250ms std-decel / 出 200ms std-accel(官方配对)"}),e.jsxs("span",{className:"ch-chip",children:["direction: ",s.direction]}),m&&e.jsx("span",{className:"ch-chip",children:"reduced-motion: 纯 opacity 交错淡入 / opacity-only stagger"})]}),e.jsx("style",{children:k})]})})}export{M as default};
