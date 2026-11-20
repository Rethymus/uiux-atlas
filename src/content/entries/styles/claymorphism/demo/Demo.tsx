import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --clay-radius: 32px;
  --clay-shadow-y: 35px;
  --clay-inner-alpha: 1;
}
.clay-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ecebfa;
  animation: clay-in 0.4s ease-out both;
}
/* 三段式阴影(顺序关键):外投影(色相化,禁纯黑)→ 下缘暗内阴影 → 顶部亮内阴影 */
.clay-shadow {
  box-shadow:
    0 var(--clay-shadow-y) 68px rgba(112, 100, 176, 0.30),
    inset 0 -8px 16px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 8px 16px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
}
.clay-card {
  width: min(320px, calc(100% - 32px));
  padding: 26px 26px 30px;
  border-radius: var(--clay-radius);
  background: #b3a4ee;
  color: #2c2350;
}
.clay-card h3 { margin: 0 0 6px; font-size: 17px; font-weight: 700; }
.clay-hint { margin: 0 0 20px; font-size: 12px; color: #4a3f78; }
.clay-btn {
  width: 100%;
  padding: 15px 0;
  border: 0;
  border-radius: calc(var(--clay-radius) * 0.75); /* 按钮≈卡片圆角 × 0.75,经验≈高度 25% */
  background: #8f7cf0;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    0 calc(var(--clay-shadow-y) * 0.55) 40px rgba(112, 100, 176, 0.30),
    inset 0 -6px 12px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 6px 12px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* 按压反馈:位移而非动画阴影(superdesign.dev 配方) */
.clay-btn:active { transform: translateY(2px) scale(0.98); }
.clay-btn:focus-visible { outline: 3px solid #6a5acd; outline-offset: 2px; }
.clay-meter {
  margin-top: 22px;
  height: 22px;
  border-radius: 999px;
  background: #cdc4f4;
  box-shadow:
    inset 0 -4px 8px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 4px 8px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
}
.clay-meter-fill {
  width: 68%;
  height: 100%;
  border-radius: 999px;
  background: #ff9fbe;
  box-shadow:
    inset 0 -4px 8px rgb(95 70 140 / calc(0.22 * var(--clay-inner-alpha))),
    inset 0 4px 8px rgb(255 255 255 / calc(0.65 * var(--clay-inner-alpha)));
  transition: width 0.5s ease;
}
.clay-cite { margin: 14px 0 0; font-size: 11px; color: #6b60a4; text-align: center; }
@keyframes clay-in {
  from { opacity: 0; translate: 0 10px; }
  to { opacity: 1; translate: 0 0; }
}
@media (prefers-reduced-motion: reduce) {
  .clay-scene { animation: none; }
  .clay-btn, .clay-meter-fill { transition: none; }
}
`;

/**
 * 黏土拟物演示:粉彩充气质感 + 按压位移。
 * radius / shadowY / innerAlpha 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * 按压反馈走 transform: translateY(2px) scale(0.98),不动画阴影(superdesign.dev 配方)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [done, setDone] = useState(68);

  useEffect(() => store.subscribe(() => setDone((d) => (d >= 100 ? 24 : d + 8))), [store]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="clay-scene">
        <div className="clay-card clay-shadow">
          <h3>黏土卡片 Clay Card</h3>
          <p className="clay-hint">
            按下按钮看挤压回弹 / Press the button to feel the squish.
          </p>
          <button
            type="button"
            className="clay-btn"
            onClick={() => setDone((d) => (d >= 100 ? 24 : d + 8))}
          >
            打卡 +1 Check in
          </button>
          <div
            className="clay-meter"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={done}
            aria-label="进度 Progress"
          >
            <div className="clay-meter-fill" style={{ width: `${done}%` }} />
          </div>
          <p className="clay-cite">
            配方出处 Recipe: superdesign.dev/styles/claymorphism
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
