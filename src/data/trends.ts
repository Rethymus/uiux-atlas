/**
 * 「趋势追踪」页数据 —— 2023–2026 设计趋势的时点快照(蓝图 V2)。
 * 数据纪律:全部提炼自 out/research/03-visual-style-trends.md §二(2023–2026 兴起/退潮),
 * 逐条在 source 字段注明 research 出处;份额类数据强制在 note 注明口径
 * (superdesign.dev 的份额 = 该单一 AI 设计工具 20.8 万次真实生成中的「请求份额」,
 * 反映的是「开发者向 AI 索要的风格」而非全市场采用率 —— 03 §四-3 口径提示)。
 *
 * 这是时点快照(调研日期 2026-11-20),不是实时数据:
 * 刷新做法 = 重跑 03 号调研的联网检索流程后替换本文件数值;
 * 统计口径与来源原文均以 out/research/03-visual-style-trends.md 为准。
 *
 * 已评估未收录(如实说明):
 * - 「极繁的持续」(Adobe 2026 预测):站内无 Maximalism 条目,relatedEntries 无可互链对象;
 * - 「暗色模式默认化降级为用户开关」(Fuselab 2026):单源转述 NN/g,03 原文未直接核对,证据链弱于其余条目。
 *
 * relatedEntries 纪律:slug 形如 "category/slug",必须与 src/content/entries 真实目录一致
 * (写死前已逐条核对存在;趋势页构建期还会再做一次守卫校验,见 src/pages/trends.astro)。
 */

/** 趋势方向:rising = 兴起,cooling = 退潮(与 03 §2.2 的 rising/fading 分组一致) */
export type TrendDirection = "rising" | "cooling";

export interface Trend {
  /** 稳定 id(kebab-case;锚点与核验脚本引用) */
  id: string;
  direction: TrendDirection;
  title: { zh: string; en: string };
  /** 一句话摘要(含具体数字或报告结论) */
  summary: { zh: string; en: string };
  /** 口径标注:份额类数据强制注明「单一 AI 工具请求份额,非市场采用率」 */
  note: { zh: string; en: string };
  /** research 出处:out/research/03-visual-style-trends.md 的具体小节 + 一手来源 */
  source: string;
  /** 站内常青条目 slug("category/slug",渲染为站内互链) */
  relatedEntries: string[];
}

/** 兴起在前、退潮在后;组内按 03 §2.2 原文顺序 */
export const TRENDS: Trend[] = [
  /* ── 兴起(rising)── */
  {
    id: "glass-materials-rise",
    direction: "rising",
    title: { zh: "玻璃系材质持续升温", en: "Glass materials keep climbing" },
    summary: {
      zh: "superdesign 生成占比由 2026 年 1 月 7.5% 升至 5 月 9.9%(7,866 个项目),为第二受欢迎风格;Apple Liquid Glass 还带动了「liquid glass vs glassmorphism」的真实搜索需求。",
      en: "Superdesign generation share climbed from 7.5% (Jan 2026) to 9.9% (May, 7,866 projects) — the second most requested style; Apple's Liquid Glass also fuels real \"liquid glass vs glassmorphism\" search demand.",
    },
    note: {
      zh: "份额口径:superdesign.dev 单一 AI 设计工具的请求份额(20.8 万次生成统计),非全市场采用率。",
      en: "Share basis: request share within one AI design tool (superdesign.dev, 208k generations), not market adoption.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「兴起」第 1 条 · superdesign.dev/styles/glassmorphism",
    relatedEntries: ["styles/glassmorphism", "materials/backdrop-filter", "materials/liquid-glass"],
  },
  {
    id: "type-structure-identity",
    direction: "rising",
    title: { zh: "字体与结构承载识别", en: "Type and structure carry identity" },
    summary: {
      zh: "daisyUI 2026 第二主轴:「清晰的网格与强烈的排版声音可以取代层层装饰 UI」——Editorial、Type-First、Data-Dense Utilitarian、Neubrutalism 同轴并进。",
      en: "daisyUI's 2026 second axis: \"a clear grid and a strong typographic voice can replace layers of decorative UI\" — Editorial, Type-First, Data-Dense Utilitarian and Neubrutalism advance together.",
    },
    note: {
      zh: "口径:年度趋势报告共识(daisyUI 2026),非份额统计。",
      en: "Basis: year-report consensus (daisyUI 2026), not a share statistic.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「兴起」第 2 条 · trends.daisyui.com/ui-design-trends-2026/",
    relatedEntries: ["styles/neo-brutalism", "type/fluid-type-scale", "type/variable-fonts"],
  },
  {
    id: "anti-ai-crafting",
    direction: "rising",
    title: { zh: "反 AI 抛光的「手工感」", en: "Anti-AI crafting fights the hyper-slick" },
    summary: {
      zh: "Hand-Drawn、Scrapbook、拼贴与明显手工痕迹升温;Creative Bloq 称 2026 的定义性趋势为 Anti-AI Crafting——「人的手作是 AI 高滑顺视觉语言的反噬」(Landor 全球 ECD)。",
      en: "Hand-drawn, scrapbook, collage and visible craft marks are rising; Creative Bloq names Anti-AI Crafting the defining 2026 trend — \"human-driven craft as the antidote to AI's hyper-slick visual language\" (Landor global ECD).",
    },
    note: {
      zh: "口径:趋势报道与专家访谈(Creative Bloq / Landor),无份额统计。",
      en: "Basis: trend reporting and expert interviews (Creative Bloq / Landor), no share statistics.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「兴起」第 3 条 · creativebloq.com 2026 图形设计趋势",
    relatedEntries: ["materials/grain-gradient", "styles/claymorphism"],
  },
  {
    id: "neo-skeuomorph-materials",
    direction: "rising",
    title: { zh: "拟物新材质家族回潮", en: "A new skeuomorphic material family" },
    summary: {
      zh: "Skeuomorphism 以新分支回归:历史手稿、实木、发光生态、Y2K 科技拟物四类,并外溢到 Chrome/液态金属与 Spatial UI(visionOS 语感渗入 2D 产品屏)。",
      en: "Skeuomorphism returns as new branches — manuscript, wood, glowing biophilic and Y2K tech — spilling into chrome/liquid metal and Spatial UI (visionOS language leaking into 2D product screens).",
    },
    note: {
      zh: "口径:年度趋势报告共识(daisyUI 2026),非份额统计;回潮的是「新材质家族」,与软拟物 Neumorphism 的退潮并不矛盾。",
      en: "Basis: year-report consensus (daisyUI 2026), not a share statistic; what returns is a new material family — distinct from the cooling of soft-UI Neumorphism.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「兴起」第 4 条 · trends.daisyui.com/ui-design-trends-2026/",
    relatedEntries: ["styles/claymorphism", "styles/neumorphism"],
  },
  {
    id: "claymorphism-niche-rise",
    direction: "rising",
    title: { zh: "Claymorphism 利基微增", en: "Claymorphism nudges up in its niche" },
    summary: {
      zh: "生成占比由 2026 年 1 月 0.03% 升至 5 月 0.08%,收敛在儿童产品、教育科技与插画型落地页——从 2022 年的热点沉淀为利基。",
      en: "Generation share edged up from 0.03% (Jan 2026) to 0.08% (May), settling into children's products, edtech and illustrated landing pages — a 2022 hotspot matured into a niche.",
    },
    note: {
      zh: "份额口径:superdesign.dev 单一 AI 设计工具的请求份额(20.8 万次生成统计),非全市场采用率;绝对值极小,仅作方向性参考。",
      en: "Share basis: request share within one AI design tool (superdesign.dev, 208k generations), not market adoption; tiny absolute values, directional only.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「兴起」第 6 条 · superdesign.dev/styles/claymorphism",
    relatedEntries: ["styles/claymorphism"],
  },

  /* ── 退潮(cooling)── */
  {
    id: "style-brutalism-past-peak",
    direction: "cooling",
    title: { zh: "风格型粗野主义过峰", en: "Stylistic brutalism is past its peak" },
    summary: {
      zh: "2026 年 3 月达 3.6% 峰值后回落(5 月 3.3%、6 月 2.37%);Craigslist/HN 式「功能型粗野主义」常青,刻意做旧的风格型容易过时。",
      en: "After peaking at 3.6% in Mar 2026 it fell back (3.3% in May, 2.37% in June); functional brutalism (Craigslist/HN) stays evergreen, while deliberately styled brutalism dates fast.",
    },
    note: {
      zh: "份额口径:superdesign.dev 单一 AI 设计工具的请求份额,非全市场采用率;站内收录的是其商用分支 Neo-Brutalism,不是风格型粗野主义本体。",
      en: "Share basis: request share within one AI design tool (superdesign.dev), not market adoption; this site indexes the commercial branch Neo-Brutalism, not stylistic brutalism itself.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「退潮」第 1 条 · superdesign.dev/styles/brutalism",
    relatedEntries: ["styles/neo-brutalism"],
  },
  {
    id: "neumorphism-near-zero",
    direction: "cooling",
    title: { zh: "Neumorphism 趋零", en: "Neumorphism fades toward zero" },
    summary: {
      zh: "生成占比 0.69%→0.41%,约为玻璃系的 1/20;典型边缘对比仅约 1.4:1,无法在保留柔和质感的前提下满足 WCAG 的 3:1——可访问性是硬伤,不是口味问题。",
      en: "Share fell 0.69%→0.41%, about 1/20 of glass; typical edge contrast is ~1.4:1 and cannot meet WCAG's 3:1 while keeping the soft look — accessibility is the hard blocker, not taste.",
    },
    note: {
      zh: "份额口径:superdesign.dev 单一 AI 设计工具的请求份额,非全市场采用率。",
      en: "Share basis: request share within one AI design tool (superdesign.dev), not market adoption.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「退潮」第 2 条 · superdesign.dev/styles/neumorphism",
    relatedEntries: ["styles/neumorphism"],
  },
  {
    id: "bento-grid-maturing",
    direction: "cooling",
    title: { zh: "Bento Grid 从时尚到惯例", en: "Bento grids mature into convention" },
    summary: {
      zh: "全年徘徊 1–1.6%(1 月 1.6% 缓降至 5 月 1.3%),不再「新酷」——从时尚退为标准布局惯例;「格子大小编码信息优先级」的用法仍然成立。",
      en: "Hovering at 1–1.6% all year (1.6% in Jan easing to 1.3% in May), bento is no longer a novelty signal — it cooled from fashion into a standard layout convention; cell-size-as-priority still holds.",
    },
    note: {
      zh: "份额口径:superdesign.dev 单一 AI 设计工具的请求份额,非全市场采用率;「缓降」是成熟(enlighten 称 Maturing Pattern)而非退场。",
      en: "Share basis: request share within one AI design tool (superdesign.dev), not market adoption; the slow decline is maturation (enlighten: \"Maturing Pattern\"), not exit.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「退潮」第 3 条 · superdesign.dev/styles/bento-grid;design-styles.enlighten-media.net/pages/bento-ui/",
    relatedEntries: ["styles/bento-grid", "dataviz/dataviz-dashboard-density"],
  },
  {
    id: "liquid-glass-fullscreen-pushback",
    direction: "cooling",
    title: { zh: "Liquid Glass 全屏化被权威否定", en: "Full-screen Liquid Glass gets pushed back" },
    summary: {
      zh: "NN/g 判「Apple 的错误别学」(可读性下降、点击目标变小);Apple HIG 亦称勿在内容层使用,并在 iOS 27 回调默认透明度——玻璃要用,但收进导航与控制层。",
      en: "NN/g rules \"don't copy Apple's mistake\" (worse readability, smaller tap targets); Apple HIG keeps it off the content layer, and iOS 27 walks back default transparency — use glass, but confine it to nav and controls.",
    },
    note: {
      zh: "口径:权威评测与官方规范动向(NN/g / Apple),非份额统计;与「玻璃系升温」不矛盾——升温的是克制用法。",
      en: "Basis: authoritative review and official-spec moves (NN/g / Apple), not a share statistic; not contradicted by rising glass — what rises is restrained usage.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「退潮」第 4 条 · nngroup.com/articles/liquid-glass;en.wikipedia.org/wiki/Liquid_Glass",
    relatedEntries: ["materials/liquid-glass", "styles/glassmorphism"],
  },
  {
    id: "minimalism-to-bold-minimalism",
    direction: "cooling",
    title: { zh: "纯粹极简让位 Bold Minimalism", en: "Pure minimalism yields to bold minimalism" },
    summary: {
      zh: "强对比、自信排版的极简成为新方向(Digital Synopsis 2026 第 13 条);极简本身仍是基线——superdesign 全年占 9–12%、请求量第一。退的是「无个性的极简」,不是极简。",
      en: "Minimalism with strong contrast and confident typography is the new direction (Digital Synopsis 2026, item 13); minimalism itself remains the baseline — 9–12% of superdesign requests all year, #1. What cools is characterless minimalism, not minimalism.",
    },
    note: {
      zh: "份额口径:superdesign.dev 单一 AI 设计工具的请求份额(20.8 万次生成统计),非全市场采用率;「让位」判断来自 Digital Synopsis 2026,两者口径不同、并列呈现。",
      en: "Share basis: request share within one AI design tool (superdesign.dev, 208k generations), not market adoption; the \"yielding\" verdict comes from Digital Synopsis 2026 — two different bases, shown side by side.",
    },
    source: "out/research/03-visual-style-trends.md §2.2「退潮」第 5 条 · superdesign.dev/styles/minimalist-web-design;digitalsynopsis.com 2026 趋势",
    relatedEntries: ["styles/minimalism", "type/fluid-type-scale"],
  },
];

/** 趋势条数(页头 mono 计数用) */
export const TREND_COUNT = TRENDS.length;
