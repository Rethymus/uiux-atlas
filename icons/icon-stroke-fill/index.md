# Stroke & Fill Icons / 描边与填充图标

- 页面 / Page: /uiux-atlas/icons/icon-stroke-fill/
- English page: /uiux-atlas/en/icons/icon-stroke-fill/
- 本页 / This file: /uiux-atlas/icons/icon-stroke-fill/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 描边图标 · 填充图标 · Outline Icons · Filled Icons · Stroke Icons
- 简介 / Tagline: SVG 图标的第一分叉:stroke 走 currentColor 的线性描边,或 fill 吃满 currentColor 的实底填充;同一路径两种交付,线宽 1–3 与填充开关实时切换。
- Tagline (EN): The first fork of an SVG icon: linear stroke via currentColor, or solid fill through it — same path, two deliveries; stroke width 1–3 and the fill switch are live-tunable.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| strokeWidth | number | 2 |
| fill | enum: off · on | off |
| capJoin | enum: round · square | round |

## 适用场景 / When to use

- 工具栏/导航线性图标——一套路径改线宽即得视觉梯度,2px 是 Lucide/Feather 的官方锚点 / Toolbar/nav linear icons — one path set, stroke width gives the visual ladder; 2px is the Lucide/Feather anchor
- hover/选中态要「点亮」的控件:描边版 + 填充版同路径切换,是 Material FILL 轴之外的 SVG 等效通道 / Controls that 'light up' on hover/selection: stroke version + filled version from the same path — the SVG counterpart of Material's FILL axis
- 跟随文字颜色的正文内联图标(currentColor 一处染色) / Inline icons beside text that must follow text color (one currentColor tint)

## 何时不用 / When not to use

- 同一页面混用描边集与填充集而不成体系——视觉重量不一致,模糊法一验就穿帮(07 §3.2) / Mixing stroked and filled sets ad hoc on one page — inconsistent visual weight, exposed by the blur test (07 §3.2)
- 小尺寸(≤16px)硬撑 3px 粗描边——线条粘连,镂空糊死;细分线条在低分屏又会渲染过淡(WCAG 1.4.11 提醒) / Pushing 3px strokes at ≤16px — strokes merge and counters clog; conversely ultra-thin strokes render too faint on low-dpi screens (WCAG 1.4.11 note)
- 把 fill/stroke 写死在复用 path 上——雪碧图/组件染色链会在此断掉(07 §5.1) / Hardcoding fill/stroke on reusable paths — it severs the sprite/component color chain (07 §5.1)

## 来源 / Sources

- https://github.com/lucide-icons/lucide/blob/main/packages/lucide/src/defaultAttributes.ts
- https://lucide.dev/guide/
- https://github.com/tailwindlabs/heroicons
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
