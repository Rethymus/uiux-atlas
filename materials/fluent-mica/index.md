# Fluent Mica / Fluent 云母

- 页面 / Page: /uiux-atlas/materials/fluent-mica/
- English page: /uiux-atlas/en/materials/fluent-mica/
- 本页 / This file: /uiux-atlas/materials/fluent-mica/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Fluent / Fluent
- 参数化程度 / Parameterization: 1/3
- 别名 / Aliases: 云母 · Mica · Mica Alt
- 简介 / Tagline: Microsoft Fluent 的不透明动态材质:仅采样桌面壁纸一次,绘制长驻窗口背景——与逐元素实时透出的 Acrylic 相对;Mica Alt 是强着色变体。
- Tagline (EN): Microsoft Fluent's opaque dynamic material: samples the desktop wallpaper once to paint a long-lived window background — the counterpart to element-by-element live Acrylic; Mica Alt is the strongly-tinted variant.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| variant | enum: mica · mica-alt | mica |
| tint | number · % | 50% |

## 适用场景 / When to use

- 长驻主窗口背景:应用框架、设置页、文档工作区(官方场景) / Long-lived main-window backgrounds: app frames, settings pages, document workspaces (the official scene)
- tab 式标题栏等需要强应用标识的场景(mica-alt 官方适用) / Tabbed title bars and scenes needing strong app identity (the official mica-alt use)
- 性能敏感的大面积表面——单次采样比逐元素实时透出便宜得多 / Large performance-sensitive surfaces — one sample is far cheaper than element-by-element live transparency

## 何时不用 / When not to use

- transient UI(菜单、弹出层)——官方为这类场景保留的是 Acrylic(调研 02 §3 C1/C2) / Transient UI (menus, popovers) — Acrylic is the official material for those (research 02 §3 C1/C2)
- 需要内容透出窗口的浮层——Mica 不透明,做不到逐元素透视 / Overlays that must transmit window content — Mica is opaque and cannot do per-element see-through
- 把 Web 近似的 tint 数值当官方默认——调研未记载官方数值 / Treating the web tint numbers as official defaults — the research records no official figures

## 来源 / Sources

- https://learn.microsoft.com/en-us/windows/apps/design/style/mica
