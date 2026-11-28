# Cascader / 级联选择

- 页面 / Page: /uiux-atlas/components/cascader/
- English page: /uiux-atlas/en/components/cascader/
- 本页 / This file: /uiux-atlas/components/cascader/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 级联菜单 · Cascade Select · 联动选择
- 简介 / Tagline: 从有层级关联的数据集里逐级下钻选值:展开后是「省→市→区」式的多列菜单,选中上一级即刷新下一级。
- Tagline (EN): Drill down through a hierarchical dataset: an expanding multi-column menu (province → city → district) where each level's choice refreshes the next.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| expandTrigger | enum: click · hover | click |
| changeOnSelect | enum: off · on | off |
| multiple | enum: off · on | off |

## 适用场景 / When to use

- 行政区划选择:省/市/区三级收货地址、开户行省市联选 / Administrative divisions: province/city/district shipping addresses, bank region pickers
- 类目树筛选:商品分类、知识库目录、工单分组等固定层级 / Category trees: product taxonomy, doc directories, ticket groups — any fixed hierarchy
- 选项总量大但每级可见数量小(每列 5–15 项)的树形数据 / Trees with a large total but small per-level visible sets (5–15 options per column)
- 需要看到「路径」的选值:面包屑式回显(省 / 市 / 区)比单个叶名更有信息量 / When the path itself matters: breadcrumb-style echo (province / city / district) beats a bare leaf name

## 何时不用 / When not to use

- 层级只有一层时用普通 Select——级联列是纯开销 / One-level data should be a plain Select — cascade columns are pure overhead
- 每级选项很多且需要搜索时,showSearch 与懒加载 loadData 不能同用(补研 12§15),大数据集优先可搜索 combobox / Large levels needing search: showSearch cannot combine with lazy loadData (12 §15) — prefer a searchable combobox for big datasets
- 层级经常变化或由用户任意分组的数据——树形选择器(Tree)更合适 / Data with shifting levels or free-form grouping — a Tree picker fits better
- 移动端窄屏放不下多列并排时,改用逐级推入的单一列表(每级一屏) / On narrow mobile screens multi-column layouts don't fit — push one level per screen instead

## 来源 / Sources

- https://ant.design/components/cascader
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
