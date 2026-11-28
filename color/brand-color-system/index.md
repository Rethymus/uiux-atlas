# Brand Color System / 品牌色系统

- 页面 / Page: /uiux-atlas/color/brand-color-system/
- English page: /uiux-atlas/en/color/brand-color-system/
- 本页 / This file: /uiux-atlas/color/brand-color-system/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 品牌色派生 · Tonal Palette 品牌色 · brand palette derivation
- 简介 / Tagline: 从一个品牌色派生整套系统:固定 H/C 展开 tone 阶、按角色映射语义色、再对每个组合跑 WCAG 对比度验证——管线化,不靠手感。
- Tagline (EN): Derive a whole system from one brand color: expand a tone ramp at fixed H/C, map tones to semantic roles, then run every pairing through WCAG contrast gates — a pipeline, not vibes.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hue | number · ° | 250° |
| lightness | number | 0.62 |
| chroma | number | 0.19 |
| theme | enum: light · dark | light |

## 适用场景 / When to use

- 从一粒品牌色展开全套 UI 色:tone 阶承载背景/表面/边框/文字的分工(Radix 12 步同构,调研 06§8) / Expanding one brand seed into a full UI palette: the tone ramp carries backgrounds, surfaces, borders and text (isomorphic to Radix's 12 steps, research 06 §8)
- 亮暗双主题从同一色相派生:亮侧取品牌 tone,暗侧 accent 跳 tone 80(M3 官方基线 #6750A4→#D0BCFF 即此惯例,调研 06§7) / Deriving light and dark themes from one hue: light takes the brand tone, dark jumps the accent to tone 80 (exactly the M3 baseline convention #6750A4→#D0BCFF, research 06 §7)
- 多品牌/白标产品:换种子色只换 H/C/L 三个数,语义角色与对比度管线全部复用 / Multi-brand / white-label products: swapping the seed means changing three numbers (H/C/L); semantic roles and the contrast pipeline carry over untouched
- 设计-工程交接:派生规则写成函数(Material Theme Builder 同思路,调研 06§7),hex 不再手工挑 / Design-to-engineering handoff: the derivation rules ship as a function (Material Theme Builder's same idea, research 06 §7); hex values stop being hand-picked

## 何时不用 / When not to use

- 只信感知均匀就跳过对比度复核——Evil Martians 原文警示:仅靠 OKLCH 不能保证可访问性,还需校验对比度(调研 06§2) / Trusting perceptual uniformity and skipping the contrast audit — Evil Martians' own warning: OKLCH alone does not guarantee accessibility, verify contrast (research 06 §2)
- 把 oklch L 当作 CIE L*/tone 的精确换算——两者同尺度不同定义,demo 用 tone/100 直代 L 是近似,标注为近似 / Treating oklch L as an exact conversion of CIE L*/tone — same scale, different definition; the demo's tone/100-for-L substitution is an approximation and is labeled as such
- 在 sRGB 域强行使用高色度值而不处理越域——Chrome/Safari 目前直接裁剪 RGB,色相会肉眼可见地偏移(调研 06§2) / Using high-chroma values in sRGB without handling overflow — Chrome/Safari currently clip RGB outright, visibly shifting the hue (research 06 §2)
- 手写 APCA 公式来复核文本阶——官方强制使用 apca-w3 包、不许自行实现(调研 06§18);demo 只用 WCAG 公式复核 / Hand-rolling APCA math to audit text steps — the official repo mandates the apca-w3 package and forbids reimplementing the formula (research 06 §18); the demo audits with the WCAG formula only

## 来源 / Sources

- https://github.com/material-foundation/material-color-utilities
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
