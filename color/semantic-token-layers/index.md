# Semantic Token Layers / 语义色三层架构

- 页面 / Page: /uiux-atlas/color/semantic-token-layers/
- English page: /uiux-atlas/en/color/semantic-token-layers/
- 本页 / This file: /uiux-atlas/color/semantic-token-layers/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 三层 token · primitive→semantic→component · Primer Primitives 分层
- 简介 / Tagline: primitive(原始值)→ semantic(语义角色)→ component(组件)三层引用链:组件只认语义名,换一张映射表就得到 9 套主题——GitHub Primer 用它一口气生成高对比与色盲模式。
- Tagline (EN): A three-hop reference chain — primitive (raw value) → semantic (role) → component: components know only semantic names, and one swapped mapping sheet yields 9 themes — how GitHub Primer generates its high-contrast and colorblind modes.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| theme | enum: light · dark · dark-dimmed · light-high-contrast · dark-high-contrast · light-colorblind · dark-colorblind · light-tritanopia · dark-tritanopia | light |
| role | enum: bgColor-default · fgColor-muted · borderColor-accent.muted | bgColor-default |
| layer | enum: primitive · semantic · component | semantic |

## 适用场景 / When to use

- 多主题体系:亮/暗/高对比/色盲模式共用一套组件,只换语义映射表(Primer 9 套主题的实证) / Multi-theme systems: light/dark/high-contrast/colorblind sharing one component set, swapping only the semantic mapping sheet (the 9-theme Primer proof)
- 组件库与产品解耦:组件 CSS 只引用语义变量,品牌换色不动组件 / Decoupling component library from product: component CSS references only semantic variables, so rebranding never touches components
- 跨平台 token 单一事实源:W3C DTCG 格式经 style-dictionary 编译到 Web/iOS/Android / A single source of truth across platforms: W3C DTCG files compiled to Web/iOS/Android via style-dictionary
- 需要 alpha 变换的半透明体系:同一 primitive 派生多个透明度档位(官方 alpha: 0.4 写法) / Translucent systems needing alpha variants: one primitive spawning several opacity tiers (the official alpha: 0.4 form)

## 何时不用 / When not to use

- 组件里直接写 hex/原始值——Android 文档点名的反模式(应「语义化分配 color role 而非具体值」) / Hard-coding hex/raw values inside components — the anti-pattern the Android docs call out ('assign color roles semantically, not concrete values')
- 只有一层全局变量就把语义层省掉——主题数量增长后映射关系失控,色盲/高对比模式无从生成 / Collapsing to one flat variable layer and skipping semantics — mapping unravels as themes multiply, and colorblind/high-contrast modes become ungeneratable
- 语义名带观感词(--light-blue-500)而非角色词——换主题即失效;Primer 的角色词(bgColor-default)才可跨主题存活 / Naming semantics by appearance (--light-blue-500) instead of role — dies on the first theme swap; Primer's role words (bgColor-default) survive every theme

## 来源 / Sources

- https://github.com/primer/primitives
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
