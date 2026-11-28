import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as M}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const c=["#e63946","#ff8c42","#ffd60a","#2a9d8f","#1b9aaa","#3557ff","#7b2ff7","#ff5da2"],a="#1a1423",m="#f6f2ea",z=`
.demo-stage {
  --mx-step: 1.333;
  --mx-gap: 12px;
  --mx-tilt: 2deg;
}
.mx-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: ${m};
  color: ${a};
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
/* 顶部彩带:l6 层,透明度交给内联渐变 */
.mx-band {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  border-bottom: 3px solid ${a};
}
/* l1 波点底纹 */
.mx-l1 {
  position: absolute;
  inset: 44px 0 0 0;
  background-image: radial-gradient(circle, rgba(26, 20, 35, 0.14) 2.5px, transparent 3px);
  background-size: 26px 26px;
}
/* l2 斜纹场 */
.mx-l2 {
  position: absolute;
  inset: 44px 0 0 0;
  background: repeating-linear-gradient(-45deg, transparent 0 18px, rgba(26, 20, 35, 0.09) 18px 36px);
}
/* l3–l5 贴纸:墨描边 + 叠印旋转 */
.mx-sticker {
  position: absolute;
  padding: 7px 14px;
  border: 3px solid ${a};
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  rotate: calc(-1 * var(--mx-tilt));
  transition: rotate 0.2s ease;
}
.mx-sticker:hover { rotate: calc(-2 * var(--mx-tilt)); }
.mx-s3 { right: 12%; top: 22%; }
.mx-s4 { left: 9%; bottom: 18%; rotate: var(--mx-tilt); }
.mx-s4:hover { rotate: calc(2 * var(--mx-tilt)); }
.mx-s5 { right: 20%; bottom: 12%; rotate: calc(0.5 * var(--mx-tilt)); }
.mx-s5:hover { rotate: calc(1.5 * var(--mx-tilt)); }
/* 主卡:双线描边 + 同参数旋转 + 缝隙收缩 */
.mx-card {
  position: absolute;
  left: 50%;
  top: 56%;
  translate: -50% -50%;
  rotate: var(--mx-tilt);
  width: min(400px, calc(100% - 72px));
  padding: calc(var(--mx-gap) + 6px);
  border: 3px double ${a};
  background: ${m};
  display: flex;
  flex-direction: column;
  gap: var(--mx-gap);
  animation: mx-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.mx-mono { font-family: ui-monospace, "Cascadia Mono", "JetBrains Mono", Menlo, Consolas, monospace; }
.mx-eyebrow { margin: 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; opacity: 0.85; }
.mx-h {
  margin: 0;
  font-size: clamp(1.6rem, calc(var(--mx-step) * var(--mx-step) * 1.25rem), 3.2rem);
  line-height: 1.08;
  font-weight: 900;
}
/* trio = 衬线展示标题(对比字族);duo = 无衬线两级(极简对照) */
.mx-scene[data-font="trio"] .mx-h { font-family: Georgia, "Times New Roman", serif; }
.mx-scene[data-font="duo"] .mx-h,
.mx-scene[data-font="duo"] .mx-mono {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
/* 荧光笔 marker:撞色落在划线上,文字恒为墨色,对比不受色相影响 */
.mx-mark { box-shadow: inset 0 -0.22em 0 var(--mk, ${c[2]}); }
.mx-body { margin: 0; font-size: 15px; line-height: 1.6; max-width: 45ch; }
.mx-badges { display: flex; flex-wrap: wrap; gap: calc(var(--mx-gap) / 2); }
.mx-badge {
  padding: 4px 10px;
  border: 2px solid var(--bd, ${c[0]});
  font-size: 11px;
  letter-spacing: 0.08em;
}
/* 换序工具条 */
.mx-toolbar {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  gap: 6px;
}
.mx-toolbar button {
  border: 2px solid ${a};
  border-radius: 0;
  background: ${m};
  color: ${a};
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.mx-toolbar button:hover { background: ${a}; color: ${m}; }
/* 窄屏:卡片放宽,贴纸收缩 */
@media (max-width: 480px) {
  .mx-card { width: calc(100% - 24px); top: 58%; }
  .mx-sticker { font-size: 11px; padding: 5px 9px; }
  .mx-s3 { right: 4%; }
}
@keyframes mx-in {
  from { opacity: 0; scale: 0.94; }
  to { opacity: 1; scale: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .mx-card { animation: none; }
  .mx-sticker { transition: none; }
}
`;function D({entryId:d,schema:p}){const s=M(d,p),[f,u]=n.useState(()=>s.get("hues")),[y,k]=n.useState(()=>s.get("fontMix")),[l,v]=n.useState(()=>s.get("layers")),[j,N]=n.useState(0);n.useEffect(()=>s.subscribe(()=>{u(s.get("hues")),k(s.get("fontMix")),v(s.get("layers"))}),[s]);const o=Math.max(2,Math.min(8,f)),g=c.slice(0,o),b=j%o,x=[...g.slice(b),...g.slice(0,b)],t=r=>x[r%x.length],$={backgroundImage:[`radial-gradient(42% 60% at 12% 16%, ${t(0)}cc, transparent 70%)`,`radial-gradient(38% 52% at 86% 12%, ${t(o-1)}cc, transparent 68%)`,`radial-gradient(46% 60% at 78% 88%, ${t(2)}cc, transparent 72%)`].join(", ")},w={background:`linear-gradient(90deg, ${x.map((r,h)=>`${r} ${h*100/o}% ${(h+1)*100/o}%`).join(", ")})`},i=r=>({display:l>=r?void 0:"none"});return e.jsxs(S,{entryId:d,schema:p,children:[e.jsxs("div",{className:"mx-scene","data-font":y,children:[e.jsx("div",{className:"mx-scene-bg",style:{...$,position:"absolute",inset:0},"aria-hidden":"true"}),l>=6&&e.jsx("div",{className:"mx-band",style:w,"aria-hidden":"true"}),e.jsx("div",{className:"mx-l1",style:i(1),"aria-hidden":"true"}),e.jsx("div",{className:"mx-l2",style:i(2),"aria-hidden":"true"}),e.jsx("span",{className:"mx-sticker mx-s3",style:{...i(3),borderColor:a},"aria-hidden":"true",children:"More ★"}),e.jsx("span",{className:"mx-sticker mx-s4",style:{...i(4),borderColor:a},"aria-hidden":"true",children:"Is!"}),e.jsx("span",{className:"mx-sticker mx-s5",style:{...i(5),borderColor:a},"aria-hidden":"true",children:"More ↻"}),e.jsxs("article",{className:"mx-card",children:[e.jsx("p",{className:"mx-eyebrow mx-mono",children:"Horror Vacui · Est. 1980s Memphis"}),e.jsxs("h3",{className:"mx-h",children:[e.jsx("span",{className:"mx-mark",style:{"--mk":t(0)},children:"More"})," ",e.jsx("span",{className:"mx-mark",style:{"--mk":t(2)},children:"is"})," ",e.jsx("span",{className:"mx-mark",style:{"--mk":t(o-1)},children:"more"})]}),e.jsx("p",{className:"mx-body",children:"图案叠图案,色彩对色彩。密度全部压在装饰层——正文保持 45–75ch 行宽,放大一倍不出现滚动。"}),e.jsxs("div",{className:"mx-badges","aria-hidden":"true",children:[e.jsxs("span",{className:"mx-badge mx-mono",style:{"--bd":t(1)},children:["≥",o," hues"]}),e.jsx("span",{className:"mx-badge mx-mono",style:{"--bd":t(2)},children:"×1.333"}),e.jsxs("span",{className:"mx-badge mx-mono",style:{"--bd":t(4)},children:[l," layers"]})]})]}),e.jsx("div",{className:"mx-toolbar",children:e.jsx("button",{type:"button",onClick:()=>N(r=>r+1),title:"Rotate palette order",children:"换序 Shuffle ⤭"})})]}),e.jsx("style",{children:z})]})}export{D as default};
