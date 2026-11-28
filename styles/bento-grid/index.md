# Bento Grid / 便当盒布局

- 页面 / Page: /uiux-atlas/styles/bento-grid/
- English page: /uiux-atlas/en/styles/bento-grid/
- 本页 / This file: /uiux-atlas/styles/bento-grid/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 便当盒布局 · Bento Box Layout · 便当格
- 简介 / Tagline: 一个 CSS Grid 上的不等大小圆角卡槽阵列,以格子大小编码信息优先级——Apple 2022-09 发布会后成为 SaaS 功能区的默认形态;是布局不是配色。
- Tagline (EN): An array of unequal rounded slots on one CSS Grid, encoding information priority through cell size — the default shape of SaaS feature sections after Apple's 2022-09 keynote; it is a layout, not a color scheme.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| cols | enum: 2 · 3 · 4 · 6 | 4 |
| rowHeight | dimension · px | 180px |
| gap | dimension · px | 16px |
| radius | dimension · px | 24px |

## 适用场景 / When to use

- SaaS 产品功能区的默认形态(2023 年起 Linear/Vercel/Raycast 一代的通行做法,调研 03§9) / The default shape of SaaS feature sections (the Linear/Vercel/Raycast generation's convention since 2023, research 03 §9)
- 产品规格展示:最大格=最重要事实,规格数字进小格(Apple 式) / Spec showcases: the largest cell = the most important fact, spec numbers in small cells (Apple-style)
- 发布页、年度回顾、个人主页的模块化摘要 / Launch pages, year-in-review and personal-site modular summaries

## 何时不用 / When not to use

- 需要严格阅读顺序的内容列表——span 重排与 dense 回填会打乱顺序(调研 03§9 可访问性陷阱) / Content lists needing a strict reading order — spans and dense backfill scramble the order (a research §9 a11y trap)
- 每格内容超过一个事实——「每格自包含一个事实」是 bento 的内容纪律 / More than one fact per cell — 'each cell holds one fact' is the bento content discipline
- 长文阅读与线性叙事——格子化会切碎叙事流 / Long-form reading and linear narrative — gridding chops the flow

## 来源 / Sources

- https://superdesign.dev/styles/bento-grid
- https://design-styles.enlighten-media.net/pages/bento-ui/
- https://www.deck.gallery/blog/apple-bento-grid-decks-roundup/
- https://bentogrids.com
