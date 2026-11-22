import { getCollection } from "astro:content";

/**
 * 命令面板条目索引(构建时注入):全部条目的 name/nameZh/aliases/category/star。
 * 由 Base.astro 在 SSR 阶段调用,经 Astro 岛屿 props(JSON 序列化)传入
 * src/components/CommandPalette.tsx(client:load)。纯数据、可序列化。
 */
export interface PaletteItem {
  /** 条目 id,形如 "components/button"(客户端由 lib/urls entryUrl 拼 URL) */
  slug: string;
  name: string;
  nameZh?: string;
  aliases: string[];
  category: string;
  /** 参数化程度 1-3 */
  star: number;
}

export async function listPaletteItems(): Promise<PaletteItem[]> {
  const entries = await getCollection("entries");
  return entries
    .map((e) => ({
      slug: e.id,
      name: e.data.name,
      nameZh: e.data.nameZh,
      aliases: e.data.aliases ?? [],
      category: e.data.category as string,
      star: e.data.star,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
