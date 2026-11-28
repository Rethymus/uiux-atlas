import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as N}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";const R=s=>1-Math.pow(1-s,3);function u(s,c){return s.toLocaleString("en-US",{minimumFractionDigits:c,maximumFractionDigits:c})}const S=`
.cu-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.cu-card {
  width: min(360px, 100%);
  padding: 26px 28px 22px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  text-align: center;
}
.cu-label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.cu-value {
  margin-top: 10px;
  font-size: 54px;
  line-height: 1.1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text);
}
.cu-bar {
  margin: 18px auto 0;
  width: 78%;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border) 55%, transparent);
  overflow: hidden;
}
.cu-bar-inner {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transform-origin: 0 50%;
  transform: scaleX(0);
}
.cu-actions { margin-top: 16px; }
.cu-replay {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.cu-replay:hover { border-color: var(--accent); color: var(--accent); }
.cu-hint { margin: 14px 0 0; font-size: 12px; line-height: 1.6; color: var(--text-faint); }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .cu-bar-inner { transition: none; }
}
`;function z({entryId:s,schema:c}){const o=N(s,c),p=()=>({duration:o.get("duration"),endValue:o.get("endValue"),decimals:o.get("decimals")}),[i,h]=t.useState(p),[g,d]=t.useState("0"),[b,v]=t.useState(0),a=t.useRef(null),f=t.useRef(!1);return t.useEffect(()=>o.subscribe(()=>{h(p())}),[o]),t.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),n=()=>{f.current=r.matches};return n(),r.addEventListener("change",n),()=>r.removeEventListener("change",n)},[]),t.useEffect(()=>{const r=Number(i.decimals),n=i.endValue;if(f.current){d(u(n,r)),a.current&&(a.current.style.transform="scaleX(1)");return}let l=0;const y=performance.now(),x=j=>{const m=Math.min(1,(j-y)/i.duration),w=n*R(m);d(u(w,r)),a.current&&(a.current.style.transform=`scaleX(${m})`),m<1?l=requestAnimationFrame(x):(d(u(n,r)),a.current&&(a.current.style.transform="scaleX(1)"))};return l=requestAnimationFrame(x),()=>cancelAnimationFrame(l)},[i,b]),e.jsxs(E,{entryId:s,schema:c,children:[e.jsx("div",{className:"cu-stage",children:e.jsxs("div",{className:"cu-card",children:[e.jsx("span",{className:"cu-label",children:"年度访客 Annual visitors"}),e.jsx("div",{className:"cu-value","aria-hidden":"true",children:g}),e.jsx("span",{className:"sr-only",children:u(i.endValue,Number(i.decimals))}),e.jsx("div",{className:"cu-bar","aria-hidden":"true",children:e.jsx("div",{className:"cu-bar-inner",ref:a})}),e.jsx("div",{className:"cu-actions",children:e.jsx("button",{type:"button",className:"cu-replay",onClick:()=>v(r=>r+1),children:"重播 Replay"})}),e.jsx("p",{className:"cu-hint",children:"改动右侧参数立即重播 / parameter changes replay instantly。 reduced-motion 时直出终值 / final value under reduced motion。"})]})}),e.jsx("style",{children:S})]})}export{z as default};
