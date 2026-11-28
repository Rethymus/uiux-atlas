# Font Pairing / 字体搭配

- 页面 / Page: /uiux-atlas/type/font-pairing/
- English page: /uiux-atlas/en/type/font-pairing/
- 本页 / This file: /uiux-atlas/type/font-pairing/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 字体组合 · 衬线搭配 · typeface pairing · serif × sans
- 简介 / Tagline: 衬线 × 无衬线的对比搭配,或同字族多字重的单字族策略:核心是对比、职责分离与克制——最多两种字体,第三种之前先问职责。
- Tagline (EN): Serif × sans contrast pairing, or the single-family multi-weight strategy: contrast, separated duties and restraint — two typefaces at most, and question the third.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pairing | enum: serif-head · sans-head · single | serif-head |
| headingSize | dimension · px | 34px |
| headingWeight | number | 600 |

## 适用场景 / When to use

- 编辑/杂志式页面:衬线大标题 + 无衬线正文,氛围与可读性分工 / Editorial/magazine pages: serif display headlines over sans body — mood and readability split the duties
- 产品官网 hero:无衬线大字 + 品牌调性一致的正文字族 / Product-site heroes: sans display plus a body family consistent with the brand voice
- 工具型产品的单字族策略:一个可变字族 + 字重/字号/色彩分层级(Apple HIG 原则) / Tool products' single-family strategy: one variable family with size/weight/color carrying hierarchy (Apple HIG principle)
- 长文阅读场景:正文候选字体必须先过长文阅读测试(通则,未证实) / Long-form reading: any body candidate must pass a long-form reading test first (rule of thumb, unverified)

## 何时不用 / When not to use

- 两种以上字体堆叠——职责分离后仍加第三种字体是方法论明令禁止项(社区共识,未证实) / Stacking three or more typefaces — adding a third after duties are separated is an explicit methodology violation (community consensus, unverified)
- 两个气质相近的字族『伪搭配』——对比不足时读者只感到混乱而非层次(实践共识,未证实) / Two near-identical voices in a 'fake pairing' — without contrast readers sense mess, not hierarchy (community practice, unverified)
- 标题字体拿来排长正文——展示字族的字号谱系不支持小字号阅读 / Using a display family for long body text — display fonts are not designed for small-size reading

## 来源 / Sources

- https://fonts.google.com/knowledge/choosing_type
- https://developer.apple.com/design/human-interface-guidelines/typography
- https://github.com/vercel/geist-font
