// 构建产物核验:双语三层路由(首页/分类/条目)全部产出且含关键内容标记。
// 用法: node uiux-atlas/scripts/verify-dist.mjs  (exit 0 = 通过)
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const dist = join(root, "dist");

const EXPECTED = {
  styles: ["glassmorphism", "neumorphism", "claymorphism", "neo-brutalism", "minimalism", "cyberpunk", "bento-grid"],
  materials: ["backdrop-filter", "filter-functions", "liquid-glass", "swiftui-materials", "fluent-acrylic", "fluent-mica", "m3-state-layers", "aurora-gradient", "grain-gradient", "blend-modes", "theme-shadow", "glass-effect-api"],
  motion: ["motion-spring", "cubic-bezier", "swiftui-spring", "m3-spring-tokens", "scroll-driven-animations", "view-transitions", "count-up", "inertia-gesture", "skeleton-loading", "stagger-orchestration", "linear-easing"],
  color: ["oklch-workflow", "oklch-space", "hct-tonal-palette", "m3-dynamic-color", "radix-color-scale", "light-dark", "rule-60-30-10", "wcag-contrast", "gradient-interpolation"],
  type: ["fluid-type-scale", "variable-fonts", "fluid-spacing"],
  layout: ["container-queries"],
  // 第七分类 components:24 个 slug(与 scripts/verify-entries.mjs 的 COMPONENT_SLUGS 同一清单,
  // 六子分组序 basic/form/feedback/data/navigation/other)—— 批产已完成,缺失检查并入常规逐条全检。
  components: [
    "button", "icon", "tag", "typography",
    "input", "select", "switch", "checkbox", "date-picker",
    "toast", "modal", "drawer", "alert", "tooltip",
    "table", "avatar", "badge", "card",
    "nav-menu", "tabs", "breadcrumb", "dropdown",
    "empty", "watermark",
  ],
};

// components 分类页标记(zh 页标题文案,en 页为分类名大写首词)
const CATEGORY_ZH_MARKERS = { components: "前端部件" };

const missing = [];
const contentFails = [];
let checked = 0;

function checkPage(rel, mustContain, label) {
  checked += 1;
  const p = join(dist, rel);
  if (!existsSync(p)) {
    missing.push(rel);
    return;
  }
  const html = readFileSync(p, "utf8");
  for (const marker of mustContain) {
    if (!html.includes(marker)) contentFails.push(`${label} [${rel}] missing marker: "${marker}"`);
  }
}

if (!existsSync(dist)) {
  console.error(`dist missing: ${dist} — run "pnpm -C uiux-atlas run build" first`);
  process.exit(1);
}

// 首页 ×2(含「授人以渔」资源入口行的稳定文案)
checkPage("index.html", ["UI/UX 设计全解图集", "授人以渔"], "zh home");
checkPage(join("en", "index.html"), ["UI/UX Design Atlas", "Go beyond"], "en home");

// 资源页 ×2:标记 = 页面标题 + 五个组名(稳定文案)
checkPage(
  join("resources", "index.html"),
  ["深入学习的资源地图", "官方设计规范", "组件库", "交互与动效工具", "灵感画廊", "深学文档"],
  "zh resources",
);
checkPage(
  join("en", "resources", "index.html"),
  ["A map for going deeper", "Official design specs", "Component libraries", "Interaction and motion tools", "Inspiration galleries", "Deep-dive docs"],
  "en resources",
);

// 分类列表页 ×2 ×7(components 批产前无条目,仅检分类页存在与标题标记)
for (const cat of Object.keys(EXPECTED)) {
  const zhMarker = CATEGORY_ZH_MARKERS[cat] ?? cat;
  checkPage(join(cat, "index.html"), [zhMarker], `zh category ${cat}`);
  checkPage(join("en", cat, "index.html"), [cat], `en category ${cat}`);
}

// 条目页 ×2 ×43:zh 页标记 = nameZh(缺省回退 name),en 页标记 = name
for (const [cat, slugs] of Object.entries(EXPECTED)) {
  for (const slug of slugs) {
    const schemaPath = join(root, "src", "content", "entries", cat, slug, "schema.json");
    let zhName = slug;
    let enName = slug;
    try {
      const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
      zhName = schema.nameZh ?? schema.name ?? slug;
      enName = schema.name ?? slug;
    } catch {
      contentFails.push(`cannot read schema name for ${cat}/${slug}`);
    }
    checkPage(join(cat, slug, "index.html"), [zhName, "复制复刻 Prompt", "继续深入"], `zh entry ${cat}/${slug}`);
    checkPage(join("en", cat, slug, "index.html"), [enName, "Copy replication prompt", "Go deeper"], `en entry ${cat}/${slug}`);
  }
}

console.log(JSON.stringify({ checked, missing: missing.length, contentFails: contentFails.length }));
if (missing.length > 0) {
  console.error(`\n=== ${missing.length} page(s) missing ===`);
  for (const m of missing) console.error(" -", m);
}
if (contentFails.length > 0) {
  console.error(`\n=== ${contentFails.length} content marker failure(s) ===`);
  for (const c of contentFails) console.error(" -", c);
}
if (missing.length > 0 || contentFails.length > 0) process.exit(1);
console.log("verify-dist: PASS");
