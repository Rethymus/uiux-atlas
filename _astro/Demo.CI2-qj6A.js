import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as v}from"./color.DuEPkvq5.js";import{D as j}from"./DemoStage.vW1CgYCd.js";const k=`
.aa-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.aa-live { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center; }
.aa-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgba(15, 23, 42, 0.2);
  background: #fff;
  border-radius: 9px;
  padding: 8px 14px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
}
.aa-btn:hover { background: rgba(15, 23, 42, 0.05); }
.aa-btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.aa-btn svg { color: rgba(0, 0, 0, 0.65); flex: none; }
.aa-panel {
  width: min(480px, 100%);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #f8fafc;
  padding: 12px 14px;
}
.aa-panel h4 { margin: 0 0 6px; font-size: 13px; font-weight: 600; color: rgba(0, 0, 0, 0.7); }
.aa-utter {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.75);
  background: #fff;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  border-radius: 8px;
  padding: 8px 10px;
  margin: 0 0 8px;
  min-height: 38px;
}
.aa-verdict { font-size: 12px; margin: 0; }
.aa-verdict b { font-weight: 600; }
.aa-ok { color: #15803d; }
.aa-bad { color: #c2410c; }
.aa-warn { color: #a16207; }
.aa-table { border-collapse: collapse; width: min(480px, 100%); font-size: 12px; }
.aa-table th, .aa-table td {
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 6px 8px;
  text-align: left;
  vertical-align: top;
}
.aa-table th { background: rgba(15, 23, 42, 0.04); font-weight: 600; }
.aa-table tr[data-active="true"] { background: rgba(37, 99, 235, 0.08); }
.aa-note { font-size: 12px; line-height: 1.7; color: rgba(0, 0, 0, 0.45); max-width: 480px; text-align: center; }
`;function w({hidden:a}){return e.jsx("svg",{viewBox:"0 0 24 24",width:18,height:18,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":a||void 0,children:e.jsx("path",{d:"M12 3.6l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8-5.3-2.8-5.3 2.8 1.1-5.8L3.5 9.7l5.9-.7z"})})}function N({hidden:a}){return e.jsxs("svg",{viewBox:"0 0 24 24",width:18,height:18,fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":a||void 0,children:[e.jsx("path",{d:"M18.2 9.2a6.2 6.2 0 0 0-12.4 0c0 5.6-2.3 7-2.3 7h17c0 0-2.3-1.4-2.3-7z"}),e.jsx("path",{d:"M10.4 19.8a1.9 1.9 0 0 0 3.2 0"})]})}function c(a,r){return a&&r?{utter:"「收藏,按钮」",verdict:"推荐 — 图标摘树,按钮播报可访问名(MDN 官方分工)",tone:"ok"}:a&&!r?{utter:"「按钮」",verdict:"失败 — 图标摘除后按钮无可访问名,信息全失",tone:"bad"}:!a&&r?{utter:"「收藏,按钮」(图形可能被额外播报或完全跳过,因读屏器实现而异)",verdict:"可用但冗余 — 未摘除的图形贡献不确定,优先装饰化",tone:"warn"}:{utter:"「按钮」(缺 alt 的 <img> 场景读屏还会朗读文件名/URL)",verdict:"失败 — 无可访问名且图形无等价文本",tone:"bad"}}const y=[{decorative:!0,label:!0},{decorative:!0,label:!1},{decorative:!1,label:!0},{decorative:!1,label:!1}];function M({entryId:a,schema:r}){const i=v(a,r),[x,p]=s.useState(()=>i.get("decorative")),[h,b]=s.useState(()=>i.get("label")),[u,g]=s.useState(!1);s.useEffect(()=>i.subscribe(()=>{p(i.get("decorative")),b(i.get("label"))}),[i]);const n=x==="on",o=h==="with",l=c(n,o),f=o?"收藏":"(空)";return e.jsx(j,{entryId:a,schema:r,children:e.jsxs("div",{className:"aa-scene",children:[e.jsxs("div",{className:"aa-live",children:[e.jsx("button",{type:"button",className:"aa-btn","aria-label":o?"收藏":void 0,"aria-pressed":u,onClick:()=>g(t=>!t),children:e.jsx(w,{hidden:n})}),e.jsxs("button",{type:"button",className:"aa-btn",children:[e.jsx(N,{hidden:n}),"通知"]})]}),e.jsxs("div",{className:"aa-panel",children:[e.jsx("h4",{children:"读屏播报模拟(按 W3C/MDN 规则推演)"}),e.jsxs("p",{className:"aa-utter","aria-live":"polite",children:["icon-only 按钮:",l.utter,e.jsx("br",{}),"可访问名计算结果:",f]}),e.jsxs("p",{className:`aa-verdict aa-${l.tone}`,children:[e.jsxs("b",{children:[n?"aria-hidden":"无 aria-hidden"," × ",o?"有名":"无名",":"]}),l.verdict]})]}),e.jsxs("table",{className:"aa-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"组合"}),e.jsx("th",{scope:"col",children:"播报"}),e.jsx("th",{scope:"col",children:"判定"})]})}),e.jsx("tbody",{children:y.map(t=>{const d=c(t.decorative,t.label),m=t.decorative===n&&t.label===o;return e.jsxs("tr",{"data-active":m,children:[e.jsxs("td",{children:[t.decorative?"aria-hidden":"无 aria-hidden"," × ",t.label?"有名":"无名"]}),e.jsx("td",{children:d.utter}),e.jsx("td",{className:`aa-${d.tone}`,children:d.verdict.split(" — ")[0]})]},`${t.decorative}-${t.label}`)})})]}),e.jsx("p",{className:"aa-note",children:"图标+文字按钮(通知):图标始终可装饰化,可见文字「通知」就是可访问名——这是 MDN 官方示例的分工。 模拟基于规则推演,实际读屏器对无 title 内联 SVG 的播报存在实现差异。"}),e.jsx("style",{children:k})]})})}export{M as default};
