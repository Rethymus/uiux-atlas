# 现代前端视觉风格流派全谱与近年设计趋势调研报告

> 调研日期：2026-11-20 ｜ 调研方式：全程联网检索，逐条附来源 URL
> 检索工具说明：内置 WebSearch 与 web_reader 周配额已耗尽（重置 2026-12-03），本次改用「直接抓取一手页面（fox_fetch / WebFetch）+ DuckDuckGo Lite 检索」交叉印证。标注「(摘要)」的条目仅来自搜索结果摘要、未抓取全文；无法核实的信息标注「未证实」。

---

## 一、主流风格流派逐个调研（16 个主条目 + 4 个关联条目）

### 1. Glassmorphism（毛玻璃）
- **定义与起源**：以「磨砂玻璃面板」为核心的 UI 风格：半透明底、背景模糊、细亮边框、柔和投影。术语由 Hype4/SquarePlanet 创始人 Michał Malewicz 创造并命名——其命名文章发表于 2020 年 11 月，随后 #glassmorphism 标签与大量练习作品爆发（来源：https://glassmorphism.com/ ，该站自称「the original generator… Made by the person who created the glassmorphism name」并给出命名文章时间）。前史：2013 iOS 7 半透明标签栏初现端倪，2020 macOS Big Sur 半透明侧栏成为「标准参照」（来源：https://design-styles.enlighten-media.net/pages/glassmorphism/ ）。另见 Web 框架源头：Windows Vista/7 Aero、Fluent「Acrylic」（来源：https://en.wikipedia.org/wiki/Flat_design ；https://en.wikipedia.org/wiki/Liquid_Glass ）。
- **视觉特征**：backdrop 模糊产生「厚度感」；低透明度填充让背后内容透出；1px 半透明描边承接环境光；必须叠加在丰富（渐变/照片）背景上，平色背景上失效；多层玻璃叠加易「发浑」（来源：https://design-styles.enlighten-media.net/pages/glassmorphism/ ；https://superdesign.dev/styles/glassmorphism ）。
- **可参数化变量**：`backdrop-filter: blur(Npx) saturate(M%)`（生产实测甜点：Apple 全局导航 blur(20px)+saturate(180%)、Framer 10px、Reflect 4–22px、Resend 25px）；填充透明度（白色 10–15% alpha 读作 frost）；1px 边框透明度；圆角半径（16–20px）；柔和投影 `0 8px 32px rgba(0,0,0,0.25)`；深色变体 `rgba(17,25,40,0.55)`。官方生成器玻璃卡样例：`rgba(255,255,255,0.15)` 底 + `blur(20px)` + 圆角 20px + `1px rgba(255,255,255,0.3)` 边框（来源：https://superdesign.dev/styles/glassmorphism ；https://glassmorphism.com/ ）。
- **代表案例/教程**：Apple 全局导航、Framer 导航、Reflect（30+ 条 backdrop-filter 规则）、Resend、Clerk（约 25 条微模糊规则）（均经生产 CSS 核验，来源：https://superdesign.dev/styles/glassmorphism ）；Perplexity「Personal Computer」（来源：https://design-styles.enlighten-media.net/pages/glassmorphism/ ）。
- **生态/兼容**：Chrome/Edge 76+（2019）、Firefox 103+（2022）、Safari 9+ 带 -webkit- 前缀，2024 年 9 月 Safari 18 起无前缀（来源：https://superdesign.dev/styles/glassmorphism ）。
- **来源**：https://glassmorphism.com/ ；https://superdesign.dev/styles/glassmorphism ；https://design-styles.enlighten-media.net/pages/glassmorphism/ ；https://en.wikipedia.org/wiki/Liquid_Glass

### 2. Liquid Glass（液态玻璃，Apple 2025）
- **定义与起源**：Apple 的统一设计语言，2025-06-09 WWDC 发布，随 iOS 26 / iPadOS 26 / macOS Tahoe 26 / watchOS 26 / tvOS 26（及 visionOS 26）落地，是 iOS 7 以来首次重大重设计；灵感源自 visionOS 的深度与维度、macOS Aqua、iOS 7 实时高斯模糊、Dynamic Island（来源：https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ ；https://en.wikipedia.org/wiki/Liquid_Glass ）。
- **视觉特征**：「将玻璃的光学性质与流动性结合」——半透明材质反射/折射周围内容，实时渲染并随移动产生镜面高光（specular highlights）；控件成为悬浮于内容之上的独立功能层，随上下文形变（如滚动时标签栏收缩）；图标采用多层玻璃+高光+渐变，可切换浅色/深色/着色/全透明外观；控件圆角与硬件圆角同心（concentric）（来源：Apple 新闻稿，同上 URL）。
- **可参数化变量**（Web 端实现变量）：CSS `backdrop-filter` 近似模糊；SVG 位移滤镜（feTurbulence + feDisplacementMap）做折射；WebGL/WebGPU 着色器做边缘透镜/色差/镜面高光；透明度/着色强度（iOS 27 引入系统级「clear ↔ tinted」滑杆）（来源：https://en.wikipedia.org/wiki/Liquid_Glass ；https://developer.apple.com/documentation/technologyoverviews/liquid-glass ）。
- **代表案例/生态**：liquid-glass-react（发布于 WWDC 次日 2025-06-10，npm 下载量最高的 Liquid Glass 包）、liquid-glass-js（WebGL）、@samasante/liquid-glass（SVG 位移折射实时 DOM）、liquidGL（NaughtyDuk，WebGPU+降级）、@dpawlikowski/liquid-glass（纯 CSS/SVG）（来源：https://en.wikipedia.org/wiki/Liquid_Glass ）。
- **争议与修正**：评价两极到负面——可读性下降、控件遮挡内容、点击目标变小、惯例被打破（NN/g《Liquid Glass Is Cracked, and Usability Suffers in iOS 26》，Raluca Budiu，2025-10-10，来源：https://www.nngroup.com/articles/liquid-glass/ ）；Apple 在 beta 中提高导航栏不透明度；WWDC 2026 为 iOS 27/macOS 27 Golden Gate 推出修订版（默认降低透明度、新增用户滑杆）（来源：https://en.wikipedia.org/wiki/Liquid_Glass ）。
- **来源**：https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ ；https://developer.apple.com/documentation/technologyoverviews/liquid-glass ；https://en.wikipedia.org/wiki/Liquid_Glass ；https://www.nngroup.com/articles/liquid-glass/

### 3. Neumorphism（新拟物 / Soft UI）
- **定义与起源**：元素「从背景中挤出/压入」的软塑料质感；术语为 neo + skeuomorphism 的合成词，2019 年由 Jason Kelly 创造；Alexander Plyuto 在 Dribbble 发布的银行 App 拟物稿引爆传播；更早雏形见于 2019 年 8 月华为鸿蒙智慧屏（Honor Vision）界面（来源：https://en.wikipedia.org/wiki/Neumorphism ）。2020 年 11 月 macOS Big Sur 图标与半透明设计被认为明显带新拟物特征（同上）。2020 年达峰，因可访问性问题到 2021 年迅速退潮（同上）。
- **视觉特征**：元素底色与页面背景完全同色；仅靠双阴影（一侧暗、对侧亮）塑形；低对比、粉彩、极简；凸起（raised）与压入（inset）两态（来源：https://en.wikipedia.org/wiki/Neumorphism ；https://superdesign.dev/styles/neumorphism ）。
- **可参数化变量**：基准色 `#e0e5ec`（经典值）；凸起 `box-shadow: 9px 9px 18px #bec3c9, -9px -9px 18px #ffffff`；压入 `inset 6px 6px 12px …`；经验法则：模糊≈2×偏移；暗影≈背景色加深 15%；圆角 16–24px；暗色模式需重调两个阴影而非反色（来源：https://superdesign.dev/styles/neumorphism ）。
- **代表案例/工具**：neumorphism.io（最被链接的生成器）；Hype4 生成器（Malewicz 出品）；Themesberg 新拟物组件库（200+ 组件）；CRED（最著名生产采用者，2022-04 放弃该风格并开源后继系统 NeoPOP）；Tesla App 车辆控制界面（来源：https://superdesign.dev/styles/neumorphism ；https://neumorphism.io/ 抓取确认标题）。
- **可访问性**：WCAG 2.2 SC 1.4.11 要求组件边界 3:1 对比，新拟物典型边缘对比仅约 1.4:1，无法在保留柔和质感的前提下修复（来源：https://superdesign.dev/styles/neumorphism ）。
- **来源**：https://en.wikipedia.org/wiki/Neumorphism ；https://superdesign.dev/styles/neumorphism ；https://neumorphism.io/

### 4. Claymorphism（黏土拟物）
- **定义与起源**：软糯「黏土/橡皮泥」质感 UI；术语 2021 年由 Michał Malewicz（Hype4 Academy）创造（clay + skeuomorphism），2022 年 Smashing Magazine 的独立技术性文章确认其命名权（来源：https://superdesign.dev/styles/claymorphism ；另见 https://namethatui.com/styles/claymorphism (摘要)「two inner shadows + one outer, oversized corner radii」）。动机：修复 Neumorphism 的对比度失败——把元素「浮在」页面之上（而非从背景挤出），保留元素与背景的真实对比（来源：https://superdesign.dev/styles/claymorphism ）。
- **视觉特征**：粉彩底色、超大圆角、双内阴影+外投影造成「充气/蓬松」错觉、独立上色、单一光源（来源：https://superdesign.dev/styles/claymorphism ）。
- **可参数化变量**：圆角 20–40px（经验值≈元素高度 25%，卡片 32px/按钮 24px/输入 20px）；三段式阴影（顺序关键）：外投影 `0 35px 68px rgba(112,100,176,.30)`（向元素色相着色，禁用纯黑）+ 下缘暗内阴影 `inset 0 -8px 16px rgba(95,70,140,.22)` + 顶部亮内阴影 `inset 0 8px 16px rgba(255,255,255,.65)`；按压反馈用 `transform: translateY(2px) scale(0.98)` 而非动画阴影；显式 3px `:focus-visible` 描边（来源：https://superdesign.dev/styles/claymorphism ）。CSS 落地：clay.css 库（Adrian Bece）与 LogRocket 教程推广了双内阴影写法（来源：https://superdesign.dev/styles/claymorphism ）。
- **代表案例**：Duolingo（厚按钮 3D 挤出）、Fall Guys（充气角色→UI）、Joon（儿童习惯 App）（来源：https://superdesign.dev/styles/claymorphism ）。
- **2026 现状**：从 2022 热点沉淀为利基；Superdesign 20.8 万次生成中占比由 2026 年 1 月 0.03% 升至 5 月 0.08%，多用于儿童产品/教育科技/插画型落地页（来源：https://superdesign.dev/styles/claymorphism ）。
- **来源**：https://superdesign.dev/styles/claymorphism ；https://namethatui.com/styles （含 Claymorphism 词条）

### 5. Web Brutalism（网页粗野主义）
- **定义与起源**：源自战后建筑 béton brut（素混凝土）；1952 年柯布西耶马赛公寓为建筑起点；2014 年 brutalistwebsites.com 将其「法典化」为独立数字风格；网页版特征是「暴露结构、拒绝抛光」（来源：https://design-styles.enlighten-media.net/pages/brutalism/ ；画廊站自述「In its ruggedness and lack of concern to look comfortable or easy…」：https://brutalistwebsites.com ）。
- **视觉特征**：系统/等宽字体、浏览器默认链接蓝下划线、1–2px 实心黑边框、黑白硬对比、零阴影零圆角零装饰；David Bryant Copeland 的宣言「诚实材料：内容优先、链接像链接、性能即设计」（来源：https://superdesign.dev/styles/brutalism ；manifesto 站 brutalistweb.design 经该页引用）。
- **可参数化变量**：链接色 `#0000EE`（浏览器默认蓝）；`border: 2px solid #000; border-radius: 0; box-shadow: none`；全大写标题（letter-spacing -0.02em）；hover 硬反色无过渡；等宽栈 `ui-monospace/"JetBrains Mono"/Courier New`；正文≥16px（来源：https://superdesign.dev/styles/brutalism ）。
- **代表案例**：Craigslist、Hacker News、Drudge Report、Yale School of Art（维基式可编辑站）；Gucci PF18、A$AP Rocky 的 AWGE、NYT #ThisIs18 等出现在 brutalistwebsites.com 画廊（来源：https://superdesign.dev/styles/brutalism ；https://brutalistwebsites.com ）。
- **2026 现状**：需求在 2026 年 3 月达峰（3.6%）后回落；「功能型粗野主义」（Craigslist/HN）常青，「风格型粗野主义」易过时（来源：https://superdesign.dev/styles/brutalism ）。
- **来源**：https://design-styles.enlighten-media.net/pages/brutalism/ ；https://superdesign.dev/styles/brutalism ；https://brutalistwebsites.com

### 6. Neo-Brutalism / Neubrutalism（新粗野主义）
- **定义与起源**：粗野主义的「可商用化」分支——保留黑描边但加入硬偏移阴影、糖果色与几何块面；daisyUI 风格库定义为「late-2010s 和 2020 年代的数字风格，把常规 UX 包裹在响亮的几何块、深色描边、硬偏移阴影、平面色块和夸张字体里」，又称 Neo Memphis（来源：https://trends.daisyui.com/ui-design-trends-2025/ 词条 059）。判定口诀：出现 `4px 4px 0 #000` 硬阴影即新粗野主义（来源：https://superdesign.dev/styles/brutalism ）。
- **视觉特征**：2–4px 黑实线描边、零模糊硬偏移阴影、高饱和扁平色块、粗大字体、直角或极小圆角（来源：https://trends.daisyui.com/ui-design-trends-2025/ ；https://namethatui.com/styles 词条「thick black outlines / hard offset shadows / saturated flat color blocks」）。
- **可参数化变量**：`box-shadow: 4px 4px 0 #000`（偏移量/颜色可调）；描边宽度 2–4px；单一饱和强调色；字体常用 Space Grotesk/Archivo 等（来源：https://superdesign.dev/styles/brutalism ；https://superdesign.dev/styles/bento-grid 的「Lumina」示例即 bento 结构+粗野皮肤）。
- **代表案例/工具**：neobrutalism.dev（基于 shadcn/ui 的 64 个 React + Tailwind v4 组件库，含图表与星形）（来源：https://neobrutalism.dev 抓取确认）；SaaS 落地页大量采用（来源：https://design-styles.enlighten-media.net/pages/brutalism/ 「Now: Neo-Brutalism…SaaS landing pages」）。
- **来源**：https://trends.daisyui.com/ui-design-trends-2025/ ；https://superdesign.dev/styles/brutalism ；https://neobrutalism.dev ；https://namethatui.com/styles

### 7. Minimalism（极简主义，网页语境）
- **定义与起源**：以最少元素完成界面任务——1–2 个字族、受限调色板（中性色+一个强调色）、统一间距刻度、用留白而非边框/卡片建立层级；是 Superdesign 20.8 万次生成中被请求最多的风格（全年占 9–12%），「不是趋势而是基线」（来源：https://superdesign.dev/styles/minimalist-web-design ）。谱系上受瑞士风格/包豪斯/现代主义影响（来源：https://en.wikipedia.org/wiki/Flat_design ）。
- **视觉特征**：一个想法一个屏幕；字阶做层级；65ch 可读行宽；单个 CTA；留白即设计系统（来源：https://superdesign.dev/styles/minimalist-web-design ）。
- **可参数化变量**：调色预算 `--bg #fafaf9 / --surface #f0efec / --ink #1c1917 / --ink-muted #57534e / --accent #2563eb`；1.25 模数字阶（major third）；8px 基础间距刻度（8/16/24/32/48/64/96px）；`--measure: 65ch`；正文对比度≥4.5:1（示例 7.4:1 AAA）（来源：https://superdesign.dev/styles/minimalist-web-design ）。
- **代表案例**：iA（写作即界面）、Stripe Press、Teenage Engineering、Rauno Freiberg 作品集（来源：https://superdesign.dev/styles/minimalist-web-design ）。
- **陷阱**：灰字白底对比不足、可及性线索（下划线/边框）被剥除、细体小字号、仪表盘等数据密集场景不适（同上）。
- **来源**：https://superdesign.dev/styles/minimalist-web-design ；https://en.wikipedia.org/wiki/Flat_design

### 8. Maximalism（极繁主义）
- **定义与起源**：「More is more」，对极简的反动；艺术史术语由 Robert Pincus-Witten 用于描述 1970 年代末新表现主义（Julian Schnabel、David Salle）（来源：https://en.wikipedia.org/wiki/Maximalism ）。网页语境：1980 年代 Memphis 集团使之结晶为设计哲学，2000 年代时尚与印刷延续，2015 年前后 Instagram 视觉文化触发对极简白空间设计的反弹，疫情后成为主流选择（来源：https://design-styles.enlighten-media.net/pages/maximalism/ ）。
- **视觉特征**：图案叠图案、无主导色的色彩过载、多字体多朝向的排版密度、刻意占满每一寸表面的「有序混乱」（同上）。
- **可参数化变量**：调色板数量（无上限但对撞）；字体族数/字号/朝向；图案密度与层叠层数；边距收缩策略；从 Baroque/Art Nouveau/Memphis 借用的母题库（同上）。
- **代表案例**：Diko（大字出血+青红对撞+跑马灯页脚）、Ellen Porteus（花卉铺满）、Pest Stop Boys、Glitche（故障艺术）（来源：https://design-styles.enlighten-media.net/pages/maximalism/ ）。
- **来源**：https://en.wikipedia.org/wiki/Maximalism ；https://design-styles.enlighten-media.net/pages/maximalism/

### 9. Bento Grid（便当盒布局）
- **定义与起源**：一个 CSS Grid 上的不等大小圆角卡槽阵列，取名自日式便当盒；「Apple 没有发明它，但让所有人注意到它」——Apple 2020 年 M1 芯片页已是雏形，2022 年 9 月发布会与 WWDC 2022 幻灯片令设计社区截图逆向并风行，2023 年 Linear/Vercel/Raycast 等使其成为 SaaS 功能区的默认形态（来源：https://design-styles.enlighten-media.net/pages/bento-ui/ ；https://superdesign.dev/styles/bento-grid ；https://www.deck.gallery/blog/apple-bento-grid-decks-roundup/ 「Apple didn't invent the bento grid. After the September 2022 keynote, every B2B landing page started looking like one」）。
- **视觉特征**：紧凑网格+统一间隙；以格子大小编码信息优先级（最大格=最重要事实，规格数字进小格）；每格自包含一个事实；不对称但整体平衡；bento 是布局不是配色（来源：https://superdesign.dev/styles/bento-grid ；https://www.deck.gallery/blog/apple-bento-grid-decks-roundup/ ）。
- **可参数化变量**：`display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); grid-auto-rows: 180px; gap:16px; grid-auto-flow: dense`；单元格圆角 20–28px（24px 为标志值，<16px 退化为普通卡片）；`grid-column/row: span 2` 的 2×2 hero；浅色 `#f5f5f7` / 深色 `#161617`（Apple 系灰）；断点 768px→2 列、480px→1 列并重置 span（来源：https://superdesign.dev/styles/bento-grid ）。
- **代表案例**：Apple MacBook Air「Get the highlights」区、Raycast、Amie、GitHub Copilot；画廊 bentogrids.com；注意：Linear、Vercel、Cursor、Notion、Reflect、Framer 当前均**未**用 bento 首页（列表常见讹传，来源：https://superdesign.dev/styles/bento-grid ；https://bentogrids.com ）。
- **可访问性陷阱**：`grid-auto-flow: dense` 使视觉顺序≠DOM 顺序，焦点乱跳（WCAG 2.4.3/1.3.2）；图文混排需逐格 4.5:1 校验；移动端退化为无层级长滚动（来源：https://superdesign.dev/styles/bento-grid ）。
- **2026 现状**：全年徘徊在 1–1.6% 生成占比，从 1 月 1.6% 缓降至 5 月 1.3%——「守成而非爆发」；daisyUI 2026 趋势仍收录（来源：https://superdesign.dev/styles/bento-grid ；https://digitalsynopsis.com/design/graphic-design-trends-2026/ 第 4 条「Bento Grid Layouts…modular clarity」）。
- **来源**：https://superdesign.dev/styles/bento-grid ；https://design-styles.enlighten-media.net/pages/bento-ui/ ；https://www.deck.gallery/blog/apple-bento-grid-decks-roundup/ ；https://bentogrids.com ；https://digitalsynopsis.com/design/graphic-design-trends-2026/

### 10. Aurora / Mesh Gradient（极光/网格渐变）
- **定义与起源**：以多点渐变（mesh）与大面积模糊色场营造氛围背景。网格渐变工具可追溯至 Adobe Illustrator 网格填充；UI 层面的 Aurora 风格约 2020–2021 年兴起，由 macOS Monterey 壁纸、Stripe 官网改版与 Glassmorphism 浪潮共同带火，并与 vaporwave/synthwave 色板有渊源（来源：https://www.stellae.design/learn/aurora-ui-gradient-mesh-design ；同站另页 https://design-styles.enlighten-media.net/pages/aurora/ (摘要)）。
- **视觉特征**：暗底上 3–4 个色相（靛/青/粉/紫）的柔光色带；模糊将硬渐变停驻点融化为「极光」；文字必须放在玻璃/不透明面板上而非直接压在渐变上；静态 CSS 版零 JS，动效版常为小型 WebGL 着色器（来源：https://superdesign.dev/styles/aurora ）。
- **可参数化变量**：近黑底 `#05010f`（暗底为硬性前提）；`radial-gradient(40% 50% at 20% 30%, rgba(99,102,241,.55) 0%, transparent 70%)` ×3–4 层；`::before` 锥形渐变层 `filter: blur(80px) saturate(1.4); opacity: .55` + 18s 漂移关键帧；`prefers-reduced-motion` 静态回退；色相数上限 3–4（多了发棕）；React Bits Aurora（OGL）WebGL 版参数：colorStops/amplitude/blend/speed（来源：https://superdesign.dev/styles/aurora ；CSS 版模糊 80–150px 另见 https://www.stellae.design/learn/aurora-ui-gradient-mesh-design ）。
- **代表案例**：Stripe 官网（滚动渐变，公认标志性案例）、macOS Monterey/Sonoma 壁纸、Linear、Vercel；学习型案例 Cursor、OpenAI（旧品牌）、Highnote、PlanetScale 旧版（来源：https://www.stellae.design/learn/aurora-ui-gradient-mesh-design ；https://www.learnui.design/blog/mesh-gradients.html ）。Stripe 倾斜渐变动画的复刻教程见 https://kevinhufnagl.com/how-to-stripe-website-gradient-effect/ (摘要，未抓全文)。
- **2026 现状**：真实但利基——2026 年 3 月达峰 0.33% 后回落；是「配角背景」而非前五请求（来源：https://superdesign.dev/styles/aurora ）。
- **来源**：https://superdesign.dev/styles/aurora ；https://www.stellae.design/learn/aurora-ui-gradient-mesh-design ；https://www.learnui.design/blog/mesh-gradients.html

### 11. Grain Gradient（颗粒渐变）
- **定义与起源**：在平滑渐变上叠加 SVG 噪点颗粒，增加质感并消除色带（banding）；CSS-Tricks 2021-09-13 Jimmy Chion《Grainy Gradients》系统化该技法（素材源自 Behance/Dribbble 设计师的噪声用法）（来源：https://css-tricks.com/grainy-gradients/ ）。
- **视觉特征**：渐变由纯色过渡为逐点抖动的颗粒；大幅提亮/提对比后呈「全息烫金」效果；可做带颗粒的光影（来源：同上）。
- **可参数化变量**：SVG `<feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>`；CSS `filter: contrast(170%) brightness(1000%)`；`mix-blend-mode: multiply` + `isolation: isolate` 控制混色；渐变层数与方向；噪点粗细（baseFrequency）（来源：https://css-tricks.com/grainy-gradients/ ；现成噪点 SVG：https://grainy-gradients.vercel.app/noise.svg 经文中引用）。
- **代表案例/工具**：grainy-gradients.vercel.app（配套 playground）；文章示例（光影/全息箔）（来源：https://css-tricks.com/grainy-gradients/ ）。
- **来源**：https://css-tricks.com/grainy-gradients/ ；https://grainy-gradients.vercel.app/noise.svg

### 12. Y2K / Retro-Futurism（千禧复古未来主义）
- **定义与起源**：以 1990 年代末–2000 年代初产品与时尚为素材的互联网美学；名称源于程序员 David Eddy 对「2000 年问题」的缩写；前接 Memphis、后接 Frutiger Aero；Consumer Aesthetics Research Institute（CARI）创始人 Evan Collins 建立「Y2K Aesthetic Institute」，Vice 称其为「Y2K 的最佳资料来源」；2020 年代复兴与疫情及经济衰退相关（学者 Xiaochun Yang，SHS Web of Conferences 2023）（来源：https://en.wikipedia.org/wiki/Y2K_aesthetic ）。
- **视觉特征**：金属铬/虹彩油膜渐变、透明果冻塑料（iMac G3 blobject）、荧光色（lime/orange/hot pink）配铬银、像素字体/圆润粗字体、3D 元素与光泽效果、低分辨率与 JPEG 伪影作为「年代徽章」、数字身体/赛博格意象（来源：https://en.wikipedia.org/wiki/Y2K_aesthetic ；https://design-styles.enlighten-media.net/pages/y2k/ ）。
- **可参数化变量**：铬/虹彩渐变（光谱色停靠点）、镜面高光与反射强度、半透明「果冻」填充与描边、像素字体与低分辨率纹理、块状圆角字体（同上两源）。
- **代表案例**：iMac G3 等透明科技产品；2018 年起 Hypebeast/Streetwear 复兴（Balenciaga、Palace）；当下音乐/时尚推动（Charli XCX、Paris Hilton、K-pop 团体 aespa/XG，并衍生日本「Y3K」）；WorkOS Launch Week 站点被引为全能量 Y2K 网页案例（来源：https://en.wikipedia.org/wiki/Y2K_aesthetic ；https://design-styles.enlighten-media.net/pages/y2k/ ）。
- **Retro-Futurism 关联**：daisyUI 风格 070「用过去的未来愿景重组：复古科技、时代字体、太空时代形态、铬」；姐妹风格 Cassette Futurism（CRT/琥珀绿屏幕/实体按键）（来源：https://trends.daisyui.com/ui-design-trends-2025/ ）。
- **来源**：https://en.wikipedia.org/wiki/Y2K_aesthetic ；https://design-styles.enlighten-media.net/pages/y2k/ ；https://trends.daisyui.com/ui-design-trends-2025/

### 13. Memphis（孟菲斯）
- **定义与起源**：意大利设计与建筑团体，Ettore Sottsass 于 1980-12-06 米兰聚会创立（Bob Dylan《Stuck Inside of Mobile with the Memphis Blues Again》循环播放时得名），活跃 1980–1987；1981 年首批作品在 Salone del Mobile 引发轰动，代表物 Carlton 房间屏风；中期 80s–90s 中期渗透流行文化（《Miami Vice》、Nickelodeon、滑板/滑雪品牌）；90 年代末被 Y2K 美学接棒；2010 年代其图形语言融入 vaporwave；Dior 2011-12 高定与 Missoni 2015 致敬；收藏者含 Karl Lagerfeld、David Bowie（来源：https://en.wikipedia.org/wiki/Memphis_Group ；时间线另见 https://design-styles.enlighten-media.net/pages/memphis/ ）。
- **视觉特征**：之字纹/波点/棋盘格等几何图案堆叠、 turquoise×coral×yellow×black 冲突配色、后现代反讽、带粗黑描边的扁平几何（圆/三角/蚯蚓线）、塑料层压板与水磨石材质（来源：https://en.wikipedia.org/wiki/Memphis_Group ；https://design-styles.enlighten-media.net/pages/memphis/ ）。
- **可参数化变量**：图案密度与叠放层数、冲突色板（无调和约束）、描边粗细、几何母题库（squiggle/zigzag/dot）、非对称构图（来源：https://design-styles.enlighten-media.net/pages/memphis/ ）。
- **代表案例**：Carlton room divider（1981）；网页上多为品牌资产/图案/活动页而非整站语言（enlighten 明示）；「Corporate Memphis」扁平插画风因神似而由 Wired 命名（来源：https://en.wikipedia.org/wiki/Memphis_Group ）。
- **2026 现状**：Gen-Z 80s 复古潮驱动品牌识别/插画/社媒设计中的全面复兴（来源：https://design-styles.enlighten-media.net/pages/memphis/ ）。
- **来源**：https://en.wikipedia.org/wiki/Memphis_Group ；https://design-styles.enlighten-media.net/pages/memphis/

### 14. Cyberpunk（赛博朋克 UI）
- **定义与起源**：1984 年 William Gibson《Neuromancer》奠定「黑暗、发光、联网」的赛博空间视觉母语；1995 年《Hackers》《Johnny Mnemonic》将其带入主流银幕；2013 年前后 synthwave 音乐与独立游戏触发刻意复兴；Cyberpunk 2077 与暗色模式浪潮使其成为娱乐品牌合法选项（来源：https://design-styles.enlighten-media.net/pages/cyberpunk/ ）。
- **视觉特征**：近黑底上的电光青/品红/酸性黄；扫描线、色差（chromatic aberration）、RGB 通道错位等「故障即氛围」；压缩等宽/棱角展示字体（终端/HUD 语感）；HUD 网格叠层、遥测读数、瞄准框、角标（来源：同上）。
- **可参数化变量**：霓虹强调色板（青/品红/酸黄）对暗底亮度比；扫描线间距与透明度；RGB 位移量；等宽字体字距；HUD 元素密度与角标尺寸（同上）。
- **代表案例**：CD Projekt Red《Cyberpunk 2077》官网（扫描线+霓虹+全屏视频）、攻壳机动队电影站、AI Utility Grid（克制的终端美学）（来源：https://design-styles.enlighten-media.net/pages/cyberpunk/ ）。
- **局限**：受众窄、重资产（视频/粒子/着色器）、装饰性低对比霓虹文字伤害可访问性、时代感强易过时（同上）。
- **来源**：https://design-styles.enlighten-media.net/pages/cyberpunk/

### 15. Swiss / International Typographic Style（瑞士/国际主义排版风格）
- **定义与起源**：1930s–1950s 成形的系统性平面设计方法，被视为瑞士风格的基础；吸收俄国构成主义、荷兰 De Stijl、德国包豪斯；1918 年 Ernst Keller 在苏黎世应用艺术学校开创课程（「设计方案应从内容中产生」）；1959 年期刊 New Graphic Design（Müller-Brockmann 等主编）将运动推向国际；Univers（1950s）引出 Miedinger/Hoffmann 的 Neue Haas Grotesk→Helvetica；美国自 1960 年代起被企业/机构拥抱（MIT 等）（来源：https://en.wikipedia.org/wiki/International_Typographic_Style ）。时间线：1950s 巴塞尔/苏黎世 Hofmann & Müller-Brockmann 以《Neue Grafik》发表网格+Helvetica 体系；1960s 全球化；1972 Vignelli 纽约地铁导视将瑞士原则带给大众；如今是「网页默认语言」（默认网格、无衬线、结构化层级皆为瑞士直系遗产）（来源：https://design-styles.enlighten-media.net/pages/swiss/ ）。
- **视觉特征**：数学网格（「最具可读性与和谐性的信息结构手段」）；非对称版式；齐左不齐右；无衬线（Helvetica/Univers/Akzidenz-Grotesk）；客观摄影代替插画；单一结构性强调色（经典瑞士红）；以尺寸/字重/位置建立纯结构层级（来源：https://en.wikipedia.org/wiki/International_Typographic_Style ；https://design-styles.enlighten-media.net/pages/swiss/ ）。
- **可参数化变量**：模块网格列数/栏距/基线；字阶与字重阶梯；强调色（单色）；照片-文字配比；非对称断行（同上两源）。
- **代表案例/工具**：Müller-Brockmann 海报、纽约地铁导视；学习资源 Swiss in CSS（https://www.swissincss.com/ ，抓取失败，仅在推荐位标注——未证实当前可用）；daisyUI 词条 025（strict grids/whitespace/sans/asymmetry/objective hierarchy）（来源：https://trends.daisyui.com/ui-design-trends-2025/ ）。
- **来源**：https://en.wikipedia.org/wiki/International_Typographic_Style ；https://design-styles.enlighten-media.net/pages/swiss/ ；https://trends.daisyui.com/ui-design-trends-2025/

### 16. Editorial / Magazine（杂志编辑排版风）
- **定义与起源**：平面设计中最古老的学科之一，脱胎于数百年活字排版与杂志黄金年代；1950s Alexey Brodovitch（Harper's Bazaar）与 Art Paul（Playboy）确立「动态版式、留白为工具、图片与文字平等」的词汇表；1990s 数字报纸移植报头/栏结构；2012 年 Medium/Substack+响应式设计解锁网络长文复兴；当下 newsletter 浪潮带来新一代（来源：https://design-styles.enlighten-media.net/pages/editorial/ ）。
- **视觉特征**：多级排版层级（headline/standfirst/byline/body/caption）；慷慨留白（「编辑自信」的信号）；2/3/12 列结构化栏格与 pull quote；图片为叙事伙伴而非装饰（来源：同上）。
- **可参数化变量**：栏数/栏距/行长度（measure）；字号-行高-段距刻度；题图比例与图注排版；首字下沉/引文样式；衬线展示字体×无衬线正文的配对（同上）。
- **代表案例**：The Atlantic、Monocle、NYT Cooking（来源：https://design-styles.enlighten-media.net/pages/editorial/ ）。
- **2026 关联**：daisyUI 2026 将 Editorial 与 Type-First、Data-Dense Utilitarian 并列为「字体与结构承载识别」的主轴；Adobe 2026 亦预测「freeform/storytelling 的 zine 式编辑风版式」（来源：https://trends.daisyui.com/ui-design-trends-2026/ ；https://www.adobe.com/express/learn/blog/design-trends-2026 ）。
- **来源**：https://design-styles.enlighten-media.net/pages/editorial/ ；https://trends.daisyui.com/ui-design-trends-2026/ ；https://www.adobe.com/express/learn/blog/design-trends-2026

### 关联条目（补充，凑齐周边语境）
17. **Flat Design（扁平设计）**：极简 UI 语言——简单元素、排版与平色；微软 Metro（Windows Phone 7, 2010→Windows 8）、Google Holo（2011）→Material Design（2014）、Apple iOS 7（2013）、Fluent（2017，Acrylic 半透明）；NN/g 2017 研究：扁平界面平均慢 22%；「到 2020 年代中期，扁平设计逐渐被 Glassmorphism 取代」（来源：https://en.wikipedia.org/wiki/Flat_design ）。
18. **Skeuomorphism（拟物）**：模拟真实材质/控制器的传统；在 2026 年以「新材质家族」回潮（历史手稿拟物/实木拟物/发光生态拟物/Y2K 科技拟物）（来源：https://trends.daisyui.com/ui-design-trends-2026/ ；https://trends.daisyui.com/ui-design-trends-2025/ 词条 008/022/023/024）。
19. **Frutiger Aero**：2005–2013 前后「自然+科技光泽气泡」美学（Y2K 的后继、玻璃时代的前身），被 TechRadar 认为影响了 Liquid Glass（来源：https://en.wikipedia.org/wiki/Y2K_aesthetic 参见「succeeded by Frutiger Aero」；https://en.wikipedia.org/wiki/Liquid_Glass 引 TechRadar；词条另见 https://namethatui.com/styles ）。
20. **Holographic/Iridescent & Chrome/Liquid Metal**：光谱变色与液态金属材质面，daisyUI 2026 趋势独立收录（「Reflective materials remain useful for cinematic launches, fashion, music, and premium technology」）（来源：https://trends.daisyui.com/ui-design-trends-2026/ ；https://trends.daisyui.com/ui-design-trends-2025/ 词条 014/015）。

---

## 二、2023–2026 年度 UI/设计趋势梳理

### 2.1 年度脉络
- **2023**：Bento Grid 从 Apple 发布会幻灯片走向 SaaS 功能区默认形态（2022-09 发布会为引爆点，2023 年 Linear/Vercel/Raycast 等普及）（来源：https://design-styles.enlighten-media.net/pages/bento-ui/ ；https://www.deck.gallery/blog/apple-bento-grid-decks-roundup/ ）；Neo-Brutalism 在 SaaS 落地页与独立产品中成为「新酷」（来源：https://design-styles.enlighten-media.net/pages/brutalism/ ）；Claymorphism 2022 热潮外溢（来源：https://superdesign.dev/styles/claymorphism ）。
- **2024**：Safari 18（2024-09）使 `backdrop-filter` 去前缀，Glassmorphism 工程成本骤降（来源：https://superdesign.dev/styles/glassmorphism ）；Y2K 成为时尚/音乐/数字文化的主导怀旧趋势（来源：https://design-styles.enlighten-media.net/pages/y2k/ ；https://en.wikipedia.org/wiki/Y2K_aesthetic ）。
- **2025**：Apple 于 6 月 9 日发布 Liquid Glass（跨 iOS/iPadOS/macOS/watchOS/tvOS 全平台统一材质）（来源：https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ ）；Google 同年推 Material 3 Expressive（更大胆的形状与弹簧动效）（来源：https://m3.material.io/blog/material-3-expressive 页面确认存在，内容经 JS 渲染；转述见 https://fuselabcreative.com/ui-ux-design-trends-2026-modern-ui-trends-ux-trends-guide/ ）；NN/g 10 月发布《Liquid Glass Is Cracked》批评其可用性（来源：https://www.nngroup.com/articles/liquid-glass/ ）。
- **2026**：Apple 在 WWDC 2026 修订 Liquid Glass（iOS 27/macOS 27 Golden Gate：降低默认透明度、新增用户「clear↔tinted」滑杆）（来源：https://en.wikipedia.org/wiki/Liquid_Glass ）；daisyUI 发布 2026 趋势 18 条（见 2.2）；Adobe 2026 Creative Trends Forecast 发布 10 条（见 2.3）；Figma 博客以「Config 2026: New materials, new tools, and a more expressive canvas」为主视觉叙事（AI 降地板不升天花板论）（来源：https://www.figma.com/blog/ 抓取确认标题）。

### 2.2 正在兴起 / 正在退潮（多源交叉）
**兴起（rising）**
- 玻璃系材质（Glassmorphism 2026 年 1–5 月生成占比 7.5%→9.9%，7,866 个项目；Liquid Glass 带动「liquid glass vs glassmorphism」真实搜索需求）（来源：https://superdesign.dev/styles/glassmorphism ）。
- 「字体与结构承载识别」：Editorial、Type-First、Data-Dense Utilitarian、Neubrutalism（daisyUI 2026 第二主轴：「A clear grid and a strong typographic voice can replace layers of decorative UI」）（来源：https://trends.daisyui.com/ui-design-trends-2026/ ）。
- 反 AI 抛光的「手工感」：Hand-Drawn、Scrapbook/Sticker、拼贴与明显手工痕迹；Creative Bloq 称 2026 定义性趋势为 Anti-AI Crafting（Landor 全球 ECD Graham Sykes：「human-driven craft…as the antidote to AI's hyper-slick visual language」，案例：Burberry 十字绣骑士、苹果 TV 片头手吹玻璃苹果）（来源：https://trends.daisyui.com/ui-design-trends-2026/ 第三主轴；https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026 ）。
- 材质拟物新家族与新奢材质：Skeuomorphism 回潮（历史手稿/实木/发光生态/Y2K 科技拟物四分支）、Chrome/Liquid Metal、Spatial UI（visionOS 语感渗入 2D 产品屏）（来源：https://trends.daisyui.com/ui-design-trends-2026/ ）。
- 极繁的持续：Adobe 2026 预测「maximalist, chaotic layouts」至少贯穿全年（来源：https://www.adobe.com/express/learn/blog/design-trends-2026 第 10 条；https://digitalsynopsis.com/design/graphic-design-trends-2026/ 第 19 条）。
- Claymorphism 微增（0.03%→0.08%，儿童/教育/插画场景）（来源：https://superdesign.dev/styles/claymorphism ）。

**退潮/降温（fading）**
- Brutalism（风格型）已过峰：2026-03 达 3.6% 后回落至 5 月 3.3%、6 月（月内）2.37%（来源：https://superdesign.dev/styles/brutalism ）。
- Neumorphism 趋零：0.69%→0.41%，约为 Glassmorphism 的 1/20（来源：https://superdesign.dev/styles/neumorphism ）。
- Bento Grid 平台化缓降：1.6%→1.3%，从时尚转向标准布局惯例（来源：https://superdesign.dev/styles/bento-grid ；https://design-styles.enlighten-media.net/pages/bento-ui/ 「Maturing Pattern」）。
- Liquid Glass 全屏化受权威否定：NN/g「Apple 的错误别学」；Apple HIG 亦称勿在内容层使用（转述）（来源：https://www.nngroup.com/articles/liquid-glass/ ；https://fuselabcreative.com/ui-ux-design-trends-2026-modern-ui-trends-ux-trends-guide/ ）。
- 纯粹极简让位于「Bold Minimalism」（强对比、自信排版的极简）（来源：https://digitalsynopsis.com/design/graphic-design-trends-2026/ 第 13 条；极简本身仍是基线：https://superdesign.dev/styles/minimalist-web-design ）。
- 暗色模式默认化被降级为「用户开关」（NN/g 光照模式阅读研究；企业/受监管产品 adopt/skip 评级）（来源：https://fuselabcreative.com/ui-ux-design-trends-2026-modern-ui-trends-ux-trends-guide/ ）。

**2026 年非视觉结构趋势**：无障碍成为上线法定条件（欧盟 EAA 自 2025-06-28 适用，目标 WCAG 2.2 AA）；AI 副驾置于结构化视图旁（NN/g State of UX 2026 被转述为「AI 疲劳之年」——**该 NN/g 原文本次未直接核对，标注未证实**）；基于角色预设而非算法的个性化；跨平台一致性；可见推理的预测性洞察（来源：https://fuselabcreative.com/ui-ux-design-trends-2026-modern-ui-trends-ux-trends-guide/ ）。

### 2.3 年度趋势报告清单（2023–2026 窗口）
| 报告 | 要点 | URL |
|---|---|---|
| daisyUI《18 UI Design Trends for 2026》 | 四主轴：界面重新实体化/字体与结构承载识别/个性胜过均质抛光/拟物新材质；18 条含 Glassmorphism（更克制）、Spatial、Clay、Chrome、Editorial、Type-First、Data-Dense、Neubrutalism、Hand-Drawn、Scrapbook、Y2K、Biophilic、四类新拟物 | https://trends.daisyui.com/ui-design-trends-2026/ |
| Adobe 2026 Creative Trends Forecast | 10 条：感官最大化（puffy/squishy）、夸张俏皮字体、高能沉浸、超现实荒诞、有机不完美、自由编辑式版式、温暖个人化、在地文化、拼贴层叠、极繁混乱；总基调：对 AI/AR 高科技美学的反噬→模拟/人本 | https://www.adobe.com/express/learn/blog/design-trends-2026 |
| Creative Bloq 2026（Tom May，2025-12-23） | 反AI手工（Anti-AI Crafting）、质感/温度/触觉反叛；案例 Burberry、Madalena Studio（霉菌培养 logo）、Apple TV 片头 | https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026 |
| Digital Synopsis《Top 20 of 2026》（基于 Jumping Goose 的 Graphic Trend Report） | 20 条：AI 生成协作、克制 3D、液态实验字体、Bento、动效主导品牌、混合媒介、Ink Trap 字体、自然系、Neo-Brutalism、实用主义、像素复兴、克制故障、Bold Minimalism、怪趣插画、异形裁切摄影、手工拼贴、渐变融合、Retro-Futurism、Maximalism、模糊失真 | https://digitalsynopsis.com/design/graphic-design-trends-2026/ |
| Fuselab《UI/UX Design Trends 2026: 10 Verdicts》（2026-10-23 更新） | 企业/受监管双轨 adopt/test/skip 评级；视觉趋势（暗色、Liquid Glass）地位低于讨论热度 | https://fuselabcreative.com/ui-ux-design-trends-2026-modern-ui-trends-ux-trends-guide/ |
| Superdesign 风格百科（20.8 万次真实生成统计，2026 年 1–6 月） | 一手份额数据：Minimalist 9–12%（基线第一）、Glassmorphism 7.5→9.9%（上升）、Brutalism 峰值回落、Bento 1.6→1.3%、Aurora 峰值 0.33%、Clay 0.03→0.08%、Neumorphism 0.69→0.41% | https://superdesign.dev/styles （各风格页内嵌图表） |
| Figma 官方博客（2026） | 「Config 2026: New materials, new tools, and a more expressive canvas」；Figma 2026 AI 报告（2026-06-24）；设计系统×AI 多篇 | https://www.figma.com/blog/ |
| Dribbble | 官方 2026 年度趋势文章**未检索到**；站内仅有 tags 聚合页（如 https://dribbble.com/tags/design-trends-2026 ）；第三方「Dribbble Graphics」博客非官方 | https://dribbble.com/tags/design-trends-2026 |
| uxbaseline | **站点本次无法访问（两次抓取失败）**，其 2026 报告未能核验 | https://uxbaseline.net/ （不可达） |

---

## 三、汇总清单：风格流派 → 视觉特征 → 关键参数 → 来源 URL

| # | 流派 | 视觉特征（一句话） | 关键参数（可参数化变量） | 来源 |
|---|---|---|---|---|
| 1 | Glassmorphism | 半透明面板+背景模糊+细亮边+柔影 | blur 10–25px；fill 10–15% alpha；1px 30% 边；radius 16–20px；shadow 0 8px 32px | https://glassmorphism.com/ ；https://superdesign.dev/styles/glassmorphism |
| 2 | Liquid Glass | 可折射反射的动态玻璃材质层 | 折射/位移（SVG feDisplacementMap）、镜面高光、透明度档位（clear↔tinted）、同心圆角 | https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ ；https://developer.apple.com/documentation/technologyoverviews/liquid-glass |
| 3 | Neumorphism | 同色底双阴影挤出/压入 | #e0e5ec 底；±9px 偏移/18px 模糊；暗影=底色-15%；blur≈2×offset；radius 16–24px | https://superdesign.dev/styles/neumorphism ；https://en.wikipedia.org/wiki/Neumorphism |
| 4 | Claymorphism | 粉彩充气黏土感（浮于页面） | radius 20–40px；外投影+双内阴影三段式；色相化投影；按压 scale(0.98) | https://superdesign.dev/styles/claymorphism |
| 5 | Web Brutalism | 暴露结构零装饰 | #0000EE 链接蓝；2px 黑实线；radius 0；shadow none；等宽/系统字体；无过渡反色 hover | https://superdesign.dev/styles/brutalism ；https://brutalistwebsites.com |
| 6 | Neo-Brutalism | 黑描边+硬偏移阴影+糖果色 | box-shadow 4px 4px 0 #000；描边 2–4px；饱和扁平色块；粗展示字体 | https://trends.daisyui.com/ui-design-trends-2025/ (059)；https://neobrutalism.dev |
| 7 | Minimalism | 元素预算制：留白做层级 | 2 中性+1 墨+1 弱墨+1 强调；1.25 字阶；8px 间距刻度；65ch；对比≥4.5:1 | https://superdesign.dev/styles/minimalist-web-design |
| 8 | Maximalism | 图案叠图案的有序混乱 | 无限调色板；多字体/朝向；图案密度与层数；零留白策略 | https://design-styles.enlighten-media.net/pages/maximalism/ ；https://en.wikipedia.org/wiki/Maximalism |
| 9 | Bento Grid | 不等大小圆角格子的优先级编码 | repeat(4,minmax(0,1fr))；auto-rows 180px；gap 16px；radius 20–28px；span 2×2 hero；dense 回填 | https://superdesign.dev/styles/bento-grid |
| 10 | Aurora/Mesh Gradient | 暗底多色柔光色场 | #05010f 底；3–4 色相 radial 层；conic 层 blur(80–150px) saturate(1.4)；drift 关键帧；reduced-motion 回退 | https://superdesign.dev/styles/aurora ；https://www.stellae.design/learn/aurora-ui-gradient-mesh-design |
| 11 | Grain Gradient | 渐变+噪声颗粒质感 | feTurbulence baseFrequency .65 / octaves 3；contrast(170%) brightness(1000%)；mix-blend-mode | https://css-tricks.com/grainy-gradients/ |
| 12 | Y2K / Retro-Futurism | 铬、虹彩、透明果冻塑料、像素怀旧 | 铬/虹彩渐变停靠点；镜面高光；半透明果冻填充；像素/粗圆字体；低清伪影纹理 | https://en.wikipedia.org/wiki/Y2K_aesthetic ；https://design-styles.enlighten-media.net/pages/y2k/ |
| 13 | Memphis | 之字/波点/冲突色/扁平几何黑描边 | 图案密度层叠；无调和冲突色板；描边粗细；几何母题库 | https://en.wikipedia.org/wiki/Memphis_Group ；https://design-styles.enlighten-media.net/pages/memphis/ |
| 14 | Cyberpunk | 近黑底霓虹+故障+HUD | 青/品红/酸黄对暗底；扫描线；RGB 位移；等宽压缩字体；HUD 网格密度 | https://design-styles.enlighten-media.net/pages/cyberpunk/ |
| 15 | Swiss / ITS | 数学网格+中性无衬线+客观层级 | 模块网格/基线；齐左不齐右；Helvetica/Univers；单一瑞士红强调；非对称版式 | https://en.wikipedia.org/wiki/International_Typographic_Style ；https://design-styles.enlighten-media.net/pages/swiss/ |
| 16 | Editorial | 杂志级排版层级+栏格+留白 | 栏数/栏距；headline→caption 字阶；measure 行长；图注与 pull quote；衬线×无衬线配对 | https://design-styles.enlighten-media.net/pages/editorial/ |
| 17 | Flat Design（关联） | 平色+简单元素+清晰排版 | 平色板；简洁字形图标；无拟物深度 | https://en.wikipedia.org/wiki/Flat_design |
| 18 | Skeuomorphism（关联） | 模拟真实材质/控制器 | 材质贴图、机械控制隐喻、光照模型 | https://trends.daisyui.com/ui-design-trends-2025/ (008) |
| 19 | Frutiger Aero（关联） | 自然+光泽气泡+水色 | 天空蓝/草绿、玻璃气泡、光泽高光 | https://namethatui.com/styles ；https://en.wikipedia.org/wiki/Y2K_aesthetic |
| 20 | Holographic/Chrome（关联） | 光谱虹彩与液态金属 | 光谱渐变、镜面反射、衍射效果 | https://trends.daisyui.com/ui-design-trends-2026/ |

---

## 四、方法论与局限（如实说明）
1. **配额限制**：内置 WebSearch 与 web_reader MCP 周配额耗尽（重置 2026-12-03）；本次检索依靠 fox_fetch（HTTP 直抓 + Jina 兜底）、内置 WebFetch 与 DuckDuckGo Lite（间歇性 CAPTCHA）。所有关键结论均来自本次实际抓取的页面正文。
2. **未能完成/未证实**：
   - **uxbaseline.net** 两次抓取失败（连接失败），其 2026 年趋势报告未能核验；「uxbaseline 2026」检索结果中亦无该站自身文章。
   - **Dribbble 官方 2026 年度趋势报告**未检索到（只有 tags 聚合页与第三方同名博客 dribbblegraphics.com，后者非官方）。
   - **Figma Config 2026 recap 的具体文章 URL** 未定位（figma.com/blog/config-2026/ 404），仅确认博客首页存在该标题与 Dylan Field 引言。
   - **NN/g State of UX 2026（「AI 疲劳」）**：仅经 Fuselab 文章转述，NN/g 原文本次未直接抓取核对——未证实。
   - **Malewicz 命名 Glassmorphism 的原文**（hype4.academy/uxdesign.cc 旧链）现已 404；以 glassmorphism.com 官方说明（2020 年 11 月命名）与 superdesign.dev 页面交叉确认；enlighten 页面称「2021 年 UX Collective 命名」，与官方说法存在一年出入，两说并列供参考。
   - **kevinhufnagl.com（Stripe 渐变教程）、deckly.design、优设 uisdc Bento 合集** 仅来自搜索结果摘要，未抓全文——(摘要) 标注。
   - **swissincss.com** 抓取失败，其现状未证实。
3. **数据口径提示**：superdesign.dev 的「2026 年风格份额」为该 AI 设计工具自身 20.8 万次生成的一手统计，反映的是「开发者向 AI 索要的风格」而非全市场采用率，使用时请注明口径（来源：https://superdesign.dev/styles 各页 Methodology 段）。
