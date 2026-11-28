# Empty / 空状态

- 页面 / Page: /uiux-atlas/components/empty/
- English page: /uiux-atlas/en/components/empty/
- 本页 / This file: /uiux-atlas/components/empty/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 空状态 · Empty State · 无数据占位 · 暂无数据
- 简介 / Tagline: 数据为空时的友好占位:插画 + 简短标题 + 下一步说明 + 可选操作按钮,把『死胡同』变成引导。
- Tagline (EN): A friendly placeholder for no data: artwork + short title + next-step copy + an optional action button — turning a dead end into guidance.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| simple | enum: off · on | off |
| footerAction | enum: on · off | on |

## 适用场景 / When to use

- 表格/列表首次使用无数据——说明这里将有什么、怎么添加(Carbon no-data 类) / First-use tables/lists with no data — say what will live here and how to add it (Carbon no-data type)
- 搜索/筛选无结果——解释原因并给撤销或改写筛选的出口(Carbon user-action 类) / No search/filter results — explain why and offer an exit to revise or clear filters (Carbon user-action type)
- 权限/系统/配置问题导致的空——给更多细节与修复选项(Carbon error-management 类) / Emptiness caused by permissions/system/config — give more detail and a fix path (Carbon error-management type)
- 嵌入 Table/List/TreeSelect 等容器作为无数据占位(antd Empty 官方用法) / Embedded in Table/List/TreeSelect as the no-data placeholder (official antd Empty usage)

## 何时不用 / When not to use

- 保留表头/页脚再塞空态卡——读屏会先读完整个表格结构才听到『无内容』(Carbon 明确反例) / Keeping table header/footer and stuffing the empty card inside — screen readers read the whole table structure before hearing 'no content' (explicit Carbon anti-pattern)
- 多个空态并存时各配一个主按钮——仪表盘场景 CTA 用次级样式避免多主按钮(Carbon) / Several concurrent empty states each with a primary button — dashboards should use tertiary CTAs (Carbon)
- 用空态承载错误详情或营销内容——空态不是错误页也不是广告位 / Using empty states to carry error details or marketing content — an empty state is neither an error page nor ad space
- 插画面积远大于文字信息——首次使用引导之外的空态应保持轻量 / Artwork dwarfing the message — beyond first-use onboarding, empty states should stay light

## 来源 / Sources

- https://ant.design/components/empty
- https://carbondesignsystem.com/patterns/empty-states-pattern/
