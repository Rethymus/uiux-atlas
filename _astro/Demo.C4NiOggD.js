import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";import{s as c}from"./index.0cc96590.D8vELjCC.js";let o=!1;function f(){if(o)return;o=!0;const s=document.createElement("link");s.rel="stylesheet",s.href=c,document.head.appendChild(s)}const g=[100,300,400,700,900],h=`
.vf-wrap { width: 100%; display: flex; flex-direction: column; gap: 14px; }
.vf-stage {
  padding: 18px 20px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 12px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-family: "Inter Variable", system-ui, sans-serif;
}
.vf-sample {
  margin: 0;
  font-size: 44px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-optical-sizing: none;
  font-variation-settings: "wght" var(--vf-wght), "opsz" var(--vf-opsz);
}
.vf-para {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.6;
  font-optical-sizing: none;
  font-variation-settings: "wght" var(--vf-wght), "opsz" var(--vf-opsz);
}
.vf-meta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 10px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.72;
}
.vf-ladder { display: flex; gap: 12px; flex-wrap: wrap; align-items: baseline; }
.vf-ladder-item { display: flex; flex-direction: column; gap: 2px; }
.vf-ladder-item span:first-child {
  font-family: "Inter Variable", system-ui, sans-serif;
  font-size: 26px;
  line-height: 1.15;
  font-optical-sizing: none;
}
.vf-ladder-item span:last-child {
  font: 10px/1.3 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.65;
}
.vf-code {
  margin: 0;
  padding: 10px 14px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 12px/1.7 ui-monospace, Menlo, Consolas, monospace;
  white-space: pre-wrap;
}
.vf-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;function w({entryId:s,schema:r}){const a=l(s,r),[t,p]=i.useState(()=>({wght:a.get("wght"),opsz:a.get("opsz")}));return i.useEffect(()=>{f()},[]),i.useEffect(()=>a.subscribe(()=>{p({wght:a.get("wght"),opsz:a.get("opsz")})}),[a]),e.jsxs(d,{entryId:s,schema:r,children:[e.jsxs("div",{className:"vf-wrap",children:[e.jsxs("div",{className:"vf-stage",children:[e.jsx("p",{className:"vf-sample",children:"Inter 变轴 Variable 123"}),e.jsx("p",{className:"vf-para",children:"字重与光学字号都是连续轴:拖动面板滑杆,字形即时重绘。Weight and optical size are continuous axes — drag the panel sliders and the glyphs re-render instantly."}),e.jsxs("div",{className:"vf-meta",children:[e.jsxs("span",{children:["wght = ",t.wght]}),e.jsxs("span",{children:["opsz = ",t.opsz]}),e.jsx("span",{children:"opsz=14 → x-height 1118/2048 UPM(text 档)"}),e.jsx("span",{children:"opsz=32 → 1056/2048(display 档)"})]})]}),e.jsx("div",{className:"vf-ladder","aria-label":"字重参照梯 Weight reference ladder",children:g.map(n=>e.jsxs("div",{className:"vf-ladder-item",children:[e.jsx("span",{style:{fontVariationSettings:`"wght" ${n}, "opsz" 14`},children:"Ag 12"}),e.jsxs("span",{children:["wght ",n]})]},n))}),e.jsx("pre",{className:"vf-code","aria-label":"生成的 CSS generated CSS",children:`.vf-sample {
  font-optical-sizing: none;
  font-variation-settings: "wght" ${t.wght}, "opsz" ${t.opsz};
}`}),e.jsx("p",{className:"vf-hint",children:"参照梯固定 opsz 14,便于对照当前 wght 的相对位置;opsz 调高时观察字形对比度与紧凑度变化(Inter display 档)。 The ladder is pinned at opsz 14 for comparison; raise opsz and watch the display optical size tighten and gain contrast."})]}),e.jsx("style",{children:h})]})}export{w as default};
