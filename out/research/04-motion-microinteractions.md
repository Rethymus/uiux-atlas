# 调研报告：现代前端动效与微交互设计知识体系

- 调研日期：2026-11-20
- 调研方向：动效基础 / 微交互模式 / 视图转场 / 滚动驱动动画 / 手势与触感 / 无障碍动效
- 检索方法说明：本次会话中内置 WebSearch 与 web_reader MCP 的周/月配额已耗尽（工具返回 Limit Exhausted），全程改用 `fox_fetch`（HTTP 直抓 + Jina 兜底）逐页抓取一手来源核实；JS 渲染的 SPA（m3.material.io、Apple 文档）分别通过 Jina 代理与 Apple 官方文档 JSON 数据接口（`/tutorials/data/...`）获取正文。下文每条信息均来自本会话实际抓取的页面内容，URL 即抓取地址；凡未能核实之处均已显式标注。

---

## 1. 动效基础

### 1.1 Easing 曲线族（CSS）

来源：MDN `<easing-function>`（实抓，页面更新于 2026-04-20；规范为 CSS Easing Functions Level 1/2）。
URL：https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function

- 三大类：`<linear-easing-function>`（`linear` 关键字、`linear()`）、`<cubic-bezier-easing-function>`（`ease` 系关键字、`cubic-bezier()`）、`<step-easing-function>`（`step-start`/`step-end`/`steps()`）。
- 关键字对应的贝塞尔值（MDN 原文）：`ease = cubic-bezier(0.25, 0.1, 0.25, 1)`；`ease-in = cubic-bezier(0.42, 0, 1, 1)`；`ease-out = cubic-bezier(0, 0, 0.58, 1)`；`ease-in-out = cubic-bezier(0.42, 0, 0.58, 1)`；`linear = cubic-bezier(0, 0, 1, 1)`。
- `cubic-bezier(x1, y1, x2, y2)`：x 必须在 [0,1]，**y 可越界**（如 1.1、-0.6），从而实现 overshoot/回弹（MDN 示例 `cubic-bezier(0, 1.1, 0.8, 4)`）。
- `steps(n, jump-start|jump-end|jump-none|jump-both|start|end)`：阶梯跳变，用于逐帧动画。

### 1.2 `linear()` 与弹簧/弹跳曲线近似

- MDN `linear()`（实抓；**Baseline：2023 年 12 月起全浏览器可用**）：`linear(0, 0.5 25% 75%, 1)` 用 ≥2 个进度点（可带 0–2 个百分比控制时间位置）做分段线性插值，可用密集采样点逼近任意曲线（弹簧、bounce、elastic）。
  URL：https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear
- Jake Archibald《linear() easing generator》（GitHub README 实抓）：此前 web 上只有 cubic-bezier 时无法表达 bounce/spring/elastic；该工具把 JS/SVG 缓动定义转成 `linear()` 输出。工具页：https://linear-easing-generator.netlify.app/ ，README：https://raw.githubusercontent.com/jakearchibald/linear-easing-generator/main/README.md
  - 示例输出（bounce）：`linear(0, 0.004, 0.016, …, 0.765, 1, 0.891 40.9%, …, 0.938, 0.941, 1)`，直接用于 `animation-timing-function: var(--bounce-easing)`。

### 1.3 Spring 物理参数（两套主流参数体系）

**A. Motion（motion.dev，前 Framer Motion）React transitions 文档（实抓）**
URL：https://motion.dev/docs/react-transitions

- `type: "spring"` 物理弹簧参数：`stiffness`（文档标注默认 1，越大越突然）、`damping`（默认 10，0 则无限振荡）、`mass`（默认 1，越大越迟缓，布局动画可 `mass: "auto"` 按元素尺寸取重）、`velocity`（初始速度，默认取当前值速度）、`restSpeed`（默认 0.1/s）、`restDelta`（默认 0.01，低于即停）。
  - 注：该页 stiffness 默认值标注为 1；旧社区常见说法是 Framer Motion 默认 stiffness=100，本次未取得佐证，**未证实**，以文档页当前标注为准。
- **duration 弹簧**：`bounce`（默认 0.25，取值 [-1,1]；0=临界阻尼无回弹，负值=过阻尼、启动更快收尾更慢）+ `duration`（固定总时长，忽略 velocity）；Motion 12 新增 `visualDuration`（视觉上"到达目标"的秒数，回弹发生在其后，便于与其他时长动画对齐）。设置 stiffness/damping/mass 会覆盖 bounce/duration。
- `tween`：`duration` 默认 0.3s（多关键帧时 0.8s）、`ease`（含 backIn/backOut/anticipate 等）、`times`（关键帧位置）。
- 惯性 `inertia`（拖拽释放）：`power`（默认 0.8）、`timeConstant`（默认 700）、`modifyTarget`（吸附网格）、`min/max` + `bounceStiffness`（默认 500）/`bounceDamping`（默认 10）。
- `useSpring`：独立弹簧 motion value 或跟踪另一 motion value（可配 `stiffness`、`skipInitialAnimation`）。
  URL：https://motion.dev/docs/react-spring
- 编排：`delay`（负值=中途开始）、`repeat`、`repeatType`；文档页目录明确含 "delay and stagger" 编排能力（stagger 细节位于同页未截取部分）。

**B. SwiftUI / Apple（官方文档 JSON 接口实抓）**
URL：https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:)

- `Animation.spring(response:dampingFraction:blendDuration:)` 默认值：**response = 0.5（秒）、dampingFraction = 0.825、blendDuration = 0**。
- 参数语义（Apple 原文）：`response` 是"以近似时长（秒）表达的刚度"，0 表示无限刚（适合交互驱动）；`dampingFraction` 是"相对临界阻尼所需阻尼量的比例"。
- 同族：`spring(duration:bounce:blendDuration:)`（iOS 17+，时长+bounce 表达）、`interactiveSpring`（更低 response 的交互弹簧）、`interpolatingSpring(mass:stiffness:damping:initialVelocity:)`；连续 spring 动画接力时**保留速度**。
- HIG Motion 页（.md 实抓）另注：WatchKit 布局动画**内置缓动且不可关闭/自定义**。
  URL：https://developer.apple.com/design/human-interface-guidelines/motion.md

### 1.4 Duration 与编排（Material 3 官方建议）

来源：M3《Applying easing and duration》（Jina 抓取）+《Motion easing & duration tokens》（Jina 抓取）。
URL：https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration
URL：https://m3.material.io/styles/motion/easing-and-duration/tokens-specs

- 官方建议配对表：

| Easing | Duration | 过场类型 |
| --- | --- | --- |
| Emphasized | 500ms | 起止均在屏内 |
| Emphasized decelerate | 400ms | 进入屏幕 |
| Emphasized accelerate | 200ms | 永久退出屏幕 |
| Standard | 300ms | 起止均在屏内 |
| Standard decelerate | 250ms | 进入屏幕 |
| Standard accelerate | 200ms | 退出屏幕 |

- 缓动类型选择：起止在屏内→Emphasized（快起缓停）；进入→Decelerate（峰值速度起、缓停）；永久退出→Accelerate（静止起、峰值速度止，暗示不可找回）；**临时退出（drawer/sheet）→Emphasized**（停在屏缘，暗示可召回）。
- 时长准则：按转场覆盖面积缩放（小面积 200ms、大面积 500ms）；**进入比退出更长**（例：进入 500ms / 退出 200ms），因为退出需要的注意力更少；>600ms 仅用于无用户输入的环境类转场。
- Token 分档：short1–4 = 50/100/150/200ms（小工具类，**选择控件 200ms + Standard easing**）；medium1–4 = 250/300/350/400ms（FAB→Sheet 400ms）；long1–4 = 450/500/550/600ms（Card→全屏 500ms + Emphasized）；extra-long1–4 = 700/800/900/1000ms。
- Emphasized easing 在 CSS 无等价贝塞尔（官方标注 N/A，用 Standard 兜底）；各平台数值：
  - `md.sys.motion.easing.emphasized.decelerate`：CSS `cubic-bezier(0.05, 0.7, 0.1, 1.0)`；
  - `md.sys.motion.easing.emphasized.accelerate`：CSS `cubic-bezier(0.3, 0.0, 0.8, 0.15)`；
  - `md.sys.motion.easing.standard`：CSS `cubic-bezier(0.2, 0.0, 0, 1.0)`；`standard.decelerate = cubic-bezier(0, 0, 0, 1)`；`standard.accelerate = cubic-bezier(0.3, 0, 1, 1)`；Android Emphasized 用多段 pathInterpolator（`M 0,0 C 0.05,0 … 1,1`）。

### 1.5 动效性能基础（web.dev / Chrome 官方指南，实抓）

URL：https://web.dev/articles/animations-guide

- 只动画 `transform`（translate/rotate/scale）与 `opacity`，避免触发布局/绘制的属性（`top/left` 演示会造成大量丢帧）；`will-change` 仅在发现图形问题时使用、变更结束后移除（或 `transform: translateZ(0)` 兼容旧浏览器）；模糊/阴影类绘制成本高。
- 补充（Chrome 滚动驱动文章）：滚动驱动动画可运行在**主线程之外**（合成器动画）。

### 1.6 Apple HIG Motion 设计原则（.md 实抓）

URL：https://developer.apple.com/design/human-interface-guidelines/motion.md

- 动效要有目的、**可关闭**（不能作为传达关键信息的唯一渠道，需辅以 haptics/audio）；反馈动效"简短精确"；高频交互避免加动效；**让人可以取消动效**（不要迫使用户等动画播完）。
- visionOS 特别约束：避免视野边缘动效；大物体移动用透明度/低对比缓解；物体重定位可用淡出→移动→淡入；**约 0.2Hz 的持续振荡人眼极其敏感**，需避免或低幅。

---

## 2. 微交互模式分类（代表实现与可调参数）

### 2.1 Hover / 按压反馈（交互状态）

来源：M3 Switch specs（Jina 抓取）；M3 交互状态体系（同页链接 "interaction states"）。
URL：https://m3.material.io/components/switch/specs

- M3 组件定义五态：enabled / hovered / focused / pressed / disabled；按压反馈用 **state layer**（开关上为 40dp 圆形覆盖层）+ 目标尺寸（target 48dp）。
- 可调参数示例（Switch）：track 52×32dp、outline 2dp；**handle 未选 16dp→选中 24dp→按压放大到 28dp**（按压即尺寸+状态层双重反馈）；ripple/state layer 覆盖 40dp。
- CSS 侧通用做法：`:hover/:active` + `transition`（属性与曲线见 §1.1），时长建议落在 M3 short 档（150–200ms，见 §1.4）；高频控件遵循 HIG "高频交互避免加动效" 原则（URL：https://developer.apple.com/design/human-interface-guidelines/motion.md ）。

### 2.2 加载反馈（spinner / skeleton / 进度条）

**NN/g《Progress Indicators Make a Slow System Less Insufferable》（实抓）**
URL：https://www.nngroup.com/articles/progress-indicators/

- 关键阈值（可调参数即"选型阈值"）：<1s 用即时状态变化（按钮按压态等）；**1s 以上必须给进度指示**；循环动画（spinner/looped bar）只适合 **2–10s**；**10s 以上用 percent-done 进度条**，并附文字说明（如 "Loading comments…"）；>10s 还应给出完成时间估计。
- 有进度指示时用户满意度更高、平均可等待 **3 倍**时长（内布拉斯加大学实验，NN/g 转述）。

**Luke Wroblewski《Avoid The Spinner》（实抓）**
URL：https://www.lukew.com/ff/entry.asp?1797

- 进度指示会让人"盯着钟看"，反而感觉更慢；骨架屏（skeleton screen）让注意力落在"内容正在到来"而非"等待"，Polar 用其消灭了 spinner；Google 搜索用"页面滑入即转场"把指示器并入转场来营造即时感。

**M3 Skeleton loaders（转场模式之一，Jina 抓取）**
URL：https://m3.material.io/styles/motion/transitions/transition-patterns

- 骨架屏 = "UI 抽象，暗示内容加载后出现的位置"，与其它转场组合以降低感知延迟、稳定布局；**微妙脉动动画**表示不确定进度（视觉走向：从屏幕左上到右下）；内容加载完成后**快速淡入**覆盖骨架。

### 2.3 成功 / 失败反馈

来源：Apple HIG《Playing haptics》（.md 实抓）+ M3 Enter/exit 模式（同 §2.2 M3 页）。
URL：https://developer.apple.com/design/human-interface-guidelines/playing-haptics.md

- **Notification haptics 三件套**（任务结果反馈）：Success（两段脉冲）、Warning（两段）、Error（四段脉冲）；文档以波形动画展示"不同时长/强度的脉冲序列"。
- 视觉侧惯例：M3 Enter/exit within bounds 模式——dialog/menus/snackbars 沿 x/y 轴展开收起（Android，避免 scale/z 轴位移因其暗示层级变化）；iOS 统一 scale 进入、淡出退出；snackbar 依位置定向展开（底部向上、顶部向下）。
  URL：https://m3.material.io/styles/motion/transitions/transition-patterns

### 2.4 空状态动效

- **未找到可靠的一手专门资料**：NN/g 无对应文章（`https://www.nngroup.com/articles/empty-state/` 实抓为 404，且 NN/g 404 页明确警告常见 AI 幻觉 URL）；M3/Apple HIG 亦无"空状态动效"专项规范（本次检索范围内）。可参考的最近依据：M3 skeleton loaders（占位→内容快速淡入，§2.2）与 HIG "动效要有目的、可关闭、简短精确"（§1.6）。此子方向标注为「未找到可靠资料」。

### 2.5 数字滚动（count-up）

来源：CSS-Tricks《Animating Number Counters》（实抓，含作者 Carter Li 与评论区的可访问性讨论）。
URL：https://css-tricks.com/animating-number-counters/

- CSS 方案：`@property --num { syntax: '<integer>'; initial-value: 0; inherits: false; }`，对注册变量做 transition/keyframes 插值，再经 `counter-reset: num var(--num)` + `content: counter(num)` 显示；可用 `calc()` 拆整数/小数位分别渲染。
- 可调参数：transition 时长与缓动、`animation-fill-mode: forwards`（停在终值）、起始/终值。
- 可访问性注意（评论区实测）：屏幕阅读器读到的是初值或中间值（VoiceOver 读出 8/61 而视觉停在 100）→ 建议配 `prefers-reduced-motion` 直接呈现终值；hover 触发需补 `:focus` 与 `tabindex`。

### 2.6 开关 / 滑块等控件动效

来源：M3 tokens 页示例注 + M3 Switch specs。
URL：https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
URL：https://m3.material.io/components/switch/specs

- M3 官方示例："**Selection controls have a short duration of 200ms with Standard easing**"（即 `duration.short4 = 200ms` + `cubic-bezier(0.2, 0, 0, 1)`）。
- Switch 规格与按压动效参数见 §2.1（handle 16→24→28dp 等）。
- Apple 侧：iOS 系统的 toggle/slider/picker **自动播放系统触感反馈**（HIG haptics 原文），自定义控件可用 feedback generator 播放 notification/impact/selection 预设。
  URL：https://developer.apple.com/design/human-interface-guidelines/playing-haptics.md

---

## 3. 页面与视图转场

### 3.1 View Transitions API（总览与浏览器支持）

来源：MDN View Transition API（实抓，更新于 2026-09-28）+ Chrome for Developers 官方概览（实抓）。
URL：https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
URL：https://developer.chrome.com/docs/web-platform/view-transitions

- 机制：浏览器对旧/新状态拍照 → 冻结渲染并更新 DOM → 以 **CSS 动画**驱动快照过渡；减少认知负担、保持上下文、降低感知加载延迟。
- 同文档（SPA）：`document.startViewTransition(() => updateDOM())`；**Chrome/Edge 111+、Safari 18+、Firefox 144+**（Chrome 文档表格）。
- 跨文档（MPA）：双侧 CSS 声明 `@view-transition { navigation: auto; }` 即随同源导航自动触发，无 JS API；**Chrome 126+、Safari 18.2+**（Firefox 未支持，表格为 x）；配套 `pageswap`/`pagereveal` 事件在旧/新文档中操控 `ViewTransition` 对象。
- MDN 列出的组成：`view-transition-name`、`view-transition-class`、`view-transition-scope`（Level 2 新）、`:active-view-transition(-type())`、伪元素树 `::view-transition → group → image-pair → old/new`；`<link rel="expect">` 保证首帧一致；`view-transition-name: match-element`（Level 2，列表项独立动画示例）。
- View transition types：`ViewTransition.type` + `:active-view-transition-type()` 按类型差异化转场（MDN Interfaces 列表）。

### 3.2 Shared element transition（同文档详解，Chrome 官方，实抓）

URL：https://developer.chrome.com/docs/web-platform/view-transitions/same-document

- 默认过渡为交叉淡化（old `opacity 1→0`、new `0→1`，配合 `mix-blend-mode: plus-lighter`）；所有动画都是 CSS 动画，可全部覆写（如 Material shared-axis 示例：退出 90ms `cubic-bezier(0.4, 0, 1, 1)` + 300ms `cubic-bezier(0.4, 0, 0.2, 1)`；进入 210ms `cubic-bezier(0, 0, 0.2, 1)` 延迟 90ms）。
- **`view-transition-name` 必须唯一**，否则跳过过渡；命名后 `::view-transition-group(name)` 自动过渡位置、transform、宽高。
- 跨元素 morph：缩略图与大图**不必是同一 DOM 节点**——过渡期间给缩略图动态赋同名 `view-transition-name` 即被视为同一元素（`thumbnail.style.viewTransitionName = 'full-embed'`）。
- 进入/退出差异化：`::view-transition-new(sidebar):only-child` / `::view-transition-old(sidebar):only-child` 分别定义（仅存在于新/旧一侧时）。
- 批量样式：`view-transition-class: card` + `html::view-transition-group(.card)`（Chrome 125+、Safari 18.2+、Firefox 144+），免去逐个命名写选择器。
- 异步等待：回调可返回 promise（如 `document.fonts.ready`，官方建议 `Promise.race` 限 100ms 内）；图片类可用 `animation: none; mix-blend-mode: normal; height:100%; overflow: clip;` 让缩略图常驻、新图盖上来避免闪烁。
- 同时只允许一个视图过渡；新过渡开始时旧过渡直接跳到结尾。

### 3.3 模态 / 抽屉等组件转场模式（M3 官方六模式，Jina 抓取）

URL：https://m3.material.io/styles/motion/transitions/transition-patterns

1. **Container transform**：Card/搜索框/FAB/Sheet 无缝展开为详情页（持久容器连接起止态，关系最强、感知最具表达力）。
2. **Forward and backward**：层级前进/后退；Android 滑动+淡出（减少位移量），iOS 视差（背景慢于前景）。
3. **Lateral**：同级横滑（tabs/carousels），无淡出/视差，元素成组齐滑，暗示可手势滑动。
4. **Top level**：顶层目的地切换（nav bar/rail/drawer），先快速淡出再淡入，刻意**不用**持久元素建立强关联。
5. **Enter and exit**：屏内（dialog/menu/snackbar，沿出入点方向轴展开）；越屏（drawer/bottom sheet 滑入滑出）；进入方向建立空间模型——通知自顶部、抽屉自侧缘、sheet/键盘自底部。
6. **Skeleton loaders**：见 §2.2。
- 时长/缓动搭配回看 §1.4：屏内起止用 Emphasized 500ms（大面积）/Standard 300ms；进入 decelerate 400ms；永久退出 accelerate 200ms；临时退出（drawer）用 Emphasized。

---

## 4. 滚动驱动动画 / 视差 / Reveal on scroll

来源：Chrome for Developers《使用滚动驱动的动画…》（实抓，Bramus，2023-05-05 发布）+ MDN CSS scroll-driven animations 模块（实抓，更新于 2026-10-05）。
URL：https://developer.chrome.com/docs/css-ui/scroll-driven-animations
URL：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations

- 两类时间轴：**Scroll Progress Timeline**（滚动容器滚动位置 0%→100%）与 **View Progress Timeline**（元素在滚动容器内的相对位置，类似 IntersectionObserver）。
- CSS：`animation-timeline: scroll()` / `view()`；`scroll(<scroller>, <axis>)`（scroller: nearest/root/self，axis: block/inline/x/y）；命名时间轴 `scroll-timeline-name: --x`（配 `animation-timeline: --x`），跨非祖先用 `timeline-scope`；`view(<axis>, <view-timeline-inset>)`。
- 注意：`animation-timeline` 不在 `animation` 简写内，须在简写**之后**声明；duration 写 `auto`。
- **animation-range（可调参数核心）**：范围名 `cover / entry / exit / entry-crossing / exit-crossing / contain` + 偏移百分比。Reveal 示例：`animation-range: entry 25% cover 50%`（图片进入视口 25% 处开始、滚过视口 50% 时完成）。官方范围可视化工具：https://goo.gle/view-timeline-range-tool
- 官方 Reveal 示例：`@keyframes reveal { from { opacity:0; clip-path: inset(0% 60% 0% 50%);} to {…} }` + `animation-timeline: view()`。
- 阅读进度条示例：固定顶栏 `transform: scaleX(0→1)`（transform 而非 width 以走合成器）+ `animation-timeline: scroll()`。
- WAAPI：`new ScrollTimeline({ source, axis })` 传给 `animate(..., { timeline: tl, rangeStart, rangeEnd })`。
- 性能要点：传统 scroll 事件在主线程且与合成器滚动异步→卡顿；声明式滚动驱动动画**可在主线程外运行**。
- 浏览器支持：文章快照为 Chrome/Edge 115+；Firefox/Safari 当前精确状态**未在本次逐项核实**（文章表格显示值疑有解析噪声），以 MDN 兼容性表为准。
- **视差**：Chrome 文章将"视差背景图"列为滚动驱动动画的典型用例（前景/背景随不同 timeline/range 速度移动）；未找到更专门的一手规范文章。
- 新动向（MDN 模块页"Related concepts"）：**CSS animation triggers**（`animation-trigger`、`timeline-trigger-*`）——scroll-triggered animations 正在标准化（MDN 列出属性名，规范为 Scroll-driven Animations 模块）；细节本次未深入。

---

## 5. 手势交互与触感类比

### 5.1 手势（Apple HIG《Gestures》，.md 实抓）

URL：https://developer.apple.com/design/human-interface-guidelines/gestures.md

- 每个平台都支持 tap/swipe/drag 基础手势；原则：手势响应要**立即反馈**、可预测；不要让手势成为完成重要操作的唯一途径；自定手势需可发现、简单、可区分。
- iOS/iPadOS 扩展：三指左/右滑=撤销/重做，三指捏合=拷贝/粘贴，摇动=撤销。
- **长按**：visionOS 标准直触手势表中 "Touch and hold → Open a contextual menu"（即 iOS 语境下的 long-press 语义）；macOS 触控支持"放大点击热区而非控件本身"。
- Web 侧手势基建：MDN Pointer Events（实抓，Baseline 2020-07）——统一鼠标/笔/触摸事件模型：`pointerdown/move/up/cancel/over/enter/leave`、`pressure`（0–1）、`pointerType`、`isPrimary`、`setPointerCapture()`；CSS `touch-action` 决定浏览器是否把触摸判为滚动/缩放（决定 `pointercancel` 触发）。
  URL：https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
- Web 长按惯例（pointerdown 起计时、pointerup/cancel/move 超阈值取消）：本次未找到权威一手规范文档，具体阈值（常见约 500ms）**未证实**。

### 5.2 触感（Haptics）

**Apple HIG《Playing haptics》（.md 实抓）**
URL：https://developer.apple.com/design/human-interface-guidelines/playing-haptics.md

- iOS 预设三类（可调参数即"类别与档位"）：
  - **Notification**：success / warning / error（任务结果）；
  - **Impact**：light / medium / heavy / rigid / soft（物理碰撞隐喻，如视图卡入位、重物相撞）；
  - **Selection**：UI 元素取值变化时的短促提示。
- 自定义触感两要素：**transient**（瞬态，似轻叩）与 **continuous**（持续振动）× **sharpness**（柔和/圆润 ↔ 利落/机械）× **intensity**（强度）；可与音频同步。
- 使用原则：按文档语义用系统预设；前后一致建立因果；与视觉/听觉反馈强度匹配；勿滥用（偶发才"刚刚好"）；**必须可关闭**；注意振动可能干扰相机/陀螺仪/麦克风。

**Web：Vibration API（MDN，实抓）**
URL：https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate

- `navigator.vibrate(pattern)`：毫秒数或"振动/暂停交替"数组（例：SOS 摩尔斯码 `[100,30,100,…]`）；传 0/空数组取消；超长会被截断（上限依实现）；**需要 sticky user activation**（必须先有用户交互）；非 Baseline（部分主流浏览器不支持，如 iOS Safari 无效）；静音/勿扰模式下设备可能不振动。

---

## 6. 无障碍动效约束（prefers-reduced-motion）

### 6.1 媒体特性与各系统开关（MDN，实抓，更新于 2026-06-10）

URL：https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

- 值：`no-preference` / `reduce`；`@media (prefers-reduced-motion) ` 等价于 `: reduce`。
- 前庭障碍背景：缩放/大幅平移类动画是触发源；示例惯例为把 scale 脉冲动画**降级为不透明度溶解**（同优先级后写的规则覆盖）。
- 各系统设置路径（MDN 列表，节选）：macOS 15 及以前"系统设置>辅助功能>显示>减少动态效果"（macOS 26 起移至"辅助功能>动态效果"）、Windows 11 "辅助功能>视觉效果>动画效果"、Android 9+ "无障碍>移除动画"、GTK/KDE 对应 gsettings/kdeglobals 项、Firefox `ui.prefersReducedMotion`。
- Baseline：2020 年 1 月起广泛可用。

### 6.2 Web 处理惯例（web.dev，实抓）

URL：https://web.dev/articles/prefers-reduced-motion

- CSS 双向写法：`@media (prefers-reduced-motion: reduce) { button { animation: none; } }` + `@media (prefers-reduced-motion: no-preference) { … }`（默认开动效时务必用后者包裹）。
- 大量动效 CSS 可拆独立文件按需加载：`<link rel="stylesheet" href="animations.css" media="(prefers-reduced-motion: no-preference)">`。
- JS：`window.matchMedia('(prefers-reduced-motion: reduce)')` + `addEventListener('change', …)` 手动停起 WAAPI 动画（括号必需）；可配 `Sec-CH-Prefers-Reduced-Motion` 客户端提示在请求时内联正确样式。
- 动图降级：`<picture>` 的 `<source media="(prefers-reduced-motion: no-preference)">` 提供动图、fallback 提供静态图。
- 终端兜底（面向不守规矩网站的扩展注入方案）：统一把 `animation-duration/transition-duration` 压到 1ms 且 `animation-iteration-count: 1`、`scroll-behavior: auto`（比 `animation: none !important` 更不易破坏依赖 `animationend` 的站点）。

---

## 7. 条目清单：动效/微交互 → 命名 → 关键参数 → 适用场景 → 来源

| # | 条目 | 命名 / API | 关键参数 | 适用场景 | 来源 URL |
|---|---|---|---|---|---|
| 1 | 匀速缓动 | `linear`（= `linear(0,1)`） | 无 | 进度条、与滚动同步的动画、连续状态量 | https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function |
| 2 | 标准缓动关键字 | `ease/ease-in/ease-out/ease-in-out` | 对应 cubic-bezier(0.25,0.1,0.25,1) 等 4 组 | 通用 UI 过渡默认值 | 同上 |
| 3 | 自定义贝塞尔（可回弹） | `cubic-bezier(x1,y1,x2,y2)` | x∈[0,1]；y 可越界（如 1.56）产生 overshoot | 按钮/卡片轻回弹、强调性到位 | 同上 |
| 4 | 多点线性逼近弹簧/弹跳 | `linear(0, 0.5 25% 75%, 1)` | 进度点 + 可选百分比 stop；Baseline 2023-12 | 纯 CSS 表达 spring/bounce/elastic；生成器直接输出 | https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear ; https://linear-easing-generator.netlify.app/ ; https://raw.githubusercontent.com/jakearchibald/linear-easing-generator/main/README.md |
| 5 | 逐帧阶梯 | `steps(n, jump-*)` | 间隔数、跳变位置 | 帧动画、数字格、像素风 | https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function |
| 6 | M3 表达性缓动 | `md.sys.motion.easing.emphasized(-accelerate/-decelerate)` | decel `cubic-bezier(0.05,0.7,0.1,1)`；accel `cubic-bezier(0.3,0,0.8,0.15)`；emphasized CSS 无等价（Standard 兜底） | M3 风格大面积/强表达转场 | https://m3.material.io/styles/motion/easing-and-duration/tokens-specs |
| 7 | M3 标准缓动 | `md.sys.motion.easing.standard(±accelerate/decelerate)` | standard `cubic-bezier(0.2,0,0,1)`；decel `(0,0,0,1)`；accel `(0.3,0,1,1)` | 小型工具类快速过渡；iOS/Web 平台兜底 | 同上 |
| 8 | 时长分档 | `md.sys.motion.duration.short1…extra-long4` | 50–1000ms 分 4 档（short 50/100/150/200；medium 250–400；long 450–600；XL 700–1000） | 按转场面积/注意力选档；>600ms 仅限无输入的环境转场 | 同上 |
| 9 | 官方缓动-时长配对 | Emphasized 500 / Emph-decel 400 / Emph-accel 200 / Standard 300 / Std-decel 250 / Std-accel 200 (ms) | 见表 | 屏内起止、进入、永久退出、临时退出的选型速查 | https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration |
| 10 | 进出不对称原则 | enter > exit | 进入 500ms / 退出 200ms（示例） | 出场比进场快，减少对下一任务的注意力抢占 | 同上 |
| 11 | 物理弹簧 | Motion `type:"spring"` | stiffness(默认1)/damping(10)/mass(1)/velocity/restSpeed 0.1/restDelta 0.01 | 手势衔接、需要保留速度的自然反馈 | https://motion.dev/docs/react-transitions |
| 12 | 时长式弹簧 | Motion `bounce` + `duration` / `visualDuration` | bounce 默认 0.25（[-1,1]）；duration 0.3；visualDuration 与时长动画对齐 | 需固定总时长、可编排的弹性效果 | 同上 |
| 13 | Apple 弹簧 | SwiftUI `.spring(response:dampingFraction:blendDuration:)` | 默认 0.5s / 0.825 / 0；response=近似时长刚度，dampingFraction=临界阻尼比例 | iOS 原生手感；interactiveSpring 用于交互驱动 | https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:) |
| 14 | 惯性滚动/拖拽释放 | Motion `inertia` | power 0.8、timeConstant 700、modifyTarget 吸附、min/max+bounceStiffness 500 | 拖拽甩动、snap-to-grid 轮播 | https://motion.dev/docs/react-transitions |
| 15 | 高性能动画约束 | transform/opacity only | 只合成器属性；will-change 按需加移 | 所有网页动效的性能底线 | https://web.dev/articles/animations-guide |
| 16 | 悬停/按压状态层 | M3 interaction states + state layer | switch：hover/pressed 状态层 40dp、target 48dp、按压 handle 24→28dp | 指针交互控件的可视反馈；触屏无 hover 需按压等效 | https://m3.material.io/components/switch/specs |
| 17 | 控件动效时长 | Selection controls | 200ms + Standard easing | 开关/复选/单选类小控件过渡 | https://m3.material.io/styles/motion/easing-and-duration/tokens-specs |
| 18 | 加载选型阈值 | spinner / percent-done | <1s 即时态变化；2–10s 循环动画；≥10s 百分比进度+文案 | 按预期时长选择加载指示器 | https://www.nngroup.com/articles/progress-indicators/ |
| 19 | 骨架屏 | Skeleton screen / M3 skeleton loaders | 微妙脉动（左上→右下）；完成后快速淡入 | 内容型列表/卡片首屏，降低感知延迟、稳定布局 | https://www.lukew.com/ff/entry.asp?1797 ; https://m3.material.io/styles/motion/transitions/transition-patterns |
| 20 | 结果触感反馈 | Notification haptics | success/warning/error 三种预设脉冲 | 任务成败提示，与视觉/听觉同步 | https://developer.apple.com/design/human-interface-guidelines/playing-haptics.md |
| 21 | 碰撞触感 | Impact haptics | light/medium/heavy/rigid/soft | 视图卡位、对象碰撞等物理隐喻 | 同上 |
| 22 | 取值变化触感 | Selection haptic | 单短脉冲 | picker/slider/分档值变化 | 同上 |
| 23 | 自定义触感 | transient/continuous × sharpness × intensity | 波形级自定义 | 游戏/富体验；需可关闭 | 同上 |
| 24 | Web 振动 | `navigator.vibrate(pattern)` | 毫秒数组交替振动/暂停；需 sticky user activation；非 Baseline | Android Web 轻触感；iOS 不生效 | https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate |
| 25 | CSS 数字滚动 | `@property --num`（syntax `<integer>`）+ counter | transition/keyframes 时长与缓动、fill forwards | 仪表盘 count-up；配 reduced-motion 直出终值；注意读屏读中间值 | https://css-tricks.com/animating-number-counters/ |
| 26 | SPA 视图过渡 | `document.startViewTransition(cb)` | 默认交叉淡化；回调可 async；同一时刻仅一个 | SPA 状态/路由切换兜底动画 | https://developer.chrome.com/docs/web-platform/view-transitions/same-document ; https://developer.chrome.com/docs/web-platform/view-transitions |
| 27 | 共享元素过渡 | `view-transition-name`（唯一）+ `::view-transition-group()` | group 自动过渡位置/尺寸/transform；动态改名实现跨元素 morph（缩略图↔大图） | 列表→详情、图片展开、导航持久元素 | https://developer.chrome.com/docs/web-platform/view-transitions/same-document |
| 28 | 批量过渡样式 | `view-transition-class` + `::view-transition-group(.card)` | 一条选择器管全部同类元素 | 列表增删重排（Chrome 125+/Safari 18.2+） | 同上 |
| 29 | 进出场差异化 | `::view-transition-old/new(name):only-child` | 各自 animation 定义（入场 300ms/出场 150ms 示例） | 元素仅存在于一侧（侧栏、模态）的定向进出 | 同上 |
| 30 | MPA 跨文档过渡 | `@view-transition { navigation: auto; }` + `pageswap/pagereveal` | 无 JS API；同源导航触发 | 多页站点路由级过渡（Chrome 126+/Safari 18.2+；FF 不支持） | https://developer.chrome.com/docs/web-platform/view-transitions ; https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API |
| 31 | M3 六大转场模式 | Container transform / Forward-backward / Lateral / Top level / Enter-exit / Skeleton | 各模式的方向与淡出规则（详见 §3.3） | 转场选型的官方决策树 | https://m3.material.io/styles/motion/transitions/transition-patterns |
| 32 | 滚动进度时间轴 | `animation-timeline: scroll()` / `scroll-timeline-name` + `timeline-scope` | scroller(nearest/root/self) × axis(block/inline/x/y)；duration auto | 阅读进度条、滚动吸附进度、视差图层 | https://developer.chrome.com/docs/css-ui/scroll-driven-animations |
| 33 | 视图进度时间轴（reveal） | `animation-timeline: view()` + `animation-range` | range: cover/entry/exit/entry-crossing/exit-crossing/contain + %（如 `entry 25% cover 50%`） | 图片/卡片进入视口淡入揭示；clip-path 揭幕 | 同上 |
| 34 | JS 滚动时间轴 | `new ScrollTimeline({source, axis})` → `animate({timeline, rangeStart/End})` | 与 CSS 等价的 range 参数 | 需要 JS 编排/混入现成动画库时 | 同上 |
| 35 | 统一指针手势 | Pointer Events | pointerdown/move/up/cancel、pressure、pointerType、setPointerCapture、touch-action | 拖拽、自绘、长按判定的事件基建 | https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events |
| 36 | 标准手势集 | Apple HIG gestures（tap/swipe/drag、touch-and-hold、三指撤销…） | 见平台表 | 手势语义对齐用户预期；提供非手势等价路径 | https://developer.apple.com/design/human-interface-guidelines/gestures.md |
| 37 | 减少动效媒体查询 | `prefers-reduced-motion: reduce` | CSS 覆写降级（scale→opacity 溶解）；`no-preference` 包裹默认动效 | 所有装饰性动效的强制可降级 | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |
| 38 | 动效偏好工程化 | matchMedia change 监听 / `<link media>` / `<picture media>` / Sec-CH-Prefers-Reduced-Motion | JS 停起 WAAPI；CSS 按需加载；动图静态图切换 | JS 驱动动画与大体积动图的偏好适配 | https://web.dev/articles/prefers-reduced-motion |
| 39 | HIG 动效原则 | purposeful / optional / brief / cancellable | —；visionOS 0.2Hz 振荡敏感阈值 | 动效存在的必要性审查清单 | https://developer.apple.com/design/human-interface-guidelines/motion.md |

> 清单共 39 条，满足 ≥20 条要求；每条来源 URL 均为本次会话实际抓取核实的页面。

---

## 8. 未找到 / 未证实事项（如实标注）

1. **空状态动效**：未找到专门的一手规范（NN/g 对应 URL 实抓 404，且其 404 页警告常见幻觉 URL；M3、Apple HIG 本次检索范围内无专项）。仅有邻近依据（skeleton loaders、HIG 动效原则）。
2. **滚动驱动动画的跨浏览器当前状态**：Chrome 官方文章快照为 Chrome/Edge 115+；Firefox/Safari 现状未逐项核实（文章内表格数值存在解析噪声），建议以 MDN 兼容性表复核。
3. **Motion `stiffness` 默认值**：motion.dev 文档页标注为 1；旧社区常见说法 100 未取得本次佐证，未证实。
4. **Web 长按的标准时长阈值**（常见说法约 500ms）：未找到权威一手来源，未证实；仅有 visionOS "touch-and-hold→context menu" 的语义定义与 Pointer Events 事件基建。
5. **视差**：仅作为滚动驱动动画的官方用例被提及（Chrome 文章），未找到专门的一手规范文章。
6. **`linear()` 弹簧生成的推荐采样密度**：生成器默认 simplify=0.0017、round=3（README 链接参数可见），未找到官方"最佳实践"数值。
7. 内置 WebSearch 与 web_reader MCP 配额耗尽（重置于 2026-12-03），本次全部改用 fox_fetch 直抓/Jina 兜底完成，检索路径已在文首说明。
