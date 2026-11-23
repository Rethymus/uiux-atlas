# 12 · 全量扩编所需新概念补研

> 调研日期：2026-11-22。核验方式：本次会话内逐条抓取 MDN / web.dev / W3C(WAI-APG) / Laws of UX / Ant Design / CSS-Tricks / Sara Soueidan / Evil Martians / GSAP / Chart.js / Wikipedia / 24ways 原文并提取要点；未能核验的内容均显式标注「未证实」。代码片段除注明出处外均为可复用的自研片段。

---

## 1. 响应式图片三件套（srcset / sizes / picture / 格式切换）与 fetchpriority

**定义**
- `srcset` + `sizes`（写在 `<img>` 或 `<source>` 上）：同一图像的多个分辨率候选，由浏览器在下载前自行选择——仅提供多密度版本时官方建议直接用 `<img srcset>`，无需 `<picture>`，这样省流量模式下浏览器可自动选低密度版本。
- `<picture>`：显式控制。用于三种场景：① art direction（按视口裁剪/换构图）；② 格式切换（AVIF/WebP 兼容回退）；③ 按设备能力选图省流量。
- `fetchpriority`：向浏览器提示资源相对优先级的提示性信号（非指令）。

**关键参数/属性**
- `<source>`：`media`（媒体条件，false 则跳过）、`srcset`（URL + `300w` 宽度描述符 或 `2x` 密度描述符，两者不可混用、不允许重复值）、`sizes`（媒体条件–槽宽对，仅在 srcset 用 `w` 描述符时生效）、`type`（MIME 类型，不支持则跳过）。
- 选择规则：有 `sizes` 时「槽宽 × DPR = 理想宽度」，从 srcset 选最接近者；全部不匹配时回退 `<img src>`。
- `fetchpriority`：`high` / `low` / `auto`（默认）。Fetch API 对应为 `fetch(url, { priority: 'low' })`。
- `object-fit` / `object-position` 必须写在子 `<img>` 上，不是 `<picture>` 上。

**浏览器支持**
- `<picture>`：Baseline「Widely available」，自 2016-03 起主流浏览器可用（MDN）。
- `fetchpriority`：Chrome/Edge 102+、Firefox 132+、Safari 17.2+（web.dev）。

**官方 URL**
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
- https://web.dev/articles/fetch-priority

**可复用片段**
```html
<!-- 格式切换 + LCP 提速 + 防布局偏移 -->
<picture>
  <source type="image/avif" srcset="hero.avif 1200w, hero@2x.avif 2400w" sizes="(min-width: 900px) 60vw, 100vw">
  <source type="image/webp" srcset="hero.webp 1200w, hero@2x.webp 2400w" sizes="(min-width: 900px) 60vw, 100vw">
  <img src="hero.jpg" srcset="hero.jpg 1200w, hero@2x.jpg 2400w" sizes="(min-width: 900px) 60vw, 100vw"
       width="1200" height="675" fetchpriority="high" alt="…">
</picture>
<!-- 轮播：首图 high，其余 low（web.dev 轮播用例） -->
<img src="slide-2.jpg" fetchpriority="low" loading="lazy" alt="…">
```
> web.dev 实测：Google Flights 给 LCP 图加 `fetchpriority="high"`，LCP 2.6s → 1.9s；Oodle 轮播非首图设 low，加载减少 2s。注意：`loading="lazy"` 的近视口图片仍可能被浏览器以 high 加载，此时应改用 `fetchpriority="low"`；CSS 背景 LCP 需 `<link rel="preload" as="image" fetchpriority="high">` 组合。

---

## 2. CSS 逻辑属性（Logical Properties）与书写模式（writing-mode）

**定义**：以「块流(block) / 内联流(inline)」维度代替物理 top/right/bottom/left。inline 平行于文本行流动方向，block 垂直于它；`start/end` 相对书写方向——「一行的开头不总是左侧」（阿语 RTL、中日竖排）。

**关键参数/属性**
- 映射（MDN）：`padding-left → padding-inline-start`；`margin-left → margin-inline-start`；`width → inline-size`；`height → block-size`；`top → inset-block-start`；`border-bottom → border-block-end`。
- 简写族：`padding-block / padding-inline / margin-block / margin-inline / inset / inset-block / inset-inline`（各含 -start/-end）。
- 圆角逻辑版：`border-start-start-radius` 等 4 个（block×inline 起止组合）。
- `writing-mode`：`horizontal-tb`（默认）/ `vertical-rl`（传统中日竖排）/ `vertical-lr` / `sideways-rl` / `sideways-lr`（字形整体侧放，仍为 experimental，需 `@supports` 检测）。`lr`/`tb` 等旧值已废弃。配套：`direction`（行内方向）、`text-orientation`（竖排字形朝向）、`text-combine-upright`（纵横对齐）。

**浏览器支持**：逻辑属性核心集 Chrome 87 / Firefox 41+ / Safari 14.1 起基本全面（MDN 页正文未给完整矩阵，此版本号为 MDN 页面备注，建议查 caniuse）；`writing-mode` Baseline 自 2017-03；`sideways-*` 需特性检测。

**官方 URL**
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
- 规范：https://drafts.csswg.org/css-logical/
- https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode

**可复用片段**
```css
.card {                       /* RTL/竖排自动翻转 */
  padding-block: 1rem;
  padding-inline: 1.5rem;
  border-start-start-radius: 12px;
}
.avatar { margin-inline-start: auto; }          /* 推到「末侧」而非右 */
aside h2 { writing-mode: vertical-rl; }         /* 侧边书脊标签 */
.tag { writing-mode: sideways-lr; }             /* 西文自下而上 */
@supports not (writing-mode: sideways-lr) {
  .tag { transform: rotate(-90deg); }           /* 回退旋转 */
}
```

---

## 3. FLIP（First-Last-Invert-Play）精确步骤

**定义**（Paul Lewis, aerotwist）：
1. **First**：记录元素初始位置 `getBoundingClientRect()`；
2. **Last**：让元素到达最终状态（改 class/顺序），再测一次终态位置；
3. **Invert**：用「初态 − 终态」差值施加反向 transform（如 `translateY(first.top - last.top)`），视觉上元素仍停在原地——但已真实占据终态布局；
4. **Play**：rAF 里移除反向 transform（或用 WAAPI `el.animate([{transform:invert},{transform:'none'}])`），元素滑向终点。

**关键要点**
- 只动画 transform/opacity（compositor-only，"无重绘"），昂贵的布局计算一次性前置；利用交互后约 **100ms 响应窗口**做预计算。
- scale invert 会让内容形变（文字被拉伸），必要时调整 DOM 结构分离动画单元。
- transition 路线用 `transitionend` 清理；WAAPI 路线用 `finish` 事件；也可用 GSAP FLIP 插件。
- 逐帧 layout（改 left/top/width）代价高昂是 FLIP 存在的理由。

**浏览器支持**：依赖的 `getBoundingClientRect` / transform / WAAPI 均为 Baseline 广泛可用。

**官方 URL**：https://aerotwist.com/blog/flip-your-animations/
（Josh Comeau 同主题文章本次抓取返回 404，未采用。）

**可复用片段**（源自 aerotwist 示例改写）
```js
function flip(el, change) {
  const first = el.getBoundingClientRect();          // First
  change();                                          // 触发终态
  const last = el.getBoundingClientRect();           // Last
  const dx = first.left - last.left, dy = first.top - last.top,
        s  = first.width / last.width;               // Invert
  if (!dx && !dy && s === 1) return;
  el.style.transition = 'none';
  el.style.transformOrigin = 'top left';
  el.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  requestAnimationFrame(() => {                      // Play
    el.style.transition = 'transform .35s cubic-bezier(.2,.7,.3,1)';
    el.style.transform = '';
    el.addEventListener('transitionend', () => {
      el.style.transition = el.style.transform = '';
    }, { once: true });
  });
}
```

---

## 4. CSS Scroll Snap（吸附轴 / 对齐 / scroll-padding）

**定义**：通过「吸附位置」控制滚动容器停靠，实现分页与滚动定位。核心概念：子元素经 `scroll-margin` 外扩后的 **snap area**，与容器经 `scroll-padding` 内缩后的 **snapport**，吸附即让二者对齐。

**关键参数/属性**
- 容器：`scroll-snap-type: x|y|both|block|inline × mandatory|proximity`；`overscroll-behavior` 防链式滚动。
- 子项：`scroll-snap-align: start|center|end`（双轴可分写）；`scroll-snap-stop: normal|always`（always 禁止滑过）。
- `scroll-padding`（容器上，内缩 snapport——顶部有吸顶导航时必加）vs `scroll-margin`（子项上，外扩 snap area）。
- Level 2：`scrollsnapchange` / `scrollsnapchanging` 事件与 `SnapEvent`（`snapTargetBlock` / `snapTargetInline`），较新，需降级处理。

**浏览器支持**：Level 1（type/align/stop/padding/margin）现代浏览器广泛支持；Level 2 事件较新（MDN 提示用 `@supports`/降级）。

**官方 URL**：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap

**可复用片段**
```css
.rail {
  display: flex; gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 16px;     /* 卡片吸附后左侧留出槽距 */
  overscroll-behavior-x: contain;
}
.rail > * {
  scroll-snap-align: start;
  scroll-snap-stop: always;        /* 每次只翻一张卡 */
  scroll-margin-inline-start: 16px;
}
.rail > *:last-child { margin-inline-end: 16px; }
```

---

## 5. 磁吸交互（magnetic hover / cursor）与可访问性降级

**定义**：元素在指针接近半径(dist)内被"吸引"产生位移，离开则弹回；常配 lerp（线性插值）平滑。

**关键参数/实现**
- `dist`：阈值半径，常用 `getBoundingClientRect()` 中心与指针距离，或「指针在盒内边界内缩/外扩 25%~50%」判定；
- `lerp(a, b, n) = (1 - n) * a + n * b`：每帧向目标靠近 n（0.05~0.2），配 rAF 循环；
- GSAP 官方推荐 `gsap.quickTo()`：为「同一目标同一属性的高频 tween」预配置复用函数（GSAP 3.10.0+），跳过普通 tween 的解析开销，官方示例场景即鼠标跟随与磁吸按钮；
- 可访问性降级：`@media (hover: none)`（触屏无 hover 语义）、`@media (prefers-reduced-motion: reduce)`（前庭障碍用户，大位移缩放/平移是典型触发源，应换成温和溶解或直接关闭磁吸）。

**浏览器支持**：`prefers-reduced-motion` Baseline 自 2020-01 广泛可用（MDN）；`gsap.quickTo` 需 GSAP 3.10.0+。
> 具体的 Codrops 磁吸教程 URL 本次未能核验（搜索引擎结果污染），磁吸模式本身以上述 GSAP 官方文档与标准 lerp 数学为准。

**官方 URL**
- https://gsap.com/docs/v3/GSAP/gsap.quickTo()
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

**可复用片段**
```js
function magnetize(el, { radius = 0.45, lerp = 0.15 } = {}) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const xTo = gsap?.quickTo?.(el, 'x', { duration: .4, ease: 'power3' });
  const yTo = gsap?.quickTo?.(el, 'y', { duration: .4, ease: 'power3' });
  let tx = 0, ty = 0, cx = 0, cy = 0, raf;
  const loop = () => {                       // 手写 lerp 版：无 GSAP 时也可用
    cx += (tx - cx) * lerp; cy += (ty - cy) * lerp;
    el.style.translate = `${cx}px ${cy}px`;
    raf = requestAnimationFrame(loop);
  };
  const move = e => {
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(mx, my);
    const reach = Math.max(r.width, r.height) / 2 / (1 - radius);
    if (dist < reach) { tx = mx * radius; ty = my * radius; }
    else                { tx = 0; ty = 0; }              // 超出 dist 弹回
    if (!xTo) raf ??= requestAnimationFrame(loop);
    else { xTo(tx); yTo(ty); }
  };
  const leave = () => { tx = ty = 0; };
  el.addEventListener('mousemove', move);
  el.addEventListener('mouseleave', leave);
  return () => { cancelAnimationFrame(raf); /* 解绑… */ };
}
```
```css
@media (prefers-reduced-motion: reduce), (hover: none) {
  .magnetic { translate: none !important; }   /* 直接回到普通 hover */
}
```

---

## 6. 动态文字（Kinetic Typography：可变字体轴动画 / 逐字 reveal）

**定义**：用可变字体的注册轴做"重量/宽度渐变"动效，或将文本拆成字符/单词做错落(stagger)揭示。

**关键参数/属性**
- 注册轴（MDN）：`wght` 1–1000 ↔ `font-weight`；`wdth` 百分比 ↔ `font-stretch`；`opsz` ↔ `font-optical-sizing`；`ital` 0/1、`slnt` −90~90 ↔ `font-style`；自定义轴大写（如 `GRAD`，改变视觉密度不改变占位——**可动画而不引起重排**）。
- `font-variation-settings` 是低层语法：轴名区分大小写；改一个值需重声明全部 → 用 CSS 变量绕过。
- `@font-face` 范围描述符：`font-weight: 125 950; font-stretch: 75% 125%; font-style: oblique 0deg 12deg;`；`font-synthesis: none` 防合成假斜体。
- 逐字拆分：GSAP SplitText（v3.13+ 重写，体积减半）：`type: "words, chars"`、`mask`（裁剪容器 reveal）、`autoSplit`（字体加载/宽度变化自动重拆）、`onSplit`、`aria`（默认 "auto" 加无障碍属性）；可脱离 GSAP 核心单独加载。
- GSAP 免费情况：官方文档页未载明许可条款（Webflow 收购后免费的结论来自背景知识，未在本次页面核验）。

**浏览器支持**：可变字体需 `@supports (font-variation-settings: "wdth" 115)` 检测；旧系统（macOS < 10.13）不支持；SplitText 为 JS 库无浏览器门槛。

**官方 URL**
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide
- https://gsap.com/docs/v3/Plugins/SplitText/

**可复用片段**
```css
/* 轴动画：变量驱动，hover 只改一个变量 */
@font-face {
  font-family: "Amstelvar VF";
  src: url("AmstelvarAlpha-VF.woff2") format("woff2-variations");
  font-weight: 300 900; font-stretch: 35% 100%;
}
.kinetic {
  --wght: 400;
  font-family: "Amstelvar VF";
  font-variation-settings: "wght" var(--wght), "GRAD" 88;
  transition: --wght .5s;          /* 配合 @property 注册后才可过渡 */
}
@property --wght { syntax: "<number>"; inherits: false; initial-value: 400; }
.kinetic:hover { --wght: 700; }
```
```js
// 逐字 reveal（SplitText 官方示例）
gsap.registerPlugin(SplitText);
let split = SplitText.create(".headline", { type: "words, chars", mask: "chars" });
gsap.from(split.chars, { duration: 1, yPercent: 100, autoAlpha: 0, stagger: 0.05 });
// 无 GSAP 兜底：手写拆字 + CSS 交错
document.querySelectorAll(".headline").forEach(el => {
  el.innerHTML = [...el.textContent].map((c, i) =>
    `<span style="animation-delay:${i * 40}ms">${c === " " ? "&nbsp;" : c}</span>`).join("");
});
```
```css
.headline span { display: inline-block; animation: rise .6s cubic-bezier(.2,.7,.3,1) both; }
@keyframes rise { from { transform: translateY(110%); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .headline span { animation: none; } }
```

---

## 7. 接触阴影（contact shadow / AO）与镜面高光层的 CSS 实现

**定义**
- 接触阴影：物体与地面接触处的深色紧密阴影，模拟环境光遮蔽(AO)；CSS 惯用「椭圆伪元素 + blur」实现。
- 分层阴影：box-shadow 单层高斯模糊粗糙，叠加多条同透明度、倍增偏移/模糊半径的阴影（1/2/4/8/16px）更真实（Josh Comeau）。
- 镜面高光：`::before` 径向/线性渐变叠加一条顶部"天光反射"，模拟光滑材质的 specular 层。

**关键参数**
- 阴影不叠纯黑：用背景色相、降饱和降亮度（蓝底示例 `hsl(220deg 60% 50%)`），否则压灰褪色；
- 单一全局光源：全站阴影共享同一偏移比例（如水平:竖直 = 1:2）；元素越"近"，偏移与模糊越大、透明度越低；
- 分层同透明度（如全部 0.075）保持一致；分层阴影渲染开销大，不建议对其做动画；
- `filter: drop-shadow` 沿真实形状描边（透明 PNG、带箭头 tooltip），GPU 加速更快；但 Safari 对含文本输入元素套 filter 会引入输入延迟；
- 用 `--shadow-color: 220deg 60% 50%` 变量统一管理，换主题时只改一处（配合 Shadow Palette Generator 工具）。

**浏览器支持**：box-shadow / filter / 渐变均 Baseline 广泛可用。
> 「接触阴影/AO」术语来自 3D 渲染（ambient occlusion），CSS 社区惯用伪元素椭圆做法属通用实践，本次未找到单一权威文档定义——实现思路标注为实践共识；分层阴影与着色阴影原则已核验（Josh Comeau）。

**官方 URL**：https://www.joshwcomeau.com/css/designing-shadows/

**可复用片段**
```css
:root { --shadow-color: 220 60% 50%; }        /* 跟随背景色相，换肤只改这里 */
.card {
  box-shadow:
    1px 2px 2px   hsl(var(--shadow-color) / .2),
    2px 4px 4px   hsl(var(--shadow-color) / .2),
    4px 8px 8px   hsl(var(--shadow-color) / .2),
    8px 16px 16px hsl(var(--shadow-color) / .2),
    16px 32px 32px hsl(var(--shadow-color) / .2);
  position: relative;
}
/* 接触阴影：贴地椭圆，模拟 AO */
.card::after {
  content: "";
  position: absolute; inset-inline: 10%; bottom: -6px; height: 12px;
  border-radius: 50%;
  background: hsl(var(--shadow-color) / .25);
  filter: blur(6px);
  z-index: -1;
}
/* 镜面高光层：顶部一道 6px 天光 */
.card::before {
  content: "";
  position: absolute; inset: 0 0 auto 0; height: 6px; border-radius: inherit;
  background: linear-gradient(hsl(0 0% 100% / .5), transparent);
  pointer-events: none;
}
.tooltip { filter: drop-shadow(1px 2px 3px hsl(var(--shadow-color) / .3))
                 drop-shadow(2px 4px 6px hsl(var(--shadow-color) / .3)); }
```

---

## 8. 压暗层（dimming / scrim）与景深层次（depth of field, blur 分层）

**定义**
- scrim：半透明遮罩，压暗下层内容以突出前景；原生载体是 `<dialog>` / Popover / 全屏元素的 `::backdrop`（与 viewport 同尺寸、渲染于顶层元素正下方，LIFO，不继承任何属性）。
- 景深：用 `filter: blur()` 对"远景层"降清晰度、配合 scrim 压暗与前景清晰层，构成三层深度（blur → dim → sharp）。

**关键参数**
- `::backdrop` 典型：`background: rgb(0 0 0 / 25%)`；MDN 示例即半透明色/渐变。
- 造半透明状态色优先 `color-mix(in oklab, var(--brand) 25%, transparent)`（只能降不透明度，不能反向提升）；需要提不透明度/通道运算时用相对颜色 `rgb(from var(--c) r g b / calc(alpha - 0.1))`。
- `filter: blur()` 作用于元素本身；`backdrop-filter` 作用于元素背后的内容（毛玻璃）；滤镜 GPU 合成、可能建新合成层，大面积强模糊开销显著，避免对大区域或频繁动画元素使用；`will-change` 可提示优化。
- 系统级偏好：Material Design 的 scrim 具体不透明度规范（M2 暗色主题 ~32% 黑等）本次抓取页面正文为空，**未证实**——工程上以 `color-mix`/rgba 25%~60% 实测可读性为准。

**浏览器支持**：`::backdrop` Baseline 自 2022-03；`filter` Baseline 自 2016-09；`color-mix()` Baseline 自 2023-05；相对颜色语法部分浏览器支持程度不一（Safari 16.4+ 旧语法要求 calc 内用百分比，需 `@supports` 分支）。

**官方 URL**
- https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop
- https://developer.mozilla.org/en-US/docs/Web/CSS/filter
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb（相对颜色语法一节）

**可复用片段**
```css
:root { --scrim: color-mix(in oklab, black 55%, transparent); }
dialog {                          /* 前景清晰层 */
  background: var(--bg); border-radius: 16px;
}
dialog::backdrop {                /* 压暗层：带一点品牌色相的压暗 */
  background: color-mix(in oklab, var(--scrim) 80%, var(--brand));
}
/* 景深三层：背景虚化 + scrim + 前景 */
.stage { position: relative; }
.stage__far   { filter: blur(8px) saturate(.9); transform: scale(1.02); }
.stage__glass { backdrop-filter: blur(6px); background: var(--scrim); }
/* 支持 dialog 动画淡入（backdrop 不继承、可自由设样式） */
dialog[open] { animation: pop .3s ease; }
@keyframes pop { from { opacity: 0; transform: translateY(8px); } }
/* 相对颜色语法：hover 派生暗 20% */
.btn:hover { background: rgb(from var(--base) calc(r * .8) calc(g * .8) calc(b * .8)); }
@supports (color: rgb(from red r g calc(b + 30%))) {
  /* Safari 16.4 旧语法分支（通道值需带 %） */
}
```

---

## 9. 表格数字 tabular-numbers、基线网格（baseline grid）、字体搭配方法论

**定义**
- `tabular-nums`：所有数字等宽，纵向对齐，专为表格/仪表盘场景（MDN 原文 "easily aligned like in tables"），对应 OpenType `tnum`。
- 基线网格/竖直韵律：Bringhurst——"空间如时间，比例化间隔远胜任意值"；竖直韵律由字号、行高、margin/padding 三者共同构成（Richard Rutter, 24ways 2006）。
- 字体搭配：Google Fonts Knowledge「Choosing type」栏目为官方入口，但页面 JS 渲染、本次仅能确认栏目标题，**具体搭配文章未能核验**——方法论部分以下述通用实践呈现（标注未证实）。

**关键参数**
- `font-variant-numeric` 全值：`lining-nums`(lnum) / `oldstyle-nums`(onum)；`proportional-nums`(pnum) / `tabular-nums`(tnum)；`diagonal-fractions`(frac) / `stacked-fractions`(afrc)；外加 `ordinal`(ordn)、`slashed-zero`(zero)。可空格组合。
- 竖直韵律算法：定基本单元 = 正文行高（如 12px 字号 × 1.5 = 18px）；一切垂直尺寸（margin/padding/行高）落在其整数倍；标题用 `18 ÷ 字号` 反推行高（14px 标题行高 1.286），或不对称 margin 总和为单元倍数；全部用 em 保证用户缩放不破坏节奏。
- 搭配方法论（实践共识，未证实来源）：对比原则（衬线×无衬线、大字重×常规、高对比×中性）；优先同家族多轴可变字体（一字体搞定全站层级）；正文与标题职责分离后不再加第三种字体；标题字体只用于大字号、正文字体必须经长文阅读测试。

**浏览器支持**：`font-variant-numeric` Baseline 自 2020-01；特性生效前提是字体本身包含对应 OpenType 特性。

**官方 URL**
- https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
- https://24ways.org/2006/compose-to-a-vertical-rhythm/
- https://fonts.google.com/knowledge/choosing_type（入口）

**可复用片段**
```css
:root { --base: 1.5rem; }                    /* 基本单元 24px */
body   { font-size: 1rem; line-height: var(--base); }
p      { margin-block: var(--base); }
h1     { font-size: 2.5rem; line-height: calc(var(--base) * 2);
         margin-block: var(--base); }
table td.num { font-variant-numeric: tabular-nums; }   /* 数字列不抖动 */
.price { font-variant-numeric: tabular-nums slashed-zero; }  /* 0 加斜杠防混淆 O */
sup    { font-variant-numeric: diagonal-fractions; }
```

---

## 10. 小型大写 / 开放特性（font-feature-settings）与垂直韵律

**定义**：`font-feature-settings` 直连 OpenType 特性标签的低层属性；官方明确：**能用高层属性就用高层属性（font-variant-* 简写），"不要用它启用小型大写"**。

**关键参数**
- 语法：`"tag" <integer|on|off>`，标签必须恰好 4 个 ASCII 字符（U+20–U+7E），否则整条声明无效；`on/off` ≡ `1/0`，缺省 `1`；非布尔特性用数值选字形变体（`"swsh" 2` = 第 2 个花体字形）。
- 常用标签：`kern`（字距，默认开）、`liga`（连字，`"liga" 0` 可关）、`smcp`（小型大写）、`c2sc`（大写→小型大写）、`onum/lnum/tnum/pnum/frac/afrc/zero/ordn`、`sups/subs`（上/下标）、`ss01–ss20`（风格集）、`salt`（替代字形）、`swsh`、`hist`。
- 高层替代：`font-variant-caps: small-caps | all-small-caps`；`font-variant-position: super | sub`；`font-variant-numeric`（见 §9）。
- 垂直韵律实践见 §9（同一方法论体系：固定倍数 + em 纪律 + 边框计入节奏——1px 边框 + 8px padding = 9px 恰为半单元）。

**浏览器支持**：`font-feature-settings` Baseline 自 2016-03 广泛可用。

**官方 URL**：https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings

**可复用片段**
```css
abbr, .kicker {                     /* 首选高层属性 */
  font-variant-caps: all-small-caps;
  letter-spacing: 0.08em;
}
.chem { font-variant-position: sub; }              /* H₂O 语义下标 */
.fancy { font-feature-settings: "ss07"; }          /* 仅高层无法表达时用 */
.italic-safe { font-synthesis: none; }             /* 防合成斜体 */
.no-liga { font-feature-settings: "liga" 0; }      /* 关连字 */
```

---

## 11. 颜色函数族（color-mix / 相对颜色）、状态色系统、多品牌主题 token

**定义**
- `color-mix(<插值方法>?, <color> <p1>?, <color> <p2>?)`：在指定色彩空间插值混色；默认 `oklab`；极坐标空间可加 `shorter|longer|increasing|decreasing hue`。
- 相对颜色语法：`rgb(from <color> r g b / alpha)`——原色解构为通道变量，可 `calc()` 运算；输出空间可与输入不同（原色 hsl/hwb 自动转换）。

**关键参数**
- 百分比归一化：双省 → 各 50%；单省 → 补足 100%；`p1+p2 < 100%` → alpha 乘数（等效混 transparent）；两者 0% → 无效。
- 与 `transparent` 混合 = 调透明度（只能降）；alpha 运算用相对颜色（可升可降）。
- 色彩空间选型（MDN）：模拟色光 → `xyz`/`srgb-linear`；感知均匀渐变 → `oklab`/`lab`；避免变灰 → `oklch`/`lch`；匹配 sRGB 设备 → `srgb`。
- 状态色系统：以品牌主色为源，派生 hover/active/focus/disabled/disabled-bg 五态；相对颜色里 `rgb` 通道解析为 0–255 数字（calc 内加数字不加百分比——`calc(g + 25)` 合法，`calc(g + 25%)` 在现行语法无效）。
- 多品牌 token：CSS 变量三层（primitive → semantic → component），品牌切换只替换 primitive 层。

**浏览器支持**
- `color-mix()`：Baseline 自 2023-05。
- 相对颜色：Baseline「widely available」但标注"部分支持程度不一"；Safari 16.4 起支持但旧语法要求 calc 内通道用百分号，用 `@supports (color: rgb(from red r g calc(b + 30%)))` 分支处理（MDN 原文示例）。

**官方 URL**
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb

**可复用片段**
```css
:root {
  --brand: oklch(0.62 0.19 250);
  /* 状态色：全部从主色派生，多品牌只换 --brand */
  --brand-hover:    color-mix(in oklab, var(--brand), black 12%);
  --brand-active:   color-mix(in oklab, var(--brand), black 24%);
  --brand-soft-bg:  color-mix(in oklab, var(--brand) 12%, transparent);
  --brand-border:   color-mix(in oklab, var(--brand) 40%, transparent);
  --on-brand:       color-mix(in oklab, var(--brand), white 85%);
}
.theme-crimson { --brand: oklch(0.58 0.2 20); }
.theme-forest  { --brand: oklch(0.6 0.15 150); }

.btn:hover  { background: rgb(from var(--brand) calc(r * .85) calc(g * .85) calc(b * .85)); }
.card:focus-visible { outline: 2px solid color-mix(in oklab, var(--brand), white 20%); }
```

---

## 12. 图标体系：icon font vs SVG、图标按钮、favicon 体系

**定义**
- icon font：把图标字形装进字体文件，靠 `<i class="icon-x">` 渲染；SVG（尤其 inline SVG）：真正的矢量图形元素。
- favicon 体系（Evil Martians, Andrey Sitnik）：**5 图标 + 1 manifest** 即覆盖所有需求，不必生成 20+ PNG。

**关键对比（CSS-Tricks "Inline SVG vs Icon Fonts [CAGEMATCH]", Chris Coyier, 2014）**
- icon font 缺点：文本反锯齿导致发虚；定位依赖 line-height/vertical-align 难对齐；失败面大（CORS、字体加载失败、Opera Mini 不支持 @font-face、广告拦截/用户字体、Unicode 私有区撞 emoji）；语义/无障碍需额外小心。
- SVG 优点：真矢量更锐；CSS 可控到多色图标的各部分；尺寸即本身大小、定位直观；内嵌文档无怪异失败态；配 `<title>/<desc>`/aria 更可访问。原文结论："能到 IE9+/Android 3+，inline SVG 几乎全面胜出"；需 IE8 时 icon font 仍占优（评论区亦指出 SVG 在缓存/DOM 体积上的不足）。
- 可访问图标按钮（Sara Soueidan）：三方案对比——①视觉隐藏文本；②`hidden` 文本 + `aria-labelledby`（ARIA 允许引用隐藏元素）；③按钮 `aria-label`。`aria-label` 缺点：文本不进 DOM、整页翻译工具无法处理、部分语音控制识别困难、不可复制。**推荐**：图标 `aria-hidden="true"` + `focusable="false"`（防 IE 双 Tab 停靠）当装饰，名称由按钮自身提供；有可见文本时 aria-label 必须与之一致（WCAG 2.1 Label in Name）；**不要**把名称只放 SVG 上（Scott O'Hara 测试各浏览器/读屏组合均有失败）。
- favicon 清单：`favicon.ico` 32×32（根目录，RSS 阅读器只认这个路径；`sizes="32x32"` 修 Chrome 忽略 SVG 的 bug）→ `icon.svg`（现代浏览器，内嵌 `<style>` + `prefers-color-scheme` 暗色适配）→ `apple-touch-icon.png` 180×180（iOS，建议加 20px 内边距与背景色）→ `icon-192.png` + `icon-mask.png` 512×512（`purpose:"maskable"`，安全区 409×409 中央圆）+ `manifest.webmanifest`（仅 PWA）。`rel="shortcut icon"` 从来不是有效写法。彩蛋：staging 环境反色 favicon 按环境切换防混淆。

**浏览器支持**：SVG 图标全绿；icon font 无支持问题（本身是兼容方案）；`<link rel="icon" type="image/svg+xml">` 现代浏览器均支持。

**官方 URL**
- https://css-tricks.com/icon-fonts-vs-svg/
- https://www.sarasoueidan.com/blog/accessible-icon-buttons/
- https://evilmartians.com/chronicles/how-to-favicon-in-2024-six-files-that-fit-most-needs

**可复用片段**
```html
<!-- 可访问图标按钮（推荐方案 #2） -->
<button aria-labelledby="btn-menu">
  <svg aria-hidden="true" focusable="false" width="16" height="16"><use href="#i-menu"/></svg>
  <span id="btn-menu" hidden>菜单</span>
</button>
```
```css
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0); clip-path: inset(100%);
  width: 1px; height: 1px; overflow: hidden;
  position: absolute; white-space: nowrap;
}
```
```html
<!-- modern favicon 链（Evil Martians 推荐最小集） -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```
```html
<!-- icon.svg：暗色模式自动反色 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>@media (prefers-color-scheme: dark){.a{fill:#f0f0f0}}</style>
  <path class="a" fill="#0f0f0f" d="…"/>
</svg>
```

---

## 13. 数据可视化：小倍数、图表动效、图表无障碍

**定义**
- 小倍数(small multiples)：同标度同轴的一系列相似小图并置，便于对比；又称 trellis/lattice/grid/panel chart；由 Edward Tufte 推广（*Envisioning Information*, 1990, p.67——"定量推理的核心是一句话：和什么比？"）。
- 图表动效：入场/更新过渡（Chart.js 默认 `duration: 1000`, `easing: 'easeOutQuart'`，30 种缓动）。
- 图表无障碍：复杂图像需「两段式替代文本」——短 `alt` + 页面内长描述。

**关键参数/要点**
- 小倍数设计：各面板同标度便于横向对比（也可刻意不同标度强调相对变化——Wikipedia 示例）；地图场景研究结论：动画胜在呈现趋势/运动，小倍数胜在时间点间对比。
- Chart.js 三级配置：全局 `defaults` → 类型 `datasets[type]` → 实例 `options`；过渡模式 `active/hide/reset/resize/show`（hover 默认 400ms、resize 0）；禁用：`options.animation = false`；回调 `onProgress/onComplete` 仅在主 animation 配置生效。
- 图表 a11y（WAI）：`alt` 写明图表类型+内容概要（"Q1 各站点月度与总访问量柱状图"）；长描述给趋势结论（site 1 下降、site 3 上升）、比例尺、颜色顺序、相对高度；首选 `<figure role="group">` + `<figcaption>`（长描述对所有人可见，惠及低视力/学习障碍用户）；`aria-describedby` 仅适合纯文本（结构化表格会被读成连续段落）；正文里先用一句话概括图表。

**浏览器支持**：均为库/规范层面的成熟能力，无浏览器门槛。

**官方 URL**
- https://en.wikipedia.org/wiki/Small_multiple
- https://www.chartjs.org/docs/latest/configuration/animations.html
- https://www.w3.org/WAI/tutorials/images/complex/

**可复用片段**
```js
new Chart(ctx, {
  type: "line",
  data,
  options: {
    animation: { duration: 800, easing: "easeOutQuart",
                 onComplete: () => ariaLive("图表加载完成") },
    transitions: { resize: { animation: { duration: 0 } } },
    datasets: { line: { pointRadius: 0, tension: .3 } }   // 小倍数面板共用
  }
});
```
```html
<figure role="group">
  <img src="visitors.png"
       alt="2025 Q1 三个站点月度与总访问量柱状图，详见下方文字描述。">
  <figcaption>
    <table><caption>Example.com 各站点 2025 Q1 访问量</caption>…</table>
    <p>趋势：站点1 持续下降，站点2 持平，站点3 稳步上升。</p>
  </figcaption>
</figure>
```

---

## 14. 交互法则：审美可用性效应 / 目标梯度效应 / 帕累托法则

**审美可用性效应（Aesthetic-Usability Effect）**
- 定义：用户认为美观的设计更好用；美观度与「感知易用性」的相关性强于与「实际易用性」的相关性。
- 证据：1995 年 Kurosu & Kashimura（日立设计中心），26 种 ATM 界面变体 × 252 名参与者。
- UI 启示：美观引发积极情绪、提高对轻微问题的容忍度；**美观可能掩盖可用性问题**，可用性测试时要警惕此偏差。
- URL：https://lawsofux.com/aesthetic-usability-effect/

**目标梯度效应（Goal-Gradient Effect）**
- 定义：越接近目标，趋向目标的动力越强（"The tendency to approach a goal increases with proximity to the goal"）。
- 证据：Clark Hull 1932 提出假说，1934 大鼠奔食实验（越近越快）；人类侧 Kivetz/Urminsky/Zheng 关于购买加速与虚幻进度的研究。
- UI 应用：清晰进度指示（进度条/百分比）；**人为进度**（会员卡预盖章、Uber 类"起步进度"）；奖励体系收尾加速。
- URL：https://lawsofux.com/goal-gradient-effect/

**帕累托法则（Pareto Principle）**
- 定义：约 80% 的效果来自 20% 的原因（"roughly"，非精确值）；源自帕累托观察（意大利 80% 土地归 20% 人口）。
- UX 应用：识别带来最大收益的少数关键区域；"将大部分精力集中于能为最多用户带来最大收益的领域"；注意不能机械套用（如"只顾减少点击次数"是误用）。
- URL：https://lawsofux.com/pareto-principle/

---

## 15. 组件规格：级联选择 / 时间线 / 折叠面板 / 评分 / 步骤条 / 上传三态（AntD / Arco / APG）

> 以下 API 均抓取自 2026-11-22 的 ant.design 现行文档（含近期改名：`items` 配置化、`progressDot`→`type="dot"`、Timeline 的 `dot→icon`/`label→title` 等）；Arco 文档站点本次未抓取，仅列官方入口；键盘/ARIA 行为以 WAI-APG 为权威。

**级联选择 Cascader**：从关联数据集选择（省市区/分类树），浮层内完成级联。
- API：`options`、`changeOnSelect`(false)、`multiple`、`showSearch`、`loadData`（懒加载，**不能与 showSearch 同用**，叶节点须 `isLeaf:true`）、`expandTrigger`(click|hover)、`fieldNames({label,value,children})`、`displayRender`、`showCheckedStrategy(SHOW_PARENT|SHOW_CHILD)`、`variant`。
- Option：`{ value, label, disabled, children, isLeaf }`。
- URL：https://ant.design/components/cascader ｜ Arco：https://arco.design/react/components/cascader（未核验）

**时间线 Timeline**：按时间排序或建立视觉连接。
- items：`{ color(blue 默认, 支持预设/自定义), title, content, icon, loading, placement(start|end) }`；容器 `mode: start|alternate|end`、`orientation: vertical|horizontal`、`reverse`。
- URL：https://ant.design/components/timeline ｜ Arco：https://arco.design/react/components/timeline（未核验）

**折叠面板 Collapse**：分组/隐藏复杂区域保持页面整洁；手风琴是同一时刻只开一个的特例。
- API：`accordion`、`activeKey/defaultActiveKey`、`collapsible(header|icon|disabled)`、`expandIconPlacement(start|end)`、`ghost`、`destroyOnHidden`；item：`{ key, label, children, extra, collapsible, forceRender, showArrow }`。
- APG 无障碍骨架：`heading[aria-level] > button[aria-expanded][aria-controls]` + 面板（可选 `role="region"[aria-labelledby]`；可同开面板 >6 个时避免 region 地标泛滥）；Enter/Space 切换。
- URL：https://ant.design/components/collapse ｜ APG：https://www.w3.org/WAI/ARIA/apg/patterns/accordion/

**评分 Rate**：对某物评分。
- API：`count`(5)、`allowHalf`、`allowClear`(true)、`tooltips[]`、`character`（可换字/图标/汉字）、`disabled`、`value/defaultValue`、`onChange`、`onHoverChange`。
- 无障碍：APG 无独立 rating 模式，官方提供 **Rating Radio Group Example**——五角星用 `role="radiogroup"` + `role="radio"[aria-checked]` 实现方向键漫游(roving tabindex)、Space 选中。
- URL：https://ant.design/components/rate ｜ APG：https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/

**步骤条 Steps**：任务复杂或有明确子任务顺序时的导航。
- item status：`wait | process | finish | error`（未配置时由 `current` 自动推算）。
- API：`current`、`orientation(horizontal|vertical)`、`type(default|dot|inline|navigation|panel)`、`percent`（process 步骤进度环）、`responsive`（<532px 自动转垂直）、`maxCount`（≥3，溢出折叠省略）、`onChange`（设置后可点击）、item `disabled`。
- URL：https://ant.design/components/steps

**上传三态 Upload**：选择/拖拽上传，展示进度。
- `status` 四值：`uploading`（进度条）/ `done`（完成，可带预览下载）/ `error`（错误样式）/ `removed`；被 `beforeUpload` 拦截的文件无 status。
- API：`action`、`beforeUpload`（返回 false 阻止上传，返回 `Upload.LIST_IGNORE` 不进列表）、`customRequest`、`fileList/defaultFileList`、`maxCount`（=1 时替换当前文件）、`onChange({ file, fileList, event })`、`listType(text|picture|picture-card|picture-circle)`、`showUploadList`、`Upload.Dragger`。
- URL：https://ant.design/components/upload ｜ Arco：https://arco.design/react/components/upload（未核验）

**可复用片段**
```jsx
// 上传三态渲染骨架
<Upload action="/api/upload" maxCount={3}
  onChange={({ file, fileList }) => {
    if (file.status === 'uploading') setPct(Math.round(file.percent ?? 0));
    if (file.status === 'done')  message.success(`${file.name} 上传成功`);
    if (file.status === 'error') message.error(`${file.name} 上传失败`);
  }}
  beforeUpload={f => (f.size / 1024 / 1024 < 10 ? true : Upload.LIST_IGNORE)}>
  <button>上传</button>
</Upload>
```
```html
<!-- APG 手风琴最小骨架 -->
<h3><button aria-expanded="true" aria-controls="p1">标题</button></h3>
<div id="p1" role="region" aria-labelledby="…">内容</div>
```

---

## 16. 十个签名巧思

1. **LCP 图 `fetchpriority="high"` + 显式 width/height**，轮播其余图 `fetchpriority="low"`——首屏快、无布局跳。
2. **全站数字列 `font-variant-numeric: tabular-nums`**——仪表盘"呼吸不抖动"，一张表可信度立刻上升。
3. **阴影从不纯黑**：`--shadow-color` 取背景色相降饱和，全站一处换肤、处处和谐。
4. **三层同透明度 box-shadow（1/2/4/8/16px 倍增）+ 贴地椭圆伪元素**——分层环境光 + 接触阴影，一张平面卡片立刻"坐"在地上。
5. **高光走 `::before` 顶部 6px 渐变天光**，与阴影共用同一光源比例（水平:竖直 1:2），整套 UI 像被同一盏灯照亮。
6. **逻辑属性全站化**（padding-inline / margin-block / border-start-start-radius）——多语言 RTL 只改一个 `dir` 属性。
7. **磁吸按钮 `gsap.quickTo` 实现，`prefers-reduced-motion` 与 `(hover: none)` 下自动退回普通 hover**——炫技不伤人。
8. **可变字体 `GRAD` 轴做 hover 强调**——不加粗、不折行、零重排的"呼吸感"。
9. **步骤条/会员卡预盖一枚"已完成"章**（人为进度）——目标梯度效应让用户冲刺。
10. **`dialog::backdrop` 用 `color-mix(in oklab, black 55%, transparent)` 再掺一点品牌色**——连压暗层都带着品牌色相。

---

## 附：本次未能核验事项（如实记录）

- Material Design 2/3 官方 scrim 定义页（m2.material.io / m3.material.io）正文 JS 渲染抓取为空，scrim 具体不透明度规范值**未证实**，本文以 MDN `::backdrop` 与 `color-mix` 通用做法替代落地。
- Josh Comeau《An Introduction to the FLIP Technique》抓取 404，FLIP 定义改以 Paul Lewis 原文（aerotwist）为准。
- Google Fonts Knowledge「Choosing type」页面 JS 渲染无法读取正文，字体搭配方法论的具体官方文章**未证实**（仅确认栏目入口存在）。
- Codrops 磁吸按钮教程的 URL 未能核验（搜索结果污染），磁吸实现以 GSAP 官方 `quickTo` 文档 + 标准 lerp 数学为准。
- Arco Design 组件文档仅列出官方入口 URL，未抓取内容；组件交互细节以 AntD + WAI-APG 为准。
- MDN「相对颜色语法」独立指南页 404，相关内容取自 rgb() 参考页（CSS Color Level 5 规范仍在演进，Safari 16.4 语法差异需 `@supports` 分支）。
- GSAP 转 Webflow 后全插件免费的许可结论来自背景知识，官方文档页未载明，需以 gsap.com/pricing 为准。
