# prefers-contrast / 对比度偏好适配

- 页面 / Page: /uiux-atlas/principles/prefers-contrast/
- English page: /uiux-atlas/en/principles/prefers-contrast/
- 本页 / This file: /uiux-atlas/principles/prefers-contrast/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: prefers-contrast 媒体查询 · 高对比适配
- 简介 / Tagline: 检测用户要求更高/更低对比的 CSS 媒体查询:no-preference / more / less / custom 四值;焦点环、分隔线、禁用态文字都应响应增强。
- Tagline (EN): The CSS media query detecting a requested contrast preference: no-preference / more / less / custom; focus rings, dividers and disabled text should all respond.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: auto · more · less · custom | auto |
| ringWidth | dimension · px | 2px |

## 适用场景 / When to use

- 焦点环:less/custom 下虚线 → more 下实线加粗(MDN 官方示例场景) / Focus rings: dashed under less/custom → solid and thicker under more (MDN's example scenario)
- 分隔线、边框、禁用态文字:more 时加深、加硬 / Dividers, borders, disabled text: deepen and harden under more
- 图表网格线与次要文本:less 时可再降低,more 时须回到对比达标 / Chart gridlines and secondary text: can go softer under less, must return to compliant contrast under more

## 何时不用 / When not to use

- 在 more 模式仍保留低对比的灰色占位文本(违背用户明示偏好) / Keeping low-contrast gray placeholder text under more (against an explicit user preference)
- 用 prefers-contrast 重新定义整套配色——那是 forced-colors 的职责;custom 值对应其用户调色板(07§38) / Re-theming the whole palette via prefers-contrast — that's forced-colors' job; the custom value maps to its user palette (07 §38)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast/
