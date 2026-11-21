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
      categories: { styles: "风格流派", materials: "材质与光影", motion: "动效与微交互", color: "色彩与主题", type: "排版", layout: "布局与响应式", components: "前端部件" },
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
      categories: { styles: "Styles", materials: "Materials", motion: "Motion", color: "Color", type: "Typography", layout: "Layout", components: "Components" },
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
    langSwitch: "中文",
  },
} as const;

export type UiDict = (typeof ui)["zh"];

export function t(locale: Locale): UiDict {
  return ui[locale] as UiDict;
}
