import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.ar-scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
}
.ar-box {
  width: var(--ar-width, 320px);
  max-width: 100%;
  aspect-ratio: var(--ar-ratio, 16 / 9);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, currentColor 28%, transparent);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  animation: ar-in 0.45s ease-out both;
  position: relative;
}
.ar-box img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: var(--ar-fit, cover);
}
.ar-guide {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(color-mix(in srgb, oklch(0.62 0.15 250 / 0.55), transparent) 0 0) top left / 100% 1px no-repeat,
    linear-gradient(color-mix(in srgb, oklch(0.62 0.15 250 / 0.55), transparent) 0 0) bottom left / 100% 1px no-repeat;
}
.ar-readout {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 12px;
  opacity: 0.85;
  font-variant-numeric: tabular-nums;
}
.ar-readout strong { font-weight: 650; }
.ar-hint { font-size: 11px; opacity: 0.55; margin: 0; text-align: center; max-width: 520px; }
@keyframes ar-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ar-box { animation: none; }
}
`;

/** 4:3 内在比例的样图(1200×900):与默认 16:9 比例盒不同比,object-fit 三档差异可辨 */
function sampleImage(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7fb2e8"/>
      <stop offset="1" stop-color="#dceaf6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#sky)"/>
  <circle cx="960" cy="220" r="120" fill="#ffd76e"/>
  <path d="M0 640 L300 460 L560 620 L820 420 L1200 660 L1200 900 L0 900 Z" fill="#5e8f5a"/>
  <path d="M0 760 L340 600 L700 780 L1200 640 L1200 900 L0 900 Z" fill="#41693f"/>
  <text x="40" y="80" font-family="monospace" font-size="52" fill="#22303f" font-weight="bold">4:3 · 1200×900</text>
  <text x="40" y="850" font-family="monospace" font-size="40" fill="#ffffff" opacity="0.9">左下角与右上角在 cover 裁切时最先被切掉</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * 宽高比演示:宽度走 --ar-width,高度由 aspect-ratio: var(--ar-ratio) 推导,
 * 子 img 的 object-fit 走 --ar-fit(4:3 样图 vs 比例盒,三档 fit 差异可见)。
 * 高度读数来自 ResizeObserver 对真实布局的测量,不伪造换算值。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [ratio, setRatio] = useState(() => store.get("ratio") as string);
  const [fit, setFit] = useState(() => store.get("fit") as string);
  const [width, setWidth] = useState(() => store.get("width") as number);
  const [height, setHeight] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setRatio(store.get("ratio") as string);
        setFit(store.get("fit") as string);
        setWidth(store.get("width") as number);
      }),
    [store],
  );

  // 实测高度(真实布局值;顺带验证「高度 auto + 比例」的推导链)
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setHeight(Math.round(e.contentRect.height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [rw, rh] = ratio.split("/").map((s) => Number(s.trim()) || 1);
  const expected = Math.round((width * rh) / rw);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ar-scene">
        <div className="ar-box" ref={boxRef}>
          <img src={sampleImage()} alt="4:3 演示样图:山景与太阳,标注内在尺寸 1200×900" width={1200} height={900} />
          <span className="ar-guide" aria-hidden="true" />
        </div>
        <p className="ar-readout">
          <span>width <strong>{width}px</strong></span>
          <span>aspect-ratio <strong>{ratio}</strong></span>
          <span>object-fit <strong>{fit}</strong></span>
          <span>实测高度 <strong>{height}px</strong></span>
          <span aria-hidden="true">≈</span>
          <span>换算 <strong>{expected}px</strong></span>
        </p>
        <p className="ar-hint">
          样图内在比例 4:3 ≠ 比例盒默认 16:9:cover 裁掉两端、contain 上下留边、fill 横向压扁。
          高度为 auto、由比例推导(至少一边 auto 比例才生效,MDN)。
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
