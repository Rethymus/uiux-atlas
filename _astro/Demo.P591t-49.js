import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{D as p}from"./DemoStage.vW1CgYCd.js";const x=[{d:"0px",label:"0"},{d:"6px",label:"6"},{d:"16px",label:"16"}],b=`
.demo-stage {
  --cs-distance: 6px;
  --cs-spread: 6px;
  --cs-color: #3366cc;
  --cs-alpha: 0.25;
}
.cs-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(180deg, #eef2f8, #e8edf5 55%, #e4eaf3);
  transition: background 0.25s ease;
}
/* 表面(floor):接触阴影的落点;顶部一条高光细线交代表面边缘 */
.cs-floor {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30%;
  background: linear-gradient(180deg, #dde5f0, #eef1f7);
}
.cs-floor::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.7);
}
.cs-scene[data-surface="dark"] { background: linear-gradient(180deg, #2c3140, #262b38 55%, #232836); }
.cs-scene[data-surface="dark"] .cs-floor { background: linear-gradient(180deg, #3a4152, #2b303e); }

/* 参数卡:距离把它从表面抬起(抬升幅度为演示视觉,非调研值) */
.cs-card {
  position: absolute;
  left: 50%;
  bottom: 34%;
  translate: -50% calc(var(--cs-distance) * -0.6);
  width: min(300px, calc(100% - 48px));
  padding: 20px 22px;
  border-radius: 14px;
  background: #ffffff;
  color: #26314a;
  transition: translate 0.18s ease;
}
.cs-scene[data-surface="dark"] .cs-card { background: #3a4152; color: #e6eaf2; }
.cs-card h3 { margin: 0 0 6px; font-size: 16px; font-weight: 650; }
.cs-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.8; }
.cs-actions { display: flex; gap: 8px; }
.cs-btn {
  border: 0;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  background: #3366cc;
  color: #fff;
}
.cs-btn-ghost { background: rgba(51, 102, 204, 0.12); color: #3366cc; }
.cs-scene[data-surface="dark"] .cs-btn-ghost { background: rgba(255, 255, 255, 0.14); color: #cdd8ee; }

/* 贴地接触阴影:椭圆伪元素,高度 = 2×distance、下探 = distance(调研配方,distance=6 时恰为 bottom:-6px/height:12px) */
.cs-card::after,
.cs-mini::after {
  content: "";
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  background: color-mix(in srgb, var(--cs-color) calc(var(--cs-alpha) * 100%), transparent);
  filter: blur(var(--cs-spread));
}
.cs-card::after { left: 10%; right: 10%; height: calc(var(--cs-distance) * 2); bottom: calc(var(--cs-distance) * -1); }
.cs-mini::after { left: 8%; right: 8%; height: calc(var(--d) * 2); bottom: calc(var(--d) * -1); }

/* float 模式:Comeau 五层倍增悬浮投影(1/2/4/8/16px,每层同透明度 = alpha×0.8,默认档恰为配方值 0.2) */
.cs-scene[data-mode="float"] .cs-card::after,
.cs-scene[data-mode="float"] .cs-mini::after { display: none; }
.cs-scene[data-mode="float"] .cs-card,
.cs-scene[data-mode="float"] .cs-mini {
  box-shadow:
    1px 2px 2px color-mix(in srgb, var(--cs-color) calc(var(--cs-alpha) * 80%), transparent),
    2px 4px 4px color-mix(in srgb, var(--cs-color) calc(var(--cs-alpha) * 80%), transparent),
    4px 8px 8px color-mix(in srgb, var(--cs-color) calc(var(--cs-alpha) * 80%), transparent),
    8px 16px 16px color-mix(in srgb, var(--cs-color) calc(var(--cs-alpha) * 80%), transparent),
    16px 32px 32px color-mix(in srgb, var(--cs-color) calc(var(--cs-alpha) * 80%), transparent);
  transition: box-shadow 0.18s ease;
}

/* 对照小卡:固定贴合距离,贴地程度递增 */
.cs-minis {
  position: absolute;
  left: 50%;
  translate: -50%;
  bottom: 12px;
  display: flex;
  gap: 18px;
}
.cs-mini {
  position: relative;
  width: 64px;
  height: 44px;
  border-radius: 8px;
  background: #ffffff;
  color: #5a6478;
  font-size: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 3px;
  translate: 0 calc(var(--d) * -0.6);
  transition: translate 0.18s ease;
}
.cs-scene[data-surface="dark"] .cs-mini { background: #3a4152; color: #c9d2e4; }

.cs-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
}
.cs-scene[data-surface="dark"] .cs-toolbar { background: rgba(255, 255, 255, 0.12); }
.cs-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: inherit;
  background: transparent;
}
.cs-toolbar button[aria-pressed="true"] { background: rgba(127, 127, 127, 0.3); font-weight: 600; }

.cs-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  max-width: 55%;
  margin: 0;
  font-size: 11px;
  color: #8a93a6;
}
.cs-scene[data-surface="dark"] .cs-note { color: #9aa3b8; }

@media (max-width: 480px) {
  .cs-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .cs-card, .cs-mini { transition: none; }
  .cs-scene, .cs-scene[data-mode="float"] .cs-card, .cs-scene[data-mode="float"] .cs-mini { transition: none; }
}
`;function h({entryId:r,schema:o}){const e=l(r,o),[i,d]=t.useState(()=>e.get("mode")),[s,n]=t.useState("light");return t.useEffect(()=>e.subscribe(()=>{d(e.get("mode"))}),[e]),a.jsx(p,{entryId:r,schema:o,children:a.jsxs("div",{className:"cs-scene","data-mode":i,"data-surface":s,children:[a.jsx("div",{className:"cs-floor","aria-hidden":"true"}),a.jsxs("div",{className:"cs-card",children:[a.jsx("h3",{children:"贴合距离 Contact distance"}),a.jsx("p",{children:"椭圆随 distance 拉长下探——元素越高,接触阴影越长越靠下。 The ellipse tracks the ground distance as the element lifts."}),a.jsxs("div",{className:"cs-actions",children:[a.jsx("button",{type:"button",className:"cs-btn",children:"主操作 Action"}),a.jsx("button",{type:"button",className:"cs-btn-ghost cs-btn",children:"取消 Cancel"})]})]}),a.jsx("div",{className:"cs-minis","aria-label":"固定距离对照 Fixed-distance references",children:x.map(c=>a.jsx("div",{className:"cs-mini",style:{"--d":c.d},children:c.label},c.d))}),a.jsxs("div",{className:"cs-toolbar",role:"group","aria-label":"表面明暗 Surface tone",children:[a.jsx("button",{type:"button","aria-pressed":s==="light",onClick:()=>n("light"),children:"浅表面 Light"}),a.jsx("button",{type:"button","aria-pressed":s==="dark",onClick:()=>n("dark"),children:"暗表面 Dark"})]}),a.jsx("p",{className:"cs-note",children:"阴影色取背景色相(#3366cc = hsl(220 60% 50%),非纯黑);深色表面上阴影可感知度下降——这正是要实测的点。"}),a.jsx("style",{children:b})]})})}export{h as default};
