import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as D}from"./color.DuEPkvq5.js";import{D as M}from"./DemoStage.vW1CgYCd.js";const p=[{label:"山脉 Ridge",bg:"linear-gradient(160deg, oklch(0.62 0.1 250), oklch(0.42 0.09 262))"},{label:"森林 Forest",bg:"linear-gradient(160deg, oklch(0.66 0.12 165), oklch(0.44 0.1 172))"},{label:"沙漠 Desert",bg:"linear-gradient(160deg, oklch(0.72 0.12 70), oklch(0.52 0.12 55))"},{label:"极光 Aurora",bg:"linear-gradient(160deg, oklch(0.6 0.13 305), oklch(0.44 0.12 200))"},{label:"熔岩 Lava",bg:"linear-gradient(160deg, oklch(0.64 0.14 30), oklch(0.46 0.13 15))"},{label:"海洋 Ocean",bg:"linear-gradient(160deg, oklch(0.64 0.11 220), oklch(0.44 0.1 235))"},{label:"花田 Meadow",bg:"linear-gradient(160deg, oklch(0.7 0.12 120), oklch(0.5 0.11 140))"},{label:"夜空 Night",bg:"linear-gradient(160deg, oklch(0.5 0.09 275), oklch(0.34 0.07 285))"}],z=`
.demo-stage {
  --snap-strict: mandatory;
  --snap-align: start;
  --snap-stop: always;
  --snap-padding: 16px;
}
.ss-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px 20px; overflow: hidden; }
.ss-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }
.ss-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.ss-btn:hover { border-color: var(--accent); color: var(--accent); }
.ss-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ss-rail {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 16px;                       /* 补研 12§4 片段同款 16px 槽距 */
  overflow-x: auto;
  overscroll-behavior-x: contain;  /* 防横滑链出页面(调研 10§8.1) */
  scroll-snap-type: x var(--snap-strict, mandatory);
  scroll-padding-inline: var(--snap-padding, 16px);
  padding-block: 4px;
  scrollbar-width: thin;
  border-radius: 12px;
}
.ss-rail:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ss-card {
  flex: 0 0 auto;
  width: min(230px, 68%);
  border: 0;
  border-radius: 14px;
  padding: 14px 16px;
  color: #fff;
  text-align: left;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  scroll-snap-align: var(--snap-align, start);
  scroll-snap-stop: var(--snap-stop, always);
  cursor: pointer;
}
.ss-card strong { font-size: 15px; }
.ss-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;function $({entryId:g,schema:u}){const n=D(g,u),[b,v]=a.useState(()=>n.get("strictness")),[y,k]=a.useState(()=>n.get("align")),[j,S]=a.useState(()=>n.get("stop")),[E,w]=a.useState(()=>n.get("padding")),[x,N]=a.useState(!1),[L,C]=a.useState(0),[h,R]=a.useState(null),c=a.useRef(null),d=a.useRef(0);a.useEffect(()=>n.subscribe(()=>{v(n.get("strictness")),k(n.get("align")),S(n.get("stop")),w(n.get("padding"))}),[n]),a.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>N(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]),a.useEffect(()=>{R("onsnapchange"in document.createElement("div"))},[]),a.useEffect(()=>{const e=c.current;if(!e)return;const t=()=>{const l=e.firstElementChild;if(!l)return;const i=getComputedStyle(e),F=parseFloat(i.columnGap||"0")||0,A=parseFloat(i.scrollPaddingLeft||"0")||0,f=l.offsetWidth+F;f<=0||C(Math.min(p.length-1,Math.max(0,Math.round((e.scrollLeft+A)/f))))},r=()=>{cancelAnimationFrame(d.current),d.current=requestAnimationFrame(t)};e.addEventListener("scroll",r,{passive:!0});const o=()=>t();return e.addEventListener("scrollsnapchange",o),()=>{e.removeEventListener("scroll",r),e.removeEventListener("scrollsnapchange",o),cancelAnimationFrame(d.current)}},[]);const m=e=>{const t=c.current;if(!t)return;const r=t.firstElementChild;if(!r)return;const o=getComputedStyle(t),l=parseFloat(o.columnGap||"0")||0,i=r.offsetWidth+l;t.scrollBy({left:e*i,behavior:x?"auto":"smooth"})};return s.jsxs(M,{entryId:g,schema:u,children:[s.jsxs("div",{className:"ss-stage",children:[s.jsxs("div",{className:"ss-toolbar",children:[s.jsx("button",{type:"button",className:"ss-btn",onClick:()=>m(-1),"aria-label":"上一张 / previous card",children:"← 上一张 Prev"}),s.jsx("button",{type:"button",className:"ss-btn",onClick:()=>m(1),"aria-label":"下一张 / next card",children:"下一张 Next →"}),s.jsxs("span",{className:"ss-chip","aria-live":"polite",children:["吸附卡片 ",L+1," / ",p.length]}),s.jsxs("span",{className:"ss-chip",children:[b," · ",y," · stop: ",j," · padding ",E,"px"]}),h!==null&&s.jsxs("span",{className:"ss-chip",children:["scrollsnapchange ",h?"可用 supported":"不可用 → 滚动位置兜底 fallback"]}),x&&s.jsx("span",{className:"ss-chip",children:"reduced-motion: 滚动直达不平滑 / scrolls jump"})]}),s.jsx("div",{className:"ss-rail",ref:c,tabIndex:0,role:"group","aria-label":"吸附卡片轨道:左右滚动或使用按钮 / snapped card rail: scroll or use the buttons",children:p.map((e,t)=>s.jsxs("div",{className:"ss-card",style:{background:e.bg},children:[s.jsx("strong",{children:`#${t+1} ${e.label}`}),s.jsx("span",{children:"snap target / 吸附点"})]},e.label))}),s.jsx("p",{className:"ss-hint",children:"拖动轨道或用按钮翻卡:mandatory 一卡一停(快甩也不越过),proximity 只在接近吸附点时拉一下;align 改变卡片停靠的对齐边, padding 内缩 snapport(吸顶头部留位)。demo 内容量已知才敢用 mandatory——MDN 警告内容超高时 mandatory 可能让人永远看不到某段内容 / drag the rail or step with the buttons: mandatory stops one card per swipe, proximity only pulls near snap points; align picks the docking edge, padding insets the snapport. mandatory is safe here only because the content amount is known."})]}),s.jsx("style",{children:z})]})}export{$ as default};
