# Grid Math / 网格数学

- 页面 / Page: /uiux-atlas/layout/grid-math/
- English page: /uiux-atlas/en/layout/grid-math/
- 本页 / This file: /uiux-atlas/layout/grid-math/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: column width formula · gutter math · minmax count · subgrid sizing
- 简介 / Tagline: 栅格的代数:列宽 = (100% − (n−1)×gap)/n、auto-fit 列数 = ⌊(C+gap)/(minCol+gap)⌋、subgrid 让子组件直接继承父轨道尺寸——demo 可调列数与 gap,等比模型实时算宽。
- Tagline (EN): Grid algebra: column width = (100% − (n−1)×gap)/n, auto-fit count = ⌊(C+gap)/(minCol+gap)⌋, and subgrid hands the parent's track sizes straight to children — adjust columns and gap, the true-scale model recomputes widths live.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| container | number · px | 1440px |
| columns | number | 12 |
| gap | dimension · px | 16px |
| minCol | number · px | 250px |

## 适用场景 / When to use

- 设计系统栅格定义:给定画板与槽宽,推导每列真实 px 并核对最小可读列宽 / Defining a design-system grid: given canvas and gutter, derive real per-column px and sanity-check the minimum readable column
- 卡片网格:auto-fit + minmax 的列数预估——改容器宽先知道会掉到几列 / Card grids: predicting the auto-fit + minmax column count — know how many columns survive before resizing
- 跨卡对齐审计:subgrid 让 N 张卡的标题/页脚落进同一组行轨道 / Cross-card alignment audits: subgrid lands N cards' titles/footers on the same set of row tracks
- 响应式槽宽阶梯:断点上把 gap 从 8 抬到 16/24/32,空隙本身就是断点信号 / Responsive gutter ladders: raising gap 8→16/24/32 at breakpoints makes the whitespace itself the breakpoint signal

## 何时不用 / When not to use

- (n−1)×gap 逼近容器宽——列宽被挤成 0 甚至负数,布局塌陷;demo 会在这种组合上报警 / (n−1)×gap approaching the container width — columns squeeze to zero or negative and the layout collapses; the demo flags that combination
- 每列单独用 24 等分栅格——单列 38px 什么都放不下,24 等分只用来跨列 / Using 24-division columns one-by-one — a 38px single column holds nothing; 24 divisions exist to be spanned
- gap 用百分比——槽随容器缩放会让窄屏可读性塌方;主流组件库都把 gap 定值(Ant:『Gutter 宽度固定不变』) / Percentage gutters — shrinking gaps wreck narrow-screen readability; major libraries keep gutters fixed (Ant: 'gutter width never changes')
- subgrid 套 subgrid 无限嵌套——每层都是同一组轨道的引用,超过两层基本是结构错误 / subgrid inside subgrid without end — every level references the same tracks; past two levels it is almost always a structural bug

## 来源 / Sources

- https://tdesign.tencent.com/design/layout
- https://ant.design/components/grid-cn
- https://ant.design/docs/spec/layout-cn
