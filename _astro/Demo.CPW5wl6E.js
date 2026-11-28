import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as y}from"./DemoStage.vW1CgYCd.js";import{u as S}from"./use-reduced-motion.p3D3Z0_d.js";const x=/^(entry|exit|contain)/,j=`
.sd-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; }
.sd-scroller {
  position: relative; flex: 1; min-height: 0; overflow-y: auto;
  border: 1px solid var(--border); border-radius: 12px; background: var(--surface);
  scrollbar-width: thin; overscroll-behavior: contain;
}
.sd-scroller:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sd-progress {
  position: sticky; top: 0; z-index: 2; height: 6px; margin: 8px 10px 0;
  border-radius: 999px; background: color-mix(in srgb, var(--border) 45%, transparent);
  overflow: hidden;
}
.sd-bar {
  height: 100%; border-radius: inherit;
  background: linear-gradient(90deg, oklch(0.62 0.16 250), oklch(0.72 0.16 165));
  transform: scaleX(0); transform-origin: 0 50%;
}
@supports (animation-timeline: scroll()) {
  .sd-bar {
    animation: sd-grow linear both;
    animation-timeline: scroll();   /* 最近的滚动容器;必须写在 animation 简写之后 */
    animation-duration: auto;
  }
}
@keyframes sd-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.sd-section { padding: 26px 22px 10px; font-size: 12px; color: var(--text-faint); line-height: 1.6; }
.sd-tall1 { min-height: 150px; }
.sd-tall2 { min-height: 170px; padding-bottom: 30px; }
.sd-card {
  margin: 12px 18px; padding: 16px 18px; border-radius: 12px;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, var(--surface)), var(--surface));
}
@supports (animation-timeline: view()) {
  .sd-card { animation: sd-reveal linear both; animation-duration: auto; }
}
@keyframes sd-reveal {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: none; }
}
.sd-scene[data-reduced="true"] .sd-card { animation: none !important; opacity: 1 !important; transform: none !important; }
.sd-card h3 { margin: 0 0 6px; font-size: 15px; font-weight: 650; }
.sd-card p { margin: 0; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.sd-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); }
.sd-btn { border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px; font-size: 12px; cursor: pointer; background: var(--surface); color: inherit; }
.sd-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
.sd-chip-warn { color: oklch(0.65 0.15 70); }
`;function C({entryId:l,schema:p}){const n=w(l,p),[f,g]=t.useState(null),o=S()===!0,i=t.useRef(null),d=t.useRef(null),m=()=>({timeline:n.get("timeline"),rangeStart:n.get("rangeStart"),rangeEnd:n.get("rangeEnd")}),[s,h]=t.useState(m);t.useEffect(()=>n.subscribe(()=>{h(m())}),[n]);const c=s.timeline==="scroll()"&&(x.test(s.rangeStart)||x.test(s.rangeEnd)),r={timeline:s.timeline,rangeStart:c?"cover 0%":s.rangeStart,rangeEnd:c?"cover 100%":s.rangeEnd};t.useEffect(()=>{g(typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("animation-timeline","view()"))},[]),t.useEffect(()=>{const a=d.current;a&&(a.style.setProperty("animation-timeline",r.timeline),a.style.setProperty("animation-range",`${r.rangeStart} ${r.rangeEnd}`))},[r.timeline,r.rangeStart,r.rangeEnd]);const b=()=>{const a=i.current,u=d.current;!a||!u||a.scrollTo({top:Math.max(0,u.offsetTop-44),behavior:o?"auto":"smooth"})},v=()=>{i.current?.scrollTo({top:0,behavior:o?"auto":"smooth"})};return e.jsx(y,{entryId:l,schema:p,children:e.jsxs("div",{className:"sd-scene","data-reduced":o,children:[e.jsxs("div",{className:"sd-scroller",ref:i,tabIndex:0,role:"region","aria-label":"滚动驱动动画演示容器 scroll-driven animations demo container",children:[e.jsx("div",{className:"sd-progress",children:e.jsx("div",{className:"sd-bar"})}),e.jsx("p",{className:"sd-section sd-tall1",children:"向下滚动 / Scroll down —— 顶部进度条固定消费 scroll()(整条容器的滚动进度); 中间的卡片消费 timeline/range 参数。"}),e.jsxs("div",{className:"sd-card",ref:d,children:[e.jsx("h3",{children:"Reveal 卡片 Reveal Card"}),e.jsxs("p",{children:["我的动画进度来自 ",r.timeline==="scroll()"?"容器的滚动比例":"我自己在滚动口里的可见进度",", 区间 ",r.rangeStart," → ",r.rangeEnd,"。"]})]}),e.jsx("p",{className:"sd-section sd-tall2",children:"继续滚动观察卡片退出 / keep scrolling to watch the card leave —— view() 模式下反向滚动会回放揭示过程。"})]}),e.jsxs("div",{className:"sd-controls",children:[e.jsx("button",{type:"button",className:"sd-btn",onClick:b,children:"滚到卡片 To card"}),e.jsx("button",{type:"button",className:"sd-btn",onClick:v,children:"回顶部 Top"}),e.jsxs("span",{className:"sd-chip",children:["timeline: ",r.timeline]}),e.jsxs("span",{className:"sd-chip",children:["range: ",r.rangeStart," → ",r.rangeEnd]}),c&&e.jsx("span",{className:"sd-chip sd-chip-warn",children:"scroll() 下 entry/exit/contain 仅 view() 有定义,已按 cover 全程处理 / substituted with full cover"}),f===!1&&e.jsx("span",{className:"sd-chip sd-chip-warn",children:"本浏览器不支持,卡片静态直出 / unsupported, card static"}),o&&e.jsx("span",{className:"sd-chip",children:"reduced-motion: 卡片始终可见 / card always visible"})]}),e.jsx("style",{children:j})]})})}export{C as default};
