# UIUX Atlas 重构交付报告

- 日期:2026-11-21 · 依据:`uiux-atlas/docs/design-spec.md`(v2.0)
- 本次改动范围(`git -C uiux-atlas status/diff --stat`):11 个文件修改 + 4 个新增(`BreakdownTabs.tsx`、`HeroGlassDemo.tsx`、`MetaAccordion.astro`、`docs/`),合计 2891 行新增 / 401 行删除;86 个 MDX 零改动。

---

## 一、设计语言一句话概括与三来源各取了什么

**一句话**:恒定深色舞台上的紧凑参数化工作台——被演示的玻璃/光/影是主角,UI 用带蓝 hue 的无彩灰阶(`--bg #0b0e13`,禁纯黑)+ 单强调色退后;层次只动字号/字重/颜色三轴,渐进披露默认收起一步展开,动效有目的、可中断、可 RM 降级(spec §1 五条原则)。

**三来源各取了什么**(spec §0):

| 来源 | 本站取用 |
|---|---|
| Apple(01) | 暗色专属授权与 base/elevated 提亮分层;层次三轴(size/weight/color,同尺寸异字重);disclosure controls 渐进披露;动效 purposeful/cancellable/brief;官方暗色色板给出六个分类 accent 原值;localnav「滚后玻璃化」两态工艺 |
| TDesign(02) | 行高常数公式(font-size+8)与时长档(200/240/280ms)互为校验;组件一手像素规格(Card 16/24 内距、Tag ~24 高、Collapse 整行可点 + 正文 40px 对齐缩进、tabs 指示条 transform 手法);暗色边界用 1px 描边替代阴影;「demo 区比容器深一档」双底色分层 |
| Arco/Semi(03) | 明度台阶分层与「卡比页底高 2 步」;白透明度文字(90/70/50/30%)佐证本站固定 hex 四级;fill 4/8/12% 三级状态层;功能色纪律(红绿不作唯一成败标识);「动效 token 默认 0ms」= 本站全局 RM 降级的理论原型 |

04(画廊趋势)提供采纳/克制裁决,05(可复用代码)提供移植许可核验与「抄思想、按 token 重写」的改写规则(spec §6b/§6c)。

---

## 二、三类页面重构前后对比(仅结构变化)

**首页(`HomeView.astro`)**
- 前:hero(h1+副标两行)→ 六分类 `cat-grid`(纯文字卡+计数文本)→ 精选 `entry-grid`。
- 后:hero 分 `hero-copy`(`--step-5` 标题 + 副标 + 3 个 mono 统计位)+ `hero-live`(内嵌 `HeroGlassDemo`,直接复用 glassmorphism 条目 Demo 与 store,一颗 blur 滑杆;移动端另渲染 `hero-static` 静态帧+链接,CSS 决定显示哪个)→ `bento` 网格(4 列显式 areas:styles 2×2、materials/motion 1×2、color/type/layout 1×1、+1 info 格;每格分类色左边条 + count-up 数字(sr-only 终值)+ 静态微缩预览)→ 精选卡带 `featured` 标记(border-beam)与 `--i` 错峰入场。

**列表页(`CategoryView.astro` + `FilterBar.tsx` + `EntryCard.astro`)**
- 前:页头(h1+计数)→ `FilterBar`(`seg` 按钮组、无计数)→ 卡片网格;卡片显隐为直接 `display` 切换。
- 后:`list-scope` 挂 `--cat` 分类语义色 → `list-head`(标题 + mono 计数)→ `FilterBar` 改 `fchip` 胶囊 chips(各体系/星级带收录计数)、sticky 栏前置哨兵,滚过加 `is-glass` 玻璃底;新增 `filter-count` aria-live 结果行;过滤切换对剩余卡做 120ms `card-in` 淡入(只 opacity)→ 卡片获得 `view-transition-name: card-<slug>`、星级 aria 标签、`reveal` 入场钩子。

**条目页(`EntryDetail.astro` + 新增 `BreakdownTabs.tsx` / `MetaAccordion.astro`)**
- 前:面包屑 → 头部(h1 + aliases + tagline + chips + origin,共四行 entry-sub)→ workbench → MDX 四节原样纵排(`.prose`)→ 六张信息卡全部平铺展开。
- 后:`entry-page` 挂 `--cat` → 紧凑头(背后 `entry-band` 渐变带 + 颗粒;origin 行移出头部)→ workbench(demo 1fr + 面板 340px sticky)→ `read-progress` 发丝线 → MDX 四节经 `BreakdownTabs` 客户端按 h2 分组为 tablist+tabpanel(roving tabindex + 方向键/Home/End、translateX 指示块;服务端 HTML 不变,无 JS 时纵排)→ 六块信息收进 `MetaAccordion`(原生 `<details>`,默认全收,origin 并入「来源」item,正文 40px 对齐缩进)。

---

## 三、巧思清单落地情况(spec §6,逐条)

| # | 巧思 | 状态 | 落点/说明 |
|---|---|---|---|
| 1 | 演示台光标聚光 | 已落地(一处简化) | `Base.astro` 委托式 pointermove 单例:rAF 指数平滑、位移+presence 双 settle 停帧、RM follow=1;`global.css:1390` 聚光层 + RM 静态变体。简化:05 §1.1 的 IO 门控改为委托(舞台由岛屿晚挂载,委托天然覆盖),代码注释已如实标注 |
| 2 | 磁吸复制按钮 | 已落地 | `Base.astro` Magnet 单例(smoothstep 距离场、6px 限幅、弹簧 170/16/1、静止停帧、touch/RM 跳过)+ `PromptExport.tsx` `data-magnet` |
| 3 | Hero live 迷你演示 | 已落地 | `HeroGlassDemo.tsx` 复用 GlassDemo+store;滚过 inert(`Base.astro`);移动端静态帧降级(`HomeView.astro` `hero-static`) |
| 4 | 滚动驱动入场 | 已落地 | `global.css:255` `animation-timeline: view()` + `Base.astro` IO 回退 + RM 直出;卡片带 `--i` 错峰 |
| 5 | Hover 物理回弹 | 已落地 | `global.css:752/939` `--ease-spring`;RM `transform:none`(`global.css:2290` 附近) |
| 6 | Tabs 指示条滑动+键盘 | 已落地 | `BreakdownTabs.tsx`:`bd-thumb` translateX/width `--dur-2`,roving tabindex + Left/Right/Home/End,面板 `--dur-3` 淡入 |
| 7 | 参数值刮擦 scrub | 已落地 | `ParamPanel.tsx` `ScrubName`:setPointerCapture、2px 死区、Shift 细步进、值经 store.set 与滑杆/输入框同入口 |
| 8 | Bento 计数 count-up | 已落地 | `global.css:297` `@property --num`+counter;`Base.astro` IO 进视口触发一次;`sr-only` 终值直出 |
| 9 | 列表→条目共享元素过渡 | 已落地(增强项未做) | `global.css:188` `@view-transition`(包在 no-preference 内)+ EntryCard/EntryDetail 动态 `card-<slug>`(「/」→「-」)。同文档过滤重排的 `document.startViewTransition` 未做:spec §4.2 列为可选增强,默认 120ms 淡入已达标 |
| 10 | 精选卡 border-beam | 已落地 | `EntryCard.astro` `beam`;`global.css:990-1029`:双层 mask 1px 环 + `offset-path: rect(0 auto auto 0 round var(--radius-l))` + 6s linear + 负延迟 -2s/-4s 错相位;RM `opacity:0` |
| 11 | 过滤栏滚后玻璃化 | 已落地 | `FilterBar.tsx` 哨兵 IO + `is-glass`;`global.css:1145` `--glass-*`+`--shadow-1` |
| 12 | 渐变带+颗粒 | 已落地 | `global.css:1316` 双 radial 22%/10% + `::after` feTurbulence 0.65/3 噪点 opacity 0.04 |
| 13 | 「查看 Prompt」渐变长出 | 已落地 | `PromptExport.tsx` `prompt-reveal`+`prompt-fade`;`global.css:2160` 20px 渐变过渡层,代码底 `--bg-elev` |
| 14 | Accordion 40px 对齐缩进 | 已落地 | `global.css:1658` `acc-inner` padding-left 40px(注释 16+24);原生 `<details>` 整行可点 |
| 15 | 过滤 chip 标签计数 | 已落地 | `FilterBar.tsx` `systemCounts/starCounts` → `fchip-count`;bento/list/acc-hint 同工艺 |
| 16 | mono 角标编号美学 | 已落地(列表卡角标未做) | `hero-stat-num`/`bento-count-num`/`list-count-num`/`filter-count` 均 mono+tabular-nums。spec 标注的「未来列表卡角标(★3 · MOTION · 12 PARAMS)」未做——spec 原文留待未来,本次不属欠账 |
| 17 | Bezier 预设幽灵预览 | 已落地 | `ParamPanel.tsx` `BezierControl` ghost 虚线:hover+focus 双触发(键盘等价),点击才提交 |
| 18 | 复制成功微脉冲 | 已落地 | `global.css:2107` `copy-pulse` 200ms 一次即止;文案切换 + `role="status"` sr-only 回执 |
| 19 | 阅读进度发丝线 | 已落地 | `global.css:1458` sticky 2px + `scroll(root)` scaleX(`animation-timeline` 在 `animation` 之后);RM `display:none`;挂在 Tabs 区块前 |

另有两处与 spec 字面的偏差,如实记录:① spec §3 说来源 item「默认且永久收起」,实现为默认收起但可点开——origin 行已移入该 item,若永久不可展开该信息将不可达;② spec §4.3-6 的「锚点不做 localnav」确实未做(遵守)。

---

## 四、门禁结果(本次会话实跑)

| 检查 | 命令 | 结果 |
|---|---|---|
| 条目完整性 | `node uiux-atlas/scripts/verify-entries.mjs` | `{"expected":43,"found":43,"problems":0}` **PASS** |
| 构建 | `pnpm -C uiux-atlas run build` | **100 pages built**, Complete!(无报错) |
| 构建产物 | `node uiux-atlas/scripts/verify-dist.mjs` | `{"checked":100,"missing":0,"contentFails":0}` **PASS** |
| Prompt 实弹 | `node uiux-atlas/scripts/verify-prompt-test.mjs` | `{"passed":7,"total":7}` **PASS**(门槛 ≥5/7) |
| 类型检查 | `pnpm -C uiux-atlas run check`(astro check) | 76 files:0 errors / 0 warnings / 1 hint |
| Token 对比度 | `python -I .scratch-design-study/check_tokens.py` | 六分类 accent 对 bg 5.33–10.99、对最浅背景 ≥4.76;七级 clamp 在 360px/1280px 精确命中端点,**通过** |
| Token 补充 | `python -I .scratch-design-study/check_tokens2.py` | `--text-ghost` 4.18(vs surface 3.74)、ok 10.72、warn 11.34,**通过** |

未跑(如实标注):浏览器端 360px scrollWidth 实测、Lighthouse/axe 扫描、RM 实机走查、首屏双要素与 1.5 屏预算的实机测量——与 spec 附录第 4 条的留待项一致。

---

## 五、已知风险

1. **View Transition 的浏览器差异**:MPA 跨文档视图过渡目前仅 Chromium 系完整支持;Firefox 等对 `@view-transition` 规则与 `view-transition-name` 均惰性,退回普通跳转(`global.css:184` 注释、`EntryDetail.astro` h1 注释已写)。功能不破坏,但非 Chromium 用户无 morph;Safari 实际表现需实机验证。
2. **Tabs 渐进增强的局限**:`BreakdownTabs` 依赖 `client:visible` 水合——水合前/无 JS 时四节纵排全展开,水合后重组为面板,存在一次布局变化;水合后浏览器页内查找(Ctrl+F)只命中激活面板;组件以 `#entry-prose` id 定位源容器,同页多实例复用会冲突(当前每页一个)。
3. **`card-<slug>` 命名假设**:「/」替换「-」后若两个不同 slug 串接结果相同会重名(同屏同名 `view-transition-name` 会互相吞 morph)——当前 43 条目 slug 不发生碰撞,但新增条目时无自动校验。
4. **scrub 手势与滚动的冲突**:`ScrubName` 小标签上 `touch-action` 限制横向手势,移动端从 13px 标签起手的纵向滚动体验需实机走查。
5. **现代 CSS 依赖的降级**:`@starting-style` + `grid-template-rows` 过渡(Accordion 展开动画)、`animation-timeline`(入场/发丝线)、`@property`(count-up)在不支持浏览器中按能力分支退化为无动画直出,不会坏内容,但老浏览器完全无动效层。
6. **聚光/磁吸的设备门禁**:两者均限 `(hover: hover) and (pointer: fine)`,触屏与 RM 自动失效;window 级 pointermove 常驻监听为 passive,但理论上为每次指针移动都做 `[data-magnet]` 测距(当前每页 ≤1 实例,成本可忽略;实例增多需回到 IO 门控)。
7. **验收盲区**:首屏双要素、1.5 屏预算、44px 触控、360px 无横向滚动四项发布门禁属浏览器端测量,本次未执行——发布前需按 spec §5/§7/§8 补实机走查。
