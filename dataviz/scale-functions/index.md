# Scale Functions / 标度函数

- 页面 / Page: /uiux-atlas/dataviz/scale-functions/
- English page: /uiux-atlas/en/dataviz/scale-functions/
- 本页 / This file: /uiux-atlas/dataviz/scale-functions/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: d3-scale · linear scale · log scale · normalize interpolate · domain range
- 简介 / Tagline: 一切映射的母公式:linear 标度 = normalize ∘ interpolate,即 y = r0 + (x−d0)/(d1−d0) × (r1−r0);log 标度在对数域跑同一管线——domain→[0,1]→range,demo 可调 domain/range 实时算。
- Tagline (EN): The mother formula of all mapping: a linear scale is normalize ∘ interpolate, y = r0 + (x−d0)/(d1−d0) × (r1−r0); the log scale runs the same pipeline in log space — domain→[0,1]→range, with adjustable domain/range computed live.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| transform | enum: linear · log | linear |
| domainMin | number | 0 |
| domainMax | number | 100 |
| rangeMin | number · px | 0px |
| rangeMax | number · px | 640px |

## 适用场景 / When to use

- 图表坐标轴:任何 d3 风格图表的第一行代码就是一个标度 / Chart axes: the first line of any d3-style chart is a scale
- 滚动进度归一化:p=(scrollY−start)/(end−start) → 输出位移/透明度(scroll-driven 的 JS 等价) / Scroll progress normalization: p=(scrollY−start)/(end−start) → offsets/opacity (the JS twin of scroll-driven animations)
- 色阶生成:标度把数据映射到 [0,1],再喂给色带插值(dataviz-ordinal-scale 的上游) / Palette generation: scales map data to [0,1] before color-ramp interpolation (upstream of dataviz-ordinal-scale)
- 传感/金融等跨数量级数据:log 标度让 1 与 1000 在图上等距 / Sensor/financial data spanning orders of magnitude: log scales put 1 and 1000 equidistant on the plot

## 何时不用 / When not to use

- log 模式喂 0 或负数——对数无定义,外推到负空间更无意义;先移位或镜像 / Feeding 0 or negatives to a log scale — undefined at zero, meaningless extrapolated negative; shift or mirror first
- d0=d1(除零)或 r0=r1(常量映射)——demo 拦截前者,后者应直接用常量而不是标度 / d0=d1 (divide by zero) or r0=r1 (constant mapping) — the demo blocks the former; the latter deserves a constant, not a scale
- 线性标度画指数增长数据——头部一柱独大、尾部全趴平;数量级跨度 >2 就该切 log / Linear scales for exponential data — one towering bar, everything else flat; past a 2-orders-of-magnitude spread, switch to log
- 忘记 clamp 语义:d3 默认外推,输入越界输出就越界——读数条会提醒当前是否外推 / Forgetting clamp semantics: d3 extrapolates by default, out-of-domain in → out-of-range out — the readout flags whether extrapolation is active

## 来源 / Sources

- https://github.com/d3/d3-scale/blob/main/src/continuous.js
- https://github.com/d3/d3-scale#continuous-scales
- https://github.com/d3/d3-scale/blob/main/src/log.js
