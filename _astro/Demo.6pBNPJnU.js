import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as p}from"./index.DLkBFFtG.js";import{g as C}from"./color.DuEPkvq5.js";import{D as B}from"./DemoStage.vW1CgYCd.js";const y=["1月","2月","3月","4月","5月","6月"],a=[{zh:"本年",en:"This year",hex:"#0072B2",values:[64,58,71,66,78,84]},{zh:"上年",en:"Last year",hex:"#E69F00",values:[42,47,39,52,48,56]}],w=560,M=300,i={top:26,right:14,bottom:36,left:42},H=w-i.left-i.right,W=M-i.top-i.bottom,A=100,$=100,I=`
.tl-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 10px; }
.tl-toolbar { display: flex; flex-wrap: wrap; gap: 6px 10px; justify-content: center; align-items: center; font-size: 12px; color: var(--text-dim); }
.tl-toolbar button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-dim);
  background: var(--surface);
}
.tl-toolbar button[aria-pressed="true"] { background: var(--accent-dim); border-color: var(--accent); color: var(--text); }
.tl-panel {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}
.tl-legend { display: flex; gap: 14px; justify-content: center; font-size: 12.5px; color: var(--text); }
.tl-row { display: flex; gap: 8px; align-items: center; justify-content: center; min-height: 0; }
.tl-row svg { max-height: 100%; max-width: 100%; }
.tl-bar { cursor: pointer; }
.tl-bar:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.tl-tip {
  position: absolute;
  z-index: 4;
  max-width: 200px;
  padding: 7px 10px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text);
  pointer-events: auto;
}
.tl-tip b { font-variant-numeric: tabular-nums; }
.tl-hint { text-align: center; font-size: 11.5px; line-height: 1.5; color: var(--text-faint); }
`;function K({entryId:E,schema:P}){const h=C(E,P),z=()=>({legendPos:h.get("legendPos"),tooltipFollow:h.get("tooltipFollow")}),[u,F]=p.useState(z),[n,g]=p.useState(null),[k,S]=p.useState({x:0,y:0}),f=p.useRef(null),c=p.useRef(null);p.useEffect(()=>h.subscribe(()=>{F(z())}),[h]),p.useEffect(()=>{if(!n)return;const t=o=>{o.key==="Escape"&&(c.current&&clearTimeout(c.current),g(null))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[n]);const m=u.tooltipFollow==="on",N=()=>{c.current&&clearTimeout(c.current),c.current=setTimeout(()=>g(null),$)},j=()=>{c.current&&(clearTimeout(c.current),c.current=null)},s=t=>i.top+W*(1-t/A),d=H/y.length,x=Math.min(34,d/a.length*.62),R=(t,o)=>r=>{j(),g({si:t,qi:o});const l=f.current?.getBoundingClientRect();l&&S({x:r.clientX-l.left,y:r.clientY-l.top})},T=a.map(t=>e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6},children:[e.jsx("span",{"aria-hidden":"true",style:{width:12,height:12,borderRadius:3,background:t.hex,border:"1px solid var(--border-strong)",display:"inline-block"}}),t.zh," ",t.en]},t.en)),b=n?a[n.si]:null,L=n?a[n.si].values[n.qi]:0;return e.jsxs(B,{entryId:E,schema:P,children:[e.jsxs("div",{className:"tl-stage",children:[e.jsxs("div",{className:"tl-toolbar",role:"group","aria-label":"图例与提示设置 Legend and tooltip settings",children:[["top","right","none"].map(t=>e.jsxs("button",{type:"button","aria-pressed":u.legendPos===t,onClick:()=>h.set("legendPos",t),children:["图例 ",t==="top"?"顶部 Top":t==="right"?"右侧 Right":"无 None"]},t)),e.jsxs("button",{type:"button","aria-pressed":m,onClick:()=>h.set("tooltipFollow",m?"off":"on"),children:["tooltip ",m?"跟随 Follow":"停靠 Docked"]})]}),e.jsxs("div",{className:"tl-panel",ref:f,onPointerLeave:()=>{N()},children:[u.legendPos==="top"&&e.jsx("div",{className:"tl-legend",children:T}),e.jsxs("div",{className:"tl-row",children:[e.jsxs("svg",{viewBox:`0 0 ${w} ${M}`,role:"img","aria-label":"分组柱状图 Grouped bar chart",style:u.legendPos==="right"?{flex:"1 1 auto",minHeight:0}:void 0,children:[[0,25,50,75,100].map(t=>e.jsx("line",{x1:i.left,x2:i.left+H,y1:s(t),y2:s(t),stroke:"currentColor",opacity:"0.12"},t)),e.jsx("text",{x:i.left-8,y:s(50)+4,textAnchor:"end",fontSize:"11",fill:"var(--text-dim)",children:"50"},"ylab"),y.map((t,o)=>e.jsxs("g",{children:[e.jsx("text",{x:i.left+d*o+d/2,y:s(0)+18,textAnchor:"middle",fontSize:"12",fill:"var(--text-dim)",children:t}),a.map((r,l)=>{const v=r.values[o],D=i.left+d*o+(d-x*a.length)/2+l*x;return e.jsx("rect",{className:"tl-bar",tabIndex:0,x:D,y:s(v),width:x-2,height:s(0)-s(v),fill:r.hex,opacity:n&&!(n.si===l&&n.qi===o)?.55:1,"aria-label":`${r.zh} ${y[o]}:${v}`,onPointerMove:R(l,o),onPointerDown:R(l,o),onFocus:()=>{j(),g({si:l,qi:o}),f.current?.getBoundingClientRect()&&S({x:D+x,y:s(v)})},onBlur:N},r.en)}),u.legendPos==="none"&&o===0&&a.map((r,l)=>e.jsx("text",{x:i.left+d*0+(d-x*a.length)/2+l*x+(x-2)/2,y:s(a[l].values[0])-8,textAnchor:"middle",fontSize:"10.5",fill:r.hex==="#E69F00"?"var(--text)":r.hex,fontWeight:"600",children:r.zh},r.en))]},t))]}),u.legendPos==="right"&&e.jsx("div",{className:"tl-legend",style:{flexDirection:"column",gap:8},children:T})]}),b&&n&&e.jsxs("div",{className:"tl-tip",role:"status",onPointerEnter:j,style:m?{left:Math.min(Math.max(8,k.x+14),(f.current?.clientWidth??w)-170),top:Math.max(4,k.y-46)}:{right:12,top:6},children:[e.jsxs("div",{children:[e.jsx("span",{"aria-hidden":"true",style:{display:"inline-block",width:10,height:10,borderRadius:3,background:b.hex,marginRight:6,border:"1px solid var(--border-strong)"}}),b.zh," ",b.en," · ",y[n.qi]]}),e.jsxs("div",{children:["值 value: ",e.jsx("b",{children:L})]}),e.jsx("div",{style:{color:"var(--text-faint)",fontSize:11},children:"Esc 关闭 · hideDelay 100ms"})]})]}),e.jsxs("p",{className:"tl-hint",children:["hover/点击柱体显示提示;Esc 可关;指针可移入提示本体;移出 100ms 后隐藏(ECharts 默认)。"," ","Hover/tap a bar; Esc dismisses; the pointer may enter the tooltip; it hides 100ms after pointer-out (ECharts default)。"]})]}),e.jsx("style",{children:I})]})}export{K as default};
