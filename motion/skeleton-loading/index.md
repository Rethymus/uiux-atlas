# Skeleton Loading / 骨架屏

- 页面 / Page: /uiux-atlas/motion/skeleton-loading/
- English page: /uiux-atlas/en/motion/skeleton-loading/
- 本页 / This file: /uiux-atlas/motion/skeleton-loading/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 骨架屏 · 加载骨架 · Skeleton screen
- 简介 / Tagline: 用几何色块复刻即将出现的内容布局,叠加一道扫光脉动表示「加载中」;内容就绪后快速淡入覆盖,布局零跳动。
- Tagline (EN): Geometric placeholder blocks replicate the upcoming content layout, topped by a sweeping shimmer pulse meaning "loading"; content fades in fast once ready, with zero layout shift.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pulse | number · ms | 1200ms |
| direction | enum: horizontal · diagonal | horizontal |

## 适用场景 / When to use

- 内容型列表/卡片的首屏加载(Feed、详情页、仪表盘卡片) / First paint of content lists/cards (feeds, detail pages, dashboard cards)
- 预期加载 1s 以上且布局已知的页面——先按 NN/g 阈值选型再做骨架 / Pages expected to load over 1s with a known layout — pick via NN/g thresholds first, skeleton second
- 局部刷新的区块(换页、筛选),保持布局稳定降低跳动 / Locally refreshing regions (pagination, filters) where layout stability matters

## 何时不用 / When not to use

- 预期 <1s 的请求——NN/g:用即时状态变化(按压态)即可,骨架反而制造等待感 / Requests expected under 1s — NN/g: instant state changes suffice; a skeleton manufactures waiting
- 预期 ≥10s 的长任务——改用百分比进度条 + 文字说明 / Long tasks at 10s+ — switch to a percent-done progress bar with descriptive text
- 布局未知的动态内容——占位块与实际内容对不上时,切换瞬间跳动反而更明显 / Content whose layout is unknown — mismatched placeholders make the swap-in jump more visible

## 来源 / Sources

- https://www.nngroup.com/articles/progress-indicators/
- https://m3.material.io/styles/motion/transitions/transition-patterns
- https://www.lukew.com/ff/entry.asp?1797
