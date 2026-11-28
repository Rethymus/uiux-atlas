# Drop Cap / initial-letter / 首字下沉 Initial Letter

- 页面 / Page: /uiux-atlas/type/drop-cap-initial/
- English page: /uiux-atlas/en/type/drop-cap-initial/
- 本页 / This file: /uiux-atlas/type/drop-cap-initial/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: drop cap · initial-letter · 首字下沉 · 首字放大 · ::first-letter
- 简介 / Tagline: initial-letter 让段落首字占据多行并让正文环绕(Chrome 110+/Safari 需前缀/Firefox 未支持);不支持时用 ::first-letter + float 经典兜底。
- Tagline (EN): initial-letter makes a paragraph's first glyph span multiple lines with text wrapping around it (Chrome 110+/Safari prefixed/Firefox unsupported); the classic ::first-letter + float is the fallback.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| lines | number | 3 |
| sink | number | 3 |
| technique | enum: initial-letter · float | initial-letter |

## 适用场景 / When to use

- 长文特稿、杂志式文章的开篇段落——首字下沉是「正式读一篇长文」的编辑信号 / Opening paragraphs of features and magazine-style pieces — a drop cap signals 'sit down and read'
- 章节化阅读产品(电子书、电子杂志)的章节首页 / Chapter openers in reading products (e-books, digital magazines)
- 编辑风/报刊风设计体系的装饰排式组件(editorial-magazine 风格页) / Editorial/newspaper design systems' decorative type components (editorial-magazine-style pages)
- 多语言出版:initial-letter 对汉字首字同样生效,中西文出版共用一套机制 / Multilingual publishing: initial-letter works on a leading Han glyph too — one mechanism for both scripts

## 何时不用 / When not to use

- 短内容与卡片摘要——首字下沉在两三行的段落里没有环绕空间,只剩突兀大字 / Short content and card summaries — a two-line paragraph leaves no room to wrap, just an awkward giant glyph
- 密集信息界面(表单、后台)——编辑装饰与任务效率无关还抢注意力 / Dense task UIs (forms, dashboards) — editorial decoration steals attention from tasks
- 只依赖 initial-letter 而无 @supports 兜底——Firefox 用户看不到任何首字效果(可接受)或看到破碎布局(不可接受) / Relying on initial-letter with no @supports fallback — Firefox users see no drop cap (acceptable) or broken layout (not acceptable)
- 给首字加非文本修饰(背景块、图标化)破坏其「仍是文本」的可读性 / Piling non-text decoration (background blocks, icon-ification) onto the glyph until it stops reading as text

## 来源 / Sources

- https://github.com/mdn/browser-compat-data/blob/main/css/properties/initial-letter.json
- https://drafts.csswg.org/css-inline/#sizing-drop-initials
