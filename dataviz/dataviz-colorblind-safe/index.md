# Colorblind-Safe Palette / 色盲安全配色

- 页面 / Page: /uiux-atlas/dataviz/dataviz-colorblind-safe/
- English page: /uiux-atlas/en/dataviz/dataviz-colorblind-safe/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-colorblind-safe/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: CVD-Safe Colors · Color Vision Deficiency Simulation · 色觉缺陷模拟
- 简介 / Tagline: 在发布前用色觉缺陷模拟核查图表:同一组图表切正常/绿盲/红盲/蓝盲四种视图,并叠加形状/线型/纹理冗余编码——模拟矩阵只是近似,冗余编码才是保险。
- Tagline (EN): Audit charts with color-vision-deficiency simulation before shipping: flip the same charts between normal / deuteranopia / protanopia / tritanopia views, and add shape/line-style/texture redundancy — simulation is an approximation; redundancy is the insurance.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| simulation | enum: normal · deuteranopia · protanopia · tritanopia | normal |
| redundancy | enum: on · off | off |

## 适用场景 / When to use

- 图表组件库的验收流程——每组新色板上线路前跑三型模拟 × severity=1 / Acceptance flow for chart component libraries — run all three simulation types × severity 1 before any palette ships
- BI 平台的色盲安全主题——Power BI 官方文档直接提供 ColorblindSafe-Longer.json 主题下载 / BI platform colorblind-safe themes — Power BI's official docs ship ColorblindSafe-Longer.json for download
- 面向公众的教育/医疗/政务图表——红绿混淆对(朱红/蓝绿)必须过模拟或直接弃用 / Public-facing education/health/government charts — red/green confusable pairs must pass simulation or be dropped
- 工程团队的设计评审——demo 的「先看崩溃再开冗余」顺序就是评审动线 / Design reviews in engineering teams — the demo's 'see the failure, then toggle redundancy' is the review flow

## 何时不用 / When not to use

- 只用「色盲友好色板」不跑模拟——色板只是降低风险,堆叠段/相邻色块仍可能塌缩 / Trusting a 'colorblind-friendly palette' without simulation — a palette only lowers risk; stacked segments and adjacent fills can still collapse
- 把 sRGB 值直接喂给模拟矩阵——调研点名的流行 bug:结果整体偏暗、误报色盲不安全 / Feeding sRGB values straight into a simulation matrix — the popular bug the research flags: results skew dark and falsely report CVD-unsafe
- 复用 protan/deutan 平面做 tritan 模拟——daltonlens 明确「完全错误」,tritan 必须 Brettel / Reusing the protan/deutan plane for tritan simulation — daltonlens calls this 'completely wrong'; tritan requires Brettel
- 把模拟当权威判定——模拟无法覆盖个体差异,最终判定靠冗余编码与对比度实测 / Treating simulation as the authoritative verdict — it cannot cover individual differences; the final verdict is redundant encoding plus measured contrast

## 来源 / Sources

- https://daltonlens.org/understanding-cvd-simulation/
- https://jfly.uni-koeln.de/color/
- https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness
- https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes
