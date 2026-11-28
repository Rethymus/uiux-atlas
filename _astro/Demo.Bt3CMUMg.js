import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DLkBFFtG.js";import{D as i}from"./DemoStage.vW1CgYCd.js";import"./color.DuEPkvq5.js";const d=`
.demo-stage {
  --nb-shadow: 4px;
  --nb-border: 3px;
  --nb-radius: 0px;
  --nb-accent: #ff90e8;
}
.nb-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffdf5;
  animation: nb-in 0.3s ease-out both;
}
/* 判据配方:box-shadow: 4px 4px 0 #000(偏移可调,零模糊零扩散) */
.nb-card {
  width: min(340px, calc(100% - 32px));
  padding: 24px;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  box-shadow: var(--nb-shadow) var(--nb-shadow) 0 #000;
  background: #fffdf5;
  color: #111111;
}
.nb-badge {
  display: inline-block;
  padding: 3px 10px;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  background: var(--nb-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111111;
}
.nb-card h3 { margin: 14px 0 6px; font-size: 24px; font-weight: 800; line-height: 1.15; letter-spacing: -0.01em; }
.nb-hint { margin: 0 0 18px; font-size: 12px; color: #444444; }
.nb-row { display: flex; gap: 12px; }
.nb-btn {
  flex: 1;
  padding: 12px 0;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  background: var(--nb-accent);
  color: #111111;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--nb-shadow) var(--nb-shadow) 0 #000;
}
/* 按压:位移到阴影原点并吞掉阴影(非阴影动画) */
.nb-btn:active { translate: var(--nb-shadow) var(--nb-shadow); box-shadow: none; }
.nb-btn-ghost { background: #ffffff; color: #111111; }
.nb-btn:focus-visible { outline: 3px solid #000; outline-offset: 3px; }
.nb-checks { margin-top: 18px; display: grid; gap: 8px; }
.nb-check {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: var(--nb-border) solid #000;
  border-radius: var(--nb-radius);
  background: #ffffff;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}
.nb-check input { appearance: none; width: 16px; height: 16px; margin: 0; border: var(--nb-border) solid #000; border-radius: calc(var(--nb-radius) / 2); background: #ffffff; cursor: pointer; }
.nb-check input:checked { background: var(--nb-accent); }
.nb-check input:focus-visible { outline: 3px solid #000; outline-offset: 3px; }
@keyframes nb-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .nb-scene { animation: none; }
  .nb-btn, .nb-check input { transition: none; }
}
`;function x({entryId:s,schema:t}){const[r,o]=c.useState({fast:!0});return n.jsxs(i,{entryId:s,schema:t,children:[n.jsx("div",{className:"nb-scene",children:n.jsxs("div",{className:"nb-card",children:[n.jsx("span",{className:"nb-badge",children:"New · v4"}),n.jsx("h3",{children:"Loud, flat, honest."}),n.jsx("p",{className:"nb-hint",children:"按住按钮:块面被按进纸里 / Hold a button: the block sinks into the paper."}),n.jsxs("div",{className:"nb-row",children:[n.jsx("button",{type:"button",className:"nb-btn",children:"主操作 Action"}),n.jsx("button",{type:"button",className:"nb-btn nb-btn-ghost",children:"次要 Ghost"})]}),n.jsxs("div",{className:"nb-checks",children:[n.jsxs("label",{className:"nb-check",children:[n.jsx("input",{type:"checkbox",checked:!!r.fast,onChange:e=>o(a=>({...a,fast:e.target.checked}))}),"黑描边 + 硬阴影 Thick outline + hard shadow"]}),n.jsxs("label",{className:"nb-check",children:[n.jsx("input",{type:"checkbox",checked:!!r.candy,onChange:e=>o(a=>({...a,candy:e.target.checked}))}),"单一糖果强调色 One candy accent"]})]})]})}),n.jsx("style",{children:d})]})}export{x as default};
