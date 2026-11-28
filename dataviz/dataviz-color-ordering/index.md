# Data Color Ordering / 数据色序与强调

- 页面 / Page: /uiux-atlas/dataviz/dataviz-color-ordering/
- English page: /uiux-atlas/en/dataviz/dataviz-color-ordering/
- 本页 / This file: /uiux-atlas/dataviz/dataviz-color-ordering/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Series Color Sequence · dataColors Order · Accent Color Strategy · 系列色序 · 灰底彩突出
- 简介 / Tagline: 系列色是按序取用的队列而非自由调色盘:官方顺序最大化相邻对比;强调时把语境系列压灰,只让焦点系列保留饱和色。
- Tagline (EN): Series colors are an ordered queue, not a free palette: the official order maximizes adjacent contrast; to emphasize, mute the context series to gray and let only the focal series keep saturation.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| order | enum: official · shuffled | official |
| accentSeries | number | 2 |
| emphasis | enum: full-color · gray-context | gray-context |
| contextGray | color · hex | #B0B0B0 |

## 适用场景 / When to use

- 仪表盘焦点卡/KPI 叙事:一图一主角,其余系列压灰作背景 / Dashboard hero cards / KPI storytelling: one protagonist per chart, everything else muted to gray backdrop
- 多系列折线图只讲其中一条的趋势(业绩复盘、A/B 指标对照) / Multi-series line charts where only one line's trend matters (performance reviews, A/B metric comparisons)
- 按 Power BI dataColors 顺序沉淀主题文件,让全报告系列取色一致(顺序即取色顺序,官方已核) / Persist the palette as a Power BI theme following dataColors order so every visual takes colors identically (order = assignment order, officially verified)
- 8 类以内按官方色序取色:Okabe-Ito 8 色即上限,第 9 类并入「其他」 / Up to 8 classes in official palette order: Okabe-Ito's 8 colors are the ceiling, class 9 merges into 'Other'

## 何时不用 / When not to use

- 处处强调:语境系列仍用高饱和色,焦点随即失效——强调是零和资源 / Emphasizing everywhere: keeping context series saturated kills the focal one — emphasis is a zero-sum resource
- 语境灰与背景太近、或与焦点色区分度 <3:1,读不出层级(WCAG SC 1.4.11) / A context gray too close to the background, or under 3:1 separation from the focal color — no hierarchy reads (WCAG SC 1.4.11)
- 乱序取用官方色板——Carbon 红线:严格按序使用以最大化相邻对比 / Shuffling an official palette — Carbon's red line: strict in-order use to maximize adjacent contrast
- 用透明度/明度变体制造「半强调」——层级交给灰度与描边粗细,不发明第 N 色 / Manufacturing 'half-emphasis' via alpha or lightness variants — hierarchy comes from gray value and stroke weight, not an invented Nth color

## 来源 / Sources

- https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom
- https://carbondesignsystem.com/data-visualization/color-palettes/
- https://jfly.uni-koeln.de/color/
- https://clauswilke.com/dataviz/color-basics.html
