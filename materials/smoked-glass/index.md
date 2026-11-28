# Smoked Glass / 烟熏玻璃

- 页面 / Page: /uiux-atlas/materials/smoked-glass/
- English page: /uiux-atlas/en/materials/smoked-glass/
- 本页 / This file: /uiux-atlas/materials/smoked-glass/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 烟熏玻璃 · 熏黑玻璃 · 黑色玻璃 · 暗色磨砂 · Smoked Glass · Dark Glass
- 简介 / Tagline: 深色基底 + 顶部拉丝高光 + 极低透底的「黑色玻璃」:磨砂密度轴(§3.3)推到暗色端,背景只剩色温不剩信息,文字对比天然稳固。调研 17 §12.3 如实标注:参数域是 §3 mist 的暗色分支,工程推演。
- Tagline (EN): The "black glass": a dark substrate, a brushed top highlight, and a barely-transmissive base — the frost-density axis (§3.3) pushed to its dark end, leaving only color temperature from the backdrop, with naturally stable text contrast. Research 17 §12.3 states honestly: its parameter domain is the dark branch of §3 mist, engineering extrapolation.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| density | number | 0.9 |
| tint | color · hex | #0B0F14 |
| highlight | number · % | 45% |

## 适用场景 / When to use

- 亮背景(照片/视频)上需要稳文字对比的浮层——对照 clear-frost 需加 35% 暗色 dimming 层(§2.3【S】),烟熏自带深基底 / Overlays over bright backdrops (photos/video) that need stable text contrast — where clear-frost would need a 35% dark dimming layer (§2.3 [S]), smoked glass carries its own dark substrate
- 暗色仪表盘、播放器与影院模式面板(§3.6 车机/客厅大屏的暗色分支) / Dark dashboards, players, and cinema-mode panels (the dark branch of §3.6's car/TV screens)
- 悬浮导航条与工具条——玻璃导航层特权(§11.10)的暗色兑现 / Floating nav bars and toolbars — the dark realization of glass's navigation-layer privilege (§11.10)

## 何时不用 / When not to use

- 浅色主题大面积使用:深面板与浅主题的层级语言互相打架 / Large surfaces in light themes: dark panels and light themes fight over the layering language
- 数据密集表格:极低透底已接近实底,不值得付 backdrop-filter 的高档 blur 采样成本(§3.3 要点①) / Dense data tables: barely-transmissive is near-solid — not worth backdrop-filter's high-stop blur sampling cost (§3.3 point ①)
- 正文小字直接压在玻璃上:文字应放在内容层的实底上,玻璃只做导航层(§11.10) / Body text directly on the glass: text belongs on the content layer's solid ground; glass is for the navigation layer only (§11.10)

## 来源 / Sources

- https://developer.apple.com/documentation/swiftui/material
- https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
