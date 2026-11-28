# Soft-Glow Design / 柔光设计

- 页面 / Page: /uiux-atlas/styles/soft-glow-design/
- English page: /uiux-atlas/en/styles/soft-glow-design/
- 本页 / This file: /uiux-atlas/styles/soft-glow-design/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 柔光设计 · 柔光美学 · Soft-Glow Aesthetics · Glow-First Design
- 简介 / Tagline: 以「光」而非「色块」组织层级的暗场设计语言:低填充玻璃面板做导航层、内容层保持高可读实底;每个发光元素都有单一方向光源;光色与内容主色同族。
- Tagline (EN): A dark-stage design language that organizes hierarchy through light rather than color blocks: low-fill glass panels carry the nav layer, content stays on highly readable solid surfaces; every glowing element answers to a single directional light; glow color stays kin to the content's key color.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | dimension · deg | 32deg |
| bloom | dimension · px | 40px |
| layers | enum: 1 · 2 · 3 | 2 |

## 适用场景 / When to use

- 暗场产品:开发者工具、音乐/媒体、游戏与品牌站——「光」是天然的主题语言(调研 17 §9) / Dark-stage products: developer tools, music/media, games and brand sites — light is the natural thematic language (research 17 §9)
- 导航层玻璃 + 内容层实底的二分结构(Apple HIG 原则的流派化落地,调研 17 §0/§9) / The glass-nav / solid-content split (a stylized landing of Apple's HIG principle, research 17 §0/§9)
- 需要「面板参与场景光照」的品牌叙事:产品图、仪表盘、英雄区 / Brand narratives where panels participate in scene lighting: product shots, dashboards, heroes

## 何时不用 / When not to use

- 浅色主题:柔光的「暗场 + 泛光」前提在亮底上不成立(改用玻璃参数收敛的 glassmorphism) / Light themes: the dark-stage + bloom premise fails on bright ground (fall back to glassmorphism with tightened glass params)
- 内容层玻璃化:官方明确玻璃不进内容层、全站 ≤3 层(调研 17 §11.10) / Glassifying the content layer: Apple keeps glass out of content and ≤3 layers site-wide (research 17 §11.10)
- 多光源色相混用:两个主光色打架时,「单一方向光源」的流派前提崩塌 / Mixing multiple key-light hues: two competing lights collapse the single-directional-light premise

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/videos/play/wwdc2025/219/
- https://en.wikipedia.org/wiki/Liquid_Glass
- https://github.com/VII-Cae/hyalite--liquid-glass
- https://github.com/itsEricWu/ericwu.me
