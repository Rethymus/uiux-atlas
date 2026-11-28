# Physics Spring (Motion) / 物理弹簧

- 页面 / Page: /uiux-atlas/motion/motion-spring/
- English page: /uiux-atlas/en/motion/motion-spring/
- 本页 / This file: /uiux-atlas/motion/motion-spring/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 弹簧动效 · Spring animation · type: spring
- 简介 / Tagline: Motion(前 Framer Motion)的 type:"spring" 物理弹簧:可打断、从当前速度继续,由 stiffness/damping/mass 决定手感。
- Tagline (EN): Motion's (formerly Framer Motion) type:"spring" physics spring: interruptible, continues from current velocity, with stiffness/damping/mass defining the feel.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: physics · durationBased | physics |
| stiffness | number | 1 |
| damping | number | 10 |
| mass | number | 1 |
| bounce | number | 0.25 |

## 适用场景 / When to use

- 手势衔接:拖拽释放、滑动跟手后的吸附,速度必须连续 / Gesture hand-off: drag release and snap-to-target where velocity must stay continuous
- 高频打断的反馈:点按切换、卡片翻面,随时被下一次点击改向 / Frequently interrupted feedback: toggles and flips retargeted mid-flight by the next click
- 需要『活的』物理感的入场与状态切换(开关、抽屉、浮层) / Entrances and state changes that need a 'live' physical feel (switches, drawers, overlays)
- 固定时长的编排场景:改用 bounce+duration,便于与其他时长动画对齐 / Orchestration on a fixed timeline: use bounce+duration to align with other timed animations

## 何时不用 / When not to use

- 进度条、滚动同步等连续量——用 linear/时长缓动,不该有回弹 / Progress bars and scroll-synced quantities — use linear/duration easing, never a bounce
- 高频小控件(checkbox 等)——HIG:高频交互避免加动效 / High-frequency small controls (checkboxes etc.) — Apple HIG: avoid motion on frequent interactions
- durationBased 模式下指望打断后续接速度——其速度被刻意归零 / Expecting velocity continuation after interruption in durationBased mode — its velocity is deliberately zeroed
- 必须与 CSS transition 生态混用且要导出纯 CSS 的场景——物理弹簧无法表达为 cubic-bezier,只能经 linear() 采样近似 / Cases that must export as pure CSS alongside the transition ecosystem — a physics spring cannot be a cubic-bezier and only approximates via linear() sampling

## 来源 / Sources

- https://motion.dev/docs/react-transitions
- https://motion.dev/docs/react-spring
