# Depth of Field / 景深层次

- 页面 / Page: /uiux-atlas/materials/depth-of-field/
- English page: /uiux-atlas/en/materials/depth-of-field/
- 本页 / This file: /uiux-atlas/materials/depth-of-field/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 景深层次 · Depth of Field · Blur Layering · 模糊分层
- 简介 / Tagline: 用 blur 分层伪造摄影景深:前景清晰、远景 blur+saturate 降清晰度并轻压暗——blur → dim → sharp 三段深度,焦点平面可切换(blur px 可调)。
- Tagline (EN): Fake photographic depth of field with blur layering: the foreground stays sharp while the far plane loses definition via blur+saturate and a light dim — a blur → dim → sharp depth stack with a switchable focus plane (adjustable blur px).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| blur | dimension · px | 8px |
| saturation | number | 0.9 |
| focus | enum: near · mid · far | near |

## 适用场景 / When to use

- 媒体详情页/产品陈列:远景照片虚化退后,信息卡浮在清晰层 / Media detail pages and product shelves: the far photo recedes in blur while the info card floats in the sharp layer
- 英雄区背景弱化:全幅背景 blur+saturate 后,标题与 CTA 独占清晰度 / Hero background softening: a full-bleed backdrop blurred + desaturated so title and CTA own the sharpness
- 弹窗背后的「模糊+压暗」组合:MDN 示例的 ::backdrop blur(0.5rem) 搭配(调研 09 §7.1) / The blur-plus-dim pairing behind dialogs: MDN's own ::backdrop blur(0.5rem) example (research 09 §7.1)
- 滚动边缘效应的对照参考:内容滚入玻璃下方时「逐渐溶解进背景」(WWDC25 219,调研 09 §8.7)——溶解即降清晰度 / A reference for scroll edge effects: content 'dissolving into the background' as it scrolls under glass (WWDC25 219, research 09 §8.7) — dissolving is definition loss

## 何时不用 / When not to use

- 对大面积 blur 做逐帧动画——GPU 合成开销显著,调研明确告诫(调研 12 §8);拉焦用交叉溶解替代 / Frame-by-frame animation of large-area blur — significant GPU cost, explicitly warned against (research 12 §8); use cross-dissolve for rack focus
- 失焦平面上的可读内容——一旦某层承载文字/数据,它就不该被 blur(信息≠装饰) / Readable content on a defocused plane — once a layer carries text/data it must not be blurred (information is not decoration)
- blur 值过大(>16px)叠大面积图层——糊成色块、边缘采样开销上升,景深感反而丢失 / Very large blur (>16px) over large layers — it smears into color fields, sampling cost climbs, and the depth cue is lost
- 把景深当层级语义的唯一手段——深度线索必须配合尺寸/位置/文字(WCAG 1.4.11 的边界可辨要求) / Depth of field as the only hierarchy cue — depth needs size/position/text alongside it (WCAG 1.4.11 boundary legibility)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/filter
- https://developer.apple.com/videos/play/wwdc2025/219/
