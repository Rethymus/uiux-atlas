// shadcn registry 生成器:31 条「前端部件」(components 分类:24 基础 + 二批 6
// cascader/collapse-panel/rate-score/stepper/timeline/upload-states + command-palette;
// 清单 mcp-registry-stale 三口径同步)的 demo 发布为
// shadcn registry item JSON + registry index(JSON 数组),输出到 public/registry/
// (Astro 约定 public/ 原样拷贝进 dist/,build 时随 dist 发布,静态托管即可拉取)。
//
// item 形态(字段以 ui.shadcn.com 官方 registry schema 文档为准):
//   name            = 条目 slug(如 "button")
//   type            = "registry:component"
//   title           = nameZh + name(中文展示名 + 英文组件名)
//   description     = schema.tagline.zh
//   files[0].path   = src/content/entries/components/{slug}/demo/Demo.tsx(保留源站路径作溯源;
//                     消费端安装时即按此路径落盘)
//   files[0].content= 该 Demo.tsx 全文内联;其中三个 @/ 内部模块 import 已原位改写为
//                     「[registry 改写]」说明注释(见 rewriteAtImports 的诚实标注)
//   dependencies    = [](留空;demo 仅依赖 react,由消费端按自身版本声明)
//   meta            = { nameZh, star, subgroup }(与 schema.json 同步透传)
//
// 幂等可重跑:每次清空输出目录后全量重生成。
// 用法:pnpm -C uiux-atlas run generate:registry(随后 verify:registry 作发布门禁)
import { readdirSync, readFileSync, existsSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const entriesRoot = join(root, "src", "content", "entries", "components");
const outDir = join(root, "public", "registry");

// ── @/ 别名改写表:本站内部模块在 registry 消费端不可用,逐个给出替代方式 ──
// (教学演示件,非生产组件——注释必须如实写明,不得暗示可直接安装即用)
const AT_MODULE_HINTS = {
  "@/lib/store":
    "本站内部参数 store(getEntryStore,演示页参数面板 → 舞台的实时数据源)," +
    "registry 消费端不可用;接入时请改为本地受控 state(useState + props)," +
    "文件体内的 getEntryStore / store.get / store.subscribe 调用需同步替换。",
  "@/lib/types":
    "本站条目 schema 的 TS 类型(EntrySchema),registry 消费端不可用;" +
    "接入时请以你自己的参数定义类型内联替代,文件体内的 EntrySchema 注解需同步替换。",
  "@/components/DemoStage":
    "本站演示舞台组件(.demo-stage:cssVar 注入点 + 舞台铭牌 + #s= 分享参数恢复)," +
    "registry 消费端不可用;接入时请以自有舞台容器(如一个 <div>)替代," +
    "文件体内的 <DemoStage> 标签需同步替换。",
  "@/components/CommandPalette":
    "本站全站命令面板组件(PalettePanel 面板本体 + PaletteItem 条目类型," +
    "站点 Ctrl/Cmd+K 检索即它),registry 消费端不可用;接入时请以你自己的" +
    "检索面板实现替代,文件体内的 <PalettePanel> 标签与 PaletteItem 类型注解需同步替换。",
};

// 原位改写一条 import 行:`import X from "@/…";` → 「[registry 改写]」说明注释。
// 仅匹配双引号形式的 @/ 模块 import(31 个 demo 现状即此);遇到未登记的 @/ 模块直接报错,
// 不静默放过(诚实标注优先于生成成功)。
function rewriteAtImports(src, slug) {
  const problems = [];
  const out = src.split("\n").map((line) => {
    const m = line.match(/^import\s+(.+?)\s+from\s+"(@\/[^"]+)";\s*$/);
    if (!m) return line;
    const mod = m[2];
    const hint = AT_MODULE_HINTS[mod];
    if (!hint) {
      problems.push(`${slug}:demo 引用了未登记的内部模块 ${mod},无法给出替代说明`);
      return line;
    }
    return `// [registry 改写] 原:import ${m[1]} from "${mod}"; —— ${hint}`;
  });
  if (problems.length > 0) {
    console.error(JSON.stringify({ problems }, null, 2));
    process.exit(1);
  }
  return out.join("\n");
}

function buildHeader(schema, slug) {
  return [
    "/**",
    " * ───────────────────────────────────────────────────────────────────────────────",
    ` * [shadcn registry item · 教学演示件] ${schema.nameZh} ${schema.name}`,
    " *",
    ` * 来源:uiux-atlas src/content/entries/components/${slug}/demo/Demo.tsx`,
    " *       (由 scripts/generate-registry.mjs 内联生成;源文件保持不动,重跑生成器即刷新)",
    " *",
    " * 诚实标注:这是教学演示件,不是生产组件。原 demo 依赖的三个 @/ 内部模块",
    " * (@/lib/store 参数 store、@/lib/types 类型、@/components/DemoStage 演示舞台)",
    " * 在 registry 消费端不可用,已原位改写为「[registry 改写]」注释;文件体内对应的",
    " * getEntryStore / EntrySchema / DemoStage 引用需按各注释提示替换后,本文件才可编译运行。",
    " * 它记录的是「本站条目页如何实时驱动参数」,供阅读与改写,不可直接安装即用。",
    " *",
    " * 依赖:仅 react(+宿主的 react-dom 渲染);registry item 的 dependencies 留空,",
    " * 由消费端项目按自身版本声明 react。",
    " * ───────────────────────────────────────────────────────────────────────────────",
    " */",
    "",
  ].join("\n");
}

function buildItem(schema, slug) {
  const demoPath = `src/content/entries/components/${slug}/demo/Demo.tsx`;
  const raw = readFileSync(join(entriesRoot, slug, "demo", "Demo.tsx"), "utf8");
  const content = buildHeader(schema, slug) + rewriteAtImports(raw, slug);
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: slug,
    type: "registry:component",
    title: `${schema.nameZh} ${schema.name}`,
    description: schema.tagline.zh,
    files: [{ path: demoPath, type: "registry:component", content }],
    dependencies: [],
    registryDependencies: [],
    meta: { nameZh: schema.nameZh, star: schema.star, subgroup: schema.subgroup },
  };
}

// ── 主流程 ──
// 统一条目谓词 = schema.json + demo/Demo.tsx + zh.mdx 三件齐全(清单 mcp-registry-stale:
// 与 verify-registry.mjs / mcp/server.mjs loadEntries 同一口径,schema-only 在制骨架不入册)
const slugs = readdirSync(entriesRoot)
  .filter(
    (s) =>
      existsSync(join(entriesRoot, s, "schema.json")) &&
      existsSync(join(entriesRoot, s, "demo", "Demo.tsx")) &&
      existsSync(join(entriesRoot, s, "zh.mdx")),
  )
  .sort(); // 字典序稳定排序,输出确定性可 diff

const problems = [];
const items = [];
for (const slug of slugs) {
  let schema;
  try {
    schema = JSON.parse(readFileSync(join(entriesRoot, slug, "schema.json"), "utf8"));
  } catch (e) {
    problems.push(`${slug}:schema.json 解析失败(${e.message})`);
    continue;
  }
  for (const [field, kind] of [
    ["name", "非空字符串"],
    ["nameZh", "非空字符串"],
    ["tagline.zh", "非空字符串"],
    ["subgroup", "非空字符串"],
  ]) {
    const v = field.split(".").reduce((o, k) => (o == null ? o : o[k]), schema);
    if (typeof v !== "string" || v === "") problems.push(`${slug}:schema.${field} 缺失或非${kind}`);
  }
  if (typeof schema.star !== "number") problems.push(`${slug}:schema.star 缺失或非数字`);
  if (problems.some((p) => p.startsWith(`${slug}:`))) continue;
  items.push(buildItem(schema, slug));
}

if (problems.length > 0 || items.length !== 31) {
  problems.push(`期望 31 个部件条目,实际取到 ${items.length} 个(与 verify-entries.mjs 的 COMPONENT_SLUGS 口径应一致)`);
  console.error(JSON.stringify({ problems }, null, 2));
  process.exit(1);
}

// 清空既有 JSON 产物后全量重写(幂等可重跑;只删 *.json,不动目录本身——
// 目录被进程占用(如终端 cwd 停在其中)时也能重跑;杂项文件由 verify:registry 的目录卫生检查兜底)
mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) {
  if (f.endsWith(".json")) rmSync(join(outDir, f), { force: true });
}

// registry index:JSON 数组(轻量条目:name/type/title/description/files 路径/meta,不带 content)
const index = items.map(({ files, ...rest }) => ({
  ...rest,
  files: files.map((f) => ({ path: f.path, type: f.type })),
}));

for (const item of items) {
  writeFileSync(join(outDir, `${item.name}.json`), JSON.stringify(item, null, 2) + "\n", "utf8");
}
writeFileSync(join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n", "utf8");

console.log(
  JSON.stringify({
    items: items.length,
    index: index.length,
    outDir: "public/registry",
    next: "pnpm -C uiux-atlas run verify:registry",
  }),
);
