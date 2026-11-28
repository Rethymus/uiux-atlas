import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as y}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";const x={"2-apart":[[-90,0],[90,0]],"2-merged":[[-26,0],[26,0]],"3-apart":[[-96,-52],[96,-52],[0,78]],"3-merged":[[-30,-8],[30,8],[0,30]],"5-apart":[[-88,-56],[88,-56],[-88,62],[88,62],[0,4]],"5-merged":[[-34,-20],[34,-20],[-34,22],[34,22],[0,2]]};function C({entryId:l,schema:b}){const n=y(l,b),d=()=>({duration:n.get("duration"),blobs:n.get("blobs")}),[r,f]=a.useState(d),[v,k]=a.useState("dark"),[u,g]=a.useState(!1),[s,j]=a.useState(!1),i=a.useRef(r);i.current=r;const p=a.useRef("dark"),c=a.useRef(null),m=t=>{p.current=t,k(t),g(!1)},w=()=>{c.current!==null&&(window.clearTimeout(c.current),c.current=null);const t=p.current==="dark"?"light":"dark";if(g(!0),s||i.current.duration<=0){m(t);return}c.current=window.setTimeout(()=>{c.current=null,m(t)},Math.max(0,i.current.duration))};a.useEffect(()=>n.subscribe(()=>{f(d())}),[n]),a.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>j(t.matches);return o(),t.addEventListener("change",o),()=>t.removeEventListener("change",o)},[]),a.useEffect(()=>()=>{c.current!==null&&window.clearTimeout(c.current)},[]);const h=r.blobs==="2"?2:r.blobs==="5"?5:3,S=x[`${h}-${u?"merged":"apart"}`]??x["3-apart"];return e.jsx(E,{entryId:l,schema:b,children:e.jsxs("div",{className:"cblob-stage","data-fx-stage":"","data-fx-theme":v,"data-fx-duration":s?"0":String(Math.max(0,Math.round(r.duration))),"data-reduced":s?"true":"false",style:{"--cb-dur":`${r.duration}ms`},children:[e.jsx("div",{className:"cblob-liquid","aria-hidden":"true",children:S.map(([t,o],N)=>e.jsx("span",{className:"cblob-dot",style:{transform:`translate(${t}px, ${o}px)`}},N))}),e.jsxs("div",{className:"cblob-page",children:[e.jsx("p",{className:"cblob-title",children:"纯 CSS 形状融合 CSS Blobbing"}),e.jsxs("div",{className:"cblob-chips","aria-hidden":"true",children:[e.jsxs("span",{className:"cblob-chip",children:["contrast ",String(n.get("contrast"))]}),e.jsxs("span",{className:"cblob-chip",children:["blur ",String(n.get("blur"))]}),e.jsxs("span",{className:"cblob-chip",children:["blobs ",h]}),e.jsx("span",{className:"cblob-chip",children:s?"duration 0 (reduce)":`${r.duration}ms`}),e.jsx("span",{className:"cblob-chip",children:u?"聚拢中 congealing":"分散 scattered"})]}),e.jsx("p",{className:"cblob-note",children:"点击后圆点聚拢:模糊区互相抬升对比即粘连成一滴 / On click the dots congeal — their halos raise each other's contrast into one drop. Text stays outside the filtered layer; cost climbs with blob count."})]}),e.jsx("button",{type:"button",className:"cblob-toggle","data-fx-toggle":!0,onClick:w,children:"切换主题 Toggle"}),e.jsx("style",{children:z})]})})}const z=`
/* 舞台主题令牌只作用于本舞台(不动站点主题);data-fx-theme 切换令牌组 */
.cblob-stage {
  position: absolute; inset: 0; overflow: hidden;
  --cb-bg-dark: #12161f;
  --cb-bg-light: #eef1f6;
  --cb-fg-dark: #e8ecf4;
  --cb-fg-light: #1b2230;
  --cb-line-dark: rgba(255, 255, 255, 0.16);
  --cb-line-light: rgba(15, 23, 42, 0.16);
  --cb-panel-dark: rgba(255, 255, 255, 0.06);
  --cb-panel-light: rgba(15, 23, 42, 0.05);
  /* 墨色 = demo 设计值:对两主题底色都高对比(原方要点②,浅灰配白底不行) */
  --cb-ink-dark: #dfe8f6;
  --cb-ink-light: #22304a;
  background: var(--cb-bg-dark);
  color: var(--cb-fg-dark);
}
.cblob-stage[data-fx-theme="light"] { background: var(--cb-bg-light); color: var(--cb-fg-light); }
.cblob-stage[data-fx-theme="dark"] { --cb-ink: var(--cb-ink-dark); --cb-line: var(--cb-line-dark); --cb-panel: var(--cb-panel-dark); --cb-bg: var(--cb-bg-dark); }
.cblob-stage[data-fx-theme="light"] { --cb-ink: var(--cb-ink-light); --cb-line: var(--cb-line-light); --cb-panel: var(--cb-panel-light); --cb-bg: var(--cb-bg-light); }
/* 液体层:contrast 来自 --cb-contrast(cssVar 型参数,DemoStage 注入);
   显式实底 = 层背景必须与本主题舞台底一致(原方要点①),否则 contrast 无从生效 */
.cblob-liquid {
  position: absolute; inset: 0; z-index: 0;
  background: var(--cb-bg);
  filter: contrast(var(--cb-contrast, 20));
}
.cblob-dot {
  position: absolute; left: 50%; top: 50%; width: 64px; height: 64px;
  margin: -32px 0 0 -32px; border-radius: 50%;
  background: var(--cb-ink);
  filter: blur(var(--cb-blur, 15px));
  transition-property: transform; transition-duration: var(--cb-dur, 500ms);
  transition-timing-function: cubic-bezier(0.3, 0, 0.2, 1);
  will-change: transform;
}
.cblob-stage[data-reduced="true"] .cblob-dot { transition-duration: 0s; }
/* 文字与控件全部在滤镜层之外(contrast 会撕碎中间调内容) */
.cblob-page {
  position: absolute; left: 16px; right: 64px; top: calc(var(--plate-h, 40px) + 10px); z-index: 1;
  display: flex; flex-direction: column; gap: 8px; align-items: flex-start;
  pointer-events: none;
}
.cblob-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.cblob-chips { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; font-variant-numeric: tabular-nums; }
.cblob-chip { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--cb-line); background: var(--cb-panel); }
.cblob-note { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.75; text-align: left; }
.cblob-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--cb-line); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--cb-panel); color: inherit;
}
.cblob-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`;export{C as default};
