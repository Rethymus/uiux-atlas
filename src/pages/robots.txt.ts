import type { APIRoute } from "astro";

/**
 * robots.txt(静态端点,清单 sitemap-robots-site-missing ③):
 * 全放行 + Sitemap 指向同源 /sitemap.xml。用端点而非 public/ 静态文件的原因:
 * 域名必须与 astro.config.mjs 的 site 同源 —— 端点读 import.meta.env.SITE,
 * 换域名时随配置自动同步(public/ 原样拷贝做不到)。零依赖,无 @astrojs/sitemap。
 */
export const GET: APIRoute = () => {
  const site = import.meta.env.SITE?.replace(/\/$/, "") ?? "";
  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${site}/sitemap.xml`, ""].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
