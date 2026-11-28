# Serial Position Effect / 系列位置效应

- 页面 / Page: /uiux-atlas/principles/serial-position/
- English page: /uiux-atlas/en/principles/serial-position/
- 本页 / This file: /uiux-atlas/principles/serial-position/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 序列位置效应 · 首因效应 · 近因效应
- 简介 / Tagline: 系列中的首尾项记忆最好(首因 + 近因):把最不重要的放中间,关键动作放导航的最左与最右。
- Tagline (EN): First and last items in a series are best remembered (primacy + recency): put the least important in the middle and key actions at the far left and right of navigation.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| items | number · 个 | 9个 |
| dwell | dimension · ms | 600ms |

## 适用场景 / When to use

- 底部导航:高频入口放两端(如「首页」与「我的」) / Bottom navs: high-frequency entries at both ends (e.g. Home and Profile)
- 菜单与列表:最不重要的项沉到中段 / Menus and lists: sink the least important items into the middle
- 表单分组:第一组放最重要的字段(首因) / Form sections: lead with the most important fields (primacy)

## 何时不用 / When not to use

- 把关键操作埋进长列表中段 / Burying key actions mid-way through a long list
- 用该效应为「信息架构不做排序」辩护——首尾优势不改变中段仍需可寻性 / Using the effect to excuse unsorted IA — first/last advantage doesn't fix a findable-less middle

## 来源 / Sources

- https://lawsofux.com/serial-position-effect/
