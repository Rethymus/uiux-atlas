import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as K}from"./color.DuEPkvq5.js";import{D as B}from"./DemoStage.vW1CgYCd.js";const I=`
.demo-stage { --kn-ring-width: 3px; }
.kn-field { position: absolute; inset: 0; }
.kn-skip {
  position: absolute;
  left: 50%;
  top: 8px;
  translate: -50% -200%;
  z-index: 5;
  border: 0;
  border-radius: 9px;
  padding: 7px 16px;
  background: oklch(0.3 0.05 250);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: translate 0.15s ease;
}
.kn-skip:focus-visible { translate: -50% 0; }
.kn-scene {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 210px));
  padding: 16px 18px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.85);
  font-size: 13px;
}
.kn-scene h3 { margin: 0 0 10px; font-size: 14px; }
.kn-toolbar { display: flex; gap: 6px; }
.kn-tb-btn {
  border: 1px solid oklch(0.55 0 0 / 0.45);
  border-radius: 9px;
  padding: 6px 10px;
  background: oklch(0.96 0.005 250);
  font-size: 12.5px;
  cursor: pointer;
}
.kn-tb-btn[tabindex="-1"] { opacity: 0.72; }
.kn-tabbar { display: flex; gap: 4px; margin-bottom: 8px; }
.kn-tab {
  border: 1px solid oklch(0.55 0 0 / 0.45);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  padding: 5px 12px;
  background: oklch(0.94 0.005 250);
  font-size: 12.5px;
  cursor: pointer;
}
.kn-tab[aria-selected="true"] { background: oklch(0.55 0.13 250); color: #fff; font-weight: 650; }
.kn-panelbox { border: 1px solid oklch(0.55 0 0 / 0.45); border-radius: 0 8px 8px 8px; padding: 10px; min-height: 56px; font-size: 12px; }
/* strong 焦点环(仅 ring=strong 时) */
.kn-field[data-ring="strong"] .kn-tb-btn:focus-visible,
.kn-field[data-ring="strong"] .kn-tab:focus-visible,
.kn-field[data-ring="strong"] .kn-open:focus-visible,
.kn-field[data-ring="strong"] .kn-skip:focus-visible,
.kn-field[data-ring="strong"] .kn-dialog-btn:focus-visible,
.kn-field[data-ring="strong"] .kn-x:focus-visible {
  outline: var(--kn-ring-width) solid oklch(0.45 0.16 260);
  outline-offset: 2px;
}
.kn-open {
  margin-top: 12px;
  border: 0;
  border-radius: 9px;
  padding: 7px 14px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 12.5px;
  cursor: pointer;
}
/* dialog */
.kn-backdrop {
  position: absolute;
  inset: 0;
  background: oklch(0.2 0.02 260 / 0.45);
  display: grid;
  place-items: center;
  z-index: 4;
}
.kn-dialog {
  width: min(260px, 80%);
  padding: 16px;
  border-radius: 12px;
  background: oklch(0.99 0 0);
  font-size: 12.5px;
  box-shadow: 0 12px 40px oklch(0.2 0.02 260 / 0.4);
}
.kn-dialog h4 { margin: 0 0 8px; font-size: 13px; }
.kn-dialog-row { display: flex; gap: 6px; margin-top: 10px; }
.kn-dialog-btn,
.kn-x {
  border: 1px solid oklch(0.55 0 0 / 0.5);
  border-radius: 8px;
  padding: 5px 12px;
  background: oklch(0.97 0 0);
  font-size: 12px;
  cursor: pointer;
}
.kn-x { margin-left: auto; }
.kn-log {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 176px;
  max-height: calc(100% - 60px);
  overflow: auto;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 11px;
  line-height: 1.7;
}
.kn-log b { font-size: 12px; }
.kn-log ul { margin: 4px 0 0; padding: 0; list-style: none; font-variant-numeric: tabular-nums; }
.kn-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.kn-live {
  position: absolute;
  left: -9999px;
  width: 1px; height: 1px; overflow: hidden;
}
@media (max-width: 480px) {
  .kn-log { display: none; }
  .kn-scene { width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .kn-skip { transition: none; }
}
`;function H({entryId:g,schema:k}){const i=K(g,k),[a,z]=o.useState(()=>i.get("scene")),[D,N]=o.useState(()=>i.get("ring")),[f,h]=o.useState(0),[d,m]=o.useState(0),[R,y]=o.useState(!1),[v,T]=o.useState([]),j=o.useRef(null),p=o.useRef(null),x=o.useRef(null),w=o.useRef(0);w.current=f,o.useEffect(()=>i.subscribe(()=>{z(i.get("scene")),N(i.get("ring"))}),[i]);const r=(n,t)=>{T(s=>[{key:n,effect:t},...s].slice(0,6)),x.current&&(x.current.textContent=`${n}: ${t}`)},l=["加粗 Bold","斜体 Italic","链接 Link"],S=n=>{const t=(w.current+n+l.length)%l.length;h(t),r(n>0?"→":"←",`焦点移动 focus → ${l[t]}`),requestAnimationFrame(()=>{document.getElementById(`kn-tb-${t}`)?.focus()})},A=n=>{n.key==="ArrowRight"&&(n.preventDefault(),S(1)),n.key==="ArrowLeft"&&(n.preventDefault(),S(-1))},c=["概览 Overview","数据 Data","设置 Settings"],C=n=>{if(n.key==="ArrowRight"||n.key==="ArrowLeft"){n.preventDefault();const t=n.key==="ArrowRight"?1:-1,s=(d+t+c.length)%c.length;m(s),r(n.key,`选中并移动 focus → ${c[s]}`),requestAnimationFrame(()=>document.getElementById(`kn-tab-${s}`)?.focus())}},$=n=>{if(n.key==="Escape"){n.preventDefault(),b();return}if(n.key==="Tab"){n.preventDefault();const t=p.current?.querySelectorAll("button");if(!t||t.length<2)return;const s=t[0],u=t[t.length-1],E=document.activeElement;n.shiftKey?(E===s?u:s).focus():(E===u?s:u).focus()}},F=()=>{y(!0),r("Enter","打开对话框 open · Tab 已困焦 trapped"),requestAnimationFrame(()=>{p.current?.querySelector("button")?.focus()})},b=()=>{y(!1),r("Esc","关闭并归还焦点 focus returned → 触发按钮 opener"),j.current?.focus()};return e.jsx(B,{entryId:g,schema:k,children:e.jsxs("div",{className:"kn-field","data-ring":D,children:[e.jsx("button",{type:"button",className:"kn-skip",onClick:()=>document.getElementById("kn-scene-main")?.focus(),children:"跳到主内容 Skip to main content"}),e.jsxs("div",{id:"kn-scene-main",className:"kn-scene",tabIndex:-1,onKeyDown:a==="toolbar"?A:a==="tabs"?C:void 0,children:[a==="toolbar"&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"工具栏 Toolbar(roving focus)"}),e.jsx("div",{className:"kn-toolbar",role:"toolbar","aria-label":"格式工具栏 Format toolbar",children:l.map((n,t)=>e.jsx("button",{id:`kn-tb-${t}`,type:"button",className:"kn-tb-btn",tabIndex:t===f?0:-1,onClick:()=>{h(t),r("Enter",`激活 activate → ${n}`)},children:n},n))}),e.jsx("p",{style:{fontSize:11,opacity:.65,margin:"8px 0 0"},children:"Tab 只进一次,方向键在内部移动(07§35)。"})]}),a==="tabs"&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"标签页 Tabs(选中随焦点)"}),e.jsx("div",{className:"kn-tabbar",role:"tablist","aria-label":"示例标签 Sample tabs",children:c.map((n,t)=>e.jsx("button",{id:`kn-tab-${t}`,type:"button",role:"tab","aria-selected":t===d,tabIndex:t===d?0:-1,className:"kn-tab",onClick:()=>{m(t),r("Enter",`激活 activate → ${n}`)},children:n},n))}),e.jsx("div",{className:"kn-panelbox",role:"tabpanel",children:"面板已预载 → 方向键切换时选中随焦点;焦点环与选中填充是两种视觉(focus ≠ selection,07§35)。"})]}),a==="dialog"&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"对话框 Dialog(困焦与归还)"}),e.jsx("p",{style:{fontSize:12,margin:"0 0 0"},children:"打开对话框后:Tab 循环困焦、Esc 关闭、焦点自动回到「打开」按钮(07§36 键位表)。"}),e.jsx("button",{ref:j,type:"button",className:"kn-open",onClick:F,children:"打开对话框 Open"})]})]}),R&&e.jsx("div",{className:"kn-backdrop",onKeyDown:$,children:e.jsxs("div",{className:"kn-dialog",role:"dialog","aria-modal":"true","aria-label":"确认操作 Confirm",ref:p,children:[e.jsx("h4",{children:"确认删除该项?"}),e.jsx("p",{style:{margin:0,opacity:.75},children:"此操作可撤销(演示)。"}),e.jsxs("div",{className:"kn-dialog-row",children:[e.jsx("button",{type:"button",className:"kn-dialog-btn",onClick:b,children:"确认 Confirm"}),e.jsx("button",{type:"button",className:"kn-x",onClick:b,children:"取消 Cancel"})]})]})}),e.jsxs("aside",{className:"kn-log","aria-hidden":"false",children:[e.jsx("b",{children:"按键日志 Key log"}),e.jsxs("ul",{children:[v.length===0&&e.jsx("li",{style:{opacity:.6},children:"用键盘试试… try the keyboard…"}),v.map((n,t)=>e.jsxs("li",{children:[e.jsxs("b",{children:["[",n.key,"]"]})," ",n.effect]},t))]})]}),e.jsx("span",{ref:x,className:"kn-live","aria-live":"polite"}),e.jsx("p",{className:"kn-hint",children:"全程别碰鼠标:Tab、方向键、Enter、Esc 走完每个场景;切 ring=strong 看自定义焦点环。 Ditch the mouse: Tab, arrows, Enter, Esc complete every scene; try ring=strong for the custom ring."}),e.jsx("style",{children:I})]})})}export{H as default};
