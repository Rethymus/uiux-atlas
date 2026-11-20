import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * oklch → 线性 sRGB → gamma sRGB:Björn Ottosson 公布的 Oklab 矩阵(与 CSS Color 4
 * 一致),无第三方包。越出 [0,1] 的通道按浏览器现状直接裁剪(Chrome/Safari 尚未做
 * 规范要求的降 chroma gamut mapping——Evil Martians 实测),裁剪与否如实上报。
 */
function oklchToSrgb(l01: number, c: number, hDeg: number): { rgb: [number, number, number]; clipped: boolean } {
  const h = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l_ = l01 + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l01 - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l01 - 0.0894841775 * a - 1.291485548 * b;
  const L = l_ * l_ * l_;
  const M = m_ * m_ * m_;
  const S = s_ * s_ * s_;
  const lin = [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
  const clipped = lin.some((v) => v < -1e-9 || v > 1 + 1e-9);
  const clamped = lin.map((v) => Math.min(1, Math.max(0, v)));
  const gam = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
  return { rgb: clamped.map((v) => gam(v)) as [number, number, number], clipped };
}

const css = `
.os-stage { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px; padding: 18px; }
.os-top { display: flex; gap: 14px; flex: 1; min-height: 0; }
.os-swatch-wrap { flex: 1.25; position: relative; border-radius: 14px; overflow: hidden; min-width: 0; }
/* 透明度棋盘格:alpha < 1 时透出 */
.os-checker {
  position: absolute; inset: 0;
  background:
    linear-gradient(45deg, #cfd5dd 25%, transparent 25%, transparent 75%, #cfd5dd 75%),
    linear-gradient(45deg, #cfd5dd 25%, #f2f4f7 25%, #f2f4f7 75%, #cfd5dd 75%);
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
}
.os-fill { position: absolute; inset: 0; transition: background-color 0.18s ease; }
.os-swatch-label {
  position: absolute; left: 14px; bottom: 12px;
  font-size: 12px; font-weight: 600;
  color: oklch(0.25 0.02 145);
  text-shadow: 0 1px 3px rgb(255 255 255 / 0.45);
}
.os-panel { flex: 1; min-width: 230px; display: flex; flex-direction: column; justify-content: center; gap: 8px; font-size: 12.5px; color: var(--text-dim); }
.os-code {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 12.5px;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 10px;
  overflow-wrap: anywhere;
}
.os-clip {
  color: var(--text);
  background: color-mix(in srgb, oklch(0.75 0.15 85) 30%, transparent);
  border: 1px solid color-mix(in srgb, oklch(0.6 0.15 85) 55%, transparent);
  padding: 6px 9px;
  border-radius: 8px;
  font-size: 11.5px;
  line-height: 1.5;
}
.os-ladder { display: flex; gap: 5px; height: 84px; flex: none; }
.os-step {
  flex: 1;
  position: relative;
  border-radius: 9px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 6px;
  font-size: 10.5px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  transition: background-color 0.18s ease, outline-color 0.18s ease;
  outline: 2px solid transparent;
  outline-offset: 2px;
  color: oklch(0.28 0.02 145);
}
.os-step[data-current="true"] { outline-color: var(--text); }
.os-step[data-current="true"]::after {
  content: "◀ 当前 L";
  position: absolute;
  top: -16px;
  right: 0;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-dim);
  white-space: nowrap;
}
.os-step > span { opacity: 0.85; }
.os-step[data-low="true"] > span { color: rgb(255 255 255 / 0.85); }
.os-caption { flex: none; font-size: 11.5px; color: var(--text-faint); }
@media (prefers-reduced-motion: reduce) {
  .os-fill, .os-step { transition: none; }
}
`;

/**
 * OKLCH 色彩空间演示:大色块(含 alpha 棋盘格)+ 同色相多亮度阶梯。
 * L/C/H/alpha 四参数订阅后拼 oklch 字符串并以 JS 换算 sRGB 上色;
 * 阶梯为固定 C/H、L 以 +10 等步推进的 10 档——感知均匀性即「等数值步 = 等观感步」。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setTick((n) => n + 1);
      }),
    [store],
  );

  const L = store.get("L") as number; // 0–100(%)
  const C = store.get("C") as number; // 0–0.5
  const H = store.get("H") as number; // 0–360(deg)
  const A = store.get("alpha") as number; // 0–1

  const oklchString = `oklch(${L}% ${C} ${H} / ${A})`;
  const { rgb, clipped } = oklchToSrgb(L / 100, C, H);
  const ch = (v: number) => Math.round(v * 255);
  const base = `rgb(${ch(rgb[0])} ${ch(rgb[1])} ${ch(rgb[2])})`;
  const fill = `rgb(${ch(rgb[0])} ${ch(rgb[1])} ${ch(rgb[2])} / ${A})`;

  const ladderLs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const ladder = ladderLs.map((stepL) => {
    const conv = oklchToSrgb(stepL / 100, C, H);
    const c = (v: number) => Math.round(v * 255);
    return {
      L: stepL,
      bg: `rgb(${c(conv.rgb[0])} ${c(conv.rgb[1])} ${c(conv.rgb[2])})`,
      clipped: conv.clipped,
      current: Math.abs(stepL - L) < 5,
      low: stepL <= 50,
    };
  });
  const ladderClipped = ladder.some((s) => s.clipped);

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="os-stage">
        <div className="os-top">
          <div className="os-swatch-wrap">
            <div className="os-checker" />
            <div className="os-fill" style={{ backgroundColor: fill }} />
            <span className="os-swatch-label">alpha 棋盘格 / checkerboard shows alpha</span>
          </div>
          <div className="os-panel">
            <span className="os-code">{oklchString}</span>
            <span className="os-code">≈ {base}</span>
            {clipped && (
              <span className="os-clip">
                主色溢出 sRGB 色域:已按浏览器现状裁剪(色相偏移);P3 屏可用 @media (color-gamut: p3) 放开。
                Out of sRGB gamut — clipped like browsers do; release chroma under @media (color-gamut: p3).
              </span>
            )}
            <span className="os-caption">
              等亮度阶梯 / equal-ΔL ladder below:同 C·H,仅 L 每 +10。
            </span>
          </div>
        </div>
        <div className="os-ladder" role="list" aria-label="同色相亮度阶梯 Same-hue lightness ladder">
          {ladder.map((s) => (
            <div
              key={s.L}
              role="listitem"
              className="os-step"
              data-current={s.current}
              data-low={s.low}
              style={{ backgroundColor: s.bg }}
              title={`oklch(${s.L}% ${C} ${H})`}
            >
              <span>{s.L}</span>
            </div>
          ))}
        </div>
        {ladderClipped && (
          <span className="os-clip" role="note">
            阶梯中部分高亮度档溢出 sRGB(高 L 可用色度骤降)。Some bright ladder steps exceed sRGB — available chroma collapses near white.
          </span>
        )}
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
