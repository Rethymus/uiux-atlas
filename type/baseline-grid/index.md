# Baseline Grid / 基线网格

- 页面 / Page: /uiux-atlas/type/baseline-grid/
- English page: /uiux-atlas/en/type/baseline-grid/
- 本页 / This file: /uiux-atlas/type/baseline-grid/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 基线对齐 · 8px 网格 · baseline grid · 8pt grid
- 简介 / Tagline: 让垂直空间落在固定步长(如 8px,允许 4px 半步)上,并叠加基线/网格可视化开关——偏离网格的间距无处藏身。
- Tagline (EN): Snap vertical space to a fixed step (8px, with 4px half-steps allowed) and overlay a baseline/grid visualization toggle — off-grid spacing has nowhere to hide.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| unit | dimension · px | 8px |
| fontSize | dimension · px | 16px |
| lineHeight | number | 1.5 |
| overlay | enum: none · grid · baselines · both | both |

## 适用场景 / When to use

- 长文档/落地页的排版系统校准——标题、正文、图片、按钮落在同一步长上 / Typesetting calibration for long documents and landing pages — headings, body, images and buttons land on one step
- 多组件拼接的仪表盘:间距一致性审计(配合 4/8 半步规则) / Dashboards assembled from many components: spacing consistency audits (with the 4/8 half-step rule)
- 设计系统间距 token 设计(本站 --space-* 即 4/8 网格,src/styles/global.css:165) / Spacing tokens for a design system (this site's --space-* is exactly the 4/8 grid, src/styles/global.css:165)
- 代码评审与视觉走查:开基线可视化逐块核对偏移 / Code review and visual QA: audit block offsets one by one with the baseline overlay on

## 何时不用 / When not to use

- 多字号混排的复杂编辑排版——严格基线网格维护成本高,社区实践允许局部豁免(实践共识,未证实) / Complex editorial layouts mixing many sizes — a strict baseline grid is costly to maintain; local exemptions are common in practice (community practice, unverified)
- 像素级自由的海报/插画式页面——纪律本身与自由排版目标相悖 / Pixel-free poster/illustration pages — the discipline contradicts free-form composition

## 来源 / Sources

- https://24ways.org/2006/compose-to-a-vertical-rhythm/
- https://tdesign.tencent.com/design/fonts
- https://github.com/Tencent/tdesign/blob/main/site/src/locales/pages/design-basic.ts
