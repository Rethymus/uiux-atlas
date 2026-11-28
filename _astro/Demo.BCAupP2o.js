import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as P}from"./color.DuEPkvq5.js";import{D as $}from"./DemoStage.vW1CgYCd.js";const z=`
.mg-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 18px 20px; overflow: hidden; }
.mg-field {
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--border);
  border-radius: 14px;
  background: color-mix(in srgb, var(--surface) 55%, transparent);
  overflow: hidden;
}
.mg-btn {
  width: 132px;
  height: 132px;
  border: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, oklch(0.78 0.12 250), oklch(0.56 0.17 262) 62%, oklch(0.46 0.16 268));
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  will-change: translate;
}
.mg-btn:hover { box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32); }
.mg-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.mg-btn:active { filter: brightness(0.92); }
.mg-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; font-size: 12px; color: var(--text-dim); }
.mg-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.mg-chip-accent { border-color: var(--accent); color: var(--accent); }
.mg-chip-warn { border-color: oklch(0.65 0.16 60); color: oklch(0.55 0.14 60); }
.mg-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
/* 降级双保险(补研 12§5 CSS 片段) */
@media (prefers-reduced-motion: reduce), (hover: none) {
  .mg-btn { translate: none !important; }
}
`;function X({entryId:y,schema:R}){const i=P(y,R),w=()=>({radius:i.get("radius"),lerp:i.get("lerp"),mode:i.get("mode")}),[u,E]=r.useState(w),[d,N]=r.useState(!1),[b,k]=r.useState(!1),C=r.useRef(null),h=r.useRef(null),a=r.useRef(null),l=r.useRef(null),f=r.useRef({x:0,y:0}),j=r.useRef({x:0,y:0}),x=r.useRef(0),g=r.useRef(!1),p=r.useRef(u);p.current=u;const L=r.useRef(d);L.current=d;const v=r.useRef(()=>{});r.useEffect(()=>i.subscribe(()=>{E(w())}),[i]),r.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)"),t=window.matchMedia("(hover: none)"),e=()=>{N(s.matches),k(t.matches)};return e(),s.addEventListener("change",e),t.addEventListener("change",e),()=>{s.removeEventListener("change",e),t.removeEventListener("change",e)}},[]);const c=u.mode==="magnet"&&!d&&!b;v.current=()=>{const s=p.current.lerp,t=j.current,e=f.current;t.x+=(e.x-t.x)*s,t.y+=(e.y-t.y)*s;const o=h.current;o&&(o.style.translate=`${t.x.toFixed(2)}px ${t.y.toFixed(2)}px`),a.current&&(a.current.textContent=`${Math.round(t.x)}, ${Math.round(t.y)} px`);const m=Math.abs(e.x)<.2&&Math.abs(e.y)<.2&&Math.abs(t.x-e.x)<.2&&Math.abs(t.y-e.y)<.2;if(l.current&&(l.current.textContent=m?"回位 released":"吸住 attracted"),m&&e.x===0&&e.y===0){t.x=0,t.y=0,o&&(o.style.translate="0px 0px"),a.current&&(a.current.textContent="0, 0 px"),g.current=!1;return}x.current=requestAnimationFrame(()=>v.current())};const M=()=>{g.current||(g.current=!0,x.current=requestAnimationFrame(()=>v.current()))};r.useEffect(()=>{if(c)return;cancelAnimationFrame(x.current),g.current=!1,f.current={x:0,y:0},j.current={x:0,y:0};const s=h.current;s&&(s.style.translate="0px 0px"),a.current&&(a.current.textContent="0, 0 px"),l.current&&(l.current.textContent="关闭 off")},[c]),r.useEffect(()=>()=>cancelAnimationFrame(x.current),[]);const S=s=>{if(!c||s.pointerType==="touch")return;const t=h.current;if(!t)return;const e=t.getBoundingClientRect(),o=s.clientX-(e.left+e.width/2),m=s.clientY-(e.top+e.height/2),q=Math.hypot(o,m),A=Math.max(e.width,e.height)/2/(1-p.current.radius);q<A?f.current={x:o*p.current.radius,y:m*p.current.radius}:f.current={x:0,y:0},M()},F=()=>{f.current={x:0,y:0},c&&M()};return n.jsxs($,{entryId:y,schema:R,children:[n.jsxs("div",{className:"mg-stage",children:[n.jsx("div",{className:"mg-field",ref:C,onPointerMove:S,onPointerLeave:F,"data-plain":!c||void 0,children:n.jsx("button",{type:"button",className:"mg-btn",ref:h,children:"磁吸 Magnetic"})}),n.jsxs("div",{className:"mg-readout",children:[n.jsxs("span",{className:"mg-chip",children:["偏移 offset ",n.jsx("span",{ref:a,children:"0, 0 px"})]}),n.jsxs("span",{className:"mg-chip",children:["状态 state ",n.jsx("span",{ref:l,children:c?"待命 idle":"关闭 off"})]}),n.jsxs("span",{className:"mg-chip",children:["radius ",u.radius," · lerp ",u.lerp]}),d&&n.jsx("span",{className:"mg-chip mg-chip-warn",children:"prefers-reduced-motion: 磁吸关闭 / magnetism off"}),b&&n.jsx("span",{className:"mg-chip mg-chip-warn",children:"(hover: none) 触屏直出普通 hover / touch degrades"}),!c&&!d&&!b&&n.jsx("span",{className:"mg-chip mg-chip-accent",children:"mode=plain:降级形态预览 / degraded preview"})]}),n.jsx("p",{className:"mg-hint",children:"用鼠标在虚线框内移动:按钮在吸引半径内按 radius 比例被吸向指针,离开即 lerp 回位。触屏与 reduced-motion 用户看到的就是 plain 形态——炫技不伤人 / move the mouse inside the dashed field: inside the attraction radius the button leans toward the pointer by the radius factor, then lerps back on exit; touch and reduced-motion users simply get the plain hover — flourish without harm."})]}),n.jsx("style",{children:z})]})}export{X as default};
