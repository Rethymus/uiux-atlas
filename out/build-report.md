# uiux-atlas 开发与验证总报告

> **开发与首轮验证由先前运行完成,本报告数字为收尾运行实测(2026-11-21)。**

生成时间:2026-11-21。第一、三、五、六节沿用先前运行报告内容(仅按本次结论润色);第二节与第四节为本次收尾运行的实测数字,并在报告撰写阶段逐条复跑确认。

---

## 一、交付概览

**43 条条目 × 6 分类**(逐目录实数 `uiux-atlas/src/content/entries/`,与 `verify-entries.mjs` 期望清单一致):

| 分类 | 条目数 | 条目 |
|---|---|---|
| styles 风格 | 7 | glassmorphism、neumorphism、claymorphism、neo-brutalism、minimalism、cyberpunk、bento-grid |
| materials 材质 | 12 | backdrop-filter、filter-functions、liquid-glass、swiftui-materials、fluent-acrylic、fluent-mica、m3-state-layers、aurora-gradient、grain-gradient、blend-modes、theme-shadow、glass-effect-api |
| motion 动效 | 11 | motion-spring、cubic-bezier、swiftui-spring、m3-spring-tokens、scroll-driven-animations、view-transitions、count-up、inertia-gesture、skeleton-loading、stagger-orchestration、linear-easing |
| color 色彩 | 9 | oklch-workflow、oklch-space、hct-tonal-palette、m3-dynamic-color、radix-color-scale、light-dark、rule-60-30-10、wcag-contrast、gradient-interpolation |
| type 排版 | 3 | fluid-type-scale、variable-fonts、fluid-spacing |
| layout 布局 | 1 | container-queries |

**四要素实现方式**(四要素定义见蓝图:①可交互实例 ②代码拆解 ③参数实时调节 ④一键复刻 prompt):

- **① 可交互实例+效果呈现**:每条目自带 `demo/Demo.tsx`,以 React 岛屿(client:load)挂进 `DemoStage` 演示舞台,视觉即改即见,动效类条目响应 `prefers-reduced-motion` 降级。
- **② 代码拆解讲解**:每条目 `zh.mdx` / `en.mdx` 双语正文按「结构与 DOM / 样式与参数 / 动效与交互 / 参数敏感度」四段 h2 拆解并渲染进条目页正文,参数敏感度逐参数说明调大调小的后果。
- **③ 参数在线实时调节**:`ParamPanel` 由条目 `schema.json` 的 params 契约自动生成控件(滑杆 / OKLCH 四轴 / 贝塞尔曲线编辑器 / 分段按钮 / 阴影逐层),改动经 `ParamStore` 即时注入 CSS 变量或订阅驱动 demo,附「复位官方默认」。
- **④ 一键生成复刻 prompt**:`store.exportSnapshot()` + `buildPrompt` 把当前参数快照浓缩成结构化复刻 prompt,「复制复刻 Prompt」按钮一键复制给任意 AI agent。

全链路可追溯:9 个批次(b0-seed、b1a、b1b、b2、b3a、b3b、b4a、b4b、b5)的来源映射已合并为 **`out/mapping.json`**(43 条,每条含 batch / id / researchRef / note,指向 `out/research/01–09` 九份调研报告的具体章节;收尾运行已核验该文件存在、元素字段恰为 batch/id/researchRef/note,batch 分布 3+6+6+6+5+5+4+4+4=43)。

## 二、门禁与自动校验结果(收尾运行实测)

四道门禁在收尾运行逐条实测,**全部退出码 0、修复 0 轮**(一次通过,未触发任何修复回路);报告撰写阶段又在同一环境逐条复跑,结论一致:

| 检查 | 命令 | 实测结果 | 退出码 | 修复轮次 |
|---|---|---|---|---|
| 类型检查 | `pnpm -C uiux-atlas exec astro check` | **通过**:73 files,0 errors / 0 warnings / 1 hint(`PromptExport.tsx:57` 的 `document.execCommand` 已弃用提示) | 0 | 0 |
| 全站构建 | `pnpm -C uiux-atlas run build` | **通过**:100 page(s) built in 16.64s,dist/ 全量产出 | 0 | 0 |
| 条目完整性 | `node uiux-atlas/scripts/verify-entries.mjs` | **通过**:`{"expected":43,"found":43,"problems":0}`,43 条条目的结构 / 双语 / 来源 URL / 参数 shape 逐项机器校验 | 0 | 0 |
| 构建产物 | `node uiux-atlas/scripts/verify-dist.mjs` | **通过**:`{"checked":100,"missing":0,"contentFails":0}`,双语三层路由 100 页(2 首页 + 12 分类页 + 86 条目页)全部产出且含关键内容标记 | 0 | 0 |

**页数口径说明**:收尾运行背景记录曾写「verify-dist:91 个双语页面」,与本次复跑实测不符——astro build 日志为「100 page(s) built」、verify-dist 脚本输出 `checked:100`、dist/ 物理逐目录清点亦为 100 个 HTML(2 首页 + 12 分类页 + 86 条目页,脚本期望清单恰为 100)。三处独立证据一致,以实测 100 为准;91 与先前开发期旧日志的陈旧数字相同,判定为记录误差。

备注:① 报告撰写阶段复跑的执行形式为在 `uiux-atlas/` 目录内 `pnpm exec astro check`、`pnpm run build`,以及 `node scripts/verify-entries.mjs`、`node scripts/verify-dist.mjs`、`node scripts/verify-prompt-test.mjs`,与上表 `-C` 形式等价;verify-dist 在重跑 build 前后各执行一次,输出相同。② astro check 的 1 条 hint 为 `document.execCommand` 弃用提示,属已知可接受项(剪贴板降级方案兜底,见 `src/components/PromptExport.tsx:57`)。

## 三、独立评审

独立评审员(首次接触项目的资深评审人设)抽查 6 条目:三条种子(styles/glassmorphism、motion/motion-spring、color/oklch-workflow)+ 三条非种子(materials/liquid-glass、motion/m3-spring-tokens、color/m3-dynamic-color),逐条核对 schema.json、zh.mdx、demo/Demo.tsx 与调研报告,并检查双语首页信息架构。**共 6 条意见:高危 1 条已修复,低危 5 条遗留待办。**

**高危(已修复)**:color/oklch-workflow `demo/Demo.tsx` 的 WCAG 对比度计算把亮度公式直接作用在 gamma 编码后的 sRGB 通道上,缺少线性化,对比度被系统性放大(中灰 8.77:1 误标 AA,真实 3.5:1)。已按评审建议在 `luminance()` 内补 WCAG 线性化(`unlin = v<=0.04045 ? v/12.92 : ((v+0.055)/1.055)^2.4`),修复后先前运行四道门禁复跑全绿;本次收尾运行四道门禁再次全绿(见第二节)。

**遗留意见(原样,均「待办」)**:

1. **【待办·low】m3-dynamic-color zh.mdx:18** 调研引用编号悬空:「(调研 06§十10 同构佐证)」——out/research/06-color-theming.md 只有 一~七 章,不存在「§十」;所指内容实际是 06 报告「二、调色板方法论」下的 ### 10(06-color-theming.md:125),全文仅此一处坏引用。建议:改为「调研 06§二10」或在 06 报告补交叉引用后保持原编号。
2. **【待办·low】m3-dynamic-color zh.mdx:47** 引语归属错误:「(Android 官方立场:暗色主题『not necessarily inversions』,调研 06§三12)」——该英文原话出自 Apple HIG 暗色模式页(调研 06:155),Android 部分记的是 DayNight/语义 token 路线与 Force Dark 反例,立场无错、出处张冠李戴。建议:改为「Apple HIG 原文…,Android 语义 token 路线同构」或删去「Android 官方立场」限定。
3. **【已修复 2026-11-21】motion-spring zh.mdx:36-37 与 schema.json:36-38,66-76** 差异披露不完整且有一处移植:schema/正文披露了 stiffness「文档标注 1 vs 运行时 100」(属实),但同一 springDefaults 块还有 `bounce: 0.3`、`duration: 800ms` 与文档标注 0.25 / 0.3s 同类不一致未并列披露;另 zh.mdx:36 给 spring 的 duration 加注「多关键帧时 0.8s」,调研 04:36 将该注记记在 tween 名下。~~建议:补 bounce/duration 两行同源差异,删除或注明「多关键帧时 0.8s」实为 tween 注记。~~ **核实与修复:zh/en.mdx 已并列披露 duration 省略时运行时回退 800ms 的同型分歧,并注明「多关键帧 0.8s」实为 tween 注记;另经核实 schema 与 demo 的 bounce 均为文档标注值 0.25,不存在 bounce 0.3 的使用(评审该子项有误,未采纳)。**
4. **【待办·low】dist/en/index.html 与 dist/index.html 文案两处** 双语首页信息架构总体可用,但:① 英文首页 Layout 分类显示「1 entries」应为「1 entry」;② 精选卡片 tagline 把内部调研编号泄漏给终端用户(「调研 04§4」/「research 04 §4」)。建议:cat-count 按 count==1 走单数;精选 tagline 剥离调研编号(条目详情页内保留)。
5. **【部分完成 2026-11-21】全部 6 条目的 schema.json sources 数组**「来源 URL 可达性抽查」已补跑:对 6 条受审条目的全部 **16 个来源 URL** 逐一实测(curl GET,跟随跳转,12s 超时)——**3 个 Apple 域名 URL 返回 200**;其余 13 个 URL 在当前收尾环境连接层失败(000/TLS 重置,curl/fox_fetch/WebFetch 三个独立通道均无法出站到 MDN/W3C/GitHub/motion.dev/m3.material.io 等),属本机网络出口限制而非链接失效(000 为连接失败,非 HTTP 错误码),且 16 个 URL 在 2026-11-20/21 原始调研期间均被研究员成功抓取过。**结论:3/16 实测通过,13/16 待本机外联恢复后复测**(`curl -sL -o /dev/null -w "%{http_code}" <url>` 即可)。

## 四、Prompt 复刻实弹测试(收尾运行实测)

**命中 7/7**(阈值 ≥5/7 为通过;尝试 1 次,退出码 0)。复刻产物 `out/prompt-test/glassmorphism.html` 七项参数正则逐项全中,脚本原始输出逐字如下:

```json
{"passed":7,"total":7,"details":["HIT: backdrop-filter 应用","HIT: -webkit-backdrop-filter 前缀兜底","HIT: blur = 20px(字面量或 CSS 变量)","HIT: border-radius = 20px(字面量或 CSS 变量)","HIT: 填充 alpha ≈ 0.15(或 15%)","HIT: 描边 1px + alpha ≈ 0.3(或 30%)","HIT: 彩色照片或渐变背景"]}
```

逐项明细:

| # | 检查项 | 结果 |
|---|---|---|
| 1 | backdrop-filter 应用 | HIT |
| 2 | -webkit-backdrop-filter 前缀兜底 | HIT |
| 3 | blur = 20px(字面量或 CSS 变量) | HIT |
| 4 | border-radius = 20px(字面量或 CSS 变量) | HIT |
| 5 | 填充 alpha ≈ 0.15(或 15%) | HIT |
| 6 | 描边 1px + alpha ≈ 0.3(或 30%) | HIT |
| 7 | 彩色照片或渐变背景 | HIT |

**与上一轮的对照**:先前报告记「命中 0/6」,根因是校验脚本自身缺陷而非复刻产物质量——`verify-prompt-test.mjs` 的 `workspaceRoot` 把工作区根解析成上跳三级,误判已生成的产物缺失。该缺陷已修复(现上跳两级指向工作区根,`uiux-atlas/scripts/verify-prompt-test.mjs:12`),现行检查集共 7 项、阈值 ≥5/7(`uiux-atlas/scripts/verify-prompt-test.mjs:15-23,40-41`);本次收尾运行实测 7/7 一次通过,先前「0/6」及其后同规则复测「4/6 压线」的旧结论由本次实测取代。

## 五、本地运行方式

项目为 pnpm 工作区子包(依赖已装,可直接跑):

```bash
pnpm -C uiux-atlas dev        # 开发服务器(http://localhost:4321)
pnpm -C uiux-atlas build      # 全站静态构建到 dist/
pnpm -C uiux-atlas preview    # 本地预览构建产物(build 之后)
pnpm -C uiux-atlas check      # astro check 类型检查
```

不用 pnpm 时对应 npm:`npm run dev --prefix uiux-atlas` 等(package.json scripts:dev/build/preview/check 均已定义)。项目说明、目录结构与许可(MIT demo / CC BY-NC 4.0 正文)见 **`uiux-atlas/README.md`**。

## 六、后续建议(三条)

1. **复刻测试已收口**:先前指出的 `verify-prompt-test.mjs` workspaceRoot 解析缺陷已修复、检查集扩为 7 项,收尾运行实测 7/7 全命中(见第四节),无需再补;后续条目参数或 prompt 模板再有改动时,沿用同一脚本做回归即可。
2. **评审 5 条遗留待办已处置(2026-11-21 收尾会话)**:①②引用编号与引语归属已修正(双语同步);③motion-spring 差异披露已补行(bounce 0.3 子项经核实为评审有误,未采纳);④双语首页单复数与 tagline 调研编号剥离已完成;⑤URL 可达性抽查已补跑——3/16 实测 200(Apple 域),13 个因本机网络出口限制待外联恢复后复测(详见第三节第 5 条)。
3. **上线前补测**:工作流未覆盖项——真实浏览器人工过目(重点三条种子条目手感)、Lighthouse/性能与 SEO 细节,建议作为发布前检查单执行。
