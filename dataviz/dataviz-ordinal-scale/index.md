# Ordinal Scale / 序数色阶

- 页面 / Page: /uiux-atlas/dataviz/dataviz-ordinal-scale/
- English page: /uiux-atlas/en/dataviz/dataviz-ordinal-scale/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-ordinal-scale/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Sequential Scale · Color Ramp · 顺序色阶
- 简介 / Tagline: 把有序数值映射为有序颜色的色阶:单色线性(浅→深)或多色渐进,取 ColorBrewer 官方整档、中点锚定数据零点,热力图与等值线图的默认选择。
- Tagline (EN): A scale mapping ordered values to ordered colors: monochrome linear (light → dark) or multi-hue progression, taken as official ColorBrewer classes with the midpoint anchored to the data zero — the default for heatmaps and choropleths.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| steps | number | 5 |
| mode | enum: monochrome · multihue | monochrome |

## 适用场景 / When to use

- 热力图/日历热力图/密度图的填充色——值序=色序,单色线性优先 / Fills for heatmaps, calendar heatmaps and density maps — value order = color order, monochrome linear first
- 分级统计图(choropleth)的分级配色——ColorBrewer 本就为地图分级设色而生 / Choropleth class breaks — ColorBrewer was built for map classification in the first place
- 双向数据(偏差、盈亏、温度联想)——RdBu 双色阶,中点锁数据零点 / Diverging data (deviation, P&L, temperature) — the RdBu diverging scheme with its midpoint locked to the data zero
- 科学出版图——Crameri Scientific Colour Maps v9.0.0(IPCC Interactive Atlas 在用,感知均匀、灰度与色盲可读) / Scientific publication figures — Crameri Scientific Colour Maps v9.0.0 (used by the IPCC Interactive Atlas; perceptually uniform, readable in grayscale and under CVD)

## 何时不用 / When not to use

- 无序的类别数据——序数阶暗示大小次序,类别数据请改用分类色板(dataviz-categorical-palette) / Unordered categorical data — an ordinal scale implies magnitude; use a categorical palette instead (dataviz-categorical-palette)
- 彩虹多色阶(jet 类)不分场合使用——Crameri 论文(Nature Communications 11:5444)专门批评其感知不均匀、扭曲数据 / Rainbow ramps (jet-like) as a default — Crameri's paper (Nature Communications 11:5444) specifically criticizes their perceptual non-uniformity as data distortion
- 在成品里自行插值造中间档——生产取官方整档或 d3 B-spline,插值交给库 / Interpolating your own in-between classes in the shipped artifact — take official classes or d3's B-spline; interpolation belongs to the library
- 把 diverging 中点漂离数据零点——「正中白」必须锚在 0/均值上,不许视觉漂移 / Letting a diverging midpoint drift off the data zero — the 'white middle' must anchor at 0/mean, never at a visually convenient spot

## 来源 / Sources

- https://colorbrewer2.org/
- https://www.fabiocrameri.ch/colourmaps
- https://github.com/d3/d3-scale-chromatic
- https://clauswilke.com/dataviz/color-basics.html
