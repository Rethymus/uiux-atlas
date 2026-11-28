# Kinetic Typography / 动态文字

- 页面 / Page: /uiux-atlas/motion/kinetic-typography/
- English page: /uiux-atlas/en/motion/kinetic-typography/
- 本页 / This file: /uiux-atlas/motion/kinetic-typography/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 动态文字 · 动态字体 · Kinetic typography · Variable font animation · 逐字揭示
- 简介 / Tagline: 两条路线:可变字体的注册轴(wght 等)做字重/宽度渐变动画——改一个变量、零重排;或把文本拆成字符/单词做交错(stagger)揭示。演示的标题既逐字上升,也随轴值连续变重。
- Tagline (EN): Two routes: registered variable-font axes (wght et al.) animate weight/width — one variable, zero reflow; or split text into characters/words for staggered reveal. The demo headline both rises letter by letter and thickens continuously on the axis.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stagger | number · ms | 40ms |
| rise | number · ms | 600ms |
| wght | number | 400 |
| reveal | enum: chars · words | chars |

## 适用场景 / When to use

- 营销页 hero 标题的首次揭晓——逐字/逐词上升 + 交错,是 SplitText 的官方主场景(补研 12§6) / First reveal of a marketing hero headline — per-char/word rise + stagger, SplitText's flagship scenario (12 §6)
- 交互状态的字重呼吸:GRAD/wght 轴 hover 强调——不加粗折行、零重排(补研 12§6/巧思 8) / Weight breathing on interaction states: GRAD/wght hover emphasis — no bold reflow, zero layout shift (12 §6 / craft 8)
- 章节转场的标题接力(page-transitions 的容器转场内嵌逐词揭示) / Section-transition title relays (per-word reveals nested in page-transitions container transitions)

## 何时不用 / When not to use

- 正文与长段落——逐字动画破坏阅读节奏,动效语义只属于标题级文字 / Body copy and long paragraphs — per-character animation wrecks reading rhythm; motion semantics belong to headline-scale text
- wdth 轴大范围动画落在会折行的容器里——宽度变化引发重排,轴动画「零重排」的前提被打破(只有不改占位的轴如 GRAD 才绝对安全) / Wide-range wdth animation inside line-wrapping containers — width changes reflow, breaking the zero-reflow premise (only metric-neutral axes like GRAD are absolutely safe)
- 把拆字文本直接暴露给读屏——逐字 span 会把单词读成字母碎片,必须 aria-label 整句 + 字符 aria-hidden / Exposing split text directly to screen readers — per-char spans read words as letter fragments; always aria-label the sentence and aria-hidden the chars

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide
- https://gsap.com/docs/v3/Plugins/SplitText/
