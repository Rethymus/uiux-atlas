import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as S}from"./color.DuEPkvq5.js";import{D as E}from"./DemoStage.vW1CgYCd.js";const h={auto:{block:100,swap:Number.POSITIVE_INFINITY},block:{block:3e3,swap:Number.POSITIVE_INFINITY},swap:{block:0,swap:Number.POSITIVE_INFINITY},fallback:{block:100,swap:3e3},optional:{block:100,swap:0}},l=3500,T=3600;function F(n,f,a){const{block:i,swap:c}=h[f],s=i??100;return n>=a&&n>=s?"loaded":n<s?"block":c===0||c!==Number.POSITIVE_INFINITY&&n>=s+c?"failed":"swap"}const C=`
.fd-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.fd-timeline { position: relative; height: 30px; border-radius: 8px; overflow: hidden;
  background: color-mix(in srgb, currentColor 8%, transparent); }
.fd-seg { position: absolute; top: 0; bottom: 0; }
.fd-seg-block { background: repeating-linear-gradient(45deg,
  color-mix(in srgb, currentColor 14%, transparent) 0 6px, transparent 6px 12px); }
.fd-seg-swap { background: color-mix(in srgb, oklch(0.75 0.12 85) 35%, transparent); }
.fd-seg-fail { background: color-mix(in srgb, oklch(0.65 0.18 30) 30%, transparent); }
.fd-arrival { position: absolute; top: 0; bottom: 0; width: 2px; background: currentColor; }
.fd-needle { position: absolute; top: 3px; bottom: 3px; width: 2px; border-radius: 1px;
  background: oklch(0.55 0.15 260); }
.fd-scale { display: flex; justify-content: space-between; font-size: 10px; opacity: 0.65; }
.fd-card { padding: 16px 18px; border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px; }
.fd-text { font-family: Georgia, "Times New Roman", serif; font-size: 17px; line-height: 1.6; }
.fd-text[data-loaded="true"] { font-family: "Courier New", ui-monospace, monospace; }
.fd-text[data-phase="block"] { color: transparent;
  background: repeating-linear-gradient(90deg,
    color-mix(in srgb, currentColor 16%, transparent) 0 34px, transparent 34px 44px);
  border-radius: 4px; user-select: none; }
.fd-phasebar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-size: 12px; }
.fd-phase { padding: 2px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent); }
.fd-btn { border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 999px;
  padding: 5px 14px; font-size: 12px; cursor: pointer; background: transparent; color: inherit; }
.fd-btn-primary { background: color-mix(in srgb, oklch(0.55 0.15 260) 75%, transparent);
  border-color: transparent; color: #fff; }
.fd-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .fd-needle { display: none; }
}
`,N={block:{zh:"封锁期:文本不可见(FOIT)",en:"Block: text invisible (FOIT)"},swap:{zh:"交换期:后备字体可见(FOUT)",en:"Swap: fallback visible (FOUT)"},loaded:{zh:"已加载:webfont 换上",en:"Loaded: webfont swapped in"},failed:{zh:"放弃交换:整页保持后备字体",en:"Given up: fallback for the whole page"}};function M({entryId:n,schema:f}){const a=S(n,f),[i,c]=t.useState(()=>a.get("display")),[s,y]=t.useState(()=>a.get("loadDelay")),[m,b]=t.useState(0),[I,g]=t.useState(0),x=t.useRef(0);t.useEffect(()=>a.subscribe(()=>{c(a.get("display")),y(a.get("loadDelay"))}),[a]),t.useEffect(()=>{g(d=>d+1)},[i,s]),t.useEffect(()=>{if(typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches){b(T);return}const j=performance.now(),k=v=>{const w=v-j;if(w>=l){b(l);return}b(w),x.current=requestAnimationFrame(k)};return x.current=requestAnimationFrame(k),()=>cancelAnimationFrame(x.current)},[I]);const u=F(m,i,s),o=h[i].block??100,p=h[i].swap,r=d=>`${Math.min(100,d/l*100)}%`;return e.jsxs(E,{entryId:n,schema:f,children:[e.jsxs("div",{className:"fd-wrap",children:[e.jsxs("div",{className:"fd-timeline","aria-hidden":"true",children:[e.jsx("div",{className:"fd-seg fd-seg-block",style:{left:0,width:r(o)}}),p===0?e.jsx("div",{className:"fd-seg fd-seg-fail",style:{left:r(o),right:0}}):p===Number.POSITIVE_INFINITY?e.jsx("div",{className:"fd-seg fd-seg-swap",style:{left:r(o),right:0}}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fd-seg fd-seg-swap",style:{left:r(o),width:r(Math.min(p,l-o))}}),o+p<l&&e.jsx("div",{className:"fd-seg fd-seg-fail",style:{left:r(o+p),right:0}})]}),s<=l&&e.jsx("div",{className:"fd-arrival",style:{left:r(s)}}),e.jsx("div",{className:"fd-needle",style:{left:r(m)}})]}),e.jsxs("div",{className:"fd-scale","aria-hidden":"true",children:[e.jsx("span",{children:"0ms"}),e.jsx("span",{children:"100ms"}),e.jsx("span",{children:"1s"}),e.jsx("span",{children:"2s"}),e.jsx("span",{children:"3s+"})]}),e.jsx("div",{className:"fd-card",children:e.jsx("p",{className:"fd-text","data-phase":u,"data-loaded":u==="loaded"?"true":"false",children:"The quick brown fox jumps over the lazy dog. 敏捷的棕色狐狸跳过懒狗 0123456789。"})}),e.jsxs("div",{className:"fd-phasebar",children:[e.jsxs("span",{className:"fd-phase",children:[N[u].zh," / ",N[u].en]}),e.jsxs("span",{className:"fd-phase",children:["@",Math.round(m),"ms · 字体到达 ",s,"ms"]}),e.jsx("button",{type:"button",className:"fd-btn fd-btn-primary",onClick:()=>g(d=>d+1),children:"重新加载 Reload"})]}),e.jsx("p",{className:"fd-note",children:"演示为等价状态机,非真实网络;font-display 是 @font-face 描述符,不能经 CSS 变量在常规样式生效。数值表:swap 0ms/无限、fallback 100ms/3s、optional 100ms/无、block 封锁 2–3s(web.dev 原文核对,调研 05§21);auto 浏览器自定义,演示按 100ms 处理;block 档演示取上界 3s。 This is an equivalent state machine, not a real network; font-display is an @font-face descriptor and cannot ride CSS variables. Table: swap 0ms/infinite, fallback 100ms/3s, optional 100ms/none, block 2–3s (verified from web.dev, research 05 §21); auto is browser-defined, simulated here as 100ms; block uses the 3s upper bound."})]}),e.jsx("style",{children:C})]})}export{M as default};
