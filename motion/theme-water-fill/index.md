# Theme Water Fill / 注水指示(液面高度表进度/深度)

- 页面 / Page: /uiux-atlas/motion/theme-water-fill/
- English page: /uiux-atlas/en/motion/theme-water-fill/
- 本页 / This file: /uiux-atlas/motion/theme-water-fill/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: water fill · liquid fill · 注水进度 · 液面指示 · wave fill · 水位指示
- 简介 / Tagline: 以液面上升/下降表达进度或主题深浅:双正弦叠加液面(频率比 1:1.618 的拍效应防机械循环)+ SVG 波形 path 相位平移,外层以圆环裁剪;reduced-motion 降级为静态液面高度。
- Tagline (EN): Progress or theme depth told as a rising/falling liquid level: a two-sine surface (1:1.618 frequency ratio for the beat effect) swept through an SVG wave path, clipped by a vessel ring; reduced-motion degrades to a static level.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| amplitude | dimension · px | 8px |
| wavelength | dimension · px | 120px |
| duration | number · ms | 500ms |
| deepLevel | number · % | 75% |
| shallowLevel | number · % | 35% |

## 适用场景 / When to use

- 主题档位指示:液面高度表达当前主题「深浅」(深色=深水、浅色=浅水),切换时注水/排水(调研 §8 候扩 5) / Theme tier indicator: the level expresses the current theme's 'depth' (dark = deep water, light = shallow), pouring/draining on switch (research §8 candidate 5)
- 容量/余量类量值指示:水箱、储能、内存、配额——量是空间隐喻,不是任务完成度(与 progress-motion 互补) / Volume/remaining indicators: tanks, battery, memory, quota — quantity as a spatial metaphor, not task completion (complements progress-motion)
- 品牌性加载/注水瞬间:上传、导入、冲泡类叙事的进度表达 / Branded loading/pouring moments: upload, import, brewing narratives
- 文字注水变体:以文本裁剪替代圆环(先例 Water-Wave-Text-Animation 技法),标题随液位上升被『灌满』 / Text-fill variant: clip by text instead of a ring (Water-Wave-Text-Animation technique), headlines 'flooded' as the level rises

## 何时不用 / When not to use

- 任务完成度指示用液面——完成弧/百分比才是任务语义;液面表达的是『量』,两者混用会让用户把余量读成进度(motion/progress-motion 条目同族告诫) / Liquid levels for task completion — arcs/percentages carry task semantics; a level expresses 'quantity', and mixing them makes users read remaining volume as progress (same-family caveat as motion/progress-motion)
- reduced-motion 用户仍看波动液面——规格明确降级为静态液面高度;整屏/大件波动属前庭触发源(WCAG 2.3.3/C39) / Showing undulating liquid to reduced-motion users — the spec degrades to a static level; large moving surfaces are vestibular triggers (WCAG 2.3.3/C39)
- 振幅接近容器半径仍不收——波峰会顶出裁剪圈或露出液面下的底;A 守在容器直径 1/8–1/12 / Keeping amplitude near the vessel radius — crests poke past the clip ring or expose the bottom; hold A at 1/8–1/12 of the diameter
- 频率比取整数比(如 1:2)——叠加会周期性自我重复(拍效应消失);守 1:1.618 这类不可通约比(§2.6) / Integer frequency ratios (e.g. 1:2) — the superposition periodically repeats itself (the beat effect dies); keep incommensurable ratios like 1:1.618 (§2.6)

## 来源 / Sources

- https://en.wikipedia.org/wiki/Dispersion_(water_waves)
- https://github.com/coiger/fill-water-animation
- https://github.com/codeaashu/Water-Wave-Text-Animation
