# Measure & Line Length / 行长与可读性

- 页面 / Page: /uiux-atlas/type/measure-line-length/
- English page: /uiux-atlas/en/type/measure-line-length/
- 本页 / This file: /uiux-atlas/type/measure-line-length/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: measure · line length · 行长 · 栏宽 · 65ch
- 简介 / Tagline: 用 ch 单位给正文栏定宽上限:平均行长保持 45–90 字符(含空格),过长难以垂直追踪回行,过短频繁换行切碎节奏。
- Tagline (EN): Cap body copy with the ch unit: keep average line length at 45–90 characters (incl. spaces) — too long strains vertical tracking, too short chops the rhythm.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| measure | dimension · ch | 65ch |
| fontSize | dimension · px | 16px |
| align | enum: left · justify | left |

## 适用场景 / When to use

- 长文正文列(文章页、文档站、博客)——首要可读性约束就是行长 / Long-form body columns (articles, docs, blogs) — measure is the primary readability constraint
- 配合流式字阶:clamp() 字号 + ch 上限一起写,窄屏自动收窄 / Paired with fluid type: clamp() font-size plus a ch cap so narrow screens narrow automatically
- 多栏布局与卡片内文本块的宽度约束 / Width caps for multi-column layouts and text blocks inside cards
- 设计令牌化:--measure: 65ch 一处声明,全文引用 / As a design token: declare --measure: 65ch once, reference everywhere

## 何时不用 / When not to use

- 把整个页面容器当正文列用——导航/页脚不是正文,不需要 65ch 约束 / Treating the whole page container as body copy — nav/footer aren't body text and don't need the cap
- 超宽屏上不做任何上限,让正文行拉到 120+ 字符 / No cap on ultrawide screens, letting lines stretch past 120 characters
- 表格、代码块等天然宽内容强行套 65ch——它们有自己的滚动/折叠策略 / Force-capping naturally wide content (tables, code blocks) at 65ch — they have their own scroll/collapse strategies
- 只写像素宽度不写 ch——换字体/换字号后行长悄悄漂移 / Pixel widths only — the real character measure silently drifts when typeface or size changes

## 来源 / Sources

- https://practicaltypography.com/line-length.html
