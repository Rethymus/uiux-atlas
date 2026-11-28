# Dropdown / 下拉菜单

- 页面 / Page: /uiux-atlas/components/dropdown/
- English page: /uiux-atlas/en/components/dropdown/
- 本页 / This file: /uiux-atlas/components/dropdown/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 下拉 · Dropdown Menu · 弹出菜单 · 操作菜单
- 简介 / Tagline: 按钮触发的临时操作菜单:点击/悬停展开一组可执行的动作列表,浮层定位在触发钮四周;与 tooltip 的区别是它承载可点击的操作,不是只读提示。
- Tagline (EN): A button-triggered temporary action menu: a click/hover opens a list of executable commands in a layer anchored to the trigger; unlike a tooltip it carries clickable actions, not read-only hints.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| trigger | enum: hover · click | hover |
| placement | enum: bottomLeft · bottomRight · topLeft · topRight | bottomLeft |
| arrow | enum: off · on | off |

## 适用场景 / When to use

- 按钮触发的操作列表:表格行「更多」、工具条溢出动作、批量操作收纳 / Button-triggered command lists: table-row "more", toolbar overflow actions, batch-operation overflow
- 空间紧张处收纳低频动作,保持主界面干净 / Stashing low-frequency actions where space is tight, keeping the main surface clean
- 与 tooltip 的分界:要承载「可执行的操作列表」用 dropdown,只承载「说明文字」用 tooltip / The boundary with tooltip: executable command lists belong to dropdowns; explanatory text belongs to tooltips
- 导航项的二级聚合(见 nav-menu 条目)——同一 menu 语义挂在导航父项上 / Second-level aggregation under nav items (see the nav-menu entry) — the same menu semantics on a nav parent

## 何时不用 / When not to use

- 往浮层里塞表单输入/复杂布局——改用 Popover/Dialog(APG:menu 承载 actions or commands,2026-11-21 实抓核验) / Form inputs or complex layouts inside the popup — use a Popover/Dialog instead (APG: a menu carries actions or commands, verified live 2026-11-21)
- 超过一屏的长菜单——分组、搜索或改多级结构,别让用户滚动找命令 / Menus longer than one screen — group, search or restructure; never make users scroll to find a command
- 破坏性操作与普通操作贴在一起——危险项要用分隔线隔开并标红(antd colorError #ff4d4f) / Destructive items glued to normal ones — separate dangerous items with a divider and color them (antd colorError #ff4d4f)
- hover 触发却不给 click/键盘等价路径——触屏与键盘用户将无法到达 / Hover-only triggering without click/keyboard equivalents — touch and keyboard users can never reach it

## 来源 / Sources

- https://ant.design/components/dropdown-cn
- https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
- https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
