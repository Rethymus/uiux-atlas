# Mist Glass / 雾面玻璃

- 页面 / Page: /uiux-atlas/materials/mist-glass/
- English page: /uiux-atlas/en/materials/mist-glass/
- 本页 / This file: /uiux-atlas/materials/mist-glass/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 雾面玻璃 · 雾玻璃 · Mist Glass · Heavy Frost
- 简介 / Tagline: 高雾度、低对比:背景被重度均质化(大半径 blur),同时降低饱和与对比,让透出的内容只剩「色温」而非「信息」。与清透磨砂是同一根轴的对数两端。
- Tagline (EN): High haze, low contrast: the backdrop is heavily homogenized (large-radius blur) while saturation and contrast drop, so what shows through carries color temperature, not information. The logarithmic opposite end of the same axis as clear frost.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| density | number | 0.8 |
| contrast | number | 0.88 |
| base | color · hex | #F5F7FA |

## 适用场景 / When to use

- iOS 通知中心/锁屏式毛玻璃:厚磨砂族的系统级场景(Material 枚举对应,调研 17 §3.6) / iOS Notification Center / lock-screen style frost: system-grade thick-frost scenarios (Material enum counterparts, research 17 §3.6)
- 车机/客厅大屏面板:背景杂乱时只要色温不要信息(HIG standard materials 的目标场景,调研 17 §3.6) / Automotive / living-room large-screen panels: keep color temperature, drop information when the backdrop is busy (HIG standard materials' target scenario, research 17 §3.6)
- 需要长文案可读性的浮层:雾度稳定后文字对比不再随背景内容跳动 / Overlays carrying long copy: once misted, text contrast stops jumping with backdrop content

## 何时不用 / When not to use

- 想让背景色彩/内容可辨识的场景——那是清透磨砂(clear-frost)的职责 / Scenes where backdrop color/content should stay legible — that is clear frost's job
- saturate < 1 且 blur < 24px 的中间态:既不雾也不透,是最容易显脏的参数域 / The in-between state (saturate < 1 with blur < 24px): neither mist nor clear — the dirtiest-looking parameter range
- 纯白基底:雾里会发蓝(调研 17 §3.3 要点③) / Pure-white base: the mist tints blue (research 17 §3.3, rule ③)

## 来源 / Sources

- https://developer.apple.com/documentation/swiftui/material
- https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
