# Specular Highlight / 镜面高光

- 页面 / Page: /uiux-atlas/materials/specular-highlight/
- English page: /uiux-atlas/en/materials/specular-highlight/
- 本页 / This file: /uiux-atlas/materials/specular-highlight/index.md
- 分类 / Category: materials 材质与光影 / Materials
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 镜面高光 · Specular Highlight · Top-edge Highlight · 顶缘天光
- 简介 / Tagline: 覆盖在元素顶缘的一道渐变「天光反射」:静态版是 inset 顶缘高光带 + 同色 hairline,动态版的光斑随元素/指针位移移动——光滑材质「镜面反射」的 web 近似。
- Tagline (EN): A gradient 'sky-light reflection' laid over the element's top edge: the static form is an inset top highlight band plus a matching hairline, while the dynamic form moves the light spot as the element/pointer shifts — a web approximation of specular reflection on glossy materials.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| intensity | number | 0.5 |
| height | dimension · px | 6px |
| hairline | dimension · px | 0.5px |
| lighting | enum: static · pointer | static |

## 适用场景 / When to use

- 玻璃/亚克力/深色浮层卡片的顶缘受光——与 backdrop-filter 搭配构成完整「材质感」 / Lit top rims on glass/acrylic/dark overlay cards — pairing with backdrop-filter for a complete material feel
- 按钮与控件的 1px 内侧高光,给平面 UI 一道「受光边缘」 / 1px inner highlights on buttons and controls, giving flat UI a lit edge
- 指针跟随的光斑:大尺寸玻璃面板、游戏化面板等需要「活体材质」的场景 / Pointer-tracked light spots: large glass panels and gamified surfaces that need a living material
- 深浅两套主题的高光校准:亮面 0.25–0.4、暗面 0.08–0.15(推导区间,按背景实测) / Calibrating highlights across themes: 0.25–0.4 on light, 0.08–0.15 on dark (derived ranges — measure against the real backdrop)

## 何时不用 / When not to use

- 正文与密集数据区的高光——顶缘亮带会干扰行阅读的扫视路径 / Highlights over body text and dense data — the lit band interferes with reading saccades
- 高光叠高光的多层材质嵌套——反射互相打架,材质发浑 / Highlights stacked on highlights in nested materials — reflections fight and the material turns muddy
- 把高光当状态指示(如选中态)——它是光照语义,不是交互语义 / Using highlights as state indicators (e.g. selection) — they encode lighting, not interaction semantics
- 无光源一致性的随手加高光——全站应共享同一光源方向,否则材质互相矛盾 / Ad-hoc highlights without a consistent light — a product shares one light direction or the materials contradict each other

## 来源 / Sources

- https://www.joshwcomeau.com/css/designing-shadows/
- https://developer.apple.com/videos/play/wwdc2025/219/
