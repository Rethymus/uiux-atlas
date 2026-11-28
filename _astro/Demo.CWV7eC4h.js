import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as l}from"./color.DuEPkvq5.js";import{D as o}from"./DemoStage.vW1CgYCd.js";const p=`
.demo-stage {
  --clay-radius: 32px;
  --clay-shadow-y: 35px;
  --clay-inner-alpha: 1;
}
.clay-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ecebfa;
  animation: clay-in 0.4s ease-out both;
}
/* 三段式阴影(顺序关键):外投影(色相化,禁纯黑)→ 下缘暗内阴影 → 顶部亮内阴影 */
.clay-shadow {
  box-shadow:
    0 var(--clay-shadow-y) 68px rgba(112, 100, 176, 0.30),
    inset 0 -8px 16px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 8px 16px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
}
.clay-card {
  width: min(320px, calc(100% - 32px));
  padding: 26px 26px 30px;
  border-radius: var(--clay-radius);
  background: #b3a4ee;
  color: #2c2350;
}
.clay-card h3 { margin: 0 0 6px; font-size: 17px; font-weight: 700; }
.clay-hint { margin: 0 0 20px; font-size: 12px; color: #4a3f78; }
.clay-btn {
  width: 100%;
  padding: 15px 0;
  border: 0;
  border-radius: calc(var(--clay-radius) * 0.75); /* 按钮≈卡片圆角 × 0.75,经验≈高度 25% */
  background: #8f7cf0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    0 calc(var(--clay-shadow-y) * 0.55) 40px rgba(112, 100, 176, 0.30),
    inset 0 -6px 12px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 6px 12px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* 按压反馈:位移而非动画阴影(superdesign.dev 配方) */
.clay-btn:active { transform: translateY(2px) scale(0.98); }
.clay-btn:focus-visible { outline: 3px solid #6a5acd; outline-offset: 2px; }
.clay-meter {
  margin-top: 22px;
  height: 22px;
  border-radius: 999px;
  background: #cdc4f4;
  box-shadow:
    inset 0 -4px 8px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 4px 8px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
}
.clay-meter-fill {
  width: 68%;
  height: 100%;
  border-radius: 999px;
  background: #ff9fbe;
  box-shadow:
    inset 0 -4px 8px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 4px 8px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
  transition: width 0.5s ease;
}
.clay-cite { margin: 14px 0 0; font-size: 11px; color: #6b60a4; text-align: center; }
@keyframes clay-in {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .clay-scene { animation: none; }
  .clay-btn, .clay-meter-fill { transition: none; }
}
`;function b({entryId:r,schema:c}){const s=l(r,c),[i,n]=t.useState(68);return t.useEffect(()=>s.subscribe(()=>n(e=>e>=100?24:e+8)),[s]),a.jsxs(o,{entryId:r,schema:c,children:[a.jsx("div",{className:"clay-scene",children:a.jsxs("div",{className:"clay-card clay-shadow",children:[a.jsx("h3",{children:"黏土卡片 Clay Card"}),a.jsx("p",{className:"clay-hint",children:"按下按钮看挤压回弹 / Press the button to feel the squish."}),a.jsx("button",{type:"button",className:"clay-btn",onClick:()=>n(e=>e>=100?24:e+8),children:"打卡 +1 Check in"}),a.jsx("div",{className:"clay-meter",role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":i,"aria-label":"进度 Progress",children:a.jsx("div",{className:"clay-meter-fill",style:{width:`${i}%`}})}),a.jsx("p",{className:"clay-cite",children:"配方出处 Recipe: superdesign.dev/styles/claymorphism"})]})}),a.jsx("style",{children:p})]})}export{b as default};
