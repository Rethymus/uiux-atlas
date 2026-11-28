# Button / 按钮

- 页面 / Page: /uiux-atlas/components/button/
- English page: /uiux-atlas/en/components/button/
- 本页 / This file: /uiux-atlas/components/button/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 按钮 · Action Button · Command Button
- 简介 / Tagline: 触发即时动作的按钮件:四档变体(primary/secondary/text/dashed,antd 风格)对应四级强调,loading 转圈阻断交互,disabled 置灰不可点;每屏只留一个 primary。
- Tagline (EN): Buttons trigger immediate actions: four antd-style variants (primary/secondary/text/dashed) encode four emphasis levels; loading shows a spinner and blocks interaction, disabled grays out — keep exactly one primary per screen.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| variant | enum: primary · secondary · text · dashed | secondary |
| size | enum: xs · sm · md · lg · xl | md |
| loading | enum: off · on | off |
| disabled | enum: off · on | off |

## 适用场景 / When to use

- 表单提交、对话框确认等每屏唯一的主操作(primary;Carbon:页头/模态/侧栏除外) / The single primary action per screen: form submit, dialog confirm (primary; Carbon exempts page headers/modals/sidebars)
- 与主操作成对的否定动作(Cancel/Back 用 secondary) / Negative actions paired with the primary (Cancel/Back as secondary)
- 删除数据等破坏性操作(danger 语义按钮,Carbon) / Destructive operations (danger semantics, Carbon)
- 提交等待 >1s 的请求:loading 态防重复提交并给即时反馈(NN/g) / Submissions taking >1s: loading state prevents double submits and gives instant feedback (NN/g)
- 卡片/列表内低强调动作(text 变体,MUI) / Low-emphasis actions inside cards/lists (text variant, MUI)

## 何时不用 / When not to use

- 拿按钮做页面导航——按钮触发动作,链接负责导航(Carbon) / Using buttons for page navigation — buttons trigger actions, links navigate (Carbon)
- 一屏多个 primary 争夺注意力(Von Restorff:强调要有节制,调研 07 §30) / Multiple primaries competing on one screen (Von Restorff: restraint in emphasis, research 07 §30)
- secondary 单独使用或承担肯定动作(必须与 primary 成对,Carbon) / Secondary alone or carrying an affirmative action (must pair with primary, Carbon)
- >10s 的长任务只用按钮 loading 表达——应升级为可中断的进度条(NN/g 三限,调研 07 §18) / Long >10s tasks expressed only by a button spinner — escalate to an interruptible progress bar (NN/g limits, research 07 §18)

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/button/
- https://ant.design/components/button-cn
- https://mui.com/material-ui/react-button/
- https://carbondesignsystem.com/components/button/usage/
