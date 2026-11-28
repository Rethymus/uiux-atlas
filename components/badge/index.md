# Badge / 徽标数

- 页面 / Page: /uiux-atlas/components/badge/
- English page: /uiux-atlas/en/components/badge/
- 本页 / This file: /uiux-atlas/components/badge/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 角标 · 徽标 · 通知数 · Notification Badge
- 简介 / Tagline: 附着在其他控件角上的状态计数:数字封顶 99+、归零隐藏、可降级为小红点——徽标的一切默认值都在替用户收敛信息密度。
- Tagline (EN): A status count attached to the corner of another control: capped at 99+, hidden at zero, degradable to a red dot — every default is converging information density on the user's behalf.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| count | number | 8 |
| max | number | 99 |
| dot | enum: off · on | off |
| offset | dimension · px | 0px |

## 适用场景 / When to use

- 消息/通知入口的未读计数(按钮、Tab、图标角上),封顶 99+ 收敛大数字 / Unread counts on message/notification entries (buttons, tabs, icons), capped at 99+ to converge big numbers
- 头像角上的状态点(在线、有更新),数量不重要时降级为 dot / Status dots on avatars (online, has updates), degraded to dot when the amount doesn't matter
- 数字本身有信息量时用 count(购物车件数、待办条数);数量不重要时用 dot / Use count when the number itself informs (cart items, todo count); use dot when only presence matters

## 何时不用 / When not to use

- 把长期不变的数字钉在角上——徽标是「需要处理」的信号,常驻即噪音 / Pinning a never-changing number on a corner — a badge signals 'needs attention'; permanent display is noise
- 多个宿主同时挂满徽标——徽标的注意力价值随数量稀释,一屏留两三个以内 / Saturating many hosts with badges at once — attention value dilutes with count; keep two or three per screen
- 小红点承载关键且不可恢复的信息——dot 无内容无详情,关键信息要走列表/横幅 / Red dots carrying critical, unrecoverable information — dots have no content or detail; critical info belongs in lists/banners

## 来源 / Sources

- https://ant.design/components/badge-cn
- https://github.com/ant-design/ant-design/blob/6.7.1/components/badge/Badge.tsx
