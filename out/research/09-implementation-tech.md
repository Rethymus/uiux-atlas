# 调研报告：参数可实时调节的设计演示站技术实现模式 与 设计→AI prompt 已有做法

调研日期：2026-11-20
调研方法说明：本次调研期间内置 WebSearch 与 web_reader 配额耗尽、DuckDuckGo/Bing/Mojeek 抓取被反爬拦截，故全部改用**直接抓取一手来源**（MDN、W3C/CG 规范草案、官方文档、GitHub README、npm registry、MDN browser-compat-data），并对关键兼容性数据做双源交叉印证（正文标注）。凡未能核实之处均在文末「未证实与未找到」一节如实声明。

---

## 1. 实时参数调节技术

### 1.1 CSS custom properties + range input（最基础的实时调节通道）

- 自定义属性定义与 `var()` 引用：MDN「Using CSS custom properties」给出 JS 读写标准 API——`element.style.getPropertyValue('--my-var')`、`getComputedStyle(el).getPropertyValue(...)`、`element.style.setProperty('--my-var', value)`，设置后所有引用 `var(--my-var)` 的属性即时生效；定义在 `:root` 即全局作用域。
  来源：https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- 「滑块→变量」联动的官方示例：Chrome 开发者文档的 style queries 文章中给出 `btnParent.style.setProperty('--theme', e.target.value)` 实现点击换主题的完整用例（换成 range input 的 `input` 事件即构成最常见的演示站参数面板）。
  来源：https://developer.chrome.com/docs/css-ui/style-queries
- 边界限制（MDN）：自定义属性**不能**在 media query / container query 的条件部分使用；`var()` 只能出现在属性值中，不能用于属性名、选择器；`var(--foo, red)` 的 fallback 是第一个逗号后的全部内容（易踩坑）；无效值在 `var()` 替换后才失效，回退为 initial/inherited 值——这正是需要 `@property` 的原因。
  来源：https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

### 1.2 @property：注册自定义属性，使参数可插值、可约束

- 作用：显式注册自定义属性，获得**类型检查（syntax）+ 初始值（initial-value）+ 继承开关（inherits）**；属于 CSS Houdini CSS Properties and Values API，可纯 CSS（`@property`）或 JS（`CSS.registerProperty()`）注册；属性名必须为 `--` 开头的 dashed-ident。
- 动画机制：注册后成为有类型、有初始值的"真实属性"，可在 `@keyframes` 中直接动画（MDN 示例：`--progress` 声明为 `<percentage>`，keyframes 里动画到 100%，驱动 `linear-gradient()` 色标做进度条）——未注册的自定义属性只能瞬时跳变，不能插值。
- 兼容性：MDN 标注 **Baseline 2024 Newly available（自 2024-07 起）**。
- 细节：`syntax: "*"` 时可省略 initial-value，否则必填且须"计算独立"（`10px` 合法、`3em` 因依赖父字体而非法）；缺 syntax/inherits 则整条规则被忽略。
  来源：https://developer.mozilla.org/en-US/docs/Web/CSS/@property
- 类型约束的价值：声明 `syntax:"<color>"` 后，`--box-color: peenk` 这类无效值会回退到 `initial-value`，而不是让整条声明变成 guaranteed-invalid。
  来源：https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

### 1.3 Style queries：CSS 层面"读参数做条件样式"

- 能力：`@container style(--theme: warm) { ... }` 基于**父元素的自定义属性值**切换子元素样式；当前浏览器**仅支持查询自定义属性**（查询普通 CSS 属性已入规范但无浏览器实现）；直接父元素无需 `container-type`，跨祖先需 `container-name`；可用 `and` 组合多条件。
- 用例：`--detail: new / low-stock` 控制卡片变体、`--sunny/--cloudy` 控制天气卡样式；配合 JS `setProperty` 做主题切换。
- 支持与限制：Chrome 文章给出的版本为 Chrome/Edge 111、Firefox 151、Safari 18；不能只查询属性"存在性"（如 `style(--detail)`）；范围查询 `style(30% <= --x < 60%)` 当时"未支持"。
  来源：https://developer.chrome.com/docs/css-ui/style-queries
- **交叉印证（MDN browser-compat-data，css/at-rules/container.json）**：`style_queries_for_custom_properties` = Chrome 111 / Firefox 151 / Safari 18（Edge mirror）；且 `range_syntax` 已有数据：**Chrome 142、Firefox 151 支持，Safari 尚未支持**——比 Chrome 文章更新，说明范围 style query 已部分落地。
  来源：https://raw.githubusercontent.com/mdn/browser-compat-data/main/css/at-rules/container.json

### 1.4 backdrop-filter：毛玻璃的标配实现

- 定义：对元素**背后**已绘制的像素施加滤镜（blur/brightness/contrast 等 `<filter-function>`，也支持 `url(#svg-filter)` 引用 SVG 滤镜）；元素背景必须半透明才能看到效果；不处理元素自身内容（与 `filter` 的区别）。
- 毛玻璃典型写法：`background: rgb(255 255 255 / 30%); backdrop-filter: blur(10px)` 或组合 `blur(4px) saturate(150%) brightness(60%)`。
- 兼容性：**Baseline 2024 Newly available（2024-09 起）**；旧 Safari 需 `-webkit-backdrop-filter` 前缀。
- 关键坑（backdrop root）：最近满足以下任一条件的祖先会**截断**毛玻璃效果——根元素、`filter`≠none、`opacity`<1、mask/clip-path≠none、自身有 backdrop-filter、mix-blend-mode≠normal、`will-change` 指向上述属性。父级设 `opacity:.9` 是"毛玻璃不生效"的最常见原因。
  来源：https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

### 1.5 SVG filter / WebGL 实现液态玻璃折射（Liquid Glass）

背景：Liquid Glass 是 Apple 于 2025-06-09 WWDC25 发布、随 iOS 26（2025-09-15 正式发布）推出的设计语言，圆角半透明、对内容与动态响应，灵感来自 visionOS。
来源：https://en.wikipedia.org/wiki/IOS_26
（注：Apple 开发者官网 Materials/HIG 页面为 JS 渲染，本次未能直接抓取官方原文；Apple 亦**未提供任何 web/CSS 实现**，下述均为社区实现。）

**折射的数学核心是 `feDisplacementMap`**：用位移图（in2）的通道值移动输入图像（in）的像素，公式 `P'(x,y) ← P(x + scale*(XC(x,y)-0.5), y + scale*(YC(x,y)-0.5))`，`scale` 控制最大位移量，`xChannelSelector/yChannelSelector` 指定用哪个颜色通道（如 R/G）决定 x/y 偏移；与 `feTurbulence` 噪声图配合可做扭曲/水波。
来源：https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap

**把它接到 backdrop 上（`backdrop-filter: url(#filter)`，即"对背后的像素做位移折射"）是社区液态玻璃的通用配方**（MDN 明确 backdrop-filter 支持 `url()` 引用 SVG 滤镜，见 1.4 来源）。代表实现（按 GitHub star 排序，均直接读取 README 核实）：

| 实现 | 路线 | 要点 |
|---|---|---|
| shuding/liquid-glass（1.2k★） | SVG 滤镜 | "Copy-paste Liquid Glass shader with SVG"，单文件贴入任意网站控制台即可用；基于其 svg-shaders 仓库；**demo 链接是一个 v0 对话**（作者用 v0 生成）。https://github.com/shuding/liquid-glass |
| ybouane/liquidglass（651★） | WebGL shader | 对任意 HTML 元素做折射+模糊+色差+光照；背景作兄弟节点被 shader 采样，动态内容需标 `data-dynamic` 逐帧重采样。https://github.com/ybouane/liquidglass |
| VII-Cae/hyalite--liquid-glass（273★） | SVG + backdrop-filter，无 WebGL | 把元素当作带倒角的玻璃板：按尺寸/圆角计算 lens map → 喂给 SVG 滤镜 → `backdrop-filter: var(--hyalite, blur(6px))`；参数全部可调（bevel/thickness/slope/dispersion/shade/rim/blur/light…），`slope>1` 时位移场"折叠"产生液态漩涡；**明确声明 SVG backdrop-filter 仅 Chromium 有效，其他浏览器回退普通 blur**。https://github.com/VII-Cae/hyalite--liquid-glass |
| leefanv/liqui-design（171★） | 无 WebGL | React 组件（基于 Base UI），一张 SVG 滤镜 + 预烘焙 map，宣称在 Safari/Firefox 也能折射。https://github.com/leefanv/liqui-design |
| Oliverrr2424/webgl-apple-liquid-glass（151★） | WebGL2 | squircle SDF 厚度场 → Snell 折射 + 色散 + 变量模糊；**为绕开"backdrop-filter: url() 仅 Chromium"的限制**，Safari/Firefox 与 Chrome 表现一致；元素保持 DOM（文字可选中、可读屏）；无 WebGL2 回退 backdrop-filter；npm 包 `apple-liquid-glass-webgl`。https://github.com/Oliverrr2424/webgl-apple-liquid-glass |
| nikdelvin/liquid-glass（119★） | 纯 CSS + SVG 滤镜 | iOS 26 Liquid Glass 复刻，位移映射 + 色差，Safari 自动回退 glassmorphism 模式。https://github.com/nikdelvin/liquid-glass |

工程结论（可从上述来源直接推出）：
- **CSS-only 折射 = feDisplacementMap + backdrop-filter: url()，兼容面只有 Chromium**；Safari/Firefox 需要回退 blur 或改走 WebGL 采样重绘。
- WebGL 路线跨浏览器一致但要自行采样页面像素（滚动/resize 同步），复杂度与体积显著上升（两仓库 README 均描述了这些成本）。

### 1.6 弹簧物理在前端的实现

- **Motion（前身 Framer Motion，当前 v14.x）**：官网定位 "Free and open source. Previously Framer Motion."；React/JS/Vue 三端统一包 `npm install motion`；vanilla 用法即 `animate(".box", { x: 100 }, { type: "spring", bounce: 0.3 })`。
  来源：https://motion.dev/ 、https://motion.dev/docs
- **useSpring**（Motion for React）：创建向目标做弹簧趋近的 motion value；两种用法——`useSpring(0, { stiffness: 300 })` 直接控制（`.set()` 弹簧趋近、`.jump()` 立即跳转），或 `useSpring(otherValue)` 跟踪另一个 motion value（适合指针跟随/滚动平滑）。
  来源：https://motion.dev/docs/react-spring
- **spring 完整参数与两档模式**（官方 transitions 文档，逐项读取）：
  - 物理模式：`stiffness`（默认 1，越高越突然）、`damping`（默认 10，0=无限振荡）、`mass`（默认 1，越大越迟钝，布局动画可 `"auto"`）、`velocity`（默认取当前速度）；
  - 时长模式：`duration` + `bounce`（默认 0.25，-1~1，0=临界阻尼）或 `visualDuration`——文档明确该模式"总是精确持续 duration、不吸收被中断的速度，**且可编译为纯 CSS**"（这就是弹簧→CSS 的桥梁，见下 linear()）；
  - 互斥规则：设置 stiffness/damping/mass 会覆盖 duration/bounce；
  - 停止条件：`restSpeed`（默认 0.1 单位/秒）与 `restDelta`（默认 0.01）同时满足。
  - 另：物理属性（x/scale）默认用 spring，opacity/color 等默认用 duration+easing。
  来源：https://motion.dev/docs/react-transitions 、https://motion.dev/docs/react-animation
- **React Spring**：自我定位 "a cross-platform spring-physics first animation library"，默认即弹簧，也支持 duration+easing；跨 `react-dom` / `react-native` / `react-three-fiber` / `react-konva` / `react-zdog`；基础 API `useSpring({ from, to })` + `<animated.div style={styles} />`。
  来源：https://github.com/pmndrs/react-spring
- **Motion One**：⚠️ 本次核实 `registry.npmjs.org/motion-one` 与 `@motion-one/animation` 均**返回 404**，motion.dev 官网与迁移文档只声明 "Previously Framer Motion"、未提 Motion One——其与 Motion 的合并关系**未找到一手声明，未证实**。
- **CSS linear() 渐进方案**：
  - 规范：CSS Easing Functions Level 2（Editor's Draft，2026-02-23；FPWD 2024-08-28）新增 `linear()`，用折线控制点定义自定义缓动；`linear(0, 0.5 25% 75%, 1)` 语法、双百分比=停顿、可外推；**规范中没有 spring()**。
    来源：https://drafts.csswg.org/css-easing-2/
  - MDN：`linear()` 已 **Baseline Widely available（2023-12 起）**；语法详解与示例同上。
    来源：https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/linear
  - 工具：Jake Archibald 的 **linear() easing generator**——README 原话："easing on the web was limited to cubic-bezier, meaning you couldn't do easings like bounce, spring, or elastic without JavaScript. But now linear() is here!"；工具把 JS/SVG 缓动函数**采样编译为 linear() 控制点**（README 给出 bounce 函数编译产物示例，可直接放进 `animation-timing-function: var(--bounce-easing)`）。在线地址 https://linear-easing-generator.netlify.app/ ，仓库 https://github.com/jakearchibald/linear-easing-generator
  - 组合含义：Motion 的 `duration+bounce` 模式"可编译为纯 CSS"（官方文档）+ linear() generator（社区工具）= **把弹簧视觉烘成静态 CSS 曲线**，是零运行时弹簧的标准渐进路径。

---

## 2. 架构模式：schema/token 驱动面板、Storybook/registry、MDX 文档

### 2.1 schema/token 驱动自动生成参数面板

**Token 层（W3C DTCG 格式）**
- Design Tokens Community Group 格式规范（Draft Community Group Report，2026-09-08 版；规范自警"Do not attempt to implement this version"）：JSON 文件（推荐 `.tokens` / `.tokens.json`，MIME `application/design-tokens+json`）；token 必有 `$value`，可选 `$type`（color/dimension/fontFamily/fontWeight/duration/cubicBezier/number 等）、`$description`、`$extensions`（反向域名键，工具必须保留未知扩展）、`$deprecated`；别名引用 `{group.token}`；引用既可用花括号别名也可用 **JSON Pointer `$ref`**（RFC 6901，工具必须支持）；group 可 `$extends` 继承；组合类型含 shadow/gradient/typography/transition/border/strokeStyle；循环引用必须报错。
  来源：https://www.designtokens.org/TR/drafts/format/
- **Style Dictionary v4**（token 构建管道的事实标准）："Export your Design Tokens to any platform — iOS, Android, CSS, JS, HTML, sketch files, style documentation"；与 DTCG spec 保持 forward-compatible；官网提供在线 DTCG→CSS 转换演示。
  来源：https://styledictionary.com/
- 组合意义：**DTCG JSON 是"设计参数 schema"，Style Dictionary 把它编译成 CSS custom properties，演示站的滑块再绑定这些变量**——一条有规范背书的 token→控件 链路。

**控件面板层（schema→控件的三类现成轮子）**
- **Leva**（pmndrs，React）：`useControls({ name: 'World', aNumber: 0 })` 即自动生成面板；"12+ different kinds of inputs"、"Smart input type recognition"、可写插件；其官方文档站本身就是 Storybook。适合 React 演示组件的原型调参。来源：https://github.com/pmndrs/leva
- **Tweakpane**（框架无关）：dat.GUI 启发的紧凑调参面板，零依赖、可扩展；input binding 覆盖 Number/String/Boolean/Color/Point 2D-4D，另有 monitor 只读绑定。适合 vanilla/Three.js 类演示。来源：https://github.com/cocopon/tweakpane
- **Storybook Controls**（组件工作流内建）：基于 args 自动生成控件——按 args 初始值推断类型；meta 带 `component` 时用 **react-docgen（含 TS 支持）解析组件定义自动生成 argTypes**；映射表 boolean→开关、number/range→数值/滑块、string→text/color/date（颜色靠默认正则 `/（background|color)$/i`）、enum→radio/select/inline-check、object/array→JSON 编辑器；支持 `argTypes` 手动指定、`mapping` 把可序列化选项映射为复杂值、`if` 条件控件；Controls 与 Docs 同引擎。
  来源：https://storybook.js.org/docs/react/essentials/controls

### 2.2 Storybook / registry 模式

- Storybook 的 controls 即"组件 props schema → 面板"的注册表模式；配合 docs 页可承载 demo+文档（Leva 文档站即 Storybook，见上）。
  来源：https://storybook.js.org/docs/react/essentials/controls 、https://github.com/pmndrs/leva
- **shadcn/ui registry**：把组件按 JSON 注册表分发（"Run your own code registry"），框架无关（"not limited to React"）；`registry-item.json` 有公开 JSON Schema（https://ui.shadcn.com/schema/registry-item.json ），核心字段：`name/title/type/files(path,type,target)/dependencies/registryDependencies/cssVars(theme,light,dark)/css/envVars/docs`；`registryDependencies` 支持裸名、命名空间、GitHub、URL、本地文件五种引用。这套 JSON 是"组件级设计 spec 的机器可读格式"。
  来源：https://ui.shadcn.com/docs/registry 、https://ui.shadcn.com/docs/registry/registry-item-json

### 2.3 MDX 交互文档（Next.js vs Astro 的场景适配）

- **Next.js + @next/mdx**：MDX 在 App Router 下与 React Server Components 兼容（默认）；`mdx-components.tsx` 为必需约定文件；**frontmatter 默认不支持**（需 remark-frontmatter/remark-mdx-frontmatter/gray-matter 等插件），但可用 `export const metadata` 代替；remark/rehype 插件生态可用（Turbopack 下插件须可序列化）；有实验性 Rust MDX 编译器（`mdxRs`，不推荐生产）。其文档站本身提供 `/docs/llms.txt` 语义索引。
  来源：https://nextjs.org/docs/app/guides/mdx
- **Astro + @astrojs/mdx**：官方集成；Markdown 中直接嵌 JSX/Astro 组件，**UI 框架组件用 `client:load` 等 island 指令选择性水合**；frontmatter 默认支持；content collections 用 glob loader + zod schema 管理批量 MDX；`optimize` 选项加速构建。
  来源：https://docs.astro.build/en/guides/integrations-guide/mdx/
- 适配判断（依据上述两文档的机制差异）：
  - 演示站以**内容/教程为主、每页少量交互组件** → Astro（默认零 JS，只有标记 `client:` 的岛屿水合；frontmatter/内容集合开箱即用）；
  - 演示站本身就是 **React 应用/组件库文档**（组件与页面同一技术栈、需要 RSC/路由级集成）→ Next.js + MDX（代价：frontmatter 要装插件、mdx-components 约定、Turbopack 插件限制）。

---

## 3. 把设计参数变成 AI 可复刻 prompt：已有格式与做法

### 3.1 结构化 spec（机器可读的"设计参数"格式，已有且成规范）

1. **DTCG design tokens JSON**：`$type` 让每个值自带语义（color/dimension/transition…），`$extensions` 可携带工具私有元数据——是最接近"参数快照→agent 可读"的公开格式。
   来源：https://www.designtokens.org/TR/drafts/format/
2. **shadcn registry-item JSON**：组件级 spec（文件清单、依赖、cssVars、用法 docs 字段），且有公开 JSON Schema 与自建 registry 流程。
   来源：https://ui.shadcn.com/docs/registry/registry-item-json
3. **shadcn MCP Server**：AI 助手通过 MCP **浏览/搜索/安装** registry 组件（"add a login form"式自然语言→registry 命令→安装）；`npx shadcn@latest mcp`，支持公共/私有/多 registry 与鉴权——即"agent 直接读结构化设计 spec 并落地代码"的已发货案例。
   来源：https://ui.shadcn.com/docs/mcp

### 3.2 站点级上下文组织：llms.txt

- 提案（Jeremy Howard / Answer.AI，2024-09-03 首发，现为 v2）：站点根路径放 `/llms.txt`——H1 项目名 + blockquote 摘要 + 自由段落 + H2 分节的 `[name](url)` 链接列表；配套做法是每个信息页提供 `.md` 纯文本版（`rel="alternate" type="text/markdown"`）；定位是"按需推理时的上下文导航"，文件须小到能进上下文。
- 采用情况（提案页自述）：数千站点已发布；Mintlify 自动生成；OpenAI/Anthropic/Gemini 开发者文档均已发布；Chrome Lighthouse 已纳入 agentic browsing 审计。
  来源：https://llmstxt.org/
- 实例交叉印证：**Next.js 文档站有 /docs/llms.txt**（其 MDX 指南页头部即引用）、**v0 有 /docs/llms.txt**（含 sitemap.md 与 agents.md）、**shadcn registry 文档页自述提供 /llms.txt 供机器读取**。
  来源：https://nextjs.org/docs/app/guides/mdx 、https://v0.app/docs/llms.txt 、https://ui.shadcn.com/docs/registry

### 3.3 v0 如何组织上下文与提示（一手文档）

- 输入上下文：截图克隆页面、**Figma 文件转高保真 UI**、线框图、接入"你的 API/数据库/组件"；默认技术栈 **Next.js + Tailwind CSS + shadcn/ui**（数据场景 Python/SQL/Snowflake）；另有 Design Systems 2.0、Design mode 页面（提供设计上下文）。
  来源：https://v0.app/docs
- 官方提示工程指南（text-prompting）：核心句 "Start simple. Plan your project. Provide context. Specify and make v0 clarify. Iterate."；要求具体（写清 hero/项目展示/联系表单等结构而非 "make a website"）、复杂任务增量拆解、写明框架与集成（如 Next.js 14 + Socket.io + MongoDB）、指定错误/空/加载状态、**组件优先**（先 "Create a header component…" 再加区块）、复杂项目先生成 PRD 再实现；提供 CRUD/认证/仪表盘提示词模板与最多 10 条的提示词队列。
  来源：https://v0.app/docs/text-prompting
- 代码评论即上下文：v0 的 Code viewer 支持"选中代码加注释并作为修改的精确上下文附加到提示"（其 llms.txt 中记载）。
  来源：https://v0.app/docs/llms.txt
- 与 registry 的打通：shadcn registry 文档列出 "Open in v0" 能力——registry 条目可一键送入 v0。
  来源：https://ui.shadcn.com/docs/registry
- 旁证（v0 与社区液态玻璃的交集）：shuding 的 liquid-glass 仓库 demo 链接是 `https://v0.dev/chat/dynamic-frame-layout-1VUCCecq7Uy`——这类 SVG 玻璃效果已在 v0 工作流中产出过。
  来源：https://github.com/shuding/liquid-glass

### 3.4 「参数快照 → prompt」的现状判断

**未找到**公开的、专门针对"把演示站参数面板当前值序列化为 agent 可复刻 prompt"的成熟标准或工具。已有可拼装的做法是：① DTCG token JSON / shadcn registry-item JSON（结构化 spec，机器可读）；② CSS custom properties 的 computed-style 快照（`getComputedStyle` 读取，MDN API 见 1.1）；③ llms.txt/`.md` 页面 + MCP server（把 demo 站的文档与组件以 agent 可导航的方式暴露）。三者的组合方案属于本报告基于上述已核实材料所做的**工程推断**，非现有成文标准。

---

## 4. 技术栈组合建议（含 trade-off 与依据）

### 方案 A：零构建静态演示站（纯 Web 平台能力）
**栈**：HTML + CSS custom properties + `<input type="range">`（`input` 事件 + `setProperty`）+ `@property` 类型注册 + `backdrop-filter` 毛玻璃 + SVG `feDisplacementMap` 折射（Chromium 系）+ `linear()` 预编译弹簧曲线（linear() generator 产出）+ 需要面板时配 Tweakpane。
- 优点：零依赖/零构建、可单文件分发、参数即 CSS 变量（快照序列化最简单——导出 `:root` 变量表即得 prompt 素材）；`@property`/`linear()`/`backdrop-filter` 均已 Baseline widely available。
- 缺点：折射仅 Chromium（Safari/Firefox 回退 blur，需按 hyalite/OLG 的回退模式处理）；弹簧是"烘死的"静态曲线，不能响应中断速度（linear() 无 velocity）；复杂交互逻辑没有组件化框架支撑。
- 依据：MDN（custom properties/@property/backdrop-filter/feDisplacementMap/linear）各页；css-easing-2 规范；linear-easing-generator README；hyalite README（Chromium 限制与回退）；Tweakpane README。

### 方案 B：React 组件演示 + 文档一体化（生态最强）
**栈**：Next.js + MDX（@next/mdx）+ motion（useSpring 真弹簧，可 `duration+bounce` 编译 CSS）+ Storybook Controls（args→面板）或 Leva（页内调参面板）。
- 优点：args 自动推断面板（react-docgen 解析 TS props，含 range/color 等映射）；真弹簧物理可吸收中断速度；MDX 让文档与交互组件同仓同栈；与 v0/shadcn 等 AI 工具链同构（v0 默认栈即 Next.js+Tailwind+shadcn/ui）。
- 缺点：构建与维护成本最高；MDX 有 frontmatter 插件、mdx-components、Turbopack 序列化等工程坑；Storybook/Leva 各自引入运行时与依赖；bundle 大。
- 依据：Next.js MDX 指南；motion.dev transitions/react-spring/react-animation；Storybook Controls 文档；Leva README；v0 docs。

### 方案 C：内容站 + 交互岛 + token 管道（面向"规范输出给 AI"的演示站）
**栈**：Astro + @astrojs/mdx（交互组件 `client:load` 岛屿）+ DTCG tokens JSON + Style Dictionary v4 编译为 CSS 变量（演示面板绑定变量）+ 组件按 shadcn registry-item JSON 发布 + （可选）shadcn MCP / llms.txt 暴露给 agent。
- 优点：默认静态、只有岛屿水合，性能最好；token 有 W3C CG 规范背书，"参数 schema→CSS 变量→面板→prompt 素材"全链路机器可读；registry+MCP 是目前"agent 复刻组件"最成熟的已发货通路；frontmatter/内容集合原生支持，适合多 demo 页管理。
- 缺点：token→CSS 需维护一条构建链（Style Dictionary）；交互演示组件仍要写 React/Vue 并处理水合边界；折射等重效果仍受 1.5 节浏览器限制约束（与框架无关）。
- 依据：Astro MDX 指南；DTCG 格式规范；Style Dictionary 官网；shadcn registry/registry-item-json/MCP 文档；llmstxt.org。

选型速判：追求"一行代码贴进任何地方"→A；团队 React 且要真弹簧与 AI 工具链同构→B；demo 数量多、要把参数规范性地喂给 agent→C。

---

## 5. 未证实与未找到（如实声明）

1. **Apple 官方 Liquid Glass 一手文档未能直接核实**：developer.apple.com 相关页面（Materials/HIG、newsroom 里程碑页）为 JS 渲染或 404，抓取失败；iOS 26 发布事实改引 Wikipedia（已成功抓取），Apple 未提供 web/CSS 实现这一说法来自社区实现的表述而非 Apple 官方声明。
2. **Motion One 与 Motion 的合并关系**：npm registry 上 `motion-one`、`@motion-one/animation` 均返回 404；motion.dev 官网/迁移文档未提 Motion One。未找到一手声明，未证实。
3. **"参数快照→agent prompt"专门标准/工具**：未找到公开成熟方案（3.4 节的组合做法是工程推断）。
4. **CSS spring() easing**：css-easing-2 规范中不存在 spring()，仅有 linear()；CSSWG 若有 spring 提案，本次未检索到一手出处。
5. **lil-gui**：候选面板库之一，本次未抓取其页面验证，不给出结论。
6. **leefanv/liqui-design、nikdelvin 等仓库的"Safari/Firefox 支持折射"宣称**：仅来自其 README 自述，未独立实测验证。
