# Tag / 标签

- 页面 / Page: /uiux-atlas/components/tag/
- English page: /uiux-atlas/en/components/tag/
- 本页 / This file: /uiux-atlas/components/tag/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 标签 · Chip · Badge Label
- 简介 / Tagline: 标记与分类的小型标签件:五色枚举(红橙蓝绿灰,antd 预设色系),可关闭(closable)与描边(bordered)开关;删除后焦点移交下一个标签。
- Tagline (EN): A small labeling/classification chip: five color choices (red/orange/blue/green/gray from antd's preset system), with closable and bordered toggles; after removal, focus hands over to the next tag.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| color | enum: gray · red · orange · green · blue | gray |
| closable | enum: off · on | off |
| bordered | enum: on · off | on |

## 适用场景 / When to use

- 内容分类标记:文章话题、issue 类别、商品属性 / Content classification: article topics, issue categories, product attributes
- 状态标注:进行中/已完结/草稿等生命周期状态 / Status annotation: in-progress/done/draft lifecycle states
- 可勾选的多选筛选条件(antd Tag.CheckableTag 形态,06 §4.3) / Selectable multi-pick filters (antd's Tag.CheckableTag form, 06 §4.3)
- 输入型标签组:邮件收件人、权限成员等可增删项(配 closable) / Input-style tag groups: email recipients, permission members — add/remove items (with closable)

## 何时不用 / When not to use

- 用标签承载必须被处理的关键信息——它是标注不是提醒(提醒请用 Alert/Toast,APG Alert 告诫自动消失风险,07 §9) / Carrying must-process critical info in a tag — it annotates, it doesn't alert (use Alert/Toast; APG warns about auto-dismiss, 07 §9)
- 一屏十几个高饱和彩色标签——Von Restorff:强调泛滥即失效(07 §30) / A dozen saturated colored tags on one screen — Von Restorff: emphasis everywhere is emphasis nowhere (07 §30)
- 把标签当按钮承载主操作——层级错位,主操作应交给 Button / Using tags as buttons for primary actions — misplaced hierarchy; primary actions belong to Button
- 过长的多行文本塞进标签(标签应单行短词,长文用 Badge+文本或列表) / Stuffing long multi-line text into a tag (tags are single-line short words; long content needs a list)

## 来源 / Sources

- https://ant.design/components/tag-cn
- https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
