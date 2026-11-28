import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as u}from"./color.DuEPkvq5.js";import{D as m}from"./DemoStage.vW1CgYCd.js";const g=`
.pf-stage { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 8px; }
.pf-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center; }
.pf-btn {
  border: 1px solid transparent; border-radius: 10px;
  padding: 11px 22px; font-size: 14px; font-weight: 600; color: #fff;
  background: linear-gradient(180deg, oklch(0.58 0.16 255), oklch(0.5 0.16 255));
  cursor: pointer; user-select: none; touch-action: manipulation;
  /* 松手回弹:120ms + Arco decelerate(调研 10§1.3);按下瞬时由 data-response 控制 */
  transition: all var(--press-release-ms, 120ms) cubic-bezier(0.4, 0.8, 0.74, 1);
}
.pf-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
/* 按压瞬时(Arco 官方 :active{transition:none} 的等价实现) */
.pf-stage[data-response="instant"] .pf-btn[data-pressed="true"] { transition: none; }
/* scale+alpha 按压对(社区常见值,未证实) */
.pf-stage[data-mode="scale"] .pf-btn[data-pressed="true"] {
  transform: scale(var(--press-scale, 0.97));
  opacity: var(--press-alpha, 0.8);
}
/* 色彩阶进:库默认语义——只换底色/明度,不动 transform(AntD 五属性/Apple 官网 :active 同族) */
.pf-stage[data-mode="color"] .pf-btn[data-pressed="true"] { filter: brightness(0.88) saturate(1.05); }
.pf-stage[data-mode="color"] .pf-btn[data-hover="true"] { filter: brightness(1.07); }
.pf-ghost {
  border: 1px solid var(--border); border-radius: 10px;
  padding: 11px 22px; font-size: 14px; color: var(--text);
  background: var(--surface); cursor: pointer; user-select: none; touch-action: manipulation;
  transition: all var(--press-release-ms, 120ms) cubic-bezier(0.4, 0.8, 0.74, 1);
}
.pf-ghost:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.pf-stage[data-response="instant"] .pf-ghost[data-pressed="true"] { transition: none; }
.pf-stage[data-mode="scale"] .pf-ghost[data-pressed="true"] {
  transform: scale(var(--press-scale, 0.97));
  opacity: var(--press-alpha, 0.8);
}
.pf-stage[data-mode="color"] .pf-ghost[data-pressed="true"] { background: color-mix(in srgb, var(--border) 55%, var(--surface)); }
.pf-readout {
  display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}
.pf-badge {
  padding: 2px 12px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); color: var(--text-dim); min-width: 9.5em; text-align: center;
  transition: color 0.1s linear, border-color 0.1s linear, background-color 0.1s linear;
}
.pf-badge[data-hot="true"] { background: var(--accent); border-color: transparent; color: var(--bg); }
.pf-hint { max-width: 560px; font-size: 12px; color: var(--text-faint); line-height: 1.6; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .pf-btn, .pf-ghost, .pf-badge { transition: none; }
  .pf-stage[data-mode="scale"] .pf-btn[data-pressed="true"],
  .pf-stage[data-mode="scale"] .pf-ghost[data-pressed="true"] { transform: none; }
}
`;function y({entryId:i,schema:p}){const r=u(i,p),d=()=>({pressResponse:r.get("pressResponse"),mode:r.get("mode")}),[l,f]=n.useState(d),[s,a]=n.useState("idle");n.useEffect(()=>r.subscribe(()=>{f(d())}),[r]);const c=o=>({"data-pressed":s===o?"true":"false","data-hover":s===o?"true":"false",onPointerDown:t=>{t.currentTarget.setPointerCapture?.(t.pointerId),a(o)},onPointerUp:()=>a("idle"),onPointerCancel:()=>a("idle"),onKeyDown:t=>{(t.key===" "||t.key==="Enter")&&!t.repeat&&a(o)},onKeyUp:t=>{(t.key===" "||t.key==="Enter")&&a("idle")},onBlur:()=>a("idle")});return e.jsx(m,{entryId:i,schema:p,children:e.jsxs("div",{className:"pf-stage","data-response":l.pressResponse,"data-mode":l.mode,children:[e.jsxs("div",{className:"pf-row",children:[e.jsx("button",{type:"button",className:"pf-btn",...c("primary"),children:"主操作 Primary"}),e.jsx("button",{type:"button",className:"pf-ghost",...c("ghost"),children:"次操作 Secondary"})]}),e.jsxs("div",{className:"pf-readout","aria-live":"off",children:[e.jsx("span",{children:"UIControl.isHighlighted:"}),e.jsx("span",{className:"pf-badge","data-hot":s!=="idle"?"true":"false",children:s!=="idle"?"highlighted(按下中)":"normal(释放)"})]}),e.jsxs("p",{className:"pf-hint",children:["按住不放观察:按下瞬时生效(0ms),松手才走 ","--press-release-ms"," 缓出——状态成对、跟手即时 / Hold to observe: the press lands instantly, only the release eases back — a paired state with instant response."]}),e.jsx("style",{children:g})]})})}export{y as default};
