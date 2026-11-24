import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖韵律公式(调研 14§7.1,实跑核验:16×1.5=24;15×1.5=22.5→24) —— */

const snap = (v: number, u: number): number => Math.round(v / u) * u;
const baselineLH = (fs: number, m: number, u: number): number => snap(fs * m, u);

interface RhythmParams {
  fontSize: number;
  multiplier: number;
  unit: number;
}

const css = `
.rh-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 4px; padding: 30px 14px 10px; overflow: hidden; }
.rh-block {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
  padding: 12px 14px;
}
.rh-rule { position: absolute; left: 0; right: 0; height: 1px; background: oklch(0.62 0.16 250 / 0.35); pointer-events: none; }
.rh-block p { margin: 0; font-variant-numeric: tabular-nums; color: var(--text); }
.rh-read { display: flex; flex-wrap: wrap; gap: 4px; font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums; }
.rh-tag { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); white-space: nowrap; }
.rh-tag b { color: var(--text); font-weight: 600; }
.rh-tag[data-warn="1"] { border-color: oklch(0.62 0.19 25); color: oklch(0.55 0.19 25); }
.rh-foot { font-size: 11px; color: var(--text-faint); }
.rh-stage { animation: rh-in 0.4s ease-out both; }
@keyframes rh-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .rh-stage { animation: none; } }
`;

const SAMPLE_ZH =
  "字号乘倍率出密度,吸附到基线半格出秩序。Density from fs × m; order from the snap。宁可上行距,不破网格。";

/**
 * 行高韵律公式演示:fontSize/multiplier/unit(均为 JS 型参数,订阅 store)驱动,
 * 正文按真实 lh 渲染,韵律线按吸附行高铺;读数含原始/吸附/Δ/CJK 下限;无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): RhythmParams => ({
    fontSize: store.get("fontSize") as number,
    multiplier: store.get("multiplier") as number,
    unit: Number(store.get("unit") as string),
  });
  const [p, setP] = useState<RhythmParams>(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setP(read());
      }),
    [store],
  );

  const raw = p.fontSize * p.multiplier;
  const lh = baselineLH(p.fontSize, p.multiplier, p.unit);
  const delta = Math.round((lh - raw) * 10) / 10;
  const effRatio = Math.round((lh / p.fontSize) * 1000) / 1000;
  const cjkFloor = Math.max(1.5 * p.fontSize, p.fontSize + 8);
  const cjkOk = lh >= cjkFloor - 1e-9;
  const lines = 14;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="rh-stage">
        <div className="rh-block" aria-hidden="true">
          {Array.from({ length: lines }, (_, i) => (
            <span className="rh-rule" key={i} style={{ top: `${12 + i * lh}px` }} />
          ))}
          <p style={{ fontSize: `${p.fontSize}px`, lineHeight: `${lh}px` }}>{SAMPLE_ZH}</p>
        </div>
        <div className="rh-read">
          <span className="rh-tag">
            raw: {p.fontSize} × {p.multiplier} = <b>{Math.round(raw * 100) / 100}px</b>
          </span>
          <span className="rh-tag">
            snap({p.unit}) → <b>{lh}px</b>
          </span>
          <span className="rh-tag">
            Δ = <b>{delta >= 0 ? "+" : ""}{delta}px</b>(宁上行距 / airier wins)
          </span>
          <span className="rh-tag">
            实际倍率 = <b>{effRatio}</b>
          </span>
          <span className="rh-tag" data-warn={cjkOk ? undefined : "1"}>
            CJK 下限 ≥ {Math.round(cjkFloor * 10) / 10}px:{cjkOk ? "✓" : "✗ 低于 CLREQ 下限"}
          </span>
        </div>
        <p className="rh-foot">
          韵律线 = 吸附行高的等距投影;线与行盒重合即节奏成立。Rhythm rules = equidistant projection of the snapped leading.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
