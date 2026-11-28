import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";import{u as j}from"./use-reduced-motion.p3D3Z0_d.js";const w=s=>`cubic-bezier(${s[0]}, ${s[1]}, ${s[2]}, ${s[3]})`,N=`
.cb-scene { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 4px 6px; }
.cb-row { display: flex; gap: 20px; align-items: center; }
.cb-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.cb-track {
  position: relative; height: 60px; border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer;
}
.cb-track:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.cb-ball {
  position: absolute; top: 50%; left: 10px; width: 40px; height: 40px; margin-top: -20px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  animation: cb-run 1.6s var(--cb-curve, cubic-bezier(0.25, 0.1, 0.25, 1)) infinite alternate;
}
@keyframes cb-run { from { transform: translateX(0); } to { transform: translateX(var(--cb-dist, 300px)); } }
.cb-preview {
  flex: 0 0 auto; border: 1px solid var(--border); border-radius: 10px;
  background: var(--surface); overflow: hidden;
}
.cb-preview svg { display: block; }
.cb-dot-x { animation: cb-dot-x 1.6s linear infinite alternate; }
.cb-dot-y { animation: cb-dot-y 1.6s var(--cb-curve, cubic-bezier(0.25, 0.1, 0.25, 1)) infinite alternate; }
@keyframes cb-dot-x { from { transform: translateX(0px); } to { transform: translateX(100px); } }
@keyframes cb-dot-y { from { transform: translateY(0px); } to { transform: translateY(-100px); } }
.cb-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.cb-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.cb-note { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
.cb-replay {
  margin-left: auto; border: 1px solid var(--border); border-radius: 999px;
  padding: 4px 14px; font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
.cb-scene[data-reduced="true"] .cb-ball { animation: none; transform: translateX(var(--cb-dist, 300px)); }
.cb-scene[data-reduced="true"] .cb-dot-x { animation: none; transform: translateX(100px); }
.cb-scene[data-reduced="true"] .cb-dot-y { animation: none; transform: translateY(-100px); }
`;function E({entryId:s,schema:l}){const o=g(s,l),[r,m]=a.useState(()=>[...o.get("curve")]),[d,n]=a.useState(0),[x,h]=a.useState(300),b=j()===!0,p=a.useRef(null),c=a.useRef(null);a.useEffect(()=>o.subscribe(()=>{m([...o.get("curve")])}),[o]),a.useEffect(()=>{const t=p.current,i=c.current;if(!t||!i)return;const u=()=>h(Math.max(40,t.clientWidth-10-40));u();const f=new ResizeObserver(u);return f.observe(t),()=>f.disconnect()},[]),a.useEffect(()=>{c.current&&c.current.style.setProperty("--cb-dist",`${x}px`)},[x]);const v=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),n(i=>i+1))},y=a.useMemo(()=>e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:0,y1:100,x2:100,y2:0,stroke:"var(--border-strong)",strokeWidth:1,strokeDasharray:"3 3"}),e.jsx("line",{x1:0,y1:0,x2:100,y2:0,stroke:"var(--border)",strokeWidth:1}),e.jsx("line",{x1:0,y1:100,x2:100,y2:100,stroke:"var(--border)",strokeWidth:1})]}),[]);return e.jsx(k,{entryId:s,schema:l,children:e.jsxs("div",{className:"cb-scene",ref:c,"data-reduced":b,children:[e.jsxs("div",{className:"cb-row",children:[e.jsxs("div",{className:"cb-main",children:[e.jsx("div",{className:"cb-track",ref:p,role:"button",tabIndex:0,"aria-label":"重播缓动演示 replay the easing demo",onClick:()=>n(t=>t+1),onKeyDown:v,children:e.jsx("div",{className:"cb-ball"},`ball-${d}`)}),e.jsxs("div",{className:"cb-meta",children:[e.jsx("span",{className:"cb-chip",children:w(r)}),b&&e.jsx("span",{className:"cb-chip",children:"reduced-motion: 直出终态 / final state only"})]}),e.jsx("p",{className:"cb-note",children:"球与右侧示踪点消费同一曲线,水平轴=时间、垂直轴=进度;越过顶线即过冲 / The ball and the tracer share one curve: x = time, y = progress; crossing the top line means overshoot."})]}),e.jsx("div",{className:"cb-preview",children:e.jsxs("svg",{width:96,height:173,viewBox:"0 -40 100 180",role:"img","aria-label":"cubic-bezier 曲线预览 curve preview",children:[e.jsx("rect",{x:0,y:-40,width:100,height:40,fill:"oklch(0.62 0.16 25 / 0.12)"}),e.jsx("rect",{x:0,y:100,width:100,height:40,fill:"oklch(0.62 0.16 25 / 0.08)"}),y,e.jsx("line",{x1:0,y1:100,x2:r[0]*100,y2:(1-r[1])*100,stroke:"var(--border-strong)",strokeWidth:1}),e.jsx("line",{x1:100,y1:0,x2:r[2]*100,y2:(1-r[3])*100,stroke:"var(--border-strong)",strokeWidth:1}),e.jsx("path",{d:`M 0 100 C ${r[0]*100} ${(1-r[1])*100}, ${r[2]*100} ${(1-r[3])*100}, 100 0`,fill:"none",stroke:"var(--accent)",strokeWidth:2.5}),e.jsx("circle",{cx:r[0]*100,cy:(1-r[1])*100,r:3,fill:"var(--accent)"}),e.jsx("circle",{cx:r[2]*100,cy:(1-r[3])*100,r:3,fill:"var(--accent)"}),e.jsx("g",{className:"cb-dot-x",children:e.jsx("circle",{className:"cb-dot-y",cx:0,cy:100,r:4.5,fill:"oklch(0.62 0.2 40)",stroke:"var(--bg)",strokeWidth:1.5})},`dot-${d}`)]})})]}),e.jsx("button",{type:"button",className:"cb-replay",onClick:()=>n(t=>t+1),children:"重播 Replay"}),e.jsx("style",{children:N})]})})}export{E as default};
