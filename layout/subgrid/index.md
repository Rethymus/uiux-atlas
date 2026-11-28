# Subgrid / 子网格 Subgrid

- 页面 / Page: /uiux-atlas/layout/subgrid/
- English page: /uiux-atlas/en/layout/subgrid/
- 本页 / This file: /uiux-atlas/layout/subgrid/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: grid-template-rows: subgrid · grid-template-columns: subgrid · 轨道继承
- 简介 / Tagline: 嵌套组件继承父网格的轨道:grid-template-rows/columns: subgrid 让卡片内部的行/列直接使用父网格轨道,跨卡片的标题与页脚水平对齐不再依赖魔法数字。
- Tagline (EN): Nested components inherit the parent grid's tracks: grid-template-rows/columns: subgrid makes a card's internal rows/columns BE the parent's tracks, so titles and footers align across cards without magic numbers.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| axis | enum: rows · columns | rows |
| gap | dimension · px | 16px |

## 适用场景 / When to use

- 卡片墙的跨卡对齐:标题占第 1 行、正文若干行、页脚恒定对齐在最后一行 / Cross-card alignment in card walls: titles on row 1, bodies spanning rows, footers locked to the last row
- 表单/数据表的列对齐:label / value / action 三列贯穿所有行,由父网格统一裁定 / Column alignment for forms/data tables: label / value / action columns ruled by the parent grid across every row
- 设计系统组件接入页面级网格:组件内部轨道即页面轨道,不再各自为政 / Design-system components plugging into the page grid: inner tracks ARE the page tracks, no more independent sizing
- 杂志式排版的跨栏基线对齐(标题/导语/正文分层共享行轨道) / Editorial baseline alignment across columns (headline/deck/body layers sharing row tracks)

## 何时不用 / When not to use

- 子网格轨道数与父网格对不上(跨越的轨道数 < 内部条目数)——布局会溢出或折叠,先对齐 span 数 / Track-count mismatch (spanned tracks < internal items) — the layout overflows or folds; align span counts first
- 仅需一维排布的场景——Flexbox 更简单,subgrid 只在需要共享父网格轨道时才有意义 / One-dimensional arrangements — Flexbox is simpler; subgrid only pays off when parent tracks must be shared
- 深层级嵌套的网格套网格——每层 subgrid 都共享祖先轨道,改动一层会波及全树,层级控制在两层 / Deep grids-within-grids — every subgrid shares ancestor tracks, so one change ripples through the tree; keep it to two levels
- 不支持环境的唯一布局方案——必须保留独立网格回退(见 fallback) / As the only layout on unsupported engines — always keep the independent-grid fallback (see fallback)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid
- https://webkit.org/blog/17660/introducing-css-grid-lanes/
