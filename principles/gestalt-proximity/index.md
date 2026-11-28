# Law of Proximity / 格式塔·接近性

- 页面 / Page: /uiux-atlas/principles/gestalt-proximity/
- English page: /uiux-atlas/en/principles/gestalt-proximity/
- 本页 / This file: /uiux-atlas/principles/gestalt-proximity/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 邻近原则 · 接近原则
- 简介 / Tagline: 相邻的元素被感知为一组:间距本身就是分组语法。组内间距小、组间间距大,关系不用一条线就成立。
- Tagline (EN): Elements near each other are perceived as a group: spacing itself is grouping grammar. Tight inside, loose outside — relationships hold without a single line.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| gap | dimension · px | 36px |
| inner | dimension · px | 10px |
| layout | enum: grouped · uniform | grouped |

## 适用场景 / When to use

- 表单字段分组:相关字段靠近,组间留白 / Form field grouping: related fields close, whitespace between groups
- 列表与搜索结果簇:条目内紧凑、条目间疏朗 / Lists and search-result clusters: tight within items, airy between
- 卡片内元素层级:标题-正文-操作靠间距分层 / In-card hierarchy: title/body/actions layered by spacing alone

## 何时不用 / When not to use

- 全部等距的「均匀网格」承载本该分组的对象 / Uniform all-equal spacing carrying content that needs grouping
- 只用间距表达强绑定操作(如批量删除组),不加容器或语义分组 / Spacing-only signaling for strongly-bound actions (batch delete groups) without a container or semantics

## 来源 / Sources

- https://lawsofux.com/law-of-proximity/
