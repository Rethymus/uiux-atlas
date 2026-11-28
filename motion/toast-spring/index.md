# Toast Spring Entrance / Toast 弹簧入场

- 页面 / Page: /uiux-atlas/motion/toast-spring/
- English page: /uiux-atlas/en/motion/toast-spring/
- 本页 / This file: /uiux-atlas/motion/toast-spring/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: toast 入场 · snackbar spring · 过冲 bezier · toast bounce-in
- 简介 / Tagline: Toast 从屏幕边缘弹入:入场带过冲(真弹簧或 y₂>1 的过冲 bezier),退场纯缓出收尾,生命周期到点自动消失——『进攻退守,一进一出永不打架』。
- Tagline (EN): A toast springs in from the screen edge: the entrance carries overshoot (a true spring or a y₂>1 overshoot bezier), the exit is a pure eased settle, and the lifecycle auto-dismisses on time — attack in, retreat out, the pair never collides.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stiffness | number | 300 |
| damping | number | 25 |
| edge | enum: bottom · top | bottom |
| lifetime | number · ms | 4000ms |

## 适用场景 / When to use

- 保存成功/已复制/已发送类即时确认——从边缘弹入、4s 后自动退场(sonner 生命周期档) / Instant confirmations (saved/copied/sent) — spring in from the edge, auto-dismiss at 4s (sonner's lifecycle tier)
- 轻量反馈但想要『有生命感』:真弹簧(300/25)或过冲 bezier(.21,1.02,.73,1) 替代平淡 fade / Lightweight feedback that should feel alive: a true spring (300/25) or the overshoot bezier(.21,1.02,.73,1) instead of a flat fade
- 移动端底部边缘:与手势区重合,弹入后可用下滑手势提前退场(sonner/vaul 的滑出语义) / Mobile bottom edge: overlapping the gesture zone, dismissable early with a swipe (sonner/vaul swipe-out semantics)
- 批量操作的多条反馈:堆叠上限 2~3 条,超限移除最旧(与 components/toast 的 maxCount 同则) / Batch-operation feedback: cap the stack at 2–3 and drop the oldest (same rule as components/toast's maxCount)

## 何时不用 / When not to use

- 关键信息(错误需要动作、账户安全)用 toast 自动消失——违反 WCAG 2.2.3 与 WAI-APG Alert 告诫(components/toast 条目已详述) / Critical info (actionable errors, account security) auto-dismissing in a toast — violates WCAG 2.2.3 and the WAI-APG Alert caveat (detailed in components/toast)
- 入出时长打架:入场 0.35s/退场 0.4s 是基准对——退场短于入场残余动画会互相截断(调研 10 巧思 6) / Entrance/exit colliding: 0.35s in / 0.4s out is the benchmark pair — an exit shorter than the entrance's tail truncates it (research 10 craft #6)
- ζ<0.5 的夸张弹跳放在高频操作上——每次保存都弹跳会迅速从『活泼』变成『噪音』(HIG:高频交互避免加动效) /  ζ<0.5 showy bouncing on high-frequency actions — a bounce on every save quickly turns from lively to noise (HIG: avoid motion on frequent interactions)
- 把 toast 从屏幕中央弹出——边缘来、边缘去是方向语义;中央弹入无空间锚点(调研 04§3.3 M3 enter-exit 同则) / Springing toasts from mid-screen — edge in, edge out is the directional semantics; center entrances have no spatial anchor (same rule as M3 enter-exit, research 04 §3.3)

## 来源 / Sources

- https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx
- https://github.com/emilkowalski/sonner/blob/main/src/styles.css
- https://github.com/emilkowalski/sonner/blob/main/src/index.tsx
- https://github.com/emilkowalski/vaul/blob/main/src/constants.ts
- https://motion.dev/docs/react-transitions
