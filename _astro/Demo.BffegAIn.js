import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as I}from"./color.DuEPkvq5.js";import{D as G}from"./DemoStage.vW1CgYCd.js";const z={uploading:"上传中 Uploading",done:"已完成 Done",error:"上传失败 Failed"},P=`
.up-stage { width: min(520px, calc(100% - 48px)); }
.up-drop {
  display: grid;
  justify-items: center;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  padding: 22px 16px;
  border: 1px dashed #d9d9d9;                 /* colorBorder */
  border-radius: 6px;
  background: transparent;
  color: rgba(0, 0, 0, 0.88);
  font: inherit;
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              border-width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
              background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.up-drop:hover { border-color: #1677ff; }
.up-drop:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.up-drop.is-drag {
  border: 2px solid #1677ff;                  /* Carbon:拖入边框变色加粗(07§14) */
  background: #E6F4FF;                        /* controlItemBgActive 蓝板第 1 阶 */
}
.up-head { font-size: 14px; font-weight: 500; }
.up-desc { font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.up-ic { font-size: 20px; color: #1677ff; }
.up-btn {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  font: inherit;
  font-size: 14px;
  padding: 4px 14px;
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.up-btn:hover { border-color: #1677ff; color: #1677ff; }
.up-btn:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.up-input {
  /* 视觉隐藏(MUI label+隐藏 input 模式,07§1) */
  position: absolute;
  width: 1px;
  height: 1px;
  clip-path: inset(50%);
  overflow: hidden;
  white-space: nowrap;
}
.up-note { margin: 8px 0 0; font-size: 12px; color: #ff4d4f; min-height: 1.4em; }
.up-live { margin: 8px 0 0; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.up-list { margin: 10px 0 0; padding: 0; list-style: none; }
.up-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 4px;
  font-size: 13px;
}
.up-row + .up-row { border-top: 1px solid #f0f0f0; }
.up-row:hover { background: rgba(0, 0, 0, 0.04); }   /* FillTertiary */
.up-ic-sm { width: 16px; text-align: center; font-size: 12px; }
.up-ic-sm.is-done { color: #52c41a; }
.up-ic-sm.is-error { color: #ff4d4f; }
.up-ic-sm.is-upload { color: #1677ff; animation: up-spin 1s linear infinite; }
@keyframes up-spin { to { rotate: 360deg; } }
.up-line { display: flex; align-items: center; gap: 8px; min-width: 0; }
.up-line + .up-line { margin-top: 3px; }
.up-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.88);
}
.up-size { flex: none; color: rgba(0, 0, 0, 0.45); font-size: 12px; }
.up-bar {
  position: relative;
  flex: none;
  width: 72px;
  height: 4px;
  border-radius: 2px;
  background: #f0f0f0;
  overflow: hidden;
}
.up-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: #1677ff;
  transition: width 0.12s linear;
}
.up-state { flex: none; font-size: 12px; color: rgba(0, 0, 0, 0.45); }
.up-row[data-status="done"] .up-state { color: #52c41a; }
.up-row[data-status="error"] .up-state { color: #ff4d4f; }
.up-fix {
  margin-top: 4px;
  font-size: 12px;
  color: #ff4d4f;
  display: flex;
  align-items: center;
  gap: 8px;
}
.up-act {
  border: 0;
  padding: 2px 6px;
  border-radius: 4px;
  background: transparent;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  cursor: pointer;
}
.up-act.up-act-retry { color: #1677ff; }
.up-act:hover { color: rgba(0, 0, 0, 0.88); background: rgba(0, 0, 0, 0.06); }
.up-act.up-act-retry:hover { color: #0958d9; background: #E6F4FF; }
.up-act:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
.up-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .up-drop, .up-btn { transition: none; }
  .up-ic-sm.is-upload { animation: none; }
  .up-bar-fill { transition: none; }
}
`;let U=0;function K({entryId:x,schema:m}){const a=I(x,m),[y,k]=s.useState(()=>a.get("variant")),[g,C]=s.useState(()=>a.get("simulate")),[p,F]=s.useState(()=>a.get("maxCount")),[o,l]=s.useState([]),[$,b]=s.useState(null),[S,u]=s.useState(!1),c=s.useRef(null),d=s.useRef(null),f=s.useRef(null);s.useEffect(()=>a.subscribe(()=>{k(a.get("variant")),C(a.get("simulate")),F(a.get("maxCount"))}),[a]),s.useEffect(()=>{const e=setInterval(()=>{l(i=>i.map(r=>{if(r.status!=="uploading")return r;const n=Math.min(100,r.percent+10);return r.willFail&&n>=60?{...r,percent:60,status:"error"}:n>=100?{...r,percent:100,status:"done"}:{...r,percent:n}}))},150);return()=>clearInterval(e)},[]);const h=o.filter(e=>e.status==="done").length,v=o.filter(e=>e.status==="error").length,D=o.length===0?"文件列表为空 Empty list":`${o.length} 个文件:${h} 已完成,${v} 失败,${o.length-h-v} 上传中`,w=e=>{b(e),f.current&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>b(null),2600)},j=e=>{if(!e||e.length===0)return;const i=p-o.length;if(i<=0){w(`已达上限 ${p} 个文件 Limit reached`);return}const r=Array.from(e).slice(0,i);e.length>i&&w(`已达上限 ${p} 个文件,仅添加 ${i} 个 Limit reached`),l(n=>[...n,...r.map(N=>({id:++U,name:N.name,size:`${Math.max(1,Math.round(N.size/1024))} KB`,status:"uploading",percent:0,willFail:g==="fail"}))])},E=e=>{j(e.target.files),e.target.value="",d.current?.focus()},T=e=>{e.preventDefault(),u(!1),j(e.dataTransfer.files)},M=e=>{e.preventDefault(),u(!0)},R=e=>{l(i=>i.filter(r=>r.id!==e))},B=e=>{l(i=>i.map(r=>r.id===e?{...r,status:"uploading",percent:0,willFail:g==="fail"}:r))};return t.jsxs(G,{entryId:x,schema:m,children:[t.jsxs("div",{className:"up-stage",children:[y==="dropzone"?t.jsxs("button",{type:"button",ref:d,className:`up-drop${S?" is-drag":""}`,"aria-describedby":"up-desc",onClick:()=>c.current?.click(),onDragOver:M,onDragLeave:()=>u(!1),onDrop:T,children:[t.jsx("span",{className:"up-ic","aria-hidden":"true",children:"⇪"}),t.jsx("span",{className:"up-head",children:"点击或拖拽文件到此处 Click or drop files"}),t.jsx("span",{className:"up-desc",id:"up-desc",children:"支持 JPG / PNG,单个不超过 2 MB(demo 文案)JPG/PNG up to 2 MB each"})]}):t.jsx("button",{type:"button",ref:d,className:"up-btn",onClick:()=>c.current?.click(),children:"选择文件 Select file"}),t.jsx("input",{ref:c,className:"up-input",type:"file",multiple:!0,tabIndex:-1,"aria-hidden":"true",onChange:E}),t.jsx("p",{className:"up-note",role:"status",children:$??""}),o.length>0&&t.jsx("ul",{className:"up-list","aria-label":"上传文件列表 Upload list",children:o.map(e=>t.jsxs("li",{className:"up-row","data-status":e.status,children:[t.jsx("span",{className:`up-ic-sm ${e.status==="done"?"is-done":e.status==="error"?"is-error":"is-upload"}`,"aria-hidden":"true",children:e.status==="done"?"✓":e.status==="error"?"✕":"⟳"}),t.jsxs("div",{className:"up-main",children:[t.jsxs("div",{className:"up-line",children:[t.jsx("span",{className:"up-name",title:e.name,children:e.name}),t.jsx("span",{className:"up-size",children:e.size})]}),e.status==="uploading"&&t.jsxs("div",{className:"up-line",children:[t.jsx("span",{className:"up-bar","aria-hidden":"true",children:t.jsx("span",{className:"up-bar-fill",style:{width:`${e.percent}%`}})}),t.jsxs("span",{className:"up-state",children:[e.percent,"% · ",z.uploading]})]}),e.status!=="uploading"&&t.jsx("div",{className:"up-line",children:t.jsx("span",{className:"up-state",children:z[e.status]})}),e.status==="error"&&t.jsxs("div",{className:"up-fix",children:["网络中断,请检查连接后重试 Network hiccup — retry",t.jsx("button",{type:"button",className:"up-act up-act-retry","aria-label":`重试上传 ${e.name}`,onClick:()=>B(e.id),children:"重试 Retry"})]})]}),t.jsx("button",{type:"button",className:"up-act","aria-label":`删除文件 ${e.name}`,onClick:()=>R(e.id),children:"✕ 删除"})]},e.id))}),t.jsx("p",{className:"up-live","aria-live":"polite",children:D})]}),t.jsx("style",{children:P}),t.jsx("p",{className:"up-hint",children:"五态 Five states:点击/拖拽入口 · 拖入悬停 · 上传中(%)· 成功 ✓ · 失败 ✕(修复指引/重试)· 删除=removed"})]})}export{K as default};
