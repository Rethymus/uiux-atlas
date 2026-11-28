# Turbulence Edge / 湍流液缘

- 页面 / Page: /uiux-atlas/motion/theme-turbulence-edge/
- English page: /uiux-atlas/en/motion/theme-turbulence-edge/
- 本页 / This file: /uiux-atlas/motion/theme-turbulence-edge/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: boiling edge · feTurbulence liquid edge · 沸腾边缘 · 湍流边缘
- 简介 / Tagline: feTurbulence + feDisplacementMap 把纯色遮罩的硬边扭成有机液缘,逐帧步进 seed 得到持续「沸腾」的边缘;每像素位移 = scale×(噪声−0.5);滤镜只能挂普通元素层,不能上过渡伪元素(spike S5 反证)。
- Tagline (EN): feTurbulence + feDisplacementMap warp the hard edge of a solid mask into an organic liquid fringe; stepping the seed per frame keeps the edge 'boiling'. Per-pixel displacement = scale×(noise−0.5); the filter may only ride ordinary element layers — never transition pseudo-elements (disproved by spike S5).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| baseFrequency | number | 0.012 |
| scale | dimension · px | 60px |
| boil | number | 11 |

## 适用场景 / When to use

- 主题切换揭示层的边缘处理:双层渲染——滤镜层是独立普通元素,叠在揭示层之外(spike S5 反证滤镜不能上过渡伪元素) / Fringing the edges of a theme-switch reveal: dual-layer rendering — the filter layer is an independent ordinary element stacked outside the reveal (spike S5 disproved filters on transition pseudo-elements)
- 液体/水体 UI 的常驻环境动效:水位面板、注水卡、液态分隔带的「沸腾」边缘 / Sustained ambient motion for liquid/water UI: boiling edges on water-level panels, fill cards, liquid dividers
- 插画感章节过渡与装饰条带:纯色块 + 有机硬边,不需要逐帧 path 数学 / Illustrated section transitions and decorative bands: solid blocks with organic hard edges, no per-frame path math needed
- 与 motion/theme-wave-flood 组合:平滑波缘烘进 path,湍流毛边走本条目的独立滤镜层(spike 推荐架构 2) / Combined with motion/theme-wave-flood: bake the smooth wave into the path, put the turbulent fringe on this entry's separate filter layer (spike recommended architecture #2)

## 何时不用 / When not to use

- 把滤镜写进 ::view-transition-* 伪元素求液缘——spike S5 反证:滤镜被忽略、冻结裁剪态下 seed 变化帧间 diff=0 / Putting the filter on ::view-transition-* pseudo-elements for a fringe — disproved by spike S5: the filter is ignored and frozen-clip seed changes yield a 0px frame diff
- 大面积长时间沸腾不做节流——滤镜逐帧重渲染开销随面积线性涨(Bebber「大面积耗性能」告诫同族,§2.4) / Large-area long-running boiling without throttling — filter re-render cost grows linearly with area (same family as Bebber's 'expensive on large areas' warning, §2.4)
- prefers-reduced-motion 用户仍看持续沸腾——持续环境动画必须可停(HIG Motion / WCAG 2.3.3 精神) / Leaving the boil running for prefers-reduced-motion users — sustained ambient motion must be stoppable (HIG Motion / the spirit of WCAG 2.3.3)
- 用湍流滤镜扭曲小号正文文字——位移作用于整个 SourceGraphic,文字随边缘一起被揉皱,可读性直接受损 / Distorting small body text with the turbulence filter — displacement applies to the whole SourceGraphic, so text crumples along with the edge and readability collapses

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap
- https://css-tricks.com/gooey-effect/
- https://developer.apple.com/design/human-interface-guidelines/motion
