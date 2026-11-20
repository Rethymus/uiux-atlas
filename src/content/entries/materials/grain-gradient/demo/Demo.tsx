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
  --grain-contrast: 170%;
  --grain-opacity: 0.16;
}
.gr-scene {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 14px;
  padding: 18px;
  background: #14101d;
}
.gr-card {
  position: relative;
  flex: 1;
  max-width: 300px;
  margin: 0;
  overflow: hidden;
  border-radius: 12px;
  /* 渐变一端透明,让噪点透出(CSS-Tricks 叠加顺序) */
  background: linear-gradient(160deg, oklch(0.42 0.14 285), oklch(0.3 0.1 240) 55%, oklch(0.24 0.06 215));
}
.grain {
  position: absolute;
  inset: 0;
  opacity: var(--grain-opacity);
  filter: contrast(var(--grain-contrast)) brightness(1000%);
  mix-blend-mode: multiply;
  background-size: 180px 180px;
  pointer-events: none;
}
.gr-card figcaption {
  position: absolute;
  left: 10px;
  bottom: 8px;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
.gr-note {
  position: absolute;
  left: 12px;
  bottom: 2px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
}
`;

/**
 * 噪点渐变演示:左卡纯渐变(可见色带 banding),右卡叠 feTurbulence 噪点层。
 * baseFrequency / numOctaves 为 JS 型参数——订阅 store 后重建 data-URI SVG;
 * contrast / grainOpacity 为 CSS 变量型参数(经 DemoStage 注入)。
 * 本条目为纯静态质感,无动画,reduced-motion 无需降级。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [bf, setBf] = useState(() => store.get("baseFrequency") as number);
  const [oct, setOct] = useState(() => store.get("numOctaves") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setBf(store.get("baseFrequency") as number);
        setOct(store.get("numOctaves") as number);
      }),
    [store],
  );

  const noiseUri =
    "url(\"data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>` +
        `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${bf}' numOctaves='${oct}' stitchTiles='stitch'/></filter>` +
        `<rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
    ) +
    "\")";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gr-scene" style={{ isolation: "isolate" }}>
        <figure className="gr-card">
          <figcaption>无噪点:注意暗部色带 Banding</figcaption>
        </figure>
        <figure className="gr-card">
          <div
            className="grain"
            aria-hidden="true"
            style={{ backgroundImage: noiseUri }}
          />
          <figcaption>
            有噪点 Grain(baseFrequency {bf.toFixed(2)} / octaves {oct})
          </figcaption>
        </figure>
        <p className="gr-note">
          CSS-Tricks:fractalNoise 0.65/3 + contrast(170%) brightness(1000%);层 opacity 0.16 取
          CodeFronts 轻量变体。
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
