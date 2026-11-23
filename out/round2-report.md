# Round 2 交付报告(四项改动)

- 日期:2026-11-21
- 核验材料:`docs/design-spec.md`(当前文件版本 **v2.2**,含 v2.1 同日两轮修订:先双主题、后控件重绘);`git -C uiux-atlas status` + `git diff --stat`(60 个已跟踪文件改动,**+1525 / −129**;未跟踪新增:`docs/`(即 design-spec.md 本体)、`scripts/add-name-zh.mjs`、`src/components/HeroGlassDemo.tsx`、`src/components/MetaAccordion.astro`、`src/data/`、`src/lib/displayName.ts`、`src/pages/resources.astro`、`src/pages/en/resources.astro`、`src/out/`)。
- 门禁为**本次会话实跑复核**(命令与输出见第二节),与 ask 上报口径一致。

---

## 一、四项改动逐项落点

### ① 43 条 schema 增 nameZh + 双语展示改造

| 落点 | 内容 |
|---|---|
| `scripts/add-name-zh.mjs`(新增) | 内置 43 条 `cat/slug → 中文名` 映射(`add-name-zh.mjs:13-57`);幂等可重跑(先剥已有 `nameZh` 行再插入,`:101-103`);防漏防多——映射键与磁盘条目双向核对,任一不匹配即 `exit 1`(`:71-83`);外科手术式插入 `"name"` 行之后,不重排其余字节(`:85-103`) |
| `src/content/entries/**/schema.json` ×53 个文件 | 每文件恰好 +1 行 `nameZh`(diff --stat:43 个分类文件各 +1;styles 有 7 条、materials 12、motion 10、color 9、type 3、layout 1,合计 43 条目) |
| `src/lib/displayName.ts`(新增) | `displayName()`:zh 优先 `nameZh`、缺省回退 `name`,en 恒用 `name`(`displayName.ts:7-10`);`secondaryName()`:zh 站中英不同名时返回英文名供 h1 小字并列(`:16-19`) |
| 类型与校验层 | `src/lib/types.ts:110-113,132-135`(EntrySchema/EntryMeta 增 `nameZh?: string`);`src/lib/schema.ts:49`(zod `nameZh: z.string().min(1).optional()`);`src/lib/metas.ts:13`(透传) |
| 消费方 | `src/components/EntryCard.astro:32`(`entry-name` 用 displayName);`src/components/EntryDetail.astro:28-29,63-81`(h1/面包屑/`<title>` 用 `entryName`,`entry-title-en` 英文副名并列);`src/components/CategoryView.astro`(+47 行,列表页同样走 displayName) |
| 门禁侧 | `scripts/verify-entries.mjs:115-117`(新增 nameZh 缺失/空即报 problem);`scripts/verify-dist.mjs:64-72`(zh 条目页标记改用 `nameZh ?? name`,en 页恒用 `name`) |

### ② 明暗双主题(规范修订 v2.1)

| 落点 | 内容 |
|---|---|
| `src/styles/global.css:157-246` | `:root[data-theme="light"]` 浅色全套 token:背景 4 级(`--bg #f3f5f8`…`--surface-2 #eef1f5`)、边框 2 级、文本 4 级(`--text #1d242f` 14.29:1…`--text-ghost` 3.17:1 禁用豁免)、fill 3 级、`--accent #1a69d2`(4.81:1)+ ok/warn/danger、六分类 accent 加深值(min 4.56–4.98:1)、阴影减弱(8/12/16%)、`--stage-glint` 白 65%、`--seg-thumb`、`color-scheme: light`(`global.css:160`) |
| `src/layouts/Base.astro:34-50` | head 防闪烁 BeforePaint 脚本(`is:inline` 同步):读 `localStorage("atlas-theme")` → 无记录跟 `prefers-color-scheme` → 首帧前设 `dataset.theme`;全程 try/catch(降级深色) |
| `Base.astro:55-57` | `theme-color` 双 meta(`media` dark `#0b0e13` / light `#f3f5f8`) |
| `Base.astro:87-130` | header 主题切换钮:双内联 SVG(太阳/月亮,`:root[data-theme="light"]` 作用域换显零 JS),`aria-pressed`=是否浅色,双语 `aria-label`(`Base.astro:91-94`) |
| `Base.astro:157-191` | 主脚本交互层:click 切 `dataset.theme` + `localStorage` 写入(try/catch,存储不可用仅会话内生效)+ `syncThemeUi()` 同步 `aria-pressed` 与两条 theme-color `content` |
| `src/styles/global.css:556-598` | `.theme-toggle` 样式:36px 胶囊、`::after inset:-6px` 扩热区至 44px、hover/active 态、图标换显 |
| 规范 | `docs/design-spec.md` v2.1 摘要(`design-spec.md:14-18`):§1 原则 1 改「双主题舞台」(`:46`)、§2.1 浅色 token 全表(`:98-133`)、§7 主题切换钮规范(位置/交互/持久化/防闪烁/theme-color 双值,`:491-500`) |

### ③ 控件现代化(滑杆重绘等,规范修订 v2.2)

| 落点 | 内容 |
|---|---|
| `src/styles/global.css:2118-2223` | `input[type="range"]` 全自绘体系:元素高 **44px** + `margin:-6px 0`(命中区=真实 44px 元素盒、布局占位 32px,`global.css:2131-2137`);**8px** `--radius-pill` 轨道 + `linear-gradient(90deg, var(--accent) var(--fill-percent), var(--fill-2) …)` 双色断点(`:2139-2148`);**18px** 拇指 = 5px accent 环 + 8px 白芯 `#fff`(两主题恒定,`:2149-2162`);hover `scale(1.1)` + `--accent-dim` 光晕 + 环提亮(`:2163-2168`)、active `scale(0.95)`(`:2169-2173`)、focus-visible 拇指双层焦点环 `0 0 0 2px var(--bg), 0 0 0 4px var(--accent)`(`:2174-2180`);webkit 与 `-moz` 双实现对称(`:2181-2221`) |
| `--fill-percent` 注入 | `src/components/ParamPanel.tsx:31`(`fillPercent()`)三处内联:普通滑杆 `:247`、oklch 四轴 `:386`、shadow 层编辑器 `:640`;`src/components/HeroGlassDemo.tsx:37,54`(hero 滑杆);未注入回退 `0%`(CSS 默认值) |
| 数值输入框 | `global.css:2084-2110` `.param-num`:32px 高、`--radius-s`、mono 右对齐、`::-webkit-*-spin-button` 移除去原生箭头 |
| 拖拽联动 | `global.css:2060` `.param-row:has(input[type="range"]:active) .param-value` → 拖拽中值标签 `--fill-3` 底 |
| Accordion | `src/components/MetaAccordion.astro`(新增,167 行):原生 `<details>/<summary>` 基座 + chevron + mono 摘要计数;`global.css:1797` 起 `.meta-acc`(40px 对齐缩进、44px summary 行高等) |
| 滚动条/焦点环 | `global.css:258-283` 全站细滚动条(`scrollbar-width: thin` + `scrollbar-color` 挂根继承、webkit 伪元素;横滑容器仍 `none`);`global.css:286` 全局 `:focus-visible` |
| 其余控件 | 按压态 `scale(0.97/0.98)`(`global.css:1422,1764,2248`);sticky 过滤栏激活阴影改 `--shadow-2`(`:1328-1330`);RM 下 `transform: none` 直达终态(`:334,347,361,1060,1063`) |
| 规范 | v2.2 摘要(`design-spec.md:8-12`);§3 新增「滑杆(Slider)解剖」小节(`design-spec.md:315-323`,如实标注 02/03 研究无 Slider 专节,数值由通用规格推导) |

### ④ 资源导航(/resources/ 与 /en/resources/)

| 落点 | 内容 |
|---|---|
| `src/data/resources.ts`(新增) | 五组 `RESOURCE_GROUPS = ["spec","lib","tool","gallery","docs"]`(`resources.ts:24`);`RESOURCES` 30 条(`grep -c 'group: "'` = 30),全部真实 URL、数据来源逐条注于文件头(`:1-10`);`goDeeperLinks(system, category, sources)` 静态映射 ≤3 条(`:444-454`) |
| 页面 | `src/pages/resources.astro` / `src/pages/en/resources.astro`(各 69 行):`list-head` 页头 + mono 计数 + 五组 `res-group` + `.entry-card res-card` 网格,外链 `target="_blank" rel="noopener noreferrer"` |
| i18n | `src/i18n/ui.ts:8,52-72`(zh:标题「深入学习的资源地图」+五组名+goDeeper/more/homeEntry)与 `:74,118-133`(en 对应);nav 增 `resources` |
| 导航入口 | `src/lib/urls.ts:17-18` `resourcesUrl()`;`Base.astro:75-79` 六分类后增「资源」链接(`activeNav="resources"` 当前态);首页「授人以渔」入口行(HomeView,i18n `homeEntry`,verify-dist 稳定文案标记) |
| 条目页「继续深入」卡 | `EntryDetail.astro:134-155` `.go-deeper` aside:`goDeeperLinks()` 按体系+分类出 2–3 条,web-std 额外呈现 `schema.sources` 官方 URL;卡本身不可点击故无 hover 态(遵守 §3);尾部「全部资源 →」链去资源页 |
| 门禁扩展 | `scripts/verify-dist.mjs:42-59`:资源页 ×2(标题+五组名稳定文案)、首页增「授人以渔」/「Go beyond」、条目页 ×86 增「继续深入」/「Go deeper」标记 |
| 规范缺口(如实) | `docs/design-spec.md` **未收录资源页蓝图**(grep「资源/resources」零命中)——§4 三张页面蓝图之外新增了第四种页面,规范(自称 SSOT)尚未回填 |

---

## 二、门禁结果(本次会话实跑复核,2026-11-21)

| 命令 | 关键输出 | 退出码 |
|---|---|---|
| `npm run check`(astro check) | `Result (81 files): 0 errors / 0 warnings / 1 hint` | 0 |
| `npm run build`(astro build) | `102 page(s) built in 13.91s · Complete!` | 0 |
| `node scripts/verify-entries.mjs` | `ok: entry inventory matches expected 43 entries` + `{"expected":43,"found":43,"problems":0}` → `verify-entries: PASS` | 0 |
| `node scripts/verify-dist.mjs` | `{"checked":102,"missing":0,"contentFails":0}` → `verify-dist: PASS` | 0 |

102 页构成自洽:2 首页 + 12 分类页 + 86 条目页(43×中英)+ 2 资源页 = 102。四项均为本次实跑,与 ask 上报一致。

---

## 三、无法机器验证项清单(如实列出)

以下项目**本轮未验证、且现有门禁原理上无法覆盖**,不作为已通过项:

1. **主题切换运行时行为**:`dataset.theme` 写入、`localStorage("atlas-theme")` 跨会话持久化、点击切换的端到端效果——静态检查与 astro check 不覆盖;规范附录 4(`design-spec.md:535`)已如实标注「仅通过 astro check 的类型与语法校验,未做浏览器实机验证」,本轮亦未做。
2. **防闪烁主观感受**:刷新/冷启动时是否出现白闪或黑闪(FOUC),尤其实测组合「系统浅色偏好 + localStorage=dark」——head 脚本静态可查,实际首帧效果需浏览器人眼/录屏确认,未做。
3. **浅色主题实机渲染**:浅色 token 对比度数值系规范记录的 `check_tokens_light.py` 实算(2026-11-21,`design-spec.md:535`),**本轮未复跑该脚本**;且数值验证≠渲染验证——浅色下阴影减弱(8/12/16%)、`--stage-glint` 白 65%、demo 舞台内容不随主题变的整体协调度为主观观感项,未验证。
4. **theme-color 双 meta 的浏览器 UI 跟随**:移动端地址栏染色是否随显式切换更新,桌面环境无法验证。
5. **滑杆交互手感**:hover 放大/光晕/active 收缩的连续动效观感、44px 热区真机触控命中率、`:has()` 拖拽中值标签 `--fill-3` 联动的运行时表现、`--fill-percent` 注入后的视觉断点是否与拇指位置精确对齐——均需浏览器交互验证,未做。
6. **RM 降级实机走查**:滑杆拇指/按钮 `transform: none` 直达终态、色彩反馈保留——媒体查询模拟可做但本轮未做(spec 附录 5 标注未跑)。
7. **规范留白的命令级验收**:360px `scrollWidth ≤ innerWidth` 无横向滚动实测、Lighthouse/axe 扫描——spec 附录 5(`design-spec.md:536`)标注「未跑」,本轮亦未跑。

---

## 四、后续建议(≤3 条)

1. **补浏览器实机验收闭环**:用 Playwright(或手动)在 360×800 / 1280×800 双档走查:主题切换 FOUC 录屏与持久化断言、theme-color 跟随、滑杆交互与 RM 降级,并落两条可机检断言(360px scrollWidth、axe 扫描)进 verify 脚本,填平规范附录 5 的留白。
2. **把一次性脚本转正为持续门禁**:`add-name-zh.mjs`、`check_tokens_light.py` 与 verify-* 一起挂进 package.json scripts(如 `verify:all`),使 nameZh 覆盖与浅色 AA 成为回归项;另规范未收录资源页蓝图,建议回填 §4(自称 SSOT 应覆盖全部页面)。
3. **提交与目录收口**:60 文件改动 + 9 处未跟踪路径尚未提交,建议按四项改动拆 4 个 commit;`src/out/redesign-report.md` 疑似误放产物(`src/` 内不应有 out 目录),移至工作区 `out/` 或删除;另外报告口径统一版本号(spec 文件已是 v2.2,本轮 ask 称 v2.1)。
