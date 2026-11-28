import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as h}from"./DemoStage.vW1CgYCd.js";const f=`
.wm-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 16px;
  overflow: auto;
}
.wm-paper {
  writing-mode: var(--wm-mode, vertical-rl);
  text-orientation: var(--wm-orientation, mixed);
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: auto;
  padding: 18px 20px;
  background: color-mix(in srgb, currentColor 5%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  animation: wm-in 0.45s ease-out both;
}
.wm-paper h3 { font-size: 16px; margin: 0 0 12px; letter-spacing: 0.12em; }
.wm-paper p { margin: 0 0 10px; font-size: 15px; line-height: 2; letter-spacing: 0.18em; }
.wm-year { text-combine-upright: var(--wm-combine, none); }
.wm-side { flex: none; width: 190px; display: flex; flex-direction: column; gap: 10px; }
/* 书脊标签:调研 12§2 片段原样 aside h2 { writing-mode: vertical-rl } */
.wm-spine {
  writing-mode: vertical-rl;
  align-self: end;
  padding: 12px 6px;
  font-size: 12px;
  letter-spacing: 0.3em;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 6px;
  background: color-mix(in srgb, oklch(0.62 0.15 250) 14%, transparent);
  white-space: nowrap;
}
/* 西文侧放标签:调研 12§2 片段 sideways-lr + @supports 回退 rotate(-90deg) 的运行时等价 */
.wm-latin-tag {
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
  color: inherit;
  background: transparent;
  cursor: pointer;
  align-self: center;
  margin-block: 12px;
}
.wm-latin-tag[data-sideways="true"] { writing-mode: sideways-lr; }
.wm-latin-tag[data-fallback="true"] { transform: rotate(-90deg); }
.wm-readout {
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
}
.wm-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.wm-hint { font-size: 11px; opacity: 0.55; margin: 0; line-height: 1.6; }
@keyframes wm-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (max-width: 560px) {
  .wm-scene { flex-direction: column; }
  .wm-paper { height: auto; min-height: 220px; }
  .wm-side { width: auto; flex-direction: row; flex-wrap: wrap; align-items: center; }
  .wm-spine { writing-mode: horizontal-tb; align-self: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .wm-paper { animation: none; }
}
`,b=["床前明月光","疑是地上霜","举头望明月","低头思故乡"];function S({entryId:a,schema:s}){const t=u(a,s),[o,l]=r.useState(()=>t.get("mode")),[d,m]=r.useState(()=>t.get("orientation")),[p,c]=r.useState(()=>t.get("combine")),[i,x]=r.useState(null),[g,w]=r.useState(!1);return r.useEffect(()=>t.subscribe(()=>{l(t.get("mode")),m(t.get("orientation")),c(t.get("combine"))}),[t]),r.useEffect(()=>{const n=typeof CSS<"u"&&CSS.supports?.("writing-mode","sideways-lr");x(!!n)},[]),e.jsxs(h,{entryId:a,schema:s,children:[e.jsxs("div",{className:"wm-scene",children:[e.jsxs("div",{className:"wm-paper",children:[e.jsx("h3",{children:"静夜思 · Li Bai"}),b.map(n=>e.jsx("p",{children:n},n)),e.jsxs("p",{children:[e.jsx("span",{className:"wm-year",children:"2026"})," 年书"]})]}),e.jsxs("div",{className:"wm-side",children:[e.jsx("span",{className:"wm-spine","aria-hidden":"true",children:"书脊 · 书写模式"}),e.jsx("button",{type:"button",className:"wm-latin-tag","data-sideways":i===!0,"data-fallback":i===!1&&g,onClick:()=>i===!1&&w(n=>!n),title:i===!1?"当前引擎不支持 sideways-lr,点击切换 rotate(-90deg) 回退":"sideways-lr 西文自下而上侧放",children:"sideways latin · 自下而上"}),e.jsxs("div",{className:"wm-readout",children:[e.jsxs("div",{children:["当前 mode = ",e.jsx("strong",{children:o})]}),e.jsxs("div",{children:["text-orientation = ",e.jsx("strong",{children:d}),"(仅竖排生效)"]}),e.jsxs("div",{children:["text-combine-upright = ",e.jsx("strong",{children:p}),"(看信纸落款年份)"]}),e.jsxs("div",{children:["CSS.supports(sideways-lr) = ",e.jsx("strong",{children:i===null?"检测中…":i?"true(原生侧放)":"false(需回退)"})]})]}),e.jsx("p",{className:"wm-hint",children:"竖排档:标题里「Li Bai」是 orientation 三档的探针(mixed 旋转/upright 直立堆叠/sideways 全侧放)。 mode=sideways-lr 且引擎不支持时,信纸自动回落横排——experimental 值无效即回落(调研 12§2)。"})]})]}),e.jsx("style",{children:f})]})}export{S as default};
