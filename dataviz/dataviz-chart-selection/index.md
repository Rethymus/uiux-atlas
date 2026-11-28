# Chart Selection / 图表选型

- 页面 / Page: /uiux-atlas/dataviz/dataviz-chart-selection/
- English page: /uiux-atlas/en/dataviz/dataviz-chart-selection/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-chart-selection/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Chart Chooser · Visual Vocabulary · 图表类型选择 · 选型决策树
- 简介 / Tagline: 先判断数据关系再挑图表:比较→柱状、趋势→折线、分布→直方图、构成→堆叠柱;柱/面积必须零基线,折线可例外。
- Tagline (EN): Identify the data relationship first, then pick the chart: compare → bars, trend → lines, distribution → histogram, composition → stacked bars; columns/areas must start at zero, line charts may not.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| relation | enum: compare · trend · distribution · composition | compare |
| baseline | enum: zero · truncated | zero |
| labels | enum: direct · legend | direct |

## 适用场景 / When to use

- 拿到新数据集先过四关系判断再定图表——比较/趋势/分布/构成,一步定盘 / Run the four-relationship question on any new dataset before picking a chart — compare/trend/distribution/composition settles it in one step
- 评审图表时用零基线判据快速定位误导:柱系非零即警 / Use the zero-baseline rule to spot misleading charts in review: any truncated bar family is a flag
- 折线图合法截断轴域以放大波动——记得标注轴范围,避免读者误读幅度 / Line charts may legitimately truncate the axis to show movement — annotate the range so readers do not over-read magnitude
- 高密度仪表盘优先直标省掉图例占位,悬停读数交给 tooltip(见 dataviz-tooltip-legend) / Dense dashboards prefer direct labels to reclaim legend space; hover readouts go to tooltips (see dataviz-tooltip-legend)

## 何时不用 / When not to use

- 用饼图讲时间趋势、用折线连离散类别——关系错配是图表误导的第一来源 / Pie charts for time trends, lines connecting discrete classes — relationship mismatch is the primary source of misleading charts
- 柱状/直方/堆叠/面积图非零截断(FT 红线);确需截断请改折线或点图 / Truncated axes on bar/histogram/stacked/area charts (FT red line); switch to a line or dot plot if truncation is truly needed
- 堆叠柱跨段比较中段数量——段基线随堆叠漂移,只有第一段贴零基线可精读;跨系列比较改分组柱 / Comparing middle stacked segments across stacks — their baselines drift with the pile; only the first segment sits on zero and reads precisely. Use grouped bars for cross-series comparison
- 直标放得下时仍用远处对色图例——jfly 原文:远处颜色匹配极其困难 / A distant color legend where direct labels would fit — jfly verbatim: matching colors from afar is extremely difficult

## 来源 / Sources

- http://ft-interactive.github.io/visual-vocabulary/
- https://github.com/ft-interactive/chart-doctor
- https://jfly.uni-koeln.de/color/
