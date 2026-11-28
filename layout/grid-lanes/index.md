# CSS Grid Lanes / Grid Lanes 瀑布流

- 页面 / Page: /uiux-atlas/layout/grid-lanes/
- English page: /uiux-atlas/en/layout/grid-lanes/
- 本页 / This file: /uiux-atlas/layout/grid-lanes/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: grid-lanes · css-grid-3 · 瀑布流(曾名 masonry) · grid lanes layout
- 简介 / Tagline: CSS Grid Level 3 的泳道布局:display: grid-lanes 让条目逐个放入列轨道、另一轴依次堆叠,自动进入剩余空间最多的列——Pinterest 式瀑布流的原生实现。
- Tagline (EN): CSS Grid Level 3's lanes: display: grid-lanes drops items into column tracks one by one, stacking along the other axis and always entering the column with the most remaining space — a native Pinterest-style masonry.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| minTrack | dimension · px | 220px |
| gap | dimension · px | 16px |
| engine | enum: grid-lanes · columns | grid-lanes |

## 适用场景 / When to use

- Pinterest 式图片/商品瀑布流——条目高度不一、逐个放入剩余空间最多的列(Safari 26.4+ / Nightly) / Pinterest-style image/product walls — uneven heights, each item into the column with the most remaining space (Safari 26.4+ / Nightly)
- 前瞻性渐进增强:现在写双声明,Safari 26.4+/Nightly 已呈现泳道,其余环境普通网格 / Forward-looking progressive enhancement: write the dual declaration now — lanes render on Safari 26.4+/Nightly, a plain grid elsewhere
- 原型验证泳道排布与 fit-tolerance 行为(规范新属性:normal | <length-percentage> | infinite) / Prototyping lane arrangement and fit-tolerance behavior (the spec's new property: normal | <length-percentage> | infinite)
- 搜索结果流——css-grid-3 草案把 Pinterest 搜索结果页列为典型示例(调研 05§5) / Search result streams — the css-grid-3 draft names Pinterest search results as the typical example (research 05 §5)

## 何时不用 / When not to use

- 生产环境唯一依赖——Chrome 未支持、Firefox 仅 Nightly、Safari 属性仍在改名(调研 11§4B),必须留兜底 / Sole production dependency — Chrome unsupported, Firefox Nightly-only, Safari still renaming properties (research 11 §4B); always keep a fallback
- 按行序阅读的列表——泳道按列填充顺序,视觉顺序与 DOM 顺序脱节(同 columns 的取舍) / Lists read in row order — lanes fill column-wise, decoupling visual order from DOM order (same trade-off as columns)
- 需要精确控制条目位置的编辑场景——自动放置「进剩余空间最多的列」不可指定 / Editorial layouts needing exact item positions — auto-placement 'into the column with most space' is not specifiable
- 把双写声明当万能钥匙——普通网格回退对不等高条目有行带错位,严重场景仍需 columns/JS 兜底 / Treating the dual write as a silver bullet — the plain-grid fallback misaligns row bands for uneven heights; serious cases still need columns/JS fallbacks

## 来源 / Sources

- https://drafts.csswg.org/css-grid-3/
- https://webkit.org/blog/17660/introducing-css-grid-lanes/
- https://developer.chrome.com/blog/masonry
