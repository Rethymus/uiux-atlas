# uiux-atlas · UI/UX 设计全解图集

现代前端 UI/UX 设计全解图集:每个设计条目配**可交互实例、代码拆解、参数实时调节面板**,并一键把参数快照浓缩成供 AI agent 一比一复刻的结构化 prompt。

- **双语三层路由**:中文站无前缀(`/`),英文站在 `/en/` 下;结构为 首页 → 六大分类列表 → 条目详情。
- **参数实时调节**:右栏面板由条目 `schema.json` 的参数契约自动生成(滑杆 / OKLCH 四轴 / 贝塞尔曲线编辑器 / 分段按钮 / 阴影逐层),所有改动经 `ParamStore` 即时生效。
- **一键复刻 Prompt**:`store.exportSnapshot()` + `buildPrompt` 产出结构化 prompt,复制给任意 AI agent 即可一比一复刻当前调节结果。

## 常用命令

```bash
pnpm -C uiux-atlas dev       # 本地开发服务器
pnpm -C uiux-atlas build     # 全站静态构建到 dist/
pnpm -C uiux-atlas check     # astro check 类型检查
pnpm -C uiux-atlas preview   # 本地预览构建产物
```

## 目录结构

```
uiux-atlas/
├── astro.config.mjs              # Astro + React + MDX;i18n:zh 默认无前缀,en 在 /en/
├── package.json
├── tsconfig.json                 # astro/tsconfigs/strict + react-jsx + @/* 别名
├── scripts/                      # 流水线自检脚本(verify-entries / verify-dist / verify-prompt-test)
├── public/                       # 静态资源(如需)
└── src/
    ├── content.config.ts         # entries / entryBody 内容集合定义(zod 校验)
    ├── content/
    │   └── entries/{category}/{slug}/
    │       ├── schema.json       # 条目元数据 + 参数契约(名称/分类/星级/params/来源等)
    │       ├── zh.mdx / en.mdx   # 双语正文(渲染进条目页 .prose)
    │       └── demo/Demo.tsx     # 可交互演示(条目页 client:load 岛屿)
    ├── components/               # React 岛屿 + Astro 视图
    │   ├── DemoStage.tsx         # 演示舞台(CSS 变量注入点,store.setRoot)
    │   ├── ParamPanel.tsx        # 参数面板(schema.params 自动生成控件)
    │   ├── PromptExport.tsx      # 复刻 Prompt 导出(复制 / 查看全文)
    │   ├── WorkbenchPanel.tsx    # 右栏组合(ParamPanel + PromptExport,client:visible)
    │   ├── FilterBar.tsx         # 分类列表页过滤(来源体系 × 星级,客户端过滤)
    │   ├── EntryCard.astro       # 条目卡(name/tagline/system chip/star chip)
    │   ├── HomeView.astro        # 首页视图(hero + 分类卡 + 精选)
    │   ├── CategoryView.astro    # 分类列表视图(FilterBar + 卡片网格)
    │   └── EntryDetail.astro     # 条目详情视图(面包屑/头/工作台/正文/信息卡)
    ├── i18n/ui.ts                # 双语 UI 文案字典
    ├── layouts/Base.astro        # 站点骨架(顶栏导航/语言切换/页脚)
    ├── lib/
    │   ├── types.ts              # 全部类型(CATEGORIES/SYSTEMS/Param/EntrySchema/EntryMeta)
    │   ├── store.ts              # ParamStore(模块级注册表,面板与演示共享实例)
    │   ├── prompt.ts             # buildPrompt(参数快照 → 结构化复刻 prompt)
    │   ├── schema.ts             # content collections 用的 zod schema
    │   ├── urls.ts               # 双语 URL 助手
    │   └── metas.ts              # entries collection → EntryMeta 列表
    ├── pages/                    # 双语三层路由(zh 无前缀,en 在 /en/)
    │   ├── index.astro
    │   ├── [category]/index.astro
    │   ├── [category]/[slug]/index.astro
    │   └── en/…                  # 同构英文路由
    └── styles/global.css         # 深色工作台主题(全部类名定义于此)
```

## 许可说明

- **demo 代码**:MIT。
- **正文**(条目 `zh.mdx` / `en.mdx` 及站点文案):CC BY-NC 4.0(署名-非商业性使用)。
- **图片与素材**:仅收录自有绘制、或已确认授权允许此处使用的素材;任何第三方图片必须在对应条目的 `sources` 里注明出处与授权方式,授权未确认的素材不入库。
- 所有参数数值均注明一手来源(见各条目 `schema.json` 的 `sources`)。
