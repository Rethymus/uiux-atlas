# Fitts's Law / Fitts 定律

- 页面 / Page: /uiux-atlas/principles/fitts-law/
- English page: /uiux-atlas/en/principles/fitts-law/
- 本页 / This file: /uiux-atlas/principles/fitts-law/index.md
- 分类 / Category: principles 交互法则 / Principles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 费茨定律 · Fitts Law
- 简介 / Tagline: 获取目标的时间取决于目标的距离与大小:目标越小、越远,命中越慢、错误越多。触控目标要大、间距要足、离注意力区要近。
- Tagline (EN): Time to acquire a target is a function of its distance and size: smaller and farther targets take longer and fail more. Make touch targets big, well spaced, and close to the focus area.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| size | dimension · px | 48px |
| distance | dimension · px | 160px |

## 适用场景 / When to use

- 移动端主要操作按钮与底部导航项——用 48px 级目标(04§2.1) / Primary mobile actions and bottom-nav items — 48px-class targets (research 04 §2.1)
- 销毁类操作:目标做小 + 远离高频区,是 Fitts 的合法反向运用 / Destructive actions: shrink and move them away from hot zones — a legitimate inverse use of Fitts
- 工具栏与表单:把主按钮放在注意力停留处附近 / Toolbars and forms: put the primary button near where attention rests

## 何时不用 / When not to use

- 密集小图标按钮相互贴身排列——间距不足会放大误触 / Dense icon buttons packed together — insufficient spacing amplifies mistaps
- 把关键操作移到屏幕远角以「腾地方」 / Relocating key actions to far screen corners to 'make room'

## 来源 / Sources

- https://lawsofux.com/fittss-law/
- https://www.nngroup.com/articles/ten-usability-heuristics/
