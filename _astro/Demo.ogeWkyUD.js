import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{m as E}from"./react.B-ZMyTXB.js";import{g as I}from"./color.DuEPkvq5.js";import{D as P}from"./DemoStage.vW1CgYCd.js";import{u as A}from"./use-reduced-motion.p3D3Z0_d.js";import{u as D,a as L}from"./index.D2pAevM6.js";const q=["日","周","月"],F=["日","周","月","年"],G=["日","周","月","年","全部"],H=`
/* VR3-01/R3-01(视觉评审·移动端与特殊页,high):360px 下本 demo 内容(分段控件
   rail + 6 枚读数 chip + 双段说明)高于舞台 min-height 320px——原 position:absolute
   + inset:0 使内容不撑开台面,flex 居中令分段控件顶缘被裁(「日」字上半切掉)、
   底部 HIG 段被裁,舞台铭牌「● Slot Spring (Segmented)」直接叠压在控件上。
   ≤900 单栏档改 position:static:台面自 min-height 下限随内容生长,裁切消失;
   同时顶部预留铭牌带 --plate-h(global.css 平台级 token,≈40px = 铭牌 top 12px +
   chip 高 ≈24px + 呼吸),绝对填充型 demo 顶部内容不再压住左上铭牌。
   ≥901 档舞台定高 560px、内容垂直居中,铭牌在左上空档,布局维持原样 */
.sl-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 8px; }
@media (max-width: 900px) {
  .sl-stage { position: static; width: 100%; padding: var(--plate-h, 40px) 8px 8px; }
}
.sl-rail {
  position: relative; width: min(420px, calc(100% - 24px)); height: 46px;
  border-radius: 12px; background: color-mix(in srgb, var(--border) 30%, transparent);
  display: flex; touch-action: manipulation; user-select: none;
}
.sl-rail:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.sl-seg {
  position: relative; z-index: 2; flex: 1 1 0; border: 0; background: transparent;
  font-size: 14px; color: var(--text-dim); cursor: pointer; border-radius: 9px;
}
.sl-seg:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.sl-seg[aria-checked="true"] { color: var(--text); font-weight: 650; }
.sl-pill {
  position: absolute; z-index: 1; top: 4px; bottom: 4px; left: 0; width: 0;
  border-radius: 9px; background: var(--surface);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.28);
  pointer-events: none;
}
.sl-readout {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
  font-size: 12px; color: var(--text-dim); font-variant-numeric: tabular-nums;
}
.sl-tag { padding: 1px 10px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
/* dd-11(视觉评审·深色桌面):底注拆两段——行为说明与 HIG 规范不再同段连排;
   左对齐(原居中两侧参差、4 行扫读困难)+ max-width 560px 保持 */
.sl-hint { max-width: 560px; margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: left; }
.sl-hint + .sl-hint { margin-top: 6px; }
.sl-hint-tag {
  display: inline-block; margin-right: 8px; padding: 1px 8px;
  border: 1px solid var(--border); border-radius: 999px; background: var(--surface);
  font-family: var(--font-mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
}
`;function _({entryId:f,schema:g}){const o=I(f,g),h=()=>({stiffness:o.get("stiffness"),damping:o.get("damping"),segments:Number(o.get("segments"))}),[r,R]=n.useState(h),[a,N]=n.useState(0),b=A()===!0,v=n.useRef(null),j=n.useRef(null),l=n.useRef(null),M=n.useRef(0),x=D(0);n.useEffect(()=>o.subscribe(()=>{R(h())}),[o]);const w=n.useRef(!0),u=r.segments===3?q:r.segments===5?G:F,c=n.useMemo(()=>{const e=Math.sqrt(r.stiffness),t=r.damping/(2*e),p=t<1?Math.exp(-Math.PI*t/Math.sqrt(1-t*t))*100:0,i=t>0?Math.log(20)/(t*e)*1e3:1/0,d=t<1?Math.PI/(e*Math.sqrt(1-t*t))*1e3:1/0;return{zeta:t,overshoot:p,envelope5:i,tPeak:d}},[r.stiffness,r.damping]),y=()=>({type:"spring",stiffness:r.stiffness,damping:r.damping,mass:1}),k=n.useRef(y);k.current=y,n.useEffect(()=>(w.current=!0,()=>{w.current=!1,l.current?.stop()}),[]);const S=e=>{const t=v.current,p=j.current;if(!t||!p)return;const i=t.clientWidth/Math.max(1,u.length);M.current=i,p.style.width=`${i}px`;const d=e*i;if(b){l.current?.stop(),x.jump(d);return}l.current?.stop(),l.current=L(x,d,k.current())};n.useEffect(()=>{S(a)},[r,b,a]);const m=e=>{N(Math.min(u.length-1,Math.max(0,e)))},z=e=>{e.key==="ArrowRight"||e.key==="ArrowDown"?(e.preventDefault(),m(a+1)):(e.key==="ArrowLeft"||e.key==="ArrowUp")&&(e.preventDefault(),m(a-1))};return s.jsx(P,{entryId:f,schema:g,children:s.jsxs("div",{className:"sl-stage",children:[s.jsxs("div",{className:"sl-rail",ref:v,role:"radiogroup","aria-label":"竹简槽分段控件 segmented control",tabIndex:0,onKeyDown:z,children:[s.jsx(E.div,{className:"sl-pill",ref:j,style:{x},"aria-hidden":"true"}),u.map((e,t)=>s.jsx("button",{type:"button",role:"radio","aria-checked":a===t,tabIndex:-1,className:"sl-seg",onClick:()=>m(t),children:e},e))]}),s.jsxs("div",{className:"sl-readout",children:[s.jsxs("span",{className:"sl-tag",children:["stiffness ",r.stiffness]}),s.jsxs("span",{className:"sl-tag",children:["damping ",r.damping]}),s.jsxs("span",{className:"sl-tag",children:["ζ ",c.zeta.toFixed(3)]}),s.jsxs("span",{className:"sl-tag",children:["过冲 ",c.overshoot.toFixed(1),"%"]}),s.jsxs("span",{className:"sl-tag",children:["包络→5% ",c.envelope5.toFixed(0),"ms"]}),s.jsxs("span",{className:"sl-tag",children:["t_peak ",c.tPeak.toFixed(0),"ms"]})]}),s.jsx("p",{className:"sl-hint",children:"单只滑签跨槽位弹簧滑动;连续点击不同槽位,弹簧从当前位置+当前速度续接(Motion 物理弹簧默认行为); ζ≥1 时过冲为 0(过阻尼)。"}),s.jsxs("p",{className:"sl-hint",children:[s.jsx("span",{className:"sl-hint-tag",children:"HIG"}),"iPhone ≤5 段、段等宽、单一选择器 / One persistent bubble springs slot-to-slot; rapid re-targets continue from the current position + velocity. ζ≥1 means zero overshoot (overdamped). HIG: ≤5 segments on iPhone, equal widths, single selector."]}),s.jsx("style",{children:H})]})})}export{_ as default};
