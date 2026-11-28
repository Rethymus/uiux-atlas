# ThemeShadow (Fluent) / Fluent 主题阴影

- 页面 / Page: /uiux-atlas/materials/theme-shadow/
- English page: /uiux-atlas/en/materials/theme-shadow/
- 本页 / This file: /uiux-atlas/materials/theme-shadow/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: Fluent / Fluent
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 主题阴影 · Fluent elevation shadow · ThemeShadow
- 简介 / Tagline: Fluent ThemeShadow:以元素的 z 坐标(elevation)驱动一套预配置阴影——光照、主题、环境自动适配;非 Popup 场景需显式指定 Receivers,且只支持矩形投影。
- Tagline (EN): Fluent ThemeShadow: a preset shadow driven by the element's z coordinate (elevation), auto-adapting to light, theme and surroundings; non-Popup usage must declare Receivers, and only rectangular shadows are supported.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| elevation | number | 8 |
| opacity | number · % | 100% |

## 适用场景 / When to use

- WinUI/UWP 浮层与卡片层级:popup、flyout、dialog 用 ThemeShadow 自动接环境 / WinUI/UWP overlays and card hierarchies: popups, flyouts and dialogs take ThemeShadow's environment-awareness for free
- 跨平台设计系统里用 z 值做层级语言:0/4/8/16/32 分档,与 Web 端阴影近似公式对齐 / z values as the elevation language in cross-platform systems: 0/4/8/16/32 steps aligned with a Web shadow approximation
- 拖拽抬升:被拖起的元素临时提高 z,落点恢复——Fluent 深度模型的典型交互 / Drag lift: temporarily raise z while dragging, restore on drop — the canonical Fluent depth interaction
- 主题/明暗自动适配的场景:ThemeShadow 随主题调整阴影参数,无需手写两套阴影 / Theme-adaptive surfaces: ThemeShadow retunes itself per theme, no hand-written dual shadow sets

## 何时不用 / When not to use

- 非矩形投影需求——ThemeShadow 仅支持矩形阴影,异形投影必须改用 DropShadow(调研 02§C5) / Non-rectangular shadows — ThemeShadow is rectangle-only; irregular shapes require DropShadow (research 02 §C5)
- 非 Popup 元素不设 Receivers 就期望阴影出现——必须显式指定投影接收元素 / Expecting shadows on non-Popup elements without setting Receivers — the receiving elements must be declared explicitly
- 把 Web demo 的近似公式当成 Fluent 输出——两者数值不可互换 / Treating the Web demo's approximation as Fluent output — the two are not numerically interchangeable
- 用加深阴影表达可点击——Fluent 深度表达层级,不表达可交互性 / Using heavier shadows to mean clickable — Fluent depth encodes hierarchy, not interactivity

## 来源 / Sources

- https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.themeshadow
