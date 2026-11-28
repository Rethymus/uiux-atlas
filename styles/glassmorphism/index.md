# Glassmorphism / 毛玻璃

- 页面 / Page: /uiux-atlas/styles/glassmorphism/
- English page: /uiux-atlas/en/styles/glassmorphism/
- 本页 / This file: /uiux-atlas/styles/glassmorphism/index.md
- 分类 / Category: styles 风格流派 / Styles
- 来源体系 / System: 社区流派 / Community
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 毛玻璃 · Frosted Glass · Glass UI
- 简介 / Tagline: 半透明磨砂玻璃面板:背景模糊 + 低透明度填充 + 1px 细亮描边,必须叠在丰富的彩色背景上才成立。
- Tagline (EN): Frosted-glass panels: backdrop blur + translucent fill + a 1px hairline light border — only reads as glass over a rich, colorful backdrop.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| blur | dimension · px | 20px |
| fill | color · oklch | oklch(1 0 0 / 0.15) |
| border | color · oklch | oklch(1 0 0 / 0.3) |
| radius | dimension · px | 20px |
| variant | enum: light · dark | light |

## 适用场景 / When to use

- 彩色照片/渐变背景上的浮层卡片(登录卡、播放器、汇总卡) / Overlay cards over colorful photos or gradients (auth cards, players, summary cards)
- 悬浮导航与工具条——对照 Apple 全局导航 blur(20px)+saturate(180%) / Floating nav bars and toolbars — cf. Apple's global nav blur(20px)+saturate(180%)
- 模态/抽屉下面的层级垫层,让被遮内容保持可感知 / Scrim layers under modals/drawers so covered content stays perceptible
- 图片上的字幕条与角标 / Caption bars and badges on top of imagery

## 何时不用 / When not to use

- 纯色/白色背景——玻璃在平色底上失效,只剩一层淡色矩形 / Flat or white backgrounds — glass degenerates into a pale rectangle
- 小号正文与密集数据文字——填充稀释对比度,且底内容滚动时对比度持续变化 / Small body text and dense data — the fill dilutes contrast, which also shifts as backdrop content scrolls
- 玻璃叠玻璃的多层嵌套——透出的层会互相发浑 / Glass stacked on glass — layered translucency turns muddy
- 全屏内容层大面积使用——NN/g 已批评 Liquid Glass 全屏化伤害可读性(调研 03§2) / Full-screen content layers — NN/g criticized Liquid Glass' full-screen use for hurting readability (research 03 §2)

## 来源 / Sources

- https://glassmorphism.com/
- https://superdesign.dev/styles/glassmorphism
- https://hype4.academy/tools/glassmorphism-generator/
