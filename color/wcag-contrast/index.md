# WCAG Contrast / WCAG 对比度

- 页面 / Page: /uiux-atlas/color/wcag-contrast/
- English page: /uiux-atlas/en/color/wcag-contrast/
- 本页 / This file: /uiux-atlas/color/wcag-contrast/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: WCAG 对比度 · 对比度比值 · Contrast ratio
- 简介 / Tagline: WCAG 2.1 对比度四道阈值:正文 AA 4.5:1、AAA 7:1,大字减半,非文本组件 3:1——相对亮度公式实时判定,比值不得四舍五入达标。
- Tagline (EN): The WCAG 2.1 contrast gates: body text AA 4.5:1 and AAA 7:1, halved for large text, 3:1 for non-text UI — judged live by the relative-luminance formula, with no rounding up to pass.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| foreground | color · hex | #1C1B1F |
| background | color · hex | #FFFBFE |
| textScale | enum: normal · large | normal |

## 适用场景 / When to use

- 设计/开发阶段核对新配色:文字对底色过 4.5:1(AA)、力争 7:1(AAA),大字减半 / Verifying a new palette during design/dev: text on its ground passes 4.5:1 (AA), aims for 7:1 (AAA), halved for large text
- 图标、勾选标记、焦点环、输入框边框等 UI 组件对相邻色过 3:1(SC 1.4.11,仅默认状态) / Icons, checkmarks, focus rings, input borders — UI components pass 3:1 against adjacent colors (SC 1.4.11, default state only)
- 给色板定档:像 Radix Colors 那样为文本色阶指定对比度目标(Radix 用 APCA Lc60/Lc90,调研 06§8) / Setting palette targets: designate contrast goals per text step, as Radix Colors does (Radix targets APCA Lc60/Lc90, research 06 §8)
- 透明度/毛玻璃上的文字:按『透出的最亮与最暗背景』两种极端分别核对(glassmorphism 条目的 a11y 同款要求) / Text over translucency/glass: check both the brightest and darkest backdrop extremes (same requirement as the glassmorphism entry's a11y)

## 何时不用 / When not to use

- 四舍五入达标——WCAG 原文明确 4.499:1 就是不达标;demo 判定用未舍入原值,仅显示值保留两位 / Rounding up to pass — WCAG states 4.499:1 simply fails; the demo judges on the unrounded value and only displays two decimals
- 把 4.5:1 当『越大越好』的唯一指标堆到 15:1——过高对比在暗色下反而刺眼,Apple HIG 建议 4.5:1 底线、小字力争 7:1(调研 06§12/§13) / Treating 4.5:1 as 'higher is always better' and stacking 15:1 — excessive contrast glares in dark mode; Apple HIG sets 4.5:1 as the floor and 7:1 as the aim for small text (research 06 §12/§13)
- 对禁用组件、纯装饰、logo/品牌字标强推 3:1——SC 1.4.11 明文豁免;UA 默认样式与照片中的偶然文字同样豁免 / Forcing 3:1 onto disabled controls, pure decoration, or logos/wordmarks — SC 1.4.11 exempts them explicitly, along with UA default styles and incidental text in photos
- 用 WCAG 比值冒充 APCA——两套体系输出不同:APCA 给 Lc 感知值且非对称,官方要求用 apca-w3 包不得自行实现公式(调研 06§18) / Passing WCAG ratios off as APCA — the systems differ: APCA emits perceptual Lc values asymmetrically, and its spec mandates the apca-w3 package over hand-rolled formulas (research 06 §18)

## 来源 / Sources

- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html
- https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- https://webaim.org/resources/contrastchecker/
