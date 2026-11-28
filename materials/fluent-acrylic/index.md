# Fluent Acrylic / Fluent 亚克力

- 页面 / Page: /uiux-atlas/materials/fluent-acrylic/
- English page: /uiux-atlas/en/materials/fluent-acrylic/
- 本页 / This file: /uiux-atlas/materials/fluent-acrylic/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Fluent / Fluent
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 亚克力 · Acrylic · Fluent 亚克力
- 简介 / Tagline: Microsoft Fluent 的半透明材质画刷:背景模糊 + 亮度混合 + 色调层 + 噪点,分 background(透出桌面)与 in-app(应用内)两型;Web 复刻用 tintOpacity / tintLuminosityOpacity 近似。
- Tagline (EN): Microsoft Fluent's translucent material brush: backdrop blur + luminosity blend + tint layer + noise, in background (desk-through) and in-app variants; the web recreation approximates it via tintOpacity / tintLuminosityOpacity.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| tintOpacity | number | 0.6 |
| tintLuminosityOpacity | number | 0.35 |
| fallback | enum: off · on | off |

## 适用场景 / When to use

- in-app acrylic:应用内侧栏、命令栏、浮出面板等支撑层(官方适用) / in-app acrylic: sidebars, command bars, flyouts and other supporting surfaces (official use)
- background acrylic:transient UI——菜单、弹出层短暂透出桌面(官方适用) / background acrylic: transient UI — menus and popovers briefly seeing through the desktop (official use)
- 需要『表面有材质感但不抢内容』的卡片与容器 / Cards and containers that need a material feel without competing with content

## 何时不用 / When not to use

- 正文阅读区与密集数据——色调+噪点层会稀释对比度 / Body-reading areas and dense data — tint + noise layers dilute contrast
- 高流动性内容上大面积使用——每帧重采样代价高 / Large areas over fast-moving content — per-frame re-sampling gets expensive
- 把 Web 复刻的 tintOpacity 数值当官方默认——调研仅记载参数名,数值未证实 / Treating the web tintOpacity numbers as official defaults — the research records parameter names only, values unverified

## 来源 / Sources

- https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic
- https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.acrylicbrush
