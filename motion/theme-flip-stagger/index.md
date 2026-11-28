# Theme Flip Stagger / 元素级翻转换肤

- 页面 / Page: /uiux-atlas/motion/theme-flip-stagger/
- English page: /uiux-atlas/en/motion/theme-flip-stagger/
- 本页 / This file: /uiux-atlas/motion/theme-flip-stagger/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 卡片翻转换肤 · flip stagger · 元素级翻转 · 逐卡翻转换肤
- 简介 / Tagline: 每张卡片绕纵轴(rotateY)翻到 90° 侧棱时换肤、再翻回平面,逐张错峰;总时长 = duration + (n − 1) × stagger。不做整屏快照表演,与 color/theme-transition(root 快照)和 motion/view-transitions(元素级 view-transition-name)互补。
- Tagline (EN): Each card flips around its vertical axis (rotateY) to the 90° edge, re-skins at the moment it is invisible, and flips back flat — card after card on a stagger; total = duration + (n − 1) × stagger. No full-page snapshot performance: complementary to color/theme-transition (root snapshot) and motion/view-transitions (element-level view-transition-name).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stagger | number · ms | 60ms |
| duration | number · ms | 500ms |
| direction | enum: right · left · alternate | right |

## 适用场景 / When to use

- 仪表盘/组件展示页的低频换肤:卡片逐张「换装」让每个模块的变化可感知,总铺开 = stagger × (n − 1) 与 stagger-orchestration 同构 / Low-frequency re-skins on dashboards / component showcases: card-by-card re-dressing makes each module's change legible; spread = stagger × (n − 1), same structure as stagger-orchestration
- 卡片数量适中(6–12)且每张内容简单(色块 + 短标签)——90° 侧棱一闪而过,复杂内容看不清 / A moderate card count (6–12) with simple per-card content (swatch + short label) — the 90° edge flashes past, so dense content would be unreadable mid-flip
- 需要明确「逐模块换装」节奏的演示页、组件库文档、设计系统宣传页 / Demo pages, component-library docs and design-system marketing pages that want the per-module re-dressing rhythm spelled out

## 何时不用 / When not to use

- 高频主题切换(Apple HIG:高频交互避免加动效,调研 §5)——每次点击都是 n 段串联动画 / High-frequency theme toggling (Apple HIG: avoid motion on frequent interactions, research §5) — every click is a chain of n animations
- 卡片内容复杂/含图片:翻转中途 90° 侧棱只余一条线,复杂内容可读性差 / Complex cards or imagery: at the 90° edge only a line remains — dense content turns unreadable mid-flip
- n 大而 stagger 不收敛:总时长 = duration + (n − 1) × stagger 随 n 线性膨胀,最后一张等待明显 / Large n without a reduced stagger: total = duration + (n − 1) × stagger grows linearly and the last card visibly waits
- 几十张卡同时翻转:每张 3D 卡各自占合成层,层叠开销随 n 上升(demo n=6) / Dozens of cards flipping at once: each 3D card takes its own compositing layer and the cost climbs with n (demo uses n=6)

## 来源 / Sources

- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
