# HCT Tonal Palette / HCT 色调调色板

- 页面 / Page: /uiux-atlas/color/hct-tonal-palette/
- English page: /uiux-atlas/en/color/hct-tonal-palette/
- 本页 / This file: /uiux-atlas/color/hct-tonal-palette/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: HCT 色调调色板 · 色调调色板 · Tonal Palette
- 简介 / Tagline: Material 的调色板原子:固定 HCT 的色相与色度,只沿 tone(= CIE L*)展开 13 档——Android 系统每个关键色都这样成列。
- Tagline (EN): Material's palette atom: fix HCT hue and chroma, expand only along tone (= CIE L*) into 13 steps — how every key color in Android is built.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | number · deg | 299deg |
| chroma | number | 48 |
| tone | enum: 0 · 10 · 20 · 30 · 40 · 50 · 60 · 70 · 80 · 90 · 95 · 99 · 100 | 80 |

## 适用场景 / When to use

- 从品牌色推导 Material 体系全套色阶:primary/secondary/tertiary/neutral/error 五板共 65 色 / Deriving a full Material scale from a brand color: five palettes (primary/secondary/tertiary/neutral/error) of 65 colors total
- 任何需要『tone 差 = 对比度差』的体系:tone 差 40 保证对比度≥3:1,差 50 保证≥4.5:1(库文档) / Any system where tone delta must mean contrast delta: 40 tone difference guarantees ≥3:1 contrast, 50 guarantees ≥4.5:1 (library docs)
- 亮暗双主题共用一套调色板:只是从 tone 40 列换到 tone 80 列取色 / One palette serving both themes: light reads from tone 40, dark reads from tone 80
- 数据可视化色阶:等感知步长(color-mix 或手写档位都不如 tone 直接) / Data-viz ramps: equal perceptual steps — nothing beats tone for directness

## 何时不用 / When not to use

- 把 HCT 的 hue/chroma 当 HSL 用——两套刻度不重合,直接搬运会得到完全不同的颜色 / Treating HCT's hue/chroma as HSL — the scales differ, so transplanting values produces entirely different colors
- 指望近黑/近白的 tone 保有高色度——sRGB 在 tone 0/100 附近只给灰,这是物理限制而非 bug / Expecting high chroma near tone 0/100 — sRGB only offers gray there; it is physics, not a bug
- 手工在 hex 上『加黑加白』模拟 tone 阶梯——L* 感知均匀性会丢失,档位观感忽大忽小 / Simulating tone steps by mixing black/white into hex — L* uniformity is lost and steps feel uneven

## 来源 / Sources

- https://github.com/material-foundation/material-color-utilities
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
