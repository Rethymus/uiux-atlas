# Tooltip / 文字提示

- 页面 / Page: /uiux-atlas/components/tooltip/
- English page: /uiux-atlas/en/components/tooltip/
- 本页 / This file: /uiux-atlas/components/tooltip/index.md
- 分类 / Category: components 前端部件 / Components
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 气泡提示 · 提示框 · Hint · 气泡卡片
- 简介 / Tagline: 悬停/聚焦时出现的小气泡:纯鼠标放大器,hover 与 focus 双触发、Esc 隐藏、纯文本短句——不能承载必须阅读的信息。
- Tagline (EN): A small bubble on hover/focus: a pure mouse amplifier — hover and focus both trigger it, Esc hides it, plain short text — never for must-read information.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| placement | enum: top · right · bottom · left | top |
| theme | enum: dark · light | dark |
| arrow | enum: on · off | on |

## 适用场景 / When to use

- 图标按钮的名称/快捷键补充(鼠标用户的放大器) / Icon-button names / shortcut hints (an amplifier for mouse users)
- 被截断文本的完整内容(单行短句) / Full content of truncated text (one short line)
- 表单字段名的补充说明(不参与校验报错) / Supplementary notes for form field labels (never validation errors)

## 何时不用 / When not to use

- 必须阅读的信息——APG 明令 tooltip 不得承载必要信息(触屏/hover 不可达) / Must-read information — APG forbids tooltips as carriers of essential info (unreachable on touch)
- 表单错误提示——NN/g 准则⑨:勿用 tooltip 报错(图标不明显、用户不知道要 hover) / Form validation errors — NN/g guideline 9: no errors via tooltip (icons are inconspicuous; users don't know to hover)
- 富交互内容(按钮、链接、多段文字)——改用 Popover / Rich interactive content (buttons, links, paragraphs) — use a Popover
- 移动端首选项——改用长按/点按可见的说明或直接展示 / Mobile-first choices — use press/ tap-visible notes or inline text

## 来源 / Sources

- https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
- https://ant.design/components/tooltip
