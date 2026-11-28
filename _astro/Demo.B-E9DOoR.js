import{j as o}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{D as b}from"./DemoStage.vW1CgYCd.js";import"./color.DuEPkvq5.js";const f=`
.demo-stage {
  --fa-sky: #8ecdeb;
  --fa-grass: #7dbb4e;
  --fa-gloss: 0.35;
  --fa-blur: 20px;
}
.fa-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, oklch(0.93 0.06 240), var(--fa-sky) 45%, oklch(0.95 0.05 210));
  color: #173a4a;
}
/* 太阳辉光(装饰) */
.fa-sun {
  position: absolute;
  right: 12%;
  top: 10%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, oklch(1 0 0 / 0.95), oklch(1 0 0 / 0) 70%);
}
/* 草丘(自然层) */
.fa-hill {
  position: absolute;
  left: -20%;
  right: -20%;
  bottom: -34%;
  height: 62%;
  border-radius: 50% 50% 0 0;
  background: linear-gradient(to top, oklch(0.52 0.14 140), var(--fa-grass) 60%, oklch(0.72 0.15 135));
}
.fa-bubbles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.fa-bubble {
  position: absolute;
  bottom: -40px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 32% 28%,
    oklch(1 0 0 / calc(0.9 * var(--fa-gloss) + 0.25)),
    oklch(1 0 0 / 0.18) 38%,
    oklch(0.95 0.03 220 / 0.12) 70%,
    oklch(1 0 0 / 0.35)
  );
  border: 1px solid oklch(1 0 0 / 0.5);
  animation: fa-rise linear both;
}
@keyframes fa-rise {
  from { transform: translateY(0) scale(0.8); opacity: 0.9; }
  70% { opacity: 0.85; }
  to { transform: translateY(-92vh) scale(1.05); opacity: 0; }
}
.fa-card {
  position: absolute;
  left: 50%;
  top: 44%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 40px));
  padding: 22px 24px 24px;
  border-radius: 24px;
  border: 1px solid oklch(1 0 0 / 0.55);
  background-color: oklch(1 0 0 / 0.15);
  -webkit-backdrop-filter: blur(var(--fa-blur)) saturate(160%);
  backdrop-filter: blur(var(--fa-blur)) saturate(160%);
  box-shadow: 0 12px 32px oklch(0.3 0.08 230 / 0.35);
  animation: fa-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .fa-card { background-color: oklch(1 0 0 / 0.72); }
}
.fa-card h2 {
  margin: 0 0 4px;
  font-size: 21px;
  font-weight: 800;
  color: #10405c;
}
.fa-card p {
  margin: 0 0 16px;
  font-size: 12.5px;
  line-height: 1.55;
  color: oklch(0.32 0.06 230);
}
.fa-row { display: flex; gap: 10px; }
/* 玻璃气泡按钮:椭圆光泽高光只在顶缘 */
.fa-btn {
  position: relative;
  overflow: hidden;
  flex: 1;
  padding: 11px 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  color: #10405c;
  background: oklch(1 0 0 / 0.35);
  border: 1px solid oklch(1 0 0 / 0.65);
  box-shadow: 0 6px 14px oklch(0.3 0.08 230 / 0.3), inset 0 -3px 6px oklch(0.55 0.1 230 / 0.18);
  cursor: pointer;
  transition: transform 0.15s ease;
}
.fa-btn::before {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  top: 5%;
  height: 42%;
  border-radius: 999px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    oklch(1 0 0 / calc(0.55 + 0.45 * var(--fa-gloss))),
    oklch(1 0 0 / 0)
  );
}
.fa-btn:active { transform: translateY(1px) scale(0.98); }
.fa-btn-primary { background: linear-gradient(to bottom, oklch(0.86 0.1 140 / 0.9), oklch(0.74 0.14 140 / 0.92)); border-color: oklch(0.6 0.12 145 / 0.6); color: oklch(0.24 0.08 150); }
.fa-btn:focus-visible,
.fa-tool:focus-visible { outline: 2px solid #10405c; outline-offset: 2px; }
.fa-tool {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  color: #10405c;
  border-radius: 999px;
  border: 1px solid oklch(1 0 0 / 0.65);
  background: oklch(1 0 0 / 0.5);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px oklch(0.3 0.08 230 / 0.25);
  cursor: pointer;
}
@media (max-width: 480px) {
  .fa-tool { top: auto; bottom: 12px; left: 12px; right: auto; }
}
@keyframes fa-in {
  from { opacity: 0; transform: translateY(14px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .fa-card { animation: none; }
  .fa-bubble { animation: none; transform: translateY(-30vh); opacity: 0.7; }
  .fa-btn { transition: none; }
}
`;function k({entryId:i,schema:n}){const[l,r]=s.useState([]),c=s.useRef(0),d=()=>{const a=c.current++,e={id:a,x:8+Math.random()*84,size:14+Math.random()*30,dur:4+Math.random()*3};r(t=>[...t.slice(-14),e]),window.setTimeout(()=>{r(t=>t.filter(p=>p.id!==a))},e.dur*1e3+200)};return o.jsxs(b,{entryId:i,schema:n,children:[o.jsxs("div",{className:"fa-scene",children:[o.jsx("div",{className:"fa-sun","aria-hidden":"true"}),o.jsx("div",{className:"fa-hill","aria-hidden":"true"}),o.jsx("div",{className:"fa-bubbles","aria-hidden":"true",children:l.map(a=>o.jsx("span",{className:"fa-bubble",style:{left:`${a.x}%`,width:a.size,height:a.size,animationDuration:`${a.dur}s`}},a.id))}),o.jsxs("div",{className:"fa-card",children:[o.jsx("h2",{children:"Aqua Player"}),o.jsx("p",{children:"天空、草地与玻璃气泡 / Sky, grass & glass bubbles — nature meets gloss."}),o.jsxs("div",{className:"fa-row",children:[o.jsx("button",{type:"button",className:"fa-btn fa-btn-primary",children:"▶ Play"}),o.jsx("button",{type:"button",className:"fa-btn",children:"≡ List"})]})]}),o.jsx("button",{type:"button",className:"fa-tool",onClick:d,children:"吹泡泡 Bubbles"})]}),o.jsx("style",{children:f})]})}export{k as default};
