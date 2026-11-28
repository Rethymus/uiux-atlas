# text-wrap balance & pretty / text-wrap 平衡换行

- 页面 / Page: /uiux-atlas/type/text-wrap-balance/
- English page: /uiux-atlas/en/type/text-wrap-balance/
- 本页 / This file: /uiux-atlas/type/text-wrap-balance/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: text-wrap · balance · pretty · 平衡换行 · 防孤行
- 简介 / Tagline: text-wrap 简写属性的两个样式值:balance 让各行字数尽量均衡(短文本专用,Chromium ≤6 行/Firefox ≤10 行),pretty 用更慢更优的算法给长正文防孤行。
- Tagline (EN): Two style values of the text-wrap shorthand: balance evens out line lengths (short text only — ≤6 lines in Chromium, ≤10 in Firefox), while pretty runs a slower, better algorithm to prevent orphans in long body copy.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| headingWrap | enum: balance · pretty · stable · auto | balance |
| bodyWrap | enum: pretty · balance · stable · auto | pretty |
| width | dimension · ch | 30ch |

## 适用场景 / When to use

- 所有标题(h1–h6)与引语默认 balance——一行 CSS 消灭参差行尾 / All headings (h1–h6) and pull quotes default to balance — one CSS line ends ragged headings
- 长文正文与卡片摘要用 pretty 防孤行(支持 pretty 的浏览器) / Long body copy and card summaries use pretty against orphans (where pretty is supported)
- 多语言站点的标题:balance 对中/英/混排都有效,免手工断行 / Multilingual headings: balance works across CJK/Latin/mixed without manual breaks
- 按钮、导航项、标签等短文本:balance 让两行按钮均衡折行 / Buttons, nav items, tags: balance evens two-line wrapping of short labels

## 何时不用 / When not to use

- 对长正文用 balance——行数超限(Chromium ≤6 行)后失效,且计算浪费 / balance on long body copy — beyond the line cap (≤6 in Chromium) it no-ops and wastes computation
- 对可编辑内容(输入框、contenteditable)用 balance/pretty——官方指引是 stable / balance/pretty on editable content (inputs, contenteditable) — official guidance is stable
- 把 pretty 当性能无关的默认写进海量列表项——MDN 明示有性能代价 / Sprinkling pretty across huge list items as if free — MDN states it carries a performance cost
- 以 balance 替代响应式字号/栏宽设计——它均衡的是行,不是修复过窄的容器 / Using balance as a substitute for fluid type/column design — it evens lines, it can't fix a too-narrow container

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
- https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap.json
