import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as z}from"./color.DuEPkvq5.js";import{D as C}from"./DemoStage.vW1CgYCd.js";const L=`
.px-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.px-scroller {
  position: relative; flex: 1; min-height: 0; overflow-y: auto;
  border: 1px solid var(--border); border-radius: 12px;
  background: var(--surface); scrollbar-width: thin; overscroll-behavior: contain;
}
.px-scroller:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.px-world { position: relative; height: 1500px; overflow: hidden; }

/* 三个装饰层:aria-hidden,不承载内容;乘数 1/2/3 对应远/中/近 */
.px-layer { position: absolute; left: 0; right: 0; pointer-events: none; }
.px-far {
  top: -40px; height: 560px;
  background:
    radial-gradient(38% 42% at 68% 30%, oklch(0.83 0.13 75 / 0.9), transparent 70%),
    radial-gradient(2px 2px at 20% 18%, oklch(0.85 0.05 250) 45%, transparent 55%),
    radial-gradient(2px 2px at 34% 34%, oklch(0.8 0.05 250) 45%, transparent 55%),
    radial-gradient(1.6px 1.6px at 52% 12%, oklch(0.85 0.05 260) 45%, transparent 55%),
    radial-gradient(2px 2px at 76% 52%, oklch(0.82 0.05 250) 45%, transparent 55%),
    radial-gradient(1.6px 1.6px at 88% 24%, oklch(0.8 0.05 260) 45%, transparent 55%),
    linear-gradient(180deg, oklch(0.28 0.06 265), oklch(0.36 0.07 280) 62%, transparent);
  --px-m: 1;
}
.px-mid {
  top: 420px; height: 620px;
  background:
    conic-gradient(from 240deg at 28% 100%, transparent 294deg, oklch(0.42 0.06 250) 294deg 300deg, transparent 300deg),
    conic-gradient(from 250deg at 58% 100%, transparent 285deg, oklch(0.45 0.05 240) 285deg 292deg, transparent 292deg),
    conic-gradient(from 245deg at 84% 100%, transparent 288deg, oklch(0.43 0.06 255) 288deg 296deg, transparent 296deg),
    linear-gradient(180deg, transparent, oklch(0.4 0.05 250 / 0.55) 30%, oklch(0.34 0.05 250));
  --px-m: 2;
}
.px-near {
  top: 900px; height: 620px;
  background:
    conic-gradient(from 250deg at 22% 100%, transparent 280deg, oklch(0.3 0.05 240) 280deg 290deg, transparent 290deg),
    conic-gradient(from 255deg at 66% 100%, transparent 284deg, oklch(0.32 0.05 235) 284deg 293deg, transparent 293deg),
    linear-gradient(180deg, transparent, oklch(0.27 0.04 240) 26%, oklch(0.23 0.03 240));
  --px-m: 3;
}
@supports (animation-timeline: scroll()) {
  .px-scene[data-mode="css"] .px-layer {
    animation: px-drift linear both;
    animation-timeline: scroll(nearest block); /* 必须写在 animation 简写之后 */
    animation-duration: auto;
  }
}
/* 位移 = (1 − min(rate×m, 1)) × 可滚动距离;层越远(p 越小)反向补偿越多 → 视口内移动越慢 */
@keyframes px-drift {
  from { transform: translateY(0); }
  to { transform: translateY(calc((1 - min(var(--par-rate, 0.3) * var(--px-m, 1), 1)) * var(--par-s, 900px))); }
}
.px-scene[data-reduced="true"] .px-layer { animation: none !important; transform: none !important; }

/* 内容层:1:1 随滚动,承载全部文字 */
.px-copy { position: relative; z-index: 1; padding: 480px 26px 0; display: flex; flex-direction: column; gap: 220px; }
.px-card {
  padding: 14px 16px; border-radius: 12px; max-width: 420px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.px-card h3 { margin: 0 0 5px; font-size: 14px; font-weight: 650; }
.px-card p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.px-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.px-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.px-chip-warn { color: oklch(0.65 0.15 70); }
.px-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
`,i=l=>`${Math.round(l*100)}%`;function J({entryId:l,schema:v}){const p=z(l,v),b=()=>({rate:p.get("rate"),mode:p.get("mode")}),[a,k]=n.useState(b),[d,w]=n.useState(!1),[m,N]=n.useState(null),h=n.useRef(null),o=n.useRef([]),u=n.useRef(0);n.useEffect(()=>p.subscribe(()=>{k(b())}),[p]),n.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>w(r.matches);return t(),r.addEventListener("change",t),()=>r.removeEventListener("change",t)},[]),n.useEffect(()=>{N(typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("animation-timeline","scroll()"))},[]),n.useEffect(()=>{const r=()=>{const t=h.current;if(!t)return;const c=Math.max(t.scrollHeight-t.clientHeight,1);t.style.setProperty("--par-s",`${c}px`)};return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]);const f=a.mode==="js"||m===!1;n.useEffect(()=>{const r=h.current;if(!r||!f){o.current.forEach(s=>{s&&(s.style.transform="")});return}const t=o.current,c=()=>{cancelAnimationFrame(u.current),u.current=requestAnimationFrame(()=>{const s=r.scrollTop;Math.max(r.scrollHeight-r.clientHeight,1);const M=[1,2,3];t.forEach((y,R)=>{if(!y)return;const F=Math.min(a.rate*M[R],1);y.style.transform=`translateY(${(1-F)*s}px)`})})};if(d){t.forEach(s=>s&&(s.style.transform=""));return}return c(),r.addEventListener("scroll",c,{passive:!0}),()=>{r.removeEventListener("scroll",c),cancelAnimationFrame(u.current)}},[f,a.rate,d]);const x=f?"js":"css",g=a.rate,j=Math.min(a.rate*2,1),S=Math.min(a.rate*3,1),E=a.rate>=1;return e.jsx(C,{entryId:l,schema:v,children:e.jsxs("div",{className:"px-scene","data-reduced":d,"data-mode":x,children:[e.jsx("div",{className:"px-scroller",ref:h,tabIndex:0,role:"region","aria-label":"视差滚动演示容器 Parallax demo container",children:e.jsxs("div",{className:"px-world",children:[e.jsx("div",{className:"px-layer px-far","aria-hidden":"true",ref:r=>{o.current[0]=r}}),e.jsx("div",{className:"px-layer px-mid","aria-hidden":"true",ref:r=>{o.current[1]=r}}),e.jsx("div",{className:"px-layer px-near","aria-hidden":"true",ref:r=>{o.current[2]=r}}),e.jsxs("div",{className:"px-copy",children:[e.jsxs("div",{className:"px-card",children:[e.jsxs("h3",{children:["远层 Far layer · ",i(g)]}),e.jsxs("p",{children:["跟随比例 p = ",a.rate,":滚动 100px 它只移动 ",i(g),"——背景慢于前景,深度由此而来。0 时钉在视口 / The background trails the foreground; at 0 it is pinned to the viewport."]})]}),e.jsxs("div",{className:"px-card",children:[e.jsxs("h3",{children:["中层 Mid layer · ",i(j)]}),e.jsx("p",{children:"速率按 p×2 推导封顶 1(演示分层)。滚动经过时注意它比远层「先走」/ Derived as p×2 capped at 1 (demo layering) — it outruns the far layer."})]}),e.jsxs("div",{className:"px-card",children:[e.jsx("h3",{children:"内容层 Content · 100%"}),e.jsx("p",{children:"内容永远 1:1 随滚动、不参加视差——文字可读性优先 / Content always scrolls 1:1 and never joins the parallax — readability first. 滚到底部再回看顶部的星星 / Scroll to the bottom and look back at the stars."})]})]})]})}),e.jsxs("div",{className:"px-readout",children:[e.jsxs("span",{className:"px-chip",children:["rate p = ",a.rate]}),e.jsxs("span",{className:"px-chip",children:["far ",i(g)," · mid ",i(j)," · near ",i(S)]}),e.jsxs("span",{className:"px-chip",children:["mode: ",a.mode,a.mode!==x?` → ${x}(兜底 fallback)`:""]}),x==="js"&&m===!0&&a.mode==="js"&&e.jsx("span",{className:"px-chip px-chip-warn",children:"JS 路径在主线程运行,与合成器滚动异步,快速滚动易掉帧 / JS path runs on the main thread and may jank"}),m===!1&&e.jsx("span",{className:"px-chip px-chip-warn",children:"本浏览器不支持 scroll(),已自动落到 JS 兜底 / scroll() unsupported, JS fallback active"}),E&&e.jsx("span",{className:"px-chip px-chip-warn",children:"p = 1:全部层与内容同步,无视差 / all layers synced, no parallax"}),d&&e.jsx("span",{className:"px-chip",children:"reduced-motion: 静态分层直出 / static layers rendered"}),e.jsx("span",{className:"px-chip px-chip-note",children:"实现:animation-timeline: scroll()(声明式,可离主线程)vs scroll 事件 + rAF(主线程)/ declarative timeline vs main-thread scroll handler"})]}),e.jsx("style",{children:L})]})})}export{J as default};
