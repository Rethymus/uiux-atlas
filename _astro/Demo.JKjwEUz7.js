import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as J}from"./color.DuEPkvq5.js";import{D as Q}from"./DemoStage.vW1CgYCd.js";const ee=1500,A=.25,te=.5,re=.5,ne=8e3,z=(i,a)=>Math.min(a,Math.max(-a,i)),C=(i,a)=>{const o=a/(2*Math.sqrt(i)),m=o<1?Math.exp(-Math.PI*o/Math.sqrt(1-o*o))*100:0;return{zeta:Math.round(o*1e3)/1e3,overshoot:Math.round(m*10)/10}},se=`
.hc-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 20px; overflow: hidden; }
.hc-lane {
  position: relative;
  flex: 1;
  min-height: 64px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.hc-lane:active { cursor: grabbing; }
.hc-lane:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.hc-marker {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 50%;
  width: 0;
  border-left: 2px dashed var(--accent);
  opacity: 0.85;
  pointer-events: none;
}
.hc-marker::after {
  content: "目标 target";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  white-space: nowrap;
  color: var(--accent);
}
.hc-puck {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  margin: -24px 0 0 -24px;
  border-radius: 12px;
  background: linear-gradient(135deg, oklch(0.72 0.13 250), oklch(0.5 0.15 262));
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
.hc-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.hc-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.hc-chip-warn { border-color: oklch(0.65 0.16 60); color: oklch(0.55 0.14 60); }
.hc-actions { display: flex; align-items: center; gap: 10px; }
.hc-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.hc-btn:hover { border-color: var(--accent); color: var(--accent); }
.hc-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;function le({entryId:i,schema:a}){const o=J(i,a),m=()=>({stiffness:o.get("stiffness"),damping:o.get("damping"),handoff:o.get("handoff")}),[x,F]=r.useState(m),[R,L]=r.useState(!1),[_,$]=r.useState(()=>C(x.stiffness,x.damping)),[u,k]=r.useState(null),E=r.useRef(null),I=r.useRef(null),M=r.useRef(null),c=r.useRef(0),s=r.useRef(0),d=r.useRef(0),l=r.useRef(null),q=r.useRef(0),g=r.useRef(x);g.current=x;const y=r.useRef(R);y.current=R;const N=r.useRef(1);r.useEffect(()=>o.subscribe(()=>{const e=m();F(e),$(C(e.stiffness,e.damping))}),[o]),r.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>L(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]),r.useEffect(()=>()=>cancelAnimationFrame(d.current),[]);const V=()=>{const e=E.current;return e?Math.max(20,e.clientWidth/2-8-24):0},v=()=>{const e=I.current;e&&(e.style.transform=`translate3d(${c.current}px, 0, 0)`),M.current&&(M.current.textContent=`${Math.round(Math.abs(s.current))} px/s`)},S=e=>{cancelAnimationFrame(d.current);const t=g.current.handoff==="on";if(k({v:Math.round(Math.abs(e)),inherited:t}),y.current){c.current=0,s.current=0,v();return}s.current=t?e:0;const w=g.current.stiffness,p=g.current.damping,f=performance.now();let h=f;const b=j=>{const T=Math.min((j-h)/1e3,.03333333333333333);h=j;const Y=-w*c.current-p*s.current;s.current+=Y*T,c.current+=s.current*T,v();const B=Math.abs(s.current)<te&&Math.abs(c.current)<re,H=j-f>ne;!B&&!H?d.current=requestAnimationFrame(b):(c.current=0,s.current=0,v())};d.current=requestAnimationFrame(b)},P=()=>{const e=z(s.current,4e3);S(e)},K=e=>{cancelAnimationFrame(d.current),k(null),s.current=0,l.current={pointerId:e.pointerId,startX:e.clientX,startVal:c.current,lastX:e.clientX,lastT:performance.now()},e.currentTarget.setPointerCapture(e.pointerId)},O=e=>{const t=l.current;if(!t||t.pointerId!==e.pointerId)return;const w=q.current||V(),p=z(t.startVal+(e.clientX-t.startX),w),f=performance.now(),h=f-t.lastT;if(h>0){const b=(p-t.lastX)/h*1e3;s.current=s.current*(1-A)+b*A,t.lastX=p,t.lastT=f}c.current=p,v()},Z=e=>{const t=l.current;!t||t.pointerId!==e.pointerId||(l.current=null,e.currentTarget.hasPointerCapture(e.pointerId)&&e.currentTarget.releasePointerCapture(e.pointerId),P())},G=()=>{l.current&&(l.current=null,P())},X=()=>{const e=N.current;N.current=-e,k(null),S(ee*e)},U=e=>{e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),X())},{zeta:D,overshoot:W}=_;return n.jsxs(Q,{entryId:i,schema:a,children:[n.jsxs("div",{className:"hc-stage",children:[n.jsxs("div",{className:"hc-lane",ref:E,onPointerDown:K,onPointerMove:O,onPointerUp:Z,onPointerCancel:G,onKeyDown:U,role:"button",tabIndex:0,"aria-label":"接力轨道:按住拖拽跟手,松手交给弹簧;回车触发固定速度甩动 / handoff lane: drag to track, release to spring; Enter flicks",children:[n.jsx("div",{className:"hc-marker"}),n.jsx("div",{className:"hc-puck",ref:I})]}),n.jsxs("div",{className:"hc-readout",children:[n.jsxs("span",{className:"hc-chip",children:["|v| ",n.jsx("span",{ref:M,children:"0 px/s"})]}),n.jsxs("span",{className:"hc-chip",children:["ζ ",D," · 预计过冲 ",D>=1?"0(过阻尼 / over-damped)":`≈${W}%`]}),u&&n.jsx("span",{className:`hc-chip${u.inherited?"":" hc-chip-warn"}`,children:u.inherited?`释放 ${u.v} px/s → 速度已交接 / velocity handed over`:`释放 ${u.v} px/s → 归零重启(反例)/ restarted from rest`}),R&&n.jsx("span",{className:"hc-chip",children:"reduced-motion: 释放直出落点 / release lands directly"})]}),n.jsx("div",{className:"hc-actions",children:n.jsx("button",{type:"button",className:"hc-btn",onClick:X,children:"甩一下 Flick"})}),n.jsx("p",{className:"hc-hint",children:"慢慢拖再松手:方块几乎原地归位;快甩再松手:速度一起交棒,弹簧带着惯性冲过头再收住。切 handoff=off 对照——同样的甩动,回程明显「没劲」,这就是 duration-based「从静止重启」的代价 / drag slowly and let go: the block settles in place; flick hard and release: the velocity hands over and the spring overshoots before settling. Switch handoff=off for the contrast — the same flick returns lifeless: the cost of restarting from rest."})]}),n.jsx("style",{children:se})]})}export{le as default};
