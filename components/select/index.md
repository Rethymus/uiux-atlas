# Select / 选择器

- 页面 / Page: /uiux-atlas/components/select/
- English page: /uiux-atlas/en/components/select/
- 本页 / This file: /uiux-atlas/components/select/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 下拉选择 · Dropdown · Combobox · Listbox
- 简介 / Tagline: 从一组互斥选项里选一个:收起时是带箭头的触发器,展开后是可键盘导航的 listbox 浮层。
- Tagline (EN): Pick one exclusive option from a set: a trigger with an arrow when collapsed, a keyboard-navigable listbox overlay when open.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | enum: sm · md · lg | md |
| status | enum: default · error · warning | default |
| clearable | enum: off · on | off |

## 适用场景 / When to use

- 互斥单选且选项 5–15 个:地址省份、排序方式、语言切换 / Exclusive single choice with 5–15 options: province pickers, sort order, language switch
- 表单中的受控枚举字段(与 Input 搭配),需要统一的尺寸与状态视觉 / Controlled enum fields in forms (paired with Input) needing unified size/status visuals
- 空间受限的筛选栏:收起只占一个控件宽,展开再扫选项 / Space-constrained filter bars: collapsed it takes one control width; options are scanned only when open
- 选项需要富内容展示(图标、描述)超出原生 select 能力时 / When options need rich content (icons, descriptions) beyond what native select offers

## 何时不用 / When not to use

- 只有 2–3 个互斥选项时用 radio 更直接——Hick 定律:少一跳展开就少一层记忆负担(调研 07§23) / With only 2–3 exclusive options, radios are more direct — Hick's law: one less expand step is one less memory burden (research 07 §23)
- 选项超过约 15 个且需检索时,应升级为可搜索 combobox,而不是让用户滚长列表 / Past ~15 options with a search need, upgrade to a searchable combobox instead of a long scroll list
- 多选场景误用单选 Select——多选应显式 mode=multiple 并展示已选集合 / Misusing single-select for multi-select — multiple needs an explicit multiple mode and a visible selection set
- 把触发器做成超长文本容器:选中值过长应省略号截断 + title 提示,而不是撑破布局 / Using the trigger as a long-text container: truncate the selected value with an ellipsis + title hint instead of breaking layout

## 来源 / Sources

- https://ant.design/components/select-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
