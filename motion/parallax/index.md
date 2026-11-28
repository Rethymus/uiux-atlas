# Parallax / 视差滚动

- 页面 / Page: /uiux-atlas/motion/parallax/
- English page: /uiux-atlas/en/motion/parallax/
- 本页 / This file: /uiux-atlas/motion/parallax/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 视差 · parallax scrolling · 多层滚动速率差
- 简介 / Tagline: 多层滚动速率差制造深度:背景层跟随滚动慢于前景(跟随比例 p,0=钉在视口、1=与内容同步),用 scroll-driven animations 的 scroll() 时间轴按层下发位移,可运行在主线程之外;reduced-motion 直出静态分层。
- Tagline (EN): Depth from per-layer scroll-rate differences: background layers follow scrolling slower than the foreground (follow ratio p, 0 = pinned to viewport, 1 = synced with content), implemented per layer with scroll() timelines of scroll-driven animations that can run off the main thread; reduced-motion renders the static layers.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| rate | number | 0.3 |
| mode | enum: css · js | css |

## 适用场景 / When to use

- 营销页/叙事页的多层背景(星空、山峦、城市天际线)——背景慢于前景制造纵深 / Multi-layer backdrops on marketing/narrative pages (starfields, mountains, skylines) — slower backgrounds create depth
- 卡片/英雄区的深度分层:装饰层以 p×2/p×3 推导速率陪跑,内容层保持 1:1 可读 / Depth layering on cards/heroes: decorative layers ride along at derived p×2/p×3 rates while content stays 1:1 readable
- 系统转场里的深度暗示——iOS 前进/后退转场即内置视差(背景慢于前景,M3 转场文档记载) / Depth cues inside system transitions — iOS forward/backward transitions ship parallax (background slower than foreground, per M3 transition docs)

## 何时不用 / When not to use

- 正文/数据落在视差层上——文字随层变速移动直接伤害可读性;视差层只放装饰 / Body copy or data on parallax layers — text moving at layer speed hurts readability; parallax layers carry decoration only
- 全屏视差铺满整个页面(visionOS 借鉴建议明确避免全屏视差,调研 11§5) / Full-screen parallax across an entire page (the visionOS-derived guidance explicitly avoids full-screen parallax, research 11 §5)
- 多层全用 JS scroll 事件驱动——主线程逐帧直写,快速滚动掉帧(官方同页结论);优先声明式 scroll() / Driving many layers from JS scroll events — main-thread per-frame writes jank under fast scrolling (same official page); prefer declarative scroll()
- 不做 reduced-motion 降级就上视差——前庭安全红线(MDN,调研 04§6.1) / Shipping parallax without a reduced-motion fallback — a vestibular safety red line (MDN, research 04 §6.1)

## 来源 / Sources

- https://developer.chrome.com/docs/css-ui/scroll-driven-animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
