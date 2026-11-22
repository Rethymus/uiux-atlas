import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

const css = `
.bl-stage { position: relative; padding: 12px; }
.bl-frame { position: relative; overflow: hidden; border-radius: 10px;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent); }
.bl-overlay { position: absolute; inset: 0; pointer-events: none; }
.bl-grid, .bl-base { position: absolute; inset: 0; opacity: 0; transition: opacity 0.2s ease; }
.bl-grid {
  background: repeating-linear-gradient(to bottom,
    oklch(0.62 0.14 260 / 0.28) 0 1px, transparent 1px var(--bl-unit));
}
/* 基线近似画在行盒 ~80% 处:基线精确位置因字体度量而异,属教学近似 */
.bl-base {
  background: repeating-linear-gradient(to bottom,
    transparent 0,
    transparent calc((var(--bl-size) * var(--bl-lh)) * 0.8 - 0.5px),
    oklch(0.68 0.19 30 / 0.4) calc((var(--bl-size) * var(--bl-lh)) * 0.8 - 0.5px)
      calc((var(--bl-size) * var(--bl-lh)) * 0.8 + 0.5px),
    transparent calc((var(--bl-size) * var(--bl-lh)) * 0.8 + 0.5px),
    transparent calc(var(--bl-size) * var(--bl-lh)));
}
.bl-stage[data-overlay~="grid"] .bl-grid { opacity: 1; }
.bl-stage[data-overlay~="baselines"] .bl-base { opacity: 1; }
.bl-col {
  position: relative; padding: calc(var(--bl-unit) * 2);
  font-size: var(--bl-size); line-height: var(--bl-lh);
}
.bl-col > * { margin: 0; }
.bl-kicker { font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; opacity: 0.66;
  line-height: var(--bl-unit); margin-block-end: var(--bl-unit); }
.bl-h2 { font-size: calc(var(--bl-size) * 1.3); line-height: calc(var(--bl-unit) * 3);
  font-weight: 650; margin-block-end: var(--bl-unit); }
.bl-p { max-width: 42ch; margin-block-end: calc(var(--bl-unit) * 2); }
.bl-card {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 6px; padding: var(--bl-unit); /* 1px 边框 + 8px 内边距 = 9px,经典偏移点 */
  margin-block-end: calc(var(--bl-unit) * 2);
}
.bl-card p { line-height: inherit; }
.bl-list { padding-inline-start: calc(var(--bl-unit) * 2.5);
  margin-block-end: calc(var(--bl-unit) * 2); }
.bl-list li { margin-block: calc(var(--bl-unit) * 0.5); }
.bl-meta { font-size: 12px; opacity: 0.6; line-height: var(--bl-unit); }
.bl-audit { display: flex; flex-direction: column; gap: 4px; margin: 0; padding: 0;
  list-style: none; font-size: 12px; }
.bl-audit li { display: flex; gap: 8px; align-items: baseline;
  font-variant-numeric: tabular-nums; }
.bl-audit [data-ok="true"] { color: oklch(0.62 0.13 155); }
.bl-audit [data-ok="false"] { color: oklch(0.6 0.19 30); }
.bl-audit .bl-val { opacity: 0.72; margin-inline-start: auto; white-space: nowrap; }
.bl-note { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
.bl-toolbar { display: flex; flex-wrap: wrap; gap: 6px; margin-block-end: 8px; }
.bl-toolbar button { border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  background: transparent; color: inherit; border-radius: 999px;
  padding: 4px 12px; font-size: 12px; cursor: pointer; }
.bl-toolbar button[aria-pressed="true"] {
  background: color-mix(in srgb, oklch(0.55 0.15 260) 60%, transparent); color: #fff;
  border-color: transparent; }
@media (prefers-reduced-motion: reduce) {
  .bl-grid, .bl-base { transition: none; }
}
`;

const OVERLAYS = [
  { id: "none", zh: "关", en: "Off" },
  { id: "grid", zh: "网格", en: "Grid" },
  { id: "baselines", zh: "基线", en: "Baselines" },
  { id: "both", zh: "网格+基线", en: "Both" },
];

/**
 * 基线网格演示:unit/fontSize/lineHeight 为 CSS 变量型参数(经 DemoStage 注入);
 * overlay 为 JS 型参数——订阅 store 后切换 data-overlay 可视化开关。
 * 偏移审计逐块实测 offsetTop:判据 = 步长整数倍或半步(4/8 规则);
 * 1px 描边 + 8px 内边距 = 9px 的经典偏移由审计如实标出(unit=18 时 9px 恰为半步,自动转绿)。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [tick, setTick] = useState(0);
  const [overlay, setOverlay] = useState(() => store.get("overlay") as string);
  const [audit, setAudit] = useState<{ name: string; px: number; ok: boolean }[]>([]);

  const colRef = useRef<HTMLDivElement>(null);
  const marks = useRef<Record<string, HTMLElement | null>>({});

  const unit = store.get("unit") as number;
  const fontSize = store.get("fontSize") as number;
  const lineHeight = store.get("lineHeight") as number;

  useEffect(
    () =>
      store.subscribe(() => {
        setOverlay(store.get("overlay") as string);
        setTick((n) => n + 1);
      }),
    [store],
  );

  useLayoutEffect(() => {
    const root = colRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top;
    const rows: { name: string; px: number; ok: boolean }[] = [];
    const half = unit / 2;
    const onGrid = (px: number) => Math.abs(px % unit) < 0.01 || Math.abs(px % half) < 0.01;
    for (const [name, el] of Object.entries(marks.current)) {
      if (!el) continue;
      const px = el.getBoundingClientRect().top - top;
      rows.push({ name, px, ok: onGrid(px) });
    }
    rows.push({
      name: "正文行盒 line box",
      px: fontSize * lineHeight,
      ok: onGrid(fontSize * lineHeight),
    });
    rows.sort((a, b) => a.px - b.px);
    setAudit(rows);
  }, [tick, unit, fontSize, lineHeight]);

  const fmt = (px: number) =>
    `${px % 1 === 0 ? px : px.toFixed(1)}px` +
    (Math.abs(px % unit) < 0.01 ? ` = ${(px / unit).toFixed(px % unit ? 1 : 0)}×${unit}` : "");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="bl-stage" data-overlay={overlay}>
        <div className="bl-toolbar" role="group" aria-label="叠加层开关 Overlay switch">
          {OVERLAYS.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={overlay === o.id}
              title={o.en}
              onClick={() => store.set("overlay", o.id)}
            >
              {o.zh}
            </button>
          ))}
        </div>
        <div className="bl-frame">
          <div className="bl-overlay" aria-hidden="true">
            <div className="bl-grid" />
            <div className="bl-base" />
          </div>
          <div className="bl-col" ref={colRef}>
            <p
              className="bl-kicker"
              ref={(el) => { marks.current["眉标 kicker"] = el; }}
            >
              Baseline Grid · 基线网格
            </p>
            <h2 className="bl-h2" ref={(el) => { marks.current["标题 heading"] = el; }}>
              垂直空间落在同一步长上
            </h2>
            <p className="bl-p" ref={(el) => { marks.current["正文 paragraph"] = el; }}>
              标题、正文、列表与卡片共享同一个步长:每个 margin、padding 和行盒都是 8px
              的整数倍(或 4px 半步)。Bringhurst 说「空间如时间,比例化间隔远胜任意值」。
            </p>
            <div className="bl-card">
              <p ref={(el) => { marks.current["卡片内文 card text"] = el; }}>
                1px 描边 + 8px 内边距 = 9px:经典偏移点。8px 体系判为违规;
                把 unit 调到 18px,9px 恰为半步,审计自动转绿(调研 12§10)。
              </p>
            </div>
            <ul className="bl-list">
              <li>行盒 16 × 1.5 = 24px = 3 步</li>
              <li>段距 = 2 步,列表项距 = 半步</li>
              <li>描边计入间距预算</li>
            </ul>
            <p className="bl-meta" ref={(el) => { marks.current["脚注 meta"] = el; }}>
              Rutter, Compose to a Vertical Rhythm, 24ways 2006 · 本站 4/8 网格 · TDesign +8 常数
            </p>
          </div>
        </div>
        <div className="bl-panel" style={{ marginBlockStart: "8px" }}>
          <ul className="bl-audit" aria-live="polite">
            {audit.map((r) => (
              <li key={r.name}>
                <span data-ok={r.ok}>{r.ok ? "✓" : "✗"}</span>
                <span>{r.name}</span>
                <span className="bl-val">{fmt(r.px)} · 偏移 {r.px.toFixed(1)}px</span>
              </li>
            ))}
          </ul>
          <p className="bl-note">
            判据:偏移为步长整数倍或半步(unit/2,即 4/8 规则)。基线线画在行盒 ~80%
            处,是教学近似——基线在行盒内的精确位置由字体度量决定。
            Criterion: offsets are integer multiples of the step or half-steps (unit/2, the 4/8
            rule). Baseline lines sit at ~80% of the line box — a teaching approximation, since the
            exact baseline position depends on font metrics.
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
