// 一次性脚本(幂等可重跑):给每个条目 schema.json 顶层写入 "nameZh" 中文名。
// 防漏防多:磁盘上每个条目必须在映射表内,映射表每个键必须在磁盘上存在;任一不满足即报错退出。
// 用法: node uiux-atlas/scripts/add-name-zh.mjs  (exit 0 = 通过)
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const entriesRoot = join(root, "src", "content", "entries");

/** cat/slug → 中文名(43 条,与 docs/design-spec.md §0 的条目规模一一对应) */
const NAME_ZH = {
  "styles/glassmorphism": "毛玻璃",
  "styles/neumorphism": "新拟物",
  "styles/claymorphism": "黏土拟物",
  "styles/neo-brutalism": "新粗野主义",
  "styles/minimalism": "极简主义",
  "styles/cyberpunk": "赛博朋克",
  "styles/bento-grid": "便当盒布局",
  "materials/backdrop-filter": "背景滤镜",
  "materials/filter-functions": "滤镜函数族",
  "materials/liquid-glass": "液态玻璃",
  "materials/swiftui-materials": "SwiftUI 材质",
  "materials/fluent-acrylic": "Fluent 亚克力",
  "materials/fluent-mica": "Fluent 云母",
  "materials/m3-state-layers": "M3 状态层",
  "materials/aurora-gradient": "极光渐变",
  "materials/grain-gradient": "颗粒噪点渐变",
  "materials/blend-modes": "混合模式",
  "materials/theme-shadow": "Fluent 主题阴影",
  "materials/glass-effect-api": "玻璃效果 API",
  "motion/motion-spring": "物理弹簧",
  "motion/cubic-bezier": "贝塞尔缓动",
  "motion/swiftui-spring": "SwiftUI 弹簧",
  "motion/m3-spring-tokens": "M3 弹簧令牌",
  "motion/scroll-driven-animations": "滚动驱动动画",
  "motion/view-transitions": "视图过渡",
  "motion/count-up": "数字滚动",
  "motion/inertia-gesture": "惯性手势",
  "motion/skeleton-loading": "骨架屏",
  "motion/stagger-orchestration": "编排交错",
  "motion/linear-easing": "linear() 缓动",
  "color/oklch-workflow": "OKLCH 选色工作流",
  "color/oklch-space": "OKLCH 色彩空间",
  "color/hct-tonal-palette": "HCT 色调调色板",
  "color/m3-dynamic-color": "动态取色",
  "color/radix-color-scale": "Radix 色阶",
  "color/light-dark": "明暗自适应",
  "color/rule-60-30-10": "60-30-10 法则",
  "color/wcag-contrast": "WCAG 对比度",
  "color/gradient-interpolation": "渐变插值",
  "type/fluid-type-scale": "流式字阶",
  "type/variable-fonts": "可变字体",
  "type/fluid-spacing": "流式间距",
  "layout/container-queries": "容器查询",
};

const problems = [];

// ---------- 收集磁盘上的条目 ----------
const onDisk = [];
for (const cat of ["styles", "materials", "motion", "color", "type", "layout"]) {
  const catDir = join(entriesRoot, cat);
  if (!existsSync(catDir)) continue;
  for (const slug of readdirSync(catDir).filter((n) => statSync(join(catDir, n)).isDirectory())) {
    if (existsSync(join(catDir, slug, "schema.json"))) onDisk.push(`${cat}/${slug}`);
  }
}

// ---------- 防漏:映射的每个键必须在磁盘上 ----------
for (const key of Object.keys(NAME_ZH)) {
  if (!onDisk.includes(key)) problems.push(`mapping key not on disk: ${key}`);
}
// ---------- 防多:磁盘的每个条目必须在映射内 ----------
for (const id of onDisk) {
  if (!(id in NAME_ZH)) problems.push(`on-disk entry missing from mapping: ${id}`);
}
if (problems.length > 0) {
  console.error("=== inventory mismatch (mapping vs src/content/entries) ===");
  for (const p of problems) console.error(" -", p);
  process.exit(1);
}

// ---------- 写入 nameZh(name 行之后;已存在则覆盖) ----------
// 外科手术式插入:仅在 "name" 行后插一行 "nameZh",不重排其余字节(保持原文件格式/单行数组)。
let updated = 0;
let unchanged = 0;
const NAME_LINE = /^  "name": "(?:[^"\\]|\\.)*",\n/m;
const NAMEZH_LINE = /^  "nameZh": .*\n/m;
for (const id of onDisk) {
  const p = join(entriesRoot, id, "schema.json");
  // 行尾归一为 LF:本文件在工作区原本就是 LF;autocrlf 环境下 checkout 可能改写为 CRLF,
  // 统一归一后写入,保证幂等且 diff 仅含新增的 nameZh 行。
  const raw = readFileSync(p, "utf8").replaceAll("\r\n", "\n");
  JSON.parse(raw); // 先验证是合法 JSON,写坏即失败
  if (!NAME_LINE.test(raw)) {
    console.error(`cannot locate "name" line in ${id}/schema.json — abort, nothing written`);
    process.exit(1);
  }
  // 幂等:先剥掉已有 nameZh 行,再插入(已存在则覆盖)
  const base = raw.replace(NAMEZH_LINE, "");
  const text = base.replace(NAME_LINE, (m) => `${m}  "nameZh": ${JSON.stringify(NAME_ZH[id])},\n`);
  if (text !== raw) {
    writeFileSync(p, text, "utf8");
    updated += 1;
  } else {
    unchanged += 1;
  }
}

console.log(JSON.stringify({ entries: onDisk.length, updated, unchanged }));
console.log("add-name-zh: PASS");
