import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as q}from"./color.DuEPkvq5.js";import{D as F}from"./DemoStage.vW1CgYCd.js";const U=["苹果","铅笔","电台","窗帘","木桥","汽笛","帆船","镜子","灯塔","枕头","邮票","风筝"],_=`
.sp-field { position: absolute; inset: 0; }
.sp-stage {
  position: absolute;
  left: 50%;
  top: 38%;
  translate: -50% -50%;
  width: min(420px, calc(100% - 200px));
  min-height: 120px;
  display: grid;
  place-items: center;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.8);
  font-size: 26px;
  font-weight: 700;
  padding: 10px;
}
.sp-progress { font-size: 11px; opacity: 0.55; font-weight: 400; margin-top: 6px; }
.sp-recall {
  position: absolute;
  left: 50%;
  bottom: 56px;
  translate: -50% 0;
  width: min(420px, calc(100% - 200px));
  display: flex;
  gap: 8px;
}
.sp-input {
  flex: 1;
  border: 1px solid oklch(0.5 0 0 / 0.4);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
}
.sp-btn {
  border: 0;
  border-radius: 10px;
  padding: 8px 16px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.sp-btn[disabled] { opacity: 0.45; cursor: default; }
.sp-chart {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 190px;
  padding: 10px 12px 6px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 11px;
}
.sp-chart h4 { margin: 0 0 4px; font-size: 12px; }
.sp-nums { font-variant-numeric: tabular-nums; line-height: 1.6; margin: 4px 0 0; }
.sp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.sp-live {
  position: absolute;
  left: -9999px;
  width: 1px; height: 1px; overflow: hidden;
}
@media (max-width: 480px) {
  .sp-chart { display: none; }
  .sp-stage, .sp-recall { width: calc(100% - 24px); }
}
`;function I({entryId:f,schema:g}){const a=q(f,g),[n,A]=s.useState(()=>a.get("items")),[b,D]=s.useState(()=>a.get("dwell")),[l,h]=s.useState("idle"),[x,w]=s.useState(null),[M,W]=s.useState([]),[y,j]=s.useState(""),[$,k]=s.useState([]),[c,S]=s.useState([]),[v,N]=s.useState(0),i=s.useRef([]),z=s.useRef(null),u=s.useRef(null);s.useEffect(()=>a.subscribe(()=>{A(a.get("items")),D(a.get("dwell"))}),[a]),s.useEffect(()=>()=>i.current.forEach(t=>window.clearTimeout(t)),[]);const E=()=>{i.current.forEach(o=>window.clearTimeout(o)),i.current=[];const t=[...U].sort(()=>Math.random()-.5).slice(0,n);W(t),j(""),k([]),h("run"),t.forEach((o,d)=>{const m=window.setTimeout(()=>{w({word:o,idx:d}),u.current&&(u.current.textContent=`第 ${d+1} 个:${o}`)},b*d);i.current.push(m)});const r=window.setTimeout(()=>{w(null),h("recall"),z.current?.focus()},b*n);i.current.push(r)},R=()=>{const t=y.split(/[\s,，、]+/).map(o=>o.trim()).filter(Boolean),r=M.map(o=>t.includes(o));k(r),S(o=>(o.length===n?o:new Array(n).fill(0)).map((m,P)=>m+(r[P]?1:0))),N(o=>o+1),h("scored")},B=()=>{S([]),N(0)},O=Math.max(1,...c),C=166,p=C/Math.max(n,1)-4,T=s.useMemo(()=>Array.from({length:n},(t,r)=>r),[n]);return e.jsx(F,{entryId:f,schema:g,children:e.jsxs("div",{className:"sp-field",children:[e.jsxs("div",{className:"sp-stage",children:[l==="idle"&&e.jsx("button",{type:"button",className:"sp-btn",onClick:E,children:"开始一轮 Start"}),l==="run"&&x&&e.jsxs("span",{children:[x.word,e.jsxs("span",{className:"sp-progress",children:[x.idx+1," / ",n]})]}),l==="recall"&&e.jsx("span",{style:{fontSize:14,opacity:.6},children:"凭记忆输入(任意顺序,空格分隔)"}),l==="scored"&&e.jsxs("span",{style:{fontSize:14},children:["命中 ",$.filter(Boolean).length,"/",n," ·"," ",e.jsx("button",{type:"button",className:"sp-btn",onClick:E,style:{padding:"4px 12px"},children:"再来一轮 Again"})]})]}),e.jsx("div",{className:"sp-recall",children:(l==="recall"||l==="scored")&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"sp-in",style:{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0 0 0 0)"},children:"你记得的词 Words you recall"}),e.jsx("input",{id:"sp-in",ref:z,className:"sp-input",value:y,onChange:t=>j(t.target.value),onKeyDown:t=>t.key==="Enter"&&l==="recall"&&R(),placeholder:"如:苹果 灯塔 …"}),l==="recall"&&e.jsx("button",{type:"button",className:"sp-btn",onClick:R,children:"记分 Score"})]})}),e.jsxs("aside",{className:"sp-chart",children:[e.jsxs("h4",{children:["按位置命中(累计 ",v," 轮)"]}),e.jsx("svg",{width:"100%",viewBox:`0 0 ${C} 70`,role:"img","aria-label":"各位置命中次数柱状图",children:T.map(t=>{const r=(c[t]??0)/O*46;return e.jsxs("g",{children:[e.jsx("rect",{x:t*(p+4),y:50-r,width:p,height:Math.max(r,1),rx:"2",fill:"oklch(0.55 0.13 250)"}),e.jsx("text",{x:t*(p+4)+p/2,y:64,textAnchor:"middle",fontSize:"8",fill:"oklch(0.4 0 0)",children:t+1})]},t)})}),e.jsx("p",{className:"sp-nums",children:c.length>0&&T.map(t=>`P${t+1}:${c[t]??0}`).join(" · ")}),v>0&&e.jsx("button",{type:"button",className:"sp-btn",style:{background:"oklch(0.5 0 0 / 0.4)",padding:"3px 8px",fontSize:11},onClick:B,children:"清零统计 Reset"})]}),e.jsx("span",{ref:u,className:"sp-live","aria-live":"polite"}),e.jsx("p",{className:"sp-hint",children:"词语逐个闪现,结束后凭记忆输入;打满 3 轮以上,看右侧柱状图长出「两端高、中间塌」的 U 形。 Words flash one by one; type back from memory. After 3+ rounds the chart grows a U shape."}),e.jsx("style",{children:_})]})})}export{I as default};
