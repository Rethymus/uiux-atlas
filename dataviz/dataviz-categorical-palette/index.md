# Categorical Palette / 分类色板

- 页面 / Page: /uiux-atlas/dataviz/dataviz-categorical-palette/
- English page: /uiux-atlas/en/dataviz/dataviz-categorical-palette/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-categorical-palette/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Qualitative Palette · Categorical Color Scheme · 定性色标
- 简介 / Tagline: 互不等序的定性色标:各色「明显不同且相互等价」,按官方顺序取用、8 类封顶,靠亮度差与官方排序保住相邻对比。
- Tagline (EN): A qualitative scheme whose colors are distinctly different yet mutually equivalent: take colors in the official order, cap at 8 classes, and let lightness differences secure adjacent contrast.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| palette | enum: okabe-ito · carbon · tableau10 | okabe-ito |
| series | number | 4 |
| layout | enum: grouped · stacked | grouped |

## 适用场景 / When to use

- 多系列柱状/折线图的系列取色——前三色固定橙→天蓝→蓝绿,把红绿混淆对留给低频类别 / Series colors for multi-series bar/line charts — fix orange → sky blue → bluish green as the first three, reserving the red/green confusable pair for rare classes
- 需要开源许可的商用产品取色——IBM Carbon 14 色板(Apache-2.0)是三套参照里唯一带明确开源许可的 / Commercial products needing a clean license — IBM Carbon's 14-color palette (Apache-2.0) is the only one of the three references with an explicit open-source license
- R 语言/学术出图的 palette.colors(palette="Okabe-Ito") / palette.colors(palette = "Okabe-Ito") in R graphics and academic figures
- Power BI 主题 dataColors 数组——官方文档确认其顺序即系列取色顺序 / Power BI theme dataColors arrays — official docs confirm the array order is the series color order

## 何时不用 / When not to use

- 有序数据(强度、等级)——定性色板不暗示次序,有序数据应改用序数色阶(见 dataviz-ordinal-scale) / Ordered data (intensity, grades) — a qualitative palette implies no order; switch to an ordinal scale (see dataviz-ordinal-scale)
- 超过 8-14 类仍硬塞颜色——第 9 类起并「其他」,否则读者无法回指色块 / Cramming more than 8–14 classes — merge class 9+ into 'Other'; readers cannot match the swatches back
- 给分类色板加渐变——Carbon 官方红线:图表不支持渐变,"Multiple gradients are often inaccessible and are discouraged" / Gradients on categorical fills — Carbon's official red line: no gradients in charts, "Multiple gradients are often inaccessible and are discouraged"
- 在色板上再叠透明度/明度变体制造「第 9 色」——破坏各色等价性,也破坏色盲区分度 / Manufacturing a 'ninth color' via alpha or lightness variants of existing swatches — breaks both equivalence and CVD separability

## 来源 / Sources

- https://jfly.uni-koeln.de/color/
- https://carbondesignsystem.com/data-visualization/color-palettes/
- https://raw.githubusercontent.com/wch/r-source/trunk/src/library/grDevices/R/colorstuff.R
- https://clauswilke.com/dataviz/color-basics.html
