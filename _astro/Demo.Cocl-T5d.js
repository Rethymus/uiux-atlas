import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g,s as u}from"./color.DuEPkvq5.js";import{w as b}from"./urls.C_nDjrQ8.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const l=[{id:"alps",zh:"雪山",en:"Alps photo",w:1600,h:1067},{id:"nebula",zh:"星空",en:"Nebula photo",w:1600,h:1520}],x=[{id:"original",zh:"原图",en:"Original",fn:null},{id:"blur",zh:"模糊",en:"blur",fn:"blur(var(--ff-blur))"},{id:"brightness",zh:"亮度",en:"brightness",fn:"brightness(var(--ff-brightness))"},{id:"contrast",zh:"对比",en:"contrast",fn:"contrast(var(--ff-contrast))"},{id:"hue",zh:"色相",en:"hue-rotate",fn:"hue-rotate(var(--ff-hue))"},{id:"combo",zh:"组合",en:"combined",fn:"blur(var(--ff-blur)) brightness(var(--ff-brightness)) contrast(var(--ff-contrast)) hue-rotate(var(--ff-hue))"}],v=["blur","brightness","contrast","hue-rotate"],y=`
.demo-stage {
  --ff-blur: 0px;
  --ff-brightness: 100%;
  --ff-contrast: 100%;
  --ff-hue: 0deg;
}
.ff-scene { position: absolute; inset: 0; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.ff-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ff-title { margin: 0; font-size: 13px; font-weight: 600; color: inherit; opacity: 0.75; }
.ff-toolbar { display: flex; gap: 2px; padding: 3px; border-radius: 999px; background: rgb(0 0 0 / 0.35); }
.ff-toolbar button { border: 0; border-radius: 999px; padding: 3px 12px; font-size: 12px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.ff-toolbar button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
.ff-grid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px; min-height: 0; }
.ff-tile {
  position: relative; margin: 0; overflow: hidden; border-radius: 12px;
  border: 1px solid rgb(255 255 255 / 0.25); background: rgb(0 0 0 / 0.2);
  animation: ff-in 0.45s ease-out both;
}
.ff-tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ff-tile[data-fn="blur"] img { filter: blur(var(--ff-blur)); }
.ff-tile[data-fn="brightness"] img { filter: brightness(var(--ff-brightness)); }
.ff-tile[data-fn="contrast"] img { filter: contrast(var(--ff-contrast)); }
.ff-tile[data-fn="hue"] img { filter: hue-rotate(var(--ff-hue)); }
.ff-tile[data-fn="combo"] img {
  filter: blur(var(--ff-blur)) brightness(var(--ff-brightness)) contrast(var(--ff-contrast)) hue-rotate(var(--ff-hue));
}
.ff-tile figcaption {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 1;
  display: flex; justify-content: space-between; align-items: center; gap: 6px;
  padding: 4px 10px; font-size: 11px; color: #fff;
  background: rgb(0 0 0 / 0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
}
.ff-tile figcaption code { font-size: 10.5px; opacity: 0.85; min-width: 0; flex: 1; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ff-tile:nth-child(1) { animation-delay: 0s; } .ff-tile:nth-child(2) { animation-delay: 0.05s; }
.ff-tile:nth-child(3) { animation-delay: 0.1s; } .ff-tile:nth-child(4) { animation-delay: 0.15s; }
.ff-tile:nth-child(5) { animation-delay: 0.2s; } .ff-tile:nth-child(6) { animation-delay: 0.25s; }
@keyframes ff-in {
  from { opacity: 0; translate: 0 8px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ff-tile { animation: none; }
}
`;function N({entryId:s,schema:f}){const i=g(s,f),[a,d]=n.useState("nebula"),[c,p]=n.useState(()=>i.snapshot());n.useEffect(()=>i.subscribe(()=>{p(i.snapshot())}),[i]);const o=e=>u(i.param(e),c[e]);return t.jsxs(m,{entryId:s,schema:f,children:[t.jsxs("div",{className:"ff-scene",children:[t.jsxs("div",{className:"ff-head",children:[t.jsx("p",{className:"ff-title",children:"同图多滤镜对比 Same image · multiple filters"}),t.jsx("div",{className:"ff-toolbar",role:"group","aria-label":"源图切换 Source image switcher",children:l.map(e=>t.jsx("button",{type:"button","aria-pressed":a===e.id,title:e.en,onClick:()=>d(e.id),children:e.zh},e.id))})]}),t.jsx("div",{className:"ff-grid",children:x.map(e=>{const r=l.find(h=>h.id===a);return t.jsxs("figure",{className:"ff-tile","data-fn":e.id,children:[t.jsx("img",{src:b(`photos/glass-${a}.jpg`),alt:`${r.zh}/${r.en} · ${e.en} 滤镜示例 filtered sample`,width:r.w,height:r.h,loading:"lazy",decoding:"async"}),t.jsxs("figcaption",{children:[t.jsxs("span",{children:[e.zh," ",e.en]}),t.jsx("code",{children:e.fn?e.id==="combo"?v.map(o).join("+"):o(e.id==="hue"?"hue-rotate":e.id):"—"})]})]},e.id)})})]}),t.jsx("style",{children:y})]})}export{N as default};
