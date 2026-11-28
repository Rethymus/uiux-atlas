# Breadcrumb / 面包屑

- 页面 / Page: /uiux-atlas/components/breadcrumb/
- English page: /uiux-atlas/en/components/breadcrumb/
- 本页 / This file: /uiux-atlas/components/breadcrumb/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 面包屑导航 · Breadcrumb Trail · 路径导航
- 简介 / Tagline: 按层级排列的父页面链接列表,显示当前页在站点层级中的位置:放主内容之前的水平位置,上层任意节点可点、逐级回退。
- Tagline (EN): A list of parent-page links ordered by hierarchy showing where the current page sits in the site structure: horizontal, before the main content, with every ancestor clickable for step-by-step backtracking.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| separator | enum: / · > · · | / |
| maxItems | number | 3 |

## 适用场景 / When to use

- 三层以上的层级型站点:文档站、电商类目、管理后台,帮助用户定位并逐级回退(APG:帮助用户定位,调研 07§12) / Hierarchical sites of 3+ levels: docs, e-commerce categories, admin consoles — locate the user and backtrack level by level (APG: helps users locate themselves, research 07§12)
- 与顶部导航分工:导航管跨区跳转,面包屑管区内的深度路径 / Complementing top navigation: the nav handles cross-area jumps while the breadcrumb handles in-area depth
- 深层详情页的回退入口:从列表页逐层点进后,一路可点返回 / Backtracking on deep detail pages: after drilling in level by level, every step stays clickable on the way back

## 何时不用 / When not to use

- 只有 1–2 层的扁平站点——面包屑冗余,信息量抵不过视觉占用 / Flat sites of 1–2 levels — the trail is redundant and costs more visual space than it informs
- 替代主导航或历史回退(浏览器返回键)——面包屑表达层级,不表达浏览历史 / Replacing primary navigation or history back — a breadcrumb expresses hierarchy, not browsing history
- 窄屏塞长路径不折叠——5 层以上在移动端必须折叠或省略中层 / Long trails on narrow screens without folding — beyond 5 levels on mobile, collapse or elide the middle
- 把当前页做成可点链接指向自身——无操作意义还误导 / Making the current page a link to itself — pointless and misleading

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
- https://ant.design/components/breadcrumb-cn
- https://mui.com/material-ui/react-breadcrumbs/
