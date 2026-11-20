import type { Locale } from "./types";

/**
 * 双语路由 URL 助手:与 astro.config.mjs 的 i18n 配置一致
 * (defaultLocale zh 无前缀,en 在 /en/ 下)。路径统一带尾斜杠。
 */
export const homeUrl = (locale: Locale): string => (locale === "en" ? "/en/" : "/");

export const categoryUrl = (locale: Locale, category: string): string =>
  locale === "en" ? `/en/${category}/` : `/${category}/`;

/** entryId 形如 "styles/glassmorphism" */
export const entryUrl = (locale: Locale, entryId: string): string =>
  locale === "en" ? `/en/${entryId}/` : `/${entryId}/`;
