# Blend Modes / 混合模式

- 页面 / Page: /uiux-atlas/materials/blend-modes/
- English page: /uiux-atlas/en/materials/blend-modes/
- 本页 / This file: /uiux-atlas/materials/blend-modes/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 混合模式 · mix-blend-mode · background-blend-mode
- 简介 / Tagline: CSS 混合模式:Compositing and Blending Level 1 定义的 16 种命名模式,经 mix-blend-mode(元素与其背景)或 background-blend-mode(同一元素的多层背景)叠加。
- Tagline (EN): CSS blend modes: the 16 named modes of Compositing and Blending Level 1, applied via mix-blend-mode (element vs backdrop) or background-blend-mode (layers within one element).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: normal · multiply · screen · overlay · darken · lighten · color-dodge · color-burn · hard-light · soft-light · difference · exclusion · hue · saturation · color · luminosity | normal |
| opacity | number · % | 100% |

## 适用场景 / When to use

- 文字与彩色底的可控反色:difference/排除 让文字在任意底上自动可读的『反色标题』 / Controllable inversion: difference/exclusion 'inverted headings' that self-adapt over any backdrop
- 双层渐变/光斑的色彩融合:multiply/overlay 压出深度,screen 提亮氛围(极光、玻璃底衬的常用搭档) / Fusing gradient/blob layers: multiply/overlay for depth, screen for glow — a common aurora/glass-backdrop companion
- 同一元素多层背景的混合:background-blend-mode 让照片与品牌色一次成型 / Blending an element's own background layers: background-blend-mode fuses photos with brand color in one declaration
- 色相/明度分离式调色:hue/color/luminosity 做『保持明度只换色相』的风格化 / Hue/luminance-split grading: hue/color/luminosity restyle while preserving luminance

## 何时不用 / When not to use

- 跨 stacking context 的意外混合:上层元素意外混到页面背景——用 isolation: isolate 限定混合范围 / Accidental blending across stacking contexts: elements blend with the page background unexpectedly — bound the scope with isolation: isolate
- 正文文字上叠 difference/强混合——对比度随下层内容实时变化,无法静态验收 / difference/heavy modes under body text — contrast shifts with the backdrop in real time and cannot be signed off statically
- 高频重绘区域(拖拽、滚动跟随)上用混合——每次合成都要重算混合,代价高于普通合成 / Blend over high-repaint regions (dragging, scroll-following) — every composite recomputes the blend, costlier than plain compositing
- 需要精确品牌色的输出——混合结果取决于两层的具体色值,不可移植 / Outputs needing exact brand colors — the result depends on both layers' values and does not port

## 来源 / Sources

- https://drafts.csswg.org/compositing-1/
- https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
