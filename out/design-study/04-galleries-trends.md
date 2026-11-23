# 04 · 专业 UI 参考站策展工艺 × 2025–2026 前端设计趋势

> 调研日期:2026-11-21。项目背景:深色主题设计图集站(工作台+画廊混合体)。
> 方法:全部结论来自本次会话直接抓取的官方文档/真实站点正文(fox_fetch / Jina / curl unpkg),逐条附 URL;抓取失败或未获得的项如实标注「未找到」。**未采信任何二手转述。**
> 本会话实际抓取过的源:`mobbin.com`(首页/colors/glossary)、`godly.website`、`land-book.com`、`awwwards.com`(首页/SOTD/FAQ)、`cssdesignawards.com`、`httpster.net`、`interfacelovers.com`、`pantone.com/color-of-the-year/2026`、`radix-ui.com/colors`(+ unpkg `@radix-ui/colors@3.0.0/*-dark.css` 原始色值)、`ui.shadcn.com/docs/theming`、`linear.app/brand`、`vercel.com/font`、`webflow.com/blog/web-design-trends-2026`、`tailwindcss.com/docs/font-size`、`/docs/letter-spacing`、`/docs/transition-timing-function`、`developer.mozilla.org`(scroll-driven animations / View Transition API / variable fonts guide)、`motion.dev/docs/react-transitions`、`magicui.design/docs/components`、`framer.com/state-of-sites-2026/`、`coolors.co/trends`(404)。

---

## 1. 参考站逐站调研:策展维度与可迁移手法

### 1.1 Mobbin — 真实产品截图库(结构化 UX 模式分类法的标杆)

- **规模与定位**:600,000+ 已上线真实 App/网站截图,"shipped screens, new every week";2018 年起家于创始人 Jiho 的 Dropbox 截图文件夹。来源:https://mobbin.com (正文:"Over 600,000 shipped screens")。
- **策展维度**(官方导航实测):对象五层——`Apps / Sites / Screens / Flows / Animations / UI Elements`;垂直行业线 `Finance+`(60+ 投资/银行/加密 App,含 KYC 墙与地区锁背后的流程);面向 AI agent 的 MCP 接入(Cursor/ChatGPT/Claude/Figma/Grok)。来源:https://mobbin.com
- **UX 模式分类法**(glossary 全量,共 50+ 模式,直接可抄的分类骨架):Accordion、Action Sheet、Avatar、Badge、Banner、Bottom Sheet、Button、Card、Carousel、Checkbox、Chip、Color Picker、Combobox、**Command Palette**、Context Menu、Date Picker、Dialog、Divider、Drawer、Dropdown Menu、**Empty State**、Error Message、File Uploader、FAB、Full-screen Overlay、Gallery、Hyperlink、Launch Screen、Loading Indicator、Map Pin、Navigation Menu、Page Control、Pagination、Popover、Progress Indicator、Radio Button、Search Bar、Segmented Control、Select、**Sidebar**、Skeleton、Slider、Stacked List、Status Dot、Stepper、Switch、Tab Bar、**Table**、Table of Contents、Text Area、Text Field、Tile、Time Picker、**Toast**、Toolbar、Tooltip、Top Navigation Bar、Tree。来源:https://mobbin.com/glossary
- **配色策展**:官方 `Explore Colors` 页按「Brand Colors(如 Apple #0066CC/#F5F5F7/#1D1D1F、Discord #5865F2/#57F287/#ED4245)」与「Trending color meanings(Absolute Blue #0041D9、Spiro Disco Ball #0FC0FC、True Blue #0073CF、Desert Bloom #F4B5B6 等)」双轴组织。来源:https://mobbin.com/colors
- **可迁移手法**:① 按「Flow > Screen > UI Element」三级而非平铺图片;② 每张截图挂 glossary 标签(把画廊变成可检索的模式库);③ 品牌色卡条(截图卡上直接显示该 App 的色板,色值级);④ 空态/加载态单独成类(Empty State/Skeleton 是图集站最常被忽略的分类)。
- 成熟度:**工作台核心范式**(这就是图集站的信息架构)。

### 1.2 godly.website — 前卫视觉画廊

- **定位**:"The best design inspiration on the Internet";内容类型:`Websites / OG Images / App Screenshots / App Icons / Videos(new)`;设计维度标签:`All / Web / Interface / Branding / Motion / Illustration / Posters / Print`。来源:https://godly.website 、https://godly.website/websites (正文抓取)。
- **代表作品共性**(从站内入口与招聘位看):站点网格全屏封面视频 + 悬停播放;作品偏 awwwards 系(大字排印、动效网站)。(正文只暴露分类结构,网格内容为 JS 渲染,**作品级共性未能从正文逐一核验**——如实说明。)
- **可迁移手法**:① OG Image / App Icon 独立成库(深色画廊里 OG 卡片是最便宜的「第二内容源」);② 悬停即播的封面视频而非截图。来源:https://godly.website
- 成熟度:营销页气质;其「Videos/OG 二级库」手法**适合图集站**。

### 1.3 Land-book — 手挑画廊(筛选法最完整)

- **定位**:"Find the best hand-picked website design inspiration… curated… updated daily"。来源:https://land-book.com
- **策展维度**(官方筛选器全量抓取):
  - 内容型:`Websites / Sections / Mobile / Motion / OG Images / Headlines`;
  - 页面类型:Landing、Portfolio、Blog、Ecommerce、Pricing、Sign Up、Case Study、Blog Post、Product listing、Product page、About Us、Career 等;
  - **Style 标签 25 个**:3D、Animation、Apple Style、Background Image、Background Video、Big Footer、Big Type、Big Type in Footer、Black & White、Bottom Navigation、Bright Colors、Brutalism、Cards、Dark Colors、Flat Design、Fun、Gradient、Illustration、Light Colors、Parallax、Pastel Colors、Pattern、People、Stripe Style、Visible Borders;
  - Typography:Display / Sans Serif / Serif;Color:Red/Yellow/Green/Azure/Blue/Black/White;Platform:Figma/Framer/Shopify/Webflow/WordPress;
  - 排序:Most Recent / Recommended / Most liked / Most viewed。来源:https://land-book.com (首页筛选区正文)
- **代表作品共性**:同屏呈现的入选作普遍是「大字 hero + 卡片分区 + 单 accent + 悬停截图卡」;站内现势推荐位包括 Trustly、Airform、Pageloop 等 SaaS landing。(来源同上,缩略图列表正文)
- **可迁移手法**:① Style 标签体系(尤其 `Big Type / Dark Colors / Gradient / Visible Borders / Cards` 五个词就是 2026 深色画廊的配方);② 「Headlines」「Sections」两个二级库——把标题文案和组件区段从整页里拆出来策展;③ 12px 圆角截图卡 + 1px 描边 + likes 计数徽章的卡片工艺。
- 成熟度:**工作台+画廊通吃**(它的 filter 即图集站的搜索面板规范)。

### 1.4 Awwwards — 评审制奖项(动效/字体风向标)

- **策展机制**(FAQ 实测):提名→双线打分(Jury 与 Users 各自独立投票)→ **Honorable Mention 需 jury≥6.5 且 users≥6.5** → SOTD → SOTM → SOTY;获 SOTD 后才公开 jury 分(首页 SOTD 卡显示 "Score 7.3 of 10");提交图规格 1600×1200;**不接受套模板网站**;网站获批后 3 个月内可争夺 SOTD;另设 Developer Award 与 Honors(Portfolio/No-code/E-commerce/Product/Business & Services)。来源:https://www.awwwards.com/faqs/ 、https://www.awwwards.com (首页)
- **标签法系**(SOTD 页过滤词全量):Category 30 类;Tag 60+(Animation、Microinteractions、Parallax、Scrolling、Storytelling、Transitions、Unusual Navigation、Horizontal Layout、Data Visualization…);**Technology**:GSAP、Three.js、Locomotive Scroll、Matter.js、PixiJS、Anime.js、Barba.js、Lottie、WebGL、Next.js、Webflow…;**Font 过滤器**(得奖字体实录,这是 2026 字体趋势的一手证据):Druk、ABC AT Druk、GT Founders DM/FK、Aeonik、Canela、**Editorial New**、Akkurat、Aktiv、**Fraunces**、EB Garamond、Didone 系(Canela/Didot)、**Azeret Mono**、**Fragment Mono**、Courier Prime、Clash、Bricolage Grotesque、Degular、Favorit、Basel Grotesk…。来源:https://www.awwwards.com/awwwards/awwwards/sites_of_the_day/ (抓取自 https://www.awwwards.com/awards-of-the-day/ 正文过滤面板)
- **代表作共性**:大 display 字 + GSAP 滚动编排 + 定制光标 + WebGL 场景(技术过滤器构成即证据)。
- **可迁移手法**:① 得奖徽章体系(SOTD/HM/DEV 徽章本身就是图集站的卡片元数据范式);② 「按字体筛选作品」——图集站做 font 维度检索是差异化利器;③ Nominee 公众投票位(社区参与感)。
- 成熟度:**风向标**;其重度动效范式主要适合**营销页**,取其信息架构与字体数据。
- 注:其 4 维评分细则页(Design/Usability/Creativity/Content)本次访问 `/evaluation-system/` 返回 404,**具体四维权重未核验**,此处只引用 FAQ 可验证规则。

### 1.5 CSS Design Awards — 三维透明评审

- **策展机制**(首页实测):每日 WOTD;评委面板 **UI Design / UX Design / Innovation 三维各 /20**,评委个人分与均分全公开(当日例:garcy.studio,UI 8.37 / UX 8.27 / INN 8.36,总 8.33;WOTD 门槛带普遍在 8.3–8.7 区间);提名站开放公众 Vote。来源:https://www.cssdesignawards.com
- **可迁移手法**:① **三维评分公开化**(图集站可做「视觉/体验/创新」三轴社区评分并显示均分);② 评委评语直接上卡片。
- 成熟度:评分模型**适合工作台**。

### 1.6 httpster — 极简风标签统计(最诚实的趋势计数器)

- **定位**:"Hand-picked website design inspiration with typographic, minimal, brutalist vibes",共收录 **3116** 站。来源:https://httpster.net
- **Style 标签计数**(首页侧栏全量数字,2026-11 实测)——这是「什么正在流行」的硬数据:
  - Photographic **1412** / **Typographic 1193** / Responsive 1106 / Light 673 / **Minimal 847** / Colourful 923 / **Unusual Layout 663** / **Grid 647** / **Scrolling Behaviour 611** / Illustrative 282 / **Interactive 263** / Fullscreen 273 / **Dark 259** / Unusual Navigation 215 / Monotone 52 / Retro 62 / Brutalist **5** / Low carbon 3 / Print 3。
  - 解读:① **Typography 超过 Minimal**——排印驱动是第一潮流;② Dark 259 vs Light 673——深色仍是少数派但稳定存在,正是差异化空间;③ **Brutalism 在 httpster 只有 5 例**,砖石风已过气峰值;④ Interactive 263 与 Scrolling 611——滚动编排仍是主菜。
- **可迁移手法**:① **给每个 style 标签显示收录计数**(让用户感知体量,也暴露自己策展的密度);② Toggle light/dark 模式的画廊本身。
- 成熟度:标签计数法**适合工作台**;其审美(typographic minimal)为全站基调。

### 1.7 Interface Lovers — 已转型为人物杂志

- **现状**(首页实测):已更名 **"Lovers Magazine"**(by SPACES),从截图画廊转型为**设计师访谈系列**(编号至 No. 626,Jenny Fan/Palantir、Rahul Jain/Netflix 等)+ **Designer Mixes**(设计师歌单)+ Scout(人才)/Studios/Culture 四条产品线。来源:https://interfacelovers.com
- **可迁移手法**:① 访谈编号 + 大幅肖像 + mono 编号("No. 626")的编辑排版;② 内容与招聘/人才库联动。
- 成熟度:编辑排版手法**适合画廊站的「专栏」频道**;其本体已不是 UI 参考站。
- **小结(横向规律)**:六站的共同策展骨架 = 「手挑(人审)+ 多维标签 + 排序信号(recency/likes/views/jury 分)+ 卡片悬停展开 + 二级库(sections/headlines/OG)」。代表作品共性收敛为:**大字排印、单 accent 或全色系、克制的深色/单色底、滚动+悬停微动效、可见网格边界**。

---

## 2. 2025–2026 配色趋势(色值级)

### 2.1 官方年度信号

- **Pantone 2026 年度色:PANTONE 11-4201 Cloud Dancer**——官方描述 "a lofty white that serves as a symbol of calming influence"。官方页只给色号与文案,**未公布 HEX(如实说明)**;对深色站的意义:近白色文字/留白要素雅、带极轻暖灰,不要用死白 `#FFFFFF` 做正文,用 `#F4F5F8`(Linear "Mercury White",来源:https://linear.app/brand )或 `#EDEEF0`(Radix slate-dark-12,来源:unpkg `@radix-ui/colors@3.0.0/slate-dark.css`)这类软白。来源:https://www.pantone.com/color-of-the-year/2026
- **Linear 品牌色策略**(深色产品范本):主品牌色是"subtle desaturated blue";双色定值 **Mercury White #F4F5F8 / Nordic Gray #222326**(微带蓝相的深灰,非纯黑)。来源:https://linear.app/brand
- **Webflow 官方 2026 趋势之五「Explosion of color」**:从「单 accent 色」转向「**整套色系上全线**」——一个品牌用整套色值(背景、图标、动画、preloader 全部换色),要求保持一致性。对深色工作台的落地:主 accent 之外预备 2–3 个副色(图表/分类/标签),共享同一明度框架。来源:https://webflow.com/blog/web-design-trends-2026 (2025-12-23 发布)

### 2.2 高级感深色底的「色温处理」铁律(Radix 12 步法)

Radix Colors(WorkOS 出品,社区事实标准)官方语义:每色 12 步,**1=App 背景、2=Subtle 背景、3=组件背景、4=hover、5=active/selected、6=非交互细边框、7=交互边框/focus ring、8=hover 边框、9=Solid(全 scale 彩度最高一步)、10=Solid hover、11=低对比文字、12=高对比文字**;且官方保证 11/12 对同 scale 2 号底达到 **APCA Lc 60 / Lc 90** 对比度;提供 P3 与 alpha 变体。来源:https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale 、https://www.radix-ui.com/colors

可直接抄的深色工艺(色值均为本次 `curl unpkg @radix-ui/colors@3.0.0/*-dark.css` 实测输出):
1. **底色带色相**:灰阶要向品牌 hue 偏——slate 偏蓝(底 `#111113`)、mauve 偏紫红(底 `#121113`)、cyan 偏青(底 `#0b161a`);**禁用 `#000000`**。
2. **层级靠亮度阶梯**:1→5 每步约 +2~3% 亮度(例:`#111113 → #18191b → #212225 → #272a2d → #2e3135`),卡片永远比页面底高 2 步。
3. **文字不用纯白**:高对比文字 = step 12(`#edeef0`/`#eeeef0`),次要文字 = step 11(`#b0b4ba`,APCA Lc≥60)。
4. **accent 染色面**:选中/hover 用同 hue step 3(如 violet-3 `#291f43`)当 tinted surface,而不是透明黑叠加。
5. **Solid accent(step 9)面积 <5%**:按钮/徽章/焦点环;亮色 accent(Sky-9 `#7ce2fe`、Amber-9 `#ffc53d`、Jade-11 `#1fd8a4`)配**深色文字**(官方:Sky/Mint/Lime/Yellow/Amber 的 step 9–10 为深色前景设计)。

### 2.3 渐变走向:aurora/mesh/grain 之后去哪了

证据链(全部官方页):
- **「渐变收缩为线」**:1px 渐变描边/流光边框被组件化——Magic UI `Border Beam`、`Shine Border`、`Animated Beam`。来源:https://magicui.design/docs/components
- **「渐变收缩为字」**:`Aurora Text`、`Animated Gradient Text` 成为独立组件(渐变只上 display 字,不再铺满 hero 背景)。来源同上。
- **「glow 变成背光」**:`Backlight`、`Neon Gradient Card`——光晕从背景层退到卡片后侧。来源同上。
- **「noise 从主视觉退为贴纸层」**:`Noise Texture` 组件化,叠加用而非氛围用。来源同上。
- **Webflow 2026 之八「The infinite canvas」**:空白画布、dot grid、节点连线成为「可能性」的视觉隐喻(创作工具类站首选背景)。来源:https://webflow.com/blog/web-design-trends-2026
- **Webflow 2026 之一「Proprietary effects」**:通用效果同质化后,品牌投资"ownable"的定制视觉系统(自定义滤镜/签名动效)。来源同上。
- 结论:全屏 aurora/mesh hero **已过峰值**(2023–24 潮),2026 年渐变以「1px 边框流光 + 文字渐变 + 卡片背光 + 全色系」四种受控形态存在;图集站的正确用法是把渐变预算花在卡片 hover 边框与 logo/标题上。

### 2.4 三套可直接落地的深色工作台配色板(色值级,全部实测值)

**通用语义层(shadcn/ui 官方 token 约定,语义对:bg/fg、card、popover、primary、muted、accent、destructive、border、input、ring、chart-1..5、sidebar-*)**。来源:https://ui.shadcn.com/docs/theming (正文 token 表;当前默认主题为 oklch 中性色,如 primary `oklch(0.205 0 0)`)

**板 A「Obsidian Violet」·紫罗兰工程感(推荐默认)**
底层=Radix Slate dark,accent=Violet dark(全部 unpkg 实测):
```
--bg:            #111113  /* slate-1 */
--bg-subtle:     #18191b  /* slate-2 侧栏/卡片底 */
--surface:       #212225  /* slate-3 */
--surface-hover: #272a2d  /* slate-4 */
--surface-active:#2e3135  /* slate-5 */
--border:        #363a3f  /* slate-6 */
--border-strong: #43484e  /* slate-7 */
--text-secondary:#b0b4ba  /* slate-11 Lc60+ */
--text:          #edeef0  /* slate-12 Lc90+ */
--accent:        #6e56cf  /* violet-9 solid */
--accent-hover:  #7d66d9  /* violet-10 */
--accent-text:   #baa7ff  /* violet-11 链接/文字 */
--accent-tint:   #291f43  /* violet-3 选中面 */
--success:       #29a383  /* jade-9  */  --success-text: #1fd8a4 /* jade-11 */
--warning:       #ffc53d  /* amber-9 */  --warning-text: #ffca16 /* amber-11 */
--danger:        #e5484d  /* red-9   */  --danger-text:  #ff9592 /* red-11  */
--info:          #0090ff  /* blue-9  */  --info-text:    #70b8ff /* blue-11 */
```

**板 B「Warm Charcoal / Amber」·暖灰画廊感(编辑气质)**
底层=Radix Mauve dark + Amber/Gold accent:
```
--bg: #121113 /* mauve-1 */  --bg-subtle: #1a191b /* mauve-2 */
--surface: #232225 /* mauve-3 */  --surface-hover: #2b292d /* mauve-4 */
--border: #3c393f /* mauve-6 */   --border-strong: #49474e /* mauve-7 */
--text-secondary: #b5b2bc /* mauve-11 */  --text: #eeeef0 /* mauve-12 */
--accent: #ffc53d /* amber-9 */  --accent-hover: #ffd60a /* amber-10 */
--accent-text: #ffca16 /* amber-11 */  --accent-tint: #302008 /* amber-3 */
--gold-meta: #cbb99f /* gold-11,高级感 meta/编号文字 */
--danger: #e5484d /* red-9 */
```
适用:画廊首页/精选页;accent 面积务必 <5%,否则廉价。

**板 C「Deep Cyan」·冷青数据感(图表/仪表向)**
底层=Radix Cyan dark:
```
--bg: #0b161a /* cyan-1 */  --bg-subtle: #101b20 /* cyan-2 */
--surface: #082c36 /* cyan-3(染色面,可作 hover) */
--border: #045468 /* cyan-6 */  --border-strong: #12677e /* cyan-7 */
--text-secondary: #4ccce6 /* cyan-11 */  --text: #b6ecf7 /* cyan-12 */
--accent: #23afd0 /* cyan-10 hover */  --accent-solid: #00a2c7 /* cyan-9 */
--accent-glow: #4ccce6 /* cyan-11,辉光/光标灯 */
--success: #27b08b /* jade-10 */  --warning: #ffd60a /* amber-10 */  --danger: #ec5d5e /* red-10 */
```
适用:仪表盘/统计页;cyan 染色底天然为图表衬底。
(三板可共存:板 A 做全局,板 C 做数据视图,板 B 做营销首页——即 Webflow「Explosion of color」的全色系打法,共享同一明度框架。)

### 2.5 accent 流行色参考锚点

- Mobbin trending:name-level 流行色 Absolute Blue `#0041D9`、True Blue `#0073CF`、Spiro Disco Ball `#0FC0FC`、Desert Bloom `#F4B5B6`、Lavender `#E6E6FA`。来源:https://mobbin.com/colors
- 品牌 accent 实录(同页):Apple `#0066CC`、Canva `#07B9CE/#3969E7/#7D2AE7`、Discord `#5865F2`、Facebook `#1877F2`。
- 规律:2026 主流 accent 收敛在 **电蓝—靛蓝—紫** 色域(#0041D9~#6E56CF),辅以 **荧光青/青柠(Aqua/Lime)做数据高亮**;暖调站点用 Amber/Gold 点缀。

---

## 3. 排版趋势(字号/字重/字距组合,token 级)

### 3.1 超大 display + 紧 tracking

- Tailwind v4.3 官方字号阶(含内置行高):`text-5xl` 48px/lh1 → `text-6xl` 60px/lh1 → `text-7xl` 72px/lh1 → `text-8xl` 96px/lh1 → `text-9xl` 128px/lh1;正文侧 `text-sm` 14px(lh 1.25/0.875≈1.43)、`text-base` 16px/1.5、`text-xs` 12px。来源:https://tailwindcss.com/docs/font-size
- 官方 tracking token:`tracking-tighter -0.05em`、`tracking-tight -0.025em`、`normal 0`、`wide +0.025em`、`wider +0.05em`、`widest +0.1em`(还可自定义 `--tracking-tightest: -0.075em`)。来源:https://tailwindcss.com/docs/letter-spacing
- **落地组合(深色图集站)**:
  - Hero display:`clamp(3.5rem, 8vw, 8rem)` / 字重 700–750 / `tracking:-0.03em~-0.05em` / `line-height:0.95~1`;
  - 区块标题:48px / 600 / `-0.02em` / lh 1.0;
  - 工作台正文:14px / 450(可变字体中间字重)/ 0 / lh 1.43;
  - 小标签:12px / 500 / `+0.05em` 大写——与 display 的负字距形成「一紧一松」的节拍。

### 3.2 可变字体排版

- MDN 权威定义:一个文件包含全部字重/宽度/样式;5 个注册轴 **wght/wdth/slant/ital/opsz**;优先用高层属性,`font-variation-settings` 仅用于自定义轴(轴名大小写敏感:注册轴小写、自定义轴大写)。来源:https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide
- 落地:① 用 `opsz` 让标题自动切 display 刻刀(Fraunces、Inter 的 opsz);② 用 wght 中间值(450/550)替代 400/600 的粗细跳变;③ 悬停微变重(400→500)只用于单行导航词,避免整段 reflow。
- 佐证:Vercel 官方字体 Geist 已形成 **Sans + Serif + Mono + Pixel 四家族**,Pixel 经 **ELSH 形状轴**(1/20/40/60/80 五档)变出五种像素形状,官方给出 `font-variation-settings: "ELSH" 20` 用法。来源:https://vercel.com/font

### 3.3 衬线混搭(display serif 回潮)与 mono 点缀

- 一手证据 1:Awwwards SOTD 得奖字体过滤器中,衬线 display 出现频次极高——Canela、Editorial New、Fraunces、EB Garamond、Didot;grotesk 主力为 Druk/ABC AT Druk/GT Founders/Aeonik/Basel Grotesk;mono 为 Azeret Mono、Fragment Mono、Courier Prime。来源:https://www.awwwards.com/awards-of-the-day/ (过滤面板正文)
- 一手证据 2:Vercel 2026 官宣 "New Geist Serif is now available"——工程系品牌补衬线声部。来源:https://vercel.com/font
- **三声部组合(token 级)**:
  - 声部一·Display serif:标题/引语(自托管 Fraunces 可变字体,`opsz` 自动;免费替代:Editorial New 仅授权站内展示需许可,谨慎);
  - 声部二·UI sans:全部界面(Inter Variable / Geist Sans;14px/450);
  - 声部三·Mono:meta、计数、编号、快捷键(11–12px / 500 / `+0.05em` / 大写;数字加 `font-feature-settings:"tnum"` 对齐)。例:卡片角标 `SOTD · NOV 20 · 7.3/10` 用 mono 即 Awwwards 卡片工艺的复刻。
  - 比例:全页字体预算 = sans 85% / serif 10% / mono 5%。

---

## 4. 动效趋势(流行/过气 + 时长缓动 token)

### 4.1 滚动驱动:从 scrollytelling 转向「wayfinding」

- **标准能力已就位(2026)**:CSS Scroll-driven Animations——`animation-timeline: scroll()/view()`、`animation-range`、`scroll-timeline/view-timeline`(MDN 模块页 2026-10-05 更新,还列出新的 **animation-trigger / CSS animation triggers 模块**,滚动触发即将纯 CSS 化)。来源:https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- **风向判断(Webflow 官方)**:2026 年的滚动趋势明确是「scroll as a navigation tool」——进度指示、步骤计数、滚动速度计(Dropbox Dash McLaren F1 案例);**并明确写道 "This isn't about scrollytelling or narrative experiences"**——叙事型滚动页让位于导航型滚动。来源:https://webflow.com/blog/web-design-trends-2026
- **落地 token**:顶部全站进度条 `animation-timeline: scroll(root); animation: grow linear;`;卡片入场 `animation-timeline: view(); animation-range: entry 0% / entry 60%;`;时长感对齐 Motion tween 默认 `0.3s`(来源:motion.dev,见 4.3)。
- 成熟度:进度条/步骤指示 **适合工作台**;长叙事 scrollytelling **只适合营销页**。

### 4.2 视图过渡(View Transitions):图集站的杀手锏

- MDN 官方:SPA 用 `document.startViewTransition()`;MPA 用 `@view-transition { navigation: auto }` + `pagereveal`/`pageswap` 事件;支持元素级(`view-transition-name`)与类型化过渡。来源:https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- 落地:图集站筛选/排序/搜索时,把每张卡的 `view-transition-name: card-<id>` 设上,DOM 重排自动获得位置插值动画——这是比任何 JS 动画库都便宜的 FLIP。
- 成熟度:**工作台核心**(筛选器、收藏夹、分页)。

### 4.3 物理弹簧(已产品化为默认值)

- Motion(原 Framer Motion)官方 transition 文档:tween 默认时长 **0.3s**(多关键帧 0.8s);spring 官方默认 **bounce 0.25、damping 10、mass 1**;duration-based spring 用 `visualDuration`(如 `visualDuration: 0.5, bounce: 0.25`);拖拽惯性 `timeConstant` 默认 700;`restSpeed 0.1 / restDelta 0.01` 停止阈值;ease 名录含 `backOut/anticipate`。来源:https://motion.dev/docs/react-transitions
- **落地 token**:菜单/弹层 = duration-based spring(`visualDuration:0.25, bounce:0.15`);磁吸按钮位移 = spring(`bounce:0.25` 官方默认即可);拖拽画廊 = inertia 默认。
- 成熟度:**工作台基础件**(一切「跟手」的交互);营销页同源。

### 4.4 光标交互(spotlight / 磁吸):已组件化,克制使用

- 证据:Magic UI 组件清单含 `Magic Card`(spotlight 跟随光标照亮卡面)、`Lens Pointer`、`Smooth Cursor`、`Interactive Hover Button`、`Glare Hover`;Motion 官方 Motion UI 套件含 `<Cursor>` 组件。来源:https://magicui.design/docs/components 、https://motion.dev/docs/react-transitions (侧栏 Motion UI 组件表)
- **落地 token**:spotlight = `radial-gradient(360px circle at var(--mx) var(--my), rgba(124,226,254,.08), transparent 60%)`(板 C 色值);磁吸 = 指针进入 24px 半径内向光标平移 ≤4px,spring 回弹。
- 成熟度:spotlight **营销页主秀 / 工作台仅限空态与首屏 hero**(数据密集区慎用,避免抢焦点);磁吸只给主 CTA。

### 4.5 文字揭示 / ticker / scramble

- 证据:Magic UI `Text Animate`、`Blur Fade`、`Text Reveal`、`Dia Text Reveal`、`Typing Animation`、`Word Rotate`、`Number Ticker`、`Animated Shiny Text`、`Scramble Text 系(Morphing/Spinning Text)`;Motion UI 官方组件含 `<Typewriter> <ScrambleText> <AnimateNumber> <Ticker>`。来源:https://magicui.design/docs/components 、https://motion.dev/docs/react-transitions
- **落地 token**:网格首屏加载 = blur-fade + 40ms stagger + `cubic-bezier(0,0,0.2,1)`;统计数字 = number ticker 600ms;筛选结果计数用 ticker。
- 成熟度:逐字 reveal 只上营销 hero;工作台只保留 **blur-fade + number ticker** 两件。

### 4.6 marquee / 无缝滚动带

- 证据:Magic UI `Marquee` 组件在列;Motion 官方 `<Ticker>` 组件。来源同上。
- **落地 token**:精选画廊带 = 双行反向 marquee,`linear` 匀速、hover 暂停、两端 `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`。
- 成熟度:**营销首页可用**;工作台内只做「最新收录」横带,不做全页滚动。

### 4.7 glow / 渐变边框

- 证据:Magic UI `Border Beam`(1px 渐变沿边框流动)、`Shine Border`、`Neon Gradient Card`、`Backlight`。来源:https://magicui.design/docs/components
- **落地 token**:精选卡 hover 时 border-beam 启动(周期 6s);常态卡只用 `border: 1px solid #363a3f`(板 A);focus ring 用 `--accent-tint` 外扩 2px。
- 成熟度:边框流光 **全站可点睛**;大面积 glow(整段背景辉光)只适合营销页。

### 4.8 过气清单(本次证据所及)

- **全屏 aurora/mesh 渐变 hero**:峰值已过——渐变全线收缩为线/字/背光三种受控形态(见 2.3),且 Webflow 2026 把「专有效果」列为对同质化的反动。来源:https://webflow.com/blog/web-design-trends-2026
- **砖石风 Brutalism**:httpster 全库 3116 站中 Brutalist 仅 **5** 例(vs Minimal 847、Typographic 1193)——已从主流退潮。来源:https://httpster.net
- **经典 parallax 叙事**:Webflow 2026 明确 "去年(2025)的滚动趋势是叙事滚动,今年是滚动导航"。来源同上。
- **键盘打字机 Typewriter 长文案**:组件虽在,但 Webflow 2026 趋势三「Minimalism in copy」主张极短文案——打字机适合一句 tagline,不适合段落。来源:https://webflow.com/blog/web-design-trends-2026 、https://magicui.design/docs/components
- **未找到项(如实标注)**:Coolors 官方 `coolors.co/trends` 趋势页返回 404(本次实测),其 2026 官方色彩报告未找到;Awwwards 四维评分细则页 404,未核验;godly.website 作品级共性因正文 JS 渲染未能逐站核验。

---

## 5. 深色图集站的 14 项落地速查(把上面全部收口)

| 层 | 规范 | 出处 |
|---|---|---|
| 信息架构 | Flow > Screen > UI Element 三级 + glossary 标签制 | mobbin.com/glossary |
| 筛选器 | Style 标签(含 Big Type/Dark Colors/Gradient/Cards/Visible Borders)+ Typography + Color + 排序 | land-book.com |
| 卡片 | 12px 圆角截图卡、1px #363a3f 描边、hover 提亮 #272a2d、mono 角标 | land-book + Radix slate |
| 得分徽章 | jury 分 + HM/DEV 徽章体系(公开阈值) | awwwards.com/faqs |
| 三维评分 | UI/UX/INN 三轴公开均分 | cssdesignawards.com |
| 标签计数 | 每个 style 标签显示收录数 | httpster.net |
| 筛选动画 | View Transitions(`view-transition-name: card-<id>`) | MDN View Transition API |
| 进度 | 顶部 1px `scroll(root)` 进度条 | MDN scroll-driven |
| 配色 | 板 A 默认/板 C 数据/板 B 营销,共享明度框架 | Radix dark unpkg 实测 |
| 文字 | 14px/450 正文、#edeef0/#b0b4ba 双档 | Radix + Tailwind docs |
| 标题 | clamp(56px,8vw,128px)/700/-0.03em/lh0.95 | Tailwind docs |
| 三声部 | Fraunces(标题)+ Inter/Geist(UI)+ Azeret Mono 类(meta) | Awwwards fonts + vercel.com/font |
| 弹簧 | Motion 默认 bounce 0.25/damping 10;hover 150ms/ease-out | motion.dev + Tailwind easing |
| 点睛 | border-beam(精选卡)+ spotlight(首屏)+ number ticker(计数) | magicui.design/docs/components |

---

## 10 个签名巧思(该设计体系最能体现美学的具体细节)

1. **全站顶部 1px 滚动进度条挂在 `<html>` 上,用纯 CSS `animation-timeline: scroll(root)` 实现,零 JS。** 出处:https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
2. **筛选/排序用 View Transitions:每张卡带 `view-transition-name: card-<id>`,重排自动插值,像卡片"自己走"进新位置。** 出处:https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
3. **卡片常态 1px `#363a3f` 描边,仅精选卡 hover 启动 6s 周期的 conic-gradient border-beam 流光——渐变预算只给 5% 的卡。** 出处:https://magicui.design/docs/components (Border Beam) + Radix slate-6 色值(unpkg `@radix-ui/colors@3.0.0/slate-dark.css`)
4. **首屏 spotlight:页面压暗至 78%,`radial-gradient(360px … rgba(124,226,254,.08))` 跟随光标照亮画廊,手电筒式策展。** 出处:https://magicui.design/docs/components (Magic Card) + 板 C cyan-11 色值
5. **每个 style 标签显示收录计数(如 Dark 259 / Minimal 847),让策展密度本身成为信息。** 出处:https://httpster.net (侧栏计数)
6. **卡片角标全部 mono 11px/500/+0.05em 大写 + `tnum`:`SOTD · NOV 20 · 7.3/10`,编号美学一眼高级。** 出处:https://www.awwwards.com/awards-of-the-day/ (字体过滤器 Azeret Mono/Fragment Mono) + https://tailwindcss.com/docs/letter-spacing
7. **标题用可变衬线 Fraunces(`opsz` 自动切换 display 刻刀),正文 Inter 14px/450,meta 用 mono——三声部 85/10/5 配比。** 出处:https://www.awwwards.com/awards-of-the-day/ (Canela/Editorial New/Fraunces 得奖实录) + https://vercel.com/font (Geist Serif 官宣)
8. **深色底禁 `#000`:用带 hue 的 slate `#111113` 起步、卡片逐级提亮至 `#212225`,文字顶格 `#edeef0`(APCA Lc90)。** 出处:unpkg `@radix-ui/colors@3.0.0/slate-dark.css` + https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
9. **统计数字用 Number Ticker(600ms 滚动上数),收藏/浏览量变动时数字"跳一下"。** 出处:https://magicui.design/docs/components (Number Ticker) + https://motion.dev/docs/react-transitions (AnimateNumber/tween 0.3s)
10. **磁吸主 CTA:光标进入 24px 半径按钮向指针平移 ≤4px,松手以 Motion 官方默认弹簧(bounce 0.25/damping 10)回弹——全站唯一的"物理感"时刻。** 出处:https://motion.dev/docs/react-transitions (spring 默认值原文)

---

## 附:本次未能核验清单(诚实记录)

- Pantone Cloud Dancer 的官方 HEX:官方页仅给 PANTONE 11-4201 色号与文案,HEX **未找到**(不编造)。
- Awwwards 四维评分细则(Design/Usability/Creativity/Content 权重):`/evaluation-system/` 404,**未找到**。
- Coolors 2026 官方趋势:`coolors.co/trends` 404,**未找到**。
- godly.website 逐作品共性:网格 JS 渲染,仅核验到分类结构(All/Web/Interface/Branding/Motion/Illustration/Posters/Print)。
- Motion spring 的 stiffness 官方默认值:文档抓取正文未给出可信数值(仅示例值),故本报告只引用已核验的 bounce/damping/mass/tween 默认。
- Interface Lovers 原「截图画廊」页:站点已转型 Lovers Magazine,历史画廊形态**未找到**现势入口。
