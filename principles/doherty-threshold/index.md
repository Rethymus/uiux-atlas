# Doherty Threshold / Doherty 阈值

- 页面 / Page: /uiux-atlas/principles/doherty-threshold/
- English page: /uiux-atlas/en/principles/doherty-threshold/
- 本页 / This file: /uiux-atlas/principles/doherty-threshold/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Doherty Threshold · 400ms 阈值
- 简介 / Tagline: 人机交互节奏 <400ms 时生产力飙升:系统反馈要在 400ms 内到位,或用感知性能(乐观更新、骨架屏)消灭「等」的感觉。
- Tagline (EN): Productivity soars when human-computer interaction stays under 400ms: give feedback within 400ms, or kill the feeling of waiting with perceived performance (optimistic UI, skeletons).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| delay | dimension · ms | 700ms |
| feedback | enum: wait · optimistic · skeleton | wait |

## 适用场景 / When to use

- 点赞、收藏、关注等可回滚操作:乐观更新一步到位 / Likes, saves, follows — reversible actions: optimistic UI in one step
- 列表/卡片首屏:骨架屏占位让布局先行稳定 / First paint of lists/cards: skeletons stabilize layout ahead of data
- 连续操作的工作流(审批队列、批量处理):节奏压进 400ms / Continuous workflows (approval queues, batch ops): keep the cadence inside 400ms

## 何时不用 / When not to use

- 转账/支付等不可逆操作盲目乐观更新——回滚成本高于等待成本 / Blind optimistic UI on irreversible money moves — rollback costs more than waiting
- 用假进度条伪装会超时失败的长任务(违背 07§27 的信任结论) / Fake progress bars masking long tasks that will time out (betraying the 07 §27 trust finding)

## 来源 / Sources

- https://lawsofux.com/doherty-threshold/
- https://www.nngroup.com/articles/response-times-3-important-limits/
