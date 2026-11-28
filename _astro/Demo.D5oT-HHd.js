import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as z}from"./color.DuEPkvq5.js";import{D as w}from"./DemoStage.vW1CgYCd.js";const y=`
.sc-stage { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.sc-spec { border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  border-radius: 10px; padding: 12px 14px; }
.sc-kicker { font-size: 15px; font-weight: 600; letter-spacing: 0.08em;
  font-variant-caps: var(--sc-caps); margin: 0 0 6px; }
.sc-liga { font-size: 17px; font-variant-ligatures: var(--sc-lig); margin: 0 0 6px; }
.sc-zero { font-family: var(--font-mono, ui-monospace, monospace); font-size: 15px;
  font-variant-numeric: var(--sc-zero); margin: 0; }
.sc-caption { margin: 6px 0 0; font-size: 12px; opacity: 0.62; line-height: 1.55; }
.sc-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 0; }
.sc-pair span { border: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 8px; padding: 6px 10px; font-size: 15px; }
.sc-pair .sc-b { font-variant-caps: var(--sc-caps);
  font-variant-ligatures: var(--sc-lig); font-variant-numeric: var(--sc-zero); }
.sc-panel { display: flex; flex-wrap: wrap; gap: 6px; }
.sc-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.sc-badge[data-active="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.sc-badge[data-active="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 16%, transparent); }
.sc-code { margin: 4px 0 0; font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px; opacity: 0.75; white-space: pre-wrap; }
`;function C({entryId:o,schema:l}){const c=z(o,l),[u,h]=a.useState(0),[r,b]=a.useState({caps:0,liga:0}),p=a.useRef(null),f=a.useRef(null),d=a.useRef(null),g=a.useRef(null);a.useEffect(()=>c.subscribe(()=>h(e=>e+1)),[c]),a.useLayoutEffect(()=>{const e=N=>N?.getBoundingClientRect().width??0;b({caps:Math.abs(e(p.current)-e(f.current)),liga:Math.abs(e(d.current)-e(g.current))})},[u]);const t=c.get("caps"),n=c.get("ligatures"),i=c.get("zero"),v=t==="all-small-caps"?'"c2sc" 1, "smcp" 1':t==="small-caps"?'"smcp" 1':'"smcp" 0',j=n==="no-common-ligatures"?'"liga" 0':'"liga" 1',m=r.caps>.5,x=n==="no-common-ligatures"&&r.liga>.5;return s.jsxs(w,{entryId:o,schema:l,children:[s.jsxs("div",{className:"sc-stage",children:[s.jsxs("div",{className:"sc-panel",children:[s.jsx("span",{className:"sc-badge","data-active":m,children:m?`✓ 小型大写渲染已变化 Δ=${r.caps.toFixed(1)}px`:`• 小型大写无宽度变化 Δ=${r.caps.toFixed(1)}px`}),s.jsx("span",{className:"sc-badge","data-active":x,children:n==="common-ligatures"?"连字开启 liga on(默认)—切到关闭可测宽度差":x?`✓ 连字已关 liga off:宽度差 Δ=${r.liga.toFixed(1)}px`:"连字关闭但无宽度差(字体可能无 liga 表)"}),s.jsxs("span",{className:"sc-badge","data-active":i==="slashed-zero",children:["斜杠零 ",i==="slashed-zero"?"开":"关","(zero)"]})]}),s.jsxs("div",{className:"sc-spec",children:[s.jsx("p",{className:"sc-kicker",children:"Uiux Atlas · Typography Notes · Chapter 07"}),s.jsx("p",{className:"sc-liga",children:"Difficult waffles — efficient airflow; final office film."}),s.jsx("p",{className:"sc-zero",children:"O0 · 编号 0070 · ¥1,200.00"}),s.jsx("p",{className:"sc-caption",children:"眉标行走 font-variant-caps(all-small-caps 默认);连字样例走 font-variant-ligatures(fi/fl/ffi);编号行走 font-variant-numeric。 注意:中文不受 smcp/liga 影响,视觉重量需单独核对。"})]}),s.jsxs("div",{className:"sc-pair",children:[s.jsx("span",{ref:p,children:"Homepage 0070"}),s.jsx("span",{className:"sc-b",ref:f,children:"Homepage 0070"})]}),s.jsxs("div",{className:"sc-pair",children:[s.jsx("span",{ref:d,children:"waffle airflow"}),s.jsx("span",{className:"sc-b",ref:g,children:"waffle airflow"})]}),s.jsx("p",{className:"sc-code",children:`/* 高层属性(演示所用) */ font-variant-caps: ${t}; font-variant-ligatures: ${n}; font-variant-numeric: ${i};`}),s.jsx("p",{className:"sc-code",children:`/* 等价低层标签(仅注释展示;官方明确不要用它启用小型大写) */ font-feature-settings: ${v}, ${j}${i==="slashed-zero"?', "zero" 1':""};`}),s.jsx("p",{className:"sc-caption",children:"探针说明:小型大写 Δ>0 表示字形已替换——可能是字体真 smcp/c2sc 字形,也可能是 MDN 记载的「缺字形时由大写字形合成」,宽度无法区分二者;Δ≈0 表示当前字体未产生变化。 Probe notes: a small-caps Δ>0 means glyphs were substituted — either true smcp/c2sc glyphs or, per MDN, synthesis from uppercase glyphs when absent; width cannot tell the two apart. Δ≈0 means the current font produced no change."})]}),s.jsx("style",{children:y})]})}export{C as default};
