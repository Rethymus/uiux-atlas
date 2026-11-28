# Slot Spring (Segmented) / 卡槽弹簧(竹简槽)

- 页面 / Page: /uiux-atlas/motion/slot-spring/
- English page: /uiux-atlas/en/motion/slot-spring/
- 本页 / This file: /uiux-atlas/motion/slot-spring/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Apple HIG / Apple HIG
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 分段滑块弹簧 · segmented control spring · layoutId pill · 竹简槽
- 简介 / Tagline: 分段控件里滑签沿固定槽位弹簧滑动:一只常驻气泡在 N 个卡位间物理位移(可中断、速度接力),把 iOS 分段控件指示器的滑动感搬进 Web。
- Tagline (EN): In a segmented control the indicator slides between fixed slots on a spring: one persistent bubble physically travels across N slots (interruptible, velocity-preserving) — the iOS segmented-control indicator feel brought to the web.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stiffness | number | 300 |
| damping | number | 25 |
| segments | enum: 3 · 4 · 5 | 4 |

## 适用场景 / When to use

- 分段控件/标签页指示器:单气泡跨槽位滑动,300/25 起步,追求克制手感降到 700/40(快·稳档) / Segmented controls / tab indicators: one bubble sliding across slots; start at 300/25, drop toward 700/40 (fast-stable tier) for restraint
- 强调『竹简手感』的场合:200/15(慢·弹档,过冲 14%),适合偶发操作的强调,不适合高频切换 / When the 'bamboo-slip feel' is the point: 200/15 (slow-bouncy tier, 14% overshoot) suits emphatic infrequent actions, not high-frequency switching
- 与 iOS 分段控件对照:等宽段 + 单一选择器语义 + 弹簧指示器;iPhone 上 ≤5 段(HIG) / Mirroring the iOS segmented control: equal-width segments + single-selector semantics + a spring indicator; ≤5 segments on iPhone (HIG)
- 需要中断接力的滑动:点击新槽位时弹簧从当前位置+当前速度续接,不归零重启 / Interruptible sliding: clicking a new slot continues from the current position + velocity — never a from-rest restart

## 何时不用 / When not to use

- iPhone 上超过 5 段或混入『动作触发』段——违反 HIG 分段控件规范(调研 10§2.4) / More than 5 segments on iPhone or mixing in 'action trigger' segments — violates the HIG segmented-control guidance (research 10 §2.4)
- 照抄社区流传的 500/50 而不算 ζ——那是过阻尼假弹簧(ζ≈1.118),比微弹档更钝(调研 10§2.3) / Copying the folk 500/50 without computing ζ — an overdamped fake spring (ζ≈1.118), duller than the micro-bounce tier (research 10 §2.3)
- 进度条/连续量用卡槽弹簧——指示器语义是离散槽位;连续量该走进度条(参考 motion-spring 条目同款告诫) / Slot springs on progress bars / continuous quantities — the indicator means discrete slots; continuous values belong on progress bars (same caveat as the motion-spring entry)
- 每个槽位各自渲染选中背景再各自动画——应只养一个常驻气泡(单元素位移),否则槽位间会出现形变与跳变 / Rendering a selected background per slot and animating each — keep exactly one persistent bubble (single-element travel), or slots will morph and jump

## 来源 / Sources

- https://buildui.com/recipes/animated-tabs
- https://motion.dev/docs/react-layout-animations
- https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/generators/spring.ts
- https://developer.apple.com/design/human-interface-guidelines/segmented-controls
- https://en.wikipedia.org/wiki/Damping_ratio
