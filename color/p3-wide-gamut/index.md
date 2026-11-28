# P3 Wide Gamut / P3 广色域

- 页面 / Page: /uiux-atlas/color/p3-wide-gamut/
- English page: /uiux-atlas/en/color/p3-wide-gamut/
- 本页 / This file: /uiux-atlas/color/p3-wide-gamut/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: Display P3 · 广色域 CSS · color(display-p3)
- 简介 / Tagline: 用 color(display-p3 …) 表达 sRGB 装不下的颜色:P3 的 Lab 色域体积约为 sRGB 的 1.5 倍;渐进增强三件套 = sRGB 兜底值 + @supports + @media (color-gamut: p3)。
- Tagline (EN): Express colors sRGB can't hold with color(display-p3 …): P3's Lab volume is ~1.5× sRGB; the progressive-enhancement trio = an sRGB fallback value + @supports + @media (color-gamut: p3).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | dimension · deg | 145deg |
| chroma | number | 0.3 |
| mode | enum: p3 · srgb | p3 |

## 适用场景 / When to use

- 品牌主色/强调色的「更鲜一点的版本」:sRGB 值兜底,P3 屏自动获得更高饱和 / A punchier brand/accent color: sRGB value as the floor, P3 screens automatically get the extra saturation
- 渐变与插画背景(CSS Color 4 允许渐变按指定空间插值,P3 空间过渡更鲜) / Gradient and illustration backdrops (CSS Color 4 lets gradients interpolate in a named space; P3-space transitions stay vivid)
- 数据可视化分类色:色域扩容可在不改明度的前提下拉开色差 / Categorical dataviz colors: the wider gamut separates hues without touching lightness
- 媒体富集页面(照片/视频周边的 UI 配色跟随内容色彩) / Media-rich pages where UI colors echo the content's colors

## 何时不用 / When not to use

- 把「P3 更鲜」当唯一的信息编码——sRGB 屏与 P3 屏观感不一致,差异信息会丢失 / Never encode information solely in 'the P3 extra vividness' — sRGB and P3 screens disagree and the signal is lost
- 只写 color(display-p3 …) 不留 sRGB 兜底:不支持 color() 的声明整条失效(三件套缺一不可) / Writing color(display-p3 …) with no sRGB fallback: unsupported browsers drop the whole declaration — the trio exists because each piece matters
- 在文字色上无脑推高 chroma:对比度按两个分支各自核对(WCAG AA 4.5:1),P3 覆盖不是豁免 / Mindlessly maxing chroma on text colors: contrast must be checked per branch (WCAG AA 4.5:1) — the P3 override is not an exemption

## 来源 / Sources

- https://www.w3.org/TR/css-color-4/
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
