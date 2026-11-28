import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";const D=40,L=250,z=200,o=10,i=1,G="translateY(14px)",b=[{zh:"欢迎",en:"Welcome"},{zh:"试一试",en:"Try it"},{zh:"完成",en:"Done"}],U=`
.oj-scene { position: absolute; inset: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 16px; }
.oj-card {
  width: min(430px, 100%);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
  padding: 14px 16px 16px;
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, 0.12), 0 9px 28px 0 rgba(0, 0, 0, 0.05); /* Ant @shadow-2 下拉面板档 */
}
/* 步骤头:aria-current=step;可跳过且不再弹(Apple Onboarding)走右上「跳过」 */
.oj-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.oj-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.oj-dot {
  width: 22px; height: 6px; border-radius: 999px;
  background: color-mix(in srgb, var(--text) 14%, transparent);
}
.oj-dot[data-state="process"] { background: var(--accent); }
.oj-dot[data-state="finish"] { background: color-mix(in srgb, var(--accent) 45%, transparent); }
.oj-skip {
  position: relative;
  margin-left: auto;
  border: 0;
  background: transparent;
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-faint);
}
.oj-skip::after { content: ""; position: absolute; inset: -6px; } /* 热区 ≥42px */
.oj-skip:hover { color: var(--text); }
.oj-skip:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
/* ── 步骤体编排:首屏直出(TDesign 禁顺序动画),步进转场才交错(choreography)── */
.oj-body { min-height: 148px; position: relative; }
.oj-panel { display: flex; flex-direction: column; gap: 10px; }
/* 首屏直出:整块 200ms 纯 fade,无交错 */
.oj-panel[data-fresh="true"] { animation: oj-fade 200ms ease-out both; }
/* 步进入场:子项 delay = i × 40ms,方向 up(translateY 14px → 0),250ms std-decel */
.oj-panel[data-anim="in"] > * { animation: oj-in ${L}ms cubic-bezier(0, 0, 0, 1) both; }
/* 步进出场:整块退场(Ant「出场整块消失不排队」),200ms std-accel */
.oj-panel[data-anim="out"] { animation: oj-out ${z}ms cubic-bezier(0.3, 0, 1, 1) both; }
.oj-scene[data-reduced="true"] .oj-panel > *,
.oj-scene[data-reduced="true"] .oj-panel[data-fresh="true"] { animation-name: oj-fade; }
.oj-scene[data-reduced="true"] .oj-panel > * { transform: none !important; }
@keyframes oj-in { from { opacity: 0; transform: ${G}; } to { opacity: 1; transform: none; } }
@keyframes oj-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes oj-fade { from { opacity: 0; } to { opacity: 1; } }
.oj-title { margin: 0; font-size: 15px; font-weight: 650; color: var(--text); }
.oj-desc { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--text-dim); }
/* 交互式教学(Apple:可交互方式教学优于说明书):真开关,试用后下一步才放行 */
.oj-try {
  display: flex; align-items: center; gap: 10px;
  border: 1px solid var(--border); border-radius: 10px;
  padding: 10px 12px; background: var(--bg-elev);
}
.oj-try input { accent-color: var(--accent); width: 16px; height: 16px; }
.oj-try span { font-size: 13px; color: var(--text); }
.oj-try small { margin-left: auto; font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.oj-nudge { margin: 0; font-size: 12px; color: var(--accent); }
/* 页脚:目标 ≥48px(M3 交互目标口径;视觉 36px + ::after 热区补足) */
.oj-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px; }
.oj-btn {
  position: relative;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
  white-space: nowrap;
}
.oj-btn::after { content: ""; position: absolute; inset: -5px; } /* 热区 ≥48px */
.oj-btn:hover { border-color: var(--accent); }
.oj-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.oj-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; color: #fff; }
.oj-btn-primary:hover { background: rgba(30, 90, 220, 0.95); }
/* ── 工作台:集章卡(goal-gradient steps=10/headStart=1)+ 空状态↔内容(空状态组件)── */
.oj-stamps { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.oj-stamp {
  width: 26px; height: 26px;
  display: grid; place-items: center;
  border: 1.5px dashed color-mix(in srgb, var(--text) 30%, transparent);
  border-radius: 999px;
  font-size: 10px;
  color: color-mix(in srgb, var(--text) 45%, transparent);
  background: transparent;
}
.oj-stamp[data-pre="true"] {
  border-style: solid;
  border-color: color-mix(in srgb, var(--accent) 60%, transparent);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  color: var(--accent);
}
.oj-stamp[data-hit="true"] {
  border-style: solid;
  border-color: oklch(0.62 0.14 155 / 0.75);
  background: oklch(0.62 0.14 155 / 0.16);
  color: oklch(0.55 0.13 155);
}
.oj-scene[data-reduced="false"] .oj-stamp[data-anim="true"] { animation: oj-pop 250ms cubic-bezier(0, 0, 0, 1) both; }
@keyframes oj-pop { from { transform: scale(0.6); opacity: 0; } to { transform: none; opacity: 1; } }
.oj-progress { height: 8px; border-radius: 999px; background: color-mix(in srgb, var(--text) 10%, transparent); overflow: hidden; }
.oj-progress > i { display: block; height: 100%; border-radius: inherit; background: var(--accent); transition: width 300ms ease; }
.oj-readout { margin: 0; font-size: 12px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.oj-readout b { color: var(--text); font-weight: 600; }
/* 空状态卡(Ant Empty 解剖:插画 + 标题 + 说明 + children CTA):占位尺寸 = 内容尺寸,换载零位移 */
.oj-empty {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 18px 16px 16px; text-align: center;
  border: 1px dashed var(--border-strong);
  border-radius: 12px;
  background: var(--bg-elev);
  min-height: 118px;
}
.oj-art { width: 62px; height: 48px; border-radius: 8px; position: relative; background: color-mix(in srgb, var(--text) 6%, transparent); overflow: hidden; }
.oj-art::before { content: ""; position: absolute; inset: 10px 12px auto; height: 5px; border-radius: 3px; background: color-mix(in srgb, var(--text) 25%, transparent); }
.oj-art::after { content: ""; position: absolute; left: 12px; right: 22px; bottom: 10px; height: 5px; border-radius: 3px; background: color-mix(in srgb, var(--text) 12%, transparent); }
.oj-empty strong { font-size: 13.5px; color: var(--text); }
.oj-empty p { margin: 0; font-size: 12px; line-height: 1.5; color: var(--text-dim); }
.oj-cta {
  position: relative;
  margin-top: 2px;
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: rgba(30, 90, 220, 0.85);
  min-height: 48px; /* M3 交互目标 48dp 口径 */
}
.oj-cta::after { content: ""; position: absolute; inset: -4px; }
.oj-cta:hover { background: rgba(30, 90, 220, 0.95); }
.oj-cta:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* 内容到达:快速淡入覆盖、零位移(占位尺寸 = 内容尺寸) */
.oj-rows { display: flex; flex-direction: column; gap: 8px; min-height: 118px; }
.oj-row {
  display: flex; align-items: center; gap: 10px;
  border: 1px solid var(--border); border-radius: 10px;
  padding: 10px 12px; font-size: 12.5px; color: var(--text); background: var(--surface);
}
.oj-scene[data-reduced="false"] .oj-row { animation: oj-fade 200ms ease-out both; }
.oj-row b { font-weight: 600; }
.oj-row small { margin-left: auto; color: var(--text-faint); font-variant-numeric: tabular-nums; }
/* ── 工具栏 / 铭牌(mono 元数据纪律)── */
.oj-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  margin: 0;
  display: flex;
  gap: 2px;
  padding: 5px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
.oj-layers {
  position: absolute;
  left: 12px;
  bottom: 12px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  line-height: 1.45;
  pointer-events: none;
}
.oj-layers b { font-weight: 600; color: var(--text); }
@media (max-width: 860px) {
  .oj-toolbar { display: none; } /* 纯信息徽标:窄舞台让位给卡片,避免压住「跳过」钮 */
  .oj-layers { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .oj-progress > i { transition: none; }
}
`;function Y({locale:T}){const a=T==="zh",[A,h]=s.useState("onboarding"),[n,j]=s.useState(1),[c,l]=s.useState("fresh"),[$,p]=s.useState(0),[u,f]=s.useState(!1),[E,x]=s.useState(!1),[d,v]=s.useState(i),[g,y]=s.useState([]),[k,w]=s.useState(!1),[M,N]=s.useState(0),[m,C]=s.useState(!1);s.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>C(r.matches);return t(),r.addEventListener("change",t),()=>r.removeEventListener("change",t)},[]);const O=r=>{if(m){j(r),l("fresh"),p(t=>t+1);return}l("out"),p(t=>t+1),window.setTimeout(()=>{j(r),l("in"),p(t=>t+1)},z)},F=()=>{if(n===2&&!u){x(!0);return}if(x(!1),n<b.length){O(n+1);return}h("workspace")},P=()=>{w(!0),h("workspace")},R=()=>{const r=g.length+1;y(t=>[...t,a?`项目 0${r}`:`Project 0${r}`]),v(t=>Math.min(t+1,o)),N(d+1)},_=()=>{h("onboarding"),j(1),l("fresh"),f(!1),x(!1),v(i),y([]),w(!1),N(0),p(r=>r+1)},S=o-d;return e.jsxs("div",{className:"demo-stage",children:[e.jsxs("span",{className:"stage-plate","aria-hidden":"true",children:[e.jsx("span",{className:"stage-plate-dot"}),"Onboarding Journey"]}),e.jsxs("div",{className:"oj-scene","data-reduced":m,children:[e.jsx("section",{className:"oj-card","aria-label":a?"首启引导演示":"Onboarding demo",children:A==="onboarding"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"oj-head",children:[e.jsx("ol",{className:"oj-dots","aria-label":a?"引导步骤进度":"Onboarding progress",children:b.map((r,t)=>e.jsx("li",{className:"oj-dot","data-state":t+1===n?"process":t+1<n?"finish":"wait","aria-current":t+1===n?"step":void 0,title:a?r.zh:r.en},r.en))}),e.jsx("button",{type:"button",className:"oj-skip",onClick:P,children:a?k?"已跳过(不再弹出)":"跳过引导":k?"Skipped (won't reshow)":"Skip"})]}),e.jsx("div",{className:"oj-body","aria-busy":c==="out",children:e.jsxs("div",{className:"oj-panel","data-fresh":c==="fresh","data-anim":c==="out"?"out":void 0,children:[n===1&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"oj-title",children:a?"三步,把工作台变成你的":"Three steps to make it yours"}),e.jsx("p",{className:"oj-desc",children:a?"引导在启动完成后进行(不在启动路径上加塞);上下文相关提示优于单一流程。本页为首屏,按 TDesign 纪律直出、不编排。":"Onboarding runs after launch (never inside it); contextual tips beat a single flow. This first screen renders directly per TDesign — no choreography on first paint."})]}),n===2&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"oj-title",children:a?"先试一试,再继续":"Try it, then move on"}),e.jsx("p",{className:"oj-desc",children:a?"Apple Onboarding:可交互方式教学优于说明书。翻一下这个开关,感受它管什么。":"Apple Onboarding: interactive teaching beats manuals. Flip this switch to feel what it controls."}),e.jsxs("label",{className:"oj-try",children:[e.jsx("input",{type:"checkbox",checked:u,onChange:r=>{f(r.target.checked),r.target.checked&&x(!1)}}),e.jsx("span",{children:a?"开启专注模式":"Enable focus mode"}),e.jsx("small",{children:u?a?"已试用 ✓":"tried ✓":a?"未试用":"not tried"})]}),E&&e.jsx("p",{className:"oj-nudge",children:a?"先翻一下上面的开关,再继续 →":"Flip the switch above first →"})]}),n===3&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"oj-title",children:a?"就绪。预置了一点进度":"Ready. We preset a little progress"}),e.jsx("p",{className:"oj-desc",children:a?`集章卡共 ${o} 章,已为你预盖 ${i} 章「完成首启引导」(人为进度):越接近目标,行动力越强。`:`The stamp card holds ${o} stamps; ${i} is pre-stamped for finishing onboarding (artificial progress): motivation rises as the goal nears.`}),e.jsx("div",{className:"oj-stamps","aria-hidden":"true",children:Array.from({length:o},(r,t)=>e.jsx("span",{className:"oj-stamp","data-pre":t<i,"data-hit":t<d&&t>=i,children:t+1},t))})]})]},`${n}-${c}-${$}`)}),e.jsx("div",{className:"oj-foot",children:e.jsx("button",{type:"button",className:"oj-btn oj-btn-primary",onClick:F,children:n===b.length?a?"开始使用 →":"Start using →":a?"下一步 →":"Next →"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"oj-head",children:e.jsx("p",{className:"oj-readout",role:"status",children:a?e.jsxs(e.Fragment,{children:["集章 ",e.jsxs("b",{children:[d,"/",o]})," · 还差 ",e.jsx("b",{children:Math.max(S,0)})," 章解锁高级看板"]}):e.jsxs(e.Fragment,{children:["Stamps ",e.jsxs("b",{children:[d,"/",o]})," · ",e.jsx("b",{children:Math.max(S,0)})," to unlock pro dashboards"]})})}),e.jsx("div",{className:"oj-stamps","aria-hidden":"true",children:Array.from({length:o},(r,t)=>e.jsx("span",{className:"oj-stamp","data-pre":t<i,"data-hit":t<d&&t>=i,"data-anim":t+1===M&&!m,children:t+1},`${t}-${d}`))}),e.jsx("div",{className:"oj-progress",role:"progressbar","aria-valuemin":0,"aria-valuemax":o,"aria-valuenow":d,"aria-label":a?"集章进度":"Stamp progress",style:{marginTop:"10px"},children:e.jsx("i",{style:{width:`${d/o*100}%`}})}),e.jsx("div",{style:{marginTop:"10px"},"aria-busy":!1,children:g.length===0?e.jsxs("div",{className:"oj-empty",role:"status",children:[e.jsx("div",{className:"oj-art","aria-hidden":"true"}),e.jsx("strong",{children:a?"还没有项目":"No projects yet"}),e.jsx("p",{children:a?"创建第一个项目,开始集章。空态底部的引导操作 = children CTA(Ant Empty)。":"Create your first project to start collecting stamps. The bottom action = children CTA (Ant Empty)."}),e.jsx("button",{type:"button",className:"oj-cta",onClick:R,children:a?"创建第一个项目":"Create first project"})]}):e.jsx("div",{className:"oj-rows",role:"list","aria-label":a?"已创建项目":"Projects",children:g.map((r,t)=>e.jsxs("div",{className:"oj-row",role:"listitem",children:[e.jsx("b",{children:r}),e.jsx("small",{children:a?`集章 ${Math.min(i+t+1,o)}/${o}`:`stamp ${Math.min(i+t+1,o)}/${o}`})]},r))})}),e.jsx("div",{className:"oj-foot",children:e.jsx("button",{type:"button",className:"oj-btn",onClick:_,children:a?"⟲ 重放(演示)":"⟲ Replay (demo)"})})]})}),e.jsx("p",{className:"oj-toolbar","aria-hidden":"true",children:e.jsx("span",{"aria-hidden":"true",children:m?a?"reduced-motion:纯淡入":"reduced-motion: fade only":a?"编排 on":"choreography on"})}),e.jsxs("p",{className:"oj-layers","aria-hidden":"true",children:[e.jsxs("span",{children:[e.jsx("b",{children:"1"})," choreo: first paint direct · steps i×",D,"ms · 250/200ms (M3)"]}),e.jsxs("span",{children:[e.jsx("b",{children:"2"})," empty: art + title + desc + children CTA · zero-shift swap"]}),e.jsxs("span",{children:[e.jsx("b",{children:"3"})," gradient: ",o," stamps · headStart ",i," (artificial)"]}),e.jsxs("span",{children:[e.jsx("b",{children:"4"})," skip: skippable, won't reshow (Apple Onboarding)"]})]})]}),e.jsx("style",{children:U})]})}export{Y as default};
