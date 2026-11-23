# 05 · 可直接移植的开源组件与动画代码(React / CSS)

> 调研日期:2026-11-21。方法:逐库抓官方注册表 JSON / GitHub raw 源码 / 官方文档站页面,所有代码要点均来自**当天实抓的源文件**,未采信二手转述。抓取记录存于 `.tmp-fetch/`(border-beam.tsx、marquee.tsx、animated-gradient-text.tsx、dot-pattern.tsx、number-ticker.tsx、text-reveal.tsx、spotlight.json、card-hover-effect.json、text-generate-effect.json 等)。
>
> 本报告与 `out/research/04`(动效)、`03/06`(视觉/颗粒)、`08`(开源仓库)、`09`(实现技术)互补:04/09/03/06 已记载的**纯 CSS 手段**在本报告第 4 章直接引用落地,不重复调研。

---

## 0. 许可速览(2026-11-21 实核)

| 库 | 仓库 | Stars(当日) | 许可 | 商用要点 |
|---|---|---|---|---|
| react-bits | github.com/DavidHDev/react-bits | **52,388** | **MIT + Commons Clause**(LICENSE.md 实抓) | ✅ 复制进自家产品/网站随便用;❌ 不得单独出售/再分发组件本身或打包成组件库;react-bits 工具(Background Studio 等)与音效库同受限制 |
| Magic UI | github.com/magicuidesign/magicui | **23,397** | **MIT**(GitHub API `license.spdx_id: "mit"`) | ✅ 标准 MIT,含商用、修改、再分发(保留版权声明) |
| Aceternity UI | **无官方开源仓库**(详见 §3.0) | — | 免费组件:"Free for any React or Next.js project"(首页实抓);Pro 受 Aceternity License(licence 页实抓:禁止再分发/做主题模板出售) | ✅ 复制免费组件进产品;❌ 再分发源码包、做竞品组件库 |

**React 19 + motion 版本实证**(当天实抓两库 package.json):
- react-bits:`"react": "^19.0.0"`、`"motion": "^12.23.12"`
- Magic UI `apps/www`:`"react": "19.3.1"`、`"motion": "^12.23.12"`
→ 两库当前源码均官方跑在 React 19 + `motion/react`(v12),与本项目技术栈同构,移植无版本断层。

**安装通道**(均当日实抓验证):
- react-bits:`npx jsrepo add https://reactbits.dev/r/<组件名>-JS-CSS`(注册表 JSON 已验证,如 `reactbits.dev/r/ClickSpark-JS-CSS.json`)
- Magic UI:`npx shadcn@latest add "https://magicui.design/r/border-beam.json"`(registry JSON 实抓成功)
- Aceternity:`npx shadcn@latest add @aceternity/spotlight`(官方文档页给出的命令;registry JSON `ui.aceternity.com/registry/spotlight.json` 实抓成功)

---

## 1. react-bits(6 片段)

> 源码路径:`src/content/<分类>/<组件>/<组件>.jsx`(JS-CSS 变体,当天 raw.githubusercontent.com 实抓)。
> ⚠️ 请求中的 **Glow 组件不存在**:`https://reactbits.dev/r/Glow-JS-CSS.json` 返回 404(实抓),当前库内无此组件;发光悬停类用 **GlareHover** 替代(§1.6)。

### 1.1 SpotlightCard — 指针聚光卡片

- **效果**:卡片内跟随指针的径向聚光 + 边缘 rim 光 + 聚光处颗粒遮罩;支持 proximity(指针未进入卡片也预亮)、beam(顶部光束)形状、按下 flare 放大、键盘 focus 跟随;多主题。
- **依赖**:零 npm 依赖(仅 React hooks)+ 同目录 `SpotlightCard.css`。
- **代码要点**(源码:`src/content/Components/SpotlightCard/SpotlightCard.jsx`):
  - 深色主题 token(源码内置):`surface: '#111111'`、`border: 'rgba(255,255,255,0.08)'`、`shadow: '0 24px 48px -24px rgba(0,0,0,0.6)'`、`light: '#ffffff'`(即默认聚光色)。
  - 聚光斑 = JS 拼 `radial-gradient(circle {size}px at {x}px {y}px, <33 档 color-mix 停靠> transparent 100%)`;软边公式 `falloff = (1-soft)^1.5 × 0.85`(core 随 softness 连续形变);rim 层为 size×0.6 的同色窄斑贴边。
  - 颗粒:160×160 内联 data-URI SVG,`feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'` + `feColorMatrix saturate 0`,以**聚光渐变作 mask-image**,opacity = presence × grain(参数,0–1)。
  - rAF 指数平滑:`follow = 1 − exp(−dt / (0.015 + smoothing×0.22))`;出现淡入 τ≈0.1s、消失 τ≈0.32s;`settled` 判定(位移 <0.1px 且 presence 到位)后**停掉 rAF**,IntersectionObserver 控制可见性,滚动用 `passive` listener 唤醒。
  - `prefers-reduced-motion: reduce` → `follow = 1`(聚光即指即现,无拖尾)、禁用 ambient 常亮——**组件内建降级**。
- **源 URL**:https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Components/SpotlightCard/SpotlightCard.jsx ;文档站 https://reactbits.dev/
- **许可**:MIT + Commons Clause(见 §0)。
- **移植要点**:
  - Astro:`<SpotlightCard client:visible>`;`'use client'` 指令在 Astro 中无效但无害,保留。
  - 它监听 `window.pointermove`(非仅卡片),多实例下是 O(实例数) 每次指针移动,卡片页≤10 个无碍;再往上应做节流或改用共享指针上下文。
  - reduced-motion 已内建,无需外包;若自家站点全局有"动效总开关" class,可再叠 `matchMedia` 传入 `disabled`。
  - 性能红线:样式全走 `style.background` / `style.opacity` 更新(非 layout 属性),不触发 reflow;`getBoundingClientRect` 在每帧调用一次——卡片数量多时改缓存 rect 并在 scroll/resize 失效,这是移植时可做的优化。

### 1.2 Magnet — 磁吸元素

- **效果**:子元素在指针靠近 padding 范围内被"吸向"指针,离开弹性回位;支持单轴、倾斜(perspective 3D)、缩放、最大位移限幅;多实例互斥仲裁。
- **依赖**:零 npm 依赖。
- **代码要点**(源码:`src/content/Animations/Magnet/Magnet.jsx`):
  - 默认弹簧:`{ stiffness: 170, damping: 16, mass: 1 }`(临界略欠阻尼,回弹一次)。
  - 吸力距离场:`pull = 1 − smoothstep(padding×0.5, padding, outside)`,即 padding 前半程全吸、后半程平滑衰减到 0;位移 = `指针到中心向量 / magnetStrength × pull`(默认 strength 2 → 吸一半距离);`maxOffset` 限幅。
  - tilt:`rotateX/rotateY` 最大 `tilt` 度,带 `perspective(800px)`;scale 随 pull 插值。
  - 物理积分:每帧拆 `ceil(dt / (1/120))` 子步(高刷屏稳定),休眠阈值 ε=0.05(scale 用 0.001),**静止即停 rAF**。
  - 多实例:全局 `registry` Set + `arbitrate()` 仲裁,`exclusive` 默认 true——一屏多个磁吸元素只有一个"得主",避免互相拉扯;胜者挂 `data-magnet-active` 属性供 CSS 挂钩。
  - 触屏跳过(`pointerType === 'touch'` 直接 return);`prefers-reduced-motion` → `reduce` 时 `measure()` 恒返回零位移——**不吸不动,内建降级**。
- **源 URL**:https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Animations/Magnet/Magnet.jsx
- **许可**:MIT + Commons Clause。
- **移植要点**:
  - 输出只有一条 `transform: translate3d(...) rotateX(...) rotateY(...) scale(...)`——纯合成器路径,无 layout/repaint;这是"不逐帧 JS 改 layout"的范本。
  - Astro 岛屿 `client:load`(导航按钮吸距小、需常驻);移动端自动失效(触屏分支),无需自己写 UA 判断。
  - 全局 pointermove + passive:true,多 Magnet 共享一份监听(单例 `attach()`),移植时保留该单例结构。

### 1.3 ClickSpark — 点击火花

- **效果**:每次点击在光标处爆发一圈火花(线/彗尾/圆点/星形四种),可选重力下落、扩散圆环、辉光;支持程序化触发。
- **依赖**:零 npm 依赖(纯 Canvas 2D)。
- **代码要点**(源码实抓自注册表 `https://reactbits.dev/r/ClickSpark-JS-CSS.json`):
  - 默认参数:`sparkColor '#fff'`、`sparkSize 14`、`sparkRadius 30`、`sparkCount 8`、`sparkWidth 2`、`duration 500`、`easing 'ease-out'`(实现 `1−(1−t)³`)、`randomness 0.2`、`gravity 0`、`spread 360`、`MAX_BURSTS 32`。
  - **每次点击生成一个独立 canvas**(DPR 缩放、按火花 reach 计算包围盒定位),动画结束 `burst.canvas.remove()`——无常驻画布层;超 32 个 burst 先删最旧(LRU)。
  - 星形路径自带 0.16×radius 内凹;彗尾用首尾线性渐变三角形 + 头部圆点;辉光 = alpha 0.14 的 4.5× 粗描边。
  - 无障碍:鼠标在 `pointerdown` 触发;**键盘/程序点击(`event.detail === 0`)在元素中心生成火花**;`useImperativeHandle` 暴露 `spark(x, y)`。
  - reduced-motion:`life` 固定 320ms、`distance` 恒 0、fade=1−p——**火花原地淡出成"一闪",内建降级**。
- **源 URL**:https://reactbits.dev/r/ClickSpark-JS-CSS.json ;源码同仓库 `src/content/Components/ClickSpark/`
- **许可**:MIT + Commons Clause。
- **移植要点**:
  - Astro:`<ClickSpark client:load>` 包在需要火花的最小容器上(全页包裹会截获所有 pointerdown,浅包按钮区更克制)。
  - 火花期间才有 rAF,静止零开销;但 `ctx.clearRect` 每帧全画布——包围盒已经算小了,勿自行放大。
  - 性能红线:不要在 CSS 里给 spark canvas 加 box-shadow/filter;深色底火花用 `#fff` 或品牌强调色(如 `#7DD3FC`),避免低对比灰。

### 1.4 BlurText — 模糊入场标题(词级 stagger)

- **效果**:按词(或字符)从模糊+位移入场,可选 zoom / tilt 变体、stagger 方向(start/end/center/random)、hover 焦点虚化其余词、loop 循环进出。
- **依赖**:`motion/react`(motion v12,见 §0 实证)。
- **代码要点**(源码:`src/content/TextAnimations/BlurText/BlurText.jsx`):
  - 缓动:`EASE_OUT = cubic-bezier(0.33, 1, 0.68, 1)`;位移轴走 spring(`visualDuration` + `bounce 0.25`),透明度/模糊走 tween。
  - 默认:`delay 200`(每级 stagger)、`blur 10px`、`distance 50px`、`stepDuration 0.35s`、`trigger 'view'`(IntersectionObserver,threshold 0.1)、`animateBy 'words'`、`direction 'top'`。
  - 片元样式 `display:inline-block; will-change: transform, filter, opacity`;词容器 `inline-flex` 保词内不断行。
  - **可访问性双文本**:sr-only 剪裁全文垫底(读屏一次读完,不读中间态),动效词才是视觉层。
  - `focusOnHover`:悬停词组高亮,其余词 `blur(2–6px)` + `opacity 0.3`(0.45s cubic-bezier(0.22,1,0.36,1))。
  - ⚠️ **组件内未写 prefers-reduced-motion 分支**(与同库 SpotlightCard/Magnet/ClickSpark/CountUp 不同,当天源码逐行核验)——移植时必须外包降级。
- **源 URL**:https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/TextAnimations/BlurText/BlurText.jsx
- **许可**:MIT + Commons Clause。
- **移植要点**:
  - reduced-motion 外包写法(组件外):`const reduce = useReducedMotionCmp();` 或直接 `animateBy` 不变、`trigger` 恒 'load' 且把 `delay/stepDuration` 置 0;CSS 兜底:`@media (prefers-reduced-motion: reduce) { .blur-text span { filter:none !important; opacity:1 !important; transform:none !important; } }`。
  - Astro:因自带 in-view 触发,**用 `client:load` 而非 `client:visible`**,否则双重延迟(先等 hydration 再等 observer)。
  - 性能红线:blur 滤镜动画对 GPU 昂贵,标题级(≤10 词)安全;段落级大文本请改 Magic UI TextReveal(§2.5,纯 opacity)。

### 1.5 CountUp — 数字滚动(count / 里程表双模式)

- **效果**:数字从 from 到 to 动画;`count` 模式整值 textContent 逐帧刷新;`roll` 模式做成里程表——每位数字一条 0–9 垂直条带 translateY 滚动,速度越快纵向运动模糊越强(SVG feGaussianBlur),进/退位列淡入淡出。
- **依赖**:`motion/react`。
- **代码要点**(源码:`src/content/TextAnimations/CountUp/CountUp.jsx`):
  - 缓动:`easeOut = cubicBezier(0.33,1,0.68,1)`、`expo = 1−2^(−10t)` 归一、`spring` 由阻尼比解析式生成(overshoot 0.06)。
  - 里程表:`CELL = 1.2em`(每槽固定高),`STAGGER = 0.07s`/列;列宽进退用显式 `width + opacity` 动画并在 settled 后清空内联回自然布局——**防 layout shift 的手法**;分隔符/前缀/后缀同步淡入。
  - 触发:`useInView(ref, { once: true })`;sr-only 终值垫底。
  - reduced-motion:`matchMedia('(prefers-reduced-motion: reduce)').matches` → 直接 `finish()` **跳终值**,零中间帧——**内建降级**(源码显式分支)。
  - SSR:初始渲染 `formatValue(startValue)`,hydration 一致。
- **源 URL**:https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/TextAnimations/CountUp/CountUp.jsx
- **许可**:MIT + Commons Clause。
- **移植要点**:
  - Astro `client:visible`(自含 once in-view);SSR 首帧即输出起始数字,**容器需固定行高/字距**(组件已用 1.2em 槽 + 等宽数字位处理),勿外层再套 auto 高度动画。
  - `count` 模式每帧改 `textContent`,主线程开销小但对长列表多实例会叠加;仪表盘≤6 个实例为宜。
  - 若想零 JS,见 §4.2 纯 CSS `@property` 方案(整数场景可直接替换)。

### 1.6 GlareHover — 高光扫过(Glow 的现实替代)

- **效果**:一条有形状(微凸 profile)的光带沿 −45° 扫过任意元素,方向感知(从指针进入侧扫入、离开侧扫出);1px 边框同步"眨光"(rim glint);可选 follow(贴指针)/click/loop 模式。
- **依赖**:零 npm 依赖 + `GlareHover.css`。
- **代码要点**(源码实抓自 `https://reactbits.dev/r/GlareHover-JS-CSS.json`):
  - 光带 = 33 档 `color-mix(in srgb, {color} N%, transparent)` 的 linear-gradient,profile 三选:`streak`(窄亮带+底光)、`twin`(主带+副带)、`sheen`(宽柔光);默认 `glareColor '#ffffff'`、`glareOpacity 0.5`、`blendMode 'screen'`、`transitionDuration 650`、`interval 3`(loop)。
  - CSS token:`--gh-width/-height/-bg/-border/-br/-glare/-blend`;层结构 `__glare`(mix-blend screen)→ `__band`(唯一动的东西:translate(-50%,-50%) rotate(angle−90deg) translateX(pos))。
  - rim glint:同一渐变再画一层到 `padding:1px + mask-composite: exclude` 的 1px 边框环上,亮度 ×1.8——扫光经过时边框亮一下。
  - rAF:位置与 presence 双 ε 判定(0.05px / 0.002)静止即停;ResizeObserver 重算带宽(对角线×glareSize%);IntersectionObserver + `document.hidden` 双门控 loop 模式。
  - reduced-motion:`sweep()` 首行 `if (reduced || ...) return`——**不扫光,内建降级**。
- **源 URL**:https://reactbits.dev/r/GlareHover-JS-CSS.json
- **许可**:MIT + Commons Clause。
- **移植要点**:同 SpotlightCard(深色底白光带最出效果);按钮组多实例时只有 hover 的一两个在跑 rAF,无并发压力。

---

## 2. Magic UI(6 片段,全 MIT)

> 源码路径当天实抓:`apps/www/registry/magicui/<组件>.tsx`(GitHub raw),keyframes 取自官方文档页 `content/docs/components/*.mdx`。

### 2.1 Border Beam — 沿边框跑光(CSS Motion Path)

- **效果**:一道 size×size 的渐变光块沿容器 1px 圆角边框匀速环绕。
- **依赖**:`motion/react`(仅用它 tween `offsetDistance`;无 Tailwind 也可手写 CSS)。
- **代码要点**(源码:`border-beam.tsx`,行号当天实读):
  - 轨道环(外层 div,`border-beam.tsx:69`):`absolute inset-0 rounded-[inherit] border-transparent`,宽度用 CSS 变量 `--border-beam-width`(默认 `borderWidth 1`),`mask = 两层 linear-gradient(#000,#000)` + `[mask-clip:padding-box,border-box]` + intersect——**双层遮罩相减只剩 1px 环**,这是 shadcn/magicui 画环形轨道的标准技法。
  - 光块(内层,`border-beam.tsx:76-104`):`aspect-square`、宽 `size 50`、`bg-linear-to-l from(--color-from) via(--color-to) to-transparent`;**`offsetPath: rect(0 auto auto 0 round 50px)`** + 动画 `offsetDistance: '0%' → '100%'`,`repeat: Infinity, ease: 'linear', duration 6`,**`delay: -delay`(负延迟)**——首帧即已在途,多光束靠负 delay 错相位。
  - 默认色:`colorFrom '#ffaa40'`、`colorTo '#9c40ff'`(可换品牌色)。
- **源 URL**:https://magicui.design/r/border-beam.json ;文档 https://magicui.design/docs/components/border-beam
- **许可**:MIT。
- **移植要点**:
  - React 19 + Astro:`<BorderBeam client:load />` 塞进卡片相对定位容器;`rounded-[inherit]` 要求父卡有 border-radius。
  - **纯 CSS 等价版**(去 motion,零 JS,推荐 Astro 静态页直接用):
    ```css
    .beam-track { position:absolute; inset:0; border-radius:inherit;
      border:1px solid transparent;
      mask:linear-gradient(#000,#000) padding-box exclude, linear-gradient(#000,#000);
      /* 或双向 mask + mask-composite:intersect */
      pointer-events:none; }
    .beam-track::before { content:""; position:absolute; width:50px; aspect-ratio:1;
      background:linear-gradient(to left, #7DD3FC, transparent);
      offset-path: rect(0 auto auto 0 round 50px);
      animation: beam 6s linear infinite; }
    @keyframes beam { from { offset-distance:0%; } to { offset-distance:100%; } }
    ```
  - reduced-motion:`@media (prefers-reduced-motion: reduce) { .beam-track::before { animation: none; opacity: 0; } }`(光束是装饰,直接关)。
  - 性能红线:offset-path 动画在合成器上,不要把 duration 调低于 3s 造成高频;同一屏多卡片同时跑注意视觉噪声,用不同负 delay 或只在"主卡片"启用。

### 2.2 Marquee — 无缝跑马灯

- **效果**:内容横向(或纵向)匀速滚动循环,hover 暂停,可反向。
- **依赖**:**零 JS 依赖**(组件本体只是重复子元素的布局组件,动画全在 CSS)。
- **代码要点**(源码:`marquee.tsx` + 文档 keyframes):
  - 结构:外层 `flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]`,内层 `repeat 4` 组,每组 `flex shrink-0 animate-marquee`;`pauseOnHover` → `group-hover:[animation-play-state:paused]`;`reverse` → `[animation-direction:reverse]`;纵向 `flex-col + animate-marquee-vertical`。
  - keyframes(官方文档 `docs/components/marquee.mdx`):
    ```css
    @keyframes marquee { from { transform: translateX(0); }
      to { transform: translateX(calc(-100% - var(--gap))); } }
    /* 纵向: translateY(calc(-100% - var(--gap))) */
    ```
    平移量 = **一组内容 + 一个间隙**,这正是接缝无跳动的公式。
- **源 URL**:https://magicui.design/r/marquee.json ;https://magicui.design/docs/components/marquee
- **许可**:MIT。
- **移植要点**:
  - **无需岛屿**:可在 `.astro` 里直接抄结构 + CSS,零 hydration;React 版仅在需要动态重复子组件时才 `client:load`。
  - repeat 次数必须 ≥ 容器能并排容纳的组数(内容窄时 4 组默认值够;超宽 logo 墙验证滚动到一半时最右仍有内容,否则露底)。
  - reduced-motion:`@media (prefers-reduced-motion: reduce) { .marquee-row { animation-play-state: paused; } }`(停住但内容仍可见)。
  - 性能红线:纯 transform 无 layout;但内容里放会 `box-shadow` 闪烁的卡片时,先 `will-change: transform` 在滚动组上,勿加在每个子项。

### 2.3 Animated Gradient Text — 流动渐变字

- **效果**:文字渐变色沿水平方向匀速流动。
- **依赖**:零 JS(纯 CSS)。
- **代码要点**(源码:`animated-gradient-text.tsx` + 文档 keyframes):
  - `--bg-size = speed × 300%`(默认 300%),keyframes:
    ```css
    @keyframes gradient { to { background-position: var(--bg-size, 300%) 0; } }
    /* 组件: animate-gradient → gradient 8s linear infinite */
    ```
  - 文字上 `background-clip: text; color: transparent` + `linear-gradient(to right, from, via, to)`,**首尾同色**(from→via→from)才能无缝循环;默认 `#ffaa40 → #9c40ff → #ffaa40`。
- **源 URL**:https://magicui.design/r/animated-gradient-text.json ;https://magicui.design/docs/components/animated-gradient-text
- **许可**:MIT。
- **移植要点**:直接在 `.astro` 用;深色站建议 via 用品牌强调色、from/to 用其 60% 亮度版,避免流动到边缘时对比度不足。reduced-motion:`animation: none;`(静止渐变仍好看)。background-position 动画不是合成器属性——小面积(一行标题)无害,**不要用在整段正文**。

### 2.4 Dot Pattern — 圆点网格底纹(可选呼吸辉光)

- **效果**:SVG `<pattern>` 平铺 r=1 圆点;`glow` 开启时每个点随机相位呼吸(opacity 0.4↔1、scale 1↔1.5)。
- **依赖**:`motion/react`(无 glow 时可纯 SVG)。
- **代码要点**(源码:`dot-pattern.tsx`):
  - 默认:`width/height 16`(网格间距)、`cx/cy 1`(点内偏移)、`cr 1`(半径),`fill: currentColor`——**点色继承父容器文字色**,主题切换免费。
  - glow 随机相位:`useState(() => ({ delay: Math.random()*5, duration: Math.random()*3 + 2 }))`(**惰性初始化**),`repeatType: 'reverse', ease: 'easeInOut'`;渐变 id 用 `useId()` 防多实例冲突。
- **源 URL**:https://magicui.design/r/dot-pattern.json ;https://magicui.design/docs/components/dot-pattern
- **许可**:MIT。
- **移植要点**:
  - 静态版(无 glow)**做成 `.astro` 内联 SVG,零 JS**;这是深色站 hero 底纹的最低成本方案。
  - glow 版 hydration:随机值在客户端惰性求值,SSR 与首帧不匹配的点在 React 19 下由 motion initial 注入校正;保险写法是把 timing 放 `useEffect` 再 setState。**多个岛屿时保留 useId**。
  - reduced-motion:关 glow(或 `animation: none`);静态点阵本来就是"不动的纹理"。
  - 性能红线:点阵尺寸大时不要逐 `<circle>` 动画(几百个 motion 元素),只用静态或取局部区块加 glow。

### 2.5 Text Reveal — 滚动逐词点亮

- **效果**:一段文字随滚动进度逐词从 20% 灰影点亮到全亮(sticky 长滚动段)。
- **依赖**:`motion/react`(`useScroll` + `useTransform`)。
- **代码要点**(源码:`text-reveal.tsx`):
  - 结构:容器 `h-[200vh]` + 内层 `sticky top-0 h-[50%]`——滚动距离即动画时长。
  - 点亮:每词 range `[i/n, (i+1)/n]` 把 `scrollYProgress` 映射到 `opacity 0→1`;**垫底是 30% 不透明度的"幽灵词"**(`absolute opacity-30`),上层 motion.span 亮字叠上去;深色基色 `text-white/20`,亮字 `text-white`。
  - 纯 opacity 动画,无 blur。
- **源 URL**:https://magicui.design/r/text-reveal.json ;https://magicui.design/docs/components/text-reveal
- **许可**:MIT。
- **移植要点**:
  - 需 JS 岛屿;但同款效果可用 §4.1 的 scroll-driven CSS 做零 JS 版:每个词 span `animation: lightup linear both; animation-timeline: view();` 配各自 `animation-range`——Astro 静态页推荐后者。
  - `h-[200vh]` 会占据滚动空间,首页慎用,长文页("关于/理念")适用;移动端 200vh 太长可减到 150vh。
  - reduced-motion:`@media (prefers-reduced-motion: reduce) { .reveal-word { opacity: 1 !important; } }` 直接全亮。

### 2.6 Number Ticker — 弹簧数字递增(轻量版 CountUp)

- **效果**:进入视口后数字以弹簧曲线滚到目标值。
- **依赖**:`motion/react`。
- **代码要点**(源码:`number-ticker.tsx`):
  - `useSpring(useMotionValue(startValue), { damping: 60, stiffness: 100 })`(过阻尼,无回弹,数字不抖);`useInView(ref, { once: true, margin: '0px' })` + `setTimeout(delay)`。
  - 更新:`springValue.on('change')` 里写 `textContent`,`Intl.NumberFormat('en-US')` 格式化,`toFixed(decimalPlaces)`。
  - 类名自带 **`tabular-nums`**(等宽数字,滚动不跳动);SSR 首帧渲染 `startValue`,hydration 一致。
  - ⚠️ 当天源码**无 reduced-motion 分支**——移植需外包。
- **源 URL**:https://magicui.design/r/number-ticker.json
- **许可**:MIT。
- **移植要点**:比 react-bits CountUp 轻 90%(无里程表),统计带大数字用它;reduced-motion 外包:`if (reduce) { ref.current.textContent = format(value); return; }`。

---

## 3. Aceternity UI(3 片段)

### 3.0 仓库/许可现状核验(回应调研 08 的记录)

当天(2026-11-21)逐项核实:

1. **官方开源组件仓库仍不存在**——`gh api orgs/aceternity/repos` 实抓返回仅 3 个仓库:`nextjs-boilerplate`(★32)、`saasternity`(★108,SaaS 样板,使用而非收录 Aceternity UI)、`vibrant-plugin`(★0);GitHub 搜索 "aceternity" 前列亦无官方组件库源(如 spectrum-ui 等均为社区衍生)。**调研 08:71 "未找到官方开源仓库" 的结论今日仍成立**。
2. **新增官方分发渠道:shadcn registry**——组件文档页(spotlight 页当天实抓)给出安装命令 `npx shadcn@latest add @aceternity/spotlight`;registry JSON `https://ui.aceternity.com/registry/spotlight.json` 实抓成功(含完整 tsx 源码)。**组件源码可不经仓库直接从官方 registry 获取**,这是与 08 调研时点的最大差异。
3. **免费组件许可**——首页当天实抓:"Free / **Free for any React or Next.js project**";Pro 模板另受 Aceternity License(`ui.aceternity.com/licence` 实抓:可改可商用不可再分发/做模板出售)。
4. 结论:免费组件源码可复制进本项目商用,但**没有可 fork/再分发的 OSI 许可**,再分发其源码包无授权依据;依赖升级需盯 registry JSON(无 git diff 可看)。

### 3.1 Spotlight — Hero 光束入场

- **效果**:一道宽扁光束从页面斜上方"展开"扫入 hero 文案区后常亮(入场一次,非跟随光标)。
- **依赖**:零 JS(纯 SVG + CSS animation)。
- **代码要点**(registry JSON `spotlight.json` 实抓 + 文档页 keyframes):
  - SVG `viewBox="0 0 3787 2842"`,单个椭圆 `rx=1924.71 ry=273.501`(**约 7:1 的宽扁比**),`matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)` ≈ 旋转 −35°;`feGaussianBlur stdDeviation=151`(大模糊即"光束"质感);`fillOpacity 0.21`。
  - keyframes(文档页原文):
    ```css
    @theme inline { --animate-spotlight: spotlight 2s ease 0.75s 1 forwards; }
    @keyframes spotlight {
      0%   { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
      100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
    }
    ```
    即 2s、0.75s 延迟、播一次、fill forwards 定格。
  - 尺寸类:`h-[169%] w-[138%] lg:w-[84%] opacity-0`(JS 无关,挂载即播)。
- **源 URL**:https://ui.aceternity.com/registry/spotlight.json ;https://ui.aceternity.com/components/spotlight
- **许可**:免费组件("Free for any React or Next.js project",见 §3.0)。
- **移植要点**:
  - 纯 SVG+CSS,**可直接抄进 `.astro`,零岛屿**;fill 色换成品牌强调色(白光在纯黑底上 `fillOpacity` 建议降到 0.10–0.15 再配 grain,见 §4.3)。
  - reduced-motion:`@media (prefers-reduced-motion: reduce) { .animate-spotlight { animation: none; opacity: 0.8; } }`(跳过入场动画,常亮或半亮)。
  - 性能红线:151px 高斯模糊的 SVG 在低端机首帧昂贵——模糊的是静态元素,只渲染一次,可接受;但别给它加循环动画。

### 3.2 Card Hover Effect — 共享背景流动的卡片网格

- **效果**:鼠标划过卡片网格时,一块圆角高亮背景在卡片间"流动"过去(共享元素动画),同时卡片边框亮起。
- **依赖**:`motion/react`(`layoutId` 共享布局动画)。
- **代码要点**(registry JSON `card-hover-effect.json` 实抓):
  - 全网格共享一个 `motion.span` 背景:`layoutId="hoverBackground"`,`dark:bg-slate-800/[0.8] rounded-3xl`;hover 到哪张卡片,这个 span 就挂到哪张(`hoveredIndex` state),motion 自动在两卡之间**形变位移**过渡。
  - 节奏:`enter { duration: 0.15 }`,`exit { duration: 0.15, delay: 0.2 }`——**离开延迟 200ms** 是关键参数:快速划过整排卡片时高亮不闪烁。
  - 卡片本体:`rounded-2xl bg-black border-transparent dark:border-white/[0.2]`,`group-hover:border-slate-700`;网格 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`。
- **源 URL**:https://ui.aceternity.com/registry/card-hover-effect.json
- **许可**:免费组件(同 §3.0)。
- **移植要点**:
  - layoutId 动画只有 react-bits/motion 可做,CSS 无等价;hover 检测用 onMouseEnter——**触屏无效但不报错**(点按即高亮后不消失,建议加 `onMouseLeave` 同逻辑的 `onTouchEnd`)。
  - reduced-motion(组件无内建):外包 `const reduce = ...;` reduce 时把 enter/exit 的 duration 置 0(只保留背景出现),或全部退化为 `opacity` 直切。
  - 性能红线:layoutId 形变走 FLIP(transform),无 layout 抖动;卡片 ≥12 个的网格仍流畅,因为它同时只存在一个背景 span。

### 3.3 Text Generate Effect — 逐词去模糊生成

- **效果**:文字按词从 `blur(10px)+opacity 0` 逐个清晰化,类似"打字机"的质感但无 DOM 增删。
- **依赖**:`motion/react`(`useAnimate` + `stagger`)。
- **代码要点**(registry JSON `text-generate-effect.json` 实抓):
  - `words.split(' ')` 渲染为 span,初始 `opacity-0` + `filter: blur(10px)`;挂载后 `animate('span', { opacity: 1, filter: 'blur(0px)' }, { duration: 0.5, delay: stagger(0.2) })`;`filter={false}` 可关模糊只留淡入。
  - ⚠️ 触发是 `useEffect(..., [scope.current])`——**挂载即播,无 in-view 检测**(当天源码核验);置于折叠下方会在用户看不到时就播完。
- **源 URL**:https://ui.aceternity.com/registry/text-generate-effect.json
- **许可**:免费组件(同 §3.0)。
- **移植要点**:
  - Astro:`client:visible` 岛屿恰好补上"进视口才播"(hydration 即触发点);或加 IntersectionObserver。
  - 与 BlurText 的差别:无 spring、无 sr-only 垫底——移植时**自补 sr-only 全文**(读屏不读逐词动画)。
  - reduced-motion:reduce 时跳过 animate 直接 opacity 1 / filter none(CSS 兜底写法同 §1.4)。
  - 性能红线:同 BlurText,标题级短文用;`duration 0.5 / stagger 0.2` 对 10 词≈2.5s,长文案把 stagger 降到 0.08。

---

## 4. 纯 CSS 手段(引用本项目已有调研,不重复调研)

### 4.1 Scroll-driven progress — 滚动进度条 / Reveal

- **既有记载**:`out/research/04-motion-microinteractions.md:196-212`(来源:Chrome for Developers Bramus 文章 + MDN scroll-driven animations 模块,两 URL 已在此前核验:https://developer.chrome.com/docs/css-ui/scroll-driven-animations 、https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations )。
- **落地代码**(依 04:204/207 要点:进度条用 transform 而非 width 走合成器;`animation-timeline` 必须写在 `animation` 简写之后,duration 写 `auto`):
  ```css
  .progress { position: fixed; inset: 0 0 auto 0; height: 2px;
    background: var(--accent, #7DD3FC); transform-origin: 0 50%;
    transform: scaleX(0); animation: grow linear auto; animation-timeline: scroll(root block); }
  @keyframes grow { to { transform: scaleX(1); } }
  /* Reveal(04:206 官方示例参数): */
  .reveal { animation: reveal linear both; animation-timeline: view();
    animation-range: entry 25% cover 50%; } /* 04:205 */
  @keyframes reveal { from { opacity: 0; clip-path: inset(0% 60% 0% 50%); }
    to { opacity: 1; clip-path: inset(0% 0% 0% 0%); } }
  ```
- **移植要点**:主线程外运行(04:209),**这是"不逐帧 JS"的最强答桉**——TextReveal(§2.5)的静态页替代品;reduced-motion 下进度条属信息性可保留,reveal 类直接 `animation: none; opacity: 1`。

### 4.2 @property 数字滚动 — 零 JS 计数

- **既有记载**:`out/research/09-implementation-tech.md:139`(`@property --num { syntax: '<integer>' }` + counter;09:174 记 @property 已 Baseline widely available)。
- **落地代码**:
  ```css
  @property --num { syntax: '<integer>'; initial-value: 0; inherits: false; }
  .counter::after { counter-reset: num var(--num); content: counter(num);
    font-variant-numeric: tabular-nums;
    transition: --num 2s cubic-bezier(0.33, 1, 0.68, 1); }
  .counter.in-view::after { --num: 128; }  /* 终值;进视口挂类 */
  @media (prefers-reduced-motion: reduce) { .counter::after { transition: none; } }
  ```
- **移植要点**:进视口挂 `.in-view` 类仍需一行 JS(或用 §4.1 `animation-timeline: view()` 改成 keyframes 插值 `--num` 即全 CSS);读屏会读 `::after` 终值以外无中间值问题(CSS 方案天然无中间态文本,见 09 记载的读屏注意点是 JS 方案的);小数位需拆位渲染(09:139)。

### 4.3 Grain — 颗粒叠加(消 banding)

- **既有记载**:`out/research/06-color-theming.md:192-202` 与 `out/research/03-visual-style-trends.md:89-94`(来源 https://css-tricks.com/grainy-gradients/ ,已在此前核验)。
- **落地参数**(06:195/198 原值):`feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'`;轻量变体 `baseFrequency='0.9' numOctaves='2'` + 噪点层 `opacity: .16`(主作用:杀死深色渐变色带)。**react-bits SpotlightCard 内置的 data-URI 版(§1.1,baseFrequency 0.85 / octaves 2 / 160×160)可直接搬来当全局 grain 层**。
- **移植要点**:静态纹理零 JS 零动画成本;深色站把层 opacity 控制在 0.08–0.16;不要给 grain 层加 `mix-blend-mode` 后再叠动画(叠加层越多合成器成本越高)。

---

## 5. React 19 + Astro 岛屿移植总要点(全片段通用)

1. **静态效果不进岛屿**:Marquee / Animated Gradient Text / DotPattern(无 glow)/ Aceternity Spotlight / 纯 CSS 三件套都可以在 `.astro` 里手写,零 hydration 零 JS;只有指针交互(SpotlightCard/Magnet/ClickSpark/GlareHover)和 motion 依赖(BlurText/CountUp/NumberTicker/TextReveal/CardHoverEffect/TextGenerate)才用 `<X client:visible />` 或 `client:load`。
2. **触发双门槛陷阱**:组件自带 `useInView`(CountUp/NumberTicker)或 observer 触发(BlurText `trigger:'view'`)时,岛屿指令用 `client:load`;用 `client:visible` 会变成"进视口→hydration→再进视口判定"的双重延迟。
3. **随机值与 hydration**:DotPattern / ClickSpark 的 `useState(() => 随机)` 惰性初始化在 React 19 下 SSR/CSR 不匹配由组件内部结构消化(motion initial 注入);自写组件时把随机放 `useEffect`。
4. **reduced-motion 三层策略**(§1–3 逐条已给):
   - CSS 层:`@media (prefers-reduced-motion: reduce)` 关 keyframes/transition(所有纯 CSS 片段);
   - JS 层:`window.matchMedia('(prefers-reduced-motion: reduce)')`;
   - 库层:react-bits 5/6 个组件**内建**(SpotlightCard/Magnet/ClickSpark/CountUp/GlareHover),BlurText 与 Magic UI NumberTicker、Aceternity 全部 3 个**无内建,移植时必外包**。
5. **性能红线清单**:
   - 只动 `transform / opacity`(filter blur 仅限短文本);禁 `width/height/top/left` 动画(进度条用 `scaleX`,见 04:207);
   - rAF 必须 settle 即停(react-bits 全部内建;§4.1 scroll-driven 由浏览器托管);
   - 监听 `passive: true` + IntersectionObserver 门控 + `document.hidden` 双门控(react-bits 内建,自写片段照抄此模式);
   - Canvas 用完即删(ClickSpark 模式);
   - 不引起 layout shift:数字用 `tabular-nums`/固定 em 槽(CountUp `CELL 1.2em`、NumberTicker)、宽列进退用显式 width+opacity 且 settled 后清内联(CountUp 手法)、Marquee 容器 `overflow hidden` + 组 `shrink-0`、文本动画区预留 min-height(SSR 首帧即有布局)。

---

## 6. 十个签名巧思(该设计体系里最能体现美学的具体细节)

1. **聚光的"软边"是数学**:falloff = (1−soft)^1.5×0.85 生成 33 档 color-mix 渐变停靠,光斑没有硬圆边、软硬连续可调——react-bits SpotlightCard.jsx(`reactbits.dev/r/SpotlightCard-JS-CSS.json`,2026-11-21 实抓)。
2. **光斑上叠颗粒**:SpotlightCard 在聚光渐变上再罩一层 baseFrequency 0.85 的 feTurbulence 噪点遮罩,高光自带胶片颗粒——同上源码 NOISE data-URI。
3. **磁吸是距离场不是开关**:pull = 1 − smoothstep(padding×0.5, padding, outside),半程全吸、边缘归零,元素"被牵引"而非"被吸附"——react-bits Magnet.jsx。
4. **火花无常驻层**:ClickSpark 每次点击生成独立 DPR 小 canvas、动画毕即 remove,超 32 个先删最旧——ClickSpark-JS-CSS.json `remove(burst)` / `MAX_BURSTS`。
5. **reduce 时火花只"闪"不"飞"**:位移恒 0、寿命固定 320ms、原地淡出——动效降级保住"反馈存在感"——同上 `REDUCED_MS` / `drawSpark`。
6. **光沿圆角矩形跑靠 CSS Motion Path**:`offsetPath: rect(0 auto auto 0 round 50px)` + `offsetDistance 0%→100%`,浏览器托管路径插值——Magic UI border-beam.tsx:85-95。
7. **负延迟错相位**:Border Beam 用 `delay: -delay` 让多道光束首帧即在途,没有"空白起跑"——同上 transition 配置。
8. **跑马灯接缝公式**:`translateX(calc(-100% - var(--gap)))` 平移恰好"一组内容+一个间隙",循环零跳变——Magic UI marquee.mdx keyframes(官方文档页实抓)。
9. **未读文字是灰影不是空白**:TextReveal 用 30% 不透明度幽灵词垫底、滚动进度逐词点亮成全白——Magic UI text-reveal.tsx:66-72。
10. **Hero 光束是 7:1 的斜椭圆**:Aceternity Spotlight 用 rx 1924/ry 273 的椭圆旋转约 −35°、151px 高斯模糊,做成"光束扫入"而非"光斑常驻"——ui.aceternity.com/registry/spotlight.json + 文档页 keyframes(0.75s 延迟播一次定格)。

---

## 附:片段清点

| # | 片段 | 库 | 依赖 | 内建 reduced-motion |
|---|---|---|---|---|
| 1 | SpotlightCard | react-bits | 无 | ✅ |
| 2 | Magnet | react-bits | 无 | ✅ |
| 3 | ClickSpark | react-bits | 无 | ✅ |
| 4 | BlurText | react-bits | motion/react | ❌ 需外包 |
| 5 | CountUp | react-bits | motion/react | ✅ |
| 6 | GlareHover | react-bits | 无 | ✅ |
| 7 | BorderBeam | Magic UI | motion/react(可去) | ❌ 需外包 |
| 8 | Marquee | Magic UI | 无(纯 CSS) | ❌ 需外包 |
| 9 | AnimatedGradientText | Magic UI | 无(纯 CSS) | ❌ 需外包 |
| 10 | DotPattern | Magic UI | motion/react(glow 时) | ❌ 需外包 |
| 11 | TextReveal | Magic UI | motion/react | ❌ 需外包 |
| 12 | NumberTicker | Magic UI | motion/react | ❌ 需外包 |
| 13 | Spotlight | Aceternity | 无(纯 SVG+CSS) | ❌ 需外包 |
| 14 | CardHoverEffect | Aceternity | motion/react | ❌ 需外包 |
| 15 | TextGenerateEffect | Aceternity | motion/react | ❌ 需外包 |
| 16 | Scroll-driven progress | 纯 CSS(引 04) | 无 | 逐条给 |
| 17 | @property 数字滚动 | 纯 CSS(引 09) | 无 | 逐条给 |
| 18 | Grain | 纯 CSS(引 03/06) | 无 | 静态纹理 |

共 18 个片段(≥12 达标)。Glow 组件经注册表 404 实证不存在,由 GlareHover 承接发光悬停需求。
