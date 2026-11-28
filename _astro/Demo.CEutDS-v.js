import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DLkBFFtG.js";import{g as I}from"./color.DuEPkvq5.js";import{D as q}from"./DemoStage.vW1CgYCd.js";const T={"input-streaming":{label:"Pending",zh:"等待",glyph:"○",tone:"pending"},"input-available":{label:"Running",zh:"运行",glyph:"◔",tone:"running"},"output-available":{label:"Completed",zh:"完成",glyph:"✔",tone:"done"},"output-error":{label:"Error",zh:"错误",glyph:"✕",tone:"error"}},V={weather:"get_weather",unknown:"render_chart",error:"get_weather"},k={weather:'{ "city": "上海 Shanghai", "unit": "celsius" }',unknown:'{ "metric": "weekly_visits", "range": 30 }',error:'{ "city": "上海 Shanghai", "unit": "celsius" }'},_='{"component":"WeatherCard","props":{"city":"上海 Shanghai","tempC":22,"cond":"多云 Cloudy","hi":26,"lo":18}}',A='{"component":"SparklineCard","props":{"metric":"weekly_visits","points":"[3,5,4,8,7,9]"}}',X="ToolExecutionError: upstream timeout after 5000 ms",Y={WeatherCard:!0},Q=`
.gui-stage { width: min(560px, calc(100% - 24px)); position: relative; }
.gui-scenarios { display: flex; gap: 6px; margin-bottom: 8px; justify-content: flex-end; }
.gui-scenarios button, .gui-run {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-elev);
  color: var(--text-1);
  font: inherit;
  font-size: 12px;
  padding: 4px 12px;
  cursor: pointer;
}
.gui-scenarios button[aria-pressed="true"] { background: color-mix(in srgb, var(--accent) 12%, transparent); border-color: var(--accent); color: var(--accent); }
.gui-scenarios button:focus-visible, .gui-run:focus-visible, .gui-head:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.gui-card { border: 1px solid var(--border); border-radius: 12px; background: var(--bg-elev); overflow: hidden; }
.gui-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 0;
  background: transparent;
  font: inherit;
  padding: 10px 14px;
  cursor: pointer;
  color: var(--text-1);
}
.gui-name { font-family: var(--font-mono, ui-monospace, monospace); font-size: 13px; font-weight: 600; }
.gui-badge {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-faint);
}
.gui-badge[data-tone="running"] { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 45%, transparent); }
.gui-badge[data-tone="done"] { color: #52c41a; border-color: color-mix(in srgb, #52c41a 45%, transparent); }
.gui-badge[data-tone="error"] { color: #ff4d4f; border-color: color-mix(in srgb, #ff4d4f 45%, transparent); }
.gui-badge[data-tone="pending"] { color: var(--text-faint); }
.gui-badge[data-pulse="true"] { animation: gui-pulse 1.2s ease-in-out infinite; }
@keyframes gui-pulse { 50% { opacity: 0.45; } }
.gui-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.25s ease; }
.gui-body[data-open="true"] { grid-template-rows: 1fr; }
.gui-body > div { overflow: hidden; }
.gui-inner { padding: 4px 14px 14px; border-top: 1px solid var(--border); }
.gui-label { font-size: 11px; letter-spacing: 0.04em; color: var(--text-faint); margin: 10px 0 4px; }
.gui-code {
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--text-1) 5%, transparent);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 2.2em;
}
.gui-caret { display: inline-block; width: 7px; height: 13px; translate: 0 2px; background: var(--accent); animation: gui-blink 0.9s steps(1) infinite; }
@keyframes gui-blink { 50% { opacity: 0; } }
/* 渐进填充的天气卡(json-spec 模式的映射产物) */
.gui-result { margin-top: 10px; }
.gui-wx {
  display: grid;
  gap: 2px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
}
.gui-wx-city { font-size: 13px; font-weight: 600; color: var(--text-1); }
.gui-wx-temp { font-size: 28px; font-weight: 650; line-height: 1.2; color: var(--text-1); font-variant-numeric: tabular-nums; }
.gui-wx-cond { font-size: 12px; color: var(--text-faint); }
.gui-wx-hilo { font-size: 12px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.gui-skeleton { display: grid; gap: 8px; padding: 12px 14px; border: 1px dashed var(--border); border-radius: 10px; }
.gui-sk {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--text-1) 6%, transparent) 35%, color-mix(in srgb, var(--text-1) 14%, transparent) 50%, color-mix(in srgb, var(--text-1) 6%, transparent) 65%);
  background-size: 200% 100%;
  animation: gui-sweep 1.6s linear infinite;
}
@keyframes gui-sweep { to { background-position: -200% 0; } }
.gui-fallback { padding: 10px 12px; border: 1px dashed #ff4d4f; border-radius: 10px; }
.gui-fallback p { margin: 0 0 6px; font-size: 12px; color: #ff4d4f; }
.gui-error { padding: 10px 12px; border: 1px solid color-mix(in srgb, #ff4d4f 40%, transparent); border-radius: 10px; font-size: 12px; color: #ff4d4f; }
.gui-status { margin: 8px 2px 0; font-size: 12px; color: var(--text-faint); }
.gui-hint { position: absolute; left: 12px; bottom: 10px; margin: 0; font-size: 12px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .gui-badge[data-pulse="true"], .gui-caret, .gui-sk { animation: none; }
  .gui-body { transition: none; }
}
`,L=28;function oe({entryId:t,schema:l}){const n=I(t,l),[o,c]=i.useState(()=>n.get("genuiMode")),[g,O]=i.useState(()=>n.get("pendingBadge")),[N,M]=i.useState(()=>n.get("collapsePolicy")),[b,B]=i.useState(()=>n.get("allowlist")),[S,D]=i.useState(()=>n.get("streamProps")),[J,$]=i.useState(()=>n.get("resultRender")),[a,F]=i.useState("weather"),[r,f]=i.useState("idle"),[w,v]=i.useState(""),[C,y]=i.useState(!0),u=i.useRef([]);i.useEffect(()=>n.subscribe(()=>{c(n.get("genuiMode")),O(n.get("pendingBadge")),M(n.get("collapsePolicy")),B(n.get("allowlist")),D(n.get("streamProps")),$(n.get("resultRender"))}),[n]);const E=()=>{for(const s of u.current)window.clearTimeout(s);u.current=[]};i.useEffect(()=>()=>E(),[]);const G=o==="json-spec"?a==="unknown"?A:_:k[a],x=(s=a)=>{E(),F(s),v(""),y(!1),f("input-streaming");const m=o==="json-spec"?s==="unknown"?A:_:k[s];let p;if(S==="on"){for(let h=1;h<=m.length;h++)u.current.push(window.setTimeout(()=>v(m.slice(0,h)),h*L));p=m.length*L+150}else p=250,u.current.push(window.setTimeout(()=>v(m),p));u.current.push(window.setTimeout(()=>f("input-available"),p)),u.current.push(window.setTimeout(()=>f(s==="error"?"output-error":"output-available"),p+800))};i.useEffect(()=>{if((r==="output-available"||r==="output-error")&&N==="auto"){const s=window.setTimeout(()=>y(!0),1e3);return()=>window.clearTimeout(s)}},[r,N]);const R=r==="output-available"||r==="output-error",j=T[r==="idle"?"input-streaming":r]??T["input-streaming"],K=r==="input-streaming"?g:j.label,U=r==="input-streaming"&&S==="on",z=o==="json-spec"?Z(w):null,d=a!=="unknown"?{city:"上海 Shanghai",tempC:22,cond:"多云 Cloudy",hi:26,lo:18}:null,P=a==="unknown",W=P&&b==="on"&&R,H=r==="idle"?"待运行 Idle — 选择场景并运行 Pick a scenario and run":r==="input-streaming"?`工具入参/spec 流入中 Streaming input… ${w.length}/${G.length}`:r==="input-available"?"参数就绪,等待执行 Input ready — awaiting output":r==="output-error"?"输出错误 output-error(errorText 优先显示)":P&&b==="on"?"完成 Completed — 组件不在白名单,降级渲染 JSON 卡":"完成 Completed";return e.jsxs(q,{entryId:t,schema:l,children:[e.jsxs("div",{className:"gui-stage",children:[e.jsxs("div",{className:"gui-scenarios",role:"group","aria-label":"场景 Scenario",children:[e.jsx("button",{type:"button","aria-pressed":a==="weather",onClick:()=>x("weather"),children:"天气 weather"}),e.jsx("button",{type:"button","aria-pressed":a==="unknown",onClick:()=>x("unknown"),children:"未知组件 unknown"}),e.jsx("button",{type:"button","aria-pressed":a==="error",onClick:()=>x("error"),children:"错误 error"}),e.jsx("button",{type:"button",className:"gui-run",onClick:()=>x(),children:"运行 Run"})]}),e.jsxs("div",{className:"gui-card",children:[e.jsxs("button",{type:"button",className:"gui-head","aria-expanded":!C,"aria-controls":"gui-body",onClick:()=>y(s=>!s),children:[e.jsx("span",{className:"gui-name",children:o==="json-spec"?"generative_ui":V[a]}),e.jsxs("span",{className:"gui-badge","data-tone":j.tone,"data-pulse":r==="input-streaming"||r==="input-available"?"true":void 0,children:[e.jsx("span",{"aria-hidden":"true",children:j.glyph}),K]})]}),e.jsx("div",{id:"gui-body",className:"gui-body","data-open":C?"false":"true",children:e.jsx("div",{children:e.jsxs("div",{className:"gui-inner",children:[e.jsx("p",{className:"gui-label",children:o==="json-spec"?"Spec(流中渐进解析 rendered as fields complete)":"Parameters"}),e.jsxs("pre",{className:"gui-code",children:[w,U&&e.jsx("span",{className:"gui-caret","aria-hidden":"true"})]}),e.jsx("div",{className:"gui-result","aria-live":"polite",children:o==="json-spec"?z?ee(z,b,R):e.jsxs("div",{className:"gui-skeleton","aria-hidden":"true",children:[e.jsx("span",{className:"gui-sk",style:{width:"55%"}}),e.jsx("span",{className:"gui-sk",style:{width:"80%"}}),e.jsx("span",{className:"gui-sk",style:{width:"40%"}})]}):r==="output-error"?e.jsx("div",{className:"gui-error",role:"alert",children:X}):W?e.jsxs("div",{className:"gui-fallback",children:[e.jsx("p",{children:'组件 "SparklineCard" 不在白名单,降级渲染 JSON 卡 Component not in allowlist — JSON fallback'}),e.jsx("pre",{className:"gui-code",children:k[a]})]}):r==="output-available"?J==="raw-json"?e.jsx("pre",{className:"gui-code",children:JSON.stringify({city:"上海 Shanghai",tempC:22,condition:"多云 Cloudy",hi:26,lo:18},null,2)}):d&&e.jsxs("div",{className:"gui-wx",children:[e.jsx("span",{className:"gui-wx-city",children:d.city}),e.jsxs("span",{className:"gui-wx-temp",children:[d.tempC,"°C"]}),e.jsx("span",{className:"gui-wx-cond",children:d.cond}),e.jsxs("span",{className:"gui-wx-hilo",children:["最高 H ",d.hi,"° · 最低 L ",d.lo,"°"]})]}):null})]})})})]}),e.jsx("p",{className:"gui-status","aria-live":"polite",children:H})]}),e.jsx("style",{children:Q}),e.jsx("p",{className:"gui-hint",children:"徽章词表取 Chat SDK tool.tsx Badges follow the Chat SDK tool.tsx vocabulary · 白名单是唯一渲染边界 The allowlist is the only render boundary"})]})}function Z(t){if(!t)return null;const l=t.match(/"component"\s*:\s*"([^"]+)"/),n={},o=/"(\w+)"\s*:\s*"([^"]*)"|(\b\w+)\s*:\s*(-?\d+(?:\.\d+)?)/g;for(const c of t.matchAll(o)){const g=c[1]??c[3];g!=="component"&&(n[g]=c[2]??c[4])}return{component:l?l[1]:null,props:n}}function ee(t,l,n){const o=t.component!==null&&Y[t.component]===!0;return t.component!==null&&!o&&l==="on"?e.jsxs("div",{className:"gui-fallback",children:[e.jsxs("p",{children:['组件 "',t.component,'" 不在白名单,降级渲染 JSON 卡 Component not in allowlist — JSON fallback']}),e.jsx("pre",{className:"gui-code",children:'{"component":"'+t.component+'", …}'})]}):t.component!==null&&!o&&l==="off"&&n?e.jsxs("div",{className:"gui-fallback",children:[e.jsx("p",{children:"白名单已关闭:未注册组件被直接渲染(演示风险)Allowlist off: unregistered component mounted as-is (risk demo)"}),e.jsx("pre",{className:"gui-code",children:"<SparklineCard … /> ← 模型请求的组件 model-requested"})]}):e.jsxs("div",{className:"gui-wx",children:[e.jsx("span",{className:"gui-wx-city",children:t.props.city??"…"}),e.jsx("span",{className:"gui-wx-temp",children:t.props.tempC?`${t.props.tempC}°C`:"…"}),e.jsx("span",{className:"gui-wx-cond",children:t.props.cond??"…"}),e.jsx("span",{className:"gui-wx-hilo",children:t.props.hi?`最高 H ${t.props.hi}° · 最低 L ${t.props.lo??"?"}°`:"…"})]})}export{oe as default};
