import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{m as D}from"./react.B-ZMyTXB.js";import{g as $}from"./color.DuEPkvq5.js";import{D as q}from"./DemoStage.vW1CgYCd.js";import{u as B}from"./use-reduced-motion.p3D3Z0_d.js";import{u as W,a as P}from"./index.D2pAevM6.js";const Z=`
.sm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 8px 6px; }
.sm-lane-label { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); }
.sm-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.sm-tag b { color: var(--text); font-weight: 600; }
.sm-lane {
  position: relative; height: 34px; border-radius: 9px;
  background: color-mix(in srgb, var(--border) 28%, transparent);
}
.sm-box {
  position: absolute; top: 4px; bottom: 4px; left: 0; width: 46px; border-radius: 7px;
  background: linear-gradient(180deg, oklch(0.68 0.13 250), oklch(0.52 0.15 250));
  will-change: auto;
}
.sm-interrupt {
  position: absolute; top: 50%; left: 4px; width: 40px; height: 26px; margin-top: -13px;
  border-radius: 7px;
  background: radial-gradient(circle at 32% 28%, oklch(0.85 0.12 85), oklch(0.62 0.2 40) 58%, oklch(0.48 0.19 30));
}
.sm-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.sm-btn {
  border: 1px solid transparent; border-radius: 999px; padding: 5px 16px;
  font-size: 12px; cursor: pointer; background: var(--accent); color: var(--bg);
}
.sm-btn-ghost { background: var(--surface); color: var(--text); border-color: var(--border); }
.sm-hint { max-width: 580px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
`;function J({entryId:h,schema:b}){const n=$(h,b),v=()=>({animateProperty:n.get("animateProperty"),layerHint:n.get("layerHint"),interruptMode:n.get("interruptMode")}),[s,S]=t.useState(v),[y,E]=t.useState({avg:16.7,long:0}),u=B()===!0,j=t.useRef(null),x=t.useRef(null),w=t.useRef(null),o=W(0),c=t.useRef(null),m=t.useRef(s);m.current=s;const f=t.useRef(u);f.current=u,t.useEffect(()=>n.subscribe(()=>{S(v())}),[n]),t.useEffect(()=>{let r=0,i=performance.now(),d=0,a=0,l=0;const R=g=>{const N=g-i;i=g,N>25&&(l+=1),d+=N,a+=1,a>=60&&(E({avg:d/a,long:l}),d=0,a=0,l=0);const k=j.current,p=x.current;if(k&&p&&!f.current){const A=Math.max(10,k.clientWidth-46),F=g/2e3%1,M=A/2*(1-Math.cos(F*2*Math.PI)),z=m.current.animateProperty,C=m.current.layerHint==="translateZ"?" translateZ(0)":"";z==="left"?p.style.left=`${M}px`:(p.style.left="0px",p.style.transform=`translateX(${M}px)${C}`)}r=requestAnimationFrame(R)};return r=requestAnimationFrame(R),()=>cancelAnimationFrame(r)},[]),t.useEffect(()=>{const r=x.current;r&&(r.style.willChange=s.layerHint==="will-change"?"transform":"auto")},[s.layerHint]),t.useEffect(()=>()=>{c.current?.stop()},[]);const H=()=>{const r=w.current;if(!r)return;const i=Math.max(20,r.clientWidth-4-40),a=o.get()>i/2?0:i;if(c.current?.stop(),f.current){o.jump(a);return}if(m.current.interruptMode==="tween")c.current=P(o,a,{duration:.7,ease:"easeOut"});else{const l={type:"spring",stiffness:300,damping:25,mass:1};c.current=P(o,a,l)}};return e.jsx(q,{entryId:h,schema:b,children:e.jsxs("div",{className:"sm-stage",children:[e.jsxs("div",{className:"sm-lane-label",children:[e.jsxs("span",{children:["轨 A · 属性对照:动画 ",e.jsx("b",{children:s.animateProperty==="left"?"left(触发布局)":"transform(合成器)"})]}),e.jsxs("span",{className:"sm-tag",children:["帧间隔均值 ",y.avg.toFixed(1),"ms"]}),e.jsxs("span",{className:"sm-tag",children:[">25ms 长帧 ",y.long,"/60"]}),e.jsxs("span",{className:"sm-tag",children:["提层 ",s.layerHint==="none"?"无":s.layerHint]})]}),e.jsx("div",{className:"sm-lane",ref:j,"aria-hidden":"true",children:e.jsx("div",{className:"sm-box",ref:x})}),e.jsxs("div",{className:"sm-lane-label",children:[e.jsxs("span",{children:["轨 B · 中断接力:",e.jsx("b",{children:s.interruptMode==="tween"?"tween(从静止重启)":"spring(速度接力)"})]}),e.jsx("button",{type:"button",className:"sm-btn sm-btn-ghost",onClick:H,children:"中途切换目标 Re-target mid-flight"})]}),e.jsx("div",{className:"sm-lane",ref:w,"aria-hidden":"true",children:e.jsx(D.div,{className:"sm-interrupt",style:{x:o}})}),e.jsx("div",{className:"sm-actions",children:e.jsx("span",{className:"sm-tag",children:"web.dev 实测:动 top/left 丢帧约 50%,transform 约 1%(Chrome FPS 面板)"})}),e.jsxs("p",{className:"sm-hint",children:["逐帧直写 el.style.transform(不经 CSS 变量);will-change 是最后手段——demo 仅作演示切换,生产上应动画前置、 animationend 后即撤 / Per-frame writes go straight to el.style.transform; will-change is a last resort — set before animating, remove on animationend.",u?" · reduced-motion: 静止直出":""]}),e.jsx("style",{children:Z})]})})}export{J as default};
