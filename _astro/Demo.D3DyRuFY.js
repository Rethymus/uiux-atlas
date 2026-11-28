import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as k}from"./color.DuEPkvq5.js";import{D as j}from"./DemoStage.vW1CgYCd.js";const p=["lowest","low","container","high","highest"],h={lowest:"surface-container-lowest",low:"surface-container-low",container:"surface-container",high:"surface-container-high",highest:"surface-container-highest"},m={light:[.985,.96,.93,.9,.87],dark:[.06,.1,.14,.18,.22]},w=`
.ts-scene {
  position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px;
  color-scheme: light dark;
  /* on-surface 取 M3 官方基线换算:亮 #1C1B1F → oklch(0.225 0.008 297)(调研 06§7);暗侧为演示值 */
  --ts-on-light: oklch(0.225 0.008 297);
  --ts-on-dark: oklch(0.92 0.01 297);
}
.ts-stack { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
.ts-card {
  flex: 1; min-height: 0; border-radius: 12px; padding: 9px 13px;
  display: flex; flex-direction: column; justify-content: center; gap: 2px;
  border: 1px solid transparent;
  font-size: 12px;
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.ts-card h4 { margin: 0; font-size: 12.5px; font-weight: 650; }
.ts-card .ts-sub { opacity: 0.72; font-size: 11px; font-variant-numeric: tabular-nums; }
.ts-scene[data-mode="light"] .ts-card { color: var(--ts-on-light); }
.ts-scene[data-mode="dark"] .ts-card { color: var(--ts-on-dark); }
.ts-card[data-active="true"] {
  border-color: color-mix(in srgb, currentColor 45%, transparent);
  transform: translateX(6px);
}
.ts-card[data-active="true"] h4::after {
  content: " ← tier"; font-weight: 400; opacity: 0.7;
}
.ts-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; }
.ts-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); font-variant-numeric: tabular-nums; }
.ts-note { font-size: 11px; opacity: 0.75; }
@media (max-width: 480px) {
  .ts-scene { padding: 10px; }
  .ts-card { padding: 6px 11px; }
  .ts-card .ts-sub { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ts-card { transition: none; }
  .ts-card[data-active="true"] { transform: none; }
}
`;function z({entryId:n,schema:c}){const e=k(n,c),i=()=>({mode:e.get("mode"),tier:e.get("tier")}),[x,u]=l.useState(i);l.useEffect(()=>e.subscribe(()=>{u(i())}),[e]);const{mode:s,tier:a}=x,d=m[s]??m.light,f=e.get("hue"),g=e.get("chroma");return t.jsx(j,{entryId:n,schema:c,children:t.jsxs("div",{className:"ts-scene","data-mode":s,children:[t.jsx("div",{className:"ts-stack",children:p.map((r,b)=>{const o=d[b],v=a===r;return t.jsxs("div",{className:"ts-card","data-active":v,style:{backgroundColor:`oklch(${o} var(--ts-chroma) var(--ts-hue))`},children:[t.jsx("h4",{children:h[r]}),t.jsxs("span",{className:"ts-sub",children:["oklch(",o," · ",s,") · L×100 ≈ ",Math.round(o*100),"(tone 模拟 / simulated)"]})]},r)})}),t.jsxs("div",{className:"ts-meta",children:[t.jsxs("span",{className:"ts-chip",children:["mode: ",s,"(层级方向:提亮=前进)"]}),t.jsxs("span",{className:"ts-chip",children:["tier: ",h[a]??a," · oklch(",d[p.indexOf(a)]," ",g," ",f,")"]}),t.jsx("span",{className:"ts-note",children:"五档角色名为官方(M3 博客,调研 02§B7);L 阶梯与 chroma 为演示值,官方逐档 tone 值未核实 / Tier names official; ladder values illustrative."})]}),t.jsx("style",{children:w})]})})}export{z as default};
