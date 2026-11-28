# Gradient Interpolation Space / 渐变插值

- 页面 / Page: /uiux-atlas/color/gradient-interpolation/
- English page: /uiux-atlas/en/color/gradient-interpolation/
- 本页 / This file: /uiux-atlas/color/gradient-interpolation/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 渐变插值空间 · in oklab · hue 插值策略 · color interpolation
- 简介 / Tagline: 同一对端色,换个插值空间就是另一条渐变:in srgb/oklab/oklch/display-p3 与四种 hue 策略,治好 sRGB 插值长距离过渡的脏灰带。
- Tagline (EN): One pair of endpoints, a different gradient per interpolation space: in srgb/oklab/oklch/display-p3 plus the four hue strategies — the cure for sRGB's muddy gray band on long transitions.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| space | enum: srgb · oklab · oklch · display-p3 | oklab |
| hueStrategy | enum: shorter · longer · increasing · decreasing | shorter |
| from | color · hex | #FF0000 |
| to | color · hex | #0000FF |

## 适用场景 / When to use

- 长距离色相过渡(红→蓝、橙→紫):显式 in oklab/in oklch,避免 sRGB 默认插值的中段脏灰(调研 06§4) / Long hue transitions (red→blue, orange→purple): explicit in oklab/in oklch to dodge sRGB's default muddy midband (research 06 §4)
- 极坐标空间保鲜艳:in oklch 让 chroma 全程不塌,Tailwind v4 默认渐变即 OKLAB 插值(调研 06§4) / Keeping vividness across polar spaces: in oklch holds chroma the whole way; Tailwind v4 defaults its gradients to OKLAB (research 06 §4)
- 绕远路的色相旅行:in oklch longer hue 让红→黄走蓝紫一侧,适合 Aurora/mesh 光斑的色相编排(调研 06§14) / Deliberate long-way hue journeys: in oklch longer hue sends red→yellow around the blue side — handy for Aurora/mesh hue choreography (research 06 §14)
- P3 屏渐变增强:in display-p3 配 @media (color-gamut: p3) 覆写更鲜艳版本(调研 06§3) / P3-screen gradient enhancement: in display-p3 with @media (color-gamut: p3) overrides for extra vividness (research 06 §3)

## 何时不用 / When not to use

- 对直角空间写 hue 策略——语法表只允许柱坐标空间(hsl/hwb/lch/oklch)携带 hue 关键词,写错整条声明无效 / Attaching hue strategies to rectangular spaces — the grammar only lets polar spaces (hsl/hwb/lch/oklch) carry a hue keyword; a mistake invalidates the whole declaration
- 默认(不写 in)直接上线的长距渐变——旧式颜色在 sRGB 插值,中段发灰发脏;这是规范的兼容条款,不是 bug(调研 06§4) / Shipping long gradients without `in` — legacy colors interpolate in sRGB and the middle turns gray; that is the spec's compatibility clause, not a bug (research 06 §4)
- 同一渐变既无兜底声明又只有 in 语法——不支持的老浏览器会整条丢弃,必须有普通渐变在前 / Shipping an in-only gradient with no fallback declaration — old browsers drop it wholesale; a plain gradient must come first
- 渐变上叠小字不核对对比度:按最亮/最暗两端分别查(Aurora 配方建议光斑亮度保持 0.6–0.75,既发光又不炸文字对比度,调研 06§14) / Small text over gradients without checking both the brightest and darkest ends (the Aurora recipe keeps blob lightness at 0.6–0.75 — glowing without wrecking text contrast, research 06 §14)

## 来源 / Sources

- https://www.w3.org/TR/css-color-4/
- https://tailwindcss.com/blog/tailwindcss-v4
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients
