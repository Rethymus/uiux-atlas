# M3 Tone Surfaces / M3 色调表面

- 页面 / Page: /uiux-atlas/color/m3-tone-surfaces/
- English page: /uiux-atlas/en/color/m3-tone-surfaces/
- 本页 / This file: /uiux-atlas/color/m3-tone-surfaces/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: surface-container 五档 · tone-based surfaces · 色调表面
- 简介 / Tagline: Material 3 用五档 tone 化表面角色(surface container lowest / low / (container) / high / highest)取代「surface + elevation 叠加不透明度」:层级由色调值表达,与海拔解耦。
- Tagline (EN): Material 3 replaces 'surface + elevation opacity overlays' with five tonal surface roles (surface container lowest / low / (container) / high / highest): hierarchy is expressed as tone values, decoupled from elevation.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: light · dark | light |
| tier | enum: lowest · low · container · high · highest | container |
| hue | dimension · deg | 320deg |
| chroma | number | 0.02 |

## 适用场景 / When to use

- 同一界面的层级表达:页面底 → lowest,列表分区 → low,卡片容器 → container,悬浮面板 → high/highest / Expressing hierarchy in one screen: page base → lowest, list sections → low, card containers → container, floating panels → high/highest
- 暗色模式的层级:靠提亮而非阴影/描边——「前台呈现更亮」的系统惯例(Apple base/elevated 同构,调研 06§14) / Dark-mode hierarchy by brightening instead of shadows/outlines — the 'foreground renders brighter' system convention (mirrored in Apple's base/elevated, research 06 §14)
- 动态取色系统:壁纸换色时五档一起重映射,层级关系不变(Android Material You 的角色化用法,调研 06§6/§7) / Dynamic color systems: when the wallpaper changes the color, all five tiers remap together and hierarchy survives (Android Material You's role-based usage, research 06 §6/§7)
- 替代 elevation 阴影的扁平化设计:层级用色调差而不是投影,减少视觉噪音 / Flat designs replacing elevation shadows: hierarchy via tonal difference instead of drop shadows, cutting visual noise

## 何时不用 / When not to use

- 档位间距离过近——相邻档位小于感知可辨差时,层级信息消失(仍需维持与 on-surface 文字的 3:1 成对对比,调研 02§B6) / Tiers spaced too tightly — when adjacent tiers sit under the just-noticeable difference the hierarchy vanishes (while still holding the paired 3:1 contrast with on-surface text, research 02 §B6)
- 表面色度调高还叠大段正文——彩色表面吃掉文字对比度余量,正文 AA 4.5:1 优先(WCAG SC 1.4.3) / Raised surface chroma under long body text — the colored surface eats text contrast headroom; body-text AA 4.5:1 comes first (WCAG SC 1.4.3)
- 深色主题沿用亮色方向的阶梯(档位越高层级越暗)——与系统提亮惯例相反,层级会读反 / Reusing the light-direction ladder in dark themes (higher tier = darker) — inverts against the brightening convention and reads as reversed hierarchy
- 把五档当装饰色带用——档位是层级语义,跨级跳用(如 lowest 直跳 highest)会破坏相邻档的层读 / Treating the five tiers as decorative bands — tiers are hierarchy semantics; skipping levels (lowest straight to highest) breaks the adjacency reading

## 来源 / Sources

- https://m3.material.io/blog/tone-based-surface-color-m3
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://github.com/material-foundation/material-color-utilities
