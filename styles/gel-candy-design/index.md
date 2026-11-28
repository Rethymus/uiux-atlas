# Gel-Candy Design / 糖果果冻风

- 页面 / Page: /uiux-atlas/styles/gel-candy-design/
- English page: /uiux-atlas/en/styles/gel-candy-design/
- 本页 / This file: /uiux-atlas/styles/gel-candy-design/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 糖果果冻风 · 糖果风 · Gel-Candy Style · Candy Jelly Style
- 简介 / Tagline: 高饱和糖果色 + 半透明凝胶材质 + 大圆角胶囊 + 弹性动效的「甜感」风格;情绪轴在「玩趣/亲和」,与 neo-brutalism 的「对抗/粗野」构成同代两条最大化的表达路线。
- Tagline (EN): The sweet style of high-saturation candy colors + translucent gel material + capsule radii + elastic motion; its emotional axis is playful/warm, pairing with neo-brutalism's confrontational/brutal as the era's two maximalist expression routes.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | dimension · deg | 340deg |
| radius | dimension · px | 999px |
| squish | number | 1 |

## 适用场景 / When to use

- 儿童/教育/游戏与轻趣产品:玩趣/亲和的情绪轴就是产品情绪(调研 17 §10 情绪轴) / Kids / education / games and playful products: the playful/warm emotional axis *is* the product's mood (research 17 §10)
- 高频轻操作界面(点赞、收藏、快捷开关):squash 反馈让轻操作有「捏下去」的实体感 / High-frequency light-action UI (like, save, quick toggles): squash feedback gives light actions a physical 'pinch' feel
- 品牌需要「亲和可接近」的营销页与 onboarding:糖果色 + 胶囊几何降低心理门槛 / Brand pages and onboarding that need warmth/approachability: candy + capsule geometry lowers the psychological barrier

## 何时不用 / When not to use

- 企业工具/金融/医疗等高可信场景:甜感与可信度语义冲突 / Enterprise/finance/healthcare and other high-trust contexts: sweetness conflicts with trust semantics
- 密集数据与正文:高饱和糖果底上文字对比脆弱(WCAG 1.4.3 需逐处核对) / Dense data and body copy: text contrast on saturated candy bases is fragile (check WCAG 1.4.3 everywhere)
- 与 neo-brutalism 混搭同一组件:硬黑描边 + 软果冻内衬的语义互相抵消(对照见 mdx) / Mixing neo-brutalism into the same components: hard black strokes cancel soft gel linings semantically (comparison in the mdx)

## 来源 / Sources

- https://developer.apple.com/videos/play/wwdc2025/219/
- https://github.com/rdev/liquid-glass-react
- https://neobrutalism.dev/
