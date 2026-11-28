# Timeline / 时间线

- 页面 / Page: /uiux-atlas/components/timeline/
- English page: /uiux-atlas/en/components/timeline/
- 本页 / This file: /uiux-atlas/components/timeline/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 时间轴 · Vertical Timeline · Activity Feed
- 简介 / Tagline: 按时间顺序铺陈事件的垂直轴线:每格一枚节点 + 时间 + 标题,节点色区分语义(默认蓝 / 成功绿 / 报错红 / 加载中旋转点)。
- Tagline (EN): A vertical axis laying events out in time order: each cell carries a node dot + time + title, with node colors encoding semantics (default blue / success green / error red / spinning loading dot).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| accent | color · hex | #1677ff |
| mode | enum: start · alternate · end | start |
| reverse | enum: off · on | off |

## 适用场景 / When to use

- 流程/部署日志:构建、审核、发布的每一步带时间戳纵向铺开 / Pipeline/deploy logs: build, review, release steps with timestamps laid out vertically
- 订单物流轨迹:揽收→运输→派送的关键节点与状态色 / Shipment tracking: pickup → transit → delivery milestones with status colors
- 活动流/动态:Issue、工单、审批记录按时间倒序(最新在上) / Activity feeds: issues, tickets, approvals newest-first
- 版本说明/更新日志:版本节点 + 变更摘要 / Release notes/changelogs: version nodes + change summaries

## 何时不用 / When not to use

- 事件超过约 20 条的无限流——时间线整段渲染代价高,应配合分页或虚拟滚动 / Unbounded feeds past ~20 items — render whole timelines sparingly; paginate or virtualize
- 需要精确定量对比的时间序列数据——那是折线图(数据可视化)的职责 / Time-series needing quantitative comparison — that's a line chart's job (dataviz)
- 无时间或顺序语义的并列信息——强行加轴线只会制造虚假因果 / Parallel info with no time or order semantics — an imposed axis fakes causality
- alternate 模式塞长文本:左右横跳的阅读动线对长段落不友好 / alternate mode with long copy: the left-right reading zigzag hurts long paragraphs

## 来源 / Sources

- https://ant.design/components/timeline
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
