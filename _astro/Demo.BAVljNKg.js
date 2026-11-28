import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as d}from"./color.DuEPkvq5.js";import{D as x}from"./DemoStage.vW1CgYCd.js";const m=`
.cjk-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.cjk-support { display: flex; flex-wrap: wrap; gap: 8px; }
.cjk-badge { font-size: 12px; padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: color-mix(in srgb, currentColor 8%, transparent); }
.cjk-badge strong { font-variant-numeric: tabular-nums; }
.cjk-article {
  max-width: 44em;
  text-align: var(--cjk-align);
  line-height: 2;
  padding: 14px 16px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.cjk-article p {
  margin: 0 0 0.75em;
  text-indent: var(--cjk-indent);
  text-autospace: var(--cjk-autospace);
  text-spacing-trim: var(--cjk-punct-trim);
}
.cjk-article p:last-child { margin-block-end: 0; }
.cjk-article .cjk-lead { text-indent: 0; font-weight: 650; }
.cjk-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.7; }
`;function k({entryId:r,schema:s}){const a=d(r,s),[u,n]=t.useState(0);t.useEffect(()=>a.subscribe(()=>n(l=>l+1)),[a]);const[i,o]=t.useState(null),[c,p]=t.useState(null);return t.useEffect(()=>{o(typeof CSS<"u"&&CSS.supports("text-autospace","normal")),p(typeof CSS<"u"&&CSS.supports("text-spacing-trim","normal"))},[]),e.jsxs(x,{entryId:r,schema:s,children:[e.jsxs("div",{className:"cjk-wrap",children:[e.jsxs("div",{className:"cjk-support",children:[e.jsxs("span",{className:"cjk-badge",children:["text-autospace"," ",e.jsx("strong",{children:i===null?"…":i?"✓ 本浏览器支持":"✗ 未支持(声明被忽略)"})]}),e.jsxs("span",{className:"cjk-badge",children:["text-spacing-trim"," ",e.jsx("strong",{children:c===null?"…":c?"✓ 本浏览器支持(实验性)":"✗ 未支持(Chrome/Edge 123+)"})]})]}),e.jsxs("div",{className:"cjk-article",children:[e.jsx("p",{className:"cjk-lead",children:"中文排版:缩进、对齐、中西间距与标点挤压"}),e.jsx("p",{children:"汉字与标点的字框是正方形,各占一个字宽。W3C 的《中文排版需求》(clreq)把段首缩进两字、行尾对齐等规则整理成文,供排版引擎与设计系统参考。"}),e.jsx("p",{children:"中西混排时,汉字与拉丁字母、数字之间原则上留出不多于四分之一个汉字宽的间距——text-autospace 在排版引擎层面自动完成这件事,2025-11 起进入新基线,复制、搜索与朗读都不受影响。"}),e.jsx("p",{children:"标点挤压(clreq §6.3.2)压缩全角标点的内部留白:「引号」、(括号)、冒号:后的空隙因此收紧;CSS 侧由实验性的 text-spacing-trim 落地,目前仅 Chrome/Edge 123+ 支持。"})]}),e.jsx("p",{className:"cjk-note",children:"数值出处:缩进 2 字、中西间距 ≤¼ 字宽、两端对齐原则出自 W3C clreq(调研 05§21/22 已核对);text-autospace 2025-11 新基线(MDN);text-spacing-trim 实验性,BCD @main 2026-11-22:Chrome/Edge 123+,Firefox/Safari 未支持。 Sources: the 2-em indent, ≤¼-width CJK-Latin spacing and justification come from W3C clreq (verified, research 05 §21/22); text-autospace is Baseline since 2025-11 (MDN); text-spacing-trim is experimental — BCD @main 2026-11-22: Chrome/Edge 123+, Firefox/Safari unsupported."})]}),e.jsx("style",{children:m})]})}export{k as default};
