import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as j}from"./index.DLkBFFtG.js";import{g as N}from"./color.DuEPkvq5.js";import{D as y}from"./DemoStage.vW1CgYCd.js";function v(c,p,r){const m=r*Math.PI/180,i=p*Math.cos(m),n=p*Math.sin(m),l=c+.3963377774*i+.2158037573*n,d=c-.1055613458*i-.0638541728*n,x=c-.0894841775*i-1.291485548*n,t=l*l*l,h=d*d*d,a=x*x*x,f=[4.0767416621*t-3.3077115913*h+.2309699292*a,-1.2684380046*t+2.6097574011*h-.3413193965*a,-.0041960863*t-.7034186147*h+1.707614701*a],b=f.some(s=>s<-1e-9||s>1+1e-9),k=f.map(s=>Math.min(1,Math.max(0,s))),g=s=>s<=.0031308?12.92*s:1.055*Math.pow(s,1/2.4)-.055;return{rgb:k.map(s=>g(s)),clipped:b}}const M=`
.os-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px; padding: 18px; }
.os-top { display: flex; gap: 14px; flex: 1; min-height: 0; }
.os-swatch-wrap { flex: 1.25; position: relative; border-radius: 14px; overflow: hidden; min-width: 0; }
/* 透明度棋盘格:alpha < 1 时透出 */
.os-checker {
  position: absolute; inset: 0;
  background:
    linear-gradient(45deg, #cfd5dd 25%, transparent 25%, transparent 75%, #cfd5dd 75%),
    linear-gradient(45deg, #cfd5dd 25%, #f2f4f7 25%, #f2f4f7 75%, #cfd5dd 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
}
.os-fill { position: absolute; inset: 0; transition: background-color 0.18s ease; }
.os-swatch-label {
  position: absolute; left: 14px; bottom: 12px;
  font-size: 12px; font-weight: 600;
  color: oklch(0.25 0.02 145);
  text-shadow: 0 1px 3px rgb(255 255 255 / 0.45);
}
.os-panel { flex: 1; min-width: 230px; display: flex; flex-direction: column; justify-content: center; gap: 8px; font-size: 12.5px; color: var(--text-dim); }
.os-code {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 12.5px;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 10px;
  overflow-wrap: anywhere;
}
.os-clip {
  color: var(--text);
  background: color-mix(in srgb, oklch(0.75 0.15 85) 30%, transparent);
  border: 1px solid color-mix(in srgb, oklch(0.6 0.15 85) 55%, transparent);
  padding: 6px 9px;
  border-radius: 8px;
  font-size: 11.5px;
  line-height: 1.5;
}
.os-ladder { display: flex; gap: 5px; height: 84px; flex: none; }
.os-step {
  flex: 1;
  position: relative;
  border-radius: 9px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  font-size: 10.5px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  transition: background-color 0.18s ease, outline-color 0.18s ease;
  outline: 2px solid transparent;
  outline-offset: 2px;
  color: oklch(0.28 0.02 145);
}
.os-step[data-current="true"] { outline-color: var(--text); }
.os-step[data-current="true"]::after {
  content: "◀ 当前 L";
  position: absolute;
  top: -16px;
  right: 0;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-dim);
  white-space: nowrap;
}
.os-step > span { opacity: 0.85; }
.os-step[data-low="true"] > span { color: rgb(255 255 255 / 0.85); }
.os-caption { flex: none; font-size: 11.5px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .os-fill, .os-step { transition: none; }
}
`;function B({entryId:c,schema:p}){const r=N(c,p),[,m]=j.useState(0);j.useEffect(()=>r.subscribe(()=>{m(o=>o+1)}),[r]);const i=r.get("L"),n=r.get("C"),l=r.get("H"),d=r.get("alpha"),x=`oklch(${i}% ${n} ${l} / ${d})`,{rgb:t,clipped:h}=v(i/100,n,l),a=o=>Math.round(o*255),f=`rgb(${a(t[0])} ${a(t[1])} ${a(t[2])})`,b=`rgb(${a(t[0])} ${a(t[1])} ${a(t[2])} / ${d})`,g=[10,20,30,40,50,60,70,80,90,100].map(o=>{const u=v(o/100,n,l),w=$=>Math.round($*255);return{L:o,bg:`rgb(${w(u.rgb[0])} ${w(u.rgb[1])} ${w(u.rgb[2])})`,clipped:u.clipped,current:Math.abs(o-i)<5,low:o<=50}}),s=g.some(o=>o.clipped);return e.jsxs(y,{entryId:c,schema:p,children:[e.jsxs("div",{className:"os-stage",children:[e.jsxs("div",{className:"os-top",children:[e.jsxs("div",{className:"os-swatch-wrap",children:[e.jsx("div",{className:"os-checker"}),e.jsx("div",{className:"os-fill",style:{backgroundColor:b}}),e.jsx("span",{className:"os-swatch-label",children:"alpha 棋盘格 / checkerboard shows alpha"})]}),e.jsxs("div",{className:"os-panel",children:[e.jsx("span",{className:"os-code",children:x}),e.jsxs("span",{className:"os-code",children:["≈ ",f]}),h&&e.jsx("span",{className:"os-clip",children:"主色溢出 sRGB 色域:已按浏览器现状裁剪(色相偏移);P3 屏可用 @media (color-gamut: p3) 放开。 Out of sRGB gamut — clipped like browsers do; release chroma under @media (color-gamut: p3)."}),e.jsx("span",{className:"os-caption",children:"等亮度阶梯 / equal-ΔL ladder below:同 C·H,仅 L 每 +10。"})]})]}),e.jsx("div",{className:"os-ladder",role:"list","aria-label":"同色相亮度阶梯 Same-hue lightness ladder",children:g.map(o=>e.jsx("div",{role:"listitem",className:"os-step","data-current":o.current,"data-low":o.low,style:{backgroundColor:o.bg},title:`oklch(${o.L}% ${n} ${l})`,children:e.jsx("span",{children:o.L})},o.L))}),s&&e.jsx("span",{className:"os-clip",role:"note",children:"阶梯中部分高亮度档溢出 sRGB(高 L 可用色度骤降)。Some bright ladder steps exceed sRGB — available chroma collapses near white."})]}),e.jsx("style",{children:M})]})}export{B as default};
