# Modal / 对话框

- 页面 / Page: /uiux-atlas/components/modal/
- English page: /uiux-atlas/en/components/modal/
- 本页 / This file: /uiux-atlas/components/modal/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Dialog · 模态框 · 遮罩对话框 · Modal Dialog
- 简介 / Tagline: 压在页面之上的模态层:遮罩隔离外部内容、焦点困在框内、Esc/关钮退出,承载需要用户必须处理的信息或不可逆操作确认。
- Tagline (EN): A layer pressed over the page: a mask isolates outside content, focus is trapped inside, Esc/close exits — for information the user must handle or irreversible confirmations.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| width | dimension · px | 480px |
| maskClosable | enum: on · off | on |
| centered | enum: on · off | off |

## 适用场景 / When to use

- 不可逆操作确认(删除、支付)——焦点放最不破坏的动作(APG) / Irreversible confirmations (delete, pay) — focus the least destructive action (APG)
- 必须处理后才能继续的短表单/向导 / Short forms or wizards that must be completed before continuing
- 大图/详情的沉浸预览 / Immersive previews of large images or details

## 何时不用 / When not to use

- 非关键通知——用 toast 或流内 alert(APG:模态打断成本高) / Non-critical notices — use a toast or in-flow alert (APG: modal interruption is costly)
- 嵌套连续弹模态——用抽屉或页面跳转承载子任务 / Nested modal chains — hand subtasks to a drawer or a page instead
- 内容超过视口高度的长文档——改用页面或抽屉 / Long documents exceeding the viewport — use a page or drawer
- 错误表单校验的替代品(NN/g:模态确认框少用,打断且加重记忆负担) / As a substitute for form validation errors (NN/g: use confirm modals sparingly — they interrupt and tax memory)

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://ant.design/components/modal
