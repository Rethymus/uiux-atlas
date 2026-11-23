// dist/ 关键页面性能门禁(零依赖:仅 node 内建模块;读产物断言,不写任何文件)。
// 用法:先 pnpm -C uiux-atlas run build,再 node scripts/check-perf.mjs(或 pnpm run check:perf)。
// 逐项打印明细,任一断言失败 exit 1。
//
// ═══ 阈值出处(本轮实测,2026-11-23 构建 399 页;含本轮「照片 img loading=lazy」修复后重测)═══
// · HTML 字节 = statSync(dist/<page>).size 实测值;预算 = ceil(实测 × 1.1)(ask 规定的上浮系数)。
//   六关键页基线(zh/en × 首页/分类页 styles/条目页 styles/glassmorphism):
//   zh 首页 36,655B → 预算 40,321B;en 首页 36,983B → 40,682B;
//   zh 分类页 38,914B → 42,806B;en 分类页 39,768B → 43,745B;
//   zh 条目页 63,606B → 69,967B;en 条目页 63,425B → 69,768B。
// · astro-island 数量上限 = 本轮全量实测分布(399 页逐页扫 `<astro-island`):
//   首页 2/2、分类页 20/20 页均 2、条目页 372/372 页均 4(资源/趋势/404 为 1,不在本门禁样页内)。
//   上限取实测值本身(回归门禁从严):新增岛屿必须是有意决策,须同步上调本表并留注释。
// · 照片 img = src 以 "/photos/" 开头的 <img>(站点全部照片资产 public/photos/glass-*.jpg);
//   断言全部含 loading="lazy"(本轮实测:修复前 2 张均无 lazy,修复后 12 张全部 lazy,
//   其中 dist 静态 HTML 可见者为首页 hero 直出的 glassmorphism demo 背景照 ×2)。
// · 关键字体 CSS 在 head = head 内存在 rel="stylesheet" 且 href 为 /_astro/*.css 的链接,
//   其目标文件磁盘实读含 @font-face(Inter Variable / Noto Sans SC 全部声明都在该打包 CSS);
//   另断言 head 内 rel="preload" as="font" 的 LCP 字体预载链接在位(scripts/integration-font-preload.mjs
//   于 astro:build:done 注入,本轮实测 399/399 页)且 href 指向的 woff2 磁盘实存。
import { statSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const dist = join(root, "dist");

// ── 关键页样页(zh/en × 三层路由各一;条目页选 styles/glassmorphism = 首页 hero dogfood 条目)──
const PAGES = [
  { label: "zh 首页", rel: "index.html", baselineBytes: 36655, islandCap: 2 },
  { label: "en 首页", rel: "en/index.html", baselineBytes: 36983, islandCap: 2 },
  { label: "zh 分类页 styles", rel: "styles/index.html", baselineBytes: 38914, islandCap: 2 },
  { label: "en 分类页 styles", rel: "en/styles/index.html", baselineBytes: 39768, islandCap: 2 },
  { label: "zh 条目页 styles/glassmorphism", rel: "styles/glassmorphism/index.html", baselineBytes: 63606, islandCap: 4 },
  { label: "en 条目页 styles/glassmorphism", rel: "en/styles/glassmorphism/index.html", baselineBytes: 63425, islandCap: 4 },
];
const BUDGET_FACTOR = 1.1; // ask 规定:实测值 ×1.1 上浮

if (!existsSync(dist)) {
  console.error(`dist missing: ${dist} — run "pnpm -C uiux-atlas run build" first`);
  process.exit(1);
}

let totalChecks = 0;
const failures = [];

function check(pageLabel, item, ok, detail) {
  totalChecks += 1;
  const mark = ok ? "PASS" : "FAIL";
  console.log(`  [${mark}] ${item}${detail ? " — " + detail : ""}`);
  if (!ok) failures.push(`${pageLabel} / ${item}${detail ? " — " + detail : ""}`);
}

for (const { label, rel, baselineBytes, islandCap } of PAGES) {
  const p = join(dist, rel);
  console.log(`\n== ${label} (${rel}) ==`);
  if (!existsSync(p)) {
    check(label, "页面存在", false, `${rel} 不在产物中`);
    continue;
  }
  const html = readFileSync(p, "utf8");
  const bytes = statSync(p).size;
  const budget = Math.ceil(baselineBytes * BUDGET_FACTOR);

  // ① HTML 字节预算 = 本轮实测 ×1.1 上浮
  check(label, "HTML 字节预算", bytes <= budget, `${bytes}B ≤ ${budget}B(基线 ${baselineBytes}B = 本轮实测 × ${BUDGET_FACTOR})`);

  // ② astro-island 数量上限 = 本轮实测(首页 2 / 分类页 2 / 条目页 4)
  const islands = (html.match(/<astro-island\b/g) ?? []).length;
  check(label, "astro-island 数上限", islands <= islandCap, `${islands} ≤ ${islandCap}(上限 = 本轮 399 页逐页实测)`);

  // ③ 照片 img 全部含 loading="lazy"(照片 = src 以 /photos/ 开头;0 张按"全部满足"通过并如实打印)
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const photoImgs = imgs.filter((tag) => /src="\/photos\//.test(tag));
  const lazyImgs = photoImgs.filter((tag) => /loading="lazy"/.test(tag));
  const missingLazy = photoImgs.length - lazyImgs.length;
  check(
    label,
    "照片 img loading=lazy",
    missingLazy === 0,
    photoImgs.length === 0
      ? "0 张照片 img(本页静态 HTML 无照片,断言按全部满足通过)"
      : `${lazyImgs.length}/${photoImgs.length} 张含 loading="lazy"` + (missingLazy > 0 ? ",缺失 " + missingLazy + " 张" : ""),
  );

  // ④ 关键字体 CSS 在 head:head 内 /_astro/*.css 样式表,目标文件含 @font-face
  const head = html.slice(0, html.indexOf("</head>"));
  const styleLinks = [...head.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)]
    .map((m) => (m[0].match(/href="([^"]+)"/) ?? [])[1])
    .filter(Boolean);
  const fontCssLinks = styleLinks.filter((href) => href.startsWith("/_astro/") && href.endsWith(".css"));
  const cssWithFontFace = fontCssLinks.filter((href) => {
    const f = join(dist, href.replace(/^\//, ""));
    return existsSync(f) && readFileSync(f, "utf8").includes("@font-face");
  });
  check(
    label,
    "关键字体 CSS 在 head",
    cssWithFontFace.length > 0,
    cssWithFontFace.length > 0
      ? `${cssWithFontFace.length} 个 head 样式表含 @font-face(${cssWithFontFace.join(", ")})`
      : `head 样式表 ${styleLinks.length} 个,含 @font-face 的 ${fontCssLinks.length} 个中无一命中`,
  );

  // ④b LCP 字体 preload 在 head(integration-font-preload 注入)且 woff2 磁盘实存
  const preloadFonts = [...head.matchAll(/<link\b[^>]*rel="preload"[^>]*as="font"[^>]*>|<link\b[^>]*as="font"[^>]*rel="preload"[^>]*>/g)]
    .map((m) => (m[0].match(/href="([^"]+)"/) ?? [])[1])
    .filter(Boolean);
  const preloadOk = preloadFonts.length > 0 && preloadFonts.every((href) => existsSync(join(dist, href.replace(/^\//, ""))));
  check(
    label,
    "LCP 字体 preload 在 head",
    preloadOk,
    preloadOk
      ? `${preloadFonts.length} 个 preload as=font,woff2 磁盘实存(${preloadFonts.join(", ")})`
      : `preload as=font 缺失或目标不存在(${preloadFonts.length} 个)`,
  );
}

console.log(`\n=== 总结:${PAGES.length} 关键页 / ${totalChecks} 项断言 / ${failures.length} 项失败 ===`);
if (failures.length > 0) {
  console.error("失败明细:");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}
console.log("check-perf: PASS");
