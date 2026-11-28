# Progress Motion / 进度反馈动效

- 页面 / Page: /uiux-atlas/motion/progress-motion/
- English page: /uiux-atlas/en/motion/progress-motion/
- 本页 / This file: /uiux-atlas/motion/progress-motion/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 进度反馈动效 · 进度动效 · Progress indicator · 不确定进度 · Determinate progress
- 简介 / Tagline: 进度形态随「确定性」变:骨架块(什么都不知道)→ 循环扫光(知道在加载)→ 百分比条(知道还剩多少)→ 完成快速淡入;形态切换按 NN/g 时长阈值演进,越接近终点动力越强(目标梯度)。
- Tagline (EN): Progress form follows certainty: skeleton blocks (nothing known) → looping sweep (loading, but not how long) → percent bar (exactly how much is left) → fast fade-in completion; the form switches at NN/g duration thresholds, and momentum builds toward the end (goal-gradient).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| total | number · ms | 10000ms |
| pulse | number · ms | 1200ms |
| phase | enum: auto · skeleton · indeterminate · percent | auto |

## 适用场景 / When to use

- 预期 ≥10s 的长任务(导出、上传、批量处理)——percent-done + 文字说明 + 完成时间估计(NN/g 阈值) / Long tasks expected at 10s+ (export, upload, batch processing) — percent-done + descriptive text + ETA (NN/g thresholds)
- 「先不确定、后确定」的真实任务:先骨架/循环,拿到可量化进度后切百分比条 / Truly "uncertain first, certain later" tasks: skeleton/loop first, switch to the percent bar once quantifiable progress exists
- 多阶段流程的总进度(阶段本身是人为进度——预盖章式的起步进度,目标梯度效应,补研 12§14) / Multi-stage overall progress (the seeded stage is artificial progress — the goal-gradient effect, 12 §14)

## 何时不用 / When not to use

- 预期 <1s 的请求——NN/g:用即时状态变化即可,进度指示反而制造等待感 / Requests expected under 1s — NN/g: instant state change suffices; an indicator manufactures waiting
- 把循环动画挂在 >10s 的任务上——无终点的旋转让人「盯着钟看」,尽早升级为百分比 / Looped animation on a 10s+ task — an endless spinner makes people watch the clock; upgrade to percent as early as possible
- 假装的百分比(均匀爬到 90% 卡住)——比循环动画更伤信任;没有真实进度就诚实用循环形态 / Fake percentages (evenly creeping to 90% then stalling) — worse for trust than a loop; without real progress, honestly stay looped

## 来源 / Sources

- https://www.nngroup.com/articles/progress-indicators/
- https://m3.material.io/styles/motion/transitions/transition-patterns
- https://www.lukew.com/ff/entry.asp?1797
- https://lawsofux.com/goal-gradient-effect/
