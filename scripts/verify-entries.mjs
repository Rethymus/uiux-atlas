// 条目完整性自动校验:结构、双语、来源、参数 shape 全部机器判定。
// 用法: node uiux-atlas/scripts/verify-entries.mjs  (exit 0 = 通过)
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const entriesRoot = join(root, "src", "content", "entries");

// 第七分类 components:24 个 slug(组件库分类学,六子分组)+ 二批 6 条
// (cascader / collapse-panel / rate-score / stepper / timeline / upload-states)
// + 命令面板条目(command-palette,站点全站 Ctrl+K 的组件本体,吃狗粮条目)共 31 条。
// 31 条已全部落地,均在下方 EXPECTED 缺失强制校验内(与其他分类同规则);
// 条目级检查照常逐条全检(额外要求 subgroup ∈ 六值;nameZh 非空为全条目通用检查)。
const COMPONENT_SLUGS = [
  "button", "icon", "tag", "typography",
  "input", "select", "switch", "checkbox", "date-picker",
  "toast", "modal", "drawer", "alert", "tooltip",
  "table", "avatar", "badge", "card",
  "nav-menu", "tabs", "breadcrumb", "dropdown",
  "empty", "watermark",
  "cascader", "collapse-panel", "rate-score", "stepper", "timeline", "upload-states",
  "command-palette",
];

// 第八/第九分类 icons(图标体系)与 dataviz(数据可视化)。
// icons 首批 8 条已落地;icons 第二批 b22-icons2(补全:icon-font-vs-svg / icon-button /
// favicon-stack / icon-system-design,调研 07 + 12 补研 §12)落地即并入同一缺失强制校验
// (与 b23-dataviz、b24-principles2 同动作);条目级检查照常逐条全检(nameZh 非空为全条目通用检查)。
const ICONS_SLUGS = [
  "icon-stroke-fill", "icon-grid-24", "icon-optical-sizing", "icon-aria-accessible",
  "icon-sprite-symbols", "icon-lucide-set", "icon-color-states", "icon-motion",
  "icon-font-vs-svg", "icon-button", "favicon-stack", "icon-system-design",
];
// dataviz 扩编批(b23):small-multiples / chart-animation / chart-accessibility 三条落地,
// 与既有 8 条并入同一强制校验(与此前各批「同动作」一致)。
const DATAVIZ_SLUGS = [
  "dataviz-categorical-palette", "dataviz-ordinal-scale", "dataviz-colorblind-safe",
  "dataviz-dashboard-density", "dataviz-chart-axes", "dataviz-tooltip-legend",
  "dataviz-chart-selection", "dataviz-color-ordering",
  "small-multiples", "chart-animation", "chart-accessibility",
];

// 第十分类 principles(交互法则与无障碍,15 slug)。
// 15 条已全部落地,自本轮起并入下方 EXPECTED 缺失强制校验(与 components/icons/dataviz
// 批产收口同动作);条目级检查照常逐条全检(nameZh 非空为全条目通用检查)。
// b24-principles2 批(aesthetic-usability/goal-gradient/pareto-principle,调研 12 补研 §14)落地即并入同一强制校验。
const PRINCIPLES_SLUGS = [
  "fitts-law", "hick-law", "millers-law", "jakobs-law", "peak-end-rule",
  "doherty-threshold", "teslers-law", "gestalt-proximity", "gestalt-similarity-closure",
  "serial-position", "von-restorff", "apg-patterns", "wcag-checklist",
  "prefers-contrast", "keyboard-navigation",
  "aesthetic-usability", "goal-gradient", "pareto-principle",
];

const EXPECTED = {
  // styles 第 8 批:8 个风格史条目已落地,自本轮起并入缺失强制校验(与 icons/dataviz 同动作)。
  // styles 第 9 批(b13):maximalism / classic-brutalism / spatial-ui 落地后并入(同动作)。
  styles: [
    "glassmorphism", "neumorphism", "claymorphism", "neo-brutalism",
    "minimalism", "cyberpunk", "bento-grid",
    "flat-design", "skeuomorphism", "memphis-design", "swiss-international",
    "editorial-magazine", "frutiger-aero", "y2k-retro-futurism", "holographic-chrome",
    "maximalism", "classic-brutalism", "spatial-ui",
  ],
  materials: [
    "backdrop-filter", "filter-functions", "liquid-glass", "swiftui-materials",
    "fluent-acrylic", "fluent-mica", "m3-state-layers", "aurora-gradient",
    "grain-gradient", "blend-modes", "theme-shadow", "glass-effect-api",
    // b21-materials2 批(材质与光影补全):4 条(调研 09/12),落地即并入缺失强制校验
    // (与 color b12 批同动作)。
    "contact-shadows", "specular-highlight", "dimming-layer", "depth-of-field",
  ],
  // motion 第 8 批:8 个工艺/行为条目已落地,自本轮起并入缺失强制校验(与 styles 第 8 批同动作)。
  // b14 批(动效补全):6 条 M3/Web 动效条目并入同一强制校验。
  // b19 批(微交互补全·二):6 条(调研 10§7/§8.2 + 12§3/§4/§5/§6/§14),落地即并入缺失强制校验。
  motion: [
    "motion-spring", "cubic-bezier", "swiftui-spring", "m3-spring-tokens",
    "scroll-driven-animations", "view-transitions", "count-up", "inertia-gesture",
    "skeleton-loading", "stagger-orchestration", "linear-easing",
    "press-feedback", "toast-spring", "overlay-entrance",
    "damping-craft", "smooth-craft", "slot-spring", "shake-decay", "scroll-overflow",
    "m3-duration-tokens", "easing-pairs", "choreography", "parallax",
    "haptics-web", "page-transitions",
    "flip-technique", "scroll-snap", "magnetic-hover", "kinetic-typography",
    "progress-motion", "handoff-curves",
  ],
  color: [
    "oklch-workflow", "oklch-space", "hct-tonal-palette", "m3-dynamic-color",
    "radix-color-scale", "light-dark", "rule-60-30-10", "wcag-contrast",
    "gradient-interpolation",
    // b12-color 批(色彩与主题补全):5 条(调研 06 色彩与主题 + 11 补研),落地即并入缺失强制校验。
    "p3-wide-gamut", "semantic-token-layers", "m3-tone-surfaces",
    "color-psychology-ui", "theme-transition",
    // b18-color2 批(色彩与主题二批):5 条(调研 06 + 12 补研§11),落地即并入缺失强制校验(同前批动作)。
    "brand-color-system", "dark-mode-patterns", "status-color-system",
    "color-functions", "multi-theme-tokens",
  ],
  // type b11 批(排版补全):6 条排版条目并入同一强制校验。
  // type b17-type2 批(排版二次补全):6 条排版条目并入同一强制校验。
  type: [
    "fluid-type-scale", "variable-fonts", "fluid-spacing",
    "measure-line-length", "wcag-text-spacing", "cjk-typography",
    "font-display-strategy", "text-wrap-balance", "drop-cap-initial",
    "tabular-numbers", "baseline-grid", "font-pairing",
    "small-caps-features", "vertical-rhythm", "display-typography",
  ],
  // layout b10 批(布局补全):8 条(调研 05§一§二 + 11 补研),落地即并入缺失强制校验。
  // layout b16-layout2 批:6 条(split-view/aspect-ratio/responsive-images/logical-properties/
  // writing-modes/custom-scrollbar,调研 05§8 + 12§1/§2 + 10§8.3 + 11§9),落地即并入同一强制校验。
  layout: [
    "container-queries",
    "auto-fit-minmax", "subgrid", "position-sticky", "safe-area",
    "grid-lanes", "masonry-columns", "holy-grail", "anchor-positioning",
    "split-view", "aspect-ratio", "responsive-images", "logical-properties",
    "writing-modes", "custom-scrollbar",
  ],
  components: COMPONENT_SLUGS,
  icons: ICONS_SLUGS,
  dataviz: DATAVIZ_SLUGS,
  principles: PRINCIPLES_SLUGS,
};

const SUBGROUP_IDS = new Set(["basic", "form", "feedback", "data", "navigation", "other"]);

const SYSTEMS = new Set(["apple", "m3", "fluent", "web-std", "component-lib", "community"]);
const PARAM_TYPES = new Set(["color", "dimension", "number", "cubicBezier", "enum", "shadow"]);

const problems = [];
const ok = (msg) => console.log("  ok:", msg);

// ---------- 收集实际目录 ----------
const actual = {};
if (!existsSync(entriesRoot)) {
  console.error(`entries root missing: ${entriesRoot}`);
  process.exit(1);
}
for (const cat of readdirSync(entriesRoot)) {
  if (cat.startsWith(".")) continue; // 隐藏目录(.mimosa hook 状态等)不是分类,与 slug 级同规则
  const catPath = join(entriesRoot, cat);
  if (!statSync(catPath).isDirectory()) continue;
  actual[cat] = [];
  for (const slug of readdirSync(catPath)) {
    if (slug.startsWith(".")) continue; // 隐藏目录(.mimosa hook 状态等)不是条目
    if (statSync(join(catPath, slug)).isDirectory()) actual[cat].push(slug);
  }
}

// ---------- 集合比对 ----------
const totalExpected = Object.values(EXPECTED).reduce((n, a) => n + a.length, 0);
for (const cat of Object.keys(EXPECTED)) {
  const have = new Set(actual[cat] ?? []);
  for (const slug of EXPECTED[cat]) {
    if (!have.has(slug)) problems.push(`missing entry: ${cat}/${slug}`);
  }
  for (const slug of actual[cat] ?? []) {
    if (!EXPECTED[cat].includes(slug)) problems.push(`unexpected entry: ${cat}/${slug} (not in expected list)`);
  }
}
for (const cat of Object.keys(actual)) {
  if (!EXPECTED[cat]) problems.push(`unexpected category directory: ${cat}`);
}
if (problems.length === 0) ok(`entry inventory matches expected ${totalExpected} entries`);
ok(`components: ${(actual.components ?? []).length}/${COMPONENT_SLUGS.length} entries present (missing-check enforced)`);
ok(
  `icons: ${(actual.icons ?? []).length}/${ICONS_SLUGS.length}, dataviz: ${(actual.dataviz ?? []).length}/${DATAVIZ_SLUGS.length} entries present (missing-check enforced)`,
);
ok(
  `principles: ${(actual.principles ?? []).length}/${PRINCIPLES_SLUGS.length} entries present (missing-check enforced)`,
);

// ---------- 单条目检查 ----------
function isBilingual(v, path) {
  if (!v || typeof v !== "object") { problems.push(`${path}: not an object`); return; }
  if (typeof v.zh !== "string" || !v.zh.trim()) problems.push(`${path}.zh empty`);
  if (typeof v.en !== "string" || !v.en.trim()) problems.push(`${path}.en empty`);
}

// 单条目检查:EXPECTED 全部分类(components/icons/dataviz/principles 均已并入,与其他分类同规则;
// 清单外 slug 与缺失条目均由上方集合比对统一报告)
const checkList = EXPECTED;

for (const [cat, slugs] of Object.entries(checkList)) {
  for (const slug of slugs) {
    const id = `${cat}/${slug}`;
    const dir = join(entriesRoot, cat, slug);

    for (const f of ["schema.json", "zh.mdx", "en.mdx", join("demo", "Demo.tsx")]) {
      if (!existsSync(join(dir, f))) problems.push(`${id}: missing file ${f}`);
    }
    const schemaPath = join(dir, "schema.json");
    if (!existsSync(schemaPath)) continue;
    const zhMdx = join(dir, "zh.mdx");
    const enMdx = join(dir, "en.mdx");
    const demo = join(dir, "demo", "Demo.tsx");
    if (existsSync(zhMdx)) {
      const s = readFileSync(zhMdx, "utf8");
      if (s.length < 400) problems.push(`${id}: zh.mdx too short (${s.length} bytes)`);
      if ((s.match(/\n## /g) ?? []).length < 2) problems.push(`${id}: zh.mdx needs >= 3 h2 sections (four-part breakdown)`);
    }
    if (existsSync(enMdx)) {
      const s = readFileSync(enMdx, "utf8");
      if (s.length < 400) problems.push(`${id}: en.mdx too short (${s.length} bytes)`);
      if ((s.match(/\n## /g) ?? []).length < 2) problems.push(`${id}: en.mdx needs >= 3 h2 sections`);
    }
    if (existsSync(demo) && readFileSync(demo, "utf8").length < 500) {
      problems.push(`${id}: Demo.tsx suspiciously small`);
    }

    let schema;
    try {
      schema = JSON.parse(readFileSync(schemaPath, "utf8"));
    } catch (e) {
      problems.push(`${id}: schema.json not valid JSON (${e.message})`);
      continue;
    }

    if (typeof schema.name !== "string" || !schema.name) problems.push(`${id}: schema.name missing`);
    // nameZh:97 条必须全有(scripts/add-name-zh.mjs 映射保证);存在时必须是非空字符串
    if (typeof schema.nameZh !== "string" || !schema.nameZh.trim()) {
      problems.push(`${id}: schema.nameZh missing/empty`);
    }
    if (schema.category !== cat) problems.push(`${id}: schema.category "${schema.category}" != directory "${cat}"`);
    // components 条目:subgroup 必填且 ∈ 六子分组 id(nameZh 非空由下方全条目通用检查兜底)
    if (cat === "components" && !SUBGROUP_IDS.has(schema.subgroup)) {
      problems.push(`${id}: schema.subgroup "${schema.subgroup}" invalid (must be one of basic/form/feedback/data/navigation/other)`);
    }
    if (!SYSTEMS.has(schema.system)) problems.push(`${id}: schema.system "${schema.system}" invalid`);
    if (!Number.isInteger(schema.star) || schema.star < 1 || schema.star > 3) problems.push(`${id}: schema.star invalid`);
    isBilingual(schema.tagline, `${id}.tagline`);
    isBilingual(schema.origin, `${id}.origin`);
    isBilingual(schema.a11y, `${id}.a11y`);
    isBilingual(schema.browserSupport?.note, `${id}.browserSupport.note`);
    isBilingual(schema.fallback, `${id}.fallback`);
    if (!Array.isArray(schema.aliases)) problems.push(`${id}: aliases not array`);
    if (!Array.isArray(schema.scenarios?.use)) problems.push(`${id}: scenarios.use not array`);
    if (!Array.isArray(schema.scenarios?.avoid)) problems.push(`${id}: scenarios.avoid not array`);
    for (const [i, s] of (schema.scenarios?.use ?? []).entries()) isBilingual(s, `${id}.scenarios.use[${i}]`);
    for (const [i, s] of (schema.scenarios?.avoid ?? []).entries()) isBilingual(s, `${id}.scenarios.avoid[${i}]`);

    if (!Array.isArray(schema.sources) || schema.sources.length < 1) {
      problems.push(`${id}: needs >= 1 source`);
    } else {
      for (const [i, u] of schema.sources.entries()) {
        if (typeof u !== "string" || !/^https?:\/\//.test(u)) problems.push(`${id}: sources[${i}] not an http URL`);
      }
    }

    const pt = schema.promptTemplate;
    if (!pt) problems.push(`${id}: promptTemplate missing`);
    else {
      isBilingual(pt.goal, `${id}.promptTemplate.goal`);
      if (!Array.isArray(pt.acceptance) || pt.acceptance.length < 1) problems.push(`${id}: promptTemplate.acceptance empty`);
      for (const [i, a] of (pt.acceptance ?? []).entries()) isBilingual(a, `${id}.promptTemplate.acceptance[${i}]`);
    }

    if (!Array.isArray(schema.params) || schema.params.length < 1) {
      problems.push(`${id}: params missing/empty`);
      continue;
    }
    for (const [i, p] of schema.params.entries()) {
      const pp = `${id}.params[${i}](${p?.name ?? "?"})`;
      if (typeof p.name !== "string" || !p.name) problems.push(`${pp}: name missing`);
      if (!PARAM_TYPES.has(p.type)) problems.push(`${pp}: type "${p.type}" invalid`);
      isBilingual(p.effect, `${pp}.effect`);
      if (p.cssVar !== undefined && !/^--[\w-]+$/.test(p.cssVar)) problems.push(`${pp}: cssVar "${p.cssVar}" invalid`);
      switch (p.type) {
        case "dimension":
          if (typeof p.unit !== "string" || !p.unit) problems.push(`${pp}: unit missing`);
          for (const k of ["min", "max", "step", "default"]) {
            if (typeof p[k] !== "number") problems.push(`${pp}: ${k} not number`);
          }
          if (typeof p.min === "number" && typeof p.max === "number" && p.min > p.max) problems.push(`${pp}: min > max`);
          break;
        case "number":
          for (const k of ["min", "max", "step", "default"]) {
            if (typeof p[k] !== "number") problems.push(`${pp}: ${k} not number`);
          }
          break;
        case "color":
          if (!["oklch", "hex"].includes(p.format)) problems.push(`${pp}: format "${p.format}" invalid`);
          if (typeof p.default !== "string" || !p.default) problems.push(`${pp}: default missing`);
          if (p.format === "hex" && typeof p.default === "string" && !/^#[0-9a-fA-F]{3,8}$/.test(p.default)) {
            problems.push(`${pp}: hex default malformed`);
          }
          break;
        case "cubicBezier":
          if (!Array.isArray(p.default) || p.default.length !== 4 || !p.default.every((n) => typeof n === "number" && Number.isFinite(n))) {
            problems.push(`${pp}: default must be [x1,y1,x2,y2] numbers`);
          }
          break;
        case "enum": {
          if (!Array.isArray(p.options) || p.options.length < 2) problems.push(`${pp}: options needs >= 2`);
          const vals = new Set((p.options ?? []).map((o) => o?.value));
          for (const [j, o] of (p.options ?? []).entries()) isBilingual(o?.label, `${pp}.options[${j}].label`);
          if (typeof p.default !== "string" || !vals.has(p.default)) problems.push(`${pp}: default "${p.default}" not in options`);
          break;
        }
        case "shadow":
          if (!Array.isArray(p.default) || p.default.length < 1) problems.push(`${pp}: shadow default needs >= 1 layer`);
          for (const [j, l] of (p.default ?? []).entries()) {
            for (const k of ["x", "y", "blur", "color"]) {
              if (l?.[k] === undefined) problems.push(`${pp}.layers[${j}]: ${k} missing`);
            }
            if (typeof l?.color !== "string" || !l.color) problems.push(`${pp}.layers[${j}]: color missing`);
          }
          break;
      }
    }
  }
}

// ---------- 汇总 ----------
const result = {
  expected: totalExpected,
  found: Object.values(actual).reduce((n, a) => n + a.length, 0),
  problems: problems.length,
};
console.log(JSON.stringify(result));
if (problems.length > 0) {
  console.error(`\n=== ${problems.length} problem(s) ===`);
  for (const p of problems) console.error(" -", p);
  process.exit(1);
}
console.log("verify-entries: PASS");
