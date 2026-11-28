# Checkbox / 多选框

- 页面 / Page: /uiux-atlas/components/checkbox/
- English page: /uiux-atlas/en/components/checkbox/
- 本页 / This file: /uiux-atlas/components/checkbox/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 复选框 · Check Box · Checkbox Group
- 简介 / Tagline: 多选控件:一组里可同时选中任意多项;配一个全选框时,「部分选中」用 indeterminate 半选态表达。
- Tagline (EN): A multi-select control: any number of siblings can be checked at once; with a select-all, the 'some selected' state is expressed as an indeterminate half-check.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| selectAll | enum: off · on | off |
| disabled | enum: off · on | off |

## 适用场景 / When to use

- 「全选 + 子项」批量场景:列表行首勾选、购物车合并结算、批量操作(调研 07§13 Carbon 数据表格的三态全选) / 'Select-all + children' batch scenarios: list row checks, cart consolidation, bulk actions (research 07 §13 Carbon data-table tristate select-all)
- 互不排斥的多选项:订阅渠道、权限点、筛选条件 / Non-exclusive multi-picks: subscription channels, permission points, filter conditions
- 「我已阅读并同意」类确认勾选(单框形态) / 'I have read and agree' confirmation checks (single-box form)

## 何时不用 / When not to use

- 即时生效的二元设置——用 switch;checkbox 勾选后通常要等「提交」才生效,两种心智不能混(调研 07§6) / Instant-effect binary settings — use a switch; a checkbox usually waits for submit, and the two mental models must not mix (research 07 §6)
- 互斥单选——用 radio group;勾选框允许全不选,表达不了「必选其一」约束 / Exclusive single choice — use a radio group; checkboxes allow none selected and cannot express 'exactly one'
- 只靠视觉打点表达半选而漏设 aria-checked="mixed"——读屏会把它读成未选中 / Expressing the half state only via the visual dash while omitting aria-checked="mixed" — screen readers will announce it as unchecked
- 勾选后即时执行删除等不可逆操作——勾选只是选择,执行前需要明确的动作按钮确认 / Triggering irreversible actions (delete) immediately on check — checking is a selection; execution needs an explicit action button

## 来源 / Sources

- https://ant.design/components/checkbox-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
- https://www.w3.org/WAI/ARIA/apg/patterns/switch/
