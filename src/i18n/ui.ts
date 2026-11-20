import type { Locale } from "@/lib/types";

/** 站点 UI 文案字典(条目正文在 MDX 里,不在这里) */
export const ui = {
  zh: {
    siteName: "UI/UX 设计全解图集",
    siteTagline: "可交互实例 · 代码拆解 · 参数实时调节 · 一键复刻 Prompt",
    nav: { home: "首页", atlas: "图集" },
    home: {
      heroTitle: "现代前端 UI/UX 设计全解",
      heroSub:
        "每个设计条目配可交互实例、代码拆解、参数实时调节面板,并一键把参数快照浓缩成供 AI agent 一比一复刻的结构化 prompt。",
      browse: "按分类浏览",
      featured: "精选条目",
      entriesCount: "条",
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
      categories: { styles: "风格流派", materials: "材质与光影", motion: "动效与微交互", color: "色彩与主题", type: "排版", layout: "布局与响应式" },
    },
    footer: {
      note: "demo 代码 MIT · 正文 CC BY-NC 4.0 · 数值均注明一手来源",
    },
    langSwitch: "English",
  },
  en: {
    siteName: "UI/UX Design Atlas",
    siteTagline: "Interactive examples · Code breakdown · Live parameter tuning · One-click replication prompt",
    nav: { home: "Home", atlas: "Atlas" },
    home: {
      heroTitle: "Modern Frontend UI/UX, Fully Explained",
      heroSub:
        "Every entry ships an interactive example, a code breakdown, a live parameter panel — and a one-click structured prompt that any AI agent can replicate one-to-one.",
      browse: "Browse by category",
      featured: "Featured entries",
      entriesCount: "entries",
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
      categories: { styles: "Styles", materials: "Materials", motion: "Motion", color: "Color", type: "Typography", layout: "Layout" },
    },
    footer: {
      note: "Demo code MIT · Text CC BY-NC 4.0 · Every value cites a first-party source",
    },
    langSwitch: "中文",
  },
} as const;

export type UiDict = (typeof ui)["zh"];

export function t(locale: Locale): UiDict {
  return ui[locale] as UiDict;
}
