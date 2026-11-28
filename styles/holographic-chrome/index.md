# Holographic Chrome / 全息铬光

- 页面 / Page: /uiux-atlas/styles/holographic-chrome/
- English page: /uiux-atlas/en/styles/holographic-chrome/
- 本页 / This file: /uiux-atlas/styles/holographic-chrome/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 全息虹彩 · 铬金属 · Holographic / Iridescent & Chrome
- 简介 / Tagline: 光谱变色与液态金属两类反光材质面:全息虹彩用跨色相光谱渐变模拟衍射薄膜,铬光用银白硬反射线模拟液态金属;镜面高光与衍射微条纹是质感来源,适合电影级发布、时尚与音乐场景。
- Tagline (EN): Two reflective material families — spectral iridescence and liquid-metal chrome: holographic gradients sweep across hues to mimic diffraction film, chrome lays down silver with a hard horizon reflection; specular sheen and micro diffraction stripes carry the texture, aimed at cinematic launches, fashion and music.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: holo · chrome | holo |
| hueSpan | number | 240 |
| sheen | number | 1 |
| diffraction | enum: off · on | on |

## 适用场景 / When to use

- 电影级产品发布页与预告 hero——daisyUI 2026 原文场景「cinematic launches」 / Cinematic product launches and teaser heroes — daisyUI 2026's verbatim scene 'cinematic launches'
- 时尚/音乐/美妆的限量系列页——反光材质与「premium technology」语境天然匹配(同上引文) / Fashion/music/beauty limited drops — reflective material matches the 'premium technology' register (same quote)
- 深色界面上的单一 hero 元素(标题/徽标/奖牌)——大面积铺开会稀释稀缺感 / A single hero element on a dark interface (title/logo/medal) —大面积 use dilutes the scarcity

## 何时不用 / When not to use

- 正文排版与表单控件——光谱渐变吞噬文字对比度,铬按钮的「地平线」亮暗跨越可达 3:1 以上抖动 / Body text and form controls — spectral gradients devour text contrast; chrome buttons jitter across >3:1 lightness spans
- 浅色/白色界面——反光材质需要深底衬托,白底上虹彩会脏 / Light/white interfaces — reflective material needs a dark field; iridescence turns muddy on white
- 无障碍关键路径(警示、错误提示)——语义必须靠实色与图标承载,不得依赖反光装饰 / Accessibility-critical paths (warnings, errors) — semantics must ride on solid color and icons, never on reflective decoration

## 来源 / Sources

- https://trends.daisyui.com/ui-design-trends-2026/
- https://trends.daisyui.com/ui-design-trends-2025/
- https://developer.apple.com/videos/play/wwdc2025/219/
