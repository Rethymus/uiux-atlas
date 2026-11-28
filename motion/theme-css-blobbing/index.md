# Theme CSS Blobbing / 纯 CSS 形状融合

- 页面 / Page: /uiux-atlas/motion/theme-css-blobbing/
- English page: /uiux-atlas/en/motion/theme-css-blobbing/
- 本页 / This file: /uiux-atlas/motion/theme-css-blobbing/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: shape blobbing · blur+contrast · CSS goo · 纯 CSS 粘液 · contrast blobbing
- 简介 / Tagline: stage 容器 filter:contrast(20) + 显式实底,子元素 blur(15px) 高对比色:靠近的模糊区互相抬升对比即粘连。无 SVG 的 goo 快速通路,限单色液体层。
- Tagline (EN): A stage container with filter:contrast(20) over an explicit solid background, children at blur(15px) in a high-contrast color: approaching blurred regions raise each other's contrast and stick. The no-SVG fast path to goo — limited to a single-color liquid layer.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| contrast | number | 20 |
| blur | dimension · px | 15px |
| duration | number · ms | 500ms |
| blobs | enum: 2 · 3 · 5 | 3 |

## 适用场景 / When to use

- 主题切换的「液体聚拢」时刻:圆点向中心聚成一滴,换肤完成后散开(单色液体层) / The 'liquid congeal' moment of a theme switch: dots merge into one drop, then scatter after the re-skin (single-color liquid layer)
- 加载/聚拢类小徽章:几个点互相粘连成有机形状(≤3–4 颗、小面积) / Loader/gathering badges: a few dots sticking into an organic shape (≤3–4 blobs, small areas)
- 快速原型的 goo 通路:不想写 SVG 滤镜时的单色粘液(原型先行,生产再换 metaball/goo-filter) / The fast goo path for prototypes: single-color goo without SVG filters (prototype first, swap to metaball/goo-filter for production)
- 装饰性背景液斑的聚散(面积可控、纯装饰、aria-hidden) / Decorative background blobs gathering and scattering (controlled area, purely decorative, aria-hidden)

## 何时不用 / When not to use

- 大面积使用——contrast 层 + N 个 blur 子元素逐帧重绘,原作者 CPU 告诫,成本随元素数近线性上涨(§2.7) / Large areas — a contrast layer plus N blurred children repaint per frame; the author's CPU caveat says cost climbs near-linearly with count (§2.7)
- 把文字/图标/中间调内容放进滤镜层——contrast(20) 会把它们撕成硬边鬼影;内容永远放层外 / Putting text/icons/mid-tone content inside the filtered layer — contrast(20) shreds them into hard-edged ghosts; content always lives outside
- 浅灰配白底等低对比配色——原文要点②:颜色不高对比则粘连判据失效,只剩两团灰晕 / Low-contrast palettes like light gray on white — the article's rule 2: without high contrast the fusion test fails and only gray halos remain
- 层底不显式声明(透明/渐变底)——原文要点①:contrast 作用于整个层渲染结果,没有实底就没有可拉开的灰阶 / Leaving the layer background undeclared (transparent/gradient) — the article's rule 1: contrast works on the whole rendered layer; no solid background means no mid-grays to pull apart
- 多色液体——本通路只有一层对比判据,多色会在阈值处互相污染;多色液体走 metaball 单 path 或 goo-filter 分层 / Multi-color liquid — this path has a single contrast test; colors contaminate each other at the threshold; use metaball single-path or goo-filter layering for multi-color liquid

## 来源 / Sources

- https://css-tricks.com/shape-blobbing-css/
