import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface Result {
  size: number;
  distance: number;
  ms: number;
}

const css = `
.demo-stage {
  --ft-size: 48px;
  --ft-distance: 160px;
}
.ft-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 40%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.ft-field {
  position: absolute;
  inset: 0;
}
.ft-start {
  position: absolute;
  left: 20px;
  bottom: 48px;
  padding: 12px 18px;
  border: 1px solid currentColor;
  border-radius: 12px;
  background: oklch(0.55 0.12 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.ft-target {
  position: absolute;
  left: calc(20px + 150px + var(--ft-distance));
  bottom: 96px;
  width: var(--ft-size);
  height: var(--ft-size);
  border: 2px solid oklch(0.45 0.15 150);
  border-radius: 14px;
  background: oklch(0.75 0.15 150);
  color: oklch(0.25 0.05 150);
  font-size: 12px;
  cursor: pointer;
  transition: border-radius 0.15s ease;
}
.ft-target[data-running="true"] {
  animation: ft-pulse 1.2s ease-in-out infinite;
}
.ft-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 190px;
  display: grid;
  gap: 6px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.ft-panel dt { opacity: 0.6; }
.ft-panel dd { margin: 0 0 4px; font-weight: 650; font-variant-numeric: tabular-nums; }
.ft-log {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  font-size: 11px;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
}
.ft-miss {
  position: absolute;
  left: calc(20px + 150px + var(--ft-distance) + var(--ft-size) / 2);
  bottom: calc(96px + var(--ft-size) / 2);
  translate: -50% 0;
  font-size: 11px;
  color: oklch(0.55 0.2 25);
  opacity: 0;
  pointer-events: none;
}
.ft-field[data-phase="aiming"] .ft-miss[data-flash="true"] { animation: ft-flash 0.5s ease-out; }
@keyframes ft-pulse {
  0%, 100% { box-shadow: 0 0 0 0 oklch(0.75 0.15 150 / 0.55); }
  50% { box-shadow: 0 0 0 8px oklch(0.75 0.15 150 / 0); }
}
@keyframes ft-flash { from { opacity: 1; } to { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .ft-target[data-running="true"] { animation: none; }
  .ft-field[data-phase="aiming"] .ft-miss[data-flash="true"] { animation: none; opacity: 1; }
}
@media (max-width: 480px) {
  .ft-panel { top: auto; bottom: 10px; right: 10px; width: 150px; font-size: 11px; }
  .ft-hint { display: none; }
  .ft-target { bottom: 150px; }
}
`;

/**
 * Fitts 定律演示:点击「起点」开始计时,命中「目标」结束。
 * size / distance 为 CSS 变量型参数(经 DemoStage 注入 .demo-stage),demo 不订阅;
 * 计时与错误统计由 demo 本地状态驱动,难度指数按 Shannon 形式 ID=log2(2D/W) 本地实算。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [phase, setPhase] = useState<"idle" | "aiming">("idle");
  const [lastMs, setLastMs] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [misses, setMisses] = useState(0);
  const [flash, setFlash] = useState(false);
  const t0 = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const size = store.get("size") as number;
  const distance = store.get("distance") as number;
  const id = Math.log2((2 * distance) / size);

  const startRun = () => {
    t0.current = performance.now();
    setPhase("aiming");
  };

  const hit = () => {
    if (phase !== "aiming") return;
    const ms = performance.now() - t0.current;
    setLastMs(ms);
    setResults((r) => [{ size, distance, ms }, ...r].slice(0, 4));
    setPhase("idle");
  };

  const miss = () => {
    if (phase !== "aiming") return;
    setMisses((m) => m + 1);
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 500);
    timers.current.push(t);
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ft-field" data-phase={phase} onClick={miss}>
        <button type="button" className="ft-start" onClick={(e) => { e.stopPropagation(); startRun(); }}>
          {phase === "aiming" ? "移动!Go!" : "起点 Start"}
        </button>
        <button
          type="button"
          className="ft-target"
          data-running={phase === "aiming"}
          onClick={(e) => { e.stopPropagation(); hit(); }}
        >
          目标
          <br />
          Target
        </button>
        <span className="ft-miss" data-flash={flash}>MISS ✕</span>

        <dl className="ft-panel" onClick={(e) => e.stopPropagation()}>
          <dt>上次耗时 Last</dt>
          <dd>{lastMs == null ? "—" : `${Math.round(lastMs)} ms`}</dd>
          <dt>难度指数 ID = log₂(2D/W)</dt>
          <dd>{id.toFixed(2)} bit</dd>
          <dt>脱靶 Misses</dt>
          <dd>{misses}</dd>
          {results.length > 0 && (
            <>
              <dt>最近成绩 Recent</dt>
              <ul className="ft-log">
                {results.map((r, i) => (
                  <li key={i}>
                    {r.size}px @{r.distance}px → {Math.round(r.ms)}ms
                  </li>
                ))}
              </ul>
            </>
          )}
        </dl>

        <p className="ft-hint">
          点击起点后尽快命中目标;把 size 调小、distance 调大,感受耗时与脱靶如何上升。
          Click Start, then hit the target. Shrink size and stretch distance to feel time and misses climb.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
