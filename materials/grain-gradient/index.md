# Grain Gradient / 颗粒噪点渐变

- 页面 / Page: /uiux-atlas/materials/grain-gradient/
- English page: /uiux-atlas/en/materials/grain-gradient/
- 本页 / This file: /uiux-atlas/materials/grain-gradient/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 噪点渐变 · Grainy gradients · feTurbulence noise
- 简介 / Tagline: 噪点渐变:SVG feTurbulence 生成灰噪点铺在渐变上,再推 contrast/brightness 变成颗粒——主作用是杀死廉价屏上的渐变色带(banding)。
- Tagline (EN): Grainy gradients: SVG feTurbulence generates gray noise laid over the gradient, then contrast/brightness pushes it into grain — whose main job is killing gradient banding on cheap panels.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| baseFrequency | number | 0.65 |
| numOctaves | number | 3 |
| contrast | number · % | 170% |
| grainOpacity | number | 0.16 |

## 适用场景 / When to use

- 大面积单色渐变上的消色带层:0.16 级低透明度噪点在廉价屏上效果最明显 / Anti-banding layer over large flat gradients: 0.16-class low opacity shows most on cheap panels
- 海报感/印刷感的氛围纹理——contrast 推高后成为可见颗粒风格 / Poster/print-flavored ambience — high contrast turns the noise into a visible grain style
- 深色 UI 的『哑光』处理:细颗粒弱化 OLED 深底的色带与烧屏观感 / Matte treatment for dark UIs: fine grain softens banding and the glossy feel of deep OLED surfaces
- 渐变 hero、按钮、卡片的背景增质,成本几乎为零(data-URI 内联) / Texturing gradient heroes, buttons and cards at near-zero cost (inline data-URI)

## 何时不用 / When not to use

- 文字正上方的高对比噪点——contrast/brightness 极端值会吃掉色彩并干扰小字(CSS-Tricks 评论区提示) / High-contrast grain right under text — extreme contrast/brightness eats color and disturbs small type (noted in the CSS-Tricks comments)
- box-shadow 上直接套用——该技术不作用于阴影,需要另行处理(CSS-Tricks 原文) / Applying it to box-shadow — the technique does not reach shadows and needs separate handling (per the CSS-Tricks article)
- numOctaves 拉满 + 大面积铺满——渲染成本随倍频数上涨,大画布会卡 / numOctaves maxed out over large canvases — cost climbs with octaves and large areas stutter
- 期待噪点改善可访问性——它是纯装饰,对比度验收仍按无噪点底色计算 / Expecting grain to improve accessibility — it is pure decoration; contrast sign-off still uses the ungrained base

## 来源 / Sources

- https://css-tricks.com/grainy-gradients/
- https://codefronts.com/design-styles/css-gradient-ui/animated-mesh-aurora-gradient-background/
