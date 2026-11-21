import type { Locale } from "./types";

/**
 * 条目展示名:zh 站优先用中文名(nameZh),无中文译名才回退英文 name;
 * en 站恒用英文 name。nameZh 与 name 同时可检索(nameZh 缺省时两站同名)。
 */
export function displayName(entry: { name: string; nameZh?: string }, locale: Locale): string {
  if (locale === "zh") return entry.nameZh ?? entry.name;
  return entry.name;
}

/**
 * 条目页 h1 的英文副名:zh 站且中文名与英文名不同时,返回英文名用于小字并列展示
 * (保证术语对应与可检索性);其余场景返回 null(不渲染)。
 */
export function secondaryName(entry: { name: string; nameZh?: string }, locale: Locale): string | null {
  if (locale !== "zh" || !entry.nameZh) return null;
  return entry.nameZh === entry.name ? null : entry.name;
}
