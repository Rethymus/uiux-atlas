# Halo Glow Border / 光晕描边

- 页面 / Page: /uiux-atlas/materials/halo-glow-border/
- English page: /uiux-atlas/en/materials/halo-glow-border/
- 本页 / This file: /uiux-atlas/materials/halo-glow-border/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 光晕描边 · 光环描边 · Halo Border · Lit Border
- 简介 / Tagline: 边缘光环/辉光描边:用 conic 渐变绘制 1–2px 环,再叠一层同源渐变的模糊副本外溢成「光晕」——同一渐变的双实例:锐利层做线,模糊层做光。
- Tagline (EN): An edge halo / glow border: draw a 1–2px ring with a conic gradient, then stack a blurred twin of the same gradient to spill as a halo — two instances of one gradient: the sharp layer is the line, the blurred layer is the light.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| ring | dimension · px | 1.5px |
| glowBlur | dimension · px | 10px |
| intensity | number · % | 55% |
| angle | dimension · deg | 90deg |

## 适用场景 / When to use

- 深色 SaaS 控制台的高亮卡片与 CTA 的活动态光圈(社区通行做法;hyalite rim 光 + CSS-Tricks 谱系为技术锚点,调研 17 §5.6) / Dark SaaS dashboards' highlighted cards and CTA active-state halos (community practice; hyalite's rim light + the CSS-Tricks lineage as technical anchors, research 17 §5.6)
- 选中态/焦点态的「被点亮」暗示:光圈比加粗描边更柔和地表达状态 / Selected/focused state as 'being lit': a halo expresses state more softly than a bold stroke
- 品牌氛围强调:色标组用品牌三色(建议 3 色 + 首尾同色闭合,调研 17 §5.5) / Brand atmosphere accents: color stops in brand triads (3 colors + same-color closure recommended, research 17 §5.5)

## 何时不用 / When not to use

- 浅色亮底:光晕在亮背景上不可见,只剩一条彩线 / Pale, bright backdrops: the halo disappears, leaving only a colored line
- 多卡片全量使用:人人发光等于无人发光,层级感先死 / Applying it to every card: if everything glows, nothing does — hierarchy dies first
- 正文容器:旋转光圈持续吸引注意力,阅读区不可承受 / Reading containers: a rotating ring keeps pulling attention that reading cannot afford

## 来源 / Sources

- https://css-tricks.com/gradient-borders/
- https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient
- https://developer.mozilla.org/en-US/docs/Web/CSS/@property
- https://github.com/VII-Cae/hyalite--liquid-glass
