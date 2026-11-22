// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // ⚠️ 占位域名(清单 sitemap-robots-site-missing ①):canonical / og:url / hreflang /
  //    robots.txt / sitemap 的绝对 URL 全部派生自此 site——上线前改成正式域名,
  //    只需改这一处(Base.astro / robots.txt 端点 / sitemap 端点均读 Astro.site / SITE)。
  site: "https://uiux-atlas.example.com",
  integrations: [react(), mdx()],
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
