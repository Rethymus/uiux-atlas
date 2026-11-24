import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖 WCAG 亮度与比值(调研 14§2.4,实跑核验:#767676 vs 白 = 4.5422:1) —— */

const srgb2lin = (c: number): number => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

function hexToRgb8(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  const n = parseInt(v.length === 3 ? v.replace(/./g, (c) => c + c) : v.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const wcagLuminance = (rgb8: [number, number, number]): number =>
  0.2126 * srgb2lin(rgb8[0] / 255) +
  0.7152 * srgb2lin(rgb8[1] / 255) +
  0.0722 * srgb2lin(rgb8[2] / 255);

const wcagContrast = (L1: number, L2: number): number =>
  (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

const QUICK: { fg: string; bg: string; zh: string; en: string }[] = [
  { fg: "#767676", bg: "#ffffff", zh: "临界灰 4.54:1", en: "critical gray 4.54:1" },
  { fg: "#6b6b6b", bg: "#ffffff", zh: "过线灰 ≈5.3:1", en: "passing gray ≈5.3:1" },
  { fg: "#8a8a8a", bg: "#ffffff", zh: "不及格灰 ≈3.5:1", en: "failing gray ≈3.5:1" },
];

const css = `
.cr-stage { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(120px, 1fr) minmax(0, 1.4fr); gap: 10px; padding: 30px 14px 10px; overflow: hidden; }
.cr-card {
  border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
  display: flex; flex-direction: column;
  color: var(--cr-fg); background: var(--cr-bg);
}
.cr-preview { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 44px; font-weight: 650; line-height: 1.1; }
.cr-preview small { font-size: 15px; font-weight: 400; margin-left: 8px; }
.cr-ratio {
  padding: 6px 10px; font-size: 13px; font-weight: 650; font-variant-numeric: tabular-nums;
  border-top: 1px solid color-mix(in srgb, var(--cr-fg) 22%, transparent);
}
.cr-steps { margin: 0; padding: 6px 10px; list-style: none; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
.cr-steps li {
  font-size: 11px; color: var(--text-dim); font-variant-numeric: tabular-nums;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cr-verdicts { display: flex; flex-wrap: wrap; gap: 4px; padding: 6px 10px 8px; }
.cr-v { padding: 1px 8px; border-radius: 999px; border: 1px solid var(--border); font-size: 11px; font-variant-numeric: tabular-nums; color: var(--text-dim); }
.cr-v[data-pass="1"] { border-color: oklch(0.62 0.14 165); color: oklch(0.45 0.12 165); }
.cr-v[data-pass="0"] { border-color: oklch(0.62 0.19 25); color: oklch(0.55 0.19 25); }
.cr-foot { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); }
.cr-chips { display: flex; gap: 4px; }
.cr-chips button { border: 1px solid var(--border); border-radius: 999px; background: transparent; padding: 2px 10px; font-size: 11px; cursor: pointer; color: var(--text-dim); }
.cr-stage { animation: cr-in 0.4s ease-out both; }
@keyframes cr-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .cr-stage { animation: none; } }
`;

const fmt = (x: number, d = 4): string => String(+x.toFixed(d));

/**
 * 对比度比值公式演示:fg/bg(面板 hex 参数,cssVar 注入)驱动,
 * 四步推导逐行展开,四档阈值判定;无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const read = (): { fg: string; bg: string } => ({
    fg: (store.get("fg") as string).toUpperCase(),
    bg: (store.get("bg") as string).toUpperCase(),
  });
  const [{ fg, bg }, setColors] = useState(read);

  useEffect(
    () =>
      store.subscribe(() => {
        setColors(read());
      }),
    [store],
  );

  const fg8 = hexToRgb8(fg);
  const bg8 = hexToRgb8(bg);
  const Lfg = wcagLuminance(fg8);
  const Lbg = wcagLuminance(bg8);
  const ratio = wcagContrast(Lfg, Lbg);
  const fgIsL1 = Lfg > Lbg;
  const L1 = Math.max(Lfg, Lbg);
  const L2 = Math.min(Lfg, Lbg);
  const hot = fgIsL1 ? fg8 : bg8;
  const hotLin = srgb2lin(hot[0] / 255);

  const gates: { label: string; need: number }[] = [
    { label: "AA 正文 4.5", need: 4.5 },
    { label: "AA 大字 3", need: 3 },
    { label: "AAA 正文 7", need: 7 },
    { label: "AAA 大字 4.5", need: 4.5 },
  ];

  const steps: string[] = [
    `sRGB → [0,1]: ${hot[0]}/255 = ${fmt(hot[0] / 255)}`,
    `γ 解码: ${fmt(hot[0] / 255)} → ${fmt(hotLin)}`,
    `L(较亮侧 ${fgIsL1 ? "fg" : "bg"}) = 0.2126R+0.7152G+0.0722B = ${fmt(L1)}`,
    `L(较暗侧 ${fgIsL1 ? "bg" : "fg"}) = ${fmt(L2)}`,
    `(${fmt(L1 + 0.05)}) / (${fmt(L2 + 0.05)}) = ${fmt(ratio, 4)}:1`,
  ];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="cr-stage">
        <div className="cr-card">
          <span className="cr-preview">
            Aa<small>正文样 body</small>
          </span>
          <span className="cr-ratio">{fmt(ratio, 4)} : 1</span>
        </div>
        <div>
          <ol className="cr-steps">
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <div className="cr-verdicts">
            {gates.map((g) => (
              <span
                key={g.label}
                className="cr-v"
                data-pass={ratio >= g.need ? "1" : "0"}
                title={`${g.label}:1`}
              >
                {g.label} {ratio >= g.need ? "✓" : "✗"}
              </span>
            ))}
          </div>
        </div>
        <div className="cr-foot">
          <span className="cr-chips" role="group" aria-label="快捷组合 Quick pairs">
            {QUICK.map((q) => (
              <button
                key={q.zh}
                type="button"
                aria-pressed={fg === q.fg && bg === q.bg}
                title={q.en}
                onClick={() => {
                  store.set("fg", q.fg);
                  store.set("bg", q.bg);
                }}
              >
                {q.zh}
              </button>
            ))}
          </span>
          <span>深底浅字场景建议以 APCA Lc 复核 / re-check light-on-dark with APCA Lc</span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
