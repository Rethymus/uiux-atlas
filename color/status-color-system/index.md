# Status Color System / 状态色系统

- 页面 / Page: /uiux-atlas/color/status-color-system/
- English page: /uiux-atlas/en/color/status-color-system/
- 本页 / This file: /uiux-atlas/color/status-color-system/index.md
- 分类 / Category: color 色彩与主题 / Color
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: success info warning danger · 语义状态色 · feedback colors
- 简介 / Tagline: success / info / warning / danger 四态,每态一套「底 / 边 / 字」三件套:同色相派生,文字过 AA 4.5:1、边框过非文本 3:1,demo 逐态实时复核。
- Tagline (EN): Four states — success / info / warning / danger — each with a bg/border/text triple derived from one hue: text gates at AA 4.5:1, borders at the 3:1 non-text gate, audited live per state.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| hueSuccess | number · ° | 140° |
| hueInfo | number · ° | 220° |
| hueWarning | number · ° | 90° |
| hueDanger | number · ° | 20° |
| textLightness | number | 0.45 |

## 适用场景 / When to use

- 告警条/提示条/toast 的四态皮肤:每态只发三个变量(--st-bg/--st-border/--st-fg),组件零改码 / Theming alerts, callouts and toasts in four states: each state ships three variables (--st-bg/--st-border/--st-fg) with zero component changes
- 表单校验与 CI/管道状态:红绿之外仍要过色盲复核——明度差承载状态信息,色相只是冗余编码(Primer 色盲主题同思路,调研 06§19) / Form validation and CI/pipeline statuses: beyond red/green, pass the colorblind check — lightness carries the state, hue stays redundant coding (Primer's colorblind themes, research 06 §19)
- 品牌换肤后重建状态色:四态从各自色相重新派生并整组重跑 AA(管线化,不逐个手调) / Rebuilding status colors after a re-brand: derive the four states from their hues and re-run AA as a group (a pipeline, not per-case hand tuning)
- 徽标/角标的实底变体:同色相取更高色度档做底、低档做字,继续复用同一组阈值复核 / Solid badge variants: a higher-chroma step as fill and a lower one as text on the same hue, re-audited against the same thresholds

## 何时不用 / When not to use

- 只靠红/绿区分成败——红绿色盲用户读不到;状态必须另带图标/文字(色盲复核,调研 06§19) / Relying on red/green alone for pass/fail — colorblind users lose the signal; states need icons or text as well (colorblind review, research 06 §19)
- 淡底上的浅色文字:底越浓、字越浅越容易跌破 4.5:1(WCAG 判定不四舍五入,4.499:1 不达标,调研 06§17) / Pale text on saturated tints: the stronger the tint and lighter the text, the easier 4.5:1 breaks (WCAG judges unrounded — 4.499:1 fails, research 06 §17)
- 边框颜色只当装饰不看 3:1——表达状态语义的边框属于 SC 1.4.11 非文本对比度范围(调研 06§17) / Treating the border as pure decoration — a border that carries state semantics falls under SC 1.4.11 non-text contrast (research 06 §17)
- 四态各自手挑 hex 而无派生规则——换一次主题就要全部重调,且档位间关系失去可预测性(Radix 步进结构的反面,调研 06§8) / Hand-picking hex per state with no derivation rule — every re-theme starts from scratch and the steps lose predictability (the inverse of Radix's step structure, research 06 §8)

## 来源 / Sources

- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
