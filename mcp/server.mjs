#!/usr/bin/env node
/**
 * uiux-atlas MCP server — 零依赖 stdio JSON-RPC(换行分隔消息)。
 *
 * 协议依据 MCP 官方 spec 2025-03-26(https://modelcontextprotocol.io/specification/2025-03-26):
 * - stdio transport:stdin 读 / stdout 写,消息按换行分隔且不得含嵌入换行,UTF-8;
 *   stdout 只允许合法 MCP 消息,日志一律走 stderr。
 * - initialize 握手:响应 { protocolVersion, capabilities, serverInfo };版本协商——
 *   客户端请求的版本受支持则原样回显,否则回落到本 server 支持的最新版本。
 * - tools/list / tools/call;prompts/resources 不提供(本站无此能力)。
 * - 未知工具 / 非法参数 → JSON-RPC 协议错误 -32602;工具执行层错误
 *   (条目不存在、过滤值非法等)→ result.isError: true。
 * - 2025-03-26 版仍允许 JSON-RPC batch(数组消息),一并支持。
 *
 * 不引入任何运行时依赖;只读 src/content/entries/<分类>/<slug>/schema.json。
 * 条目 id 形如 "styles/glassmorphism"(与 src/lib/urls.ts 的 entryUrl 注释同源)。
 */
import { createInterface } from "node:readline";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ENTRIES_ROOT = join(SERVER_ROOT, "src", "content", "entries");
const PKG = JSON.parse(readFileSync(join(SERVER_ROOT, "package.json"), "utf8"));
const SERVER_INFO = { name: "uiux-atlas", version: PKG.version ?? "0.0.0" };

/** 本 server 实现并声明的协议版本(spec 2025-03-26;版本协商的回落基准) */
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-03-26"];

/**
 * 十分类与来源体系 —— 与 src/lib/types.ts 的 CATEGORIES / SYSTEMS 同源(只读副本;
 * server 零依赖,不 import TS)。顺序即 categories.ts 列表页顺序。
 * (清单 mcp-registry-stale:principles 分类此前漏同步,已补齐;条目数不再写死,
 *  initialize instructions / search_entries 描述运行时取 loadEntries().length。)
 */
const CATEGORIES = [
  { id: "styles", zh: "风格流派", en: "Styles" },
  { id: "materials", zh: "材质与光影", en: "Materials" },
  { id: "motion", zh: "动效与微交互", en: "Motion" },
  { id: "color", zh: "色彩与主题", en: "Color" },
  { id: "type", zh: "排版", en: "Typography" },
  { id: "layout", zh: "布局与响应式", en: "Layout" },
  { id: "components", zh: "前端部件", en: "Components" },
  { id: "icons", zh: "图标体系", en: "Icons" },
  { id: "dataviz", zh: "数据可视化", en: "Data Viz" },
  { id: "principles", zh: "交互法则", en: "Principles" },
];
const SYSTEMS = [
  { id: "apple", zh: "Apple HIG", en: "Apple HIG" },
  { id: "m3", zh: "Material 3", en: "Material 3" },
  { id: "fluent", zh: "Fluent", en: "Fluent" },
  { id: "web-std", zh: "Web 标准", en: "Web Standard" },
  { id: "component-lib", zh: "组件库", en: "Component Lib" },
  { id: "community", zh: "社区流派", en: "Community" },
];

// ---------------------------------------------------------------------------
// 条目加载(懒加载 + 缓存;统一条目谓词,清单 mcp-registry-stale)
// 谓词 = schema.json + demo/Demo.tsx + zh.mdx 三件齐全(与 generate-registry.mjs /
// verify-registry.mjs 同一口径):只有 schema.json 的在制骨架不进 MCP 索引,
// 三处口径一致后不会再出现「MCP 收了 / registry 没收」的互斥。
// ---------------------------------------------------------------------------

let entriesCache = null;

function loadEntries() {
  if (entriesCache) return entriesCache;
  const list = [];
  const categoryOrder = new Map(CATEGORIES.map((c, i) => [c.id, i]));
  for (const category of readdirSync(ENTRIES_ROOT, { withFileTypes: true })) {
    if (!category.isDirectory() || category.name.startsWith(".")) continue; // 隐藏目录(.mimosa hook 状态等)非分类,同 verify-entries.mjs 约定
    const catDir = join(ENTRIES_ROOT, category.name);
    for (const slug of readdirSync(catDir, { withFileTypes: true })) {
      if (!slug.isDirectory() || slug.name.startsWith(".")) continue; // 隐藏目录非条目(同 verify-entries.mjs 约定)
      const schemaPath = join(catDir, slug.name, "schema.json");
      // 统一谓词:三件套不全 = 在制骨架,跳过(如实写 stderr,不静默吞)
      const demoPath = join(catDir, slug.name, "demo", "Demo.tsx");
      const zhMdxPath = join(catDir, slug.name, "zh.mdx");
      if (!existsSync(schemaPath) || !existsSync(demoPath) || !existsSync(zhMdxPath)) {
        process.stderr.write(`[uiux-atlas-mcp] skip incomplete entry (需 schema.json + demo/Demo.tsx + zh.mdx): ${category.name}/${slug.name}\n`);
        continue;
      }
      let schema;
      try {
        schema = JSON.parse(readFileSync(schemaPath, "utf8"));
      } catch (e) {
        process.stderr.write(`[uiux-atlas-mcp] skip unreadable schema: ${category.name}/${slug.name} (${e.message})\n`);
        continue;
      }
      list.push({ id: `${category.name}/${slug.name}`, category: category.name, slug: slug.name, schema });
    }
  }
  // 确定性排序:分类按 CATEGORIES 顺序,其余按 slug 字典序
  list.sort(
    (a, b) =>
      (categoryOrder.get(a.category) ?? 99) - (categoryOrder.get(b.category) ?? 99) ||
      a.slug.localeCompare(b.slug, "en"),
  );
  entriesCache = list;
  return list;
}

/** 解析条目:支持完整 id("styles/glassmorphism")或唯一 slug 短名("glassmorphism") */
function resolveEntry(id) {
  const entries = loadEntries();
  const exact = entries.find((e) => e.id === id);
  if (exact) return exact;
  if (!id.includes("/")) {
    const bySlug = entries.filter((e) => e.slug === id);
    if (bySlug.length === 1) return bySlug[0];
    if (bySlug.length > 1) {
      return { error: `ambiguous slug "${id}" — matches ${bySlug.map((e) => e.id).join(", ")}; pass the full id` };
    }
  }
  return { error: `entry not found: "${id}" — use search_entries / list_categories to discover ids` };
}

/**
 * 条目页 URL(zh 为主 locale 无前缀、en 在 /en/ 下,与 src/lib/urls.ts entryUrl 同源)。
 * 部署子路径直接读 astro.config.mjs 文本里的 base(零依赖,不 import astro)——
 * 站点作为 GitHub Pages 项目页发布在 <base>/ 下,返回根路径地址会让 agent 打开 404。
 */
const SITE_BASE = (() => {
  try {
    const raw = readFileSync(join(SERVER_ROOT, "astro.config.mjs"), "utf8").match(/\bbase:\s*["']([^"']+)["']/)?.[1] ?? "/";
    return raw.endsWith("/") ? raw : `${raw}/`;
  } catch {
    return "/";
  }
})();
/**
 * 可选的环境变量 ATLAS_SITE_ORIGIN(如 https://example.github.io):设置后条目 URL 输出绝对地址,
 * agent 可直接打开;未设置则输出带 base 的站内路径。只接受 http/https 来源,其余一律忽略。
 */
const SITE_ORIGIN = /^https?:\/\/[^/\s]+$/i.test(process.env.ATLAS_SITE_ORIGIN ?? "")
  ? process.env.ATLAS_SITE_ORIGIN
  : "";
const siteUrl = (path) => (SITE_ORIGIN ? `${SITE_ORIGIN}${path}` : path);
const entryUrlZh = (id) => siteUrl(`${SITE_BASE}${id}/`);
const entryUrlEn = (id) => siteUrl(`${SITE_BASE}en/${id}/`);

// ---------------------------------------------------------------------------
// 参数值序列化 —— 与 src/lib/store.ts 的 serializeParamValue 同源(same origin):
// dimension 带单位 / number 可带单位 / color·enum 原样 / cubic-bezier(...) /
// shadow 多层 "xpx ypx blurpx spreadpx color" 以 ", " 拼接。
// ---------------------------------------------------------------------------

/** @param p schema.json 的单个 param 对象 @param v 参数值(默认取 p.default) */
function serializeParamValue(p, v = p.default) {
  switch (p.type) {
    case "dimension":
      return `${v}${p.unit}`;
    case "number":
      return p.unit ? `${v}${p.unit}` : String(v);
    case "color":
    case "enum":
      return String(v);
    case "cubicBezier": {
      const [x1, y1, x2, y2] = v;
      return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    }
    case "shadow":
      return v.map((l) => `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`).join(", ");
    default:
      return String(v);
  }
}

// ---------------------------------------------------------------------------
// 工具实现
// ---------------------------------------------------------------------------

function toolError(message) {
  return { isError: true, content: [{ type: "text", text: message }] };
}

function toolText(text) {
  return { content: [{ type: "text", text }] };
}

/** search_entries({query?, category?, system?, star?}) */
function toolSearchEntries(args) {
  const { query, category, system, star } = args;
  if (category !== undefined && !CATEGORIES.some((c) => c.id === category)) {
    return toolError(`unknown category "${category}" — valid ids: ${CATEGORIES.map((c) => c.id).join(", ")}`);
  }
  if (system !== undefined && !SYSTEMS.some((s) => s.id === system)) {
    return toolError(`unknown system "${system}" — valid ids: ${SYSTEMS.map((s) => s.id).join(", ")}`);
  }
  if (star !== undefined && (!Number.isInteger(star) || star < 1 || star > 3)) {
    return toolError(`star must be an integer 1–3 (parameterization level), got ${JSON.stringify(star)}`);
  }
  const q = typeof query === "string" ? query.trim().toLowerCase() : undefined;
  const matched = loadEntries().filter((e) => {
    const s = e.schema;
    if (category !== undefined && s.category !== category) return false;
    if (system !== undefined && s.system !== system) return false;
    if (star !== undefined && s.star !== star) return false;
    if (q !== undefined && q !== "") {
      const haystack = [
        e.id,
        s.name,
        s.nameZh ?? "",
        ...(Array.isArray(s.aliases) ? s.aliases : []),
        s.tagline?.zh ?? "",
        s.tagline?.en ?? "",
      ]
        .join("\n")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
  // 每条只返回精简字段(id/name/nameZh/tagline/star/system/url),详情走 get_entry
  const results = matched.map((e) => ({
    id: e.id,
    name: e.schema.name,
    nameZh: e.schema.nameZh ?? e.schema.name,
    tagline: e.schema.tagline,
    star: e.schema.star,
    system: e.schema.system,
    url: entryUrlZh(e.id),
  }));
  return toolText(JSON.stringify({ count: results.length, entries: results }, null, 2));
}

/** get_entry({id}) — schema 全文 + zh/en 双语参数表 + sources */
function toolGetEntry(args) {
  const found = resolveEntry(args.id);
  if (found.error) return toolError(found.error);
  const s = found.schema;
  const paramRows = s.params
    .map((p) => {
      const defaultStr = serializeParamValue(p);
      return `| ${p.name} | ${p.type} | \`${defaultStr}\` | ${p.effect?.zh ?? "—"} | ${p.effect?.en ?? "—"} |`;
    })
    .join("\n");
  const header =
    `# ${s.name} / ${s.nameZh ?? s.name}\n\n` +
    `- id: ${found.id}\n` +
    `- category: ${s.category} / system: ${s.system} / star: ${s.star}\n` +
    `- zh page: ${entryUrlZh(found.id)} · en page: ${entryUrlEn(found.id)}\n\n` +
    `## 完整 schema(schema.json 全文)\n\n\`\`\`json\n${JSON.stringify(s, null, 2)}\n\`\`\`\n\n` +
    `## 参数表(zh / en 双语:名称、类型、默认值、effect)\n\n` +
    `| 名称 name | 类型 type | 默认值 default(已按 CSS 序列化) | effect(zh) | effect(en) |\n` +
    `|---|---|---|---|---|\n${paramRows}\n\n` +
    `## sources\n${(s.sources ?? []).map((u) => `- ${u}`).join("\n")}`;
  return toolText(header);
}

/** build_prompt({id, params?, locale?}) —— 组装结构与 src/lib/prompt.ts 的 buildPrompt 同构 */
function toolBuildPrompt(args) {
  const found = resolveEntry(args.id);
  if (found.error) return toolError(found.error);
  const s = found.schema;
  const locale = args.locale ?? "zh";
  if (locale !== "zh" && locale !== "en") {
    return toolError(`locale must be "zh" or "en", got ${JSON.stringify(locale)}`);
  }
  const overrides = args.params ?? {};
  if (typeof overrides !== "object" || Array.isArray(overrides) || overrides === null) {
    return toolError(`params must be an object of { paramName: value }, got ${JSON.stringify(overrides)}`);
  }
  const byName = new Map(s.params.map((p) => [p.name, p]));
  const unknown = Object.keys(overrides).filter((k) => !byName.has(k));
  if (unknown.length > 0) {
    return toolError(
      `unknown param(s): ${unknown.join(", ")} — valid params for ${found.id}: ${s.params.map((p) => p.name).join(", ")}`,
    );
  }
  // 类型校验(与 src/lib/types.ts 的 Param 各分支一致)
  for (const [name, value] of Object.entries(overrides)) {
    const p = byName.get(name);
    const bad = (msg) => toolError(`invalid value for param "${name}": ${msg}`);
    switch (p.type) {
      case "dimension":
      case "number":
        if (typeof value !== "number" || !Number.isFinite(value)) return bad(`expected a finite number, got ${JSON.stringify(value)}`);
        break;
      case "color":
        if (typeof value !== "string" || !value) return bad(`expected a color string, got ${JSON.stringify(value)}`);
        break;
      case "enum":
        if (typeof value !== "string" || !p.options.some((o) => o.value === value)) {
          return bad(`expected one of [${p.options.map((o) => o.value).join(", ")}], got ${JSON.stringify(value)}`);
        }
        break;
      case "cubicBezier":
        if (
          !Array.isArray(value) || value.length !== 4 || !value.every((n) => typeof n === "number" && Number.isFinite(n))
        ) {
          return bad(`expected [x1, y1, x2, y2] numbers, got ${JSON.stringify(value)}`);
        }
        break;
      case "shadow": {
        const layersOk =
          Array.isArray(value) &&
          value.length >= 1 &&
          value.every(
            (l) =>
              l && typeof l === "object" &&
              ["x", "y", "blur", "spread"].every((k) => typeof l[k] === "number" && Number.isFinite(l[k])) &&
              typeof l.color === "string" && l.color,
          );
        if (!layersOk) return bad(`expected [{ x, y, blur, spread, color }, ...] with >= 1 layer, got ${JSON.stringify(value)}`);
        break;
      }
    }
  }

  // 参数快照:默认值 + 调用方覆盖(值序列化与 serializeParamValue 同源,见上)
  const snapshot = s.params.map((p) => ({
    name: p.name,
    value: serializeParamValue(p, Object.hasOwn(overrides, p.name) ? overrides[p.name] : p.default),
  }));
  const snapshotJson = JSON.stringify(snapshot, null, 2);
  const bulletLines = snapshot.map((it) => `- ${it.name} ${it.value}`).join("\n");
  const cssVarHints = s.params.filter((p) => p.cssVar).map((p) => `- ${p.name} → ${p.cssVar}`);
  const zh = locale === "zh";

  // 组装结构与 src/lib/prompt.ts buildPrompt 同构:目标 / 参数快照 / 验收要点 / CSS 变量映射 / 回退 / 出处
  const lines = [
    zh ? "## 目标" : "## Goal",
    "",
    s.promptTemplate.goal[locale],
    "",
    zh
      ? "请一比一复刻该设计效果,严格遵循以下参数快照,不要自行调整数值。"
      : "Replicate this design one-to-one. Strictly follow the parameter snapshot below; do not alter the values.",
    "",
    zh ? "## 参数快照(Parameter Snapshot)" : "## Parameter Snapshot",
    "",
    bulletLines,
    "",
    "```json",
    snapshotJson,
    "```",
    "",
    zh ? "## 验收要点" : "## Acceptance Criteria",
    "",
    ...s.promptTemplate.acceptance.map((a) => `- ${a[locale]}`),
  ];
  if (cssVarHints.length > 0) {
    lines.push(
      "",
      zh ? "## 参数 → CSS 变量映射" : "## Parameter → CSS Variable Mapping",
      "",
      ...cssVarHints,
    );
  }
  if (s.fallback) {
    lines.push("", zh ? "## 兼容性回退" : "## Fallback", "", s.fallback[locale]);
  }
  lines.push("", zh ? "## 出处" : "## Source", "", `${entryUrlZh(found.id)} (zh) · ${entryUrlEn(found.id)} (en)`);
  return toolText(lines.join("\n"));
}

/** list_categories() — 十分类与计数 */
function toolListCategories() {
  const entries = loadEntries();
  const categories = CATEGORIES.map((c) => ({
    id: c.id,
    zh: c.zh,
    en: c.en,
    count: entries.filter((e) => e.category === c.id).length,
  }));
  return toolText(JSON.stringify({ categories, total: entries.length }, null, 2));
}

// ---------------------------------------------------------------------------
// 工具注册表(tools/list 的 definitions)
// ---------------------------------------------------------------------------

const CATEGORY_IDS = CATEGORIES.map((c) => c.id);
const SYSTEM_IDS = SYSTEMS.map((s) => s.id);

/* 条目总数(模块加载时实算一次;清单 mcp-registry-stale:描述/说明里的数字
   不再写死,清单增删自动跟随 loadEntries 口径) */
const ENTRY_COUNT = loadEntries().length;

const TOOLS = [
  {
    name: "search_entries",
    description: `检索 uiux-atlas 图集条目(${ENTRY_COUNT} 条,十分类)。按关键词 / 分类 / 来源体系 / 参数化星级过滤,返回精简列表(id、name、nameZh、tagline、star、system、url)。query 大小写不敏感子串匹配,覆盖 id、英文名、中文名、aliases、双语 tagline。`,
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "关键词(可选):匹配 id / name / nameZh / aliases / tagline(zh+en)" },
        category: { type: "string", enum: CATEGORY_IDS, description: "十分类 id,如 styles / materials" },
        system: { type: "string", enum: SYSTEM_IDS, description: "来源体系 id,如 apple / m3 / fluent / web-std / component-lib / community" },
        star: { type: "integer", minimum: 1, maximum: 3, description: "参数化程度精确匹配(1–3)" },
      },
      additionalProperties: false,
    },
    handler: (args) => toolSearchEntries(args ?? {}),
  },
  {
    name: "get_entry",
    description:
      '读取单个条目:id 支持 "styles/glassmorphism" 全 id 或唯一 slug 短名("glassmorphism")。返回 schema.json 全文 + zh/en 双语参数表(名称 / 类型 / 默认值(已序列化)/ effect)+ sources 来源清单。',
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: '条目 id,如 "styles/glassmorphism"(或唯一 slug "glassmorphism")' },
      },
      required: ["id"],
      additionalProperties: false,
    },
    handler: (args) => toolGetEntry(args),
  },
  {
    name: "build_prompt",
    description:
      "生成一比一复刻 prompt:按 schema.promptTemplate(目标 + 验收要点)+ 参数快照组装;快照默认取 schema 默认值,params 可部分覆盖(仅已知参数名,类型校验)。序列化与站点「复制复刻 Prompt」按钮同源:dimension 带单位、cubic-bezier(...)、shadow 多层拼接。locale 控制叙述语言(参数名与数值保留英文原词)。",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "条目 id(全 id 或唯一 slug)" },
        params: { type: "object", description: '可选:部分参数覆盖,如 { "blur": 30 }', additionalProperties: true },
        locale: { type: "string", enum: ["zh", "en"], description: "叙述语言,默认 zh" },
      },
      required: ["id"],
      additionalProperties: false,
    },
    handler: (args) => toolBuildPrompt(args),
  },
  {
    name: "list_categories",
    description: "列出十分类(id、中文名、英文名)与各类条目计数、总数。",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    handler: () => toolListCategories(),
  },
];

// ---------------------------------------------------------------------------
// JSON-RPC 消息层
// ---------------------------------------------------------------------------

function writeMessage(obj) {
  // spec:stdout 只输出合法 MCP 消息;换行分隔且不得含嵌入换行(JSON.stringify 保证单行)
  process.stdout.write(`${JSON.stringify(obj)}\n`);
}

function respond(id, result) {
  writeMessage({ jsonrpc: "2.0", id, result });
}

function respondError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  writeMessage({ jsonrpc: "2.0", id, error });
}

/** 处理单条 JSON-RPC 消息;返回要回发的响应(无 id 的通知返回 null) */
function handleMessage(msg) {
  if (typeof msg !== "object" || msg === null || Array.isArray(msg)) {
    return { id: msg?.id ?? null, error: { code: -32600, message: "Invalid request: not a JSON-RPC message object" } };
  }
  const { id, method, params } = msg;
  if (msg.jsonrpc !== "2.0" || typeof method !== "string") {
    return { id: id ?? null, error: { code: -32600, message: 'Invalid request: missing jsonrpc "2.0" or method' } };
  }

  // —— initialize 握手(spec lifecycle:响应 protocolVersion + capabilities + serverInfo)——
  if (method === "initialize") {
    const requested = params?.protocolVersion;
    const negotiated = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
      ? requested
      : SUPPORTED_PROTOCOL_VERSIONS[SUPPORTED_PROTOCOL_VERSIONS.length - 1];
    return {
      id,
      result: {
        protocolVersion: negotiated,
        capabilities: { tools: { listChanged: false } }, // 仅 tools 能力;prompts/resources 不提供
        serverInfo: SERVER_INFO,
        instructions: `uiux-atlas 设计图集:十分类 ${loadEntries().length} 条目(${CATEGORIES.map((c) => `${c.id} ${c.zh}`).join(" / ")})。list_categories 看分类计数 → search_entries 检索 → get_entry 看详情与参数 → build_prompt 生成一比一复刻 prompt。`,
      },
    };
  }

  // 通知:initialized 等,不回发任何消息
  if (id === undefined || id === null) {
    return null; // 未知通知静默丢弃(spec:notifications 不产生响应)
  }

  switch (method) {
    case "ping":
      return { id, result: {} };
    case "tools/list":
      return { id, result: { tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) } };
    case "tools/call": {
      const name = params?.name;
      const tool = TOOLS.find((t) => t.name === name);
      if (!tool) {
        return { id, error: { code: -32602, message: `Unknown tool: ${JSON.stringify(name)}` } };
      }
      const args = params?.arguments;
      if (args !== undefined && (typeof args !== "object" || Array.isArray(args) || args === null)) {
        return { id, error: { code: -32602, message: `Invalid arguments: expected an object, got ${JSON.stringify(args)}` } };
      }
      for (const key of tool.inputSchema.required ?? []) {
        if (args === undefined || args[key] === undefined) {
          return { id, error: { code: -32602, message: `Invalid arguments: missing required param "${key}"` } };
        }
      }
      try {
        return { id, result: tool.handler(args ?? {}) };
      } catch (e) {
        return { id, error: { code: -32603, message: `Internal error in tool "${name}": ${e.message}` } };
      }
    }
    default:
      return { id, error: { code: -32601, message: `Method not found: ${method}` } };
  }
}

function dispatch(messageText) {
  const line = messageText.trim();
  if (line === "") return;
  let parsed;
  try {
    parsed = JSON.parse(line);
  } catch (e) {
    respondError(null, -32700, `Parse error: ${e.message}`);
    return;
  }
  // 2025-03-26 仍支持 JSON-RPC batch(数组消息):逐条处理,回发响应数组
  if (Array.isArray(parsed)) {
    const responses = parsed.map(handleMessage).filter((r) => r !== null);
    if (responses.length > 0) writeMessage(responses);
    return;
  }
  const response = handleMessage(parsed);
  if (response !== null) {
    if (response.error) respondError(response.id, response.error.code, response.error.message, response.error.data);
    else respond(response.id, response.result);
  }
}

const rl = createInterface({ input: process.stdin, terminal: false });
rl.on("line", dispatch);
rl.on("close", () => process.exit(0));

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
