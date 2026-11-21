import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { CATEGORIES, SYSTEMS, type EntrySchema, type Param } from "@/lib/types";
import { serializeParamValue } from "@/lib/store";
import { entryUrl } from "@/lib/urls";

interface EntryProps {
  entryId: string;
  schema: EntrySchema;
}

// 与 [slug]/index.astro 同一 getStaticPaths:覆盖 entries collection 全部条目
export async function getStaticPaths() {
  const entries = await getCollection("entries");
  return entries.flatMap((entry) => {
    const [category, slug] = entry.id.split("/");
    if (!slug || !CATEGORIES.some((c) => c.id === category)) return [];
    return [
      {
        params: { category, slug },
        props: { entryId: entry.id, schema: entry.data as unknown as EntrySchema },
      },
    ];
  });
}

/** 参数「类型」列:类型名 + 单位/格式/选项(表格内用 " · " 分隔,避免破坏 |) */
function typeLabel(p: Param): string {
  switch (p.type) {
    case "dimension":
      return `dimension · ${p.unit}`;
    case "number":
      return p.unit ? `number · ${p.unit}` : "number";
    case "color":
      return `color · ${p.format}`;
    case "enum":
      return `enum: ${p.options.map((o) => o.value).join(" · ")}`;
    case "cubicBezier":
      return "cubicBezier";
    case "shadow":
      return "shadow · layers";
  }
}

/** 参数「默认值」列:与面板/复刻 Prompt 同一序列化(store.serializeParamValue);shadow 为 JSON */
function defaultLabel(p: Param): string {
  return p.type === "shadow" ? JSON.stringify(p.default) : serializeParamValue(p, p.default);
}

/**
 * 条目 .md(agent 消费通道,静态端点):结构化纯文本 markdown ——
 * name/nameZh/aliases/tagline/params 表(名称·类型·默认值)/场景/来源 URL/
 * 对应 HTML 页链接。getStaticPaths 覆盖 entries collection 全部条目。
 */
export const GET: APIRoute = ({ props }) => {
  const { entryId, schema } = props as EntryProps;
  const [category] = entryId.split("/");
  const cat = CATEGORIES.find((c) => c.id === category);
  const sys = SYSTEMS.find((s) => s.id === schema.system);

  const lines: string[] = [
    `# ${schema.name}${schema.nameZh ? ` / ${schema.nameZh}` : ""}`,
    "",
    `- 页面 / Page: ${entryUrl("zh", entryId)}`,
    `- English page: ${entryUrl("en", entryId)}`,
    `- 本页 / This file: /${entryId}/index.md`,
    `- 分类 / Category: ${category} ${cat ? `${cat.zh} / ${cat.en}` : ""}`,
    `- 来源体系 / System: ${sys ? `${sys.zh} / ${sys.en}` : schema.system}`,
    `- 参数化程度 / Parameterization: ${schema.star}/3`,
    `- 别名 / Aliases: ${schema.aliases.length > 0 ? schema.aliases.join(" · ") : "(none)"}`,
    `- 简介 / Tagline: ${schema.tagline.zh}`,
    `- Tagline (EN): ${schema.tagline.en}`,
    "",
    "## 参数 / Parameters",
    "",
    "| name | type | default |",
    "|---|---|---|",
    ...schema.params.map((p) => `| ${p.name} | ${typeLabel(p)} | ${defaultLabel(p)} |`),
    "",
    "## 适用场景 / When to use",
    "",
    ...schema.scenarios.use.map((s) => `- ${s.zh} / ${s.en}`),
    "",
    "## 何时不用 / When not to use",
    "",
    ...schema.scenarios.avoid.map((s) => `- ${s.zh} / ${s.en}`),
    "",
    "## 来源 / Sources",
    "",
    ...schema.sources.map((u) => `- ${u}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
