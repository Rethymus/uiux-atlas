import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as S}from"./color.DuEPkvq5.js";import{D as z}from"./DemoStage.vW1CgYCd.js";const E=`
.hk-field { position: absolute; inset: 0; }
.hk-target {
  position: absolute;
  width: 56px;
  height: 56px;
  margin: -28px 0 0 -28px;
  border: 1px solid oklch(0.55 0 0 / 0.4);
  border-radius: 50%;
  background: oklch(0.92 0.01 250);
  color: oklch(0.35 0.02 250);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.12s ease;
}
.hk-target[data-active="true"] {
  opacity: 1;
  border: 3px solid oklch(0.5 0.15 150);
  background: oklch(0.85 0.13 150);
  color: oklch(0.28 0.07 150);
}
.hk-target[data-active="true"]::after {
  content: "点我 Hit";
  position: absolute;
  left: 50%;
  top: -22px;
  translate: -50% 0;
  font-size: 10px;
  white-space: nowrap;
  color: oklch(0.4 0.1 150);
}
.hk-status {
  position: absolute;
  left: 14px;
  top: 36px;
  font-size: 13px;
  font-weight: 650;
}
.hk-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 178px;
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.hk-panel dt { opacity: 0.6; }
.hk-panel dd { margin: 0 0 4px; font-weight: 650; font-variant-numeric: tabular-nums; }
.hk-table {
  margin: 4px 0 0;
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hk-table td { padding: 1px 2px; border-top: 1px solid oklch(0.5 0 0 / 0.15); }
.hk-table td:last-child, .hk-table td:nth-child(2) { text-align: right; }
.hk-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 42%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .hk-panel { top: auto; bottom: 10px; right: 10px; width: 150px; font-size: 11px; }
  .hk-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hk-target { transition: none; }
}
`;function A({entryId:p,schema:u}){const a=S(p,u),[n,w]=r.useState(()=>a.get("choices")),[x,y]=r.useState(()=>a.get("pause")),[m,g]=r.useState(-1),[i,v]=r.useState(null),[c,f]=r.useState({rt:{},errors:0}),k=r.useRef(0),b=r.useRef(0),l=r.useRef({choices:n,active:-1});l.current={choices:n,active:m},r.useEffect(()=>a.subscribe(()=>{w(a.get("choices")),y(a.get("pause"))}),[a]),r.useEffect(()=>()=>window.clearTimeout(b.current),[]);const N=r.useCallback(s=>{s<2||(b.current=window.setTimeout(()=>{const e=Math.floor(Math.random()*s);k.current=performance.now(),l.current.active=e,g(e)},x))},[x]),R=s=>{if(s!==l.current.active){f(o=>({...o,errors:o.errors+1}));return}if(s<0)return;const e=performance.now()-k.current;v(e),g(-1),l.current.active=-1,f(o=>({...o,rt:{...o.rt,[n]:[...o.rt[n]??[],e]}})),N(n)},M=s=>{const e=[...s].sort((h,d)=>h-d),o=Math.floor(e.length/2);return e.length%2?e[o]:(e[o-1]+e[o])/2},j=Object.keys(c.rt).map(Number).sort((s,e)=>s-e);return t.jsxs(z,{entryId:p,schema:u,children:[t.jsxs("div",{className:"hk-field",children:[t.jsx("p",{className:"hk-status",children:i==null?"点击高亮目标 Click the highlighted target":`上次 ${Math.round(i)} ms`}),t.jsx("div",{className:"hk-ring",style:{position:"relative",width:"min(240px, 60%)",aspectRatio:"1",margin:"40px auto 0"},children:Array.from({length:n},(s,e)=>{const o=(360/n*e-90)*(Math.PI/180),h=50+42*Math.cos(o),d=50+42*Math.sin(o);return t.jsx("button",{type:"button",className:"hk-target","data-active":m===e,style:{left:`${h}%`,top:`${d}%`},onClick:()=>R(e),children:e+1},e)})}),t.jsxs("dl",{className:"hk-panel",children:[t.jsx("dt",{children:"上次反应时 Last RT"}),t.jsx("dd",{children:i==null?"—":`${Math.round(i)} ms`}),t.jsx("dt",{children:"误点 Errors"}),t.jsx("dd",{children:c.errors}),j.length>0&&t.jsxs(t.Fragment,{children:[t.jsx("dt",{children:"按 N 统计中位 RT / 样本"}),t.jsx("table",{className:"hk-table",children:t.jsx("tbody",{children:j.map(s=>t.jsxs("tr",{children:[t.jsxs("td",{children:["N=",s]}),t.jsxs("td",{children:[Math.round(M(c.rt[s])),"ms"]}),t.jsxs("td",{children:["n=",c.rt[s].length]})]},s))})})]})]}),t.jsx("p",{className:"hk-hint",children:"先在 N=2 打 5 轮,再把 choices 拉到 N=8 打 5 轮,对比中位反应时——选项翻倍,决策变慢。 Run 5 rounds at N=2, then N=8, and compare median RTs."})]}),t.jsx("style",{children:E})]})}export{A as default};
