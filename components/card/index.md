# Card / 卡片

- 页面 / Page: /uiux-atlas/components/card/
- English page: /uiux-atlas/en/components/card/
- 本页 / This file: /uiux-atlas/components/card/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 内容卡 · 封面卡 · Content Card
- 简介 / Tagline: 共同区域的具象化:一条边框或一层底色把相关内容圈成一块,头部标题 + 正文 + 操作区 + 可选封面,是信息分区最基本的容器。
- Tagline (EN): Common region made concrete: one border or one fill circles related content into a block — header + body + actions + optional cover, the most basic container for partitioning information.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | enum: sm · md | md |
| hoverable | enum: off · on | off |
| cover | enum: off · on | off |

## 适用场景 / When to use

- 栅格中的信息分区:仪表盘统计卡、设置分组、内容流单元(卡片 = 格式塔共同区域,调研 07§35) / Partitioning information in grids: dashboard stat cards, settings groups, feed units (card = Gestalt common region, research 07 §35)
- 带封面的内容卡:文章/商品/媒体预览,cover 承载图片区,actions 承载操作区 / Covered content cards: article/product/media previews where cover holds the image area and actions the footer controls
- 需要 hover 预告「整块可点」的可点击单元(hoverable),点击进入详情 / Clickable units where hover previews 'the whole block is tappable' (hoverable), leading to a detail page

## 何时不用 / When not to use

- 卡片套卡片的多层嵌套——共同区域边界互相打架,层级反而模糊 / Cards nested inside cards — competing common-region boundaries blur hierarchy instead of clarifying it
- 一屏十几个同权重卡片——每张卡都在喊「看我」,分区价值随数量归零;先分组再分区 / A dozen equal-weight cards per screen — every card shouts 'look at me' and partitioning value drops to zero; group first, then partition
- 不可点击的静态卡开 hoverable——虚假 affordance 诱导点击;只有整卡可点才浮起 / hoverable on static, non-clickable cards — a false affordance inviting clicks; only lift cards that are entirely clickable

## 来源 / Sources

- https://ant.design/components/card-cn
- https://lawsofux.com/law-of-common-region/
