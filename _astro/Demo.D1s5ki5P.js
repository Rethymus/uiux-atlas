import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{m as k}from"./react.B-ZMyTXB.js";import{g as w}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";import{u as N}from"./use-reduced-motion.p3D3Z0_d.js";import{u as c,a as y}from"./index.D2pAevM6.js";const M=[{zeta:.3,zh:"强弹",en:"bouncy"},{zeta:.5,zh:"Motion 默认",en:"Motion default"},{zeta:.8,zh:"微弹克制",en:"restrained"},{zeta:1.1,zh:"过阻尼粘滞",en:"overdamped"}];function R(a){return a>=1?0:Math.exp(-Math.PI*a/Math.sqrt(1-a*a))*100}function F(a,i){const o=Math.sqrt(i);return Math.log(20)/(a*o)*1e3}const P=`
.dc-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 4px; padding: 6px 4px; }
.dc-head { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.dc-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.dc-row { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 8px; }
.dc-meta { display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-dim); white-space: nowrap; }
.dc-meta b { font-size: 12px; color: var(--text); font-weight: 600; }
.dc-lane {
  position: relative; height: 26px; border-radius: 8px;
  background: color-mix(in srgb, var(--border) 28%, transparent);
}
.dc-goal { position: absolute; top: 4px; bottom: 4px; right: 0; width: 8px; border-radius: 4px; background: oklch(0.55 0.14 250); }
.dc-ball {
  position: absolute; top: 50%; left: 4px; width: 18px; height: 18px; margin-top: -9px;
  border-radius: 50%; box-shadow: 0 2px 7px rgba(0, 0, 0, 0.32); pointer-events: none;
}
.dc-ball-adjust { background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30)); }
.dc-ball-ref { background: radial-gradient(circle at 32% 28%, oklch(0.86 0.1 165), oklch(0.62 0.16 165) 60%, oklch(0.45 0.14 165)); }
.dc-ball[data-over="1"] { background: radial-gradient(circle at 32% 28%, oklch(0.86 0.1 250), oklch(0.62 0.16 250) 60%, oklch(0.45 0.14 250)); }
.dc-footer { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-size: 12px; color: var(--text-faint); margin-top: 2px; }
.dc-launch {
  border: 1px solid transparent; border-radius: 999px; padding: 5px 16px;
  font-size: 12px; cursor: pointer; background: var(--accent); color: var(--bg);
}
.dc-hint { max-width: 580px; font-size: 12px; color: var(--text-faint); line-height: 1.5; text-align: center; }
`;function T({entryId:a,schema:i}){const o=w(a,i),f=()=>({zeta:o.get("zeta"),stiffness:o.get("stiffness")}),[r,j]=s.useState(f),d=N()===!0,u=[c(0),c(0),c(0),c(0),c(0)],h=s.useRef([]),l=s.useRef([]),m=s.useRef(d);m.current=d,s.useEffect(()=>o.subscribe(()=>{j(f())}),[o]);const g=s.useMemo(()=>[{zeta:r.zeta,label:`可调 ζ=${r.zeta.toFixed(2)}`,adjustable:!0},...M.map(e=>({zeta:e.zeta,label:`${e.zh} ζ=${e.zeta.toFixed(2)}`,adjustable:!1}))],[r.zeta]),v=()=>{const e=h.current[0];return e?Math.max(20,e.clientWidth-4-8-18):200},x=()=>{l.current.forEach(n=>n.stop()),l.current=[];const e=v();g.forEach((n,p)=>{if(m.current){u[p].jump(e);return}const z={type:"spring",stiffness:r.stiffness,damping:2*n.zeta*Math.sqrt(r.stiffness),mass:1};l.current.push(y(u[p],e,z))})},b=s.useRef(x);return b.current=x,s.useEffect(()=>{b.current()},[r,d]),s.useEffect(()=>()=>{l.current.forEach(e=>e.stop())},[]),t.jsx(E,{entryId:a,schema:i,children:t.jsxs("div",{className:"dc-stage",children:[t.jsxs("div",{className:"dc-head",children:[t.jsxs("span",{className:"dc-tag",children:["stiffness ",r.stiffness,"(全轨共享)"]}),t.jsx("span",{className:"dc-tag",children:"过冲 = e^(−πζ/√(1−ζ²))"}),t.jsx("span",{className:"dc-tag",children:"包络→5% = ln20/(ζω₀)"})]}),g.map((e,n)=>t.jsxs("div",{className:"dc-row",children:[t.jsxs("div",{className:"dc-meta",children:[t.jsx("b",{children:e.label}),t.jsxs("span",{children:["过冲 ",R(e.zeta).toFixed(1),"%",e.zeta>=1?e.zeta===1?" 临界":" 过阻尼":""]}),t.jsxs("span",{children:["包络→5% ",F(e.zeta,r.stiffness).toFixed(0),"ms"]})]}),t.jsxs("div",{className:"dc-lane",ref:p=>{h.current[n]=p},"aria-hidden":"true",children:[t.jsx("div",{className:"dc-goal"}),t.jsx(k.div,{className:`dc-ball ${e.adjustable?"dc-ball-adjust":"dc-ball-ref"}`,style:{x:u[n]},"data-over":e.zeta>=1?"1":"0"})]})]},e.label)),t.jsxs("div",{className:"dc-footer",children:[t.jsx("button",{type:"button",className:"dc-launch",onClick:x,children:"发射 Launch"}),t.jsx("span",{children:d?"reduced-motion: 直落终态 / final state only":"同一目标位 · 同一刚度 · 只有 ζ 不同"})]}),t.jsx("p",{className:"dc-hint",children:"ζ 定「抖几下」(过冲比例),ω₀(√k)定「抖多快」——同一刚度下五档 ζ 即四种手感 / ζ decides how many wobbles (overshoot ratio), ω₀ how fast — five ζ tiers at one stiffness are four hand-feels."}),t.jsx("style",{children:P})]})})}export{T as default};
