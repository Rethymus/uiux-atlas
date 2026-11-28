import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as j}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const y=14,E=30,N=`
.so-stage { position: absolute; inset: 0; }
.so-outer {
  position: absolute; inset: 0; overflow-y: auto; overscroll-behavior: contain;
  padding: 34px 14px 54px;
  scrollbar-width: thin;
}
.so-outer[data-locked="true"] { overflow: hidden; }
.so-page { display: flex; flex-direction: column; gap: 6px; }
.so-row {
  padding: 9px 12px; border-radius: 9px; font-size: 12px; color: var(--text-dim);
  background: color-mix(in srgb, var(--border) 22%, transparent);
}
.so-modal {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  width: min(300px, calc(100% - 32px)); max-height: calc(100% - 90px);
  display: flex; flex-direction: column;
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.32);
  z-index: 5;
}
.so-modal-head {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 12px 8px; font-size: 13px; font-weight: 650;
}
.so-close {
  margin-left: auto; border: 1px solid var(--border); background: var(--surface);
  border-radius: 7px; padding: 3px 9px; font-size: 12px; cursor: pointer; color: var(--text);
}
.so-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.so-inner {
  overflow-y: auto; overscroll-behavior: var(--ob-inner, contain);
  padding: 0 8px 8px; scrollbar-width: thin; touch-action: pan-y;
  outline: none;
}
.so-inner:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.so-item { padding: 7px 8px; border-radius: 7px; font-size: 12px; color: var(--text); border-bottom: 1px solid color-mix(in srgb, var(--border) 40%, transparent); }
.so-bar {
  position: absolute; left: 10px; right: 10px; bottom: 10px; z-index: 6;
  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  padding: 7px 10px; border-radius: 10px;
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  border: 1px solid var(--border);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  font-size: 12px; color: var(--text-dim); font-variant-numeric: tabular-nums;
}
.so-open {
  border: 1px solid transparent; border-radius: 999px; padding: 4px 14px;
  font-size: 12px; font-weight: 600; cursor: pointer; color: #fff;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
}
.so-open:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.so-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.so-tag[data-hot="true"] { border-color: oklch(0.62 0.2 25); color: oklch(0.62 0.2 25); }
.so-hint { font-size: 11px; color: var(--text-faint); }
@media (max-width: 480px) {
  .so-outer { padding: 30px 10px 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .so-outer, .so-inner { scroll-behavior: auto; }
  .so-bar { -webkit-backdrop-filter: none; backdrop-filter: none; }
}
`;function M({entryId:d,schema:c}){const t=j(d,c),p=()=>({innerMode:t.get("innerMode"),lockPage:t.get("lockPage")}),[a,g]=o.useState(p),[n,i]=o.useState(!0),[u,h]=o.useState(0),x=o.useRef(n);x.current=n;const f=o.useRef(null),v=o.useRef(null),b=o.useRef(null),m=o.useRef(null),l=o.useRef(!1);return o.useEffect(()=>t.subscribe(()=>{g(p())}),[t]),o.useEffect(()=>{n?b.current?.focus():m.current?.focus()},[n]),o.useEffect(()=>{const s=f.current;if(!s)return;const r=()=>{x.current&&l.current&&h(k=>k+1)};return s.addEventListener("scroll",r,{passive:!0}),()=>s.removeEventListener("scroll",r)},[]),o.useEffect(()=>{if(!n)return;const s=r=>{r.key==="Escape"&&i(!1)};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[n]),e.jsx(w,{entryId:d,schema:c,children:e.jsxs("div",{className:"so-stage",children:[e.jsx("div",{className:"so-outer",ref:f,"data-locked":a.lockPage==="on"?"true":"false",children:e.jsx("div",{className:"so-page","aria-hidden":"true",children:Array.from({length:y},(s,r)=>e.jsxs("div",{className:"so-row",children:["背景页面第 ",r+1," 行 · background page row ",r+1,"(滚动我试试)"]},r))})}),n&&e.jsxs("div",{className:"so-modal",role:"dialog","aria-modal":"true","aria-label":"弹层内滚动区 overlay scroller",children:[e.jsxs("div",{className:"so-modal-head",children:[e.jsx("span",{children:"弹层 · 内层滚动区"}),e.jsx("button",{type:"button",className:"so-close",ref:b,onClick:()=>i(!1),children:"关闭 ✕"})]}),e.jsx("div",{className:"so-inner",ref:v,tabIndex:0,role:"region","aria-label":`内层列表 overscroll-behavior: ${a.innerMode}`,onPointerEnter:()=>{l.current=!0},onPointerLeave:()=>{l.current=!1},children:Array.from({length:E},(s,r)=>e.jsxs("div",{className:"so-item",children:["条目 ",r+1," · item ",r+1]},r))})]}),e.jsxs("div",{className:"so-bar",children:[e.jsx("button",{type:"button",className:"so-open",ref:m,"aria-expanded":n,onClick:()=>i(s=>!s),children:n?"关闭弹层 Close":"打开弹层 Open"}),e.jsxs("span",{className:"so-tag",children:["inner: ",a.innerMode]}),e.jsxs("span",{className:"so-tag",children:["锁背景: ",a.lockPage==="on"?"on":"off"]}),e.jsxs("span",{className:"so-tag","data-hot":u>0?"true":"false",children:["滚动链穿透 ",u," 次"]}),e.jsxs("span",{className:"so-hint",children:["弹层开着时在内层滚到底:",a.innerMode==="auto"?"会链出滚背景(auto)":"被拦住(contain/none)"," / scroll the inner list to its end: chaining ",a.innerMode==="auto"?"happens (auto)":"is blocked","."]})]}),e.jsx("style",{children:N})]})})}export{M as default};
