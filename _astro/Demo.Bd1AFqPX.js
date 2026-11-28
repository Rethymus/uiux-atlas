import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as c}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const h=`
.fp-stage { padding: 12px; }
.fp-toolbar { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 10px; }
.fp-toolbar button { border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: transparent; color: inherit; border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer; }
.fp-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, oklch(0.55 0.15 260) 60%, transparent); color: #fff;
  border-color: transparent; }
.fp-card {
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 10px; padding: 20px 22px;
}
.fp-kicker { margin: 0 0 10px; font-size: 11px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.62; }
.fp-h2 { margin: 0 0 12px; font-size: var(--fp-head-size); line-height: 1.15;
  font-weight: var(--fp-head-weight); letter-spacing: -0.01em; }
.fp-lead { margin: 0 0 12px; font-size: 15px; line-height: 1.6; font-weight: 500; }
.fp-body { margin: 0 0 12px; font-size: 14px; line-height: 1.7; max-width: 56ch; }
.fp-quote { margin: 0 0 12px; padding-inline-start: 14px;
  border-inline-start: 3px solid color-mix(in srgb, currentColor 30%, transparent);
  font-size: 15px; line-height: 1.6; opacity: 0.85; }
.fp-caption { margin: 0; font-size: 12px; opacity: 0.6; }
/* 衬线栈:零第三方依赖,泛型收尾;中文落宋体一类系统衬线,因平台而异 */
.fp-stage[data-pairing="serif-head"] .fp-h2,
.fp-stage[data-pairing="serif-head"] .fp-quote { font-family: Georgia, "Times New Roman", "Songti SC", SimSun, serif; }
.fp-stage[data-pairing="sans-head"] .fp-body,
.fp-stage[data-pairing="sans-head"] .fp-quote { font-family: Georgia, "Times New Roman", "Songti SC", SimSun, serif; }
/* 单字族:全部继承站点无衬线,层级只动字重/字号/色彩(Apple HIG 原则) */
.fp-stage[data-pairing="single"] .fp-h2 { font-family: inherit; }
.fp-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  margin-block-end: 10px; }
.fp-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 4px; }
`,x=[{id:"serif-head",zh:"衬线标题 × 无衬线正文",en:"Serif head × sans body"},{id:"sans-head",zh:"无衬线标题 × 衬线正文",en:"Sans head × serif body"},{id:"single",zh:"单字族多字重",en:"Single family"}];function j({entryId:s,schema:n}){const a=c(s,n),[m,p]=t.useState(0),[r,d]=t.useState(()=>a.get("pairing"));t.useEffect(()=>a.subscribe(()=>{d(a.get("pairing")),p(i=>i+1)}),[a]);const o=a.get("headingSize"),l=a.get("headingWeight"),g=r==="single"?"单字族:Inter Variable,层级只动字号/字重(Apple HIG 一字族原则,已核)":r==="sans-head"?"无衬线标题 × 衬线正文(杂志正文路线,系统衬线栈)":"衬线标题 × 无衬线正文(经典对比路线,系统衬线栈)";return e.jsxs(f,{entryId:s,schema:n,children:[e.jsxs("div",{className:"fp-stage","data-pairing":r,children:[e.jsx("div",{className:"fp-toolbar",role:"group","aria-label":"搭配策略 Pairing strategy",children:x.map(i=>e.jsx("button",{type:"button","aria-pressed":r===i.id,title:i.en,onClick:()=>a.set("pairing",i.id),children:i.zh},i.id))}),e.jsxs("div",{className:"fp-badges",children:[e.jsx("span",{className:"fp-badge",children:g}),e.jsxs("span",{className:"fp-badge",children:["标题 ",o,"px / wght ",l," · 字号比 ",(o/14).toFixed(1),"×"]}),e.jsx("span",{className:"fp-badge",children:"回退栈 Georgia → 宋体 → serif(泛型收尾)"})]}),e.jsxs("article",{className:"fp-card",children:[e.jsx("p",{className:"fp-kicker",children:"Typography · 搭配研究"}),e.jsx("h2",{className:"fp-h2",children:"两种声音,一个层次 / Two voices, one hierarchy"}),e.jsx("p",{className:"fp-lead",children:"搭配不是选两枚「好看」的字体,而是给页面分派两个声音:一个负责调性,一个负责阅读。"}),e.jsx("p",{className:"fp-body",children:"The classic contract assigns the serif to display and the sans to reading — or the reverse, as magazines have done for a century. What matters is that the two voices differ enough to be told apart at a glance, and that hierarchy never rests on the family alone: size, weight and color carry it together (Apple HIG, verified). 搭配方法论细则属社区实践共识(Google Fonts Knowledge 正文未能核验,如实标注)。"}),e.jsx("blockquote",{className:"fp-quote",children:"「Minimize the number of typefaces you use.」—— Apple HIG Typography:全站一个字族, 层级只动 size / weight / color。单字族策略即由此而来。"}),e.jsx("p",{className:"fp-caption",children:"演示用系统衬线栈,零第三方依赖;可变字重由本站 Inter Variable(wght 100–900)真实驱动。"})]})]}),e.jsx("style",{children:h})]})}export{j as default};
