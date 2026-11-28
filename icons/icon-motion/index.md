# Icon Micro-Motion / 图标动效

- 页面 / Page: /uiux-atlas/icons/icon-motion/
- English page: /uiux-atlas/en/icons/icon-motion/
- 本页 / This file: /uiux-atlas/icons/icon-motion/index.md
- 分类 / Category: icons 图标体系 / Icons
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 图标微动效 · 描边绘制 · hover 动效 · Icon Motion · stroke-dashoffset
- 简介 / Tagline: hover 触发的三招路径微动效:stroke-dashoffset 描边绘制、≤90° 旋转、fill-opacity 填充点亮——150–200ms + standard 缓动是 M3 官方区间,prefers-reduced-motion 直切终态。
- Tagline (EN): Three hover-triggered path micro-effects: stroke-dashoffset draw-in, ≤90° rotation, fill-opacity light-up — 150–200ms with standard easing is M3's sanctioned range, and prefers-reduced-motion snaps straight to the end state.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| effect | enum: dash · rotate · fill | dash |
| duration | dimension · ms | 200ms |
| easing | cubicBezier | cubic-bezier(0.2, 0, 1, 1) |

## 适用场景 / When to use

- 选中态图标(收藏/书签)的填充点亮——FILL 轴官方盖章的语义(07 §6.1) / Selection-state icons (favorite/bookmark) filling up — the FILL axis's officially sanctioned semantics (07 §6.1)
- 刷新/发送类操作的 90° 旋转确认,时长 200ms standard(07 §6.2) / Refresh/send confirmations rotating 90° at 200ms standard (07 §6.2)
- 列表项 hover 的描边重绘提示,150ms short3 / List-item hover redraw hints at 150ms short3

## 何时不用 / When not to use

- 高频工具栏图标加动效——高频交互应省略动效(Apple HIG;07 §6.2 上下文),hover 微动效留给低频强调 / Animating high-frequency toolbar icons — frequent interactions should skip motion; reserve hover micro-motion for low-frequency emphasis
- >250ms 的图标动效——进入 medium 转场档,hover 显迟钝且字形重排开销翻倍(07 §6.1/§6.2) / Icon motion beyond 250ms — the medium transition tier: sluggish for hover and doubles glyph re-raster cost (07 §6.1/§6.2)
- 无 reduced-motion 降级的填充/旋转——缩放与位移类动画可诱发前庭障碍(MDN,07 §6.3) / Fill/rotate motion without a reduced-motion fallback — scale and travel motion can trigger vestibular triggers (MDN, 07 §6.3)

## 来源 / Sources

- https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- https://fonts.google.com/icons
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
