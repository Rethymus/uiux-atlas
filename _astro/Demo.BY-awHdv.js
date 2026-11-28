import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as B}from"./color.DuEPkvq5.js";import{D as I}from"./DemoStage.vW1CgYCd.js";const T=n=>String(n).padStart(2,"0"),f=n=>`${n.getFullYear()}-${T(n.getMonth()+1)}-${T(n.getDate())}`,q=(n,d)=>{const l=new Date(n);return l.setDate(l.getDate()+d),l},m=(n,d)=>!!n&&!!d&&f(n)===f(d),G=["January","February","March","April","May","June","July","August","September","October","November","December"],U=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],V={"zh-mon":{head:["一","二","三","四","五","六","日"],full:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]},"zh-sun":{head:["日","一","二","三","四","五","六"],full:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]},"en-mon":{head:["Mo","Tu","We","Th","Fr","Sa","Su"],full:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]},"en-sun":{head:["Su","Mo","Tu","We","Th","Fr","Sa"],full:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]}},Q=`
.dp-stage { --dp-cell-w: 30px; --dp-cell-h: 28px; position: relative; width: min(240px, calc(100% - 48px)); min-height: 296px; }
.dp-stage[data-size="sm"] { --dp-cell-w: 26px; --dp-cell-h: 24px; }
.dp-stage[data-size="lg"] { --dp-cell-w: 32px; --dp-cell-h: 30px; }
.dp-wrap { position: relative; }
.dp-trigger {
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
.dp-stage[data-size="sm"] .dp-trigger { height: 24px; font-size: 12px; padding: 0 8px; border-radius: 4px; }
.dp-stage[data-size="md"] .dp-trigger { height: 32px; font-size: 14px; padding: 0 12px; border-radius: 6px; }
.dp-stage[data-size="lg"] .dp-trigger { height: 40px; font-size: 16px; padding: 0 12px; border-radius: 6px; }
.dp-trigger:hover { border-color: #1677ff; }
.dp-trigger:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.dp-trigger[aria-expanded="true"] { border-color: #1677ff; box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent); }
.is-placeholder { color: rgba(0, 0, 0, 0.25); }
.dp-panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  animation: dp-pop 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
@keyframes dp-pop {
  from { opacity: 0; translate: 0 -4px; }
  to { opacity: 1; translate: 0 0; }
}
.dp-head { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 6px; }
.dp-title { font-size: 13px; font-weight: 600; color: rgba(0, 0, 0, 0.88); }
.dp-nav {
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: grid;
  place-items: center;
}
.dp-nav:hover { background: rgba(0, 0, 0, 0.04); color: rgba(0, 0, 0, 0.88); }
.dp-nav:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.dp-grid { border-collapse: collapse; }
.dp-grid th {
  width: var(--dp-cell-w);
  height: 24px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.dp-grid td { padding: 1px; text-align: center; }
.dp-cellbtn {
  width: var(--dp-cell-w);
  height: var(--dp-cell-h);
  border: 0;
  border-radius: 4px;
  padding: 0;
  background: transparent;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  font-size: 12px;
  display: grid;
  place-items: center;
}
.dp-stage[data-size="lg"] .dp-cellbtn { font-size: 13px; }
.dp-cellbtn:hover { background: rgba(0, 0, 0, 0.04); }
.dp-cellbtn:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.dp-cellbtn[aria-pressed="true"] { background: #1677ff; color: #fff; }
.dp-cellbtn[aria-pressed="true"]:hover { background: #4096ff; }
.dp-cellbtn.is-today { box-shadow: inset 0 0 0 1px #1677ff; }
.dp-cellbtn.is-today[aria-pressed="true"] { box-shadow: inset 0 0 0 1px #fff; }
.dp-foot { display: flex; justify-content: space-between; gap: 6px; margin-top: 6px; }
.dp-act {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  font-size: 12px;
  padding: 3px 10px;
  cursor: pointer;
}
.dp-act:hover { border-color: #1677ff; color: #1677ff; }
.dp-act:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.dp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .dp-trigger { transition: none; }
  .dp-panel { animation: none; }
}
`;function ae({entryId:n,schema:d}){const l=B(n,d),[x,A]=s.useState(()=>l.get("firstDay")),[p,R]=s.useState(()=>l.get("lang")),[Y,C]=s.useState(()=>l.get("size")),[i]=s.useState(()=>new Date),[b,w]=s.useState(null),[r,D]=s.useState(()=>({y:i.getFullYear(),m:i.getMonth()})),[z,g]=s.useState(i),[c,h]=s.useState(!0),v=s.useRef(null),$=s.useRef(null),k=s.useRef(null);s.useEffect(()=>l.subscribe(()=>{A(l.get("firstDay")),R(l.get("lang")),C(l.get("size"))}),[l]),s.useEffect(()=>{if(!c)return;const e=a=>{const o=v.current;o&&!o.contains(a.target)&&h(!1)};return document.addEventListener("pointerdown",e),()=>document.removeEventListener("pointerdown",e)},[c]);const y=V[`${p}-${x}`],O=x==="mon"?(new Date(r.y,r.m,1).getDay()+6)%7:new Date(r.y,r.m,1).getDay(),W=new Date(r.y,r.m+1,0).getDate(),M=[...Array.from({length:O},()=>null),...Array.from({length:W},(e,a)=>new Date(r.y,r.m,a+1))],J=()=>{const e=b??i;D({y:e.getFullYear(),m:e.getMonth()}),g(e),h(!0)},j=(e=!1)=>{h(!1),e&&$.current?.focus()},K=e=>{w(e),g(e),j(!0)},N=e=>{const a=new Date(r.y,r.m+e,1);D({y:a.getFullYear(),m:a.getMonth()}),g(new Date(a.getFullYear(),a.getMonth(),1))},L=e=>{e.key==="Escape"&&c&&(e.preventDefault(),j(!0))},P=e=>{if(!c)return;const a=e.relatedTarget;(!a||!v.current?.contains(a))&&h(!1)},_=e=>{const o={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];if(o===void 0)return;e.preventDefault();const u=q(z,o);u.getFullYear()!==r.y||u.getMonth()!==r.m||(g(u),k.current?.querySelector(`button[data-date="${f(u)}"]`)?.focus())},F=p==="en"?`${G[r.m]} ${r.y}`:`${r.y}年${r.m+1}月`,S=e=>p==="en"?`${U[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`:`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`,E=e=>x==="mon"?(e.getDay()+6)%7:e.getDay(),H=e=>p==="en"?`${y.full[E(e)]}, ${S(e)}`:`${S(e)} ${y.full[E(e)]}`;return t.jsxs(I,{entryId:n,schema:d,children:[t.jsx("div",{className:"dp-stage","data-size":Y,"data-lang":p,"data-firstday":x,children:t.jsxs("div",{className:"dp-wrap",ref:v,onKeyDown:L,onBlur:P,children:[t.jsxs("button",{type:"button",ref:$,className:"dp-trigger","aria-haspopup":"dialog","aria-expanded":c,onClick:()=>c?j():J(),children:[b?t.jsx("span",{children:S(b)}):t.jsx("span",{className:"is-placeholder",children:"请选择日期 Select date"}),t.jsx("span",{"aria-hidden":"true",children:"📅"})]}),c&&t.jsxs("div",{className:"dp-panel",role:"dialog","aria-label":"选择日期 Choose a date",children:[t.jsxs("div",{className:"dp-head",children:[t.jsx("button",{type:"button",className:"dp-nav","aria-label":"上一月 Previous month",onClick:()=>N(-1),children:"‹"}),t.jsx("span",{className:"dp-title",children:F}),t.jsx("button",{type:"button",className:"dp-nav","aria-label":"下一月 Next month",onClick:()=>N(1),children:"›"})]}),t.jsxs("table",{className:"dp-grid",role:"grid","aria-label":F,ref:k,onKeyDown:_,children:[t.jsx("thead",{children:t.jsx("tr",{children:y.head.map((e,a)=>t.jsx("th",{role:"columnheader",scope:"col","aria-label":y.full[a],children:e},e))})}),t.jsx("tbody",{children:Array.from({length:Math.ceil(M.length/7)},(e,a)=>t.jsx("tr",{role:"row",children:M.slice(a*7,a*7+7).map((o,u)=>o?t.jsx("td",{role:"gridcell",children:t.jsx("button",{type:"button",className:`dp-cellbtn${m(o,i)?" is-today":""}`,"data-date":f(o),tabIndex:m(o,z)?0:-1,"aria-pressed":m(o,b)?!0:void 0,"aria-current":m(o,i)?"date":void 0,"aria-label":H(o),onClick:()=>K(o),children:o.getDate()})},f(o)):t.jsx("td",{role:"gridcell"},`blank-${a}-${u}`))},a))})]}),t.jsxs("div",{className:"dp-foot",children:[t.jsx("button",{type:"button",className:"dp-act",onClick:()=>{w(i),D({y:i.getFullYear(),m:i.getMonth()}),g(i)},children:p==="en"?"Today":"今天"}),t.jsx("button",{type:"button",className:"dp-act",onClick:()=>w(null),children:p==="en"?"Clear":"清空"})]})]})]})}),t.jsx("style",{children:Q}),t.jsx("p",{className:"dp-hint",children:"键盘 Keyboard:←/→/↑/↓ 移动 · Enter 选中 · Esc 关闭 · 自绘简化实现"})]})}export{ae as default};
