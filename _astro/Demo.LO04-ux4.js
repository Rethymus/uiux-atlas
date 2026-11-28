import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as f}from"./color.DuEPkvq5.js";import{D as b}from"./DemoStage.vW1CgYCd.js";const m=`
.os-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px;
}
.os-cells { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
.os-cell { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.os-cell svg {
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}
.os-blur .os-cell svg { filter: blur(1.5px); }
.os-cell figcaption { font-size: 12px; color: rgba(0, 0, 0, 0.5); white-space: nowrap; }
.os-blurbtn {
  border: 1px solid rgba(15, 23, 42, 0.18);
  background: #fff;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
}
.os-blurbtn[aria-pressed="true"] {
  background: rgba(15, 23, 42, 0.88);
  color: #fff;
  border-color: transparent;
}
.os-note {
  max-width: 460px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.os-readout {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
  text-align: center;
}
`;function l(){return e.jsxs("g",{"aria-hidden":"true",stroke:"rgba(100, 116, 139, 0.4)",strokeWidth:.5,strokeDasharray:"1 1.2",children:[e.jsx("line",{x1:12,y1:2,x2:12,y2:22}),e.jsx("line",{x1:2,y1:12,x2:22,y2:12})]})}function w({entryId:c,schema:x}){const r=f(c,x),[s,u]=i.useState(()=>r.get("baseSize")),[d,g]=i.useState(()=>r.get("compensate")),[p,h]=i.useState(!1);i.useEffect(()=>r.subscribe(()=>{u(r.get("baseSize")),g(r.get("compensate"))}),[r]);const t=d==="on",o=n=>(n/24*s).toFixed(1),a={fill:"none",stroke:"rgba(15, 23, 42, 0.85)",strokeWidth:2,vectorEffect:"non-scaling-stroke",strokeLinecap:"round",strokeLinejoin:"round"};return e.jsx(b,{entryId:c,schema:x,children:e.jsxs("div",{className:p?"os-scene os-blur":"os-scene",children:[e.jsxs("div",{className:"os-cells",children:[e.jsxs("figure",{className:"os-cell",children:[e.jsxs("svg",{width:s,height:s,viewBox:"0 0 24 24","aria-hidden":"true",children:[e.jsx(l,{}),e.jsx("rect",{x:3,y:3,width:18,height:18,...a})]}),e.jsxs("figcaption",{children:["方 18×18 → ",o(18),"px"]})]}),e.jsxs("figure",{className:"os-cell",children:[e.jsxs("svg",{width:s,height:s,viewBox:"0 0 24 24","aria-hidden":"true",children:[e.jsx(l,{}),e.jsx("circle",{cx:12,cy:12,r:t?10:9,...a})]}),e.jsxs("figcaption",{children:[t?"圆 Ø20 → ":"圆 Ø18 → ",o(t?20:18),"px"]})]}),e.jsxs("figure",{className:"os-cell",children:[e.jsxs("svg",{width:s,height:s,viewBox:"0 0 24 24","aria-hidden":"true",children:[e.jsx(l,{}),e.jsx("g",{transform:t?"translate(0.5 0)":void 0,children:e.jsx("path",{d:"M8 7.5v9l7.5-4.5z",...a})})]}),e.jsx("figcaption",{children:t?"三角 +0.5px 偏心":"三角 几何居中"})]})]}),e.jsxs("div",{className:"os-readout","aria-live":"polite",children:["baseSize=",s,"px · compensate=",d," ·",t?` Δ圆=+${(Number(o(20))-Number(o(18))).toFixed(1)}px(+11.1%)`:" Δ圆=0(同尺寸对照)"]}),e.jsx("button",{type:"button",className:"os-blurbtn","aria-pressed":p,onClick:()=>h(n=>!n),children:"模糊法验收 Blur test"}),e.jsx("p",{className:"os-note",children:"圆 Ø20 比方 18 大 2 个网格单位(≈ +11.1%,Material 官方键程);关掉补偿后并排模糊,圆明显显轻。 Lucide 规则:不对称图形可小幅偏离几何中心(演示取 0.5px,官方未给数值)。 Circle Ø20 overshoots the 18×18 square by 2 units (≈ +11.1%, official keylines); blur them uncompensated and the circle clearly reads lighter."}),e.jsx("style",{children:m})]})})}export{w as default};
