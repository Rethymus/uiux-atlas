# Motion Choreography / 动效编排 Choreography

- 页面 / Page: /uiux-atlas/motion/choreography/
- English page: /uiux-atlas/en/motion/choreography/
- 本页 / This file: /uiux-atlas/motion/choreography/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 编排 · choreography · 方向性编排 · stagger delay
- 简介 / Tagline: 纯 CSS 的动效编排:animation-delay 按 --i 递增做交错起点,方向(上/下/左/右/无)给整组元素统一的空间语义;时长/曲线取 M3 官方配对(进入 std-decel 250ms、退出 std-accel 200ms),进入恒长于退出。
- Tagline (EN): Choreography in pure CSS: animation-delay grows with --i to stagger start points, and a shared direction (up/down/left/right/none) gives the whole group one spatial meaning; duration and curve come from M3's official pairs (enter std-decel 250ms, exit std-accel 200ms — enters outlast exits).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stagger | number · ms | 40ms |
| direction | enum: up · down · left · right · fade | up |

## 适用场景 / When to use

- 首屏内容组的方向性入场:列表自下方上浮、通知自上方下落、侧栏自侧缘滑入(M3 空间模型) / Directional entrances for above-the-fold groups: lists rise from below, notifications drop from the top, sidebars slide from an edge (M3 spatial model)
- snackbar/toast 依位置定向展开——底部向上、顶部向下(M3 官方描述) / Snackbars/toasts expanding directionally by position — upward from the bottom, downward from the top (official M3 wording)
- 需要退出比进入更快的组:入场 std-decel 250ms + 退场 std-accel 200ms 反向交错 / Groups whose exits must beat their enters: entrance std-decel 250ms + reverse-staggered exit std-accel 200ms

## 何时不用 / When not to use

- 长列表(>20 项)整段交错——末项等待线性拉长;首屏之外改用滚动触发的 reveal(见 scroll-driven-animations 条目) / Staggering whole long lists (>20 items) — the last item's wait grows linearly; below the fold, switch to scroll-triggered reveals (see scroll-driven-animations)
- 同一视图多组同时交错入场——编排是强调手段,并发即互相抵消(HIG:反馈动效简短精确) / Multiple groups staggering in simultaneously in one view — choreography is an emphasis tool, concurrency cancels it (HIG: feedback motion is brief and precise)
- 方向与空间模型矛盾:内容出现在顶部却配「自下方」方向,来源暗示与实际来源打架 / Directions contradicting the spatial model: content appearing at the top while animating "from below" — the origin hint fights the actual source
- 用户高频重复操作每次都整段点名入场(HIG:高频交互避免加动效、动效可取消) / A full roll-call on every repetition of a frequent action (HIG: avoid motion on frequent interactions, keep motion cancellable)

## 来源 / Sources

- https://m3.material.io/styles/motion/transitions/transition-patterns
- https://web.dev/articles/animations-guide
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
