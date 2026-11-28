import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.DLkBFFtG.js";import{g as O}from"./color.DuEPkvq5.js";import{D as T}from"./DemoStage.vW1CgYCd.js";const $=[{id:"normal",label:"正常回答 Normal"},{id:"refusal",label:"拒答 Refusal"},{id:"error",label:"出错 Error"}],s=[{title:"Streamdown Docs — Security",url:"https://streamdown.ai/docs/security",quote:"out-of-bounds links rewrite to the default origin and render as [blocked]"},{title:"Anthropic — Citations API",url:"https://docs.claude.com/en/docs/build-with-claude/citations",quote:"cited_text quotes the exact supporting passage and is not counted as output tokens"}],_="抱歉,我无法协助完成该请求。Sorry, I can't help with that request.",b="这个方案的第一步是先解除锁底滚动,然后再将 token 节流上调到 50ms,接下来我们可",B="两个官方依据支持这个结论:块级 memo 让已完成段落稳定",Y=",而锁底滚动必须可在当帧被打断(NN/g)。",G=`
.ans-wrap { width: min(560px, calc(100% - 24px)); position: relative; }
.ans-tabs { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }
.ans-tab {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
}
.ans-tab[aria-pressed="true"] { border-color: var(--accent); color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.ans-tab:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ans-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elev);
  padding: 14px 16px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-1);
}
.ans-card.refusal { border-left: 3px solid color-mix(in srgb, var(--accent) 70%, var(--text-1)); }
.ans-badge {
  display: inline-block;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--text-1);
  margin-bottom: 8px;
}
/* 流中部分输出:降权示灰 + 不完整标注(官方:视为不完整应丢弃) */
.ans-partial { opacity: 0.45; }
.ans-partial[data-keep="false"] { text-decoration: line-through; }
.ans-incomplete { display: block; margin-top: 2px; font-size: 11px; color: var(--text-faint); }
.ans-error-text { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12.5px; }
.ans-actions { display: flex; gap: 8px; margin-top: 10px; }
.ans-actions button {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 14px;
  cursor: pointer;
}
.ans-actions button:hover { border-color: var(--accent); color: var(--accent); }
.ans-actions button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* 引用角标:数字编号,不只靠颜色承载 */
.ans-ref {
  border: 0;
  background: none;
  padding: 0 1px;
  font: inherit;
  font-size: 11px;
  color: var(--accent);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.ans-ref:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; border-radius: 3px; }
/* 悬停/展开来源卡(角标档):含多来源轮播 prev/next + 索引 */
.ans-hovercard {
  margin: 8px 0 0;
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: var(--text-dim, var(--text-1));
}
.ans-hovercard .t { color: var(--text-1); font-weight: 600; }
.ans-hovercard .q { display: block; margin-top: 2px; font-size: 11.5px; color: var(--text-faint); }
.ans-nav { display: inline-flex; gap: 6px; margin-top: 6px; }
.ans-nav button {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 11px;
  padding: 2px 8px;
  cursor: pointer;
}
.ans-nav button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.ans-nav .idx { font-family: var(--font-mono, ui-monospace, monospace); font-size: 11px; color: var(--text-faint); align-self: center; }
/* 来源卡(折叠):details/summary 原生语义,键盘可达 */
.ans-sources { margin: 10px 0 0; }
.ans-sources summary {
  cursor: pointer;
  font-size: 12.5px;
  color: var(--text-dim, var(--text-1));
}
.ans-sources summary:hover { color: var(--accent); }
.ans-sources summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
.ans-sources ul { margin: 6px 0 0; padding-left: 18px; font-size: 12px; }
.ans-sources a { color: var(--accent); text-underline-offset: 2px; }
.ans-footnote { margin: 8px 0 0; padding-left: 18px; font-size: 11.5px; color: var(--text-faint); }
.ans-footnote a { color: var(--accent); }
/* 免责声明:官方无规定(未证实)——demo 提供尾注/来源下方/不展示三档 */
.ans-disclaimer { margin: 10px 0 0; font-size: 11px; color: var(--text-faint); }
/* 链接安全弹窗:跳转前展示完整 URL(Streamdown rehype-harden 语义) */
.ans-modal {
  margin: 10px 0 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  background: var(--bg);
}
.ans-modal .url {
  display: block;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px;
  color: var(--text-dim, var(--text-1));
  overflow-wrap: anywhere;
  margin: 4px 0 6px;
}
.ans-status { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
.ans-hint { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
`;function Q({entryId:N,schema:S}){const r=O(N,S),[o,M]=t.useState(()=>r.get("citationMode")),[g,A]=t.useState(()=>r.get("carouselEnabled")),[c,L]=t.useState(()=>r.get("refusalRetry")),[m,U]=t.useState(()=>r.get("midStreamRefusalPolicy")),[q,D]=t.useState(()=>r.get("linkSafetyModal")),[v,F]=t.useState(()=>r.get("disclaimerPosition")),[n,I]=t.useState("normal"),[l,j]=t.useState(0),[d,w]=t.useState(!1),[p,y]=t.useState(null),[R,C]=t.useState(0),[z,u]=t.useState(null),f=t.useRef(void 0);t.useEffect(()=>r.subscribe(()=>{M(r.get("citationMode")),A(r.get("carouselEnabled")),L(r.get("refusalRetry")),U(r.get("midStreamRefusalPolicy")),D(r.get("linkSafetyModal")),F(r.get("disclaimerPosition"))}),[r]);const E=()=>{f.current!==void 0&&window.clearTimeout(f.current),j(0),w(!1),y(null),u(null)};t.useEffect(()=>{if(E(),n==="refusal")return l===0?f.current=window.setTimeout(()=>j(4),300):l<b.length&&(f.current=window.setTimeout(()=>{j(a=>Math.min(a+4,b.length))},40)),E},[n,l]),t.useEffect(()=>{n==="refusal"&&l>=b.length&&!d&&w(!0)},[n,l,d]);const i=g==="on"?s:s.slice(0,1),x=i[R%i.length],P="本段内容由 AI 生成,引用与结论请以来源原文为准。",h=(a,k)=>{a.preventDefault(),u(q==="on"?k:null)};return e.jsxs(T,{entryId:N,schema:S,children:[e.jsxs("div",{className:"ans-wrap",children:[e.jsx("div",{className:"ans-tabs",role:"group","aria-label":"场景选择 Scenario",children:$.map(a=>e.jsx("button",{type:"button",className:"ans-tab","aria-pressed":n===a.id,onClick:()=>I(a.id),children:a.label},a.id))}),n==="normal"&&e.jsxs("article",{className:"ans-card",role:"status",children:[e.jsxs("p",{style:{margin:0},children:[B,o==="footnote"?e.jsx("sup",{id:"ans-fn-1",children:"[1]"}):e.jsx("button",{type:"button",className:"ans-ref","aria-expanded":p===0,onClick:()=>y(p===0?null:0),children:"[1]"}),Y,o!=="sources-card"&&e.jsxs(e.Fragment,{children:[" ","四闸之外链接一律重写",e.jsx("button",{type:"button",className:"ans-ref","aria-expanded":p===1,onClick:()=>y(p===1?null:1),children:"[2]"}),"。"]})]}),o==="inline-hover"&&p!==null&&e.jsxs("div",{className:"ans-hovercard",children:[e.jsx("span",{className:"t",children:x.title}),e.jsx("a",{href:x.url,onClick:a=>h(a,x.url),children:x.url}),e.jsxs("span",{className:"q",children:["cited_text:",x.quote]}),g==="on"&&i.length>1&&e.jsxs("span",{className:"ans-nav",children:[e.jsx("button",{type:"button","aria-label":"上一来源 Previous source",onClick:()=>C(a=>(a-1+i.length)%i.length),children:"‹"}),e.jsxs("span",{className:"idx",children:[R%i.length+1,"/",i.length]}),e.jsx("button",{type:"button","aria-label":"下一来源 Next source",onClick:()=>C(a=>(a+1)%i.length),children:"›"})]})]}),o==="sources-card"&&e.jsxs("details",{className:"ans-sources",children:[e.jsxs("summary",{children:["Used ",s.length," sources"]}),e.jsx("ul",{children:s.map(a=>e.jsx("li",{children:e.jsx("a",{href:a.url,onClick:k=>h(k,a.url),children:a.title})},a.url))})]}),o==="footnote"&&e.jsxs("ol",{className:"ans-footnote",children:[e.jsxs("li",{id:"ans-fn-1-ref",children:[e.jsx("a",{href:s[0].url,onClick:a=>h(a,s[0].url),children:s[0].title})," — ",s[0].quote]}),e.jsxs("li",{children:[e.jsx("a",{href:s[1].url,onClick:a=>h(a,s[1].url),children:s[1].title})," — ",s[1].quote]})]}),v==="message-footer"&&e.jsx("p",{className:"ans-disclaimer",children:P}),v==="sources-below"&&o==="sources-card"&&e.jsx("p",{className:"ans-disclaimer",children:P}),z&&e.jsxs("div",{className:"ans-modal",role:"alertdialog","aria-label":"链接安全确认 Link safety",children:["即将离开站内,完整 URL:Full URL before navigation:",e.jsx("span",{className:"url",children:z}),e.jsxs("div",{className:"ans-actions",children:[e.jsx("button",{type:"button",onClick:()=>u(null),children:"继续访问 Continue"}),e.jsx("button",{type:"button",onClick:()=>u(null),children:"取消 Cancel"})]})]})]}),n==="refusal"&&e.jsxs("article",{className:"ans-card refusal",role:"status",children:[e.jsx("span",{className:"ans-badge",children:"stop_reason: refusal · cyber"}),l>0&&e.jsxs("div",{className:"ans-partial","data-keep":m==="keep-partial"?"true":"false",children:[b.slice(0,l),d&&m==="discard-partial"&&e.jsx("span",{className:"ans-incomplete",children:"部分输出已丢弃(官方:视为不完整)Partial discarded — officially incomplete"}),d&&m==="keep-partial"&&e.jsx("span",{className:"ans-incomplete",children:"保留部分输出(反面教材)Partial kept — the anti-pattern"})]}),d&&e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{margin:"8px 0 0"},children:_}),e.jsx("p",{className:"ans-incomplete",children:"explanation 原文展示、不解析 displayed verbatim, never parsed"}),e.jsxs("div",{className:"ans-actions",children:[c==="regenerate"&&e.jsx("button",{type:"button",children:"重新生成 Retry (regenerate)"}),c==="fallback"&&e.jsx("button",{type:"button",children:"备用模型重试 Fallback model"})]}),c==="none"&&e.jsx("p",{className:"ans-incomplete",children:"无重试出口(反面教材)No retry exit — the anti-pattern"})]})]}),n==="error"&&e.jsxs("article",{className:"ans-card",role:"status",children:[e.jsx("span",{className:"ans-badge",children:"error"}),e.jsx("p",{className:"ans-error-text",style:{margin:"4px 0 0"},children:"Something went wrong."}),e.jsx("p",{className:"ans-incomplete",children:"通用文案防服务端信息泄漏(官方建议)Generic text prevents server-detail leaks (official advice)"}),e.jsx("div",{className:"ans-actions",children:c!=="none"&&e.jsx("button",{type:"button",children:"重试 Retry (regenerate)"})})]}),e.jsx("p",{className:"ans-status","aria-live":"polite",children:n==="normal"?`引用档 citationMode: ${o}${o==="inline-hover"?` · 轮播 carousel: ${g}`:""} · 免责位 disclaimer: ${v}`:n==="refusal"?d?`流中拒答已处理 · 策略 policy: ${m} · 出口 exit: ${c}`:"回答流式中,refusal 信号即将到达 Streaming — refusal incoming":`错误态 error · 出口 exit: ${c}`}),e.jsx("p",{className:"ans-hint",children:"正常档点角标看来源卡;拒答档看部分输出的丢弃与 explanation 原文;链接点开先见完整 URL · Normal: tap a badge for the source card; refusal: watch the partial discard and the verbatim explanation; links reveal the full URL first"})]}),e.jsx("style",{children:G})]})}export{Q as default};
