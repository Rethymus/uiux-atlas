# Handoff Curves / 曲线接力

- 页面 / Page: /uiux-atlas/motion/handoff-curves/
- English page: /uiux-atlas/en/motion/handoff-curves/
- 本页 / This file: /uiux-atlas/motion/handoff-curves/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 曲线接力 · 速度接力 · Velocity handoff · Gesture-to-spring · 中断接力
- 简介 / Tagline: 手势释放的那一刻,把位置和速度一起移交给弹簧:直接操纵段(无缓动)+ 弹簧段(半隐式欧拉积分)拼成一条连续曲线;velocity 不交接,动画就「归零重启」——这是跟手感与玩具感的分水岭。
- Tagline (EN): At the instant of release, hand both position and velocity to a spring: the direct-manipulation segment (no easing) and the spring segment (semi-implicit Euler) splice into one continuous curve; without the velocity handoff the animation restarts from rest — the line between feels-in-hand and feels-like-a-toy.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stiffness | number | 300 |
| damping | number | 25 |
| handoff | enum: on · off | on |

## 适用场景 / When to use

- 抽屉/底板/侧栏的拖拽释放——vaul 范式:速度阈值决定「放走还是拉回」(调研 10§5.1) / Drawer/sheet/sidebar drag release — the vaul paradigm: a velocity threshold decides release vs pull-back (research 10 §5.1)
- 拖拽排序/看板卡片的落位——松手瞬间卡片带速度滑进槽位(slot-spring 的 layoutId 气泡同理) / Drag-to-reorder / kanban card drops — the card glides into its slot carrying release velocity (same as slot-spring's layoutId bubble)
- 可中断的任何弹簧:中断/重触发时从「当前值 + 当前速度」续跑,永不归零重启(调研 10§7.3) / Any interruptible spring: interruption/re-trigger resumes from "current value + current velocity", never restarting from rest (research 10 §7.3)

## 何时不用 / When not to use

- 拖拽中叠加缓动曲线——跟手段必须是 1:1 直接操纵,缓动会让指针与元素「脱钩」 / Easing during the drag — the tracking segment must be 1:1 direct manipulation; easing decouples pointer from element
- 释放后用固定时长缓动(cubic-bezier/duration)接管——它无法吸收释放速度,快甩慢甩一个样(duration-based 反例,调研 10§7.3) / Taking over with a fixed-duration tween (cubic-bezier/duration) — it cannot absorb release velocity; hard flicks and soft drags look identical (the duration-based anti-pattern, research 10 §7.3)
- 把释放速度原样灌进低阻尼弹簧(ζ<0.4)——速度×低阻尼=失控过冲,先算 ζ 再接速度(调研 10§2.3 巧思 3) / Injecting raw release velocity into an under-damped spring (ζ<0.4) — velocity × low damping = runaway overshoot; compute ζ before the handoff (research 10 §2.3 craft 3)

## 来源 / Sources

- https://motion.dev/docs/react-transitions
- https://github.com/emilkowalski/vaul/blob/main/src/constants.ts
- https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:)
