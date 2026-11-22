import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { CATEGORIES } from "@/lib/types";
import { categoryUrl, entryUrl, homeUrl, resourcesUrl, trendsUrl } from "@/lib/urls";

/**
 * sitemap.xml(静态端点;清单 sitemap-robots-site-missing 的零依赖等价实现,
 * 不引入 @astrojs/sitemap——零依赖纪律):双语全页清单(首页/分类/条目/资源/趋势),
 * 每条 loc 附 xhtml:link rel="alternate" hreflang 互指(zh-CN / en / x-default→zh),
 * 与 Base.astro head 的 hreflang 同源。robots.txt 端点指向本文件。
 * 未输出 lastmod:本站无逐页可靠修改时间数据,宁缺毋滥(如实标注)。
 */
export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection("entries")).filter((e) =>
    CATEGORIES.some((c) => c.id === e.id.split("/")[0]),
  );
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /** 每个页面的一对双语 URL(zh/en 路径);loc 取 zh,xhtml:link 双语互指 */
  const pagePairs: Array<{ zh: string; en: string }> = [
    { zh: homeUrl("zh"), en: homeUrl("en") },
    { zh: resourcesUrl("zh"), en: resourcesUrl("en") },
    { zh: trendsUrl("zh"), en: trendsUrl("en") },
    ...CATEGORIES.map((c) => ({ zh: categoryUrl("zh", c.id), en: categoryUrl("en", c.id) })),
    ...entries.map((e) => ({ zh: entryUrl("zh", e.id), en: entryUrl("en", e.id) })),
  ];

  const origin = (site?.href ?? "https://uiux-atlas.example.com/").replace(/\/$/, "");
  const abs = (p: string) => `${origin}${p.startsWith("/") ? p : `/${p}`}`;

  const urls = pagePairs
    .map((pair) => {
      const zh = abs(pair.zh);
      const en = abs(pair.en);
      return [
        "  <url>",
        `    <loc>${escape(zh)}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escape(zh)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(zh)}"/>`,
        "  </url>",
        "  <url>",
        `    <loc>${escape(en)}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escape(zh)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(zh)}"/>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
