import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as j}from"./color.DuEPkvq5.js";import{D as z}from"./DemoStage.vW1CgYCd.js";const w=`
.btn-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  padding: 8px 12px;
}
.btn-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
.btn-col-label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  letter-spacing: 0.02em;
}
/* 按钮基座:主色/圆角/字号/时长全部对齐 antd seed token */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  line-height: 1;
  height: 32px;
  padding: 0 12px;
  cursor: pointer;
  transition:
    background-color 0.1s,
    border-color 0.1s,
    color 0.1s,
    transform 0.1s;
}
.btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
/* 五档高度:16/24/32/40 = genControlHeight(×0.5/×0.75/×1/×1.25),48 为 demo 外推(未证实) */
.btn[data-size="xs"] { height: 16px; padding: 0 8px;  font-size: 12px; border-radius: 2px; }
.btn[data-size="sm"] { height: 24px; padding: 0 8px;  font-size: 12px; border-radius: 4px; }
.btn[data-size="md"] { height: 32px; padding: 0 12px; font-size: 14px; border-radius: 6px; }
.btn[data-size="lg"] { height: 40px; padding: 0 12px; font-size: 16px; border-radius: 8px; }
.btn[data-size="xl"] { height: 48px; padding: 0 16px; font-size: 16px; border-radius: 8px; }
/* 四变体 */
.btn[data-variant="primary"] { background: #1677ff; color: #fff; }
.btn[data-variant="primary"]:hover:not(:disabled) { background: #4096ff; }
.btn[data-variant="primary"]:active:not(:disabled) { background: #0958d9; transform: translateY(1px); }
.btn[data-variant="secondary"] { background: #fff; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
.btn[data-variant="secondary"]:hover:not(:disabled) { border-color: #1677ff; color: #1677ff; }
.btn[data-variant="secondary"]:active:not(:disabled) { border-color: #0958d9; color: #0958d9; transform: translateY(1px); }
.btn[data-variant="text"] { background: transparent; color: rgba(0, 0, 0, 0.88); }
.btn[data-variant="text"]:hover:not(:disabled) { background: rgba(0, 0, 0, 0.06); }
.btn[data-variant="text"]:active:not(:disabled) { background: rgba(0, 0, 0, 0.15); transform: translateY(1px); }
.btn[data-variant="dashed"] { background: #fff; border-style: dashed; border-color: #d9d9d9; color: rgba(0, 0, 0, 0.88); }
.btn[data-variant="dashed"]:hover:not(:disabled) { border-color: #1677ff; color: #1677ff; }
.btn[data-variant="dashed"]:active:not(:disabled) { border-color: #0958d9; color: #0958d9; transform: translateY(1px); }
/* 禁用态:文字 25% / 填充 4% / 边框 #d9d9d9(antd 中性 token) */
.btn:disabled { cursor: not-allowed; color: rgba(0, 0, 0, 0.25); background: rgba(0, 0, 0, 0.04); border-color: #d9d9d9; }
.btn[data-variant="text"]:disabled { background: transparent; border-color: transparent; }
.btn[data-variant="primary"]:disabled { color: rgba(0, 0, 0, 0.25); }
/* 加载 spinner */
.btn-spin { width: 1em; height: 1em; animation: btn-rot 0.8s linear infinite; }
.btn-spin circle { stroke: currentColor; }
@keyframes btn-rot { to { transform: rotate(360deg); } }
/* 状态读数 */
.btn-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  max-width: 100%;
  overflow-wrap: anywhere;
}
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
  .btn:active:not(:disabled) { transform: none; }
  .btn-spin { animation: none; }
}
`;function N(){return t.jsx("svg",{className:"btn-spin",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:t.jsx("circle",{cx:"12",cy:"12",r:"9",strokeWidth:"3",strokeLinecap:"round",strokeDasharray:"42",strokeDashoffset:"12"})})}function P({entryId:s,schema:d}){const e=j(s,d),[l,g]=n.useState(()=>e.get("variant")),[c,m]=n.useState(()=>e.get("size")),[b,h]=n.useState(()=>e.get("loading")),[i,v]=n.useState(()=>e.get("disabled")),[p,f]=n.useState(!1),[y,r]=n.useState(0),u=n.useRef(void 0);n.useEffect(()=>{const a=e.subscribe(()=>{g(e.get("variant")),m(e.get("size")),h(e.get("loading")),v(e.get("disabled"))});return()=>{a(),window.clearTimeout(u.current)}},[e]);const o=b==="on"||p,x=i==="on"||o,k=()=>{x||(r(a=>a+1),f(!0),u.current=window.setTimeout(()=>f(!1),1600))};return t.jsxs(z,{entryId:s,schema:d,children:[t.jsxs("div",{className:"btn-scene",children:[t.jsxs("div",{className:"btn-row",role:"group","aria-label":"四个变体的活按钮 Variant showcase",children:[t.jsx("button",{type:"button",className:"btn","data-variant":"primary",onClick:()=>r(a=>a+1),children:"主操作"}),t.jsx("button",{type:"button",className:"btn","data-variant":"secondary",onClick:()=>r(a=>a+1),children:"次操作"}),t.jsx("button",{type:"button",className:"btn","data-variant":"text",onClick:()=>r(a=>a+1),children:"文字按钮"}),t.jsx("button",{type:"button",className:"btn","data-variant":"dashed",onClick:()=>r(a=>a+1),children:"虚线按钮"})]}),t.jsx("div",{className:"btn-col-label",children:"参数按钮(点击试按压与 loading)Specimen — click for press + loading"}),t.jsxs("div",{className:"btn-row",children:[t.jsxs("button",{type:"button",className:"btn","data-variant":l,"data-size":c,disabled:x,"aria-busy":o?"true":void 0,onClick:k,children:[o?t.jsx(N,{}):null,o?"加载中 Loading":"提交订单 Submit"]}),t.jsx("button",{type:"button",className:"btn","data-variant":"secondary",disabled:i==="on",onClick:()=>r(a=>a+1),children:"取消 Cancel"})]}),t.jsxs("div",{className:"btn-readout","aria-live":"polite",children:["variant=",l," · size=",c," · loading=",b==="on"||p?"on":"off"," · disabled=",i," · clicks=",y]})]}),t.jsx("style",{children:w})]})}export{P as default};
