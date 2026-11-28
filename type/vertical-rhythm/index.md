# Vertical Rhythm / 垂直韵律

- 页面 / Page: /uiux-atlas/type/vertical-rhythm/
- English page: /uiux-atlas/en/type/vertical-rhythm/
- 本页 / This file: /uiux-atlas/type/vertical-rhythm/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 行高韵律 · 韵律排版 · vertical rhythm · rhythm-based spacing
- 简介 / Tagline: 以正文行高为基本单元:标题行高反推(单元 ÷ 字号)、间距取整倍数、行盒逐行叠加——韵律可视化让文本块像乐谱一样可读。
- Tagline (EN): Take the body line-height as the base unit: derive heading line-heights backwards (unit ÷ size), snap gaps to integer multiples, stack line boxes row by row — rhythm visualization turns text blocks into readable sheet music.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| baseUnit | dimension · px | 18px |
| bodySize | dimension · px | 12px |
| headingSize | dimension · px | 14px |
| mode | enum: rhythm · free | rhythm |

## 适用场景 / When to use

- 长文/杂志式排版:标题、正文、引语、图注共享一个单元 / Long-form and magazine layouts: headings, body, quotes and captions share one unit
- 博客与文档站的行距 token 设计(单元 = 正文行高) / Spacing tokens for blogs and docs sites (unit = body line-height)
- 设计系统交接:把「呼吸空间」从玄学变成单元倍数的算术 / Design-system handoff: turning 'breathing room' from vibes into unit-multiple arithmetic
- 评审排版 PR:叠加韵律线逐块核对偏移 / Reviewing typesetting PRs: audit block offsets against overlaid rhythm lines

## 何时不用 / When not to use

- 控件密集的界面——组件间距走 4/8 网格(见 baseline-grid 条目),行高倍数体系管不到按钮内边距 / Control-dense interfaces — component spacing follows the 4/8 grid (see baseline-grid); line-height multiples do not govern button paddings
- 多字号混排的密集仪表盘——严格韵律维护成本高,社区实践允许局部豁免(实践共识,未证实) / Dense dashboards mixing many sizes — strict rhythm is costly to maintain; local exemptions are common (community practice, unverified)

## 来源 / Sources

- https://24ways.org/2006/compose-to-a-vertical-rhythm/
