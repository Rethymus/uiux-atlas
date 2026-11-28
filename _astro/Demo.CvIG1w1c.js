import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as x}from"./color.DuEPkvq5.js";import{D as u}from"./DemoStage.vW1CgYCd.js";const t=["oklch(0.92 0.03 260)","oklch(0.78 0.13 230)","oklch(0.75 0.16 320)","oklch(0.82 0.14 300)","oklch(0.85 0.15 90)","oklch(0.80 0.16 165)","oklch(0.70 0.19 25)","oklch(0.62 0.22 340)"];function y(l){const o=Math.max(2,Math.min(8,Math.round(l)))-2,n=[];for(let a=0;a<o;a++){const r=Math.round((a+1)*(t.length-1)/(o+1));n.push(t[Math.min(t.length-1,r)])}const c=[t[0],...n,t[0]],i=100/(c.length-1);return`linear-gradient(100deg, ${c.map((a,r)=>`${a} ${Math.round(r*i)}%`).join(", ")})`}const b=`
.demo-stage {
  --y2k-jelly-alpha: 0.55;
  --y2k-gloss: 1;
}
.y2k-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(90% 70% at 82% 12%, oklch(0.55 0.16 310 / 0.55), transparent 60%),
    radial-gradient(70% 60% at 12% 88%, oklch(0.62 0.17 200 / 0.5), transparent 62%),
    radial-gradient(40% 40% at 22% 18%, oklch(0.85 0.15 90 / 0.35), transparent 70%),
    oklch(0.18 0.06 285);
}
/* 星空点阵(装饰) */
.y2k-scene::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(oklch(0.95 0.05 300 / 0.9) 1px, transparent 1.5px),
    radial-gradient(oklch(0.9 0.09 200 / 0.7) 1px, transparent 1.5px);
  background-size: 56px 56px, 84px 84px;
  background-position: 0 0, 28px 40px;
}
/* 低清伪影叠层(装饰,data-grain 控制) */
.y2k-grain {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: none;
  background: repeating-linear-gradient(
      to bottom,
      oklch(0 0 / 0.16) 0 1px,
      transparent 1px 4px
    ),
    repeating-linear-gradient(to right, oklch(0 0 / 0.1) 0 1px, transparent 1px 4px);
}
.y2k-scene[data-grain="on"] .y2k-grain { display: block; }
.y2k-card {
  position: relative;
  width: min(360px, calc(100% - 32px));
  padding: 26px 28px 24px;
  border-radius: 22px;
  border: 1px solid oklch(0.95 0.03 260 / 0.55);
  background: oklch(0.3 0.05 285 / 0.42);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 14px 40px oklch(0 0 / 0.4);
  color: oklch(0.96 0.01 260);
  animation: y2k-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.y2k-title {
  margin: 0 0 4px;
  font-size: 52px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.05;
  background: linear-gradient(100deg, ${t[0]}, ${t[3]}, ${t[0]});
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 calc(14px * var(--y2k-gloss)) oklch(0.85 0.12 300 / calc(0.55 * var(--y2k-gloss))));
}
@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .y2k-title { color: oklch(0.92 0.03 260); background: none; }
}
.y2k-sub {
  margin: 0 0 16px;
  font-family: ui-monospace, "Courier New", monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: oklch(0.62 0.17 200);
}
/* HUD 读数(装饰) */
.y2k-hud {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 14px;
  padding: 7px 12px;
  border: 1px solid oklch(0.95 0.03 260 / 0.35);
  border-radius: 8px;
  font-family: ui-monospace, "Courier New", monospace;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  color: oklch(0.9 0.09 85);
}
.y2k-hud .y2k-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 50%;
  background: oklch(0.87 0.2 130);
  box-shadow: 0 0 calc(6px * var(--y2k-gloss)) oklch(0.87 0.2 130 / calc(0.8 * var(--y2k-gloss)));
  animation: y2k-blink 1.6s steps(1, end) infinite;
}
.y2k-eq {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 26px;
  margin: 0 0 16px;
}
.y2k-eq i {
  flex: 1;
  border-radius: 2px 2px 0 0;
  background: linear-gradient(to top, oklch(0.62 0.19 145), oklch(0.88 0.2 130));
  animation: y2k-eq 0.9s ease-in-out infinite alternate;
}
.y2k-eq i:nth-child(2n) { animation-duration: 0.7s; }
.y2k-eq i:nth-child(3n) { animation-duration: 1.1s; }
.y2k-scene[data-play="off"] .y2k-eq i { animation: none; height: 30%; }
.y2k-row { display: flex; gap: 10px; }
/* 果冻按钮:半透明填充 + 顶部椭圆镜面高光 + 半透明描边 */
.y2k-btn {
  position: relative;
  overflow: hidden;
  flex: 1;
  padding: 12px 0;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: oklch(0.28 0.1 145);
  background: oklch(0.85 0.2 130 / var(--y2k-jelly-alpha));
  border: 2px solid oklch(0.96 0.03 260 / calc(0.3 + 0.4 * var(--y2k-jelly-alpha)));
  box-shadow:
    inset 0 calc(-6px * var(--y2k-gloss)) calc(10px * var(--y2k-gloss)) oklch(0.4 0.12 150 / calc(0.35 * var(--y2k-gloss))),
    0 8px 18px oklch(0 0 / 0.35);
  cursor: pointer;
  transition: transform 0.15s ease;
}
/* 顶部镜面高光(装饰) */
.y2k-btn::before {
  content: "";
  position: absolute;
  left: 14%;
  right: 14%;
  top: 6%;
  height: 44%;
  border-radius: 999px;
  pointer-events: none;
  background: radial-gradient(
    60% 100% at 50% 0%,
    oklch(1 0 0 / calc(0.85 * var(--y2k-gloss))),
    oklch(1 0 0 / 0) 72%
  );
}
.y2k-btn:active { transform: translateY(1px) scale(0.985); }
.y2k-btn-chrome {
  color: oklch(0.2 0.05 285);
  background: linear-gradient(180deg, oklch(0.98 0.01 260 / 0.9), oklch(0.75 0.04 260 / 0.85) 52%, oklch(0.9 0.02 260 / 0.9));
  border-color: oklch(0.99 0 260 / 0.7);
  box-shadow:
    inset 0 1px 0 oklch(1 0 0 / 0.9),
    inset 0 -4px 8px oklch(0.4 0.03 260 / 0.4),
    0 8px 18px oklch(0 0 / 0.35);
}
.y2k-toggle {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: oklch(0 0 / 0.4);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
@media (max-width: 480px) {
  .y2k-toggle { top: auto; bottom: 12px; left: 12px; right: auto; }
}
.y2k-toggle button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: oklch(0.95 0.02 260 / 0.75);
  background: transparent;
}
.y2k-toggle button[aria-pressed="true"] { background: oklch(0.75 0.16 320 / 0.5); color: oklch(0.99 0 260); }
.y2k-toggle button:focus-visible,
.y2k-btn:focus-visible { outline: 2px solid oklch(0.9 0.09 85); outline-offset: 2px; }
@keyframes y2k-in {
  from { opacity: 0; transform: translateY(12px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes y2k-blink { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0.25; } }
@keyframes y2k-eq { from { height: 22%; } to { height: 96%; } }
@media (prefers-reduced-motion: reduce) {
  .y2k-card { animation: none; }
  .y2k-hud .y2k-dot { animation: none; opacity: 1; }
  .y2k-eq i { animation: none; height: 30%; }
  .y2k-btn { transition: none; }
}
`;function w({entryId:l,schema:p}){const o=x(l,p),[n,c]=s.useState(()=>o.get("chromeStops")),[i,a]=s.useState(()=>o.get("grain")),[r,k]=s.useState(!1);s.useEffect(()=>o.subscribe(()=>{c(o.get("chromeStops")),a(o.get("grain"))}),[o]);const h=s.useMemo(()=>y(n),[n]);return e.jsxs(u,{entryId:l,schema:p,children:[e.jsxs("div",{className:"y2k-scene","data-grain":i,"data-play":r?"on":"off",children:[e.jsxs("div",{className:"y2k-card",children:[e.jsx("h1",{className:"y2k-title",style:{backgroundImage:h},children:"Y2K"}),e.jsxs("p",{className:"y2k-sub",children:["Millennium Player · ",n," stops"]}),e.jsxs("p",{className:"y2k-hud","aria-hidden":"true",children:[e.jsxs("span",{children:[e.jsx("span",{className:"y2k-dot"}),"SYS.OK"]}),e.jsx("span",{children:"2000-01-01 00:00"})]}),e.jsx("div",{className:"y2k-eq","aria-hidden":"true",children:Array.from({length:12},(d,g)=>e.jsx("i",{},g))}),e.jsxs("div",{className:"y2k-row",children:[e.jsx("button",{type:"button",className:"y2k-btn",onClick:()=>k(d=>!d),children:r?"STOP ■":"PLAY ▶"}),e.jsx("button",{type:"button",className:"y2k-btn y2k-btn-chrome",children:"EJECT"})]})]}),e.jsx("div",{className:"y2k-grain","aria-hidden":"true"}),e.jsx("div",{className:"y2k-toggle",role:"group","aria-label":"纹理切换 Grain switcher",children:e.jsx("button",{type:"button","aria-pressed":i==="on",onClick:()=>o.set("grain",i==="on"?"off":"on"),children:"伪影 Grain"})})]}),e.jsx("style",{children:b})]})}export{w as default};
