# Chart Animation / 图表动效

- 页面 / Page: /uiux-atlas/dataviz/chart-animation/
- English page: /uiux-atlas/en/dataviz/chart-animation/
- 本页 / This file: /uiux-atlas/dataviz/chart-animation/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Entrance Animation · Growth Animation · Chart.js animation
- 简介 / Tagline: 入场三式——生长(从零基线长出)/ 淡入 / 扫描(clip-path 左→右揭示):时长 1000ms、easeOutQuart(Chart.js 官方默认),动画只落在数据层,轴与网格静止;prefers-reduced-motion 时直出终态。
- Tagline (EN): Three entrances — grow (rise from the zero baseline) / fade / sweep (left-to-right clip-path reveal): 1000ms, easeOutQuart (Chart.js official defaults), animation on the data layer only while axes and grids stay still; under prefers-reduced-motion the final state renders directly.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| entrance | enum: grow · fade · sweep | grow |
| duration | dimension · ms | 1000ms |
| easing | cubicBezier | cubic-bezier(0.165, 0.84, 0.44, 1) |

## 适用场景 / When to use

- 仪表盘/报告首屏的入场引导——数据层一次性生长或淡入,给读者「数据到了」的完成信号 / First paint of dashboards/reports — one grow or fade on the data layer as the "data has arrived" completion signal
- 时间序列的扫描式入场(左→右揭示)——强调「随时间推进」的叙事感 / Sweep entrance on time series (left-to-right) — when the story is "advancing through time"
- 数据更新过渡(hover 高亮 400ms 一档)——Chart.js active 过渡的默认时长档 / Data-update transitions (hover highlight at the 400ms tier) — Chart.js' default active-transition tier
- onComplete 回调接 aria-live 播报「图表加载完成」——动效与读屏反馈同步 / Wiring onComplete to an aria-live "chart loaded" announcement — motion and screen-reader feedback in step

## 何时不用 / When not to use

- 轴/网格/刻度参与动画——「刻度在动」会被误读为「数据在动」(坐标轴条目同一纪律) / Animating axes/grids/ticks — "moving ticks" reads as "moving data" (same discipline as the Chart Axes entry)
- 对比两时点的场景用扫描动画代替并排面板——地图研究结论:时间点对比小倍数胜过动画 / Using a sweep instead of side-by-side panels to compare two time points — map research: between-timepoint comparison favors small multiples
- resize/布局重排做过渡——Chart.js 官方把 resize 过渡写死 duration 0,结构性变化即时到位 / Transitioning resize/layout reflows — Chart.js hard-codes resize transition duration 0; structural changes land instantly
- 过冲型 spring 曲线用于数据层——数值先越过真实值再回落,一瞬间呈现假数据 / Overshooting spring curves on the data layer — values overshoot the truth and settle back, showing false data for a beat

## 来源 / Sources

- https://www.chartjs.org/docs/latest/configuration/animations.html
- https://en.wikipedia.org/wiki/Small_multiple
- https://raw.githubusercontent.com/apache/echarts/5.5.1/src/component/tooltip/TooltipModel.ts
