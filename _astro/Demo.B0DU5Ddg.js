import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as v}from"./color.DuEPkvq5.js";import{D as y}from"./DemoStage.vW1CgYCd.js";const L=`
.ar-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
}
.ar-box {
  width: var(--ar-width, 320px);
  max-width: 100%;
  aspect-ratio: var(--ar-ratio, 16 / 9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  animation: ar-in 0.45s ease-out both;
  position: relative;
}
.ar-box img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: var(--ar-fit, cover);
}
.ar-guide {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(color-mix(in srgb, oklch(0.62 0.15 250 / 0.55), transparent) 0 0) top left / 100% 1px no-repeat,
    linear-gradient(color-mix(in srgb, oklch(0.62 0.15 250 / 0.55), transparent) 0 0) bottom left / 100% 1px no-repeat;
}
.ar-readout {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 12px;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
}
.ar-readout strong { font-weight: 650; }
.ar-hint { font-size: 11px; opacity: 0.55; margin: 0; text-align: center; max-width: 520px; }
@keyframes ar-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ar-box { animation: none; }
}
`;function k(){return`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7fb2e8"/>
      <stop offset="1" stop-color="#dceaf6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#sky)"/>
  <circle cx="960" cy="220" r="120" fill="#ffd76e"/>
  <path d="M0 640 L300 460 L560 620 L820 420 L1200 660 L1200 900 L0 900 Z" fill="#5e8f5a"/>
  <path d="M0 760 L340 600 L700 780 L1200 640 L1200 900 L0 900 Z" fill="#41693f"/>
  <text x="40" y="80" font-family="monospace" font-size="52" fill="#22303f" font-weight="bold">4:3 · 1200×900</text>
  <text x="40" y="850" font-family="monospace" font-size="40" fill="#ffffff" opacity="0.9">左下角与右上角在 cover 裁切时最先被切掉</text>
</svg>`)}`}function E({entryId:o,schema:i}){const e=v(o,i),[n,d]=r.useState(()=>e.get("ratio")),[f,p]=r.useState(()=>e.get("fit")),[a,x]=r.useState(()=>e.get("width")),[h,g]=r.useState(0),c=r.useRef(null);r.useEffect(()=>e.subscribe(()=>{d(e.get("ratio")),p(e.get("fit")),x(e.get("width"))}),[e]),r.useEffect(()=>{const s=c.current;if(!s)return;const l=new ResizeObserver(j=>{for(const w of j)g(Math.round(w.contentRect.height))});return l.observe(s),()=>l.disconnect()},[]);const[m,u]=n.split("/").map(s=>Number(s.trim())||1),b=Math.round(a*u/m);return t.jsxs(y,{entryId:o,schema:i,children:[t.jsxs("div",{className:"ar-scene",children:[t.jsxs("div",{className:"ar-box",ref:c,children:[t.jsx("img",{src:k(),alt:"4:3 演示样图:山景与太阳,标注内在尺寸 1200×900",width:1200,height:900}),t.jsx("span",{className:"ar-guide","aria-hidden":"true"})]}),t.jsxs("p",{className:"ar-readout",children:[t.jsxs("span",{children:["width ",t.jsxs("strong",{children:[a,"px"]})]}),t.jsxs("span",{children:["aspect-ratio ",t.jsx("strong",{children:n})]}),t.jsxs("span",{children:["object-fit ",t.jsx("strong",{children:f})]}),t.jsxs("span",{children:["实测高度 ",t.jsxs("strong",{children:[h,"px"]})]}),t.jsx("span",{"aria-hidden":"true",children:"≈"}),t.jsxs("span",{children:["换算 ",t.jsxs("strong",{children:[b,"px"]})]})]}),t.jsx("p",{className:"ar-hint",children:"样图内在比例 4:3 ≠ 比例盒默认 16:9:cover 裁掉两端、contain 上下留边、fill 横向压扁。 高度为 auto、由比例推导(至少一边 auto 比例才生效,MDN)。"})]}),t.jsx("style",{children:L})]})}export{E as default};
