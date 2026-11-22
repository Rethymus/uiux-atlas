import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

type DisplayValue = "auto" | "block" | "swap" | "fallback" | "optional";

/** 周期数值表(ms):web.dev font-best-practices 原文核对(调研 05§21) */
const PERIODS: Record<DisplayValue, { block: number | null; swap: number }> = {
  auto: { block: 100, swap: Number.POSITIVE_INFINITY }, // auto 浏览器自定义;演示按 100ms 处理并在界面标注
  block: { block: 3000, swap: Number.POSITIVE_INFINITY }, // 表给 2–3 秒,演示取上界 3s
  swap: { block: 0, swap: Number.POSITIVE_INFINITY },
  fallback: { block: 100, swap: 3000 },
  optional: { block: 100, swap: 0 },
};

const TIMELINE_MS = 3500;
const REDUCED_FINAL_MS = 3600; // reduced-motion:直接呈现最终结局

type Phase = "block" | "swap" | "loaded" | "failed";

/** 按数值表判定某时刻的相位(纯函数,便于 reduced-motion 一次推进) */
function phaseAt(elapsed: number, display: DisplayValue, delay: number): Phase {
  const { block, swap } = PERIODS[display];
  const B = block ?? 100;
  if (elapsed >= delay && elapsed >= B) return "loaded";
  if (elapsed < B) return "block";
  // elapsed >= B 且字体未到:
  if (swap === 0) return "failed"; // optional:无交换期,直接进入后备常驻(失败语义)
  if (swap !== Number.POSITIVE_INFINITY && elapsed >= B + swap) return "failed";
  return "swap";
}

const css = `
.fd-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.fd-timeline { position: relative; height: 30px; border-radius: 8px; overflow: hidden;
  background: color-mix(in srgb, currentColor 8%, transparent); }
.fd-seg { position: absolute; top: 0; bottom: 0; }
.fd-seg-block { background: repeating-linear-gradient(45deg,
  color-mix(in srgb, currentColor 14%, transparent) 0 6px, transparent 6px 12px); }
.fd-seg-swap { background: color-mix(in srgb, oklch(0.75 0.12 85) 35%, transparent); }
.fd-seg-fail { background: color-mix(in srgb, oklch(0.65 0.18 30) 30%, transparent); }
.fd-arrival { position: absolute; top: 0; bottom: 0; width: 2px; background: currentColor; }
.fd-needle { position: absolute; top: 3px; bottom: 3px; width: 2px; border-radius: 1px;
  background: oklch(0.55 0.15 260); }
.fd-scale { display: flex; justify-content: space-between; font-size: 10px; opacity: 0.65; }
.fd-card { padding: 16px 18px; border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px; }
.fd-text { font-family: Georgia, "Times New Roman", serif; font-size: 17px; line-height: 1.6; }
.fd-text[data-loaded="true"] { font-family: "Courier New", ui-monospace, monospace; }
.fd-text[data-phase="block"] { color: transparent;
  background: repeating-linear-gradient(90deg,
    color-mix(in srgb, currentColor 16%, transparent) 0 34px, transparent 34px 44px);
  border-radius: 4px; user-select: none; }
.fd-phasebar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-size: 12px; }
.fd-phase { padding: 2px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent); }
.fd-btn { border: 1px solid color-mix(in srgb, currentColor 30%, transparent); border-radius: 999px;
  padding: 5px 14px; font-size: 12px; cursor: pointer; background: transparent; color: inherit; }
.fd-btn-primary { background: color-mix(in srgb, oklch(0.55 0.15 260) 75%, transparent);
  border-color: transparent; color: #fff; }
.fd-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .fd-needle { display: none; }
}
`;

const PHASE_LABEL: Record<Phase, { zh: string; en: string }> = {
  block: { zh: "封锁期:文本不可见(FOIT)", en: "Block: text invisible (FOIT)" },
  swap: { zh: "交换期:后备字体可见(FOUT)", en: "Swap: fallback visible (FOUT)" },
  loaded: { zh: "已加载:webfont 换上", en: "Loaded: webfont swapped in" },
  failed: { zh: "放弃交换:整页保持后备字体", en: "Given up: fallback for the whole page" },
};

/**
 * 字体加载策略演示:display / loadDelay 为 JS 型参数(font-display 是 @font-face
 * 描述符,不能经 CSS 变量生效);demo 以与 web.dev 数值表等价的状态机模拟
 * 封锁/交换/失败三周期,reduced-motion 时一次推进到最终结局。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [display, setDisplay] = useState<DisplayValue>(() => store.get("display") as DisplayValue);
  const [delay, setDelay] = useState<number>(() => store.get("loadDelay") as number);

  const [elapsed, setElapsed] = useState(0);
  const [runId, setRunId] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setDisplay(store.get("display") as DisplayValue);
        setDelay(store.get("loadDelay") as number);
      }),
    [store],
  );

  // display/loadDelay 变化即重跑
  useEffect(() => {
    setRunId((n) => n + 1);
  }, [display, delay]);

  // 状态机推进:rAF 逐帧;prefers-reduced-motion 时直接落到最终态
  useEffect(() => {
    const reduced =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setElapsed(REDUCED_FINAL_MS);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const e = now - start;
      if (e >= TIMELINE_MS) {
        setElapsed(TIMELINE_MS);
        return;
      }
      setElapsed(e);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [runId]);

  const phase = phaseAt(elapsed, display, delay);
  const B = PERIODS[display].block ?? 100;
  const S = PERIODS[display].swap;
  const pct = (ms: number) => `${Math.min(100, (ms / TIMELINE_MS) * 100)}%`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="fd-wrap">
        <div className="fd-timeline" aria-hidden="true">
          <div className="fd-seg fd-seg-block" style={{ left: 0, width: pct(B) }} />
          {S === 0 ? (
            <div className="fd-seg fd-seg-fail" style={{ left: pct(B), right: 0 }} />
          ) : S === Number.POSITIVE_INFINITY ? (
            <div className="fd-seg fd-seg-swap" style={{ left: pct(B), right: 0 }} />
          ) : (
            <>
              <div className="fd-seg fd-seg-swap" style={{ left: pct(B), width: pct(Math.min(S, TIMELINE_MS - B)) }} />
              {B + S < TIMELINE_MS && (
                <div className="fd-seg fd-seg-fail" style={{ left: pct(B + S), right: 0 }} />
              )}
            </>
          )}
          {delay <= TIMELINE_MS && <div className="fd-arrival" style={{ left: pct(delay) }} />}
          <div className="fd-needle" style={{ left: pct(elapsed) }} />
        </div>
        <div className="fd-scale" aria-hidden="true">
          <span>0ms</span>
          <span>100ms</span>
          <span>1s</span>
          <span>2s</span>
          <span>3s+</span>
        </div>
        <div className="fd-card">
          <p className="fd-text" data-phase={phase} data-loaded={phase === "loaded" ? "true" : "false"}>
            The quick brown fox jumps over the lazy dog. 敏捷的棕色狐狸跳过懒狗 0123456789。
          </p>
        </div>
        <div className="fd-phasebar">
          <span className="fd-phase">{PHASE_LABEL[phase].zh} / {PHASE_LABEL[phase].en}</span>
          <span className="fd-phase">@{Math.round(elapsed)}ms · 字体到达 {delay}ms</span>
          <button type="button" className="fd-btn fd-btn-primary" onClick={() => setRunId((n) => n + 1)}>
            重新加载 Reload
          </button>
        </div>
        <p className="fd-note">
          演示为等价状态机,非真实网络;font-display 是 @font-face 描述符,不能经 CSS 变量在常规样式生效。数值表:swap 0ms/无限、fallback 100ms/3s、optional 100ms/无、block 封锁 2–3s(web.dev 原文核对,调研 05§21);auto 浏览器自定义,演示按 100ms 处理;block 档演示取上界 3s。
          This is an equivalent state machine, not a real network; font-display is an @font-face descriptor and cannot ride CSS variables. Table: swap 0ms/infinite, fallback 100ms/3s, optional 100ms/none, block 2–3s (verified from web.dev, research 05 §21); auto is browser-defined, simulated here as 100ms; block uses the 3s upper bound.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
