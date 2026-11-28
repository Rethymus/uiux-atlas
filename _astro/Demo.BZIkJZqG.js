import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as E}from"./color.DuEPkvq5.js";import{D as M}from"./DemoStage.vW1CgYCd.js";const F=`
.jk-field { position: absolute; inset: 0; }
.jk-panel {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(330px, calc(100% - 190px));
  padding: 18px 20px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.8);
  font-size: 13px;
}
.jk-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid oklch(0.5 0 0 / 0.14);
}
.jk-row label { font-weight: 600; }
.jk-switch {
  position: relative;
  width: 44px;
  height: 26px;
  border: 0;
  border-radius: 999px;
  background: oklch(0.7 0 0 / 0.5);
  cursor: pointer;
  transition: background 0.15s ease;
}
.jk-switch::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  translate: 0 0;
  transition: translate 0.15s ease;
}
.jk-switch[aria-checked="true"] { background: oklch(0.6 0.14 250); }
.jk-switch[aria-checked="true"]::after { translate: 18px 0; }
.jk-slider {
  width: 150px;
  accent-color: oklch(0.55 0.13 250);
}
.jk-slider[data-reversed="true"] { direction: rtl; }
.jk-save {
  display: block;
  margin: 14px 0 0 auto;
  border: 0;
  border-radius: 10px;
  padding: 8px 18px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
/* alien 反范式 */
.jk-panel[data-variant="alien"] .jk-row { direction: rtl; border-bottom-style: dashed; }
.jk-panel[data-variant="alien"] .jk-save {
  background: transparent;
  color: oklch(0.5 0 0 / 0.55);
  font-size: 11px;
  padding: 4px;
}
.jk-moon {
  border: 0;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 2px;
  border-radius: 8px;
}
.jk-moon[aria-pressed="true"] { background: oklch(0.4 0.06 265 / 0.25); }
.jk-note {
  margin: 12px 0 0;
  font-size: 11px;
  color: oklch(0.55 0.18 25);
}
.jk-task {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 34%;
  font-size: 12px;
  line-height: 1.6;
}
.jk-task strong { display: block; font-size: 13px; }
.jk-task button {
  margin-top: 6px;
  border: 1px solid oklch(0.5 0 0 / 0.4);
  border-radius: 8px;
  padding: 4px 10px;
  background: oklch(1 0 0 / 0.7);
  font-size: 12px;
  cursor: pointer;
}
.jk-score {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.jk-score b { font-size: 13px; }
.jk-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .jk-score { display: none; }
  .jk-panel { width: calc(100% - 28px); }
  .jk-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .jk-switch, .jk-switch::after { transition: none; }
}
`;function H({entryId:x,schema:u}){const i=E(x,u),[g,v]=a.useState(()=>i.get("variant")),[w,y]=a.useState(()=>i.get("hint")),[r,k]=a.useState(!1),[c,d]=a.useState(!1),[n,p]=a.useState(80),[N,m]=a.useState(0),[o,j]=a.useState(null),[l,S]=a.useState({familiar:null,alien:null}),b=a.useRef(0);a.useEffect(()=>i.subscribe(()=>{v(i.get("variant")),y(i.get("hint"))}),[i]);const s=g==="alien",f=c&&(s?n===100:n===0);a.useEffect(()=>{if(r&&f&&o==null){const t=performance.now()-b.current;j(t),k(!1),S(h=>({...h,[s?"alien":"familiar"]:h[s?"alien":"familiar"]==null?t:Math.min(h[s?"alien":"familiar"],t)}))}},[r,f,o,s]);const z=()=>{d(!1),p(s?100:80),m(0),j(null),b.current=performance.now(),k(!0)},C=()=>{r&&m(t=>t+1)};return e.jsxs(M,{entryId:x,schema:u,children:[e.jsxs("div",{className:"jk-field",children:[e.jsxs("div",{className:"jk-task",children:[e.jsx("strong",{children:"任务 Task"}),w==="show"?e.jsx("p",{style:{margin:0},children:"打开夜间模式,并把音量调到最小。 Enable night mode and set volume to minimum."}):e.jsx("p",{style:{margin:0,opacity:.6},children:"提示已隐藏,自己找 / Hint hidden — find it yourself"}),e.jsx("button",{type:"button",onClick:z,children:r?"重置 Reset":"开始计时 Start"}),r&&e.jsx("span",{"aria-live":"polite",children:"⏱ 计时中… timing"}),o!=null&&e.jsxs("span",{"aria-live":"polite",children:["✔ 用时 ",Math.round(o/100)/10,"s"]})]}),e.jsxs("div",{className:"jk-panel","data-variant":s?"alien":"familiar",children:[s?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"jk-row",children:[e.jsx("button",{type:"button",className:"jk-moon","aria-pressed":c,"aria-label":"月亮(疑似夜间模式?)Moon (maybe night mode?)",onClick:()=>d(t=>!t),children:"🌙"}),e.jsx("span",{style:{fontSize:12,opacity:.6},children:"外观 Appearance?"})]}),e.jsxs("div",{className:"jk-row",children:[e.jsx("input",{type:"range",className:"jk-slider","data-reversed":"true",min:0,max:100,value:n,"aria-label":"声音(反向:左大声右静音)Sound (reversed: left loud, right quiet)",onChange:t=>p(Number(t.target.value))}),e.jsx("span",{style:{fontSize:12,opacity:.6},children:n})]}),e.jsx("button",{type:"button",className:"jk-save",onClick:C,children:"↩ some-text"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"jk-row",children:[e.jsx("label",{htmlFor:"jk-night",children:"夜间模式 Night mode"}),e.jsx("button",{type:"button",id:"jk-night",className:"jk-switch",role:"switch","aria-checked":c,onClick:()=>d(t=>!t)})]}),e.jsxs("div",{className:"jk-row",children:[e.jsx("label",{htmlFor:"jk-vol",children:"音量 Volume"}),e.jsx("input",{type:"range",id:"jk-vol",className:"jk-slider",min:0,max:100,value:n,onChange:t=>p(Number(t.target.value))}),e.jsx("span",{style:{fontSize:12,opacity:.6},children:n})]}),e.jsx("button",{type:"button",className:"jk-save",children:"保存 Save"})]}),s&&e.jsx("p",{className:"jk-note",children:"⚠ 反范式演示:真实产品请给图标可读名称并遵循惯例。Anti-pattern exhibit."})]}),e.jsxs("aside",{className:"jk-score",children:[e.jsx("b",{children:"最近成绩 Latest"}),e.jsxs("p",{style:{margin:0},children:["熟悉范式 familiar: ",l.familiar==null?"—":`${Math.round(l.familiar/100)/10}s`,e.jsx("br",{}),"反范式 alien: ",l.alien==null?"—":`${Math.round(l.alien/100)/10}s`,e.jsx("br",{}),"本次误触 misclicks: ",N]})]}),e.jsx("p",{className:"jk-hint",children:"同一任务分别用两种范式完成一次,对比计时——期望来自你用过的其他产品。 Complete the task once per paradigm and compare — expectations come from other products."})]}),e.jsx("style",{children:F})]})}export{H as default};
