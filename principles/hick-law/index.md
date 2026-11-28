# Hick's Law / Hick 定律

- 页面 / Page: /uiux-atlas/principles/hick-law/
- English page: /uiux-atlas/en/principles/hick-law/
- 本页 / This file: /uiux-atlas/principles/hick-law/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 希克定律 · Hick-Hyman Law · 希克-海曼定律
- 简介 / Tagline: 决策时间随选项数量与复杂度上升:备选越多,选得越慢。响应时间关键处要减选项、拆步骤、突出推荐项。
- Tagline (EN): Decision time grows with the number and complexity of choices: more alternatives, slower decisions. Cut options where response time matters, split complex tasks, and surface a recommended option.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| choices | number · 个 | 4个 |
| pause | dimension · ms | 800ms |

## 适用场景 / When to use

- 响应时间关键处(支付、抢购、紧急操作)收窄选项 / Narrow options where response time is critical (checkout, flash sale, emergency actions)
- 把复杂任务拆成小步(向导式表单),逐步揭示 / Split complex tasks into wizard steps that reveal progressively
- 突出推荐选项,避免用户在平权列表中淹没 / Highlight a recommended option instead of a flat sea of equal choices
- 对新用户做渐进式 onboarding(Slack 案例,07§23) / Progressive onboarding for new users (the Slack case, research 07 §23)

## 何时不用 / When not to use

- 为减而减,简化到失真(lawsofux 原文告诫:be careful not to simplify to the point of abstraction) / Simplifying to the point of abstraction — the Laws of UX caveat verbatim
- 在平权长列表上不做任何分组/推荐,把决策全推给用户 / Flat undifferentiated long lists that dump the whole decision on the user

## 来源 / Sources

- https://lawsofux.com/hicks-law/
