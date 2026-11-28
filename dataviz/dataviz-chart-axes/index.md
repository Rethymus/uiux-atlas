# Chart Axes & Grid / 坐标轴与网格

- 页面 / Page: /uiux-atlas/dataviz/dataviz-chart-axes/
- English page: /uiux-atlas/en/dataviz/dataviz-chart-axes/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-chart-axes/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Axis Lines · Gridlines · splitLine
- 简介 / Tagline: 图表的「表格线」纪律:网格线要浅(Grafana 用主文字色 9% 透明度)、轴线可去(ECharts/ggplot2 两条路线)、刻度数克制(ECharts splitNumber 默认 5)——三参数决定一张折线图的专业度。
- Tagline (EN): The chart's 'table lines' discipline: grids stay faint (Grafana inverts the theme text color at 9% alpha), axis lines are optional (ECharts vs ggplot2 take opposite defaults), tick counts stay restrained (ECharts splitNumber defaults to 5) — three params decide a line chart's professionalism.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| gridOpacity | number | 0.09 |
| axisLine | enum: on · off | on |
| tickCount | number | 5 |

## 适用场景 / When to use

- 折线/面积/柱状图的网格密度调节——网格是值的「标尺」,浅到可忽略但不缺席 / Grid tuning for line/area/bar charts — the grid is the value ruler: faint enough to ignore, present enough to read
- 暗色主题仪表盘——网格色随主题翻转向文字色再取 9%(Grafana 公式),不要照搬亮色主题的灰色 / Dark-theme dashboards — invert the grid color toward the theme's text color at 9% (Grafana's formula); don't copy the light theme's grey
- 极简风格图表(去轴线)——ggplot2 灰底白网格或 Grafana 隐藏轴线的路线 / Minimal-style charts (no axis lines) — ggplot2's grey-panel-white-grid or Grafana's hidden borders
- 打印/导出场景——提高 gridOpacity 或加粗轴线,屏幕上的 9% 在纸上会消失 / Print/export contexts — raise gridOpacity or thicken axis lines; the screen's 9% vanishes on paper

## 何时不用 / When not to use

- 网格线重到与数据线抢注意力(gridOpacity > 0.3)——读者先看到表格后看到数据 / Grids heavier than the data (gridOpacity > 0.3) — readers see the table before the data
- 刻度数超过 8-10——ECharts 默认 5 档是有意克制,挤满刻度等于放弃取整档距 / More than 8–10 ticks — ECharts' default of 5 is deliberate restraint; cramming ticks forfeits nice step rounding
- 柱状图纵轴不从 0 起——FT 与 ONS 的零基线权威原则,截断柱高=放大差异 / Bar charts not starting at 0 — the FT/ONS zero-baseline principle; truncated bars amplify differences
- 类目轴画横网格——ECharts 源码强制类目轴 splitLine 关闭;横网格属于值轴 / Horizontal gridlines on category axes — ECharts source forces category-axis splitLine off; horizontal grids belong to the value axis

## 来源 / Sources

- https://raw.githubusercontent.com/apache/echarts/5.5.1/src/coord/axisDefault.ts
- https://raw.githubusercontent.com/grafana/grafana/main/packages/grafana-ui/src/components/uPlot/config/UPlotAxisBuilder.ts
- https://github.com/tidyverse/ggplot2/blob/main/R/theme-defaults.R
- https://github.com/ft-interactive/chart-doctor
