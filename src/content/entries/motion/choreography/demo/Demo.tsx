import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Direction = "up" | "down" | "left" | "right" | "fade";
const ITEMS = ["收件箱 Inbox", "日程 Calendar", "备忘 Notes", "待办 Tasks", "归档 Archive"];

/** 进入方向 → 初态位移(fade = 无位移);来源暗示遵循 M3 空间模型 */
const FROM: Record<Direction, string> = {
  up: "translateY(14px)",
  down: "translateY(-14px)",
  left: "translateX(14px)",
  right: "translateX(-14px)",
  fade: "none",
};

const css = `
.ch-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 14px; }
.ch-stage {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  border: 1px solid var(--border); border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 5%, var(--surface));
  display: flex; align-items: center; justify-content: center;
}
.ch-list { display: flex; flex-direction: column; gap: 8px; width: min(320px, calc(100% - 32px)); }
.ch-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-radius: 10px;
  border: 1px solid var(--border); background: var(--surface);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
}
.ch-dot { width: 8px; height: 8px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 70%, transparent); }
.ch-item span { font-size: 13px; }
.ch-in { animation: ch-enter var(--ch-dur, 250ms) cubic-bezier(0, 0, 0, 1) both; }
.ch-out { animation: ch-exit var(--ch-dur, 200ms) cubic-bezier(0.3, 0, 1, 1) both; }
@keyframes ch-enter {
  from { opacity: 0; transform: var(--ch-from); }
  to { opacity: 1; transform: none; }
}
@keyframes ch-exit {
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: var(--ch-from); }
}
.ch-scene[data-reduced="true"] .ch-item { --ch-from: none; }
.ch-readout { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; color: var(--text-dim); }
.ch-chip {
  padding: 2px 10px; border-radius: 999px; border: 1px solid var(--border);
  background: var(--surface); font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
}
.ch-chip-official { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); color: var(--accent); }
.ch-btn {
  border: 1px solid var(--border); border-radius: 999px; padding: 4px 13px;
  font-size: 12px; cursor: pointer; background: var(--surface); color: inherit;
}
`;

/**
 * 动效编排演示(纯 CSS,零动画库):
 * - stagger(JS 型)→ delay = i × stagger,内联 animation-delay;
 * - direction(JS 型)→ 每项 --ch-from 统一初态位移(fade 无位移);
 * - 入场 250ms std-decel cubic-bezier(0,0,0,1) / 退场 200ms std-accel cubic-bezier(0.3,0,1,1)
 *   = M3 官方配对表(调研 04§1.4),退场按反向序交错;
 * - reduced-motion:去掉位移(--ch-from: none),纯 opacity 交错淡入。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({ stagger: store.get("stagger") as number, direction: store.get("direction") as Direction });
  const [params, setParams] = useState(readParams);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [nonce, setNonce] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
        setPhase("in");
        setNonce((n) => n + 1);
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const n = ITEMS.length;
  const spread = params.stagger * (n - 1);
  const play = (p: "in" | "out") => {
    setPhase(p);
    setNonce((k) => k + 1);
  };

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ch-scene" data-reduced={reduced}>
        <div className="ch-stage">
          <ul className="ch-list" aria-label="编排演示列表 Choreography demo list">
            {ITEMS.map((label, i) => (
              <li
                key={`${phase}-${nonce}-${i}`}
                className={`ch-item ${phase === "in" ? "ch-in" : "ch-out"}`}
                style={{
                  ["--ch-from" as string]: FROM[params.direction] ?? FROM.up,
                  ["--ch-dur" as string]: phase === "in" ? "250ms" : "200ms",
                  // 退场反向交错:最后一项先走
                  animationDelay: `${(phase === "in" ? i : n - 1 - i) * params.stagger}ms`,
                }}
              >
                <span className="ch-dot" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ch-readout">
          <button type="button" className="ch-btn" onClick={() => play("in")}>播放入场 Enter</button>
          <button type="button" className="ch-btn" onClick={() => play("out")}>播放退场 Exit</button>
          <span className="ch-chip">delay = i × {params.stagger}ms</span>
          <span className="ch-chip">spread = {params.stagger} × {n - 1} = {spread}ms</span>
          <span className="ch-chip ch-chip-official">
            入 250ms std-decel / 出 200ms std-accel(官方配对)
          </span>
          <span className="ch-chip">direction: {params.direction}</span>
          {reduced && <span className="ch-chip">reduced-motion: 纯 opacity 交错淡入 / opacity-only stagger</span>}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
