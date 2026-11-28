# Icon Color & States / 图标色彩与状态

- 页面 / Page: /uiux-atlas/icons/icon-color-states/
- English page: /uiux-atlas/en/icons/icon-color-states/
- 本页 / This file: /uiux-atlas/icons/icon-color-states/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 图标状态色 · currentColor 染色 · 图标对比度 · Icon States · State Colors
- 简介 / Tagline: currentColor 一处染色全链生效,状态色(default/hover/danger)取 IBM Carbon 已核实色板,透明度滑杆实时核算 WCAG 1.4.11 的 3:1——2.999:1 也算失败。
- Tagline (EN): One currentColor declaration re-inks the whole chain; state colors (default/hover/danger) come from IBM Carbon's verified palette; the opacity slider recomputes WCAG 1.4.11's 3:1 live — 2.999:1 still fails.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| state | enum: default · hover · danger | default |
| opacity | dimension · % | 100% |

## 适用场景 / When to use

- 工具栏图标随文字变色:宿主一处 color,图标+文字同步(Tailwind text-gray-500 类名方案即此机制,07 §5.2) / Toolbars where icons follow text: one host color tints icon+text together (the Tailwind text-gray-500 pattern is exactly this mechanism, 07 §5.2)
- 危险操作(删除/退出)用 danger 状态色,且配 aria 可访问名(见 icon-aria-accessible) / Destructive actions (delete/sign-out) wear the danger state color, paired with accessible names (see icon-aria-accessible)
- 禁用态用透明度弱化(如 Phosphor duotone 0.2 的官方弱化量级)但保留非色彩冗余 / Disabled states de-emphasize via opacity (at Phosphor duotone's official 0.2 magnitude) while keeping non-color redundancy

## 何时不用 / When not to use

- 状态色擦线设计:#1192e8 对白底 3.33:1,叠一层 20% 不透明背景即跌破 3:1——擦线色没有抗扰度 / Designing on the edge: #1192e8 holds 3.33:1 on white but a 20% tinted backdrop beneath it breaks 3:1 — edge-of-threshold colors have no interference margin
- 只用换色表达状态(hover/danger 全靠色彩)——色盲用户丢失信息,必须配非色彩通道(WCAG 1.4.1 精神,07 §4.3 上下文) / Expressing state by color alone (hover/danger only via hue) — color-blind users lose the message; pair non-color channels (in the spirit of WCAG 1.4.1, 07 §4.3 context)
- 深底直接复用浅底状态色——浅色图标在黑底会眩光,Material 的答案是 GRAD −25~−50(07 §3.1) / Reusing light-theme state colors on dark backgrounds — light icons glare on black; Material's answer is GRAD −25 to −50 (07 §3.1)

## 来源 / Sources

- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- https://www.w3.org/TR/css-color-4/
- https://carbondesignsystem.com/data-visualization/color-palettes/
