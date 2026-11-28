import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as $}from"./color.DuEPkvq5.js";import{D as B}from"./DemoStage.vW1CgYCd.js";const E=500,P=7;function Y(o,f,l,h){const n=3*o,b=3*(l-o)-n,w=1-n-b,g=3*f,x=3*(h-f)-g,v=1-g-x,k=a=>((w*a+b)*a+n)*a,F=a=>((v*a+x)*a+g)*a;return a=>{if(a<=0)return 0;if(a>=1)return 1;let y=0,p=1,s=a;for(let m=0;m<24;m+=1){const c=k(s);if(Math.abs(c-a)<1e-5)break;c<a?y=s:p=s,s=(y+p)/2}return F(s)}}const _=Y(.3,0,.2,1),G=o=>`
/* 舞台主题令牌只作用于本舞台(不动站点主题);data-fx-theme 切换令牌组 */
.te-stage {
  position: absolute; inset: 0; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: var(--plate-h, 40px) 8px 8px;
  --te-bg-dark: #12161f;
  --te-bg-light: #eef1f6;
  --te-fg-dark: #e8ecf4;
  --te-fg-light: #1b2230;
  --te-liquid-dark: #1c2637;
  --te-liquid-light: #d8e1ee;
  --te-panel-dark: rgba(255, 255, 255, 0.06);
  --te-panel-light: rgba(15, 23, 42, 0.05);
  --te-line-dark: rgba(255, 255, 255, 0.16);
  --te-line-light: rgba(15, 23, 42, 0.16);
  background: var(--te-bg-dark);
  color: var(--te-fg-dark);
}
.te-stage[data-fx-theme="light"] {
  background: var(--te-bg-light);
  color: var(--te-fg-light);
}
/* 涌入层填充 = 目标主题底色,由 data-fx-target 决定 */
.te-stage[data-fx-target="dark"] { --te-flood-fill: var(--te-bg-dark); }
.te-stage[data-fx-target="light"] { --te-flood-fill: var(--te-bg-light); }
/* 常驻液面带:纯色遮罩的硬边被滤镜扭成沸腾液缘(双层渲染的普通元素层,spike S5) */
.te-band-body {
  position: absolute; left: -14%; right: -14%; top: 66%; bottom: -14%;
  background: var(--te-liquid-dark);
  filter: url("#${o}");
  pointer-events: none;
}
.te-stage[data-fx-theme="light"] .te-band-body { background: var(--te-liquid-light); }
.te-band-label {
  position: absolute; left: 14px; bottom: 12px; z-index: 2;
  margin: 0; font-size: 11px; letter-spacing: 0.04em; opacity: 0.72; pointer-events: none;
}
/* 涌入液层:体高 130%、top 100% 起步(整块藏在舞台下沿外),JS 逐帧 translateY 上涌 */
.te-flood { position: absolute; inset: 0; pointer-events: none; }
.te-flood-body {
  position: absolute; left: -14%; width: 128%; top: 100%; height: 130%;
  background: var(--te-flood-fill);
  filter: url("#${o}");
  will-change: transform;
}
.te-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.te-tags {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
  font-size: 12px; font-variant-numeric: tabular-nums;
}
.te-tag {
  padding: 1px 10px; border-radius: 999px;
  border: 1px solid var(--te-line-dark); background: var(--te-panel-dark);
}
.te-stage[data-fx-theme="light"] .te-tag {
  border-color: var(--te-line-light); background: var(--te-panel-light);
}
.te-note { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.75; text-align: center; }
.te-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--te-line-dark); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--te-panel-dark); color: inherit;
}
.te-stage[data-fx-theme="light"] .te-toggle {
  border-color: var(--te-line-light); background: var(--te-panel-light);
}
.te-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
.te-defs { position: absolute; }
`;function W({entryId:o,schema:f}){const l=$(o,f),h=()=>({baseFrequency:l.get("baseFrequency"),scale:l.get("scale"),boil:l.get("boil")}),[n,b]=r.useState(h),[w,g]=r.useState("dark"),[x,v]=r.useState(null),[k,F]=r.useState(P),[a,y]=r.useState(!1),p=r.useRef("dark"),s=r.useRef(null),m=r.useRef(null),c=r.useRef(null),R=`te-turb-${o.replace(/[^a-zA-Z0-9_-]/g,"-")}`;r.useEffect(()=>l.subscribe(()=>{b(h())}),[l]),r.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),i=()=>y(e.matches);return i(),e.addEventListener("change",i),()=>e.removeEventListener("change",i)},[]),r.useEffect(()=>{if(a||n.boil<=0)return;let e=0,i=performance.now(),d=0;const S=1e3/n.boil,N=u=>{d+=u-i,i=u,d>=S&&(d%=S,F(q=>(q+1)%997)),e=requestAnimationFrame(N)};return e=requestAnimationFrame(N),()=>cancelAnimationFrame(e)},[a,n.boil]),r.useEffect(()=>()=>{s.current&&cancelAnimationFrame(s.current.raf)},[]);const j=e=>{p.current=e,g(e),v(null),c.current&&(c.current.style.transform="")},z=e=>{const i=m.current,d=c.current;if(!i||!d){j(e);return}const S=Math.max(1,d.getBoundingClientRect().height);v(e);const N=performance.now(),u={target:e,raf:0};s.current=u;const q=D=>{const T=Math.min(1,(D-N)/E),C=_(T);if(d.style.transform=`translateY(${(-C*S).toFixed(2)}px)`,T>=1){s.current=null,j(e);return}u.raf=requestAnimationFrame(q)};u.raf=requestAnimationFrame(q)},A=()=>{const e=s.current;e&&(cancelAnimationFrame(e.raf),s.current=null,j(e.target))},M=()=>{A();const e=p.current==="dark"?"light":"dark";if(a){j(e);return}z(e)};return t.jsx(B,{entryId:o,schema:f,children:t.jsxs("div",{ref:m,className:"te-stage","data-fx-stage":"","data-fx-theme":w,"data-fx-duration":a?"0":String(E),"data-fx-target":x??void 0,children:[t.jsx("p",{className:"te-title",children:"湍流液缘 Turbulence Edge"}),t.jsxs("div",{className:"te-tags",children:[t.jsxs("span",{className:"te-tag",children:["baseFrequency ",n.baseFrequency]}),t.jsxs("span",{className:"te-tag",children:["scale ",n.scale,"px"]}),t.jsxs("span",{className:"te-tag",children:["boil ",a?"0 (reduce)":n.boil,"/s"]}),t.jsxs("span",{className:"te-tag",children:["seed ",k]}),t.jsx("span",{className:"te-tag",children:a?"duration 0 (reduce)":`${E}ms`})]}),t.jsx("p",{className:"te-note",children:"纯色遮罩硬边经 feTurbulence+feDisplacementMap 扭成液缘,seed 步进即沸腾 / The mask’s hard edge is warped by feTurbulence+feDisplacementMap; stepping the seed boils it. 位移 = scale × (噪声 − 0.5)。"}),t.jsx("div",{className:"te-band-body","aria-hidden":"true"}),t.jsx("p",{className:"te-band-label",children:"liquid edge · boiling seed"}),t.jsx("div",{className:"te-flood","aria-hidden":"true",children:t.jsx("div",{ref:c,className:"te-flood-body"})}),t.jsx("svg",{className:"te-defs",width:"0",height:"0","aria-hidden":"true",focusable:"false",children:t.jsx("defs",{children:t.jsxs("filter",{id:R,x:"-20%",y:"-20%",width:"140%",height:"140%",children:[t.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:n.baseFrequency,numOctaves:2,seed:k,result:"n"}),t.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"n",scale:n.scale,xChannelSelector:"R",yChannelSelector:"G"})]})})}),t.jsx("button",{type:"button",className:"te-toggle","data-fx-toggle":!0,onClick:M,children:"切换主题 Toggle"}),t.jsx("style",{children:G(R)})]})})}export{W as default};
