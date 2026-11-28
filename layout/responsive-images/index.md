# Responsive Images / 响应式图片

- 页面 / Page: /uiux-atlas/layout/responsive-images/
- English page: /uiux-atlas/en/layout/responsive-images/
- 本页 / This file: /uiux-atlas/layout/responsive-images/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: srcset · sizes · picture 元素 · fetchpriority
- 简介 / Tagline: srcset/sizes 让浏览器按『槽宽 × DPR』自选分辨率候选,<picture> 管艺术指导与格式切换,fetchpriority 提示首屏大图的加载优先级——三件套分工,一张图省一半流量。
- Tagline (EN): srcset/sizes let the browser pick a resolution candidate by 'slot width × DPR'; <picture> handles art direction and format switching; fetchpriority hints the priority of above-the-fold heroes — three tools, one job: half the bytes for the same image.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| viewport | enum: 390 · 768 · 1280 | 1280 |
| vwShare | dimension · % | 60% |
| fetchpriority | enum: high · auto · low | high |

## 适用场景 / When to use

- 首屏 LCP 大图:srcset 多密度 + fetchpriority="high" + 显式 width/height 防布局偏移(调研 12§1 片段与 Google Flights 实测) / Above-the-fold LCP heroes: multi-density srcset + fetchpriority="high" + explicit width/height (research 12 §1 fragment and the Google Flights measurement)
- 艺术指导:桌面宽幅构图、手机方幅构图——<source media> 按视口换图而不是缩放同一张 / Art direction: wide crop on desktop, square on phones — <source media> swaps composition, not just scale
- 格式切换:AVIF/WebP source 在前、jpg 兜底,新格式省流量老浏览器不破 / Format switching: AVIF/WebP sources first with a jpg fallback — savings on new engines, unbroken on old
- 轮播/长列表的非首图:fetchpriority="low"(+ loading="lazy"),调研 12§1 记 Oodle 实测省 2s / Carousel/long-list non-hero images: fetchpriority="low" (+ loading="lazy") — Oodle measured a 2s saving, research 12 §1

## 何时不用 / When not to use

- 只有多分辨率却硬包 <picture>——官方建议直接 img srcset,省流模式还能自动降密度(调研 12§1) / Wrapping <picture> when you only have resolutions — the official advice is plain img srcset so data-saver can downgrade automatically (research 12 §1)
- srcset 里混用 w 与 x 描述符或重复同一值——两者不可混用、不允许重复值(调研 12§1) / Mixing w and x descriptors or repeating a value in srcset — the two cannot be mixed and duplicates are disallowed (research 12 §1)
- 把 object-fit 写在 <picture> 上——它必须写在子 img 上(调研 12§1) / Putting object-fit on <picture> — it belongs on the child img (research 12 §1)
- 给所有图加 fetchpriority="high"——提示性信号全部拉满等于没提示,首屏只保 LCP 图(调研 12§1 语义) / fetchpriority="high" on everything — maxing every hint is no hint at all; only the LCP image earns it (research 12 §1 semantics)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
- https://web.dev/articles/fetch-priority
