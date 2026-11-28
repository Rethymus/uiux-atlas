import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";const D=[{id:"comfortable",zh:"舒适",en:"Comfortable"},{id:"compact",zh:"紧凑",en:"Compact"}],I=`
.dt-scene { position: absolute; inset: 0; overflow: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
/* ── 容器层 · bento 网格(styles/bento-grid 官方默认)── */
.dt-bento {
  position: relative;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));   /* cols=4 */
  grid-auto-rows: 180px;                              /* rowHeight=180px:全部格子的节奏单位 */
  gap: 16px;                                          /* gap=16px:统一间隙是 bento 识别特征 */
}
.dt-cell {
  position: relative;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 24px;                                /* radius=24px(标志值,区间 20–28px) */
  background: var(--surface);
  overflow: hidden;
}
/* 面板内密度 = dataviz-dashboard-density comfortable 官方默认 */
.dt-cell {
  --dvz-gap: 8px;    /* Grafana GRID_CELL_VMARGIN=8 */
  --dvz-row: 30px;   /* Grafana GRID_CELL_HEIGHT=30;KPI 面板 = 3 格 = 90px */
  --dvz-callout: 45px; /* Power BI 字号阶梯 45/12/12/10 */
  --dvz-label: 12px;
  --dvz-small: 10px;
  padding: calc(var(--dvz-gap) * 2);
  display: flex;
  flex-direction: column;
  gap: var(--dvz-gap);
}
.dt-scene[data-density="compact"] .dt-cell {
  --dvz-gap: 4px;    /* 演示档:间距减半 */
  --dvz-row: 24px;   /* 行高 ×0.8 */
  --dvz-callout: 32px; /* callout 45→32 */
  --dvz-small: 9px;  /* label 10→9(9px 逼近 AA 可读下限;官方无 compact 惯例,未证实) */
}
.dt-hero { grid-column: span 2; grid-row: span 2; }
.dt-kpi { grid-column: span 1; }
.dt-spark { grid-column: span 1; }
.dt-list { grid-column: span 2; }
.dt-label {
  margin: 0;
  font-size: var(--dvz-label);
  line-height: 1.35;
  color: var(--text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dt-callout {
  margin: 0;
  font-size: var(--dvz-callout);
  font-weight: 640;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}
.dt-delta { margin: 0; font-size: var(--dvz-small); line-height: 1.35; color: oklch(0.72 0.14 155); font-variant-numeric: tabular-nums; }
.dt-spark svg { display: block; width: 100%; height: 100%; }
.dt-rows { display: flex; flex-direction: column; gap: var(--dvz-gap); min-height: 0; overflow: hidden; }
.dt-row {
  flex: none;
  height: var(--dvz-row);            /* 行高单元 = --dvz-row(30px/24px) */
  display: flex;
  align-items: center;
  gap: var(--dvz-gap);
  border-bottom: 1px solid var(--border);
  font-size: var(--dvz-small);
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}
.dt-row b { font-weight: 550; color: var(--text); }
.dt-row .dt-row-val { margin-left: auto; }
.dt-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: var(--dvz-small);
  color: var(--text-dim);
}
/* ── 点缀层 · 磁吸按钮(motion/magnetic-hover 官方默认 radius 0.45 / lerp 0.15;
      触屏/减动效直出普通按压态,键盘聚焦走 focus-visible 不位移)── */
.dt-magnet {
  align-self: flex-start;
  position: relative;
  margin-top: auto;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 7px 16px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: var(--surface-2);
  white-space: nowrap;
  will-change: transform;
}
.dt-magnet::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: transparent; pointer-events: none; }
.dt-magnet:hover::after { background: color-mix(in srgb, var(--text) 8%, transparent); }   /* M3 hover +8%(内容色) */
.dt-magnet:active::after { background: color-mix(in srgb, var(--text) 10%, transparent); } /* M3 press +10% */
/* CSS 双保险:reduced-motion / 触屏无 hover 时磁吸位移整体失效 */
@media (prefers-reduced-motion: reduce), (hover: none) {
  .dt-magnet { transform: none !important; }
}
/* ── 密度工具栏(右上;ProTable「密度切换是一等工具栏能力」语义)── */
.dt-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  border: 1px solid var(--border);
}
.dt-toolbar button {
  position: relative;
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: transparent;
}
.dt-toolbar button::after { content: ""; position: absolute; inset: -8px; } /* 热区 ≥42px */
.dt-toolbar button[aria-pressed="true"] { background: var(--surface-2); color: var(--text); }
/* ── 骨架层(motion/skeleton-loading):占位尺寸=真实卡片尺寸(同一 bento 模板),
      扫光脉动 1200ms 水平档(--skeleton-duration 官方默认);内容到达快速淡入、零位移 ── */
.dt-skel { position: relative; overflow: hidden; background: var(--surface-2); border-radius: 8px; }
.dt-skel::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--text) 7%, transparent), transparent);
  animation: dt-sweep var(--skeleton-duration, 1200ms) linear infinite; /* pulse=1200ms,horizontal */
}
@keyframes dt-sweep { to { transform: translateX(0); } }
.dt-skel-hero { flex: 1; }
.dt-skel-kpi { height: 34px; }
.dt-skel-row { height: 12px; }
.dt-skel-spark { flex: 1; }
.dt-cell[data-loading="true"] > :not(.dt-skel) { display: none; }
.dt-cell[data-loading="true"] { justify-content: stretch; gap: var(--dvz-gap); }
/* 内容到达:快速淡入覆盖(演示档 200ms = Ant motionDurationMid 口径;骨架→内容零位移) */
.dt-real { animation: dt-in 200ms ease-out both; }
@keyframes dt-in { from { opacity: 0; } to { opacity: 1; } }
/* ── 四层铭牌(mono 元数据纪律,同 GlassCardPro)── */
.dt-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
  pointer-events: none;
}
.dt-layers b { font-weight: 600; color: var(--text); }
.dt-status {
  position: absolute;
  left: 12px;
  top: 12px;
  margin: 0;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  color: var(--text-dim);
}
/* bento 回退:不支持 Grid 的环境退化为纵向堆叠等宽卡片(条目 fallback 口径) */
@supports not (display: grid) {
  .dt-bento { display: flex; flex-direction: column; }
  .dt-cell { min-height: 96px; }
}
@media (max-width: 720px) {
  .dt-bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dt-hero { grid-column: span 2; }
  .dt-list { grid-column: span 2; }
  .dt-layers { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .dt-skel::after { animation: none; transform: none; } /* 脉动停用,色块保持静态基色 */
  .dt-real { animation: none; }
}
`,L=1200,k=.45,y=.15,S=3;function M({locale:w}){const r=w==="zh",[a,x]=n.useState(!0),[o,j]=n.useState("comfortable"),v=n.useRef(null),g=n.useRef(null);return n.useEffect(()=>{if(!a)return;const t=window.setTimeout(()=>x(!1),L);return()=>window.clearTimeout(t)},[a]),n.useEffect(()=>{const t=v.current,s=g.current;if(!t||!s)return;const z=window.matchMedia("(prefers-reduced-motion: reduce)"),N=window.matchMedia("(hover: none)");if(z.matches||N.matches)return;let l=0,d=0,c=0,p=0,m=0;const h=()=>{p+=(d-p)*y,m+=(c-m)*y,s.style.transform=`translate(${p.toFixed(2)}px, ${m.toFixed(2)}px)`,l=requestAnimationFrame(h)},u=b=>{const i=s.getBoundingClientRect(),E=b.clientX-(i.left+i.width/2),R=b.clientY-(i.top+i.height/2);d=E*k,c=R*k},f=()=>{d=0,c=0};return t.addEventListener("pointermove",u),t.addEventListener("pointerleave",f),l=requestAnimationFrame(h),()=>{t.removeEventListener("pointermove",u),t.removeEventListener("pointerleave",f),cancelAnimationFrame(l),s.style.transform=""}},[a]),e.jsxs("div",{className:"demo-stage",children:[e.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[e.jsx("span",{className:"stage-plate-dot"}),"Dashboard Tile"]}),e.jsxs("div",{className:"dt-scene","data-density":o,children:[e.jsx("p",{className:"dt-status",role:"status",children:a?r?"加载中…(骨架占位,尺寸 = 真实卡片)":"Loading… (skeleton sized = real cards)":r?"内容已就绪,零位移换载完成":"Content ready; zero-shift swap done"}),e.jsxs("div",{className:"dt-bento","aria-busy":a,children:[e.jsx("div",{className:"dt-cell dt-hero","data-loading":a,ref:v,children:a?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"dt-skel dt-skel-row",style:{width:"38%"}}),e.jsx("div",{className:"dt-skel dt-skel-kpi",style:{width:"52%"}}),e.jsx("div",{className:"dt-skel dt-skel-hero"})]}):e.jsxs("div",{className:"dt-real",style:{display:"flex",flexDirection:"column",gap:"var(--dvz-gap)",flex:1,minHeight:0},children:[e.jsx("p",{className:"dt-label",children:r?"本周访客 Visitors · 7d":"Visitors · 7d"}),e.jsx("p",{className:"dt-callout",children:"84,213"}),e.jsxs("p",{className:"dt-delta",children:["+12.4% ",r?"较上周 vs last week":"vs last week"]}),e.jsx("div",{className:"dt-spark",style:{flex:1,minHeight:0},"aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 200 56",preserveAspectRatio:"none",role:"presentation",focusable:"false",children:[e.jsx("polyline",{points:"0,44 20,40 40,42 60,33 80,35 100,26 120,28 140,18 160,21 180,12 200,8",fill:"none",stroke:"var(--accent)",strokeWidth:"2"}),e.jsx("polygon",{points:"0,44 20,40 40,42 60,33 80,35 100,26 120,28 140,18 160,21 180,12 200,8 200,56 0,56",fill:"color-mix(in srgb, var(--accent) 14%, transparent)",stroke:"none"})]})}),e.jsx("button",{type:"button",className:"dt-magnet",ref:g,onClick:()=>x(!0),children:r?"重新加载 Reload":"Reload"})]})}),e.jsx("div",{className:"dt-cell dt-kpi","data-loading":a,style:{minHeight:`calc(var(--dvz-row) * ${S})`},children:a?e.jsx("div",{className:"dt-skel dt-skel-kpi"}):e.jsxs("div",{className:"dt-real",style:{display:"flex",flexDirection:"column",gap:"var(--dvz-gap)"},children:[e.jsx("p",{className:"dt-label",children:r?"错误率 Error rate":"Error rate"}),e.jsx("p",{className:"dt-callout",style:{fontSize:"calc(var(--dvz-callout) * 0.62)"},children:"0.42%"}),e.jsx("p",{className:"dt-delta",children:"−0.08pp"})]})}),e.jsx("div",{className:"dt-cell dt-spark","data-loading":a,children:a?e.jsx("div",{className:"dt-skel dt-skel-spark"}):e.jsxs("div",{className:"dt-real",style:{display:"flex",flexDirection:"column",gap:"var(--dvz-gap)",flex:1,minHeight:0},children:[e.jsx("p",{className:"dt-label",children:r?"渠道转化 Conversion":"Conversion"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:"var(--dvz-gap)",flex:1,minHeight:0},"aria-hidden":"true",children:[62,84,45,73,58,91].map((t,s)=>e.jsx("span",{style:{flex:1,height:`${t}%`,background:"color-mix(in srgb, var(--accent) 72%, transparent)",borderRadius:"3px 3px 0 0",display:"block"}},s))}),e.jsx("p",{className:"dt-foot",children:e.jsx("span",{children:"P95 218ms"})})]})}),e.jsx("div",{className:"dt-cell dt-list","data-loading":a,children:a?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"dt-skel dt-skel-row",style:{width:"30%"}}),e.jsx("div",{className:"dt-skel",style:{height:"var(--dvz-row)"}}),e.jsx("div",{className:"dt-skel",style:{height:"var(--dvz-row)"}}),e.jsx("div",{className:"dt-skel",style:{height:"var(--dvz-row)"}})]}):e.jsxs("div",{className:"dt-real dt-rows",children:[e.jsx("p",{className:"dt-label",children:r?"服务状态 Services":"Services"}),[{n:"api-gateway",s:"99.98%",r:"12ms"},{n:"auth",s:"99.95%",r:"23ms"},{n:"worker-queue",s:"99.91%",r:"41ms"}].map(t=>e.jsxs("div",{className:"dt-row",children:[e.jsx("b",{children:t.n}),e.jsx("span",{children:t.s}),e.jsx("span",{className:"dt-row-val",children:t.r})]},t.n))]})})]}),e.jsxs("p",{className:"dt-layers","aria-hidden":"true",children:[e.jsxs("span",{children:[e.jsx("b",{children:"1"})," bento: repeat(4,minmax(0,1fr)) · rows 180px · gap 16 · r24"]}),e.jsxs("span",{children:[e.jsx("b",{children:"2"})," density: gap ",o==="comfortable"?"8":"4","px · row ",o==="comfortable"?"30":"24","px · ladder 45/12/12/",o==="comfortable"?"10":"9"]}),e.jsxs("span",{children:[e.jsx("b",{children:"3"})," skeleton: 1200ms sweep · size = real · first-load only"]}),e.jsxs("span",{children:[e.jsx("b",{children:"4"})," magnet: r 0.45 · lerp 0.15 (accent)"]})]}),e.jsx("div",{className:"dt-toolbar",role:"group","aria-label":r?"密度切换 Density":"Density",children:D.map(t=>e.jsx("button",{type:"button","aria-pressed":o===t.id,onClick:()=>j(t.id),children:t.zh},t.id))})]}),e.jsx("style",{children:I})]})}export{M as default};
