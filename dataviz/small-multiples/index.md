# Small Multiples / 小倍数图

- 页面 / Page: /uiux-atlas/dataviz/small-multiples/
- English page: /uiux-atlas/en/dataviz/small-multiples/
- 本页 / This file: /uiux-atlas/dataviz/small-multiples/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Trellis Chart · Lattice Chart · Panel Chart · Grid Chart
- 简介 / Tagline: 同标度、同轴的一组相似小图并排:每个面板只讲一个系列,靠「全部面板共用同一把尺」实现跨面板直接对比——Tufte 的定义性要求;双轴混杂图恰恰是它的反面。
- Tagline (EN): A row of similar small charts at one shared scale and axes: each panel tells a single series, and cross-panel comparison works only because every panel shares the same ruler — Tufte's defining requirement; the dual-axis mashup is its exact opposite.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| layout | enum: multiples · dual-axis | multiples |
| scaleMode | enum: shared · independent | shared |
| panelGap | dimension · px | 8px |

## 适用场景 / When to use

- 多区域/多产品/多站点的同单位指标横比——每个面板一个系列,一眼看出谁高谁低 / Same-unit metrics across regions/products/sites — one series per panel, magnitudes readable at a glance
- 时间序列按时间点切片(月/季度面板)——地图研究结论:时间点之间的对比小倍数胜过动画 / Time series sliced into per-period panels — map research: between-timepoint comparison favors small multiples over animation
- 仪表盘面板阵列——Grafana 24 列 × 30px 行高 × 8px 间距的网格即工程化先例 / Dashboard panel arrays — Grafana's 24 columns × 30px row × 8px gap grid is the engineering precedent
- 需要强调「形状/趋势差异」的独立标度变体——Wikipedia 记载的刻意用法,但必须逐面板标注刻度 / The independent-scale variant stressing shape/trend — a deliberate Wikipedia-documented use, but label every panel's scale

## 何时不用 / When not to use

- 把多系列塞进一张图再用双轴「解决」刻度冲突——交叉点不构成比较,正是本条目 demo 的反面对照 / Cramming series into one chart and "solving" scale clashes with dual axes — crossings imply nothing, the demo's contrast case
- 同单位指标却各面板独立缩放且不加注——读者把被拉高的 0–50 面板误读为更高 / Independent scales on same-unit data without labels — readers misjudge a stretched 0–50 panel as higher
- 不同单位的系列并置(如 % 与件数)共用一把尺——先换算或拆面板,不要共轴 / Different-unit series on one ruler (% vs. counts) — convert or split panels; never share the axis
- 面板内塞回完整轴系(网格+刻度+图例)——小面板只留基线、上限刻度与直标,参考层纪律见坐标轴条目 / Restoring full axis furniture inside each panel — minis keep only baseline, ceiling tick and direct labels; see the Chart Axes entry for reference-layer discipline

## 来源 / Sources

- https://en.wikipedia.org/wiki/Small_multiple
- https://raw.githubusercontent.com/grafana/grafana/main/public/app/core/constants.ts
- https://jfly.uni-koeln.de/color/
