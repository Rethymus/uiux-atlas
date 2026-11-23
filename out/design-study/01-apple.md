# Apple 设计语言研究:HIG 核心原则 + apple.com 产品页工艺

- 调研日期:2026-11-21
- 服务对象:深色主题「UI/UX 设计全解图集」(Astro 静态站 + React 岛屿),视觉偏平、条目页冗长堆叠,需一套可直接落地的 Apple 式设计语言
- 方法声明(本次会话实际执行):
  - Apple HIG 全部经**官方 DocService JSON 数据端点** `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<slug>.json` 抓取并解析全文(抓取脚本 `F:\ZCodeData\UIUX\scripts\hig_fetch.py`,以 `python -I` 运行;下载件在 `.zcode\tmp\hig-json\`)。curl 批量探测 26 个 slug,7 个目标页均返回 HTTP 200。
  - apple.com 产品页**直抓 HTML + 页面真实 CSS**:`iphone-air.html`、`mac-studio.html`、`final-cut-pro.html` 及 `overview.built.css`、`ac-localnav.built.css`(下载于 `.zcode\tmp\apple-www\`),所有字号/字距/色值均为 CSS 原文 grep 结果。
  - 系统灰阶/彩色色值:从 color 页官方色板图片的 `alt` 属性读取(`R-99,G-99,B-102` 格式),官方数据,非转述。
  - Liquid Glass 规格与 SwiftUI 弹簧参数**复用本项目已有调研**:`out/research/02-official-design-specs.md` §1(A1–A13);HIG Motion 原则复用 `out/research/04-motion-microinteractions.md` §1.6(两份均为本项目前期一手抓取)。
  - web_reader 内置配额耗尽(Limit Exhausted,重置于 2026-12-03)、fox_fetch 连接失败、fox_search 各引擎均失败——以上工具不可用情况如实记录;联网核验全部改经 curl + WebFetch 完成。

---

## 1. HIG 核心原则的可落地手法

> 说明:现行 HIG(2026-11 实测)已**没有** `hierarchy` / `progressive-disclosure` / `direct-manipulation` / `consistency` 四个独立页面(curl 探测其 JSON 端点均 404);这些原则分散在 Layout、Typography、Color、Dark Mode、Designing for iOS/macOS 等页。以下全部为现行页面原文。

### 1.1 层次(Hierarchy)——官方手法 → 落地规则
来源:https://developer.apple.com/design/human-interface-guidelines/layout (§Visual hierarchy)

| HIG 原文手法 | 落地 token/规则 |
|---|---|
| "Order content by relative importance… place the most important items near the top and leading side" | 重要内容置顶+起始侧;条目页章节顺序 = 重要性降序,不做均衡堆叠 |
| "Align elements… use indentation to convey hierarchy"(对齐成组、缩进=从属) | 同级严格同一左缘;子级缩进 16px(token `--indent-child:16px`);对齐错误即破坏层次认知 |
| "Group related items… negative space, container shapes, or separator lines" | 分组三件套:负空间(优先)、容器、分隔线;`--space-group:24px` 组间 vs `--space-in-group:12px` 组内,比值 2:1 |
| "Adjust font weight, size, and color… to visualize hierarchy"(Typography 页) | 层次靠字重/字号/颜色三轴,不靠装饰;标题 400–600,辅助文本用 label 色阶 |
| 背景层级:Primary=整页,Secondary=页内分组,Tertiary=组内分组(Color 页) | 见 §3.2 灰阶 token,直接映射三档 |

Typography 层次补充(来源:https://developer.apple.com/design/human-interface-guidelines/typography ):标题家族共 11 级(Large Title→Caption 2),层级感 = 尺寸差 + 字重差(Headline 用 Semibold 与同尺寸 Body 区分);「Minimize the number of typefaces you use」——全站一个字族(SF 系),层级只动 size/weight/color;「Maintain a consistent information hierarchy regardless of the current font size」——放大字号时保持主次顺序,不是全部放大。

### 1.2 渐进披露(Progressive Disclosure)
来源:https://developer.apple.com/design/human-interface-guidelines/layout

HIG 原文:"An interface with too much content and too many choices makes it harder to find information quickly… Use **disclosure triangles, menus, or nested views** to reduce how much content to initially display; or use **scrollable sections** to showcase additional content."

落地规则(对本项目条目页的直接处方):
- 条目页首屏只给「一句定义 + 一张总览图」,规格细节收进可滚动分节;
- 章节头用 eyebrow(小标签)+ 大标题,细节逐节揭示——即 apple.com 产品页的做法(§5);
- 交叉细节(如 token 表)用 disclosure 控件(折叠面板)收纳,默认收起,首层只留标题行;
- 「secondary details and actions discoverable with minimal interaction」(Designing for iOS 页原文:限制同时可见控件数,让次要细节一步可达)→ 折叠面板展开即达,不再跳页。

### 1.3 直接操控(Direct Manipulation)
`direct-manipulation` 独立页已 404(本次实测)。现行官方表述可见于:
- Motion 页:"the movement of Liquid Glass responds to **direct touch interaction with greater emphasis** to reinforce the feeling of a tactile experience"(触摸强反馈、触板弱反馈——输入方式决定动效强度)。来源:https://developer.apple.com/design/human-interface-guidelines/motion
- Designing for iOS 页:让滑动返回、列表行内发起动作成为主要导航方式;控件放中下部更易触及。来源:https://developer.apple.com/design/human-interface-guidelines/designing-for-ios

落地:色板/示例卡支持直接拖拽与点击变体切换;hover 用轻反馈、点击用强反馈(对应触摸/触板两档)。

### 1.4 一致性(Consistency)
来源:https://developer.apple.com/design/human-interface-guidelines/color 、/typography 、/layout

- "Avoid using the same color to mean different things"——一个颜色只承担一个语义(强调色只给可交互元素);
- "Avoid redefining the semantic meanings of dynamic system colors"——语义 token 用途固定(label 色不做背景、separator 不做文字);
- "Use consistent spacing… When content isn't consistently spaced, it no longer looks like a grid"(Layout 页 tvOS Grids 节)——间距必须出自 token 表,禁止自由值;
- 组件复用:同一分节模式(eyebrow+标题+正文)在所有条目页重复出现,形成肌肉记忆(§5.4)。

---

## 2. 排版工艺:具体数值

### 2.1 HIG iOS 文本层级(Dynamic Type,default「Large」档,官方表实抓)
来源:https://developer.apple.com/design/human-interface-guidelines/typography (§Specifications;JSON `content[67]` tab "Large (default)")

| Style | Weight | Size (pt) | Leading (pt) | 行高比 |
|---|---|---|---|---|
| Large Title | Regular | 34 | 41 | 1.206 |
| Title 1 | Regular | 28 | 34 | 1.214 |
| Title 2 | Regular | 22 | 28 | 1.273 |
| Title 3 | Semibold* | 20 | 25 | 1.250 |
| Headline | **Semibold** | 17 | 22 | 1.294 |
| Body | Regular | 17 | 22 | 1.294 |
| Callout | Regular | 16 | 21 | 1.313 |
| Subhead | Regular | 15 | 20 | 1.333 |
| Footnote | Regular | 13 | 18 | 1.385 |
| Caption 1 | Regular | 12 | 16 | 1.333 |
| Caption 2 | Regular | 11 | 13 | 1.182 |

*Title 3 emphasized weight=Semibold;Headline 与 Body 同为 17pt,仅以 Semibold 区分——「同尺寸、异字重」是 Apple 层次手法的标志性细节。7 档字号缩放(xSmall 31pt → xxxLarge 40pt 的 Large Title)与 AX1–AX5(44→60pt)官方表均已抓取存档(`.zcode\tmp\hig-json\typography_tables.txt`)。

macOS 内置层级(同页,`content[71]`):Large Title 26/32、Title 1 22/26、Title 2 17/22、Title 3 15/20、Headline 13/16(Bold)、Body **13**/16、Callout 12/15、Subheadline 11/14、Footnote 10/13、Caption 10/13。默认字号 13pt、最小 10pt(iOS 默认 17pt、最小 11pt)——「macOS 更小更密」是工作台类界面的基准(§6)。

### 2.2 字距跟踪(tracking):SF Pro 官方全曲线
来源:同页 §Tracking values(JSON `content[82]`,SF Pro 表 66 行全部抓取;macOS/tvOS 表与之一致)

关键锚点(1/1000 em / 折算 px):

| Size (pt) | Tracking (em‱) | Tracking (px) |
|---|---|---|
| 11 | +6 | +0.06 |
| **12** | **0** | 0.0(正负分界)|
| 13 | −6 | −0.08 |
| 15 | −16 | −0.23 |
| **17** | **−26** | **−0.43(全曲线最紧点)** |
| 20 | −23 | −0.45 |
| 22 | −12 | −0.26 |
| 24 | +3 | +0.07 |
| **28** | **+14** | +0.38(局部最松)|
| 34 | +12 | +0.40 |
| 40 | +10 | +0.37 |
| 48 | +8 | +0.35 |
| 56 | +6 | +0.30 |
| 64 | +4 | +0.22 |
| 72 | +2 | +0.14 |
| **80–96** | **0** | 0(归零)|

官方曲线形状:**6→17pt 渐紧**(小字加宽、正文最紧),**17→28pt 回松**(中标题最松),**28→80pt 渐收**,80pt 以上归零。SF Pro Rounded 整体更松(12pt 即 +46),New York 更紧(17pt −4)。落地:CSS 直接用 `letter-spacing` 折算值,见 §7 token 表。

### 2.3 apple.com 网页版字阶(2026-11-21 实抓 iphone-air.css 原文)
来源:https://www.apple.com/v/iphone-air/k/built/styles/overview.built.css

| 用途(class) | 桌面 | ≤1068px | ≤734px | 字族 |
|---|---|---|---|---|
| 超大标题 `typography-modal-header-headline`/`index-headline` | 56px / 1.0714 / 600 / −0.005em | 48px / 1.0835 / −0.003em | — | SF Pro Display |
| 大标题 `typography-headline` | 48px / 1.0835 / 600 / −0.003em | — | — | SF Pro Display |
| 章节大字 `ps-headline-elevated` / `section-header-headline`(500) | 40px / **1.1** / **0em** | 32px / 1.125 / +0.004em | 28px / 1.1429 / +0.007em | SF Pro Display |
| Hero 标语 `typography-welcome-headline` | 28px / 1.1429 / **400** / +0.007em | 24px / 1.1667 / +0.009em | 19px / 1.2105 / +0.012em | SF Pro Display |
| 章节眉标 `ps-headline-eyebrow` | 21px / 1.1905 / +0.011em | 19px / 1.2105 / +0.012em | 17px / 1.2354 / −0.022em | Display→Text |
| Hero 说明/卡片 meta `welcome-detail` / `caption-tile` | 17px / 1.4706 / 400 / −0.022em(caption-tile 为 **600**) | 14px / 1.4286 / −0.016em | 同左 | **SF Pro Text** |
| 小注 `typography-caption` | 12px / 1.3334 / 400 / −0.01em | — | — | SF Pro Text |

三条铁律(全部实测归纳):
1. **≥19px 用 SF Pro Display、≤17px 换 SF Pro Text**(CSS font-family 实证),Text 段字距转负(−0.016/−0.022em),Display 段字距随字号增大渐归 0;
2. 行高比随字号减小而放宽:56px→1.07,40px→1.10,28px→1.14,17px→1.24–1.47,12px→1.33;
3. 桌面/1068/734 三档只动 size+letter-spacing,字重不变。

### 2.4 行长与断点
- HIG **未给出**行长数值(如实标注,typography/layout 页全文核验无此数值);apple.com 的实施惯例即事实标准:
  - 内容主列 `max-width:980px`(mac-studio.css 多处);窄文本列 `max-width:692px`;正文容器 734px 以内(iphone-air.css 中 619 处 `max-width:734px` 为移动档容器宽)。
  - 断点体系:`480px / 734px / 1068px / 1441px`(iphone-air.css 媒体查询统计)。
  - Mac Studio 的章节眉标用网格约束行长:`large-10 large-offset-1`(12 列中占 10 列、偏移 1 列,≈ 980px 体系的 6/8 起)。来源:mac-studio.html `<h2 class="ai-eyebrow large-10 large-offset-1 typography-section-eyebrow">`。

---

## 3. 材质与深度:分层策略

### 3.1 Liquid Glass 与材质层级(复用本项目 research 02 §1)
规格复用 `out/research/02-official-design-specs.md` §1:regular(模糊背景+亮度调整,系统组件默认)/ clear(高透,仅媒体之上)两变体;`glassEffect(_:in:)`(默认 Capsule)、`GlassEffectContainer` 合并与 morph、`UIGlassEffect.isInteractive`;旧体系 `ultraThinMaterial…ultraThickMaterial` 五档磨砂 + vibrancy(label/fill 四级、separator 一级;quaternary 在 ultraThin/thin 上禁用)。出处 URL 见该文件 A1–A10。

Layout 页新增落地手法(本次实抓):**"Differentiate controls from content"** ——控件层不用实色/半透明底,改用 scroll edge effect(内容滚到控件下方时自动加渐变遮罩)把控件「抬」出内容层;全屏背景图应延伸到 sidebar/toolbar/tab bar 之下;背景图被遮挡时用 `backgroundExtensionEffect()` 镜像+模糊补全。来源:https://developer.apple.com/design/human-interface-guidelines/layout

网页等价物(落地):顶栏/悬浮控件用 `backdrop-filter: blur(20px) saturate(180%)` + 半透明底(apple.com localnav 实值见 §5.1),而非实色条。

### 3.2 暗色分层:base / elevated 双套背景
来源:https://developer.apple.com/design/human-interface-guidelines/dark-mode (§iOS, iPadOS,原文实抓)

官方机制:"the system uses two sets of background colors — called **base** and **elevated** — to enhance the perception of depth when one dark interface is layered above another. The base colors are dimmer… the elevated colors are brighter, making foreground interfaces appear to advance." 弹层(popover/modal sheet)出现时系统自动从 base 切到 elevated;多窗口/多任务下 elevated 也用于 app 间分隔。

官方灰阶色值(从 color 页色板 `alt` 属性实读,2025-06-09 更新版数据;来源:https://developer.apple.com/design/human-interface-guidelines/color §Specifications):

| 语义 | Dark 值 | Dark + Increase Contrast |
|---|---|---|
| systemGray(强调中性/禁用) | #8E8E93 | #AEAEB2 |
| systemGray2(tertiary 背景/填充) | #636366 | #7C7C80 |
| systemGray3(separator/填充) | #48484A | #545456 |
| systemGray4(secondary 填充) | #3A3A3C | #444446 |
| systemGray5(secondary 系统背景) | #2C2C2E | #363638 |
| systemGray6(tertiary 系统背景/elevated) | #1C1C1E | #242426 |

系统彩色的暗色值(同源实读):Blue #0091FF、Green #30D158、Indigo #6D7CFF、Orange #FF9230、Pink #FF375F、Purple #DB34F2、Red #FF4245、Teal #00D2E0、Yellow #FFD600、Mint #00DAC3、Cyan #3CD3FE、Brown #B78A66;高对比暗色变体(如 Blue #5CB8FF、Green #4AD968、Red #FF6165)。注:页面说明"Documented color values are for your reference during the app design process… actual color values may fluctuate"——用于设计基准,不承诺逐版不变。

落地分层模型(暗色条目页):
```
level-0 页面底(base)      ≈ #000000 区间(黑)
level-1 卡片/分组(elevated) #1C1C1E(= systemGray6 dark,官方色板值)
level-2 卡片内嵌块           #2C2C2E(= systemGray5 dark)
level-3 控件填充/分隔         #3A3A3C(= systemGray4 dark)
separator                   #48484A(= systemGray3 dark)
text-secondary              #AEAEB2 一带(浅灰阶)
```
说明:`systemBackground` API 本身的 hex 官方页未以文字发布(现行 color 页色值为图片);上表全部为官方色板实读值,映射关系按 dark-mode 页 base/elevated 语义与 Gray2–6 阶梯建立。

### 3.3 阴影与对比
- 暗色下深度**优先用「提亮」表达**(base→elevated),不依赖重阴影;透明度与 vibrancy 处理边界(Dark Mode 页:文字靠 vibrancy + 提高对比维持可读)。
- 硬指标(Dark Mode 页原文):对比度**不低于 4.5:1**;自定义前景/背景色**争取 7:1**,尤其小字。官方还要求在 Dark Mode + Increase Contrast + Reduce Transparency 组合下逐项测试。
- 图像处理:"Soften the color of white backgrounds"——暗色页里的白底截图/图片要轻微压暗,防止发光感。落地:截图统一加 `filter: brightness(.92)` 或深色化处理,卡片内图片容器用 level-1 底色。
- macOS desktop tinting(Dark Mode 页 macOS 节):窗口背景吸收桌面色调——网页端对应「底色带一丝环境色温」,暗色底不用纯黑死灰。

---

## 4. 动效:原则 + 数值

### 4.1 HIG Motion 原则(复用 research 04 §1.6,今日复核 motion 页全文一致)
来源:https://developer.apple.com/design/human-interface-guidelines/motion

- 目的性:"Add motion purposefully… Don't add motion for the sake of adding motion";
- **可打断**:"Let people cancel motion… don't make people wait for an animation to complete"(用户操作可随时中断动画,绝不让用户等动画播完);
- 时长克制:"Aim for brevity and precision in feedback animations"(反馈动效简短精确,轻而不抢);
- 高频不加动效:"generally avoid adding motion to UI interactions that occur frequently";
- 可关闭 + 多通道:"Make motion optional… supplement visual feedback by also using haptics and audio"(动效不可作为唯一信息通道);
- 输入自适应:Liquid Glass "responds to direct touch interaction with greater emphasis… more subdued… using a trackpad";
- visionOS 特例:约 0.2Hz 持续振荡人眼极敏感,避免或降幅(复用 research 04 §1.6)。

### 4.2 弹簧参数(复用 research 02 §1 A11–A13)
`spring(response: 0.5, dampingFraction: 0.825)`(官方默认);`smooth(0.5s, bounce 0)`、`snappy(0.5s, bounce 0.15)`、`bouncy(0.5s, bounce 0.3)`。感知时长基准 ≈ **0.5s**,交互控件偏 snappy,大区块偏 smooth。CSS 侧用本项目 research 04 §1.2 的弹簧近似法(`linear()` 采样或等价 cubic-bezier)换算——**近似推导,非 Apple 官方 web token**,报告中明确标注。

### 4.3 apple.com 实测动效数值(iphone-air.css 原文)
- **StaggeredFadeIn**(全站滚动入场签名):`[data-staggered-item]` 初始 `opacity:0` + `translateY(var(--staggered-translate-y))`,`--staggered-translate-y:30px`,组内每项延迟 `calc(var(--staggered-delay, 0.15) * 1s)` 递增;`will-change: opacity, transform`;`html.reduced-motion` 与 `no-js` 下强制 `opacity:1; transform:none`(无障碍全量豁免)。
- **localnav 显隐**:`position:sticky` + 滚动驱动 `backdrop-filter: blur(0px) → blur(20px)`;亮态底 `rgba(250,250,252,0.92)`,暗态底 `rgba(22,22,23,0.88)`。来源:`ac-localnav.built.css`。
- 滚动编排:每个章节 `<section data-anim-scroll-group="…">`,入场组件由 `data-component-list="StaggeredFadeIn"` 声明,锚点用 `a0t/a0b`(anchor-top/bottom)滚动关键帧语法。

### 4.4 落地时长/缓动 token(§7 汇总)
- 反馈(按压/变体切换):150ms,spring(snappy) 等价;
- 入场/位移:300ms 级(30px 位移 + 0.15s 逐项错峰);
- 大区块过渡:500ms(spring 默认感知时长);
- 交错:每项 +0.15s;全部动效包 `@media (prefers-reduced-motion: reduce)` 豁免。

---

## 5. apple.com 产品页拆解(3 个真实页面,2026-11-21 实抓)

### 5.1 iPhone Air(https://www.apple.com/iphone-air/)
骨架(HTML `<section>` 实序):`ribbon(促销条) → section-welcome(hero) → #highlights → #design → product-viewer(3D 查看器) → #cameras → #performance → #shared-features → #upgrade → #accessories → upgrade-banner → incentive(Why Apple) → #compare → environment → values → faq → index → footer`。每个 section 携带 `data-analytics-section-engagement="name:…"` 与 `data-deep-link` 锚点。

- **hero**:`.section-welcome` 高度 `calc(100svh − globalnav − ribbon)`,`min-height:700px; max-height:1200px`;`.marquee` 内边距上下各 **64px**;产品名与说明行距 `--marquee-header-detail-row-gap:32px`;h1 为 `visuallyhidden` 的 "iPhone Air"(可见大字是产品视觉图),可见文案只有两行:`h2.typography-welcome-headline`(28px/400)"Incredibly light and thin." + 说明 "With the power of Pro inside." + "Buy" CTA + 脚注标 ◊。**大字 hero 的「大」在产品视觉,文字反而克制**。
- **sticky 分节导航**:`#localnav` sticky 置顶;初始隐藏叠在 hero 上,滚过 hero 锚点后显现:`data-reveal=".section-welcome .marquee-detail" data-reveal-keyframe="a0b"`;玻璃两态底色 + blur(0→20px)(数值见 §4.3)。旧版 `chapternav` 组件已不存在(本次 HTML grep 0 命中)。
- **章节节奏**:`background-alt` 隔节换底色;`gradient-fill-tertiary-to-bottom` / `-to-top` 交替方向的整节渐变;`StaggeredFadeIn` 逐节入场(数值见 §4.3)。
- **金属渐变文字**:`.gradient-text { --gradient:linear-gradient(0deg,#7a8fa4,var(--sk-fill-gray) var(--gradient-start,50%)); background-clip:text; -webkit-text-fill-color:transparent }`,章节变体 `#7b8fa3→#697b8b 52%→#4c5b65`(小屏 `#62798d→#4c5b65 40.76%`);`gradient-text-60/70` 调整灰阶起点;highlights 区还有彩色变体 `linear-gradient(108deg,#0894FF,#C959DD 34%,#FF2E54 68%,#FF9004)`。eyebrow 色 `#495861`(低饱和灰蓝)。

### 5.2 Mac Studio(https://www.apple.com/mac-studio/)
- **Bento 网格**:`.bento-grid` 12 列 `grid-template-columns:repeat(12,minmax(0,1fr))`,桌面 `gap 24px / padding 0 24px`,中屏 20px,单列档 row-gap 18px;`grid-template-areas` 显式布局("bento-1 bento-3" / "bento-1 bento-4" / "bento-2 bento-4"——大小卡混排)。
- **深色分节嵌入亮色页**:`section-mx-ultra chip-bento-processing theme-dark`——页面整体为亮色,但芯片特写分节整节切换 theme-dark,同一页面里明暗交替换场。
- 章节头同构:`typography-section-eyebrow`(置于 12 列网格 `large-10 large-offset-1` 约束行长)+ 大标题;无障碍动效由 `data-vo` + `data-ax-anchor`(滚动锚点驱动辅助功能动画)管理。

### 5.3 Final Cut Pro(https://www.apple.com/final-cut-pro/)——pro 应用官网页
- `<body class="page-overview **theme-dark ac-theme-dark globalheader-dark**">`:**整页默认深色**(含全局导航),pro 应用产品页以深色为基调(与 §6 HIG 暗色策略互证)。
- 骨架:`welcome → banner → highlights → section-app×3(Video Editing / Intelligence / Titles) → modal-hero → graphics → design → …`;h1 直接用 `typography-eyebrow-elevated`(眉标即 h1"Final Cut Pro"),标语 h2 "Reel intelligence.";章节头仍为 eyebrow+大标题同构。

### 5.4 可复用组件结构(给本项目的规格)
1. **StickyLocalNav**:高 ≈48–52px;初始透明叠于 hero;滚过 hero 底部(a0b)后固定;底色 `rgba(22,22,23,0.88)` + `backdrop-filter:blur(20px) saturate(180%)`;左产品名(小字 600)+ 中部锚点链接 + 右 CTA 按钮;激活锚点高亮。
2. **ChapterHero**:`min-height:calc(100svh − nav)`(min 700 / max 1200);上 64px 下 64px padding;产品名区(大,可为图)+ 32px 间距 + 一句标语(28px/400)+ meta 行(17px/−0.022em 定价/可得性)+ CTA;对静态图集站:产品名即条目标题用 48–56px,标语 28px。
3. **MetaRow(紧凑 meta 行)**:`17px/600/−0.022em`(SF Pro Text 段),桌面 17px→移动 14px(−0.016em);元素间用细竖线或 24px 间距,不加底色。
4. **SectionRhythm(章节节奏)**:章节 = eyebrow(21→17px,#495861 灰蓝)+ 大标题(40px/0em,可 gradient-text)+ 主体 + 脚注行;隔节换底色(level-0/level-1 交替),渐变方向首尾交替;入场 StaggeredFadeIn(30px/0.15s 错峰);每节带锚点 id 支撑 localnav 高亮。
5. **BentoGrid**:12 列,gap 24/20/18px 随断点;`grid-template-areas` 显式指定大小卡混排(1 大 + 3 小),卡内左上角 eyebrow + 大数字(48px/500/−0.003em)。

---

## 6. 暗色工作台类界面(pro app)的配色与对比策略

来源:https://developer.apple.com/design/human-interface-guidelines/dark-mode 、/designing-for-macos 、/typography ;实页参考 https://www.apple.com/final-cut-pro/

- **何时可以只做深色**:Dark Mode 页原文授权——"In rare cases, consider using only a dark appearance… for an app that supports **immersive media viewing** to use a permanently dark appearance that **lets the UI recede and helps people focus on the media**";官方配图即 Stocks 深色专属界面。工作台/媒体类工具页 = 这个场景;但要提供两态测试与 Increase Contrast 支持。
- **层级即深度**:base/elevated 两套背景 + 弹层自动提亮(§3.2 token);工作台的面板层级:窗口底(base 黑)→ 面板(#1C1C1E)→ 组内分组(#2C2C2E)→ 控件填充(#3A3A3C)→ separator(#48484A)。
- **文字靠 vibrancy + label 阶梯**:primary/secondary/tertiary/quaternary label 四级(Dark Mode 页 Text 节),不用固定灰色——网页端对应 `--text-1/2/3/4` 四档(§7)。
- **对比硬指标**:≥4.5:1,小字目标 7:1;Increase Contrast 变体色已给出(§3.2 表右列)。
- **macOS 工作台密度基准**:默认字号 13pt(最小 10pt);`designing-for-macos` 原文:"Leverage large displays to present more content in **fewer nested levels** and with **less need for modality**, while maintaining a **comfortable information density**";键盘优先(全命令可达)、可定制工具栏、窗口自由缩放。网页端落地:工作台类条目页正文 14–15px、密度高于营销页、关键操作一屏可达、少弹窗。
- **真实参照**:apple.com/final-cut-pro 整页 `theme-dark`,连全局导航一起深色(`globalheader-dark`);内容节依然遵守 eyebrow+大标题+StaggeredFadeIn 同构——深色不影响工艺一致性。
- 白底素材压暗(§3.3):工作台页里的浅色 UI 截图务必处理,防止暗页发光。

---

## 7. 本项目落地 token 表(可直接粘贴为 CSS 变量)

> 推导声明:字阶/字距/行高/色值/玻璃参数均为上文官方或官方站实测值的直接换算;动效时长按 HIG spring 感知时长 0.5s 与 apple.com 0.15s 错峰实测归档;`--ease-*` 为弹簧的 CSS 近似(非官方 token)。

```css
:root {
  /* ── 暗色分层(base→elevated,官方灰阶色板值,HIG Color/Dark Mode) ── */
  --bg-0: #000000;            /* 页面底 base */
  --bg-1: #1C1C1E;            /* 卡片/分组 elevated(= systemGray6 dark)*/
  --bg-2: #2C2C2E;            /* 组内嵌块(systemGray5 dark)*/
  --bg-3: #3A3A3C;            /* 控件填充(systemGray4 dark)*/
  --sep:  #48484A;            /* 分隔线(systemGray3 dark)*/
  --fill: #636366;            /* 弱填充(systemGray2 dark)*/
  --text-1: #F5F5F7;          /* primary label(apple.com 深色主题文字/当前链接实值,mac-studio.css --tabnav-current-link-color)*/
  --text-2: #AEAEB2;          /* secondary label(systemGray dark 增亮档)*/
  --text-3: #8E8E93;          /* tertiary label(systemGray dark)*/
  --text-4: #636366;          /* quaternary/禁用 */
  --accent: #2997FF;          /* apple.com 链接蓝(mac-studio.css --ribbon-link-color 实值)*/
  --accent-press: #0091FF;    /* 按下/高对比(HIG systemBlue dark 色板值)*/

  /* ── 高对比变体(Increase Contrast 等价物,HIG 色板) ── */
  --bg-1-contrast: #242426;  --bg-2-contrast: #363638;  --bg-3-contrast: #444446;

  /* ── 字阶(HIG iOS 层级 + apple.com web 字阶) ── */
  --fs-hero:   56px;  --lh-hero: 1.071; --ls-hero: -0.005em; --fw-hero: 600;  /* index/modal headline */
  --fs-display:48px;  --lh-display:1.084; --ls-display:-0.003em; --fw-display:600;
  --fs-title:  40px;  --lh-title: 1.100; --ls-title: 0em;      --fw-title: 500;  /* 章节大字 */
  --fs-title-2:28px;  --lh-t2: 1.143;  --ls-t2: 0.007em;       --fw-t2: 400;    /* hero 标语档 */
  --fs-eyebrow:21px;  --lh-eyebrow:1.190; --ls-eyebrow: 0.011em; --fw-eyebrow:400;
  --fs-lead:   19px;  --lh-lead: 1.211; --ls-lead: 0.012em;    --fw-lead: 400;
  --fs-body:   17px;  --lh-body: 1.294; --ls-body: -0.022em;   --fw-body: 400;  /* SF Pro Text 段 */
  --fs-meta:   17px;  --lh-meta: 1.471; --ls-meta: -0.022em;   --fw-meta: 600;  /* 紧凑 meta 行 */
  --fs-small:  14px;  --lh-small:1.429; --ls-small: -0.016em;  --fw-small: 400;
  --fs-caption:12px;  --lh-caption:1.333; --ls-caption:-0.01em; --fw-caption: 400;

  /* 字族换挡:≥19px Display(无系统 SF 时用系统栈),≤17px Text(负字距) */
  --font-display: -apple-system, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-text:    -apple-system, "SF Pro Text", "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;

  /* ── 间距/布局(apple.com 实测) ── */
  --col: 980px;               /* 内容主列 */
  --col-narrow: 692px;        /* 窄文本列 */
  --gap-bento: 24px;          /* 20px@≤1068,18px@≤734 */
  --sec-pad-y: 64px;          /* 章节上下留白(marquee 实值)*/
  --hero-gap: 32px;           /* hero 名称与说明行距 */
  --indent-child: 16px;
  --group-gap: 24px; --in-group-gap: 12px;
  --bp-mobile: 734px; --bp-medium: 1068px; --bp-wide: 1441px;

  /* ── 材质(localnav 实值) ── */
  --glass-bg: rgba(22, 22, 23, 0.88);
  --glass-bg-light: rgba(250, 250, 252, 0.92);
  --glass-blur: 20px;
  --glass-saturate: 180%;

  /* ── 渐变文字(iPhone Air titanium) ── */
  --grad-text: linear-gradient(0deg, #7a8fa4, #7b8fa3 52%, #4c5b65);
  --grad-start: 60%;          /* gradient-text-60 */

  /* ── 动效(HIG spring 感知时长 + apple.com 实测) ── */
  --dur-feedback: 150ms;      /* 按压/切换,snappy 档 */
  --dur-move: 300ms;          /* 位移入场 */
  --dur-settle: 500ms;        /* spring(0.5, 0.825) 感知时长 */
  --stagger: 150ms;           /* StaggeredFadeIn 逐项错峰(实测 0.15)*/
  --stagger-shift: 30px;      /* 入场位移(实测)*/
  --ease-inout: cubic-bezier(0.45, 0.05, 0.25, 1); /* spring 近似,非官方 */
  --ease-out:  cubic-bezier(0.25, 0.6, 0.3, 1);
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

条目页结构处方(对应 §5.4):StickyLocalNav + ChapterHero(100svh,题 48–56px、标语 28px/400、meta 行 17px/600)→ 分节(eyebrow + 40px 大字 + 正文 ≤692px 列),隔节在 `--bg-0/--bg-1` 间交替,`StaggeredFadeIn` 入场,细节收纳进折叠面板(渐进披露),规格表进 BentoGrid(12 列/gap 24)。

---

## 8. 未找到 / 未证实(如实标注)

1. `hierarchy`、`progressive-disclosure`、`direct-manipulation`、`consistency` 独立 HIG 页:JSON 端点 404(curl 逐一探测 26 个 slug,输出已存档);原则内容按现行 Layout/Typography/Color/Designing for iOS 页原文引用。
2. HIG 无官方「行长」数值;行长实践取自 apple.com CSS 实测(980/692px)。
3. `systemBackground` 等背景语义色的具体 hex 未以文字发布(现行 color 页色板为图片);报告只给官方色板实读的 systemGray 系与彩色值,#000000 为 base 层的通用表述而非 API 文档值。
4. Apple 官方**不发布 web 动效 token**(缓动/时长);文中 `--ease-*` 为本项目按 spring 参数的近似换算,已标注非官方。
5. `chapternav` 旧组件在现行产品页已不存在(iphone-air.html grep 0 命中),现行等价物为 `#localnav`;旧文档中 chapternav 规格不再适用。
6. apple.com `--global-nav-collective-height` 的具体 px 值未展开核验(hero 高度公式仅引用变量)。
7. fox_fetch/fox_search/web_reader 本次不可用(连接失败/配额耗尽),替代路径为 curl + WebFetch + 官方 JSON 端点,不影响一手性。

---

## 9. 10 个签名巧思

1. **滚过 hero 才浮现的 sticky 导航**:localnav 初始透明叠在 hero 里,滚过 `data-reveal-keyframe="a0b"` 后以 `rgba(22,22,23,.88)+blur(20px)` 玻璃态固定——来源:`ac-localnav.built.css` + iphone-air.html `data-reveal` 属性。
2. **钛金属渐变标题字**:`linear-gradient(0deg,#7a8fa4→#4c5b65)` 经 `background-clip:text` 上色,`--gradient-start 60%/70%` 控制灰阶起点——来源:iphone-air.css `.gradient-text`。
3. **同尺寸异字重分层**:Headline 与 Body 同为 17pt,只靠 Semibold 区分主次——来源:HIG Typography §iOS Dynamic Type 表(default Large)。
4. **17pt 是全曲线字距最紧点**:SF Pro tracking 从 12pt 的 0 收到 17pt 的 −26/1000em(−0.43px),再向大字号回松、80pt 归零——来源:HIG Typography §Tracking values(66 行实测)。
5. **Display/Text 双字族换挡**:≥19px 用 SF Pro Display(正字距),≤17px 换 SF Pro Text(−0.022em)——来源:iphone-air.css 各级 font-family/letter-spacing。
6. **隔节换底 + 渐变方向交替**:`background-alt` 隔节换底色、`gradient-fill-tertiary-to-bottom/top` 首尾交替,滚动节奏永不单调——来源:iphone-air.html section class。
7. **30px + 0.15s 的入场签名**:全站滚动入场 = `opacity:0→1` + `translateY(30px)`,组内逐项 +0.15s 错峰,reduced-motion 全量豁免——来源:iphone-air.css `[data-staggered-item]`。
8. **hero 的高大留给产品,文字只给 28px/400**:`calc(100svh−nav)` 满屏、64px 上下留白、32px 名释行距,可见文案仅一句标语——来源:iphone-air.css `.section-welcome`/`.marquee`。
9. **暗色深度靠提亮不靠阴影**:base/elevated 两套背景,弹层永远比底层亮一档(#1C1C1E→#2C2C2E→#3A3A3C)——来源:HIG Dark Mode §iOS, iPadOS + 官方色板 alt 实读值。
10. **Bento 大小卡混排的显式布局**:12 列网格 `grid-template-areas:"bento-1 bento-3"…` 显式指定 1 大 3 小,gap 24→20→18px 随断点收紧——来源:mac-studio.css `.bento-grid`。
