# Scroll-driven Animations / 滚动驱动动画

- 页面 / Page: /uiux-atlas/motion/scroll-driven-animations/
- English page: /uiux-atlas/en/motion/scroll-driven-animations/
- 本页 / This file: /uiux-atlas/motion/scroll-driven-animations/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 滚动驱动动画 · animation-timeline · scroll()/view()
- 简介 / Tagline: animation-timeline: scroll()/view() 把动画进度交给滚动位置或元素可见进度:阅读进度条、reveal 揭示、视差图层都能离开主线程运行(Chrome 官方指南)。
- Tagline (EN): animation-timeline: scroll()/view() hands animation progress to scroll position or an element's visibility progress: reading progress bars, reveals and parallax layers can run off the main thread (Chrome's official guide).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| timeline | enum: scroll() · view() | view() |
| rangeStart | enum: cover 0% · entry 0% · entry 25% · entry 50% · contain 0% | entry 25% |
| rangeEnd | enum: cover 100% · cover 50% · exit 50% · exit 100% · contain 100% | cover 50% |

## 适用场景 / When to use

- 阅读进度条:顶栏 scaleX(scroll() 官方示例,调研 04§4)——transform 走合成器 / Reading progress bars: top bar scaleX (the scroll() official example, research 04 §4) — transform rides the compositor
- 图片/卡片进入视口的 reveal 揭示(view() + animation-range,官方示例 entry 25% cover 50%) / Revealing images/cards as they enter the viewport (view() + animation-range; official example entry 25% cover 50%)
- 视差图层:前景/背景挂不同 timeline/range(官方列出的典型用例,调研 04§4) / Parallax layers: foreground/background on different timelines/ranges (an official use case, research 04 §4)
- 替代 scroll 事件 + IntersectionObserver 的手写进度逻辑——声明式、可在主线程外运行(调研 04§4) / Replacing hand-rolled scroll-event + IntersectionObserver progress logic — declarative and able to run off the main thread (research 04 §4)

## 何时不用 / When not to use

- 把 entry/exit 档配到 scroll() 时间轴——这些 named range 只对 view progress timeline 有定义(MDN) / Pairing entry/exit ranges with a scroll() timeline — those named ranges are defined only for view progress timelines (MDN)
- 把会隐藏内容的 reveal 用在关键信息上——不支持动画的浏览器/reduced-motion 用户必须仍能读到内容 / Putting content-hiding reveals on key information — users on unsupported browsers or reduced-motion must still read the content
- 在 animation 简写内内联 animation-timeline——该属性不在简写里,须在简写之后单独声明(调研 04§4) / Inlining animation-timeline inside the animation shorthand — the property is not part of the shorthand and must be declared after it (research 04 §4)
- 用 width 驱动进度条——用 transform: scaleX 才能留在合成器(官方示例做法,调研 04§4) / Driving the progress bar with width — use transform: scaleX to stay on the compositor (the official example's approach, research 04 §4)

## 来源 / Sources

- https://developer.chrome.com/docs/css-ui/scroll-driven-animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range
