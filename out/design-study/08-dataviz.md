# 08 · 数据可视化配色与图表基础专项调研

> 调研日期:2026-11-21 ｜ 服务对象:本项目 6 条「数据可视化」条目(分类色板/序数色阶/色盲安全/仪表盘密度/坐标轴与网格/图例与提示)
> 方法:全部内容来自本会话实际抓取的官方页面、官方导出 JSON、GitHub 源码(raw 文件)与权威组织文档;每条附来源 URL;抓取失败或未明示的一律标注「未找到/未证实」。源码文件均注明仓库+路径。

---

## 0. 结论速览

| 子方向 | 关键结论 | 核验强度 |
|---|---|---|
| Okabe-Ito | 官方页**只发色样图+PPT,不给 8 色 hex**;hex 由 R 语言 grDevices 内置色板权威固化 | 页面+R 源码双核验 |
| Tableau 10 | 10 色 hex 经 R grDevices 内置(注明作者 Maureen Stone & Cristy Miller,引官方博客 URL);官方博客原站 403、官方许可未找到 | R 源码核验/官网未核 |
| IBM Carbon | 官方 dataviz 页给出 14 色分类板完整 hex;仓库 LICENSE=Apache-2.0 (IBM Corp.) | 官网+LICENSE 双核验 |
| 序数色阶 | ColorBrewer 官方 JSON(35 组)直下解析;Blues5/RdBu5 等示例已录;Crameri 科学色图 v9 | 官方 JSON 核验 |
| 色盲模拟 | Brettel1997/Viénot1999/Machado2009 三模型机制、适用类型、severity 插值、gamma 陷阱 | daltonlens.org+源码核验 |
| 仪表盘密度 | Grafana 源码常量:24 列 × 30px 行高 × 8px 间距;Power BI 官方主题文档给字号阶梯 | 源码+官方 docs 核验 |
| 轴与网格 | ECharts5 轴线 #6E7079/网格 #E0E6F1;Grafana 网格=9% 透明度;ggplot2 默认删轴线 | 三方源码核验 |
| 图例/tooltip | jfly「直标优于图例」原文;WCAG 1.4.13 三要求;ECharts tooltip 默认值 | 原文+源码核验 |

---

## 1. 分类色板

### 1.1 Okabe-Ito —— 官方分发格式(hard requirement:hex 现状如实核实)

**官方原始来源**:Okabe Masataka(麻瓜医学大学) & Kei Ito(东京大学),两人均为强 protanope;「Color Universal Design (CUD) - How to make figures and presentations that are friendly to Colorblind people」,2002-11-20 发布,2008-02-15/09-24 修订。
https://jfly.uni-koeln.de/color/ (本会话两次抓取全文)

**官方以何种格式分发(核实结果)**:
1. 色板以**页面图样(Fig.16)呈现**,页面正文**仅对个别示例色给出 RGB 百分比+hex**(如红→朱红转换示例 "RGB=100%,32%,0%"),**未以文字提供完整 8 色 hex 列表**;
2. 提供 **PowerPoint 下载**:https://jfly.uni-koeln.de/html/manuals/pdf/color_blind.ppt(页面内链接,已核);
3. 页内另引 Color Universal Design Organization 的宣传册 PDF(小模型转述称约 2.6MB),**其直链未在本会话定位成功(未找到)**;页面声明:"Please feel free to use these items for your classes and seminars. (Please don't forget, however, to mention Masataka Okabe and Kei Ito for reference.)"
4. 页面同文给出红绿色盲比例:白人男 1/12(8%)、亚洲男 1/20(5%)、非洲男 1/25(4%);蓝黄色盲(tritanopia)约 0.001%。

**hex 的权威固化来源(已核验)**:R 语言 grDevices 源码 `src/library/grDevices/R/colorstuff.R` 中 `.palette_colors_hex`(经 `gh api repos/wch/r-source/contents/...?ref=trunk` 获取原文),注释注明 "Masataka Okabe & Kei Ito — http://jfly.iam.u-tokyo.ac.jp/color/":

```
"Okabe-Ito" = black #000000, orange #E69F00, skyblue #56B4E9, bluishgreen #009E73,
              yellow #F0E442, blue #0072B2, vermillion #D55E00, reddishpurple #CC79A7,
              gray #999999
```

**重要澄清(纠正常见讹传)**:R ≥ 4.0.0 的**默认调色板是 HCL 系 "R4"**(#000000,#DF536B,#61D04F,#2297E6,#28E2E5,#CD0BBC,#F5C710,#9E9E9E),**不是** Okabe-Ito;Okabe-Ito 只是 `palette.colors()` 的默认 palette 参数名。来源:同文件 + man/palette.Rd(`palette.colors(n=NULL, palette="Okabe-Ito")`,https://raw.githubusercontent.com/wch/r-source/trunk/src/library/grDevices/man/palette.Rd)。

**同页可得的方法论(供条目引用)**:CUD 三原则+1 —— ①选所有色觉类型都易分辨的配色;②颜色之外叠加形状/位置/线型/纹理冗余编码;③要求用户用色名沟通时明示色名;④兼顾美感。"For graphs and line drawings, label elements of the graph on the graph itself rather than making a separate color-coded key, since matching same colors in distant places is extremely difficult."(图上直标优于图例)

### 1.2 Tableau 10

**hex(经 R grDevices 内置固化,本会话核验原文)**,注释为 "Tableau 10 (Maureen Stone & Cristy Miller)" 并引官方博客 URL `https://www.tableau.com/about/blog/2016/7/colors-upgrade-tableau-10-56782`:

```
blue #4E79A7, orange #F28E2B, red #E15759, lightteal #76B7B2, green #59A14F,
yellow #EDC948, purple #B07AA1, pink #FF9DA7, brown #9C755F, lightgray #BAB0AC
```

- 官方博客原文**抓取失败**(WebFetch 403;fox_fetch 超时),**文章内容本会话未核实**;仅其 URL 经 R 官方源码注释佐证。
- 同源码含 `"Classic Tableau"`(即 matplotlib tab10 / d3 category10 时代配色):#1F77B4,#FF7F0E,#2CA02C,#D62728,#9467BD,#8C564B,#E377C2,#7F7F7F,#BCBD22,#17BECF —— 开源场景可用的替代。
- Tableau 官方 help 色板页(多次猜路径 404)、**官方色板使用许可声明:未找到**。Tableau 为商业产品,其色板值的再分发条款未证实,商用产品直接照搬需自行评估(未证实)。

### 1.3 IBM Design Library → Carbon Design System(现行官方载体)

官方数据可视化色板页(本会话抓取全文):https://carbondesignsystem.com/data-visualization/color-palettes/

**分类色板(Categorical,支持至 14 类,严格按序使用以最大化相邻对比)**:

| # | token | hex | # | token | hex |
|---|---|---|---|---|---|
| 1 | Purple 70 | #6929c4 | 8 | Blue 80 | #002d9c |
| 2 | Cyan 50 | #1192e8 | 9 | Magenta 50 | #ee538b |
| 3 | Teal 70 | #005d5d | 10 | Yellow 50 | #b28600 |
| 4 | Magenta 70 | #9f1853 | 11 | Teal 50 | #009d9a |
| 5 | Red 50 | #fa4d56 | 12 | Cyan 90 | #012749 |
| 6 | Red 90 | #570408 | 13 | Orange 70 | #8a3800 |
| 7 | Green 60 | #198038 | 14 | Purple 50 | #a56eff |

**双色 diverging(各 16 档)**:Red-Cyan `#750e13 → #e5f6ff → #003a6d`(温度联想数据);Purple-Teal `#491d8b → #d9fbfb → #004144`(非温度数据:业绩/销售/变化率)。
**告警色**:danger #da1e28 / serious warning #ff832b / warning #f1c21b / success #198038。
**红线**:Carbon Charts 不支持渐变;官方原话 "Multiple gradients are often inaccessible and are discouraged"。
**许可(已核验)**:https://raw.githubusercontent.com/carbon-design-system/carbon/main/LICENSE = **Apache License 2.0, Copyright 2015 IBM Corp.** —— 三个色板中唯一带明确开源许可的,适合本项目直接采用。

---

## 2. 序数色阶(单色/双色/多色)

### 2.1 ColorBrewer(官方导出 JSON 直下解析)

- 官方站:https://colorbrewer2.org/ (署名 "© Cynthia Brewer, Mark Harrower and The Pennsylvania State University";源码 https://github.com/axismaps/colorbrewer/)
- **本会话执行**:`curl https://colorbrewer2.org/export/colorbrewer.json` 下载成功(35,144 字节),Python 解析出 **35 组 scheme**,导出支持 HEX/RGB/CMYK(GB 值转 hex 由本人完成):

单色(Sequential,示例为 5 档 / 7 档):
- **Blues 5**:`#EFF3FF #BDD7E7 #6BAED6 #3182BD #08519C`;**Blues 7**:`#EFF3FF #C6DBEF #9ECAE1 #6BAED6 #4292C6 #2171B5 #084594`
- **OrRd 5**:`#FEF0D9 #FDCC8A #FC8D59 #E34A33 #B30000`
- **YlGnBu 5**:`#FFFFCC #A1DAB4 #41B6C4 #2C7FB8 #253494`;**PuBu 5**:`#F1EEF6 #BDC9E1 #74A9CF #2B8CBE #045A8D`

双色(Diverging,中点最亮):
- **RdBu 5**:`#CA0020 #F4A582 #F7F7F7 #92C5DE #0571B0`;**RdBu 7**:`#B2182B #EF8A62 #FDDBC7 #F7F7F7 #D1E5F0 #67A9CF #2166AC`
- **Spectral 5**:`#D7191C #FDAE61 #FFFFBF #ABDDA4 #2B83BA`;**Spectral 7**:`#D53E4F #FC8D59 #FEE08B #FFFFBF #E6F598 #99D594 #3288BD`;**Dark2(定性对照)5**:`#1B9E77 #D95F02 #7570B3 #E7298A #66A61E`

- 三类选择方法:Sequential=数值递增(单色渐进,浅→深);Diverging=围绕中点(0/均值)两极;Qualitative=分类。
- **许可证:站点与 GitHub 仓库均未明示许可文本**(仓库 LICENSE 文件 404;此前社区流传的 "Apache-2.0" 说法**本会话未在官方渠道核实 → 未证实**)。使用时按学术惯例引用 Brewer 即可(未证实项如实标注)。

### 2.2 多色(多 hue)感知均匀:Fabio Crameri Scientific Colour Maps

- 官方页:https://www.fabiocrameri.ch/colourmaps (本会话抓取)。三大声明:"Fair to the data"(均匀不失真)、"Readable by everyone"(色盲与灰度可读)、"Citable & reproducible"(Zenodo 永久存档,DOI 10.5281/zenodo.1243862,当前版本 **v9.0.0**,支持 MATLAB/Python/R/GMT/QGIS 等,IPCC Interactive Atlas 在用)。
- 配套论文:Crameri, Shephard & Heron (2020), "The misuse of colour in science communication", *Nature Communications* 11:5444, **DOI 10.1038/s41467-020-19160-7**(页内引用已核)。
- **具体许可证(CC BY 4.0 与否)未在页面/Zenodo API 核实成功 → 未证实**。

### 2.3 插值方法与生态

- **d3-scale-chromatic**(README 已核):"Most of these schemes are derived from Cynthia A. Brewer's ColorBrewer";离散 scheme 由**均匀 B-spline 插值**生成连续版;Viridis 系为连续感知均匀方案。https://github.com/d3/d3-scale-chromatic
- **Material Design 数据可视化指南已下线**:`material.io/design/dataviz/overview.html` 301 跳转 `m3.material.io/design/dataviz/overview.html` → 404(本会话两跳核验)。**Material 渠道未找到现行权威页,序数方法以 ColorBrewer+Crameri 交付**。
- R HCL 体系可作补充:grDevices `hcl.colors()`(colorRamp/hcl.colors.R,R4 色板即 HCL 生成)。

---

## 3. 色盲安全

### 3.1 患病率(权威口径)

- 美国 NEI(National Eye Institute,本会话抓取):**"About 1 in 12 men have color vision deficiency"**;男性远高于女性。https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness
- jfly 官方页补充细分:红绿色盲占白人男 8%/亚洲男 5%/非洲男 4%;tritanopia ≈ 0.001%。

### 3.2 三类模拟核查方法(算法级,均经 daltonlens.org 原文核验)

来源:https://daltonlens.org/understanding-cvd-simulation/ 与 https://github.com/DaltonLens/DaltonLens-Python(README 已核,支持 vienot/brettel/machado 三模型、protan/deutan/tritan、severity 0–1、simulate/daltonize)

1. **Brettel 1997**:LMS 空间**双半平面**投影(绕黑-白对角线);protan/deutan 不变波长 475nm/575nm,**tritan 485nm/660nm**。三型通用,尤其 tritan 必须用它。
2. **Viénot 1999**:protan/deutan 的**单平面简化**(黑-白-蓝-黄对角面,整条管线可写成 gamma 解码→一个 3×3 矩阵→gamma 编码)。**常见开源 bug 警告**:广泛流传的代码"直接把 sRGB 当线性 RGB 处理",结果整体偏暗——必须先 gamma 解码到线性 RGB。
3. **Machado 2009**:生理模型,severity 通过锥细胞感光峰值波长偏移插值(二色视=峰值重合)。
4. **severity 通用做法**:0–1 线性插值(二色视模拟 ↔ 原图,在 LMS 或线性 RGB 空间)。
5. **推荐组合**:protanopia/deuteranopia → Viénot(更快且与 Brettel 结果高度一致,还更好保留纯白);**tritanopia → 必须 Brettel**(单平面近似差;复用 protan/deutan 平面的开源 tritan 实现"完全错误")。
6. 局限:个体严重度与锥光谱差异、显示器差异,完美模拟不存在。

### 3.3 工具链

| 工具 | 平台/形态 | 核验情况 |
|---|---|---|
| DaltonLens-Python | Python 库 `pip install daltonlens`,CLI `-m vienot|brettel|machado -d protan|deutan|tritan -s 0~1` | README 已核;许可未核实 |
| Color Oracle | Win/Mac/Linux 全屏滤镜,"a free color blindness simulator",作者 Bernie Jenny(Monash)+Nathaniel Vaughn Kelso,开源 https://github.com/nvkelso/color-oracle-java | 官网已核 https://colororacle.org/;所用算法官方页未明示(未证实) |
| Chrome DevTools Rendering 面板 | 浏览器内视觉缺陷模拟(含 protanopia/deuteranopia/tritanopia 词条) | 功能存在于 devtools-frontend e2e 测试 `test/e2e/rendering/rendering.test.ts`(gh 搜索已核);**官方文档页多次 404 未定位(未找到)** |
| Power BI 官方色盲主题 | 官方文档直供 **ColorblindSafe-Longer.json**(go.microsoft.com/fwlink/?linkid=843923) | 官方 docs 原文已核(见 3.4) |

### 3.4 ECharts / D3 / BI 生态实践

- **ECharts(源码核验,v5.5.1 `src/visual/aria.ts`)**:无障碍 `aria.label.enabled` 默认 **true**(自动生成图形摘要供读屏);`aria.decal.show` 默认 **false** —— 贴花纹理(第二视觉编码,色盲安全关键)需显式开启。decal 由 `src/util/decal.ts` 定义(dashArrayX/Y、rotation 等参数)。
- **Power BI(官方 docs 核验)**:报告主题页明确提供 "Color-blind friendly theme … Download ColorblindSafe-Longer.json"(https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes)。
- **D3**:d3-scale-chromatic 提供 ColorBrewer 全系 + Viridis(感知均匀、社区公认色盲安全;Viridis 本身出自 matplotlib 生态,本会话未核其论文原文 → 慎引细节)。
- **通用做法(jfly 原则 2)**:颜色之外必须冗余编码——形状/线型(实虚线)/纹理/直标。

---

## 4. 仪表盘密度(BI 三家数值惯例)

### 4.1 Grafana(源码核验,官方 docs 反而不给数)

`public/app/core/constants.ts`(gh api 原文):

```ts
export const GRID_CELL_HEIGHT = 30;
export const GRID_CELL_VMARGIN = 8;
export const GRID_COLUMN_COUNT = 24;
export const MIN_PANEL_HEIGHT = GRID_CELL_HEIGHT * 3;  // = 90px
```

→ **24 列网格、行高单元 30px、面板纵向间距 8px、最小面板高 3 格(90px)**。官方文档页(add-organize-panels)只给 Standard/Narrow/Wide、Short/Tall 等档位名与自定义 px,**未公开像素值**(本会话核验)。

### 4.2 Power BI(官方主题文档核验)

https://learn.microsoft.com/en-us/power-bi/create-reports/report-themes-create-custom

- **官方示例字号阶梯(textClasses)**:`callout`(卡片/KPI 大数字)**fontSize 45**、`title`(轴标题/视觉标题)**12**、`header`(表头)**12 · Segoe UI Semibold**、`label`(表格/轴标签)**10 · Segoe UI**;次级类(largeLabel/smallLabel/lightLabel…)自动继承主类。→ **「45/12/12/10」四档阶梯**可直接作为仪表盘字号基线(注意:这是官方文档示例值,非强制默认,引用时注明)。
- **结构色角色**:第三层结构色 `thirdLevelElements/backgroundLight` = **轴网格线色**(示例 #F3F2F1);`secondLevelElements` = 图例/轴标签文字色;`background` = 视觉背景。
- **legend 位置枚举**(style preset 示例):`BottomCenter / Right / Left / RightCenter`;`gridlineStyle` 可设 `dotted`。
- 官方主题页另确认:内置主题(Bloom/Tidal/Frontier…)、`dataColors` 顺序即系列取色顺序、`good/neutral/bad` 语义色。
- **默认画布像素(16:9 = 1280×720 之说法):官方文档页未找到**(多次检索/猜路径失败)→ 未证实。

### 4.3 Tableau

官方默认画布尺寸、卡片间距、字号阶梯等**数值惯例:未找到**(官方 help 色板/布局页多次 404,博客 403)。不编造。

---

## 5. 坐标轴与网格线

### 5.1 ECharts v5.5.1(源码逐字核验:`src/coord/axisDefault.ts`)

```ts
axisLine: { show: true, lineStyle: { color: '#6E7079', width: 1, type: 'solid' } }
axisTick: { show: true, length: 5, lineStyle: { width: 1 } }
splitLine: { show: true, lineStyle: { color: ['#E0E6F1'] } }
axisLabel: { show: true, margin: 8, fontSize: 12 }
// categoryAxis: splitLine 强制关闭;valueAxis: axisLine/axisTick = 'auto'
// (笛卡尔系下另一轴是类目轴时不画值轴轴线/刻度);splitNumber: 5;timeAxis splitNumber 6
```

- **轴线 #6E7079(中灰)、网格线 #E0E6F1(浅灰)、类目轴不画横网格、值轴默认不画轴线**——这是"轴线可去、网格保留且极浅"惯例的官方落地。
- 注:master 分支已将默认色 token 化(`tokens.color.axisLine` 等),升级大版本时留意主题令牌。

### 5.2 Grafana(源码逐字核验:`packages/grafana-ui/src/components/uPlot/config/UPlotAxisBuilder.ts`)

```ts
export function getGridColor(theme: GrafanaTheme2) {
  return theme.isDark ? 'rgba(240, 250, 255, 0.09)' : 'rgba(0, 10, 23, 0.09)';
}
// 轴文字色默认 theme.colors.text.primary;axis border 默认不显示;labelPad = 8;
// calculateSpace():网格/刻度最小 CSS 像素间距自适应(防刻度挤压)
```

→ **网格线 = 主背景色的 9% 透明度反色**,暗亮主题各自翻转;轴线默认隐藏(border 默认 off)。

### 5.3 ggplot2(源码核验:`R/theme-defaults.R`,tidyverse/ggplot2 main)

- L194 `axis.line = element_blank()` —— **默认删除轴线**;
- L20(文档):"The signature ggplot2 theme with a grey background and white gridlines" —— 灰底白网格(旧版 #EBEBEB 底/#FFFFFF 网格;现行以 `col_mix(ink, paper, …)` 参数化:L271 面板底 `0.92`、L221 刻度 `0.2`);
- L276 `panel.grid.minor = element_line(linewidth = rel(0.5))` —— 次网格线宽减半;
- L262 `legend.position = "right"` —— 图例默认右侧。

### 5.4 FT Visual Vocabulary(媒体权威)

- 仓库与海报:https://github.com/ft-interactive/chart-doctor(README 已核;poster 有英/日/繁中/简中四语 PDF,站点 http://ft-interactive.github.io/visual-vocabulary/)。
- 轴基线权威表述:**Column "Must always start at 0 on the axis"**(柱/面积必须零基线);line 图可不从零(引 ONS "Does the axis have to start at zero?" 两篇与 Quartz 文章);Lollipop 不强制零基线。
- 方法论引用:Cleveland & McGill《Graphical Perception》(编码精度排序的实验源头)。
- **许可**:README 尾 "Copyright © The Financial Times Limited, all rights reserved",转载需联络 syndication —— **海报不可直接再分发**,引用其原则而非翻印。

---

## 6. 图例与提示(legend & tooltip)

- **位置惯例**:jfly 原文(已核)明确「图上直标 > 远处对色图例」;ggplot2 默认 `legend.position="right"`;Power BI 提供 BottomCenter/Right/Left/RightCenter 枚举(官方示例,主题预设可把柱图图例默认压到底部居中);ECharts legend 支持四边定位(top/left/right/bottom)+orient,默认布局为 auto(源码 LegendModel 仅见类型定义,默认值未逐字核实 → 标注)。
- **tooltip 触发与无障碍**:
  - ECharts v5.5.1 源码(`src/component/tooltip/TooltipModel.ts`):`trigger: 'item'`(可选 `'axis'|'none'`)、`triggerOn: 'mousemove|click'`、`showDelay: 0`、`hideDelay: 100`、`transitionDuration: 0.4`。
  - **WCAG 2.1 SC 1.4.13 Content on Hover or Focus(Level AA,W3C 官方理解页已核)**:自定义 tooltip 必须——①**Dismissible**(Esc 可关,不移动指针/焦点);②**Hoverable**(指针可移入提示本体而不消失,适配放大镜/大光标);③**Persistent**(直到触发移除/用户关闭/信息失效才消失)。失败模式 F95(不可悬停)、F114(不可关)。来源:https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
  - Power BI 另有「Report Tooltips」(报告页 tooltip)官方文档(检索命中 `desktop-tooltips`,未抓取全文)。
- **读屏配套**:ECharts `aria.label.enabled` 默认开(自动数据摘要);系列区分走 `aria.decal` 纹理而非仅靠色相。

---

## 7. 许可一览(商用安全线)

| 资产 | 许可 | 核验 |
|---|---|---|
| IBM Carbon(色板/图表规范) | Apache-2.0 © 2015 IBM Corp. | LICENSE 文件已核 ✅ |
| Okabe-Ito | 无正式许可;官方页请求使用时署名 Okabe & Ito | 页面原文已核 ✅ |
| Tableau 10 | 官方许可声明未找到(商业产品) | 未证实 ⚠️ |
| ColorBrewer 色值 | 官方渠道未明示(署名 Brewer/Harrower/Penn State) | 未证实 ⚠️ |
| Crameri Scientific Colour Maps | 页面称 "free for all"+Zenodo 存档;具体许可未核实 | 未证实 ⚠️ |
| ECharts / Apache | Apache-2.0(源码头文件声明) | 源码头已核 ✅ |
| FT Visual Vocabulary 海报 | FT 版权所有,转载需 syndication 授权 | README 已核 ✅ |
| d3-scale-chromatic / daltonlens / ggplot2 / Grafana | 开源仓库各自许可(BSD-3/MIT 系;逐项 LICENSE 文件未逐一核) | 部分 ⚠️ |

---

## 8. 未找到 / 未证实清单(如实申报)

1. Okabe-Ito 官方宣传册 PDF 直链(页内提及未定位);官方页无完整 8 色 hex——hex 以 R grDevices 固化值为准。
2. Tableau 官方博客原文(403)与官方 help 色板页(404):**Tableau 10 官方许可与官方原文均未核实**;hex 经 R 源码佐证。
3. Power BI 默认画布像素(1280×720 说法)与视觉默认 padding:官方文档未找到。
4. Tableau 仪表盘密度数值惯例(默认画布/间距/字号):未找到。
5. ColorBrewer 与 Crameri 色图的具体许可证文本:未核实(社区流传的 Apache/CC 说法均不采信)。
6. Chrome DevTools 视觉缺陷模拟官方文档页:多次 404,未定位;功能存在性经 devtools-frontend 测试代码佐证。
7. Material Design 数据可视化指南(M2):已下线(m3 404),无现行官方页。
8. Machado 2009 论文的 DOI/期刊页:未直接核(内容经 daltonlens.org 转述)。
9. ECharts legend 默认 top/left 具体值、Grafana 刻度最小间距数值:源码未逐字核到位。
10. Color Oracle 所用模拟算法:官方页未明示(未证实)。

---

## 9. 签名巧思(10 条,可直接落进条目)

1. **Okabe-Ito 的 hex 不是官方发的**:官方只发色样图+PPT;生产直接抄 R grDevices 内置 8 色(#E69F00/#56B4E9/#009E73/#F0E442/#0072B2/#D55E00/#CC79A7/#000000),别自己从 RGB 百分比换算。
2. **序列前三色固定「橙→天蓝→蓝绿」**:把红绿混淆带留给低频类别,靠亮度差兜底区分度。
3. **8 类封顶,第 9 类一律并「其他」**:Okabe-Ito 8 色即上限;Carbon 14 色也必须按官方顺序取用、禁止跳色。
4. **序数阶只取 ColorBrewer 官方整档**(5/7 档,如 Blues5 #EFF3FF→#08519C),禁止在成品里自插值——插值交给 d3 B-spline。
5. **双向阶「两端饱和+正中白」**:RdBu5 (#CA0020/#F7F7F7/#0571B0),中点必须锁在数据零点/均值上,不许视觉漂移。
6. **色盲核查跑三模型 × severity=1**:protan/deutan 用 Viénot、tritan 强制 Brettel;任何"复用红绿平面做 tritan"的工具直接弃用。
7. **CVD 模拟先 gamma 解码到线性 RGB 再套矩阵**:对 sRGB 直接套是开源界流行 bug,结果整体偏暗、假阳性。
8. **网格线写死 9% 透明度公式随主题翻转**(Grafana:暗 rgba(240,250,255,.09)/亮 rgba(0,10,23,.09)),轴线默认不画。
9. **字号阶梯 45/12/12/10**(Power BI 官方主题示例:callout/title/header/label)+ Grafana 24 列×30px 行高×8px 间距,作为仪表盘密度基线。
10. **图上直标 > 图例**(jfly 原话:远处对色匹配极难);必须图例时贴顶并开 ECharts `aria.decal` 纹理,tooltip 按 WCAG 1.4.13 做「Esc 可关+可悬停+常驻」三件套。

---

### 附:本会话核验命令与来源索引(摘要)

- `curl https://colorbrewer2.org/export/colorbrewer.json` → 35,144 字节,Python 解析 35 组 scheme(报告内 hex 均出自该 JSON)
- `gh api repos/wch/r-source/contents/src/library/grDevices/R/colorstuff.R?ref=trunk` → `.palette_colors_hex`(Okabe-Ito/Tableau 10/R4/Classic Tableau hex)
- `curl https://raw.githubusercontent.com/apache/echarts/5.5.1/src/coord/axisDefault.ts | grep …`、`src/component/tooltip/TooltipModel.ts`、`src/visual/aria.ts`、`src/util/decal.ts`
- `curl https://raw.githubusercontent.com/grafana/grafana/main/public/app/core/constants.ts`、`packages/grafana-ui/src/components/uPlot/config/UPlotAxisBuilder.ts`
- `curl https://raw.githubusercontent.com/tidyverse/ggplot2/main/R/theme-defaults.R`(本地留存 26,894 字节)
- 官方文档抓取:jfly.uni-koeln.de/color/、carbondesignsystem.com/data-visualization/color-palettes/、learn.microsoft.com(power-bi 主题两篇)、colorbrewer2.org、colororacle.org、fabiocrameri.ch/colourmaps、daltonlens.org、w3.org WCAG 1.4.13、nei.nih.gov、github.com/ft-interactive/chart-doctor(README)
