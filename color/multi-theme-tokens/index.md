# Multi-Theme Tokens / 多主题 Token

- 页面 / Page: /uiux-atlas/color/multi-theme-tokens/
- English page: /uiux-atlas/en/color/multi-theme-tokens/
- 本页 / This file: /uiux-atlas/color/multi-theme-tokens/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 多品牌换肤 · primitive 层换主题 · themeable tokens
- 简介 / Tagline: 三套品牌主题共享同一份组件 CSS:换肤只替换 primitive 层的一个 --brand 变量,语义层用 color-mix 现场重派生,组件层零改动——换肤后对比度管线整组重跑。
- Tagline (EN): Three brand themes share one component CSS: swapping themes replaces a single --brand primitive, the semantic layer re-derives live via color-mix, the component layer never changes — and the contrast pipeline reruns as a set.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| theme | enum: blue · crimson · forest | blue |
| softBg | number · % | 12% |
| borderMix | number · % | 40% |
| hoverMix | number · % | 12% |

## 适用场景 / When to use

- 白标/多品牌产品:换品牌只换 primitive 层一张表,组件 CSS 与语义结构零改动(Primer 9 套主题同架构,调研 06§10) / White-label / multi-brand products: re-branding swaps one primitive sheet; component CSS and semantic structure never move (Primer's 9 themes share this architecture, research 06 §10)
- 亮暗+多品牌矩阵:主题数 = primitive 表数量,主题不相乘——语义层只有一份 / The light/dark × multi-brand matrix: theme count = primitive sheet count, never a product — the semantic layer is single-sourced
- 品牌色由外部(运营/AB 实验)下发时:下发 primitive 值,前端语义管线不动 / When brand colors arrive from ops/AB experiments: ship primitive values; the frontend semantic pipeline stays untouched
- 换肤后的回归验收:对比度闸(4.5:1/3:1)对每个主题整组重跑——派生结果随 primitive 变化,不能沿用上一主题的结论 / Post-swap regression: contrast gates (4.5:1/3:1) rerun per theme — derivatives change with the primitive, so last theme's verdicts don't carry over

## 何时不用 / When not to use

- 组件直接引用 primitive(--tk-brand)跳过语义层——Android 文档点名的反模式:应「语义化分配 color role 而非具体值」(调研 06§10) / Components referencing the primitive (--tk-brand) past the semantic layer — the Android docs' named anti-pattern: 'assign color roles semantically, not concrete values' (research 06§10)
- 给每套主题复制一份组件 CSS——主题爆炸时不可维护;Primer 的做法是语义层换映射表(调研 06§10) / Duplicating a component stylesheet per theme — unmaintainable as themes multiply; Primer's way is swapping mapping sheets in the semantic layer (research 06 §10)
- 沿用上一主题的对比度结论:crimson 主题白字 4.74:1 过 AA,blue/forest 同配方白字仅 3.62/3.70:1 不过(本会话实测)——结论不能跨主题搬运 / Carrying contrast verdicts across themes: crimson's white text passes AA at 4.74:1 while blue/forest read 3.62/3.70:1 with the same recipe (measured this session) — verdicts do not transfer
- 语义名用观感词(--light-blue-500):换主题即失效;必须用角色词(bgColor-default 式,调研 06§10) / Appearance-word semantic names (--light-blue-500): dead on the first theme swap; use role words (bgColor-default style, research 06 §10)

## 来源 / Sources

- https://github.com/primer/primitives
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://tailwindcss.com/blog/tailwindcss-v4
