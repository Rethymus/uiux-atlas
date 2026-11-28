# 24px Icon Grid / 24px 图标栅格

- 页面 / Page: /uiux-atlas/icons/icon-grid-24/
- English page: /uiux-atlas/en/icons/icon-grid-24/
- 本页 / This file: /uiux-atlas/icons/icon-grid-24/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 图标栅格 · 键程 · Keyline Shapes · Icon Grid · Live Area
- 简介 / Tagline: 24×24 是全行业共同祖先网格:展示区 24dp、活动区 20dp(四周 2dp padding)、方形键程 18×18、圆形键程 Ø20;栅格与安全区参考线实时可视化。
- Tagline (EN): 24×24 is the industry's common ancestor grid: 24dp display, 20dp live area (2dp padding around), 18×18 square keyline, Ø20 circle keyline — the grid and safe-area guides visualized live.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| gridSize | enum: 16 · 20 · 24 · 32 | 24 |
| padding | dimension · px | 2px |

## 适用场景 / When to use

- 自绘/评审图标时的验收底图:方形 18×18、圆形 Ø20、长方 20×16/16×20 四条键程逐一比对(07 §2) / Acceptance underlay for drawing/reviewing icons: compare against the four keylines — square 18×18, circle Ø20, landscape 20×16, portrait 16×20 (07 §2)
- 为桌面密集布局准备 20px 档位:展示区 20、活动区 16、padding 仍为 2(07 §2) / Preparing a 20px tier for dense desktop layouts: display 20, live 16, padding still 2 (07 §2)
- 跨图标集核对视觉重量:各家共用 24 祖先网格,键程铁律「圆比方大 2dp」是官方数值不是玄学(07 §3.1) / Cross-set weight checks: sets share the 24 ancestor grid, and the iron rule 'circle 2dp larger than square' is an official number, not folklore (07 §3.1)

## 何时不用 / When not to use

- 把 24 网格图标等比硬缩到 16px 交付——官方做法是换档独立重绘(Heroicons 20/16 实测独立 viewBox,07 §1.3/§3.1) / Shipping a 24-grid icon scaled straight down to 16px — the official practice is an independently redrawn tier (Heroicons 20/16 measured standalone viewBoxes, 07 §1.3/§3.1)
- 内容出修剪区,或坐标出现小数——官方要求 X/Y 必须整数(「on pixel」,07 §2) / Content escaping the trim area, or fractional coordinates — the spec requires integer X/Y ("on pixel", 07 §2)
- padding 调到 0 还想保住呼吸感——活动区吃满后图标之间会视觉粘连 / Setting padding to 0 and still expecting breathing room — a full-bleed live area makes icons visually glue together

## 来源 / Sources

- https://m2.material.io/design/iconography/system-icons.html
- https://storage.googleapis.com/material-io-design/downloads/gm_icon_template.ai.zip
- https://github.com/tailwindlabs/heroicons
