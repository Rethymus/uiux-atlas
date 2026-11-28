import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.DLkBFFtG.js";import{m as w}from"./react.B-ZMyTXB.js";import{g as $}from"./color.DuEPkvq5.js";import{D as z}from"./DemoStage.vW1CgYCd.js";import{u as I}from"./use-reduced-motion.p3D3Z0_d.js";import{u as D,a as F}from"./index.D2pAevM6.js";const f=36,R=10,C=8,S={bouncy:.3,snappy:.15,smooth:0},A=.5,L=(i,c,n)=>Math.min(n,Math.max(c,i)),B=`
.ss-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 6px 4px; }
.ss-lane-label { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.ss-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.ss-lane {
  position: relative; height: 56px; border-radius: 13px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer; user-select: none; touch-action: manipulation;
}
.ss-lane:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ss-end { position: absolute; top: 6px; bottom: 6px; width: ${R}px; border-radius: 5px; background: linear-gradient(180deg, oklch(0.55 0.14 250), oklch(0.45 0.14 250)); }
.ss-end-l { left: 0; } .ss-end-r { right: 0; }
.ss-ball {
  position: absolute; top: 50%; left: ${R+C}px; width: ${f}px; height: ${f}px; margin-top: -${f/2}px;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
.ss-ball-preset { background: radial-gradient(circle at 32% 28%, oklch(0.86 0.1 165), oklch(0.62 0.16 165) 60%, oklch(0.45 0.14 165)); }
.ss-ball-custom { background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30)); }
.ss-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.ss-launch {
  border: 1px solid var(--border); border-radius: 999px; padding: 5px 16px;
  font-size: 12px; cursor: pointer; background: var(--accent); color: var(--bg); border-color: transparent;
}
.ss-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;function q({entryId:i,schema:c}){const n=$(i,c),N=()=>({response:n.get("response"),dampingFraction:n.get("dampingFraction"),preset:n.get("preset")}),[r,T]=e.useState(N),l=I()===!0,k=e.useRef(null),x=D(0),g=D(0),p=e.useRef(null),u=e.useRef(0),a=e.useRef(0),h=e.useRef(!0),y=e.useRef(!1),E=e.useRef(l);E.current=l;const d=e.useMemo(()=>{const t=(2*Math.PI/r.response)**2,m=4*Math.PI*r.dampingFraction/r.response;return{stiffness:t,damping:m}},[r.response,r.dampingFraction]),M=t=>t==="preset"?{type:"spring",duration:A,bounce:S[r.preset]??.15}:{type:"spring",stiffness:d.stiffness,damping:d.damping,mass:1},b=e.useRef(M);b.current=M,e.useEffect(()=>n.subscribe(()=>{T(N())}),[n]),e.useEffect(()=>(h.current=!0,()=>{h.current=!1,p.current?.stop()}),[]);const v=()=>{const t=k.current;return t?Math.max(20,t.clientWidth-R*2-C*2-f):0},P=t=>{if(!h.current)return;const m=a.current||v();a.current=m;const o=L(t,0,m);if(u.current=o,E.current){p.current?.stop(),x.jump(o),g.jump(o);return}p.current?.stop(),p.current=F(g,o,b.current("custom")),F(x,o,b.current("preset"))};e.useEffect(()=>{a.current=v(),y.current||(y.current=!0,u.current=a.current),P(u.current)},[r,l]);const j=()=>P(u.current>0?0:a.current||v());return s.jsx(z,{entryId:i,schema:c,children:s.jsxs("div",{className:"ss-stage",children:[s.jsxs("div",{className:"ss-lane-label",children:[s.jsx("span",{children:"预设 Preset"}),s.jsxs("span",{className:"ss-tag",children:[r.preset," · bounce ",S[r.preset]," · ",A,"s"]})]}),s.jsxs("div",{className:"ss-lane",ref:k,role:"button",tabIndex:0,"aria-label":"发射弹簧 launch the springs",onClick:j,onKeyDown:t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),j())},children:[s.jsx("div",{className:"ss-end ss-end-l"}),s.jsx("div",{className:"ss-end ss-end-r"}),s.jsx(w.div,{className:"ss-ball ss-ball-preset",style:{x}})]}),s.jsxs("div",{className:"ss-lane-label",children:[s.jsx("span",{children:"自定义 Custom"}),s.jsxs("span",{className:"ss-tag",children:["stiffness ≈ ",Math.round(d.stiffness)," · damping ≈ ",d.damping.toFixed(1)," · mass 1"]})]}),s.jsxs("div",{className:"ss-lane","aria-hidden":"true",children:[s.jsx("div",{className:"ss-end ss-end-l"}),s.jsx("div",{className:"ss-end ss-end-r"}),s.jsx(w.div,{className:"ss-ball ss-ball-custom",style:{x:g}})]}),s.jsxs("div",{className:"ss-footer",children:[s.jsx("button",{type:"button",className:"ss-launch",onClick:j,children:"发射 Launch"}),l&&s.jsx("span",{className:"ss-tag",children:"reduced-motion: 直出终态 / final state only"})]}),s.jsx("p",{className:"ss-hint",children:"上轨按 Apple 官方预设定义(duration 0.5s + bounce 0.3/0.15/0),下轨由 response/dampingFraction 换算驱动; 两轨同目标同发射,手感差异即两套参数体系的差异 / Top lane follows Apple's official preset definitions; bottom lane is driven by the response/dampingFraction conversion. Same target, same launch — the gap is the parameter systems'."}),s.jsx("style",{children:B})]})})}export{q as default};
