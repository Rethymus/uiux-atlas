// 构建产物核验:双语三层路由(首页/分类/条目)全部产出且含关键内容标记。
// 用法: node uiux-atlas/scripts/verify-dist.mjs  (exit 0 = 通过)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const dist = join(root, "dist");
// 部署子路径(站点作为项目页发布在 <base>/ 下):标记里的站内链接与下方的全量地址检查都以它为前缀
const CONFIG_BASE =
  (readFileSync(join(root, "astro.config.mjs"), "utf8").match(/\bbase:\s*["']([^"']+)["']/) ?? [])[1] ?? "/";
const BASE_SLASH = CONFIG_BASE.endsWith("/") ? CONFIG_BASE : `${CONFIG_BASE}/`;

const EXPECTED = {
  // styles 第 8 批 8 个 + 第 9 批(b13)maximalism / classic-brutalism / spatial-ui 共 18 个
  // (与 scripts/verify-entries.mjs 的 styles 同一清单);
  // 条目页 zh 标记照通用规则 = nameZh ?? name,en = name(见下方逐条全检循环)。
  styles: ["glassmorphism", "neumorphism", "claymorphism", "neo-brutalism", "minimalism", "cyberpunk", "bento-grid", "flat-design", "skeuomorphism", "memphis-design", "swiss-international", "editorial-magazine", "frutiger-aero", "y2k-retro-futurism", "holographic-chrome", "maximalism", "classic-brutalism", "spatial-ui"],
  // materials 12 条基础 + b21-materials2 批(材质与光影补全)4 条,共 16 个
  // (与 scripts/verify-entries.mjs 的 materials 同一清单)。
  materials: ["backdrop-filter", "filter-functions", "liquid-glass", "swiftui-materials", "fluent-acrylic", "fluent-mica", "m3-state-layers", "aurora-gradient", "grain-gradient", "blend-modes", "theme-shadow", "glass-effect-api", "contact-shadows", "specular-highlight", "dimming-layer", "depth-of-field"],
  // motion 第 8 批 8 个 + b14 批(动效补全)6 条 + b19 批(微交互补全·二)6 条
  // + 公式批(b25-math)spring-integrator / easing-math 2 条,共 33 个
  // (与 scripts/verify-entries.mjs 的 motion 同一清单);
  // 条目页 zh 标记照通用规则 = nameZh ?? name,en = name(见下方逐条全检循环)。
  motion: ["motion-spring", "cubic-bezier", "swiftui-spring", "m3-spring-tokens", "scroll-driven-animations", "view-transitions", "count-up", "inertia-gesture", "skeleton-loading", "stagger-orchestration", "linear-easing", "press-feedback", "toast-spring", "overlay-entrance", "damping-craft", "smooth-craft", "slot-spring", "shake-decay", "scroll-overflow", "m3-duration-tokens", "easing-pairs", "choreography", "parallax", "haptics-web", "page-transitions", "flip-technique", "scroll-snap", "magnetic-hover", "kinetic-typography", "progress-motion", "handoff-curves", "spring-integrator", "easing-math"],
  // color 9 条基础 + b12-color 批 5 条 + b18-color2 批(色彩与主题二批)5 条
  // + 公式批(b25-math)oklch-conversion 1 条,共 20 个
  // (与 scripts/verify-entries.mjs 的 color 同一清单)。
  color: ["oklch-workflow", "oklch-space", "hct-tonal-palette", "m3-dynamic-color", "radix-color-scale", "light-dark", "rule-60-30-10", "wcag-contrast", "gradient-interpolation", "p3-wide-gamut", "semantic-token-layers", "m3-tone-surfaces", "color-psychology-ui", "theme-transition", "brand-color-system", "dark-mode-patterns", "status-color-system", "color-functions", "multi-theme-tokens", "oklch-conversion"],
  // type 3 条基础 + b11 批(排版补全)6 条 + b17-type2 批(排版二次补全)6 条
  // + 公式批(b25-math)modular-scale-math / rhythm-formula 2 条,共 17 个
  // (与 scripts/verify-entries.mjs 的 type 同一清单)。
  type: ["fluid-type-scale", "variable-fonts", "fluid-spacing", "measure-line-length", "wcag-text-spacing", "cjk-typography", "font-display-strategy", "text-wrap-balance", "drop-cap-initial", "tabular-numbers", "baseline-grid", "font-pairing", "small-caps-features", "vertical-rhythm", "display-typography", "modular-scale-math", "rhythm-formula"],
  // layout container-queries + b10 批(布局补全)8 条 + b16-layout2 批 6 条
  // + 公式批(b25-math)grid-math 1 条,共 16 个
  // (与 scripts/verify-entries.mjs 的 layout 同一清单)。
  layout: ["container-queries", "auto-fit-minmax", "subgrid", "position-sticky", "safe-area", "grid-lanes", "masonry-columns", "holy-grail", "anchor-positioning", "split-view", "aspect-ratio", "responsive-images", "logical-properties", "writing-modes", "custom-scrollbar", "grid-math"],
  // 第七分类 components:24 个 slug + 二批 6 条(cascader / collapse-panel / rate-score /
  // stepper / timeline / upload-states)+ 命令面板条目(command-palette,站点全站
  // Ctrl+K 的组件本体)共 31 个(与 scripts/verify-entries.mjs 的 COMPONENT_SLUGS
  // 同一清单,六子分组序 basic/form/feedback/data/navigation/other)——
  // 缺失检查并入常规逐条全检。
  components: [
    "button", "icon", "tag", "typography",
    "input", "select", "switch", "checkbox", "date-picker",
    "toast", "modal", "drawer", "alert", "tooltip",
    "table", "avatar", "badge", "card",
    "nav-menu", "tabs", "breadcrumb", "dropdown",
    "empty", "watermark",
    "cascader", "collapse-panel", "rate-score", "stepper", "timeline", "upload-states",
    "command-palette",
  ],
  // 第八/第九分类 icons(图标体系,8+4=12 slug)与 dataviz(数据可视化,8+3+1=12 slug)——
  // icons 二批 b22(icon-font-vs-svg / icon-button / favicon-stack / icon-system-design)
  // 并入同一清单,与 scripts/verify-entries.mjs 的 ICONS_SLUGS/DATAVIZ_SLUGS 保持一致;
  // 条目页检查并入常规逐条全检。
  icons: [
    "icon-stroke-fill", "icon-grid-24", "icon-optical-sizing", "icon-aria-accessible",
    "icon-sprite-symbols", "icon-lucide-set", "icon-color-states", "icon-motion",
    "icon-font-vs-svg", "icon-button", "favicon-stack", "icon-system-design",
  ],
  dataviz: [
    "dataviz-categorical-palette", "dataviz-ordinal-scale", "dataviz-colorblind-safe",
    "dataviz-dashboard-density", "dataviz-chart-axes", "dataviz-tooltip-legend",
    "dataviz-chart-selection", "dataviz-color-ordering",
    // dataviz 扩编批(b23):small-multiples / chart-animation / chart-accessibility,
    // 与 scripts/verify-entries.mjs 的 DATAVIZ_SLUGS 保持同一清单。
    "small-multiples", "chart-animation", "chart-accessibility",
    // 公式批(b25-math):scale-functions 并入同一清单(与 verify-entries.mjs 同动作)。
    "scale-functions",
  ],
  // 第十分类 principles(交互法则与无障碍,15+3+1=19 slug)——二批 b24
  // (aesthetic-usability / goal-gradient / pareto-principle)与公式批(b25-math)
  // contrast-ratio-formula 并入同一清单,
  // 与 scripts/verify-entries.mjs 的 PRINCIPLES_SLUGS 保持一致,并入常规逐条全检
  // (条目页 zh 标记照通用规则 = nameZh ?? name,en = name)。
  principles: [
    "fitts-law", "hick-law", "millers-law", "jakobs-law", "peak-end-rule",
    "doherty-threshold", "teslers-law", "gestalt-proximity", "gestalt-similarity-closure",
    "serial-position", "von-restorff", "apg-patterns", "wcag-checklist",
    "prefers-contrast", "keyboard-navigation",
    "aesthetic-usability", "goal-gradient", "pareto-principle",
    // 公式批(b25-math):contrast-ratio-formula 并入同一清单(与 verify-entries.mjs 同动作)。
    "contrast-ratio-formula",
  ],
};

// 分类页 zh 标记(components zh 页标题文案;icons/dataviz/principles zh = 分类名逐字;en 页均为分类 id)
const CATEGORY_ZH_MARKERS = { components: "前端部件", icons: "图标体系", dataviz: "数据可视化", principles: "交互法则" };

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

// 名称类标记(zh = nameZh/name,en = name)经 Astro 文本渲染会做 HTML 转义
// (覆盖 & < > " ' 五字符,如 "Stroke & Fill Icons" 落盘为 "Stroke &amp; Fill Icons",
// "Fitts's Law" 落盘为 "Fitts&#39;s Law"),按同样规则转义后再匹配。
const asRenderedText = (s) => s
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

if (!existsSync(dist)) {
  console.error(`dist missing: ${dist} — run "pnpm -C uiux-atlas run build" first`);
  process.exit(1);
}

// 首页 ×2(含「授人以渔」资源入口行 + 「趋势追踪」入口行的稳定文案;
// 另检站内搜索钮标记:全站页头搜索钮 data-palette-open + 双语 aria-label,
// 命令面板条目 components/command-palette 落地后纳入产物核验)
checkPage("index.html", ["UI/UX 设计全解图集", "授人以渔", "趋势追踪 →", "data-palette-open", "搜索 / Search"], "zh home");
checkPage(join("en", "index.html"), ["UI/UX Design Atlas", "Go beyond", "Design trends →", "data-palette-open", "Search / 搜索"], "en home");

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
  ["趋势", "正在兴起", "正在退潮", "时点快照", `href="${BASE_SLASH}styles/glassmorphism/"`],
  "zh trends",
);
checkPage(
  join("en", "trends", "index.html"),
  ["Design trend tracker", "Rising", "Cooling", "point-in-time snapshots", `href="${BASE_SLASH}en/styles/glassmorphism/"`],
  "en trends",
);

// 分类列表页 ×2 ×9(zh 标记见 CATEGORY_ZH_MARKERS,缺省回退分类 id,与既有分类同法;
// 每页同时检站内搜索钮标记 data-palette-open——全站页头搜索钮随 Base.astro 全站产出)
for (const cat of Object.keys(EXPECTED)) {
  const zhMarker = CATEGORY_ZH_MARKERS[cat] ?? cat;
  checkPage(join(cat, "index.html"), [zhMarker, "data-palette-open"], `zh category ${cat}`);
  checkPage(join("en", cat, "index.html"), [cat, "data-palette-open"], `en category ${cat}`);
}

// 条目页 ×2 ×142:zh 页标记 = nameZh(缺省回退 name),en 页标记 = name
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

// ── 站内地址必须带部署子路径 ──
// 站点作为项目页发布在 <base>/ 下(astro.config.mjs 的 base):产物里任何不带前缀的根路径
// 站内地址(HTML 的 href/src、CSS url()、JS 字符串里的路径)在那儿都会 404。曾经漏网的
// 形态:MDX 正文里手写的互链、404 页的语言切换、demo 里的照片路径、字体预载地址。
{
  const SEG = "styles|materials|motion|color|type|layout|components|icons|dataviz|principles|resources|trends|en|registry|llms\\.txt|photos|LICENSE|_astro|sitemap|robots";
  const attrRe = /(?:href|src|content|action|poster)="(\/[^"]*)"/g;
  const cssUrlRe = /url\(\s*["']?(\/[^)"'\s]*)/g;
  const jsStrRe = new RegExp(`["'\`](\\/(${SEG})(?:\\/[^"'\`\\s<]*)?)["'\`]`, "g");
  const offenders = new Map(); // 取值 → Set(文件)
  let prefixedUrls = 0;
  const note = (value, file) => {
    if (value.startsWith(BASE_SLASH)) {
      prefixedUrls += 1;
      return;
    }
    if (!offenders.has(value)) offenders.set(value, new Set());
    offenders.get(value).add(file);
  };
  const walk = (d, rel) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) {
        walk(p, r);
      } else if (e.name.endsWith(".html")) {
        const s = readFileSync(p, "utf8");
        for (const m of s.matchAll(attrRe)) note(m[1], r);
        for (const m of s.matchAll(cssUrlRe)) note(m[1], r);
      } else if (e.name.endsWith(".css")) {
        for (const m of readFileSync(p, "utf8").matchAll(cssUrlRe)) note(m[1], r);
      } else if (e.name.endsWith(".js")) {
        for (const m of readFileSync(p, "utf8").matchAll(jsStrRe)) note(m[1], r);
      }
    }
  };
  walk(dist, "");
  console.log(`站内地址子路径检查:${prefixedUrls} 处带 ${BASE_SLASH} 前缀,${offenders.size} 种取值漏网`);
  for (const [value, files] of offenders) {
    contentFails.push(`站内地址缺部署子路径 ${BASE_SLASH}:${value} ← ${files.size} 个文件,如 ${[...files][0]}`);
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
