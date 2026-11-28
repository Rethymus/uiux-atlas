import{j as n}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as N}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";const S=[{kind:"success",zh:"成功",en:"Success"},{kind:"error",zh:"失败",en:"Error"},{kind:"warning",zh:"警告",en:"Warning"},{kind:"info",zh:"信息",en:"Info"}],z={success:"已保存到草稿箱 Saved to drafts",error:"网络错误,保存失败 Network error",warning:"存储空间不足 Storage almost full",info:"已同步 3 项更改 3 changes synced"},R=`
.demo-stage { --toast-accent: #1677ff; }
.tst-page {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
}
.tst-page-title { margin: 0; font-size: 13px; color: var(--text-faint); }
.tst-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.tst-btn {
  border: 1px solid var(--border); border-radius: 8px; padding: 7px 14px;
  font-size: 13px; cursor: pointer; background: #fff; color: rgba(0, 0, 0, 0.88);
}
.tst-btn:hover { border-color: #1677ff; color: #1677ff; }
.tst-hint { margin: 0; font-size: 12px; color: var(--text-faint); }
.tst-stack {
  position: absolute; inset: 0; z-index: 20;
  display: flex; flex-direction: column; gap: 10px; padding: 14px;
  pointer-events: none; overflow: hidden;
}
.tst-stack[data-placement="top-left"] { align-items: flex-start; justify-content: flex-start; }
.tst-stack[data-placement="top-center"] { align-items: center; justify-content: flex-start; }
.tst-stack[data-placement="top-right"] { align-items: flex-end; justify-content: flex-start; }
.tst-stack[data-placement="bottom-left"] { align-items: flex-start; justify-content: flex-end; }
.tst-stack[data-placement="bottom-center"] { align-items: center; justify-content: flex-end; }
.tst-stack[data-placement="bottom-right"] { align-items: flex-end; justify-content: flex-end; }
/* 弹簧宿主:逐帧直写 transform(调研 10 §7.4),--tst-from 仅作首帧占位
   (起点 = 自身高度 200% 外滑入,react-hot-toast 入场,调研 10 §5.1) */
.tst-item {
  position: relative;
  max-width: min(340px, 100%);
  pointer-events: auto;
  transform: translate3d(0, var(--tst-from, 0px), 0);
  will-change: transform;
}
/* 卡片层:视觉 + react-hot-toast 同款缩放/淡入(0.35s 过冲 bezier,调研 10 §5.1) */
.tst-card {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px;
  background: #fff; border: 1px solid #f0f0f0; border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05), 0 1px 6px -1px rgba(0,0,0,.03), 0 2px 4px 0 rgba(0,0,0,.03);
  font-size: 13px; color: rgba(0, 0, 0, 0.88);
  animation: tst-card-in 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) both;
}
.tst-item[data-kind="success"] { --toast-accent: #52c41a; }
.tst-item[data-kind="error"] { --toast-accent: #ff4d4f; }
.tst-item[data-kind="warning"] { --toast-accent: #faad14; }
.tst-item[data-kind="info"] { --toast-accent: #1677ff; }
.tst-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--toast-accent); flex: none; }
@keyframes tst-card-in {
  from { transform: scale(0.6); opacity: 0.5; }
  to { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .tst-item { transform: none; }
  .tst-card { animation: none; }
}
`;function T(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}function C({toast:c,duration:p,stiffness:t,damping:b,isTop:u,onDone:x}){const k=s.useRef(null),d=s.useRef({x:Number.NaN,v:0}),f=s.useRef(0);return s.useEffect(()=>{const a=window.setTimeout(()=>x(c.id),p);return()=>window.clearTimeout(a)},[c.id,p,x]),s.useEffect(()=>{const a=k.current;if(!a)return;if(cancelAnimationFrame(f.current),T()){d.current={x:0,v:0},a.style.transform="translate3d(0, 0, 0)";return}let{x:r,v:o}=d.current;if(Number.isNaN(r)){const i=a.offsetHeight||44;r=u?-2*i:2*i,o=0}let y=performance.now();const g=.002,l=i=>{const w=Math.min((i-y)/1e3,.03333333333333333);y=i;const v=-t*r-b*o;o+=v*w,r+=o*w,a.style.transform=`translate3d(0, ${r}px, 0)`,d.current={x:r,v:o},Math.abs(o)>.01||Math.abs(r)>g?f.current=requestAnimationFrame(l):(d.current={x:0,v:0},a.style.transform="translate3d(0, 0, 0)")};return a.style.transform=`translate3d(0, ${r}px, 0)`,f.current=requestAnimationFrame(l),()=>cancelAnimationFrame(f.current)},[t,b,u]),n.jsx("div",{ref:k,className:"tst-item",role:"alert","data-kind":c.kind,style:{"--tst-from":`${u?"-":""}120px`},children:n.jsxs("div",{className:"tst-card",children:[n.jsx("span",{className:"tst-dot","aria-hidden":"true"}),c.text]})})}function $({entryId:c,schema:p}){const t=N(c,p),[b,u]=s.useState(()=>t.get("duration")),[x,k]=s.useState(()=>t.get("placement")),[d,f]=s.useState(()=>t.get("maxCount")),[a,r]=s.useState(()=>t.get("stiffness")),[o,y]=s.useState(()=>t.get("damping")),[g,l]=s.useState([]),i=s.useRef(1);s.useEffect(()=>t.subscribe(()=>{u(t.get("duration")),k(t.get("placement")),f(t.get("maxCount")),r(t.get("stiffness")),y(t.get("damping"))}),[t]);const w=e=>{l(h=>{const m=[...h,{id:i.current,kind:e,text:z[e]}];return i.current+=1,m.length>d?m.slice(m.length-d):m})},v=s.useCallback(e=>{l(h=>h.filter(m=>m.id!==e))},[]);s.useEffect(()=>{if(g.length===0)return;const e=h=>{h.key==="Escape"&&l([])};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[g.length]);const j=x.startsWith("top");return n.jsxs(E,{entryId:c,schema:p,children:[n.jsxs("div",{className:"tst-page",children:[n.jsx("p",{className:"tst-page-title",children:"页面内容 Page content"}),n.jsx("div",{className:"tst-btns",role:"group","aria-label":"触发全局提示 Trigger toasts",children:S.map(e=>n.jsxs("button",{type:"button",className:"tst-btn",onClick:()=>w(e.kind),children:[e.zh," ",e.en]},e.kind))}),n.jsx("p",{className:"tst-hint",children:"点按钮触发,Esc 清空全部;入场弹簧由面板 stiffness/damping 驱动 · Click to fire, Esc clears all; the entrance spring is driven by panel stiffness/damping"})]}),n.jsx("div",{className:"tst-stack","data-placement":x,children:g.map(e=>n.jsx(C,{toast:e,duration:b,stiffness:a,damping:o,isTop:j,onDone:v},e.id))}),n.jsx("style",{children:R})]})}export{$ as default};
