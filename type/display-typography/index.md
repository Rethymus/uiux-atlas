# Display Typography / 展示级排版

- 页面 / Page: /uiux-atlas/type/display-typography/
- English page: /uiux-atlas/en/type/display-typography/
- 本页 / This file: /uiux-atlas/type/display-typography/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 展示级大字号 · display type · hero typography · tracking
- 简介 / Tagline: 展示级大字号的三件套:字号越大字距越紧(SF Pro 官方曲线)、行高比越低(apple.com 实测 56px→1.07)、可变字重替代合成加粗——与本站 hero 同源的手法。
- Tagline (EN): The display-size trio: the larger the size, the tighter the tracking (the official SF Pro curve), the lower the line-height ratio (apple.com-measured 56px→1.07), and variable weights instead of synthesized bold — the same techniques this site's hero uses.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | dimension · px | 48px |
| weight | number | 600 |
| trackingMode | enum: auto · manual | auto |
| manualTracking | dimension · em | -0.02em |

## 适用场景 / When to use

- hero 大标语与章节大字:大字号 + 紧字距 + 低行高比(apple.com 铁律) / Hero taglines and section displays: large size + tight tracking + low line-height ratio (apple.com's rules)
- 流式大字标题:clamp() 把本手法一次性写成 CSS(本站 --step-5 同源) / Fluid display headings: clamp() writes this technique once in CSS (this site's --step-5 is the same source)
- 可变字重海报字:一张字体文件内 100–900 连续取档,微调无需重排 / Variable-weight poster type: continuous 100–900 from one file, retuning without reflow
- 数字海报与统计大字:展示级字号 + tabular-nums(配合 tabular-numbers 条目) / Numeral posters and stat displays: display sizes + tabular-nums (pair with the tabular-numbers entry)

## 何时不用 / When not to use

- 正文套负字距——小字号加宽才是可读性方向(SF 曲线 11pt 为 +6‱);本站规范:负字距只用于 ≥21px 标题 / Negative tracking on body text — small sizes want wider tracking for legibility (the SF curve reads +6‱ at 11pt); this site's rule reserves negative tracking for ≥21px headings
- 中文大标题照搬西文紧字距——本站中文正文字距 0(CJK 本地化偏离,global.css:156),负字距对汉字的挤压需单独评估 / Copying Latin tight tracking onto CJK display lines — this site keeps CJK body tracking at zero (CJK localization deviation, global.css:156); squeezing Han glyphs needs separate evaluation
- 把展示级手法用于长段落——1.07 的行高比只服务单双行大字,长文回到 1.5+ 体系(见 vertical-rhythm 条目) / Applying display treatment to long paragraphs — a 1.07 ratio serves one-to-two-line displays only; long text returns to the 1.5+ system (see vertical-rhythm)

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/typography
- https://rsms.me/inter/
- https://utopia.fyi/type/calculator/
