# Font Loading Strategy / 字体加载策略

- 页面 / Page: /uiux-atlas/type/font-display-strategy/
- English page: /uiux-atlas/en/type/font-display-strategy/
- 本页 / This file: /uiux-atlas/type/font-display-strategy/index.md
- 分类 / Category: type 排版 / Typography
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: font-display · FOUT · FOIT · 字体加载 · block/swap/fallback/optional
- 简介 / Tagline: @font-face 的 font-display 决定字体加载期间文本怎么显示:五档取值对应「封锁期/交换期」两段时间参数——web.dev 数值表:fallback 100ms/3s、optional 100ms/无交换。
- Tagline (EN): @font-face's font-display decides how text renders while fonts load: five values map to block/swap period lengths — the web.dev table: fallback 100ms/3s, optional 100ms/no swap.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| display | enum: auto · block · swap · fallback · optional | swap |
| loadDelay | dimension · ms | 600ms |

## 适用场景 / When to use

- 正文字体:swap 或 auto——FOUT 可接受,保证字体最终换上 / Body fonts: swap or auto — FOUT is acceptable and the font always lands
- 非关键展示字体(装饰标题、图标字体):optional——网络慢就永远用后备,零布局偏移 / Non-critical display faces (decorative headings, icon fonts): optional — slow network keeps the fallback forever, zero layout shift
- 品牌关键但可短暂缺席的标题字体:fallback——100ms 内到达才换,否则整页用后备 / Brand-critical but skippable heading faces: fallback — swap only if arrived within 100ms+3s, else the fallback stays
- 配合 prefers-reduced-data 预留省流降级(标准已定,实现待落地,调研 11§3) / Paired with prefers-reduced-data for a save-data degradation (standard set, no implementation yet, research 11 §3)

## 何时不用 / When not to use

- 正文用 block——2–3 秒不可见文本(FOIT)直接伤害阅读与 SEO 体验 / block for body text — 2–3s of invisible text (FOIT) hurts reading and SEO alike
- 把 optional 用在「必须出现」的品牌字体上——慢网络下它永远不换上 / optional on a must-show brand face — on slow networks it never swaps in
- 只声明 font-display 不管后备字体度量——交换时布局跳动的 CLS 代价 / Declaring font-display but ignoring fallback metrics — the swap-time layout shift shows up as CLS
- 对同一字体家族混用多个 display 策略而不区分场景 / Mixing display strategies within one family without distinguishing scenarios

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
- https://web.dev/articles/font-best-practices
