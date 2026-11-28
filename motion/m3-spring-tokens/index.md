# M3 Spring Tokens / M3 弹簧令牌

- 页面 / Page: /uiux-atlas/motion/m3-spring-tokens/
- English page: /uiux-atlas/en/motion/m3-spring-tokens/
- 本页 / This file: /uiux-atlas/motion/m3-spring-tokens/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: Material 3 弹簧 token · MotionScheme · spring composite tokens
- 简介 / Tagline: M3 Expressive 的 motion physics 系统:scheme(expressive/standard)× speed(fast/default/slow)× type(spatial/effects) 共 12 枚 spring composite token,官方同步给出 Web 端 cubic-bezier 换算曲线与时长。
- Tagline (EN): M3 Expressive's motion physics system: scheme (expressive/standard) × speed (fast/default/slow) × type (spatial/effects) — 12 spring composite tokens, with official Web cubic-bezier conversions and durations.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| scheme | enum: expressive · standard | expressive |
| speed | enum: fast · default · slow | default |
| type | enum: spatial · effects | spatial |

## 适用场景 / When to use

- 需要 M3 Expressive 风格的位移类转场:FAB 展开、卡片变换等空间属性动画(spatial) / M3 Expressive-style positional transitions: FAB expansion, container transforms and other spatial animations
- 状态反馈类动画(选中、颜色淡入)用 effects 档:临界阻尼、150–300ms,快而不弹 / State-feedback animation (selection, color fades) on the effects tier: critically damped, 150–300ms, quick without bounce
- 跨端统一手感:Web 用官方 cubic-bezier 换算,Android 用 Compose MotionScheme 同名 token / Cross-platform consistency: Web consumes the official cubic-bezier conversions while Android uses the same-named Compose MotionScheme tokens
- 从 Material 迁移到 Web 端组件库时,以本表的曲线+时长为交付参数 / Handing off Material designs to Web component libraries using this table's curves + durations

## 何时不用 / When not to use

- spatial 曲线(y>1 过冲)用在连续量(进度条、滚动同步)——过冲属装饰性位移 / spatial curves (y>1 overshoot) on continuous quantities (progress bars, scroll sync) — overshoot is decorative displacement
- 把 expressive/standard 当作新旧体系之分——两者是并行 MotionScheme,旧 easing+duration 体系才是被替代项(调研 02§B1/B4) / Treating expressive/standard as old vs new — they are parallel MotionSchemes; the thing being replaced is the old easing+duration system (research 02 §B1/B4)
- 同屏高频操作全用 slow 档——slow 300–750ms 只适合大面积、少频次转场(M3 时长准则,调研 04§1.4) / slow tier on frequent same-screen operations — 300–750ms is for large, infrequent transitions (M3 duration rules, research 04 §1.4)
- 自行拼接贝塞尔冒充官方 token——数值必须逐枚取官方表(调研 02§B2),不得沿用社区流传的 M2 曲线 / Fabricating Béziers in place of official tokens — values must be taken token-by-token from the official table (research 02 §B2), not from community-circulated M2 curves

## 来源 / Sources

- https://m3.material.io/styles/motion/overview/specs
- https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme
- https://m3.material.io/styles/motion/overview
