# 60-30-10 Rule / 60-30-10 法则

- 页面 / Page: /uiux-atlas/color/rule-60-30-10/
- English page: /uiux-atlas/en/color/rule-60-30-10/
- 本页 / This file: /uiux-atlas/color/rule-60-30-10/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 60-30-10 法则 · 三分色占比 · 60/30/10 rule
- 简介 / Tagline: 三色配比口诀:60% 主导色铺画布、30% 辅助色撑表面、10% 强调色做焦点——源自室内设计的指导原则,不是硬性规定。
- Tagline (EN): The three-color proportion heuristic: 60% dominant paints the canvas, 30% secondary carries surfaces, 10% accent makes the focus — an interior-design guideline, not a hard rule.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| dominant | number · % | 60% |
| secondary | number · % | 30% |
| accent | number · % | 10% |

## 适用场景 / When to use

- 内容型产品首屏:中性画布 60% + 卡片/侧栏 30% + 主 CTA 10%(LogRocket 例证:Material 白底/浅灰组件/亮蓝按钮) / Content-product first screens: 60% neutral canvas + 30% cards/sidebar + 10% primary CTA (LogRocket's example: Material white canvas / light-gray components / bright-blue button)
- 给新团队定『色彩预算』时当沟通语言:先分主导/辅助/强调三个角色,再填具体色值 / As the shared language for a team's 'color budget': split dominant/secondary/accent roles first, then fill in concrete values
- 审计现有页面的色彩构成:截图估算三色占比,超过 10% 的强调色通常意味着焦点被稀释 / Auditing an existing page's color composition: estimate the three shares from a screenshot; accent creeping past 10% usually means the focus has been diluted

## 何时不用 / When not to use

- 让所有颜色都鲜艳——hype4 原文告诫:大面积高饱和会让画面『吵』起来 / Making every color vivid — hype4's own warning: large high-saturation areas turn the page 'noisy'
- 单色阶方案:只有一档灰时按钮会『消失』(hype4 提醒)——辅助/强调至少要拉开一档可感知差异 / Single-scale schemes: with only one gray step the button 'disappears' (hype4's caution) — secondary and accent need at least one perceptible step apart
- 暗色模式下过度饱和——对比过高造成视觉疲劳(hype4 原文,调研 06§13);M3 暗色 accent 提亮降饱和(#6750A4→#D0BCFF)是同一告诫的官方注脚 / Oversaturated accents in dark mode — excessive contrast causes visual fatigue (hype4's exact wording, research 06 §13); M3 brightening/desaturating dark accents (#6750A4→#D0BCFF) is the official footnote to the same warning
- 把 60/30/10 当硬性指标逐像素抠——两篇来源都明示它只是指导原则 / Treating 60/30/10 as a hard metric to pixel-chase — both sources explicitly call it a guideline

## 来源 / Sources

- https://blog.logrocket.com/ux-design/60-30-10-rule/
- https://hype4.academy/articles/design/60-30-10-rule-in-ui
