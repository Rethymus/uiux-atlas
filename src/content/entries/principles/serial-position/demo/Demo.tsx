import { useEffect, useMemo, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const WORD_POOL = [
  "苹果", "铅笔", "电台", "窗帘", "木桥", "汽笛", "帆船", "镜子",
  "灯塔", "枕头", "邮票", "风筝",
];

const css = `
.sp-field { position: absolute; inset: 0; }
.sp-stage {
  position: absolute;
  left: 50%;
  top: 38%;
  translate: -50% -50%;
  width: min(420px, calc(100% - 200px));
  min-height: 120px;
  display: grid;
  place-items: center;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 14px;
  background: oklch(1 0 0 / 0.8);
  font-size: 26px;
  font-weight: 700;
  padding: 10px;
}
.sp-progress { font-size: 11px; opacity: 0.55; font-weight: 400; margin-top: 6px; }
.sp-recall {
  position: absolute;
  left: 50%;
  bottom: 56px;
  translate: -50% 0;
  width: min(420px, calc(100% - 200px));
  display: flex;
  gap: 8px;
}
.sp-input {
  flex: 1;
  border: 1px solid oklch(0.5 0 0 / 0.4);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
}
.sp-btn {
  border: 0;
  border-radius: 10px;
  padding: 8px 16px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.sp-btn[disabled] { opacity: 0.45; cursor: default; }
.sp-chart {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 190px;
  padding: 10px 12px 6px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 11px;
}
.sp-chart h4 { margin: 0 0 4px; font-size: 12px; }
.sp-nums { font-variant-numeric: tabular-nums; line-height: 1.6; margin: 4px 0 0; }
.sp-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.sp-live {
  position: absolute;
  left: -9999px;
  width: 1px; height: 1px; overflow: hidden;
}
@media (max-width: 480px) {
  .sp-chart { display: none; }
  .sp-stage, .sp-recall { width: calc(100% - 24px); }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [items, setItems] = useState(() => store.get("items") as number);
  const [dwell, setDwell] = useState(() => store.get("dwell") as number);
  const [phase, setPhase] = useState<"idle" | "run" | "recall" | "scored">("idle");
  const [current, setCurrent] = useState<{ word: string; idx: number } | null>(null);
  const [seq, setSeq] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [hits, setHits] = useState<boolean[]>([]);
  const [tally, setTally] = useState<number[]>([]);
  const [rounds, setRounds] = useState(0);
  const timers = useRef<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setItems(store.get("items") as number);
        setDwell(store.get("dwell") as number);
      }),
    [store],
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const start = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    const pool = [...WORD_POOL].sort(() => Math.random() - 0.5).slice(0, items);
    setSeq(pool);
    setAnswer("");
    setHits([]);
    setPhase("run");
    pool.forEach((w, i) => {
      const tShow = window.setTimeout(() => {
        setCurrent({ word: w, idx: i });
        if (liveRef.current) liveRef.current.textContent = `第 ${i + 1} 个:${w}`;
      }, dwell * i);
      timers.current.push(tShow);
    });
    const tEnd = window.setTimeout(() => {
      setCurrent(null);
      setPhase("recall");
      inputRef.current?.focus();
    }, dwell * items);
    timers.current.push(tEnd);
  };

  const grade = () => {
    const typed = answer
      .split(/[\s,，、]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const h = seq.map((w) => typed.includes(w));
    setHits(h);
    setTally((t) => {
      const base = t.length === items ? t : new Array(items).fill(0);
      return base.map((v, i) => v + (h[i] ? 1 : 0));
    });
    setRounds((r) => r + 1);
    setPhase("scored");
  };

  const resetTally = () => {
    setTally([]);
    setRounds(0);
  };

  const maxTally = Math.max(1, ...tally);
  const chartW = 166;
  const barW = chartW / Math.max(items, 1) - 4;

  const positions = useMemo(() => Array.from({ length: items }, (_, i) => i), [items]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="sp-field">
        <div className="sp-stage">
          {phase === "idle" && (
            <button type="button" className="sp-btn" onClick={start}>
              开始一轮 Start
            </button>
          )}
          {phase === "run" && current && (
            <span>
              {current.word}
              <span className="sp-progress">
                {current.idx + 1} / {items}
              </span>
            </span>
          )}
          {phase === "recall" && <span style={{ fontSize: 14, opacity: 0.6 }}>凭记忆输入(任意顺序,空格分隔)</span>}
          {phase === "scored" && (
            <span style={{ fontSize: 14 }}>
              命中 {hits.filter(Boolean).length}/{items} ·{" "}
              <button type="button" className="sp-btn" onClick={start} style={{ padding: "4px 12px" }}>
                再来一轮 Again
              </button>
            </span>
          )}
        </div>

        <div className="sp-recall">
          {(phase === "recall" || phase === "scored") && (
            <>
              <label htmlFor="sp-in" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                你记得的词 Words you recall
              </label>
              <input
                id="sp-in"
                ref={inputRef}
                className="sp-input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && phase === "recall" && grade()}
                placeholder="如:苹果 灯塔 …"
              />
              {phase === "recall" && (
                <button type="button" className="sp-btn" onClick={grade}>
                  记分 Score
                </button>
              )}
            </>
          )}
        </div>

        <aside className="sp-chart">
          <h4>按位置命中(累计 {rounds} 轮)</h4>
          <svg width="100%" viewBox={`0 0 ${chartW} 70`} role="img" aria-label="各位置命中次数柱状图">
            {positions.map((i) => {
              const h = (tally[i] ?? 0) / maxTally * 46;
              return (
                <g key={i}>
                  <rect x={i * (barW + 4)} y={50 - h} width={barW} height={Math.max(h, 1)} rx="2" fill="oklch(0.55 0.13 250)" />
                  <text x={i * (barW + 4) + barW / 2} y={64} textAnchor="middle" fontSize="8" fill="oklch(0.4 0 0)">
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="sp-nums">
            {tally.length > 0 && positions.map((i) => `P${i + 1}:${tally[i] ?? 0}`).join(" · ")}
          </p>
          {rounds > 0 && (
            <button type="button" className="sp-btn" style={{ background: "oklch(0.5 0 0 / 0.4)", padding: "3px 8px", fontSize: 11 }} onClick={resetTally}>
              清零统计 Reset
            </button>
          )}
        </aside>

        <span ref={liveRef} className="sp-live" aria-live="polite" />

        <p className="sp-hint">
          词语逐个闪现,结束后凭记忆输入;打满 3 轮以上,看右侧柱状图长出「两端高、中间塌」的 U 形。
          Words flash one by one; type back from memory. After 3+ rounds the chart grows a U shape.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
