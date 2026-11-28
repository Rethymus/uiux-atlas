# Color Functions (color-mix & relative color) / 颜色函数族

- 页面 / Page: /uiux-atlas/color/color-functions/
- English page: /uiux-atlas/en/color/color-functions/
- 本页 / This file: /uiux-atlas/color/color-functions/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: color-mix · relative color syntax · 相对颜色语法
- 简介 / Tagline: CSS 内建混色:color-mix() 在指定色彩空间插值(默认 oklab),相对颜色语法 rgb(from …) 把原色解构成通道变量做 calc 运算——派生色全部声明式,零硬编码 hex。
- Tagline (EN): CSS-native mixing: color-mix() interpolates in a chosen space (oklab by default), and relative color syntax rgb(from …) deconstructs a color into channel variables for calc() — every derived color declarative, zero hard-coded hex.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| brand | color · oklch | oklch(0.62 0.19 250) |
| hoverMix | number · % | 12% |
| softBg | number · % | 12% |
| borderMix | number · % | 40% |
| space | enum: oklab · srgb · oklch · srgb-linear | oklab |

## 适用场景 / When to use

- 从一个品牌变量派生全套交互态:hover/active/soft-bg/border/on-brand 全部 color-mix() 声明,换品牌只改一个变量(补研 12§11 配方) / Deriving every interactive state from one brand variable: hover/active/soft-bg/border/on-brand all declared with color-mix(); re-branding changes one variable (the research 12 §11 recipes)
- 半透明状态色:color-mix(… , transparent) 造淡底/淡边;Tailwind v4 的透明度工具即此路线(调研 06§4) / Translucent status colors: color-mix(…, transparent) for tints; Tailwind v4's opacity utilities take this route (research 06 §4)
- hover 加深/提亮不用手挑色:相对颜色 rgb(from var(--c) calc(r*.85) …) 与 Evil Martians 的 oklch calc(l + 0.1) 同思路(调研 06§2/补研 12§11) / Hover darkening/lightening without hand-picking: relative colors rgb(from var(--c) calc(r*.85) …), the same idea as Evil Martians' oklch calc(l + 0.1) (research 06 §2 / research 12 §11)
- 渐变/混色发灰时换插值空间:sRGB 长距离色相过渡的「脏灰带」换 oklch/lab 解决(调研 06§4/补研 12§11) / When mixing or gradients turn gray: switch the interpolation space — sRGB's long-hue 'dirty gray band' resolves in oklch/lab (research 06 §4 / research 12 §11)

## 何时不用 / When not to use

- 指望 color-mix(…, transparent) 提升不透明度——它只能降;要升要算用相对颜色 alpha 通道(补研 12§11) / Expecting color-mix(…, transparent) to raise opacity — it only lowers; raising or computing alpha is relative-color territory (research 12 §11)
- 在相对颜色 calc 里给 rgb 通道加百分比——rgb 通道解析为 0–255 数字,calc(g + 25) 合法、calc(g + 25%) 无效(补研 12§11);Safari 16.4 旧语法恰相反,用 @supports 分支(补研 12§8) / Adding percentages to rgb channels inside relative-color calc() — channels resolve to 0–255 numbers: calc(g + 25) is legal, calc(g + 25%) is invalid (research 12 §11); Safari 16.4's old syntax is the opposite, so branch with @supports (research 12 §8)
- 两份百分比合计 0% ——整个表达式无效(补研 12§11);p1+p2<100% 是 alpha 乘数,不是错误,但别误当实色用 / Two percentages summing to 0% — the whole expression is invalid (research 12 §11); p1+p2<100% is an alpha multiplier, not an error, but never mistake the translucent result for a solid
- 不写 in 就默认 sRGB 插值还抱怨混色发灰——长距离色相过渡这是默认行为,明示 in oklch/in oklab(调研 06§4) / Omitting in (defaulting to sRGB interpolation) and complaining about gray mixes — that's the default for long hue travel; write in oklch / in oklab explicitly (research 06 §4)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
- https://tailwindcss.com/blog/tailwindcss-v4
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
