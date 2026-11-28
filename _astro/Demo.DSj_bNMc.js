import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as u}from"./index.DLkBFFtG.js";import{g as y}from"./color.DuEPkvq5.js";import{D as j}from"./DemoStage.vW1CgYCd.js";const v=34,w=.0017;function N(r,x){const a=.004166666666666667,o=.008,e=[{t:0,p:0}];let n=0,l=0,i=0,d=o,f=0;for(;i<6;){const h=-r*(n-1)-x*l;if(l+=h*a,n+=l*a,i+=a,i>=d&&(e.push({t:i,p:n}),d+=o),Math.abs(n-1)<.002&&Math.abs(l)<.02?f+=a:f=0,f>=.02)break}return e.push({t:i,p:1}),e}function $(r,x){if(r.length<=2)return r;const a=new Array(r.length).fill(!1);a[0]=!0,a[r.length-1]=!0;const o=[[0,r.length-1]];for(;o.length>0;){const e=o.pop();if(!e)break;const[n,l]=e;if(l-n<2)continue;const i=r[n],d=r[l],f=d.t-i.t,h=d.p-i.p,b=Math.hypot(f,h)||1e-9;let c=0,g=-1;for(let t=n+1;t<l;t++){const p=r[t],m=Math.abs(h*(p.t-i.t)-f*(p.p-i.p))/b;m>c&&(c=m,g=t)}c>x&&g>0&&(a[g]=!0,o.push([n,g],[g,l]))}return r.filter((e,n)=>a[n])}function E(r,x){const a=r.length,o=[];for(let e=0;e<a;e++){const n=r[e];if(e===0){o.push("0");continue}if(e===a-1){o.push("1");continue}const l=String(Math.round(n.p*1e3)/1e3),i=x>0?n.t/x*100:0,d=e/(a-1)*100;Math.abs(i-d)>.05?o.push(`${l} ${i.toFixed(2)}%`):o.push(l)}return`linear(${o.join(", ")})`}const S=`
.le-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 20px;
}
.le-tracks { display: grid; gap: 18px; }
.le-track {
  position: relative;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--border) 30%, transparent);
}
.le-goal {
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: calc(100% - ${v}px);
  border-left: 2px dashed var(--accent);
}
.le-goal::after {
  content: "终点 target";
  position: absolute;
  top: -16px;
  left: -34px;
  font-size: 10px;
  white-space: nowrap;
  color: var(--accent);
}
.le-box {
  position: absolute;
  top: 50%;
  left: 0;
  width: ${v}px;
  height: 30px;
  margin-top: -15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  animation: le-slide var(--le-duration, 1s) var(--spring-easing, linear) both;
}
.le-box-spring { background: linear-gradient(135deg, oklch(0.66 0.16 250), oklch(0.5 0.18 300)); }
.le-box-ease {
  background: linear-gradient(135deg, oklch(0.74 0.1 85), oklch(0.6 0.12 60));
  animation-timing-function: ease;
}
.le-tag {
  position: absolute;
  top: -20px;
  left: 2px;
  font-size: 11px;
  color: var(--text-faint);
}
@keyframes le-slide {
  from { transform: translateX(0); }
  to { transform: translateX(var(--le-travel, 240px)); }
}
.le-code {
  margin: 0;
  max-height: 150px;
  overflow: auto;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  font-size: 11px;
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-wrap;
  color: var(--text-dim);
}
.le-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.le-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.le-actions { display: flex; align-items: center; gap: 10px; }
.le-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.le-btn:hover { border-color: var(--accent); color: var(--accent); }
.le-hint { font-size: 12px; color: var(--text-faint); line-height: 1.5; }
@media (prefers-reduced-motion: reduce) {
  .le-box { animation: none; transform: translateX(var(--le-travel, 240px)); }
}
`;function L({entryId:r,schema:x}){const a=y(r,x),o=()=>({stiffness:a.get("stiffness"),damping:a.get("damping")}),[e,n]=u.useState(o),[l,i]=u.useState(0),[d,f]=u.useState(!1),h=u.useRef(null),b=u.useRef(null);u.useEffect(()=>a.subscribe(()=>{n(o())}),[a]),u.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),p=()=>f(t.matches);return p(),t.addEventListener("change",p),()=>t.removeEventListener("change",p)},[]);const c=u.useMemo(()=>{const t=N(e.stiffness,e.damping),p=$(t,w),m=t[t.length-1].t,k=Math.max(.2,Math.round(m*100)/100);return{easing:E(p,m),points:p.length,duration:k}},[e]);u.useEffect(()=>{const t=h.current;t&&(t.style.setProperty("--spring-easing",c.easing),t.style.setProperty("--le-duration",`${c.duration}s`))},[c]),u.useEffect(()=>{const t=()=>{const p=b.current,m=h.current;!p||!m||m.style.setProperty("--le-travel",`${Math.max(20,p.clientWidth-v)}px`)};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const g=`/* spring(k=${e.stiffness}, c=${e.damping}, mass=1) → ${c.points} pts · ${c.duration}s */
--spring-easing: ${c.easing};

.box {
  animation: slide ${c.duration}s var(--spring-easing) both;
}`;return s.jsxs(j,{entryId:r,schema:x,children:[s.jsxs("div",{className:"le-stage",ref:h,children:[s.jsxs("div",{className:"le-tracks",children:[s.jsxs("div",{className:"le-track",ref:b,children:[s.jsx("span",{className:"le-tag",children:"linear() 弹簧 spring via linear()"}),s.jsx("span",{className:"le-goal","aria-hidden":"true"}),s.jsx("div",{className:"le-box le-box-spring","aria-hidden":"true"})]}),s.jsxs("div",{className:"le-track",children:[s.jsx("span",{className:"le-tag",children:"ease 对照 comparison"}),s.jsx("span",{className:"le-goal","aria-hidden":"true"}),s.jsx("div",{className:"le-box le-box-ease","aria-hidden":"true"})]})]},`${l}-${e.stiffness}-${e.damping}-${d?"r":"m"}`),s.jsx("pre",{className:"le-code",children:g}),s.jsxs("div",{className:"le-readout",children:[s.jsxs("span",{className:"le-chip",children:[c.points," pts · ",c.duration,"s"]}),d&&s.jsx("span",{className:"le-chip",children:"reduced-motion: 直出终态 final state only"})]}),s.jsx("div",{className:"le-actions",children:s.jsx("button",{type:"button",className:"le-btn",onClick:()=>i(t=>t+1),children:"重播 Replay"})}),s.jsx("p",{className:"le-hint",children:"上轨 = 生成的 linear()(纯 CSS 播放),下轨 = 同动画的 ease 对照;overshoot 会越过虚线 / top track = the generated linear() played by pure CSS, bottom = the same animation with ease; overshoot crosses the dashed line。"})]}),s.jsx("style",{children:S})]})}export{L as default};
