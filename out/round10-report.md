# Round 10 报告:全量扩编(142 → 185 条,九批 43 条)+ v2.6 参数面板升级

> 撰写时点:2026-11-23。撰稿人会话内实读:`out/design-study/12-expansion.md`(656 行全文)、`out/round9-report.md`、`uiux-atlas` 两校验脚本 verify-entries.mjs / verify-dist.mjs 的 git diff、README.md 与 docs/design-spec.md 的 diff、astro.config.mjs diff、新条目 schema.json 抽样(brand-color-system / cascader)。`git -C uiux-atlas diff --stat HEAD`、逐分类 `ls` 计数、8 项门禁均为本会话实跑输出,非引用旧档。

## 一、全量扩编概览(九批 43 条清单 + 各域新总量)

**实跑 `git -C uiux-atlas diff --stat HEAD`**:25 个已跟踪文件,+1402 / −241,收于「25 files changed, 1402 insertions(+), 241 deletions(-)」。HEAD 在 `1c130fe`(round9 七批 45 条已入库);`git status --porcelain` 实测 75 项 = 29 修改 + 46 未跟踪(43 个新条目目录 + 3 个新页面 `404.astro` / `robots.txt.ts` / `sitemap.xml.ts`)。注意:`git status` 标记 motion 下 cubic-bezier、damping-craft 各双语 mdx 共 4 文件为 M,但对这 4 文件单独 `git diff HEAD` 无文本差异(仅行尾 EOL 状态),以 diff --stat 25 文件为权威口径。

**逐分类计数(本会话实跑 `ls` 逐目录清点)**:`src/content/entries/` 10 分类 **185 条目**:color 14→19 / components 24→30 / dataviz 8→11 / icons 8→12 / layout 9→15 / materials 12→16 / motion 25→31 / principles 15→18 / styles 18→18(无新批,仅 glassmorphism、spatial-ui 两 schema.json 增 presets 字段)/ type 9→15。合计 +43,与「九批 43 条」账目相符。双语 MDX 本会话 `find` 实数 185 zh + 185 en = 370 篇;星级分布逐条 node 实扫 schema.json 得 3★109 / 2★75 / 1★1,与 README 新徽章「条目 185 · 分类 10」及正文口径逐字一致。

**九批 43 条清单**(批号取自 verify-entries.mjs / verify-dist.mjs diff 内批注,slug 实读新增目录 + 批注清单核对):

| 批 | 域 | 前量→新量 | 条数 | slug |
|---|---|---|---|---|
| b16-layout2 | layout | 9→15 | 6 | split-view / aspect-ratio / responsive-images / logical-properties / writing-modes / custom-scrollbar |
| b17-type2 | type | 9→15 | 6 | tabular-numbers / baseline-grid / font-pairing / small-caps-features / vertical-rhythm / display-typography |
| b18-color2 | color | 14→19 | 5 | brand-color-system / dark-mode-patterns / status-color-system / color-functions / multi-theme-tokens |
| b19(微交互补全·二) | motion | 25→31 | 6 | flip-technique / scroll-snap / magnetic-hover / kinetic-typography / progress-motion / handoff-curves |
| components 二批(批注无编号) | components | 24→30 | 6 | cascader / collapse-panel / rate-score / stepper / timeline / upload-states |
| b21-materials2 | materials | 12→16 | 4 | contact-shadows / specular-highlight / dimming-layer / depth-of-field |
| b22-icons2 | icons | 8→12 | 4 | icon-font-vs-svg / icon-button / favicon-stack / icon-system-design |
| b23-dataviz | dataviz | 8→11 | 3 | small-multiples / chart-animation / chart-accessibility |
| b24-principles2 | principles | 15→18 | 3 | aesthetic-usability / goal-gradient / pareto-principle |

九批全部「落地即并入 EXPECTED 缺失强制校验」(两脚本 diff 批注原文);schema 抽样(brand-color-system「品牌色系统」3★、cascader「级联选择」form 子组 2★)四要素齐全且 origin 逐条标注调研出处。

**接线动作(实读 diff)**:astro.config.mjs 增 `site: "https://uiux-atlas.example.com"` 占位域名(自注「上线前改正式域名,robots/sitemap/canonical 均派生自此」);verify 两脚本期望 142→185 并增 components 30/30、icons 12/12、dataviz 11/11、principles 18/18 四条强制缺失校验输出行;README 双语 185 口径全量回填(含 397 页、404 页单列说明)。另注:本轮工作区同时承载 **v2.6 参数面板升级**工作流(design-spec.md diff 自述六项:预设色板 / oklch 预览+取色器桥 / 单参数复位 / 数值输入契约 / 分组折叠 / Bezier 预设扩充;对应 ParamPanel +558、global.css +418、FilterBar +82、EntryDetail +80、Base.astro +73、lib/color.ts 增 `srgbToOklch`/`rgb01ToHex` 等跟踪文件改动)——43 条扩编为新增文件不在 diff --stat 内,以 status 未跟踪项计,两股改动同在工作区待提交。

## 二、补研要点(12-expansion.md 新概念)

调研 2026-11-22,16 节(15 主题 + 十个签名巧思),逐节与九批条目对映,新概念要点:

1. **响应式图片三件套 + fetchpriority**(§1→responsive-images):srcset/sizes/picture 选择规则、`fetchpriority` high/low;web.dev 实测 Google Flights LCP 2.6s→1.9s、Oodle 轮播减载 2s。
2. **CSS 逻辑属性与书写模式**(§2→logical-properties、writing-modes):inline/block 流维度映射表、`sideways-*` experimental 需 `@supports`;RTL/竖排一改 `dir` 全站翻转。
3. **FLIP 四步**(§3→flip-technique):First-Last-Invert-Play(Paul Lewis aerotwist 原文),只动 transform/opacity、复用交互后 ~100ms 响应窗口;Comeau 同题 404 已如实改源。
4. **CSS Scroll Snap**(§4→scroll-snap):snap area/snapport 概念、`scroll-padding`(容器)vs `scroll-margin`(子项)、`scroll-snap-stop: always`;L2 `scrollsnapchange` 事件需降级。
5. **磁吸交互**(§5→magnetic-hover):lerp 0.05–0.2、`gsap.quickTo`(3.10+);`prefers-reduced-motion` 与 `(hover:none)` 双降级。
6. **动态文字**(§6→kinetic-typography):可变字体轴动画、`GRAD` 轴零重排呼吸、SplitText v3.13+ 重写;GSAP 免费许可标注「背景知识未核验」。
7. **分层阴影/接触阴影/镜面高光**(§7→contact-shadows、specular-highlight):阴影不叠纯黑、同透明度倍增层 1/2/4/8/16px、贴地椭圆伪元素、`::before` 天光、单光源 1:2 比例;AO 术语自标「实践共识」。
8. **压暗层与景深**(§8→dimming-layer、depth-of-field):`::backdrop`(Baseline 2022-03)、`color-mix` 造 scrim、blur→dim→sharp 三层;MD scrim 数值**未证实**。
9. **表格数字/基线网格/字体搭配**(§9→tabular-numbers、baseline-grid、font-pairing、vertical-rhythm):`tnum` 全值族、18px 基本单元整数倍律、em 纪律;搭配方法论自标「未证实」。
10. **font-feature-settings**(§10→small-caps-features、display-typography):4 字符标签契约、官方「小型大写用高层属性 font-variant-caps」告诫。
11. **颜色函数族与状态色系统**(§11→color-functions、status-color-system、brand-color-system、multi-theme-tokens、dark-mode-patterns):color-mix 百分比归一化、相对颜色 `rgb(from …)` 可升可降 alpha、Safari 16.4 旧语法 `@supports` 分支、三层 token 品牌切换只换 primitive。
12. **图标体系**(§12→icon-font-vs-svg、icon-button、favicon-stack、icon-system-design):CSS-Tricks CAGEMATCH「inline SVG 几乎全面胜出」、Sara Soueidan 图标按钮三方案(名称勿只放 SVG)、Evil Martians favicon 5 图标 + 1 manifest。
13. **数据可视化**(§13→small-multiples、chart-animation、chart-accessibility):Tufte 小倍数、Chart.js 三级配置与过渡模式、WAI 两段式替代文本 + `<figure role="group">`。
14. **交互法则三连**(§14→aesthetic-usability、goal-gradient、pareto-principle):Kurosu & Kashimura 1995 ATM 实验、Hull 1932 目标梯度(人为进度)、帕累托「roughly 80/20」防机械套用。
15. **组件规格六件**(§15→components 二批):AntD 现行文档 2026-11-22 抓取(含 items 配置化、Timeline `dot→icon` 等改名)、Cascader `loadData` 与 `showSearch` 互斥、Upload status 四值、APG 手风琴骨架与 Rating Radio Group 无独立 rating 模式。

## 三、门禁实测(本会话实跑,计数以实跑为准)

| 门禁 | 命令 | 结果 |
|---|---|---|
| 条目完整性 | `node scripts/verify-entries.mjs` | `{"expected":185,"found":185,"problems":0}` PASS,含新输出行 components 30/30、icons 12/12、dataviz 11/11、principles 18/18 |
| 构建 | `pnpm run build` | **397 页** 34.38s Complete(round9 为 310 页,+87 = 43 条 ×2 语言 + 新 404 页;robots.txt / sitemap.xml 为非 HTML 输出另计) |
| 产物核验 | `node scripts/verify-dist.mjs` | `{"checked":396,"missing":0,"contentFails":0}` PASS(README 自注:另 1 页为 404 错误页不在此门禁内) |
| 对比度 | `node scripts/check-theme-contrast.mjs` | 12/12 达标、0 解析错误,exit 0(深 16.45…6.43、accent 8.71;浅 15.61…4.94、accent 4.81) |
| 类型检查 | `pnpm exec astro check` | 239 files,0 errors / 0 warnings / **3 hints**:`PromptExport.tsx:76` execCommand 弃用(旧)、`icons/icon-button/demo/Demo.tsx:163` ts(6133) 未用 `pressed`(**本批新增**)、`motion/parallax/demo/Demo.tsx:157` 未用 `scrollable`(round9 遗留未清) |
| MCP 冒烟 | `node scripts/test-mcp-server.mjs` | PASS(4/4 断言) |
| Prompt 实弹 | `node scripts/verify-prompt-test.mjs` | 7/7 命中 PASS |
| Registry | `node scripts/verify-registry.mjs` | **FAIL,exit 1**:expected 24、实扫 30 部件;cascader / collapse-panel / rate-score / stepper / timeline / upload-states 6 个 JSON 缺失且 index 未收录——components 二批未过 `generate:registry`,**本轮唯一红灯** |

产物抽查(实跑 grep):`dist/llms.txt:202` 有 `## principles 交互法则 / Principles (18)` 节;`dist/index.html` 含「交互法则」2 处;`dist/robots.txt` / `dist/sitemap.xml` 均产出,后者 396 个 `<url>`,域名皆为占位 `https://uiux-atlas.example.com`。README 徽章/正文/星级已同步 185×10 口径(diff 实读);round9 遗留的 `--cat-principles` 分类色 token 经 grep 复测**仍未定义**(global.css:81–89 及 277–285 仅 10 分类,principles 分类页继续无色带),design-spec「43 条」MVP 遗留仍未回填(README 已声明不作为权威)。

## 四、无法机器验证项(如实列出)

1. **兼容性声明未在本会话复核**:43 条新条目的 browserSupport 承接调研 2026-11-22 一手抓取,本会话未重抓 MDN BCD JSON 逐条复核;sideways-*、scrollsnapchange 等在不可用浏览器的降级表现未真实浏览器实测。
2. **观感与手感类**:scroll-snap 吸附手感、磁吸半径回弹、FLIP 观感、kinetic typography 逐字 reveal 等主观体验无自动化代理;headless 滚动路径限制(round8 附录留档)继续有效;v2.6 面板触屏/读屏人因验收非机器可测。
3. **调研自记未证实项(实读 12-expansion.md 附节,7 项)**:MD scrim 不透明度规范页抓取为空;Comeau FLIP 文 404;Google Fonts Knowledge 正文 JS 渲染不可读;Codrops 磁吸教程 URL 未核验;Arco 组件文档未抓取(仅列入口);MDN 相对颜色独立指南 404;GSAP 转 Webflow 后免费结论来自背景知识未核验。
4. **README 9 张截图仍摄于 97 条目时点**(README 自注「截图重拍待做」),185 条目页面形态的截图时效无法机器验证;design-spec 自称 `srgbToOklch` 往返误差 1.61e-7 未在本会话复算。

## 五、后续建议(≤3)

1. **尽快提交本批 V5 变更**:75 项未提交(43 新条目目录 + 3 新页面 + 29 个跟踪文件,含 v2.6 面板),无提交号即无回滚锚点;提交时建议条目扩编与面板升级分两个 commit 便于回溯。
2. **修复 registry 红灯**:跑 `node scripts/generate-registry.mjs` 生成 6 个新组件 JSON、重生成 index,并把 verify-registry 期望 24→30 与部件清单同步,恢复门禁全绿。
3. **一次清四笔小债**:global.css 补 `--cat-principles` 分类色(round9 遗留仍在,过对比度门禁);删 `icons/icon-button/demo/Demo.tsx:163` 未用变量消掉本批新增 hint;185 条目时点重拍 9 张 README 截图;上线前替换 astro.config.mjs 占位域名(sitemap/robots/canonical 全部派生自此一处)。
