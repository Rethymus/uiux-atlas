import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

interface CountParams {
  duration: number;
  endValue: number;
  decimals: string;
}

const easeOutCubic = (p: number): number => 1 - Math.pow(1 - p, 3);

function formatValue(v: number, decimals: number): string {
  return v.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const css = `
.cu-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.cu-card {
  width: min(360px, 100%);
  padding: 26px 28px 22px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  text-align: center;
}
.cu-label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.cu-value {
  margin-top: 10px;
  font-size: 54px;
  line-height: 1.1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text);
}
.cu-bar {
  margin: 18px auto 0;
  width: 78%;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border) 55%, transparent);
  overflow: hidden;
}
.cu-bar-inner {
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transform-origin: 0 50%;
  transform: scaleX(0);
}
.cu-actions { margin-top: 16px; }
.cu-replay {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 18px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text);
  background: transparent;
}
.cu-replay:hover { border-color: var(--accent); color: var(--accent); }
.cu-hint { margin: 14px 0 0; font-size: 12px; line-height: 1.6; color: var(--text-faint); }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@media (prefers-reduced-motion: reduce) {
  .cu-bar-inner { transition: none; }
}
`;

/**
 * 数字滚动演示:rAF 按 ease-out cubic 逐帧递增,demo 订阅 store 的
 * duration / endValue / decimals(JS 型参数,无 cssVar)。
 * 数值出处见参数 effect:css-tricks 只给出「时长/缓动/起止值可调 + fill forwards」,
 * 未记载默认数值,1200ms 与 2026 为演示用社区常见值(未证实)。
 * 无障碍按 css-tricks 评论区结论:动画节点 aria-hidden + sr-only 终值;
 * prefers-reduced-motion(web.dev 的 matchMedia + change 监听惯例,调研 04§6.2)直出终值。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = (): CountParams => ({
    duration: store.get("duration") as number,
    endValue: store.get("endValue") as number,
    decimals: store.get("decimals") as string,
  });

  const [params, setParams] = useState<CountParams>(readParams);
  const [display, setDisplay] = useState("0");
  const [runId, setRunId] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  // prefers-reduced-motion 检测:matchMedia + change 监听(web.dev 惯例,调研 04§6.2)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedRef.current = mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const decimals = Number(params.decimals);
    const end = params.endValue;
    if (reducedRef.current) {
      setDisplay(formatValue(end, decimals));
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / params.duration);
      const value = end * easeOutCubic(p);
      setDisplay(formatValue(value, decimals));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // 终帧强制精确终值,避免浮点截断差一点
        setDisplay(formatValue(end, decimals));
        if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [params, runId]);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cu-stage">
        <div className="cu-card">
          <span className="cu-label">年度访客 Annual visitors</span>
          <div className="cu-value" aria-hidden="true">
            {display}
          </div>
          <span className="sr-only">
            {formatValue(params.endValue, Number(params.decimals))}
          </span>
          <div className="cu-bar" aria-hidden="true">
            <div className="cu-bar-inner" ref={barRef} />
          </div>
          <div className="cu-actions">
            <button
              type="button"
              className="cu-replay"
              onClick={() => setRunId((n) => n + 1)}
            >
              重播 Replay
            </button>
          </div>
          <p className="cu-hint">
            改动右侧参数立即重播 / parameter changes replay instantly。
            reduced-motion 时直出终值 / final value under reduced motion。
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
