import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as D}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const o=[{key:"overview",zh:"组件总览",en:"Overview",body:{zh:"标签页把平级内容收进同一视图:一条标签轴 + 一块面板,切换不离开当前页面。",en:"Tabs fold peer content into one view: a tab axis plus one panel, switching without leaving the page."},rows:["同视图平级切换 Peer switching","内容预载即换显隐 Preloaded panels","轴上承载计数与状态 Counts on tabs"]},{key:"spec",zh:"设计规范",en:"Design spec",body:{zh:"线式以滑动指示条标记活动项;卡片式以边框卡片承载,活动卡与面板连成一体。",en:"Line style marks the active tab with a sliding ink bar; card style uses bordered tabs that merge into the panel."},rows:["type=line → ink bar","type=card → bordered tabs","animated → ink slide + pane fade"]},{key:"code",zh:"键盘交互",en:"Keyboard",body:{zh:"方向键在标签间漫游;内容已预载时选中随焦点(自动激活),Home/End 跳到首尾。",en:"Arrow keys rove across tabs; with preloaded content selection follows focus (auto-activation), Home/End jump to the ends."},rows:["← →(top)/ ↑ ↓(left) 漫游","Home / End 首尾","Esc 无需处理——焦点常驻标签轴"]}],A=`
.tb-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 20px; }
.tb-frame {
  width: min(660px, 100%);
  display: flex; flex-direction: column;
  background: #fff;
  color: rgba(0, 0, 0, 0.88); /* antd 中性文字 88%(06-antdesign.md §2.3-⑤) */
  border: 1px solid #f0f0f0; /* colorBorderSecondary */
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  overflow: visible;
  animation: tb-frame-in 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
.tb-scene[data-position="left"] .tb-frame { flex-direction: row; align-items: stretch; }
.tb-list {
  position: relative;
  display: flex; align-items: center; gap: 4px;
  padding: 0 12px; margin: 0; flex-shrink: 0;
}
.tb-scene[data-position="left"] .tb-list { flex-direction: column; align-items: stretch; padding: 12px 0; min-width: 128px; }
.tb-list[data-type="line"] { border-bottom: 1px solid #f0f0f0; }
.tb-scene[data-position="left"] .tb-list[data-type="line"] { border-bottom: 0; border-right: 1px solid #f0f0f0; }
.tb-tab {
  border: 0; background: none; cursor: pointer;
  padding: 10px 14px; font-size: 14px; font-family: inherit;
  color: rgba(0, 0, 0, 0.65); /* colorTextSecondary 65%(§2.3-⑤) */
  border-radius: 6px 6px 0 0; white-space: nowrap;
}
.tb-tab:hover { color: #4096ff; } /* 蓝板第 5 阶(§1.2) */
.tb-tab:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; border-radius: 6px; }
.tb-tab[aria-selected="true"] { color: #1677ff; } /* colorPrimary seed */
.tb-ink {
  position: absolute; left: 0; top: 0; width: 0; height: 2px;
  background: #1677ff; pointer-events: none;
}
.tb-list[data-animated="on"] .tb-ink {
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
    height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1); /* motionDurationMid + motionEaseOut */
}
.tb-list[data-type="card"] .tb-ink { display: none; }
.tb-list[data-type="card"] .tb-tab {
  border: 1px solid #d9d9d9; /* colorBorder */
  background: #fafafa;
}
.tb-list[data-type="card"] .tb-tab:hover { color: #1677ff; background: rgba(0, 0, 0, 0.04); }
.tb-list[data-type="card"] .tb-tab[aria-selected="true"] {
  background: #fff; border-bottom-color: #fff; color: #1677ff; position: relative; z-index: 1;
}
.tb-scene[data-position="left"] .tb-list[data-type="card"] .tb-tab { border-radius: 6px 0 0 6px; margin-bottom: -1px; }
.tb-scene[data-position="left"] .tb-list[data-type="card"] .tb-tab[aria-selected="true"] { border-right-color: #fff; }
.tb-panel {
  padding: 16px 20px 14px; min-height: 168px; background: #fff; border-radius: 0 0 10px 10px; flex: 1;
}
.tb-list[data-type="card"] + .tb-panel { border-top: 1px solid #d9d9d9; border-radius: 0; margin-top: 0; }
.tb-scene[data-position="left"] .tb-list[data-type="card"] + .tb-panel { border-top: 0; border-left: 1px solid #d9d9d9; margin-left: 0; }
.tb-scene[data-type="card"] .tb-frame[data-type="card"] { overflow: hidden; }
.tb-panel[data-anim="on"] { animation: tb-pane-in 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
.tb-panel h4 { margin: 0 0 8px; font-size: 15px; font-weight: 650; }
.tb-panel > p { margin: 0 0 10px; font-size: 13px; line-height: 1.7; color: rgba(0, 0, 0, 0.65); }
.tb-row {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; padding: 7px 10px; border-radius: 6px; background: #f5f5f5; margin-bottom: 6px;
}
.tb-row::before { content: ""; width: 6px; height: 6px; border-radius: 999px; background: #1677ff; flex-shrink: 0; }
.tb-hint { font-size: 12px; color: rgba(0, 0, 0, 0.45); margin-top: 10px; }
@keyframes tb-frame-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes tb-pane-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .tb-frame { animation: none; }
  .tb-panel[data-anim="on"] { animation: none; }
  .tb-list[data-animated="on"] .tb-ink { transition: none; }
}
`;function T({entryId:x,schema:m}){const i=D(x,m),[r,u]=a.useState(()=>i.get("position")),[s,k]=a.useState(()=>i.get("type")),[h,w]=a.useState(()=>i.get("animated")),[d,y]=a.useState(o[0].key),[p,g]=a.useState({x:0,size:0}),f=a.useRef({}),v=a.useRef(null);a.useEffect(()=>i.subscribe(()=>{u(i.get("position")),k(i.get("type")),w(i.get("animated"))}),[i]),a.useEffect(()=>{const e=f.current[d];!e||s!=="line"||g(r==="top"?{x:e.offsetLeft,size:e.offsetWidth}:{x:e.offsetTop,size:e.offsetHeight})},[d,r,s]);const z=e=>{const b=o.findIndex(c=>c.key===d);let l=-1;const j=r==="top"?"ArrowRight":"ArrowDown",E=r==="top"?"ArrowLeft":"ArrowUp";if(e.key===j?l=(b+1)%o.length:e.key===E?l=(b-1+o.length)%o.length:e.key==="Home"?l=0:e.key==="End"&&(l=o.length-1),l>=0){e.preventDefault();const c=o[l].key;y(c),f.current[c]?.focus()}},n=o.find(e=>e.key===d);return t.jsxs(S,{entryId:x,schema:m,children:[t.jsx("div",{className:"tb-scene","data-position":r,"data-type":s,children:t.jsxs("div",{className:"tb-frame","data-type":s,children:[t.jsxs("div",{ref:v,className:"tb-list",role:"tablist","aria-label":"详情分区 Detail sections","data-type":s,"data-animated":h,"aria-orientation":r==="left"?"vertical":void 0,onKeyDown:z,children:[o.map(e=>t.jsx("button",{ref:b=>{f.current[e.key]=b},type:"button",role:"tab",id:`tb-tab-${e.key}`,"aria-selected":d===e.key,"aria-controls":`tb-panel-${e.key}`,tabIndex:d===e.key?0:-1,className:"tb-tab",title:e.en,onClick:()=>y(e.key),children:e.zh},e.key)),s==="line"&&t.jsx("span",{className:"tb-ink","aria-hidden":"true",style:r==="top"?{transform:`translateX(${p.x}px)`,width:p.size,top:"auto",bottom:-1}:{transform:`translateY(${p.x}px)`,height:p.size,left:"auto",right:-1,width:2}})]}),t.jsxs("div",{className:"tb-panel","data-anim":h,role:"tabpanel",id:`tb-panel-${n.key}`,"aria-labelledby":`tb-tab-${n.key}`,tabIndex:0,children:[t.jsxs("h4",{children:[n.zh," ",n.en]}),t.jsxs("p",{children:[n.body.zh," ",n.body.en]}),n.rows.map(e=>t.jsx("div",{className:"tb-row",children:e},e)),t.jsx("div",{className:"tb-hint",children:"方向键 / Home / End 可切换 · 面板内容已预载 Arrow keys, Home, End switch · panels preloaded"})]},n.key)]})}),t.jsx("style",{children:A})]})}export{T as default};
