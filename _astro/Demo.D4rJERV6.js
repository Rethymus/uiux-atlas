import{j as d}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as b}from"./color.DuEPkvq5.js";import{D as u}from"./DemoStage.vW1CgYCd.js";const c=[22,30,26,38,34,46,42,55],f=[58,74,49,66],v=`
.dd-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 14px 16px 8px; }
.dd-toolbar { display: flex; gap: 6px; justify-content: center; }
.dd-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: var(--surface);
}
.dd-toolbar button[aria-pressed="true"] { background: var(--accent-dim); border-color: var(--accent); color: var(--text); }
.dd-dash {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(24, minmax(0, 1fr));
  grid-auto-rows: var(--dvz-row, 30px);
  gap: var(--dvz-gap, 8px);
  align-content: start;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
  padding: calc(var(--dvz-gap, 8px) + 2px);
}
.dd-stage[data-density="compact"] .dd-dash {
  grid-auto-rows: calc(var(--dvz-row, 30px) * 0.8);
  gap: calc(var(--dvz-gap, 8px) / 2);
}
.dd-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dd-stage[data-density="compact"] .dd-panel { padding: 5px 8px; }
.dd-title { font-size: 12px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dd-stage[data-density="compact"] .dd-title { font-size: 11px; }
.dd-callout {
  font-size: 45px;
  line-height: 1.05;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  letter-spacing: -0.01em;
}
.dd-stage[data-density="compact"] .dd-callout { font-size: 32px; }
.dd-delta { font-size: 10px; font-weight: 600; }
.dd-delta.up { color: #7bb662; }
.dd-delta.down { color: #e06c5b; }
.dd-stage[data-density="compact"] .dd-delta { font-size: 9px; }
.dd-label { font-size: 10px; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dd-stage[data-density="compact"] .dd-label { font-size: 9px; }
.dd-body { flex: 1; min-height: 0; display: flex; }
.dd-body svg { width: 100%; height: 100%; }
.dd-table { width: 100%; border-collapse: collapse; font-size: 10px; }
.dd-stage[data-density="compact"] .dd-table { font-size: 9px; }
.dd-table th { font-size: 12px; font-weight: 600; color: var(--text); text-align: left; padding: 3px 6px; background: var(--surface-2); }
.dd-stage[data-density="compact"] .dd-table th { font-size: 11px; padding: 2px 5px; }
.dd-table td { color: var(--text-dim); padding: 3px 6px; border-top: 1px solid var(--border); font-variant-numeric: tabular-nums; }
.dd-stage[data-density="compact"] .dd-table td { padding: 2px 5px; }
.dd-readout { display: flex; flex-wrap: wrap; gap: 6px 8px; justify-content: center; font-size: 12px; color: var(--text-dim); }
.dd-chip { padding: 2px 10px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); font-variant-numeric: tabular-nums; }
.dd-chip b { color: var(--text); font-weight: 600; }
`;function z({entryId:i,schema:n}){const s=b(i,n),o=()=>({density:s.get("density"),gap:s.get("gap"),row:s.get("rowHeight")}),[t,p]=l.useState(o);l.useEffect(()=>s.subscribe(()=>{p(o())}),[s]);const e=t.density==="compact",x=e?t.gap/2:t.gap,h=e?t.row*.8:t.row,m=a=>4+92*a/(c.length-1),g=a=>40-a/60*32;return d.jsxs(u,{entryId:i,schema:n,children:[d.jsxs("div",{className:"dd-stage","data-density":t.density,children:[d.jsxs("div",{className:"dd-toolbar",role:"group","aria-label":"密度档位 Density preset",children:[d.jsx("button",{type:"button","aria-pressed":!e,onClick:()=>s.set("density","comfortable"),children:"舒适 Comfortable"}),d.jsx("button",{type:"button","aria-pressed":e,onClick:()=>s.set("density","compact"),children:"紧凑 Compact"})]}),d.jsxs("div",{className:"dd-dash",children:[d.jsxs("div",{className:"dd-panel",style:{gridColumn:"span 6",gridRow:"span 3"},children:[d.jsx("span",{className:"dd-label",children:"营收 Revenue"}),d.jsx("span",{className:"dd-callout",children:"¥1.28M"}),d.jsx("span",{className:"dd-delta up",children:"▲ 12.4% WoW"})]}),d.jsxs("div",{className:"dd-panel",style:{gridColumn:"span 12",gridRow:"span 3"},children:[d.jsx("span",{className:"dd-title",children:"活跃用户 Active users"}),d.jsx("div",{className:"dd-body",children:d.jsx("svg",{viewBox:"0 0 100 44",preserveAspectRatio:"none",role:"img","aria-label":"迷你折线图 Mini line chart",children:d.jsx("polyline",{points:c.map((a,r)=>`${m(r)},${g(a)}`).join(" "),fill:"none",stroke:"#0072B2",strokeWidth:"2"})})})]}),d.jsxs("div",{className:"dd-panel",style:{gridColumn:"span 6",gridRow:"span 3"},children:[d.jsx("span",{className:"dd-label",children:"转化率 Conversion"}),d.jsx("span",{className:"dd-callout",children:"3.42%"}),d.jsx("span",{className:"dd-delta down",children:"▼ 0.8pt WoW"})]}),d.jsxs("div",{className:"dd-panel",style:{gridColumn:"span 12",gridRow:"span 3"},children:[d.jsx("span",{className:"dd-title",children:"渠道转化 Channel conversion"}),d.jsx("div",{className:"dd-body",children:d.jsx("svg",{viewBox:"0 0 100 44",preserveAspectRatio:"none",role:"img","aria-label":"迷你柱状图 Mini bar chart",children:f.map((a,r)=>d.jsx("rect",{x:8+r*24,y:44-a/100*40,width:"14",height:a/100*40,rx:"1.5",fill:"#E69F00"},r))})})]}),d.jsx("div",{className:"dd-panel",style:{gridColumn:"span 24",gridRow:"span 3"},children:d.jsxs("table",{className:"dd-table",children:[d.jsx("thead",{children:d.jsxs("tr",{children:[d.jsx("th",{children:"地区 Region"}),d.jsx("th",{children:"营收 Revenue"}),d.jsx("th",{children:"环比 MoM"})]})}),d.jsxs("tbody",{children:[d.jsxs("tr",{children:[d.jsx("td",{children:"华东 East China"}),d.jsx("td",{children:"¥486K"}),d.jsx("td",{children:"+8.2%"})]}),d.jsxs("tr",{children:[d.jsx("td",{children:"华南 South China"}),d.jsx("td",{children:"¥402K"}),d.jsx("td",{children:"-1.6%"})]})]})]})})]}),d.jsxs("div",{className:"dd-readout",children:[d.jsxs("span",{className:"dd-chip",children:["档 ",d.jsx("b",{children:e?"compact":"comfortable"})]}),d.jsxs("span",{className:"dd-chip",children:["间距 ",d.jsxs("b",{children:[x,"px"]}),e&&" (8÷2)"]}),d.jsxs("span",{className:"dd-chip",children:["行高 ",d.jsxs("b",{children:[Math.round(h),"px"]}),e&&" (30×0.8)"]}),d.jsxs("span",{className:"dd-chip",children:["callout ",d.jsxs("b",{children:[e?"32":"45","px"]})]}),d.jsx("span",{className:"dd-chip",children:"24 列 × 3 行格(90px)面板"}),e&&d.jsx("span",{className:"dd-chip",children:"compact 数值为演示档,未证实"})]})]}),d.jsx("style",{children:v})]})}export{z as default};
