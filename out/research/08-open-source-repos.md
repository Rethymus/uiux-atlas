# 调研报告 08：与构想重叠/相关的开源项目与产品盘点

- **调研日期**：2026-11-20
- **构想四要素**：① 可交互实例 + 效果呈现　② 代码拆解讲解　③ 参数在线实时调节（RGB、字号、弹簧/阻尼系数等）　④ 一键生成可丢给 AI agent 复刻的 prompt
- **重叠度记号**：●=充分覆盖　◐=部分覆盖　○=基本没有
- **数据来源说明**：
  - 全部 star 数于 **2026-11-20 经 GitHub REST API（`gh api repos/<owner>/<repo>` 的 `stargazers_count` 字段）** 核验，为检索时点数据；对应来源 URL 即仓库地址。
  - 网站功能描述均来自当日对站点的直接抓取（WebFetch 正文抽取），附站点 URL。
  - 本次检索中内置 WebSearch 与备用免费搜索（fox_search 多引擎链）返回结果不可用/配额受限，全部仓库发现与核验改由 GitHub 官方 API（搜索 + 仓库直查 + README/目录内容）与站点直接抓取完成，一手来源优先，无二手转述。

---

## 一、交互式游乐场 / 生成器

### 1.1 缓动与贝塞尔

| 项目 | 地址 | Star（2026-11-20） | 核心功能 | ① | ② | ③ | ④ | 明显缺失 |
|---|---|---|---|---|---|---|---|---|
| cubic-bezier.com（Lea Verou） | https://github.com/LeaVerou/cubic-bezier ；站点 https://cubic-bezier.com/ | 184 | 拖拽控制点生成 cubic-bezier(…)、Preview & compare、曲线 Library、导入/导出、分享链接（来源：站点抓取 + 仓库 homepage 字段确认对应关系） | ● | ◐ | ● | ○ | 无代码输出/讲解；无 AI prompt；功能 10 年未大更新（最后 push 之外的活跃度未核实） |
| easings.net | https://github.com/ai/easings.net | 8,728 | 30+ 缓动函数速查表，每个函数配可交互演示动画与 CSS 代码片段（仓库 README：Easing Functions Cheat Sheet） | ● | ◐ | ○ | ○ | 不能自定义曲线参数（只能选预设）；无 prompt 输出 |
| linear-easing-generator（Jake Archibald） | https://github.com/jakearchibald/linear-easing-generator | 164 | 用 CSS `linear()` 函数逼近任意曲线（含弹簧类效果），可交互调节后导出现代 CSS（仓库描述为空，来源为 GitHub 搜索命中 + 项目名） | ● | ○ | ● | ○ | 无讲解文案；无 prompt 输出 |
| react-spring-visualizer | https://github.com/JoostKiens/react-spring-visualizer ；站点 https://react-spring-visualizer.com/ | 196 | react-spring 弹簧参数可视化：调节并预览动画曲线（GitHub 搜索描述："Visualize your spring config for react-spring"） | ● | ○ | ● | ○ | 绑定 react-spring 一家；无通用（CSS/其他库）导出讲解；无 prompt |

### 1.2 风格化（玻璃/新拟物/黏土）

| 项目 | 地址 | Star | 核心功能 | ① | ② | ③ | ④ | 明显缺失 |
|---|---|---|---|---|---|---|---|---|
| Neumorphism.io | https://github.com/adamgiebl/neumorphism | 6,186 | 新拟物风格 CSS 生成器（GitHub 描述："Generate CSS for your Neumorphism designs"），调节光照距离/强度等并输出 CSS | ● | ○ | ● | ○ | 仅输出 CSS 片段；无组件级实例；无 prompt |
| glassmorphism.com（Hype4.Academy） | 站点 https://hype4.academy/tools/glassmorphism-generator/（glassmorphism.com 已 301 重定向至此） | **闭源，无公开仓库** | "The original generator for Glassmorphism"（作者 Michal Malewicz）；可调 Blur / Refraction / Depth，输出 `.glass-card` 全套 CSS 并 Copy（来源：站点抓取） | ● | ○ | ● | ○ | **未找到开源仓库**（GitHub 搜索仅得 0–1★ 微型项目）；无 prompt |
| clay.css | https://github.com/codeAdrian/clay.css | 575 | 黏土拟态微型 CSS 类 + SASS mixin，"Easily add claymorphic styles to any HTML element"（仓库描述） | ● | ◐ | ◐ | ○ | 是库而非生成器，参数调节弱于 neumorphism.io 类工具；无 prompt |
| tailwindcss-claymorphism | https://github.com/dulltackle/tailwindcss-claymorphism | 27 | Tailwind 插件生成 claymorphism 工具类（仓库描述） | ◐ | ◐ | ◐ | ○ | 小众、无在线游乐场 |

> claymorphism 独立生成器：hype4.academy 存在 `/tools/claymorphism-generator/` 路径（HTTP 308 跳转，https://hype4.academy/tools/claymorphism-generator/ ），但本次未抓到页面正文，**具体参数未核实**。

### 1.3 渐变 / 配色

| 项目 | 地址 | Star | 核心功能 | ① | ② | ③ | ④ | 明显缺失 |
|---|---|---|---|---|---|---|---|---|
| meshy（= meshgradient.in） | https://github.com/anup-a/meshy ；站点 https://meshgradient.in/ | 423 | 网格渐变生成器：调色板（4 色）、各色面积占比、随机化、**seed 机制可精确复现同一渐变**、PNG 导出（来源：站点抓取；仓库 homepage 字段确认对应） | ● | ○ | ● | ○ | 只输出 PNG/参数，代码输出弱；无 prompt（seed 思路对要素④有借鉴价值） |
| oklch.com（Evil Martians） | https://github.com/evilmartians/oklch-picker ；站点 https://oklch.com/ | 2,024 | OKLCH/LCH 取色器与转换器：HEX/RGB/HSL↔OKLCH、LCH/Hue/Chroma 滑杆、P3/Rec2020 宽色域、sRGB 降级色、3D 色彩模型；作者 Andrey Sitnik & Roman Shamin（来源：站点抓取） | ● | ◐ | ● | ○ | 是取色/转换器而非色板生成器；无 prompt。姊妹工具 Harmonizer 在站内链接，未单独核验 |
| Huetone | https://github.com/ardov/huetone | 459 | "A tool to create accessible color systems"（仓库描述）：生成无障碍色板 | ● | ◐ | ● | ○ | 偏色板工程，无 AI 出口 |
| Realtime Colors | https://github.com/juxtopposed/realtimecolors ；站点 https://www.realtimecolors.com/ | 934 | "Real-time UI Colorpicking Tool. See your favorite colors for a website in real time"（仓库描述）：在真实网页 mockup 上实时换色 | ● | ○ | ● | ○ | 参数仅限配色/字体类；URL 可分享但**没有 prompt 出口**；仓库 934★ 与站点知名度不完全对等 |

### 1.4 Bento Grid / 阴影

| 项目 | 地址 | Star | 核心功能 | ① | ② | ③ | ④ | 明显缺失 |
|---|---|---|---|---|---|---|---|---|
| bentogrid.js | https://github.com/mariohamann/bentogrid.js ；演示 https://bentogrid.mariohamann.com | 62 | "smart library that automatically positions elements depending on their size in a grid"（仓库描述）：自动 bento 排布 | ● | ◐ | ◐ | ○ | 是布局库而非在线生成器 |
| Bento Grid Generator | https://github.com/xavirn89/bentogridgenerator ；站点 https://www.bentogridgenerator.com | 25 | 在线生成 bento 布局并复制 HTML+CSS / HTML+Tailwind（仓库描述） | ● | ○ | ◐ | ○ | 极小项目（25★）；无参数化风格系统 |
| apple-bento-grid | https://github.com/hubeiqiao/apple-bento-grid | 249 | **Agent skill**："generates Apple-inspired bento grid presentation cards. For Claude Code, Codex, and any AI coding agent"（仓库描述）——bento×AI agent 的直接交集 | ◐ | ◐ | ○ | ● | 是 Claude Code 技能而非在线工具，无 ①③ |
| Smooth Shadows（shadows.brumm.af） | 站点 https://shadows.brumm.af/shadows | **闭源，未找到公开仓库** | 多层平滑阴影生成器（多层 box-shadow 拟合物理衰减）；作者 Philipp Brumm / funkensturm（来源：https://github.com/TheRegge/react-smooth-shadows 的描述转述 + funkensturm 账号下无对应仓库，经 GitHub API 核验） | ● | ○ | ● | ○ | **未开源**；同类周边：alexwidua/figma-beautiful-shadows（63★）https://github.com/alexwidua/figma-beautiful-shadows 、TheRegge/react-smooth-shadows（8★）https://github.com/TheRegge/react-smooth-shadows |

---

## 二、设计模式图集 / 画廊类

| 项目 | 地址 | Star | 核心功能 | ① | ② | ③ | ④ | 明显缺失 |
|---|---|---|---|---|---|---|---|---|
| awesome-design-md（VoltAgent） | https://github.com/VoltAgent/awesome-design-md | 128,409 | "A collection of DESIGN.md files analysis by popular brand design systems. Drop one into your project and let coding agents generate a matching UI"（仓库描述）——知名品牌设计系统拆解成 agent 可读文档 | ◐ | ◐ | ○ | ● | 纯文档合集，无交互实例、无参数调节；非"单实例→prompt" |
| awesome-design（gztchan） | https://github.com/gztchan/awesome-design | 17,806 | "Curated design resources from all over the world"（仓库描述）：传统 awesome 清单 | ○ | ○ | ○ | ○ | 无实例、无代码、无参数、无 AI 出口 |
| react-bits（DavidHDev） | https://github.com/DavidHDev/react-bits ；站点 https://reactbits.dev | 52,375 | "The largest open-source library of animated, interactive, and customizable React & Next.js components… **Built for humans and AI agents**"（仓库描述）：动画组件集，live demo + 源码 + 文档 | ● | ● | ◐ | ◐ | props 可定制但非"游乐场级"自由调节；prompt 出口未验证为"一键生成复刻 prompt"。注意与同名 vasanthk/react-bits（17,423★，React 模式技巧清单）区分 |
| Magic UI | https://github.com/magicuidesign/magicui ；站点 https://magicui.design | 23,390 | "UI Library for Design Engineers. Animated components… copy and paste"（仓库描述）；官方 MCP：https://github.com/magicuidesign/mcp （232★，"Magic UI components, searchable and installable from your AI editor"） | ● | ◐ | ○ | ● | 静态预设组件，无在线参数调节 |
| 21st.dev（平台，闭源） | https://21st.dev/ ；agent 接口 https://21st.dev/mcp.md ；MCP 仓库 https://github.com/21st-dev/magic-mcp | 平台闭源；magic-mcp 6,605 | 设计工程师社区驱动的组件 registry：12,000+ React/Tailwind 组件、模板、shadcn 主题；每组件有 live preview + 完整源码 + 安装命令；支持 **"Copy prompt"** 到 Cursor/Claude Code/v0/Lovable；面向 agent 的 MCP + CLI + mcp.md（来源：站点抓取） | ● | ◐ | ○ | ● | 平台本身不开源（GitHub org `21st-dev` 无平台代码，经 API 核验）；免费版每天限复制 2 个组件。注意：21st.dev 与 Magic UI 是**两个独立产品**（各有独立 MCP），本报告未采信任何等同关系 |
| shadcn/ui | https://github.com/shadcn-ui/ui ；MCP 文档 https://ui.shadcn.com/docs/mcp | 128,634 | "Composable, accessible components…"（仓库描述）；复制粘贴式组件体系 + registry。**官方 MCP**：浏览/搜索/安装组件、多 registry（含第三方与私有），`pnpm dlx shadcn@latest mcp init --client claude` 一键配置 Claude Code/Cursor/VS Code/Codex（来源：官方文档抓取） | ● | ● | ○ | ● | 无视觉效果预览画廊意义上的"风格浏览"（组件偏工程化）；无参数游乐场 |
| motion（原 Framer Motion） | https://github.com/motiondivision/motion ；站点 https://motion.dev/ | 35,397 | "A modern animation library for React and JavaScript"（仓库描述）；官网示例库带源码，弹簧演示带 **Stiffness/Damping/Mass 可调 UI**，Motion Studio 提供"visual timeline editor"（来源：站点抓取） | ● | ● | ● | ○ | 参数调节仅限动画域；无 prompt 出口 |
| CodePen | https://codepen.io/ | **闭源，无官方开源仓库** | 社区式前端 demo 画廊，可 fork 修改运行 | ● | ◐ | ◐ | ○ | 商业闭源平台；无结构化"讲解"与 AI prompt 出口（未能核实任何官方开源代码） |
| Uiverse | https://github.com/uiverse-io/galaxy ；站点 https://uiverse.io/ | 15,077 | "The largest Open-Source UI Library! Community-made"（仓库描述）：社区开源元素画廊（按钮/加载器等，CSS/Tailwind） | ● | ◐ | ○ | ○ | 元素级而非模式级；无参数调节、无 AI 出口 |
| HyperUI | https://github.com/markmead/hyperui ；站点 https://www.hyperui.dev/ | 12,287 | "Free Tailwind CSS v4 components"（仓库描述）：Tailwind 组件片段库 | ● | ◐ | ○ | ○ | 静态片段，无实例调节 |
| daisyUI | https://github.com/saadeghi/daisyui | 42,912 | "The most popular, free and open-source Tailwind CSS component library"（仓库描述） | ● | ◐ | ◐ | ○ | 组件库本体，画廊属性弱 |
| Flowbite | https://github.com/themesberg/flowbite | 9,390 | "Open-source UI component library… based on Tailwind CSS"（仓库描述） | ● | ◐ | ○ | ○ | 同上 |
| Aceternity UI | 站点 https://ui.aceternity.com/ （HTTP 200，已核验） | **未找到官方开源仓库**（`Aceternity-UI/aceternity-ui` 返回 404，经 GitHub API 核验） | 动效组件站点（站内可复制组件源码） | ● | ◐ | ○ | ◐ | 官方仓库不可得；社区衍生：Spectrum UI（1,544★）https://github.com/arihantcodes/spectrum-ui 等 |

---

## 三、辅助 AI 写 UI 的资源

### 3.1 闭源产品的公开 prompt / 系统提示词

| 项目 | 地址 | Star | 核心内容 | 与四要素重叠 | 明显缺失 |
|---|---|---|---|---|---|
| x1xhlol/system-prompts-and-models-of-ai-tools | https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools | 144,789 | 泄漏/整理的各 AI 工具系统提示词与内部工具全集（仓库描述列明 v0、Lovable、Cursor、Devin、Replit 等）。经 API 核验：`v0 Prompts and Tools` 目录含 `Prompt.txt` + `Tools.json`；`Lovable` 目录含 `Agent Prompt.txt` + `Agent Tools.json` | 要素④的"反面教材/母本"：正是这些 prompt 定义了 v0/Lovable 的 UI 生成行为 | 是静态资料库，不是工具；时效性与合法性存疑（泄漏内容） |
| 中文译本（IsHexx） | https://github.com/IsHexx/system-prompts-and-models-of-ai-tools-chinese | 1,272 | 上述仓库的中文提示词合集（仓库描述） | 同上 | 同上 |

### 3.2 开源的 AI app builder（含真实系统提示词源码）

| 项目 | 地址 | Star | 核心内容 | 与四要素重叠 | 明显缺失 |
|---|---|---|---|---|---|
| bolt.new（StackBlitz 官方开源） | https://github.com/stackblitz/bolt.new | 16,607 | "Prompt, run, edit, and deploy full-stack web applications"（仓库描述）。系统提示词位于 `app/lib/.server/llm/prompts.ts`（经 API 核验存在，13.9KB） | 可直接研读"如何让 LLM 生成 UI"的一手 prompt 工程要素④的反向：它消费 prompt 产出代码 | 无交互实例画廊 |
| bolt.diy（社区版） | https://github.com/stackblitz-labs/bolt.diy | 20,113 | "Prompt, run, edit, and deploy full-stack web applications using any LLM you want!"（仓库描述），任意模型可插拔 | 同上 | 同上 |
| Dyad | https://github.com/dyad-sh/dyad ；https://dyad.sh | 22,333 | "Local, open-source AI app builder… v0 / Lovable / Replit / Bolt alternative"（仓库描述） | 同上 | 同上 |
| gpt-engineer | https://github.com/AntonOsika/gpt-engineer | 54,949 | "CLI platform to experiment with codegen. **Precursor to: https://lovable.dev**"（仓库官方描述，佐证 Lovable 血统） | 同上 | 同上 |

### 3.3 设计/截图 → 代码 与 可视化编辑

| 项目 | 地址 | Star | 核心内容 | 与四要素重叠 | 明显缺失 |
|---|---|---|---|---|---|
| screenshot-to-code | https://github.com/abi/screenshot-to-code | 81,303 | "Drop in a screenshot and convert it to clean code (HTML/Tailwind/React/Vue)"（仓库描述） | ①◐（截图输入+预览）④○（方向相反：图→码，而非实例→prompt） | 不产出可复刻 prompt；拆解讲解弱 |
| OpenUI（W&B） | https://github.com/wandb/openui ；demo https://openui.fly.dev | 22,767 | "describe UI using your imagination, then see it rendered live"（仓库描述） | 同上 | 同上 |
| make-real（tldraw） | https://github.com/tldraw/make-real | 5,412 | "Draw a ui and make it real"（仓库描述）：画布草图→代码 | 同上 | 已停止活跃迭代（未核实具体时间，未证实） |
| Onlook | https://github.com/onlook-dev/onlook ；https://onlook.com | 27,561 | "The Developer Tool for Designers… Visually build, style, and edit your code with AI"（仓库描述）：对真实 React/Tailwind 代码做可视化编辑 | ①●③◐（可视化样式编辑≈参数调节的落地实现）④◐ | 面向"改现有码"而非"调参数→产 prompt" |
| Design2Code（Stanford SALT NLP） | https://github.com/NoviScl/Design2Code ；论文 https://arxiv.org/abs/2403.03163 | 605 | "Design2Code: How Far Are We From Automating Front-End Engineering?" 官方仓库（README 经 API 核验："maintained by the SALT lab from Stanford NLP"），截图→前端代码评测基准 | ②◐（评测框架暗含拆解维度）④○ | 学术基准，非工具；原 OSU-NLP-Group 地址已 404，现址经 GitHub 搜索确认 |

### 3.4 组件 registry × agent 接口（MCP）

| 项目 | 地址 | Star | 核心内容 | 与四要素重叠 |
|---|---|---|---|---|
| shadcn MCP（官方） | 文档 https://ui.shadcn.com/docs/mcp ；仓库 https://github.com/shadcn-ui/ui | 128,634 | AI 助手经 MCP 浏览/搜索/自然语言安装组件，支持多 registry 与命名空间（文档抓取核验） | ④●（把组件库暴露给 agent 的标准范式） |
| 21st Magic MCP | https://github.com/21st-dev/magic-mcp ；https://21st.dev/mcp | 6,605 | "It's like v0, but in your Cursor / Claude Code / Windsurf: search 10,000+ React/Tailwind components, generate new UI with AI"（仓库描述） | ④● |
| Magic UI MCP | https://github.com/magicuidesign/mcp | 232 | "Magic UI components, searchable and installable from your AI editor"（仓库描述） | ④◐ |
| MasterGo Magic MCP | https://github.com/mastergo-design/mastergo-magic-mcp | 289 | 连接 MasterGo 设计工具与 AI 模型的 MCP（仓库描述），设计稿→代码方向的国产实现 | ④◐ |

### 3.5 design-to-prompt / spec-to-agent 专用工具

**未找到可靠资料。** GitHub 搜索 "design to prompt" 仅命中 0–1★ 微型仓库（如 https://github.com/arvinwira/design-to-prompt ，1★；`InternalServerError98/DesignPromptGenerator_FineTune`，0★——均为微项目或微调实验，不具参考规模）。"把可视化调好的设计实例一键转换为 agent 复刻 prompt"的成规模开源工具**不存在**，这是明确空白。

---

## 四、四要素覆盖矩阵与空白总结

### 覆盖概览（基于上文逐条盘点）

| 要素 | 现有覆盖情况 | 代表项目 |
|---|---|---|
| ① 可交互实例+效果呈现 | **覆盖最充分**，几乎所有游乐场与画廊标配 | cubic-bezier.com、easings.net、neumorphism.io、shadows.brumm.af、oklch.com、react-bits、21st.dev、Uiverse、shadcn/ui |
| ② 代码拆解讲解 | **仅部分覆盖**：普遍停留在"给源码可复制"，缺少逐层讲解。最强者：react-bits（demo+源码+文档）、shadcn/ui（registry 源码）、motion（官方文档）、awesome-design-md（设计系统拆解为 agent 文档，但无实例） | react-bits、shadcn/ui、motion、awesome-design-md |
| ③ 参数在线实时调节 | **单点工具覆盖充分，但没有与画廊结合**：每个工具只管自己那一个参数域（曲线/阴影/配色/弹簧），motion 的 spring 演示与 Realtime Colors 是"实例+参数"结合的最佳现有范例，但均限于单一领域 | cubic-bezier.com、neumorphism.io、oklch.com、realtimecolors、react-spring-visualizer、motion.dev |
| ④ 一键生成 agent 复刻 prompt | **最空白**。现有最接近的形态是"把组件库喂给 agent"（shadcn MCP、21st.dev Copy prompt/MCP、magicui MCP）与"把设计系统文档喂给 agent"（awesome-design-md、apple-bento-grid skill），以及泄漏的系统提示词（x1xhlol）。**没有任何项目实现"用户调好参数的实例 → 一键产出高质量复刻 prompt"** | 21st.dev、shadcn MCP、awesome-design-md、x1xhlol 仓库、apple-bento-grid |

### 空白点（构想的差异化机会）

1. **③+④ 的桥接完全缺失**：现有工具要么能调参数但只会输出 CSS/链接（cubic-bezier.com、oklch.com、realtimecolors），要么面向 agent 但不接受用户调好的参数实例（21st.dev、shadcn MCP）。"参数状态 → 结构化 prompt"的转换层不存在。
2. **②真正意义上的"拆解讲解"稀缺**：绝大多数项目把源码甩给你即止；把一个效果拆成"结构/样式/动效/参数敏感度"教学叙事的开源项目为零（学术侧仅 Design2Code 有评测式拆解）。
3. **四要素合一的产品不存在**：盘点范围内没有任何项目同时做到"可交互实例 + 拆解讲解 + 实时参数 + agent prompt 导出"。
4. **弹簧/阻尼这类物理参数**只有孤立小工具（react-spring-visualizer 196★、jakearchibald/linear-easing-generator 164★），没有融入组件画廊。

### 未找到可靠资料 / 未证实事项清单（如实标注）

- **design-to-prompt / spec-to-agent 专用开源工具**：未找到成规模项目（仅 0–1★ 微仓库）。
- **shadows.brumm.af（Smooth Shadows）开源仓库**：未找到；依据周边仓库转述判定作者为 funkensturm（Philipp Brumm），其 GitHub 账号下无对应仓库，**闭源推断为合理推断而非官方声明**。
- **glassmorphism.com 开源仓库**：无；该站现归 hype4.academy，页面无开源声明（站点抓取核验）。
- **Aceternity UI 官方开源仓库**：未找到（`Aceternity-UI/aceternity-ui` 404）。
- **CodePen 官方开源代码**：无（商业闭源）。
- **21st.dev 平台源码**：未公开（org `21st-dev` 仅见 magic-mcp 等周边仓库）。
- **hype4.academy claymorphism-generator 的具体参数**：路径存在（HTTP 308）但正文未抓到，未证实。
- **tldraw/make-real 是否停止维护**：未核实，未证实。
- **各仓库"最后活跃度"**：本次仅抽查部分仓库 `pushed_at`（如 shadcn-ui/ui、motion、bolt.diy、dyad 均显示 2026-11 有推送），未逐一统计。

---

## 附：本次核验命令与来源清单（节选）

- star 数核验命令（全部于 2026-11-20 执行）：`gh api repos/<owner>/<repo> --jq '[.full_name,.stargazers_count,.description,.homepage] | @tsv'`，覆盖 shadcn-ui/ui、motiondivision/motion、uiverse-io/galaxy、stackblitz/bolt.new、stackblitz-labs/bolt.diy、ai/easings.net、AntonOsika/gpt-engineer、21st-dev/magic-mcp、dyad-sh/dyad、LeaVerou/cubic-bezier、adamgiebl/neumorphism、evilmartians/oklch-picker、anup-a/meshy、juxtopposed/realtimecolors、JoostKiens/react-spring-visualizer、jakearchibald/linear-easing-generator、codeAdrian/clay.css、ardov/huetone、DavidHDev/react-bits、magicuidesign/magicui、magicuidesign/mcp、markmead/hyperui、gztchan/awesome-design、VoltAgent/awesome-design-md、x1xhlol/system-prompts-and-models-of-ai-tools、abi/screenshot-to-code、wandb/openui、tldraw/make-real、onlook-dev/onlook、NoviScl/Design2Code、hubeiqiao/apple-bento-grid、mariohamann/bentogrid.js、xavirn89/bentogridgenerator、saadeghi/daisyui、themesberg/flowbite、uiverse-io/galaxy 等。
- 站点直接抓取（WebFetch，2026-11-20）：oklch.com、cubic-bezier.com、meshgradient.in、21st.dev、ui.shadcn.com/docs/mcp、motion.dev、hype4.academy/tools/glassmorphism-generator/。
- 目录/文件核验（GitHub API）：x1xhlol 仓库 `v0 Prompts and Tools`、`Lovable` 目录；stackblitz/bolt.new `app/lib/.server/llm/prompts.ts`；NoviScl/Design2Code README。
