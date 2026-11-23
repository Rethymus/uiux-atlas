# 11 · 现代新概念补研(全量补全)

> 调研日期:2026-11-22。
> 数据口径:浏览器支持一律取自 **MDN browser-compat-data(BCD)仓库原始 JSON**(抓取自 `raw.githubusercontent.com / cdn.jsdelivr.net` 的 `@main` 分支)与**各浏览器官方发布说明/官方博客**,逐条附来源 URL。
> 标注约定:凡非规范条款或未经来源核实的内容,均显式标注「**经验值(未证实)**」或「**未逐项核对**」。

---

## 1. CSS Anchor Positioning(锚点定位)

**定义**(MDN 原文大意):锚点定位模块定义了将元素「系(tether)」在一起的特性——某些元素被声明为**锚点元素**,**锚点定位元素**可依据所绑定锚点的位置与尺寸设置自身位置与尺寸;规范还提供溢出时的**备选位置**机制与**条件隐藏**机制。
来源:<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning>

**关键属性/参数**(MDN 参考页逐项核实):

| 名称 | 作用 |
|---|---|
| `anchor-name` | 给元素命名,使其可作为锚点 |
| `position-anchor` | 将定位元素与其锚点关联 |
| `anchor()` / `anchor-size()` | 函数:取锚点侧边位置 / 尺寸 |
| `position-area` | 基于锚点周围的区域网格定位(声明式九宫格) |
| `position-try-fallbacks` / `position-try-order` / `position-try` | 溢出时尝试备选位置;配合 `@position-try` 规则 |
| `position-visibility` | 条件隐藏(`always` / `anchors-visible` / `no-overflow`) |
| `anchor-center` | 值:相对锚点居中 |
| `anchor-scope` | 限制锚点名称查找范围 |
| 全局属性 `anchor` | HTML 属性形式的隐式锚点关联 |

**浏览器支持**(BCD `css/properties/anchor-name.json`,2026-11-22 抓取):

| 浏览器 | 版本 |
|---|---|
| Chrome / Edge | 125(2024-05) |
| Safari / iOS Safari | 26(WWDC25 官方预告:"Anchor positioning is a new layout mechanism for anchoring one element to another on the web";首个 beta 不含 `position-visibility`) |
| Firefox | **147**(官方发布说明 2026-01-13:"Support for CSS anchor positioning was added, enabling tethering elements.") |
| 增补 | `position-visibility`、`position-try-fallbacks` 的 flip-x/flip-y、伪元素支持:Safari 26.2;"定位在布局之后应用(zoom/transform)"修正:Chrome 144 / Safari 27 / Firefox 未支持 |

来源:
- BCD:<https://github.com/mdn/browser-compat-data/blob/main/css/properties/anchor-name.json>
- Safari 26 预告:<https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/>
- Firefox 147 发布说明:<https://www.firefox.com/en-US/firefox/147.0/releasenotes/>
- Safari 26.2 增补:<https://webkit.org/blog/17640/webkit-features-for-safari-26-2/>
- 规范:<https://drafts.csswg.org/css-anchor-position-1/>

**可复用片段**(属性名经 MDN 核实;两套写法按需取一):

```css
/* 声明锚点 */
.help-btn { anchor-name: --help-btn; }

/* 写法 A:anchor() 函数式(下方 + 水平居中) */
.help-pop {
  position: fixed;
  position-anchor: --help-btn;
  top: calc(anchor(bottom) + 8px);
  left: anchor(center);
  translate: -50%;            /* 左边缘对锚点中心 → 再回移半宽 */
}

/* 写法 B:position-area 声明式 + 溢出自动换位 */
.help-pop {
  position: fixed;
  position-anchor: --help-btn;
  position-area: bottom center;
  position-try-fallbacks: --pop-top;   /* 放不下则尝试上方 */
  position-visibility: anchors-visible; /* 锚点滚出视口则隐藏 */
}
@position-try --pop-top { position-area: top center; }

/* 特性检测 */
@supports (anchor-name: --a) { /* 增强样式 */ }
```

---

## 2. text-wrap: balance 与 pretty

**定义**(MDN 原文):`text-wrap` 是控制元素内文本换行方式的简写属性,是 `text-wrap-mode`(wrap/nowrap)与 `text-wrap-style`(auto/balance/stable/pretty/avoid-short-last-line)的组合;`balance` 使各行字符数尽量均衡,"仅对行数有限的文本块生效(**Chromium ≤6 行,Firefox ≤10 行**);`pretty` 使用更慢但更优的算法,面向正文排版,"把孤行(orphan)减到最少"。
来源:<https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap>(引文自该页 Values/Description)

**用法指引**(同页):短文本(标题、引语)用 `balance`;长正文用 `pretty`(有性能代价,仅在排版优于速度时使用);可编辑内容用 `stable`。

**浏览器支持**(BCD `css/properties/text-wrap.json`):

| 值 | Chrome | Firefox | Safari |
|---|---|---|---|
| `balance` | 114 | 121 | 17.5 |
| `pretty` | 117 | **未支持** | **26**(WWDC25 预告:"even out the ragged edge… prevent short last lines") |
| 简写属性整体 | Baseline 2024-03 起广泛可用(MDN 页头) | | |

来源:
- BCD:<https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap.json>
- Safari 26 预告(含 pretty):<https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/>
- 规范:CSS Text Module Level 4 <https://drafts.csswg.org/css-text-4/#text-wrap-shorthand>

**可复用片段**:

```css
h1, h2, h3 { text-wrap: balance; }            /* 标题 ≤6 行 */
p, li       { text-wrap: pretty; }            /* 正文防孤行 */
@supports not (text-wrap: pretty) { /* Firefox 降级:无处理,无需修复 */ }
```

---

## 3. prefers-reduced-data 与省流模式

**定义**(MDN 原文):Media Queries Level 5 媒体特性,检测用户是否请求更低流量的内容;取值 `no-preference`(布尔上下文为 false)与 `reduce`(希望轻量替代内容)。
**现状(关键)**:MDN 页面明确警示 "**This feature is not supported by any user agent** and its specifics are subject to change" —— **截至 2026-11-22 没有任何浏览器实现**;状态为实验性、非 Baseline。相关生态可参考 HTTP 头 `Save-Data`(MDN "See also" 提及;其当前各浏览器支持情况**未逐项核对**)。
来源:<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data>

**官方片段**(MDN 示例原文:省流时不加载花哨字体):

```html
<link rel="preload" href="fonts/montserrat-regular.woff2" as="font"
      media="(prefers-reduced-data: no-preference)" crossorigin />
```

```css
@media (prefers-reduced-data: no-preference) {
  @font-face {
    font-family: "Montserrat";
    src: url("fonts/montserrat-regular.woff2") format("woff2");
  }
}
body {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif;
}
```

来源:
- 规范:Media Queries Level 5 <https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-reduced-data>

---

## 4. columns 瀑布流与 Grid Lanes 现状

**A. 多列方案(CSS Multi-column,成熟可用)**
MDN 定义:该模块可将内容分栏,定义列数/列宽、列间距与分隔线;"每个列盒是一个片段(与分页媒体相似)";内容**沿列流动**。核心属性 `columns` / `column-count` / `column-width` / `column-gap` / `column-rule` / `column-span`,断行用 `break-inside`(fragmentation 模块)。核心属性早已全平台广泛支持;Level 2 的 `column-height`、`column-wrap`、`::column` 等仍在草案阶段。
局限:卡片顺序按**列**排布(自上而下再换列),不适合要求按行序阅读的场景。
来源:<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_multicol_layout> · 规范 <https://drafts.csswg.org/css-multicol/>

**B. 新方向:CSS Grid Lanes(CSS Grid Level 3)**
规范(CSSWG 草案,2026-11 在线抓取)要点:
- 新 display 值:"`grid-lanes [|] inline-grid-lanes` —— 使元素生成 block/inline 级 grid lanes 容器";
- 模型:"Grid lanes 布局把条目放入一个轴上类似 Grid 的预定义轨道(grid axis),在另一轴上像 Flex 一样自由堆叠(stacking axis)";
- 自动放置:"未显式放置的条目,按已放置条目尺寸,放入剩余空间最大的列(或行)";
- 新属性 `fit-tolerance`:`normal | <length-percentage> | infinite`;
- 优雅降级:规范原文给出 "`display: grid; display: grid-lanes;`" 写法——不支持的 UA 回退普通网格。
来源:<https://drafts.csswg.org/css-grid-3/>

**演进时间线**(WebKit 官方博客):
- Item Flow 提案(Item Flow Part 1/2)被搁置:两文页首有 "UPDATE December 2025 / January 2026" 注记(<https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/>、<https://webkit.org/blog/17219/item-flow-part-2-next-steps-for-masonry/>);
- "Safari Technology Preview 234 落地了瀑布流最终方案"(<https://webkit.org/blog/17746/new-safari-developer-tools-provide-insight-into-css-grid-lanes/>);
- 《Introducing CSS Grid Lanes》:<https://webkit.org/blog/17660/introducing-css-grid-lanes/>;兼容性问答:<https://webkit.org/blog/17758/when-will-css-grid-lanes-arrive-how-long-until-we-can-use-it/>;官方交互式教程:<https://gridlanes.webkit.org/>(<https://webkit.org/blog/18098/introducing-the-field-guide-to-grid-lanes/>);
- Safari 27.2 "renaming a Grid Lanes property"(属性仍在微调)(<https://webkit.org/blog/18515/webkit-features-for-safari-27-2/>)。

**浏览器支持**(BCD `css/properties/display.json` → `grid-lanes` 子项,标记 `experimental: true`):

| 浏览器 | 支持 |
|---|---|
| Safari / iOS | **26.4** |
| Firefox | `preview`(Nightly 预览) |
| Chrome | **未支持**(false) |

**可复用片段**(双 display 渐进增强):

```css
.cards {
  display: grid;        /* 回退:所有浏览器 */
  display: grid-lanes;  /* Safari 26.4+ / Firefox Nightly */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.cards > * { break-inside: avoid; }

/* 老方案:多列瀑布流(全平台可用,顺序按列) */
.wall { columns: 4 220px; column-gap: 16px; }
.wall > * { break-inside: avoid; margin-bottom: 16px; }
```

---

## 5. Spatial UI:visionOS 设计语言要点与 Web 借鉴

**官方 HIG 要点**(全文取自 Apple 官方 Markdown 接口 `designing-for-visionos.md`,2026-11 抓取;原文名词引用):
1. **Space(空间)**:"a limitless canvas",可承载 windows、volumes、3D objects;
2. **Immersion(沉浸)**:默认 **Shared Space** 多应用并排,可选 **Full Space** 独占;沉浸级别应"找到每个关键时刻所需的最小沉浸级别——不要假设每个时刻都需要完全沉浸";
3. **Passthrough(透视)**:外部摄像头实时视频,数字表冠调节多寡;
4. **Spatial Audio(空间音频)**:按环境建模声音;
5. **Eyes and hands(眼与手)**:"用眼睛注视虚拟对象 + 间接手势(tap)激活",或直接手势触摸;
6. **Ergonomics(舒适)**:"内容自动相对头部放置";最佳实践:"内容置于视野(field of view)内,避免需要转头或变姿";"避免压倒性、突兀、过快或缺乏静止参照系的运动";支持"手放腿上即可交互"的间接手势;
7. **Accessibility**:VoiceOver、Dwell Control 等内建;
8. **Windows**:优先用"出现在空间中的平面 + 熟悉控件"的标准窗口,系统 **dynamic scaling** 保证远近可读。

来源:<https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos>(Markdown 接口:<https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos.md>)
Web 侧锚点:Safari 26.2 起 **visionOS 上 WebXR 支持 WebGPU**(<https://webkit.org/blog/17640/webkit-features-for-safari-26-2/>)。

**Web 可借鉴手法**(本研究映射建议,非官方规范,**经验值**):
- 玻璃层:层叠卡片用 `backdrop-filter: blur(20px) saturate(1.4)` + 1px 内亮描边模拟系统玻璃窗口;
- 注视即悬停:visionOS 中"注视+确认"对应 Web 的 hover/focus —— 给交互目标更大的 hover 光圈与明确的 `:focus-visible` 反馈;
- 深度即层级:用少量大阴影表达 z 轴,而非大量描边;沉浸过渡尊重 `prefers-reduced-motion`;
- 舒适优先:关键操作置于视口中部安全区,避免两侧极远位置与全屏视差。

**可复用片段**(玻璃卡片):

```css
.glass {
  background: color-mix(in oklab, Canvas 55%, transparent);
  backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 24px;
  box-shadow: 0 12px 40px rgb(0 0 0 / .18);
  outline: 1px solid rgb(255 255 255 / .25);
  outline-offset: -1px;
}
@media (prefers-reduced-motion: reduce) { .glass { transition: none; } }
```

---

## 6. 经典粗野主义 vs Neo-Brutalism 判据差异

**经典 Web Brutalism 判据**(99designs《Brutalism in design》,2021;brutalistwebsites.com 宣言):
- 态度先行:"brutalism 更多描述一种心态而非视觉特征"——"摒弃装饰,暴露并庆祝构建设计的原材料";在 Web 上即"**默认、未加修饰的 HTML**"、系统默认字体(Times New Roman)、黑白灰单色、裸功能、模块化重复、直角矩形、未编辑的原样素材、超大字号;
- 谱系:源自法语 béton brut(生混凝土),1950s 建筑运动;2014 年前后由 Pascal Deville 的 brutalistwebsites.com 带火——"对轻飘、乐观、讨好式现代网页设计的年轻代反叛";代表:Craigslist。
来源:<https://99designs.com/blog/design-trends/brutalism/> · <https://brutalistwebsites.com/>

**Neo-Brutalism 判据**(HubSpot《Neo Brutalism: Your Guide to the Design Trend》,2025-07 更新):
- "锐利对比、未抛光元素、不对称、喧哗的字体、鲜艳的色彩";强调几何形状与功能;
- 标志性元素:**高饱和"响亮"色块、粗描边、无模糊的硬阴影(shadow 用作定义特征)、吸睛形状、不对称版式、展示型大字体**;
- 官方引述的定位:"一个骄傲的、显然的、完全数字的风格——像素之于新粗野主义,正如混凝土之于波士顿市政厅";
- **可访问性警示**(HubSpot UX 团队原文):浅色+微妙阴影对低视力用户是噩梦;抛弃常见导航模式会增加认知负担。
来源:<https://blog.hubspot.com/website/neo-brutalism>

**判据差异速查**(本研究归纳):

| 维度 | 经典粗野主义 | Neo-Brutalism |
|---|---|---|
| 核心 | 诚实裸露(未装饰的原生 HTML) | 风格化玩耍(设计过的"粗") |
| 色彩 | 黑白灰单色为主 | 高饱和撞色、鲜明色块 |
| 阴影 | 无(或裸边框) | **无模糊硬阴影**(offset+0 blur) |
| 边框/圆角 | 直角、默认值 | 粗黑描边 3-4px、多为直角 |
| 字体 | 系统默认字 | 实验性展示字体(仍要求可读) |
| 版式 | 混乱即诚实 | 不对称但块面清晰 |
| 态度 | 反装饰、反企业化 | 复古 + 嬉戏 + Gen Z 审美 |

**可复用片段**(Neo-Brutal 按钮;数值为本报告建议值,经验值):

```css
.neo-btn {
  background: #ffd12e; color: #111;
  border: 3px solid #111; border-radius: 0;
  box-shadow: 4px 4px 0 #111;          /* 硬阴影:x=y=4px, blur=0 */
  font-weight: 800; padding: 10px 18px;
}
.neo-btn:hover { translate: -1px -1px; box-shadow: 5px 5px 0 #111; }
.neo-btn:active { translate: 4px 4px; box-shadow: 0 0 0 #111; }
```

---

## 7. 极繁主义(Maximalism)参数化特征

**定义**(Wikipedia 原文):"maximalism 是一种以**过剩与丰盛(excess and abundance)**为特征的美学,是对极简主义的反动;哲学可概括为 **'more is more'**,与极简主义的 'less is more' 相对。"相关条目另见 **Horror vacui(空旷恐惧)**。
来源:<https://en.wikipedia.org/wiki/Maximalism>

**参数化数值**(把风格工程化的建议参数;**经验值——无官方数值标准,调研 03 已有骨架,此处补密度口径**):

| 参数 | 极简基准 | 极繁建议值 |
|---|---|---|
| 每屏色相数 | 1-2 | **≥5**(主色:辅色:点缀 ≈ 40/40/20,点缀色允许高饱和撞色) |
| 字阶跳跃 | 1.125-1.25 | **≥1.333(perfect fourth)**,标题用对比字族(衬线×无衬线/展示字×正文字) |
| 行长/密度 | 正文 60-75ch | 正文仍保 45-75ch(WCAG 1.4.8 优先),但卡片内文字块密度提升:行高可压至 1.25 |
| 装饰层叠 | ≤1 层 | **≥3 层**(底纹图案 + 描边/贴纸 + 亮色块),元素间允许叠印与轻微旋转(±2°) |
| 间距 | 大留白 | gap 压缩至 0.5-0.75 倍常规,但不为 0——保留呼吸缝 |

排版可读性红线(MDN 多列页引 WCAG 1.4.8):文字放大一倍不应出现滚动——密度用在装饰层,不牺牲正文行宽。

**可复用片段**(密度令牌化):

```css
:root {
  --max-hues: 5;              /* 每屏色相下限 */
  --max-step: 1.333;          /* 字阶跳跃 */
  --max-h: clamp(2rem, calc(1rem * var(--max-step) * 2), 4rem);
  --max-gap: 12px;            /* 压缩间距 */
  --max-tilt: 2deg;           /* 贴纸旋转上限 */
}
.max-card { rotate: var(--max-tilt); border: 3px double currentColor; }
```

---

## 8. 主题切换过渡(View Transitions 方案)

**API 现状**(BCD `css/properties/view-transition-name.json`,同套 `web-features: view-transitions` 数据):
`document.startViewTransition()` 同文档视图过渡:Chrome/Edge **111**、Safari **18**、Firefox **144**;`view-transition-name: match-element`:Chrome 137 / Firefox 144 / Safari 18.4。Safari 26.2 增补 `document.activeViewTransition`(WebKit 博客原文)。
来源:
- BCD:<https://github.com/mdn/browser-compat-data/blob/main/css/properties/view-transition-name.json>
- Chrome 官方文档:<https://developer.chrome.com/docs/web-platform/view-transitions> · 同文档详解:<https://developer.chrome.com/docs/web-platform/view-transitions/same-document>
- Safari 26.2:<https://webkit.org/blog/17640/webkit-features-for-safari-26-2/>

**官方主题切换片段**(Chrome 文档原文,圆形扩散 reveal——从点击坐标扩散到最远角):

```js
let lastClick;
addEventListener('click', event => (lastClick = event));

function themeToggle() {
  if (!document.startViewTransition) { swapTheme(); return; } // 优雅降级

  const x = lastClick?.clientX ?? innerWidth / 2;
  const y = lastClick?.clientY ?? innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  const transition = document.startViewTransition(() => swapTheme());
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
      ]},
      { duration: 500, easing: 'ease-in',
        pseudoElement: '::view-transition-new(root)', }
    );
  });
}
```

**自定义过渡动画**(Chrome 文档原文写法):

```css
::view-transition-old(root),
::view-transition-new(root) { animation-duration: 0.3s; }
/* 阻止默认交叉淡出:animation: none; mix-blend-mode: normal; */
/* 无障碍:包一层 @media (prefers-reduced-motion: reduce) 关闭动画 */
```

**配色联动**:`light-dark()` 函数按生效 color-scheme 取值(须先 `:root { color-scheme: light dark }`);web.dev 官方支持数据 **Chrome/Edge 123、Firefox 120、Safari 17.5**,"2024-05-13 成为新近 Baseline"。
来源:<https://web.dev/articles/light-dark> · MDN <https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark>

---

## 9. 控件现代化属性速览(accent-color / color-scheme / scrollbar-color 等)

支持数据均出自 BCD 仓库对应属性 JSON(2026-11-22 抓取):

| 属性 | 定义 | Chrome | Firefox | Safari | 备注 |
|---|---|---|---|---|---|
| `color-scheme` | 声明元素适用的配色方案,联动系统控件与 `Canvas` 等系统色 | 81 | 96 | 13 | `only` 关键字 Chrome 98;配 `<meta name="color-scheme">` |
| `accent-color` | 原生控件(checkbox/radio/progress 等)的强调色 | 93 | 92 | 15.4(**部分实现:不保证最低对比度**;26.2 起完整) | Chrome 149 起 `auto` 为反指纹固定返回值 |
| `scrollbar-color` | 滚动条滑块/轨道颜色(thumb / track 两个值) | 121 | 64 | **26.2**(WebKit:"建议停止使用 ::-webkit-scrollbar") | Android WebView 暂未支持 |
| `field-sizing: content` | 输入框/文本域按内容收缩生长 | 123 | **152** | **26.2** | 规范 CSS Forms L1 |

来源(BCD):
- <https://github.com/mdn/browser-compat-data/blob/main/css/properties/color-scheme.json>
- <https://github.com/mdn/browser-compat-data/blob/main/css/properties/accent-color.json>
- <https://github.com/mdn/browser-compat-data/blob/main/css/properties/scrollbar-color.json>
- <https://github.com/mdn/browser-compat-data/blob/main/css/properties/field-sizing.json>
- 规范:css-ui(#widget-accent)<https://drafts.csswg.org/css-ui/> · css-color-adjust <https://drafts.csswg.org/css-color-adjust/> · css-scrollbars <https://drafts.csswg.org/css-scrollbars/> · css-forms-1 <https://drafts.csswg.org/css-forms-1/>
- Safari 26.2 说明:<https://webkit.org/blog/17640/webkit-features-for-safari-26-2/>

**可复用片段**(控件一键品牌化):

```html
<meta name="color-scheme" content="light dark">
```

```css
:root { color-scheme: light dark; }         /* 滚动条/表单控件跟随系统 */
body  { accent-color: var(--brand, #6a5cff); }
html  { scrollbar-color: var(--brand, #6a5cff) transparent; }
textarea, input { field-sizing: content; }  /* 按内容自适应尺寸 */
```

---

## 10. 10 个签名巧思(与上述特性一一对应)

1. **锚点气泡**:Tooltip 用 `position-area: bottom center` 一句贴住按钮,溢出时 `@position-try` 自动翻到上方——零 JS 定位(条目 1)。
2. **平衡标题**:所有标题 `text-wrap: balance`,消灭参差行尾与孤字;正文 `pretty` 防孤行(条目 2)。
3. **圆形主题扩散**:主题切换用 `startViewTransition` + `clip-path: circle()` 从点击坐标扩散到全屏最远角(条目 8)。
4. **省流优雅降级**:为 `(prefers-reduced-data: reduce)` 预留"摘掉大图与花字体"的开关(标准先行,等待实现)(条目 3)。
5. **玻璃拟层**:`backdrop-filter: blur + saturate` + 1px 内亮描边,把 visionOS 玻璃窗带进网页卡片(条目 5)。
6. **硬阴影按钮**:Neo-Brutal 按钮 3px 描边 + `4px 4px 0 #000`,按下时位移归零——"像素压下去"的实体感(条目 6)。
7. **极繁密度标尺**:一屏 ≥5 色相、字阶跳 1.333、三层装饰叠印,但正文行长守 45-75ch(条目 7)。
8. **控件一键换肤**:`accent-color` + `color-scheme` + `scrollbar-color` 全部接品牌变量,暗色模式自动反色(条目 9)。
9. **瀑布流一行升级**:`display: grid; display: grid-lanes;` 双写,老浏览器回退网格、Safari 26.4 起泳道自动找剩余空间最大的列(条目 4)。
10. **注视即演出**:把 visionOS"注视+确认"翻译成 Web 语义——hover/focus 出现大光圈描边(`2px solid` + `offset 2px`),键盘与指针同样体面(条目 5)。

---

## 附:本报告核验方式说明

- 兼容数据:逐条抓取 `mdn/browser-compat-data` 仓库 `@main` 分支原始 JSON(raw.githubusercontent.com / cdn.jsdelivr.net),并交叉核对各浏览器官方发布说明(WebKit 博客、Firefox Release Notes)。
- 规范文本:CSSWG drafts 在线抓取(css-anchor-position-1、css-grid-3、css-text-4 等)。
- 设计判据:99designs、HubSpot、Wikipedia、brutalistwebsites.com 四处原文抓取。
- 未能核实项:`prefers-reduced-data` 当前无任何 UA 实现(已如实标注);`Save-Data` 头支持情况、极繁主义数值、visionOS→Web 映射、Neo-Brutal 片段数值均为经验值,已逐处标注「经验值/未逐项核对」。
