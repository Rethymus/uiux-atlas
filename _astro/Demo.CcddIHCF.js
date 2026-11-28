import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as h}from"./index.DLkBFFtG.js";import{g as S,o as k,c as f}from"./color.DuEPkvq5.js";import{D as $}from"./DemoStage.vW1CgYCd.js";const A=[0,10,20,30,40,50,60,70,80,90,95,99,100],d=a=>"#"+a.map(t=>Math.round(t*255).toString(16).padStart(2,"0")).join("").toUpperCase(),b=(a,t,n)=>k(a/100,t,n).rgb,u=a=>{const t=a.replace("#","");return[0,2,4].map(n=>parseInt(t.slice(n,n+2),16)/255)},L=`
.bc-scene { position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; overflow: auto; }
.bc-main { flex: 1.4; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.bc-brand {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px;
  border-radius: 14px; border: 1px solid rgba(0, 0, 0, 0.1); font-size: 12px; background: #fff;
}
.bc-brandSwatch {
  width: 46px; height: 46px; border-radius: 12px; flex: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  animation: bc-in 0.4s ease-out both;
}
.bc-brandMeta { display: flex; flex-direction: column; gap: 3px; font-variant-numeric: tabular-nums; }
.bc-brandMeta b { font-size: 13.5px; }
.bc-brandMeta span { color: #5b6472; font-size: 11.5px; }
.bc-rampLabel { font-size: 11.5px; color: #5b6472; }
.bc-ramp { display: grid; grid-template-columns: repeat(13, 1fr); gap: 3px; }
.bc-tone { position: relative; border-radius: 7px; aspect-ratio: 0.82; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 3px; font-size: 9px; font-weight: 600; font-variant-numeric: tabular-nums; animation: bc-in 0.4s ease-out both; }
.bc-tone[data-dark="true"] { color: rgba(255, 255, 255, 0.85); }
.bc-tone[data-dark="false"] { color: rgba(0, 0, 0, 0.72); }
.bc-tone[data-role]::after {
  content: attr(data-role);
  position: absolute; left: 50%; top: -16px; translate: -50% 0;
  white-space: nowrap; font-size: 9.5px; font-weight: 650; color: #0b1220;
  background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.18); border-radius: 999px; padding: 1px 7px;
  z-index: 1;
}
.bc-note { font-size: 11.5px; color: #5b6472; line-height: 1.55; margin: 0; }
.bc-panel { flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.bc-row {
  display: flex; align-items: center; gap: 9px; padding: 8px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px; background: #fff;
  animation: bc-in 0.4s ease-out both;
}
.bc-rowSwatch { width: 34px; height: 34px; border-radius: 9px; flex: none; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1); }
.bc-rowMain { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.bc-rowMain b { font-size: 12px; }
.bc-rowMain span { font-size: 10.5px; color: #5b6472; font-variant-numeric: tabular-nums; }
.bc-badges { display: flex; flex-direction: column; gap: 3px; align-items: flex-end; }
.bc-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 8px; font-variant-numeric: tabular-nums; }
.bc-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.bc-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
@keyframes bc-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .bc-scene { flex-direction: column; }
  .bc-tone[data-role]::after { font-size: 8px; padding: 1px 5px; top: -14px; }
}
@media (prefers-reduced-motion: reduce) {
  .bc-brandSwatch, .bc-tone, .bc-row { animation: none; }
}
`;function m(a){const t=f(u(a.fgHex),u(a.bgHex)),n=t>=4.5,l=t>=3;return e.jsxs("div",{className:"bc-row",style:{animationDelay:`${a.delay}ms`},children:[e.jsx("span",{className:"bc-rowSwatch",style:{backgroundColor:a.bgHex,color:a.fgHex},children:"Aa"}),e.jsxs("span",{className:"bc-rowMain",children:[e.jsx("b",{children:a.title}),e.jsxs("span",{children:[a.sub," · ",a.fgLabel," on ",a.bgHex," = ",t.toFixed(2),":1"]})]}),e.jsxs("span",{className:"bc-badges",children:[e.jsxs("span",{className:"bc-badge","data-ok":n,children:["正文 AA 4.5 ",n?"✓":"✗"]}),e.jsxs("span",{className:"bc-badge","data-ok":l,children:["大字/UI 3 ",l?"✓":"✗"]})]})]})}function G({entryId:a,schema:t}){const n=S(a,t),l=()=>({hue:n.get("hue"),lightness:n.get("lightness"),chroma:n.get("chroma"),theme:n.get("theme")}),[j,w]=h.useState(l);h.useEffect(()=>n.subscribe(()=>{w(l())}),[n]);const{hue:o,lightness:i,chroma:s,theme:r}=j,x=k(i,s,o),p=d(x.rgb),y=r==="dark"?80:Math.round(i*100),F=d(b(y,s,o)),H=r==="dark"?d(b(20,s,o)):"#FFFFFF",N=d(b(90,s,o)),v=d(b(30,s,o));return e.jsxs($,{entryId:a,schema:t,children:[e.jsxs("div",{className:"bc-scene",children:[e.jsxs("div",{className:"bc-main",children:[e.jsxs("div",{className:"bc-brand",children:[e.jsx("span",{className:"bc-brandSwatch",style:{backgroundColor:x.clipped?p:`oklch(${i} ${s} ${o})`}}),e.jsxs("span",{className:"bc-brandMeta",children:[e.jsxs("b",{children:["品牌种子 Brand seed · oklch(",i.toFixed(2)," ",s.toFixed(2)," ",o,"°)"]}),e.jsxs("span",{children:["sRGB ≈ ",p,x.clipped?" · 越 sRGB 域,按浏览器现状裁剪(调研 06§2)":""," · ","tone 读数 ≈ ",Math.round(i*100)]})]})]}),e.jsx("span",{className:"bc-rampLabel",children:"Tone 阶(13 档,固定 H/C 只变 tone;角标为语义角色位)Tone ramp (13 steps, fixed H/C)"}),e.jsx("div",{className:"bc-ramp",role:"img","aria-label":`品牌色 ${o}° 色相的 13 档 tone 阶`,children:A.map((c,z)=>{const g=b(c,s,o),M=f(g,[0,0,0])>=f(g,[1,1,1]),C=r==="dark"&&c===80?"accent·dark":r==="light"&&Math.abs(c-i*100)<5?"accent":c===90?"container":void 0;return e.jsx("span",{className:"bc-tone","data-dark":!M,"data-role":C,title:`tone ${c}`,style:{backgroundColor:`oklch(${c/100} ${s} ${o})`,animationDelay:`${z*18}ms`},children:c},c)})}),e.jsx("p",{className:"bc-note",children:"tone 数值直代 oklch L(tone=CIE L*,近似处理);13 档计数为官方(调研 06§5),逐档取值为 material-color-utilities 通行实现。角标 tone 80 = M3 暗色 accent 档位(调研 06§7)。 Tone numbers stand in for oklch L (tone = CIE L*, an approximation); 13 is the official count, the per-step values follow the common material-color-utilities layout."})]}),e.jsxs("div",{className:"bc-panel",children:[e.jsx(m,{title:r==="dark"?"accent = tone 80 + 深字 tone 20":"accent = 品牌 tone + 白字",sub:r==="dark"?"暗色语境(机制同 M3 基线)":"亮色语境 solid 按钮",bgHex:F,fgHex:H,fgLabel:r==="dark"?"tone 20":"#FFFFFF",delay:0}),e.jsx(m,{title:"container = tone 90 + 深字 tone 30",sub:"柔和容器(演示角色位)",bgHex:N,fgHex:v,fgLabel:"tone 30",delay:60}),e.jsx(m,{title:"品牌色本尊 + 白字",sub:`sRGB ${p}${x.clipped?"(裁剪值)":""}`,bgHex:p,fgHex:"#FFFFFF",fgLabel:"#FFFFFF",delay:120}),e.jsx("p",{className:"bc-note",children:"判定用未舍入原值(WCAG,调研 06§17):白字只有 3.62:1 时过 3:1 大字/UI 档、不过正文 AA—— 这正是管线要逐组合复核的原因。Radix 以 APCA Lc60/90 定文本步(调研 06§8),本 demo 只跑 WCAG。"})]})]}),e.jsx("style",{children:L})]})}export{G as default};
