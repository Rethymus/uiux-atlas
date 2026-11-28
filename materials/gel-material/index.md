# Gel Material / 果冻凝胶材质

- 页面 / Page: /uiux-atlas/materials/gel-material/
- English page: /uiux-atlas/en/materials/gel-material/
- 本页 / This file: /uiux-atlas/materials/gel-material/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 果冻凝胶材质 · 果冻材质 · Jelly Material · Gel / Jelly
- 简介 / Tagline: 半透明糖果色 + 高光内衬(顶部 inset 白光)+ 底部糖色加浓(体积感)+ 弹性形变暗示(按压 squash & overshoot 回弹)。材质有体积、会形变——这是它与「发光」的柔光玻璃的分野。
- Tagline (EN): Translucent candy color + a glossy inner lining (top inset white light) + bottom candy densification (volume) + an elasticity hint (press squash & overshoot bounce). The material has volume and deforms — that is what separates it from the glowing soft-glow glass.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| candy | color · hex | #FF7AA9 |
| squish | number | 1 |
| highlight | number · % | 18% |
| bounce | cubicBezier | cubic-bezier(0.34, 1.56, 0.64, 1) |

## 适用场景 / When to use

- 高频主操作按钮与开关:按压 squash 给「按下去真的软」的反馈(iOS 26 系统控件按压弹性光响应的官方能力对应,调研 17 §4.6) / High-frequency primary buttons and toggles: press squash gives the 'it really squishes' feedback (counterpart of iOS 26's official elastic touch response, research 17 §4.6)
- 儿童/游戏/轻趣味产品的卡片与徽章:糖果色 + 体积感传达亲和 / Kids / games / playful products' cards and badges: candy color + volume conveys warmth
- 与超薄玻璃(玻璃参数用 clear-frost 档)组合:糖果色已供色,雾度要低(调研 17 §10) / Combined with ultra-thin glass (use the clear-frost grade): candy already provides color, so haze stays low (research 17 §10)

## 何时不用 / When not to use

- 正文与数据界面:果冻的形变暗示会让信息承载元素显得不可靠 / Body copy and data UI: the deformation hint makes information-bearing elements look unreliable
- 过度压扁(squish 拉满到 1.5):从果冻滑向塑料(调研 17 §4.3 配方警告) / Over-squashing (squish pushed to 1.5): slides from jelly to plastic (research 17 §4.3 recipe warning)
- 全站铺开:果冻是强调材质,大面积使用后糖感疲劳、层级感消失 / Site-wide rollout: gel is an accent material; large-area use fatigues the sweetness and flattens hierarchy

## 来源 / Sources

- https://developer.apple.com/videos/play/wwdc2025/219/
- https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views
- https://github.com/rdev/liquid-glass-react
- https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
