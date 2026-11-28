# View Transitions / 视图过渡

- 页面 / Page: /uiux-atlas/motion/view-transitions/
- English page: /uiux-atlas/en/motion/view-transitions/
- 本页 / This file: /uiux-atlas/motion/view-transitions/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 视图过渡 · startViewTransition · 共享元素过渡
- 简介 / Tagline: document.startViewTransition(cb) 对旧/新状态分别截图,再以 CSS 动画驱动快照过渡:整页交叉淡化是平台默认,view-transition-name 命名元素可做共享元素 morph。
- Tagline (EN): document.startViewTransition(cb) snapshots the old and new states, then drives the snapshots with CSS animation: a whole-page cross-fade is the platform default, and naming elements with view-transition-name enables shared-element morphs.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| duration | number · ms | 300ms |
| easing | cubicBezier | cubic-bezier(0.4, 0, 0.2, 1) |
| mode | enum: morph · fade | morph |

## 适用场景 / When to use

- SPA 状态/路由切换的兜底动画:列表→详情、标签页切换(同文档 API,调研 04§3.1) / Fallback animation for SPA state/route changes: list→detail, tab switches (same-document API, research 04 §3.1)
- 共享元素 morph:缩略图展开为大图、导航持久元素跟随(名字唯一 + group 自动补间,调研 04§3.2) / Shared-element morphs: thumbnail expanding to a hero, persistent nav elements tracking (unique name + automatic group tween, research 04 §3.2)
- 时长/缓动全部可覆写——所有动画都是 CSS 动画(官方强调),可按品牌统一曲线 / Duration/easing fully overridable — every transition animation is a CSS animation (officially emphasized), so brand curves apply uniformly
- 进入/退出差异化:::view-transition-old/new(name):only-child 分别定义(官方示例,调研 04§3.2) / Asymmetric enter/exit: define ::view-transition-old/new(name):only-child separately (official example, research 04 §3.2)

## 何时不用 / When not to use

- 给多个元素同名 view-transition-name——过渡整体被跳过(官方唯一性警告,调研 04§3.2) / Giving several elements the same view-transition-name — the whole transition is skipped (official uniqueness warning, research 04 §3.2)
- 把过渡当关键信息载体——不支持/关闭动效的环境必须能无过渡完成同一操作 / Treating the transition as a carrier of key information — unsupported or motion-reduced environments must complete the same action without it
- 在过渡回调里做超长异步等待——官方建议 100ms 内(官方文档,调研 04§3.2) / Long async waits inside the transition callback — keep it within 100ms per the official docs (research 04 §3.2)
- 跨文档场景误用同文档 API——MPA 走 @view-transition 声明且无 JS API(Chrome 126+/Safari 18.2+,Firefox 未支持,调研 04§3.1) / Using the same-document API across documents — MPA uses the declarative @view-transition with no JS API (Chrome 126+/Safari 18.2+, unsupported in Firefox, research 04 §3.1)

## 来源 / Sources

- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://developer.chrome.com/docs/web-platform/view-transitions
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
