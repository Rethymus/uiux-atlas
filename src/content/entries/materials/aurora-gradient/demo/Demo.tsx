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
  --aurora-blur: 42px;
  --aurora-saturate: 115%;
  --aurora-drift: 18s;
  --aurora-spot-a: 20%;
  --aurora-spot-b: 70%;
}
.aur-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: oklch(0.25 0.04 265);
}
/* 光斑层:CodeFronts 配方结构(4 光斑 + conic 底,inset:-25%,整层 filter) */
.aur-layer {
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(38% 42% at var(--aurora-spot-a) 25%, oklch(0.6 0.24 300 / .85), transparent 68%),
    radial-gradient(42% 46% at var(--aurora-spot-b) 30%, oklch(0.72 0.17 195 / .8), transparent 68%),
    radial-gradient(50% 55% at 78% 72%, oklch(0.68 0.18 340 / .8), transparent 68%),
    conic-gradient(from 220deg at 60% 45%, oklch(0.35 0.06 265), oklch(0.3 0.05 210), oklch(0.35 0.06 265));
  filter: blur(var(--aurora-blur)) saturate(calc(var(--aurora-saturate) / 100));
  animation: aur-drift var(--aurora-drift) ease-in-out alternate infinite;
}
/* 第 4 光斑为独立子层:3 光斑档时整体隐藏(仍在整层滤镜内) */
.aur-blob-d {
  position: absolute;
  inset: 0;
  background: radial-gradient(45% 50% at 32% 88%, oklch(0.75 0.15 85 / .75), transparent 68%);
}
.aur-stage[data-spots="3"] .aur-blob-d { display: none; }
@keyframes aur-drift {
  from { transform: translate(-2%, -1%) rotate(0.001deg) scale(1); }
  to   { transform: translate(2%, 1%) rotate(2deg) scale(1.06); }
}
.aur-card {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(320px, calc(100% - 36px));
  padding: 18px 22px;
  border-radius: 14px;
  background: oklch(0.22 0.03 265 / 0.55);
  border: 1px solid oklch(1 0 0 / 0.18);
  color: oklch(0.97 0.01 265);
}
.aur-card h3 { margin: 0 0 6px; font-size: 16px; font-weight: 620; }
.aur-card p { margin: 0; font-size: 12.5px; line-height: 1.6; opacity: 0.85; }
.aur-toolbar {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}
.aur-toolbar button {
  border: 0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.75);
  background: transparent;
}
.aur-toolbar button[aria-pressed="true"] { background: rgba(255, 255, 255, 0.25); color: #fff; }
.aur-note {
  position: absolute;
  left: 12px;
  bottom: 10px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.66);
  max-width: 62%;
}
@media (prefers-reduced-motion: reduce) {
  /* reduced-motion 降级:整层静止,直出终态 */
  .aur-layer { animation: none; }
}
`;

/**
 * 极光渐变演示:CodeFronts 配方(4 光斑 + conic 底 + 整层 blur/saturate + transform 漂移)。
 * blur/saturate/drift/spotA/spotB 为 CSS 变量型参数(经 DemoStage 注入);
 * spots 为 JS 型参数——订阅 store 切 data-spots,隐藏第 4 个光斑。
 * reduced-motion 时 CSS 降级为静止。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [spots, setSpots] = useState(() => store.get("spots") as string);

  useEffect(
    () =>
      store.subscribe(() => {
        setSpots(store.get("spots") as string);
      }),
    [store],
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="aur-stage" data-spots={spots}>
        <div className="aur-layer" aria-hidden="true">
          <div className="aur-blob-d" />
        </div>
        <div className="aur-card">
          <h3>极光之上 Aurora Above</h3>
          <p>
            文字卡独立于滤镜层:光斑 L 钉在 0.6–0.75,4.5:1 仍守得住 / The card sits outside the filter layer; blob L stays 0.6–0.75 so 4.5:1 holds.
          </p>
        </div>
        <div className="aur-toolbar" role="group" aria-label="光斑数量 Blob count">
          <button
            type="button"
            aria-pressed={spots === "3"}
            onClick={() => store.set("spots", "3")}
          >
            3 光斑
          </button>
          <button
            type="button"
            aria-pressed={spots === "4"}
            onClick={() => store.set("spots", "4")}
          >
            4 光斑
          </button>
        </div>
        <p className="aur-note">
          CodeFronts 配方:blur(42px) saturate(1.15)、inset:-25%、只动 transform;漂移 60s 级更接近氛围光,18s 为演示档。
          {spots === "3" ? " 第 4 光斑已隐藏 / Blob D hidden." : ""}
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
