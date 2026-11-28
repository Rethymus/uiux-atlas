import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as m}from"./index.DLkBFFtG.js";import{g as D}from"./color.DuEPkvq5.js";import{D as L}from"./DemoStage.vW1CgYCd.js";const v=["3月","4月","5月","6月","7月","8月"],n=[42,58,51,67,74,69],W="#0072B2",h="千次",N=s=>Math.ceil(s/10)*10,k=N(Math.max(...n)),A=[0,20,40,60,80],z=.09,I=560,O=330,a={top:20,right:16,bottom:40,left:46},j=I-a.left-a.right,S=O-a.top-a.bottom,R=5,_=`
.ac-stage { position: absolute; inset: 0; padding: 16px 18px 10px; min-height: 0; }
.ac-fig { display: flex; gap: 14px; height: 100%; min-height: 0; }
.ac-plot { flex: 1.3; min-width: 0; min-height: 0; display: flex; }
.ac-plot svg { flex: 1; min-height: 0; width: 100%; color: var(--text); }
/* figcaption = 长描述载体(WAI 首选:对所有人可见) */
.ac-fig figcaption {
  flex: 1; min-width: 0; min-height: 0;
  display: flex; flex-direction: column; gap: 8px;
  font-size: 12px; color: var(--text-dim);
}
.ac-tabs { display: flex; gap: 4px; }
.ac-tabs [role="tab"] {
  border: 1px solid var(--border); border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer;
  color: var(--text-dim); background: var(--surface);
}
.ac-tabs [role="tab"][aria-selected="true"] { color: var(--text); border-color: var(--text-dim); font-weight: 600; }
.ac-panel {
  flex: 1; min-height: 0; overflow: auto;
  border: 1px solid var(--border); border-radius: 10px;
  background: var(--surface); padding: 10px 12px;
  font-size: 12px; color: var(--text-dim); line-height: 1.6;
}
.ac-panel table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
.ac-panel caption { text-align: left; font-weight: 600; color: var(--text); padding-bottom: 4px; }
.ac-panel th, .ac-panel td { border-top: 1px solid var(--border); padding: 3px 6px; text-align: right; }
.ac-panel th:first-child, .ac-panel td:first-child { text-align: left; }
.ac-actions { display: flex; gap: 6px; }
.ac-actions button {
  border: 1px solid var(--border); border-radius: 999px;
  padding: 5px 12px; font-size: 12px; cursor: pointer;
  color: var(--text); background: var(--surface);
}
.ac-chips { display: flex; flex-direction: column; gap: 4px; font-size: 11.5px; color: var(--text-dim); }
.ac-chips b { color: var(--text); font-weight: 600; }
.ac-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 640px) {
  .ac-fig { flex-direction: column; }
}
`;function K(s,f){try{if(!s.current){const c=window.AudioContext??window.webkitAudioContext;if(!c)throw new Error("no AudioContext");s.current=new c}const o=s.current,b=o.currentTime+.05;n.forEach((c,y)=>{const d=o.createOscillator(),p=o.createGain();d.type="sine",d.frequency.value=Math.round(220+c/k*660);const x=b+y*.22;p.gain.setValueAtTime(1e-4,x),p.gain.exponentialRampToValueAtTime(.05,x+.03),p.gain.exponentialRampToValueAtTime(1e-4,x+.2),d.connect(p).connect(o.destination),d.start(x),d.stop(x+.22)}),f(`sonification 播放中:${n.length} 个音,音高随访问量上升`)}catch{f("当前环境不支持 WebAudio,sonification 不可用")}}function U({entryId:s,schema:f}){const o=D(s,f),b=()=>({decal:o.get("decal"),directLabel:o.get("directLabel"),longDesc:o.get("longDesc")}),[c,y]=m.useState(b),[d,p]=m.useState(""),x=m.useRef(null);m.useEffect(()=>o.subscribe(()=>{y(b())}),[o]);const T=c.decal==="on",$=c.directLabel==="on",l=c.longDesc==="table",g=j/n.length*.56,u=e=>a.left+j*(e+.5)/n.length,i=e=>a.top+S*(1-e/k),C=`趋势:3 月 ${n[0]} ${h}起步,4 月升至 ${n[1]},5 月小幅回落至 ${n[2]},6-7 月持续攀升并于 7 月达峰值 ${n[4]},8 月回落至 ${n[5]}——整体上升约 64%。比例尺 0-${k} ${h};颜色顺序仅 1 项(单系列,Okabe-Ito 蓝 #0072B2);相对高度:最高柱为 7 月(${n[4]}),最低柱为 3 月(${n[0]})。`,w=e=>{o.set("longDesc",e)},E=e=>{(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(e.preventDefault(),w(l?"text":"table"))};return t.jsxs(L,{entryId:s,schema:f,children:[t.jsxs("div",{className:"ac-stage",children:[t.jsxs("figure",{className:"ac-fig",role:"group","aria-label":"图表与可见长描述组合(WAI 复杂图像模式)",children:[t.jsx("div",{className:"ac-plot",children:t.jsxs("svg",{role:"img","aria-label":`柱状图:示例站点 2025 年 3-8 月访问量(${h}),总体上升,详见长描述`,children:[t.jsx("title",{children:"示例站点访问量柱状图"}),t.jsx("desc",{children:"3 月 42 千次起步,7 月达峰值 74 千次,8 月 69 千次,整体上升;柱高即值,详见 figcaption 长描述。"}),t.jsx("defs",{children:t.jsx("pattern",{id:"ac-decal",width:"8",height:"8",patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)",children:t.jsx("line",{x1:"0",y1:"0",x2:"0",y2:"8",stroke:"rgba(255,255,255,0.8)",strokeWidth:"2.5"})})}),A.map(e=>t.jsx("line",{x1:a.left,x2:a.left+j,y1:i(e),y2:i(e),stroke:"currentColor",style:{opacity:z}},e)),t.jsxs("g",{stroke:"#6E7079",strokeWidth:"1",children:[t.jsx("line",{x1:a.left,x2:a.left,y1:a.top,y2:a.top+S}),t.jsx("line",{x1:a.left,x2:a.left+j,y1:i(0),y2:i(0)})]}),A.map(e=>t.jsx("line",{x1:a.left-R,x2:a.left,y1:i(e),y2:i(e),stroke:"#6E7079",strokeWidth:"1"},`tk${e}`)),A.map(e=>t.jsx("text",{x:a.left-8,y:i(e)+4,textAnchor:"end",fontSize:"12",fill:"var(--text-dim)",children:e},`lb${e}`)),v.map((e,r)=>t.jsx("text",{x:u(r),y:i(0)+18,textAnchor:"middle",fontSize:"12",fill:"var(--text-dim)",children:e},e)),n.map((e,r)=>t.jsxs("g",{children:[t.jsx("rect",{x:u(r)-g/2,y:i(e),width:g,height:i(0)-i(e),fill:W,rx:"2",children:t.jsx("title",{children:`${v[r]} · ${e} ${h}`})}),T&&t.jsx("rect",{x:u(r)-g/2,y:i(e),width:g,height:i(0)-i(e),fill:"url(#ac-decal)",rx:"2","aria-hidden":"true"}),$&&t.jsx("text",{x:u(r),y:i(e)-6,textAnchor:"middle",fontSize:"12",fontWeight:"600",fill:"var(--text)",children:e})]},r))]})}),t.jsxs("figcaption",{children:[t.jsxs("div",{className:"ac-tabs",role:"tablist","aria-label":"长描述载体 Long description carrier",children:[t.jsx("button",{type:"button",role:"tab",id:"ac-tab-table","aria-selected":l,"aria-controls":"ac-panel",tabIndex:l?0:-1,onKeyDown:E,onClick:()=>w("table"),children:"数据表 Table"}),t.jsx("button",{type:"button",role:"tab",id:"ac-tab-text","aria-selected":!l,"aria-controls":"ac-panel",tabIndex:l?-1:0,onKeyDown:E,onClick:()=>w("text"),children:"文字描述 Text"})]}),t.jsx("div",{id:"ac-panel",role:"tabpanel","aria-labelledby":l?"ac-tab-table":"ac-tab-text",className:"ac-panel",children:l?t.jsxs("table",{children:[t.jsxs("caption",{children:["示例站点 2025 年 3-8 月访问量(",h,")"]}),t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{scope:"col",children:"月份"}),t.jsxs("th",{scope:"col",children:["访问量(",h,")"]})]})}),t.jsx("tbody",{children:v.map((e,r)=>t.jsxs("tr",{children:[t.jsx("th",{scope:"row",children:e}),t.jsx("td",{children:n[r]})]},e))})]}):t.jsx("p",{children:C})}),t.jsx("div",{className:"ac-actions",children:t.jsx("button",{type:"button",onClick:()=>K(x,p),children:"播放数据旋律 Sonify"})}),t.jsxs("div",{className:"ac-chips",children:[t.jsxs("span",{children:["长描述载体 ",t.jsx("b",{children:l?"figcaption 数据表(对所有用户可见)":"figcaption 文字描述"}),";aria-describedby 仅适合纯文本(WAI 原文)"]}),t.jsxs("span",{children:["贴花 ",t.jsx("b",{children:T?"on(色相之外的第二视觉编码)":"off(ECharts aria.decal.show 官方默认 false)"})," · 直标 ",t.jsx("b",{children:$?"on(jfly 原则)":"off(仅轴刻度)"})]}),t.jsx("span",{children:"sonification 为自研示意(数值→音高 220-880Hz);产品级实现本轮调研未核验"})]})]})]}),t.jsx("span",{className:"ac-sr","aria-live":"polite",children:d})]}),t.jsx("style",{children:_})]})}export{U as default};
