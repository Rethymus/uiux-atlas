# Steps / 步骤条

- 页面 / Page: /uiux-atlas/components/stepper/
- English page: /uiux-atlas/en/components/stepper/
- 本页 / This file: /uiux-atlas/components/stepper/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 步骤导航 · Stepper · Wizard Steps
- 简介 / Tagline: 把复杂任务拆成有顺序的子步骤导航:节点串在连接线上,wait/process/finish/error 四态自动推算,process 步可带进度环。
- Tagline (EN): Split complex tasks into an ordered sub-step navigation: nodes strung on connectors with wait/process/finish/error derived automatically, and a progress ring on the process step.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| current | number | 1 |
| errorAt | enum: none · 1 · 2 | none |
| percent | number | 50 |
| orientation | enum: horizontal · vertical | horizontal |

## 适用场景 / When to use

- 结账/下单流程:确认订单→支付→审核→开通,四步内的线性主线 / Checkout/order flows: confirm → pay → review → activate, linear mains within four steps
- 注册/开户向导:身份→验证→绑定,步骤条 + 分步表单 / Signup/onboarding wizards: identity → verify → bind, stepper plus per-step forms
- 部署/发布进度:构建→测试→发布,process 步带 percent 进度环 / Deploy/release progress: build → test → ship, with a percent ring on the active step
- 工单/审批状态回显:只读展示流程走到哪一步、哪一步出错 / Ticket/approval status: read-only display of which step is active or failed

## 何时不用 / When not to use

- 步骤超过约 5–7 个——工作记忆 7±2,超限应分组或拆成两级导航(Miller 定律,调研 07§24) / More than ~5–7 steps — working memory holds 7±2; group or split into two-level navigation past that (Miller's law, research 07 §24)
- 非线性流程(分支/可跳步)硬套步骤条——步骤语义是线性顺序,分支用菜单/树 / Non-linear flows (branches/skips) forced into a stepper — step semantics are linear; branches need menus/trees
- 只有 2 步的流程不值得导航——直接一屏完成 / Two-step flows don't deserve navigation — finish on one screen
- 把步骤条当进度条用:长时间百分比请用 Progress,步骤条表达的是阶段不是进度(antd percent 进度环除外,补研 12§15) / Don't use a stepper as a progress bar: long-running percentages need Progress; a stepper expresses stages (except antd's percent ring, 12 §15)

## 来源 / Sources

- https://ant.design/components/steps
- https://lawsofux.com/goal-gradient-effect/
