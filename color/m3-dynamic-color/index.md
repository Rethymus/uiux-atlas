# M3 Dynamic Color / 动态取色

- 页面 / Page: /uiux-atlas/color/m3-dynamic-color/
- English page: /uiux-atlas/en/color/m3-dynamic-color/
- 本页 / This file: /uiux-atlas/color/m3-dynamic-color/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Material You 动态取色 · Dynamic Color · 动态取色流程
- 简介 / Tagline: 从一个 source 色相出发,按变体配方展开 5 个调色板,再按角色 tone 映射成 primary/on-primary/container 等语义色——亮暗主题共用同一套 token。
- Tagline (EN): From one source hue, expand five palettes per a variant recipe, then map role tones into primary/on-primary/container semantics — light and dark share the same tokens.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| sourceHue | number · deg | 299deg |
| variant | enum: tonal-spot · neutral · vibrant · expressive | tonal-spot |
| scheme | enum: light · dark | light |

## 适用场景 / When to use

- 按壁纸/品牌色整套换肤:一个 source hue 进来,primary/secondary/tertiary/neutral/error 五板 + 全套角色变量出去 / Whole-app theming from wallpaper/brand color: one source hue in, five palettes plus the full role token set out
- 亮暗主题共用语义 token:组件只写 var(--md-primary),主题只换映射(与三层 token 架构同构) / Light/dark sharing semantic tokens: components write var(--md-primary) only, themes swap mappings (isomorphic to the 3-layer token architecture)
- 不同『性格』的产品主题:tonal-spot 跟随、neutral 克制、vibrant 张扬、expressive 出跳 / Product themes with different personalities: tonal-spot follows, neutral restrains, vibrant shouts, expressive leaps
- 品牌色保留:自定义色经 HarmonizedColors 在 HCT 中向系统色相调和,保持对比与平衡 / Brand-color retention: HarmonizedColors aligns custom colors toward the system hue in HCT, keeping contrast and balance

## 何时不用 / When not to use

- 把生成值当官方基线值:基线 #6750A4 系手调( chroma≈48),tonal-spot 管线 primary chroma=36,两者接近但不同 / Treating generated values as the official baseline: #6750A4 is hand-tuned (chroma≈48) while the tonal-spot pipeline uses 36 — close, not equal
- 只在暗色主题下检查对比度:两套 scheme 的 on-类角色是不同 tone,必须各自复核 / Checking contrast only in dark: on-roles take different tones per scheme — verify both
- 绕过角色直接用调色板任意 tone 上 UI:角色档位带对比度约束,随手取 tone 会破坏可读性 / Bypassing roles and painting UI with arbitrary palette tones: role tones carry contrast constraints, random tones break readability

## 来源 / Sources

- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://github.com/material-foundation/material-color-utilities
