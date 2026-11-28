# Iridescent Glass / 极光玻璃

- 页面 / Page: /uiux-atlas/materials/iridescent-glass/
- English page: /uiux-atlas/en/materials/iridescent-glass/
- 本页 / This file: /uiux-atlas/materials/iridescent-glass/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 极光玻璃 · 虹彩玻璃 · 薄膜干涉玻璃 · 油膜玻璃 · Iridescent Glass · Oil-slick Glass
- 简介 / Tagline: hue 随相位漂移的薄膜干涉质感玻璃:同一 conic 渐变的双实例(锐利层做环、模糊层做光)+ 向内渗光,色相沿环缓慢流转,像肥皂膜/油膜上的结构色。与既有 aurora-gradient(背景层渐变)不同,这是面板材质。
- Tagline (EN): Glass with a thin-film interference feel whose hue drifts with phase: twin instances of one conic gradient (a sharp layer draws the ring, a blurred one draws the glow) plus inner light bleed — the hue slowly rotates around the ring like structural color on a soap film. Unlike the existing aurora-gradient (a background gradient), this is a panel material.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| drift | dimension · s | 6s |
| hue | number | 32 |
| bleed | number · % | 30% |

## 适用场景 / When to use

- 暗场品牌 hero、演出/音乐界面的氛围强调卡(结构色是暗场语言) / Dark-field brand heroes and music/event accent cards (structural color is a dark-field language)
- 「柔光玻璃时代」光谱的高端档:比 soft-glow 更彩、比 halo 更柔的面板点睛 / The high end of the soft-glass spectrum: more colorful than soft-glow, softer than halo — a panel accent
- 状态徽章与荣誉卡等小面积「奖牌感」场景 / Small-badge "medal" moments: status badges, achievement cards

## 何时不用 / When not to use

- 内容层大面积使用——玻璃是导航层特权,超三层层级感先死(§11.10) / Large content-layer surfaces — glass is a navigation-layer privilege; past three layers hierarchy dies (§11.10)
- 承载文字正文的表面:虹彩色相流转会持续改变局部背景,正文对比度不可控 / Surfaces carrying body text: the drifting hue keeps shifting the local backdrop, so text contrast is uncontrolled
- 浅色主题大面积使用:结构色依赖暗底衬托,浅底上退成杂色 / Large use in light themes: structural color needs a dark field — on pale grounds it reads as noise

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient
- https://developer.mozilla.org/en-US/docs/Web/CSS/@property
