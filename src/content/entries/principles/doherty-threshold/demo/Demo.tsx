import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type ItemState = "pending" | "working" | "confirming" | "done";

interface Item {
  id: number;
  title: string;
  state: ItemState;
}

const css = `
.demo-stage { --dt-delay: 700ms; }
.dt-field { position: absolute; inset: 0; }
.dt-queue {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: min(300px, calc(100% - 210px));
  display: grid;
  gap: 8px;
}
.dt-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 10px;
  background: oklch(1 0 0 / 0.8);
  font-size: 12.5px;
}
.dt-item[data-state="done"] { border-color: oklch(0.6 0.12 150); background: oklch(0.95 0.04 150); }
.dt-item[data-state="working"] { opacity: 0.75; }
.dt-title { flex: 1; }
.dt-approve {
  border: 0;
  border-radius: 8px;
  padding: 5px 12px;
  background: oklch(0.55 0.13 250);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  min-width: 74px;
}
.dt-approve[disabled] { opacity: 0.5; cursor: default; }
.dt-badge {
  font-size: 11px;
  color: oklch(0.45 0.1 150);
  white-space: nowrap;
}
.dt-skel {
  flex: 1;
  height: 14px;
  border-radius: 6px;
  background: linear-gradient(90deg, oklch(0.9 0.01 250) 25%, oklch(0.97 0.005 250) 50%, oklch(0.9 0.01 250) 75%);
  background-size: 200% 100%;
  animation: dt-shimmer 1.1s linear infinite;
}
.dt-panel {
  position: absolute;
  right: 12px;
  top: 34px;
  width: 172px;
  padding: 10px 12px;
  border: 1px solid oklch(0.5 0 0 / 0.25);
  border-radius: 12px;
  background: oklch(1 0 0 / 0.72);
  font-size: 12px;
  line-height: 1.7;
  font-variant-numeric: tabular-nums;
}
.dt-threshold { font-weight: 700; }
.dt-threshold[data-ok="true"] { color: oklch(0.45 0.13 150); }
.dt-threshold[data-ok="false"] { color: oklch(0.55 0.19 25); }
.dt-live {
  position: absolute;
  left: -9999px;
  width: 1px; height: 1px; overflow: hidden;
}
.dt-hint {
  position: absolute;
  left: 12px;
  bottom: 10px;
  max-width: 34%;
  font-size: 11px;
  line-height: 1.5;
  opacity: 0.6;
}
@keyframes dt-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .dt-skel { animation: none; }
}
@media (max-width: 480px) {
  .dt-panel { display: none; }
  .dt-queue { width: calc(100% - 24px); }
}
`;

const INITIAL: Item[] = [
  { id: 1, title: "报销单 #A-1024", state: "pending" },
  { id: 2, title: "合同会签 #C-208", state: "pending" },
  { id: 3, title: "采购申请 #P-77", state: "pending" },
  { id: 4, title: "休假审批 #L-51", state: "pending" },
  { id: 5, title: "设备领用 #E-9", state: "pending" },
];

export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [feedback, setFeedback] = useState(() => store.get("feedback") as string);
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [doneCount, setDoneCount] = useState(0);
  const [lastMs, setLastMs] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setFeedback(store.get("feedback") as string);
      }),
    [store],
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const delay = store.get("delay") as number;

  const announce = (msg: string) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  };

  const approve = (id: number) => {
    if (delay <= 0) {
      setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "done" } : it)));
      setDoneCount((c) => c + 1);
      setLastMs(0);
      announce("已批准,零延迟");
      return;
    }
    const t0 = performance.now();
    if (feedback === "optimistic") {
      // 阶段 1:立即标记完成(乐观);阶段 2:后台确认,失败回滚(demo 里恒确认成功)
      setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "confirming" } : it)));
      announce("已标记完成,后台确认中");
      const t = window.setTimeout(() => {
        setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "done" } : it)));
        setDoneCount((c) => c + 1);
        setLastMs(performance.now() - t0);
        announce("后台确认完成");
      }, delay);
      timers.current.push(t);
    } else if (feedback === "skeleton") {
      setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "working" } : it)));
      announce("处理中");
      const t = window.setTimeout(() => {
        setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "done" } : it)));
        setDoneCount((c) => c + 1);
        setLastMs(performance.now() - t0);
        announce("完成");
      }, delay);
      timers.current.push(t);
    } else {
      setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "working" } : it)));
      announce("处理中");
      const t = window.setTimeout(() => {
        setItems((its) => its.map((it) => (it.id === id ? { ...it, state: "done" } : it)));
        setDoneCount((c) => c + 1);
        setLastMs(performance.now() - t0);
        announce("完成");
      }, delay);
      timers.current.push(t);
    }
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setItems(INITIAL);
    setDoneCount(0);
    setLastMs(null);
  };

  const withinThreshold = delay <= 400;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="dt-field">
        <div className="dt-queue" aria-label="审批队列 Approval queue">
          {items.map((it) => (
            <div key={it.id} className="dt-item" data-state={it.state}>
              {it.state === "working" && feedback === "skeleton" ? (
                <>
                  <span className="dt-skel" aria-hidden="true" />
                  <span style={{ fontSize: 11, opacity: 0.7 }}>处理中…</span>
                </>
              ) : (
                <>
                  <span className="dt-title">
                    {it.title}
                    {it.state === "confirming" && <span style={{ fontSize: 11, opacity: 0.65 }}> ✔ 已记录(后台确认中)</span>}
                    {it.state === "working" && feedback !== "skeleton" && <span style={{ fontSize: 11, opacity: 0.65 }}> 处理中…</span>}
                  </span>
                  {it.state === "done" ? (
                    <span className="dt-badge">✔ 已批准</span>
                  ) : (
                    <button
                      type="button"
                      className="dt-approve"
                      disabled={it.state !== "pending"}
                      onClick={() => approve(it.id)}
                    >
                      批准
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
          <button type="button" className="dt-approve" style={{ justifySelf: "start", background: "oklch(0.5 0 0 / 0.35)" }} onClick={reset}>
            重置队列 Reset
          </button>
        </div>

        <span ref={liveRef} className="dt-live" aria-live="polite" />

        <aside className="dt-panel">
          <b>本批统计 This batch</b>
          <p style={{ margin: 0 }}>
            完成数 done: {doneCount}/5
            <br />
            上次延迟 last: {lastMs == null ? "—" : `${Math.round(lastMs)}ms`}
            <br />
            <span className="dt-threshold" data-ok={withinThreshold}>
              {withinThreshold
                ? `✔ ${delay}ms ≤ 400ms · Doherty 达标`
                : `⚠ ${delay}ms > 400ms · 越过阈值`}
            </span>
            <br />
            <span style={{ fontSize: 11, opacity: 0.7 }}>策略 strategy: {feedback}</span>
          </p>
        </aside>

        <p className="dt-hint">
          连点 5 张批准,分别体验三种反馈策略与不同延迟;≤400ms 时节奏明显「跟手」。
          Approve all five under each strategy and latency; ≤400ms feels glued to your hand.
        </p>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
