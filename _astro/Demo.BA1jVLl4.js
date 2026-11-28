import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as k}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const N=[{id:"light",zh:"浅色",en:"Light"},{id:"dark",zh:"深色",en:"Dark"}],g={atlas:"UIUX Atlas",internal:"内部资料 · 请勿外传",user:"张晓 · 工号 10086"},u=120,h=64,z=`
.wm-scene { position: absolute; inset: 0; display: grid; place-items: center; padding: 28px; overflow: hidden; }
.wm-card {
  position: relative;
  z-index: 1;
  width: min(560px, 100%);
  max-height: 100%;
  overflow: auto;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  color: #1b2437;
  animation: wm-in 0.4s ease-out both;
}
.wm-scene[data-scene="dark"] .wm-card {
  background: #23262e;
  border-color: rgba(255, 255, 255, 0.14);
  color: #e8ebf2;
}
.wm-card h3 { margin: 0 0 10px; font-size: 17px; font-weight: 650; }
.wm-card p { margin: 0 0 12px; font-size: 13px; line-height: 1.7; opacity: 0.85; }
.wm-stats { display: flex; gap: 10px; margin: 16px 0; }
.wm-stat {
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.05);
  text-align: center;
}
.wm-scene[data-scene="dark"] .wm-stat { background: rgba(255, 255, 255, 0.07); }
.wm-stat b { display: block; font-size: 20px; font-weight: 650; }
.wm-stat span { font-size: 11px; opacity: 0.7; }
/* 水印层:CSS/DOM 瓦片方案(参数经 --wm-* CSS 变量实时驱动) */
.wm-layer {
  position: absolute;
  inset: 0;
  z-index: 9;
  opacity: var(--wm-opacity);
  pointer-events: none;
  overflow: hidden;
}
.wm-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, ${u}px);
  grid-auto-rows: ${h}px;
  column-gap: var(--wm-gap);
  row-gap: var(--wm-gap);
  align-content: start;
  justify-content: start;
}
.wm-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(var(--wm-rotate));
  font: 400 16px sans-serif;
  white-space: nowrap;
  color: #000;
}
.wm-scene[data-scene="dark"] .wm-tile { color: #fff; }
.wm-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  z-index: 10;
}
@media (max-width: 480px) {
  .wm-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.wm-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.wm-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@keyframes wm-in {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .wm-card { animation: none; }
}
`;function O({entryId:c,schema:d}){const a=k(c,d),[w,b]=s.useState(()=>a.get("content")),[l,f]=s.useState("light"),n=s.useRef(null),[p,j]=s.useState({cols:6,rows:4}),r=s.useCallback(()=>{const t=n.current;if(!t)return;const o=a.get("gap"),m=Math.ceil(t.clientWidth/(u+o))+1,x=Math.ceil(t.clientHeight/(h+o))+1;j(i=>i.cols===m&&i.rows===x?i:{cols:m,rows:x})},[a]);s.useEffect(()=>{r();const t=new ResizeObserver(r);return n.current&&t.observe(n.current),()=>t.disconnect()},[r]),s.useEffect(()=>a.subscribe(()=>{b(a.get("content")),r()}),[a,r]);const y=Array.from({length:p.cols*p.rows},(t,o)=>o),v=g[w]??g.atlas;return e.jsxs(S,{entryId:c,schema:d,children:[e.jsxs("div",{className:"wm-scene","data-scene":l,ref:n,children:[e.jsxs("div",{className:"wm-card",children:[e.jsxs("h3",{children:["Q4 设计系统巡检报告 ",e.jsx("span",{lang:"en",children:"Design System Audit"})]}),e.jsxs("p",{children:["本报告面向设计与工程团队,覆盖组件覆盖率、对比度达标率与 token 治理三项指标;外发前请确认已接入访问者水印。"," ",e.jsx("span",{lang:"en",children:"Distributed to design & engineering; confirm the visitor watermark is attached before sharing."})]}),e.jsxs("div",{className:"wm-stats",children:[e.jsxs("div",{className:"wm-stat",children:[e.jsx("b",{children:"92%"}),e.jsx("span",{children:"组件覆盖 Coverage"})]}),e.jsxs("div",{className:"wm-stat",children:[e.jsx("b",{children:"100%"}),e.jsx("span",{children:"对比度达标 Contrast pass"})]}),e.jsxs("div",{className:"wm-stat",children:[e.jsx("b",{children:"3"}),e.jsx("span",{children:"待整改项 Open issues"})]})]}),e.jsxs("p",{children:["水印仅为威慑与溯源手段,不能替代权限控制;密文数据的分发仍需走审批流。"," ",e.jsx("span",{lang:"en",children:"Watermarks deter and trace — they do not replace access control."})]})]}),e.jsx("div",{className:"wm-layer","aria-hidden":"true",children:e.jsx("div",{className:"wm-grid",children:y.map(t=>e.jsx("span",{className:"wm-tile",children:v},t))})}),e.jsx("div",{className:"wm-toolbar",role:"group","aria-label":"场景切换 Scene switcher",children:N.map(t=>e.jsx("button",{type:"button","aria-pressed":l===t.id,title:t.en,onClick:()=>f(t.id),children:t.zh},t.id))})]}),e.jsx("style",{children:z})]})}export{O as default};
