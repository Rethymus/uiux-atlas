# Chart Accessibility / 图表无障碍

- 页面 / Page: /uiux-atlas/dataviz/chart-accessibility/
- English page: /uiux-atlas/en/dataviz/chart-accessibility/
- 本页 / This file: /uiux-atlas/dataviz/chart-accessibility/index.md
- 分类 / Category: dataviz 数据可视化 / Data Viz
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Complex Images · Chart alt text · Data sonification · aria.decal
- 简介 / Tagline: 复杂图像的「两段式替代文本」:短 alt/svg aria-label 写类型+概要,页面内长描述给趋势/比例尺/颜色顺序;载体首选 figure role=group + figcaption(对所有人可见),aria-describedby 只喂纯文本;再叠直标与贴花纹理两个非色通道。
- Tagline (EN): Two-tier alternative text for complex images: a short alt/svg aria-label naming type + summary, an in-page long description carrying trends/scale/color order; the carrier of choice is figure role=group + figcaption (visible to everyone), while aria-describedby takes plain text only — plus two non-color channels: direct labels and decal patterns.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| decal | enum: off · on | off |
| directLabel | enum: on · off | on |
| longDesc | enum: table · text | table |

## 适用场景 / When to use

- 任何承载结论的统计图——alt 一句话 + 页面内长描述两段式,读屏与低视力都拿得到结论 / Any chart carrying a conclusion — the two-tier alt + in-page long description so screen-reader and low-vision users get the takeaway
- 多系列分类图——开贴花纹理(ECharts aria.decal,默认 false 须显式开)+ 直标,色相不再是唯一编码 / Multi-series categorical charts — enable decals (ECharts aria.decal, default false, must be turned on) + direct labels so hue is never the only encoding
- 合规/审计场景——figcaption 数据表让数值可复制、可校对,对所有人可见 / Compliance/audit contexts — a figcaption data table keeps values copyable and checkable, visible to everyone
- 盲用数据探索的增强通道——sonification(数值映射音高)作为触觉/听觉补充,demo 内置自研示意 / An enhanced channel for blind data exploration — sonification (values mapped to pitch) as an auditory supplement, sketched in the demo

## 何时不用 / When not to use

- alt 只写「图表」或「柱状图」——WAI 要求写明类型+内容概要,空 alt 等于放弃 / alt that only says "chart" or "bar chart" — WAI requires type + content summary; an empty alt is a forfeit
- 结构化数据表挂 aria-describedby——读屏会把它读成连续段落(WAI 原文),表格请放 figcaption / Hanging a structured table on aria-describedby — screen readers read it as a run-on paragraph (WAI verbatim); put tables in figcaption instead
- 只换颜色区分系列而不给第二通道——色盲用户(NEI 口径约 1/12 男性)直接丢失系列信息 / Distinguishing series by color alone with no second channel — colorblind users (NEI: about 1 in 12 men) lose the series entirely
- 把长描述藏进 tooltip/折叠面板——WAI 首选它对所有人可见,藏起来就只剩读屏一条窄路 / Hiding the long description in a tooltip/collapsed panel — WAI prefers it visible to everyone; hiding it leaves screen readers as the only narrow path

## 来源 / Sources

- https://www.w3.org/WAI/tutorials/images/complex/
- https://raw.githubusercontent.com/apache/echarts/5.5.1/src/visual/aria.ts
- https://jfly.uni-koeln.de/color/
