import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";const V=[{id:"bottom",zh:"底部弹出",en:"Bottom"},{id:"top",zh:"顶部落下",en:"Top"}],O=300,Y=25,P=4e3,C=10,K=6,D=3,B=6,Z=384,G=24,X=160,H=.1;function ee(r,s){const c=Math.max(2,Math.ceil(Math.log(20)/(s*H))),R=c*H*1e3,f=["0% { transform: translateX(0); }"];for(let l=0;l<c;l++){const h=(l+.5)*H,E=(l+.5)/c*100,b=r*Math.exp(-s*h),A=l%2===0?-1:1;f.push(`${E.toFixed(1)}% { transform: translateX(${(A*b).toFixed(2)}px); }`)}return f.push("100% { transform: translateX(0); }"),{keyframes:`@keyframes ns-shake { ${f.join(" ")} }`,beats:c,totalMs:R}}const{keyframes:te,beats:I,totalMs:z}=ee(C,K),ne=`
${te}
.ns-scene { position: absolute; inset: 0; overflow: hidden; }
/* ── 发布表单:空标题提交 → 输入框摇晃衰减(shake-decay)── */
.ns-form {
  position: absolute;
  left: 50%;
  top: 34%;
  translate: -50% -50%;
  width: min(400px, calc(100% - 28px));
  display: flex;
  gap: 8px;
}
.ns-input {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 13px;
  color: var(--text);
  background: var(--surface);
  font-family: inherit;
}
.ns-input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ns-input[data-error="true"] { border-color: oklch(0.62 0.2 25); }
.ns-scene[data-reduced="false"] .ns-input[data-shake="true"] {
  animation: ns-shake var(--ns-shake-ms, ${z}ms) ease-in-out both;
}
.ns-send {
  position: relative;
  flex: none;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: rgba(30, 90, 220, 0.85);
}
.ns-send:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ns-err {
  position: absolute;
  left: 50%;
  top: calc(34% + 30px);
  translate: -50% 0;
  margin: 0;
  width: min(400px, calc(100% - 28px));
  font-size: 12px;
  color: oklch(0.62 0.2 25);
}
.ns-hint {
  position: absolute;
  left: 50%;
  top: calc(34% + 52px);
  translate: -50% 0;
  margin: 0;
  width: min(460px, calc(100% - 28px));
  text-align: center;
  font-size: 11.5px;
  line-height: 1.55;
  color: var(--text-faint);
}
/* ── 通知栈(吐司弹簧 + 进度倒计时):宽度 384(Ant notification)、
      距边 24px(Ant top/bottom 默认)、上限 3 条展开 + "+N" 收起牌(Ant stack threshold 3)── */
.ns-stack {
  position: absolute;
  left: 50%;
  translate: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: min(${Z}px, calc(100% - 28px));
  z-index: 5;
  pointer-events: none;
}
.ns-scene[data-edge="bottom"] .ns-stack { bottom: ${G}px; }
.ns-scene[data-edge="top"] .ns-stack { top: ${G}px; }
.ns-toast {
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 11px 12px 13px 14px;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--surface-2);
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.12), 0 9px 28px 0 rgba(0, 0, 0, 0.05); /* Ant @shadow-2 下拉面板档 */
  will-change: transform;
  transition: opacity ${X}ms ease;
}
.ns-scene[data-reduced="true"] .ns-toast[data-leaving="true"] { opacity: 0; }
.ns-dot {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 1px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  background: oklch(0.62 0.14 155);
}
.ns-dot[data-kind="error"] { background: oklch(0.62 0.19 25); }
.ns-toast p { margin: 0; flex: 1; min-width: 0; font-size: 13px; line-height: 1.5; color: var(--text); overflow: hidden; text-overflow: ellipsis; }
/* M3 snackbar「最多一个动作」:整条通知只有 ✕ 一个动作 */
.ns-close {
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
.ns-close::after { content: ""; position: absolute; inset: -4px; } /* 热区 ≥42px(spec §7) */
.ns-close:hover { color: var(--text); }
.ns-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
/* 进度倒计时条(Ant notification showProgress 语义):宽度 = 剩余寿命/lifetime,
   rAF 直写;悬停暂停计时同步暂停(pauseOnHover 默认 true) */
.ns-progress {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 4px;
  height: 2px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--text) 10%, transparent);
}
.ns-progress > i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: color-mix(in srgb, var(--accent) 85%, transparent);
}
/* "+N" 收起牌(Ant stack{threshold:3} 语义:超过 3 条收成堆叠) */
.ns-collapsed {
  pointer-events: auto;
  position: relative;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  font-variant-numeric: tabular-nums;
}
.ns-collapsed::after { content: ""; position: absolute; inset: -6px; }
.ns-collapsed:hover { color: var(--text); border-color: var(--accent); }
.ns-collapsed:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* ── 工具栏 / 铭牌(mono 元数据纪律,同批次样板)── */
.ns-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  border: 1px solid var(--border);
}
.ns-toolbar button {
  position: relative;
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: transparent;
}
.ns-toolbar button::after { content: ""; position: absolute; inset: -8px; } /* 热区 ≥42px */
.ns-toolbar button[aria-pressed="true"] { background: var(--surface-2); color: var(--text); }
.ns-layers {
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
.ns-layers b { font-weight: 600; color: var(--text); }
.ns-has-toasts .ns-layers { opacity: 0; } /* 弹出时让位 */
@media (max-width: 720px) {
  .ns-layers { display: none; }
  .ns-hint { display: none; }
}
`;function se({item:r,dir:s,reduced:c,hidden:R,onLeaving:f,onGone:l,labels:h}){const E=n.useRef(null),b=n.useRef(null),A=n.useRef(!1),k=n.useRef(P),N=n.useRef(0);n.useEffect(()=>{N.current=Date.now()+k.current;let o=0;const d=()=>{if(!A.current){const i=N.current-Date.now();if(k.current=Math.max(i,0),b.current&&(b.current.style.width=`${k.current/P*100}%`),i<=0){f(r.id);return}}o=requestAnimationFrame(d)};return o=requestAnimationFrame(d),()=>cancelAnimationFrame(o)},[r.id]);const j=()=>{A.current=!0,k.current=Math.max(N.current-Date.now(),0)},T=()=>{A.current=!1,N.current=Date.now()+k.current};return n.useEffect(()=>{if(c||r.leaving)return;const o=E.current;if(!o)return;const d=s*(o.offsetHeight+20);let i=d,p=0,g=performance.now(),m=0;const S=v=>{const y=Math.min((v-g)/1e3,.03333333333333333);g=v;const F=O*(0-i)-Y*p;if(p+=F*y,i+=p*y,o.style.transform=`translateY(${i.toFixed(2)}px)`,Math.abs(i)<.5&&Math.abs(p)<20){o.style.transform="translateY(0px)";return}m=requestAnimationFrame(S)};return o.style.transform=`translateY(${d}px)`,m=requestAnimationFrame(S),()=>cancelAnimationFrame(m)},[r.id,c]),n.useEffect(()=>{if(!r.leaving)return;const o=E.current;if(c||!o){const v=window.setTimeout(()=>l(r.id),X);return()=>window.clearTimeout(v)}const d=s*(o.offsetHeight+20);let i=0,p=0,g=performance.now(),m=0;const S=v=>{const y=Math.min((v-g)/1e3,.03333333333333333);g=v;const F=O*(d-i)-Y*p;if(p+=F*y,i+=p*y,o.style.transform=`translateY(${(s===1?Math.max(i,0):Math.min(i,0)).toFixed(2)}px)`,Math.abs(i-d)<1){l(r.id);return}m=requestAnimationFrame(S)};return m=requestAnimationFrame(S),()=>cancelAnimationFrame(m)},[r.leaving,r.id,c]),t.jsxs("div",{className:"ns-toast","data-leaving":r.leaving,ref:E,onMouseEnter:j,onMouseLeave:T,style:R&&!r.leaving?{display:"none"}:void 0,children:[t.jsx("span",{className:"ns-dot","data-kind":r.kind,"aria-hidden":"true",children:r.kind==="success"?"✓":"!"}),t.jsx("p",{children:r.text}),t.jsx("button",{type:"button",className:"ns-close","aria-label":h.dismiss,onClick:()=>f(r.id),children:"✕"}),t.jsx("span",{className:"ns-progress","aria-hidden":"true",children:t.jsx("i",{ref:b,style:{width:"100%"}})})]})}function ie({locale:r}){const s=r==="zh",[c,R]=n.useState("bottom"),[f,l]=n.useState([]),[h,E]=n.useState(!1),[b,A]=n.useState(!1),[k,N]=n.useState(0),[j,T]=n.useState(!1),o=n.useRef(null),d=n.useRef(null),i=n.useRef(0);n.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>A(e.matches);return a(),e.addEventListener("change",a),()=>e.removeEventListener("change",a)},[]);const p=c==="bottom"?1:-1,g=n.useRef(h);g.current=h;const m=(e,a,u)=>{const M=e.find(x=>x.id===a);if(!M||M.leaving)return e;const w=e.filter(x=>!x.leaving),Q=u?w.length:D;return new Set(w.slice(0,Q).map(x=>x.id)).has(a)?e.map(x=>x.id===a?{...x,leaving:!0}:x):e.filter(x=>x.id!==a)},S=e=>{l(a=>m(a,e,g.current))},v=e=>{l(a=>a.filter(u=>u.id!==e))},y=(e,a)=>{const u=++i.current;l(M=>{const w=[{id:u,text:e,kind:a,leaving:!1},...M];return w.length>B?w.slice(0,B):w})},F=e=>{e.preventDefault();const a=o.current?.value.trim()??"";if(!a){T(!0),b||N(u=>u+1);return}T(!1),y(a,"success"),o.current&&(o.current.value="")},U=()=>{y(s?"部署失败:region 不可用(重试 2/3)":"Deploy failed: region unavailable (retry 2/3)","error")};n.useEffect(()=>{const e=a=>{a.key==="Escape"&&l(u=>{const M=u.find(w=>!w.leaving);return M?(d.current?.focus(),m(u,M.id,g.current)):u})};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]);const $=f.filter(e=>!e.leaving),L=new Set((h?$:$.slice(0,D)).map(e=>e.id)),q=f.filter(e=>L.has(e.id)||e.leaving||$.includes(e)),_=$.length-Math.min($.length,h?$.length:D),W=p===1?[...q].reverse():q,J=n.useMemo(()=>s?"空标题提交 → 输入框摇晃衰减;有效标题 → 通知从边缘弹簧弹入、倒计时到点回边消失;悬停通知暂停计时。":"Empty title → the input shakes with decay; a valid title springs a toast in from the edge that leaves back the same way when the countdown ends; hover a toast to pause its timer.",[s]);return t.jsxs("div",{className:`demo-stage${f.some(e=>!e.leaving)?" ns-has-toasts":""}`,children:[t.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[t.jsx("span",{className:"stage-plate-dot"}),"Notification Stack"]}),t.jsxs("div",{className:"ns-scene","data-edge":c,"data-reduced":b,children:[t.jsxs("form",{className:"ns-form",onSubmit:F,children:[t.jsx("input",{ref:o,className:"ns-input","data-error":j,"data-shake":k>0,type:"text",placeholder:s?"通知标题(必填)":"Notification title (required)","aria-label":s?"通知标题":"Notification title","aria-invalid":j,"aria-describedby":j?"ns-err":void 0,onChange:()=>{j&&T(!1)}},`ns-input-${k}`),t.jsx("button",{type:"submit",className:"ns-send",ref:d,children:s?"发送通知":"Send"})]}),j&&t.jsx("p",{className:"ns-err",id:"ns-err",role:"alert",children:s?`标题不能为空:输入框已摇晃(A ${C}px · λ ${K}s⁻¹ · ${I} 拍/${z}ms)`:`Title required: input shook (A ${C}px · λ ${K}s⁻¹ · ${I} beats/${z}ms)`}),t.jsx("p",{className:"ns-hint",children:J}),t.jsxs("div",{className:"ns-stack",role:"status","aria-live":"polite",children:[_>0&&t.jsx("button",{type:"button",className:"ns-collapsed","aria-expanded":h,onClick:()=>E(e=>!e),children:h?s?`收起堆叠(${_})`:`Collapse stack (${_})`:s?`+${_} 条已收起`:`+${_} stacked`}),W.map(e=>t.jsx(se,{item:e,dir:p,reduced:b,hidden:!L.has(e.id)&&!e.leaving,onLeaving:S,onGone:v,labels:{dismiss:s?"关闭通知":"Dismiss notification"}},e.id))]}),t.jsxs("div",{className:"ns-toolbar",role:"group","aria-label":s?"弹入边缘 Edge":"Entry edge",children:[V.map(e=>t.jsx("button",{type:"button","aria-pressed":c===e.id,title:e.en,onClick:()=>R(e.id),children:e.zh},e.id)),t.jsx("button",{type:"button",onClick:U,title:s?"错误通知样例":"Error toast sample",children:s?"错误样例":"Error sample"})]}),t.jsxs("p",{className:"ns-layers","aria-hidden":"true",children:[t.jsxs("span",{children:[t.jsx("b",{children:"1"})," toast: k300 · c25 (ζ≈.72) · edge ",c," · 4000ms"]}),t.jsxs("span",{children:[t.jsx("b",{children:"2"})," progress: countdown bar · pauseOnHover · width 384"]}),t.jsxs("span",{children:[t.jsx("b",{children:"3"})," stack: threshold 3 · +N collapse · edge offset 24px"]}),t.jsxs("span",{children:[t.jsx("b",{children:"4"})," shake: A 10px · λ 6s⁻¹ · ",I," beats/",z,"ms"]})]})]}),t.jsx("style",{children:ne})]})}export{ie as default};
