# auto-fit / auto-fill + minmax / auto-fit 流式网格

- 页面 / Page: /uiux-atlas/layout/auto-fit-minmax/
- English page: /uiux-atlas/en/layout/auto-fit-minmax/
- 本页 / This file: /uiux-atlas/layout/auto-fit-minmax/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: auto-fill · minmax · 无断点网格 · 流式响应网格
- 简介 / Tagline: 一行声明替代全部断点:repeat(auto-fit, minmax(250px, 1fr)) 让网格按容器宽度自动增减列数;auto-fill 保留空轨道、auto-fit 回收空轨道拉伸填满。
- Tagline (EN): One declaration replaces every breakpoint: repeat(auto-fit, minmax(250px, 1fr)) grows and shrinks the column count with the container; auto-fill keeps empty tracks, auto-fit collapses them and stretches the rest.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| minTrack | dimension · px | 250px |
| gap | dimension · px | 16px |
| width | number · px | 800px |
| mode | enum: auto-fill · auto-fit | auto-fit |
| itemCount | number | 2 |

## 适用场景 / When to use

- 无断点卡片墙:博客列表、作品集、设置卡组——容器多宽都自动成形 / Breakpoint-free card walls: blog lists, portfolios, settings card groups — they form themselves at any width
- bento 网格的基础拼装——调研 05§9:以命名区域或 auto-fit 流式网格拼装不等尺寸卡片 / The base layer of bento grids — research 05 §9: assemble mixed-size cards from named areas or the auto-fit fluid grid
- 设计系统的自适应栅格容器:一份栅格吃下侧栏/主栏/弹窗等各种宿主 / Design-system adaptive grid containers: one grid serves sidebars, main columns and dialogs
- 内容驱动轨道:min-content / max-content 关键字让列宽跟随内容而非猜测值(调研 05§3) / Content-driven tracks: min-content / max-content keywords size columns by content instead of guesses (research 05 §3)

## 何时不用 / When not to use

- 必须精确控制每行列数的版面——改用 repeat(N, 1fr) 或命名区域,auto-repeat 的列数由容器决定 / Layouts needing an exact per-row column count — use repeat(N, 1fr) or named areas; auto-repeat lets the container decide
- 条目高度差异巨大且顺序敏感的信息流——考虑瀑布流条目(masonry-columns / grid-lanes) / Feeds with wildly varied heights and sensitive order — consider masonry entries (masonry-columns / grid-lanes)
- minTrack 过小(<120px)让一屏塞下过多轨道,文字挤压不可读 / minTrack too small (<120px) crams too many tracks per screen and squeezes text below readability
- 视觉设计依赖「第 N 个条目落在第几列」的规律——auto-repeat 的列数随容器变化,位置不可承诺 / Designs that rely on "item N lands in column X" — auto-repeat column count varies with the container, so positions can't be promised

## 来源 / Sources

- https://css-tricks.com/snippets/css/complete-guide-grid/
- https://webkit.org/blog/17660/introducing-css-grid-lanes/
