import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{m as T}from"./react.B-ZMyTXB.js";import{g as A}from"./color.DuEPkvq5.js";import{D as K}from"./DemoStage.vW1CgYCd.js";import{u as F}from"./use-reduced-motion.p3D3Z0_d.js";import{u as W,a as E}from"./index.D2pAevM6.js";import{u as B}from"./use-motion-value-event.BzwpVzzV.js";const f=40,M=10,G=6,O=1500,R=(m,x,a)=>Math.min(a,Math.max(x,m)),U=`
.ig-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; padding: 20px; }
.ig-lane {
  position: relative;
  height: 72px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.ig-lane:active { cursor: grabbing; }
.ig-lane:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ig-wall {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: ${M}px;
  border-radius: 5px;
  background: linear-gradient(180deg, oklch(0.55 0.14 250), oklch(0.45 0.14 250));
}
.ig-wall-l { left: 0; }
.ig-wall-r { right: 0; }
.ig-marker {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 50%;
  width: 0;
  border-left: 2px dashed var(--accent);
  opacity: 0.85;
  pointer-events: none;
}
.ig-marker::after {
  content: "落点 landing";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  white-space: nowrap;
  color: var(--accent);
}
.ig-ball {
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${f}px;
  height: ${f}px;
  margin: -${f/2}px 0 0 -${f/2}px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
.ig-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.ig-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ig-chip-warn { border-color: var(--accent); color: var(--accent); }
.ig-actions { display: flex; align-items: center; gap: 10px; }
.ig-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.ig-btn:hover { border-color: var(--accent); color: var(--accent); }
.ig-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;function te({entryId:m,schema:x}){const a=A(m,x),C=()=>({power:a.get("power"),timeConstant:a.get("timeConstant")}),[h,$]=r.useState(C),[d,v]=r.useState(null),w=F()===!0,N=r.useRef(null),y=r.useRef(null),n=W(0),c=r.useRef(null),l=r.useRef(null),I=r.useRef(1),u=r.useRef(0),P=r.useRef(!1),s=r.useRef(h);s.current=h;const b=r.useRef(w);b.current=w,r.useEffect(()=>a.subscribe(()=>{$(C())}),[a]),r.useEffect(()=>()=>{c.current?.stop()},[]);const g=()=>{const e=N.current;return e?Math.max(20,e.clientWidth/2-M-G-f/2):0},j=(e,o)=>{const i=u.current||g(),p=e+s.current.power*o;return{x:R(p,-i,i),oob:Math.abs(p)>i}},k=()=>{const e=u.current||g(),o=n.get(),i=n.getVelocity();if(v(j(o,i)),c.current?.stop(),b.current){n.jump(j(o,i).x);return}c.current=E(n,0,{type:"inertia",power:s.current.power,timeConstant:s.current.timeConstant,min:-e,max:e,bounceStiffness:500,bounceDamping:10})},D=()=>{const e=u.current||g(),o=I.current;I.current=-o;const i=n.get(),p=O*o;if(v(j(i,p)),c.current?.stop(),b.current){n.jump(R(i+s.current.power*p,-e,e));return}c.current=E(n,0,{type:"inertia",velocity:p,power:s.current.power,timeConstant:s.current.timeConstant,min:-e,max:e,bounceStiffness:500,bounceDamping:10})};r.useEffect(()=>{if(u.current=g(),!P.current){P.current=!0,n.jump(-u.current);return}!l.current&&!b.current&&k()},[h]),B(n,"change",()=>{y.current&&(y.current.textContent=`${Math.round(Math.abs(n.getVelocity()))} px/s`)});const L=e=>{c.current?.stop(),v(null),l.current={pointerId:e.pointerId,startX:e.clientX,startVal:n.get()},e.currentTarget.setPointerCapture(e.pointerId)},V=e=>{const o=l.current;if(!o||o.pointerId!==e.pointerId)return;const i=u.current||g();n.set(R(o.startVal+(e.clientX-o.startX),-i,i))},S=e=>{l.current?.pointerId===e.pointerId&&(l.current=null,e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),k())},X=()=>{l.current=null,k()},z=e=>{e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),D())};return t.jsxs(K,{entryId:m,schema:x,children:[t.jsxs("div",{className:"ig-stage",children:[t.jsxs("div",{className:"ig-lane",ref:N,onPointerDown:L,onPointerMove:V,onPointerUp:S,onPointerCancel:X,onKeyDown:z,role:"button",tabIndex:0,"aria-label":"惯性轨道:按住拖拽跟手,松手惯性滑行;回车触发固定速度甩动 / inertia lane: drag to track the pointer, release to glide; Enter flicks with fixed velocity",children:[t.jsx("div",{className:"ig-wall ig-wall-l"}),t.jsx("div",{className:"ig-wall ig-wall-r"}),d&&t.jsx("div",{className:"ig-marker",style:{transform:`translateX(${d.x}px)`}}),t.jsx(T.div,{className:"ig-ball",style:{x:n}})]}),t.jsxs("div",{className:"ig-readout",children:[t.jsxs("span",{className:"ig-chip",children:["|velocity| ",t.jsx("span",{ref:y,children:"0 px/s"})]}),d&&t.jsx("span",{className:`ig-chip${d.oob?" ig-chip-warn":""}`,children:d.oob?"越界 → 边界弹簧拉回 / out of bounds → boundary spring":"落点在界内 / lands in bounds"}),w&&t.jsx("span",{className:"ig-chip",children:"reduced-motion: 释放直出落点 / release lands directly"})]}),t.jsx("div",{className:"ig-actions",children:t.jsx("button",{type:"button",className:"ig-btn",onClick:D,children:"甩一下 Flick"})}),t.jsx("p",{className:"ig-hint",children:"按住球拖拽跟手,快速松手看惯性滑行;虚线是按「起点 + power × 释放速度」预测的落点,出界会被墙上的边界弹簧拉回 / drag the ball, release fast to glide; the dashed line is the predicted landing (origin + power × release velocity), out-of-bounds glides are caught by the wall's boundary spring."})]}),t.jsx("style",{children:U})]})}export{te as default};
