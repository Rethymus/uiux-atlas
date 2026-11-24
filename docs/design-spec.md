# UI/UX 设计全解图集 · 设计语言规范(Single Source of Truth)

- 版本:v2.6.1 · 2026-11-24(v2.6.1:布局优化修订——① 十分类 accent 补 `--cat-principles`(深 = Apple systemTeal `#40c8e0`、浅 = 同 hue 加深 `#0d7086`,对四层底 min 7.93/4.90:1 实算;systemIndigo 暗色一手值对 bg/surface 仅 3.82/3.41:1 不达 4.76 线弃用);② 首页 bento areas 重排收纳第 10 分类(components 回归 1×1,底部行 icons/dataviz/principles/info,无隐式行);③ §6-4 入场区间收紧为 `entry 0% entry 100%`(旧 `entry 25% cover 50%` 使静止时下半屏同级卡停在半透明);④ header 桌面降载:链接内距 12→8、搜索 kbd 恒隐藏、内距 gap 20→16(TDesign gutter 16 同档,13 号研究 §2.1),`.site-nav` 横滑+渐隐 mask 上提为全档(<640 方案复用);⑤ workbench `align-items: stretch` + 演示台拉满(消除左列下方空置);⑥ zh 语言钮文案改「EN」(标目标语言);⑦ 过滤星级组零值 chip 与体系组统一(count=0 不渲染)。v2.6:材质层——Apple 中性阶梯 token + 三档参数化材质组(mat-thin/regular/thick × 深浅)+ `.material` 工具类 + 五面语义接入 + 按压对 + 焦点环统一,参数全部溯源 `out/design-study/09-apple-materials.md`;v2.5:浅色主题现代化——`--bg-wash` 三盏环境色温灯 + `--card-lift` 卡片浮起 + hero 光晕;v2.4:回填第五张页面蓝图「趋势追踪页」;v2.3 曾补「资源导航页」与「继续深入卡」;既有结构与数值保留)
- 适用范围:`uiux-atlas` 全站(Astro 静态站 + React 岛屿;**43 个条目 × 中英双语 = 86 个 MDX** + schema)
- 地位:本文件是本站设计决策的**单一事实来源**;与它冲突的样式/组件实现以本文件为准,改动先改本文件。
- 用法:agent 与人读同一份。所有 token 给具体值;所有决策给理由;未核验处如实标注。

**v2.6 增补(2026-11-23 · 参数面板升级;决策记录,详见 §3)**

1. §3 参数面板六项:① **预设色板**——color 型参数(含 shadow 逐层 color)控件底部渲染一排 swatch(交互语义复用 enum-seg 的 aria-pressed;透明色以 checkerboard 井格衬底),点击即 set;色板两级来源:schema 逐条目声明 `presets`(语义优先——glassmorphism fill/border 霜面 α 阶与深色玻璃 `oklch(21.4% 0.0322 262.4 / 0.55)` = 条目自载配方 rgba(17,25,40,0.55) 的换算、dimming-layer/scrollbar-track 的 25% scrim 阶、spatial-ui shadow 取 §2.5 阶梯),未声明时按参数默认值程序化派生(站点推导,如实标注:L 阶 −0.15/+0.10 或 α 阶 ×0.5/×2 封顶 1,极端不透明如实为空,不引入新色相)。② **oklch 预览 + 原生取色器桥接**——四滑杆头部加合成色预览块(CSS 原生渲染 oklch())与取色器(hex 经 `lib/color.ts` `parseColorInput`/`srgbToOklch` 反解回 L/C/H,保留当前 α 不静默丢失);hex 参数增 #RGB/#RRGGBB/#RRGGBBAA 文本输入(8 位 hex 的 alpha 不再被取色器静默裁剪)。③ **单参数复位**——dirty 时名称行出现 ↺ 小钮(hover 显示/焦点常显/触屏恒显,44px 热区),回该参数默认,不再连带 Reset All。④ **数值输入契约**——提交值与显示文本立即一致(吸附+截断后马上回写,`--warn` 边 600ms 单发警示),非法输入 `data-invalid`+`aria-invalid`,未确认文本 `data-pending` accent 边,Enter=确认,头部值 `aria-live="polite"`;滑杆/scrub/键入三条改值路径统一 step 吸附。⑤ **分组折叠**——几何/色彩/动效/阴影各为原生 `<details>`,默认全展开(首屏双要素 §5 不受损),展合瞬时、chevron `--dur-2` 旋转;原「不做折叠面板本身」修订为「分组可折叠,面板整体仍常驻」。⑥ **Bezier 预设扩充**——新增 default(=param.default)与 §2.6 站点 token:standard/decel/accel/spring。工程与验收:`lib/color.ts` 增 `srgbToOklch`/`rgb01ToHex`(Oklab 同源逆矩阵,往返最大通道误差 1.61e-7 本次实测);store 增 `resetParam`(纯新增方法,既有 set/reset 逻辑零改动);`astro check` 0 errors / 0 warnings;86 个 MDX 正文未动,「复制复刻 Prompt」/「Copy replication prompt」文案逐字未动。

**v2.5 → v2.6 变更摘要(材质层)**

1. §2.1 新增 **Apple 中性阶梯 token**(两主题各一套):iOS `systemGray` 六阶 + `systemBackground`/`systemGroupedBackground` 三阶 + `separator` α 族(`--ios-*` 前缀;官方值溯源 09 §2,深色 separator 基色 (84,84,88)@0.6 已按 09 勘误)。工作台四级背景**并存不替换**——12 对 AA 对比度配对不受影响(`check:contrast` 复跑 12/12)。
2. §2.8 新增**材质层章节**:参数化材质 token 组(每档 blur/saturate/叠色 tint α/内高光/细边框/阴影 × 深浅两态 × 三档)+ `.material` 工具类 + **五面语义接入**(站点 header、过滤栏、参数面板、演示面板、Prompt 导出框)+ `@supports` 门控回退。v2.1「玻璃只允许两条 sticky 带」纪律由本节**接替更新**:两条 sticky 带升入同体系,内容层新增三块语义面板接入(各自静态、不动画 backdrop-filter)。
3. §3 统一状态集补**按压对**规格:全站按钮(主/次/chip/seg/tab)按压 = `scale(var(--press-scale) 0.96)` + alpha 状态层(`--fill-2`),Apple `UIControl.isHighlighted` 成对语义(09 §4;0.96 为 09 引用的社区量级,官方未公布,如实标注)。容器级卡片保持 0.99。
4. §8 焦点环改 **Apple web 官方规格**(09 §3 实抓):2px accent + offset **1px**(原 2px 非官方值)+ 圆角跟随,容器级 offset **3px**;token 化 `--focus-ring-*`。
5. §2.6 动效预留语义:`--ease-card-spring`(卡槽弹簧 = snappy 档)与 `--dur-overlay-in`(浮层入场 = --dur-3 × --ease-decel)先锁名占位,启用不新造 token。

**v2.2 → v2.3 变更摘要(规范缺口回填)**

1. §4 增补第四张页面蓝图——**资源导航页(`/resources/` 与 `/en/resources/`)**(§4.4:页头 mono 计数 + 五组卡片网格 + 外链规则 + 浅深两态);§3 增补**「继续深入卡(Go deeper)」**组件解剖(条目页 aside:按 system+category 静态映射 ≤3 条,web-std 额外呈现 `schema.sources` 官方 URL)。其余章节未动。

**v2.1 → v2.2 变更摘要(控件去原生感重绘)**

1. §3 新增**滑杆(Slider)解剖**小节:8px 圆角轨道 + `--fill-percent` 双色断点填充(accent → fill-2)、18px 白芯 accent 环拇指(hover ×1.10 + 光晕 / active ×0.95 / focus-visible 双层焦点环)、44px 整元素命中区 + 32px 同组对齐数值输入框(`appearance:none` 去原生箭头);`global.css` `input[type="range"]` 体系按本节重绘,`--fill-percent` 由 ParamPanel / HeroGlassDemo 内联注入。
2. §3 其余控件现代化补齐:Segmented/enum/Tabs 按压态(`scale(0.97/0.98)` + `--dur-1` 状态过渡)、可点 Chip hover 增 `--border-strong`、sticky 过滤栏激活阴影按 §2.5 点名改 `--shadow-2`、全站细滚动条(标准 `scrollbar-width/color` + webkit 伪元素)、滑杆拇指与按钮缩放在 RM 下 `transform:none` 直达终态。
3. 实现与规范的冲突修正:§7 触控段的「input 28px 命中区」旧值与 §3 参数面板段「轨道 4px + 16px thumb」旧值随本节一并更新为 44px 命中区 / 8px 轨道 + 18px 拇指。

**v2.0 → v2.1 变更摘要(用户裁决:废止「永久深色」)**

1. §1 原则 1 由「深色舞台,UI 退后(永久深色)」改为「**双主题舞台:默认深色,浅色一等公民**」;§6b「克制地不跟」表中「亮暗双主题开关」一行相应翻案。
2. §2.1 新增**浅色 token 全表**(逐值,`:root[data-theme="light"]`);参考 02 TDesign `_light.less` 同构取号、03 Arco 亮色 bg/text 阶梯、Apple HIG 双外观语义色;全部文本用值经 WCAG 实算脚本锁定 AA;阴影 `--shadow-*` 与 `--stage-glint` 浅色减弱;新增 `--seg-thumb`(选中浮起面)token。
3. §7 新增**主题切换钮规范**(位置/交互/持久化/防闪烁/theme-color 双值)。

**v1.0 → v2.0 变更摘要**

1. §0:五份设计研究(01-apple / 02-tdesign / 03-bytedance / 04-galleries-trends / 05-reusable-code)本次全部读取并纳入;v1.0 的替代来源声明保留为历史记录。
2. §2 Token:全部数值未改;补 TDesign(行高公式、时长档、组件规格)、Radix 12 步语义映射、Arco/Semi 交叉验证。
3. §3 组件:吸收 02 的组件一手规格并逐项对照;Accordion 补 TDesign collapse 对齐工艺。
4. §6 巧思:14 → 19 条(交互式 9 → 10),每条补做法/落点/dogfood/RM 与研究出处。
5. §6b 趋势取舍:改以 04 研究为主线(配色/排版/动效逐条裁决);§6c 移植清单:改以 05 研究的 18 个片段为依据逐条裁决。
6. 附录:本次会话**复跑**校验记录。

---

## 0. 素材来源与如实说明

| 声明 | 内容 |
|---|---|
| 五份设计研究(本次全部读取,2026-11-21) | `out/design-study/01-apple.md`(HIG 官方 JSON + apple.com CSS 实测);`02-tdesign.md`(TDesign 官方样式包 `_light/_dark/_font/_radius/_size.less` + 组件 `_var/_index.less` 一手源码);`03-bytedance.md`(Arco `global.less/default.less` + Semi `variables.scss/animation.scss` + 官方编译 CSS);`04-galleries-trends.md`(Mobbin/godly/land-book/awwwards/CSSDA/httpster 六站 + Radix unpkg 实测色值 + Webflow 2026 + MDN/motion.dev);`05-reusable-code.md`(react-bits/Magic UI/Aceternity 18 片段源码 + 注册表 JSON + 许可实核) |
| **v1.0 历史记录(保留)** | v1.0 写作时 02–05 四份研究不存在,曾以 `.scratch-design-study/` 的 Arco 样式指南、`arco_global.less:356-380`(bg-1 `#17171a`→bg-5 `#373739`、text 白 90/70/50/30%)与 Semi Collapse 结构文档替代,并如实标注「TDesign 一手数值未取得」。v2.0 已补齐:02 的全部 token 数值(灰阶 14 级、文字透明度 90/55/35/22、时长 200/240/280ms、圆角 7 档、组件规格)均已取得并对照落档 |
| 本次会话实跑的检查 | ① `python -I .scratch-design-study/check_tokens.py` 复跑:四级文本对 bg/surface = 16.45/8.90/6.43(+accent 8.71:1),边框 1.50/1.93:1,六分类 accent 对 bg 5.33–10.99(对最浅背景 ≥4.76:1),七级 clamp 在 360px/1280px 精确命中端点——**全部通过,与 v1.0 记录一致**;② `python -I .scratch-design-study/check_tokens2.py` 复跑:`--text-ghost` #6b7683 = 4.18:1(vs surface 3.74),`--ok` 10.72、`--warn` 11.34——**通过**;③ 条目计数:`find src/content/entries -name "zh.mdx" | wc -l` = 43,`*.mdx` 总数 86(43 zh + 43 en),`Demo.tsx` 43 个,六分类 id(styles/materials/motion/color/type/layout)与 `src/lib/types.ts` 一致,`styles/glassmorphism/demo/Demo.tsx` 存在 |
| 未跑(如实标注) | 浏览器端 360px scrollWidth 实测、Lighthouse/axe 扫描——§7/§8 的命令级验收留给实现后执行 |

三家(三份官方体系研究)取舍立场:Apple(01)给「层次、渐进披露、可中断动效、暗色 base/elevated 分层」;TDesign(02)给「行高常数公式、时长双端公式、组件像素规格、暗色描边工艺」;字节 Arco/Semi(03)给「明度台阶分层、白透明度文字、功能色纪律、动效默认可关」。画廊趋势(04)给「采纳什么、克制什么」的判断依据;可复用代码(05)给「移植许可与改写要点」。凡冲突处,以**本站条目页的可用性**优先,理由写在对应小节。

---

## 1. 设计原则(5 条)

1. **双主题舞台:默认深色,浅色一等公民**(v2.1 修订,用户裁决废止 v2.0「永久深色」;← Apple HIG 双外观语义色:同一语义 token 两套值;← 02 TDesign `_light/_dark` 同构取号、03 Arco 亮暗两套 token 的成熟实践)。落地:全站两套主题、**语义层不变、值分主题**——默认深色(被演示的玻璃/光/影是主角,UI 退后),浅色为完整一等公民(§2.1 浅色表);UI 只用带 hue 的无彩灰阶 + 单强调色,分类色只在「分类语义」处出现,绝不进正文字段;两套底色均禁死黑死白——深色 `--bg #0b0e13` 带蓝 hue(04 §2.2:深底必须带色相,slate-1 `#111113` 即范例),浅色 `--bg #f3f5f8` 同 hue 取向(非死白页底,TDesign 亮色 page=gray-2 同思路);切换与持久化规范见 §7。
2. **层次三轴,不靠装饰**(← Apple Typography:层级只动 size/weight/color;同尺寸异字重是标志性手法;TDesign 只留 400/600 两档的跨端纪律)。落地:新区块先用字号/字重/颜色拉开层次,解决不了才允许加边框或底色;两个同级块严格同一左缘。
3. **渐进披露 = 默认收起,一步展开**(← HIG Layout:disclosure controls 收纳次要细节;TDesign Collapse「整行可点 + 正文缩进对齐」;Semi Collapse 三要素)。落地:首层只保留「演示 + 面板 + 指路」;讲解、规格、来源全部进 Tabs/Accordion,展开即达,不跳页。
4. **密度是工作台的美德**(← Apple designing-for-macos:comfortable information density;TDesign macOS 级密度、正文 14px/最小 12px;03 Arco 层级差 2–4px)。落地:面板/表格用 12–13px mono 数值与紧凑行距;营销式大留白只允许出现在首页 hero 一处。
5. **动效有目的、可中断、可降级**(← HIG Motion purposeful/cancellable/brief;Semi 把「动效 token 默认 0ms」做成无障碍架构,03 §3)。落地:每个动效登记在 §6 清单,说不出用途的不做;全局 `prefers-reduced-motion` 降级见 §8;JS 驱动的动效必须监听变化事件实时停起。

---

## 2. Token 体系(全部具体值)

### 2.1 色彩

**语义分层(深色工作台基调)** —— 数值沿用现行 `src/styles/global.css:12-52` 已验证值,补 04 Radix 12 步语义映射与 02/03 交叉验证;分层逻辑 = Apple base/elevated(01 §3.2:暗色深度靠提亮)+ Radix「卡片永远比页面底高 2 步」(04 §2.2-2):

```css
:root {
  /* ── 背景 4 级:页面底 → 演示台 → 卡片 → 卡内嵌块 ── */
  --bg:        #0b0e13;   /* level-0 页面底(base);带蓝 hue,禁纯黑 */
  --bg-elev:   #10141b;   /* level-0.5 演示台/代码块底(demo-stage、prompt-pre;
                             = 02 §7.4 TDesign「demo 区比容器深一档」的双底色分层工艺) */
  --surface:   #161b23;   /* level-1 卡片/面板(elevated) */
  --surface-2: #1d232d;   /* level-2 组内嵌块(表格头、seg 容器、hover 面) */

  /* ── 边框 2 级 ── */
  --border:        #2b323d;  /* 非交互细边(= Radix step6 语义;实测 1.50:1,仅装饰) */
  --border-strong: #3a434f;  /* 交互边界(= Radix step7/8 语义;1.93:1,凡仅靠边框识别的
                                控件必须另配状态色,见 §8) */

  /* ── 文本 4 级(对 --bg:16.45 / 8.90 / 6.43 / 4.18:1;对 --surface:14.71/7.96/5.75/3.74) ── */
  --text:       #e9edf3;  /* primary(= Radix step12 软白思路:非 #fff,对齐 Pantone 2026
                             Cloud Dancer「素雅近白」取向;Pantone 官方未公布 HEX,如实标注) */
  --text-dim:   #a7b1bd;  /* secondary:正文(8.90:1,满足 7:1 追加目标;= Radix step11 APCA Lc60 语义) */
  --text-faint: #8b96a3;  /* tertiary:label/meta/图注(6.43:1,AA 通过) */
  --text-ghost: #6b7683;  /* quaternary:禁用/占位(4.18:1;禁用态 AA 豁免) */

  /* ── 状态填充 3 级(Arco 暗色 fill 4/8/12% 白,03 §1.4 = Radix step4/5 hover/active 语义) ── */
  --fill-1: rgba(233, 237, 243, 0.04);  /* hover state layer */
  --fill-2: rgba(233, 237, 243, 0.08);  /* pressed / 选中底 */
  --fill-3: rgba(233, 237, 243, 0.12);  /* 拖拽中 / 强调嵌块 */

  /* ── 全站交互强调色(= Radix step9 solid;面积纪律 <5%,04 §2.2-5) ── */
  --accent:        #6db2ff;  /* 8.71:1 vs bg */
  --accent-strong: #9cc9ff;  /* hover 提亮(= step10 solid hover) */
  --accent-dim:    rgba(109, 178, 255, 0.14); /* 选中底/按钮底(= Radix「染色面用同 hue 低透明」) */
  --ok:   #6fd598;   /* 成功(10.72:1) */
  --warn: #ffb86b;   /* 警告/删除 hover(11.34:1) */
  --danger: #ff6165; /* 错误(Apple 官方暗色高对比 Red,01 §3.2) */
}
```

**与三家体系的映射与差异(决策记录)**:文字四档——Arco 用白透明度 90/70/50/30%、TDesign 用 90/55/35/22%(02 §1.6:黑底亮度曲线不同,暗色刻意调低以拉平两模式阅读感),两方案互为佐证;本站取**固定 hex 四级**(数值已实测锁死对比度,渲染更稳定),透明度方案留作未来多主题扩展的等价路径。灰阶——TDesign 14 级两主题共享同组灰、靠取号方向反转分层(02 §1.5),本站深浅两主题各自 4 级背景(v2.1),已覆盖其 gray-11~14(深)与 gray-1/2(浅)的取号区间。

**浅色主题全套值(v2.1 新增;`:root[data-theme="light"]`,语义层不变、值分主题)**

参考与校准:背景/文本阶梯对照 03 Arco 亮色(bg #FFF、gray-1 `#F7F8FA`;text-1 `#1D2129` / text-2 `#4E5969` / text-3 `#86909C`)与 02 TDesign 亮色(page=gray-2、容器=#fff、文字黑 90/60/40%)+ Apple HIG 双外观「同一语义两套值」;本站全部值带蓝 hue(与深色 `--bg` 同族),文本用值经 WCAG 实算脚本(`.scratch-design-study/check_tokens_light.py`,2026-11-21 实跑)锁定,正文/强调文本对 bg/surface ≥4.5:1(AA):

| token | 浅色值 | 对 bg `#f3f5f8` / 对 surface `#ffffff` | 说明 |
|---|---|---|---|
| `--bg` | `#f3f5f8` | — | level-0 页面底(Arco gray-1/2 之间,带蓝 hue,禁死白页底) |
| `--bg-elev` | `#eaeef3` | — | level-0.5 演示台/代码块(浅色「深一档」反转为**更暗一档**) |
| `--surface` | `#ffffff` | — | level-1 卡片(TDesign/Arco 容器 = #fff) |
| `--surface-2` | `#eef1f5` | — | level-2 组内嵌块 |
| `--border` | `#dde2ea` | 1.19 / 1.30 | 非交互细边(= Arco `--color-border` gray-3 同档,仅装饰) |
| `--border-strong` | `#bcc4d1` | 1.61 / 1.76 | 交互边界(深色纪律照旧:不作唯一识别依据,§8) |
| `--text` | `#1d242f` | 14.29 / 15.61 | primary(≈ Arco text-1 `#1D2129` 同档,带 hue) |
| `--text-dim` | `#47546b` | 7.00 / 7.64 | secondary 正文(7:1 追加目标达成,与深色对齐) |
| `--text-faint` | `#5e6b81` | 4.94 / 5.39 | tertiary label/meta(AA;Arco text-3 `#86909C` 亮色实测 3.37:1 **不达 AA,不照抄**,加深一档) |
| `--text-ghost` | `#7e8b9e` | 3.17 / 3.46 | quaternary 禁用/占位(禁用态 AA 豁免) |
| `--fill-1/2/3` | `rgba(29,36,47,.05/.09/.14)` | — | 墨水系 state layer(= Arco 亮色 fill-1/2/3 gray-1/2/3 同语义) |
| `--accent` | `#1a69d2` | 4.81 / 5.26 | = Arco arcoblue-6 `#165DFF` 附近同 hue,AA 校准 |
| `--accent-strong` | `#124ea6` | 7.21 / 7.88 | hover **加深**(方向随主题翻转,见下) |
| `--accent-dim` | `rgba(26,105,210,.10)` | — | 选中底(accent 对其复合底 4.57:1) |
| `--ok` | `#0c7b45` | 4.89 / 5.34 | 成功(TDesign 亮色 success `#2ba471` 仅 3.16:1 不达 AA,加深) |
| `--warn` | `#995a00` | 5.04 / 5.50 | 警告/删除 hover |
| `--danger` | `#c93040` | 4.83 / 5.28 | 错误(TDesign error-6 `#d54941` = 4.32:1 不达 AA,加深) |

六分类 accent 浅色值(同 hue 加深;对全部四层底 bg/elev/surface/surface-2 ≥4.5:1,文本用法成立):

| token | 浅色值 | min 对四层底 |
|---|---|---|
| `--cat-styles` | `#a426cc` | 4.83 |
| `--cat-materials` | `#0b7491` | 4.60 |
| `--cat-motion` | `#a05200` | 4.87 |
| `--cat-color` | `#cf1d52` | 4.56 |
| `--cat-type` | `#4353e6` | 4.98 |
| `--cat-layout` | `#0a753c` | 4.97 |

浅色附加规则(§2 逐项对映):① **方向反转**——深色阶梯「浮起 = 提亮」(卡比页底亮、hover 提亮、`--accent-strong` 提亮),浅色整体反转「浮起 = 提白」:卡(白)比页底灰、hover 加深、`--accent-strong` 加深(= 02 §1.4 TDesign「亮色 hover=6 加深邻位、暗色往浅走」的同构做法,语义名不变);新增 `--seg-thumb`(选中浮起面)token 承载 seg/bd-tabs 指示块与导航当前项:深色 = `--surface-2`、浅色 = `--surface`。② **阴影减弱**:`--shadow-1/2/3` 浅色 = `rgb(28 39 58 / .08/.12/.16)`(02 §4.1 TDesign 亮色三层投影 5–12% 黑同档),深色保持 `.35/.45/.55`。③ `--stage-glint`(v2.1 新增,原 `.demo-stage` 硬编码 `rgb(255 255 255 / .02)` token 化):深色白 2%、浅色白 65%(02 §4.2 亮色内描边思路)。④ `color-scheme`:深色 `dark`、浅色 `light`(原生控件/滚动条跟随)。⑤ v2.1 的「`--glass-bg` 引用 `--bg` 的 color-mix」已随 v2.6 材质层改组:玻璃/材质底色 = `--mat-*-tint`(浅色基色取 09 §1.4b 官方 scrim `rgb(250,250,252)`,自动随主题),`::selection` 仍引用 `--accent` 的 color-mix。⑥ demo 舞台内部布景与条目 demo 组件**不随主题变**(条目自身内容);站点侧仅 hero/bento 的静态微缩预览为自包含画作,两主题通用,同样不改。⑦ **环境光晕与卡片浮起(v2.5 新增,回应「浅色过素」的验收意见)**:`--bg-wash` = 三盏低饱和色温灯(蓝 `rgb(26 105 210/.075)`、紫 `rgb(122 90 248/.065)`、薄荷 `rgb(13 115 112/.055)` 的 radial-gradient 组,α≤7.5%)以 `background-image`(no-repeat)铺于文档顶部,随滚动自然离场——刻意不用 fixed 层/`background-attachment: fixed`(滚动重绘、无障碍滚动与页面捕获均会劣化),深色不定义 → 纯 `--bg` 舞台不变;`--card-lift` = 白卡顶缘受光内描边 `inset 0 1px 0 rgb(255 255 255/.9)` + 1px 投影,v2.6 起作用于 entry/cat/info 卡(demo/param 面板移入 §2.8 材质层,顶缘内高光由 `--mat-*-highlight` 承担);hero 区加同 hue 9.5%/7.5% 双灯光晕;浅色页头玻璃 v2.5 的「白 66%」覆写已删除,由 `--mat-regular-tint`(浅 `rgba(250,250,252,.8)`)随主题接管。α≤7.5% 对 §8 的 12 对 AA 配对无实质影响(check:contrast 复跑 12/12 通过)。首页 bento 的 count-up 数字滚动为 dogfood 巧思,截图/存档须等动画落定(≥2s)后取值。⑧ **材质层浅色值(v2.6)**:`--mat-thin/regular/thick-tint` = `rgba(250,250,252,.6/.8/.92)`、`--mat-*-highlight` = 白 `.3/.35/.4`(09 §1.4d 亮档),其余参数引用深色块定义自动随主题——全表见 §2.8。

**六个分类 accent(装饰原值 = 文本用值)**。原值全部取自 Apple 官方暗色色板(01 §3.2 一手 `alt` 实读);六个值经脚本实测在 `--bg`/`--bg-elev`/`--surface` 上全部 ≥4.76:1。这是 04 §2.1 Webflow「Explosion of color:整套色系上全线」的克制版——六个分类色**共享同一明度框架**,不是六个独立主题:

| 分类 | token | 值 | 对 bg | 对 surface | 语义联想 |
|---|---|---|---|---|---|
| styles 风格流派 | `--cat-styles` | `#DB34F2`(Purple) | 5.33 | ≥4.76 | 创意流派 |
| materials 材质与光影 | `--cat-materials` | `#3CD3FE`(Cyan) | 10.99 | ≥9.83 | 玻璃/透射 |
| motion 动效与微交互 | `--cat-motion` | `#FF9230`(Orange) | 8.66 | ≥7.74 | 能量 |
| color 色彩与主题 | `--cat-color` | `#FF375F`(Pink) | 5.49 | ≥4.91 | 色度 |
| type 排版 | `--cat-type` | `#6D7CFF`(Indigo) | 5.50 | ≥4.92 | 字形 |
| layout 布局与响应式 | `--cat-layout` | `#30D158`(Green) | 9.56 | ≥8.55 | 结构网格 |

用法纪律(← Apple:"一个颜色只承担一个语义";Radix:step9 solid 面积 <5%):分类色只出现在 ① 首页 bento 分类格标识条与数字 ② 条目页头部 accent 渐变带 ③ 面包屑/列表页头当前分类。**不**用于链接、按钮、边框;全站可交互语义只有 `--accent` 一个蓝。

**玻璃材质 token(v2.6 起由 §2.8 材质层接管)**:v2.1 的三 token(apple.com localnav 实测,01 §4.3/§5.4)`--glass-blur: 20px / --glass-saturate: 180% / --glass-bg: color-mix(in srgb, var(--bg) 88%, transparent)` 已由参数化材质组(三档 × 深浅,§2.8)接替——20px/180% 即材质层 `--mat-regular-blur/--mat-saturate` 的官方锚点,`--glass-bg`(88% 单态)升格为三态公式(常规/吸顶/实色)。v2.1「只允许两条 sticky 带,内容层禁用」纪律同步更新为 §2.8 的**五面语义接入清单**(两条 sticky 带 + 三块工作台面板;仍禁止全屏化/整页玻璃,NN/g 与 04 §2.3「玻璃退潮」的克制结论不变)。

**Apple 中性阶梯 token(v2.6 新增;官方值溯源 09 §2,`--ios-*` 前缀)**:与工作台四级背景**并存不替换**——本站带蓝 hue 的工作台阶是「站点自身身份」,iOS 官方阶是「Apple 参照系与材质层基色」,两套并存(12 对 AA 配对不受影响,`check:contrast` 复跑 12/12)。深浅两态各自一套值,语义层不变、值分主题(v2.1 同规):

| token | 深色(:root) | 浅色([data-theme="light"]) | 官方名(09 出处) |
|---|---|---|---|
| `--ios-gray` | `#8e8e93` | `#8e8e93` | systemGray(两态同值) |
| `--ios-gray2` | `#636366` | `#aeaeb2` | systemGray2 |
| `--ios-gray3` | `#48484a` | `#c7c7cc` | systemGray3 |
| `--ios-gray4` | `#3a3a3c` | `#d1d1d6` | systemGray4 |
| `--ios-gray5` | `#2c2c2e` | `#e5e5ea` | systemGray5 |
| `--ios-gray6` | `#1c1c1e` | `#f2f2f7` | systemGray6 |
| `--ios-bg` | `#000000` | `#ffffff` | systemBackground |
| `--ios-bg-secondary` | `#1c1c1e` | `#f2f2f7` | secondarySystemBackground |
| `--ios-bg-tertiary` | `#2c2c2e` | `#ffffff` | tertiarySystemBackground |
| `--ios-grouped-bg` | `#000000` | `#f2f2f7` | systemGroupedBackground |
| `--ios-grouped-bg-secondary` | `#1c1c1e` | `#ffffff` | secondarySystemGroupedBackground |
| `--ios-grouped-bg-tertiary` | `#2c2c2e` | `#f2f2f7` | tertiarySystemGroupedBackground |
| `--ios-separator` | `rgba(84,84,88,0.6)` | `rgba(60,60,67,0.29)` | separator(α 色,「允许底层内容透出」) |
| `--ios-separator-opaque` | `rgb(56,56,58)` | `rgb(198,198,200)` | opaqueSeparator |
| `--ios-label-secondary` | `rgba(235,235,245,0.6)` | `rgba(60,60,67,0.6)` | secondaryLabel(标签透明度族) |
| `--ios-fill` | `rgba(120,120,128,0.36)` | `rgba(120,120,128,0.2)` | systemFill |

如实标注:① 高对比变体(09 §2.1 表的第 3/4 列)未收录——本站未启用高对比主题;② HIG 官方提醒「不要硬编码系统色值」(09 §2.1),故落为可整体切换的 token 而非散落字面值;③ separator 深色基色为 **(84,84,88)@0.6** 而非任务假设的 (235,235,245) 族——09 §2.4 已勘误((235,235,245) 是深色标签族基色)。

**条目头渐变带**:静态(无动画,理由 §6-12),暗底 + 分类色低透明度双 radial,叠 4% 噪点防 banding(配方来源:`05 §4.3` grain 参数 `feTurbulence baseFrequency 0.65 / numOctaves 3`,与站内 `materials/grain-gradient` 条目配方一致;轻量变体 0.9/2 octaves + opacity 0.16 留档):

```css
.entry-band {
  background:
    radial-gradient(52% 68% at 18% 0%,  color-mix(in srgb, var(--cat) 22%, transparent), transparent 70%),
    radial-gradient(46% 60% at 82% 12%, color-mix(in srgb, var(--cat) 10%, transparent), transparent 72%);
}
.entry-band::after {  /* 颗粒层(现值 global.css:1140-1148) */
  content: ""; position: absolute; inset: 0; opacity: 0.04; pointer-events: none;
  background-image: url("data:image/svg+xml,...");  /* feTurbulence 0.65/3 噪点 svg */
}
```

**栅格图片纪律**(02 §4.4 / 01 §3.3):暗色下浅底截图/图片统一 `filter: brightness(.85)`(TDesign 官网全局规则)或 Apple 建议 .92,防止暗页发光;本站 demo 全部为可运行 CSS,仅外链截图素材适用。

### 2.2 字号:流式字阶(clamp,本站吃自己的 dogfood)

生成公式即本站条目 `src/content/entries/type/fluid-type-scale/zh.mdx` 的 Utopia 法:斜率 =(max−min)÷(maxVw−minVw),视口区间 **360→1280px**(1280 = `--shell-max`),精度 4 位。下表全部经脚本实算(本次会话复跑通过),360px 精确落 min、1280px 精确落 max:

| token | clamp 值 | 用途 | 行高 | 字距 |
|---|---|---|---|---|
| `--step--1` | `clamp(12px, 11.609px + 0.109vw, 13px)` | caption/meta/chip | 1.45 | +0.01em |
| `--step-0` | `clamp(15px, 14.609px + 0.109vw, 16px)` | 正文 | 1.65 | 0 |
| `--step-1` | `clamp(18px, 17.217px + 0.217vw, 20px)` | lead、面板标题 | 1.5 | 0 |
| `--step-2` | `clamp(21px, 19.826px + 0.326vw, 24px)` | h3、卡片大字 | 1.35 | −0.01em |
| `--step-3` | `clamp(25px, 23.043px + 0.543vw, 30px)` | h2、区块标题 | 1.25 | −0.015em |
| `--step-4` | `clamp(30px, 26.870px + 0.870vw, 38px)` | 条目页 h1 | 1.2 | −0.02em |
| `--step-5` | `clamp(35px, 29.913px + 1.413vw, 48px)` | 首页 hero | 1.12 | −0.02em |

行高随字号减小放宽(1.12→1.65)、字距随字号增大收紧,曲线锚点取自 Apple 官方 tracking 曲线(01 §2.2:17pt 最紧 −0.026em,12pt 归 0,80pt 以上归零)。**行高的第二把尺子**(02 §2.3 TDesign 官方公式):`line-height = font-size + 8`——常数 8 使 16px→24px(1.5)与 14px→22px(≈1.57)恰好与本站中段行高重合,大字号端本站取 1.12–1.2(比 TDesign 的 72/64=1.125 更激进的收紧),两公式互为校验,本站维持比例制(与 clamp 流式字号配套)。

**对 CJK 的本地化偏离**:中文正文字距取 0 而非 SF Pro 的 −0.022em——CJK 字面已满 em 格,负字距伤害中文可读性;负字距只用于 ≥21px 的标题。

字族维持 `Base.astro:2-5` 已装的 Inter Variable + Noto Sans SC(400/500/700)+ JetBrains Mono——不引入 SF Pro(许可与跨平台一致性),Display/Text 双字族换挡(01 §2.3)由字距曲线代偿。**04 的三声部预算(sans 85 / serif 10 / mono 5)**:本站取 sans + mono 双声部(mono 只用于数值/计数/快捷键,见 §6-16);衬线声部克制不跟(理由 §6b)。

**字重**:全站只用 400 / 500 / 600。04 §3.2 建议可变字体中间字重 450 用于正文——**不采纳**,理由:TDesign 只留 400/600 两档的官方理由是 Windows 下 <600 全部回退常规体(02 §2.4),中间档跨端不可靠;本站面板层次已由「同尺寸异字重」(参数名 600 vs 参数值 400,同为 13px)承担。

**mono 元数据纪律**(04 §3.1/§3.3 Awwwards 卡片工艺):一切「可数的元数据」(条目数、过滤计数、版本号、星级)用 mono + `font-variant-numeric: tabular-nums` + 大写小标 `letter-spacing 0.08em`(现值 `global.css:419-426` `.section-title`),字号 12–13px(`--step--1`)、字重 500–600;与 display 的负字距形成「一紧一松」节拍。

### 2.3 间距:4/8 网格

```css
--space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
--space-5: 20px; --space-6: 24px;  --space-8: 32px; --space-10: 40px;
--space-12: 48px; --space-16: 64px;
```

规则(← Apple Layout:"间距必须出自 token 表"+组间:组内 = 2:1):组间 `--space-6`(24),组内 `--space-3`(12);卡片内边距 `--space-5` 20(卡)/`--space-4` 16(面板,与 02 §6.5 TDesign Card `16px 24px` 同档);章节垂直节奏 `--space-12` 48;移动端 shell 左右内边距 16px(桌面 24px,现值 `global.css:104/398`)。**禁止**任何非 4 倍数的 padding/margin 字面值。对照:02 §3.1 TDesign 用 2px 起步的显式偶数枚举(16 档),本站取 4px 步进 11 档——刻度更少更可预测,是同一克制原则的更紧实现。

### 2.4 圆角阶梯(4 级 + 胶囊)

```css
--radius-s: 6px;    /* chip 内嵌、小控件(= TDesign medium 6px,02 §3.4) */
--radius-m: 10px;   /* 按钮、seg、代码块(TDesign 按钮 3px 更硬,本站取 10:工作台观感) */
--radius-l: 14px;   /* 卡片、面板(workbench 双栏) */
--radius-xl: 20px;  /* bento 格、demo 舞台(bento 条目:20–28px,标志值 24;本站密度取下限 20;
                      glassmorphism 条目同值 20,<16 即风格失效线) */
--radius-pill: 999px; /* chip、badge、reset 按钮 */
```

同心规则(← Apple Liquid Glass:控件圆角与容器圆角同心,glassmorphism 条目原文):嵌套块的圆角 = 外层 − `--space-2`(8px),演示台(20)内的卡片(12≈20−8)遵循。对照:02 §3.4 TDesign 7 档(2/3/6/9/12/999/50%),本站 5 档——决策:档位少,档差大(6→10→14→20 等差 4~6px),识别度更高。

### 2.5 阴影阶梯(≤3 级)

暗色下深度**优先用提亮**(§2.1 分层;02 §4.4:TDesign 官网暗色边界全部改 1px inset 描边、阴影只在悬浮层保留——本站 1px `--border` 即等价工艺),阴影只做悬浮暗示,全部纯黑低透明度:

```css
--shadow-1: 0 2px 8px rgb(0 0 0 / 0.35);    /* hover 抬升的卡片 */
--shadow-2: 0 8px 24px rgb(0 0 0 / 0.45);   /* 下拉、popover、sticky 过滤栏激活后 */
--shadow-3: 0 16px 48px rgb(0 0 0 / 0.55);  /* 模态(本站目前无模态,保留位) */
```

对照:02 §4.1 TDesign 三层投影是 2–3 组阴影叠加的物理光模型(亮色 `0 1px 10px 5% + 0 4px 5px 8% + 0 2px 4px -1px 12%`),03 §1.5 Arco 四级制同一公式按 2/4/8px 偏移递进;本站取单层三档——理由:暗色阴影可见度低,多层拟合的收益集中在亮色主题,层级表达已由明度台阶承担,不复制复杂度。玻璃带阴影禁止与 blur 叠加在同一会变化的元素上做动画(只动画 transform/opacity)。**v2.1**:浅色主题下三档整体减弱为 `0 2px 8px rgb(28 39 58 / .08)` / `0 8px 24px .12` / `0 16px 48px .16`(02 §4.1 亮色 5–12% 黑同档;浅色阴影可见度高于暗色,减淡防脏),逐值见 §2.1 浅色表。

### 2.6 动效 token:时长 × 缓动配对(M3 官方档位 + HIG 感知时长)

配对表采用 M3 官方「easing × duration」建议,出入不对称(进入比退出长);**三家对照**:TDesign 桌面档 200/240/280ms(公式:桌面 = 移动 ×2,合理区间 200–600ms,02 §5.1)、Arco 0.1–0.5s 六档 + 5 条命名缓动(03 §1.5)、HIG spring 感知时长 0.5s(01 §4.2)——本站 150–500ms 档位落在三家交集内:

| token | 值 | × 缓动 | 用途(唯一清单外动效禁止) |
|---|---|---|---|
| `--dur-1` | 150ms | `--ease-standard` | 按压/枚举切换/焦点(M3 short3;HIG 反馈"简短精确") |
| `--dur-2` | 200ms | `--ease-accel`(退出)/ `--ease-standard` | 退出屏幕、选择控件、chevron 旋转(M3 short4 官方指定给 selection controls;= TDesign `@anim-duration-base` 0.2s) |
| `--dur-3` | 300ms | `--ease-decel`(进入) | 屏内过渡:Tabs 面板、Accordion 展合、过滤显隐(= Motion tween 默认 0.3s,04 §4.3) |
| `--dur-4` | 500ms | `--ease-decel` 或弹簧 | 大区块入场、视图过渡(M3 emphasized 500;Apple spring 感知时长 0.5s) |
| `--stagger` | 60ms | — | 入场逐项错峰(Apple 实测 150ms,本站卡片更小取 60;bento 条目经验 40ms 之间) |
| `--stagger-shift` | 24px | — | 入场位移(Apple 30px,取 4/8 网格值 24) |

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);       /* M3 standard 官方值
  (TDesign standard = (0.38,0,0.24,1),03/02 佐证「画面内运动」曲线族,本站取 M3) */
--ease-decel:    cubic-bezier(0.05, 0.7, 0.1, 1);  /* M3 emphasized-decelerate 官方值
  (入画;TDesign ease-out = (0,0,0.15,1) 同族) */
--ease-accel:    cubic-bezier(0.3, 0, 0.8, 0.15);  /* M3 emphasized-accelerate 官方值(出画) */
--ease-spring:   cubic-bezier(0.34, 1.3, 0.64, 1); /* 轻回弹(推导值:y>1 合法,MDN;同族对照:
  Arco overshoot = (0.3,1.3,0.3,1)、Semi toast = (.22,.57,.02,1.2);真弹簧用 linear() 采样,
  dogfood motion/linear-easing 条目;JS 驱动的弹簧统一 Motion 官方默认 bounce 0.25 / damping 10,
  04 §4.3) */
```

标注:`--ease-spring` 是推导值非官方;HIG 原则「让人可以取消动效」= 任何可交互动效在新输入到来时直接跳终态(transition 打断即天然满足,JS 动画需手动 cancel)。Semi 的「动效 token 默认全 0ms、开启才有时长」(03 §3)是 §8 全局 RM 降级的理论原型。

**预留语义(v2.6 新增;09 §5.3 场景档位,启用前先锁名,启用时不再新造 token)**:

```css
--ease-card-spring: var(--ease-spring); /* 卡槽弹簧 = snappy 语义档(0.5s / bounce 0.15,09 §5.3:
  卡片/面板位移、抽屉推荐档);真弹簧用 linear() 采样(dogfood motion/linear-easing 条目,09 §9.3) */
--dur-overlay-in: var(--dur-3); /* 浮层/面板入场 = --dur-3 × --ease-decel(09 §6:apple.com
  浮层/帘幕 320ms cubic-bezier(0.4,0,0.6,1),本站取最近既有档 --dur-3 300ms × decel) */
```

材质层动效衔接纪律(§2.8):backdrop-filter/blur 本体**不参与过渡动画**(05 §5 性能红线「只动 transform/opacity/box-shadow」);材质状态切换(过滤栏玻璃化、面板出离视口等)只过渡 `background-color / border-color / box-shadow`,配 `--dur-2 × --ease-standard`。

### 2.7 z-index

```css
--z-content: 0;      /* 文档流 */
--z-stage: 1;        /* demo 舞台内的聚光/光标层 */
--z-panel: 10;       /* sticky 参数面板(不与其他层重叠,仅防御) */
--z-filter: 20;      /* sticky 过滤栏 */
--z-header: 50;      /* 站点 header(现值,global.css:287) */
--z-popover: 60;     /* tooltip/dropdown(预留) */
--z-toast: 70;       /* 复制成功等轻提示(预留) */
--z-modal: 80;       /* 模态(预留) */
--z-skip: 100;       /* 跳转链接 */
```

对照(扩展预案,当前不启用):02 §4.3 TDesign 按遮挡关系定距(dialog 2500 → popup 5500,popup 是 dialog 内部元素必须压过一切 dialog);03 §2.3 Semi modal 1000/toast 1010/popover 1030/dropdown 1050/tooltip 1060/image-preview 1070/拖拽 2000。本站无模态/弹层层叠场景,小阶梯够用;若未来加 modal,按 TDesign 原则**重排整表**而非插值。

### 2.8 材质层(v2.6 新增;统一参数表:颜色层级/透明度/模糊/内高光/细边框/阴影/焦点环 × 深浅两态 × 三档)

「参考 Apple」的落地不是文案,是**可验证的参数化材质层**。全部数值溯源 `out/design-study/09-apple-materials.md`(下称 09);官方未公布的量级如实标注为推导/未证实。

**① 三档材质 token(实现 = `global.css` §1 token 组 + §1c `.material` 工具类)**

| 档 | blur | saturate | 叠色 tint(深) | 叠色 tint(浅) | 内高光(深) | 内高光(浅) | 细边框 hairline | 阴影 |
|---|---|---|---|---|---|---|---|---|
| `--mat-thin-*` | 12px | 180% | `rgba(22,22,23,.55)` | `rgba(250,250,252,.6)` | 白 `.08` | 白 `.3` | separator α | none |
| `--mat-regular-*` | 20px | 180% | `rgba(22,22,23,.8)` | `rgba(250,250,252,.8)` | 白 `.11` | 白 `.35` | separator α | `--shadow-1` |
| `--mat-thick-*` | 28px | 180% | `rgba(22,22,23,.88)` | `rgba(250,250,252,.92)` | 白 `.14` | 白 `.4` | separator α | `--shadow-2` |

另有 `--mat-fallback`(深 `var(--surface)` / 浅 `var(--surface)` 实底)与 `--mat-hairline`(引用 `--ios-separator`,随主题)。溯源与未证实标注:

- **blur 基准 = apple.com localnav 生产 CSS** `backdrop-filter: saturate(180%) blur(20px)`(09 §1.4a,官方 CSS 实抓)→ `--mat-regular-blur 20px`。iOS 四档各自的模糊半径官方从未公布(09 ⚠️未证实)→ thin/thick 取基准 ±8px 的站点推导阶梯(12/28),用途按 09 §1.2 官方语义选档,不按观感选档。
- **tint 基色 = apple.com 官方 scrim 色板**(09 §1.4b):浅 `rgb(250,250,252)` / 深 `rgb(22,22,23)`;α 档位——regular `0.8` = 官方「常规玻璃」档,**thick `0.88/0.92` = 官方「吸顶」档(深 .88 / 浅 .92 逐字)**,thin(0.55/0.6)为站点推导更透档(对应 09 §1.2 thin「弥散+轻微压暗」语义)。深浅按 Apple 方式区分 = **基色换、结构不换**(同一 α 体系,浅色近白、深色近黑)。
- **内高光(顶缘受光)= 09 §1.4d web 复刻惯例**(亮 `.25–.4` / 暗 `.08–.15`;具体强度官方未公布 ⚠️未证实,本站取档内三点 .08/.11/.14 与 .3/.35/.4),实现为 `box-shadow: inset 0 1px 0` 顶缘 1px 受光(lensing 定性依据 09 §8-1)。
- **hairline = 官方 separator α 色**(09 §1.4e/§2.4):深 `rgba(84,84,88,.6)` / 浅 `rgba(60,60,67,.29)`,三档统一——官方对 hairline 线宽/颜色无公开数值,「把 separator 色作玻璃 hairline 基色」是 09 给出的符合系统语感的做法;线宽恒 1px。
- **阴影**挂既有 §2.5 三档(thin 不投影 / regular `--shadow-1` / thick `--shadow-2`),材质自身不新造阴影值;`inset 高光 + 外阴影` 同一条 box-shadow 声明承载。
- **能力门控**:`@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` 内才写 `backdrop-filter + tint`(09 §1.4a apple.com `@supports(backdrop-filter: initial)` 同法);门控外回退 `--mat-fallback` 实底 + hairline + 内高光——层次不塌方,可读性不受损。
- **性能红线**:backdrop-filter 是静态材质属性,**不参与 transition/animation**(05 §5);材质状态切换只过渡 `background-color/border-color/box-shadow`(`--dur-2 × --ease-standard`)。

**② 工具类(§1c)**:`.material`(默认 = regular 档,Apple「regular 为默认」09 §1.2)、`.material--thin`、`.material--thick`——通过覆写组件级 `--mat-blur/--mat-tint/--mat-highlight/--mat-shadow` 四个内部变量换档,档位可整体套用,也可按语义混搭单参数(见下表过滤栏吸顶态 = regular blur × thick tint)。

**③ 五面语义接入(全站材质消费清单;其余区域禁用 backdrop-filter)**

| 面 | 档位组合 | 语义依据(09) |
|---|---|---|
| 站点 header(sticky 带 1) | mat-regular 全套(20px + tint .8 + 内高光 + hairline) | apple.com localnav 即此配方(09 §1.4a/b 官方值逐字) |
| 列表页过滤栏(sticky 带 2,`.is-glass` 吸顶态) | **regular blur × thick tint** = Apple 三态公式第 2 态「吸顶」(blur 不变、tint α 上浮 8 个百分点)+ `--shadow-2` | 09 §1.4b 三态配方:常规 .8 → 吸顶 .92/.88 → 展开实色;本站用前两态 |
| 参数面板(仪表台,sticky) | mat-thick 全套(28px + tint .88/.92 + 内高光 .14/.4 + hairline + `--shadow-2`) | 09 §1.2 官方:「更厚的材质更不透明,对细笔画文本对比更好」——12–13px mono 密集数值取最厚档 |
| 演示面板(workbench 左) | mat-regular 全套 | Apple overlay 默认档(09 §1.2「regular(默认)」);舞台内容自绘不受影响 |
| Prompt 导出框(`.prompt-box`) | mat-regular 全套 | 同上;代码块本体 `--bg-elev` 不透明,可读性不受影响 |

克制纪律(与 v2.1 一脉相承):仍**禁止**把玻璃铺进 hero/bento/卡片网格/MDX 正文(04 §2.3「玻璃退潮」+ NN/g 可用性结论);材质只给「功能层」(导航带 + 工作台面板),不给内容装饰。行内分隔线(`.param-row`、`.demo-panel-head`、面板边框)同步换用 separator α 色(09 §2.4「允许底层内容透出」的语义)。

**④ 按压对(Apple highlighted 语义,09 §4)**:全站按钮(主 `btn-primary` / 次 `btn-ghost` / chip `fchip`/`lang-switch`/`theme-toggle`/`hero-open`/`param-reset`/`cc-toggle` / seg / enum-seg / bd-tab)按压态统一 = `transform: scale(var(--press-scale))` + alpha 状态层(`--fill-2` 底;btn-primary 为 accent 加深变体)——`UIControl.isHighlighted`「自动随 touch 事件设置与清除」的成对语义(`:active` 进入、释放/移出退出,09 §4 官方);`scale 0.96` 取 09 §4 M1 引用的社区通行量级(**官方未公布 ⚠️未证实,如实标注**);apple.com `:active` = 只换底色不加 outline(09 §4 官方 CSS 实抓)→ 本站按压不新增 outline。容器级卡片(entry-card/bento-cell)保持 `scale(0.99)` 轻压(控件 0.96 / 容器 0.99 两级)。RM 下全部 `transform: none` 直达终态、色彩反馈保留(`global.css` §9)。

**⑤ 焦点环(全站统一,09 §3 apple.com 生产 CSS 逐字规格)**:2px `--focus-ring-color`(= accent)+ `outline-offset: var(--focus-ring-offset) = 1px` + `border-radius: inherit`(现代浏览器 outline 跟随圆角);容器级元素(entry-card/bento-cell)offset 3px(`--focus-ring-offset-container`,apple.com `--sk-focus-offset-container` 同值);v2.5 前的 offset 2px 为非官方值,已统一。详见 §8。

**⑥ 与既有层次体系的关系**:材质层是**第五个背景层级**(bg → bg-elev → surface → surface-2 → 材质面)的「透」变体——同一语义面板既可用实底(surface)也可用材质面(同族 α tint + blur),切换不改变层级次序;12 对 AA 配对全部建立在实底 token 上,材质 α 合成后的面板底色与实底 luminance 差 <3%(深色 tint .8 压 `--bg` ≈ rgb(20,20,21) vs `--surface` #161b23;浅色 .92 压 `--bg` ≈ rgb(249,250,251) vs #fff),文本对比度不受实质影响。

---

## 3. 组件规范(结构与状态)

统一状态集:每个交互组件必须实现 `rest / hover / focus-visible / active / disabled` 五态;hover 只允许动 `border-color`、`background` 与 `transform`,时长 `--dur-1`;focus 统一 §8 的 ring;**active 按压对(v2.6)= `scale(var(--press-scale) /* 0.96 */)` + alpha 状态层(`--fill-2`;btn-primary 为 accent 加深变体)——Apple `UIControl.isHighlighted` 成对语义(09 §4),规格详见 §2.8-④;控件级 0.96、容器级卡片 0.99**。

**Card(`.entry-card` / `.bento-cell` / `.info-card`)**
- 结构:`<a class="entry-card">` = 标题(`--step-1`/600)→ tagline(`--step--1`/`--text-dim`,2 行截断)→ meta 行(Chip × 2);bento 变体见 §4.1。
- 状态:rest(surface+border)→ hover:`border-color:--border-strong` + `translateY(-2px)` + `--shadow-1`,`--dur-1`/`--ease-spring`(轻回弹,§6-5)→ active:`translateY(0) scale(0.99)`(claymorphism 条目的按压位移法,不用阴影动画)→ focus-visible:ring。hover 是可点击的承诺:不可点击卡(info-card)无 hover 态(bento 条目原文规则)。
- 规格对照(02 §6.5 TDesign Card):圆角 6px、内距 16/24、**默认有边框无阴影**(阴影/悬浮阴影是可选项)——本站一致(`--radius-l` 14 略大,卡片面积更大所致);03 §4.5 Arco 的「hover 抬升专用色」由本站 `--shadow-1` + `--border-strong` 承担。
- 网格:`repeat(auto-fill, minmax(300px, 1fr))` + `min-width:0`(360px 不溢出的前提)。
- 过渡钩子:卡片挂 `view-transition-name`(动态赋名 `card-<slug>`,§6-9)。

**Chip**
- 结构:inline-flex,`--step--1`(12px),`--radius-pill`,padding 2px 10px(现值 `global.css:907`);星级 Chip 内 `★` + `aria-label`(形状+文字双编码,颜色不唯一承载)。
- 状态:静态 Chip 无 hover;可点 Chip(fchip)hover 用 `--fill-1`;选中态 `--accent-dim` 底 + `--accent` 边 + `--text` 字。
- 对照(02 §6.2 TDesign Tag):medium 高 24 / padding 0 8 / 圆角 3px;CheckTag 选中 = 品牌色实底 + 白字。本站用胶囊圆角 + 描边选中(更轻),高度同为 ~24px;TDesign mark 形状的不对称圆角(`0 round round 0` 书签舌头)**不采纳**——本站 Chip 全部对称语义,无方向性场景(克制记录)。

**Segmented(`.seg`,现 `global.css:1054-1085` 骨架)**
- 结构:`role="group"` + 按钮组;容器 `--bg-elev` + border + `--radius-m` + padding 2px。
- 状态:选中 `aria-pressed="true"` → `--surface-2` 底 + `--text`;hover 只变色;按压 `--fill-2`。
- 升级点:选项间滑动指示块(background thumb 以 transform 过渡,`--dur-2`/`--ease-standard`;TDesign tabs 指示条即 `transform @anim-duration-moderate ease-out` 同手法,02 §6.3),键盘 Left/Right 移动(roving tabindex);触控目标 ≥44px(§7)。

**Tabs(MDX 四节的客户端分组容器,新增)**
- 结构:`role="tablist"` + `role="tab"`(带 `aria-selected`/`aria-controls`)+ `role="tabpanel"`(`aria-labelledby`);激活指示 = 2px 下边条(TDesign 官方 3px,02 §6.3;本站 tab 高度矮,取 2px 与 1px 边框体系更协调),`transform: translateX/scaleX` 过渡,指示条色用当前分类 accent。
- 生成方式:**构建时后处理**(EntryDetail 渲染 MDX 后,把 `.prose` 内每个 `h2` 及其后兄弟节点包成 panel)+ 客户端脚本管 tablist 交互;**86 个 MDX 零改动**;无 JS 时四节仍按文档流纵排(渐进增强)。
- 状态:激活 tab `--text` + 指示条;非激活 `--text-dim`;面板切换 `--dur-3`/`--ease-decel` 淡入(旧面板直接卸载,HIG"可中断")。键盘:Left/Right/Home/End + roving tabindex;Tab 键离开 tablist 直达面板内首个可聚焦元素。
- 规范顺序:结构与 DOM → 样式与参数 → 动效与交互 → 参数敏感度(与 MDX 四节一一对应,顺序即重要性降序,§1-2)。

**Accordion(条目页信息区唯一容器,新增)**
- 结构:原生 `<details>`/`<summary>` 基座(summary 内 Chevron + 标题 + 摘要),Semi Collapse 三要素映射:标题信息/折叠状态/展开内容;TDesign 默认 `expandOnRowClick: true`(整行可点,02 §6.4)——原生 details 天然满足。
- 展开动画:`grid-template-rows: 0fr→1fr` 包裹层(不测高度,`--dur-3`),reduced-motion 直开;Chevron rotate 180°(`--dur-2`)。
- **正文对齐缩进(02 §6.4 TDesign collapse 工艺)**:content `padding-left` = 面板内距 16 + 图标占位 24 = **40px**,展开正文与标题文字严格对齐;summary 是 44px 高触控目标;hover `--fill-1`;`::marker` 移除。
- 用法:条目页六张信息卡(场景/避免/a11y/浏览器支持/回退/来源)收为**一个** Accordion 的六个 item,全部默认收起;来源 item 默认且永久收起(每条来源一行截断 + 外链图标)。

**参数面板「仪表台」化(ParamPanel 改造方向)**
- 结构:三段式——①头部(标题 + Reset 胶囊钮)②控件区(逐参数行:名称行 [参数名 600 mono 13px] + [实时值 mono `--accent` tabular-nums] → 控件 → effect 说明 12px `--text-faint`)③Prompt 导出区(btn-primary 复制 + btn-ghost 查看 + `role="status"` 回执)。定位对齐 02 §7.6 TDesign theme-generator 的「token 即产品」:本面板就是访客手上的主题/配方编辑器。
- 仪表台细节:参数行之间 1px 分隔线;数值右侧对齐;滑杆按 §3「滑杆解剖」执行(8px 轨道 + 18px 拇指 + 44px 命中区 + 32px 数值输入框);行头增加迷你刻度条(当前值在 min–max 间的位置指示,纯 CSS 渐变背景实现);分组标题(几何/色彩/动效/阴影,`--step--1` 大写 + letter-spacing 0.08em,同 `.section-title`)。Oklch 四轴 L/C/H/α、Bezier SVG 编辑器(预设含 default 与站点 token 四系,见顶部摘要⑥)、逐层 Shadow 全部保留;色彩参数控件底部一排预设色板 swatch、oklch 行头部合成预览块 + 原生取色器桥接、hex 行文本输入(v2.6 增补,顶部摘要①②)。
- 状态:控件五态之外增加 dragging(拖拽中数值标签 `--fill-3` 底)与 dirty(参数偏离默认时值旁出现 2px 圆点,Reset 变 `--accent` 边,名称行出现 ↺ 单参数复位小钮——hover 显示、焦点常显、触屏恒显);数值输入框另有 pending/invalid/flash 三态(`data-*` 属性驱动,顶部摘要④)。
- 不做:不做面板级抽屉/浮层(面板整体常驻,渐进披露发生在它收纳的内容里);分组可折叠(v2.6 增补修订:原生 `<details>`、默认全展开、展合瞬时,§3 Accordion 同法);不加装饰动画(高频交互区,HIG 禁)。

**Slider(滑杆解剖,v2.2 新增;实现 = `global.css` `input[type="range"]` 体系)**

- 结构:原生 `<input type="range">` 全自绘(`appearance:none`,轨道/拇指伪元素两层);已填充断点由组件按 `(值−min)/(max−min)` 计算为 `--fill-percent` **内联注入**(ParamPanel 普通滑杆 / oklch 四轴 / shadow 层编辑器 + HeroGlassDemo hero 滑杆;React 渲染与 store 同步,Reset 等程序化改值不断链;未注入的调用方回退 `0%`),零运行时 JS 依赖。
- **轨道**:高 **8px**、全圆角(`--radius-pill`);已填充段 = `linear-gradient(90deg, var(--accent) var(--fill-percent), var(--fill-2) var(--fill-percent))` 双色硬断点,未填充段 `--fill-2`(Arco 暗色 fill 8% pressed/选中底语义,03 §1.4;浅色同 token 自动换值)。min/max 端点微标为**可选项,本期不做**(如实记录)。
- **拇指**:**18px** 圆形 = 5px `--accent` 边环 + 8px 白芯(白芯 `#fff` 为 TDesign/Arco 暗色滑杆惯例的两主题恒定值,类比 `--stage-glint` 的白色常量;其余全走语义 token);WebKit `margin-top:-5px` 居中。状态:rest → hover `scale(1.10)` + 4px `--accent-dim` 光晕 + 环提亮 `--accent-strong` → active `scale(0.95)`;focus-visible = 拇指双层焦点环(`box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)`,§8 双层 ring 处方)+ 元素级 outline(全局 `:focus-visible` 不覆盖不移除);过渡只动 transform/box-shadow/border-color,时长 `--dur-1`/`--ease-standard`(02 §5.1/§5.2:状态微反馈取短档 + standard 曲线)。
- **热区**:input 为替换元素、伪元素不渲染——热区实现为「元素高 **44px** + `margin-block:-6px`」:命中区 = 真实 44px 元素盒(整盒可点/可拖),布局占位 32px(§7「增加元素高度至 44」处方对输入框的等效实现,替代 chip 系的 `::after inset:-6px`)。
- **同组对齐**:数值输入框(`.param-num`)高 **32px**(02 §3.2 TDesign 默认控件高)、`--radius-s` 共享圆角、mono 12px 右对齐;`appearance:none` 去原生上下箭头(保留键盘步进与 scrub/滑杆等价路径)。
- **状态联动**:拖拽中(`:active`)值标签 `--fill-3` 底(`.param-row:has(input[type="range"]:active)`,纯 CSS);RM 下全局时长归零,拇指/按钮缩放 `transform:none` 直达终态、色彩反馈保留。
- 参考来源:02 §3.2(默认控件高 32)/ §3.4(圆角 medium 6px)/ §5.1(桌面 200ms 时长档)/ §5.2(standard 缓动);03 §1.4(fill 状态层语义)/ §1.5(0.2s 档);05 §5(只动 transform/box-shadow 的性能红线);本规范 §7(≥44px 触控)、§8(focus ring)。如实说明:02/03 两份研究**无 Slider 组件专门节**,本节数值由上述通用规格 + 本站 token 体系推导。

**Button**
- `btn-primary`:复制 Prompt 等主操作;`--accent-dim` 底 + `--accent` 边 + `--text` 字 600;hover 提亮(现值 `global.css:1494-1523`),active `translateY(1px)`;成功反馈 = 文案切换「已复制」+ `role="status"`(现 `PromptExport.tsx:75`)+ §6-18 微脉冲。
- `btn-ghost`:透明底 + border;hover `--border-strong` + `--text`。
- 尺寸:高 ≥44px 触控(§7),视觉高度可 36px + 伪元素扩热区。图标与文字间距 8px(02 §6.1 TDesign 恒定值)。
- focus-visible ring 全组件强制(§8)。

**Badge**
- 星级:★★☆ 形态,`--accent` 色 + `aria-label="参数化 2/3"`;计数:mono tabular-nums,`--text-faint`;系统徽:文字 Chip(§Chip)。
- 约束:badge 不承担唯一语义(数值旁必有文字),禁止用红绿区分成败(色盲不友好,成败一律文字+图标)。评估过 04 §1.4/§1.5 的 Awwwards 徽章/CSSDA 三维公开评分体系——不引入(单策展人站无 jury;星级 1–3 已是评分体系,理由详见 §6b)。

**继续深入卡(Go deeper,v2.3 新增;实现 = `EntryDetail.astro` `.go-deeper` aside + `src/data/resources.ts` `goDeeperLinks()`)**

- 定位:条目页信息 Accordion(§4.3-5)之后的收尾 aside 卡——「授人以渔」:把该条目所属体系的官方入口与本分类上手工具递到读者手上,尾部「全部资源 → / All resources →」回流资源页(§4.4)。不承担评分/推荐语义。
- 数据纪律:**按 system + category 静态映射,总数 ≤3 条**(`goDeeperLinks(system, category, sources)`;无新 collection、无运行时请求):先取体系官方入口(`SYSTEM_DOCS`:apple / m3 / fluent / web-std / component-lib,community 为空 → 该体系只剩分类工具),再按分类补上手工具(`CATEGORY_TOOLS`:六分类各 2 条),URL 去重、截到 3 条;**web-std 体系额外呈现 `schema.sources` 官方规范 URL**(取前 2 条与 MDN 并列,总数仍 ≤3)——web-std 条目的第一手来源即官方 spec,由卡直出。全部 URL 为既有调研逐字出现的一手地址,不编造。
- 结构:`<aside class="go-deeper">` = 标题(`--step-1`/600,zh「继续深入」/ en「Go deeper」)+ 提示行(`--step--1`/`--text-faint`,zh「该体系的官方入口与上手工具」)→ 链接列表(2–3 行,每行 = 文案(单行 ellipsis 截断)+ `↗` 箭头 `aria-hidden`)→ 尾部「全部资源 →」(`--accent`,hover `--accent-strong`)。
- 状态:**卡本身不可点击 → 无 hover 态**(§3 Card 纪律,info-card 同规);可交互的只有内部链接行——hover `--fill-1` 底 + 文字提亮至 `--text`,`--dur-1`/`--ease-standard`;链接行热区 ≥44px(`::after inset:-8px 0` 扩边,§7 处方);全部外链 `target="_blank" rel="noopener noreferrer"`(与 §4.4 外链规则同源)。
- 容器:`--surface` + 1px `--border` + `--radius-l`(§3 Card rest 态同款),max-width 720px 不铺满全宽(短清单密度纪律);链接文案单行截断(web-std 的 sources 完整 URL 可能较长)。
- RM:N/A(无动效依赖,仅 hover 色彩/底色 transition,由 §8 全局降级覆盖)。

---

## 4. 页面蓝图(五张)

### 4.1 首页(hero + 六分类 bento + 精选)

**桌面(≥900)**
1. **Hero**(≤55vh,反向 apple.com 的 100svh——本站 hero 不是产品图,信息密度优先;04 §3.1 的 hero display 上限 8rem **不跟**,理由:紧凑红线,`--step-5` 48px 封顶):`--step-5` 标题 + 一句副标 + **live 迷你演示**(§6-3:一颗真实运行的 glass 微卡 + 内嵌 1 个滑杆,直接复用 glassmorphism 条目的 Demo 组件与 store,右下角「进入条目 →」链接)。hero 即 dogfood。
2. **六分类 bento 网格**(dogfood `styles/bento-grid` 条目):4 列 × `auto-rows 140px` × gap `--space-4`(16)× `--radius-xl`;显式 areas(不用 `grid-auto-flow: dense`——DOM 顺序=阅读顺序,bento 条目明载的 WCAG 2.4.3 陷阱):styles 占 2×2 hero 格(条目最多),materials/motion 各 1×2 tall,color/type/layout 各 1×1(+1 info 格);每格:分类色标识条(3px 左边条)+ 分类名(`--step-2`)+ 条目数(count-up,§6-8;httpster「标签计数」工艺的落点,04 §1.6)+ 静态微缩预览(该分类代表效果的一帧 CSS,零 JS,现值 `global.css:724-814`)。
3. **精选(★3)条目行**:3 列 EntryCard,StaggeredFadeIn 入场(§6-4);hover 触发 border-beam 流光(§6-10,渐变预算只给这 3–6 张卡)。
4. 行为:header 恒在;hero 滚过即淡出其 live 演示交互(`Base.astro:122-132` inert 切换已实现,防双滑杆焦点混乱)。

**移动(<640)**
1. hero 压缩为「标题 + 副标 + 静态微缩预览一帧」(live 演示降级为链接进入条目页,移动端首屏留给分类;`global.css:578-589` 已实现);2. bento 全部重置 span 单列纵排(hero 格 2 行保留,层级靠行高不靠 span 重排,bento 条目移动端处方);3. 精选单列;4. header 六分类变横向滑动条(§7,`global.css:355-371` 已实现)。

### 4.2 列表页(sticky 过滤栏 + 卡片网格)

**桌面**:页头(分类名 `--step-4` + 计数)→ **sticky 过滤栏**(top = header 高 60px;滚过 8px 后加玻璃底 `--glass-*` + `--shadow-1`,IntersectionObserver 哨兵实现,`FilterBar.tsx:72-81` 已实现,§6-11)→ 结果计数行(aria-live,`FilterBar.tsx:144` 已实现)→ EntryCard 网格 3 列(1280 宽 ÷300px min)→ 空态文案。FilterBar 骨架与显隐逻辑保留(现 `FilterBar.tsx:50-69` 直接改卡片 display,零重排);升级:① 过滤切换时网格对剩余卡做 120ms 淡入(只 opacity,`global.css:272-279` 已实现);② 过滤 chip 显示各体系收录计数(httpster 工艺,§6-15);③ 卡片赋 `view-transition-name` 后,同文档过滤重排可包 `document.startViewTransition` 获得位置插值(04 §4.2)——列为可选增强,默认 120ms 淡入已满足。

**移动**:过滤栏收为两行分组(体系/星级各一行,横向可滚动的 Chip 列,不换页);卡片单列;sticky 栏占用高度 ≤104px,防止吃掉首屏。

### 4.3 条目页(重点重构蓝图)

自上而下(桌面):

1. **紧凑头(≤160px 高)**:面包屑(13px,当前分类着分类色)→ h1 `--step-4`(name)→ 一行 aliases(`--step--1` `--text-faint`,中点分隔)→ tagline 一行截断(`--step-0` `--text-dim`)→ chips 行(系统徽 + 星级)。现 `EntryDetail.astro:50-67` 的四行 entry-sub 收敛:origin 行**移出头部**,并入信息 Accordion 的「来源」item(§4.3-5)。
2. **accent 渐变带**:头部区块背后 §2.1 的 `.entry-band`(分类色 22%/10% 双 radial + 4% 颗粒),静态,绝对定位于头部+z 后景,不独立占高(现值 `global.css:1124-1148`)。
3. **Workbench(首屏主角)**:`grid-template-columns: minmax(0,1fr) 340px`(现值保留 `global.css:1150-1161`);左 demo-panel(头部行 + 演示台 320px,舞台自带光标聚光钩子 §6-1)+ 右仪表台化 ParamPanel(sticky top 76px,现值保留)。面板底部接 Prompt 导出。
4. **MDX 四节 → Tabs**(§3 Tabs 规范;构建时 DOM 分组,86 个 MDX 零改动;无 JS 降级为纵排)。
5. **信息 Accordion**:六卡(场景/避免/a11y/支持/回退/来源)单项默认全收;**来源 item 默认且永久收起**;正文 40px 对齐缩进(§3 Accordion)。
6. 行为:阅读进度发丝线(§6-19)只在 Tabs 以下区域出现;全部锚点进 header 的 localnav 变体?**不做**——单页锚点导航与 Tabs 重复,违反克制原则。

**移动(<640)行为**:紧凑头压至 ≤140px(tagline 与 aliases 合并行);demo 先行(舞台 min-height 240px),**ParamPanel 紧跟 demo 之下**(不 sticky,不做底部抽屉——抽屉藏面板违反「面板一步可达」;02 §7.3 的抽屉+9999px outline 遮罩工艺留档不用,本站无抽屉场景);Tabs 变横滑 tab 条;Accordion 全宽;360px 宽下所有 grid 子项 `min-width:0`,滑杆行允许换行(`flex-wrap`)。

### 4.4 资源导航页(/resources/ 与 /en/resources/,v2.3 新增)

「授人以渔」的落地页——条目扫盲之后的下一站。数据全部来自既有调研的一手来源(`src/data/resources.ts`:30 条 × 五组,逐条带真实 URL、来源注于文件头,不编造);中英两页共用同一骨架与样式,仅文案走 i18n(`src/i18n/ui.ts` `resources.*`)。自上而下:

1. **页头(复用列表页 `.list-head` 骨架,§4.2 同构)**:标题 `--step-4`(zh「深入学习的资源地图」/ en「A map for going deeper」)→ **mono 计数**行(`.list-count-num` = mono + `tabular-nums`,§2.2 mono 元数据纪律;当前 30)随计数单位「条资源 / resources」→ **定位语**(`.res-intro`,`--step-0`/`--text-dim`,max-width 72ch):一句话讲清「下一站」定位并预告「全部外链在新窗口打开」。页头下沿 3px 短条取 `--cat`,本页无分类语境、取 `:root` 默认 = `--accent`(不占用六分类语义)。
2. **五组卡片网格**:组序固定 `RESOURCE_GROUPS`(spec 官方设计规范 → lib 组件库 → tool 交互与动效工具 → gallery 灵感画廊 → docs 深学文档);组名 = `h2.section-title`(mono 大写小标 + letter-spacing 0.08em,§2.2 纪律),组间距 `--space-8`;组内沿用 `.entry-grid`(`repeat(auto-fill, minmax(300px, 1fr))`,§3 Card 同款网格)。
3. **卡片解剖(`.entry-card res-card`,整卡即外链,自上而下四行)**:① **name**(`--step-1`/600)+ **外链箭头 `↗`**(`aria-hidden`,与文案双编码,箭头不承载唯一语义);② **mono URL**(`--font-mono` + `--step--1`,单行 ellipsis 截断,`--text-faint`;hover 才点亮 `--accent`——accent 面积纪律 <5%,§2.1);③ **一句话价值**(`res-desc`,`--step--1`/`--text-dim`,中英各一句,写明「什么时候该用它」);④ tags(可选,静态 Chip,§3 Chip「静态无 hover」)。hover 沿用 §3 Card token(`--border-strong` + `translateY(-2px)` + `--shadow-1`,`--dur-1`/`--ease-spring`);卡挂 `reveal` 入场(`--i` 错峰,§6-4)。
4. **外链规则**:本页是全站唯一整页外链场景——所有资源卡一律 `target="_blank" rel="noopener noreferrer"`;条目页继续深入卡(§3)与首页尾部入口行同规。
5. **浅深两态**:卡片只用语义 token(`--surface`/`--border`/四级文本),无硬编码色——§2.1「语义层不变、值分主题」下两主题自动成立;hover 三轴(border/transform/阴影)两主题同构,浅色阴影走 §2.5 减弱值;mono URL 的 accent 点亮对底对比度深 8.71:1 / 浅 4.81:1,均过非文本 3:1(§8)。玻璃与渐变预算不进本页(§2.1:内容层禁用玻璃)。

**移动(<640)**:`auto-fill minmax(300px, 1fr)` 在 360px shell(内容 328px)下自然单列,不新增断点;mono URL 截断、tags 换行由 `min-width: 0` 兜底(§7 360px 红线)。

### 4.5 趋势追踪页(/trends/ 与 /en/trends/,v2.4 新增)

蓝图 V2 的「趋势追踪」落地——与常青条目**分离存储、口径强制标注**(§4.4 同构骨架,蓝图 V2 任务实现后由本文档回填)。数据单一来源 `src/data/trends.ts`(强类型 `direction: rising | cooling`;提炼自 `out/research/03-visual-style-trends.md` §二,8-10 条,逐条注明出处与口径)。自上而下:

1. **页头(§4.4 同构 `.list-head` 骨架)**:标题(zh「设计趋势追踪」/ en「Design Trend Tracker」)→ mono 计数 → **定位语 + 时点快照声明**(非实时数据;刷新方式与统计口径指向 `src/data/trends.ts`);页头下沿 3px 短条取 `--accent`。
2. **两组分区**:「正在兴起 ↑」与「正在退潮 ↓」,方向语义只用两处:组标题箭头 + 卡片方向 Chip(rising = `--ok`,cooling = `--warn`;不另造色)。
3. **卡片解剖(§4.4 资源卡同构,非外链)**:① 方向 Chip + **title**;② summary(一段,含具体数值如份额变化);③ **口径 note(mono,强制)**——份额类数据必须标注「单一 AI 设计工具的请求份额,非全市场采用率」类口径;④ **出处**(mono:research 文件 + 章节 + 外部 URL,若有);⑤ **站内条目互链**(relatedEntries,构建期对 slug 存在性自检,链到常青条目——趋势会过时,常青条目不会)。
4. **红线条目**:趋势内容与常青内容分离存储(`src/data/trends.ts` ≠ content collections);份额数据仅作单源证据时必须在卡片内标注口径;无实时抓取(刷新 = 重跑调研流程后更新数据文件)。
5. **浅深两态与移动**:同 §4.4(语义 token + `min-width: 0` 兜底);360px 单列。

**移动(<640)**:同 §4.4 网格行为,无新增断点。

---

## 5. 紧凑化红线(验收即测)

1. **首屏双要素**:条目页首屏必须同时可见「效果演示(≥240px 高的舞台)+ 参数面板(头部 + ≥1 个完整参数行)」;首页首屏必须同时可见「hero + bento 首行」;列表页首屏必须同时可见「过滤栏 + ≥1 行卡片」。桌面 1280×800 与移动 375×667 双档验收。
2. **1.5 屏原则**:单页主要区块在 **≤1.5 屏滚动内全部触达**;处于 Tabs/Accordion 收起态的内容不计展开高度。条目页预算(桌面 800px 视口):0–0.5 屏 = 头+渐变带+workbench 上半;0.5–1.0 屏 = workbench 下半+Prompt 导出;1.0–1.5 屏 = Tabs(收起态一栏 tab 条 + 激活面板首屏)+ Accordion 头部行 ×6。移动端放宽至 2.0 屏(面板紧随 demo 的代价),如实标注为已知豁免。
3. **不做的事**:不加整页骨架屏(内容静态生成,无加载态需求);不加回顶按钮(1.5 屏内无需);不加 cookie/公告条;首页不加「最新收录」marquee 横带(会挤爆 1.5 屏预算,§6b)。
4. 红线冲突时,砍装饰保功能:任何巧思(§6)实现导致首屏双要素或 1.5 屏被破坏,先删巧思。

---

## 6. 交互式设计与巧思清单(本次重心,19 条)

标注约定:「dogfood」= 直接复用本站内容条目(来源 `src/content/entries/...`);「概念呼应」= 借条目语义但非代码复用;RM = `prefers-reduced-motion` 降级;出处 = 五份设计研究的节号。

**A. 交互式设计(10 条)**

1. **演示台光标聚光**——`.demo-stage` 上叠加 pointer-tracked 径向光 `radial-gradient(240px at var(--mx) var(--my), accent 9%, transparent 70%)`(现值 `global.css:1185-1204`);升级路径:按 05 §1.1 react-bits SpotlightCard 的工程化细节实现 JS 侧——rAF 指数平滑 `follow = 1 − exp(−dt/(0.015 + smoothing×0.22))`、位移 <0.1px 即**停掉 rAF**(settle 即停)、IntersectionObserver 门控;可选叠聚光渐变作 mask 的颗粒层(05 §1.1 内置 data-URI 噪点)。04 §4.4 面积纪律:聚光只给 demo 舞台(工作台数据密集面板禁用)。落点:条目页 demo 舞台;dogfood:概念呼应 `materials/backdrop-filter` 与 `materials/blend-modes`(光源语义);RM:**已实现**静态均匀光降级(`global.css:1205-1214` 不追踪);JS 版沿用 react-bits 内建降级(follow=1 即指即现)。
2. **磁吸复制按钮**——btn-primary 在指针进入 padding 半径时向指针位移 ≤6px(05 §1.2 react-bits Magnet:吸力是**距离场** `pull = 1 − smoothstep(padding×0.5, padding, outside)`,半程全吸、边缘归零;弹簧 stiffness 170 / damping 16 / mass 1,04 §4.3 Motion 官方默认 bounce 0.25/damping 10 等价;`pointerType==='touch'` 自动跳过;多实例互斥仲裁;输出只有一条 transform,纯合成器路径)。只给每页一个最高频操作(复制 Prompt)。落点:条目页 Prompt 导出;dogfood:概念呼应 `motion/inertia-gesture`(手势基建);RM:禁用位移,保留 hover 变色(Magnet 内建降级:measure 恒零)。
3. **Hero 的 live 迷你演示**——首页 hero 内嵌一颗可调的玻璃微卡(真实 store + 真实 Demo 组件 `HeroGlassDemo.tsx`,一个 blur 滑杆),「图集自己活在首页」——即 03 §9-10 Semi「文档站即产品 demo / 主题变装橱窗」的单条目版;滚过即 inert(§4.1-4)。落点:首页;dogfood:`styles/glassmorphism`(**直接复用**其 demo 模块与 schema,`HomeView.astro:24-26`);RM:演示本身静态可看(滑杆仍可用——它是功能不是动效,不降级;只去掉入场动画)。
4. **滚动驱动入场(全站签名)**——区块进入视口时 `opacity 0→1 + translateY(24px)`,组内逐项 `--stagger` 60ms;优先 CSS `animation-timeline: view()` + `animation-range: entry 0% entry 100%`(05 §4.1 Chrome 官方 reveal 配方的区间修订,v2.6.1:卡片完全进入视口即到终态——原 `entry 25% cover 50%` 要卡片爬到视口垂直中线才完成,静止时下半屏同级卡停在半透明读作「禁用态」;04 §4.1「2026 滚动是导航不是叙事」的定位),不支持时 IntersectionObserver 回退(`Base.astro:70-99` + `global.css:214-246` 已实现能力二选一)。落点:首页 bento/精选、列表卡片、条目页 Tabs 区;dogfood:`motion/scroll-driven-animations` + `motion/stagger-orchestration`;RM:直出终态(opacity 1,无位移)——已落进 `global.css:1688-1693` 全局规则。
5. **Hover 物理回弹**——可点击卡片 hover `translateY(-2px)` + active 压回 `scale(0.99)`,缓动 `--ease-spring`(y>1 轻过冲;同族曲线:Arco overshoot `(0.3,1.3,0.3,1)`、Semi toast `(.22,.57,.02,1.2)`,03 §1.5/§3);落点:首页/列表 EntryCard、分类格(现值 `global.css:860-872`);dogfood:`motion/m3-spring-tokens` 与 `motion/swiftui-spring`(弹簧语义)、`styles/claymorphism`(按压位移而非阴影动画);RM:去掉 transform,保留 border/底色变化(`global.css:1680-1687` 已实现)。
6. **Tabs 指示条滑动 + 键盘微交互**——激活指示条 `translateX` 过渡(`--dur-2`,TDesign tabs 同手法 02 §6.3),方向键切换时指示条先行、面板 `--ease-decel` 300ms 淡入;roving tabindex + Home/End(§3 Tabs)。落点:条目页四节 Tabs;dogfood:`motion/cubic-bezier`(曲线选型即条目内容);RM:切换瞬时完成(保留 aria 状态更新)。
7. **参数值刮擦(scrub)**——在参数名标签上横向拖动 = 改值(Figma inspector 手势),Shift=细步进;指针捕获用 `setPointerCapture`(05 §1.2 同款手势基建;`ParamPanel.tsx:337-356` Bezier 手柄已是该模式的现成实现可参照);键盘等价:数值输入框方向键已实现(`ParamPanel.tsx:308-331` NumberBox/Bezier 键盘)。落点:条目页参数面板;dogfood:`motion/inertia-gesture`(手势基建);RM:不适用(功能性手势,非装饰动效,不降级;但必须保留滑杆/输入框等价路径)。
8. **Bento 计数 count-up**——分类格条目数从 0 滚到 N:**纯 CSS** `@property --num` + counter 配方(05 §4.2;现值 `global.css:249-269` + `Base.astro:101-120` 已实现,进视口触发一次),**aria 终值由 sr-only 直出**(读屏读到中间值是该方案已知缺陷,条目 `motion/count-up` 与 05 §1.5 CountUp 都明载)。对照裁决:05 §1.5 react-bits CountUp(里程表模式,RM 内建)与 Magic UI NumberTicker(spring 60/100,RM **无内建**)评估后**均不引入**——零 hydration 的 CSS 版已达标。落点:首页 bento;dogfood:`motion/count-up`(直接落地该条目);RM:直出终值(脚本 `Base.astro:75` 已判 reduce)。
9. **列表→条目 共享元素过渡**——MPA 跨文档视图过渡:`@view-transition { navigation: auto; }`(现值 `global.css:174-179`,已包在 no-preference 内)+ 卡片标题与条目 h1 同名 `view-transition-name`(**动态赋名 `card-<slug>` 防重名**,04 §4.2 Chrome 官方 morph 手法);同文档过滤重排可作为增强包 `document.startViewTransition`(§4.2)。仅 progressive enhancement,不支持浏览器直接跳转。落点:列表→条目;dogfood:`motion/view-transitions`(条目本身);RM:媒体查询内禁用该过渡(直切,已实现)。
10. **精选卡 border-beam 流光**——仅精选卡 hover 启动一道渐变光沿 1px 圆角边框环绕(周期 6s linear):纯 CSS 版(05 §2.1 给出的去 motion 等价实现)——轨道环用双层 mask 相减只剩 1px(`mask: linear-gradient(#000,#000) padding-box exclude, …`),光块 `offset-path: rect(0 auto auto 0 round 20px)` + `offset-distance 0%→100%`;多卡同屏用**负延迟错相位**(05 §2.1:首帧即在途,无空白起跑)。04 §4.7 面积纪律:渐变预算只给 <5% 的卡(首页 3–6 张精选),常态卡只用 1px `--border`。落点:首页精选行;dogfood:概念呼应 `materials/aurora-gradient`(渐变预算纪律)+ `motion/linear-easing`(线性时长档);RM:`animation: none; opacity: 0`(光束是装饰,直接关,05 §2.1 处方)。

**B. 静态 / 轻交互巧思(9 条,无动效依赖或单次触发)**

11. **过滤栏滚后玻璃化**——sticky 过滤栏初始透明,滚过哨兵后加 `--glass-*` 底+`--shadow-1`(apple.com localnav 两态的本地化,01 §4.3;`FilterBar.tsx:72-81` + `global.css:992-998` 已实现);落点:列表页;dogfood:`materials/backdrop-filter`;RM:状态切换瞬时(无过渡动画)。
12. **渐变带 + 颗粒的静态氛围**——条目头 accent 渐变带(§2.1),全部静态:NN/g 已判 Liquid Glass 全屏化为可用性事故、Apple iOS 27 主动回调透明度(04 §2.3 证据链),采纳「玻璃/氛围克制」结论的**静态版**;渐变只上头部不铺 hero(04 §2.3「渐变收缩」:全屏 aurora 已过峰值)。落点:条目页头部;dogfood:`materials/aurora-gradient` + `materials/grain-gradient`(配方来源,05 §4.3 同参数);RM:天然免疫(无动画)。
13. **「查看 Prompt」渐变长出展开**——prompt-pre 展开时在按钮栏与代码区之间插入 20px 高渐变过渡层(02 §7.2 TDesign td-doc-demo `::after` + `--bg-color-code-linear` 工艺:代码不是硬切,是从演示区渐显长出;代码底比容器深一档 = 本站 `--bg-elev` 双底色分层同源);落点:条目页 PromptExport(现 `PromptExport.tsx:72-77` 折叠骨架保留,补过渡层);dogfood:`materials/backdrop-filter` 无关,工艺出处 02;RM:展开瞬时(无过渡层动画)。
14. **Accordion 正文 40px 对齐缩进**——展开正文 `padding-left = 16 + 24 = 40px`,与标题文字严格对齐(TDesign collapse 官方规格:LR-l 16 + margin-xxl 24,02 §6.4);summary 整行可点(原生 details 天然满足 TDesign `expandOnRowClick: true`);落点:条目页信息 Accordion;dogfood:无直接条目(组件工艺);RM:N/A(静态排版)。
15. **过滤 chip 标签计数**——每个过滤 chip 显示该体系收录数(如 `CSS 原生 12`),让策展密度本身成为信息(httpster 侧栏计数工艺:Dark 259 / Minimal 847,04 §1.6);FilterBar 已按「只列实际存在的体系」防死过滤器(`FilterBar.tsx:35-38`),补计数即可;落点:列表页过滤栏 + 首页 bento 计数(同工艺);dogfood:无直接条目(策展工艺);RM:N/A。
16. **mono 角标编号美学**——所有可数元数据用 mono + tabular-nums + 大写小标:`bento-count-num`、`filter-count`、`hero-stat-num`(现值均已实现)+ 未来列表卡角标(形如 `★3 · MOTION · 12 PARAMS`,Awwwards 卡片工艺 `SOTD · NOV 20 · 7.3/10` 的本地化,04 §3.3/巧思6);落点:全站 meta;dogfood:`type/fluid-type-scale`(字阶纪律);RM:N/A。
17. **Bezier 预设幽灵预览**——hover 预设按钮时,曲线上叠一条虚线 ghost 曲线预览该预设,点击才提交;落点:参数面板 BezierControl;dogfood:`motion/cubic-bezier`(cubic-bezier.com 的 compare 思想);RM:ghost 直显/直隐。
18. **复制成功微脉冲**——btn-primary 成功后 `scale 1→1.04→1`(`--ease-spring` 200ms)+ 文案切换 + `role="status"`;一次即止(高频操作不做常驻动画);Semi toast 的「专属过冲曲线」思想(03 §3)在单发反馈上的最小版;落点:条目页;dogfood:`motion/count-up`(同样的「单次触发+读屏文本兜底」模式);RM:只切文案。
19. **阅读进度发丝线**——条目页顶部 2px 进度线,`transform: scaleX()` + `animation-timeline: scroll(root)`(05 §4.1 官方配方,合成器线程;注意 `animation-timeline` 必须写在 `animation` 简写之后、duration 写 `auto`);04 §4.1「滚动=导航」的定位;落点:条目页(Tabs 以下区域);dogfood:`motion/scroll-driven-animations`;RM:隐藏该线(装饰性,信息可由滚动条替代)。

---

## 6b. 趋势取舍(以 04 研究为主线,逐条裁决)

**采纳(落进 token 与蓝图)**:

| 趋势(04 出处) | 证据 | 落点 |
|---|---|---|
| 深底带 hue、禁纯黑(§2.2-1 Radix 12 步) | slate-1 `#111113` / mauve-1 `#121113`;灰要向品牌 hue 偏 | `--bg #0b0e13`(带蓝 hue);全站禁 `#000000` 作底 |
| 亮度台阶分层、卡比页底高 2 步(§2.2-2) | `#111113→#18191b→#212225→#272a2d→#2e3135` 每步 +2~3% | §2.1 四级背景;卡片 = surface 比页底高 ~2 档 |
| 软白文字、不用死白(§2.1/2.2-3) | Radix slate-12 `#edeef0`;Linear Mercury White `#F4F5F8`;Pantone 2026 Cloud Dancer(官方无 HEX,如实标注) | `--text #e9edf3`(本站软白,实测 16.45:1) |
| accent solid 面积 <5%(§2.2-5) | Radix:step9 是全 scale 彩度最高一步,只给按钮/徽章/焦点环 | §2.1 用法纪律;`--accent` 只给交互语义 |
| 全色系共享明度框架(Webflow 2026「Explosion of color」,§2.1) | 从单 accent 转向整套色系,但共享同一明度框架 | 六分类 accent 共享同一组背景(§2.1) |
| mono 三声部与排版节拍(§3.1/§3.3) | sans 85 / serif 10 / mono 5;小标签 12px/500/+0.05em 大写 | §2.2 mono 元数据纪律(本站 sans+mono 双声部) |
| 大 display 紧 tracking(§3.1) | `clamp(3.5rem,8vw,8rem)`/700/−0.03em/lh0.95 | §2.2 `--step-5` + −0.02em;**上限收在 48px**(理由:紧凑红线) |
| 滚动=导航而非叙事(Webflow 2026 原文 "This isn't about scrollytelling",§4.1) | 进度指示/步骤计数是 2026 主形态 | §6-19 进度发丝线 + §6-4 入场编排 |
| View Transitions(§4.2) | `view-transition-name: card-<id>` 重排自动插值 | §6-9;FilterBar 可选增强(§4.2) |
| 物理弹簧产品化(§4.3 Motion 默认) | spring bounce 0.25 / damping 10;tween 0.3s | `--ease-spring` 族对照;JS 弹簧统一该默认 |
| 光标聚光/磁吸已组件化、克制用(§4.4) | spotlight/磁吸只给 hero 与主 CTA,数据密集区慎用 | §6-1(仅 demo 舞台)、§6-2(仅复制钮) |
| Number Ticker(§4.5) | 统计数字滚动上数 | §6-8(取纯 CSS 版,零 hydration) |
| Border Beam 点睛(§4.7) | 渐变收缩为线;精选卡 6s 周期 | §6-10(只给首页精选卡) |
| 标签计数即信息(httpster,§1.6) | Dark 259 / Minimal 847 / Typographic 1193 | §6-15 过滤 chip 计数 + bento 计数 |
| 手挑画廊的过滤器规范(land-book,§1.3)+ Flow>Element 分类法(mobbin,§1.1) | Style 标签 + 排序信号;分类骨架 | 本站列表页过滤栏与条目分类体系 |

**克制地不跟(理由)**:

| 趋势(04 出处) | 不跟的理由 |
|---|---|
| 全屏 aurora/mesh 渐变 hero(§2.3/§4.8) | 渐变已收缩为「线/字/背光」三种受控形态;本站渐变预算只给条目头带(静态)+精选卡边光;hero ≤55vh 承载不下氛围层 |
| 跑马灯 marquee(§4.6) | 工作台内只可做「最新收录」横带,但首页 1.5 屏红线装不下;若未来加,抄 05 §2.2 接缝公式 `translateX(calc(-100% - var(--gap)))` + RM `play-state: paused` |
| 文字揭示 / 打字机 / blur 入场(§4.5/§4.8) | typewriter 长文案已过气;blur 滤镜 GPU 昂贵(05 §1.4 性能红线)且 BlurText 无 RM 内建需外包;本站文本是教学内容,逐词动画伤阅读 |
| 经典 parallax 叙事滚动(§4.8) | Webflow 明示 2025 叙事滚动 → 2026 导航滚动;与工作台气质冲突 |
| Brutalism(§4.8) | httpster 3116 站仅 5 例,已退潮;其「Visible Borders」元素已由本站 1px 边框体系承载 |
| 亮暗双主题开关(land-book/03 Semi always-dark) | **v2.1 翻案(用户裁决)**:v2.0 依 HIG 深色专属授权取「全站唯一主题」,现废止——双主题落地(§1-1/§2.1/§7),默认仍深色、浅色一等公民;本行保留为决策变更记录 |
| 衬线 display 回潮(Awwwards Fraunces/Canela,§3.3) | 中文站衬线 display 需整家族授权与加载成本;字阶三轴已承担识别;不引入第三字族 |
| 可变字体中间字重 450(§3.2) | TDesign 官方理由:Windows <600 全回退常规体(02 §2.4);本站 400/500/600 三档够用 |
| 三维评分/徽章体系(Awwwards/CSSDA,§1.4/§1.5) | 单策展人站无 jury;星级 1–3 已是评分体系;引入会稀释「参数化程度」这一唯一信号 |
| OG 图/视频二级库(godly,§1.2) | 本站内容是可运行 demo 而非截图——live demo 比二级截图库更彻底 |

## 6c. 移植清单(05 研究的 18 个片段逐条裁决)

许可速览(05 §0 实核):react-bits = **MIT + Commons Clause**(可复制进产品,禁单独出售/再分发组件本身);Magic UI = **MIT**;Aceternity = 免费组件 "Free for any React or Next.js project"(**无 OSI 许可,禁再分发源码包**);两库当前跑在 React 19 + motion v12,与本站 React 19 岛屿同构。三库都是 React/Tailwind 生态,本站是 Astro + 原生 CSS——**默认姿势是「抄实现思想、按本站 token 重写」,静态效果一律零 JS 化**(05 §5-1)。

| 片段(05 节号) | 裁决 | 落点 | 改写要点 | 许可注记 |
|---|---|---|---|---|
| SpotlightCard(§1.1) | ✅ 思想移植 | §6-1 demo 舞台聚光 | rAF 指数平滑 + settle 停帧 + IO 门控;CSS 钩子已就位(`global.css:1194`);聚光色换 `--accent`;grain mask 可选 | MIT+Commons Clause;不复制组件源码,按公式重写 |
| Magnet(§1.2) | ✅ 思想移植 | §6-2 磁吸复制钮 | 距离场 smoothstep + spring 170/16/1 + maxOffset + touch skip + 多实例互斥;全局 pointermove 单例共享 | MIT+Commons Clause;同上 |
| ClickSpark(§1.3) | ❌ 不移植 | — | 装饰性点击火花,与工作台气质冲突(原则 5) | 评估记录;其 RM 降级(原地淡出 320ms)思路留档 |
| BlurText(§1.4) | ❌ 不移植 | — | 无 RM 内建(05 明载)+ blur GPU 昂贵 + 首屏预算 | 评估记录 |
| CountUp(§1.5) | ❌ 不引入(已有等价) | — | 站内 `@property` 纯 CSS 版已实现且零 hydration;其「固定 1.2em 槽防 layout shift」手法已由 tabular-nums 承担 | 评估记录 |
| GlareHover(§1.6) | ❌ 不移植 | — | 与 §6-10 border-beam 职能重叠,光效二选一;rim glint(边框眨光 ×1.8)思想可并入 border-beam | 评估记录 |
| BorderBeam(§2.1) | ✅ 纯 CSS 版移植 | §6-10 精选卡 | 05 给出去 motion 等价 CSS:双层 mask 1px 环 + `offset-path: rect(0 auto auto 0 round 20px)` + 6s linear + 负延迟;RM `animation:none; opacity:0` | MIT |
| Marquee(§2.2) | ❌ 不移植(暂) | — | 1.5 屏红线;接缝公式留档 | MIT |
| AnimatedGradientText(§2.3) | ❌ 不移植 | — | 渐变字预算已给 entry-band;若用于 hero 词:首尾同色公式 + RM `animation:none` | MIT |
| DotPattern(§2.4) | ⏸ 预留 | demo 舞台底纹备选 | 静态版=内联 SVG `<pattern>` + `currentColor`,零 JS;glow 版需 hydration 且随机值放 `useEffect`(05 §5-3) | MIT |
| TextReveal(§2.5) | ❌ 不移植 | — | h-200vh 占滚动空间违反 1.5 屏;若做长文页可用 05 §4.1 scroll-driven 纯 CSS 替代 | MIT |
| NumberTicker(§2.6) | ❌ 不引入 | — | RM 无内建(05 明载),CSS 版已达标 | 评估记录 |
| Aceternity Spotlight(§3.1) | ❌ 不移植 | — | 151px 高斯模糊 SVG 首帧昂贵;hero ≤55vh 装不下光束层;无 OSI 许可 | 免费组件许可以官网现文为准;不复制源码 |
| CardHoverEffect(§3.2) | ❌ 不移植 | — | layoutId 需 motion 库;触屏无效需补 onTouchEnd(05 §3.2);其「exit 延迟 200ms 防闪烁」参数留档 | 免费组件;同上 |
| TextGenerateEffect(§3.3) | ❌ 不移植 | — | 挂载即播无 in-view、无 sr-only(05 明载两缺陷) | 评估记录 |
| Scroll-driven progress(§4.1) | ✅ 直接采用 | §6-19 发丝线 | `transform: scaleX`(禁 width);`animation-timeline` 写在 `animation` 之后、duration `auto` | 纯 CSS,无许可问题 |
| @property 数字滚动(§4.2) | ✅ 已实现 | §6-8 bento 计数 | `global.css:249-269`;aria 终值 sr-only 直出 | 纯 CSS |
| Grain(§4.3) | ✅ 已实现 | entry-band 颗粒层 | `global.css:1140-1148`;0.65/3 octaves;层 opacity 0.04–0.16;禁给 grain 层加 mix-blend 后再叠动画 | 纯 CSS |

**移植通用规则(05 §5 全文收口)**:① 静态效果不进岛屿(Marquee/渐变字/DotPattern/Spotlight 纯 CSS 版全可 `.astro` 手写);② 组件自带 in-view 触发时岛屿指令用 `client:load`,`client:visible` 会双重延迟;③ 随机值放 `useEffect` 防 SSR 不匹配;④ RM 三层策略(CSS 媒体查询 / JS matchMedia+change 监听 / 库内建——05 明载 react-bits 5/6 内建、Magic UI 与 Aceternity 全部需外包);⑤ 性能红线:只动 transform/opacity(filter blur 仅限短文本)、rAF settle 即停、passive 监听 + IO 门控、Canvas 用完即删、数字 `tabular-nums`/固定 em 槽防 layout shift。

---

## 7. 响应式矩阵

断点:`<640` / `640–900` / `≥900`(900 = 现 workbench 断点,`global.css:1157`;640 对应 bento 条目 2 列下限与手机横屏下限)。

| 页面 \ 断点 | ≥900 | 640–900 | <640 |
|---|---|---|---|
| **首页** | hero(≤55vh,live 演示)+ bento 4 列显式 areas + 精选 3 列 | hero 压缩 + bento 2 列(styles hero 格 2×2→2×1)+ 精选 2 列 | hero 静态微缩预览 + bento 1 列(span 全重置,层级靠行高)+ 精选 1 列 |
| **列表页** | sticky 玻璃过滤栏(单行两组)+ 卡片 3 列(auto-fill 300px) | 过滤栏两行(每组一行)+ 卡片 2 列 | 过滤栏两行、Chip 横向滑动条;卡片 1 列 |
| **条目页** | 紧凑头 → 渐变带 → workbench 双栏(demo 1fr + 面板 340px,面板 sticky)→ Tabs → Accordion | workbench 单栏:demo 全宽 → 面板紧随(不 sticky)→ Tabs → Accordion | 头 ≤140px;demo(min-height 240px)→ 面板紧随 → Tabs 横滑条 → Accordion 全宽 |

**360px 红线(无横向滚动)**:shell 左右 padding 16px → 内容 328px;所有 grid/flex 子项 `min-width: 0`;EntryCard 的 meta 行允许换行;header 六分类在 <640 变横向滑动容器(`overflow-x: auto`,滚动条隐藏,容器内滑动不产生页面级横向滚动,右缘渐隐 mask,现值 `global.css:355-371`);面板滑杆行 `flex-wrap: wrap`;filter Chip 行同理。验收命令级检查:`document.documentElement.scrollWidth <= window.innerWidth`(360×800 视口)。

**触控目标 ≥44px**:所有可交互元素(pointer)满足 44×44;视觉小于 44 的 chip/tab/pill 用伪元素扩热区(`::after { position:absolute; inset:-6px }`)或增加 padding 至高 44;`<summary>` 行高固定 44;滑杆 = 元素高 44px 整盒命中(替换元素伪元素不渲染,负 margin 对齐 32px 控件组,见 §3 滑杆解剖)。键盘与触控等价路径见 §8。

**主题切换(v2.1 §7 新增)**

- **位置**:站点 header,语言切换钮右侧(`Base.astro` `.site-header-inner` 内,`.lang-switch` 之后;`--header-h` 60px 玻璃带内,桌面/移动同位——移动端 header 依靠导航横滑腾位,36px 图标钮可容纳)。
- **结构与语义**:`<button type="button" class="theme-toggle" data-theme-toggle aria-label>`;`aria-label` 双语逐字「切换深浅主题」/「Switch color theme」;`aria-pressed` 表达**当前是否浅色**(true = 浅色);图标为内联 SVG(currentColor 描边,16px):**显示目标主题**——深色显太阳、浅色显月亮(由 `:root[data-theme="light"]` 作用域 CSS 换显,零 JS 参与)。
- **交互**:点击切换 `document.documentElement.dataset.theme`(dark ⇄ light)并写 `localStorage("atlas-theme")`;读写均 try/catch(file://、隐私模式降级为仅会话内生效)。无键盘新路径(原生 button,Enter/Space 天然可用)。
- **状态**:hover = `--fill-1` + `--border-strong` + `--text`;active = `--fill-2`;热区 ≥44px(`::after inset:-6px`,§7 处方);视觉 36×36 胶囊(与 `.lang-switch` 同族)。
- **持久化与默认**:键 `atlas-theme`,值仅 `dark`/`light`;无记录时跟随 `prefers-color-scheme`,**无偏好 = 深色**(默认深色 = §1-1)。
- **防闪烁**:`<head>` 内联一行脚本(BeforePaint,`is:inline` 同步执行、免打包):读 localStorage → 无记录跟系统 → **首帧前**设 `dataset.theme`。配套纪律:**CSS 不把 transition 挂在 body 背景/前景**(全局检查:body 仅 margin/background/color 字体属性,无 transition;组件级 transition 挂在各组件自身属性,继承不到根背景)——主题切换瞬时完成,不闪全页动画。
- **theme-color 双值**:`<meta name="theme-color">` 配两条带 `media` 的值(dark `#0b0e13` / light `#f3f5f8`);用户显式切换后,脚本把两条 meta 的 `content` 同步改写为当前主题值(浏览器 UI 跟随显式选择而非系统偏好)。
- **降级**:无 JS 时 BeforePaint 不执行 → 无 `data-theme` 属性 → `:root` 默认深色,内容完整;切换钮点击无效(渐进增强,同 §8「无 JS 内容完整可达」)。RM 不涉及(切换无动画依赖)。

---

## 8. 无障碍与动效红线

**对比度(全部实算,本次会话复跑通过,见 §0/附录)**:
- 文本 AA 底线 4.5:1:四级文本对 bg/surface 最低组合 = `--text-ghost` 3.74:1(仅禁用态,AA 豁免);其余三级最低 5.75:1 全过。正文级别(`--text-dim`)8.90:1,达到 Apple 7:1 追加目标(01 §3.3);`--text-faint` 6.43:1 仅用于 ≥12px 的 label/meta,不进长正文。对照:Radix 保证 step11 对同 scale step2 底 APCA Lc≥60、step12 Lc≥90(04 §2.2),本站 `--text-dim`/`--text` 承担同级语义。
- 非文本 3:1(WCAG 1.4.11)的诚实记录:`--border` 仅 1.50:1、`--border-strong` 1.93:1——**两者都不可作为控件边界的唯一识别依据**。规则:卡片边界同时由底色差(surface vs bg)承载;交互控件边界必须叠加状态色(`--accent` 边 8.71:1 / state layer / focus ring)之一。
- 六分类 accent 对全部三层背景 ≥4.76:1,可作文本色;红绿永不作唯一成败标识(§3 Badge)。
- 高对比扩展预案(01 §3.2 HIG Increase Contrast 变体,如 Blue #5CB8FF):v2.1 已建浅色全套主题(§2.1),高对比变体仍不在列;若做,只提亮/加深文本与 accent 两档,不动背景阶梯。

**Focus ring(全局强制;v2.6 起 = apple.com 生产 CSS 逐字规格,09 §3)**:
```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color); /* 2px × accent */
  outline-offset: var(--focus-ring-offset);                       /* 1px(apple.com :focus-visible 同值) */
  border-radius: inherit; /* 圆角跟随元素(outline 现代浏览器自动跟随) */
}
.entry-card:focus-visible,
.bento-cell:focus-visible {
  outline-offset: var(--focus-ring-offset-container); /* 容器级 3px(apple.com --sk-focus-offset-container) */
}
```
token 组(v2.6 新增):`--focus-ring-color: var(--accent)` / `--focus-ring-width: 2px` / `--focus-ring-offset: 1px` / `--focus-ring-offset-container: 3px`。v2.5 前的 `outline-offset: 2px` 为非官方取值,已按 09 §3 实抓的 apple.com 三份生产 CSS(`2px solid var(--sk-focus-color)` + `outline-offset: 1px` / 容器 3px / 小控件负偏移贴合)统一;macOS/iOS 原生焦点环像素值官方未公布(09 ⚠️未证实),本站以 Apple web 一手规格为准。组件内不得覆盖或移除;深色上 `--accent` 8.71:1、浅色上 4.81:1(§2.1),均满足非文本 3:1;双层 ring(外 accent 内 bg)用于滑杆拇指等与 accent 底重叠的场景(box-shadow 实现,不受 outline token 约束)。

**prefers-reduced-motion 全局降级**:保留全局规则(`global.css:1672-1679`:时长压至 0.01ms + 迭代 1 次)并补两条工程规则:① JS 动画(WAAPI/JS 驱动)必须 `matchMedia('(prefers-reduced-motion: reduce)')` + `change` 监听实时停起(`Base.astro:96-99` 已实现);② 新增装饰动效必须先在 §6 清单登记 RM 降级方案,无降级方案不合并。§6 每条已逐一给出 RM 行为。架构佐证:Semi 把「动效 token 默认 0ms」做成全局开关(03 §3),本站的等价物就是这条全局媒体查询。05 §5 的「RM 三层策略」(CSS/JS/库内建)是移植任何第三方片段的前置检查项。

**键盘与语义**:Tabs/Segmented roving tabindex + 方向键;Accordion 用原生 `<details>`(零 JS 也有键盘支持);过滤结果计数挂 `aria-live="polite"`(已实现 `FilterBar.tsx:144`);面包屑 `aria-label="breadcrumb"`(已实现 `EntryDetail.astro:42`);bento 不用 `grid-auto-flow: dense`(焦点顺序=阅读顺序);星级 Chip `aria-label`;滑杆/数值框双向绑定已实现(NumberBox 中间态保留,`ParamPanel.tsx:124-170`)。

**永不破坏的三条**:① 动效不是唯一信息通道(复制成功有文案+status);② 无 JS 时内容完整可达(Tabs/入场动画为渐进增强);③ 360px 无横向滚动 + 44px 触控是发布门禁。

---

## 附:验证记录

1. `python -I .scratch-design-study/check_tokens.py`(2026-11-21 本次会话复跑)→ 四级文本/强调色对比度(16.45/8.90/6.43 + 8.71)、边框 1.50/1.93、六分类 accent 对 bg 5.33–10.99 与对最浅背景 ≥4.76:1、七级 clamp 在 360px/1280px 精确命中端点。**通过**(与 v1.0 记录一致)。
2. `python -I .scratch-design-study/check_tokens2.py`(本次复跑)→ `--text-ghost` #6b7683 = 4.18:1(vs surface 3.74,禁用豁免档);`--ok` 10.72、`--warn` 11.34。**通过**。
3. 条目规模核验(本次实跑):`find src/content/entries -name "zh.mdx" | wc -l` = 43;`*.mdx` 总计 86(43 zh + 43 en);`Demo.tsx` 43 个;六分类 id 与 `src/lib/types.ts` CATEGORIES 一致;`styles/glassmorphism/demo/Demo.tsx` 存在(§6-3 hero dogfood 前提成立);§6 引用的 dogfood 条目(backdrop-filter、bento-grid、count-up、cubic-bezier、inertia-gesture、m3-spring-tokens、scroll-driven-animations、stagger-orchestration、swiftui-spring、view-transitions、linear-easing、aurora-gradient、grain-gradient、blend-modes、claymorphism、fluid-type-scale)逐一 `ls` 确认存在。
4. v2.1 浅色 token 校验:`python -I .scratch-design-study/check_tokens_light.py`(2026-11-21 实跑)→ 浅色文本四级对 bg/surface = 14.29/7.00/4.94/3.17 与 15.61/7.64/5.39/3.46(--text-dim 7:1 达成;ghost 为禁用豁免档);accent 4.81/5.26、accent-strong 7.21/7.88;ok/warn/danger = 4.89/5.04/4.83(vs bg);六分类 accent 对全部四层底 min 4.56–4.98:1;accent 边对 accent-dim 复合底 4.57:1。**全部通过**(文本用值 AA ≥4.5:1;Arco/TDesign 亮色原值不达 AA 处已加深并记录)。主题切换运行时行为(dataset.theme/localStorage/BeforePaint 防闪烁)无法由静态检查覆盖,如实标注:仅通过 astro check 的类型与语法校验,未做浏览器实机验证。
5. 未跑(如实标注):浏览器端 360px scrollWidth 实测、Lighthouse/axe 扫描、RM 下的实机走查——§7/§8 的命令级验收留给实现后执行。
5. 素材缺口:无——五份研究本次全部读取;04 研究自身标注的未核验项(Pantone HEX、Awwwards 四维权重、Coolors 趋势页、godly 逐作品共性)随其原文如实带档,不影响本规范的取值。
6. **v2.6 材质层校验(2026-11-22 本次会话实跑)**:
   - `node scripts/check-theme-contrast.mjs` → **12/12 配对达标,0 解析错误,exit 0**(材质层/中性阶梯 token 新增不影响 12 对 AA 配对;深色 16.45/14.71/8.90/7.96/6.43/8.71,浅色 14.29/15.61/7.00/7.64/4.94/4.81)。
   - `pnpm exec astro check` → **0 errors / 0 warnings / 1 hint**(hint 为 `PromptExport.tsx:76` `document.execCommand` 弃用提示,既有且本次未触碰该文件)。
   - `pnpm exec astro build` → **186 页构建成功**(15.78s)。
   - 深色主题目检(headless Chromium @ astro preview,截图逐张自查):① 首页 hero+bento——header 玻璃带(tint+blur)、细边 hairline 正常;② 条目页 workbench——demo-panel(mat-regular)与 param-panel(mat-thick)材质边框/顶缘内高光/行间 separator α 分隔线正常,computed style 实测 `rgba(22,22,23,.8/.88)` + `blur(20px/28px) saturate(1.8)` 与 §2.8 参数表逐值一致;③ 过滤栏停靠态(is-glass 手动置态)——computed `rgba(22,22,23,.88)` + `blur(20px) saturate(1.8)` + `rgba(84,84,88,.6)` 边 + 内高光+`--shadow-2`,卡片在玻璃后可见模糊;④ Prompt 导出框——「复制复刻 Prompt」文案逐字保留,材质正常(按钮文案为产物校验标记,未动);⑤ Tabs/Accordion/继续深入卡后段渲染正常;⑥ 浅色主题 spot-check——header/workbench 材质与可读性正常。**环境限制如实标注**:本 headless 会话 IntersectionObserver 回调不派发(探针实测 probeFired=false),`is-glass` 停靠态由手动加类验证——真实浏览器由 FilterBar 既有哨兵逻辑触发,该路径本次未改动;一张全黑截图经复测确认为 headless 合成瞬时伪影(布局与 computed style 均正确,复拍正常)。
   - **既有问题记录(非本次引入,留档)**:桌面 ≥900 视口下,sticky 参数面板停靠范围内 Prompt 导出框会被面板遮挡(WorkbenchPanel flex 列的既有几何:面板 pinned 高度恒覆盖 prompt 静态位置;本次任务不改布局,仅材质;移动 <900 面板 static 不受影响)。
