# OKLCH Conversion / OKLCH 转换公式

- 页面 / Page: /uiux-atlas/color/oklch-conversion/
- English page: /uiux-atlas/en/color/oklch-conversion/
- 本页 / This file: /uiux-atlas/color/oklch-conversion/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: OKLab · sRGB to OKLCH · color space matrix · Bottosson OKLab
- 简介 / Tagline: sRGB→线性→LMS→OKLab→OKLCH 的完整矩阵推导:γ 解码、3×3 矩阵、逐通道立方根、柱坐标——零依赖 JS 实现,往返误差 10⁻⁷ 量级。
- Tagline (EN): The full sRGB→linear→LMS→OKLab→OKLCH matrix chain: gamma decode, two 3×3 matrices, per-channel cube roots, cylindrical coordinates — zero-dependency JS with round-trip error at the 10⁻⁷ scale.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| source | color · hex | #ff0000 |

## 适用场景 / When to use

- 设计系统构建期:把 OKLCH 设计值编译成 sRGB 回退与Wide-gamut双份 token / Design-system build time: compile OKLCH design values into paired sRGB fallback + wide-gamut tokens
- 色阶生成:在 OKLCH 域插值(短弧 H)再回 sRGB 交付,中途不发灰 / Palette generation: interpolate in OKLCH (short-arc H) then hand back sRGB — no mid-curve gray-out
- 对比度工具:任何空间先进线性域再算 WCAG 亮度(本条 γ 解码与 WCAG 同口径) / Contrast tooling: enter linear space first, then compute WCAG luminance (same gamma decode as WCAG)
- 教学/评审:展示一条颜色的 L、C、H 从哪里来,数值可逐位审计 / Teaching and review: show where a color's L, C, H come from, auditable digit by digit

## 何时不用 / When not to use

- 把 OKLCH 中间值当最终交付色——超 sRGB 色域(LMS 非物理值)必须先裁剪 / Shipping raw OKLCH intermediates as final colors — out-of-sRGB-gamut LMS must be clipped first
- 在 sRGB gamma 域直接插值再声称『感知均匀』——灰阶中途塌陷正是这条链要解决的问题 / Interpolating in gamma-encoded sRGB and calling it perceptually uniform — the mid-curve collapse is exactly what this chain fixes
- 手抄矩阵常数:16 个常数抄错一位全链错位,务必从实现里复制 / Hand-copying matrix constants: one wrong digit in 16 constants derails the whole chain — copy from the implementation
- 对 α 通道做矩阵运算——α 是直线插值,不参与 LMS / Running the alpha channel through the matrices — α interpolates linearly and never enters LMS

## 来源 / Sources

- https://bottosson.github.io/posts/oklab/
- https://www.w3.org/TR/css-color-4/#color-conversion
- https://www.w3.org/TR/css-color-4/#numeric-srgb
