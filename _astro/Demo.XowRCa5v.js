import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as b}from"./index.DLkBFFtG.js";import{g as C}from"./color.DuEPkvq5.js";import{D as N}from"./DemoStage.vW1CgYCd.js";const k=Math.cbrt;function M(c,p,o){const a=o*Math.PI/180,e=[c,p*Math.cos(a),p*Math.sin(a)],h=e[0]+.3963377774*e[1]+.2158037573*e[2],r=e[0]-.1055613458*e[1]-.0638541728*e[2],l=e[0]-.0894841775*e[1]-1.291485548*e[2],t=h**3,d=r**3,n=l**3,i=[4.0767416621*t-3.3077115913*d+.2309699292*n,-1.2684380046*t+2.6097574011*d-.3413193965*n,-.0041960863*t-.7034186147*d+1.707614701*n].map(u=>{const x=Math.max(0,Math.min(1,u));return x<=.0031308?12.92*x:1.055*k(x)-.055});return[Math.round(i[0]*255),Math.round(i[1]*255),Math.round(i[2]*255)]}function w(c,p){const o=([l,t,d])=>{const n=m=>{const i=m/255;return i<=.04045?i/12.92:((i+.055)/1.055)**2.4};return .2126*n(l)+.7152*n(t)+.0722*n(d)},a=o(c),e=o(p),[h,r]=a>=e?[a,e]:[e,a];return(h+.05)/(r+.05)}function A(c){return c<=90?"warm":"cool"}const z=`
.psy-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px; }
.psy-mood {
  flex: 1; min-height: 0; border-radius: 14px; padding: 16px 20px;
  display: flex; flex-direction: column; justify-content: center; gap: 8px;
  border: 1px solid rgb(0 0 0 / 0.12); box-shadow: 0 2px 10px rgb(0 0 0 / 0.14);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.psy-mood h3 { margin: 0; font-size: 17px; font-weight: 700; }
.psy-mood p { margin: 0; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.psy-cta {
  width: fit-content; border: 0; border-radius: 999px; padding: 7px 16px;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: rgb(12 14 18 / 0.86); color: inherit;
}
.psy-panel {
  flex: 0 0 auto; display: flex; flex-direction: column; gap: 6px;
  font-size: 12px; line-height: 1.55;
}
.psy-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.psy-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); font-variant-numeric: tabular-nums; }
.psy-pass { color: oklch(0.52 0.14 150); font-weight: 600; }
.psy-fail { color: oklch(0.55 0.2 25); font-weight: 600; }
.psy-edit {
  font-size: 11px; padding: 7px 10px; border-radius: 8px;
  border: 1px dashed rgb(128 138 160 / 0.55); opacity: 0.85;
}
.psy-edit strong { font-weight: 650; }
@media (max-width: 480px) {
  .psy-scene { padding: 10px; }
  .psy-mood { padding: 12px 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .psy-mood { transition: none; }
}
`,j={warm:{zh:"暖色带(红≈20°/黄≈90°)——编辑性说法:常关联紧迫、食欲、行动号召(未证实;可证实的只有「强调色承担 CTA 焦点」的职责分工,见 60-30-10)。",en:"Warm band (red≈20°/yellow≈90°) — editorial lore: associated with urgency, appetite, calls to action (unverified; the only verifiable claim is the accent owning 'CTA focus' in 60-30-10)."},cool:{zh:"冷色带(绿≈140°/蓝≈220°/紫≈320°)——编辑性说法:常关联信任、专业、冷静(未证实;金融科技偏爱蓝是业界观察,非实证结论)。",en:"Cool band (green≈140°/blue≈220°/purple≈320°) — editorial lore: associated with trust, professionalism, calm (unverified; fintech's blue preference is an industry observation, not an evidence-backed conclusion)."}};function L({entryId:c,schema:p}){const o=C(c,p),a=()=>({textColor:o.get("textColor")}),[e,h]=b.useState(a().textColor);b.useEffect(()=>o.subscribe(()=>{h(a().textColor)}),[o]);const r=o.get("lightness"),l=o.get("chroma"),t=o.get("hue"),d=`oklch(${r} ${l} ${t})`,n=M(r,l,t),m=w([0,0,0],n),i=w([255,255,255],n),u=e==="white"?i:m,x=A(t),f=g=>{const y=g>=4.5,v=g>=7;return s.jsxs("span",{className:y?"psy-pass":"psy-fail",children:[g.toFixed(2),":1 · ",v?"AAA":y?"AA":"不达标 fail"]})};return s.jsx(N,{entryId:c,schema:p,children:s.jsxs("div",{className:"psy-scene",children:[s.jsxs("div",{className:"psy-mood",style:{backgroundColor:d,color:e==="white"?"#fff":"#000"},children:[s.jsx("h3",{children:"情绪探针 Mood probe"}),s.jsx("p",{children:"对比度是硬约束,情绪是软叙事。Contrast is the hard constraint; mood is the soft narrative."}),s.jsx("button",{type:"button",className:"psy-cta",children:"行动号召 CTA"})]}),s.jsxs("div",{className:"psy-panel",children:[s.jsxs("div",{className:"psy-row",children:[s.jsxs("span",{className:"psy-chip",children:["L ",r.toFixed(2)," · C ",l.toFixed(2)," · H ",t,"°"]}),s.jsx("span",{className:"psy-chip",children:x==="warm"?"暖 warm":"冷 cool"}),s.jsxs("span",{className:"psy-chip",children:["黑字 black ",f(m)]}),s.jsxs("span",{className:"psy-chip",children:["白字 white ",f(i)]}),s.jsxs("span",{className:"psy-chip",children:["当前 live ",f(u)]})]}),s.jsxs("div",{className:"psy-edit",children:[s.jsx("strong",{children:"编辑性总结,未证实 / Editorial, unverified:"}),j[x].zh," — ",j[x].en]}),s.jsx("div",{className:"psy-row",children:s.jsxs("span",{className:"psy-chip psy-pass",children:["可证实 L≥0.87 配黑字对比度都好(Evil Martians)— 当前 L ",r.toFixed(2)," ",r>=.87?"✓ 规则成立":"✗ 已离开规则区"]})})]}),s.jsx("style",{children:z})]})})}export{L as default};
