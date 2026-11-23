import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Backdrop = "nebula" | "alps" | "gradient";

const BACKDROPS: { id: Backdrop; zh: string; en: string }[] = [
  { id: "nebula", zh: "星空", en: "Nebula photo" },
  { id: "alps", zh: "雪山", en: "Alps photo" },
  { id: "gradient", zh: "渐变", en: "Gradient" },
];

const css = `
.demo-stage {
  --dof-blur: 8px;
  --dof-sat: 0.9;
}
.dof-scene { position: absolute; inset: 0; overflow: hidden; }

/* 远景:全幅场景 */
.dof-far, .dof-far img, .dof-far-gradient { position: absolute; inset: 0; width: 100%; height: 100%; }
.dof-far { overflow: hidden; }
.dof-far img, .dof-far-gradient { object-fit: cover; }
.dof-far-gradient {
  background:
    radial-gradient(60% 80% at 18% 22%, oklch(0.72 0.19 300 / 0.9), transparent 70%),
    radial-gradient(50% 70% at 82% 18%, oklch(0.78 0.15 85 / 0.85), transparent 68%),
    radial-gradient(70% 90% at 70% 85%, oklch(0.62 0.2 165 / 0.9), transparent 72%),
    oklch(0.32 0.08 265);
}

/* 失焦处理:blur + saturate + scale(1.02) 补边(调研配方);焦点切换不做 filter 过渡(性能告诫) */
.dof-scene[data-focus="near"] .dof-far,
.dof-scene[data-focus="mid"] .dof-far,
.dof-scene[data-focus="mid"] .dof-near,
.dof-scene[data-focus="far"] .dof-near {
  filter: blur(var(--dof-blur)) saturate(var(--dof-sat));
  transform: scale(1.02);
}

/* 失焦薄纱:25% 黑压暗(blur → dim → sharp 的 dim 段;25% 借 MDN ::backdrop 典型值,演示近似) */
.dof-far::after, .dof-near::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 25%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.dof-scene[data-focus="near"] .dof-far::after,
.dof-scene[data-focus="mid"] .dof-far::after,
.dof-scene[data-focus="mid"] .dof-near::after,
.dof-scene[data-focus="far"] .dof-near::after { opacity: 1; }

/* 中景:玻璃层(配方固定 backdrop-filter blur(6px) + scrim 底,不随 blur 参数联动) */
.dof-mid {
  position: absolute;
  left: 50%;
  top: 20%;
  translate: -50%;
  width: min(420px, calc(100% - 56px));
  padding: 12px 18px;
  border-radius: 12px;
  background: color-mix(in oklab, black 55%, transparent);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  text-align: center;
}
.dof-mid::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: rgb(0 0 0 / 25%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.dof-scene[data-focus="near"] .dof-mid::after,
.dof-scene[data-focus="far"] .dof-mid::after { opacity: 1; }

/* 前景:信息卡(默认对焦主体) */
.dof-near {
  position: absolute;
  left: 50%;
  top: 52%;
  translate: -50%;
  width: min(300px, calc(100% - 48px));
  padding: 18px 20px;
  border-radius: 14px;
  background: rgba(17, 25, 40, 0.82);
  color: #f5f7fa;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
.dof-near h3 { margin: 0 0 6px; font-size: 15px; font-weight: 650; }
.dof-near p { margin: 0; font-size: 12px; line-height: 1.6; opacity: 0.82; }
.dof-near::after { border-radius: 14px; }

.dof-toolbar {
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
.dof-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.dof-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }

.dof-note {
  position: absolute;
  left: 16px;
  bottom: 8px;
  margin: 0;
  max-width: 62%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.62);
}
@media (max-width: 480px) {
  .dof-note { display: none; }
}
@keyframes dof-in {
  from { opacity: 0; translate: -50% 8px; }
  to { opacity: 1; translate: -50% 0; }
}
.dof-near { animation: dof-in 0.4s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .dof-far::after, .dof-mid::after, .dof-near::after { transition: none; }
  .dof-near { animation: none; }
}
`;

/**
 * 景深层次演示:远景(照片/渐变)→ 玻璃中景 → 前景信息卡。
 * blur/saturation 为 CSS 变量型参数(经 DemoStage 注入,只作用于失焦平面);
 * focus 为 JS 型参数——订阅 store 后切 data-focus(near/mid/far 三档对焦平面)。
 * 焦点切换不做 filter 过渡(大面积 blur 逐帧动画开销显著,调研 12 §8 告诫);
 * 仅失焦薄纱做 0.25s opacity 过渡,prefers-reduced-motion 时取消。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [focus, setFocus] = useState(() => store.get("focus") as string);
  const [backdrop, setBackdrop] = useState<Backdrop>("nebula");

  useEffect(
    () =>
      store.subscribe(() => {
        setFocus(store.get("focus") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dof-scene" data-focus={focus}>
        <div className="dof-far" aria-hidden="true">
          {backdrop === "gradient" ? (
            <div className="dof-far-gradient" />
          ) : (
            <img src={`/photos/glass-${backdrop}.jpg`} alt="" width={1600} height={1067} loading="lazy" decoding="async" />
          )}
        </div>
        <div className="dof-mid">
          玻璃中景 Glass mid · backdrop-filter blur(6px) + scrim(配方固定值)
        </div>
        <div className="dof-near">
          <h3>对焦平面 Focus plane: {focus}</h3>
          <p>
            失焦平面 = blur + saturate(0.9) + scale(1.02) + 25% 薄纱——blur → dim → sharp 三段深度。
            Defocused planes blur, desaturate and dim behind the sharp one.
          </p>
        </div>
        <div className="dof-toolbar" role="group" aria-label="远景切换 Far-plane switcher">
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
        <p className="dof-note">
          对焦切换直接置换(不做 filter 动画);切「远景 far」看反转对照——前景全部失焦。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
