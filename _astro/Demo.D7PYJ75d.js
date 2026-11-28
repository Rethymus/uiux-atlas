import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DLkBFFtG.js";import{g as B}from"./color.DuEPkvq5.js";import{D as R}from"./DemoStage.vW1CgYCd.js";const u={container:{desc:{zh:"持久容器连接起止态:Card/FAB/搜索框无缝展开为详情,关系最强",en:"A persistent container links both states: Card/FAB/search expands into detail — the strongest relationship"},pair:{zh:"推荐 Emphasized 500ms(屏内大面积;CSS 无等价,Standard 兜底)",en:"Emphasized 500ms (large on-screen; no CSS equivalent — Standard fallback)"},settle:1},forward:{desc:{zh:"层级前进/后退:Android 滑动+淡出(减少位移量)、iOS 视差",en:"Hierarchy travel: Android slide+fade (minimized travel), iOS parallax"},pair:{zh:"按官方配对表:进入 decel 400ms / 退出 accel 200ms",en:"Per the pairing table: enter decel 400ms / exit accel 200ms"},settle:1},lateral:{desc:{zh:"同级横滑(tabs/carousels):成组齐滑,无淡出/视差,暗示可手势滑动",en:"Same-level slide (tabs/carousels): the group moves together, no fade/parallax, hinting swipe"},pair:{zh:"屏内起止 Standard 300ms",en:"On-screen Standard 300ms"},settle:1},toplevel:{desc:{zh:"顶层目的地切换(nav/rail/drawer):先快速淡出再淡入,刻意不用持久元素",en:"Top-level destinations (nav/rail/drawer): quick fade out then in, deliberately without a persistent element"},pair:{zh:"退出 accel 200ms + 进入 Standard 300ms(按官方配对表)",en:"Exit accel 200ms + enter Standard 300ms (per the pairing table)"},settle:1},enterexit:{desc:{zh:"沿出入点方向进出:sheet/键盘自底部、抽屉自侧缘;临时退出暗示可召回",en:"In/out along the origin direction: sheets/keyboards from the bottom, drawers from a side; temporary exits hint recallability"},pair:{zh:"临时退出/进入官方指定 Emphasized(CSS 用 Standard 兜底)",en:"Temporary exits/enters officially take Emphasized (Standard fallback in CSS)"},settle:1},skeleton:{desc:{zh:"骨架脉动暗示内容落点,稳定布局;完成后内容快速淡入",en:"A pulsing skeleton hints where content lands and stabilizes layout; content fades in fast after"},pair:{zh:"脉动时长官方未定值;完成后快速淡入(官方)",en:"No official pulse duration; fast fade-in on completion (official)"},settle:2.3}},i="cubic-bezier(0.2, 0, 0, 1)",P=`
.pt-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.pt-device {
  position: relative; flex: 1; min-height: 0; margin: 0 auto; width: min(340px, 100%);
  border: 1px solid var(--border); border-radius: 18px; overflow: hidden;
  background: color-mix(in srgb, var(--accent) 4%, var(--surface));
}
.pt-screen { position: absolute; inset: 0; padding: 16px; display: flex; flex-direction: column; gap: 8px; background: var(--surface); }
.pt-screen h3 { margin: 2px 0 0; font-size: 14px; font-weight: 650; }
.pt-row {
  padding: 9px 12px; border-radius: 10px; border: 1px solid var(--border);
  font-size: 12px; color: var(--text-dim); background: color-mix(in srgb, var(--accent) 4%, var(--surface));
}
.pt-fab {
  position: absolute; right: 14px; bottom: 14px; width: 44px; height: 44px;
  border-radius: 999px; background: color-mix(in srgb, var(--accent) 80%, black);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.25);
}
.pt-fab::before { content: "+"; position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font-size: 20px; }
.pt-detail p { margin: 8px 0 0; font-size: 12px; line-height: 1.6; color: var(--text-dim); }
.pt-b-content { display: flex; flex-direction: column; gap: 8px; }
.pt-scrim { position: absolute; inset: 0; background: rgb(0 0 0 / 0.45); opacity: 0; pointer-events: none; }

/* —— 模式动画:时长统一走 --pt-dur,曲线固定 Standard(Emphasized 的官方 CSS 兜底)—— */
/* container:FAB 以右下角为原点展开为整屏(持久容器;origin 对准 FAB 中心) */
.pt-b.in-container, .pt-b.out-container { transform-origin: calc(100% - 36px) calc(100% - 36px); }
.pt-b.in-container { animation: pt-container-in var(--pt-dur) ${i} both; }
.pt-b.out-container { animation: pt-container-out var(--pt-dur) ${i} both; }
.pt-a.in-container, .pt-a.out-container { animation: none; }
@keyframes pt-container-in {
  from { transform: scale(0.15); border-radius: 999px; }
  to { transform: none; border-radius: 0; }
}
@keyframes pt-container-out {
  from { transform: none; border-radius: 0; }
  to { transform: scale(0.15); border-radius: 999px; }
}
/* forward:正向=新屏自右滑入、旧屏小幅左移+淡出(Android 滑动+淡出);反向=旧屏退回右侧 */
.pt-b.in-forward { animation: pt-slide-from-right var(--pt-dur) ${i} both; }
.pt-b.out-forward { animation: pt-slide-out-back var(--pt-dur) ${i} both; }
.pt-a.out-forward { animation: pt-slide-out-forward var(--pt-dur) ${i} both; }
.pt-a.in-forward { animation: pt-slide-from-left var(--pt-dur) ${i} both; }
@keyframes pt-slide-from-right { from { transform: translateX(100%); } to { transform: none; } }
@keyframes pt-slide-out-back { from { transform: none; } to { transform: translateX(100%); } }
@keyframes pt-slide-out-forward { from { transform: none; opacity: 1; } to { transform: translateX(-26%); opacity: 0.35; } }
@keyframes pt-slide-from-left { from { transform: translateX(-26%); opacity: 0.35; } to { transform: none; opacity: 1; } }

/* lateral:成组齐滑,无淡出 */
.pt-b.in-lateral { animation: pt-slide-from-right var(--pt-dur) linear both; }
.pt-a.out-lateral { animation: pt-slide-fully-left var(--pt-dur) linear both; }
.pt-a.in-lateral { animation: pt-slide-fully-left-rev var(--pt-dur) linear both; }
.pt-b.out-lateral { animation: pt-slide-from-right-rev var(--pt-dur) linear both; }
@keyframes pt-slide-fully-left { from { transform: none; } to { transform: translateX(-100%); } }
@keyframes pt-slide-fully-left-rev { from { transform: translateX(-100%); } to { transform: none; } }
@keyframes pt-slide-from-right-rev { from { transform: none; } to { transform: translateX(100%); } }

/* toplevel:先快速淡出(0.3×)再淡入(0.7×) */
.pt-a.out-toplevel, .pt-b.out-toplevel, .pt-a.in-toplevel, .pt-b.in-toplevel { animation: pt-fade-out calc(var(--pt-dur) * 0.3) ease-out both; }
.pt-a.in-toplevel, .pt-b.in-toplevel { animation-name: pt-fade-in; animation-duration: calc(var(--pt-dur) * 0.7); animation-delay: calc(var(--pt-dur) * 0.3); }
@keyframes pt-fade-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes pt-fade-in { from { opacity: 0; } to { opacity: 1; } }

/* enterexit:sheet 自底部滑入屏缘 + 渐入遮罩(临时退出语义) */
.pt-b.in-enterexit { animation: pt-sheet-up var(--pt-dur) ${i} both; }
.pt-b.out-enterexit { animation: pt-sheet-down var(--pt-dur) ${i} both; }
.pt-a.in-enterexit, .pt-a.out-enterexit { animation: none; }
@keyframes pt-sheet-up { from { transform: translateY(100%); } to { transform: none; } }
@keyframes pt-sheet-down { from { transform: none; } to { transform: translateY(100%); } }
.pt-scrim.scrim-in { animation: pt-scrim-in var(--pt-dur) ease-out both; }
.pt-scrim.scrim-out { animation: pt-scrim-in var(--pt-dur) ease-out both; animation-direction: reverse; }
@keyframes pt-scrim-in { from { opacity: 0; } to { opacity: 1; } }

/* skeleton:骨架脉动(官方:微妙脉动)×2 → 内容快速淡入 */
.pt-skel { position: absolute; inset: 0; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: var(--surface); }
.pt-skel-block { border-radius: 8px; background: color-mix(in srgb, var(--border) 80%, transparent); }
.pt-skel.on { animation: pt-skel-pulse calc(var(--pt-dur) * 2.3) linear both; }
@keyframes pt-skel-pulse {
  0% { opacity: 0.45; } 12% { opacity: 0.9; } 26% { opacity: 0.45; }
  40% { opacity: 0.9; } 54% { opacity: 0.45; } 68% { opacity: 0.85; } 100% { opacity: 0; }
}
.pt-b.in-skeleton .pt-b-content { animation: pt-fade-in calc(var(--pt-dur) * 0.5) ease-out both; animation-delay: calc(var(--pt-dur) * 1.8); }

.pt-scene[data-reduced="true"] .pt-a,
.pt-scene[data-reduced="true"] .pt-b,
.pt-scene[data-reduced="true"] .pt-skel.on,
.pt-scene[data-reduced="true"] .pt-scrim { animation: none !important; }
.pt-scene[data-reduced="true"] .pt-skel { display: none; }

.pt-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.pt-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-variant-numeric: tabular-nums;
}
.pt-chip-official { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.pt-chip-note { max-width: 100%; white-space: normal; line-height: 1.5; font-family: inherit; }
.pt-btn {
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
`,X=["62%","88%","74%","40%"];function V({entryId:y,schema:g}){const c=B(y,g),k=()=>({pattern:c.get("pattern"),duration:c.get("duration")}),[p,j]=n.useState(k),[d,f]=n.useState("a"),[h,b]=n.useState(null),[l,z]=n.useState(!1),x=n.useRef(0);n.useEffect(()=>c.subscribe(()=>{j(k()),f("a"),b(null)}),[c]),n.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),r=()=>z(a.matches);return r(),a.addEventListener("change",r),()=>a.removeEventListener("change",r)},[]),n.useEffect(()=>()=>window.clearTimeout(x.current),[]);const N=()=>{const a=d==="a"?"fwd":"back",r=u[p.pattern]??u.container;if(b({dir:a,nonce:Date.now()}),window.clearTimeout(x.current),l){f(a==="fwd"?"b":"a");return}x.current=window.setTimeout(()=>{f(a==="fwd"?"b":"a"),b(null)},p.duration*r.settle)},e=p.pattern in u?p.pattern:"container",m=u[e],o=h?.dir??(d==="a"?"fwd":"back"),s=h!==null&&!l,w=e==="skeleton"&&o==="back"?"toplevel":e,S=e==="container"||e==="enterexit"?"stay":o==="fwd"?"out":"in",$=o==="fwd"?"in":"out",E=s&&S!=="stay"?`${S}-${w}`:"",A=s?`${$}-${w}`:"",C=s||d==="a",T=s||d==="b",v=`${e}-${o}-${h?.nonce??0}`;return t.jsx(R,{entryId:y,schema:g,children:t.jsxs("div",{className:"pt-scene","data-reduced":l,style:{"--pt-dur":`${p.duration}ms`},children:[t.jsxs("div",{className:"pt-device",children:[C&&t.jsxs("div",{className:`pt-screen pt-a ${E}`,children:[t.jsx("h3",{children:"列表屏 List"}),t.jsx("div",{className:"pt-row",children:"项目 Alpha"}),t.jsx("div",{className:"pt-row",children:"项目 Beta"}),t.jsx("div",{className:"pt-row",children:"项目 Gamma"}),t.jsx("span",{className:"pt-fab","aria-hidden":"true"})]},`a-${v}`),e==="enterexit"&&s&&t.jsx("div",{className:`pt-scrim ${o==="fwd"?"scrim-in":"scrim-out"}`,"aria-hidden":"true"},`s-${v}`),T&&t.jsxs("div",{className:`pt-screen pt-b ${A}`,children:[e==="skeleton"&&s&&o==="fwd"&&t.jsx("div",{className:"pt-skel on","aria-hidden":"true",children:X.map((a,r)=>t.jsx("div",{className:"pt-skel-block",style:{width:a,height:r===0?18:12}},r))}),t.jsxs("div",{className:"pt-b-content pt-detail",children:[t.jsx("h3",{children:"详情屏 Detail"}),t.jsx("p",{children:"这是转场后的目的界面。观察所选模式如何建立两个状态之间的关系 / The destination surface. Watch how the selected pattern relates the two states."})]})]},`b-${v}`)]}),t.jsxs("div",{className:"pt-readout",children:[t.jsxs("button",{type:"button",className:"pt-btn",onClick:N,children:[d==="a"?"播放 A→B":"播放 B→A"," Play"]}),t.jsx("span",{className:"pt-chip",children:e}),t.jsxs("span",{className:"pt-chip",children:["duration: ",p.duration,"ms",s?" · playing":""]}),t.jsx("span",{className:"pt-chip pt-chip-official",children:m.desc.zh}),t.jsx("span",{className:"pt-chip",children:m.desc.en}),t.jsxs("span",{className:"pt-chip pt-chip-note",children:["配对 / pair: ",m.pair.zh," · ",m.pair.en]}),l&&t.jsx("span",{className:"pt-chip",children:"reduced-motion: 直切 / hard cut"}),t.jsx("span",{className:"pt-chip pt-chip-note",children:"工程化落地(整页/路由级)用 View Transitions API,见 view-transitions 条目 / land route-level via View Transitions — see view-transitions"})]}),t.jsx("style",{children:P})]})})}export{V as default};
