import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as n}from"./color.DuEPkvq5.js";import{D as l}from"./DemoStage.vW1CgYCd.js";const p=["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],b=`
.demo-stage {
  --blend-mode: normal;
  --blend-opacity: 100%;
}
.bl-stage {
  position: absolute;
  inset: 0;
  isolation: isolate;
  overflow: hidden;
  background: oklch(0.96 0.01 260);
}
.bl-a {
  position: absolute;
  inset: 12px;
  border-radius: 12px;
  background:
    radial-gradient(60% 80% at 22% 24%, oklch(0.66 0.2 330 / 0.9), transparent 70%),
    radial-gradient(55% 70% at 80% 22%, oklch(0.72 0.16 85 / 0.85), transparent 68%),
    linear-gradient(140deg, oklch(0.4 0.12 250), oklch(0.34 0.1 190));
}
.bl-b {
  position: absolute;
  inset: 40px 40px 88px;
  border-radius: 12px;
  background: linear-gradient(120deg,
    oklch(0.96 0.03 260), oklch(0.93 0.05 320) 60%, oklch(0.9 0.04 200));
  mix-blend-mode: var(--blend-mode);
  opacity: var(--blend-opacity);
  transition: opacity 0.2s ease;
}
.bl-label {
  position: absolute;
  left: 20px;
  top: 18px;
  z-index: 2;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
}
.bl-modes {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 8px;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  padding: 6px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}
.bl-modes button {
  border: 0;
  border-radius: 6px;
  padding: 4px 4px;
  font-size: 10.5px;
  cursor: pointer;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
}
.bl-modes button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.28); color: #fff; }
@media (prefers-reduced-motion: reduce) {
  .bl-b { transition: none; }
}
`;function m({entryId:a,schema:t}){const o=n(a,t),[s,d]=i.useState(()=>o.get("mode"));return i.useEffect(()=>o.subscribe(()=>{d(o.get("mode"))}),[o]),e.jsx(l,{entryId:a,schema:t,children:e.jsxs("div",{className:"bl-stage",children:[e.jsx("div",{className:"bl-a","aria-hidden":"true"}),e.jsx("div",{className:"bl-b","aria-hidden":"true"}),e.jsxs("span",{className:"bl-label",children:["mix-blend-mode: ",s]}),e.jsx("div",{className:"bl-modes",role:"group","aria-label":"混合模式切换 Blend mode switcher",children:p.map(r=>e.jsx("button",{type:"button","aria-pressed":s===r,onClick:()=>o.set("mode",r),children:r},r))}),e.jsx("style",{children:b})]})})}export{m as default};
