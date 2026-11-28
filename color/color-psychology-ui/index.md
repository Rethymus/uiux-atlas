# UI Color Psychology / UI 色彩心理

- 页面 / Page: /uiux-atlas/color/color-psychology-ui/
- English page: /uiux-atlas/en/color/color-psychology-ui/
- 本页 / This file: /uiux-atlas/color/color-psychology-ui/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 色彩情绪 · 暖冷色策略 · 色彩行为学
- 简介 / Tagline: 色彩对情绪与行为的影响属编辑性经验总结(本调研未系统证实):暖色相常关联紧迫与行动、冷色相常关联信任与冷静、高饱和=高唤起、高明度=轻。工程上可控的是 oklch 三轴——明度定对比度、色度定唤起强度、色相定情绪域。
- Tagline (EN): Color's effects on mood and behavior are an editorial body of lore (not systematically verified in this research): warm hues are associated with urgency and action, cool hues with trust and calm, high chroma with arousal, high lightness with lightness of mood. What engineering actually controls is the oklch triad — lightness sets contrast, chroma sets arousal, hue sets the mood domain.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | dimension · deg | 20deg |
| chroma | number | 0.17 |
| lightness | number | 0.87 |
| textColor | enum: black · white | black |

## 适用场景 / When to use

- CTA 与关键操作的强调色:强调色承担「焦点/行动号召」职责是 60-30-10 的可验证分工(hype4,调研 06§9) / Accents for CTAs and key actions: the accent owning 'focus / call to action' is 60-30-10's verifiable division of labor (hype4, research 06 §9)
- 品牌情绪板与营销页的色相域选择:按暖冷带组织候选色相(demo 的暖冷判定即此用法) / Hue-domain picks for brand moodboards and marketing pages: organize candidate hues by warm/cool bands (the demo's warm/cool detection is exactly this)
- 长文阅读底色:APCA 专门讨论浅色底长时间阅读疲劳(调研 06§18)——阅读界面慎用高 L 差组合 / Long-reading surfaces: APCA dedicates a section to light-background long-reading fatigue (research 06 §18) — be careful with high-L pairings in reading UIs
- 暗色主题的强调色:提亮降饱和的系统惯例(M3 #6750A4→#D0BCFF 官方基线,调研 06§7) / Dark-theme accents: the brighten-and-desaturate system convention (M3's official #6750A4→#D0BCFF baselines, research 06 §7)

## 何时不用 / When not to use

- 把「红=紧迫」当因果定律写进需求——色彩心理叙事未获系统证实,只能当假设,A/B 验证后再放大 / Writing 'red = urgency' into requirements as causal law — the lore is not systematically verified; treat it as a hypothesis and A/B it before scaling
- 用情绪色替代状态语义(错误红/成功绿)——色盲用户不可辨;状态须另有图标/文字承载(调研 06§19) / Letting mood colors replace status semantics (error red / success green) — indistinguishable for colorblind users; status needs icons/text too (research 06 §19)
- 情绪优先压过对比度红线——正文 AA 4.5:1 是硬约束(WCAG SC 1.4.3,对比度不得四舍五入,调研 06§17) / Letting mood override the contrast floor — body AA 4.5:1 is a hard constraint (WCAG SC 1.4.3, ratios never rounded, research 06 §17)
- 暗色主题沿用亮色饱和度——「暗色避免过度饱和」有可验证出处(hype4,调研 06§9),M3 官方基线也演示了降饱和方向 / Carrying light-theme saturation into dark themes — 'dark modes avoid oversaturation' has a verifiable source (hype4, research 06 §9), and M3's official baselines demonstrate the desaturation direction

## 来源 / Sources

- https://hype4.academy/articles/design/60-30-10-rule-in-ui
- https://github.com/Myndex/SAPC-APCA
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
