# OKLCH Color Workflow / OKLCH 选色工作流

- 页面 / Page: /uiux-atlas/color/oklch-workflow/
- English page: /uiux-atlas/en/color/oklch-workflow/
- 本页 / This file: /uiux-atlas/color/oklch-workflow/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: oklch 选色工作流 · 感知均匀选色 · Perceptual color picking
- 简介 / Tagline: CSS 官方感知均匀色彩空间 oklch():固定 L 只调 C/H,让对比度可预测、色板可推导。
- Tagline (EN): CSS's official perceptually uniform space oklch(): fix L, vary only C/H — predictable contrast, derivable palettes.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| L | number · % | 80% |
| C | number | 0.12 |
| H | number · deg | 220deg |

## 适用场景 / When to use

- 从品牌主色推导整套色阶:固定 L/微调 C,明暗档感知均匀 / Deriving a full scale from one brand color: fix L, nudge C — perceptually even steps
- 头像/标签按内容色相染色而亮度恒定(示例:oklch(from var(--dominant) 0.8 0.17 h)) / Tinting avatars/tags by content hue at constant lightness (e.g. oklch(from var(--dominant) 0.8 0.17 h))
- 宽色域渐变插值(in oklab/oklch),避免 sRGB 插值的脏灰带 / Wide-gamut gradient interpolation (in oklab/oklch) avoiding sRGB's muddy gray bands
- 主题工程:组件只引用语义变量,亮暗主题换映射表;hover 用相对颜色 calc(l + 0.1) / Theming: components reference semantic tokens only; hover via relative color calc(l + 0.1)

## 何时不用 / When not to use

- 把高色度原值直接上线——Chrome/Safari 目前直接裁剪 RGB 而非降色度,色相会肉眼可见地跑偏,建议手写 P3 覆盖规则 / Shipping raw high-chroma values — Chrome/Safari still clip RGB instead of gamut-mapping, visibly shifting hue; hand-write P3 overrides instead
- 只用 OKLCH 就宣布可访问性达标——对比度仍需用 WCAG/APCA 校验(Evil Martians 原文警示) / Claiming accessibility from OKLCH alone — contrast still needs WCAG/APCA verification (Evil Martians' own warning)
- 把 oklch 的 H 当 hsl 的 H 使用——两套色相角度并不重合(oklch 的红≈20°,hsl 的红=0°) / Reusing hsl hue angles in oklch — the two scales don't coincide (oklch red ≈ 20°, hsl red = 0°)

## 来源 / Sources

- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
