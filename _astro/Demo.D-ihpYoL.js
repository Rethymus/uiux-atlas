import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as f}from"./color.DuEPkvq5.js";import{w as c}from"./urls.C_nDjrQ8.js";import{D as x}from"./DemoStage.vW1CgYCd.js";const b=[{id:"alps",zh:"雪山",en:"Alps photo"},{id:"nebula",zh:"星空",en:"Nebula photo"}],t=["文档 Documents","设置 Settings","图库 Gallery","工作区 Workspace","收藏 Favorites","回收站 Recycle"],g=`
.demo-stage {
  --fm-tint: 50%;
}
.fm-scene { position: absolute; inset: 0; overflow: hidden; }
.fm-scene > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
/* Mica 主窗口:取样层(壁纸副本+重度滤镜,静态)+ 着色层 + 内容 */
.fm-window {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  width: min(460px, calc(100% - 32px)); height: min(320px, 82%);
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 18px 48px rgb(0 0 0 / 0.4);
  animation: fm-in 0.45s ease-out both;
}
.fm-sample {
  position: absolute; inset: -20%;
  width: 140%; height: 140%; object-fit: cover;
  filter: blur(64px) saturate(60%) brightness(0.92); /* 社区近似,官方未公布处理参数 */
}
.fm-tintlayer { position: absolute; inset: 0; opacity: var(--fm-tint); transition: opacity 0.25s ease, background 0.25s ease; }
.fm-window[data-variant="mica"] .fm-tintlayer { background: rgb(243 243 243 / 0.65); }
.fm-window[data-variant="mica-alt"] .fm-tintlayer { background: rgb(76 60 154 / 0.75); } /* Mica Alt 强着色 */
.fm-chrome { position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; color: #1c1c26; }
.fm-titlebar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 12.5px; }
.fm-titlebar .fm-tabs { display: flex; gap: 6px; }
.fm-titlebar .fm-tabs span { padding: 3px 10px; border-radius: 6px; font-size: 11px; background: rgb(255 255 255 / 0.4); }
.fm-captions { display: flex; gap: 6px; color: rgb(0 0 0 / 0.5); font-size: 11px; }
.fm-content { flex: 1; padding: 6px 14px 10px; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.fm-scroll { flex: 1; overflow: hidden; position: relative; border-radius: 8px; background: rgb(255 255 255 / 0.35); }
/* 内容条持续滚动:取样背景纹丝不动——『单次采样』的行为演示 */
.fm-strip { position: absolute; left: 0; right: 0; display: flex; gap: 8px; padding: 6px 8px; }
.fm-strip[data-lane="top"] { top: 0; animation: fm-scroll 12s linear infinite; }
.fm-strip[data-lane="bottom"] { bottom: 0; animation: fm-scroll 16s linear infinite reverse; }
.fm-chip { flex: none; padding: 5px 12px; border-radius: 8px; font-size: 11.5px; background: rgb(255 255 255 / 0.65); box-shadow: 0 1px 4px rgb(0 0 0 / 0.12); white-space: nowrap; }
.fm-foot { display: flex; align-items: center; gap: 8px; font-size: 11px; }
/* 对照:Acrylic 条用实时 backdrop-filter,透出并模糊身后内容 */
.fm-acrylic-strip {
  display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 8px;
  font-size: 11.5px; color: #101318;
  background: rgb(243 243 243 / 0.5);
  -webkit-backdrop-filter: blur(14px) saturate(1.2); backdrop-filter: blur(14px) saturate(1.2);
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.15);
}
.fm-badge {
  position: absolute; left: 12px; bottom: 10px; margin: 0; display: flex; gap: 8px; flex-wrap: wrap;
}
.fm-badge span { padding: 3px 10px; border-radius: 999px; font-size: 11px; color: #fff; background: rgb(0 0 0 / 0.45); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
.fm-toolbar {
  position: absolute; right: 12px; top: 12px; display: flex; gap: 2px; padding: 3px;
  border-radius: 999px; background: rgb(0 0 0 / 0.35);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.fm-toolbar button { border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px; cursor: pointer; color: rgb(255 255 255 / 0.75); background: transparent; }
.fm-toolbar button[aria-pressed="true"] { background: rgb(255 255 255 / 0.25); color: #fff; }
@keyframes fm-in { from { opacity: 0; translate: -50% calc(-50% + 10px); } to { opacity: 1; translate: -50% -50%; } }
@keyframes fm-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .fm-window { animation: none; }
  .fm-strip { animation: none; }
  .fm-tintlayer { transition: none; }
}
`;function v({entryId:l,schema:p}){const i=f(l,p),[s,d]=n.useState(()=>i.get("variant")),[r,m]=n.useState("alps");return n.useEffect(()=>i.subscribe(()=>{d(i.get("variant"))}),[i]),a.jsxs(x,{entryId:l,schema:p,children:[a.jsxs("div",{className:"fm-scene",children:[a.jsx("img",{src:c(`photos/glass-${r}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async"}),a.jsxs("section",{className:"fm-window","data-variant":s,"aria-label":"Mica 主窗口示例 Mica window sample",children:[a.jsx("img",{className:"fm-sample",src:c(`photos/glass-${r}.jpg`),alt:"",width:1600,height:1067,loading:"lazy",decoding:"async","aria-hidden":"true"}),a.jsx("div",{className:"fm-tintlayer","aria-hidden":"true"}),a.jsxs("div",{className:"fm-chrome",children:[a.jsxs("div",{className:"fm-titlebar",children:[a.jsx("span",{className:"fm-tabs","aria-hidden":"true",children:a.jsx("span",{children:s==="mica-alt"?"Mica Alt · tab 标题栏":"Mica · 主窗口"})}),a.jsxs("span",{className:"fm-captions","aria-hidden":"true",children:[a.jsx("span",{children:"─"}),a.jsx("span",{children:"☐"}),a.jsx("span",{children:"✕"})]})]}),a.jsxs("div",{className:"fm-content",children:[a.jsxs("div",{className:"fm-scroll","aria-hidden":"true",children:[a.jsx("div",{className:"fm-strip","data-lane":"top",children:t.concat(t).map((e,o)=>a.jsx("span",{className:"fm-chip",children:e},`t${o}`))}),a.jsx("div",{className:"fm-strip","data-lane":"bottom",children:t.concat(t).map((e,o)=>a.jsx("span",{className:"fm-chip",children:e},`b${o}`))})]}),a.jsxs("div",{className:"fm-foot",children:[a.jsx("div",{className:"fm-acrylic-strip",children:"Acrylic 对照 · live backdrop-filter:实时透出并模糊身后内容 / live see-through + blur"}),a.jsx("span",{children:"Mica 不透明:取样背景不随内容变化 / Mica is opaque: the sampled background never reacts."})]})]})]})]}),a.jsx("div",{className:"fm-toolbar",role:"group","aria-label":"壁纸切换 Wallpaper switcher",children:b.map(e=>a.jsx("button",{type:"button","aria-pressed":r===e.id,title:e.en,onClick:()=>m(e.id),children:e.zh},e.id))}),a.jsxs("p",{className:"fm-badge","aria-live":"polite",children:[a.jsx("span",{children:s==="mica-alt"?"mica-alt · 强着色(官方变体)":"mica · 标准云母(官方变体)"}),a.jsx("span",{children:"不透明 · 单次壁纸采样 opaque · single wallpaper sample"}),a.jsx("span",{children:"tint 默认 50%:社区常见值,官方未公布(未证实)"})]})]}),a.jsx("style",{children:g})]})}export{v as default};
