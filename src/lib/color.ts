/**
 * 站点级共享色彩换算(供 ContrastChecker 等站点组件消费)。
 *
 * 与既有条目 demo 内联换算是同一套标准数学(出处一致,不是新公式):
 * - oklch→sRGB:Oklabs(Björn Ottosson 2020)矩阵 + CSS Color 4 sRGB transfer
 *   function,与 color/oklch-workflow demo/Demo.tsx 内联实现逐行同源;
 * - WCAG 2.1 相对亮度与对比度:W3C WCAG 2.1 Understanding,与
 *   color/wcag-contrast demo/Demo.tsx 内联实现同源。
 *
 * 既有条目 demo 按约束(禁改既有条目 demo)保持内联不动;本文件是
 * 站点侧组件的共享入口,后续新组件从这里取函数,不再复制公式。
 */

/** 0–1 域 gamma sRGB 三元组 */
export type Srgb01 = [number, number, number];

/**
 * oklch(L∈[0,1], C, H°) → gamma sRGB。
 * 越出 [0,1] 的通道按浏览器现状直接裁剪(Chrome/Safari 尚未做规范要求的
 * 降 chroma gamut mapping),是否裁剪经 clipped 标志如实上报。
 */
export function oklchToSrgb(
  l01: number,
  c: number,
  hDeg: number,
): { rgb: Srgb01; clipped: boolean } {
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
  return { rgb: clamped.map((v) => gam(v)) as Srgb01, clipped };
}

/**
 * WCAG 2.1 相对亮度(输入 0–1 域 gamma sRGB)。
 * 线性化:unlin = v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ^ 2.4
 */
export function srgbLuminance(rgb: Srgb01): number {
  const unlin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * unlin(rgb[0]) + 0.7152 * unlin(rgb[1]) + 0.0722 * unlin(rgb[2]);
}

/** WCAG 对比度 = (较亮亮度 + 0.05) / (较暗亮度 + 0.05),与前后景顺序无关 */
export function contrastRatio(a: Srgb01, b: Srgb01): number {
  const la = srgbLuminance(a);
  const lb = srgbLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export interface ParsedColor {
  /** 不透明 sRGB(0–1 域;alpha 不参与,调用方自行提示) */
  rgb01: Srgb01;
  /** alpha,缺省 1 */
  alpha: number;
  ok: boolean;
}

/** oklch(L C H[/A]):L 与 alpha 均支持 0–1 与 % 两种形式 */
const OKLCH_RE = /^oklch\(\s*(-?[\d.]+)(%?)\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*(-?[\d.]+)(%?))?\s*\)$/i;

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

function parseHexColor(input: string): ParsedColor | null {
  const m = input.trim().replace(/^#/, "");
  const full = m.length === 3 || m.length === 4 ? m.split("").map((ch) => ch + ch).join("") : m;
  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(full)) return null;
  return {
    rgb01: [
      parseInt(full.slice(0, 2), 16) / 255,
      parseInt(full.slice(2, 4), 16) / 255,
      parseInt(full.slice(4, 6), 16) / 255,
    ],
    alpha: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
    ok: true,
  };
}

/**
 * 双格式解析:oklch(L C H[/A]) 或 #RGB/#RGBA/#RRGGBB/#RRGGBBAA。
 * 非法输入返回 ok:false(调用方显示「无法解析」,不抛错)。
 * 注:alpha 不参与对比度比值(比值按不透明 sRGB 计算),调用方据 alpha<1 提示。
 */
export function parseColorInput(input: string): ParsedColor {
  const s = input.trim();
  if (s.startsWith("#")) {
    return parseHexColor(s) ?? { rgb01: [0, 0, 0], alpha: 1, ok: false };
  }
  const m = s.match(OKLCH_RE);
  if (m) {
    const lRaw = Number(m[1]);
    const cRaw = Number(m[3]);
    const hRaw = Number(m[4]);
    const aRaw = m[5] !== undefined ? Number(m[5]) : 1;
    if (![lRaw, cRaw, hRaw, aRaw].every(Number.isFinite)) {
      return { rgb01: [0, 0, 0], alpha: 1, ok: false };
    }
    let h = hRaw % 360;
    if (h < 0) h += 360;
    const { rgb } = oklchToSrgb(clamp01(m[2] === "%" ? lRaw / 100 : lRaw), clamp01(cRaw), h);
    return { rgb01: rgb, alpha: clamp01(m[6] === "%" ? aRaw / 100 : aRaw), ok: true };
  }
  return { rgb01: [0, 0, 0], alpha: 1, ok: false };
}

/**
 * gamma sRGB(0–1 域)→ oklch:oklchToSrgb 的逆变换(Oklab 正逆矩阵同为
 * Oklabs Björn Ottosson 2020 公开常数,与上方 oklchToSrgb 同源同出处,不是新公式)。
 * 返回 l/c 为 0–1 域、h 为角度;供站点组件消费(取色器桥接、程序化色板派生)。
 * 往返精度:本站会话实测 srgb→oklch→srgb 最大通道误差 1.61e-7(8bit hex 无损)。
 */
export function srgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const R = lin(r);
  const G = lin(g);
  const B = lin(b);
  // 线性 sRGB → LMS'(立方根域)→ Oklab
  const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
  const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
  const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const Bc = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const c = Math.sqrt(A * A + Bc * Bc);
  let h = (Math.atan2(Bc, A) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}

/** gamma sRGB(0–1 域)三元组 → #RRGGBB;alpha 传入且 <1 时输出 #RRGGBBAA(小写) */
export function rgb01ToHex(rgb: Srgb01, alpha?: number): string {
  const ch = (v: number) =>
    Math.round(Math.min(1, Math.max(0, v)) * 255)
      .toString(16)
      .padStart(2, "0");
  const base = `#${ch(rgb[0])}${ch(rgb[1])}${ch(rgb[2])}`;
  if (alpha === undefined || alpha >= 1) return base;
  return `${base}${ch(alpha)}`;
}
