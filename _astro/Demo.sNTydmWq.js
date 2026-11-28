import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as j}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const y=`
.icb-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
}
.icb-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 72px;
  padding: 6px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #fff;
}
.icb-btn {
  position: relative;
  box-sizing: content-box;
  width: var(--icb-target, 48px);
  height: var(--icb-target, 48px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(15, 23, 42, 0.18);
  border-radius: 10px;
  background: #fff;
  color: rgba(15, 23, 42, 0.78);
  cursor: pointer;
  padding: 0;
}
.icb-btn:hover { background: rgba(15, 23, 42, 0.05); }
.icb-btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.icb-btn svg { width: var(--icb-icon, 24px); height: var(--icb-icon, 24px); pointer-events: none; }
/* 伪元素扩热区:视觉不变,::before 以负 inset 越过可视边界 */
.icb-btn[data-expand="pseudo"] {
  width: calc(var(--icb-icon, 24px) + 16px);
  height: calc(var(--icb-icon, 24px) + 16px);
}
.icb-btn[data-expand="pseudo"]::before {
  content: "";
  position: absolute;
  inset: calc((var(--icb-target, 48px) - 100%) / -2);
  border-radius: inherit;
}
/* 命中区审计框:与按钮同心的虚线方块 = 实际可点区 */
.icb-hit {
  position: absolute;
  width: var(--icb-target, 48px);
  height: var(--icb-target, 48px);
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border: 1.5px dashed rgba(37, 99, 235, 0.65);
  border-radius: 10px;
  pointer-events: none;
}
.icb-hit[data-ok="false"] { border-color: rgba(220, 38, 38, 0.75); }
.icb-ref {
  position: relative;
  width: min(520px, 100%);
  height: 26px;
  pointer-events: none;
}
.icb-ref span {
  position: absolute;
  left: 50%;
  top: 0;
  height: 26px;
  border-inline: 1px solid rgba(15, 23, 42, 0.22);
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  color: rgba(15, 23, 42, 0.45);
  padding-inline: 4px;
}
.icb-ref .icb-ref-24 { width: 24px; translate: -50% 0; }
.icb-ref .icb-ref-48 { width: 48px; translate: -50% 0; border-inline-color: rgba(37, 99, 235, 0.4); color: rgba(37, 99, 235, 0.7); }
.icb-panel {
  width: min(520px, 100%);
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: #f8fafc;
  padding: 10px 14px;
}
.icb-panel h4 { margin: 0 0 6px; font-size: 12px; font-weight: 650; color: rgba(15, 23, 42, 0.7); }
.icb-name {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.78);
  background: #fff;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  border-radius: 8px;
  padding: 7px 10px;
  margin: 0 0 8px;
  min-height: 34px;
}
.icb-verdict { margin: 0; font-size: 12px; line-height: 1.65; }
.icb-verdict b { font-weight: 600; }
.icb-ok { color: #15803d; }
.icb-warn { color: #a16207; }
.icb-bad { color: #c2410c; }
.icb-log {
  margin: 8px 0 0;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.55);
  min-height: 18px;
}
.icb-note { font-size: 11px; line-height: 1.7; color: rgba(15, 23, 42, 0.45); max-width: 520px; text-align: center; margin: 0; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .icb-btn, .icb-hit { transition: none; }
}
`;function k(){return e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:[e.jsx("circle",{cx:"11",cy:"11",r:"6"}),e.jsx("path",{d:"M16 16l3 3"})]})}function N(){return e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18"})})}function S(o,s){switch(o){case"labelledby":return{announce:"「搜索,切换按钮,已按下」(名来自 hidden 文本,ARIA 允许引用 hidden 元素)",verdict:"推荐方案② — 名在 DOM 里:可被整页翻译、可复制,读屏一致性好",tone:"ok"};case"hidden-text":return{announce:"「搜索,切换按钮,已按下」(名来自视觉隐藏的真实文本)",verdict:"推荐方案① — 真实文本是最稳的原生机制,无 ARIA 也能兜底",tone:"ok"};case"aria-label":return{announce:"「搜索,切换按钮,已按下」(名来自按钮 aria-label)",verdict:"方案③ 可用但有四缺点 — 不进 DOM、整页翻译工具无法处理、部分语音控制识别困难、不可复制",tone:"warn"};case"svg-only":return{announce:"「切换按钮」或偶发「搜索」(依读屏器/浏览器组合而异)",verdict:"失败 — 名只放 SVG 上:Scott O'Hara 跨浏览器/读屏矩阵存在大量失败组合",tone:"bad"};default:return{announce:"「切换按钮」(无任何名称信息)",verdict:"失败 — 纯图标按钮无可访问名,读屏只播「按钮」,信息全失",tone:"bad"}}}function B({entryId:o,schema:s}){const n=j(o,s),[i,x]=a.useState(()=>n.get("naming")),[d,h]=a.useState(()=>n.get("expand")),[u,g]=a.useState(!1),[f,b]=a.useState("等待交互…(试试 Tab 聚焦后按 Enter / Space)"),r=a.useRef(null);a.useEffect(()=>n.subscribe(()=>{x(n.get("naming")),h(n.get("expand"))}),[n]),a.useEffect(()=>()=>{r.current!==null&&window.clearTimeout(r.current)},[]);const c=t=>{b(t),r.current!==null&&window.clearTimeout(r.current),r.current=window.setTimeout(()=>b("等待交互…(试试 Tab 聚焦后按 Enter / Space)"),4e3)},l=S(i),p=n.get("hitTarget")>=24,m=(()=>{switch(i){case"labelledby":return{"aria-labelledby":"icb-search-name","aria-label":void 0};case"hidden-text":return{"aria-label":void 0};case"aria-label":return{"aria-label":"搜索","aria-labelledby":void 0};case"svg-only":return{"aria-label":void 0,"aria-labelledby":void 0};default:return{"aria-label":void 0,"aria-labelledby":void 0}}})(),v=e.jsxs("button",{type:"button",className:"icb-btn","data-expand":d,"aria-pressed":u,...m,onClick:()=>{g(t=>!t),c("click → 搜索切换")},onKeyDown:t=>{t.key==="Enter"&&c("Enter → 激活(APG Button)"),t.key===" "&&c("Space → 激活(APG Button)")},children:[e.jsx(k,{}),i==="labelledby"&&e.jsx("span",{id:"icb-search-name",hidden:!0,children:"搜索"}),i==="hidden-text"&&e.jsx("span",{className:"visually-hidden",children:"搜索"}),e.jsx("span",{className:"icb-hit","data-ok":p})]});return e.jsx(w,{entryId:o,schema:s,children:e.jsxs("div",{className:"icb-scene",children:[e.jsxs("div",{className:"icb-toolbar",role:"group","aria-label":"图标按钮演示工具栏",children:[v,e.jsxs("button",{type:"button",className:"icb-btn","data-expand":d,"aria-label":"关闭",onClick:()=>c("click → 关闭(aria-label 命名)"),children:[e.jsx(N,{}),e.jsx("span",{className:"icb-hit","data-ok":p})]})]}),e.jsxs("div",{className:"icb-ref","aria-hidden":"true",children:[e.jsx("span",{className:"icb-ref-24",children:"24"}),e.jsx("span",{className:"icb-ref-48",children:"48"})]}),e.jsxs("div",{className:"icb-panel",children:[e.jsxs("h4",{children:["可访问名审计(",i==="labelledby"?"hidden + aria-labelledby":i==="hidden-text"?"视觉隐藏文本":i==="aria-label"?"aria-label":i==="svg-only"?"名只在 SVG 上":"无名",")"]}),e.jsxs("p",{className:"icb-name","aria-live":"polite",children:["读屏播报模拟:",l.announce]}),e.jsxs("p",{className:`icb-verdict icb-${l.tone}`,children:[e.jsx("b",{children:"判定:"}),l.verdict]}),e.jsx("p",{className:"icb-log",children:f})]}),e.jsx("p",{className:"icb-note",children:"虚线审计框 = 实际命中区(≥24px 蓝 / <24px 红;参照 WCAG 2.5.8,生产参照 M3 48dp)。 原生 <button> 自带 APG Button 模式的 Enter/Space 激活——键盘与鼠标行为完全一致;伪元素档的命中区越过可视边界,注意与相邻按钮重叠。 播报为规则推演,实际读屏器输出有差异。"}),e.jsx("style",{children:y})]})})}export{B as default};
