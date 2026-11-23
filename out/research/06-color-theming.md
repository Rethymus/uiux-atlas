# 现代前端色彩与主题系统调研报告

- 调研日期：2026-11-20
- 调研方式：全程联网检索，优先抓取一手来源（W3C 规范、MDN、W3C WCAG 理解文档、Apple HIG、Android 开发者文档、GitHub 仓库 README、Radix/Primer 官方文档），并以 WebAIM、CSS-Tricks、Evil Martians 等知名实践方文章交叉印证。
- 报告约定：每条均附来源 URL；文中标注「未证实」的内容为检索到但未能在来源页正文核实；标注「未找到」的子方向为本次检索未能取得可靠资料。

---

## 一、色彩科学在 UI 的应用

### 1. OKLCH —— CSS 官方感知均匀色彩空间（`oklch()` 函数）

**关键参数与事实（来源：MDN、W3C CSS Color 4）：**
- 语法 `oklch(L C H / A)`：L（感知亮度）0–1 或 0%–100%，0=黑、1=白；C（色度）实用上限约 **0.5**（MDN：理论无上限但实践中不超过 0.5；**注意 100% = 0.4** 而非 1）；H（色相）0–360°；alpha 用 `/` 分隔。
- OKLCH 是 Oklab 的柱面极坐标形式，Oklab 由 Björn Ottosson 于 2020 年发布，为图像处理设计的感知均匀空间——数值变化对应人眼感知均匀变化，HSL 的 L 则与真实感知亮度不一致。
- **Baseline「广泛可用」：2023 年 5 月起主流浏览器支持**（CSS Color Module Level 4）；相对颜色语法 `oklch(from var(--c) calc(l + 0.1) c h)` 属 CSS Color 5，且相对语法中 calc 只能加减数字（不能加 `10%`）。
- oklch 的色相角度与 hsl/lch 均不同（hsl 0°=红，CIELab 红约 41°）。

来源：
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- https://www.w3.org/TR/css-color-4/ （§9 oklab/oklch 定义；§4.4 示例推荐 `oklch(none 0 none)` 做去色动画）

### 2. OKLCH 选色工作流（设计系统实用法则）

**关键做法（来源：Evil Martians《OKLCH in CSS》）：**
- **固定 L、只调 C/H**：同一 L 值的颜色感知亮度一致 → 文字对比度可预测。文中示例：头像衍生主色用 `oklch(from var(--user-avatar-dominant) 0.8 0.17 h)`（L=0.8 时任何色相配黑字都清晰）；**「L≥87% 的背景配黑色文字对比度都好」**（0.87 0.06 h）。
- C 上限受色域限制：实际最大约 **0.37**（P3 屏略高）；H 经验映射：红≈20°、黄≈90°、绿≈140°、蓝≈220°、紫≈320°（ROYGBIV 每字母约 50°）。
- LCH(CIELab) 在蓝区（270–330°）有色相漂移缺陷（蓝变紫），Oklab 即为修复此问题而生。
- 主题工程：组件只引用 `var(--error)` 等语义变量，暗色/高对比主题只改变量；hover 用相对颜色 `calc(l + 0.1)` 实现。
- **警示（原文 changelog）**：仅靠 OKLCH 不能保证可访问性，还需用 APCA 校验对比度。
- 配套工具：**oklch.com**（Evil Martians 官方选色器）、Huetone（huetone.ardov.me 调色板生成器）、Figma OkColor 插件、`npx convert-to-oklch`、stylelint-gamut（检测越域 P3 色并强制 `@media (color-gamut: p3)` 手动降级）。
- 浏览器 gamut mapping 现状：CSS Color 4 要求降 chroma 保色相，但原文指出 Chrome/Safari 实际仍在直接裁剪 RGB（会可见改变色相），因此建议手写 P3 覆盖规则。

来源：https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems

### 3. Display P3 与广色域 CSS（sRGB vs P3）

**关键参数与事实：**
- W3C CSS Color 4 预定义色彩空间及 **Lab 色域体积（百万 Lab 单位）**：sRGB 0.820、**display-p3 1.233（≈sRGB 的 1.5 倍）**、a98-rgb 1.310、rec2020 2.042、prophoto-rgb 2.896。
- Evil Martians 给出的另一口径：sRGB 仅能显示人眼可见颜色的约 **35%**，P3 增加 **30%**（两种口径度量不同：前者是 Lab 体积比，后者是可见色覆盖率）。
- 用法：`color(display-p3 1 0.5 0)`；渐进增强三件套：基础 sRGB 值 + `@supports (color: color(display-p3 1 0 0))` + `@media (color-gamut: p3)`。MDN 确认 `color-gamut` 取值 srgb/p3/rec2020 为包含关系（p3 包含 srgb），Baseline 2023 年 2 月。
- 越域颜色仍合法，浏览器会做 gamut map 后显示（C4 规范定义 Binary Search/EdgeSeeker/Ray Trace 等降 chroma 算法）。

来源：
- https://www.w3.org/TR/css-color-4/ （§10 预定义空间、§14 gamut mapping）
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
- 注：原 web.dev《Wide gamut colors in CSS》/ Chrome 博客《High Definition CSS Color Guide》现均 404（内容已迁移），本次以 W3C/MDN 一手规范替代。

### 4. 广色域渐变与插值空间

**关键参数与事实：**
- CSS Color 4 §13：渐变可在指定色彩空间插值（`linear-gradient(in oklab, red, blue)`），支持 srgb/display-p3/oklab/oklch/xyz 等全部空间；色相插值四种策略 `shorter | longer | increasing | decreasing`；缺失分量（如白色的 hue）取对端色相参与插值。
- 默认（不写 `in`）在 sRGB 插值，长距离色相过渡易出「脏灰」带；极坐标空间插值更鲜艳。
- **工业落地（Tailwind CSS v4，2025-01）**：默认调色板整体从 rgb 换成 **oklch**（公告名 "Modernized P3 color palette"，在原受限于 sRGB 处更鲜艳且不破坏 v3 平衡）；透明度用 `color-mix(in oklab, var(--color-blue-500) 50%, transparent)`；渐变默认 OKLAB 插值，可用 `bg-linear-to-r/srgb`、`/oklch` 修饰符切换；`@theme` 自定义色直接写 `oklch(0.84 0.18 117.33)`。

来源：
- https://www.w3.org/TR/css-color-4/ （§13 interpolation）
- https://tailwindcss.com/blog/tailwindcss-v4

---

## 二、调色板方法论

### 5. Tonal Palette（色调调色板，HCT 空间）

**关键参数与事实（来源：material-color-utilities GitHub README；Android 开发者文档）：**
- **HCT**（Hue 0–360 / Chroma / **Tone 0–100**）= CAM16 色度模型 × CIE L*，并考虑观看条件。
- Tonal palette 定义：固定色相与色度、仅 tone 变化的色列；Android 系统实际为每个关键色生成 **13 档 tone** 的调色板。
- 核心调色板固定 5 个：**Primary / Secondary / Tertiary / Neutral / Error**。

来源：
- https://github.com/material-foundation/material-color-utilities
- https://developer.android.com/develop/ui/views/theming/dynamic-colors

### 6. Material You Dynamic Color（动态取色流程）

**关键流程（来源：Android 开发者文档，一手）：**
1. 系统检测壁纸主色，提取 **source color**；
2. 由 source 色外推出 5 个关键色（Primary/Secondary/Tertiary/Neutral/Neutral variant）；
3. 每个关键色展开为 13-tone tonal palette；
4. 由同一壁纸派生 5 套配色方案，构成亮/暗主题基础。
- 取色算法链（material-color-utilities）：`quantize` 组件 **Celebi = Wu（粗量化）+ WSMeans（加权均值聚类）**，再由 `score` 组件按「适合作主题色」排序选出 source color。
- 变体（variant）：Android 12 推出 **Tonal Spot**，Android 13 增加 **Neutral / Vibrant Tonal / Expressive**（各自以 vibrancy 和色相旋转配方变换种子色）。
- 品牌色保留：用 `HarmonizedColors` 在 HCT 中把自定义色向系统色相调和，保持对比与视觉平衡（运行时 `applyToContextIfAvailable()`）。
- 取色库多语言实现：C++/Dart/Java/Swift/TypeScript/Kotlin。

来源：
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://github.com/material-foundation/material-color-utilities

### 7. Material 3 语义色角色与默认值

**关键参数（来源：Android 开发者文档 colors.xml 原文值）：**
- 角色命名：`primary / on-primary / primary-container / on-primary-container / secondary / secondary-container / error / error-container / background / surface / on-surface / surface-variant / outline` 等（accent 类、surface 类、container 类 + on-X 反色）。
- **M3 基线值**：亮色 primary `#6750A4`、on-primary `#FFFFFF`、primary-container `#EADDFF`、error `#B3261E`、surface `#FFFBFE`、on-surface `#1C1B1F`；**暗色 primary `#D0BCFF`**（≈tone 80）、on-primary `#381E72`、primary-container `#4F378B`、surface-variant `#49454F`——体现「暗色模式用更亮更低饱和的 accent」惯例。
- 官方配套工具：Material Theme Builder（Figma 插件 / 网页版，goo.gle/material-theme-builder-web，经 Android 文档引用）。

来源：https://developer.android.com/develop/ui/views/theming/dynamic-colors

### 8. 12 步语义色阶（Radix Colors，非 Material 路线的工业标杆）

**关键参数（来源：Radix 官方文档，一手）：**
- 每色 12 步：**1** app 背景、**2** 次级/微妙背景、**3** 组件表面背景、**4** hover 背景、**5** pressed/selected 背景、**6** 非交互微妙边框、**7** 交互边框/焦点环、**8** hover 边框/强边框、**9** 纯色 solid（全阶 chroma 最高、"混入白/黑最少"，多数配白字，但 Sky/Mint/Lime/Yellow/Amber 5 个色阶配深色字）、**10** solid hover、**11** 低对比文本、**12** 高对比文本。
- 对比度保证：步 11/12 **在同类步 2 背景上保证 Lc 60 / Lc 90 的 APCA 对比度**（官方原文）。
- 明暗切换：加容器类名即换暗色（开箱即用）；亮色可用白色作 app 背景，暗色改用步 1/2 的灰或彩色，并为 `AppBg` 建 mutable alias 按模式重映射。
- 提供 6 种中性色（Gray/Mauve/Slate/Sage/Olive/Sand）+ 26 个 accent + alpha 透明变体；官方宣称用 APCA 定目标、支持 P3 广色域。

来源：
- https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- https://www.radix-ui.com/colors

### 9. 60-30-10 法则

**关键参数（来源：LogRocket UX 与 hype4.academy 两篇交叉印证）：**
- 定义：**60% 主导色**（大面积基调，UI 中=背景画布，常为中性色）、**30% 辅助色**（侧边栏/卡片/面板/搜索栏）、**10% 强调色**（CTA/链接/图标，最鲜艳）。
- hype4 版本强调：强调色是界面「焦点/行动号召」；不要让所有颜色都鲜艳；单色阶方案会让按钮「消失」；**暗色模式下避免过度饱和（对比过高致视觉疲劳）**。
- 两篇均明确：该法则源自室内设计、是指导原则而非硬性规定。
- 经典例证（LogRocket）：Material 白底 60 / 浅灰组件 30 / 亮蓝按钮 10；Spotify 黑 60 / 深灰 30 / 活力绿 10。

来源：
- https://blog.logrocket.com/ux-design/60-30-10-rule/
- https://hype4.academy/articles/design/60-30-10-rule-in-ui

### 10. 语义色 Token 三层架构（primitive → semantic → component）

**关键证据（来源：GitHub Primer Primitives README，一手）：**
- GitHub Primer 实测分层：**primitives**（`base.color.blue.3` 等原始值，经 style-dictionary 编译）→ **functional/semantic token**（`bgColor-default`、`fgColor-muted`、`borderColor-accent.muted` 等，引用 primitive）→ 主题文件按需组合。
- 主题模式官方清单：`light / dark / dark-dimmed / light-high-contrast / dark-high-contrast / light-colorblind / dark-colorblind / light-tritanopia / dark-tritanopia`——即「语义层换映射表即可生成高对比/色盲模式」的实证。
- token 格式遵循 **W3C Design Tokens 社区组规范**（`$value/$type/$extensions`），支持 alpha 变换（`{ $value: '{base.color.blue.3}', alpha: 0.4 }`）与 `@`-hack 定义默认+子值（`bgColor.accent.@` → `bgColor-accent`）。
- 同构佐证：Android 文档原文说明 Dynamic Color 用 design token「语义化分配 color role 而非具体值」，使亮暗主题与动态色共享同一套 token。

来源：
- https://github.com/primer/primitives （README）
- https://developer.android.com/develop/ui/views/theming/dynamic-colors

---

## 三、暗色模式

### 11. Web 端暗色模式实现策略（prefers-color-scheme / color-scheme / light-dark()）

**关键参数（来源：MDN，一手）：**
- `@media (prefers-color-scheme: dark|light)`：检测 OS 级偏好，Baseline 2020-01（Media Queries L5）；嵌入式 SVG/iframe 继承父元素 `color-scheme`；配套 `<meta name="color-scheme">` 与 `Sec-CH-Prefers-Color-Scheme` 请求头。
- `:root { color-scheme: light dark }` + **`light-dark(lightValue, darkValue)`**（CSS Color 5）：参数一浅色/参数二深色，免写媒体查询；也接受 `<image>`（可整段换渐变背景）；**Baseline 2024-05**。
- 传统策略即「默认浅色 + dark 媒体查询覆盖变量」，与基于语义 token 的变量翻转等价。

来源：
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark

### 12. 直接反转 vs 语义 Token（平台惯例）

**关键结论（来源：Apple HIG Dark Mode 与 Android 文档，一手）：**
- Apple HIG 原文：暗色调色板「**不一定是浅色的简单反转**（not necessarily inversions）」——背景变暗、前景变亮，但并非逐色互换；系统提供随外观自动适配的 **semantic colors**，自定义色用 Xcode Color Set 提供亮/暗两个变体；避免硬编码色值；不建议做 app 级外观开关（与系统设置冲突）。
- Android：推荐 `DayNight` 主题 + 主题属性（`?android:attr/textColorPrimary`、`?attr/colorSurface` 等）——即语义 token 路线；**Force Dark** 是「分析每个 View 自动反色」的快速兜底方案，官方明示要充分测试、按 View 排除——反例印证了「自动反转不如语义化」。
- Android 文档列出的常见暗色翻车点：假设背景总是浅色、硬编码文字色/背景色/图标色。

来源：
- https://developer.apple.com/design/human-interface-guidelines/dark-mode （markdown 版正文）
- https://developer.android.com/develop/ui/views/theming/darktheme

### 13. 暗色模式的 elevation / 饱和度处理惯例

**关键参数（来源：Apple HIG、M3 默认值、hype4）：**
- **Apple（iOS/iPadOS）**：暗色模式系统使用两组背景色 **base（更暗，让背景界面后退）与 elevated（更亮，让前台界面前进）**——深色界面叠深色界面靠「提亮」表达层级；前台呈现（popover/modal sheet）时自动从 base 切到 elevated。
- **饱和度**：M3 暗色 primary 默认 `#D0BCFF`（亮紫、低饱和）vs 亮色 `#6750A4`；hype4 60-30-10 文章亦写明「暗色模式避免过度饱和的颜色，对比度太高会造成视觉疲劳」。
- Apple 配套：暗色下把带白底的图片内容适当压暗防「发光」；文字靠 vibrancy 与提升对比保持可读；对比度底线 4.5:1，小字力争 7:1。
- **未找到**：Material 2 暗色主题「elevation overlay（白/黑叠加层按层级 0–16dp 递增透明度）」的具体百分比表——material.io 及其 Wayback 快照均 JS 渲染墙，抓不到正文；m3.material.io（color system / dark theme 页）同样为 shadow-DOM SPA，仅能取到标题。以上用 Apple base/elevated 与 M3 token 值替代佐证。

来源：
- https://developer.apple.com/design/human-interface-guidelines/dark-mode
- https://developer.android.com/develop/ui/views/theming/dynamic-colors
- https://hype4.academy/articles/design/60-30-10-rule-in-ui
- （尝试未果：https://material.io/design/color/dark-theme.html ；https://m3.material.io/styles/color/dark-theme ）

---

## 四、渐变与特效色

### 14. Mesh / Aurora 渐变

**关键参数（来源：MDN 渐变指南 + CodeFronts 完整代码页）：**
- 底层原理（MDN 一手）：渐变是 `<image>`，`background` 可叠多层，配合半透明色叠加；文档给出的三层 `linear-gradient(... rgb(255 0 0 / 80%), transparent 70.71%)` 与多圆 `radial-gradient(circle at x% y%, rgb(r g b / 50%), transparent 70.71%)` 叠加即「彩色光斑」最简实现，可再配 `background-blend-mode`。
- **Aurora 完整配方（CodeFronts，MIT 许可，2026-08 更新）**：4 个 `radial-gradient(38% 42% at 20% 25%, oklch(0.6 0.24 300 / .85), transparent 68%)` 光斑 + 1 层 `conic-gradient` 底色；整层 `inset:-25%`，`filter: blur(42px) saturate(1.15)`；动画只 transform 整层（60s ease-in-out alternate 平移/旋转/缩放，compositor-only），`prefers-reduced-motion` 时停用。
- 官方提示的调参心法：**改每层的 `at x% y%` 就是「mesh 编辑器」；oklch 光斑亮度保持 0.6–0.75，既能发光又不炸文字对比度**。

来源：
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients
- https://codefronts.com/design-styles/css-gradient-ui/animated-mesh-aurora-gradient-background/

### 15. Grain 颗粒叠加（噪点渐变）

**关键参数（来源：CSS-Tricks《Grainy Gradients》 + CodeFronts 实例）：**
- SVG `feTurbulence` 滤镜：`type='fractalNoise'`、`baseFrequency='0.65'`（控制颗粒粗细）、`numOctaves='3'`、`stitchTiles='stitch'`；存为独立 SVG 或内联，由铺满的 `<rect>` 引用。
- 叠加顺序：`background: linear-gradient(..., transparent), url(noise.svg)`（渐变一端透明让噪点透出）；再把灰噪点推向颗粒感：`filter: contrast(170%) brightness(1000%)`（作用于整元素、会动到原色）。
- 精修：`mix-blend-mode: multiply` + 父容器 `isolation: isolate` 防混到页面背景。
- 轻量变体（CodeFronts）：内联 data-URI `feTurbulence baseFrequency='0.9' numOctaves='2'`，rect `opacity=0.55`，噪点层整体 `opacity: .16`——**主作用是杀死廉价屏上的渐变色带（banding）**。
- CSS-Tricks 评论提示：极端 contrast/brightness 会丢色彩，mask 方案可能更高效；该技术不易直接用于 box-shadow。

来源：
- https://css-tricks.com/grainy-gradients/
- https://codefronts.com/design-styles/css-gradient-ui/animated-mesh-aurora-gradient-background/

### 16. 玻璃拟态（Glassmorphism）与系统玻璃材质

**关键参数（来源：glassmorphism.com 生成器（hype4.academy 承接）+ Apple HIG Materials，均一手抓取正文）：**
- 术语出处：生成器页自述「玻璃拟态」一词由 Michal Malewicz 于 2020 年 11 月提出（原 uxdesign.cc 文章现已 404，**正文未证实**，以工具页表述为准）。
- 经典配方默认值：背景 `rgba(255,255,255,0.15)`；`backdrop-filter: blur(20px)`（含 -webkit- 前缀）；边框 `1px solid rgba(255,255,255,0.3)`；圆角 `20px`；外阴影 `0 8px 32px rgba(0,0,0,0.1)`；三组内阴影（顶部高光 `inset 0 1px 0 rgba(255,255,255,.5)` 等）+ 伪元素边缘渐变高光。该风格必须放在**彩色背景**上才能显形。
- **Apple Liquid Glass（系统级玻璃，2025 引入的设计语言）**：分 **regular**（模糊+调背景亮度保可读，多数系统组件用）与 **clear**（高度透明，仅用于浮在照片/视频等富媒体背景上）两个变体；**clear 变体下若底层内容偏亮，官方建议加 35% 不透明度的深色 dimming 层**；iOS 同时保留 ultra-thin/thin/regular/thick 四档标准材质（越厚越暗越保对比）；材质上方的文字须用 vibrant colors；明确「不要把 Liquid Glass 用于内容层」。

来源：
- https://glassmorphism.com （301 跳转至 https://hype4.academy/tools/glassmorphism-generator/ ，正文取自跳转后页面）
- https://developer.apple.com/design/human-interface-guidelines/materials （markdown 版正文）

---

## 五、可访问性色彩

### 17. WCAG 对比度等级（AA / AAA / 非文本）

**关键参数（来源：W3C WCAG 2.1 Understanding 文档，一手）：**
- **AA / SC 1.4.3**：正常文字 ≥ **4.5:1**；大文字（≥18pt≈24px，或 ≥14pt≈18.66px 粗体）≥ **3:1**；4.5:1 依据约 20/40 视力的对比敏感度损失（3×1.5）。对比度为阈值**不得四舍五入**（4.499:1 不达标）。
- **AAA / SC 1.4.6**：正常文字 ≥ **7:1**（对应约 20/80 视力）；大文字 ≥ 4.5:1；适用含占位符、tooltip、图片化文字。
- **SC 1.4.11 非文本对比度（AA）**：UI 组件与理解内容所需的图形对象（图标、焦点环、勾选标记、图表元素）对相邻颜色 ≥ **3:1**；仅默认状态要求，hover 不在范围；禁用组件、UA 默认样式、logo/照片等豁免。
- 共同豁免：logotype（品牌字标）、纯装饰、不可见、图片中偶然文字。

来源：
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html
- https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

### 18. APCA（WCAG 3 候选感知对比度算法）

**关键参数（来源：Myndex/SAPC-APCA 仓库，一手）：**
- 基于 SAPC 感知模型、为自发光屏幕设计；输出 **Lc 感知对比度值**而非简单比值；**非对称**——深字浅底与浅字深底阈值不同（浅色模式长时间阅读疲劳是专门章节）。
- 仓库明确标注用于「emerging web standards (WCAG 3)」；官方强制用 `apca-w3` npm 包，不许自行实现公式（当前版本 0.0.98g-4g）。
- Radix Colors 官方即以 APCA Lc60/Lc90 作为文本色阶目标（见条目 8）。
- **未证实细节**：Lc 75≈正文舒适阅读、Lc 60≈大字号下限的具体建议值——README 未直接列出，指向官方指南（APCA in a Nutshell / Bronze Simple Mode），本次未逐页核实。

来源：https://github.com/Myndex/SAPC-APCA

### 19. 色盲友好设计

**关键参数（来源：jfly（CUD 官方）、Wilke 教材、Coblis、Primer）：**
- **Okabe-Ito / CUD 配色集（官方页一手确认）**：东京大学 Okabe 实验室等机构发布，共 **20 色**（印刷 JPMA 版 22 色），分高饱和强调色 / 大面积底色 / 无彩色三组；**明确采用 sRGB 标准**（理由：多数显示器与浏览器仅支持 sRGB）；经多类色觉障碍人群反复实验筛选；ver4（2018-08）更新了红/绿关系并新增演示模式；官方声明可自由使用。红→向橙调整、天蓝→偏粉、黄→瓜色（与绿区分）等调整逻辑见官方页说明。
  - ⚠️ 常见引用的 HEX 值（#E69F00 橙、#56B4E9 天蓝、#009E73 蓝绿、#F0E442 黄、#0072B2 蓝、#D55E00 朱红、#CC79A7 紫红等）**未在官方 HTML 页列出**（官方以 10MB PDF 指南和 .ase/.ai/.pptx 文件分发）——以上 hex 为业界常见引用值，**未证实**。
- Claus Wilke《Fundamentals of Data Visualization》第 4 章将该集作为定性色标的标准引用（Okabe & Ito 2008），定性色标要求各色「明显不同且相互等价」、不暗示次序。
- 色盲类型模拟：Coblis 支持红色盲（Protanopia）/绿色盲（Deuteranopia）/蓝色盲（Tritanopia）/全色盲（Monochromacy），纯本地计算无图片限制。
- 工程落地：GitHub Primer 官方主题含 `light-colorblind / dark-colorblind / light-tritanopia / dark-tritanopia` 四套色盲专用语义主题（见条目 10）。

来源：
- https://jfly.uni-koeln.de/colorset/
- https://clauswilke.com/dataviz/color-basics.html
- https://www.color-blindness.com/coblis-color-blindness-simulator/
- https://github.com/primer/primitives

### 20. 对比度 / 色彩工具链

**工具清单（均一手抓取验证）：**
- **WebAIM Contrast Checker**：输入前后景 HEX（或取色器），输出比值与 AA/AAA 判定（正常 4.5/7、大字 3/4.5、图形与 UI 组件 3:1）；大文字=14pt 粗体/18pt；支持 alpha、亮度滑杆、`&api` JSON 接口、Link Contrast Checker、WAVE 全页审计。
- **APCA 计算器**：myndex.com/APCA（官方推荐，配 apca-w3 包）。
- **oklch.com**：Evil Martians OKLCH 选色/转换器（含 gamut 可视化「洞」）。
- **Huetone**（huetone.ardov.me）：默认 Oklab 的可访问调色板生成器。
- **stylelint-gamut**：P3 越域检测 + hex/rgb/hsl 禁用规则。
- **Material Theme Builder**：M3 调色板/主题生成（Figma 插件与网页版）。
- **Coblis**：色盲模拟（见条目 19）。

来源：
- https://webaim.org/resources/contrastchecker/
- https://github.com/Myndex/SAPC-APCA
- https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems
- https://developer.android.com/develop/ui/views/theming/dynamic-colors

---

## 六、清单汇总：条目 → 命名 → 关键参数 → 来源 URL

| # | 条目 | 命名 | 关键参数 | 来源 URL |
|---|------|------|----------|----------|
| 1 | 感知均匀色彩空间 | `oklch(L C H / A)`（CSS Color 4） | L 0–100%；C 实用 ≤0.5（100%=0.4）；H 0–360°；Baseline 2023-05 | https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch |
| 2 | OKLCH 选色工作流 | 固定 L 调 C/H | L=0.8 配黑字；**L≥0.87 背景配黑字均达标**；C 实测上限≈0.37；红20/黄90/绿140/蓝220/紫320 | https://evilmartians.com/chronicles/oklch-in-css-a-utility-for-perceptually-uniform-color-systems |
| 3 | 广色域 CSS | `color(display-p3 ...)` + color-gamut | P3 Lab 体积 1.233M vs sRGB 0.820M（≈1.5×）；`@supports (color: color(display-p3 1 0 0))` + `@media (color-gamut: p3)` | https://www.w3.org/TR/css-color-4/ ; https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut |
| 4 | 渐变插值空间 | `in oklab / in oklch / longer hue` | 默认 sRGB 插值；hue 策略 shorter/longer/increasing/decreasing；缺失分量取对端 | https://www.w3.org/TR/css-color-4/ |
| 5 | 工业落地 | Tailwind v4 oklch 调色板 | 全调色板 rgb→oklch；透明度 `color-mix(in oklab, c X%, transparent)`；渐变默认 OKLAB 可 /srgb 切换 | https://tailwindcss.com/blog/tailwindcss-v4 |
| 6 | 色调调色板 | HCT Tonal Palette | Tone 0–100（每关键色 13 档）；核心 5 板：Primary/Secondary/Tertiary/Neutral/Error | https://github.com/material-foundation/material-color-utilities |
| 7 | 动态取色 | Material You / Dynamic Color | 壁纸→quantize(Celebi=Wu+WSMeans)→score→source→5 关键色→13-tone→5 方案；变体 Tonal Spot/Neutral/Vibrant/Expressive | https://developer.android.com/develop/ui/views/theming/dynamic-colors |
| 8 | M3 语义色角色 | `colorPrimary/Container/Surface/…` | 亮 primary #6750A4；暗 primary #D0BCFF（tone≈80）；surface #FFFBFE→暗 #1C1B1F 系 | https://developer.android.com/develop/ui/views/theming/dynamic-colors |
| 9 | 12 步语义色阶 | Radix Steps 1–12 | 1-2 背景 / 3-4-5 常态-hover-按下 / 6-7-8 边框 / 9-10 solid / 11-12 文本；步 11/12 保 APCA Lc60/90 | https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale |
| 10 | 60-30-10 法则 | 60/30/10 | 60% 背景（中性）/30% 辅助表面/10% CTA 强调；暗色下避免过度饱和 | https://blog.logrocket.com/ux-design/60-30-10-rule/ ; https://hype4.academy/articles/design/60-30-10-rule-in-ui |
| 11 | 三层 Token 架构 | primitive→semantic→component | `base.color.*` → `bgColor-default/fgColor-muted/…` → 组件；9 套主题含 colorblind/tritanopia/high-contrast；W3C DTCG `$value/$type` | https://github.com/primer/primitives |
| 12 | 暗色模式 Web 策略 | `prefers-color-scheme` + `light-dark()` | light-dark(l,d) 配 `color-scheme: light dark`；Baseline 2024-05；媒体查询 Baseline 2020-01 | https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark |
| 13 | 反转 vs 语义 | Dark Mode 不是反转 | 「not necessarily inversions」；semantic colors 自动适配；Android Force Dark 为兜底反例 | https://developer.apple.com/design/human-interface-guidelines/dark-mode |
| 14 | 暗色层级惯例 | base / elevated 背景 | 深色层级靠**提亮**（elevated 更亮=前进）；暗色 accent 提亮降饱和（#6750A4→#D0BCFF）；白底图片压暗 | https://developer.apple.com/design/human-interface-guidelines/dark-mode ; https://developer.android.com/develop/ui/views/theming/dynamic-colors |
| 15 | Mesh/Aurora 渐变 | 多光斑 radial 叠加 | 4×`radial-gradient(oklch(0.6–0.72 C H/.55-.85), transparent ~68%)` + conic 底；`blur(42px) saturate(1.15)`；整层 inset:-25% 慢速 transform；光斑 L 保持 0.6–0.75 | https://codefronts.com/design-styles/css-gradient-ui/animated-mesh-aurora-gradient-background/ ; https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients |
| 16 | Grain 颗粒 | SVG feTurbulence 噪点 | `fractalNoise, baseFrequency .65, numOctaves 3, stitchTiles stitch` + `contrast(170%) brightness(1000%)`；轻量版 baseFrequency .9 / 层 opacity .16 消 banding | https://css-tricks.com/grainy-gradients/ |
| 17 | 玻璃拟态 | Glassmorphism 经典配方 | `rgba(255,255,255,.15)` + `blur(20px)` + `1px rgba(255,255,255,.3)` 边框 + r20 + `0 8px 32px rgba(0,0,0,.1)`；需彩色底 | https://glassmorphism.com （现跳转 hype4.academy/tools/glassmorphism-generator/） |
| 18 | 系统玻璃材质 | Apple Liquid Glass | regular/clear 两变体；clear 上内容偏亮加 **35% 深色 dimming 层**；ultra-thin→thick 四档；材质上文字用 vibrancy | https://developer.apple.com/design/human-interface-guidelines/materials |
| 19 | WCAG 对比度 | AA 4.5:1 / AAA 7:1 / 非文本 3:1 | 大字（≥18pt 或 ≥14pt bold）减半：3:1/4.5:1；不得四舍五入；禁用组件/logo/装饰豁免 | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html |
| 20 | 感知对比度 | APCA（Lc，WCAG 3 候选） | 非对称（浅/深底不同阈值）；`apca-w3`；Radix 用 Lc60/90 定文本步 | https://github.com/Myndex/SAPC-APCA |
| 21 | 色盲友好调色板 | Okabe-Ito / CUD 配色集 | 官方 20 色（3 组）；sRGB 标准发布；hex 以 PDF/.ase 分发（常见引用 #E69F00/#56B4E9/#0072B2/#D55E00 等，未证实） | https://jfly.uni-koeln.de/colorset/ |
| 22 | 色盲模拟器 | Coblis | Protanopia/Deuteranopia/Tritanopia/Monochromacy 四类；纯本地计算 | https://www.color-blindness.com/coblis-color-blindness-simulator/ |
| 23 | 对比度检查器 | WebAIM Contrast Checker | AA 4.5/3、AAA 7/4.5、图形 3:1 判定；`&api` JSON；配套 WAVE | https://webaim.org/resources/contrastchecker/ |

---

## 七、未找到 / 未证实事项

1. **Material 2 暗色主题 elevation overlay 具体百分比**（白/黑叠加层随层级 0–16dp 的透明度表）：material.io 与其 Wayback 快照均为 JS 渲染墙，正文不可取——**未找到可靠资料**；已用 Apple base/elevated 与 M3 tone 值替代佐证层级惯例。
2. **m3.material.io 的 color system / dark-theme / roles 页正文**：shadow-DOM SPA，仅抓到标题；M3 内容改以 Android 开发者文档与 material-color-utilities 一手来源呈现。
3. **web.dev《Wide gamut colors in CSS》与 Chrome《High Definition CSS Color Guide》**：原 URL 已 404（站点迁移），P3 数字改由 W3C 规范（Lab 色域体积）与 Evil Martians（可见色覆盖率口径）交叉给出。
4. **Okabe-Ito 官方 HEX 值**：官方 HTML 页不含 hex（以 PDF/.ase 文件分发）；文中列出的 hex 为业界常见引用值——**未证实**。
5. **APCA 的 Lc 75/60 具体阈值建议**：仓库 README 未列正文，指向官方指南页未逐页核实——**未证实**。
6. **Malewicz 玻璃拟态原始文章**（uxdesign.cc/glassmorphism-in-user-interfaces-…）：已 404；术语出处表述以同一作者的官方生成器页自述为准。
7. **「暗色模式下整体降饱和 15–30%」之类的量化惯例**：本次未检索到可一手核实的官方数字，仅有定性建议（hype4、M3 默认值佐证）——**未找到可靠量化标准**。
