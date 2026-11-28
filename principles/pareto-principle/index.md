# Pareto Principle / 帕累托法则

- 页面 / Page: /uiux-atlas/principles/pareto-principle/
- English page: /uiux-atlas/en/principles/pareto-principle/
- 本页 / This file: /uiux-atlas/principles/pareto-principle/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 80/20 法则 · 80-20 Rule · 二八法则
- 简介 / Tagline: 约 80% 的效果来自约 20% 的原因——「约」字是法则的一部分。识别带来最大收益的少数关键区域,把精力集中投给它;但别机械套用。
- Tagline (EN): Roughly 80% of effects come from roughly 20% of causes — and 'roughly' is part of the law. Identify the vital few areas that yield the most and concentrate effort there; never apply it mechanically.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| skew | number | 1.9 |
| budget | number · 项 | 2项 |

## 适用场景 / When to use

- 版本规划:识别使用率/收益前 20% 的功能,优先打磨、优化性能与可达性 / Release planning: identify the top-20% features by usage/payoff and prioritize their polish, performance and accessibility
- 界面分层:高频动作常驻显性位置,低频能力收进「更多」 / Interface layering: keep high-frequency actions in primary spots, tuck low-frequency power into 'more' menus
- 性能与质量投入:先优化覆盖最多用户的头部路径,再处理长尾 / Performance & quality spend: optimize the head paths serving the most users before the long tail

## 何时不用 / When not to use

- 机械套用 80/20:lawsofux 点名的误用是「只顾减少点击次数」一类机械目标,不是收益本身 / Mechanical 80/20: lawsofux names the misuse as mechanical proxies like 'minimize click counts' instead of the payoff itself
- 把 80/20 当精确值汇报或写死在代码里——「roughly」是法则原文的一部分 / Reporting 80/20 as exact or hard-coding it — 'roughly' is part of the law's own wording
- 砍掉低用量但战略关键的长尾功能(合规、无障碍、企业客户必需项) / Amputating low-usage but strategically vital long-tail features (compliance, accessibility, enterprise must-haves)

## 来源 / Sources

- https://lawsofux.com/pareto-principle/
