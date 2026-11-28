# linear() Spring Sampling / linear() 缓动

- 页面 / Page: /uiux-atlas/motion/linear-easing/
- English page: /uiux-atlas/en/motion/linear-easing/
- 本页 / This file: /uiux-atlas/motion/linear-easing/index.md
- 分类 / Category: motion 动效与微交互 / Motion
- 来源体系 / System: Web 标准 / Web Standard
- 参数化程度 / Parameterization: 2/3
- 别名 / Aliases: linear 缓动采样 · 弹簧转 CSS · linear() easing generator
- 简介 / Tagline: 把弹簧物理采样编译成 CSS linear() 关键帧:JS 采样一次,浏览器插值一万次——overshoot 原样保留,零运行时,Baseline 2023-12。
- Tagline (EN): Compile spring physics into CSS linear() keyframes: JS samples once, the browser interpolates forever — overshoot preserved verbatim, zero runtime, Baseline since 2023-12.

## 参数 / Parameters

| name | type | default |
|---|---|---|
| stiffness | number | 170 |
| damping | number | 26 |

## 适用场景 / When to use

- 想把弹簧手感导出为纯 CSS(不携带 JS 库)的场景——产物可烧进任意框架 / Exporting a spring feel as pure CSS (no JS library shipped) — the artifact drops into any framework
- 需要 overshoot/回弹但 cubic-bezier 表达不了的曲线 / Curves needing overshoot/bounce that cubic-bezier cannot express
- 与 CSS transition 生态混用、或要在 keyframes 外复用同一曲线的项目 / Projects mixing with the CSS transition ecosystem or reusing one curve across keyframes

## 何时不用 / When not to use

- 需要可打断并从当前速度继续的弹簧——linear() 是固定曲线,没有速度状态;要交互弹簧用 Motion useSpring / Springs that must be interruptible and continue from current velocity — linear() is a fixed curve with no velocity state; use Motion's useSpring for interactive springs
- 运行时改参数的实时弹簧——每次改动都要重新采样编译;先离线烘好再上线 / Live springs retuned at runtime — every change requires resampling; bake offline, ship static
- 对手势跟手/惯性释放场景——那是 inertia/物理弹簧的领地(见本分类其余条目) / Gesture tracking / inertia release — that is physics spring / inertia territory (see sibling entries)

## 来源 / Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear
- https://linear-easing-generator.netlify.app/
- https://raw.githubusercontent.com/jakearchibald/linear-easing-generator/main/README.md
