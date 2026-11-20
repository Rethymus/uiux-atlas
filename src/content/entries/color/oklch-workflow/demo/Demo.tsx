import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * oklch → 线性 sRGB → gamma sRGB:标准数学(Björn Ottosson 2020 公布的 Oklab 矩阵,
 * 与 CSS Color 4 规范一致),无第三方包。越出 [0,1] 的通道按浏览器现状直接裁剪
 * (Chrome/Safari 尚未做规范要求的降 chroma gamut mapping——Evil Martians 实测),
 * 裁剪与否通过 clipped 标志如实上报。
 */
function oklchToSrgb(l01: number, c: number, hDeg: number): { rgb: [number, number, number]; clipped: boolean } {
  const h = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  // Oklab → LMS'(立方根域)
  const l_ = l01 + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l01 - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l01 - 0.0894841775 * a - 1.291485548 * b;
  const L = l_ * l_ * l_;
  const M = m_ * m_ * m_;
  const S = s_ * s_ * s_;
  // LMS → 线性 sRGB
  const lin = [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
  const clipped = lin.some((v) => v < 0 - 1e-9 || v > 1 + 1e-9);
  const clamped = lin.map((v) => Math.min(1, Math.max(0, v)));
  // 线性 sRGB → gamma sRGB(CSS Color 4 的 sRGB transfer function)
  const gam = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
  return { rgb: clamped.map((v) => gam(v)) as [number, number, number], clipped };
}

/** WCAG 相对亮度与对比度(gamma sRGB 输入,先按 WCAG 2.1 线性化;阈值不得四舍五入) */
function luminance([r, g, b]: [number, number, number]): number {
  // WCAG 线性化:unlin = v<=0.04045 ? v/12.92 : ((v+0.055)/1.055)^2.4
  const unlin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * unlin(r) + 0.7152 * unlin(g) + 0.0722 * unlin(b);
}

const css = `
.oc-stage { position: absolute; inset: 0; display: flex; align-items: stretch; gap: 16px; padding: 18px; }
.oc-swatch {
  flex: 1.2;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 20px 24px;
  min-width: 0;
  transition: background-color 0.18s ease;
}
.oc-swatch .oc-sample { font-size: 17px; font-weight: 600; line-height: 1.4; }
.oc-swatch .oc-aa { font-size: 11.5px; opacity: 0.75; font-weight: 500; }
.oc-swatch .oc-black { color: #000; }
.oc-swatch .oc-white { color: #fff; }
.oc-panel {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 9px;
  font-size: 12.5px;
  color: var(--text-dim);
}
.oc-code {
  font-family: ui-monospace, "JetBrains Mono", Consolas, monospace;
  font-size: 12.5px;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 10px;
  overflow-wrap: anywhere;
}
.oc-contrast {
  display: flex;
  align-items: center;
  gap: 8px;
  font-variant-numeric: tabular-nums;
}
.oc-ratio { font-size: 15px; font-weight: 650; color: var(--text); }
.oc-badge {
  padding: 1.5px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}
.oc-pass { background: oklch(0.6 0.15 150); }
.oc-fail { background: oklch(0.55 0.19 25); }
.oc-clip {
  color: var(--text);
  background: color-mix(in srgb, oklch(0.75 0.15 85) 30%, transparent);
  border: 1px solid color-mix(in srgb, oklch(0.6 0.15 85) 55%, transparent);
  padding: 5px 9px;
  border-radius: 8px;
  font-size: 11.5px;
  line-height: 1.45;
}
@media (prefers-reduced-motion: reduce) {
  .oc-swatch { transition: none; }
}
`;

const fmtRatio = (r: number): string => `${r.toFixed(2)}:1`;

/**
 * OKLCH 工作流演示:大色块 + 示例文本,L/C/H 订阅后拼 oklch() 字符串;
 * demo 内实现 oklch→sRGB 标准换算并实时计算对黑/白两色底的 WCAG 对比度。
 * 依据 Evil Martians 工作流(调研 06§2):L=0.8 任意色相配黑字清晰;C 实测上限≈0.37。
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
  const C = store.get("C") as number; // 0–0.37
  const H = store.get("H") as number; // 0–360(deg)

  const oklchString = `oklch(${L}% ${C} ${H})`;
  const { rgb, clipped } = oklchToSrgb(L / 100, C, H);
  const paint = `rgb(${rgb.map((v) => Math.round(v * 255)).join(" ")})`;
  const y = luminance(rgb);
  // 对比度:黑底文字比值 = (Y+0.05)/0.05;白底文字比值 = 1.05/(Y+0.05)
  const vsBlack = (y + 0.05) / 0.05;
  const vsWhite = 1.05 / (y + 0.05);

  const badges = (ratio: number) => (
    <>
      <span className={`oc-badge ${ratio >= 4.5 ? "oc-pass" : "oc-fail"}`}>
        AA {ratio >= 4.5 ? "✓" : "✗"}
      </span>
      <span className={`oc-badge ${ratio >= 7 ? "oc-pass" : "oc-fail"}`}>
        AAA {ratio >= 7 ? "✓" : "✗"}
      </span>
    </>
  );

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="oc-stage">
        <div className="oc-swatch" style={{ backgroundColor: paint }}>
          <span className="oc-sample oc-black">黑字示例 / Black text</span>
          <span className="oc-aa oc-black">正文按 4.5:1(AA)· 7:1(AAA)判定 / body text thresholds</span>
          <span className="oc-sample oc-white">白字示例 / White text</span>
          <span className="oc-aa oc-white">大字阈值减半:3:1(AA)· 4.5:1(AAA) / large-text thresholds</span>
        </div>
        <div className="oc-panel">
          <span className="oc-code">{oklchString}</span>
          <span className="oc-code">≈ {paint}</span>
          <div className="oc-contrast">
            <span>对黑字 / vs black</span>
            <span className="oc-ratio">{fmtRatio(vsBlack)}</span>
            {badges(vsBlack)}
          </div>
          <div className="oc-contrast">
            <span>对白字 / vs white</span>
            <span className="oc-ratio">{fmtRatio(vsWhite)}</span>
            {badges(vsWhite)}
          </div>
          {clipped && (
            <span className="oc-clip">
              超出 sRGB 色域:已按浏览器现状直接裁剪 RGB(色相会偏移);P3 覆盖规则请手写。
              Out of sRGB gamut — clipped like browsers do; hand-write P3 overrides.
            </span>
          )}
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
