import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as $}from"./color.DuEPkvq5.js";import{D as C}from"./DemoStage.vW1CgYCd.js";const F=[{key:"recipient",label:"收件人 Recipient",system:"王小明 W. Xiao"},{key:"phone",label:"电话 Phone",system:"138****8888"},{key:"address",label:"地址 Address",system:"杭州市…区…号"},{key:"timeslot",label:"时段 Timeslot",system:"工作日 14:00–18:00"},{key:"packing",label:"包装 Packing",system:"标准纸箱"},{key:"note",label:"备注 Note",system:"放前台"},{key:"invoice",label:"发票 Invoice",system:"电子普票"},{key:"insurance",label:"保价 Insurance",system:"按申报价"}],D=`
.tl-field { position: absolute; inset: 0; }
.tl-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(340px, calc(100% - 200px));
  padding: 16px 18px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.8);
  font-size: 12.5px;
}
.tl-form-title { margin: 0 0 10px; font-size: 14px; }
.tl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px dashed oklch(0.5 0 0 / 0.15);
}
.tl-row label { font-weight: 600; }
.tl-value { font-size: 12px; color: oklch(0.3 0.02 250); }
.tl-fill {
  border: 1px solid oklch(0.55 0.13 250 / 0.6);
  border-radius: 8px;
  padding: 3px 10px;
  background: transparent;
  color: oklch(0.45 0.12 250);
  font-size: 12px;
  cursor: pointer;
}
.tl-lock {
  font-size: 11px;
  color: oklch(0.45 0.1 150);
  white-space: nowrap;
}
.tl-unlock {
  border: 0;
  background: transparent;
  color: oklch(0.5 0 0 / 0.6);
  font-size: 11px;
  cursor: pointer;
  text-decoration: underline;
}
.tl-actions { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.tl-btn {
  border: 0;
  border-radius: 9px;
  padding: 7px 14px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 12.5px;
  cursor: pointer;
}
.tl-btn[disabled] { opacity: 0.45; cursor: default; }
.tl-meter {
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: min(300px, calc(100% - 220px));
  font-size: 12px;
}
.tl-bar {
  display: flex;
  height: 14px;
  border-radius: 7px;
  overflow: hidden;
  margin-top: 5px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
}
.tl-bar .user { background: oklch(0.62 0.15 300); transition: width 0.25s ease; }
.tl-bar .sys { background: oklch(0.62 0.13 150); transition: width 0.25s ease; }
.tl-legend { display: flex; gap: 14px; margin-top: 4px; font-size: 11px; opacity: 0.8; }
.tl-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 170px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.tl-hint {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 32%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
@media (max-width: 480px) {
  .tl-panel, .tl-hint { display: none; }
  .tl-card { width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .tl-bar .user, .tl-bar .sys { transition: none; }
}
`;function P({entryId:h,schema:b}){const a=$(h,b),[y,v]=o.useState(()=>a.get("mode")),[r,N]=o.useState(()=>a.get("fields")),[d,k]=o.useState({}),[f,g]=o.useState({}),[z,x]=o.useState(0),j=o.useRef([]);o.useEffect(()=>a.subscribe(()=>{v(a.get("mode")),N(a.get("fields"))}),[a]),o.useEffect(()=>()=>j.current.forEach(s=>window.clearTimeout(s)),[]);const i=o.useMemo(()=>F.slice(0,r),[r]),c=y==="assisted",n=c?Math.max(0,r-2):0;o.useEffect(()=>{const s={};i.forEach((t,l)=>{c&&l<n&&(s[t.key]=t.system)}),k(s),g({}),x(0)},[y,r]);const m=i.length-n,E=i.filter((s,t)=>d[s.key]&&!(c&&t<n&&!f[s.key])).length,w=(s,t)=>{k(l=>({...l,[s]:t})),x(l=>l+1)},S=()=>{i.forEach((s,t)=>{if(d[s.key]||c&&i.findIndex(p=>p.key===s.key)<n)return;const l=window.setTimeout(()=>w(s.key,`示例值 ${t+1}`),300*t);j.current.push(l)})},u=i.every(s=>d[s.key]);return e.jsx(C,{entryId:h,schema:b,children:e.jsxs("div",{className:"tl-field",children:[e.jsx("p",{className:"tl-hint",children:"同一张表单两种模式:manual 全部手填,assisted 系统代填并锁定——复杂度没有消失,只是换了承担方。 One form, two modes: manual fills everything, assisted delegates to the system — complexity moves, it never vanishes."}),e.jsxs("div",{className:"tl-card",children:[e.jsx("p",{className:"tl-form-title",children:"寄件表单 Shipping form"}),i.map((s,t)=>{const l=c&&t<n&&!f[s.key];return e.jsxs("div",{className:"tl-row",children:[e.jsx("label",{htmlFor:`tl-${s.key}`,children:s.label}),d[s.key]?e.jsxs("span",{className:"tl-value",children:[d[s.key],l&&e.jsx("button",{type:"button",className:"tl-unlock",onClick:()=>{g(p=>({...p,[s.key]:!0})),x(p=>p+1)},children:"修改 change"})]}):l?e.jsx("span",{className:"tl-lock",children:"系统代填 by system"}):e.jsx("button",{type:"button",id:`tl-${s.key}`,className:"tl-fill",onClick:()=>w(s.key,`示例值 ${t+1}`),children:"填写 fill"})]},s.key)}),e.jsxs("div",{className:"tl-actions",children:[e.jsx("button",{type:"button",className:"tl-btn",onClick:S,disabled:u,children:"演示填写 Auto-fill demo"}),e.jsx("button",{type:"button",className:"tl-btn",disabled:!u,style:{background:u?"oklch(0.6 0.13 150)":void 0},children:"提交 Submit"})]})]}),e.jsxs("div",{className:"tl-meter",children:[e.jsx("strong",{children:"复杂度承担 Complexity borne by"}),e.jsxs("div",{className:"tl-bar",role:"img","aria-label":`用户承担 ${m} 项,系统承担 ${n} 项`,children:[e.jsx("span",{className:"user",style:{width:`${m/i.length*100}%`}}),e.jsx("span",{className:"sys",style:{width:`${n/i.length*100}%`}})]}),e.jsxs("div",{className:"tl-legend",children:[e.jsxs("span",{children:["■ 用户 user ",m," 项"]}),e.jsxs("span",{children:["■ 系统 system ",n," 项"]}),e.jsxs("span",{children:["点击 ",z," 次"]})]})]}),e.jsxs("aside",{className:"tl-panel",children:[e.jsx("b",{children:"当前模式 Mode"}),e.jsxs("p",{style:{margin:0},children:[c?"assisted 系统代办":"manual 全手动",e.jsx("br",{}),"字段 fields: ",r,e.jsx("br",{}),"已就绪 ready: ",E,"/",r,e.jsx("br",{}),e.jsx("span",{style:{fontSize:11,opacity:.7},children:"assisted 里紫色=仍由用户承担;锁定项可「修改」解锁。"})]})]}),e.jsx("style",{children:D})]})})}export{P as default};
