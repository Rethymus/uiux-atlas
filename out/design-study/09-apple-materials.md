# 09 · Apple 材质系统与交互范式深度专项(HIG Materials / Liquid Glass / 中性色阶 / 弹簧 / 浮层 / 滚动 / 丝滑工艺)

> 调研日期:2026-11-22 · 服务对象:①把本站「参考 Apple」从文案落实为可验证的材质层参数系统;②产出 8 条微交互条目。
> 本报告为 `out/research/02-official-design-specs.md` §1(A1–A13)的实现细节补齐篇,并与 `out/design-study/01-apple.md` §3/§5.1 的 apple.com CSS 实值互为印证。

## 0. 方法与核验图例

本次实际执行:curl 直抓 Apple 官方文档 Markdown/JSON 端点(整页全文)、WWDC 官方页面 transcript(带时间戳逐句提取)、apple.com 生产环境 CSS 实抓、MDN 官方 JSON 数据端点抓取、两个独立社区色值页交叉比对;内置 web_reader/内置 WebSearch 配额耗尽(错误 1310),全部改用直抓与 DDG HTML 端点。逐条标注:

| 标记 | 含义 |
|---|---|
| 【官方·本次抓取】 | 本次会话 curl 抓取官方页面全文/JSON 后摘录,URL 见括号 |
| 【官方·前次引用】 | 复用 `out/research/02-official-design-specs.md` §1 已核验条目(URL 本次复核存在) |
| 【WWDC·本次抓取】 | 本次提取官方视频页 transcript 原句(带 `[秒]` 时间戳) |
| 【官方 CSS·实抓】 | apple.com 生产 CSS 文件直接 grep 出的规则原文 |
| 【社区·双源一致】 | 两个独立第三方页面本次抓取比对一致 |
| ⚠️未证实 | 官方未公布且本次检索未能取到可核验来源;如实标注 |

---

## 1. 材质:HIG 四档标准材质 + Liquid Glass(regular/clear)

### 1.1 体系总览【官方·本次抓取】(https://developer.apple.com/design/human-interface-guidelines/materials.md)

- Apple 平台两类材质:**Liquid Glass**(统一设计语言的动态材质,为 tab bar/sidebar 等「控件与导航」构成独立功能层,浮动于内容层之上)与 **standard materials**(在内容层内做视觉区分)。
- 硬规则:**不要把 Liquid Glass 用在内容层**;例外:内容层内滑杆/开关等「瞬态交互元素」在被激活时呈现 Liquid Glass 外观。自定义控件上应用 Liquid Glass 要「克制」,只给最重要的功能元素。
- 材质选择原则:**按语义用途选,不按颜色观感选**(系统设置会改变其外观);材质之上前景必须用系统 vibrant 颜色以保证可读性。

### 1.2 四档标准材质(ultraThin/thin/regular/thick)语义【官方·本次抓取】

iOS/iPadOS 继续提供四档(regular 为默认),用于**内容层**。HIG 官方定性(摘要自官方图注与 tvOS 用途表):

| 材质 | 透光度(官方定性) | 官方推荐场景(tvOS 表,iOS 同语义) |
|---|---|---|
| `ultraThin` | 背景「diffuse gradient」弥散透出 | 需要浅色配色方案的全屏视图 |
| `thin` | 弥散 + 轻微压暗 | 部分遮挡屏幕内容、需浅色配色的 overlay |
| `regular`(默认) | 弥散 + 压暗 | 部分遮挡内容的 overlay |
| `thick` | 「dark, muted」暗而钝 | 部分遮挡内容、需深色配色的 overlay |

- 官方对比原则:「更厚的材质更不透明,对细笔画文本对比更好;更薄的材质更透,让用户保留背景上下文」。
- macOS 为另一套「用途指定」材质族(`NSVisualEffectView.Material`)+ 两种混合模式 `behindWindow`/`withinWindow`【官方·本次抓取,同页】。
- visionOS:窗口材质是不可修改的系统 `glass`,随环境亮度自适应;**visionOS 无独立深色模式开关**,玻璃自动适应【官方·本次抓取】。

### 1.3 Liquid Glass 两变体:regular / clear【官方·本次抓取】(同页 + SwiftUI Glass 文档)

| 变体 | 官方语义 | 官方使用条件 |
|---|---|---|
| `regular`(默认) | 模糊背景并调整其亮度以维持前景可读性;**滚动边缘效应(scroll edge effects)** 进一步模糊/降低下层内容不透明度;绝大多数系统组件使用 | 背景可能造成可读性问题、或组件文字较多(alert/sidebar/popover) |
| `clear` | 高度透明,永**不**自适应(「does not have adaptive behaviors」),让媒体背景保持醒目 | 仅媒体富内容之上;且需满足官方三条件:①元素浮于媒体富内容上 ②内容层不被压暗层负影响 ③其上内容粗而亮 |

- **压暗层数值(官方给了两处)**:HIG:「下层内容偏亮时,考虑添加 **35% 不透明度的深色压暗层**」【官方·本次抓取 materials.md §Liquid-Glass】;SwiftUI `Glass.clear` 文档示例:`.glassEffect(.clear).background(.black.opacity(0.3))`(**30% 黑**)【官方·本次抓取 https://developer.apple.com/documentation/swiftui/glass/clear.md 】。落站建议:压暗层取 30–35% 黑,媒体播放控件自带压暗时可省略。
- WWDC25 219:「clear 不具备 adaptive 行为,永久更透明;为保符号/标签可读需要压暗层;小footprint元素可用局部压暗(localized dimming)」【WWDC·本次抓取 https://developer.apple.com/videos/play/wwdc2025/219/ 】。
- **深浅色差异**:官方图注明确——regular「压在深背景上显得更深、压在浅背景上显得更浅」;HIG Liquid Glass color:小元素(工具栏/tab bar)系统可在明暗外观间自适应,其上符号/文字跟随单色方案(底亮则字暗、底暗则字亮);大元素(sidebar)玻璃**更不透明**以保可读【官方·本次抓取 color.md §Liquid-Glass-color、materials.md】。

### 1.4 实现细节:模糊半径 / 饱和度 / 叠色 tint / 内高光 / hairline

**a) 模糊半径量级**
- iOS 四档各自的模糊半径:官方从未公布数值 → ⚠️**未证实**(本次尝试社区逆向检索,DDG/搜索引擎均被反爬拦截,未能取到可核验来源)。
- 唯一权威量级锚点是 **Apple 自家网页生产 CSS**:全球导航 localnav 用 `backdrop-filter: saturate(180%) blur(20px)`,并以 `@supports(backdrop-filter: initial)` 做能力门控【官方 CSS·实抓 https://www.apple.com/ac/localnav/9/styles/ac-localnav.built.css 】。本站「参考 Apple」的 web 材质层即以 `blur(20px) + saturate(180%)` 为 1× 基准档。
- 两态滚动语法(Apple 官网实值):未滚过 hero 时 `blur(0px)`,滚过后 `blur(20px)`,过渡 `transition: opacity 320ms cubic-bezier(0.4, 0, 0.6, 1), backdrop-filter 320ms cubic-bezier(0.4, 0, 0.6, 1)`【官方 CSS·实抓,同文件】。

**b) 半透明底色(tint 层,与 blur 叠加)【官方 CSS·实抓】(同文件)**

| 状态 | 浅色 | 深色 |
|---|---|---|
| 常规玻璃(scrim) | `rgba(250, 250, 252, 0.8)` | `rgba(22, 22, 23, 0.8)` |
| 吸顶(sticking) | `rgba(250, 250, 252, 0.92)` | `rgba(22, 22, 23, 0.88)` |
| 菜单展开 | 实色 `rgb(250, 250, 252)` | 实色 `rgb(22, 22, 23)` |

即:**「玻璃 = 饱和度提升 + 模糊 + 同族中性色半透明底;吸顶时底色不透明度上浮 8–12 个百分点;展开成容器时转实色」**——这是可直接抄进站点的官方三态配方。

**c) 叠色 tint(彩色玻璃)**
- SwiftUI `Glass.tint(_:)`、UIKit `UIGlassEffect.tintColor`(iOS 26+)【官方·本次抓取 https://developer.apple.com/documentation/uikit/uiglasseffect.md 】。
- HIG Liquid Glass color:默认「无固有色,取其正后方内容的颜色」;上色应克制,**强调主操作时把 color 放背景(系统 prominent 按钮=accent 底)而非符号/文字**; colorful 背景上控件标签避免用相近色,优先单色外观【官方·本次抓取 color.md】。

**d) 内高光 / 顶缘受光 / lensing(定性,官方)**
- WWDC25 219 原句:Liquid Glass 定义自己的主要方式是 **Lensing**(透镜效应:「动态地实时弯折、整形并汇聚光线」,区别于旧材质的「散射」);「环境中的光源照在材质上」;与手指交互时「材质从指尖下方由内而外发光,辉光扩散至整个元素乃至邻近玻璃元素」;玻璃变大(morph 成菜单)时「投下更深、更浓的阴影,lensing 与折射更明显,光散射更柔」;sidebar 等大元素上「附近彩色内容的光会溢洒(spill)到表面,光还会反射、散射并渗入阴影」【WWDC·本次抓取 219 transcript [118–121s][671–731s][422–506s]】。
- **具体内高光强度/顶缘受光数值:官方未公布 → ⚠️未证实**。web 复刻惯例(本报告推导,非官方数值):`inset` 高光做顶缘受光(亮色 `rgba(255,255,255,.25~.4)`,暗色 `rgba(255,255,255,.08~.15)`),叠加 `0.5px` 同色 hairline;量级需按站内背景实测校准。

**e) hairline 细边框**
- 官方对 hairline 线宽/颜色无公开数值 → ⚠️**未证实**;官方可核验的近似物是 separator 色(§2.4):`rgba(60,60,67,0.29)`/`rgba(84,84,88,0.6)`——把它作为玻璃 hairline 的基色(再叠白色内高光)是符合系统语感的做法。

### 1.5 材质上的 vibrancy 层级【官方·本次抓取 materials.md §iOS】

- 标签 vibrancy:`label`(默认,最高对比)→ `secondaryLabel` → `tertiaryLabel` → `quaternaryLabel`;**quaternary 在 ultraThin/thin 上对比过低,官方建议避免使用**。
- 填充 vibrancy:`fill` → `secondaryFill` → `tertiaryFill`(所有材质可用);separator 仅一级、所有材质通用。

---

## 2. Apple 中性色阶:官方值与交叉核验

### 2.1 iOS/iPadOS systemGray 六阶【官方·本次抓取】(https://developer.apple.com/design/human-interface-guidelines/color.md §Specifications)

| 名称 | Light | Dark | 高对比 Light | 高对比 Dark |
|---|---|---|---|---|
| systemGray | #8E8E93 (142,142,147) | #8E8E93 (142,142,147) | (108,108,112) | (174,174,178) |
| systemGray2 | #AEAEB2 (174,174,178) | #636366 (99,99,102) | (142,142,147) | (124,124,128) |
| systemGray3 | #C7C7CC (199,199,204) | #48484A (72,72,74) | (174,174,178) | (84,84,86) |
| systemGray4 | #D1D1D6 (209,209,214) | #3A3A3C (58,58,60) | (188,188,192) | (68,68,70) |
| systemGray5 | #E5E5EA (229,229,234) | #2C2C2E (44,44,46) | (216,216,220) | (54,54,56) |
| systemGray6 | #F2F2F7 (242,242,247) | #1C1C1E (28,28,30) | (235,235,240) | (36,36,38) |

HIG 同时官方提醒:**「不要硬编码系统色值;数值仅供设计参考,实际值会随版本/环境波动」**——本站落地时应把这套值做成可整体切换的 token,而非散落硬编码。

### 2.2 背景三阶(system/grouped 两族)

| 名称 | Light | Dark | 核验方式 |
|---|---|---|---|
| systemBackground | #FFFFFF | #000000 | Light:官方文档原文「white primary background in a light environment」【官方·本次抓取 uicolor 文档】;Dark:社区双源(黑) |
| secondarySystemBackground | #F2F2F7 | #1C1C1E | 与 systemGray6 Light/Dark **完全同值**(HIG 灰阶表为官方主证)+ 社区页一致【社区·双源一致】 |
| tertiarySystemBackground | #FFFFFF | #2C2C2E | Light:社区页 #FFFFFF;Dark:#2C2C2E 与 systemGray5 Dark 同值(HIG 表)+ gist 一致 |
| systemGroupedBackground | #F2F2F7 | #000000 | 社区·双源一致(light #F2F2F7 = gray6 Light 同值) |
| secondarySystemGroupedBackground | #FFFFFF | #1C1C1E | 社区·双源一致 |
| tertiarySystemGroupedBackground | #F2F2F7 | #2C2C2E | 社区·双源一致 |

HIG 官方层级用法(§Platform considerations):Primary=整体视图,Secondary=整体视图内的分组,Secondary 内再分组用 Tertiary;grouped 族专用于 grouped table view。

### 2.3 标签与填充的透明度族【社区·双源一致】(swiftuicolors.com/ios-colors + gist.github.com/essejmclean/8f8447be319a194f98db67df6655baaf,本次抓取比对一致)

| 名称 | Light | Dark |
|---|---|---|
| label | rgba(0,0,0,1) | rgba(255,255,255,1) |
| secondaryLabel | rgba(60,60,67,0.6) | rgba(235,235,245,0.6) |
| tertiaryLabel | rgba(60,60,67,0.3) | rgba(235,235,245,0.3) |
| quaternaryLabel | rgba(60,60,67,0.18) | rgba(235,235,245,0.18) |
| systemFill | rgba(120,120,128,0.2) | rgba(120,120,128,0.36) |
| placeholderText | rgba(60,60,67,0.298)≈0.3 | rgba(235,235,245,0.3) |

### 2.4 separator 分隔线(任务要求重点;此处含一处对任务假设的勘误)

| 名称 | Light | Dark | 核验方式 |
|---|---|---|---|
| separator | **rgba(60,60,67,0.29)**(hex #3C3C434A) | **rgba(84,84,88,0.6)**(hex #54545899) | 【社区·双源一致】:swiftuicolors.com/ios-colors/separator 与 GitHub gist 两独立页面逐字一致 |
| opaqueSeparator | rgb(198,198,200) 不透明 | rgb(56,56,58) 不透明 | 【社区】gist 页 |

- **勘误说明**:任务设定假设 dark separator 基色为 rgba(235,235,245,α)——两源交叉后确认 **(235,235,245) 是深色模式标签族基色**(secondaryLabel 等),separator Dark 基色是 **(84,84,88)** @0.6。现行官方文档/JSON 已不再公布该数值(本次抓取 `uicolor/separator` 页面与 `ui-element-colors` JSON,均无数值表),故标【社区·双源一致】而非官方。
- 官方语义【官方·本次抓取 https://developer.apple.com/documentation/uikit/uicolor/separator.md ]:「允许底层内容透出的细边框/分隔线颜色」,自适应 trait 环境;opaqueSeparator「始终不透明、遮住底层内容」。

---

## 3. 焦点环(macOS / iOS / visionOS)

- **颜色(官方)**:macOS 焦点环颜色即 `NSColor.keyboardFocusIndicatorColor`——官方文档原句「The color to use for the keyboard focus ring around controls」【官方·本次抓取 https://developer.apple.com/documentation/appkit/nscolor/keyboardfocusindicatorcolor.md 】;数值未随文档公布(通常实现取 accent 色)→ ⚠️具体 RGBA 未证实。
- **绘制位置语义(官方)**:`NSFocusRingPlacement`(above=画在图像上 / below=画在文字下 / only)表明环围绕控件绘制、随控件形状【官方·本次抓取 https://developer.apple.com/documentation/appkit/nsfocusringplacement.md 】。原生环的像素宽度/偏移:官方未公布 → ⚠️**未证实**(本次检索被拦)。
- **Apple 自家 web 实现(一手可抄)【官方 CSS·实抓】**(applecss-ac-localnav.built.css / applecss-homepage.css / ac-globalfooter.built.css):
  - `:focus-visible { outline: 2px solid var(--sk-focus-color, #0071e3); outline-offset: 1px }`(行内链接)
  - 容器级元素 `outline-offset: 3px`(homepage:`--sk-focus-offset-container, 3px`)
  - 小型箭头控件用**负偏移扩 padding** 贴合:`outline-offset: -11px; margin-top: -7px; padding-top: 7px`
  - 文本链路长链接用 `::before` 伪元素把环扩到整行高(`inset: var(--sk-link-target-height) 0`)
  - 焦点色 token 化:亮/暗主题各设 `--sk-focus-color`(默认 #0071e3,即 Apple 蓝)
  - 即 Apple web 焦点环规格 = **2px 宽 + offset 1px(容器 3px)+ accent 蓝 + 圆角跟随元素**(`outline` 在现代浏览器跟随 border-radius)。
- **iOS**:触屏无 hover,焦点概念落在键盘/外设焦点导航(`focusable`/`.focusEffect`);visionOS:注视即焦点,系统 hover 高亮效果(focus effect)应用于所有可交互元素【WWDC·本次抓取 https://developer.apple.com/videos/play/wwdc2025/303/ transcript [90–104s] 】。

---

## 4. 按压反馈(highlighted 态、按压-释放成对语义)

- **语义(官方)**:`UIControl.isHighlighted`——「指示控件是否绘制高亮;**控件自动随合适的 touch 事件设置与清除该状态**」→ 即按下进入、移出/释放退出,天然成对【官方·本次抓取 https://developer.apple.com/documentation/uikit/uicontrol/ishighlighted.md 】。`UIControl.State.highlighted` 是四态(normal/highlighted/selected/disabled)之一,高亮可与 selected 叠加。
- **数值**:iOS 原生按钮 highlighted 的 alpha/scale 变化量官方未公布 → ⚠️**未证实**(社区常引用 scale≈0.96–0.97,本次未能取到可核验来源,不采信为规范值)。
- **iOS 26 Liquid Glass 交互态(官方定性)**:自定义玻璃控件加 `.interactive`(SwiftUI)/ `UIGlassEffect.isInteractive`(UIKit)后,「玻璃响应用户交互:**缩放、回弹(bouncing)、闪光(shimmering)**,与工具栏按钮/滑杆一致」【WWDC·本次抓取 https://developer.apple.com/videos/play/wwdc2025/323/ transcript [1168–1178s] 】;HIG Motion:「Liquid Glass 的运动响应直接触碰时更强,触控板交互时更收敛」【官方·本次抓取 motion.md】。
- **Apple web 按压态(一手可抄)【官方 CSS·实抓】**:`:active { background: var(--sk-button-background-active); color: var(--sk-button-color-active); outline:none }`——按压 = **只换底色/字色,不加 outline**,这是 Apple 官网按钮的高亮实现。
- **按压-释放成对语义的官方表述**:HIG Motion「反馈动效要简短精确」「让人能取消动效(不要让人等动画播完)」【官方·本次抓取 motion.md】;WWDC18 803(Designing Fluid Interfaces):所有交互对象「必须即时响应」,系统需「支持不断的重定向与打断」【WWDC·本次抓取 https://developer.apple.com/videos/play/wwdc2018/803/ transcript [361–424s] 】。
- visionOS 的 hover「ramp 动画」给出官方曲线思路:「先慢 ease-in,再快速 spring 弹到位;在『即时』与『延迟』间取平衡——给即时反馈而不干扰」【WWDC·本次抓取 303 transcript [331–350s] 】——适合做按压-保持-释放的三段反馈。

---

## 5. 弹簧参数实例(SwiftUI/UIKit)

### 5.1 官方默认值

| API | 默认参数 | 核验方式 |
|---|---|---|
| `.spring(response:dampingFraction:blendDuration:)` | `response=0.5, dampingFraction=0.825, blendDuration=0`(签名内含默认值) | 【官方·本次抓取】https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:).md |
| `.spring(duration:bounce:blendDuration:)`(iOS17 新参数系) | `duration=0.5, bounce=0` | 【官方·前次引用】research/02 A12;`Spring` 结构文档示例 `Spring(duration:0.5,bounce:0.3) ↔ (mass 1.0, stiffness 157.9, damping 17.6)`【官方·本次抓取 spring.md Overview 源码注释】 |
| bare `withAnimation`(iOS17+) | 默认即 **smooth spring**(无回弹) | 【WWDC·本次抓取】10156 transcript [894–898s]「we made a smooth spring the new default when you use a bare withAnimation in iOS 17」 |

### 5.2 预设族 bouncy / snappy / smooth

| 预设 | 数值(社区通传,与官方证据互洽) | 核验方式 |
|---|---|---|
| `.smooth` | duration 0.5 / bounce 0 | 官方符号页语义「no bounce」【官方·本次抓取 spring-smooth.md】;10156:「smooth = no bounce」[852s] |
| `.snappy` | duration 0.5 / bounce 0.15 | 官方语义「small amount of bounce」【官方·本次抓取 spring-snappy.md】;10158 指导值:「小回弹 ~15%」[1263s] |
| `.bouncy` | duration 0.5 / bounce 0.3 | 官方语义「higher amount of bounce」【官方·本次抓取 spring-bouncy.md】;10158:「更大回弹如 30%」[1271s];官方 Spring 文档示例恰用 `Spring(duration: 0.5, bounce: 0.3)` |
| bounce 取值域 | **-1.0 … 1.0**(0=临界阻尼,负=过阻尼) | 【WWDC·本次抓取】10158 [1122s];10156:「bouncy springs have bounce values up to 100%」[664s] |

- 预设可通过 `.bouncy(duration:extraBounce:)` 调节;10158:「不确定就用 bounce 0(不指定 bounce 时的默认),最大用途通用」;「>0.4 会过于夸张,谨慎」;「bounce 适合手势结尾的物理感」[1290–1315s]。
- **关键官方差异:duration 是「感知时长」而非 settle 时长**——「settle duration 不可预测,duration 参数被刻意选为可预测;不要等 settle 完才做 UI 变化,用 completion」[1003–1039s]。 SwiftUI `Spring.settlingDuration` 可计算【官方·本次抓取 spring.md Topics】。

### 5.3 场景档位(依据上述官方证据的落地建议)

| 场景 | 推荐档 |
|---|---|
| 卡片/面板位移、抽屉 | `snappy`(0.5/0.15)——有轻微活性但不夸张 |
| 控件按压回弹、手势结尾、表情化反馈 | `bouncy`(0.5/0.3) |
| 淡入淡出、透明度、颜色、大面积层 | `smooth`(0.5/0)或默认 `withAnimation` |
| 无穷刚度拖拽跟随 | `response≈0`(官方:「0 请求无穷刚度,适合驱动交互动画」——spring init 文档参数说明) |
| 需要与手势速度接力 | 弹簧 + `initialVelocity`(SwiftUI Spring API 有 `value(target:initialVelocity:time:)`/`velocity(...)`【官方·本次抓取 spring.md】;UIKit 用 `UISpringTimingParameters` 质量弹簧,官方换算见 5.1) |

---

## 6. 浮层入场:UIKit sheet / popover 呈现

- **detents 体系(官方)**:`UISheetPresentationController.detents = [.medium(), .large()]`,配合 `largestUndimmedDetentIdentifier`、`prefersScrollingExpandsWhenScrolledToEdge`、`prefersEdgeAttachedInCompactHeight` 等;官方示例代码即此配置【官方·本次抓取 https://developer.apple.com/documentation/uikit/uisheetpresentationcontroller.md 】。
- **iOS 26 新行为(WWDC25 284/323,官方 transcript)【WWDC·本次抓取】**:
  - 部分高度 sheet **默认内缩 + Liquid Glass 背景**;小高度时「底边内收,嵌进屏幕圆边」;转全高时「玻璃背景渐变转实、锚定屏幕边缘」[323, 386–408s]。官方迁移建议:**移除自定义 sheet 背景(含 presentationBackground),让材质显形**[413–419s]。
  - **Sheet 可从按钮 morph 出场**:把呈现按钮设为 navigation zoom transition 的 source、sheet 内容为 destination(`preferredTransition = .zoom` + sourceItem)[425–455s + 284 [845–886s]]。
  - 菜单自动获得 morph;**popover 源是 barButtonItem 时获得新动画**;alertController 设 `sourceItem` 后 action sheet 在 iPad/iPhone 一致锚定到源视图[284, 819–903s]。
- **默认 duration / damping 曲线数值:官方未公布 → ⚠️未证实**(本次多引擎检索均被反爬,未获得可核验实测来源;不填数)。可核验的 web 对位参考:apple.com 全站浮层/帘幕过渡用 `320ms cubic-bezier(0.4, 0, 0.6, 1)`(ease-in-out 族),折叠菜单展开用 `max-height 320ms cubic-bezier(0.4,0,0.6,1)`【官方 CSS·实抓】。
- **手势接力细节(官方)**:iOS 26 引入全局内容回滑手势后,自定义手势要对 `interactiveContentPopGestureRecognizer` 设 `require(toFail:)` 才能拿到优先级【WWDC·本次抓取 284 transcript [795–807s] 】。

---

## 7. 滚动行为:overscroll / snap / 惯性

### 7.1 `overscroll-behavior`【MDN·本次抓取】(https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior/index.json)

- 语义:控制「滚动到滚动容器边缘时发生什么」。**scroll chaining(链式滚动)** 定义:「对话框滚到底后,底层页面开始滚动」。
- 取值(2025 标准,含新增 `chain`):`auto`(默认,滚界后继续滚动链)/ `contain`(阻止滚动链出容器,保留 bounce)/ `chain`(允许链出但禁 bounce)/ `none`(两者都禁);形式语法 `[ contain | none | auto | chain ]{1,2}`(x/y 双轴)。
- 落站要点(MDN 原文):`overflow:hidden` 的容器**永远被视为已在滚动边界**,给它设 contain/none 即可阻止背景滚动——「打开 dialog/overlay 时阻止背景滚动」的标准做法;iframe 不是滚动容器,要控制 iframe 的链式滚动需在其 html/body 上设。
- MDN 官方示例里 `::backdrop { backdrop-filter: blur(0.5rem) }`——浮层背后毛玻璃的标准搭配。

### 7.2 `scroll-snap`【MDN·本次抓取】(https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/index.json)

- 「定义 snap 位置,用户滚动溢出内容时内容吸附到位,提供分页与滚动定位」;`scroll-snap-type: both mandatory` 等组合控制吸附严格度(mandatory=必须吸附,proximity=靠近才吸)。

### 7.3 `-webkit-overflow-scrolling` 与惯性滚动【官方·本次抓取】(https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes.md)

- Safari 13 Release Notes 官方原文:「Added support for **one-finger accelerated scrolling** to all frames and `overflow:scroll` elements **eliminating the need to `set-webkit-overflow-scrolling: touch`**」+「**Disabled `-webkit-overflow-scrolling: touch` on iPad**. All frames and scrollable overflow areas now use accelerated one-finger scrolling without changing stacking」。
- 结论:**该属性已彻底退役**(MDN 页面亦已下线,本次抓取 404);现代 iOS Safari 所有滚动域默认惯性加速滚动,站点不应再写此属性。触控惯性(动量衰减)在 UIKit 侧由 `UIScrollView.decelerationRate(normal/fast)` 控制【官方·本次抓取 https://developer.apple.com/documentation/uikit/uiscrollview/decelerationrate-swift.struct.md 】(rawValue 数值官方未列 → 0.998/0.99 ⚠️未证实)。

---

## 8. 液态玻璃动效:morph / refraction / 交互态(官方定性全录)

以下均为【WWDC·本次抓取】(219 = Meet Liquid Glass;323 = Build a SwiftUI app with the new design;284 = Build a UIKit app with the new design;356 = Get to know the new design system),引号内为 transcript 原句摘要:

1. **Lensing 折射**:主要视觉定义方式;「旧材质散射光,新材料实时弯折、整形、汇聚光」[219, 118–159s]。
2. **凝胶柔性**:「固有的 gel-like flexibility,随交互同步移动」;控件「可临时升入 Liquid Glass——静止态视觉安静,触碰时活过来」[219, 231–265s]。
3. **Morph(形态互变)**:「状态切换时, Liquid Glass 在各上下文的控件间动态 morph,维持单一浮动平面」;「弹菜单时气泡(bubble)直接 pop 开露出内容,轻量就地过渡,保持点击位置与内容的直接关系」[219, 283–320s];实现:SwiftUI `GlassEffectContainer`(spacing 越大越早融合)+ `glassEffectID(_:in:)` + `Namespace`【官方·本次抓取 glasseffect.md/glasseffectid.md/glasscontainer.md】;UIKit:动画块里 `UIVisualEffectView.effect = UIGlassEffect(...)` 触发「materialize 动画」,默认 Capsule 形状,`cornerConfiguration` 自定义【WWDC·本次抓取 284 [1229–1251s]】。
4. **体积→材质反应(refraction 动态)**:「玻璃 flex/morph 成大元素时,材质特性变化模拟更厚实材料:更深阴影、更明显的 lensing 与折射、更柔的光散射」[219, 422–445s]——**玻璃的折射强度是尺寸的函数**,web 复刻时应在放大态加大边缘畸变/阴影。
5. **同心圆角(concentricity)**:「形状如何嵌合的安静几何,由 concentricity 驱动;胶囊几何天然支持同心」;嵌套时用 `containerConcentric` 让形状自动匹配容器,窗口边缘留 extra margin[356, 201–370s;219, 473–478s]。
6. **共享采样域(物理正确性)**:「玻璃材质反射折射光、从附近内容取色,通过**采样比自己大的区域**实现;但**玻璃不能采样玻璃**——不同容器的相邻玻璃会表现不一致,玻璃容器让元素共享采样域」[323, 1200–1229s]——多个玻璃元素必须包进同一 container。
7. **滚动边缘效应(scroll edge effects)**:内容滚入玻璃下方时「逐渐把内容溶解进背景,把玻璃视觉抬升」;深色内容触发玻璃转暗样式时,「改为施加 subtle dimming」;固定附件列头等场景用「hard style:均匀施加于工具栏整个高度」[219, 532–599s]。
8. **触碰辉光**:「从指尖下方点亮,扩散到整个元素乃至附近玻璃」[219, 725–737s];`.interactive` 修饰符给出缩放/回弹/闪光[323, 1168–1178s]。
9. **失焦退让**:「Mac/iPad 窗口失焦时, Liquid Glass 改变外观并视觉后退,把注意力让给内容」[219, 757–761s];「sheet 上拖时玻璃轻微后退(recedes),配压暗层表达模态」[356, 438–494s]。
10. **变体不可混用**:「regular 与 clear 永远不应混用,各有特性与场景」[219, 835–837s]。

**web 复刻近似配方(推导项,官方无对应 CSS;标注:实现思路,数值自定并实测)**:
- 基底:`backdrop-filter: blur(20px) saturate(180%)` + §1.4b 三态底色【官方 CSS·实抓】;
- 边缘折射:SVG `feDisplacementMap` 对边缘做环形位移(社区通行做法;本次未能访问到可核验的社区原文 → ⚠️来源未核验,思路参考 WWDC「lensing=边缘弯折光线」的官方描述);
- morph:用 FLIP/`view-transition-name` 共享元素过渡模拟「单一浮动平面」;相邻玻璃入同一 `view-transition` 组以近似「共享采样域」;
- 触碰辉光:`radial-gradient` 指点位置 mask 扩散 + 邻近元素联动(监听 pointerenter 广播)。

---

## 9. 丝滑工艺:可中断动画 / 合成层 / will-change / linear() / 手势接力

### 9.1 可中断动画与 velocity matching(velocity-preserving)

- **UIKit(官方)**:`UIViewPropertyAnimator`——「运行中可动态修改动画」:pause/resume/stop、`fractionComplete` 手动刷进度、`isReversed` 反向、暂停后 `continueAnimation(withTimingParameters:durationFactor:)` 换时序续跑、`isInterruptible` 标记可打断【官方·本次抓取 https://developer.apple.com/documentation/uikit/uiviewpropertyanimator.md 】。
- **SwiftUI(官方)**:spring 动画「在同属性上与其它 spring/interactiveSpring 混用时,**后继动画替换前者并保留速度**(preserving velocity from one animation to the next)」【官方·本次抓取 spring init 文档正文】;WWDC23:「velocity preservation 让打断平滑自然」[10158, 910–918s];「强烈推荐 spring:给 UI 有机感——**保速度、自然到停**」[10156, 880–885s]。
- **原则(官方)**:WWDC18 803 三原则——即时响应;「支持不断的重定向与打断」;手势与动画不分家(「one gesture that does all」)[216→803, 361–546s]。HIG Motion:「尽可能让人取消动效,不要让人等动画播完」【官方·本次抓取 motion.md】。

### 9.2 合成层与 will-change

- **只动 transform/opacity**:「动画用除 transform/opacity 以外的任何属性前,先评估其对渲染管线的影响;避免触发 layout/paint 的属性」(High Performance Animations,html5rocks/web.dev 版,本次全文抓取)【社区权威文章·本次抓取 https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/ 】。
- **will-change(官方 MDN·本次抓取)**:渲染优化提示,声明「预期将要变化的属性」(如 `will-change: transform, opacity`);官方最佳实践:**用时加、结束移除**——示例代码在 mouseenter 时设 `will-change: transform, opacity`,在 `animationend` 时回 `auto`(避免常驻提示造成的内存/分层开销)。https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
- **亚像素**:GPU 合成下 transform 有亚像素舍入问题属社区常识;本次未抓到权威页面原文 → ⚠️未证实(实操对策仍成立:位移用 `transform: translate3d` 而非 top/left,避免 0.5px 以下除法)。

### 9.3 `linear()` 采样:web 上精确复刻 Apple 弹簧

- 【MDN·本次抓取】https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear :「`linear()` 在给定点间匀速推进」,支持百分比停靠点 `linear(0, 0.5 25% 75%, 1)`;`cubic-bezier` 无法表达回弹,**spring 曲线需逐帧采样成 `linear(0, s1 2%, s2 4%, …, 1)`**;MDN「See also」即 Jake Archibald 的 `linear()` easing generator(https://linear-easing-generator.netlify.app/,本次从 MDN JSON 提取)。
- **采样数据可以从官方模型出**:SwiftUI `Spring` 提供公开求值 API——`value(target:initialVelocity:time:)`/`position(target:time:)`【官方·本次抓取 spring.md Topics】;离线用官方换算(duration/bounce ↔ mass/stiffness/damping,官方文档示例常量 157.9/17.6)逐时间步求值,导出 60–120 个采样点写进 `linear()`——这是「把 Apple 弹簧原样搬进 CSS」的可验证路径。
- web 侧等价实现也可直接用 Apple 官网 token:过渡 `320ms cubic-bezier(0.4, 0, 0.6, 1)`(帘幕/模糊/底色)、`240ms` 延迟错峰、导航项 `240ms cubic-bezier(0.28, 0.11, 0.32, 1)`【官方 CSS·实抓 localnav 文件,beziers 全录】。

### 9.4 手势接力(gesture handoff)

- 官方机制集:`UIScrollView.decelerationRate`(手指离开后的衰减档位)【官方·本次抓取 struct 页】;sheet detent 拖拽逐级吸附(`detents` + `selectedDetentIdentifier`)【官方·本次抓取 sheet.md】;弹簧以 `initialVelocity` 接力手指速度(§5.3);iOS 26 自定义手势对 `interactiveContentPopGestureRecognizer` 设 failure requirement(§6);visionOS ramp 动画在「注视拖尾」上接力(§4)。web 对位:pointerup 时把 `pointer` 速度交给 spring/`linear()` 动画(velocity 进 `Spring.value(target:initialVelocity:…)`),即 Apple「velocity matching」的直译。

---

## 10. 8 条微交互条目(可直接落站)

> 每条:触发 → 参数(全部来自 §1–§9 已核验数值)→ 出处。iOS 侧数值与 web 复刻值一一对应。

**M1 · 玻璃控件按压(interactive glass)**
触发:按下;过程:玻璃 `scale + bounce + shimmer`(iOS 26 `.interactive`/`isInteractive`),释放成对退出;web:`:active` 换底色(Apple 官网做法)+ `transform: scale(0.96)`(⚠️0.96 为社区常识,未证实)→ 出厂默认建议只做底色/内高光变化 + 轻回弹 `spring(0.5/0.3)`。
出处:WWDC25 323 [1168–1178s];UIControl.isHighlighted 文档;apple.com `:active` 规则。

**M2 · 滚动浮现玻璃顶栏(scroll edge effect)**
触发:滚过阈值;参数:`blur(0px→20px) saturate(180%)`,底色亮 `rgba(250,250,252,.8)→(.92)` / 暗 `rgba(22,22,23,.8)→(.88)`,过渡 `320ms cubic-bezier(0.4,0,0.6,1)`;深色内容下改用 subtle dimming 而非加深模糊。
出处:apple.com ac-localnav.built.css(逐字实抓);WWDC25 219 [532–599s]。

**M3 · 卡片/浮层入场弹簧**
参数:`snappy`(0.5s/bounce 0.15);带手势时以出手速度为 `initialVelocity`;settle 不等待,completion 用感知时长。
出处:WWDC23 10158 [1263s]/10156 [894s];Animation.spring 文档(默认 0.5/0.825)。

**M4 · 焦点环(accent ring)**
参数:`outline: 2px solid var(--focus, #0071e3); outline-offset: 1px`(容器 3px;小型控件负偏移贴合;圆角随元素)。
出处:apple.com 三份生产 CSS 的 `:focus-visible` 规则逐字实抓;NSColor.keyboardFocusIndicatorColor 文档。

**M5 · 弹层从源按钮 morph(zoom presentation)**
触发:点按钮;过程:按钮形状连续变到浮层(单一浮动平面),菜单/气泡 `pop open` 就地展开;web:`view-transition-name` 共享元素 + Capsule↔目标圆角插值。
出处:WWDC25 284 [819–845s]/323 [425–463s];glassEffectID 文档。

**M6 · 列表分隔线与按压高亮色**
参数:分隔线 `rgba(60,60,67,0.29)`(暗 `rgba(84,84,88,0.6)`);行按压高亮用同族 `rgba(120,120,128,0.2)`(fill 档);quaternary 不要放在薄玻璃上。
出处:双源社区色值(§2.3/2.4);HIG materials.md vibrancy 规则。

**M7 · 弹层滚动隔离(overscroll)**
参数:浮层滚动容器 `overscroll-behavior: contain`;遮罩下页面禁滚:`::backdrop { backdrop-filter: blur(0.5rem) }`;不可滚容器显式设 contain 以阻断链式滚动。
出处:MDN overscroll-behavior 全文(本次抓取,含官方 dialog 示例)。

**M8 · 开关/选择确认回弹(toggle settle)**
参数:`bouncy`(0.5s/bounce 0.3)用于手势结尾的物理感;同族操作保持单一 bounce 值(一致性);>0.4 禁用;thumb 用玻璃材质自动获得缩放回弹。
出处:WWDC23 10158 [1271–1315s];WWDC25 284 [1063–1067s](switch/segmented thumb 自动玻璃交互外观)。

---

## 11. 签名巧思(crafts,10 条)

1. **玻璃是层不是色**:Liquid Glass 永远只给「控件与导航」的功能层,内容层退回四档标准材质——层次感来自层级约定而非颜色。
2. **三态玻璃**:静置 0.8 底 → 吸顶上浮到 0.92/0.88 → 展开转实色,一条官方三态公式走完玻璃的一切状态。
3. **折射随体积长**:玻璃 morph 变大时阴影更深、lensing 更强、散射更柔——放大态加畸变,缩小态减畸变。
4. **滚到边缘,内容先溶**:滚动边缘效应让内容「溶解」而非被遮挡;深色内容改走 subtle dimming,这是玻璃与滚动协同的暗语。
5. **共享采样域**:相邻玻璃必须共享一个容器采样——「玻璃不能采样玻璃」,多玻璃并排时物理正确性来自合并渲染。
6. **压暗 35% 是 clear 的门票**:clear 玻璃上任何可读文字背后都要 30–35% 黑压暗层——高透明不是免可读性税。
7. **springs 不需要弹**:不确定就用 bounce 0;bounce>0.4 过度;bounce 是给「手势结尾」的物理感,不是给每个过渡的调味料。
8. **duration 是感知时长**:不要等弹簧 settle 完才切 UI——用 completion;settle 时长不可预测,感知时长才是契约。
9. **打断即设计**:每个动画都必须可被中途接管(pause + fractionComplete + 保留速度续跑)——「后继动画替换前者并保留速度」写进弹簧本身。
10. **焦点环抄作业**:2px accent outline + 1px(容器 3px)offset + 圆角跟随 + 小控件负偏移——Apple 官网 CSS 逐字可抄,无需猜测色值。

---

## 12. 来源清单(URL 与核验方式)

**官方文档(本次 curl 全文抓取)**
1. HIG Materials(含 Liquid Glass/四档/vibrancy)—— https://developer.apple.com/design/human-interface-guidelines/materials.md ✅全文
2. HIG Color(灰阶官方表/Liquid Glass color)—— https://developer.apple.com/design/human-interface-guidelines/color.md ✅全文
3. HIG Motion —— https://developer.apple.com/design/human-interface-guidelines/motion.md ✅全文
4. Liquid Glass 技术概览 —— https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md ✅全文
5. SwiftUI `glassEffect(_:in:)` / `GlassEffectContainer` / `glassEffectID` / `Glass.regular/.clear` / `Spring` / `Animation.spring(response:dampingFraction:)` —— developer.apple.com/documentation/swiftui/… .md ✅全文(路径见 §1.4c/§5)
6. UIKit `UIGlassEffect`(+Style/isInteractive/tintColor)、`UISheetPresentationController`、`UIViewPropertyAnimator`、`UIControl.isHighlighted`、`UIColor` 语义色页、`UIScrollView.DecelerationRate` —— developer.apple.com/documentation/uikit/… .md ✅全文
7. AppKit `NSColor.keyboardFocusIndicatorColor`、`NSFocusRingPlacement` —— developer.apple.com/documentation/appkit/… .md ✅全文
8. Safari 13 Release Notes(-webkit-overflow-scrolling 退役)—— https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes.md ✅全文

**WWDC 官方 transcript(本次带时间戳提取)**
9. Meet Liquid Glass(WWDC25 219)—— https://developer.apple.com/videos/play/wwdc2025/219/
10. Get to know the new design system(WWDC25 356)—— https://developer.apple.com/videos/play/wwdc2025/356/
11. Build a SwiftUI app with the new design(WWDC25 323)—— https://developer.apple.com/videos/play/wwdc2025/323/
12. Build a UIKit app with the new design(WWDC25 284)—— https://developer.apple.com/videos/play/wwdc2025/284/
13. Animate with springs(WWDC23 10158)—— https://developer.apple.com/videos/play/wwdc2023/10158/
14. Explore SwiftUI animation(WWDC23 10156)—— https://developer.apple.com/videos/play/wwdc2023/10156/
15. Designing Fluid Interfaces(WWDC18 803;本次抓取其索引页确认场次编号为 803)—— https://developer.apple.com/videos/play/wwdc2018/803/
16. Design hover interactions for visionOS(WWDC25 303)—— https://developer.apple.com/videos/play/wwdc2025/303/

**官方生产 CSS(本次 grep 实抓)**
17. apple.com `ac-localnav.built.css`(blur/saturate/底色三态/focus-visible/transition tokens)—— https://www.apple.com/ac/localnav/9/styles/ac-localnav.built.css
18. apple.com `homepage.built.css` / `ac-globalfooter.built.css`(focus/active 规则)—— https://www.apple.com/v/homepage/a/styles/homepage.built.css 等

**MDN(本次官方 JSON 端点抓取)**
19. overscroll-behavior —— https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
20. CSS scroll snap —— https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap
21. will-change —— https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
22. linear() —— https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear(附:linear() easing generator https://linear-easing-generator.netlify.app/ )

**社区交叉(本次抓取两独立源比对)**
23. iOS 系统色全表(light+dark,separator/background/label/fill)—— https://swiftuicolors.com/ios-colors 、https://swiftuicolors.com/ios-colors/separator
24. iOS UIColor 动态色 gist —— https://gist.github.com/essejmclean/8f8447be319a194f98db67df6655baaf
25. High Performance Animations —— https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/

**未证实清单(如实)**
- iOS 四档标准材质各自的模糊半径具体数值(官方从未公布;检索通道本次受限)。
- iOS 系统 sheet 呈现的默认 duration/damping 数值、sheet 顶部圆角 pt 值。
- macOS/iOS 原生焦点环的像素宽度/偏移官方值(本报告采用 apple.com web 焦点环一手规格替代)。
- UIButton/UIControl highlighted 的 alpha/scale 具体变化值。
- Liquid Glass 社区 CSS 逆向文章(SVG 位移方案)原文(本次未能访问,思路仅作参考)。
- `UIScrollView.decelerationRate` 的 rawValue(0.998/0.99)。

*附:任务给定的「02 §1」对应 `out/research/02-official-design-specs.md` §1(A1–A13);本报告与其 A1–A13 全部条目复核一致,并补齐其缺失的实现细节(separator Dark 基色勘误、Apple web 三态玻璃底色、焦点环 web 规格、iOS 26 morph/scroll edge/transcript 级证据)。*
