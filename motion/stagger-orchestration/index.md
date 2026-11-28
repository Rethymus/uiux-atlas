# Stagger Orchestration (Motion) / 编排交错

- 页面 / Page: /uiux-atlas/motion/stagger-orchestration/
- English page: /uiux-atlas/en/motion/stagger-orchestration/
- 本页 / This file: /uiux-atlas/motion/stagger-orchestration/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 交错入场 · 逐项编排 · staggerChildren
- 简介 / Tagline: Motion 变体编排:容器把 staggerChildren 下发给子项,每个列表项错峰入场——第 i 项在 i × stagger 后启动,总铺开时间 = stagger × (n−1)。
- Tagline (EN): Motion variant orchestration: the container hands staggerChildren down to its children, and list items enter in sequence — item i starts at i × stagger, with total spread = stagger × (n−1).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stagger | number · ms | 40ms |
| items | enum: 3 · 4 · 5 · 6 · 7 · 8 | 5 |

## 适用场景 / When to use

- 列表/卡片组的首次入场(导航项、功能区、结果列表) / First entrance of lists/card groups (nav items, feature blocks, result lists)
- 向导/表单的分步揭示,引导视线按序推进 / Step-by-step reveals in wizards/forms that walk the eye in order
- 叙事型页面的节奏性入场,配合 M3 进入类时长档位(decelerate 250–400ms,调研 04§1.4) / Rhythmic entrances on narrative pages, paired with M3's enter-class duration tiers (decelerate 250–400ms, research 04 §1.4)

## 何时不用 / When not to use

- 长列表(>20 项)整段 stagger——末项等待线性拉长,用户会错过尾部内容 / Staggering the whole of long lists (>20 items) — the last item's wait grows linearly and users miss the tail
- 用户主动触发的重复操作(每次点击都点名入场) / User-initiated repeated actions (a roll-call entrance on every click)
- 需要立刻可用的关键路径——编排感不能以可读性为代价(HIG:动效可取消、简短精确) / Critical paths that must be instantly usable — orchestration must not cost readability (HIG: motion is cancellable and brief)

## 来源 / Sources

- https://motion.dev/docs/react-transitions
