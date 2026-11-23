# Ant Design 设计体系专项调研报告

> 调研日期:2026-11-21
> 调研域:前端部件 components(24 条组件条目)
> 结论用途:为「前端部件」域组件条目提供 props 默认值的一手依据

---

## 0. 版本锚点与核对方法

| 项 | 结果 | 核对命令 / 来源 |
| --- | --- | --- |
| antd 最新稳定版 | **6.7.1** | `curl https://registry.npmjs.org/antd/latest` → `"version":"6.7.1"` |
| GitHub master | 与 tag `6.7.1` 一致 | raw.githubusercontent.com 实测两份 package.json 均为 6.7.1 |
| 在线文档版本 | ant.design 当前文档即 **v6.7.1** | WebFetch `https://ant.design/components/badge-cn`、`button-cn`、`message-cn`、`switch-cn` 实测确认 |
| 最新 v5.x | 5.107.2(npm 版本清单;git 无同名 tag,以 `5.27.1` tag 做 v5 对照) | `curl registry.npmjs.org/antd` + tag 探测 |
| 源码核对基准 | `https://github.com/ant-design/ant-design/tree/6.7.1`(codeload tarball 解包,41 份文件直读 + 全仓 grep) | 本地解包于 `.scratch/antd06/repo/ant-design-6.7.1/` |

**核对方式说明**:所有数值均取自 antd 6.7.1 官方仓库源码(组件文档 md + theme 模块 ts)与 ant.design 在线文档页双源交叉;未经两源确认的条目在第 5 章显式标注「未证实」。本报告无任何推测数值。

---

## 1. 设计价值观与全局设计语言(ant.design /docs/spec 系列)

### 1.1 四大设计价值观
来源:`docs/spec/values.zh-CN.md`(仓库 6.7.1)· https://ant.design/docs/spec/values-cn · https://ant.design/docs/spec/introduce-cn

1. **自然**:感知自然(汲取自然界规律的视觉要素降低认知成本)+ 行为自然(主动式服务减少操作)。
2. **确定性**:设计者确定(保持克制「能做但想清楚了不做」、面向对象的方法、模块化设计)+ 用户确定(跨产品/终端/系统一致)。
3. **意义感**:结果的意义(明确目标、即时反馈、情感化设计)+ 过程的意义(挑战适中、心流投入)。
4. **生长性**:价值连接 + 人机共生。

### 1.2 色彩体系
来源:`docs/spec/colors.zh-CN.md` · https://ant.design/docs/spec/colors-cn

- **色彩模型**:采用 HSB 模型(设计师对调整颜色有明确心理预期)。
- **基础色板**:12 个主色 × 每色衍生 10 阶 = **120 色**;色板由「自然光下变化规律 + 素描思路」推导;色板生成算法开源(`@ant-design/colors` 的 `generate()`);三代色板演进见知乎专栏《Ant Design 色板生成算法演进之路》。
- **中性色板**:白→黑共 **13 个**颜色,平衡可读性/美感/可用性。
- **主色选择规则**:建议取色板从浅至深的**第 6 个**颜色作为主色;Ant Design 品牌色 = 蓝色板第 6 阶 **#1677ff**。
- **功能色**:成功/出错/提醒/链接等功能色遵守用户认知,体系内保持一致。
- **中性色落地方式**:按**透明度**实现(而非实色),兼容深浅背景并满足 WCAG 2.0。
- 13 个预设主色(源码 `components/theme/themes/seed.ts:3-20`):blue `#1677FF`、purple `#722ED1`、cyan `#13C2C2`、green `#52C41A`、magenta `#EB2F96`(pink 为其废弃别名)、red `#F5222D`、orange `#FA8C16`、yellow `#FADB14`、volcano `#FA541C`、geekblue `#2F54EB`、gold `#FAAD14`、lime `#A0D911`。
- blue 十阶示例(colors.zh-CN.md:64):`['#E6F4FF','#BAE0FF','#91CAFF','#69B1FF','#4096FF','#1677FF','#0958D9','#003EB3','#002C8C','#001D66']`,primary = 第 6 阶。

### 1.3 字体体系
来源:`docs/spec/font.zh-CN.md` · https://ant.design/docs/spec/font-cn

- **字体家族**(font.zh-CN.md:24-26,与 seed.ts:38-40 一致):
  `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`
- **主字号**:14px(基于 50cm 阅读距离与 0.3° 视角,由 12 升级至 14)。
- **字阶与行高**:受「5 音阶 + 自然律」启发定义 **10 个字号**;主字号 14 对应行高 22;建议系统内字阶控制在 3-5 种(展示页除外)。
- **字重**:regular 400 / medium 500;英文加粗 semibold 600(源码 alias token `fontWeightStrong: 600`,alias.ts:112)。
- **数字**:推荐 `font-variant-numeric: tabular-nums` 等宽数字(纵向对比场景)。
- **对比度**:正文/标题/背景保持 **7:1 以上 AAA 级**对比(WCAG)。

### 1.4 布局体系
来源:`docs/spec/layout.zh-CN.md` · https://ant.design/docs/spec/layout-cn

- 统一画板 **1440**;主流分辨率 1920 / 1440 / 1366(个别 1280)。
- 适配:左右布局(左导航固定+右侧缩放)、上下布局(留白最小值+中间缩放)。
- **网格基数 8**(偶数思维,匹配主流设备)。
- **24 栅格**体系;Gutter 为定值(不随列宽缩放)。
- **常用模度**:保持 8 倍数原则的双数组(如 [8, 48] / [16, 40] 系),用于布局空间决策;定位是「启发而非限制」。
- ⚠️ 实现层 nuance:代码 token `sizeUnit: 4 / sizeStep: 4`(seed.ts:64-65),间距档位实为 4 的倍数:4/8/12/16/20/24/32/48(见 2.3),比设计规范的 8 倍数更细,供组件内部微调用。

### 1.5 暗黑模式
来源:`docs/spec/dark.zh-CN.md` · https://ant.design/docs/spec/dark-cn

- 使用时机:暗光环境长时间工作、沉浸式专注。
- 两原则:**内容的舒适性**(避免过强对比)、**信息的一致性**(层级关系与浅色一致)。
- 色彩:12 套基础色板 + **透明度规则**融合环境色;提供暗色色板生成工具。

### 1.6 动效设计原则
来源:`docs/spec/motion.zh-CN.md` · https://ant.design/docs/spec/motion-cn

- 三原则:**自然**(运动规律、视觉连贯,如按钮如「树叶浮水触碰下浮再反弹+涟漪」)、**高效**(过渡时间尽量短;**出场不排队、整块直接消失**,比进场更快)、**克制**(只做有意义的动效,如 Menu 图标切换不抢注意力)。
- 动效价值:增加舒适度、界面活力、描述层级、提供反馈;衡量标准是「存在是否合理」与「不丢帧不卡顿」。
- Ant Motion(https://motion.ant.design/) 为独立动效语言与 React 解决方案。

### 1.7 v6 文档结构变化(如实记录)
- v5 时代的 `docs/spec/global.zh-CN.md`(字体/间距总览页)在 **6.7.1 仓库中不存在**,在线 https://ant.design/docs/spec/global-cn 实测 **404**;相关内容并入「全局样式」分组下的 colors / font / layout / dark 等页。
- `docs/spec/near-future.zh-CN.md` 在 6.7.1 中已移除(404);其在线状态未再核对(未证实)。

---

## 2. Token 体系

### 2.1 三层架构:Seed → Map(派生)→ Alias(消费)
来源:`components/theme/util/alias.ts:12-14`(源码注释原文:*"Seed (designer) > Derivative (designer) > Alias (developer)"*)· https://ant.design/docs/react/customize-theme-cn

- **Seed Token**:影响主题的最小设计变量,给设计师改(如 colorPrimary、borderRadius、fontSize、controlHeight、motionUnit)。
- **Map Token**:由 Seed 经**派生算法**(derivative)批量算出(如色板 1-10 阶、字阶、圆角族、间距档)。
- **Alias Token**:面向开发者的语义别名(colorTextPrimary、paddingSM、boxShadow…),由 formatToken 将 Map+Override 合并生成(alias.ts:15-221)。
- 配置入口:`ConfigProvider theme={{ token, algorithm, components }}`;组件级 token 支持独立 `algorithm`(≥5.8.0);`theme.getDesignToken()` 可静态导出;`useToken()` hook 动态消费。
- **v6 新增 `zeroRuntime` 模式**(customize-theme.zh-CN.md:76-90):开启后运行时不再生成样式,需引入 `antd/dist/antd.css`。

### 2.2 Seed Token 默认值全表(6.7.1 `themes/seed.ts`)

| 分类 | Token | 默认值 |
| --- | --- | --- |
| 色彩 | colorPrimary / colorInfo / colorLink(空则取 info) | `#1677ff` |
| 色彩 | colorSuccess | `#52c41a` |
| 色彩 | colorWarning | `#faad14` |
| 色彩 | colorError | `#ff4d4f` |
| 色彩 | colorTextBase / colorBgBase | `''`(空 → 算法内默认 #000 / #fff,dark 下 #fff / #000) |
| 字体 | fontFamily / fontFamilyCode | 系统栈(1.3 节)/ `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace` |
| 字体 | fontSize | `14` |
| 线条 | lineWidth / lineType | `1` / `solid` |
| 动效 | motionUnit / motionBase | `0.1` / `0` |
| 动效 | 8 条 motionEase* 缓动(见第 3 章) | cubic-bezier(…) |
| 圆角 | borderRadius | `6` |
| 尺寸 | sizeUnit / sizeStep / sizePopupArrow | `4` / `4` / `16` |
| 控件 | controlHeight | `32` |
| 层级 | zIndexBase / zIndexPopupBase | `0` / `1000` |
| 图片 | opacityImage | `1` |
| 其他 | wireframe / focusOutline / motion | `false` / `true` / `true` |

### 2.3 派生算法(-map)的具体值

**① 字阶与行高**(`themes/shared/genFontSizes.ts`,自然指数公式)
- 公式:`size[i] = round_even(floor/ceil(14 × e^((i-1)/5)))`,i=0..9 → **10 档**;行高 `lineHeight = (size+8)/size`(genFontSizes.ts:1-3)。
- 以 base=14 推导(源码逻辑逐档计算):

| 档位 | 值 | 行高 |
| --- | --- | --- |
| fontSizeSM | 12 | 1.6667 |
| fontSize(主) | 14 | **1.5714**(≈22px) |
| fontSizeLG | 16 | 1.5 |
| fontSizeXL = fontSizeHeading4 | 20 | 1.4 |
| fontSizeHeading5 | 16 | 1.5 |
| fontSizeHeading3 | 24 | 1.3333 |
| fontSizeHeading2 | 30 | 1.2667 |
| fontSizeHeading1 | 38 | 1.23 |
| (隐藏高档,未暴露为命名 token) | 46 / 56 / 68 | — |

**② 圆角族**(`themes/shared/genRadius.ts:9-56`):seed borderRadius=6 →
- borderRadius **6**、borderRadiusLG **8**(+2)、borderRadiusSM **4**、borderRadiusXS **2**、borderRadiusOuter **4**(分段函数,非简单加减;≥16 封顶 16)。

**③ 控件高度**(`themes/shared/genControlHeight.ts:6-10`):controlHeight **32** → SM = ×0.75 = **24**,XS = ×0.5 = **16**,LG = ×1.25 = **40**。

**④ 间距档位**(`themes/shared/genSizeMapToken.ts:6-16`,sizeUnit=4 × 系数):

| Token | 公式 | 值 |
| --- | --- | --- |
| sizeXXS | ×(step-3) | 4 |
| sizeXS | ×(step-2) | 8 |
| sizeSM | ×(step-1) | 12 |
| size / sizeMS | ×step | 16 |
| sizeMD | ×(step+1) | 20 |
| sizeLG | ×(step+2) | 24 |
| sizeXL | ×(step+4) | 32 |
| sizeXXL | ×(step+8) | 48 |

- Alias 层映射(alias.ts:120-145):paddingXXS..paddingXL = sizeXXS..sizeXL;marginXXS..marginXXL 同构;`controlPaddingHorizontal: 12`、`controlPaddingHorizontalSM: 8`;`controlInteractiveSize: controlHeight/2 = 16`(alias.ts:97)。

**⑤ 颜色派生**(default 算法,`themes/default/colors.ts` + `colorAlgorithm.ts` + `shared/genColorMapToken.ts`)
- 色板:`generate(base)` 产 10 阶;功能色语义 → `colorXxxBg=阶1 / Border=阶3 / Hover=阶4或5 / 主=阶6 / Active=阶7 / Text=阶9`(genColorMapToken.ts:54-110)。
- 中性色按**透明度/暗度增量**生成(default/colorAlgorithm.ts:`getAlphaColor` = setA;`getSolidColor` = `darken(bg, n)`):
  - 文字:`colorText` 88%、Secondary 65%、Tertiary 45%、Quaternary 25% 透明度 → `rgba(0,0,0,0.88/0.65/0.45/0.25)`。
  - 填充:colorFill 15% / Secondary 6% / Tertiary 4% / Quaternary 2%。
  - 背景:colorBgContainer = darken(bg,0) `#fff`、colorBgElevated `#fff`、colorBgLayout = darken 4% **`#f5f5f5`**、colorBgSpotlight = rgba(0,0,0,0.85)、colorBgMask = **rgba(0,0,0,0.45)**(genColorMapToken.ts:117)。
  - 边框:colorBorder = darken 15% **`#d9d9d9`**、colorBorderSecondary = darken 6% **`#f0f0f0`**。
- Alias 语义映射样例(alias.ts:55-104):colorFillContent=FillSecondary、colorTextPlaceholder=TextQuaternary、colorIcon=TextTertiary、controlItemBgHover=FillTertiary、controlItemBgActive=PrimaryBg、controlOutline=PrimaryBg 透明化等。

**⑥ 阴影体系**(alias.ts:147-214,基于 colorShadow 乘系数)
- `boxShadow`(浮层主阴影):`0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)`。
- `boxShadowTertiary`(轻阴影):`0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 6px -1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.03)`。
- 另有 boxShadowCard / boxShadowDrawerLeft·Right·Up·Down / boxShadowTabsOverflow×4 / dropShadowPopover 全方向阴影。

**⑦ 响应式断点**(alias.ts:35-41,58-182):screenXS 480 / SM 576 / MD 768 / LG 992 / XL 1200 / XXL 1600 / XXXL 1920(含 Min/Max 派生)。

### 2.4 三大预设算法

| 算法 | 用法 | 核心逻辑 | 关键差异值 |
| --- | --- | --- | --- |
| default | `theme.defaultAlgorithm` | 见 2.3 | colorBgContainer `#fff` / colorBgLayout `#f5f5f5` / border `#d9d9d9` |
| dark | `theme.darkAlgorithm` | `generate(color, { theme:'dark' })`;中性色反转为 `getSolidColor` = **lighten(bgBase, n)**(dark/colorAlgorithm.ts:6-9);bgBase 默认 `#000`、textBase `#fff`(dark/colors.ts:27-28) | colorBgContainer = lighten(#000,8) = **`#141414`**、colorBgElevated = lighten 12 = `#1d1d1d`、colorBgLayout = `#000`、colorBorder = lighten 26、colorShadow = rgba(255,255,255,0.2);**hover/active 档位互换**(dark/colors.ts:13-19:阶5↔6↔7 重映射,Hover 取 palette[7]、Active 取 palette[5],dark/index.ts:33-44);colorPrimaryBg 改用 border 色(dark/index.ts:59-61) |
| compact | `theme.compactAlgorithm` | 以 fontSizeSM(12) 为新字阶基准、controlHeight −4(compact/index.ts:11-24) | controlHeight **28**(SM 21/XS 14/LG 35)、字阶整体下移一档、genCompactSizeMapToken 缩间距 |

- 算法可叠加:`algorithm: [theme.darkAlgorithm, theme.compactAlgorithm]`。
- `token.motion: false` → motionDurationFast/Mid/Slow 全部置 `0s`(alias.ts:44-49)。

---

## 3. 动效 Token(时长 + 缓动全量档位)

来源:`themes/seed.ts:48-58` + `themes/shared/genCommonMapToken.ts:8-11` + `theme/interface/seeds.ts:221-263`。**v6.7.1 动效 token 全集 = 3 个时长 + 8 个缓动**(时长由 seed 派生,缓动为 seed 常量):

### 3.1 时长(motionDuration*)——由 motionUnit × N 派生

| Token | 公式(motionBase + motionUnit×N) | 默认值 |
| --- | --- | --- |
| motionDurationFast | 0 + 0.1×1 | **`0.1s`** |
| motionDurationMid | 0 + 0.1×2 | **`0.2s`** |
| motionDurationSlow | 0 + 0.1×3 | **`0.3s`** |
| (motion:false 时) | — | 全部 `0s` |

### 3.2 缓动(motionEase*)——8 条 cubic-bezier seed 常量

| Token | 值 | 典型用途 |
| --- | --- | --- |
| motionEaseInOut | `cubic-bezier(0.645, 0.045, 0.355, 1)` | 通用进出过渡(标准缓动) |
| motionEaseOut | `cubic-bezier(0.215, 0.61, 0.355, 1)` | 进场/显示 |
| motionEaseOutCirc | `cubic-bezier(0.08, 0.82, 0.17, 1)` | 快速展开(圆弧缓出) |
| motionEaseInOutCirc | `cubic-bezier(0.78, 0.14, 0.15, 0.86)` | 圆弧进出 |
| motionEaseOutBack | `cubic-bezier(0.12, 0.4, 0.29, 1.46)` | 回弹进场 |
| motionEaseInBack | `cubic-bezier(0.71, -0.46, 0.88, 0.6)` | 回缩出场 |
| motionEaseInQuint | `cubic-bezier(0.755, 0.05, 0.855, 0.06)` | 五次幂缓入(急收) |
| motionEaseOutQuint | `cubic-bezier(0.23, 1, 0.32, 1)` | 五次幂缓出(急出缓停) |

### 3.3 动效组件库(`components/style/motion/`)
- 预设动效族:`fade` / `zoom` / `move` / `slide` / `collapse` + `motion.ts`(通用注册器)与 `wave`(按钮涟漪,可经 ConfigProvider `wave.disabled` 关闭);组件动效统一消费上述时长/缓动 token(如 `style/motion/zoom.ts:210` 按 `zoom-big-fast`/`zoom-big` 分别取 motionDurationFast/Mid)。
- Typography.Text `shimmer`(6.7.0 新增)duration 默认 1s(typography md:210)。

---

## 4. 24 部件 ↔ antd 组件规格逐项核对

> 说明:以下默认值全部核对自 **antd 6.7.1** 各组件 `components/<name>/index.zh-CN.md`(GitHub tag `6.7.1`,即 ant.design 在线文档同源),关键项另经源码 `.tsx` 复核。v5→v6 命名/默认值变化在第 5 章汇总。「-」表示官方文档默认值列为空。

### 4.1 Button · https://ant.design/components/button-cn
源码:`components/button/index.zh-CN.md:69-91` + `button.tsx:184-227`
- `type`:语法糖。`primary|dashed|link|text|default`,默认 **`default`**;`type="primary"` ≡ `color="primary" + variant="solid"`。
- `variant`(5.21.0+):`outlined|dashed|solid|filled|text|link`,默认 **`-`**(未显式配置时经 `useVariant` 落到 **`outlined`**,button.tsx:185-188;仅设 `variant="solid"` 时 color 自动补 `primary`,button.tsx:206-208)。
- `color`(5.21.0+):`default|primary|danger|PresetColors13色`,variant=solid 时默认 `primary`;`danger` 为语法糖,设 color 以后者为准。
- `shape`:`default|circle|round`,默认 **`default`**;`size`:`large|medium|small`,默认 **`medium`**(⚠️ v5 为 `large|middle|small` 默认 `middle`,已对 5.27.1 tag 核实)。
- `htmlType`:`submit|reset|button` 默认 **`button`**;`loading`:`boolean|{delay,icon}` 默认 **false**;`icon`/`iconPlacement`:`start|end` 默认 **`start`**。
- `autoInsertSpace`:默认 **`true`**(双汉字自动加空格);`block`/`ghost`/`danger`/`disabled` 默认均 **false**。
- PresetColors 枚举:blue/purple/cyan/green/magenta/pink/red/orange/yellow/volcano/geekblue/lime/gold。
- 推荐属性顺序(官方):`type -> shape -> size -> loading -> disabled`。

### 4.2 Icon · https://ant.design/components/icon-cn
源码:`components/icon/index.zh-CN.md:39-51`
- 4.0 起不内置,独立包 **`@ant-design/icons`**(v6 需配 icons 6.x)。
- 通用图标:`spin` 默认 **false**;`rotate` number 默认 `-`;`style`/`className`;`twoToneColor`:`string|[string,string]`(双色图标主/次色)。
- 三主题后缀:`Outlined` / `Filled` / `TwoTone`;`setTwoToneColor()/getTwoToneColor()` 全局主色。
- 自定义:`component`(自定义 svg 组件)、`createFromIconfontCN({ scriptUrl })`;注入属性只读值:`fill=currentColor`、`width/height=1em`。

### 4.3 Tag · https://ant.design/components/tag-cn
源码:`components/tag/index.zh-CN.md:40-53`
- `variant`(6.0.0+):`filled|solid|outlined`,默认 **`filled`**(⚠️ v5 为 `bordered: boolean` 默认 true,已废弃)。
- `color`:标签色(预设色名或任意色);variant=solid 时默认 **`default`**。
- `closable`:`boolean|{closeIcon & aria-*}` 默认 **false**;`closeIcon` 默认 **false**;`onClose` 回调;`icon`;`href/target`(渲染成 `<a>`);`disabled` 默认 false(6.0.0)。
- `Tag.CheckableTag`:`checked` 默认 false;`CheckableTagGroup`(6.x):`multiple`/`options`/`value` 受控组。

### 4.4 Typography · https://ant.design/components/typography-cn
源码:`components/typography/index.zh-CN.md:39-210`
- `Text`:`type`:`secondary|success|warning|danger` 默认 `-`;`code/delete/disabled/editable/ellipsis/italic/keyboard/mark/strong/underline/shimmer` 默认均 **false**;`copyable`:`boolean|copyable` 默认 **false**。
- `Title`:`level`:`1|2|3|4|5` 默认 **1**(对应 fontSizeHeading1..5 = 38/30/24/20/16)。
- `Paragraph`:同 Text;`ellipsis` 支持 `rows/expandable('collapsible')/suffix/symbol/tooltip/defaultExpanded/expanded/onEllipsis`;`symbol` 默认「展开/收起」。
- `copyable`:tooltips 默认 **`['复制','复制成功']`**;tabIndex 0;format `text/plain|text/html`。
- `editable`:icon 默认 `<EditOutlined/>`、tooltip 默认「编辑」、triggerType 默认 `['icon']`、enterIcon `<EnterOutlined/>`。
- `shimmer`(6.7.0):duration 默认 **1**(秒)。

### 4.5 Input · https://ant.design/components/input-cn
源码:`components/input/index.zh-CN.md:52-185`
- `variant`(5.13.0+):`outlined|borderless|filled|underlined`,默认 **`outlined`**;`type` 默认 **`text`**;`size`:`large|medium|small` 默认 `-`。
- `allowClear`:`boolean|AllowClearConfig` 默认 `-`(可全局配置;clearIcon/label/tabIndex 0);`showCount` 默认 **false**;`count`:{max,strategy,show,exceedFormatter}(max 超出标红不截断)。
- `status`:`error|warning`;`prefix/suffix`;`onPressEnter/onClear`。
- `TextArea`:`autoSize` 默认 **false**;`Search`:`enterButton` 默认 false、`loading` false;`Password`:`visibilityToggle` 默认 **true**;`OTP`(5.16.0+):`length` 默认 **6**、`mask` 默认 false、size 默认 medium。
- 方法:`focus(option?: {preventScroll, cursor: 'start'|'end'|'all'})`、`blur()`。

### 4.6 Select · https://ant.design/components/select-cn
源码:`components/select/index.zh-CN.md:62-131`
- `mode`:`multiple|tags`,默认 **`-`**(单选);`variant` 默认 **`outlined`**;`size`:`large|medium|small` 默认 **`medium`**。
- `allowClear` 默认 **false**;`showSearch`:**单选 false / 多选 true**;`filterOption` 默认 **true**;`defaultActiveFirstOption` 默认 **true**。
- `listHeight` 默认 **256**;`popupMatchSelectWidth` 默认 **true**;`placement` 默认 **`bottomLeft`**;`virtual` 默认 **true**;`optionLabelProp` 默认 **`children`**;`notFoundContent` 默认 **「暂无数据」**。
- `maxCount`(5.13.0,多选上限)/`maxTagCount`(`number|responsive`)/`tokenSeparators`;`fieldNames` 默认 `{label,value,options,groupLabel:label}`;`labelInValue` 默认 false;`getPopupContainer` 默认 `() => document.body`。
- 后缀 `suffix` 默认 `<DownOutlined/>`;loadingIcon `<LoadingOutlined spin/>`;menuItemSelectedIcon `<CheckOutlined/>`。

### 4.7 Switch · https://ant.design/components/switch-cn
源码:`components/switch/index.zh-CN.md:33-47`(在线页 WebFetch 复核)
- `checked` / `defaultChecked` 默认均 **false**;`value`/`defaultValue` 为 5.12.0 别名。
- `size`:`medium|small`,默认 **`medium`**(⚠️ v5 为 `default|small` 默认 `default`)。
- `loading` 默认 **false**;`disabled` false;`checkedChildren`/`unCheckedChildren`;`onChange(checked,event)`/`onClick`。
- 方法:focus/blur;Form 用法需 `valuePropName="checked"`(值属性是 checked 非 value)。

### 4.8 Checkbox · https://ant.design/components/checkbox-cn
源码:`components/checkbox/index.zh-CN.md:37-85`
- `checked` 默认 **false**;`defaultChecked` false;`disabled` false;`indeterminate` 默认 **false**(只控样式,半选态)。
- `Checkbox.Group`:`defaultValue`/`value` 默认 **`[]`**;`options` 默认 `[]`(string[]|number[]|{label,value,disabled}[]);整组 `disabled` false;`name`。

### 4.9 DatePicker · https://ant.design/components/date-picker-cn
源码:`components/date-picker/index.zh-CN.md:53-183`
- 形态:`picker`:`date|week|month|quarter|year`,默认 **`date`**;另有 RangePicker。
- `allowClear` 默认 **true**;`variant` 默认 `outlined`;`placement` 默认 `bottomLeft`;`order`(范围排序)默认 **true**;`preserveInvalidOnBlur` 默认 false;`inputReadOnly` 默认 false;`disabled` false。
- `size` 默认 `-`:**32px**,large=40px,small=24px(官方文档明示三个高度)。
- `minDate/maxDate`(5.14.0)、`presets` 快捷区间、`cellRender`、`needConfirm`、`mode`(`time|date|month|year|decade`)、`format`(dayjs 格式);`getPopupContainer` 默认 body 上新建 div;`previewValue` 默认 hover(6.0)。
- 国际化:默认 en-US,经 ConfigProvider locale 挂 zh_CN;依赖 dayjs。

### 4.10 Message(Toast)· https://ant.design/components/message-cn
源码:`components/message/index.zh-CN.md:34-117`(在线页 WebFetch 复核)
- 五个语义方法:`message.success/error/info/warning/loading(content, [duration], onClose)`;promise 接口 `then(afterClose)`。
- `duration`:自动关闭延时(秒),默认 **`3`**;**0 = 不自动关闭**(两处表格一致)。
- `pauseOnHover` 默认 **true**;`icon`/`key`/`onClick`/`onClose`;`classNames/styles`(6.0)。
- `message.config`:`top` 默认 **8**、`duration` 默认 3、`maxCount` 默认 `-`(不限制)、`getContainer` 默认 `() => document.body`、`prefixCls` 默认 `ant-message`、`rtl` false、`stack`(6.4.0 堆叠折叠)默认 false。
- ⚠️ 静态方法不生效于 ConfigProvider(theme/locale/prefixCls);需 context 时用 `message.useMessage()` + contextHolder,或 `App` 包裹组件。

### 4.11 Modal · https://ant.design/components/modal-cn
源码:`components/modal/index.zh-CN.md:50-133`
- `width`:`string|number|Breakpoint`,默认 **`520`**;`zIndex` 默认 **1000**;`centered` 默认 false。
- `okText` 默认 **「确定」**、`cancelText` 默认 **「取消」**、`okType` 默认 **`primary`**;`confirmLoading` false。
- `open` 默认 false(受控);`closable`:`boolean|ClosableType` 默认 **true**;`closeIcon` 默认 `<CloseOutlined/>`;`mask`:`boolean|{enabled,blur,closable}` 默认 **true**;`maskClosable`(已废弃→`mask.closable`)默认 true;`keyboard`(esc)默认 **true**;`getContainer` 默认 `document.body`;`destroyOnHidden` 默认 false(5.25.0 取代 destroyOnClose);`focusable`:{trap, focusTriggerAfterClose};`scrollLock`(6.5.0)默认 **true**;`loading` 骨架屏;`footer` 默认「确定/取消按钮组」。
- `Modal.method()`(info/success/error/warning/confirm):`width` 默认 **416**、`maskClosable` 默认 **false**、`closable` 默认 **false**、`icon` 默认 `<ExclamationCircleFilled/>`、`autoFocusButton`→`focusable.autoFocusButton` 默认 **`ok`**;返回 {destroy, update, then}。

### 4.12 Drawer · https://ant.design/components/drawer-cn
源码:`components/drawer/index.zh-CN.md:50-87`
- `placement`:`top|right|bottom|left`,默认 **`right`**;`size`:`default|large|number|string`,默认 **`default`**(**378px**;large **736px**);旧 `width/height` 默认 378(已废弃)。
- `zIndex` 默认 **1000**;`mask` 默认 true;`maskClosable` 默认 true;`closable` 默认 true(可 `{placement:'start'|'end'}` 定位置);`keyboard` 默认 true;`push`(多层推挤)默认 **`{distance: 180}`**;`getContainer` 默认 body;`destroyOnHidden` false;`loading` 骨架屏 false;`extra`/`footer`;`resizable`(6.x)+ `maxSize`;`drawerRender`。

### 4.13 Alert · https://ant.design/components/alert-cn
源码:`components/alert/index.zh-CN.md:43-65`
- `type`:`success|info|warning|error`,默认 **`info`**;**banner 模式下默认 `warning`**。
- `showIcon` 默认 **false**;**banner 模式下默认 true**。
- `closable` 默认 **false**(可对象化 closeIcon/onClose/afterClose/disabled);`banner` 默认 false;`variant`(6.4.0):`outlined|filled` 默认 **`outlined`**;`title`(v6 取代 message)/`description`/`action`/`icon`。
- `Alert.ErrorBoundary`:title/description 默认展示原生错误信息/堆栈。

### 4.14 Tooltip · https://ant.design/components/tooltip-cn
源码:`components/tooltip/index.zh-CN.md:42-47` + `components/tooltip/shared/sharedProps.zh-CN.md:4-26`(与 Popover/Popconfirm 共享)
- `title`:`ReactNode|()=>ReactNode`;`color`(背景色,文字自适应反色)。
- 共享:`placement` 12 向,默认 **`top`**;`trigger`:`hover|focus|click|contextMenu`,默认 **`hover`**;`arrow`:`boolean|{pointAtCenter}` 默认 **true**;`mouseEnterDelay` / `mouseLeaveDelay` 默认均 **0.1s**;`open` 默认 false;`defaultOpen` false;`autoAdjustOverflow` 默认 **true**;`getPopupContainer` 默认 body;`fresh`(关闭时是否缓存内容)默认 false;`destroyOnHidden` false。
- `ConfigProvider tooltip.unique`(v6):同屏唯一 Tooltip。

### 4.15 Table · https://ant.design/components/table-cn
源码:`components/table/index.zh-CN.md:125-238`
- `size`:`large|medium|small`,默认 **`large`**;`bordered` 默认 **false**;`showHeader` 默认 **true**;`rowKey` 默认 **`key`**;`rowHoverable` 默认 **true**(5.16.0);`loading` false;`virtual`(5.9.0)默认 `-`。
- `sortDirections` 默认 **`['ascend','descend']`**;`showSorterTooltip` 默认 **`{target:'full-header'}`**;`tableLayout` 默认 `-`,**固定表头/列或 column.ellipsis 时自动 `fixed`**;`getPopupContainer` 默认 `() => TableHtmlElement`;`column`(6.4.0)统一列配置。
- Column:`align` 默认 `left`;`ellipsis` 默认 false(开启即 tableLayout fixed);`filterMode` 默认 `menu`;`filterMultiple` 默认 true;`fixed`:`boolean|'start'|'end'` 默认 false;`minWidth`(5.21,tableLayout=auto 时)。
- `pagination`(object|false):配置项同 Pagination 组件;`rowSelection`/`expandable`/`summary`/`sticky`;`scroll`。
- ref:`scrollTo({index|key, top|offset, align: 'start'|'center'|'end'|'nearest'})`(5.11.0+,虚拟滚动不支持 center)。

### 4.16 Avatar · https://ant.design/components/avatar-cn
源码:`components/avatar/index.zh-CN.md:37-64`
- `size`:`number|large|medium|small|响应式对象`,默认 **`medium`**;`shape`:`circle|square` 默认 **`circle`**;`gap`(字符距边界)默认 **4**;`draggable` 默认 **true**;`src`/`srcSet`/`alt`/`crossOrigin`/`onError`(返回 false 关闭 fallback;fallback 优先级 icon > children)。
- `Avatar.Group`:`max`:{count, style, popover}(5.18.0;旧 maxCount/maxPopoverPlacement 已废弃);组内 size/shape 同默认。

### 4.17 Badge · https://ant.design/components/badge-cn
源码:`components/badge/index.zh-CN.md:42-57` + `Badge.tsx:39-112`(在线页 WebFetch 复核)
- `count`:`ReactNode`(数字;为 0 时默认隐藏);`overflowCount`:封顶值,默认 **`99`**,超过显示 `99+`(源码 Badge.tsx:70 `overflowCount = 99` 缺省、:112 拼接 `+`)。⚠️ 任务所述 `maxCount` 命名:6.7.1 与 5.27.1 文档均为 `overflowCount`,**`maxCount` 在当前两版文档/源码中均不存在(未证实)**。
- `showZero` 默认 **false**;`dot` 默认 **false**;`color`;`offset:[number,number]`;`size`:`medium|small`(v5.27 为 `default|small`);`status`:`success|processing|default|error|warning`;`text`(配 status);`title`(6.5.0,设 null/false 移除原生 tooltip)。
- `Badge.Ribbon`:`placement`:`start|end` 默认 **`end`**(随 RTL);`color`/`text`。

### 4.18 Card · https://ant.design/components/card-cn
源码:`components/card/index.zh-CN.md:41-68`
- `variant`:`outlined|borderless`,默认 **`outlined`**(取代 v5 `bordered:true`);`size`:`medium|small` 默认 **`medium`**。
- `title`/`extra`/`cover`/`actions`/`footer`;`hoverable` 默认 **false**(Card.Grid 内默认 **true**);`loading` 占位默认 false;`type='inner'` 内嵌卡;`tabList`+`tabProps`+`onTabChange`,`defaultActiveTabKey` 默认第一个页签。
- `Card.Meta`:avatar/title/description。

### 4.19 Menu(导航)· https://ant.design/components/menu-cn
源码:`components/menu/index.zh-CN.md:48-140`
- `mode`:`vertical|horizontal|inline`,默认 **`vertical`**;`theme`:`light|dark` 默认 **`light`**;`triggerSubMenuAction`:`hover|click` 默认 **`hover`**。
- `inlineIndent` 默认 **24**;`multiple` 默认 **false**;`selectable` 默认 **true**;`subMenuOpenDelay` 默认 **0**、`subMenuCloseDelay` 默认 **0.1s**;`inlineCollapsed`;`overflowedIndicator` 默认 `<EllipsisOutlined/>`;`items`(4.20.0+ ItemType[]:item/submenu/group/divider);`tooltip`(6.3.0,折叠态提示)。
- 事件:`onClick({key,keyPath,domEvent,itemData})`/`onSelect`/`onDeselect`/`onOpenChange`;`popupRender` 自定义子菜单弹层。

### 4.20 Tabs · https://ant.design/components/tabs-cn
源码:`components/tabs/index.zh-CN.md:49-106`
- `type`:`line|card|editable-card`,默认 **`line`**;`size`:`large|medium|small` 默认 **`medium`**;`tabPlacement`(v6 取代 tabPosition):`top|end|bottom|start` 默认 **`top`**。
- `animated` 默认 **`{inkBar: true, tabPane: false}`**;`centered` 默认 false;`items`(4.23.0)默认 `[]`;`destroyOnHidden` false。
- `indicator`:{size|fn, align: start|center|end}(5.13.0);`more` 默认 `{icon: <EllipsisOutlined/>, trigger:'hover'}`;`addIcon` `<PlusOutlined/>`/`removeIcon` `<CloseOutlined/>`(editable-card);`tabBarGutter`;`onTabClick/onEdit/onTabScroll`。
- TabItemType:`label/icon/key/children/closable(默认 true)/disabled/forceRender`。

### 4.21 Breadcrumb · https://ant.design/components/breadcrumb-cn
源码:`components/breadcrumb/index.zh-CN.md:36-76`
- `items`(5.3.0+,RouteItemType:{title, href|path(互斥), menu, onClick, dropdownProps});`separator` 默认 **`/`**(6.0.0 起可全局配置);`itemRender(route,params,routes,paths)`(配合 react-router);`params`。
- SeparatorType:`{type:'separator', separator}`(5.3.0);`dropdownIcon` 默认 `<DownOutlined/>`(6.2.0)。

### 4.22 Dropdown · https://ant.design/components/dropdown-cn
源码:`components/dropdown/index.zh-CN.md:51-69`
- `trigger`:`Array<click|hover|contextMenu>`,默认 **`['hover']`**;`placement`:12 向(6.5.0 扩展左右向),默认 **`bottomLeft`**。
- `arrow`:`boolean|{pointAtCenter}` 默认 **false**;`autoAdjustOverflow` 默认 **true**;`menu`:[MenuProps](https://ant.design/components/menu-cn)(声明式);`getPopupContainer` 默认 body;`destroyOnHidden` false;`disabled`;`popupRender`;`onOpenChange(open, {source: 'trigger'|'menu'})`。

### 4.23 Empty · https://ant.design/components/empty-cn
源码:`components/empty/index.zh-CN.md:30-68`
- `image` 默认 **`Empty.PRESENTED_IMAGE_DEFAULT`**(121×116);内置 `Empty.PRESENTED_IMAGE_SIMPLE`(55×35);`description` 默认 `-`(locale 提供「暂无数据」文案);`styles.image`(取代 imageStyle)。
- 用法:`<Empty><Button>创建</Button></Empty>` 子元素作为操作区;无状态 Empty 组件(v5.23+)。

### 4.24 Watermark · https://ant.design/components/watermark-cn
源码:`components/watermark/index.zh-CN.md:34-68`
- `content`:`string|WatermarkText|(string|WatermarkText)[]`(6.5.0 支持逐行 font);`image`(2x/3x 图,优先级高于 content)。
- `rotate` 默认 **`-22`**(度);`width` 默认 **120**、`height` 默认 **64**;`gap` 默认 **`[100, 100]`**;`offset` 默认 **`[gap/2, gap/2]`**;`zIndex` 默认 **9**(浮层体系之下);`inherit` 默认 **true**(传导给 Modal/Drawer 等弹层);`onRemove`(6.0,DOM 篡改被移除时)。
- `font`:`color` 默认 **rgba(0,0,0,.15)**、`fontSize` 16、`fontWeight` 400、`fontFamily` `sans-serif`、`fontStyle` normal、`textAlign` center(5.10.0)。
- 防移除:MutationObserver 监听 DOM 变更自动重绘;5.18.0 起容器强制 `overflow: hidden` 防高度归零隐藏(可覆盖)。

---

## 5. 版本差异与「未找到 / 未证实」清单

### 5.1 v5 → v6 关键变化(已双源核实)
| 项 | v5(以 5.27.1 tag 核实) | v6.7.1(本次基准) |
| --- | --- | --- |
| Button size | `large\|middle\|small`,默认 **middle** | `large\|medium\|small`,默认 **medium** |
| Switch size | `default\|small` 默认 default | `medium\|small` 默认 **medium** |
| Tag 形态 | `bordered: boolean`(默认 true) | `variant: filled\|solid\|outlined`(默认 **filled**) |
| Badge size | `default\|small` | `medium\|small` |
| Modal/Drawer/Tabs 等 | destroyOnClose / tabPosition | destroyOnHidden / tabPlacement;Alert message→title;大量 `dropdown*`/`overlay*` 属性 → `popup*`/`classNames.popup` |
| 主题 | CSS-in-JS 运行时 | 新增 `zeroRuntime` + `antd/dist/antd.css`;`size` 命名全面 middle→medium |
| 图标包 | @ant-design/icons 5.x | 需 icons 6.x(否则 layer 模式下样式异常,icon.md FAQ) |

### 5.2 未找到 / 未证实
1. **`docs/spec/global`**:6.7.1 仓库无此文件,在线页 **404**(WebFetch 实测);v5 的「全局样式」总览内容已并入 colors/font/layout/dark 分页。❌ 未找到
2. **`docs/spec/near-future`(未来再设计)**:6.7.1 仓库已移除(404);在线状态未核对。❌ 未找到(仓库)
3. **Badge `maxCount`**:任务描述使用该名;当前 6.7.1 与 5.27.1 文档、6.7.1 源码均为 `overflowCount`(默认 99),`maxCount` 未找到。❌ 未证实
4. **motionDurationVeryFast / VerySlow 等更长档位**:v6.7.1 interface/seeds + maps 中仅有 Fast/Mid/Slow 三档;v5 早期社区文档曾出现的更多档位在本版不存在。❌ 未找到
5. **`sizeUnit: 8`**:设计规范(布局页)讲 8 倍数网格,但 seed 实际为 `sizeUnit: 4`;两者并存(规范值 vs 实现值),按源码如实记录。⚠️ 已澄清
6. Empty `description` 无显式默认值列(实际文案由 locale「暂无数据」提供,Select notFoundContent 同源)。⚠️ 实现层默认
7. 24 组件中 DatePicker 的 RangePicker 专属属性(defaultValue 开区间语义等)只节选了共性与要点,未逐条全录(官方文档 344 行,本报告以 32 个部件默认值需求为限)。

---

## 6. 10 条签名巧思(antd 体系最值得借鉴的细节)

1. **自然指数字阶**:10 档字号由 `fontSize × e^(i/5)` 生成、行高恒为 `(size+8)/size`——一套公式而非一组拍脑袋数字,主字号 14/22 只是曲线上的锚点。
2. **三层 Token 分权**:Seed(设计师意图)→ Map(派生规则)→ Alias(开发者语义),注释即文档;改一个 `borderRadius: 6`,自动联动 8/4/2/4 五档圆角。
3. **motionUnit 是动效的最小音符**:时长只有 0.1/0.2/0.3s 三档(0.1s × 1/2/3),`motion: false` 一键归零全局动画。
4. **type 是 color × variant 的语法糖**:Button 内部统一归一成一对正交属性,新旧 API 无缝共存且「以后者为准」。
5. **暗色是换算法而非换色板**:中性色按 bgBase 亮度增量生成(#000+8% = #141414),hover/active 在暗色下与浅色互换色阶档位。
6. **语义透明度代替实色**:文字 88/65/45/25%、填充 15/6/4/2%,明暗主题共用同一组透明度,天然适配任意背景。
7. **中文排版默认值化**:Button `autoInsertSpace: true` 双汉字自动加空格;数字推荐 tabular-nums——排版细节成为组件默认行为。
8. **浮层尺寸-层级咬合体系**:Modal 520 / Drawer 378·736 / zIndexPopupBase 1000 / Watermark zIndex 9,尺寸与层级各有基准、互不打架。
9. **数字封顶与零值静默**:Badge `overflowCount: 99` + `showZero: false`,信息密度默认收敛;Message `duration: 3` + `pauseOnHover` 悬停暂停计时。
10. **为正确性自动降级**:Table 在固定表头/列或 column.ellipsis 时自动把 tableLayout 切为 fixed——正确性优先于用户配置,组件替你兜底。

---

## 附:本报告的核对记录(可复现)

```bash
# 版本锚点
curl -s -H "Accept: application/vnd.npm.install-v1+json" https://registry.npmjs.org/antd/latest   # → 6.7.1
curl -s "https://api.github.com/repos/ant-design/ant-design/tags?per_page=5"                       # 匿名限流(改用 raw)
curl -sSL https://raw.githubusercontent.com/ant-design/ant-design/6.7.1/package.json               # → version 6.7.1

# 源码包(41 份 md/ts 直读 + 全仓 grep)
curl -sSL -o repo.tar.gz https://codeload.github.com/ant-design/ant-design/tar.gz/refs/tags/6.7.1
tar -xzf repo.tar.gz   # → ant-design-6.7.1/
grep -rn "motionDurationFast" components/theme/themes/shared/genCommonMapToken.ts  # → 0.1s 公式

# 在线页交叉验证(WebFetch)
https://ant.design/components/{badge,button,message,switch}-cn       # 默认值逐项一致
https://ant.design/docs/spec/global-cn                                # → 404(如实记录)

# v5 对照
curl -sSL https://raw.githubusercontent.com/ant-design/ant-design/5.27.1/components/button/index.zh-CN.md   # size 默认 middle
curl -sSL https://raw.githubusercontent.com/ant-design/ant-design/5.27.1/components/badge/index.zh-CN.md    # overflowCount 99
```

(报告完)
