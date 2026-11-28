import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{D as h}from"./DemoStage.vW1CgYCd.js";const x=[{id:"system",zh:"系统",en:"System"},{id:"light",zh:"浅色",en:"Light"},{id:"dark",zh:"深色",en:"Dark"}],g=`
.ld-scene {
  /* 默认值兜底(挂载瞬间 store 尚未注入时保证可见),与 schema.json 默认一致 */
  --ld-light: #6750A4;
  --ld-dark: #D0BCFF;
  /* 兼容回退变量:仅当 light-dark() 不被支持时被消费(见底部 @supports not) */
  --ld-fallback-accent: var(--ld-light);
  --ld-fallback-on-accent: #FFFFFF;
  color-scheme: light dark; /* system 档:跟随 OS 偏好 */
}
.ld-scene[data-scheme="light"] { color-scheme: light; }
.ld-scene[data-scheme="dark"]  { color-scheme: dark; }

/* OS 偏好翻转:只有支持媒体查询但不支持 light-dark() 的浏览器才会走到下面的 @supports not,
   在支持的浏览器里这段会被后面的 @supports 块整体覆写 */
@media (prefers-color-scheme: dark) {
  .ld-scene {
    --ld-fallback-accent: var(--ld-dark);
    --ld-fallback-on-accent: #381E72;
  }
}
@supports (color: light-dark(#fff, #000)) {
  .ld-scene {
    --ld-fallback-accent: light-dark(var(--ld-light), var(--ld-dark));
    --ld-fallback-on-accent: light-dark(#FFFFFF, #381E72);
  }
}

.ld-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 20px;
  /* 系统色(CSS Color 4 §6.2):响应元素 color-scheme,天然双态、零发明值;
     color-scheme 属性本身比 light-dark() 支持更早,故老浏览器下 OS 跟随依然生效 */
  background-color: Canvas;
  color: CanvasText;
}
.ld-chip {
  width: min(300px, 62%);
  padding: 22px 26px;
  border-radius: 18px;
  background-color: var(--ld-fallback-accent);
  color: var(--ld-fallback-on-accent);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.ld-chip h3 { margin: 0 0 8px; font-size: 17px; font-weight: 650; }
.ld-chip p { margin: 0 0 14px; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.ld-chip button {
  border: 0;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
  background: rgba(255, 255, 255, 0.24);
}
.ld-panel {
  width: min(280px, 34%);
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: 12.5px;
}
.ld-code {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 12px;
  line-height: 1.5;
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, currentColor 8%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  overflow-wrap: anywhere;
}
.ld-swatch {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 3px;
  margin-right: 7px;
  vertical-align: -1px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
}
.ld-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 12%, transparent);
}
.ld-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: inherit;
  background: transparent;
}
.ld-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, currentColor 20%, transparent);
  font-weight: 600;
}
@media (prefers-reduced-motion: reduce) {
  .ld-chip { transition: none; }
}
`;function f({entryId:o,schema:t}){const r=p(o,t),[s,l]=c.useState(()=>r.get("scheme"));c.useEffect(()=>r.subscribe(()=>{l(r.get("scheme"))}),[r]);const n=r.get("lightValue"),i=r.get("darkValue"),d=s==="system"?"light dark":s;return e.jsxs(h,{entryId:o,schema:t,children:[e.jsxs("div",{className:"ld-scene","data-scheme":s,children:[e.jsxs("div",{className:"ld-chip",children:[e.jsx("h3",{children:"双值取色 light-dark()"}),e.jsx("p",{children:"切换上方三态,改写的只是 color-scheme。 Switching the three states rewrites only color-scheme."}),e.jsx("button",{type:"button",children:"主操作 Action"})]}),e.jsxs("div",{className:"ld-panel",children:[e.jsxs("span",{className:"ld-code",children:["color-scheme: ",d,";"]}),e.jsxs("span",{className:"ld-code",children:[e.jsx("span",{className:"ld-swatch",style:{background:n}}),"light-dark(",n,", ",i,")"]}),e.jsxs("span",{className:"ld-code",children:[e.jsx("span",{className:"ld-swatch",style:{background:"#FFFFFF"}}),e.jsx("span",{className:"ld-swatch",style:{background:"#381E72"}}),"on-primary 基线 / on-primary baseline"]}),e.jsx("span",{style:{fontSize:11.5,opacity:.72},children:"中性底为系统色 Canvas/CanvasText / Neutral surfaces use Canvas & CanvasText"})]}),e.jsx("div",{className:"ld-toolbar",role:"group","aria-label":"外观切换 Appearance switcher",children:x.map(a=>e.jsx("button",{type:"button","aria-pressed":s===a.id,title:a.en,onClick:()=>l(a.id),children:a.zh},a.id))})]}),e.jsx("style",{children:g})]})}export{f as default};
