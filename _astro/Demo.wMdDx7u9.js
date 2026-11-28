import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.DLkBFFtG.js";import{g as A}from"./color.DuEPkvq5.js";import{D as f}from"./DemoStage.vW1CgYCd.js";const u=[{sc:"1.1.1",level:"A",principle:"P",zh:'非文本内容:所有图片有等价替代文本,装饰图 alt=""',en:'Non-text content: every image has equivalent alt text; decorative images get alt=""'},{sc:"1.3.1",level:"A",principle:"P",zh:"信息与关系:标题/列表/表格语义正确,label 关联输入",en:"Info and relationships: headings/lists/tables semantic, labels associated with inputs"},{sc:"1.4.1",level:"A",principle:"P",zh:"颜色的使用:不只用颜色传达信息(链接加下划线)",en:"Use of color: never color alone (links get underlines)"},{sc:"1.4.3",level:"AA",principle:"P",zh:"对比度(最低):文本 ≥ 4.5:1;大字号 ≥ 3:1",en:"Contrast (minimum): text ≥ 4.5:1; large text ≥ 3:1"},{sc:"1.4.10",level:"AA",principle:"P",zh:"重排:320px 宽无水平滚动(400% 缩放可用)",en:"Reflow: no horizontal scroll at 320px width (usable at 400% zoom)"},{sc:"1.4.11",level:"AA",principle:"P",zh:"非文本对比:控件边界/图形/焦点环 ≥ 3:1",en:"Non-text contrast: boundaries/graphics/focus indicators ≥ 3:1"},{sc:"1.4.12",level:"AA",principle:"P",zh:"文本间距:段落 2×/行高 1.5×/词距 0.16×/字距 0.12× 字号时无损失",en:"Text spacing: no loss at 2× paragraph / 1.5× line / 0.16× word / 0.12× letter spacing"},{sc:"1.4.6",level:"AAA",principle:"P",zh:"对比度(增强):文本 ≥ 7:1;大字号 ≥ 4.5:1",en:"Contrast (enhanced): text ≥ 7:1; large text ≥ 4.5:1"},{sc:"2.1.1",level:"A",principle:"O",zh:"键盘:全部功能可仅用键盘完成",en:"Keyboard: all functionality operable by keyboard alone"},{sc:"2.1.2",level:"A",principle:"O",zh:"无键盘陷阱:焦点可移入也必须可用键盘移出(Esc 释放模态)",en:"No keyboard trap: focus can always leave via keyboard (Esc releases modals)"},{sc:"2.2.1",level:"A",principle:"O",zh:"可调时限:时限可关闭/调整/延长",en:"Timing adjustable: time limits can be turned off/adjusted/extended"},{sc:"2.4.1",level:"A",principle:"O",zh:"跳过重复块:提供 skip link 等绕过机制",en:"Bypass blocks: provide skip links and equivalents"},{sc:"2.4.7",level:"AA",principle:"O",zh:"焦点可见:焦点指示始终可见(别移除 outline)",en:"Focus visible: the focus indicator always visible (don't strip outlines)"},{sc:"2.5.8",level:"AA",principle:"O",zh:"目标尺寸(最低):指针目标 ≥ 24×24 CSS px(WCAG 2.2 新增)",en:"Target size (minimum): pointer targets ≥ 24×24 CSS px (new in WCAG 2.2)"},{sc:"2.1.3",level:"AAA",principle:"O",zh:"键盘(无例外):全部功能可键盘完成,无任何例外",en:"Keyboard (no exception): all functionality by keyboard with no exceptions"},{sc:"3.1.1",level:"A",principle:"U",zh:"页面语言:html 声明 lang",en:"Language of page: html declares lang"},{sc:"3.2.1",level:"A",principle:"U",zh:"获得焦点:聚焦本身不触发上下文变化",en:"On focus: receiving focus never changes context"},{sc:"3.3.1",level:"A",principle:"U",zh:"错误识别:错误就近指出并以文本描述",en:"Error identification: errors described in text next to the item"},{sc:"3.3.2",level:"A",principle:"U",zh:"标签或说明:输入有标签或说明",en:"Labels or instructions: inputs carry labels or instructions"},{sc:"3.3.3",level:"AA",principle:"U",zh:"错误建议:给出修正建议",en:"Error suggestion: correction suggestions provided"},{sc:"4.1.2",level:"A",principle:"R",zh:"名称、角色、值:自定义控件暴露 role/state/value",en:"Name, role, value: custom widgets expose role/state/value"},{sc:"4.1.3",level:"AA",principle:"R",zh:"状态消息:异步状态可被读屏获取(role=status)",en:"Status messages: async states reachable by screen readers (role=status)"}],w=[{key:"P",zh:"可感知 Perceivable",en:"Perceivable"},{key:"O",zh:"可操作 Operable",en:"Operable"},{key:"U",zh:"可理解 Understandable",en:"Understandable"},{key:"R",zh:"健壮 Robust",en:"Robust"}],z=`
.wc-field { position: absolute; inset: 0; }
.wc-scroll {
  position: absolute;
  left: 12px;
  top: 36px;
  width: min(340px, 52%);
  max-height: calc(100% - 60px);
  overflow: auto;
  display: grid;
  gap: 10px;
  padding-right: 4px;
}
.wc-group {
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 10px;
  padding: 6px 10px 8px;
  margin: 0;
}
.wc-group legend { font-size: 12px; font-weight: 700; padding: 0 4px; }
.wc-item { display: flex; gap: 7px; align-items: flex-start; font-size: 11.5px; line-height: 1.5; padding: 3px 0; }
.wc-item input { margin-top: 2px; }
.wc-sc { font-weight: 700; white-space: nowrap; }
.wc-level {
  display: inline-block;
  min-width: 22px;
  text-align: center;
  border-radius: 5px;
  font-size: 10px;
  padding: 0 3px;
  margin-right: 2px;
}
.wc-level[data-level="A"] { background: oklch(0.85 0.07 150); }
.wc-level[data-level="AA"] { background: oklch(0.85 0.08 90); }
.wc-level[data-level="AAA"] { background: oklch(0.85 0.09 30); }
.wc-side {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 180px;
  padding: 12px 14px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.8);
  font-size: 12px;
  line-height: 1.7;
}
.wc-side meter { width: 100%; height: 14px; }
@media (max-width: 480px) {
  .wc-side { display: none; }
  .wc-scroll { width: calc(100% - 24px); }
}
`;function O({entryId:r,schema:c}){const n=A(r,c),[o,m]=a.useState(()=>n.get("level")),[p,d]=a.useState({});a.useEffect(()=>n.subscribe(()=>{m(n.get("level"))}),[n]);const h=["A","AA","AAA"],i=u.filter(s=>h.indexOf(s.level)<=h.indexOf(o)),x=i.filter(s=>p[s.sc]).length,t=i.length?Math.round(x/i.length*100):0;return e.jsx(f,{entryId:r,schema:c,children:e.jsxs("div",{className:"wc-field",children:[e.jsx("div",{className:"wc-scroll",children:w.map(s=>{const g=i.filter(l=>l.principle===s.key);return g.length?e.jsxs("fieldset",{className:"wc-group",children:[e.jsxs("legend",{children:[s.zh," ",s.en]}),g.map(l=>e.jsxs("label",{className:"wc-item",children:[e.jsx("input",{type:"checkbox",checked:!!p[l.sc],onChange:v=>d(b=>({...b,[l.sc]:v.target.checked}))}),e.jsxs("span",{children:[e.jsx("span",{className:"wc-sc",children:l.sc})," ",e.jsx("span",{className:"wc-level","data-level":l.level,children:l.level}),l.zh," / ",l.en]})]},l.sc))]},s.key):null})}),e.jsxs("aside",{className:"wc-side",children:[e.jsx("b",{children:"核对进度 Audit progress"}),e.jsxs("p",{style:{margin:"2px 0 8px"},children:["当前等级 level: ",e.jsx("b",{children:o})," · 显示 ",i.length,"/",u.length," 条"]}),e.jsx("meter",{min:0,max:100,value:t,"aria-label":`已核对 ${t}%`}),e.jsxs("p",{style:{margin:"4px 0 10px",fontVariantNumeric:"tabular-nums"},children:["已核对 ",x,"/",i.length,"(",t,"%)"]}),e.jsx("button",{type:"button",onClick:()=>d({}),style:{border:"1px solid oklch(0.5 0 0 / 0.4)",borderRadius:8,padding:"4px 10px",background:"transparent",cursor:"pointer",fontSize:12},children:"清空 Clear"}),e.jsx("p",{style:{margin:"10px 0 0",fontSize:11,opacity:.7},children:"一致性累进:达标 AA 意味着同时满足其下所有 A 条目。 Conformance is cumulative: meeting AA implies all A items beneath it."})]}),e.jsx("style",{children:z})]})})}export{O as default};
