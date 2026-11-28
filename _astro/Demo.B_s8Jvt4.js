import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as p}from"./index.DLkBFFtG.js";import{g as D}from"./color.DuEPkvq5.js";import{D as I}from"./DemoStage.vW1CgYCd.js";import{u as U}from"./use-reduced-motion.p3D3Z0_d.js";const h=Math.PI/180;function j(i,d,r,s,e){const m=1.3333333333333333*Math.tan((e-s)/4)*r,o=n=>Number(n.toFixed(2)),x=n=>i+r*Math.cos(n),l=n=>d+r*Math.sin(n),N=n=>-Math.sin(n),f=n=>Math.cos(n);return[o(x(s)+m*N(s)),o(l(s)+m*f(s)),o(x(e)-m*N(e)),o(l(e)-m*f(e)),o(x(e)),o(l(e))]}const C=[j(24,24,12,-90*h,-180*h),j(24,24,12,-180*h,-270*h),j(24,24,12,-270*h,-360*h),j(24,24,12,-360*h,-450*h)],_=Math.sqrt(180),$=Math.atan2(12,-6),Z=Math.atan2(-12,-6)+2*Math.PI,L=[C[0],C[1],j(30,24,_,$,Math.PI),j(30,24,_,Math.PI,Z)],T=[24,12,...C.flat()],q=[24,12,...L.flat()],O=i=>`M ${i[0]} ${i[1]} C ${i.slice(2).join(" ")} Z`,F=O(T),G=O(q),P=Array.from({length:8},(i,d)=>{const r=d*45*h,s=e=>Number(e.toFixed(2));return{x1:s(24+13*Math.cos(r)),y1:s(24+13*Math.sin(r)),x2:s(24+17.5*Math.cos(r)),y2:s(24+17.5*Math.sin(r))}}),E=(i,d,r)=>{const s=1-r;return 3*s*s*r*i+3*s*r*r*d+r*r*r},W=(i,d,r,s,e)=>{if(i<=0)return 0;if(i>=1)return 1;let m=0,o=1;for(let x=0;x<24;x++){const l=(m+o)/2;E(d,s,l)<i?m=l:o=l}return E(r,e,(m+o)/2)},H=`
/* —— 舞台本地主题变量:只作用于 .tt-scene 内部,不写 :root、不动站点主题 —— */
.tt-scene {
  --tt-bg: #f7f2e7;
  --tt-fg: #3a3220;
  --tt-dim: rgba(58, 50, 32, 0.62);
  --tt-track: #e5dfcf;
  --tt-line: rgba(58, 50, 32, 0.28);
  --tt-sun: #f6a821;
  --tt-moon: #9aa7ff;
  /* duration / bounce 为 JS 型参数,由组件以内联样式写入 --ttm-* */
  --ttm-duration: 300ms;
  --ttm-ease: cubic-bezier(0.34, 1.336, 0.64, 1);
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 13px; padding: 8px;
  background: var(--tt-bg); color: var(--tt-fg);
  transition: background-color var(--ttm-duration) var(--ttm-ease), color var(--ttm-duration) var(--ttm-ease);
}
.tt-scene[data-fx-theme="dark"] {
  --tt-bg: #141a2e;
  --tt-fg: #e8ecff;
  --tt-dim: rgba(232, 236, 255, 0.62);
  --tt-track: #26325a;
  --tt-line: rgba(232, 236, 255, 0.3);
}
/* ≤900 单栏档:舞台随内容生长,顶部预留铭牌带 --plate-h(同 slot-spring 处方) */
@media (max-width: 900px) {
  .tt-scene { position: static; width: 100%; padding: var(--plate-h, 40px) 8px 8px; }
}

/* —— 主行:日 · 按钮 · 月 —— */
.tt-row { display: flex; align-items: center; gap: 14px; }
.tt-side { font-size: 15px; color: var(--tt-dim); transition: color var(--ttm-duration) var(--ttm-ease); }
.tt-side[data-on="true"] { color: var(--tt-fg); font-weight: 650; }

.tt-toggle {
  position: relative; border: 0; padding: 0; cursor: pointer;
  background: var(--tt-track); border-radius: 999px;
  transition: background-color var(--ttm-duration) var(--ttm-ease);
}
.tt-toggle:focus-visible { outline: 2px solid var(--tt-fg); outline-offset: 3px; }
.tt-toggle--goo { width: 64px; height: 32px; }
.tt-toggle--icon { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; }

/* goo 滤镜宿主:加在容器、留出血(inset −12px ≥ blur σ10 的外扩),Bebber 三诫 */
.tt-goo-liquid { position: absolute; inset: -12px; filter: url(#ttm-goo); pointer-events: none; }
.tt-dot { position: absolute; width: 10px; height: 10px; border-radius: 50%; }
.tt-dot-sun { left: 11px; top: 11px; background: var(--tt-sun); }   /* 圆心 (16,16) */
.tt-dot-moon { left: 43px; top: 11px; background: var(--tt-moon); } /* 圆心 (48,16) */
/* blob 是唯一动元素:translate 位移(CSS transition 重定目标 = 可中断);
   blob 色随主题从日液过渡到月液,feComposite atop 保色不糊 */
.tt-blob {
  position: absolute; left: 5px; top: 5px; width: 22px; height: 22px; border-radius: 50%;
  background: var(--tt-sun); translate: 0 0;
  transition: translate var(--ttm-duration) var(--ttm-ease), background-color var(--ttm-duration) var(--ttm-ease);
}
.tt-scene[data-fx-theme="dark"] .tt-blob { translate: 32px 0; background: var(--tt-moon); }

/* path 招:单条 path,颜色随主题,几何由 rAF 逐帧写 d */
.tt-morph-svg, .tt-icon-svg { display: block; }
.tt-morph-svg { color: var(--tt-sun); transition: color var(--ttm-duration) var(--ttm-ease); }
.tt-scene[data-fx-theme="dark"] .tt-morph-svg { color: var(--tt-moon); }
.tt-morph-path { fill: currentColor; }

/* rotateScale 招:双层图标,transform + opacity 交叉换位(transform-box: fill-box) */
.tt-rs-sun, .tt-rs-moon {
  transform-box: fill-box; transform-origin: center;
  transition: transform var(--ttm-duration) var(--ttm-ease), opacity var(--ttm-duration) var(--ttm-ease);
}
.tt-rs-sun { color: var(--tt-sun); opacity: 1; transform: rotate(0deg) scale(1); }
.tt-rs-moon { color: var(--tt-moon); opacity: 0; transform: rotate(-90deg) scale(0.4); }
.tt-scene[data-fx-theme="dark"] .tt-rs-sun { opacity: 0; transform: rotate(90deg) scale(0.4); }
.tt-scene[data-fx-theme="dark"] .tt-rs-moon { opacity: 1; transform: rotate(0deg) scale(1); }

/* —— 对照条:三招同 recipe 同步演示 —— */
.tt-mirrors { display: flex; align-items: flex-end; gap: 20px; }
.tt-mirror { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.tt-mirror-label { font-size: 11px; color: var(--tt-dim); font-family: var(--font-mono, monospace); }
.tt-mirror[data-active="true"] .tt-mirror-label { color: var(--tt-fg); font-weight: 650; }
.tt-mini-icon { width: 38px; height: 38px; }

.tt-mini-goo { position: relative; width: 48px; height: 24px; border-radius: 999px; background: var(--tt-track); transition: background-color var(--ttm-duration) var(--ttm-ease); }
.tt-mini-goo-liquid { position: absolute; inset: -7px; filter: url(#ttm-goo-sm); pointer-events: none; }
.tt-mini-dot { position: absolute; width: 6px; height: 6px; border-radius: 50%; }
.tt-mini-dot-sun { left: 9px; top: 9px; background: var(--tt-sun); }   /* 圆心 (12,12) */
.tt-mini-dot-moon { left: 33px; top: 9px; background: var(--tt-moon); } /* 圆心 (36,12) */
.tt-mini-blob {
  position: absolute; left: 4px; top: 4px; width: 16px; height: 16px; border-radius: 50%;
  background: var(--tt-sun); translate: 0 0;
  transition: translate var(--ttm-duration) var(--ttm-ease), background-color var(--ttm-duration) var(--ttm-ease);
}
.tt-scene[data-fx-theme="dark"] .tt-mini-blob { translate: 24px 0; background: var(--tt-moon); }

/* —— 读数与说明 —— */
.tt-readout { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; font-size: 12px; color: var(--tt-dim); font-variant-numeric: tabular-nums; }
.tt-tag { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--tt-line); transition: border-color var(--ttm-duration) var(--ttm-ease); }
.tt-hint { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.6; color: var(--tt-dim); text-align: left; }

/* 滤镜/裁剪 defs:width/height 置 0 而非 display:none(部分引擎不渲染隐藏 SVG 的滤镜) */
.tt-defs { position: absolute; width: 0; height: 0; overflow: hidden; }

/* reduced-motion:时长视作 0 —— !important 压过内联变量;data-fx-duration 亦置 "0",
   rAF 由 JS 直接落终态,三处一致(WCAG 2.3.3 C39) */
@media (prefers-reduced-motion: reduce) {
  .tt-scene { --ttm-duration: 0ms !important; }
}
`;function X({entryId:i,schema:d}){const r=D(i,d),s=()=>({morph:r.get("morph"),duration:r.get("duration"),bounce:r.get("bounce")}),[e,m]=p.useState(s),[o,x]=p.useState("light"),l=U()===!0;p.useEffect(()=>r.subscribe(()=>{m(s())}),[r]);const N=p.useRef(null),f=p.useRef(0),n=p.useRef(null),b=()=>{n.current!==null&&(cancelAnimationFrame(n.current),n.current=null)},y=a=>{const c=N.current;if(!c)return;const v=T.map((u,w)=>u+(q[w]-u)*a),S=O(v.map(u=>Number(u.toFixed(2))));c.querySelectorAll(".tt-morph-path").forEach(u=>{u.setAttribute("d",S)})},g=p.useMemo(()=>{const a=1+.56*e.bounce;return{x1:.34,y1:a,x2:.64,y2:1,css:`cubic-bezier(0.34, ${a.toFixed(3)}, 0.64, 1)`}},[e.bounce]),z=p.useMemo(()=>{let a=0;for(let c=0;c<=2e3;c++){const v=E(g.y1,1,c/2e3);v>a&&(a=v)}return Math.max(0,(a-1)*100)},[g.y1]);p.useEffect(()=>{const a=o==="dark"?1:0;if(l)return b(),f.current=a,y(a),b;const c=f.current;if(b(),c===a)return y(a),b;const v=performance.now(),S=Math.max(1,e.duration),u=w=>{const R=Math.min(1,(w-v)/S),A=c+(a-c)*W(R,g.x1,g.y1,g.x2,g.y2);f.current=A,y(A),n.current=R<1?requestAnimationFrame(u):null};return n.current=requestAnimationFrame(u),b},[o,e.duration,e.bounce,l]),p.useEffect(()=>b,[]);const k=()=>x(a=>a==="light"?"dark":"light"),B={"--ttm-duration":`${e.duration}ms`,"--ttm-ease":g.css},M="切换深浅主题 Toggle dark / light theme";return t.jsx(I,{entryId:i,schema:d,children:t.jsxs("div",{ref:N,className:"tt-scene","data-fx-stage":!0,"data-fx-theme":o,"data-fx-duration":l?"0":String(e.duration),style:B,children:[t.jsx("svg",{className:"tt-defs","aria-hidden":"true",focusable:"false",children:t.jsxs("defs",{children:[t.jsxs("filter",{id:"ttm-goo",x:"-60%",y:"-60%",width:"220%",height:"220%",children:[t.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"10",result:"b"}),t.jsx("feColorMatrix",{in:"b",type:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",result:"g"}),t.jsx("feComposite",{in:"SourceGraphic",in2:"g",operator:"atop"})]}),t.jsxs("filter",{id:"ttm-goo-sm",x:"-60%",y:"-60%",width:"220%",height:"220%",children:[t.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"5",result:"b"}),t.jsx("feColorMatrix",{in:"b",type:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",result:"g"}),t.jsx("feComposite",{in:"SourceGraphic",in2:"g",operator:"atop"})]})]})}),t.jsxs("div",{className:"tt-row",children:[t.jsx("span",{className:"tt-side","data-on":o==="light",children:"日 Day"}),e.morph==="gooey"&&t.jsx("button",{type:"button","data-fx-toggle":!0,className:"tt-toggle tt-toggle--goo","aria-pressed":o==="dark","aria-label":M,onClick:k,children:t.jsxs("span",{className:"tt-goo-liquid","aria-hidden":"true",children:[t.jsx("span",{className:"tt-dot tt-dot-sun"}),t.jsx("span",{className:"tt-dot tt-dot-moon"}),t.jsx("span",{className:"tt-blob"})]})}),e.morph==="path"&&t.jsx("button",{type:"button","data-fx-toggle":!0,className:"tt-toggle tt-toggle--icon","aria-pressed":o==="dark","aria-label":M,onClick:k,children:t.jsx("svg",{className:"tt-morph-svg",viewBox:"0 0 48 48",width:"40",height:"40","aria-hidden":"true",children:t.jsx("path",{className:"tt-morph-path",d:F})})}),e.morph==="rotateScale"&&t.jsx("button",{type:"button","data-fx-toggle":!0,className:"tt-toggle tt-toggle--icon","aria-pressed":o==="dark","aria-label":M,onClick:k,children:t.jsxs("svg",{className:"tt-icon-svg",viewBox:"0 0 48 48",width:"44",height:"44","aria-hidden":"true",children:[t.jsxs("g",{className:"tt-rs-sun",children:[t.jsx("circle",{cx:"24",cy:"24",r:"9",fill:"currentColor"}),P.map((a,c)=>t.jsx("line",{x1:a.x1,y1:a.y1,x2:a.x2,y2:a.y2,stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"},c))]}),t.jsx("g",{className:"tt-rs-moon",children:t.jsx("g",{transform:"translate(2.4 2.4) scale(0.9)",children:t.jsx("path",{d:G,fill:"currentColor"})})})]})}),t.jsx("span",{className:"tt-side","data-on":o==="dark",children:"月 Moon"})]}),t.jsxs("div",{className:"tt-mirrors",role:"group","aria-label":"三招对照 Three techniques side by side",children:[t.jsxs("div",{className:"tt-mirror","data-active":e.morph==="gooey",role:"img","aria-label":"液滴融合:行进液滴与两极液滴分离与汇合 Gooey: droplets separate and merge",children:[t.jsx("span",{className:"tt-mini-goo","aria-hidden":"true",children:t.jsxs("span",{className:"tt-mini-goo-liquid",children:[t.jsx("span",{className:"tt-mini-dot tt-mini-dot-sun"}),t.jsx("span",{className:"tt-mini-dot tt-mini-dot-moon"}),t.jsx("span",{className:"tt-mini-blob"})]})}),t.jsx("span",{className:"tt-mirror-label","aria-hidden":"true",children:"goo"})]}),t.jsxs("div",{className:"tt-mirror","data-active":e.morph==="path",role:"img","aria-label":"路径插值:两条同构 M+4C+Z path 逐坐标变形 Path morph: same-structure M+4C+Z paths",children:[t.jsx("svg",{className:"tt-mini-icon",viewBox:"0 0 48 48","aria-hidden":"true",children:t.jsx("path",{className:"tt-morph-path",d:F})}),t.jsx("span",{className:"tt-mirror-label","aria-hidden":"true",children:"path"})]}),t.jsxs("div",{className:"tt-mirror","data-active":e.morph==="rotateScale",role:"img","aria-label":"旋转缩放:日/月双层图标旋转缩放换位 Rotate & scale: glyph layers swap",children:[t.jsxs("svg",{className:"tt-mini-icon",viewBox:"0 0 48 48","aria-hidden":"true",children:[t.jsxs("g",{className:"tt-rs-sun",children:[t.jsx("circle",{cx:"24",cy:"24",r:"9",fill:"currentColor"}),P.map((a,c)=>t.jsx("line",{x1:a.x1,y1:a.y1,x2:a.x2,y2:a.y2,stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"},c))]}),t.jsx("g",{className:"tt-rs-moon",children:t.jsx("g",{transform:"translate(2.4 2.4) scale(0.9)",children:t.jsx("path",{d:G,fill:"currentColor"})})})]}),t.jsx("span",{className:"tt-mirror-label","aria-hidden":"true",children:"rotate·scale"})]})]}),t.jsxs("div",{className:"tt-readout",children:[t.jsxs("span",{className:"tt-tag",children:["morph ",e.morph]}),t.jsxs("span",{className:"tt-tag",children:["duration ",e.duration,"ms"]}),t.jsxs("span",{className:"tt-tag",children:["bounce ",e.bounce.toFixed(2)]}),t.jsxs("span",{className:"tt-tag",children:["过冲 ≈",z.toFixed(1),"%"]}),t.jsxs("span",{className:"tt-tag",children:["data-fx-theme=",o]}),t.jsx("span",{className:"tt-tag",children:l?"reduced-motion: 0ms":"duration 实时"})]}),t.jsx("p",{className:"tt-hint",children:"点击按钮即翻转舞台 data-fx-theme,三招共用同一 duration/bounce 配方;动画进行中再点会从当前状态重定目标跑满时长 (CSS transition 原生重定目标、rAF 路径插值捕获当前进度续跑),不停在半途;prefers-reduced-motion 下时长视作 0、瞬时完成。 Clicking flips data-fx-theme; mid-animation re-clicks retarget from the current state — never stuck halfway."}),t.jsx("p",{className:"tt-hint",children:"goo 滤镜(blur 10 + alpha 18/−7 + atop)逐字取自 CSS-Tricks《The Gooey Effect》,滤镜加容器并留出血;300ms 对齐 M3 Standard 档;路径插值两条 path 同为 M+4C+Z、26 个数,逐坐标线性插值。页面级主题揭示见 color/theme-transition 与 motion/view-transitions 条目,多页衔接见 motion/page-transitions。"}),t.jsx("style",{children:H})]})})}export{X as default};
