import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as h}from"./color.DuEPkvq5.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const f=`
.lp-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  overflow: auto;
}
.lp-cards {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  align-content: start;
}
.lp-card {
  position: relative;
  border: 1px solid color-mix(in srgb, currentColor 24%, transparent);
  background: color-mix(in srgb, currentColor 5%, transparent);
  animation: lp-in 0.4s ease-out both;
}
/* 物理卡:同数值的物理方向声明——dir 翻转后纹丝不动 */
.lp-card--physical {
  padding-top: var(--lp-pad-block, 16px);
  padding-bottom: var(--lp-pad-block, 16px);
  padding-left: var(--lp-pad-inline, 24px);
  padding-right: var(--lp-pad-inline, 24px);
  border-top-left-radius: var(--lp-radius, 12px);
}
/* 逻辑卡:一套声明,dir/writing-mode 变了自动翻 */
.lp-card--logical {
  padding-block: var(--lp-pad-block, 16px);
  padding-inline: var(--lp-pad-inline, 24px);
  border-start-start-radius: var(--lp-radius, 12px);
}
.lp-card h4 { margin: 0 0 6px; font-size: 14px; }
.lp-card .lp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 1.5;
}
.lp-avatar {
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.66 0.15 300));
}
.lp-action {
  margin-inline-start: auto;   /* 推到「行末侧」而非右侧(调研 12§2 片段) */
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 7px;
  padding: 3px 10px;
  font-size: 11px;
  cursor: pointer;
  background: color-mix(in srgb, currentColor 8%, transparent);
  color: inherit;
  white-space: nowrap;
}
.lp-tag {
  display: inline-block;
  margin-block-start: 8px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, oklch(0.62 0.15 250) 18%, transparent);
}
.lp-tag--start { background: color-mix(in srgb, oklch(0.62 0.15 160) 20%, transparent); }
.lp-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  opacity: 0.85;
}
.lp-readout strong { font-weight: 650; color: oklch(0.62 0.15 250); }
.lp-hint { font-size: 11px; opacity: 0.55; margin: 0; }
@keyframes lp-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .lp-card { animation: none; }
}
`;function k({entryId:l,schema:s}){const e=h(l,s),[t,d]=a.useState(()=>e.get("dir")),[c,x]=a.useState(()=>e.get("padInline")),[p,g]=a.useState({physLeft:"…",physInlineStart:"…",logicalInlineStart:"…"}),n=a.useRef(null),i=a.useRef(null);return a.useEffect(()=>e.subscribe(()=>{d(e.get("dir")),x(e.get("padInline"))}),[e]),a.useEffect(()=>{const o=n.current?getComputedStyle(n.current):null,u=i.current?getComputedStyle(i.current):null;g({physLeft:o?.getPropertyValue("padding-left")??"…",physInlineStart:o?.getPropertyValue("padding-inline-start")??"…",logicalInlineStart:u?.getPropertyValue("padding-inline-start")??"…"})},[t,c]),r.jsxs(m,{entryId:l,schema:s,children:[r.jsxs("div",{className:"lp-scene",dir:t,children:[r.jsxs("div",{className:"lp-cards",children:[r.jsxs("div",{className:"lp-card lp-card--physical",ref:n,children:[r.jsx("h4",{children:"物理属性卡 Physical"}),r.jsxs("div",{className:"lp-row",children:[r.jsx("span",{className:"lp-avatar","aria-hidden":"true",children:"陈"}),r.jsx("span",{children:"padding-left / border-top-left-radius"}),r.jsx("button",{type:"button",className:"lp-action",children:"操作"})]}),r.jsx("span",{className:"lp-tag",children:"dir 翻转后:不跟随"})]}),r.jsxs("div",{className:"lp-card lp-card--logical",ref:i,children:[r.jsx("h4",{children:"逻辑属性卡 Logical"}),r.jsxs("div",{className:"lp-row",children:[r.jsx("span",{className:"lp-avatar","aria-hidden":"true",children:"林"}),r.jsx("span",{children:"padding-inline / border-start-start-radius"}),r.jsx("button",{type:"button",className:"lp-action",children:"操作"})]}),r.jsx("span",{className:"lp-tag lp-tag--start",children:"dir 翻转后:行首侧整体镜像"})]})]}),r.jsxs("p",{className:"lp-readout",children:[r.jsxs("span",{children:["dir = ",r.jsx("strong",{children:t})]}),r.jsxs("span",{children:["物理卡 padding-left = ",r.jsx("strong",{children:p.physLeft})]}),r.jsxs("span",{children:["逻辑卡 padding-inline-start = ",r.jsx("strong",{children:p.logicalInlineStart}),"(getComputedStyle 实测)"]})]}),r.jsx("p",{className:"lp-hint",children:"两卡数值完全相同(默认 24px/16px/12px,出自调研 12§2 片段);RTL 档下逻辑卡的行首内边距与起角翻到另一侧, 「操作」按钮也被 margin-inline-start: auto 推到对侧——物理卡全部原地不动。"})]}),r.jsx("style",{children:f})]})}export{k as default};
