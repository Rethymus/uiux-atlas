# OKLCH Color Space / OKLCH 色彩空间

- 页面 / Page: /uiux-atlas/color/oklch-space/
- English page: /uiux-atlas/en/color/oklch-space/
- 本页 / This file: /uiux-atlas/color/oklch-space/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: oklch 色彩空间 · 感知均匀色彩空间 · Perceptually uniform color space
- 简介 / Tagline: CSS 官方感知均匀色彩空间 oklch(L C H / A):数值变化即人眼感知变化——本条讲空间本身的四个分量与坐标语义。
- Tagline (EN): CSS's official perceptually uniform space oklch(L C H / A): numeric deltas equal perceptual deltas — this entry covers the space itself and its four components.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| L | number · % | 70% |
| C | number | 0.15 |
| H | number · deg | 145deg |
| alpha | number | 1 |

## 适用场景 / When to use

- 任何需要『数值等步 = 感知等步』的场合:色阶推导、渐变插值、hover 提亮 / Anywhere numeric steps must equal perceptual steps: scale derivation, gradient interpolation, hover lightening
- 带透明度的主题色:oklch(L C H / A) 一条声明同时表达颜色与 alpha / Themed colors with transparency: one oklch(L C H / A) declaration carries color and alpha together
- 广色域显示:P3 屏上放开 C 到 0.37 以上获得更鲜艳的品牌色 / Wide-gamut displays: raise C past 0.37 on P3 screens for more vivid brand colors
- 与 light-dark()/color-mix 组合:oklch 语义分量让暗色主题改 L/C 而不改色相 / Composed with light-dark()/color-mix: oklch components let dark themes adjust L/C without touching hue

## 何时不用 / When not to use

- 把 hsl 的色相角直接搬进 oklch——两套角度不重合,红在 oklch 里约 20° 而非 0° / Copying hsl hue angles into oklch — the scales differ; red sits near 20° in oklch, not 0°
- 把 C 当 0–100 的百分数用:100% 只等于 0.4,而 sRGB 实际边界约 0.37 / Treating C as a 0–100 percentage: 100% equals only 0.4, and sRGB's real boundary is ≈0.37
- 高 C 值直接上线——Chrome/Safari 现状是裁剪 RGB 而非降色度,色相会肉眼可见地偏移 / Shipping raw high-C values — Chrome/Safari currently clip RGB instead of gamut-mapping, visibly shifting hue

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- https://www.w3.org/TR/css-color-4/
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
