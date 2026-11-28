# Open Source Icon Sets / 开源图标集

- 页面 / Page: /uiux-atlas/icons/icon-lucide-set/
- English page: /uiux-atlas/en/icons/icon-lucide-set/
- 本页 / This file: /uiux-atlas/icons/icon-lucide-set/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 图标集对比 · Lucide · Feather · Heroicons · Phosphor · Material Symbols
- 简介 / Tagline: 六套开源图标同一枚图形对照:Lucide/Feather 2px、Heroicons 实测 1.5px、Phosphor 256 网格填充、Material 双世代——选集先看网格、线宽哲学与许可三件事。
- Tagline (EN): One glyph across six open-source sets: Lucide/Feather at 2px, Heroicons measured at 1.5px, Phosphor filled on a 256 grid, the two Material generations — pick a set by grid, stroke philosophy and license.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| set | enum: lucide · feather · heroicons · phosphor · material-symbols · material-icons | lucide |
| glyph | enum: bell · home · heart · star | bell |

## 适用场景 / When to use

- 新项目选型:24 网格 + 2px 描边 + currentColor 的三重默认(Lucide/Feather)是最低成本起跑线(07 §1.1/§1.2) / New-project selection: the triple default of a 24 grid + 2px stroke + currentColor (Lucide/Feather) is the cheapest starting line (07 §1.1/§1.2)
- 需要填充/双层权重的场景选 Phosphor(Fill/Duotone 唯二玩家)或 Material Symbols FILL 轴(07 §1.4/§1.5) / For filled/layered weights choose Phosphor (Fill/Duotone, one of two players) or Material Symbols' FILL axis (07 §1.4/§1.5)
- Tailwind 生态/React-Vue 一等公民选 Heroicons(按路径摇树导入,07 §1.3) / In the Tailwind ecosystem or React/Vue-first codebases, choose Heroicons (tree-shakable path imports, 07 §1.3)

## 何时不用 / When not to use

- 同页混用多集图标——网格同源但线宽哲学不同(2px vs 1.5px vs 烘焙填充),重量失衡肉眼可见(07 §0) / Mixing sets on one page — grids align but stroke philosophies differ (2px vs 1.5px vs baked fills), visibly unbalanced weight (07 §0)
- 新项目采用已停更的集(经典 Material Icons 五样式 2022 停更;Feather 久未发版)而不评估迁移(07 §1.2/§1.5) / Adopting frozen sets for new work (classic Material Icons stopped in 2022; Feather long unreleased) without a migration assessment (07 §1.2/§1.5)
- 直接照抄 README 示例值(Heroicons 示例 stroke-width=2 已过期,实测 1.5)——数值以仓库文件为准(07 §1.3) / Trusting README sample values (Heroicons' sample says stroke-width=2, stale; measured 1.5) — repo files win (07 §1.3)

## 来源 / Sources

- https://github.com/lucide-icons/lucide
- https://github.com/feathericons/feather
- https://github.com/tailwindlabs/heroicons
- https://github.com/phosphor-icons/core
- https://github.com/google/material-design-icons
- https://lucide.dev/guide/
