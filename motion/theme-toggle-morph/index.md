# Theme Toggle Morph / 切换钮液态变形

- 页面 / Page: /uiux-atlas/motion/theme-toggle-morph/
- English page: /uiux-atlas/en/motion/theme-toggle-morph/
- 本页 / This file: /uiux-atlas/motion/theme-toggle-morph/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: 切换钮液态变形 · 日夜切换钮 · day-night toggle · sun moon morph · theme switch icon · gooey toggle
- 简介 / Tagline: 日↔月主题切换钮的本体动效:goo 液滴分离与汇合、同构 SVG 路径插值、旋转缩放三招共用同一 duration/bounce 配方对照;可中断、连点不卡半途、reduced-motion 瞬时完成。
- Tagline (EN): The day↔night toggle button's own motion: gooey droplet separation/merging, same-structure SVG path morphing and rotate-scale — three idioms on one shared duration/bounce recipe; interruptible, re-click-safe, instant under reduced motion.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| morph | enum: gooey · path · rotateScale | gooey |
| duration | number · ms | 300ms |
| bounce | number | 0.6 |

## 适用场景 / When to use

- 设置页/工具栏的主题切换钮,想给「日↔月」一点物理感——200–300ms 档起步 / Theme toggles in settings/toolbar that want physicality for day↔night — start in the 200–300ms tier
- 站点已有 goo 家族语言(菜单/标签指示器用 goo)时,切换钮同配方保持一致 / Sites already speaking the goo dialect (goo menus/indicators) keep the toggle on the same recipe
- 教学/评审场景:同一 duration/bounce 下并排对照三种实现习语的观感差异(demo 对照条) / Teaching/review: compare the look of three implementation idioms under one shared recipe (the demo's comparison strip)
- 需要可中断动效的场合:CSS transition 原生重定目标、rAF 捕获当前进度续跑,连点不卡半途 / Where interruptibility matters: CSS transitions retarget natively and the rAF path resumes from current progress — rapid re-clicks never stick

## 何时不用 / When not to use

- 高频连点工具不加冗余动效——Apple HIG:高频交互避免动效;要加就压到 200ms 档以下(调研 20§5) / High-frequency controls should skip extra motion — Apple HIG avoids motion on frequent interactions; if you must, stay under the 200ms tier (research 20 §5)
- 把变形当作「主题已切换」的唯一指示——状态必须同时由 aria-pressed 与可读视觉状态承载(WCAG 2.3.3 精神) / Letting the morph be the only signal that the theme changed — state must also ride aria-pressed and a readable visual state (WCAG 2.3.3 spirit)
- 整页/大容器主题揭示想用本条目解决——那是 color/theme-transition(圆形扩散)与 motion/view-transitions(VT 快照)的领地 / Using this entry for page-level theme reveals — that belongs to color/theme-transition (circular reveal) and motion/view-transitions (VT snapshots)
- 给 path 招喂两条不同构 path——MDN:仅 basic-shape 可插值;spike S7:子路径数不同在中点跳变 / Feeding the path technique mismatched paths — MDN: only basic-shape interpolates; spike S7: differing sub-path counts jump mid-flight

## 来源 / Sources

- https://css-tricks.com/gooey-effect/
- https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
- https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
- https://developer.apple.com/design/human-interface-guidelines/motion
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
