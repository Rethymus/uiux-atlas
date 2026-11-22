/**
 * 「授人以渔」资源数据 —— 扫盲之后的下一站。
 * 数据纪律:全部取自已有调研的一手来源,逐条带真实 URL,不编造资源。
 * 来源:out/design-study/01-apple.md、02-tdesign.md、03-bytedance.md、
 * 04-galleries-trends.md、05-reusable-code.md 与 out/research/08-open-source-repos.md
 * (另辅以 out/research/02/03/04/05/06/07 号调研里出现过的官方 URL,见各条目内注)。
 * 许可注记:react-bits / Magic UI 的许可为 05 §0 实核(LICENSE.md / GitHub API);
 * 其余库调研未实核许可,如实写「以仓库 LICENSE 为准」,不代填。
 */
import type { CategoryId, SystemId } from "@/lib/types";

/** 资源分组 id(与 src/i18n/ui.ts 的 resources.groups 键一一对应) */
export type ResourceGroupId = "spec" | "lib" | "tool" | "gallery" | "docs";

export interface Resource {
  name: string;
  url: string;
  desc: { zh: string; en: string };
  group: ResourceGroupId;
  tags?: string[];
}

/** 五组顺序即页面呈现顺序 */
export const RESOURCE_GROUPS: ResourceGroupId[] = ["spec", "lib", "tool", "gallery", "docs"];

export const RESOURCES: Resource[] = [
  /* ── a) 官方设计规范 ── */
  {
    name: "Apple HIG",
    url: "https://developer.apple.com/design/human-interface-guidelines/",
    desc: {
      zh: "想给产品定底层原则时先读它:层次、渐进披露、可中断动效、暗色 base/elevated 分层都有官方原文。",
      en: "Read it first for ground rules: hierarchy, progressive disclosure, cancellable motion and dark-mode base/elevated layering, all in official wording.",
    },
    group: "spec",
    tags: ["iOS / macOS"],
  },
  {
    name: "Material 3",
    url: "https://m3.material.io",
    desc: {
      zh: "需要把动效与色彩 token 化时查官方规格:缓动×时长配对表、state layer、HCT 动态色都给到具体值。",
      en: "The official spec when tokenizing motion and color: easing×duration pairing tables, state layers and HCT dynamic color with concrete values.",
    },
    group: "spec",
    tags: ["Android", "Token"],
  },
  {
    name: "Fluent 2",
    url: "https://fluent2.microsoft.design",
    desc: {
      zh: "做 Windows 桌面观感与 acrylic/mica 材质时对照;动效与材质档位的官方页面(mica/acrylic 细则见 WinUI 文档)。",
      en: "The reference for Windows desktop look and acrylic/mica materials; motion and material tiers live here, with mica/acrylic details in the WinUI docs.",
    },
    group: "spec",
    tags: ["Windows", "Acrylic / Mica"],
  },
  {
    name: "TDesign",
    url: "https://tdesign.tencent.com",
    desc: {
      zh: "「token 即文档」的中文企业级范例:行高常数公式、时长双端公式、组件像素规格全部一手公开。",
      en: "A Chinese enterprise-grade example of tokens-as-documentation: line-height and duration formulas plus pixel-level component specs, all public.",
    },
    group: "spec",
    tags: ["中文", "企业级"],
  },
  {
    name: "Arco Design",
    url: "https://arco.design",
    desc: {
      zh: "查亮暗双主题 token 映射与暗色白透明度文字阶梯(90/70/50/30%)的成熟实践时用它。",
      en: "Use it to study mature light/dark token mapping and the dark-mode white-opacity text ladder (90/70/50/30%).",
    },
    group: "spec",
    tags: ["中文", "双主题"],
  },
  {
    name: "Semi Design",
    url: "https://semi.design",
    desc: {
      zh: "3000+ token 加「动效默认 0ms」的无障碍架构出自这里;做主题变装(DSM)前值得通读。",
      en: "Home of 3000+ tokens and the motion-tokens-default-to-0ms accessibility architecture; worth a full read before building themable design systems.",
    },
    group: "spec",
    tags: ["中文", "DSM"],
  },
  {
    name: "IBM Carbon",
    url: "https://carbondesignsystem.com",
    desc: {
      zh: "组件用法纪律的最佳教科书:按钮层级、数据表三态、空状态三类,每条都讲「为什么」。",
      en: "The best textbook for component usage discipline: button hierarchy, data-table states and three kinds of empty states, each with its rationale.",
    },
    group: "spec",
  },
  {
    name: "Shopify Polaris",
    url: "https://polaris.shopify.com",
    desc: {
      zh: "电商与商家工具类界面的规范参照;组件级文档已迁移,以站内通用参考页为准(调研未能取得组件一手内容)。",
      en: "The reference for e-commerce and merchant-tool interfaces; component docs have migrated to generic reference pages (research could not verify component-level specs).",
    },
    group: "spec",
    tags: ["电商"],
  },

  /* ── b) 组件库 ── */
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    desc: {
      zh: "复制粘贴式组件 + 语义 token 约定;想「拥有」组件代码而不是装依赖时首选,registry 还能直接喂给 agent。",
      en: "Copy-paste components with a semantic token convention — the pick when you want to own the code, with a registry agents can consume directly.",
    },
    group: "lib",
    tags: ["React", "许可:以仓库 LICENSE 为准"],
  },
  {
    name: "Radix UI",
    url: "https://www.radix-ui.com/primitives",
    desc: {
      zh: "无障碍原语的事实标准;自定义 Dialog/Combobox/Tabs 的键盘交互与 ARIA 属性照它的文档抄最稳。",
      en: "The de-facto standard for accessible primitives; copy its keyboard interactions and ARIA attributes when building Dialog/Combobox/Tabs yourself.",
    },
    group: "lib",
    tags: ["Headless", "许可:以仓库 LICENSE 为准"],
  },
  {
    name: "Ant Design",
    url: "https://ant.design",
    desc: {
      zh: "中后台场景的全家桶;动效原则(Natural/Performant)与 seed token 文档化程度高,适合对照着定规范。",
      en: "The full toolkit for admin dashboards; motion principles (Natural/Performant) and seed tokens are well documented — good for calibrating your own spec.",
    },
    group: "lib",
    tags: ["React", "中文", "许可:以仓库 LICENSE 为准"],
  },
  {
    name: "MUI",
    url: "https://mui.com",
    desc: {
      zh: "Material 风格 React 组件;按钮 text/contained/outlined 三档强调与 Snackbar 通知规格可直接对照。",
      en: "Material-style React components; the text/contained/outlined button tiers and Snackbar notification specs translate directly into your own spec.",
    },
    group: "lib",
    tags: ["React", "Material", "许可:以仓库 LICENSE 为准"],
  },
  {
    name: "react-bits",
    url: "https://reactbits.dev",
    desc: {
      zh: "动效/交互组件集(demo+源码+文档,人与 agent 通吃);抄实现思想时逐段核对它的 RM 与性能红线。",
      en: "Animated/interactive component collection (demo + source + docs, for humans and agents); check its RM and performance rules paragraph by paragraph before porting ideas.",
    },
    group: "lib",
    tags: ["MIT + Commons Clause"],
  },
  {
    name: "Magic UI",
    url: "https://magicui.design",
    desc: {
      zh: "Design Engineer 风格动效组件(Border Beam、Spotlight 等),shadcn registry 一条命令直装。",
      en: "Design-engineer-flavored motion components (Border Beam, Spotlight and more), installable via the shadcn registry in one command.",
    },
    group: "lib",
    tags: ["MIT", "shadcn registry"],
  },

  /* ── c) 交互与动效工具 ── */
  {
    name: "cubic-bezier.com",
    url: "https://cubic-bezier.com/",
    desc: {
      zh: "拖控制点手调贝塞尔曲线,并能与内置缓动并排对比;为本站选 --ease-* 就是在这里找的手感。",
      en: "Drag the control points to hand-tune a bezier and compare it side-by-side with built-in easings — how this site's --ease-* tokens were feel-tested.",
    },
    group: "tool",
  },
  {
    name: "easings.net",
    url: "https://easings.net/",
    desc: {
      zh: "只知道想要的运动性格(回弹/减速/过冲)却写不出曲线时,来这查 30+ 缓动预设与可交互演示。",
      en: "When you know the motion personality you want (bounce, decelerate, overshoot) but not the curve: 30+ easing presets with interactive demos.",
    },
    group: "tool",
  },
  {
    name: "linear() 缓动生成器",
    url: "https://linear-easing-generator.netlify.app/",
    desc: {
      zh: "cubic-bezier 表达不了的弹簧/回弹,用它采样成现代 CSS linear() 直接输出(仓库:Jake Archibald)。",
      en: "For springs and bounces cubic-bezier can't express: sample them into modern CSS linear() output (repo by Jake Archibald).",
    },
    group: "tool",
    tags: ["CSS linear()"],
  },
  {
    name: "oklch.com",
    url: "https://oklch.com/",
    desc: {
      zh: "把 HEX 换成感知均匀的 OKLCH,顺带检查 P3 宽色域与 sRGB 降级色;定语义色阶前先来这里。",
      en: "Convert HEX to perceptually uniform OKLCH while checking P3 wide-gamut and sRGB fallbacks — visit before defining any semantic scale.",
    },
    group: "tool",
  },
  {
    name: "Utopia",
    url: "https://utopia.fyi/type/calculator/",
    desc: {
      zh: "生成 clamp 流式字阶与间距刻度(本站 --step-* 用的就是 Utopia 法);配套 /space/calculator/ 管间距。",
      en: "Generates fluid clamp type and space scales — this site's --step-* tokens follow the Utopia method; the /space/calculator/ twin handles spacing.",
    },
    group: "tool",
    tags: ["字阶", "间距"],
  },
  {
    name: "glassmorphism.com",
    url: "https://hype4.academy/tools/glassmorphism-generator/",
    desc: {
      zh: "玻璃感起点速查:调 blur/透明度直接拷 CSS(原域名 301 至此);精修请回本站条目页的参数面板。",
      en: "A quick start for glass: tweak blur/opacity and copy the CSS (the original domain 301s here); fine-tune back in this site's entry parameter panels.",
    },
    group: "tool",
  },
  {
    name: "neumorphism.io",
    url: "https://neumorphism.io/",
    desc: {
      zh: "新拟物双层阴影不想手算时,拖光照角度与强度直接出 CSS;注意浅色底才撑得住这种风格。",
      en: "Skip hand-computing neumorphic dual shadows: drag light angle and intensity, copy the CSS — and remember only light backgrounds carry the style.",
    },
    group: "tool",
  },

  /* ── d) 灵感画廊 ── */
  {
    name: "Mobbin",
    url: "https://mobbin.com",
    desc: {
      zh: "60 万+ 真实 App 截图,按 flow/element 分层;找「成熟产品怎么做这个流程/控件」而不是找视觉炫技。",
      en: "600k+ real app screens organized by flow and element — the place for how mature products build a flow or control, not for visual pyrotechnics.",
    },
    group: "gallery",
    tags: ["App", "Flow"],
  },
  {
    name: "godly.website",
    url: "https://godly.website",
    desc: {
      zh: "视觉冲击型站点灵感库,OG 图与 App 图标也单独成列;想被「吓一跳」时再开。",
      en: "A gallery of visually striking sites, with OG images and app icons as their own columns — open it when you want to be startled.",
    },
    group: "gallery",
  },
  {
    name: "Land-book",
    url: "https://land-book.com",
    desc: {
      zh: "手挑的落地页/营销站灵感库,按 style 标签过滤 + 排序信号;找「这一类风格」的参照时最顺手。",
      en: "A hand-picked library of landing/marketing pages with style-tag filters and ranking signals — the smoothest way to find references for one style.",
    },
    group: "gallery",
    tags: ["落地页"],
  },
  {
    name: "Awwwards",
    url: "https://www.awwwards.com",
    desc: {
      zh: "前沿工艺天花板(SOTD 带评委分);得奖字体过滤器本身就是排版趋势的一手证据。",
      en: "The ceiling of frontier craft (SOTDs carry jury scores); its winning-fonts filter is itself first-hand evidence of typography trends.",
    },
    group: "gallery",
  },
  {
    name: "httpster",
    url: "https://httpster.net",
    desc: {
      zh: "极简/文字主导/粗野主义的克制灵感(3000+ 站);侧栏的风格计数就是策展密度信息。",
      en: "Restrained inspiration across minimal, typographic and brutalist vibes (3000+ sites); the sidebar style counts are curation density as data.",
    },
    group: "gallery",
  },

  /* ── e) 深学文档 ── */
  {
    name: "MDN",
    url: "https://developer.mozilla.org/",
    desc: {
      zh: "任何 CSS/JS 特性的权威说明书;新特性先在这里查语法与兼容表,再去看教程与演示。",
      en: "The authoritative manual for any CSS/JS feature; check syntax and compat tables here first, then move on to tutorials and demos.",
    },
    group: "docs",
  },
  {
    name: "web.dev",
    url: "https://web.dev/",
    desc: {
      zh: "Chrome 官方最佳实践:高性能动画指南、prefers-reduced-motion 适配、scroll-driven 教程都在这里。",
      en: "Chrome's official best practices: the high-performance animations guide, prefers-reduced-motion handling and scroll-driven tutorials live here.",
    },
    group: "docs",
  },
  {
    name: "CSS-Tricks",
    url: "https://css-tricks.com/",
    desc: {
      zh: "具体技法的深度长文出处:grainy gradients、@property 数字滚动等,适合按技法检索。",
      en: "Deep long-form write-ups of specific techniques — grainy gradients, @property number counters and more; search it by technique.",
    },
    group: "docs",
  },
  {
    name: "WAI-ARIA APG",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/",
    desc: {
      zh: "30 个组件模式的键盘交互与 ARIA 属性规范;手写 Tabs/Accordion/滑杆之前先读对应 pattern。",
      en: "Keyboard interaction and ARIA attribute specs for 30 component patterns; read the matching pattern before hand-rolling Tabs, Accordions or sliders.",
    },
    group: "docs",
    tags: ["无障碍"],
  },
];

/* ────────────────────────────────────────────────────────────
   条目页「继续深入」卡:按体系 + 分类的静态映射(无新 collection)。
   URL 纪律:SwiftUI/HIG/M3/WinUI 等根地址为调研所引具体页面 URL 的公共前缀;
   其余( acrylic、material-color-utilities、Utopia space、MDN 变量字体指南、
   APG patterns 等)均为调研中逐字出现的 URL。
   ──────────────────────────────────────────────────────────── */
export interface DeepLink {
  label: { zh: string; en: string };
  url: string;
}

const MDN: DeepLink = {
  label: { zh: "MDN Web 文档", en: "MDN Web Docs" },
  url: "https://developer.mozilla.org/",
};

/** 体系 → 官方深入入口 */
const SYSTEM_DOCS: Record<SystemId, DeepLink[]> = {
  apple: [
    {
      label: { zh: "Apple HIG 人机界面指南", en: "Apple HIG" },
      url: "https://developer.apple.com/design/human-interface-guidelines/",
    },
    {
      label: { zh: "SwiftUI 官方文档", en: "SwiftUI documentation" },
      url: "https://developer.apple.com/documentation/swiftui",
    },
  ],
  m3: [
    { label: { zh: "Material 3 官网", en: "Material 3 site" }, url: "https://m3.material.io" },
    {
      label: { zh: "material-color-utilities(HCT 工具库)", en: "material-color-utilities (HCT toolkit)" },
      url: "https://github.com/material-foundation/material-color-utilities",
    },
  ],
  fluent: [
    { label: { zh: "Fluent 2 官网", en: "Fluent 2 site" }, url: "https://fluent2.microsoft.design" },
    {
      label: { zh: "WinUI Acrylic 材质文档", en: "WinUI Acrylic material docs" },
      url: "https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic",
    },
  ],
  "web-std": [MDN],
  "component-lib": [
    {
      label: { zh: "shadcn/ui 主题 token 约定", en: "shadcn/ui theming tokens" },
      url: "https://ui.shadcn.com/docs/theming",
    },
    {
      label: { zh: "Radix Primitives 动画指南", en: "Radix Primitives animation guide" },
      url: "https://www.radix-ui.com/primitives/docs/guides/animation",
    },
  ],
  community: [],
};

/** 分类 → 对应上手工具 */
const CATEGORY_TOOLS: Record<CategoryId, DeepLink[]> = {
  styles: [
    {
      label: { zh: "neumorphism.io 生成器", en: "neumorphism.io generator" },
      url: "https://neumorphism.io/",
    },
    {
      label: { zh: "glassmorphism.com 生成器", en: "glassmorphism.com generator" },
      url: "https://hype4.academy/tools/glassmorphism-generator/",
    },
  ],
  materials: [
    {
      label: { zh: "glassmorphism.com 生成器", en: "glassmorphism.com generator" },
      url: "https://hype4.academy/tools/glassmorphism-generator/",
    },
    MDN,
  ],
  motion: [
    {
      label: { zh: "linear() 缓动生成器(弹簧)", en: "linear() easing generator (springs)" },
      url: "https://linear-easing-generator.netlify.app/",
    },
    {
      label: { zh: "cubic-bezier.com 曲线对比", en: "cubic-bezier.com curve compare" },
      url: "https://cubic-bezier.com/",
    },
  ],
  color: [
    { label: { zh: "oklch.com 取色器", en: "oklch.com color picker" }, url: "https://oklch.com/" },
    {
      label: { zh: "Realtime Colors 实时换色", en: "Realtime Colors" },
      url: "https://www.realtimecolors.com/",
    },
  ],
  type: [
    {
      label: { zh: "Utopia 流式字阶计算器", en: "Utopia fluid type calculator" },
      url: "https://utopia.fyi/type/calculator/",
    },
    {
      label: { zh: "MDN 可变字体指南", en: "MDN variable fonts guide" },
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide",
    },
  ],
  layout: [
    {
      label: { zh: "Utopia 流式间距计算器", en: "Utopia fluid space calculator" },
      url: "https://utopia.fyi/space/calculator/",
    },
    {
      label: { zh: "Mobbin 真实产品布局", en: "Mobbin real-product layouts" },
      url: "https://mobbin.com",
    },
  ],
  components: [
    {
      label: { zh: "shadcn/ui 文档", en: "shadcn/ui docs" },
      url: "https://ui.shadcn.com",
    },
    {
      label: { zh: "Radix Primitives 文档", en: "Radix Primitives docs" },
      url: "https://www.radix-ui.com/primitives/docs",
    },
  ],
  /* icons / dataviz:第八/第九分类(条目未接线);URL 为既有调研逐字出现的一手地址
     (icons → out/design-study/07-icons.md §1.1/§2;dataviz → 08-dataviz.md §1.3/§2.1) */
  icons: [
    {
      label: { zh: "Lucide 官方文档", en: "Lucide documentation" },
      url: "https://lucide.dev",
    },
    {
      label: { zh: "Material 图标规范(M3)", en: "Material icons (M3)" },
      url: "https://m3.material.io/styles/icons/overview",
    },
  ],
  dataviz: [
    {
      label: { zh: "ColorBrewer 色板", en: "ColorBrewer palettes" },
      url: "https://colorbrewer2.org/",
    },
    {
      label: { zh: "Carbon 数据可视化色板", en: "Carbon dataviz palettes" },
      url: "https://carbondesignsystem.com/data-visualization/color-palettes/",
    },
  ],
  /* principles:第十分类(条目未接线);URL 纪律同上 —— APG patterns 与 RESOURCES
     「WAI-ARIA APG」同址;WCAG 2.2 Understanding 为条目 schema 引用页
     (icon-color-states、editorial-magazine 等)的公共前缀;Laws of UX 为
     components/card 引用页 lawsofux.com/law-of-common-region 的根前缀 */
  principles: [
    {
      label: { zh: "WAI-ARIA APG 组件模式", en: "WAI-ARIA APG patterns" },
      url: "https://www.w3.org/WAI/ARIA/apg/patterns/",
    },
    {
      label: { zh: "WCAG 2.2 理解文档", en: "WCAG 2.2 Understanding docs" },
      url: "https://www.w3.org/WAI/WCAG22/Understanding/",
    },
    {
      label: { zh: "Laws of UX 交互法则库", en: "Laws of UX" },
      url: "https://lawsofux.com/",
    },
  ],
};

/**
 * 条目「继续深入」卡的数据:体系官方入口(优先)+ 分类上手工具,
 * 总数 2–3 条;web-std 体系把 schema.sources 里的官方规范 URL 一并呈现。
 */
export function goDeeperLinks(system: SystemId, category: CategoryId, sources: string[]): DeepLink[] {
  const links: DeepLink[] =
    system === "web-std"
      ? [MDN, ...sources.slice(0, 2).map((u) => ({ label: { zh: u, en: u }, url: u }))]
      : [...SYSTEM_DOCS[system]];
  for (const tool of CATEGORY_TOOLS[category]) {
    if (links.length >= 3) break;
    if (!links.some((l) => l.url === tool.url)) links.push(tool);
  }
  return links.slice(0, 3);
}
