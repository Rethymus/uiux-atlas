import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{w as u}from"./urls.C_nDjrQ8.js";import{D as h}from"./DemoStage.vW1CgYCd.js";const x=[{id:"faux",zh:"假位移 B",en:"Faux (route B)"},{id:"lens",zh:"真位移 A",en:"Lens (route A)"},{id:"off",zh:"关闭",en:"Off"}],b=[{id:"nebula",zh:"星空",en:"Nebula photo"},{id:"gradient",zh:"渐变",en:"Gradient"}],f=`
.gt-scene { position: absolute; inset: 0; overflow: hidden; }
.gt-bg, .gt-bg img, .gt-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.gt-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.5 0.16 300 / 0.85), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.55 0.14 200 / 0.8), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.4 0.15 165 / 0.85), transparent 72%),
    oklch(0.18 0.05 265);
}
.gt-center {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  text-align: center;
  width: max-content;
  max-width: calc(100% - 40px);
  animation: gt-in 0.45s ease-out both;
}
/* 折射文字主体:真实 DOM 文本;副本与滤镜均为装饰层 */
.gt-word {
  position: relative;
  margin: 0;
  font-size: clamp(40px, 11vw, 88px);
  line-height: 1.1;
  font-weight: 750;
  letter-spacing: 0.02em;
  color: #f5f7fa;
  text-shadow: 0 10px 32px rgb(0 0 0 / 0.45);
}
/* 路线 B 假位移:双层字形副本,色相错开 + screen 混合(纯装饰,不拦截指针) */
.gt-word::before,
.gt-word::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  opacity: 0;
  pointer-events: none;
}
.gt-word::before {
  transform: translateX(var(--gt-shift));
  filter: hue-rotate(calc(var(--gt-hue) * -1)) saturate(3);
}
.gt-word::after {
  transform: translateX(calc(var(--gt-shift) * -1));
  filter: hue-rotate(var(--gt-hue)) saturate(3);
}
/* 离散开关:切换路线不做过渡动画(两种路线成像机理不同,中间态无意义) */
.gt-scene[data-route="faux"] .gt-word::before,
.gt-scene[data-route="faux"] .gt-word::after { opacity: 0.5; }
/* 路线 A 真位移:元素级 SVG 滤镜(逐浏览器矩阵调研未核验,失效即静默降级) */
.gt-scene[data-route="lens"] .gt-word { filter: url(#gt-lens); }
.gt-caption { margin: 14px 0 0; font-size: 12px; color: rgb(245 247 250 / 0.72); }
.gt-toolbar, .gt-toolbar2 {
  position: absolute;
  right: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.gt-toolbar { top: 12px; }
.gt-toolbar2 { top: 56px; }
.gt-toolbar button, .gt-toolbar2 button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.gt-toolbar button[aria-pressed="true"], .gt-toolbar2 button[aria-pressed="true"] {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}
.gt-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .gt-note { display: none; }
  .gt-toolbar, .gt-toolbar2 { top: auto; bottom: auto; }
  .gt-toolbar { bottom: 56px; left: 12px; right: auto; }
  .gt-toolbar2 { bottom: 12px; left: 12px; right: auto; }
}
@keyframes gt-in {
  from { opacity: 0; translate: -50% calc(-50% + 6px); }
  to { opacity: 1; translate: -50% -50%; }
}
@media (prefers-reduced-motion: reduce) {
  .gt-center { animation: none; }
}
`;function k({entryId:i,schema:n}){const a=p(i,n),[s,l]=r.useState("faux"),[o,d]=r.useState("nebula"),[c,g]=r.useState(()=>a.get("lensScale"));return r.useEffect(()=>a.subscribe(()=>{g(a.get("lensScale"))}),[a]),t.jsx(h,{entryId:i,schema:n,children:t.jsxs("div",{className:"gt-scene","data-route":s,children:[t.jsx("svg",{width:"0",height:"0","aria-hidden":"true",focusable:"false",children:t.jsxs("filter",{id:"gt-lens",x:"-20%",y:"-20%",width:"140%",height:"140%",colorInterpolationFilters:"sRGB",children:[t.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.008",numOctaves:1,seed:7,result:"map"}),t.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"map",scale:c,xChannelSelector:"R",yChannelSelector:"G"})]})}),t.jsx("div",{className:"gt-bg","aria-hidden":"true",children:o==="gradient"?t.jsx("div",{className:"gt-gradient"}):t.jsx("img",{src:u(`photos/glass-${o}.jpg`),alt:"","aria-hidden":"true",width:1600,height:1067,loading:"lazy",decoding:"async"})}),t.jsxs("div",{className:"gt-center",children:[t.jsx("p",{className:"gt-word","data-text":"折射 GLASS",children:"折射 GLASS"}),t.jsx("p",{className:"gt-caption",children:"字形边缘的透镜变形与红蓝错位 / Lens warp and red-blue misalignment at the glyph edge."})]}),t.jsx("div",{className:"gt-toolbar",role:"group","aria-label":"路线切换 Route switcher",children:x.map(e=>t.jsx("button",{type:"button","aria-pressed":s===e.id,title:e.en,onClick:()=>l(e.id),children:e.zh},e.id))}),t.jsx("div",{className:"gt-toolbar2",role:"group","aria-label":"背景切换 Backdrop switcher",children:b.map(e=>t.jsx("button",{type:"button","aria-pressed":o===e.id,title:e.en,onClick:()=>d(e.id),children:e.zh},e.id))}),t.jsx("p",{className:"gt-note",children:"路线 A 元素级 filter:url() 的逐浏览器矩阵调研未核验,失效即静默降级;文字级先例未核验(§12.5)。 / Route A's element-level filter:url() matrix is unverified in the research — silent downgrade on failure; no verified text-level precedent (§12.5)."}),t.jsx("style",{children:f})]})})}export{k as default};
