import{j as l}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as X}from"./color.DuEPkvq5.js";import{D as _}from"./DemoStage.vW1CgYCd.js";const P=Math.PI*2,Y=64,z=6;function G(i,g,f,m){const c=3*i,v=3*(f-i)-c,b=1-c-v,h=3*g,u=3*(m-g)-h,R=1-h-u,o=t=>((b*t+v)*t+c)*t,d=t=>((R*t+u)*t+h)*t;return t=>{if(t<=0)return 0;if(t>=1)return 1;let k=0,M=1,p=t;for(let A=0;A<24;A+=1){const N=o(p);if(Math.abs(N-t)<1e-5)break;N<t?k=p:M=p,p=(k+M)/2}return d(p)}}const J=G(.3,0,.2,1);function K(i,g,f,m){const c=Math.max(f,.001),v=c*.375,b=Math.max(m,1),h=b*(2/3),u=P/b,R=P/h,o=P,d=o*1.618,t=Math.PI/2;return c*Math.sin(u*i-o*g)+v*Math.sin(R*i-d*g+t)}function Q(i,g,f,m){const c=Math.max(m.amplitude,.001),v=Math.min(100,Math.max(0,g)),b=i.cy+i.R-v/100*2*i.R,h=i.cx-i.R-z,u=i.cx+i.R+z,R=i.cy+i.R+z;let o="";for(let d=0;d<=Y;d+=1){const t=h+(u-h)*d/Y,k=b+K(t,f,c,m.wavelength);o+=`${d===0?"M":"L"} ${t.toFixed(2)} ${k.toFixed(2)} `}return`${o}L ${u.toFixed(2)} ${R.toFixed(2)} L ${h.toFixed(2)} ${R.toFixed(2)} Z`}const U=`
/* 舞台主题令牌只作用于本舞台(不动站点主题);data-fx-theme 切换令牌组 */
.wfill-stage {
  position: absolute; inset: 0; overflow: hidden;
  --wfill-bg-dark: #12161f;
  --wfill-bg-light: #eef1f6;
  --wfill-fg-dark: #e8ecf4;
  --wfill-fg-light: #1b2230;
  --wfill-panel-dark: rgba(255, 255, 255, 0.06);
  --wfill-panel-light: rgba(15, 23, 42, 0.05);
  --wfill-line-dark: rgba(255, 255, 255, 0.2);
  --wfill-line-light: rgba(15, 23, 42, 0.22);
  /* 液体色 = demo 设计值:深色主题 = 更深的蓝(深水),浅色主题 = 更浅的蓝(浅水) */
  --wfill-liquid-dark: #2e6bb8;
  --wfill-liquid-light: #7fb6e6;
  background: var(--wfill-bg-dark);
  color: var(--wfill-fg-dark);
}
.wfill-stage[data-fx-theme="light"] { background: var(--wfill-bg-light); color: var(--wfill-fg-light); }
.wfill-stage[data-fx-theme="dark"] { --wfill-liquid: var(--wfill-liquid-dark); --wfill-line: var(--wfill-line-dark); --wfill-panel: var(--wfill-panel-dark); }
.wfill-stage[data-fx-theme="light"] { --wfill-liquid: var(--wfill-liquid-light); --wfill-line: var(--wfill-line-light); --wfill-panel: var(--wfill-panel-light); }
.wfill-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.wfill-water { fill: var(--wfill-liquid); }
.wfill-ring { fill: none; stroke: var(--wfill-line); stroke-width: 2; }
.wfill-tick { stroke: var(--wfill-line); stroke-width: 1; stroke-dasharray: 4 7; opacity: 0.7; }
.wfill-page {
  position: absolute; left: 16px; right: 64px; top: calc(var(--plate-h, 40px) + 8px); z-index: 1;
  display: flex; flex-direction: column; gap: 7px; align-items: flex-start;
  pointer-events: none;
}
.wfill-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.wfill-chips { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; font-variant-numeric: tabular-nums; }
.wfill-chip { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--wfill-line); background: var(--wfill-panel); }
.wfill-note { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.5; opacity: 0.75; text-align: left; }
.wfill-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--wfill-line); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--wfill-panel); color: inherit;
}
.wfill-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`;function le({entryId:i,schema:g}){const f=X(i,g),m=()=>({amplitude:f.get("amplitude"),wavelength:f.get("wavelength"),duration:f.get("duration"),deepLevel:f.get("deepLevel"),shallowLevel:f.get("shallowLevel")}),[c,v]=n.useState(m),[b,h]=n.useState("dark"),[u,R]=n.useState(!1),o=n.useRef(c);o.current=c;const d=n.useRef("dark"),t=n.useRef(!1),k=n.useRef(null),M=n.useRef(null),p=n.useRef(null),A=n.useRef(null),N=n.useRef(null),T=n.useRef(null),q=n.useRef(null),E=n.useRef({cx:320,cy:240,R:110}),w=n.useRef(m().deepLevel),x=n.useRef(null),C=(e,r)=>e==="dark"?r.deepLevel:r.shallowLevel,S=e=>{const r=A.current,s=E.current;!r||!s||(r.setAttribute("d",Q(s,w.current,e,o.current)),q.current&&(q.current.textContent=`${Math.round(w.current)}%`))},D=()=>{const e=k.current;if(!e)return;const r=e.getBoundingClientRect(),s=Math.max(1,Math.round(r.width)),j=Math.max(1,Math.round(r.height)),a=144,y=s-24,O=Math.max(120,j-a-24),$=Math.max(56,Math.min(120,Math.min(y,O)/2*.92)),Z=Math.round(s/2),H=Math.round(Math.min(a+$+20+Math.max(0,(O-2*$)/2),j-$-10));E.current={cx:Z,cy:H,R:Math.round($)};const L=E.current;M.current&&(M.current.setAttribute("cx",String(L.cx)),M.current.setAttribute("cy",String(L.cy)),M.current.setAttribute("r",String(L.R))),p.current&&(p.current.setAttribute("cx",String(L.cx)),p.current.setAttribute("cy",String(L.cy)),p.current.setAttribute("r",String(L.R))),W()},W=()=>{const e=E.current,r=o.current;if(!e)return;const s=a=>e.cy+e.R-Math.min(100,Math.max(0,a))/100*2*e.R,j=(a,y)=>{a&&(a.setAttribute("x1",String(e.cx-e.R+8)),a.setAttribute("x2",String(e.cx+e.R-8)),a.setAttribute("y1",String(s(y))),a.setAttribute("y2",String(s(y))))};j(N.current,r.deepLevel),j(T.current,r.shallowLevel)},F=e=>{d.current=e,h(e)},I=()=>{const e=d.current==="dark"?"light":"dark",r=C(e,o.current);if(t.current||o.current.duration<=0){x.current=null,w.current=r,F(e),S(0);return}const s=x.current;s&&(x.current=null,w.current=s.to,F(s.target)),x.current={from:w.current,to:r,started:performance.now(),dur:Math.max(1,o.current.duration),target:e}};n.useEffect(()=>f.subscribe(()=>{const e=m();v(e),x.current||(w.current=C(d.current,e),t.current&&S(0)),W()}),[f]),n.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),r=()=>{if(t.current=e.matches,R(e.matches),e.matches&&x.current){const s=x.current;x.current=null,w.current=s.to,F(s.target)}};return r(),e.addEventListener("change",r),()=>e.removeEventListener("change",r)},[]),n.useEffect(()=>{if(u){S(0);return}let e=0;const r=performance.now(),s=j=>{const a=x.current;if(a){const y=Math.min(1,(j-a.started)/a.dur);w.current=a.from+(a.to-a.from)*J(y),y>=1&&(w.current=a.to,x.current=null,F(a.target))}S((j-r)/1e3),e=requestAnimationFrame(s)};return e=requestAnimationFrame(s),()=>cancelAnimationFrame(e)},[u]),n.useEffect(()=>{const e=k.current;if(!e)return;D(),S(t.current?0:performance.now()/1e3);const r=new ResizeObserver(()=>{D(),t.current&&S(0)});return r.observe(e),()=>r.disconnect()},[]);const B=`wfill-clip-${i.replace(/[^a-z0-9]+/gi,"-")}`;return l.jsx(_,{entryId:i,schema:g,children:l.jsxs("div",{ref:k,className:"wfill-stage","data-fx-stage":"","data-fx-theme":b,"data-fx-duration":u?"0":String(Math.max(0,Math.round(c.duration))),children:[l.jsxs("div",{className:"wfill-page",children:[l.jsx("p",{className:"wfill-title",children:"注水指示 Water Fill"}),l.jsxs("div",{className:"wfill-chips","aria-hidden":"true",children:[l.jsxs("span",{className:"wfill-chip",children:["A ",c.amplitude,"px"]}),l.jsxs("span",{className:"wfill-chip",children:["λ ",c.wavelength,"px"]}),l.jsx("span",{className:"wfill-chip",children:u?"duration 0 (reduce)":`${c.duration}ms`}),l.jsxs("span",{className:"wfill-chip",children:["深档 ",c.deepLevel,"%"]}),l.jsxs("span",{className:"wfill-chip",children:["浅档 ",c.shallowLevel,"%"]}),l.jsxs("span",{className:"wfill-chip",children:["液位 ",l.jsx("span",{ref:q,children:"—"})]})]}),l.jsx("p",{className:"wfill-note",children:"液面高度表达主题深浅:深色 = 深水、浅色 = 浅水;波形相位持续平移(1:1.618 拍效应)/ The level tells theme depth — dark pours deep, light drains shallow; the wave phase keeps drifting at a 1:1.618 beat ratio."})]}),l.jsxs("svg",{className:"wfill-svg","aria-hidden":"true",focusable:"false",children:[l.jsx("defs",{children:l.jsx("clipPath",{id:B,children:l.jsx("circle",{ref:M})})}),l.jsx("path",{ref:A,className:"wfill-water",clipPath:`url(#${B})`}),l.jsx("line",{ref:T,className:"wfill-tick"}),l.jsx("line",{ref:N,className:"wfill-tick"}),l.jsx("circle",{ref:p,className:"wfill-ring"})]}),l.jsx("button",{type:"button",className:"wfill-toggle","data-fx-toggle":!0,onClick:I,children:"切换主题 Toggle"}),l.jsx("style",{children:U})]})})}export{le as default};
