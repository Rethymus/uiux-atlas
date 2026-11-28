import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const p=`
.demo-stage {
  --grain-contrast: 170%;
  --grain-opacity: 0.16;
}
.gr-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 14px;
  padding: 18px;
  background: #14101d;
}
.gr-card {
  position: relative;
  flex: 1;
  max-width: 300px;
  margin: 0;
  overflow: hidden;
  border-radius: 12px;
  /* 渐变一端透明,让噪点透出(CSS-Tricks 叠加顺序) */
  background: linear-gradient(160deg, oklch(0.42 0.14 285), oklch(0.3 0.1 240) 55%, oklch(0.24 0.06 215));
}
.grain {
  position: absolute;
  inset: 0;
  opacity: var(--grain-opacity);
  filter: contrast(var(--grain-contrast)) brightness(1000%);
  mix-blend-mode: multiply;
  background-size: 180px 180px;
  pointer-events: none;
}
.gr-card figcaption {
  position: absolute;
  left: 10px;
  bottom: 8px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
.gr-note {
  position: absolute;
  left: 12px;
  bottom: 2px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
}
`;function h({entryId:r,schema:i}){const t=l(r,i),[o,n]=s.useState(()=>t.get("baseFrequency")),[a,c]=s.useState(()=>t.get("numOctaves"));s.useEffect(()=>t.subscribe(()=>{n(t.get("baseFrequency")),c(t.get("numOctaves"))}),[t]);const g='url("data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${o}' numOctaves='${a}' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`)+'")';return e.jsx(d,{entryId:r,schema:i,children:e.jsxs("div",{className:"gr-scene",style:{isolation:"isolate"},children:[e.jsx("figure",{className:"gr-card",children:e.jsx("figcaption",{children:"无噪点:注意暗部色带 Banding"})}),e.jsxs("figure",{className:"gr-card",children:[e.jsx("div",{className:"grain","aria-hidden":"true",style:{backgroundImage:g}}),e.jsxs("figcaption",{children:["有噪点 Grain(baseFrequency ",o.toFixed(2)," / octaves ",a,")"]})]}),e.jsx("p",{className:"gr-note",children:"CSS-Tricks:fractalNoise 0.65/3 + contrast(170%) brightness(1000%);层 opacity 0.16 取 CodeFronts 轻量变体。"}),e.jsx("style",{children:p})]})})}export{h as default};
