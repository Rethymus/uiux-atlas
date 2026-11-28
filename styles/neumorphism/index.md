# Neumorphism / 新拟物

- 页面 / Page: /uiux-atlas/styles/neumorphism/
- English page: /uiux-atlas/en/styles/neumorphism/
- 本页 / This file: /uiux-atlas/styles/neumorphism/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 新拟物 · Soft UI · 软拟物
- 简介 / Tagline: 元素与背景完全同色,仅靠「一侧暗、对侧亮」的双阴影把界面从底色里挤出或压入——低对比软塑料质感,2020 年达峰后因可访问性迅速退潮。
- Tagline (EN): Elements share the page background color exactly; a dual shadow (dark on one side, light on the other) extrudes or presses them into the surface — a low-contrast soft-plastic look that peaked in 2020 and receded over accessibility failures.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| base | color · hex | #e0e5ec |
| offset | dimension · px | 9px |
| blur | dimension · px | 18px |
| mode | enum: raised · inset | raised |

## 适用场景 / When to use

- 音乐播放器、计算器等「软塑料」控制面板(该风格最初的流行场景) / Soft-plastic control panels: music players, calculators — the style's original home
- 开关、滑杆、按钮组等低频控件,按压态凸起⇄压入语义清晰 / Low-frequency controls (toggles, sliders, button groups) where raised⇄inset reads as press semantics
- 氛围优先的品牌页与概念稿,数据密度低、装饰性优先 / Atmosphere-first brand pages and concept work: low data density, decoration over information

## 何时不用 / When not to use

- 正文文本与关键信息——典型边缘对比仅约 1.4:1,低于 WCAG 2.2 SC 1.4.11 的 3:1(调研 03§3 反例) / Body text and critical information — typical edge contrast is only ≈1.4:1, below the 3:1 of WCAG 2.2 SC 1.4.11 (research 03 §3 counter-example)
- 数据密集仪表盘与表单页——层级线索太弱,扫描成本高 / Data-dense dashboards and forms — hierarchy cues are too weak to scan
- 暗色主题直接反色——暗色下需重调两个阴影而非简单反转(superdesign.dev) / Dark themes via simple color inversion — dark mode needs both shadows retuned, not flipped (superdesign.dev)

## 来源 / Sources

- https://en.wikipedia.org/wiki/Neumorphism
- https://superdesign.dev/styles/neumorphism
- https://neumorphism.io/
