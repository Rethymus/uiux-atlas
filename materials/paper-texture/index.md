# Paper Texture / 纸纹材质

- 页面 / Page: /uiux-atlas/materials/paper-texture/
- English page: /uiux-atlas/en/materials/paper-texture/
- 本页 / This file: /uiux-atlas/materials/paper-texture/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 纸纹材质 · 纸张肌理 · Riso 质感 · 孔版印刷质感 · Risograph Texture
- 简介 / Tagline: 噪点、网格线与 riso 套色错位组成的哑光纸面质感:feTurbulence 噪点 + 细网格 + 双色版 multiply 错印——「柔光玻璃时代」(调研 17 §0)的哑光反面。调研 17 §12.4 如实标注:仅旁证,配方数值为本站工程值/社区常见值。
- Tagline (EN): A matte paper surface of grain, grid lines, and riso-style misregistered plates: feTurbulence noise + a fine grid + two-plate multiply misprint — the matte counterpoint to the "soft-glow glass era" (research 17 §0). Research 17 §12.4 states honestly: side evidence only; recipe values are this site's engineering values / community-common values.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| grain | number | 0.16 |
| misalign | dimension · px | 2px |
| grid | number · % | 15% |

## 适用场景 / When to use

- 哑光编辑感/杂志感页面与海报卡——「柔光玻璃时代」的哑光反面(§0 光谱对照) / Matte editorial/magazine pages and poster cards — the matte counterpoint to the soft-glow glass era (§0's spectrum contrast)
- 品牌印刷物数字化:zine、独立出版物、演出海报的 web 复刻 / Digitizing printed brands: web renditions of zines, indie publications, gig posters
- 需要「非玻璃」材质反差的板块:与玻璃系条目并置拉开材质层次 / Sections needing a non-glass contrast: juxtaposed with the glass-family entries to widen the material range

## 何时不用 / When not to use

- 噪点/网格压在正文小字上:细纹理干扰笔画辨识,正文应铺在纯色区 / Grain/grid over small body text: fine texture disturbs stroke recognition — lay body copy on clean areas
- 深色界面强网格:暗底上的亮网格线易产生摩尔感与视觉噪音 / Strong grids on dark interfaces: bright grid lines over dark grounds easily moiré and read as noise
- 高频大面积动态内容:纹理是静态语言,与强动效板块互相抵消 / High-frequency dynamic content: texture is a static language and cancels out against strongly animated sections

## 来源 / Sources

- https://tympanus.net/codrops/2026/10/28/paper-design-tutorials-tips-tools/
- https://css-tricks.com/grainy-gradients/
