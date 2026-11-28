import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";const u=40,f=.3,E=Math.min(f*2,1),N="让叙事随滚动展开",z="The story unfolds as you scroll",M=`
.mh-scene { position: absolute; inset: 0; overflow: hidden; display: flex; }
/* ── 内层滚动器:前景文字 1:1 随滚动,背景层拖曳 ── */
.mh-scroller {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  overscroll-behavior: contain;
  background: oklch(0.22 0.04 265);
  color: oklch(0.97 0.01 265);
}
.mh-world { position: relative; height: 1400px; overflow: hidden; }
/* ── 远层 = 极光渐变背景(materials/aurora-gradient 官方默认;
      外层壳承担视差位移,内层只承担 18s 慢漂,两层 transform 不打架)── */
.mh-far { position: absolute; top: -60px; right: 0; left: 0; height: 760px; --m: 1; pointer-events: none; }
.aur-layer {
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(38% 42% at var(--aurora-spot-a, 20%) 25%, oklch(0.6 0.24 300 / .85), transparent 68%),
    radial-gradient(42% 46% at var(--aurora-spot-b, 70%) 30%, oklch(0.72 0.17 195 / .8), transparent 68%),
    radial-gradient(50% 55% at 78% 72%, oklch(0.68 0.18 340 / .8), transparent 68%),
    radial-gradient(45% 50% at 32% 88%, oklch(0.75 0.15 85 / .75), transparent 68%),
    conic-gradient(from 220deg at 60% 45%, oklch(0.35 0.06 265), oklch(0.3 0.05 210), oklch(0.35 0.06 265));
  filter: blur(var(--aurora-blur, 42px)) saturate(calc(var(--aurora-saturate, 115%) / 100));
  animation: aur-drift var(--aurora-drift, 18s) ease-in-out alternate infinite;
}
@keyframes aur-drift {
  from { transform: translate(-2%, -1%) rotate(0.001deg) scale(1); }
  to   { transform: translate(2%, 1%) rotate(2deg) scale(1.06); }
}
/* ── 中层 = 星点(rate×2 封顶 1 的推导分层,同 parallax 条目口径)── */
.mh-mid {
  position: absolute;
  top: 340px;
  right: 0;
  left: 0;
  height: 900px;
  --m: 2;
  pointer-events: none;
  background:
    radial-gradient(1.8px 1.8px at 14% 12%, oklch(0.9 0.03 250) 45%, transparent 55%),
    radial-gradient(1.4px 1.4px at 38% 32%, oklch(0.85 0.03 250) 45%, transparent 55%),
    radial-gradient(1.8px 1.8px at 62% 20%, oklch(0.88 0.03 260) 45%, transparent 55%),
    radial-gradient(1.2px 1.2px at 84% 44%, oklch(0.85 0.03 250) 45%, transparent 55%),
    radial-gradient(1.6px 1.6px at 26% 58%, oklch(0.9 0.03 255) 45%, transparent 55%),
    radial-gradient(1.3px 1.3px at 72% 72%, oklch(0.85 0.03 250) 45%, transparent 55%);
}
/* 声明式滚动驱动(css 模式):位移 = (1 − min(rate×m, 1)) × 可滚动距离,
   层越远反向补偿越多 → 视口内移动越慢(背景慢于前景,M3 官方口径) */
@supports (animation-timeline: scroll()) {
  .mh-scene[data-mode="css"] .mh-layer {
    animation: mh-drift linear both;
    animation-timeline: scroll(nearest block); /* 必须写在 animation 简写之后 */
    animation-duration: auto;
  }
}
@keyframes mh-drift {
  from { transform: translateY(0); }
  to { transform: translateY(calc((1 - min(0.3 * var(--m, 1), 1)) * var(--mh-s, 900px))); }
}
/* ── 顶部 scroll edge 压暗 scrim(Apple scroll edge effect + 35% 压暗语义)── */
.mh-edge {
  position: sticky;
  top: 0;
  z-index: 2;
  height: 56px;
  margin-bottom: -56px;
  background: linear-gradient(180deg, oklch(0.2 0.03 265 / 0.88), transparent);
  pointer-events: none;
}
/* ── 前景内容:1:1 随滚动,永不参加视差 ── */
.mh-copy { position: relative; z-index: 1; padding: 64px 24px 0; display: flex; flex-direction: column; gap: 300px; }
.mh-kicker {
  margin: 0 0 14px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: oklch(0.85 0.05 250 / 0.9);
}
/* Dynamic Type Large Title 档:34pt = 34px / 行距 41(Apple Typography 官方表) */
.mh-title {
  margin: 0;
  max-width: 15em;
  font-size: 34px;
  line-height: 41px;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-variation-settings: "wght" var(--k-wght, 400);
  text-wrap: balance;
}
/* 动态排版(reveal=chars):stagger ${u}ms × 序号,单字 rise 600ms cubic-bezier(.2,.7,.3,1) */
.mh-char {
  display: inline-block;
  white-space: pre;
  animation: mh-rise 600ms cubic-bezier(0.2, 0.7, 0.3, 1) both;
  animation-delay: calc(var(--ci) * ${u}ms);
}
@keyframes mh-rise {
  from { opacity: 0; transform: translateY(0.6em); }
  to { opacity: 1; transform: none; }
}
.mh-sub {
  margin: 16px 0 0;
  max-width: 34em;
  /* Dynamic Type Body 档:17pt = 17px / 行距 22 */
  font-size: 17px;
  line-height: 22px;
  color: oklch(0.95 0.01 265 / 0.92);
}
.mh-card {
  padding: 16px 18px;
  border: 1px solid oklch(1 0 0 / 0.16);
  border-radius: 14px;
  max-width: 460px;
  background: oklch(0.22 0.03 265 / 0.78);
}
.mh-card h3 { margin: 0 0 6px; font-size: 15px; font-weight: 620; color: oklch(0.97 0.01 265); }
.mh-card p { margin: 0; font-size: 12.5px; line-height: 1.65; color: oklch(0.93 0.01 265 / 0.85); }
.mh-meta {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 18px;
}
.mh-meta span {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: oklch(0.9 0.02 265 / 0.85);
  border: 1px solid oklch(1 0 0 / 0.18);
  border-radius: 999px;
  padding: 3px 10px;
  background: oklch(0.2 0.03 265 / 0.6);
}
/* ── 读数与铭牌(mono 元数据纪律)── */
.mh-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: oklch(0.16 0.02 265 / 0.78);
  border: 1px solid oklch(1 0 0 / 0.14);
  color: oklch(0.92 0.01 265 / 0.8);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
  pointer-events: none;
  z-index: 3;
}
.mh-layers b { font-weight: 600; color: oklch(0.98 0.01 265); }
@media (max-width: 720px) {
  .mh-layers { display: none; }
  .mh-title { font-size: 28px; line-height: 34px; }
}
/* ── reduced-motion 一刀切:视差停 / 极光漂移停 / 逐字上升停(条目 fallback 口径)── */
@media (prefers-reduced-motion: reduce) {
  .mh-scene .mh-layer { animation: none !important; transform: none !important; }
  .aur-layer { animation: none !important; }
  .mh-char { animation: none !important; }
}
`;function L({locale:g}){const s=g==="zh",[o,y]=t.useState(!1),[l,b]=t.useState(null),c=t.useRef(null),d=t.useRef([]),m=t.useRef(0);t.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),r=()=>y(a.matches);return r(),a.addEventListener("change",r),()=>a.removeEventListener("change",r)},[]),t.useEffect(()=>{b(typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("animation-timeline","scroll()"))},[]),t.useEffect(()=>{const a=c.current;if(!a)return;const r=()=>{const i=Math.max(a.scrollHeight-a.clientHeight,1);a.style.setProperty("--mh-s",`${i}px`)};return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]);const h=l===!1;t.useEffect(()=>{const a=c.current;if(!a)return;const r=d.current;if(o){r.forEach(n=>n&&(n.style.transform=""));return}if(!h){r.forEach(n=>n&&(n.style.transform=""));return}const i=()=>{cancelAnimationFrame(m.current),m.current=requestAnimationFrame(()=>{const n=a.scrollTop;r.forEach((x,j)=>{if(!x)return;const w=Math.min(f*(j+1),1);x.style.transform=`translateY(${((1-w)*n).toFixed(1)}px)`})})};return i(),a.addEventListener("scroll",i,{passive:!0}),()=>{a.removeEventListener("scroll",i),cancelAnimationFrame(m.current)}},[h,o]);const p=s?N:z,v=Array.from(p),k=l===null?"…":l?"css":"js(fallback)";return e.jsxs("div",{className:"demo-stage",children:[e.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[e.jsx("span",{className:"stage-plate-dot"}),"Media Hero"]}),e.jsxs("div",{className:"mh-scene","data-mode":l===!1?"js":"css","data-reduced":o,children:[e.jsx("div",{className:"mh-scroller",ref:c,tabIndex:0,role:"region","aria-label":s?"媒体头图滚动演示":"Media hero scroll demo",children:e.jsxs("div",{className:"mh-world",children:[e.jsx("div",{className:"mh-layer mh-far","aria-hidden":"true",ref:a=>{d.current[0]=a},children:e.jsx("div",{className:"aur-layer"})}),e.jsx("div",{className:"mh-layer mh-mid","aria-hidden":"true",ref:a=>{d.current[1]=a}}),e.jsx("div",{className:"mh-edge","aria-hidden":"true"}),e.jsxs("div",{className:"mh-copy",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mh-kicker",children:s?"媒体头图 · Media Hero":"Media hero"}),e.jsx("h2",{className:"mh-title","aria-label":p,children:e.jsx("span",{"aria-hidden":"true",children:v.map((a,r)=>e.jsx("span",{className:"mh-char",style:{"--ci":r},children:a},`${a}-${r}`))})}),e.jsx("p",{className:"mh-sub",children:s?"背景层以 rate 0.3 拖曳——比前景慢 70%,滚动因此被读作「更少的运动」而非炫技;文字层永远 1:1 随滚动,可读性优先。":"The background trails at rate 0.3 — 70% slower than the foreground, so scrolling reads as reduced motion, not spectacle; text always scrolls 1:1, readability first."}),e.jsxs("p",{className:"mh-meta","aria-hidden":"true",children:[e.jsxs("span",{children:["rate 0.3 · mid ",E]}),e.jsx("span",{children:"blur 42px · saturate 115%"}),e.jsx("span",{children:"drift 18s(demo)"}),e.jsx("span",{children:"stagger 40ms · rise 600ms"})]})]}),e.jsxs("div",{className:"mh-card",children:[e.jsx("h3",{children:s?"视差是减动效手段(M3 官方定义)":"Parallax is a motion-reduction tool (M3's own words)"}),e.jsx("p",{children:s?"M3 转场文档:iOS 前进/后退转场用 parallax,「背景慢于前景」以减少运动量;极光渐变无官方规范(未证实),按「内容层禁用 Liquid Glass」降级为普通渐变层 + 压暗 scrim,文字卡独立于滤镜层保 4.5:1。":"M3's transition doc: iOS transitions use parallax, the background sliding slower than the foreground to reduce motion; aurora gradient has no official spec (unverified) — degraded to a plain gradient layer + dimming scrim per the no-Liquid-Glass-in-content rule, with the text card outside the filter layer holding 4.5:1."})]}),e.jsxs("div",{className:"mh-card",children:[e.jsx("h3",{children:s?"reduced-motion:三层全停":"reduced-motion: all three layers stop"}),e.jsx("p",{children:s?"视差停(所有层静态直出)、极光漂移停、逐字上升停(直接呈现);文本语义不依赖任何一层动画。visionOS 红线:避免 ~0.2Hz 持续振荡。":"Parallax stops (static layers), aurora drift stops, per-char rise stops (direct render); text semantics never depend on animation. visionOS red line: avoid ~0.2Hz sustained oscillation."})]})]})]})}),e.jsxs("p",{className:"mh-layers","aria-hidden":"true",children:[e.jsxs("span",{children:[e.jsx("b",{children:"1"})," parallax: rate 0.3 · far 30% · mid 60% · mode ",k]}),e.jsxs("span",{children:[e.jsx("b",{children:"2"})," aurora: 4 spots · blur 42px · sat 115% · drift 18s"]}),e.jsxs("span",{children:[e.jsx("b",{children:"3"})," kinetic: chars · stagger 40ms · rise 600ms · wght 400"]}),e.jsxs("span",{children:[e.jsx("b",{children:"4"})," scrim: scroll edge + dim · text outside filter"]}),o&&e.jsxs("span",{children:[e.jsx("b",{children:"!"})," reduced-motion: static / no drift / no rise"]})]})]}),e.jsx("style",{children:M})]})}export{L as default};
