import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as y}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";import{useLiquidTheme as S}from"./liquid-theme.CbRb_h5Y.js";const _=[{id:"pour",zh:"流出"},{id:"splash",zh:"落底"},{id:"rise",zh:"上涨"},{id:"finish",zh:"收尾"}];function F(){const l=window;l.__liquidFx||(l.__liquidFx={events:[],progress:[],end:[]})}const $=`
/* 舞台主题令牌只作用于本舞台(data-fx-theme 切换令牌组;值 = 站点 token 的
   深/浅两套原值,design-spec §2.1 语义分层;不动站点主题)。 */
.lqr-stage {
  position: absolute; inset: 0; overflow: hidden;
  font-size: 12px;
  --lq-bg: #0b0e13;          /* spec §2.1 --bg 深色 */
  --lq-bg-elev: #10141b;     /* --bg-elev */
  --lq-surface: #161b23;     /* --surface */
  --lq-surface-2: #1d232d;   /* --surface-2 */
  --lq-border: #2b323d;      /* --border */
  --lq-border-strong: #3a434f; /* --border-strong */
  --lq-text: #e9edf3;        /* --text */
  --lq-text-dim: #a7b1bd;    /* --text-dim */
  --lq-text-faint: #8b96a3;  /* --text-faint */
  --lq-fill-1: rgba(233, 237, 243, 0.04); /* --fill-1 */
  --lq-fill-2: rgba(233, 237, 243, 0.08); /* --fill-2 */
  --lq-accent: #6db2ff;      /* --accent */
  --lq-accent-strong: #9cc9ff; /* --accent-strong */
  --lq-accent-dim: rgba(109, 178, 255, 0.14); /* --accent-dim */
  --lq-chart-line: var(--lq-accent);
  --lq-chart-bar: var(--lq-accent-dim);
  background: var(--lq-bg);
  color: var(--lq-text);
}
.lqr-stage[data-fx-theme="light"] {
  --lq-bg: #f3f5f8;          /* spec §2.1 浅色表 --bg */
  --lq-bg-elev: #eaeef3;
  --lq-surface: #ffffff;
  --lq-surface-2: #eef1f5;
  --lq-border: #dde2ea;
  --lq-border-strong: #bcc4d1;
  --lq-text: #1d242f;
  --lq-text-dim: #47546b;
  --lq-text-faint: #5e6b81;
  --lq-fill-1: rgba(29, 36, 47, 0.05);
  --lq-fill-2: rgba(29, 36, 47, 0.09);
  --lq-accent: #1a69d2;
  --lq-accent-strong: #124ea6;
  --lq-accent-dim: rgba(26, 105, 210, 0.1);
}
.lqr-head {
  position: absolute; left: 16px; right: 130px; top: calc(var(--plate-h, 40px) + 8px); z-index: 1;
  display: flex; flex-direction: column; gap: 6px; align-items: flex-start; pointer-events: none;
}
.lqr-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.lqr-chips { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; font-variant-numeric: tabular-nums; }
.lqr-chip { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--lq-border); background: var(--lq-surface); }
.lqr-note { max-width: 520px; margin: 0; font-size: 12px; line-height: 1.5; color: var(--lq-text-dim); text-align: left; }
.lqr-page {
  position: absolute; left: 16px; right: 16px; top: calc(var(--plate-h, 40px) + 96px); bottom: 12px; z-index: 1;
  display: grid; gap: 8px;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1.1fr) minmax(0, 1fr);
}
.lqr-card {
  border: 1px solid var(--lq-border); border-radius: 12px; background: var(--lq-surface);
  padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; min-width: 0; min-height: 0; overflow: hidden;
}
.lqr-card h4 { margin: 0; font-size: 13px; font-weight: 600; }
.lqr-card p { margin: 0; font-size: 12px; line-height: 1.55; color: var(--lq-text-dim); }
.lqr-kpi { font-size: 20px; font-weight: 650; font-variant-numeric: tabular-nums; color: var(--lq-accent-strong); }
.lqr-chart { flex: 1; min-height: 0; }
.lqr-chart svg { display: block; width: 100%; height: 100%; }
.lqr-form { grid-column: 2 / 4; }
.lqr-field { display: flex; align-items: center; gap: 8px; min-height: 24px; }
.lqr-field label { min-width: 64px; color: var(--lq-text-dim); }
.lqr-field input[type="text"], .lqr-field select {
  height: 26px; padding: 0 8px; border: 1px solid var(--lq-border-strong); border-radius: 8px;
  background: var(--lq-bg-elev); color: var(--lq-text); font-size: 12px; min-width: 0; flex: 1;
}
.lqr-field input[type="range"] { flex: 1; accent-color: var(--lq-accent); }
.lqr-field input[type="checkbox"] { accent-color: var(--lq-accent); }
.lqr-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--lq-border-strong); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--lq-surface); color: inherit; transition: background-color var(--dur-1, 150ms) var(--ease-standard, ease);
}
.lqr-toggle:hover { background: var(--lq-fill-1); }
.lqr-toggle:focus-visible { outline: 2px solid var(--lq-accent); outline-offset: 2px; }
.lqr-soundbar {
  position: absolute; right: 12px; bottom: 12px; z-index: 3;
  display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
  border: 1px solid var(--lq-border); border-radius: 12px;
  background: var(--lq-bg-elev); padding: 8px 10px; max-width: min(420px, 60%);
}
.lqr-soundbar .lqr-sb-label { color: var(--lq-text-faint); font-size: 12px; }
.lqr-sbtn {
  border: 1px solid var(--lq-border-strong); border-radius: 8px; background: var(--lq-surface);
  color: inherit; font-size: 12px; padding: 3px 9px; cursor: pointer;
}
.lqr-sbtn:hover { background: var(--lq-fill-1); }
.lqr-sbtn[aria-pressed="true"] { background: var(--lq-accent-dim); border-color: var(--lq-accent); color: var(--lq-accent-strong); }
.lqr-sbtn:focus-visible { outline: 2px solid var(--lq-accent); outline-offset: 2px; }
.lqr-vol { width: 96px; accent-color: var(--lq-accent); }
.lqr-vol:disabled { opacity: 0.45; }
@media (max-width: 760px) {
  .lqr-page { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; grid-auto-rows: minmax(96px, auto); }
  .lqr-form { grid-column: auto; }
  .lqr-head { right: 120px; }
}
`;function L({entryId:l,schema:p}){const n=y(l,p),x=()=>({duration:n.get("duration"),sway:n.get("sway"),waveAmp:n.get("waveAmp"),droplets:n.get("droplets")}),[i,b]=s.useState(x),[o,h]=s.useState("dark"),[c,v]=s.useState(!1),[d,u]=s.useState(!1),[w,m]=s.useState(.7),g=s.useRef(null),f=s.useRef(null),q=S({theme:o,onThemeChange:r=>h(r),scopeRef:g,originRef:f,duration:c?0:i.duration,tuning:{sway:i.sway,waveAmp:i.waveAmp,droplets:i.droplets},hooks:{onPhase(r,a){window.__liquidFx?.events.push({phase:r,runId:a.runId,instant:a.instant,t:performance.now()})},onProgress(r,a){window.__liquidFx?.progress.push({progress:r,runId:a,t:performance.now()})},onEnd(r){window.__liquidFx?.end.push({reason:r.reason,runId:r.runId,target:r.target,t:performance.now()})}}}),{toggle:j,sound:t}=q;s.useEffect(()=>{window.__liquidReveal=q.reveal},[]),s.useEffect(()=>{t&&(window.__liquidSound=t.stats),F()},[t]),s.useEffect(()=>{t&&(u(t.settings.enabled),m(t.settings.volume))},[t]),s.useEffect(()=>n.subscribe(()=>{b(x())}),[n]),s.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>v(r.matches);return a(),r.addEventListener("change",a),()=>r.removeEventListener("change",a)},[]),s.useEffect(()=>{const r=document.documentElement.dataset.theme;(r==="light"||r==="dark")&&h(a=>a===r?a:r)},[]);const k=c?"0":String(Math.max(0,Math.round(i.duration))),N=o==="dark"?"to-light":"to-dark";return e.jsx(E,{entryId:l,schema:p,children:e.jsxs("div",{ref:g,className:"lqr-stage","data-fx-stage":"","data-fx-theme":o,"data-fx-duration":k,children:[e.jsxs("div",{className:"lqr-head",children:[e.jsx("p",{className:"lqr-title",children:"液体主题切换 Liquid Theme Reveal"}),e.jsxs("div",{className:"lqr-chips","aria-hidden":"true",children:[e.jsx("span",{className:"lqr-chip",children:c?"duration 0 (reduce)":`${i.duration}ms`}),e.jsxs("span",{className:"lqr-chip",children:["sway ",i.sway,"px"]}),e.jsxs("span",{className:"lqr-chip",children:["waveAmp ",i.waveAmp,"px"]}),e.jsxs("span",{className:"lqr-chip",children:["droplets ",i.droplets]}),e.jsxs("span",{className:"lqr-chip",children:["data-fx-theme = ",o]})]}),e.jsx("p",{className:"lqr-note",children:"新主题像液体一样从按钮下方流出:液柱 → 飞溅 → 波浪液面上涨 → 覆盖全舞台;液体经过处 卡片、文字、边框与图表即刻切到新主题,未覆盖处保持原主题。表单里随便输入,切换后内容原样保留。/ The new theme pours out from under the button: column → splash → rising wave surface; wherever the liquid passes, cards, text, borders and charts switch — untouched areas keep the old theme, and anything you type here survives the reveal."})]}),e.jsxs("div",{className:"lqr-page","aria-hidden":"false",children:[e.jsxs("div",{className:"lqr-card",children:[e.jsx("h4",{children:"概览 Overview"}),e.jsx("span",{className:"lqr-kpi",children:"1,024"}),e.jsx("p",{children:"这张卡的底色、文字与边框随揭示层逐帧切换(联合轮廓经过即切换)。"})]}),e.jsxs("div",{className:"lqr-card lqr-form",children:[e.jsx("h4",{children:"表单与业务状态 Form state"}),e.jsxs("div",{className:"lqr-field",children:[e.jsx("label",{htmlFor:`lqr-name-${l.replace(/[^a-z0-9]+/gi,"-")}`,children:"名称 Name"}),e.jsx("input",{id:`lqr-name-${l.replace(/[^a-z0-9]+/gi,"-")}`,type:"text",defaultValue:"液体的旅程",placeholder:"切换后我还在"})]}),e.jsxs("div",{className:"lqr-field",children:[e.jsx("label",{htmlFor:`lqr-tier-${l.replace(/[^a-z0-9]+/gi,"-")}`,children:"档位 Tier"}),e.jsxs("select",{id:`lqr-tier-${l.replace(/[^a-z0-9]+/gi,"-")}`,defaultValue:"b",children:[e.jsx("option",{value:"a",children:"标准 Standard"}),e.jsx("option",{value:"b",children:"专业 Pro"}),e.jsx("option",{value:"c",children:"旗舰 Ultra"})]})]}),e.jsxs("div",{className:"lqr-field",children:[e.jsx("label",{htmlFor:`lqr-check-${l.replace(/[^a-z0-9]+/gi,"-")}`,children:"同步 Sync"}),e.jsx("input",{id:`lqr-check-${l.replace(/[^a-z0-9]+/gi,"-")}`,type:"checkbox",defaultChecked:!0})]}),e.jsxs("div",{className:"lqr-field",children:[e.jsx("label",{htmlFor:`lqr-range-${l.replace(/[^a-z0-9]+/gi,"-")}`,children:"阈值 Threshold"}),e.jsx("input",{id:`lqr-range-${l.replace(/[^a-z0-9]+/gi,"-")}`,type:"range",min:0,max:100,defaultValue:62})]})]}),e.jsxs("div",{className:"lqr-card",children:[e.jsx("h4",{children:"图表 Chart"}),e.jsx("div",{className:"lqr-chart",children:e.jsxs("svg",{viewBox:"0 0 220 96",role:"img","aria-label":"柱状与折线组合图,颜色随主题切换",children:[[18,34,26,46,38,56].map((r,a)=>e.jsx("rect",{className:"lqr-bar",x:10+a*34,y:86-r,width:18,height:r,rx:3,fill:"var(--lq-chart-bar)",stroke:"var(--lq-border)"},a)),e.jsx("polyline",{points:"19,64 53,48 87,58 121,36 155,44 189,24",fill:"none",stroke:"var(--lq-chart-line)",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),[64,48,58,36,44,24].map((r,a)=>e.jsx("circle",{cx:19+a*34,cy:r,r:3,fill:"var(--lq-chart-line)"},a))]})})]}),e.jsxs("div",{className:"lqr-card",children:[e.jsx("h4",{children:"卡片 Card B"}),e.jsx("p",{children:"液缘是逐帧重算的联合轮廓(液柱 + 液滴 + 飞溅 + 波面),不是圆形扩散、不是渐变淡入、 也不是整页同切——未被液体覆盖的区域一直保持旧主题。"})]}),e.jsxs("div",{className:"lqr-card",children:[e.jsx("h4",{children:"卡片 Card C"}),e.jsx("p",{children:"揭示层 = ::view-transition-new(root) 快照被 SVG clipPath 裁剪;两层由浏览器快照呈现, 尺寸、滚动位置与 sticky/fixed 自动对齐。"})]})]}),e.jsx("button",{ref:f,type:"button",className:"lqr-toggle","data-fx-toggle":!0,onClick:r=>j(r.currentTarget),children:"切换主题 Toggle"}),e.jsxs("div",{className:"lqr-soundbar",role:"group","aria-label":"音效设置与阶段试听",children:[e.jsxs("button",{type:"button",className:"lqr-sbtn","aria-pressed":d,onClick:()=>{t&&(t.setEnabled(!t.settings.enabled),u(t.settings.enabled))},children:["音效 ",d?"开":"关"]}),e.jsx("label",{className:"lqr-sb-label",htmlFor:`lqr-vol-${l.replace(/[^a-z0-9]+/gi,"-")}`,children:"音量"}),e.jsx("input",{id:`lqr-vol-${l.replace(/[^a-z0-9]+/gi,"-")}`,className:"lqr-vol",type:"range",min:0,max:1,step:.05,value:w,disabled:!d,onChange:r=>{const a=Number(r.currentTarget.value);m(a),t?.setVolume(a)}}),e.jsx("span",{className:"lqr-sb-label",children:"试听:"}),_.map(r=>e.jsx("button",{type:"button",className:"lqr-sbtn",disabled:!d,onClick:()=>t?.preview(r.id,N),children:r.zh},r.id))]}),e.jsx("style",{children:$})]})})}export{L as default};
