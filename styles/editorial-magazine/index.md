# Editorial Magazine / 杂志编辑风

- 页面 / Page: /uiux-atlas/styles/editorial-magazine/
- English page: /uiux-atlas/en/styles/editorial-magazine/
- 本页 / This file: /uiux-atlas/styles/editorial-magazine/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 杂志编辑排版 · 编辑风 · Editorial Design
- 简介 / Tagline: 杂志级的排版学科:headline→standfirst→byline→body→caption 五级层级、慷慨留白(「编辑自信」)、2/3/12 列栏格与 pull quote、图片是叙事伙伴而非装饰——衬线展示字 × 无衬线正文的经典配对。
- Tagline (EN): Magazine-grade typographic discipline: the headline→standfirst→byline→body→caption hierarchy, generous whitespace ('editorial confidence'), 2/3/12-column grids with pull quotes, images as narrative partners — the classic serif-display × sans-body pairing.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| cols | enum: 1 · 2 · 3 | 2 |
| measure | dimension · ch | 65ch |
| lead | number | 1.6 |
| dropcap | enum: off · on | on |

## 适用场景 / When to use

- 长文/深度报道/newsletter——调研 03§16:2012 年起 Medium/Substack 解锁的网络长文复兴主场景 / Long-form, features and newsletters — the main scene of the post-2012 Medium/Substack web revival (research 03 §16)
- 品牌杂志栏、编辑博客与作品集叙事页——需要「编辑自信」的留白与五级层级 / Brand magazine sections, editorial blogs and portfolio narratives — contexts needing 'editorial confidence' whitespace and the five-level hierarchy
- 菜谱/指南等图文并重内容——图片是叙事伙伴,图注承担信息(调研 03§16:NYT Cooking 同类) / Recipes/guides where images and text weigh equally — images as narrative partners with informative captions (cf. NYT Cooking, research 03 §16)

## 何时不用 / When not to use

- 工具/控制台类界面——五级层级与 pull quote 的仪式感会拖慢任务效率 / Utility/console interfaces — the five-level hierarchy and pull-quote ceremony slow task efficiency
- 多栏塞进窄视口——2 栏以下宽度强行分栏会击穿行长建议区间(45–90 字符),移动端应回落单栏 / Multi-column in narrow viewports — forcing columns below 2-column width breaks the 45–90 character measure; mobile should fall back to single column
- 用装饰字体堆「杂志感」——衬线只给展示层,正文仍是中性无衬线/工作衬线;全篇衬线化会牺牲屏读性 / Faking the magazine feel with decorative faces — serif belongs to the display layer only; body stays a neutral sans/workhorse serif. All-serif hurts screen readability

## 来源 / Sources

- https://design-styles.enlighten-media.net/pages/editorial/
- https://practicaltypography.com/line-length.html
- https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
- https://trends.daisyui.com/ui-design-trends-2026/
