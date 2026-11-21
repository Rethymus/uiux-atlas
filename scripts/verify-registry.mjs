// shadcn registry 发布件门禁:校验 public/registry/ 下的 24 个 item JSON 与 registry index。
// 任一 problem 即 exit 1(先 generate:registry 再跑本门禁)。
// 用法:pnpm -C uiux-atlas run verify:registry
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const entriesRoot = join(root, "src", "content", "entries", "components");
const regDir = join(root, "public", "registry");

// 24 = components 分类部件条目数(与 generate-registry.mjs、verify-entries.mjs 的
// COMPONENT_SLUGS 口径一致;若部件清单增删,三处需同步修订)
const EXPECTED_COUNT = 24;

const problems = [];
const items = {}; // slug -> item(供 index 对账)

// 期望 slug 清单直接从条目目录取,与生成器同口径
const slugs = readdirSync(entriesRoot)
  .filter((s) => existsSync(join(entriesRoot, s, "schema.json")) && existsSync(join(entriesRoot, s, "demo", "Demo.tsx")))
  .sort();
if (slugs.length !== EXPECTED_COUNT) {
  problems.push(`条目目录部件数为 ${slugs.length},期望 ${EXPECTED_COUNT}(部件清单增删需同步门禁)`);
}

if (!existsSync(regDir)) {
  problems.push("public/registry/ 不存在,先运行 pnpm -C uiux-atlas run generate:registry");
} else {
  const files = readdirSync(regDir).sort();

  // ── 逐 item 校验 ──
  for (const slug of slugs) {
    const file = join(regDir, `${slug}.json`);
    if (!existsSync(file)) {
      problems.push(`${slug}.json 缺失`);
      continue;
    }
    let item;
    try {
      item = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      problems.push(`${slug}.json 解析失败(${e.message})`);
      continue;
    }
    // 必填字段:name / type / files[].path / content 非空
    if (typeof item.name !== "string" || item.name === "") problems.push(`${slug}.json:name 非空字符串`);
    else if (item.name !== slug) problems.push(`${slug}.json:name=${item.name} 与文件名不一致`);
    if (item.type !== "registry:component") problems.push(`${slug}.json:type=${item.type},期望 "registry:component"`);
    if (!Array.isArray(item.files) || item.files.length === 0) {
      problems.push(`${slug}.json:files 需为非空数组`);
    } else {
      item.files.forEach((f, i) => {
        if (typeof f?.path !== "string" || f.path === "") {
          problems.push(`${slug}.json:files[${i}].path 非空字符串`);
        } else if (!f.path.includes(`/components/${slug}/demo/Demo.tsx`)) {
          problems.push(`${slug}.json:files[${i}].path=${f.path} 未指向该条目的 demo/Demo.tsx`);
        }
        if (typeof f?.content !== "string" || f.content.trim() === "") {
          problems.push(`${slug}.json:files[${i}].content 非空`);
        } else if (f.content.split("\n").some((l) => /^\s*import\b[^;\n]*from\s+"@\//.test(l))) {
          problems.push(`${slug}.json:content 残留未改写的 @/ import(须为 [registry 改写] 注释形式)`);
        }
      });
    }
    // meta:nameZh / star / subgroup
    if (item.meta?.nameZh === undefined || item.meta?.nameZh === "") problems.push(`${slug}.json:meta.nameZh 缺失`);
    if (typeof item.meta?.star !== "number") problems.push(`${slug}.json:meta.star 缺失或非数字`);
    if (item.meta?.subgroup === undefined || item.meta?.subgroup === "") problems.push(`${slug}.json:meta.subgroup 缺失`);
    // dependencies 按约定留空(react 由消费端声明)
    if (Array.isArray(item.dependencies) && item.dependencies.length > 0) {
      problems.push(`${slug}.json:dependencies=${JSON.stringify(item.dependencies)},按约定应为 []`);
    }
    if (item.name === slug) items[slug] = item;
  }

  // ── 目录卫生:除 index.json 外不得有其它杂项文件 ──
  // 隐藏条目(以 . 开头,如安全扫描插件写入的 .mimosa 状态目录)不属 registry 产物,忽略不计;
  // 可见的杂项文件一律报错,防止陈旧/无关产物混入发布件。
  const expected = new Set([...slugs.map((s) => `${s}.json`), "index.json"]);
  for (const f of files) {
    if (f.startsWith(".")) continue;
    if (!expected.has(f)) problems.push(`public/registry/${f} 不在期望清单(index.json + 24 item)内`);
  }

  // ── registry index:JSON 数组,数量与 item 一致,名字集合一致 ──
  const indexFile = join(regDir, "index.json");
  let index = null;
  if (!existsSync(indexFile)) {
    problems.push("index.json 缺失");
  } else {
    try {
      index = JSON.parse(readFileSync(indexFile, "utf8"));
    } catch (e) {
      problems.push(`index.json 解析失败(${e.message})`);
    }
    if (Array.isArray(index)) {
      const indexNames = index.map((e) => e?.name);
      if (index.length !== Object.keys(items).length) {
        problems.push(`index 条数=${index.length} 与 item 数=${Object.keys(items).length} 不一致`);
      }
      const missing = slugs.filter((s) => !indexNames.includes(s));
      if (missing.length > 0) problems.push(`index 缺少条目:${missing.join(", ")}`);
      const unknown = indexNames.filter((n) => typeof n !== "string" || !slugs.includes(n));
      if (unknown.length > 0) problems.push(`index 含未知条目:${unknown.join(", ")}`);
    } else if (index !== null) {
      problems.push("index.json 顶层需为 JSON 数组");
    }
  }
}

const summary = { expected: EXPECTED_COUNT, items: Object.keys(items).length, problems: problems.length };
if (problems.length > 0) {
  console.error(JSON.stringify({ ...summary, problems }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(summary));
