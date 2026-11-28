# Smoothness Craft / 丝滑工艺

- 页面 / Page: /uiux-atlas/motion/smooth-craft/
- English page: /uiux-atlas/en/motion/smooth-craft/
- 本页 / This file: /uiux-atlas/motion/smooth-craft/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 高性能动画 · compositor-friendly · will-change 纪律 · velocity preserve
- 简介 / Tagline: 丝滑是工艺不是参数:只动 transform/opacity、逐帧直写 transform、will-change 最后手段用后即撤、中断接力交给物理弹簧——同一动画,工艺不同,帧率天差地别。
- Tagline (EN): Smoothness is craft, not parameters: animate only transform/opacity, write transform directly per frame, treat will-change as a last resort removed after use, and hand interruption to physics springs — same animation, different craft, wildly different frame rates.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| animateProperty | enum: transform · left | transform |
| layerHint | enum: none · will-change · translateZ | none |
| interruptMode | enum: spring · tween | spring |

## 适用场景 / When to use

- 写任何动画前的工艺自查:只动 transform/opacity;位移用 translate,缩放用 scale,显隐用 opacity / A craft preflight before any animation: transform/opacity only — translate for travel, scale for sizing, opacity for visibility
- 手势逐帧驱动:直接写 el.style.transform(或 Motion motion value),CSS 变量只做事件级开关 / Per-frame gesture driving: write el.style.transform directly (or a Motion motion value); CSS variables only at event level
- 需要中途重定向的动画(跟随、抽屉、卡槽):物理弹簧或 visualDuration,让速度接力 / Animations needing mid-flight re-targets (follow, drawers, slot pills): physics springs or visualDuration so velocity hands over
- 性能评审:Chrome Performance 面板 Rendering 行 0 开销为验收线;60/120Hz 下时长一律写 ms / Performance reviews: 0ms in Chrome's Performance panel Rendering row is the acceptance bar; durations always in ms across 60/120Hz

## 何时不用 / When not to use

- 动画 top/left/width/margin——每帧触发布局;必须改布局时用 FLIP(transform 反演) / Animating top/left/width/margin — layout every frame; use FLIP (transform inversion) when layout must change
- will-change 常驻撒到大量元素——MDN:过量内存 + 更复杂渲染反而更慢;也会提前创建 stacking context / Resident will-change across many elements — MDN: excessive memory + more complex rendering can be slower; it also creates stacking contexts early
- 逐帧改 CSS 变量驱动子树样式——变量继承传播触发整树 invalidation(调研 10§7.4) / Driving subtree styles through per-frame CSS variable writes — inherited propagation invalidates the whole tree (research 10 §7.4)
- 按帧数写时长(『跑 12 帧』)——rAF 跟随刷新率,120Hz 上时长减半;一律 ms / Writing durations as frame counts ('run 12 frames') — rAF follows refresh rate, halving durations at 120Hz; use ms

## 来源 / Sources

- https://web.dev/articles/animations-guide
- https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
- https://motion.dev/docs/react-transitions
- https://drafts.csswg.org/css-variables-1/
- https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
