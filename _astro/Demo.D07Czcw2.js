import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g as k}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const f={1:{zh:"Selection 语义:取值变化的单短脉冲(HIG)",en:"Selection: one short pulse on value changes (HIG)"},2:{zh:"Notification success 语义:两段脉冲(HIG)",en:"Notification success: two pulses (HIG)"},4:{zh:"Notification error 语义:四段脉冲(HIG)",en:"Notification error: four pulses (HIG)"}},w=`
.hb-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 12px; padding: 14px; }
.hb-stage {
  position: relative; flex: 1; min-height: 0;
  border: 1px solid var(--border); border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 5%, var(--surface));
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
}
.hb-play {
  border: 0; border-radius: 12px; padding: 10px 26px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  background: color-mix(in srgb, var(--accent) 78%, black); color: #fff;
}
.hb-play:active { transform: translateY(1px); }
.hb-cancel {
  border: 1px solid var(--border); border-radius: 999px; padding: 5px 14px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
.hb-track { display: flex; align-items: center; gap: 3px; height: 34px; }
.hb-seg { height: 100%; border-radius: 4px; }
.hb-seg-on { background: color-mix(in srgb, var(--accent) 75%, transparent); }
.hb-seg-off { background: color-mix(in srgb, var(--border) 70%, transparent); }
.hb-dot { width: 12px; height: 12px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 70%, transparent); }
.hb-scene[data-firing="true"] .hb-dot { animation: hb-beat var(--hb-total, 400ms) linear both; }
@keyframes hb-beat {
  0% { transform: scale(1); opacity: 0.5; }
  4% { transform: scale(1.9); opacity: 1; }
  9% { transform: scale(1); opacity: 0.55; }
  100% { transform: scale(1); opacity: 0.5; }
}
.hb-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.hb-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.hb-chip-ok { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.hb-chip-warn { color: oklch(0.65 0.15 70); }
.hb-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
`;function H({entryId:h,schema:d}){const n=k(h,d),b=()=>({pulses:n.get("pulses"),on:n.get("on"),off:n.get("off")}),[t,m]=o.useState(b),[i,x]=o.useState(null),[g,c]=o.useState(!1),[v,y]=o.useState(0);o.useEffect(()=>n.subscribe(()=>{m(b())}),[n]),o.useEffect(()=>{x(typeof navigator<"u"&&typeof navigator.vibrate=="function")},[]);const p=Number(t.pulses),s=[];for(let a=0;a<p;a++)s.push(t.on),a<p-1&&s.push(t.off);const l=s.reduce((a,r)=>a+r,0),u=f[t.pulses]??f[2],N=()=>{c(!1),y(a=>a+1),i&&navigator.vibrate(s),requestAnimationFrame(()=>c(!0)),window.setTimeout(()=>c(!1),l)},j=()=>{i&&navigator.vibrate(0),c(!1)};return e.jsx(S,{entryId:h,schema:d,children:e.jsxs("div",{className:"hb-scene","data-firing":g,style:{"--hb-total":`${l}ms`},children:[e.jsxs("div",{className:"hb-stage",children:[e.jsx("div",{className:"hb-track","aria-hidden":"true",children:s.map((a,r)=>e.jsx("div",{className:`hb-seg ${r%2===0?"hb-seg-on":"hb-seg-off"}`,style:{width:`${Math.max(10,Math.round(a/l*190))}px`},title:`${r%2===0?"vibrate":"pause"} ${a}ms`},r))}),e.jsx("div",{className:"hb-track","aria-hidden":"true",children:Array.from({length:p},(a,r)=>e.jsx("span",{className:"hb-dot",style:{animationDelay:`${r*(t.on+t.off)}ms`}},r))}),e.jsx("button",{type:"button",className:"hb-play",onClick:N,children:"播放振动 Play haptic"}),e.jsx("button",{type:"button",className:"hb-cancel",onClick:j,children:"取消 vibrate(0)"})]}),e.jsxs("div",{className:"hb-readout",children:[e.jsxs("span",{className:"hb-chip",children:["pattern = [",s.join(", "),"]"]}),e.jsxs("span",{className:"hb-chip",children:["total ",l,"ms"]}),e.jsxs("span",{className:"hb-chip hb-chip-ok",children:[u.zh," / ",u.en]}),i===!0&&e.jsx("span",{className:"hb-chip hb-chip-warn",children:"navigator.vibrate 可用;桌面/静音/勿扰下可能无感(MDN)/ API present, but desktops/muted modes may stay silent"}),i===!1&&e.jsx("span",{className:"hb-chip hb-chip-warn",children:"本环境无 navigator.vibrate(iOS Safari 等)——仅视觉脉冲示意 / no navigator.vibrate here (iOS Safari etc.) — visual pulse only"}),e.jsx("span",{className:"hb-chip hb-chip-note",children:"on/off 毫秒值为演示值(官方未给);需 sticky user activation(按钮即手势)/ on/off ms are demo values (none official); sticky user activation required (the button is the gesture)"})]}),e.jsx("style",{children:w})]},v)})}export{H as default};
