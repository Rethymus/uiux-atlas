# Von Restorff Effect / 冯·雷斯托夫效应

- 页面 / Page: /uiux-atlas/principles/von-restorff/
- English page: /uiux-atlas/en/principles/von-restorff/
- 本页 / This file: /uiux-atlas/principles/von-restorff/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 隔离效应 · Isolation Effect · oddball effect
- 简介 / Tagline: 相似物体中与众不同者最易被记住。让关键动作视觉凸显——但强调要有节制,且不能只靠颜色。
- Tagline (EN): Among similar objects, the one that differs is the one remembered. Make key actions visually distinctive — with restraint, and never by color alone.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| tiles | number · 块 | 12块 |
| cue | enum: color · shape · motion | color |

## 适用场景 / When to use

- 主按钮:页面唯一的强调色块,一屏一个(呼应每屏一个 Primary,07§15/§30) / The primary button: the page's only accent block, one per screen (cf. one Primary per screen, 07 §15/§30)
- 关键状态徽章(如「新」「必填」):短时且克制的异类 / Key state badges ('New', 'Required'): brief, restrained oddballs
- 价格/权益中的关键项:异类让「必看」从扫读中跳出 / The key line among prices/perks: an oddball that leaps out of a skim

## 何时不用 / When not to use

- 一屏多个强调色块互相争夺——全部失效(07§30) / Multiple accent blocks competing on one screen — all fail (07 §30)
- 只靠颜色做异类(色觉障碍用户丢失信号,SC 1.4.1) / Color-only oddballs (color-blind users lose the signal, SC 1.4.1)
- 闪烁式强调——运动敏感用户的不适源(07§30/SC 2.2.2 精神) / Flashing emphasis — a vestibular irritant (07 §30, in the spirit of SC 2.2.2)

## 来源 / Sources

- https://lawsofux.com/von-restorff-effect/
