# Icon Font vs SVG / 图标字体与 SVG

- 页面 / Page: /uiux-atlas/icons/icon-font-vs-svg/
- English page: /uiux-atlas/en/icons/icon-font-vs-svg/
- 本页 / This file: /uiux-atlas/icons/icon-font-vs-svg/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: icon font · 图标字体 · Inline SVG · 字形图标 · CAGEMATCH
- 简介 / Tagline: 两种图标交付形态的正面对照:icon font 靠「码位→字体字形→color 染色」,失败面大(加载失败/CORS/PUA 撞 emoji);inline SVG 真矢量、CSS 可控、内嵌文档无怪异失败态——IE9+ 时代起几乎全面胜出。
- Tagline (EN): The two icon delivery formats head-to-head: icon fonts go codepoint → font glyph → color, with a wide failure surface (load failure / CORS / PUA-vs-emoji collisions); inline SVG is true vector, CSS-controllable, embedded in the document with no weird failure states — winning near-across-the-board since the IE9+ era.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| delivery | enum: svg · font | svg |
| size | dimension · px | 24px |
| color | color · hex | #0f172a |
| failure | enum: none · font-missing · emoji-crash | none |

## 适用场景 / When to use

- 现代项目新图标体系:直接选 inline SVG(或其上的 sprite/组件封装),染色统一 currentColor(07 §5.2) / New icon systems in modern projects: pick inline SVG (or sprite/component layers on top), tint via currentColor (07 §5.2)
- 多色图标、需要 CSS 分部控制的图标(悬停只改某一部分)——字体字形做不到,SVG 可以(12 §12) / Multicolor icons, or icons whose individual parts must respond to CSS (hover changes one part) — impossible with font glyphs, native to SVG (12 §12)
- 仍需兼容 IE8 的遗留系统:icon font 是 CSS-Tricks 承认的例外场景(12 §12) / Legacy systems that must still serve IE8: icon fonts are the exception scenario CSS-Tricks concedes (12 §12)
- 字体技术的现代变体:Material Symbols 以可变字体交付图标(连字+四轴),但须 &display=block 防 FOUC、子集化到 1.7KB 级才敢上首屏(07 §1.5) / The modern variant of the font approach: Material Symbols ships icons as a variable font (ligatures + four axes), but requires &display=block against FOUC and subsetting to ~1.7KB before hitting the first screen (07 §1.5)

## 何时不用 / When not to use

- 拿文本字形当图标还指望像素级对齐——line-height/vertical-align 定位是 CSS-Tricks 点名的老大难(12 §12) / Using text glyphs as icons and expecting pixel-perfect alignment — line-height/vertical-align positioning is a named pain point in CSS-Tricks (12 §12)
- 在用户可能装广告拦截/改字体的环境用 icon font 承载关键功能图标(失败面清单,12 §12) / Carrying critical functional icons via icon font where ad blockers or user stylesheets may exist (failure list, 12 §12)
- 把语义/无障碍寄托在字体字形上——SVG 可配 <title>/<desc>/aria,字体字形需额外小心(12 §12) / Relying on font glyphs for semantics/a11y — SVG pairs with <title>/<desc>/aria, font glyphs need extra care (12 §12)
- 为「省请求」选字体却忽视 DOM 体积/缓存劣势的另一半——评论区对 SVG 的两条批评同样成立(12 §12) / Choosing fonts 'to save requests' while ignoring the other half — the comments' critiques of SVG (caching, DOM size) stand too (12 §12)

## 来源 / Sources

- https://css-tricks.com/icon-fonts-vs-svg/
- https://github.com/lucide-icons/lucide
- https://www.w3.org/TR/css-color-4/
