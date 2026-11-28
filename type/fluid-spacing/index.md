# Fluid Spacing / 流式间距

- 页面 / Page: /uiux-atlas/type/fluid-spacing/
- English page: /uiux-atlas/en/type/fluid-spacing/
- 本页 / This file: /uiux-atlas/type/fluid-spacing/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 流式间距 · Utopia 间距 · 间距标尺
- 简介 / Tagline: 间距令牌也走 clamp:--space-3xs…3xl 沿视口线性伸缩,一端定值、中间插值,布局留白随屏宽呼吸而非断点跳变。
- Tagline (EN): Spacing tokens ride clamp too: --space-3xs…3xl stretch linearly with the viewport — fixed at both ends, interpolated between — so whitespace breathes instead of jumping at breakpoints.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| minViewport | number · px | 480px |
| maxViewport | number · px | 1440px |
| minSpace | number · rem | 1.125rem |
| maxSpace | number · rem | 1.25rem |

## 适用场景 / When to use

- 区块留白:section padding 随视口在 24–40px 间呼吸,省掉一堆断点 / Section whitespace: padding breathing across 24–40px with the viewport, no breakpoint pile-ups
- 卡片内边距与栅格 gap:一套 --space-* 令牌同时驱动 padding/gap/margin / Card padding and grid gaps: one --space-* ladder driving padding, gap and margin alike
- 与流式字阶同源生成,组成整套流式设计系统令牌 / Generated from the same source as the fluid type scale, forming a full fluid design-system token set
- 阅读型页面:正文区间留白克制,展示区区间留白放大(m/l/xl 令牌) / Editorial pages: restrained whitespace around body copy, amplified around display sections (m/l/xl tokens)

## 何时不用 / When not to use

- 让 3xs/2xs 这类微间距也大幅流式——3–10px 的微间距两端几乎无差,白做插值 / Strongly fluid micro-spacing (3xs/2xs) — the 3–10px range has almost no span, so interpolation buys nothing
- 间距斜率大过字阶斜率——留白比字号变得更快会让版面比例失衡 / Spacing slope steeper than the type slope — whitespace moving faster than text unbalances composition
- 随意手写间距值绕过令牌——流式令牌的前提是所有留白都走同一标尺 / Hand-written spacing values bypassing the tokens — the whole premise is that every gap rides one scale
- 在极宽视口(如 2560px+)继续放大留白——超过 maxViewport 后已是定值,无需更长区间 / Growing whitespace past 2560px+ — beyond maxViewport tokens are already fixed; a longer range adds nothing

## 来源 / Sources

- https://utopia.fyi/space/calculator/
- https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()
