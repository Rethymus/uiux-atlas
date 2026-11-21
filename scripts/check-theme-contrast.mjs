#!/usr/bin/env node
/**
 * check-theme-contrast.mjs — 主题语义 token WCAG 对比度门禁(纯 node,零依赖)
 *
 * 读取 src/styles/global.css,解析两套主题的语义 token 值:
 *   :root                       = 深色(默认主题)
 *   :root[data-theme="light"]   = 浅色主题(v2.1「语义层不变、值分主题」)
 * 对两套主题各自实算以下配对(spec v2.2 阈值纪律):
 *   --text      / --bg、--surface   ≥ 4.5:1(正文/文本 WCAG AA)
 *   --text-dim  / --bg、--surface   ≥ 4.5:1(secondary 正文 AA)
 *   --text-faint/ --bg              ≥ 4.5:1(tertiary label/meta AA)
 *   --accent    / --bg              ≥ 3:1(WCAG 1.4.11 非文本/UI 组件)
 *
 * 颜色格式支持(与 token 表一致):#rgb/#rrggbb/#rrggbbaa、rgb()/rgba()
 * (旧逗号语法与新斜杠语法均可)、oklch(L C H / a)(CSS Color 4 标准数学,
 * OKLab→linear-sRGB 矩阵见 oklchToLinearSrgb() 注释,公式出处 Björn Ottosson
 * 2020 参考实现 = W3C css-color-4 规范同值)。
 * 带透明度(a<1)的色值先在 sRGB gamma 空间对配对底色做 alpha 合成(浏览器
 * 对普通颜色的合成方式),再算对比度。
 *
 * 结果:任何配对不达标 → exit 1;全部达标 → exit 0。
 * 输出:人类可读明细 + 单行 JSON 各一份(均 stdout);
 *       --json      仅输出单行 JSON(供脚本消费);
 *       --self-test 自检 oklch→sRGB 数学(白/黑锚点 + sRGB 红锚点,不读 CSS)。
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.resolve(here, "..", "src", "styles", "global.css");

/* ────────────────────────── 配对与阈值 ────────────────────────── */
const PAIRS = [
  { fg: "--text", bg: "--bg", min: 4.5, kind: "text", label: "正文 primary vs 页面底" },
  { fg: "--text", bg: "--surface", min: 4.5, kind: "text", label: "正文 primary vs 卡片面" },
  { fg: "--text-dim", bg: "--bg", min: 4.5, kind: "text", label: "secondary 正文 vs 页面底" },
  { fg: "--text-dim", bg: "--surface", min: 4.5, kind: "text", label: "secondary 正文 vs 卡片面" },
  { fg: "--text-faint", bg: "--bg", min: 4.5, kind: "text", label: "tertiary label/meta vs 页面底" },
  { fg: "--accent", bg: "--bg", min: 3, kind: "ui", label: "UI 组件强调色 vs 页面底(非文本 3:1)" },
];
const THEMES = [
  { key: "dark", selector: ":root", note: ":root(深色,默认)" },
  { key: "light", selector: ':root[data-theme="light"]', note: ':root[data-theme="light"](浅色)' },
];

/* ────────────────────────── CSS 解析 ────────────────────────── */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** 定位选择器所在规则,花括号配平取块体(容忍块内无嵌套,token 块即如此) */
function extractBlock(css, selectorRegex) {
  const m = selectorRegex.exec(css);
  if (!m) return null;
  const open = css.indexOf("{", m.index);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  return null;
}

/** 提取块内全部自定义属性声明 `--name: value;` */
function parseProps(block) {
  const map = new Map();
  const re = /(--[A-Za-z0-9-]+)\s*:\s*([^;{}]+);/g;
  let m;
  while ((m = re.exec(block))) map.set(m[1], m[2].trim());
  return map;
}

/** 解析 var(--x[, fallback]) 引用链:先查本主题,再回落 :root;带环检测 */
function resolveToken(name, themeMap, rootMap, seen = new Set()) {
  if (seen.has(name)) return null; // 循环引用防御
  seen.add(name);
  const raw = themeMap.has(name) ? themeMap.get(name) : rootMap.get(name);
  if (raw === undefined) return null;
  const ref = raw.match(/^var\(\s*(--[A-Za-z0-9-]+)\s*(?:,\s*([^)]+?))?\s*\)$/);
  if (ref) {
    const resolved = resolveToken(ref[1], themeMap, rootMap, seen);
    if (resolved !== null) return resolved;
    if (ref[2] !== undefined) return ref[2].trim(); // var() 兜底值
    return null;
  }
  return raw;
}

/* ────────────────────────── 颜色解析 ────────────────────────── */
/** 数字或百分比;scale:百分比值 = pct/100 × scale(如 L 的 scale=1、C 的 scale=0.4) */
function unitNum(token, scale) {
  const m = token.match(/^(-?[\d.]+)%$/);
  if (m) return (parseFloat(m[1]) / 100) * scale;
  const v = parseFloat(token);
  return Number.isNaN(v) ? null : v;
}

function hexToSrgb(str) {
  const m = str.match(/^#([0-9a-f]+)$/);
  if (!m) return null;
  const h = m[1];
  if (![3, 4, 6, 8].includes(h.length)) return null;
  const full = h.length <= 4 ? [...h].map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const a = full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function rgbFuncToSrgb(str) {
  const m = str.match(/^rgba?\(([^)]+)\)$/);
  if (!m) return null;
  const body = m[1];
  let chans, alpha = 1;
  if (body.includes("/")) {
    // 新语法:rgb(R G B / a)
    const [rgbPart, aPart] = body.split("/");
    chans = rgbPart.trim().split(/[\s,]+/).filter(Boolean);
    alpha = unitNum(aPart.trim(), 1);
  } else {
    // 旧语法:rgba(R, G, B, a) / rgb(R, G, B)
    const arr = body.split(",").map((x) => x.trim());
    if (arr.length === 4) {
      alpha = parseFloat(arr[3]);
      chans = arr.slice(0, 3);
    } else chans = arr;
  }
  if (chans.length !== 3 || alpha === null || Number.isNaN(alpha)) return null;
  const c = chans.map((t) => (t.endsWith("%") ? parseFloat(t) / 100 : parseFloat(t) / 255));
  if (c.some((v) => Number.isNaN(v))) return null;
  return { r: c[0], g: c[1], b: c[2], a: alpha };
}

/**
 * oklch(L C H / a) → sRGB(gamma 编码,0..1)
 * 标准数学(CSS Color 4 / Ottosson OKLab 参考实现):
 *   ① oklch → oklab:a = C·cos(H),b = C·sin(H)(H 单位度)
 *   ② oklab → 非线性 LMS′:
 *        l′ = L + 0.3963377774·a + 0.2158037576·b
 *        m′ = L − 0.1055613458·a − 0.0638541728·b
 *        s′ = L − 0.0894841775·a − 1.2914855480·b
 *   ③ LMS = (l′)³, (m′)³, (s′)³(立方去非线性)
 *   ④ LMS → linear sRGB(参考实现矩阵,逐位一致):
 *        r = +4.0767416621·l − 3.3077115913·m + 0.2309699292·s
 *        g = −1.2684380046·l + 2.6097574011·m − 0.3413193965·s
 *        b = −0.0041960863·l − 0.7034186147·m + 1.7076147010·s
 *   ⑤ gamma 编码:c ≤ 0.0031308 ? 12.92·c : 1.055·c^(1/2.4) − 0.055
 *   ⑥ 超出 sRGB 色域的通道截断到 [0,1](门禁只关心带内色)。
 */
function oklchToLinearSrgb(L, C, Hdeg) {
  const rad = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(rad);
  const b = C * Math.sin(rad);
  const l_ = L + 0.3963377774 * a + 0.2158037576 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const mm = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return {
    r: 4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  };
}
function gammaEncode(c) {
  const t = Math.min(1, Math.max(0, c));
  return t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055;
}
function oklchFuncToSrgb(str) {
  const m = str.match(/^oklch\(([^)]+)\)$/);
  if (!m) return null;
  const [main, aPart] = m[1].split("/").map((x) => x?.trim());
  const lch = main.split(/[\s,]+/).filter(Boolean);
  if (lch.length !== 3) return null;
  const L = unitNum(lch[0], 1); // 百分比 → /100
  const C = unitNum(lch[1], 0.4); // CSS Color 4:chroma 100% ≙ 0.4
  const hm = lch[2].match(/^(-?[\d.]+)(?:deg)?$/);
  if (L === null || C === null || !hm) return null;
  const a = aPart === undefined || aPart === "" ? 1 : unitNum(aPart, 1);
  if (a === null || Number.isNaN(a)) return null;
  const lin = oklchToLinearSrgb(L, C, parseFloat(hm[1]));
  return { r: gammaEncode(lin.r), g: gammaEncode(lin.g), b: gammaEncode(lin.b), a };
}

/** 解析单值 → {r,g,b,a}(gamma 编码 sRGB,0..1);不认识的格式返回 null */
function parseColor(raw) {
  const s = raw.trim().toLowerCase();
  return hexToSrgb(s) ?? rgbFuncToSrgb(s) ?? oklchFuncToSrgb(s) ?? null;
}

/* ────────────────────────── WCAG 2.x 对比度 ────────────────────────── */
function channelLum(c) {
  // WCAG 2.1 定义:sRGB 通道 → 线性值(阈值 WCAG 文本写 0.03928,IEC sRGB 标准写
  // 0.04045;两者在 8-bit 量化粒度内对所有可取值结果完全一致,取 WCAG 原文值)
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relativeLuminance({ r, g, b }) {
  // L = 0.2126·R + 0.7152·G + 0.0722·B(WCAG 2.1 定义)
  return 0.2126 * channelLum(r) + 0.7152 * channelLum(g) + 0.0722 * channelLum(b);
}
function contrastRatio(c1, c2) {
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}
/** alpha < 1 的前景先对底色做 sRGB gamma 空间合成(浏览器普通颜色合成方式) */
function compositeOver(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

/* ────────────────────────── 自检(oklch 数学锚点) ────────────────────────── */
function selfTest() {
  // 锚点 1/2:oklch(1 0 0)=白、oklch(0 0 0)=黑(亮度轴端点,矩阵符号错误必挂)
  // 锚点 3:sRGB 红 #ff0000 的公认 oklch 表示 ≈ oklch(62.7955% 0.257683 29.2338°)
  //   (Ottosson 参考表 / oklch.com 共识值),换算回 sRGB 应还原 (255,0,0)±1
  const cases = [
    { l: 1, c: 0, h: 0, rgb: [255, 255, 255], name: "oklch(1 0 0) = #ffffff" },
    { l: 0, c: 0, h: 0, rgb: [0, 0, 0], name: "oklch(0 0 0) = #000000" },
    { l: 0.627955, c: 0.257683, h: 29.2338, rgb: [255, 0, 0], name: "oklch(≈red) ≈ #ff0000" },
  ];
  let ok = true;
  for (const t of cases) {
    const lin = oklchToLinearSrgb(t.l, t.c, t.h);
    const out = [lin.r, lin.g, lin.b].map((v) => Math.round(gammaEncode(v) * 255));
    const dev = Math.max(...out.map((v, i) => Math.abs(v - t.rgb[i])));
    const pass = dev <= 1;
    ok = ok && pass;
    console.log(`self-test ${pass ? "PASS" : "FAIL"}  ${t.name} → rgb(${out.join(", ")}) (±1 内)`);
  }
  return ok;
}

/* ────────────────────────── 主流程 ────────────────────────── */
function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) process.exit(selfTest() ? 0 : 1);
  const jsonOnly = args.includes("--json");

  let css;
  try {
    css = stripComments(readFileSync(cssPath, "utf8"));
  } catch (e) {
    console.error(`cannot read ${cssPath}: ${e.message}`);
    process.exit(1);
  }

  const themeMaps = {};
  const errors = [];
  for (const t of THEMES) {
    // 选择器正则:light 带属性限定,避免误匹配 `:root[data-theme] .x` 等后代规则
    const re = new RegExp(
      t.selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\{"
    );
    const block = extractBlock(css, re);
    if (!block) {
      errors.push(`selector not found: ${t.selector}`);
      continue;
    }
    themeMaps[t.key] = parseProps(block);
  }
  const rootMap = themeMaps.dark ?? new Map();

  const results = [];
  for (const t of THEMES) {
    const themeMap = themeMaps[t.key];
    if (!themeMap) continue;
    for (const p of PAIRS) {
      const fgRaw = resolveToken(p.fg, themeMap, rootMap);
      const bgRaw = resolveToken(p.bg, themeMap, rootMap);
      const fg = fgRaw === null ? null : parseColor(fgRaw);
      const bg = bgRaw === null ? null : parseColor(bgRaw);
      const id = `${t.key} ${p.fg}/${p.bg}`;
      if (!fg || !bg) {
        errors.push(`${id}: cannot resolve/parse (${p.fg}=${fgRaw ?? "∅"}, ${p.bg}=${bgRaw ?? "∅"})`);
        continue;
      }
      const ratio = contrastRatio(compositeOver(fg, bg), bg);
      results.push({
        theme: t.key,
        fg: p.fg,
        fgValue: fgRaw,
        bg: p.bg,
        bgValue: bgRaw,
        ratio: Math.round(ratio * 100) / 100,
        min: p.min,
        kind: p.kind,
        pass: ratio >= p.min,
      });
    }
  }

  const ok = errors.length === 0 && results.length === THEMES.length * PAIRS.length && results.every((r) => r.pass);
  const json = JSON.stringify({
    ok,
    file: path.relative(path.resolve(here, ".."), cssPath).replace(/\\/g, "/"),
    thresholds: { text: 4.5, ui: 3 },
    results,
    errors,
  });

  if (jsonOnly) {
    console.log(json);
  } else {
    console.log(`主题对比度门禁 — ${path.basename(cssPath)}(WCAG 2.1 实算;正文/文本 ≥4.5:1,UI 组件 ≥3:1)`);
    for (const t of THEMES) {
      console.log(`\n[${t.note}]`);
      for (const r of results.filter((x) => x.theme === t.key)) {
        const kind = r.kind === "text" ? "文本 4.5" : "UI 3";
        console.log(
          `  ${r.pass ? "PASS" : "FAIL"}  ${r.fg.padEnd(13)} ${r.fgValue}  vs  ${r.bg.padEnd(11)} ${r.bgValue}  → ${r.ratio.toFixed(2)}:1  (阈值 ≥${kind})`
        );
      }
    }
    if (errors.length) {
      console.log("\n错误:");
      for (const e of errors) console.log(`  - ${e}`);
    }
    console.log(`\n结论:${results.filter((r) => r.pass).length}/${results.length} 配对达标,${errors.length} 个解析错误 → exit ${ok ? 0 : 1}`);
    console.log(json); // 单行 JSON 明细(机器可读一份)
  }
  process.exit(ok ? 0 : 1);
}

main();
