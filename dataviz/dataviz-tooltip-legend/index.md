# Tooltip & Legend / 图例与提示

- 页面 / Page: /uiux-atlas/dataviz/dataviz-tooltip-legend/
- English page: /uiux-atlas/en/dataviz/dataviz-tooltip-legend/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-tooltip-legend/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Chart Tooltip · Legend Positioning · 悬浮提示
- 简介 / Tagline: 图表的「读值双通道」:图例管系列回指(默认右侧,ggplot2 源码默认),tooltip 管精确读值(ECharts 默认 mousemove 触发 / 100ms 延迟隐藏),并按 WCAG 1.4.13 做到 Esc 可关、可悬停、常驻。
- Tagline (EN): The chart's two reading channels: the legend handles series lookup (right by default — ggplot2's source default), the tooltip handles precise values (ECharts defaults: mousemove trigger / 100ms hide delay), and WCAG 1.4.13 demands Esc-dismissibility, hoverability and persistence.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| legendPos | enum: top · right · none | right |
| tooltipFollow | enum: on · off | on |

## 适用场景 / When to use

- 多系列图表的系列回指——图例贴顶或贴右,swatch 与系列一一对应 / Series lookup on multi-series charts — legend docked top or right, swatches one-to-one with series
- 交互式 BI 图表的精确读值——mousemove 跟随 + 100ms 隐藏宽限,快速扫值不断提示 / Precise value reading on interactive BI charts — mousemove-follow with a 100ms hide grace for fast scanning
- 小空间嵌入图(卡片内迷你图)——关掉图例改直标,省一条图例的宽度 / Space-constrained embedded charts (mini charts in cards) — drop the legend for direct labels and reclaim its width
- 无障碍审计的样板——Esc 可关/可悬停/常驻三件套是 WCAG 1.4.13 的验收清单 / The template for accessibility audits — dismissible/hoverable/persistent is the WCAG 1.4.13 acceptance checklist

## 何时不用 / When not to use

- 图例与色块距离过远或分页——jfly 原文:远距颜色匹配极难,能直标就直标 / Legends far from their swatches or paginated — jfly's own words: matching same colors in distant places is extremely difficult; direct-label when possible
- tooltip 挡住指针下的数据点、或移入即消失——1.4.13 失败模式 F95(不可悬停) / Tooltips that cover the hovered point or vanish on approach — WCAG 1.4.13 failure F95 (not hoverable)
- tooltip 无 Esc 退出、指针移走仍不消失——失败模式 F114(不可关)/Persistent 被滥用 / Tooltips without Esc dismissal that linger after the pointer leaves — failure F114 (not dismissible) / Persistent abused
- 只在 tooltip 里放关键数值——触屏与读屏用户拿不到;值要有第二通道 / Putting critical values only in the tooltip — touch and screen-reader users never get them; values need a second channel

## 来源 / Sources

- https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
- https://raw.githubusercontent.com/apache/echarts/5.5.1/src/component/tooltip/TooltipModel.ts
- https://github.com/tidyverse/ggplot2/blob/main/R/theme-defaults.R
- https://jfly.uni-koeln.de/color/
