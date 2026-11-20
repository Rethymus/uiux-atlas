// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [react(), mdx()],
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
