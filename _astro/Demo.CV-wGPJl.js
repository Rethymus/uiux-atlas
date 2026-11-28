import{j as c}from"./jsx-runtime.D_zvdyIk.js";import{r as x}from"./index.DLkBFFtG.js";import{g as D}from"./color.DuEPkvq5.js";import{D as z}from"./DemoStage.vW1CgYCd.js";const S=20,w=150,T=[[0,0],[1,0],[1,1],[0,1]],C=n=>`${(n[0]*100).toFixed(3)}% ${(n[1]*100).toFixed(3)}%`,v=n=>`polygon(${n.map(C).join(", ")})`;function $(n,t){const o=[];for(let i=0;i<n.length;i++){const e=n[i],l=n[(i+1)%n.length],r=t(e),a=t(l);if(r>=0&&o.push(e),r>=0!=a>=0){const u=r/(r-a);o.push([e[0]+(l[0]-e[0])*u,e[1]+(l[1]-e[1])*u])}}return o}function k(n){const t=(n%4+4)%4;return t<1?[t,0]:t<2?[1,t-1]:t<3?[3-t,1]:[0,4-t]}function R(n,t){const o=[k(n)];for(let i=Math.ceil(n);i<=t;i++)i>n&&i<t&&o.push(k(i));return o.push(k(t)),o}function L(n,t){if(n==="checkerboard"){const o=t;return Math.max(2,Math.round(t/2))+o-2}return t-1}function P(n,t,o){const i=[];if(n==="blinds")for(let e=0;e<t;e++)i.push({key:`b${e}`,style:{left:0,width:"100%",top:`${(e*100/t).toFixed(3)}%`,height:`calc(${(100/t).toFixed(3)}% + 1px)`,"--rw-in":"inset(0 0 0 0)","--rw-out":e%2===0?"inset(0 0 100% 0)":"inset(100% 0 0 0)","--rw-delay":`${(e*o).toFixed(2)}ms`}});else if(n==="checkerboard"){const e=t,l=Math.max(2,Math.round(t/2));for(let r=0;r<l;r++)for(let a=0;a<e;a++)i.push({key:`c${r}-${a}`,style:{left:`${(a*100/e).toFixed(3)}%`,top:`${(r*100/l).toFixed(3)}%`,width:`calc(${(100/e).toFixed(3)}% + 1px)`,height:`calc(${(100/l).toFixed(3)}% + 1px)`,"--rw-in":"inset(0 0 0 0)","--rw-out":"inset(50% 50% 50% 50%)","--rw-delay":`${((r+a)*o).toFixed(2)}ms`}})}else if(n==="diagonal"){const e=2/t,l=.02;for(let r=0;r<t;r++){const a=r*e-l,u=(r+1)*e+l;let p=$(T,s=>u-s[0]-s[1]);p=$(p,s=>s[0]+s[1]-a);const g=(2-a)/2+l,b=p.map(([s,y])=>[s+g,y+g]);i.push({key:`d${r}`,style:{inset:0,"--rw-in":v(p),"--rw-out":v(b),"--rw-delay":`${(r*o).toFixed(2)}ms`}})}}else{const e=4/t,l=e*.04,r=[.5,.5];for(let a=0;a<t;a++){const u=R(a*e-l,(a+1)*e+l);i.push({key:`p${a}`,style:{inset:0,"--rw-in":v([r,...u]),"--rw-out":v([r,...u.map(()=>r)]),"--rw-delay":`${(a*o).toFixed(2)}ms`}})}}return i}const A=`
.rw-scene {
  position: absolute; inset: 0; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  padding: 8px;
  background: var(--fx-bg); color: var(--fx-fg);
}
/* 主题变量只作用于舞台内部(data-fx-theme 开关),不动站点主题 */
.rw-scene[data-fx-theme="light"] {
  --fx-bg: #f2efe8; --fx-card: #ffffff; --fx-fg: #1f2430;
  --fx-muted: #626b7a; --fx-accent: #6d4fe0; --fx-line: #dcd7cd;
}
.rw-scene[data-fx-theme="dark"] {
  --fx-bg: #14161b; --fx-card: #21252d; --fx-fg: #eceff5;
  --fx-muted: #9aa2b1; --fx-accent: #b3a1ff; --fx-line: #3c434e;
}
.rw-scene::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(70% 90% at 20% 12%, color-mix(in srgb, var(--fx-accent) 13%, transparent), transparent 70%);
}
.rw-content { position: relative; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; padding: 0 16px; }
.rw-kicker { margin: 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fx-muted); }
.rw-title { margin: 0; font-size: clamp(20px, 4vw, 30px); font-weight: 700; letter-spacing: 0.01em; }
.rw-sub { margin: 0; font-size: 13px; line-height: 1.6; color: var(--fx-muted); max-width: 480px; }
.rw-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 2px; }
.rw-chip {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;
  border: 1px solid var(--fx-line); border-radius: 999px;
  background: var(--fx-card); color: var(--fx-muted);
  font-family: var(--font-mono); font-size: 11px;
}
.rw-chip i { width: 12px; height: 12px; border-radius: 4px; border: 1px solid var(--fx-line); }
.rw-meta { margin: 0; font-family: var(--font-mono); font-size: 11px; color: var(--fx-muted); text-align: center; padding: 0 12px; }
.rw-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 2;
  padding: 6px 14px; border: 1px solid var(--fx-line); border-radius: 999px;
  background: var(--fx-card); color: var(--fx-fg);
  font-size: 12px; cursor: pointer;
}
.rw-toggle:focus-visible { outline: 2px solid var(--fx-accent); outline-offset: 2px; }
/* 表演层:常驻 overlay + N 块液块;不挡点击、不承载信息 */
.rw-overlay { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.fx-cell {
  position: absolute;
  clip-path: var(--rw-in);
  /* 调研 20§6.3 原文缓动:无过冲减速曲线(揭示类禁过冲) */
  animation: rw-wipe var(--rw-cell-dur) cubic-bezier(0.3, 0, 0.2, 1) var(--rw-delay) forwards;
  will-change: clip-path;
}
@keyframes rw-wipe { to { clip-path: var(--rw-out); } }
.rw-overlay[data-from="light"] .fx-cell { background: #f2efe8; }
.rw-overlay[data-from="dark"] .fx-cell { background: #14161b; }
@media (max-width: 900px) {
  .rw-scene { position: relative; min-height: 320px; padding: var(--plate-h, 40px) 8px 10px; }
}
/* reduced-motion 双保险:JS 已直切不挂 overlay;万一挂上也绝不动画 */
@media (prefers-reduced-motion: reduce) {
  .rw-overlay { display: none; }
  .fx-cell { animation: none !important; }
}
`;function H({entryId:n,schema:t}){const o=D(n,t),i=()=>({pattern:o.get("pattern"),duration:o.get("duration"),stripes:o.get("stripes")}),[e,l]=x.useState(i),[r,a]=x.useState("light"),[u,p]=x.useState(null),[g,b]=x.useState(!1),s=x.useRef(null),y=x.useRef(0);x.useEffect(()=>o.subscribe(()=>l(i())),[o]),x.useEffect(()=>{const d=window.matchMedia("(prefers-reduced-motion: reduce)"),f=()=>b(d.matches);return f(),d.addEventListener("change",f),()=>d.removeEventListener("change",f)},[]);const{cells:j,timing:m}=x.useMemo(()=>{const d=L(e.pattern,e.stripes);let f=S,h=e.duration-f*d;h<w&&(f=Math.max(8,(e.duration-w)/Math.max(d,1)),h=e.duration-f*d,h<w&&(h=w));const E=Math.round(h+f*d);return{cells:P(e.pattern,e.stripes,f),timing:{cascade:Math.round(f*10)/10,cellDur:Math.round(h),total:E}}},[e.pattern,e.stripes,e.duration]),N=j.length;x.useEffect(()=>{s.current!=null&&(window.clearTimeout(s.current),s.current=null),p(null)},[e.pattern,e.stripes,e.duration]),x.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current)},[]);const F=()=>{s.current!=null&&(window.clearTimeout(s.current),s.current=null)},M=()=>{const d=r==="light"?"dark":"light";if(F(),g){p(null),a(d);return}const f=++y.current;p({from:r,key:f}),a(d),s.current=window.setTimeout(()=>{s.current=null,p(null)},m.total)};return c.jsx(z,{entryId:n,schema:t,children:c.jsxs("div",{className:"rw-scene","data-fx-stage":"","data-fx-theme":r,"data-fx-duration":g?0:m.total,style:{"--rw-cell-dur":`${m.cellDur}ms`},children:[c.jsxs("div",{className:"rw-content",children:[c.jsx("p",{className:"rw-kicker",children:"Theme Reveal Wipes"}),c.jsx("p",{className:"rw-title",children:"百叶窗 · 棋盘格 · 对角 · 多边形"}),c.jsx("p",{className:"rw-sub",children:"点击切换主题:旧主题被几何液块逐块擦除,露出底下已切换的新主题。"}),c.jsxs("div",{className:"rw-chips","aria-hidden":"true",children:[c.jsxs("span",{className:"rw-chip",children:[c.jsx("i",{style:{background:"var(--fx-card)"}}),"surface"]}),c.jsxs("span",{className:"rw-chip",children:[c.jsx("i",{style:{background:"var(--fx-accent)"}}),"accent"]}),c.jsxs("span",{className:"rw-chip",children:[c.jsx("i",{style:{background:"var(--fx-muted)"}}),"muted"]})]}),c.jsxs("p",{className:"rw-meta",children:[N," 块 · 单块 ",m.cellDur,"ms · 级联 ",m.cascade,"ms · 实际总时长"," ",m.total,"ms"]})]}),c.jsx("button",{type:"button",className:"rw-toggle","data-fx-toggle":!0,"aria-pressed":r==="dark",onClick:M,children:"切换主题 Toggle theme"}),u&&c.jsx("div",{className:"rw-overlay","data-from":u.from,"aria-hidden":"true",children:j.map(d=>c.jsx("span",{className:"fx-cell",style:d.style},d.key))},u.key),c.jsx("style",{children:A})]})})}export{H as default};
