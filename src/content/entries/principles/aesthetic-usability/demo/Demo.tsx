import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Side = "plain" | "refined";

interface Trial {
  started: boolean;
  startedAt: number | null;
  done: boolean;
  doneAt: number | null;
  misclicks: number;
  pending: boolean;
}

const freshTrial = (): Trial => ({
  started: false,
  startedAt: null,
  done: false,
  doneAt: null,
  misclicks: 0,
  pending: false,
});

/** 任务目标:第 0 个按钮「查询余额」 */
const MENU = ["查询余额 Balance", "取款 Withdraw", "存款 Deposit", "转账 Transfer"];
const TARGET = 0;
const SLOW_MS = 900;

const css = `
.au-field { position: absolute; inset: 0; }
.au-note {
  position: absolute;
  left: 12px;
  top: 36px;
  max-width: 26%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.65;
}
.au-cards {
  position: absolute;
  left: 50%;
  top: 46%;
  translate: -50% -50%;
  display: flex;
  gap: 18px;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  max-width: calc(100% - 32px);
}
.au-card {
  position: relative;
  width: 236px;
  padding: 14px 16px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 2px;
  background: oklch(1 0 0 / 0.85);
  color: oklch(0.25 0.02 250);
}
.au-card h3 {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.02em;
}
.au-task { margin: 0 0 10px; font-size: 11px; opacity: 0.7; }
.au-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.au-menu button {
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 2px;
  background: transparent;
  padding: 9px 4px;
  font-size: 12px;
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.au-status {
  margin: 10px 0 8px;
  font-size: 11px;
  opacity: 0.75;
  min-height: 1.5em;
}
.au-rate { display: flex; align-items: center; gap: 8px; font-size: 11px; }
.au-rate input[type="range"] { flex: 1; accent-color: oklch(0.5 0.05 250); }
.au-rate b { min-width: 2.4em; text-align: right; }
.au-again {
  margin-top: 8px;
  border: 1px solid oklch(0.5 0 0 / 0.35);
  border-radius: 2px;
  background: transparent;
  padding: 3px 10px;
  font-size: 11px;
  color: inherit;
  cursor: pointer;
}

/* —— 精修 / 高定档:只改装饰层,按钮布局不变 —— */
.au-card[data-beauty="refined"],
.au-card[data-beauty="premium"] {
  border-color: color-mix(in srgb, var(--au-accent) 45%, transparent);
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
.au-card[data-beauty="refined"] h3::after,
.au-card[data-beauty="premium"] h3::after {
  content: "";
  display: block;
  width: 42px;
  height: 3px;
  margin-top: 4px;
  border-radius: 2px;
  background: var(--au-accent);
}
.au-card[data-beauty="refined"] .au-menu button,
.au-card[data-beauty="premium"] .au-menu button {
  border-radius: 8px;
  border-color: color-mix(in srgb, var(--au-accent) 28%, transparent);
}
.au-card[data-beauty="refined"] .au-menu button:hover,
.au-card[data-beauty="premium"] .au-menu button:hover {
  background: color-mix(in srgb, var(--au-accent) 12%, transparent);
}
.au-card[data-beauty="premium"] {
  border-radius: 18px;
  padding-top: 18px;
  padding-bottom: 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
}
.au-card[data-beauty="premium"] h3 { font-size: 14px; }
.au-card[data-beauty="premium"]::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 46px;
  border-radius: 17px 17px 0 0;
  background: linear-gradient(color-mix(in srgb, var(--au-accent) 16%, transparent), transparent);
  pointer-events: none;
}
.au-card[data-beauty="refined"] > *,
.au-card[data-beauty="premium"] > * { position: relative; }

/* 成功态:两侧同样式,只靠 accent 上色 */
.au-menu button[data-done="true"] {
  background: color-mix(in srgb, var(--au-accent) 20%, transparent);
  border-color: var(--au-accent);
  font-weight: 650;
}
.au-menu button[data-pending="true"] { opacity: 0.55; cursor: progress; }

.au-compare {
  position: absolute;
  left: 50%;
  bottom: 10px;
  translate: -50% 0;
  width: min(520px, calc(100% - 32px));
  padding: 8px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  text-align: center;
}
.au-compare .au-cap { display: block; margin-top: 2px; font-size: 10px; opacity: 0.6; }

@media (max-width: 560px) {
  .au-note { display: none; }
  .au-card { width: min(236px, calc(100% - 24px)); }
}
@media (prefers-reduced-motion: reduce) {
  .au-menu button { transition: none; }
}
`;

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [beauty, setBeauty] = useState(() => store.get("beauty") as string);
  const [handicap, setHandicap] = useState(() => store.get("handicap") as string);
  const [trials, setTrials] = useState<Record<Side, Trial>>({
    plain: freshTrial(),
    refined: freshTrial(),
  });
  const [ratings, setRatings] = useState<Record<Side, number>>({ plain: 3, refined: 3 });
  const timers = useRef<number[]>([]);

  useEffect(
    () =>
      store.subscribe(() => {
        setBeauty(store.get("beauty") as string);
        setHandicap(store.get("handicap") as string);
      }),
    [store],
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const runTrial = (side: Side, idx: number) => {
    const t = trials[side];
    if (t.done || t.pending) return;
    const startedAt = t.startedAt ?? performance.now();
    if (idx !== TARGET) {
      setTrials((prev) => ({
        ...prev,
        [side]: { ...prev[side], started: true, startedAt, misclicks: prev[side].misclicks + 1 },
      }));
      return;
    }
    if (handicap === "slow-response") {
      setTrials((prev) => ({ ...prev, [side]: { ...prev[side], started: true, startedAt, pending: true } }));
      const id = window.setTimeout(() => {
        setTrials((prev) => ({
          ...prev,
          [side]: { ...prev[side], done: true, doneAt: performance.now(), pending: false },
        }));
      }, SLOW_MS);
      timers.current.push(id);
      return;
    }
    setTrials((prev) => ({
      ...prev,
      [side]: { ...prev[side], started: true, startedAt, done: true, doneAt: performance.now(), pending: false },
    }));
  };

  const elapsed = (t: Trial) =>
    t.done && t.startedAt !== null && t.doneAt !== null ? Math.round(t.doneAt - t.startedAt) : null;

  const both = trials.plain.done && trials.refined.done;
  const eP = elapsed(trials.plain);
  const eR = elapsed(trials.refined);
  const gapRating = ratings.refined - ratings.plain;
  const gapTime = eP !== null && eR !== null ? eR - eP : null;
  const gapMiss = trials.refined.misclicks - trials.plain.misclicks;

  const card = (side: Side) => {
    const t = trials[side];
    const ms = elapsed(t);
    return (
      <section
        className="au-card"
        data-beauty={side === "refined" ? beauty : undefined}
        aria-label={side === "plain" ? "素坯终端 ATM-A" : "精修终端 ATM-B"}
      >
        <h3>{side === "plain" ? "素坯终端 ATM-A" : "精修终端 ATM-B"}</h3>
        <p className="au-task">任务 Task:查询余额 Balance check</p>
        <div className="au-menu">
          {MENU.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => runTrial(side, i)}
              data-done={i === TARGET && t.done ? "true" : undefined}
              data-pending={i === TARGET && t.pending ? "true" : undefined}
              style={handicap === "small-target" ? { padding: "2px 4px", fontSize: 10 } : undefined}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="au-status" aria-live="polite">
          {t.pending
            ? `处理中…(迟缓反馈 ${SLOW_MS}ms)`
            : t.done
              ? `已完成 ✓ 用时 ${ms} ms · 误点 ${t.misclicks}`
              : `用时 — ms · 误点 ${t.misclicks}`}
        </p>
        <label className="au-rate">
          <span>感知易用性</span>
          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={ratings[side]}
            onChange={(e) => setRatings((r) => ({ ...r, [side]: Number(e.target.value) }))}
          />
          <b>{ratings[side]}/7</b>
        </label>
        <button type="button" className="au-again" onClick={() => setTrials((p) => ({ ...p, [side]: freshTrial() }))}>
          重测 Retry
        </button>
      </section>
    );
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="au-field">
        <p className="au-note">
          Kurosu &amp; Kashimura(1995):26 种 ATM 界面 × 252 人。先完成两侧任务,再分别打感知分——
          看感知分差与实测差异谁更偏心美观。
          Kurosu &amp; Kashimura (1995): 26 ATM layouts × 252 participants. Finish both tasks, rate both, and see which gap favors the pretty one.
        </p>
        <div className="au-cards">{card("plain")}{card("refined")}</div>
        <div className="au-compare" aria-live="polite">
          {both ? (
            <>
              感知分差 {gapRating >= 0 ? "+" : ""}
              {gapRating} · 实测用时差 {gapTime} ms(负=精修更快)· 误点差 {gapMiss}
              <span className="au-cap">
                对照实验结论:感知分差常偏向精修侧,即便实测打平——美观红利(12 补研 §14)。
                Perceived gap usually favors the refined side even when measured performance ties — the aesthetic dividend.
              </span>
            </>
          ) : (
            <>完成两侧任务后,这里给出感知分差 vs 实测差异 / Complete both sides to compare perceived vs measured.</>
          )}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
