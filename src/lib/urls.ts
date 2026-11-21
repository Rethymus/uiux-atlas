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

/** 「授人以渔」资源页 */
export const resourcesUrl = (locale: Locale): string =>
  locale === "en" ? "/en/resources/" : "/resources/";

/** 「趋势追踪」页(时点快照;不入导航,从首页与资源页入口进入) */
export const trendsUrl = (locale: Locale): string =>
  locale === "en" ? "/en/trends/" : "/trends/";
