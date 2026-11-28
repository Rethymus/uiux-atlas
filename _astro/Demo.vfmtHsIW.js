import{j as o}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as H}from"./color.DuEPkvq5.js";import{D as B}from"./DemoStage.vW1CgYCd.js";const $=`## 流式渲染协议 Streaming Protocol

AI 回答按 **token 流**渐进到达,渲染层要在不完整语法下保持版面稳定。

- 未闭合粗体:这句话在流中先是 **半截粗体,随后才闭合;
- 行内代码:吐字节奏由 smoothStream 的 \`delayInMs\` 控制;
- 半截链接:流中先出现 [Streamdown 官方文档](https://streamdown.ai/docs),闭合前要可渲染不可误导。

流结束后光标移除,已完成段落保持稳定(Streamdown 块级 memo)。`,O=/\n|[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]|[A-Za-z0-9][A-Za-z0-9'’\-]*|\s+|[^\s]/gu;function W(a){const l=Intl.Segmenter;return l?Array.from(new l("zh",{granularity:"word"}).segment(a),t=>t.segment):a.match(O)??[]}function E(a,l){const t=[];let e="",d=!1,m=!1,p=null;const r=(i,c,f)=>{c&&t.push({kind:i,text:c,href:f})},g=()=>p!==null?"text":m?"code":d?"bold":"text";for(let i=0;i<a.length;i++){const c=a[i];if(p!==null){if(c==="]"&&a[i+1]==="("){const f=a.indexOf(")",i+2);if(f!==-1){r("link",p.text,a.slice(i+2,f)),p=null,i=f;continue}}p.text+=c;continue}if(m){c==="`"?(r("code",e),e="",m=!1):e+=c;continue}if(c==="`"){r(g(),e),e="",m=!0;continue}if(c==="*"&&a[i+1]==="*"){r(g(),e),e="",d=!d,i++;continue}if(c==="["){r(g(),e),e="",p={text:""};continue}e+=c}return p!==null?l?r("linkOpen",p.text+e):r("text","["+p.text+e):m?l?r("code",e):r("text","`"+e):d?l?r("bold",e):r("text","**"+e):r("text",e),t}function K(a,l){const t=[];for(const e of a.split(`
`)){const d=e.trimEnd();if(!d){t.push({kind:"gap",toks:[]});continue}d.startsWith("## ")?t.push({kind:"h",toks:E(d.slice(3),l)}):d.startsWith("- ")?t.push({kind:"li",toks:E(d.slice(2),l)}):t.push({kind:"p",toks:E(d,l)})}return t}const G=`
.srd-wrap { width: min(560px, calc(100% - 24px)); position: relative; }
.srd-scroll {
  height: 272px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
  padding: 14px 18px;
  scrollbar-width: thin;
}
.srd-body { font-size: 13px; line-height: 1.75; color: var(--text-1); }
.srd-body p { margin: 0 0 6px; }
.srd-body .srd-gap { height: 6px; }
.srd-h { font-weight: 650; font-size: 15px; margin: 2px 0 8px; }
.srd-li { padding-left: 16px; position: relative; }
.srd-li::before { content: "•"; position: absolute; left: 4px; opacity: 0.6; }
.srd-code {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  padding: 1px 5px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.srd-link { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.srd-link-open {
  color: var(--accent);
  border-bottom: 1px dashed color-mix(in srgb, var(--accent) 60%, transparent);
  cursor: default;
}
/* 光标:最后一个子元素 ::after + data 属性选字符(Streamdown --streamdown-caret 同型实现) */
.srd-body[data-live="true"] > :last-child::after {
  content: var(--srd-caret-char, "▋");
  margin-left: 2px;
  color: var(--accent);
  animation: srd-blink 0.9s steps(1) infinite;
}
.srd-body[data-caret="none"][data-live="true"] > :last-child::after { content: none; }
@keyframes srd-blink { 50% { opacity: 0; } }
/* 逐段入场(fadeIn / blurIn / slideUp):fill-mode both——批量到达先隐后显不闪烁 */
.srd-body[data-anim="fadeIn"] .srd-t { animation: srd-fade var(--srd-anim-ms, 150ms) ease both; }
.srd-body[data-anim="blurIn"] .srd-t { animation: srd-blur var(--srd-anim-ms, 150ms) ease both; }
.srd-body[data-anim="slideUp"] .srd-t { animation: srd-slide var(--srd-anim-ms, 150ms) ease both; }
@keyframes srd-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes srd-blur { from { opacity: 0; filter: blur(4px); } to { opacity: 1; filter: blur(0); } }
@keyframes srd-slide { from { opacity: 0; translate: 0 6px; } to { opacity: 1; translate: 0 0; } }
.srd-tools {
  position: absolute;
  right: -4px;
  top: -38px;
  display: flex;
  gap: 6px;
}
.srd-tools button {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
}
.srd-tools button:hover { border-color: var(--accent); color: var(--accent); }
.srd-tools button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.srd-jump {
  position: absolute;
  right: 10px;
  bottom: 44px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}
.srd-jump:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.srd-status { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
.srd-hint { position: absolute; left: 12px; bottom: 10px; margin: 0; font-size: 12px; color: var(--text-faint); }
@media (max-width: 640px) {
  .srd-tools { position: static; margin-bottom: 6px; justify-content: flex-end; }
}
@media (prefers-reduced-motion: reduce) {
  .srd-body[data-anim] .srd-t { animation: none; }
  .srd-body[data-live="true"] > :last-child::after { animation: none; }
}
`;function L({entryId:a,schema:l}){const t=H(a,l),[e,d]=n.useState(()=>t.get("caretType")),[m,p]=n.useState(()=>t.get("animStyle")),[r,g]=n.useState(()=>t.get("smoothDelayMs")),[i,c]=n.useState(()=>t.get("unclosedRepair")),[f,R]=n.useState(()=>t.get("lockBottom")),x=n.useMemo(()=>W($),[]),[b,I]=n.useState(0),[h,k]=n.useState("streaming"),[w,S]=n.useState(!0),j=n.useRef(null);n.useEffect(()=>t.subscribe(()=>{d(t.get("caretType")),p(t.get("animStyle")),g(t.get("smoothDelayMs")),c(t.get("unclosedRepair")),R(t.get("lockBottom"))}),[t]),n.useEffect(()=>{if(h!=="streaming")return;const s=window.setInterval(()=>I(y=>Math.min(y+1,x.length)),Math.max(1,r));return()=>window.clearInterval(s)},[h,r,x.length]),n.useEffect(()=>{h==="streaming"&&b>=x.length&&k("done")},[h,b,x.length]),n.useEffect(()=>{const s=j.current;!s||f!=="on"||!w||(s.scrollTop=s.scrollHeight)},[b,w,f]);const T=()=>{const s=j.current;s&&S(s.scrollTop+s.clientHeight>=s.scrollHeight-4)},z=s=>{s.deltaY<0&&S(!1)},M=()=>{I(0),S(!0),k("streaming")},A=n.useMemo(()=>K(x.slice(0,b).join(""),i==="on"),[x,b,i]),N=h==="streaming",D=N?`生成中 Generating… ${b}/${x.length} tokens`:h==="paused"?"已停止 Stopped(可继续/重播)Stopped — resume or replay":`已完成 Done · ${x.length} tokens`;return o.jsxs(B,{entryId:a,schema:l,children:[o.jsxs("div",{className:"srd-wrap",children:[o.jsxs("div",{className:"srd-tools",role:"group","aria-label":"流控制 Stream controls",children:[o.jsx("button",{type:"button",onClick:M,children:"重播 Replay"}),N?o.jsx("button",{type:"button",onClick:()=>k("paused"),children:"停止 Stop"}):o.jsx("button",{type:"button",onClick:()=>{k("streaming")},disabled:h==="done",children:"继续 Resume"})]}),o.jsx("div",{ref:j,className:"srd-scroll",onScroll:T,onWheel:z,children:o.jsx("div",{className:"srd-body",role:"log","aria-label":"AI 流式回答 AI streaming answer","data-live":N?"true":"false","data-caret":e,"data-anim":m==="off"?void 0:m,style:{"--srd-caret-char":e==="circle"?'"●"':'"▋"'},children:A.map((s,y)=>s.kind==="gap"?o.jsx("div",{className:"srd-gap","aria-hidden":"true"},y):o.jsx("p",{className:s.kind==="h"?"srd-h":s.kind==="li"?"srd-li":"",children:s.toks.map((u,C)=>{const v=`${y}-${C}`;return u.kind==="bold"?o.jsx("strong",{className:"srd-t",children:u.text},v):u.kind==="code"?o.jsx("code",{className:"srd-code srd-t",children:u.text},v):u.kind==="link"?o.jsx("span",{className:"srd-link srd-t",title:u.href,children:u.text},v):u.kind==="linkOpen"?o.jsx("span",{className:"srd-link-open srd-t",children:u.text},v):o.jsx("span",{className:"srd-t",children:u.text},v)})},y))})}),!w&&o.jsx("button",{type:"button",className:"srd-jump",onClick:()=>{const s=j.current;s&&(s.scrollTop=s.scrollHeight),S(!0)},children:"↓ 回到底部 Jump to bottom"}),o.jsx("p",{className:"srd-status","aria-live":"polite",children:D})]}),o.jsx("style",{children:G}),o.jsx("p",{className:"srd-hint",children:"上滚即打断锁底 Scroll up to interrupt · 流中注意未闭合语法先按闭合态渲染 Watch unclosed syntax heal mid-stream"})]})}export{L as default};
