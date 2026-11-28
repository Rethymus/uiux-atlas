import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as v}from"./DemoStage.vW1CgYCd.js";const a=[{name:"林晚",hue:265},{name:"陈默",hue:210},{name:"王砚",hue:165},{name:"赵珂",hue:90},{name:"周叙",hue:40},{name:"苏叶",hue:330},{name:"郑宁",hue:15},{name:"何澈",hue:300}],g=`
.av-scene { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
/* 头像组:重叠 -8px(antd groupOverlapping = -marginXS,style/index.ts:220) */
.av-group { display: inline-flex; padding: 4px; animation: av-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
.av-item, .av-more {
  width: var(--av-size, 32px);
  height: var(--av-size, 32px);
  border-radius: 50%;
  border: 2px solid #fff; /* antd groupBorderColor = colorBorderBg */
  display: inline-flex; align-items: center; justify-content: center;
  font-size: calc(var(--av-size, 32px) * 0.4375); /* 字号 14 / 尺寸 32(antd textFontSize) */
  font-weight: 500;
  color: rgba(0, 0, 0, 0.88);
  flex: none;
}
.av-item + .av-item, .av-item + .av-more { margin-inline-start: -8px; }
.av-scene[data-shape="square"] .av-item, .av-scene[data-shape="square"] .av-more { border-radius: 6px; } /* antd seed borderRadius */
.av-more {
  background: #f5f5f5; /* antd colorBgLayout */
  color: rgba(0, 0, 0, 0.65);
  font-size: calc(var(--av-size, 32px) * 0.34);
  font-variant-numeric: tabular-nums;
}
.av-note { font-size: 11px; color: rgba(0, 0, 0, 0.45); text-align: center; }
.av-single { display: flex; gap: 14px; align-items: center; margin-top: 4px; }
.av-single .av-label { font-size: 12px; color: rgba(0, 0, 0, 0.65); }
@keyframes av-in { from { opacity: 0; translate: 0 8px; } to { opacity: 1; translate: 0 0; } }
@media (prefers-reduced-motion: reduce) { .av-group { animation: none; } }
`;function j({entryId:i,schema:l}){const n=u(i,l),[p,m]=o.useState(()=>n.get("shape")),[c,d]=o.useState(()=>n.get("groupCount"));o.useEffect(()=>n.subscribe(()=>{m(n.get("shape")),d(n.get("groupCount"))}),[n]);const r=a.slice(0,c),t=a.length-c;return e.jsxs(v,{entryId:i,schema:l,children:[e.jsxs("div",{className:"av-scene","data-shape":p,children:[e.jsxs("div",{className:"av-group",role:"group","aria-label":`项目成员共 ${a.length} 人,当前展示 ${r.length} 位:${r.map(s=>s.name).join("、")}${t>0?`,另有 ${t} 人折叠`:""}`,children:[r.map(s=>e.jsx("span",{className:"av-item",title:s.name,style:{background:`oklch(0.85 0.09 ${s.hue})`},children:s.name[0]},s.name)),t>0&&e.jsxs("span",{className:"av-more",title:`还有 ${t} 位成员`,children:["+",t]})]}),e.jsxs("div",{className:"av-single",children:[e.jsx("span",{className:"av-item",style:{background:`oklch(0.85 0.09 ${a[0].hue})`},"aria-hidden":"true",children:a[0].name[0]}),e.jsxs("span",{className:"av-label",children:["独立头像同尺寸:",a[0].name," / Standalone avatar, same size"]})]}),e.jsxs("div",{className:"av-note",children:["组内重叠固定 -8px · 溢出折叠 +",t," / overlap −8px · overflow +N — 共 ",a.length," 人"]})]}),e.jsx("style",{children:g})]})}export{j as default};
