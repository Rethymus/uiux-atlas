import { useEffect, useMemo, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** 8 段旅程的基线强度(第 3 段=峰、第 8 段=终,由参数覆写) */
const BASE = [3, 4, 6, 5, 4, 5, 4, 3];

const css = `
.pe-field { position: absolute; inset: 0; }
.pe-chart {
  position: absolute;
  left: 50%;
  top: 46%;
  translate: -50% -50%;
  width: min(380px, calc(100% - 200px));
}
.pe-curve {
  fill: none;
  stroke: oklch(0.55 0.13 250);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: d 0.3s ease;
}
.pe-area { fill: oklch(0.55 0.13 250 / 0.12); }
.pe-dot { fill: oklch(0.55 0.13 250); }
.pe-dot-peak { fill: oklch(0.62 0.16 300); }
.pe-dot-end { fill: oklch(0.62 0.16 145); }
.pe-label { font-size: 11px; fill: oklch(0.35 0.02 250); }
.pe-bars {
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: min(320px, calc(100% - 220px));
  font-size: 12px;
}
.pe-bar-row { display: grid; grid-template-columns: 110px 1fr 34px; gap: 8px; align-items: center; margin-top: 6px; }
.pe-bar { height: 12px; border-radius: 6px; background: oklch(0.9 0.01 250); overflow: hidden; }
.pe-bar > i {
  display: block;
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}
.pe-bar-avg > i { background: oklch(0.65 0.08 250); }
.pe-bar-peakend > i { background: oklch(0.62 0.15 145); }
.pe-presets {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 158px;
  display: grid;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.pe-presets button {
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 8px;
  padding: 5px 8px;
  background: oklch(1 0 0 / 0.7);
  font-size: 12px;
  cursor: pointer;
  text-align: left;
}
.pe-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
@media (max-width: 480px) {
  .pe-presets { display: none; }
  .pe-chart { width: calc(100% - 24px); top: 34%; }
  .pe-note { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pe-curve, .pe-bar > i { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [peak, setPeak] = useState(() => store.get("peak") as number);
  const [ending, setEnding] = useState(() => store.get("ending") as number);

  useEffect(
    () =>
      store.subscribe(() => {
        setPeak(store.get("peak") as number);
        setEnding(store.get("ending") as number);
      }),
    [store],
  );

  const applyPreset = (p: string) => {
    if (p === "smooth") { store.set("peak", 5); store.set("ending", 4); }
    if (p === "finale") { store.set("peak", 6); store.set("ending", 9); }
    if (p === "cliff") { store.set("peak", 8); store.set("ending", 2); }
    store.set("preset", "custom" === p ? "custom" : p);
  };

  const journey = useMemo(
    () => BASE.map((v, i) => (i === 2 ? peak : i === 7 ? ending : v)),
    [peak, ending],
  );

  const W = 380, H = 190, PAD = 26;
  const pts = journey.map((v, i) => {
    const x = PAD + (i * (W - 2 * PAD)) / 7;
    const y = H - PAD - ((v - 1) / 9) * (H - 2 * PAD);
    return { x, y, v };
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[7].x.toFixed(1)},${H - PAD} L${pts[0].x.toFixed(1)},${H - PAD} Z`;

  const avg = journey.reduce((a, b) => a + b, 0) / journey.length;
  const peakEnd = (peak + ending) / 2;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="pe-field">
        <p className="pe-note">
          一段 8 时刻的旅程:拖动右侧参数改「峰值」与「结尾」,看记忆预测与全程平均的分道扬镳。
          An 8-moment journey: drag the params and watch memory diverge from the average.
        </p>

        <svg className="pe-chart" viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label={`体验曲线:峰值 ${peak} 级,结尾 ${ending} 级,全程平均 ${avg.toFixed(1)},峰终预测 ${peakEnd.toFixed(1)}`}>
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="oklch(0.5 0 0 / 0.3)" />
          <path className="pe-area" d={area} />
          <path className="pe-curve" d={path} />
          {pts.map((p, i) => (
            <circle
              key={i}
              className={i === 2 ? "pe-dot pe-dot-peak" : i === 7 ? "pe-dot pe-dot-end" : "pe-dot"}
              cx={p.x} cy={p.y} r={i === 2 || i === 7 ? 6 : 3}
            />
          ))}
          <text className="pe-label" x={pts[2].x} y={pts[2].y - 12} textAnchor="middle">峰 {peak}</text>
          <text className="pe-label" x={pts[7].x - 8} y={pts[7].y - 12} textAnchor="end">终 {ending}</text>
        </svg>

        <div className="pe-bars">
          <div className="pe-bar-row">
            <span>全程平均 Average</span>
            <span className="pe-bar pe-bar-avg"><i style={{ width: `${avg * 10}%` }} /></span>
            <b>{avg.toFixed(1)}</b>
          </div>
          <div className="pe-bar-row">
            <span>峰终预测 (峰+终)/2</span>
            <span className="pe-bar pe-bar-peakend"><i style={{ width: `${peakEnd * 10}%` }} /></span>
            <b>{peakEnd.toFixed(1)}</b>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 11, opacity: 0.65 }}>
            记忆由峰与终主导(Kahneman 1993);(峰+终)/2 为教科书化简。
            Memory rides on peak &amp; end (Kahneman 1993); (peak+end)/2 is a textbook simplification.
          </p>
        </div>

        <div className="pe-presets" role="group" aria-label="旅程预设 Journey presets">
          <strong>预设 Presets</strong>
          <button type="button" onClick={() => applyPreset("cliff")}>烂尾 Botched (8/2)</button>
          <button type="button" onClick={() => applyPreset("smooth")}>平顺 Smooth (5/4)</button>
          <button type="button" onClick={() => applyPreset("finale")}>惊喜收尾 Finale (6/9)</button>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
