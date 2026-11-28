import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const b=`
.demo-stage {
  --cb-border: 2px;
  --cb-link: #0000EE;
}
.cb-page {
  position: absolute;
  inset: 0;
  overflow: auto;
  padding: 28px 24px 40px;
  background: #ffffff;
  color: #000000;
  font-family: "Times New Roman", Times, Georgia, serif;
  font-size: 16px;
  line-height: 1.5;
}
.cb-scene[data-typeface="mono"] .cb-page { font-family: ui-monospace, "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
.cb-page * { border-radius: 0; box-shadow: none; transition: none; }
.cb-page h1 {
  margin: 0 0 8px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.cb-tag { margin: 0 0 20px; font-size: 14px; }
.cb-hr { border: 0; border-top: var(--cb-border) solid #000; margin: 0 0 20px; }
.cb-page a { color: var(--cb-link); text-decoration: underline; }
.cb-box { border: var(--cb-border) solid #000; padding: 14px 16px; margin: 0 0 20px; max-width: 62ch; }
.cb-box h2 { margin: 0 0 10px; font-size: 20px; letter-spacing: -0.02em; text-transform: uppercase; }
.cb-box ul { margin: 0; padding-left: 22px; }
.cb-box li { margin: 2px 0; }
.cb-table { border-collapse: collapse; margin: 0 0 20px; font-size: 15px; }
.cb-table th, .cb-table td { border: var(--cb-border) solid #000; padding: 6px 12px; text-align: left; }
.cb-btn {
  display: inline-block;
  border: var(--cb-border) solid #000;
  background: #ffffff;
  color: #000000;
  font: inherit;
  padding: 6px 16px;
  cursor: pointer;
}
/* 硬反色:零过渡,黑↔白 */
.cb-scene[data-hover-invert="on"] .cb-btn:hover { background: #000000; color: #ffffff; }
.cb-scene[data-hover-invert="off"] .cb-btn:hover { text-decoration: underline; }
.cb-btn:focus-visible { outline: 2px solid #000; outline-offset: 2px; }
.cb-links { margin: 0 0 20px; padding-left: 22px; }
.cb-links li { margin: 2px 0; }
/* 工具条(风格内自洽:直角黑边,无圆角) */
.cb-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}
.cb-toolbar .cb-btn { padding: 4px 12px; font-size: 12px; }
.cb-footnote { font-size: 13px; color: #333333; }
`;function m({entryId:s,schema:i}){const t=l(s,i),[o,c]=r.useState(()=>t.get("typeface")),[n,a]=r.useState(()=>t.get("hoverInvert"));return r.useEffect(()=>t.subscribe(()=>{c(t.get("typeface")),a(t.get("hoverInvert"))}),[t]),e.jsxs(d,{entryId:s,schema:i,children:[e.jsx("div",{className:"cb-scene","data-typeface":o,"data-hover-invert":n,children:e.jsxs("main",{className:"cb-page",children:[e.jsx("h1",{children:"The Brutalist Web"}),e.jsx("p",{className:"cb-tag",children:"Honest materials: content first, links look like links, performance is design."}),e.jsx("hr",{className:"cb-hr"}),e.jsxs("div",{className:"cb-box",children:[e.jsx("h2",{children:"Manifesto"}),e.jsxs("ul",{children:[e.jsx("li",{children:"默认、未加修饰的 HTML——浏览器默认渲染即是设计。"}),e.jsxs("li",{children:["链接像链接:默认蓝 ",e.jsx("code",{children:"#0000EE"}),",下划线永不剥除。"]}),e.jsx("li",{children:"性能即设计:无字体下载,无装饰图片。"})]})]}),e.jsxs("table",{className:"cb-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Index"}),e.jsx("th",{scope:"col",children:"Item"}),e.jsx("th",{scope:"col",children:"Note"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"01"}),e.jsx("td",{children:e.jsx("a",{href:"#raw",children:"Raw HTML"})}),e.jsx("td",{children:"Structure over styling"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"02"}),e.jsx("td",{children:e.jsx("a",{href:"#mono",children:"System fonts"})}),e.jsx("td",{children:"Zero bytes of type"})]})]})]}),e.jsx("button",{type:"button",className:"cb-btn",children:"Submit Query"}),e.jsx("p",{className:"cb-footnote",style:{marginTop:20},children:"Delete the stylesheet and this page still works. That is the point."}),e.jsxs("div",{className:"cb-toolbar",role:"group","aria-label":"参数对照切换 Switches",children:[e.jsx("button",{type:"button",className:"cb-btn","aria-pressed":o==="mono",onClick:()=>t.set("typeface",o==="mono"?"system":"mono"),children:o==="mono"?"Mono ✓":"Mono"}),e.jsx("button",{type:"button",className:"cb-btn","aria-pressed":n==="on",onClick:()=>t.set("hoverInvert",n==="on"?"off":"on"),children:n==="on"?"Invert ✓":"Invert"})]})]})}),e.jsx("style",{children:b})]})}export{m as default};
