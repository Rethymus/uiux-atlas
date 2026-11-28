import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as I}from"./color.DuEPkvq5.js";import{D as O}from"./DemoStage.vW1CgYCd.js";const T=`
.tn-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.tn-panel { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.tn-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.tn-badge[data-pass="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.tn-badge[data-pass="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 18%, transparent); }
.tn-board {
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 10px; overflow: hidden;
}
.tn-row {
  display: grid; grid-template-columns: 1fr auto; gap: 12px;
  align-items: baseline; padding: 8px 14px;
  border-block-end: 1px solid color-mix(in srgb, currentColor 12%, transparent);
}
.tn-row:last-child { border-block-end: 0; }
.tn-label { font-size: 13px; opacity: 0.72; }
.tn-num {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 17px; font-weight: 600;
  font-variant-numeric: var(--tn-numeric);
  white-space: nowrap; min-width: 13ch; text-align: right;
}
.tn-board[data-zero="on"] .tn-num { font-variant-numeric: var(--tn-numeric) slashed-zero; }
.tn-probe {
  display: grid; grid-template-columns: auto 1fr auto; gap: 10px;
  align-items: baseline; font-size: 13px; padding: 8px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 10px;
}
.tn-probe .tn-num { font-size: 14px; font-weight: 400; min-width: 0; text-align: left; }
.tn-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`,u=(()=>{let r=42;return()=>(r=r*1664525+1013904223>>>0)/4294967296})();function V({entryId:r,schema:x}){const i=I(r,x),[B,y]=n.useState(0),[c,S]=n.useState(()=>[12830457,90210,12.4]),[d,M]=n.useState(!0),[a,z]=n.useState({a:0,b:0,delta:0,jitMin:1/0,jitMax:0}),h=n.useRef(null),f=n.useRef(null),b=n.useRef(null),s=n.useRef({min:1/0,max:0}),g=n.useRef(""),p=i.get("numericStyle"),j=i.get("slashedZero"),w=i.get("countSpeed");n.useEffect(()=>i.subscribe(()=>y(t=>t+1)),[i]),n.useEffect(()=>{const t=window.matchMedia("(prefers-reduced-motion: reduce)"),l=!t.matches&&d;if(M(!t.matches),!l)return;const o=Math.max(100,1e3-w*100),R=window.setInterval(()=>{S(([k,C,E])=>[k+Math.floor(u()*900)+100,C+Math.floor(u()*7),Math.min(99.9,Math.max(-99.9,E+(u()-.48)*.2))])},o);return()=>window.clearInterval(R)},[w,d]),n.useLayoutEffect(()=>{g.current!==p&&(g.current=p,s.current={min:1/0,max:0});const t=h.current?.getBoundingClientRect().width??0,l=f.current?.getBoundingClientRect().width??0,o=b.current?.getBoundingClientRect().width??0;o>0&&(s.current.min=Math.min(s.current.min,o),s.current.max=Math.max(s.current.max,o)),z({a:t,b:l,delta:Math.abs(t-l),jitMin:s.current.min,jitMax:s.current.max})});const v=a.jitMax-a.jitMin,N=a.delta<.5,m=t=>`${Number.isFinite(t)?t.toFixed(1):"—"} px`;return e.jsxs(O,{entryId:r,schema:x,children:[e.jsxs("div",{className:"tn-wrap",children:[e.jsxs("div",{className:"tn-panel",children:[e.jsxs("span",{className:"tn-badge","data-pass":N,children:[N?"✓ 等宽生效 Equal-width":"✗ 宽度不一 Uneven widths"," Δ = ",a.delta.toFixed(1)," px"]}),e.jsxs("span",{className:"tn-badge","data-pass":v<.5,children:[d?"计数中 counting":"已暂停 paused"," · 列宽波动 jitter ",m(v)]}),e.jsxs("span",{className:"tn-badge",children:["font-variant-numeric: ",p,j==="on"?" slashed-zero":""]})]}),e.jsxs("div",{className:"tn-board","data-zero":j,children:[e.jsxs("div",{className:"tn-row",children:[e.jsx("span",{className:"tn-label",children:"营收 Revenue"}),e.jsxs("span",{className:"tn-num",ref:b,children:["¥ ",c[0].toLocaleString("en-US")]})]}),e.jsxs("div",{className:"tn-row",children:[e.jsx("span",{className:"tn-label",children:"订单 Orders"}),e.jsx("span",{className:"tn-num",children:c[1].toLocaleString("en-US")})]}),e.jsxs("div",{className:"tn-row",children:[e.jsx("span",{className:"tn-label",children:"环比 Delta"}),e.jsxs("span",{className:"tn-num",children:["+",c[2].toFixed(1)," %"]})]}),e.jsxs("div",{className:"tn-row",children:[e.jsx("span",{className:"tn-label",children:"O / 0 对照(斜杠零开关)"}),e.jsx("span",{className:"tn-num",children:"O0 · 编号 0070 · ¥1,200.00"})]})]}),e.jsxs("div",{className:"tn-probe",children:[e.jsx("span",{children:"静态探针 Static probe"}),e.jsx("span",{className:"tn-num",ref:h,children:"1111111111"}),e.jsx("span",{children:m(a.a)}),e.jsx("span",{}),e.jsx("span",{className:"tn-num",ref:f,children:"1234567890"}),e.jsx("span",{children:m(a.b)})]}),e.jsx("p",{className:"tn-note",children:"探针实测当前字体(Inter Variable,含 tnum 特性表,调研 05§24)在两种数字串下的渲染宽度: 等宽风格 Δ≈0、列宽波动≈0;比例宽度风格 Δ 与波动由字形决定。斜杠零由 slashed-zero OpenType 特性提供,字体不含该表时声明无效但无害。 The probe measures rendered widths under the current font (Inter Variable ships the tnum table, research 05 §24): equal-width styles give Δ≈0 and zero jitter; proportional styles vary by glyph. The slashed zero comes from the slashed-zero OpenType feature — inert but harmless when the font lacks the table."})]}),e.jsx("style",{children:T})]})}export{V as default};
