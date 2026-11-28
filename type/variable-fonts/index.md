# Variable Fonts / 可变字体

- 页面 / Page: /uiux-atlas/type/variable-fonts/
- English page: /uiux-atlas/en/type/variable-fonts/
- 本页 / This file: /uiux-atlas/type/variable-fonts/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 可变字体 · OpenType 变体 · font-variation-settings
- 简介 / Tagline: 一个字体文件携带连续轴:font-variation-settings 拨动 wght/opsz,字重与光学字号从离散档位变成连续滑杆。
- Tagline (EN): One font file carrying continuous axes: font-variation-settings turns wght/opsz dials — weight and optical size become continuous sliders instead of discrete cuts.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| wght | number | 400 |
| opsz | number | 14 |

## 适用场景 / When to use

- 设计系统的字重细谱:350/450/650 这类非静态档位,一行 CSS 完成 / Fine weight spectra in design systems — 350/450/650 cuts in one CSS line
- 标题排版用 display 光学档(opsz 调高)、小字 UI 用 text 档(opsz 调低) / Display optical sizes for headlines (opsz up) and text optical sizes for small UI (opsz down)
- 单一字体文件替代 9 个静态字重回退,减少请求数与 FOUT 概率 / One variable file replacing nine static weight files — fewer requests, less FOUT
- hover/交互态在字重轴上做 ±50 微移(克制使用,避免布局抖动) / Hover states nudging wght by ±50 (used sparingly to avoid layout jitter)

## 何时不用 / When not to use

- 正文用极细字重(接近 100)——细字重在低分辨率与低对比环境下可读性差 / Body text near wght 100 — hairline weights read poorly at low resolution and low contrast
- 把 font-variation-settings 当唯一字重来源却不写 font-weight 兜底——旧浏览器整条丢失 / Relying on font-variation-settings alone with no font-weight fallback — old browsers lose the declaration entirely
- 字重动画铺开到整段正文——每帧重排字形,性能与可读性双输 / Animating weight across body text — glyphs re-rasterize every frame, costing both performance and readability
- 手写轴名拼错大小写(如 Wght)——轴名大小写敏感,静默失效 / Mis-casing axis names (e.g. Wght) — names are case-sensitive and fail silently

## 来源 / Sources

- https://rsms.me/inter/
- https://github.com/rsms/inter
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide
- https://learn.microsoft.com/en-us/typography/opentype/spec/otvaroverview
