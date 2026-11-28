import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as g}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as x}from"./DemoStage.vW1CgYCd.js";const s={lineHeight:1.5,paragraphGap:2,letterSpacing:.12,wordSpacing:.16},u=`
.ts-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.ts-panel { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ts-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent); }
.ts-badge strong { font-variant-numeric: tabular-nums; }
.ts-badge[data-pass="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.ts-badge[data-pass="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 18%, transparent); }
.ts-btn { border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 999px;
  padding: 5px 14px; font-size: 12px; cursor: pointer; background: transparent; color: inherit; }
.ts-btn-primary { background: color-mix(in srgb, oklch(0.55 0.15 260) 75%, transparent); border-color: transparent; color: #fff; }
.ts-prose {
  max-width: 62ch;
  line-height: var(--ts-line-height);
  letter-spacing: var(--ts-letter-spacing);
  word-spacing: var(--ts-word-spacing);
}
.ts-prose p { margin: 0 0 var(--ts-para-gap); }
.ts-prose p:last-child { margin-block-end: 0; }
.ts-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;function j({entryId:r,schema:n}){const a=m(r,n),[b,h]=g.useState(0);g.useEffect(()=>a.subscribe(()=>h(e=>e+1)),[a]);const i=a.get("lineHeight"),o=a.get("paragraphGap"),p=a.get("letterSpacing"),l=a.get("wordSpacing"),c=[{name:"行高 line-height",value:i,threshold:s.lineHeight,pass:i>=s.lineHeight,fmt:e=>`${e.toFixed(2)}×`},{name:"段距 paragraph",value:o,threshold:s.paragraphGap,pass:o>=s.paragraphGap,fmt:e=>`${e.toFixed(2)}em`},{name:"字距 letter-spacing",value:p,threshold:s.letterSpacing,pass:p>=s.letterSpacing,fmt:e=>`${e.toFixed(3)}em`},{name:"词距 word-spacing",value:l,threshold:s.wordSpacing,pass:l>=s.wordSpacing,fmt:e=>`${e.toFixed(3)}em`}],d=c.every(e=>e.pass);return t.jsxs(x,{entryId:r,schema:n,children:[t.jsxs("div",{className:"ts-wrap",children:[t.jsxs("div",{className:"ts-panel",children:[c.map(e=>t.jsxs("span",{className:"ts-badge","data-pass":e.pass,children:[e.pass?"✓":"✗"," ",e.name," ",t.jsx("strong",{children:e.fmt(e.value)}),t.jsxs("span",{"aria-hidden":"true",children:["/ 阈值 ",e.fmt(e.threshold)]})]},e.name)),t.jsx("span",{className:"ts-badge","data-pass":d,children:d?"SC 1.4.12 达标 Pass":"低于阈值 Below thresholds"})]}),t.jsxs("div",{className:"ts-panel",children:[t.jsx("button",{type:"button",className:"ts-btn ts-btn-primary",onClick:()=>{a.set("lineHeight",s.lineHeight),a.set("paragraphGap",s.paragraphGap),a.set("letterSpacing",s.letterSpacing),a.set("wordSpacing",s.wordSpacing)},children:"设为 WCAG 阈值 Set to WCAG thresholds"}),t.jsx("button",{type:"button",className:"ts-btn",onClick:()=>a.reset(),children:"还原默认 Reset defaults"})]}),t.jsxs("div",{className:"ts-prose",children:[t.jsx("p",{children:"Users, assistive technologies and reading modes may override text spacing to improve readability. When line height is set to at least 1.5 times the font size, paragraph spacing to 2 times, letter spacing to 0.12 times and word spacing to 0.16 times, no content or functionality may be lost."}),t.jsx("p",{children:"文本可以被覆写:行高涨到字号的 1.5 倍、段距涨到 2 倍、字距涨到 0.12 倍时, 标题不截断、按钮不错位、弹层不裁字——这就是 1.4.12 要求的「内容仍可用」。 词距对无空格分词的中文基本无效,中文站点请重点核对行高与段距。"})]}),t.jsx("p",{className:"ts-note",children:"四阈值出自 WCAG 成功准则 1.4.12(W3C 理解文档原文核对):行高 ≥1.5×、段距 ≥2×、字距 ≥0.12×、词距 ≥0.16× 字号,均为用户覆写值而非设计默认。 The four thresholds come from WCAG SC 1.4.12 (verified against the W3C Understanding document): line height ≥1.5×, paragraph spacing ≥2×, letter spacing ≥0.12×, word spacing ≥0.16× the font size — user-override values, not design defaults."})]}),t.jsx("style",{children:u})]})}export{j as default};
