# Law of Similarity & Closure / 格式塔·相似与闭合

- 页面 / Page: /uiux-atlas/principles/gestalt-similarity-closure/
- English page: /uiux-atlas/en/principles/gestalt-similarity-closure/
- 本页 / This file: /uiux-atlas/principles/gestalt-similarity-closure/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 相似原则 · 闭合原则 · Similarity · Closure
- 简介 / Tagline: 视觉相似(颜色/形状/大小/朝向)的元素被感知为同组;不完整的轮廓会被脑补成完整图形。相似的元素承担相似的功能,闭合让残缺的图形仍然可读。
- Tagline (EN): Visually similar elements (color/shape/size/orientation) group together; incomplete outlines are completed into whole figures. Similar look implies similar function; closure keeps broken shapes readable.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| cue | enum: color · shape | color |
| marked | number · 行 | 2行 |
| mouth | dimension · ° | 24° |

## 适用场景 / When to use

- 链接/按钮/正文用颜色+形状双通道区分,扫读时功能立辨(07§33) / Links/buttons/body text distinguished by color AND shape so function reads at a glance (07 §33)
- 同功能图标族共享形状语言(全部圆角方块/全部描边风格) / Same-function icon families share one shape language (all rounded squares, all outline style)
- 加载 spinner、环形进度:残缺圆环依赖闭合读作整体 / Loading spinners and ring progress: broken rings read as wholes via closure

## 何时不用 / When not to use

- 链接只靠颜色区分、不加下划线或形状差(与 SC 1.4.1 冲突) / Links distinguished by color alone, no underline or shape difference (clashes with SC 1.4.1)
- 多个「异类」互相争夺注意——相似性被滥用成噪音(呼应 07§30「强调要有节制」) / Multiple oddballs competing for attention — similarity abused into noise (cf. 07 §30 'use restraint')

## 来源 / Sources

- https://lawsofux.com/law-of-similarity/
- https://lawsofux.com/law-of-proximity/
