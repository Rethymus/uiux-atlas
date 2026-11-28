import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as f}from"./color.DuEPkvq5.js";import{D as g}from"./DemoStage.vW1CgYCd.js";const v=`
.ty-scene {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: min(560px, 100%);
  margin: 0 auto;
  padding: 8px 14px;
}
/* —— 阶梯展示:六档字阶同屏(纯展示标本,非文档标题) —— */
.lad-row { display: flex; align-items: baseline; gap: 12px; min-width: 0; }
.lad-chip {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  min-width: 132px;
  text-align: right;
  flex: none;
}
.lad-sample {
  color: rgba(0, 0, 0, 0.88);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
/* antd 自然指数字阶(genFontSizes):行高恒为 (size+8)/size */
.lv-h1      { font-size: 38px; line-height: 1.23;    font-weight: 600; }
.lv-h2      { font-size: 30px; line-height: 1.2667;  font-weight: 600; }
.lv-h3      { font-size: 24px; line-height: 1.3333;  font-weight: 600; }
.lv-h4      { font-size: 20px; line-height: 1.4;     font-weight: 600; }
.lv-body    { font-size: 14px; line-height: 1.5714;  font-weight: 400; }
.lv-caption { font-size: 12px; line-height: 1.6667;  font-weight: 400; }
/* —— 参数标本:type 三档色 + ellipsis 单行截断 —— */
.ty-spec {
  border: 1px solid #f0f0f0;        /* colorBorderSecondary(bg 加深 6%) */
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: rgba(0, 0, 0, 0.88);       /* colorText 88% */
}
.ty-spec[data-type="secondary"] { color: rgba(0, 0, 0, 0.65); }  /* colorTextSecondary */
.ty-spec[data-type="danger"] { color: #ff4d4f; }                 /* seed colorError */
.ty-p { margin: 0; font-size: 14px; line-height: 1.5714; }
.ty-ell { margin: 0; font-size: 14px; line-height: 1.5714; }
.ty-ell.ell-on {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ty-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  overflow-wrap: anywhere;
}
`,y=[{level:"h1",chip:"h1 · 38px / 1.23"},{level:"h2",chip:"h2 · 30px / 1.2667"},{level:"h3",chip:"h3 · 24px / 1.3333"},{level:"h4",chip:"h4 · 20px / 1.4"},{level:"body",chip:"body · 14px / 1.5714"},{level:"caption",chip:"caption · 12px / 1.6667"}],c={h1:{ariaLevel:1,metrics:"38px / 1.23"},h2:{ariaLevel:2,metrics:"30px / 1.2667"},h3:{ariaLevel:3,metrics:"24px / 1.3333"},h4:{ariaLevel:4,metrics:"20px / 1.4"},body:{metrics:"14px / 1.5714"},caption:{metrics:"12px / 1.6667"}},h="单行省略:文字排印的参数敏感度决定复刻精度——同一行文本在 14px 主字号下,行高每偏差 0.1,整页的密度感都会漂移 Single-line ellipsis specimen 0123456789";function z({entryId:n,schema:p}){const i=f(n,p),[s,d]=t.useState(()=>i.get("level")),[r,x]=t.useState(()=>i.get("type")),[l,m]=t.useState(()=>i.get("ellipsis"));t.useEffect(()=>i.subscribe(()=>{d(i.get("level")),x(i.get("type")),m(i.get("ellipsis"))}),[i]);const o=c[s]??c.body;return e.jsxs(g,{entryId:n,schema:p,children:[e.jsxs("div",{className:"ty-scene",children:[e.jsx("div",{children:y.map(a=>e.jsxs("div",{className:"lad-row",children:[e.jsx("span",{className:"lad-chip",children:a.chip}),e.jsx("div",{className:`lad-sample lv-${a.level}`,children:"文字排印层级 Aa 0123"})]},a.level))}),e.jsxs("div",{className:"ty-spec","data-type":r,"data-ellipsis":l,children:[e.jsx("div",{className:`lv-${s}`,role:o.ariaLevel?"heading":void 0,"aria-level":o.ariaLevel,children:"标本标题 Specimen Title"}),e.jsx("p",{className:"ty-p",children:"正文承担长阅读:主字号 14px、行高 1.5714(≈22px),由自然指数曲线生成; 标题沿同一曲线取大档,层级靠字号、字重与颜色三通道同时表达。"}),e.jsx("p",{className:`ty-ell ${l==="on"?"ell-on":""}`,title:l==="on"?h:void 0,children:h})]}),e.jsxs("div",{className:"ty-readout","aria-live":"polite",children:["level=",s," (",o.metrics,") · type=",r," · ellipsis=",l]})]}),e.jsx("style",{children:v})]})}export{z as default};
