# Page Transition Patterns / 页面转场模式

- 页面 / Page: /uiux-atlas/motion/page-transitions/
- English page: /uiux-atlas/en/motion/page-transitions/
- 本页 / This file: /uiux-atlas/motion/page-transitions/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Material 3 / Material 3
- 参数化程度 / Parameterization: 3/3
- 别名 / Aliases: 转场选型 · M3 transition patterns · 六大转场模式
- 简介 / Tagline: M3 官方六大转场模式选型:Container transform(持久容器连接起止)、Forward/backward(层级前进后退,Android 滑动+淡出、iOS 视差)、Lateral(同级齐滑)、Top level(先快淡出再淡入)、Enter/exit(按来源方向进出)、Skeleton loaders(骨架脉动→内容快淡入)。
- Tagline (EN): M3's six official transition patterns: Container transform (a persistent container links both states), Forward/backward (hierarchy travel — Android slide+fade, iOS parallax), Lateral (same-level group slide), Top level (quick fade out, then in), Enter/exit (in/out along the origin direction), and Skeleton loaders (skeleton pulse → content fades in fast).

## 参数 / Parameters

| name | type | default |
|---|---|---|
| pattern | enum: container · forward · lateral · toplevel · enterexit · skeleton | container |
| duration | number · ms | 300ms |

## 适用场景 / When to use

- 列表→详情、FAB/搜索框→详情页:Container transform,持久容器关系最强、感知最具表达力 / List→detail, FAB/search bar→detail page: Container transform — the persistent container carries the strongest relationship and expressiveness
- 层级导航前进/后退:forward/backward(Android 滑动+淡出;iOS 视差) / Hierarchy navigation forward/backward: forward/backward (Android slide+fade; iOS parallax)
- tabs/carousel 同级切换:Lateral 成组齐滑、无淡出,暗示可手势滑动 / Tabs/carousel peer switching: Lateral group slide with no fade, hinting swipe gestures
- drawer/bottom sheet 的进出场:Enter/exit——sheet/键盘自底部、抽屉自侧缘,临时退出暗示可召回 / Drawer/bottom-sheet entrances: Enter/exit — sheets/keyboards from the bottom, drawers from a side edge; temporary exits hint recallability

## 何时不用 / When not to use

- 顶层目的地切换(nav bar/rail)滥用 Container transform——官方口径:顶层切换刻意不用持久元素建立强关联 / Container transform on top-level destinations (nav bar/rail) — officially top-level switches deliberately avoid persistent elements
- 同级横滑掺入淡出或视差——Lateral 的语义是「同一层的两个视角」,淡化会暗示层级变化 / Fades or parallax inside lateral slides — Lateral means "two views of one level"; fading implies a hierarchy change
- dialog/menu 用 scale/z 轴位移进出(Android 侧官方明确避免,因其暗示层级变化) / Dialogs/menus entering with scale/z-axis travel (explicitly avoided on Android — it implies a hierarchy change)
- 骨架脉动做完不做「内容快速淡入」——官方模式的后半段,缺了内容出现会显得突兀 / Running the skeleton pulse without the "content fades in fast" second half — an official part of the mode; skipping it makes content feel abrupt

## 来源 / Sources

- https://m3.material.io/styles/motion/transitions/transition-patterns
- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
