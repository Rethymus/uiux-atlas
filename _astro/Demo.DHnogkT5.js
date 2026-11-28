import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as A}from"./color.DuEPkvq5.js";import{D as I}from"./DemoStage.vW1CgYCd.js";const T=`
.ri-scene { position: absolute; inset: 0; display: flex; gap: 14px; padding: 14px; overflow: auto; }
.ri-left { flex: 1.4; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.ri-right { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 10px; }
.ri-frame-outer { flex: 1; min-height: 0; display: flex; justify-content: center; overflow: hidden; }
.ri-frame {
  transform-origin: top center;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 5%, transparent);
  overflow: hidden;
}
.ri-chrome {
  height: 22px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  font-size: 10px;
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ri-chrome i { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.ri-viewport { padding: 8px; }
.ri-slot { display: flex; flex-direction: column; gap: 6px; }
.ri-slot img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
}
.ri-skeleton { height: 10px; border-radius: 5px; background: color-mix(in srgb, currentColor 12%, transparent); }
.ri-readout {
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
  overflow-wrap: anywhere;
}
.ri-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.ri-readout .ri-hit { color: oklch(0.62 0.15 160); }
.ri-sub { font-size: 11px; opacity: 0.6; margin: 0; }
.ri-code {
  font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  font-size: 11px;
  line-height: 1.6;
  background: color-mix(in srgb, currentColor 7%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
@media (max-width: 640px) {
  .ri-scene { flex-direction: column; }
  .ri-right { min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ri-scene * { transition: none !important; animation: none !important; }
}
`,w=[{w:640,label:"640w(演示补充档,未证实)",bg:"#0f766e"},{w:1200,label:"1200w",bg:"#4338ca"},{w:2400,label:"2400w",bg:"#b45309"}];function b(s){const a=Math.round(s.w*675/1200),r=Math.max(28,Math.round(s.w/12)),o=`<svg xmlns="http://www.w3.org/2000/svg" width="${s.w}" height="${a}" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="${s.bg}"/>
  <circle cx="1010" cy="130" r="90" fill="rgba(255,255,255,0.35)"/>
  <path d="M0 470 L260 330 L520 460 L780 300 L1200 480 L1200 675 L0 675 Z" fill="rgba(255,255,255,0.22)"/>
  <text x="46" y="150" font-family="monospace" font-size="${r*2.2}" fill="#ffffff" font-weight="bold">${s.w}w</text>
  <text x="46" y="240" font-family="monospace" font-size="${r}" fill="rgba(255,255,255,0.85)">browser picked this candidate</text>
</svg>`;return`data:image/svg+xml,${encodeURIComponent(o)}`}function v(s){return`data:image/svg+xml,${encodeURIComponent(s==="wide"?`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#155e75"/>
  <circle cx="1050" cy="150" r="100" fill="#ffd76e"/>
  <path d="M0 480 L300 340 L600 470 L900 330 L1200 470 L1200 675 L0 675 Z" fill="#0c4a6e"/>
  <text x="46" y="130" font-family="monospace" font-size="56" fill="#ffffff" font-weight="bold">宽幅裁切 16:9</text>
  <text x="46" y="200" font-family="monospace" font-size="30" fill="rgba(255,255,255,0.85)">source media="(min-width: 900px)"</text>
</svg>`:`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <rect width="640" height="640" fill="#7c2d12"/>
  <circle cx="470" cy="180" r="120" fill="#ffd76e"/>
  <path d="M0 420 L220 300 L430 430 L640 320 L640 640 L0 640 Z" fill="#431407"/>
  <text x="40" y="120" font-family="monospace" font-size="48" fill="#ffffff" font-weight="bold">方幅裁切 1:1</text>
  <text x="40" y="180" font-family="monospace" font-size="26" fill="rgba(255,255,255,0.85)">窄视口:跳过 source,回退 img</text>
</svg>`)}`}function F({entryId:s,schema:a}){const r=A(s,a),[o,y]=t.useState(()=>Number(r.get("viewport"))),[l,j]=t.useState(()=>r.get("vwShare")),[d,S]=t.useState(()=>r.get("fetchpriority")),[p,L]=t.useState(1),[N,R]=t.useState("…"),[$,k]=t.useState("…"),[z,C]=t.useState(0),f=t.useRef(null),g=t.useRef(null),m=t.useRef(null);t.useEffect(()=>r.subscribe(()=>{y(Number(r.get("viewport"))),j(r.get("vwShare")),S(r.get("fetchpriority"))}),[r]);const c=Math.round(o*l/100),E=Math.round(c*p);t.useEffect(()=>{L(window.devicePixelRatio||1);const i=window.setTimeout(()=>{const n=f.current?.currentSrc||f.current?.src||"",h=n.match(/(\d+)w/);R(h?`${h[1]}w`:n?"(兜底 src)":"…")},60);return()=>window.clearTimeout(i)},[o,l]);const x=v("wide"),M=v("square");t.useEffect(()=>{const i=()=>{const n=g.current?.currentSrc||"";k(n===x?"宽幅 source(min-width: 900px 命中)":"方幅 img(窄视口回退)")};return i(),window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[x]),t.useEffect(()=>{f.current?.setAttribute("fetchpriority",d)},[d]),t.useEffect(()=>{const i=m.current;if(!i)return;const n=new ResizeObserver(h=>{for(const U of h)C(U.contentRect.width)});return n.observe(i),()=>n.disconnect()},[]);const u=Math.min(1,(z-28)/o),D={srcSet:w.map(i=>`${b(i)} ${i.w}w`).join(", "),sizes:`${c}px`};return e.jsxs(I,{entryId:s,schema:a,children:[e.jsxs("div",{className:"ri-scene",ref:m,children:[e.jsxs("div",{className:"ri-left",children:[e.jsx("div",{className:"ri-frame-outer",children:e.jsxs("div",{className:"ri-frame",style:{width:o,transform:`scale(${u})`},children:[e.jsxs("div",{className:"ri-chrome","aria-hidden":"true",children:[e.jsx("i",{style:{background:"#f87171"}}),e.jsx("i",{style:{background:"#fbbf24"}}),e.jsx("i",{style:{background:"#34d399"}}),e.jsxs("span",{children:["模拟视口 ",o,"px · 缩放 ",(u*100).toFixed(0),"%"]})]}),e.jsx("div",{className:"ri-viewport",children:e.jsxs("div",{className:"ri-slot",children:[e.jsx("img",{ref:f,src:b(w[1]),alt:"演示样图:浏览器从 srcset 命中的候选,图上烤有候选宽度标签",width:1200,height:675,...D}),e.jsx("div",{className:"ri-skeleton","aria-hidden":"true"}),e.jsx("div",{className:"ri-skeleton","aria-hidden":"true",style:{width:"70%"}})]})})]})}),e.jsx("pre",{className:"ri-code","aria-label":"当前 img 的 srcset 与 sizes 声明",children:`<img
  srcset="…640w, …1200w, …2400w"
  sizes="${c}px"   /* = ${o}px × ${l}% */
  fetchpriority="${d}" width="1200" height="675" />`})]}),e.jsxs("div",{className:"ri-right",children:[e.jsxs("div",{className:"ri-readout",children:[e.jsxs("div",{children:["模拟视口 ",e.jsxs("strong",{children:[o,"px"]})," × 槽宽占比 ",e.jsxs("strong",{children:[l,"%"]})," = 槽宽 ",e.jsxs("strong",{children:[c,"px"]})]}),e.jsxs("div",{children:["槽宽 ",e.jsxs("strong",{children:[c,"px"]})," × DPR ",e.jsx("strong",{children:p})," = 理想宽度 ",e.jsxs("strong",{children:[E,"px"]})]}),e.jsxs("div",{children:["浏览器实际命中 ",e.jsx("span",{className:"ri-hit",children:e.jsx("strong",{children:N})}),"(currentSrc 实读)"]}),e.jsxs("div",{children:["fetchpriority = ",e.jsx("strong",{children:d}),"(属性已写入)"]})]}),e.jsxs("figure",{style:{margin:0},children:[e.jsxs("picture",{children:[e.jsx("source",{media:"(min-width: 900px)",srcSet:x,width:1200,height:675}),e.jsx("img",{ref:g,src:M,alt:"艺术指导演示:桌面宽幅构图,窄视口方幅构图",width:640,height:640,style:{width:"100%",height:"auto",display:"block",borderRadius:6}})]}),e.jsxs("figcaption",{className:"ri-sub",style:{marginTop:6},children:["<picture>"," 艺术指导:当前命中 ",$,"(拖动真实浏览器窗口宽度可切换)"]})]}),e.jsx("p",{className:"ri-sub",children:"候选集 640w/1200w/2400w:1200w 与 2400w 逐字出自调研 12§1 片段,640w 为演示补充档(未证实); 兜底 src = 1200w 候选。切换视口或槽宽占比,左侧图上标签会实时变化。"})]})]}),e.jsx("style",{children:T})]})}export{F as default};
