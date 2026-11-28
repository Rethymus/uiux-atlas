# Date Picker / 日期选择器

- 页面 / Page: /uiux-atlas/components/date-picker/
- English page: /uiux-atlas/en/components/date-picker/
- 本页 / This file: /uiux-atlas/components/date-picker/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 日期选择 · DatePicker · Calendar Picker
- 简介 / Tagline: 从月历网格里点选日期:触发器收起为输入框,展开后是「星期表头 + 7 列日网格 + 月份切换」的浮层面板。
- Tagline (EN): Pick a date from a month grid: the trigger collapses into an input, opening a panel of 'weekday header + 7-column day grid + month paging'.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| firstDay | enum: mon · sun | mon |
| lang | enum: zh · en | zh |
| size | enum: sm · md · lg | md |

## 适用场景 / When to use

- 表单中的单一日期字段:出发日期、生效日期、账期(antd picker 默认 date 形态,调研 06§4.9) / Single date fields in forms: departure date, effective date, billing period (antd picker's default date form, research 06 §4.9)
- 跨月/跨年的日期查询:月切换翻页比下拉选年月更快定位 / Date queries across months/years: month paging locates a date faster than year/month dropdowns
- 需要「不可选日期」语义的场景:已订满、过去日期、维护窗口(置灰或禁用格) / Scenarios needing 'unavailable dates': fully booked, past dates, maintenance windows (dimmed or disabled cells)

## 何时不用 / When not to use

- 日期范围两端需要联动约束时不要复用两个单选实例——用 RangePicker 一类范围形态表达开始≤结束 / Do not reuse two single-pickers for a constrained range — use a range form (RangePicker-style) to express start ≤ end
- 只需年份或月份时用 picker=year/month 精简形态,整月历是过度交互 / When only a year or month is needed, use the picker=year/month reduced forms; a full calendar is overkill
- 高频录入结构化日期(如报单日期批量录入)直接键入更快——强弹日历会拖慢熟练用户 / For high-volume structured date entry, typing beats the calendar — forcing the popup slows expert users
- 移动端窄屏慎用桌面式大浮层——底部抽屉式日历或系统原生滚轮更贴合触达半径 / On narrow mobile screens, beware desktop-style large overlays — bottom-sheet calendars or native system wheels fit thumb reach better

## 来源 / Sources

- https://ant.design/components/date-picker-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/grid/
