# Tabular Numbers / 表格数字

- 页面 / Page: /uiux-atlas/type/tabular-numbers/
- English page: /uiux-atlas/en/type/tabular-numbers/
- 本页 / This file: /uiux-atlas/type/tabular-numbers/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 等宽数字 · tnum · tabular figures · tabular-nums
- 简介 / Tagline: font-variant-numeric: tabular-nums 让每个数字占相同宽度,纵向列对齐、计数动画不抖动——仪表盘与数据表的可信度底座。
- Tagline (EN): font-variant-numeric: tabular-nums gives every digit the same width so columns align and counting animations stop jittering — the credibility floor of dashboards and data tables.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| numericStyle | enum: tabular-nums · proportional-nums · lining-nums · oldstyle-nums | tabular-nums |
| slashedZero | enum: off · on | off |
| countSpeed | number | 3 |

## 适用场景 / When to use

- 财务/统计表格的数字列——同行数字纵向对齐才可比 / Numeric columns in financial/statistical tables — comparison requires vertical alignment
- 仪表盘 KPI 与 count-up 计数动画——等宽让跳动不抖列 / Dashboard KPIs and count-up animations — equal widths keep columns from jittering
- 价格、订单号、验证码等易误读数字串(配 slashed-zero 防 O/0 混淆) / Prices, order numbers, OTP codes (pair with slashed-zero to prevent O/0 confusion)
- 时间码、倒计时等每秒都在变化的数值 / Timecodes and countdowns — values that change every second

## 何时不用 / When not to use

- 长文正文的行内数字——比例宽度占位更经济,且不需要列对齐(实践共识,未证实) / Inline numerals in long-form prose — proportional widths are more economical and need no alignment (community practice, unverified)
- 装饰性大字海报数字——老式数字(onum)或字型自带的数字设计往往更有味道 / Decorative poster numerals — oldstyle (onum) or the typeface's own digit design usually has more character

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
- https://github.com/rsms/inter
- https://rsms.me/inter/
