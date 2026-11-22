import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.tn-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.tn-panel { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.tn-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.tn-badge[data-pass="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.tn-badge[data-pass="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 18%, transparent); }
.tn-board {
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: 10px; overflow: hidden;
}
.tn-row {
  display: grid; grid-template-columns: 1fr auto; gap: 12px;
  align-items: baseline; padding: 8px 14px;
  border-block-end: 1px solid color-mix(in srgb, currentColor 12%, transparent);
}
.tn-row:last-child { border-block-end: 0; }
.tn-label { font-size: 13px; opacity: 0.72; }
.tn-num {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 17px; font-weight: 600;
  font-variant-numeric: var(--tn-numeric);
  white-space: nowrap; min-width: 13ch; text-align: right;
}
.tn-board[data-zero="on"] .tn-num { font-variant-numeric: var(--tn-numeric) slashed-zero; }
.tn-probe {
  display: grid; grid-template-columns: auto 1fr auto; gap: 10px;
  align-items: baseline; font-size: 13px; padding: 8px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 25%, transparent);
  border-radius: 10px;
}
.tn-probe .tn-num { font-size: 14px; font-weight: 400; min-width: 0; text-align: left; }
.tn-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;

/** 确定性伪随机(LCG):演示抖动可复现,非加密用途 */
const nextRand = (() => {
  let s = 42;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
})();

/**
 * 表格数字演示:numericStyle 为 CSS 变量型参数(经 DemoStage 注入 --tn-numeric);
 * slashedZero / countSpeed 为 JS 型参数——订阅 store 后切换 data-zero 与计数节奏。
 * 宽度探针实测两种数字风格下「1111111111」与「1234567890」的宽度差:
 * 等宽时 Δ=0,比例宽度时 Δ>0——结论由测量产生,不写死。
 * prefers-reduced-motion 时停止计数动画,仅保留静态数值与探针。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [values, setValues] = useState(() => [12830457, 90210, 12.4]);
  const [live, setLive] = useState(true);
  const [probe, setProbe] = useState({ a: 0, b: 0, delta: 0, jitMin: Infinity, jitMax: 0 });

  const probeARef = useRef<HTMLSpanElement>(null);
  const probeBRef = useRef<HTMLSpanElement>(null);
  const jitRef = useRef<HTMLSpanElement>(null);
  const jitStats = useRef<{ min: number; max: number }>({ min: Infinity, max: 0 });
  const jitMode = useRef("");

  const numericStyle = store.get("numericStyle") as string;
  const slashedZero = store.get("slashedZero") as string;
  const countSpeed = store.get("countSpeed") as number;
  void tick; // 订阅触发重渲染;值直接经 store.get 读取

  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), [store]);

  // 计数动画:尊重 prefers-reduced-motion;countSpeed 为演示参数(非规范值)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = !reduced.matches && live;
    setLive(!reduced.matches);
    if (!enabled) return;
    const period = Math.max(100, 1000 - countSpeed * 100);
    const id = window.setInterval(() => {
      setValues(([rev, ord, d]) => [
        rev + Math.floor(nextRand() * 900) + 100,
        ord + Math.floor(nextRand() * 7),
        Math.min(99.9, Math.max(-99.9, d + (nextRand() - 0.48) * 0.2)),
      ]);
    }, period);
    return () => window.clearInterval(id);
  }, [countSpeed, live]);

  // 宽度探针:每次渲染实测;抖动记录跟随数字风格重置
  useLayoutEffect(() => {
    if (jitMode.current !== numericStyle) {
      jitMode.current = numericStyle;
      jitStats.current = { min: Infinity, max: 0 };
    }
    const a = probeARef.current?.getBoundingClientRect().width ?? 0;
    const b = probeBRef.current?.getBoundingClientRect().width ?? 0;
    const j = jitRef.current?.getBoundingClientRect().width ?? 0;
    if (j > 0) {
      jitStats.current.min = Math.min(jitStats.current.min, j);
      jitStats.current.max = Math.max(jitStats.current.max, j);
    }
    setProbe({
      a,
      b,
      delta: Math.abs(a - b),
      jitMin: jitStats.current.min,
      jitMax: jitStats.current.max,
    });
  });

  const jitSpread = probe.jitMax - probe.jitMin;
  const aligned = probe.delta < 0.5;
  const fmtPx = (v: number) => `${Number.isFinite(v) ? v.toFixed(1) : "—"} px`;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="tn-wrap">
        <div className="tn-panel">
          <span className="tn-badge" data-pass={aligned}>
            {aligned ? "✓ 等宽生效 Equal-width" : "✗ 宽度不一 Uneven widths"} Δ = {probe.delta.toFixed(1)} px
          </span>
          <span className="tn-badge" data-pass={jitSpread < 0.5}>
            {live ? "计数中 counting" : "已暂停 paused"} · 列宽波动 jitter {fmtPx(jitSpread)}
          </span>
          <span className="tn-badge">font-variant-numeric: {numericStyle}{slashedZero === "on" ? " slashed-zero" : ""}</span>
        </div>
        <div className="tn-board" data-zero={slashedZero}>
          <div className="tn-row">
            <span className="tn-label">营收 Revenue</span>
            <span className="tn-num" ref={jitRef}>¥ {values[0].toLocaleString("en-US")}</span>
          </div>
          <div className="tn-row">
            <span className="tn-label">订单 Orders</span>
            <span className="tn-num">{values[1].toLocaleString("en-US")}</span>
          </div>
          <div className="tn-row">
            <span className="tn-label">环比 Delta</span>
            <span className="tn-num">+{values[2].toFixed(1)} %</span>
          </div>
          <div className="tn-row">
            <span className="tn-label">O / 0 对照(斜杠零开关)</span>
            <span className="tn-num">O0 · 编号 0070 · ¥1,200.00</span>
          </div>
        </div>
        <div className="tn-probe">
          <span>静态探针 Static probe</span>
          <span className="tn-num" ref={probeARef}>1111111111</span>
          <span>{fmtPx(probe.a)}</span>
          <span />
          <span className="tn-num" ref={probeBRef}>1234567890</span>
          <span>{fmtPx(probe.b)}</span>
        </div>
        <p className="tn-note">
          探针实测当前字体(Inter Variable,含 tnum 特性表,调研 05§24)在两种数字串下的渲染宽度:
          等宽风格 Δ≈0、列宽波动≈0;比例宽度风格 Δ 与波动由字形决定。斜杠零由 slashed-zero OpenType
          特性提供,字体不含该表时声明无效但无害。
          The probe measures rendered widths under the current font (Inter Variable ships the tnum
          table, research 05 §24): equal-width styles give Δ≈0 and zero jitter; proportional styles
          vary by glyph. The slashed zero comes from the slashed-zero OpenType feature — inert but
          harmless when the font lacks the table.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
