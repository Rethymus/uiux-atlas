import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DLkBFFtG.js";import{g as y}from"./color.DuEPkvq5.js";import{D as S}from"./DemoStage.vW1CgYCd.js";const j="平衡换行让标题的每一行都好看 Balanced headline",C="text-wrap: pretty 用更慢但更优的算法为长正文重新分配断点,把段落末行只剩一两个词的孤行减到最少;balance 则把短文本的各行字数尽量抹平,让标题的两三行长度趋同。两者的分工是:标题与短文本用 balance,长正文用 pretty,可编辑内容用 stable。";function N(i){const l=i.querySelectorAll("[data-ch]"),a=[];let p=-1;for(const c of l){const n=Math.round(c.offsetTop);n!==p&&(a.push(0),p=n),a[a.length-1]+=1}return a}const v=`
.twb-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.twb-support { display: flex; flex-wrap: wrap; gap: 8px; }
.twb-badge { font-size: 12px; padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: color-mix(in srgb, currentColor 8%, transparent); }
.twb-head {
  margin: 0;
  max-width: calc(var(--tw-width) * 1ch);
  text-wrap: var(--tw-heading);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
}
.twb-body {
  margin: 0;
  max-width: calc(var(--tw-width) * 1ch);
  text-wrap: var(--tw-body);
  line-height: 1.8;
  padding: 12px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
}
.twb-lines { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.twb-line { font-size: 11px; padding: 2px 9px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  font-variant-numeric: tabular-nums; opacity: 0.85; }
.twb-line[data-last="true"] { border-style: solid; opacity: 1;
  background: color-mix(in srgb, oklch(0.7 0.14 85) 30%, transparent); }
.twb-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.7; }
`;function A({entryId:i,schema:l}){const a=y(i,l),[p,c]=r.useState(0),n=r.useRef(null);r.useEffect(()=>a.subscribe(()=>c(t=>t+1)),[a]);const b=r.useMemo(()=>Array.from(j),[]),[s,m]=r.useState([]),d=r.useCallback(()=>{const t=n.current;t&&m(N(t))},[]);r.useEffect(()=>{const t=requestAnimationFrame(()=>requestAnimationFrame(d));return()=>cancelAnimationFrame(t)},[d,p]);const[u,f]=r.useState(null),[x,w]=r.useState(null);r.useEffect(()=>{f(typeof CSS<"u"&&CSS.supports("text-wrap","balance")),w(typeof CSS<"u"&&CSS.supports("text-wrap","pretty"))},[]);const h=s.length?s[s.length-1]:0,g=s.length>=2&&h<=3;return e.jsxs(S,{entryId:i,schema:l,children:[e.jsxs("div",{className:"twb-wrap",children:[e.jsxs("div",{className:"twb-support",children:[e.jsxs("span",{className:"twb-badge",children:["balance ",e.jsx("strong",{children:u===null?"…":u?"✓ 本浏览器支持":"✗ 回退 auto"})]}),e.jsxs("span",{className:"twb-badge",children:["pretty ",e.jsx("strong",{children:x===null?"…":x?"✓ 本浏览器支持":"✗ Firefox 未支持,回退 auto"})]}),e.jsxs("span",{className:"twb-badge",children:["标题末行 ",e.jsxs("strong",{children:[s.length," 行 · 末行 ",h," 字",g?" · 孤字!":""]})]})]}),e.jsx("h2",{className:"twb-head",ref:n,children:b.map((t,o)=>e.jsx("span",{"data-ch":t===" "?"sp":void 0,children:t},o))}),e.jsx("div",{className:"twb-lines","aria-hidden":"true",children:s.map((t,o)=>e.jsxs("span",{className:"twb-line","data-last":o===s.length-1?"true":void 0,children:["L",o+1,": ",t," 字"]},o))}),e.jsx("p",{className:"twb-body",children:C}),e.jsx("p",{className:"twb-note",children:"行数上限:balance 仅作用于 ≤6 行(Chromium)/≤10 行(Firefox)的文本块(MDN);分值支持 balance=Chrome 114/Firefox 121/Safari 17.5,pretty=Chrome 117/Safari 26/Firefox 未支持(BCD,调研 11§2)。收窄 width 观察孤字与孤行。 Line caps: balance applies only to blocks of ≤6 lines (Chromium) / ≤10 lines (Firefox) (MDN); per-value support balance=Chrome 114/Firefox 121/Safari 17.5, pretty=Chrome 117/Safari 26/Firefox unsupported (BCD, research 11 §2). Narrow the width to expose orphans."})]}),e.jsx("style",{children:v})]})}export{A as default};
