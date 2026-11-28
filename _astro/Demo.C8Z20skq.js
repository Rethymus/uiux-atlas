import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{m as d}from"./react.B-ZMyTXB.js";import{g as f}from"./color.DuEPkvq5.js";import{D as b}from"./DemoStage.vW1CgYCd.js";import{u as y}from"./use-reduced-motion.p3D3Z0_d.js";const j=[{zh:"账户",en:"Account",icon:"👤"},{zh:"消息",en:"Inbox",icon:"✉️"},{zh:"日历",en:"Calendar",icon:"📅"},{zh:"相册",en:"Photos",icon:"🖼️"},{zh:"文件",en:"Files",icon:"📁"},{zh:"标签",en:"Tags",icon:"🏷️"},{zh:"设置",en:"Settings",icon:"⚙️"},{zh:"帮助",en:"Help",icon:"❓"}],v=`
.st-stage { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; gap: 12px; padding: 20px; }
.st-list {
  width: min(340px, 100%);
  margin: 0 auto;
  padding: 10px;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  display: grid;
  gap: 8px;
}
.st-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--border) 22%, transparent);
}
.st-idx {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.5 0.18 300));
  flex: none;
}
.st-label { font-size: 13px; }
.st-readout { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 8px 12px; font-size: 12px; color: var(--text-dim); }
.st-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.st-actions { display: flex; justify-content: center; }
.st-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.st-btn:hover { border-color: var(--accent); color: var(--accent); }
.st-hint { text-align: center; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;function R({entryId:n,schema:o}){const a=f(n,o),c=()=>({stagger:a.get("stagger"),items:Number(a.get("items"))}),[s,l]=i.useState(c),[p,x]=i.useState(0),r=y()===!0;i.useEffect(()=>a.subscribe(()=>{l(c())}),[a]);const g={hidden:{},show:{transition:{staggerChildren:s.stagger/1e3}}},m=r?{hidden:{opacity:0},show:{opacity:1,transition:{duration:.3,ease:"easeOut"}}}:{hidden:{opacity:0,y:16},show:{opacity:1,y:0,transition:{duration:.4,ease:"easeOut"}}},u=s.stagger*Math.max(0,s.items-1);return e.jsxs(b,{entryId:n,schema:o,children:[e.jsxs("div",{className:"st-stage",children:[e.jsx(d.ul,{className:"st-list",variants:g,initial:"hidden",animate:"show",children:j.slice(0,s.items).map((t,h)=>e.jsxs(d.li,{className:"st-item",variants:m,children:[e.jsx("span",{className:"st-idx","aria-hidden":"true",children:h+1}),e.jsxs("span",{className:"st-label",children:[t.icon," ",t.zh," ",t.en]})]},t.en))},`${p}-${s.items}-${s.stagger}-${r?"r":"m"}`),e.jsxs("div",{className:"st-readout",children:[e.jsxs("span",{className:"st-chip",children:["stagger ",s.stagger," ms × ",s.items-1," = 总铺开 spread ",u," ms"]}),r&&e.jsx("span",{className:"st-chip",children:"reduced-motion: 纯淡入 no displacement"})]}),e.jsx("div",{className:"st-actions",children:e.jsx("button",{type:"button",className:"st-btn",onClick:()=>x(t=>t+1),children:"重播 Replay"})}),e.jsx("p",{className:"st-hint",children:"第 i 项在 i × stagger 后启动;拖动 stagger 滑杆立即重播 / item i starts at i × stagger; dragging the slider replays instantly。"})]}),e.jsx("style",{children:v})]})}export{R as default};
