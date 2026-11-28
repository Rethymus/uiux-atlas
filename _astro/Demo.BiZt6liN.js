import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{r as g}from"./index.Ds4P5BjG.js";import{g as L,s as b}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";import{u as D}from"./use-reduced-motion.p3D3Z0_d.js";import"./index.CBsppStC.js";const y=[{id:"coral",zh:"珊瑚 Coral",color:"oklch(0.72 0.16 30)"},{id:"amber",zh:"琥珀 Amber",color:"oklch(0.78 0.14 80)"},{id:"jade",zh:"翡翠 Jade",color:"oklch(0.7 0.14 160)"},{id:"lapis",zh:"青金 Lapis",color:"oklch(0.6 0.14 260)"}],P=`
.vt-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 4px 2px; }
.vt-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vt-card {
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 12px; border: 0; border-radius: 12px; cursor: pointer;
  color: oklch(0.22 0.03 260); font-size: 13px; font-weight: 600; text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
}
.vt-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.vt-hero {
  flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: flex-end;
  padding: 16px; border-radius: 14px;
  color: oklch(0.22 0.03 260);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
}
.vt-hero h3 { margin: 0 0 4px; font-size: 16px; }
.vt-hero p { margin: 0 0 12px; font-size: 12px; line-height: 1.6; opacity: 0.75; }
.vt-back {
  align-self: flex-start; border: 0; border-radius: 999px; padding: 6px 16px;
  font-size: 12px; cursor: pointer;
  background: rgba(20, 24, 34, 0.72); color: #fff;
}
.vt-back:focus-visible { outline: 2px solid var(--bg); outline-offset: 2px; }
.vt-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--text-dim); }
.vt-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); font-variant-numeric: tabular-nums; }
.vt-chip-warn { color: oklch(0.65 0.15 70); }
/* 快照动画全部可覆写:duration/easing 参数经此生效(伪元素树挂在 html 下,变量由 demo 镜像到 :root) */
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: var(--vt-duration, 300ms);
  animation-timing-function: var(--vt-easing, cubic-bezier(0.4, 0, 0.2, 1));
}
/* morph 模式共享名:同一时刻至多一个元素持有(官方唯一性警告) */
.vt-name { view-transition-name: vt-card; }
`;function B({entryId:l,schema:d}){const r=L(l,d),p=()=>({mode:r.get("mode"),duration:r.get("duration"),easing:r.get("easing")}),[a,j]=n.useState(p),[u,m]=n.useState(null),[v,w]=n.useState(null),f=D()===!0,o=n.useRef({}),k=n.useRef(null);n.useEffect(()=>r.subscribe(()=>{j(p())}),[r]),n.useEffect(()=>{const e=()=>{const c=document.documentElement;c.style.setProperty("--vt-duration",b(r.param("duration"),r.get("duration"))),c.style.setProperty("--vt-easing",b(r.param("easing"),r.get("easing")))};e();const s=r.subscribe(e);return()=>{s(),document.documentElement.style.removeProperty("--vt-duration"),document.documentElement.style.removeProperty("--vt-easing")}},[r]),n.useEffect(()=>{w(typeof document.startViewTransition=="function")},[]),n.useEffect(()=>{a.mode!=="morph"&&Object.values(o.current).forEach(e=>e?.classList.remove("vt-name"))},[a.mode]);const h=v===!0&&!f,x=()=>document,z=e=>{Object.values(o.current).forEach(N=>N?.classList.remove("vt-name")),o.current[e]?.classList.add("vt-name");const s=()=>g.flushSync(()=>m(e));if(!h){s(),o.current[e]?.classList.remove("vt-name");return}x().startViewTransition(s).finished.catch(()=>{}).finally(()=>o.current[e]?.classList.remove("vt-name"))},E=e=>{const s=()=>{g.flushSync(()=>m(null)),a.mode==="morph"&&o.current[e]?.classList.add("vt-name")};if(!h){s(),o.current[e]?.classList.remove("vt-name");return}x().startViewTransition(s).finished.catch(()=>{}).finally(()=>o.current[e]?.classList.remove("vt-name"))},i=u?y.find(e=>e.id===u):null;return t.jsx(S,{entryId:l,schema:d,children:t.jsxs("div",{className:"vt-scene",children:[i?t.jsxs("div",{ref:k,className:"vt-hero"+(a.mode==="morph"?" vt-name":""),style:{background:i.color},children:[t.jsxs("h3",{children:[i.zh," · 详情 Detail"]}),t.jsx("p",{children:"morph 模式下,这张主图与列表里被点的卡片携带同一 view-transition-name—— 两者不是同一 DOM 节点,group 伪元素自动补间位置与宽高 / The hero and the clicked card share one view-transition-name; the group pseudo-element tweens position and size."}),t.jsx("button",{type:"button",className:"vt-back",onClick:()=>E(i.id),children:"返回列表 Back to list"})]}):t.jsx("div",{className:"vt-grid",role:"group","aria-label":"卡片列表 card list",children:y.map(e=>t.jsx("button",{type:"button",className:"vt-card",style:{background:e.color},ref:s=>{o.current[e.id]=s},onClick:()=>z(e.id),children:e.zh},e.id))}),t.jsxs("div",{className:"vt-meta",children:[t.jsxs("span",{className:"vt-chip",children:["mode: ",a.mode]}),t.jsxs("span",{className:"vt-chip",children:["duration: ",a.duration,"ms"]}),t.jsxs("span",{className:"vt-chip",children:["easing: cubic-bezier(",a.easing.join(", "),")"]}),v===!1&&t.jsx("span",{className:"vt-chip vt-chip-warn",children:"无 startViewTransition,直切 / unsupported, hard cut"}),f&&t.jsx("span",{className:"vt-chip",children:"reduced-motion: 直切 / hard cut"})]}),t.jsx("style",{children:P})]})})}export{B as default};
