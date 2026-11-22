import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.gg-field { position: absolute; inset: 0; }
.gg-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 24%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
.gg-card {
  position: absolute;
  left: 44%;
  top: 50%;
  translate: -50% -50%;
  width: 336px;
  padding: 16px 18px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.85);
}
.gg-card h3 { margin: 0 0 10px; font-size: 14px; font-weight: 650; }
.gg-stamps { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
.gg-stamp {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: 1.5px dashed oklch(0.5 0 0 / 0.4);
  border-radius: 50%;
  font-size: 11px;
  color: oklch(0.4 0 0 / 0.55);
  background: transparent;
}
.gg-stamp[data-pre="true"] {
  border-style: solid;
  border-color: oklch(0.62 0.12 85 / 0.65);
  background: oklch(0.62 0.12 85 / 0.16);
  color: oklch(0.45 0.1 85);
  animation: gg-pop 0.25s ease-out both;
}
.gg-stamp[data-hit="true"] {
  border-style: solid;
  border-color: oklch(0.55 0.13 250);
  background: oklch(0.55 0.13 250 / 0.16);
  color: oklch(0.45 0.12 250);
  font-weight: 700;
  animation: gg-pop 0.25s ease-out both;
}
.gg-progress {
  height: 10px;
  border-radius: 5px;
  background: oklch(0.9 0.01 250);
  overflow: hidden;
  margin-bottom: 4px;
}
.gg-progress > i {
  display: block;
  height: 100%;
  border-radius: 5px;
  background: oklch(0.55 0.13 250);
  transition: width 0.3s ease;
}
.gg-readout { margin: 0 0 10px; font-size: 12px; }
.gg-readout b { font-variant-numeric: tabular-nums; }
.gg-punch {
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 9px 0;
  font-size: 13px;
  font-weight: 650;
  color: #fff;
  background: oklch(0.55 0.13 250);
  cursor: pointer;
}
.gg-punch[data-done="true"] { background: oklch(0.62 0.14 145); }
.gg-done {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 650;
  color: oklch(0.45 0.13 145);
  animation: gg-pop 0.3s ease-out both;
}
.gg-panel {
  position: absolute;
  right: 12px;
  top: 36px;
  width: 196px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.gg-panel h4 { margin: 0 0 8px; font-size: 12px; }
.gg-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 64px;
  padding-bottom: 2px;
  border-bottom: 1px solid oklch(0.5 0 0 / 0.3);
  margin-bottom: 8px;
}
.gg-bars i {
  flex: 1;
  min-width: 6px;
  max-width: 14px;
  border-radius: 2px 2px 0 0;
  background: oklch(0.55 0.13 250 / 0.8);
  transition: height 0.3s ease;
}
.gg-stats { margin: 0; font-size: 11px; line-height: 1.6; opacity: 0.8; font-variant-numeric: tabular-nums; }
.gg-cap { margin: 8px 0 0; font-size: 10px; line-height: 1.5; opacity: 0.6; }
@keyframes gg-pop {
  from { transform: scale(0.5); opacity: 0.3; }
  to { transform: scale(1); opacity: 1; }
}
@media (max-width: 720px) {
  .gg-note { display: none; }
  .gg-card { left: 50%; }
  .gg-panel { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .gg-stamp, .gg-done { animation: none; }
  .gg-progress > i, .gg-bars i { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [steps, setSteps] = useState(() => store.get("steps") as number);
  const [headStart, setHeadStart] = useState(() => store.get("headStart") as number);

  /** 一轮 = { 本轮起点时刻, 实际打卡数, 每次打卡距上一章的真实间隔(ms) } */
  const [roundStart, setRoundStart] = useState(() => performance.now());
  const [punches, setPunches] = useState(0);
  const [intervals, setIntervals] = useState<number[]>([]);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setSteps(store.get("steps") as number);
        setHeadStart(store.get("headStart") as number);
      }),
    [store],
  );

  /** steps / headStart 变动 = 重开一轮(起点预盖 headStart 章人为进度) */
  useEffect(() => {
    setRoundStart(performance.now());
    setPunches(0);
    setIntervals([]);
    setCelebrated(false);
  }, [steps, headStart]);

  const stamped = headStart + punches;
  const done = stamped >= steps;
  const remain = Math.max(0, steps - stamped);
  const pct = Math.round((Math.min(stamped, steps) / steps) * 100);

  const punch = () => {
    if (done) {
      setRoundStart(performance.now());
      setPunches(0);
      setIntervals([]);
      setCelebrated(false);
      return;
    }
    const now = performance.now();
    const prev = punches === 0 ? roundStart : roundStart + intervals.reduce((a, b) => a + b, 0);
    setIntervals((arr) => [...arr, Math.round(now - prev)]);
    setPunches((p) => p + 1);
  };

  useEffect(() => {
    if (done) setCelebrated(true);
  }, [done]);

  const last = intervals.length > 0 ? intervals[intervals.length - 1] : null;
  const min = intervals.length > 0 ? Math.min(...intervals) : null;
  const max = intervals.length > 0 ? Math.max(...intervals) : null;
  const maxI = max ?? 1;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="gg-field">
        <p className="gg-note">
          Hull 1932/1934 大鼠奔食;Kivetz/Urminsky/Zheng 购买加速与虚幻进度。连续打卡——看你的间隔在收尾是否变短。
          Hull 1932/1934; Kivetz et al. Keep punching — watch your intervals shrink near the goal.
        </p>

        <div className="gg-card">
          <h3>咖啡集章卡 Punch Card</h3>
          <div className="gg-stamps">
            {Array.from({ length: steps }, (_, i) => {
              const pre = i < headStart;
              const hit = !pre && i < stamped;
              return (
                <span
                  key={i}
                  className="gg-stamp"
                  data-pre={pre ? "true" : undefined}
                  data-hit={hit ? "true" : undefined}
                  title={pre ? "预盖(人为进度,已如实标注)" : hit ? "已集 ✓" : "空格"}
                  aria-label={pre ? `第 ${i + 1} 格:预盖(人为进度)` : hit ? `第 ${i + 1} 格:已集` : `第 ${i + 1} 格:空`}
                >
                  {pre ? "预" : hit ? "✓" : ""}
                </span>
              );
            })}
          </div>
          <div
            className="gg-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={steps}
            aria-valuenow={Math.min(stamped, steps)}
            aria-label={`集章进度 ${Math.min(stamped, steps)}/${steps}`}
          >
            <i style={{ width: `${pct}%` }} />
          </div>
          <p className="gg-readout" aria-live="polite">
            已集 <b>{Math.min(stamped, steps)}/{steps}</b> · <b>{pct}%</b> · 还差 <b>{remain}</b> 章
            {done && celebrated ? <span className="gg-done"> 达标!奖励到手 ✓</span> : null}
          </p>
          <button type="button" className="gg-punch" data-done={done ? "true" : undefined} onClick={punch}>
            {done ? "再来一轮 Again" : "打卡集章 Punch"}
          </button>
        </div>

        <div className="gg-panel">
          <h4>打卡间隔 Interval(ms)</h4>
          <div className="gg-bars" aria-hidden="true">
            {intervals.map((ms, i) => (
              <i key={i} title={`${ms} ms`} style={{ height: `${Math.max(8, Math.round((ms / maxI) * 100))}%` }} />
            ))}
            {intervals.length === 0 && <i style={{ height: "8%", background: "transparent" }} />}
          </div>
          <p className="gg-stats">
            {intervals.length === 0 ? (
              <>尚无打卡 · 每次打卡记录距上一章的真实毫秒数(第 1 章相对本轮起点)。</>
            ) : (
              <>
                第 {intervals.length} 章间隔 <b>{last}</b> ms
                <br />最短 <b>{min}</b> · 最长 <b>{max}</b>
              </>
            )}
          </p>
          <p className="gg-cap">
            柱子随接近目标变短 = 你的目标梯度。间隔为 demo 实测值,非模拟数据。
            Bars shrinking toward the goal = your own goal-gradient; real measurements, not simulated.
          </p>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
