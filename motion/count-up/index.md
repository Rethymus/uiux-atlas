# Count-Up Number / 数字滚动

- 页面 / Page: /uiux-atlas/motion/count-up/
- English page: /uiux-atlas/en/motion/count-up/
- 本页 / This file: /uiux-atlas/motion/count-up/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 数字滚动 · 数字计数动画 · Number counter
- 简介 / Tagline: 数值从 0 滚到终点的计数动画:@property --num 注册变量做 CSS 插值,或 rAF 逐帧递增;仪表盘指标的标配。
- Tagline (EN): A counter that rolls from 0 to its target: CSS interpolation on a registered @property --num variable, or per-frame rAF increments — the dashboard-stat staple.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| duration | number · ms | 1200ms |
| endValue | number | 2026 |
| decimals | enum: 0 · 1 · 2 | 0 |

## 适用场景 / When to use

- 仪表盘指标首次载入后的数值揭晓 / Revealing a dashboard metric right after its data arrives
- 年度报告/战绩页的总量与涨幅数字 / Totals and deltas on annual reports or stats pages
- 计数器类落地页的「里程碑」展示(播放一次) / One-shot milestone counters on marketing pages

## 何时不用 / When not to use

- 高频刷新的实时数据——持续滚动让读数永远对不上真实值 / Frequently refreshed live data — a perpetually rolling number never matches reality
- 表格/密集数据列——逐格滚动制造持续视觉噪声 / Tables and dense data columns — cell-by-cell rolls create constant visual noise
- 把滚动作为数值的唯一信息载体——读屏听到的是初值或中间值 / Letting the roll be the sole carrier of the value — screen readers hear the start or a mid value

## 来源 / Sources

- https://css-tricks.com/animating-number-counters/
