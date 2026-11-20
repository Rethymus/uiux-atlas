import { getCollection } from "astro:content";
import type { EntryMeta } from "./types";

/**
 * entries collection → 列表页/首页用的可序列化精简元数据(EntryMeta)。
 * schema.json 经 zod 校验后是普通 JSON,可直接传给 React 岛屿。
 */
export async function listEntryMetas(): Promise<EntryMeta[]> {
  const entries = await getCollection("entries");
  return entries.map((e) => ({
    slug: e.id,
    name: e.data.name,
    system: e.data.system as EntryMeta["system"],
    star: e.data.star,
    tagline: e.data.tagline,
  }));
}
