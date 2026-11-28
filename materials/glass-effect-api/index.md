# Glass Effect API (Liquid Glass) / 玻璃效果 API

- 页面 / Page: /uiux-atlas/materials/glass-effect-api/
- English page: /uiux-atlas/en/materials/glass-effect-api/
- 本页 / This file: /uiux-atlas/materials/glass-effect-api/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Apple HIG / Apple HIG
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 液态玻璃 API · glassEffect · GlassEffectContainer
- 简介 / Tagline: Apple Liquid Glass 的声明式 API 面:glassEffect(_:in:) / Glass(variant、tint、interactive) / GlassEffectContainer(spacing) / glassEffectID morph;本条目用 CSS 近似呈现其参数语义。
- Tagline (EN): Apple Liquid Glass' declarative API surface: glassEffect(_:in:) / Glass (variant, tint, interactive) / GlassEffectContainer(spacing) / glassEffectID morphing — presented here as a CSS approximation of the parameter semantics.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| variant | enum: regular · clear | regular |
| tintIntensity | number · % | 0% |
| interactive | enum: off · on | off |
| spacing | number | 8 |

## 适用场景 / When to use

- iOS 26+/对应平台系统组件的导航栏、标签栏、工具栏(功能层,浮于内容之上) / Nav bars, tab bars and toolbars of system components on iOS 26+-class platforms (functional layers above content)
- 照片/视频之上的浮动控件用 clear 变体(内容偏亮时加 35% 暗层) / Floating controls over photos/video with the clear variant (add the 35% dim layer over bright content)
- 一组相邻控件需要玻璃间融合 morph:GlassEffectContainer + glassEffectID 匹配身份 / Clusters of adjacent controls blending/morphing: GlassEffectContainer plus glassEffectID identity matching
- Web 端复刻同类观感:双层胶囊玻璃 + 高透媒体浮层,以本条目参数近似 / Web recreations of the same look: paired capsule glass and high-transparency media overlays approximated by these params

## 何时不用 / When not to use

- 内容层(列表正文、表单)套 Liquid Glass——HIG 明示勿用于内容层且勿过度使用 / Applying Liquid Glass to content layers (list bodies, forms) — HIG explicitly forbids content-layer use and overuse
- clear 变体放在平色/浅色背景上——高透玻璃在非丰富底上失效(与 glassmorphism 同理) / The clear variant over flat/pale backdrops — high-transparency glass collapses without a rich backdrop (same as glassmorphism)
- 把 Web 近似当成官方渲染——动态折射、scroll edge effect、亮度自适应均无法用静态 CSS 复刻 / Treating the Web approximation as official rendering — dynamic refraction, scroll edge effect and luminance adaptation cannot be replicated in static CSS
- 大段文字直接压在 clear 上——保读责任在 regular;clear 的文字对比度要按最亮背景核算 / Long text directly on clear — legibility is regular's job; on clear, text contrast must be checked against the brightest backdrop

## 来源 / Sources

- https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:)
- https://developer.apple.com/documentation/swiftui/glass
- https://developer.apple.com/documentation/swiftui/glasseffectcontainer
- https://developer.apple.com/design/human-interface-guidelines/materials
