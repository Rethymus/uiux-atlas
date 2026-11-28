import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as m}from"./color.DuEPkvq5.js";import{D as z}from"./DemoStage.vW1CgYCd.js";const n=[{en:"Accordion",zh:"手风琴",group:"containers"},{en:"Alert",zh:"警告",group:"composite"},{en:"Alert Dialog",zh:"警告对话框",group:"containers"},{en:"Breadcrumb",zh:"面包屑",group:"navigation"},{en:"Button",zh:"按钮",group:"forms",keys:"Enter / Space 激活"},{en:"Carousel",zh:"轮播",group:"containers"},{en:"Checkbox",zh:"复选框",group:"forms",keys:"Space 切换"},{en:"Combobox",zh:"组合框",group:"forms"},{en:"Dialog",zh:"对话框",group:"containers",keys:"Esc 关闭 · 模态困焦 · 关闭后焦点回触发者"},{en:"Disclosure",zh:"披露",group:"containers"},{en:"Feed",zh:"信息流",group:"containers"},{en:"Grid",zh:"网格",group:"composite"},{en:"Landmarks",zh:"地标",group:"navigation"},{en:"Link",zh:"链接",group:"navigation"},{en:"Listbox",zh:"列表框",group:"forms"},{en:"Menu / Menubar",zh:"菜单与菜单栏",group:"navigation"},{en:"Menu Button",zh:"菜单按钮",group:"navigation"},{en:"Meter",zh:"计量条",group:"composite"},{en:"Radio Group",zh:"单选组",group:"forms",keys:"方向键组内移动"},{en:"Slider",zh:"滑块",group:"forms",keys:"方向键 + Home/End"},{en:"Slider (Multi-Thumb)",zh:"多滑块",group:"forms"},{en:"Spinbutton",zh:"数值步进",group:"forms"},{en:"Switch",zh:"开关",group:"forms"},{en:"Table",zh:"表格",group:"composite"},{en:"Tabs",zh:"标签页",group:"navigation",keys:"Tab 进出 · 方向键选择"},{en:"Toolbar",zh:"工具栏",group:"composite"},{en:"Tooltip",zh:"工具提示",group:"containers"},{en:"Tree View",zh:"树视图",group:"composite"},{en:"Treegrid",zh:"树形网格",group:"composite"},{en:"Window Splitter",zh:"窗口分割条",group:"containers"}],b=`
.apg-field { position: absolute; inset: 0; }
.apg-chips {
  position: absolute;
  left: 12px;
  top: 36px;
  width: min(330px, 52%);
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-content: flex-start;
}
.apg-chip {
  border: 1px solid oklch(0.55 0 0 / 0.4);
  border-radius: 999px;
  padding: 3px 10px;
  background: oklch(0.97 0.005 250);
  font-size: 11.5px;
  cursor: pointer;
}
.apg-chip[data-selected="true"] {
  background: oklch(0.55 0.13 250);
  border-color: oklch(0.45 0.12 250);
  color: #fff;
}
.apg-card {
  position: absolute;
  right: 12px;
  top: 34px;
  width: min(240px, 40%);
  max-height: calc(100% - 70px);
  overflow: auto;
  padding: 12px 14px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.85);
  font-size: 12px;
  line-height: 1.6;
}
.apg-card h4 { margin: 0 0 2px; font-size: 14px; }
.apg-card .apg-zh { opacity: 0.65; font-size: 11.5px; margin: 0 0 8px; }
.apg-sec { margin-top: 8px; }
.apg-sec b { font-size: 11px; opacity: 0.7; display: block; }
.apg-sec p { margin: 2px 0 0; }
.apg-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 46%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .apg-chips { width: calc(100% - 24px); }
  .apg-card { position: static; margin: 10px 12px; width: auto; }
}
`;function v({entryId:a,schema:c}){const o=m(a,c),[h,g]=t.useState(()=>o.get("group")),[l,d]=t.useState(()=>o.get("keyhint")),[i,u]=t.useState(4);t.useEffect(()=>o.subscribe(()=>{g(o.get("group")),d(o.get("keyhint"))}),[o]);const x=n.map((r,s)=>({p:r,i:s})).filter(({p:r})=>h==="all"||r.group===h),p=n[i];return e.jsx(z,{entryId:a,schema:c,children:e.jsxs("div",{className:"apg-field",children:[e.jsx("div",{className:"apg-chips",role:"group","aria-label":"APG 模式列表 Pattern list",children:x.map(({p:r,i:s})=>e.jsx("button",{type:"button",className:"apg-chip","data-selected":i===s,"aria-pressed":i===s,onClick:()=>u(s),children:r.en},r.en))}),e.jsxs("aside",{className:"apg-card","aria-live":"polite",children:[e.jsx("h4",{children:p.en}),e.jsxs("p",{className:"apg-zh",children:[p.zh," · ",n.length," 模式之一"]}),e.jsxs("div",{className:"apg-sec",children:[e.jsx("b",{children:"键盘交互 Keyboard"}),e.jsx("p",{children:l==="on"?p.keys??"详见 APG 模式页 See the APG pattern page":"(已隐藏 hidden)"})]}),e.jsxs("div",{className:"apg-sec",children:[e.jsx("b",{children:"roles"}),e.jsx("p",{children:"模式页规定的角色结构 · 见 APG"})]}),e.jsxs("div",{className:"apg-sec",children:[e.jsx("b",{children:"states & properties"}),e.jsx("p",{children:"模式页规定的状态与属性 · 见 APG"})]})]}),e.jsx("p",{className:"apg-hint",children:"三段规范(键盘交互 / roles / states & properties)是每个 APG 模式的固定结构(调研 07§34);键位提示仅收录已证实条目。 The three-section spec is every APG pattern's fixed structure (research 07 §34); key hints carry verified entries only."}),e.jsx("style",{children:b})]})})}export{v as default};
