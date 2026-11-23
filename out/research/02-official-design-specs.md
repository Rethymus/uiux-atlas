# 官方设计规范与 Web 平台标准：可参数化设计能力清单

调研方向：官方设计规范与 Web 平台标准中「有官方命名、可参数化」的设计能力清单
调研日期：2026-11-20（Apple HIG JSON 于 2026-11-21 复核）
方法与证据：全部条目通过联网抓取官方一手来源核验。Apple DocC 数据取自官方数据端点 `developer.apple.com/tutorials/data/...`（本文引用对应的标准文档 URL）；浏览器支持版本逐条取自 `mdn/browser-compat-data`（BCD）主分支原始 JSON（本会话内用 curl 拉取并解析）；M3 / Fluent / 组件库数值取自官方文档页或官方仓库源码（github raw）。无法核实的信息在 §7 明确标注，不做推测。

---

## 1. Apple HIG / SwiftUI（Liquid Glass、materials、vibrancy、弹簧动画）

**A1. Liquid Glass（HIG Materials）** — iOS 26 全平台统一动态材质。官方定义：为控件与导航层（tab bar、sidebar 等）形成独立「功能层」，浮动于内容层之上；内容可从其下方滚动穿透。含两个官方变体：**regular**（模糊背景并调整亮度以保文字可读，绝大多数系统组件使用）与 **clear**（高透，仅用于媒体等丰富背景之上的浮动组件）。官方明确：不要用于内容层、不要过度使用。
来源：https://developer.apple.com/design/human-interface-guidelines/materials （旧 URL `human-interface-resources/materials` 已 404；本次经官方 JSON 数据端点核验，页面标题 "Materials | Apple Developer Documentation"）
另见官方迁移指南 "Adopting Liquid Glass"：https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass

**A2. SwiftUI `glassEffect(_:in:)`** — 声明式应用 Liquid Glass。签名 `func glassEffect(_ glass: Glass = .regular, in shape: some Shape = DefaultGlassEffectShape()) -> some View`；默认变体 `.regular`、默认形状 Capsule；iOS/iPadOS/macOS/tvOS/watchOS 26.0+。
来源：https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:)

**A3. SwiftUI `Glass` 结构体** — Liquid Glass 配置类型。类型属性：`regular` / `clear` / `identity`；实例方法：`tint(_:)`（着色）、`interactive(_:)`（交互反馈）。
来源：https://developer.apple.com/documentation/swiftui/glass

**A4. SwiftUI `GlassEffectContainer`** — 将多个 Liquid Glass 形状合并渲染并支持互相 morph；`init(spacing:content:)`，spacing 越大形状越早开始融合。
来源：https://developer.apple.com/documentation/swiftui/glasseffectcontainer

**A5. SwiftUI `glassEffectID(_:in:)`** — 为 Liquid Glass 效果关联身份，配合 Namespace 实现 morph 匹配。签名 `func glassEffectID(_ id: (some Hashable & Sendable)?, in namespace: Namespace.ID) -> some View`（iOS 26+）。
来源：https://developer.apple.com/documentation/swiftui/view/glasseffectid(_:in:)

**A6. UIKit `UIGlassEffect`** — 命令式 Liquid Glass。属性 `isInteractive: Bool`、`tintColor`；`init(style:)`；iOS 26+。
来源：https://developer.apple.com/documentation/uikit/uiglasseffect 、https://developer.apple.com/documentation/uikit/uiglasseffect/isinteractive

**A7.（旧体系）UIKit `UIBlurEffect`** — 毛玻璃（frosted glass）：`init(style:)`，Style 常量族（systemUltraThinMaterial…systemThickMaterial 等）。 Liquid Glass 出现前用于建立半透明背景。
来源：https://developer.apple.com/documentation/uikit/uiblureffect

**A8.（旧体系）SwiftUI `Material`** — 背景材质类型：`ultraThinMaterial / thinMaterial / regularMaterial / thickMaterial / ultraThickMaterial / bar`（iOS 15+）。官方说明：非视图，而是介于前景与背景间的半透明层，「类似重度磨砂玻璃的混合效果」；材质之上前景自动获得 vibrancy（用 `foregroundStyle` 自定义前景会关闭 vibrancy）。
来源：https://developer.apple.com/documentation/swiftui/material

**A9.（旧体系）AppKit `NSVisualEffectView` + vibrancy** — macOS 半透明与 vibrancy：`material` + `blendingMode`（`behindWindow` / `withinWindow`）；自定义视图需显式 `allowsVibrancy = true`，建议仅在叶子视图启用。
来源：https://developer.apple.com/documentation/appkit/nsvisualeffectview

**A10. HIG vibrancy 层级** — iOS/iPadOS 定义 label / fill / separator 的 vibrancy 值：label 与 fill 有多级（default → secondary → tertiary → quaternary，对比度递减），separator 一级；quaternary 在 ultraThin/thin 材质上禁用（对比度不足）。macOS：behind/within window 两种混合模式。visionOS：系统材质 `glass`（不可修改）+ 3 级 vibrancy。
来源：https://developer.apple.com/design/human-interface-guidelines/materials

**A11. SwiftUI `spring(response:dampingFraction:blendDuration:)`** — 参数（官方默认值）：`response = 0.5`（弹簧刚度的时间尺度近似秒，0 为无穷刚度）、`dampingFraction = 0.825`（临界阻尼的比例分数）、`blendDuration = 0`（混合 response 变化的时长）。iOS 13+。
来源：https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:)

**A12. SwiftUI `spring(duration:bounce:blendDuration:)`** — `duration = 0.5`（感知时长≈settle 时长）、`bounce = 0`（范围 -1…1：0 临界阻尼、正数回弹至 1 无阻尼震荡、负数过阻尼至 -1）、`blendDuration = 0`。
来源：https://developer.apple.com/documentation/swiftui/animation/spring(duration:bounce:blendduration:)

**A13. SwiftUI 弹簧预设族** — `bouncy(duration:extraBounce:)`（默认 0.5s，基础 bounce 0.3）、`snappy(duration:extraBounce:)`（默认 0.5s，基础 bounce 0.15）、`smooth(duration:extraBounce:)`（默认 0.5s，基础 bounce 0）。
来源：https://developer.apple.com/documentation/swiftui/animation/bouncy(duration:extrabounce:) 、https://developer.apple.com/documentation/swiftui/animation/snappy(duration:extrabounce:) 、https://developer.apple.com/documentation/swiftui/animation/smooth(duration:extrabounce:)

---

## 2. Material Design 3（Material You）

**B1. Motion 物理系统（M3 Expressive，2025-05）** — 官方命名 **motion physics system**，以 **spring（stiffness 刚度 / damping 阻尼 / mass 类属性）** 替代旧 easing+duration 体系；两套预设 **MotionScheme：`expressive`（空间弹簧过冲带回弹）与 `standard`（低回弹偏功能）**，可自定义。
来源：https://m3.material.io/styles/motion/overview （最终 URL `/overview/how-it-works`）

**B2. Spring composite tokens + Web 曲线换算表** — 官方 spring composite token（每枚=damping+stiffness 组合）共 12 枚，Web 端官方给出 cubic-bezier 换算：
| Token | 曲线 | 时长 |
|---|---|---|
| Expressive fast spatial | (0.42, 1.67, 0.21, 0.90) | 350ms |
| Expressive default spatial | (0.38, 1.21, 0.22, 1.00) | 500ms |
| Expressive slow spatial | (0.39, 1.29, 0.35, 0.98) | 650ms |
| Expressive fast effects | (0.31, 0.94, 0.34, 1.00) | 150ms |
| Expressive default effects | (0.34, 0.80, 0.34, 1.00) | 200ms |
| Expressive slow effects | (0.34, 0.88, 0.34, 1.00) | 300ms |
| Standard fast/default spatial | (0.27, 1.06, 0.18, 1.00) | 350/500/750ms |
| Standard fast/default/slow effects | 同 fast(0.31,0.94,0.34,1)/default(0.34,0.80,0.34,1)/slow(0.34,0.88,0.34,1) | 150/200/300ms |
来源：https://m3.material.io/styles/motion/overview/specs

**B3. Compose `MotionScheme` 实现参数（dampingRatio/stiffness 数值）** — 官方 androidx 源码（与 B2 交叉印证）：Expressive 空间弹簧 default damping 0.8 / stiffness 380，fast 0.6 / 800，slow 0.8 / 200；Expressive 效果弹簧 damping 1.0 / stiffness 1600、3800、800（default/fast/slow）；Standard 空间弹簧 damping 0.9 / stiffness 700、1400、300；Standard 效果弹簧 damping 1.0 / stiffness 1600、3800、800。
来源：https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme ；
https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt （第 22–33 行）；
https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt （第 20–31 行）；
https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/MotionScheme.kt （第 136–236 行）

**B4.（旧体系）Easing 与 duration 配对表** — 官方建议起点：Emphasized 500ms（屏内起止）、Emphasized decelerate 400ms（进场）、Emphasized accelerate 200ms（永久离场）、Standard 300ms（屏内起止）、Standard decelerate 250ms（进场）、Standard accelerate 200ms（离场）。官方注明 Standard set 是 iOS/Web 等不支持 Emphasized 平台的 fallback；该体系已被 B1 物理系统取代但仍是 fallback。
来源：https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration

**B5. State layers（状态层）** — 官方 token 数值：**Hover +8%、Focus +10%、Press +10%、Drag +16%** 不透明度覆盖层，颜色取内容色（on-* 色）。
来源：https://m3.material.io/foundations/interaction/states/state-layers

**B6. Color roles（颜色角色）** — 26+ 官方 color roles（图示共 45 枚）：primary/secondary/tertiary/error 各配 `on-*`、`*-container`、`on-*-container`；surface 家族（surface / surface-container lowest…highest / surface-variant 等）；inverse roles、scrim/shadow；新增 **fixed 系列**（primary/secondary/tertiary fixed 与 fixed-dim，明暗主题同 tone）。角色成对设计保证最低 3:1 对比度，并以 token 实现。
来源：https://m3.material.io/styles/color/roles 、https://m3.material.io/styles/color/system/overview

**B7. Tone-based surfaces（色调表面，2023-02）** — 废弃「surface + elevation 1–5 叠加不透明度」模型，改为 **surface container lowest / low / (container) / high / highest** 五档 tone 化角色，与 elevation 解耦。
来源：https://m3.material.io/blog/tone-based-surface-color-m3

**B8. Dynamic color（动态色）** — 官方两类源：**user-generated**（用户壁纸取色）与 **content-based**（应用内容取色，如专辑封面），动态生成可访问的配色方案（明暗两套）。
来源：https://m3.material.io/styles/color/dynamic/choosing-a-source （旧 URL `dynamic-color/overview` 重定向至此）
实现细节（官方 Android 文档）：从壁纸提取 **5 个关键色**，每个关键色展开为 **13 个 tone 的 tonal palette**，派生 **5 套配色方案** 作为明暗主题基础。
来源：https://developer.android.com/develop/ui/views/theming/dynamic-colors

**B9. M3 Expressive 总览** — 官方博客：motion physics（**Spatial springs** 空间弹簧 / **Effects springs** 效果弹簧两类）、35 种新形状库 + 形状 morph 动画、强调型文字样式、14 个更新组件。
来源：https://m3.material.io/blog/building-with-m3-expressive

---

## 3. Microsoft Fluent Design / Fluent 2

**C1. Acrylic（亚克力）** — 半透明材质画刷；两种官方混合类型：**Background acrylic**（透出桌面壁纸与其他窗口，用于 transient UI）与 **In-app acrylic**（应用内层次，用于支撑性 UI）。API 参数：`AcrylicBrush.TintOpacity`（色调不透明度）、`TintLuminosityOpacity`（亮度色调不透明度）、`TintColor`、`AlwaysUseFallback`（强制回退纯色）、`TintTransitionDuration`（色调切换动画时长）；WinUI 3 用 `Window.SystemBackdrop` / `DesktopAcrylicBackdrop`。
来源：https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic ；
https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.acrylicbrush

**C2. Mica / Mica Alt（云母）** — **不透明**动态材质：仅采样桌面壁纸一次绘制长驻窗口背景（性能导向）。**Mica Alt** 为强着色变体，适合 tab 式标题栏；Windows App SDK 1.1+。
来源：https://learn.microsoft.com/en-us/windows/apps/design/style/mica

**C3. Motion in Windows（Fluent 运动参数表）** — 官方「Animation properties」：
| Purpose | Ease | Timing |
|---|---|---|
| Direct Entrance（Fast–In） | cubic-bezier(0,0,0,1) | 167 / 250 / 333ms |
| Point to Point（Existing Elements） | cubic-bezier(0.55,0.55,0,1) | 167 / 250 / 333ms |
| Direct Exit（Fast–Out，必须配合淡出） | cubic-bezier(0,0,0,1) | 167ms |
| Gentle Exit（Soft–Out） | cubic-bezier(1,0,1,1) | 167ms |
| Bare Minimum（Fade） | linear | 83ms |
| Strong Entrance（3 关键帧弹性） | cubic-bezier(0.85,0,0,1)→(0.85,0,0.75,1)→(0.85,0,0,1) | 167/167/333ms |
原则：Connected / Consistent / Responsive / Delightful / Resourceful；推荐 Page Transition、Connected Animation、Animated Icon（Lottie）控件。
来源：https://learn.microsoft.com/en-us/windows/apps/design/motion/

**C4. Fluent 2 Motion（设计系统层）** — 四原则 Functional / Natural / Consistent / Appealing；Duration and easing、Choreography（编排）、Staggering（错峰）等为官方章节。⚠️ 官网为 JS 渲染，具体 duration 数值表本次未能提取（见 §7）。
来源：https://fluent2.microsoft.design/motion

**C5. Depth / ThemeShadow** — 深度以 x/y/z 坐标表达：`ThemeShadow` 预配置阴影随 elevation 自适应（光照、主题、环境自动调整）；非 Popup 场景需显式设置 `Receivers` 集合指定投影接收元素；仅支持矩形阴影，自定义阴影用 `DropShadow`。（旧的 Depth/depth-shadow 设计指南页已 404 迁移，见 §7。）
来源：https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.themeshadow

---

## 4. Web 平台标准（CSS 规范，浏览器支持为 BCD 实测数据）

说明：支持版本为本次会话从 `https://raw.githubusercontent.com/mdn/browser-compat-data/main/...` 拉取并解析的原始 BCD 数据（命令与输出见 §8 方法注记）。

**D1. `filter`（Filter Effects Level 1）** — 参数化函数族：`blur(px)`、`brightness()`、`contrast()`、`grayscale()`、`hue-rotate(deg)`、`invert()`、`opacity()`、`saturate()`、`sepia()`、`drop-shadow(x y b color)`。
规范：https://drafts.fxtf.org/filter-effects-1/ （MDN：https://developer.mozilla.org/en-US/docs/Web/CSS/filter ）
支持（BCD css.properties.filter）：Chrome 18 / Firefox 49 / Safari 6 / Edge 12。

**D2. `backdrop-filter`（Filter Effects Level 2）** — 对元素背后区域应用 filter 函数（毛玻璃核心能力）。
规范：https://drafts.fxtf.org/filter-effects-2/ （MDN：https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter ）
支持（BCD css.properties.backdrop-filter）：Chrome 76 / Firefox 103 / Safari 9 / Edge 17。

**D3. 混合模式（Compositing and Blending Level 1）** — `mix-blend-mode` / `background-blend-mode`，规范定义 16 种命名模式：normal、multiply、screen、overlay、darken、lighten、color-dodge、color-burn、hard-light、soft-light、difference、exclusion、hue、saturation、color、luminosity。
规范（fxtf.org 标注 "Moved to the CSSWG repository"）：https://drafts.csswg.org/compositing-1/ （已核验页面标题与 10.1.x/10.2.x 混合模式章节）
支持（BCD）：mix-blend-mode Chrome 41 / Firefox 32 / Safari 8；background-blend-mode Chrome 35 / Firefox 30 / Safari 8。

**D4. `@property`（CSS Properties Values API）** — 注册自定义属性：`syntax`（类型字符串）、`inherits`（bool）、`initial-value`；使自定义属性可动画、可过渡。
规范：https://drafts.css-houdini.org/css-properties-values-api-1/ （MDN：https://developer.mozilla.org/en-US/docs/Web/CSS/@property ）
支持（BCD css.at-rules.property）：Chrome 85 / Firefox 128 / Safari 16.4。

**D5. View Transitions（Level 1，同文档）** — `view-transition-name` 等属性 + `::view-transition-*` 伪元素树，官方参数化截图交叉过渡。
规范：https://drafts.csswg.org/css-view-transitions-1/ （MDN：https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name ）
支持（BCD css.properties.view-transition-name）：Chrome 111 / Firefox 144 / Safari 18。
跨文档 `@view-transition` at-rule（BCD css.at-rules.view-transition）：Chrome 126 / Safari 18.2 / Firefox preview。

**D6. Scroll-driven Animations（Scroll-animations Level 1）** — `animation-timeline: scroll()/view()`、`scroll-timeline-*`、`timeline-scope` 等参数化时间轴。
规范：https://drafts.csswg.org/scroll-animations-1/
支持（BCD css.properties.animation-timeline / scroll-timeline）：Chrome 115 / Firefox 159 / Safari 26。

**D7. `linear()` 缓动函数（CSS Easing Level 1）** — 支持在 `[0,1]` 区间逐点定义缓动曲线（弹簧感曲线的 CSS 表达）。
规范：https://drafts.csswg.org/css-easing-1/
支持（BCD css.types.easing-function.linear-function）：Chrome 113 / Firefox 112 / Safari 17.2。

**D8. `@starting-style` + `transition-behavior: allow-discrete`** — 入场过渡起始样式；离散属性（display 等）可过渡。
规范：https://drafts.csswg.org/css-transitions-2/ （MDN：https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style ）
支持（BCD）：@starting-style Chrome 117 / Firefox 129 / Safari 17.5；transition-behavior Chrome 117 / Firefox 129 / Safari 17.4。

**D9. Houdini Paint API（CSS Painting API Level 1）** — `CSS.paintWorklet.addModule()` 注册 Paint Worklet，`paint()` 函数作为图像值参数化使用。
规范：https://drafts.css-houdini.org/css-paint-api-1/
支持（BCD api.PaintWorkletGlobalScope）：Chrome 65+；Firefox / Safari 均未实现（false）。

**D10. CSS Animation Worklet（状态警示）** — 规范文档《CSS Animation Worklet API》仍在线（https://drafts.css-houdini.org/css-animationworklet-1/ ，已核验标题），但 **MDN API 文档已 404（本会话实测）、BCD 中无 AnimationWorklet 条目（文件 404）**，即当前无现役浏览器实现；滚动/手势驱动的官方替代为 D6 scroll-driven animations。

---

## 5. 组件库设计规范

**E1. Ant Design（v5/v6 动效与 token）** — 官方动效原则 Natural / Performant / Concise（文档站 https://ant.design/docs/spec/motion ）。动效 token（官方仓库 seed token，与 ant.design 页面运行时 CSS 变量交叉核验一致）：
- `motionEaseOut = cubic-bezier(0.215, 0.61, 0.355, 1)`；`motionEaseInOut = cubic-bezier(0.645, 0.045, 0.355, 1)`；`motionEaseOutBack = cubic-bezier(0.12, 0.4, 0.29, 1.46)`；`motionEaseInBack = cubic-bezier(0.71, -0.46, 0.88, 0.6)`；`motionEaseOutCirc = cubic-bezier(0.08, 0.82, 0.17, 1)`；`motionEaseInOutCirc = cubic-bezier(0.78, 0.14, 0.15, 0.86)`；`motionEaseInQuint = cubic-bezier(0.755, 0.05, 0.855, 0.06)`；`motionEaseOutQuint = cubic-bezier(0.23, 1, 0.32, 1)`
- `motionUnit = 0.1`（时长基本单位）；运行时 CSS 变量 `--ant-motion-duration-fast: 0.1s / mid: 0.2s / slow: 0.3s`
来源：https://raw.githubusercontent.com/ant-design/ant-design/master/components/theme/themes/seed.ts （第 49–58 行）；https://ant.design/docs/spec/motion （页面内联 CSS 变量实测 `--ant-motion-ease-*` 与 `--ant-motion-duration-*`）

**E2. Radix Colors（12 级色阶）** — 每个色阶固定 12 步且每步有官方语义：1 app background、2 subtle background、3 UI element background、4 hover bg、5 active/selected bg、6 subtle border/separator、7 UI element border/focus ring、8 hover border、9 solid bg、10 hover solid bg、11 low-contrast text、12 high-contrast text（11/12 对步 2 背景保证 APCA Lc 60/90）。
来源：https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
Radix Primitives 动画约定（data-state 属性驱动 + CSS animation，官方指南）：https://www.radix-ui.com/primitives/docs/guides/animation

**E3. shadcn/ui Theming（CSS 变量语义 token）** — 官方推荐 CSS 变量主题：语义 token（background/foreground/primary/…/chart/radius）明暗两套覆盖；示例 `--primary: oklch(0.205 0 0)`（OKLCH 色彩空间）；radius 派生比例尺：`--radius-sm: calc(var(--radius)*0.6)`、`md ×0.8`、`lg ×1`、`xl ×1.4`、`2xl ×1.8`、`3xl ×2.2`。
来源：https://ui.shadcn.com/docs/theming
（注：shadcn/ui 未发现官方动效 token 规范页，动效依赖 Tailwind/CSS 变量，见 §7。）

**E4. IBM Carbon Motion（时长与缓动 token）** — 六枚静态时长 token：`duration-fast-01` 70ms、`fast-02` 110ms、`moderate-01` 150ms、`moderate-02` 240ms、`slow-01` 400ms、`slow-02` 700ms；缓动矩阵（Productive / Expressive × Standard / Entrance / Exit）：
- Standard：productive `cubic-bezier(0.2, 0, 0.38, 0.9)`；expressive `cubic-bezier(0.4, 0.14, 0.3, 1)`
- Entrance：productive `cubic-bezier(0, 0, 0.38, 0.9)`；expressive `cubic-bezier(0, 0, 0.3, 1)`
- Exit：productive `cubic-bezier(0.2, 0, 1, 0.9)`；expressive `cubic-bezier(0.4, 0.14, 1, 1)`
（注意：与早期文档相比 expressive exit 曲线已更新，以当前页面为准。）
来源：https://www.carbondesignsystem.com/building-blocks/foundations/motion （旧 URL `/motion/motion-tokens/` 已 404 迁移至 building-blocks 信息架构；本次经 Jina 抓取页面表格核验）

**E5. MUI（Material UI）Transitions** — 官方 `createTransitions` token（源码注释注明沿用 M2 规范）：
- easing：`easeInOut cubic-bezier(0.4, 0, 0.2, 1)`；`easeOut cubic-bezier(0.0, 0, 0.2, 1)`；`easeIn cubic-bezier(0.4, 0, 1, 1)`；`sharp cubic-bezier(0.4, 0, 0.6, 1)`
- duration（ms）：shortest 150 / shorter 200 / short 250 / standard 300 / complex 375 / enteringScreen 225 / leavingScreen 195
- 组件：Collapse / Fade / Grow / Zoom（`theme.transitions.create()` 参数化）。
来源：https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/styles/createTransitions.js ；文档 https://mui.com/material-ui/transitions/

---

## 6. 汇总清单：官方名称 → 所属体系 → 关键参数 → 官方文档 URL（41 项）

| # | 官方名称 | 所属体系 | 关键参数 | 官方文档 URL |
|---|---|---|---|---|
| 1 | Liquid Glass | Apple HIG / iOS 26 | 变体 regular / clear；功能层定位、scroll edge effect | https://developer.apple.com/design/human-interface-guidelines/materials |
| 2 | `glassEffect(_:in:)` | SwiftUI 26 | `Glass = .regular`、默认 Capsule 形状 | https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:) |
| 3 | `Glass`（结构体） | SwiftUI 26 | regular / clear / identity；`tint(_:)`、`interactive(_:)` | https://developer.apple.com/documentation/swiftui/glass |
| 4 | `GlassEffectContainer` | SwiftUI 26 | `spacing`（形状融合距离）、morph 组合 | https://developer.apple.com/documentation/swiftui/glasseffectcontainer |
| 5 | `glassEffectID(_:in:)` | SwiftUI 26 | Hashable id + `Namespace.ID` | https://developer.apple.com/documentation/swiftui/view/glasseffectid(_:in:) |
| 6 | `UIGlassEffect` | UIKit 26 | `isInteractive`、`tintColor`、`init(style:)` | https://developer.apple.com/documentation/uikit/uiglasseffect |
| 7 | `UIBlurEffect`（frosted glass 旧体系） | UIKit 8+ | `init(style:)` + Style 常量族 | https://developer.apple.com/documentation/uikit/uiblureffect |
| 8 | `Material`（6 种） | SwiftUI 15+ | ultraThin/thin/regular/thick/ultraThick/bar；自动 vibrancy | https://developer.apple.com/documentation/swiftui/material |
| 9 | `NSVisualEffectView` + vibrancy | AppKit | `material`、`blendingMode`（behind/withinWindow）、`allowsVibrancy` | https://developer.apple.com/documentation/appkit/nsvisualeffectview |
| 10 | Vibrancy 层级 | HIG | label/fill：default→quaternary；separator 1 级 | https://developer.apple.com/design/human-interface-guidelines/materials |
| 11 | `spring(response:dampingFraction:blendDuration:)` | SwiftUI | 0.5 / 0.825 / 0 | https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:) |
| 12 | `spring(duration:bounce:blendDuration:)` | SwiftUI | 0.5 / 0（-1…1）/ 0 | https://developer.apple.com/documentation/swiftui/animation/spring(duration:bounce:blendduration:) |
| 13 | `.bouncy` | SwiftUI | 0.5s，基础 bounce 0.3 | https://developer.apple.com/documentation/swiftui/animation/bouncy(duration:extrabounce:) |
| 14 | `.snappy` | SwiftUI | 0.5s，基础 bounce 0.15 | https://developer.apple.com/documentation/swiftui/animation/snappy(duration:extrabounce:) |
| 15 | `.smooth` | SwiftUI | 0.5s，基础 bounce 0 | https://developer.apple.com/documentation/swiftui/animation/smooth(duration:extrabounce:) |
| 16 | Motion physics system | M3 Expressive | springs：stiffness/damping；schemes：expressive/standard | https://m3.material.io/styles/motion/overview |
| 17 | Spring composite tokens（12 枚） | M3 | Expressive/Standard × fast/default/slow × spatial/effects；Web bezier 换算 | https://m3.material.io/styles/motion/overview/specs |
| 18 | Compose `MotionScheme` | M3 / Compose | Expressive spatial 0.8/380（default）、0.6/800（fast）、0.8/200（slow）；Effects 1.0/1600·3800·800；Standard spatial 0.9/700·1400·300 | https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme |
| 19 | Easing+duration 配对（旧体系 fallback） | M3 | Emphasized 500ms / decelerate 400ms / accelerate 200ms；Standard 300/250/200ms | https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration |
| 20 | State layers | M3 | hover 8%、focus 10%、press 10%、drag 16% | https://m3.material.io/foundations/interaction/states/state-layers |
| 21 | Color roles | M3 | 26+ 角色（container/on-*/fixed/surface-container 5 档） | https://m3.material.io/styles/color/roles |
| 22 | Tone-based surfaces | M3 | surface-container lowest→highest 5 档，与 elevation 解耦 | https://m3.material.io/blog/tone-based-surface-color-m3 |
| 23 | Dynamic color | M3 | user-generated（壁纸）/ content-based（内容）取源 | https://m3.material.io/styles/color/dynamic/choosing-a-source |
| 24 | 动态色实现（13 tone tonal palette） | Android | 5 关键色 → 5×13 tone 色板 → 明暗方案 | https://developer.android.com/develop/ui/views/theming/dynamic-colors |
| 25 | M3 Expressive | M3 | Spatial/Effects springs、35 形状、emphasized type | https://m3.material.io/blog/building-with-m3-expressive |
| 26 | Acrylic | Fluent / WinUI | `TintOpacity`、`TintLuminosityOpacity`、`TintColor`、`AlwaysUseFallback`、`TintTransitionDuration`；background/in-app 两型 | https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic |
| 27 | Mica / Mica Alt | Fluent / WinApp SDK 1.1+ | 不透明、单次壁纸采样；Alt=强着色 | https://learn.microsoft.com/en-us/windows/apps/design/style/mica |
| 28 | Motion in Windows（动画属性表） | Fluent | Direct In (0,0,0,1) 167/250/333ms；Point-to-Point (0.55,0.55,0,1)；Exit 167ms；Gentle (1,0,1,1)；Fade linear 83ms；Strong In 3 关键帧 | https://learn.microsoft.com/en-us/windows/apps/design/motion/ |
| 29 | Fluent 2 Motion | Fluent 2 | Duration & easing / Choreography / Staggering（数值表未提取，见 §7） | https://fluent2.microsoft.design/motion |
| 30 | `ThemeShadow` | Fluent / WinUI | z 坐标投影、`Receivers` 集合、矩形限定 | https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.themeshadow |
| 31 | `filter` | CSS Filter Effects 1 | blur/brightness/contrast/grayscale/hue-rotate/invert/opacity/saturate/sepia/drop-shadow | https://drafts.fxtf.org/filter-effects-1/ |
| 32 | `backdrop-filter` | CSS Filter Effects 2 | 同 filter 函数族，作用于背景 | https://drafts.fxtf.org/filter-effects-2/ |
| 33 | Blend modes（16 种） | CSS Compositing 1 | mix-blend-mode / background-blend-mode：normal…luminosity | https://drafts.csswg.org/compositing-1/ |
| 34 | `@property` | CSS Properties Values API | syntax / inherits / initial-value | https://drafts.css-houdini.org/css-properties-values-api-1/ |
| 35 | View Transitions | CSS View Transitions 1 | `view-transition-name`、`::view-transition-*`；跨文档 `@view-transition` | https://drafts.csswg.org/css-view-transitions-1/ |
| 36 | Scroll-driven animations | CSS Scroll-animations 1 | `animation-timeline: scroll()/view()`、`scroll-timeline-*` | https://drafts.csswg.org/scroll-animations-1/ |
| 37 | `linear()` 缓动 | CSS Easing 1 | 逐点 [0,1] 曲线定义 | https://drafts.csswg.org/css-easing-1/ |
| 38 | `@starting-style` / `transition-behavior` | CSS Transitions 2 | 入场起始样式；allow-discrete | https://drafts.csswg.org/css-transitions-2/ |
| 39 | Houdini Paint API | CSS Painting API 1 | `paintWorklet.addModule()`、`paint()` 图像值 | https://drafts.css-houdini.org/css-paint-api-1/ |
| 40 | CSS Animation Worklet | Houdini（已停滞） | 规范在线，无现役浏览器实现 | https://drafts.css-houdini.org/css-animationworklet-1/ |
| 41 | Motion token 体系（antd / Radix / shadcn / Carbon / MUI） | 组件库 | 详见表格 E1–E5 | https://ant.design/docs/spec/motion ; https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale ; https://ui.shadcn.com/docs/theming ; https://www.carbondesignsystem.com/building-blocks/foundations/motion ; https://mui.com/material-ui/transitions/ |

**浏览器支持速查（BCD，2026-11-20 拉取）**

| 能力 | Chrome | Firefox | Safari |
|---|---|---|---|
| filter | 18 | 49 | 6 |
| backdrop-filter | 76 | 103 | 9 |
| mix-blend-mode | 41 | 32 | 8 |
| @property | 85 | 128 | 16.4 |
| View Transitions（同文档） | 111 | 144 | 18 |
| @view-transition（跨文档） | 126 | preview | 18.2 |
| scroll-driven（animation-timeline） | 115 | 159 | 26 |
| linear() | 113 | 112 | 17.2 |
| @starting-style | 117 | 129 | 17.5 |
| transition-behavior | 117 | 129 | 17.4 |
| Paint Worklet | 65 | ✗ | ✗ |
| Animation Worklet | ✗（已移除原型） | ✗ | ✗ |

---

## 7. 未找到 / 未证实 / 已迁移勘误

1. **M3 easing token 的具体贝塞尔数值未证实**：`emphasized = cubic-bezier(0.2, 0, 0, 1)` 等逐枚数值在官方页以交互组件渲染，本次抓取未能提取到官方文字数值；已证实的只有 §B4 的 easing+duration 配对表与 §B2 的 Web spring 换算曲线。引用时请勿将社区流传数值当作官方数值。
2. **Fluent 2 官网 motion 的 duration 数值表未提取到**（fluent2.microsoft.design 为 JS 渲染，文本中无 "ms" 数值）；Windows 端具体数值以 Learn 的 Motion in Windows 表（§C3）为准。
3. **Fluent「Depth」独立设计页已迁移**：`/design/style/depth`、`/depth-shadow` 均 404；深度相关一手来源目前为 ThemeShadow/DropShadow API 页。
4. **Apple HIG 旧 URL 勘误**：`developer.apple.com/design/human-interface-resources/...` 全部 404，现为 `human-interface-guidelines/...`（本次实测）。
5. **M3 tonal palette 独立页已下线**：旧页 `styles/color/the-color-system/key-colors-tones` 302 重定向到 `/styles/color/roles`；「13 tones」数值口径取自 developer.android.com 动态色文档（Google 一手）。
6. **CSS Animation Worklet 无现役浏览器实现**（MDN 页 404、BCD 无条目，本会话实测）；规范文档仍在线。
7. **shadcn/ui 未发现官方动效 token 规范**（theming 文档只含颜色/半径等 CSS 变量 token）；其动画依赖 Tailwind 默认与社区方案——检索范围内未找到官方动效规范页。
8. **Ant Design 官方文档站未提供单一「全部动效 token 数值」页面**；本文数值取自官方仓库 seed token 源码并与 ant.design 页面运行时 CSS 变量交叉核验一致。

## 8. 方法注记（本次实际执行的核验）

- Apple 文档：`python -I scripts/fetch_research.py`（自写抓取器）+ `curl https://developer.apple.com/tutorials/data/documentation/swiftui/...json`，解析出 `spring()/bouncy()/snappy()/smooth()` 的默认参数声明、`Glass` 结构体、`UIGlassEffect` 属性等；HIG Materials 页经 `tutorials/data/design/human-interface-guidelines/materials.json` 解析全文。
- BCD：`curl https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/properties/backdrop-filter.json` 等 12 个文件，解析 `__compat.support` 输出各浏览器首个支持版本（原始输出见会话记录）。
- M3：Jina reader 抓取 m3.material.io 各页（state-layers 页 grep 命中 "Hover +8% opacity … Drag +16% opacity"；specs 页命中 12 枚 spring→curve 表）。
- androidx 源码：`curl` raw.githubusercontent.com 拉取 `MotionScheme.kt`、`ExpressiveMotionTokens.kt`、`StandardMotionTokens.kt`，`grep -nE "Spring"` 得到 damping/stiffness 常量（行号见 §B3）。
- Fluent：learn.microsoft.com 三页（acrylic、mica、motion/）+ AcrylicBrush/ThemeShadow API 页 grep 属性名；fluent2.microsoft.design 经 Jina。
- 组件库：antd `seed.ts`（grep motion）、antd 页面内联 CSS 变量、MUI `createTransitions.js`、Carbon motion 页表格（Jina）、Radix/shadcn 文档页正文。
