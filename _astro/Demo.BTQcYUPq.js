import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as u}from"./DemoStage.vW1CgYCd.js";const j=`
.em-scene { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px; }
.em-panel {
  position: relative;
  width: min(520px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.em-tablehead, .em-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 12px;
  padding: 10px 20px;
  font-size: 12px;
}
.em-tablehead {
  color: rgba(0, 0, 0, 0.45);
  background: rgba(15, 23, 42, 0.04);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}
.em-row { color: rgba(0, 0, 0, 0.73); border-bottom: 1px solid rgba(15, 23, 42, 0.05); }
.em-row:last-child { border-bottom: 0; }
.em-tablefoot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px 20px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.em-tablefoot i { font-style: normal; min-width: 20px; text-align: center; padding: 1px 4px; border-radius: 4px; background: rgba(15, 23, 42, 0.06); }
.em-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 32px;
  text-align: center;
  animation: em-in 0.4s ease-out both;
}
.em-panel[data-keep-table="on"] .em-card { padding: 24px 28px; }
.em-art { display: block; }
.em-title { margin: 0; font-size: 16px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.em-title small { font-weight: 400; font-size: 13px; color: rgba(0, 0, 0, 0.45); }
.em-desc { margin: 0; font-size: 13px; line-height: 1.6; color: rgba(0, 0, 0, 0.45); max-width: 300px; }
.em-btn {
  margin-top: 4px;
  border: 0;
  border-radius: 6px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: #fff;
  background: #2760d8;
}
.em-btn:hover { background: #1e4fb8; }
.em-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2;
}
@media (max-width: 480px) {
  .em-toolbar { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.em-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.em-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
@keyframes em-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .em-card { animation: none; }
}
`;function p(){return e.jsxs("svg",{className:"em-art",viewBox:"0 0 121 116",width:"121",height:"116","aria-hidden":"true",children:[e.jsx("rect",{x:"24",y:"14",width:"73",height:"56",rx:"6",fill:"#eef1f6"}),e.jsx("circle",{cx:"44",cy:"36",r:"9",fill:"#d9dfe8"}),e.jsx("rect",{x:"60",y:"28",width:"26",height:"5",rx:"2.5",fill:"#d9dfe8"}),e.jsx("rect",{x:"60",y:"38",width:"18",height:"5",rx:"2.5",fill:"#e4e9f0"}),e.jsx("rect",{x:"34",y:"80",width:"53",height:"6",rx:"3",fill:"#e4e9f0"}),e.jsx("rect",{x:"46",y:"92",width:"29",height:"6",rx:"3",fill:"#eef1f6"})]})}function x(){return e.jsxs("svg",{className:"em-art",viewBox:"0 0 55 35",width:"55",height:"35","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"4",width:"43",height:"21",rx:"4",fill:"#eef1f6"}),e.jsx("circle",{cx:"17",cy:"14",r:"4",fill:"#d9dfe8"}),e.jsx("rect",{x:"25",y:"10",width:"16",height:"3",rx:"1.5",fill:"#d9dfe8"}),e.jsx("rect",{x:"19",y:"29",width:"17",height:"3",rx:"1.5",fill:"#e4e9f0"})]})}const w=[{name:"会员增长看板 Growth dashboard",owner:"张晓",updated:"11-18"},{name:"风控规则配置 Risk rules",owner:"李成",updated:"11-19"},{name:"客服工单归档 Tickets",owner:"王岚",updated:"11-20"}];function S({entryId:i,schema:o}){const a=g(i,o),[n,m]=r.useState(()=>a.get("simple")),[d,h]=r.useState(()=>a.get("footerAction")),[l,b]=r.useState(!1),[s,f]=r.useState(!1);r.useEffect(()=>a.subscribe(()=>{m(a.get("simple")),h(a.get("footerAction"))}),[a]);const c=e.jsxs("div",{className:"em-tablehead",children:[e.jsx("span",{children:"名称 Name"}),e.jsx("span",{children:"负责人 Owner"}),e.jsx("span",{children:"更新 Updated"})]});return e.jsxs(u,{entryId:i,schema:o,children:[e.jsxs("div",{className:"em-scene",children:[e.jsx("div",{className:"em-panel","data-keep-table":s?"on":void 0,children:l?e.jsxs("div",{children:[c,w.map(t=>e.jsxs("div",{className:"em-row",children:[e.jsx("span",{children:t.name}),e.jsx("span",{children:t.owner}),e.jsx("span",{children:t.updated})]},t.name))]}):s?e.jsxs(e.Fragment,{children:[c,e.jsxs("div",{className:"em-card",role:"status",children:[n==="on"?e.jsx(x,{}):e.jsx(p,{}),e.jsxs("p",{className:"em-title",children:["暂无数据 ",e.jsx("small",{lang:"en",children:"No data"})]}),e.jsxs("p",{className:"em-desc",children:["建立第一条数据后,记录将展示在这里。"," ",e.jsx("span",{lang:"en",children:"Records will appear here once you add the first entry."})]}),d==="on"&&e.jsxs("button",{type:"button",className:"em-btn",children:["新建数据 ",e.jsx("span",{lang:"en",children:"Create Now"})]})]}),e.jsxs("div",{className:"em-tablefoot","aria-hidden":"true",children:[e.jsx("i",{children:"1"}),e.jsx("i",{children:"2"}),e.jsx("i",{children:"3"})]})]}):e.jsxs("div",{className:"em-card",role:"status",children:[n==="on"?e.jsx(x,{}):e.jsx(p,{}),e.jsxs("p",{className:"em-title",children:["暂无数据 ",e.jsx("small",{lang:"en",children:"No data"})]}),e.jsxs("p",{className:"em-desc",children:["建立第一条数据后,记录将展示在这里。"," ",e.jsx("span",{lang:"en",children:"Records will appear here once you add the first entry."})]}),d==="on"&&e.jsxs("button",{type:"button",className:"em-btn",children:["新建数据 ",e.jsx("span",{lang:"en",children:"Create Now"})]})]})}),e.jsxs("div",{className:"em-toolbar",role:"group","aria-label":"演示切换 Demo switches",children:[e.jsx("button",{type:"button","aria-pressed":l,title:"Sample data",onClick:()=>b(t=>!t),children:"示例数据"}),e.jsx("button",{type:"button","aria-pressed":s,title:"Keep table frame (anti-pattern)",onClick:()=>f(t=>!t),children:"保留表框(反例)"})]})]}),e.jsx("style",{children:j})]})}export{S as default};
