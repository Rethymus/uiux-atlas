import { getCollection } from "astro:content";
import { CATEGORIES, type EntrySchema } from "@/lib/types";
import { entryUrl } from "@/lib/urls";

/** entryId 形如 "styles/glassmorphism" → 对应条目 .md 端点路径 */
const mdUrl = (entryId: string): string => `/${entryId}/index.md`;

/**
 * llms.txt(agent 消费通道,静态端点):
 * 站点一句话定位 + 十分类(遍历 CATEGORIES,清单增删自动跟随)+
 * 全部条目清单(name/nameZh/URL/.md 链接)。
 * 纯文本输出;Content-Type: text/plain; charset=utf-8。
 */
export async function GET() {
  const entries = await getCollection("entries");

  const byCat = new Map<string, typeof entries>();
  for (const c of CATEGORIES) byCat.set(c.id, []);
  for (const e of entries) {
    const [cat] = e.id.split("/");
    byCat.get(cat)?.push(e);
  }

  const lines: string[] = [
    "# UI/UX 设计全解图集 / UI/UX Design Atlas",
    "",
    "> 可交互实例 · 代码拆解 · 参数实时调节 · 一键复刻 Prompt / Interactive examples · Code breakdown · Live parameter tuning · One-click replication prompt",
    "> 每个条目页含可交互 demo、实时参数面板与「复制复刻 Prompt / Copy replication prompt」;每条另有 agent 可读的纯文本版(路径见各行 md 链接)。",
    "",
    `条目总数 / Total entries: ${entries.length}`,
    "",
  ];

  for (const c of CATEGORIES) {
    const list = (byCat.get(c.id) ?? []).sort((a, b) => a.id.localeCompare(b.id));
    lines.push(`## ${c.id} ${c.zh} / ${c.en} (${list.length})`);
    lines.push("");
    if (list.length === 0) {
      lines.push("(暂无条目 / No entries yet)");
    } else {
      for (const e of list) {
        const s = e.data as unknown as EntrySchema;
        const name = s.nameZh ? `${s.name} / ${s.nameZh}` : s.name;
        lines.push(
          `- [${name}](${entryUrl("zh", e.id)}) — ${s.tagline.zh} | md: ${mdUrl(e.id)} | en: ${entryUrl("en", e.id)}`,
        );
      }
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
