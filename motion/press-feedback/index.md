# Press Feedback Pair / 按压反馈对

- 页面 / Page: /uiux-atlas/motion/press-feedback/
- English page: /uiux-atlas/en/motion/press-feedback/
- 本页 / This file: /uiux-atlas/motion/press-feedback/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 组件库 / Component Lib
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 按压态 · pressed state · highlighted · active 反馈
- 简介 / Tagline: 按压/释放是一对状态:按下瞬时生效(0ms)、松手才给短过渡——成熟组件库默认做色彩阶进而非 scale,scale(0.95~0.98) 是社区惯例。
- Tagline (EN): Press and release form a state pair: the press lands instantly (0ms) and only the release gets a short transition — mature libraries default to color-stepping, not scale; scale(0.95–0.98) is a community convention.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pressScale | number | 0.97 |
| pressAlpha | number | 0.8 |
| releaseDuration | dimension · ms | 120ms |
| pressResponse | enum: instant · eased | instant |
| mode | enum: scale · color | scale |

## 适用场景 / When to use

- 所有可点按钮/卡片的基础反馈:默认做色彩阶进(Arco hover −5 / active −7 的语义) / Baseline feedback for every tappable button/card: default to color stepping (Arco hover −5 / active −7 semantics)
- 触屏优先的产品:scale+alpha 按压对提供物理『按下去』的错觉,释放用 100~120ms 缓出 / Touch-first products: a scale+alpha press pair sells the physical 'pushed down' illusion, released over 100–120ms ease-out
- 键盘可达性:`:active` 与 `:focus-visible` 成对设计,Space/Enter 触发时同样能看到按压态 / Keyboard reachability: design `:active` together with `:focus-visible` so Space/Enter activation shows the pressed state too
- 高频操作按钮:遵循 HIG『高频交互避免加动效』,只做瞬时色彩切换即可 / High-frequency buttons: follow HIG 'avoid motion on frequent interactions' — an instant color flip is enough

## 何时不用 / When not to use

- 按下也加过渡——按压感被延迟,违反『即时响应』(WWDC18 803);Arco 官方即 `:active { transition: none }` / Transitioning the press-in too — it delays the press feel against 'respond immediately' (WWDC18 803); Arco officially ships `:active { transition: none }`
- 把 scale 按压说成组件库默认——AntD/Arco/shadcn/Magic UI 默认按钮均无 scale,该说法无一手证据(调研 10§9) / Claiming press-scale is a library default — no default AntD/Arco/shadcn/Magic UI button scales; the claim has no first-hand evidence (research 10 §9)
- 按压 alpha 压得太低(如 ≤0.6)——文字对比度骤降,浅色底上直接不可读 / Pressing alpha too low (≤0.6) — text contrast collapses, unreadable on light fills
- release 时长超过 200ms 还在回弹——高频点击时上一次反馈还没结束,状态语义开始打架 / Release rebounds past 200ms — with rapid clicking the previous feedback is still playing and state semantics start to collide

## 来源 / Sources

- https://github.com/arco-design/arco-design/blob/main/components/Button/style/index.less
- https://github.com/arco-design/arco-design/blob/main/components/Button/style/token.less
- https://github.com/ant-design/ant-design/blob/master/components/button/style/index.ts
- https://developer.apple.com/documentation/uikit/uicontrol/ishighlighted.md
- https://developer.apple.com/videos/play/wwdc2018/803/
