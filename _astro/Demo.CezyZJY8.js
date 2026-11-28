import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{m as F}from"./react.B-ZMyTXB.js";import{g as I}from"./color.DuEPkvq5.js";import{D as P}from"./DemoStage.vW1CgYCd.js";import{u as _}from"./use-reduced-motion.p3D3Z0_d.js";import{u as $,a as z}from"./index.D2pAevM6.js";const m=500,R=24,p=R/(2*Math.sqrt(m)),M=Math.sqrt(m)*Math.sqrt(1-p*p),G=p*Math.sqrt(m),f=.1;function T(o,n){const a=Math.max(2,Math.ceil(Math.log(20)/(n*f))),i=a*f*1e3,e=["0% { transform: translateX(0); }"];for(let r=0;r<a;r++){const d=(r+.5)*f,x=(r+.5)/a*100,l=o*Math.exp(-n*d),c=r%2===0?-1:1;e.push(`${x.toFixed(1)}% { transform: translateX(${(c*l).toFixed(2)}px); }`)}return e.push("100% { transform: translateX(0); }"),{keyframes:`@keyframes sd-shake { ${e.join(" ")} }`,beats:a,totalMs:i}}const q=`
.sd-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 6px 6px; }
.sd-form { display: flex; gap: 8px; align-items: center; justify-content: center; }
.sd-input {
  width: min(220px, 46%); padding: 8px 12px; font-size: 13px; color: var(--text);
  background: var(--surface); border: 1px solid var(--border); border-radius: 9px;
}
.sd-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sd-submit {
  border: 0; border-radius: 9px; padding: 8px 18px; font-size: 13px; font-weight: 600;
  color: #fff; cursor: pointer;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.sd-submit:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sd-msg { min-height: 16px; text-align: center; font-size: 12px; color: var(--text-faint); }
.sd-msg[data-kind="error"] { color: oklch(0.62 0.2 25); }
.sd-msg[data-kind="ok"] { color: oklch(0.6 0.14 150); }
.sd-lane-label { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.sd-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.sd-field {
  width: min(260px, 58%); height: 40px; border-radius: 9px; margin: 0 auto;
  border: 1.5px solid var(--border); background: var(--surface);
  display: flex; align-items: center; padding: 0 12px; font-size: 12px; color: var(--text-faint);
}
.sd-field[data-error="true"] { border-color: oklch(0.62 0.2 25); }
.sd-field[data-shake="true"] { animation: sd-shake var(--sd-total, 500ms) ease-in-out both; }
.sd-hint { max-width: 580px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .sd-field[data-shake="true"] { animation: none; }
}
`;function Z({entryId:o,schema:n}){const a=I(o,n),i=()=>({amp:a.get("amp"),lambda:a.get("lambda")}),[e,r]=t.useState(i),[d,x]=t.useState(0),[l,c]=t.useState({text:"密码少于 4 位触发错误抖动 / a password under 4 chars triggers the shake",kind:"idle"}),[h,g]=t.useState(!1),k=t.useRef(null),E=_()===!0;t.useEffect(()=>a.subscribe(()=>{r(i())}),[a]);const{keyframes:w,beats:b,totalMs:A}=t.useMemo(()=>T(e.amp,e.lambda),[e.amp,e.lambda]),v=$(0),u=t.useRef(null);t.useEffect(()=>()=>{u.current?.stop()},[]);const j=()=>({type:"spring",stiffness:m,damping:R,velocity:-e.amp*M}),y=t.useRef(j);y.current=j;const N=()=>{(k.current?.value??"").trim().length<4?(g(!0),c({text:"密码太短 · 抖动提示错误 / too short · shake signals the error",kind:"error"}),E||(x(D=>D+1),u.current?.stop(),u.current=z(v,0,y.current()))):(g(!1),c({text:"通过 · 无抖动 / accepted · no shake",kind:"ok"}))};return s.jsx(P,{entryId:o,schema:n,children:s.jsxs("div",{className:"sd-stage",children:[s.jsxs("div",{className:"sd-form",children:[s.jsx("input",{ref:k,className:"sd-input",type:"password",placeholder:"密码 password","aria-label":"密码 password(4 位以上通过)",onKeyDown:S=>{S.key==="Enter"&&N()}}),s.jsx("button",{type:"button",className:"sd-submit",onClick:N,children:"登录 Sign in"})]}),s.jsx("div",{className:"sd-msg","data-kind":l.kind,role:"status",children:l.text}),s.jsxs("div",{className:"sd-lane-label",children:[s.jsx("span",{children:"CSS keyframes(衰减版)"}),s.jsxs("span",{className:"sd-tag",children:["A ",e.amp,"px"]}),s.jsxs("span",{className:"sd-tag",children:["λ ",e.lambda,"s⁻¹"]}),s.jsxs("span",{className:"sd-tag",children:[b," 拍 / ",A.toFixed(0),"ms"]})]}),s.jsx("div",{className:"sd-field","data-error":h?"true":"false","data-shake":d>0?"true":"false","aria-hidden":"true",children:"●●●●●●●● 水平抖动 horizontal shake"},`kf-${d}-${b}-${e.amp}`),s.jsxs("div",{className:"sd-lane-label",children:[s.jsx("span",{children:"弹簧速度注入(Motion velocity)"}),s.jsx("span",{className:"sd-tag",children:"stiffness 500 / damping 24"}),s.jsxs("span",{className:"sd-tag",children:["ζ ",p.toFixed(3)]}),s.jsxs("span",{className:"sd-tag",children:["λ≈",G.toFixed(1),"s⁻¹(固定)"]}),s.jsxs("span",{className:"sd-tag",children:["v₀ −",(e.amp*M).toFixed(0)]})]}),s.jsx("div",{className:"sd-field","data-error":h?"true":"false","aria-hidden":"true",children:s.jsx(F.div,{style:{x:v,display:"inline-block"},children:"⌁ 速度注入 → 指数衰减 oscillation"})}),s.jsx("p",{className:"sd-hint",children:"上轨按 x(t)=A·e^(−λt)·sin(ω_d t) 采样成衰减 keyframes(animate.css 的 ±10px 等幅版是它的不衰减特例); 下轨给欠阻尼弹簧注入初速度,让物理自己衰减——中断/连按天然连续。 两条轨参数体系不同:上轨 A/λ 可调,下轨由 500/24 定档 / Top lane samples the decaying keyframes from x(t)=A·e^(−λt)·sin(ω_d t); bottom lane injects velocity into an underdamped spring and lets physics decay it."}),s.jsx("style",{children:`${w}
${q}`})]})})}export{Z as default};
