import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as g}from"./index.DLkBFFtG.js";import{g as W}from"./color.DuEPkvq5.js";import{D as I}from"./DemoStage.vW1CgYCd.js";const $=Math.PI*2,P=72,r=4;function O(o,s,i,p){const t=3*o,l=3*(i-o)-t,u=1-t-l,h=3*s,w=3*(p-s)-h,m=1-h-w,c=e=>((u*e+l)*e+t)*e,f=e=>((m*e+w)*e+h)*e;return e=>{if(e<=0)return 0;if(e>=1)return 1;let d=0,k=1,x=e;for(let v=0;v<24;v+=1){const j=c(x);if(Math.abs(j-e)<1e-5)break;j<e?d=x:k=x,x=(d+k)/2}return f(x)}}const X=O(.3,0,.2,1);function Y(o,s,i,p){const t=Math.max(i,.001),l=t*.375,u=Math.max(p,1),h=u*(2/3),w=$/u,m=$/h,c=$,f=c*1.618,e=Math.PI/2;return t*Math.sin(w*o-c*s)+l*Math.sin(m*o-f*s+e)}function _(o,s,i,p,t){const l=Math.max(t.amplitude,.001),u=t.direction==="up"||t.direction==="down",h=u?o:s,w=t.direction==="up"?s+l-i:t.direction==="down"||t.direction==="left"?-l+i:o+l-i,m=f=>w+Y(f,p,l,t.wavelength),c=[];for(let f=0;f<=P;f+=1){const e=-r+(h+2*r)*f/P,d=m(e);c.push(u?`L ${e.toFixed(2)} ${d.toFixed(2)}`:`L ${d.toFixed(2)} ${e.toFixed(2)}`)}return t.direction==="up"?`M ${-r} ${s+r} ${c.join(" ")} L ${o+r} ${s+r} Z`:t.direction==="down"?`M ${-r} ${-r} ${c.join(" ")} L ${o+r} ${-r} Z`:t.direction==="left"?`M ${-r} ${-r} ${c.join(" ")} L ${-r} ${s+r} Z`:`M ${o+r} ${-r} ${c.join(" ")} L ${o+r} ${s+r} Z`}const G=`
/* 舞台主题令牌只作用于本舞台(不动站点主题);data-fx-theme 切换令牌组 */
.wf-stage {
  position: absolute; inset: 0; overflow: hidden;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: var(--plate-h, 40px) 8px 8px;
  --wf-bg-dark: #12161f;
  --wf-bg-light: #eef1f6;
  --wf-fg-dark: #e8ecf4;
  --wf-fg-light: #1b2230;
  --wf-panel-dark: rgba(255, 255, 255, 0.06);
  --wf-panel-light: rgba(15, 23, 42, 0.05);
  --wf-line-dark: rgba(255, 255, 255, 0.16);
  --wf-line-light: rgba(15, 23, 42, 0.16);
  background: var(--wf-bg-dark);
  color: var(--wf-fg-dark);
  transition: none;
}
.wf-stage[data-fx-theme="light"] {
  background: var(--wf-bg-light);
  color: var(--wf-fg-light);
}
/* 涌入层:fill = 目标主题底色,由 data-fx-target 决定 */
.wf-stage[data-fx-target="dark"] { --wf-flood-fill: var(--wf-bg-dark); }
.wf-stage[data-fx-target="light"] { --wf-flood-fill: var(--wf-bg-light); }
.wf-flood {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none; display: none;
}
.wf-stage[data-fx-target] .wf-flood { display: block; }
.wf-flood-body { fill: var(--wf-flood-fill); }
/* display:contents 让内容元素直接成为舞台 flex 项(液面 svg 与按钮仍是绝对定位兄弟) */
.wf-page { display: contents; }
.wf-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.wf-cards { display: flex; gap: 8px; width: min(420px, 100%); }
.wf-card {
  flex: 1 1 0; height: 56px; border-radius: 10px;
  background: var(--wf-panel-dark); border: 1px solid var(--wf-line-dark);
}
.wf-stage[data-fx-theme="light"] .wf-card {
  background: var(--wf-panel-light); border-color: var(--wf-line-light);
}
.wf-tags {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
  font-size: 12px; font-variant-numeric: tabular-nums;
}
.wf-tag {
  padding: 1px 10px; border-radius: 999px;
  border: 1px solid var(--wf-line-dark); background: var(--wf-panel-dark);
}
.wf-stage[data-fx-theme="light"] .wf-tag {
  border-color: var(--wf-line-light); background: var(--wf-panel-light);
}
.wf-note { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.75; text-align: center; }
.wf-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--wf-line-dark); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--wf-panel-dark); color: inherit;
}
.wf-stage[data-fx-theme="light"] .wf-toggle {
  border-color: var(--wf-line-light); background: var(--wf-panel-light);
}
.wf-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`;function V({entryId:o,schema:s}){const i=W(o,s),p=()=>({amplitude:i.get("amplitude"),wavelength:i.get("wavelength"),duration:i.get("duration"),direction:i.get("direction")}),[t,l]=g.useState(p),[u,h]=g.useState("dark"),[w,m]=g.useState(null),[c,f]=g.useState(!1),e=g.useRef("dark"),d=g.useRef(null),k=g.useRef(null),x=g.useRef(null);g.useEffect(()=>i.subscribe(()=>{l(p())}),[i]),g.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)"),b=()=>f(n.matches);return b(),n.addEventListener("change",b),()=>n.removeEventListener("change",b)},[]),g.useEffect(()=>()=>{d.current&&cancelAnimationFrame(d.current.raf)},[]);const v=n=>{e.current=n,h(n),m(null)},j=n=>{const b=k.current,y=x.current;if(!b||!y){v(n);return}const N=b.getBoundingClientRect(),F=Math.max(1,N.width),E=Math.max(1,N.height),T=Math.max(1,t.duration),D=Math.max(t.amplitude,.001),Z=(t.direction==="up"||t.direction==="down"?E:F)+2*D;m(n);const R=performance.now(),M={target:n,raf:0};d.current=M;const L=S=>{const A=Math.min(1,(S-R)/T),q=X(A),B=(S-R)/1e3;if(y.setAttribute("d",_(F,E,q*Z,B,t)),A>=1){d.current=null,v(n);return}M.raf=requestAnimationFrame(L)};M.raf=requestAnimationFrame(L)},z=()=>{const n=d.current;n&&(cancelAnimationFrame(n.raf),d.current=null,v(n.target))},C=()=>{z();const n=e.current==="dark"?"light":"dark";if(c||t.duration<=0){v(n);return}j(n)};return a.jsx(I,{entryId:o,schema:s,children:a.jsxs("div",{ref:k,className:"wf-stage","data-fx-stage":"","data-fx-theme":u,"data-fx-duration":c?"0":String(Math.max(0,Math.round(t.duration))),"data-fx-target":w??void 0,children:[a.jsxs("div",{className:"wf-page",children:[a.jsx("p",{className:"wf-title",children:"波浪涌入 Wave Flood"}),a.jsxs("div",{className:"wf-cards","aria-hidden":"true",children:[a.jsx("div",{className:"wf-card"}),a.jsx("div",{className:"wf-card"}),a.jsx("div",{className:"wf-card"})]}),a.jsxs("div",{className:"wf-tags",children:[a.jsxs("span",{className:"wf-tag",children:["A ",t.amplitude,"px"]}),a.jsxs("span",{className:"wf-tag",children:["λ ",t.wavelength,"px"]}),a.jsxs("span",{className:"wf-tag",children:["k≈",($/Math.max(t.wavelength,1)).toFixed(4)," rad/px"]}),a.jsx("span",{className:"wf-tag",children:c?"duration 0 (reduce)":`${t.duration}ms`}),a.jsx("span",{className:"wf-tag",children:t.direction==="up"?"↑ 自下向上":t.direction==="down"?"↓ 自上向下":t.direction==="left"?"→ 自左向右":"← 自右向左"})]}),a.jsx("p",{className:"wf-note",children:"点击后新主题色以波浪液面上涨覆盖,覆盖完成瞬间翻转主题 / The new theme floods in as a wave surface; the theme flips the instant coverage completes. Click again mid-wave: the old run finishes instantly, the new one plays in full."})]}),a.jsx("svg",{className:"wf-flood","aria-hidden":"true",focusable:"false",children:a.jsx("path",{ref:x,className:"wf-flood-body"})}),a.jsx("button",{type:"button",className:"wf-toggle","data-fx-toggle":!0,onClick:C,children:"切换主题 Toggle"}),a.jsx("style",{children:G})]})})}export{V as default};
