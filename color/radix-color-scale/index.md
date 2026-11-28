# Radix Color Scale / Radix 色阶

- 页面 / Page: /uiux-atlas/color/radix-color-scale/
- English page: /uiux-atlas/en/color/radix-color-scale/
- 本页 / This file: /uiux-atlas/color/radix-color-scale/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Radix 12 步色阶 · 语义色阶 · Radix Colors
- 简介 / Tagline: 每个 hue 一条 12 步色阶,步位即语义:1–2 背景、3–5 交互表面、6–8 边框、9–10 solid、11–12 文本——非 Material 路线的工业标杆。
- Tagline (EN): Every hue is a 12-step scale where position means semantics: 1–2 backgrounds, 3–5 interactive surfaces, 6–8 borders, 9–10 solids, 11–12 text — the industrial standard outside Material.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | enum: gray · blue · green · amber · red · violet · cyan · pink | blue |
| step | number | 9 |

## 适用场景 / When to use

- 设计系统底座:直接把步位当语义 token 用(1–2 页面底、3–5 交互面、6–8 描边、9–10 实色、11–12 文字) / Design-system foundation: use steps as semantic tokens directly (1–2 page base, 3–5 interactive surfaces, 6–8 strokes, 9–10 solids, 11–12 text)
- 状态色体系:info/warning/danger 各取一条 hue,同一步位跨色互换保持视觉秩序 / Status color systems: one hue per info/warning/danger; same step positions swap across hues keeping visual order
- 暗色主题:官方 -dark 变体独立调校,不是亮色的简单加深 / Dark themes: the official -dark scales are independently tuned, not a naive darkening of light
- 高对比需求:步 11/12 已按 APCA Lc 60/90 定标,正文/标题文本直接取用 / High-contrast needs: steps 11/12 are APCA Lc 60/90 targeted — pick them for body/heading text directly

## 何时不用 / When not to use

- 跨步位乱配:比如拿步 3(表面)当文字色——步位语义与对比度保证是一体的,拆开用就失效 / Mixing steps arbitrarily: step 3 (surface) as text, say — step semantics and contrast guarantees are one system, splitting them breaks both
- 给 Amber/Lime 等亮黄类 9 步强行配白字——官方明确这 5 阶配深色字 / Forcing white text on step 9 of Amber/Lime-type bright hues — the official docs pair those 5 scales with dark text
- 把步 9 当『品牌主色』直接全屏铺:9 是 CTA/强调实色,大面积背景该用 1–3 / Painting full screens with step 9 as the 'brand color': 9 is for CTAs/accents; large backgrounds belong to steps 1–3

## 来源 / Sources

- https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- https://www.radix-ui.com/colors
