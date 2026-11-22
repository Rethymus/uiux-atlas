import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type PhaseKey = "skeleton" | "indeterminate" | "percent" | "done";

/** NN/g 阈值驱动的自动时间轴(调研 04§2.2):骨架 <1s → 循环 1–3s → 百分比 3s–total(演示分段值) */
const SKELETON_MS = 1000;
const LOOP_MS = 2000;

const css = `
.demo-stage { --prog-pulse: 1200ms; }
.pm-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px 20px; overflow: hidden; }
.pm-card {
  flex: 1;
  min-height: 0;
  width: min(400px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
}
.pm-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 12px; color: var(--text-dim); }
.pm-reload {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
  white-space: nowrap;
}
.pm-reload:hover { border-color: var(--accent); color: var(--accent); }
.pm-body { flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: center; gap: 12px; }

/* —— 骨架段 —— */
.pm-sk { display: flex; flex-direction: column; gap: 10px; }
.pm-sk-row { display: flex; align-items: center; gap: 12px; }
.pm-sk-avatar { width: 44px; height: 44px; border-radius: 50%; flex: 0 0 auto; }
.pm-sk-line { height: 14px; border-radius: 7px; flex: 1; }
.pm-sk-line.w60 { flex-basis: 60%; }
.pm-sk-block {
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, var(--text-dim) 18%, transparent);
}
.pm-sk-block::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--surface) 70%, transparent), transparent);
  animation: pm-sweep var(--prog-pulse, 1200ms) linear infinite;
}

/* —— 循环扫光段(不确定) —— */
.pm-track { position: relative; height: 8px; border-radius: 999px; background: color-mix(in srgb, var(--text-dim) 18%, transparent); overflow: hidden; }
.pm-loop {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40%;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  transform: translateX(-100%);
  animation: pm-loop var(--prog-pulse, 1200ms) cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.pm-track[data-determinate="true"] { overflow: visible; }
.pm-fill { position: absolute; top: 0; bottom: 0; left: 0; border-radius: 999px; background: var(--accent); }

/* —— 完成段 —— */
.pm-done { display: flex; flex-direction: column; gap: 10px; }
.pm-done-row { display: flex; align-items: center; gap: 12px; }
.pm-done-avatar { width: 44px; height: 44px; border-radius: 50%; flex: 0 0 auto; background: linear-gradient(135deg, oklch(0.7 0.13 165), oklch(0.52 0.13 172)); }
.pm-done-text { flex: 1; display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--text); }
.pm-done-text small { color: var(--text-dim); font-size: 12px; }
.pm-done-block { height: 14px; border-radius: 7px; flex: 1; }
.pm-ready { animation: pm-in 200ms cubic-bezier(0.2, 0, 0, 1) both; }

.pm-readout { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; font-size: 12px; color: var(--text-dim); }
.pm-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.pm-chip-accent { border-color: var(--accent); color: var(--accent); }
.pm-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }

@keyframes pm-sweep { to { transform: translateX(100%); } }
@keyframes pm-loop { to { transform: translateX(350%); } }
@keyframes pm-in { from { opacity: 0; } }

/* reduced-motion:脉动/扫光/淡入全停;数值(百分比/文字)由 rAF 推进,不受影响 */
@media (prefers-reduced-motion: reduce) {
  .pm-sk-block::after, .pm-loop, .pm-ready { animation: none; }
  .pm-sk-block::after { display: none; }
}
`;

/**
 * 进度反馈动效演示:不确定→确定的形态演进(调研 04§2.2 + 补研 12§14)。
 * - auto 时间轴:0–1s 骨架(NN/g:<1s 即时即可、1s+ 必须给指示)→ 1–3s 循环扫光(2–10s 循环动画区间)
 *   → 3s–total 百分比条(≥10s percent-done + 文字说明 + 完成时间估计)→ 完成(内容 200ms M3 Standard 快速淡入);
 * - 确定段 role=progressbar + aria-valuenow 逐帧同步;不确定段不给数值;aria-busy + 状态文字全程兜底;
 * - phase 参数强制固定某形态供对照(percent 档跑完仍完成);
 * - reduced-motion:脉动/扫光/淡入停(CSS 媒体查询),百分比数值与文字照常推进(信息非装饰)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [total, setTotal] = useState(() => store.get("total") as number);
  const [phaseParam, setPhaseParam] = useState(() => store.get("phase") as string);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<PhaseKey>("skeleton");
  const [runId, setRunId] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctTextRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(
    () =>
      store.subscribe(() => {
        setTotal(store.get("total") as number);
        setPhaseParam(store.get("phase") as string);
        setRunId((n) => n + 1); // 参数变化即重跑时间轴,所见即所得
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // rAF 时间轴:只在形态边界 setState,百分比走 ref 直写
  useEffect(() => {
    const start = performance.now();
    let last: PhaseKey | null = null;

    const step = (now: number) => {
      const t = now - start;
      let next: PhaseKey;
      let pct = -1;
      let remainMs = 0;

      if (phaseParam === "skeleton") next = "skeleton";
      else if (phaseParam === "indeterminate") next = "indeterminate";
      else if (phaseParam === "percent") {
        // percent 档:从 0 跑满 total,然后完成
        pct = Math.min(100, (t / total) * 100);
        remainMs = total - t;
        next = pct >= 100 ? "done" : "percent";
      } else {
        // auto:NN/g 阈值分段
        if (t < SKELETON_MS) next = "skeleton";
        else if (t < SKELETON_MS + LOOP_MS) next = "indeterminate";
        else {
          const span = Math.max(1, total - SKELETON_MS - LOOP_MS);
          pct = Math.min(100, ((t - SKELETON_MS - LOOP_MS) / span) * 100);
          remainMs = total - t;
          next = pct >= 100 ? "done" : "percent";
        }
      }

      if (pct >= 0) {
        const clamped = Math.max(0, Math.min(100, pct));
        if (fillRef.current) fillRef.current.style.width = `${clamped}%`;
        if (barRef.current) barRef.current.setAttribute("aria-valuenow", String(Math.round(clamped)));
        if (pctTextRef.current) {
          const remainS = Math.max(0, Math.round(remainMs / 1000));
          pctTextRef.current.textContent = `${Math.round(clamped)}% · 预计还需 ~${remainS}s / ~${remainS}s left`;
        }
      }

      if (next !== last) {
        last = next;
        setPhase(next);
        if (cardRef.current) {
          if (next === "done") cardRef.current.setAttribute("aria-busy", "false");
          else cardRef.current.setAttribute("aria-busy", "true");
        }
      }

      if (next !== "done" && !(phaseParam === "skeleton" && t > SKELETON_MS * 3) && !(phaseParam === "indeterminate" && t > SKELETON_MS * 3)) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (cardRef.current) cardRef.current.setAttribute("aria-busy", "true");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, phaseParam, total]);

  const phaseLabel: Record<PhaseKey, string> = {
    skeleton: "骨架 skeleton · 不确定(什么都不知道)",
    indeterminate: "循环扫光 looped bar · 在加载,但不知要多久",
    percent: "百分比 percent · 知道还剩多少",
    done: "完成 done · 内容快速淡入",
  };

  const thresholdHint =
    phaseParam === "auto"
      ? "0–1s 骨架 → 1–3s 循环(2–10s 区间语义)→ 之后百分比(≥10s 语义)"
      : "强制形态对照 / pinned form for comparison";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="pm-stage">
        <div className="pm-card" ref={cardRef} aria-busy="true">
          <div className="pm-head">
            <span aria-live="polite">
              {phase === "done" ? "加载完成 Done / 加载完成 Done" : phase === "percent" ? (
                <>正在加载 Loading… <span ref={pctTextRef}>0%</span></>
              ) : (
                "正在加载 Loading…"
              )}
            </span>
            <button type="button" className="pm-reload" onClick={() => setRunId((n) => n + 1)}>
              重播 Replay
            </button>
          </div>
          <div className="pm-body">
            {phase === "skeleton" && (
              <div className="pm-sk" aria-hidden="true">
                <div className="pm-sk-row">
                  <div className="pm-sk-avatar pm-sk-block" />
                  <div className="pm-sk-line pm-sk-block" style={{ flexBasis: "42%" }} />
                </div>
                <div className="pm-sk-line pm-sk-block" style={{ flexBasis: "88%" }} />
                <div className="pm-sk-line pm-sk-block w60" />
              </div>
            )}
            {(phase === "indeterminate" || phase === "percent") && (
              <div>
                <div
                  className="pm-track"
                  data-determinate={phase === "percent" ? "true" : undefined}
                  role={phase === "percent" ? "progressbar" : undefined}
                  aria-valuemin={phase === "percent" ? 0 : undefined}
                  aria-valuemax={phase === "percent" ? 100 : undefined}
                  aria-valuenow={phase === "percent" ? 0 : undefined}
                  ref={barRef}
                >
                  {phase === "indeterminate" ? <div className="pm-loop" /> : <div className="pm-fill" ref={fillRef} style={{ width: "0%" }} />}
                </div>
              </div>
            )}
            {phase === "done" && (
              <div className={`pm-done${reduced ? "" : " pm-ready"}`}>
                <div className="pm-done-row">
                  <div className="pm-done-avatar" aria-hidden="true" />
                  <div className="pm-done-text">
                    <strong>内容已就绪 Content ready</strong>
                    <small>骨架 → 循环 → 百分比 → 快速淡入,形态随确定性演进 / forms evolve as certainty grows</small>
                    <div className="pm-done-block" style={{ background: "color-mix(in srgb, var(--text-dim) 14%, transparent)" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pm-readout">
          <span className="pm-chip pm-chip-accent">{phaseLabel[phase]}</span>
          <span className="pm-chip">total {total / 1000}s · pulse 1200ms</span>
          <span className="pm-chip">{thresholdHint}</span>
          {reduced && <span className="pm-chip">reduced-motion: 动画停、数值照走 / motion off, values on</span>}
        </div>
        <p className="pm-hint">
          NN/g 阈值编排:&lt;1s 即时状态即可、1s+ 必须给指示、循环动画适合 2–10s、≥10s 用百分比 + 文字 + 完成时间估计;不确定段不编造
          aria-valuenow,确定段才同步数值。目标梯度效应:越接近终点,收尾的确定感越重要 / NN/g orchestration: instant under 1s, an
          indicator past 1s, loops for 2–10s, percent + text + ETA at 10s+; the indeterminate phase invents no aria-valuenow, the
          determinate one syncs it. Goal-gradient: near the end, certainty is the motivator.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
