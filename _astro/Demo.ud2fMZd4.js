import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as l}from"./index.DLkBFFtG.js";import{g as S}from"./color.DuEPkvq5.js";import{D as M}from"./DemoStage.vW1CgYCd.js";const k=["很差","较差","还行","推荐","超赞"],n=c=>{const i=Math.ceil(c)-1;return i>=0&&i<k.length?k[i]:`${c} 星`},H=`
.rate-stage { width: min(420px, calc(100% - 48px)); display: grid; justify-items: center; gap: 10px; }
.rate-group { display: flex; gap: 4px; padding: 4px; }
.rate-star {
  position: relative;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 1;
  transition: scale 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.rate-star:hover { scale: 1.12; }
.rate-star > .rate-glyph {
  position: absolute;
  inset: 0;
  color: #d9d9d9;                            /* colorBorder 描边档 */
  pointer-events: none;
}
.rate-star > .rate-fill {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: var(--rate-active, #faad14);        /* gold #FAAD14 */
  pointer-events: none;
}
.rate-zone {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  cursor: pointer;
}
.rate-zone[data-half="left"] { right: 50%; }
.rate-zone[data-half="right"] { left: 50%; }
.rate-zone:focus-visible { outline: 2px solid #1677ff; outline-offset: 2px; }
.rate-out { margin: 0; font-size: 13px; color: rgba(0, 0, 0, 0.65); min-height: 1.6em; text-align: center; }
.rate-out strong { color: rgba(0, 0, 0, 0.88); font-weight: 500; }
.rate-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  margin: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
@media (prefers-reduced-motion: reduce) {
  .rate-star { transition: none; }
  .rate-star:hover { scale: 1; }
}
`;function K({entryId:c,schema:i}){const o=S(c,i),[g,A]=l.useState(()=>o.get("count")),[z,C]=l.useState(()=>o.get("allowHalf")),[w,E]=l.useState(()=>o.get("allowClear")),y=z==="on",d=y?Array.from({length:g*2},(t,a)=>(a+1)/2):Array.from({length:g},(t,a)=>a+1),[s,x]=l.useState(4),[m,f]=l.useState(null),[h,u]=l.useState(3);l.useEffect(()=>{u(t=>Math.min(t,d.length-1))},[d.length]),l.useEffect(()=>o.subscribe(()=>{const t=o.get("count");A(t),C(o.get("allowHalf")),E(o.get("allowClear")),x(a=>Math.min(a,t))}),[o]);const v=m??s,$=t=>{x(w==="on"&&s===t?0:t)},N=t=>{t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),u(a=>Math.min(a+1,d.length-1))):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),u(a=>Math.max(a-1,0))):(t.key===" "||t.key==="Enter")&&(t.preventDefault(),$(d[h]))},b=(t,a)=>{u(a),$(t)},p=m??s,D=p>0?m!=null?`预览 Preview:${p} 星 · ${n(p)}`:`当前 Current:${p} 星 · ${n(p)}${w==="on"&&s>0?"(再点当前值可清空 Click again to clear)":""}`:"未评分 No rating";return r.jsxs(M,{entryId:c,schema:i,children:[r.jsxs("div",{className:"rate-stage",children:[r.jsx("div",{className:"rate-group",role:"radiogroup","aria-label":"评分 Rate this",onKeyDown:N,onMouseLeave:()=>f(null),children:Array.from({length:g},(t,a)=>{const e=a+1,j=v>=e?"full":v>=e-.5?"half":"empty";return r.jsxs("span",{className:"rate-star",children:[r.jsx("span",{className:"rate-glyph","aria-hidden":"true",children:"★"}),r.jsx("span",{className:"rate-fill","aria-hidden":"true",children:r.jsx("span",{style:{display:"block",width:j==="full"?"100%":j==="half"?"50%":"0"},children:"★"})}),y?r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"rate-zone","data-half":"left",role:"radio","aria-checked":s===e-.5,"aria-label":`${e-.5} 星:${n(e-.5)}`,tabIndex:h===a*2?0:-1,title:`${e-.5} 星 ${n(e-.5)}`,onMouseEnter:()=>f(e-.5),onClick:()=>b(e-.5,a*2)}),r.jsx("span",{className:"rate-zone","data-half":"right",role:"radio","aria-checked":s===e,"aria-label":`${e} 星:${n(e)}`,tabIndex:h===a*2+1?0:-1,title:`${e} 星 ${n(e)}`,onMouseEnter:()=>f(e),onClick:()=>b(e,a*2+1)})]}):r.jsx("span",{className:"rate-zone",role:"radio","aria-checked":s===e,"aria-label":`${e} 星:${n(e)}`,tabIndex:h===a?0:-1,title:`${e} 星 ${n(e)}`,onMouseEnter:()=>f(e),onClick:()=>b(e,a)})]},a)})}),r.jsx("p",{className:"rate-out","aria-live":"polite",children:D})]}),r.jsx("style",{children:H}),r.jsx("p",{className:"rate-hint",children:"键盘 Keyboard:←/→ 漫游 · Space/Enter 选中 · 悬停预览 · 再点当前值清空"})]})}export{K as default};
