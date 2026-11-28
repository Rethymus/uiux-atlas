# Fluid Type Scale / 流式字阶

- 页面 / Page: /uiux-atlas/type/fluid-type-scale/
- English page: /uiux-atlas/en/type/fluid-type-scale/
- 本页 / This file: /uiux-atlas/type/fluid-type-scale/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 流式字阶 · Utopia 字阶 · clamp() 字阶
- 简介 / Tagline: 字号随视口在断点之间线性插值:clamp(下限, rem+vw, 上限) 生成 --step-0..5 字阶,小屏不小于下限、大屏不超过上限,中间平滑缩放。
- Tagline (EN): Font sizes interpolate linearly with the viewport: clamp(floor, rem+vw, ceiling) builds a --step-0..5 ladder — never below the floor, never above the ceiling, smooth in between.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| minViewport | number · px | 480px |
| maxViewport | number · px | 1440px |
| minSize | number · rem | 1rem |
| maxSize | number · rem | 1.25rem |
| ratio | number | 1.25 |

## 适用场景 / When to use

- 全站字阶:一套 --step-0..5 变量接管正文到 display 标题,断点之间不再跳变 / Site-wide scale: one --step-0..5 ladder drives body through display headlines with no breakpoint jumps
- 长文页与营销页标题随屏宽伸缩,替代成摞的媒体查询字号覆盖 / Article and marketing headlines that scale with the viewport, replacing stacks of media-query font-size overrides
- hero/display 大字在移动端自动收敛到可读下限,不会撑破版心 / Hero/display type collapsing to a readable floor on mobile without blowing the measure
- 设计令牌层:与 Utopia 流式间距同构,组成整套流式设计系统 / As a token layer: isomorphic with Utopia fluid spacing, forming a whole fluid design system

## 何时不用 / When not to use

- 纯 vw 字号(无 rem 下限)——用户放大系统字号无法补救,违反 WCAG 1.4.4 调整文本 / Pure-vw sizes with no rem floor — zooming the OS font cannot rescue them (WCAG 1.4.4 Resize Text)
- 正文 --step-0 也大幅流式——正文两端差应控制在 1–2 级,否则小屏过大、大屏过小 / Strongly fluid body text — keep --step-0 within 1–2 steps of range or it reads huge on phones, tiny on desktops
- 行高不随字阶收紧——大标题沿用正文行高会松散,正文行高低于 1.5 违反 WCAG 1.4.12 / Line-height not tightening per step — display sizes inherit body leading; body under 1.5 violates WCAG 1.4.12
- 视口区间取过宽(如 320–2560)——斜率被摊平,桌面端几乎看不到缩放,白做流式 / An overly wide viewport range (e.g. 320–2560) flattens the slope until desktop scaling is invisible

## 来源 / Sources

- https://utopia.fyi/type/calculator/
- https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()
- https://www.modularscale.com/
