# Aurora Gradient / 极光渐变

- 页面 / Page: /uiux-atlas/materials/aurora-gradient/
- English page: /uiux-atlas/en/materials/aurora-gradient/
- 本页 / This file: /uiux-atlas/materials/aurora-gradient/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 极光渐变 · Mesh gradient · Aurora mesh background
- 简介 / Tagline: 极光渐变:多层低亮度 oklch 光斑 radial-gradient 叠在一层 conic 底色上,整层 blur+saturate 后缓慢平移——大面积、可动画、几乎零成本的『氛围光』。
- Tagline (EN): Aurora gradient: stacked low-luminance oklch radial-gradient blobs over a conic base, blurred and saturated as one layer, then drifted slowly — an ambient glow at near-zero cost.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| spots | enum: 3 · 4 | 4 |
| blur | dimension · px | 42px |
| saturate | number · % | 115% |
| drift | number · s | 18s |
| spotA | number · % | 20% |
| spotB | number · % | 70% |

## 适用场景 / When to use

- 落地页/活动页的大面积氛围背景,上面承载文字卡片或玻璃面板 / Hero/landing ambience under text cards or glass panels
- 毛玻璃的底衬——玻璃材质必须有丰富背景才成立,极光层是廉价的高质量底 / Backdrop for glassmorphism — glass needs a rich backdrop, and aurora is a cheap high-quality one
- 暗色主题的产品营销图、空状态插画背景 / Dark-theme marketing shots and empty-state illustration backgrounds
- 需要『活背景』但不想上 WebGL/视频的场景——只动 transform,合成器友好 / Living backgrounds without WebGL/video — transform-only, compositor-friendly

## 何时不用 / When not to use

- 正文阅读区背后——blur 层大面积重采样,滚动内容叠在上面时开销陡增 / Behind body-text regions — a large blurred layer resamples expensively under scrolling content
- 光斑亮度超过 0.75 后直接压文字——配方心法是把光斑 L 钉在 0.6–0.75(CodeFronts) / Blob luminance past 0.75 crushes text contrast — the recipe's rule pins blob L at 0.6–0.75 (CodeFronts)
- 小尺寸控件内——42px 级模糊在小元素里只会得到一坨糊色 / Inside small widgets — 42px-class blur turns into a muddy blob on small elements
- 需要精确品牌色的场景——blur+saturate 会改变渐变的呈现色,取色验收要对着最终渲染结果 / Exact-brand-color contexts — blur+saturate shifts rendered colors; sample from the final composite

## 来源 / Sources

- https://codefronts.com/design-styles/css-gradient-ui/animated-mesh-aurora-gradient-background/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients
