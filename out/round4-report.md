# Round 4 入库报告:「前端部件」域 24 条合并与全站门禁

- 日期:2026-11-21
- 本轮范围:① 读取 `out/mapping/b6-*.json` 六份(各作者已写),与既有 `out/mapping.json`(43 条)合并为 **67 条**写回;② 核对 NavMenu 条目三要素落地;③ 24 条 props 与 Ant Design 官方值对齐复核(引 `out/design-study/06-antdesign.md`);④ 六项门禁**本会话实跑**(命令与输出见第四节);⑤ 无法机器验证项如实列出。
- 入库动作与改动面:`scripts/merge-mapping-round4.mjs`(工作区根 scripts/,合并脚本,三重防丢防重校验)→ 写回 `out/mapping.json`;`uiux-atlas/scripts/verify-dist.mjs` 仅按其文件内既有注释的既定动作把 `EXPECTED.components` 从空数组填入 24 个 slug(`verify-dist.mjs:18-31`,与 `verify-entries.mjs:14-21` 同一清单)。**未触碰** `src/lib/store.ts`、`src/lib/prompt.ts`(本次 `git status` 实查两者均不在改动列表)、任何条目 MDX/demo、任何样式/文案文件;未引入新依赖(`package.json` 本次实读无变化);按钮文案「复制复刻 Prompt」(`src/i18n/ui.ts:33`、`src/components/PromptExport.tsx`)/「Copy replication prompt」(`src/i18n/ui.ts:100`)逐字保留(grep 实核 zh 文案 src 内共 4 处)。

---

## 一、「前端部件」域概览(六组 24 条)

第七分类 components 按 `schema.subgroup` 六子分组落地(`verify-entries.mjs:48` 六值枚举强制),与 `out/mapping/b6-*.json` 六文件一一对应,合并后批次分布:b6-basic 4 / b6-form 5 / b6-feedback 5 / b6-data 4 / b6-navigation 4 / b6-other 2。

| 组(batch / subgroup) | 条目(mapping id) | 一句定位 |
|---|---|---|
| b6-basic / basic | `components/button`、`components/icon`、`components/tag`、`components/typography` | 基元四件套:以 antd 6.7.1 seed/派生 token 为数值底座,逐条核对默认值(变体与强调层级、1em 行内图标、预设色阶标签、字阶公式),demo 全部 JS/CSS 变量双型驱动。 |
| b6-form / form | `components/input`、`components/select`、`components/switch`、`components/checkbox`、`components/date-picker` | 表单五件套:APG combobox/switch/checkbox 语义 + antd 表单控件默认值逐项对齐,checkbox 半选双通道与 date-picker 自绘简化实现均如实标注边界。 |
| b6-feedback / feedback | `components/toast`、`components/modal`、`components/drawer`、`components/alert`、`components/tooltip` | 反馈五件套:轻提示/模态/抽屉/告警/浮层提示的时机与打扰控制(NN/g、APG Alert 的 WCAG 2.2.3 风险),placement/duration/zIndex 对齐 antd 浮层体系。 |
| b6-data / data | `components/table`、`components/avatar`、`components/badge`、`components/card` | 数据展示四件套:Carbon 表格与空态原则 + antd 源码级数值复核(尺寸/重叠/封顶/阴影),badge 的 `max` 契约名与 antd `overflowCount` 对应关系如实注明。 |
| b6-navigation / navigation | `components/nav-menu`、`components/tabs`、`components/breadcrumb`、`components/dropdown` | 导航四件套:nav-menu 为旗舰条目(见第二节);tabs 自动/手动激活判据、breadcrumb 折叠层级(MUI maxItems)、dropdown 与 tooltip 的职责边界(APG menu-button)。 |
| b6-other / other | `components/empty`、`components/watermark` | 场景补位两件:Carbon 空态三分类解剖(插画/正向标题/下一步/CTA)与 antd 水印防篡改体系(rotate/gap/zIndex/MutationObserver)。 |

## 二、NavMenu 条目如何落实用户给的三要素

以 `components/nav-menu`(b6-navigation 组旗舰条目)为例,三要素均已落地并经本次实读核对:

1. **定义**:「将网站的信息架构分组归类并以导航的形式展示给用户,方便用户查找要获取的信息」——写入 `schema.json:10`(tagline zh,首句逐字;en 见 `schema.json:11`)与 `zh.mdx:3` 首段(并展开为 DOM 三层:导航容器 → 一级项 → 二级聚合弹层,「二级导航聚合在下拉菜单里」);`en.mdx:2` 同义英文段。
2. **场景**:「提供流量分发入口」「网站各功能聚合」——写入 `schema.json:70-71` 的 `scenarios.use` 前两项(流量分发入口:首页/频道/类目一级入口;各功能聚合:二级聚合在下拉、入口集中可发现),MDX 两种角色在 `zh.mdx:78`(飞书/钉钉工作台案例)复述。
3. **CSDN 案例**:「CSDN 顶部导航(一般含个人中心;二级导航聚合在下拉菜单;个人中心头像 hover 出现下拉菜单)」——写入「真实产品案例」小节 `zh.mdx:76` / `en.mdx:76`(三特征逐条对应),并补 GitHub 顶栏(`zh.mdx:77`)、飞书/钉钉工作台(`zh.mdx:78`)两个同构案例。demo 完整复现该结构:顶部导航条 + 产品/文档二级下拉 + 右侧头像 hover 用户菜单(`b6-navigation.json` nav-menu note,本次实读)。

## 三、24 条 props 与 Ant Design 官方值对齐情况

核对基准:`out/design-study/06-antdesign.md` §4「24 部件 ↔ antd 组件规格逐项核对」(§4.1–§4.24,全部核对自 antd 6.7.1 `index.zh-CN.md`,关键项源码 `.tsx` 复核)与 §5.1 v5→v6 变化、§5.2 未证实清单。六份 mapping note 所引节号与 06 实文逐一对上(如 button→§4.1、watermark→§4.24,无一悬空)。对齐情况分三档:

**① 与官方默认逐项一致(主体)**:table size large/bordered false(§4.15)、avatar circle/medium(§4.16)、badge overflowCount 99/showZero false/dot false(§4.17)、card medium/hoverable false/variant outlined(§4.18)、input variant outlined/type text/showCount false/count.max 超出标红不截断(§4.5)、select medium/allowClear false/listHeight 256/placement bottomLeft/popupMatchSelectWidth true(§4.6)、switch checked·loading·disabled false/size medium(§4.7)、checkbox checked·disabled·indeterminate false/Group 默认 [](§4.8)、date-picker allowClear true/32·40·24 三高度/placement bottomLeft/en-US locale(§4.9)、toast duration 3s/config.top 8(§4.10)、modal maskClosable true/keyboard true/zIndex 1000/colorBgMask 0.45(§4.11/§2.3)、drawer placement right/size default 378·large 736/push {distance:180}(§4.12)、alert type info/banner 下 warning/showIcon false/closable false(§4.13)、tooltip placement top/trigger hover/arrow true/mouseEnterDelay 0.1/autoAdjustOverflow true(§4.14)、tabs type line/tabPlacement top(§4.20)、breadcrumb separator「/」(§4.21)、dropdown trigger ['hover']/placement bottomLeft/arrow false(§4.22)、empty image 默认 121×116/SIMPLE 55×35/description 由 locale 提供(§4.23)、watermark rotate -22/gap [100,100]/120×64/font rgba(0,0,0,.15)·16·400·sans-serif/zIndex 9/inherit true/MutationObserver/5.18.0+ overflow:hidden(§4.24)、icon spin false/fill=currentColor/width·height=1em(§4.2)、tag closable false(§4.3)、typography Title level 默认 1 与 38/30/24/20 字阶、Text type 默认不设、ellipsis/copyable false(§4.4)、button loading/disabled 默认 false 与色值蓝十阶(§4.1/§1.2/§2.3⑤)、nav-menu theme light/trigger hover/关闭延时对齐 subMenuCloseDelay 0.1(§4.19)。数值多经本地 antd 6.7.1 源码二次复核(table/avatar/badge/card 等 note 注明具体行号),色阶档位经 `@ant-design/colors` 8.0.1 官方 presets 解包实测交叉印证(tag note)。

**② 条目规格取值(任务给定/demo 收敛)与官方默认并列标注**:modal width 默认 480(官方 520、`Modal.method()` 416,effect/mdx 两说)、nav-menu mode 默认 horizontal(antd 默认 vertical,schema effect 与 MDX 两说)、tabs animated 官方复合值 {inkBar:true, tabPane:false} 收敛为单开关取 inkBar true 一半(§4.20)、tag 按任务沿用 v5 `bordered` 语义并在 effect/MDX 标注 v6 `variant filled`(§5.1)、badge 任务契约名 `max` 对应 antd `overflowCount`(§5.2-3 明证 `maxCount` 未证实命名,note 如实注明)、breadcrumb maxItems(antd 无此属性,note 经 fox_fetch 实抓 MUI Breadcrumbs 核验,默认 3 为任务演示值)、date-picker firstDay mon/lang zh(任务配对,antd 随 locale 决定周起始)、toast maxCount 默认 3(antd 默认不限制,标注演示收敛)、drawer thickness 240–560(演示收敛)、empty footerAction(antd 为 children 插槽,标注编辑性选择)、watermark content 三档预设(编辑性选择)、button xl=48 高度(antd 无 XL 档,标注外推)、icon strokeWidth 2(Lucide/Feather 社区惯例,antd 为填充路径无 stroke-width,如实标注)、input maxLength 默认 0=不限(antd 不设即不限,非显式默认)与焦点环 25% color-mix 自绘示意、switch 轨道像素 40×22/28×16 与 off 轨道灰(自绘示意,不作官方断言)、table striped(antd 6.7.1 无此 prop,取 TDesign 官方注释 @default false,本批 curl 实抓核验)、avatar groupCount 4(演示值)、badge count 8/徽标 20px/dot 8px(演示值)、modal 任务范围 320–720、tooltip theme light(「未证实为任何库默认」,dark 对齐 colorBgSpotlight)。

**结论**:24 条 props 无一凭空捏造官方值——凡与 antd 一致者可回溯到 06 §4/§2 的源码级条目;凡任务规格或演示值,均在 effect/MDX/角标至少一处如实标注「非官方默认」并给出官方真值对照。

## 四、门禁结果(2026-11-21 本会话实跑)

数据合并核验(`scripts/merge-mapping-round4.mjs` 实跑输出):`{"total":67,"preserved":43,"newCount":24,"noBatch":0,"byBatch":{...}}` → 既有 43 条逐字段原样保留,新增 24 条全部带 batch,总量 67,批次分布 3+6+6+6+5+5+4+4+4+4+5+5+4+4+2=67;写后复读验证通过(`merge-mapping-round4: PASS`,exit 0)。

| # | 命令 | 关键输出 | 退出码 |
|---|---|---|---|
| 1 | `node uiux-atlas/scripts/verify-entries.mjs` | `ok: entry inventory matches expected 67 entries` + `ok: components: 24/24 entries present` + `{"expected":67,"found":67,"problems":0}` | 0 |
| 2 | `pnpm -C uiux-atlas run build` | `152 page(s) built in 17.17s · Complete!` | 0 |
| 3 | `node uiux-atlas/scripts/verify-dist.mjs` | `{"checked":152,"missing":0,"contentFails":0}` → PASS | 0 |
| 4 | `node uiux-atlas/scripts/verify-prompt-test.mjs` | `{"passed":7,"total":7}` 七项全 HIT | 0 |
| 5 | `pnpm -C uiux-atlas run check:contrast` | `12/12 配对达标,0 个解析错误`(深/浅各 6 组) | 0 |
| 6 | `pnpm -C uiux-atlas exec astro check` | `Result (106 files): 0 errors / 0 warnings / 1 hint`(hint=PromptExport.tsx:63 `document.execCommand` 弃用,round3 已知可接受项) | 0 |

**页面数口径(verify-dist 实跑 152 = 本次实跑 build 「152 page(s) built」)**:2 首页(zh/en)+ 14 分类页(7 分类 × zh/en,新增 components 分类页)+ 134 条目页(67 条 × zh/en)+ 2 资源页 = 152;verify-dist 本次对全部 152 页逐页做内容标记核验(components 24 条 × zh/en 的名称、「复制复刻 Prompt」/「Copy replication prompt」、「继续深入」/「Go deeper」标记含在内),0 缺失 0 失败。astro check 文件数由 round3 的 82 → 106,与 24 条新 Demo.tsx 落地一致。六项门禁全部通过。

## 五、无法机器验证项(如实列出)

以下项**未在本会话验证**,不属于门禁覆盖面,仅凭条目内 schema/MDX 的自述与源码可读性背书:

1. **demo 交互手感**:hover 展开与 0.1s 收起延时、拖拽、滑杆与参数面板双向同步、点击外部关闭等,均未起 dev 服务器人工过屏走查(round3 同口径留白)。
2. **浮层遮挡与层叠**:modal 遮罩下滚动锁定、dropdown/tooltip/date-picker 浮层与演示台边界的 autoAdjustOverflow 翻转、z-index 1000 体系在真实页面多浮层叠加时的表现,未实测;条目内浮层均在 DemoStage 相对定位内实现,真实门户场景的遮挡风险未验证。
3. **键盘与读屏(AT)实测**:roving tabindex/焦点归还/Esc 的逐键 walkthrough、role=alert 的实际播报效果、date-picker 自绘简化实现(方向键仅月内 ±1/±7,未实现 APG grid 全部键盘契约,条目内已声明需上线前补全并 AT 实测)、nav-menu 完整 menubar 漫游(a11y 字段注明生产补齐,当前为 disclosure 基线 + 弹层内方向键)。
4. **prefers-reduced-motion 降级手感**:24 条 demo 均在代码层实现 RM 分支,但未逐条切换模拟器走查降级观感。
5. **跨浏览器表现**:backdrop-filter 前缀、:has/容器查询等在 Safari/Firefox 的实际渲染未实测(仅 Chrome 系假设)。
6. **深浅双主题下 24 条 demo 的截图目验**:本轮未产出截图,条目配色引用 antd token 但实际观感未逐条目验;站级 12 组语义 token 对比度已由门禁 5 覆盖,条目内部自绘色的对比度未逐一实算。
7. **外联复测**:16 个来源 URL 的网络复测沿用 `out/build-report.md:58` 口径(13/16 因本机网络出口限制待复测),本轮未重试。

---

*本报告由入库员合并轮撰写;所引 mapping 六文件、06-antdesign.md、verify 脚本输出、git status 均为本会话实读/实跑。*
