# CJK Typography / 中文排版 CJK

- 页面 / Page: /uiux-atlas/type/cjk-typography/
- English page: /uiux-atlas/en/type/cjk-typography/
- 本页 / This file: /uiux-atlas/type/cjk-typography/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 中文排版 · clreq · 标点挤压 · 段首缩进 · text-autospace
- 简介 / Tagline: 中文排版的四件套:段首缩进 2 字、两端对齐、中西文自动间距(≤¼ 汉字宽)、标点挤压——规则出自 W3C clreq,落地靠 text-indent / text-align / text-autospace / text-spacing-trim。
- Tagline (EN): Four pillars of Chinese typesetting: 2-em paragraph indent, justified alignment, auto CJK-Latin spacing (≤¼ em), punctuation squeeze — rules from W3C clreq, landed via text-indent / text-align / text-autospace / text-spacing-trim.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| autospace | enum: normal · no-autospace | normal |
| indent | dimension · em | 2em |
| align | enum: justify · left | justify |
| punctTrim | enum: normal · trim-start · space-first · space-all | normal |

## 适用场景 / When to use

- 中文长文页面(文章、文档、报告)——缩进 + 两端对齐是书籍式排版的 Web 落地 / Chinese long-form pages (articles, docs, reports) — indent + justification is the book-style web landing
- 中西混排密集的技术文档,启用 text-autospace 免去手工空格 / CJK-Latin-dense technical docs where text-autospace removes hand-inserted spaces
- 出版/电子书类产品:标点挤压与禁则直接决定中文页面的专业度 / Publishing/e-book products: punctuation squeeze and line-break rules define professional Chinese pages
- 设计系统的中文排版令牌:缩进/对齐/间距集中声明 / Design-system Chinese typography tokens: indent/align/spacing declared centrally

## 何时不用 / When not to use

- 中文正文套用西文空格词距(word-spacing)——CSS 语义上对无空格分词的中文无效 / Applying Latin word-spacing (word-spacing) to Chinese body text — ineffective per CSS semantics for space-less CJK
- 在仅极少数浏览器支持的属性上承载关键可读性(text-spacing-trim 目前仍属增强) / Carrying critical readability on a property few browsers support (text-spacing-trim is still an enhancement)
- 行内元素里硬插全角空格制造间距——会被复制、搜索、无障碍朗读一并带走 / Hand-inserting full-width spaces for gaps inside content — they leak into copy, search and screen readers
- 窄容器(卡片、通知条)强行两端对齐——字间距被拉出明显空洞 / Justifying text in narrow containers (cards, notices) — stretched gaps open visible holes

## 来源 / Sources

- https://www.w3.org/TR/clreq/
- https://developer.mozilla.org/en-US/docs/Web/CSS/text-autospace
