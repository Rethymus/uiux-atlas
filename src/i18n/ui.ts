import type { Locale } from "@/lib/types";

/** 站点 UI 文案字典(条目正文在 MDX 里,不在这里) */
export const ui = {
  zh: {
    siteName: "UI/UX 设计全解图集",
    siteTagline: "可交互实例 · 代码拆解 · 参数实时调节 · 一键复刻 Prompt",
    nav: { home: "首页", atlas: "图集", resources: "资源", skip: "跳到主内容" },
    home: {
      heroTitle: "现代前端 UI/UX 设计全解",
      heroSub:
        "每个设计条目配可交互实例、代码拆解、参数实时调节面板,并一键把参数快照浓缩成供 AI agent 一比一复刻的结构化 prompt。",
      browse: "按分类浏览",
      featured: "精选条目",
      entriesCount: "条",
      stats: { entries: "条目", categories: "分类", tunable: "全参数化" },
      openEntry: "进入条目 →",
    },
    list: {
      filterSystem: "来源体系",
      filterStar: "参数化程度",
      all: "全部",
      star3: "★★★ 全参数化",
      star2: "★★ 部分参数化",
      star1: "★ 演示为主",
      empty: "没有符合筛选条件的条目。",
      backHome: "返回首页",
    },
    entry: {
      demo: "实例演示",
      params: "参数",
      resetAll: "复位官方默认",
      copyPrompt: "复制复刻 Prompt",
      copied: "已复制 ✓",
      viewPrompt: "查看 Prompt",
      shareLink: "分享参数链接",
      openV0: "在 v0 打开",
      openV0Hint: "在 v0 打开复刻 Prompt(新窗口打开,自动预填) · Open replication prompt in v0 (new tab, prefilled)",
      breakdown: "代码拆解",
      scenarios: "适用场景",
      avoid: "何时不要用",
      a11y: "无障碍",
      sources: "来源",
      support: "浏览器支持",
      fallback: "兼容回退",
      origin: "起源",
      aliases: "别名",
      officialDefault: "官方默认",
      paramEffectHint: "改动即时生效",
      categories: { styles: "风格流派", materials: "材质与光影", motion: "动效与微交互", color: "色彩与主题", type: "排版", layout: "布局与响应式", components: "前端部件", icons: "图标体系", dataviz: "数据可视化", principles: "交互法则" },
      subgroups: { basic: "基础", form: "表单", feedback: "反馈", data: "数据", navigation: "导航", other: "其他" },
    },
    footer: {
      note: "demo 代码 MIT · 正文 CC BY-NC 4.0 · 数值均注明一手来源",
    },
    resources: {
      title: "深入学习的资源地图",
      intro:
        "扫盲只是开始——把本站条目学透之后,这里是下一站:官方规范、组件库、交互工具、灵感画廊与深学文档,每条写明「什么时候该用它」。全部外链在新窗口打开。",
      countLabel: "条资源",
      groups: {
        spec: { name: "官方设计规范" },
        lib: { name: "组件库" },
        tool: { name: "交互与动效工具" },
        gallery: { name: "灵感画廊" },
        docs: { name: "深学文档" },
      },
      goDeeper: "继续深入",
      goDeeperHint: "该体系的官方入口与上手工具",
      more: "全部资源 →",
      homeEntry: "授人以渔:规范 · 组件库 · 工具 · 画廊 →",
    },
    trends: {
      title: "设计趋势追踪",
      intro:
        "从 2023–2026 年度趋势报告与一手生成统计中提炼的 10 条方向信号:哪些风格正在兴起,哪些正在退潮。每条注明统计口径与调研出处,并互链到站内常青条目。",
      countLabel: "条趋势",
      /** 页头固定声明:趋势是时点快照,刷新方式与口径在数据文件里 */
      snapshotNote:
        "趋势 = 时点快照(2026-11-20 调研),非实时数据;刷新脚本与统计口径见数据文件 src/data/trends.ts。",
      rising: "正在兴起",
      cooling: "正在退潮",
      badgeRising: "兴起",
      badgeCooling: "退潮",
      relatedLabel: "站内条目",
      noteLabel: "口径",
      sourceLabel: "出处",
      homeEntry: "趋势追踪 →",
      resourcesEntry: "趋势追踪:兴起与退潮 →",
    },
    langSwitch: "English",
  },
  en: {
    siteName: "UI/UX Design Atlas",
    siteTagline: "Interactive examples · Code breakdown · Live parameter tuning · One-click replication prompt",
    nav: { home: "Home", atlas: "Atlas", resources: "Resources", skip: "Skip to content" },
    home: {
      heroTitle: "Modern Frontend UI/UX, Fully Explained",
      heroSub:
        "Every entry ships an interactive example, a code breakdown, a live parameter panel — and a one-click structured prompt that any AI agent can replicate one-to-one.",
      browse: "Browse by category",
      featured: "Featured entries",
      entriesCount: "entries",
      stats: { entries: "Entries", categories: "Categories", tunable: "Fully tunable" },
      openEntry: "Open entry →",
    },
    list: {
      filterSystem: "Source system",
      filterStar: "Parameterization",
      all: "All",
      star3: "★★★ Fully tunable",
      star2: "★★ Partially tunable",
      star1: "★ Demo-first",
      empty: "No entries match the current filters.",
      backHome: "Back home",
    },
    entry: {
      demo: "Live demo",
      params: "Parameters",
      resetAll: "Reset to official defaults",
      copyPrompt: "Copy replication prompt",
      copied: "Copied ✓",
      viewPrompt: "View prompt",
      shareLink: "Share parameter link",
      openV0: "Open in v0",
      openV0Hint: "Open the replication prompt in v0 (new tab, prefilled) · 在 v0 打开复刻 Prompt(新窗口打开,自动预填)",
      breakdown: "Code breakdown",
      scenarios: "When to use",
      avoid: "When not to use",
      a11y: "Accessibility",
      sources: "Sources",
      support: "Browser support",
      fallback: "Fallback",
      origin: "Origin",
      aliases: "Aliases",
      officialDefault: "official default",
      paramEffectHint: "changes apply instantly",
      categories: { styles: "Styles", materials: "Materials", motion: "Motion", color: "Color", type: "Typography", layout: "Layout", components: "Components", icons: "Icons", dataviz: "Data Viz", principles: "Principles" },
      subgroups: { basic: "Basic", form: "Form", feedback: "Feedback", data: "Data", navigation: "Navigation", other: "Other" },
    },
    footer: {
      note: "Demo code MIT · Text CC BY-NC 4.0 · Every value cites a first-party source",
    },
    resources: {
      title: "A map for going deeper",
      intro:
        "The primer is only the start — once you have finished an entry, these are the next stops: official specs, component libraries, interaction tools, inspiration galleries and deep-dive docs, each saying when to use it. All links open in a new window.",
      countLabel: "resources",
      groups: {
        spec: { name: "Official design specs" },
        lib: { name: "Component libraries" },
        tool: { name: "Interaction and motion tools" },
        gallery: { name: "Inspiration galleries" },
        docs: { name: "Deep-dive docs" },
      },
      goDeeper: "Go deeper",
      goDeeperHint: "Official entry points and hands-on tools for this system",
      more: "All resources →",
      homeEntry: "Go beyond: specs · libraries · tools · galleries →",
    },
    trends: {
      title: "Design trend tracker",
      intro:
        "Ten directional signals distilled from 2023–2026 annual trend reports and first-party generation stats: which styles are rising, which are cooling. Every trend carries its stat basis and research source, cross-linked to evergreen entries on this site.",
      countLabel: "trends",
      /** Page-head standing notice: trends are point-in-time snapshots; refresh method and definitions live in the data file */
      snapshotNote:
        "Trends are point-in-time snapshots (research dated 2026-11-20), not live data; the refresh recipe and stat definitions live in src/data/trends.ts.",
      rising: "Rising",
      cooling: "Cooling",
      badgeRising: "Rising",
      badgeCooling: "Cooling",
      relatedLabel: "On this site",
      noteLabel: "Basis",
      sourceLabel: "Source",
      homeEntry: "Design trends →",
      resourcesEntry: "Trend tracker: rising & cooling →",
    },
    langSwitch: "中文",
  },
} as const;

export type UiDict = (typeof ui)["zh"];

export function t(locale: Locale): UiDict {
  return ui[locale] as UiDict;
}
