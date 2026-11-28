import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.DLkBFFtG.js";import{g}from"./color.DuEPkvq5.js";import{D as u}from"./DemoStage.vW1CgYCd.js";const b=`
.sa-wrap { width: 100%; display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start; }
.sa-stage { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 12px; }
.sa-frame {
  width: 290px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 48px;
  background: color-mix(in srgb, currentColor 82%, Canvas);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
}
.sa-screen {
  position: relative;
  height: 480px;
  border-radius: 38px;
  overflow: hidden;
  background: color-mix(in srgb, Canvas 92%, currentColor);
  display: flex;
  flex-direction: column;
  transition: padding 0.25s ease;
}
/* 固定 padding 声明在前(级联回退);data-pad=true 时按模拟 env() 四向留边。
   auto 模式 = 系统自动内缩,TS 侧恒置 data-pad=true,留边同样生效 */
.sa-screen {
  padding: 16px 16px 16px 16px;
}
.sa-screen[data-pad="true"] {
  padding: calc(16px + var(--sa-top, 0px)) 16px calc(16px + var(--sa-bottom, 0px));
}
.sa-notch {
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0;
  width: 118px;
  height: 26px;
  border-radius: 0 0 14px 14px;
  background: color-mix(in srgb, currentColor 82%, Canvas);
}
.sa-homebar {
  position: absolute;
  bottom: 8px;
  left: 50%;
  translate: -50% 0;
  width: 104px;
  height: 5px;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 45%, Canvas);
}
.sa-header {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  background: color-mix(in srgb, oklch(0.66 0.13 250) 26%, color-mix(in srgb, Canvas 90%, transparent));
  border: 1px solid color-mix(in srgb, oklch(0.66 0.13 250) 40%, transparent);
}
.sa-body {
  flex: 1;
  margin: 10px 0;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.6;
  opacity: 0.78;
  background: color-mix(in srgb, currentColor 6%, transparent);
  overflow: hidden;
}
.sa-actions {
  display: flex;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  background: color-mix(in srgb, oklch(0.68 0.15 160) 24%, color-mix(in srgb, Canvas 90%, transparent));
  border: 1px solid color-mix(in srgb, oklch(0.68 0.15 160) 40%, transparent);
}
.sa-actions i {
  font-style: normal;
  font-size: 12px;
  font-weight: 650;
}
.sa-actions i + i { margin-left: auto; opacity: 0.7; }
.sa-readout {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  font: 12px/1.5 ui-monospace, Menlo, Consolas, monospace;
}
.sa-chip {
  padding: 2px 10px;
  border-radius: 999px;
  font: 11px/1.5 ui-monospace, Menlo, Consolas, monospace;
  transition: background-color 0.25s ease;
}
.sa-chip-ok { background: color-mix(in srgb, oklch(0.68 0.15 160) 30%, transparent); }
.sa-chip-bad { background: color-mix(in srgb, oklch(0.68 0.16 45) 32%, transparent); }
.sa-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; flex: 1 1 200px; }
.sa-hint code {
  font: 11.5px/1.5 ui-monospace, Menlo, Consolas, monospace;
  background: color-mix(in srgb, currentColor 8%, transparent);
  border-radius: 5px;
  padding: 1px 5px;
}
@media (prefers-reduced-motion: reduce) {
  .sa-screen, .sa-chip { transition: none; }
}
`;function w({entryId:r,schema:n}){const a=g(r,n),[i,p]=o.useState(()=>a.get("insetTop")),[c,l]=o.useState(()=>a.get("insetBottom")),[s,x]=o.useState(()=>a.get("viewportFit")),[d,h]=o.useState(()=>a.get("applyEnv"));o.useEffect(()=>a.subscribe(()=>{p(a.get("insetTop")),l(a.get("insetBottom")),x(a.get("viewportFit")),h(a.get("applyEnv"))}),[a]);const t=s==="cover"&&d==="off",m=s==="auto"||d==="on";return e.jsx(u,{entryId:r,schema:n,children:e.jsxs("div",{className:"sa-wrap",children:[e.jsx("div",{className:"sa-frame",children:e.jsxs("div",{className:"sa-screen","data-fit":s,"data-pad":m?"true":"false",style:{"--sa-top":`${i}px`,"--sa-bottom":`${c}px`},children:[e.jsx("div",{className:"sa-notch","aria-hidden":"true"}),e.jsx("div",{className:"sa-homebar","aria-hidden":"true"}),e.jsx("div",{className:"sa-header",children:"页头 Header"}),e.jsx("div",{className:"sa-body",children:t?"事故形态:cover 铺满全屏却忽略 env() 留边——页头文字顶进刘海,底部操作栏压进 Home 指示条,按钮不可点。Accident: cover fills the screen but env() padding is ignored — the header butts into the notch, the action bar hides under the Home indicator.":"安全形态:内容区按四向 inset 留边,刘海与指示条不遮任何可交互元素。Safe: content clears all four insets; the notch and indicator cover nothing interactive."}),e.jsxs("div",{className:"sa-actions",children:[e.jsx("i",{children:"操作栏 Action Bar"}),e.jsx("i",{children:"主按钮 Primary"})]})]})}),e.jsxs("div",{className:"sa-stage",children:[e.jsxs("div",{className:"sa-readout","aria-live":"polite",children:[e.jsxs("span",{children:["viewport-fit = ",s]}),e.jsxs("span",{children:["env 模拟 top = ",i,"px"]}),e.jsxs("span",{children:["bottom = ",c,"px"]}),e.jsx("span",{className:`sa-chip ${t?"sa-chip-bad":"sa-chip-ok"}`,children:t?"事故:未留边 · 控件被遮挡":s==="auto"?"auto · 系统自动内缩":"cover + env() 留边 · 安全"})]}),e.jsxs("p",{className:"sa-hint",children:["桌面浏览器 ",e.jsx("code",{children:"env(safe-area-inset-*)"})," 实测为 0,故用滑杆值模拟:页头 padding = ",e.jsx("code",{children:"calc(16px + env(safe-area-inset-top))"}),",操作栏 padding-bottom = ",e.jsx("code",{children:"calc(16px + env(safe-area-inset-bottom))"}),"。 Desktop browsers report ",e.jsx("code",{children:"env(safe-area-inset-*)"})," as 0, so sliders simulate it: header padding = ",e.jsx("code",{children:"calc(16px + env(safe-area-inset-top))"}),", bar padding-bottom = ",e.jsx("code",{children:"calc(16px + env(safe-area-inset-bottom))"}),".",e.jsx("br",{}),"auto 模式下系统自动内缩(留边恒在);cover 模式必须自行 env() 留边——切到 off 档看典型事故。真机验收不可省:机型 inset 各不相同。 Under auto the system insets automatically (padding always present); cover requires manual env() padding — switch to off to see the classic accident. On-device checks stay mandatory: insets differ per device."]})]}),e.jsx("style",{children:b})]})})}export{w as default};
