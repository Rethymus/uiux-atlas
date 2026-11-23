import type { APIRoute } from "astro";
import { withBase } from "@/lib/urls";

/**
 * robots.txt(静态端点,清单 sitemap-robots-site-missing ③):
 * 全放行 + Sitemap 指向同源的 /sitemap.xml(带部署子路径)。用端点而非 public/ 静态文件的原因:
 * 域名必须与 astro.config.mjs 的 site 同源 —— 端点读 import.meta.env.SITE,
 * 换域名时随配置自动同步(public/ 原样拷贝做不到)。零依赖,无 @astrojs/sitemap。
 * site 未配置时省略 Sitemap 行(robots 不接受相对地址),不回落到假域名。
 */
export const GET: APIRoute = () => {
  const site = import.meta.env.SITE;
  const lines = ["User-agent: *", "Allow: /", ""];
  if (site) {
    // 站内路径以 "/" 开头,解析结果与 site 是否已并入 base 无关
    lines.push(`Sitemap: ${new URL(withBase("sitemap.xml"), site).href}`, "");
  }
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
