# Alert / 警告提示

- 页面 / Page: /uiux-atlas/components/alert/
- English page: /uiux-atlas/en/components/alert/
- 本页 / This file: /uiux-atlas/components/alert/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 警告条 · 通知条 · 横幅提示 · Inline Alert
- 简介 / Tagline: 文档流内的四色警示块:不夺键盘焦点、默认不自动消失,经 role=alert 播报——与 toast(浮层自动消失)和 Dialog(阻断)三分反馈职责。
- Tagline (EN): A four-tone warning block in the document flow: never steals focus, does not auto-dismiss, announced via role=alert — splitting feedback duty with toast (floating, auto-dismiss) and Dialog (blocking).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| type | enum: success · info · warning · error | info |
| closable | enum: on · off | off |
| showIcon | enum: on · off | off |
| banner | enum: on · off | off |

## 适用场景 / When to use

- 页面级/表单顶部的整体性错误与状态说明(Carbon:整体性错误用行内通知) / Page-level or form-top summary errors and status notes (Carbon: overall errors as inline notifications)
- 存储告急、维护公告等站点级通栏(banner) / Site-level banners: storage warnings, maintenance notices
- 成功/结果确认等需要驻留直到用户读完的反馈 / Success/outcome feedback that must remain until read

## 何时不用 / When not to use

- 自动消失——那是 toast 的职责;警告自动消失太快违反 WCAG 2.2.3(APG) / Auto-dismissal — that is toast's job; fast-disappearing alerts violate WCAG 2.2.3 (APG)
- 必须处理才能继续的信息——用 alertdialog(APG:要打断用户就升级为对话框) / Must-act-before-continue info — use an alertdialog (APG: escalate to a dialog when you must interrupt)
- 字段级表单校验——错误要紧贴字段(NN/g 准则③) / Field-level form validation — errors belong next to the field (NN/g guideline 3)
- 一屏堆多个警告——信息噪音,合并为一条或改用页面结构承载 / Stacking many alerts per screen — noise; merge into one or restructure the page

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/alert/
- https://ant.design/components/alert
