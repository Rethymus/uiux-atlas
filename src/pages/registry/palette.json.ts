import type { APIRoute } from "astro";
import { listPaletteItems } from "@/lib/paletteData";

/**
 * 命令面板条目索引端点(静态构建期生成,perf-html-palette-props):
 * 与旧方案(Base.astro 经岛屿 props 内联进全站每页 ~65KB)同一数据源
 * lib/paletteData.listPaletteItems(),字节内容同构;区别是这里只在
 * CommandPalette 首次唤起时被 fetch 一次(浏览器缓存),399 个 HTML
 * 每页减掉这份 props JSON。「复制复刻 Prompt」链路不经此数据,不受影响。
 */
export const GET: APIRoute = async () => {
  const items = await listPaletteItems();
  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
