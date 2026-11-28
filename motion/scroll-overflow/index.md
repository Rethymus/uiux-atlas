# Scroll Overflow Behavior / 滚动溢出行为

- 页面 / Page: /uiux-atlas/motion/scroll-overflow/
- English page: /uiux-atlas/en/motion/scroll-overflow/
- 本页 / This file: /uiux-atlas/motion/scroll-overflow/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: overscroll-behavior · 滚动链 · scroll chaining · 滚动穿透
- 简介 / Tagline: overscroll-behavior 决定滚到边界后发生什么:contain 拦滚动链、留回弹;none 两者都拦;overflow:hidden 的容器恒在边界,天生可当弹层打开时的背景锁。
- Tagline (EN): overscroll-behavior decides what happens at a scroll boundary: contain blocks scroll chaining but keeps rubber-banding; none blocks both; an overflow:hidden container sits permanently at its boundary — a free background lock while overlays are open.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| innerMode | enum: auto · contain · none | contain |
| lockPage | enum: off · on | off |

## 适用场景 / When to use

- 弹层(dialog/drawer/popover)内的滚动区:必挂 `overscroll-behavior: contain`(调研 10 巧思 8) / Scroll areas inside overlays (dialog/drawer/popover): always `overscroll-behavior: contain` (research 10 craft #8)
- 打开弹层时锁背景:外层页面容器 overflow:hidden(+ contain),MDN 官方做法 / Locking the background while an overlay is open: overflow:hidden (+ contain) on the page container — MDN's official recipe
- 横向轮播/卡片流:`overscroll-behavior-x: contain` 防横滑链出页面,配 scroll-snap-type: x proximity(调研 10§8.4) / Horizontal carousels/card streams: `overscroll-behavior-x: contain` to keep horizontal swipes from chaining, with scroll-snap-type: x proximity (research 10 §8.4)
- 嵌入第三方页面的滚动组件(聊天窗、日历):contain 防止组件滚穿宿主页面;iframe 场景在其文档根上设置 / Embedded scrollable widgets (chat, calendar): contain stops the widget bleeding into the host page; inside an iframe set it on that document's root

## 何时不用 / When not to use

- 给整页 body 设 `none`——连橡皮筋回弹都消失,iOS 上像页面卡死;页面级留 auto 或 contain / `none` on the whole body — even the rubber band vanishes and iOS feels frozen; pages keep auto or contain
- 依赖 overscroll-behavior 替代焦点管理——它只管滚动链,弹层的键盘焦点圈定仍是 WAI-APG Dialog 的必答题 / Using overscroll-behavior as a focus-management substitute — it only governs scroll chaining; keyboard focus containment remains the WAI-APG Dialog must-do
- 滚动容器里 `mandatory` 吸附配超高内容——MDN:用户可能永远看不到某段内容,一般交互用 proximity / `mandatory` snapping with taller-than-viewport content inside scrollers — MDN: some content may become unreachable; proximity for general use
- 以为 contain 能阻止背景滚动却不锁背景——contain 只拦『链』,背景自身仍可被直接滚动;锁背景要用 overflow:hidden/滚动锁 / Expecting contain alone to freeze the background — it blocks chaining only; the background itself still scrolls when touched directly; use overflow:hidden/scroll locks for that

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts
- https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
- https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes.md
