import type { Locale } from "./types";

/**
 * 部署子路径:站点作为 GitHub Pages 项目页发布在 /uiux-atlas/ 下
 * (astro.config.mjs 的 base)。所有站内地址——页面链接、静态端点、public 资源——
 * 必须经 withBase() 生成;根路径写法("/styles/…")在项目页下会 404。
 * BASE_URL 是否带尾斜杠随 trailingSlash 配置而变,这里统一归一成带尾斜杠。
 */
const RAW_BASE = import.meta.env.BASE_URL ?? "/";
export const BASE_PATH = RAW_BASE.endsWith("/") ? RAW_BASE : `${RAW_BASE}/`;

/** 给去掉首斜杠的站内路径加上部署子路径,如 withBase("styles/glassmorphism/") */
export const withBase = (path: string): string => `${BASE_PATH}${path.replace(/^\/+/, "")}`;

/**
 * 双语路由 URL 助手:与 astro.config.mjs 的 i18n 配置一致
 * (defaultLocale zh 无前缀,en 在 /en/ 下)。路径统一带尾斜杠。
 */
export const homeUrl = (locale: Locale): string => withBase(locale === "en" ? "en/" : "");

export const categoryUrl = (locale: Locale, category: string): string =>
  withBase(locale === "en" ? `en/${category}/` : `${category}/`);

/** entryId 形如 "styles/glassmorphism" */
export const entryUrl = (locale: Locale, entryId: string): string =>
  withBase(locale === "en" ? `en/${entryId}/` : `${entryId}/`);

/** 「授人以渔」资源页 */
export const resourcesUrl = (locale: Locale): string =>
  withBase(locale === "en" ? "en/resources/" : "resources/");

/** 「趋势追踪」页(时点快照;不入导航,从首页与资源页入口进入) */
export const trendsUrl = (locale: Locale): string => withBase(locale === "en" ? "en/trends/" : "trends/");
