# 微交互「可直接复用代码」与丝滑工艺专项(10-microinteractions-code)

> 调研日期:2026-11-22。服务对象:本项目 8 条微交互条目(按压反馈对 / 卡槽弹簧·竹简槽分段滑块 / 浮层入场 / 错误抖动·指数衰减 / Toast 弹簧入场 / 阻尼感设计 / 丝滑工艺 / 滚动溢出行为)。
>
> **核验方式说明**:所有结论均来自本次会话内实际抓取的一手来源 —— 组件库源码(GitHub raw / `gh api` 原文)、官方文档页(MDN、motion.dev、web.dev)、Apple 文档 JSON 端点(`developer.apple.com/tutorials/data/...`)、CSS 规范(drafts.csswg.org)、维基百科物理条目;数学衍生值(过冲表、弹簧档位换算)由本地 Python 实算并标注公式。每条结论附来源 URL;**查不到的子项明确标注「未证实」,不编造数值**。所有"Motion"指 Motion for React / framer-motion 后继版(motiondivision/motion,v12 系)。
>
> 源码引用格式:`仓库:路径:行号`(行号来自本次抓取时的主分支内容)。

---

## 0. 速查总表(8 条目 × 推荐参数)

| 条目 | 一句话工艺结论 | 关键参数(来源见对应章节) |
|---|---|---|
| 按压反馈对 | 色彩阶进 + 按压瞬时/回弹缓动,而非 scale | AntD: 5 属性 0.2s easeInOut;Arco: `:active` 关 transition(瞬时),hover=色阶-5、active=色阶-7,0.1s linear |
| 卡槽弹簧(分段滑块) | 单一 `layoutId` 元素跨槽位移动 + 低弹弹簧 | BuildUI:`bounce 0.2, duration 0.6`(ζ≈0.8,过冲≈1.5%);手写档位见 §2.3 |
| 浮层入场 | fade + zoom 0.95→1,scale 原点交给 transform-origin | shadcn dialog:`zoom-in-95 + fade-in-0`,duration 200ms;popover 附方向性 slide 8px |
| 错误抖动 | 优先「速度注入弹簧」;CSS 退路是分段衰减 keyframes | animate.css:±10px 等幅;衰减版按 x(t)=A·e^(−λt)·sin(ω_d t) 采样(§4) |
| Toast 弹簧入场 | 入场带过冲、退场缓出收尾;自动消失 4s | react-hot-toast:入 0.35s bezier(.21,1.02,.73,1)、出 0.4s bezier(.06,.71,.55,1);sonner:400ms + 4s 生命周期 |
| 阻尼感设计 | ζ 是手感第一变量;mass 管"大物沉" | Motion 源码默认 stiffness 100 / damping 10 / mass 1(ζ=0.5,过冲 16.3%) |
| 丝滑工艺 | 只动 transform/opacity;will-change 最后手段用后即撤;中断接力靠弹簧速度继承 | web.dev + MDN will-change + Motion 源码 |
| 滚动溢出 | 弹层 `overscroll-behavior: contain` 防滚动链;snap 用 proximity 保安全 | MDN:contain 拦滚动链不拦回弹,none 两者都拦 |

---

## 1. 按压反馈对

### 1.1 组件库源码取证(本次逐文件核验)

**AntD(v5,master 分支)** — `components/button/style/index.ts`
- Button 基础过渡只覆盖**颜色系 5 属性**,时长取全局 token `motionDurationMid`,缓动 `motionEaseInOut`:
  ```ts
  transition: ['color','background-color','border-color','box-shadow','opacity']
    .map(p => `${p} ${motionDurationMid} ${motionEaseInOut}`).join(',')
  ```
  来源:https://github.com/ant-design/ant-design/blob/master/components/button/style/index.ts(本次抓取原文)
- 时长 token 数学定义(`genCommonMapToken.ts:9-11`):`motionDurationFast = motionBase + motionUnit`,`Mid = motionBase + motionUnit*2`,`Slow = motionBase + motionUnit*3`;seed 值 `motionUnit: 0.1, motionBase: 0`(`themes/seed.ts:49-50`)→ **0.1s / 0.2s / 0.3s**。
  来源:https://github.com/ant-design/ant-design/blob/master/components/theme/themes/shared/genCommonMapToken.ts 与 https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts
- 结论:**AntD 默认按钮按压不缩放**,只做颜色/边框/阴影/透明度过渡(0.2s)。另有点击"波纹"效果:源码目录 `components/_util/wave/`(WaveEffect.tsx、useWave.ts 等,本次确认存在)。
  来源:https://github.com/ant-design/ant-design/tree/master/components/_util/wave

**Arco Design** — `components/Button/style/index.less`
- 关键工艺细节(逐字摘录):
  ```less
  transition: all @transition-duration-1 @transition-timing-function-linear;
  &:active { transition: none; }   // ← 按压瞬时生效,松手才走 0.1s 过渡
  ```
  `@transition-duration-1: 0.1s`。
  来源:https://github.com/arco-design/arco-design/blob/main/components/Button/style/index.less 与 https://github.com/arco-design/arco-design/blob/main/components/style/theme/default.less
- 按压色阶(`token.less`):primary `bg = color-primary-6`,`hover = primary-5`(变亮一阶),**`active = primary-7`(变深一阶)**;secondary 的 active 用 `--color-secondary-active` 专属变量。
  来源:https://github.com/arco-design/arco-design/blob/main/components/Button/style/token.less
- 全局缓动 token(default.less 原文,可直接抄进设计令牌):
  - 标准 `cubic-bezier(0.34, 0.69, 0.1, 1)`;过冲 `cubic-bezier(0.3, 1.3, 0.3, 1)`;减速 `cubic-bezier(0.4, 0.8, 0.74, 1)`;加速 `cubic-bezier(0.26, 0, 0.6, 0.2)`;线性 `cubic-bezier(0, 0, 1, 1)`;时长档 0.1/0.2/0.3/0.4/0.5s。

**shadcn/ui(v4 registry,new-york)** — Button 无任何 `active:scale`/按压 transform(grep 全文仅 `transition-all` + focus ring);Dialog/Popover/Sheet 的按压面(`data-[state=open]`)走状态类,不缩放按钮本体。
  来源:https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx

**Magic UI** — PulsatingButton:按压之外的"呼吸脉冲"用叠加层 `box-shadow` 扩散:
  ```json
  "@keyframes pulse": {
    "0%, 100%": { "boxShadow": "0 0 0 0 var(--pulse-color, oklch(from var(--bg) l c h / 0.5))" },
    "50%": { "boxShadow": "0 0 0 var(--distance) …" }   // --distance 默认 8px,--duration 默认 1.5s
  }
  ```
  组件还演示了 rAF + MutationObserver 同步 `--bg` 变量的写法。来源:https://github.com/magicuidesign/magicui/blob/main/apps/www/public/r/pulsating-button.json
  注意:这是"脉冲强调"不是按压反馈;Magic UI 未见专门的按压缩放按钮组件(本次核验范围)。

**react-bits** — 按压相关的两个组件:
- **ClickSpark**(点击迸火花,canvas 2D):自带"spring"缓动多项式近似 `1 + 2.4(t−1)³ + 1.4(t−1)²`,重力 `GRAVITY = 500`,reduced-motion 下时长压到 320ms。来源:https://github.com/DavidHDev/react-bits/blob/main/src/content/Animations/ClickSpark/ClickSpark.jsx
- **ElasticSlider**:容器 `touch-action: none` + 内容层 `will-change: transform`,拖动通过 CSS 变量 `--elastic-slider-unscale` 反缩放内容。来源:https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/ElasticSlider/ElasticSlider.css

### 1.2 Web 惯例结论(基于上述源码,非传说)

1. **桌面端成熟组件库的默认按压 = 色彩阶进(Arco ±1 色阶)+ 按压瞬时/回弹缓动(Arco `:active{transition:none}`)**,而不是 scale。scale 按压(`active:scale-95/0.98`)是社区/移动端流行做法 —— 本次未在四大库默认按钮源码中核验到任何默认 scale 值,**如实标注:常见经验值 scale(0.95~0.98)、按压 opacity≈0.7~0.8 为社区惯例,无一手默认值可引**。
2. 按压应当"瞬时响应":状态切换本身 0ms,恢复才给过渡(Arco 官方实现即如此)。这是"跟手感"的第一原则。

### 1.3 可直接复用代码

**零依赖 CSS 版(色彩对 + 可选微缩放,惯例值已标注)**
```css
/* 按压反馈对:按下瞬时、松手 120ms 缓出(结构仿 Arco:active 关过渡) */
.mi-btn { transition: all 0.12s cubic-bezier(0.4, 0.8, 0.74, 1); /* Arco decelerate */ }
.mi-btn:active { transition: none; transform: scale(0.97); /* scale 为社区惯例值,非库默认 */ }
.mi-btn:active { filter: brightness(0.92); } /* 替代 scale 的纯色彩方案,零布局影响 */
@media (prefers-reduced-motion: reduce) { .mi-btn:active { transform: none; } }
```

**Motion 版(press-in 瞬时、release 弹回)**
```jsx
import { motion } from "motion/react";
<motion.button
  whileTap={{ scale: 0.97 }}                                  // tap 用短 tween
  transition={{ duration: 0.01 }}                              // 按下几乎瞬时
  onPointerRelease={/* 松手回弹交给 spring */}
  whileHover={{ scale: 1.02 }}
/>
// 更物理的写法:回弹用 duration-spring,bounce 0.2(ζ≈0.8,见 §6)
<motion.button whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", bounce: 0.2, duration: 0.2 }} />
```
弹簧参数来源:motion.dev Transitions(duration-based spring 用 `bounce` + `duration`,bounce −1~1,0=临界阻尼)https://motion.dev/docs/react-transitions

---

## 2. 卡槽弹簧(分段控制滑块 / 竹简槽)

### 2.1 framer-motion `layoutId` 标准实现(BuildUI 原版,逐字)

Sam Selikoff 的 Animated Tabs 是该模式的事实范式:**只渲染一个气泡,`layoutId` 相同,Motion 自动在槽位间做 FLIP 布局动画**;`mix-blend-difference` 让文字在气泡经过时反色;圆角用 style 内联以获得 Motion 的 scale 校正(避免子元素形变)。
```jsx
function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <div className="flex space-x-1">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
          className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white">
          {activeTab === tab.id && (
            <motion.span layoutId="bubble"
              className="absolute inset-0 z-10 bg-white mix-blend-difference"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```
来源:https://buildui.com/recipes/animated-tabs(本次抓取原文,Framer Motion 10.9.1)
`layoutId` 的跨元素布局动画机制见 Motion 布局动画文档:https://motion.dev/docs/react-layout-animations(文档目录本次核验)

### 2.2 手写 transform 插槽弹簧(零依赖)

竹简槽 = 固定容器内一个"滑签"在 N 个卡位之间滑动。物理采用与 Motion 源码一致的半隐式欧拉积分(公式的规范出处见 §6.1 维基条目与 §6.2 Motion spring.ts):
```js
// springSlot(el, fromX, toX, {stiffness, damping, mass}) —— 可中断、速度接力
function springSlot(el, toX, opt = {}) {
  const k  = opt.stiffness ?? 300, c = opt.damping ?? 25, m = opt.mass ?? 1;
  let x = (parseFloat(el.dataset.x) || 0), v = parseFloat(el.dataset.v) || 0;
  let last = performance.now(), raf;
  const restDelta = 0.01 / 5;                       // Motion: restDeltaGranular=0.005(源码)
  cancelAnimationFrame(raf);
  const step = (now) => {
    const dt = Math.min((now - last) / 1000, 1/30); // 单步上限防跳帧爆炸
    last = now;
    const a = (-k * (x - toX) - c * v) / m;          // m·x'' + c·x' + k·(x−目标) = 0
    v += a * dt; x += v * dt;
    el.style.transform = `translate3d(${x}px,0,0)`;  // 只动 transform
    el.dataset.x = x; el.dataset.v = v;              // 存速度 → 中断接力
    if (Math.abs(v) > 0.01 || Math.abs(x - toX) > restDelta) raf = requestAnimationFrame(step);
    else { el.dataset.x = toX; el.dataset.v = 0; el.style.transform = `translate3d(${toX}px,0,0)`; }
  };
  raf = requestAnimationFrame(step);
}
// 用法:点击第 i 槽 → springSlot(pill, slotLeft[i])  // 绝对位移,滑签物理量守恒
```
积分器与 rest 阈值思路对齐 Motion 源码 `spring.ts`(restSpeed/restDelta 双阈值停机,本次抓取):https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/generators/spring.ts

**Motion 版(推荐线上用)**
```jsx
<motion.span layoutId="pill" transition={{ type: "spring", stiffness: 300, damping: 25 }} />
// 拖拽式卡槽:useSpring 跟手 + 松手吸附
const x = useSpring(0, { stiffness: 300, damping: 25 });
// x.set(目标槽位 px) —— physics spring 自动继承当前速度(Motion 文档原文)
```
`useSpring` 语义:set() 触发弹簧、jump() 立即到位 —— https://motion.dev/docs/react-spring

### 2.3 推荐档位(本地 Python 实算,公式见 §4.3/§6)

ω₀=√(k/m),ζ=c/(2√(km));过冲%=e^(−πζ/√(1−ζ²))×100;包络衰减到 5% 用时 = ln20/(ζω₀)。

| 档位 | stiffness | damping | ζ | 过冲 | 峰值时刻 | 包络→5% |
|---|---|---|---|---|---|---|
| 快·稳(分段控件默认推荐) | 700 | 40 | 0.756 | 2.7% | 181ms | 150ms |
| 中·微弹 | 300 | 25 | 0.722 | 3.8% | 262ms | 240ms |
| 慢·弹(强调"竹简手感") | 200 | 15 | 0.530 | 14.0% | 262ms | 399ms |
| Motion 物理默认 | 100 | 10 | 0.500 | 16.3% | 362ms | 600ms |
| BuildUI 气泡(duration-based) | bounce 0.2 / 0.6s | →ζ≈0.8 | 1.5% | — | — |
| ⚠️ 反例:500/50 | 500 | 50 | **1.118 过阻尼** | 0% | — | — |

实算命令(Python,本次执行):对每组 (k,c) 计算 w0=√k、ζ=c/(2√k)、overshoot、λ=ζω₀、ln20/λ、π/(ω₀√(1−ζ²))。输出如 `stiffness=300 damping=25: w0=17.3rad/s zeta=0.722 overshoot=3.8% envelope->5%=240ms t_peak=262ms`。
**重要反直觉点:`stiffness:500, damping:50` 这组社区流传参数其实是过阻尼(ζ=1.12)——完全无过冲,比"微弹"档更"钝"。抄参数前先算 ζ。**

### 2.4 iOS 分段控件对照

- HIG 定性规范(Apple 文档 JSON 端点原文):分段控件是"两个及以上段构成的线性集合,每段功能如按钮";**段通常等宽**;作为单一选择器时强调"分组感/选中态一目了然";**宽界面 ≤5–7 段,iPhone ≤5 段**;同一控件内不要混"选择态"与"动作触发"。来源:https://developer.apple.com/design/human-interface-guidelines/segmented-controls(数据端点 `tutorials/data/design/...` 本次抓取)
- iOS 13+ 系统分段控件选中指示器滑动为弹簧动画 —— **Apple 未公开其 stiffness/damping 数值,未证实**;工程上用 §2.3"中·微弹"档(300/25)作为等感替代。

---

## 3. 浮层入场(popper / tooltip / dialog)

### 3.1 shadcn/radix 事实标准(源码逐字)

- **Dialog**(new-york-v4 registry,`dialog.tsx:42,64`):
  - Overlay:`data-[state=open]:animate-in data-[state=open]:fade-in-0`(opacity 0→1)+ 对称 `fade-out-0`
  - Content:`data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 … duration-200` —— **初态 scale(0.95)+ opacity 0,200ms 到位**;关闭 `zoom-out-95 + fade-out-0`
- **Popover**(`popover.tsx:32`):同款 fade+zoom-95,另加**方向性位移**:`data-[side=top]:slide-in-from-bottom-2`(从锚点侧进入,8px);transform-origin 用 `--radix-popover-content-transform-origin`(Radix 由锚点方向写入 CSS 变量,缩放原点自动正确)。
- **Sheet(底部抽屉)**(`sheet.tsx:62-70`):`transition ease-in-out`,**`data-[state=open]:duration-500`(入 500ms)、`data-[state=closed]:duration-300`(出 300ms)——"进慢出快"**;方向类 `slide-in-from-bottom` 等。
- tw-animate-css 的 `zoom-in-95` = 初态 `scale(0.95)`、`fade-in-0` = 初态 `opacity: 0`(在生成的 utilities 中为标准 keyframes;数值 95/0 在类名内自明)。
来源:https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/dialog.tsx、…/popover.tsx、…/sheet.tsx(本次 gh raw 抓取)

### 3.2 带过冲的 bezier 入场(线性缓动系替代 spring)

react-hot-toast 入场即"过冲 bezier"范例:`cubic-bezier(.21, 1.02, .73, 1)`(y₂>1 → 轻微过冲),浮层类通用。Arco 全局 token 也提供现成过冲曲线 `cubic-bezier(0.3, 1.3, 0.3, 1)`。
来源:https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx、https://github.com/arco-design/arco-design/blob/main/components/style/theme/default.less

Material Design M3 的 emphasized easing(常引 `cubic-bezier(0.2, 0, 0, 1)`)—— **本次 m2/m3.material.io 页面均为 JS 渲染无法抓取正文,数值未证实**;但 Jake Archibald 的 linear() 生成器内置 "Material Design emphasized easing" 预设(工具页本次抓取),可作为导出渠道:https://linear-easing-generator.netlify.app/

### 3.3 可直接复用代码

**零依赖 CSS 版(dialog/tooltip 通用)**
```css
/* data-open 属性驱动;scale+opacity 全走合成器 */
.mi-pop[data-open] { transform-origin: var(--tf-origin, top); animation: mi-pop-in 0.2s cubic-bezier(0.4, 0, 0.2, 1) both; }
.mi-pop:not([data-open]) { animation: mi-pop-out 0.15s cubic-bezier(0.4, 0, 1, 1) both; }
@keyframes mi-pop-in  { from { opacity: 0; transform: translate3d(0, var(--pop-shift, 0px), 0) scale(0.95); }
                        to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); } }
@keyframes mi-pop-out { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
/* 弹过冲版:把入场的 ease 换成 cubic-bezier(.21,1.02,.73,1)(react-hot-toast 同款) */
```
JS 端只需切换 `data-open` 并在 `animationend` 后卸载;tooltip 建议在锚点方向写入 `--tf-origin`/`--pop-shift`(仿 Radix 语义,shadcn popover.tsx 佐证)。

**Motion 版(An + spring)**
```jsx
<AnimatePresence>
  {open && (
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }}       // shadcn: zoom-95 + slide-8px 同构
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}  // 出快入慢
                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                style={{ transformOrigin: "var(--tf-origin, top)" }} />
  )}
</AnimatePresence>
```
AnimatePresence 退场语义:https://motion.dev/docs/react-animation(文档页核验)

---

## 4. 错误抖动 · 指数衰减

### 4.1 实现一:CSS keyframes 分段(animate.css 事实标准,逐字)

```css
@keyframes shakeX {
  from, to { transform: translate3d(0, 0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
  20%, 40%, 60%, 80%      { transform: translate3d(10px, 0, 0); }
}
.shakeX { animation-name: shakeX; }   /* 默认时长由 .animate 提供(animate.css: 1s) */
```
来源:https://github.com/animate-css/animate.css/blob/main/source/attention_seekers/shakeX.css(本次抓取)
注意:**animate.css 是等幅抖动(每拍都是 ±10px),不是物理衰减** —— 适合"通知",不太像"物理失败"。

### 4.2 实现二:弹簧速度注入(物理派,推荐)

Motion 弹簧接受显式初始速度:`velocity` 默认取"当前值速度"(文档原文),单位为 值单位/秒。给一次大初速度,让欠阻尼弹簧自己产生**指数衰减的正弦震荡** —— 中断、重播天然连续。
```js
import { animate } from "motion";
// 表单校验失败:注入向左初速度,弹簧衰减震荡(档位 = §2.3 "中·微弹" ×2 速度感)
animate(el, { x: 0 }, { type: "spring", stiffness: 500, damping: 24, velocity: -2000 });
// ζ = 24/(2√500) ≈ 0.536 → 过冲≈13.5%,首拍振幅 ≈ v/(ω_d) 级;λ = ζω₀ ≈ 12 → 包络 5% 耗时 ≈ 250ms
```
来源:motion.dev Transitions `velocity` 参数说明(本次抓取)https://motion.dev/docs/react-transitions;档位换算为本地 Python 实算。
同样思路的零依赖版:直接调 §2.2 的 `springSlot`,先把 `el.dataset.v = -2000` 再 `springSlot(el, 0, {stiffness:500, damping:24})` —— 速度接力已内建。

### 4.3 指数衰减数学与参数选择

- 运动方程 `m·x'' + c·x' + k·x = 0`;ζ = c/c_c = c/(2√(m·k));ω_n = √(k/m);临界阻尼 c_c = 2√(m·k)。来源:Wikipedia *Damping*(本次抓取原文)https://en.wikipedia.org/wiki/Damping_ratio
- 欠阻尼解即题目所述形式:维基原文给出 `y(t) = A·e^(−λt)·cos(ωt−φ)`(λ=衰减率,s⁻¹;ω=角频率),且 **ζ≈λ/ω,精确式 ζ=λ/√(λ²+ω²)**;包络半衰期 = ln2/λ ≈ 0.693/λ,时间常数 τ=1/λ。
- Motion 源码与该式逐字对应(`spring.ts`):`exponentialDecay = undampedFreq * dampingRatio`(即 λ=ζω₀)、`calcAngularFreq = undampedFreq * √(1−ζ²)`(即 ω_d=ω₀√(1−ζ²))、`damping = dampingRatio * 2 * Math.sqrt(stiffness)`(即 c=2ζ√(mk),mass=1 形式)。
  来源:https://github.com/motiondivision/motion/blob/main/packages/motion-dom/src/animation/generators/spring.ts

**λ 与"衰减快慢"的感知换算(本地 Python 实算,公式如上):**

| ζ | 过冲%(第一拍) | 感知 |
|---|---|---|
| 0.10 | 72.9% | 弹跳球,几乎失控 |
| 0.15 | 62.1% | Apple 文档推荐"多震荡"下限(UISpringTimingParameters `init(dampingRatio:)`:"要更多震荡,取接近 0.15") |
| 0.25 | 44.4% | 强弹玩具感 |
| 0.50 | 16.3% | **Motion 物理默认**(stiffness 100/damping 10) |
| 0.70 | 4.6% | "弹而不闹"甜点(Motion 文档 bounce 0.25/0.3 ≈ 此区) |
| 0.80 | 1.5% | BuildUI 卡槽气泡(bounce 0.2) |
| 1.00 | 0(临界) | 最快无过冲复位(Apple:"要更阻尼更少震荡取 1.0") |
| >1 | 0(过阻尼) | 起步快、收尾慢(粘滞感) |

- **感知规律(推导+上表)**:λ=ζω₀ 决定包络每秒衰减率;同一 ζ 下提高 ω₀(刚度)→ 波次更密、单次过冲比例不变;同一 ω₀ 下提高 ζ → 波次更少、过冲指数式下降。**"抖几下"由 ζ 定,"抖多快"由 ω₀ 定**。
- 指数衰减版 keyframes 采样(自推导示例,非外部来源):取 A₀=10px、λ=6s⁻¹、每拍间隔 Δt=0.05s → 包络每拍 ×e^(−0.3)≈0.74:
  ```css
  @keyframes shake-decay { /* 0.5s, ease-in-out 每段 */
    0% { transform: translateX(0) } 10% { transform: translateX(-10px) }
    25% { transform: translateX(8px) } 40% { transform: translateX(-6.4px) }
    55% { transform: translateX(5.1px) } 70% { transform: translateX(-4.1px) }
    85% { transform: translateX(3.3px) } 100% { transform: translateX(0) } }
  ```

### 4.4 真实案例:macOS 登录框

macOS 登录界面密码错误时输入框水平抖动是公认系统行为;**Apple 未公开动画参数(时长/振幅/衰减),未证实**。社区等感实现普遍收敛在:水平 4–6 拍、单拍 ~10px、总时长 ~0.5s(与 animate.css ±10px 同量级)—— 该数值为社区复刻经验,本次未核验到可引的一手来源,仅供参考。

---

## 5. Toast 弹簧入场

### 5.1 两大标杆源码

**react-hot-toast**(`src/components/toast-bar.tsx`,逐字):
```js
const enterAnimation = (factor) => `
0%  { transform: translate3d(0, ${factor * -200}%, 0) scale(.6); opacity: .5; }
100%{ transform: translate3d(0, 0, 0) scale(1); opacity: 1; }`;
const exitAnimation  = (factor) => `
0%  { transform: translate3d(0, 0, -1px) scale(1); opacity: 1; }
100%{ transform: translate3d(0, ${factor * -150}%, -1px) scale(.6); opacity: 0; }`;
// 应用:入 0.35s cubic-bezier(.21,1.02,.73,1) forwards;出 0.4s cubic-bezier(.06,.71,.55,1) forwards
// prefers-reduced-motion → 退化为纯 fade;容器 will-change: transform
```
要点:**入场从屏幕外 200% 滑入 + scale 0.6→1 + opacity 0.5→1,用 y₂>1 的过冲 bezier 造"弹簧感"**;退场是纯缓出收尾(release 感)。来源:https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx

**sonner**(`src/styles.css`,摘录):
```css
[data-sonner-toast] { --y: translateY(100%); opacity: 0;                 /* 顶部则 -100% */
  transition: transform 400ms, opacity 400ms, height 400ms, box-shadow 200ms; }
[data-sonner-toast][data-mounted='true'] { --y: translateY(0); opacity: 1; }
[data-sonner-toast][data-removed='true'][data-front='true'] { --y: translateY(-100%); opacity: 0; } /* 前排滑出 */
[data-sonner-toast][data-removed='true'][data-front='false'][data-expanded='false'] {
  --y: translateY(40%); opacity: 0; transition: transform 500ms, opacity 200ms; }   /* 后排下沉堆叠 */
[data-sonner-toast][data-swipe-out='true'] { animation-duration: 200ms; animation-timing-function: ease-out; animation-fill-mode: forwards; }
```
生命周期:`TOAST_LIFETIME = 4000`(index.tsx:31);滑出手势阈值在 JS 侧(vaul 同作者)。来源:https://github.com/emilkowalski/sonner/blob/main/src/styles.css 与 https://github.com/emilkowalski/sonner/blob/main/src/index.tsx

**Bottom-sheet 类 spring 档(sonner 作者的 vaul)**:`TRANSITIONS = { DURATION: 0.5, EASE: [0.32, 0.72, 0, 1] }`,`VELOCITY_THRESHOLD = 0.4`,`CLOSE_THRESHOLD = 0.25`(低于 25% 进度回弹、速度超阈值即放走);挂载方式为内联 `transition: transform 0.5s cubic-bezier(0.32,0.72,0,1)`。
来源:https://github.com/emilkowalski/vaul/blob/main/src/constants.ts、https://github.com/emilkowalski/vaul/blob/main/src/index.tsx(v0.9.7 同款,本次双版本核验)
若必须真弹簧:Motion `velocity` 继承手势速度(§4.2),`bounce` 取 0.2~0.3。

### 5.2 可直接复用代码

**零依赖 CSS 版(react-hot-toast 同构)**
```css
.mi-toast[data-pos='bottom'] { --dir: 1; }  .mi-toast[data-pos='top'] { --dir: -1; }
.mi-toast { will-change: transform; }
.mi-toast[data-visible='true']  { animation: mi-toast-in  .35s cubic-bezier(.21,1.02,.73,1) both; }
.mi-toast[data-visible='false'] { animation: mi-toast-out .40s cubic-bezier(.06,.71,.55,1) both; }
@keyframes mi-toast-in  { from { transform: translate3d(0, calc(var(--dir) * 200%), 0) scale(.6); opacity: .5; }
                          to   { transform: translate3d(0, 0, 0) scale(1); opacity: 1; } }
@keyframes mi-toast-out { to   { transform: translate3d(0, calc(var(--dir) * -150%), 0) scale(.6); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .mi-toast[data-visible] { animation: mi-fade .2s both; } }
/* 生命周期:JS setTimeout 4000ms(sonner 同款)后置 data-visible=false,animationend 后卸载 */
```

**Motion 版(真弹簧 + 出场)**
```jsx
<AnimatePresence>
  {open && <motion.div initial={{ y: "-200%", scale: 0.6, opacity: 0.5 }}
    animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.25, visualDuration: 0.35 } }}
    exit={{ y: "150%", scale: 0.6, opacity: 0, transition: { duration: 0.4, ease: [.06,.71,.55,1] } }} />}
</AnimatePresence>
```
`visualDuration`(visualDuration 弹簧:视觉 0.35s 到位、"弹"在之后,且**继承被中断动画的速度**)出自 Motion Transitions 文档本次抓取:https://motion.dev/docs/react-transitions

---

## 6. 阻尼感设计

### 6.1 物理定义(维基条目原文要点)

- ζ = c/c_c = 实际阻尼/临界阻尼;c_c = 2√(km);ω_n = √(k/m);方程 m·x''+c·x'+k·x=0。
- ζ=0 无阻尼;0<ζ<1 欠阻尼(过冲振荡,幅度指数衰减);ζ=1 临界阻尼(**最短时间无过冲复位**——工程上称"期望结果");ζ>1 过阻尼(慢速无振荡回归)。
- Q=1/(2ζ),Q 越高阻尼相对越弱。来源:https://en.wikipedia.org/wiki/Damping_ratio

### 6.2 感知区间(交互视角,结合 §4.3 表)

- **0.3–0.7 = "弹"区**:过冲 37.2%~4.6%;0.5~0.8 = 大多数 UI 目标区(过冲 16.3%→1.5%);0.7~0.85 适合高频交互(分段控件、卡片),抖动可感知但不超过 5%。
- **ζ=1 临界 = "稳"**:Apple UI 弹簧默认语言(UISpringTimingParameters `init(dampingRatio:)` 原文:"more damping/less oscillation → 1.0;less damping/more oscillation → 接近 0.15")。来源:https://developer.apple.com/documentation/uikit/uispringtimingparameters(文档 JSON 端点本次抓取)
- **ζ>1 过阻尼**:Motion 文档亦支持 —— duration-based spring 的 `bounce` 允许负值(−1~1):"负 bounce 过阻尼:起步更快、更慢落位、无过冲,只改形状不改到达时间"(文档原文)。来源:https://motion.dev/docs/react-transitions

### 6.3 stiffness/damping/mass → 手感映射(Motion 源码 + 文档)

- 源码默认(`spring.ts:22-27`):**stiffness=100, damping=10, mass=1.0**;duration-based 默认 duration=800ms、bounce=0.3(文档页写 bounce 0.25 / stiffness Default 1 —— 与源码不一致,**以源码为准并如实记录差异**)。
- `bounce` ↔ ζ 换算(Motion 源码逐字,`bounceToDampingRatio`):bounce<0 → ζ=1/max(1+bounce, 0.05);bounce≥0 → ζ=max(1−bounce, 0.05)。即 **bounce 0.2 → ζ0.8;bounce 0.3 → ζ0.7;bounce 0.7 → ζ0.3**。
- 手感映射:
  - **stiffness↑**:ω₀↑,启动更"猛"、到达更快,过冲比例不变(ζ 不变时)。文档原文:"Higher values will create more sudden movement"。
  - **damping↑**:ζ↑,"稳"、少弹;damping=0 永不停止(文档警告)。
  - **mass↑**:同 k/c 下 ω₀↓ ζ↓ → 又慢又弹," lethargic(沉重迟缓)"(文档原文)。**mass 何时调:大元素(大卡、整页层)调 mass=1.5~2 换体积感;Motion 还提供 `mass:"auto"` —— 布局动画按元素尺寸取质量("bigger elements move with more weight")**。两者均出自 https://motion.dev/docs/react-transitions 本次抓取。
- 停机判定(源码):restSpeed/restDelta 双阈值,granular 档 restSpeedGranular=0.01 / restDeltaGranular=0.005,default 档 2 / 0.5(文档页写 restSpeed 0.1 / restDelta 0.01,与源码 granular/default 两档并存 —— 同上,如实记录)。

---

## 7. 丝滑工艺

### 7.1 只动 transform/opacity(合成器友好)

web.dev《高性能 CSS 动画》原文要点:移动用 `transform: translate`,缩放用 `scale`,显隐用 `opacity`;**除 transform/opacity 外的属性会触发布局/绘制**;`top/left` 动画示例丢帧 50%,transform 版仅 1%(Chrome DevTools FPS 面板实测);模糊/阴影绘制更贵;调试看 Performance 面板"Rendering" 是否为 0。来源:https://web.dev/articles/animations-guide(本次抓取中文页)
本会话源码佐证:react-hot-toast 容器 `will-change: transform`;react-bits ElasticSlider 关键层 `will-change: transform`;animate.css 全部 `translate3d`(强制合成路径)。

### 7.2 合成层提升与 will-change 的代价

MDN will-change 页核心警告(逐条):应用于整个子树(body 级大范围反而劣化);"**last resort**——不要预防性使用";过量使用会"excessive memory use + more complex rendering → worse performance";会提前创建 stacking context(`will-change: opacity` 也有视觉副作用);正确姿势是 **JS 在动画前设置、`animationend` 后移除**(页面附示例代码);样式表常驻只适合"翻页类"确定性场景。来源:https://developer.mozilla.org/en-US/docs/Web/CSS/will-change(本次抓取)
廉价回退:web.dev 提到不支持 will-change 的浏览器可用 `transform: translateZ(0)` 提层。

### 7.3 中断接力(velocity preserve)

- Motion 物理弹簧的核心承诺(文档原文):"physics-based spring animations … **incorporate the velocity of any existing gestures or animations for natural feedback**";`velocity` 参数默认就是"当前值速度"。→ 在动画中途再次触发,弹簧从当前位置+当前速度继续,永不"归零重启"。
- 反例:duration-based spring(`bounce+duration`)**总是精确走完 duration、忽略速度**("starts from rest and ignores velocity")——需要接力时用物理参数或 `visualDuration`。
- duration-based spring 可导出为纯 CSS(Motion 文档:"can also be generated as pure CSS")→ 与 §2.2 手写积分器/linear() 采样衔接。
来源:https://motion.dev/docs/react-transitions(本次抓取)

### 7.4 每帧混入 CSS 变量的代价

- 规范侧:CSS Variables Level 1 —— 自定义属性**按继承树传播**("inherited to the elements in the rest of the document"),其变化触发依赖样式的 **invalidation**(规范多处出现 invalidation 条款)。来源:https://drafts.csswg.org/css-variables-1/(本次抓取)
- 工程侧:每帧 JS 写 `--x` → 该子树样式重算 → 布局前多一道 Recalculate Style;Firefox 性能瀑布图看到 "Recalculate Style" 条目即意味着"回到渲染瀑布开头"(web.dev 调试章节原文)。
- 工艺结论:**手势逐帧驱动 → 直接写 `el.style.transform`(react-hot-toast/vaul/tonel 同类做法),或者用 Motion 的 motion value(直接写样式不经 CSS 变量);CSS 变量留给"事件级"切换(sonner 的 `--y` 就是 class 切换时更新,而非每帧)**。

### 7.5 linear() 采样:把弹簧烤进 CSS

- 语法与语义(MDN):`linear(0, 0.25 75%, 1)` —— 至少两个点,可在任意点后挂 1~2 个百分比定义时间位置;等距为默认;"A typical use … provide many points to approximate any curve"。Baseline:2023-12 起广泛可用。来源:https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear(本次抓取)
- 生成工具:Jake Archibald《Linear easing generator》,支持 JS/SVG 输入、内置 **Spring / Bounce / Material Design emphasized** 预设,输出可 Copy/Simplify/Round 的 CSS。来源:https://linear-easing-generator.netlify.app/(本次抓取)
- 工艺:零依赖场景下,把 §6 的解析弹簧按 60~100 个采样点烤成一条 `linear()`,获得"数学弹簧的形状 + CSS 合成器动画的宿管"。react-bits ClickSpark 的 `1 + 2.4(t−1)³ + 1.4(t−1)²` 也是同类"多项式近似弹簧"思路(canvas 侧)。

### 7.6 60/120Hz 下的时长感知

- MDN rAF 原文:"回调频率通常匹配显示器刷新率""最常见 60Hz,75/120/144Hz 也很普遍"。→ **JS 帧动画天然跟随刷新率;CSS/WAAPI 的 ms 时长与刷新率无关**。来源:https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame(本次抓取)
- 算术:60Hz 帧预算 16.67ms,120Hz 8.33ms —— 同一个 200ms 动画在 120Hz 上采样帧数翻倍、轨迹更贴曲线,掉帧容忍窗口减半(算术推导,无需引源)。
- iOS 侧对照:CADisplayLink `preferredFrameRateRange` 文档存在("frame update 频率范围"),Apple 硬件 120Hz(ProMotion)具体页面本次未能抓取到正文 —— **Apple 120Hz 硬件参数未证实**,工程结论不受影响:**时长一律用 ms,不要按帧数写动画**。
- 工艺:高速动画(<150ms)在 120Hz 下"更跟手"属普遍观察,本次无引用来源,标注为经验值。

---

## 8. 滚动溢出行为(MDN)

### 8.1 overscroll-behavior:防滚动链

- 四值语义(MDN 原文要点):`auto` 默认(边界后滚动继续传给外层);**`contain` 阻止滚动链(scroll chaining),但保留 overscroll 回弹**;**`none` 同时阻止滚动链与回弹**;`chain` 允许链但禁回弹(较新关键字)。支持双值 `overscroll-behavior: x y`。
- **弹层防穿透标准姿势**:弹层内容 `overscroll-behavior: contain`;且"**无滚动溢出的滚动容器(如 overflow:hidden)恒处于边界 → 设 contain/none 即可阻止背景滚动**,用于 dialog/overlay 打开时锁背景"(MDN 原文推论,可直接抄)。
- 边界:iframe 不是滚动容器,需在 iframe 文档的 html/body 上设置。
来源:https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior(本次抓取全文)

### 8.2 scroll snap

- 容器:`scroll-snap-type: x|y|both` + `mandatory|proximity`;子项:`scroll-snap-align: start|end|center|none`。
- MDN 原文警告:**mandatory 在内容超高/超宽时用户可能永远看不到某段内容 → 只有当"屏幕上内容量已知"时才用 mandatory;一般交互用 proximity**(浏览器决定吸附距离阈值)。
- 配套:`scroll-padding`(容器,给 sticky 头部留位)、`scroll-margin`(子项,单元素外扩)、`scroll-snap-stop: always`(强制逐项停,防翻页飞过)。
来源:https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts(本次抓取全文)

### 8.3 自定义滚动条

- 标准属性:`scrollbar-width: auto|thin|none`(Baseline 2024-12;"目的是省空间不是审美";**MDN 警告:none 影响可及性/WCAG 2.1.1 键盘滚动**;root 上设置的值应用到 viewport);`scrollbar-color: <thumb> <track>`(Firefox 标准,详见同模块)。
- WebKit 家族:非标 `::-webkit-scrollbar` 系伪元素仍广泛使用;**关键互操作事实(MDN 原文):一旦元素 computed `scrollbar-width ≠ auto`,`::-webkit-scrollbar` 家族即被浏览器忽略**;写回 `auto` 恢复 webkit 样式。
来源:https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width(本次抓取全文)

### 8.4 可直接复用代码(弹层滚动 + 轮播)

```css
/* 弹层内容:防滚动链 + 保留 iOS 回弹 */
.mi-dialog__scroll { overflow: auto; overscroll-behavior: contain; }
/* 锁背景:打开弹层时 */
body[data-dialog-open] { overflow: hidden; }        /* 配合 JS;或给 bg 容器 overscroll-behavior: contain */
/* 横向轮播:proximity 吸附 + 两侧 padding 给卡片呼吸 */
.mi-carousel { overflow-x: auto; overscroll-behavior-x: contain;
  scroll-snap-type: x proximity; scrollbar-width: thin;
  scroll-padding: 0 24px; }
.mi-carousel > * { scroll-snap-align: start; scroll-margin: 0 8px; }
```

---

## 9. 未证实 / 差异记录(汇总)

| 项 | 状态 |
|---|---|
| macOS 登录框抖动的 Apple 官方参数(时长/振幅) | 未证实(Apple 无公开文档;社区复刻经验 ~0.5s/±10px 仅供等感参考) |
| iOS 系统分段控件指示器滑动的官方 spring 数值 | 未证实 |
| Material M3 emphasized easing 数值(`cubic-bezier(0.2,0,0,1)`) | 未证实(m2/m3.material.io 正文 JS 渲染无法抓取;linear() 生成器存在该预设,可作导出通道) |
| Web 组件库默认按钮按压 scale(0.95/0.98) | 本次在 AntD/Arco/shadcn/Magic UI 默认按钮源码中均未发现 scale,社区惯例值如实标注 |
| Apple ProMotion 120Hz 硬件页 | 未证实(抓取失败);以 MDN rAF"回调匹配刷新率+常见 60/75/120/144Hz"为锚 |
| Motion 文档 vs 源码差异 | stiffness 默认(文档 1 vs 源码 100)、bounce 默认(文档 0.25 vs 源码 0.3)、restSpeed/restDelta(文档 0.1/0.01 vs 源码 default 2/0.5 与 granular 0.01/0.005 两档)—— 均已并列记录,源码优先 |
| react-bits 专属"按压按钮"组件 | 未发现(其按压域为 ClickSpark/ElasticSlider/Magnet,已核验) |

---

## 10. 十条签名巧思(crafts)

1. **按压瞬时、回弹缓动**:像 Arco 那样 `:active { transition: none }` —— 状态切换 0ms,松手才给 120~200ms 缓出,跟手感翻倍。
2. **卡槽只养一个孩子**:滑签元素常驻 + `layoutId`,槽位只是它的"家";bounce 0.2/duration 0.6(ζ≈0.8)弹得克制不闹腾。
3. **抄弹簧先算 ζ**:`stiffness 500 / damping 50` 是过阻尼(ζ1.12)假弹簧;ζ=c/(2√(mk)) 手算一遍再上,想要微弹就守 0.7±0.1。
4. **错误抖动给初速度,不给 keyframes**:velocity 注入让弹簧自己按 e^(−λt) 衰减,连按、打断、重播都物理连续。
5. **浮层入场 0.95:zoom-in-95 + fade 200ms 是 radix 事实标准;方向位移 8px(slide-in-from-*-2)+锚点侧 transform-origin,缩放就不会"从屏幕中心长大"。**
6. **Toast 进攻退守**:入场 0.35s 过冲 bezier(.21,1.02,.73,1) 从 200% 外滑入,退场 0.4s 纯缓出收尾;4s 后退场,`.35/.40` 一进一出永不打架。
7. **进慢出快**:sheet 类入 500ms、出 300ms(shadcn 官方不对称),关闭永远比打开果断 —— 用户在等的是"离开"。
8. **弹层必挂 `overscroll-behavior: contain`**:拦滚动链、留回弹;`overflow:hidden` 的空滚动容器天生处于边界,正好当背景锁。
9. **逐帧直写 transform,CSS 变量只做"事件级"开关**:变量一改整棵子树样式失效;sonner 用 `--y` 是切状态不是逐帧,这才是正确用法。
10. **will-change 三条纪律**:最后手段、JS 动画前置 / `animationend` 后即撤、绝不撒到 body——它把优化常驻内存的代价,比省下的重绘更贵。

---

## 附录:来源清单(全部为本次会话实际抓取/执行)

**官方文档**
- Motion Transitions(弹簧/velocity/visualDuration/inertia):https://motion.dev/docs/react-transitions
- Motion useSpring:https://motion.dev/docs/react-spring · Motion 布局动画:https://motion.dev/docs/react-layout-animations
- MDN overscroll-behavior:https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
- MDN scroll snap 基础:https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts
- MDN scrollbar-width:https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
- MDN will-change:https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
- MDN linear():https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear
- MDN requestAnimationFrame:https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- web.dev 高性能动画:https://web.dev/articles/animations-guide
- CSS Variables L1 规范:https://drafts.csswg.org/css-variables-1/
- linear() 生成器(Jake Archibald):https://linear-easing-generator.netlify.app/
- Apple UISpringTimingParameters(+dampingRatio init):https://developer.apple.com/documentation/uikit/uispringtimingparameters
- Apple HIG Segmented controls(数据端点):https://developer.apple.com/design/human-interface-guidelines/segmented-controls
- Apple CADisplayLink preferredFrameRateRange:https://developer.apple.com/documentation/quartzcore/cadisplaylink/preferredframeraterange
- Wikipedia Damping / Damping ratio:https://en.wikipedia.org/wiki/Damping_ratio

**组件库源码(GitHub raw / gh api 原文抓取)**
- antd:button/style/index.ts · theme/themes/shared/genCommonMapToken.ts · theme/themes/seed.ts · components/_util/wave/(github.com/ant-design/ant-design,master)
- Arco:Button/style/index.less · Button/style/token.less · style/theme/default.less(github.com/arco-design/arco-design,main)
- shadcn/ui:apps/v4/registry/new-york-v4/ui/{button,dialog,popover,sheet}.tsx(github.com/shadcn-ui/ui,main)
- sonner:src/styles.css · src/index.tsx(github.com/emilkowalski/sonner,main)
- react-hot-toast:src/components/toast-bar.tsx(github.com/timolins/react-hot-toast,main)
- vaul:src/constants.ts · src/index.tsx(含 v0.9.7 对照)(github.com/emilkowalski/vaul,main)
- animate.css:source/attention_seekers/shakeX.css(github.com/animate-css/animate.css,main)
- Magic UI:apps/www/public/r/pulsating-button.json(github.com/magicuidesign/magicui,main)
- react-bits:src/content/Animations/ClickSpark/ClickSpark.jsx · src/content/Components/ElasticSlider/ElasticSlider.css(github.com/DavidHDev/react-bits,main)
- Motion 引擎:packages/motion-dom/src/animation/generators/spring.ts(github.com/motiondivision/motion,main)

**本会话执行的实算/核验命令**
- Python:ζ-过冲表 `exp(−πζ/√(1−ζ²))` 与弹簧档位(ω₀、λ、包络 5% 耗时、t_peak)——输出见 §2.3/§4.3/§6;
- `gh api`(GitHub 认证 API)抓取上述全部源码原文;`curl` 抓取 MDN/Apple 文档 JSON/raw 内容;
- fox_fetch(Jina 兜底)抓取 motion.dev、buildui.com、MDN、web.dev、维基、生成器工具页全文。
