import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.vr-stage { position: relative; padding: 12px; }
.vr-toolbar { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 10px; }
.vr-toolbar button { border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: transparent; color: inherit; border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer; }
.vr-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, oklch(0.55 0.15 260) 60%, transparent); color: #fff;
  border-color: transparent; }
.vr-frame { position: relative; overflow: hidden; border-radius: 10px;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
/* 韵律线:每 --vr-unit 一条淡线;行盒叠加由各块自身的渐变背景完成 */
.vr-lines { position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(to bottom,
    oklch(0.62 0.14 260 / 0.16) 0 1px, transparent 1px var(--vr-unit)); }
.vr-col { position: relative; padding: var(--vr-unit) calc(var(--vr-unit) * 1.5); }
.vr-col > p { font-size: var(--vr-body); line-height: var(--vr-unit); margin: 0;
  background: repeating-linear-gradient(to bottom,
    oklch(0.72 0.15 150 / 0.14) 0 calc(var(--vr-unit) - 1px),
    transparent calc(var(--vr-unit) - 1px) var(--vr-unit)); }
.vr-h2 { font-size: var(--vr-head); margin: 0; }
.vr-quote { margin: 0; font-size: var(--vr-body); line-height: var(--vr-unit);
  padding-inline-start: calc(var(--vr-unit) * 0.5);
  border-inline-start: 3px solid color-mix(in srgb, currentColor 30%, transparent);
  background: repeating-linear-gradient(to bottom,
    oklch(0.78 0.13 85 / 0.16) 0 calc(var(--vr-unit) - 1px),
    transparent calc(var(--vr-unit) - 1px) var(--vr-unit)); }
.vr-cap { font-size: 12px; opacity: 0.6; margin: 0; }
/* rhythm 模式:间距取单元倍数;标题行高由 TSX 内联(单元 ÷ 字号) */
.vr-stage[data-mode="rhythm"] .vr-h2 { margin-block-end: var(--vr-unit); }
.vr-stage[data-mode="rhythm"] .vr-col > p { margin-block-end: calc(var(--vr-unit) * 1.5); }
.vr-stage[data-mode="rhythm"] .vr-quote { margin-block: var(--vr-unit); }
.vr-stage[data-mode="rhythm"] .vr-cap { margin-block-start: var(--vr-unit); }
/* free 对照:任意值——韵律破坏现场 */
.vr-stage[data-mode="free"] .vr-h2 { line-height: 1.1; margin: 0 0 13px; }
.vr-stage[data-mode="free"] .vr-col > p { line-height: 1.45; margin: 0 0 7px; }
.vr-stage[data-mode="free"] .vr-quote { line-height: 1.45; margin: 5px 0; }
.vr-stage[data-mode="free"] .vr-cap { margin-top: 11px; }
.vr-stage[data-mode="free"] .vr-col > p,
.vr-stage[data-mode="free"] .vr-quote { background: none; }
.vr-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-block-start: 10px; }
.vr-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
  padding: 3px 10px; border-radius: 999px;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  font-variant-numeric: tabular-nums; }
.vr-badge[data-ok="true"] { background: color-mix(in srgb, oklch(0.72 0.15 150) 22%, transparent); }
.vr-badge[data-ok="false"] { background: color-mix(in srgb, oklch(0.68 0.19 30) 16%, transparent); }
.vr-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
`;

/**
 * 垂直韵律演示:baseUnit/bodySize/headingSize 为 CSS 变量型参数(经 DemoStage 注入);
 * mode 为 JS 型参数——订阅 store 后切换 data-mode(rhythm|free)。
 * 标题行高 = 单元 ÷ 字号(24ways 反推法),由 TSX 计算后内联(避免 CSS 长度÷长度的兼容问题);
 * 行盒叠加:每个文本块用 repeating-linear-gradient 画出逐行条带(周期 = 单元),
 * rhythm 模式下条带与韵律线逐行咬合,free 模式下肉眼可见的错位即「韵律破坏现场」。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [mode, setMode] = useState(() => store.get("mode") as string);

  const headRef = useRef<HTMLHeadingElement>(null);
  const [headLh, setHeadLh] = useState("");

  const baseUnit = store.get("baseUnit") as number;
  const bodySize = store.get("bodySize") as number;
  const headingSize = store.get("headingSize") as number;

  useEffect(
    () =>
      store.subscribe(() => {
        setMode(store.get("mode") as string);
        setTick((n) => n + 1);
      }),
    [store],
  );

  useLayoutEffect(() => {
    const lh = (baseUnit / headingSize).toFixed(4);
    setHeadLh(lh);
    if (mode === "rhythm") {
      headRef.current?.style.setProperty("line-height", lh);
    } else {
      headRef.current?.style.removeProperty("line-height");
    }
  }, [baseUnit, headingSize, mode, tick]);

  void tick;
  const bodyRatio = baseUnit / bodySize;
  const wcagPass = bodyRatio >= 1.5;
  const onGrid = mode === "rhythm";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="vr-stage" data-mode={mode}>
        <div className="vr-toolbar" role="group" aria-label="韵律模式 Rhythm mode">
          <button type="button" aria-pressed={mode === "rhythm"} onClick={() => store.set("mode", "rhythm")}>
            套用韵律 Rhythm
          </button>
          <button type="button" aria-pressed={mode === "free"} onClick={() => store.set("mode", "free")}>
            自由排版对照 Free
          </button>
        </div>
        <div className="vr-meta">
          <span className="vr-badge" data-ok={wcagPass}>
            行高比 {bodyRatio.toFixed(2)}×{wcagPass ? " ✓ ≥1.5(WCAG 1.4.12)" : " ✗ 低于 1.5 阈值"}
          </span>
          <span className="vr-badge" data-ok={onGrid}>
            标题行高 {mode === "rhythm" ? `${headLh}(= ${baseUnit}÷${headingSize},占 1 单元)` : "1.1(脱离单元)"}
          </span>
          <span className="vr-badge" data-ok={onGrid}>
            段距 {mode === "rhythm" ? `${baseUnit * 1.5}px = 1.5×单元` : "7px(非倍数)"}
          </span>
        </div>
        <div className="vr-frame">
          <div className="vr-lines" aria-hidden="true" />
          <div className="vr-col">
            <h2 className="vr-h2" ref={headRef}>韵律是可听的排版 / Rhythm you can hear</h2>
            <p>
              把正文行高定为基本单元:行盒逐行叠加像乐谱,间距是单元的整数倍。
              标题行高用单元反推——{baseUnit} ÷ {headingSize} = {headLh},标题行盒恰好落进一格。
            </p>
            <blockquote className="vr-quote">
              「空间如时间,比例化间隔远胜任意值。」—— Bringhurst,经 Rutter 24ways 2006 转述
            </blockquote>
            <p>
              切到 free 模式:13px/7px 的任意间距、1.1 的标题行高——绿色行盒条带不再咬合蓝色韵律线,
              文本块开始「发闷」。韵律失效从不是报错,而是这种说不清的拥挤。
            </p>
            <p className="vr-cap">
              Rutter, Compose to a Vertical Rhythm · 单元 {baseUnit}px = 正文行高 ·
              行盒条带周期 = 单元(教学可视化)
            </p>
          </div>
        </div>
        <p className="vr-note">
          行盒条带为教学可视化(周期 = 单元的 repeating-linear-gradient),绿色=正文、黄色=引语;
          蓝色韵律线每单元一条。行高全部为无单位比值,保证用户缩放不破坏节奏。
          Line-box stripes are a teaching visualization (repeating-linear-gradient with a period of
          the unit), green = body, amber = quote; blue rhythm lines run every unit. All
          line-heights are unitless so user zoom never breaks the rhythm.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
