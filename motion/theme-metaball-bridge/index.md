# Theme Metaball Bridge / 液滴连接桥(metaball 单 path 融合)

- 页面 / Page: /uiux-atlas/motion/theme-metaball-bridge/
- English page: /uiux-atlas/en/motion/theme-metaball-bridge/
- 本页 / This file: /uiux-atlas/motion/theme-metaball-bridge/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: metaball bridge · 连接膜 · 液滴膜颈 · metaball membrane · 拖拽粘连
- 简介 / Tagline: 两颗液滴用一条贝塞尔「连接膜」焊成单 path:靠近时膜颈收缩融合、拉远超过 maxDist 即断裂。SATO Hiroyuki 公式纯 JS 采样,不依赖滤镜。
- Tagline (EN): Two droplets welded into a single SVG path by one Bézier 'membrane': the neck fuses as they approach and snaps once they pass maxDist. SATO Hiroyuki's formula, sampled purely in JS — no filters involved.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| handleLenRate | number | 2.4 |
| v | number | 0.5 |
| maxDistFactor | number | 2.5 |
| duration | number · ms | 700ms |

## 适用场景 / When to use

- 导航/标签指示器的液态桥接:滑块在项间移动时与相邻项短暂融合(先例 iOS 系 GooeyTabbar/KYGooeyMenu 家族,调研 20§4) / Liquid bridging for nav/tab indicators: the slider briefly fuses with neighboring items as it travels (iOS-family precedents GooeyTabbar/KYGooeyMenu, research 20 §4)
- 按钮组粘连:间距很近的关联动作(工具条、分屏把手)在 hover/激活时膜颈相连 / Clinging button groups: tightly spaced related actions (toolbars, split handles) grow a neck on hover/activation
- 拖拽吸附:拖起元素与原位之间拉出膜颈,超过 maxDist 断裂、松手回巢重接(先例 KYCuteView 拖拽粘连气泡,984★,§4) / Drag-to-detach: a neck stretches between the dragged element and its home, snaps past maxDist, re-fuses on release (precedent KYCuteView's sticky drag bubbles, 984★, §4)
- 主题/液态叙事里的『液滴溅起—落回』:一次采样同时描述流出与飞溅(调研 20 巧思 5,§6.6 四阶段骨架) / The 'splash up — fall back' beat of liquid theme stories: one sampling describes both departure and reunion (research 20 craft #5, §6.6 skeleton)

## 何时不用 / When not to use

- 小圆在前调用公式——varun 移植版按 radius1 为大圆设计(原文不做半径交换);传入前先保证 r1 ≥ r2 / Calling the formula with the smaller circle first — varun's port assumes radius1 is the larger (the original never swaps); sort before calling
- 对断裂瞬间做 path 补间——环数不同的 path() 不能连续插值,会离散跳变(spike 20a S7);断裂必须直接置空 / Tweening across the break — paths with different ring counts cannot interpolate continuously and jump discretely (spike 20a S7); clear the path at the break instead
- 把膜颈当唯一的选中/连接指示——膜是装饰层(aria-hidden),状态必须另有颜色/文字承载(HIG:动效不得是重要信息的唯一通道) / Letting the neck be the only selected/connected indicator — the membrane is decorative (aria-hidden); state needs its own color/text carrier (HIG: motion never the sole channel)
- 低对比液体色——膜与圆同色才能读作一体;深浅主题都要保证液体色对舞台底色高对比(对照 theme-css-blobbing 的高对比前提) / Low-contrast liquid color — the membrane only reads as one body when it shares the circles' color; keep the liquid high-contrast against the stage in both themes (cf. theme-css-blobbing's high-contrast premise)

## 来源 / Sources

- https://varun.ca/metaballs
- https://en.wikipedia.org/wiki/Metaballs
