# Table / 表格

- 页面 / Page: /uiux-atlas/components/table/
- English page: /uiux-atlas/en/components/table/
- 本页 / This file: /uiux-atlas/components/table/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 数据表格 · Data Table · DataGrid
- 简介 / Tagline: 用行列矩阵组织结构化数据:表头承载列语义,行承载记录;排序、斑马纹与行 hover 都是为扫读服务的辅助层,不是装饰。
- Tagline (EN): A row-column matrix for structured data: headers carry column semantics, rows carry records. Sorting, striping and row hover are scanning aids, not decoration.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | enum: sm · md · lg | lg |
| bordered | enum: off · on | off |
| striped | enum: off · on | off |
| rowCount | number | 5 |

## 适用场景 / When to use

- 结构化记录的扫读与比对(订单、库存、日志),数值列右对齐 + 等宽数字 / Scanning and comparing structured records (orders, inventory, logs) with right-aligned numeric columns in tabular figures
- 表头可排序的数据列表——antd sortDirections 默认 ['ascend','descend'](6.7.1) / Sortable data lists — antd sortDirections defaults to ['ascend','descend'] (6.7.1)
- 后台管理的主数据区:行 hover 恒开辅助扫读(Carbon:调研 07§13) / Primary data area of admin consoles: always-on row hover to aid scanning (Carbon, research 07 §13)
- 空数据场景配空状态引导(与 empty 部件同准则,调研 07§17) / Empty-data scenes guided by an empty state (same rule as the empty entry, research 07 §17)

## 何时不用 / When not to use

- 把表格当 spreadsheet 替代品、嵌套表格(Carbon 明确反对,调研 07§13) / Using tables as spreadsheet replacements or nesting tables (explicitly rejected by Carbon, research 07 §13)
- 纯布局对齐(表单标签排布)——语义 table 会被读屏按表格朗读,布局请用 CSS grid / Pure layout alignment (form label grids) — a semantic table is announced as a table by screen readers; use CSS grid for layout
- 列数过多仍不分组不折叠——密集列应提供列设置或摘要,而不是让用户横向永滚 / Too many columns with no grouping or collapse — offer column settings or summaries instead of endless horizontal scrolling

## 来源 / Sources

- https://ant.design/components/table-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/table/
- https://carbondesignsystem.com/components/data-table/usage/
- https://github.com/Tencent/tdesign-vue-next/blob/main/packages/components/table/type.ts
