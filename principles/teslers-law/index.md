# Tesler's Law / Tesler 定律

- 页面 / Page: /uiux-atlas/principles/teslers-law/
- English page: /uiux-atlas/en/principles/teslers-law/
- 本页 / This file: /uiux-atlas/principles/teslers-law/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 复杂度守恒定律 · Conservation of Complexity
- 简介 / Tagline: 任何系统都有不可消除的复杂度——不是由系统承担,就是由用户承担。设计的目标是把固有复杂度从用户身上挪到系统里。
- Tagline (EN): Every system carries irreducible complexity — borne either by the system or by the user. The goal of design is moving that inherent complexity off the user and into the system.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| fields | number · 项 | 6项 |
| mode | enum: manual · assisted | manual |

## 适用场景 / When to use

- 表单预填:从账户/历史订单带出已知信息,只问增量 / Form pre-fill: pull known info from account/order history, ask only the delta
- 智能默认值:90% 用户会选的选项直接设为默认 / Smart defaults: make the 90% choice the default
- 把「专业术语 + 组装配置」封装成一个系统判断,用户只给意图 / Wrap expert terms and config assembly into one system decision — the user states intent

## 何时不用 / When not to use

- 为「理想理性用户」设计——假定用户愿意理解全部参数(07§26 告诫) / Designing for the 'ideal rational user' who gladly understands every param (07 §26 caveat)
- 把复杂度「藏」成黑盒:用户既没省事,也失去了纠错出口 / Hiding complexity into a black box: no effort saved and the correction exit lost

## 来源 / Sources

- https://lawsofux.com/teslers-law/
