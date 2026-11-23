# 现代前端 UI/UX 设计全解图集 · 项目蓝图（v1）

> 依据 out/research/01–09 九份调研，下文以 01§x 指代报告章节；未证实事项沿用调研原标注。

## 1. 一句话定位与目标用户

**定位**：面向 AI Coding 用户的现代前端设计全解图集——每个设计条目配可交互实例、代码拆解、参数实时调节面板，并一键把参数快照浓缩成供 AI agent 一比一复刻的结构化 prompt。

**目标用户与依据**：用 AI 工具写前端但缺乏设计语汇的开发者。SO 2025：84% 开发者用 AI 工具、信任度仅 33%（01§1.1）；"vibe coded slop" 已成日常自嘲（01§2.2）。痛点有硬数据：45 个模型的 UI 模型间相似度 0.592（人机 0.764）、跨域创意跨度 0.575 vs 人类 0.902——AI 退回"质心设计"（01§2.1 Kombai）；归因是 agent 缺少颜色语义、字阶、间距节奏等设计上下文（01§2.2）。产品假设：图集是"人类可浏览、agent 可复刻"的设计上下文供给层，与 Marque、awesome-design-md 同方向，但以"单实例四要素合一"切入——该形态经盘点不存在（08§3.5、§四）。

## 2. 内容体系全景（目录树）

参数化程度：★★★ 全参数化（Playground 核心）/★★ 部分/★ 演示为主。

1. **视觉风格流派**（约 20 条，03§三）：★★★ 七条——Glassmorphism（blur/fill/边框/圆角）、Neo-Brutalism（4px 4px 0 #000）、Claymorphism（三段阴影）、Neumorphism（双阴影+对比度反例）、Bento Grid（列数/gap/span）、Aurora/Mesh（光斑/blur）、Grain（feTurbulence）；★★ Minimalism；★–★★ 其余：Y2K、Memphis、Cyberpunk、Swiss、Editorial、Maximalism、Flat、Frutiger Aero 等。
2. **材质与光影**（约 12 条，02§1§4、06§四，均 ★★★）：backdrop-filter 毛玻璃、SVG 折射液态玻璃 feDisplacementMap（09§1.5）、Liquid Glass regular/clear+35% dimming（02 A1）、Fluent Acrylic/Mica（TintOpacity）、M3 state layers（8/10/10/16%）、多重平滑阴影、颗粒叠层。
3. **动效与微交互**（约 35 条，04§7 共 39 条）：★★★——easing 族/linear() 弹簧逼近、两套弹簧参数（Motion stiffness/damping/mass；SwiftUI response 0.5/dampingFraction 0.825）、M3 12 枚 spring token 的 Web bezier 换算（02 B2）、scroll-driven（animation-range）；★★——缓动-时长配对表、View Transitions（唯一命名/morph）、加载选型阈值（<1s/2–10s/≥10s）、骨架屏、触感三系统、reduced-motion 降级。
4. **色彩与主题**（约 20 条，06§六共 23 条）：★★★——oklch() 固定 L 调 C/H、渐变插值 in oklab、动态取色（5 关键色×13 tone）、Radix 12 步色阶（APCA Lc60/90）、WCAG 4.5/7/3:1+APCA 实时校验；★★——P3 渐进增强、三层 token（Primer 9 主题）、light-dark() 暗色与 base/elevated 层级、60-30-10。
5. **排版**（约 15 条，05§四）：★★★——clamp() 流式字阶/Utopia、可变字体五轴（wght/opsz）；★★——modular scale、font-display 数值表、行长 45–90 字符、WCAG Text Spacing、CJK 混排 ≤1/4 汉字宽与 text-autospace（Baseline 2025-11）、Inter/Geist/思源黑体。
6. **布局与响应式**（约 15 条，05§一§二）：★★★ container queries；★★ grid-template-areas、auto-fit+minmax、subgrid、sticky、safe-area；★ grid lanes（STP 预览）、viewport-segments（实验）。
7. **组件模式**（约 25 条，07§一§四，均 ★★ 状态参数+键盘演示）：对话框焦点管理、combobox 四种补全、switch 标签不变铁律、slider 键盘步进、tabs 激活策略、toast 自动消失的 WCAG 约束、命令面板、数据表格、上传三态、表单校验时机、空状态三分类。
8. **交互法则与无障碍**（约 15 条，07§二§三）：★ Fitts/Hick/峰终/Doherty/Jakob/格式塔族（对比演示）；★★ 0.1/1/10s 三限、APG 30 模式与焦点管理、prefers-contrast/reduced-motion。
9. **趋势追踪**（动态页，03§二）：兴起/退潮（玻璃系升至 9.9%、粗野 2026-03 见顶、新拟物趋零——superdesign 20.8 万次生成数据）、Liquid Glass iOS 27 修订、M3 Expressive；每趋势链接常青条目。

合计常青条目约 160 条；MVP 取约 40 条高参数化条目。

## 3. 条目数据模型（字段级 schema）

每条目 = 一份 JSON schema（命名兼容 DTCG，09§2.1§3.1）+ 一篇 MDX：

- `name`/`aliases`：官方与社区命名、别名
- `category`（一级/二级）、`system`（apple/m3/fluent/web-std/component-lib/community）、`origin`（命名者/年份/来源）
- `params[]`：name/type/range/default/effect——prompt 生成的数据源；type/range/default 取自官方 spec 与源码（如 SwiftUI spring 0.5/0.825、M3 expressive spatial 0.8/380、antd seed.ts，02§1§2§5）
- `demo`：实现方式 + browserSupport（逐条取 mdn/browser-compat-data，02§8 方法）+ fallback
- `codeBreakdown`：结构/样式/动效/参数敏感度四段教学叙事（08§四空白②）
- `scenarios`：适用场景与反模式（"何时不要用"）
- `a11y`：对比度/降级要求
- `sources[]`：一手 URL 强制 ≥1
- `promptTemplate`：复刻模板，引用 params 快照

## 4. 功能矩阵（四要素分期）

| 能力 | MVP（0–3 月） | V1（3–6 月） | V2（6–12 月） |
|---|---|---|---|
| ① 交互实例 | 40 条高参数化条目（风格/材质/动效/色彩） | 全域 100+ 条含组件法则 | 160 条全量 |
| ② 代码拆解 | 高亮代码+逐段注释 | 四段教学叙事 | 拆解↔参数联动高亮 |
| ③ 参数调节 | CSS 变量+滑杆即时生效+影响说明 | @property 类型约束、Motion 真弹簧、内嵌对比度校验 | 快照分享链接、预设库 |
| ④ prompt 导出 | 快照→结构化 Markdown prompt 一键复制 | 按 agent 定制模板；全站 llms.txt+条目 .md | MCP server、shadcn registry 发布、"Open in v0" |

MVP 判据：单条目四要素闭环跑通（Glassmorphism、spring、oklch 三条打样）。

## 5. 内容生产流水线

1. **模板化**：条目 = schema JSON + MDX；调节面板由 params schema 自动生成（Storybook Controls/Leva 的 args→面板模式，09§2.1）。
2. **来源校验**：每条目强制一手来源（官方规范/文档 JSON/仓库源码），浏览器支持对 BCD 核验——复用本次调研已跑通的核验方法（02§8）；已证伪说法不得入库（如 M3 easing 官方贝塞尔数值未证实，02§7）。
3. **参数标注**：区分官方默认值与生产甜点值（03 风格页实测），每参数必填 effect 影响说明。
4. **prompt 校验**：导出 prompt 实测 v0/Cursor 复刻相似度，参照 Kombai 原创性度量做回归迭代（01§2.1）；"快照→prompt"无公开标准、属工程推断（09§3.4），故必须自建校验。
5. **趋势更新**：季度监控 BCD diff（新 Baseline 自动入候选）+ 年度趋势源（daisyUI/Adobe/Creative Bloq + superdesign 份额）+ 官方发布节点（WWDC/Google I/O）；趋势条目与常青条目分离存储。

## 6. 技术选型

推荐**方案 C：Astro + token 管道 + registry**（09§4 三方案对比）：

- **Astro + @astrojs/mdx**：内容站为主、交互组件 `client:load` 岛屿水合，默认零 JS 性能最优；content collections 适合 160 条批量管理（09§2.3：Next.js 适 React 重交互同栈，本站内容占比更高）。
- **参数链路**：DTCG token JSON（W3C CG 规范，2025.10 稳定版，01§3.2）→ Style Dictionary 编译 CSS 变量 → 滑杆 setProperty 即时生效；@property 类型约束（Baseline 2024，09§1.2）。
- **弹簧**：Motion 的 duration+bounce 模式官方明确"可编译为纯 CSS"（09§1.6），配 linear() generator（Baseline 2023-12）零运行时兜底；需中断续接的条目才局部用真弹簧。
- **prompt 通路**：llms.txt + 条目 .md +（V2）shadcn registry-item/MCP——"agent 读结构化 spec"是已发货范式（09§3）。
- 弃选：方案 A 零构建（无组件化、弹簧烘死）作降级参考；方案 B Next.js 全栈成本最高，仅当转型 React 组件库文档时再评估。

## 7. 差异化与竞争分析

四要素覆盖现状（08§四矩阵）：①实例覆盖最充分——easings.net 8.7k★、react-bits 52.4k★、shadcn/ui 128.6k★；②教学级拆解稀缺——普遍停留"给源码"；③参数调节充分但单点、未与画廊结合——cubic-bezier.com 184★、oklch.com 2k★、realtimecolors 934★ 等各管一个参数域；④最空白——现有仅"组件库喂 agent"（21st.dev Copy prompt 闭源、shadcn MCP、awesome-design-md 128.4k★），**"调好参数的实例→一键复刻 prompt"成规模工具不存在**（08§3.5，仅 0–1★ 微仓库）。

空白点即定位：③+④ 桥接层与四要素合一均无现有项目。护城河在内容资产（一手来源校验的 160 条 schema）与自动化管道（schema→面板→prompt），而非单点功能——单点均可能被现有工具补齐。

## 8. 里程碑路线图（含风险与规避）

- **M0–M1 管道打样**：schema/面板/导出链路 + 3 条种子条目四要素闭环。
- **M2–M3 MVP**：40 条高参数化条目上线，prompt 导出 + llms.txt。
- **M4–M6 V1**：全域 100+ 条含组件与法则；四段拆解；快照分享。
- **M7–M12 V2**：160 条全量；MCP server + registry + "Open in v0"；趋势季度自动化。

风险与规避：
1. **浏览器兼容**：液态玻璃折射 backdrop-filter:url() 仅 Chromium（09§1.5）→ demo.browserSupport 必填 + 回退实现随条目交付。
2. **规范漂移**：调研期内多处 404/迁移（Apple HIG 旧 URL、Fluent Depth、Carbon motion，02§7）→ 来源监控 + 存档快照。
3. **prompt 质量无外部标准**（09§5）→ v0 实测复刻 + Kombai 原创性指标做内部回归基线。
4. **趋势条目易过时** → 与常青分离；superdesign 份额数据季度刷新。
5. **自身同质化反噬**：图集若沦为"新默认"与使命相悖 → 沿用 Marque anti-defaults 思路（01§2.2），每条目强制写反模式（如 NN/g 对 Liquid Glass 全屏化的否定，03§2.2）。
