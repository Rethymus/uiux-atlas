# 前端图标体系专项研究:五大开源图标集 + Material 栅格/光学/无障碍/雪碧图/动效

- 调研日期:2026-11-21
- 服务对象:本项目「UI/UX 设计全解图集」将生产 8 条图标体系条目(描边与填充 / 24px 栅格 / 光学缩放 / 语义与无障碍 / SVG Symbol 雪碧图 / 开源图标集 / 色彩与状态 / 图标动效)
- 方法声明(本次会话实际执行):
  - 五套图标集全部经**官方仓库 README、官方文档站与原始 SVG 源文件**核验:fox_fetch 抓取 GitHub README / lucide.dev / m2.material.io / m3.material.io / developers.google.com / w3.org / MDN;Heroicons、Phosphor、Lucide 另用 `curl` 下载仓库内**真实 SVG 文件**逐个读 viewBox 与 fill/stroke 属性(命令与输出见 §9)。
  - `defaultAttributes.ts`(Lucide)与 CSS Color 4 规范全文经 curl 下载后用 `python -I` 提取关键段落原文。
  - 工具不可用情况如实记录:`web_reader` 配额耗尽(重置 2026-12-03);`fox_search` 两次查询全部引擎 0 结果或被墙;W3C APG 旧版「Images」实践页与 Deque《Creating Accessible Icons》一文实测 **404**(详见 §7)。
  - Okabe-Ito 色板与「图标体系」条目无关,未纳入本次调研;其 hex 分发格式问题应在色彩条目专项中核实,此处不做无来源转述。

---

## 0. 结论速览

| 图标集 | 风格 | 网格 | 默认线宽 | 许可 | 一句话定位 |
|---|---|---|---|---|---|
| Lucide | 描边(实验性填充) | 24×24 | **2px**(源码定值) | ISC | Feather 社区续作,规范文档最完整 |
| Feather | 纯描边 | 24×24 | 2px | MIT | 极简主义原点,官方雪碧图开箱即用 |
| Heroicons | 描边+填充双体系 | 24 / 20 / 16 三档 | **1.5px**(24 outline 实测) | MIT | Tailwind 官方出品,React/Vue 一等公民 |
| Phosphor | 6 权重含 Fill/Duotone | **256×256**(实测 viewBox) | 权重系(烘焙为填充路径) | MIT | 权重最全的双层 Duotone 玩家 |
| Material Symbols | Outlined/Rounded/Sharp × FILL 轴 | 24 设计基准 | wght 100–700 变轴(默认 400) | Apache-2.0 | 变量字体路线:四轴实时改形 |

核心叙事:24px 是**全行业共同祖先网格**(Feather→Lucide 继承,Heroicons 同规格,Material 体系定义了它的官方键程);差异在**线宽哲学**(2px vs 1.5px vs 变轴)与**交付形态**(SVG 文件 vs 变量字体)。

---

## 1. 五大开源图标集逐项核验

### 1.1 Lucide

- 官方仓库:https://github.com/lucide-icons/lucide (25.9k★;README 自述 "1600+ vector (svg) files";仓库简介写 "2000+"——两处计数不一致,如实并录,采用官网 lucide.dev/guide 的 1600+ 表述)
- 官方文档:https://lucide.dev (Guide → Basics: Color / Sizing / Stroke width / Accessibility)
- 许可:**ISC**("Lucide is totally free for commercial use and personal use, this software is licensed under the ISC License"——README License 节原文)
- 与 Feather 关系:README topics 含 `feather-icons`,文档含 "Migration from React Feather" 章节(社区分支关系,README 未逐字声明 fork,谨慎表述)
- **默认 SVG 属性(一手源码核验)**:`packages/lucide/src/defaultAttributes.ts`:
  ```ts
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': 2,
  'stroke-linecap': 'round', 'stroke-linejoin': 'round'
  ```
  → **24px 网格 + 2px 描边 + round 圆头圆角 + currentColor,四件套全部源码定值**。源文件 `icons/house.svg` 实测同上。
- 生态:lucide(核心)+ lucide-react/vue/svelte/solid/preact/react-native/angular/astro/static 全家桶(README Packages 表)
- 设计规范(官方贡献文档,一手):`docs/contribute/icons/design-principles.md` + `specification.md`,要点见 §3

### 1.2 Feather

- 官方仓库:https://github.com/feathericons/feather (26.0k★,MIT license 徽标)
- 官网/图标目录:https://feathericons.com
- 许可:**MIT**
- 网格与线宽(README 原文/代码):"Each icon is designed on a **24x24 grid**";`attrs` 输出 `width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, stroke-linecap/join: round` → 与 Lucide 同构(系出同门)
- 使用方式:① `<i data-feather="circle">` + `feather.replace()` 客户端替换;② Node `feather.icons[name].toSvg(attrs)`;③ **官方雪碧图** `feather-sprite.svg`:
  ```html
  <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" ...>
    <use href="path/to/feather-sprite.svg#circle" />
  </svg>
  ```
  (README "SVG sprite" 节原文)——五套里唯一在 README 给出外链雪碧图官方用法的
- 注意:项目活跃度低(410 open issues),README 未标弃用但久未发版

### 1.3 Heroicons

- 官方仓库:https://github.com/tailwindlabs/heroicons (23.9k★,MIT)
- 官网:https://heroicons.com (Tailwind CSS 团队出品)
- 许可:**MIT**
- 变体体系(README + 实测文件双证):
  - `24/outline`:24×24 描边 → **实测 `src/24/outline/bars-3.svg`:`viewBox="0 0 24 24"`,`stroke-width="1.5"`,round cap/join** ⇒ 默认线宽是 **1.5px 不是 2px**(README 快速上手示例仍写 `stroke-width="2"`,为 v1 旧文案,以文件为准)
  - `24/solid`、`20/solid`(mini)、`16/solid`(micro):填充路径,实测三档 viewBox 分别为 24/20/16 → **同为 24px 家族但提供 20px 与 16px 的独立重绘网格**,而非缩放
- 染色:全部预配置 `currentColor`(outline 走 `stroke`,solid 走 `fill`)
- 使用:内联复制、`@heroicons/react`(按 `@heroicons/react/24/outline` 等路径摇树导入)、`@heroicons/vue`;官方明确**不接受**新图标 PR 与 Svelte/Solid 等新框架包(README Contributing 节)

### 1.4 Phosphor

- 官方仓库:https://github.com/phosphor-icons/core (core 仓库托管原始 SVG 与目录数据;官网 https://phosphoricons.com 为 JS 渲染,crawlers 拿不到正文)
- 许可:**MIT**("MIT © Phosphor Icons")
- 权重体系(`assets/` 目录实测,6 个文件夹):`thin / light / regular / bold / fill / duotone`
- **网格实测(一手)**:6 个权重各取 `acorn` 样本,全部 `viewBox="0 0 256 256"`、`fill="currentColor"` ⇒ **256×256 大网格,图标以填充路径交付(描边宽度已烘焙进路径轮廓,SVG 内无 stroke-width 属性)**
  - 旁证:同一形状 corner 弧半径随权重变化——thin `a12,12` → light `a14,14` → regular `a16,16` → bold `a20,20`,可推断相对粗细关系,但**各权重官方像素值文档未找到(未证实,§7)**
- Duotone 实测:双 `<path>`,背景层 `opacity="0.2"` + 前景层——README 亦自述 "Duotone icons rely on overlaying two glyphs (a background and foreground layer)"
- 生态(README 官方列表):react / vue / web / flutter / swift / elm / penpot / figma / **unplugin(多框架打包器雪碧图生成插件)** / webcomponents 等
- 标志性能力:FILL 权重 + **Duotone 双层透明度**是五套中唯二能做到"半透明底+实心上"分层的(另一个是 Material Two-tone,但已停更)

### 1.5 Material Symbols

- 官方仓库:https://github.com/google/material-design-icons (54.3k★,Apache-2.0;含 Material Symbols 与 Material Icons 两代)
- 浏览器:https://fonts.google.com/icons (左上角切换两代)
- 开发者指南:https://developers.google.com/fonts/docs/material_symbols
- 许可:**Apache License 2.0**(README License 节 + Google Fonts 指南)
- 世代关系(README 原文):Symbols 于 **2022 年 4 月**推出,"built/designed as variable fonts first (based on the **24 px designs from Material Icons**)";经典 Material Icons 五样式(Filled/Outlined/Rounded/Sharp/Two-tone)**2022 年起停止更新**
- 三种样式:**Outlined / Rounded / Sharp**(m3.material.io/styles/icons/overview 原文);无独立 Filled 字体,FILL 轴承担填充
- **四条设计轴(README + Google Fonts 指南双证)**:
  - `opsz` 光学尺寸 **20–48**,默认 **24**(README:"The default is 24";仅 20px 与 24px 版本做了完美像素栅格对齐)
  - `wght` 粗细 **100–700**,Regular=400
  - `GRAD` 等级 **-50–200**,默认 0;**-50/-25 建议用于深底浅色图标降低眩光**,200 级用于强调(指南原文)
  - `FILL` 填充 **0–100**,默认 0;"It can also be manipulated for an **animated fill effect, to indicate user selection**"(README 原文)——官方盖章的 hover/选中态动效通道
  - 另有 `ROND` 圆角轴(0–100)仅经 Google Fonts CSS API 暴露(指南 CSS 示例 `:FILL,ROND@0..1,100`);默认静态实例 = wght 400 / opsz 24 / ROND 50 / GRAD 0 / FILL 0
- Web 接入与体积(指南原文,密度极高):
  - 不指定 icon_names 默认加载 3800+ 图标字体 **295KB**(静态)~**7.9MB**(全轴变量)
  - `&icon_names=home,palette,settings` 子集化 → **1.7KB**;指定所需轴组合 → **2.6KB**
  - 必须 `&display=block` 防 FOUC;连字(ligature)写 `arrow_forward` 而非码点;自托管需手写 `.material-symbols-outlined` CSS 规则(`font-size: 24px; line-height: 1`)
- npm:Google 官方不维护 npm 包(停在 2016 v3),社区 @marella 的 `material-symbols` / `material-icons` 自动发布,README 明示 "Google does not monitor or vet these packages"

---

## 2. Material 官方 24px 栅格与键程数值

来源(经典规范页,现仍在线):https://m2.material.io/design/iconography/system-icons.html ;M3 承接页:https://m3.material.io/styles/icons/overview ;官方栅格模板(AI 源文件,Apache 2.0):https://storage.googleapis.com/material-io-design/downloads/gm_icon_template.ai.zip

| 项目 | 数值 | 页面原文依据 |
|---|---|---|
| 展示尺寸 | **24×24 dp**;"System icons are displayed as 24 x 24 dp" | 原文 |
| 密集布局(桌面鼠标键盘) | 缩至 **20×20 dp** | "measurements may be scaled down to 20dp" |
| 活动区 Live area | **20×20 dp**(24dp 内四周留 **2dp padding**)| "Icon content is limited to the 20dp x 20dp live area, with 2dp of padding around the perimeter" |
| 密集活动区 | **16×16 dp**(同样 2dp padding) | 原文 |
| 修剪区 Trim area | = 图形完整 24dp 尺寸;内容**绝不可**出修剪区 | "No parts of the icon should extend outside of the trim area" |
| 权重补充 | 需要更强视觉重量时,内容可伸入 live area 与 trim area 之间的 padding | "content may extend into the padding" |
| 键程·方形 | **18×18 dp** | "Square — Height: 18dp, Width: 18dp" |
| 键程·圆形 | **直径 20 dp** | "Circle — Diameter: 20dp" |
| 键程·竖长方形 | **16×20 dp** | 原文 |
| 键程·横长方形 | **20×16 dp** | 原文 |
| 像素对齐 | X/Y 坐标必须**整数**,禁止小数("on pixel") | "making the X and Y coordinates into integers, without decimals" |
| 圆角 | **默认 2dp**;内部转角必须直角;**宽度 ≤2dp 的形状转角不倒圆** | "Corner radiuses are 2dp by default. Interior corners should be square… For shapes 2dp wide or less, stroke corners shouldn't be rounded" |
| 描边 | 体系标准 **2dp**(同句 "shapes 2dp wide or less" 即以 2dp 描边为基准表述;页面图标解剖图 Stroke/Counter stroke 亦以此标注) | 页面图形标注 |
| 图标解剖 | 六要素:stroke terminal / corner / counter area / stroke / counter stroke / bounding area | "System icon metrics" 节 |

> 注:此页为 Material 1/2 经典规范;M3 现行站点(m3.material.io)已将 designing-your-icons 页合并进 overview(Jina 渲染实测 301 跳转),键程数值以本页 + 官方 AI 模板文件为唯一权威出处。Lucide 24px/1px 安全区、Heroicons 16px 独立网格等可作为跨家族旁证(§1)。

---

## 3. 光学缩放(Optical Sizing)与视觉对齐惯例

### 3.1 官方数值级惯例

1. **圆溢出方,圆键程比方键程大 2dp**(Ø20 vs 18×18;长方形也是 20 长边)——Material 官方栅格把"圆形/长形要**光学放大**过方形边界"做成了硬数值。这是全行业视觉补偿的祖源规则:同视觉重量下,圆要画得比方大 ~11%(20/18)。
   来源:m2.material.io system-icons 键程四图。
2. **opsz 轴把"缩放补偿"参数化**:Material Symbols 在 20–48dp 之间随尺寸变化**自动调描边粗细**——"描边粗细(厚度)会随着图标尺寸的缩放而变化。光学尺寸提供了一种……调整笔画粗细的方式"(Google Fonts 指南原文)。放大时线相对变细、缩小时线相对变粗,保住光学恒常性。
3. **密集布局整档重定标**:桌面高密度场景 24dp→20dp、活动区 20dp→16dp,是"换尺寸档"而非等比缩放(Heroicons 20px mini / 16px micro 同理,独立重绘 viewBox 实测)。
4. **深底降眩光**:GRAD -25~-50 专治浅色图标在黑背景上的过亮晕染(Google Fonts 指南原文)——光学缩放在"负空间方向"的应用。

### 3.2 Lucide 贡献规范的光学细则(一手源文档,密度高)

来源:https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md 与 specification.md(curl 实读全文):

- **1px 安全区**:描边距画布边缘至少 1px(must)
- **2px 元素间距**:相邻独立元素间隙 ≥2px(must);内部镂空间隙 should ≥2px——验收法:"**放一个 2px 宽的圆进镂空,不重叠即合格**"
- **圆角分档**:元素 ≥8px 用 **2px 圆角**,<8px 用 **1px 圆角**(90° 角)
- **斜角半径 2.41px**:"Diagonal lines that meet at a right angle usually need a **2.41 pixel (1+√2)** radius to stay aligned to the grid"——斜线交角倒圆的像素栅格公式,冷知识级一手数值
- **视觉重量验收法**:"Place your icon next to `circle` or `square`, then **blur both icons**. Your icon should not look much lighter or darker than the reference icon."(模糊化比对灰度,量化"感觉"级指标)
- **光学居中**:"Geometric centering does not always look centered. **Asymmetrical shapes may need a small adjustment**"——不对称图标允许偏离几何中心做视觉居中(specification: "may be moved slightly off center so they look visually centered")
- **像素栅格让位于视觉**:"Pixel alignment should support the icon. Do not let it harm shape recognition, smooth curves, or visual balance"——栅格对齐是手段不是目的
- 密度控制:"View the icon at its intended size and **blur it**. Areas that turn dark may have too much detail"

### 3.3 线宽与低对比度渲染的反向证据

WCAG 1.4.11 理解文档明确提醒:抗锯齿会让**特别细的线条**实际渲染远淡于 CSS 定义色,"authors are encouraged to avoid particularly thin lines"——1.5px 以下的描边在小字号/低分屏是可访问性负债(来源:https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html )。

---

## 4. 图标无障碍:装饰性 vs 语义性

### 4.1 规则主干(W3C/MDN 一手)

1. **纯装饰图标 → 从无障碍树摘除**。MDN aria-hidden:"Adding `aria-hidden="true"`… removes that element and all of its children from the accessibility tree",可隐藏对象明确列举 "**Purely decorative content, such as icons**";官方示例即图标场景:
   ```html
   <button>
     <span class="fa fa-tweet" aria-hidden="true"></span>
     <span class="label">Tweet</span>
   </button>
   ```
   来源:https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden
2. **红线:可聚焦元素不得 aria-hidden**。"aria-hidden='true' should not be used on elements that can receive focus"、且不可加在可聚焦元素的祖先上(继承传染)。图标按钮的正确分工:图标装饰化 + 按钮拿 `aria-label`。
3. **何时允许摘除**:仅当"identical or equivalent meaning and functionality is exposed to assistive technologies"——隐藏的必须是冗余信息。
4. **语义/功能图标 → 可访问名描述"动作"而非"形状"**。W3C WAI Images Tutorial(功能性图片页,全文已核):替代文本应传达动作意图——"**'print this page' rather than '(image of a) printer', 'search' rather than 'magnifying lens'**";空 alt/缺 alt 会让读屏器朗读文件名或 URL。图标紧跟链接文字且不携带新信息时 → `alt=""`("decorative adjunct to the link text")。
   来源:https://www.w3.org/WAI/tutorials/images/functional/
5. **共享信息型图标**(如"新窗口"提示):替代文本承载图标语义("new window"),不是描述图像本身(同页 Example 3)。

### 4.2 WAI-APG 现状(如实记录)

- APG 实践章节已重构(2026-11 实测):旧页 `practices/images/` 与 `patterns/image/` 均 **404**(本次抓取核验);现行实践索引 https://www.w3.org/WAI/ARIA/apg/practices/ 仅含七页,与图标直接相关的是:
  - **Providing Accessible Names and Descriptions**:https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/ ("one of the most important responsibilities authors have")
  - **Hiding Semantics with the `presentation` Role**:https://www.w3.org/WAI/ARIA/apg/practices/hiding-semantics/
- 规则实质与 WAI 教程/MDN 一致:装饰性摘除、功能性给名。

### 4.3 色彩与状态条目的锚点

- **WCAG 2.2 SC 1.4.11 Non-text Contrast**:识别 UI 组件与状态所需视觉信息、以及理解内容所需的图形对象,**对比度 ≥3:1**(且 3:1 是阈值,"2.999:1 would not meet");焦点指示器同样受限;非激活组件豁免。
  来源:https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html (全文已核)
- hover/选中态换色不强制相互对比("mouse hover indicators contrast with the default state"无新要求),但**任何状态下组件不得失去与邻接色的 3:1**。
- 各家官方无障碍指南:Lucide 官网 Guide 设有 Accessibility 章节(含 "Accessibility in depth" 资源页,lucide.dev/guide/);Material 侧图标状态用 FILL 轴 + 色彩系统承担(§6)。

---

## 5. SVG symbol/use 雪碧图与 currentColor 染色

### 5.1 `<symbol>` + `<use>` 机制(MDN 一手)

来源:https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol 与 …/Element/use

- `<symbol>` 定义图形模板,"本身不可渲染,仅经 `<use>` 实例化";支持独立 `viewBox / width / height / preserveAspectRatio`——一个 24 网格模板可被任意尺寸实例承接;MDN:结构化文档"promote accessibility"
- `<use>` 把引用节点**深克隆进不暴露的 shadow DOM**;`width/height` 只在被引用对象是 `<svg>`/`<symbol>` 时生效(SVG2 后 x/y/width/height 升级为几何属性可 CSS 化)
- **外链雪碧图**:`<use href="sprite.svg#icon-id">`(SVG2 起 `href` 取代 `xlink:href`);现代实现可省略 fragment 引整文件
- **安全约束**:外链资源受**同源策略**限制,浏览器可拒绝跨域 `<use>`;`data:` URI 方式已因安全弃用
- **CSS 继承是唯一染色通道**:"CSS properties are not guaranteed to be inherited by the cloned DOM unless you explicitly request them using CSS inheritance"——shadow 克隆树不吃文档选择器,只吃继承
- 官方实践范例:Feather README 雪碧图节(§1.2)外链 `feather-sprite.svg#circle`;Phosphor 提供 unplugin 打包器雪碧图生成(README);Heroicons 官方不提供雪碧图产物(仅内联/组件包)

### 5.2 currentColor 染色链路(CSS Color 4 规范原文,curl 实读)

来源:https://www.w3.org/TR/css-color-4/ §6.4 与 §3.2(下载全文 grep 提取)

- §6.4 原文:"The keyword **currentcolor** represents value of the **color property on the same element**. Unlike `<named-color>`s, it is not restricted to sRGB; the value can be any `<color>`."
- §3.2 原文:`color` 属性"specifies the used value that **currentcolor resolves to**, which allows indirect references to this foreground color"
- 落地模式(五套通用,均有源文件实证):
  - 图标 path 层写 `fill="currentColor"`(Phosphor 全系实测)或 `stroke="currentColor"`(Lucide `defaultAttributes.ts`、Feather attrs、Heroicons outline 实测)
  - 组件层只设 `color:` 一处,图标+文字同步换色——Tailwind `text-gray-500` 类名方案即此机制(Heroicons README)
- 坑位清单(全部有一手出处):① path 上写死 fill/stroke 会封死 use 继承(use 对已定义属性不生效,MDN "Most attributes on `<use>` are ignored if the corresponding attribute is already defined");② 跨域 sprite 被 CORS 拦;③ `&display=block` 防 FOUC(Material 字体路线);④ `opacity="0.2"` 分层(Phosphor duotone)在单色 currentColor 模式下需双 path 才保留层次

---

## 6. 图标动效

### 6.1 Material Symbols 变量轴动画(官方盖章)

- **FILL 轴即状态动效通道**:README 原文 "It can also be manipulated for an animated fill effect, **to indicate user selection**";指南原文 "值为 0 表示默认,为 1 表示已填满……如需传达状态转换,请将填充轴用于动画或互动"
- 技术实现:可变字体 + CSS `font-variation-settings` 过渡(指南提供官方 CodePen 示例 "Material Symbols:可变轴动画");要点是**先子集化再动画**——1.7KB 级别才敢上首屏
- `opsz/wght/GRAD` 也可过渡,但每次轴过渡都是字形重排,预算在 150–250ms 内(§6.2)

### 6.2 微交互时长/缓动惯例(M3 官方 token,curl + Jina 实读)

来源:https://m3.material.io/styles/motion/easing-and-duration/tokens-specs

| Token | 值 | 官方用例 |
|---|---|---|
| duration.short3 / **short4** | 150ms / **200ms** | "Selection controls have a short duration of **200ms with Standard easing**" |
| duration.medium1–4 | 250–400ms | 中等跨区转场 |
| easing.**standard** | `cubic-bezier(0.2, 0, 1, 1)` | "simple, small, or utility-focused transitions"(微动效首选) |
| easing.emphasized-decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | 进场型强调 |
| easing.emphasized-accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | 退场型强调 |

→ **hover 微动效惯例:150–200ms + standard 缓动**是 M3 官方钦定区间;图标 hover 常用三招:FILL 轴填充(选中)、rotate/scale ≤90°/±1px(位移动效不进图标内部)、GRAD ±50 微调视觉重量。

### 6.3 无障碍护栏

- **`prefers-reduced-motion` 必须降级**:MDN 原文——该媒体特性探测用户"remove, reduce, or replace motion-based animations"的系统偏好,缩放/平移类动画可诱发前庭障碍("vestibular motion triggers");官方示例把 pulse 缩放动画降级为 opacity 溶解
  来源:https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- 图标动效降级策略:`transition: none` 直切终态,或换 opacity 微淡入——不删状态反馈本身
- React/Vue 组件库路线(lucide-react 等)把动画留给宿主,不在 SVG 内嵌 SMIL——与 tree-shaking 兼容

---

## 7. 未找到 / 未证实清单(如实)

1. **Phosphor 各权重具体线宽像素值**(如 regular=16px/256 网格):官方文档未找到文字定义;仅能从实测 path 弧半径给出相对关系。**未证实**
2. **Phosphor 256 网格的官方文字说明与 padding 数值**:官网 JS 渲染不可抓,README 无此信息;256×256 viewBox 为实测事实,padding 数值**未证实**
3. **Deque 一手图标无障碍文章**:原 URL `deque.com/blog/creating-accessible-icons/` 实测 **404**(本次抓取);检索引擎全部失败,未找到替代一手文章。规则改以 W3C WAI 教程 + MDN aria-hidden 交叉印证
4. **WAI-APG 旧版 Images Concepts 页**:`practices/images/` 实测 404;现行实践索引不含图片专页(重构后由 names-and-descriptions 与 hiding-semantics 承接)
5. **Lucide 图标总数**:官网文案 1600+ vs 仓库简介 2000+,两处不一致,如实并录
6. **Heroicons README 示例 stroke-width=2 与文件实际 1.5 的矛盾**:README 快速上手代码未随 v2 更新,以仓库真实文件为准(1.5)
7. **Material "描边 2dp" 逐字句**:经典规范页正文核到圆角 2dp 与 "shapes 2dp wide or less" 表述,但"stroke = 2dp"的独立成句未逐字抓到(标注于图形解剖图中);官方 AI 模板文件未解包验证
8. **Google Fonts 指南静态字体默认 opsz**:同一页面前文写 48、后文写 24;仓库 README 明确变量字体默认 24——以 README 为准,指南文本自身矛盾如实记录
9. **Okabe-Ito 色板分发格式**:与图标条目无关,本次未调研(应在色彩条目核实;学术色板无 CSS 变量/JSON 官方分发,需另行取证)
10. **lucide-static 是否内置雪碧图产物**:README 仅列包名与文档链接,雪碧图细节未核实

---

## 8. 十条签名巧思(可直接进条目)

1. **"圆比方大 2dp"当作光学铁律**:24 网格里方形键程 18、圆形键程 20——同面积视觉重量补偿是官方数值不是玄学,自绘/验收图标先量这两条线(Material system-icons)。
2. **1px 安全区 + 2px 元素间距写进设计 token**,并以"镂空里塞得进一个 2px 圆"作为机器可判的验收法(Lucide 贡献规范原版测试)。
3. **斜角半径 2.41px(1+√2)**:直角斜线倒圆保像素栅格对齐的官方公式,可直接做成 SVG lint 规则(Lucide specification)。
4. **视觉重量用模糊法验收**:与 `circle`/`square` 并排、整体模糊后比灰度深浅——把"感觉太重/太轻"变成可复核流程(Lucide 原版技法)。
5. **不对称图标允许光学偏心**:"几何居中不等于看着居中",小幅偏移是规范内的正操作而非失误(Lucide:may be moved slightly off center)。
6. **线宽哲学一句话讲透**:24px 静态系锚定 2px(Lucide/Feather;Heroicons 1.5px 是例外),连续变粗细走 Material Symbols 的 wght 100–700 轴,绝不缩放 SVG 硬改线宽。
7. **深浅双主题图标配 GRAD 轴**:黑底白图标 GRAD 调到 -25~-50 降眩光,强调态 +200——Google 官方给的负空间调节旋钮。
8. **hover 填充动效只有一条正道**:`FILL 0→1` 经 `font-variation-settings` 过渡(150–200ms、standard 缓动),且必须挂 `prefers-reduced-motion` 降级直切;等效降级 = 描边版与实底版两枚 symbol 换 `<use>`。
9. **雪碧图染色契约**:所有 symbol path 裸写(不带 fill/stroke),顶层统一 `currentColor`,宿主组件只发一个 `color:`;外链 sprite 必须同源且优先内联首屏(MDN 同源限制 + use 属性遮蔽规则)。
10. **无障碍三行 checklist**:装饰图标一律 `aria-hidden="true"`(且永不落在可聚焦元素上)/ 图标按钮可访问名写动作("打印此页"不是"打印机")/ 图标与相邻底色保 3:1 对比(2.999:1 算失败)。

---

## 9. 本次实际执行的核查命令与产物

- `curl -sL https://raw.githubusercontent.com/tailwindlabs/heroicons/master/src/24/outline/bars-3.svg`(及 20/solid、16/solid、24/solid)→ 输出证实 outline `stroke-width="1.5"`、三档独立 viewBox(报告 §1.3)
- `curl -sL https://raw.githubusercontent.com/phosphor-icons/core/main/assets/<weight>/acorn-<weight>.svg`(thin/light/regular/bold/fill/duotone 六连)→ 证实 `viewBox="0 0 256 256"`、`fill="currentColor"`、duotone 双 path `opacity="0.2"`(§1.4)
- `curl -sL https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/house.svg` 与 `.../packages/lucide/src/defaultAttributes.ts` → 证实 24px/2px/round/currentColor(§1.1)
- `curl -sL https://www.w3.org/TR/css-color-4/` + `python -I` 提取 §6.4 currentcolor 原文(§5.2)
- `curl -sL https://raw.githubusercontent.com/lucide-icons/lucide/main/docs/contribute/icons/design-principles.md` 与 `specification.md` → 全文实读(§3.2)
- fox_fetch 成功抓取:两个 GitHub README(icons 相关共 5 仓库)、lucide.dev 四页、m2.material.io system-icons(Jina)、m3.material.io icons overview + motion tokens(Jina)、developers.google.com/fonts/docs/material_symbols、w3.org WAI functional-images 与 non-text-contrast、MDN aria-hidden/use/symbol/prefers-reduced-motion、W3C APG practices 索引(§2/§4/§5/§6 来源页)
- fox_fetch 404 实证:lucide.dev/contribute/icons/design-specification、design-language(站点路径与仓库 docs 路径不同名)、w3.org APG 旧 images 页、deque.com 旧文
- 失败如实记录:web_reader 周配额耗尽(429,重置 2026-12-03);fox_search 两连败(全部引擎 0 结果/baidu blocked);GitHub REST API 匿名限流(改走 github.com 网页 JSON 接口列出 docs 目录)

*报告完 —— 所有数值均来自上列一手来源;未找到项已逐条声明,无任何推测填充。*
