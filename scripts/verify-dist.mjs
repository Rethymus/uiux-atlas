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
  // 第八/第九分类 icons(图标体系,8 slug)与 dataviz(数据可视化,6 slug)——
  // 14 条已落地,与 scripts/verify-entries.mjs 的 ICONS_SLUGS/DATAVIZ_SLUGS 同一清单;
  // 条目页检查并入常规逐条全检(与 components 批产收口同动作)。
  icons: [
    "icon-stroke-fill", "icon-grid-24", "icon-optical-sizing", "icon-aria-accessible",
    "icon-sprite-symbols", "icon-lucide-set", "icon-color-states", "icon-motion",
  ],
  dataviz: [
    "dataviz-categorical-palette", "dataviz-ordinal-scale", "dataviz-colorblind-safe",
    "dataviz-dashboard-density", "dataviz-chart-axes", "dataviz-tooltip-legend",
  ],
};

// 分类页 zh 标记(components zh 页标题文案;icons/dataviz zh = 分类名逐字;en 页均为分类 id)
const CATEGORY_ZH_MARKERS = { components: "前端部件", icons: "图标体系", dataviz: "数据可视化" };

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

// 名称类标记(zh = nameZh/name,en = name)经 Astro 文本渲染会做最小 HTML 转义
// (如 "Stroke & Fill Icons" 落盘为 "Stroke &amp; Fill Icons"),按同样规则转义后再匹配。
const asRenderedText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

if (!existsSync(dist)) {
  console.error(`dist missing: ${dist} — run "pnpm -C uiux-atlas run build" first`);
  process.exit(1);
}

// 首页 ×2(含「授人以渔」资源入口行 + 「趋势追踪」入口行的稳定文案)
checkPage("index.html", ["UI/UX 设计全解图集", "授人以渔", "趋势追踪 →"], "zh home");
checkPage(join("en", "index.html"), ["UI/UX Design Atlas", "Go beyond", "Design trends →"], "en home");

// 资源页 ×2:标记 = 页面标题 + 五个组名 + 页尾「趋势追踪」互链(稳定文案)
checkPage(
  join("resources", "index.html"),
  ["深入学习的资源地图", "官方设计规范", "组件库", "交互与动效工具", "灵感画廊", "深学文档", "趋势追踪:兴起与退潮"],
  "zh resources",
);
checkPage(
  join("en", "resources", "index.html"),
  ["A map for going deeper", "Official design specs", "Component libraries", "Interaction and motion tools", "Inspiration galleries", "Deep-dive docs", "Trend tracker: rising &amp; cooling"],
  "en resources",
);

// 趋势页 ×2(zh 标记 =「趋势」,en = Trend tracker;另加两个方向段标题、
// 时点快照声明与一条互链 href,验证卡片网格与站内互链已渲染)
checkPage(
  join("trends", "index.html"),
  ["趋势", "正在兴起", "正在退潮", "时点快照", 'href="/styles/glassmorphism/"'],
  "zh trends",
);
checkPage(
  join("en", "trends", "index.html"),
  ["Design trend tracker", "Rising", "Cooling", "point-in-time snapshots", 'href="/en/styles/glassmorphism/"'],
  "en trends",
);

// 分类列表页 ×2 ×9(zh 标记见 CATEGORY_ZH_MARKERS,缺省回退分类 id,与既有分类同法)
for (const cat of Object.keys(EXPECTED)) {
  const zhMarker = CATEGORY_ZH_MARKERS[cat] ?? cat;
  checkPage(join(cat, "index.html"), [zhMarker], `zh category ${cat}`);
  checkPage(join("en", cat, "index.html"), [cat], `en category ${cat}`);
}

// 条目页 ×2 ×81:zh 页标记 = nameZh(缺省回退 name),en 页标记 = name
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
    checkPage(join(cat, slug, "index.html"), [asRenderedText(zhName), "复制复刻 Prompt", "继续深入"], `zh entry ${cat}/${slug}`);
    checkPage(join("en", cat, slug, "index.html"), [asRenderedText(enName), "Copy replication prompt", "Go deeper"], `en entry ${cat}/${slug}`);
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
