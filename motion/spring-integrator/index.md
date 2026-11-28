# Spring Integrator / 弹簧积分器

- 页面 / Page: /uiux-atlas/motion/spring-integrator/
- English page: /uiux-atlas/en/motion/spring-integrator/
- 本页 / This file: /uiux-atlas/motion/spring-integrator/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: semi-implicit Euler · symplectic Euler · damped harmonic oscillator · spring simulation
- 简介 / Tagline: UI 弹簧的物理内核:m·ẍ+c·ẋ+k·(x−target)=0 用半隐式欧拉离散——先更新速度、再用新速度推进位置;ζ=c/2√(km) 一行锁死手感,dt 决定能量守恒还是爆炸。
- Tagline (EN): The physics core of UI springs: m·ẍ+c·ẋ+k·(x−target)=0 discretized with semi-implicit Euler — update velocity first, then push position with the NEW velocity; ζ=c/2√(km) pins the feel in one line, dt decides energy conservation vs explosion.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stiffness | number | 100 |
| damping | number | 10 |
| mass | number | 1 |
| dt | number · ms | 4ms |

## 适用场景 / When to use

- 自研弹簧动画引擎:手写积分器而非依赖库,先算 ζ 再定参数 / In-house spring engines: hand-write the integrator instead of pulling a library; compute ζ before picking parameters
- 弹簧→linear() 采样编译的采样端:物理步长积分后输出关键帧(linear-easing 条目的上游) / The sampling side of spring→linear() compilation: integrate at the physics step, emit keyframes (upstream of the linear-easing entry)
- 设计系统动效 token 定标:给定目标过冲/整定时间反解 ζ 与 k / Calibrating motion tokens for a design system: solve ζ and k back from target overshoot/settling time
- 评审弹簧手感:用 OS=e^(−πζ/√(1−ζ²)) 与 t_s≈4/(ζω₀) 把「感觉」换算成数字 / Reviewing spring feel: convert 'vibes' into numbers with OS=e^(−πζ/√(1−ζ²)) and t_s≈4/(ζω₀)

## 何时不用 / When not to use

- 显式欧拉做生产积分——同一参数同一 dt 下比半隐式更早发散、能量持续注入 / Explicit Euler in production — it diverges earlier and pumps energy where semi-implicit conserves
- 把帧间隔原样当 dt 而不设上限——掉帧到 200ms 的一帧会把弹簧炸飞 / Using raw frame gaps as dt without a cap — one 200ms hiccup flings the spring off screen
- 只调 k 不看 ζ——k 只改节奏不改过冲比例,「弹多少」永远由 ζ 说了算 / Tuning k while ignoring ζ — k changes only the tempo; how far it overshoots is ζ's verdict alone
- 超大 m 配小 c 的「仪式感」参数——ω₀ 掉到个位数,整定时间以秒计,交互像陷进泥里 / Ceremonial giant-m + tiny-c combos — ω₀ drops to single digits and settling takes seconds, interactions sink into mud

## 来源 / Sources

- https://en.wikipedia.org/wiki/Semi-implicit_Euler_method
- https://en.wikipedia.org/wiki/Damping_ratio
- https://motion.dev/docs/react-transitions
