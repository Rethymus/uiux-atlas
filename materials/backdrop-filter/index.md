# Backdrop Filter / 背景滤镜

- 页面 / Page: /uiux-atlas/materials/backdrop-filter/
- English page: /uiux-atlas/en/materials/backdrop-filter/
- 本页 / This file: /uiux-atlas/materials/backdrop-filter/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 背景滤镜 · 背景模糊 · backdrop-filter
- 简介 / Tagline: 对元素『身后』的全部内容应用 filter 函数链:blur + saturate + brightness 三件套,是毛玻璃与各类系统玻璃材质的 Web 底座。
- Tagline (EN): Applies a chain of filter functions to everything *behind* the element — blur + saturate + brightness, the web foundation under frosted glass and most system glass materials.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| blur | dimension · px | 20px |
| saturate | dimension · % | 180% |
| brightness | dimension · % | 100% |

## 适用场景 / When to use

- 悬浮导航与工具条——对照 Apple 全局导航 blur(20px)+saturate(180%) 生产实测 / Floating nav bars and toolbars — cf. the production-measured Apple global nav blur(20px)+saturate(180%)
- 彩色照片/多层渐变上的浮层卡片与播放器 / Overlay cards and players over colorful photos or gradients
- 模态/抽屉下面的层级垫层,让被遮内容保持可感知 / Scrim layers under modals/drawers so covered content stays perceptible
- 图片上的字幕条与角标 / Caption bars and badges on top of imagery

## 何时不用 / When not to use

- 纯色/白色背景——背后没有可模糊的内容,玻璃直接失效 / Flat or white backdrops — nothing to blur, the effect collapses
- 全屏大面积使用——背景每帧重采样,采样开销随面积上升 / Full-screen slabs — the backdrop re-samples every frame, cost scales with area
- 小号正文与密集数据——填充稀释对比度且随背景滚动持续变化 / Small body text and dense data — the fill dilutes contrast, which shifts as the backdrop scrolls
- 玻璃叠玻璃的多层嵌套——透出的层互相发浑 / Glass stacked on glass — layered translucency turns muddy

## 来源 / Sources

- https://drafts.fxtf.org/filter-effects-2/
- https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
- https://hype4.academy/tools/glassmorphism-generator/
