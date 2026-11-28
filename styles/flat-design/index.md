# Flat Design / 扁平化设计

- 页面 / Page: /uiux-atlas/styles/flat-design/
- English page: /uiux-atlas/en/styles/flat-design/
- 本页 / This file: /uiux-atlas/styles/flat-design/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 扁平设计 · Flat UI · 扁平化
- 简介 / Tagline: 极简 UI 语言:简单元素、排版与平色——无渐变、无高光、无拟物阴影的纪律;Metro→Material→iOS 7 一整代系统语言的公共底座,NN/g 实测其可供性线索缺失平均让交互慢 22%。
- Tagline (EN): The minimalist UI language: simple elements, typography and flat color — a discipline of no gradients, no highlights, no skeuomorphic shadows; the shared substrate of a whole generation of system languages (Metro→Material→iOS 7), measured by NN/g to slow interactions 22% on average when affordance cues are stripped.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| accent | color · hex | #007AFF |
| ornament | enum: none · gradient · shadow | none |
| iconStyle | enum: outline · filled | outline |
| radius | dimension · px | 4px |

## 适用场景 / When to use

- 系统级工具与生产力界面(设置、文件、邮件)——平色 + 字形图标的信息秩序,Mac/Win/移动三端系统语言的公共底座 / System utilities and productivity surfaces (settings, files, mail) — flat color + glyph icons, the shared substrate of macOS/Windows/mobile system languages
- 低性能设备与降级通道——零滤镜零模糊的渲染成本下限,弱机型与打印样式的天然终点 / Low-power devices and degradation channels — zero-filter/zero-blur rendering floor, the natural terminus for weak hardware and print styles
- 内容优先的编辑/文档界面——装饰归零后,层级完全由排版承担(与杂志编辑风天然互补) / Content-first editorial/docs interfaces — with decoration at zero, hierarchy rides entirely on typography (naturally complementary to editorial style)

## 何时不用 / When not to use

- 可点击性依赖装饰线索的场景——NN/g 2017 研究:扁平界面平均慢 22%,链接/按钮失去「可点」线索后用户被迫悬停试探(调研 03§17) / Contexts relying on decorative affordance cues — NN/g's 2017 study: flat interfaces were 22% slower on average once links/buttons lost their clickable cues (research 03 §17)
- 强层级数据面板——无阴影无描边时,平色块的分组边界依赖间距,密集表格容易糊行 / Strong-hierarchy data panels — with no shadows or borders, flat grouping leans on whitespace alone and dense tables blur
- 品牌差异化诉求强的营销页——各家系统语言的扁平底座高度同质,难以形成记忆点 / Marketing pages needing brand differentiation — every system's flat substrate looks alike; memorability is hard to earn

## 来源 / Sources

- https://en.wikipedia.org/wiki/Flat_design
- https://trends.daisyui.com/ui-design-trends-2025/
