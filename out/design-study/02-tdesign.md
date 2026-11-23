# TDesign 设计语言深度研究

> 研究日期:2026-11-21 | 研究对象:腾讯 TDesign(tdesign.tencent.com)
> 方法说明:官网为 React SPA,直接抓取页面 URL 仅返回应用壳(已实测 `https://tdesign.tencent.com/design/color` 返回空壳),因此全部内容取自**官网与组件库的官方源码仓库**(官网页面源文件即 `Tencent/tdesign` 仓库 `site/src/pages/design/*.vue`,与线上站点同源),token 具体值取自官方样式包 `Tencent/tdesign-common`。所有值均为本次逐文件抓取所得的一手数据,每节标注来源。

**来源文件清单**
- Token 源文件(亮/暗双主题全量 CSS 变量):https://github.com/Tencent/tdesign-common/blob/develop/style/web/theme/ (_light.less / _dark.less / _font.less / _radius.less / _size.less)
- Less 编译变量(动效/z-index/融合阴影):https://github.com/Tencent/tdesign-common/blob/develop/style/web/_variables.less
- 官网设计页源码:https://github.com/Tencent/tdesign/blob/main/site/src/pages/design/ (color.vue / dark.vue / fonts.vue / motion.vue) 与文案 https://github.com/Tencent/tdesign/blob/main/site/src/locales/pages/ (design-basic.ts / design-visual.ts / design-motion-icon.ts)
- 组件 API:https://github.com/Tencent/tdesign-react/blob/develop/packages/components/{tabs,button,tag,card,collapse}/{name}.md
- 组件样式规格:https://github.com/Tencent/tdesign-common/blob/develop/style/web/components/{button,tag,tabs,collapse,card}/ (_var.less / _index.less)
- 官网文档站样式:https://github.com/Tencent/tdesign/blob/main/packages/site-components/src/ (components/td-doc-demo/style.less、components/td-doc-aside/style.less、styles/dark.less)

---

## 一、色彩体系

来源:`_light.less`、`_dark.less`(全量值);`design-visual.ts`(设计原则文案)。线上页:https://tdesign.tencent.com/design/color

### 1.1 色阶结构
每个功能色与品牌色均为 **10 级色阶**(-1 浅 → -10 深);中性灰 **14 级**(为暗色模式分层预留)。官网明言:色阶用 **HCT 色彩空间 + 饱和度/亮度插值拟合曲线**生成,「色彩变化均匀、多色之间亮度均等」;中性色在 CIELab 中按亮度扩展至 14 个,与文字对比度均 >4.5(WCAG2.0 AA)。

### 1.2 品牌色阶(腾讯蓝 Tencent Blue)

| token | 亮色值 | 暗色值 |
|---|---|---|
| `--td-brand-color-1` | #f2f3ff | #1b2f51 |
| `--td-brand-color-2` | #d9e1ff | #173463 |
| `--td-brand-color-3` | #b5c7ff | #143975 |
| `--td-brand-color-4` | #8eabff | #103d88 |
| `--td-brand-color-5` | #618dff | #0d429a |
| `--td-brand-color-6` | #366ef4 | #054bbe |
| `--td-brand-color-7` | **#0052d9(品牌主色)** | #2667d4 |
| `--td-brand-color-8` | #003cab | **#4582e6(暗色品牌主色)** |
| `--td-brand-color-9` | #002a7c | #699ef5 |
| `--td-brand-color-10` | #001a57 | #96bbf8 |

暗色模式品牌主色从 7 号位**换位到 8 号位**(`--td-brand-color: var(--td-brand-color-8)`),hover/active 方向也随之反转:亮色 hover=6(加深邻位)、active=8;暗色 hover=7、active=9(往浅走)。来源:`_light.less` / `_dark.less` 注释段「基础颜色」。
官网标注品牌色对比度 **6.54:1**(design-visual.ts `paletteLabels.blueContrast`)。

### 1.3 功能色(亮/暗对照)

| 语义 | 主 token | 亮色主值 | 暗色主值 | 官网对比度 |
|---|---|---|---|---|
| 成功 `--td-success-color` | = success-5 | #2ba471 | #059465 | 3.16:1 (Green5) |
| 警告 `--td-warning-color` | = warning-5 | #e37318 | #cf6e2d | 3.12:1 (Orange5) |
| 错误 `--td-error-color` | = error-6 | #d54941 | #c64751 | 4.32:1 (Red6) |

完整 10 级(亮色/暗色):
- 错误:`#fff0ed #ffd8d2 #ffb9b0 #ff9285 #f6685d #d54941 #ad352f #881f1c #68070a #490002` / `#472324 #5e2a2d #703439 #83383e #a03f46 #c64751 #de6670 #ec888e #edb1b6 #eeced0`
- 警告:`#fff1e9 #ffd9c2 #ffb98c #fa9550 #e37318 #be5a00 #954500 #713300 #532300 #3b1700` / `#4f2a1d #582f21 #733c23 #a75d2b #cf6e2d #dc7633 #e8935c #ecbf91 #eed7bf #f3e9dc`
- 成功:`#e3f9e9 #c6f3d7 #92dab2 #56c08d #2ba471 #008858 #006c45 #005334 #003b23 #002515` / `#193a2a #1a4230 #17533d #0d7a55 #059465 #43af8a #46bf96 #80d2b6 #b4e1d3 #deede8`
(来源:`_light.less` / `_dark.less`)

### 1.4 状态扩展 token(每色 6 个,亮暗同构)
`{语义}-color-hover / -focus / -active / -disabled / -light / -light-hover`。以品牌色为例:
- 亮色:hover=6、focus=2、active=8、disabled=3、light=1、light-hover=2
- 暗色:hover=7、focus=2、active=9、disabled=3、light=1、light-hover=2
hover/active 的取值方向在暗色下整体反向(向浅色阶移动),这是把「状态=色阶位移」抽象成 token 的关键设计。

### 1.5 灰阶 14 级(两主题共享同一组灰)
`#f3f3f3 #eee #e8e8e8 #ddd #c6c6c6 #a6a6a6 #8b8b8b #777 #5e5e5e #4b4b4b #393939 #2c2c2c #242424 #181818`
注意:亮/暗主题的 `--td-gray-color-1~14` 数值完全相同,**分层语义靠背景 token 的取号方向反转实现**:
- 亮色:页面=gray-2(#eee),容器=#fff,次级容器=gray-1
- 暗色:页面=gray-14(#181818),容器=gray-13(#242424),次级容器=gray-12(#2c2c2c),组件=gray-11(#393939)

背景 token 全集(三层×状态):`--td-bg-color-page / -container(-hover/-active/-select) / -secondarycontainer(-hover/-active) / -component(-hover/-active) / -secondarycomponent(-hover/-active) / -component-disabled`。
特例 `--td-bg-color-specialcomponent`:亮色固定 #fff,暗色 transparent(专供 button/input 多主题适配,注释见 `_light.less`)。

### 1.6 文字色(透明度体系)
| 语义 token | 亮色 | 暗色 |
|---|---|---|
| `--td-text-color-primary` | rgba(0,0,0,90%) | rgba(255,255,255,**90%**) |
| `--td-text-color-secondary` | rgba(0,0,0,60%) | rgba(255,255,255,55%) |
| `--td-text-color-placeholder` | rgba(0,0,0,40%) | rgba(255,255,255,35%) |
| `--td-text-color-disabled` | rgba(0,0,0,26%) | rgba(255,255,255,22%) |
| `--td-text-color-anti` | #fff | #fff |
| `--td-text-color-brand` | brand-7 | brand-8 |
| `--td-text-color-link` | brand-8 | brand-8 |
| `--td-text-color-watermark` | rgba(0,0,0,10%) | rgba(255,255,255,10%) |

官方解释(design-basic.ts `fonts.color.note`):黑底白字的 WebAIM 亮度曲线与白底黑字不同,加透明度后暗底辨识度反而更高,因此**暗色模式刻意把各级透明度调低**(90/55/35/22 vs 亮色的 90/60/40/26)以拉平两种模式的阅读感;文字对比全部满足 ≥4.5:1(AA)。
遮罩:`--td-mask-active` 亮 rgba(0,0,0,60%) / 暗 rgba(0,0,0,40%);`--td-mask-disabled` 亮 rgba(255,255,255,60%) / 暗 rgba(0,0,0,60%)。

### 1.7 三层 token 架构
官网应用指南明确定义:**色板 → 全局语义 Token(@色板)→ 组件 Token(@全局语义)**,三层引用链(design-visual.ts `guideTokens`)。组件层的实现在 `style/web/components/*/_var.less`,如 `@tag-checked-background-color: @brand-color`。

---

## 二、字体与字阶

来源:`_font.less`(token 全量值);design-basic.ts `fonts` 章节(设计公式)。线上页:https://tdesign.tencent.com/design/fonts

### 2.1 字族
- 组件库 token:`--td-font-family: PingFang SC, Microsoft YaHei, Arial Regular`;`--td-font-family-medium: PingFang SC, Microsoft YaHei, Arial Medium`(仅两个字族 token,「粗体」靠独立 medium 字族表达)
- 官网推荐系统栈(design-basic.ts `fonts.family.stack`):`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Source Han Sans CN, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`
- 数字字体:**TCloud Number**(等距表格数字,缩放中保持稳定粗细),表格数据场景专用,官网提供下载。

### 2.2 字号阶梯(17 档,全部 px)
| 组 | token 后缀 | 值 |
|---|---|---|
| link | small/medium/large | 12 / 14 / 16 |
| mark | small/medium | 12 / 14 |
| body(一级字阶) | small/medium/large | 12 / **14(正文)** / 16 |
| title(一级字阶) | small/medium/large/extraLarge | 14 / 16 / 18 / 20 |
| headline(二级字阶) | small/medium/large | 24 / 28 / 36 |
| display(二级字阶) | medium/large | 48 / 64 |

字阶规则(官方文案):一级字阶 **+2px 步进**,桌面最小 12px、移动端 Base 10px;二级字阶按 **+4/+8/+12/+16** 大步长(24/28/36/48/64),服务超大标题与数据展示,「减少没有必要的小步数字号」。

### 2.3 行高:**line-height = font-size + 8**
官方公式(design-basic.ts):国际无障碍标准建议 1.5 倍,但固定倍率在大字号下割裂信息;改为「行高=字号+n,n=8」—— 8 恰好使 14/16px 的行高与 1.5 倍完全一致(21→22、24),全体字号呼吸空间恒定。逐档值:
`link/mark/body small 20 · medium 22 · large 24;title small 22 · medium 24 · large 26 · extraLarge 28;headline small 32 · medium 36 · large 44;display medium 56 · large 72`
验证:14+8=22 ✅ 20+8=28 ✅ 36+8=44 ✅ 64+8=72 ✅ 全档吻合。

### 2.4 字重:只保留 400 / 600 两档
官方理由:Windows 下 <600 的字重全部回退为常规体,macOS 才能区分 400/500/600;跨端一致性优先,故只设两档。且**粗体通过复合 token 内联**,如 `--td-font-title-medium: 600 16px/24px PingFang SC…`(font/line-height/weight 三合一 shorthand token);body/link 不带字重(400)。

---

## 三、间距与圆角

来源:`_size.less`、`_radius.less`。

### 3.1 基础刻度 `--td-size-1~16`(全部偶数,2px 起步)
`2 4 6 8 12 16 20 24 28 32 36 40 48 56 64 72`

### 3.2 组件高度 `--td-comp-size-*`
| token | 引用 | 值 |
|---|---|---|
| xxxs | size-6 | 16 |
| xxs | size-7 | 20 |
| xs | size-8 | 24 |
| s | size-9 | 28 |
| m | size-10 | **32(默认控件高)** |
| l | size-11 | 36 |
| xl | size-12 | 40 |
| xxl | size-13 | 48 |
| xxxl | size-14 | 56 |
| xxxxl | size-15 | 64 |
| xxxxxl | size-16 | 72 |

### 3.3 组件内边距/间距 token
- 弹层整体边距 `--td-pop-padding-s~xxl`:4/6/8/12/16
- 水平内边距 `--td-comp-paddingLR-xxs~xxl`:2/4/**8(s)/12(m)/16(l)/**24(xl)/32(xxl)
- 垂直内边距 `--td-comp-paddingTB-xxs~xxl`:同上同值(2/4/8/12/16/24/32)
- 组件间距 `--td-comp-margin-xxs~xxxxl`:2/4/8/12/16/20/24/32/40
- 旧 spacer 体系(标注 deprecated):`@spacer: 8px` 及 ×0.5/0.75/1.5/整数倍(4/6/12/8/16/24/32/40…),仍在 `_variables.less` 中保留 —— 说明 TDesign 早期以 8px 栅格起步,后改为「显式枚举 2px 刻度」的更细粒度方案。

### 3.4 圆角 7 档 `--td-radius-*`
| token | 值 | 用途示例 |
|---|---|---|
| small | 2px | tabs 指示条容器 |
| default | **3px**(默认) | button、tag(square)、nav item |
| medium | 6px | card、官网 demo 卡 |
| large | 9px | — |
| extraLarge | 12px | tag(round 形状) |
| round | 999px | capsule 按钮 |
| circle | 50% | 圆形 |

---

## 四、阴影与层级

来源:`_light.less` / `_dark.less`(阴影值);`_variables.less:347-358`(z-index);官网 `styles/dark.less`(暗色边界工艺)。

### 4.1 三层投影(物理光模型:2~3 组阴影叠加)
| token | 亮色值 | 用途 |
|---|---|---|
| `--td-shadow-1` | `0 1px 10px rgba(0,0,0,5%), 0 4px 5px rgba(0,0,0,8%), 0 2px 4px -1px rgba(0,0,0,12%)` | 下层/表格 hover |
| `--td-shadow-2` | `0 3px 14px 2px …5%, 0 8px 10px 1px …6%, 0 5px 5px -3px …10%` | 中层:下拉/气泡/选择器 |
| `--td-shadow-3` | `0 6px 30px 5px …5%, 0 16px 24px 2px …4%, 0 8px 10px -5px …8%` | 上层:全局提示/消息通知 |

暗色版(比例整体加重、模糊收敛):shadow-1 `0 4px 6px 6% + 0 1px 10px 8% + 0 2px 4px 12%`;shadow-2 `0 8px 10px 12% + 0 3px 14px 10% + 0 5px 5px 16%`;shadow-3 `0 16px 24px 14% + 0 6px 30px 12% + 0 8px 10px 20%`。

### 4.2 内描边阴影(0.5px 精细线)
`--td-shadow-inset-top/right/bottom/left: inset 0 .5px 0 #dcdcdc`(暗色为 #5e5e5e)。另有融合 token `@shadow-2-inset / @shadow-3-inset`(外投影+四向内描边合并),用于弹窗类组件「阴影+描边」复合质感。

### 4.3 z-index 阶梯(`_variables.less:347-358`)
| 变量 | 值 | | 变量 | 值 |
|---|---|---|---|---|
| @z-index-back-top | 300 | | @z-index-Popup | 5500 |
| @z-index-affix | 500 | | @z-index-Tooltip | 5600 |
| @z-index-drawer | 1500 | | @z-index-message | 6000 |
| @z-index-dialog | 2500 | | @z-index-Notification | 6000 |
| @z-index-image-viewer | 3000 | | @z-index-dragging | 6500 |
| @z-index-loading | 3500 | | @z-index-guide | 999999 |

特点:不按 1000 等差,而是**按组件被遮挡关系定距**(dialog 2500 → popup 5500 大跳档,因为 popup 是 dialog 内部元素,必须压过一切 dialog)。

### 4.4 暗色站点「用描边不用投影」
官网暗色样式(`site-components/src/styles/dark.less`):header/footer/aside/table 的边界全部改用 **inset box-shadow 1px 描边**(`inset 0 -1px 0 #4b4b4b` 等),暗色下阴影几乎不可见,层级靠 1px 内描边 + 背景(#181818→#242424→#2c2c2c→#383838→#4b4b4b)的明度差表达。配套:`img { filter: brightness(.85) }` 全局压暗图片。

---

## 五、动效 Token

来源:官网动效页源码 `site/src/pages/design/motion.vue`(token 表数据即线上页面内容)、design-motion-icon.ts `motion` 章节(原则/模式/编排全文)、`_variables.less:339-344`。线上页:https://tdesign.tencent.com/design/motion

### 5.1 时长 6 档(双端两套)
| token | 移动端 | 桌面端 | 官方用途 |
|---|---|---|---|
| base | 100ms | 200ms | 微观变换、淡入淡出 |
| moderate | 120ms | 240ms | 折叠面板/弹出框/消息;桌面:锚点/选项卡/下拉/树 |
| slow | 140ms | 280ms | 选择器/抽屉/选项卡弹出层;桌面:抽屉/消息通知/全局提示 |

- 制定依据(官方原文):视力持续感知约 100ms,移动端目视距离近则运动感知强,故从 100ms 起算;桌面从 200ms 起算,**公式:桌面端时长 = 移动端 × 2**。
- 合理区间:桌面 200~600ms,移动 100~400ms;低于 100ms 感知不到,1000ms 到达感知极限。
- 代码变量(`_variables.less:342-344`):`@anim-duration-base: 0.2s; @anim-duration-moderate: 0.24s; @anim-duration-slow: 0.28s`。
- 动态时值:官网强调「只有按元素尺寸与运动距离计算时长才是最优解」,为不同尺寸元素提供时长计算器。

### 5.2 缓动 3+1 条(全部 Cubic)
| token | CSS 值 | 用途 |
|---|---|---|
| standard `@anim-time-fn-easing` | `cubic-bezier(0.38, 0, 0.24, 1)` | 元素在画面内运动 |
| ease-out `@anim-time-fn-ease-out` | `cubic-bezier(0, 0, 0.15, 1)` | 元素入画 |
| ease-in `@anim-time-fn-ease-in` | `cubic-bezier(0.82, 0, 1, 0.9)` | 元素出画 |
| linear | `linear` | 与其他运动并行的透明度渐变 |

Elastic 仅限卡通插图等非 UI 元素。

### 5.3 运动模式(宏观三分类)
一切会动的元素分**微观**(icon 微动、Checkbox 勾选、输入框抖动)与**宏观**;宏观归三类:**轴运动**(X=横向 Tab、Y=纵向 Tab、Z=弹层层级,表达空间关系)、**容器转换**(共享容器的形变过渡)、**淡入淡出**(前后无空间/容器关联时)。编排禁令:双轴运动禁止直线行进(y 轴以平缓开始、陡峭结束模拟克服重力);非卡通单轴禁用 elastic;页面首屏禁止顺序动画(用骨架屏或淡入)。
品牌融入:点击反馈沿腾讯品牌「**斜 8 度**」轨迹运动(motion.vue `brand` 章节)。

---

## 六、组件规范精读(Tabs / Collapse / Tag / Button / Card)

说明:当前版本文档站组件页为「示例 + API」双 tab(td-doc-tabs 切换),旧版 md 中的「何时使用」段落已不存在于新版源码(已核实 `packages/components/*/[name].md` 全文仅含 API 表)。以下结构/状态/尺寸取自官方 API 文档 + 组件样式变量(`_var.less`)+ 组件样式实现(`_index.less`),均为一手源码数据。组件语义(如 default/medium)以默认值描述。

### 6.1 Button(来源:tdesign-react `button.md`;common `button/_var.less`、`_index.less`)
线上页:https://tdesign.tencent.com/react/components/button
- **属性三维**:theme(语义色:default/primary/danger/warning/success,默认无 theme=灰)× variant(形式:base 实底/outline 线框/dashed 虚线/text 文字,默认 base)× shape(rectangle/square/round/circle,默认 rectangle)+ ghost 镂空、block 块级、loading、disabled、href(有值时渲染 `<a>`)、tag(可换 a/div 渲染,解决 disabled button 无法弹 popup 的问题)。
- **尺寸规格**(换算成 px):
  | 尺寸 | 高度 | 水平 padding | 字号 | 图标字号 |
  |---|---|---|---|---|
  | small | 24 | 8 | 12 | 14 |
  | medium(默认) | 32 | 16 | 14 | 16 |
  | large | 40 | 24 | 16 | 18 |
  - 图标与文字间距恒 8px(`@btn-icon-text-margin-left: @spacer`);圆角 3px;round 形状=高度的一半(24/32/40 → 12/16/20);square/circle 形状=宽高相等、padding 0;边框 1px。
- **状态色映射**(_var.less 全表):primary 系 hover/active/disabled 分别绑 `brand-color-hover/-active/-disabled`;text variant hover 时背景用 `bg-color-container-hover`、文字转品牌色;ghost 禁用文字 rgba(255,255,255,0.22);default base 实底灰按钮背景 `bg-color-component`(亮 gray-3/暗 gray-11)——**「语义色靠 token 绑定而非硬编码」是该组件的落地方式**。

### 6.2 Tag(来源:`tag.md`;`tag/_var.less`、`_index.less`)
线上页:https://tdesign.tencent.com/react/components/tag
- **theme**(default/primary/warning/danger/success)× **variant**(dark 深色实底/light 浅色实底/outline 描边/light-outline 浅底描边)× **shape**(square 圆角方形 3px/round 全圆角 12px/mark 标记型)。
- **mark 形状圆角不对称**:`border-radius: 0 round round 0`(左直角右全圆,标签舌头效果,_index.less:246)。
- **尺寸**:small 高 20/padding 0 4/字号 12;medium 高 24/padding 0 8/字号 12;large 高 32/padding 0 12/字号 14(round 大号字号 `calc(14px + 2px)`=16)。
- CheckTag 可选中:选中态=品牌色实底+白字(`@tag-checked-background-color: @brand-color; @tag-checked-color: @text-color-anti`),未选=灰底(`bg-color-component`);CheckTagGroup 支持 multiple;关闭按钮颜色 placeholder→hover 转 primary,dark variant 下用 font-white-2→1。
- disabled 仅 theme=default 提供;maxWidth 超宽出省略号。

### 6.3 Tabs(来源:`tabs.md`;`tabs/_var.less`、`_index.less`)
线上页:https://tdesign.tencent.com/react/components/tabs
- 结构:Tabs(TabBar 选中滑块 + TabNav 导航 + TabNavItem + TabPanel)。
- **theme=normal**(默认,下划线式):未选中文字 secondary,选中文字/底部指示条=品牌色,指示条粗细 **3px**(`@tab-default-stroke-size`),容器底线 1px `component-stroke`;**theme=card**(卡片式):默认背景次级容器,选中变主容器色+品牌色文字。
- **尺寸**:medium 总高 48(nav item 内部条 32 高 + padding 0 8,圆角 3px);large 总高 64(item 48 高 + padding 0 12);nav item 左右 margin 8px。
- **placement** top/bottom/left/right 四向;addable/dragSort 可增删拖拽;scrollPosition(auto/start/center/end)控制多 tab 时选中滑块停留位。
- 动效:导航滚动 `transform @anim-duration-moderate @anim-time-fn-ease-out`;item 背景 `background-color @anim-time-fn-easing @anim-duration-base`(0.2s 标准缓动);操作按钮出入场 translateX(±50px) 渐隐;滚动按钮带 `±10px 0 20px 5px rgba(0,0,0,5%)` 定向投影提示可滚动方向;Win 兼容选中色 `text-shadow: 0 0 0.3px currentcolor`。

### 6.4 Collapse(来源:`collapse.md`;`collapse/_var.less`)
线上页:https://tdesign.tencent.com/react/components/collapse
- 结构:Collapse(容器)→ CollapsePanel(面板)→ header(标题行:expandIcon + 标题 + headerRightContent)+ content。
- 行为默认值:expandIcon **true(默认 chevron)**、expandIconPlacement **left**、expandMutex false(可多开)、expandOnRowClick **true(整行可点)**、borderless false(默认有 1px `component-border` 分隔)、defaultExpandAll false。
- 规格:header 字号 `font-title-small`(14px/600),padding `12px 16px`(comp-paddingTB-m / comp-paddingLR-l);图标右 margin 8px;**content padding-left = 16+24 = 40px**(LR-l + margin-xxl),展开正文与标题文字严格对齐(图标占位缩进);面板边框 `solid 1px component-border`;面板级 disabled 优先于容器级。

### 6.5 Card(来源:`card.md`;`card/_var.less`)
线上页:https://tdesign.tencent.com/react/components/card
- **插槽化结构**:header(优先级最高)> title/subtitle/description/avatar + actions;cover(封面,字符串自动渲染 `<img>`);body(children/content);footer(+actions);`headerBordered` 头部分割线开关;loading 内置骨架态(按布局自动呈现,可透传 Skeleton)。
- **theme**:normal(普通)/poster1(操作区在顶部,配 avatar)/poster2(操作区在底部,配 status)——「同一结构换三套版式」。
- **规格**:圆角 6px(`border-radius-medium`);medium 内边距 `16px 24px`,small `8px 16px`(header/body/footer 三区一致);默认**有边框无阴影**(bordered=true,shadow=false),阴影是可选项(shadow/hoverShadow),卡片层级感优先靠 1px 边框;avatar 56px;title 下 margin 16px、description 下 margin 4px。

---

## 七、TDesign 官网自身的版式工艺(可迁移手法)

来源:`packages/site-components`(td-doc-demo / td-doc-aside / td-doc-header / td-doc-content)、`styles/dark.less`、`site/src/pages/home/index.vue`。线上站:https://tdesign.tencent.com

### 7.1 信息组织
- 设计侧页面按「**概述 → 原则 → 细则 → 应用指南**」固定节奏组织(color/dark/fonts/motion 各页皆然,见 `site/src/pages/design/*.vue`),每页开头一段 summary 定调,再展开规则,最后落 token 表。
- 组件页信息密度三件套:**平台框架切换**(Web/Vue/小程序同站同构)+「示例/API」双 tab(td-doc-tabs)+ 每页固定头部 228px(`FIXED_HEADER_TOP`)。
- 设计规范页大量使用 **Spline 3D 场景**做概念可视化(`site/spline/design/color_light|dark、font_light|dark、icon_*、layout_*` 每个概念亮暗两套场景文件),并按亮暗主题切换加载对应场景。

### 7.2 demo 与代码并排(td-doc-demo)
- demo 卡:外边距 `24px 0 48px`,6px 圆角 + 1px 边框,demo 区独立底色 `--bg-color-demo`(暗色 #181818,比容器 #242424 更深一档,demo 像「陷进页面的窗口」)。
- 右上角 48px 高操作栏:32×32 图标钮(gap 8px),hover/active 用 `--bg-color-demo-hover/select`(暗色 white 5%/10% 叠层)。
- 点击展开代码:代码区 max-height 560px、prism 亮暗双主题,**demo 与代码之间用一段 ::after 20px 渐变(`--bg-color-code-linear`)过渡**,代码区不是硬切,而是「从演示区渐显长出」。
- 暗色代码底 `--bg-color-code: #2c2c2c`,与 demo 底 #181818 形成双底色分层。

### 7.3 三栏文档框架(td-doc-aside / td-doc-content)
- 左侧导航宽 260px、顶部偏移 64px、100vh;**<1200px 断点自动收起为抽屉**,抽屉弹出时用 `outline: 9999px solid transparent` + `.show { outline-color: var(--text-disabled) }` 实现全屏压暗——一行 CSS 的遮罩实现。
- 内容区 `padding: 64px 侧 120px 底`、`max-width: var(--content-max-width)` 居中;页头大标题 48px(移动端 32px)、副文案 14px。
- 导航标题用品牌定制字 `TencentSansW7`(td-doc-aside `__title`)。

### 7.4 暗色站点观感(styles/dark.less)
- 全局分层明度阶梯:page #242424 → secondarypage #181818 → demo #181818 → code #2c2c2c → container #242424 → secondarycontainer/component #383838 → tag/thead #4b4b4b;交互叠层用 white 5%/10% 而非实色。
- 边界全部 inset 描边(header/footer/aside/table 四套方向组合),阴影只在悬浮层保留。
- `img { filter: brightness(.85) }`:暗色下所有图片统一降亮 15%,插画照片不刺眼。
- 渐变过渡 token 化:banner 渐变 `--bg-color-banner-linear`、组件看板渐变 `--bg-color-component-board-linear`,暗色大面积色块用「透明渐变」收边。

### 7.5 首页工艺(site/src/pages/home/index.vue)
- 结构:3D banner(spline)→ 标题区 + 微信引流卡 → 新闻跑马灯(module-news,hover 自动暂停 autoplay)→ 资源区 → **scroll-driven module-board**(滚动驱动展开的组件看板,内嵌框架切换代码卡 code-board,radio-group 切 React/Vue 代码)。
- 首页代码示例按框架切换,文案全部走 i18n locale 文件(`site/src/locales/pages/home.ts`),站点零硬编码文案。

### 7.6 设计 token 开放为产品(theme-generator)
官网仓库内置 `packages/theme-generator`:色彩/字体/圆角/阴影四面板(panel-drawer switch-tabs 图标即 color.svg/font.svg/radius.svg/boxshadow.svg),内置 15+ 品牌预设色板(TencentBlue/TCloudBlack/WeChatGreen 等),用户改 token 即导出主题 CSS —— 设计系统「token 即产品」的范例。

---

## 8. 深色主题设计图集站的落地映射建议

1. **背景分层直接抄 TDesign 暗色阶梯**:页面 #181818 / 容器 #242424 / 组件 #393939 / 边框 #4b4b4b,交互叠层用 white 5%/10%;图集站封面卡可用 container #242424 + hover #2c2c2c。
2. **文字用透明度而非实色**:primary white 90% / secondary 55% / placeholder 35% / disabled 22%,切主题零成本。
3. **图片统一 `filter: brightness(.85)`** 是图集站最直接可迁移的一行代码。
4. **动效档位**:卡片进场 200ms 标准缓动 `cubic-bezier(0.38,0,0.24,1)`,抽屉/灯箱 240ms ease-out,hover 反馈 100~140ms。
5. **组件规格基准**:卡片(圆角 6、内距 16/24、有边框无阴影)、Tag(高 24、padding 0 8、圆角 3)、Tabs(高 48、3px 指示条)、Button(32/14/圆角 3)、Collapse(header 14px/600、正文缩进 40px)。

---

## 十、10 个签名巧思

1. **品牌体温的中性色**:在灰阶里混入 8%~12% 品牌色(`Average(r,g,b) = 0.12×品牌色 + 0.88×灰`),让页面灰层自带腾讯蓝的冷暖倾向,而非死灰。—— 出处:官网色彩页「带有品牌色倾向的中性色」(https://github.com/Tencent/tdesign/blob/main/site/src/locales/pages/design-visual.ts `brandNeutral`)
2. **行高常数公式**:放弃国际标准的 1.5 倍行高,改用 `line-height = font-size + 8`,常数 8 让 14/16px 常用字号与 1.5 倍完全重合,且大字号不再行距膨胀割裂。—— 出处:官网字体页(design-basic.ts `fonts.lineHeight`)
3. **桌面动效时长 = 移动端 × 2**:以「目视距离 → 知觉恒常性」推导双端两套时长(移动 100/120/140ms,桌面 200/240/280ms),把物理距离写进 token。—— 出处:官网动效页(motion.vue `durationRows` 及 `duration.detail`)
4. **斜 8 度品牌动效**:把腾讯品牌视觉中的「斜 8 度」几何特征直接做成鼠标点击反馈的运动轨迹,品牌符号以动效而非图形存在。—— 出处:官网动效页「品牌语言的融入」(motion.vue `brand.text`)
5. **暗色文字透明度反向校准**:黑底白字的 WebAIM 曲线高于白底黑字,暗色模式刻意把文字透明度从 90/60/40/26 调至 90/55/35/22,拉平两种模式的阅读感。—— 出处:官网字体页 `fonts.color.note` + `_dark.less` `--td-font-white-*`
6. **暗色用 1px 内描边替代投影**:官网暗色样式将 header/footer/aside/table 边界全部改为四向 `inset box-shadow #4b4b4b` 描边——阴影在暗色下失效,层级靠「描线」表达。—— 出处:https://github.com/Tencent/tdesign/blob/main/packages/site-components/src/styles/dark.less
7. **一行 CSS 的全屏遮罩**:移动端侧栏抽屉展开时,用 `outline: 9999px solid transparent` + `.show { outline-color }` 实现全屏压暗,不引入任何遮罩 DOM。—— 出处:td-doc-aside/style.less(https://github.com/Tencent/tdesign/blob/main/packages/site-components/src/components/td-doc-aside/style.less)
8. **代码块从 demo 里「长出来」**:官网 demo 卡展开代码时,在按钮栏下方插入 20px 高的 `--bg-color-code-linear` 渐变过渡层,演示区与代码区之间是渐变呼吸而非硬切。—— 出处:td-doc-demo/style.less `&.open .TDesign-doc-demo__btns::after`
9. **暗色全局压暗图片**:`:root[theme-mode="dark"] img { filter: brightness(.85) }`,所有插画照片统一降亮 15%,无需逐图处理。—— 出处:styles/dark.less 首行规则
10. **Tag「标记型」不对称圆角**:mark 形状用 `border-radius: 0 round round 0`(左直角右全圆),一枚「书签舌头」让标签在信息流里自带方向性。—— 出处:tag/_index.less:246、tag/_var.less `@tag-border-radius-round`

> 补遗(未能核验项):官方博客类内容(如 TDesign 团队设计手记)未纳入本次来源;官网线上页因 SPA 无法直接抓取渲染后 DOM,报告数值全部取自官网/组件库官方源码仓库(与线上同源),未采信任何二手转述。
