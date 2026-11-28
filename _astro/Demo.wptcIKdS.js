import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as z}from"./color.DuEPkvq5.js";import{D as B}from"./DemoStage.vW1CgYCd.js";const $={"bottom center":"bottom","top center":"top","right center":"right","left center":"left"},F={"bottom center":"top center","top center":"bottom center","right center":"left center","left center":"right center"},D={"bottom center":"margin-top","top center":"margin-bottom","right center":"margin-left","left center":"margin-right"},O=`
.ap-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.ap-stage {
  position: relative;
  height: 260px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 12px;
  overflow: hidden;
  background:
    repeating-linear-gradient(45deg, color-mix(in srgb, currentColor 4%, transparent) 0 12px, transparent 12px 24px);
}
.ap-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  anchor-name: --ap-btn;   /* 命名锚点(不支持的浏览器忽略此声明) */
  border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 35%, color-mix(in srgb, Canvas 88%, transparent));
  color: inherit;
}
.ap-btn:focus-visible { outline: 2px solid oklch(0.62 0.15 250); outline-offset: 2px; }
.ap-pop {
  position: fixed;
  position-anchor: --ap-btn;          /* 关联锚点 */
  position-area: bottom center;        /* 声明式九宫格(引擎不支持时整组声明无效,走 JS 回退) */
  margin-top: var(--ap-offset);
  position-visibility: anchors-visible;
  width: min(230px, 60vw);
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, currentColor 32%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, Canvas 92%, currentColor);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
  font-size: 12px;
  line-height: 1.55;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.ap-pop[data-open="true"] { opacity: 1; pointer-events: auto; }
.ap-pop b { display: block; font-size: 12.5px; margin-bottom: 2px; }
.ap-pop[data-path="js"] {
  /* JS 回退路径:absolute 定位,坐标由 React 计算(声明见下方生成 style) */
  position: absolute;
  position-anchor: auto;
  position-area: auto;
  position-visibility: visible;
}
.ap-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.ap-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.ap-chip-native { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.ap-chip-js { background: color-mix(in srgb, oklch(0.68 0.14 75) 30%, transparent); }
.ap-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
.ap-hint code {
  font: 11.5px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, currentColor 8%, transparent);
  border-radius: 5px;
  padding: 1px 5px;
}
@media (prefers-reduced-motion: reduce) {
  .ap-pop { transition: none; }
  .ap-chip { transition: none; }
}
`;function W({entryId:y,schema:v}){const p=z(y,v),[s,N]=a.useState(()=>p.get("area")),[r,A]=a.useState(()=>p.get("offset")),[c,J]=a.useState(()=>p.get("tryFallback")),[h,M]=a.useState(!0),[b,j]=a.useState(null),S=a.useRef(null),C=a.useRef(null),k=a.useRef(null);a.useEffect(()=>p.subscribe(()=>{N(p.get("area")),A(p.get("offset")),J(p.get("tryFallback"))}),[p]);const l=typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports("anchor-name: --a"):!1;a.useEffect(()=>{if(l||!h){j(null);return}const x=S.current,E=C.current,g=k.current;if(!x||!E||!g)return;const o=x.getBoundingClientRect(),t=E.getBoundingClientRect(),d=g.offsetWidth,f=g.offsetHeight,u=$[s]??"bottom";let i,n;if(u==="bottom"?(i=t.left-o.left+t.width/2-d/2,n=t.bottom-o.top+r):u==="top"?(i=t.left-o.left+t.width/2-d/2,n=t.top-o.top-f-r):u==="right"?(i=t.right-o.left+r,n=t.top-o.top+t.height/2-f/2):(i=t.left-o.left-d-r,n=t.top-o.top+t.height/2-f/2),(i<0||n<0||i+d>o.width||n+f>o.height)&&c==="on"){const P=F[s]??"top center",m=$[P]??"top";m==="top"?(i=t.left-o.left+t.width/2-d/2,n=t.top-o.top-f-r):m==="bottom"?(i=t.left-o.left+t.width/2-d/2,n=t.bottom-o.top+r):m==="right"?(i=t.right-o.left+r,n=t.top-o.top+t.height/2-f/2):(i=t.left-o.left-d-r,n=t.top-o.top+t.height/2-f/2)}j({left:Math.max(4,i),top:Math.max(4,n)})},[l,h,s,r,c]);const w=D[s]??"margin-top",R=F[s]??"top center";return e.jsx(B,{entryId:y,schema:v,children:e.jsxs("div",{className:"ap-wrap",children:[e.jsxs("div",{ref:S,className:"ap-stage",children:[e.jsx("button",{ref:C,type:"button",className:"ap-btn","aria-expanded":h,"aria-describedby":"ap-pop-body",onClick:()=>M(x=>!x),children:"帮助 Help"}),e.jsxs("div",{ref:k,className:"ap-pop",id:"ap-pop-body",role:"note","data-open":h?"true":"false","data-path":l?"css":"js",style:!l&&b?{left:b.left,top:b.top}:{[w]:"var(--ap-offset)"},children:[e.jsx("b",{children:"锚点浮层 Anchored pop"}),e.jsx("span",{children:l?`position-area: ${s};${c==="on"?` 溢出翻面 → ${R}(@position-try)。`:" 未启用溢出换位。"}`:`JS 回退:getBoundingClientRect + ${s} 语义换算${c==="on"?",溢出翻面对侧。":",不翻面。"}`})]}),e.jsx("style",{children:`
.ap-pop[data-path="css"] {
  position-area: ${s};
  ${w}: var(--ap-offset);
  ${c==="on"?"position-try-fallbacks: --ap-flip;":""}
}
${c==="on"?`@position-try --ap-flip { position-area: ${R}; }`:""}
`})]}),e.jsxs("div",{className:"ap-readout","aria-live":"polite",children:[e.jsxs("span",{children:["area = ",s]}),e.jsxs("span",{children:["offset = ",r,"px"]}),e.jsxs("span",{children:["tryFallback = ",c]}),e.jsx("span",{className:`ap-chip ${l?"ap-chip-native":"ap-chip-js"}`,children:l?"本浏览器:原生 anchor 定位(纯 CSS)":"本浏览器:JS 回退(getBoundingClientRect)"})]}),e.jsxs("p",{className:"ap-hint",children:["原生路径:",e.jsx("code",{children:"anchor-name: --ap-btn"})," 命名锚点 → ",e.jsx("code",{children:"position-area"})," 贴合 → ",e.jsx("code",{children:"@position-try"})," 溢出翻面 → ",e.jsx("code",{children:"position-visibility: anchors-visible"})," 条件隐藏,零 JS。 切 area 四向 / 开关 tryFallback 观察换位;支持面:Chrome/Edge 125、Safari 26(position-visibility 增补 26.2)、Firefox 147(调研 11§1)。 Native path: ",e.jsx("code",{children:"anchor-name: --ap-btn"})," names the anchor → ",e.jsx("code",{children:"position-area"})," pins it → ",e.jsx("code",{children:"@position-try"})," flips on overflow → ",e.jsx("code",{children:"position-visibility: anchors-visible"})," hides conditionally, all CSS. Switch area / toggle tryFallback to watch the flip; support: Chrome/Edge 125, Safari 26 (position-visibility in 26.2), Firefox 147 (research 11 §1)."]}),e.jsx("style",{children:O})]})})}export{W as default};
