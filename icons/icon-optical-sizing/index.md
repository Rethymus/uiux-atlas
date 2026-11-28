# Optical Sizing / 光学缩放

- 页面 / Page: /uiux-atlas/icons/icon-optical-sizing/
- English page: /uiux-atlas/en/icons/icon-optical-sizing/
- 本页 / This file: /uiux-atlas/icons/icon-optical-sizing/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 光学对齐 · 视觉补偿 · Optical Alignment · Optical Compensation · opsz
- 简介 / Tagline: 同视觉重量 ≠ 同几何尺寸:圆形键程 Ø20 比方形 18×18 光学放大 2dp(约 +11%),不对称图形允许小幅光学偏心;Material opsz 轴把补偿参数化。
- Tagline (EN): Equal visual weight ≠ equal geometry: the circle keyline Ø20 optically overshoots the 18×18 square by 2dp (~+11%); asymmetric shapes earn a small optical off-center shift; Material's opsz axis parameterizes the compensation.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| baseSize | dimension · px | 24px |
| compensate | enum: on · off | on |

## 适用场景 / When to use

- 自绘图标的验收:方形贴 18×18、圆形贴 Ø20、不对称元素允许 0.5px 级偏心(07 §2/§3.2) / Acceptance for self-drawn icons: squares on 18×18, circles on Ø20, asymmetric elements allowed a ~0.5px optical shift (07 §2/§3.2)
- 同一行混合圆/方/三角元素时消除「圆显轻、三角显偏」的观感 / Removing the 'circle reads lighter, triangle reads off' impression when mixing circle/square/triangle in one row
- 图标从 24px 主网格扩展到 16/32/48px 渲染档时核对笔画粗细方向(opsz 思路,07 §3.1) / Checking stroke-thickness direction when a 24 master extends to 16/32/48px render tiers (opsz thinking, 07 §3.1)

## 何时不用 / When not to use

- 把光学偏移当万能微调旋钮:偏移只服务「看着居中」,像素栅格让位但不能破坏形状识别(Lucide:pixel alignment should support the icon,07 §3.2) / Treating optical offsets as a universal nudge knob: they only serve perceived centering — the pixel grid yields but must not hurt shape recognition (Lucide: pixel alignment should support the icon, 07 §3.2)
- 只有圆做了补偿、方与三角不补偿的半套方案——行内重量反而更乱 / A half-applied scheme where only circles compensate — inline weight consistency gets worse, not better
- 小尺寸(<16px)仍坚持严格像素对齐而牺牲流畅曲线——官方明确栅格对齐是手段不是目的(07 §3.2) / Insisting on strict pixel alignment at tiny sizes (<16px) at the cost of smooth curves — the spec says alignment supports the icon, not the reverse (07 §3.2)

## 来源 / Sources

- https://m2.material.io/design/iconography/system-icons.html
- https://fonts.google.com/icons
- https://developers.google.com/fonts/docs/material_symbols
- https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md
