import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as b}from"./DemoStage.vW1CgYCd.js";const a={leather:"radial-gradient(circle at 30% 20%, oklch(0.42 0.06 40 / 0.55) 1.2px, transparent 1.6px), radial-gradient(circle at 70% 60%, oklch(0.3 0.05 35 / 0.5) 1.4px, transparent 1.9px), linear-gradient(150deg, oklch(0.4 0.07 35), oklch(0.32 0.06 30))",metal:"repeating-linear-gradient(90deg, oklch(0.62 0.01 250) 0 1px, oklch(0.71 0.01 250) 1px 2px, oklch(0.66 0.01 250) 2px 3px), linear-gradient(180deg, oklch(0.68 0.01 250), oklch(0.58 0.01 250))",paper:"repeating-linear-gradient(0deg, transparent 0 26px, oklch(0.62 0.04 70 / 0.35) 26px 27px), linear-gradient(180deg, oklch(0.93 0.03 80), oklch(0.89 0.04 75))",wood:"repeating-linear-gradient(93deg, oklch(0.38 0.06 50) 0 3px, oklch(0.45 0.07 55) 3px 5px, oklch(0.36 0.05 45) 5px 9px), linear-gradient(180deg, oklch(0.42 0.06 50), oklch(0.34 0.05 45))"},r={leather:"oklch(0.9 0.05 80)",metal:"oklch(0.2 0.02 250)",paper:"oklch(0.3 0.04 60)",wood:"oklch(0.9 0.05 85)"},m=`
.demo-stage {
  --sk-angle: 135deg;
  --sk-emboss: 1;
}
.sk-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: oklch(0.22 0.02 260);
}
.sk-panel {
  position: relative;
  width: min(330px, calc(100% - 32px));
  padding: 24px 26px 26px;
  border-radius: 16px;
  background-image: ${a.leather};
  background-size: 22px 22px, 34px 34px, 100% 100%;
  box-shadow:
    inset 0 2px 2px oklch(1 0 0 / calc(0.28 * var(--sk-emboss))),
    inset 0 -3px 6px oklch(0 0 / calc(0.45 * var(--sk-emboss))),
    0 10px 26px oklch(0 0 / 0.5);
  color: ${r.leather};
  animation: sk-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* 缝线内描边(年代签名,装饰) */
.sk-panel::after {
  content: "";
  position: absolute;
  inset: 7px;
  border-radius: 11px;
  border: 2px dashed oklch(0.88 0.05 80 / 0.75);
  pointer-events: none;
}
.sk-scene[data-stitch="off"] .sk-panel::after { display: none; }
.sk-scene[data-texture="metal"] .sk-panel { background-image: ${a.metal}; background-size: auto, 100% 100%; color: ${r.metal}; }
.sk-scene[data-texture="paper"] .sk-panel { background-image: ${a.paper}; background-size: auto, 100% 100%; color: ${r.paper}; }
.sk-scene[data-texture="wood"] .sk-panel { background-image: ${a.wood}; background-size: auto, 100% 100%; color: ${r.wood}; }
.sk-title {
  margin: 0 0 4px;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-shadow: 0 -1px 0 oklch(0 0 / 0.55), 0 1px 0 oklch(1 0 0 / 0.25);
}
.sk-sub { margin: 0 0 18px; font-size: 12px; opacity: 0.8; }
/* 凹凸金属铭牌(光照模型示意) */
.sk-plate {
  padding: 10px 14px;
  margin: 0 0 18px;
  border-radius: 8px;
  background: linear-gradient(var(--sk-angle), oklch(0.8 0.01 250), oklch(0.55 0.01 250) 55%, oklch(0.68 0.01 250));
  box-shadow:
    inset 0 1.5px 1px oklch(1 0 0 / calc(0.85 * var(--sk-emboss))),
    inset 0 -1.5px 1px oklch(0 0 / calc(0.6 * var(--sk-emboss))),
    0 2px 4px oklch(0 0 / 0.45);
  color: oklch(0.25 0.02 250);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sk-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.sk-label { font-size: 13px; font-weight: 600; }
/* 机械拨动开关:凹凸 + 物理下沉 */
.sk-switch {
  position: relative;
  width: 74px;
  height: 30px;
  border-radius: 8px;
  border: 0;
  padding: 0;
  cursor: pointer;
  background: linear-gradient(var(--sk-angle), oklch(0.5 0.02 260), oklch(0.34 0.02 260));
  box-shadow:
    inset 0 1.5px 1px oklch(1 0 0 / calc(0.5 * var(--sk-emboss))),
    inset 0 -2px 3px oklch(0 0 / calc(0.6 * var(--sk-emboss))),
    0 2px 4px oklch(0 0 / 0.45);
}
.sk-switch .sk-nub {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 34px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: oklch(0.3 0.03 260);
  background: linear-gradient(var(--sk-angle), oklch(0.88 0.01 260), oklch(0.6 0.01 260) 60%, oklch(0.74 0.01 260));
  box-shadow:
    inset 0 1.5px 1px oklch(1 0 0 / calc(0.95 * var(--sk-emboss))),
    inset 0 -1.5px 1px oklch(0 0 / calc(0.55 * var(--sk-emboss))),
    0 2px 3px oklch(0 0 / 0.5);
  transition: left 0.15s ease, box-shadow 0.15s ease;
}
.sk-switch[aria-checked="true"] .sk-nub { left: calc(100% - 37px); }
.sk-switch:active .sk-nub {
  box-shadow:
    inset 0 2px 4px oklch(0 0 / calc(0.35 * var(--sk-emboss))),
    0 1px 1px oklch(0 0 / 0.4);
}
.sk-switch:focus-visible { outline: 2px solid oklch(0.9 0.05 85); outline-offset: 3px; }
/* 旋钮:点击步进(机械控制隐喻) */
.sk-knob {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background:
    conic-gradient(from 0deg, oklch(0.72 0.01 250) 0 40deg, oklch(0.5 0.01 250) 40deg 360deg),
    linear-gradient(var(--sk-angle), oklch(0.78 0.01 250), oklch(0.5 0.01 250));
  box-shadow:
    inset 0 2px 2px oklch(1 0 0 / calc(0.9 * var(--sk-emboss))),
    inset 0 -3px 4px oklch(0 0 / calc(0.55 * var(--sk-emboss))),
    0 4px 8px oklch(0 0 / 0.5);
  transition: rotate 0.2s ease;
}
.sk-knob::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 5px;
  width: 4px;
  height: 16px;
  margin-left: -2px;
  border-radius: 2px;
  background: oklch(0.25 0.02 260);
  box-shadow: 0 1px 0 oklch(1 0 0 / 0.4);
}
.sk-knob::after {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, oklch(0.85 0.01 250), oklch(0.55 0.01 250));
  box-shadow: inset 0 1px 1px oklch(1 0 0 / calc(0.8 * var(--sk-emboss))), inset 0 -1px 1px oklch(0 0 / calc(0.4 * var(--sk-emboss)));
}
.sk-knob:active { scale: 0.97; }
.sk-knob:focus-visible { outline: 2px solid oklch(0.9 0.05 85); outline-offset: 3px; }
.sk-readout { font-size: 11px; opacity: 0.75; margin-top: 6px; }
.sk-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 8px;
  background: oklch(0 0 / 0.5);
}
@media (max-width: 480px) {
  .sk-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.sk-toggle button {
  border: 0;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  cursor: pointer;
  color: oklch(0.95 0.01 260 / 0.8);
  background: transparent;
}
.sk-toggle button[aria-pressed="true"] { background: oklch(0.6 0.01 250); color: oklch(1 0 0); }
.sk-toggle button:focus-visible { outline: 2px solid oklch(0.9 0.05 85); outline-offset: 2px; }
@keyframes sk-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .sk-panel { animation: none; }
  .sk-switch .sk-nub, .sk-knob { transition: none; }
}
`;function N({entryId:n,schema:c}){const o=u(n,c),[p,k]=t.useState(()=>o.get("texture")),[x,d]=t.useState(()=>o.get("stitch")),[i,h]=t.useState(!0),[l,g]=t.useState(1);return t.useEffect(()=>o.subscribe(()=>{k(o.get("texture")),d(o.get("stitch"))}),[o]),e.jsxs(b,{entryId:n,schema:c,children:[e.jsxs("div",{className:"sk-scene","data-texture":p,"data-stitch":x,children:[e.jsxs("div",{className:"sk-panel",children:[e.jsx("h2",{className:"sk-title",children:"Studio Console"}),e.jsx("p",{className:"sk-sub",children:"材质 × 光照模型 × 机械隐喻 / texture × light × mechanics"}),e.jsx("div",{className:"sk-plate",children:"Master Bus — Analog"}),e.jsxs("div",{className:"sk-row",children:[e.jsxs("div",{children:[e.jsx("span",{className:"sk-label",children:"Power"}),e.jsx("p",{className:"sk-readout","aria-live":"polite",children:i?"ON · 输出开启":"OFF · 已断电"})]}),e.jsx("button",{type:"button",role:"switch","aria-checked":i,"aria-label":"电源拨杆 Power toggle",className:"sk-switch",onClick:()=>h(s=>!s),children:e.jsx("span",{className:"sk-nub",children:i?"ON":"OFF"})})]}),e.jsxs("div",{className:"sk-row",style:{marginTop:16},children:[e.jsxs("div",{children:[e.jsx("span",{className:"sk-label",children:"Gain"}),e.jsx("p",{className:"sk-readout","aria-live":"polite",children:["0%","33%","66%","100%"][l]})]}),e.jsx("button",{type:"button",className:"sk-knob","aria-label":`增益旋钮 Gain knob:${["0%","33%","66%","100%"][l]},点击步进`,style:{rotate:`${l*90-135}deg`},onClick:()=>g(s=>(s+1)%4)})]})]}),e.jsx("div",{className:"sk-toggle",role:"group","aria-label":"材质切换 Texture switcher",children:["leather","metal","paper","wood"].map(s=>e.jsx("button",{type:"button","aria-pressed":p===s,onClick:()=>o.set("texture",s),children:s},s))})]}),e.jsx("style",{children:m})]})}export{N as default};
