# MCP server 接入指南(Claude Desktop / Cursor)

`mcp/server.mjs` 是 uiux-atlas 图集的 MCP server:**零依赖 stdio JSON-RPC**(协议依据 MCP spec 2025-03-26:initialize 握手含版本协商、tools/list / tools/call、JSON-RPC batch),只读各条目的 `src/content/entries/<分类>/<slug>/schema.json`——不联网、不写文件、不读任何凭据。从克隆仓库到四个工具可用,约五分钟。

条目 id 形如 `"styles/glassmorphism"`(分类/slug);全集 186 条 × 十分类,以 `list_categories` 实时计数为准。

## 前置

- **Node ≥ 18.17**(server 只用 node 内建模块,`node -v` 确认即可);
- 本仓库的一份本地克隆。下文以 `<repo>` 指代 `uiux-atlas/` 仓库根的**绝对路径**,例如:
  - macOS / Linux:`/Users/you/code/uiux-atlas`
  - Windows:`F:\ZCodeData\UIUX\uiux-atlas`(JSON 内写成正斜杠 `F:/ZCodeData/UIUX/uiux-atlas` 或转义反斜杠 `F:\\ZCodeData\\UIUX\\uiux-atlas`,Node 在 Windows 两者都认)。

无需 `pnpm install`:server 不 import 任何第三方包。

## 一、Claude Desktop

配置文件位置(也可在 Claude Desktop `Settings → Developer → Edit Config` 打开):

- macOS:`~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows:`%APPDATA%\Claude\claude_desktop_config.json`(即 `C:\Users\<你>\AppData\Roaming\Claude\`)

在 `mcpServers` 中加入(已有其他 server 时并列为一个新键):

```json
{
  "mcpServers": {
    "uiux-atlas": {
      "command": "node",
      "args": ["F:\\ZCodeData\\UIUX\\uiux-atlas\\mcp\\server.mjs"]
    }
  }
}
```

把 `args` 换成你机器上 `<repo>/mcp/server.mjs` 的绝对路径(macOS/Linux 形如 `"/Users/you/code/uiux-atlas/mcp/server.mjs"`)。不需要 `env`、不需要端口。

保存后**完全退出** Claude Desktop(托盘/任务栏右键退出,不是关窗口)再启动,工具才会注册。

## 二、Cursor

配置文件位置:

- 全局:`~/.cursor/mcp.json`(Windows:`%USERPROFILE%\.cursor\mcp.json`);
- 项目级:`<项目根>/.cursor/mcp.json`(可随仓库提交,团队共享同一份接入配置)。

UI 入口:`Settings → MCP & Tools → Add new global MCP server`(会自动创建/打开全局 `mcp.json`)。stdio server 的配置形状与 Claude Desktop 一致:

```json
{
  "mcpServers": {
    "uiux-atlas": {
      "command": "node",
      "args": ["F:/ZCodeData/UIUX/uiux-atlas/mcp/server.mjs"]
    }
  }
}
```

保存后在 MCP 面板把 `uiux-atlas` 置为 enabled;改动配置后点面板的 Refresh(或重启 Cursor 窗口)生效。

## 三、四工具一览

| 工具 | 入参 | 返回 | 典型问法 |
|---|---|---|---|
| `list_categories` | 无 | 十分类(id / 中文名 / 英文名 / 条目计数)+ 总数 | 「uiux-atlas 里有哪些分类?各多少条?」 |
| `search_entries` | `query?` / `category?` / `system?` / `star?`(1–3,参数化星级) | 精简清单(id / name / nameZh / tagline / star / system / url)+ `count`;`query` 大小写不敏感子串匹配,覆盖 id、英文名、中文名、aliases、双语 tagline | 「找 3 星参数化的玻璃系条目」「在 materials 分类里搜模糊」 |
| `get_entry` | `id`(必填;全 id `"styles/glassmorphism"` 或唯一 slug 短名 `"glassmorphism"`) | schema.json 全文 + zh/en 双语参数表(名称 / 类型 / 默认值已按 CSS 序列化 / effect)+ sources 来源清单 | 「glassmorphism 的完整参数契约和来源」 |
| `build_prompt` | `id`(必填)、`params?`(部分覆盖,仅已知参数名,逐型校验)、`locale?`(`zh`/`en`,默认 `zh`) | 一比一复刻 prompt(目标 / 参数快照 / 验收要点 / 参数 → CSS 变量映射 / 兼容性回退 / 出处)——组装结构与站内「复制复刻 Prompt」按钮同源 | 「给 glassmorphism 出一份 blur=30 的中文复刻 prompt」 |

`category` 只收十分类枚举 id:`styles`(风格流派)/ `materials`(材质与光影)/ `motion`(动效与微交互)/ `color`(色彩与主题)/ `type`(排版)/ `layout`(布局与响应式)/ `components`(前端部件)/ `icons`(图标体系)/ `dataviz`(数据可视化)/ `principles`(交互法则);`system` 只收六来源体系 id:`apple`(Apple HIG)/ `m3`(Material 3)/ `fluent`(Fluent)/ `web-std`(Web 标准)/ `component-lib`(组件库)/ `community`(社区流派)。拿不准就先 `list_categories`,再 `search_entries` 发现 id。

## 四、三分钟验证

**第 1 分钟 —— 先验 server 本身(不依赖任何客户端):**

```bash
# 在 uiux-atlas/ 内执行;上游目录则用 pnpm -C uiux-atlas run test:mcp
pnpm run test:mcp        # 等价:node scripts/test-mcp-server.mjs
```

预期输出 `test-mcp-server: PASS (4/4 assertions)`——四断言:initialize 响应含 capabilities 且协商版本 `2025-03-26`、tools/list 含四工具、`get_entry(glassmorphism)` 含「毛玻璃」、`build_prompt(blur=30)` 含 `blur 30px`。任何失败都会打印明细并 `exit 1`。

**第 2 分钟 —— 客户端注册确认:** 按上文配置并完全重启客户端;Claude Desktop 在输入框工具区、Cursor 在 MCP 面板应能看到 `uiux-atlas` 与四个工具。

**第 3 分钟 —— 实弹一问:** 问客户端「用 uiux-atlas 列出全部分类」——预期返回十分类清单与计数(全集 186 条);再问「用 uiux-atlas 搜索 glassmorphism 并给出复刻 prompt 的验收要点」,能返回条目卡与 `build_prompt` 产物即接线成功。

## 五、常见问题(FAQ)

**Q1:要不要先 `pnpm install`?**
不需要。server 零依赖、只用 node 内建模块,接入本身不依赖仓库的任何包;装了依赖也不影响。

**Q2:stdio 是什么?要不要手动「运行服务」或开端口?**
stdio 传输 = 客户端把 server 作为**子进程**拉起,通过标准输入/输出按行收发 JSON-RPC 消息:没有 HTTP 端口、没有 URL、也没有「先手动启动 server」这一步(配置里写了绝对路径,客户端自己负责 spawn)。若你的客户端只支持 HTTP/SSE 远程 MCP,需要自行加桥接层,本仓库不含。手动调试可喂一行 initialize 看回包:

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"manual","version":"0.0.0"}}}' | node mcp/server.mjs
```

预期 stdout 恰好一行 initialize 响应(server 日志一律走 stderr,stdout 只允许合法 MCP 消息——自行改代码时勿往 stdout 打印别的东西)。

**Q3:路径相关报错(`spawn ENOENT` / server 连不上)?**
- `args` 必须写**绝对路径**——相对路径的解析起点随客户端工作目录而变,这是最常见翻车点;
- Windows 下 JSON 反斜杠必须转义(`F:\\...`),或直接写正斜杠(`F:/...`);
- 路径含空格无需额外加引号/转义——JSON 数组的每个元素本身就是完整的一个参数;
- 改完配置必须**完全退出**客户端再启动(子进程才会以新配置拉起;Claude Desktop 要从托盘退出,Cursor 重载窗口);
- 确认 `node` 对客户端可见:部分 GUI 客户端继承的 PATH 不含 nvm/volta 安装的 node,此时把 `command` 也写成绝对路径(如 `"/usr/local/bin/node"` 或 `"C:\\Program Files\\nodejs\\node.exe"`,`args` 不变);
- 仍失败看客户端日志:Claude Desktop `Settings → Developer`(含 MCP logs 文件);Cursor `View → Output → MCP`。

**Q4:权限与安全?**
- server 只读仓库内 `src/content/entries/<分类>/<slug>/schema.json`:无网络访问、无文件写入、不读任何凭据;把它指向你信任的本地克隆即可,无需额外授权开关;
- Claude Desktop 对本地 stdio MCP 首次调用会弹一次允许确认,之后按会话记住;Cursor 需在 MCP 面板手动 enabled;
- 工具层错误(条目不存在、过滤值非法、未知参数名)以 `isError: true` 的工具结果返回,属正常业务回执;协议层错误(-32601/-32602/-32700)才说明请求形状不对。

**Q5:报 `unknown category/system` 或「entry not found」?**
`category` / `system` 只收上文枚举 id(传中文或别名会报错,合法 id 列表在错误信息里);`get_entry` 支持唯一 slug 短名,slug 撞名时必须给全 id(`分类/slug`)——先用 `search_entries` 拿精确 id。
