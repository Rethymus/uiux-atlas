import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as B}from"./color.DuEPkvq5.js";import{D as C}from"./DemoStage.vW1CgYCd.js";const m=()=>({started:!1,startedAt:null,done:!1,doneAt:null,misclicks:0,pending:!1}),D=["查询余额 Balance","取款 Withdraw","存款 Deposit","转账 Transfer"],x=0,j=900,K=`
.au-field { position: absolute; inset: 0; }
.au-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 26%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
.au-cards {
  position: absolute;
  left: 50%;
  top: 46%;
  translate: -50% -50%;
  display: flex;
  gap: 18px;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  max-width: calc(100% - 32px);
}
.au-card {
  position: relative;
  width: 236px;
  padding: 14px 16px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 2px;
  background: oklch(1 0 0 / 0.85);
  color: oklch(0.25 0.02 250);
}
.au-card h3 {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.02em;
}
.au-task { margin: 0 0 10px; font-size: 11px; opacity: 0.7; }
.au-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.au-menu button {
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 2px;
  background: transparent;
  padding: 9px 4px;
  font-size: 12px;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.au-status {
  margin: 10px 0 8px;
  font-size: 11px;
  opacity: 0.75;
  min-height: 1.5em;
}
.au-rate { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.au-rate input[type="range"] { flex: 1; accent-color: oklch(0.5 0.05 250); }
.au-rate b { min-width: 2.4em; text-align: right; }
.au-again {
  margin-top: 8px;
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 2px;
  background: transparent;
  padding: 3px 10px;
  font-size: 11px;
  color: inherit;
  cursor: pointer;
}

/* —— 精修 / 高定档:只改装饰层,按钮布局不变 —— */
.au-card[data-beauty="refined"],
.au-card[data-beauty="premium"] {
  border-color: color-mix(in srgb, var(--au-accent) 45%, transparent);
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
.au-card[data-beauty="refined"] h3::after,
.au-card[data-beauty="premium"] h3::after {
  content: "";
  display: block;
  width: 42px;
  height: 3px;
  margin-top: 4px;
  border-radius: 2px;
  background: var(--au-accent);
}
.au-card[data-beauty="refined"] .au-menu button,
.au-card[data-beauty="premium"] .au-menu button {
  border-radius: 8px;
  border-color: color-mix(in srgb, var(--au-accent) 28%, transparent);
}
.au-card[data-beauty="refined"] .au-menu button:hover,
.au-card[data-beauty="premium"] .au-menu button:hover {
  background: color-mix(in srgb, var(--au-accent) 12%, transparent);
}
.au-card[data-beauty="premium"] {
  border-radius: 18px;
  padding-top: 18px;
  padding-bottom: 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
}
.au-card[data-beauty="premium"] h3 { font-size: 14px; }
.au-card[data-beauty="premium"]::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 46px;
  border-radius: 17px 17px 0 0;
  background: linear-gradient(color-mix(in srgb, var(--au-accent) 16%, transparent), transparent);
  pointer-events: none;
}
.au-card[data-beauty="refined"] > *,
.au-card[data-beauty="premium"] > * { position: relative; }

/* 成功态:两侧同样式,只靠 accent 上色 */
.au-menu button[data-done="true"] {
  background: color-mix(in srgb, var(--au-accent) 20%, transparent);
  border-color: var(--au-accent);
  font-weight: 650;
}
.au-menu button[data-pending="true"] { opacity: 0.55; cursor: progress; }

.au-compare {
  position: absolute;
  left: 50%;
  bottom: 10px;
  translate: -50% 0;
  width: min(520px, calc(100% - 32px));
  padding: 8px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  text-align: center;
}
.au-compare .au-cap { display: block; margin-top: 2px; font-size: 10px; opacity: 0.6; }

@media (max-width: 560px) {
  .au-note { display: none; }
  .au-card { width: min(236px, calc(100% - 24px)); }
}
@media (prefers-reduced-motion: reduce) {
  .au-menu button { transition: none; }
}
`;function G({entryId:b,schema:g}){const s=B(b,g),[A,T]=i.useState(()=>s.get("beauty")),[h,N]=i.useState(()=>s.get("handicap")),[o,c]=i.useState({plain:m(),refined:m()}),[p,z]=i.useState({plain:3,refined:3}),f=i.useRef([]);i.useEffect(()=>s.subscribe(()=>{T(s.get("beauty")),N(s.get("handicap"))}),[s]),i.useEffect(()=>()=>f.current.forEach(a=>window.clearTimeout(a)),[]);const M=(a,r)=>{const d=o[a];if(d.done||d.pending)return;const n=d.startedAt??performance.now();if(r!==x){c(t=>({...t,[a]:{...t[a],started:!0,startedAt:n,misclicks:t[a].misclicks+1}}));return}if(h==="slow-response"){c(u=>({...u,[a]:{...u[a],started:!0,startedAt:n,pending:!0}}));const t=window.setTimeout(()=>{c(u=>({...u,[a]:{...u[a],done:!0,doneAt:performance.now(),pending:!1}}))},j);f.current.push(t);return}c(t=>({...t,[a]:{...t[a],started:!0,startedAt:n,done:!0,doneAt:performance.now(),pending:!1}}))},l=a=>a.done&&a.startedAt!==null&&a.doneAt!==null?Math.round(a.doneAt-a.startedAt):null,S=o.plain.done&&o.refined.done,y=l(o.plain),k=l(o.refined),v=p.refined-p.plain,E=y!==null&&k!==null?k-y:null,R=o.refined.misclicks-o.plain.misclicks,w=a=>{const r=o[a],d=l(r);return e.jsxs("section",{className:"au-card","data-beauty":a==="refined"?A:void 0,"aria-label":a==="plain"?"素坯终端 ATM-A":"精修终端 ATM-B",children:[e.jsx("h3",{children:a==="plain"?"素坯终端 ATM-A":"精修终端 ATM-B"}),e.jsx("p",{className:"au-task",children:"任务 Task:查询余额 Balance check"}),e.jsx("div",{className:"au-menu",children:D.map((n,t)=>e.jsx("button",{type:"button",onClick:()=>M(a,t),"data-done":t===x&&r.done?"true":void 0,"data-pending":t===x&&r.pending?"true":void 0,style:h==="small-target"?{padding:"2px 4px",fontSize:10}:void 0,children:n},n))}),e.jsx("p",{className:"au-status","aria-live":"polite",children:r.pending?`处理中…(迟缓反馈 ${j}ms)`:r.done?`已完成 ✓ 用时 ${d} ms · 误点 ${r.misclicks}`:`用时 — ms · 误点 ${r.misclicks}`}),e.jsxs("label",{className:"au-rate",children:[e.jsx("span",{children:"感知易用性"}),e.jsx("input",{type:"range",min:1,max:7,step:1,value:p[a],onChange:n=>z(t=>({...t,[a]:Number(n.target.value)}))}),e.jsxs("b",{children:[p[a],"/7"]})]}),e.jsx("button",{type:"button",className:"au-again",onClick:()=>c(n=>({...n,[a]:m()})),children:"重测 Retry"})]})};return e.jsx(C,{entryId:b,schema:g,children:e.jsxs("div",{className:"au-field",children:[e.jsx("p",{className:"au-note",children:"Kurosu & Kashimura(1995):26 种 ATM 界面 × 252 人。先完成两侧任务,再分别打感知分—— 看感知分差与实测差异谁更偏心美观。 Kurosu & Kashimura (1995): 26 ATM layouts × 252 participants. Finish both tasks, rate both, and see which gap favors the pretty one."}),e.jsxs("div",{className:"au-cards",children:[w("plain"),w("refined")]}),e.jsx("div",{className:"au-compare","aria-live":"polite",children:S?e.jsxs(e.Fragment,{children:["感知分差 ",v>=0?"+":"",v," · 实测用时差 ",E," ms(负=精修更快)· 误点差 ",R,e.jsx("span",{className:"au-cap",children:"对照实验结论:感知分差常偏向精修侧,即便实测打平——美观红利(12 补研 §14)。 Perceived gap usually favors the refined side even when measured performance ties — the aesthetic dividend."})]}):e.jsx(e.Fragment,{children:"完成两侧任务后,这里给出感知分差 vs 实测差异 / Complete both sides to compare perceived vs measured."})}),e.jsx("style",{children:K})]})})}export{G as default};
