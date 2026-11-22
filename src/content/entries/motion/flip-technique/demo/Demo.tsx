import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type Phase = "idle" | "first" | "last" | "invert" | "play" | "done";

interface FlipMetrics {
  dx: number;
  dy: number;
  scale: number;
}

const TILE_COUNT = 6;

const TILE_BG = [
  "linear-gradient(135deg, oklch(0.68 0.13 250), oklch(0.5 0.15 262))",
  "linear-gradient(135deg, oklch(0.72 0.13 165), oklch(0.52 0.14 172))",
  "linear-gradient(135deg, oklch(0.74 0.13 60), oklch(0.56 0.15 48))",
  "linear-gradient(135deg, oklch(0.66 0.14 305), oklch(0.5 0.15 318))",
  "linear-gradient(135deg, oklch(0.7 0.13 12), oklch(0.52 0.15 22))",
  "linear-gradient(135deg, oklch(0.68 0.12 200), oklch(0.5 0.13 212))",
];

const PHASE_LABEL: Record<Phase, string> = {
  idle: "待命 idle",
  first: "① First 记录初态",
  last: "② Last 到达终态",
  invert: "③ Invert 反向抵消",
  play: "④ Play 播放归零",
  done: "完成 done",
};

const css = `
.demo-stage {
  --flip-duration: 350ms;
  --flip-ease: cubic-bezier(0.2, 0.7, 0.3, 1);
}
.ft-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 18px 20px; overflow: hidden; }
.ft-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;
}
.ft-tile {
  position: relative;
  border: 0;
  border-radius: 12px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}
.ft-tile[data-hero="true"] { grid-column: span 2; }
.ft-tile:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ft-readout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  font-size: 12px;
  color: var(--text-dim);
}
.ft-chip {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-variant-numeric: tabular-nums;
}
.ft-chip-accent { border-color: var(--accent); color: var(--accent); }
.ft-actions { display: flex; align-items: center; gap: 10px; }
.ft-btn {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.ft-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.ft-btn:not(:disabled):hover { border-color: var(--accent); color: var(--accent); }
.ft-hint { margin: 0; font-size: 12px; color: var(--text-faint); line-height: 1.5; }
`;

/**
 * FLIP 演示:点击卡片把它移到首位(占 2 列),其余卡片让位。
 * - First:点击瞬间记录全部卡片 getBoundingClientRect(此时布局未变);
 * - Last:提交新顺序(React setState),布局效应器(useLayoutEffect)里量测终态矩形;
 * - Invert:对每张卡写 transform: translate(初-终) scale(初宽/终宽),origin top left,transition:none——视觉上原地不动,但已占据终态布局;
 * - Play:双 rAF 后挂 transition(时长/缓动走参数快照 CSS 变量)并清空 transform,transitionend 清理;
 * - mode=step 时四阶段由「下一步」手动推进,读数面板实时显示主卡反算值;mode=auto 时 First→Last→Invert 同帧完成,只播 Play;
 * - reduced-motion:跳过 Play,Invert 直接清零直出终态。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [mode, setMode] = useState(() => store.get("mode") as string);
  const [order, setOrder] = useState<number[]>(() =>
    Array.from({ length: TILE_COUNT }, (_, i) => i),
  );
  const [pending, setPending] = useState<number[] | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [metrics, setMetrics] = useState<FlipMetrics | null>(null);
  const [reduced, setReduced] = useState(false);

  const tileRefs = useRef(new Map<number, HTMLButtonElement>());
  const firstRects = useRef(new Map<number, DOMRect>());
  const lastRects = useRef(new Map<number, DOMRect>());
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const orderRef = useRef(order);
  orderRef.current = order;
  const pendingRef = useRef(pending);
  pendingRef.current = pending;

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
      }),
    [store],
  );

  // prefers-reduced-motion:matchMedia + change 监听(web.dev 惯例,调研 04§6)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const capture = (map: { current: Map<number, DOMRect> }) => {
    map.current.clear();
    for (const [id, el] of tileRefs.current) {
      map.current.set(id, el.getBoundingClientRect());
    }
  };

  const applyInvert = () => {
    for (const [id, el] of tileRefs.current) {
      const f = firstRects.current.get(id);
      const l = lastRects.current.get(id);
      if (!f || !l) continue;
      const dx = f.left - l.left;
      const dy = f.top - l.top;
      const s = l.width === 0 ? 1 : f.width / l.width;
      el.style.transition = "none";
      el.style.transformOrigin = "top left";
      el.style.transform =
        dx === 0 && dy === 0 && s === 1 ? "" : `translate(${dx}px, ${dy}px) scale(${s})`;
    }
  };

  /** Play:挂快照过渡并清空 transform;reduced-motion 直接清零 */
  const playRef = useRef<() => void>(() => {});
  playRef.current = () => {
    for (const [, el] of tileRefs.current) {
      el.style.transition = reducedRef.current
        ? "none"
        : "transform var(--flip-duration, 350ms) var(--flip-ease, cubic-bezier(0.2, 0.7, 0.3, 1))";
      el.style.transform = "";
    }
    setPhase("play");
    const hero = tileRefs.current.get(orderRef.current[0]);
    if (!hero || reducedRef.current) {
      setPhase("done");
      return;
    }
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      hero.removeEventListener("transitionend", onEnd);
      hero.style.transition = "";
      setPhase("done");
    };
    hero.addEventListener("transitionend", onEnd);
  };

  // Last:DOM 已提交 → 量测终态;auto 模式在此同帧完成 Invert 并自动 Play
  useLayoutEffect(() => {
    if (phase !== "last" || !pendingRef.current) return;
    capture(lastRects);
    const heroId = pendingRef.current[0];
    const f = firstRects.current.get(heroId);
    const l = lastRects.current.get(heroId);
    if (f && l) {
      setMetrics({
        dx: Math.round((f.left - l.left) * 10) / 10,
        dy: Math.round((f.top - l.top) * 10) / 10,
        scale: l.width === 0 ? 1 : Math.round((f.width / l.width) * 1000) / 1000,
      });
    }
    if (modeRef.current === "auto") {
      applyInvert();
      setPhase("invert");
      // 双 rAF:确保 Invert 的样式先上屏,Play 的过渡才成立
      requestAnimationFrame(() => requestAnimationFrame(() => playRef.current()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const beginFlip = (id: number) => {
    if (phase !== "idle" && phase !== "done") return;
    const cur = orderRef.current;
    if (cur[0] === id) return;
    capture(firstRects); // First:布局未变时记录
    const next = [id, ...cur.filter((x) => x !== id)];
    setMetrics(null);
    setPending(next);
    pendingRef.current = next;
    if (modeRef.current === "step") {
      setPhase("first");
    } else {
      setOrder(next); // Last 由 useLayoutEffect 接手
      setPhase("last");
    }
  };

  const stepNext = () => {
    if (phase === "first" && pendingRef.current) {
      setOrder(pendingRef.current); // Last:布局跳到终态
      setPhase("last");
      return;
    }
    if (phase === "last") {
      applyInvert(); // Invert:反向 transform 抵消位移(视觉归位)
      setPhase("invert");
      return;
    }
    if (phase === "invert") {
      playRef.current(); // Play:过渡归零
    }
  };

  const reset = () => {
    for (const [, el] of tileRefs.current) {
      el.style.transition = "none";
      el.style.transform = "";
    }
    setOrder(Array.from({ length: TILE_COUNT }, (_, i) => i));
    setPending(null);
    pendingRef.current = null;
    setMetrics(null);
    setPhase("idle");
  };

  const hero = order[0];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ft-stage">
        <div className="ft-grid">
          {order.map((id) => (
            <button
              key={id}
              type="button"
              ref={(el) => {
                if (el) tileRefs.current.set(id, el);
                else tileRefs.current.delete(id);
              }}
              className="ft-tile"
              data-hero={id === hero ? "true" : undefined}
              style={{ background: TILE_BG[id] }}
              onClick={() => beginFlip(id)}
              aria-label={`卡片 ${id + 1}:移到首位并放大 / tile ${id + 1}: move to front and enlarge`}
            >
              {`#${id + 1}`}
            </button>
          ))}
        </div>
        <div className="ft-readout">
          <span className="ft-chip ft-chip-accent">{PHASE_LABEL[phase]}</span>
          {metrics && (
            <>
              <span className="ft-chip">dx {metrics.dx} px</span>
              <span className="ft-chip">dy {metrics.dy} px</span>
              <span className="ft-chip">scale {metrics.scale}</span>
            </>
          )}
          {reduced && <span className="ft-chip">reduced-motion: 跳过 Play 直出终态 / Play skipped</span>}
        </div>
        <div className="ft-actions">
          {mode === "step" ? (
            <button
              type="button"
              className="ft-btn"
              onClick={stepNext}
              disabled={phase === "idle" || phase === "done" || phase === "play"}
            >
              下一步 Step
            </button>
          ) : null}
          <button
            type="button"
            className="ft-btn"
            onClick={reset}
            disabled={phase === "first" || phase === "last" || phase === "invert"}
          >
            重置 Reset
          </button>
        </div>
        <p className="ft-hint">
          点击任意卡片 = FLIP 重排(它移到首位并放大,其余让位);step 模式用「下一步」逐阶段走
          First→Last→Invert→Play,读数是主卡的反算值 dx = 初态.left − 终态.left、scale = 初态宽 ÷ 终态宽 /
          click any tile to FLIP-reorder (it moves to the front and enlarges); in step mode walk First→Last→Invert→Play
          one phase per click — the readout shows the hero's dx, dy and scale.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
