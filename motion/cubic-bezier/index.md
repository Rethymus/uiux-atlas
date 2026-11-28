# Cubic Bézier Easing / 贝塞尔缓动

- 页面 / Page: /uiux-atlas/motion/cubic-bezier/
- English page: /uiux-atlas/en/motion/cubic-bezier/
- 本页 / This file: /uiux-atlas/motion/cubic-bezier/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 贝塞尔缓动 · cubic-bezier() · 自定义缓动曲线
- 简介 / Tagline: cubic-bezier(x1,y1,x2,y2) 用两个控制点定义进度-时间映射:x 必须落在 [0,1],y 可以越界制造过冲回弹——CSS 缓动的通用底层表达。
- Tagline (EN): cubic-bezier(x1,y1,x2,y2) maps time to progress via two control points: x stays within [0,1] while y may overshoot for bounce — the universal building block of CSS easing.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| curve | cubicBezier | cubic-bezier(0.25, 0.1, 0.25, 1) |

## 适用场景 / When to use

- 通用 UI 过渡的默认手感(ease);小控件配 150–200ms 时长(调研 04§2.1) / The default feel for general UI transitions (ease); pair with 150–200ms on small controls (research 04 §2.1)
- 进入屏幕用 ease-out 系减速收尾、永久退出用 ease-in 系加速离场(M3 缓动选型同构,调研 04§1.4) / ease-out family to decelerate entrances, ease-in family to accelerate permanent exits (same shape logic as M3's easing selection, research 04 §1.4)
- 强调性到位与轻回弹:y1 或 y2 > 1(如 (0.34, 1.56, 0.64, 1)),宜短行程小幅度 / Emphatic arrival and light bounce: y1 or y2 > 1 (e.g. (0.34, 1.56, 0.64, 1)), best on short travels
- 对齐官方体系曲线,如 M3 Standard = cubic-bezier(0.2, 0, 0, 1)(调研 04§1.4) / Aligning with official system curves, e.g. M3 Standard = cubic-bezier(0.2, 0, 0, 1) (research 04 §1.4)

## 何时不用 / When not to use

- 进度条、滚动同步等连续量——用 linear,不该有加减速(调研 04 清单#1) / Continuous quantities like progress bars and scroll sync — use linear; no acceleration belongs there (research 04 list #1)
- 需要可打断、速度继承的真弹簧——单段贝塞尔表达不了,只能 linear() 采样近似(调研 04§1.2/1.3) / True interruptible springs with velocity inheritance — a single Bézier segment cannot express them; approximate via linear() sampling (research 04 §1.2/1.3)
- 长行程大幅度的 y 越界回弹——位移类动效是前庭触发源,必须提供 reduced-motion 降级(调研 04§6) / Large-travel y-overshoot bounce — displacement motion is a vestibular trigger and must ship a reduced-motion fallback (research 04 §6)
- 逐帧/步骤化状态切换——用 steps() 而非贝塞尔(调研 04§1.1) / Frame-by-frame or stepped state changes — use steps(), not a Bézier (research 04 §1.1)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
- https://drafts.csswg.org/css-easing-1/
