# 现代前端 UI/UX 设计全解图集 · 项目蓝图（v2）

> 依据 out/research/01–09 九份调研（下文 01§x 指代章节）；未证实事项沿用调研原标注。v2 按独立评审 15 条意见修订；事实层抽查（GitHub star×4、DTCG 2025.10、text-autospace、SwiftUI spring，2026-11-21）全部通过，无删改事实。

## 1. 一句话定位与目标用户

**定位**：面向 AI Coding 用户的现代前端设计全解图集——每个设计条目配可交互实例、代码拆解、参数实时调节面板，并一键把参数快照浓缩成供 AI agent 一比一复刻的结构化 prompt。

**目标用户与依据**：用 AI 工具写前端但缺乏设计语汇的开发者。SO 2025：84% 开发者用 AI 工具、信任度仅 33%（01§1.1）。痛点硬数据（Kombai，01§2.1）：45 个模型的 UI **原创性/区分度**——模型间 0.592 vs 人机 0.764（**数值越高越不同**，即不同模型产出彼此更像、而非更像人做的）；跨域创意跨度 0.575 vs 人类 0.902——AI 退回"质心设计"；归因是 agent 缺少颜色语义、字阶、间距节奏等设计上下文（01§2.2）。产品假设：图集是"人类可浏览、agent 可复刻"的设计上下文供给层，与 Marque、awesome-design-md 同方向，但以"单实例四要素合一"切入——该形态经盘点不存在（08§3.5、§四）。

## 2. 内容体系全景（目录树）

参数化程度：★★★ 全参数化（Playground 核心）/★★ 部分/★ 演示为主。

1. **视觉风格流派**（约 20 条，03§三）：★★★ Glassmorphism（blur/fill/边框/圆角）、Neo-Brutalism（4px 4px 0 #000）、Claymorphism（三段阴影）、Neumorphism（双阴影+对比度反例）、Bento Grid、Aurora/Mesh、Grain（feTurbulence）；★★ Minimalism；★–★★ 其余：Y2K、Memphis、Cyberpunk、Swiss、Editorial 等。
2. **材质与光影**（约 12 条，02§1§4、06§四，均 ★★★）：backdrop-filter 毛玻璃、SVG 折射液态玻璃 feDisplacementMap（09§1.5）、Liquid Glass regular/clear（**clear 加 35% 深色 dimming 层，出处 06§四条目 18**；v1 误标 02 A1，已更正）、Fluent Acrylic/Mica（TintOpacity）、M3 state layers（8/10/10/16%）、多重平滑阴影、颗粒叠层。
3. **动效与微交互**（约 35 条；04§7 全量清单 39 条）：★★★ easing 族/linear() 弹簧逼近、两套弹簧参数（Motion stiffness/damping/mass；SwiftUI response 0.5/dampingFraction 0.825）、M3 12 枚 spring token 的 Web bezier 换算（02 B2）、scroll-driven（animation-range）；★★ 缓动-时长配对表、View Transitions、加载选型阈值、骨架屏、触感三系统、reduced-motion 降级。
4. **色彩与主题**（约 20 条；06§六全量 23 条）：★★★ oklch() 固定 L 调 C/H、渐变插值 in oklab、动态取色（5 关键色×13 tone）、Radix 12 步色阶（APCA Lc60/90）、WCAG 4.5/7/3:1+APCA 实时校验；★★ P3 渐进增强、三层 token、light-dark()、60-30-10。
5. **排版**（约 15 条，05§四）：★★★ clamp() 流式字阶/Utopia、可变字体五轴；★★ modular scale、font-display 数值表、行长 45–90 字符、WCAG Text Spacing、CJK 混排与 text-autospace（Baseline 2025-11）、Inter/Geist/思源黑体。
6. **布局与响应式**（约 15 条，05§一§二）：★★★ container queries；★★ grid-template-areas、auto-fit+minmax、subgrid、sticky、safe-area；★ grid lanes、viewport-segments。
7. **组件模式**（约 25 条；07§一§四全量 41 条，均 ★★）：对话框焦点管理、combobox、switch、slider、tabs、toast、命令面板、数据表格、上传三态、表单校验、空状态。
8. **交互法则与无障碍**（约 15 条，07§二§三）：★ Fitts/Hick/峰终/Doherty/Jakob/格式塔族；★★ 0.1/1/10s 三限、APG 30 模式、prefers-contrast/reduced-motion。
9. **图标体系**（约 8 条；**新增域，现有调研未覆盖，M2 前补专项调研**）：描边/填充、24px 尺寸栅格、optical sizing、语义与 aria。
10. **数据可视化配色**（约 6 条；**新增域，同上**——07 仅有数据表格）：分类色板、序数色阶、色盲安全、dashboard 密度。
11. **趋势追踪**（动态页，03§二）：兴起/退潮（superdesign 20.8 万次生成：玻璃升至 9.9%、粗野 2026-03 见顶、新拟物趋零；**口径=开发者向该单一 AI 工具索要的风格，非市场采用率，趋势条目强制标注**，03§四）、Liquid Glass iOS 27 修订、M3 Expressive；每趋势链接常青条目。

补录候选（挂靠既有域，待来源核实后入库）：aspect-ratio/object-fit/响应式图片、逻辑属性与 dir=rtl（布局域）；Spatial UI（风格域）。

合计常青条目约 170 条（v1 的 160 + 新增两域 14）；MVP 取约 40 条高参数化条目。

**调研清单→目录映射**：04§7=39、07§四=41、06§六=23 为全量清单，目录取约数之差来自同族条目合并（如 easing 变体并档）；M0 建仓时生成 mapping.json——条目 id 保留调研编号，逐条标注合并/降级原因，保证可追溯。

## 3. 条目数据模型（字段级 schema）

每条目 = 一份 JSON schema（命名兼容 DTCG，09§2.1§3.1）+ 一篇 MDX：

- `name`/`aliases`：官方与社区命名；`category`、`system`（apple/m3/fluent/web-std/component-lib/community）、`origin`
- `params[]`：**type 枚举**——`color`（oklch/hex）、`dimension`（数值+单位 px/%/ms）、`number`（min/max/step）、`cubicBezier`（[x1,y1,x2,y2] 四元组）、`enum`（options）、`shadow`（多层阴影对象数组）。每参数 name/type/range/default/effect 必填；值取自官方 spec 与源码（SwiftUI spring 0.5/0.825、M3 spatial 0.8/380、antd seed.ts，02§1§2§5）。

Glassmorphism params 片段（schema JSON 样例）：

```json
{"params":[
 {"name":"blur","type":"dimension","unit":"px","min":0,"max":40,"step":1,"default":20,"effect":"背景模糊半径，0 则效果失效"},
 {"name":"fill","type":"color","format":"oklch","default":"oklch(1 0 0 / 0.15)","effect":"底色 alpha 读作 frost"},
 {"name":"border","type":"color","format":"oklch","default":"oklch(1 0 0 / 0.3)","effect":"1px 描边承接环境光"},
 {"name":"radius","type":"dimension","unit":"px","min":0,"max":32,"default":20,"effect":"圆角"},
 {"name":"variant","type":"enum","options":["light","dark"],"default":"light","effect":"切换深浅填充/描边"}
]}
```

- `demo`：实现方式 + browserSupport（逐条对 BCD，02§8 方法）+ fallback
- `codeBreakdown`：结构/样式/动效/参数敏感度四段教学叙事（08§四空白②）
- `scenarios`（含"何时不要用"）、`a11y`、`sources[]`（一手 URL 强制 ≥1）
- **`promptTemplate`（可执行定义）**：① 结构=目标组件描述（布局/内容/状态）→ **参数快照代码块**（DTCG 兼容 JSON，`{name,value,unit}`；序列化为 URL hash 供分享、JSON 内嵌供 prompt）→ 验收要点；② Glassmorphism 示例：「复刻毛玻璃卡片：backdrop-filter blur(20px) saturate(180%)，底色 oklch(1 0 0/0.15)，1px oklch(1 0 0/0.3) 描边，圆角 20px。参数快照：{…}」；③ 通过/失败阈值见 §5.4。

## 4. 功能矩阵（四要素分期）

| 能力 | MVP（0–3 月） | V1（3–6 月） | V2（6–12 月） |
|---|---|---|---|
| ① 交互实例 | 40 条高参数化条目（风格/材质/动效/色彩） | 全域 100+ 条含组件法则 | 170 条全量 |
| ② 代码拆解 | 高亮代码+逐段注释 | 四段教学叙事 | 拆解↔参数联动高亮 |
| ③ 参数调节 | **统一 store**：CSS 变量+滑杆即时生效+影响说明 | @property 类型约束、Motion 真弹簧、内嵌对比度校验 | 快照分享链接、预设库 |
| ④ prompt 导出 | 快照→结构化 Markdown prompt 一键复制 | 按 agent 定制模板；全站 llms.txt+条目 .md | MCP server、shadcn registry、"Open in v0" |

**MVP 验收判据（可勾选）**：通用阈值——任一参数改动 ≤100ms 视觉生效；目标浏览器=近两年版 Chrome/Edge/Firefox/Safari（BCD 为准），不满足必须走 fallback；prompt 复刻关键参数命中 ≥8/10（§5.4 度量）。分条：Glassmorphism 五参数（blur/fill/border/radius/variant）可调+快照导出；spring 两套参数可调且中断续接行为可见；oklch 固定 L 调 C/H 实时反映色板与 APCA 对比度数值。

## 5. 内容生产流水线

1. **模板化**：条目 = schema JSON + MDX；调节面板由 params schema 自动生成（Storybook Controls/Leva 模式，09§2.1）。
2. **来源校验**：强制一手来源，浏览器支持对 BCD 核验（02§8）；入库规则改为**"未经官方页核实的数值不入库"**。M3 easing 口径调和：02§7 首抓未提取到贝塞尔数值（当时判"未证实"），04§1.4 复抓官方 tokens-specs 页已提取 standard=cubic-bezier(0.2,0,0,1.0)、emphasized decel/accel 等官方数值——**以 04 的官方页复抓为准入库**；02§7 的警示仅用于拒绝社区流传且无官方页出处的数值。
3. **参数标注**：区分官方默认值与生产甜点值（03 风格页实测），每参数必填 effect。
4. **prompt 校验（可执行）**：Kombai 指标依赖其自建评测管线、v0 无公开评测 API，故采用**代理指标**：固定同一 agent 模型按导出 prompt 生成 → (a) 关键参数命中率（对 computed style / JS 运行时状态逐项比对，阈值 ≥8/10）；(b) 截图并排人工评审。最小抽查=每批新条目抽 5 条 + 每季全量抽 10%；无法自动化的部分记为已知人工成本。
5. **趋势更新**：季度监控 BCD diff + 年度趋势源 + 官方发布节点（WWDC/Google I/O）；**superdesign 份额强制口径标注，且仅作单源证据，制度性叠加 daisyUI/Adobe 等第二数据源交叉验证**；趋势与常青分离存储。

**产能依据**：170 条 ÷ 12 月 ≈ 14 条/月；单条目（schema+MDX+demo+面板+校验）复用模板后估算 0.5–1 人日，即每周 3–4 条可承载。MVP 40 条 = 全部 ★★★（风格 7 + 材质 12 + 动效约 6 + 色彩 5 + 排版 2 + 布局 1 ≈ 33 条）+ 动效/色彩 ★★ 补足（配对表、View Transitions、light-dark() 等）；候选清单随 mapping.json 产出。

## 6. 技术选型

推荐**方案 C：Astro + token 管道 + registry**（09§4 三方案对比）：

- **Astro + @astrojs/mdx**：内容站为主、交互组件 `client:load` 岛屿水合；content collections 管理 160+ 条（09§2.3）。
- **参数运行时统一模型**：每条目单一 params store（订阅式值对象）——CSS 变量型参数经订阅回调 `setProperty` 即时生效；JS 型参数（Motion 真弹簧、SwiftUI/M3 spring 族）经同一 store 直接驱动 JS 动画、不经 CSS 变量。**快照合并规则**：导出即序列化 store 全量值，两类状态同源、无分叉；导入时按 type 分发回两条通道。**真弹簧判定标准**：交互可被打断且需从当前速度继续（拖拽/手势/跟随）→ 真弹簧；一次性进场过渡 → Motion duration+bounce 编译为纯 CSS + linear()（Baseline 2023-12）零运行时兜底（09§1.6）。
- **token 管道**：DTCG token JSON（W3C CG 2025.10 稳定版，01§3.2）→ Style Dictionary → CSS 变量；@property 类型约束（Baseline 2024，09§1.2）。
- **prompt 通路**：llms.txt + 条目 .md +（V2）registry-item/MCP——"agent 读结构化 spec"是已发货范式（09§3）。
- 弃选：方案 A 零构建（弹簧烘死）作降级参考；方案 B Next.js 全栈成本最高，仅当转型 React 组件库文档时再评估。

## 7. 差异化与竞争分析

四要素覆盖现状（08§四矩阵）：①实例覆盖最充分——easings.net 8.7k★、react-bits 52.4k★、shadcn/ui 128.6k★；②教学级拆解稀缺——普遍停留"给源码"；③参数调节充分但单点、未与画廊结合——cubic-bezier.com 184★、oklch.com 2k★、realtimecolors 934★ 各管一个参数域；④最空白——现有仅"组件库喂 agent"（21st.dev Copy prompt 闭源、shadcn MCP、awesome-design-md 128.4k★），**"调好参数的实例→一键复刻 prompt"成规模工具不存在**（08§3.5，仅 0–1★ 微仓库）。本节 star 数与仓库描述已于 2026-11-21 经 GitHub API 抽查复核成立。

空白点即定位：③+④ 桥接层与四要素合一均无现有项目。护城河在内容资产（一手来源校验的 170 条 schema）与自动化管道（schema→面板→prompt），而非单点功能。

## 8. 工程骨架与站点 IA（v2 新增）

- **岛屿框架拍板 React + TypeScript**：Motion 官方 React 绑定、Leva 面板均属 React 生态（09§2），交互岛统一 React；调节面板自研轻量组件（schema 驱动），Leva 仅作原型。
- **站点样式**：vanilla CSS + CSS 变量，与 token 管道同构，不引 Tailwind。
- **托管**：Cloudflare Pages（纯静态输出、无 SSR 依赖），CI 预览部署。
- **目录树**：`src/content/entries/{category}/{slug}/` 每条目三件套 `schema.json`（DTCG 兼容 params）+ `index.mdx`（四段拆解）+ `demo/`（React 岛屿）；`src/lib/store.ts` params store；`scripts/prompt.ts` 快照→prompt。collection 与一级类一一对应（styles/materials/motion/color/type/layout/components/principles/icons/dataviz），zod 校验。
- **站点 IA**：URL `/{category}/{slug}/`（趋势 `/trends/`）；列表页三维过滤=分类 × system 来源 × 参数化星级；条目间按共享 system 与参数重叠自动生成关联链接；`/llms.txt` 索引与 URL 树一一对应，每条目同 URL 附 `.md` 纯文本版。

## 9. 里程碑路线图（含风险与规避）

- **M0–M1 管道打样**：schema/面板/导出链路 + 3 条种子条目四要素闭环 + mapping.json。
- **M2–M3 MVP**：40 条高参数化条目上线，prompt 导出 + llms.txt；补图标/dataviz 专项调研。
- **M4–M6 V1**：全域 100+ 条；四段拆解；快照分享。
- **M7–M12 V2**：170 条全量；MCP server + registry + "Open in v0"；趋势季度自动化。

风险与规避：1. **浏览器兼容**：折射 backdrop-filter:url() 仅 Chromium（09§1.5）→ browserSupport 必填 + 回退随条目交付。2. **规范漂移**：调研期内多处 404/迁移（02§7）→ 来源监控 + 存档快照。3. **prompt 质量无外部标准**（09§3.4 工程推断）→ §5.4 代理指标做内部回归基线。4. **趋势条目易过时** → 与常青分离；份额数据季度刷新且标注口径。5. **同质化反噬** → 每条目强制反模式（Marque anti-defaults 思路，01§2.2）。

## 10. 许可与合规（v2 新增）

- **demo 代码 MIT**；正文与图解 **CC BY-NC 4.0**（商用授权 V2 再议）。
- 引用官方规范数值属事实引用，逐条附一手来源链接，不整段转载官方文案。
- V2 的 registry/MCP 以 MIT 开源，schema 公开；第三方数据（如 superdesign 份额）引用时注明口径与来源。
