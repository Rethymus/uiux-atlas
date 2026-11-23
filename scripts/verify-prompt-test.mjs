// Prompt 复刻实弹测试:核验"复刻代理"仅凭导出 prompt 生成的 HTML 是否命中关键参数。
// 核验点对齐 glassmorphism schema 的 promptTemplate 验收要点(官方默认值:
// blur 20px / fill alpha 0.15 / border 1px alpha 0.3 / radius 20px / 彩色背景)。
// 兼容两种实现形态:字面量值或 CSS 自定义属性(--xxx: 20px + var() 引用)。
// 用法: node scripts/verify-prompt-test.mjs  (exit 0 = 命中 >= 5/7)
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
// scripts/ → 仓库根;复刻产物作为测试夹具随仓库入库(out/prompt-test/),干净克隆也能跑
const repoRoot = resolve(scriptDir, "..");
const target = join(repoRoot, "out", "prompt-test", "glassmorphism.html");

const CHECKS = [
  { name: "backdrop-filter 应用", re: /backdrop-filter\s*:/ },
  { name: "-webkit-backdrop-filter 前缀兜底", re: /-webkit-backdrop-filter\s*:/ },
  { name: "blur = 20px(字面量或 CSS 变量)", re: /blur\(\s*20px\s*\)|--[\w-]*blur[\w-]*\s*:\s*20px/ },
  { name: "border-radius = 20px(字面量或 CSS 变量)", re: /border-radius\s*:[^;]*20px|--[\w-]*radius[\w-]*\s*:\s*20px/ },
  { name: "填充 alpha ≈ 0.15(或 15%)", re: /0\.15\b|15%/ },
  { name: "描边 1px + alpha ≈ 0.3(或 30%)", re: /1px[^;\n]*0\.3\b|1px[^;\n]*30%/ },
  { name: "彩色照片或渐变背景", re: /gradient\(|url\([^)]*\.(jpe?g|png|webp)/i },
];

if (!existsSync(target)) {
  console.log(JSON.stringify({ passed: 0, total: CHECKS.length, details: ["file missing: out/prompt-test/glassmorphism.html"] }));
  console.error("verify-prompt-test: FAIL (file missing)");
  process.exit(1);
}

const html = readFileSync(target, "utf8");
const details = [];
let passed = 0;
for (const c of CHECKS) {
  const hit = c.re.test(html);
  if (hit) passed += 1;
  details.push(`${hit ? "HIT" : "MISS"}: ${c.name}`);
}
console.log(JSON.stringify({ passed, total: CHECKS.length, details }));
console.log(passed >= 5 ? "verify-prompt-test: PASS" : "verify-prompt-test: FAIL (below 5/7)");
process.exit(passed >= 5 ? 0 : 1);
