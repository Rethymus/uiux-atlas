# Favicon Stack / Favicon 体系

- 页面 / Page: /uiux-atlas/icons/favicon-stack/
- English page: /uiux-atlas/en/icons/favicon-stack/
- 本页 / This file: /uiux-atlas/icons/favicon-stack/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: favicon · 站点图标 · apple-touch-icon · maskable icon · web app manifest icon
- 简介 / Tagline: 现代 favicon 链的极小集:**5 图标 + 1 manifest** 覆盖所有需求,不必生成 20+ 张 PNG——ico 32×32 兜底 RSS/旧版、SVG 内嵌 prefers-color-scheme 自动换色、apple-touch 180×180 加内边距、192+512 maskable 走安全区,manifest 仅 PWA 需要。
- Tagline (EN): The minimal modern favicon chain: **5 icons + 1 manifest** covers every need — no need to generate 20+ PNGs. The 32×32 ico as the RSS/legacy fallback, an SVG with embedded prefers-color-scheme for automatic recoloring, apple-touch at 180×180 with padding, 192+512 maskable inside the safe zone, and the manifest only when you ship a PWA.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| scheme | enum: light · dark | light |
| accent | color · hex | #0f0f0f |
| padding | dimension · px | 20px |
| maskable | enum: show · hide | show |

## 适用场景 / When to use

- 任何新站点/新品牌:一次配齐 5 图标 + 1 manifest,从此不再生成 20+ 张 PNG(Evil Martians 主张) / Any new site/brand: set up 5 icons + 1 manifest once and stop generating 20+ PNGs (Evil Martians' claim)
- 深浅双主题品牌:icon.svg 内嵌 prefers-color-scheme,系统切深色时 favicon 自动反色(12 §12 片段) / Brands with light/dark themes: embed prefers-color-scheme in icon.svg so the favicon inverts automatically under system dark mode (12 §12 snippet)
- 多环境部署:staging 环境用反色 favicon,一眼分辨测试站与生产站(Evil Martians 彩蛋) / Multi-environment deploys: an inverted-color favicon on staging tells test and production apart at a glance (Evil Martians easter egg)
- PWA/可安装应用:512×512 maskable(purpose:"maskable")+ 192 常规,glyph 落在 409×409 安全区内 / PWAs/installable apps: 512×512 maskable (purpose:"maskable") plus a regular 192, glyph inside the 409×409 safe zone

## 何时不用 / When not to use

- 给全平台手打 20+ 张尺寸 PNG——现代链路用 5+1 就够,旧尺寸由 ico 兜底 / Hand-generating 20+ PNG sizes for every platform — the modern chain needs 5+1, with the ico covering legacy sizes
- 写 rel="shortcut icon"——从来不是有效 rel 值,现代浏览器只认 rel="icon"(12 §12) / Writing rel="shortcut icon" — it was never a valid rel value; modern browsers only recognize rel="icon" (12 §12)
- apple-touch-icon 顶边贴满:不带 20px 内边距与背景色,iOS 遮罩一裁就破相(12 §12 建议) / Edge-to-edge apple-touch icons: without ~20px padding and a background color, the iOS mask crops into the artwork (12 §12 advice)
- maskable 图标把关键内容画进四角:Android 启动器遮罩各异,只有 409×409 中央圆是承诺安全区(12 §12) / Putting key content in a maskable icon's corners: launcher masks vary — only the central 409×409 circle is the promised safe zone (12 §12)

## 来源 / Sources

- https://evilmartians.com/chronicles/how-to-favicon-in-2024-six-files-that-fit-most-needs
