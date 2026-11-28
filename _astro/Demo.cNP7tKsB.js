import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as m}from"./index.DLkBFFtG.js";import{g as $}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";function N(o,e,s){const r=s*Math.PI/180;return[o,e*Math.cos(r),e*Math.sin(r)]}function z([o,e,s]){const r=o+.3963377774*e+.2158037573*s,c=o-.1055613458*e-.0638541728*s,i=o-.0894841775*e-1.291485548*s,a=r**3,p=c**3,t=i**3;return[1.2270138511*a-.5577999757*p+.281256149*t,-.0405801784*a+1.1122568696*p-.0716766787*t,-.0763812845*a-.4214819784*p+1.5863226978*t]}function C([o,e,s]){return[3.2404542*o-1.5371385*e-.4985314*s,-.969266*o+1.8760108*e+.041556*s,.0556434*o-.2040259*e+1.0572252*s]}function G([o,e,s]){return[2.4934969119*o-.9313836179*e-.4027107845*s,-.8294889696*o+1.7696646797*e+.0236248852*s,.0358458302*o-.0761723893*e+.956884524*s]}const R=o=>{const e=Math.abs(o);return Math.sign(o)*(e<=.0031308?12.92*e:1.055*Math.cbrt(e)-.055)},k=o=>o.every(e=>e>=-1e-4&&e<=1+1e-4);function B(o,e,s){if(k(v(o,e,s)))return e;let r=0,c=e;for(let i=0;i<24;i++){const a=(r+c)/2;k(v(o,a,s))?r=a:c=a}return r}function v(o,e,s){return C(z(N(o,e,s)))}function L(o,e,s){return G(z(N(o,e,s))).map(R)}const h=o=>Math.round(o*1e3)/1e3,D=`
.p3-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px; --p3-l: 0.8; }
.p3-pair { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.p3-swatch {
  position: relative; display: flex; flex-direction: column; justify-content: flex-end;
  gap: 4px; padding: 12px; border-radius: 12px; color: #10131a;
  border: 1px solid rgb(0 0 0 / 0.14); box-shadow: 0 2px 10px rgb(0 0 0 / 0.16);
  font-size: 12px; overflow: hidden;
}
.p3-swatch h4 { margin: 0; font-size: 13px; font-weight: 650; }
.p3-swatch code { font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; background: rgb(255 255 255 / 0.62); padding: 2px 5px; border-radius: 5px; width: fit-content; overflow-wrap: anywhere; }
.p3-trio {
  font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; line-height: 1.55;
  padding: 9px 11px; border-radius: 10px; background: rgb(16 19 26 / 0.92); color: #e8ecf5;
  white-space: pre; overflow: auto; flex: 0 0 auto;
}
.p3-meta { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; }
.p3-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); font-variant-numeric: tabular-nums; }
.p3-chip-warn { color: oklch(0.55 0.18 30); border-color: currentColor; }
@media (max-width: 480px) {
  .p3-scene { padding: 10px; }
  .p3-trio { font-size: 9.5px; }
}
`;function A({entryId:o,schema:e}){const s=$(o,e),r=()=>({hue:s.get("hue"),chroma:s.get("chroma"),mode:s.get("mode")}),[c,i]=m.useState(r),[a,p]=m.useState(null);m.useEffect(()=>s.subscribe(()=>{i(r())}),[s]),m.useEffect(()=>{const j=window.matchMedia("(color-gamut: p3)");p(j.matches);const y=T=>p(T.matches);return j.addEventListener("change",y),()=>j.removeEventListener("change",y)},[]);const t=.8,{hue:x,chroma:l,mode:w}=c,u=B(t,l,x),P=u<l-5e-4,d=`oklch(${t} ${h(u)} ${x})`,g=L(t,l,x),f=`color(display-p3 ${h(g[0])} ${h(g[1])} ${h(g[2])})`,b=w==="p3",S=b?{background:f}:{background:d},M=["/* 渐进增强三件套(调研 06§3) */",".brand-accent {","  /* 1) sRGB 兜底:每台屏幕都能显示 */",`  color: ${d};`,"}","/* 2) @supports 测 color() 语法  3) @media 测屏幕色域 */","@supports (color: color(display-p3 1 0 0)) {","  @media (color-gamut: p3) {","    .brand-accent {",`      color: ${f};`,"    }","  }","}"].join(`
`);return n.jsx(E,{entryId:o,schema:e,children:n.jsxs("div",{className:"p3-scene",children:[n.jsxs("div",{className:"p3-pair",children:[n.jsxs("div",{className:"p3-swatch",style:{background:d},children:[n.jsx("h4",{children:"sRGB 兜底 sRGB fallback"}),n.jsx("code",{children:d}),P&&n.jsxs("span",{children:["chroma ",l.toFixed(2)," → ",u.toFixed(2),"(降 chroma 保色相)"]})]}),n.jsxs("div",{className:"p3-swatch",style:S,children:[n.jsxs("h4",{children:["P3 增强层 ",b?"":"(已撤下)"]}),b?n.jsx("code",{children:f}):n.jsx("span",{children:"对照:同一颜色不带增强规则的观感"})]})]}),n.jsx("pre",{className:"p3-trio",children:M}),n.jsxs("div",{className:"p3-meta",children:[n.jsxs("span",{className:"p3-chip",children:["mode: ",w]}),n.jsxs("span",{className:"p3-chip",children:["L 固定 ",t,"(配黑字的可用明度)"]}),a===null?n.jsx("span",{className:"p3-chip",children:"色域检测中… detecting…"}):a?n.jsx("span",{className:"p3-chip",children:"当前屏幕: P3 色域 / wide gamut — 右块更饱和"}):n.jsx("span",{className:"p3-chip p3-chip-warn",children:"当前屏幕: sRGB — 两块近似(浏览器 gamut map)"})]}),n.jsx("style",{children:D})]})})}export{A as default};
