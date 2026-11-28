import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as d}from"./index.DLkBFFtG.js";import{D as i}from"./DemoStage.vW1CgYCd.js";import"./color.DuEPkvq5.js";const n=[0,4,8,16,32],l=`
.demo-stage {
  --theme-shadow-elevation: 8;
  --theme-shadow-opacity: 100%;
}
.ts-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f3f3f3; /* Fluent 浅色画布 */
  padding: 14px;
  transition: background-color 0.25s ease;
}
.ts-stage[data-theme="dark"] { background: #202020; }
.ts-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}
.fl-card {
  --z: 8;
  width: 96px;
  height: 72px;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  font-size: 11px;
  color: #4a4a4a;
  /* Web 近似:blur/offset 随 z 增大,alpha 随 z 减小(clamp 封顶) */
  box-shadow:
    0 calc(var(--z) * 0.4px)
      calc(var(--z) * 2.2px + 2px)
      color-mix(in srgb, black
        calc(clamp(0, var(--z) * 0.035, 0.5) * var(--theme-shadow-opacity)),
        transparent);
  transition: box-shadow 0.18s ease;
}
.fl-card.param {
  width: 140px;
  height: 96px;
  --z: var(--theme-shadow-elevation);
  background: linear-gradient(135deg, #ffffff, #f6f7fb);
  font-size: 12px;
}
.ts-stage[data-theme="dark"] .fl-card { background: #2b2b2b; color: #d0d0d0; }
.ts-stage[data-theme="dark"] .fl-card.param { background: linear-gradient(135deg, #33333d, #26262e); }
.ts-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
}
.ts-stage[data-theme="dark"] .ts-toolbar { background: rgba(255, 255, 255, 0.12); }
.ts-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: inherit;
  background: transparent;
}
.ts-toolbar button[aria-pressed="true"] { background: rgba(127, 127, 127, 0.3); font-weight: 600; }
.ts-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  font-size: 11px;
  color: #8a8a8a;
  max-width: 72%;
}
@media (prefers-reduced-motion: reduce) {
  .ts-stage, .fl-card { transition: none; }
}
`;function b({entryId:s,schema:o}){const[t,r]=d.useState("light");return a.jsx(i,{entryId:s,schema:o,children:a.jsxs("div",{className:"ts-stage","data-theme":t,children:[a.jsxs("div",{className:"ts-row",children:[n.map(e=>a.jsxs("div",{className:"fl-card",style:{"--z":String(e)},children:["z=",e]},e)),a.jsx("div",{className:"fl-card param",children:"参数卡 param z"})]}),a.jsxs("div",{className:"ts-toolbar",role:"group","aria-label":"画布主题 Canvas theme",children:[a.jsx("button",{type:"button","aria-pressed":t==="light",onClick:()=>r("light"),children:"浅色 Light"}),a.jsx("button",{type:"button","aria-pressed":t==="dark",onClick:()=>r("dark"),children:"暗色 Dark"})]}),a.jsx("p",{className:"ts-note",children:"Web 近似公式(非 ThemeShadow 本体);z 语义、Receivers、矩形限定见 WinUI API 文档;拖拽抬升/主题适配由系统按 z 自动计算。"}),a.jsx("style",{children:l})]})})}export{b as default};
