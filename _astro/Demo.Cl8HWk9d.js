import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{D as i}from"./DemoStage.vW1CgYCd.js";import"./color.DuEPkvq5.js";const s=`
.demo-stage {
  --cy-scan-gap: 4px;
  --cy-scan-alpha: 0.25;
  --cy-rgb: 2px;
  --cy-glow: 1;
}
.cy-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #070512;
  color: #d7f6ff;
}
/* 扫描线叠层:1px 暗线,周期 scanGap,透明度 scanAlpha(装饰,不拦截交互) */
.cy-scene::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgb(0 0 0 / var(--cy-scan-alpha)) 0 1px,
    transparent 1px var(--cy-scan-gap)
  );
}
.cy-hud {
  position: relative;
  width: min(360px, calc(100% - 32px));
  padding: 26px 26px 30px;
  border: 1px solid rgb(0 240 255 / 0.35);
  background: rgb(10 8 26 / 0.72);
}
/* HUD 角标框线(装饰) */
.cy-hud::before,
.cy-hud::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
}
.cy-hud::before { left: -1px; top: -1px; border-left: 2px solid #00f0ff; border-top: 2px solid #00f0ff; }
.cy-hud::after { right: -1px; bottom: -1px; border-right: 2px solid #00f0ff; border-bottom: 2px solid #00f0ff; }
.cy-title {
  margin: 0 0 14px;
  font-family: ui-monospace, "JetBrains Mono", "Courier New", monospace;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #fcee0a;
  --glitch-amp: 1.5;
  text-shadow:
    calc(-1 * var(--cy-rgb)) 0 rgb(255 43 214 / 0.8),
    var(--cy-rgb) 0 rgb(0 240 255 / 0.8),
    0 0 calc(10px * var(--cy-glow)) rgb(252 238 10 / calc(0.55 * var(--cy-glow))),
    0 0 calc(28px * var(--cy-glow)) rgb(252 238 10 / calc(0.30 * var(--cy-glow)));
  animation: cy-glitch 4s steps(1, end) infinite;
}
.cy-scene[data-boost="on"] .cy-title { --glitch-amp: 3; animation-duration: 1.4s; }
.cy-readout {
  font-family: ui-monospace, "JetBrains Mono", "Courier New", monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #7de8ff;
  margin-bottom: 10px;
}
.cy-cursor { display: inline-block; width: 7px; height: 12px; margin-left: 6px; background: #00f0ff; vertical-align: -1px; animation: cy-blink 1.2s steps(1, end) infinite; }
.cy-meter { height: 8px; border: 1px solid rgb(0 240 255 / 0.5); margin-bottom: 20px; }
.cy-meter-fill { height: 100%; background: #00f0ff; box-shadow: 0 0 calc(8px * var(--cy-glow)) rgb(0 240 255 / calc(0.6 * var(--cy-glow))); animation: cy-meter 6s ease-in-out infinite alternate; }
.cy-row { display: flex; gap: 12px; }
.cy-btn {
  flex: 1;
  padding: 11px 0;
  cursor: pointer;
  font-family: ui-monospace, "JetBrains Mono", "Courier New", monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #00f0ff;
  background: rgb(0 240 255 / 0.08);
  border: 1px solid #00f0ff;
  transition: box-shadow 0.15s ease, translate 0.1s ease;
}
.cy-btn:hover { box-shadow: 0 0 calc(14px * var(--cy-glow)) rgb(0 240 255 / calc(0.55 * var(--cy-glow))); background: rgb(0 240 255 / 0.16); }
.cy-btn:active { translate: 0 1px; }
.cy-btn-magenta { color: #ff2bd6; border-color: #ff2bd6; background: rgb(255 43 214 / 0.08); }
.cy-btn-magenta:hover { box-shadow: 0 0 calc(14px * var(--cy-glow)) rgb(255 43 214 / calc(0.55 * var(--cy-glow))); background: rgb(255 43 214 / 0.16); }
.cy-btn:focus-visible { outline: 2px solid #fcee0a; outline-offset: 3px; }
.cy-cite { margin: 16px 0 0; font-family: ui-monospace, "Courier New", monospace; font-size: 10px; letter-spacing: 0.06em; color: rgb(125 232 255 / 0.55); }
@keyframes cy-glitch {
  0%, 84%, 94%, 100% { translate: 0 0; }
  86% { translate: calc(var(--cy-rgb) * var(--glitch-amp)) 0; }
  88% { translate: calc(var(--cy-rgb) * var(--glitch-amp) * -1) 0; }
  90% { translate: calc(var(--cy-rgb) * var(--glitch-amp) * 0.5) 0; }
  92% { translate: calc(var(--cy-rgb) * var(--glitch-amp) * -0.5) 0; }
}
@keyframes cy-blink {
  0%, 55% { opacity: 1; }
  56%, 100% { opacity: 0; }
}
@keyframes cy-meter {
  from { width: 22%; }
  to { width: 88%; }
}
/* 降级链:关闭全部动画,保留静态 RGB 分离与扫描线 */
@media (prefers-reduced-motion: reduce) {
  .cy-title, .cy-cursor, .cy-meter-fill { animation: none; }
  .cy-cursor { opacity: 1; }
  .cy-meter-fill { width: 65%; }
  .cy-btn { transition: none; }
}
`;function f({entryId:t,schema:c}){const[a,o]=n.useState(!1);return e.jsxs(i,{entryId:t,schema:c,children:[e.jsx("div",{className:"cy-scene","data-boost":a?"on":"off",children:e.jsxs("div",{className:"cy-hud",children:[e.jsx("h1",{className:"cy-title",children:"NEON DISTRICT"}),e.jsxs("p",{className:"cy-readout",role:"status",children:["LINK: STABLE · 98.2%",e.jsx("span",{className:"cy-cursor","aria-hidden":"true"})]}),e.jsx("div",{className:"cy-meter","aria-hidden":"true",children:e.jsx("div",{className:"cy-meter-fill"})}),e.jsxs("div",{className:"cy-row",children:[e.jsx("button",{type:"button",className:"cy-btn",children:"JACK IN"}),e.jsx("button",{type:"button",className:"cy-btn cy-btn-magenta","aria-pressed":a,onClick:()=>o(r=>!r),children:a?"GLITCH: MAX":"GLITCH: LOW"})]}),e.jsx("p",{className:"cy-cite",children:"默认值为本条目基准设定,调研未记载官方数值 / Defaults are this entry's baseline, not documented values."})]})}),e.jsx("style",{children:s})]})}export{f as default};
