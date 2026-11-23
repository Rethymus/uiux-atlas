// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import { fontPreload } from "./scripts/integration-font-preload.mjs";

export default defineConfig({
  // 正式站点 = GitHub Pages 项目页(github.com/Rethymus/uiux-atlas 的 gh-pages 分支):
  // site 是域名来源,base 是项目页的子路径——canonical / og:url / hreflang / robots.txt /
  // sitemap 的绝对 URL 派生自二者,站内链接一律经 src/lib/urls.ts 的 withBase()。
  // 换仓库或换托管时改这两处(另见 mcp/server.mjs 顶部 SITE_BASE、scripts/deploy-gh-pages.mjs)。
  site: "https://rethymus.github.io",
  base: "/uiux-atlas",
  integrations: [react(), mdx(), fontPreload()],
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
