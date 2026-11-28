# Icon System Design / 图标系统设计

- 页面 / Page: /uiux-atlas/icons/icon-system-design/
- English page: /uiux-atlas/en/icons/icon-system-design/
- 本页 / This file: /uiux-atlas/icons/icon-system-design/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: icon grid audit · 图标一致性 · keyline shapes · 键程 · 图标命名规范 · icon audit
- 简介 / Tagline: 把「感觉不齐」变成机器可判的审计:24×24 栅格 + Material 键程(方 18×18/圆 Ø20)+ 1px 安全区 + 统一线宽 + kebab-case 命名,六枚迷你图标在网格/键程/安全区叠加层下跑一致性审计,违规项逐条标红。
- Tagline (EN): Turning 'feels off' into machine-checkable audits: the 24×24 grid + Material keylines (square 18×18 / circle Ø20) + 1px safe area + one stroke width + kebab-case naming — six mini icons run a consistency audit under grid/keyline/safe-area overlays, with every violation flagged.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stroke | dimension · px | 2px |
| overlay | enum: none · grid · keylines · safe | keylines |
| audit | enum: pass · violations | pass |
| naming | enum: kebab · mixed | kebab |

## 适用场景 / When to use

- 自建图标集的设计验收:逐枚套键程/安全区叠加层,量「圆比方大 2dp」与 18×18 键程(07 §2/§3.1) / Design acceptance for a homegrown icon set: run each glyph under keyline/safe overlays and measure the circle-beats-square-by-2dp rule and the 18×18 keyline (07 §2/§3.1)
- 团队规范落地:把 1px 安全区、2px 元素间距、整数坐标、统一线宽写成可机器判的检查单(Lucide 规范的验收法,07 §3.2) / Landing team standards: turn 1px safe area, 2px element gaps, integer coordinates and one stroke width into machine-checkable rules (Lucide's acceptance method, 07 §3.2)
- 视觉重量仲裁:与 circle/square 并排整体模糊后比灰度——「感觉太重/太轻」变成可复核流程(Lucide 模糊验收法,07 §3.2) / Visual-weight arbitration: blur the glyph next to circle/square and compare gray levels — turning 'feels too heavy' into a reviewable procedure (Lucide's blur test, 07 §3.2)
- 多尺寸体系选型:24 常规档、20 密集档(Material 桌面密集布局),16px 级独立重绘而非缩放(Heroicons micro/mini 先例,07 §1.3/§2) / Multi-size system choices: 24 regular and 20 dense (Material's desktop dense layout), with 16px-class redraws instead of scaling (the Heroicons micro/mini precedent, 07 §1.3/§2)

## 何时不用 / When not to use

- 靠缩放 SVG 改线宽——线宽是 24 网格的用户单位,连续变粗细应走 wght 轴或换权重文件(07 §1.5) / Scaling an SVG to change stroke weight — width is a user unit on the 24 grid; continuous weight needs the wght axis or a different weight file (07 §1.5)
- 把不同体系的线宽惯例混进一套(2px 系混入 1.5px 的 Heroicons 图标)——审计表第一条就会爆(07 §1.3) / Mixing line-width conventions from different families (a 1.5px Heroicons glyph inside a 2px system) — the audit's first row explodes (07 §1.3)
- 让内容越过修剪区或把关键细节塞进 2dp padding——padding 只允许「加重量」的延伸,不是内容区(07 §2) / Letting content cross the trim area or putting key detail into the 2dp padding — padding allows weight extension only, it is not content space (07 §2)
- 用几何居中硬套不对称图形——Lucide 明文允许小幅光学偏心,几何居中不等于看着居中(07 §3.2) / Forcing geometric centering on asymmetric shapes — Lucide explicitly allows slight optical off-centering; geometric center is not visual center (07 §3.2)

## 来源 / Sources

- https://m2.material.io/design/iconography/system-icons.html
- https://github.com/lucide-icons/lucide
- https://m3.material.io/styles/icons/overview
