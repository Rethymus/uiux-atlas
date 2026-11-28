# SVG Symbol Sprites / SVG Symbol 雪碧图

- 页面 / Page: /uiux-atlas/icons/icon-sprite-symbols/
- English page: /uiux-atlas/en/icons/icon-sprite-symbols/
- 本页 / This file: /uiux-atlas/icons/icon-sprite-symbols/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 雪碧图 · symbol/use · SVG Sprite · Icon Sprite · use 引用
- 简介 / Tagline: 一份 <symbol> 模板多处 <use> 实例化:定义不可渲染、引用深克隆进 shadow DOM,染色只走 CSS 继承——currentColor 一处上色,写死 fill/stroke 的 path 封死继承。
- Tagline (EN): One <symbol> template, many <use> instances: definitions never render, references deep-clone into shadow DOM, and painting flows only through CSS inheritance — one currentColor tints everything, while a hardcoded fill/stroke seals it off.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| symbol | enum: bell · heart · star · bolt | bell |
| ink | enum: current · inverse · duotone | current |

## 适用场景 / When to use

- 站点级图标系统:一份雪碧图多处引用,新增图标只加 symbol 不动结构(Feather 官方 feather-sprite.svg 范式,07 §1.2) / Site-wide icon systems: one sprite referenced everywhere; adding an icon means adding a symbol, not touching structure (Feather's official feather-sprite.svg pattern, 07 §1.2)
- 主题换肤:图标 path 裸写 + 顶层 currentColor,宿主一处 color 全站图标换装(07 §5.2) / Theme reskinning: bare paths + currentColor at the top; one host color re-inks every icon (07 §5.2)
- Phosphor 式双层图标:背景层 opacity 0.2 + 实色前景,单色 currentColor 下靠双 path 保留层次(07 §1.4) / Phosphor-style layered icons: background at opacity 0.2 + solid foreground; under monochrome currentColor, two paths preserve the depth (07 §1.4)

## 何时不用 / When not to use

- path 上写死 fill/stroke 再想整体换色——use 引用时已定义属性被忽略,染色链在此断裂(MDN,07 §5.1/§5.2) / Hardcoding fill/stroke on paths and then re-theming — defined attributes are ignored at use sites, severing the paint chain (MDN, 07 §5.1/§5.2)
- 跨域外链雪碧图——同源策略可拒绝;首屏图标也不要依赖二次请求的外链(07 §5.1) / Cross-origin external sprites — same-origin policy may reject them; and never put first-screen icons behind a second request (07 §5.1)
- 对 <use> 克隆内容写文档 CSS 选择器——克隆树不吃文档样式,只吃继承属性(07 §5.1) / Targeting cloned <use> content with document CSS selectors — the clone tree ignores document styles and only eats inherited properties (07 §5.1)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/use
- https://github.com/feathericons/feather
- https://www.w3.org/TR/css-color-4/
