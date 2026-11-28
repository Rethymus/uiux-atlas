# Contact Shadows / 接触阴影

- 页面 / Page: /uiux-atlas/materials/contact-shadows/
- English page: /uiux-atlas/en/materials/contact-shadows/
- 本页 / This file: /uiux-atlas/materials/contact-shadows/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 接触阴影 · Contact Shadow · Ambient Occlusion · AO · 贴地阴影
- 简介 / Tagline: 元素贴着表面时脚下那道紧贴的深色椭圆软阴影,模拟 3D 渲染的环境光遮蔽(AO);与悬浮投影(偏移大、更弥散)构成「贴地/悬浮」两档高度语言。
- Tagline (EN): The tight, dark elliptical shadow right beneath an element touching its surface, simulating ambient occlusion from 3D rendering; paired with float shadows (large offset, more diffuse) as a two-step grounded/floating elevation language.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| distance | dimension · px | 6px |
| spread | dimension · px | 6px |
| color | color · hex | #3366cc |
| alpha | number | 0.25 |
| mode | enum: contact · float | contact |

## 适用场景 / When to use

- 拖拽排序中被抓起的卡片:抬升时接触阴影拉长变淡,落点弹回贴地——高度叙事的核心道具 / Cards picked up in drag-to-reorder: the contact shadow stretches and fades as they lift, snapping back to grounded on drop — the core prop of elevation storytelling
- 底部吸附元素(FAB、Dock、工具条)与表面的贴合感 / Bottom-docked elements (FABs, docks, toolbars) sitting convincingly on their surface
- 3D/AR 视图、产品陈列、卡片桌面等「物体放在平面上」的隐喻界面 / Metaphorical interfaces where objects rest on planes: 3D/AR views, product shelves, card tables
- 贴地卡与悬浮卡的层级区分——两式阴影对照表达高度差 / Distinguishing grounded vs floating cards — the two shadow styles contrast to encode height

## 何时不用 / When not to use

- 对分层悬浮阴影做逐帧动画——渲染开销大,调研明确不建议(调研 12 §7) / Frame-by-frame animation of layered float shadows — expensive to render, explicitly discouraged (research 12 §7)
- 阴影叠纯黑——压灰褪色、与背景脱节(调研 12 §7) / Pure-black shadows — they gray out and detach from the backdrop (research 12 §7)
- 多光源混用——全站应共享单一光源与同一偏移比例(如水平:竖直 = 1:2) / Mixing light sources — the whole product should share one light and one offset ratio (e.g. horizontal:vertical = 1:2)
- 用阴影表达可点击——阴影表达高度与材质,不表达交互性 / Using shadows to mean clickable — shadows encode height and material, not interactivity

## 来源 / Sources

- https://www.joshwcomeau.com/css/designing-shadows/
