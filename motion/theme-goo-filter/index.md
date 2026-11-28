# Theme Gooey Filter / Gooey alpha 阈值滤镜

- 页面 / Page: /uiux-atlas/motion/theme-goo-filter/
- English page: /uiux-atlas/en/motion/theme-goo-filter/
- 本页 / This file: /uiux-atlas/motion/theme-goo-filter/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: goo filter · gooey effect · 液态融合滤镜 · blur+contrast SVG 版 · 粘液滤镜
- 简介 / Tagline: feGaussianBlur 把 alpha 抹开、feColorMatrix 只对 alpha 行做 ×18−7 的阈值二值化(RGB 行恒等保色):靠近元素的模糊区互相抬升 alpha 即融合。Bebber 原方,液态变形与菜单融合的 SVG 通路。
- Tagline (EN): feGaussianBlur smears the alpha channel and feColorMatrix re-binarizes only the alpha row (×18 then −7, RGB rows untouched): blurred regions of nearby elements lift each other's alpha and fuse. Bebber's original recipe — the SVG route to liquid morphing and menu fusion.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stdDeviation | number | 10 |
| alphaSlope | number | 18 |
| alphaIntercept | number | -7 |
| composite | enum: blend · atop | blend |
| duration | number · ms | 300ms |

## 适用场景 / When to use

- 切换钮液态变形:滑块在轨道两端间滑动,与端点锚球融合/脱离(调研 §6.4 配方) / Liquid toggle morph: a knob slides between track-end anchor blobs, fusing and detaching (research §6.4 recipe)
- 菜单/分页器的项间融合:相邻圆点互相粘连成液态条(Bebber Gooey Pagination 一族) / Menu/pagination item fusion: neighboring dots stick into a liquid strip (the Bebber Gooey Pagination family)
- FAB 展开:主按钮分裂出子按钮,展开/收起时膜颈相连 / FAB expansion: child buttons split off the main one with necks during expand/collapse
- 图标成组出现时的『聚拢成液滴』入场(小容器、小面积) / Grouping icons 'congeal into a droplet' entrances (small containers, small areas)

## 何时不用 / When not to use

- 大面积使用——原文告诫资源消耗大;全屏 goo 每帧重算整个滤镜链,滚动内容上更甚(调研 20§2.4) / Large areas — the article warns of heavy cost; a full-screen goo recomputes the whole filter chain every frame, worse over scrolling content (research 20§2.4)
- 滤镜直接加在会动的元素上——要加在容器上,且容器留出血区,否则边缘出 artifacts(原文三诫) / Putting the filter on the moving elements themselves — it goes on the container with a bleed area, or edges artifact (the article's rules)
- 带文字/图标的内容仍用基础 feBlend——内容会被模糊搅糊;尖角与带内容必须 fancy-goo(19/-9 + atop) / Running text/icon content through the base feBlend — content gets mushed; sharp corners and content need fancy-goo (19/-9 + atop)
- 挂在 ::view-transition-* 伪元素上求液态揭示——S5 实证滤镜被忽略;揭示层液缘要么烘进 path 要么走独立层 / Hanging it on ::view-transition-* pseudo-elements for liquid reveals — S5 proved filters are ignored there; bake reveal fringes into the path or use a separate layer
- 低对比液体色——阈值只动 alpha,颜色仍由原图决定;液体色对底色对比不足时融合边界读不出 / Low-contrast liquid color — the threshold touches alpha only; if the liquid barely contrasts with the backdrop the fused boundary is unreadable

## 来源 / Sources

- https://css-tricks.com/gooey-effect/
