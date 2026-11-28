# Aspect Ratio / 宽高比

- 页面 / Page: /uiux-atlas/layout/aspect-ratio/
- English page: /uiux-atlas/en/layout/aspect-ratio/
- 本页 / This file: /uiux-atlas/layout/aspect-ratio/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 宽高比例 · aspect-ratio 属性 · 固定比例盒
- 简介 / Tagline: 一行声明锁定盒子的宽高比:宽度变了高度自动跟上,配合 object-fit 决定图片在比例盒内裁切、留边还是拉伸——视频位、头像与防 CLS 卡片的地基。
- Tagline (EN): One declaration locks a box's width-to-height ratio: change the width and the height follows; pair it with object-fit to decide whether images crop, letterbox or stretch inside — the foundation of video slots, avatars and CLS-proof cards.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| ratio | enum: 1 / 1 · 4 / 3 · 3 / 2 · 16 / 9 · 21 / 9 · 9 / 16 | 16 / 9 |
| fit | enum: cover · contain · fill | cover |
| width | dimension · px | 320px |

## 适用场景 / When to use

- 视频/嵌入位:16:9 槽位先占住,iframe 加载完不跳版 / Video/embed slots: reserve a 16:9 stage so iframes never shift the page
- 头像与缩略图:1:1 比例盒 + object-fit: cover 裁齐任何上传图 / Avatars and thumbnails: a 1:1 box + object-fit: cover normalizes any upload
- 瀑布流/卡片栅格的占位:加载前按目标比例撑高,消灭 CLS / Grid/masonry placeholders: pre-load sizing in the target ratio kills CLS
- 响应式图片配合:img 写 width/height 属性 + CSS 约束一边,浏览器按内在比例推导另一边(调研 12§1 片段的 width=1200 height=675) / Paired with responsive images: img width/height attributes + CSS constraining one axis, the browser derives the other from the intrinsic ratio (the width=1200 height=675 pair in research 12 §1)

## 何时不用 / When not to use

- 盒子的宽高都写死——比例无 auto 边可作用,声明被忽略(MDN 明确条件) / Hard-coding both width and height — no auto axis means the ratio is ignored (explicit MDN condition)
- 用比例盒装不定长文本——文本溢出比例框;比例适合 replaced 内容,正文让自然高度说话 / Ratio boxes around variable-length text — text overflows the frame; ratios suit replaced content, let body copy keep natural height
- 对 img 只写 CSS 比例不写 width/height 属性——加载前无法占位,CLS 回来 / CSS ratio on img without width/height attributes — nothing reserves space pre-load, CLS returns
- 21:9 一类极端比例放正文插图——移动端高度过小,内容不可读 / Extreme ratios like 21:9 for body illustrations — too short on mobile to read

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
