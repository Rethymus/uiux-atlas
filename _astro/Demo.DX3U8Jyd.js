import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as b}from"./index.DLkBFFtG.js";import{g as w}from"./color.DuEPkvq5.js";import{D as k}from"./DemoStage.vW1CgYCd.js";function N(o,r,t){const n=t*Math.PI/180,c=r*Math.cos(n),i=r*Math.sin(n),l=o+.3963377774*c+.2158037573*i,h=o-.1055613458*c-.0638541728*i,p=o-.0894841775*c-1.291485548*i,m=l*l*l,d=h*h*h,x=p*p*p,f=[4.0767416621*m-3.3077115913*d+.2309699292*x,-1.2684380046*m+2.6097574011*d-.3413193965*x,-.0041960863*m-.7034186147*d+1.707614701*x],g=f.some(a=>a<0-1e-9||a>1+1e-9),u=f.map(a=>Math.min(1,Math.max(0,a))),e=a=>a<=.0031308?12.92*a:1.055*Math.pow(a,1/2.4)-.055;return{rgb:u.map(a=>e(a)),clipped:g}}function A([o,r,t]){const n=c=>c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4);return .2126*n(o)+.7152*n(r)+.0722*n(t)}const v=`
.oc-stage { position: absolute; inset: 0; display: flex; align-items: stretch; gap: 16px; padding: 18px; }
.oc-swatch {
  flex: 1.2;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 20px 24px;
  min-width: 0;
  transition: background-color 0.18s ease;
}
.oc-swatch .oc-sample { font-size: 17px; font-weight: 600; line-height: 1.4; }
.oc-swatch .oc-aa { font-size: 11.5px; opacity: 0.75; font-weight: 500; }
.oc-swatch .oc-black { color: #000; }
.oc-swatch .oc-white { color: #fff; }
.oc-panel {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 9px;
  font-size: 12.5px;
  color: var(--text-dim);
}
.oc-code {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 12.5px;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 10px;
  overflow-wrap: anywhere;
}
.oc-contrast {
  display: flex;
  align-items: center;
  gap: 8px;
  font-variant-numeric: tabular-nums;
}
.oc-ratio { font-size: 15px; font-weight: 650; color: var(--text); }
.oc-badge {
  padding: 1.5px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}
.oc-pass { background: oklch(0.6 0.15 150); }
.oc-fail { background: oklch(0.55 0.19 25); }
.oc-clip {
  color: var(--text);
  background: color-mix(in srgb, oklch(0.75 0.15 85) 30%, transparent);
  border: 1px solid color-mix(in srgb, oklch(0.6 0.15 85) 55%, transparent);
  padding: 5px 9px;
  border-radius: 8px;
  font-size: 11.5px;
  line-height: 1.45;
}
@media (prefers-reduced-motion: reduce) {
  .oc-swatch { transition: none; }
}
`,j=o=>`${o.toFixed(2)}:1`;function B({entryId:o,schema:r}){const t=w(o,r),[,n]=b.useState(0);b.useEffect(()=>t.subscribe(()=>{n(e=>e+1)}),[t]);const c=t.get("L"),i=t.get("C"),l=t.get("H"),h=`oklch(${c}% ${i} ${l})`,{rgb:p,clipped:m}=N(c/100,i,l),d=`rgb(${p.map(e=>Math.round(e*255)).join(" ")})`,x=A(p),f=(x+.05)/.05,g=1.05/(x+.05),u=e=>s.jsxs(s.Fragment,{children:[s.jsxs("span",{className:`oc-badge ${e>=4.5?"oc-pass":"oc-fail"}`,children:["AA ",e>=4.5?"✓":"✗"]}),s.jsxs("span",{className:`oc-badge ${e>=7?"oc-pass":"oc-fail"}`,children:["AAA ",e>=7?"✓":"✗"]})]});return s.jsxs(k,{entryId:o,schema:r,children:[s.jsxs("div",{className:"oc-stage",children:[s.jsxs("div",{className:"oc-swatch",style:{backgroundColor:d},children:[s.jsx("span",{className:"oc-sample oc-black",children:"黑字示例 / Black text"}),s.jsx("span",{className:"oc-aa oc-black",children:"正文按 4.5:1(AA)· 7:1(AAA)判定 / body text thresholds"}),s.jsx("span",{className:"oc-sample oc-white",children:"白字示例 / White text"}),s.jsx("span",{className:"oc-aa oc-white",children:"大字阈值减半:3:1(AA)· 4.5:1(AAA) / large-text thresholds"})]}),s.jsxs("div",{className:"oc-panel",children:[s.jsx("span",{className:"oc-code",children:h}),s.jsxs("span",{className:"oc-code",children:["≈ ",d]}),s.jsxs("div",{className:"oc-contrast",children:[s.jsx("span",{children:"对黑字 / vs black"}),s.jsx("span",{className:"oc-ratio",children:j(f)}),u(f)]}),s.jsxs("div",{className:"oc-contrast",children:[s.jsx("span",{children:"对白字 / vs white"}),s.jsx("span",{className:"oc-ratio",children:j(g)}),u(g)]}),m&&s.jsx("span",{className:"oc-clip",children:"超出 sRGB 色域:已按浏览器现状直接裁剪 RGB(色相会偏移);P3 覆盖规则请手写。 Out of sRGB gamut — clipped like browsers do; hand-write P3 overrides."})]})]}),s.jsx("style",{children:v})]})}export{B as default};
