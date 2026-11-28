import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{g as o}from"./color.DuEPkvq5.js";import{D as i}from"./DemoStage.vW1CgYCd.js";import"./index.DLkBFFtG.js";const s=`
.brg-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
  background:
    radial-gradient(80% 70% at 30% 15%, oklch(0.24 0.05 220 / 0.9), transparent 70%),
    oklch(0.15 0.03 240);
}
/* 呼吸状态点:只动 box-shadow 的 alpha/blur(配方 §8.3;铁律:禁 scale/translate) */
@keyframes brg-breathe {
  0%, 100% { box-shadow: 0 0 10px 0 color-mix(in srgb, var(--brg-color) 22%, transparent); }
  50%      { box-shadow: 0 0 26px 4px color-mix(in srgb, var(--brg-color) var(--brg-amp), transparent); }
}
.brg-dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: var(--brg-color);
  animation: brg-breathe var(--brg-period) cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
/* 状态行:呼吸点 + 文字冗余(状态不得只靠光,WCAG 1.4.1) */
.brg-status {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 16px;
  background: rgb(255 255 255 / 0.05);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.08);
  color: #e8eef7;
  font-size: 13px;
  font-weight: 600;
}
.brg-panel {
  width: min(300px, calc(100% - 48px));
  padding: 16px 20px;
  border-radius: 14px;
  background: rgb(255 255 255 / 0.04);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 0 0 1px rgb(255 255 255 / 0.06);
  color: #c9d6e8;
  font-size: 12px;
  line-height: 1.6;
}
.brg-panel .brg-title { margin: 0 0 6px; font-size: 13px; font-weight: 650; color: #e8eef7; }
.brg-badge {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: #0c1a12;
  background: var(--brg-color);
  animation: brg-breathe var(--brg-period) cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.brg-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgb(232 238 247 / 0.55);
}
@media (max-width: 480px) {
  .brg-note { display: none; }
}
/* reduce:取中间帧静态值(blur 18px / spread 2px / alpha 取 .22 与峰值的中点),保留静态光 */
@media (prefers-reduced-motion: reduce) {
  .brg-dot,
  .brg-badge {
    animation: none;
    box-shadow: 0 0 18px 2px color-mix(in srgb, var(--brg-color) calc((22% + var(--brg-amp)) / 2), transparent);
  }
}
`;function d({entryId:e,schema:a}){return o(e,a),r.jsx(i,{entryId:e,schema:a,children:r.jsxs("div",{className:"brg-scene",children:[r.jsxs("div",{className:"brg-status",children:[r.jsx("span",{className:"brg-dot","aria-hidden":"true"}),r.jsx("span",{children:"在线 Online"})]}),r.jsxs("div",{className:"brg-panel",children:[r.jsxs("p",{className:"brg-title",children:["会话保持中 Session alive",r.jsx("span",{className:"brg-badge",children:"LIVE"})]}),r.jsx("p",{children:"光斑以 3.2s 周期往复,只动 alpha/blur / The halo oscillates on a 3.2s cycle, alpha/blur only."})]}),r.jsx("p",{className:"brg-note",children:"period 调慢到 5s+ 是氛围光、2s 是状态灯;amplitude 封顶 60%。/ Slow period past 5s for mood halos, 2s for status lights; amplitude caps at 60%."}),r.jsx("style",{children:s})]})})}export{d as default};
