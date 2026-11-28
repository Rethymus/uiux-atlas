# Holy Grail Layout / 圣杯布局

- 页面 / Page: /uiux-atlas/layout/holy-grail/
- English page: /uiux-atlas/en/layout/holy-grail/
- 本页 / This file: /uiux-atlas/layout/holy-grail/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: grid-template-areas · 命名区域 · 三栏布局 · holy grail
- 简介 / Tagline: 经典三栏(页头/侧栏/主栏/页脚)的现代 Grid 实现:grid-template-areas 一个声明拼出整页骨架,改字符串就能重排——侧栏换边、移动端堆叠都只是换一串空格。
- Tagline (EN): The classic three-column page (header/sidebar/main/footer) done the modern Grid way: grid-template-areas composes the whole skeleton in one declaration, and re-ordering — sidebar to the other side, stacked mobile — is just swapping strings.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| layout | enum: desktop-left · desktop-right · stacked | desktop-left |
| gap | dimension · px | 16px |
| sideWidth | dimension · px | 200px |

## 适用场景 / When to use

- 文档站/博客/后台的整页骨架:页头 + 侧栏 + 主栏 + 页脚一声明拼装 / Whole-page skeletons for docs/blogs/admins: header + sidebar + main + footer from one declaration
- 响应式重排:桌面两栏 ⇄ 移动单列只是换一串 grid-template-areas 字符串 / Responsive re-ordering: desktop two-column ⇄ mobile single column is just swapping the grid-template-areas string
- 侧栏换边(Dir 差异、A/B 实验):desktop-right 档零 DOM 改动 / Sidebar flipping (RTL differences, A/B tests): the desktop-right mode with zero DOM changes
- 设计系统的页面级布局令牌:骨架即命名区域,组件填格入住 / Page-level layout tokens for design systems: the skeleton is named areas; components check in

## 何时不用 / When not to use

- 非矩形的命名区域字符串(每行 token 数不一致)——整条声明失效,先对齐每行格子数 / Non-rectangular area strings (mismatched token counts per row) — the whole declaration fails; align cells per row first
- 嵌套层级里的重复命名区域——同名字符串合并成一个大区域,内层组件命名要加前缀隔离 / Duplicate area names across nested levels — same-name strings merge into one big area; prefix inner component names
- 轨道尺寸硬编码而区域字符串另写——行高/列宽与 areas 行列数不匹配时布局崩坏,一起维护 / Hard-coded track sizes drifting from the area strings — mismatched row/column counts break the layout; maintain them together
- 把动态数量的内容塞进固定区域——命名区域适合固定骨架,条目流交给 auto-fit 网格条目 / Pouring dynamic-count content into fixed areas — named areas suit fixed skeletons; item flows belong to the auto-fit grid entry

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
- https://css-tricks.com/snippets/css/complete-guide-grid/
