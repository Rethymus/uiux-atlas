# Filter Functions / 滤镜函数族

- 页面 / Page: /uiux-atlas/materials/filter-functions/
- English page: /uiux-atlas/en/materials/filter-functions/
- 本页 / This file: /uiux-atlas/materials/filter-functions/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: CSS 滤镜 · filter 函数族 · 图像滤镜
- 简介 / Tagline: 作用于元素自身的 filter 函数族:blur / brightness / contrast / hue-rotate 等十枚函数,链式叠加构成图像与材质调色层。
- Tagline (EN): The filter function family applied to an element itself: blur, brightness, contrast, hue-rotate and more — chained together they form the color-grading layer for imagery and materials.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| blur | dimension · px | 0px |
| brightness | dimension · % | 100% |
| contrast | dimension · % | 100% |
| hue-rotate | dimension · deg | 0deg |

## 适用场景 / When to use

- 图像状态表达:禁用态 grayscale(1)、hover 微调 brightness/contrast / Image states: grayscale(1) for disabled, gentle brightness/contrast shifts on hover
- Aurora/Mesh 渐变背景:整层 filter: blur(42px) saturate(1.15)(调研 06 §四 §14 配方) / Aurora/mesh gradient backdrops: a whole-layer filter: blur(42px) saturate(1.15) (recipe in research 06 §IV §14)
- 颗粒噪点:feTurbulence 噪点层配 contrast(170%)+brightness(1000%)(调研 06 §四 §15) / Grain textures: feTurbulence noise pushed by contrast(170%)+brightness(1000%) (research 06 §IV §15)
- 同素材多主题:hue-rotate 一键派生冷/暖变体 / Theming one asset many ways: hue-rotate derives cool/warm variants instantly

## 何时不用 / When not to use

- 对正文文字使用 blur——文本可读性直接归零 / blurring body text — legibility drops to zero
- 大面积逐帧动画的 filter——每帧触发重绘,只对 transform/opacity 合成器友好 / per-frame animated filters on large areas — filter triggers repaints; only transform/opacity are compositor-friendly
- 把 brightness/contrast 当调色主题系统用——它们丢失色相信息,主题应换语义色 token / using brightness/contrast as a theming system — they lose hue; themes should swap semantic color tokens
- 在照片上叠 >200% 的极端组合——细节全灭只剩色块 / stacking >200% extreme combos on photos — detail is annihilated, leaving flat color blobs

## 来源 / Sources

- https://drafts.fxtf.org/filter-effects-1/
- https://developer.mozilla.org/en-US/docs/Web/CSS/filter
- https://css-tricks.com/grainy-gradients/
