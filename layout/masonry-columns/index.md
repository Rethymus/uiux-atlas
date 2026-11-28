# CSS Multi-column Masonry / 多列瀑布流 Columns

- 页面 / Page: /uiux-atlas/layout/masonry-columns/
- English page: /uiux-atlas/en/layout/masonry-columns/
- 本页 / This file: /uiux-atlas/layout/masonry-columns/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: columns · CSS Multi-column · column-count · 瀑布流(多列实现)
- 简介 / Tagline: columns: 4 220px 一行声明把内容分成多栏,内容沿列流动形成瀑布流——零 JS、全平台可用,是 grid-lanes 的成熟兜底;代价是顺序按列排布。
- Tagline (EN): columns: 4 220px splits content into columns in one declaration; content flows down the columns into a masonry — zero JS, works everywhere, the mature fallback for grid-lanes; the trade-off is column-wise ordering.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| colMin | dimension · px | 220px |
| gap | dimension · px | 16px |
| rule | enum: none · line | none |

## 适用场景 / When to use

- 零 JS 图片墙/引用墙——一行 columns 声明得到瀑布流,无库无计算 / Zero-JS image/quote walls — one columns declaration yields a masonry, no libraries or math
- 报章式正文分栏——多列模块的设计初衷,配合 column-rule 与 column-span(首栏大标题) / Newspaper-style prose columns — the module's founding purpose, with column-rule and column-span (full-width headlines)
- 作为 grid-lanes 的全平台兜底(调研 11§4B 片段原样)——未来一行声明升级泳道 / As the all-platform fallback for grid-lanes (verbatim from the research 11 §4B snippet) — one declaration upgrades to lanes later
- 高度不一但顺序不敏感的内容集合(标签云、词卡、推荐位) / Uneven-height but order-insensitive collections (tag clouds, word cards, promo slots)

## 何时不用 / When not to use

- 按行序阅读的列表——卡片顺序按列排布(自上而下再换列),MDN 明确列为局限(调研 11§4A) / Lists read in row order — items flow down columns (top-to-bottom, then next column); MDN lists this as a limitation (research 11 §4A)
- 交互密集的卡片流——列内顺序与 Tab 顺序错位,键盘用户困惑 / Interaction-heavy card feeds — in-column order diverges from Tab order, confusing keyboard users
- 需要动态插入到顶部的社交流——columns 无法控制条目落点,插入会重排整栏 / Social feeds that prepend items — columns cannot control placement, inserts re-flow whole columns
- 依赖 Level 2 特性(column-height / column-wrap / ::column)——仍在草案,勿生产使用(调研 11§4A) / Relying on Level 2 features (column-height / column-wrap / ::column) — still drafts, not for production (research 11 §4A)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_multicol_layout
- https://drafts.csswg.org/css-multicol/
