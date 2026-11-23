import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import { withBase } from "@/lib/urls";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "gradient" | "alps" | "nebula";

const BACKDROPS: { id: Backdrop; zh: string; en: string }[] = [
  { id: "gradient", zh: "渐变", en: "Gradient" },
  { id: "alps", zh: "雪山", en: "Alps photo" },
  { id: "nebula", zh: "星空", en: "Nebula photo" },
];

const css = `
.demo-stage {
  --sh-intensity: 0.5;
  --sh-height: 6px;
  --sh-hairline: 0.5px;
  /* 光斑位置(动态版消费):默认顶光(元素上方) */
  --sh-x: 50%;
  --sh-y: -30%;
}
.sh-scene { position: absolute; inset: 0; overflow: hidden; }
.sh-bg, .sh-bg img, .sh-gradient { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sh-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}
/* 玻璃卡:深色玻璃配方(rgba(17,25,40,0.55),superdesign.dev,见 glassmorphism 条目) */
.sh-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 48px));
  padding: 22px 24px;
  border-radius: 18px;
  background-color: rgba(17, 25, 40, 0.55);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  color: #f5f7fa;
}
/* 高光层:纯装饰、不参与事件 */
.sh-card::before {
  content: "";
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
}
/* 静态版:顶缘天光带(inset 高光,配方:inset 0 0 auto 0 + height 6px + 白 0.5 渐变) */
.sh-scene[data-lighting="static"] .sh-card::before {
  inset: 0 0 auto 0;
  height: var(--sh-height);
  background: linear-gradient(hsl(0 0% 100% / var(--sh-intensity)), transparent);
}
/* 静态 hairline:顶缘同色细线(0.5px,调研 09 §1.4d 推导惯例) */
.sh-card {
  box-shadow:
    inset 0 var(--sh-hairline) 0 0 hsl(0 0% 100% / var(--sh-intensity)),
    0 8px 32px rgba(0, 0, 0, 0.25);
}
/* 动态版:radial 光斑,中心随指针写入的 --sh-x/--sh-y 移动 */
.sh-scene[data-lighting="pointer"] .sh-card::before {
  inset: 0;
  height: auto;
  background: radial-gradient(
    170px circle at var(--sh-x) var(--sh-y),
    hsl(0 0% 100% / var(--sh-intensity)),
    transparent 75%
  );
}
.sh-card h3 { margin: 0 0 8px; font-size: 17px; font-weight: 650; }
.sh-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.6; opacity: 0.82; }
.sh-actions { display: flex; gap: 10px; }
.sh-btn {
  border: 1px solid hsl(0 0% 100% / 0.3);
  border-radius: 9px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: #f5f7fa;
  background: transparent;
}
.sh-btn-primary { background: rgba(30, 90, 220, 0.85); border-color: transparent; }
.sh-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.sh-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.sh-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.sh-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 60%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}
@media (max-width: 480px) {
  .sh-note { display: none; }
}
@keyframes sh-in {
  from { opacity: 0; translate: -50% calc(-50% + 8px); }
  to { opacity: 1; translate: -50% -50%; }
}
.sh-card { animation: sh-in 0.4s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .sh-card { animation: none; }
}
`;

/**
 * 镜面高光演示:深色玻璃卡顶缘高光。
 * intensity/height/hairline 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage);
 * lighting 为 JS 型参数——订阅 store 后切 data-lighting:
 * static = 顶缘天光带 + hairline;pointer = radial 光斑,指针位置写入元素级 --sh-x/--sh-y。
 * 指针驱动是输入反馈(无自主动画),prefers-reduced-motion 下仅取消入场动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [lighting, setLighting] = useState(() => store.get("lighting") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("gradient");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setLighting(store.get("lighting") as string);
      }),
    [store],
  );

  // 光斑跟随指针:位置写入元素级 CSS 变量(逐帧直接写 style,避免整棵子树样式失效)
  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    const x = clamp(((e.clientX - r.left) / r.width) * 100, -60, 160);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, -60, 160);
    card.style.setProperty("--sh-x", `${x}%`);
    card.style.setProperty("--sh-y", `${y}%`);
  };
  // 指针离开:光斑回位到「顶光」
  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--sh-x", "50%");
    card.style.setProperty("--sh-y", "-30%");
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div
        className="sh-scene"
        data-lighting={lighting}
        onPointerMove={lighting === "pointer" ? handleMove : undefined}
        onPointerLeave={lighting === "pointer" ? handleLeave : undefined}
      >
        <div className="sh-bg" aria-hidden="true">
          {backdrop === "gradient" ? (
            <div className="sh-gradient" />
          ) : (
            <img src={withBase(`photos/glass-${backdrop}.jpg`)} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
          )}
        </div>
        <div ref={cardRef} className="sh-card">
          <h3>顶缘受光 Top-edge light</h3>
          <p>
            光源固定,高光随元素与指针的相对位移移动 / One fixed light; the highlight follows relative motion.
          </p>
          <div className="sh-actions">
            <button type="button" className="sh-btn sh-btn-primary">主操作 Action</button>
            <button type="button" className="sh-btn">取消 Cancel</button>
          </div>
        </div>
        <div className="sh-toolbar" role="group" aria-label="背景切换 Backdrop switcher">
          {BACKDROPS.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-pressed={backdrop === b.id}
              title={b.en}
              onClick={() => setBackdrop(b.id)}
            >
              {b.zh}
            </button>
          ))}
        </div>
        <p className="sh-note">
          {lighting === "pointer"
            ? "动态版:移动指针,光斑跟随(输入驱动);离开回位顶光。"
            : "静态版:顶缘天光带 + 0.5px 同色 hairline;切到「随位移动态」体验光斑跟随。"}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
