# Logical Properties / 逻辑属性

- 页面 / Page: /uiux-atlas/layout/logical-properties/
- English page: /uiux-atlas/en/layout/logical-properties/
- 本页 / This file: /uiux-atlas/layout/logical-properties/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: CSS 逻辑属性 · padding-inline · margin-block · inset-inline
- 简介 / Tagline: 用「块流/内联流」取代物理上下左右:padding-inline、margin-block、border-start-start-radius 一套声明,阿拉伯语 RTL、中文竖排只改一个 dir 属性就整体翻转——多语言站点的地基。
- Tagline (EN): Block/inline flow axes replace physical top/right/bottom/left: one set of padding-inline, margin-block and border-start-start-radius declarations, and Arabic RTL or vertical CJK flips wholesale with a single dir attribute — the foundation of multilingual sites.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| padInline | dimension · px | 24px |
| padBlock | dimension · px | 16px |
| radius | dimension · px | 12px |
| dir | enum: ltr · rtl | ltr |

## 适用场景 / When to use

- 多语言组件库:一套组件 RTL 只翻 dir,边距/圆角/对齐全自动(调研 12§16-6) / Multilingual component libraries: flip dir and margins/radii/alignment follow (research 12 §16-6)
- 同时兼容横排与竖排的界面:侧边书脊标签、竖排卡片(与 writing-mode 天然联动) / Interfaces spanning horizontal and vertical writing: spine labels, vertical cards (pairs naturally with writing-mode)
- 设计系统间距 token:padding-block/inline 直接对应「主轴/次轴」语义,语义化优于物理方向 / Design-system spacing tokens: padding-block/inline carry main/cross-axis semantics that outlive physical directions
- 列表行首图标与末侧操作:margin-inline-start/end 表达「行首/行尾」而非左/右 / List rows with leading icons and trailing actions: margin-inline-start/end say 'line start/end', not left/right

## 何时不用 / When not to use

- 跟物理方向强绑定的视觉(贴屏幕左缘的悬浮球)——该用物理属性时别硬翻成逻辑属性 / Visuals physically bound to the screen edge (a floating ball pinned left) — when you mean physical, say physical
- 旧引擎占多数且无法渐进增强的关键样式——先查 caniuse 再决定全量切换(调研 12§2 未给完整矩阵) / Critical styles where legacy engines dominate and enhancement is impossible — check caniuse before switching wholesale (research 12 §2 has no full matrix)
- 混写物理与逻辑同轴属性(padding-left 与 padding-inline-start 混用)——级联顺序难以推理,一轴一制 / Mixing physical and logical properties on the same axis (padding-left beside padding-inline-start) — the cascade becomes unguessable; one system per axis
- 以为逻辑属性会翻译内容——它只翻转盒模型方向,文字方向仍归 dir 与 Unicode 双向算法 / Expecting logical properties to translate content — they only flip box-model axes; text direction stays with dir and the Unicode bidi algorithm

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
- https://drafts.csswg.org/css-logical/
