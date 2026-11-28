import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";const h=[{zh:"账户信息",en:"Account"},{zh:"部署参数",en:"Params"},{zh:"确认创建",en:"Confirm"}],ne=`
.sfp-scene { position: absolute; inset: 0; overflow: hidden; padding: 16px; display: flex; justify-content: center; }
.sfp-form {
  width: min(560px, 100%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  padding: 16px 18px;
}
/* ── 步骤条(components/stepper):四态推算 current;errorAt 显式标错步 ── */
.sfp-steps { display: flex; align-items: flex-start; margin: 0; padding: 0; list-style: none; }
.sfp-step { display: flex; align-items: center; flex: 1; min-width: 0; }
.sfp-step:last-child { flex: 0 0 auto; }
.sfp-step-head { display: inline-flex; align-items: center; gap: 8px; flex: none; min-width: 0; }
.sfp-step-dot {
  position: relative;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 2px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-dim);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* M3 内容色状态层:一次一层、颜色取内容色 */
.sfp-step-dot::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: transparent; pointer-events: none; }
.sfp-step-dot:hover::after { background: color-mix(in srgb, var(--text) 8%, transparent); }
.sfp-step-dot:focus-visible::after { background: color-mix(in srgb, var(--text) 10%, transparent); }
.sfp-step-dot:active::after { background: color-mix(in srgb, var(--text) 10%, transparent); }
.sfp-step[data-state="finish"] .sfp-step-dot,
.sfp-step[data-state="process"] .sfp-step-dot { border-color: var(--accent); color: var(--accent); }
.sfp-step[data-state="error"] .sfp-step-dot { border-color: #ff4d4f; color: #ff4d4f; } /* colorError,调研 06§2.2 */
.sfp-ring { position: absolute; inset: -2px; width: calc(100% + 4px); height: calc(100% + 4px); transform: rotate(-90deg); pointer-events: none; }
.sfp-ring circle { fill: none; stroke-width: 2; }
.sfp-ring-track { stroke: transparent; }
.sfp-ring-fill { stroke: var(--accent); stroke-linecap: round; }
.sfp-step-label {
  font-size: 13px;
  color: var(--text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sfp-step[data-state="process"] .sfp-step-label { color: var(--text); font-weight: 550; }
.sfp-step[data-state="error"] .sfp-step-label { color: #ff4d4f; }
.sfp-step-line { flex: 1; height: 2px; min-width: 12px; margin-left: 10px; background: var(--border-strong); border-radius: 1px; }
.sfp-step-line[data-done="true"] { background: var(--accent); }
.sfp-step:last-child .sfp-step-line { display: none; }
/* antd Steps responsive:宽度 <532px 自动转垂直 */
@media (max-width: 532px) {
  .sfp-steps { flex-direction: column; gap: 0; }
  .sfp-step { flex: none; flex-direction: column; align-items: flex-start; }
  .sfp-step-line { flex: none; width: 2px; height: 20px; min-width: 0; margin: 4px 0 4px 15px; }
}
/* ── 表单字段 ── */
.sfp-body { min-height: 148px; display: flex; flex-direction: column; gap: 12px; }
.sfp-field { display: flex; flex-direction: column; gap: 6px; }
.sfp-field > label { font-size: 13px; font-weight: 550; color: var(--text); }
.sfp-input {
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text);
  background: var(--bg-elev);
  font-family: inherit;
}
.sfp-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sfp-input[aria-invalid="true"] { border-color: #ff4d4f; }
.sfp-err { margin: 0; font-size: 12px; color: #ff4d4f; }
.sfp-choice { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--text); }
.sfp-choice input { accent-color: var(--accent); width: 15px; height: 15px; }
.sfp-note { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--text-dim); }
.sfp-summary { margin: 0; padding: 10px 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-elev); font-size: 13px; line-height: 1.7; color: var(--text-dim); }
.sfp-summary b { color: var(--text); font-weight: 550; }
.sfp-foot { display: flex; justify-content: flex-end; gap: 10px; }
/* ── M3 内容色状态层(materials/m3-state-layers 官方默认 hover8/focus10/press10)── */
.sfp-btn {
  position: relative;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 13.5px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
  white-space: nowrap;
}
.sfp-btn::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: transparent; pointer-events: none; }
.sfp-btn:hover::after { background: color-mix(in srgb, var(--text) 8%, transparent); }    /* M3 hover +8% */
.sfp-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.sfp-btn:focus-visible::after { background: color-mix(in srgb, var(--text) 10%, transparent); } /* M3 focus +10% */
.sfp-btn:active::after { background: color-mix(in srgb, var(--text) 10%, transparent); }  /* M3 press +10% */
.sfp-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.sfp-btn:disabled::after { background: transparent !important; }
.sfp-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.sfp-btn-primary:hover::after { background: rgba(255, 255, 255, 0.08); }   /* 内容色 = #fff */
.sfp-btn-primary:focus-visible::after { background: rgba(255, 255, 255, 0.10); }
.sfp-btn-primary:active::after { background: rgba(255, 255, 255, 0.10); }
/* ── 吐司弹簧(motion/toast-spring 官方默认 k300/c25/edge bottom/lifetime 4000ms)── */
.sfp-toast-wrap { position: absolute; left: 0; right: 0; bottom: 14px; display: flex; justify-content: center; pointer-events: none; }
.sfp-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: min(420px, calc(100% - 32px));
  padding: 10px 12px 10px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--surface-2);
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.12), 0 9px 28px 0 rgba(0, 0, 0, 0.05); /* Ant @shadow-2 下拉面板档 */
  will-change: transform;
  transition: opacity 160ms ease;
}
.sfp-toast-wrap[data-reduced="true"][data-leaving="true"] .sfp-toast { opacity: 0; } /* RM:入出场退化纯 fade */
.sfp-toast-dot {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  background: oklch(0.62 0.14 155);
}
.sfp-toast p { margin: 0; font-size: 13px; line-height: 1.5; color: var(--text); overflow: hidden; text-overflow: ellipsis; }
.sfp-toast-x {
  flex: none;
  position: relative;
  border: 0;
  background: transparent;
  color: var(--text-dim);
  font-size: 13px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
}
.sfp-toast-x:hover { color: var(--text); }
/* ── 四层铭牌(mono 元数据纪律)── */
.sfp-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
  pointer-events: none;
}
.sfp-layers b { font-weight: 600; color: var(--text); }
.sfp-toast-open .sfp-layers { opacity: 0; } /* 吐司弹出时让位,避免遮挡 */
@media (max-width: 720px) {
  .sfp-layers { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .sfp-toast { transition: none; }
}
`,V=300,Y=25,A=4e3,ae=900,oe=160,H=2*Math.PI*9;function pe({locale:K}){const n=K==="zh",[c,M]=r.useState(1),[U,B]=r.useState(1),[w,b]=r.useState(0),[i,k]=r.useState({name:"",env:"production",monitor:!0,confirm:!1}),[g,D]=r.useState(!1),[C,T]=r.useState(0),[G,N]=r.useState(0),[f,O]=r.useState(!1),[p,I]=r.useState(!1),[d,v]=r.useState(!1),[L,F]=r.useState(!1),$=r.useRef([]),P=r.useRef(null),J=r.useRef(null),R=r.useRef(null),E=r.useRef(null),z=r.useRef(""),y=r.useRef(A),q=r.useRef(0);r.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),s=()=>O(t.matches);return s(),t.addEventListener("change",s),()=>t.removeEventListener("change",s)},[]);const Q=()=>{z.current=i.name.trim()||(n?"未命名项目":"Untitled project"),y.current=A,I(!0),v(!1)},_=()=>{T(0),D(!1),Q()};r.useEffect(()=>{if(!g)return;if(f){_();return}let t=0;const s=performance.now(),a=o=>{const l=Math.min((o-s)/ae,1);T(Math.round(l*100)),l<1?t=requestAnimationFrame(a):_()};return t=requestAnimationFrame(a),()=>cancelAnimationFrame(t)},[g,f]),r.useEffect(()=>{if(!p||d||f)return;const t=E.current;if(!t)return;const s=t.offsetHeight+20;let a=s,o=0,l=performance.now(),u=0;const m=j=>{const x=Math.min((j-l)/1e3,.03333333333333333);l=j;const S=V*(0-a)-Y*o;if(o+=S*x,a+=o*x,t.style.transform=`translateY(${a.toFixed(2)}px)`,Math.abs(a)<.5&&Math.abs(o)<20){t.style.transform="translateY(0px)";return}u=requestAnimationFrame(m)};return t.style.transform=`translateY(${s}px)`,u=requestAnimationFrame(m),()=>cancelAnimationFrame(u)},[p,d,f]),r.useEffect(()=>{if(!d)return;const t=()=>{I(!1),v(!1),F(!1),y.current=A},s=E.current;if(f||!s){const x=window.setTimeout(t,oe);return()=>window.clearTimeout(x)}const a=s.offsetHeight+20;let o=0,l=0,u=performance.now(),m=0;const j=x=>{const S=Math.min((x-u)/1e3,.03333333333333333);u=x;const re=V*(a-o)-Y*l;if(l+=re*S,o+=l*S,s.style.transform=`translateY(${Math.max(o,0).toFixed(2)}px)`,o>=a-1){t();return}m=requestAnimationFrame(j)};return m=requestAnimationFrame(j),()=>cancelAnimationFrame(m)},[d,f]),r.useEffect(()=>{if(!p||d)return;if(L){y.current=Math.max(q.current-Date.now(),0);return}q.current=Date.now()+y.current;const t=window.setTimeout(()=>v(!0),y.current);return()=>window.clearTimeout(t)},[p,d,L]),r.useEffect(()=>{if(!p)return;const t=s=>{s.key==="Escape"&&(v(!0),R.current?.focus())};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[p]);const W=()=>{if(c===1&&!i.name.trim()){b(1),P.current?.focus();return}b(0);const t=Math.min(c+1,h.length);M(t),B(s=>Math.max(s,t)),N(t-1)},X=()=>{b(0);const t=Math.max(c-1,1);M(t),N(t-1)},Z=t=>{if(t.preventDefault(),c<h.length){W();return}!i.confirm||g||p||D(!0)},ee=(t,s)=>{const a=t.key==="ArrowRight"||t.key==="ArrowDown"?1:t.key==="ArrowLeft"||t.key==="ArrowUp"?-1:0;if(!a)return;t.preventDefault();const o=Math.min(Math.max(s+a,0),h.length-1);N(o),$.current[o]?.focus()},te=t=>w===t+1?"error":t+1<c?"finish":t+1===c?"process":"wait",se=c<h.length?n?"下一步 →":"Next →":g?n?"提交中…":"Submitting…":n?"确认提交":"Confirm submit";return e.jsxs("div",{className:`demo-stage${p?" sfp-toast-open":""}`,children:[e.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[e.jsx("span",{className:"stage-plate-dot"}),"Segmented Form Flow"]}),e.jsxs("div",{className:"sfp-scene",children:[e.jsxs("form",{className:"sfp-form",onSubmit:Z,noValidate:!0,children:[e.jsx("ol",{className:"sfp-steps","aria-label":n?"创建步骤":"Setup steps",children:h.map((t,s)=>{const a=te(s);return e.jsxs("li",{className:"sfp-step","data-state":a,children:[e.jsxs("span",{className:"sfp-step-head",children:[e.jsxs("button",{type:"button",className:"sfp-step-dot",tabIndex:s===G?0:-1,ref:o=>{$.current[s]=o},"aria-current":a==="process"?"step":void 0,"aria-label":`${n?`第 ${s+1} 步`:`Step ${s+1}`}: ${n?t.zh:t.en}${a==="error"?n?"(出错)":" (error)":""}`,title:n?t.zh:t.en,onClick:()=>{s+1<=U&&(b(0),M(s+1),N(s))},onKeyDown:o=>ee(o,s),children:[a==="finish"?"✓":a==="error"?"!":s+1,a==="process"&&C>0&&e.jsxs("svg",{className:"sfp-ring",viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[e.jsx("circle",{className:"sfp-ring-track",cx:"12",cy:"12",r:"9"}),e.jsx("circle",{className:"sfp-ring-fill",cx:"12",cy:"12",r:"9",strokeDasharray:H,strokeDashoffset:H*(1-C/100)})]})]}),e.jsx("span",{className:"sfp-step-label",children:n?t.zh:t.en})]}),e.jsx("span",{className:"sfp-step-line","data-done":s+1<c,"aria-hidden":"true"})]},t.en)})}),e.jsxs("div",{className:"sfp-body",children:[c===1&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sfp-field",children:[e.jsx("label",{htmlFor:"sfp-name",children:n?"项目名(必填)":"Project name (required)"}),e.jsx("input",{id:"sfp-name",ref:P,className:"sfp-input",value:i.name,"aria-invalid":w===1,"aria-describedby":w===1?"sfp-name-err":void 0,onChange:t=>{k(s=>({...s,name:t.target.value})),t.target.value.trim()&&b(0)},placeholder:n?"如 uiux-atlas":"e.g. uiux-atlas"}),w===1&&e.jsx("p",{className:"sfp-err",id:"sfp-name-err",role:"alert",children:n?"项目名不能为空,已标记到出错步骤":"Project name is required; the failing step is marked."})]}),e.jsx("p",{className:"sfp-note",children:n?"StepsForm 口径:每一步都是完整数据,最后一步合并提交。":"StepsForm semantics: each step holds complete data, merged and submitted at the end."})]}),c===2&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sfp-field",children:[e.jsx("label",{id:"sfp-env-label",children:n?"部署环境":"Deploy env"}),e.jsx("div",{role:"radiogroup","aria-labelledby":"sfp-env-label",style:{display:"flex",flexDirection:"column",gap:"8px"},children:["production","staging"].map(t=>e.jsxs("label",{className:"sfp-choice",children:[e.jsx("input",{type:"radio",name:"sfp-env",checked:i.env===t,onChange:()=>k(s=>({...s,env:t}))}),t]},t))})]}),e.jsxs("label",{className:"sfp-choice",children:[e.jsx("input",{type:"checkbox",checked:i.monitor,onChange:t=>k(s=>({...s,monitor:t.target.checked}))}),n?"启用监控告警":"Enable monitoring alerts"]})]}),c===3&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"sfp-summary",children:n?e.jsxs(e.Fragment,{children:["项目名 ",e.jsx("b",{children:i.name.trim()||"—"})," · 环境 ",e.jsx("b",{children:i.env})," · 监控"," ",e.jsx("b",{children:i.monitor?"开启":"关闭"})]}):e.jsxs(e.Fragment,{children:["Name ",e.jsx("b",{children:i.name.trim()||"—"})," · env ",e.jsx("b",{children:i.env})," · monitoring"," ",e.jsx("b",{children:i.monitor?"on":"off"})]})}),e.jsxs("label",{className:"sfp-choice",children:[e.jsx("input",{ref:J,type:"checkbox",checked:i.confirm,onChange:t=>k(s=>({...s,confirm:t.target.checked}))}),n?"我已确认以上配置(最后一步前再次确认)":"I confirm the configuration above (final pre-submit check)"]})]})]}),e.jsxs("div",{className:"sfp-foot",children:[c>1&&e.jsx("button",{type:"button",className:"sfp-btn",onClick:X,children:n?"← 上一步":"← Back"}),e.jsx("button",{type:"submit",className:"sfp-btn sfp-btn-primary",ref:R,disabled:c===h.length&&(!i.confirm||g),children:se})]})]}),p&&e.jsx("div",{className:"sfp-toast-wrap","data-leaving":d,"data-reduced":f,onMouseEnter:()=>F(!0),onMouseLeave:()=>F(!1),children:e.jsxs("div",{className:"sfp-toast",role:"status",ref:E,children:[e.jsx("span",{className:"sfp-toast-dot","aria-hidden":"true",children:"✓"}),e.jsx("p",{children:n?`项目「${z.current}」已创建(轻反馈档)`:`Project "${z.current}" created (light-feedback tier)`}),e.jsx("button",{type:"button",className:"sfp-toast-x","aria-label":n?"关闭通知":"Dismiss notification",onClick:()=>{v(!0),R.current?.focus()},children:"✕"})]})}),e.jsxs("p",{className:"sfp-layers","aria-hidden":"true",children:[e.jsxs("span",{children:[e.jsx("b",{children:"1"})," steps: 4-state · error mark · <532px vertical"]}),e.jsxs("span",{children:[e.jsx("b",{children:"2"})," states: hover +8% · focus +10% · press +10% (content color)"]}),e.jsxs("span",{children:[e.jsx("b",{children:"3"})," toast: k300 · c25 (ζ≈.72) · bottom · 4000ms"]}),e.jsxs("span",{children:[e.jsx("b",{children:"4"})," keys: roving · Esc→restore · Return=primary"]})]})]}),e.jsx("style",{children:ne})]})}export{pe as default};
