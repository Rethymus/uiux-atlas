# Drawer / 抽屉

- 页面 / Page: /uiux-atlas/components/drawer/
- English page: /uiux-atlas/en/components/drawer/
- 本页 / This file: /uiux-atlas/components/drawer/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 侧滑面板 · 抽屉面板 · Slide-over · 侧边栏浮层
- 简介 / Tagline: 从屏幕边缘 transform 滑入的面板:不离开当前页即可承载子任务/表单/详情,Esc 关闭、可带遮罩,reduced-motion 直达。
- Tagline (EN): A panel that transform-slides in from a screen edge: hosts subtasks/forms/details without leaving the page, closes on Esc, optional mask, instant under reduced-motion.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| placement | enum: top · right · bottom · left | right |
| thickness | dimension · px | 378px |
| mask | enum: on · off | on |

## 适用场景 / When to use

- 在 Form 中创建/编辑一组信息,不离开主任务上下文(AntD 官方场景) / Create/edit a group of info inside a form without leaving the main task (official AntD scenario)
- 对 Popover 太重、对整页又太轻的子任务(详情预览、筛选条件) / Subtasks too heavy for a Popover yet too light for a full page (detail previews, filters)
- 多处以同一 Form 复用的编辑面板 / An edit panel reusing the same form from many places
- 窄屏导航(左侧滑入)+ 多级抽屉处理分支任务(push 推挤) / Narrow-screen navigation (slides from left) + multi-level drawers for branching tasks (push)

## 何时不用 / When not to use

- 必须处理的阻断信息——用 Dialog(alertdialog) / Blocking, must-act information — use a Dialog (alertdialog)
- 轻量确认/提示——Drawer 开销过大,用 Dialog 或 toast / Light confirmations/hints — a Drawer is overkill; use Dialog or toast
- 超过两屏的长内容——直接开页面,避免抽屉内长滚动 / Content beyond two screens — open a page instead of long in-drawer scrolling

## 来源 / Sources

- https://ant.design/components/drawer
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
