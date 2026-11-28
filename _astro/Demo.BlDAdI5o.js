import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as X}from"./color.DuEPkvq5.js";import{D as Y}from"./DemoStage.vW1CgYCd.js";const v=[{value:"北京市",children:[{value:"东城区"},{value:"西城区"},{value:"朝阳区"},{value:"海淀区"}]},{value:"上海市",children:[{value:"黄浦区"},{value:"徐汇区"},{value:"静安区"},{value:"浦东新区"}]},{value:"广东省",children:[{value:"广州市",children:[{value:"天河区"},{value:"越秀区"},{value:"海珠区"}]},{value:"深圳市",children:[{value:"南山区"},{value:"福田区"},{value:"罗湖区"}]},{value:"珠海市",children:[{value:"香洲区"},{value:"斗门区"}]}]}],Z=`
.cs-stage { width: min(560px, calc(100% - 48px)); }
.cs-wrap { position: relative; }
.cs-trigger {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.cs-trigger:hover { border-color: #1677ff; }
.cs-trigger:focus-visible { outline: 2px solid #1677ff; outline-offset: -2px; }
.cs-trigger[aria-expanded="true"] { border-color: #1677ff; box-shadow: 0 0 0 2px color-mix(in srgb, #1677ff 25%, transparent); }
.cs-placeholder { color: rgba(0, 0, 0, 0.25); }
.cs-arrow { margin-left: auto; font-size: 10px; color: rgba(0, 0, 0, 0.45); }
.cs-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.cs-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 1px 4px 1px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
}
.cs-tag-x {
  border: 0;
  padding: 0 3px;
  font-size: 12px;
  line-height: 1;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.45);
  background: transparent;
  cursor: pointer;
}
.cs-tag-x:hover { color: rgba(0, 0, 0, 0.88); }
.cs-popup {
  display: flex;
  margin-top: 4px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05);
  animation: cs-pop 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
@keyframes cs-pop {
  from { opacity: 0; translate: 0 -4px; }
  to { opacity: 1; translate: 0 0; }
}
.cs-col {
  margin: 0;
  padding: 4px;
  box-sizing: border-box;
  list-style: none;
  min-width: 132px;
  max-height: 256px;
  overflow: auto;
  border-left: 1px solid #f0f0f0;
  animation: cs-col-in 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
.cs-col:first-child { border-left: 0; }
@keyframes cs-col-in {
  from { opacity: 0; translate: -4px 0; }
  to { opacity: 1; translate: 0 0; }
}
.cs-opt {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  white-space: nowrap;
}
.cs-opt:hover, .cs-opt.is-active { background: rgba(0, 0, 0, 0.04); }
.cs-opt[aria-selected="true"] { color: #1677ff; font-weight: 500; }
.cs-box {
  width: 14px;
  height: 14px;
  flex: none;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  display: inline-grid;
  place-items: center;
  font-size: 10px;
  line-height: 1;
  color: transparent;
}
.cs-box[data-checked="true"] {
  background: #1677ff;
  border-color: #1677ff;
  color: #fff;
}
.cs-caret { margin-left: auto; font-size: 10px; color: rgba(0, 0, 0, 0.45); }
.cs-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (max-width: 480px) {
  .cs-popup { max-width: calc(100% - 24px); }
}
@media (prefers-reduced-motion: reduce) {
  .cs-trigger { transition: none; }
  .cs-popup, .cs-col { animation: none; }
}
`,w=h=>Array.isArray(h.children)&&h.children.length>0;function oe({entryId:h,schema:C}){const d=X(h,C),[q,B]=a.useState(()=>d.get("expandTrigger")),[F,G]=a.useState(()=>d.get("changeOnSelect")),[H,J]=a.useState(()=>d.get("multiple")),[s,D]=a.useState(!1),[u,y]=a.useState([v]),[S,b]=a.useState([]),[l,R]=a.useState(null),[f,O]=a.useState([]),T=a.useRef(null),$=a.useRef(null),N=a.useRef({single:null,multi:[]});a.useEffect(()=>d.subscribe(()=>{B(d.get("expandTrigger")),G(d.get("changeOnSelect")),J(d.get("multiple"))}),[d]),a.useEffect(()=>{if(!s)return;const e=t=>{const r=T.current;r&&!r.contains(t.target)&&D(!1)};return document.addEventListener("pointerdown",e),()=>document.removeEventListener("pointerdown",e)},[s]);const g=H==="on",L=F==="on",M=()=>{if(N.current={single:l,multi:f},l){const e=[v],t=[];let r=v;for(let o=0;o<l.length;o++){const i=r.findIndex(x=>x.value===l[o]);if(i<0)break;t.push(i),r=r[i].children??[],o<l.length-1&&e.push(r)}y(e),b(t)}else y([v]),b([]);D(!0)},k=(e=!1)=>{e&&(R(N.current.single),O(N.current.multi)),D(!1)},E=e=>L||!w(e),j=e=>{O(t=>{const r=e.join("/");return t.some(o=>o.join("/")===r)?t.filter(o=>o.join("/")!==r):[...t,e]})},A=(e,t)=>{const r=[];let o=v;for(let i=0;i<=e;i++){const x=i===e?t:S[i],m=o[x];if(!m)break;r.push(m.value),o=m.children??[]}return r},z=(e,t)=>{const r=u[e][t];w(r)&&(b(o=>[...o.slice(0,e),t]),y(o=>[...o.slice(0,e+1),r.children??[]]))},K=(e,t)=>{const r=u[e][t],o=A(e,t);if(g){E(r)?j(o):z(e,t);return}if(!w(r)||L){R(o),k(),$.current?.focus();return}z(e,t)},Q=(e,t)=>{q==="hover"&&w(u[e][t])&&z(e,t)},I=(e,t)=>`cs-opt-${e}-${t}`,c=u.length-1,p=S[c],V=e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(e.preventDefault(),!s){M();return}b(t=>{const r=t[c]??-1,o=e.key==="ArrowDown"?r<0?0:Math.min(r+1,u[c].length-1):Math.max(r-1,0);return[...t.slice(0,c),o]})}else if(e.key==="ArrowRight"){if(!s||p==null)return;e.preventDefault(),z(c,p)}else if(e.key==="ArrowLeft"){if(!s||u.length<=1)return;e.preventDefault(),y(t=>t.slice(0,-1)),b(t=>t.slice(0,-1))}else if(e.key==="Enter"){if(!s||p==null)return;e.preventDefault(),K(c,p)}else if(e.key===" "){if(!s||!g||p==null)return;e.preventDefault();const t=u[c][p];E(t)&&j(A(c,p))}else e.key==="Escape"?s&&(e.preventDefault(),k(!0)):e.key==="Tab"&&k()},U=l?l.join(" / "):null,W=U==null&&(!g||f.length===0);return n.jsxs(Y,{entryId:h,schema:C,children:[n.jsx("div",{className:"cs-stage",children:n.jsxs("div",{className:"cs-wrap",ref:T,children:[n.jsxs("button",{type:"button",ref:$,className:"cs-trigger",role:"combobox","aria-haspopup":"listbox","aria-expanded":s,"aria-controls":s?"cs-popup":void 0,"aria-activedescendant":s&&typeof p=="number"?I(c,p):void 0,"aria-label":"地区 Region",onClick:()=>s?k():M(),onKeyDown:V,children:[n.jsx("span",{className:W?"cs-placeholder":void 0,children:U??(g&&f.length>0?`已选 ${f.length} 项 Selected`:"省 / 市 / 区 请选择 Pick a region")}),n.jsx("span",{className:"cs-arrow","aria-hidden":"true",children:"▾"})]}),g&&f.length>0&&n.jsx("div",{className:"cs-tags",children:f.map(e=>n.jsxs("span",{className:"cs-tag",children:[e.join(" / "),n.jsx("button",{type:"button",className:"cs-tag-x","aria-label":`移除 ${e.join(" / ")}`,onClick:()=>j(e),children:"×"})]},e.join("/")))}),s&&n.jsx("div",{className:"cs-popup",id:"cs-popup",role:"listbox","aria-label":"级联列 Cascading columns",children:u.map((e,t)=>n.jsx("ul",{className:"cs-col",role:"group","aria-label":`第 ${t+1} 级 Level ${t+1}`,children:e.map((r,o)=>{const i=A(t,o),x=f.some(P=>P.join("/")===i.join("/")),m=l!=null&&l[t]===r.value;return n.jsxs("li",{id:I(t,o),role:"option","aria-selected":g?x:m,"aria-label":i.join(" / "),className:`cs-opt${S[t]===o?" is-active":""}`,onClick:()=>K(t,o),onMouseEnter:()=>Q(t,o),children:[g&&n.jsx("span",{className:"cs-box","data-checked":x,"aria-hidden":"true",onClickCapture:P=>{P.stopPropagation(),E(r)&&j(i)},children:"✓"}),n.jsx("span",{children:r.value}),w(r)&&n.jsx("span",{className:"cs-caret","aria-hidden":"true",children:"▸"})]},r.value)})},t))})]})}),n.jsx("style",{children:Z}),n.jsx("p",{className:"cs-hint",children:"键盘 Keyboard:↓/↑ 移动 · →/Enter 下钻 · ← 回退 · Esc 关闭并恢复 · 点击外部关闭"})]})}export{oe as default};
