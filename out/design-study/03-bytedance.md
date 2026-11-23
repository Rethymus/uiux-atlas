# 字节跳动设计语言研究:Arco Design × Semi Design

> 研究对象:arco.design(含内置暗色体系)与 semi.design(DSM Token 体系),并取样 TDesign 作三方对比。
> 项目用途:深色主题设计图集站(design gallery)的完整设计语言选型与落地。
> 研究方法:2026-11-21 通过网络抓取官方文档站(Jina 渲染)、官方 GitHub 仓库源文件(raw.githubusercontent.com)、npm 官方包(unpkg/jsdelivr + 本地运行官方生成算法)交叉核验;每节标注来源 URL。**未核实的内容在第 8 节如实列出,未做推测填补。**

---

## 1. Arco 色彩体系与全局样式 Token

### 1.1 色彩分类与主色

Arco 将色彩分为主色、中性色、功能色、遮罩色四类([样式指南](https://arco.design/docs/spec/style-guideline)):

- **主色**:默认 `#165DFF`(arcoblue-6),提供 13 种通用主色,由动态梯度色彩算法衍生 13 套基础色板(每套 10 级);遮罩色默认 `#1D2129`、透明度 60%。
- **文字层级**(亮色):`--color-text-1` #1D2129(标题/正文)、`-2` #4E5969(语句)、`-3` #86909C(次要)、`-4` #C9CDD4(禁用),即 gray-10/8/6/4([暗黑模式文档](https://arco.design/react/docs/dark))。

### 1.2 官方 13 色亮色色板(10 级全值)

来源:[Arco 颜色文档页](https://arco.design/react/docs/palette)(页面内含 HEX/RGB/HSL 切换),与官方 npm 包 `@arco-design/color` `src/index.js:8-21` 的基准色完全一致(本次已下载并运行核验)。

| 色板(诗意名) | 1 | 2 | 3 | 4 | 5 | **6** | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Red 浪漫红 | #FFECE8 | #FDCDC5 | #FBACA3 | #F98981 | #F76560 | **#F53F3F** | #CB272D | #A1151E | #770813 | #4D000A |
| Orangered 晚秋红 | #FFF3E8 | #FDDDC3 | #FCC59F | #FAAC7B | #F99057 | **#F77234** | #CC5120 | #A23511 | #771F06 | #4D0E00 |
| Orange 活力橙 | #FFF7E8 | #FFE4BA | #FFCF8B | #FFB65D | #FF9A2E | **#FF7D00** | #D25F00 | #A64500 | #792E00 | #4D1B00 |
| Gold 黄昏 | #FFFCE8 | #FDF4BF | #FCE996 | #FADC6D | #F9CC45 | **#F7BA1E** | #CC9213 | #A26D0A | #774B04 | #4D2D00 |
| Yellow 柠檬黄 | #FEFFE8 | #FEFEBE | #FDFA94 | #FCF26B | #FBE842 | **#FADC19** | #CFAF0F | #A38408 | #785D03 | #4D3800 |
| Lime 新生绿 | #FCFFE8 | #EDF8BB | #DCF190 | #C9E968 | #B5E241 | **#9FDB1D** | #7EB712 | #5F940A | #437004 | #2A4D00 |
| Green 仙野绿 | #E8FFEA | #AFF0B5 | #7BE188 | #4CD263 | #23C343 | **#00B42A** | #009A29 | #008026 | #006622 | #004D1C |
| Cyan 碧涛青 | #E8FFFB | #B7F4EC | #89E9E0 | #5EDFD6 | #37D4CF | **#14C9C9** | #0DA5AA | #07828B | #03616C | #00424D |
| Blue 海蔚蓝 | #E8F7FF | #C3E7FE | #9FD4FD | #7BC0FC | #57A9FB | **#3491FA** | #206CCF | #114BA3 | #063078 | #001A4D |
| Arcoblue 极致蓝 | #E8F3FF | #BEDAFF | #94BFFF | #6AA1FF | #4080FF | **#165DFF** | #0E42D2 | #072CA6 | #031A79 | #000D4D |
| Purple 暗夜紫 | #F5E8FF | #DDBEF6 | #C396ED | #A871E3 | #8D4EDA | **#722ED1** | #551DB0 | #3C108F | #27066E | #16004D |
| Pinkpurple 青春紫 | #FFE8FB | #F7BAEF | #F08EE6 | #E865DF | #E13EDB | **#D91AD9** | #B010B6 | #8A0993 | #650370 | #42004D |
| Magenta 品红 | #FFE8F1 | #FDC2DB | #FB9DC7 | #F979B7 | #F754A8 | **#F5319D** | #CB1E83 | #A11069 | #77064F | #4D0034 |
| Gray 中性灰 | #F7F8FA | #F2F3F5 | #E5E6EB | #C9CDD4 | #A9AEB8 | #86909C | #6B7785 | #4E5969 | #272E3B | #1D2129 |

### 1.3 暗色「反转色板」(官方算法生成值)

Arco 暗黑模式「内置两套色板:默认亮色 + 根据亮色色板生成的暗色色板」([暗黑模式](https://arco.design/react/docs/dark)「原理」节)。暗色值由官方包 `@arco-design/color` 的 `generate(color, {list:true, dark:true})` 生成;**本次已实际安装该包并运行 `getPresetColors()` 输出全部值**(`src/index.js:23-60`)。核心机制:`colorPaletteDark` 以 `light[10-i+1]` 为基底反转再调饱和度(`src/palette-dark.js`)。

- **暗色中性灰(0→9)**:`#17171A #2E2E30 #484849 #5F5F60 #78787A #929293 #ABABAC #C5C5C5 #DFDFDF #F6F6F6`(`src/index.js:45-56` 明确硬编码,即亮灰的镜像反转)。
- 暗色 arcoblue 1-10:`#000D4D #041B79 #0E32A6 #1D4DD2 #306FFF #3C7EFF #689FFF #93BEFF #BEDAFF #EAF4FF`(暗色下「6 号」变为亮蓝 #3C7EFF,作 hover 用 7 号…)。
- 暗色 green 1-10:`#004D1C #046625 #0A802D #129A37 #1DB440 #27C346 #50D266 #7EE18B #B2F0B7 #EBFFEC`;orange:`#4D1B00 … #FF8D1F(#5) #FF9626(#6) … #FFF7E8`;red:`#4D000A #770611 #A1161F #CB2E34 #F54E4E(#5) #F76965(#6) … #FFF0EC`(其余 9 色同算法,完整输出已保存在本次运行记录 `/tmp/arco-palettes-all.json`)。

### 1.4 暗色语义 Token(暗色站点最核心的一组值)

来源:[暗黑模式文档「变量」节](https://arco.design/react/docs/dark) 与 `components/style/theme/global.less:355-393`(arco-design 仓库):

| 语义 | 亮色 | **暗色** |
|---|---|---|
| --color-bg-1 整体背景 | #FFF | **#17171A** |
| --color-bg-2 一级容器 | #FFF | **#232324** |
| --color-bg-3 二级容器 | #FFF | **#2A2A2B** |
| --color-bg-4 三级容器 | #FFF | **#313132** |
| --color-bg-5 下拉/Tooltip | #FFF | **#373739** |
| --color-bg-white | #FFF | #F6F6F6 |
| --color-text-1 标题 | #1D2129 | **rgba(255,255,255,.9)** |
| --color-text-2 语句 | #4E5969 | **rgba(255,255,255,.7)** |
| --color-text-3 次要 | #86909C | **rgba(255,255,255,.5)** |
| --color-text-4 禁用 | #C9CDD4 | **rgba(255,255,255,.3)** |
| --color-fill-1/2/3/4 | gray-1/2/3/4 | **rgba(255,255,255,.04/.08/.12/.16)** |
| --color-border | gray-3 | **#333335** |
| primary-light-1..4 | primary-1..4 | **rgba(primary-6, .2/.35/.5/.65)** |
| secondary | neutral-2 | rgba(gray-9,.08),hover rgba(gray-8,.16),active rgba(gray-7,.24) |
| 菜单暗色背景 | — | #232324;Tooltip 暗色 #373739(global.less:277-284) |

切换机制:`document.body.setAttribute('arco-theme', 'dark')`,CSS 变量挂在 body 上;支持 `prefers-color-scheme` 自动切换(dark 文档「如何切换」节)。DesignLab 还支持把暗黑挂载点改到任意容器实现**局部暗黑**(`arco-theme-tag` Less 变量,[局部暗黑样式](https://arco.design/docs/designlab/partial-dark),已读仓库源文件 `site/docs/designlab/partial-dark.zh-CN.md`)。

### 1.5 全局样式 Token 默认值

来源:[设计变量页](https://arco.design/react/docs/token)(页面含 Light/Dark 双模式即时切换)与仓库 `components/style/theme/default.less`、`global.less`(已逐行读取):

- **字体族**(default.less:13):`Inter, -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, noto sans, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif`;样式指南另给出备用栈 `'nunito_for_arco', 'Helvetica Neue', Helvetica, 'PingFang SC', …`;数字字体 Nunito/Byte Number(样式指南)。
- **字号**(global.less:169-178 + token 页):display-3 **56px** / display-2 **48px** / display-1 **36px** / title-3 **24px** / title-2 **20px** / title-1 **16px** / body-3 **14px**(正文常规)/ body-2 **13px** / body-1 **12px**(辅助)/ caption **12px**;最小可识别 12px、层级差 2-4px、全局 3-5 种层级(样式指南)。
- **字重**:常规 400 / 加粗 500 / semibold 600 / Light 300(样式指南);行高基准 `@line-height-base: 1.5715`(default.less:47),样式指南建议中文行高 1.4 倍、段间距 ≥1.5×字号(14px 正文→21px)。
- **间距 spacing-1..22**(global.less:95-117):2 / 4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32 / 36 / 40 / 48 / 56 / 60 / 64 / 72 / 80 / 84 / 96 / 100 / 120 px(2 的倍数体系)。
- **尺寸 size-1..50** = 4×N px(4→200px);组件尺寸 mini **24px** / small **28px** / default **32px** / large **36px**(global.less:88-91)。
- **圆角**(global.less:20-24):none 0 / **small 2px** / **medium 4px** / **large 8px** / circle 50%。
- **阴影**(global.less:124-151 + token 页):四级制,同一组公式按 1/2/4/8px 偏移递进——
  - special `0 0 1px rgba(0,0,0,.3)`;
  - 一级 down `0 2px 5px rgba(0,0,0,.1)`(另有 up/left/right/四角变体,偏移 2px);
  - 二级 down `0 4px 10px rgba(0,0,0,.1)`;
  - 三级 down `0 8px 20px rgba(0,0,0,.1)`。用法:卡片默认一级、hover 二级、下拉/模态三四级(样式指南「阴影」节)。
- **边框宽度**:0/1/2/3/4/5px;遮罩 `rgba(gray-10, 60%)`(global.less:271-272)。
- **z-index 阶梯**(default.less:38-45):affix **999** → popup **1000** → drawer/modal/image-preview **1001** → message/notification **1003**。
- **动效 Token**(default.less:20-36):
  - 时长:duration-1..5 = **0.1 / 0.2 / 0.3 / 0.4 / 0.5s**,loading = **1s**;
  - 缓动:linear `cubic-bezier(0,0,1,1)`;**standard `cubic-bezier(0.34, 0.69, 0.1, 1)`**;**overshoot `cubic-bezier(0.3, 1.3, 0.3, 1)`**;decelerate `cubic-bezier(0.4, 0.8, 0.74, 1)`;accelerate `cubic-bezier(0.26, 0, 0.6, 0.2)`。
  - (注:`/docs/spec/animation` 路径已 404,Arco 无独立动效规范页;以上为代码内官方 Token。)

---

## 2. Semi Design 的 Design Token 体系(DSM 思路)

### 2.1 分层结构

来源:[Semi Tokens 官方文档](https://semi.design/zh-CN/basic/tokens)(仓库源文件 `content/basic/tokens/index.md` 已逐节读取):

1. **基础色**:基于品牌色动态生成的 **160 色 = 16 色相 × 10 梯度**色盘(Semi DSM 配置品牌色即可重生成)。
2. **语义层(功能色)**:primary / secondary / tertiary 三强调级;info / success / warning / danger 四状态;**text-0..3 四级文本**、link、**bg-0..4 五级背景**、fill-0..2 三级填充、border、disabled、shadow;常量色 `--semi-white/--semi-black`(不随明暗切换);AI 场景色(ai-general/ai-purple/ai-background)。
3. **尺寸/排版/圆角/阴影/间距/z-index/动效** 全部变量化;官方宣称 **3000+ Design Token**([首页](https://semi.design/zh-CN)「百变主题」节)。
4. **DSM(Design System Management)**:在线主题编辑器「实时生效,设计工具一键同步」,主题可发布;首页展示飞书 Universe、抖音创作服务、剪映、火山引擎四套真实主题变装(同页)。

### 2.2 语义 Token 具体值(本次从官方编译产物 `@douyinfe/semi-ui/dist/css/semi.min.css` 解析提取,亮色块与 `body[theme-mode=dark]` 暗色块)

**绑定关系(亮色)**:primary=`rgba(var(--semi-blue-5),1)`,hover=`blue-6`,active=`blue-7`,disabled=`blue-2`;light 系列=`X-0/1/2`(如 primary-light-default=blue-0)。原始色板:blue-0..9 = `234,245,255 → 0,100,250(#0064FA,5号) → 0,44,107`;grey-0..9 = `249→230→198→167→136→107→85→65→46→28`(9 号=#1C1F23)。

**暗色语义(暗色站可直接抄)**:

| 语义 | 亮色 | **暗色** |
|---|---|---|
| --semi-color-bg-0 | #FFF | **rgba(22,22,26,1) #16161A** |
| --semi-color-bg-1 | #FFF | **#232429**(35,36,41) |
| --semi-color-bg-2 | #FFF | **#35363C**(53,54,60) |
| --semi-color-bg-3 | #FFF | **#43444A**(67,68,74) |
| --semi-color-bg-4 | #FFF | **#4F5159**(79,81,89) |
| --semi-color-nav-bg | #FFF | **#232429** |
| --semi-color-text-0..3 | rgba(28,31,35, 1/.8/.62/.35) | rgba(grey-9, 1/.8/.6/.35)(暗色 grey-9 已反转为 249,249,249) |
| --semi-color-fill-0/1/2 | rgba(46,50,56, .05/.09/.13) | **rgba(255,255,255, .12/.16/.20)** |
| --semi-color-border | rgba(28,31,35,.08) | rgba(255,255,255,.08) |
| --semi-color-overlay-bg | rgba(22,22,26,.6) | rgba(22,22,26,.6) |
| *-light-default/hover/active | X-0/1/2 实色 | **rgba(X-5, .2/.3/.4)** 半透明(primary/secondary/info/success/warning/danger 全系如此) |
| --semi-shadow-elevated | `0 0 1px rgba(0,0,0,.3), 0 4px 14px rgba(0,0,0,.1)` | 同左 |

**灰阶镜像**:暗色 raw grey-0..9 = `28/46/65/85/107/136/167/198/230/249`——恰为亮色数组**逐位反转**,暗色 blue-5=#54A9FF(84,169,255)。暗色组织方式:`body[theme-mode=dark]` 全局切换 + `.semi-always-dark` / `.semi-always-light` 两个锚点类做**局部明暗嵌套**,选择器同时写 `:host(...)` 支持 Shadow DOM(编译 css 选择器原文)。

### 2.3 尺寸/间距/排版 Token

来源:`packages/semi-theme-default/scss/variables.scss`(已全文读取):

- 控件高度:**24 / 32 / 40px**(small/default/large);描边 1px;图标 8/12/16/20/24px。
- 间距(语义命名):none 0 / super-tight **2** / extra-tight **4** / tight **8** / base-tight **12** / base **16** / base-loose **20** / loose **24** / extra-loose **32** / super-loose **40** px。
- 字体:`'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial`(Inter 需业务自行 @font-face 引入,tokens.md 明确说明);字号 small **12** / regular **14** / header-6..1 = **16/18/20/24/28/32**;字重 light **200** / regular **400** / bold **600**。
- 圆角(global.scss 注释版):extra-small **3px**(checkbox 内)/ small **3px**(button、tag、tabs)/ medium **6px**(dropdown、scrolllist、transfer 等菜单类)/ large **12px**(modal)/ circle 50%(avatar、badge)/ full **9999px**(胶囊)。
- z-index:portal 1 / affix·backtop·badge 10 / table-fixed 101 / modal·mask **1000** / toast·notification **1010** / popover **1030** / dropdown **1050** / tooltip **1060** / image-preview **1070** / 拖拽中元素 **2000**。

---

## 3. 动效规范:时长 / 缓动 Token

**Arco**(default.less,见 1.5):6 档时长(0.1-0.5s + 1s loading)+ 5 条命名缓动(线性/标准/过冲/减速/加速)。「标准 = cubic-bezier(0.34,0.69,0.1,1),过冲 = cubic-bezier(0.3,1.3,0.3,1)」是最常用的一对。

**Semi**(`packages/semi-theme-default/scss/animation.scss` 全文已读):动效 token 分四组——`--semi-transition_duration-*`(slowest→fastest 八档)、`--semi-transition_function-*`(linear/ease/easeIn/easeOut/easeInIOut 五条)、`--semi-transition_delay-*`、`--semi-transform_scale-*`(1.04/1.08/1.12)。**关键设计:默认值全部 0ms——动效默认关闭**(animation.scss:4-41),注释中给出开启参考值:slowest/slower/slow/normal = **500ms**,fast = **200ms**,faster = **100ms**,fastest = **50ms**;这是一个「动效可整体开关」的无障碍优先架构(DSM 中有全局动效开关)。

**Semi 组件真实动效值**(从 semi.design 官网运行时 CSS `styles.6c134c360f7aacc6f803606674.css` 与编译包 css 提取的 animation 规则原值):

| 组件 | 时长 | 缓动 |
|---|---|---|
| Toast | .3s | `cubic-bezier(.22,.57,.02,1.2)`(过冲) |
| Notification | .3s | `cubic-bezier(.62,.63,0,1.13)`(过冲) |
| SideSheet(四方向滑入/出+透明度) | .18s | `cubic-bezier(.25,.46,.45,.94)`(减速) |
| Modal 内容层 / 遮罩 | .12s / 90ms | `cubic-bezier(.215,.61,.355,1)` |
| Popover / Tooltip | .1s | `cubic-bezier(.215,.61,.355,1)` |
| Tabs 面板切换(四方向) | .2s | ease-in-out |
| Skeleton 流光 | 1.4s | ease infinite |
| Progress 不确定态 | 1.2-1.6s | linear / ease-in-out infinite |
| Spin 旋转 | .6s | linear infinite |
| 其他(节选) | opacity .2s `cubic-bezier(.5,-.1,1,.4)`;width .2s `cubic-bezier(.62,.05,.36,.95)` | — |

---

## 4. 组件规范精读:Tabs / Collapse / Tag / Button / Card / Descriptions

> 说明:Arco 官方「组件用法」规范页(设计指南)仅覆盖 Tabs 与 Descriptions([/docs/spec/tabs](https://arco.design/docs/spec/tabs)、[/docs/spec/descriptions](https://arco.design/docs/spec/descriptions),仓库源文件已读);Button/Card/Tag/Collapse **无官方 spec 页**,以下规格取自官方 `components/*/style/token.less` 与 `README.zh-CN.md`(精确到 px 的权威实现值)。Semi 侧取自仓库文档 md + 编译 CSS 实测值。

### 4.1 Tabs 标签页

**Arco**(spec 页 + token-tabs.less):
- 结构:标签(必有,建议**每个≤4 汉字、一次≤7 个**)+ 内容区(必有)+ 滑动按钮(溢出时)+ 新增/关闭按钮(可编辑场景)。
- 类型 6 种:`line`(下划线+墨条)/ `card` / `card-gutter` / `text`(纯文字变色,轻量次级模块)/ `rounded` / `capsule`(选项卡式,强调重要页签)。spec 页归为 3 类:默认(下划线)/ 文字 / 选项卡。
- 尺寸 token:line 型头高 mini/small/default/large = **32/36/40/44px**;card、capsule、rounded、text 型头高 = **24/28/32/36px**;字号 mini=12px 其余 14px。
- 关键值:墨条(ink)高 **2px** 主色,头底边 1px neutral-3;标签水平间距 **32px**、首个 **16px**;标签文字 padding `1px 8px`;hover 背景 fill-2;active 文字主色 + 字重 500;禁用 text-4。垂直布局时标签水平 padding 20px。
- 文案指南:总结性强、表意清晰;溢出时滑动按钮滚动(触屏支持手势)。

**Semi**(`/zh-CN/navigation/tabs`,Tabs 归入「导航」类):tab 文字 14px/行高 20px;类型 line/card/button 等;面板切换动画 0.2s ease-in-out 四方向;文档以「如何引入→代码演示(live)→API→设计变量」组织,无独立文字规范页。

### 4.2 Collapse 折叠面板

**Arco**(token-collapse.less + README):
- 结构:Collapse(bordered 默认 true、accordion 手风琴、lazyload 挂载不渲染隐藏面板、expandIconPosition left/right、triggerRegion header/icon)+ Collapse.Item(header/content/disabled/extra)。
- 值:整体圆角 **4px**;标题 14px 行高 24px,padding **13px 横 × 8px 竖**,active 时字重 500;标题底边 1px neutral-3;内容区背景 **fill-1**、竖向 padding **8px**、文字 14px;展开图标 **14px**、色 neutral-7、与文字间距 **5px**(带底图标容器 16px/fill-2)。焦点环色 primary-light-3。

**Semi**(编译 CSS 实测):`.semi-collapse-item` 分隔线 `border-bottom:1px var(--semi-color-border)`;header `margin:4px 8px; padding:8px; border-radius:3px; font-weight:600; font-size:14px/20px`;图标 16px text-2;content `padding:4px 16px 8px`。API:accordion、defaultActiveKey、expandIconPosition 等(collapse.md)。

### 4.3 Tag 标签

**Arco**(token-tag.less + README):
- 四尺寸高:**20 / 24 / 28 / 32px**(small/default/medium/large);padding 横 **8px** 竖 0;字号 12/12/14/14;**字重 500**;圆角 **2px**;图标右距 4px。
- 色彩规则(10 彩色通用公式):默认实心 `bg=X-1, hover bg=X-2, text/icon=X-6`;加 `bordered` 后 `border=X-6`;checkable 未选中 hover bg=fill-2。custom 色文字白、图标 hover 底 rgba(255,255,255,.2)。
- API:checkable/checked(可选中)、closable、bordered、size、color(字符串任意色板名)。

**Semi**(文档 + CSS):两尺寸 small **20px**(padding `2px 8px`,12px 字,行高 16px)/ large **24px**(padding `4px 8px`);两形状 `square`(默认)/`circle`(圆角 13px 胶囊);色板走 `color='light-blue' / 'cyan'` 等浅色语义;TagGroup/SplitTagGroup 组合;onClose 支持 preventDefault 阻止关闭(tag.md)。

### 4.4 Button 按钮

**Arco**(token-button.less + README):
- 四尺寸高 24/28/32/36px,横 padding **11/15/15/19px**,字号 12/14/14/14,圆角 **2px**,描边 1px,图标与文字间距 4/6/8/8px。
- **六类型**:default(白底灰边)、primary(实心主色)、secondary(浅灰 secondary)、dashed(虚框)、text(纯文字)、outline(线性主色描边);四状态色 default/warning/danger/success。状态公式:hover=`色-5`、active=`色-7`、disabled=`色-light-3`(`color-primary-light-3` 等);实心文字 #FFF。
- shape:square/circle/round;`iconOnly` 等宽高;loading 支持 `loadingFixedWidth` 不改宽(防抖动)。

**Semi**(button.md + CSS):
- 三尺寸高 **24/32/40px**;横 padding 12/12/16px;字号 14px;**字重 600**(比 Arco 的 400 更重,是 Semi 按钮更「墩实」的原因);圆角 3px。
- 独有 **theme × type 双轴**:theme = solid / light / borderless / outline × type = primary / secondary / tertiary / warning / danger,共 20 种组合(文档示例逐一列出「深色主要/浅色次要…」);tertiary(第三色,弱强调)是 Semi 特有层级。

### 4.5 Card 卡片

**Arco**(token-card.less + README):
- default 尺寸:标题栏高 **46px**、标题 16px/500、extra 14px 主色;横 padding **16px**(标题与正文同);正文竖 padding **16px**。small 尺寸:标题栏高 **40px**、正文竖 padding **12px**。
- 结构:bordered(默认 true)/hoverable/loading(骨架)/cover/extra/actions 底部操作组/Card.Meta(avatar+title+description,description 上距 **4px**)/Card.Grid(栅格卡)。Meta/footer 上距 **20px**,action item 右距 **12px**。
- 边框 neutral-3 1px,圆角 **2px**;hover 阴影色亮 `rgb(gray-2)`、暗 `rgba(gray-1, 40%)`(卡片 hover 抬升专用色,不走通用 shadow)。

**Semi**(card.md + CSS):`.semi-card` 圆角 **6px**、背景 `--semi-color-bg-0`、字号 14px/20px;header padding **20px**;支持 title/extra/bodyStyle/headerStyle/actions、Meta;文档展示封面图+垂直布局等用法。

### 4.6 Descriptions 描述列表

**Arco**(spec 页给了唯一的官方像素表 + token-descriptions.less):
- 定义:成组展示多个只读字段,详情页信息展示;构成=标题(可选)+内容(必有,一行/多行)+边框(可选)。
- **五尺寸**:简单展示行间距 **2 / 4 / 8 / 12 / 16px**;带边框展示行高 **26 / 28 / 32 / 36 / 40px**(spec 页原文)。
- 带边框值:外框 1px neutral-3、圆角 **4px**;单元格 padding 横 **20px**、竖 **3/3/5/7/9px**;label 背景 **fill-1**、字重 500 色 text-3;值 400 色 text-1;标题 16px/500,标题下距 6/8/12/16/20px。
- 布局:水平/垂直/行内水平/行内垂直四种 + 响应式;标签可左/右对齐。

**Semi**(descriptions.md):数据驱动 `data=[{key,value}]`;`keyStyle` 支持 width/textAlign 等实现 key 对齐(如 `{width:100, textAlign:'right'}`);value 可嵌 Tag/图标;`rowSize`/`size`/`border` 布局;key 色 text-2、normal 14px。

---

## 5. 两个官网的版式工艺拆解

### 5.1 Arco(arco.design)

- **文档站信息架构**:顶部三条主导航「设计 / 开发 / 生态产品」横切三类受众;左侧栏分「开发指南(含暗黑模式、颜色、设计变量、定制主题)+ 组件(按通用/布局/数据展示/数据输入/反馈/导航分组)+ 设计指南(组件用法 spec)+ 风格配置平台 + ArcoPro + 物料平台」(动画文档页抓取到的完整导航树,`/tmp/arco-anim.md`)。
- **组件页节奏**(以 [Tabs](https://arco.design/react/components/tabs) 实抓为例):面包屑类目(「组件/数据展示」)→ H1 + 一句话导语 → demo 列表,每个 demo 严格重复「**H3 小标题 + 一句话说明 + 渲染舞台 + 默认折叠的代码块**」;不同类型/尺寸的 demo 用 Radio.Group 做成**页面内自切换的参数化舞台**(如 type 六型、size 四档一键切换)。代码折叠保证了「画廊浏览不打断、按需展开」的双速阅读。
- **Token 页工艺**:[设计变量页](https://arco.design/react/docs/token) 顶部带 **Light/Dark 即时切换**,同一张表直接翻面看两套色值;[颜色页](https://arco.design/react/docs/palette) 每个色板起中文名并支持 HEX/RGB/HSL 三格式切换。
- **首页**:以全屏 WebGL 动效开场(Jina 静态抓取仅返回标题「企业级产品的完整设计和开发解决方案」,正文未渲染——如实注明,动效细节无法从本次抓取核验)。

### 5.2 Semi(semi.design)

- **首页段落节奏**(实抓 [首页](https://semi.design/zh-CN) 全文):「连接设计师与开发者」slogan + 亮/暗**双截图**并排 → 「已服务 10 万+用户」+ 产品 logo 墙 → 「先进的开发者体验」**图标+标题+一句话**特性网格(D2C、A11y、i18n、LiveCode、SSR、FA 架构…)→ 「百变主题」:**3000+ token + 四套品牌主题变装卡**(飞书/抖音创作/剪映/火山引擎)→ DSM 主题编辑器区(「让设计与代码同源」+ Figma 同步图)→ 真实产品案例卡阵列(飞书项目/扣子/剪映黑罐头…每卡截图+一句介绍)→ 「内容深度解读」博客卡(无障碍/主题化/质量保障/D2C 演进)→ 社区数据(Stars/Fork/下载/贡献者)→ 「我是开发者/我是设计师」**双入口 CTA**。整页是「叙事章节化」的:每章一个视觉母题,章间留白大。
- **文档即源码**:文档仓库 `content/<分类>/<组件>/index.md`,demo 用 ```` ```jsx live=true ```` 标记,官网直接渲染为可交互演示 + 折叠源码;每个组件文档末尾有「设计变量」节锚点直达 token 筛选器(tokens.md 的 `<DesignToken componentName reg/>` 机制,按正则过滤相关变量)。
- **暗色层次手法**:编译 CSS 用 `body[theme-mode=dark]` 全局翻转 + `.semi-always-dark/.semi-always-light` 锚点类,允许暗色页面里嵌一块亮色组件(或反之)——「明暗局部嵌套」是 Semi 独有的层次表达;导航底 `--semi-color-nav-bg` 单独成 token,暗色下与 bg-1 同值但语义独立。

### 5.3 可迁移的布局巧思小结

1. 「小标题+一句话+舞台+折叠代码」的 demo 单元,是画廊站卡片节奏的现成模板(标题即检索入口、舞台即预览、代码即详情)。
2. 参数化舞台(Radio 切 type/size/Light-Dark)让一张卡片承载一个组件的全部状态,信息密度翻倍而不加长度。
3. 暗色层级不靠阴影靠**明度台阶**(Arco bg-1..5 / Semi bg-0..4),深色站点照抄即可成立;浮层、导航、遮罩各自独立 token。
4. 首页「亮暗双截图并排」+「主题变装卡」是深色设计系统最有说服力的橱窗陈列。

---

## 6. Arco vs Semi vs TDesign:文档站/画廊站呈现差异与 3 条启示

三方取样:TDesign [色彩](https://tdesign.tencent.com/design/color)、[深色模式](https://tdesign.tencent.com/design/dark)、[首页](https://tdesign.tencent.com/) 均已实抓;Arco/Semi 见上。

| 维度 | Arco | Semi | TDesign |
|---|---|---|---|
| 色彩体系 | 13 主色 × 10 级,动态梯度算法,诗意色名 | 16 色相 × 10 级 = 160 基础色,品牌色一键重生成 | 腾讯蓝 #0052D9 单主色 + 8 套扩展 × 10 级,**HCT 色彩空间**拟合,页面直接标注对比度(品牌色 6.54:1、错误色 4.32:1) |
| 暗色组织 | body 属性 + CSS 变量,暗色=亮色色板镜像反转;文字白透明度 4 档 | body[theme-mode] + always-dark/light 局部嵌套;DSM 全变量双主题;文字透明度同构 | 亮色算法再运算得暗色(CIElab/HSL 插值);文字白 90/60/40/26% 并说明「感知一致微调」;WCAG 2.0 AA 4.5:1 写进原则 |
| Token 量级 | 全局 + 组件 token 数百,Less/CSS 变量双轨 | 3000+,DSM 可视化定制→发布主题包 | Design Token 抽离支撑品牌定制(首页原文),文档按章节呈现 |
| 动效 | 6 时长 + 5 命名缓动 token(代码级) | token 默认 0ms(无障碍默认关),组件各带专属过冲曲线 | **未找到公开的动效 token 规范页**(本次检索未获) |
| 文档站气质 | 工程手册感:分组导航、参数化 demo、spec 页讲「何时用/何时不用」 | 产品发布会感:叙事章节、live demo、DSM 主题橱窗、双 CTA | 企业门户感:真实业务拼贴大图、亮/暗双套 banner(呼吸光效)、多技术栈代码卡 |

**对本项目(深色主题设计图集站)最有用的 3 条启示:**

1. **用「明度台阶 + 白透明度文字」直接构建暗色层级**:页底 #17171A(Arco)/#16161A(Semi)起步,容器每级 +6~8% 明度(#232324→#2A2A2B→#313132→#373739),文字用 rgba(255,255,255,.9/.7/.5/.3)。图集站可精确映射:页面底=bg-1、画廊卡=bg-2、hover 抬升=bg-3、浮层预览=bg-4、Tooltip=bg-5——零试错。
2. **动效学 Semi 的「token 化 + 默认可关」与 Arco 的「命名缓动对」**:全局 duration/function/delay 变量挂在根上(想全局降级动效改一处即可);卡片 hover 用 0.2s standard,预览浮层用减速 cubic-bezier(0.4,0.8,0.74,1),点赞/收藏等强反馈用过冲 cubic-bezier(0.3,1.3,0.3,1) 或 Semi toast 的 cubic-bezier(.22,.57,.02,1.2)。
3. **画廊单元照抄 Arco demo 节奏 + Semi 深链**:每张图集卡 =「小标题 + 一句话 + 固定比例舞台 + 折叠详情(代码/色值)」,卡内加 Light/Dark 或状态参数切换(TDesign 的「亮暗双素材」同理);每张卡挂一个 token 锚点深链(Semi「设计变量」模式),把图集站从「看」升级为「抄得走」。

---

## 7. 「arcdark」命名的核验说明

- 本次在 arco-design 官方仓库全文件列表(jsdelivr flat 索引)、npm registry(`@arco-themes/*` 搜索)、以及搜索引擎中**均未检索到名为「arcdark」的官方主题包或文档**;Arco 官方主题商店([themes/stores](https://arco.design/themes/stores))需 GitHub OAuth 登录后才能查看,本次无法进入核验。
- 可核验的事实是:Arco **内置**的暗黑体系(body[arco-theme=dark] + CSS 变量算法,见第 1.4 节全部数值)即官方暗色「体系」本身。**「arcdark」作为具体主题名,标注为:未能在无需登录的官方源中核验。**

## 8. 未找到 / 未核验清单(如实声明)

| 项 | 状态 |
|---|---|
| 「arcdark」主题包/命名 | 未核验(主题商店需 GitHub 登录,npm 无此包) |
| Arco 首页正文版式 | 无法静态抓取(全屏 WebGL,仅获页面标题) |
| Arco `/docs/spec/animation` 动效规范页 | 已 404,不存在;动效值取自仓库 default.less |
| Arco Button/Card/Tag/Collapse 官方设计指南页 | 官方未提供(组件用法 spec 仅 34 个组件);已用官方 token.less 佐证 |
| TDesign 动效 token 规范页 | 本次检索未找到公开页面 |
| Semi 亮色 160 色基础色盘逐值 | 文档为前端渲染(`<FullPalette/>`),静态抓取不含全表;已核验 blue/grey 全 10 级与 dark 全部语义值 |
| Semi Tabs 独立设计指南文字 | 无(文档仅 demos+API+设计变量锚点) |

---

## 9. 十个签名巧思(每个一句话 + 出处)

1. **13 个色板人人有诗意名**(浪漫红/晚秋红/活力橙/黄昏/柠檬黄/新生绿/仙野绿/碧涛青/海蔚蓝/极致蓝/暗夜紫/青春紫/品红)——色板命名本身成为品牌叙事。出处:https://arco.design/react/docs/palette
2. **暗色文字不发明新灰,直接用白色透明度 90/70/50/30% 四档**,任意主色主题下文字层级恒定。出处:https://arco.design/react/docs/dark
3. **暗色背景做成五级明度台阶** #17171A→#232324→#2A2A2B→#313132→#373739,层级靠「台阶」而非阴影。出处:同上 + arco-design `components/style/theme/global.less:355-361`
4. **暗色色板 = 亮色色板 1↔10 镜像反转再调饱和度**(代码原句 `colorPalette(originColor, 10 - i + 1)`),换主色后暗色自动成立。出处:`@arco-design/color/src/palette-dark.js`
5. **缓动成对命名**:standard `cubic-bezier(0.34,0.69,0.1,1)` 与 overshoot `cubic-bezier(0.3,1.3,0.3,1)` 一收一放纳入同一 token 表。出处:arco-design `components/style/theme/default.less:28-36`
6. **动效 token 默认全 0ms**——「关掉动效」是无障碍默认值,DSM 开启后才有 50-500ms 七档。出处:`semi-theme-default/scss/animation.scss:4-52`
7. **灰阶亮暗逐位镜像**(亮 249→28 / 暗 28→249),暗色即把灰阶数组 reverse,对比关系零成本保持。出处:`@douyinfe/semi-ui/dist/css/semi.min.css` :root 与 body[theme-mode=dark] 两块
8. **每个弹层一条专属过冲曲线**:toast `(.22,.57,.02,1.2)`、notification `(.62,.63,0,1.13)`——通知是「抛进来」的,不是淡入的。出处:semi.design 官网运行时 CSS animation 规则
9. **圆角 token 附用途注释**:3px=button/tag/tabs、6px=菜单类、12px=modal、9999px=胶囊,「圆角即组件气质」写进源码。出处:`semi-theme-default/scss/global.scss:1-8`
10. **DSM 把官网做成主题变装橱窗**:3000+ token 实时生效,飞书/抖音创作/剪映/火山引擎四套真组件主题并排陈列,「文档站即产品 demo」。出处:https://semi.design/zh-CN 「百变主题」节

---

*报告所有数值均可溯源至文中标注的官方 URL 或仓库文件;抓取与解析命令及中间产物(色板 JSON、token less/scss/css)均留存于本次会话执行记录中。*
