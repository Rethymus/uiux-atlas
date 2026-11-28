# Liquid Glass / 液态玻璃

- 页面 / Page: /uiux-atlas/materials/liquid-glass/
- English page: /uiux-atlas/en/materials/liquid-glass/
- 本页 / This file: /uiux-atlas/materials/liquid-glass/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Apple HIG / Apple HIG
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 液态玻璃 · 苹果玻璃材质 · Glass Effect
- 简介 / Tagline: Apple iOS 26 全平台统一动态材质:为控件与导航形成独立『功能层』浮在内容之上;regular/clear 两变体,clear 在亮背景上叠 35% 深色 dimming 层。
- Tagline (EN): Apple's unified dynamic material from iOS 26: forms a separate 'functional layer' for controls and nav floating above content; two official variants — regular and clear, the latter stacking a 35% dark dimming layer over bright backdrops.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| variant | enum: regular · clear | regular |
| dimming | number · % | 35% |
| blur | dimension · px | 20px |
| tint | number · % | 0% |
| refraction | number | 34 |
| morph | enum: pod · panel | pod |

## 适用场景 / When to use

- 浮动控件层:tab bar、工具条、媒体播放控件——官方定位为控件与导航的『功能层』(调研 02 §1 A1) / Floating control layers: tab bars, toolbars, media transport — officially positioned as the 'functional layer' for controls and nav (research 02 §1 A1)
- 照片/视频等丰富背景之上的浮动按钮(clear 变体的官方适用场景) / Floating buttons over photos/videos and other rich backdrops (the official clear-variant use case)
- 滚动内容之上的常驻操作入口,内容可从其下方穿透滚动 / Persistent entry points over scrolling content, which passes through beneath them

## 何时不用 / When not to use

- 内容层:官方明确『不要把 Liquid Glass 用于内容层』(调研 02 §1 A1) / Content layers: Apple explicitly says not to use Liquid Glass for content (research 02 §1 A1)
- 过度使用:官方明确不要滥用;玻璃叠玻璃会让透出层互相发浑 / Overuse: Apple warns against it; glass stacked on glass turns muddy
- 正文阅读区与密集数据——半透明材质稀释对比度 / Body-reading areas and dense data — translucent materials dilute contrast
- 纯色平面背景——没有可折射/模糊的内容时玻璃感不成立 / Flat solid backdrops — with nothing to refract or blur the glass feel collapses

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/swiftui/glass
- https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass
- https://developer.apple.com/videos/play/wwdc2025/219/
