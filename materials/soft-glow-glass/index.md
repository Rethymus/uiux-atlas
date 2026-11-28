# Soft-Glow Glass / 柔光玻璃

- 页面 / Page: /uiux-atlas/materials/soft-glow-glass/
- English page: /uiux-atlas/en/materials/soft-glow-glass/
- 本页 / This file: /uiux-atlas/materials/soft-glow-glass/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 柔光玻璃 · 发光玻璃 · Glow Glass · Lit-Edge Glass
- 简介 / Tagline: 玻璃基底 + 向内渗光(inner bleed)+ 向外泛光(bloom)+ 受光亮边(lit edge)三件套:面板自己成为场景里的光源之一,而不只是被动模糊背景。
- Tagline (EN): Glass base + inward light bleed + outward bloom + a lit edge: the panel becomes a light source in the scene instead of passively blurring what's behind it.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| glowHue | dimension · deg | 32deg |
| blur | dimension · px | 14px |
| bleed | number · % | 30% |
| bloom | dimension · px | 40px |
| edge | number · % | 45% |

## 适用场景 / When to use

- 暗场氛围面板:音乐播放器、媒体卡片、英雄区主视觉——面板成为场景光源(调研 17 §1.1) / Dark ambient panels: music players, media cards, hero visuals — the panel acts as a scene light source (research 17 §1.1)
- 导航层浮动玻璃——与 Liquid Glass「只在导航层、节制使用」的官方定位一致(调研 17 §11.10) / Glass in the navigation layer — consistent with Liquid Glass' official 'nav layer only, sparingly' positioning (research 17 §11.10)
- 品牌强调卡:光色与品牌主色同族时的氛围强调 / Brand accent cards: atmospheric emphasis when the glow color matches the brand's key color

## 何时不用 / When not to use

- 内容层正文与密集数据——发光稀释对比度,Apple 明确玻璃不进内容层(调研 17 §0) / Content-layer body text and dense data — glow dilutes contrast, and Apple keeps glass out of the content layer (research 17 §0)
- 浅色亮底场景:bloom 泛光在亮背景上不可见且易洗白文字 / Pale, bright scenes: bloom is invisible on bright backdrops and washes out text
- 全站超过三层的玻璃堆叠——层级感先死(调研 17 §11.10) / More than three glass layers site-wide — hierarchy dies first (research 17 §11.10)

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/videos/play/wwdc2025/219/
- https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views
- https://github.com/VII-Cae/hyalite--liquid-glass
- https://github.com/rdev/liquid-glass-react
