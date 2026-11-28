# Magnetic Hover / 磁吸交互

- 页面 / Page: /uiux-atlas/motion/magnetic-hover/
- English page: /uiux-atlas/en/motion/magnetic-hover/
- 本页 / This file: /uiux-atlas/motion/magnetic-hover/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 磁吸交互 · 磁吸按钮 · Magnetic button · Magnetic hover · Cursor magnetism
- 简介 / Tagline: 指针进入吸引半径后,按钮被「吸」向指针按比例偏移,离开即回位;逐帧用 lerp 线性插值逼近目标,触屏与 prefers-reduced-motion 下直出普通 hover。
- Tagline (EN): Inside the attraction radius the button is pulled toward the pointer proportionally and snaps back on exit; each frame lerps toward the target, while touch and prefers-reduced-motion get the plain hover.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| radius | number | 0.45 |
| lerp | number | 0.15 |
| mode | enum: magnet · plain | magnet |

## 适用场景 / When to use

- 营销落地页的主 CTA——磁吸把「可点」预告给指针,GGSAP 官方示例场景即磁吸按钮(补研 12§5) / Primary CTAs on marketing pages — magnetism advertises clickability; GSAP's own showcase scenario is the magnetic button (12 §5)
- 桌面端小面积圆形控件(图标按钮、播放键)——吸引半径相对控件大,磁感清晰 / Small round desktop controls (icon buttons, play keys) — the attraction radius dominates the control, so the pull reads clearly
- 拖拽手柄/悬浮工具球的「预告性位移」,暗示可抓取 / Grab handles / floating tool orbs where the anticipatory pull hints at draggability

## 何时不用 / When not to use

- 触屏端——(hover: none) 下没有 hover 语义,磁吸无法成立,直接降级(补研 12§5) / Touch screens — under (hover: none) there is no hover semantics; magnetism cannot exist, degrade directly (12 §5)
- prefers-reduced-motion 用户——大位移平移/缩放是前庭障碍的典型触发源,必须直出普通态(补研 12§5) / prefers-reduced-motion users — large displacement pan/scale is a classic vestibular trigger; the plain state is mandatory (12 §5)
- 高频操作按钮(提交、删除)与密集表单区——预判性位移拖慢瞄准,HIG「高频交互避免加动效」 / High-frequency buttons (submit, delete) and dense form areas — the anticipatory pull slows targeting; HIG: avoid motion on frequent interactions

## 来源 / Sources

- https://gsap.com/docs/v3/GSAP/gsap.quickTo()
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
