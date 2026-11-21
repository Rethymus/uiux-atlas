# Round 6 交付报告 — 蓝图 V2 四件(MCP server / shadcn registry / Open in v0 / 趋势追踪页)

日期:2026-11-21。报告基于本回合实际读取与运行的命令,来源逐处标注;未运行的检查如实标注。

## 一、V2 四件落点

**1. MCP server(`mcp/server.mjs`,未跟踪新文件)**
零依赖 stdio JSON-RPC,协议依据 MCP spec 2025-03-26(`mcp/server.mjs:5-29`:initialize 握手含版本协商、tools/list / tools/call、支持 JSON-RPC batch、stdout 只出合法消息、日志走 stderr)。只读各条目 `schema.json`(`mcp/server.mjs:24`)。四工具:`search_entries` / `get_entry` / `build_prompt` / `list_categories`(`README.md:62`);build_prompt 的参数序列化与站内「复制复刻 Prompt」同源。接入:`node mcp/server.mjs`。

**2. shadcn registry 24 件(`public/registry/`)**
实测 `ls public/registry/`:24 个 item JSON(alert/avatar/badge/breadcrumb/button/card/checkbox/date-picker/drawer/dropdown/empty/icon/input/modal/nav-menu/select/switch/table/tabs/tag/toast/tooltip/typography/waterfall 中的 watermark 在列,详见文件清单)+ `index.json`,共 25 个文件;`pnpm run build` 后随 `dist/registry/` 静态发布(本回合 build 后实测 25 个文件)。item `type=registry:component`,`files[].path` 保留源站路径 `src/content/entries/components/{slug}/demo/Demo.tsx` 作溯源,Demo.tsx 全文内联于 `files[].content`;拉取方式 `npx shadcn@latest add https://<host>/registry/button.json`(`README.md:140-149`)。

**3. Open in v0(`src/components/PromptExport.tsx:26-36`)**
条目页「在 v0 打开」按钮:把当前复刻 Prompt `encodeURIComponent` 进 `https://v0.dev/chat?q=…` 新窗口预填。**方案与来源**:老官方文档 `v0.dev/faq/v0-url-parameters` 已下线(客户端渲染空壳,渲染跳 Vercel 登录),现行 `v0.app/docs` 与 `vercel.com/docs/v0` 全量文档均无 URL 参数说明;方案按 **2026-11-21 curl 行为实测**核验——`v0.dev/chat?q=…` → 307 → `v0.app/chat?q=…` → 307 → `v0.app/?q=…`,终页 RSC payload 含 `"query":"hello world"` 与 `{"prompt":"hello world"}`,即 `q` 一路保留并被服务端预填。属**官方未背书、行为验证**方案,失效回退「复制 Prompt + 打开 v0 首页」。

**4. 趋势追踪页(`/trends/` 与 `/en/trends/`)**
数据文件 `src/data/trends.ts:1-14`:2023–2026「兴起/退潮」**时点快照**(调研日 2026-11-20,非实时),全部提炼自 `out/research/03-visual-style-trends.md` §二,逐条在 `source` 字段注明出处小节;**口径纪律**:份额类数据强制在 `note` 注明「单一 AI 设计工具请求份额,非市场采用率」(superdesign.dev 份额 = 该单一工具 20.8 万次真实生成中的请求份额,03 §四-3 口径提示)。`relatedEntries` 站内互链有构建期守卫,写死死链直接构建失败(`README.md:70`)。脚本化刷新待做(做法:重跑 03 号调研后替换 `trends.ts` 数值)。

## 二、校验实测(以下全部为本回合实际运行,命令与输出如实)

**test:mcp 断言明细**(`node scripts/test-mcp-server.mjs` → `PASS (4/4 assertions)`,exit 0,11 行 ok):
- 断言 1:initialize 响应含 capabilities(对象);1b:protocolVersion 回显 `2025-03-26`(实测协商输出同值);1c:serverInfo.name 非空字符串;
- 断言 2:tools/list 含四工具 search_entries / get_entry / build_prompt / list_categories(各一条断言,全 ok);
- 断言 3:`get_entry(glassmorphism)` isError 非 true,且文本含「毛玻璃」;
- 断言 4:`build_prompt(id="styles/glassmorphism", params={blur:30})` isError 非 true,且文本含 "blur 30px"。

**verify:registry**(`node scripts/verify-registry.mjs`):输出 `{"expected":24,"items":24,"problems":0}`,exit 0。门禁逻辑(`scripts/verify-registry.mjs:15-50`):条目目录部件数=24、每件 JSON 可解析、`name` 等于文件名、`type=registry:component`、`files[].path`/`content` 非空、无残留 `@/` import、index 与 item 数一致。

**五项既有门禁**:
1. `pnpm exec astro check`:132 files,**0 errors / 0 warnings / 1 hint**(`document.execCommand` 弃用提示,`src/components/PromptExport.tsx:76`,剪贴板降级方案兜底,已知可接受),exit 0。
2. `node scripts/check-theme-contrast.mjs`:**12/12 配对达标**(深色 text/bg 16.45:1 … accent/bg 8.71:1;浅色 14.29:1 … accent 4.81:1),exit 0。
3. `node scripts/verify-entries.mjs`:`{"expected":81,"found":81,"problems":0}`(components 24/24、icons 8/8、dataviz 6/6 缺失检查全过),exit 0。
4. `pnpm run build` + `node scripts/verify-dist.mjs`:build 产出 **186 页(17.95s)**;verify-dist `{"checked":186,"missing":0,"contentFails":0}`,exit 0。本轮 `verify-dist.mjs` 已扩展:新增趋势页 ×2 断言(「趋势/正在兴起/正在退潮/时点快照」+ 互链 href,en 对应)及首页/资源页趋势入口文案标记(git diff 实见)。build 实测落盘 `dist/trends/index.html`、`dist/en/trends/index.html`。
5. `node scripts/verify-prompt-test.mjs`:`{"passed":7,"total":7}`,7 项全 HIT(backdrop-filter、-webkit- 前缀、blur 20px、radius 20px、填充 alpha≈0.15、描边 1px+alpha≈0.3、彩色照片/渐变背景),exit 0。

## 三、已知局限(如实)

- **v0 URL 方案来源级别**:官方未背书——仅凭 2026-11-21 单日 curl 行为实测(307 跳转链 + RSC payload 证据);无官方文档承诺,`v0.dev` 改版即可能失效,需依赖内置回退(复制 Prompt + 打开 v0 首页)。
- **registry 24 件为教学演示件,非生产组件**:demo 原依赖的三个站内模块(`@/lib/store` 参数 store、`@/lib/types` 类型、`@/components/DemoStage` 演示舞台)在消费端不可用,生成器已将三处 `@/` import 原位改写为「[registry 改写]」注释;**文件体内对应引用需按注释替换后才能编译运行**(`README.md:147`)。
- **趋势页为时点快照**:2026-11-20 调研快照,无实时抓取(刻意不做);脚本化刷新待做。两条已评估趋势未收录并如实记录于 `trends.ts:11-14`(站内无可互链条目 / 单源转述证据链弱)。
- **V2 代码全部未提交**:`git status` 实测 8 个未跟踪路径(`mcp/`、`public/registry/` 两目录 + `scripts/generate-registry.mjs`、`scripts/test-mcp-server.mjs`、`scripts/verify-registry.mjs`、`src/data/trends.ts`、`src/pages/trends.astro`、`src/pages/en/trends.astro` 六个文件);另有 11 个已跟踪文件未提交修改(`git diff --stat HEAD`:11 files, +377/−37)。
- 既往局限按 `README.md:163-173` 口径继续成立:平台专有材质 Web 近似、来源 URL 可达性待外联恢复后复测、性能与实机验收(Lighthouse/axe/360px/reduced-motion)未测等,本回合未新增该类验证。

## 四、后续建议(≤3)

1. **提交 round6 变更**:11 个已跟踪修改 + 8 个未跟踪路径一次性入库,避免整批 V2 交付悬在工作区。
2. **v0 方案加失效监测**:将 curl 校验(307 链保 `q` + RSC 预填)做成周期脚本或在 CI 门禁中抽查,失效即提醒切回回退方案;待官方 URL 参数文档恢复后升级为文档背书并更新 `PromptExport.tsx` 头注证据链。
3. **趋势页脚本化刷新落地**:按 `README.md:76` 既定做法重跑 `out/research/03` 联网检索流程后替换 `src/data/trends.ts` 数值,并为「已评估未收录」两条趋势补齐站内条目后纳入 `relatedEntries` 互链。
