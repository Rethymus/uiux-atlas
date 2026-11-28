# Dashboard Density / 仪表盘密度

- 页面 / Page: /uiux-atlas/dataviz/dataviz-dashboard-density/
- English page: /uiux-atlas/en/dataviz/dataviz-dashboard-density/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-dashboard-density/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Grid Density · Dashboard Spacing · 信息密度
- 简介 / Tagline: BI 网格的密度底座:Grafana 24 列 × 30px 行高 × 8px 面板间距(源码常量),联动 Power BI 官方示例字号阶梯 45/12/12/10——comfortable 与 compact 两档切换整盘呼吸感。
- Tagline (EN): The density base of BI grids: Grafana's 24 columns × 30px row height × 8px panel gap (source constants) driving Power BI's official example font ladder 45/12/12/10 — a comfortable/compact switch that retunes the whole board's breathing room.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| density | enum: comfortable · compact | comfortable |
| gap | dimension · px | 8px |
| rowHeight | dimension · px | 30px |

## 适用场景 / When to use

- BI/监控仪表盘(可拖拽网格)——24 列 × 30px 行 × 8px 间距是 Grafana 十年验证的拖拽底座 / BI/monitoring dashboards with draggable grids — 24 columns × 30px rows × 8px gaps is the drag base Grafana has hardened for a decade
- KPI 卡片与大数字——callout 45px 官方示例档,一眼可读不抢图表 / KPI cards and big numbers — the official callout 45px example tier: readable at a glance without stealing the chart's job
- 运营/运维密集屏( compact 档)——一屏塞下更多面板,间距减半换信息密度 / Dense ops/monitoring screens (compact) — more panels per screen by halving gaps
- 设计 token 化——把 gap/row/字号阶梯沉淀为 --dvz-* 变量,主题与密度档只换变量 / Design-token adoption — persist gap/row/font ladder as --dvz-* variables; themes and density presets swap variables only

## 何时不用 / When not to use

- 移动端照搬 24 列网格——拖拽网格是桌面 BI 惯例,移动端应改卡片流 / Porting the 24-column grid to mobile — drag grids are a desktop BI convention; mobile wants card flows
- compact 档继续压字号换密度——label 9px 以下可读性崩,密度收益归零 / Pushing compact further by shrinking type — below label 9px readability collapses and density gains vanish
- 把 45/12/12/10 当强制规范——Power BI 文档明示这是示例值,按产品实况调 / Treating 45/12/12/10 as a mandatory spec — Power BI's docs present them as example values; tune to your product
- 面板内边距与网格间距混用一套值——面板 padding 属于面板内密度,与 GRID_CELL_VMARGIN 是两个层级 / Reusing grid gap as panel padding — panel padding is intra-panel density, a different tier from GRID_CELL_VMARGIN

## 来源 / Sources

- https://raw.githubusercontent.com/grafana/grafana/main/public/app/core/constants.ts
- https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom
- https://grafana.com/docs/grafana/latest/dashboards/use-dashboards/
