# Clear Frost / 清透磨砂

- 页面 / Page: /uiux-atlas/materials/clear-frost/
- English page: /uiux-atlas/en/materials/clear-frost/
- 本页 / This file: /uiux-atlas/materials/clear-frost/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 清透磨砂 · 超薄磨砂 · Ultra-Thin Frost · Clear Frost Glass
- 简介 / Tagline: 超薄磨砂:最低限度的模糊半径 + 最低限度的白色填充 + 高饱和 backdrop,让背景色彩尽量原样透过。官方对应 SwiftUI ultraThinMaterial 与 Liquid Glass 的 clear 变体。
- Tagline (EN): Ultra-thin frost: minimal blur radius + minimal white fill + high backdrop saturation so background color passes through almost intact. Official counterparts: SwiftUI ultraThinMaterial and Liquid Glass' clear variant.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| frost | number | 0.25 |
| saturate | number · × | 1.8× |
| fill | number · % | 8% |
| dimming | number · % | 35% |

## 适用场景 / When to use

- 媒体类丰富背景之上的浮动控件:控制中心、媒体播放、快捷开关——clear 变体的官方目标场景(调研 17 §2.6) / Floating controls over rich media backdrops: control centers, media transport, quick toggles — the clear variant's official target scenario (research 17 §2.6)
- visionOS 窗口与控件:系统玻璃以 ultraThin 档保住空间感(Material API 平台表核验 visionOS 1.0+) / visionOS windows and controls: system glass keeps spatial context at the ultraThin grade (Material API platform table verifies visionOS 1.0+)
- 想让照片/视频色彩原样透过的字幕条与角标 / Caption bars and badges that let photo/video color pass through intact

## 何时不用 / When not to use

- 亮背景(照片/视频)上不加 dimming 层直接放文字——官方为此给死了 35% 数值 / Text over bright backdrops with no dimming layer — the official 35% number exists exactly for this
- 常规正文与密集数据:填充太薄,对比度不可控(与 glassmorphism 条目的 avoid 一致) / Regular body text and dense data: the thin fill makes contrast uncontrolled (same avoid-list as the glassmorphism entry)
- 与 regular 档混用于同类控件——WWDC 219 明确两变体不应混用(调研 17 §2.3) / Mixing clear and regular grades on the same class of controls — WWDC 219 says the two variants should not be mixed (research 17 §2.3)

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/swiftui/material
- https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views
- https://github.com/rdev/liquid-glass-react
