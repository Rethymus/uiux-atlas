import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as o}from"./color.DuEPkvq5.js";import{D as d}from"./DemoStage.vW1CgYCd.js";const l=`
.sgd-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  /* 流派底色:暗场 #0B0F14 级别(调研 17 §9 实现基调),单一顶光方向。
     SJ-06:所有 var(--sgd-hue) 带官方默认值回退(schema hue default 32°,
     同 DemoStage 内联注入)——变量未注入的首帧也能画出场景底,不露网格纸 */
  background:
    radial-gradient(120% 90% at 50% -20%, hsl(var(--sgd-hue, 32) 45% 22% / 0.55), transparent 60%),
    /* SJ-06:var 携带角度单位(schema unit deg)——calc 色相加减必须同域
       (angle±number 非法,曾令整个 background 计算值期失效),回退值用 deg */
    radial-gradient(60% 50% at 85% 100%, hsl(calc(var(--sgd-hue, 32deg) + 20deg) 35% 14% / 0.5), transparent 70%),
    #0b0f14;
  display: flex;
  flex-direction: column;
  /* SJ-02:底部为 .sgd-note 预留一行——note 为 absolute bottom:8px 的两行文案,
     560px 定高舞台上曾与流内最后一个子项 .sgd-content 同基线叠印 */
  padding: 14px 16px 48px;
  gap: 14px;
}
/* 玻璃层通用配方:渗光 + 泛光 + 受光亮边(调研 17 §1.3),全场单一主光色 */
.sgd-glass {
  background: rgb(255 255 255 / 0.06);
  -webkit-backdrop-filter: blur(12px) saturate(1.5) brightness(1.06);
  backdrop-filter: blur(12px) saturate(1.5) brightness(1.06);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.4),
    inset 0 0 16px 2px color-mix(in srgb, hsl(var(--sgd-hue, 32) 90% 78%) 26%, transparent),
    0 0 0 1px rgb(255 255 255 / 0.16),
    0 0 var(--sgd-bloom, 40px) 4px color-mix(in srgb, hsl(var(--sgd-hue, 32) 90% 78%) 35%, transparent),
    0 12px 32px rgb(0 0 0 / 0.35);
  color: #e8eef7;
  animation: sgd-in 0.5s ease-out both;
}
/* 玻璃层 1:导航条(玻璃是导航层特权,调研 17 §11.10) */
.sgd-nav {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  animation-delay: 0s;
}
.sgd-nav .sgd-links { display: flex; gap: 14px; opacity: 0.85; }
.sgd-nav .sgd-cta {
  border: 0;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: #10151c;
  background: hsl(var(--sgd-hue, 32) 90% 78%);
}
/* 玻璃层 2:英雄卡 */
.sgd-hero {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 20px 24px;
  border-radius: 20px;
  animation-delay: 0.06s;
}
.sgd-hero .sgd-title { margin: 0; font-size: 19px; font-weight: 700; line-height: 1.3; }
.sgd-hero p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.85; max-width: 46ch; }
/* 玻璃层 3(可选):氛围小卡——layers=1/2 时隐藏;第 3 层是 Apple sparingly 的上限 */
.sgd-chip {
  flex: 0 0 auto;
  align-self: flex-end;
  padding: 8px 16px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 600;
  opacity: 0;
  translate: 0 6px;
  transition: opacity 0.25s ease, translate 0.25s ease;
}
.sgd-scene[data-layers="3"] .sgd-chip { opacity: 1; translate: 0 0; }
/* 内容层:实底高对比(流派铁律:玻璃不进内容层) */
.sgd-content {
  flex: 0 0 auto;
  padding: 10px 16px;
  border-radius: 14px;
  background: #121821;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.07);
  color: #dfe7f2;
  font-size: 12px;
  line-height: 1.55;
}
.sgd-content strong { color: #fff; }
.sgd-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 60%;
  font-size: 11px;
  color: rgb(232 238 247 / 0.5);
}
@media (max-width: 480px) {
  .sgd-note { display: none; }
  .sgd-nav .sgd-links { display: none; }
}
@keyframes sgd-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .sgd-glass { animation: none; }
  .sgd-chip { transition: none; }
}
`;function h({entryId:a,schema:t}){const e=o(a,t),[r,i]=n.useState(()=>e.get("layers"));return n.useEffect(()=>e.subscribe(()=>{i(e.get("layers"))}),[e]),s.jsx(d,{entryId:a,schema:t,children:s.jsxs("div",{className:"sgd-scene","data-layers":r,children:[s.jsxs("nav",{className:"sgd-glass sgd-nav","aria-label":"玻璃导航 Glass nav",children:[s.jsx("span",{children:"◆ AURORA"}),s.jsxs("span",{className:"sgd-links","aria-hidden":"true",children:[s.jsx("span",{children:"Docs"}),s.jsx("span",{children:"Pricing"}),s.jsx("span",{children:"Blog"})]}),s.jsx("button",{type:"button",className:"sgd-cta",children:"开始 Start"})]}),s.jsxs("section",{className:"sgd-glass sgd-hero",children:[s.jsx("p",{className:"sgd-title",children:"以光组织层级 Hierarchy through light"}),s.jsx("p",{children:"玻璃在导航层,内容在实底 / Glass carries the nav; content sits on solid ground."})]}),s.jsx("div",{className:"sgd-glass sgd-chip","aria-hidden":"true",children:"泛光即层级 Bloom is hierarchy"}),s.jsxs("div",{className:"sgd-content",children:[s.jsx("strong",{children:"内容层 · Content layer"})," —— 高可读实底,不属于玻璃 / Solid, highly readable — never glass."]}),s.jsx("p",{className:"sgd-note",children:"layers 切 1/2/3 看玻璃层数上限(sparingly 原则);hue 换全场唯一主光色。/ Toggle layers 1/2/3 for the glass ceiling (sparingly); hue recolors the scene's single key light."}),s.jsx("style",{children:l})]})})}export{h as default};
