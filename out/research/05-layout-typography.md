# 现代前端布局体系与排版体系调研

- 调研日期：2026-11-20
- 方法说明：内置 WebSearch 配额耗尽、fox_search 引擎返回无关结果、DDG/Mojeek 反爬受阻，故本次调研全部改用 **直连抓取一手来源**（W3C/WHATWG/CSSWG 规范、MDN、WebKit/Chrome 官方博客、字体官方仓库），关键参数经本地下载 HTML 后逐条 grep 原文提取交叉核对。凡未能在原文中验证的表述，均标注「未证实」。

---

## 一、布局模式

### 1. Flexbox（弹性盒，经典一维布局）
- 命名：Flexbox / CSS Flexible Box Layout
- 关键参数：`flex-direction`、`flex-wrap`、`flex: 1 1 0%`、`justify-content` / `align-items` / `align-content`（Box Alignment 属性族）、`gap`；用于组件级一维排布，与 Box Alignment 模块共享对齐属性
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout （MDN 模块页与各指南条目，经页面抓取确认存在）

### 2. CSS Grid + grid-template-areas（二维网格与命名区域，Holy Grail/圣杯布局的标准实现）
- 命名：CSS Grid Layout / grid-template-areas
- 关键参数：`grid-template-columns: ... / grid-template-rows: ...`；`grid-template-areas: "header header" "sidebar main" "footer footer"` —— 每个字符串生成一行、每单元格生成一列，同名 token 合并为命名区域，可被 grid-placement 属性引用；MDN 标注 Baseline Widely available（自 2017-10 起）
- 说明：MDN Layout Cookbook 未设「Holy Grail」专页（已验证检索无此条目），圣杯布局在实践中以 grid-template-areas 重排实现（表头/侧栏/主栏/页脚一声明搞定）
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas ；布局食谱：https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook ；Grid 完全指南：https://css-tricks.com/snippets/css/complete-guide-grid/

### 3. minmax/auto-fit 流式响应网格（无断点网格惯例）
- 命名：auto-fill / auto-fit + minmax() 流式网格
- 关键参数：`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` —— CSS-Tricks 称之为「CSS Grid 中的顶级技巧之一」；`auto-fill` 尽量多排列（允许空列），`auto-fit` 将已有列拉伸填满空间（丢弃空列）；轨道可用 `minmax(10px, 1fr)`、`min-content`、`max-content`
- 来源：https://css-tricks.com/snippets/css/complete-guide-grid/ （原文抓取核对）

### 4. Subgrid（子网格，跨组件对齐）
- 命名：CSS Subgrid
- 关键参数：`grid-template-columns: subgrid` / `grid-template-rows: subgrid`，继承父网格轨道定义，用于嵌套组件对齐父网格
- 状态：MDN 标注 Baseline Widely available（自 2023-09 起）
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid

### 5. Masonry/瀑布流 → CSS Grid Lanes（2025-2026 最新定论）
- 命名：Grid lanes layout（曾称 masonry layout / waterfall layout；原 item-flow 提案已弃）
- 规范现状（一手验证）：
  - CSS Grid Layout Module Level 3 草案将「Grid lanes layout」定义为常见 Web 设计模式：条目逐个放入列轨道，另一轴内依次堆叠；未显式放置的条目进入「剩余空间最多的列」（典型示例：Pinterest 搜索结果页）。草案 Recent Changes（基于 2026-01-21 Working Draft）明确「Dropped the item-* proposal for unified flow」，即此前的 item-flow/item-* 统一提案已被放弃，收敛为 grid lanes。
  - 语法（WebKit 官方示例）：`display: grid-lanes; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;`，可在 Safari Technology Preview 234 试用（WebKit 2025-12-19 官宣，作者 Jen Simmons、Elika Etemad、Brandon Stewart）
  - 争议史：2024-09 CSSWG 就 mixed track-sizing 达成共识并发布 css-grid-3 FPWD；WebKit 2024-10-21 发起语法征询（文末 2025-12 更新注明辩论已解决）；Chrome 团队 2024-04-30 提出独立布局模式替代方案（Rachel Andrew），该文现已加注「代码示例基于早期草案，现为 Grid lanes layout，以 css-grid-3 为准」
- 来源：
  - https://drafts.csswg.org/css-grid-3/
  - https://webkit.org/blog/17660/introducing-css-grid-lanes/
  - https://webkit.org/blog/16026/css-masonry-syntax/
  - https://developer.chrome.com/blog/masonry
- 生产环境注意：正式浏览器尚未普遍可用（WebKit 仅 STP 预览），落地仍需 columns/JS 兜底。Firefox 支持时间表：未查到可靠资料。

### 6. Container Queries（容器查询，组件级响应式）
- 命名：CSS Container Queries（size queries + style queries）
- 关键参数：`container-type: size | inline-size`（inline-size 最常用）、`container-name`、`container` 简写；`@container (min-width: 40rem) { ... }`；可查询特征限定为 width / height / inline-size / block-size / aspect-ratio / orientation；容器单位 `cqw/cqh/cqi/cqb/cqmin/cqmax`；style() 函数 notation 可对自定义属性计算值做样式查询
- 状态：MDN `container-type` 标注 Baseline Widely available（自 2023-02 起，即 Chrome/Edge 105 与 Safari 16（2022）之后 Firefox 补齐的时间点）
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/container-type ；https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries
- 注意：style() 样式查询的各家浏览器支持矩阵未逐家验证——未证实。

### 7. position: sticky（粘滞区域）
- 命名：Sticky positioning
- 关键参数：`position: sticky; top: 20px;` —— 元素随容器滚动，直到触达最近滚动祖先的偏移阈值后停留；不脱离文档流
- 状态：MDN `position` 标注 Baseline Widely available（自 2015-07 起）
- 典型应用：MDN Layout Cookbook 收录 Sticky footers（内容不足时页脚贴底：Grid/Flexbox 实现）与 Split navigation 配方
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/position ；https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook

### 8. Split View（分栏/可调面板，无 CSS 原生规范）
- 命名：Split view / resizable panels
- 现状：CSS 无原生可拖拽分栏标准；生态事实标准为 React 生态的 react-resizable-panels：`<PanelGroup>`/`<Panel>` 组件分组、拖拽手柄、支持 WAI-ARIA `separator` 角色的键盘可访问性（方向键调整、gridline 提升 a11y）
- 来源：https://github.com/bvaughn/react-resizable-panels （README 一手核对）
- 说明：MDN Cookbook 的「Split navigation」是视觉分隔的导航配方，与桌面式可拖拽分栏并非同一概念，注意区分。

### 9. Bento Grid（便当盒网格）
- 命名：Bento grid / bento box layout
- 现状：属设计趋势而非规范；未找到规范级或权威设计组织的正式定义（未找到可靠资料）。社区证据：BentoGrids 画廊站自述「a curated collection of bento designs for your inspiration」（meta description 一手核对）
- 实现惯例：以 CSS Grid 命名区域（条目 2）或 auto-fit 流式网格（条目 3）拼装不等尺寸卡片，卡片间距一致、行列跨度不对称
- 来源：https://bentogrids.com/ （配合 CSS-Tricks/MDN 网格机制来源）

### 10. Intrinsic Design（内在式设计）
- 命名：Intrinsic Web Design（内在式网页设计）
- 定义来源：Jen Simmons 在 An Event Apart DC 2019 的演讲《Designing Intrinsic Layouts》（2020-03-10 发布；原站已下线，经 Wayback Machine 存档核对：「Combining CSS Grid, Flexbox…」创建布局工具箱，强调让内容与容器自身尺寸驱动设计而非硬编码断点）
- 技术抓手：内在尺寸关键字 min-content / max-content / fit-content、`minmax()` 与 `auto-fit` 流式网格（条目 3）、`clamp()/min()/max()`（条目 11）
- 来源：https://web.archive.org/web/20200814023809/https://aneventapart.com/news/post/designing-intrinsic-layouts-aea-video （存档一手核对，内含 Vimeo http://vimeo.com/380795929）

### 11. 响应式策略演进：断点 → 流式 → 组件级
- 演进链条（各环节均有独立来源，非单页综述）：
  1. 媒体查询断点：`@media` 按视口宽度切换样式（MDN 媒体查询模块）
  2. 流式/内在式：auto-fit+minmax 网格（CSS-Tricks）与 clamp() 流式字阶/间距（Utopia，见 12/13），减少断点数量
  3. 组件级响应：container queries 让组件依据自身容器宽度而非视口自适应（MDN container-type，Baseline 2023-02）——从「页面级断点」转向「组件级断点」
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/container-type ；https://css-tricks.com/snippets/css/complete-guide-grid/ ；https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries
- 说明：「平板/桌面适配惯例数值清单」无单一权威来源——未找到可靠资料，仅能以 container queries + 流式函数 + 安全区组合为已验证惯例。

---

## 二、多形态适配（流式缩放与异形屏）

### 12. clamp() 流式字阶（fluid typography 核心函数）
- 命名：clamp() CSS function
- 关键参数：`clamp(最小值, 首选值, 最大值)` 三参数；首选值一般写 `rem + vw` 线性插值，如 MDN 官方示例 `font-size: clamp(1rem, 2.5vw, 2rem)`
- 状态：Baseline Widely available（自 2020-07 起）
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()

### 13. Utopia 流式字阶生成器（modular scale × clamp）
- 命名：Utopia fluid type scale calculator
- 关键参数：输入最小/最大视口宽度、正文字号（body size）、比例（ratio，可选 1.067/1.125/1.2/1.25 Minor Third/1.333 Major Third/1.414/1.5/1.618…/2）、步数；输出 `--step--2 … --step-N` CSS 变量，形如实测默认配置输出：
  `--step-0: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem); --step-1: clamp(1.35rem, 1.2631rem + 0.3864vw, 1.5625rem);`
- 来源：https://utopia.fyi/type/calculator/ （页面 HTML 实测输出一手核对）

### 14. 流式间距（fluid spacing）
- 命名：Utopia fluid space calculator
- 关键参数：同 clamp 插值法生成间距标尺，实测输出示例：
  `--space-3xs: clamp(0.3125rem, 0.3125rem + 0vw, 0.3125rem); --space-2xs: clamp(0.5625rem, 0.5369rem + 0.1136vw, 0.625rem); --space-xs: clamp(0.875rem, 0.8494rem + 0.1136vw, 0.9375rem); --space-s: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)`
  支持 multipliers（如 0.75|0.5|0.25 与 1.5|2|3|4|6）派生间距倍数
- 来源：https://utopia.fyi/space/calculator/ （实测输出一手核对）

### 15. 安全区 safe-area（异形屏适配）
- 命名：safe-area-inset 环境变量 / env()
- 关键参数：`env(safe-area-inset-top | safe-area-inset-right | safe-area-inset-bottom | safe-area-inset-left)`，可带回退值 `env(safe-area-inset-right, 1em)`；WebKit 官方说明：viewport meta 新增 `viewport-fit`，取 `auto`（默认，自动内缩）或 `cover`（铺满全屏、配合 env() 自行留边）；`env()` 于 iOS 11 以 `constant()` 名称引入，自 Safari Technology Preview 41 / iOS 11.2 beta 起改名 `env()`
- MDN `env()` 页还收录同族环境变量：`titlebar-area-*`（桌面 PWA 标题栏）、`viewport-segment-*`（折叠屏）
- 来源：https://webkit.org/blog/7929/designing-websites-for-iphone-x/ ；https://developer.mozilla.org/en-US/docs/Web/CSS/env

### 16. 折叠屏 viewport segments（实验性）
- 命名：viewport-segments 媒体特征 / env(viewport-segment-*)
- 关键参数：`@media (horizontal-viewport-segments: 2)` —— 取整数 ≥1；非折叠设备、已展开或闭合（连续姿态）的折叠设备、单屏均为 1，跨铰链双屏为 2；配合 `env(viewport-segment-right 0 0)` / `env(viewport-segment-width 0 0, 40%)` 定位分屏区域
- 状态：MDN 标注 **Limited availability / Experimental**（明确「not Baseline」），不宜直接生产使用；各家浏览器正式发布版本号未逐一核实——未证实
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/@media/horizontal-viewport-segments ；https://developer.mozilla.org/en-US/docs/Web/CSS/env ；CSS Viewport 规范草案：https://drafts.csswg.org/css-viewport/
- 补充：折叠屏/平板/桌面三者统一的适配惯例清单未找到可靠资料；当前生产惯例以「container queries + clamp 流式 + safe-area」组合为主（见条目 6/12/15）。

---

## 三、排版体系

### 17. 字阶：Modular Scale（模数比字阶）
- 命名：Modular scale / type scale
- 关键参数：以「基准（base，正文字号）× 比率（ratio）」生成一组标尺数字；Tim Brown modularscale.com 计算器提供比率选项：15:16 小二度、8:9 大二度、5:6 小三度、4:5 大三度、3:4 纯四度、1:√2 增四/减五度、2:3 纯五度、5:8 小六度…；多基准+多比率构成「multi-stranded modular scale（多股模数标尺）」
- 来源：https://www.modularscale.com/ （页面文案一手核对）

### 18. 行高与字距：WCAG 2.2 Text Spacing 阈值
- 命名：WCAG 2.2 Success Criterion 1.4.12 Text Spacing（理解文档）
- 关键参数（不改变其他属性时内容必须可用）：
  - 行高（line height）≥ 字号的 **1.5 倍**
  - 段落间距 ≥ 字号的 **2 倍**
  - 字距（letter spacing）≥ 字号的 **0.12 倍**
  - 词距（word spacing）≥ 字号的 **0.16 倍**
- 来源：https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html （原文一手核对）

### 19. 行长（line length）
- 命名：Line length
- 关键参数：Butterick《Practical Typography》建议平均行长 **45–90 字符（含空格）**，约 2–3 个字母表长度；过长导致垂直追踪困难
- 来源：https://practicaltypography.com/line-length.html （原文一手核对）
- 注：传统 45–75 字符说法与 Butterick 45–90 略有出入，本报告以已核对来源为准。

### 20. 可变字体（Variable Fonts）
- 命名：Variable fonts / OpenType 字体变体（'fvar' 表）
- 关键参数：五个注册轴 **wght（字重）、wdth（字宽）、slnt（倾斜）、ital（斜体）、opsz（光学字号）**，注册轴的取值标尺在轴注册时定义、各字体可支持子区间（OpenType 规范原文）；自定义轴须大写字母命名；高级语法 `font-variation-settings: "wght" 375, "GRAD" 88`，轴名大小写敏感，且一旦声明须整体重申所有轴值
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide ；https://learn.microsoft.com/en-us/typography/opentype/spec/otvaroverview

### 21. 字体加载策略：font-display 与 FOUT/FOIT
- 命名：font-display（@font-face 描述符）；相关现象 FOIT（不可见文本闪烁）/FOUT（后备字体闪烁）
- 关键参数（MDN 一手核对）：三个时间周期——Font block period（不可见后备字渲染）、Font swap period（可见后备字渲染）、Font failure period（按加载失败处理）；五个取值：`auto`（浏览器自定义）、`block`（短 block 期 + 无限 swap 期）、`swap`（极短 block 期 + 无限 swap 期）、`fallback`（极短 block 期 + 短 swap 期）、`optional`（极短 block 期 + 无 swap 期）
- 数值表（web.dev font-best-practices 一手核对）：Block：block 2–3 秒 / swap 无限；Swap：0ms / 无限；Fallback：100ms / 3 秒；Optional：100ms / 无
- 工程惯例（同文一手核对）：优先自托管字体；`<link rel="preload">` 可提前发现字体文件但会挤占其他资源；字体交换可能引发布局偏移影响 CLS，建议同时加载度量兼容的后备字体
- 状态：font-display Baseline Widely available（自 2020-01 起，MDN）
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display ；https://web.dev/articles/font-best-practices

### 22. 中西文混排与 CJK 排版要点（W3C clreq）
- 命名：《Requirements for Chinese Text Layout 中文排版需求》（W3C 中文布局任务团，Group Note Draft）
- 关键参数（原文一手核对）：
  - 混排字距：原则上汉字与西文字母、阿拉伯数字之间使用**不多于四分之一个汉字宽（≤0.25em）**的字距或空白；西文出现在行首/行尾时不加
  - 行内调整：中西间距可从默认值（如 1/4 汉字宽）拉伸，多处时同时等量处理，最大可拉大到半个汉字宽（0.5em）；实践中不少排版风格只允许拉伸到 1/3 汉字宽，或将中西间距固定不参与调整
  - 段首缩进：以两个汉字宽为标准；多栏排版每栏字数少时有用一字缩进的变通
  - 对齐基线：除段落末行外每行行尾应对齐（两端对齐原则）；所有汉字/标点字框为正方形
  - 行距：字间距离一般不超过字号
  - 省略号规则引用 GB/T 15834—2011：两省略号连用占四字宽且须独占一行
- 来源：https://www.w3.org/TR/clreq/

### 23. CJK 自动加间距：text-autospace（2025 新基线）
- 命名：CSS text-autospace
- 关键参数：`normal | no-autospace | ideograph-alpha | ideograph-numeric | punctuation | insert | replace`，可组合如 `ideograph-alpha ideograph-numeric punctuation`；在排版引擎层面自动为汉字与西文/数字之间插入间距（即落实 clreq 的 ≤1/4 汉字宽惯例），无需在文本中手工插空格字符
- 状态：MDN 标注 **Baseline 2025 Newly available（自 2025-11 起）**
- 来源：https://developer.mozilla.org/en-US/docs/Web/CSS/text-autospace

### 24. 开源字体：Inter
- 命名：Inter（rsms/Rasmus Andersson）
- 关键参数：官网技术规格一手核对——UPM 2048；可变轴 **opsz 14–32、wght 100–900**，固定轴 ital [0, 9.4°]；x-height：opsz=14 时 1118 UPM、opsz=32 时 1056 UPM（小光学字号配高 x 高提升可读性，大光学字号 text/display 双光学设计）；GitHub 仓库一手核对——OFL-1.1 许可、9 个静态字重（Thin 100–Black 900，含斜体）、可变字体发行、OpenType 特性（上下文替换、slashed zero、表格数字）；Web 用法提供 'Inter'/'Inter var' @supports 分发与 rsms.me CDN；Figma、GitLab、NASA 等采用；仓库 20.1k stars
- 来源：https://github.com/rsms/inter ；https://rsms.me/inter/

### 25. 开源字体：Geist（Vercel）
- 命名：Geist（Sans / Serif / Mono / Pixel 四族）
- 关键参数：README 一手核对——SIL Open Font License 1.1；npm 包 `npm i geist`；Google Fonts 提供 Geist / Geist Mono / Geist Pixel；变量字体可按 `ELSH` 轴选择 pixel 形状；Pixel/Serif 按入口点拆分按需加载
- 来源：https://github.com/vercel/geist-font

### 26. 开源字体：思源黑体 Source Han Sans
- 命名：Source Han Sans（思源黑体，Adobe）
- 关键参数：官方 README 一手核对——开源 Pan-CJK 字体，OFL 1.1；**七个字重**；Super OTC 单文件含 5 语言 × 7 字重共 **45 款字体**；提供 **Variable OTC**（可变字体版，含半宽 HW 变体）；另有按语言子集（含 WOFF2 子集）部署格式
- 来源：https://github.com/adobe-fonts/source-han-sans （README release 分支一手核对）

---

## 四、「布局/排版条目 → 命名 → 关键参数 → 来源」速查清单

| # | 条目 | 命名 | 关键参数 | 来源 URL |
|---|------|------|----------|----------|
| 1 | 一维布局 | Flexbox | flex-direction / justify-content / align-items / gap | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout |
| 2 | 二维网格 | CSS Grid + grid-template-areas | 命名区域字符串；Baseline 2017-10；圣杯布局标准实现 | https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas |
| 3 | 无断点网格 | auto-fit + minmax | repeat(auto-fit, minmax(250px, 1fr))；auto-fill 保留空列 | https://css-tricks.com/snippets/css/complete-guide-grid/ |
| 4 | 子网格 | Subgrid | subgrid 轨道继承；Baseline 2023-09 | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid |
| 5 | 瀑布流 | CSS Grid Lanes（原 masonry/item-flow 已弃） | display: grid-lanes + repeat(auto-fill, minmax(250px,1fr))；STP 234 预览 | https://drafts.csswg.org/css-grid-3/ ；https://webkit.org/blog/17660/introducing-css-grid-lanes/ |
| 6 | 组件级响应 | Container Queries | container-type: inline-size；@container；cqw 单位；Baseline 2023-02 | https://developer.mozilla.org/en-US/docs/Web/CSS/container-type |
| 7 | 粘滞区域 | position: sticky | sticky + top 偏移；Baseline 2015-07 | https://developer.mozilla.org/en-US/docs/Web/CSS/position |
| 8 | 分栏面板 | Split view / resizable panels | PanelGroup/Panel 拖拽 + WAI-ARIA separator 键盘可访问 | https://github.com/bvaughn/react-resizable-panels |
| 9 | 便当盒网格 | Bento grid | Grid 命名区域拼装不等卡片（趋势，无规范定义） | https://bentogrids.com/ |
| 10 | 内在式设计 | Intrinsic Web Design | min-content/max-content/fit-content + 流式网格；Jen Simmons AEA DC 2019 | https://web.archive.org/web/20200814023809/https://aneventapart.com/news/post/designing-intrinsic-layouts-aea-video |
| 11 | 流式取值函数 | clamp() | clamp(min, 首选, max)；Baseline 2020-07 | https://developer.mozilla.org/en-US/docs/Web/CSS/clamp() |
| 12 | 流式字阶生成 | Utopia type scale | --step-N: clamp(rem, rem+vw, rem)；比例 1.067–2 | https://utopia.fyi/type/calculator/ |
| 13 | 流式间距 | Utopia space scale | --space-3xs…N clamp 系列 + multipliers | https://utopia.fyi/space/calculator/ |
| 14 | 安全区 | safe-area-inset / env() | viewport-fit=cover + env(safe-area-inset-*)；constant()→env() 于 iOS 11.2 | https://webkit.org/blog/7929/designing-websites-for-iphone-x/ ；https://developer.mozilla.org/en-US/docs/Web/CSS/env |
| 15 | 折叠屏 | viewport-segments | (horizontal-viewport-segments: 2) + env(viewport-segment-*)；实验性非 Baseline | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/horizontal-viewport-segments |
| 16 | 模数字阶 | Modular scale | base × ratio（1.125/1.25/1.333/1.414/1.5/1.618…）；多股标尺 | https://www.modularscale.com/ |
| 17 | 行高/字距阈值 | WCAG 2.2 Text Spacing | line-height ≥1.5×、段落间距 ≥2×、字距 ≥0.12×、词距 ≥0.16× 字号 | https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html |
| 18 | 行长 | Line length | 平均 45–90 字符（含空格） | https://practicaltypography.com/line-length.html |
| 19 | 可变字体 | Variable fonts / OpenType fvar | 注册轴 wght/wdth/slnt/ital/opsz；自定义轴大写；font-variation-settings | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide ；https://learn.microsoft.com/en-us/typography/opentype/spec/otvaroverview |
| 20 | 字体加载 | font-display / FOUT / FOIT | block/swap/fallback/optional；100ms/3s 数值表；self-host 与 CLS 权衡 | https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display ；https://web.dev/articles/font-best-practices |
| 21 | 中西混排字距 | clreq 混排规则 | 汉-西间距 ≤1/4 汉字宽（行首尾不加）；拉伸 ≤1/2；段首缩进 2 字；行尾对齐 | https://www.w3.org/TR/clreq/ |
| 22 | CJK 自动间距 | text-autospace | ideograph-alpha/ideograph-numeric/punctuation；Baseline 2025 Newly available | https://developer.mozilla.org/en-US/docs/Web/CSS/text-autospace |
| 23 | 无衬线正文字体 | Inter | wght 100–900 + opsz 14–32；UPM 2048；OFL 1.1；9 静态字重 | https://github.com/rsms/inter ；https://rsms.me/inter/ |
| 24 | 产品 UI 字体 | Geist | Sans/Serif/Mono/Pixel；OFL 1.1；npm i geist；Google Fonts 上架 | https://github.com/vercel/geist-font |
| 25 | Pan-CJK 中文字体 | 思源黑体 Source Han Sans | 7 字重；Super OTC 45 fonts；Variable OTC；OFL 1.1 | https://github.com/adobe-fonts/source-han-sans |

（共 25 条，超过 15 条目标）

---

## 五、未找到可靠资料 / 未证实事项（如实声明）

1. **Bento grid 权威定义**：仅找到社区画廊 bentogrids.com（meta 自述「curated collection of bento designs」）；未找到规范级或主流设计体系（如 Apple HIG / Material）的正式定义页面——未找到可靠资料。
2. **折叠屏 viewport segments 的各浏览器正式发布版本号**：MDN 仅确认 Limited availability/Experimental；Chrome/Safari/Firefox 具体版本未逐一核实——未证实。
3. **Firefox 对 CSS Grid Lanes 的支持时间表**：WebKit/Chrome/CSSWG 文档均未提及 Firefox 落地计划——未找到可靠资料。
4. **container queries style() 样式查询的各家浏览器支持矩阵**：MDN 文档确认该机制存在，但未逐家核对版本——未证实。
5. **「平板/桌面适配惯例数值清单」**：未找到单一权威来源，本报告仅以已验证机制（container queries/clamp/safe-area）的组合为惯例描述。
6. **传统「45–75 字符行长」说法**：本次核对到的 Butterick 来源为 45–90 字符，两者数值不一致，报告以 45–90 为准。
7. 内置 WebSearch 本周配额耗尽（重置时间 2026-12-03）、fox_search 引擎返回无关结果，故未能进行大规模多源交叉搜索；所有结论均基于上列一手 URL 的直接抓取与本地原文核对。

## 六、主要来源汇总

- W3C：《中文排版需求》 https://www.w3.org/TR/clreq/ ；WCAG 2.2 Text Spacing https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
- CSSWG 草案：CSS Grid L3（Grid lanes）https://drafts.csswg.org/css-grid-3/ ；CSS Viewport https://drafts.csswg.org/css-viewport/
- MDN：clamp() / env() / container-type / position / grid-template-areas / Subgrid / Variable fonts guide / font-display / text-autospace / horizontal-viewport-segments / Layout cookbook / CSS flexible box layout
- 官方博客：WebKit（CSS Grid Lanes、Masonry syntax、iPhone X safe-area）、Chrome for Developers（CSS masonry 替代方案）、web.dev（font-best-practices）
- 字体官方仓库：rsms/inter、vercel/geist-font、adobe-fonts/source-han-sans
- 工具站：Utopia（type/space calculator）、modularscale.com、Practical Typography、CSS-Tricks Grid 指南、BentoGrids、react-resizable-panels
