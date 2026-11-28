# light-dark() / 明暗自适应

- 页面 / Page: /uiux-atlas/color/light-dark/
- English page: /uiux-atlas/en/color/light-dark/
- 本页 / This file: /uiux-atlas/color/light-dark/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: light-dark 双值取色 · 双值颜色函数 · CSS dual-value color
- 简介 / Tagline: CSS 内建双值取色函数:light-dark(浅色值, 深色值) 一行声明随系统外观自动切换,免写媒体查询——前提是元素声明了 color-scheme。
- Tagline (EN): CSS's built-in two-value color function: light-dark(light, dark) declares both appearances in one line with no media queries — provided the element declares a color-scheme.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| lightValue | color · hex | #6750A4 |
| darkValue | color · hex | #D0BCFF |
| scheme | enum: system · light · dark | system |

## 适用场景 / When to use

- 主色/文字色/边框色随系统亮暗自动切换:一行一处,无需 JS、无需媒体查询 / Accent, text and border colors that follow the OS appearance automatically: one line per site, no JS, no media queries
- 配 :root { color-scheme: light dark } 让滚动条、表单控件等原生 UI 一并跟随外观 / Pair with :root { color-scheme: light dark } so native UI (scrollbars, form controls) follows the appearance too
- 同一对语义变量在组件多处取色,主题层只换一对值;light-dark() 也接受 <image>(可整段换渐变背景) / One semantic pair consumed across a component, swapped at the theme layer; light-dark() also accepts <image>, so whole gradient backdrops can switch
- 嵌入式 SVG/iframe 继承父元素 color-scheme,嵌入内容也能双态(调研 06§11) / Embedded SVG/iframes inherit the parent's color-scheme, so embedded content dual-modes too (research 06 §11)

## 何时不用 / When not to use

- 忘写 color-scheme——light-dark() 的两个参数全都不取用,颜色直接失效(MDN 原文) / Forgetting color-scheme — neither argument is ever used and the color collapses (MDN's own wording)
- 硬编码文字色/背景色/图标色不随主题翻转——Android 文档列出的暗色翻车点(调研 06§12) / Hard-coded text/background/icon colors that never flip — the dark-mode failure list from the Android docs (research 06 §12)
- app 级手动外观开关与系统设置冲突,Apple HIG 不建议(调研 06§12);若必须提供,应改写 color-scheme 而不是另写一套硬编码色 / App-level manual appearance toggles clash with the OS setting and are discouraged by Apple HIG (research 06 §12); if you must offer one, rewrite color-scheme instead of a second hard-coded palette

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
