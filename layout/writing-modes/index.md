# Writing Modes / 书写模式

- 页面 / Page: /uiux-atlas/layout/writing-modes/
- English page: /uiux-atlas/en/layout/writing-modes/
- 本页 / This file: /uiux-atlas/layout/writing-modes/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: writing-mode · 竖排文字 · vertical-rl · 纵横对齐
- 简介 / Tagline: writing-mode 重定义整盒子的流方向:vertical-rl 一句让中文回到传统竖排(行从右往左),text-orientation 管竖排里每个字形的朝向,text-combine-upright 把年份数字叠成一小格——书脊、诗笺与竖排表单的底座。
- Tagline (EN): writing-mode redefines the flow of a whole box: one vertical-rl line returns Chinese to traditional vertical setting (lines running right-to-left); text-orientation governs each glyph's direction inside; text-combine-upright stacks year digits into one cell — the base of spines, poem cards and vertical forms.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| mode | enum: vertical-rl · vertical-lr · horizontal-tb · sideways-lr | vertical-rl |
| orientation | enum: mixed · upright · sideways | mixed |
| combine | enum: none · all | none |

## 适用场景 / When to use

- 中文竖排诗笺/书法页面:vertical-rl 恢复「自上而下、行从右起」的传统文序 / Vertical Chinese poem or calligraphy pages: vertical-rl restores the traditional top-to-bottom, right-to-left line order
- 侧边书脊标签:aside h2 { writing-mode: vertical-rl }——调研 12§2 片段的原始用例 / Side spine labels: aside h2 { writing-mode: vertical-rl } — research 12 §2's original fragment use case
- 竖排里的年份与编号:text-combine-upright: all 让「2026」占一个字格,不打断行气 / Years and numbers inside vertical lines: text-combine-upright: all fits '2026' in one em-square without breaking the line rhythm
- 日式纵排表单/名片类版式:vertical-rl + text-orientation 控制混排字形朝向 / Japanese vertical forms and card layouts: vertical-rl + text-orientation tuning mixed-script glyph orientation

## 何时不用 / When not to use

- 整站正文竖排——竖行阅读效率低于横排,竖排适合短文本与装饰性版块 / Setting whole-site body copy vertical — vertical lines read slower; vertical suits short text and decorative blocks
- 生产环境裸写 sideways-lr 不加检测——experimental 值在未支持引擎整条无效(调研 12§2) / Shipping bare sideways-lr without detection in production — the experimental value is wholly invalid on unsupporting engines (research 12 §2)
- 用 lr/tb 旧值——已废弃(调研 12§2) / Using the legacy lr/tb values — deprecated (research 12 §2)
- 竖排里塞长英文单词——词内断行不可控,拉丁长词应放横排容器或 sideways 独立块 / Long English words inside vertical CJK lines — intra-word breaking is uncontrolled; keep long latin in horizontal containers or dedicated sideways blocks

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
- https://drafts.csswg.org/css-writing-modes-4/
