// 条目完整性自动校验:结构、双语、来源、参数 shape 全部机器判定。
// 用法: node uiux-atlas/scripts/verify-entries.mjs  (exit 0 = 通过)
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const entriesRoot = join(root, "src", "content", "entries");

const EXPECTED = {
  styles: [
    "glassmorphism", "neumorphism", "claymorphism", "neo-brutalism",
    "minimalism", "cyberpunk", "bento-grid",
  ],
  materials: [
    "backdrop-filter", "filter-functions", "liquid-glass", "swiftui-materials",
    "fluent-acrylic", "fluent-mica", "m3-state-layers", "aurora-gradient",
    "grain-gradient", "blend-modes", "theme-shadow", "glass-effect-api",
  ],
  motion: [
    "motion-spring", "cubic-bezier", "swiftui-spring", "m3-spring-tokens",
    "scroll-driven-animations", "view-transitions", "count-up", "inertia-gesture",
    "skeleton-loading", "stagger-orchestration", "linear-easing",
  ],
  color: [
    "oklch-workflow", "oklch-space", "hct-tonal-palette", "m3-dynamic-color",
    "radix-color-scale", "light-dark", "rule-60-30-10", "wcag-contrast",
    "gradient-interpolation",
  ],
  type: ["fluid-type-scale", "variable-fonts", "fluid-spacing"],
  layout: ["container-queries"],
};

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
  const catPath = join(entriesRoot, cat);
  if (!statSync(catPath).isDirectory()) continue;
  actual[cat] = [];
  for (const slug of readdirSync(catPath)) {
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

// ---------- 单条目检查 ----------
function isBilingual(v, path) {
  if (!v || typeof v !== "object") { problems.push(`${path}: not an object`); return; }
  if (typeof v.zh !== "string" || !v.zh.trim()) problems.push(`${path}.zh empty`);
  if (typeof v.en !== "string" || !v.en.trim()) problems.push(`${path}.en empty`);
}

for (const [cat, slugs] of Object.entries(EXPECTED)) {
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
    // nameZh:43 条必须全有(scripts/add-name-zh.mjs 映射保证);存在时必须是非空字符串
    if (typeof schema.nameZh !== "string" || !schema.nameZh.trim()) {
      problems.push(`${id}: schema.nameZh missing/empty`);
    }
    if (schema.category !== cat) problems.push(`${id}: schema.category "${schema.category}" != directory "${cat}"`);
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
