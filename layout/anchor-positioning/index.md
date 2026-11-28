# CSS Anchor Positioning / 锚点定位 Anchor Positioning

- 页面 / Page: /uiux-atlas/layout/anchor-positioning/
- English page: /uiux-atlas/en/layout/anchor-positioning/
- 本页 / This file: /uiux-atlas/layout/anchor-positioning/index.md
- 分类 / Category: layout 布局与响应式 / Layout
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: anchor-name · position-area · @position-try · popper 替代
- 简介 / Tagline: 把浮层「系」在锚点元素上:anchor-name 命名锚点,position-area 一句声明贴到九宫格方位,溢出时 @position-try 自动换位——Tooltip/Popover 零 JS 定位。
- Tagline (EN): Tether a floating layer to an anchor element: anchor-name names the anchor, position-area pins the pop to a grid position in one declaration, and @position-try flips it on overflow — Tooltip/Popover with zero JS.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| area | enum: bottom center · top center · right center · left center | bottom center |
| offset | dimension · px | 8px |
| tryFallback | enum: on · off | on |

## 适用场景 / When to use

- Tooltip/Popover 的零 JS 锚定——11§10 签名巧思:position-area: bottom center 一句贴住按钮,@position-try 溢出自动翻面 / Zero-JS Tooltip/Popover anchoring — the 11 §10 signature trick: position-area: bottom center pins to the button in one line, @position-try flips on overflow
- 表单校验提示锚定输入框,输入框滚到哪提示跟到哪 / Form validation messages tethered to inputs, following them wherever they scroll
- 下拉菜单/选择器的溢出换位(@position-try + position-try-order) / Dropdown menus/selectors with overflow flipping (@position-try + position-try-order)
- 条件隐藏:position-visibility: anchors-visible 让锚点滚出视口时浮层自动消失(Safari 26.2 起支持,调研 11§1) / Conditional hiding: position-visibility: anchors-visible dismisses the pop when the anchor leaves the viewport (Safari 26.2 onward, research 11 §1)

## 何时不用 / When not to use

- 不支持环境的唯一方案——必须保留 JS 回退(Chrome 125 前的 Chromium、旧 Safari 均不可用) / As the only mechanism on unsupported engines — keep the JS fallback (pre-125 Chromium and older Safari lack it entirely)
- 依赖「布局后定位」的场景——zoom/transform 下的定位时序修正 Chrome 144/Safari 27 才修、Firefox 未支持(调研 11§1) / Scenarios relying on post-layout positioning — the zoom/transform timing fix landed in Chrome 144/Safari 27 and is unsupported in Firefox (research 11 §1)
- 高频拖拽跟随的浮层——跟随性能未证实,先压测再上 / Floaters following drag at high frequency — follow performance is unverified; load-test first
- 只用 anchor 管可达性——焦点陷阱、Esc 关闭、读屏播报仍归 popover/dialog 语义 / Leaving accessibility to anchor alone — focus traps, Esc handling and screen-reader announcements stay with popover/dialog semantics

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
- https://drafts.csswg.org/css-anchor-position-1/
- https://www.firefox.com/en-US/firefox/147.0/releasenotes/
