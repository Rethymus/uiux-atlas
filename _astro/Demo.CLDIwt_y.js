import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{r as C}from"./index.Ds4P5BjG.js";import{g as N,s as p}from"./color.DuEPkvq5.js";import{D as P}from"./DemoStage.vW1CgYCd.js";import"./index.CBsppStC.js";const M=`
.tt-scene {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  justify-content: center; gap: 10px; padding: 20px; color-scheme: light dark;
  /* 亮侧:M3 官方基线 surface #FFFBFE / on-surface #1C1B1F / primary #6750A4(调研 06§7) */
  --tt-bg: oklch(0.992 0.006 334);
  --tt-fg: oklch(0.225 0.008 297);
  --tt-accent: #6750A4;
  --tt-on-accent: #FFFFFF;
  background-color: var(--tt-bg);
  color: var(--tt-fg);
  transition: none; /* 换肤交给快照动画,不做 CSS 过渡双保险 */
}
.tt-scene[data-theme="dark"] {
  /* 暗侧 accent/on-accent 用 M3 官方基线 #D0BCFF / #381E72(调研 06§7);表面为演示值 */
  --tt-bg: oklch(0.17 0.012 297);
  --tt-fg: oklch(0.92 0.01 297);
  --tt-accent: #D0BCFF;
  --tt-on-accent: #381E72;
}
.tt-card {
  border: 1px solid color-mix(in srgb, var(--tt-fg) 16%, transparent);
  border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column; gap: 8px;
}
.tt-card h3 { margin: 0; font-size: 15px; font-weight: 650; }
.tt-card p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.78; }
.tt-toggle {
  width: fit-content; border: 0; border-radius: 999px; padding: 7px 18px;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: var(--tt-accent); color: var(--tt-on-accent);
}
.tt-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; }
.tt-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid color-mix(in srgb, currentColor 25%, transparent); background: color-mix(in srgb, currentColor 8%, transparent); font-variant-numeric: tabular-nums; }
.tt-chip-warn { color: oklch(0.55 0.18 30); }

/* ::view-transition 伪元素树挂在 <html> 下,不继承 .demo-stage 的变量 → duration/easing 由 demo 镜像到 :root */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--tt-duration, 500ms);
  animation-timing-function: var(--tt-easing, cubic-bezier(0.42, 0, 1, 1));
}
/* circle 档:阻断默认交叉淡化(Chrome 文档写法,调研 11§8)——旧快照置底、新快照被 clip-path 圆揭开 */
html[data-tt-reveal="circle"]::view-transition-old(root),
html[data-tt-reveal="circle"]::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
`;function B({entryId:u,schema:m}){const t=N(u,m),h=()=>({reveal:t.get("reveal"),duration:t.get("duration"),easing:t.get("easing")}),[c,w]=r.useState(h),[d,y]=r.useState("light"),[g,k]=r.useState(null),[x,f]=r.useState(!1),a=r.useRef(document.documentElement);r.useEffect(()=>t.subscribe(()=>{w(h())}),[t]),r.useEffect(()=>{k(typeof document.startViewTransition=="function");const n=window.matchMedia("(prefers-reduced-motion: reduce)");f(n.matches);const i=s=>f(s.matches);return n.addEventListener("change",i),()=>n.removeEventListener("change",i)},[]),r.useEffect(()=>{const o=()=>{a.current.style.setProperty("--tt-duration",p(t.param("duration"),t.get("duration"))),a.current.style.setProperty("--tt-easing",p(t.param("easing"),t.get("easing")))};o();const n=t.subscribe(o);return()=>{n(),a.current.style.removeProperty("--tt-duration"),a.current.style.removeProperty("--tt-easing"),delete a.current.dataset.ttReveal}},[t]),r.useEffect(()=>(a.current.dataset.ttReveal=c.reveal,()=>{delete a.current.dataset.ttReveal}),[c.reveal]);const v=()=>document,j=c.reveal==="direct"||g===!1||x,E=o=>{const n=d==="light"?"dark":"light",i=()=>C.flushSync(()=>y(n));if(j){i();return}if(c.reveal==="crossfade"){v().startViewTransition(i).finished.catch(()=>{});return}const s=o.clientX,l=o.clientY,S=Math.hypot(Math.max(s,window.innerWidth-s),Math.max(l,window.innerHeight-l));v().startViewTransition(i).ready.then(()=>{a.current.animate({clipPath:[`circle(0px at ${s}px ${l}px)`,`circle(${S}px at ${s}px ${l}px)`]},{duration:t.get("duration"),easing:p(t.param("easing"),t.get("easing")),pseudoElement:"::view-transition-new(root)"})}).catch(()=>{})},{reveal:b,duration:F}=c;return e.jsx(P,{entryId:u,schema:m,children:e.jsxs("div",{className:"tt-scene","data-theme":d,children:[e.jsxs("div",{className:"tt-card",children:[e.jsxs("h3",{children:["换肤舞台 Theme stage · ",d]}),e.jsx("p",{children:"点下方按钮:换肤在快照回调内同步完成,圆形扩散只是快照表演。 Hit the button: the swap commits inside the snapshot callback; the circle is a snapshot performance."}),e.jsxs("button",{type:"button",className:"tt-toggle",onClick:E,children:["切到",d==="light"?"深色":"浅色"," Switch to ",d==="light"?"dark":"light"]})]}),e.jsxs("div",{className:"tt-meta",children:[e.jsxs("span",{className:"tt-chip",children:["reveal: ",b]}),e.jsxs("span",{className:"tt-chip",children:["duration: ",F,"ms"]}),g===!1&&e.jsx("span",{className:"tt-chip tt-chip-warn",children:"无 startViewTransition → 直切 / unsupported → hard cut"}),x&&e.jsx("span",{className:"tt-chip",children:"reduced-motion → 直切 / hard cut"}),b==="direct"&&e.jsx("span",{className:"tt-chip",children:"降级对照 / fallback control"})]}),e.jsx("style",{children:M})]})})}export{B as default};
