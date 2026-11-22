import { useCallback, useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface Stats {
  /** N -> 已记录反应时 */
  rt: Record<number, number[]>;
  errors: number;
}

const css = `
.hk-field { position: absolute; inset: 0; }
.hk-target {
  position: absolute;
  width: 56px;
  height: 56px;
  margin: -28px 0 0 -28px;
  border: 1px solid oklch(0.55 0 0 / 0.4);
  border-radius: 50%;
  background: oklch(0.92 0.01 250);
  color: oklch(0.35 0.02 250);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.12s ease;
}
.hk-target[data-active="true"] {
  opacity: 1;
  border: 3px solid oklch(0.5 0.15 150);
  background: oklch(0.85 0.13 150);
  color: oklch(0.28 0.07 150);
}
.hk-target[data-active="true"]::after {
  content: "点我 Hit";
  position: absolute;
  left: 50%;
  top: -22px;
  translate: -50% 0;
  font-size: 10px;
  white-space: nowrap;
  color: oklch(0.4 0.1 150);
}
.hk-status {
  position: absolute;
  left: 14px;
  top: 36px;
  font-size: 13px;
  font-weight: 650;
}
.hk-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 178px;
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
}
.hk-panel dt { opacity: 0.6; }
.hk-panel dd { margin: 0 0 4px; font-weight: 650; font-variant-numeric: tabular-nums; }
.hk-table {
  margin: 4px 0 0;
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.hk-table td { padding: 1px 2px; border-top: 1px solid oklch(0.5 0 0 / 0.15); }
.hk-table td:last-child, .hk-table td:nth-child(2) { text-align: right; }
.hk-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 42%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .hk-panel { top: auto; bottom: 10px; right: 10px; width: 150px; font-size: 11px; }
  .hk-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hk-target { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [choices, setChoices] = useState(() => store.get("choices") as number);
  const [pause, setPause] = useState(() => store.get("pause") as number);
  const [active, setActive] = useState(-1);
  const [lastRt, setLastRt] = useState<number | null>(null);
  const [stats, setStats] = useState<Stats>({ rt: {}, errors: 0 });
  const t0 = useRef(0);
  const timer = useRef(0);
  const stateRef = useRef({ choices, active: -1 });

  stateRef.current = { choices, active };

  useEffect(
    () =>
      store.subscribe(() => {
        setChoices(store.get("choices") as number);
        setPause(store.get("pause") as number);
      }),
    [store],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const nextRound = useCallback(
    (n: number) => {
      if (n < 2) return;
      timer.current = window.setTimeout(() => {
        const next = Math.floor(Math.random() * n);
        t0.current = performance.now();
        stateRef.current.active = next;
        setActive(next);
      }, pause);
    },
    [pause],
  );

  const hit = (i: number) => {
    if (i !== stateRef.current.active) {
      setStats((s) => ({ ...s, errors: s.errors + 1 }));
      return;
    }
    if (i < 0) return;
    const ms = performance.now() - t0.current;
    setLastRt(ms);
    setActive(-1);
    stateRef.current.active = -1;
    setStats((s) => ({
      ...s,
      rt: { ...s.rt, [choices]: [...(s.rt[choices] ?? []), ms] },
    }));
    nextRound(choices);
  };

  const median = (arr: number[]) => {
    const a = [...arr].sort((x, y) => x - y);
    const mid = Math.floor(a.length / 2);
    return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
  };

  const ns = Object.keys(stats.rt).map(Number).sort((a, b) => a - b);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="hk-field">
        <p className="hk-status">
          {lastRt == null ? "点击高亮目标 Click the highlighted target" : `上次 ${Math.round(lastRt)} ms`}
        </p>
        <div className="hk-ring" style={{ position: "relative", width: "min(240px, 60%)", aspectRatio: "1", margin: "40px auto 0" }}>
          {Array.from({ length: choices }, (_, i) => {
            const angle = ((360 / choices) * i - 90) * (Math.PI / 180);
            const x = 50 + 42 * Math.cos(angle);
            const y = 50 + 42 * Math.sin(angle);
            return (
              <button
                key={i}
                type="button"
                className="hk-target"
                data-active={active === i}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => hit(i)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <dl className="hk-panel">
          <dt>上次反应时 Last RT</dt>
          <dd>{lastRt == null ? "—" : `${Math.round(lastRt)} ms`}</dd>
          <dt>误点 Errors</dt>
          <dd>{stats.errors}</dd>
          {ns.length > 0 && (
            <>
              <dt>按 N 统计中位 RT / 样本</dt>
              <table className="hk-table">
                <tbody>
                  {ns.map((n) => (
                    <tr key={n}>
                      <td>N={n}</td>
                      <td>{Math.round(median(stats.rt[n]))}ms</td>
                      <td>n={stats.rt[n].length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </dl>

        <p className="hk-hint">
          先在 N=2 打 5 轮,再把 choices 拉到 N=8 打 5 轮,对比中位反应时——选项翻倍,决策变慢。
          Run 5 rounds at N=2, then N=8, and compare median RTs.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
