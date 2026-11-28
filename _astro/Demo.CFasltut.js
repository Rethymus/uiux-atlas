import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as F}from"./color.DuEPkvq5.js";import{w as L}from"./urls.C_nDjrQ8.js";import{D as q}from"./DemoStage.vW1CgYCd.js";const V=[{id:"alps",zh:"雪山",en:"Alps photo"},{id:"nebula",zh:"星空",en:"Nebula photo"}],R={w:148,h:56},z={w:232,h:176},C=60;function _(){return typeof navigator>"u"?!1:/Chrom(e|ium)|Edg\//.test(navigator.userAgent)&&!/Firefox|FxiOS/.test(navigator.userAgent)}const $=`
.demo-stage {
  --lg-dimming: 35%;
  --lg-blur: 20px;
  --lg-tint: 0%;
}
.lg-scene { position: absolute; inset: 0; overflow: hidden; }
.lg-bg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
/* 『活体内容』:漂移色斑 + 彩色大字,只动 transform,供玻璃舱每帧采样 */
.lg-blob { position: absolute; width: 46%; aspect-ratio: 1; border-radius: 50%; filter: blur(46px); }
.lg-blob-a { left: -6%; top: 8%; background: radial-gradient(circle at 40% 40%, oklch(0.75 0.18 320 / 0.95), transparent 70%); }
.lg-blob-b { right: -8%; bottom: 4%; background: radial-gradient(circle at 60% 60%, oklch(0.72 0.16 190 / 0.9), transparent 70%); }
.lg-scene[data-playing="true"] .lg-blob-a { animation: lg-drift-a 14s ease-in-out infinite alternate; }
.lg-scene[data-playing="true"] .lg-blob-b { animation: lg-drift-b 17s ease-in-out infinite alternate; }
.lg-word {
  position: absolute; left: 10%; top: 18%; margin: 0;
  font-size: clamp(40px, 8cqw, 84px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.05;
  background: linear-gradient(94deg, oklch(0.86 0.15 300), oklch(0.83 0.17 200) 60%, oklch(0.9 0.14 90));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.lg-word small { display: block; font-size: 0.3em; letter-spacing: 0.32em; color: rgb(255 255 255 / 0.8); -webkit-text-fill-color: rgb(255 255 255 / 0.8); }
/* 玻璃舱:官方默认形状 Capsule + 1px 内侧高光;
   morph 过渡 token 320ms cubic-bezier(0.4,0,0.6,1) = apple.com 生产 CSS 实抓(调研 09 §1.4a) */
.lg-pod {
  position: absolute; left: 50%; top: 58%; translate: -50% -50%;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.08);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55), 0 10px 30px rgb(0 0 0 / 0.28);
  -webkit-backdrop-filter: blur(var(--lg-blur));
  backdrop-filter: blur(var(--lg-blur));
  color: #10131c;
  animation: lg-in 0.5s ease-out both;
  transition:
    width 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    height 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    border-radius 0.32s cubic-bezier(0.4, 0, 0.6, 1),
    box-shadow 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
/* 折射:SVG feDisplacementMap,仅 Chromium 启用(demo 以 UA 探测控制该规则生效) */
.lg-scene[data-refraction="on"] .lg-pod {
  -webkit-backdrop-filter: url(#lg-refraction-filter) blur(var(--lg-blur));
  backdrop-filter: url(#lg-refraction-filter) blur(var(--lg-blur));
}
/* morph 放大态:更深的阴影(官方定性『玻璃变大时投下更深更浓的阴影』,调研 09 §8.4) */
.lg-scene[data-morph="panel"] .lg-pod {
  border-radius: 24px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.55), 0 26px 60px rgb(0 0 0 / 0.42);
}
/* 子层通用抬升(须先于下面各绝对定位层声明,避免 position: relative 覆盖它们) */
.lg-pod > * { position: relative; z-index: 1; }
/* 状态层:dimming 不透明度由 --lg-dimming 驱动(默认 35%,HIG 对 clear 的建议) */
.lg-veil {
  position: absolute; inset: 0; border-radius: inherit;
  opacity: var(--lg-dimming); transition: opacity 0.25s ease;
}
.lg-scene[data-variant="regular"] .lg-veil { background: rgb(255 255 255 / 0.92); }
.lg-scene[data-variant="clear"] .lg-veil { background: rgb(8 10 18 / 0.92); }
.lg-tintlayer { position: absolute; inset: 0; border-radius: inherit; background: rgb(64 96 255 / 0.85); opacity: var(--lg-tint); transition: opacity 0.2s ease; }
/* 触碰辉光:位置与显隐由 demo 直接写 style(不经 CSS 变量,避免逐帧子树样式失效);
   辉光配方为演示近似,官方未公布数值(调研 09 §1.4d/§8.8) */
.lg-glow { position: absolute; inset: 0; border-radius: inherit; z-index: 1; opacity: 0; pointer-events: none; }
/* 胶囊态控件层 ↔ 面板态菜单层:就地交叉淡变(pop 开露出内容,调研 09 §8.3) */
.lg-controls {
  position: absolute; inset: 0; z-index: 1;
  display: flex; align-items: center; justify-content: center; gap: 4px;
  transition: opacity 0.25s ease;
}
.lg-scene[data-morph="panel"] .lg-controls { opacity: 0; pointer-events: none; }
.lg-menu {
  position: absolute; inset: 0; z-index: 1;
  display: flex; flex-direction: column; justify-content: center; gap: 2px;
  padding: 12px 14px;
  opacity: 0; transition: opacity 0.25s ease; pointer-events: none;
}
.lg-scene[data-morph="panel"] .lg-menu { opacity: 1; pointer-events: auto; }
.lg-menu-row {
  display: flex; align-items: center; gap: 10px;
  border: 0; border-radius: 12px; padding: 8px 10px;
  font-size: 12.5px; cursor: pointer; color: inherit; background: transparent; text-align: left;
}
.lg-menu-row:hover { background: rgb(255 255 255 / 0.25); }
.lg-btn {
  width: 40px; height: 40px; border: 0; border-radius: 50%; cursor: pointer;
  font-size: 14px; color: inherit; background: transparent;
}
.lg-btn:hover { background: rgb(255 255 255 / 0.25); }
.lg-btn-main { background: rgb(20 30 60 / 0.55); color: #fff; }
.lg-caption {
  position: absolute; left: 12px; right: 12px; bottom: 10px;
  display: flex; gap: 8px; flex-wrap: wrap; align-items: center; font-size: 11px;
}
.lg-caption > span {
  padding: 3px 10px; border-radius: 999px; color: #fff;
  background: rgb(0 0 0 / 0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
}
.lg-switcher { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: rgb(0 0 0 / 0.45); }
.lg-switcher button { border: 0; border-radius: 999px; padding: 3px 10px; font-size: 11px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.lg-switcher button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
@keyframes lg-drift-a { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(14vw, 8vh) rotate(40deg); } }
@keyframes lg-drift-b { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(-12vw, -9vh) rotate(-35deg); } }
@keyframes lg-in { from { opacity: 0; translate: -50% calc(-50% + 10px); } to { opacity: 1; translate: -50% -50%; } }
@media (prefers-reduced-motion: reduce) {
  .lg-pod { animation: none; transition: none; }
  .lg-controls, .lg-menu { transition: none; }
  .lg-scene[data-playing="true"] .lg-blob-a, .lg-scene[data-playing="true"] .lg-blob-b { animation: none; }
  .lg-veil, .lg-tintlayer { transition: none; }
}
`;function Z({entryId:m,schema:h}){const n=F(m,h),[x,M]=r.useState(()=>n.get("variant")),[p,E]=r.useState(()=>n.get("refraction")),[c,A]=r.useState(()=>n.get("morph")),[y,D]=r.useState("nebula"),[o,v]=r.useState(!0),[w,B]=r.useState(!1),k=r.useRef(null),u=r.useRef(null),d=r.useRef(null),j=r.useRef(null),N=r.useRef(null),b=r.useRef(!1),f=r.useRef({x:0,y:0});r.useEffect(()=>{B(_())},[]),r.useEffect(()=>n.subscribe(()=>{M(n.get("variant")),E(n.get("refraction")),A(n.get("morph"))}),[n]),r.useEffect(()=>{const t=N.current;if(!t)return;const a=typeof p=="number"?p:0,i=c==="panel"?z.w/R.w:1;t.setAttribute("scale",String(Math.round(a*i)))},[p,c]);const G=t=>{const a=k.current,i=u.current;if(!a||!i)return;const s=a.getBoundingClientRect(),g=i.getBoundingClientRect(),P=l=>Math.max(-1,Math.min(1,l));f.current={x:P((t.clientX-(g.left+g.width/2))/s.width*2),y:P((t.clientY-(g.top+g.height/2))/s.height*2)},!b.current&&(b.current=!0,requestAnimationFrame(()=>{b.current=!1;const l=j.current;l&&(l.setAttribute("dx",String(Math.round(f.current.x*C))),l.setAttribute("dy",String(Math.round(f.current.y*C))))}))},I=t=>{const a=d.current,i=u.current;if(!a||!i)return;const s=i.getBoundingClientRect();a.style.background=`radial-gradient(120px circle at ${Math.round(t.clientX-s.left)}px ${Math.round(t.clientY-s.top)}px, rgb(255 255 255 / 0.35), transparent 72%)`,a.style.opacity="1"},O=()=>{d.current&&(d.current.style.opacity="0")},S=c==="panel"?z:R;return e.jsxs(q,{entryId:m,schema:h,children:[e.jsxs("div",{className:"lg-scene","data-variant":x,"data-refraction":w?"on":"off","data-playing":o,"data-morph":c,ref:k,onPointerMove:G,children:[e.jsxs("div",{className:"lg-bg",children:[e.jsx("img",{src:L(`photos/glass-${y}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async"}),e.jsx("div",{className:"lg-blob lg-blob-a"}),e.jsx("div",{className:"lg-blob lg-blob-b"})]}),e.jsxs("p",{className:"lg-word","aria-hidden":"true",children:[e.jsx("small",{children:"LIQUID GLASS"}),"Functional Layer"]}),e.jsxs("div",{className:"lg-pod",role:"toolbar","aria-label":"媒体控制示例 Media controls sample",ref:u,style:{width:S.w,height:S.h},onPointerMove:I,onPointerLeave:O,children:[e.jsx("div",{className:"lg-tintlayer","aria-hidden":"true"}),e.jsx("div",{className:"lg-veil","aria-hidden":"true"}),e.jsx("div",{className:"lg-glow",ref:d,"aria-hidden":"true"}),e.jsxs("div",{className:"lg-controls",children:[e.jsx("button",{type:"button",className:"lg-btn","aria-label":"上一曲 Previous",children:"⏮"}),e.jsx("button",{type:"button",className:"lg-btn lg-btn-main","aria-pressed":o,"aria-label":o?"暂停背景漂移 Pause backdrop drift":"播放背景漂移 Play backdrop drift",onClick:()=>v(t=>!t),children:o?"⏸":"▶"}),e.jsx("button",{type:"button",className:"lg-btn","aria-label":"下一曲 Next",children:"⏭"})]}),e.jsxs("div",{className:"lg-menu",children:[e.jsx("button",{type:"button",className:"lg-menu-row","aria-pressed":o,onClick:()=>v(t=>!t),children:o?"⏸ 暂停漂移 Pause drift":"▶ 播放漂移 Play drift"}),e.jsx("button",{type:"button",className:"lg-menu-row","aria-label":"上一曲 Previous",children:"⏮ 上一曲 Previous"}),e.jsx("button",{type:"button",className:"lg-menu-row","aria-label":"下一曲 Next",children:"⏭ 下一曲 Next"})]})]}),e.jsxs("div",{className:"lg-caption","aria-live":"polite",children:[e.jsx("span",{children:x==="regular"?"regular · 亮度调整近似(官方未公布数值)":"clear · 深色 dimming 层(HIG 建议 35%)"}),e.jsx("span",{children:w?"折射随指针 · feDisplacementMap(仅 Chromium;放大态按尺寸比例增强)":"回退:纯模糊(无 SVG 背景折射支持)"}),e.jsx("div",{className:"lg-switcher",role:"group","aria-label":"背景切换 Backdrop switcher",children:V.map(t=>e.jsx("button",{type:"button","aria-pressed":y===t.id,title:t.en,onClick:()=>D(t.id),children:t.zh},t.id))})]}),e.jsx("svg",{className:"lg-defs",width:"0",height:"0","aria-hidden":"true",focusable:"false",style:{position:"absolute"},children:e.jsxs("filter",{id:"lg-refraction-filter",x:"-30%",y:"-30%",width:"160%",height:"160%",colorInterpolationFilters:"sRGB",children:[e.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.009 0.011",numOctaves:"2",seed:"7",result:"noise"}),e.jsx("feOffset",{in:"noise",dx:"0",dy:"0",result:"noise-offset",ref:j}),e.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"noise-offset",scale:"34",xChannelSelector:"R",yChannelSelector:"G",ref:N})]})})]}),e.jsx("style",{children:$})]})}export{Z as default};
