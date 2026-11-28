# SwiftUI Materials / SwiftUI 材质

- 页面 / Page: /uiux-atlas/materials/swiftui-materials/
- English page: /uiux-atlas/en/materials/swiftui-materials/
- 本页 / This file: /uiux-atlas/materials/swiftui-materials/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Apple HIG / Apple HIG
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: SwiftUI 材质 · 系统材质 · UIBlurEffect · vibrancy
- 简介 / Tagline: SwiftUI 的六档背景材质(ultraThin…ultraThick、bar):介于前景与背景间的半透明层,前景自动获得 vibrancy;Web 端只能用 CSS 变量做近似对照。
- Tagline (EN): SwiftUI's six background materials (ultraThin…ultraThick, bar): translucent layers between foreground and background that grant the foreground vibrancy; on the web they can only be approximated with CSS variables.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| material | enum: ultraThin · thin · regular · thick · ultraThick · bar | regular |
| vibrancy | enum: default · secondary · tertiary · quaternary | default |

## 适用场景 / When to use

- 工具条与标签栏(bar 材质的官方场景),列表行、卡片底等支撑层 / Toolbars and tab bars (the official bar-material scene), list rows and card substrates
- 临时浮层:sheet、popover、菜单——按厚薄档位表达层级 / Transient surfaces: sheets, popovers, menus — tier thickness expresses hierarchy
- 需要前景 vibrancy 的标签/图标层(材质之上前景自动获得 vibrancy,A8) / Label/icon layers that need foreground vibrancy (foreground over a material gets it automatically, A8)

## 何时不用 / When not to use

- ultraThin/thin 上放 quaternary 层级内容——官方禁用,对比度不足(A10) / quaternary-tier content on ultraThin/thin — officially disallowed for insufficient contrast (A10)
- 用自定义前景色替代 vibrancy 后仍期待系统对比度——自定义 foregroundStyle 会关闭 vibrancy(A8) / expecting system contrast after overriding the foreground — a custom foregroundStyle disables vibrancy (A8)
- 把 Web 近似数值当成官方数值——Apple 未公布材质的透明度/模糊数值 / treating web approximation numbers as official — Apple publishes no alpha/blur figures for materials

## 来源 / Sources

- https://developer.apple.com/documentation/swiftui/material
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/uikit/uiblureffect
