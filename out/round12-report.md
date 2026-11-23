# Round 12 报告:双审计(perf/a11y)修复与九项门禁落锁 + MCP 接入文档 + 趋势刷新脚手架

> 撰写时点:2026-11-23。本会话实读:`uiux-atlas/scripts/check-perf.mjs` 前 40 行(实际通读全文 127 行)、`scripts/check-a11y-static.mjs` 前 40 行(实际全文 216 行)、`docs/mcp-setup.md` 前 40 行(实际通读 116 行结构)、`scripts/refresh-trends.mjs`(30–80 行细读)、`scripts/integration-font-preload.mjs` 头 25 行;审计中间产物 `tmp-a11y-audit/{audit.mjs,summary.mjs,after-fixes.json,after-fixes2.json,after-fixes-final.json}` 与 `tmp-perf-audit/audit-html.mjs`。`git -C uiux-atlas diff --stat HEAD~`、`pnpm run build`、`node scripts/check-perf.mjs`、`node scripts/check-a11y-static.mjs`、`node scripts/refresh-trends.mjs` 均为本会话实跑。

## 一、双审计发现与修复对照

**工作区总账(实跑 `git -C uiux-atlas diff --stat HEAD~`)**:HEAD `6fac8e3`(本轮主体已提交)对 `HEAD~1=1c130fe` 为 **234 files changed, 24940 insertions(+), 340 deletions(-)**;其上另有 34 项未提交(29 修改 + 5 未跟踪),**两个门禁脚本、MCP 文档、趋势脚手架、fontPreload 接线与照片 lazy 修复本身都在未提交集内**(详见建议①)。

### perf 审计(发现 → 修复 → 回归锁定)

| # | 发现(证据) | 修复 | 回归锁定 |
|---|---|---|---|
| P1 | 六关键页 HTML 字节无预算:基线实测 zh 首页 36,655B / en 首页 36,983B / zh 分类 38,914B / en 分类 39,768B / zh 条目 63,606B / en 条目 63,425B(`check-perf.mjs:8-10,31-36`) | 无需改码(数值健康);预算 = 基线 ×1.1 上浮写入门禁(`check-perf.mjs:38,64-67`) | 门禁①,6/6 PASS |
| P2 | astro-island 数量无上限:399 页逐页实测分布 = 首页 2、分类页 20 页均 2、条目页 372 页均 4(`check-perf.mjs:11-13`) | 上限取实测值本身从严锁定,新增岛屿须同步上调并留注释(`check-perf.mjs:69-71`) | 门禁②,6/6 PASS |
| P3 | **照片 img 全部无 lazy**:修复前静态 HTML 可见的 2 张(首页 hero glassmorphism 背景照)均无 `loading="lazy"`;源码级 11 个 demo 文件均为裸 `<img src alt>`(实测 `git diff`:`backdrop-filter/demo/Demo.tsx:106` `-<img src…alt="" />` → `+…width={1600} height={1067} loading="lazy" decoding="async"`) | 11 个 materials/styles demo 的照片 img 统一补内在宽高 + lazy + async 解码 | 门禁③,本轮静态 HTML 2/2 lazy;源码级 11 文件全部带 lazy(grep 实测) |
| P4 | **LCP 字体无预载**:全站唯一渲染阻塞 CSS 内含全部 @font-face,Inter latin 子集(48,256B)要等 CSS 下载+解析完才开始请求(`integration-font-preload.mjs:1-8` 注释) | 新增 `scripts/integration-font-preload.mjs`(astro:build:done 注入,带 crossorigin、幂等),`astro.config.mjs` 接线 `fontPreload()`;只预载 latin 不预载 latin-ext(397 页不会命中 unicode-range,+85KB 净收益为负,脚本头如实记录与审计清单措辞的差异) | 门禁④b,本轮构建实测注入 **399/399**(148B/页) |

字体 CSS 在 head 为基线健康项(全部 @font-face 在打包 CSS `/_astro/index.*.css`,`check-perf.mjs:17-20`),锁定为门禁④。

### a11y 审计(399 页静态深审计,三轮迭代:after-fixes.json → after-fixes2.json → after-fixes-final.json)

| # | 发现(证据) | 修复 | 回归锁定 |
|---|---|---|---|
| A1 | **滑杆 aria-label 为原始标识符 335 处**(after-fixes.json `rangeRawIdent=335`,命中 `/^[a-z_][\w.-]*$/i`,读屏只播报变量名) | `ParamPanel.tsx:77-81` 组件层统一人类可读双语映射(注释标记 a11y-range-label-006;`aria-label={param.name}` → `{label}`) | 三轮复测 335→12→0 清零(final JSON `rangeRawIdent:0`) |
| A2 | **首页 h1→h3 标题跳级 2 页**(after-fixes.json `skipPages=2`,skipList = index.html / en/index.html;audit.mjs:145-151 的 skips = 标题级别跳跃,非 skip-link) | ParamPanel 组标题不再占 h3 改为非标题元素(`ParamPanel.tsx:354` 注释:「面板 section 已有 aria-label,组内标题再占 h3 会造成 h1→h3 跳级」) | 复测 `skipPages=0`(final JSON) |
| A3 | 基线已干净项:img 2/2 有 alt、978 图标钮全部具名、每页恰一 h1、lang 全在位(zh-CN/en)、控件 1326/632 range/1324 param-panel 输入全具名、landmark header/nav/main/footer 齐 | 无需修 | 门禁⑤-⑧锁定其中 4 项静态断言 |

**回归锁定口径(如实)**:常驻门禁 `check-a11y-static.mjs` 只锁 4 项(⑤ img alt / ⑥ 图标钮名 / ⑦ h1 恰一 / ⑧ lang);A1/A2 的深审计断言(raw-ident、标题跳级)在 `tmp-a11y-audit/audit.mjs`,**未纳入**常驻门禁,依赖本轮 final JSON 留档。

## 二、性能基线一行总览与优化后对比

**一行总览**:六关键页基线 36,655–63,606B(预算 ×1.1 = 40,321–69,967B),本轮重测**逐字节与基线一致零漂移**;全站 399 页分布(实跑 `node tmp-perf-audit/audit-html.mjs dist`):首页 35.8KB、条目页 198 页 p50 61.3KB / max 80.8KB、分类页 13 页 p50 34.8KB、其余 186 页 p50 62.2KB。
**优化后对比**:①照片 lazy 修复前静态可见 2/2 缺失 → 修复后 2/2 全 lazy(源码级 11 文件全覆盖);②字体预载修复前 0 页 → 修复后 399/399 注入(148B/页,latin 48,256B 与 CSS 并行高优先级拉取);③构建 399 页 29.58s exit 0(font-preload 日志在案)。HTML 字节本身未膨胀(门禁①在预算内即证明)。

## 三、九项门禁实测清单(本会话实跑)

前置:`pnpm run build` → **399 页 29.58s Complete,exit 0**,日志「font-preload: injected 148B preload (/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2) into 399/399 HTML」。

| # | 门禁 | 命令 | 结果 |
|---|---|---|---|
| ① | HTML 字节预算(6 页 ×1.1) | `node scripts/check-perf.mjs` | 6/6 PASS(36,655≤40,321 … 63,425≤69,768) |
| ② | astro-island 数上限 | 同上 | 6/6 PASS(2≤2 / 2≤2 / 4≤4) |
| ③ | 照片 img loading=lazy | 同上 | PASS(2/2 lazy;无照片页按全满足并如实打印) |
| ④ | 关键字体 CSS 在 head(含 @font-face) | 同上 | 6/6 PASS(`/_astro/index.B3ALkVbS.css`) |
| ④b | LCP 字体 preload 在 head + woff2 磁盘实存 | 同上 | 6/6 PASS |
| ⑤ | img alt 覆盖 100% | `node scripts/check-a11y-static.mjs` | 2/2 PASS(399 页) |
| ⑥ | 图标钮可访问名 | 同上 | 978/978 PASS |
| ⑦ | 每页恰一 h1 | 同上 | 399/399 PASS |
| ⑧ | html lang 在位非空 | 同上 | 399/399 PASS |

总结行实测:「check-perf: 6 关键页 / **30 项断言 / 0 项失败** … PASS exit 0」;「check-a11y-static: 审计 399 页 … **PASS(0 违规)exit 0**」。**九项门禁全绿。**

## 四、MCP 文档与趋势脚手架说明

- **`docs/mcp-setup.md`(116 行,未跟踪新文件)**:`mcp/server.mjs` 接入指南——零依赖 stdio JSON-RPC(协议按 MCP spec 2025-03-26:initialize 版本协商、tools/list、tools/call、batch),只读条目 `schema.json`,不联网、不写文件、不读凭据;Node ≥18.17、免 `pnpm install`;Claude Desktop(配置路径 + 「完全退出再启动」)与 Cursor(全局/项目级 `mcp.json`)双客户端逐步配置;四工具一览、三分钟验证(`pnpm run test:mcp`)、FAQ(args 必须绝对路径、Windows 反斜杠转义/正斜杠皆可、安全边界与错误分层:工具层 `isError` 属业务回执,协议层 -32601/-32602/-32700 才是请求形状错)。
- **`scripts/refresh-trends.mjs`(194 行,未跟踪新文件)**:趋势数据季度刷新**脚手架**——零依赖、只读、不联网,只打印操作手册与过期提醒;读 `src/data/trends.ts` 的 `TRENDS_LAST_REVIEWED` 与上游 03 号调研章节/来源,输出「要重抓的 9 个来源 + trends.ts 字段更新清单 + 三类口径标注模板(份额类强制标注单一工具请求份额)」;`lastReviewed` 距今 >90 天 exit 1。**本会话实跑 exit 0**:「lastReviewed 2026-11-20 距今 3 天 ≤ 90 天——新鲜度门禁通过」;配套 `trends.ts` 已加 `TRENDS_LAST_REVIEWED = "2026-11-20"` 常量与逐字段结构注释(实测 diff)。

## 五、无法机器验证项(如实列出)

1. **运行时 Lighthouse 未跑**:九项门禁全部是产物静态断言,本会话未起浏览器跑 Lighthouse——LCP/CLS/TBT 等真实指标无实测值,字体 preload 的净收益只有机制论证(脚本注释),未量化对比。
2. **读屏行为未实测**:aria-label 双语化后 NVDA/VoiceOver 的实际播报、skip-link(`Base.astro:108`,dist 实存「跳到主内容」)的键盘可见焦点与跳转、RM 降级观感,均只读码,未跑读屏器。
3. **照片 lazy 运行时生效**未在真实浏览器验证(视口外延迟请求);CDN/弱网下字体与 CSS 并行拉取时序未测。
4. A1/A2 两项深审计断言(raw-ident、标题跳级)未入常驻门禁,回归依赖本轮 final JSON 留档而非脚本锁定。

## 六、后续建议(≤3)

1. **提交 34 项工作区改动**:两个门禁脚本、`docs/mcp-setup.md`、`refresh-trends.mjs`、fontPreload 接线、照片 lazy 修复、trends.ts 复核日期均在 HEAD `6fac8e3` 之后未入库,当前无回滚锚点;建议按「审计修复+门禁」与「文档+脚手架」拆两笔。
2. **真浏览器补一次 Lighthouse**(`astro preview` + Lighthouse CLI,首页与条目页各一),把 LCP/CLS 实测值补进 `check-perf.mjs` 基线注释,验证 preload 净收益为正。
3. **清 round11 遗留 + 读屏走查**:上线前仍只改 `astro.config.mjs:7` 占位域名一处;对 978 图标钮与双语 aria-label 抽 10 页做 NVDA/VoiceOver 播报走查。
