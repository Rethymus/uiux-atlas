import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.demo-stage {
  --ml-chunk-gap: 0.75em;
}
.ml-wrap {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.ml-card {
  width: min(420px, calc(100% - 220px));
  padding: 20px 24px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 16px;
  background: oklch(1 0 0 / 0.75);
  font-size: 13px;
}
.ml-digits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 14px 0;
  min-height: 44px;
  align-items: center;
}
.ml-digit {
  width: 34px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 10px;
  background: oklch(0.95 0.01 250);
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.ml-digit-group-gap {
  width: var(--ml-chunk-gap);
}
.ml-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.ml-btn {
  border: 0;
  border-radius: 10px;
  padding: 8px 14px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.ml-btn[disabled] { opacity: 0.45; cursor: default; }
.ml-input {
  flex: 1;
  min-width: 140px;
  border: 1px solid oklch(0.5 0 0 / 0.4);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 16px;
  letter-spacing: 0.1em;
}
.ml-score {
  margin: 10px 0 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.ml-cell {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 30px;
  margin-right: 3px;
  border: 1px solid oklch(0.5 0 0 / 0.3);
  border-radius: 6px;
  font-size: 13px;
}
.ml-cell[data-hit="true"] { background: oklch(0.85 0.13 150); border-color: oklch(0.5 0.12 150); }
.ml-cell[data-hit="false"] { background: oklch(0.9 0.1 25 / 0.5); border-color: oklch(0.6 0.18 25); }
.ml-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 38%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
.ml-toolbar {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.6;
}
@media (max-width: 480px) {
  .ml-toolbar { display: none; }
  .ml-card { width: calc(100% - 28px); }
}
`;

type Phase = "idle" | "showing" | "recall" | "scored";

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [digits, setDigits] = useState(() => store.get("digits") as number);
  const [chunk, setChunk] = useState(() => store.get("chunk") as number);
  const [phase, setPhase] = useState<Phase>("idle");
  const [answer, setAnswer] = useState("");
  const [scored, setScored] = useState<{ d: string; hit: boolean }[]>([]);
  const [best, setBest] = useState(0);
  const [showing, setShowing] = useState<string[]>([]);
  const timer = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setDigits(store.get("digits") as number);
        setChunk(store.get("chunk") as number);
      }),
    [store],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const start = () => {
    const pool = "0123456789";
    const s: string[] = [];
    for (let i = 0; i < digits; i++) s.push(pool[Math.floor(Math.random() * 10)]);
    setShowing(s);
    setAnswer("");
    setScored([]);
    setPhase("showing");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setPhase("recall");
      inputRef.current?.focus();
    }, 3000);
  };

  const grade = () => {
    const typed = answer.replace(/\D/g, "").slice(0, digits);
    setScored(showing.map((d, i) => ({ d, hit: typed[i] === d })));
    const hits = showing.filter((d, i) => typed[i] === d).length;
    setBest((b) => Math.max(b, hits));
    setPhase("scored");
  };

  const hits = scored.filter((c) => c.hit).length;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ml-wrap">
        <div className="ml-card">
          <strong>回忆实验 Recall</strong>
          <div className="ml-digits" aria-label="待记忆数字串 Digit string to memorize">
            {phase === "idle" && <span style={{ opacity: 0.6 }}>点「开始一轮」生成数字串 / Press Start to generate</span>}
            {phase === "showing" &&
              showing.map((d, i) => (
                <span key={i} style={{ display: "contents" }}>
                  {i > 0 && chunk >= 1 && i % chunk === 0 && (
                    <span className="ml-digit-group-gap" aria-hidden="true" />
                  )}
                  <span className="ml-digit">{d}</span>
                </span>
              ))}
            {phase === "recall" && <span style={{ opacity: 0.6 }}>凭记忆输入 / Type from memory</span>}
            {phase === "scored" &&
              scored.map((c, i) => (
                <span key={i} className="ml-cell" data-hit={c.hit}>
                  {c.d}
                </span>
              ))}
          </div>
          <div className="ml-actions">
            {phase === "idle" && (
              <button type="button" className="ml-btn" onClick={start}>
                开始一轮 Start
              </button>
            )}
            {phase === "showing" && <span>3 秒后隐藏… hiding in 3s</span>}
            {phase === "recall" && (
              <>
                <label htmlFor="ml-recall" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                  你记得的数字 Digits you recall
                </label>
                <input
                  id="ml-recall"
                  ref={inputRef}
                  className="ml-input"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && grade()}
                  placeholder="如 493020…"
                  inputMode="numeric"
                />
                <button type="button" className="ml-btn" onClick={grade}>
                  记分 Score
                </button>
              </>
            )}
            {phase === "scored" && (
              <>
                <span className="ml-score">
                  命中 {hits}/{digits} · 最佳 best {best}/{digits}
                </span>
                <button type="button" className="ml-btn" onClick={start}>
                  再来一轮 Again
                </button>
              </>
            )}
          </div>
        </div>

        <aside className="ml-toolbar">
          <strong>怎么玩 How to</strong>
          <p style={{ margin: "4px 0 0" }}>
            先把 chunk 设为 0(不分组)打一轮,再把 chunk 调到 3 打一轮——同样的 10 个数字,分块后工作记忆只需持 4 项。
            Set chunk to 0 (unchunked) for one round, then chunk=3 — the same 10 digits become 4 items.
          </p>
        </aside>

        <p className="ml-hint">
          展示固定 3 秒(demo 节奏);按位计分,绿色=命中,红色=错漏。Display is fixed at 3s; per-position scoring.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
