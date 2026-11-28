# FLIP Technique / FLIP 技术

- 页面 / Page: /uiux-atlas/motion/flip-technique/
- English page: /uiux-atlas/en/motion/flip-technique/
- 本页 / This file: /uiux-atlas/motion/flip-technique/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: FLIP · FLIP 技术 · First-Last-Invert-Play
- 简介 / Tagline: 布局变化的动画范式:First 记录初态矩形 → Last 让 DOM 到达终态再量测 → Invert 用「初态−终态」反向 transform 抵消 → Play 播放归零;昂贵布局一次算清,动画只走合成器。
- Tagline (EN): The layout-change animation pattern: First records the initial rect, Last commits the DOM and measures again, Invert applies a reversed transform (first − last), Play animates back to zero — expensive layout once, animation compositor-only.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| duration | number · ms | 350ms |
| easing | cubicBezier | cubic-bezier(0.2, 0.7, 0.3, 1) |
| mode | enum: auto · step | auto |

## 适用场景 / When to use

- 列表重排/排序切换:项目换位但不重建 DOM,FLIP 补上位移过渡 / List reordering / sort switches: items swap slots without DOM rebuild; FLIP supplies the move tween
- 网格卡片 ↔ 放大详情的共享元素过渡(尺寸差即 scale 反算) / Grid card ↔ expanded detail shared-element transitions (the size delta becomes the scale invert)
- Tab 指示器跨槽位滑动——slot-spring 条目记载的 layoutId 气泡是同一范式的库内自动化 / Tab indicators gliding across slots — the layoutId bubble in the slot-spring entry is the library-automated form

## 何时不用 / When not to use

- 大列表全量 FLIP——每个元素两次 getBoundingClientRect 强制布局,元素越多首帧越贵 / FLIP-ing every item of a huge list — two forced layouts per element, the first frame gets expensive fast
- 对含文字的单元做大幅 scale 反算——文字被拉伸形变(aerotwist 原文警告),需调整 DOM 结构分离动画单元(补研 12§3) / Large scale inverts on text-bearing units — text visibly stretches (aerotwist's own warning); restructure the DOM to separate the animated unit (12 §3)
- 高频连续触发(拖拽跟手)——FLIP 是离散布局变化的范式,连续驱动应改直接操纵+弹簧 / High-frequency continuous triggers (drag tracking) — FLIP is for discrete layout changes; continuous driving wants direct manipulation + springs

## 来源 / Sources

- https://aerotwist.com/blog/flip-your-animations/
- https://motion.dev/docs/react-layout-animations
