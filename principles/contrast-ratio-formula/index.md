# Contrast Ratio Formula / 对比度比值公式

- 页面 / Page: /uiux-atlas/principles/contrast-ratio-formula/
- English page: /uiux-atlas/en/principles/contrast-ratio-formula/
- 本页 / This file: /uiux-atlas/principles/contrast-ratio-formula/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: WCAG relative luminance · relative luminance · 4.5:1 · contrast ratio
- 简介 / Tagline: WCAG 2.1 对比度的完整推导:8bit→[0,1]→γ 解码→0.2126R+0.7152G+0.0722B 相对亮度→(L1+0.05)/(L2+0.05)——demo 输入两色实时算比值并按 AA/AAA 阈值判定。
- Tagline (EN): The full WCAG 2.1 derivation: 8-bit→[0,1]→γ decode→0.2126R+0.7152G+0.0722B relative luminance→(L1+0.05)/(L2+0.05) — feed two colors, get the ratio live, judged against the AA/AAA gates.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| fg | color · hex | #767676 |
| bg | color · hex | #ffffff |

## 适用场景 / When to use

- 设计 token 定稿:每个 文字/背景 对在浅深两主题下各算一次比值再入库 / Design-token sign-off: compute each text/background pair under both themes before tokens ship
- 灰阶阶梯生成:给一排灰找「最后一个过 4.5:1 的档」,即 AA 临界灰 / Generating gray ramps: find the last step that clears 4.5:1 — the AA-critical gray
- 无障碍审计与合规:WCAG 2.x / EN 301 549 的法定口径就是这条公式 / Accessibility audits and compliance: WCAG 2.x / EN 301 549 legally hinge on this exact formula
- 组件库文档:给色彩 token 表附上实测比值,评审时不用争论「看着够不够」 / Component-library docs: attach measured ratios to color tokens so reviews stop arguing about appearances

## 何时不用 / When not to use

- 对深底浅字只报比值不验可读——比例制对亮色文字会系统性高估可读性(§适用边界) / Reporting the ratio alone for light-on-dark — the proportional metric systematically overestimates readability there
- 拿 AA 通过当终点——正文 AAA 7:1 才是 Apple/Ant 的企业内标,4.5:1 是法定下限不是目标 / Treating AA as the finish line — AAA 7:1 for body text is Apple's and Ant's internal bar; 4.5:1 is the legal floor, not the goal
- 对半透明叠加层只算最终合成色的比值——叠加随背景滚动变化,必须按最亮/最暗两端各自核对 / Computing one ratio for translucent overlays — the composite shifts as backdrop scrolls; check the brightest and darkest extremes separately
- 四舍五入达标:4.49:1 写成 4.5:1——比值必须原值过线 / Rounding up to pass: 4.49:1 written as 4.5:1 — the raw value must clear the gate

## 来源 / Sources

- https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
- https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
- https://www.w3.org/TR/WCAG21/#contrast-minimum
