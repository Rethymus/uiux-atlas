import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as s}from"./index.DLkBFFtG.js";import{g as v}from"./color.DuEPkvq5.js";import{D as j}from"./DemoStage.vW1CgYCd.js";const x={short:{token:"short",ms:[50,100,150,200],guidance:{zh:"小工具类:选择控件、芯片、小面积状态变化",en:"Small utility: selection controls, chips, small state changes"},example:{4:{zh:"官方示例:选择控件 200ms + Standard easing",en:"Official example: selection controls, 200ms + Standard easing"}}},medium:{token:"medium",ms:[250,300,350,400],guidance:{zh:"中等面积转场:卡片组、面板进出",en:"Medium-area transitions: card groups, panels"},example:{4:{zh:"官方示例:FAB→Sheet 400ms",en:"Official example: FAB→Sheet at 400ms"}}},long:{token:"long",ms:[450,500,550,600],guidance:{zh:"大面积转场:全屏化容器、大面板",en:"Large-area transitions: full-screen containers, large panels"},example:{2:{zh:"官方示例:Card→全屏 500ms + Emphasized",en:"Official example: Card→fullscreen at 500ms + Emphasized"}}},XL:{token:"extra-long",ms:[700,800,900,1e3],guidance:{zh:"环境类转场:仅限无用户输入的场景(官方口径)",en:"Ambient transitions: no user input, per official guidance"},example:{}}},z=`
.mtk-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.mtk-stage {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 12px;
  background:
    radial-gradient(80% 100% at 20% 0%, color-mix(in srgb, var(--accent) 10%, var(--surface)), var(--surface));
  display: flex; align-items: center; justify-content: center;
}
.mtk-card {
  width: min(300px, calc(100% - 40px));
  padding: 14px 16px; border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.12);
}
.mtk-card h3 { margin: 0 0 4px; font-size: 14px; font-weight: 650; }
.mtk-card p { margin: 0; font-size: 12px; line-height: 1.55; color: var(--text-dim); }
.mtk-run {
  animation: mtk-in var(--mtk-dur, 200ms) cubic-bezier(0.2, 0, 0, 1) both;
}
@keyframes mtk-in {
  from { opacity: 0.25; transform: translateY(14px) scale(0.97); }
  to { opacity: 1; transform: none; }
}
.mtk-scene[data-reduced="true"] .mtk-run { animation: none; }
.mtk-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.mtk-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.mtk-chip-official { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.mtk-chip-warn { color: oklch(0.65 0.15 70); }
`;function E({entryId:m,schema:d}){const n=v(m,d),l=()=>({tier:n.get("tier"),step:n.get("step")}),[a,h]=s.useState(l),[f,g]=s.useState(0),[p,k]=s.useState(!1);s.useEffect(()=>n.subscribe(()=>{h(l()),g(r=>r+1)}),[n]),s.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),c=()=>k(r.matches);return c(),r.addEventListener("change",c),()=>r.removeEventListener("change",c)},[]);const t=x[a.tier]??x.short,b=Math.min(Math.max(Number(a.step)-1,0),3),i=t.ms[b],u=s.useMemo(()=>`md.sys.motion.duration.${t.token}${a.step}`,[t.token,a.step]),o=t.example[Number(a.step)];return e.jsx(j,{entryId:m,schema:d,children:e.jsxs("div",{className:"mtk-scene","data-reduced":p,children:[e.jsx("div",{className:"mtk-stage",children:e.jsxs("div",{className:"mtk-card mtk-run",style:{"--mtk-dur":`${i}ms`},children:[e.jsx("h3",{children:"采样卡片 Sample card"}),e.jsxs("p",{children:["入场时长 = ",u," = ",i,"ms;曲线固定 Standard cubic-bezier(0.2, 0, 0, 1)。"," ","Entrance duration follows the selected official token."]})]},`${a.tier}-${a.step}-${f}`)}),e.jsxs("div",{className:"mtk-readout",children:[e.jsxs("span",{className:"mtk-chip",children:[u," = ",i,"ms"]}),e.jsxs("span",{className:"mtk-chip",children:["tier: ",a.tier," / step: ",a.step]}),o&&e.jsxs("span",{className:"mtk-chip mtk-chip-official",children:[o.zh," / ",o.en]}),e.jsxs("span",{className:"mtk-chip",children:[t.guidance.zh," / ",t.guidance.en]}),i>600&&e.jsx("span",{className:"mtk-chip mtk-chip-warn",children:">600ms:官方仅限无用户输入的环境转场 / official: ambient, no user input"}),p&&e.jsx("span",{className:"mtk-chip",children:"reduced-motion: 直出终态 / final state rendered directly"})]}),e.jsx("style",{children:z})]})})}export{E as default};
