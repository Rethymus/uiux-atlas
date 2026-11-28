# Aesthetic-Usability Effect / 审美可用性效应

- 页面 / Page: /uiux-atlas/principles/aesthetic-usability/
- English page: /uiux-atlas/en/principles/aesthetic-usability/
- 本页 / This file: /uiux-atlas/principles/aesthetic-usability/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 美学可用性效应 · Aesthetic-Usability
- 简介 / Tagline: 用户认为美观的设计更好用:美观度与「感知易用性」的相关性强于与「实际易用性」的相关性。美观带来容忍,也可能遮蔽可用性问题。
- Tagline (EN): Users judge beautiful designs as more usable: aesthetics correlates with *perceived* ease of use more strongly than with *actual* ease of use. Beauty buys tolerance — and can mask real problems.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| beauty | enum: plain · refined · premium | refined |
| handicap | enum: none · small-target · slow-response | none |
| accent | color · oklch | oklch(0.62 0.16 250) |

## 适用场景 / When to use

- 首屏、注册、支付等信任敏感场景:审美完成度直接决定第一印象与感知品质 / Trust-sensitive surfaces (landing, sign-up, payment): finish level drives first impressions and perceived quality
- 功能与竞品打平时,用审美完成度建立感知优势 / When features are at parity with competitors, finish level builds a perceived edge
- 遗留系统/内部工具改版:先补美观,能低成本买到用户对旧问题的容忍 / Legacy or internal-tool redesigns: aesthetics first — it cheaply buys tolerance of the old warts

## 何时不用 / When not to use

- 用美观掩盖未解决的可用性缺陷(性能、错误率、可达性) / Using beauty to bury unresolved usability defects (performance, error rates, accessibility)
- 可用性测试只测抛光版本——好评会替代真实指标 / Testing only the polished build — praise substitutes for real metrics
- 为了好看牺牲可读性:NN/g 已批评 Liquid Glass 全屏化伤害可读性(调研 03§2) / Sacrificing readability for looks: NN/g criticized Liquid Glass' full-screen use for hurting readability (research 03 §2)

## 来源 / Sources

- https://lawsofux.com/aesthetic-usability-effect/
