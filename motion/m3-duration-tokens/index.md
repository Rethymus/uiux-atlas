# M3 Duration Tokens / M3 时长令牌

- 页面 / Page: /uiux-atlas/motion/m3-duration-tokens/
- English page: /uiux-atlas/en/motion/m3-duration-tokens/
- 本页 / This file: /uiux-atlas/motion/m3-duration-tokens/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 时长分档 · duration tokens · md.sys.motion.duration
- 简介 / Tagline: Material 3 官方时长四档 16 令牌:short 50–200ms(小工具类)、medium 250–400ms、long 450–600ms、extra-long 700–1000ms;按转场覆盖面积选档,>600ms 仅限无用户输入的环境类转场。
- Tagline (EN): Material 3's four duration tiers with 16 tokens: short 50–200ms (small utilities), medium 250–400ms, long 450–600ms, extra-long 700–1000ms; pick by transition coverage, and anything past 600ms is for ambient transitions without user input only.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| tier | enum: short · medium · long · XL | short |
| step | enum: 1 · 2 · 3 · 4 | 4 |

## 适用场景 / When to use

- 选择控件(开关/复选/单选)的状态过渡——官方示例 short4 200ms + Standard / Selection-control state transitions — the official example short4 200ms + Standard
- 容器转场选档:FAB→Sheet 用 medium4 400ms,Card→全屏用 long2 500ms + Emphasized(官方示例) / Container transitions: FAB→Sheet at medium4 400ms, Card→fullscreen at long2 500ms + Emphasized (official examples)
- 按转场覆盖面积缩放时长:小面积 200ms、大面积 500ms(M3 官方准则) / Scaling duration by transition coverage: small areas 200ms, large areas 500ms (official M3 guidance)
- 无用户输入的环境类转场(加载氛围、环境反馈)可用 extra-long 档 700–1000ms / Ambient transitions without user input (loading atmosphere, environmental feedback) may use extra-long 700–1000ms

## 何时不用 / When not to use

- >600ms 的时长用在用户输入触发的转场上——官方明确超出即属环境类,用户会觉得迟滞 / Durations past 600ms on user-initiated transitions — officially those belong to ambient only; users will read them as sluggish
- 为「显得精致」整体上调档位——退出类转场应比进入更快(官方示例进入 500ms / 退出 200ms) / Raising every tier to look refined — exits should be faster than enters (official example: enter 500ms / exit 200ms)
- 把 extra-long 档当作「重要 = 更久」的强调手段——时长应跟随面积与注意力,不是权重 / Using extra-long as "important = slower" emphasis — duration tracks area and attention, not weight

## 来源 / Sources

- https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
