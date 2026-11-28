import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const u=`
.dci-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.dci-support { display: flex; flex-wrap: wrap; gap: 8px; }
.dci-badge { font-size: 12px; padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: color-mix(in srgb, currentColor 8%, transparent); }
.dci-article {
  padding: 14px 16px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.dci-article p { margin: 0 0 0.9em; line-height: 1.9; }
.dci-article p:last-child { margin-block-end: 0; }
.dci-article > p:first-of-type::first-letter { font-weight: 700; }
/* 技法一:initial-letter(Chrome/Edge 110+;Safari 9+ 需 -webkit- 前缀;Firefox 未支持) */
.dci-article[data-technique="initial-letter"] > p:first-of-type::first-letter {
  -webkit-initial-letter: var(--dc-lines) min(var(--dc-sink), var(--dc-lines));
  initial-letter: var(--dc-lines) min(var(--dc-sink), var(--dc-lines));
  margin-right: 0.35em;
}
/* 技法二:float 经典兜底(全浏览器;字号≈行数×1.1em,社区近似做法,未证实) */
.dci-article[data-technique="float"] > p:first-of-type::first-letter {
  float: left;
  font-size: calc(var(--dc-lines) * 1.1em);
  line-height: 0.85;
  padding: 0.05em 0.14em 0 0;
}
/* initial-letter 与前缀都不支持(Firefox):initial-letter 技法自动退到 float */
@supports not ((initial-letter: 3) or (-webkit-initial-letter: 3)) {
  .dci-article[data-technique="initial-letter"] > p:first-of-type::first-letter {
    float: left;
    font-size: calc(var(--dc-lines) * 1.1em);
    line-height: 0.85;
    padding: 0.05em 0.14em 0 0;
  }
}
.dci-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.7; }
`;function b({entryId:l,schema:s}){const i=p(l,s),[r,n]=t.useState(()=>i.get("technique"));t.useEffect(()=>i.subscribe(()=>{n(i.get("technique"))}),[i]);const[a,o]=t.useState(null);t.useEffect(()=>{const d=typeof CSS<"u"&&(CSS.supports("initial-letter","3")||CSS.supports("-webkit-initial-letter","3"));o(d)},[]);const c=r==="initial-letter"&&a===!1?"float(auto)":r;return e.jsxs(f,{entryId:l,schema:s,children:[e.jsxs("div",{className:"dci-wrap",children:[e.jsxs("div",{className:"dci-support",children:[e.jsxs("span",{className:"dci-badge",children:["initial-letter"," ",e.jsx("strong",{children:a===null?"…":a?"✓ 本浏览器可用(含前缀)":"✗ 未支持,@supports 自动退 float"})]}),e.jsxs("span",{className:"dci-badge",children:["当前技法 ",e.jsx("strong",{children:c})]})]}),e.jsxs("article",{className:"dci-article","data-technique":r,children:[e.jsx("p",{children:"字体排印里的首字下沉(drop cap)是杂志与书籍的经典编辑传统:把段落第一个字形放大、占据多行, 让正文沿它环绕。initial-letter 用「占据行数 + 下沉行数」两个整数精确描述这一形态,浏览器自动完成环绕。"}),e.jsx("p",{children:"不支持该属性的浏览器(Firefox)经 @supports 检测后自动退到 ::first-letter + float 的经典兜底: 放大字号、压缩行高、向左浮动——近似值换算,但全浏览器一致可用,内容始终可读。"})]}),e.jsx("p",{className:"dci-note",children:"支持数据(BCD @main 2026-11-22 抓取):Chrome/Edge 110+;Firefox 未支持(bugzil.la/1223880); Safari 9+ 带 -webkit- 前缀,无前缀版本未发布(WebKit bug 229090),iOS Safari 部分实现且不支持小数值。 默认 3 行与 float 字号换算为社区常见惯例(未证实)。 Support (BCD @main fetched 2026-11-22): Chrome/Edge 110+; Firefox unsupported (bugzil.la/1223880); Safari 9+ prefixed, unprefixed unreleased (WebKit bug 229090); iOS Safari partial without decimal values. The 3-line default and float size formula are community conventions (unverified)."})]}),e.jsx("style",{children:u})]})}export{b as default};
