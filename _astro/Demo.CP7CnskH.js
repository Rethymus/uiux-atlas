import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as N}from"./color.DuEPkvq5.js";import{D as C}from"./DemoStage.vW1CgYCd.js";const n=[{id:"sel-opt-bj",value:"北京 Beijing"},{id:"sel-opt-sh",value:"上海 Shanghai"},{id:"sel-opt-gz",value:"广州 Guangzhou"},{id:"sel-opt-sz",value:"深圳 Shenzhen"},{id:"sel-opt-hz",value:"杭州 Hangzhou"}],F=`
.sel-stage { width: min(280px, calc(100% - 48px)); }
.sel-wrap { position: relative; }
.sel-trigger {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.sel-trigger:hover { border-color: #1677ff; }
.sel-stage[data-size="sm"] .sel-trigger { height: 24px; font-size: 12px; padding: 0 8px; border-radius: 4px; }
.sel-stage[data-size="md"] .sel-trigger { height: 32px; font-size: 14px; padding: 0 12px; border-radius: 6px; }
.sel-stage[data-size="lg"] .sel-trigger { height: 40px; font-size: 16px; padding: 0 12px; border-radius: 6px; }
.sel-stage[data-status="default"] .sel-trigger { border-color: #d9d9d9; }
.sel-stage[data-status="error"] .sel-trigger { border-color: #ff4d4f; }
.sel-stage[data-status="warning"] .sel-trigger { border-color: #faad14; }
.sel-stage[data-clearable="on"] .sel-trigger { padding-right: 30px; }
.sel-trigger:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.sel-trigger[aria-expanded="true"] { border-color: #1677ff; box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent); }
.is-placeholder { color: rgba(0, 0, 0, 0.25); }
.sel-arrow { font-size: 10px; color: rgba(0, 0, 0, 0.45); }
.sel-clear {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  right: 24px;
  z-index: 2;
  width: 18px;
  height: 18px;
  border: 0;
  border-radius: 50%;
  padding: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  background: rgba(0, 0, 0, 0.06);
}
.sel-clear:hover { color: rgba(0, 0, 0, 0.88); background: rgba(0, 0, 0, 0.12); }
.sel-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  margin: 0;
  padding: 4px;
  box-sizing: border-box;
  list-style: none;
  max-height: 256px;
  overflow: auto;
  background: #fff;
  border-radius: 6px;
  z-index: 10;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  animation: sel-pop 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
@keyframes sel-pop {
  from { opacity: 0; translate: 0 -4px; }
  to { opacity: 1; translate: 0 0; }
}
.sel-opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
}
.sel-opt:hover, .sel-opt.is-active { background: rgba(0, 0, 0, 0.04); }
.sel-opt[aria-selected="true"] { background: #E6F4FF; color: #1677ff; }
.sel-opt[aria-selected="true"]:hover, .sel-opt[aria-selected="true"].is-active { background: color-mix(in srgb, #E6F4FF 75%, #91CAFF); }
.sel-check { font-size: 12px; }
.sel-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .sel-trigger { transition: none; }
  .sel-list { animation: none; }
}
`;function I({entryId:x,schema:b}){const a=N(x,b),[y,k]=r.useState(()=>a.get("size")),[j,E]=r.useState(()=>a.get("status")),[f,S]=r.useState(()=>a.get("clearable")),[l,d]=r.useState(null),[s,p]=r.useState(!1),[o,u]=r.useState(0),h=r.useRef(null),g=r.useRef(null),m=r.useRef(null);r.useEffect(()=>a.subscribe(()=>{k(a.get("size")),E(a.get("status")),S(a.get("clearable"))}),[a]),r.useEffect(()=>{if(!s)return;const e=i=>{const w=h.current;w&&!w.contains(i.target)&&p(!1)};return document.addEventListener("pointerdown",e),()=>document.removeEventListener("pointerdown",e)},[s]),r.useEffect(()=>{!s||o<0||document.getElementById(n[o].id)?.scrollIntoView({block:"nearest"})},[s,o]);const v=()=>{m.current=l,u(Math.max(0,n.findIndex(e=>e.value===l))),p(!0)},c=(e=!1)=>{e&&d(m.current),p(!1)},z=e=>{d(n[e].value),c(),g.current?.focus()},D=e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(e.preventDefault(),!s){v();return}u(i=>e.key==="ArrowDown"?Math.min(i+1,n.length-1):Math.max(i-1,0))}else e.key==="Enter"||e.key===" "?s&&(e.preventDefault(),o>=0&&z(o)):e.key==="Escape"?s&&(e.preventDefault(),c(!0)):e.key==="Tab"&&c()};return t.jsxs(C,{entryId:x,schema:b,children:[t.jsx("div",{className:"sel-stage","data-size":y,"data-status":j,"data-clearable":f,children:t.jsxs("div",{className:"sel-wrap",ref:h,children:[t.jsxs("button",{type:"button",ref:g,className:"sel-trigger",role:"combobox","aria-haspopup":"listbox","aria-expanded":s,"aria-controls":s?"sel-city-list":void 0,"aria-activedescendant":s&&o>=0?n[o].id:void 0,"aria-label":"城市 City",onClick:()=>s?c():v(),onKeyDown:D,children:[t.jsx("span",{className:l==null?"is-placeholder":void 0,children:l??"请选择城市 Pick a city"}),t.jsx("span",{className:"sel-arrow","aria-hidden":"true",children:"▾"})]}),f==="on"&&l!=null&&t.jsx("button",{type:"button",className:"sel-clear","aria-label":"清空选择 Clear selection",onClick:()=>{d(null),g.current?.focus()},children:"×"}),s&&t.jsx("ul",{className:"sel-list",id:"sel-city-list",role:"listbox","aria-label":"城市 Cities",children:n.map((e,i)=>t.jsxs("li",{id:e.id,role:"option","aria-selected":l===e.value,className:`sel-opt${i===o?" is-active":""}`,onClick:()=>z(i),onMouseEnter:()=>u(i),children:[t.jsx("span",{children:e.value}),l===e.value&&t.jsx("span",{className:"sel-check","aria-hidden":"true",children:"✓"})]},e.id))})]})}),t.jsx("style",{children:F}),t.jsx("p",{className:"sel-hint",children:"键盘 Keyboard:↓/↑ 高亮 · Enter 确认 · Esc 关闭并恢复 · 点击外部关闭"})]})}export{I as default};
