# Theme Reveal Wipes / 揭示转场族

- 页面 / Page: /uiux-atlas/motion/theme-reveal-wipes/
- English page: /uiux-atlas/en/motion/theme-reveal-wipes/
- 本页 / This file: /uiux-atlas/motion/theme-reveal-wipes/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 百叶窗转场 · 棋盘格转场 · 对角擦除 · 多边形揭示 · reveal wipes · 几何揭示
- 简介 / Tagline: 百叶窗、棋盘格、对角擦除、多边形揭示四种 clip-path 关键帧几何揭示:单个常驻 overlay 拆成 N 块同构 basic-shape,逐块级联把旧主题擦掉露出新主题——与圆形扩散(color/theme-transition)互补:该条目讲官方圆形配方,本条目讲其余几何揭示。
- Tagline (EN): Four clip-path keyframe geometric reveals — blinds, checkerboard, diagonal wipe, polygon fan: one persistent overlay split into N same-structure basic shapes that cascade the old theme away, complementing color/theme-transition's circular spread — that entry covers the official circle recipe, this one covers every other geometry.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pattern | enum: blinds · checkerboard · diagonal · polygon | blinds |
| duration | number · ms | 500ms |
| stripes | number · 块 | 8块 |

## 适用场景 / When to use

- 低频换肤的仪式感场景:设置页、个人主页、活动/发布会皮肤——500ms 几何揭示让『换了主题』可感知(调研 §5 高频交互不加动效的反用:仅低频使用) / Ceremonial low-frequency re-skins: settings pages, profile pages, campaign skins — the 500ms geometric reveal makes the theme change perceptible (the inverse of research §5's 'no motion on frequent interactions': use only when infrequent)
- 与圆形扩散混用编排:全局默认圆形扩散(color/theme-transition),营销/节日皮肤切换到几何揭示族 / Mixing with the circular spread: keep the circle (color/theme-transition) as the global default and switch to the geometric family for campaign skins
- 内容分区明显的界面用棋盘格(逐区换装可读),阅读型页面用百叶窗/对角(方向感最强) / Checkerboard for dashboards with clear zones (per-zone re-skin stays legible); blinds/diagonal for reading pages (strongest directionality)

## 何时不用 / When not to use

- 高频主题切换——每次点击都是一次全屏运动动画(Apple HIG:高频交互避免加动效,调研 §5) / High-frequency theme toggling — every click is a full-screen motion animation (Apple HIG: avoid motion on frequent interactions, research §5)
- 过冲曲线(ease-out-back 一类)——揭示类回缩露馅,禁用(调研 §6.3;与 color/theme-transition 条目同结论) / Overshoot curves (the ease-out-back family) — reveals show the snap-back and break the illusion; forbidden (research §6.3; same conclusion as color/theme-transition)
- 块数多且单块被压到极短——节奏发碎;按 min(12, 屏宽/120) 自适应减块(调研 §6.3) / Too many cells squeezed too short — the rhythm shatters; adapt with min(12, viewport/120) (research §6.3)
- reduced-motion 用户只给『没有动画』不给『换肤完成』——直切后界面必须立即停在新主题的正确状态 / Giving reduced-motion users 'no animation' without 're-skin done' — after the instant switch the UI must sit in the correct new-theme state

## 来源 / Sources

- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
