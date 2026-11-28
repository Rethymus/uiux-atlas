import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as f}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const j=`
.cs-scene {
  position: absolute;
  inset: 0;
  display: flex;
  gap: 14px;
  padding: 16px;
}
.cs-scroll {
  flex: 1;
  min-width: 0;
  overflow: auto;
  scrollbar-gutter: var(--sb-gutter, auto);
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 4%, transparent);
  padding: 6px 0;
  animation: cs-in 0.4s ease-out both;
}
.cs-scroll:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
/* standard 档:标准属性(css-scrollbars)。scrollbar-width ≠ auto 时 webkit 伪元素被浏览器忽略(互操作事实) */
.cs-scene[data-engine="standard"] .cs-scroll {
  scrollbar-width: var(--sb-width, thin);
  scrollbar-color: var(--sb-thumb, #6a5cff) var(--sb-track, transparent);
}
/* webkit 档:不写标准属性(computed 保持 auto),激活 ::-webkit-scrollbar 家族 */
.cs-scene[data-engine="webkit"] .cs-scroll::-webkit-scrollbar { width: 12px; height: 12px; }
.cs-scene[data-engine="webkit"] .cs-scroll::-webkit-scrollbar-thumb {
  background: var(--sb-thumb, #6a5cff);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
}
.cs-scene[data-engine="webkit"] .cs-scroll::-webkit-scrollbar-track { background: var(--sb-track, transparent); }
.cs-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 7px 14px;
  font-size: 13px;
  line-height: 1.5;
}
.cs-row b { font-variant-numeric: tabular-nums; opacity: 0.45; font-weight: 500; min-width: 2.2em; }
.cs-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cs-side { flex: none; width: 240px; display: flex; flex-direction: column; gap: 10px; }
.cs-readout {
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
  background: color-mix(in srgb, currentColor 6%, transparent);
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
}
.cs-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.cs-warning {
  font-size: 12px;
  line-height: 1.6;
  border: 1px solid oklch(0.7 0.15 60 / 0.5);
  background: color-mix(in srgb, oklch(0.7 0.15 60) 14%, transparent);
  border-radius: 8px;
  padding: 8px 10px;
}
.cs-hint { font-size: 11px; opacity: 0.55; margin: 0; line-height: 1.6; }
@keyframes cs-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (max-width: 640px) {
  .cs-scene { flex-direction: column; }
  .cs-side { width: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .cs-scroll { animation: none; }
}
`,k=Array.from({length:36},(i,t)=>{const e=t+1,n=["对齐基线核对","滚动锚定生效","容器查询断点触发","间距 token 校验","字阶步进落位","吸顶阈值检测"];return{n:e,text:`${n[t%n.length]} · 条目 ${String(e).padStart(2,"0")} 的长内容行,拖动滚动条观察滑块与轨道配色`}});function N({entryId:i,schema:t}){const e=f(i,t),[n,x]=s.useState(()=>e.get("engine")),[c,p]=s.useState(()=>e.get("width")),[l,h]=s.useState(()=>e.get("thumb")),[g,u]=s.useState(()=>e.get("track")),[d,b]=s.useState(()=>e.get("gutter")),[o,m]=s.useState({width:!1,color:!1,gutter:!1});return s.useEffect(()=>e.subscribe(()=>{x(e.get("engine")),p(e.get("width")),h(e.get("thumb")),u(e.get("track")),b(e.get("gutter"))}),[e]),s.useEffect(()=>{m({width:typeof CSS<"u"&&!!CSS.supports?.("scrollbar-width","thin"),color:typeof CSS<"u"&&!!CSS.supports?.("scrollbar-color","red blue"),gutter:typeof CSS<"u"&&!!CSS.supports?.("scrollbar-gutter","stable")})},[]),r.jsxs(w,{entryId:i,schema:t,children:[r.jsxs("div",{className:"cs-scene","data-engine":n,children:[r.jsx("div",{className:"cs-scroll",role:"region","aria-label":"滚动演示列表 Scroll demo list",tabIndex:0,children:k.map(a=>r.jsxs("div",{className:"cs-row",children:[r.jsx("b",{children:String(a.n).padStart(2,"0")}),r.jsx("span",{children:a.text})]},a.n))}),r.jsxs("div",{className:"cs-side",children:[n==="standard"?r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"cs-readout",children:[r.jsxs("div",{children:["engine = ",r.jsx("strong",{children:"standard"}),"(scrollbar-width + scrollbar-color)"]}),r.jsxs("div",{children:["scrollbar-width = ",r.jsx("strong",{children:c})]}),r.jsxs("div",{children:["scrollbar-color = ",r.jsx("strong",{children:l})," / ",r.jsx("strong",{children:g}),"(滑块 / 轨道)"]}),r.jsxs("div",{children:["scrollbar-gutter = ",r.jsx("strong",{children:d})]}),r.jsxs("div",{children:["本引擎支持检测:width ",r.jsx("strong",{children:o.width?"✓":"✗"})," / color ",r.jsx("strong",{children:o.color?"✓":"✗"})," / gutter ",r.jsx("strong",{children:o.gutter?"✓":"✗"})]})]}),c==="none"&&r.jsx("div",{className:"cs-warning",role:"alert",children:"MDN 警告:none 影响可及性/WCAG 2.1.1 键盘滚动——滚动条是「这里能滚」的操作暗示,慎用。"}),!o.color&&r.jsx("div",{className:"cs-warning",role:"alert",children:"本引擎不支持标准配色属性(如 Safari < 26.2,BCD),standard 档外观不会变化——切 webkit 档或升级引擎。"})]}):r.jsxs("div",{className:"cs-readout",children:[r.jsxs("div",{children:["engine = ",r.jsx("strong",{children:"webkit"}),"(::-webkit-scrollbar 伪元素)"]}),r.jsxs("div",{children:["滑块 ",r.jsx("strong",{children:l})," · 宽度固定 12px(演示基准值,未证实)"]}),r.jsx("div",{children:"互操作:本档不写 scrollbar-width,computed 保持 auto 才能激活伪元素"}),r.jsxs("div",{children:["Firefox 不实现 webkit 伪元素——本档在 Firefox 无效果;scrollbar-gutter 仍生效(",r.jsx("strong",{children:d}),")"]})]}),r.jsx("p",{className:"cs-hint",children:"两档声明同时写在样式表里,靠「scrollbar-width ≠ auto 时 webkit 全家被忽略」的互操作事实自然分流(调研 10§8.3); gutter=stable 时右侧即使内容不溢出也留槽。滚动区已设 tabindex=0,键盘方向键可滚动。"})]})]}),r.jsx("style",{children:j})]})}export{N as default};
