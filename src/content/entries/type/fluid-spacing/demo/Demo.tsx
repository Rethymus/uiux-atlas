import { useEffect, useRef, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

/** 视口 px→rem 折算根字号(与 Utopia 换算一致) */
const ROOT_PX = 16;

/** 倍数梯:取自 Utopia 间距生成器的 multipliers(调研 05§14:0.75|0.5|0.25 与 1.5|2|3|4|6,s=1 基准) */
const TOKENS: { name: string; mult: number }[] = [
  { name: "3xs", mult: 0.25 },
  { name: "2xs", mult: 0.5 },
  { name: "xs", mult: 0.75 },
  { name: "s", mult: 1 },
  { name: "m", mult: 1.5 },
  { name: "l", mult: 2 },
  { name: "xl", mult: 3 },
  { name: "2xl", mult: 4 },
  { name: "3xl", mult: 6 },
];

interface TokenInfo {
  name: string;
  min: number;
  max: number;
  slope: number;
  inter: number;
}

const fmt = (n: number): number => Number(n.toFixed(4));

function buildTokens(p: { minViewport: number; maxViewport: number; minSpace: number; maxSpace: number }): TokenInfo[] {
  const minVwRem = p.minViewport / ROOT_PX;
  const maxVwRem = p.maxViewport / ROOT_PX;
  const span = maxVwRem - minVwRem;
  return TOKENS.map((t) => {
    const min = p.minSpace * t.mult;
    const max = p.maxSpace * t.mult;
    // minViewport ≥ maxViewport 时斜率退化为 0(静态间距),避免除零
    const slope = span > 0 ? (max - min) / span : 0;
    const inter = min - slope * minVwRem;
    return { name: t.name, min, max, slope, inter };
  });
}

function clampValue(t: TokenInfo): string {
  return `clamp(${fmt(t.min)}rem, ${fmt(t.inter)}rem + ${fmt(t.slope * 100)}vw, ${fmt(t.max)}rem)`;
}

/** 模拟视口宽度下的实际间距(px),按 clamp 的 max(MIN, min(VAL, MAX)) 语义 */
function pxAt(t: TokenInfo, viewportPx: number): number {
  const rem = Math.max(t.min, Math.min(t.inter + t.slope * (viewportPx / ROOT_PX), t.max));
  return rem * ROOT_PX;
}

const css = `
.fsp-wrap { width: 100%; display: flex; flex-direction: column; gap: 12px; }
.fsp-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 12px;
  align-items: stretch;
}
.fsp-code {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, currentColor 7%, transparent);
  font: 11px/1.8 ui-monospace, "Cascadia Code", Menlo, Consolas, monospace;
  white-space: pre;
  overflow-x: auto;
}
.fsp-bars {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 12px 14px;
  border: 1px dashed color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 10px;
  justify-content: space-between;
}
.fsp-bar-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
.fsp-token {
  flex: none;
  width: 52px;
  font: 11px/1.4 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.75;
}
.fsp-bar {
  height: 12px;
  border-radius: 3px;
  background: linear-gradient(90deg, color-mix(in srgb, currentColor 55%, transparent), color-mix(in srgb, currentColor 30%, transparent));
  flex: none;
}
.fsp-val {
  font: 10px/1.3 ui-monospace, Menlo, Consolas, monospace;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fsp-sample {
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  border-radius: 12px;
  padding: var(--space-l);
  display: flex;
  gap: var(--space-m);
  flex-wrap: wrap;
  align-items: center;
}
.fsp-chip {
  border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 999px;
  padding: var(--space-2xs) var(--space-s);
  font-size: 13px;
  background: color-mix(in srgb, currentColor 8%, transparent);
}
.fsp-chip strong { font-size: 15px; }
.fsp-sim { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.fsp-sim input { flex: 1; min-width: 0; }
.fsp-hint { margin: 0; font-size: 12px; opacity: 0.7; line-height: 1.6; }
@media (max-width: 760px) { .fsp-grid { grid-template-columns: 1fr; } }
`;

/**
 * 流式间距演示:四个 JS 型参数订阅 store 后实时生成 --space-3xs…3xl 的 clamp()
 * 代码;条形图按「模拟视口宽度」滑杆换算各令牌实际 px 并排展示;
 * 样例卡片把生成的 clamp() 真正写进 CSS 变量(--space-l/-m/-s/-2xs),随真实视口缩放。
 */
export default function Demo({ entryId, schema }: { entryId: string; schema: EntrySchema }) {
  const store = getEntryStore(entryId, schema);
  const readTokens = (): TokenInfo[] =>
    buildTokens({
      minViewport: store.get("minViewport") as number,
      maxViewport: store.get("maxViewport") as number,
      minSpace: store.get("minSpace") as number,
      maxSpace: store.get("maxSpace") as number,
    });

  const [tokens, setTokens] = useState<TokenInfo[]>(readTokens);
  const [simVw, setSimVw] = useState(768);
  const sampleRef = useRef<HTMLDivElement>(null);

  useEffect(() => store.subscribe(() => setTokens(readTokens())), [store]);

  // 生成的 clamp() 写为 --space-*,样例卡片直接消费(随真实浏览器视口缩放)
  useEffect(() => {
    const el = sampleRef.current;
    if (!el) return;
    for (const t of tokens) el.style.setProperty(`--space-${t.name}`, clampValue(t));
  }, [tokens]);

  const widest = Math.max(...tokens.map((t) => pxAt(t, simVw)));

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="fsp-wrap">
        <div className="fsp-grid">
          <pre className="fsp-code" aria-label="生成的 clamp 代码 generated clamp code">
            {tokens.map((t) => `--space-${t.name}: ${clampValue(t)};`).join("\n")}
          </pre>
          <div className="fsp-bars" aria-label="各间距令牌在模拟视口下的实际宽度 token widths at simulated viewport">
            {tokens.map((t) => (
              <div className="fsp-bar-row" key={t.name}>
                <span className="fsp-token">--space-{t.name}</span>
                <span
                  className="fsp-bar"
                  style={{ width: `${(pxAt(t, simVw) / widest) * 100}%`, minWidth: 2 }}
                  role="img"
                  aria-label={`--space-${t.name} = ${pxAt(t, simVw).toFixed(1)}px`}
                />
                <span className="fsp-val">
                  {pxAt(t, simVw).toFixed(1)}px @{simVw}px
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="fsp-sample" ref={sampleRef}>
          <span className="fsp-chip">
            <strong>padding --space-l</strong> 卡片内边距 card padding
          </span>
          <span className="fsp-chip">gap --space-m</span>
          <span className="fsp-chip">chip --space-2xs / --space-s</span>
        </div>
        <label className="fsp-sim">
          <span>
            模拟视口宽度 Simulated viewport <strong>{simVw}px</strong>
          </span>
          <input
            type="range"
            min={320}
            max={1920}
            step={1}
            value={simVw}
            aria-label="模拟视口宽度 Simulated viewport width"
            onChange={(e) => setSimVw(Number(e.target.value))}
          />
        </label>
        <p className="fsp-hint">
          条形图与数值按同一 clamp 公式在模拟视口宽度下换算;样例卡片的 padding/gap 用真实 clamp() 变量驱动,缩放浏览器窗口即可看到留白呼吸。
          Bars and values are computed with the same clamp formula at the simulated width; the sample card's padding/gap ride the real clamp() variables — resize the browser and watch the whitespace breathe.
        </p>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
