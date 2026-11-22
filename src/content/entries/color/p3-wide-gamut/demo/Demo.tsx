import { useEffect, useState, type CSSProperties } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/* ---------- 色彩转换(常数为 CSS Color 4 官方 sample 矩阵;已离线 roundtrip 验证:
   oklch(1 0 0)→P3=白; sRGB #FF0000→oklch 0.6280/0.2577/29.23 ✓ ---------- */

function oklchToOklab(L: number, C: number, H: number): [number, number, number] {
  const h = (H * Math.PI) / 180;
  return [L, C * Math.cos(h), C * Math.sin(h)];
}

function oklabToXyz([L, a, b]: [number, number, number]): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    1.2270138511 * l - 0.5577999757 * m + 0.281256149 * s,
    -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s,
    -0.0763812845 * l - 0.4214819784 * m + 1.5863226978 * s,
  ];
}

/** XYZ(D65) → linear-sRGB(CSS Color 4) */
function xyzToLinearSrgb([X, Y, Z]: [number, number, number]): [number, number, number] {
  return [
    3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z,
    -0.969266 * X + 1.8760108 * Y + 0.041556 * Z,
    0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z,
  ];
}

/** XYZ(D65) → linear-P3(CSS Color 4) */
function xyzToLinearP3([X, Y, Z]: [number, number, number]): [number, number, number] {
  return [
    2.4934969119 * X - 0.9313836179 * Y - 0.4027107845 * Z,
    -0.8294889696 * X + 1.7696646797 * Y + 0.0236248852 * Z,
    0.0358458302 * X - 0.0761723893 * Y + 0.956884524 * Z,
  ];
}

const gamma = (x: number) => {
  const a = Math.abs(x);
  return Math.sign(x) * (a <= 0.0031308 ? 12.92 * a : 1.055 * Math.cbrt(a) - 0.055);
};

const inSrgbGamut = (lin: [number, number, number]) =>
  lin.every((v) => v >= -1e-4 && v <= 1 + 1e-4);

/** CSS Color 4 gamut mapping 精神:降 chroma、保色相与明度(二分) */
function clampChromaToSrgb(L: number, C: number, H: number): number {
  if (inSrgbGamut(oklchToLinSrgb(L, C, H))) return C;
  let lo = 0, hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inSrgbGamut(oklchToLinSrgb(L, mid, H))) lo = mid;
    else hi = mid;
  }
  return lo;
}

function oklchToLinSrgb(L: number, C: number, H: number): [number, number, number] {
  return xyzToLinearSrgb(oklabToXyz(oklchToOklab(L, C, H)));
}

/** oklch → P3 分量(gamma 编码,CSS Color 4 官方矩阵) */
function oklchToP3(L: number, C: number, H: number): [number, number, number] {
  return xyzToLinearP3(oklabToXyz(oklchToOklab(L, C, H))).map(gamma) as [number, number, number];
}

const fmt = (v: number) => Math.round(v * 1000) / 1000;

/* ---------- demo ---------- */

const css = `
.p3-scene { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; padding: 16px; --p3-l: 0.8; }
.p3-pair { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.p3-swatch {
  position: relative; display: flex; flex-direction: column; justify-content: flex-end;
  gap: 4px; padding: 12px; border-radius: 12px; color: #10131a;
  border: 1px solid rgb(0 0 0 / 0.14); box-shadow: 0 2px 10px rgb(0 0 0 / 0.16);
  font-size: 12px; overflow: hidden;
}
.p3-swatch h4 { margin: 0; font-size: 13px; font-weight: 650; }
.p3-swatch code { font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; background: rgb(255 255 255 / 0.62); padding: 2px 5px; border-radius: 5px; width: fit-content; overflow-wrap: anywhere; }
.p3-trio {
  font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; line-height: 1.55;
  padding: 9px 11px; border-radius: 10px; background: rgb(16 19 26 / 0.92); color: #e8ecf5;
  white-space: pre; overflow: auto; flex: 0 0 auto;
}
.p3-meta { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; }
.p3-chip { padding: 2px 9px; border-radius: 999px; border: 1px solid rgb(128 138 160 / 0.35); background: rgb(255 255 255 / 0.55); font-variant-numeric: tabular-nums; }
.p3-chip-warn { color: oklch(0.55 0.18 30); border-color: currentColor; }
@media (max-width: 480px) {
  .p3-scene { padding: 10px; }
  .p3-trio { font-size: 9.5px; }
}
`;

/**
 * P3 广色域演示:左 = sRGB 兜底(按 CSS Color 4 精神降 chroma 保色相),
 * 右 = color(display-p3 …) 增强层(坐标由 sRGB 值转换而来,同明度同色相)。
 * hue/chroma 为 CSS 变量型参数;mode 为 JS 型参数(srgb 时撤下增强层作对照)。
 * 色域徽标来自 matchMedia('(color-gamut: p3)'),监听 change 实时更新。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const readParams = () => ({
    hue: store.get("hue") as number,
    chroma: store.get("chroma") as number,
    mode: store.get("mode") as string,
  });
  const [params, setParams] = useState(readParams);
  const [gamutP3, setGamutP3] = useState<boolean | null>(null);

  useEffect(
    () =>
      store.subscribe(() => {
        setParams(readParams());
      }),
    [store],
  );

  useEffect(() => {
    const mq = window.matchMedia("(color-gamut: p3)");
    setGamutP3(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setGamutP3(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const L = 0.8;
  const { hue, chroma, mode } = params;
  const clampedChroma = clampChromaToSrgb(L, chroma, hue);
  const wasClamped = clampedChroma < chroma - 5e-4;
  const srgbCss = `oklch(${L} ${fmt(clampedChroma)} ${hue})`;
  const p3 = oklchToP3(L, chroma, hue);
  const p3Css = `color(display-p3 ${fmt(p3[0])} ${fmt(p3[1])} ${fmt(p3[2])})`;
  const enhanced = mode === "p3";

  const rightStyle: CSSProperties = enhanced
    ? { background: p3Css }
    : { background: srgbCss };

  const trioText = [
    `/* 渐进增强三件套(调研 06§3) */`,
    `.brand-accent {`,
    `  /* 1) sRGB 兜底:每台屏幕都能显示 */`,
    `  color: ${srgbCss};`,
    `}`,
    `/* 2) @supports 测 color() 语法  3) @media 测屏幕色域 */`,
    `@supports (color: color(display-p3 1 0 0)) {`,
    `  @media (color-gamut: p3) {`,
    `    .brand-accent {`,
    `      color: ${p3Css};`,
    `    }`,
    `  }`,
    `}`,
  ].join("\n");

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="p3-scene">
        <div className="p3-pair">
          <div className="p3-swatch" style={{ background: srgbCss }}>
            <h4>sRGB 兜底 sRGB fallback</h4>
            <code>{srgbCss}</code>
            {wasClamped && <span>chroma {chroma.toFixed(2)} → {clampedChroma.toFixed(2)}(降 chroma 保色相)</span>}
          </div>
          <div className="p3-swatch" style={rightStyle}>
            <h4>P3 增强层 {enhanced ? "" : "(已撤下)"}</h4>
            {enhanced ? <code>{p3Css}</code> : <span>对照:同一颜色不带增强规则的观感</span>}
          </div>
        </div>
        <pre className="p3-trio">{trioText}</pre>
        <div className="p3-meta">
          <span className="p3-chip">mode: {mode}</span>
          <span className="p3-chip">L 固定 {L}(配黑字的可用明度)</span>
          {gamutP3 === null ? (
            <span className="p3-chip">色域检测中… detecting…</span>
          ) : gamutP3 ? (
            <span className="p3-chip">当前屏幕: P3 色域 / wide gamut — 右块更饱和</span>
          ) : (
            <span className="p3-chip p3-chip-warn">当前屏幕: sRGB — 两块近似(浏览器 gamut map)</span>
          )}
        </div>
        <style>{css}</style>
      </div>
    </DemoStage>
  );
}
