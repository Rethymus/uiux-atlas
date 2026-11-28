import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as E}from"./color.DuEPkvq5.js";import{D as C}from"./DemoStage.vW1CgYCd.js";const R=`
.demo-stage {
  --ml-chunk-gap: 0.75em;
}
.ml-wrap {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.ml-card {
  width: min(420px, calc(100% - 220px));
  padding: 20px 24px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 16px;
  background: oklch(1 0 0 / 0.75);
  font-size: 13px;
}
.ml-digits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0;
  min-height: 44px;
  align-items: center;
}
.ml-digit {
  width: 34px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 10px;
  background: oklch(0.95 0.01 250);
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.ml-digit-group-gap {
  width: var(--ml-chunk-gap);
}
.ml-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.ml-btn {
  border: 0;
  border-radius: 10px;
  padding: 8px 14px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.ml-btn[disabled] { opacity: 0.45; cursor: default; }
.ml-input {
  flex: 1;
  min-width: 140px;
  border: 1px solid oklch(0.5 0 0 / 0.4);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 16px;
  letter-spacing: 0.1em;
}
.ml-score {
  margin: 10px 0 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.ml-cell {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 30px;
  margin-right: 3px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 6px;
  font-size: 13px;
}
.ml-cell[data-hit="true"] { background: oklch(0.85 0.13 150); border-color: oklch(0.5 0.12 150); }
.ml-cell[data-hit="false"] { background: oklch(0.9 0.1 25 / 0.5); border-color: oklch(0.6 0.18 25); }
.ml-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 38%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.ml-toolbar {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.6;
}
@media (max-width: 480px) {
  .ml-toolbar { display: none; }
  .ml-card { width: calc(100% - 28px); }
}
`;function P({entryId:m,schema:h}){const o=E(m,h),[n,y]=s.useState(()=>o.get("digits")),[x,S]=s.useState(()=>o.get("chunk")),[r,a]=s.useState("idle"),[u,g]=s.useState(""),[b,f]=s.useState([]),[N,v]=s.useState(0),[c,z]=s.useState([]),d=s.useRef(0),k=s.useRef(null);s.useEffect(()=>o.subscribe(()=>{y(o.get("digits")),S(o.get("chunk"))}),[o]),s.useEffect(()=>()=>window.clearTimeout(d.current),[]);const w=()=>{const t="0123456789",i=[];for(let l=0;l<n;l++)i.push(t[Math.floor(Math.random()*10)]);z(i),g(""),f([]),a("showing"),window.clearTimeout(d.current),d.current=window.setTimeout(()=>{a("recall"),k.current?.focus()},3e3)},j=()=>{const t=u.replace(/\D/g,"").slice(0,n);f(c.map((l,p)=>({d:l,hit:t[p]===l})));const i=c.filter((l,p)=>t[p]===l).length;v(l=>Math.max(l,i)),a("scored")},D=b.filter(t=>t.hit).length;return e.jsxs(C,{entryId:m,schema:h,children:[e.jsxs("div",{className:"ml-wrap",children:[e.jsxs("div",{className:"ml-card",children:[e.jsx("strong",{children:"回忆实验 Recall"}),e.jsxs("div",{className:"ml-digits","aria-label":"待记忆数字串 Digit string to memorize",children:[r==="idle"&&e.jsx("span",{style:{opacity:.6},children:"点「开始一轮」生成数字串 / Press Start to generate"}),r==="showing"&&c.map((t,i)=>e.jsxs("span",{style:{display:"contents"},children:[i>0&&x>=1&&i%x===0&&e.jsx("span",{className:"ml-digit-group-gap","aria-hidden":"true"}),e.jsx("span",{className:"ml-digit",children:t})]},i)),r==="recall"&&e.jsx("span",{style:{opacity:.6},children:"凭记忆输入 / Type from memory"}),r==="scored"&&b.map((t,i)=>e.jsx("span",{className:"ml-cell","data-hit":t.hit,children:t.d},i))]}),e.jsxs("div",{className:"ml-actions",children:[r==="idle"&&e.jsx("button",{type:"button",className:"ml-btn",onClick:w,children:"开始一轮 Start"}),r==="showing"&&e.jsx("span",{children:"3 秒后隐藏… hiding in 3s"}),r==="recall"&&e.jsxs(e.Fragment,{children:[e.jsx("label",{htmlFor:"ml-recall",style:{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0 0 0 0)"},children:"你记得的数字 Digits you recall"}),e.jsx("input",{id:"ml-recall",ref:k,className:"ml-input",value:u,onChange:t=>g(t.target.value),onKeyDown:t=>t.key==="Enter"&&j(),placeholder:"如 493020…",inputMode:"numeric"}),e.jsx("button",{type:"button",className:"ml-btn",onClick:j,children:"记分 Score"})]}),r==="scored"&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"ml-score",children:["命中 ",D,"/",n," · 最佳 best ",N,"/",n]}),e.jsx("button",{type:"button",className:"ml-btn",onClick:w,children:"再来一轮 Again"})]})]})]}),e.jsxs("aside",{className:"ml-toolbar",children:[e.jsx("strong",{children:"怎么玩 How to"}),e.jsx("p",{style:{margin:"4px 0 0"},children:"先把 chunk 设为 0(不分组)打一轮,再把 chunk 调到 3 打一轮——同样的 10 个数字,分块后工作记忆只需持 4 项。 Set chunk to 0 (unchunked) for one round, then chunk=3 — the same 10 digits become 4 items."})]}),e.jsx("p",{className:"ml-hint",children:"展示固定 3 秒(demo 节奏);按位计分,绿色=命中,红色=错漏。Display is fixed at 3s; per-position scoring."})]}),e.jsx("style",{children:R})]})}export{P as default};
