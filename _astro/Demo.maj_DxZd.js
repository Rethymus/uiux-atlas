import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as x}from"./index.DLkBFFtG.js";import{g as b}from"./color.DuEPkvq5.js";import{D as j}from"./DemoStage.vW1CgYCd.js";function h(r){const t=r.trim().replace(/^#/,""),a=t.length===3?t.split("").map(s=>s+s).join(""):t;return/^[0-9a-fA-F]{6}$/.test(a)?{rgb:[parseInt(a.slice(0,2),16),parseInt(a.slice(2,4),16),parseInt(a.slice(4,6),16)],ok:!0}:{rgb:[0,0,0],ok:!1}}function f([r,t,a]){const s=n=>{const l=n/255;return l<=.03928?l/12.92:Math.pow((l+.055)/1.055,2.4)};return .2126*s(r)+.7152*s(t)+.0722*s(a)}const k=`
.wc-stage {
  --wc-fg: #1C1B1F;
  --wc-bg: #FFFBFE;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  gap: 16px;
  padding: 18px;
}
.wc-preview {
  flex: 1.1;
  border-radius: 16px;
  padding: 22px 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  min-width: 0;
  transition: background-color 0.18s ease;
  /* CSS 变量型参数由 DemoStage 注入 .demo-stage,此处直接消费 */
  background-color: var(--wc-bg);
  color: var(--wc-fg);
}
.wc-sample-normal { font-size: 14px; line-height: 1.55; }
.wc-sample-large { font-size: 24px; line-height: 1.4; font-weight: 400; }
.wc-sample-large-bold { font-size: 18.66px; line-height: 1.4; font-weight: 700; }
.wc-nonText {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}
.wc-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid currentColor; /* 非文本样本:前景描边,对相邻色按 3:1 判 */
  position: relative;
}
.wc-check::after {
  content: "";
  position: absolute;
  inset: 3px 2px 5px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(40deg);
}
.wc-panel {
  flex: 1;
  min-width: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  font-size: 12.5px;
}
.wc-ratioRow { display: flex; align-items: baseline; gap: 10px; font-variant-numeric: tabular-nums; }
.wc-ratio { font-size: 24px; font-weight: 700; }
.wc-lum { color: #5b6472; font-size: 11.5px; font-family: ui-monospace, Consolas, monospace; }
.wc-badges { display: flex; flex-wrap: wrap; gap: 6px; }
.wc-badge {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.wc-pass { background: oklch(0.6 0.15 150); }
.wc-fail { background: oklch(0.55 0.19 25); }
.wc-scale {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: #e6e9ee;
  align-self: flex-start;
}
.wc-scale button {
  border: 0;
  border-radius: 999px;
  padding: 4px 13px;
  font-size: 12px;
  cursor: pointer;
  color: #374151;
  background: transparent;
}
.wc-scale button[aria-pressed="true"] { background: #fff; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.14); }
.wc-note { font-size: 11.5px; color: #5b6472; line-height: 1.5; }
.wc-invalid { color: oklch(0.55 0.19 25); font-size: 12px; }
@media (prefers-reduced-motion: reduce) {
  .wc-preview { transition: none; }
}
`,y=[{key:"aa",label:"AA 4.5:1",threshold:4.5},{key:"aaa",label:"AAA 7:1",threshold:7},{key:"large",label:"大字 Large 3:1",threshold:3},{key:"nontext",label:"非文本 Non-text 3:1",threshold:3}];function C({entryId:r,schema:t}){const a=b(r,t),[s,n]=x.useState(()=>a.get("textScale")),[,l]=x.useState(0);x.useEffect(()=>a.subscribe(()=>{n(a.get("textScale")),l(o=>o+1)}),[a]);const u=a.get("foreground"),w=a.get("background"),g=h(u),m=h(w),c=g.ok&&m.ok,i=f(g.rgb),p=f(m.rgb),d=c?(Math.max(i,p)+.05)/(Math.min(i,p)+.05):0;return e.jsxs(j,{entryId:r,schema:t,children:[e.jsxs("div",{className:"wc-stage",children:[e.jsxs("div",{className:"wc-preview","data-scale":s,children:[s==="large"?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"wc-sample-large",children:"大字 Large text 24px"}),e.jsx("span",{className:"wc-sample-large-bold",children:"粗体大字 Bold 18.66px ≈ 14pt bold"})]}):e.jsx("span",{className:"wc-sample-normal",children:"正文样字 Body text —— WCAG 2.1 对比度四道阈值实时判定。 The four WCAG 2.1 contrast gates, judged live."}),e.jsxs("span",{className:"wc-nonText",children:[e.jsx("span",{className:"wc-check","aria-hidden":"true"}),"非文本样本 Non-text sample(3:1 / SC 1.4.11)"]})]}),e.jsxs("div",{className:"wc-panel",children:[e.jsxs("div",{className:"wc-ratioRow",children:[e.jsx("span",{className:"wc-ratio",children:c?`${d.toFixed(2)}:1`:"—"}),c&&e.jsxs("span",{className:"wc-lum",children:["L(fg)=",i.toFixed(3)," L(bg)=",p.toFixed(3)]})]}),e.jsx("div",{className:"wc-badges",children:c&&y.map(o=>e.jsxs("span",{className:`wc-badge ${d>=o.threshold?"wc-pass":"wc-fail"}`,children:[o.label," ",d>=o.threshold?"✓":"✗"]},o.key))}),e.jsxs("div",{className:"wc-scale",role:"group","aria-label":"字号档位 Text scale",children:[e.jsx("button",{type:"button","aria-pressed":s==="normal",onClick:()=>n("normal"),children:"正文 Normal"}),e.jsx("button",{type:"button","aria-pressed":s==="large",onClick:()=>n("large"),children:"大字 Large"})]}),e.jsx("p",{className:"wc-note",children:c?e.jsx(e.Fragment,{children:"判定用未舍入原值,显示保留两位(4.499:1 显示 4.50 但为 ✗)。 大字 = ≥18pt(≈24px)或 ≥14pt(≈18.66px)粗体,阈值减半。 Judged unrounded, displayed to two decimals. Large = ≥18pt (≈24px) or ≥14pt bold, halved thresholds."}):e.jsx("span",{className:"wc-invalid",children:"hex 无法解析 / unparseable hex — use #RRGGBB or #RGB"})})]})]}),e.jsx("style",{children:k})]})}export{C as default};
