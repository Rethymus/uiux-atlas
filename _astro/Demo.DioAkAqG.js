import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as N}from"./color.DuEPkvq5.js";import{D as A}from"./DemoStage.vW1CgYCd.js";const z="Typography is the craft of endowing human language with a durable visual form. Good typography depends on quiet judgments made about each character, word and line of text; judgments the reader is not consciously aware of, but which accumulate into a texture of reading. The measure, or line length, is one of those quiet decisions: lines that run too long strain the eye's vertical tracking, while lines that break too soon chop the rhythm into fragments.",C="中文正文同样受行长约束。一行过长时,视线从行尾回到下一行首容易串行;一行过短则换行过频,阅读节奏被打碎。中西文混排时,ch 单位以数字 0 的宽度为基准,同一 ch 数在不同字体与字号下的物理宽度并不相同,需要结合实际度量核对。",h=45,f=90,r=20,c=120;function E(l){const d=l.querySelectorAll("[data-char]"),o=[];let p=-1;for(const x of d){const s=Math.round(x.offsetTop);s!==p&&(o.push(0),p=s),o[o.length-1]+=1}return o}const M=`
.m1-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.m1-band { position: relative; height: 34px; border-radius: 8px; overflow: hidden;
  background: color-mix(in srgb, currentColor 8%, transparent); }
.m1-band-ok { position: absolute; top: 0; bottom: 0;
  left: ${((h-r)/(c-r)*100).toFixed(2)}%;
  width: ${((f-h)/(c-r)*100).toFixed(2)}%;
  background: color-mix(in srgb, oklch(0.72 0.15 150) 30%, transparent); }
.m1-band-tick { position: absolute; top: 0; bottom: 0; width: 1px;
  background: color-mix(in srgb, currentColor 45%, transparent); }
.m1-band-tick span { position: absolute; top: 2px; left: 4px; font-size: 10px; opacity: 0.75; white-space: nowrap; }
.m1-needle { position: absolute; top: 4px; bottom: 4px; width: 2px; border-radius: 1px;
  background: currentColor; transition: left 0.25s ease; }
.m1-column {
  max-width: min(100%, calc(var(--measure-width) * 1ch));
  font-size: var(--measure-font);
  text-align: var(--measure-align);
  line-height: 1.7;
  padding: 14px 16px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  overflow-wrap: anywhere;
}
.m1-readout { display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center;
  font-size: 12px; opacity: 0.85; }
.m1-readout strong { font-variant-numeric: tabular-nums; }
.m1-verdict { font-size: 12px; padding: 2px 10px; border-radius: 999px; border: 1px solid color-mix(in srgb, currentColor 30%, transparent); }
.m1-langbar { align-self: flex-end; display: flex; gap: 2px; padding: 3px;
  border-radius: 999px; background: color-mix(in srgb, currentColor 12%, transparent); }
.m1-langbar button { border: 0; border-radius: 999px; padding: 4px 12px; font-size: 12px;
  cursor: pointer; color: inherit; background: transparent; }
.m1-langbar button[aria-pressed="true"] { background: color-mix(in srgb, currentColor 28%, transparent); }
.m1-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .m1-needle { transition: none; }
}
`;function q({entryId:l,schema:d}){const o=N(l,d),[p,x]=n.useState(0),[s,v]=n.useState("en"),g=n.useRef(null);n.useEffect(()=>o.subscribe(()=>x(t=>t+1)),[o]);const j=n.useMemo(()=>Array.from(s==="en"?z:C),[s]),[i,y]=n.useState([]),u=n.useCallback(()=>{const t=g.current;t&&y(E(t))},[]);n.useEffect(()=>{const t=requestAnimationFrame(()=>requestAnimationFrame(u));return()=>cancelAnimationFrame(t)},[u,p]),n.useEffect(()=>{const t=g.current;if(!t)return;const a=new ResizeObserver(()=>u());return a.observe(t),()=>a.disconnect()},[u]);const w=i.length?Math.max(...i):0,m=i.length?Math.round(i.reduce((t,a)=>t+a,0)/i.length):0,b=s!=="en"?{zh:"中文样例:仅展示换行,不判定",en:"CJK sample: no verdict"}:m>f?{zh:"过长:垂直追踪吃力",en:"Too long: tracking strains"}:m<h?{zh:"过短:换行过频",en:"Too short: choppy"}:{zh:"适读区间内",en:"Within the readable band"},k=Math.min(100,Math.max(0,(m-r)/(c-r)*100));return e.jsxs(A,{entryId:l,schema:d,children:[e.jsxs("div",{className:"m1-wrap",children:[e.jsxs("div",{className:"m1-band","aria-hidden":"true",children:[e.jsx("div",{className:"m1-band-ok"}),e.jsx("div",{className:"m1-band-tick",style:{left:`${(h-r)/(c-r)*100}%`},children:e.jsx("span",{children:"45"})}),e.jsx("div",{className:"m1-band-tick",style:{left:`${(f-r)/(c-r)*100}%`},children:e.jsx("span",{children:"90"})}),e.jsx("div",{className:"m1-needle",style:{left:`${k}%`}})]}),e.jsx("p",{className:"m1-column",ref:g,children:j.map((t,a)=>e.jsx("span",{"data-char":t===" "?"sp":void 0,children:t},a))}),e.jsxs("div",{className:"m1-readout",children:[e.jsxs("span",{children:["行数 Lines ",e.jsx("strong",{children:i.length})]}),e.jsxs("span",{children:["最长行 Longest ",e.jsx("strong",{children:w})]}),e.jsxs("span",{children:["平均行 Average ",e.jsx("strong",{children:m})]}),e.jsxs("span",{className:"m1-verdict",children:[b.zh," / ",b.en]})]}),e.jsx("p",{className:"m1-note",children:"判定口径为拉丁文本「字符(含空格)」;45–90 出自 Butterick《Practical Typography》(已核实),65ch 默认为社区常见惯例(未证实)。 The verdict counts Latin characters incl. spaces; 45–90 is verified from Butterick's Practical Typography, while the 65ch default is a community convention (unverified)."}),e.jsx("div",{className:"m1-langbar",role:"group","aria-label":"样例语言 Sample language",children:[["en","英文 EN"],["zh","中文 ZH"]].map(([t,a])=>e.jsx("button",{type:"button","aria-pressed":s===t,onClick:()=>v(t),children:a},t))})]}),e.jsx("style",{children:M})]})}export{q as default};
