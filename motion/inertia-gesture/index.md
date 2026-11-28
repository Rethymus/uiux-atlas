# Inertia Gesture (Motion) / 惯性手势

- 页面 / Page: /uiux-atlas/motion/inertia-gesture/
- English page: /uiux-atlas/en/motion/inertia-gesture/
- 本页 / This file: /uiux-atlas/motion/inertia-gesture/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 惯性滚动 · 拖拽释放惯性 · Momentum scroll
- 简介 / Tagline: Motion 的 type:"inertia":拖拽期间直接跟手,释放后按「power × 释放速度」滑行、按 timeConstant 指数衰减;越界由边界弹簧兜住。
- Tagline (EN): Motion's type:"inertia": the element tracks the pointer during drag, then glides by power × release velocity and decays exponentially over timeConstant; bounds are caught by a boundary spring.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| power | number | 0.8 |
| timeConstant | number · ms | 700ms |

## 适用场景 / When to use

- 拖拽甩动后的自由滑行(列表甩动、轮盘、平移画布) / Free glide after a flick (flick-scrolling lists, wheels, panning canvases)
- 需要 modifyTarget 吸附网格/档位的释放(snap-to-grid 轮播) / Releases that should snap via modifyTarget (snap-to-grid carousels)
- min/max 边界内滑动、越界用边界弹簧拉回的抽屉/面板 / Drawers/panels sliding within min/max where overshoot rebounds via the boundary spring

## 何时不用 / When not to use

- 期望到位后回弹的场景——inertia 没有回弹,只有越界兜底;要回弹用 type:"spring" / Cases that need a settle-bounce — inertia has none, only boundary catching; use type:"spring" for bounce
- 没有真实手势来源的纯按钮触发——没有释放速度,惯性无从谈起 / Pure button triggers with no real gesture — without a release velocity there is no inertia
- 高频小控件——HIG:高频交互避免加动效 / High-frequency small controls — Apple HIG: avoid motion on frequent interactions

## 来源 / Sources

- https://motion.dev/docs/react-transitions
