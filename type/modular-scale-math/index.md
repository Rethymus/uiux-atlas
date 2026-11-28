# Modular Scale Math / 模数倍率公式

- 页面 / Page: /uiux-atlas/type/modular-scale-math/
- English page: /uiux-atlas/en/type/modular-scale-math/
- 本页 / This file: /uiux-atlas/type/modular-scale-math/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 模数尺 · type scale · geometric scale · Utopia clamp
- 简介 / Tagline: 字阶的数学底座:size(n)=base×ratioⁿ 几何级数出层级、calc() 链式同轴缩放、Utopia 流体 clamp——斜率走 vw、截距藏 rem、两端钳制,一行 CSS 就是一段线性回归。
- Tagline (EN): The math under type scales: size(n)=base×ratioⁿ builds hierarchy, calc() chains keep spacing co-axial, and Utopia's fluid clamp — slope in vw, intercept hidden in rem, both ends clamped — is a linear regression in one line of CSS.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| base | number · px | 16px |
| ratio | enum: 1.067 · 1.125 · 1.2 · 1.25 · 1.3333 · 1.5 · 1.618 | 1.25 |
| steps | number | 3 |
| minViewport | number · px | 360px |
| maxViewport | number · px | 1240px |

## 适用场景 / When to use

- 设计系统字阶一次性推导:一个 base、一个 ratio 生成全部 --step-* / One-shot derivation of a design-system type scale: one base, one ratio, all --step-* tokens
- 无断点流体排版:标题在 360–1240px 视口间线性呼吸(Fluid Type Scale 条目的数学内核) / Breakpoint-free fluid type: headings breathe linearly across 360–1240px viewports (the math inside the Fluid Type Scale entry)
- 间距/行高与字号同轴:calc() 链让派生量跟随同一 --ratio 自乘 / Co-axial spacing and leading: the calc() chain multiplies one --ratio through every derived token
- 设计评审时反查:给定 clamp 串还原 slope/intercept,判断是否越界 / Review-time audit: recover slope/intercept from a clamp string and check it stays in bounds

## 何时不用 / When not to use

- 层级超过 4–5 级后继续乘 ratio——级差指数爆炸,step+3 在 16/1.25 已达 31px,再乘两倍率脱档 / Multiplying ratio past 4–5 levels — gaps explode exponentially; step+3 at 16/1.25 is already 31px
- minVw/maxVw 覆盖不到的视口依赖插值(两端本就是钳制值,超界等于浪费) / Expecting interpolation outside [minVw, maxVw] — both ends are clamps, out-of-range viewports get constants
- 把比率调到 1.067 以下做正文——相邻级肉眼不可分,层级失效 / Body-text ratios under 1.067 — adjacent steps become indistinguishable and hierarchy dies
- 根字号非 16px 时直接套用按 16 折算的 rem 输出——换算错位一整档 / Using 16-based rem output on a site whose root font size is not 16px — everything shifts a notch

## 来源 / Sources

- https://alistapart.com/article/more-meaningful-typography/
- https://utopia.fyi/type/calculator/
- https://www.modularscale.com/
- https://www.w3.org/TR/css-values-4/#calc-serialize
