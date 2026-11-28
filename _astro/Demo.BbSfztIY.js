import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.DLkBFFtG.js";import{m as T}from"./react.B-ZMyTXB.js";import{g as B}from"./color.DuEPkvq5.js";import{D as C}from"./DemoStage.vW1CgYCd.js";import{u as S}from"./use-reduced-motion.p3D3Z0_d.js";import{u as P,a as V}from"./index.D2pAevM6.js";import{u as z}from"./use-motion-value-event.BzwpVzzV.js";const f=34,M=10,I=6,K=.3,k=(x,g,a)=>Math.min(a,Math.max(g,x)),O=`
.ms-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; padding: 20px; }
.ms-track {
  position: relative;
  height: 64px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
}
.ms-wall {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: ${M}px;
  border-radius: 5px;
  background: linear-gradient(180deg, oklch(0.55 0.14 250), oklch(0.45 0.14 250));
}
.ms-wall-l { left: 0; }
.ms-wall-r { right: 0; }
.ms-ball {
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
.ms-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; font-size: 12px; color: var(--text-dim); }
.ms-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ms-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
.ms-track:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
`;function J({entryId:x,schema:g}){const a=B(x,g),j=()=>({mode:a.get("mode"),stiffness:a.get("stiffness"),damping:a.get("damping"),mass:a.get("mass"),bounce:a.get("bounce")}),[c,A]=e.useState(j),u=S()===!0,v=e.useRef(null),R=e.useRef(null),i=P(0),l=e.useRef(null),m=e.useRef(0),n=e.useRef(0),h=e.useRef(!0),y=e.useRef(!1),w=e.useRef(u);w.current=u;const N=e.useMemo(()=>c.mode==="durationBased"?{type:"spring",bounce:c.bounce,duration:K}:{type:"spring",stiffness:c.stiffness,damping:c.damping,mass:c.mass},[c]),E=e.useRef(N);E.current=N,e.useEffect(()=>a.subscribe(()=>{A(j())}),[a]),e.useEffect(()=>(h.current=!0,()=>{h.current=!1,l.current?.stop()}),[]);const p=()=>{const r=v.current;return r?Math.max(10,r.clientWidth/2-M-I-f/2):0},b=r=>{if(!h.current)return;const s=n.current||p();n.current=s;const o=k(r,-s,s);m.current=o,l.current?.stop();const d=V(i,o,E.current);l.current=d,d.then(()=>{!h.current||w.current||l.current===d&&b(o>=0?-s:s)})};e.useEffect(()=>{if(n.current=p(),u){l.current?.stop(),i.jump(k(m.current,-n.current,n.current));return}if(!y.current){y.current=!0,i.jump(-n.current),b(n.current);return}b(m.current)},[c,u]),z(i,"change",()=>{R.current&&(R.current.textContent=`${Math.round(Math.abs(i.getVelocity()))} px/s`)});const $=r=>{const s=v.current;if(!s)return;const o=s.getBoundingClientRect(),d=r.clientX-o.left-o.width/2;D(d)},D=r=>{const s=n.current||p(),o=k(r,-s,s);if(m.current=o,u){l.current?.stop(),i.jump(o);return}b(o)},L=r=>{r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),D(m.current>=0?-(n.current||p()):n.current||p()))};return t.jsxs(C,{entryId:x,schema:g,children:[t.jsxs("div",{className:"ms-stage",children:[t.jsxs("div",{className:"ms-track",ref:v,onClick:$,onKeyDown:L,role:"button",tabIndex:0,"aria-label":"弹簧目标:点击轨道改目标,回车弹向对侧墙 / spring target: click the lane to retarget, Enter bounces to the opposite wall",children:[t.jsx("div",{className:"ms-wall ms-wall-l"}),t.jsx("div",{className:"ms-wall ms-wall-r"}),t.jsx(T.div,{className:"ms-ball",style:{x:i}})]}),t.jsxs("div",{className:"ms-readout",children:[t.jsxs("span",{className:"ms-chip",children:["|velocity| ",t.jsx("span",{ref:R,children:"0 px/s"})]}),t.jsx("span",{className:"ms-chip",children:c.mode==="physics"?"打断后续接当前速度 / resumes from current velocity":"打断后速度归零重启 / velocity resets on interrupt"}),u&&t.jsx("span",{className:"ms-chip",children:"reduced-motion: 直出终态 / final state only"})]}),t.jsx("p",{className:"ms-hint",children:"点击轨道任意位置改目标 / click anywhere on the lane to retarget。 文档标注默认 stiffness=1 + damping=10 为强过阻尼、近乎冻结——把 stiffness 拖到约 150 感受经典弹簧;The doc-annotated stiffness=1 is heavily overdamped — raise it to ~150."})]}),t.jsx("style",{children:O})]})}export{J as default};
