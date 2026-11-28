import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as k}from"./index.DLkBFFtG.js";import{g as D,o as p,c as w}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const l=n=>{const o=n.replace("#","");return[0,2,4].map(r=>parseInt(o.slice(r,r+2),16)/255)},b=n=>"#"+n.map(o=>Math.round(o*255).toString(16).padStart(2,"0")).join("").toUpperCase(),s={canvas:"#FFFBFE",surface:"#FFFFFF",overlay:"#FFFFFF",fg:"#1C1B1F",badge:"#B3261E"},x=n=>b(l(n).map(o=>1-o)),c={canvas:x(s.canvas),surface:x(s.surface),overlay:x(s.overlay),fg:x(s.fg),badge:s.badge},A=`
.dp-scene {
  position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px;
  --dp-canvas: var(--dp-canvas-v, #FFFBFE);
  --dp-surface: var(--dp-surface-v, #FFFFFF);
  --dp-fg: var(--dp-fg-v, #1C1B1F);
  --dp-accent: var(--dp-accent-v, #6750A4);
  --dp-on-accent: var(--dp-on-accent-v, #FFFFFF);
  --dp-badge: var(--dp-badge-v, #B3261E);
  --dp-shadow: var(--dp-shadow-v, 0 6px 16px rgba(0, 0, 0, 0.18));
  background: var(--dp-canvas); color: var(--dp-fg);
  border-radius: 14px;
}
.dp-window {
  flex: 1.35; min-width: 0; display: flex; flex-direction: column; gap: 10px;
}
.dp-bar {
  padding: 9px 14px; border-radius: 11px; font-size: 12px; font-weight: 650;
  background: var(--dp-surface); box-shadow: var(--dp-shadow);
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  animation: dp-in 0.4s ease-out both;
}
.dp-card {
  flex: 1; padding: 14px 16px; border-radius: 13px;
  background: var(--dp-surface); box-shadow: var(--dp-shadow);
  display: flex; flex-direction: column; gap: 9px;
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  animation: dp-in 0.4s ease-out 60ms both;
}
.dp-card h3 { margin: 0; font-size: 15px; }
.dp-card p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.8; }
.dp-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.dp-btn {
  border: 0; border-radius: 999px; padding: 7px 16px; font-size: 12.5px; font-weight: 600; cursor: pointer;
  background: var(--dp-accent); color: var(--dp-on-accent);
  transition: background-color 0.25s ease, color 0.25s ease;
}
.dp-badgeChip {
  padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 650;
  color: var(--dp-badge); border: 1px solid color-mix(in srgb, var(--dp-badge) 55%, transparent);
  background: color-mix(in srgb, var(--dp-badge) 12%, transparent);
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.dp-figure {
  height: 58px; border-radius: 10px; position: relative; overflow: hidden;
  background: linear-gradient(120deg, #ffffff 0%, #e8ecf4 55%, #dfe6f1 100%);
}
.dp-figure::after {
  content: ""; position: absolute; inset: 0; background: rgba(8, 6, 12, var(--dp-dim, 0));
  transition: background-color 0.25s ease;
}
.dp-figure[data-glow="true"]::before {
  content: "白底图未处理 → 暗底上发光"; position: absolute; z-index: 1; inset-inline: 0; top: 50%;
  translate: 0 -50%; text-align: center; font-size: 10.5px; font-weight: 650; color: #451a1a;
}
.dp-panel { flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.dp-metric {
  background: #fff; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 11px;
  padding: 9px 11px; display: flex; align-items: center; gap: 9px;
  animation: dp-in 0.4s ease-out 120ms both;
}
.dp-metric b { font-size: 16px; font-variant-numeric: tabular-nums; }
.dp-metric span { flex: 1; color: #5b6472; font-size: 11px; line-height: 1.45; }
.dp-badge { font-size: 10px; font-weight: 650; border-radius: 999px; padding: 2px 8px; font-variant-numeric: tabular-nums; }
.dp-badge[data-ok="true"] { background: oklch(0.86 0.09 150); color: oklch(0.35 0.09 150); }
.dp-badge[data-ok="false"] { background: oklch(0.88 0.07 25); color: oklch(0.42 0.15 25); }
.dp-controls { display: flex; flex-direction: column; gap: 6px; }
.dp-chips { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: #e6e9ee; align-self: flex-start; }
.dp-chips button {
  border: 0; border-radius: 999px; padding: 4px 12px; font-size: 11.5px; cursor: pointer;
  color: #374151; background: transparent;
}
.dp-chips button[aria-pressed="true"] { background: #fff; font-weight: 650; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14); }
.dp-legend { display: flex; flex-wrap: wrap; gap: 4px; }
.dp-legend span {
  font-size: 10.5px; font-weight: 600; padding: 2px 8px; border-radius: 999px;
  border: 1px dashed rgba(0, 0, 0, 0.25); color: #5b6472;
}
.dp-legend span[data-on="true"] { border-style: solid; color: #0b1220; background: #fff; }
.dp-note { font-size: 11px; color: #5b6472; line-height: 1.5; margin: 0; }
@keyframes dp-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (max-width: 560px) {
  .dp-scene { flex-direction: column; overflow: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .dp-bar, .dp-card, .dp-metric { animation: none; }
  .dp-bar, .dp-card, .dp-btn, .dp-badgeChip, .dp-figure, .dp-figure::after { transition: none; }
}
`,B={base:0,raised:1,overlay:2};function I({entryId:n,schema:o}){const r=D(n,o),h=()=>({strategy:r.get("strategy"),elevation:r.get("elevation"),accentLight:r.get("accentLight"),accentDark:r.get("accentDark")}),[j,y]=k.useState(h);k.useEffect(()=>r.subscribe(()=>{y(h())}),[r]);const{strategy:t,elevation:v,accentLight:m,accentDark:N}=j,i=B[v],F=[p(.17,.012,297).rgb,p(.21,.014,297).rgb,p(.25,.016,297).rgb].map(b),E=b(p(.92,.01,297).rgb),z=b(p(.76,.075,25).rgb),e=t==="light"?{canvas:s.canvas,surface:i===0?s.canvas:i===1?s.surface:s.overlay,fg:s.fg,accent:m,onAccent:"#FFFFFF",badge:s.badge,shadow:"0 6px 16px rgba(0, 0, 0, 0.18)",dim:0,glow:!1}:t==="dark-inverted"?{canvas:c.canvas,surface:i===0?c.canvas:i===1?c.surface:c.overlay,fg:c.fg,accent:m,onAccent:c.fg,badge:c.badge,shadow:"0 6px 16px rgba(0, 0, 0, 0.55)",dim:0,glow:!0}:{canvas:F[0],surface:F[i],fg:E,accent:N,onAccent:"#381E72",badge:z,shadow:"0 6px 16px rgba(0, 0, 0, 0.32)",dim:.25,glow:!1},f=w(l(e.fg),l(e.surface)),u=w(l(e.accent),l(e.surface)),g=t==="dark-semantic",C={"--dp-canvas-v":e.canvas,"--dp-surface-v":e.surface,"--dp-fg-v":e.fg,"--dp-accent-v":e.accent,"--dp-on-accent-v":e.onAccent,"--dp-badge-v":e.badge,"--dp-shadow-v":e.shadow,"--dp-dim":String(e.dim)};return a.jsxs(S,{entryId:n,schema:o,children:[a.jsxs("div",{className:"dp-scene",style:C,"data-strategy":t,children:[a.jsxs("div",{className:"dp-window",children:[a.jsx("div",{className:"dp-bar",children:"窗口栏 Window bar(base 层)"}),a.jsxs("div",{className:"dp-card",children:[a.jsx("h3",{children:t==="dark-semantic"?"语义暗色卡片":t==="dark-inverted"?"直接反转卡片":"浅色卡片"}),a.jsxs("p",{children:["表面 ",e.surface," · 文字 ",e.fg,t==="dark-inverted"&&" · 三档层级无差异,层级表达失效"]}),a.jsxs("div",{className:"dp-row",children:[a.jsx("button",{type:"button",className:"dp-btn",children:"主操作 Action"}),a.jsx("span",{className:"dp-badgeChip",children:"状态 Status"})]}),a.jsx("div",{className:"dp-figure","data-glow":e.glow,"aria-hidden":"true"})]})]}),a.jsxs("div",{className:"dp-panel",children:[a.jsxs("div",{className:"dp-metric",children:[a.jsxs("b",{children:[f.toFixed(2),":1"]}),a.jsx("span",{children:"正文/表面(WCAG;语义暗色三档实测 15.09 / 13.97 / 12.64,纯反转白黑 21:1 为过冲)"}),a.jsxs("span",{className:"dp-badge","data-ok":f>=4.5,children:["AA ",f>=4.5?"✓":"✗"]})]}),a.jsxs("div",{className:"dp-metric",children:[a.jsxs("b",{children:[u.toFixed(2),":1"]}),a.jsx("span",{children:"accent/表面(非文本 3:1 闸;语义暗色 #D0BCFF 对暗表面实测 11.25:1)"}),a.jsxs("span",{className:"dp-badge","data-ok":u>=3,children:["3:1 ",u>=3?"✓":"✗"]})]}),a.jsxs("div",{className:"dp-controls",children:[a.jsx("div",{className:"dp-chips",role:"group","aria-label":"策略 Strategy",children:["light","dark-inverted","dark-semantic"].map(d=>a.jsx("button",{type:"button","aria-pressed":t===d,onClick:()=>r.set("strategy",d),children:d==="light"?"浅色参照":d==="dark-inverted"?"直接反转":"语义四模式"},d))}),a.jsx("div",{className:"dp-chips",role:"group","aria-label":"层级 Elevation",children:["base","raised","overlay"].map(d=>a.jsx("button",{type:"button","aria-pressed":v===d,onClick:()=>r.set("elevation",d),children:d==="base"?"基面":d==="raised"?"抬升":"浮层"},d))})]}),a.jsxs("div",{className:"dp-legend","aria-label":"四模式清单",children:[a.jsx("span",{"data-on":g,children:"① 分层 base/elevated"}),a.jsx("span",{"data-on":g,children:"② 饱和度 提亮降饱和"}),a.jsx("span",{"data-on":g,children:"③ 阴影 → 表面提亮"}),a.jsx("span",{"data-on":g,children:"④ 品牌色换对 + 图片压暗"})]}),a.jsx("p",{className:"dp-note",children:"语义暗色的表面阶为演示值(官方逐档 elevation overlay 表未见于调研);M3 官方锚点:暗色 accent #D0BCFF / on-accent #381E72(调研 06§7)。Semantic dark surface values are a demo ladder; the official anchors are #D0BCFF / #381E72 (research 06 §7)."})]})]}),a.jsx("style",{children:A})]})}export{I as default};
