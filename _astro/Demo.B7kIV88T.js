import{j as a}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DLkBFFtG.js";import{g as nt}from"./color.DuEPkvq5.js";import{D as rt}from"./DemoStage.vW1CgYCd.js";const X=64,E=34,at=44,ct=300;function st(e,n,l,w){const R=3*e,v=3*(l-e)-R,B=1-R-v,k=3*n,i=3*(w-n)-k,O=1-k-i,h=r=>((B*r+v)*r+R)*r,b=r=>((O*r+i)*r+k)*r;return r=>{if(r<=0)return 0;if(r>=1)return 1;let x=0,C=1,p=r;for(let j=0;j<24;j+=1){const $=h(p);if(Math.abs($-r)<1e-5)break;$<r?x=p:C=p,p=(x+C)/2}return b(p)}}const V=st(.3,0,.2,1);function G(e,n){return Math.hypot(e.x-n.x,e.y-n.y)}function ot(e,n){return Math.atan2(n.y-e.y,n.x-e.x)}function A(e,n,l){return{x:e.x+l*Math.cos(n),y:e.y+l*Math.sin(n)}}function f(e){return e.toFixed(2)}function it(e,n,l,w,R,v,B){const k=Math.PI/2,i=G(l,w),O=e+n*B;if(i>O||i<=Math.abs(e-n))return"";let h,b;i<e+n?(h=Math.acos((e*e+i*i-n*n)/(2*e*i)),b=Math.acos((n*n+i*i-e*e)/(2*n*i))):(h=0,b=0);const r=ot(l,w),x=Math.acos((e-n)/i),C=r+h+(x-h)*v,p=r-h-(x-h)*v,j=r+Math.PI-b-(Math.PI-b-x)*v,$=r-Math.PI+b+(Math.PI-b-x)*v,P=A(l,C,e),F=A(l,p,e),u=A(w,j,n),o=A(w,$,n),g=e+n,q=Math.min(v*R,G(P,u)/g)*Math.min(1,i*2/g),y=e*q,H=n*q,T=A(P,C-k,y),L=A(u,j+k,H),Y=A(o,$-k,H),Q=A(F,p+k,y),J=i>e;return[`M ${f(P.x)} ${f(P.y)}`,`C ${f(T.x)} ${f(T.y)} ${f(L.x)} ${f(L.y)} ${f(u.x)} ${f(u.y)}`,`A ${n} ${n} 0 ${J?1:0} 0 ${f(o.x)} ${f(o.y)}`,`C ${f(Y.x)} ${f(Y.y)} ${f(Q.x)} ${f(Q.y)} ${f(F.x)} ${f(F.y)}`].join(" ")}const lt=`
/* 舞台主题令牌只作用于本舞台(不动站点主题);data-fx-theme 切换令牌组 */
.mb-stage {
  position: absolute; inset: 0; overflow: hidden;
  --mb-bg-dark: #12161f;
  --mb-bg-light: #eef1f6;
  --mb-fg-dark: #e8ecf4;
  --mb-fg-light: #1b2230;
  --mb-line-dark: rgba(255, 255, 255, 0.16);
  --mb-line-light: rgba(15, 23, 42, 0.16);
  --mb-panel-dark: rgba(255, 255, 255, 0.06);
  --mb-panel-light: rgba(15, 23, 42, 0.05);
  /* 液体色 = demo 设计值:两主题下都对舞台底色高对比(膜与圆同色才读作一体) */
  --mb-liquid-dark: #d8e4f6;
  --mb-liquid-light: #26324a;
  background: var(--mb-bg-dark);
  color: var(--mb-fg-dark);
}
.mb-stage[data-fx-theme="light"] {
  background: var(--mb-bg-light);
  color: var(--mb-fg-light);
}
.mb-stage[data-fx-theme="dark"] { --mb-liquid: var(--mb-liquid-dark); --mb-line: var(--mb-line-dark); --mb-panel: var(--mb-panel-dark); }
.mb-stage[data-fx-theme="light"] { --mb-liquid: var(--mb-liquid-light); --mb-line: var(--mb-line-light); --mb-panel: var(--mb-panel-light); }
.mb-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.mb-membrane, .mb-drop { fill: var(--mb-liquid); }
.mb-drop-child { cursor: grab; touch-action: none; }
.mb-drop-child:active { cursor: grabbing; }
.mb-page {
  position: absolute; left: 16px; right: 16px; bottom: 14px;
  display: flex; flex-direction: column; gap: 8px; align-items: flex-start;
  pointer-events: none;
}
.mb-title { margin: 0; font-size: 16px; font-weight: 650; letter-spacing: 0.02em; }
.mb-chips { display: flex; flex-wrap: wrap; gap: 6px; font-size: 12px; font-variant-numeric: tabular-nums; }
.mb-chip { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--mb-line); background: var(--mb-panel); }
.mb-note { max-width: 560px; margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.75; text-align: left; }
.mb-toggle {
  position: absolute; top: 12px; right: 12px; z-index: 3;
  border: 1px solid var(--mb-line); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; cursor: pointer;
  background: var(--mb-panel); color: inherit;
}
.mb-toggle:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`;function ht({entryId:e,schema:n}){const l=nt(e,n),w=()=>({handleLenRate:l.get("handleLenRate"),v:l.get("v"),maxDistFactor:l.get("maxDistFactor"),duration:l.get("duration")}),[R,v]=c.useState(w),[B,k]=c.useState("dark"),[i,O]=c.useState(!1),h=c.useRef(R);h.current=R;const b=c.useRef("dark"),r=c.useRef(!1),x=c.useRef(null),C=c.useRef(null),p=c.useRef(null),j=c.useRef(null),$=c.useRef(null),P=c.useRef(null),F=c.useRef(null),u=c.useRef({w:640,h:400,parent:{x:230,y:220},dock:{x:352,y:220},target:{x:460,y:130}}),o=c.useRef({x:352,y:220}),g=c.useRef(null),I=c.useRef(null),q=()=>X+E*h.current.maxDistFactor,y=()=>{const t=o.current,s=u.current.parent;j.current&&(j.current.setAttribute("cx",String(t.x)),j.current.setAttribute("cy",String(t.y)));const d=h.current,m=G(s,t);$.current&&$.current.setAttribute("d",it(X,E,s,t,d.handleLenRate,d.v,d.maxDistFactor)),P.current&&(P.current.textContent=String(Math.round(m))),F.current&&(F.current.textContent=m>q()?"已断膜 broken":"膜连接 bridged")},H=()=>{const t=x.current,s=C.current;if(!t||!s)return;const d=t.getBoundingClientRect(),m=Math.max(1,Math.round(d.width)),S=Math.max(1,Math.round(d.height)),M={x:Math.round(m*.36),y:Math.round(S*.55)},N={x:M.x+X+E+24,y:M.y},_=q()+at,U={x:Math.min(M.x+_*Math.SQRT1_2,m-E-8),y:Math.max(M.y-_*Math.SQRT1_2,E+8)};u.current={w:m,h:S,parent:M,dock:N,target:U},s.setAttribute("viewBox",`0 0 ${m} ${S}`),p.current&&(p.current.setAttribute("cx",String(M.x)),p.current.setAttribute("cy",String(M.y)))},T=t=>{b.current=t,k(t),o.current={...u.current.dock},y()},L=()=>{const t=g.current;t&&(cancelAnimationFrame(t.raf),g.current=null,t.flip?T(t.target):(o.current={...u.current.dock},y()))},Y=t=>{const s={...o.current},d=u.current.target,m=u.current.dock,S=Math.max(1,h.current.duration),M=performance.now(),N={raf:0,target:t,flip:!0};g.current=N;const _=(z,D,Z)=>({x:z.x+(D.x-z.x)*Z,y:z.y+(D.y-z.y)*Z}),U=z=>{const D=Math.min(1,(z-M)/S);if(D<.45?o.current=_(s,d,V(D/.45)):D<.6?o.current=d:o.current=_(d,m,V((D-.6)/.4)),y(),D>=1){g.current=null,T(t);return}N.raf=requestAnimationFrame(U)};N.raf=requestAnimationFrame(U)},Q=()=>{if(r.current){o.current={...u.current.dock},y();return}const t={...o.current},s=u.current.dock,d=performance.now(),m={raf:0,target:b.current,flip:!1};g.current=m;const S=M=>{const N=Math.min(1,(M-d)/ct);if(o.current={x:t.x+(s.x-t.x)*V(N),y:t.y+(s.y-t.y)*V(N)},y(),N>=1){g.current=null;return}m.raf=requestAnimationFrame(S)};m.raf=requestAnimationFrame(S)},J=()=>{L();const t=b.current==="dark"?"light":"dark";if(r.current||h.current.duration<=0){T(t);return}Y(t)},K=(t,s)=>{const d=x.current;if(!d)return;const m=d.getBoundingClientRect();o.current={x:t-m.left,y:s-m.top},y()},tt=t=>{L(),I.current=t.pointerId,t.currentTarget.setPointerCapture(t.pointerId),K(t.clientX,t.clientY)},et=t=>{I.current===t.pointerId&&K(t.clientX,t.clientY)},W=t=>{I.current===t.pointerId&&(I.current=null,G(u.current.parent,o.current)>q()&&Q())};return c.useEffect(()=>l.subscribe(()=>{v(w()),g.current||y()}),[l]),c.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),s=()=>{r.current=t.matches,O(t.matches)};return s(),t.addEventListener("change",s),()=>t.removeEventListener("change",s)},[]),c.useEffect(()=>{const t=x.current;if(!t)return;H(),o.current={...u.current.dock},y();const s=new ResizeObserver(()=>{H(),L(),I.current===null&&(o.current={...u.current.dock}),y()});return s.observe(t),()=>{s.disconnect(),g.current&&cancelAnimationFrame(g.current.raf)}},[]),a.jsx(rt,{entryId:e,schema:n,children:a.jsxs("div",{ref:x,className:"mb-stage","data-fx-stage":"","data-fx-theme":B,"data-fx-duration":i?"0":String(Math.max(0,Math.round(R.duration))),children:[a.jsxs("svg",{ref:C,className:"mb-svg","aria-hidden":"true",focusable:"false",children:[a.jsx("path",{ref:$,className:"mb-membrane"}),a.jsx("circle",{ref:p,className:"mb-drop",r:X}),a.jsx("circle",{ref:j,className:"mb-drop mb-drop-child",r:E,onPointerDown:tt,onPointerMove:et,onPointerUp:W,onPointerCancel:W})]}),a.jsxs("div",{className:"mb-page",children:[a.jsx("p",{className:"mb-title",children:"液滴连接桥 Metaball Bridge"}),a.jsxs("div",{className:"mb-chips","aria-hidden":"true",children:[a.jsxs("span",{className:"mb-chip",children:["r1 ",X,"px"]}),a.jsxs("span",{className:"mb-chip",children:["r2 ",E,"px"]}),a.jsxs("span",{className:"mb-chip",children:["handleLenRate ",R.handleLenRate]}),a.jsxs("span",{className:"mb-chip",children:["v ",R.v]}),a.jsxs("span",{className:"mb-chip",children:["maxDist ",Math.round(q()),"px"]}),a.jsxs("span",{className:"mb-chip",children:["d ",a.jsx("span",{ref:P,children:"—"}),"px"]}),a.jsx("span",{className:"mb-chip",ref:F,children:"—"})]}),a.jsx("p",{className:"mb-note",children:"小液滴可直接拖拽:靠近主液滴时膜颈融合,拉远超过 maxDist 即断裂 / Drag the small droplet: the membrane neck fuses on approach and snaps past maxDist. Click again mid-flight — the old run finishes instantly, the new one plays in full."})]}),a.jsx("button",{type:"button",className:"mb-toggle","data-fx-toggle":!0,onClick:J,children:"切换主题 Toggle"}),a.jsx("style",{children:lt})]})})}export{ht as default};
