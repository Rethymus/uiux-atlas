import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/** —— 零依赖转换链(调研 14§2.4,Node v22 实跑核验:往返误差 6.7e-7) —— */

const srgb2lin = (c: number): number => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lin2srgb = (c: number): number =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.cbrt(c * c * c) - 0.055;

function oklabToSrgb(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return [lin2srgb(lin[0]), lin2srgb(lin[1]), lin2srgb(lin[2])];
}

function hexToRgb8(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  const n = parseInt(v.length === 3 ? v.replace(/./g, (c) => c + c) : v.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const REF_CHIPS: { hex: string; zh: string; en: string }[] = [
  { hex: "#ff0000", zh: "纯红(核验值)", en: "pure red (verified)" },
  { hex: "#ffffff", zh: "白 → OKLab(1,0,0)", en: "white → OKLab(1,0,0)" },
  { hex: "#767676", zh: "AA 临界灰", en: "AA-critical gray" },
];

const css = `
.ok-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 2px; padding: 30px 14px 10px; overflow: hidden; }
.ok-row {
  display: grid; grid-template-columns: 128px 1fr 22px; align-items: center; gap: 8px;
  padding: 3px 8px; border-radius: 8px; min-height: 0;
}
.ok-row:nth-child(odd) { background: color-mix(in srgb, var(--border) 16%, transparent); }
.ok-name { font-size: 11px; color: var(--text-dim); white-space: nowrap; }
.ok-vals { font-size: 11px; color: var(--text); font-variant-numeric: tabular-nums; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.ok-chip { width: 20px; height: 14px; border-radius: 4px; border: 1px solid var(--border); justify-self: end; }
.ok-foot { margin-top: auto; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--text-faint); font-variant-numeric: tabular-nums; }
.ok-tag { padding: 1px 9px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); }
.ok-chips { display: flex; gap: 4px; }
.ok-chips button {
  border: 1px solid var(--border); border-radius: 999px; background: transparent;
  padding: 2px 10px; font-size: 11px; cursor: pointer; color: var(--text-dim);
}
.ok-chips button[aria-pressed="true"] { background: var(--accent); border-color: transparent; color: var(--bg); }
.ok-stage { animation: ok-in 0.4s ease-out both; }
@keyframes ok-in { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .ok-stage { animation: none; } }
`;

const fmt = (x: number, d = 4): string => String(+x.toFixed(d));

/**
 * OKLCH 转换公式演示:source(hex,面板参数)驱动五段转换流水线,
 * 每级中间值可见,末行显示反向链往返误差;无自主动画。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [hex, setHex] = useState(() => (store.get("source") as string).toUpperCase());

  useEffect(
    () =>
      store.subscribe(() => {
        setHex((store.get("source") as string).toUpperCase());
      }),
    [store],
  );

  const [r8, g8, b8] = hexToRgb8(hex);
  const [r, g, b] = [r8 / 255, g8 / 255, b8 / 255];
  const [lr, lg, lb] = [srgb2lin(r), srgb2lin(g), srgb2lin(b)];
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const [l_, m_, s_] = [Math.cbrt(l), Math.cbrt(m), Math.cbrt(s)];
  const [L, a, bb] = [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ];
  const C = Math.sqrt(a * a + bb * bb);
  const Hdeg = C <= 4e-6 ? NaN : ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
  const [rb, gb, bbin] = oklabToSrgb(L, a, bb);
  const err = Math.max(
    Math.abs(rb - r),
    Math.abs(gb - g),
    Math.abs(bbin - b),
  ).toExponential(1);

  const cssOut = Number.isNaN(Hdeg)
    ? `oklch(${fmt(L * 100, 1)}% ${fmt(C, 4)} 0)` // 灰色:H 未定义,取 0
    : `oklch(${fmt(L * 100, 1)}% ${fmt(C, 4)} ${fmt(Hdeg, 2)})`;

  const rows: { name: string; vals: string; chip?: string }[] = [
    { name: "sRGB 8bit", vals: `${r8}, ${g8}, ${b8}`, chip: hex },
    { name: "线性 sRGB(γ 解码)", vals: `${fmt(lr)}, ${fmt(lg)}, ${fmt(lb)}` },
    { name: "LMS(矩阵①)", vals: `${fmt(l)}, ${fmt(m)}, ${fmt(s)}` },
    { name: "LMS′(立方根)", vals: `${fmt(l_)}, ${fmt(m_)}, ${fmt(s_)}` },
    { name: "OKLab(矩阵②)", vals: `L ${fmt(L)} · a ${fmt(a)} · b ${fmt(bb)}` },
    {
      name: "OKLCH(柱坐标)",
      vals: `L ${fmt(L * 100, 1)}% · C ${fmt(C, 4)} · H ${Number.isNaN(Hdeg) ? "—" : fmt(Hdeg, 2) + "°"}`,
    },
    { name: "反向链 → sRGB", vals: `${fmt(rb * 255, 2)}, ${fmt(gb * 255, 2)}, ${fmt(bbin * 255, 2)}` },
  ];

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="ok-stage">
        {rows.map((row) => (
          <div className="ok-row" key={row.name}>
            <span className="ok-name">{row.name}</span>
            <code className="ok-vals">{row.vals}</code>
            {row.chip ? (
              <span className="ok-chip" style={{ background: row.chip }} aria-hidden="true" />
            ) : (
              <span />
            )}
          </div>
        ))}
        <div className="ok-foot">
          <span className="ok-tag">{cssOut}</span>
          <span className="ok-tag">往返误差 max|Δ| = {err}</span>
          <span className="ok-chips" role="group" aria-label="参考色 Reference colors">
            {REF_CHIPS.map((c) => (
              <button
                key={c.hex}
                type="button"
                aria-pressed={hex === c.hex}
                title={c.en}
                onClick={() => store.set("source", c.hex)}
              >
                {c.zh}
              </button>
            ))}
          </span>
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
