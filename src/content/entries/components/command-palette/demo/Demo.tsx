import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";
import { PalettePanel, type PaletteItem } from "@/components/CommandPalette";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * 命令面板演示:直接复用站点全站面板组件本体(PalettePanel,与
 * src/components/CommandPalette.tsx 同源导出)——吃自己的狗粮。
 * 三个 JS 型参数由参数面板驱动:matchMode 切匹配算法、maxResults 裁剪
 * 结果数、hotkeyDisplay 切 kbd 徽标文案。面板以 inline 变体内嵌在舞台里
 * (静态展示、无浮层/无滚动锁定),Enter 只记录选中不跳页,便于交互验证。
 * 数据集 = 本站 12 个真实条目的索引缩影(与全站面板同构的 PaletteItem)。
 */

/* 本站条目索引缩影(字段与构建时注入的全站数据一致:slug/name/nameZh/
   aliases/category/star);slug 按源码目录真实拼写,可对照站内条目页。 */
const SAMPLE_ITEMS: PaletteItem[] = [
  { slug: "styles/glassmorphism", name: "Glassmorphism", nameZh: "玻璃拟态", aliases: ["毛玻璃", "Frosted Glass"], category: "styles", star: 3 },
  { slug: "styles/neo-brutalism", name: "Neo-Brutalism", nameZh: "新粗野主义", aliases: ["Neubrutalism"], category: "styles", star: 2 },
  { slug: "materials/backdrop-filter", name: "Backdrop Filter", nameZh: "背景滤镜", aliases: ["毛玻璃滤镜", "blur"], category: "materials", star: 3 },
  { slug: "motion/motion-spring", name: "Spring Motion", nameZh: "弹簧动效", aliases: ["spring", "弹性动画"], category: "motion", star: 3 },
  { slug: "motion/view-transitions", name: "View Transitions", nameZh: "视图过渡", aliases: ["VT", "页面转场"], category: "motion", star: 2 },
  { slug: "color/oklch-workflow", name: "OKLCH Workflow", nameZh: "OKLCH 工作流", aliases: ["色彩空间", "perceptual color"], category: "color", star: 3 },
  { slug: "type/fluid-type-scale", name: "Fluid Type Scale", nameZh: "流式字阶", aliases: ["clamp", "响应式字号"], category: "type", star: 2 },
  { slug: "layout/container-queries", name: "Container Queries", nameZh: "容器查询", aliases: ["cqw", "组件级响应式"], category: "layout", star: 3 },
  { slug: "components/button", name: "Button", nameZh: "按钮", aliases: ["按钮组", "CTA"], category: "components", star: 3 },
  { slug: "components/command-palette", name: "Command Palette", nameZh: "命令面板", aliases: ["Ctrl+K", "Cmd+K", "Quick Switcher"], category: "components", star: 3 },
  { slug: "icons/icon-sprite-symbols", name: "SVG Sprite Symbols", nameZh: "雪碧图与 symbol", aliases: ["sprite", "use 复用"], category: "icons", star: 2 },
  { slug: "dataviz/dataviz-categorical-palette", name: "Categorical Palette", nameZh: "分类色板", aliases: ["分类配色", "categorical color"], category: "dataviz", star: 2 },
];

const css = `
.cp-scene { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 18px; width: 100%; }
.cp-status {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  min-height: 1.2em;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cp-status strong { color: var(--accent); font-weight: 600; }
`;

/**
 * 命令面板演示:inline 复用 PalettePanel 本体;locale 从文档语言读取
 * (demo 岛屿只挂载在客户端,document 恒可用),与所在站点页面语言一致。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [matchMode, setMatchMode] = useState(() => store.get("matchMode") as string);
  const [maxResults, setMaxResults] = useState(() => store.get("maxResults") as number);
  const [hotkeyDisplay, setHotkeyDisplay] = useState(() => store.get("hotkeyDisplay") as string);
  const [picked, setPicked] = useState<PaletteItem | null>(null);
  const [locale, setLocale] = useState<"zh" | "en">("zh");

  useEffect(
    () =>
      store.subscribe(() => {
        setMatchMode(store.get("matchMode") as string);
        setMaxResults(store.get("maxResults") as number);
        setHotkeyDisplay(store.get("hotkeyDisplay") as string);
      }),
    [store],
  );

  useEffect(() => {
    setLocale(document.documentElement.lang.startsWith("zh") ? "zh" : "en");
  }, []);

  // hotkeyDisplay 参数 → kbd 徽标文案(展示档;实际监听两者都收,见 schema effect 说明)
  const hotkeyLabel = hotkeyDisplay === "cmd-k" ? "⌘K" : "Ctrl K";
  const zh = locale === "zh";

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <style>{css}</style>
      <div className="cp-scene">
        <PalettePanel
          idPrefix="cp-demo"
          items={SAMPLE_ITEMS}
          locale={locale}
          matchMode={matchMode === "prefix" ? "prefix" : "subsequence"}
          maxResults={maxResults}
          hotkeyLabel={hotkeyLabel}
          variant="inline"
          onSelect={setPicked}
        />
        <p className="cp-status" aria-live="polite">
          {picked
            ? zh
              ? (<><strong>{picked.nameZh ?? picked.name}</strong> 已选中(生产实现按 Enter 跳转 {picked.slug})</>)
              : (<><strong>{picked.name}</strong> selected (production Enter-jumps to {picked.slug})</>)
            : zh
              ? "试试输入 gsm(子序列)/ glass(前缀)——本 demo 即全站面板组件本体"
              : "Try gsm (subsequence) / glass (prefix) — this demo is the site-wide palette component itself"}
        </p>
      </div>
    </DemoStage>
  );
}
