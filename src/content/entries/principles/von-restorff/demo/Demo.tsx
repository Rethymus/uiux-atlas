import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const SHOW_MS = 2500;

const css = `
.vr-field { position: absolute; inset: 0; }
.vr-grid {
  position: absolute;
  left: 50%;
  top: 44%;
  translate: -50% -50%;
  display: grid;
  grid-template-columns: repeat(4, 56px);
  gap: 10px;
}
.vr-tile {
  width: 56px;
  height: 56px;
  border: 0;
  border-radius: 10px;
  background: oklch(0.6 0 0 / 0.45);
  cursor: pointer;
  padding: 0;
}
.vr-tile[data-masked="true"] { background: oklch(0.75 0 0 / 0.4); cursor: default; }
.vr-tile[data-odd="true"][data-cue="color"] { background: oklch(0.58 0.17 300); }
.vr-tile[data-odd="true"][data-cue="shape"] { border-radius: 50%; background: oklch(0.6 0 0 / 0.55); }
.vr-tile[data-odd="true"][data-cue="motion"] { animation: vr-pulse 1.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .vr-tile[data-odd="true"][data-cue="motion"] {
    animation: none;
    outline: 3px solid oklch(0.58 0.17 300);
    outline-offset: 2px;
  }
}
@keyframes vr-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}
.vr-status {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 34%;
  font-size: 13px;
  font-weight: 650;
  line-height: 1.6;
}
.vr-score {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 168px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.8;
  font-variant-numeric: tabular-nums;
}
.vr-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@media (max-width: 480px) {
  .vr-score { display: none; }
  .vr-grid { grid-template-columns: repeat(4, 48px); }
  .vr-tile { width: 48px; height: 48px; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tiles, setTiles] = useState(() => store.get("tiles") as number);
  const [cue, setCue] = useState(() => store.get("cue") as string);
  const [phase, setPhase] = useState<"idle" | "show" | "mask">("idle");
  const [oddIndex, setOddIndex] = useState(-1);
  const [feedback, setFeedback] = useState<null | { ok: boolean; at: number }>(null);
  const [stats, setStats] = useState<Record<string, { ok: number; total: number }>>({ color: { ok: 0, total: 0 }, shape: { ok: 0, total: 0 }, motion: { ok: 0, total: 0 } });
  const timers = useRef<number[]>([]);
  const cueRef = useRef(cue);

  cueRef.current = cue;

  useEffect(
    () =>
      store.subscribe(() => {
        setTiles(store.get("tiles") as number);
        setCue(store.get("cue") as string);
      }),
    [store],
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const start = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setFeedback(null);
    setOddIndex(Math.floor(Math.random() * tiles));
    setPhase("show");
    const t = window.setTimeout(() => setPhase("mask"), SHOW_MS);
    timers.current.push(t);
  };

  const answer = (i: number) => {
    if (phase !== "mask" || feedback) return;
    const ok = i === oddIndex;
    setFeedback({ ok, at: i });
    setStats((s) => ({
      ...s,
      [cueRef.current]: { ok: s[cueRef.current].ok + (ok ? 1 : 0), total: s[cueRef.current].total + 1 },
    }));
    const t = window.setTimeout(start, 1200);
    timers.current.push(t);
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="vr-field">
        <p className="vr-status">
          {phase === "idle" && (
            <>
              记住那个「不一样」的块
              <br />
              <button type="button" onClick={start} style={{ marginTop: 8, border: 0, borderRadius: 9, padding: "7px 16px", background: "oklch(0.55 0.13 250)", color: "#fff", cursor: "pointer", fontSize: 13 }}>
                开始一轮 Start
              </button>
            </>
          )}
          {phase === "show" && "仔细看… Watch closely…"}
          {phase === "mask" && !feedback && "哪个位置不一样? Which position was different?"}
          {feedback && (
            <span style={{ color: feedback.ok ? "oklch(0.45 0.13 150)" : "oklch(0.55 0.19 25)" }}>
              {feedback.ok ? "✔ 正确 Correct" : "✕ 错了 Wrong"} — 下一轮…
            </span>
          )}
        </p>

        <div className="vr-grid" style={{ gridTemplateColumns: `repeat(${Math.max(2, Math.ceil(tiles / 4))}, 56px)` }} role="group" aria-label="异类记忆网格 Oddball memory grid">
          {Array.from({ length: tiles }, (_, i) => (
            <button
              key={i}
              type="button"
              className="vr-tile"
              data-cue={cue}
              data-odd={phase === "show" && i === oddIndex}
              data-masked={phase === "mask"}
              aria-label={phase === "mask" ? `位置 ${i + 1}` : undefined}
              onClick={() => answer(i)}
            />
          ))}
        </div>

        <aside className="vr-score">
          <b>按线索统计 By cue</b>
          {Object.entries(stats).map(([k, v]) => (
            <p key={k} style={{ margin: 0 }}>
              {k === cue ? "▶ " : ""}
              {k}: {v.ok}/{v.total}
            </p>
          ))}
        </aside>

        <p className="vr-hint">
          展示 2.5 秒后全部遮罩;分别用三种线索各打几轮,对比记忆命中率——与众不同者最容易被记住。
          Watch 2.5s, then all mask. Play a few rounds per cue and compare — the different one is remembered.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
