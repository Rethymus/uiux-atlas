import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as p}from"./color.DuEPkvq5.js";import{w as d}from"./urls.C_nDjrQ8.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const b=[{id:"alps",zh:"雪山",en:"Alps photo"},{id:"nebula",zh:"星空",en:"Nebula photo"}],u="data:image/svg+xml;utf8,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(#n)'/></svg>"),x=`
.demo-stage {
  --fa-tint-opacity: 0.6;
  --fa-lum-opacity: 0.35;
}
.fa-scene { position: absolute; inset: 0; overflow: hidden; }
.fa-scene img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
/* in-app acrylic 面板:模糊 → 亮度层 → 色调层(面板底色)→ 噪点层 → 内容 */
.fa-window {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  width: min(420px, calc(100% - 36px));
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 16px 44px rgb(0 0 0 / 0.35);
  color: #1a1a1a;
  animation: fa-in 0.45s ease-out both;
}
.fa-acrylic {
  position: relative;
  background: rgb(243 243 243 / var(--fa-tint-opacity)); /* TintColor≈#F3F3F3(社区近似)× TintOpacity */
  -webkit-backdrop-filter: blur(24px) saturate(1.25); /* 模糊半径未公布;社区常见近似 */
  backdrop-filter: blur(24px) saturate(1.25);
  transition: background 0.25s ease;
}
.fa-lum { position: absolute; inset: 0; background: #fff; opacity: var(--fa-lum-opacity); transition: opacity 0.25s ease; }
.fa-noise { position: absolute; inset: 0; opacity: 0.04; background-image: url("${u}"); }
.fa-acrylic > * { position: relative; z-index: 1; }
.fa-titlebar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 12.5px; border-bottom: 1px solid rgb(0 0 0 / 0.08); }
.fa-captions { display: flex; gap: 6px; color: rgb(0 0 0 / 0.55); font-size: 11px; }
.fa-body { padding: 14px; font-size: 12.5px; line-height: 1.55; }
.fa-body h4 { margin: 0 0 6px; font-size: 14px; font-weight: 650; }
.fa-body p { margin: 0 0 10px; color: rgb(0 0 0 / 0.66); }
.fa-commandbar { display: flex; gap: 6px; padding: 8px 14px; border-top: 1px solid rgb(0 0 0 / 0.08); }
.fa-cmdbtn { border: 1px solid rgb(0 0 0 / 0.12); border-radius: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; background: rgb(255 255 255 / 0.5); color: inherit; }
.fa-cmdbtn:hover { background: rgb(255 255 255 / 0.85); }
/* 回退:官方 AlwaysUseFallback;on 时全部材质层退为纯色 */
.fa-scene[data-fallback="on"] .fa-acrylic { background: #f3f3f3; -webkit-backdrop-filter: none; backdrop-filter: none; }
.fa-scene[data-fallback="on"] .fa-lum, .fa-scene[data-fallback="on"] .fa-noise { opacity: 0; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .fa-acrylic { background: #f3f3f3; -webkit-backdrop-filter: none; backdrop-filter: none; }
  .fa-lum, .fa-noise { opacity: 0; }
}
.fa-badge {
  position: absolute; left: 12px; bottom: 10px; margin: 0; display: flex; gap: 8px; flex-wrap: wrap;
}
.fa-badge span { padding: 3px 10px; border-radius: 999px; font-size: 11px; color: #fff; background: rgb(0 0 0 / 0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.fa-toolbar {
  position: absolute; right: 12px; top: 12px; display: flex; gap: 2px; padding: 3px;
  border-radius: 999px; background: rgb(0 0 0 / 0.35);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.fa-toolbar button { border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.fa-toolbar button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
@keyframes fa-in { from { opacity: 0; translate: -50% calc(-50% + 10px); } to { opacity: 1; translate: -50% -50%; } }
@media (prefers-reduced-motion: reduce) {
  .fa-window { animation: none; }
  .fa-acrylic, .fa-lum { transition: none; }
}
`;function w({entryId:o,schema:r}){const e=p(o,r),[n,l]=t.useState(()=>e.get("fallback")),[s,c]=t.useState("alps");return t.useEffect(()=>e.subscribe(()=>{l(e.get("fallback"))}),[e]),a.jsxs(f,{entryId:o,schema:r,children:[a.jsxs("div",{className:"fa-scene","data-fallback":n,children:[a.jsx("img",{src:d(`photos/glass-${s}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async"}),a.jsx("section",{className:"fa-window","aria-label":"in-app acrylic 窗口示例 in-app acrylic window sample",children:a.jsxs("div",{className:"fa-acrylic",children:[a.jsx("div",{className:"fa-lum","aria-hidden":"true"}),a.jsx("div",{className:"fa-noise","aria-hidden":"true"}),a.jsxs("div",{className:"fa-titlebar",children:[a.jsx("span",{children:"in-app acrylic 演示 · In-app acrylic demo"}),a.jsxs("span",{className:"fa-captions","aria-hidden":"true",children:[a.jsx("span",{children:"─"}),a.jsx("span",{children:"☐"}),a.jsx("span",{children:"✕"})]})]}),a.jsxs("div",{className:"fa-body",children:[a.jsx("h4",{children:"亚克力面板 Acrylic Panel"}),a.jsx("p",{children:"模糊 → 亮度层(TintLuminosityOpacity)→ 色调层(TintColor × TintOpacity)→ 噪点层 / blur → luminosity (TintLuminosityOpacity) → tint (TintColor × TintOpacity) → noise."}),a.jsx("p",{children:"tintOpacity / lum 默认 0.6 / 0.35 为社区常见值,官方未公布默认(未证实) / The 0.6 / 0.35 defaults are community-common; no official defaults are published (unverified)."})]}),a.jsxs("div",{className:"fa-commandbar",children:[a.jsx("button",{type:"button",className:"fa-cmdbtn",children:"命令 Command"}),a.jsx("button",{type:"button",className:"fa-cmdbtn",children:"确定 OK"})]})]})}),a.jsx("div",{className:"fa-toolbar",role:"group","aria-label":"背景切换 Backdrop switcher",children:b.map(i=>a.jsx("button",{type:"button","aria-pressed":s===i.id,title:i.en,onClick:()=>c(i.id),children:i.zh},i.id))}),a.jsxs("p",{className:"fa-badge","aria-live":"polite",children:[a.jsx("span",{children:n==="on"?"AlwaysUseFallback:纯色回退 solid fallback":"亚克力完整栈 acrylic stack"}),a.jsx("span",{children:"层序 blur → luminosity → tint → noise"})]})]}),a.jsx("style",{children:x})]})}export{w as default};
