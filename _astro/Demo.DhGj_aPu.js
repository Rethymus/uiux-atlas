import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const u=`
.sw-stage { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.sw-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border: 1px solid var(--border, #d9d9d9);
  border-radius: 8px;
  background: #fff;
}
.sw-label { font-size: 14px; color: rgba(0, 0, 0, 0.88); }
.switch-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  flex: none;
  transition: background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.switch-btn[aria-checked="true"] { background: #1677ff; }
.switch-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.switch-btn .thumb {
  position: absolute;
  left: 2px;
  top: 50%;
  translate: 0 -50%;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: translate 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.switch-btn[aria-checked="true"] .thumb { translate: var(--thumb-travel) -50%; }
.sw-glyph {
  position: absolute;
  font-size: 10px;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.04em;
}
.sw-glyph.is-on { left: 7px; }
.sw-glyph.is-off { right: 7px; color: rgba(0, 0, 0, 0.45); }
.switch-btn[data-loading="on"] .thumb::after {
  content: "";
  position: absolute;
  inset: 3px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-color: transparent;
  border-radius: 50%;
  animation: sw-spin 0.6s linear infinite;
}
.switch-btn[data-disabled="on"], .switch-btn[data-loading="on"] { cursor: not-allowed; }
.switch-btn[data-disabled="on"] { opacity: 0.45; }
/* 尺寸档位(md 默认,自绘示意尺寸) */
.sw-stage[data-size="md"] .switch-btn { width: 40px; height: 22px; }
.sw-stage[data-size="md"] .thumb { width: 18px; height: 18px; }
.sw-stage[data-size="md"] .switch-btn { --thumb-travel: 18px; }
.sw-stage[data-size="md"] .sw-glyph { font-size: 10px; }
.sw-stage[data-size="sm"] .switch-btn { width: 28px; height: 16px; }
.sw-stage[data-size="sm"] .thumb { width: 12px; height: 12px; }
.sw-stage[data-size="sm"] .switch-btn { --thumb-travel: 12px; }
.sw-stage[data-size="sm"] .sw-glyph { font-size: 9px; }
.sw-stage[data-size="sm"] .sw-glyph.is-on { left: 5px; }
.sw-stage[data-size="sm"] .sw-glyph.is-off { right: 5px; }
.sw-stage[data-size="sm"] .switch-btn[data-loading="on"] .thumb::after { inset: 2px; border-width: 1.5px; }
.sw-state { font-size: 12px; color: rgba(0, 0, 0, 0.45); font-variant-numeric: tabular-nums; }
.sw-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@keyframes sw-spin { to { rotate: 360deg; } }
@media (prefers-reduced-motion: reduce) {
  .switch-btn, .switch-btn .thumb { transition: none; }
  .switch-btn[data-loading="on"] .thumb::after { animation: none; }
}
`;function v({entryId:n,schema:d}){const e=m(n,d),[p,b]=s.useState(()=>e.get("size")),[a,h]=s.useState(()=>e.get("loading")),[i,g]=s.useState(()=>e.get("disabled")),[w,r]=s.useState(()=>e.get("checked"));s.useEffect(()=>e.subscribe(()=>{b(e.get("size")),h(e.get("loading")),g(e.get("disabled")),r(e.get("checked"))}),[e]);const l=a==="on"||i==="on",o=w==="on",x=()=>{if(l)return;const c=o?"off":"on";r(c),e.set("checked",c)};return t.jsxs(f,{entryId:n,schema:d,children:[t.jsxs("div",{className:"sw-stage","data-size":p,"data-loading":a,"data-disabled":i,children:[t.jsxs("div",{className:"sw-row",children:[t.jsx("span",{className:"sw-label",id:"sw-demo-label",children:"接收产品更新邮件 Receive product emails"}),t.jsxs("button",{type:"button",role:"switch","aria-checked":o,"aria-labelledby":"sw-demo-label","aria-disabled":l,"data-loading":a,"data-disabled":i,onClick:x,children:[t.jsx("span",{className:"sw-glyph is-on","aria-hidden":"true",children:"开 ON"}),t.jsx("span",{className:"sw-glyph is-off","aria-hidden":"true",children:"关 OFF"}),t.jsx("span",{className:"thumb","aria-hidden":"true"})]})]}),t.jsxs("p",{className:"sw-state","aria-live":"polite",children:["aria-checked = ",o?"true (on)":"false (off)",a==="on"?" · loading 生效中":"",i==="on"?" · disabled":""]})]}),t.jsx("style",{children:u}),t.jsx("p",{className:"sw-hint",children:"键盘 Keyboard:Space 切换 Toggle · loading/disabled 时不响应 No-op"})]})}export{v as default};
