# Theme Transition / 主题切换过渡

- 页面 / Page: /uiux-atlas/color/theme-transition/
- English page: /uiux-atlas/en/color/theme-transition/
- 本页 / This file: /uiux-atlas/color/theme-transition/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 圆形扩散主题切换 · startViewTransition 换肤 · clip-path circle reveal
- 简介 / Tagline: 用 document.startViewTransition + clip-path: circle() 把换肤做成从点击坐标扩散的圆形揭示:旧快照在下、新快照被圆形裁剪揭开,扩散半径到视口最远角;无 API 或 reduced-motion 时优雅降级为直接切换。
- Tagline (EN): Turn a theme swap into a circular reveal from the click coordinates with document.startViewTransition + clip-path: circle(): the old snapshot below, the new snapshot unmasked by an expanding circle out to the farthest viewport corner; no API or reduced-motion gracefully degrades to a hard cut.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| duration | dimension · ms | 500ms |
| easing | cubicBezier | cubic-bezier(0.42, 0, 1, 1) |
| reveal | enum: circle · crossfade · direct | circle |

## 适用场景 / When to use

- 用户触发的手动换肤开关(主题切换按钮)——圆形扩散从指尖发起,因果指向明确(官方示例场景) / User-triggered manual theme toggles — the circle launches from the fingertip with a clear causal pointer (the official example's scenario)
- 换肤与 light-dark()/data-theme 变量翻转联动:CSS 侧零改动,过渡只是「快照表演」 / Pairing the swap with light-dark()/data-theme variable flips: CSS untouched, the transition is merely a 'snapshot performance'
- 给配色敏感的界面(仪表盘、编辑器)一个空间连续的换肤,替代生硬的全屏闪变 / Giving color-sensitive UIs (dashboards, editors) a spatially continuous reskin instead of a harsh full-screen flash
- 同一配方可用于任何「全局状态翻转」:紧凑/宽松密度、色盲模式切换(语义色换表场景,见 semantic-token-layers) / The same recipe fits any global state flip: compact/comfortable density, colorblind-mode switching (the semantic-sheet swap, see semantic-token-layers)

## 何时不用 / When not to use

- 高频/自动触发的换肤——每次过渡都冻结渲染并打断阅读;自动跟随系统主题时不要加过渡 / High-frequency or automatic reskins — each transition freezes rendering and interrupts reading; don't add one when following the system theme automatically
- reduced-motion 用户身上强加扩散——系统要求减少动效时必须走直接切换(文档的媒体查询包裹建议) / Forcing the reveal on reduced-motion users — when the OS asks for less motion, the swap must be direct (the docs' media-query wrapping recommendation)
- 时长拉满 1000ms——冻结体感随时长线性增长,官方参考值 500ms、交叉淡化 0.3s,再长就开始拖沓 / Maxing duration to 1000ms — perceived freeze grows linearly; the official reference values are 500ms and 0.3s for the cross-fade, beyond which it drags
- 把圆形扩散当页面路由过渡——它与 motion/view-transitions 的元素级 morph 是两回事;换肤是 root 快照表演,元素级衔接请看该条目 / Using the circle reveal as a page-route transition — it is a root-snapshot performance, distinct from the element-level morph in motion/view-transitions; for element hand-offs see that entry

## 来源 / Sources

- https://developer.chrome.com/docs/web-platform/view-transitions
- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://web.dev/articles/light-dark
- https://github.com/mdn/browser-compat-data/blob/main/css/properties/view-transition-name.json
