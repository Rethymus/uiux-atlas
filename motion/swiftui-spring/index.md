# SwiftUI Spring / SwiftUI 弹簧

- 页面 / Page: /uiux-atlas/motion/swiftui-spring/
- English page: /uiux-atlas/en/motion/swiftui-spring/
- 本页 / This file: /uiux-atlas/motion/swiftui-spring/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Apple HIG / Apple HIG
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Apple 弹簧 · response/dampingFraction · .spring()
- 简介 / Tagline: SwiftUI .spring(response:dampingFraction:blendDuration:) 两参数弹簧:response 是刚度的时间尺度(秒),dampingFraction 是相对临界阻尼的比例——iOS 原生手感的来源。
- Tagline (EN): SwiftUI's .spring(response:dampingFraction:blendDuration:) two-parameter spring: response is the time-scale of stiffness (seconds), dampingFraction the ratio of critical damping — the source of iOS' native feel.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| response | number · s | 0.5s |
| dampingFraction | number | 0.825 |
| preset | enum: bouncy · snappy · smooth | snappy |

## 适用场景 / When to use

- iOS 原生手感的跨端复刻:用 response/dampingFraction 对齐系统控件 / Cross-platform replication of iOS' native feel: match system controls via response/dampingFraction
- 默认 0.5s/0.825 适合大多数浮层、卡片与切换;想要更利落先调小 response / The 0.5s/0.825 default suits most overlays, cards and toggles; lower response first for snappier feel
- 预设族选型:回弹选 bouncy、通用交互选 snappy、无回弹选 smooth(官方定义见参数说明) / Preset picking: bouncy for bounce, snappy for general interaction, smooth for none (official definitions in the param note)
- 交互驱动的跟手动画:response 调小(趋近 0=无限刚),Apple 明示 0 适合交互驱动 / Interactive, hand-following animation: lower response (0 = infinitely stiff, explicitly recommended for interactive driving)

## 何时不用 / When not to use

- 进度条等连续量——不该有回弹(参考 motion 弹簧条目同款告诫) / Continuous quantities like progress bars — no bounce belongs there (same caveat as the Motion spring entry)
- Web 端把 response/dampingFraction 当官方互换参数直接传给 Motion——两者参数体系不同,必须换算 / Passing response/dampingFraction straight into Motion on the Web as if interchangeable — the parameter systems differ and must be converted
- 高频小控件(checkbox 等)加弹簧——HIG:高频交互避免加动效(调研 04§2.1) / Springs on high-frequency small controls (checkboxes etc.) — Apple HIG: avoid motion on frequent interactions (research 04 §2.1)
- 把预设(bouncy/snappy/smooth)与 response/dampingFraction 混为一谈——预设的官方定义是 duration+bounce 体系 / Conflating the presets (bouncy/snappy/smooth) with response/dampingFraction — the presets are officially defined in the duration+bounce system

## 来源 / Sources

- https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:)
- https://developer.apple.com/documentation/swiftui/animation/bouncy(duration:extrabounce:)
- https://developer.apple.com/documentation/swiftui/animation/snappy(duration:extrabounce:)
- https://developer.apple.com/documentation/swiftui/animation/smooth(duration:extrabounce:)
