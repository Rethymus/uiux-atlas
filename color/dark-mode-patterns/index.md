# Dark Mode Patterns / 暗色设计模式

- 页面 / Page: /uiux-atlas/color/dark-mode-patterns/
- English page: /uiux-atlas/en/color/dark-mode-patterns/
- 本页 / This file: /uiux-atlas/color/dark-mode-patterns/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 暗色四模式 · dark mode 不是反转 · dark theme patterns
- 简介 / Tagline: 暗色不是浅色的反转:Apple 原文「not necessarily inversions」。四个模式——分层(base/elevated 靠提亮)、饱和度(accent 提亮降饱和)、阴影(层级让位给表面)、品牌色(accent 换对、图片压暗)。
- Tagline (EN): Dark mode is not the light palette inverted — Apple's own words: 'not necessarily inversions'. Four patterns: layering (base/elevated lift), saturation (accent brightens & desaturates), shadows (surface lift takes over), brand color (swap the accent pair, dim imagery).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| strategy | enum: light · dark-inverted · dark-semantic | dark-semantic |
| accentLight | color · hex | #6750A4 |
| accentDark | color · hex | #D0BCFF |
| elevation | enum: base · raised · overlay | raised |

## 适用场景 / When to use

- 为既有浅色产品补暗色主题:先决定「不反转」的四模式清单,再逐层换语义变量 / Adding dark mode to an existing light product: decide the 'no inversion' four-pattern list first, then swap semantic variables layer by layer
- 深色界面上叠深色界面(卡片/抽屉/模态):层级用表面提亮表达(Apple base/elevated,调研 06§13) / Dark-on-dark stacking (cards, drawers, modals): convey tiers by lifting surfaces (Apple base/elevated, research 06 §13)
- 品牌色直接上暗底发闷或刺眼时:按 M3 惯例准备提亮降饱和的暗色对(#6750A4→#D0BCFF,调研 06§7) / When a brand color turns muddy or harsh on dark: prepare a brightened, desaturated dark pair per the M3 convention (#6750A4→#D0BCFF, research 06 §7)
- 暗色下白底截图/插图「发光」:给图片内容压暗处理(Apple HIG 建议,调研 06§13) / White-background screenshots or illustrations glowing in dark mode: dim the image content (Apple HIG's advice, research 06 §13)

## 何时不用 / When not to use

- 把浅色调色板 L 值逐个翻转当暗色主题——Apple 原文否定(not necessarily inversions,调研 06§12);demo 的 dark-inverted 档即此反模式 / Flipping each light-palette lightness value and calling it a dark theme — Apple's own wording rejects it ('not necessarily inversions', research 06 §12); the demo's dark-inverted tier is exactly this anti-pattern
- 硬编码文字色/背景色/图标色不随主题翻转——Android 文档点名的暗色翻车点(调研 06§12) / Hard-coded text/background/icon colors that never flip — the dark-mode failure list the Android docs call out (research 06 §12)
- 暗色下继续用亮色那套高饱和强调色——对比过高造成视觉疲劳(hype4,调研 06§13) / Reusing the light theme's high-saturation accents on dark — excessive contrast causes visual fatigue (hype4, research 06 §13)
- 做 app 级手动外观开关与系统设置打架——Apple HIG 不建议(调研 06§12);需要时改写 color-scheme 而非另写一套硬编码色 / An app-level manual appearance toggle that fights the OS setting — discouraged by Apple HIG (research 06 §12); rewrite color-scheme instead of maintaining a second hard-coded palette

## 来源 / Sources

- https://developer.apple.com/design/human-interface-guidelines/dark-mode
- https://developer.android.com/develop/ui/views/theming/darktheme
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://github.com/primer/primitives
